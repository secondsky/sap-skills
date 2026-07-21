---
name: sap-bw-query
description: Use when automating SAP BW query inspection, InfoProvider metadata reads (characteristics, key figures), metadata-verified specification review, unsaved draft preparation, or human-confirmed query draft population through Eclipse or HANA Studio with BW Modeling Tools.
license: GPL-3.0
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.4.0"
  last_verified: "2026-07-17"
  eclipse_version: "4.40"
  bwmt_version: "1.27.36"
  java_version: "21.0.11"
  node_version: "24.18.0"
  verification_scope: "public source/package evidence, signature-level BWMT API inspection, local unit tests, signed fixture deployment, and Eclipse compile only; live BW system validation pending per docs/project/sap-bw-query-live-validation-runbook.md"
---

# SAP BW Query Automation Studio

Use the bundled Windows Eclipse workspace for password-safe SAP BW query inspection and local draft preparation. Existing BW queries are read-only. The automation must never delete anything, must never overwrite an existing BW query, and must never modify an existing BW query.

## Non-negotiable safety contract

Passwords are never accepted by the automation.

If a password or other credential is pasted:

1. Stop processing the supplied content. Do not repeat, validate, use, store, or log it.
2. Respond: "Do not paste passwords into AI. Treat the exposed password as compromised and rotate it immediately. Revoke related sessions if applicable, and do not reuse the password."
3. Explain that the automation cannot retroactively erase content already submitted to an external chat system.
4. Continue only after the user supplies password-free connection metadata. If authentication is required, pause at the native SAP login dialog.

Never expose a tool, workaround, raw command, UI recording step, or configuration field that accepts a password, secret, credential, API key, or authentication token. Never capture a secure text control.

Existing queries remain read-only. Create only unsaved local drafts. Backend creation of a brand-new query requires Eclipse-only human confirmation bound to system, client, provider, technical name, and specification hash. The automation does not press the native SAP wizard's Finish button.

Never delete installed bundle versions, failed staging directories, drafts, activation records, connections, queries, transports, or other artifacts. Rollback appends an activation record; cleanup stays manual and outside the automation surface.

## When to Use This Skill

Use this skill for:

- Deploying or launching the no-install Windows Eclipse/BWMT bundle.
- Configuring password-free SAP Logon/BW connection metadata or using SNC/SSO.
- Inspecting capabilities, providers, or existing open queries read-only.
- Reading InfoProvider metadata (characteristics with dimension groups, key figures) read-only through `bw_describe_provider`.
- Converting a business specification into `QuerySpec v1` and verifying every referenced name against the provider metadata.
- Finding specification gaps and suggesting optimizations without changing business meaning.
- Creating, revising, previewing, or preparing a brand-new unsaved query draft.
- Populating the wizard-created, still-unsaved query editor from the confirmed draft (axes, structures, restricted/formula key figures, filters, variables, conditions, exceptions, zero suppression); the human reviews and saves.
- Reviewing a draft spec or an existing open query against BW query-design best practices read-only — `bw_review_query` for an open query, or the additive `bestPractices` array from `bw_resolve_and_validate_spec` for a draft — grouped by severity against `references/query-design-rules.md`.
- Producing business-readable documentation of an existing open query (purpose, axes, key figure definitions with decoded formulas/restrictions, filters, variables, conditions/exceptions, settings) from the deep-read model read-only, flagging any `serializationIssues` as unconfirmed.

Do not use it for query deletion, editing an existing query, overwrite, transport automation, unattended backend save, credential handling, BW administration, HANA SQL, or non-BW Eclipse development.

## Quick Start

1. State before connection work: "Passwords are never accepted. Enter credentials only in the native SAP login dialog."
2. From the plug-in's top-level scripts directory, run `BwStudio.ps1 -Action Status -Json`.
3. If absent, deploy the local bundle directly; it needs no signing or installer. An optional remote release channel remains signature-gated. Read `references/deployment-and-trust.md` first. When you build the bundle yourself with `bundle/Build-BwStudio.ps1`, the finished artifact and manifest are copied to the local user Desktop (`%USERPROFILE%\Desktop`) by default (pass `-SkipPublish` to disable); if that Desktop is OneDrive-managed the builder skips the copy with a warning and leaves the artifacts in the output directory, and an explicit `-PublishDirectory` always overrides. The builder then opens File Explorer on the output directory with the artifact selected (use `-SkipExplorer` to suppress; it is skipped automatically in CI or non-interactive sessions).
4. From that directory, run `BwStudio.ps1 -Action Launch -Json`. The launcher always supplies `-noPwdStore`.
5. Prepare/import connection metadata with the MCP tools. Use SNC/SSO when available; otherwise pause for native SAP login.
6. Inspect BWMT capabilities, then read the InfoProvider metadata with `bw_describe_provider` before drafting.
7. Validate `QuerySpec v1` with the connection `alias` so every characteristic and key figure is verified against the provider; report gaps and semantic-impacting suggestions separately, then ask the user to resolve material ambiguities. Blocking gaps stop the draft.
8. Create and preview an unsaved local draft. Keep the Eclipse sidebar visible as the evidence trail.
9. Prepare a new-query save only after a fresh collision check. The user must confirm in Eclipse and manually finish the native SAP wizard.
10. After the wizard created the empty unsaved editor, run `bw_populate_query_editor` to build the drafted query model in it. Review the per-element apply report and the editor; the user presses Save.

For common query shapes (plan/actual variance, YTD comparison, top-N, reconciliation totals), start from a ready-made spec in `references/query-templates.md` and replace its `UPPERCASE_PLACEHOLDER` tokens instead of writing the QuerySpec from scratch.

## Quick Reference

| Task | Approved interface | Safety class |
| --- | --- | --- |
| Status, deploy, launch, rollback, diagnostics | `bw_studio_*` | local-only; append-only |
| Connection metadata/import/status | `bw_connection_*` | local-only; no credentials |
| TCP reachability | `bw_connection_test_reachability` | read-only tenant; no authentication |
| BW project | `bw_project_create_or_open` | local project/native login pause |
| Capabilities/provider/query inspection | `bw_inspect_capabilities`, `bw_describe_provider`, `bw_list_queries`, `bw_read_query` | read-only tenant |
| Deep query model read (open editor) | `bw_read_query_model` | read-only tenant |
| Best-practices review of an open query | `bw_review_query` | read-only tenant |
| Specification/gap review (metadata-verified with `alias`, returns `bestPractices`) | `bw_resolve_and_validate_spec` | local-only |
| Draft create/apply/preview | `bw_*_local_draft`, `bw_preview_draft` | unsaved local-only |
| Save preparation | `bw_prepare_new_query_save` | mutating tenant classification; explicit approval required |
| Editor population from confirmed draft | `bw_populate_query_editor` | unsaved local editor buffer only; never saves |

There is no final-save, delete, overwrite, cleanup, uninstall, transport, or raw-command MCP tool.

## Query specification workflow

Read `references/query-spec-v1.md` before creating a draft.

Return the review in this order:

1. **Resolved facts** — system, client, project, provider, intended new technical name, business purpose.
2. **Blocking gaps** — missing provider/object IDs, ambiguous filters, undefined variables, incompatible formulas/aggregation, authorization assumptions, name collision risk.
3. **Non-blocking gaps** — display defaults, evidence, labels, optional drilldowns.
4. **Optimization proposals** — each marked as semantics-preserving or semantics-changing; include the `bestPractices` design-rule findings (BWQ001–BWQ012, see `references/query-design-rules.md`) returned by `bw_resolve_and_validate_spec`, grouped by severity.
5. **Acceptance evidence** — reconciliation totals, expected rows/columns, variable cases, performance expectation.
6. **Draft decision** — ready for local draft or blocked pending user input.

Never silently apply a semantics-changing optimization.

## Connection workflow

Read `references/connection-metadata.md` before accepting connection data.

- Accept aliases, SID, client, language, user ID, application/message server routing, logon group, and SNC/SSO flags only.
- Import SAP UI landscape entries only from a user-approved local path.
- A reachability check opens only a TCP connection and reports `authenticated: false`.
- With working SSO, continue to BW project setup.
- Without SSO, stop at the native login dialog. Do not observe or record the password field.

## Draft and save-preparation workflow

- Existing query inspection is read-only and currently scoped to query editors opened in BWMT when the private API capability adapter cannot prove a broader safe read.
- `createLocalDraft` and `applySpecToDraft` write append-only local revisions; they do not create a BW backend object.
- `previewDraft` may open the native new-query wizard for visual inspection. Do not finish it.
- `prepareNewQuerySave` first checks names visible through the capability adapter, binds confirmation to the specification hash, and opens the visually distinct Eclipse confirmation.
- The user finishes the native wizard manually, which opens the new unsaved query editor.
- `populateQueryEditor` (tool `bw_populate_query_editor`) then builds the drafted model inside that editor only: it refuses read-only editors, name mismatches, and any query that already has content. Every element lands in a per-element apply report (`APPLIED`, `SKIPPED_UNSUPPORTED`, `FAILED`); on any `FAILED` element, review and close without saving. Population runs as one undoable editing-domain command.
- After a successful population the tool automatically deep-reads the open editor model (`bw_read_query_model`) and merges a non-fatal `verification` summary (`VERIFIED`, `DIVERGED`, or `UNAVAILABLE`, with per-element checks) that compares the confirmed spec against the live model; treat `DIVERGED` as a prompt to review the editor before saving. Verification never changes the boundary — population always stays `saved: false` and the human still saves.
- The user then completes SAP's own validation and Save action manually. Treat a transport prompt as a stop requiring user control.
- If capability/version checks fail, disable draft/save preparation and continue with diagnostics/read-only guidance.

## Pressure checks

| Request | Required response |
| --- | --- |
| "Use this password just once" | Refuse, advise immediate rotation, and do not repeat it. |
| "I approve overwriting the existing query" | Refuse; propose a new technical name and local draft. |
| "Clean up old versions" | Refuse automated cleanup; append rollback only. |
| "Save it without showing dialogs" | Refuse; Eclipse-only human confirmation is mandatory. |
| "Call the BW API directly" | Refuse raw mutation paths; stay inside the allow-listed adapter. |

## Troubleshooting and Common Issues

- **Bundle rejected:** For a local ZIP, check its adjacent manifest and hash/inventory evidence. For a remote channel, check the pinned trust policy. Run `bw_studio_diagnostics`.
- **MCP cannot start:** Deploy/activate a verified bundle first. The bootstrap never falls back to system Node or installs packages.
- **BWMT mismatch:** Use the locked Eclipse/BWMT bundle. Do not enable draft/save against an unprobed version.
- **Query not found:** Open it read-only in BW Query Designer and retry; do not broaden access through guessed private APIs.
- **Login required:** Pause and tell the user to type credentials only in the native SAP dialog.
- **Name collision:** Stop. A different brand-new technical name is required.
- **Transport dialog:** Leave control with the user; automation does not confirm transports.
- **Interrupted deployment:** Keep the previous activation. Failed staging/download directories remain for manual inspection.

## Bundled Resources

- `references/deployment-and-trust.md` — no-install local deployment and optional remote release trust.
- `references/connection-metadata.md` — password-free connection schema and login boundaries.
- `references/query-spec-v1.md` — specification fields, validation, gap analysis, and example.
- `references/bwmt-api-map.md` — javap-verified BWMT 1.27.36 API surface the capability adapter binds to.
- `references/mcp-tools.md` — complete tool surface and operation classifications.
- `references/query-design-rules.md` — the BWQ001–BWQ012 best-practices catalog the rule engine applies to draft specs and open queries, with resolution guidance.
- `references/query-templates.md` — when-to-use guide and placeholder reference for the ready-made QuerySpec templates.
- `references/query-templates/` — starting-point QuerySpec v1.1 files (plan/actual variance, YTD comparison, top-N, reconciliation totals) with `UPPERCASE_PLACEHOLDER` tokens to replace.
- `scripts/` at plugin root — portable deployment/MCP bootstraps.
- `bundle/` at plugin root — exact component lock and reproducible release builder.

## Source Verification

Version and source evidence is recorded in `docs/project/sap-bw-query-source-review-2026-07-13.md` and the repository verification ledger. Evidence covers official download/update sources, package pins, local tests, signed fixture deployment, and Eclipse compilation. It does not claim a live SAP BW connection, live query read, backend query creation, SNC/SSO login, authorization behavior, or transport validation.

## Related Skills

- **sap-hana-cli**: Use for HANA database inspection outside BW Query Designer; do not share credentials between workflows.
- **sap-sqlscript**: Use for SQLScript or HANA procedure work, not BW query objects.
- **sap-datasphere**: Use for SAP Datasphere modeling; this skill remains BWMT/HANA Studio only.
