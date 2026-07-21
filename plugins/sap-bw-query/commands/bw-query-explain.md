---
name: bw-query-explain
description: Produce business-readable documentation of an existing open SAP BW query from its deep-read model, read-only
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
argument-hint: "<open-query-technical-name> [alias] [project]"
arguments:
  - name: target
    description: Technical name of a query already open read-only in BW Query Designer
    required: true
  - name: context
    description: Optional connection alias and BW project for the open query
    required: false
---

# BW Query Explain

This command is read-only. It never modifies, saves, creates, or deletes anything; the query stays read-only. Passwords are never accepted; pause at the native SAP login dialog if authentication is required.

Turn an existing open query into plain-language documentation a business analyst can read, using only the deep-read model.

## Workflow

1. Run `bw_inspect_capabilities` to confirm the studio is connected and `modelReadSupported` is available. If not, report that and stop.
2. Run `bw_read_query_model` with the connection `alias`, `project`, and `technicalName`. If it returns `found: false`, relay the `instruction` (open the query read-only in BW Query Designer) and stop.
3. From the returned model, describe the query in business terms:
   - **Purpose and identity** — technical name, provider, description.
   - **Layout** — characteristics on rows, columns, and free; note structures.
   - **Key figures** — for each structure member, decode the formula (`formulaDefinitionString`) or the restriction (restricting characteristics and their selected values/variables) into plain language.
   - **Filters and variables** — global filter selections and any variables (prompts).
   - **Conditions and exceptions** — what each keeps/highlights, and whether an exception affects data cells.
   - **Settings** — zero suppression, sign presentation, result position, and other display settings.
4. Flag every entry in `serializationIssues` as an unconfirmed area the reader should verify in BW Query Designer; do not present it as fact.
5. Keep it read-only: do not propose applying changes, and do not create a draft.

## Output Contract

Return:

- A business-readable summary: purpose, layout, key figure definitions (decoded formulas/restrictions), filters, variables, conditions/exceptions, and settings.
- Explicit callouts for any `serializationIssues` as unconfirmed areas.
- A short technical appendix mapping each described element to its model path where useful.
- An explicit statement that the documentation is read-only and modified or saved nothing.
