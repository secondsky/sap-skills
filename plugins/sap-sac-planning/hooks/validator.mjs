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
  const markers = ["changeme", "placeholder", "example", "dummy", "your_", "your-", "xxxx", "test"];
  const pattern = /\b(password|passwd|secret|api[_-]?key|apikey|client[_-]?secret|clientsecret|access[_-]?token|accesstoken|token)\b\s*[:=]\s*["']([^"']{8,})["']/g;
  for (const match of textLower.matchAll(pattern)) {
    if (!markers.some((marker) => match[0].includes(marker))) {
      return true;
    }
  }
  return false;
}

function stripSqlComments(textLower) {
  return textLower.replace(/\/\*.*?\*\//gs, " ").replace(/--[^\n\r]*/g, " ");
}

function sqlStatements(textLower) {
  return stripSqlComments(textLower).split(";").map((statement) => statement.trim()).filter(Boolean);
}

function hasDeleteWithoutWhere(textLower) {
  return sqlStatements(textLower).some((statement) => {
    const normalized = statement.replace(/\s+/g, " ");
    return /\bdelete\s+from\b/.test(normalized) && !/\bwhere\b/.test(normalized);
  });
}

function hasUpdateWithoutWhere(textLower) {
  return sqlStatements(textLower).some((statement) => {
    const normalized = statement.replace(/\s+/g, " ");
    return /\bupdate\s+\S+.*\bset\b/.test(normalized) && !/\bwhere\b/.test(normalized);
  });
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
    if (hasDeleteWithoutWhere(textLower)) {
      risks.push("DELETE statement appears without WHERE clause.");
    }
    if (hasUpdateWithoutWhere(textLower)) {
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

function indicesAreSequential(indices) {
  if (indices.length === 0) {
    return true;
  }
  const unique = [...new Set(indices)].sort((a, b) => a - b);
  for (let index = 0; index < unique.length; index += 1) {
    if (unique[index] !== index) {
      return false;
    }
  }
  return true;
}

function indexedMembers(text, prefix) {
  const out = [];
  const pattern = new RegExp(`${prefix}_(\\d+)`, "g");
  for (const match of text.matchAll(pattern)) {
    out.push(Number.parseInt(match[1], 10));
  }
  return out;
}

function quotedValue(text, key) {
  const match = text.match(new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`, "i"));
  return match ? match[1] : "";
}

function parseJsonObject(text) {
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function webcomponentUrlsPointToNonJavascript(manifest) {
  if (!manifest || !Array.isArray(manifest.webcomponents)) {
    return false;
  }
  return manifest.webcomponents.some((component) => {
    if (!component || typeof component.url !== "string") {
      return false;
    }
    return /\.(?:css|html?)(?:[?#].*)?$/i.test(component.url.trim());
  });
}

function webcomponentUrlsTextPointToNonJavascript(text) {
  return /"webcomponents"\s*:\s*\[[\s\S]*?"url"\s*:\s*"[^"]+\.(?:css|html?)(?:[?#][^"]*)?"/i.test(text);
}

function hasUnapprovedRemoteCssAsset(text) {
  return /@import\s+(?:url\s*\()?\s*\\?["']?https?:\/\//i.test(text)
    || /url\s*\(\s*\\?["']?https?:\/\//i.test(text)
    || /https?:\/\/[^"'\s)]*(?:fonts\.googleapis\.com|fonts\.gstatic\.com|\.woff2?|\.ttf|\.otf)/i.test(text);
}

function looksLikeCustomWidgetContent(textLower, filePathLower) {
  return filePathLower.endsWith("widget.json")
    || filePathLower.endsWith("widget.js")
    || textLower.includes("customelements.define")
    || textLower.includes("oncustomwidget")
    || textLower.includes("attachshadow(");
}

function hasGlobalStyleInjection(text) {
  return /document\.head\.appendChild\s*\(\s*(?:style|[A-Za-z_$][\w$]*(?:Style|Css|CSS)[A-Za-z_$\w]*)\s*\)/.test(text)
    || /document\.head\.insertAdjacentHTML\s*\([^)]*<style/i.test(text);
}

function detectCustomWidgetGenerationWarnings(text, textLower, filePathLower) {
  const warnings = [];

  if (filePathLower.endsWith("widget.json")) {
    if (webcomponentUrlsPointToNonJavascript(parseJsonObject(text)) || webcomponentUrlsTextPointToNonJavascript(text)) {
      warnings.push("SAC widget manifest webcomponents[].url should point to JavaScript component files, not CSS or HTML resources.");
    }

    if (/"methods"\s*:\s*\[/i.test(text)) {
      warnings.push("SAC widget manifest methods must be an object, not an array.");
    }
    if (/"events"\s*:\s*\[/i.test(text)) {
      warnings.push("SAC widget manifest events must be an object, not an array.");
    }

    const manifestId = quotedValue(text, "id");
    if (manifestId && !/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)+$/.test(manifestId)) {
      warnings.push("Generated widget manifest id should use lowercase dot notation, for example com.company.widgetname.");
    }

    const newInstancePrefix = quotedValue(text, "newInstancePrefix");
    if (newInstancePrefix && !/^[A-Z][A-Za-z]*$/.test(newInstancePrefix)) {
      warnings.push("Generated widget newInstancePrefix should use PascalCase letters only.");
    }

    for (const match of text.matchAll(/"tag"\s*:\s*"([^"]+)"/gi)) {
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)+$/.test(match[1])) {
        warnings.push("Custom widget tags should use lowercase hyphen notation without underscores or uppercase letters.");
        break;
      }
    }

    if (textLower.includes("brandlogourl") && !/"brandLogoUrl"\s*:\s*\{/.test(text)) {
      warnings.push("Brand logo integration should define a brandLogoUrl property in the manifest.");
    }
  }

  if (filePathLower.endsWith("widget.js") || textLower.includes("customelements.define")) {
    if (!indicesAreSequential(indexedMembers(textLower, "dimensions"))) {
      warnings.push("Generated widget code should use sequential dimensions_N indices starting at dimensions_0.");
    }
    if (!indicesAreSequential(indexedMembers(textLower, "measures"))) {
      warnings.push("Generated widget code should use sequential measures_N indices starting at measures_0.");
    }

    const usesBrandLogo = textLower.includes("brandlogourl") || textLower.includes("brandlogo");
    if (usesBrandLogo && (!textLower.includes('id="brandlogo"') || !textLower.includes("brand-logo"))) {
      warnings.push("Brand logo integration should include a standard img element with id=\"brandLogo\" and class=\"brand-logo\".");
    }
  }

  if (filePathLower.endsWith(".js") || filePathLower.endsWith(".css") || textLower.includes("customelements.define")) {
    if (hasGlobalStyleInjection(text)) {
      warnings.push("Generated widget styling should stay scoped to the Web Component; avoid injecting global document.head styles for SAC/story pages.");
    }
    if (hasUnapprovedRemoteCssAsset(text)) {
      warnings.push("Remote CSS, font imports, or CSS url(http...) assets require an explicitly approved/trusted host for SAC deployment.");
    }
  }

  return warnings;
}

function detectWarnings(pluginName, text, textLower, filePathLower) {
  const warnings = [];

  if (["sap-cap-capire", "sap-sqlscript", "sap-datasphere"].includes(pluginName) && textLower.includes("select *")) {
    warnings.push("Use explicit column selection instead of SELECT * for maintainability and performance.");
  }

  if (["sap-sac-scripting", "sap-sac-planning"].includes(pluginName) && textLower.includes("console.log(")) {
    warnings.push("Remove or gate console.log statements before production deployment.");
  }

  if (looksLikeCustomWidgetContent(textLower, filePathLower)) {
    warnings.push(...detectCustomWidgetGenerationWarnings(text, textLower, filePathLower));

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
  const text = getContentText(toolInput);
  const textLower = text.toLowerCase();

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
        permissionDecision: "deny",
        permissionDecisionReason: "High-risk SAP content detected; user confirmation is required before this write can proceed.",
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
    const warnings = detectWarnings(pluginName, text, textLower, filePathLower);
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
