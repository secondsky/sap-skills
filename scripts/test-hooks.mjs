#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { repoRootFrom } from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const failures = [];

function fail(message, details = "") {
  failures.push({ message, details });
  console.error(`FAIL: ${message}`);
  if (details) console.error(details);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function runHook(plugin, payload) {
  const validator = path.join(repoRoot, "plugins", plugin, "hooks", "validator.mjs");
  const result = spawnSync("node", [validator], {
    input: payload,
    encoding: "utf8",
    timeout: 5000,
    cwd: repoRoot,
  });

  if (result.error) {
    return { output: "", error: result.error.message };
  }

  if (result.status !== 0) {
    return { output: result.stdout, error: `exit ${result.status}: ${result.stderr.trim()}` };
  }

  return { output: result.stdout, error: "" };
}

function assertContains(name, result, needle) {
  if (result.error) {
    fail(name, result.error);
    return;
  }

  if (!result.output.includes(needle)) {
    fail(`${name} did not include expected text: ${needle}`, result.output);
  } else {
    pass(name);
  }
}

function assertEmptyJson(name, result) {
  if (result.error) {
    fail(name, result.error);
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(result.output.trim() || "{}");
  } catch (error) {
    fail(`${name} expected JSON output`, error.message);
    return;
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || Object.keys(parsed).length !== 0) {
    fail(`${name} expected empty JSON object`, result.output);
  } else {
    pass(name);
  }
}

const sqlDeletePayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "db/procedures/cleanup.sql",
    "content": "SELECT * FROM BOOKS WHERE ID = 1; DELETE FROM BOOKS;"
  }
}`;

const sqlUpdatePayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "models/sales.sql",
    "content": "SELECT * FROM SALES WHERE REGION = 'EMEA'; UPDATE SALES SET AMOUNT = 0;"
  }
}`;

const safeSqlPayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "db/procedures/cleanup.sql",
    "content": "DELETE FROM BOOKS WHERE ID = 1;"
  }
}`;

const secretPayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "webapp/controller/Main.controller.js",
    "content": "sap.ui.define([], function () { const password = \\"real-secret-value\\"; });"
  }
}`;

const irrelevantPayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "webapp/controller/Main.controller.js",
    "content": "eval(\\"alert(1)\\");"
  }
}`;

const ui5DeployPayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "ui5 deploy --config ui5-deploy.yaml"
  }
}`;

const dependencyLatestPayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "plugins/sapui5/.mcp.json",
    "content": "{\\"ui5-tooling\\":{\\"command\\":\\"npx\\",\\"args\\":[\\"-y\\",\\"@ui5/mcp-server@latest\\"]}}"
  }
}`;

const dependencyBarePayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "plugins/sap-hana-cli/.mcp.json",
    "content": "{\\"hana-mcp-server\\":{\\"command\\":\\"npx\\",\\"args\\":[\\"-y\\",\\"hana-mcp-server\\"]}}"
  }
}`;

const dependencySecretPayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "plugins/sap-datasphere/.mcp.json",
    "content": "{\\"sap-datasphere\\":{\\"command\\":\\"npx\\",\\"args\\":[\\"-y\\",\\"@mariodefe/sap-datasphere-mcp@1.2.1\\"],\\"env\\":{\\"DATASPHERE_CLIENT_SECRET\\":\\"super-secret-value\\"}}}"
  }
}`;

const dependencySafePayload = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "plugins/sapui5/.mcp.json",
    "content": "{\\"ui5-tooling\\":{\\"command\\":\\"npx\\",\\"args\\":[\\"-y\\",\\"@ui5/mcp-server@0.2.11\\"],\\"env\\":{\\"TOKEN\\":\\"\${TOKEN}\\"}}}"
  }
}`;

const sacHostedWidgetImportPayload = `{
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "webcomponent/widget.json",
    "content": "{\\"id\\":\\"com.company.menunavigation\\",\\"version\\":\\"1.0.0\\",\\"name\\":\\"Menu Navigation\\",\\"vendor\\":\\"Company\\",\\"webcomponents\\":[{\\"kind\\":\\"main\\",\\"tag\\":\\"com-company-menu-navigation\\",\\"url\\":\\"widget.js\\"},{\\"kind\\":\\"builder\\",\\"tag\\":\\"com-company-menu-navigation-builder\\",\\"url\\":\\"builder.js\\"},{\\"kind\\":\\"styling\\",\\"tag\\":\\"com-company-menu-navigation-styling\\",\\"url\\":\\"styling.js\\"}],\\"properties\\":{\\"defaultTileBackground\\":{\\"type\\":\\"Color\\",\\"default\\":\\"#f4f7fa\\"},\\"defaultTextColor\\":{\\"type\\":\\"Color\\",\\"default\\":\\"#1f2937\\"},\\"defaultIconColor\\":{\\"type\\":\\"Color\\",\\"default\\":\\"#2563eb\\"}},\\"methods\\":{},\\"events\\":{}}"
  }
}`;

assertContains("SQLScript DELETE without statement WHERE", runHook("sap-sqlscript", sqlDeletePayload), "DELETE statement appears without WHERE clause");
assertContains("Datasphere UPDATE without statement WHERE", runHook("sap-datasphere", sqlUpdatePayload), "UPDATE statement appears without WHERE clause");
assertEmptyJson("SQLScript DELETE with statement WHERE", runHook("sap-sqlscript", safeSqlPayload));
assertContains("UI5 hardcoded secret", runHook("sapui5", secretPayload), "Hardcoded credential/secret detected");
assertEmptyJson("Irrelevant Read tool ignored", runHook("sapui5", irrelevantPayload));
assertContains("UI5 deploy Bash guidance", runHook("sapui5", ui5DeployPayload), "UI5 deployment command detected");
assertContains("Dependency @latest blocked", runHook("sap-dependency-security", dependencyLatestPayload), "Floating dependency version detected");
assertContains("Dependency bare MCP package blocked", runHook("sap-dependency-security", dependencyBarePayload), "MCP executable is not exact-pinned");
assertContains("Dependency credential literal blocked", runHook("sap-dependency-security", dependencySecretPayload), "Credential-like literal detected");
assertEmptyJson("Dependency exact pin and env placeholder allowed", runHook("sap-dependency-security", dependencySafePayload));
assertContains("SAC-hosted widget import packaging guidance", runHook("sap-sac-custom-widget", sacHostedWidgetImportPayload), "SAC-hosted Resource-ZIP manifests should use root-relative webcomponents[].url values");
assertContains("SAC color property portability guidance", runHook("sap-sac-custom-widget", sacHostedWidgetImportPayload), "Use string properties with hex defaults for simple configurable colors");

function findHookFiles(fileName) {
  return fs.readdirSync(path.join(repoRoot, "plugins"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(repoRoot, "plugins", entry.name, "hooks", fileName))
    .filter((file) => fs.existsSync(file) && !file.includes(`${path.sep}sap-dependency-security${path.sep}`))
    .sort();
}

function assertIdenticalFiles(name, files) {
  const [first, ...rest] = files;
  if (!first) return;

  const expected = fs.readFileSync(first, "utf8");
  for (const file of rest) {
    const actual = fs.readFileSync(file, "utf8");
    if (actual !== expected) {
      fail(`${name} differs from template: ${path.relative(repoRoot, file).replaceAll(path.sep, "/")}`);
    }
  }
}

assertIdenticalFiles("Python hook validator", findHookFiles("validator.py"));
assertIdenticalFiles("Node hook validator", findHookFiles("validator.mjs"));

if (failures.length > 0) {
  console.error(`Hook tests failed: ${failures.length} issue(s).`);
  process.exit(1);
}

console.log("Hook tests passed.");
