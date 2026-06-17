# Playwright Execution Layer

Source: Derived summary from `SAC_Automated_Test_Suite_Playwright_AgentBrowser_Plan.md`.

Use Playwright as the deterministic execution layer for reviewed tests and CI. Load the local `playwright` skill for CLI browser-driving/debugging syntax when needed, but keep durable SAC regression suites in normal `@playwright/test` project code.

## Configuration Defaults

Start conservative:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: {
    timeout: 20_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.005 }
  },
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: process.env.SAC_BASE_URL,
    viewport: { width: 1440, height: 1000 },
    locale: 'en-US',
    timezoneId: 'UTC',
    actionTimeout: 30_000,
    navigationTimeout: 90_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium-linux', use: { ...devices['Desktop Chrome'] } }
  ]
});
```

Adjust to the project's existing package manager, CI provider, and artifact conventions.

## Microsoft Edge Projects

Use installed Microsoft Edge when enterprise policy, user acceptance criteria, media behavior, extensions, certificates, or SSO require Edge:

```ts
projects: [
  { name: 'chromium-linux', use: { ...devices['Desktop Chrome'] } },
  { name: 'msedge', use: { ...devices['Desktop Edge'], channel: 'msedge' } }
]
```

Treat Edge channels as controlled-runner dependencies. Playwright can target `msedge`, `msedge-beta`, `msedge-dev`, and `msedge-canary`, but it does not install branded Edge by default in normal project setup. In companies with browser policies, mandatory extensions, or locked-down profiles, local Edge control may differ from CI behavior. Use bundled Chromium for local developer smoke work when policies interfere, and run Edge-channel regression on approved bots.

Use `chromium.connectOverCDP('http://127.0.0.1:9222')` only for approved local discovery or SSO/certificate triage against a running Edge instance. Do not build the main regression suite around CDP attach.

## Restricted Installations

- Prefer pinned dependencies and the project's existing package manager.
- If public npm is blocked, use the organization's internal registry or approved package cache.
- If Playwright browser downloads are blocked, use an approved artifact mirror through `PLAYWRIGHT_DOWNLOAD_HOST`, set `PLAYWRIGHT_BROWSERS_PATH` to a pre-provisioned cache, and configure `HTTPS_PROXY` or `NODE_EXTRA_CA_CERTS` when required by corporate network policy.
- If no CLI tooling can be installed, produce a manual observation packet and keep deterministic Playwright implementation for an approved build agent.

## Auth Strategy

- Use dedicated SAC test users.
- Store Playwright `storageState` securely outside Git.
- Maintain one auth state per role: viewer, planner, admin, restricted, no-export, or other project roles.
- Run an auth-check stage that opens SAC and fails fast if redirected to login.
- Avoid automating MFA as a release dependency. Use security-approved test policy or manual refresh when needed.

## Readiness Strategy

Do not rely on `page.goto()` alone. Wait for:

- Story title or stable page marker.
- Critical widgets listed in the profile.
- Absence of configured SAC error text.
- Disappearance of busy/loading indicators.
- Stable table/KPI/chart state after interactions.
- Download, toast, prompt, or diagnostic/test-mode status where applicable.

## CI Stages

Use staged execution:

```text
install
lint-profiles
auth-check
read-only-smoke
nightly-regression
controlled-writeback
publish-report
```

Recommended gate policy:

- PR/push gate: read-only smoke, auth check, basic navigation, critical widget readiness.
- Nightly: filters, input controls, prompts, tables, visual baselines, data checks, exports, permissions.
- Controlled/nightly only: comments, planning, data actions, multi actions.
- Production: read-only smoke only unless formal approval says otherwise.

## Test Category Notes

- Tables: locate by title/profile metadata, map headers, scroll/search virtualized rows, parse values by locale, compare with tolerances.
- Charts: use screenshots for rendering/layout and companion table/KPI assertions for business values.
- Filters/prompts: select by visible label/search, assert selected state and downstream data effect, reset after test.
- Scripts/custom buttons: test through UI-visible effects, diagnostic widgets, downloads, or data changes.
- Exports: wait for download, validate file type/name/size, parse content only when stable and valuable.
- Permissions: assert both UI visibility and data restrictions. Do not test only with admin users.
- Planning/comments: isolate, run serially, reset before/after, and use unique run IDs.
