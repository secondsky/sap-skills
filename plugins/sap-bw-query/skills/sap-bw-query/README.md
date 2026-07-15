# SAP BW Query Automation Studio

Password-safe SAP BW query inspection, specification review, and unsaved local drafts through the bundled Eclipse/BW Modeling Tools workspace.

## Capability Index

| Capability | Status |
| --- | --- |
| Commands | 3: `/bw-studio-deploy`, `/bw-query-spec-review`, `/bw-query-draft` |
| Agents | 0 |
| Hooks | No |
| MCP | Yes: 19 closed-schema tools through the portable local gateway |
| LSP | No |
| Source Freshness | `last_verified`: 2026-07-13; fixed public packages, full local build, and verified local deployment evidence |
| Verification | Live BW connection, SNC/SSO, authorization, transport, query execution, and backend creation remain pending |

Safety defaults:

- Passwords, tokens, and secrets are never accepted; native SAP login is user-only.
- Existing queries are read-only.
- Drafts remain local and unsaved.
- There is no automated delete, overwrite, transport, cleanup, uninstall, raw-command, or final-save surface.
- A brand-new query can proceed only through a bound Eclipse confirmation and the user's manual native-wizard Finish action.

Primary resources:

- `SKILL.md`
- `references/query-spec-v1.md`
- `references/connection-metadata.md`
- `references/deployment-and-trust.md`
- `references/mcp-tools.md`

The top-level plug-in directories contain the Windows deployer, bundle builder, MCP gateway, and Eclipse extension sources.
