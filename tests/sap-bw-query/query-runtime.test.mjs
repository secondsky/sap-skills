import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
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

const minimalSpec = {
  version: 1,
  target: { system: "BWD", client: "100", project: "BWD_100", provider: "ZCUBE_SALES" },
  technicalName: "Z_SALES_MVP",
  axes: {
    rows: [{ technicalName: "0CUSTOMER" }],
    columns: [{ technicalName: "0NETSALES", kind: "keyFigure" }],
  },
  businessPurpose: "Analyze net sales by customer",
  acceptanceCriteria: ["Net sales reconcile to the approved monthly control total"],
  evidence: [],
};

test("QuerySpec v1 rejects unknown properties and never mutates caller input", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  assert.ok(subject, "QuerySpec module is not implemented");
  const original = structuredClone(minimalSpec);
  const result = subject.resolveAndValidateSpec({ ...minimalSpec, password: "not-allowed" });
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /unknown|password/i);
  assert.deepEqual(minimalSpec, original);
});

test("gap analysis identifies ambiguity, undefined variables, and performance risks", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/query-spec.mjs");
  assert.ok(subject, "QuerySpec module is not implemented");
  const result = subject.resolveAndValidateSpec({
    ...minimalSpec,
    filters: [{ characteristic: "0CALMONTH", operator: "BETWEEN" }],
    variables: [{ technicalName: "ZV_REGION" }],
    axes: { rows: Array.from({ length: 9 }, (_, i) => ({ technicalName: `ZCHAR_${i}` })), columns: minimalSpec.axes.columns },
    acceptanceCriteria: [],
  });
  assert.equal(result.valid, true);
  const gaps = result.gaps.map((gap) => gap.code);
  assert.ok(gaps.includes("AMBIGUOUS_FILTER"));
  assert.ok(gaps.includes("UNDEFINED_VARIABLE"));
  assert.ok(gaps.includes("MISSING_ACCEPTANCE_CRITERIA"));
  assert.ok(result.optimizations.some((item) => item.code === "HIGH_AXIS_CARDINALITY"));
});

test("draft state permits local edits but only prepares a new-query save", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/draft-state.mjs");
  assert.ok(subject, "draft state module is not implemented");
  const store = new subject.DraftStore({ now: () => "2026-07-13T10:00:00.000Z" });
  const draft = store.create(minimalSpec);
  assert.equal(draft.state, "LOCAL_DRAFT");
  const prepared = store.prepareSave(draft.id, { existingTechnicalNames: [] });
  assert.equal(prepared.state, "SAVE_PENDING_HUMAN");
  assert.equal(prepared.requiresEclipseHumanConfirmation, true);
  assert.ok(prepared.specHash);
  assert.throws(() => store.prepareSave(draft.id, { existingTechnicalNames: ["z_sales_mvp"] }), /already exists/i);
  assert.equal(typeof store.save, "undefined", "MCP/runtime must not expose a save method");
});

test("local drafts can be recovered from an append-only journal", async () => {
  const subject = await load("../../plugins/sap-bw-query/mcp/src/draft-state.mjs");
  assert.ok(subject, "draft state module is not implemented");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bw-draft-journal-"));
  const firstStore = new subject.DraftStore({ root });
  const created = firstStore.create(minimalSpec);
  firstStore.apply(created.id, { ...minimalSpec, description: "Second local revision" });
  const secondStore = new subject.DraftStore({ root });
  const recovered = secondStore.get(created.id);
  assert.equal(recovered.spec.description, "Second local revision");
  assert.equal(fs.readdirSync(path.join(root, created.id)).length, 2);
});
