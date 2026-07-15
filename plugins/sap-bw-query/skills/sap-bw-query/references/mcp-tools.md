# BW Automation MCP tools

## Local-only

- `bw_studio_status`, `bw_studio_deploy`, `bw_studio_launch`, `bw_studio_rollback`, `bw_studio_diagnostics`
- `bw_connection_prepare`, `bw_connection_import_landscape`, `bw_connection_status`
- `bw_project_create_or_open`
- `bw_resolve_and_validate_spec`
- `bw_create_local_draft`, `bw_apply_spec_to_draft`, `bw_preview_draft`

## Read-only tenant

- `bw_connection_test_reachability` — network only, unauthenticated
- `bw_inspect_capabilities`
- `bw_describe_provider`
- `bw_list_queries`
- `bw_read_query`

## Mutating tenant classification

- `bw_prepare_new_query_save` — explicit approval required. This checks collision information, binds the specification hash, and schedules Eclipse confirmation. It does not perform the final save.

All input schemas use `additionalProperties: false`. The server returns generic errors and keeps request bodies out of logs. Password detection uses the mandatory rotation warning.

Credentials, tokens, and secrets are never accepted. Live tenant access is limited to the classified read-only tools; the only tenant-affecting preparation tool requires explicit approval and still cannot perform the final save.

There are no destructive operations and no delete, remove, drop, overwrite, cleanup, uninstall, transport, raw-command, or final-save tools.

## Sources

- The authoritative surface is generated from `mcp/src/tool-registry.mjs` and checked against the enterprise MCP inventory by the repository validation suite.
