import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const rulesUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/query-rules.mjs"));
const handlersUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/tool-handlers.mjs"));

async function load(url) {
  try { return await import(url); } catch { return null; }
}

function ids(subject, normalized) {
  return subject.runRules(normalized).map((finding) => finding.ruleId);
}

// A draft spec and an open-query model that describe the SAME clean query. Neither must
// produce any finding, and the two adapters must agree on the shared facts.
const CLEAN_SPEC = {
  version: 1,
  target: { system: "BWD", client: "100", project: "BWD_100", provider: "ZCUBE_SALES" },
  technicalName: "Z_SALES_CLEAN",
  axes: {
    rows: [{ technicalName: "0CUSTOMER" }],
    columns: [{ technicalName: "KFS", kind: "structure" }],
    free: [{ technicalName: "0MATERIAL" }],
  },
  structures: [{ technicalName: "KFS", kind: "keyFigure", members: ["0NETSALES", "ZKF_MARGIN"] }],
  keyFigures: [{
    technicalName: "ZKF_MARGIN", kind: "restricted", baseKeyFigure: "0MARGIN", description: "Margin EU",
    restrictions: [{ characteristic: "0REGION", operator: "EQUAL", values: ["EU"] }],
  }],
  filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  display: { zeroSuppression: { rows: true, columns: false, mode: "FOR_RESULTS_ONLY" } },
  businessPurpose: "Net sales and margin by customer",
  acceptanceCriteria: ["Reconciles to the monthly control total"],
  evidence: [],
};

function cleanModel() {
  return {
    found: true,
    technicalName: "Z_SALES_CLEAN",
    provider: "ZCUBE_SALES",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER", hierarchy: null, displayLevel: null }],
      columns: [{
        kind: "structure", technicalName: "KFS", description: "Key figures", members: [
          { type: "selection", description: "Net sales", groups: [{ infoObject: "0NETSALES", tokens: [] }] },
          {
            type: "selection", description: "Margin EU", groups: [
              { infoObject: "0MARGIN", tokens: [] },
              { infoObject: "0REGION", tokens: [{ type: "range", operator: "EQUAL", exclude: false, from: { value: "EU" }, to: null }] },
            ],
          },
        ],
      }],
      free: [{ kind: "characteristic", infoObjectName: "0MATERIAL", hierarchy: null, displayLevel: null }],
    },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", operator: "EQUAL", exclude: false, from: { value: "202601" }, to: null }] }] },
    conditions: [],
    exceptions: [],
    settings: { zeroSuppression: { rows: true, columns: false, mode: "FOR_RESULTS_ONLY" } },
    serializationIssues: [],
  };
}

test("RULE_CATALOG is a frozen 12-rule catalog with valid metadata", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  assert.equal(subject.RULE_CATALOG.length, 12);
  assert.ok(Object.isFrozen(subject.RULE_CATALOG));
  for (const rule of subject.RULE_CATALOG) {
    assert.match(rule.ruleId, /^BWQ0\d\d$/);
    assert.ok(["warning", "info"].includes(rule.severity), rule.ruleId);
    assert.ok(typeof rule.title === "string" && rule.title.length > 0, rule.ruleId);
    assert.ok(typeof rule.rationale === "string" && rule.rationale.length > 0, rule.ruleId);
    assert.ok(Array.isArray(rule.appliesTo) && rule.appliesTo.length > 0, rule.ruleId);
  }
  // BWQ006 cannot be evaluated from the deep model, so it applies to specs only.
  const bwq006 = subject.RULE_CATALOG.find((rule) => rule.ruleId === "BWQ006");
  assert.deepEqual(bwq006.appliesTo, ["spec"]);
});

test("a clean spec fixture produces no findings", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  assert.deepEqual(subject.runRules(subject.normalizeFromSpec(CLEAN_SPEC)), []);
});

test("a clean model fixture produces no findings", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  assert.deepEqual(subject.runRules(subject.normalizeFromModel(cleanModel())), []);
});

test("every finding carries the standard shape and a known rationale", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const catalog = new Map(subject.RULE_CATALOG.map((rule) => [rule.ruleId, rule]));
  const findings = subject.runRules(subject.normalizeFromSpec({
    version: 1, target: { provider: "CUBE" }, technicalName: "MYQUERY",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] },
  }));
  assert.ok(findings.length > 0);
  for (const finding of findings) {
    assert.ok(catalog.has(finding.ruleId));
    assert.equal(finding.severity, catalog.get(finding.ruleId).severity);
    assert.equal(finding.rationale, catalog.get(finding.ruleId).rationale);
    assert.ok(typeof finding.message === "string" && finding.message.length > 0);
    assert.ok("path" in finding);
  }
});

test("runRules and adapters are defensive on partial/garbage input", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  assert.deepEqual(subject.runRules(null), []);
  assert.deepEqual(subject.runRules(undefined), []);
  assert.deepEqual(subject.runRules({}), []);
  assert.doesNotThrow(() => subject.normalizeFromSpec(null));
  assert.doesNotThrow(() => subject.normalizeFromSpec(undefined));
  assert.doesNotThrow(() => subject.normalizeFromModel(null));
  assert.doesNotThrow(() => subject.normalizeFromModel({ axes: null, filter: null, conditions: "x" }));
});

// ---------------------------------------------------------------------------------------
// One firing fixture per rule (mixing spec and model sources to exercise both adapters).
// ---------------------------------------------------------------------------------------

test("BWQ001 fires when no time characteristic is restricted", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const normalized = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_NO_TIME",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] },
    filters: [{ characteristic: "0REGION", operator: "EQUAL", value: "EU" }],
  });
  assert.ok(ids(subject, normalized).includes("BWQ001"));
  // With a time filter it stops firing.
  const withTime = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_TIME",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] },
    filters: [{ characteristic: "0FISCPER", operator: "EQUAL", value: "0012026" }],
  });
  assert.ok(!ids(subject, withTime).includes("BWQ001"));
});

test("BWQ002 fires on more than 8 row characteristics", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const rows = Array.from({ length: 9 }, (_, index) => ({ technicalName: `0CHAR${index}` }));
  const normalized = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_ROWS",
    axes: { rows, columns: [], free: [] },
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  const findings = subject.runRules(normalized).filter((finding) => finding.ruleId === "BWQ002");
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /9 characteristics/);
});

test("BWQ003 fires on more than 15 free characteristics", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const free = Array.from({ length: 16 }, (_, index) => ({ technicalName: `0FREE${index}` }));
  const normalized = subject.normalizeFromModel({
    found: true, technicalName: "Z_FREE",
    axes: {
      rows: [], columns: [],
      free: free.map((item) => ({ kind: "characteristic", infoObjectName: item.technicalName })),
    },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(ids(subject, normalized).includes("BWQ003"));
});

test("BWQ004 fires for a broad condition assignment on both sources", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const spec = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_COND",
    axes: { rows: [{ technicalName: "0CUSTOMER" }, { technicalName: "0MATERIAL" }], columns: [], free: [] },
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
    conditions: [{ keyFigure: "0NETSALES", operator: "TOP_N", threshold: 10 }],
  });
  assert.ok(ids(subject, spec).includes("BWQ004"));
  const model = subject.normalizeFromModel({
    found: true, technicalName: "Z_COND",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }, { kind: "characteristic", infoObjectName: "0MATERIAL" }],
      columns: [], free: [],
    },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [{ description: "Top 10", infoObject: "0NETSALES", active: true, assignment: "ALL_INDEPENDENTLY", assignedCharacteristics: [], tokens: [] }],
    exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(ids(subject, model).includes("BWQ004"));
  // A condition pinned to a specific characteristic is not broad.
  const pinned = subject.normalizeFromModel({
    found: true, technicalName: "Z_COND",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }, { kind: "characteristic", infoObjectName: "0MATERIAL" }],
      columns: [], free: [],
    },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [{ description: "Top 10", infoObject: "0NETSALES", active: true, assignment: "SINGLE_CHARACTERISTIC", assignedCharacteristics: ["0CUSTOMER"], tokens: [] }],
    exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(!ids(subject, pinned).includes("BWQ004"));
});

test("BWQ005 fires for an exception that does not affect data cells", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const normalized = subject.normalizeFromModel({
    found: true, technicalName: "Z_EXC",
    axes: { rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }], columns: [], free: [] },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [],
    exceptions: [{ description: "Loss", infoObject: "0NETSALES", active: true, affectsDataCells: false, tokens: [] }],
    settings: {}, serializationIssues: [],
  });
  assert.ok(ids(subject, normalized).includes("BWQ005"));
  // Unknown/true affectsDataCells does not fire.
  const unknown = subject.normalizeFromModel({
    found: true, technicalName: "Z_EXC",
    axes: { rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }], columns: [], free: [] },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [{ description: "Loss", infoObject: "0NETSALES", active: true, tokens: [] }],
    settings: {}, serializationIssues: [],
  });
  assert.ok(!ids(subject, unknown).includes("BWQ005"));
});

test("BWQ006 fires for a formula key figure without exception aggregation (spec only)", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const spec = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_FORMULA",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [{ technicalName: "KFS", kind: "structure" }], free: [] },
    structures: [{ technicalName: "KFS", kind: "keyFigure", members: ["ZCKF_PRICE"] }],
    keyFigures: [{ technicalName: "ZCKF_PRICE", kind: "calculated", formula: { expression: "0AMOUNT / 0QUANTITY" } }],
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  assert.ok(ids(subject, spec).includes("BWQ006"));
  // Defining an exception aggregation clears it.
  const fixed = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_FORMULA",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [{ technicalName: "KFS", kind: "structure" }], free: [] },
    structures: [{ technicalName: "KFS", kind: "keyFigure", members: ["ZCKF_PRICE"] }],
    keyFigures: [{ technicalName: "ZCKF_PRICE", kind: "calculated", formula: { expression: "0AMOUNT / 0QUANTITY" }, aggregation: { exception: "LAST_VALUE", referenceCharacteristic: "0CALMONTH" } }],
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  assert.ok(!ids(subject, fixed).includes("BWQ006"));
  // A model with a formula member cannot prove exception aggregation, so it is skipped.
  const model = subject.normalizeFromModel({
    found: true, technicalName: "Z_FORMULA",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }],
      columns: [{ kind: "structure", technicalName: "KFS", members: [{ type: "formula", description: "Price", groups: [], formulaDefinitionString: "0AMOUNT / 0QUANTITY" }] }],
      free: [],
    },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(!ids(subject, model).includes("BWQ006"));
});

test("BWQ007 fires for a hierarchy without a display level on both sources", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const spec = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_HIER",
    axes: { rows: [{ technicalName: "0COSTCENTER" }], columns: [], free: [] },
    hierarchies: [{ characteristic: "0COSTCENTER", hierarchyName: "STANDARD" }],
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  assert.ok(ids(subject, spec).includes("BWQ007"));
  const model = subject.normalizeFromModel({
    found: true, technicalName: "Z_HIER",
    axes: { rows: [{ kind: "characteristic", infoObjectName: "0COSTCENTER", hierarchy: "STANDARD", displayLevel: null }], columns: [], free: [] },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(ids(subject, model).includes("BWQ007"));
});

test("BWQ008 fires for zero suppression FOR_ALL_VALUES regardless of literal casing", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const spec = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_ZS",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] },
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
    display: { zeroSuppression: { rows: true, columns: true, mode: "FOR_ALL_VALUES" } },
  });
  assert.ok(ids(subject, spec).includes("BWQ008"));
  const model = subject.normalizeFromModel({
    found: true, technicalName: "Z_ZS",
    axes: { rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }], columns: [], free: [] },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [],
    settings: { zeroSuppression: { rows: true, columns: true, mode: "ForAllValues" } },
    serializationIssues: [],
  });
  assert.ok(ids(subject, model).includes("BWQ008"));
});

test("BWQ009 fires for duplicate member restrictions on both sources", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const spec = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_DUP",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [{ technicalName: "KFS", kind: "structure" }], free: [] },
    structures: [{ technicalName: "KFS", kind: "keyFigure", members: ["ZKF_A", "ZKF_B"] }],
    keyFigures: [
      { technicalName: "ZKF_A", kind: "restricted", baseKeyFigure: "0AMOUNT", restrictions: [{ characteristic: "0REGION", operator: "EQUAL", values: ["EU"] }] },
      { technicalName: "ZKF_B", kind: "restricted", baseKeyFigure: "0QUANTITY", restrictions: [{ characteristic: "0REGION", operator: "EQUAL", values: ["EU"] }] },
    ],
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  assert.ok(ids(subject, spec).includes("BWQ009"));
  const model = subject.normalizeFromModel({
    found: true, technicalName: "Z_DUP",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }],
      columns: [{
        kind: "structure", technicalName: "KFS", members: [
          { type: "selection", description: "Amount EU", groups: [{ infoObject: "0AMOUNT", tokens: [] }, { infoObject: "0REGION", tokens: [{ type: "range", operator: "EQUAL", exclude: false, from: { value: "EU" } }] }] },
          { type: "selection", description: "Quantity EU", groups: [{ infoObject: "0QUANTITY", tokens: [] }, { infoObject: "0REGION", tokens: [{ type: "range", operator: "EQUAL", exclude: false, from: { value: "EU" } }] }] },
        ],
      }],
      free: [],
    },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(ids(subject, model).includes("BWQ009"));
});

test("BWQ010 fires when the technical name is outside the customer namespace", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const spec = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "MYQUERY",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] },
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  assert.ok(ids(subject, spec).includes("BWQ010"));
  // An empty/unknown name skips silently.
  const noName = subject.normalizeFromModel({
    found: true, technicalName: "",
    axes: { rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }], columns: [], free: [] },
    filter: { selections: [{ infoObject: "0CALMONTH", tokens: [{ type: "range", from: { value: "202601" } }] }] },
    conditions: [], exceptions: [], settings: {}, serializationIssues: [],
  });
  assert.ok(!ids(subject, noName).includes("BWQ010"));
});

test("BWQ011 fires for a query with no restriction anywhere", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const normalized = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_OPEN",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] },
  });
  assert.ok(ids(subject, normalized).includes("BWQ011"));
});

test("BWQ012 fires for a key-figure structure with more than 15 members", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const members = Array.from({ length: 16 }, (_, index) => `0KF${index}`);
  const normalized = subject.normalizeFromSpec({
    version: 1, target: { provider: "ZCUBE" }, technicalName: "Z_WIDE",
    axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [{ technicalName: "KFS", kind: "structure" }], free: [] },
    structures: [{ technicalName: "KFS", kind: "keyFigure", members }],
    filters: [{ characteristic: "0CALMONTH", operator: "EQUAL", value: "202601" }],
  });
  const findings = subject.runRules(normalized).filter((finding) => finding.ruleId === "BWQ012");
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /16 members/);
});

// ---------------------------------------------------------------------------------------
// Adapter parity: the same query normalized from a spec and from a model agrees on the
// shared facts (axes characteristics, filters, structures, restricted characteristics).
// ---------------------------------------------------------------------------------------

test("normalizeFromSpec and normalizeFromModel agree on the shared facts of one query", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  const fromSpec = subject.normalizeFromSpec(CLEAN_SPEC);
  const fromModel = subject.normalizeFromModel(cleanModel());

  const charNames = (normalized, axis) => normalized.axes[axis]
    .filter((element) => element.kind === "characteristic")
    .map((element) => element.name.toUpperCase())
    .sort();
  for (const axis of ["rows", "columns", "free"]) {
    assert.deepEqual(charNames(fromSpec, axis), charNames(fromModel, axis), `axis ${axis} characteristics`);
  }

  const filterChars = (normalized) => normalized.filters.map((filter) => filter.characteristic.toUpperCase()).sort();
  assert.deepEqual(filterChars(fromSpec), filterChars(fromModel));

  assert.equal(fromSpec.structures.length, fromModel.structures.length);
  assert.equal(fromSpec.structures[0].members.length, fromModel.structures[0].members.length);

  const restrictionChars = (normalized) => [...new Set(normalized.structures
    .flatMap((structure) => structure.members)
    .flatMap((member) => member.restrictionCharacteristics.map((name) => name.toUpperCase())))].sort();
  assert.deepEqual(restrictionChars(fromSpec), restrictionChars(fromModel), "member restriction characteristics");

  assert.deepEqual(
    [...fromSpec.restrictedCharacteristics].map((name) => name.toUpperCase()).sort(),
    [...fromModel.restrictedCharacteristics].map((name) => name.toUpperCase()).sort(),
    "restricted characteristics",
  );
  assert.equal(fromSpec.technicalName.toUpperCase(), fromModel.technicalName.toUpperCase());
});

// ---------------------------------------------------------------------------------------
// bw_review_query handler: model fixture -> findings; found:false -> passthrough.
// ---------------------------------------------------------------------------------------

function makeHandlers(subject, bridgeCall) {
  const calls = [];
  const deps = {
    studio: { run: async () => ({}) },
    connections: { status: () => ({ ssoEnabled: true }) },
    drafts: null,
    bridge: { call: async (method, input) => { calls.push({ method, input }); return bridgeCall(method, input); } },
    steps: { append: () => undefined },
  };
  return { calls, handlers: subject.createToolHandlers(deps) };
}

test("bw_review_query deep-reads an open query read-only and returns rule findings", async () => {
  const subject = await load(handlersUrl);
  assert.ok(subject, "tool handlers are not implemented");
  const firingModel = {
    found: true, technicalName: "Z_REVIEW", provider: "ZCUBE_SALES",
    axes: { rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }], columns: [], free: [] },
    filter: { selections: [] }, // no restriction anywhere -> BWQ001 + BWQ011
    conditions: [], exceptions: [], settings: {}, serializationIssues: ["axes.rows[0]: partial"],
  };
  const { calls, handlers } = makeHandlers(subject, (method) => {
    if (method === "readQueryModel") return firingModel;
    return { method };
  });
  const result = await handlers.bw_review_query({ alias: "BWD", project: "BWD_100", technicalName: "Z_REVIEW" });
  assert.equal(result.found, true);
  assert.equal(result.readOnly, true);
  assert.equal(result.technicalName, "Z_REVIEW");
  assert.equal(result.provider, "ZCUBE_SALES");
  assert.ok(Array.isArray(result.findings) && result.findings.length > 0);
  assert.ok(result.findings.some((finding) => finding.ruleId === "BWQ011"));
  assert.deepEqual(result.serializationIssues, ["axes.rows[0]: partial"]);
  assert.deepEqual(calls.map((call) => call.method), ["readQueryModel"]);
});

test("builder-form key-figure selection groups are never treated as restrictions", async () => {
  const subject = await load(rulesUrl);
  assert.ok(subject, "query-rules module is not implemented");
  // QueryModelBuilder emits the measure selection as a group under the key figure's OWN
  // name carrying one token with selectionType KEY_FIGURE (not the 1KYFNM selector form).
  const keyFigureGroup = (name) => ({
    infoObject: name,
    tokens: [{ type: "range", operator: null, exclude: false, from: { value: name, type: "INFO_OBJECT" }, to: null, selectionType: "KEY_FIGURE", variable: null }],
  });
  const unrestrictedModel = {
    found: true,
    technicalName: "Z_BUILDER_FORM",
    provider: "ZCUBE_SALES",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER", hierarchy: null, displayLevel: null }],
      columns: [{
        kind: "structure", technicalName: "", description: "Key Figures", members: [
          { type: "selection", description: "0NETSALES", groups: [keyFigureGroup("0NETSALES")] },
          { type: "selection", description: "0QUANTITY", groups: [keyFigureGroup("0QUANTITY")] },
        ],
      }],
      free: [],
    },
    filter: { selections: [] },
    conditions: [], exceptions: [], settings: {}, serializationIssues: [],
  };
  const normalized = subject.normalizeFromModel(unrestrictedModel);
  assert.deepEqual(normalized.restrictedCharacteristics, [], "KF selection groups must not count as restrictions");
  const findingIds = ids(subject, normalized);
  assert.ok(findingIds.includes("BWQ011"), "unrestricted query must fire despite builder-form KF groups");
  assert.equal(findingIds.includes("BWQ009"), false, "identical KF selection groups are not duplicate restrictions");

  const restrictedModel = structuredClone(unrestrictedModel);
  restrictedModel.axes.columns[0].members = [
    {
      type: "selection", description: "Sales DE", groups: [
        keyFigureGroup("0NETSALES"),
        { infoObject: "0REGION", tokens: [{ type: "range", operator: "EQUAL", exclude: false, from: { value: "DE" }, to: null, selectionType: null, variable: null }] },
      ],
    },
    {
      type: "selection", description: "Sales DE copy", groups: [
        keyFigureGroup("0QUANTITY"),
        { infoObject: "0REGION", tokens: [{ type: "range", operator: "EQUAL", exclude: false, from: { value: "DE" }, to: null, selectionType: null, variable: null }] },
      ],
    },
  ];
  const restrictedNormalized = subject.normalizeFromModel(restrictedModel);
  assert.deepEqual(restrictedNormalized.restrictedCharacteristics, ["0REGION"]);
  const restrictedIds = ids(subject, restrictedNormalized);
  assert.ok(restrictedIds.includes("BWQ009"), "identical real restrictions across different base key figures must be flagged");
  assert.equal(restrictedIds.includes("BWQ011"), false);
});

test("bw_review_query passes through found:false without running rules", async () => {
  const subject = await load(handlersUrl);
  assert.ok(subject, "tool handlers are not implemented");
  const { calls, handlers } = makeHandlers(subject, (method) => {
    if (method === "readQueryModel") return { found: false, userActionRequired: true, instruction: "Open the query read-only in BW Query Designer, then retry." };
    return { method };
  });
  const result = await handlers.bw_review_query({ alias: "BWD", project: "BWD_100", technicalName: "Z_MISSING" });
  assert.equal(result.found, false);
  assert.equal(result.userActionRequired, true);
  assert.match(result.instruction, /BW Query Designer/);
  assert.deepEqual(result.findings, []);
  assert.deepEqual(calls.map((call) => call.method), ["readQueryModel"]);
});
