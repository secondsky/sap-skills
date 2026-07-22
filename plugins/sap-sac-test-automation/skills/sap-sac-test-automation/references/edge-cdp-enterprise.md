# SAC Test Automation Edge/CDP Add-on

Use the shared browser layer at
`../../../../sap-browser-automation/skills/sap-browser-automation/references/edge-cdp-control.md`
for in-app authentication, consent-gated Edge profile reuse, isolated Edge startup, loopback CDP,
`DevToolsActivePort`, target selection, auth-state bootstrap, and cleanup. Load its
`auth-state-bootstrap.md` when the user approves copying an authenticated Edge profile.

## Test-automation-specific boundaries

- Treat in-app Browser and fresh Edge/CDP as discovery/execution surfaces; use reviewed Playwright suites for durable deterministic tests when Playwright is already available.
- Do not require Playwright installation in restricted enterprise environments.
- Build a discovery packet with redacted target metadata, readiness evidence, auth status, and reviewed screenshots before converting discovery into tests.
- Do not use raw CDP attachment as an unreviewed CI gate; keep it for approved local discovery and SSO/certificate triage.
- Never report story completion from browser bootstrap, login success, or CDP attachment alone. Apply the SAC read-only acceptance checklist in the parent skill.
