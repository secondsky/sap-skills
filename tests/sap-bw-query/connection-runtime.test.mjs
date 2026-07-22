import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const subjectUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/connection-store.mjs"));

async function loadSubject() {
  try { return await import(subjectUrl); } catch { return null; }
}

const directConnection = {
  alias: "BWD-100",
  systemId: "BWD",
  client: "100",
  language: "EN",
  userId: "BW_READER",
  mode: "applicationServer",
  applicationServer: "127.0.0.1",
  systemNumber: "00",
  sncEnabled: true,
  ssoEnabled: true,
};

test("connection metadata is append-only and contains no authentication material", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "connection store is not implemented");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bw-connection-store-"));
  const store = new subject.ConnectionStore({ root, now: () => "2026-07-13T12:00:00.000Z" });
  const first = store.prepare(directConnection);
  const second = store.prepare({ ...directConnection, language: "DE" });
  assert.equal(first.alias, "BWD-100");
  assert.equal(second.language, "DE");
  const files = fs.readdirSync(path.join(root, "connections/BWD-100"));
  assert.equal(files.length, 2);
  const stored = files.map((file) => fs.readFileSync(path.join(root, "connections/BWD-100", file), "utf8")).join("\n");
  assert.doesNotMatch(stored, /password|passwd|\bpwd\b|secret|token|apiKey|credential/i);
  assert.throws(() => store.prepare({ ...directConnection, password: "do-not-store" }), { code: "SECRET_REJECTED" });
});

test("SAP UI landscape import extracts connection metadata without credentials", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "connection store is not implemented");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bw-landscape-store-"));
  const landscapePath = path.join(root, "SAPUILandscape.xml");
  fs.writeFileSync(landscapePath, `<?xml version="1.0"?><Landscape><Services><Service name="BWP Production" systemid="BWP" client="200" server="bw.example.invalid" systemnumber="01" language="EN" sncop="1"/></Services></Landscape>`);
  const store = new subject.ConnectionStore({ root });
  const imported = store.importLandscape(landscapePath, "BWP-200");
  assert.equal(imported.alias, "BWP-200");
  assert.equal(imported.systemId, "BWP");
  assert.equal(imported.applicationServer, "bw.example.invalid");
  assert.equal(imported.sncEnabled, true);
  assert.doesNotMatch(JSON.stringify(imported), /password|secret|token|credential/i);
});

test("reachability performs a TCP check without authentication", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "connection store is not implemented");
  const server = net.createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    const result = await subject.testReachability({ host: "127.0.0.1", port, timeoutMs: 1000 });
    assert.equal(result.reachable, true);
    assert.equal(result.authenticated, false);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
