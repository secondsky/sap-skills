#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const pluginsRoot = path.join(repoRoot, "plugins");
const provenanceLabels = [
  "Official source excerpt",
  "Derived summary",
  "Synthetic example",
  "Tenant-specific example",
  "Historical/archived",
  "Vendored; excluded from content review",
  "Official Sources",
  "Sources",
  "Documentation Source",
  "Source",
];
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

for (const file of walk(pluginsRoot).filter((item) => item.includes("/references/"))) {
  const rel = path.relative(repoRoot, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");
  if (!provenanceLabels.some((label) => text.includes(label))) {
    warnings.push(`${rel}: reference should include a source/provenance marker in a future manual pass`);
  }
  if (/READY FOR PRODUCTION|100% Compliant/i.test(text)) {
    errors.push(`${rel}: unsupported production/compliance claim requires explicit evidence`);
  }
}

if (errors.length > 0) {
  console.error("Reference provenance validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

console.log("Reference provenance validation passed.");
