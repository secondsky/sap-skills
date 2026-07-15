const closedObject = (properties = {}, required = []) => ({ type: "object", properties, required, additionalProperties: false });
const string = (extra = {}) => ({ type: "string", ...extra });
const stringArray = { type: "array", items: string() };

const targetSchema = closedObject({
  system: string(), client: string({ pattern: "^[0-9]{3}$" }), project: string(), provider: string(),
}, ["system", "client", "project", "provider"]);

const axisElementSchema = closedObject({
  technicalName: string(),
  kind: string({ enum: ["characteristic", "keyFigure", "structure", "formula"] }),
  label: string(), hierarchy: string(), display: string(),
}, ["technicalName"]);

const querySpecSchema = closedObject({
  version: { type: "integer", const: 1 },
  target: targetSchema,
  technicalName: string({ pattern: "^[A-Z0-9_]+$" }),
  description: string(),
  axes: closedObject({
    rows: { type: "array", items: axisElementSchema },
    columns: { type: "array", items: axisElementSchema },
    free: { type: "array", items: axisElementSchema },
  }, ["rows", "columns"]),
  keyFigures: { type: "array", items: closedObject({}, []) },
  filters: { type: "array", items: closedObject({ characteristic: string(), operator: string(), value: {}, high: {} }, ["characteristic", "operator"]) },
  variables: { type: "array", items: closedObject({ technicalName: string(), value: {}, defaultValue: {}, binding: string() }, ["technicalName"]) },
  hierarchies: { type: "array", items: closedObject({}, []) },
  formulas: { type: "array", items: closedObject({}, []) },
  conditions: { type: "array", items: closedObject({}, []) },
  exceptions: { type: "array", items: closedObject({}, []) },
  display: closedObject({}, []),
  aggregation: closedObject({}, []),
  businessPurpose: string(),
  acceptanceCriteria: stringArray,
  evidence: { type: "array", items: closedObject({ source: string(), reference: string(), checkedAt: string() }, []) },
}, ["version", "target", "technicalName", "axes", "businessPurpose", "acceptanceCriteria", "evidence"]);

const connectionSchema = closedObject({
  alias: string(), systemId: string(), client: string({ pattern: "^[0-9]{3}$" }), language: string(), userId: string(),
  mode: string({ enum: ["applicationServer", "messageServer"] }), applicationServer: string(), systemNumber: string(),
  messageServer: string(), logonGroup: string(), sncEnabled: { type: "boolean" }, ssoEnabled: { type: "boolean" },
}, ["alias", "systemId", "client", "mode"]);

function tool(name, inputSchema, operationClass = "local-only", approvalRequired = false) {
  return Object.freeze({ name, inputSchema, operationClass, approvalRequired });
}

export const TOOL_DEFINITIONS = Object.freeze([
  tool("bw_studio_status", closedObject()),
  tool("bw_studio_deploy", closedObject({ artifactPath: string(), manifestPath: string(), signaturePath: string(), trustPolicyPath: string(), releaseChannelUrl: string() })),
  tool("bw_studio_launch", closedObject({ workspacePath: string(), connectionAlias: string() })),
  tool("bw_studio_rollback", closedObject({ targetVersion: string() }, ["targetVersion"])),
  tool("bw_studio_diagnostics", closedObject()),
  tool("bw_connection_prepare", closedObject({ connection: connectionSchema }, ["connection"])),
  tool("bw_connection_import_landscape", closedObject({ landscapePath: string(), alias: string() }, ["landscapePath"])),
  tool("bw_connection_test_reachability", closedObject({ alias: string(), timeoutMs: { type: "integer", minimum: 100, maximum: 30000 } }, ["alias"]), "read-only tenant"),
  tool("bw_project_create_or_open", closedObject({ alias: string(), project: string() }, ["alias", "project"])),
  tool("bw_connection_status", closedObject({ alias: string() }, ["alias"])),
  tool("bw_inspect_capabilities", closedObject(), "read-only tenant"),
  tool("bw_describe_provider", closedObject({ alias: string(), project: string(), provider: string() }, ["alias", "project", "provider"]), "read-only tenant"),
  tool("bw_list_queries", closedObject({ alias: string(), project: string(), provider: string() }, ["alias", "project", "provider"]), "read-only tenant"),
  tool("bw_read_query", closedObject({ alias: string(), project: string(), technicalName: string() }, ["alias", "project", "technicalName"]), "read-only tenant"),
  tool("bw_resolve_and_validate_spec", closedObject({ spec: querySpecSchema }, ["spec"])),
  tool("bw_create_local_draft", closedObject({ spec: querySpecSchema }, ["spec"])),
  tool("bw_apply_spec_to_draft", closedObject({ draftId: string(), spec: querySpecSchema }, ["draftId", "spec"])),
  tool("bw_preview_draft", closedObject({ draftId: string() }, ["draftId"])),
  tool("bw_prepare_new_query_save", closedObject({ draftId: string() }, ["draftId"]), "mutating tenant", true),
]);

export { connectionSchema, querySpecSchema };
