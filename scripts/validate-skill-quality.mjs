#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  frontmatterMetadata,
  parseFrontmatter,
  readText,
  relPath,
  repoRootFrom,
  stripCodeFences,
  walk,
} from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const pluginsRoot = path.join(repoRoot, "plugins");
const auditReport = path.join(repoRoot, "docs/project/plugin-skills-audit-2026-06-14.md");
const ledgerPath = path.join(repoRoot, "docs/project/source-verification-ledger.json");
const expectedVersion = "2.3.1";
const staleAfterDays = 90;
const allowedSkillRootEntries = new Set([
  "SKILL.md",
  "README.md",
  "references",
  "templates",
  "scripts",
  "assets",
]);
const requiredSkillSections = [
  ["Related Skills", /## Related Skills/i],
  ["When to Use", /## When to Use This Skill|## When to Use/i],
  ["Quick Start or Quick Reference", /## Quick Start|Quick Start Workflow|Quick Reference|Setup Checklist|Quick Decision Tree/i],
  ["Bundled Resources or references", /Bundled Resources|Progressive Disclosure|Reference Add-Ons|references\//i],
  ["Troubleshooting or Common Issues", /Common Issues|Known Issues|Troubleshooting|Error Catalog|Common Error/i],
  ["Source or verification notes", /Official Sources|Sources|Documentation Source|source_docs|documentation_source|sap_help|Source/i],
];

function rel(file) {
  return relPath(repoRoot, file);
}

function metadataValue(frontmatter, key) {
  return frontmatterMetadata(frontmatter, key);
}

function daysSince(dateText, now = new Date()) {
  const parsed = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return Math.floor((today.getTime() - parsed.getTime()) / 86_400_000);
}

function extractBodyMetadata(content) {
  const parsed = parseFrontmatter(content);
  const frontmatterLineCount = content.slice(0, content.length - parsed.body.length).split(/\r?\n/).length - 1;
  const lines = stripCodeFences(parsed.body).split(/\r?\n/);
  const items = [];

  lines.forEach((line, index) => {
    const lineNumber = frontmatterLineCount + index + 1;
    const skillVersion = line.match(/\*\*Skill Version\*\*:\s*([^|*\r\n]+)/i);
    if (skillVersion) {
      items.push({ key: "version", label: "Skill Version", value: normalizedVersion(skillVersion[1]), lineNumber });
    }

    const footerVersion = line.match(/\*\*Version\*\*:\s*([^|*\r\n]+)/i);
    if (footerVersion && /\b(Last Verified|Last Updated|Next Review|Skill Version)\b/i.test(line)) {
      items.push({ key: "version", label: "Version", value: normalizedVersion(footerVersion[1]), lineNumber });
    }

    const lastVerified = line.match(/\*\*Last Verified\*\*:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})|Last Verified[^0-9]*([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
    if (lastVerified) {
      items.push({ key: "last_verified", label: "Last Verified", value: lastVerified[1] || lastVerified[2], lineNumber });
    }
  });

  return items.filter((item) => item.value);
}

function normalizedVersion(value) {
  const match = value.trim().match(/\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?/);
  return match ? match[0] : value.trim();
}

const auditText = fs.existsSync(auditReport) ? fs.readFileSync(auditReport, "utf8") : "";
const ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, "utf8")) : { entries: [] };
const ledgerByPlugin = new Map((ledger.entries ?? []).map((entry) => [entry.plugin, entry]));
const markdownFiles = walk(pluginsRoot).filter((file) => file.endsWith(".md"));
const allPluginFiles = walk(pluginsRoot);
const errors = [];
const warnings = [];

for (const file of markdownFiles) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  let inFence = false;
  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      return;
    }
    if (!inFence && (/`\[https?:\/\//.test(line) || /\]\(https?:\/\/[^)]*`\)/.test(line))) {
      errors.push(`${rel(file)}:${index + 1}: malformed Markdown URL syntax found in inline prose`);
    }
    if (!inFence) {
      return;
    }
    if (/\[[^\]]*https?:\/\/[^\]]*\]\(https?:\/\/[^)]+\)/.test(line) || /\[https?:\/\//.test(line)) {
      errors.push(`${rel(file)}:${index + 1}: Markdown URL syntax found inside fenced code`);
    }
  });
}

for (const file of allPluginFiles) {
  if (/\.(backup|bak|tmp)$/.test(file) || file.endsWith("~")) {
    errors.push(`${rel(file)}: backup/temp file must not be packaged in plugins`);
  }
}

const pluginDirs = fs.readdirSync(pluginsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const pluginName of pluginDirs) {
  const skillRoot = path.join(pluginsRoot, pluginName, "skills", pluginName);
  const skillFile = path.join(skillRoot, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    errors.push(`plugins/${pluginName}: missing skills/${pluginName}/SKILL.md`);
    continue;
  }

  for (const entry of fs.readdirSync(skillRoot, { withFileTypes: true })) {
    if (!allowedSkillRootEntries.has(entry.name)) {
      errors.push(`${rel(path.join(skillRoot, entry.name))}: audit or non-standard top-level skill artifact`);
    }
  }

  const content = readText(skillFile);
  const frontmatter = parseFrontmatter(content).raw;
  if (!frontmatter) {
    errors.push(`${rel(skillFile)}: missing YAML frontmatter`);
    continue;
  }

  if (/\[https?:\/\//.test(frontmatter)) {
    errors.push(`${rel(skillFile)}: Markdown URL syntax found in frontmatter`);
  }

  for (const [label, pattern] of requiredSkillSections) {
    if (!pattern.test(content)) {
      errors.push(`${rel(skillFile)}: missing ${label} section or pointer`);
    }
  }

  const version = metadataValue(frontmatter, "version");
  if (version !== expectedVersion) {
    errors.push(`${rel(skillFile)}: metadata.version must be ${expectedVersion}, found '${version || "missing"}'`);
  }

  if (/^  (lastUpdated|last_updated):/m.test(frontmatter)) {
    errors.push(`${rel(skillFile)}: use metadata.last_verified instead of lastUpdated/last_updated`);
  }

  const lastVerified = metadataValue(frontmatter, "last_verified");
  if (!lastVerified) {
    errors.push(`${rel(skillFile)}: missing metadata.last_verified`);
  } else {
    const ageDays = daysSince(lastVerified);
    if (ageDays === null) {
      errors.push(`${rel(skillFile)}: invalid metadata.last_verified date '${lastVerified}'`);
    } else if (ageDays > staleAfterDays) {
      if (!auditText.includes(`\`${pluginName}\``)) {
        errors.push(`${rel(skillFile)}: stale metadata.last_verified (${lastVerified}, ${ageDays} days) without audit-report entry`);
      } else {
        warnings.push(`${pluginName}: metadata.last_verified is stale (${lastVerified}, ${ageDays} days) and documented in audit report`);
      }
    }
  }

  const ledgerEntry = ledgerByPlugin.get(pluginName);
  for (const item of extractBodyMetadata(content)) {
    if (item.key === "version" && version && item.value !== version) {
      errors.push(`${rel(skillFile)}:${item.lineNumber}: body/footer ${item.label} '${item.value}' conflicts with metadata.version '${version}'`);
    }
    if (item.key === "last_verified" && lastVerified && item.value !== lastVerified) {
      errors.push(`${rel(skillFile)}:${item.lineNumber}: body/footer ${item.label} '${item.value}' conflicts with metadata.last_verified '${lastVerified}'`);
    }
    if (item.key === "last_verified" && ledgerEntry?.supportedLastVerified && item.value !== ledgerEntry.supportedLastVerified) {
      errors.push(`${rel(skillFile)}:${item.lineNumber}: body/footer ${item.label} '${item.value}' conflicts with ledger supportedLastVerified '${ledgerEntry.supportedLastVerified}'`);
    }
  }
}

if (errors.length > 0) {
  console.error("Skill quality validation failed:");
  for (const error of errors) {
    console.error(`  ${error}`);
  }
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

console.log(`Skill quality validation passed for ${pluginDirs.length} plugin skill(s).`);
