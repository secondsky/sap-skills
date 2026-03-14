#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROFILES = {
  "sap-cap-capire": {
    pathSuffixes: [".cds", ".csn", "/package.json", "/.cdsrc.json", "/mta.yaml", "/mta.yml"],
    signatures: ["cds.serve", "cds.connect", "req.error", "association to", "composition of", "using", "namespace", "entity", "service"],
    minSignatureMatches: 2,
    srvDbTs: true,
    allowBash: false
  },
  sapui5: {
    pathSuffixes: [".view.xml", ".fragment.xml", ".controller.js", ".controller.ts", "/component.js", "/component.ts", "/manifest.json", ".control.js", ".renderer.js", "/i18n.properties"],
    signatures: ["sap.ui.define", "sap.ui.require", "sap.m.", "sap.ui.core", "xmlview", "sap.ui.model"],
    minSignatureMatches: 1,
    srvDbTs: false,
    allowBash: true
  },
  "sap-datasphere": {
    pathSuffixes: [".sql"],
    signatures: ["create view", "create table", "create procedure", "default schema", "column table", "row table", "fact", "dimension", "relational dataset"],
    minSignatureMatches: 1,
    srvDbTs: false,
    allowBash: false
  },
  "sap-sac-planning": {
    pathSuffixes: [".js", ".ts"],
    signatures: ["getplanning(", "planningmodel", "dataaction", "publishversion", "createprivateversion", "getdatalocking(", "planningsequence"],
    minSignatureMatches: 1,
    srvDbTs: false,
    allowBash: false
  },
  "sap-sac-scripting": {
    pathSuffixes: [".js", ".ts"],
    signatures: ["getdatasource(", "getplanning(", "application.showmessage", "application.showbusyindicator", "chart_", "table_", "dropdown_", "setdimensionfilter(", "memberaccessmode", "getresultset("],
    minSignatureMatches: 1,
    srvDbTs: false,
    allowBash: false
  },
  "sap-sac-custom-widget": {
    pathSuffixes: ["widget.json", "widget.js"],
    signatures: ["oncustomwidgetbeforeupdate", "oncustomwidgetafterupdate", "oncustomwidgetresize", "oncustomwidgetdestroy", "customelements.define", "attachshadow("],
    minSignatureMatches: 1,
    srvDbTs: false,
    allowBash: false
  },
  "sap-sqlscript": {
    pathSuffixes: [".sql"],
    signatures: ["create procedure", "create function", "language sqlscript", "by database procedure", "execute immediate"],
    minSignatureMatches: 1,
    srvDbTs: false,
    allowBash: false
  }
};

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", () => resolve(""));
  });
}

function printJson(obj) {
  process.stdout.write(`${JSON.stringify(obj)}\n`);
}

function empty() {
  printJson({});
}

function normalizePath(filePath) {
  return (filePath || "").replace(/\\/g, "/").toLowerCase();
}

function collectStrings(value, out, depth = 0) {
  if (depth > 4 || out.length > 40) {
    return;
  }
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, out, depth + 1);
    }
    return;
  }
  if (value && typeof value === "object") {
    for (const nested of Object.values(value)) {
      collectStrings(nested, out, depth + 1);
    }
  }
}

function getContentText(toolInput) {
  const out = [];
  collectStrings(toolInput || {}, out);
  return out.join("\n").slice(0, 120000);
}

function signatureMatchCount(textLower, tokens) {
  return tokens.reduce((acc, token) => acc + (textLower.includes(token) ? 1 : 0), 0);
}

function isUi5DeployCommand(commandLower) {
  return ["ui5 deploy", "fiori deploy", "cf deploy", "mbt build"].some((needle) => commandLower.includes(needle));
}

function looksLikeHardcodedSecret(textLower) {
  const keys = ["password", "passwd", "secret", "api_key", "apikey", "token", "client_secret", "access_token"];
  for (const key of keys) {
    let start = 0;
    while (true) {
      const idx = textLower.indexOf(key, start);
      if (idx === -1) {
        break;
      }
      const window = textLower.slice(idx, idx + 120);
      const hasAssignment = window.includes("=") || window.includes(":");
      const hasQuote = window.includes("\"") || window.includes("'") || window.includes("`");
      const isPlaceholder = ["changeme", "placeholder", "example", "dummy", "your_", "your-", "xxxx", "test"].some((marker) => window.includes(marker));
      if (hasAssignment && hasQuote && !isPlaceholder) {
        return true;
      }
      start = idx + key.length;
    }
  }
  return false;
}

const RISK_EXPLANATIONS = {
  "Hardcoded credential/secret detected. Move sensitive values to environment variables or secure bindings.":
    "Embedding credentials in source code exposes them via git history, logs, and anyone with repo access — even after deletion. Use environment variables or a secrets manager instead.",
  "DELETE statement appears without WHERE clause.":
    "This SQL statement will delete ALL rows in the table with no way to recover without a backup. If this is intentional (e.g. truncate), say so explicitly.",
  "UPDATE statement appears without WHERE clause.":
    "This SQL statement will update ALL rows in the table. If this is intentional, confirm explicitly.",
  "Potential SQL injection risk in dynamic EXECUTE IMMEDIATE concatenation.":
    "String concatenation in dynamic SQL enables SQL injection attacks where user input could execute arbitrary SQL commands.",
  "Use of eval() is blocked due to CSP/XSS risk.":
    "eval() executes arbitrary strings as code — a critical XSS and CSP violation risk. Use JSON.parse() or explicit logic instead.",
  "Use of Function constructor is blocked due to CSP/XSS risk.":
    "The Function() constructor creates functions from strings at runtime — a CSP violation and XSS risk similar to eval().",
  "Unsafe HTML injection pattern detected (innerHTML/insertAdjacentHTML).":
    "Inserting unsanitized HTML directly into the DOM enables XSS attacks. Use textContent or SAP data binding instead.",
  "UI5 deployment command disables build safeguards (--no-build).":
    "Deploying without building skips preload generation, cache-busting, and minification — resulting in poor production performance and potentially stale assets.",
  "Use of eval() is blocked for security reasons.":
    "eval() executes arbitrary strings as code — a critical XSS and CSP violation risk. Use JSON.parse() or explicit logic instead."
};

function detectHighRisk(pluginName, textLower, commandLower) {
  const risks = [];

  if (looksLikeHardcodedSecret(textLower)) {
    risks.push("Hardcoded credential/secret detected. Move sensitive values to environment variables or secure bindings.");
  }

  if (["sap-sqlscript", "sap-datasphere"].includes(pluginName)) {
    if (textLower.includes("delete from") && !/\bwhere\b/.test(textLower)) {
      risks.push("DELETE statement appears without WHERE clause.");
    }
    if (textLower.includes("update ") && textLower.includes(" set ") && !/\bwhere\b/.test(textLower)) {
      risks.push("UPDATE statement appears without WHERE clause.");
    }
    if (textLower.includes("execute immediate") && (textLower.includes("||") || textLower.includes(" + "))) {
      risks.push("Potential SQL injection risk in dynamic EXECUTE IMMEDIATE concatenation.");
    }
  }

  if (["sapui5", "sap-sac-custom-widget"].includes(pluginName)) {
    if (textLower.includes("eval(")) {
      risks.push("Use of eval() is blocked due to CSP/XSS risk.");
    }
    if (/new\s+function\s*\(/.test(textLower)) {
      risks.push("Use of Function constructor is blocked due to CSP/XSS risk.");
    }
    if (textLower.includes("innerhtml=") || textLower.includes("innerhtml =") || textLower.includes("insertadjacenthtml(")) {
      risks.push("Unsafe HTML injection pattern detected (innerHTML/insertAdjacentHTML).");
    }
  }

  if (["sap-sac-scripting", "sap-sac-planning", "sap-cap-capire"].includes(pluginName) && textLower.includes("eval(")) {
    risks.push("Use of eval() is blocked for security reasons.");
  }

  if (pluginName === "sapui5" && commandLower.includes("deploy") && commandLower.includes("--no-build")) {
    risks.push("UI5 deployment command disables build safeguards (--no-build).");
  }

  return risks;
}

function detectWarnings(pluginName, textLower, filePathLower) {
  const warnings = [];

  if (["sap-cap-capire", "sap-sqlscript", "sap-datasphere"].includes(pluginName) && textLower.includes("select *")) {
    warnings.push("Use explicit column selection instead of SELECT * for maintainability and performance.");
  }

  if (["sap-sac-scripting", "sap-sac-planning"].includes(pluginName) && textLower.includes("console.log(")) {
    warnings.push("Remove or gate console.log statements before production deployment.");
  }

  if (pluginName === "sap-sac-custom-widget") {
    if (filePathLower.endsWith("widget.js") || textLower.includes("customelements.define")) {
      if (!textLower.includes("oncustomwidgetresize")) {
        warnings.push("Consider implementing onCustomWidgetResize for responsive behavior.");
      }
      if (!textLower.includes("oncustomwidgetdestroy")) {
        warnings.push("Consider implementing onCustomWidgetDestroy to release resources.");
      }
    }
  }

  if (pluginName === "sap-cap-capire" && textLower.includes("service") && !textLower.includes("@requires")) {
    warnings.push("Review whether @requires authorization annotations are needed on exposed services.");
  }

  return warnings;
}

function isRelevant(profile, toolName, filePathLower, textLower, commandLower) {
  if (toolName === "Bash") {
    return profile.allowBash && isUi5DeployCommand(commandLower);
  }

  if (!["Write", "Edit", "MultiEdit"].includes(toolName)) {
    return false;
  }

  if (profile.pathSuffixes.some((suffix) => filePathLower.endsWith(suffix))) {
    return true;
  }

  if (profile.srvDbTs && (filePathLower.includes("/srv/") || filePathLower.includes("/db/")) && (filePathLower.endsWith(".js") || filePathLower.endsWith(".ts"))) {
    return true;
  }

  return signatureMatchCount(textLower, profile.signatures) >= profile.minSignatureMatches;
}

async function main() {
  const raw = await readStdin();
  if (!raw.trim()) {
    return empty();
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return empty();
  }

  const event = payload.hook_event_name || "";
  if (event !== "PreToolUse" && event !== "PostToolUse") {
    return empty();
  }

  const pluginName = path.basename(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
  const profile = PROFILES[pluginName];
  if (!profile) {
    return empty();
  }

  const toolName = payload.tool_name || "";
  const toolInput = payload.tool_input || {};
  const toolResponse = payload.tool_response || {};
  const filePathLower = normalizePath(toolInput.file_path || toolInput.filePath || toolInput.path || toolResponse.filePath || toolResponse.file_path || "");
  const commandLower = (typeof toolInput.command === "string" ? toolInput.command : "").toLowerCase();
  const textLower = getContentText(toolInput).toLowerCase();

  if (!isRelevant(profile, toolName, filePathLower, textLower, commandLower)) {
    return empty();
  }

  const risks = detectHighRisk(pluginName, textLower, commandLower);
  if (event === "PreToolUse" && risks.length > 0) {
    const riskDetails = risks.map((risk) => {
      const explanation = RISK_EXPLANATIONS[risk] || "";
      return `• ${risk}${explanation ? `\n  ${explanation}` : ""}`;
    }).join("\n\n");
    const context = `⚠️ SECURITY RISK — STOP AND ASK USER BEFORE PROCEEDING\n\nPlugin: ${pluginName}\n\n${riskDetails}\n\nTell the user what was found, explain the potential consequences, and ask for explicit confirmation before writing this file.`;
    return printJson({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        additionalContext: context
      }
    });
  }

  if (event === "PreToolUse" && toolName === "Bash" && pluginName === "sapui5") {
    return printJson({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        additionalContext: "UI5 deployment command detected. Ensure ui5 build ran and preload/cache-buster settings are production-ready."
      }
    });
  }

  if (event === "PostToolUse") {
    const warnings = detectWarnings(pluginName, textLower, filePathLower);
    if (warnings.length > 0) {
      return printJson({
        hookSpecificOutput: {
          hookEventName: "PostToolUse",
          additionalContext: warnings.slice(0, 3).map((warning) => `- ${warning}`).join("\n")
        }
      });
    }
  }

  return empty();
}

await main();
