import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const mcpSrc = path.join(repoRoot, "plugins/sap-bw-query/mcp/src");
const templatesDir = path.join(
  repoRoot,
  "plugins/sap-bw-query/skills/sap-bw-query/references/query-templates",
);

const { resolveAndValidateSpec } = await import(pathToFileURL(path.join(mcpSrc, "query-spec.mjs")));
const { runRules, normalizeFromSpec } = await import(pathToFileURL(path.join(mcpSrc, "query-rules.mjs")));

const TEMPLATE_FILES = [
  "plan-actual-variance.json",
  "ytd-comparison.json",
  "top-n-analysis.json",
  "reconciliation-totals.json",
];

function loadTemplate(name) {
  const file = path.join(templatesDir, name);
  assert.equal(fs.existsSync(file), true, `missing template ${file}`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

test("every documented template file exists and nothing extra ships in the folder", () => {
  const onDisk = fs.readdirSync(templatesDir).filter((name) => name.endsWith(".json")).sort();
  assert.deepEqual(onDisk, [...TEMPLATE_FILES].sort());
});

for (const name of TEMPLATE_FILES) {
  test(`${name}: parses, is a syntactically valid QuerySpec, and models best practice`, () => {
    const template = loadTemplate(name);

    // 1. Every placeholder token is an uppercase-only string, so shape validation accepts it.
    for (const token of JSON.stringify(template).match(/PLACEHOLDER_[A-Z0-9_]*/g) ?? []) {
      assert.match(token, /^[A-Z0-9_]+$/, `${name}: placeholder ${token} is not uppercase-only`);
    }

    // 2. resolveAndValidateSpec accepts the shape (placeholders are valid strings; without an
    // alias no provider metadata is fetched, so unknown-name gaps never turn into errors).
    const result = resolveAndValidateSpec(template);
    assert.equal(result.valid, true, `${name}: not valid: ${JSON.stringify(result.errors)}`);

    // 3. The rule engine raises no warning-severity finding: templates must model best practice.
    const findings = runRules(normalizeFromSpec(template));
    const warnings = findings.filter((finding) => finding.severity === "warning");
    assert.deepEqual(
      warnings,
      [],
      `${name}: unexpected warning findings: ${JSON.stringify(warnings.map((w) => `${w.ruleId} ${w.message}`))}`,
    );
  });
}
