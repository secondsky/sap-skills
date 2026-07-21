import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const deployer = path.join(repoRoot, "plugins/sap-bw-query/scripts/BwStudio.ps1");

function runStudio(home, args) {
  return spawnSync("powershell.exe", [
    "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", deployer, ...args, "-Json",
  ], {
    encoding: "utf8",
    env: { ...process.env, BW_AUTOMATION_HOME: home },
  });
}

function fileSha512(file) {
  return crypto.createHash("sha512").update(fs.readFileSync(file)).digest("hex");
}

function createSignedBundle(version, salt = "") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `bw-studio-fixture-${version}-`));
  const bundle = path.join(root, "bundle");
  // `salt` alters file contents so two bundles with the SAME version produce a different
  // artifact hash — used to exercise same-version-different-content deploys.
  const files = [
    ["eclipse/eclipse.exe", `eclipse-${version}-${salt}`],
    ["jre/bin/javaw.exe", `java-${version}-${salt}`],
    ["node/node.exe", `node-${version}-${salt}`],
    ["mcp/server.mjs", `server-${version}-${salt}`],
  ];
  for (const [relative, content] of files) {
    const target = path.join(bundle, ...relative.split("/"));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  const lock = {
    schemaVersion: 1,
    bundleVersion: version,
    platform: "windows-x64",
    entrypoints: { eclipse: "eclipse/eclipse.exe", java: "jre/bin/javaw.exe", node: "node/node.exe", mcp: "mcp/server.mjs" },
    files: files.map(([relative]) => ({ path: relative, sha512: fileSha512(path.join(bundle, ...relative.split("/"))) })),
  };
  fs.writeFileSync(path.join(bundle, "bundle.lock.json"), JSON.stringify(lock));

  const artifact = path.join(root, `bw-automation-studio-${version}-windows-x64.zip`);
  const zip = spawnSync("powershell.exe", [
    "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command",
    "Compress-Archive -Path (Join-Path $env:BW_FIXTURE_BUNDLE '*') -DestinationPath $env:BW_FIXTURE_ARTIFACT",
  ], { encoding: "utf8", env: { ...process.env, BW_FIXTURE_BUNDLE: bundle, BW_FIXTURE_ARTIFACT: artifact } });
  assert.equal(zip.status, 0, zip.stderr);

  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
  const jwk = publicKey.export({ format: "jwk" });
  const keyId = `test-${crypto.randomUUID()}`;
  const manifest = {
    schemaVersion: 1,
    version,
    platform: "windows-x64",
    artifactFileName: path.basename(artifact),
    artifactSha512: fileSha512(artifact),
    keyId,
  };
  const manifestPath = path.join(root, "bundle.manifest.json");
  const manifestBytes = Buffer.from(JSON.stringify(manifest));
  fs.writeFileSync(manifestPath, manifestBytes);
  const signaturePath = path.join(root, "bundle.manifest.sig");
  fs.writeFileSync(signaturePath, crypto.sign("sha256", manifestBytes, privateKey).toString("base64"));
  const trustPolicyPath = path.join(root, "trusted-publishers.json");
  fs.writeFileSync(trustPolicyPath, JSON.stringify({
    schemaVersion: 1,
    keys: [{ id: keyId, algorithm: "RSA-SHA256", modulus: jwk.n, exponent: jwk.e }],
  }));
  return { root, artifact, manifestPath, signaturePath, trustPolicyPath };
}

test("portable studio entrypoint exists and declares only the approved actions", () => {
  assert.equal(fs.existsSync(deployer), true, `missing ${deployer}`);
  const text = fs.readFileSync(deployer, "utf8");
  assert.match(text, /ValidateSet\("Status", "Deploy", "Launch", "Rollback", "Diagnostics"\)/);
  assert.doesNotMatch(text, /ValidateSet\([^)]*(?:Uninstall|Cleanup|Delete)/i);
  assert.doesNotMatch(text, /Remove-Item|rmdir|rimraf|Directory\.Delete/i);
});

test("status works without an installed studio and does not require admin", () => {
  assert.equal(fs.existsSync(deployer), true, `missing ${deployer}`);
  const result = spawnSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", deployer, "-Action", "Status", "-Json"], {
    encoding: "utf8",
    env: { ...process.env, BW_AUTOMATION_HOME: path.join(here, ".missing-studio-home") },
  });
  assert.equal(result.status, 0, result.stderr);
  const status = JSON.parse(result.stdout);
  assert.equal(status.installed, false);
  assert.equal(status.requiresAdministrator, false);
});

test("deployer is append-only: source contains no filesystem deletion primitive", () => {
  assert.equal(fs.existsSync(deployer), true, `missing ${deployer}`);
  const text = fs.readFileSync(deployer, "utf8");
  const forbidden = [/^\s*Remove-Item\b/im, /^\s*rm\b/im, /^\s*rmdir\b/im, /DeleteFile|DeleteDirectory|Clear-Content/i];
  for (const pattern of forbidden) assert.doesNotMatch(text, pattern);
  assert.match(text, /tar\.exe -xf/);
  assert.doesNotMatch(text, /Expand-Archive/);
  assert.match(text, /Get-ExtendedPath/);
  assert.match(text, /\[System\.IO\.File\]::Exists/);
});

test("online deployment uses HTTPS-only curl downloads", () => {
  const text = fs.readFileSync(deployer, "utf8");
  assert.match(text, /curl\.exe/);
  assert.match(text, /--proto\s+"=https"/);
  assert.match(text, /Scheme\s+-ne\s+"https"/i);
  assert.doesNotMatch(text, /Invoke-WebRequest/);
});

test("Eclipse launch derives the same local named-pipe identity and disables password storage", () => {
  const text = fs.readFileSync(deployer, "utf8");
  assert.match(text, /SHA256/);
  assert.match(text, /bw-automation-/);
  assert.match(text, /-Dbw\.automation\.pipe=/);
  assert.match(text, /-noPwdStore/);
});

test("offline deployment verifies signature, archive hash, and extracted file inventory", () => {
  const fixture = createSignedBundle("1.0.0");
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "bw-studio-home-valid-"));
  const result = runStudio(home, [
    "-Action", "Deploy", "-ArtifactPath", fixture.artifact, "-ManifestPath", fixture.manifestPath,
    "-SignaturePath", fixture.signaturePath, "-TrustPolicyPath", fixture.trustPolicyPath,
  ]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const deployed = JSON.parse(result.stdout);
  assert.equal(deployed.version, "1.0.0");
  assert.equal(deployed.verified, true);
  assert.equal(fs.existsSync(path.join(home, "versions/1.0.0/eclipse/eclipse.exe")), true);
  const status = runStudio(home, ["-Action", "Status"]);
  assert.equal(JSON.parse(status.stdout).activeVersion, "1.0.0");
});

test("local bundle deploys without signing after archive and file-inventory verification", () => {
  const fixture = createSignedBundle("1.0.0-local");
  const manifest = JSON.parse(fs.readFileSync(fixture.manifestPath, "utf8"));
  manifest.keyId = "LOCAL-UNSIGNED";
  fs.writeFileSync(fixture.manifestPath, JSON.stringify(manifest));
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "bw-studio-home-local-"));
  const result = runStudio(home, [
    "-Action", "Deploy", "-ArtifactPath", fixture.artifact, "-ManifestPath", fixture.manifestPath,
  ]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const deployed = JSON.parse(result.stdout);
  assert.equal(deployed.verified, true);
  assert.equal(deployed.trustMode, "local-hash-and-inventory");
  assert.equal(fs.existsSync(path.join(home, "versions/1.0.0-local/eclipse/eclipse.exe")), true);
});

test("deployment rejects corrupted artifacts and leaves no active version", () => {
  const fixture = createSignedBundle("1.0.1");
  fs.appendFileSync(fixture.artifact, "corruption");
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "bw-studio-home-corrupt-"));
  const result = runStudio(home, [
    "-Action", "Deploy", "-ArtifactPath", fixture.artifact, "-ManifestPath", fixture.manifestPath,
    "-SignaturePath", fixture.signaturePath, "-TrustPolicyPath", fixture.trustPolicyPath,
  ]);
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, /corruption/);
  const status = runStudio(home, ["-Action", "Status"]);
  assert.equal(JSON.parse(status.stdout).installed, false);
});

test("same-version redeploy with changed content installs a content-addressed folder, preserving the old", () => {
  const first = createSignedBundle("3.0.0", "a");
  const second = createSignedBundle("3.0.0", "b");
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "bw-studio-home-supersede-"));
  const deploy = (fixture) => runStudio(home, [
    "-Action", "Deploy", "-ArtifactPath", fixture.artifact, "-ManifestPath", fixture.manifestPath,
    "-SignaturePath", fixture.signaturePath, "-TrustPolicyPath", fixture.trustPolicyPath,
  ]);

  const firstResult = deploy(first);
  assert.equal(firstResult.status, 0, firstResult.stderr || firstResult.stdout);
  const firstJson = JSON.parse(firstResult.stdout);
  assert.equal(firstJson.installDir, "3.0.0");
  assert.equal(firstJson.supersededExistingVersion, false);

  const secondResult = deploy(second);
  assert.equal(secondResult.status, 0, secondResult.stderr || secondResult.stdout);
  const secondJson = JSON.parse(secondResult.stdout);
  // Same version, different content -> a NEW content-addressed folder, old one untouched.
  assert.notEqual(secondJson.installDir, "3.0.0");
  assert.match(secondJson.installDir, /^3\.0\.0\+/);
  assert.equal(secondJson.supersededExistingVersion, true);
  assert.equal(fs.existsSync(path.join(home, "versions/3.0.0/eclipse/eclipse.exe")), true);
  assert.equal(fs.existsSync(path.join(home, "versions", secondJson.installDir, "eclipse/eclipse.exe")), true);

  const status = JSON.parse(runStudio(home, ["-Action", "Status"]).stdout);
  assert.equal(status.activeVersion, "3.0.0");
  assert.equal(status.activeInstallDir, secondJson.installDir);

  // Redeploying identical content is idempotent: no new folder, marked as reused.
  const thirdJson = JSON.parse(deploy(second).stdout);
  assert.equal(thirdJson.installDir, secondJson.installDir);
  assert.equal(thirdJson.reusedExistingInstall, true);
  const versionFolders = fs.readdirSync(path.join(home, "versions"));
  assert.equal(versionFolders.length, 2, `expected 2 version folders, got ${versionFolders.join(", ")}`);
});

test("rollback appends an activation and preserves every installed version", () => {
  const first = createSignedBundle("1.1.0");
  const second = createSignedBundle("1.2.0");
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "bw-studio-home-rollback-"));
  for (const fixture of [first, second]) {
    const result = runStudio(home, [
      "-Action", "Deploy", "-ArtifactPath", fixture.artifact, "-ManifestPath", fixture.manifestPath,
      "-SignaturePath", fixture.signaturePath, "-TrustPolicyPath", fixture.trustPolicyPath,
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
  }
  const rollback = runStudio(home, ["-Action", "Rollback", "-TargetVersion", "1.1.0"]);
  assert.equal(rollback.status, 0, rollback.stderr || rollback.stdout);
  assert.equal(JSON.parse(rollback.stdout).activeVersion, "1.1.0");
  assert.equal(fs.existsSync(path.join(home, "versions/1.1.0")), true);
  assert.equal(fs.existsSync(path.join(home, "versions/1.2.0")), true);
  assert.equal(fs.readdirSync(path.join(home, "activations")).length, 3);
});
