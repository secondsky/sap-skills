# Multi Actions — Quick Reference (SAC 2026.8)

Purpose: orchestrate cross-model planning workflows (data actions, publishing, predictive, imports, API calls, data locking) with parameterized, restartable steps.

## When to choose multi actions
- Need to sequence multiple data actions or combine with publishing/predictive/API steps.
- Operations span several models/versions or can tolerate partial success (steps are independent transactions).
- Want calendar scheduling or a single starter in story/app for end users.

## Core step types (designer toolbar)
- **Data Action Step**: run a data action; map multi-action params; optional auto-publish with fail/ignore warnings; can limit to recommended planning area when target public version not in edit mode.
- **Version Management Step**: publish a version; options: fail on warnings vs ignore warnings.
- **Predictive Step**: time-series scenario; actions: Train & Forecast, Train Only, Apply Only; choose input/output versions; optional past-period values and prediction interval versions.
- **Data Import Step**: run import job (model or master data). Unsupported: job groups, export jobs, Concur/ERP/Fieldglass/Dataset, local-file imported models.
- **API Step**: HTTP POST with headers/body; supports CSRF token fetch; sync/async result mapping; parameters can be inserted into payload. HTTP 204 (No Content) is now accepted as a success response (QRC2 2026 / 2026.8+). Enhanced restrictions on HTTP header field names for security.
- **PaPM Integration Step**: trigger PaPM process/activity with parameters and follow-up options (delete process, mark complete).
- **Data Locking Step**: set lock state (Open/Locked/Restricted) via driving-dimension filters.

## Execution & background behavior
- Each step commits independently; earlier steps persist if later steps fail (status may be *successful with warning*).
- Background runs allowed; users must wait for completion before editing same version; refresh to view results.

## Parameter patterns
- Reuse member/number/measure parameters across steps; cross-model parameters reuse shared public dimensions.
- For embedded data actions, the container must still map/set each embedded parameter; you can apply stricter Level/cardinality than the embedded object.

## Troubleshooting signals
- Step failure messages identify step type/name.
- Data action issues surface in job monitor; version publish can fail on data locks; API steps expose response mapping for error fields.

Related: `references/data-actions.md` (data-action design), `references/job-monitoring.md` (diagnostics), `references/version-edit-modes.md` (publish behaviors).
