import assert from 'node:assert/strict';
import test from 'node:test';

import {
  filterCookiesForOrigins,
  parseCliArguments,
  selectTarget,
  toCookieParams,
} from '../cdp-agent.mjs';

const targets = [
  {
    id: 'sac-story',
    type: 'page',
    title: 'Quarterly Story - SAP Analytics Cloud',
    url: 'https://tenant.example.com/sap/fpa/ui/app.html#/story/42',
  },
  {
    id: 'sac-home',
    type: 'page',
    title: 'Home - SAP Analytics Cloud',
    url: 'https://tenant.example.com/sap/fpa/ui/app.html#/home',
  },
  {
    id: 'extension',
    type: 'background_page',
    title: 'Extension',
    url: 'chrome-extension://example/background.html',
  },
];

test('selectTarget requires host, path, and title filters to resolve one page', () => {
  const selected = selectTarget(targets, {
    host: 'tenant.example.com',
    pathContains: '#/story/42',
    titleContains: 'quarterly story',
  });

  assert.equal(selected.id, 'sac-story');
});

test('selectTarget rejects ambiguous matches', () => {
  assert.throws(
    () => selectTarget(targets, { host: 'tenant.example.com' }),
    /matched 2 page targets/i,
  );
});

test('selectTarget reports a missing approved target', () => {
  assert.throws(
    () => selectTarget(targets, { host: 'other.example.com' }),
    /matched no page targets/i,
  );
});

test('filterCookiesForOrigins keeps tenant and identity-provider cookies only', () => {
  const cookies = [
    { name: 'tenant', domain: '.tenant.example.com' },
    { name: 'idp', domain: 'login.example.net' },
    { name: 'unrelated', domain: '.unrelated.example.org' },
  ];

  const filtered = filterCookiesForOrigins(cookies, [
    'https://tenant.example.com',
    'https://login.example.net',
  ]);

  assert.deepEqual(filtered.map((cookie) => cookie.name), ['tenant', 'idp']);
});

test('toCookieParams strips read-only CDP cookie fields', () => {
  const [cookie] = toCookieParams([
    {
      name: 'session',
      value: 'value',
      domain: '.tenant.example.com',
      path: '/',
      expires: -1,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      priority: 'Medium',
      sourceScheme: 'Secure',
      sourcePort: 443,
      size: 12,
      session: true,
    },
  ]);

  assert.equal(cookie.name, 'session');
  assert.equal(cookie.expires, undefined);
  assert.equal('size' in cookie, false);
  assert.equal('session' in cookie, false);
});

test('parseCliArguments preserves repeated origin options', () => {
  const parsed = parseCliArguments([
    'export-auth',
    '--origin',
    'https://tenant.example.com',
    '--origin=https://login.example.net',
    '--state-file',
    'state.json',
  ]);

  assert.equal(parsed.command, 'export-auth');
  assert.deepEqual(parsed.options.origin, [
    'https://tenant.example.com',
    'https://login.example.net',
  ]);
});
