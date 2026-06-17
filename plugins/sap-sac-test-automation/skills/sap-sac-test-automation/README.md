# SAP Analytics Cloud Test Automation Skill

Portable, documentation-audited skill for designing capability-gated discovery plus Playwright execution frameworks for SAP Analytics Cloud stories, dashboards, reports, planning workflows, comments, permissions, restricted Windows/company environments, and visual/data baselines.

---

## Capability Index

| Capability | Status |
|------------|--------|
| Commands | No |
| Agents | No |
| Hooks | No |
| MCP | No |
| LSP | No |
| Source Freshness | `last_verified`: 2026-06-17; initial docs-audited skill derived from the SAC automated suite plan. |
| Verification | `npm run validate`; live SAC tenant, SSO, CI, and writeback checks pending. |

## Overview

This skill helps AI coding assistants turn SAC dashboard testing plans into reusable, governed test automation. It separates discovery from deterministic execution: manual inspection, Edge/CDP, Chrome DevTools MCP, agent-browser, or Playwright can propose profile/scenario drafts when allowed; humans review them; Playwright executes approved tests in CI.

## Keywords for Auto-Discovery

- SAC test automation
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

## File Structure

```text
plugins/sap-sac-test-automation/
└── skills/sap-sac-test-automation/
    ├── SKILL.md
    ├── README.md
    └── references/
        ├── architecture.md
        ├── tool-availability-and-deployment.md
        ├── chrome-devtools-mcp.md
        ├── edge-cdp-enterprise.md
        ├── dashboard-profiles-and-scenarios.md
        ├── agent-browser-discovery.md
        ├── playwright-execution.md
        ├── governance-and-sac-testability.md
        └── failure-triage-and-artifacts.md
```

## Primary Use Cases

- Design a new SAC automated test framework.
- Onboard one SAC story/dashboard into a profile-driven Playwright suite.
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
