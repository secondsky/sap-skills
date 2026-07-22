import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const verifyUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/populate-verify.mjs"));
const handlersUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/tool-handlers.mjs"));
const draftsUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/draft-state.mjs"));

async function load(url) {
  try { return await import(url); } catch { return null; }
}

const minimalSpec = {
  version: 1,
  target: { system: "BWD", client: "100", project: "BWD_100", provider: "ZCUBE_SALES" },
  technicalName: "Z_SALES_NEW",
  axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [{ technicalName: "0NETSALES", kind: "keyFigure" }] },
  businessPurpose: "Analyze net sales by customer",
  acceptanceCriteria: ["Reconciles to the monthly control total"],
  evidence: [],
};

function matchingMinimalModel() {
  return {
    found: true,
    technicalName: "Z_SALES_NEW",
    axes: {
      rows: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }],
      columns: [{
        kind: "structure", technicalName: "", members: [
          { type: "selection", description: "0NETSALES", groups: [{ infoObject: "0NETSALES", tokens: [] }] },
        ],
      }],
      free: [],
    },
    filter: { selections: [] },
    conditions: [],
    exceptions: [],
    settings: {},
    serializationIssues: [],
  };
}

function dependencies(draftStore, bridgeCall) {
  const calls = [];
  return {
    calls,
    deps: {
      studio: { run: async (action, input) => ({ action, input }) },
      connections: {
        prepare: (input) => input,
        importLandscape: () => ({}),
        status: () => ({ ssoEnabled: true }),
        reachability: async () => ({ reachable: true, authenticated: false }),
      },
      drafts: draftStore,
      bridge: { call: async (method, input) => { calls.push({ method, input }); return bridgeCall(method, input); } },
      steps: { append: () => undefined },
    },
  };
}

test("verifyPopulation reports VERIFIED for a fully represented spec", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");
  const spec = {
    axes: {
      rows: [{ technicalName: "0CUSTOMER" }, { technicalName: "0MATERIAL", kind: "characteristic" }],
      columns: [{ technicalName: "KFSTRUCT", kind: "structure" }],
      free: [{ technicalName: "0CALMONTH" }],
    },
    structures: [{ technicalName: "KFSTRUCT", members: ["0NETSALES", "ZKF_MARGIN"] }],
    keyFigures: [{ technicalName: "ZKF_MARGIN", kind: "restricted", baseKeyFigure: "0MARGIN", description: "Margin EU" }],
    filters: [{ characteristic: "0COMP_CODE", operator: "EQUAL", value: "1000" }],
    conditions: [{ keyFigure: "0NETSALES", operator: "GREATER_THAN", threshold: 100 }],
    exceptions: [{ keyFigure: "0NETSALES", alertLevel: "BAD1", operator: "LESS_THAN", threshold: 0 }],
    display: { zeroSuppression: { rows: true, columns: false, mode: "FOR_ALL_VALUES" } },
  };
  const model = {
    axes: {
      rows: [
        { kind: "characteristic", infoObjectName: "0customer" },
        { kind: "characteristic", infoObjectName: "0MATERIAL" },
      ],
      columns: [{
        kind: "structure", technicalName: "KFSTRUCT", members: [
          { type: "selection", description: "Net sales", groups: [{ infoObject: "0NETSALES", tokens: [] }] },
          { type: "selection", description: "Margin EU", groups: [{ infoObject: "0MARGIN", tokens: [] }] },
        ],
      }],
      free: [{ kind: "characteristic", infoObjectName: "0CALMONTH" }],
    },
    filter: { selections: [{ infoObject: "0COMP_CODE", tokens: [] }] },
    conditions: [{ infoObject: "0NETSALES", tokens: [] }],
    exceptions: [{ infoObject: "0NETSALES", tokens: [] }],
    settings: { zeroSuppression: { rows: true, columns: false, mode: "FOR_ALL_VALUES" } },
    serializationIssues: [],
  };
  const checks = subject.verifyPopulation(spec, model);
  assert.equal(checks.some((check) => check.status === "DIVERGED"), false);
  assert.ok(checks.some((check) => check.status === "VERIFIED"));
  assert.equal(subject.summarizeVerification(checks).status, "VERIFIED");
});

test("verifyPopulation DIVERGES on wrong axis, missing member, and wrong zero suppression", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");

  const wrongAxis = subject.verifyPopulation(
    { axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] } },
    { axes: { rows: [], columns: [{ kind: "characteristic", infoObjectName: "0CUSTOMER" }], free: [] }, serializationIssues: [] },
  );
  assert.equal(wrongAxis[0].status, "DIVERGED");
  assert.equal(subject.summarizeVerification(wrongAxis).status, "DIVERGED");

  const missingMember = subject.verifyPopulation(
    { axes: { rows: [], columns: [{ technicalName: "KFSTRUCT", kind: "structure" }], free: [] }, structures: [{ technicalName: "KFSTRUCT", members: ["0NETSALES", "0QUANTITY"] }] },
    { axes: { rows: [], columns: [{ kind: "structure", technicalName: "KFSTRUCT", members: [{ type: "selection", description: "Net", groups: [{ infoObject: "0NETSALES", tokens: [] }] }] }], free: [] }, serializationIssues: [] },
  );
  assert.equal(missingMember[0].status, "DIVERGED");
  assert.match(missingMember[0].detail, /0QUANTITY/);

  const wrongZeroSuppression = subject.verifyPopulation(
    { axes: { rows: [], columns: [], free: [] }, display: { zeroSuppression: { rows: true, columns: true } } },
    { axes: { rows: [], columns: [], free: [] }, settings: { zeroSuppression: { rows: false, columns: true } }, serializationIssues: [] },
  );
  assert.equal(wrongZeroSuppression[0].status, "DIVERGED");
});

test("key figures placed as axis elements without explicit structures are verified", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");
  const spec = {
    axes: { rows: [], columns: [{ technicalName: "ZRK_DE", kind: "keyFigure" }], free: [] },
    keyFigures: [{ technicalName: "ZRK_DE", kind: "restricted", baseKeyFigure: "0NETSALES", description: "Sales Germany" }],
  };
  const present = subject.verifyPopulation(spec, {
    found: true,
    axes: {
      rows: [], free: [],
      columns: [{ kind: "structure", members: [{ type: "selection", description: "Sales Germany", groups: [{ infoObject: "0NETSALES", tokens: [] }] }] }],
    },
    serializationIssues: [],
  });
  assert.ok(present.some((check) => check.path === "axes.columns[ZRK_DE]" && check.status === "VERIFIED"));
  const absent = subject.verifyPopulation(spec, {
    found: true,
    axes: { rows: [], columns: [{ kind: "structure", members: [] }], free: [] },
    serializationIssues: [],
  });
  assert.ok(absent.some((check) => check.path === "axes.columns[ZRK_DE]" && check.status === "DIVERGED"));
  assert.equal(subject.summarizeVerification(absent).status, "DIVERGED");
});

test("a found:false model yields no checks and summarizes as UNAVAILABLE", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");
  const checks = subject.verifyPopulation(
    { axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] } },
    { found: false, userActionRequired: true, serializationIssues: [] },
  );
  assert.deepEqual(checks, []);
  assert.equal(subject.summarizeVerification(checks).status, "UNAVAILABLE");
});

test("zero suppression mode comparison tolerates EMF literal casing differences", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");
  const checks = subject.verifyPopulation(
    { axes: { rows: [], columns: [], free: [] }, display: { zeroSuppression: { rows: true, mode: "FOR_ALL_VALUES" } } },
    { found: true, axes: { rows: [], columns: [], free: [] }, settings: { zeroSuppression: { rows: true, columns: false, mode: "ForAllValues" } }, serializationIssues: [] },
  );
  const zeroSuppression = checks.find((check) => check.path === "display.zeroSuppression");
  assert.equal(zeroSuppression.status, "VERIFIED");
});

test("verifyPopulation prefers UNCHECKED over DIVERGED when the model area has serializationIssues", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");
  const checks = subject.verifyPopulation(
    { axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [], free: [] } },
    { axes: { rows: [], columns: [], free: [] }, serializationIssues: ["axes.rows[0]: NullPointerException"] },
  );
  assert.equal(checks[0].status, "UNCHECKED");
  assert.equal(subject.summarizeVerification(checks).status, "UNAVAILABLE");
});

test("summarizeVerification keeps VERIFIED when only VERIFIED and UNCHECKED are present", async () => {
  const subject = await load(verifyUrl);
  assert.ok(subject, "populate-verify module is not implemented");
  const summary = subject.summarizeVerification([
    { path: "a", status: "VERIFIED", detail: "" },
    { path: "b", status: "UNCHECKED", detail: "" },
  ]);
  assert.equal(summary.status, "VERIFIED");
  assert.deepEqual(summary.counts, { verified: 1, diverged: 0, unchecked: 1 });
});

test("bw_populate_query_editor merges VERIFIED verification from a matching deep read", async () => {
  const subject = await load(handlersUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const store = new drafts.DraftStore();
  const draft = store.create(minimalSpec);
  const fixture = dependencies(store, (method) => {
    if (method === "listQueries") return { technicalNames: [] };
    if (method === "populateQueryEditor") return { populated: true, saved: false, applyReport: [] };
    if (method === "readQueryModel") return matchingMinimalModel();
    return { method };
  });
  const handlers = subject.createToolHandlers(fixture.deps);
  await handlers.bw_prepare_new_query_save({ draftId: draft.id });
  const result = await handlers.bw_populate_query_editor({ draftId: draft.id });
  assert.equal(result.saved, false);
  assert.equal(result.verification.status, "VERIFIED");
  assert.ok(result.verification.checks.some((check) => check.path === "axes.rows[0CUSTOMER]" && check.status === "VERIFIED"));
  assert.deepEqual(fixture.calls.map((call) => call.method), ["listQueries", "prepareNewQuerySave", "populateQueryEditor", "readQueryModel"]);
});

test("bw_populate_query_editor stays non-fatal with UNAVAILABLE when the deep read throws", async () => {
  const subject = await load(handlersUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const store = new drafts.DraftStore();
  const draft = store.create(minimalSpec);
  const fixture = dependencies(store, (method) => {
    if (method === "listQueries") return { technicalNames: [] };
    if (method === "populateQueryEditor") return { populated: true, saved: false, applyReport: [] };
    if (method === "readQueryModel") throw new Error("Eclipse bridge timed out for readQueryModel");
    return { method };
  });
  const handlers = subject.createToolHandlers(fixture.deps);
  await handlers.bw_prepare_new_query_save({ draftId: draft.id });
  const result = await handlers.bw_populate_query_editor({ draftId: draft.id });
  assert.equal(result.saved, false);
  assert.equal(result.populated, true);
  assert.equal(result.verification.status, "UNAVAILABLE");
  assert.deepEqual(result.verification.checks, []);
});
