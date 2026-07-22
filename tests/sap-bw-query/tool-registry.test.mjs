import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const registryUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/tool-registry.mjs"));

async function loadRegistry() {
  try {
    return await import(registryUrl);
  } catch {
    return null;
  }
}

const expectedTools = [
  "bw_studio_status", "bw_studio_deploy", "bw_studio_launch", "bw_studio_rollback", "bw_studio_diagnostics",
  "bw_connection_prepare", "bw_connection_import_landscape", "bw_connection_test_reachability", "bw_project_create_or_open", "bw_connection_status",
  "bw_inspect_capabilities", "bw_describe_provider", "bw_list_queries", "bw_read_query", "bw_read_query_model", "bw_review_query", "bw_resolve_and_validate_spec",
  "bw_create_local_draft", "bw_apply_spec_to_draft", "bw_preview_draft", "bw_prepare_new_query_save",
  "bw_populate_query_editor",
];

test("tool registry exposes the approved surface and no final-save/delete surface", async () => {
  const subject = await loadRegistry();
  assert.ok(subject, "tool registry is not implemented");
  const names = subject.TOOL_DEFINITIONS.map((tool) => tool.name).sort();
  assert.deepEqual(names, [...expectedTools].sort());
  assert.equal(names.some((name) => /delete|remove|drop|overwrite|cleanup|uninstall|transport|raw|confirm.*save/i.test(name)), false);
});

test("every public schema is closed and contains no credential fields", async () => {
  const subject = await loadRegistry();
  assert.ok(subject, "tool registry is not implemented");
  for (const tool of subject.TOOL_DEFINITIONS) {
    assert.equal(tool.inputSchema.type, "object", tool.name);
    assert.equal(tool.inputSchema.additionalProperties, false, tool.name);
    assert.doesNotMatch(JSON.stringify(tool.inputSchema), /password|passwd|\bpwd\b|secret|token|apiKey|credential/i, tool.name);
  }
});

test("only prepare-new-save is classified as tenant mutation and requires approval", async () => {
  const subject = await loadRegistry();
  assert.ok(subject, "tool registry is not implemented");
  for (const tool of subject.TOOL_DEFINITIONS) {
    if (tool.name === "bw_prepare_new_query_save") {
      assert.equal(tool.operationClass, "mutating tenant");
      assert.equal(tool.approvalRequired, true);
    } else {
      assert.notEqual(tool.operationClass, "destructive");
    }
  }
});
