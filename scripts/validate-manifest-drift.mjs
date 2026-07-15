#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sap-skills-manifest-drift-"));
const tmpRepo = path.join(tmpRoot, "repo");
const errors = [];

function rel(file) {
  return path.relative(repoRoot, file).replaceAll(path.sep, "/");
}

function copyFilter(src) {
  const relative = path.relative(repoRoot, src).replaceAll(path.sep, "/");
  return !(
    relative === ".git"
    || relative === "node_modules"
    || relative.startsWith(".git/")
    || relative.startsWith("node_modules/")
  );
}

function read(file) {
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf8").replaceAll("\r\n", "\n")
    : null;
}

function trackedManifestFiles() {
  const files = [path.join(repoRoot, ".claude-plugin/marketplace.json")];
  for (const pluginName of fs.readdirSync(path.join(repoRoot, "plugins")).sort()) {
    const pluginJson = path.join(repoRoot, "plugins", pluginName, ".claude-plugin/plugin.json");
    if (fs.existsSync(pluginJson)) files.push(pluginJson);
  }
  return files;
}

function manifestGeneratorCommand() {
  if (process.platform !== "win32") {
    return { command: "./scripts/sync-plugins.sh", args: [] };
  }

  const candidates = [
    process.env.GIT_BASH,
    process.env.ProgramFiles ? path.join(process.env.ProgramFiles, "Git", "bin", "bash.exe") : null,
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "Programs", "Git", "bin", "bash.exe") : null,
  ].filter(Boolean);
  const bash = candidates.find((candidate) => fs.existsSync(candidate)) || "bash.exe";
  return { command: bash, args: ["./scripts/sync-plugins.sh"] };
}

try {
  fs.cpSync(repoRoot, tmpRepo, { recursive: true, filter: copyFilter });

  const marketplace = JSON.parse(fs.readFileSync(path.join(repoRoot, ".claude-plugin/marketplace.json"), "utf8"));
  const lastUpdated = marketplace?.metadata?.last_updated || new Date().toISOString().slice(0, 10);
  const generator = manifestGeneratorCommand();
  const result = spawnSync(generator.command, generator.args, {
    cwd: tmpRepo,
    env: { ...process.env, MARKETPLACE_LAST_UPDATED: lastUpdated },
    encoding: "utf8",
  });

  if (result.status !== 0) {
    process.stderr.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    console.error("Manifest drift validation failed: sync-plugins.sh failed in temporary copy");
    process.exit(result.status || 1);
  }

  for (const sourceFile of trackedManifestFiles()) {
    const generatedFile = path.join(tmpRepo, rel(sourceFile));
    const current = read(sourceFile);
    const generated = read(generatedFile);
    if (current !== generated) {
      errors.push(rel(sourceFile));
    }
  }

  if (errors.length > 0) {
    console.error("Manifest drift validation failed. Regenerate manifests with ./scripts/sync-plugins.sh and review the diff:");
    for (const file of errors) console.error(`- ${file}`);
    process.exit(1);
  }

  console.log("Manifest drift validation passed.");
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}
