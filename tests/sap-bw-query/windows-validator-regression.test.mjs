import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

test("MCP security inventory keys are normalized on Windows", { skip: process.platform !== "win32" }, () => {
  const result = spawnSync(process.execPath, [path.join(repoRoot, "scripts/validate-mcp-security.mjs")], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("manifest drift validation invokes Git Bash explicitly on Windows", () => {
  const source = fs.readFileSync(path.join(repoRoot, "scripts/validate-manifest-drift.mjs"), "utf8");
  assert.match(source, /process\.platform !== "win32"/);
  assert.match(source, /bash\.exe/);
  assert.match(source, /replaceAll\("\\r\\n", "\\n"\)/);
});

test("verification ledger accepts Windows frontmatter line endings", () => {
  const source = fs.readFileSync(path.join(repoRoot, "scripts/validate-verification-ledger.mjs"), "utf8");
  assert.match(source, /\^---\\r\?\\n/);
});

test("template validation has a Windows XML parser fallback", () => {
  const source = fs.readFileSync(path.join(repoRoot, "scripts/validate-templates.mjs"), "utf8");
  assert.match(source, /process\.platform === "win32"/);
  assert.match(source, /powershell\.exe/);
});

test("skill quality derives release version and audit evidence from repository sources", () => {
  const source = fs.readFileSync(path.join(repoRoot, "scripts/validate-skill-quality.mjs"), "utf8");
  assert.doesNotMatch(source, /const expectedVersion = "2\.3\.1"/);
  assert.match(source, /marketplace.*metadata.*version/is);
  assert.match(source, /ledgerEntry/);
});
