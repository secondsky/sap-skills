---
name: bw-query-review
description: Review an open SAP BW query or a draft QuerySpec against BW query-design best practices, read-only
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
argument-hint: "<open-query-technical-name-or-spec-file> [open|draft]"
arguments:
  - name: target
    description: Open query technical name (with connection alias and project) or a password-free QuerySpec v1 draft file
    required: true
  - name: mode
    description: Optional lens - open (an existing query) or draft (a spec)
    required: false
---

# BW Query Review

This command is read-only. It never modifies, saves, creates, or deletes anything; existing queries stay read-only and no draft is created. Passwords are never accepted; pause at the native SAP login dialog if authentication is required.

Review a BW query against the shared design-rule catalog (BWQ001–BWQ012). The same rules apply to a draft spec and to an existing open query; findings are advisory only.

## Workflow

1. Run `bw_inspect_capabilities` to confirm the studio is connected and the relevant read-only gates (`modelReadSupported`, `providerMetadataSupported`) are available. If the studio is down, report that and stop; do not guess.
2. For an existing open query, run `bw_review_query` with the connection `alias`, `project`, and `technicalName`. It deep-reads the open query model read-only and returns `findings`. If it returns `found: false`, relay the `instruction` (open the query read-only in BW Query Designer) and stop.
3. For a draft, run `bw_resolve_and_validate_spec` (optionally with an `alias` for metadata verification) and read the additive `bestPractices` array; resolve any blocking validation errors first.
4. Present findings grouped by severity — `warning` first, then `info` — each naming the offending element, its `ruleId`, and a one-line rationale. Use `references/query-design-rules.md` as the authoritative catalog and cite the matching rule section for resolution guidance.
5. Note any `serializationIssues` returned for an open query as areas that could not be fully confirmed. State explicitly that thresholds are heuristics and that nothing was changed or saved.

## Output Contract

Return:

- Source reviewed (open query technical name and provider, or draft spec) and whether the deep read/validation succeeded.
- Warnings, then info findings, each with `ruleId`, offending element, and rationale.
- Any unconfirmed areas (`serializationIssues`, or facts skipped because the source cannot express them, such as exception aggregation for an open query).
- Prioritized, non-mutating remediation guidance referencing `references/query-design-rules.md`.
- An explicit statement that the review is read-only and modified or saved nothing.
