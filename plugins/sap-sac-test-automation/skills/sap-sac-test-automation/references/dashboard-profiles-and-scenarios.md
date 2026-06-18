# Dashboard Profiles and Scenarios

Source: Derived summary from incorporated SAC automated-suite planning content and extracted onboarding templates.

Use dashboard profiles to keep SAC tests reusable and reviewable. A profile describes the dashboard contract; scenarios describe user workflows against component IDs from that contract.

Start new dashboards with `/sac-test-onboard` when commands are available. Use the bundled `templates/intake.md`, `templates/dashboard-profile.yaml`, and `templates/scenario-read-only-smoke.yaml` as starter artifacts, then replace every `TODO(...)` with reviewed tenant/project facts.

## Profile Contents

At minimum, capture:

- Dashboard identity: profile ID, name, owner, risk class, tenant base URL, story ID, open mode, bookmark, optimized-story flag.
- Execution settings: browser project, viewport, locale, timezone, auth states, timeout, worker policy.
- Readiness: required texts, forbidden SAC error texts, loading indicators, critical widgets.
- Pages/tabs: IDs, visible titles, locators, ready markers.
- Components: IDs, type, page, SAC widget name, visible label/title, locator policy, criticality, actions, readiness behavior.
- Data assertions: expected files, parsing rules, tolerances, key columns, value columns.
- Visual assertions: baseline path, screenshot region, masks, tolerance.
- Planning policy: model, version strategy, reset command, publish policy, serial execution.
- Permissions: expected visible/hidden components, data filters, denied actions per role.
- Known risks: live connection latency, chart visual noise, planning locks, unsupported optimized-story features.

## Scenario Contents

At minimum, capture:

- Scenario ID, title, profile path, tags, risk level, role, and serial flag when needed.
- Preconditions: bookmark, page, data snapshot, auth role, reset requirement, no-write policy.
- Steps: action IDs, component IDs, action names, arguments, wait conditions.
- Assertions: visible text, table cell values, screenshot baselines, downloads, permissions, no SAC error toasts.
- Cleanup: reset filters, delete comments, revert private versions, delete private versions, or run reset command.
- Failure hints: selector, data drift, permission, performance, planning conflict, unsupported feature.

## Adapter Responsibilities

Use adapters so scenarios never hard-code selectors:

- `ButtonAdapter`: locate by role/text/tooltip, click, assert enabled/disabled, wait for configured downstream result.
- `TableAdapter`: map headers, scroll/search virtualized rows, parse numbers, compare tolerances, capture table screenshots.
- `ChartAdapter`: capture widget region, compare screenshot baseline, read labels/tooltips where available, defer business values to companion data.
- `TabAdapter`: navigate pages/tabs, handle overflow menus, assert page-ready markers.
- `FilterAdapter`: open popup, search/select members, assert chips/selected values, reset state.
- `PromptAdapter`: detect prompt dialog, set variables, apply/cancel, assert downstream state.
- `PlanningTableAdapter`: enter values, wait for commit, publish/revert only if policy allows, capture planning errors.
- `CommentAdapter`: add/find/delete comments with run IDs, enforce serial execution.
- `CustomWidgetAdapter`: use owned-widget public hooks where available; otherwise perform black-box text/visual checks.
- `ExportAdapter`: trigger download, wait for file, validate extension/name/size/content.
- `BookmarkAdapter`: open bookmark or URL state and assert resulting dashboard state.

## Onboarding Flow

1. Inventory dashboard candidates and choose a low-risk pilot.
2. Run `/sac-test-onboard` or manually create the intake/profile/scenario starter artifacts from templates.
3. Define policy for auth, tenants, production read-only limits, writeback approval, and baseline ownership.
4. Prepare dedicated users, role matrix, and QA story copies for writeback/comment flows.
5. Stabilize SAC widget names, visible labels, page names, and bookmarks.
6. Run the approved discovery backend and save artifacts under `profiles/<dashboard>/discovery/`.
7. Review discovery output with dashboard owner and replace guesses with approved SAC widget names where possible.
8. Approve profile selectors, expected values, tolerances, role expectations, and unsupported features.
9. Review the intake/profile/scenario packet with `sac-test-profile-reviewer` when available.
10. Implement adapters and scenarios for smoke, navigation, filters, tables, chart visual checks, exports, permissions, and controlled stateful flows.
11. Burn in the pilot for five scheduled runs or classify all remaining failures as environment/data drift before scaling.
