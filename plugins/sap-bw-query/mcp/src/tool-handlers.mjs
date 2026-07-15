import { assertNoSecrets, sanitizeForLog, SecretRejectedError } from "./secret-guard.mjs";
import { resolveAndValidateSpec } from "./query-spec.mjs";
import { connectionEndpoint, testReachability } from "./connection-store.mjs";
import { TOOL_DEFINITIONS } from "./tool-registry.mjs";

function wrap(name, steps, handler) {
  return async (input = {}) => {
    try {
      assertNoSecrets(input);
      steps.append?.({ tool: name, status: "STARTED", input: sanitizeForLog(input) });
      const result = await handler(input);
      steps.append?.({ tool: name, status: "COMPLETED" });
      return result;
    } catch (error) {
      steps.append?.({
        tool: name,
        status: "BLOCKED",
        sticky: error instanceof SecretRejectedError,
        message: error instanceof SecretRejectedError ? error.message : "Operation blocked; inspect local diagnostics.",
      });
      throw error;
    }
  };
}

export function createToolHandlers({ studio, connections, drafts, bridge, steps = {} }) {
  const raw = {
    bw_studio_status: () => studio.run("Status", {}),
    bw_studio_deploy: (input) => studio.run("Deploy", input),
    bw_studio_launch: (input) => studio.run("Launch", input),
    bw_studio_rollback: (input) => studio.run("Rollback", input),
    bw_studio_diagnostics: () => studio.run("Diagnostics", {}),
    bw_connection_prepare: ({ connection }) => connections.prepare(connection),
    bw_connection_import_landscape: ({ landscapePath, alias }) => connections.importLandscape(landscapePath, alias),
    bw_connection_test_reachability: async ({ alias, timeoutMs }) => {
      const endpoint = connectionEndpoint(connections.status(alias));
      return connections.reachability ? connections.reachability({ ...endpoint, timeoutMs }) : testReachability({ ...endpoint, timeoutMs });
    },
    bw_project_create_or_open: async (input) => {
      const connection = connections.status(input.alias);
      const result = await bridge.call("projectCreateOrOpen", { ...input, connection });
      return connection.ssoEnabled === true
        ? result
        : { ...result, userActionRequired: true, instruction: "Enter the password only in the native SAP login dialog. Passwords are never accepted by the automation." };
    },
    bw_connection_status: ({ alias }) => connections.status(alias),
    bw_inspect_capabilities: (input) => bridge.call("inspectCapabilities", input),
    bw_describe_provider: (input) => bridge.call("describeProvider", input),
    bw_list_queries: (input) => bridge.call("listQueries", input),
    bw_read_query: (input) => bridge.call("readQuery", input),
    bw_resolve_and_validate_spec: ({ spec }) => resolveAndValidateSpec(spec),
    bw_create_local_draft: async ({ spec }) => {
      const draft = drafts.create(spec);
      await bridge.call("createLocalDraft", draft);
      return draft;
    },
    bw_apply_spec_to_draft: async ({ draftId, spec }) => {
      const draft = drafts.apply(draftId, spec);
      await bridge.call("applySpecToDraft", draft);
      return draft;
    },
    bw_preview_draft: async ({ draftId }) => {
      const draft = drafts.get(draftId);
      return bridge.call("previewDraft", draft);
    },
    bw_prepare_new_query_save: async ({ draftId }) => {
      const draft = drafts.get(draftId);
      const existing = await bridge.call("listQueries", {
        alias: null,
        project: draft.spec.target.project,
        provider: draft.spec.target.provider,
      });
      const prepared = drafts.prepareSave(draftId, { existingTechnicalNames: existing.technicalNames ?? [] });
      await bridge.call("prepareNewQuerySave", prepared);
      return prepared;
    },
  };

  const expected = new Set(TOOL_DEFINITIONS.map((tool) => tool.name));
  if (Object.keys(raw).some((name) => !expected.has(name)) || Object.keys(raw).length !== expected.size) {
    throw new Error("Tool handler surface does not match the approved registry");
  }
  return Object.fromEntries(Object.entries(raw).map(([name, handler]) => [name, wrap(name, steps, handler)]));
}
