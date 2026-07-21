import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const subjectUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/tool-handlers.mjs"));
const draftsUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/draft-state.mjs"));

async function load(url) {
  try { return await import(url); } catch { return null; }
}

const spec = {
  version: 1,
  target: { system: "BWD", client: "100", project: "BWD_100", provider: "ZCUBE_SALES" },
  technicalName: "Z_SALES_NEW",
  axes: { rows: [{ technicalName: "0CUSTOMER" }], columns: [{ technicalName: "0NETSALES", kind: "keyFigure" }] },
  businessPurpose: "Analyze net sales by customer",
  acceptanceCriteria: ["Reconciles to monthly control total"],
  evidence: [],
};

function dependencies(draftStore) {
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
      bridge: { call: async (method, input) => { calls.push({ method, input }); return method === "listQueries" ? { technicalNames: [] } : { method }; } },
      steps: { append: () => undefined },
    },
  };
}

test("handlers reject secret input before invoking dependencies", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const fixture = dependencies(new drafts.DraftStore());
  const handlers = subject.createToolHandlers(fixture.deps);
  await assert.rejects(() => handlers.bw_connection_prepare({ connection: { alias: "BWD", password: "do-not-use" } }), { code: "SECRET_REJECTED" });
  assert.equal(fixture.calls.length, 0);
});

test("query read operations use only allow-listed bridge methods", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const fixture = dependencies(new drafts.DraftStore());
  const handlers = subject.createToolHandlers(fixture.deps);
  await handlers.bw_inspect_capabilities({});
  await handlers.bw_describe_provider({ alias: "BWD", project: "BWD_100", provider: "ZCUBE_SALES" });
  await handlers.bw_list_queries({ alias: "BWD", project: "BWD_100", provider: "ZCUBE_SALES" });
  await handlers.bw_read_query({ alias: "BWD", project: "BWD_100", technicalName: "Z_EXISTING" });
  assert.deepEqual(fixture.calls.map((call) => call.method), ["inspectCapabilities", "describeProvider", "listQueries", "readQuery"]);
});

test("prepare-save checks collisions and asks Eclipse only to prepare human confirmation", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const store = new drafts.DraftStore();
  const draft = store.create(spec);
  const fixture = dependencies(store);
  const handlers = subject.createToolHandlers(fixture.deps);
  const result = await handlers.bw_prepare_new_query_save({ draftId: draft.id });
  assert.equal(result.requiresEclipseHumanConfirmation, true);
  assert.deepEqual(fixture.calls.map((call) => call.method), ["listQueries", "prepareNewQuerySave"]);
  assert.equal(fixture.calls.some((call) => /save|delete|overwrite/i.test(call.method) && call.method !== "prepareNewQuerySave"), false);
});

test("spec validation with alias fetches provider metadata read-only and verifies names", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const fixture = dependencies(new drafts.DraftStore());
  fixture.deps.bridge = {
    call: async (method, input) => {
      fixture.calls.push({ method, input });
      assert.equal(method, "describeProvider");
      return {
        provider: input.provider,
        openQueries: [],
        readOnly: true,
        metadata: {
          available: true,
          characteristics: [{ name: "0CUSTOMER", description: "Customer" }],
          keyFigures: [{ name: "0NETSALES", description: "Net sales" }],
        },
      };
    },
  };
  const handlers = subject.createToolHandlers(fixture.deps);
  const result = await handlers.bw_resolve_and_validate_spec({ spec, alias: "BWD" });
  assert.equal(result.metadataChecked, true);
  assert.equal(result.readyForDraft, true);
  assert.ok(Array.isArray(result.bestPractices), "valid spec result carries a bestPractices array");
  assert.deepEqual(fixture.calls.map((call) => call.method), ["describeProvider"]);
  const failing = await handlers.bw_resolve_and_validate_spec({
    spec: { ...spec, axes: { rows: [{ technicalName: "0NOT_THERE" }], columns: spec.axes.columns } },
    alias: "BWD",
  });
  assert.equal(failing.readyForDraft, false);
  assert.ok(failing.gaps.some((gap) => gap.code === "UNKNOWN_CHARACTERISTIC"));
});

test("spec validation degrades to metadata-less review when the bridge is unavailable", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const fixture = dependencies(new drafts.DraftStore());
  fixture.deps.bridge = { call: async () => { throw new Error("studio offline"); } };
  const handlers = subject.createToolHandlers(fixture.deps);
  const result = await handlers.bw_resolve_and_validate_spec({ spec, alias: "BWD" });
  assert.equal(result.valid, true);
  assert.equal(result.metadataChecked, false);
  assert.ok(result.gaps.some((gap) => gap.code === "METADATA_UNAVAILABLE"));
  const withoutAlias = await handlers.bw_resolve_and_validate_spec({ spec });
  assert.equal(withoutAlias.metadataChecked, false);
});

test("handler map exactly matches the public tool registry", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const fixture = dependencies(new drafts.DraftStore());
  const handlers = subject.createToolHandlers(fixture.deps);
  assert.equal(Object.hasOwn(handlers, "save"), false);
  assert.equal(Object.keys(handlers).some((name) => /delete|remove|cleanup|uninstall|overwrite|transport|raw/i.test(name)), false);
  assert.equal(Object.keys(handlers).length, 22);
});

test("editor population requires a prepared save and never saves itself", async () => {
  const subject = await load(subjectUrl);
  const drafts = await load(draftsUrl);
  assert.ok(subject && drafts, "tool handlers are not implemented");
  const store = new drafts.DraftStore();
  const draft = store.create(spec);
  const fixture = dependencies(store);
  fixture.deps.bridge = {
    call: async (method, input) => {
      fixture.calls.push({ method, input });
      if (method === "listQueries") return { technicalNames: [] };
      if (method === "populateQueryEditor") {
        assert.equal(input.confirmationBinding.technicalName, spec.technicalName);
        assert.ok(input.confirmationBinding.specHash);
        assert.ok(input.spec);
        return { populated: true, saved: false, applyReport: [{ path: "axes.rows[0CUSTOMER]", status: "APPLIED" }] };
      }
      if (method === "readQueryModel") {
        assert.equal(input.technicalName, spec.technicalName);
        assert.equal(input.project, spec.target.project);
        return {
          found: true,
          technicalName: spec.technicalName,
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
      return { method };
    },
  };
  const handlers = subject.createToolHandlers(fixture.deps);
  await assert.rejects(() => handlers.bw_populate_query_editor({ draftId: draft.id }), /bw_prepare_new_query_save first/i);
  await handlers.bw_prepare_new_query_save({ draftId: draft.id });
  const result = await handlers.bw_populate_query_editor({ draftId: draft.id });
  assert.equal(result.populated, true);
  assert.equal(result.saved, false);
  assert.equal(result.applyReport.length, 1);
  assert.equal(result.verification.status, "VERIFIED");
  assert.deepEqual(fixture.calls.map((call) => call.method), ["listQueries", "prepareNewQuerySave", "populateQueryEditor", "readQueryModel"]);
});
