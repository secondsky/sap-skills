#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const pluginsRoot = path.join(repoRoot, "plugins");
const errors = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

for (const file of walk(pluginsRoot)) {
  const rel = path.relative(repoRoot, file).replaceAll(path.sep, "/");
  const base = path.basename(file);
  if (/VALIDATION_REPORT\.md$/i.test(base)) errors.push(`${rel}: audit validation reports must live under docs/project`);
  if (/(^|[-_])audit([-_]|\.|$)/i.test(base) && rel.endsWith(".md")) errors.push(`${rel}: audit-only markdown must live under docs/project`);
  if (/\.(backup|bak|tmp)$/.test(base) || base.endsWith("~")) errors.push(`${rel}: backup/temp file must not be packaged`);
  if (base === ".DS_Store" || rel.includes("/__pycache__/") || /\.(pyc|pyo)$/.test(base)) errors.push(`${rel}: generated cache artifact must not be packaged`);
  if (/\.local\.md$/i.test(base) && !/\.local\.template\.md$/i.test(base)) errors.push(`${rel}: committed local override must be renamed to an explicit template`);
}

if (errors.length > 0) {
  console.error("Packaging hygiene validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Packaging hygiene validation passed.");
