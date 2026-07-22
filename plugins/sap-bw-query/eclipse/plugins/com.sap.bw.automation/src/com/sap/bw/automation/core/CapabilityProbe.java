package com.sap.bw.automation.core;

import org.eclipse.core.runtime.Platform;
import org.eclipse.ui.PlatformUI;
import org.osgi.framework.Bundle;
import org.osgi.framework.Version;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public final class CapabilityProbe {
    private static final Version EXPECTED = new Version(1, 27, 36);
    private static final String QUERY_WIZARD_ID = "com.sap.bw.qd.QueryNewWizard";
    private static final String QUERY_FACTORY = "com.sap.bw.qd.model.query.QueryFactory";
    private static final String QUERY_PACKAGE = "com.sap.bw.qd.model.query.QueryPackage";
    private static final String CONNECTIVITY = "com.sap.bw.connectivity";
    private static final String PROJECT_UTIL = "com.sap.bw.connectivity.util.ProjectUtil";
    private static final String SERVICE_FACTORY = "com.sap.bw.connectivity.services.IServiceFactory";
    private static final String MD_SERVICE = "com.sap.bw.connectivity.services.IInfoProviderMDService";
    private static final String IPROV_MODEL_MANAGER = "com.sap.bw.connectivity.xml.iprov.InfoProviderModelManager";
    private static final String QUERY_EDITOR = "com.sap.bw.qd.ui.editor.QueryEditor";

    public JsonObject inspect() {
        JsonObject result = new JsonObject();
        JsonArray issues = new JsonArray();
        boolean model = exactBundle("com.sap.bw.qd.model", issues);
        boolean ui = exactBundle("com.sap.bw.qd.ui", issues);
        boolean factory = loadClass("com.sap.bw.qd.model", QUERY_FACTORY, issues);
        boolean wizard = PlatformUI.getWorkbench().getNewWizardRegistry().findWizard(QUERY_WIZARD_ID) != null;
        if (!wizard) issues.add("Expected BW Query wizard is unavailable");
        JsonObject metadata = providerMetadataSupport();
        for (var issue : metadata.getAsJsonArray("issues")) issues.add(issue);
        JsonObject populate = populateSupport();
        for (var issue : populate.getAsJsonArray("issues")) issues.add(issue);
        boolean populateSupported = model && ui && factory && wizard
                && populate.get("supported").getAsBoolean();
        result.addProperty("bwmtAvailable", model && ui && factory);
        result.addProperty("queryWizardAvailable", wizard);
        result.addProperty("readSupported", model && ui && factory);
        result.addProperty("modelReadSupported", modelReadSupport().get("supported").getAsBoolean());
        result.addProperty("localDraftSupported", model && ui && factory);
        result.addProperty("prepareNewQuerySaveSupported", model && ui && factory && wizard);
        result.addProperty("providerMetadataSupported", metadata.get("supported").getAsBoolean());
        result.addProperty("populateSupported", populateSupported);
        result.add("populateFeatures", populate.getAsJsonObject("features"));
        result.addProperty("deleteSupported", false);
        result.addProperty("overwriteSupported", false);
        result.add("issues", issues);
        return result;
    }

    /**
     * Bundle-and-signature checks only (no workbench access), safe on any thread.
     * Proves the exact reflective surface ProviderMetadataGateway binds to.
     */
    public JsonObject providerMetadataSupport() {
        JsonObject result = new JsonObject();
        JsonArray issues = new JsonArray();
        boolean connectivity = exactBundle(CONNECTIVITY, issues);
        boolean projectUtil = connectivity
                && hasMethod(CONNECTIVITY, PROJECT_UTIL, "getProject", issues, String.class)
                && hasMethod(CONNECTIVITY, PROJECT_UTIL, "getDestinationID", issues,
                        org.eclipse.core.resources.IProject.class);
        boolean mdService = connectivity
                && hasField(CONNECTIVITY, SERVICE_FACTORY, "INSTANCE", issues)
                && hasMethod(CONNECTIVITY, SERVICE_FACTORY, "getInfoProviderMDService", issues, String.class)
                && hasMethod(CONNECTIVITY, MD_SERVICE, "getMetadata", issues, String.class, String.class)
                && hasMethod(CONNECTIVITY, MD_SERVICE, "getCharacteristics", issues)
                && hasMethod(CONNECTIVITY, MD_SERVICE, "getKeyFigures", issues);
        boolean iprovModel = connectivity
                && hasConstructor(CONNECTIVITY, IPROV_MODEL_MANAGER, issues, String.class)
                && hasMethod(CONNECTIVITY, IPROV_MODEL_MANAGER, "loadInfoProvider", issues,
                        String.class, int.class, boolean.class, boolean.class);
        result.addProperty("supported", connectivity && projectUtil && (mdService || iprovModel));
        result.addProperty("mdServicePath", mdService);
        result.addProperty("iprovModelPath", iprovModel);
        result.add("issues", issues);
        return result;
    }

    /**
     * Proves the EMF metamodel and editor accessors QueryModelBuilder and
     * QueryEditorGateway bind to. Bundle/class checks only, safe on any thread.
     */
    public JsonObject populateSupport() {
        JsonObject result = new JsonObject();
        JsonArray issues = new JsonArray();
        JsonObject features = new JsonObject();
        boolean queryPackage = loadClass("com.sap.bw.qd.model", QUERY_PACKAGE, issues)
                && hasField("com.sap.bw.qd.model", QUERY_PACKAGE, "eINSTANCE", issues);
        boolean editor = hasMethod("com.sap.bw.qd.ui", QUERY_EDITOR, "getQuery", issues);
        boolean editingDomain = hasMethod("com.sap.bw.qd.ui", QUERY_EDITOR, "getEditingDomain", issues);
        boolean transactions = Platform.getBundle("org.eclipse.emf.transaction") != null;
        if (!transactions) issues.add("org.eclipse.emf.transaction is unavailable");
        boolean bwcore = exactBundle("com.sap.bw.model.core", issues);
        features.addProperty("queryPackage", queryPackage);
        features.addProperty("queryEditorAccess", editor);
        features.addProperty("editingDomain", editingDomain);
        features.addProperty("transactionalDomain", transactions);
        features.addProperty("bwCoreModel", bwcore);
        result.addProperty("supported", queryPackage && editor && editingDomain && transactions && bwcore);
        result.add("features", features);
        result.add("issues", issues);
        return result;
    }

    /**
     * Proves the lighter surface the read-only deep query model reader binds to: an
     * introspectable QueryPackage and the QueryEditor#getQuery accessor. Bundle/class checks
     * only, safe on any thread. Strictly weaker than populateSupport (no editing domain or
     * transactional write path), so a read can be gated on even when population is not.
     */
    public JsonObject modelReadSupport() {
        JsonObject result = new JsonObject();
        JsonArray issues = new JsonArray();
        boolean queryPackage = loadClass("com.sap.bw.qd.model", QUERY_PACKAGE, issues)
                && hasField("com.sap.bw.qd.model", QUERY_PACKAGE, "eINSTANCE", issues);
        boolean editor = hasMethod("com.sap.bw.qd.ui", QUERY_EDITOR, "getQuery", issues);
        result.addProperty("supported", queryPackage && editor);
        result.add("issues", issues);
        return result;
    }

    private boolean exactBundle(String symbolicName, JsonArray issues) {
        Bundle bundle = Platform.getBundle(symbolicName);
        if (bundle == null || !EXPECTED.equals(bundle.getVersion())) {
            issues.add(symbolicName + " must be exactly 1.27.36");
            return false;
        }
        return true;
    }

    private boolean loadClass(String bundleName, String className, JsonArray issues) {
        Bundle bundle = Platform.getBundle(bundleName);
        if (bundle == null) return false;
        try {
            bundle.loadClass(className);
            return true;
        } catch (ClassNotFoundException exception) {
            issues.add(className + " is unavailable");
            return false;
        }
    }

    private boolean hasMethod(String bundleName, String className, String methodName, JsonArray issues, Class<?>... parameterTypes) {
        Bundle bundle = Platform.getBundle(bundleName);
        if (bundle == null) return false;
        try {
            bundle.loadClass(className).getMethod(methodName, parameterTypes);
            return true;
        } catch (ClassNotFoundException | NoSuchMethodException exception) {
            issues.add(className + "#" + methodName + " signature is unavailable");
            return false;
        }
    }

    private boolean hasField(String bundleName, String className, String fieldName, JsonArray issues) {
        Bundle bundle = Platform.getBundle(bundleName);
        if (bundle == null) return false;
        try {
            bundle.loadClass(className).getField(fieldName);
            return true;
        } catch (ClassNotFoundException | NoSuchFieldException exception) {
            issues.add(className + "." + fieldName + " is unavailable");
            return false;
        }
    }

    private boolean hasConstructor(String bundleName, String className, JsonArray issues, Class<?>... parameterTypes) {
        Bundle bundle = Platform.getBundle(bundleName);
        if (bundle == null) return false;
        try {
            bundle.loadClass(className).getConstructor(parameterTypes);
            return true;
        } catch (ClassNotFoundException | NoSuchMethodException exception) {
            issues.add(className + " constructor signature is unavailable");
            return false;
        }
    }
}
