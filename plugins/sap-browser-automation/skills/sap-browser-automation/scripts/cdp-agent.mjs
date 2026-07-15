#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_TIMEOUT_MS = 15_000;
const REPEATABLE_OPTIONS = new Set(['origin', 'cookieDomain']);

function optionName(name) {
  return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function parseCliArguments(argv) {
  const [command, ...tokens] = argv;
  const options = {};

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token.startsWith('--')) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const equals = token.indexOf('=');
    const rawName = token.slice(2, equals >= 0 ? equals : undefined);
    const name = optionName(rawName);
    let value;

    if (equals >= 0) {
      value = token.slice(equals + 1);
    } else if (tokens[index + 1] && !tokens[index + 1].startsWith('--')) {
      value = tokens[index + 1];
      index += 1;
    } else {
      value = true;
    }

    if (REPEATABLE_OPTIONS.has(name)) {
      options[name] = [...(options[name] ?? []), value];
    } else {
      options[name] = value;
    }
  }

  return { command, options };
}

function targetPath(target) {
  try {
    const url = new URL(target.url);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return target.url ?? '';
  }
}

function targetHost(target) {
  try {
    return new URL(target.url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

export function filterTargets(targets, filters = {}) {
  return targets.filter((target) => {
    if (target.type !== 'page') return false;
    if (filters.targetId && target.id !== filters.targetId) return false;
    if (filters.host && targetHost(target) !== String(filters.host).toLowerCase()) return false;
    if (
      filters.pathContains
      && !targetPath(target).toLowerCase().includes(String(filters.pathContains).toLowerCase())
    ) return false;
    if (
      filters.titleContains
      && !String(target.title ?? '').toLowerCase().includes(String(filters.titleContains).toLowerCase())
    ) return false;
    return true;
  });
}

function summarizeTarget(target) {
  return {
    id: target.id,
    type: target.type,
    title: target.title,
    url: target.url,
  };
}

export function selectTarget(targets, filters = {}) {
  const matches = filterTargets(targets, filters);
  if (matches.length === 0) {
    throw new Error(`Target selection matched no page targets. Available: ${JSON.stringify(
      targets.filter((target) => target.type === 'page').map(summarizeTarget),
    )}`);
  }
  if (matches.length > 1) {
    throw new Error(`Target selection matched ${matches.length} page targets. Add --target-id, --host, --path-contains, or --title-contains. Matches: ${JSON.stringify(
      matches.map(summarizeTarget),
    )}`);
  }
  return matches[0];
}

function normalizeAllowedHosts(origins) {
  return origins.map((origin) => {
    try {
      return new URL(origin).hostname.toLowerCase();
    } catch {
      return String(origin).replace(/^\./, '').toLowerCase();
    }
  });
}

export function filterCookiesForOrigins(cookies, origins) {
  const hosts = normalizeAllowedHosts(origins);
  return cookies.filter((cookie) => {
    const domain = String(cookie.domain ?? '').replace(/^\./, '').toLowerCase();
    return hosts.some((host) => host === domain || host.endsWith(`.${domain}`));
  });
}

export function toCookieParams(cookies) {
  const allowed = [
    'name',
    'value',
    'url',
    'domain',
    'path',
    'secure',
    'httpOnly',
    'sameSite',
    'priority',
    'sameParty',
    'sourceScheme',
    'sourcePort',
    'partitionKey',
  ];

  return cookies.map((cookie) => {
    const result = {};
    for (const key of allowed) {
      if (cookie[key] !== undefined) result[key] = cookie[key];
    }
    if (Number.isFinite(cookie.expires) && cookie.expires > 0) result.expires = cookie.expires;
    return result;
  });
}

class CdpConnection {
  constructor(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
    this.url = url;
    this.timeoutMs = timeoutMs;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    if (typeof WebSocket !== 'function') {
      throw new Error('Node.js 22 or newer is required because global WebSocket is unavailable.');
    }

    this.socket = new WebSocket(this.url);
    this.socket.addEventListener('message', (event) => this.#onMessage(event));
    this.socket.addEventListener('close', () => this.#rejectPending(new Error('CDP connection closed.')));
    this.socket.addEventListener('error', () => this.#rejectPending(new Error('CDP WebSocket error.')));

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error(`Timed out connecting to CDP after ${this.timeoutMs} ms.`)),
        this.timeoutMs,
      );
      this.socket.addEventListener('open', () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });
      this.socket.addEventListener('error', () => {
        clearTimeout(timeout);
        reject(new Error('Could not connect to the CDP WebSocket.'));
      }, { once: true });
    });
    return this;
  }

  #onMessage(event) {
    const message = JSON.parse(String(event.data));
    if (!message.id || !this.pending.has(message.id)) return;
    const pending = this.pending.get(message.id);
    this.pending.delete(message.id);
    clearTimeout(pending.timeout);
    if (message.error) {
      pending.reject(new Error(`${pending.method}: ${message.error.message}`));
    } else {
      pending.resolve(message.result ?? {});
    }
  }

  #rejectPending(error) {
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
    this.pending.clear();
  }

  send(method, params = {}) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('CDP connection is not open.');
    }
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out after ${this.timeoutMs} ms.`));
      }, this.timeoutMs);
      this.pending.set(id, { method, resolve, reject, timeout });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.socket && this.socket.readyState < WebSocket.CLOSING) this.socket.close();
  }
}

async function connectionInfo(options) {
  let port = options.port ? Number(options.port) : undefined;
  let browserWebSocketUrl = options.endpoint;

  if (options.userDataDir) {
    const activePortPath = path.join(path.resolve(options.userDataDir), 'DevToolsActivePort');
    const lines = (await readFile(activePortPath, 'utf8')).trim().split(/\r?\n/);
    port = Number(lines[0]);
    if (!Number.isInteger(port) || port <= 0 || !lines[1]) {
      throw new Error(`Invalid DevToolsActivePort file: ${activePortPath}`);
    }
    browserWebSocketUrl = `ws://127.0.0.1:${port}${lines[1]}`;
  }

  if (!port && browserWebSocketUrl) {
    const endpoint = new URL(browserWebSocketUrl);
    port = Number(endpoint.port);
  }

  if (!port) {
    throw new Error('Provide --user-data-dir, --port, or --endpoint.');
  }

  const baseUrl = `http://127.0.0.1:${port}`;
  if (!browserWebSocketUrl) {
    const response = await fetch(`${baseUrl}/json/version`);
    if (!response.ok) throw new Error(`CDP version endpoint returned ${response.status}.`);
    browserWebSocketUrl = (await response.json()).webSocketDebuggerUrl;
  }

  return { baseUrl, browserWebSocketUrl, port };
}

async function listTargets(info) {
  const response = await fetch(`${info.baseUrl}/json/list`);
  if (!response.ok) throw new Error(`CDP target endpoint returned ${response.status}.`);
  return response.json();
}

function targetFilters(options) {
  return {
    targetId: options.targetId,
    host: options.host,
    pathContains: options.pathContains,
    titleContains: options.titleContains,
  };
}

async function openPage(info, options) {
  const targets = await listTargets(info);
  const target = selectTarget(targets, targetFilters(options));
  if (!target.webSocketDebuggerUrl) {
    throw new Error(`Target ${target.id} has no page WebSocket endpoint.`);
  }
  const connection = await new CdpConnection(target.webSocketDebuggerUrl).connect();
  return { connection, target };
}

async function evaluate(connection, expression) {
  const result = await connection.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result?.value;
}

async function waitForReady(connection, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const state = await evaluate(connection, 'document.readyState');
    if (state === 'interactive' || state === 'complete') return state;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Page did not become ready within ${timeoutMs} ms.`);
}

async function clickSelector(connection, selector) {
  const expression = `(() => {
    const selector = ${JSON.stringify(selector)};
    const find = (root) => {
      const direct = root.querySelector(selector);
      if (direct) return direct;
      for (const element of root.querySelectorAll('*')) {
        if (element.shadowRoot) {
          const nested = find(element.shadowRoot);
          if (nested) return nested;
        }
      }
      return null;
    };
    const element = find(document);
    if (!element) return { error: 'Selector did not match an element.' };
    element.scrollIntoView({ block: 'center', inline: 'center' });
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2,
      width: rect.width, height: rect.height, disabled: Boolean(element.disabled) };
  })()`;
  const location = await evaluate(connection, expression);
  if (location?.error) throw new Error(`${location.error} Selector: ${selector}`);
  if (location.disabled) throw new Error(`Element is disabled. Selector: ${selector}`);
  if (!(location.width > 0 && location.height > 0)) {
    throw new Error(`Element has no clickable area. Selector: ${selector}`);
  }
  await clickPoint(connection, location.x, location.y);
  return location;
}

async function clickPoint(connection, x, y) {
  const point = { x: Number(x), y: Number(y), button: 'left', clickCount: 1 };
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    throw new Error('click-point requires numeric --x and --y values.');
  }
  await connection.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await connection.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point });
  await connection.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point });
}

function storageExpression() {
  return `(() => {
    const read = (storage) => {
      const values = {};
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        values[key] = storage.getItem(key);
      }
      return values;
    };
    return { origin: location.origin, localStorage: read(localStorage), sessionStorage: read(sessionStorage) };
  })()`;
}

function storageBootstrapSource(origins) {
  const serialized = JSON.stringify(Object.fromEntries(
    origins.map((entry) => [entry.origin, entry]),
  )).replaceAll('<', '\\u003c');
  return `(() => {
    const entries = ${serialized};
    const current = entries[location.origin];
    if (!current) return false;
    for (const [key, value] of Object.entries(current.localStorage || {})) localStorage.setItem(key, value);
    for (const [key, value] of Object.entries(current.sessionStorage || {})) sessionStorage.setItem(key, value);
    return true;
  })()`;
}

async function commandTargets(info, options) {
  const targets = await listTargets(info);
  return filterTargets(targets, targetFilters(options)).map(summarizeTarget);
}

async function commandInspect(info, options) {
  const { connection, target } = await openPage(info, options);
  try {
    const page = await evaluate(connection, `(() => ({
      title: document.title,
      url: location.href,
      readyState: document.readyState,
      text: (document.body?.innerText || '').slice(0, 30000),
      interactive: [...document.querySelectorAll('a,button,input,select,textarea,[role],[tabindex]')]
        .filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
        })
        .slice(0, 500)
        .map((element) => ({
          tag: element.tagName.toLowerCase(), id: element.id || undefined,
          role: element.getAttribute('role') || undefined,
          name: element.getAttribute('aria-label') || element.innerText?.trim() || element.value || undefined,
          disabled: Boolean(element.disabled),
        })),
    }))()`);
    const accessibility = await connection.send('Accessibility.getFullAXTree');
    const ax = (accessibility.nodes ?? []).filter((node) => !node.ignored).slice(0, 500).map((node) => ({
      role: node.role?.value,
      name: node.name?.value,
      value: node.value?.value,
    }));
    return { target: summarizeTarget(target), page, accessibility: ax };
  } finally {
    connection.close();
  }
}

async function commandEvaluate(info, options) {
  let expression = options.expression;
  if (options.expressionFile) expression = await readFile(path.resolve(options.expressionFile), 'utf8');
  if (!expression) throw new Error('evaluate requires --expression or --expression-file.');
  const { connection } = await openPage(info, options);
  try {
    return { value: await evaluate(connection, expression) };
  } finally {
    connection.close();
  }
}

async function commandNavigate(info, options) {
  if (!options.url) throw new Error('navigate requires --url.');
  const { connection, target } = await openPage(info, options);
  try {
    await connection.send('Page.enable');
    const result = await connection.send('Page.navigate', { url: options.url });
    if (result.errorText) throw new Error(`Navigation failed: ${result.errorText}`);
    await waitForReady(connection, Number(options.timeout ?? DEFAULT_TIMEOUT_MS));
    return { targetId: target.id, url: await evaluate(connection, 'location.href') };
  } finally {
    connection.close();
  }
}

async function commandClick(info, options) {
  if (!options.selector) throw new Error('click requires --selector.');
  const { connection } = await openPage(info, options);
  try {
    return await clickSelector(connection, options.selector);
  } finally {
    connection.close();
  }
}

async function commandClickPoint(info, options) {
  const { connection } = await openPage(info, options);
  try {
    await clickPoint(connection, options.x, options.y);
    return { x: Number(options.x), y: Number(options.y) };
  } finally {
    connection.close();
  }
}

async function commandType(info, options) {
  if (options.text === undefined || options.text === true) throw new Error('type requires --text.');
  const { connection } = await openPage(info, options);
  try {
    if (options.selector) await clickSelector(connection, options.selector);
    await connection.send('Input.insertText', { text: String(options.text) });
    return { insertedCharacters: String(options.text).length };
  } finally {
    connection.close();
  }
}

async function commandKey(info, options) {
  if (!options.key || options.key === true) throw new Error('key requires --key.');
  const { connection } = await openPage(info, options);
  try {
    const key = String(options.key);
    await connection.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key, code: key });
    await connection.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key });
    return { key };
  } finally {
    connection.close();
  }
}

async function commandScreenshot(info, options) {
  if (!options.output) throw new Error('screenshot requires --output.');
  const output = path.resolve(options.output);
  const { connection } = await openPage(info, options);
  try {
    await connection.send('Page.enable');
    const capture = await connection.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: options.fullPage === true,
    });
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, Buffer.from(capture.data, 'base64'));
    return { output };
  } finally {
    connection.close();
  }
}

async function commandExportAuth(info, options) {
  if (!options.stateFile) throw new Error('export-auth requires --state-file.');
  const origins = (options.origin ?? []).map((origin) => new URL(origin).origin);
  if (origins.length === 0) throw new Error('export-auth requires at least one --origin.');
  const allowedCookieScopes = [...origins, ...(options.cookieDomain ?? [])];
  const browser = await new CdpConnection(info.browserWebSocketUrl).connect();
  const { connection, target } = await openPage(info, options);
  try {
    const cookieResult = await browser.send('Storage.getCookies');
    const cookies = filterCookiesForOrigins(cookieResult.cookies ?? [], allowedCookieScopes);
    const storage = await evaluate(connection, storageExpression());
    if (!origins.includes(storage.origin)) {
      throw new Error(`Selected target origin ${storage.origin} is not included in --origin.`);
    }
    const state = {
      version: 1,
      capturedAt: new Date().toISOString(),
      target: summarizeTarget(target),
      cookies,
      origins: [storage],
    };
    const stateFile = path.resolve(options.stateFile);
    await mkdir(path.dirname(stateFile), { recursive: true });
    await writeFile(stateFile, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
    return {
      stateFile,
      cookieCount: cookies.length,
      originCount: state.origins.length,
      localStorageEntries: Object.keys(storage.localStorage).length,
      sessionStorageEntries: Object.keys(storage.sessionStorage).length,
    };
  } finally {
    browser.close();
    connection.close();
  }
}

async function commandImportAuth(info, options) {
  if (!options.stateFile) throw new Error('import-auth requires --state-file.');
  const stateFile = path.resolve(options.stateFile);
  const state = JSON.parse(await readFile(stateFile, 'utf8'));
  if (state.version !== 1 || !Array.isArray(state.cookies) || !Array.isArray(state.origins)) {
    throw new Error(`Unsupported auth-state file: ${stateFile}`);
  }
  const browser = await new CdpConnection(info.browserWebSocketUrl).connect();
  const { connection } = await openPage(info, options);
  try {
    const cookies = toCookieParams(state.cookies);
    if (cookies.length > 0) await browser.send('Storage.setCookies', { cookies });
    const bootstrap = storageBootstrapSource(state.origins);
    await connection.send('Page.enable');
    await connection.send('Page.addScriptToEvaluateOnNewDocument', { source: bootstrap });
    await evaluate(connection, bootstrap);
    await connection.send('Page.reload', { ignoreCache: true });
    await waitForReady(connection, Number(options.timeout ?? DEFAULT_TIMEOUT_MS));
    return {
      stateFile,
      cookieCount: cookies.length,
      originCount: state.origins.length,
      url: await evaluate(connection, 'location.href'),
    };
  } finally {
    browser.close();
    connection.close();
  }
}

function help() {
  return `Usage: node scripts/cdp-agent.mjs <command> [options]

Connection: --user-data-dir <path> | --port <number> | --endpoint <browser-ws-url>
Target:     --target-id <id> --host <host> --path-contains <text> --title-contains <text>

Commands:
  targets
  inspect | snapshot
  navigate --url <url>
  evaluate (--expression <js> | --expression-file <path>)
  click --selector <css>
  click-point --x <number> --y <number>
  type [--selector <css>] --text <text>
  key --key <key>
  screenshot --output <png> [--full-page]
  export-auth --origin <origin> [--origin <origin>] --state-file <json>
  import-auth --state-file <json>`;
}

export async function runCli(argv = process.argv.slice(2)) {
  const { command, options } = parseCliArguments(argv);
  if (!command || command === 'help' || options.help) return help();
  const major = Number(process.versions.node.split('.')[0]);
  if (major < 22 || typeof fetch !== 'function' || typeof WebSocket !== 'function') {
    throw new Error('cdp-agent.mjs requires Node.js 22 or newer with global fetch and WebSocket.');
  }
  const info = await connectionInfo(options);

  switch (command) {
    case 'targets': return commandTargets(info, options);
    case 'inspect':
    case 'snapshot': return commandInspect(info, options);
    case 'navigate': return commandNavigate(info, options);
    case 'evaluate': return commandEvaluate(info, options);
    case 'click': return commandClick(info, options);
    case 'click-point': return commandClickPoint(info, options);
    case 'type': return commandType(info, options);
    case 'key': return commandKey(info, options);
    case 'screenshot': return commandScreenshot(info, options);
    case 'export-auth': return commandExportAuth(info, options);
    case 'import-auth': return commandImportAuth(info, options);
    default: throw new Error(`Unknown command: ${command}\n${help()}`);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli()
    .then((result) => {
      if (typeof result === 'string') process.stdout.write(`${result}\n`);
      else process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    })
    .catch((error) => {
      process.stderr.write(`${error.message}\n`);
      process.exitCode = 1;
    });
}
