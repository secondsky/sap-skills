package com.sap.bw.automation.core;

public record AutomationStep(
        String id,
        String timestamp,
        String tool,
        String status,
        String message,
        VisualClass visualClass,
        boolean sticky) {
}
