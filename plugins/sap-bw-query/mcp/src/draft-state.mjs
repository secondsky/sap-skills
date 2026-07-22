import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { resolveAndValidateSpec } from "./query-spec.mjs";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function hashSpec(spec) {
  return crypto.createHash("sha256").update(canonical(spec)).digest("hex");
}

export class DraftStore {
  #drafts = new Map();
  #now;
  #root;

  constructor({ now = () => new Date().toISOString(), root = null } = {}) {
    this.#now = now;
    this.#root = root ? path.resolve(root) : null;
  }

  #persist(draft) {
    if (!this.#root) return;
    const directory = path.join(this.#root, draft.id);
    fs.mkdirSync(directory, { recursive: true });
    const timestamp = this.#now().replaceAll(/[^0-9A-Za-z]/g, "");
    fs.writeFileSync(path.join(directory, `${timestamp}-${crypto.randomUUID()}.json`), JSON.stringify(draft), { encoding: "utf8", flag: "wx" });
  }

  #recover(id) {
    if (!this.#root) return null;
    const directory = path.join(this.#root, id);
    if (!fs.existsSync(directory)) return null;
    const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort();
    if (files.length === 0) return null;
    const draft = JSON.parse(fs.readFileSync(path.join(directory, files.at(-1)), "utf8"));
    this.#drafts.set(id, draft);
    return draft;
  }

  create(spec) {
    const result = resolveAndValidateSpec(spec);
    if (!result.valid) throw new Error(`Invalid QuerySpec: ${result.errors.join("; ")}`);
    const draft = {
      id: crypto.randomUUID(),
      state: "LOCAL_DRAFT",
      createdAt: this.#now(),
      updatedAt: this.#now(),
      spec: result.resolvedSpec,
      specHash: hashSpec(result.resolvedSpec),
    };
    this.#drafts.set(draft.id, draft);
    this.#persist(draft);
    return structuredClone(draft);
  }

  get(id) {
    const draft = this.#drafts.get(id) ?? this.#recover(id);
    if (!draft) throw new Error(`Unknown local draft ${id}`);
    return structuredClone(draft);
  }

  apply(id, spec) {
    const existing = this.#drafts.get(id);
    if (!existing) throw new Error(`Unknown local draft ${id}`);
    if (existing.state !== "LOCAL_DRAFT") throw new Error("Only a local unsaved draft can be changed");
    const result = resolveAndValidateSpec(spec);
    if (!result.valid) throw new Error(`Invalid QuerySpec: ${result.errors.join("; ")}`);
    existing.spec = result.resolvedSpec;
    existing.specHash = hashSpec(result.resolvedSpec);
    existing.updatedAt = this.#now();
    this.#persist(existing);
    return structuredClone(existing);
  }

  prepareSave(id, { existingTechnicalNames = [] } = {}) {
    const existing = this.#drafts.get(id);
    if (!existing) throw new Error(`Unknown local draft ${id}`);
    const technicalName = existing.spec.technicalName.toLowerCase();
    if (existingTechnicalNames.some((name) => String(name).toLowerCase() === technicalName)) {
      throw new Error(`Query ${existing.spec.technicalName} already exists; overwrite is permanently blocked`);
    }
    existing.state = "SAVE_PENDING_HUMAN";
    existing.updatedAt = this.#now();
    this.#persist(existing);
    return {
      ...structuredClone(existing),
      requiresEclipseHumanConfirmation: true,
      confirmationBinding: {
        system: existing.spec.target.system,
        client: existing.spec.target.client,
        provider: existing.spec.target.provider,
        technicalName: existing.spec.technicalName,
        specHash: existing.specHash,
      },
    };
  }
}
