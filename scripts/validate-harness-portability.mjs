#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  frontmatterList,
  parseFrontmatter,
  readText,
  relPath,
  repoRootFrom,
  walk,
} from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const pluginsRoot = path.join(repoRoot, "plugins");
const portabilityGuide = path.join(repoRoot, "docs/contributor-guide/multi-harness-portability.md");
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${relPath(repoRoot, file)}: ${error.message}`);
    return null;
  }
}

function validatePortabilityGuide() {
  const text = readText(portabilityGuide);
  if (!text) {
    fail("docs/contributor-guide/multi-harness-portability.md: missing portability guide");
    return;
  }

  for (const required of ["Claude", "Codex", "OpenCode", "agents", "hooks", "MCP", "LSP", "allowed-tools"]) {
    if (!text.includes(required)) {
      fail(`docs/contributor-guide/multi-harness-portability.md: must explain ${required} portability`);
    }
  }
}

function validateFrontmatterPreapproval() {
  const markdownActivationFiles = walk(pluginsRoot).filter((item) =>
    /\/commands\/[^/]+\.md$/.test(item)
    || /\/agents\/[^/]+\.md$/.test(item)
    || /\/skills\/[^/]+\/SKILL\.md$/.test(item)
  );

  for (const file of markdownActivationFiles) {
    const text = readText(file);
    const frontmatter = parseFrontmatter(text).raw;
    const tools = new Set([
      ...frontmatterList(frontmatter, "allowed-tools"),
      ...frontmatterList(frontmatter, "tools"),
    ]);
    for (const tool of ["Write", "Edit", "MultiEdit"]) {
      if (tools.has(tool)) {
        fail(`${relPath(repoRoot, file)}: frontmatter must not preapprove ${tool}; require explicit user confirmation instead`);
      }
    }
  }
}

function validateHookPaths() {
  for (const file of walk(pluginsRoot).filter((item) => item.endsWith("/hooks/hooks.json"))) {
    const config = readJson(file);
    if (!config) continue;

    for (const [eventName, groups] of Object.entries(config.hooks ?? {})) {
      if (!Array.isArray(groups)) {
        fail(`${relPath(repoRoot, file)}: hooks.${eventName} must be an array`);
        continue;
      }
      for (const group of groups) {
        if (!group || typeof group !== "object" || Array.isArray(group)) {
          fail(`${relPath(repoRoot, file)}: hooks.${eventName} entries must be objects`);
          continue;
        }
        if (group.hooks !== undefined && !Array.isArray(group.hooks)) {
          fail(`${relPath(repoRoot, file)}: hooks.${eventName} entries must define hooks as an array`);
          continue;
        }
        for (const hook of group.hooks ?? []) {
          if (hook.command !== "${CLAUDE_PLUGIN_ROOT}/hooks/dispatch.sh") {
            fail(`${relPath(repoRoot, file)}: hook commands must use \${CLAUDE_PLUGIN_ROOT}/hooks/dispatch.sh`);
          }
        }
      }
    }
  }
}

function validateMcpShape() {
  for (const file of walk(pluginsRoot).filter((item) => item.endsWith("/.mcp.json"))) {
    const config = readJson(file);
    if (!config) continue;

    if (Object.hasOwn(config, "mcpServers")) {
      fail(`${relPath(repoRoot, file)}: keep dedicated top-level server-map shape; do not wrap servers in mcpServers`);
    }

    for (const [serverName, serverConfig] of Object.entries(config)) {
      if (!serverConfig || typeof serverConfig !== "object" || Array.isArray(serverConfig)) {
        fail(`${relPath(repoRoot, file)}:${serverName}: server config must be an object`);
        continue;
      }
      if (typeof serverConfig.command !== "string" || serverConfig.command.length === 0) {
        fail(`${relPath(repoRoot, file)}:${serverName}: server config must include command`);
      }
      if (!Array.isArray(serverConfig.args)) {
        fail(`${relPath(repoRoot, file)}:${serverName}: server config must include args array`);
      }
      if (serverConfig.env && (typeof serverConfig.env !== "object" || Array.isArray(serverConfig.env))) {
        fail(`${relPath(repoRoot, file)}:${serverName}: env must be an object when present`);
      }
    }
  }
}

function validateClaudeRootScope() {
  for (const file of walk(pluginsRoot)) {
    const rel = relPath(repoRoot, file);
    const text = readText(file);
    if (!text.includes("${CLAUDE_PLUGIN_ROOT}")) continue;

    const allowed = /\/hooks\/hooks\.json$/.test(rel) || /\/\.mcp\.json$/.test(rel) || /\/\.lsp\.json$/.test(rel);
    if (!allowed) {
      fail(`${rel}: \${CLAUDE_PLUGIN_ROOT} is only allowed in Claude hook/MCP/LSP activation files`);
    }
  }
}

validatePortabilityGuide();
validateFrontmatterPreapproval();
validateHookPaths();
validateMcpShape();
validateClaudeRootScope();

if (errors.length > 0) {
  console.error("Harness portability validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Harness portability validation passed.");
