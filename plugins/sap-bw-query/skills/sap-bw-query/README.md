# SAP BW Query Automation Studio

Password-safe SAP BW query inspection, InfoProvider metadata reads, metadata-verified specification review, unsaved local drafts, and human-confirmed draft population through the bundled Eclipse/BW Modeling Tools workspace.

## Capability Index

| Capability | Status |
| --- | --- |
| Commands | 5: `/bw-studio-deploy`, `/bw-query-spec-review`, `/bw-query-draft`, `/bw-query-review`, `/bw-query-explain` |
| Agents | 0 |
| Hooks | No |
| MCP | Yes: 22 closed-schema tools through the portable local gateway |
| LSP | No |
| Source Freshness | `last_verified`: 2026-07-17; fixed public packages, signature-level BWMT 1.27.36 API inspection, full local build, and verified local deployment evidence |
| Verification | Live BW connection, metadata read, editor population, SNC/SSO, authorization, transport, query execution, and backend creation remain pending (see `docs/project/sap-bw-query-live-validation-runbook.md`) |

Safety defaults:

- Passwords, tokens, and secrets are never accepted; native SAP login is user-only.
- Existing queries are read-only; editor population refuses any query that already has content.
- Drafts remain local and unsaved; population fills only the wizard-created unsaved editor and reports every element.
- There is no automated delete, overwrite, transport, cleanup, uninstall, raw-command, or final-save surface.
- A brand-new query can proceed only through a bound Eclipse confirmation, the user's manual native-wizard Finish action, and the user's manual Save after reviewing the populated model.

Primary resources:

- `SKILL.md`
- `references/query-spec-v1.md`
- `references/bwmt-api-map.md`
- `references/connection-metadata.md`
- `references/deployment-and-trust.md`
- `references/mcp-tools.md`

The top-level plug-in directories contain the Windows deployer, bundle builder, MCP gateway, and Eclipse extension sources.
