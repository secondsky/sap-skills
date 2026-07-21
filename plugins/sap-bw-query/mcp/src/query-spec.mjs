import { findSecretPaths } from "./secret-guard.mjs";
import {
  ALERT_LEVELS, COMPARISON_OPERATORS, CONDITION_OPERATORS, EXCEPTION_OPERATORS, ZERO_SUPPRESSION_MODES,
} from "./tool-registry.mjs";

const TOP_LEVEL_FIELDS = new Set([
  "version", "target", "technicalName", "description", "axes", "keyFigures", "structures", "filters", "variables",
  "hierarchies", "formulas", "conditions", "exceptions", "display", "aggregation", "businessPurpose",
  "acceptanceCriteria", "evidence",
]);
const TARGET_FIELDS = new Set(["system", "client", "project", "provider"]);
const AXIS_FIELDS = new Set(["rows", "columns", "free"]);
const ELEMENT_FIELDS = new Set(["technicalName", "kind", "label", "hierarchy", "display", "structure"]);
const KEY_FIGURE_FIELDS = new Set(["technicalName", "kind", "description", "baseKeyFigure", "restrictions", "formula", "aggregation", "display"]);
const KEY_FIGURE_KINDS = new Set(["basic", "restricted", "calculated", "formula"]);
const RESTRICTION_FIELDS = new Set(["characteristic", "operator", "values", "high", "excluding", "variable"]);
const STRUCTURE_FIELDS = new Set(["technicalName", "kind", "description", "members"]);
const STRUCTURE_KINDS = new Set(["keyFigure", "characteristic"]);
const HIERARCHY_FIELDS = new Set(["characteristic", "hierarchyName", "version", "displayLevel", "expandToLevel"]);
const FORMULA_FIELDS = new Set(["technicalName", "description", "expression", "exceptionAggregation", "referenceCharacteristic"]);
const CONDITION_FIELDS = new Set(["description", "keyFigure", "operator", "threshold", "thresholdHigh", "characteristics", "active"]);
const EXCEPTION_FIELDS = new Set(["description", "keyFigure", "alertLevel", "operator", "threshold", "thresholdHigh", "affectsDataCells", "active"]);
const DISPLAY_FIELDS = new Set(["zeroSuppression", "suppressRepeatedKeyValues", "signPresentation", "resultPosition"]);
const ZERO_SUPPRESSION_FIELDS = new Set(["rows", "columns", "mode"]);
const AGGREGATION_FIELDS = new Set(["confirmed", "notes"]);
const VARIABLE_FIELDS = new Set(["technicalName", "value", "defaultValue", "binding", "characteristic", "processingType", "representation", "readyForInput"]);
const FILTER_FIELDS = new Set(["characteristic", "operator", "value", "high", "excluding"]);

const COMPARISON_OPERATOR_SET = new Set(COMPARISON_OPERATORS);
const CONDITION_OPERATOR_SET = new Set(CONDITION_OPERATORS);
const EXCEPTION_OPERATOR_SET = new Set(EXCEPTION_OPERATORS);
const ALERT_LEVEL_SET = new Set(ALERT_LEVELS);
const ZERO_SUPPRESSION_MODE_SET = new Set(ZERO_SUPPRESSION_MODES);
const RANGE_OPERATORS = new Set(["BETWEEN", "NOT_BETWEEN"]);

function unknownFields(value, allowed, path) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.keys(value).filter((key) => !allowed.has(key)).map((key) => `${path}.${key}`);
}

function requiredString(value, path, errors) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${path} is required`);
}

function enumMember(value, allowed, path, errors) {
  if (value !== undefined && !allowed.has(value)) errors.push(`${path} must be one of: ${[...allowed].join(", ")}`);
}

function eachObject(list, path, errors, visit) {
  if (list === undefined) return;
  if (!Array.isArray(list)) {
    errors.push(`${path} must be an array`);
    return;
  }
  list.forEach((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(`${path}[${index}] must be an object`);
      return;
    }
    visit(item, `${path}[${index}]`);
  });
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
      eachObject(spec.axes[axis], `axes.${axis}`, errors, (element, path) => {
        for (const unknown of unknownFields(element, ELEMENT_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
        requiredString(element.technicalName, `${path}.technicalName`, errors);
      });
    }
  }
  eachObject(spec.keyFigures, "keyFigures", errors, (item, path) => {
    for (const unknown of unknownFields(item, KEY_FIGURE_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.technicalName, `${path}.technicalName`, errors);
    enumMember(item.kind, KEY_FIGURE_KINDS, `${path}.kind`, errors);
    const kind = item.kind ?? "basic";
    if (kind === "restricted") {
      if (!Array.isArray(item.restrictions) || item.restrictions.length === 0) {
        errors.push(`${path}.restrictions is required for a restricted key figure`);
      }
      requiredString(item.baseKeyFigure, `${path}.baseKeyFigure`, errors);
    }
    if ((kind === "calculated" || kind === "formula") && typeof item.formula?.expression !== "string") {
      errors.push(`${path}.formula.expression is required for a ${kind} key figure`);
    }
    eachObject(item.restrictions, `${path}.restrictions`, errors, (restriction, restrictionPath) => {
      for (const unknown of unknownFields(restriction, RESTRICTION_FIELDS, `$.${restrictionPath}`)) errors.push(`Unknown property ${unknown}`);
      requiredString(restriction.characteristic, `${restrictionPath}.characteristic`, errors);
      enumMember(restriction.operator, COMPARISON_OPERATOR_SET, `${restrictionPath}.operator`, errors);
      if (restriction.variable === undefined && (!Array.isArray(restriction.values) || restriction.values.length === 0)) {
        errors.push(`${restrictionPath} needs values or a variable binding`);
      }
    });
  });
  eachObject(spec.structures, "structures", errors, (item, path) => {
    for (const unknown of unknownFields(item, STRUCTURE_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.technicalName, `${path}.technicalName`, errors);
    enumMember(item.kind, STRUCTURE_KINDS, `${path}.kind`, errors);
    if (!Array.isArray(item.members) || item.members.length === 0) errors.push(`${path}.members must list at least one member`);
  });
  eachObject(spec.filters, "filters", errors, (item, path) => {
    for (const unknown of unknownFields(item, FILTER_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.characteristic, `${path}.characteristic`, errors);
  });
  eachObject(spec.variables, "variables", errors, (item, path) => {
    for (const unknown of unknownFields(item, VARIABLE_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.technicalName, `${path}.technicalName`, errors);
  });
  eachObject(spec.hierarchies, "hierarchies", errors, (item, path) => {
    for (const unknown of unknownFields(item, HIERARCHY_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.characteristic, `${path}.characteristic`, errors);
    requiredString(item.hierarchyName, `${path}.hierarchyName`, errors);
  });
  eachObject(spec.formulas, "formulas", errors, (item, path) => {
    for (const unknown of unknownFields(item, FORMULA_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.technicalName, `${path}.technicalName`, errors);
    requiredString(item.expression, `${path}.expression`, errors);
  });
  eachObject(spec.conditions, "conditions", errors, (item, path) => {
    for (const unknown of unknownFields(item, CONDITION_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    requiredString(item.keyFigure, `${path}.keyFigure`, errors);
    enumMember(item.operator, CONDITION_OPERATOR_SET, `${path}.operator`, errors);
    if (item.operator === undefined) errors.push(`${path}.operator is required`);
    if (item.threshold === undefined) errors.push(`${path}.threshold is required`);
    if (RANGE_OPERATORS.has(item.operator) && item.thresholdHigh === undefined) {
      errors.push(`${path}.thresholdHigh is required for ${item.operator}`);
    }
  });
  eachObject(spec.exceptions, "exceptions", errors, (item, path) => {
    for (const unknown of unknownFields(item, EXCEPTION_FIELDS, `$.${path}`)) errors.push(`Unknown property ${unknown}`);
    enumMember(item.alertLevel, ALERT_LEVEL_SET, `${path}.alertLevel`, errors);
    if (item.alertLevel === undefined) errors.push(`${path}.alertLevel is required`);
    enumMember(item.operator, EXCEPTION_OPERATOR_SET, `${path}.operator`, errors);
    if (item.operator === undefined) errors.push(`${path}.operator is required`);
    if (item.threshold === undefined) errors.push(`${path}.threshold is required`);
    if (RANGE_OPERATORS.has(item.operator) && item.thresholdHigh === undefined) {
      errors.push(`${path}.thresholdHigh is required for ${item.operator}`);
    }
  });
  if (spec.display !== undefined) {
    for (const path of unknownFields(spec.display, DISPLAY_FIELDS, "$.display")) errors.push(`Unknown property ${path}`);
    if (spec.display?.zeroSuppression !== undefined) {
      for (const path of unknownFields(spec.display.zeroSuppression, ZERO_SUPPRESSION_FIELDS, "$.display.zeroSuppression")) errors.push(`Unknown property ${path}`);
      enumMember(spec.display.zeroSuppression?.mode, ZERO_SUPPRESSION_MODE_SET, "display.zeroSuppression.mode", errors);
    }
  }
  if (spec.aggregation !== undefined) {
    for (const path of unknownFields(spec.aggregation, AGGREGATION_FIELDS, "$.aggregation")) errors.push(`Unknown property ${path}`);
  }
  if (!Array.isArray(spec.acceptanceCriteria)) errors.push("acceptanceCriteria must be an array");
  if (!Array.isArray(spec.evidence)) errors.push("evidence must be an array");
  return [...new Set(errors)];
}

function collectDefinitions(spec) {
  const keyFigures = new Map();
  for (const item of spec.keyFigures ?? []) {
    if (typeof item?.technicalName === "string") keyFigures.set(item.technicalName.toUpperCase(), item);
  }
  const formulas = new Map();
  for (const item of spec.formulas ?? []) {
    if (typeof item?.technicalName === "string") formulas.set(item.technicalName.toUpperCase(), item);
  }
  const structures = new Map();
  for (const item of spec.structures ?? []) {
    if (typeof item?.technicalName === "string") structures.set(item.technicalName.toUpperCase(), item);
  }
  return { keyFigures, formulas, structures };
}

function axisElements(spec) {
  const elements = [];
  for (const axis of ["rows", "columns", "free"]) {
    for (const [index, element] of (spec.axes?.[axis] ?? []).entries()) {
      if (element && typeof element === "object") elements.push({ axis, index, element, path: `axes.${axis}[${index}]` });
    }
  }
  return elements;
}

function validateCrossReferences(spec) {
  const errors = [];
  const { keyFigures, formulas, structures } = collectDefinitions(spec);
  const elements = axisElements(spec);
  const seenAxisNames = new Map();
  for (const { element, path } of elements) {
    const name = String(element.technicalName ?? "").toUpperCase();
    if (!name) continue;
    if (seenAxisNames.has(name)) errors.push(`${path} duplicates ${seenAxisNames.get(name)} (${element.technicalName})`);
    else seenAxisNames.set(name, path);
    if (element.kind === "structure" && !structures.has(name)) {
      errors.push(`${path} references structure ${element.technicalName} that is not defined in structures`);
    }
    if (element.kind === "formula" && !formulas.has(name)) {
      errors.push(`${path} references formula ${element.technicalName} that is not defined in formulas`);
    }
  }
  for (const [index, structure] of (spec.structures ?? []).entries()) {
    // Members naming plain provider key figures are legal; they are verified against metadata when available.
    const structureName = String(structure?.technicalName ?? "").toUpperCase();
    const placed = elements.some(({ element }) => String(element.technicalName ?? "").toUpperCase() === structureName);
    if (structureName && !placed) errors.push(`structures[${index}] (${structure.technicalName}) is not placed on any axis`);
  }
  for (const [index, condition] of (spec.conditions ?? []).entries()) {
    const target = String(condition?.keyFigure ?? "").toUpperCase();
    if (target && !keyFigures.has(target) && !formulas.has(target)
      && !elements.some(({ element }) => String(element.technicalName ?? "").toUpperCase() === target)) {
      errors.push(`conditions[${index}] references key figure ${condition.keyFigure} that is not on an axis or defined`);
    }
  }
  for (const [index, exception] of (spec.exceptions ?? []).entries()) {
    const target = String(exception?.keyFigure ?? "").toUpperCase();
    if (target && !keyFigures.has(target) && !formulas.has(target)
      && !elements.some(({ element }) => String(element.technicalName ?? "").toUpperCase() === target)) {
      errors.push(`exceptions[${index}] references key figure ${exception.keyFigure} that is not on an axis or defined`);
    }
  }
  return errors;
}

function metadataIndex(providerMetadata) {
  const characteristics = new Map();
  const keyFigures = new Map();
  for (const item of providerMetadata?.characteristics ?? []) {
    if (typeof item?.technicalName === "string") characteristics.set(item.technicalName.toUpperCase(), item);
  }
  for (const item of providerMetadata?.keyFigures ?? []) {
    if (typeof item?.technicalName === "string") keyFigures.set(item.technicalName.toUpperCase(), item);
  }
  return { characteristics, keyFigures };
}

function analyzeMetadataGaps(spec, providerMetadata) {
  if (!providerMetadata || providerMetadata.available === false) {
    return [{
      code: "METADATA_UNAVAILABLE",
      severity: "info",
      message: providerMetadata?.instruction
        ?? "Provider metadata was not available; characteristic and key figure names were not verified against the InfoProvider.",
    }];
  }
  const gaps = [];
  const index = metadataIndex(providerMetadata);
  const { keyFigures: definedKeyFigures, formulas, structures } = collectDefinitions(spec);
  const checkCharacteristic = (name, path, keyFigureMisuseCode = "KEY_FIGURE_AS_CHARACTERISTIC") => {
    const upper = String(name ?? "").toUpperCase();
    if (!upper) return;
    if (index.keyFigures.has(upper)) {
      gaps.push({ code: keyFigureMisuseCode, severity: "blocking", path, message: `${name} is a key figure and cannot be used as a characteristic.` });
    } else if (!index.characteristics.has(upper)) {
      gaps.push({ code: "UNKNOWN_CHARACTERISTIC", severity: "blocking", path, message: `${name} is not a characteristic of provider ${providerMetadata.provider ?? spec.target?.provider}.` });
    }
  };
  const checkKeyFigure = (name, path) => {
    const upper = String(name ?? "").toUpperCase();
    if (!upper) return;
    if (definedKeyFigures.has(upper) || formulas.has(upper)) return;
    if (!index.keyFigures.has(upper)) {
      gaps.push({ code: "UNKNOWN_KEY_FIGURE", severity: "blocking", path, message: `${name} is not a key figure of provider ${providerMetadata.provider ?? spec.target?.provider}.` });
    }
  };
  for (const { element, path } of axisElements(spec)) {
    const name = String(element.technicalName ?? "").toUpperCase();
    if (element.kind === "structure" || element.kind === "formula" || structures.has(name) || formulas.has(name)) continue;
    if (element.kind === "keyFigure" || definedKeyFigures.has(name)) checkKeyFigure(element.technicalName, path);
    else checkCharacteristic(element.technicalName, path);
    if (element.hierarchy !== undefined) {
      const meta = index.characteristics.get(name);
      if (meta && meta.hierarchies === false) {
        gaps.push({ code: "HIERARCHY_UNAVAILABLE", severity: "blocking", path, message: `${element.technicalName} has no hierarchies in the provider.` });
      }
    }
  }
  for (const [index2, filter] of (spec.filters ?? []).entries()) checkCharacteristic(filter?.characteristic, `filters[${index2}]`, "FILTER_ON_KEY_FIGURE");
  for (const [kfIndex, keyFigure] of (spec.keyFigures ?? []).entries()) {
    if (keyFigure?.baseKeyFigure !== undefined) checkKeyFigure(keyFigure.baseKeyFigure, `keyFigures[${kfIndex}].baseKeyFigure`);
    for (const [rIndex, restriction] of (keyFigure?.restrictions ?? []).entries()) {
      checkCharacteristic(restriction?.characteristic, `keyFigures[${kfIndex}].restrictions[${rIndex}]`);
    }
  }
  for (const [hIndex, hierarchy] of (spec.hierarchies ?? []).entries()) {
    checkCharacteristic(hierarchy?.characteristic, `hierarchies[${hIndex}]`);
    const meta = index.characteristics.get(String(hierarchy?.characteristic ?? "").toUpperCase());
    if (meta && meta.hierarchies === false) {
      gaps.push({ code: "HIERARCHY_UNAVAILABLE", severity: "blocking", path: `hierarchies[${hIndex}]`, message: `${hierarchy.characteristic} has no hierarchies in the provider.` });
    }
  }
  for (const [sIndex, structure] of (spec.structures ?? []).entries()) {
    if ((structure?.kind ?? "keyFigure") !== "keyFigure") continue;
    for (const [mIndex, member] of (structure?.members ?? []).entries()) {
      checkKeyFigure(member, `structures[${sIndex}].members[${mIndex}]`);
    }
  }
  return gaps;
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

function suggestOptimizations(spec, providerMetadata = null) {
  const optimizations = [];
  const rowCount = spec.axes?.rows?.length ?? 0;
  if (rowCount > 8) {
    optimizations.push({ code: "HIGH_AXIS_CARDINALITY", message: "Review row characteristics and move optional drilldowns to the free axis.", changesBusinessSemantics: false });
  }
  if ((spec.filters ?? []).length === 0) {
    optimizations.push({ code: "UNRESTRICTED_PROVIDER", message: "Consider selective filters after confirming the intended business scope.", changesBusinessSemantics: true });
  }
  const restrictionCounts = new Map();
  for (const keyFigure of spec.keyFigures ?? []) {
    if ((keyFigure?.kind ?? "basic") !== "restricted") continue;
    for (const restriction of keyFigure.restrictions ?? []) {
      const key = JSON.stringify({
        characteristic: String(restriction?.characteristic ?? "").toUpperCase(),
        operator: restriction?.operator ?? "EQUAL",
        values: restriction?.values ?? [],
        excluding: restriction?.excluding === true,
      });
      restrictionCounts.set(key, (restrictionCounts.get(key) ?? 0) + 1);
    }
  }
  for (const [key, count] of restrictionCounts) {
    if (count < 2) continue;
    const { characteristic } = JSON.parse(key);
    optimizations.push({
      code: "VARIABLE_REUSE",
      message: `The identical restriction on ${characteristic} appears in ${count} restricted key figures; a shared variable would keep them consistent and prompt once.`,
      changesBusinessSemantics: true,
    });
  }
  const restrictedByBase = new Map();
  for (const keyFigure of spec.keyFigures ?? []) {
    if ((keyFigure?.kind ?? "basic") !== "restricted" || typeof keyFigure?.baseKeyFigure !== "string") continue;
    const base = keyFigure.baseKeyFigure.toUpperCase();
    restrictedByBase.set(base, (restrictedByBase.get(base) ?? 0) + 1);
  }
  const placedInStructure = new Set();
  for (const structure of spec.structures ?? []) {
    for (const member of structure?.members ?? []) placedInStructure.add(String(member).toUpperCase());
  }
  for (const [base, count] of restrictedByBase) {
    if (count < 2) continue;
    const allPlaced = (spec.keyFigures ?? [])
      .filter((kf) => (kf?.kind ?? "basic") === "restricted" && String(kf?.baseKeyFigure ?? "").toUpperCase() === base)
      .every((kf) => placedInStructure.has(String(kf.technicalName ?? "").toUpperCase()));
    if (!allPlaced) {
      optimizations.push({
        code: "RESTRICTED_MEASURE_CONSOLIDATION",
        message: `${count} restricted key figures share base ${base}; grouping them in one key figure structure keeps the layout and totals consistent.`,
        changesBusinessSemantics: false,
      });
    }
  }
  for (const [index, hierarchy] of (spec.hierarchies ?? []).entries()) {
    if (hierarchy?.displayLevel === undefined && hierarchy?.expandToLevel === undefined) {
      optimizations.push({
        code: "HIERARCHY_DISPLAY_LEVEL",
        message: `hierarchies[${index}] (${hierarchy?.characteristic ?? "?"}) has no display/expand level; deep default expansion can hurt readability and performance.`,
        changesBusinessSemantics: false,
      });
    }
  }
  const needsAggregationConfirmation = (spec.keyFigures ?? []).some((kf) => ["calculated", "formula"].includes(kf?.kind))
    || (spec.formulas ?? []).length > 0;
  if (needsAggregationConfirmation && spec.aggregation?.confirmed !== true) {
    optimizations.push({
      code: "AGGREGATION_CONFIRMATION",
      message: "Formula/calculated key figures are defined; confirm exception aggregation semantics before relying on totals.",
      changesBusinessSemantics: true,
    });
  }
  if (providerMetadata?.available !== false && Array.isArray(providerMetadata?.characteristics)) {
    const dimensionOf = new Map();
    for (const characteristic of providerMetadata.characteristics) {
      if (characteristic?.technicalName && characteristic?.dimension) {
        dimensionOf.set(characteristic.technicalName.toUpperCase(), characteristic.dimension);
      }
    }
    const seenDimensions = new Map();
    for (const [index, element] of (spec.axes?.rows ?? []).entries()) {
      const name = String(element?.technicalName ?? "").toUpperCase();
      const dimension = dimensionOf.get(name);
      if (!dimension) continue;
      if (seenDimensions.has(dimension) && index >= 3) {
        optimizations.push({
          code: "FREE_AXIS_CANDIDATE",
          message: `${element.technicalName} shares dimension ${dimension} with ${seenDimensions.get(dimension)}; if it is an optional drilldown, the free axis keeps the default layout lean.`,
          changesBusinessSemantics: false,
        });
      } else if (!seenDimensions.has(dimension)) {
        seenDimensions.set(dimension, element.technicalName);
      }
    }
  }
  return optimizations;
}

export function resolveAndValidateSpec(input, { providerMetadata = null } = {}) {
  const spec = structuredClone(input);
  const shapeErrors = validateShape(spec);
  const errors = shapeErrors.length === 0 ? [...shapeErrors, ...validateCrossReferences(spec)] : shapeErrors;
  const gaps = [...analyzeGaps(spec), ...analyzeMetadataGaps(spec, providerMetadata)];
  const metadataChecked = Boolean(providerMetadata && providerMetadata.available !== false);
  return {
    valid: errors.length === 0,
    errors,
    gaps,
    optimizations: suggestOptimizations(spec, providerMetadata),
    resolvedSpec: spec,
    metadataChecked,
    readyForDraft: errors.length === 0 && !gaps.some((gap) => gap.severity === "blocking"),
  };
}

export const QUERY_SPEC_TOP_LEVEL_FIELDS = Object.freeze([...TOP_LEVEL_FIELDS]);
