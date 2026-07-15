import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const skillRoot = new URL('../../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, skillRoot), 'utf8');
}

test('main skill routes standalone automation through bundled helpers', async () => {
  const skill = await read('SKILL.md');

  assert.match(skill, /scripts\/edge-profile\.ps1/);
  assert.match(skill, /scripts\/cdp-agent\.mjs/);
  assert.match(skill, /Node(?:\.js)? 22/i);
});

test('auth workflow captures volatile state before closing and cloning Edge', async () => {
  const skill = await read('SKILL.md');
  const capture = skill.indexOf('export-auth');
  const close = skill.indexOf('Close normal Edge', capture);
  const clone = skill.indexOf('CloneLaunch', close);

  assert.ok(capture >= 0, 'missing export-auth step');
  assert.ok(close > capture, 'normal Edge must close after auth export');
  assert.ok(clone > close, 'profile cloning must follow normal Edge shutdown');
});

test('auth reference uses current CDP cookie methods and executable commands', async () => {
  const auth = await read('references/auth-state-bootstrap.md');

  assert.match(auth, /Storage\.getCookies/);
  assert.match(auth, /Storage\.setCookies/);
  assert.doesNotMatch(auth, /Network\.getAllCookies/);
  assert.match(auth, /cdp-agent\.mjs export-auth/);
  assert.match(auth, /cdp-agent\.mjs import-auth/);
});

test('Edge reference preserves a selected profile and uses dynamic ports', async () => {
  const edge = await read('references/edge-cdp-control.md');

  assert.match(edge, /edge-profile\.ps1 -Action CloneLaunch/);
  assert.match(edge, /-ProfileName ['"]Profile 2['"]/);
  assert.match(edge, /remote-debugging-port=0/);
  assert.doesNotMatch(edge, /--profile-directory=Default/);
});

test('in-app validation is explicitly deferred to desktop runtime', async () => {
  const inApp = await read('references/in-app-browser-auth.md');

  assert.match(inApp, /Codex or Claude Desktop/i);
  assert.match(inApp, /runtime validation is deferred/i);
});
