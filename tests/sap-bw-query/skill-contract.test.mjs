import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const skillPath = path.join(repoRoot, "plugins/sap-bw-query/skills/sap-bw-query/SKILL.md");
const scenariosPath = path.join(here, "skill-scenarios.json");

test("sap-bw-query skill exists and is discoverable", () => {
  assert.equal(fs.existsSync(skillPath), true, `missing ${skillPath}`);
  const text = fs.readFileSync(skillPath, "utf8");
  assert.match(text, /^---\r?\nname: sap-bw-query\r?\ndescription: Use when /);
  assert.match(text, /Eclipse|HANA Studio/i);
  assert.match(text, /BW (?:query|queries)/i);
});

test("skill makes password refusal and rotation non-negotiable", () => {
  assert.equal(fs.existsSync(skillPath), true, `missing ${skillPath}`);
  const text = fs.readFileSync(skillPath, "utf8");
  assert.match(text, /Passwords are never accepted by the automation\./);
  assert.match(text, /rotate it immediately/i);
  assert.match(text, /cannot retroactively (?:delete|erase)/i);
  assert.match(text, /native SAP login dialog/i);
});

test("skill preserves the permanent no-delete and human-save boundaries", () => {
  assert.equal(fs.existsSync(skillPath), true, `missing ${skillPath}`);
  const text = fs.readFileSync(skillPath, "utf8");
  assert.match(text, /never delete/i);
  assert.match(text, /never (?:overwrite|modify) an existing/i);
  assert.match(text, /Eclipse-only human confirmation/i);
});

test("pressure scenarios cover credentials, query overwrite, and bundle cleanup", () => {
  const scenarios = JSON.parse(fs.readFileSync(scenariosPath, "utf8"));
  assert.equal(scenarios.length, 3);
  const combined = JSON.stringify(scenarios);
  assert.match(combined, /password/i);
  assert.match(combined, /overwrite/i);
  assert.match(combined, /delete/i);
});
