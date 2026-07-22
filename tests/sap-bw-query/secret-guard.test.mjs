import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const moduleUrl = pathToFileURL(path.resolve(here, "../../plugins/sap-bw-query/mcp/src/secret-guard.mjs"));

async function loadSubject() {
  try {
    return await import(moduleUrl);
  } catch {
    return null;
  }
}

test("SecretGuard rejects nested password-like keys without echoing values", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "SecretGuard module is not implemented");
  const input = { connection: { PaSsWd: "Example-Do-Not-Use-123" } };
  assert.throws(
    () => subject.assertNoSecrets(input),
    (error) => {
      assert.equal(error.code, "SECRET_REJECTED");
      assert.match(error.message, /rotate it immediately/i);
      assert.doesNotMatch(error.message, /Example-Do-Not-Use-123/);
      return true;
    },
  );
});

test("SecretGuard rejects every prohibited key spelling at any depth", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "SecretGuard module is not implemented");
  for (const key of ["password", "PASSWD", "pwd", "Secret", "TOKEN", "apiKey", "credential"]) {
    assert.throws(() => subject.assertNoSecrets({ safe: [{ [key]: "do-not-log" }] }), { code: "SECRET_REJECTED" });
  }
});

test("SecretGuard rejects labeled credential text and permits password-free metadata", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "SecretGuard module is not implemented");
  assert.throws(() => subject.assertNoSecrets({ note: "password: Example-Do-Not-Use-123" }), { code: "SECRET_REJECTED" });
  assert.doesNotThrow(() => subject.assertNoSecrets({ userId: "BW_READER", authenticationMode: "SNC", client: "100" }));
});

test("log sanitization never returns suspected credential material", async () => {
  const subject = await loadSubject();
  assert.ok(subject, "SecretGuard module is not implemented");
  const sanitized = JSON.stringify(subject.sanitizeForLog({ note: "pwd=Example-Do-Not-Use-123", nested: { token: "abc" } }));
  assert.doesNotMatch(sanitized, /Example-Do-Not-Use-123|abc/);
  assert.match(sanitized, /REDACTED/);
});
