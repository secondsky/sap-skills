# SAC Scripting Edge/CDP Add-on

Use the shared browser layer at
`../../../../sap-browser-automation/skills/sap-browser-automation/references/edge-cdp-control.md`
for in-app authentication, consent-gated Edge profile reuse, isolated Edge startup, loopback CDP,
`DevToolsActivePort`, target selection, auth-state bootstrap, and cleanup. Load its
`auth-state-bootstrap.md` when the user approves copying an authenticated Edge profile.

## SAC scripting-specific boundaries

- Verify the approved tenant, story/application, page, widget, and runtime area before executing any script.
- Use CDP for local runtime inspection, widget diagnostics, console/network evidence, and approved screenshots.
- Preserve the story-layer/model immutability contract when the request is reporting-only; do not modify model metadata or invent unavailable fields.
- Ask before running tenant-changing scripts, planning operations, writeback, publish, data actions, permissions, or other mutations.
- If runtime inspection cannot be authenticated or verified, provide the complete implementation-ready specification and required evidence instead of claiming completion.
