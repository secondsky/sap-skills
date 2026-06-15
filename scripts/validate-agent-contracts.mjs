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
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

for (const file of walk(pluginsRoot).filter((item) => /\/agents\/[^/]+\.md$/.test(item))) {
  const rel = path.relative(repoRoot, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");
  if (!hasAny(text, [/## When to Delegate/i, /Use this agent/i, /Core Responsibilities/i])) {
    errors.push(`${rel}: agent must describe when to delegate/use it`);
  }
  if (!hasAny(text, [/## First Checks/i, /Step 1/i, /Workflow/i, /Process/i, /Approach/i, /Core Responsibilities/i])) {
    errors.push(`${rel}: agent must define first checks or workflow`);
  }
  if (!hasAny(text, [/MCP Fallback/i, /fallback/i, /If MCP/i])) {
    errors.push(`${rel}: agent must define MCP/tool fallback behavior`);
  }
  if (!hasAny(text, [/Safety Constraints/i, /Do not/i, /explicit user approval/i])) {
    errors.push(`${rel}: agent must define safety constraints`);
  }
  if (!hasAny(text, [/## Output/i, /Return:/i, /Expected output/i, /Deliverable/i, /Provide\b/i, /Response Format/i, /Format:/i])) {
    errors.push(`${rel}: agent must define output format`);
  }
}

if (errors.length > 0) {
  console.error("Agent contract validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Agent contract validation passed.");
