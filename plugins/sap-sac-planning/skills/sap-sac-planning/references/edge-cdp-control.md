# SAC Planning Edge/CDP Add-on

Use the shared browser layer at
`../../../../sap-browser-automation/skills/sap-browser-automation/references/edge-cdp-control.md`
for in-app authentication, consent-gated Edge profile reuse, isolated Edge startup, loopback CDP,
`DevToolsActivePort`, target selection, auth-state bootstrap, and cleanup. Load its
`auth-state-bootstrap.md` when the user approves copying an authenticated Edge profile.

## Planning-specific boundaries

- Verify the approved tenant, story, planning model, page, and current version before interaction.
- Default to read-only inspection of planning tables, data action status, console errors, and screenshots.
- Require explicit approval before writeback, publish, data actions, multi actions, comments, version changes, lock changes, or other planning mutations.
- Keep the shared browser layer responsible for authentication and target selection; keep planning authorization and before/after validation here.
- Report blocked authentication or ambiguous target selection as blocked, not as a completed planning action.
