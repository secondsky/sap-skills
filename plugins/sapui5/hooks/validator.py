#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

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
    markers = ["changeme", "placeholder", "example", "dummy", "your_", "your-", "xxxx", "test"]
    pattern = re.compile(
        r'\b(password|passwd|secret|api[_-]?key|apikey|client[_-]?secret|clientsecret|access[_-]?token|accesstoken|token)\b'
        r'\s*[:=]\s*["\']([^"\']{8,})["\']'
    )
    for match in pattern.finditer(text_lower):
        window = match.group(0)
        if not any(marker in window for marker in markers):
            return True
    return False


def strip_sql_comments(text_lower: str) -> str:
    without_block_comments = re.sub(r"/\*.*?\*/", " ", text_lower, flags=re.DOTALL)
    return re.sub(r"--[^\n\r]*", " ", without_block_comments)


def sql_statements(text_lower: str) -> List[str]:
    cleaned = strip_sql_comments(text_lower)
    return [statement.strip() for statement in cleaned.split(";") if statement.strip()]


def has_delete_without_where(text_lower: str) -> bool:
    for statement in sql_statements(text_lower):
        normalized = re.sub(r"\s+", " ", statement)
        if re.search(r"\bdelete\s+from\b", normalized) and not re.search(r"\bwhere\b", normalized):
            return True
    return False


def has_update_without_where(text_lower: str) -> bool:
    for statement in sql_statements(text_lower):
        normalized = re.sub(r"\s+", " ", statement)
        if re.search(r"\bupdate\s+\S+.*\bset\b", normalized) and not re.search(r"\bwhere\b", normalized):
            return True
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
        if has_delete_without_where(text_lower):
            risks.append("DELETE statement appears without WHERE clause.")
        if has_update_without_where(text_lower):
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


def indices_are_sequential(indices: List[int]) -> bool:
    if not indices:
        return True
    unique = sorted(set(indices))
    for expected, value in enumerate(unique):
        if value != expected:
            return False
    return True


def indexed_members(text_lower: str, prefix: str) -> List[int]:
    return [int(match.group(1)) for match in re.finditer(rf"{prefix}_(\d+)", text_lower)]


def quoted_value(text: str, key: str) -> str:
    match = re.search(rf'"{re.escape(key)}"\s*:\s*"([^"]*)"', text, flags=re.IGNORECASE)
    return match.group(1) if match else ""


def parse_json_object(text: str) -> Optional[Dict[str, Any]]:
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        return None
    return parsed if isinstance(parsed, dict) else None


def webcomponent_urls_point_to_non_javascript(manifest: Optional[Dict[str, Any]]) -> bool:
    if not manifest or not isinstance(manifest.get("webcomponents"), list):
        return False
    for component in manifest["webcomponents"]:
        if not isinstance(component, dict) or not isinstance(component.get("url"), str):
            continue
        if re.search(r"\.(?:css|html?)(?:[?#].*)?$", component["url"].strip(), flags=re.IGNORECASE):
            return True
    return False


def webcomponent_urls_text_point_to_non_javascript(text: str) -> bool:
    return bool(re.search(r'"webcomponents"\s*:\s*\[[\s\S]*?"url"\s*:\s*"[^"]+\.(?:css|html?)(?:[?#][^"]*)?"', text, flags=re.IGNORECASE))


def has_unapproved_remote_css_asset(text: str) -> bool:
    return bool(
        re.search(r"@import\s+(?:url\s*\()?\s*\\?[\"']?https?://", text, flags=re.IGNORECASE)
        or re.search(r"url\s*\(\s*\\?[\"']?https?://", text, flags=re.IGNORECASE)
        or re.search(r"https?://[^\"'\s)]*(?:fonts\.googleapis\.com|fonts\.gstatic\.com|\.woff2?|\.ttf|\.otf)", text, flags=re.IGNORECASE)
    )


def looks_like_custom_widget_content(text_lower: str, file_path_lower: str) -> bool:
    return (
        file_path_lower.endswith("widget.json")
        or file_path_lower.endswith("widget.js")
        or "customelements.define" in text_lower
        or "oncustomwidget" in text_lower
        or "attachshadow(" in text_lower
    )


def has_global_style_injection(text: str) -> bool:
    return bool(
        re.search(r"document\.head\.appendChild\s*\(\s*(?:style|[A-Za-z_$][\w$]*(?:Style|Css|CSS)[A-Za-z_$\w]*)\s*\)", text)
        or re.search(r"document\.head\.insertAdjacentHTML\s*\([^)]*<style", text, flags=re.IGNORECASE)
    )


def detect_custom_widget_generation_warnings(text: str, text_lower: str, file_path_lower: str) -> List[str]:
    warnings: List[str] = []

    if file_path_lower.endswith("widget.json"):
        if webcomponent_urls_point_to_non_javascript(parse_json_object(text)) or webcomponent_urls_text_point_to_non_javascript(text):
            warnings.append("SAC widget manifest webcomponents[].url should point to JavaScript component files, not CSS or HTML resources.")

        if re.search(r'"methods"\s*:\s*\[', text, flags=re.IGNORECASE):
            warnings.append("SAC widget manifest methods must be an object, not an array.")
        if re.search(r'"events"\s*:\s*\[', text, flags=re.IGNORECASE):
            warnings.append("SAC widget manifest events must be an object, not an array.")

        manifest_id = quoted_value(text, "id")
        if manifest_id and not re.match(r"^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)+$", manifest_id):
            warnings.append("Generated widget manifest id should use lowercase dot notation, for example com.company.widgetname.")

        new_instance_prefix = quoted_value(text, "newInstancePrefix")
        if new_instance_prefix and not re.match(r"^[A-Z][A-Za-z]*$", new_instance_prefix):
            warnings.append("Generated widget newInstancePrefix should use PascalCase letters only.")

        for match in re.finditer(r'"tag"\s*:\s*"([^"]+)"', text, flags=re.IGNORECASE):
            if not re.match(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)+$", match.group(1)):
                warnings.append("Custom widget tags should use lowercase hyphen notation without underscores or uppercase letters.")
                break

        if "brandlogourl" in text_lower and not re.search(r'"brandLogoUrl"\s*:\s*\{', text):
            warnings.append("Brand logo integration should define a brandLogoUrl property in the manifest.")

    if file_path_lower.endswith("widget.js") or "customelements.define" in text_lower:
        if not indices_are_sequential(indexed_members(text_lower, "dimensions")):
            warnings.append("Generated widget code should use sequential dimensions_N indices starting at dimensions_0.")
        if not indices_are_sequential(indexed_members(text_lower, "measures")):
            warnings.append("Generated widget code should use sequential measures_N indices starting at measures_0.")

        uses_brand_logo = "brandlogourl" in text_lower or "brandlogo" in text_lower
        if uses_brand_logo and ('id="brandlogo"' not in text_lower or "brand-logo" not in text_lower):
            warnings.append('Brand logo integration should include a standard img element with id="brandLogo" and class="brand-logo".')

    if file_path_lower.endswith(".js") or file_path_lower.endswith(".css") or "customelements.define" in text_lower:
        if has_global_style_injection(text):
            warnings.append("Generated widget styling should stay scoped to the Web Component; avoid injecting global document.head styles for SAC/story pages.")
        if has_unapproved_remote_css_asset(text):
            warnings.append("Remote CSS, font imports, or CSS url(http...) assets require an explicitly approved/trusted host for SAC deployment.")

    return warnings


def detect_warnings(plugin_name: str, text: str, text_lower: str, file_path_lower: str) -> List[str]:
    warnings: List[str] = []

    if plugin_name in {"sap-cap-capire", "sap-sqlscript", "sap-datasphere"} and "select *" in text_lower:
        warnings.append("Use explicit column selection instead of SELECT * for maintainability and performance.")

    if plugin_name in {"sap-sac-scripting", "sap-sac-planning"} and "console.log(" in text_lower:
        warnings.append("Remove or gate console.log statements before production deployment.")

    if looks_like_custom_widget_content(text_lower, file_path_lower):
        warnings.extend(detect_custom_widget_generation_warnings(text, text_lower, file_path_lower))

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
    text = content_text(tool_input)
    text_lower = text.lower()

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
                    "permissionDecision": "deny",
                    "permissionDecisionReason": "High-risk SAP content detected; user confirmation is required before this write can proceed.",
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
        warnings = detect_warnings(plugin_name, text, text_lower, file_path_lower)
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
