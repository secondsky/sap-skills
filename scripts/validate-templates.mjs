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

function stripPlaceholders(text) {
  return text.replace(/\{\{[^}]+\}\}/g, "PLACEHOLDER").replace(/\$\{[^}]+\}/g, "PLACEHOLDER");
}

function looksLikeSecret(text) {
  return /\b(password|client_secret|api[_-]?key|access[_-]?token)\b\s*[:=]\s*["'](?!\$\{|\{\{|PLACEHOLDER|your-|your_|changeme|example|dummy)[^"']{8,}["']/i.test(text);
}

for (const file of walk(pluginsRoot).filter((item) => item.includes("/templates/"))) {
  const rel = path.relative(repoRoot, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");
  if (looksLikeSecret(text)) {
    errors.push(`${rel}: template appears to contain a literal secret`);
  }
  if (file.endsWith(".json")) {
    try {
      JSON.parse(stripPlaceholders(text));
    } catch (error) {
      errors.push(`${rel}: invalid JSON template after placeholder normalization: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Template validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Template validation passed.");
