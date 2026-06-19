#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { repoRootFrom } from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const launcher = path.join(repoRoot, "plugins/sap-cap-capire/lsp/cds-lsp-launcher.mjs");
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sap-skills-lsp-launcher-"));
const binDir = path.join(tmpRoot, "bin");
const failures = [];

function fail(message) {
  failures.push(message);
}

function writeFakeCdsLsp() {
  fs.mkdirSync(binDir, { recursive: true });

  if (process.platform === "win32") {
    fs.writeFileSync(
      path.join(binDir, "cds-lsp.cmd"),
      [
        "@echo off",
        "echo fake stdout:%*",
        "echo fake stderr:%* 1>&2",
        "if \"%1\"==\"--exit-7\" exit /b 7",
        "exit /b 0",
        "",
      ].join("\r\n"),
    );
    return;
  }

  const fakeBinary = path.join(binDir, "cds-lsp");
  fs.writeFileSync(
    fakeBinary,
    [
      "#!/usr/bin/env sh",
      "printf 'fake stdout:%s\\n' \"$*\"",
      "printf 'fake stderr:%s\\n' \"$*\" >&2",
      "if [ \"$1\" = \"--exit-7\" ]; then exit 7; fi",
      "exit 0",
      "",
    ].join("\n"),
  );
  fs.chmodSync(fakeBinary, 0o755);
}

function runLauncher(args, env = {}) {
  return spawnSync(process.execPath, [launcher, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: 5000,
    env: {
      ...process.env,
      PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ""}`,
      ...env,
    },
  });
}

function assertIncludes(name, actual, expected) {
  if (!actual.includes(expected)) {
    fail(`${name}: expected ${JSON.stringify(actual)} to include ${JSON.stringify(expected)}`);
  }
}

try {
  writeFakeCdsLsp();

  const forwarded = runLauncher(["--stdio", "two words"]);
  if (forwarded.status !== 0) {
    fail(`argument forwarding: expected exit 0, got ${forwarded.status}; stderr=${forwarded.stderr.trim()}`);
  }
  assertIncludes("argument forwarding stdout", forwarded.stdout, "fake stdout:");
  assertIncludes("argument forwarding stdout args", forwarded.stdout, "--stdio");
  assertIncludes("argument forwarding stdout spaced arg", forwarded.stdout, "two words");
  assertIncludes("argument forwarding stderr", forwarded.stderr, "fake stderr:");
  assertIncludes("argument forwarding stderr args", forwarded.stderr, "--stdio");

  const exitCode = runLauncher(["--exit-7"]);
  if (exitCode.status !== 7) {
    fail(`exit forwarding: expected exit 7, got ${exitCode.status}; stderr=${exitCode.stderr.trim()}`);
  }

  if (process.platform !== "win32") {
    const missing = spawnSync(process.execPath, [launcher, "--stdio"], {
      cwd: repoRoot,
      encoding: "utf8",
      timeout: 5000,
      env: { ...process.env, PATH: tmpRoot },
    });
    if (missing.status !== 127) {
      fail(`missing cds-lsp: expected exit 127, got ${missing.status}; stderr=${missing.stderr.trim()}`);
    }
    assertIncludes("missing cds-lsp guidance", missing.stderr, "approved project-local devDependency");
    assertIncludes("missing cds-lsp non-install guarantee", missing.stderr, "never installs packages");
  }
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error("LSP launcher tests failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("LSP launcher tests passed.");
