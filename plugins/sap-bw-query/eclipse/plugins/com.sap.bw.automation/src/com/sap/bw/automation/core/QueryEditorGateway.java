package com.sap.bw.automation.core;

import java.lang.reflect.Method;

import org.eclipse.emf.transaction.RecordingCommand;
import org.eclipse.emf.transaction.TransactionalEditingDomain;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IEditorReference;
import org.eclipse.ui.PlatformUI;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sap.bw.qd.model.query.AbstractDimension;
import com.sap.bw.qd.model.query.CustomDimension;
import com.sap.bw.qd.model.query.Query;

/**
 * Locates the wizard-created, still-unsaved query editor that matches the confirmed
 * draft binding and populates its model from the draft. Refuses any editor that is
 * read-only, has a different technical name, or already carries query content — an
 * existing query is never modified. Saving stays with the human.
 */
public final class QueryEditorGateway {
    private static final String QUERY_EDITOR = "com.sap.bw.qd.ui.editor.QueryEditor";
    private final StepJournal journal;

    public QueryEditorGateway(StepJournal journal) {
        this.journal = journal;
    }

    public JsonObject populate(JsonObject payload) {
        JsonObject binding = payload.getAsJsonObject("confirmationBinding");
        JsonObject spec = payload.getAsJsonObject("spec");
        if (binding == null || spec == null || !binding.has("technicalName") || !binding.has("specHash")) {
            throw new IllegalArgumentException("Draft binding with technicalName and specHash is required");
        }
        String technicalName = binding.get("technicalName").getAsString();
        JsonObject result = new JsonObject();
        result.addProperty("saved", false);
        Display.getDefault().syncExec(() -> {
            Object editor = findOpenEditor(technicalName);
            if (editor == null) {
                result.addProperty("populated", false);
                result.addProperty("userActionRequired", true);
                result.addProperty("instruction", "No unsaved query editor named " + technicalName
                        + " is open. Confirm the prepared save, finish the native SAP wizard, then retry.");
                return;
            }
            if (isTrue(editor, "isReadOnly")) {
                result.addProperty("populated", false);
                result.addProperty("instruction", "The editor for " + technicalName + " is read-only; population is refused.");
                return;
            }
            Query query = queryOf(editor);
            if (query == null) {
                result.addProperty("populated", false);
                result.addProperty("userActionRequired", true);
                result.addProperty("instruction", "The query model is still loading; retry once the editor is ready.");
                return;
            }
            if (hasContent(query)) {
                result.addProperty("populated", false);
                result.addProperty("instruction", "The query " + technicalName
                        + " already has content; existing queries are never modified. Use a brand-new technical name.");
                journal.append("populateQueryEditor", "BLOCKED",
                        "Population refused: " + technicalName + " is not an empty brand-new query", VisualClass.RED, true);
                return;
            }
            QueryModelBuilder builder = new QueryModelBuilder();
            JsonArray report = runInEditingDomain(editor, () -> builder.apply(query, spec));
            result.addProperty("populated", true);
            result.add("applyReport", report);
        });
        if (result.has("applyReport")) {
            JsonArray report = result.getAsJsonArray("applyReport");
            int applied = 0, skipped = 0, failed = 0;
            for (var element : report) {
                switch (element.getAsJsonObject().get("status").getAsString()) {
                    case "APPLIED" -> applied++;
                    case "SKIPPED_UNSUPPORTED" -> skipped++;
                    default -> failed++;
                }
            }
            result.addProperty("instruction", failed > 0
                    ? "Some elements FAILED; review the apply report and the editor, and close without saving if the result is wrong."
                    : skipped > 0
                            ? "Some elements were skipped; complete them manually in the editor, review everything, then save yourself."
                            : "Review the populated query in the editor and press Save yourself; the automation never saves.");
            journal.append("populateQueryEditor", failed > 0 ? "DEGRADED" : "LOCAL_DRAFT",
                    "Editor populated for " + technicalName + " (" + applied + " applied, " + skipped + " skipped, "
                            + failed + " failed); save stays manual",
                    failed > 0 ? VisualClass.AMBER : VisualClass.VIOLET, false);
        }
        return result;
    }

    private JsonArray runInEditingDomain(Object editor, java.util.function.Supplier<JsonArray> application) {
        Object domain = invoke(editor, "getEditingDomain");
        if (domain instanceof TransactionalEditingDomain transactional) {
            final JsonArray[] holder = new JsonArray[1];
            transactional.getCommandStack().execute(new RecordingCommand(transactional, "BW Automation draft population") {
                @Override
                protected void doExecute() {
                    holder[0] = application.get();
                }
            });
            return holder[0] != null ? holder[0] : new JsonArray();
        }
        return application.get();
    }

    /**
     * Shared read-only scan of the open BW Query Designer editors for the one whose live
     * query technical name matches (case-insensitive). Must run on the SWT display thread
     * (workbench-window lookups return null off it). Used by both the populate flow and the
     * deep read path so there is a single editor-lookup code path.
     */
    static Object findOpenEditor(String technicalName) {
        var window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
        if (window == null || window.getActivePage() == null) return null;
        for (IEditorReference reference : window.getActivePage().getEditorReferences()) {
            Object editor = reference.getEditor(false);
            if (editor == null || !QUERY_EDITOR.equals(editor.getClass().getName())) continue;
            Query query = queryOf(editor);
            if (query != null && technicalName.equalsIgnoreCase(query.getTechnicalName())) return editor;
        }
        return null;
    }

    static Query queryOf(Object editor) {
        Object query = invoke(editor, "getQuery");
        return query instanceof Query typed ? typed : null;
    }

    /**
     * Serializes the open, name-matching query's complete model to the deep-read JSON
     * contract. Read-only: it never mutates the model, opens the editing domain, or saves.
     * Runs the editor scan and the serialization together on the SWT display thread. When
     * no matching editor is open it returns {@code found:false} with a user instruction.
     */
    public static JsonObject readModel(JsonObject payload) {
        String technicalName = payload != null && payload.has("technicalName") && !payload.get("technicalName").isJsonNull()
                ? payload.get("technicalName").getAsString() : "";
        JsonObject result = new JsonObject();
        Display.getDefault().syncExec(() -> {
            Object editor = findOpenEditor(technicalName);
            if (editor == null) {
                notOpen(result);
                return;
            }
            Query query = queryOf(editor);
            if (query == null) {
                result.addProperty("found", false);
                result.addProperty("userActionRequired", true);
                result.addProperty("instruction", "The query model is still loading; retry once the editor is ready.");
                return;
            }
            JsonObject model = new QueryModelReader().read(query);
            for (var entry : model.entrySet()) result.add(entry.getKey(), entry.getValue());
        });
        if (!result.has("found")) notOpen(result);
        return result;
    }

    private static void notOpen(JsonObject result) {
        result.addProperty("found", false);
        result.addProperty("userActionRequired", true);
        result.addProperty("instruction", "Open the query read-only in BW Query Designer, then retry.");
    }

    private static boolean hasContent(Query query) {
        return axisHasContent(query.getRows()) || axisHasContent(query.getColumns()) || axisHasContent(query.getFree())
                || !query.getConditions().isEmpty() || !query.getExceptions().isEmpty();
    }

    private static boolean axisHasContent(java.util.List<? extends AbstractDimension> axis) {
        for (AbstractDimension element : axis) {
            if (element instanceof CustomDimension custom) {
                if (!custom.getMembers().isEmpty()) return true;
            } else {
                // Any characteristic or other dimension means the query is not brand-new.
                return true;
            }
        }
        return false;
    }

    private static boolean isTrue(Object target, String method) {
        Object value = invoke(target, method);
        return value instanceof Boolean flag && flag;
    }

    private static Object invoke(Object target, String name) {
        try {
            Method method = target.getClass().getMethod(name);
            return method.invoke(target);
        } catch (ReflectiveOperationException exception) {
            return null;
        }
    }
}
