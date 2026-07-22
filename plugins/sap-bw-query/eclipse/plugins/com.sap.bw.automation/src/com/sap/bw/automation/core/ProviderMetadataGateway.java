package com.sap.bw.automation.core;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.List;

import org.eclipse.core.runtime.Platform;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.osgi.framework.Bundle;

/**
 * Read-only InfoProvider metadata acquisition against the BWMT connectivity bundle.
 * Every BWMT type is resolved reflectively per references/bwmt-api-map.md; any failure
 * degrades to a structured {@code available:false} result and never throws to the bridge.
 */
public final class ProviderMetadataGateway {
    private static final String CONNECTIVITY_BUNDLE = "com.sap.bw.connectivity";
    private static final String PROJECT_UTIL = "com.sap.bw.connectivity.util.ProjectUtil";
    private static final String SERVICE_FACTORY = "com.sap.bw.connectivity.services.IServiceFactory";
    private static final String MD_SERVICE = "com.sap.bw.connectivity.services.IInfoProviderMDService";
    private static final String INFO_OBJECT_DETAILS = "com.sap.bw.connectivity.util.InfoObjectDetails";
    private static final String COMM_EXCEPTION = "com.sap.bw.connectivity.util.CommException";
    private static final String IPROV_MODEL_MANAGER = "com.sap.bw.connectivity.xml.iprov.InfoProviderModelManager";

    public JsonObject fetch(JsonObject payload) {
        String project = string(payload, "project");
        String provider = string(payload, "provider");
        String providerType = payload.has("providerType") ? string(payload, "providerType") : "";
        JsonArray attempts = new JsonArray();
        Bundle connectivity = Platform.getBundle(CONNECTIVITY_BUNDLE);
        if (connectivity == null) {
            return unavailable(provider, "API_MISMATCH", "The BWMT connectivity bundle is not installed.", attempts);
        }
        String destination;
        try {
            destination = resolveDestination(connectivity, project);
        } catch (ReflectiveOperationException | RuntimeException exception) {
            attempts.add(attempt("resolveDestination", exception));
            return unavailable(provider, "NO_BW_PROJECT",
                    "Open or create the BW project with the native SAP wizard, then retry.", attempts);
        }
        if (destination == null || destination.isBlank()) {
            return unavailable(provider, "NO_BW_PROJECT",
                    "The Eclipse project has no BW destination. Open or create the BW project first.", attempts);
        }
        try {
            JsonObject viaService = fetchViaMdService(connectivity, destination, provider, providerType);
            viaService.addProperty("source", "mdservice");
            viaService.add("attempts", attempts);
            return viaService;
        } catch (InvocationTargetException exception) {
            attempts.add(attempt("mdservice", exception.getCause() == null ? exception : exception.getCause()));
        } catch (ReflectiveOperationException | RuntimeException exception) {
            attempts.add(attempt("mdservice", exception));
        }
        try {
            JsonObject viaModel = fetchViaIprovModel(connectivity, destination, provider, providerType);
            viaModel.addProperty("source", "iprov");
            viaModel.add("attempts", attempts);
            return viaModel;
        } catch (InvocationTargetException exception) {
            attempts.add(attempt("iprov", exception.getCause() == null ? exception : exception.getCause()));
        } catch (ReflectiveOperationException | RuntimeException exception) {
            attempts.add(attempt("iprov", exception));
        }
        boolean offline = false;
        for (var element : attempts) {
            if (element.isJsonObject() && element.getAsJsonObject().has("commException")
                    && element.getAsJsonObject().get("commException").getAsBoolean()) {
                offline = true;
            }
        }
        return unavailable(provider,
                offline ? "OFFLINE_OR_UNAUTHENTICATED" : "API_MISMATCH",
                offline
                        ? "Log on to the BW system in Eclipse (native SAP login dialog only), then retry."
                        : "The installed BWMT version does not expose the probed metadata APIs; see attempts.",
                attempts);
    }

    private String resolveDestination(Bundle connectivity, String projectName) throws ReflectiveOperationException {
        Class<?> projectUtil = connectivity.loadClass(PROJECT_UTIL);
        Object project = projectUtil.getMethod("getProject", String.class).invoke(null, projectName);
        if (project == null) return null;
        Object destination = projectUtil
                .getMethod("getDestinationID", org.eclipse.core.resources.IProject.class)
                .invoke(null, project);
        return destination == null ? null : destination.toString();
    }

    private JsonObject fetchViaMdService(Bundle connectivity, String destination, String provider, String providerType)
            throws ReflectiveOperationException {
        Class<?> factoryType = connectivity.loadClass(SERVICE_FACTORY);
        Object factory = factoryType.getField("INSTANCE").get(null);
        Object service = factoryType.getMethod("getInfoProviderMDService", String.class).invoke(factory, destination);
        Class<?> serviceType = connectivity.loadClass(MD_SERVICE);
        try {
            serviceType.getMethod("getMetadata", String.class, String.class).invoke(service, provider, providerType);
            List<?> characteristics = (List<?>) serviceType.getMethod("getCharacteristics").invoke(service);
            List<?> keyFigures = (List<?>) serviceType.getMethod("getKeyFigures").invoke(service);
            Class<?> detailsType = connectivity.loadClass(INFO_OBJECT_DETAILS);
            JsonObject result = new JsonObject();
            result.addProperty("available", true);
            result.addProperty("provider", provider);
            result.add("characteristics", detailsArray(detailsType, characteristics));
            result.add("keyFigures", detailsArray(detailsType, keyFigures));
            return result;
        } finally {
            try {
                serviceType.getMethod("releaseBuffers").invoke(service);
            } catch (ReflectiveOperationException | RuntimeException ignored) {
                // Buffer release is best-effort; the service instance is request-scoped.
            }
        }
    }

    private JsonArray detailsArray(Class<?> detailsType, List<?> items) throws ReflectiveOperationException {
        JsonArray array = new JsonArray();
        if (items == null) return array;
        Field name = detailsType.getField("name");
        Field description = detailsType.getField("description");
        Field iobjType = detailsType.getField("iobjType");
        Field dimension = detailsType.getField("dimension");
        for (Object item : items) {
            if (item == null) continue;
            JsonObject entry = new JsonObject();
            entry.addProperty("name", asString(name.get(item)));
            entry.addProperty("description", asString(description.get(item)));
            entry.addProperty("infoObjectType", asString(iobjType.get(item)));
            entry.addProperty("dimensionName", asString(dimension.get(item)));
            array.add(entry);
        }
        return array;
    }

    private JsonObject fetchViaIprovModel(Bundle connectivity, String destination, String provider, String providerType)
            throws ReflectiveOperationException {
        Class<?> managerType = connectivity.loadClass(IPROV_MODEL_MANAGER);
        Object manager = managerType.getConstructor(String.class).newInstance(providerType);
        managerType.getMethod("setDestinationId", String.class).invoke(manager, destination);
        Object infoProvider = managerType
                .getMethod("loadInfoProvider", String.class, int.class, boolean.class, boolean.class)
                .invoke(manager, provider, 0, true, true);
        if (infoProvider == null) throw new IllegalStateException("loadInfoProvider returned no model");
        JsonObject result = new JsonObject();
        result.addProperty("available", true);
        result.addProperty("provider", provider);
        JsonArray dimensions = new JsonArray();
        Iterator<?> dimensionIterator = (Iterator<?>) infoProvider.getClass()
                .getMethod("getDimensionIterator").invoke(infoProvider);
        while (dimensionIterator != null && dimensionIterator.hasNext()) {
            Object dimension = dimensionIterator.next();
            JsonObject entry = new JsonObject();
            entry.addProperty("name", invokeString(dimension, "getName"));
            entry.addProperty("description", invokeString(dimension, "getDescription"));
            dimensions.add(entry);
        }
        JsonArray characteristics = new JsonArray();
        JsonArray keyFigures = new JsonArray();
        Iterator<?> objectIterator = (Iterator<?>) infoProvider.getClass()
                .getMethod("getInfoObjectIterator").invoke(infoProvider);
        while (objectIterator != null && objectIterator.hasNext()) {
            Object infoObject = objectIterator.next();
            JsonObject entry = new JsonObject();
            entry.addProperty("name", invokeString(infoObject, "getName"));
            entry.addProperty("description", invokeString(infoObject, "getDescription"));
            String type = invokeString(infoObject, "getInfoObjectType");
            entry.addProperty("infoObjectType", type);
            entry.addProperty("dimensionName", invokeString(infoObject, "getDimensionName"));
            entry.addProperty("dataType", invokeString(infoObject, "getDataType"));
            Object hierarchyCount = invoke(infoObject, "numberOfHierarchies");
            if (hierarchyCount instanceof Integer count) entry.addProperty("hierarchies", count > 0);
            // KYF classification token is recorded as a live-validation item in bwmt-api-map.md.
            if (type != null && type.toUpperCase().contains("KYF")) keyFigures.add(entry);
            else characteristics.add(entry);
        }
        result.add("dimensions", dimensions);
        result.add("characteristics", characteristics);
        result.add("keyFigures", keyFigures);
        return result;
    }

    private JsonObject unavailable(String provider, String reason, String instruction, JsonArray attempts) {
        JsonObject result = new JsonObject();
        result.addProperty("available", false);
        result.addProperty("provider", provider);
        result.addProperty("reason", reason);
        result.addProperty("instruction", instruction);
        result.add("attempts", attempts);
        return result;
    }

    private JsonObject attempt(String path, Throwable failure) {
        JsonObject entry = new JsonObject();
        entry.addProperty("path", path);
        entry.addProperty("failureType", failure.getClass().getName());
        entry.addProperty("commException", COMM_EXCEPTION.equals(failure.getClass().getName()));
        entry.addProperty("message", StepJournal.redact(String.valueOf(failure.getMessage())));
        return entry;
    }

    private static String string(JsonObject object, String name) {
        return object != null && object.has(name) && !object.get(name).isJsonNull()
                ? object.get(name).getAsString() : "";
    }

    private static String asString(Object value) {
        return value == null ? "" : value.toString();
    }

    private static String invokeString(Object target, String name) {
        Object value = invoke(target, name);
        return value == null ? "" : value.toString();
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
