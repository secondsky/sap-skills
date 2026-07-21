const closedObject = (properties = {}, required = []) => ({ type: "object", properties, required, additionalProperties: false });
const string = (extra = {}) => ({ type: "string", ...extra });
const stringArray = { type: "array", items: string() };

// Enum literals mirror the BWMT 1.27.36 EEnums recorded in references/bwmt-api-map.md.
// The Eclipse-side builder re-verifies each literal against the live QueryPackage before applying it.
const COMPARISON_OPERATORS = Object.freeze(["EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN", "LESS_EQUAL", "GREATER_EQUAL", "BETWEEN", "NOT_BETWEEN", "CONTAINS_PATTERN", "NOT_PATTERN"]);
const CONDITION_OPERATORS = Object.freeze(["EQUAL", "NOT_EQUAL_TO", "LESS_THAN", "GREATER_THAN", "LESS_EQUAL", "GREATER_EQUAL", "BETWEEN", "NOT_BETWEEN", "TOP_N", "BOTTOM_N", "TOP", "BOTTOM", "TOP_SUM", "BOTTOM_SUM"]);
const EXCEPTION_OPERATORS = Object.freeze(["EQUAL", "NOT_EQUAL_TO", "LESS_THAN", "GREATER_THAN", "LESS_EQUAL", "GREATER_EQUAL", "BETWEEN", "NOT_BETWEEN"]);
const ALERT_LEVELS = Object.freeze(["GOOD1", "GOOD2", "GOOD3", "CRITICAL1", "CRITICAL2", "CRITICAL3", "BAD1", "BAD2", "BAD3"]);
const ZERO_SUPPRESSION_MODES = Object.freeze(["FOR_RESULTS_ONLY", "FOR_ALL_VALUES"]);

const targetSchema = closedObject({
  system: string(), client: string({ pattern: "^[0-9]{3}$" }), project: string(), provider: string(),
}, ["system", "client", "project", "provider"]);

const axisElementSchema = closedObject({
  technicalName: string(),
  kind: string({ enum: ["characteristic", "keyFigure", "structure", "formula"] }),
  label: string(), hierarchy: string(), display: string(), structure: string(),
}, ["technicalName"]);

const restrictionSchema = closedObject({
  characteristic: string(),
  operator: string({ enum: COMPARISON_OPERATORS }),
  values: { type: "array", items: {} },
  high: {},
  excluding: { type: "boolean" },
  variable: string(),
}, ["characteristic"]);

const keyFigureSchema = closedObject({
  technicalName: string(),
  kind: string({ enum: ["basic", "restricted", "calculated", "formula"] }),
  description: string(),
  baseKeyFigure: string(),
  restrictions: { type: "array", items: restrictionSchema },
  formula: closedObject({ expression: string(), operands: stringArray }, ["expression"]),
  aggregation: closedObject({ exception: string(), referenceCharacteristic: string() }, []),
  display: closedObject({ decimals: { type: "integer", minimum: 0, maximum: 9 }, scaling: { type: "integer" }, emphasize: string(), hidden: { type: "boolean" } }, []),
}, ["technicalName"]);

const structureSchema = closedObject({
  technicalName: string(),
  kind: string({ enum: ["keyFigure", "characteristic"] }),
  description: string(),
  members: stringArray,
}, ["technicalName", "members"]);

const hierarchySchema = closedObject({
  characteristic: string(), hierarchyName: string(), version: string(),
  displayLevel: { type: "integer", minimum: 0 }, expandToLevel: { type: "integer", minimum: 0 },
}, ["characteristic", "hierarchyName"]);

const formulaSchema = closedObject({
  technicalName: string(), description: string(), expression: string(),
  exceptionAggregation: string(), referenceCharacteristic: string(),
}, ["technicalName", "expression"]);

const conditionSchema = closedObject({
  description: string(),
  keyFigure: string(),
  operator: string({ enum: CONDITION_OPERATORS }),
  threshold: {},
  thresholdHigh: {},
  characteristics: stringArray,
  active: { type: "boolean" },
}, ["keyFigure", "operator", "threshold"]);

const exceptionSchema = closedObject({
  description: string(),
  keyFigure: string(),
  alertLevel: string({ enum: ALERT_LEVELS }),
  operator: string({ enum: EXCEPTION_OPERATORS }),
  threshold: {},
  thresholdHigh: {},
  affectsDataCells: { type: "boolean" },
  active: { type: "boolean" },
}, ["alertLevel", "operator", "threshold"]);

const displaySchema = closedObject({
  zeroSuppression: closedObject({
    rows: { type: "boolean" }, columns: { type: "boolean" },
    mode: string({ enum: ZERO_SUPPRESSION_MODES }),
  }, []),
  suppressRepeatedKeyValues: { type: "boolean" },
  signPresentation: string(),
  resultPosition: string(),
}, []);

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
  keyFigures: { type: "array", items: keyFigureSchema },
  structures: { type: "array", items: structureSchema },
  filters: { type: "array", items: closedObject({ characteristic: string(), operator: string(), value: {}, high: {}, excluding: { type: "boolean" } }, ["characteristic", "operator"]) },
  variables: { type: "array", items: closedObject({ technicalName: string(), value: {}, defaultValue: {}, binding: string(), characteristic: string(), processingType: string(), representation: string(), readyForInput: { type: "boolean" } }, ["technicalName"]) },
  hierarchies: { type: "array", items: hierarchySchema },
  formulas: { type: "array", items: formulaSchema },
  conditions: { type: "array", items: conditionSchema },
  exceptions: { type: "array", items: exceptionSchema },
  display: displaySchema,
  aggregation: closedObject({ confirmed: { type: "boolean" }, notes: string() }, []),
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
  tool("bw_read_query_model", closedObject({ alias: string(), project: string(), technicalName: string() }, ["alias", "project", "technicalName"]), "read-only tenant"),
  tool("bw_review_query", closedObject({ alias: string(), project: string(), technicalName: string() }, ["alias", "project", "technicalName"]), "read-only tenant"),
  tool("bw_resolve_and_validate_spec", closedObject({ spec: querySpecSchema, alias: string() }, ["spec"])),
  tool("bw_create_local_draft", closedObject({ spec: querySpecSchema }, ["spec"])),
  tool("bw_apply_spec_to_draft", closedObject({ draftId: string(), spec: querySpecSchema }, ["draftId", "spec"])),
  tool("bw_preview_draft", closedObject({ draftId: string() }, ["draftId"])),
  tool("bw_prepare_new_query_save", closedObject({ draftId: string() }, ["draftId"]), "mutating tenant", true),
  tool("bw_populate_query_editor", closedObject({ draftId: string() }, ["draftId"])),
]);

export {
  connectionSchema, querySpecSchema,
  COMPARISON_OPERATORS, CONDITION_OPERATORS, EXCEPTION_OPERATORS, ALERT_LEVELS, ZERO_SUPPRESSION_MODES,
};
