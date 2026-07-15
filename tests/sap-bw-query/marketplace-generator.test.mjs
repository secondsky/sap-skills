import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const script = fs.readFileSync(path.join(repoRoot, "scripts", "generate-marketplace.sh"), "utf8");

test("marketplace generator does not pass the complete catalog through argv", () => {
  assert.doesNotMatch(script, /--argjson\s+plugins\s+"\$plugins"/);
  assert.match(script, /--slurpfile\s+plugins_file/);
});
