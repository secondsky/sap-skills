import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });

const result = await build({
  entryPoints: [path.join(root, "src/server.mjs")],
  outfile: path.join(dist, "server.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node24",
  packages: "bundle",
  sourcemap: false,
  legalComments: "external",
  metafile: true,
});

fs.writeFileSync(path.join(dist, "build-meta.json"), JSON.stringify(result.metafile, null, 2));
