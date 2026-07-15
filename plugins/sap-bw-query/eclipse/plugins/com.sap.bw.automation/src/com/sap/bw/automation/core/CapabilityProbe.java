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

    public JsonObject inspect() {
        JsonObject result = new JsonObject();
        JsonArray issues = new JsonArray();
        boolean model = exactBundle("com.sap.bw.qd.model", issues);
        boolean ui = exactBundle("com.sap.bw.qd.ui", issues);
        boolean factory = loadClass("com.sap.bw.qd.model", QUERY_FACTORY, issues);
        boolean wizard = PlatformUI.getWorkbench().getNewWizardRegistry().findWizard(QUERY_WIZARD_ID) != null;
        if (!wizard) issues.add("Expected BW Query wizard is unavailable");
        result.addProperty("bwmtAvailable", model && ui && factory);
        result.addProperty("queryWizardAvailable", wizard);
        result.addProperty("readSupported", model && ui && factory);
        result.addProperty("localDraftSupported", model && ui && factory);
        result.addProperty("prepareNewQuerySaveSupported", model && ui && factory && wizard);
        result.addProperty("deleteSupported", false);
        result.addProperty("overwriteSupported", false);
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
}
