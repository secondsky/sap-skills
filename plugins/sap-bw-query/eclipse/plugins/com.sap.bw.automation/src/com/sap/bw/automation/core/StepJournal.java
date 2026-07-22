package com.sap.bw.automation.core;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Widget;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public final class StepJournal {
    private static final Pattern LABELED_SECRET = Pattern.compile(
            "(?i)\\b(password|passwd|pwd|secret|token|api[\\s_-]*key|credential)\\s*[:=]\\s*\\S+");
    private final Gson gson = new Gson();
    private final Path stepRoot;

    public StepJournal() {
        String configured = System.getenv("BW_AUTOMATION_HOME");
        String local = configured != null && !configured.isBlank()
                ? configured
                : Path.of(System.getenv("LOCALAPPDATA"), "BWAutomationStudio").toString();
        stepRoot = Path.of(local, "steps").toAbsolutePath().normalize();
    }

    public synchronized AutomationStep append(String tool, String status, String message, VisualClass visualClass, boolean sticky) {
        String safeMessage = redact(message);
        AutomationStep step = new AutomationStep(
                UUID.randomUUID().toString(), Instant.now().toString(), tool, status, safeMessage, visualClass, sticky);
        try {
            Files.createDirectories(stepRoot);
            Path journal = stepRoot.resolve(LocalDate.now() + ".jsonl");
            Files.writeString(journal, gson.toJson(step) + System.lineSeparator(), StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException ignored) {
            // UI remains usable without journaling; no credential-bearing detail is surfaced.
        }
        return step;
    }

    public synchronized List<AutomationStep> readRecent(int maximum) {
        List<AutomationStep> steps = new ArrayList<>();
        if (!Files.isDirectory(stepRoot)) return steps;
        try (var files = Files.list(stepRoot)) {
            List<Path> journals = files.filter(path -> path.getFileName().toString().endsWith(".jsonl"))
                    .sorted(Comparator.reverseOrder()).limit(7).toList();
            for (Path journal : journals) {
                for (String line : Files.readAllLines(journal, StandardCharsets.UTF_8)) {
                    if (line.isBlank() || LABELED_SECRET.matcher(line).find()) continue;
                    try {
                        JsonObject json = JsonParser.parseString(line).getAsJsonObject();
                        String visual = string(json, "visualClass", "BLUE").replace('-', '_').toUpperCase(Locale.ROOT);
                        steps.add(new AutomationStep(
                                string(json, "id", ""), string(json, "timestamp", ""), string(json, "tool", ""),
                                string(json, "status", ""), redact(string(json, "message", "")),
                                VisualClass.valueOf(visual), booleanValue(json, "sticky")));
                    } catch (RuntimeException ignored) {
                        // Ignore incomplete append-only records.
                    }
                }
            }
        } catch (IOException ignored) {
            return List.of();
        }
        return steps.stream().sorted(Comparator.comparing(AutomationStep::timestamp).reversed()).limit(maximum).toList();
    }

    public static boolean isSecureControl(Widget widget) {
        return widget != null && (widget.getStyle() & SWT.PASSWORD) != 0;
    }

    public static String redact(String text) {
        if (text == null) return "";
        return LABELED_SECRET.matcher(text).find() ? "[REDACTED]" : text;
    }

    private static String string(JsonObject json, String name, String fallback) {
        return json.has(name) && !json.get(name).isJsonNull() ? json.get(name).getAsString() : fallback;
    }

    private static boolean booleanValue(JsonObject json, String name) {
        return json.has(name) && json.get(name).getAsBoolean();
    }
}
