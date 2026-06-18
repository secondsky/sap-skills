# Governance and SAC Testability

Source: Derived summary from incorporated SAC automated-suite planning content.

The hardest part of SAC automation is the testability contract, not browser control. Establish ownership and safety before scaling tests.

## Testability Contract

Require story owners to provide:

- Stable widget names in the SAC outline, such as `BTN_APPLY_FILTERS`, `TBL_REVENUE_BY_REGION`, and `CH_GROSS_MARGIN_TREND`.
- Stable visible labels for buttons, filters, input controls, tabs, prompts, and export actions.
- Unique page/tab names and deterministic page-ready markers.
- QA bookmarks or URL states for baseline scenarios.
- QA story copies for comments, planning, data actions, and multi actions.
- Dedicated test users and roles.
- Seeded data or agreed data snapshots for deterministic assertions.
- Planning reset strategy and owner-approved version policy.
- Optional diagnostic/test-mode widgets for selected filters, selected version, last script action, and last data-action status.
- Stable viewport, locale, timezone, and browser project.

## Baseline Approval

Do not approve baselines automatically.

| Baseline | Owner | Approval |
|---|---|---|
| Visual | Dashboard owner plus QA | Pull request with before/after screenshots and reason. |
| Data | Business/data owner | Pull request with data snapshot reference and tolerance. |
| Planning | Planning model owner | Pull request plus reset proof. |
| Permission | SAC/security admin | Pull request plus role matrix. |

Mask volatile UI such as timestamps, user avatars, notifications, or refresh markers where appropriate.

## Planning and Writeback Policy

Use planning automation only in controlled QA environments unless formal approval says otherwise.

- Prefer private-per-run versions first.
- Use dedicated planner users and QA planning models.
- Reset model/version before and after tests.
- Run serially.
- Assert cell values and SAC error toasts.
- Revert/delete private versions best effort.
- Do not publish public versions unless explicitly approved.

For data actions and multi actions, require QA-only scope, reset policy, expected result, serial execution, and duration/error capture.

## Comment Policy

Comments are persistent collaboration artifacts.

- Run only in QA or isolated stories.
- Use a unique run ID prefix.
- Clean up best effort.
- Run serially.
- Avoid notification side effects in production.

## Permission Policy

Maintain an explicit role matrix:

- Auth state per role.
- Expected visible/hidden pages and components.
- Allowed/denied actions.
- Restricted data values.
- Per-role screenshots for evidence.

Do not assume UI visibility alone proves data security.

## Browser Tooling and Data Policy

Treat browser-control tooling as part of the testability contract:

- Document whether manual discovery, Edge/CDP, Chrome DevTools MCP, Playwright, agent-browser, Firecrawl, or an enterprise browser lab is allowed.
- Require a dedicated automation browser profile when CDP or MCP attaches to Microsoft Edge.
- Avoid daily user profiles except for explicitly approved, user-assisted triage.
- Keep CDP loopback-only and never publish `webSocketDebuggerUrl`.
- Respect Edge `RemoteDebuggingAllowed`; do not bypass group policy or endpoint controls.
- For private SAC with Chrome DevTools MCP, use approved/pinned packages, isolated profiles, redacted network headers, bounded/file-based screenshots and traces, disabled CrUX/usage/update checks, and reviewed URL allow/block patterns.
- Use Firecrawl only for public-source research by default. Do not send authenticated SAC pages, screenshots, HARs, cookies, storage state, internal URLs, customer data, or private company docs unless the exact deployment and retention mode are approved.

## Production Policy

Production automation should default to read-only:

- Login/auth check.
- Open story.
- Assert title, tabs, critical widgets, and no SAC error text.
- Capture evidence.

Exclude comments, planning writeback, public version publish, data actions, multi actions, and destructive flows unless a written policy approves them.
