package com.sap.bw.automation.core;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.jface.wizard.IWizard;
import org.eclipse.jface.wizard.WizardDialog;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IEditorReference;
import org.eclipse.ui.IWorkbenchWizard;
import org.eclipse.ui.PlatformUI;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sap.bw.automation.ui.NewQueryConfirmationDialog;

public final class BwmtAdapter {
    private static final String QUERY_EDITOR = "com.sap.bw.qd.ui.editor.QueryEditor";
    private static final String QUERY_WIZARD = "com.sap.bw.qd.QueryNewWizard";
    private final CapabilityProbe probe = new CapabilityProbe();
    private final ProviderMetadataGateway metadataGateway = new ProviderMetadataGateway();
    private final StepJournal journal;
    private final Map<String, JsonObject> localDrafts = new ConcurrentHashMap<>();

    public BwmtAdapter(StepJournal journal) {
        this.journal = journal;
    }

    public JsonElement dispatch(String method, JsonObject payload) {
        return switch (method) {
            case "inspectCapabilities" -> probe.inspect();
            case "describeProvider" -> describeProvider(payload);
            case "listQueries" -> listQueries(payload);
            case "readQuery" -> readQuery(payload);
            case "readQueryModel" -> readQueryModel(payload);
            case "projectCreateOrOpen" -> projectCreateOrOpen(payload);
            case "createLocalDraft" -> createLocalDraft(payload);
            case "applySpecToDraft" -> applySpecToDraft(payload);
            case "previewDraft" -> previewDraft(payload);
            case "prepareNewQuerySave" -> prepareNewQuerySave(payload);
            case "populateQueryEditor" -> populateQueryEditor(payload);
            default -> throw new IllegalArgumentException("Method is not allow-listed");
        };
    }

    private JsonObject populateQueryEditor(JsonObject payload) {
        JsonObject support = probe.populateSupport();
        if (!support.get("supported").getAsBoolean()) {
            JsonObject result = new JsonObject();
            result.addProperty("populated", false);
            result.addProperty("saved", false);
            result.addProperty("instruction",
                    "Draft population is capability-gated off for this BWMT installation; run bw_inspect_capabilities for details.");
            result.add("issues", support.getAsJsonArray("issues"));
            journal.append("populateQueryEditor", "BLOCKED",
                    "Draft population capability is gated off for this BWMT installation", VisualClass.AMBER, false);
            return result;
        }
        try {
            return new QueryEditorGateway(journal).populate(payload);
        } catch (LinkageError error) {
            JsonObject result = new JsonObject();
            result.addProperty("populated", false);
            result.addProperty("saved", false);
            result.addProperty("instruction",
                    "The BWMT model API could not be linked (" + error.getClass().getSimpleName()
                            + "); the query stays untouched. Build it in the native editor.");
            journal.append("populateQueryEditor", "BLOCKED", "BWMT model linkage failed during population",
                    VisualClass.RED, true);
            return result;
        }
    }

    private JsonObject projectCreateOrOpen(JsonObject payload) {
        String project = string(payload, "project");
        JsonObject result = new JsonObject();
        boolean exists = !project.isBlank() && ResourcesPlugin.getWorkspace().getRoot().getProject(project).exists();
        result.addProperty("project", project);
        result.addProperty("opened", exists);
        result.addProperty("userActionRequired", !exists);
        if (!exists) result.addProperty("instruction", "Create the BW project with the native SAP wizard; enter credentials only in the SAP login dialog.");
        return result;
    }

    private JsonObject listQueries(JsonObject payload) {
        JsonArray names = new JsonArray();
        for (Object query : openQueries()) names.add(invokeString(query, "getTechnicalName"));
        JsonObject result = new JsonObject();
        result.add("technicalNames", names);
        result.addProperty("scope", "currently open BW Query Designer editors");
        return result;
    }

    private JsonObject readQuery(JsonObject payload) {
        String requested = string(payload, "technicalName");
        for (Object query : openQueries()) {
            if (requested.equalsIgnoreCase(invokeString(query, "getTechnicalName"))) return summarizeQuery(query);
        }
        JsonObject result = new JsonObject();
        result.addProperty("found", false);
        result.addProperty("userActionRequired", true);
        result.addProperty("instruction", "Open the existing query read-only in BW Query Designer, then retry.");
        return result;
    }

    private JsonObject readQueryModel(JsonObject payload) {
        JsonObject support = probe.modelReadSupport();
        if (!support.get("supported").getAsBoolean()) {
            JsonObject result = new JsonObject();
            result.addProperty("found", false);
            result.addProperty("readOnlyInspection", true);
            result.addProperty("reason", "CAPABILITY_GATED");
            result.addProperty("instruction",
                    "The installed BWMT does not expose the query model read APIs; run bw_inspect_capabilities for details.");
            result.add("issues", support.getAsJsonArray("issues"));
            result.add("serializationIssues", new JsonArray());
            journal.append("readQueryModel", "DEGRADED",
                    "Query model read capability is gated off for this BWMT installation", VisualClass.AMBER, false);
            return result;
        }
        try {
            JsonObject result = QueryEditorGateway.readModel(payload);
            if (result.has("found") && result.get("found").getAsBoolean()) {
                journal.append("readQueryModel", "COMPLETED",
                        "Read-only deep query model read for " + string(payload, "technicalName"), VisualClass.GREEN, false);
            }
            return result;
        } catch (LinkageError error) {
            JsonObject result = new JsonObject();
            result.addProperty("found", false);
            result.addProperty("readOnlyInspection", true);
            result.addProperty("instruction", "The BWMT model API could not be linked ("
                    + error.getClass().getSimpleName() + "); no model was read.");
            result.add("serializationIssues", new JsonArray());
            journal.append("readQueryModel", "BLOCKED", "BWMT model linkage failed during query model read",
                    VisualClass.RED, true);
            return result;
        }
    }

    private JsonObject describeProvider(JsonObject payload) {
        String provider = string(payload, "provider");
        JsonObject result = new JsonObject();
        result.addProperty("provider", provider);
        JsonArray openQueries = new JsonArray();
        for (Object query : openQueries()) {
            if (provider.equalsIgnoreCase(invokeString(query, "getProviderName"))) openQueries.add(summarizeQuery(query));
        }
        result.add("openQueries", openQueries);
        result.addProperty("readOnly", true);
        JsonObject support = probe.providerMetadataSupport();
        if (support.get("supported").getAsBoolean()) {
            JsonObject metadata = metadataGateway.fetch(payload);
            result.add("metadata", metadata);
            boolean available = metadata.get("available").getAsBoolean();
            journal.append("describeProvider", available ? "COMPLETED" : "DEGRADED",
                    available
                            ? "Read-only InfoProvider metadata loaded for " + provider
                            : "InfoProvider metadata unavailable: " + string(metadata, "reason"),
                    available ? VisualClass.GREEN : VisualClass.AMBER, false);
        } else {
            JsonObject metadata = new JsonObject();
            metadata.addProperty("available", false);
            metadata.addProperty("reason", "CAPABILITY_GATED");
            metadata.addProperty("instruction",
                    "The installed BWMT does not expose the probed metadata APIs; run bw_inspect_capabilities for details.");
            metadata.add("issues", support.getAsJsonArray("issues"));
            result.add("metadata", metadata);
            journal.append("describeProvider", "DEGRADED",
                    "InfoProvider metadata capability is gated off for this BWMT installation", VisualClass.AMBER, false);
        }
        return result;
    }

    private JsonObject createLocalDraft(JsonObject payload) {
        localDrafts.put(string(payload, "id"), payload.deepCopy());
        journal.append("createLocalDraft", "LOCAL_DRAFT", "Unsaved local draft created", VisualClass.VIOLET, false);
        return payload;
    }

    private JsonObject applySpecToDraft(JsonObject payload) {
        localDrafts.put(string(payload, "id"), payload.deepCopy());
        journal.append("applySpecToDraft", "LOCAL_DRAFT", "Unsaved local draft updated", VisualClass.VIOLET, false);
        return payload;
    }

    private JsonObject previewDraft(JsonObject payload) {
        openNativeQueryWizard();
        JsonObject result = new JsonObject();
        result.addProperty("previewScheduled", true);
        result.addProperty("saved", false);
        result.addProperty("instruction", "Use the native wizard for visual inspection. Do not finish it unless a separately prepared save is confirmed.");
        return result;
    }

    private JsonObject prepareNewQuerySave(JsonObject payload) {
        JsonObject binding = payload.getAsJsonObject("confirmationBinding");
        if (!payload.has("requiresEclipseHumanConfirmation") || !payload.get("requiresEclipseHumanConfirmation").getAsBoolean() || binding == null) {
            throw new IllegalArgumentException("Eclipse human confirmation binding is required");
        }
        Display.getDefault().asyncExec(() -> {
            var window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
            if (window == null) return;
            NewQueryConfirmationDialog dialog = new NewQueryConfirmationDialog(window.getShell(), binding);
            if (dialog.open() == Window.OK && dialog.requiresEclipseHumanConfirmation()) {
                journal.append("prepareNewQuerySave", "SAVE_PENDING_HUMAN",
                        "Human confirmed preparation; the native SAP wizard still requires a manual Finish action.", VisualClass.DARK_RED, false);
                openNativeQueryWizard();
            }
        });
        JsonObject result = new JsonObject();
        result.addProperty("confirmationScheduled", true);
        result.addProperty("saved", false);
        return result;
    }

    private void openNativeQueryWizard() {
        Display.getDefault().asyncExec(() -> {
            try {
                var window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
                var descriptor = PlatformUI.getWorkbench().getNewWizardRegistry().findWizard(QUERY_WIZARD);
                if (window == null || descriptor == null) return;
                IWizard wizard = descriptor.createWizard();
                if (wizard instanceof IWorkbenchWizard workbenchWizard) {
                    workbenchWizard.init(PlatformUI.getWorkbench(), StructuredSelection.EMPTY);
                }
                new WizardDialog(window.getShell(), wizard).open();
            } catch (Exception ignored) {
                journal.append("previewDraft", "BLOCKED", "BW Query wizard is unavailable", VisualClass.RED, true);
            }
        });
    }

    private List<Object> openQueries() {
        // Workbench window lookups return null off the UI thread, so the scan runs via syncExec.
        List<Object> queries = new ArrayList<>();
        Display.getDefault().syncExec(() -> {
            var window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
            if (window == null || window.getActivePage() == null) return;
            for (IEditorReference reference : window.getActivePage().getEditorReferences()) {
                try {
                    Object editor = reference.getEditor(false);
                    if (editor == null || !QUERY_EDITOR.equals(editor.getClass().getName())) continue;
                    Method getQuery = editor.getClass().getMethod("getQuery");
                    Object query = getQuery.invoke(editor);
                    if (query != null) queries.add(query);
                } catch (ReflectiveOperationException ignored) {
                    // An incompatible editor is excluded by the capability gate.
                }
            }
        });
        return queries;
    }

    private JsonObject summarizeQuery(Object query) {
        JsonObject summary = new JsonObject();
        summary.addProperty("found", true);
        summary.addProperty("technicalName", invokeString(query, "getTechnicalName"));
        summary.addProperty("provider", invokeString(query, "getProviderName"));
        summary.addProperty("modified", invokeBoolean(query, "isModified"));
        summary.addProperty("rows", invokeCollectionSize(query, "getRows"));
        summary.addProperty("columns", invokeCollectionSize(query, "getColumns"));
        summary.addProperty("free", invokeCollectionSize(query, "getFree"));
        summary.addProperty("readOnlyInspection", true);
        return summary;
    }

    private static String string(JsonObject object, String name) {
        return object != null && object.has(name) ? object.get(name).getAsString() : "";
    }

    private static String invokeString(Object target, String name) {
        Object value = invoke(target, name);
        return value == null ? "" : value.toString();
    }

    private static boolean invokeBoolean(Object target, String name) {
        Object value = invoke(target, name);
        return value instanceof Boolean booleanValue && booleanValue;
    }

    private static int invokeCollectionSize(Object target, String name) {
        Object value = invoke(target, name);
        return value instanceof java.util.Collection<?> collection ? collection.size() : -1;
    }

    private static Object invoke(Object target, String name) {
        try {
            return target.getClass().getMethod(name).invoke(target);
        } catch (ReflectiveOperationException exception) {
            return null;
        }
    }

}
