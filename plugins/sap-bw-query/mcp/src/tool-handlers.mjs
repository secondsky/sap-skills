import { assertNoSecrets, sanitizeForLog, SecretRejectedError } from "./secret-guard.mjs";
import { resolveAndValidateSpec } from "./query-spec.mjs";
import { normalizeProviderMetadata } from "./provider-metadata.mjs";
import { connectionEndpoint, testReachability } from "./connection-store.mjs";
import { verifyPopulation, summarizeVerification } from "./populate-verify.mjs";
import { runRules, normalizeFromSpec, normalizeFromModel } from "./query-rules.mjs";
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
    bw_read_query_model: (input) => bridge.call("readQueryModel", input),
    bw_review_query: async ({ alias, project, technicalName }) => {
      // Read-only best-practices review of an OPEN query. Reuses the Task-A deep-read bridge
      // call (no new bridge method) and runs the shared rule engine over the deep model.
      const model = await bridge.call("readQueryModel", { alias, project, technicalName });
      if (!model || model.found !== true) {
        return {
          found: false,
          userActionRequired: model?.userActionRequired,
          instruction: model?.instruction,
          findings: [],
        };
      }
      return {
        found: true,
        technicalName: model.technicalName ?? technicalName ?? null,
        provider: model.provider ?? null,
        findings: runRules(normalizeFromModel(model)),
        serializationIssues: model.serializationIssues ?? [],
        readOnly: true,
      };
    },
    bw_resolve_and_validate_spec: async ({ spec, alias }) => {
      let providerMetadata = null;
      if (alias !== undefined) {
        try {
          const described = await bridge.call("describeProvider", {
            alias,
            project: spec?.target?.project,
            provider: spec?.target?.provider,
          });
          providerMetadata = normalizeProviderMetadata(described);
        } catch {
          providerMetadata = { available: false, reason: "BRIDGE_UNAVAILABLE", instruction: "Launch the studio and open the BW project, then rerun validation with the alias to verify names against the provider." };
        }
      }
      const result = resolveAndValidateSpec(spec, { providerMetadata });
      // Additive best-practices review of a draft spec; only meaningful for a valid spec.
      const bestPractices = result.valid === true ? runRules(normalizeFromSpec(spec)) : [];
      return { ...result, bestPractices };
    },
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
    bw_populate_query_editor: async ({ draftId }) => {
      const draft = drafts.get(draftId);
      if (draft.state !== "SAVE_PENDING_HUMAN") {
        throw new Error("Run bw_prepare_new_query_save first, confirm in Eclipse, and finish the native wizard before populating the editor.");
      }
      const result = await bridge.call("populateQueryEditor", {
        id: draft.id,
        spec: draft.spec,
        specHash: draft.specHash,
        confirmationBinding: {
          technicalName: draft.spec.technicalName,
          provider: draft.spec.target.provider,
          specHash: draft.specHash,
        },
      });
      const output = { ...result, saved: false };
      if (result?.populated === true) {
        try {
          const model = await bridge.call("readQueryModel", {
            alias: null,
            project: draft.spec.target.project,
            technicalName: draft.spec.technicalName,
          });
          output.verification = summarizeVerification(verifyPopulation(draft.spec, model));
        } catch {
          output.verification = { status: "UNAVAILABLE", checks: [] };
        }
      }
      return output;
    },
  };

  const expected = new Set(TOOL_DEFINITIONS.map((tool) => tool.name));
  if (Object.keys(raw).some((name) => !expected.has(name)) || Object.keys(raw).length !== expected.size) {
    throw new Error("Tool handler surface does not match the approved registry");
  }
  return Object.fromEntries(Object.entries(raw).map(([name, handler]) => [name, wrap(name, steps, handler)]));
}
