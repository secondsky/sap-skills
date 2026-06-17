# SAC Test Automation Architecture

Source: Derived summary from `SAC_Automated_Test_Suite_Playwright_AgentBrowser_Plan.md`.

Use a hybrid, profile-driven architecture:

```text
SAC story/dashboard
  -> capability-gated discovery backend
  -> human-reviewed dashboard profile
  -> reusable Playwright adapters
  -> deterministic Playwright scenarios
  -> CI reports, traces, screenshots, videos, visual diffs, failure classification
```

## Tool Boundary

Use the safest approved discovery backend for:

- Read-only exploration of unfamiliar SAC stories.
- Accessibility snapshots and annotated screenshots.
- Candidate semantic locators and component inventory.
- Console, page-error, network, and HAR clues.
- First-pass profile/scenario drafts for review.
- Interactive triage of failed deterministic tests.

Discovery backends can include manual observation, Chrome DevTools MCP with supported Chrome/Chrome for Testing, installed Microsoft Edge/CDP, Chrome DevTools MCP with Edge `--executablePath` or approved attach, local agent-browser, or Playwright-driven exploration. Use Firecrawl only for public documentation research unless private-data handling is explicitly approved.

Use Playwright for:

- Reviewed `@playwright/test` code.
- Deterministic CI execution.
- Fixtures, assertions, retries, traces, screenshots, videos, downloads, and reporters.
- Stored auth state per role.
- Data, visual, permission, export, performance-readiness, and controlled writeback tests.

Do not use autonomous browser-agent control, raw CDP attach, or unreviewed discovery output as the final release gate for audited SAC regression testing.

## Recommended Project Shape

```text
sac-automation/
  playwright.config.ts
  profiles/
    finance-executive/
      dashboard.yaml
      scenarios/
      expected-data/
      baselines/
      discovery/
        manual/
        chrome-devtools-mcp/
        edge-cdp/
        agent-browser/
  src/
    adapters/
    fixtures/
    discovery/
    assertions/
    reporting/
    utils/
  tests/
    generated/
    manual/
  scripts/
  artifacts/
  docs/
```

The profile is the contract between SAC story owners, QA automation, business data owners, CI, Playwright adapters, and discovery tooling.

## Reliable Test Categories

- High reliability: read-only smoke, tab/page navigation, labeled custom buttons, role visibility checks, downloads with file validation, basic story availability.
- Medium to high reliability: filters, input controls, prompts, visible/scrollable tables, bookmarks, permissions with stable users.
- Medium reliability: charts through visual baselines plus companion data checks, comments in isolated stories, planning in controlled QA models, data actions with reset policy.
- Low reliability without extra contracts: chart coordinate selection, arbitrary SAC internals, live-data pixel assertions, production writeback, uncontrolled SSO/MFA, third-party custom widget internals.

## SAC Fragility Map

Plan around these recurring failure modes:

- Dynamic DOM IDs and SAP UI internals.
- Iframes and embedded content.
- Shadow DOM in custom widgets.
- Virtualized tables and lazy row rendering.
- Async backend queries after shell load.
- Canvas/SVG chart rendering and animation.
- Live connections and changing business data.
- Localization, timezone, date, currency, and decimal formatting.
- Comment persistence and notification side effects.
- Planning locks, validation rules, private/public version conflicts, and data-entry errors.
- Tenant-specific optimized story restrictions.

Mitigate by using stable visible labels, explicit page-ready markers, profile-level component metadata, seeded data, tolerances, fixed viewport/locale/timezone, serial execution for stateful flows, and explicit skip reasons for unsupported story capabilities.
