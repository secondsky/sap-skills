# Datasphere Edge/CDP Add-on

Use the shared browser layer at
`../../../../sap-browser-automation/skills/sap-browser-automation/references/edge-cdp-control.md`
for in-app authentication, consent-gated Edge profile reuse, isolated Edge startup, loopback CDP,
`DevToolsActivePort`, target selection, auth-state bootstrap, and cleanup. Load its
`auth-state-bootstrap.md` when the user approves copying an authenticated Edge profile.

## Datasphere-specific boundaries

- Verify the tenant, space, Data Builder/Business Builder area, connection, catalog, or monitoring page before interaction.
- Use browser automation for visible UI state, diagnostics, screenshots, and approved navigation; prefer Datasphere APIs/CLI for deterministic metadata and deployment checks.
- Ask for explicit approval before saving, deploying, deleting, importing, exporting, running task chains, changing spaces, or changing users/roles.
- Do not infer that a copied profile or successful CDP connection authorizes Datasphere mutations.
- Record the selected target, authentication status, visible errors, evidence, and any omitted or unavailable UI state.
