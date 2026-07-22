import crypto from "node:crypto";
import fs from "node:fs";

const [manifestPath, privateKeyPath, keyId, signaturePath, trustPolicyPath] = process.argv.slice(2);
if (![manifestPath, privateKeyPath, keyId, signaturePath, trustPolicyPath].every(Boolean)) {
  throw new Error("Usage: sign-bundle.mjs <manifest> <privateKeyPath> <keyId> <signature> <trustPolicy>");
}

const manifestBytes = fs.readFileSync(manifestPath);
const manifest = JSON.parse(manifestBytes);
if (manifest.keyId !== keyId) throw new Error("Manifest signing key identity mismatch");

const privateKey = crypto.createPrivateKey(fs.readFileSync(privateKeyPath));
const publicJwk = crypto.createPublicKey(privateKey).export({ format: "jwk" });
const signature = crypto.sign("sha256", manifestBytes, privateKey);
fs.writeFileSync(signaturePath, signature.toString("base64"), { encoding: "utf8", flag: "wx" });
fs.writeFileSync(trustPolicyPath, JSON.stringify({
  schemaVersion: 1,
  keys: [{ id: keyId, algorithm: "RSA-SHA256", modulus: publicJwk.n, exponent: publicJwk.e }],
}, null, 2), { encoding: "utf8", flag: "wx" });
