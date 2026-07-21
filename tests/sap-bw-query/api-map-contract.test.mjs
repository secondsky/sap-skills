import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const apiMapPath = path.join(
  repoRoot,
  "plugins/sap-bw-query/skills/sap-bw-query/references/bwmt-api-map.md"
);

test("bwmt api map exists and covers the reflective binding surface", () => {
  assert.equal(fs.existsSync(apiMapPath), true, `missing ${apiMapPath}`);
  const text = fs.readFileSync(apiMapPath, "utf8");
  assert.match(text, /1\.27\.36/);
  assert.match(text, /IInfoProviderMDService/);
  assert.match(text, /InfoProviderModelManager/);
  assert.match(text, /ProjectUtil/);
  assert.match(text, /QueryFactory/);
  assert.match(text, /QueryPackage/);
  assert.match(text, /CustomDimension/);
  assert.match(text, /RestrictedMeasure/);
  assert.match(text, /ZeroSuppression/);
  assert.match(text, /getEditingDomain/);
});

test("bwmt api map states provenance and keeps live validation pending", () => {
  const text = fs.readFileSync(apiMapPath, "utf8");
  assert.match(text, /^## Sources$/m);
  assert.match(text, /javap/);
  assert.match(text, /live[- ]validation/i);
  assert.match(text, /pending/i);
  assert.doesNotMatch(text, /READY FOR PRODUCTION|100% Compliant/i);
});

test("bwmt api map never widens the automation surface toward saves or credentials", () => {
  const text = fs.readFileSync(apiMapPath, "utf8");
  assert.match(text, /NEVER invoked by the automation/);
  assert.match(text, /human presses Save/i);
  assert.doesNotMatch(text, /password\s*[:=]/i);
  assert.doesNotMatch(text, /\bsecret\b|\bapi[_ ]?key\b/i);
});
