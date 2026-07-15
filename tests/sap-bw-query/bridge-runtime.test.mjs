import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const bridgeUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/bridge-broker.mjs"));
const stepsUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/step-store.mjs"));

async function load(url) {
  try { return await import(url); } catch { return null; }
}

test("bridge accepts only allow-listed Eclipse methods", async () => {
  const subject = await load(bridgeUrl);
  assert.ok(subject, "bridge broker is not implemented");
  const broker = new subject.BridgeBroker({ pipePath: `\\\\.\\pipe\\bw-test-${process.pid}-${Date.now()}` });
  await assert.rejects(() => broker.call("saveQuery", {}), /not allow-listed/i);
  await assert.rejects(() => broker.call("deleteQuery", {}), /not allow-listed/i);
});

test("named-pipe request and response stay local and correlate by id", { skip: process.platform !== "win32" }, async () => {
  const subject = await load(bridgeUrl);
  assert.ok(subject, "bridge broker is not implemented");
  const pipePath = `\\\\.\\pipe\\bw-test-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const broker = new subject.BridgeBroker({ pipePath, timeoutMs: 2000 });
  await broker.start();
  const eclipse = net.createConnection(pipePath);
  await new Promise((resolve, reject) => eclipse.once("connect", resolve).once("error", reject));
  let buffer = "";
  eclipse.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    const newline = buffer.indexOf("\n");
    if (newline < 0) return;
    const request = JSON.parse(buffer.slice(0, newline));
    eclipse.write(`${JSON.stringify({ id: request.id, result: { bwmtAvailable: true, echoedMethod: request.method } })}\n`);
  });
  const result = await broker.call("inspectCapabilities", {});
  assert.deepEqual(result, { bwmtAvailable: true, echoedMethod: "inspectCapabilities" });
  eclipse.end();
  await broker.close();
});

test("step journal sanitizes content and marks password rejection sticky red", async () => {
  const subject = await load(stepsUrl);
  assert.ok(subject, "step store is not implemented");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bw-step-store-"));
  const store = new subject.StepStore({ root, now: () => "2026-07-13T12:30:00.000Z" });
  const entry = store.append({ tool: "bw_connection_prepare", status: "BLOCKED", sticky: true, message: "pwd=do-not-log" });
  assert.equal(entry.visualClass, "red");
  assert.equal(entry.sticky, true);
  const content = fs.readFileSync(entry.journalPath, "utf8");
  assert.doesNotMatch(content, /do-not-log/);
  assert.match(content, /REDACTED/);
});
