import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const marketplacePath = path.join(repoRoot, ".agents", "plugins", "marketplace.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function testMarketplace() {
  assert.equal(fs.existsSync(marketplacePath), true, "missing .agents/plugins/marketplace.json");

  const marketplace = readJson(marketplacePath);
  assert.equal(marketplace.name, "sap-skills");
  assert.equal(marketplace.plugins.length, 40);

  const names = marketplace.plugins.map((plugin) => plugin.name);
  assert.deepEqual(names, [...names].sort(), "marketplace plugins must be alphabetically ordered");
  assert.equal(new Set(names).size, names.length, "marketplace plugin names must be unique");

  for (const plugin of marketplace.plugins) {
    assert.deepEqual(Object.keys(plugin).sort(), ["category", "name", "policy", "source"]);
    assert.deepEqual(plugin.source, {
      source: "local",
      path: `./plugins/${plugin.name}`,
    });
    assert.deepEqual(plugin.policy, {
      installation: "AVAILABLE",
      authentication: "ON_INSTALL",
    });
  }
}

function testPluginMetadata() {
  const marketplace = readJson(marketplacePath);

  for (const entry of marketplace.plugins) {
    const pluginRoot = path.join(repoRoot, "plugins", entry.name);
    const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
    const pluginUiPath = path.join(pluginRoot, "agents", "openai.yaml");
    const manifest = readJson(manifestPath);

    assert.equal(manifest.name, entry.name);
    assert.equal(manifest.version, "2.4.0");
    assert.equal(manifest.skills, "./skills/");
    assert.ok(manifest.author?.name);
    assert.ok(manifest.interface?.displayName);
    assert.ok(manifest.interface?.shortDescription);
    assert.ok(manifest.interface?.longDescription);
    assert.ok(manifest.interface?.developerName);
    assert.ok(manifest.interface?.category);
    assert.ok(Array.isArray(manifest.interface?.capabilities));
    assert.deepEqual(manifest.interface.capabilities, ["Interactive", "Read", "Write"]);
    assert.ok(Array.isArray(manifest.interface?.defaultPrompt));
    assert.equal(fs.existsSync(pluginUiPath), true, `missing ${pluginUiPath}`);

    const skillDirs = fs
      .readdirSync(path.join(pluginRoot, "skills"), { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name);
    assert.ok(skillDirs.length > 0, `${entry.name} has no skill directories`);

    for (const skillName of skillDirs) {
      const skillUiPath = path.join(pluginRoot, "skills", skillName, "agents", "openai.yaml");
      assert.equal(fs.existsSync(skillUiPath), true, `missing ${skillUiPath}`);
      const skillUi = fs.readFileSync(skillUiPath, "utf8");
      assert.match(skillUi, new RegExp(`\\$${skillName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}(?:\\s|$)`));
    }

    for (const unsupportedField of ["commands", "agents", "hooks", "lspServers", "mcpServers"]) {
      assert.equal(
        Object.hasOwn(manifest, unsupportedField),
        false,
        `${entry.name} must not declare Claude-only or unverified Codex field ${unsupportedField}`,
      );
    }
  }
}

testMarketplace();
testPluginMetadata();
console.log("Codex layer tests passed");
