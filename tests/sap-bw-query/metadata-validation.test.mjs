import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

async function load(relativePath) {
  try {
    return await import(pathToFileURL(path.resolve(here, relativePath)));
  } catch {
    return null;
  }
}

const providerMetadata = {
  available: true,
  provider: "ZCUBE_SALES",
  characteristics: [
    { technicalName: "0CUSTOMER", description: "Customer", dimension: "ZCUBE_SALES1", hierarchies: true },
    { technicalName: "0CALMONTH", description: "Calendar month", dimension: "ZCUBE_SALEST", hierarchies: false },
    { technicalName: "0MATERIAL", description: "Material", dimension: "ZCUBE_SALES2", hierarchies: true },
  ],
  keyFigures: [
    { technicalName: "0NETSALES", description: "Net sales" },
    { technicalName: "0QUANTITY", description: "Quantity" },
  ],
};

const baseSpec = {
  version: 1,
  target: { system: "BWD", client: "100", project: "BWD_100", provider: "ZCUBE_SALES" },
  technicalName: "Z_SALES_MVP",
  axes: {
    rows: [{ technicalName: "0CUSTOMER", kind: "characteristic" }],
    columns: [{ technicalName: "0NETSALES", kind: "keyFigure" }],
  },
  businessPurpose: "Analyze net sales by customer",
  acceptanceCriteria: ["Net sales reconcile to the approved monthly control total"],
  evidence: [],
};

test("a spec matching provider metadata is ready for draft", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  assert.ok(subject, "QuerySpec module is not implemented");
  const result = subject.resolveAndValidateSpec(baseSpec, { providerMetadata });
  assert.equal(result.valid, true);
  assert.equal(result.metadataChecked, true);
  assert.equal(result.readyForDraft, true);
  assert.equal(result.gaps.some((gap) => gap.severity === "blocking"), false);
});

test("unknown characteristics and key figures block the draft", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const result = subject.resolveAndValidateSpec({
    ...baseSpec,
    axes: {
      rows: [{ technicalName: "0NOT_A_CHAR", kind: "characteristic" }],
      columns: [{ technicalName: "0NOT_A_KYF", kind: "keyFigure" }],
    },
    filters: [{ characteristic: "0NETSALES", operator: "EQ", value: "100" }],
  }, { providerMetadata });
  assert.equal(result.valid, true, result.errors.join("; "));
  assert.equal(result.readyForDraft, false);
  const codes = result.gaps.map((gap) => gap.code);
  assert.ok(codes.includes("UNKNOWN_CHARACTERISTIC"));
  assert.ok(codes.includes("UNKNOWN_KEY_FIGURE"));
  assert.ok(codes.includes("FILTER_ON_KEY_FIGURE"));
});

test("hierarchy requests on hierarchy-free characteristics block the draft", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const result = subject.resolveAndValidateSpec({
    ...baseSpec,
    hierarchies: [{ characteristic: "0CALMONTH", hierarchyName: "ZH_MONTH" }],
  }, { providerMetadata });
  assert.equal(result.readyForDraft, false);
  assert.ok(result.gaps.some((gap) => gap.code === "HIERARCHY_UNAVAILABLE" && gap.severity === "blocking"));
});

test("restricted key figures are validated against provider metadata", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const spec = {
    ...baseSpec,
    axes: {
      rows: [{ technicalName: "0CUSTOMER", kind: "characteristic" }],
      columns: [{ technicalName: "ZRK_SALES_DE", kind: "keyFigure" }],
    },
    keyFigures: [{
      technicalName: "ZRK_SALES_DE",
      kind: "restricted",
      baseKeyFigure: "0NETSALES",
      restrictions: [{ characteristic: "0MATERIAL", operator: "EQUAL", values: ["M-100"] }],
    }],
  };
  const ok = subject.resolveAndValidateSpec(spec, { providerMetadata });
  assert.equal(ok.readyForDraft, true, JSON.stringify(ok.gaps));
  const bad = subject.resolveAndValidateSpec({
    ...spec,
    keyFigures: [{
      ...spec.keyFigures[0],
      baseKeyFigure: "0NO_SUCH_KYF",
      restrictions: [{ characteristic: "0NO_SUCH_CHAR", operator: "EQUAL", values: ["X"] }],
    }],
  }, { providerMetadata });
  assert.equal(bad.readyForDraft, false);
  const codes = bad.gaps.map((gap) => gap.code);
  assert.ok(codes.includes("UNKNOWN_KEY_FIGURE"));
  assert.ok(codes.includes("UNKNOWN_CHARACTERISTIC"));
});

test("without metadata the spec stays locally valid and reports METADATA_UNAVAILABLE", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const result = subject.resolveAndValidateSpec(baseSpec);
  assert.equal(result.valid, true);
  assert.equal(result.metadataChecked, false);
  assert.ok(result.gaps.some((gap) => gap.code === "METADATA_UNAVAILABLE" && gap.severity === "info"));
  assert.equal(result.readyForDraft, true);
});

test("structures must be placed on an axis and members verified against metadata", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const spec = {
    ...baseSpec,
    axes: {
      rows: [{ technicalName: "0CUSTOMER", kind: "characteristic" }],
      columns: [{ technicalName: "ZSTR_KF", kind: "structure" }],
    },
    structures: [{ technicalName: "ZSTR_KF", kind: "keyFigure", members: ["0NETSALES", "0NO_SUCH_KYF"] }],
  };
  const result = subject.resolveAndValidateSpec(spec, { providerMetadata });
  assert.equal(result.valid, true, result.errors.join("; "));
  assert.ok(result.gaps.some((gap) => gap.code === "UNKNOWN_KEY_FIGURE" && gap.path === "structures[0].members[1]"));
  const unplaced = subject.resolveAndValidateSpec({
    ...spec,
    axes: baseSpec.axes,
  }, { providerMetadata });
  assert.equal(unplaced.valid, false);
  assert.match(unplaced.errors.join(" "), /not placed on any axis/);
});

test("conditions and exceptions must reference key figures that exist in the spec", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const result = subject.resolveAndValidateSpec({
    ...baseSpec,
    conditions: [{ keyFigure: "0MISSING", operator: "TOP_N", threshold: 10 }],
    exceptions: [{ keyFigure: "0NETSALES", alertLevel: "BAD3", operator: "GREATER_THAN", threshold: 1000000 }],
  });
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /conditions\[0\] references key figure 0MISSING/);
});

test("enum literals are enforced for conditions, exceptions, and zero suppression", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const result = subject.resolveAndValidateSpec({
    ...baseSpec,
    conditions: [{ keyFigure: "0NETSALES", operator: "TOP_WHATEVER", threshold: 10 }],
    exceptions: [{ keyFigure: "0NETSALES", alertLevel: "TERRIBLE", operator: "GREATER_THAN", threshold: 1 }],
    display: { zeroSuppression: { rows: true, mode: "SOMETIMES" } },
  });
  assert.equal(result.valid, false);
  const joined = result.errors.join(" ");
  assert.match(joined, /conditions\[0\]\.operator must be one of/);
  assert.match(joined, /exceptions\[0\]\.alertLevel must be one of/);
  assert.match(joined, /display\.zeroSuppression\.mode must be one of/);
});

test("empty key figure objects are rejected in revision 1.1", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const result = subject.resolveAndValidateSpec({ ...baseSpec, keyFigures: [{}] });
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /keyFigures\[0\]\.technicalName is required/);
});

test("optimizations flag repeated restrictions, unleveled hierarchies, and unconfirmed aggregation", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const spec = {
    ...baseSpec,
    axes: {
      rows: [{ technicalName: "0CUSTOMER", kind: "characteristic" }],
      columns: [
        { technicalName: "ZRK_DE", kind: "keyFigure" },
        { technicalName: "ZRK_FR", kind: "keyFigure" },
        { technicalName: "ZCK_MARGIN", kind: "keyFigure" },
      ],
    },
    keyFigures: [
      { technicalName: "ZRK_DE", kind: "restricted", baseKeyFigure: "0NETSALES", restrictions: [{ characteristic: "0CALMONTH", operator: "EQUAL", values: ["202607"] }] },
      { technicalName: "ZRK_FR", kind: "restricted", baseKeyFigure: "0NETSALES", restrictions: [{ characteristic: "0CALMONTH", operator: "EQUAL", values: ["202607"] }] },
      { technicalName: "ZCK_MARGIN", kind: "calculated", formula: { expression: "ZRK_DE - ZRK_FR" } },
    ],
    hierarchies: [{ characteristic: "0CUSTOMER", hierarchyName: "ZH_CUST" }],
  };
  const result = subject.resolveAndValidateSpec(spec, { providerMetadata });
  const codes = result.optimizations.map((item) => item.code);
  assert.ok(codes.includes("VARIABLE_REUSE"));
  assert.ok(codes.includes("RESTRICTED_MEASURE_CONSOLIDATION"));
  assert.ok(codes.includes("HIERARCHY_DISPLAY_LEVEL"));
  assert.ok(codes.includes("AGGREGATION_CONFIRMATION"));
  const semanticsChanging = result.optimizations.filter((item) => item.changesBusinessSemantics).map((item) => item.code);
  assert.ok(semanticsChanging.includes("VARIABLE_REUSE"));
  assert.ok(semanticsChanging.includes("AGGREGATION_CONFIRMATION"));
  assert.equal(result.optimizations.find((item) => item.code === "RESTRICTED_MEASURE_CONSOLIDATION").changesBusinessSemantics, false);
});

test("consolidated structures and confirmed aggregation silence those optimizations", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  const spec = {
    ...baseSpec,
    axes: {
      rows: [{ technicalName: "0CUSTOMER", kind: "characteristic" }],
      columns: [{ technicalName: "ZSTR_KF", kind: "structure" }],
    },
    structures: [{ technicalName: "ZSTR_KF", kind: "keyFigure", members: ["ZRK_DE", "ZRK_FR"] }],
    keyFigures: [
      { technicalName: "ZRK_DE", kind: "restricted", baseKeyFigure: "0NETSALES", restrictions: [{ characteristic: "0MATERIAL", operator: "EQUAL", values: ["M-1"] }] },
      { technicalName: "ZRK_FR", kind: "restricted", baseKeyFigure: "0NETSALES", restrictions: [{ characteristic: "0MATERIAL", operator: "EQUAL", values: ["M-2"] }] },
    ],
    aggregation: { confirmed: true },
    filters: [{ characteristic: "0CALMONTH", operator: "EQ", value: "202607" }],
  };
  const result = subject.resolveAndValidateSpec(spec, { providerMetadata });
  const codes = result.optimizations.map((item) => item.code);
  assert.equal(codes.includes("RESTRICTED_MEASURE_CONSOLIDATION"), false);
  assert.equal(codes.includes("AGGREGATION_CONFIRMATION"), false);
  assert.equal(codes.includes("VARIABLE_REUSE"), false);
  assert.equal(codes.includes("UNRESTRICTED_PROVIDER"), false);
});

test("provider metadata normalizer tolerates enriched, bare, and unavailable responses", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/provider-metadata.mjs");
  assert.ok(subject, "provider-metadata module is not implemented");
  const enriched = subject.normalizeProviderMetadata({
    provider: "ZCUBE_SALES",
    openQueries: [],
    metadata: {
      available: true,
      characteristics: [{ name: "0CUSTOMER", description: "Customer", dimensionName: "ZC1" }],
      keyFigures: [{ name: "0NETSALES", iobjType: "KYF" }],
      dimensions: [{ name: "ZC1", description: "Customer dim" }],
    },
  });
  assert.equal(enriched.available, true);
  assert.equal(enriched.characteristics[0].technicalName, "0CUSTOMER");
  assert.equal(enriched.characteristics[0].dimension, "ZC1");
  assert.equal(enriched.keyFigures[0].technicalName, "0NETSALES");
  const unavailable = subject.normalizeProviderMetadata({ provider: "ZCUBE_SALES", metadata: { available: false, reason: "OFFLINE_OR_UNAUTHENTICATED" } });
  assert.equal(unavailable.available, false);
  assert.equal(unavailable.reason, "OFFLINE_OR_UNAUTHENTICATED");
  assert.equal(subject.normalizeProviderMetadata(null).available, false);
  assert.equal(subject.normalizeProviderMetadata({ provider: "X", openQueries: [] }).available, false);
});
