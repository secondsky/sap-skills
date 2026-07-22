#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { repoRootFrom } from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const pluginsRoot = path.join(repoRoot, "plugins");
const ledgerPath = path.join(repoRoot, "docs/project/source-verification-ledger.json");
const allowedEvidenceTypes = new Set([
  "public_docs",
  "package_registry",
  "live_tenant",
  "live_system",
  "source_repo",
  "archival_status",
  "audit_only_pending",
]);
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

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  return match ? match[1] : "";
}

function metadataValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^  ${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, "m"));
  return match ? match[1].trim() : "";
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
}

const ledger = readJson(ledgerPath);
if (!ledger) process.exit(1);

const entries = new Map();
for (const entry of ledger.entries ?? []) {
  if (!entry.plugin) {
    fail("Ledger entry is missing plugin");
    continue;
  }
  if (entries.has(entry.plugin)) {
    fail(`docs/project/source-verification-ledger.json: duplicate entry for ${entry.plugin}`);
  }
  entries.set(entry.plugin, entry);

  if (!validDate(entry.supportedLastVerified)) {
    fail(`${entry.plugin}: supportedLastVerified must be YYYY-MM-DD`);
  }
  if (!validDate(entry.evidenceDate)) {
    fail(`${entry.plugin}: evidenceDate must be YYYY-MM-DD`);
  }
  if (!allowedEvidenceTypes.has(entry.evidenceType)) {
    fail(`${entry.plugin}: unsupported evidenceType '${entry.evidenceType}'`);
  }
  if (!entry.scope || entry.scope.length < 30) {
    fail(`${entry.plugin}: scope must describe what the evidence covers and excludes`);
  }
  if (!entry.source || !fs.existsSync(path.join(repoRoot, entry.source))) {
    fail(`${entry.plugin}: source must point to an existing repository evidence artifact`);
  }
  if (["public_docs", "package_registry", "source_repo", "archival_status", "audit_only_pending"].includes(entry.evidenceType)) {
    if (/\blive tenant verified\b|\blive system verified\b|\bproduction verified\b/i.test(entry.scope)) {
      fail(`${entry.plugin}: non-live evidence must not claim live tenant/system verification`);
    }
  }
}

const pluginNames = fs.readdirSync(pluginsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const pluginName of pluginNames) {
  const skillFile = path.join(pluginsRoot, pluginName, "skills", pluginName, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    fail(`${pluginName}: missing SKILL.md`);
    continue;
  }

  const frontmatter = parseFrontmatter(fs.readFileSync(skillFile, "utf8"));
  const lastVerified = metadataValue(frontmatter, "last_verified");
  if (!lastVerified) {
    fail(`${pluginName}: SKILL.md missing metadata.last_verified`);
    continue;
  }

  const entry = entries.get(pluginName);
  if (!entry) {
    fail(`${pluginName}: missing verification ledger entry`);
    continue;
  }

  if (lastVerified !== entry.supportedLastVerified) {
    fail(
      `${pluginName}: SKILL.md metadata.last_verified ${lastVerified} does not match ledger supportedLastVerified ${entry.supportedLastVerified}`,
    );
  }
}

for (const pluginName of entries.keys()) {
  if (!pluginNames.includes(pluginName)) {
    fail(`${pluginName}: ledger entry has no matching plugin directory`);
  }
}

if (errors.length > 0) {
  console.error("Verification ledger validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verification ledger validation passed for ${pluginNames.length} plugin(s).`);
