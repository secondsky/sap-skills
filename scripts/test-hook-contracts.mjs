#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const pluginsRoot = path.join(repoRoot, "plugins");
const errors = [];

function fail(message) {
  errors.push(message);
}

function hookDirs() {
  return fs.readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(pluginsRoot, entry.name, "hooks"))
    .filter((dir) => fs.existsSync(path.join(dir, "hooks.json")) && fs.existsSync(path.join(dir, "dispatch.sh")));
}

function runHook(dir, payload) {
  return spawnSync(path.join(dir, "dispatch.sh"), {
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
        if (hook.command !== "./hooks/dispatch.sh") fail(`${rel}: hook command must use ./hooks/dispatch.sh`);
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
}

if (errors.length > 0) {
  console.error("Hook contract tests failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Hook contract tests passed for ${hookDirs().length} hook-enabled plugin(s).`);
