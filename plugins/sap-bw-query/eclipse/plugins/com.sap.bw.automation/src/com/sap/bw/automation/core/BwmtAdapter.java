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
            case "projectCreateOrOpen" -> projectCreateOrOpen(payload);
            case "createLocalDraft" -> createLocalDraft(payload);
            case "applySpecToDraft" -> applySpecToDraft(payload);
            case "previewDraft" -> previewDraft(payload);
            case "prepareNewQuerySave" -> prepareNewQuerySave(payload);
            default -> throw new IllegalArgumentException("Method is not allow-listed");
        };
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
        List<Object> queries = new ArrayList<>();
        var window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
        if (window == null || window.getActivePage() == null) return queries;
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
