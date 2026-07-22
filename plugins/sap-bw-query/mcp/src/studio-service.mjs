import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { assertNoSecrets } from "./secret-guard.mjs";

const pluginRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ACTION_FIELDS = Object.freeze({
  Status: {},
  Deploy: {
    artifactPath: "ArtifactPath",
    manifestPath: "ManifestPath",
    signaturePath: "SignaturePath",
    trustPolicyPath: "TrustPolicyPath",
    releaseChannelUrl: "ReleaseChannelUrl",
  },
  Launch: { workspacePath: "WorkspacePath", connectionAlias: "ConnectionAlias" },
  Rollback: { targetVersion: "TargetVersion" },
  Diagnostics: {},
});

export class StudioService {
  #home;
  #script;

  constructor({ home, script = path.join(pluginRoot, "scripts/BwStudio.ps1") }) {
    this.#home = path.resolve(home);
    this.#script = path.resolve(script);
  }

  run(action, input = {}) {
    assertNoSecrets(input);
    const fields = ACTION_FIELDS[action];
    if (!fields) throw new Error(`Studio action ${action} is not allow-listed`);
    const unknown = Object.keys(input).filter((key) => !(key in fields));
    if (unknown.length > 0) throw new Error(`Unknown studio input field ${unknown[0]}`);
    const args = ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", this.#script, "-Action", action, "-Json"];
    for (const [key, parameter] of Object.entries(fields)) {
      if (input[key] !== undefined && input[key] !== null && input[key] !== "") args.push(`-${parameter}`, String(input[key]));
    }
    return new Promise((resolve, reject) => {
      const child = spawn("powershell.exe", args, {
        windowsHide: true,
        env: { ...process.env, BW_AUTOMATION_HOME: this.#home },
        stdio: ["ignore", "pipe", "pipe"],
      });
      let stdout = "";
      let stderr = "";
      child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
      child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
      child.once("error", reject);
      child.once("close", (code) => {
        if (code !== 0) { reject(new Error("Portable studio action failed; inspect bw_studio_diagnostics locally.")); return; }
        try { resolve(JSON.parse(stdout)); }
        catch { reject(new Error("Portable studio returned an invalid response")); }
      });
    });
  }
}
