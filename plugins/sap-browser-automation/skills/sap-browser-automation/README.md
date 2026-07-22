# SAP Browser Automation

Authenticated SAP web interface automation through an in-app Browser, isolated Microsoft Edge CDP profiles, or an existing Playwright client.

## Capability Index

| Capability | Status |
| --- | --- |
| Commands | No |
| Agents | No |
| Hooks | No |
| MCP | No |
| LSP | No |
| Source Freshness | `last_verified`: 2026-07-14; public documentation review and local Edge/Node fixture evidence |
| Verification | Live SAP tenant, enterprise SSO, client certificates, MFA, and in-app Browser execution remain pending |

Primary resources:

- `SKILL.md`
- `references/auth-state-bootstrap.md`
- `references/edge-cdp-control.md`
- `references/in-app-browser-auth.md`
- `scripts/cdp-agent.mjs`
- `scripts/edge-profile.ps1`

The default workflow reuses authentication only through approved local browser mechanisms. It never accepts passwords or exports persistent authentication material to the repository.
