import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const powershell = path.join(
  process.env.SystemRoot ?? 'C:\\Windows',
  'System32',
  'WindowsPowerShell',
  'v1.0',
  'powershell.exe',
);
const script = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'edge-profile.ps1',
);

async function runProfile(args, { expectFailure = false } = {}) {
  try {
    const result = await execFileAsync(
      powershell,
      ['-NoLogo', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, ...args],
      { windowsHide: true },
    );
    if (expectFailure) assert.fail('expected edge-profile.ps1 to fail');
    return result;
  } catch (error) {
    if (!expectFailure) throw error;
    return error;
  }
}

async function prepareProfile(root, profileName) {
  await mkdir(path.join(root, profileName), { recursive: true });
  await writeFile(path.join(root, 'Local State'), '{}', 'utf8');
}

test('CloneLaunch preserves Profile 2 and refuses a non-empty destination', async (t) => {
  if (process.platform !== 'win32') return t.skip('Windows Edge helper');

  const root = await mkdtemp(path.join(tmpdir(), 'Codex Edge Profile Test '));
  const source = path.join(root, 'source');
  const destination = path.join(root, 'automation profile');
  await prepareProfile(source, 'Profile 2');
  await writeFile(path.join(source, 'Profile 2', 'marker.txt'), 'profile-two', 'utf8');

  t.after(async () => {
    await runProfile(['-Action', 'Stop', '-AutomationRoot', destination], { expectFailure: false }).catch(() => {});
    await rm(root, { recursive: true, force: true });
  });

  const launched = await runProfile([
    '-Action', 'CloneLaunch',
    '-SourceUserData', source,
    '-ProfileName', 'Profile 2',
    '-AutomationRoot', destination,
    '-TargetUrl', 'about:blank',
    '-Headless',
  ]);
  const status = JSON.parse(launched.stdout);

  assert.equal(status.profileName, 'Profile 2');
  assert.equal(status.loopback, true);
  assert.ok(status.port > 0);
  assert.equal(await readFile(path.join(destination, 'Profile 2', 'marker.txt'), 'utf8'), 'profile-two');
  await assert.rejects(access(path.join(destination, 'Profile 2', 'Profile 2')));

  await runProfile(['-Action', 'Stop', '-AutomationRoot', destination]);

  const repeated = await runProfile([
    '-Action', 'CloneLaunch',
    '-SourceUserData', source,
    '-ProfileName', 'Profile 2',
    '-AutomationRoot', destination,
    '-TargetUrl', 'about:blank',
    '-Headless',
  ], { expectFailure: true });

  assert.match(`${repeated.stderr ?? ''}${repeated.stdout ?? ''}`, /non-empty|LaunchExisting/i);
});

test('LaunchExisting replaces a stale DevToolsActivePort and can be stopped', async (t) => {
  if (process.platform !== 'win32') return t.skip('Windows Edge helper');

  const root = await mkdtemp(path.join(tmpdir(), 'Codex Edge Existing Test '));
  const profile = path.join(root, 'automation profile');
  await prepareProfile(profile, 'Default');
  await writeFile(path.join(profile, 'DevToolsActivePort'), '9\n/devtools/browser/stale', 'utf8');

  t.after(async () => {
    await runProfile(['-Action', 'Stop', '-AutomationRoot', profile], { expectFailure: false }).catch(() => {});
    await rm(root, { recursive: true, force: true });
  });

  const launched = await runProfile([
    '-Action', 'LaunchExisting',
    '-ProfileName', 'Default',
    '-AutomationRoot', profile,
    '-TargetUrl', 'about:blank',
    '-Headless',
  ]);
  const status = JSON.parse(launched.stdout);

  assert.notEqual(status.port, 9);
  assert.equal(status.running, true);

  const stopped = await runProfile(['-Action', 'Stop', '-AutomationRoot', profile]);
  assert.equal(JSON.parse(stopped.stdout).running, false);
});

test('CloneLaunch rejects a running source profile', async (t) => {
  if (process.platform !== 'win32') return t.skip('Windows Edge helper');

  const root = await mkdtemp(path.join(tmpdir(), 'Codex Edge Running Source Test '));
  const source = path.join(root, 'source profile');
  const destination = path.join(root, 'destination profile');
  await prepareProfile(source, 'Default');

  t.after(async () => {
    for (const profile of [source, destination]) {
      await runProfile(['-Action', 'Stop', '-AutomationRoot', profile]).catch(() => {});
    }
    await rm(root, { recursive: true, force: true });
  });

  await runProfile([
    '-Action', 'LaunchExisting',
    '-ProfileName', 'Default',
    '-AutomationRoot', source,
    '-TargetUrl', 'about:blank',
    '-Headless',
  ]);

  const cloning = await runProfile([
    '-Action', 'CloneLaunch',
    '-SourceUserData', source,
    '-ProfileName', 'Default',
    '-AutomationRoot', destination,
    '-TargetUrl', 'about:blank',
    '-Headless',
  ], { expectFailure: true });

  assert.match(`${cloning.stderr ?? ''}${cloning.stdout ?? ''}`, /close.*source profile|using source profile/i);
});

test('an explicit missing Edge executable fails instead of silently using another installation', async (t) => {
  if (process.platform !== 'win32') return t.skip('Windows Edge helper');

  const root = await mkdtemp(path.join(tmpdir(), 'Codex Edge Missing Executable Test '));
  const profile = path.join(root, 'automation profile');
  await prepareProfile(profile, 'Default');

  t.after(async () => {
    await runProfile(['-Action', 'Stop', '-AutomationRoot', profile]).catch(() => {});
    await rm(root, { recursive: true, force: true });
  });

  const missing = await runProfile([
    '-Action', 'LaunchExisting',
    '-ProfileName', 'Default',
    '-AutomationRoot', profile,
    '-EdgeExecutable', path.join(root, 'missing-msedge.exe'),
    '-TargetUrl', 'about:blank',
    '-Headless',
  ], { expectFailure: true });

  assert.match(`${missing.stderr ?? ''}${missing.stdout ?? ''}`, /requested Microsoft Edge executable was not found/i);
});
