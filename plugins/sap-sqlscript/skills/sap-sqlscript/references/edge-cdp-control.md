# Browser-Based SQLScript Edge/CDP Add-on

Use the shared browser layer at
`../../../../sap-browser-automation/skills/sap-browser-automation/references/edge-cdp-control.md`
for in-app authentication, consent-gated Edge profile reuse, isolated Edge startup, loopback CDP,
`DevToolsActivePort`, target selection, auth-state bootstrap, and cleanup. Load its
`auth-state-bootstrap.md` when the user approves copying an authenticated Edge profile.

## SQLScript-specific boundaries

- Verify the approved Datasphere/HANA Cloud tenant, SQL editor, database, schema, and target object before interaction.
- Keep database-native SQL/HANA tooling as the default validation path; use browser automation for visible UI state, diagnostics, deployment messages, and approved screenshots.
- Ask before executing SQL, deploying procedures, changing schemas, importing/exporting artifacts, or touching production data.
- A successful browser connection does not validate SQLScript semantics or authorize a database mutation.
