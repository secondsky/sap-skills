#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const commandsRoot = path.join(repoRoot, "plugins");
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

function section(text, heading) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return "";
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  return match ? match[1] : "";
}

function canWrite(text) {
  const fm = frontmatter(text);
  const allowedTools = fm.match(/^allowed-tools:\n([\s\S]*?)(?=^[A-Za-z][A-Za-z0-9_-]*:|\z)/m)?.[1] ?? "";
  return /^\s+-\s+(Write|Edit|MultiEdit)\b/m.test(allowedTools);
}

for (const file of walk(commandsRoot).filter((item) => /\/commands\/[^/]+\.md$/.test(item))) {
  const rel = path.relative(repoRoot, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");
  const contract = section(text, "Output Contract");
  if (!contract) {
    errors.push(`${rel}: missing ## Output Contract`);
    continue;
  }

  if (!/\b(Return|Expected output|Output)\b/i.test(contract)) {
    errors.push(`${rel}: output contract must describe returned output`);
  }
  const hasDefaultBoundary = /\b(read-only|analysis-only|do not modify|do not change|do not apply|do not create|Default to read-only|plan only|planning unless|before writes|confirmation points|explicitly asks|explicitly requested|Ask before|Do not edit unless)\b/i.test(text);
  if (!hasDefaultBoundary && canWrite(text)) {
    errors.push(`${rel}: command must state read-only or plan-only default behavior`);
  }

  const mutationName = /(generate|template|fix|setup|scaffold|convert)/i.test(path.basename(file, ".md"));
  if (mutationName && canWrite(text) && !/\b(plan only|planning unless|explicit user approval|explicitly asks|explicitly requested|do not apply|Do not edit unless|proposed changes|dry-run|before writes|confirmation points|confirm before|Ask before)\b/i.test(text)) {
    errors.push(`${rel}: mutating/generation command must default to planning or require explicit approval`);
  }
}

if (errors.length > 0) {
  console.error("Command contract validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Command contract validation passed.");
