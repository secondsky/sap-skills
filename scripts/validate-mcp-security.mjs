#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  readText,
  relPath,
  repoRootFrom,
  walk,
} from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const inventoryPath = path.join(
  repoRoot,
  "plugins/sap-dependency-security/skills/sap-dependency-security/references/sap-mcp-inventory.json",
);
const pluginsDir = path.join(repoRoot, "plugins");
const allowedOperationClasses = new Set([
  "local-only",
  "read-only tenant",
  "mutating tenant",
  "destructive",
]);

const errors = [];
const referencedPackages = new Set();
const referencedSources = new Set();

function fail(message) {
  errors.push(message);
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${path.relative(repoRoot, filePath)}: ${error.message}`);
    return null;
  }
}

function listMcpFiles() {
  const files = [];
  for (const entry of readdirSync(pluginsDir)) {
    const pluginPath = path.join(pluginsDir, entry);
    if (!statSync(pluginPath).isDirectory()) continue;
    const mcpPath = path.join(pluginPath, ".mcp.json");
    try {
      if (statSync(mcpPath).isFile()) files.push(mcpPath);
    } catch {
      // Plugin has no MCP config.
    }
  }
  return files;
}

function npmSpecParts(spec) {
  if (spec.startsWith("@")) {
    const slashIndex = spec.indexOf("/");
    const versionIndex = spec.indexOf("@", slashIndex + 1);
    if (slashIndex === -1 || versionIndex === -1) {
      return { name: spec, version: null };
    }
    return {
      name: spec.slice(0, versionIndex),
      version: spec.slice(versionIndex + 1),
    };
  }

  const versionIndex = spec.indexOf("@");
  if (versionIndex === -1) return { name: spec, version: null };
  return {
    name: spec.slice(0, versionIndex),
    version: spec.slice(versionIndex + 1),
  };
}

function firstNpxPackageArg(args) {
  return args.find((arg) => typeof arg === "string" && !arg.startsWith("-"));
}

function validateOperationPolicy(label, policy) {
  if (!Array.isArray(policy.operationClasses) || policy.operationClasses.length === 0) {
    fail(`${label}: inventory entry must define non-empty operationClasses`);
    return;
  }

  for (const operationClass of policy.operationClasses) {
    if (!allowedOperationClasses.has(operationClass)) {
      fail(`${label}: unsupported operation class '${operationClass}'`);
    }
  }

  if (typeof policy.approvalRequired !== "boolean") {
    fail(`${label}: inventory entry must define approvalRequired boolean`);
  }

  if (
    policy.operationClasses.some((operationClass) => ["mutating tenant", "destructive"].includes(operationClass))
    && policy.approvalRequired !== true
  ) {
    fail(`${label}: mutating/destructive operation classes require approvalRequired=true`);
  }
}

function validateNpxServer(relPath, serverName, serverConfig, inventory) {
  const args = Array.isArray(serverConfig.args) ? serverConfig.args : [];
  for (const arg of args) {
    if (typeof arg === "string" && arg.includes("@latest")) {
      fail(`${relPath}:${serverName}: MCP package arguments must not use @latest`);
    }
  }

  const packageSpec = firstNpxPackageArg(args);
  if (!packageSpec) {
    fail(`${relPath}:${serverName}: npx MCP server has no package argument`);
    return;
  }

  const { name, version } = npmSpecParts(packageSpec);
  const packagePolicy = inventory.npmPackages?.[name];
  if (!packagePolicy) {
    fail(`${relPath}:${serverName}: unknown MCP npm package ${name}`);
    return;
  }

  referencedPackages.add(name);
  validateOperationPolicy(`${relPath}:${serverName}`, packagePolicy);

  if (!version) {
    fail(`${relPath}:${serverName}: ${name} must be exact-pinned, found bare package`);
    return;
  }

  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
    fail(`${relPath}:${serverName}: ${packageSpec} is not an exact semver pin`);
  }

  if (version !== packagePolicy.approvedVersion) {
    fail(
      `${relPath}:${serverName}: ${name} is pinned to ${version}, expected ${packagePolicy.approvedVersion}`,
    );
  }
}

function validateSourceServer(relPath, serverName, serverConfig, inventory) {
  const sourceKey = `${relPath}:${serverName}`;
  const sourcePolicy = inventory.sourceServers?.[sourceKey];
  if (!sourcePolicy) {
    fail(`${sourceKey}: local-source MCP server is missing from SAP MCP inventory`);
    return;
  }

  referencedSources.add(sourceKey);
  validateOperationPolicy(sourceKey, sourcePolicy);

  const expectedCommand = sourcePolicy.command ?? "node";
  if (serverConfig.command !== expectedCommand) {
    fail(`${sourceKey}: local-source MCP command must be ${expectedCommand}`);
  }

  const args = Array.isArray(serverConfig.args) ? serverConfig.args : [];
  const env = serverConfig.env && typeof serverConfig.env === "object" ? serverConfig.env : {};
  const expectedPathToken = `\${${sourcePolicy.pathEnv}}`;
  const commandPath = args.find((arg) => typeof arg === "string" && arg.includes(expectedPathToken));

  if (!commandPath) {
    fail(`${sourceKey}: local-source MCP command must reference ${expectedPathToken}`);
  }

  if (env[sourcePolicy.commitEnv] !== sourcePolicy.commit) {
    fail(`${sourceKey}: ${sourcePolicy.commitEnv} must equal ${sourcePolicy.commit}`);
  }

  if (expectedCommand === "powershell.exe") {
    const requiredPrefix = ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File"];
    if (args.length !== requiredPrefix.length + 1 || requiredPrefix.some((arg, index) => args[index] !== arg)) {
      fail(`${sourceKey}: PowerShell MCP bootstrap must use the exact non-interactive file invocation`);
    }
    const expectedLauncher = `\${${sourcePolicy.pathEnv}}/${sourcePolicy.launcherPath}`;
    if (args.at(-1) !== expectedLauncher) {
      fail(`${sourceKey}: PowerShell MCP bootstrap must reference ${expectedLauncher}`);
    }
  }
}

const inventory = readJson(inventoryPath);
if (!inventory) process.exit(1);

for (const mcpPath of listMcpFiles()) {
  const relPath = path.relative(repoRoot, mcpPath).replaceAll(path.sep, "/");
  const config = readJson(mcpPath);
  if (!config) continue;

  for (const [serverName, serverConfig] of Object.entries(config)) {
    if (!serverConfig || typeof serverConfig !== "object") {
      fail(`${relPath}:${serverName}: server config must be an object`);
      continue;
    }

    if (serverConfig.command === "npx") {
      validateNpxServer(relPath, serverName, serverConfig, inventory);
    } else if (["node", "powershell.exe"].includes(serverConfig.command)) {
      validateSourceServer(relPath, serverName, serverConfig, inventory);
    } else {
      fail(`${relPath}:${serverName}: unsupported MCP command ${serverConfig.command}`);
    }
  }
}

for (const packageName of Object.keys(inventory.npmPackages ?? {})) {
  if (!referencedPackages.has(packageName)) {
    fail(`SAP MCP inventory package is stale or unused: ${packageName}`);
  }
}

for (const sourceKey of Object.keys(inventory.sourceServers ?? {})) {
  if (!referencedSources.has(sourceKey)) {
    fail(`SAP MCP inventory source entry is stale or unused: ${sourceKey}`);
  }
}

for (const file of listMcpDocs()) {
  validateMcpDoc(file);
}

function listMcpDocs() {
  return walk(pluginsDir).filter((file) => {
    const rel = relPath(repoRoot, file);
    return /\/commands\/[^/]*mcp[^/]*\.md$/i.test(rel)
      || /\/references\/[^/]*mcp[^/]*\.md$/i.test(rel);
  });
}

function validateMcpDoc(file) {
  const rel = relPath(repoRoot, file);
  const text = readText(file);
  const hasOperationClass = [...allowedOperationClasses].some((operationClass) => text.includes(operationClass));
  if (!hasOperationClass) {
    fail(`${rel}: MCP docs must classify operation safety as local-only, read-only tenant, mutating tenant, or destructive`);
  }

  const tenantMutationTerms = /\b(create|update|delete|drop|deploy|publish|execute|start|stop|trigger|revoke|assign|unassign|reset)\b/i;
  if (tenantMutationTerms.test(text) && !/\b(explicit (?:user )?(?:approval|confirmation)|confirm before|approval required|do not .*without explicit)\b/i.test(text)) {
    fail(`${rel}: MCP docs with mutating/destructive terms must require explicit user approval`);
  }

  if (/\b(tenant|credential|token|secret|destination|OAuth)\b/i.test(text) && !/\b(live tenant|tenant-affecting|credentials?|tokens?|secrets?|environment variables?)\b/i.test(text)) {
    fail(`${rel}: MCP docs mentioning tenant or credentials must state tenant/credential safety boundaries`);
  }
}

if (errors.length > 0) {
  console.error("SAP MCP security validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("SAP MCP security validation passed.");
