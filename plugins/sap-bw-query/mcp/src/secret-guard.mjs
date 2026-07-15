const SECRET_KEY_NAMES = new Set([
  "password",
  "passwd",
  "pwd",
  "secret",
  "token",
  "apikey",
  "credential",
]);

const LABELED_SECRET = /\b(?:password|passwd|pwd|secret|token|api[\s_-]*key|credential)\s*[:=]\s*\S+/iu;

export const SECRET_REJECTION_MESSAGE =
  "Do not paste passwords into AI. Treat the exposed password as compromised and rotate it immediately. "
  + "Revoke related sessions if applicable, and do not reuse the password.";

export class SecretRejectedError extends Error {
  constructor(paths = []) {
    super(SECRET_REJECTION_MESSAGE);
    this.name = "SecretRejectedError";
    this.code = "SECRET_REJECTED";
    this.paths = paths.map(() => "[REDACTED_PATH]");
  }
}

function normalizedKey(key) {
  return String(key).toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}

function isSecretKey(key) {
  const normalized = normalizedKey(key);
  if (SECRET_KEY_NAMES.has(normalized)) return true;
  return ["password", "passwd", "secret", "token", "credential", "apikey"]
    .some((suffix) => normalized.endsWith(suffix));
}

function visit(value, path, findings, seen) {
  if (typeof value === "string") {
    if (LABELED_SECRET.test(value)) findings.push(path || "$");
    return;
  }
  if (value === null || typeof value !== "object") return;
  if (seen.has(value)) return;
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, `${path}[${index}]`, findings, seen));
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    if (isSecretKey(key)) findings.push(childPath);
    else visit(child, childPath, findings, seen);
  }
}

export function findSecretPaths(value) {
  const findings = [];
  visit(value, "", findings, new WeakSet());
  return [...new Set(findings)];
}

export function assertNoSecrets(value) {
  const findings = findSecretPaths(value);
  if (findings.length > 0) throw new SecretRejectedError(findings);
  return value;
}

export function sanitizeForLog(value, seen = new WeakSet()) {
  if (typeof value === "string") return LABELED_SECRET.test(value) ? "[REDACTED]" : value;
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return "[CIRCULAR]";
  seen.add(value);

  if (Array.isArray(value)) return value.map((item) => sanitizeForLog(item, seen));

  return Object.fromEntries(Object.entries(value).map(([key, child]) => [
    key,
    isSecretKey(key) ? "[REDACTED]" : sanitizeForLog(child, seen),
  ]));
}
