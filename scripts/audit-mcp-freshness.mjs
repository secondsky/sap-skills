#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const inventoryPath = path.join(repoRoot, "plugins/sap-dependency-security/skills/sap-dependency-security/references/sap-mcp-inventory.json");
const writeIndex = process.argv.indexOf("--write-evidence");
const writePath = writeIndex === -1 ? null : process.argv[writeIndex + 1];
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const observedAt = new Date().toISOString().slice(0, 10);

function npmLatest(name) {
  const output = execFileSync("npm", ["view", name, "version", "--json"], { encoding: "utf8" }).trim();
  return JSON.parse(output);
}

const rows = [];
const evidence = {
  schemaVersion: 1,
  observedAt,
  collectionMethod: "npm view <package> version --json",
  npm: {},
};

for (const [name, policy] of Object.entries(inventory.npmPackages ?? {})) {
  const latest = writePath ? npmLatest(name) : policy.observedLatest;
  const status = latest === policy.approvedVersion ? "current" : "upgrade_candidate";
  rows.push({ name, approved: policy.approvedVersion, latest, status });
  evidence.npm[name] = {
    latest,
    command: `npm view ${name} version --json`,
    repoApprovedPin: policy.approvedVersion,
    status,
  };
}

console.log("SAP MCP freshness audit");
console.log("=======================");
for (const row of rows) {
  console.log(`${row.name}\tapproved=${row.approved}\tlatest=${row.latest}\t${row.status}`);
}

if (writePath) {
  const target = path.resolve(repoRoot, writePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Wrote evidence to ${path.relative(repoRoot, target)}`);
}
