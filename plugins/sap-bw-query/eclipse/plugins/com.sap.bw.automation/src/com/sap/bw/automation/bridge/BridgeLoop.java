package com.sap.bw.automation.bridge;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sap.bw.automation.core.BwmtAdapter;
import com.sap.bw.automation.core.StepJournal;
import com.sap.bw.automation.core.VisualClass;

public final class BridgeLoop implements AutoCloseable {
    private static final Set<String> ALLOWED_METHODS = Set.of(
            "inspectCapabilities", "describeProvider", "listQueries", "readQuery", "projectCreateOrOpen",
            "createLocalDraft", "applySpecToDraft", "previewDraft", "prepareNewQuerySave");
    private static final Set<String> SECRET_KEYS = Set.of(
            "password", "passwd", "pwd", "secret", "token", "apikey", "credential");
    private final AtomicBoolean running = new AtomicBoolean();
    private final StepJournal journal;
    private final BwmtAdapter adapter;
    private Thread worker;
    private volatile RandomAccessFile pipe;

    public BridgeLoop(StepJournal journal) {
        this.journal = journal;
        this.adapter = new BwmtAdapter(journal);
    }

    public synchronized void start() {
        if (!running.compareAndSet(false, true)) return;
        worker = Thread.ofPlatform().name("bw-automation-bridge").daemon(true).start(this::run);
    }

    private void run() {
        String pipeName = System.getProperty("bw.automation.pipe", "bw-automation-default");
        String path = "\\\\.\\pipe\\" + pipeName.replace("\\\\.\\pipe\\", "");
        while (running.get()) {
            try (RandomAccessFile connection = new RandomAccessFile(path, "rw")) {
                pipe = connection;
                journal.append("bridge", "COMPLETED", "Local named-pipe bridge connected", VisualClass.GREEN, false);
                String line;
                while (running.get() && (line = connection.readLine()) != null) process(connection, line);
            } catch (IOException exception) {
                if (!running.get()) return;
                try { Thread.sleep(1000); }
                catch (InterruptedException interrupted) { Thread.currentThread().interrupt(); return; }
            } finally {
                pipe = null;
            }
        }
    }

    private void process(RandomAccessFile connection, String encodedLine) throws IOException {
        JsonObject response = new JsonObject();
        try {
            String line = new String(encodedLine.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
            JsonObject request = JsonParser.parseString(line).getAsJsonObject();
            if (request.has("id")) response.add("id", request.get("id"));
            String method = request.get("method").getAsString();
            JsonObject payload = request.has("payload") ? request.getAsJsonObject("payload") : new JsonObject();
            if (!ALLOWED_METHODS.contains(method)) throw new IllegalArgumentException("Method is not allow-listed");
            if (containsSecret(payload)) {
                journal.append("password-rejection", "BLOCKED",
                        "Do not paste passwords into AI. Treat the exposed password as compromised and rotate it immediately.",
                        VisualClass.RED, true);
                throw new IllegalArgumentException("Credential input rejected");
            }
            JsonElement result = adapter.dispatch(method, payload);
            response.add("result", result);
        } catch (RuntimeException exception) {
            JsonObject error = new JsonObject();
            error.addProperty("code", "OPERATION_BLOCKED");
            error.addProperty("message", "Operation blocked; inspect the password-free BW Automation sidebar.");
            response.add("error", error);
        }
        connection.write((response + System.lineSeparator()).getBytes(StandardCharsets.UTF_8));
    }

    private boolean containsSecret(JsonElement element) {
        if (element == null || element.isJsonNull()) return false;
        if (element.isJsonArray()) {
            for (JsonElement child : element.getAsJsonArray()) if (containsSecret(child)) return true;
            return false;
        }
        if (!element.isJsonObject()) return false;
        for (var entry : element.getAsJsonObject().entrySet()) {
            String normalized = entry.getKey().toLowerCase().replaceAll("[^a-z0-9]", "");
            if (SECRET_KEYS.contains(normalized) || containsSecret(entry.getValue())) return true;
        }
        return false;
    }

    @Override
    public synchronized void close() {
        running.set(false);
        if (worker != null) worker.interrupt();
        RandomAccessFile connection = pipe;
        if (connection != null) {
            try { connection.close(); }
            catch (IOException ignored) { }
        }
    }
}
