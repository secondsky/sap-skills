package com.sap.bw.automation.core;

import com.google.gson.JsonObject;

/**
 * Standalone (plain-Java, no OSGi/eclipsec) entry point for the reflective builder/reader
 * round-trip smoke. This is the CI-friendly harness: it runs {@link SmokeApplication.RoundTrip}
 * directly on a curated classpath of the BWMT model jars, prints the same {@code {"smoke":...}}
 * JSON line, and exits 0 on PASS / 1 otherwise. It avoids the full Eclipse product launch,
 * whose headless start is slow and environment-sensitive; the model round-trip itself needs
 * only the EMF + BWMT model bundles on the classpath, not the OSGi runtime.
 */
public final class StandaloneSmoke {
    private StandaloneSmoke() {
    }

    public static void main(String[] args) {
        JsonObject result;
        try {
            result = SmokeApplication.RoundTrip.run();
        } catch (Throwable failure) {
            result = new JsonObject();
            result.addProperty("smoke", "FAIL");
            result.addProperty("error", failure.getClass().getSimpleName() + ": " + failure.getMessage());
        }
        System.out.println(result.toString());
        boolean passed = result.has("smoke") && "PASS".equals(result.get("smoke").getAsString());
        System.exit(passed ? 0 : 1);
    }
}
