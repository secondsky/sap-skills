import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const pluginRoot = path.join(repoRoot, "plugins/sap-bw-query");

test("MCP package uses exact runtime and build pins", () => {
  const packagePath = path.join(pluginRoot, "mcp/package.json");
  assert.equal(fs.existsSync(packagePath), true, `missing ${packagePath}`);
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  assert.equal(pkg.dependencies["@modelcontextprotocol/sdk"], "1.29.0");
  assert.equal(pkg.devDependencies.esbuild, "0.28.1");
  assert.equal(pkg.scripts.build, "node ./build.mjs");
});

test("source MCP launcher requires an active portable bundle and system PowerShell only", () => {
  const launcher = path.join(pluginRoot, "scripts/Start-BwMcp.ps1");
  assert.equal(fs.existsSync(launcher), true, `missing ${launcher}`);
  const text = fs.readFileSync(launcher, "utf8");
  assert.match(text, /bundle\.lock\.json/);
  assert.match(text, /entrypoints\.node/);
  assert.doesNotMatch(text, /\bnpx\b|npm install|winget|choco|Invoke-WebRequest/i);
  assert.doesNotMatch(text, /Remove-Item|Clear-Content|rmdir/i);
});

test("plugin MCP activation uses the source bootstrap without credential environment variables", () => {
  const configPath = path.join(pluginRoot, ".mcp.json");
  assert.equal(fs.existsSync(configPath), true, `missing ${configPath}`);
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  assert.deepEqual(Object.keys(config), ["bw-automation-studio"]);
  const server = config["bw-automation-studio"];
  assert.equal(server.command, "powershell.exe");
  assert.doesNotMatch(JSON.stringify(server), /password|passwd|\bpwd\b|secret|token|apiKey|credential/i);
});

test("MCP server source has no final-save or destructive registration", () => {
  const serverPath = path.join(pluginRoot, "mcp/src/server.mjs");
  assert.equal(fs.existsSync(serverPath), true, `missing ${serverPath}`);
  const text = fs.readFileSync(serverPath, "utf8");
  assert.doesNotMatch(text, /registerTool\([^\n]*(?:delete|remove|cleanup|uninstall|overwrite|transport|raw|save_new)/i);
  assert.match(text, /TOOL_DEFINITIONS/);
  assert.match(text, /StdioServerTransport/);
});
