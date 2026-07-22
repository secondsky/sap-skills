// Shared BW query best-practices rule engine.
//
// The engine reviews TWO kinds of input against the same rule set:
//   (a) a QuerySpec draft, before any backend object exists (sourceKind "spec"), and
//   (b) an existing OPEN query, via the Task-A deep-read model (sourceKind "model").
//
// Rules never touch either raw shape directly. Two adapters project each shape onto a
// single NORMALIZED shape, and every rule reads only the normalized shape. This keeps the
// rules source-agnostic and lets a rule SKIP silently when a fact it needs cannot be
// expressed by the current source (tracked in `confidence`), rather than guessing.
//
// Everything here is pure and read-only. Rules must never throw on partial input; runRules
// additionally isolates each rule in a try/catch so one defensive miss cannot lose the rest.
//
// ---------------------------------------------------------------------------------------
// Normalized shape (both adapters produce exactly this)
// ---------------------------------------------------------------------------------------
// {
//   sourceKind: "spec" | "model",
//   technicalName: string | null,
//   provider: string | null,
//   axes: {
//     rows:    [ AxisElement ],
//     columns: [ AxisElement ],
//     free:    [ AxisElement ],
//   },
//   structures: [ Structure ],            // every key-figure/characteristic structure on any axis
//   filters: [ { characteristic, hasValues, hasVariable } ],   // global filter selections
//   variables: [ { technicalName, characteristic } ],          // known variables
//   restrictedCharacteristics: [ string ],// chars carrying ANY narrowing (filter value/variable,
//                                          // key-figure restriction, or a variable bound to them)
//   measures: [ Measure ],                // calculated/formula measures (for aggregation checks)
//   conditions: [ Condition ],
//   exceptions: [ Exception ],
//   settings: { zeroSuppression: { rows, columns, mode } | null },
//   confidence: { <fact>: "known" | "unknown" },   // source can/can't express a fact class
// }
//
// AxisElement (characteristic): { kind:"characteristic", name, axis, path, hasHierarchy, hasLevel }
// AxisElement (structure):      { kind:"structure", name, axis, path, structureKind, members:[Member] }
// Structure: same object as the structure AxisElement (axis + structureKind + members[]).
// Member: { name, description, path, isFormula, structureKind,
//           restrictionCharacteristics:[string], restrictionSignature:string,
//           hasExceptionAggregation: boolean | null }   // null = unknown for this source
// Measure: { name, path, isFormula, hasExceptionAggregation: boolean | null }
// Condition: { description, path, active, assignment, assignedCharacteristics:[string], keyFigure }
// Exception: { description, path, active, affectsDataCells: boolean | null, keyFigure }
//
// A restrictionSignature is a stable JSON string of the restricting characteristics/values of
// a member, ignoring the key-figure selection itself; an EMPTY signature means "not restricted"
// and never counts as a duplicate.

const AXES = Object.freeze(["rows", "columns", "free"]);
const TIME_CHARACTERISTIC = /^0(CAL|FISC)/i;
const KEY_FIGURE_SELECTORS = new Set(["1KYFNM", "4KYFNM"]);

const upper = (value) => String(value ?? "").trim().toUpperCase();
const isFilled = (value) => value !== undefined && value !== null && String(value).trim() !== "";
const asArray = (value) => (Array.isArray(value) ? value : []);
const normalizeMode = (value) => upper(value).replace(/_/g, "");

// --------------------------------------------------------------------------------------
// Shared restriction-signature helpers
// --------------------------------------------------------------------------------------

// Reduce a model selection token to only the fields that identify the value it selects.
function normalizeModelToken(token) {
  if (!token || typeof token !== "object") return {};
  const valueOf = (side) => {
    if (!side || typeof side !== "object") return null;
    if (isFilled(side.variable)) return `var:${upper(side.variable)}`;
    if (isFilled(side.value)) return String(side.value);
    return null;
  };
  return {
    type: upper(token.type) || null,
    operator: isFilled(token.operator) ? upper(token.operator) : null,
    exclude: token.exclude === true,
    from: valueOf(token.from),
    to: valueOf(token.to),
    selectionType: isFilled(token.selectionType) ? upper(token.selectionType) : null,
    variable: isFilled(token.variable?.technicalName) ? upper(token.variable.technicalName) : null,
  };
}

function stableTokenList(tokens) {
  return asArray(tokens)
    .map(normalizeModelToken)
    .map((token) => JSON.stringify(token))
    .sort();
}

// Selection types that mark a token as the member's measure selection, not a restriction.
const KEY_FIGURE_SELECTION_TYPES = new Set(["KEY_FIGURE", "RESTR_KEY_FIGURE", "CALC_KEY_FIGURE"]);

// Restriction groups of a model member: groups that carry tokens and are not the member's
// key-figure selection. The measure selection appears either under a 1KYFNM/4KYFNM selector
// group or (as produced by QueryModelBuilder) under the key figure's own name with tokens
// whose selectionType is KEY_FIGURE/RESTR_KEY_FIGURE/CALC_KEY_FIGURE — both are excluded.
function modelRestrictionGroups(member) {
  return asArray(member?.groups).filter((group) => {
    const infoObject = upper(group?.infoObject);
    if (!infoObject || KEY_FIGURE_SELECTORS.has(infoObject)) return false;
    const tokens = asArray(group?.tokens);
    if (tokens.length === 0) return false;
    const allKeyFigureSelection = tokens.every((token) =>
      KEY_FIGURE_SELECTION_TYPES.has(upper(token?.selectionType)));
    return !allKeyFigureSelection;
  });
}

function modelMemberSignature(member) {
  const groups = modelRestrictionGroups(member)
    .map((group) => ({ infoObject: upper(group.infoObject), tokens: stableTokenList(group.tokens) }))
    .sort((a, b) => a.infoObject.localeCompare(b.infoObject));
  return groups.length === 0 ? "" : JSON.stringify(groups);
}

// Restriction signature of a spec restricted key figure: its sorted restriction set.
function specRestrictionSignature(restrictions) {
  const entries = asArray(restrictions)
    .map((restriction) => ({
      characteristic: upper(restriction?.characteristic),
      operator: isFilled(restriction?.operator) ? upper(restriction.operator) : "EQUAL",
      values: asArray(restriction?.values).map((value) => String(value)).sort(),
      high: isFilled(restriction?.high) ? String(restriction.high) : null,
      variable: isFilled(restriction?.variable) ? upper(restriction.variable) : null,
      excluding: restriction?.excluding === true,
    }))
    .filter((entry) => entry.characteristic)
    .sort((a, b) => a.characteristic.localeCompare(b.characteristic));
  return entries.length === 0 ? "" : JSON.stringify(entries);
}

// --------------------------------------------------------------------------------------
// Adapter: QuerySpec draft -> normalized
// --------------------------------------------------------------------------------------

export function normalizeFromSpec(spec) {
  const safe = spec && typeof spec === "object" ? spec : {};
  const keyFigureIndex = new Map();
  for (const keyFigure of asArray(safe.keyFigures)) {
    if (isFilled(keyFigure?.technicalName)) keyFigureIndex.set(upper(keyFigure.technicalName), keyFigure);
  }
  const structureIndex = new Map();
  for (const structure of asArray(safe.structures)) {
    if (isFilled(structure?.technicalName)) structureIndex.set(upper(structure.technicalName), structure);
  }

  const restricted = new Set();
  const axes = { rows: [], columns: [], free: [] };
  const structures = [];

  const specMember = (memberName, path, structureKind) => {
    const keyFigure = keyFigureIndex.get(upper(memberName));
    const kind = keyFigure?.kind ?? "basic";
    const isFormula = kind === "calculated" || kind === "formula";
    const restrictionCharacteristics = asArray(keyFigure?.restrictions)
      .map((restriction) => upper(restriction?.characteristic))
      .filter(Boolean);
    for (const characteristic of restrictionCharacteristics) restricted.add(characteristic);
    return {
      name: String(memberName ?? ""),
      description: keyFigure?.description ?? String(memberName ?? ""),
      path,
      isFormula,
      structureKind,
      restrictionCharacteristics,
      restrictionSignature: kind === "restricted" ? specRestrictionSignature(keyFigure?.restrictions) : "",
      hasExceptionAggregation: isFormula ? isFilled(keyFigure?.aggregation?.exception) : null,
    };
  };

  for (const axis of AXES) {
    for (const [index, element] of asArray(safe.axes?.[axis]).entries()) {
      if (!element || typeof element !== "object") continue;
      const name = String(element.technicalName ?? "");
      const path = `axes.${axis}[${index}]`;
      const declaredKind = element.kind;
      const structure = structureIndex.get(upper(name));
      if (declaredKind === "structure" || structure) {
        const structureKind = structure?.kind ?? "keyFigure";
        const members = asArray(structure?.members).map((member, memberIndex) =>
          specMember(member, `${path}.members[${memberIndex}]`, structureKind));
        const entry = { kind: "structure", name, axis, path, structureKind, members };
        axes[axis].push(entry);
        structures.push(entry);
      } else if (declaredKind === "keyFigure" || declaredKind === "formula" || keyFigureIndex.has(upper(name))) {
        // A bare measure on an axis is not a characteristic; it participates via `measures`.
        axes[axis].push({ kind: "measure", name, axis, path });
      } else {
        axes[axis].push({
          kind: "characteristic",
          name,
          axis,
          path,
          hasHierarchy: isFilled(element.hierarchy),
          hasLevel: false, // spec axis elements cannot carry a display level; hierarchies[] does
        });
      }
    }
  }

  const filters = asArray(safe.filters).map((filter, index) => {
    const characteristic = upper(filter?.characteristic);
    const hasValues = isFilled(filter?.value) || isFilled(filter?.high);
    const hasVariable = false; // the filter schema binds literal values only
    if (characteristic && (hasValues || hasVariable)) restricted.add(characteristic);
    return { characteristic: String(filter?.characteristic ?? ""), path: `filters[${index}]`, hasValues, hasVariable };
  });

  const variables = asArray(safe.variables).map((variable, index) => {
    const characteristic = upper(variable?.characteristic);
    if (characteristic) restricted.add(characteristic);
    return {
      technicalName: String(variable?.technicalName ?? ""),
      characteristic: String(variable?.characteristic ?? ""),
      path: `variables[${index}]`,
    };
  });

  const measures = [];
  for (const keyFigure of asArray(safe.keyFigures)) {
    const kind = keyFigure?.kind ?? "basic";
    if (kind !== "calculated" && kind !== "formula") continue;
    measures.push({
      name: String(keyFigure?.technicalName ?? ""),
      path: `keyFigures[${upper(keyFigure?.technicalName) || "?"}]`,
      isFormula: true,
      hasExceptionAggregation: isFilled(keyFigure?.aggregation?.exception),
    });
  }
  for (const formula of asArray(safe.formulas)) {
    measures.push({
      name: String(formula?.technicalName ?? ""),
      path: `formulas[${upper(formula?.technicalName) || "?"}]`,
      isFormula: true,
      hasExceptionAggregation: isFilled(formula?.exceptionAggregation),
    });
  }

  const hierarchies = [];
  for (const [index, hierarchy] of asArray(safe.hierarchies).entries()) {
    hierarchies.push({
      characteristic: String(hierarchy?.characteristic ?? ""),
      path: `hierarchies[${index}]`,
      hasLevel: isFilled(hierarchy?.displayLevel) || isFilled(hierarchy?.expandToLevel),
    });
  }
  // Axis elements that switch on a hierarchy but are not covered by a hierarchies[] entry.
  const hierarchyChars = new Set(hierarchies.map((entry) => upper(entry.characteristic)));
  for (const axis of AXES) {
    for (const element of axes[axis]) {
      if (element.kind === "characteristic" && element.hasHierarchy && !hierarchyChars.has(upper(element.name))) {
        hierarchies.push({ characteristic: element.name, path: element.path, hasLevel: false });
      }
    }
  }

  const conditions = asArray(safe.conditions).map((condition, index) => ({
    description: condition?.description ?? condition?.keyFigure ?? `condition[${index}]`,
    path: `conditions[${index}]`,
    active: condition?.active !== false,
    // Spec conditions carry no assignment mode; an explicit characteristics list narrows scope.
    assignment: null,
    assignedCharacteristics: asArray(condition?.characteristics).map((value) => String(value)),
    keyFigure: String(condition?.keyFigure ?? ""),
  }));

  const exceptions = asArray(safe.exceptions).map((exception, index) => ({
    description: exception?.description ?? exception?.keyFigure ?? `exception[${index}]`,
    path: `exceptions[${index}]`,
    active: exception?.active !== false,
    affectsDataCells: typeof exception?.affectsDataCells === "boolean" ? exception.affectsDataCells : null,
    keyFigure: String(exception?.keyFigure ?? ""),
  }));

  const zeroSuppression = safe.display?.zeroSuppression && typeof safe.display.zeroSuppression === "object"
    ? {
        rows: Boolean(safe.display.zeroSuppression.rows),
        columns: Boolean(safe.display.zeroSuppression.columns),
        mode: isFilled(safe.display.zeroSuppression.mode) ? String(safe.display.zeroSuppression.mode) : null,
      }
    : null;

  return {
    sourceKind: "spec",
    technicalName: isFilled(safe.technicalName) ? String(safe.technicalName) : null,
    provider: isFilled(safe.target?.provider) ? String(safe.target.provider) : null,
    axes,
    structures,
    filters,
    variables,
    restrictedCharacteristics: [...restricted],
    measures,
    hierarchies,
    conditions,
    exceptions,
    settings: { zeroSuppression },
    // The spec fully expresses exception aggregation and assignment intent.
    confidence: { exceptionAggregation: "known", conditionAssignment: "known", structureKind: "known" },
  };
}

// --------------------------------------------------------------------------------------
// Adapter: deep-read model -> normalized
// --------------------------------------------------------------------------------------

export function normalizeFromModel(model) {
  const safe = model && typeof model === "object" ? model : {};
  const restricted = new Set();
  const axes = { rows: [], columns: [], free: [] };
  const structures = [];
  const measures = [];
  const hierarchies = [];

  const modelMember = (member, path) => {
    const isFormula = upper(member?.type) === "FORMULA";
    const restrictionCharacteristics = modelRestrictionGroups(member)
      .map((group) => upper(group.infoObject))
      .filter(Boolean);
    for (const characteristic of restrictionCharacteristics) restricted.add(characteristic);
    if (isFormula) {
      measures.push({ name: member?.description ?? "", path, isFormula: true, hasExceptionAggregation: null });
    }
    return {
      name: member?.description ?? "",
      description: member?.description ?? "",
      path,
      isFormula,
      structureKind: "unknown",
      restrictionCharacteristics,
      restrictionSignature: modelMemberSignature(member),
      // The serializer does not carry exception aggregation; leave it unknown for this source.
      hasExceptionAggregation: null,
    };
  };

  for (const axis of AXES) {
    for (const [index, element] of asArray(safe.axes?.[axis]).entries()) {
      if (!element || typeof element !== "object") continue;
      const path = `axes.${axis}[${index}]`;
      if (element.kind === "structure") {
        const members = asArray(element.members).map((member, memberIndex) =>
          modelMember(member, `${path}.members[${memberIndex}]`));
        const entry = {
          kind: "structure",
          name: isFilled(element.technicalName) ? String(element.technicalName) : (element.description ?? ""),
          axis,
          path,
          structureKind: "unknown",
          members,
        };
        axes[axis].push(entry);
        structures.push(entry);
      } else if (element.kind === "characteristic") {
        const hasHierarchy = element.hierarchy !== undefined && element.hierarchy !== null;
        const hasLevel = element.displayLevel !== undefined && element.displayLevel !== null;
        axes[axis].push({
          kind: "characteristic",
          name: String(element.infoObjectName ?? ""),
          axis,
          path,
          hasHierarchy,
          hasLevel,
        });
        if (hasHierarchy) {
          hierarchies.push({ characteristic: String(element.infoObjectName ?? ""), path, hasLevel });
        }
      } else {
        axes[axis].push({ kind: "other", name: String(element.infoObjectName ?? element.description ?? ""), axis, path });
      }
    }
  }

  const filters = asArray(safe.filter?.selections).map((selection, index) => {
    const characteristic = upper(selection?.infoObject);
    const tokens = asArray(selection?.tokens);
    const hasVariable = tokens.some((token) => upper(token?.type) === "VARIABLE" || isFilled(token?.variable?.technicalName));
    const hasValues = tokens.length > 0;
    if (characteristic && (hasValues || hasVariable)) restricted.add(characteristic);
    return { characteristic: String(selection?.infoObject ?? ""), path: `filter.selections[${index}]`, hasValues, hasVariable };
  });

  // Variables surface as variable tokens anywhere; collect their technical names for context.
  const variableNames = new Map();
  const collectVariables = (tokens, characteristic) => {
    for (const token of asArray(tokens)) {
      const technicalName = token?.variable?.technicalName;
      if (isFilled(technicalName)) {
        variableNames.set(upper(technicalName), { technicalName: String(technicalName), characteristic });
        if (isFilled(characteristic)) restricted.add(upper(characteristic));
      }
    }
  };
  for (const selection of asArray(safe.filter?.selections)) collectVariables(selection?.tokens, selection?.infoObject);
  for (const structure of structures) {
    for (const element of asArray(safe.axes?.[structure.axis])) {
      for (const member of asArray(element?.members)) {
        for (const group of asArray(member?.groups)) collectVariables(group?.tokens, group?.infoObject);
      }
    }
  }
  const variables = [...variableNames.values()].map((entry, index) => ({ ...entry, path: `variables[${index}]` }));

  const conditions = asArray(safe.conditions).map((condition, index) => ({
    description: condition?.description ?? condition?.infoObject ?? `condition[${index}]`,
    path: `conditions[${index}]`,
    active: condition?.active !== false,
    assignment: isFilled(condition?.assignment) ? String(condition.assignment) : null,
    assignedCharacteristics: asArray(condition?.assignedCharacteristics).map((value) => String(value)),
    keyFigure: String(condition?.infoObject ?? ""),
  }));

  const exceptions = asArray(safe.exceptions).map((exception, index) => ({
    description: exception?.description ?? exception?.infoObject ?? `exception[${index}]`,
    path: `exceptions[${index}]`,
    active: exception?.active !== false,
    affectsDataCells: typeof exception?.affectsDataCells === "boolean" ? exception.affectsDataCells : null,
    keyFigure: String(exception?.infoObject ?? ""),
  }));

  const zeroSuppression = safe.settings?.zeroSuppression && typeof safe.settings.zeroSuppression === "object"
    ? {
        rows: Boolean(safe.settings.zeroSuppression.rows),
        columns: Boolean(safe.settings.zeroSuppression.columns),
        mode: isFilled(safe.settings.zeroSuppression.mode) ? String(safe.settings.zeroSuppression.mode) : null,
      }
    : null;

  return {
    sourceKind: "model",
    technicalName: isFilled(safe.technicalName) ? String(safe.technicalName) : null,
    provider: isFilled(safe.provider) ? String(safe.provider) : null,
    axes,
    structures,
    filters,
    variables,
    restrictedCharacteristics: [...restricted],
    measures,
    hierarchies,
    conditions,
    exceptions,
    settings: { zeroSuppression },
    // The serializer cannot prove exception aggregation, condition assignment mode, or the
    // key-figure/characteristic kind of a structure; rules that need these SKIP for models.
    confidence: { exceptionAggregation: "unknown", conditionAssignment: "known", structureKind: "unknown" },
  };
}

// --------------------------------------------------------------------------------------
// Rule catalog + implementations
// --------------------------------------------------------------------------------------

function characteristicsOn(normalized, axis) {
  return asArray(normalized.axes?.[axis]).filter((element) => element?.kind === "characteristic");
}

function keyFigureStructures(normalized) {
  // A key-figure structure for BWQ012/BWQ009: explicitly keyFigure (spec) or unknown (model),
  // never an explicit characteristic structure.
  return asArray(normalized.structures).filter((structure) => structure?.structureKind !== "characteristic");
}

const RULES = [
  {
    ruleId: "BWQ001",
    title: "NO_TIME_RESTRICTION",
    severity: "warning",
    appliesTo: ["spec", "model"],
    rationale: "A query with no restriction on a time characteristic (0CAL*/0FISC*) can scan the entire history of the provider; a period filter or variable keeps the working set and runtime bounded.",
    evaluate(normalized) {
      const restricted = asArray(normalized.restrictedCharacteristics);
      // Only meaningful once the query actually references some characteristics or measures.
      const hasContent = AXES.some((axis) => asArray(normalized.axes?.[axis]).length > 0);
      if (!hasContent) return [];
      if (restricted.some((name) => TIME_CHARACTERISTIC.test(name))) return [];
      return [{
        path: null,
        message: restricted.length === 0
          ? "No time characteristic (0CAL*/0FISC*) is restricted anywhere in the query."
          : `No time characteristic (0CAL*/0FISC*) is restricted; restricted characteristics are ${restricted.join(", ")}.`,
      }];
    },
  },
  {
    ruleId: "BWQ002",
    title: "ROWS_OVERLOAD",
    severity: "warning",
    appliesTo: ["spec", "model"],
    rationale: "More than 8 characteristics in the rows drilldown multiplies the result set and slows the initial render; optional drilldowns belong on the free axis.",
    evaluate(normalized) {
      const rows = characteristicsOn(normalized, "rows");
      if (rows.length <= 8) return [];
      return [{
        path: "axes.rows",
        message: `Rows carry ${rows.length} characteristics (${rows.map((element) => element.name).join(", ")}); more than 8 in the default drilldown is a performance risk.`,
      }];
    },
  },
  {
    ruleId: "BWQ003",
    title: "FREE_OVERLOAD",
    severity: "info",
    appliesTo: ["spec", "model"],
    rationale: "More than 15 free characteristics make the navigation pane hard to use even though they do not all render at once; grouping or trimming keeps the query approachable.",
    evaluate(normalized) {
      const free = characteristicsOn(normalized, "free");
      if (free.length <= 15) return [];
      return [{
        path: "axes.free",
        message: `The free axis carries ${free.length} characteristics; more than 15 makes navigation hard to use.`,
      }];
    },
  },
  {
    ruleId: "BWQ004",
    title: "CONDITION_BROAD_ASSIGNMENT",
    severity: "warning",
    appliesTo: ["spec", "model"],
    rationale: "A condition evaluated for all characteristics independently (or with no explicit assignment) behaves differently as the drilldown changes; with two or more characteristics on the axes it can hide or keep unexpected rows.",
    evaluate(normalized) {
      const axisCharacteristics = characteristicsOn(normalized, "rows").length + characteristicsOn(normalized, "columns").length;
      if (axisCharacteristics < 2) return [];
      const findings = [];
      for (const condition of asArray(normalized.conditions)) {
        if (condition.active === false) continue;
        const assignment = normalizeMode(condition.assignment);
        const broad = assignment === "ALLINDEPENDENTLY"
          || (!isFilled(condition.assignment) && asArray(condition.assignedCharacteristics).length === 0);
        if (!broad) continue;
        findings.push({
          path: condition.path,
          message: `Condition ${condition.description} applies to all characteristics independently while ${axisCharacteristics} characteristics sit on rows/columns; confirm the intended characteristic assignment.`,
        });
      }
      return findings;
    },
  },
  {
    ruleId: "BWQ005",
    title: "EXCEPTION_ON_CHA_CELLS",
    severity: "info",
    appliesTo: ["spec", "model"],
    rationale: "An exception that does not affect data cells highlights characteristic cells only; confirm this is intended rather than a missing data-cell alert.",
    evaluate(normalized) {
      const findings = [];
      for (const exception of asArray(normalized.exceptions)) {
        if (exception.affectsDataCells !== false) continue; // null (unknown) or true -> skip
        findings.push({
          path: exception.path,
          message: `Exception ${exception.description} does not affect data cells; it only colors characteristic cells.`,
        });
      }
      return findings;
    },
  },
  {
    ruleId: "BWQ006",
    title: "FORMULA_WITHOUT_EXCEPTION_AGGREGATION",
    severity: "warning",
    appliesTo: ["spec"],
    rationale: "Calculated/formula key figures aggregate standard by default; without an exception aggregation, ratios and averages produce wrong totals and results rows.",
    evaluate(normalized) {
      if (normalized.confidence?.exceptionAggregation === "unknown") return []; // model cannot prove this
      const findings = [];
      for (const measure of asArray(normalized.measures)) {
        if (!measure.isFormula) continue;
        if (measure.hasExceptionAggregation !== false) continue; // true or null -> skip
        findings.push({
          path: measure.path,
          message: `Formula/calculated key figure ${measure.name} has no exception aggregation; confirm its totals are correct.`,
        });
      }
      return findings;
    },
  },
  {
    ruleId: "BWQ007",
    title: "HIERARCHY_WITHOUT_LEVEL",
    severity: "info",
    appliesTo: ["spec", "model"],
    rationale: "A hierarchy shown without a display or expand level defaults to full expansion, which hurts readability and initial performance on deep hierarchies.",
    evaluate(normalized) {
      const findings = [];
      for (const hierarchy of asArray(normalized.hierarchies)) {
        if (hierarchy.hasLevel) continue;
        findings.push({
          path: hierarchy.path,
          message: `Hierarchy on ${hierarchy.characteristic || "a characteristic"} has no display/expand level and defaults to full expansion.`,
        });
      }
      return findings;
    },
  },
  {
    ruleId: "BWQ008",
    title: "ZERO_SUPPRESSION_ALL_VALUES",
    severity: "info",
    appliesTo: ["spec", "model"],
    rationale: "Zero suppression for all values re-evaluates every cell and can hide rows that are legitimately zero; FOR_RESULTS_ONLY is usually the safer default.",
    evaluate(normalized) {
      const mode = normalized.settings?.zeroSuppression?.mode;
      if (normalizeMode(mode) !== "FORALLVALUES") return [];
      return [{
        path: "settings.zeroSuppression.mode",
        message: `Zero suppression mode is FOR_ALL_VALUES (${mode}); confirm suppressing every zero value is intended.`,
      }];
    },
  },
  {
    ruleId: "BWQ009",
    title: "DUPLICATE_MEMBER_RESTRICTIONS",
    severity: "warning",
    appliesTo: ["spec", "model"],
    rationale: "Two or more key-figure members that carry the identical characteristic restriction should share a reusable restricted key figure or a variable; duplication drifts out of sync and prompts more than once.",
    evaluate(normalized) {
      const findings = [];
      for (const structure of keyFigureStructures(normalized)) {
        const bySignature = new Map();
        for (const member of asArray(structure.members)) {
          if (!member.restrictionSignature) continue; // unrestricted members never duplicate
          const list = bySignature.get(member.restrictionSignature) ?? [];
          list.push(member);
          bySignature.set(member.restrictionSignature, list);
        }
        for (const members of bySignature.values()) {
          if (members.length < 2) continue;
          const names = members.map((member) => member.name || member.description || "(member)");
          findings.push({
            path: structure.path,
            message: `Structure ${structure.name || "(unnamed)"} has ${members.length} members with the identical restriction: ${names.join(", ")}; consolidate into a reusable restricted key figure or variable.`,
          });
        }
      }
      return findings;
    },
  },
  {
    ruleId: "BWQ010",
    title: "NAMING_CONVENTION",
    severity: "info",
    appliesTo: ["spec", "model"],
    rationale: "Customer query technical names should start with Z or Y so they are recognizable as custom objects and survive upgrades in the customer namespace.",
    evaluate(normalized) {
      const name = normalized.technicalName;
      if (!isFilled(name)) return []; // unknown name -> skip
      if (/^[ZY]/i.test(name.trim())) return [];
      return [{
        path: "technicalName",
        message: `Query technical name ${name} does not start with Z or Y (customer namespace).`,
      }];
    },
  },
  {
    ruleId: "BWQ011",
    title: "UNRESTRICTED_QUERY",
    severity: "warning",
    appliesTo: ["spec", "model"],
    rationale: "A query with no filters and no restricted members reads the whole provider; add a global filter, a variable, or a restricted key figure before running it against production data.",
    evaluate(normalized) {
      const hasContent = AXES.some((axis) => asArray(normalized.axes?.[axis]).length > 0);
      if (!hasContent) return []; // an empty shell is not yet a query to judge
      if (asArray(normalized.restrictedCharacteristics).length > 0) return [];
      return [{
        path: null,
        message: "The query has no filters and no restricted members; it reads the entire provider.",
      }];
    },
  },
  {
    ruleId: "BWQ012",
    title: "STRUCTURE_OVERLOAD",
    severity: "warning",
    appliesTo: ["spec", "model"],
    rationale: "A key-figure structure with more than 15 members produces a very wide result and many cell calculations; splitting or trimming the structure keeps rendering and OLAP cost manageable.",
    evaluate(normalized) {
      const findings = [];
      for (const structure of keyFigureStructures(normalized)) {
        const count = asArray(structure.members).length;
        if (count <= 15) continue;
        findings.push({
          path: structure.path,
          message: `Structure ${structure.name || "(unnamed)"} has ${count} members; more than 15 key-figure members is a width/performance risk.`,
        });
      }
      return findings;
    },
  },
];

export const RULE_CATALOG = Object.freeze(RULES.map((rule) => Object.freeze({
  ruleId: rule.ruleId,
  title: rule.title,
  severity: rule.severity,
  rationale: rule.rationale,
  appliesTo: Object.freeze([...rule.appliesTo]),
})));

/**
 * Runs every catalog rule against a normalized query shape and returns findings
 * `[{ ruleId, severity, path?, message, rationale }]`. Rules that do not apply to the
 * source, or whose facts are unknown for the source, contribute nothing. Each rule is
 * isolated so a defensive miss in one cannot suppress the others.
 */
export function runRules(normalized) {
  if (!normalized || typeof normalized !== "object") return [];
  const sourceKind = normalized.sourceKind === "model" ? "model" : "spec";
  const findings = [];
  for (const rule of RULES) {
    if (!rule.appliesTo.includes(sourceKind)) continue;
    let produced = [];
    try {
      produced = rule.evaluate(normalized) ?? [];
    } catch {
      produced = []; // never let one rule throw the whole review
    }
    for (const finding of produced) {
      findings.push({
        ruleId: rule.ruleId,
        severity: rule.severity,
        path: finding.path ?? null,
        message: finding.message,
        rationale: rule.rationale,
      });
    }
  }
  return findings;
}
