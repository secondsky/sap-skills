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

test("Java bridge allow-list contains read, draft, preview, prepare, and populate-only methods", () => {
  const bridge = read("src/com/sap/bw/automation/bridge/BridgeLoop.java");
  for (const method of ["inspectCapabilities", "describeProvider", "listQueries", "readQuery", "readQueryModel", "projectCreateOrOpen", "createLocalDraft", "applySpecToDraft", "previewDraft", "prepareNewQuerySave", "populateQueryEditor"]) {
    assert.match(bridge, new RegExp(`\\"${method}\\"`));
  }
  assert.doesNotMatch(bridge, /"(?:saveQuery|deleteQuery|overwriteQuery|transportQuery|rawCommand)"/);
  assert.match(bridge, /password|passwd|pwd|secret|token|apikey|credential/i);
});

test("query population builds the unsaved model per element and never saves", () => {
  const builder = read("src/com/sap/bw/automation/core/QueryModelBuilder.java");
  assert.match(builder, /applyReport|APPLIED/);
  assert.match(builder, /SKIPPED_UNSUPPORTED/);
  assert.match(builder, /FAILED/);
  assert.match(builder, /RestrictedMeasure|restrictedMember/);
  assert.match(builder, /ZeroSuppression/);
  assert.match(builder, /createCondition/);
  assert.match(builder, /createExceptional/);
  assert.doesNotMatch(builder, /doSave|\.save\(|FILE_SAVE/);
  const gateway = read("src/com/sap/bw/automation/core/QueryEditorGateway.java");
  assert.match(gateway, /hasContent/);
  assert.match(gateway, /never modified/i);
  assert.match(gateway, /RecordingCommand/);
  assert.match(gateway, /saved", false/);
  assert.doesNotMatch(gateway, /doSave|IWorkbenchCommandConstants/);
  const adapter = read("src/com/sap/bw/automation/core/BwmtAdapter.java");
  assert.match(adapter, /populateQueryEditor/);
  assert.match(adapter, /populateSupport\(\)/);
});

test("deep query model read serializes read-only and never mutates or saves", () => {
  const reader = read("src/com/sap/bw/automation/core/QueryModelReader.java");
  assert.match(reader, /serializationIssues/);
  assert.match(reader, /readOnlyInspection/);
  assert.match(reader, /"other"/);
  assert.match(reader, /eClass/);
  assert.match(reader, /formulaDefinitionString/);
  assert.doesNotMatch(reader, /doSave|\.save\(|deleteQuery|setPassword/i);
  assert.doesNotMatch(reader, /eSet\(/);
  const gateway = read("src/com/sap/bw/automation/core/QueryEditorGateway.java");
  assert.match(gateway, /static\s+JsonObject\s+readModel/);
  assert.match(gateway, /findOpenEditor/);
  assert.doesNotMatch(gateway, /doSave/);
  const adapter = read("src/com/sap/bw/automation/core/BwmtAdapter.java");
  assert.match(adapter, /readQueryModel/);
  assert.match(adapter, /modelReadSupport\(\)/);
  const probe = read("src/com/sap/bw/automation/core/CapabilityProbe.java");
  assert.match(probe, /modelReadSupported/);
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

test("provider metadata read is reflective, capability-gated, and read-only", () => {
  const gateway = read("src/com/sap/bw/automation/core/ProviderMetadataGateway.java");
  assert.match(gateway, /IInfoProviderMDService/);
  assert.match(gateway, /InfoProviderModelManager/);
  assert.match(gateway, /ProjectUtil/);
  assert.match(gateway, /getMetadata/);
  assert.match(gateway, /releaseBuffers/);
  assert.match(gateway, /OFFLINE_OR_UNAUTHENTICATED/);
  assert.match(gateway, /native SAP login dialog/i);
  assert.doesNotMatch(gateway, /doSave|deleteQuery|setPassword/i);
  const probe = read("src/com/sap/bw/automation/core/CapabilityProbe.java");
  assert.match(probe, /providerMetadataSupported/);
  assert.match(probe, /getInfoProviderMDService/);
  assert.match(probe, /getDestinationID/);
  const adapter = read("src/com/sap/bw/automation/core/BwmtAdapter.java");
  assert.match(adapter, /providerMetadataSupport\(\)/);
  assert.match(adapter, /"metadata"/);
  assert.match(adapter, /CAPABILITY_GATED/);
});

test("sidebar step journal reader never inspects secure text controls", () => {
  const reader = read("src/com/sap/bw/automation/core/StepJournal.java");
  assert.match(reader, /SWT\.PASSWORD/);
  assert.match(reader, /isSecureControl/);
  assert.doesNotMatch(reader, /getText\(\).*SWT\.PASSWORD/s);
});
