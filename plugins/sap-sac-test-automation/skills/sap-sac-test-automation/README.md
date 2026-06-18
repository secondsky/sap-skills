# SAP Analytics Cloud Test Automation Skill

Portable, documentation-audited skill for designing capability-gated discovery plus Playwright execution frameworks for SAP Analytics Cloud stories, dashboards, reports, planning workflows, comments, permissions, restricted Windows/company environments, and visual/data baselines.

---

## Capability Index

| Capability | Status |
|------------|--------|
| Commands | Yes: `/sac-test-onboard` |
| Agents | Yes: `sac-test-profile-reviewer` |
| Hooks | No |
| MCP | No |
| LSP | No |
| Source Freshness | `last_verified`: 2026-06-17; docs-audited skill with incorporated SAC automation planning content and extracted onboarding templates. |
| Verification | `npm run validate`; live SAC tenant, SSO, CI, and writeback checks pending. |

## Overview

This skill helps AI coding assistants turn SAC dashboard testing plans into reusable, governed test automation. It separates discovery from deterministic execution: manual inspection, Edge/CDP, Chrome DevTools MCP, agent-browser, or Playwright can propose profile/scenario drafts when allowed; humans review them; Playwright executes approved tests in CI.

## Keywords for Auto-Discovery

- SAC test automation
- SAC test onboarding
- SAP Analytics Cloud Playwright
- SAC Playwright tests
- SAC dashboard testing
- SAC story regression
- SAC optimized story testing
- agent-browser SAC discovery
- Vercel agent-browser Playwright
- Microsoft Edge CDP SAC testing
- Edge DevTools Protocol SAC discovery
- Chrome DevTools MCP SAC discovery
- Chrome DevTools MCP CLI
- Chrome DevTools MCP Edge
- Chrome for Testing SAC
- SAC Windows restricted environment
- Firecrawl public research SAC
- SAC dashboard profile
- SAC scenario YAML
- SAC visual regression
- SAC data baseline
- SAC planning test
- SAC writeback test
- SAC comment test
- SAC permission test
- SAC role-based view test
- SAC CI testing
- SAC auth storage state
- SAC failure triage
- SAC trace screenshots
- SAC testability contract
- SAC profile reviewer

## File Structure

```text
plugins/sap-sac-test-automation/
├── commands/
│   └── sac-test-onboard.md
├── agents/
│   └── sac-test-profile-reviewer.md
└── skills/sap-sac-test-automation/
    ├── SKILL.md
    ├── README.md
    ├── references/
    └── templates/
        ├── intake.md
        ├── dashboard-profile.yaml
        └── scenario-read-only-smoke.yaml
```

## Primary Use Cases

- Design a new SAC automated test framework.
- Start onboarding with `/sac-test-onboard` and produce a reviewed intake/profile/scenario starter packet.
- Onboard one SAC story/dashboard into a profile-driven Playwright suite.
- Review intake, dashboard profile, and scenario YAML with `sac-test-profile-reviewer`.
- Run read-only discovery with manual inspection, Chrome DevTools MCP with supported Chrome, Edge/CDP, Chrome DevTools MCP with Edge best-effort, agent-browser, or Playwright and turn artifacts into reviewed profile drafts.
- Plan restricted Windows/company deployment where npm, browser downloads, agent-browser, Playwright, Firecrawl, or remote debugging may be unavailable.
- Define safe CI gates for read-only, visual, data, permission, comment, planning, and data-action tests.
- Review a SAC automation architecture for unsafe writeback, brittle selectors, weak readiness checks, or missing evidence.

## Related Skills

- `sap-sac-scripting`
- `sap-sac-planning`
- `sap-sac-custom-widget`
- `sap-dependency-security`
- `agent-browser`
- `playwright`
- `chrome-devtools`

## Command and Agent

- `/sac-test-onboard`: two-stage guided intake for one SAC dashboard, with optional confirmed file creation under `profiles/<profile-id>/`.
- `sac-test-profile-reviewer`: read-only review of intake, dashboard profile, and scenario YAML for selector quality, readiness, baseline ownership, role assumptions, and risky SAC flows.
