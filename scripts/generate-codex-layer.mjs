#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const pluginsRoot = path.join(repoRoot, "plugins");
const dryRun = process.argv.includes("--dry-run");

const ACRONYMS = new Map([
  ["ai", "AI"],
  ["api", "API"],
  ["abap", "ABAP"],
  ["btp", "BTP"],
  ["bw", "BW"],
  ["cap", "CAP"],
  ["cds", "CDS"],
  ["cli", "CLI"],
  ["cias", "CIAS"],
  ["fiori", "Fiori"],
  ["hana", "HANA"],
  ["ias", "IAS"],
  ["mcp", "MCP"],
  ["rpt1", "RPT1"],
  ["sac", "SAC"],
  ["sap", "SAP"],
  ["sqlscript", "SQLScript"],
  ["ui", "UI"],
  ["ui5", "UI5"],
]);

const CATEGORIES = new Map([
  ["abap", "ABAP"],
  ["ai", "AI"],
  ["btp", "BTP"],
  ["cap", "CAP"],
  ["data-analytics", "Data Analytics"],
  ["hana", "HANA"],
  ["tooling", "Tooling"],
  ["ui-development", "UI Development"],
]);

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read JSON ${path.relative(repoRoot, filePath)}: ${error.message}`);
  }
}

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function parseFrontmatter(skillPath) {
  const source = fs.readFileSync(skillPath, "utf8");
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!match) {
    throw new Error(`Skill has no YAML frontmatter: ${path.relative(repoRoot, skillPath)}`);
  }

  const lines = match[1].split(/\r?\n/);
  let name = "";
  let description = "";

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const nameMatch = line.match(/^name:\s*(.+?)\s*$/);
    if (nameMatch) {
      name = nameMatch[1].replace(/^['"]|['"]$/g, "");
      continue;
    }

    const descriptionMatch = line.match(/^description:\s*(.*)$/);
    if (!descriptionMatch) {
      continue;
    }

    const value = descriptionMatch[1].trim();
    if (value && value !== "|" && value !== ">") {
      description = value.replace(/^['"]|['"]$/g, "");
      continue;
    }

    const descriptionLines = [];
    for (let next = index + 1; next < lines.length; next += 1) {
      if (/^[A-Za-z0-9_-]+:\s*/.test(lines[next])) {
        index = next - 1;
        break;
      }
      descriptionLines.push(lines[next].replace(/^\s{2}/, ""));
      index = next;
    }
    description = descriptionLines.join(value === ">" ? " " : "\n");
  }

  return {
    name: normalizeText(name),
    description: normalizeText(description),
  };
}

function titleCaseToken(token) {
  const lower = token.toLowerCase();
  return ACRONYMS.get(lower) ?? `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
}

function displayName(pluginName) {
  if (pluginName === "sapui5") {
    return "SAPUI5";
  }
  return pluginName.split("-").map(titleCaseToken).join(" ");
}

function categoryLabel(category, pluginName) {
  const normalized = normalizeText(category).toLowerCase();
  if (CATEGORIES.has(normalized)) {
    return CATEGORIES.get(normalized);
  }
  return displayName(pluginName).split(" ")[1] ?? "SAP Skills";
}

function firstSentence(value) {
  const normalized = normalizeText(value);
  const sentence = normalized.match(/^(.+?[.!?])(?:\s|$)/)?.[1] ?? normalized;
  return sentence.replace(/[.!?]+$/, "").trim();
}

function shortDescription(value, fallback) {
  let result = firstSentence(value) || fallback;
  if (result.length < 25) {
    result = `${result} SAP guidance`;
  }
  if (result.length > 64) {
    result = `${result.slice(0, 61).trimEnd()}...`;
  }
  return result;
}

function promptForPlugin(name) {
  return `Use ${displayName(name)} for SAP guidance.`;
}

function promptForSkill(skillName, pluginName) {
  const prompt = `Use $${skillName} to work with ${displayName(pluginName)}.`;
  return prompt.length <= 128 ? prompt : `${prompt.slice(0, 125).trimEnd()}...`;
}

function yamlScalar(value) {
  return JSON.stringify(value);
}

function renderUiYaml({ display, short, prompt, includePolicy = false }) {
  const lines = [
    "interface:",
    `  display_name: ${yamlScalar(display)}`,
    `  short_description: ${yamlScalar(short)}`,
    `  default_prompt: ${yamlScalar(prompt)}`,
  ];
  if (includePolicy) {
    lines.push("policy:", "  allow_implicit_invocation: true");
  }
  return `${lines.join("\n")}\n`;
}

function writeFile(relativePath, content) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (dryRun) {
    console.log(`Would write ${relativePath}`);
    return;
  }
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
}

function writeJson(relativePath, value) {
  writeFile(relativePath, `${JSON.stringify(value, null, 2)}\n`);
}

function getSkillDirectories(pluginRoot) {
  const skillsRoot = path.join(pluginRoot, "skills");
  if (!fs.existsSync(skillsRoot)) {
    throw new Error(`Missing skills directory: ${path.relative(repoRoot, skillsRoot)}`);
  }
  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function main() {
  const claudeMarketplace = readJson(path.join(repoRoot, ".claude-plugin", "marketplace.json"));
  const claudeEntries = new Map(claudeMarketplace.plugins.map((entry) => [entry.name, entry]));
  const pluginNames = fs.readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  if (pluginNames.length === 0) {
    throw new Error("No plugins found");
  }

  const marketplacePlugins = [];

  for (const pluginName of pluginNames) {
    const pluginRoot = path.join(pluginsRoot, pluginName);
    const claudeManifest = readJson(path.join(pluginRoot, ".claude-plugin", "plugin.json"));
    const marketplaceEntry = claudeEntries.get(pluginName);
    if (!marketplaceEntry) {
      throw new Error(`Plugin ${pluginName} is missing from .claude-plugin/marketplace.json`);
    }

    const pluginDescription = normalizeText(claudeManifest.description ?? marketplaceEntry.description);
    const display = displayName(pluginName);
    const category = categoryLabel(marketplaceEntry.category ?? claudeManifest.category, pluginName);
    const author = claudeManifest.author ?? { name: "SAP Skills Contributors" };
    const pluginManifest = {
      name: pluginName,
      version: claudeManifest.version ?? marketplaceEntry.version,
      description: pluginDescription,
      author,
      homepage: claudeManifest.homepage,
      repository: claudeManifest.repository,
      license: claudeManifest.license,
      keywords: claudeManifest.keywords ?? [],
      skills: "./skills/",
      interface: {
        displayName: display,
        shortDescription: shortDescription(pluginDescription, `${display} SAP guidance`),
        longDescription: pluginDescription,
        developerName: author.name,
        category,
        capabilities: ["Interactive", "Read", "Write"],
        defaultPrompt: [promptForPlugin(pluginName)],
        websiteURL: claudeManifest.homepage,
      },
    };

    for (const optionalKey of ["homepage", "repository", "license", "websiteURL"]) {
      if (!pluginManifest[optionalKey]) {
        delete pluginManifest[optionalKey];
      }
      if (!pluginManifest.interface[optionalKey]) {
        delete pluginManifest.interface[optionalKey];
      }
    }

    writeJson(path.join("plugins", pluginName, ".codex-plugin", "plugin.json"), pluginManifest);
    writeFile(
      path.join("plugins", pluginName, "agents", "openai.yaml"),
      renderUiYaml({
        display,
        short: pluginManifest.interface.shortDescription,
        prompt: promptForPlugin(pluginName),
      }),
    );

    const skillNames = getSkillDirectories(pluginRoot);
    if (skillNames.length === 0) {
      throw new Error(`Plugin ${pluginName} has no skill directories`);
    }
    for (const skillName of skillNames) {
      const skillPath = path.join(pluginRoot, "skills", skillName, "SKILL.md");
      const frontmatter = parseFrontmatter(skillPath);
      if (frontmatter.name !== skillName) {
        throw new Error(`Skill name mismatch in ${path.relative(repoRoot, skillPath)}: ${frontmatter.name}`);
      }
      const skillDisplay = displayName(skillName);
      writeFile(
        path.join("plugins", pluginName, "skills", skillName, "agents", "openai.yaml"),
        renderUiYaml({
          display: skillDisplay,
          short: shortDescription(frontmatter.description, `${skillDisplay} SAP guidance`),
          prompt: promptForSkill(skillName, pluginName),
          includePolicy: true,
        }),
      );
    }

    marketplacePlugins.push({
      name: pluginName,
      source: {
        source: "local",
        path: `./plugins/${pluginName}`,
      },
      policy: {
        installation: "AVAILABLE",
        authentication: "ON_INSTALL",
      },
      category,
    });
  }

  writeJson(path.join(".agents", "plugins", "marketplace.json"), {
    name: claudeMarketplace.name ?? "sap-skills",
    interface: {
      displayName: "SAP Skills",
    },
    plugins: marketplacePlugins,
  });

  console.log(`${dryRun ? "Would generate" : "Generated"} Codex metadata for ${pluginNames.length} plugins.`);
}

main();
