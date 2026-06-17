# Failure Triage and Artifacts

Source: Derived summary from `SAC_Automated_Test_Suite_Playwright_AgentBrowser_Plan.md`.

Every SAC failure should produce evidence a dashboard owner, data owner, SAC admin, and automation engineer can understand without replaying the test manually.

## Required Artifacts

- HTML report with scenario, story, role, page, status, retry count, and artifact links.
- Playwright trace with action timeline, DOM snapshots, network events, and console logs.
- Video retained on failure or retry.
- Screenshots before action, after action, and at failure.
- Visual diff overlay for screenshot assertions.
- Widget bounding boxes with widget name, component ID, selector/ref, and coordinates.
- Expected vs actual values with raw text, parsed value, expected value, and tolerance.
- Console, network, SAC toast, and dialog errors.
- Root-cause classification.

## Failure Packet Fields

Capture a structured packet with:

- Run ID, scenario ID, profile ID, story ID, role, page, and component.
- Component type, SAC widget name, selector reference, and bounding box.
- Assertion type and assertion-specific context.
- Expected and actual values, including raw and parsed values.
- Tolerance and comparison rule.
- Classification category, confidence, and reason.
- Artifact paths for report, trace, video, screenshots, diff, and network summary.

## Root-Cause Categories

Use deterministic signals first; AI summaries can help explain but should not be the sole classifier.

| Category | Strong signals | Typical owner |
|---|---|---|
| `auth` | Login page, IdP redirect, 401/403, expired storage state. | QA/platform/security |
| `selector` | Component not found but page loaded. | QA automation plus dashboard owner |
| `data-drift` | Widget loaded, value differs, no UI error. | Data owner |
| `permission` | Expected widget/action hidden or forbidden for one role. | SAC admin/security |
| `performance` | Timeouts, slow queries, pending network, no data by deadline. | SAC admin/backend owner |
| `planning-conflict` | Lock, publish conflict, validation error, version conflict. | Planning model owner |
| `sac-unsupported-feature` | Feature blocked by optimized-story restriction or tenant limitation. | Dashboard owner/SAC admin |
| `visual-regression` | Pixel diff above tolerance, data still correct. | Dashboard owner/UX |
| `real-dashboard-bug` | User-visible bug reproduced and not explained by test/data/env drift. | Dashboard owner/dev team |

## Performance and Readiness Metrics

Measure readiness, not uncontrolled tenant load:

- Time to SAC shell.
- Time to story title.
- Time to critical widgets.
- Time after filter apply.
- Time to prompt completion.
- Time to export download.
- Time to planning commit.
- Failed network requests.
- Page errors and SAC error toasts/dialogs.

Do not run high-concurrency load tests against SAC without SAP/customer approval.
