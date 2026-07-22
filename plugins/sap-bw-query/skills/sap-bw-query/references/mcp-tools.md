# BW Automation MCP tools

## Local-only

- `bw_studio_status`, `bw_studio_deploy`, `bw_studio_launch`, `bw_studio_rollback`, `bw_studio_diagnostics`
- `bw_connection_prepare`, `bw_connection_import_landscape`, `bw_connection_status`
- `bw_project_create_or_open`
- `bw_resolve_and_validate_spec` — with the optional `alias` input it fetches provider metadata through the read-only `describeProvider` bridge call and verifies every referenced characteristic/key figure; the result carries `metadataChecked` and `readyForDraft`. A valid spec additionally carries a `bestPractices` array of design-rule findings (BWQ001–BWQ012) from the shared rule engine (`query-rules.mjs`); the array is empty when the spec is invalid, and no existing result keys change
- `bw_create_local_draft`, `bw_apply_spec_to_draft`, `bw_preview_draft`
- `bw_populate_query_editor` — builds the confirmed draft inside the wizard-created, still-unsaved query editor. Requires a prior prepared save (`SAVE_PENDING_HUMAN`). Mutates only the local editor buffer, refuses editors with existing content, returns a per-element `applyReport`, and always returns `saved: false` — the human saves. On a successful population it automatically deep-reads the editor model through the read-only `readQueryModel` bridge call and merges a non-fatal `verification` summary (`status` of `VERIFIED`, `DIVERGED`, or `UNAVAILABLE`, plus per-element `checks` and `counts`) that compares the confirmed spec against the live model; the read failing never fails the populate.

## Read-only tenant

- `bw_connection_test_reachability` — network only, unauthenticated
- `bw_inspect_capabilities` — includes the `providerMetadataSupported`, `populateSupported`, and `modelReadSupported` gates with per-feature diagnostics
- `bw_describe_provider` — besides open-editor summaries, returns `metadata` (characteristics with dimension groups, key figures, dimensions) via the capability-gated BWMT connectivity services; offline or unauthenticated sessions yield `metadata.available: false` with an instruction
- `bw_list_queries`
- `bw_read_query`
- `bw_read_query_model` — serializes the complete EMF model of an open, name-matching query to the deep-read JSON contract (axes; structures with members; selection groups and tokens; filter, condition, and exception selections; display settings) with a `serializationIssues` list. Capability-gated behind `modelReadSupported`, strictly read-only (no editing domain, no save), and returns `found: false` with an instruction when the query is not open in BW Query Designer.
- `bw_review_query` — best-practices review of an OPEN query. Reuses the read-only `readQueryModel` bridge call (no new bridge method), normalizes the deep model, and runs the shared rule engine (`query-rules.mjs`). Returns `found`, `technicalName`, `provider`, `findings` (each with `ruleId`, `severity`, `path`, `message`, `rationale`), `serializationIssues`, and `readOnly: true`; returns `found: false` with the deep-read instruction when the query is not open. Never mutates or saves.

## Mutating tenant classification

- `bw_prepare_new_query_save` — explicit approval required. This checks collision information, binds the specification hash, and schedules Eclipse confirmation. It does not perform the final save.

All input schemas use `additionalProperties: false`. The server returns generic errors and keeps request bodies out of logs. Password detection uses the mandatory rotation warning.

Credentials, tokens, and secrets are never accepted. Live tenant access is limited to the classified read-only tools; the only tenant-affecting preparation tool requires explicit approval and still cannot perform the final save.

There are no destructive operations and no delete, remove, drop, overwrite, cleanup, uninstall, transport, raw-command, or final-save tools.

## Sources

- The authoritative surface is generated from `mcp/src/tool-registry.mjs` and checked against the enterprise MCP inventory by the repository validation suite.
