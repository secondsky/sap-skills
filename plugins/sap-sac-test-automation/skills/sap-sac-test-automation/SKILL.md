---
name: sap-sac-test-automation
description: |
  SAP Analytics Cloud (SAC) automated testing skill for designing capability-gated browser discovery and deterministic Playwright test suites for SAC stories, dashboards, reports, planning workflows, comments, permissions, visual regression, and reusable QA automation. This skill should be used when building SAC end-to-end tests, onboarding SAC dashboards into Playwright, creating dashboard profiles or scenario YAML, using Microsoft Edge/CDP, Chrome DevTools MCP, Vercel Labs agent-browser, or manual discovery for SAC components, testing SAC optimized stories, configuring SAC auth storage state, managing visual/data baselines, testing comments, planning writeback, data actions, multi actions, role-based views, restricted Windows/company environments, or creating SAC failure triage artifacts.
license: GPL-3.0
metadata:
  version: "2.3.1"
  last_verified: 2026-06-17
  sac_version: "2026.8"
  documentation_source: "docs/project/sac-test-automation-source-review-2026-06-17.md"
  primary_tools:
    - Playwright
    - Chrome DevTools MCP
    - Microsoft Edge CDP
    - Vercel Labs agent-browser
    - Manual discovery
  status: docs_audited_runtime_pending
  known_issues:
    - Live SAC tenant, SSO, planning writeback, and CI execution checks require tenant-specific evidence before claiming runtime validation.
---

# SAP Analytics Cloud Test Automation

Design reusable SAC test automation as a capability-gated system: select the safest available discovery backend, require human review for profiles and baselines, then use reviewed Playwright code for deterministic execution, CI gating, reporting, and evidence.

Apply the core rule: **discovery proposes, humans approve, Playwright executes, CI enforces.**

## Related Skills

- **sap-sac-scripting**: Use for Optimized Story Experience scripting, Analytics Designer APIs, diagnostic widgets, story script behavior, and SAC MCP setup.
- **sap-sac-planning**: Use for planning models, private/public versions, data actions, multi actions, validation rules, and writeback risk analysis.
- **sap-sac-custom-widget**: Use when dashboards include owned custom widgets that need stable ARIA labels, public test hooks, lifecycle fixes, or black-box test contracts.
- **sap-dependency-security**: Use before adding source-pinned browser tools, MCP servers, CI dependencies, or executable automation that handles SAC credentials.
- **agent-browser**: Optionally load when the Vercel Labs agent-browser CLI is available and exact command syntax, snapshot/ref usage, screenshots, console, or network inspection is needed.
- **playwright**: Optionally load for CLI-based browser driving and debugging. For durable `@playwright/test` suites, use this SAC skill as the test architecture guide and follow the local project's Playwright conventions.
- **chrome-devtools**: Optionally load when Chrome DevTools MCP is installed and approved for read-only browser discovery, console/network inspection, screenshots, Lighthouse, or performance traces. Use `references/chrome-devtools-mcp.md` for SAC-safe defaults and Edge boundaries.

## Initial Guidance

When the user is starting SAC automation or has not supplied a reviewed dashboard profile, route them through `/sac-test-onboard` or follow the same intake sequence manually. Use a two-stage intake:

- Stage 1: environment class, tenant risk, allowed discovery/execution tools, auth and roles, writeback/comment scope, and baseline ownership.
- Stage 2: planning/writeback, comments, permissions, visual/data baselines, custom widgets, CI stages, and failure evidence.

Default to draft-only artifacts until the user explicitly confirms file creation and target directory. If writing is confirmed, use `profiles/<profile-id>/intake.md`, `profiles/<profile-id>/dashboard.yaml`, and `profiles/<profile-id>/scenarios/read-only-smoke.yaml` based on the bundled templates.

After a profile or scenario draft exists, route safety review to `sac-test-profile-reviewer` when available. Keep the reviewer focused on intake/profile/scenario safety, not broad Playwright suite implementation.

## When to Use This Skill

Use this skill to plan, implement, or review SAC automation involving:

- SAC stories, optimized stories, reports, dashboards, tabs, filters, prompts, tables, charts, exports, scripts, comments, or bookmarks.
- Dashboard profile files, scenario YAML, expected data files, visual baselines, Playwright adapters, and SAC-specific fixtures.
- Stored authentication state, SSO/MFA constraints, role-based test users, permission matrices, and CI gates.
- Planning writeback, private/public versions, data locks, validation rules, data actions, multi actions, or comment cleanup.
- Failure packets with traces, screenshots, videos, visual diffs, expected-vs-actual values, console/network summaries, and root-cause classification.

Do not use this skill as the main guide for generic web applications. Use general Playwright guidance for non-SAC sites.

## Quick Start

1. Classify the SAC story: production read-only, QA clone, planning/writeback, comments, permission-sensitive, or exploratory.
2. Establish the automation policy: allowed tenants, allowed users, auth storage handling, writeback approval, baseline approval, and CI triggers.
3. Run the capability and policy gate: choose manual discovery, Firecrawl public research, Chrome DevTools MCP with supported Chrome, Microsoft Edge/CDP, Chrome DevTools MCP with Edge best-effort, Playwright, agent-browser, or an approved enterprise browser lab based on what is installed and allowed.
4. Run read-only discovery with the selected backend: capture snapshots, annotated screenshots, console/page errors, network clues, and candidate component maps without sending private SAC content to unapproved external services.
5. Convert discovery into a human-reviewed dashboard profile: pages, widgets, locators, readiness markers, roles, data baselines, visual baselines, and known restrictions.
6. Implement deterministic Playwright tests through reusable adapters. Keep scenario files selector-free; route interactions through component IDs from the profile.
7. Gate only safe packs in CI first: auth check, read-only smoke, navigation, and critical widget readiness. Move planning, comments, data actions, visual baselines, and full permissions to controlled/nightly stages.
8. Emit reviewer-friendly failure evidence: HTML report, trace, screenshots, video, visual diff, widget metadata, expected vs actual values, and failure category.

## Operating Model

Treat AI/browser-agent output as a draft, not as the source of truth. Require human review for profile creation, selector approval, expected business values, visual/data baseline changes, permission matrices, and any destructive/writeback scenario.

Prefer profile-driven automation:

- Store tenant/story metadata, pages, components, roles, baselines, and test policies in versioned YAML/JSON.
- Implement adapters for SAC component types such as buttons, tables, charts, tabs, filters, prompts, planning tables, comments, custom widgets, exports, and bookmarks.
- Keep selectors out of scenario files. Scenarios should call component IDs and actions, while adapters resolve locators and readiness behavior.
- Start with serial execution for each dashboard. Increase parallelism only after proving isolation for auth state, tenant state, comments, planning versions, live connections, and backend capacity.

## Bundled Resources

Load these references only as needed:

- `references/architecture.md`: hybrid architecture, feasibility boundaries, reliable SAC test categories, and reusable project shape.
- `references/tool-availability-and-deployment.md`: backend decision matrix, Windows/restricted-environment checks, Firecrawl public-research policy, and no-tool fallbacks.
- `references/chrome-devtools-mcp.md`: Chrome DevTools MCP modes, SAC-safe configuration, tool categories, CLI usage, Windows/restricted deployment, and enterprise safety boundaries.
- `references/edge-cdp-enterprise.md`: installed Microsoft Edge/CDP discovery, Chrome DevTools MCP Edge patterns, profile safety, loopback-only CDP, and Windows/macOS launch checks.
- `references/dashboard-profiles-and-scenarios.md`: dashboard profile contract, scenario contract, adapter responsibilities, and onboarding flow.
- `references/agent-browser-discovery.md`: optional agent-browser read-only discovery workflow, command patterns, output artifacts, and human review checklist.
- `references/playwright-execution.md`: Playwright test runner guidance, auth, readiness, CI stages, and test category policy.
- `references/governance-and-sac-testability.md`: SAC testability contract, auth/SSO, planning/comment safety, baseline approval, and role governance.
- `references/failure-triage-and-artifacts.md`: required evidence, failure packet shape, root-cause categories, and performance/readiness metrics.
- `templates/intake.md`: guided intake packet for policy, tooling, roles, risk, baselines, and approvals.
- `templates/dashboard-profile.yaml`: starter dashboard profile with SAC metadata, readiness, components, roles, baselines, and risk policy.
- `templates/scenario-read-only-smoke.yaml`: selector-free starter smoke scenario using profile component IDs.

When implementing against a live project, also inspect the project's existing Playwright config, package manager, CI, profile schema, and artifact conventions before adding new structure.

## Common Issues

- Avoid generated SAC DOM IDs and private framework classes. Prefer visible labels, ARIA roles, text, widget metadata, profile component IDs, and reviewed fallbacks.
- Do not treat story shell load as widget readiness. Wait for page markers, critical widgets, absence of SAC error text, spinner disappearance, stable values, and retrying assertions.
- Do not automate MFA as a release dependency. Prefer stored auth state, dedicated test users, security-approved test IdP policy, or manual refresh.
- Do not run comments, planning writeback, public version publish, data actions, or multi actions against production unless there is explicit formal approval.
- Do not approve visual or data drift automatically. Require owner review, baseline reason, and pull-request evidence.
- Do not use chart pixels as the only business-value assertion. Pair chart screenshots with table/KPI/data assertions where possible.
- Do not assume agent-browser, Playwright CLI, Chrome DevTools MCP, Firecrawl MCP, public npm, browser downloads, or remote debugging are available in company environments. Use the capability gate and document fallbacks.
- Do not use Chrome DevTools MCP as the audited CI release gate. Use it for discovery/debugging; convert approved findings into profile-driven Playwright tests.
- Do not run Chrome DevTools MCP against private SAC without disabling usage statistics, update checks, and CrUX field-data lookups, and without applying profile, URL, screenshot, and network-output controls.
- Do not expose CDP beyond loopback, publish `webSocketDebuggerUrl`, attach to a daily user browser profile, or bypass Edge `RemoteDebuggingAllowed` policy.
- Do not send authenticated SAC tenant pages, screenshots, HARs, cookies, storage state, internal URLs, customer data, or private company docs to Firecrawl unless the exact deployment and retention mode are approved.
- Do not assume SAC optimized story features, tenant configuration, live data, localization, or prompt persistence behave identically across customers.

## Source and Verification Notes

Derived from incorporated SAC automated-suite planning content recorded in `docs/project/sac-test-automation-source-review-2026-06-17.md`, plus extracted profile/scenario templates bundled with this skill. The planning sources cite SAP Help, Vercel Labs agent-browser, and Playwright documentation. Edge/CDP and Chrome DevTools MCP guidance also considers the `ChromeDevTools/chrome-devtools-mcp` README, CLI docs, tool reference, troubleshooting guide, package metadata, bundled skills, issue #1235 and PR #1229, Microsoft Edge DevTools Protocol documentation, Microsoft Edge DevTools MCP guidance, Edge `RemoteDebuggingAllowed` policy, and Firecrawl public documentation for MCP/search/scrape safety. This skill is docs-audited only; live SAC tenant execution, Chrome DevTools MCP runtime behavior, SSO behavior, CI behavior, planning writeback, and visual baseline stability remain tenant-specific and must be validated before making runtime claims.
