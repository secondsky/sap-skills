import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const scriptsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cdpScript = path.join(scriptsRoot, 'cdp-agent.mjs');
const profileScript = path.join(scriptsRoot, 'edge-profile.ps1');
const powershell = path.join(
  process.env.SystemRoot ?? 'C:\\Windows',
  'System32',
  'WindowsPowerShell',
  'v1.0',
  'powershell.exe',
);

async function run(command, args, { expectFailure = false } = {}) {
  try {
    const result = await execFileAsync(command, args, {
      maxBuffer: 10 * 1024 * 1024,
      windowsHide: true,
    });
    if (expectFailure) assert.fail(`expected ${path.basename(command)} to fail`);
    return result;
  } catch (error) {
    if (!expectFailure) throw error;
    return error;
  }
}

function profileArgs(args) {
  return ['-NoLogo', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', profileScript, ...args];
}

async function prepareProfile(root) {
  await mkdir(path.join(root, 'Default'), { recursive: true });
  await writeFile(path.join(root, 'Local State'), '{}', 'utf8');
}

test('standalone Edge/CDP supports interaction, evidence, and volatile auth transfer', async (t) => {
  if (process.platform !== 'win32') return t.skip('Windows Edge integration');

  const root = await mkdtemp(path.join(tmpdir(), 'Codex Edge CDP Integration '));
  const sourceProfile = path.join(root, 'source profile');
  const destinationProfile = path.join(root, 'destination profile');
  const screenshot = path.join(root, 'evidence.png');
  const stateFile = path.join(root, 'auth-state.json');
  await prepareProfile(sourceProfile);
  await prepareProfile(destinationProfile);

  const server = createServer((request, response) => {
    response.setHeader('content-type', 'text/html; charset=utf-8');
    if (request.url?.startsWith('/fixture')) {
      response.end(`<!doctype html>
        <html><body>
          <button id="go" onclick="document.querySelector('#status').textContent='clicked'">Go</button>
          <input id="name" aria-label="Name">
          <div id="status">idle</div>
          <script>
            localStorage.setItem('local-auth', 'local-value');
            sessionStorage.setItem('session-auth', 'session-value');
            document.cookie = 'persistent_fixture=present; Max-Age=3600; Path=/';
            document.cookie = 'session_fixture=present; Path=/';
          </script>
        </body></html>`);
      return;
    }
    response.end('<!doctype html><html><body><div id="blank">blank</div></body></html>');
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;

  t.after(async () => {
    server.close();
    for (const profile of [sourceProfile, destinationProfile]) {
      await run(powershell, profileArgs(['-Action', 'Stop', '-AutomationRoot', profile])).catch(() => {});
    }
    await rm(root, { recursive: true, force: true });
  });

  await run(powershell, profileArgs([
    '-Action', 'LaunchExisting',
    '-AutomationRoot', sourceProfile,
    '-ProfileName', 'Default',
    '-TargetUrl', `${origin}/fixture`,
    '-Headless',
  ]));

  const targetArgs = [
    '--user-data-dir', sourceProfile,
    '--host', '127.0.0.1',
    '--path-contains', '/fixture',
  ];
  const targetsResult = await run(process.execPath, [cdpScript, 'targets', ...targetArgs]);
  const targets = JSON.parse(targetsResult.stdout);
  assert.equal(targets.length, 1);

  await run(process.execPath, [cdpScript, 'click', ...targetArgs, '--selector', '#go']);
  await run(process.execPath, [cdpScript, 'type', ...targetArgs, '--selector', '#name', '--text', 'Alice']);
  const evaluated = await run(process.execPath, [
    cdpScript,
    'evaluate',
    ...targetArgs,
    '--expression',
    "({status:document.querySelector('#status').textContent,name:document.querySelector('#name').value})",
  ]);
  assert.deepEqual(JSON.parse(evaluated.stdout).value, { status: 'clicked', name: 'Alice' });

  await run(process.execPath, [cdpScript, 'screenshot', ...targetArgs, '--output', screenshot]);
  assert.ok((await stat(screenshot)).size > 100);
  assert.deepEqual([...await readFile(screenshot)].slice(0, 8), [137, 80, 78, 71, 13, 10, 26, 10]);

  await run(process.execPath, [
    cdpScript,
    'export-auth',
    ...targetArgs,
    '--origin', origin,
    '--state-file', stateFile,
  ]);
  const exported = JSON.parse(await readFile(stateFile, 'utf8'));
  assert.equal(exported.version, 1);
  assert.deepEqual(exported.origins[0].localStorage, { 'local-auth': 'local-value' });
  assert.deepEqual(exported.origins[0].sessionStorage, { 'session-auth': 'session-value' });
  assert.ok(exported.cookies.some((cookie) => cookie.name === 'session_fixture'));

  await run(powershell, profileArgs(['-Action', 'Stop', '-AutomationRoot', sourceProfile]));
  await run(powershell, profileArgs([
    '-Action', 'LaunchExisting',
    '-AutomationRoot', destinationProfile,
    '-ProfileName', 'Default',
    '-TargetUrl', `${origin}/blank`,
    '-Headless',
  ]));

  const destinationArgs = [
    '--user-data-dir', destinationProfile,
    '--host', '127.0.0.1',
    '--path-contains', '/blank',
  ];
  await run(process.execPath, [
    cdpScript,
    'import-auth',
    ...destinationArgs,
    '--state-file', stateFile,
  ]);
  const restored = await run(process.execPath, [
    cdpScript,
    'evaluate',
    ...destinationArgs,
    '--expression',
    "({local:localStorage.getItem('local-auth'),session:sessionStorage.getItem('session-auth'),cookies:document.cookie})",
  ]);
  const restoredValue = JSON.parse(restored.stdout).value;
  assert.equal(restoredValue.local, 'local-value');
  assert.equal(restoredValue.session, 'session-value');
  assert.match(restoredValue.cookies, /persistent_fixture=present/);
  assert.match(restoredValue.cookies, /session_fixture=present/);

  const wrongTarget = await run(process.execPath, [
    cdpScript,
    'evaluate',
    '--user-data-dir', destinationProfile,
    '--host', 'wrong.example.com',
    '--expression', 'document.title',
  ], { expectFailure: true });
  assert.match(`${wrongTarget.stderr ?? ''}${wrongTarget.stdout ?? ''}`, /matched no page targets/i);
});
