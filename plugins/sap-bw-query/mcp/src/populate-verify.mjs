// Post-populate self-verification. Compares the confirmed QuerySpec against the deep-read
// model returned by the `readQueryModel` bridge call and reports per-element checks.
//
// Every name comparison is case-insensitive. The verifier never false-DIVERGEs on a
// serializer gap: when the model area that would confirm an element carries entries in
// `serializationIssues`, an otherwise-missing element is reported UNCHECKED, not DIVERGED.

const AXES = Object.freeze(["rows", "columns", "free"]);

const upper = (value) => String(value ?? "").toUpperCase();
const capitalize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value);

function issuesMatch(model, keywords) {
  const issues = Array.isArray(model?.serializationIssues) ? model.serializationIssues : [];
  if (issues.length === 0) return false;
  const lowered = issues.map((issue) => String(issue).toLowerCase());
  return keywords.some((keyword) => {
    const needle = keyword.toLowerCase();
    return lowered.some((issue) => issue.includes(needle));
  });
}

function modelStructures(model) {
  const out = [];
  for (const axis of AXES) {
    for (const element of model?.axes?.[axis] ?? []) {
      if (element && element.kind === "structure") out.push(element);
    }
  }
  return out;
}

function checkAxisCharacteristics(spec, model, checks) {
  for (const axis of AXES) {
    for (const element of spec?.axes?.[axis] ?? []) {
      if (!element || typeof element !== "object") continue;
      const kind = element.kind ?? "characteristic";
      if (kind !== "characteristic") continue;
      const name = upper(element.technicalName);
      if (!name) continue;
      const path = `axes.${axis}[${element.technicalName}]`;
      const modelAxis = model?.axes?.[axis];
      const present = Array.isArray(modelAxis)
        && modelAxis.some((item) => item && item.kind === "characteristic" && upper(item.infoObjectName) === name);
      if (present) {
        checks.push({ path, status: "VERIFIED", detail: `Characteristic ${element.technicalName} is present on ${axis}.` });
      } else if (issuesMatch(model, [`axes.${axis}`])) {
        checks.push({ path, status: "UNCHECKED", detail: `Serializer reported issues on ${axis}; ${element.technicalName} could not be confirmed.` });
      } else {
        checks.push({ path, status: "DIVERGED", detail: `Characteristic ${element.technicalName} was not found on ${axis} of the populated model.` });
      }
    }
  }
}

function missingStructureMembers(specStructure, modelStructure, keyFigures) {
  const modelMembers = Array.isArray(modelStructure.members) ? modelStructure.members : [];
  const missing = [];
  for (const memberName of specStructure.members ?? []) {
    const name = upper(memberName);
    const keyFigure = keyFigures.get(name);
    const descriptions = new Set([name]);
    if (keyFigure?.description) descriptions.add(upper(keyFigure.description));
    const infoObjects = new Set([name]);
    if (keyFigure?.baseKeyFigure) infoObjects.add(upper(keyFigure.baseKeyFigure));
    const represented = modelMembers.some((member) => {
      if (member && descriptions.has(upper(member.description))) return true;
      const groups = Array.isArray(member?.groups) ? member.groups : [];
      return groups.some((group) => infoObjects.has(upper(group?.infoObject)));
    });
    if (!represented) missing.push(memberName);
  }
  return missing;
}

function checkStructures(spec, model, checks) {
  const keyFigures = new Map();
  for (const keyFigure of spec?.keyFigures ?? []) {
    if (keyFigure?.technicalName) keyFigures.set(upper(keyFigure.technicalName), keyFigure);
  }
  const structures = modelStructures(model);
  for (const structure of spec?.structures ?? []) {
    if (!structure?.technicalName) continue;
    const name = upper(structure.technicalName);
    const path = `structures[${structure.technicalName}]`;
    const match = structures.find((element) => upper(element.technicalName) === name);
    if (!match) {
      if (issuesMatch(model, ["structure", "member", "axes."])) {
        checks.push({ path, status: "UNCHECKED", detail: `Serializer reported issues; structure ${structure.technicalName} could not be confirmed.` });
      } else {
        checks.push({ path, status: "DIVERGED", detail: `Structure ${structure.technicalName} was not found on any axis of the populated model.` });
      }
      continue;
    }
    const missing = missingStructureMembers(structure, match, keyFigures);
    const memberCount = (structure.members ?? []).length;
    if (missing.length === 0) {
      checks.push({ path, status: "VERIFIED", detail: `Structure ${structure.technicalName} is present with all ${memberCount} member(s) represented.` });
    } else if (issuesMatch(model, ["member", "structure", "axes."])) {
      checks.push({ path, status: "UNCHECKED", detail: `Structure ${structure.technicalName} is present, but member(s) [${missing.join(", ")}] are unconfirmed due to serializer issues.` });
    } else {
      checks.push({ path, status: "DIVERGED", detail: `Structure ${structure.technicalName} is present but missing member(s): ${missing.join(", ")}.` });
    }
  }
}

function checkAxisMeasures(spec, model, checks) {
  const definitions = new Map();
  for (const keyFigure of spec?.keyFigures ?? []) {
    if (keyFigure?.technicalName) definitions.set(upper(keyFigure.technicalName), keyFigure);
  }
  for (const formula of spec?.formulas ?? []) {
    if (formula?.technicalName && !definitions.has(upper(formula.technicalName))) {
      definitions.set(upper(formula.technicalName), formula);
    }
  }
  const explicitStructures = new Set((spec?.structures ?? []).map((item) => upper(item?.technicalName)).filter(Boolean));
  for (const axis of AXES) {
    for (const element of spec?.axes?.[axis] ?? []) {
      if (!element || typeof element !== "object") continue;
      const kind = element.kind ?? "characteristic";
      if (kind !== "keyFigure" && kind !== "formula") continue;
      const name = upper(element.technicalName);
      if (!name || explicitStructures.has(name)) continue;
      const path = `axes.${axis}[${element.technicalName}]`;
      const definition = definitions.get(name);
      const descriptions = new Set([name]);
      if (definition?.description) descriptions.add(upper(definition.description));
      const infoObjects = new Set([name]);
      if (definition?.baseKeyFigure) infoObjects.add(upper(definition.baseKeyFigure));
      const structures = (model?.axes?.[axis] ?? []).filter((item) => item && item.kind === "structure");
      const represented = structures.some((structure) => {
        const members = Array.isArray(structure.members) ? structure.members : [];
        return members.some((member) => {
          if (member && descriptions.has(upper(member.description))) return true;
          const groups = Array.isArray(member?.groups) ? member.groups : [];
          return groups.some((group) => infoObjects.has(upper(group?.infoObject)));
        });
      });
      if (represented) {
        checks.push({ path, status: "VERIFIED", detail: `Key figure ${element.technicalName} is represented in a structure on ${axis}.` });
      } else if (issuesMatch(model, [`axes.${axis}`, "member", "structure"])) {
        checks.push({ path, status: "UNCHECKED", detail: `Serializer reported issues; key figure ${element.technicalName} could not be confirmed on ${axis}.` });
      } else {
        checks.push({ path, status: "DIVERGED", detail: `Key figure ${element.technicalName} is not represented in any structure on ${axis}.` });
      }
    }
  }
}

function checkFilters(spec, model, checks) {
  const selections = model?.filter?.selections;
  for (const filter of spec?.filters ?? []) {
    if (!filter?.characteristic) continue;
    const name = upper(filter.characteristic);
    const path = `filters[${filter.characteristic}]`;
    const present = Array.isArray(selections) && selections.some((selection) => upper(selection?.infoObject) === name);
    if (present) {
      checks.push({ path, status: "VERIFIED", detail: `Filter characteristic ${filter.characteristic} is present among the model filter selections.` });
    } else if (issuesMatch(model, ["filter"])) {
      checks.push({ path, status: "UNCHECKED", detail: `Serializer reported filter issues; ${filter.characteristic} could not be confirmed.` });
    } else {
      checks.push({ path, status: "DIVERGED", detail: `Filter characteristic ${filter.characteristic} was not found among the model filter selections.` });
    }
  }
}

function verifyCountMatch(specItems, modelItems, keyOf, pathBase, keyword, model, checks) {
  const hasModelArea = Array.isArray(modelItems);
  const remaining = hasModelArea ? modelItems.map((item) => upper(item?.infoObject)) : [];
  specItems.forEach((item, index) => {
    const rawKey = keyOf(item);
    const name = upper(rawKey);
    const label = rawKey || "(no key figure)";
    const path = `${pathBase}[${index}]`;
    if (!hasModelArea) {
      if (issuesMatch(model, [keyword])) {
        checks.push({ path, status: "UNCHECKED", detail: `Model ${keyword} list is unavailable; ${label} could not be confirmed.` });
      } else {
        checks.push({ path, status: "DIVERGED", detail: `The model carries no ${keyword} list; ${label} is not represented.` });
      }
      return;
    }
    const matchIndex = name ? remaining.indexOf(name) : (remaining.length > 0 ? 0 : -1);
    if (matchIndex >= 0) {
      remaining.splice(matchIndex, 1);
      checks.push({ path, status: "VERIFIED", detail: `${capitalize(keyword)} ${label} is represented (count and infoObject match).` });
    } else if (issuesMatch(model, [keyword])) {
      checks.push({ path, status: "UNCHECKED", detail: `Serializer reported ${keyword} issues; ${label} could not be confirmed.` });
    } else {
      checks.push({ path, status: "DIVERGED", detail: `${capitalize(keyword)} ${label} is not represented (count or infoObject mismatch).` });
    }
  });
}

function checkZeroSuppression(spec, model, checks) {
  const specZeroSuppression = spec?.display?.zeroSuppression;
  if (!specZeroSuppression || typeof specZeroSuppression !== "object") return;
  const path = "display.zeroSuppression";
  const modelZeroSuppression = model?.settings?.zeroSuppression;
  if (!modelZeroSuppression || typeof modelZeroSuppression !== "object") {
    if (issuesMatch(model, ["zerosuppression", "settings"])) {
      checks.push({ path, status: "UNCHECKED", detail: "Zero suppression settings could not be serialized." });
    } else {
      checks.push({ path, status: "DIVERGED", detail: "Zero suppression was requested in the spec but is absent from the populated model." });
    }
    return;
  }
  const mismatches = [];
  if (Object.prototype.hasOwnProperty.call(specZeroSuppression, "rows")
    && Boolean(specZeroSuppression.rows) !== Boolean(modelZeroSuppression.rows)) {
    mismatches.push(`rows (spec ${Boolean(specZeroSuppression.rows)} vs model ${Boolean(modelZeroSuppression.rows)})`);
  }
  if (Object.prototype.hasOwnProperty.call(specZeroSuppression, "columns")
    && Boolean(specZeroSuppression.columns) !== Boolean(modelZeroSuppression.columns)) {
    mismatches.push(`columns (spec ${Boolean(specZeroSuppression.columns)} vs model ${Boolean(modelZeroSuppression.columns)})`);
  }
  // Underscore-insensitive: the model carries EMF getName() literals whose casing may
  // differ from the Java constant names used in specs (live-validation item).
  const normalizedMode = (value) => upper(value).replace(/_/g, "");
  if (specZeroSuppression.mode !== undefined && normalizedMode(specZeroSuppression.mode) !== normalizedMode(modelZeroSuppression.mode)) {
    mismatches.push(`mode (spec ${specZeroSuppression.mode} vs model ${modelZeroSuppression.mode ?? "null"})`);
  }
  if (mismatches.length === 0) {
    checks.push({ path, status: "VERIFIED", detail: "Zero suppression rows/columns/mode match the spec." });
  } else if (issuesMatch(model, ["zerosuppression", "settings"])) {
    checks.push({ path, status: "UNCHECKED", detail: `Zero suppression differences (${mismatches.join("; ")}) coincide with serializer issues; treated as unconfirmed.` });
  } else {
    checks.push({ path, status: "DIVERGED", detail: `Zero suppression mismatch: ${mismatches.join("; ")}.` });
  }
}

/**
 * Verifies a confirmed QuerySpec against a deep-read model. Returns an array of
 * `{ path, status, detail }` checks with status VERIFIED | DIVERGED | UNCHECKED. The
 * caller aggregates them into an overall verification status.
 */
export function verifyPopulation(spec, model) {
  const safeSpec = spec && typeof spec === "object" ? spec : {};
  const safeModel = model && typeof model === "object" ? model : {};
  // A read that did not reach an open query model proves nothing either way: no checks,
  // so the summary reports UNAVAILABLE instead of false DIVERGED findings.
  if (safeModel.found === false) return [];
  const checks = [];
  checkAxisCharacteristics(safeSpec, safeModel, checks);
  checkAxisMeasures(safeSpec, safeModel, checks);
  checkStructures(safeSpec, safeModel, checks);
  checkFilters(safeSpec, safeModel, checks);
  verifyCountMatch(safeSpec.conditions ?? [], safeModel.conditions, (item) => item?.keyFigure, "conditions", "condition", safeModel, checks);
  verifyCountMatch(safeSpec.exceptions ?? [], safeModel.exceptions, (item) => item?.keyFigure, "exceptions", "exception", safeModel, checks);
  checkZeroSuppression(safeSpec, safeModel, checks);
  return checks;
}

/**
 * Aggregates a checks array into the overall verification object merged into the
 * `bw_populate_query_editor` result. DIVERGED wins; otherwise VERIFIED requires at least
 * one VERIFIED check; an all-UNCHECKED (or empty) result reports UNAVAILABLE because
 * nothing could be positively confirmed. Counts are carried for transparency.
 */
export function summarizeVerification(checks) {
  const counts = {
    verified: checks.filter((check) => check.status === "VERIFIED").length,
    diverged: checks.filter((check) => check.status === "DIVERGED").length,
    unchecked: checks.filter((check) => check.status === "UNCHECKED").length,
  };
  const status = counts.diverged > 0 ? "DIVERGED" : counts.verified > 0 ? "VERIFIED" : "UNAVAILABLE";
  return { status, checks, counts };
}
