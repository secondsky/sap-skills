import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const eclipseRoot = path.join(repoRoot, "plugins/sap-bw-query/eclipse/plugins/com.sap.bw.automation");

function read(relative) {
  const file = path.join(eclipseRoot, relative);
  assert.equal(fs.existsSync(file), true, `missing ${file}`);
  return fs.readFileSync(file, "utf8");
}

test("Eclipse bundle is Java 21 and capability-gates exact BWMT 1.27.36", () => {
  const manifest = read("META-INF/MANIFEST.MF");
  assert.match(manifest, /Bundle-SymbolicName: com\.sap\.bw\.automation;singleton:=true/);
  assert.match(manifest, /Bundle-RequiredExecutionEnvironment: JavaSE-21/);
  assert.match(manifest, /com\.sap\.bw\.qd\.model;bundle-version="\[1\.27\.36,1\.27\.37\)";resolution:=optional/);
  assert.match(manifest, /com\.sap\.bw\.qd\.ui;bundle-version="\[1\.27\.36,1\.27\.37\)";resolution:=optional/);
  const probe = read("src/com/sap/bw/automation/core/CapabilityProbe.java");
  assert.match(probe, /com\.sap\.bw\.qd\.QueryNewWizard/);
  assert.match(probe, /com\.sap\.bw\.qd\.model\.query\.QueryFactory/);
});

test("plugin contributes a persistent BW Automation sidebar", () => {
  const pluginXml = read("plugin.xml");
  assert.match(pluginXml, /id="com\.sap\.bw\.automation\.view"/);
  assert.match(pluginXml, /name="BW Automation"/);
  const view = read("src/com/sap/bw/automation/ui/AutomationView.java");
  assert.match(view, /Passwords are never accepted by the automation\./);
  for (const visualClass of ["BLUE", "VIOLET", "AMBER", "DARK_RED", "RED", "GREEN"]) {
    assert.match(view, new RegExp(`VisualClass\\.${visualClass}`));
  }
  assert.match(view, /Enter credentials only in the native SAP login dialog/i);
});

test("Java bridge allow-list contains read, draft, preview, and prepare-only methods", () => {
  const bridge = read("src/com/sap/bw/automation/bridge/BridgeLoop.java");
  for (const method of ["inspectCapabilities", "describeProvider", "listQueries", "readQuery", "projectCreateOrOpen", "createLocalDraft", "applySpecToDraft", "previewDraft", "prepareNewQuerySave"]) {
    assert.match(bridge, new RegExp(`\\"${method}\\"`));
  }
  assert.doesNotMatch(bridge, /"(?:saveQuery|deleteQuery|overwriteQuery|transportQuery|rawCommand)"/);
  assert.match(bridge, /password|passwd|pwd|secret|token|apikey|credential/i);
});

test("new-query save is prepared in Eclipse but no Java code invokes save or delete", () => {
  const javaFiles = fs.existsSync(eclipseRoot)
    ? fs.readdirSync(path.join(eclipseRoot, "src"), { recursive: true }).filter((name) => String(name).endsWith(".java"))
    : [];
  assert.ok(javaFiles.length > 0, "Java plug-in sources are missing");
  const combined = javaFiles.map((name) => fs.readFileSync(path.join(eclipseRoot, "src", name), "utf8")).join("\n");
  assert.match(combined, /class NewQueryConfirmationDialog/);
  assert.match(combined, /specHash/);
  assert.match(combined, /technicalName/);
  assert.match(combined, /requiresEclipseHumanConfirmation/);
  assert.doesNotMatch(combined, /ComponentModelManager\s*\.\s*save|executeCommand\([^)]*(?:save|delete)|IWorkbenchCommandConstants\.FILE_SAVE/i);
  assert.doesNotMatch(combined, /Files\.delete|File\.delete|deleteIfExists/i);
});

test("sidebar step journal reader never inspects secure text controls", () => {
  const reader = read("src/com/sap/bw/automation/core/StepJournal.java");
  assert.match(reader, /SWT\.PASSWORD/);
  assert.match(reader, /isSecureControl/);
  assert.doesNotMatch(reader, /getText\(\).*SWT\.PASSWORD/s);
});
