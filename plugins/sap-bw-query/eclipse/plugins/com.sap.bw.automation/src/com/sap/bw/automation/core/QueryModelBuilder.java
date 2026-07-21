package com.sap.bw.automation.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.Enumerator;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EStructuralFeature;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sap.bw.model.bwcore.ComparisonOperator;
import com.sap.bw.qd.model.query.AbstractDimension;
import com.sap.bw.qd.model.query.AlertLevel;
import com.sap.bw.qd.model.query.Condition;
import com.sap.bw.qd.model.query.ConditionChaAssignment;
import com.sap.bw.qd.model.query.ConditionOperator;
import com.sap.bw.qd.model.query.CustomDimension;
import com.sap.bw.qd.model.query.DefaultableString;
import com.sap.bw.qd.model.query.Dimension;
import com.sap.bw.qd.model.query.ExceptionOperator;
import com.sap.bw.qd.model.query.Exceptional;
import com.sap.bw.qd.model.query.Filter;
import com.sap.bw.qd.model.query.Hierarchy;
import com.sap.bw.qd.model.query.MemberFormula;
import com.sap.bw.qd.model.query.MemberSelection;
import com.sap.bw.qd.model.query.ParameterizableValue;
import com.sap.bw.qd.model.query.Query;
import com.sap.bw.qd.model.query.QueryElement;
import com.sap.bw.qd.model.query.QueryFactory;
import com.sap.bw.qd.model.query.ResultPosition;
import com.sap.bw.qd.model.query.SelectionGroup;
import com.sap.bw.qd.model.query.SelectionRange;
import com.sap.bw.qd.model.query.SelectionType;
import com.sap.bw.qd.model.query.SelectionVariable;
import com.sap.bw.qd.model.query.SignPresentation;
import com.sap.bw.qd.model.query.StandardFilterSelection;
import com.sap.bw.qd.model.query.ValueTypeFlag;
import com.sap.bw.qd.model.query.Variable;
import com.sap.bw.qd.model.query.ZeroSuppression;
import com.sap.bw.qd.model.query.ZeroSuppressionMode;

/**
 * Builds the unsaved BW query model from a QuerySpec draft. Every element application is
 * recorded in a per-element apply report; a failed or unsupported element never aborts
 * the remaining elements and never reaches the backend (the human save stays the final
 * gate). Compiled against the exported BWMT 1.27.36 model API recorded in
 * references/bwmt-api-map.md; the adapter only reaches this class after the capability
 * probe proved that surface.
 */
public final class QueryModelBuilder {
    private final QueryFactory factory = QueryFactory.eINSTANCE;
    private final JsonArray report = new JsonArray();
    private final Map<String, Variable> variables = new HashMap<>();

    public JsonArray apply(Query query, JsonObject spec) {
        applyElement("description", () -> {
            if (!spec.has("description")) return "SKIPPED_EMPTY";
            query.setDescription(defaultableString(string(spec, "description")));
            return "APPLIED";
        });
        registerVariables(spec);
        applyAxes(query, spec);
        applyFilters(query, spec);
        applyConditions(query, spec);
        applyExceptions(query, spec);
        applyDisplay(query, spec);
        return report.deepCopy();
    }

    private void registerVariables(JsonObject spec) {
        for (JsonElement element : array(spec, "variables")) {
            JsonObject definition = element.getAsJsonObject();
            String name = string(definition, "technicalName");
            applyElement("variables[" + name + "]", () -> {
                Variable variable = factory.createVariable();
                variable.setTechnicalName(name);
                if (definition.has("characteristic")) variable.setInfoObject(string(definition, "characteristic"));
                if (definition.has("readyForInput")) variable.setReadyForInput(definition.get("readyForInput").getAsBoolean());
                variables.put(name.toUpperCase(Locale.ROOT), variable);
                return "APPLIED";
            });
        }
    }

    private void applyAxes(Query query, JsonObject spec) {
        JsonObject axes = spec.has("axes") ? spec.getAsJsonObject("axes") : new JsonObject();
        Map<String, JsonObject> keyFigureDefinitions = definitions(spec, "keyFigures");
        Map<String, JsonObject> formulaDefinitions = definitions(spec, "formulas");
        Map<String, JsonObject> structureDefinitions = definitions(spec, "structures");
        for (String axisName : List.of("rows", "columns", "free")) {
            EList<AbstractDimension> target = switch (axisName) {
                case "rows" -> query.getRows();
                case "columns" -> query.getColumns();
                default -> query.getFree();
            };
            List<JsonObject> measureElements = new ArrayList<>();
            for (JsonElement element : array(axes, axisName)) {
                JsonObject axisElement = element.getAsJsonObject();
                String technicalName = string(axisElement, "technicalName");
                String kind = axisElement.has("kind") ? string(axisElement, "kind") : "characteristic";
                String path = "axes." + axisName + "[" + technicalName + "]";
                switch (kind) {
                    case "characteristic" -> applyElement(path, () -> {
                        Dimension dimension = factory.createDimension();
                        dimension.setInfoObjectName(technicalName);
                        if (axisElement.has("hierarchy")) dimension.setHierarchy(hierarchy(string(axisElement, "hierarchy")));
                        target.add(dimension);
                        return "APPLIED";
                    });
                    case "structure" -> applyElement(path, () -> {
                        JsonObject structure = structureDefinitions.get(technicalName.toUpperCase(Locale.ROOT));
                        if (structure == null) throw new IllegalArgumentException("Structure is not defined in the spec");
                        buildStructure(query, target, structure, keyFigureDefinitions, formulaDefinitions, path);
                        return "APPLIED";
                    });
                    case "keyFigure", "formula" -> measureElements.add(axisElement);
                    default -> skipped(path, "Unknown axis element kind " + kind);
                }
            }
            if (!measureElements.isEmpty()) {
                String path = "axes." + axisName + ".keyFigureStructure";
                applyElement(path, () -> {
                    CustomDimension structure = ensureKeyFigureStructure(query, target);
                    for (JsonObject measure : measureElements) {
                        addMeasureMember(structure, measure, keyFigureDefinitions, formulaDefinitions,
                                path + "[" + string(measure, "technicalName") + "]");
                    }
                    return "APPLIED";
                });
            }
        }
    }

    private CustomDimension ensureKeyFigureStructure(Query query, EList<AbstractDimension> target) {
        CustomDimension existing = query.getFirstCustomDimension();
        if (existing != null && existing.getMembers().isEmpty()) {
            if (!target.contains(existing)) target.add(existing);
            return existing;
        }
        CustomDimension structure = factory.createCustomDimension();
        structure.setDescription(defaultableString("Key Figures"));
        target.add(structure);
        if (existing == null) {
            try {
                query.setFirstCustomDimension(structure);
            } catch (RuntimeException ignored) {
                // The slot may be containment-managed by the axis list; the structure stays on the axis.
            }
        }
        return structure;
    }

    private void buildStructure(Query query, EList<AbstractDimension> target, JsonObject definition,
            Map<String, JsonObject> keyFigureDefinitions, Map<String, JsonObject> formulaDefinitions, String path) {
        String kind = definition.has("kind") ? string(definition, "kind") : "keyFigure";
        CustomDimension structure;
        if ("keyFigure".equals(kind)) {
            structure = ensureKeyFigureStructure(query, target);
        } else {
            structure = factory.createCustomDimension();
            target.add(structure);
        }
        structure.setTechnicalName(string(definition, "technicalName"));
        structure.setDescription(defaultableString(
                definition.has("description") ? string(definition, "description") : string(definition, "technicalName")));
        for (JsonElement member : array(definition, "members")) {
            String memberName = member.getAsString();
            String memberPath = path + ".members[" + memberName + "]";
            if ("keyFigure".equals(kind)) {
                JsonObject measure = new JsonObject();
                measure.addProperty("technicalName", memberName);
                addMeasureMember(structure, measure, keyFigureDefinitions, formulaDefinitions, memberPath);
            } else {
                skipped(memberPath, "Characteristic structure members need value selections; refine them in the editor before saving.");
            }
        }
    }

    private void addMeasureMember(CustomDimension structure, JsonObject axisElement,
            Map<String, JsonObject> keyFigureDefinitions, Map<String, JsonObject> formulaDefinitions, String path) {
        String technicalName = string(axisElement, "technicalName");
        JsonObject keyFigure = keyFigureDefinitions.get(technicalName.toUpperCase(Locale.ROOT));
        JsonObject formula = formulaDefinitions.get(technicalName.toUpperCase(Locale.ROOT));
        String kind = keyFigure != null && keyFigure.has("kind") ? string(keyFigure, "kind")
                : formula != null ? "formula" : "basic";
        applyElement(path, () -> switch (kind) {
            case "restricted" -> {
                structure.getMembers().add(restrictedMember(keyFigure));
                yield "APPLIED";
            }
            case "calculated", "formula" -> {
                JsonObject definition = formula != null ? formula : keyFigure;
                yield formulaMember(structure, definition, technicalName);
            }
            default -> {
                String label = keyFigure != null && keyFigure.has("description")
                        ? string(keyFigure, "description") : technicalName;
                structure.getMembers().add(basicMember(technicalName, label));
                yield "APPLIED";
            }
        });
        if (keyFigure != null && keyFigure.has("display")) {
            applyDisplayToLastMember(structure, keyFigure.getAsJsonObject("display"), path + ".display");
        }
    }

    private MemberSelection basicMember(String keyFigureName, String label) {
        MemberSelection member = factory.createMemberSelection();
        member.setDescription(defaultableString(label));
        SelectionGroup group = factory.createSelectionGroup();
        group.setInfoObject(keyFigureName);
        SelectionRange range = factory.createSelectionRange();
        range.setSelectionType(SelectionType.KEY_FIGURE);
        range.setExclude(false);
        range.setFromValue(parameterizableValue(keyFigureName, ValueTypeFlag.INFO_OBJECT));
        group.getTokens().add(range);
        member.getGroups().add(group);
        return member;
    }

    private MemberSelection restrictedMember(JsonObject definition) {
        String baseKeyFigure = string(definition, "baseKeyFigure");
        String label = definition.has("description") ? string(definition, "description") : string(definition, "technicalName");
        MemberSelection member = basicMember(baseKeyFigure, label);
        for (JsonElement element : array(definition, "restrictions")) {
            JsonObject restriction = element.getAsJsonObject();
            SelectionGroup group = factory.createSelectionGroup();
            group.setInfoObject(string(restriction, "characteristic"));
            boolean excluding = restriction.has("excluding") && restriction.get("excluding").getAsBoolean();
            if (restriction.has("variable")) {
                SelectionVariable token = factory.createSelectionVariable();
                token.setVariable(resolveVariable(string(restriction, "variable")));
                token.setExclude(excluding);
                group.getTokens().add(token);
            }
            for (JsonElement value : array(restriction, "values")) {
                SelectionRange range = factory.createSelectionRange();
                range.setExclude(excluding);
                if (restriction.has("operator")) range.setOperator(comparisonOperator(string(restriction, "operator")));
                range.setFromValue(parameterizableValue(value.getAsString(), ValueTypeFlag.VALUE));
                if (restriction.has("high")) {
                    range.setToValue(parameterizableValue(restriction.get("high").getAsString(), ValueTypeFlag.VALUE));
                }
                group.getTokens().add(range);
            }
            member.getGroups().add(group);
        }
        return member;
    }

    private String formulaMember(CustomDimension structure, JsonObject definition, String technicalName) {
        MemberFormula member = factory.createMemberFormula();
        String label = definition != null && definition.has("description") ? string(definition, "description") : technicalName;
        member.setDescription(defaultableString(label));
        String expression = definition == null ? null
                : definition.has("expression") ? string(definition, "expression")
                : definition.has("formula") ? string(definition.getAsJsonObject("formula"), "expression")
                : null;
        if (expression == null || expression.isBlank()) {
            throw new IllegalArgumentException("Formula member has no expression");
        }
        if (!setFeature(member, "formulaDefinitionString", expression)) {
            structure.getMembers().add(member);
            return "SKIPPED_UNSUPPORTED: formulaDefinitionString feature is unavailable; enter the formula in the editor";
        }
        structure.getMembers().add(member);
        return "APPLIED";
    }

    private void applyDisplayToLastMember(CustomDimension structure, JsonObject display, String path) {
        applyElement(path, () -> {
            var members = structure.getMembers();
            if (members.isEmpty()) return "SKIPPED_EMPTY";
            var member = members.get(members.size() - 1);
            if (display.has("decimals")) {
                var decimals = factory.createDecimals();
                decimals.setNumber(display.get("decimals").getAsInt());
                decimals.setDefault(false);
                member.setDecimals(decimals);
            }
            if (display.has("scaling")) {
                var scaling = factory.createScaling();
                scaling.setNumber(display.get("scaling").getAsInt());
                scaling.setDefault(false);
                member.setScaling(scaling);
            }
            if (display.has("emphasize")) {
                var emphasize = factory.createEmphasize();
                emphasize.setEmphasize(true);
                emphasize.setDefault(false);
                member.setEmphasize(emphasize);
            }
            return "APPLIED";
        });
    }

    private void applyFilters(Query query, JsonObject spec) {
        List<JsonObject> filters = new ArrayList<>();
        for (JsonElement element : array(spec, "filters")) filters.add(element.getAsJsonObject());
        List<JsonObject> variableBindings = new ArrayList<>();
        for (JsonElement element : array(spec, "variables")) {
            JsonObject variable = element.getAsJsonObject();
            if (variable.has("characteristic")) variableBindings.add(variable);
        }
        if (filters.isEmpty() && variableBindings.isEmpty()) return;
        applyElement("filters", () -> {
            Filter filter = query.getFilter();
            if (filter == null) {
                filter = factory.createFilter();
                query.setFilter(filter);
            }
            return "APPLIED";
        });
        Filter filter = query.getFilter();
        if (filter == null) return;
        for (JsonObject definition : filters) {
            String characteristic = string(definition, "characteristic");
            applyElement("filters[" + characteristic + "]", () -> {
                StandardFilterSelection selection = factory.createStandardFilterSelection();
                selection.setInfoObject(characteristic);
                SelectionRange range = factory.createSelectionRange();
                range.setOperator(comparisonOperator(string(definition, "operator")));
                range.setExclude(definition.has("excluding") && definition.get("excluding").getAsBoolean());
                if (definition.has("value")) {
                    range.setFromValue(parameterizableValue(asText(definition.get("value")), ValueTypeFlag.VALUE));
                }
                if (definition.has("high")) {
                    range.setToValue(parameterizableValue(asText(definition.get("high")), ValueTypeFlag.VALUE));
                }
                selection.getTokens().add(range);
                query.getFilter().getSelections().add(selection);
                return "APPLIED";
            });
        }
        for (JsonObject binding : variableBindings) {
            String characteristic = string(binding, "characteristic");
            String variableName = string(binding, "technicalName");
            applyElement("filters.variable[" + variableName + "]", () -> {
                StandardFilterSelection selection = factory.createStandardFilterSelection();
                selection.setInfoObject(characteristic);
                SelectionVariable token = factory.createSelectionVariable();
                token.setVariable(resolveVariable(variableName));
                selection.getTokens().add(token);
                query.getFilter().getSelections().add(selection);
                return "APPLIED";
            });
        }
    }

    private void applyConditions(Query query, JsonObject spec) {
        for (JsonElement element : array(spec, "conditions")) {
            JsonObject definition = element.getAsJsonObject();
            String keyFigure = string(definition, "keyFigure");
            applyElement("conditions[" + keyFigure + "]", () -> {
                Condition condition = factory.createCondition();
                if (definition.has("description")) condition.setDescription(defaultableString(string(definition, "description")));
                condition.setInfoObject(keyFigure);
                condition.setActive(!definition.has("active") || definition.get("active").getAsBoolean());
                JsonArray characteristics = array(definition, "characteristics");
                for (JsonElement characteristic : characteristics) {
                    condition.getAssignedCharacteristics().add(characteristic.getAsString());
                }
                condition.setAssignment(characteristics.isEmpty()
                        ? ConditionChaAssignment.ALL_INDEPENDENTLY : ConditionChaAssignment.INDIVIDUAL);
                EObject token = (EObject) factory.createSelectionTokenForCondition();
                boolean operatorSet = setFeature(token, "operator", conditionOperator(string(definition, "operator")));
                boolean valueSet = setAnyFeature(token,
                        new String[] { "fromValue", "value", "low" },
                        parameterizableValue(asText(definition.get("threshold")), ValueTypeFlag.VALUE));
                if (definition.has("thresholdHigh")) {
                    setAnyFeature(token, new String[] { "toValue", "high" },
                            parameterizableValue(asText(definition.get("thresholdHigh")), ValueTypeFlag.VALUE));
                }
                if (!operatorSet || !valueSet) {
                    return "SKIPPED_UNSUPPORTED: condition token features unavailable; define the condition in the editor";
                }
                condition.getTokens().add((com.sap.bw.qd.model.query.SelectionToken) token);
                query.getConditions().add(condition);
                return "APPLIED";
            });
        }
    }

    private void applyExceptions(Query query, JsonObject spec) {
        for (JsonElement element : array(spec, "exceptions")) {
            JsonObject definition = element.getAsJsonObject();
            String label = definition.has("keyFigure") ? string(definition, "keyFigure") : string(definition, "alertLevel");
            applyElement("exceptions[" + label + "]", () -> {
                Exceptional exception = factory.createExceptional();
                if (definition.has("description")) exception.setDescription(defaultableString(string(definition, "description")));
                if (definition.has("keyFigure")) exception.setInfoObject(string(definition, "keyFigure"));
                exception.setActive(!definition.has("active") || definition.get("active").getAsBoolean());
                exception.setAffectsDataCells(!definition.has("affectsDataCells") || definition.get("affectsDataCells").getAsBoolean());
                EObject token = (EObject) factory.createSelectionTokenForException();
                boolean alertSet = setFeature(token, "alertLevel", alertLevel(string(definition, "alertLevel")));
                boolean operatorSet = setFeature(token, "operator", exceptionOperator(string(definition, "operator")));
                boolean valueSet = setAnyFeature(token,
                        new String[] { "fromValue", "value", "low" },
                        parameterizableValue(asText(definition.get("threshold")), ValueTypeFlag.VALUE));
                if (definition.has("thresholdHigh")) {
                    setAnyFeature(token, new String[] { "toValue", "high" },
                            parameterizableValue(asText(definition.get("thresholdHigh")), ValueTypeFlag.VALUE));
                }
                if (!alertSet || !operatorSet || !valueSet) {
                    return "SKIPPED_UNSUPPORTED: exception token features unavailable; define the exception in the editor";
                }
                exception.getTokens().add((com.sap.bw.qd.model.query.SelectionToken) token);
                query.getExceptions().add(exception);
                return "APPLIED";
            });
        }
    }

    private void applyDisplay(Query query, JsonObject spec) {
        if (!spec.has("display")) return;
        JsonObject display = spec.getAsJsonObject("display");
        if (display.has("zeroSuppression")) {
            applyElement("display.zeroSuppression", () -> {
                JsonObject definition = display.getAsJsonObject("zeroSuppression");
                ZeroSuppression suppression = factory.createZeroSuppression();
                suppression.setRows(definition.has("rows") && definition.get("rows").getAsBoolean());
                suppression.setColumns(definition.has("columns") && definition.get("columns").getAsBoolean());
                if (definition.has("mode")) {
                    suppression.setMode(resolveEnum(ZeroSuppressionMode.values(), string(definition, "mode"), "zero suppression mode"));
                }
                query.setZeroSuppression(suppression);
                return "APPLIED";
            });
        }
        if (display.has("suppressRepeatedKeyValues")) {
            applyElement("display.suppressRepeatedKeyValues", () -> {
                query.setSuppressRepeatedKeyValues(display.get("suppressRepeatedKeyValues").getAsBoolean());
                return "APPLIED";
            });
        }
        if (display.has("signPresentation")) {
            applyElement("display.signPresentation", () -> {
                query.setSignPresentation(resolveEnum(SignPresentation.values(), string(display, "signPresentation"), "sign presentation"));
                return "APPLIED";
            });
        }
        if (display.has("resultPosition")) {
            applyElement("display.resultPosition", () -> {
                String value = string(display, "resultPosition").toUpperCase(Locale.ROOT);
                ResultPosition position = factory.createResultPosition();
                position.setOnTop(value.contains("TOP"));
                position.setOnLeft(value.contains("LEFT"));
                query.setResultPosition(position);
                return "APPLIED";
            });
        }
    }

    private Variable resolveVariable(String technicalName) {
        return variables.computeIfAbsent(technicalName.toUpperCase(Locale.ROOT), key -> {
            Variable variable = factory.createVariable();
            variable.setTechnicalName(technicalName);
            return variable;
        });
    }

    private Hierarchy hierarchy(String name) {
        Hierarchy hierarchy = factory.createHierarchy();
        hierarchy.setName(parameterizableValue(name, ValueTypeFlag.VALUE));
        hierarchy.setActive(true);
        return hierarchy;
    }

    private ParameterizableValue parameterizableValue(String value, ValueTypeFlag type) {
        ParameterizableValue parameterizable = factory.createParameterizableValue();
        parameterizable.setValue(value);
        parameterizable.setType(type);
        return parameterizable;
    }

    private DefaultableString defaultableString(String value) {
        DefaultableString text = factory.createDefaultableString();
        text.setValue(value);
        text.setDefault(false);
        return text;
    }

    private static ComparisonOperator comparisonOperator(String value) {
        String normalized = switch (value.toUpperCase(Locale.ROOT)) {
            case "EQ" -> "EQUAL";
            case "NE" -> "NOT_EQUAL";
            case "GT" -> "GREATER_THAN";
            case "GE" -> "GREATER_EQUAL";
            case "LT" -> "LESS_THAN";
            case "LE" -> "LESS_EQUAL";
            case "BT" -> "BETWEEN";
            case "NB" -> "NOT_BETWEEN";
            case "CP" -> "CONTAINS_PATTERN";
            case "NP" -> "NOT_PATTERN";
            default -> value.toUpperCase(Locale.ROOT);
        };
        return resolveEnum(ComparisonOperator.values(), normalized, "comparison operator");
    }

    private static ConditionOperator conditionOperator(String value) {
        return resolveEnum(ConditionOperator.values(), value, "condition operator");
    }

    private static ExceptionOperator exceptionOperator(String value) {
        return resolveEnum(ExceptionOperator.values(), value, "exception operator");
    }

    private static AlertLevel alertLevel(String value) {
        return resolveEnum(AlertLevel.values(), value, "alert level");
    }

    // The BWMT EEnums expose CamelCase getName()/getLiteral() values (e.g. Java TOP_N ->
    // "TopN", FOR_ALL_VALUES -> "forAllValues"), so EEnum.getByName(javaConstantName) returns
    // null. Match the incoming token against the Java constant name AND the EMF name/literal,
    // ignoring case and separators, so specs may use the Java-constant names this project
    // documents (EQUAL, TOP_N, BAD1, FOR_ALL_VALUES) or the raw EMF names interchangeably.
    private static <T extends Enumerator> T resolveEnum(T[] values, String token, String kind) {
        String norm = normalizeToken(token);
        if (norm.isEmpty()) throw new IllegalArgumentException("Missing " + kind);
        for (T candidate : values) {
            String javaName = candidate instanceof Enum<?> constant ? constant.name() : "";
            if (normalizeToken(javaName).equals(norm)
                    || normalizeToken(candidate.getName()).equals(norm)
                    || normalizeToken(candidate.getLiteral()).equals(norm)) {
                return candidate;
            }
        }
        throw new IllegalArgumentException("Unknown " + kind + " " + token);
    }

    private static String normalizeToken(String value) {
        return value == null ? "" : value.toUpperCase(Locale.ROOT).replaceAll("[^A-Z0-9]", "");
    }

    private static boolean setFeature(EObject target, String featureName, Object value) {
        EStructuralFeature feature = target.eClass().getEStructuralFeature(featureName);
        if (feature == null) return false;
        try {
            target.eSet(feature, value);
            return true;
        } catch (RuntimeException exception) {
            return false;
        }
    }

    private static boolean setAnyFeature(EObject target, String[] featureNames, Object value) {
        for (String featureName : featureNames) {
            if (setFeature(target, featureName, value)) return true;
        }
        return false;
    }

    private void applyElement(String path, ElementApplication application) {
        try {
            String status = application.run();
            if (status.startsWith("SKIPPED_UNSUPPORTED")) {
                int separator = status.indexOf(':');
                skipped(path, separator > 0 ? status.substring(separator + 1).trim() : "Unsupported by the installed BWMT model");
            } else if ("SKIPPED_EMPTY".equals(status)) {
                // Nothing to apply for this element; no report entry needed.
            } else {
                entry(path, "APPLIED", "");
            }
        } catch (Throwable failure) {
            entry(path, "FAILED", StepJournal.redact(failure.getClass().getSimpleName() + ": " + failure.getMessage()));
        }
    }

    private void skipped(String path, String detail) {
        entry(path, "SKIPPED_UNSUPPORTED", StepJournal.redact(detail));
    }

    private void entry(String path, String status, String detail) {
        JsonObject item = new JsonObject();
        item.addProperty("path", path);
        item.addProperty("status", status);
        if (!detail.isBlank()) item.addProperty("detail", detail);
        report.add(item);
    }

    private static Map<String, JsonObject> definitions(JsonObject spec, String field) {
        Map<String, JsonObject> byName = new HashMap<>();
        for (JsonElement element : array(spec, field)) {
            JsonObject definition = element.getAsJsonObject();
            if (definition.has("technicalName")) {
                byName.put(string(definition, "technicalName").toUpperCase(Locale.ROOT), definition);
            }
        }
        return byName;
    }

    private static JsonArray array(JsonObject object, String name) {
        return object != null && object.has(name) && object.get(name).isJsonArray()
                ? object.getAsJsonArray(name) : new JsonArray();
    }

    private static String string(JsonObject object, String name) {
        return object != null && object.has(name) && !object.get(name).isJsonNull()
                ? object.get(name).getAsString() : "";
    }

    private static String asText(JsonElement element) {
        return element == null || element.isJsonNull() ? "" : element.isJsonPrimitive() ? element.getAsString() : element.toString();
    }

    @FunctionalInterface
    private interface ElementApplication {
        String run() throws Exception;
    }
}
