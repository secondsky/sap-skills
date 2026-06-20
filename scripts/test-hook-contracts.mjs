#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { repoRootFrom } from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const pluginsRoot = path.join(repoRoot, "plugins");
const fixtureRoot = path.join(repoRoot, "tests/fixtures/hooks");
const errors = [];

function fail(message) {
  errors.push(message);
}

function hookDirs() {
  return fs.readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(pluginsRoot, entry.name, "hooks"))
    .filter((dir) => fs.existsSync(path.join(dir, "hooks.json")) && fs.existsSync(path.join(dir, "validator.mjs")));
}

function runHook(dir, payload) {
  return spawnSync("node", [path.join(dir, "validator.mjs")], {
    input: payload,
    encoding: "utf8",
    timeout: 5000,
    cwd: repoRoot,
  });
}

function assertJsonObject(name, result) {
  if (result.error) {
    fail(`${name}: ${result.error.message}`);
    return null;
  }
  if (result.status !== 0) {
    fail(`${name}: expected exit 0, got ${result.status}; stderr=${result.stderr.trim()}`);
    return null;
  }
  try {
    const parsed = JSON.parse(result.stdout.trim() || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      fail(`${name}: output must be a JSON object`);
      return null;
    }
    return parsed;
  } catch (error) {
    fail(`${name}: output is not JSON: ${error.message}`);
    return null;
  }
}

function assertEmptyObject(name, parsed) {
  if (parsed && Object.keys(parsed).length !== 0) {
    fail(`${name}: expected empty JSON object`);
  }
}

function assertNonEmptyObject(name, parsed) {
  if (parsed && Object.keys(parsed).length === 0) {
    fail(`${name}: expected fixture to trigger hook output`);
  }
}

function assertDenyForBlockingPreToolUse(name, payloadText, parsed) {
  if (!parsed) return;

  let payload;
  try {
    payload = JSON.parse(payloadText);
  } catch {
    return;
  }

  if (payload.hook_event_name !== "PreToolUse" || payload.tool_name === "Bash") {
    return;
  }

  const decision = parsed.hookSpecificOutput?.permissionDecision;
  if (decision !== "deny") {
    fail(`${name}: blocking PreToolUse fixture must return hookSpecificOutput.permissionDecision=deny`);
  }
  const reason = parsed.hookSpecificOutput?.permissionDecisionReason;
  if (typeof reason !== "string" || reason.trim().length === 0) {
    fail(`${name}: blocking PreToolUse fixture must return a non-empty hookSpecificOutput.permissionDecisionReason`);
  }
}

function preToolUseVariants(payloadText) {
  let payload;
  try {
    payload = JSON.parse(payloadText);
  } catch {
    return [];
  }

  if (payload.hook_event_name !== "PreToolUse" || payload.tool_name === "Bash") {
    return [];
  }

  return ["Write", "Edit", "MultiEdit"].map((toolName) => [
    toolName,
    JSON.stringify({ ...payload, tool_name: toolName }),
  ]);
}

function postToolUseVariant(payloadText) {
  let payload;
  try {
    payload = JSON.parse(payloadText);
  } catch {
    return null;
  }

  if (payload.hook_event_name !== "PreToolUse" || payload.tool_name === "Bash") {
    return null;
  }

  return JSON.stringify({ ...payload, hook_event_name: "PostToolUse" });
}

function assertNoDenyForPostToolUse(name, parsed) {
  if (!parsed) return;

  const decision = parsed.hookSpecificOutput?.permissionDecision;
  if (decision !== undefined) {
    fail(`${name}: PostToolUse output must not include hookSpecificOutput.permissionDecision`);
  }
}

const irrelevantPayload = JSON.stringify({
  hook_event_name: "PreToolUse",
  tool_name: "Read",
  tool_input: {
    file_path: "README.md",
    content: "const password = \"super-secret-value\";",
  },
});

const malformedPayload = "{";
const secretPayload = JSON.stringify({
  hook_event_name: "PreToolUse",
  tool_name: "Write",
  tool_input: {
    file_path: "webapp/controller/Main.controller.js",
    content: "sap.ui.define([], function () { const password = \"super-secret-value\"; });",
  },
});

for (const dir of hookDirs()) {
  const plugin = path.basename(path.dirname(dir));
  const rel = path.relative(repoRoot, dir).replaceAll(path.sep, "/");

  const hooksConfig = JSON.parse(fs.readFileSync(path.join(dir, "hooks.json"), "utf8"));
  for (const [eventName, groups] of Object.entries(hooksConfig.hooks ?? {})) {
    if (!Array.isArray(groups)) fail(`${rel}: ${eventName} must be an array`);
    for (const group of groups ?? []) {
      if (!group.matcher || typeof group.matcher !== "string") fail(`${rel}: hook matcher must be a string`);
      for (const hook of group.hooks ?? []) {
        if (hook.type !== "command") fail(`${rel}: hook type must be command`);
        if (hook.command !== "node") {
          fail(`${rel}: hook command must use node`);
        }
        if (!Array.isArray(hook.args) || hook.args.length !== 1 || hook.args[0] !== "${CLAUDE_PLUGIN_ROOT}/hooks/validator.mjs") {
          fail(`${rel}: hook args must use \${CLAUDE_PLUGIN_ROOT}/hooks/validator.mjs`);
        }
        if (!Number.isInteger(hook.timeout) || hook.timeout < 1 || hook.timeout > 60) fail(`${rel}: hook timeout must be 1-60 seconds`);
      }
    }
  }

  const irrelevant = assertJsonObject(`${plugin} irrelevant input`, runHook(dir, irrelevantPayload));
  if (irrelevant && Object.keys(irrelevant).length !== 0) {
    fail(`${plugin}: irrelevant Read payload should no-op with {}`);
  }

  assertJsonObject(`${plugin} malformed input`, runHook(dir, malformedPayload));
  const secret = assertJsonObject(`${plugin} secret-looking input`, runHook(dir, secretPayload));
  if (secret && JSON.stringify(secret).includes("super-secret-value")) {
    fail(`${plugin}: hook output must not echo raw secret-looking literals`);
  }

  const pluginFixtureDir = path.join(fixtureRoot, plugin);
  for (const fixtureName of ["positive.json", "negative.json", "malformed.json"]) {
    if (!fs.existsSync(path.join(pluginFixtureDir, fixtureName))) {
      fail(`${plugin}: missing hook fixture tests/fixtures/hooks/${plugin}/${fixtureName}`);
    }
  }

  if (fs.existsSync(pluginFixtureDir)) {
    const positivePayload = fs.readFileSync(path.join(pluginFixtureDir, "positive.json"), "utf8");
    const positive = assertJsonObject(`${plugin} positive fixture`, runHook(dir, positivePayload));
    assertNonEmptyObject(`${plugin} positive fixture`, positive);
    assertDenyForBlockingPreToolUse(`${plugin} positive fixture`, positivePayload, positive);
    for (const [toolName, variantPayload] of preToolUseVariants(positivePayload)) {
      const variant = assertJsonObject(`${plugin} positive ${toolName} fixture`, runHook(dir, variantPayload));
      assertNonEmptyObject(`${plugin} positive ${toolName} fixture`, variant);
      assertDenyForBlockingPreToolUse(`${plugin} positive ${toolName} fixture`, variantPayload, variant);
    }
    if (Object.hasOwn(hooksConfig.hooks ?? {}, "PostToolUse")) {
      const postPayload = postToolUseVariant(positivePayload);
      if (postPayload) {
        const post = assertJsonObject(`${plugin} positive PostToolUse fixture`, runHook(dir, postPayload));
        assertNoDenyForPostToolUse(`${plugin} positive PostToolUse fixture`, post);
      }
    }
    const negative = assertJsonObject(`${plugin} negative fixture`, runHook(dir, fs.readFileSync(path.join(pluginFixtureDir, "negative.json"), "utf8")));
    assertEmptyObject(`${plugin} negative fixture`, negative);
    assertJsonObject(`${plugin} malformed fixture`, runHook(dir, fs.readFileSync(path.join(pluginFixtureDir, "malformed.json"), "utf8")));

    for (const fixtureName of fs.readdirSync(pluginFixtureDir).filter((name) => /^positive-.+\.json$/.test(name)).sort()) {
      const fixturePath = path.join(pluginFixtureDir, fixtureName);
      const payloadText = fs.readFileSync(fixturePath, "utf8");
      const parsed = assertJsonObject(`${plugin} ${fixtureName}`, runHook(dir, payloadText));
      assertNonEmptyObject(`${plugin} ${fixtureName}`, parsed);
      assertDenyForBlockingPreToolUse(`${plugin} ${fixtureName}`, payloadText, parsed);
      try {
        if (JSON.parse(payloadText).hook_event_name === "PostToolUse") {
          assertNoDenyForPostToolUse(`${plugin} ${fixtureName}`, parsed);
        }
      } catch {
        // Malformed fixtures are covered separately.
      }
    }

    for (const fixtureName of fs.readdirSync(pluginFixtureDir).filter((name) => /^negative-.+\.json$/.test(name)).sort()) {
      const fixturePath = path.join(pluginFixtureDir, fixtureName);
      const parsed = assertJsonObject(`${plugin} ${fixtureName}`, runHook(dir, fs.readFileSync(fixturePath, "utf8")));
      assertEmptyObject(`${plugin} ${fixtureName}`, parsed);
    }
  }
}

if (errors.length > 0) {
  console.error("Hook contract tests failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Hook contract tests passed for ${hookDirs().length} hook-enabled plugin(s).`);
