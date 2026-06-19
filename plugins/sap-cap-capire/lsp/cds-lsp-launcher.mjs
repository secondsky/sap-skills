#!/usr/bin/env node
import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const child = spawn("cds-lsp", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  windowsHide: true,
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on("error", (error) => {
  if (error.code === "ENOENT") {
    console.error(
      "sap-cap-capire: cds-lsp was not found on PATH. Install @sap/cds-lsp through an approved project-local devDependency, user-local npm prefix, or enterprise-managed toolchain, then ensure the cds-lsp command is on PATH. This launcher never installs packages.",
    );
    process.exit(127);
  }

  console.error(`sap-cap-capire: failed to start cds-lsp: ${error.message}`);
  process.exit(1);
});

child.on("close", (code, signal) => {
  if (signal) {
    if (process.platform !== "win32") {
      process.kill(process.pid, signal);
    }
    process.exit(1);
  }

  process.exit(code ?? 0);
});
