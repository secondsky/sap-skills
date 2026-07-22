import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { sanitizeForLog } from "./secret-guard.mjs";

function visualClass(entry) {
  if (entry.status === "BLOCKED") return "red";
  if (entry.status === "USER_ACTION_REQUIRED" || entry.status === "WARNING") return "amber";
  if (entry.status === "SAVE_PENDING_HUMAN") return "dark-red";
  if (entry.status === "COMPLETED") return "green";
  if (/draft/i.test(entry.tool ?? "")) return "violet";
  return "blue";
}

export class StepStore {
  #root;
  #now;

  constructor({ root, now = () => new Date().toISOString() }) {
    if (!root) throw new Error("StepStore root is required");
    this.#root = path.resolve(root);
    this.#now = now;
  }

  append(entry) {
    const timestamp = this.#now();
    const sanitized = sanitizeForLog(entry);
    const record = {
      id: crypto.randomUUID(),
      timestamp,
      visualClass: visualClass(sanitized),
      ...sanitized,
    };
    const directory = path.join(this.#root, "steps");
    fs.mkdirSync(directory, { recursive: true });
    const journalPath = path.join(directory, `${timestamp.slice(0, 10)}.jsonl`);
    fs.appendFileSync(journalPath, `${JSON.stringify(record)}\n`, "utf8");
    return { ...record, journalPath };
  }
}
