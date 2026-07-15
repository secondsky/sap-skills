import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const pluginRoot = path.join(repoRoot, "plugins/sap-bw-query");

function read(relative) {
  const file = path.join(pluginRoot, relative);
  assert.equal(fs.existsSync(file), true, `missing ${file}`);
  return fs.readFileSync(file, "utf8");
}

test("bundle source lock pins every executable component and never uses latest", () => {
  const lock = JSON.parse(read("bundle/bundle-source-lock.json"));
  assert.equal(lock.schemaVersion, 1);
  assert.equal(lock.bundleVersion, "0.1.0");
  assert.equal(lock.eclipse.version, "4.40");
  assert.equal(lock.eclipse.distribution, "Eclipse Modeling Tools 2026-06 R");
  assert.equal(lock.eclipse.profile, "epp.package.modeling");
  assert.equal(lock.eclipse.repository, "https://download.eclipse.org/releases/2026-06");
  assert.match(lock.eclipse.sourcePage, /^https:\/\/www\.eclipse\.org\/downloads\//);
  assert.deepEqual(lock.eclipse.prerequisiteUnits, [
    "org.eclipse.emf.databinding.edit.feature.group/1.12.0.v20250910-1205",
    "org.eclipse.emf.workspace.feature.group/1.14.3.202605251143",
  ]);
  assert.equal(lock.sapMachineJre.version, "21.0.11");
  assert.equal(lock.sapMachineJdk.version, "21.0.11");
  assert.equal(lock.node.version, "24.18.0");
  assert.equal(lock.bwmt.version, "1.27.36");
  assert.equal(lock.bwmt.repository, "https://tools.hana.ondemand.com/2026-06");
  assert.equal(lock.bwmt.installUnits.includes("com.sap.bw.feature.query.feature.group/1.27.36"), true);
  assert.doesNotMatch(JSON.stringify(lock), /\/latest|@latest/i);
  for (const component of [lock.eclipse, lock.sapMachineJre, lock.sapMachineJdk, lock.node]) {
    assert.match(component.sha256 ?? component.sha512, /^[a-f0-9]{64,128}$/);
  }
});

test("builder verifies downloads before extraction and creates all release evidence", () => {
  const script = read("bundle/Build-BwStudio.ps1");
  assert.match(script, /Test-DownloadHash/);
  assert.match(script, /org\.eclipse\.equinox\.p2\.director/);
  assert.match(script, /eclipsec\.exe/);
  assert.match(script, /sourceLock\.eclipse\.repository/);
  assert.match(script, /sourceLock\.eclipse\.profile/);
  assert.doesNotMatch(script, /-profile SDKProfile/);
  assert.match(script, /\$ErrorActionPreference = "Continue"/);
  assert.match(script, /com\.sap\.bw\.feature\.query\.feature\.group\/1\.27\.36/);
  assert.match(script, /bundle\.lock\.json/);
  assert.match(script, /sbom\.cdx\.json/);
  assert.match(script, /Start-BwMcp\.ps1/);
  assert.match(script, /BwStudio\.ps1/);
  assert.match(script, /LOCAL-UNSIGNED/);
  assert.match(script, /signedReleaseRequiredForRemoteDeployment/);
  assert.match(script, /org\.eclipse\.equinox\.simpleconfigurator[\\/]bundles\.info/);
  assert.match(script, /com\.sap\.bw\.automation,0\.1\.0,plugins[\\/]com\.sap\.bw\.automation_0\.1\.0\.jar,4,true/);
  assert.doesNotMatch(script, /Join-Path \$eclipseRoot "dropins"/);
  assert.match(script, /-noPwdStore/);
  assert.match(script, /PSObject\.Properties\["sha512"\]/);
  assert.match(script, /Join-Path \$env:TEMP "bwa-/);
  assert.match(script, /tar\.exe -xf/);
  assert.match(script, /--strip-components=1/);
  assert.doesNotMatch(script, /Move-Item -LiteralPath \$children/);
  assert.match(script, /tar\.exe -a -cf/);
  assert.doesNotMatch(script, /ZipFile\]::ExtractToDirectory/);
  assert.doesNotMatch(script, /ZipFile\]::CreateFromDirectory/);
  assert.match(script, /curl\.exe/);
  assert.doesNotMatch(script, /Invoke-WebRequest/);
  assert.doesNotMatch(script, /Expand-Archive/);
  assert.doesNotMatch(script, /Compress-Archive/);
  assert.doesNotMatch(script, /Remove-Item|Clear-Content|rmdir|rimraf/i);
});

test("release signing is fail-closed and does not ship a private key", () => {
  const signer = read("bundle/sign-bundle.mjs");
  assert.match(signer, /RSA-SHA256/);
  assert.match(signer, /privateKeyPath/);
  const trust = JSON.parse(read("config/trusted-publishers.json"));
  assert.deepEqual(trust, { schemaVersion: 1, keys: [] });
  const trackedNames = fs.readdirSync(pluginRoot, { recursive: true }).map(String).join("\n");
  assert.doesNotMatch(trackedNames, /private.*\.(?:pem|key|pfx|p12)$/i);
});

test("Windows release workflow builds, tests, signs, and publishes the portable ZIP", () => {
  const workflowPath = path.join(repoRoot, ".github/workflows/sap-bw-query-bundle.yml");
  assert.equal(fs.existsSync(workflowPath), true, `missing ${workflowPath}`);
  const workflow = fs.readFileSync(workflowPath, "utf8");
  assert.match(workflow, /windows-2025/);
  assert.match(workflow, /node-version: 24\.18\.0/);
  assert.match(workflow, /BW_STUDIO_SIGNING_PRIVATE_KEY/);
  assert.match(workflow, /Build-BwStudio\.ps1/);
  assert.match(workflow, /bw-automation-studio-.*windows-x64\.zip/);
  assert.match(workflow, /upload-artifact/);
});
