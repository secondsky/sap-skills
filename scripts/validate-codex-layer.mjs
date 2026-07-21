#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const pluginsRoot = path.join(repoRoot, "plugins");
const codexMarketplacePath = path.join(repoRoot, ".agents", "plugins", "marketplace.json");

const FORBIDDEN_MANIFEST_FIELDS = [
  "commands",
  "agents",
  "hooks",
  "lspServers",
  "mcpServers",
  "apps",
  "userConfig",
  "outputStyles",
];
const ALLOWED_SKILL_FRONTMATTER = new Set([
  "name",
  "description",
  "license",
  "metadata",
  "allowed-tools",
  "compatibility",
]);

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fail(message) {
  throw new Error(message);
}

function assertCondition(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function parseFrontmatter(skillPath) {
  const source = fs.readFileSync(skillPath, "utf8");
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  assertCondition(match, `${relative(skillPath)} has no YAML frontmatter`);

  const block = match[1];
  const lines = block.split(/\r?\n/);
  const keys = [];
  let name = "";
  let description = "";

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyMatch) {
      continue;
    }
    const [, key, value] = keyMatch;
    keys.push(key);
    if (key === "name") {
      name = value.replace(/^['"]|['"]$/g, "").trim();
    }
    if (key === "description") {
      if (value.trim() === "|" || value.trim() === ">") {
        const descriptionLines = [];
        for (let next = index + 1; next < lines.length; next += 1) {
          if (/^[A-Za-z0-9_-]+:\s*/.test(lines[next])) {
            index = next - 1;
            break;
          }
          descriptionLines.push(lines[next].replace(/^\s{2}/, ""));
          index = next;
        }
        description = descriptionLines.join(value.trim() === ">" ? " " : "\n");
      } else {
        description = value.replace(/^['"]|['"]$/g, "").trim();
      }
    }
  }

  return { block, keys, name, description: normalizeText(description) };
}

function yamlValue(source, key) {
  const line = source.split(/\r?\n/).find((candidate) => candidate.match(new RegExp(`^  ${key}:\\s*`)));
  assertCondition(line, `agents/openai.yaml is missing interface.${key}`);
  const raw = line.replace(new RegExp(`^  ${key}:\\s*`), "").trim();
  if (raw.startsWith('"')) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      fail(`Invalid quoted YAML value for ${key}: ${error.message}`);
    }
  }
  return raw;
}

function validateUiMetadata(filePath, skillName = null) {
  assertCondition(fs.existsSync(filePath), `Missing ${relative(filePath)}`);
  const source = fs.readFileSync(filePath, "utf8");
  const displayName = yamlValue(source, "display_name");
  const shortDescription = yamlValue(source, "short_description");
  const defaultPrompt = yamlValue(source, "default_prompt");
  assertCondition(displayName.length > 0, `${relative(filePath)} has an empty display_name`);
  assertCondition(shortDescription.length >= 25 && shortDescription.length <= 64, `${relative(filePath)} short_description must be 25-64 characters`);
  assertCondition(defaultPrompt.length > 0, `${relative(filePath)} has an empty default_prompt`);
  if (skillName) {
    assertCondition(defaultPrompt.includes(`$${skillName}`), `${relative(filePath)} default_prompt must invoke $${skillName}`);
    assertCondition(source.includes("allow_implicit_invocation: true"), `${relative(filePath)} must allow implicit skill invocation`);
  }
}

function validateSchema(filePath, schemaPath) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(readJson(schemaPath));
  const valid = validate(readJson(filePath));
  if (!valid) {
    const errors = validate.errors.map((error) => `${error.instancePath || "/"} ${error.message}`).join("; ");
    fail(`${relative(filePath)} does not match ${relative(schemaPath)}: ${errors}`);
  }
}

function assertSame(actual, expected, message) {
  assertCondition(JSON.stringify(actual) === JSON.stringify(expected), message);
}

function main() {
  assertCondition(fs.existsSync(codexMarketplacePath), `Missing ${relative(codexMarketplacePath)}`);
  const claudeMarketplace = readJson(path.join(repoRoot, ".claude-plugin", "marketplace.json"));
  const codexMarketplace = readJson(codexMarketplacePath);
  validateSchema(codexMarketplacePath, path.join(repoRoot, "schemas", "codex-marketplace.schema.json"));

  assertCondition(codexMarketplace.name === "sap-skills", "Codex marketplace name must be sap-skills");
  assertCondition(codexMarketplace.interface?.displayName === "SAP Skills", "Codex marketplace display name must be SAP Skills");

  const claudeEntries = new Map(claudeMarketplace.plugins.map((entry) => [entry.name, entry]));
  const codexNames = codexMarketplace.plugins.map((entry) => entry.name);
  const repositoryNames = fs.readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  assertCondition(codexNames.length === claudeEntries.size, `Expected ${claudeEntries.size} Codex marketplace entries, found ${codexNames.length}`);
  assertSame(codexNames, [...codexNames].sort((left, right) => left.localeCompare(right)), "Codex marketplace entries must be alphabetically ordered");
  assertSame(codexNames, repositoryNames, "Codex marketplace entries must match plugin directories");

  for (const entry of codexMarketplace.plugins) {
    assertCondition(entry.source.path === `./plugins/${entry.name}`, `${entry.name} has an invalid local plugin path`);
    assertCondition(entry.source.source === "local", `${entry.name} must use a local marketplace source`);
    assertCondition(entry.policy.installation === "AVAILABLE", `${entry.name} must be AVAILABLE for installation`);
    assertCondition(entry.policy.authentication === "ON_INSTALL", `${entry.name} must authenticate on install`);

    const pluginRoot = path.join(pluginsRoot, entry.name);
    const codexManifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
    const claudeManifestPath = path.join(pluginRoot, ".claude-plugin", "plugin.json");
    assertCondition(fs.existsSync(codexManifestPath), `Missing ${relative(codexManifestPath)}`);
    validateSchema(codexManifestPath, path.join(repoRoot, "schemas", "codex-plugin.schema.json"));

    const codexManifest = readJson(codexManifestPath);
    const claudeManifest = readJson(claudeManifestPath);
    const claudeEntry = claudeEntries.get(entry.name);
    assertSame(codexManifest.name, claudeManifest.name, `${entry.name} name differs from Claude manifest`);
    assertSame(codexManifest.version, claudeManifest.version, `${entry.name} version differs from Claude manifest`);
    assertSame(codexManifest.version, claudeEntry.version, `${entry.name} version differs from Claude marketplace`);
    assertSame(codexManifest.description, normalizeText(claudeManifest.description), `${entry.name} description differs from Claude manifest`);
    assertSame(codexManifest.skills, "./skills/", `${entry.name} must expose ./skills/`);
    assertSame(codexManifest.repository, claudeManifest.repository, `${entry.name} repository differs from Claude manifest`);
    assertSame(codexManifest.license, claudeManifest.license, `${entry.name} license differs from Claude manifest`);
    assertSame(codexManifest.keywords, claudeManifest.keywords, `${entry.name} keywords differ from Claude manifest`);
    assertSame(codexManifest.interface.category, entry.category, `${entry.name} marketplace and manifest categories differ`);

    for (const forbiddenField of FORBIDDEN_MANIFEST_FIELDS) {
      assertCondition(!Object.hasOwn(codexManifest, forbiddenField), `${relative(codexManifestPath)} must not declare ${forbiddenField}`);
    }

    validateUiMetadata(path.join(pluginRoot, "agents", "openai.yaml"));

    const skillsRoot = path.join(pluginRoot, "skills");
    const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
      .filter((skill) => skill.isDirectory())
      .map((skill) => skill.name)
      .sort();
    assertCondition(skillDirs.length > 0, `${entry.name} has no skills`);

    for (const skillName of skillDirs) {
      const skillPath = path.join(skillsRoot, skillName, "SKILL.md");
      const frontmatter = parseFrontmatter(skillPath);
      assertSame(frontmatter.name, skillName, `${relative(skillPath)} name must match its directory`);
      assertCondition(frontmatter.description.length > 0, `${relative(skillPath)} has an empty description`);
      for (const key of frontmatter.keys) {
        assertCondition(ALLOWED_SKILL_FRONTMATTER.has(key), `${relative(skillPath)} contains unsupported frontmatter field ${key}`);
      }
      const disabled = frontmatter.block.match(/^disable[-_]model[-_]invocation:\s*(true|yes|on)\s*$/im);
      assertCondition(!disabled, `${relative(skillPath)} must not disable model invocation`);
      validateUiMetadata(path.join(skillsRoot, skillName, "agents", "openai.yaml"), skillName);
    }
  }

  console.log(`Codex layer valid: ${codexNames.length} plugins and ${codexNames.length} skills checked.`);
}

try {
  main();
} catch (error) {
  console.error(`Codex validation failed: ${error.message}`);
  process.exitCode = 1;
}
