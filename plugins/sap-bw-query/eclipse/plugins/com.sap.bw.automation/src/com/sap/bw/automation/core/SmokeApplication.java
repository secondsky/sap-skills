package com.sap.bw.automation.core;

import org.eclipse.core.runtime.Platform;
import org.eclipse.equinox.app.IApplication;
import org.eclipse.equinox.app.IApplicationContext;
import org.osgi.framework.Bundle;
import org.osgi.framework.Version;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sap.bw.qd.model.query.Query;
import com.sap.bw.qd.model.query.QueryFactory;

/**
 * Headless offline round-trip smoke for the reflective BWMT builder/reader. It builds an
 * in-memory {@link Query} from an embedded QuerySpec fixture with {@link QueryModelBuilder}
 * (a plain EMF object, no editing domain and no workbench), reads it back with
 * {@link QueryModelReader}, and asserts the model that comes out still describes what went in.
 *
 * <p>Strictly headless: it never touches PlatformUI, Display, or the workbench. It is
 * registered as an Eclipse {@link IApplication} (id {@code com.sap.bw.automation.smoke}) so a
 * CI job can run it through {@code eclipsec.exe -application ...} against the deployed bundle
 * and fail the build if the reflective surface regresses.
 *
 * <p>The smoke is only meaningful inside the full bundle where the BWMT 1.27.36 model surface
 * is present. When that surface is unavailable it prints a {@code {"smoke":"SKIPPED"}} line and
 * exits 0. The model-typed round-trip lives in the nested {@link RoundTrip} class so this
 * gate returns before any {@code com.sap.bw.qd.model} class is loaded when BWMT is absent.
 */
public final class SmokeApplication implements IApplication {
    private static final Version EXPECTED = new Version(1, 27, 36);
    private static final String MODEL_BUNDLE = "com.sap.bw.qd.model";
    private static final String QUERY_FACTORY = "com.sap.bw.qd.model.query.QueryFactory";

    @Override
    public Object start(IApplicationContext context) {
        String unavailable = modelSurfaceUnavailableReason();
        if (unavailable != null) {
            JsonObject skipped = new JsonObject();
            skipped.addProperty("smoke", "SKIPPED");
            skipped.addProperty("reason", unavailable);
            System.out.println(skipped.toString());
            return IApplication.EXIT_OK;
        }
        JsonObject result;
        try {
            result = RoundTrip.run();
        } catch (Throwable failure) {
            result = new JsonObject();
            result.addProperty("smoke", "FAIL");
            result.addProperty("error", failure.getClass().getSimpleName() + ": " + failure.getMessage());
        }
        System.out.println(result.toString());
        JsonElement verdict = result.get("smoke");
        boolean passed = verdict != null && "PASS".equals(verdict.getAsString());
        return passed ? IApplication.EXIT_OK : Integer.valueOf(1);
    }

    @Override
    public void stop() {
        // One-shot headless application; there is nothing to unwind.
    }

    /**
     * Mirrors the CapabilityProbe model-surface check without any workbench access: the
     * {@code com.sap.bw.qd.model} bundle must be present at exactly 1.27.36 and expose a
     * loadable QueryFactory. Returns a human reason when unavailable, or {@code null} when the
     * surface is present. Uses only Platform/OSGi APIs, so it is safe on any thread and pulls
     * in no {@code com.sap.bw.qd.model} class.
     */
    private static String modelSurfaceUnavailableReason() {
        Bundle bundle = Platform.getBundle(MODEL_BUNDLE);
        if (bundle == null) {
            return MODEL_BUNDLE + " bundle is not present";
        }
        if (!EXPECTED.equals(bundle.getVersion())) {
            return MODEL_BUNDLE + " must be exactly 1.27.36 but was " + bundle.getVersion();
        }
        try {
            bundle.loadClass(QUERY_FACTORY);
        } catch (Throwable failure) {
            return QUERY_FACTORY + " is not loadable (" + failure.getClass().getSimpleName() + ")";
        }
        return null;
    }

    /**
     * Isolates every {@code com.sap.bw.qd.model} reference. This class is only loaded once
     * {@link #run()} is invoked, which the {@link SmokeApplication#start} gate reaches only
     * after the model surface is proven present.
     */
    static final class RoundTrip {
        static JsonObject run() {
            JsonArray failures = new JsonArray();

            Query query = QueryFactory.eINSTANCE.createQuery();
            query.setTechnicalName("Z_SMOKE_ROUNDTRIP");

            JsonObject spec = buildFixture();
            JsonArray applyReport = new QueryModelBuilder().apply(query, spec);
            JsonObject model = new QueryModelReader().read(query);

            // 1. The builder must not have hard-failed on any element.
            int failedApply = 0;
            for (JsonElement element : applyReport) {
                if ("FAILED".equals(str(element.getAsJsonObject(), "status"))) failedApply++;
            }
            if (failedApply != 0) {
                failures.add("apply report contains " + failedApply + " FAILED entries: " + applyReport.toString());
            }

            JsonObject axes = model.getAsJsonObject("axes");

            // 2. Rows carry the 0CUSTOMER characteristic.
            JsonArray rows = axes.getAsJsonArray("rows");
            boolean rowCustomer = false;
            for (JsonElement element : rows) {
                JsonObject row = element.getAsJsonObject();
                if ("characteristic".equals(str(row, "kind")) && "0CUSTOMER".equals(str(row, "infoObjectName"))) {
                    rowCustomer = true;
                }
            }
            if (!rowCustomer) failures.add("rows do not contain characteristic 0CUSTOMER");

            // 3. Some columns structure member carries a restriction group on 0REGION. The
            // measure selection itself sits in a separate group (0NETSALES, selectionType
            // KEY_FIGURE); the 0REGION group is the restriction that survived the round-trip.
            JsonArray columns = axes.getAsJsonArray("columns");
            int columnsStructures = 0;
            boolean regionRestriction = false;
            boolean keyFigureSelectionGroup = false;
            for (JsonElement element : columns) {
                JsonObject column = element.getAsJsonObject();
                if (!"structure".equals(str(column, "kind"))) continue;
                columnsStructures++;
                for (JsonElement memberElement : arr(column, "members")) {
                    for (JsonElement groupElement : arr(memberElement.getAsJsonObject(), "groups")) {
                        JsonObject group = groupElement.getAsJsonObject();
                        if ("0REGION".equals(str(group, "infoObject"))) regionRestriction = true;
                        for (JsonElement tokenElement : arr(group, "tokens")) {
                            if ("KEY_FIGURE".equals(str(tokenElement.getAsJsonObject(), "selectionType"))) {
                                keyFigureSelectionGroup = true;
                            }
                        }
                    }
                }
            }
            if (!regionRestriction) failures.add("no columns structure member carries a restriction group on 0REGION");

            // 4. The 0CALMONTH filter selection round-tripped.
            JsonArray selections = model.getAsJsonObject("filter").getAsJsonArray("selections");
            boolean filterCalmonth = false;
            for (JsonElement element : selections) {
                if ("0CALMONTH".equals(str(element.getAsJsonObject(), "infoObject"))) filterCalmonth = true;
            }
            if (!filterCalmonth) failures.add("filter selections do not contain 0CALMONTH");

            // 5. Zero suppression for rows is set.
            boolean zeroSuppressionRows = false;
            JsonElement zeroSuppression = model.getAsJsonObject("settings").get("zeroSuppression");
            if (zeroSuppression != null && zeroSuppression.isJsonObject()) {
                JsonElement zsRows = zeroSuppression.getAsJsonObject().get("rows");
                zeroSuppressionRows = zsRows != null && zsRows.isJsonPrimitive() && zsRows.getAsBoolean();
            }
            if (!zeroSuppressionRows) failures.add("settings.zeroSuppression.rows is not true");

            // 6. Conditions/exceptions in the model match the APPLIED entries. SKIPPED_UNSUPPORTED
            // is tolerated (the count drops for both sides); FAILED is already caught by check 1.
            int conditionsApplied = appliedCount(applyReport, "conditions[");
            int exceptionsApplied = appliedCount(applyReport, "exceptions[");
            int conditionsModel = model.getAsJsonArray("conditions").size();
            int exceptionsModel = model.getAsJsonArray("exceptions").size();
            if (conditionsModel != conditionsApplied) {
                failures.add("conditions size " + conditionsModel + " does not match applied count " + conditionsApplied);
            }
            if (exceptionsModel != exceptionsApplied) {
                failures.add("exceptions size " + exceptionsModel + " does not match applied count " + exceptionsApplied);
            }

            // 7. The serializer may report issues, but never for the rows characteristic element.
            JsonArray issues = model.getAsJsonArray("serializationIssues");
            for (JsonElement element : issues) {
                String issue = element.getAsString();
                if (issue.contains("rows[")) {
                    failures.add("serialization issue on a rows element: " + issue);
                }
            }

            JsonObject result = new JsonObject();
            result.addProperty("smoke", failures.size() == 0 ? "PASS" : "FAIL");
            result.addProperty("technicalName", str(model, "technicalName"));
            result.addProperty("failedApplyEntries", failedApply);
            result.addProperty("rowElements", rows.size());
            result.addProperty("columnsStructures", columnsStructures);
            result.addProperty("regionRestrictionPresent", regionRestriction);
            result.addProperty("keyFigureSelectionGroupPresent", keyFigureSelectionGroup);
            result.addProperty("filterCalmonthPresent", filterCalmonth);
            result.addProperty("zeroSuppressionRows", zeroSuppressionRows);
            result.addProperty("conditionsApplied", conditionsApplied);
            result.addProperty("conditionsModel", conditionsModel);
            result.addProperty("exceptionsApplied", exceptionsApplied);
            result.addProperty("exceptionsModel", exceptionsModel);
            result.add("serializationIssues", issues);
            result.add("failures", failures);
            return result;
        }

        private static JsonObject buildFixture() {
            JsonObject spec = new JsonObject();

            JsonObject axes = new JsonObject();
            JsonArray rows = new JsonArray();
            rows.add(axisElement("0CUSTOMER", "characteristic"));
            axes.add("rows", rows);
            JsonArray columns = new JsonArray();
            columns.add(axisElement("ZRK_DE", "keyFigure"));
            axes.add("columns", columns);
            spec.add("axes", axes);

            JsonArray keyFigures = new JsonArray();
            JsonObject restrictedKeyFigure = new JsonObject();
            restrictedKeyFigure.addProperty("technicalName", "ZRK_DE");
            restrictedKeyFigure.addProperty("kind", "restricted");
            restrictedKeyFigure.addProperty("baseKeyFigure", "0NETSALES");
            JsonArray restrictions = new JsonArray();
            JsonObject restriction = new JsonObject();
            restriction.addProperty("characteristic", "0REGION");
            restriction.addProperty("operator", "EQUAL");
            JsonArray values = new JsonArray();
            values.add("DE");
            restriction.add("values", values);
            restrictions.add(restriction);
            restrictedKeyFigure.add("restrictions", restrictions);
            keyFigures.add(restrictedKeyFigure);
            spec.add("keyFigures", keyFigures);

            JsonArray filters = new JsonArray();
            JsonObject filter = new JsonObject();
            filter.addProperty("characteristic", "0CALMONTH");
            filter.addProperty("operator", "EQ");
            filter.addProperty("value", "202601");
            filters.add(filter);
            spec.add("filters", filters);

            JsonObject display = new JsonObject();
            JsonObject zeroSuppression = new JsonObject();
            zeroSuppression.addProperty("rows", true);
            zeroSuppression.addProperty("mode", "FOR_ALL_VALUES");
            display.add("zeroSuppression", zeroSuppression);
            spec.add("display", display);

            JsonArray conditions = new JsonArray();
            JsonObject condition = new JsonObject();
            condition.addProperty("keyFigure", "ZRK_DE");
            condition.addProperty("operator", "TOP_N");
            condition.addProperty("threshold", 10);
            conditions.add(condition);
            spec.add("conditions", conditions);

            JsonArray exceptions = new JsonArray();
            JsonObject exception = new JsonObject();
            exception.addProperty("keyFigure", "ZRK_DE");
            exception.addProperty("alertLevel", "BAD1");
            exception.addProperty("operator", "LESS_THAN");
            exception.addProperty("threshold", 0);
            exceptions.add(exception);
            spec.add("exceptions", exceptions);

            return spec;
        }

        private static JsonObject axisElement(String technicalName, String kind) {
            JsonObject element = new JsonObject();
            element.addProperty("technicalName", technicalName);
            element.addProperty("kind", kind);
            return element;
        }

        private static int appliedCount(JsonArray report, String pathPrefix) {
            int count = 0;
            for (JsonElement element : report) {
                JsonObject entry = element.getAsJsonObject();
                String path = str(entry, "path");
                if (path != null && path.startsWith(pathPrefix) && "APPLIED".equals(str(entry, "status"))) count++;
            }
            return count;
        }

        private static JsonArray arr(JsonObject object, String name) {
            JsonElement element = object.get(name);
            return element != null && element.isJsonArray() ? element.getAsJsonArray() : new JsonArray();
        }

        private static String str(JsonObject object, String name) {
            JsonElement element = object.get(name);
            return element != null && element.isJsonPrimitive() ? element.getAsString() : null;
        }
    }
}
