import crypto from "node:crypto";
import net from "node:net";
import { assertNoSecrets } from "./secret-guard.mjs";

export const ECLIPSE_METHODS = Object.freeze([
  "inspectCapabilities",
  "describeProvider",
  "listQueries",
  "readQuery",
  "readQueryModel",
  "projectCreateOrOpen",
  "createLocalDraft",
  "applySpecToDraft",
  "previewDraft",
  "prepareNewQuerySave",
  "populateQueryEditor",
]);

const ALLOWED_METHODS = new Set(ECLIPSE_METHODS);

export function pipePathForHome(home) {
  const id = crypto.createHash("sha256").update(String(home).toLowerCase()).digest("hex").slice(0, 16);
  return `\\\\.\\pipe\\bw-automation-${id}`;
}

export class BridgeBroker {
  #pipePath;
  #timeoutMs;
  #server = null;
  #socket = null;
  #pending = new Map();
  #buffer = "";
  #connectionWaiters = [];

  constructor({ pipePath, timeoutMs = 15000 }) {
    if (!pipePath) throw new Error("Named-pipe path is required");
    this.#pipePath = pipePath;
    this.#timeoutMs = timeoutMs;
  }

  start() {
    if (this.#server) return Promise.resolve();
    this.#server = net.createServer((socket) => {
      if (this.#socket) {
        socket.end(`${JSON.stringify({ error: { code: "BRIDGE_ALREADY_CONNECTED", message: "Eclipse bridge is already connected" } })}\n`);
        return;
      }
      this.#socket = socket;
      for (const waiter of this.#connectionWaiters.splice(0)) waiter.resolve(socket);
      socket.setEncoding("utf8");
      socket.on("data", (chunk) => this.#onData(chunk));
      socket.on("close", () => {
        if (this.#socket === socket) this.#socket = null;
        for (const pending of this.#pending.values()) pending.reject(new Error("Eclipse bridge disconnected"));
        this.#pending.clear();
      });
    });
    return new Promise((resolve, reject) => {
      this.#server.once("error", reject);
      this.#server.listen(this.#pipePath, () => {
        this.#server.off("error", reject);
        resolve();
      });
    });
  }

  #waitForConnection() {
    if (this.#socket) return Promise.resolve(this.#socket);
    return new Promise((resolve, reject) => {
      const waiter = { resolve, reject, timer: null };
      waiter.timer = setTimeout(() => {
        const index = this.#connectionWaiters.indexOf(waiter);
        if (index >= 0) this.#connectionWaiters.splice(index, 1);
        reject(new Error("Eclipse bridge is unavailable; launch BW Automation Studio first"));
      }, this.#timeoutMs);
      waiter.resolve = (socket) => {
        clearTimeout(waiter.timer);
        resolve(socket);
      };
      this.#connectionWaiters.push(waiter);
    });
  }

  #onData(chunk) {
    this.#buffer += chunk;
    while (true) {
      const newline = this.#buffer.indexOf("\n");
      if (newline < 0) return;
      const line = this.#buffer.slice(0, newline);
      this.#buffer = this.#buffer.slice(newline + 1);
      if (!line.trim()) continue;
      let message;
      try { message = JSON.parse(line); } catch { continue; }
      const pending = this.#pending.get(message.id);
      if (!pending) continue;
      clearTimeout(pending.timer);
      this.#pending.delete(message.id);
      if (message.error) pending.reject(new Error(String(message.error.message ?? "Eclipse bridge error")));
      else {
        try {
          assertNoSecrets(message.result);
          pending.resolve(message.result);
        } catch (error) { pending.reject(error); }
      }
    }
  }

  async call(method, payload = {}) {
    if (!ALLOWED_METHODS.has(method)) throw new Error(`Eclipse method ${method} is not allow-listed`);
    assertNoSecrets(payload);
    const socket = await this.#waitForConnection();
    const id = crypto.randomUUID();
    const request = { id, method, payload };
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.#pending.delete(id);
        reject(new Error(`Eclipse bridge timed out for ${method}`));
      }, this.#timeoutMs);
      this.#pending.set(id, { resolve, reject, timer });
      socket.write(`${JSON.stringify(request)}\n`, (error) => {
        if (!error) return;
        clearTimeout(timer);
        this.#pending.delete(id);
        reject(error);
      });
    });
  }

  close() {
    return new Promise((resolve) => {
      if (this.#socket) this.#socket.end();
      if (!this.#server) { resolve(); return; }
      this.#server.close(() => {
        this.#server = null;
        resolve();
      });
    });
  }
}
