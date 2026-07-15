import { findSecretPaths } from "./secret-guard.mjs";

const TOP_LEVEL_FIELDS = new Set([
  "version", "target", "technicalName", "description", "axes", "keyFigures", "filters", "variables",
  "hierarchies", "formulas", "conditions", "exceptions", "display", "aggregation", "businessPurpose",
  "acceptanceCriteria", "evidence",
]);
const TARGET_FIELDS = new Set(["system", "client", "project", "provider"]);
const AXIS_FIELDS = new Set(["rows", "columns", "free"]);
const ELEMENT_FIELDS = new Set(["technicalName", "kind", "label", "hierarchy", "display"]);

function unknownFields(value, allowed, path) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.keys(value).filter((key) => !allowed.has(key)).map((key) => `${path}.${key}`);
}

function requiredString(value, path, errors) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${path} is required`);
}

function validateShape(spec) {
  const errors = [];
  if (!spec || typeof spec !== "object" || Array.isArray(spec)) return ["QuerySpec must be an object"];
  for (const path of unknownFields(spec, TOP_LEVEL_FIELDS, "$")) errors.push(`Unknown property ${path}`);
  for (const path of findSecretPaths(spec)) errors.push(`Unknown or prohibited property ${path.split(".").at(-1)}`);
  if (spec.version !== 1) errors.push("version must equal 1");
  if (!spec.target || typeof spec.target !== "object") errors.push("target is required");
  else {
    for (const path of unknownFields(spec.target, TARGET_FIELDS, "$.target")) errors.push(`Unknown property ${path}`);
    for (const name of TARGET_FIELDS) requiredString(spec.target[name], `target.${name}`, errors);
  }
  requiredString(spec.technicalName, "technicalName", errors);
  requiredString(spec.businessPurpose, "businessPurpose", errors);
  if (!spec.axes || typeof spec.axes !== "object") errors.push("axes is required");
  else {
    for (const path of unknownFields(spec.axes, AXIS_FIELDS, "$.axes")) errors.push(`Unknown property ${path}`);
    for (const axis of ["rows", "columns", "free"]) {
      if (spec.axes[axis] === undefined) continue;
      if (!Array.isArray(spec.axes[axis])) errors.push(`axes.${axis} must be an array`);
      else spec.axes[axis].forEach((element, index) => {
        for (const path of unknownFields(element, ELEMENT_FIELDS, `$.axes.${axis}[${index}]`)) errors.push(`Unknown property ${path}`);
        requiredString(element?.technicalName, `axes.${axis}[${index}].technicalName`, errors);
      });
    }
  }
  if (!Array.isArray(spec.acceptanceCriteria)) errors.push("acceptanceCriteria must be an array");
  if (!Array.isArray(spec.evidence)) errors.push("evidence must be an array");
  return [...new Set(errors)];
}

function analyzeGaps(spec) {
  const gaps = [];
  if (!Array.isArray(spec.acceptanceCriteria) || spec.acceptanceCriteria.length === 0) {
    gaps.push({ code: "MISSING_ACCEPTANCE_CRITERIA", severity: "warning", message: "Define measurable reconciliation or output criteria." });
  }
  for (const [index, filter] of (spec.filters ?? []).entries()) {
    const needsTwoValues = String(filter?.operator ?? "").toUpperCase() === "BETWEEN";
    if (!filter?.characteristic || filter?.value === undefined || (needsTwoValues && filter?.high === undefined)) {
      gaps.push({ code: "AMBIGUOUS_FILTER", severity: "warning", path: `filters[${index}]`, message: "Specify characteristic, operator, and complete values." });
    }
  }
  for (const [index, variable] of (spec.variables ?? []).entries()) {
    if (variable?.defaultValue === undefined && variable?.binding === undefined && variable?.value === undefined) {
      gaps.push({ code: "UNDEFINED_VARIABLE", severity: "warning", path: `variables[${index}]`, message: "Define a value, default, or runtime binding." });
    }
  }
  if (!spec.aggregation) {
    gaps.push({ code: "AGGREGATION_UNSPECIFIED", severity: "info", message: "Confirm aggregation semantics against provider metadata." });
  }
  if (!Array.isArray(spec.evidence) || spec.evidence.length === 0) {
    gaps.push({ code: "MISSING_EVIDENCE", severity: "info", message: "Attach specification or reconciliation evidence before save." });
  }
  return gaps;
}

function suggestOptimizations(spec) {
  const optimizations = [];
  const rowCount = spec.axes?.rows?.length ?? 0;
  if (rowCount > 8) {
    optimizations.push({ code: "HIGH_AXIS_CARDINALITY", message: "Review row characteristics and move optional drilldowns to the free axis.", changesBusinessSemantics: false });
  }
  if ((spec.filters ?? []).length === 0) {
    optimizations.push({ code: "UNRESTRICTED_PROVIDER", message: "Consider selective filters after confirming the intended business scope.", changesBusinessSemantics: true });
  }
  return optimizations;
}

export function resolveAndValidateSpec(input) {
  const spec = structuredClone(input);
  const errors = validateShape(spec);
  return {
    valid: errors.length === 0,
    errors,
    gaps: analyzeGaps(spec),
    optimizations: suggestOptimizations(spec),
    resolvedSpec: spec,
  };
}

export const QUERY_SPEC_TOP_LEVEL_FIELDS = Object.freeze([...TOP_LEVEL_FIELDS]);
