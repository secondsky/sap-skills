package com.sap.bw.automation.core;

import java.util.List;

import org.eclipse.emf.common.util.Enumerator;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EStructuralFeature;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.sap.bw.qd.model.query.AbstractDimension;
import com.sap.bw.qd.model.query.AbstractSelectionRange;
import com.sap.bw.qd.model.query.Condition;
import com.sap.bw.qd.model.query.CustomDimension;
import com.sap.bw.qd.model.query.Decimals;
import com.sap.bw.qd.model.query.DefaultableString;
import com.sap.bw.qd.model.query.Dimension;
import com.sap.bw.qd.model.query.DisplayLevel;
import com.sap.bw.qd.model.query.Emphasize;
import com.sap.bw.qd.model.query.Exceptional;
import com.sap.bw.qd.model.query.Filter;
import com.sap.bw.qd.model.query.FilterSelection;
import com.sap.bw.qd.model.query.HideMember;
import com.sap.bw.qd.model.query.Hierarchy;
import com.sap.bw.qd.model.query.Member;
import com.sap.bw.qd.model.query.MemberFormula;
import com.sap.bw.qd.model.query.MemberSelection;
import com.sap.bw.qd.model.query.ParameterizableValue;
import com.sap.bw.qd.model.query.Query;
import com.sap.bw.qd.model.query.ResultPosition;
import com.sap.bw.qd.model.query.Scaling;
import com.sap.bw.qd.model.query.SelectionGroup;
import com.sap.bw.qd.model.query.SelectionOperation;
import com.sap.bw.qd.model.query.SelectionRange;
import com.sap.bw.qd.model.query.SelectionSet;
import com.sap.bw.qd.model.query.SelectionToken;
import com.sap.bw.qd.model.query.SelectionVariable;
import com.sap.bw.qd.model.query.Variable;
import com.sap.bw.qd.model.query.ZeroSuppression;

/**
 * Serializes an open BW query's EMF model to the deep-read JSON contract. Every feature
 * access is wrapped so the serializer NEVER throws: on any failure the affected field
 * degrades to null (or a best-effort default) and an entry is appended to
 * {@code serializationIssues}. Unrecognized member/token subtypes serialize as
 * {@code type:"other"} with the eClass simple name. This class is read-only — it never
 * mutates the model, never touches the editing domain, and never saves. Compiled against
 * the exported BWMT 1.27.36 model API recorded in references/bwmt-api-map.md; the adapter
 * only reaches this class after the capability probe proved that surface.
 */
public final class QueryModelReader {
    private final JsonArray serializationIssues = new JsonArray();

    public JsonObject read(Query query) {
        JsonObject root = new JsonObject();
        root.addProperty("found", true);
        root.addProperty("readOnlyInspection", true);
        root.add("technicalName", tryString("technicalName", () -> query.getTechnicalName()));
        root.add("provider", tryString("provider", () -> query.getProviderName()));
        root.add("description", tryString("description", () -> defaultable(query.getDescription())));
        root.add("modified", tryBoolean("modified", () -> query.isModified()));
        JsonObject axes = new JsonObject();
        axes.add("rows", serializeAxis("rows", () -> query.getRows()));
        axes.add("columns", serializeAxis("columns", () -> query.getColumns()));
        axes.add("free", serializeAxis("free", () -> query.getFree()));
        root.add("axes", axes);
        root.add("filter", serializeFilter(query));
        root.add("conditions", serializeConditions(query));
        root.add("exceptions", serializeExceptions(query));
        root.add("settings", serializeSettings(query));
        root.add("serializationIssues", serializationIssues);
        return root;
    }

    private JsonArray serializeAxis(String axisName, Throwing<List<? extends AbstractDimension>> supplier) {
        JsonArray out = new JsonArray();
        List<? extends AbstractDimension> axis;
        try {
            axis = supplier.get();
        } catch (Throwable failure) {
            issue("axes." + axisName + ": " + exc(failure));
            return out;
        }
        if (axis == null) return out;
        for (int index = 0; index < axis.size(); index++) {
            AbstractDimension element;
            try {
                element = axis.get(index);
            } catch (Throwable failure) {
                issue("axes." + axisName + "[" + index + "]: " + exc(failure));
                continue;
            }
            try {
                out.add(serializeAxisElement(axisName, element));
            } catch (Throwable failure) {
                issue("axes." + axisName + "[" + index + "]: " + exc(failure));
                JsonObject fallback = new JsonObject();
                fallback.addProperty("kind", "other");
                fallback.addProperty("eClass", eClassName(element));
                out.add(fallback);
            }
        }
        return out;
    }

    private JsonObject serializeAxisElement(String axisName, AbstractDimension element) {
        JsonObject out = new JsonObject();
        if (element instanceof CustomDimension structure) {
            out.addProperty("kind", "structure");
            out.add("technicalName", tryString("axes." + axisName + ".structure.technicalName", () -> structure.getTechnicalName()));
            out.add("description", tryString("axes." + axisName + ".structure.description", () -> defaultable(structure.getDescription())));
            JsonArray members = new JsonArray();
            List<Member> memberList;
            try {
                memberList = structure.getMembers();
            } catch (Throwable failure) {
                issue("axes." + axisName + ".members: " + exc(failure));
                memberList = null;
            }
            if (memberList != null) {
                for (int index = 0; index < memberList.size(); index++) {
                    Member member;
                    try {
                        member = memberList.get(index);
                    } catch (Throwable failure) {
                        issue("axes." + axisName + ".members[" + index + "]: " + exc(failure));
                        continue;
                    }
                    members.add(serializeMember(axisName, member));
                }
            }
            out.add("members", members);
        } else if (element instanceof Dimension dimension) {
            out.addProperty("kind", "characteristic");
            out.add("infoObjectName", tryString("axes." + axisName + ".infoObjectName", () -> dimension.getInfoObjectName()));
            out.add("hierarchy", serializeHierarchy(axisName, dimension));
            out.add("displayLevel", serializeDisplayLevel(axisName, dimension));
        } else {
            out.addProperty("kind", "characteristic");
            out.add("infoObjectName", tryString("axes." + axisName + ".infoObjectName", () -> element.getInfoObjectName()));
            out.add("hierarchy", JsonNull.INSTANCE);
            out.add("displayLevel", JsonNull.INSTANCE);
            issue("axes." + axisName + ": unexpected axis element " + eClassName(element));
        }
        return out;
    }

    private JsonElement serializeHierarchy(String axisName, Dimension dimension) {
        try {
            Hierarchy hierarchy = dimension.getHierarchy();
            if (hierarchy == null) return JsonNull.INSTANCE;
            ParameterizableValue value = hierarchy.getName();
            return strOrNull(value == null ? null : value.getValue());
        } catch (Throwable failure) {
            issue("axes." + axisName + ".hierarchy: " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement serializeDisplayLevel(String axisName, Dimension dimension) {
        try {
            DisplayLevel level = dimension.getDisplayLevel();
            if (level == null) return JsonNull.INSTANCE;
            return strOrNull(enumName(level.getType()));
        } catch (Throwable failure) {
            issue("axes." + axisName + ".displayLevel: " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonObject serializeMember(String axisName, Member member) {
        JsonObject out = new JsonObject();
        String prefix = "axes." + axisName + ".member";
        if (member instanceof MemberSelection selection) {
            out.addProperty("type", "selection");
            out.add("description", tryString(prefix + ".description", () -> defaultable(member.getDescription())));
            out.add("groups", serializeGroups(prefix, selection));
            out.add("formulaDefinitionString", JsonNull.INSTANCE);
        } else if (member instanceof MemberFormula formula) {
            out.addProperty("type", "formula");
            out.add("description", tryString(prefix + ".description", () -> defaultable(member.getDescription())));
            out.add("groups", new JsonArray());
            out.add("formulaDefinitionString", featureString(prefix, formula, "formulaDefinitionString"));
        } else {
            out.addProperty("type", "other");
            out.addProperty("eClass", eClassName(member));
            out.add("description", tryString(prefix + ".description", () -> defaultable(member.getDescription())));
            out.add("groups", new JsonArray());
            out.add("formulaDefinitionString", JsonNull.INSTANCE);
            issue(prefix + ": unrecognized member type " + eClassName(member));
        }
        out.add("decimals", serializeDecimals(prefix, member));
        out.add("scaling", serializeScaling(prefix, member));
        out.add("emphasize", serializeEmphasize(prefix, member));
        out.add("hidden", serializeHidden(prefix, member));
        return out;
    }

    private JsonArray serializeGroups(String prefix, MemberSelection selection) {
        JsonArray out = new JsonArray();
        List<SelectionGroup> groups;
        try {
            groups = selection.getGroups();
        } catch (Throwable failure) {
            issue(prefix + ".groups: " + exc(failure));
            return out;
        }
        if (groups == null) return out;
        for (int index = 0; index < groups.size(); index++) {
            SelectionGroup group;
            try {
                group = groups.get(index);
            } catch (Throwable failure) {
                issue(prefix + ".groups[" + index + "]: " + exc(failure));
                continue;
            }
            JsonObject serialized = new JsonObject();
            serialized.add("infoObject", tryString(prefix + ".group.infoObject", () -> group.getInfoObject()));
            serialized.add("tokens", serializeTokens(prefix + ".group", () -> group.getTokens()));
            out.add(serialized);
        }
        return out;
    }

    private JsonArray serializeTokens(String prefix, Throwing<List<SelectionToken>> supplier) {
        JsonArray out = new JsonArray();
        List<SelectionToken> tokens;
        try {
            tokens = supplier.get();
        } catch (Throwable failure) {
            issue(prefix + ".tokens: " + exc(failure));
            return out;
        }
        if (tokens == null) return out;
        for (int index = 0; index < tokens.size(); index++) {
            SelectionToken token;
            try {
                token = tokens.get(index);
            } catch (Throwable failure) {
                issue(prefix + ".tokens[" + index + "]: " + exc(failure));
                continue;
            }
            out.add(serializeToken(prefix, token));
        }
        return out;
    }

    private JsonObject serializeToken(String prefix, SelectionToken token) {
        JsonObject out = new JsonObject();
        out.addProperty("eClass", eClassName(token));
        String type;
        if (token instanceof SelectionRange) {
            type = "range";
        } else if (token instanceof SelectionVariable) {
            type = "variable";
        } else if (token instanceof SelectionOperation) {
            type = "operation";
        } else if (token instanceof SelectionSet) {
            type = "set";
        } else {
            type = "other";
            issue(prefix + ".token: unrecognized token type " + eClassName(token));
        }
        out.addProperty("type", type);
        JsonElement operator = JsonNull.INSTANCE;
        try {
            if (token instanceof SelectionRange range) operator = strOrNull(enumName(range.getOperator()));
            else if (token instanceof SelectionVariable variable) operator = strOrNull(enumName(variable.getOperator()));
        } catch (Throwable failure) {
            issue(prefix + ".token.operator: " + exc(failure));
        }
        out.add("operator", operator);
        boolean exclude = false;
        try {
            if (token instanceof SelectionSet set) exclude = set.isExclude();
        } catch (Throwable failure) {
            issue(prefix + ".token.exclude: " + exc(failure));
        }
        out.addProperty("exclude", exclude);
        JsonElement from = JsonNull.INSTANCE;
        JsonElement to = JsonNull.INSTANCE;
        if (token instanceof AbstractSelectionRange range) {
            from = serializeParam(prefix + ".token.from", () -> range.getFromValue());
            to = serializeParam(prefix + ".token.to", () -> range.getToValue());
        }
        out.add("from", from);
        out.add("to", to);
        JsonElement selectionType = JsonNull.INSTANCE;
        try {
            if (token instanceof SelectionSet set) selectionType = strOrNull(enumName(set.getSelectionType()));
        } catch (Throwable failure) {
            issue(prefix + ".token.selectionType: " + exc(failure));
        }
        out.add("selectionType", selectionType);
        JsonElement variable = JsonNull.INSTANCE;
        try {
            if (token instanceof SelectionVariable selectionVariable) {
                Variable bound = selectionVariable.getVariable();
                if (bound != null) {
                    JsonObject serialized = new JsonObject();
                    serialized.add("technicalName", strOrNull(bound.getTechnicalName()));
                    variable = serialized;
                }
            }
        } catch (Throwable failure) {
            issue(prefix + ".token.variable: " + exc(failure));
        }
        out.add("variable", variable);
        return out;
    }

    private JsonElement serializeParam(String prefix, Throwing<ParameterizableValue> supplier) {
        ParameterizableValue value;
        try {
            value = supplier.get();
        } catch (Throwable failure) {
            issue(prefix + ": " + exc(failure));
            return JsonNull.INSTANCE;
        }
        if (value == null) return JsonNull.INSTANCE;
        JsonObject out = new JsonObject();
        out.add("value", tryString(prefix + ".value", () -> value.getValue()));
        JsonElement type = JsonNull.INSTANCE;
        try {
            type = strOrNull(enumName(value.getType()));
        } catch (Throwable failure) {
            issue(prefix + ".type: " + exc(failure));
        }
        out.add("type", type);
        JsonElement variable = JsonNull.INSTANCE;
        try {
            Variable bound = value.getVariable();
            if (bound != null) variable = strOrNull(bound.getTechnicalName());
        } catch (Throwable failure) {
            issue(prefix + ".variable: " + exc(failure));
        }
        out.add("variable", variable);
        return out;
    }

    private JsonObject serializeFilter(Query query) {
        JsonObject out = new JsonObject();
        JsonArray selections = new JsonArray();
        Filter filter;
        try {
            filter = query.getFilter();
        } catch (Throwable failure) {
            issue("filter: " + exc(failure));
            out.add("selections", selections);
            return out;
        }
        if (filter != null) {
            List<FilterSelection> list;
            try {
                list = filter.getSelections();
            } catch (Throwable failure) {
                issue("filter.selections: " + exc(failure));
                list = null;
            }
            if (list != null) {
                for (int index = 0; index < list.size(); index++) {
                    FilterSelection selection;
                    try {
                        selection = list.get(index);
                    } catch (Throwable failure) {
                        issue("filter.selections[" + index + "]: " + exc(failure));
                        continue;
                    }
                    JsonObject serialized = new JsonObject();
                    serialized.add("infoObject", tryString("filter.selection.infoObject", () -> selection.getInfoObject()));
                    serialized.add("tokens", serializeTokens("filter.selection", () -> selection.getTokens()));
                    selections.add(serialized);
                }
            }
        }
        out.add("selections", selections);
        return out;
    }

    private JsonArray serializeConditions(Query query) {
        JsonArray out = new JsonArray();
        List<Condition> list;
        try {
            list = query.getConditions();
        } catch (Throwable failure) {
            issue("conditions: " + exc(failure));
            return out;
        }
        if (list == null) return out;
        for (int index = 0; index < list.size(); index++) {
            Condition condition;
            try {
                condition = list.get(index);
            } catch (Throwable failure) {
                issue("conditions[" + index + "]: " + exc(failure));
                continue;
            }
            JsonObject serialized = new JsonObject();
            serialized.add("description", tryString("conditions.description", () -> defaultable(condition.getDescription())));
            serialized.add("infoObject", tryString("conditions.infoObject", () -> condition.getInfoObject()));
            serialized.add("active", tryBoolean("conditions.active", () -> condition.isActive()));
            JsonArray assignedCharacteristics = new JsonArray();
            try {
                List<String> assigned = condition.getAssignedCharacteristics();
                if (assigned != null) for (String characteristic : assigned) assignedCharacteristics.add(characteristic);
            } catch (Throwable failure) {
                issue("conditions.assignedCharacteristics: " + exc(failure));
            }
            serialized.add("assignedCharacteristics", assignedCharacteristics);
            JsonElement assignment = JsonNull.INSTANCE;
            try {
                assignment = strOrNull(enumName(condition.getAssignment()));
            } catch (Throwable failure) {
                issue("conditions.assignment: " + exc(failure));
            }
            serialized.add("assignment", assignment);
            serialized.add("tokens", serializeTokens("conditions", () -> condition.getTokens()));
            out.add(serialized);
        }
        return out;
    }

    private JsonArray serializeExceptions(Query query) {
        JsonArray out = new JsonArray();
        List<Exceptional> list;
        try {
            list = query.getExceptions();
        } catch (Throwable failure) {
            issue("exceptions: " + exc(failure));
            return out;
        }
        if (list == null) return out;
        for (int index = 0; index < list.size(); index++) {
            Exceptional exception;
            try {
                exception = list.get(index);
            } catch (Throwable failure) {
                issue("exceptions[" + index + "]: " + exc(failure));
                continue;
            }
            JsonObject serialized = new JsonObject();
            serialized.add("description", tryString("exceptions.description", () -> defaultable(exception.getDescription())));
            serialized.add("infoObject", tryString("exceptions.infoObject", () -> exception.getInfoObject()));
            serialized.add("active", tryBoolean("exceptions.active", () -> exception.isActive()));
            serialized.add("assignedCharacteristics", new JsonArray());
            serialized.add("affectsDataCells", tryBoolean("exceptions.affectsDataCells", () -> exception.isAffectsDataCells()));
            serialized.add("tokens", serializeTokens("exceptions", () -> exception.getTokens()));
            out.add(serialized);
        }
        return out;
    }

    private JsonObject serializeSettings(Query query) {
        JsonObject out = new JsonObject();
        JsonElement zeroSuppression = JsonNull.INSTANCE;
        try {
            ZeroSuppression suppression = query.getZeroSuppression();
            if (suppression != null) {
                JsonObject serialized = new JsonObject();
                serialized.add("rows", tryBoolean("settings.zeroSuppression.rows", () -> suppression.isRows()));
                serialized.add("columns", tryBoolean("settings.zeroSuppression.columns", () -> suppression.isColumns()));
                JsonElement mode = JsonNull.INSTANCE;
                try {
                    mode = strOrNull(enumName(suppression.getMode()));
                } catch (Throwable failure) {
                    issue("settings.zeroSuppression.mode: " + exc(failure));
                }
                serialized.add("mode", mode);
                zeroSuppression = serialized;
            }
        } catch (Throwable failure) {
            issue("settings.zeroSuppression: " + exc(failure));
        }
        out.add("zeroSuppression", zeroSuppression);
        out.add("suppressRepeatedKeyValues", tryBoolean("settings.suppressRepeatedKeyValues", () -> query.isSuppressRepeatedKeyValues()));
        JsonElement signPresentation = JsonNull.INSTANCE;
        try {
            signPresentation = strOrNull(enumName(query.getSignPresentation()));
        } catch (Throwable failure) {
            issue("settings.signPresentation: " + exc(failure));
        }
        out.add("signPresentation", signPresentation);
        JsonElement resultPosition = JsonNull.INSTANCE;
        try {
            ResultPosition position = query.getResultPosition();
            if (position != null) {
                JsonObject serialized = new JsonObject();
                serialized.add("onTop", tryBoolean("settings.resultPosition.onTop", () -> position.isOnTop()));
                serialized.add("onLeft", tryBoolean("settings.resultPosition.onLeft", () -> position.isOnLeft()));
                resultPosition = serialized;
            }
        } catch (Throwable failure) {
            issue("settings.resultPosition: " + exc(failure));
        }
        out.add("resultPosition", resultPosition);
        out.add("easyQuery", tryBoolean("settings.easyQuery", () -> query.isEasyQuery()));
        out.add("hanaView", tryBoolean("settings.hanaView", () -> query.isHanaView()));
        return out;
    }

    private JsonElement serializeDecimals(String prefix, Member member) {
        try {
            Decimals decimals = member.getDecimals();
            return decimals == null ? JsonNull.INSTANCE : new JsonPrimitive(decimals.getNumber());
        } catch (Throwable failure) {
            issue(prefix + ".decimals: " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement serializeScaling(String prefix, Member member) {
        try {
            Scaling scaling = member.getScaling();
            return scaling == null ? JsonNull.INSTANCE : new JsonPrimitive(scaling.getNumber());
        } catch (Throwable failure) {
            issue(prefix + ".scaling: " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement serializeEmphasize(String prefix, Member member) {
        try {
            Emphasize emphasize = member.getEmphasize();
            return emphasize == null ? JsonNull.INSTANCE : new JsonPrimitive(emphasize.isEmphasize());
        } catch (Throwable failure) {
            issue(prefix + ".emphasize: " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement serializeHidden(String prefix, Member member) {
        try {
            HideMember hidden = member.getHidden();
            return hidden == null ? JsonNull.INSTANCE : strOrNull(enumName(hidden.getType()));
        } catch (Throwable failure) {
            issue(prefix + ".hidden: " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement featureString(String prefix, EObject target, String featureName) {
        try {
            EStructuralFeature feature = target.eClass().getEStructuralFeature(featureName);
            if (feature == null) return JsonNull.INSTANCE;
            Object value = target.eGet(feature);
            return value == null ? JsonNull.INSTANCE : new JsonPrimitive(value.toString());
        } catch (Throwable failure) {
            issue(prefix + "." + featureName + ": " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement tryString(String area, Throwing<String> supplier) {
        try {
            return strOrNull(supplier.get());
        } catch (Throwable failure) {
            issue(area + ": " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private JsonElement tryBoolean(String area, Throwing<Boolean> supplier) {
        try {
            Boolean value = supplier.get();
            return value == null ? JsonNull.INSTANCE : new JsonPrimitive(value);
        } catch (Throwable failure) {
            issue(area + ": " + exc(failure));
            return JsonNull.INSTANCE;
        }
    }

    private void issue(String detail) {
        serializationIssues.add(detail);
    }

    private static JsonElement strOrNull(String value) {
        return value == null ? JsonNull.INSTANCE : new JsonPrimitive(value);
    }

    private static String defaultable(DefaultableString value) {
        return value == null ? null : value.getValue();
    }

    private static String enumName(Object value) {
        return value instanceof Enumerator enumerator ? enumerator.getName() : null;
    }

    private static String eClassName(Object value) {
        try {
            if (value instanceof EObject object && object.eClass() != null) return object.eClass().getName();
        } catch (Throwable ignored) {
            // Fall through to the runtime class name below.
        }
        return value == null ? "null" : value.getClass().getSimpleName();
    }

    private static String exc(Throwable failure) {
        return failure.getClass().getSimpleName();
    }

    @FunctionalInterface
    private interface Throwing<T> {
        T get() throws Throwable;
    }
}
