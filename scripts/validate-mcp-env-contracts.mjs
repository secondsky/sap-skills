#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { repoRootFrom } from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const inventoryPath = path.join(repoRoot, "plugins/sap-dependency-security/skills/sap-dependency-security/references/sap-mcp-inventory.json");
const pluginsRoot = path.join(repoRoot, "plugins");
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${path.relative(repoRoot, file)}: ${error.message}`);
    return null;
  }
}

function npmSpecParts(spec) {
  if (spec.startsWith("@")) {
    const slashIndex = spec.indexOf("/");
    const versionIndex = spec.indexOf("@", slashIndex + 1);
    return versionIndex === -1 ? { name: spec, version: null } : { name: spec.slice(0, versionIndex), version: spec.slice(versionIndex + 1) };
  }
  const versionIndex = spec.indexOf("@");
  return versionIndex === -1 ? { name: spec, version: null } : { name: spec.slice(0, versionIndex), version: spec.slice(versionIndex + 1) };
}

function firstNpxPackageArg(args) {
  return args.find((arg) => typeof arg === "string" && !arg.startsWith("-"));
}

function listMcpFiles() {
  return fs.readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(pluginsRoot, entry.name, ".mcp.json"))
    .filter((file) => fs.existsSync(file));
}

function literalSecret(value) {
  if (typeof value !== "string") return false;
  if (/^\$\{[A-Z0-9_]+(?::-[^}]*)?\}$/.test(value)) return false;
  if (/^(true|false|source-commit)$/i.test(value)) return false;
  return value.length > 0;
}

function validateContract(relPath, serverName, serverConfig, policy) {
  const env = serverConfig.env && typeof serverConfig.env === "object" ? serverConfig.env : {};
  const argsText = JSON.stringify(Array.isArray(serverConfig.args) ? serverConfig.args : []);
  const contract = policy.envContract;
  if (!Array.isArray(contract)) {
    fail(`${relPath}:${serverName}: inventory entry must define envContract array`);
    return;
  }

  const contractByName = new Map(contract.map((item) => [item.name, item]));
  for (const [name, value] of Object.entries(env)) {
    const item = contractByName.get(name);
    if (!item) {
      fail(`${relPath}:${serverName}: ${name} appears in .mcp.json but not envContract`);
      continue;
    }
    if (item.secret === true && literalSecret(value)) {
      fail(`${relPath}:${serverName}: secret env ${name} must use a placeholder, not a literal value`);
    }
  }

  for (const item of contract) {
    if (!item.name || typeof item.secret !== "boolean" || typeof item.required !== "boolean" || !item.format || !item.access) {
      fail(`${relPath}:${serverName}: envContract entries need name, secret, required, format, and access`);
    }
    const appearsInEnv = item.name in env;
    const appearsInArgs = argsText.includes(`\${${item.name}}`);
    if (item.required && !appearsInEnv && !appearsInArgs) {
      fail(`${relPath}:${serverName}: required env ${item.name} is missing from .mcp.json`);
    }
  }
}

const inventory = readJson(inventoryPath);
if (!inventory) process.exit(1);

for (const mcpFile of listMcpFiles()) {
  const relPath = path.relative(repoRoot, mcpFile).replaceAll(path.sep, "/");
  const config = readJson(mcpFile);
  if (!config) continue;

  for (const [serverName, serverConfig] of Object.entries(config)) {
    if (serverConfig.command === "npx") {
      const packageSpec = firstNpxPackageArg(Array.isArray(serverConfig.args) ? serverConfig.args : []);
      const { name } = npmSpecParts(packageSpec ?? "");
      const policy = inventory.npmPackages?.[name];
      if (!policy) {
        fail(`${relPath}:${serverName}: no MCP inventory entry for ${name}`);
        continue;
      }
      validateContract(relPath, serverName, serverConfig, policy);
    } else if (["node", "powershell.exe"].includes(serverConfig.command)) {
      const key = `${relPath}:${serverName}`;
      const policy = inventory.sourceServers?.[key];
      if (!policy) {
        fail(`${key}: no source MCP inventory entry`);
        continue;
      }
      validateContract(relPath, serverName, serverConfig, policy);
    }
  }
}

if (errors.length > 0) {
  console.error("MCP env contract validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("MCP env contract validation passed.");
