#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List

PROFILES: Dict[str, Dict[str, Any]] = {
    "sap-cap-capire": {
        "path_suffixes": [".cds", ".csn", "/package.json", "/.cdsrc.json", "/mta.yaml", "/mta.yml"],
        "signatures": ["cds.serve", "cds.connect", "req.error", "association to", "composition of", "using", "namespace", "entity", "service"],
        "min_signature_matches": 2,
        "srv_db_ts": True,
        "allow_bash": False,
    },
    "sapui5": {
        "path_suffixes": [".view.xml", ".fragment.xml", ".controller.js", ".controller.ts", "/component.js", "/component.ts", "/manifest.json", ".control.js", ".renderer.js", "/i18n.properties"],
        "signatures": ["sap.ui.define", "sap.ui.require", "sap.m.", "sap.ui.core", "xmlview", "sap.ui.model"],
        "min_signature_matches": 1,
        "srv_db_ts": False,
        "allow_bash": True,
    },
    "sap-datasphere": {
        "path_suffixes": [".sql"],
        "signatures": ["create view", "create table", "create procedure", "default schema", "column table", "row table", "fact", "dimension", "relational dataset"],
        "min_signature_matches": 1,
        "srv_db_ts": False,
        "allow_bash": False,
    },
    "sap-sac-planning": {
        "path_suffixes": [".js", ".ts"],
        "signatures": ["getplanning(", "planningmodel", "dataaction", "publishversion", "createprivateversion", "getdatalocking(", "planningsequence"],
        "min_signature_matches": 1,
        "srv_db_ts": False,
        "allow_bash": False,
    },
    "sap-sac-scripting": {
        "path_suffixes": [".js", ".ts"],
        "signatures": ["getdatasource(", "getplanning(", "application.showmessage", "application.showbusyindicator", "chart_", "table_", "dropdown_", "setdimensionfilter(", "memberaccessmode", "getresultset("],
        "min_signature_matches": 1,
        "srv_db_ts": False,
        "allow_bash": False,
    },
    "sap-sac-custom-widget": {
        "path_suffixes": ["widget.json", "widget.js"],
        "signatures": ["oncustomwidgetbeforeupdate", "oncustomwidgetafterupdate", "oncustomwidgetresize", "oncustomwidgetdestroy", "customelements.define", "attachshadow("],
        "min_signature_matches": 1,
        "srv_db_ts": False,
        "allow_bash": False,
    },
    "sap-sqlscript": {
        "path_suffixes": [".sql"],
        "signatures": ["create procedure", "create function", "language sqlscript", "by database procedure", "execute immediate"],
        "min_signature_matches": 1,
        "srv_db_ts": False,
        "allow_bash": False,
    },
}


def print_json(obj: Dict[str, Any]) -> None:
    sys.stdout.write(json.dumps(obj) + "\n")


def empty() -> None:
    print_json({})


def normalize_path(file_path: str) -> str:
    return (file_path or "").replace("\\", "/").lower()


def collect_strings(value: Any, out: List[str], depth: int = 0) -> None:
    if depth > 4 or len(out) > 40:
        return
    if isinstance(value, str):
        out.append(value)
    elif isinstance(value, list):
        for item in value:
            collect_strings(item, out, depth + 1)
    elif isinstance(value, dict):
        for item in value.values():
            collect_strings(item, out, depth + 1)


def content_text(tool_input: Dict[str, Any]) -> str:
    out: List[str] = []
    collect_strings(tool_input, out)
    return "\n".join(out)[:120000]


def signature_match_count(text_lower: str, tokens: List[str]) -> int:
    return sum(1 for token in tokens if token in text_lower)


def is_ui5_deploy_command(command_lower: str) -> bool:
    return any(token in command_lower for token in ["ui5 deploy", "fiori deploy", "cf deploy", "mbt build"])


def looks_like_hardcoded_secret(text_lower: str) -> bool:
    keys = ["password", "passwd", "secret", "api_key", "apikey", "token", "client_secret", "access_token"]
    markers = ["changeme", "placeholder", "example", "dummy", "your_", "your-", "xxxx", "test"]
    for key in keys:
        start = 0
        while True:
            idx = text_lower.find(key, start)
            if idx == -1:
                break
            window = text_lower[idx : idx + 120]
            has_assignment = "=" in window or ":" in window
            has_quote = '"' in window or "'" in window or "`" in window
            is_placeholder = any(marker in window for marker in markers)
            if has_assignment and has_quote and not is_placeholder:
                return True
            start = idx + len(key)
    return False


RISK_EXPLANATIONS: Dict[str, str] = {
    "Hardcoded credential/secret detected. Move sensitive values to environment variables or secure bindings.": "Embedding credentials in source code exposes them via git history, logs, and anyone with repo access — even after deletion. Use environment variables or a secrets manager instead.",
    "DELETE statement appears without WHERE clause.": "This SQL statement will delete ALL rows in the table with no way to recover without a backup. If this is intentional (e.g. truncate), say so explicitly.",
    "UPDATE statement appears without WHERE clause.": "This SQL statement will update ALL rows in the table. If this is intentional, confirm explicitly.",
    "Potential SQL injection risk in dynamic EXECUTE IMMEDIATE concatenation.": "String concatenation in dynamic SQL enables SQL injection attacks where user input could execute arbitrary SQL commands.",
    "Use of eval() is blocked due to CSP/XSS risk.": "eval() executes arbitrary strings as code — a critical XSS and CSP violation risk. Use JSON.parse() or explicit logic instead.",
    "Use of Function constructor is blocked due to CSP/XSS risk.": "The Function() constructor creates functions from strings at runtime — a CSP violation and XSS risk similar to eval().",
    "Unsafe HTML injection pattern detected (innerHTML/insertAdjacentHTML).": "Inserting unsanitized HTML directly into the DOM enables XSS attacks. Use textContent or SAP data binding instead.",
    "UI5 deployment command disables build safeguards (--no-build).": "Deploying without building skips preload generation, cache-busting, and minification — resulting in poor production performance and potentially stale assets.",
    "Use of eval() is blocked for security reasons.": "eval() executes arbitrary strings as code — a critical XSS and CSP violation risk. Use JSON.parse() or explicit logic instead.",
}


def detect_risks(plugin_name: str, text_lower: str, command_lower: str) -> List[str]:
    risks: List[str] = []

    if looks_like_hardcoded_secret(text_lower):
        risks.append("Hardcoded credential/secret detected. Move sensitive values to environment variables or secure bindings.")

    if plugin_name in {"sap-sqlscript", "sap-datasphere"}:
        if "delete from" in text_lower and not re.search(r'\bwhere\b', text_lower):
            risks.append("DELETE statement appears without WHERE clause.")
        if "update " in text_lower and " set " in text_lower and not re.search(r'\bwhere\b', text_lower):
            risks.append("UPDATE statement appears without WHERE clause.")
        if "execute immediate" in text_lower and ("||" in text_lower or " + " in text_lower):
            risks.append("Potential SQL injection risk in dynamic EXECUTE IMMEDIATE concatenation.")

    if plugin_name in {"sapui5", "sap-sac-custom-widget"}:
        if "eval(" in text_lower:
            risks.append("Use of eval() is blocked due to CSP/XSS risk.")
        if re.search(r'new\s+function\s*\(', text_lower):
            risks.append("Use of Function constructor is blocked due to CSP/XSS risk.")
        if "innerhtml=" in text_lower or "innerhtml =" in text_lower or "insertadjacenthtml(" in text_lower:
            risks.append("Unsafe HTML injection pattern detected (innerHTML/insertAdjacentHTML).")

    if plugin_name in {"sap-sac-scripting", "sap-sac-planning", "sap-cap-capire"} and "eval(" in text_lower:
        risks.append("Use of eval() is blocked for security reasons.")

    if plugin_name == "sapui5" and "deploy" in command_lower and "--no-build" in command_lower:
        risks.append("UI5 deployment command disables build safeguards (--no-build).")

    return risks


def detect_warnings(plugin_name: str, text_lower: str, file_path_lower: str) -> List[str]:
    warnings: List[str] = []

    if plugin_name in {"sap-cap-capire", "sap-sqlscript", "sap-datasphere"} and "select *" in text_lower:
        warnings.append("Use explicit column selection instead of SELECT * for maintainability and performance.")

    if plugin_name in {"sap-sac-scripting", "sap-sac-planning"} and "console.log(" in text_lower:
        warnings.append("Remove or gate console.log statements before production deployment.")

    if plugin_name == "sap-sac-custom-widget":
        if file_path_lower.endswith("widget.js") or "customelements.define" in text_lower:
            if "oncustomwidgetresize" not in text_lower:
                warnings.append("Consider implementing onCustomWidgetResize for responsive behavior.")
            if "oncustomwidgetdestroy" not in text_lower:
                warnings.append("Consider implementing onCustomWidgetDestroy to release resources.")

    if plugin_name == "sap-cap-capire" and "service" in text_lower and "@requires" not in text_lower:
        warnings.append("Review whether @requires authorization annotations are needed on exposed services.")

    return warnings


def is_relevant(profile: Dict[str, Any], tool_name: str, file_path_lower: str, text_lower: str, command_lower: str) -> bool:
    if tool_name == "Bash":
        return bool(profile.get("allow_bash") and is_ui5_deploy_command(command_lower))

    if tool_name not in {"Write", "Edit", "MultiEdit"}:
        return False

    if any(file_path_lower.endswith(suffix) for suffix in profile["path_suffixes"]):
        return True

    if profile.get("srv_db_ts") and ("/srv/" in file_path_lower or "/db/" in file_path_lower) and (file_path_lower.endswith(".js") or file_path_lower.endswith(".ts")):
        return True

    return signature_match_count(text_lower, profile["signatures"]) >= profile["min_signature_matches"]


def main() -> None:
    raw = sys.stdin.read()
    if not raw.strip():
        return empty()

    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        return empty()

    event = payload.get("hook_event_name", "")
    if event not in {"PreToolUse", "PostToolUse"}:
        return empty()

    plugin_name = Path(__file__).resolve().parent.parent.name
    profile = PROFILES.get(plugin_name)
    if not profile:
        return empty()

    tool_name = payload.get("tool_name", "")
    tool_input = payload.get("tool_input", {}) or {}
    tool_response = payload.get("tool_response", {}) or {}

    file_path_lower = normalize_path(
        tool_input.get("file_path")
        or tool_input.get("filePath")
        or tool_input.get("path")
        or tool_response.get("filePath")
        or tool_response.get("file_path")
        or ""
    )

    command_lower = (tool_input.get("command") if isinstance(tool_input.get("command"), str) else "").lower()
    text_lower = content_text(tool_input).lower()

    if not is_relevant(profile, tool_name, file_path_lower, text_lower, command_lower):
        return empty()

    risks = detect_risks(plugin_name, text_lower, command_lower)
    if event == "PreToolUse" and risks:
        risk_details = []
        for risk in risks:
            explanation = RISK_EXPLANATIONS.get(risk, "")
            risk_details.append(f"• {risk}" + (f"\n  {explanation}" if explanation else ""))
        context = f"⚠️ SECURITY RISK — STOP AND ASK USER BEFORE PROCEEDING\n\nPlugin: {plugin_name}\n\n" + "\n\n".join(risk_details) + "\n\nTell the user what was found, explain the potential consequences, and ask for explicit confirmation before writing this file."
        return print_json(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "additionalContext": context,
                }
            }
        )

    if event == "PreToolUse" and tool_name == "Bash" and plugin_name == "sapui5":
        return print_json(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "additionalContext": "UI5 deployment command detected. Ensure ui5 build ran and preload/cache-buster settings are production-ready.",
                }
            }
        )

    if event == "PostToolUse":
        warnings = detect_warnings(plugin_name, text_lower, file_path_lower)
        if warnings:
            return print_json(
                {
                    "hookSpecificOutput": {
                        "hookEventName": "PostToolUse",
                        "additionalContext": "\n".join([f"- {item}" for item in warnings[:3]]),
                    }
                }
            )

    return empty()


if __name__ == "__main__":
    main()
