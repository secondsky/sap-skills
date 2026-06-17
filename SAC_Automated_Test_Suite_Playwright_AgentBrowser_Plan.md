# Reusable Automated Test Suite Plan for SAP Analytics Cloud Stories, Reports, and Dashboards

**Prepared for:** SAP Analytics Cloud QA / automation architecture  
**Primary recommendation:** Hybrid architecture — `agent-browser` for AI-assisted discovery and Playwright for deterministic CI execution.  
**Scope:** SAC optimized stories, reports, dashboards, comments, planning, data entry, permissions, visual regression, and reusable multi-dashboard automation.

---

## 1. Executive Recommendation

Build the suite as a **hybrid, profile-driven automation framework**:

> **Use Vercel Labs `agent-browser` / AI for discovery, mapping, exploratory crawling, ad hoc debugging, and first-pass scenario generation. Use Playwright for reviewed, deterministic, CI-gated execution.**

Do **not** build the core regression suite around autonomous AI browser control alone. SAP Analytics Cloud dashboards are too dependent on SSO, generated UI structures, optimized-story restrictions, async backend queries, live data, planning versions, comments, role-based permissions, tenant configuration, and persistent side effects.

The recommended architecture is:

```text
SAC story/dashboard
  -> agent-browser discovery
  -> human-reviewed dashboard profile
  -> reusable Playwright adapters
  -> deterministic Playwright scenarios
  -> CI reports, traces, screenshots, videos, visual diffs, failure classification
```

The key operating rule should be:

> **agent-browser proposes. Humans approve. Playwright executes. CI enforces.**

---

## 2. Source-Verified Capability Baseline

The plan below is grounded in the following primary sources:

| Area | Primary source |
|---|---|
| SAC scripting and optimized story APIs | [SAP Help: Scripting with Optimized Stories](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/6a4db9a9c8634bcb86cecbf1f1dbbf8e.html) |
| SAC optimized story restrictions | [SAP Help: Optimized Story Experience Restrictions](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/2d00f5ff0c9245a99a9df96cb83236a9.html) |
| SAC story comments | [SAP Help: Commenting on a Story Page or Widget](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/7bd1f80d20774a4dacfdf87ebd42fd73.html) |
| SAC public/private planning versions | [SAP Help: Plan on Public Versions](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/b6e3d093988e4c3eba7eb6c1c110e954.html) |
| SAC data entry errors | [SAP Help: Data Entry Errors](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/1a011f8041a84e109a3b6bf8c1c81bc1.html) |
| SAC validation rules | [SAP Help: Validation Rules](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/24c7eb623b4249c0ae1d78150a429f09.html) |
| Vercel Labs `agent-browser` | [GitHub: vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) |
| Playwright core capability | [Playwright: Installation / Introduction](https://playwright.dev/docs/intro) |
| Playwright locators | [Playwright: Locators](https://playwright.dev/docs/locators) |
| Playwright auto-waiting | [Playwright: Auto-waiting](https://playwright.dev/docs/actionability) |
| Playwright authentication | [Playwright: Authentication](https://playwright.dev/docs/auth) |
| Playwright trace viewer | [Playwright: Trace Viewer](https://playwright.dev/docs/trace-viewer) |
| Playwright visual comparisons | [Playwright: Visual Comparisons](https://playwright.dev/docs/test-snapshots) |
| Playwright screenshots | [Playwright: Screenshots](https://playwright.dev/docs/screenshots) |
| Playwright videos | [Playwright: Videos](https://playwright.dev/docs/videos) |
| Playwright reporters | [Playwright: Reporters](https://playwright.dev/docs/test-reporters) |
| Playwright CI | [Playwright: Continuous Integration](https://playwright.dev/docs/ci) |

### 2.1 What the SAP sources imply

SAP Analytics Cloud supports story scripting for optimized stories, which is useful for custom logic and optional test-mode diagnostics. However, SAC scripting should not be treated as a complete external automation API. It can help expose status, selected filters, last script action, or planning action status, but the external test runner still needs to interact with the browser UI.

SAP also maintains restrictions for optimized stories. Therefore, the automation framework must include a **tenant/story capability profile** and should not assume every SAC feature behaves the same way across classic stories, optimized stories, mobile experiences, embedded scenarios, or customer tenants.

SAP comments are persistent collaboration artifacts, not disposable UI text. Comment tests must be isolated, tagged, cleaned up when possible, and run serially.

SAP planning tests are writeback tests. Public/private versions, data locks, validation rules, permissions, and data-entry errors mean planning automation must be treated as high-risk, controlled, and environment-specific.

### 2.2 What the `agent-browser` source implies

The `agent-browser` repository describes the tool as a browser automation CLI for AI agents. Its documented commands include browser open/navigation, accessibility snapshots, semantic find by role/text/label/test ID, screenshots, annotated screenshots, console/error inspection, network/HAR inspection, state handling, and natural-language chat/browser control.

That makes it strong for discovery and debugging, but the tool should not be the final pass/fail authority for audited SAC regression testing.

### 2.3 What the Playwright sources imply

Playwright is designed as an end-to-end testing framework with a test runner, assertions, isolation, configuration, locators, authentication state handling, traces, screenshots, videos, reporters, and CI execution. Playwright locators prioritize user-facing roles, labels, and text and include auto-waiting/retry-oriented behavior.

That makes Playwright the stronger deterministic execution layer for SAC regression testing.

---

## 3. Hard Feasibility Assessment

| Approach | Feasibility | Recommended use | Not recommended for | Verdict |
|---|---:|---|---|---|
| **Playwright only** | High for deterministic UI tests; medium for complex SAC widgets | CI regression, smoke, navigation, role tests, filters, tables, exports, controlled visual checks, controlled planning tests | Fast discovery of unknown dashboards | **Viable, but slower to onboard** |
| **agent-browser only** | Medium for discovery; low-medium for release gates | Exploration, component discovery, accessibility snapshots, ad hoc debugging, first-pass scenario drafts | Deterministic CI gates, planning publish, financial correctness, destructive data actions | **Not recommended as primary runner** |
| **Hybrid** | High | AI-assisted discovery plus deterministic Playwright execution | Environments where AI/browser-agent tooling is prohibited | **Recommended** |
| **SAC scripting as test harness** | Medium as support layer | Diagnostic widgets, script status indicators, test-mode panels, selected filter/version/action status | Replacing external E2E tests | **Useful supplement, not primary runner** |
| **Visual-only testing** | Medium | Layout, chart rendering, missing widgets, role-based visual checks | Business value correctness, planning correctness | **Useful but insufficient** |
| **Data-only testing** | Medium-high where data is seeded | KPI/table/planning assertions | Layout, chart rendering, broken UI interactions | **Required but incomplete** |
| **Production story automation** | Low-medium risk if read-only | Login, open story, availability smoke, no-write checks | Comments, planning writebacks, data actions, destructive flows | **Read-only only** |
| **QA cloned stories** | High | Planning, comments, data actions, multi actions, negative tests | Final production-only permission validation | **Strongly recommended** |

---

## 4. Recommended Architecture

```text
┌──────────────────────────────────────┐
│ SAP Analytics Cloud Story/Dashboard   │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ agent-browser Discovery Layer         │
│ - accessibility snapshots             │
│ - annotated screenshots               │
│ - candidate semantic locators         │
│ - candidate component inventory       │
│ - console/network/HAR clues           │
│ - screenshot diffs                    │
└──────────────────┬───────────────────┘
                   │ human review
                   ▼
┌──────────────────────────────────────┐
│ Dashboard Profile                     │
│ - YAML/JSON metadata                  │
│ - story URL/bookmark                  │
│ - pages/tabs                          │
│ - widgets/components                  │
│ - roles/permissions                   │
│ - data baselines                      │
│ - visual baselines                    │
│ - planning/reset policy               │
│ - known tenant/story restrictions     │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Playwright Execution Layer            │
│ - deterministic tests                 │
│ - reusable adapters                   │
│ - fixtures                            │
│ - stable assertions                   │
│ - traces/videos/screenshots           │
│ - CI reports                          │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ SAC QA Evidence Package               │
│ - HTML report                         │
│ - trace.zip                           │
│ - video.webm                          │
│ - before/after screenshots            │
│ - visual diff overlays                │
│ - widget bounding boxes               │
│ - expected vs actual values           │
│ - root-cause classification           │
└──────────────────────────────────────┘
```

---

## 5. What Can Be Tested Reliably

| SAC area | Reliability with Playwright | Reliability with agent-browser | Recommended method | Main risks |
|---|---:|---:|---|---|
| **Login** | Medium | Medium | Playwright authenticated `storageState`; manual/controlled auth setup | SSO redirects, MFA, expiring sessions, IdP UI changes |
| **Story/page load** | High for smoke; medium for deep readiness | Medium | Wait for story title, page marker, critical widgets, no SAC error text, stable visual/network state | Shell loads before widgets finish querying |
| **Tabs/pages** | High when labels are stable | High for discovery | `TabAdapter` using role/text locators and page-ready markers | Overflow tabs, duplicate labels, hidden role-based pages |
| **Filters** | Medium-high | Medium-high | `FilterAdapter`; select by visible label and assert downstream effect | Popup dialogs, virtualized member lists, localization |
| **Input controls** | Medium-high | Medium | Select by visible label/text; assert selected state and dependent widgets | Long member lists, search latency, multi-select state ambiguity |
| **Prompts / variables** | Medium | Medium | Prompt-dialog handler with explicit expected values and downstream assertions | Prompt appears only on first load, persisted prompt state |
| **Custom buttons** | High if labeled | Medium-high | Locate by button text/tooltip; assert visible result, diagnostic status, download, or data change | Script completion may not have visible signal |
| **Tables** | Medium-high for visible/scrollable cells | Medium | `TableAdapter`; map headers, scroll rows, parse numbers, compare tolerances | Virtualization, hidden rows, totals, formatting |
| **Charts** | Medium for visual; low-medium for raw data | Medium | Visual baseline plus companion table/KPI data assertions | Canvas/SVG rendering, animations, coordinates, data drift |
| **Linked analysis** | Medium | Medium | Trigger source selection; assert downstream filter/table/KPI changes | Chart-point selection may require coordinates |
| **Drilldowns** | Medium | Medium | Prefer table hierarchy expanders over chart coordinates; assert expanded rows/breadcrumbs | Virtual rows, changing hierarchies, persisted state |
| **Bookmarks** | Medium-high | Medium | Dedicated QA bookmarks or URL states as scenario entry points | Personal/global bookmark differences, deleted/renamed bookmarks |
| **Exports** | Medium | Low-medium | Click export, wait for download, validate file type/name/size, optional parse | Export service latency, file generation timing |
| **Scripts** | Medium if effect is visible | Medium | Test through UI; add diagnostic/test-mode widget where possible | Internal script state is not externally stable |
| **Custom widgets** | High if owned; low-medium if third-party | Medium | Owned widgets expose ARIA/test hooks; third-party widgets use black-box visual/text checks | Shadow DOM, canvas, closed internals, external hosting |
| **Comments** | Medium but side-effecting | Medium | Isolated story/page/widget, unique run ID, cleanup, serial run | Persistent state, notifications, author/time changes |
| **Planning data entry** | Medium in controlled QA model | Low-medium | Dedicated model/version/user; private-per-run version; reset scripts | Locks, validation rules, unbooked cells, concurrency |
| **Data actions** | Medium in QA only | Low-medium | Trigger action, assert completion and expected model/table result | Long runtime, partial failure, destructive behavior |
| **Multi actions** | Medium-low | Low | Nightly/weekend integration tests only | Multiple side effects and dependencies |
| **Private/public versions** | Medium | Low-medium | Explicit version strategy: private-per-run, public-test-reset, or read-only | Publish conflicts, temporary private versions, sharing |
| **Permissions** | High if test users are stable | Medium | Auth state per role; assert allowed/denied UI and data | Role drift, teams, inherited privileges, data access control |
| **Role-based views** | High for visibility; medium for data | Medium | Per-role profile expectations, screenshots, and data checks | Same story can render different object sets by role |

---

## 6. What Is Difficult or Fragile

| Fragility | Why it breaks | Mitigation |
|---|---|---|
| **SSO / MFA** | External IdP pages and MFA flows are intentionally hostile to automation. | Use pre-authenticated storage state, dedicated test users, IdP test policy, or manual refresh. Do not make MFA automation a release dependency. |
| **Dynamic DOM IDs** | SAC and underlying UI frameworks can generate unstable element IDs. | Prefer visible labels, ARIA roles, text, component metadata, and adapter abstractions. |
| **SAP UI internals** | Internal framework classes and DOM hierarchy are not a stable QA contract. | Avoid private CSS classes and generated IDs except as reviewed fallback. |
| **Iframes** | SAC shell, embedded content, or exports may require frame context. | Use Playwright `frameLocator` and store frame metadata in profile. |
| **Shadow DOM** | Custom widgets may hide internals. | For owned widgets, expose stable public hooks; otherwise use black-box checks. |
| **Virtualized tables** | Rows/cells may not exist in DOM until scrolled. | Implement row search, scroll logic, visible-window assertions, and export fallback. |
| **Async backend queries** | Widgets update after shell load and after each interaction. | Use widget-specific readiness: expected text/value, spinner disappearance, retrying assertions, network summaries. |
| **Canvas/SVG charts** | Data points may not be accessible as DOM text. | Use companion tables/KPIs for data; use screenshot baselines for rendering. |
| **Live connections** | Source data and query latency change independently. | Separate availability smoke from deterministic seeded-data tests. |
| **Changing data** | Expected values drift as business data changes. | Use seeded import models, snapshot dates, tolerances, and baseline approval. |
| **Localization** | Labels, dates, decimals, currency, and month names vary. | Fix locale/timezone in CI; externalize localized labels. |
| **Time zones** | Relative-date filters change by user/browser/tenant zone. | Use fixed timezone, static date scenarios, and explicit date-range assertions. |
| **Popup dialogs** | Filter, prompt, warning, export, and planning dialogs overlay targets. | Centralize dialog detection and blocking-overlay handling. |
| **Comment side effects** | Comments persist and may notify users. | Isolated story, unique run IDs, cleanup, serial execution. |
| **Planning writebacks** | Tests mutate model state. | Dedicated model/version/user, reset before/after, no parallel execution. |
| **Data locks** | Cells may appear editable but fail on commit/publish. | Add negative tests and assert error messages. |
| **Validation rules** | Invalid dimension combinations are rejected. | Maintain validation fixture matrix for allowed and blocked combinations. |
| **Tenant-specific restrictions** | Features vary by tenant, release, configuration, and optimized-story restrictions. | Add a tenant/story capability check and skip unsupported tests explicitly. |

---

## 7. Where Playwright Is Better

Use Playwright as the deterministic execution engine for:

- CI execution.
- Reviewed TypeScript test code.
- Test fixtures.
- Authentication state reuse.
- Smoke tests.
- Navigation tests.
- Filters and input controls.
- Prompts.
- Custom buttons.
- Tables.
- Exports.
- Visual regression.
- Role/permission tests.
- Controlled planning tests.
- Trace/video/screenshot evidence.
- Network and console capture.
- HTML/JUnit/JSON reporting.
- Stable test code and pull-request review.

### Recommended Playwright uses by test category

| Test category | Playwright suitability | Notes |
|---|---:|---|
| Smoke | High | Good CI gate. |
| Navigation | High | Strong when tab labels and page-ready text are stable. |
| Filters/input controls | Medium-high | Good when post-filter data assertions exist. |
| Tables | Medium-high | Requires virtualization-aware adapter. |
| Charts | Medium | Best for screenshots plus companion data assertions. |
| Comments | Medium | Run isolated and serial. |
| Planning | Medium | Only in QA with reset/version policy. |
| Permissions | High | Requires separate users/auth states. |
| Performance readiness | Medium-high | Good for thresholds and artifacts, not for uncontrolled load testing. |
| Data actions/multi actions | Medium-low | Run controlled, serialized, and QA-only. |

---

## 8. Where agent-browser Is Better

Use `agent-browser` as an AI-assisted discovery and debugging tool for:

- Exploratory crawling of unfamiliar SAC stories.
- Accessibility-tree snapshots.
- Candidate semantic locators.
- Candidate component maps.
- Annotated screenshots with element references.
- Screenshot comparison during investigation.
- Console and page-error inspection.
- Network/HAR inspection.
- Drafting first-pass scenario ideas.
- Debugging failed Playwright runs interactively.
- Generating candidate YAML profiles for review.

### Do not use agent-browser alone for

- Release-blocking regression gates.
- Financial correctness assertions.
- Planning publish flows.
- Public version writebacks.
- Destructive data actions.
- Permission sign-off.
- Baseline approval.
- Deciding whether data drift is acceptable.

---

## 9. Hybrid Operating Model

### 9.1 Recommended flow

```text
1. Human selects dashboard and scope.
2. agent-browser crawls read-only story state.
3. AI proposes component inventory and candidate scenarios.
4. QA and dashboard owner review/approve profile.
5. Playwright adapters execute deterministic tests.
6. CI produces failure artifacts.
7. AI may assist triage, but humans approve baseline/data changes.
```

### 9.2 Control boundaries

| Activity | agent-browser / AI | Playwright | Human |
|---|---:|---:|---:|
| Discover pages/tabs/widgets | Primary | Secondary | Review |
| Generate candidate locators | Primary | Secondary | Approve |
| Execute CI regression | No | Primary | Monitor |
| Validate expected business values | No | Execute assertion | Define/approve |
| Update visual baselines | Suggest | Generate diff | Approve |
| Planning writeback | No autonomous execution | Controlled execution | Approve/setup |
| Permission sign-off | Suggest gaps | Execute checks | Own matrix |
| Failure summary | Assist | Collect artifacts | Confirm root cause |

---

## 10. Autonomy Model

| Task | Autonomy level | Examples | Approval needed |
|---|---:|---|---|
| **Run existing deterministic tests** | Fully autonomous | Execute Playwright suite, collect artifacts, generate reports | No, if read-only or pre-approved |
| **Read-only discovery** | Mostly autonomous | agent-browser crawl, snapshots, screenshots, console/network collection | Usually no, if within allowed domains |
| **Candidate profile generation** | AI-assisted | Draft tabs/components/selectors/scenarios | Yes |
| **Selector proposals** | AI-assisted | Candidate Playwright locators from visible labels and snapshots | Yes |
| **Baseline proposal** | AI-assisted | Suggest screenshot/data baseline files | Yes |
| **Failure summary** | AI-assisted | Summarize trace/network/visual diff evidence | Human confirms |
| **Credentials and MFA** | Human setup | Test users, auth state, SSO policy | Always |
| **Planning writeback** | Human-approved automation | Private version input, data action, publish/revert | Always for public/destructive changes |
| **Business expected values** | Human-owned | KPI/table expected values and tolerances | Always |
| **Production destructive changes** | Not autonomous | Public version publish, production comments, destructive data actions | Do not automate without formal approval |

---

## 11. Making SAC Dashboards More Testable

| Practice | Priority | Implementation |
|---|---:|---|
| **Stable widget names** | Required | Rename widgets in SAC outline from generic names like `Button_1` or `Table_1` to meaningful names such as `BTN_APPLY_FILTERS`, `TBL_REVENUE_BY_REGION`, `CH_GM_TREND`. |
| **Consistent visible labels** | Required | Buttons, filters, input controls, tabs, prompts, and export actions need stable user-facing text. |
| **Unique tab/page names** | Required | Avoid duplicate tab labels; use deterministic page-ready markers. |
| **Bookmarks or URL states** | Recommended | Create QA bookmarks such as `QA_BASELINE`, `QA_EMEA_FILTERED`, `QA_PLANNING_PRIVATE`. |
| **Non-production test stories** | Required for writes | Use cloned QA stories for comments, planning, data actions, and multi actions. |
| **Dedicated test users and roles** | Required | Minimum: `qa_viewer`, `qa_planner`, `qa_admin`, `qa_restricted_region`, `qa_no_export`. |
| **Seeded planning models/reset scripts** | Required for planning | Use private-per-run versions first; public test versions only with reset and approval. |
| **Diagnostic/test-mode widgets** | Strongly recommended | Add optional text/status widgets showing selected filters, selected version, last script action, and last data-action status. |
| **Component metadata outside SAC** | Required at scale | Store dashboard profiles in Git as YAML/JSON. |
| **Custom widget test hooks** | Required for owned widgets | Add stable ARIA labels, visible status, deterministic events, and test-mode outputs. |
| **Stable viewport/locale/timezone** | Required | Fix browser viewport, locale, and timezone in Playwright config. |
| **Companion data tables for charts** | Recommended | For business-critical charts, expose chart data in a table/KPI or test-mode widget. |

---

## 12. Reuse Strategy for Many Dashboards

### 12.1 Profile-driven design

Every dashboard gets a profile file:

```text
profiles/
  finance-executive/
    dashboard.yaml
    scenarios/
      smoke.yaml
      filters.yaml
      data.yaml
      visual.yaml
      planning.yaml
      permissions.yaml
    expected-data/
      revenue-by-region.csv
      planning-after-input.csv
    baselines/
      chromium-linux/
        overview.full.png
        gross-margin-chart.png
```

The profile is the contract between:

- SAC story owners.
- QA automation.
- Business data owners.
- CI.
- Playwright adapters.
- AI discovery tooling.

### 12.2 Component registry

Use reusable adapters:

```text
ButtonAdapter
TableAdapter
ChartAdapter
TabAdapter
FilterAdapter
PromptAdapter
PlanningTableAdapter
CommentAdapter
CustomWidgetAdapter
ExportAdapter
BookmarkAdapter
```

Test scenarios should not directly use selectors. They should call adapters through component IDs.

### 12.3 Scenario templates

Reusable templates should cover:

- Smoke.
- Navigation.
- Filters/input controls.
- Prompts.
- Linked analysis.
- Drilldowns.
- Table data.
- Chart visual.
- Exports.
- Comments.
- Planning private version.
- Planning public version.
- Data action.
- Multi action.
- Permissions.
- Negative/error handling.
- Performance/readiness.

### 12.4 Discovery process

For each new story:

1. Open with `agent-browser`.
2. Capture accessibility snapshot.
3. Capture annotated screenshots.
4. Capture console/page errors.
5. Capture network/HAR if relevant.
6. Generate proposed profile.
7. Human reviews profile.
8. Playwright tests are generated or manually authored.
9. Baselines and expected values are approved.
10. CI executes deterministic tests.

---

## 13. Proposed Folder Structure

```text
sac-automation/
  package.json
  playwright.config.ts
  tsconfig.json
  README.md

  .github/
    workflows/
      sac-playwright.yml

  profiles/
    finance-executive/
      dashboard.yaml
      scenarios/
        smoke.yaml
        navigation.yaml
        filters.yaml
        data.yaml
        visual.yaml
        planning.yaml
        comments.yaml
        permissions.yaml
      expected-data/
        revenue-by-region.csv
        gross-margin-trend.csv
        planning-after-input.csv
      baselines/
        chromium-linux/
          overview.full.png
          detail.full.png
          gross-margin-chart.png
      discovery/
        snapshots/
        screenshots/
        network.har
        console.json
        proposed-profile.yaml
        review-notes.md

    sales-operations/
      dashboard.yaml
      scenarios/
      expected-data/
      baselines/

  src/
    adapters/
      BaseAdapter.ts
      ButtonAdapter.ts
      TableAdapter.ts
      ChartAdapter.ts
      TabAdapter.ts
      FilterAdapter.ts
      PromptAdapter.ts
      PlanningTableAdapter.ts
      CommentAdapter.ts
      CustomWidgetAdapter.ts
      ExportAdapter.ts
      BookmarkAdapter.ts

    fixtures/
      auth.fixture.ts
      sacProfile.fixture.ts
      story.fixture.ts
      planning.fixture.ts
      reporting.fixture.ts
      permissions.fixture.ts

    discovery/
      agentBrowserRunner.ts
      parseAccessibilitySnapshot.ts
      proposeComponentMap.ts
      compareDiscoveryToProfile.ts
      generateProfileDraft.ts

    assertions/
      tableAssertions.ts
      chartAssertions.ts
      visualAssertions.ts
      planningAssertions.ts
      permissionAssertions.ts
      performanceAssertions.ts
      exportAssertions.ts

    reporting/
      SacHtmlReporter.ts
      failureClassifier.ts
      annotateScreenshot.ts
      widgetBoundingBoxes.ts
      networkSummary.ts
      failurePacket.ts

    utils/
      selectors.ts
      waits.ts
      numbers.ts
      dates.ts
      downloads.ts
      cleanup.ts
      locks.ts
      sacErrors.ts
      localization.ts

  tests/
    generated/
      smoke.spec.ts
      navigation.spec.ts
      filters.spec.ts
      data.spec.ts
      visual.spec.ts
      planning.spec.ts
      comments.spec.ts
      permissions.spec.ts
      performance.spec.ts
    manual/
      exploratory.spec.ts

  scripts/
    auth.setup.ts
    discover-story.ts
    generate-tests.ts
    reset-planning-model.ts
    update-baselines-reviewed.ts
    lint-profiles.ts
    classify-failures.ts

  artifacts/
    latest/
    history/

  docs/
    onboarding-new-dashboard.md
    selector-policy.md
    planning-test-policy.md
    baseline-approval-policy.md
    failure-triage-runbook.md
    sac-testability-guidelines.md
```

---

## 14. Example Dashboard Profile Schema

```yaml
schemaVersion: 1

dashboard:
  id: finance-executive-v1
  name: Finance Executive Dashboard
  owner: fpna-analytics
  riskClass: business-critical-readonly
  sac:
    tenantBaseUrl: "${SAC_BASE_URL}"
    storyId: "${FINANCE_EXEC_STORY_ID}"
    openMode: view
    defaultBookmark: QA_BASELINE
    optimizedStory: true

execution:
  browserProject: chromium-linux
  viewport:
    width: 1440
    height: 1000
  locale: en-US
  timezoneId: UTC
  authStates:
    viewer: playwright/.auth/qa-viewer.json
    planner: playwright/.auth/qa-planner.json
    admin: playwright/.auth/qa-admin.json
    restricted: playwright/.auth/qa-restricted-region.json
  defaultTimeoutMs: 120000
  workersPolicy: serial-for-this-dashboard

readiness:
  storyShell:
    requiredTexts:
      - Finance Executive Dashboard
      - Gross Margin
      - Revenue
    forbiddenTexts:
      - "An error occurred"
      - "Could not load"
      - "You do not have permission"
    loadingIndicators:
      - "text=Loading"
      - "[aria-label*='Busy']"
    networkQuietMs: 2000
  widgets:
    - componentId: kpi.revenue
    - componentId: tbl.revenueByRegion
    - componentId: chart.grossMarginTrend

pages:
  - id: page.overview
    title: Overview
    type: Tab
    locator:
      role:
        role: tab
        name: Overview
    pageReadyText: Gross Margin

  - id: page.detail
    title: Regional Detail
    type: Tab
    locator:
      role:
        role: tab
        name: Regional Detail
    pageReadyText: Revenue by Region

  - id: page.planning
    title: Planning
    type: Tab
    locator:
      role:
        role: tab
        name: Planning
    pageReadyText: Planning Version

components:
  - id: btn.applyFilters
    type: Button
    widgetName: BTN_APPLY_FILTERS
    page: page.overview
    visibleLabel: Apply Filters
    criticality: high
    locator:
      role:
        role: button
        name: Apply Filters
      textFallback: Apply Filters
      cssFallbackReviewed: false
    actions:
      click:
        waitFor:
          - type: text
            value: Filters Applied
          - type: componentStable
            component: tbl.revenueByRegion

  - id: filter.region
    type: Filter
    widgetName: IC_REGION
    page: page.overview
    visibleLabel: Region
    criticality: high
    locator:
      label: Region
      role:
        role: combobox
        name: Region
    options:
      multiSelect: true
      searchSupported: true
      values:
        emea:
          displayText: EMEA
          memberId: REGION_EMEA
        amer:
          displayText: Americas
          memberId: REGION_AMER
        apj:
          displayText: APJ
          memberId: REGION_APJ

  - id: kpi.revenue
    type: Kpi
    widgetName: KPI_TOTAL_REVENUE
    page: page.overview
    title: Revenue
    locator:
      nearText: Revenue
    numericParsing:
      locale: en-US
      scaleSuffixes: true
      currencySymbols: true
    tolerances:
      absolute: 1
      relative: 0.001

  - id: tbl.revenueByRegion
    type: Table
    widgetName: TBL_REVENUE_BY_REGION
    page: page.detail
    title: Revenue by Region
    criticality: high
    locator:
      nearText: Revenue by Region
      cssFallbackReviewed: false
    table:
      keyColumns:
        - Region
      valueColumns:
        - Revenue
        - Gross Margin %
      virtualization: true
      scrollStrategy: search-row-label
      numericParsing:
        locale: en-US
        scaleSuffixes: true
        percentSymbols: true
      tolerances:
        Revenue:
          absolute: 1
          relative: 0.001
        "Gross Margin %":
          absolute: 0.1
      expectedData: profiles/finance-executive/expected-data/revenue-by-region.csv

  - id: chart.grossMarginTrend
    type: Chart
    widgetName: CH_GROSS_MARGIN_TREND
    page: page.overview
    title: Gross Margin Trend
    criticality: medium
    locator:
      nearText: Gross Margin Trend
    screenshot:
      region: widget
      baseline: profiles/finance-executive/baselines/chromium-linux/gross-margin-chart.png
      maxDiffPixelRatio: 0.005
      masks:
        - selector: "[data-qa='last-refresh-time']"
          reason: volatile timestamp
    dataAssertionSource:
      componentId: tbl.grossMarginTrendData

  - id: export.pdf
    type: Export
    widgetName: BTN_EXPORT_PDF
    page: page.overview
    visibleLabel: Export PDF
    locator:
      role:
        role: button
        name: Export PDF
    expectedDownload:
      fileExtension: pdf
      minBytes: 10000
      filenameContains:
        - Finance
        - Executive

  - id: comment.overview
    type: Comment
    page: page.overview
    scope: page
    testPolicy:
      isolatedStoryRequired: true
      cleanup: best-effort
      uniquePrefix: "QA_AUTOMATION_${RUN_ID}"
      serialOnly: true

  - id: planning.tbl.input
    type: PlanningTable
    widgetName: TBL_PLAN_INPUT
    page: page.planning
    title: Planning Input
    locator:
      nearText: Planning Input
    planning:
      editable: true
      versionSelector: planning.versionSelector
      allowedInputTypes:
        - number
      testCells:
        revenueJan:
          row:
            Account: Revenue
            CostCenter: CC100
            Month: Jan
          column: Plan

planning:
  enabled: true
  model: QA_FINANCE_PLAN
  defaultVersionStrategy: private-per-run
  publicTestVersion: QA_PUBLIC_AUTOMATION
  reset:
    required: true
    command: "npm run reset:planning -- --profile finance-executive"
  publishPolicy:
    allowed: false
    requiresManualApproval: true

permissions:
  expectedByRole:
    viewer:
      visible:
        - page.overview
        - page.detail
        - chart.grossMarginTrend
        - tbl.revenueByRegion
      hidden:
        - page.planning
        - planning.tbl.input
    planner:
      visible:
        - page.overview
        - page.detail
        - page.planning
        - planning.tbl.input
      hidden: []
    restricted:
      visible:
        - page.overview
        - page.detail
      dataFilters:
        Region: EMEA

knownRisks:
  - id: live-connection-latency
    category: performance
    mitigation: extended widget readiness timeout
  - id: chart-visual-noise
    category: visual-regression
    mitigation: screenshot tolerance and timestamp masks
  - id: planning-locks
    category: planning-conflict
    mitigation: serial execution and private-per-run version
```

---

## 15. Example Test Scenario Schema

```yaml
schemaVersion: 1

scenario:
  id: finance-filter-emea-revenue
  title: Filter dashboard to EMEA and validate revenue table
  profile: profiles/finance-executive/dashboard.yaml
  tags:
    - smoke
    - filters
    - data
    - readonly
  riskLevel: medium
  role: viewer

preconditions:
  bookmark: QA_BASELINE
  page: page.overview
  dataSnapshot: FY2026_Q1_QA_SEED
  noPlanningWriteback: true

steps:
  - id: open-story
    action: openStory
    waitFor: storyReady

  - id: select-region
    component: filter.region
    action: selectValues
    args:
      values:
        - emea
      mode: replace
    waitFor:
      - type: componentStable
        component: tbl.revenueByRegion

  - id: navigate-detail
    component: page.detail
    action: openTab
    waitFor:
      - type: text
        value: Revenue by Region

assertions:
  - id: filter-chip-visible
    type: visibleText
    value: EMEA

  - id: table-revenue-emea
    type: tableCell
    component: tbl.revenueByRegion
    row:
      Region: EMEA
    column: Revenue
    expected: 12500000
    tolerance:
      absolute: 1
      relative: 0.001

  - id: chart-region-stable
    type: screenshot
    component: chart.grossMarginTrend
    baseline: gross-margin-chart-emea.png
    maxDiffPixelRatio: 0.005

cleanup:
  - action: resetFilters
    components:
      - filter.region

failureClassificationHints:
  selector:
    - filter.region not found
    - page.detail not found
  dataDrift:
    - table value differs but widget loaded successfully
  performance:
    - storyReady timeout
```

---

## 16. Example Planning Scenario Schema

```yaml
schemaVersion: 1

scenario:
  id: planning-private-version-input-and-revert
  title: Enter planning value in private version and revert
  profile: profiles/finance-executive/dashboard.yaml
  tags:
    - planning
    - writeback
    - nightly
  riskLevel: high
  role: planner
  serial: true

preconditions:
  storyCopy: QA_ONLY
  model: QA_FINANCE_PLAN
  versionStrategy: private-per-run
  resetCommand: "npm run reset:planning -- --profile finance-executive"
  approval:
    requiredForPublicPublish: true
    publicPublishAllowed: false

steps:
  - id: open-story
    action: openStory
    waitFor: storyReady

  - id: open-planning-page
    component: page.planning
    action: openTab
    waitFor:
      - type: text
        value: Planning Version

  - id: create-private-version
    component: planning.versionSelector
    action: createPrivateVersion
    args:
      baseVersion: QA_PUBLIC_AUTOMATION
      namePrefix: "PW_${RUN_ID}"

  - id: enter-plan-value
    component: planning.tbl.input
    action: enterCellValue
    args:
      row:
        Account: Revenue
        CostCenter: CC100
        Month: Jan
      column: Plan
      value: 1000

assertions:
  - id: planning-cell-updated
    type: planningCellValue
    component: planning.tbl.input
    row:
      Account: Revenue
      CostCenter: CC100
      Month: Jan
    column: Plan
    expected: 1000
    tolerance:
      absolute: 0

  - id: no-sac-error
    type: noSacErrorToast

cleanup:
  - action: revertPrivateVersion
  - action: deletePrivateVersion
    bestEffort: true
```

---

## 17. Adapter Design

### 17.1 Adapter interface

```ts
export type SacComponentType =
  | 'Button'
  | 'Table'
  | 'Chart'
  | 'Tab'
  | 'Filter'
  | 'Prompt'
  | 'PlanningTable'
  | 'Comment'
  | 'CustomWidget'
  | 'Export'
  | 'Bookmark';

export interface SacComponentAdapter<TProfile> {
  readonly type: SacComponentType;

  resolve(profile: TProfile): Promise<{
    locatorDescription: string;
    locator?: unknown;
    boundingBox?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;

  waitReady(options?: {
    timeoutMs?: number;
  }): Promise<void>;

  captureState(): Promise<Record<string, unknown>>;

  annotateFailure(error: Error): Promise<{
    screenshotPath?: string;
    boundingBox?: unknown;
    selectorRef?: string;
    visibleText?: string[];
  }>;
}
```

### 17.2 Adapter responsibilities

| Adapter | Responsibilities |
|---|---|
| `ButtonAdapter` | Locate by role/text/tooltip, click, assert enabled/disabled, wait for configured result. |
| `TableAdapter` | Map headers, scroll rows, parse numbers, compare tolerances, capture table screenshot. |
| `ChartAdapter` | Capture widget region, compare screenshot baseline, read labels/tooltips where possible. |
| `TabAdapter` | Navigate tabs/pages, handle overflow menus, assert page-ready marker. |
| `FilterAdapter` | Open popup, search/select members, assert chips/selected values, reset. |
| `PromptAdapter` | Detect prompt dialog, set values, apply/cancel, assert prompt state. |
| `PlanningTableAdapter` | Enter values, wait for commit, publish/revert if allowed, capture planning errors. |
| `CommentAdapter` | Add/find/delete/archive comments with run ID, prevent parallel execution. |
| `CustomWidgetAdapter` | Use owned-widget hooks where available; otherwise black-box text/visual check. |
| `ExportAdapter` | Start download, wait for file, validate name/type/size/content. |
| `BookmarkAdapter` | Open bookmark or URL state, assert resulting dashboard state. |

---

## 18. Test Design

| Test type | Purpose | Example | Recommended cadence | Gate? |
|---|---|---|---|---:|
| **Smoke tests** | Prove story opens and critical widgets render. | Open story, assert title, tabs, key widgets, no SAC error text. | PR, push, hourly/daily | Yes |
| **Navigation tests** | Validate pages, tabs, bookmarks, deep links. | Open Overview, Detail, Planning pages. | PR, nightly | Yes |
| **Visual regression tests** | Catch layout/chart/rendering changes. | Compare chart/widget/page screenshots. | Nightly, release branch | Review-gated |
| **Data correctness tests** | Validate business values. | Table/KPI values against seeded CSV. | Nightly, release branch | Yes |
| **Interaction tests** | Validate filters, input controls, prompts, linked analysis, drilldowns. | Select Region = EMEA, assert dependent table/KPI. | Nightly | Yes |
| **Script tests** | Validate SAC script effects through UI. | Click custom button, assert diagnostic status and data change. | Nightly | Yes |
| **Export tests** | Validate PDF/PPTX/CSV export behavior. | Click export, verify file created and sane. | Nightly | Usually |
| **Planning writeback tests** | Validate private-version input and controlled writeback. | Enter value, assert cell, revert version. | Nightly/controlled | Manual approval for destructive |
| **Data action tests** | Validate backend planning actions. | Run allocation action, assert model/table values. | Nightly/weekend | Manual approval if destructive |
| **Multi action tests** | Validate complex backend orchestration. | Run multi action and assert result chain. | Nightly/weekend | Manual approval |
| **Comment tests** | Validate collaboration and permissions. | Add comment with run ID, verify visible to second user. | Nightly isolated | No PR gate |
| **Permission tests** | Validate role-based UI/data. | Restricted user sees EMEA only; no publish button. | Nightly, security changes | Yes |
| **Performance/readiness tests** | Detect slow or broken story loads. | Time to shell, widgets, filter response, export duration. | Hourly/nightly | Alert/gate by policy |
| **Negative/error handling tests** | Validate blocked actions and error messages. | Locked planning cell, invalid value type, no export permission. | Nightly | Yes |

---

## 19. Baseline Management

### 19.1 Visual baseline example

```yaml
visualBaseline:
  component: chart.grossMarginTrend
  browserProject: chromium-linux
  viewport: 1440x1000
  locale: en-US
  timezoneId: UTC
  dataSnapshot: FY2026_Q1_QA_SEED
  maxDiffPixelRatio: 0.005
  masks:
    - lastRefreshTimestamp
    - userAvatar
    - notificationBell
  approval:
    approvedBy: fpna-dashboard-owner
    approvedAt: 2026-01-15
    reason: "Q1 layout refresh"
```

### 19.2 Data baseline example

```csv
Region,Revenue,Gross Margin %
EMEA,12500000,37.4
Americas,14800000,35.9
APJ,9100000,33.2
```

### 19.3 Tolerance example

```yaml
tolerances:
  currency:
    absolute: 1
    relative: 0.001
  percentage:
    absolute: 0.1
  count:
    absolute: 0
```

### 19.4 Baseline policy

| Baseline type | Owner | Approval |
|---|---|---|
| Visual baseline | Dashboard owner + QA | Pull request with before/after screenshots. |
| Data baseline | Business/data owner | Pull request with data snapshot reference. |
| Planning baseline | Planning model owner | Pull request plus reset proof. |
| Permission baseline | SAC/security admin | Pull request plus role matrix. |

---

## 20. Failure Visualization

Every failure should generate a reviewer-friendly packet.

### 20.1 Required artifacts

| Artifact | Required content |
|---|---|
| **HTML report** | Scenario, story, role, page, status, retry count, links to artifacts. |
| **Playwright trace** | Action timeline, DOM snapshots, network events, console logs. |
| **Video** | Retained on failure or retry. |
| **Screenshots** | Before action, after action, failure moment. |
| **Visual diff overlay** | Baseline, actual, diff, tolerance used. |
| **Widget bounding boxes** | Widget name, component ID, selector/ref, coordinates. |
| **Expected vs actual values** | Raw text, parsed value, expected value, tolerance. |
| **Console/network/SAC errors** | Failed requests, page errors, SAC toast/dialog messages. |
| **Root-cause classification** | Auth, selector, data drift, permission, performance, planning conflict, unsupported feature, visual regression, real dashboard bug. |

### 20.2 Failure packet example

```json
{
  "runId": "2026-01-15T02-14-22Z_8421",
  "scenarioId": "finance-filter-emea-revenue",
  "profile": "finance-executive-v1",
  "storyId": "FINANCE_EXEC_STORY_ID",
  "role": "viewer",
  "page": "Regional Detail",
  "component": {
    "id": "tbl.revenueByRegion",
    "type": "Table",
    "widgetName": "TBL_REVENUE_BY_REGION",
    "selectorRef": "role=table near text \"Revenue by Region\"",
    "boundingBox": {
      "x": 84,
      "y": 220,
      "width": 1180,
      "height": 520
    }
  },
  "assertion": {
    "type": "tableCell",
    "row": {
      "Region": "EMEA"
    },
    "column": "Revenue",
    "expected": 12500000,
    "actualRawText": "12.7M",
    "actualParsed": 12700000,
    "tolerance": {
      "absolute": 1,
      "relative": 0.001
    }
  },
  "classification": {
    "category": "data-drift",
    "confidence": 0.74,
    "reason": "Widget loaded and selector resolved; numeric value changed beyond tolerance."
  },
  "artifacts": {
    "htmlReport": "playwright-report/index.html",
    "trace": "test-results/.../trace.zip",
    "video": "test-results/.../video.webm",
    "beforeScreenshot": "artifacts/.../before.png",
    "afterScreenshot": "artifacts/.../after.png",
    "diffOverlay": "artifacts/.../diff.png",
    "networkSummary": "artifacts/.../network.json"
  }
}
```

### 20.3 Root-cause categories

| Category | Strong signals | Typical owner |
|---|---|---|
| `auth` | Login page, IdP redirect, 401/403, expired storage state. | QA/platform/security |
| `selector` | Component not found but page loaded. | QA automation + dashboard owner |
| `data-drift` | Widget loaded, value differs, no UI error. | Data owner |
| `permission` | Expected widget/action hidden or forbidden for one role. | SAC admin/security |
| `performance` | Timeouts, slow queries, pending network, no data by deadline. | SAC admin/backend owner |
| `planning-conflict` | Lock, publish conflict, validation error, version conflict. | Planning model owner |
| `sac-unsupported-feature` | Feature is blocked by optimized-story restriction or tenant limitation. | Dashboard owner/SAC admin |
| `visual-regression` | Pixel diff above tolerance, data still correct. | Dashboard owner/UX |
| `real-dashboard-bug` | User-visible bug reproduced and not explained by test/data/env drift. | Dashboard owner/dev team |

---

## 21. Recommended Playwright Configuration

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,

  expect: {
    timeout: 20_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005
    }
  },

  // SAC stories may share tenant state, model state, comments, planning versions,
  // and live backend capacity. Start conservative. Increase parallelism only
  // after proving isolation.
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['./src/reporting/SacHtmlReporter.ts']
  ],

  use: {
    baseURL: process.env.SAC_BASE_URL,
    viewport: { width: 1440, height: 1000 },
    locale: 'en-US',
    timezoneId: 'UTC',
    ignoreHTTPSErrors: false,
    actionTimeout: 30_000,
    navigationTimeout: 90_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium-linux',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

---

## 22. Recommended CI Setup

### 22.1 CI stages

```text
1. install
   - npm ci
   - npx playwright install --with-deps

2. lint-profiles
   - validate YAML schemas
   - validate destructive scenarios are tagged
   - validate CSS/XPath fallbacks are reviewed
   - validate expected data files exist

3. auth-check
   - verify storage state exists
   - open SAC landing page
   - fail fast if redirected to login unexpectedly

4. read-only-smoke
   - viewer role
   - no writes
   - no comments
   - safe against production or QA

5. nightly-regression
   - QA tenant
   - filters
   - navigation
   - visual
   - data
   - exports
   - permissions

6. controlled-writeback
   - QA only
   - comments
   - planning
   - data actions
   - multi actions
   - serial execution
   - reset before and after

7. publish-report
   - HTML report
   - JUnit
   - JSON
   - trace/video/screenshots
   - failure packets
```

### 22.2 GitHub Actions example

```yaml
name: SAC Playwright Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  schedule:
    - cron: "0 2 * * *"
  workflow_dispatch:
    inputs:
      profile:
        description: "Dashboard profile to run"
        required: false
        default: "finance-executive"

jobs:
  sac-tests:
    timeout-minutes: 90
    runs-on: ubuntu-latest

    env:
      CI: "true"
      SAC_BASE_URL: ${{ secrets.SAC_BASE_URL }}
      SAC_AUTH_STATE_VIEWER: ${{ secrets.SAC_AUTH_STATE_VIEWER }}

    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Lint dashboard profiles
        run: npm run lint:profiles

      - name: Run read-only smoke
        run: npm run test:smoke -- --profile=${{ github.event.inputs.profile || 'finance-executive' }}

      - name: Run nightly regression
        if: github.event_name == 'schedule'
        run: npm run test:nightly

      - name: Upload Playwright report
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v5
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test artifacts
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v5
        with:
          name: sac-test-results
          path: |
            test-results/
            artifacts/
          retention-days: 30
```

### 22.3 CI policy

| Test pack | Environment | Trigger | Parallelism | Gate |
|---|---|---|---:|---:|
| `smoke-readonly` | Production or QA | PR, push, schedule | 1-2 | Yes |
| `navigation` | QA | PR, nightly | 1-2 | Yes |
| `filters` | QA | Nightly | 1-2 | Yes |
| `visual` | QA | Nightly, release branch | 1 | Review |
| `data` | QA seeded | Nightly, release branch | 1 | Yes |
| `permissions` | QA with role users | Nightly, security changes | 1 | Yes |
| `comments` | QA isolated | Nightly | 1 serial | No PR gate |
| `planning` | QA planning model | Nightly/controlled | 1 serial | Approval required |
| `data-actions` | QA planning model | Nightly/weekend | 1 serial | Approval required |
| `production-smoke` | Production | Hourly/daily | 1 | Alert or gate by policy |

---

## 23. agent-browser Discovery Workflow

### 23.1 Discovery commands

```bash
agent-browser open "$SAC_STORY_URL"

agent-browser snapshot > profiles/finance-executive/discovery/snapshots/overview.txt

agent-browser screenshot \
  --annotate \
  --screenshot-dir profiles/finance-executive/discovery/screenshots

agent-browser console --json \
  > profiles/finance-executive/discovery/console.json

agent-browser errors \
  > profiles/finance-executive/discovery/page-errors.txt

agent-browser network har start

# Perform manual or reviewed AI-assisted exploration:
# - open tabs
# - select filters
# - open prompts
# - inspect tables/charts
# - test buttons in read-only mode only

agent-browser network har stop \
  profiles/finance-executive/discovery/network.har
```

### 23.2 Discovery output

```text
profiles/finance-executive/discovery/
  snapshots/
    overview.txt
    detail.txt
    planning.txt
  screenshots/
    overview-annotated.png
    detail-annotated.png
    planning-annotated.png
  proposed-profile.yaml
  proposed-scenarios.yaml
  console.json
  page-errors.txt
  network.har
  review-notes.md
```

### 23.3 Human review checklist

- Confirm story ID.
- Confirm tenant/environment.
- Confirm whether story is optimized.
- Confirm every page/tab.
- Confirm business-critical widgets.
- Replace AI guesses with official SAC widget names where possible.
- Mark each component as `critical`, `supporting`, or `ignore`.
- Approve or reject candidate selectors.
- Define expected values and tolerances.
- Define visual baseline stability.
- Define role expectations.
- Define planning reset strategy.
- Define whether comments/writebacks are allowed.
- Define unsupported/restricted SAC features for this story.

---

## 24. Handling Specific SAC Areas

### 24.1 Login, SSO, and MFA

Recommended path:

1. Use dedicated SAC test users.
2. Authenticate once using a secure setup flow.
3. Store Playwright `storageState` securely.
4. Run CI using stored auth state.
5. Refresh state on schedule or when auth-check fails.
6. Do not put passwords or session files in Git.

Tradeoffs:

| Option | Pros | Cons |
|---|---|---|
| Automate full SSO login | End-to-end auth coverage | Brittle, MFA-hostile, IdP UI changes break tests |
| Use storage state | Stable and CI-friendly | Needs refresh and secure secret handling |
| Use test IdP policy | Best for CI | Requires security/admin approval |
| Manual auth refresh | Simple | Operational overhead |

### 24.2 Tables

Recommended path:

- Locate table by nearby title or profile metadata.
- Wait for table to stop loading.
- Extract headers.
- Scroll/search rows if virtualized.
- Parse values with locale-aware number parser.
- Compare by row key and column name.
- Use tolerances for rounded/scaled values.
- Capture table screenshot on failure.

Avoid:

- Hard-coded row indexes.
- Generated DOM IDs.
- Exact string comparison for formatted currency unless intentionally required.

### 24.3 Charts

Recommended path:

- Use chart visual baselines for layout/rendering.
- Use companion tables/KPIs for business values.
- Mask volatile timestamps or user-specific UI.
- Fix viewport, locale, timezone, and data snapshot.

Avoid:

- Fragile coordinate clicks unless there is no alternative.
- Asserting every chart pixel on live production data.
- Relying on private SVG/canvas internals.

### 24.4 Filters and input controls

Recommended path:

- Select by visible label.
- Use search inside member dialogs for long lists.
- Assert selected chip/value.
- Assert downstream table/KPI/chart effect.
- Reset after test.

Avoid:

- Testing only that the popup clicked successfully.
- Assuming member order is stable.
- Relying on localized text without profile support.

### 24.5 Prompts

Recommended path:

- Detect prompt dialog explicitly.
- Set required variables.
- Apply.
- Assert downstream state.
- Store prompt values in scenario YAML.

Risks:

- Prompt appears only on first load.
- Prompt state persists by user.
- Prompt values differ by role/model.

### 24.6 Scripts and custom buttons

Recommended path:

- Test scripts through user-visible actions.
- Add a diagnostic/test-mode widget if allowed.
- Assert visible result, status text, data change, or export/download.

Avoid:

- Trying to inspect arbitrary internal script state externally.
- Clicking a button without asserting its downstream effect.

### 24.7 Comments

Recommended path:

- Run only in QA or isolated story.
- Use unique run ID.
- Add comment to page/widget.
- Verify comment is visible.
- Optionally verify role/collaboration behavior.
- Cleanup best effort.
- Run serially.

Risks:

- Persistent state.
- Notification side effects.
- User/time metadata.
- Cleanup failures.
- Duplicate comments across retries.

### 24.8 Planning data entry

Recommended path:

- Use QA planning model.
- Use dedicated planner user.
- Prefer private-per-run version.
- Reset model/version before test.
- Enter numeric value.
- Assert cell value.
- Revert/delete private version.
- Do not publish unless manually approved.

Planning automation must be isolated and serial because it can be affected by permissions, public/private version behavior, data locks, validation rules, and data-entry restrictions.

### 24.9 Data actions and multi actions

Recommended path:

- QA-only.
- Explicit approval.
- Serial execution.
- Reset before and after.
- Assert completion message and expected table/model result.
- Capture duration and errors.

Avoid:

- Running in PR pipeline by default.
- Running against production.
- Publishing public versions without approval.

### 24.10 Permissions and role-based views

Recommended path:

- Separate auth state per role.
- Explicit role matrix in profile.
- Assert visible widgets.
- Assert hidden widgets.
- Assert allowed/denied actions.
- Assert restricted data values.
- Capture per-role screenshots.

Avoid:

- Assuming UI visibility alone proves data security.
- Sharing one user across all role tests.
- Running permission tests with admin user only.

---

## 25. Performance and Load-Readiness Tests

Use Playwright to measure readiness, not to perform uncontrolled tenant load testing.

Recommended metrics:

- Time to SAC shell.
- Time to story title.
- Time to critical widgets.
- Time after filter apply.
- Time to prompt completion.
- Time to export download.
- Time to planning commit.
- Failed network requests.
- Page errors.
- SAC error toasts/dialogs.

Example policy:

```yaml
performance:
  thresholds:
    storyShellMs: 30000
    criticalWidgetsMs: 90000
    filterApplyMs: 45000
    exportDownloadMs: 120000
    planningCommitMs: 60000
  capture:
    networkSummary: true
    consoleErrors: true
    pageErrors: true
```

Do not run high-concurrency load tests against SAC without SAP/customer approval.

---

## 26. Step-by-Step Implementation Guide

| Step | Goal | Done by user or AI | Inputs needed | Output artifact | Risks / edge cases | Recommended implementation path |
|---:|---|---|---|---|---|---|
| 1 | Inventory SAC dashboards. | User | Story list, owners, environments, criticality. | Dashboard inventory. | Unknown ownership, duplicate stories. | Start with 5-10 candidate stories and classify risk. |
| 2 | Select pilot story. | User | Stability, owner support, data source, complexity. | Pilot decision record. | Picking volatile planning story first. | Choose read-only story with tabs, filters, tables, and charts. |
| 3 | Define automation policy. | User | Security rules, tenant policy, IdP/MFA constraints. | `docs/automation-policy.md`. | Auth leakage, unauthorized access. | Approve allowed environments, users, storage-state handling. |
| 4 | Create test users and roles. | User | SAC admin access, role matrix. | Test users and role matrix. | MFA, password expiry, inherited permissions. | Create least-privilege users: viewer, planner, admin, restricted. |
| 5 | Prepare QA story copy. | User | SAC content transport/copy rights. | QA story folder and cloned story. | QA copy diverges from production. | Use production for read-only smoke; QA for writebacks/comments. |
| 6 | Stabilize widget names and labels. | User with QA guidance | SAC edit access, widget inventory. | Named widgets and stable labels. | Dashboard owners may resist changes. | Rename critical widgets and add stable visible labels. |
| 7 | Define business assertions. | User | KPI definitions, expected values, data snapshot. | Expected-data files. | Expected values may be disputed. | Start with 3-5 critical KPI/table assertions. |
| 8 | Define planning reset strategy. | User | Planning model owner, version policy. | Planning reset runbook. | Locks, validation rules, publish conflicts. | Prefer private-per-run version first. |
| 9 | Bootstrap Playwright project. | AI-assisted, human-reviewed | Node/TypeScript repo, CI platform. | Initial repo and config. | Bad timeouts, unstable viewport. | Use fixed Chromium, viewport, locale, timezone, trace/video on failure. |
| 10 | Configure auth setup. | User + automation | Credentials, IdP access. | Secure auth state files. | MFA/token expiry. | Run `auth.setup.ts`; store state securely; never commit secrets. |
| 11 | Run agent-browser discovery. | AI-assisted | Story URL, auth, allowed domains. | Snapshots, screenshots, candidate profile. | AI misses hidden tabs or mislabels controls. | Treat output as draft only. |
| 12 | Review component map. | User + QA | Discovery artifacts, SAC widget names. | Approved `dashboard.yaml`. | Duplicate labels and wrong selectors. | Require component ID, page, type, widget name, locator policy. |
| 13 | Implement core adapters. | AI-assisted, human-reviewed | Profile schema, pilot components. | Adapter classes. | Overfitting to pilot. | Keep adapters generic and profile-driven. |
| 14 | Build smoke tests. | AI-assisted | Profile, auth state. | `smoke.spec.ts`. | Shell loads before widgets. | Assert story title, tabs, critical widgets, no SAC error text. |
| 15 | Add navigation tests. | AI-assisted | Page list, ready markers. | `navigation.spec.ts`. | Overflow tabs, responsive layout. | Use `TabAdapter` and page-ready text. |
| 16 | Add filter tests. | AI-assisted, human-reviewed | Filter metadata, expected downstream effect. | `filters.spec.ts`. | Popup flakiness, virtual lists. | Select by label/search; assert filter chip and downstream values. |
| 17 | Add table data tests. | User + AI | Expected CSV, tolerances. | `data.spec.ts`. | Rounding, scale suffixes, hidden rows. | Compare by row key and column name. |
| 18 | Add chart visual tests. | User approval + automation | Stable chart state, baselines. | `visual.spec.ts` and images. | Data drift, timestamp, font/theme noise. | Widget-level screenshots with masks and tolerance. |
| 19 | Add linked-analysis/drill tests. | AI-assisted | Source/target widgets, expected effect. | `interaction.spec.ts`. | Coordinate clicks are brittle. | Prefer table or accessible selection over chart coordinates. |
| 20 | Add export tests. | AI-assisted | Export controls, expected file type. | `export.spec.ts`. | Download timing and service latency. | Verify file exists, type, size, filename, optional parse. |
| 21 | Add comment tests. | User approval + automation | Isolated story/page, comment permissions. | `comments.spec.ts`. | Persistent state, notifications. | Unique run ID, cleanup, serial nightly only. |
| 22 | Add planning tests. | User approval + automation | QA planning model, reset/version policy. | `planning.spec.ts`. | Data contamination, locks. | Private version input/revert first; public publish later only if approved. |
| 23 | Add data-action tests. | User approval + automation | QA action, expected result, reset. | `data-actions.spec.ts`. | Long runtime, partial failures. | Run nightly/weekend, serial, QA-only. |
| 24 | Add permission tests. | User + automation | Role matrix, auth states. | `permissions.spec.ts`. | Role drift, data access changes. | Assert both UI visibility and data restrictions. |
| 25 | Build failure reporter. | AI-assisted, human-reviewed | Test metadata, artifacts. | SAC HTML report and failure packet. | Misclassification. | Use deterministic classifier first; AI summary is advisory. |
| 26 | Configure CI gates. | User + QA | CI secrets, branch policy. | CI workflow. | Expired auth, slow tenant. | PR gate on read-only smoke; nightly for full regression. |
| 27 | Establish baseline approval. | User | Dashboard/data owners. | Baseline approval policy. | Accepting defects as baseline. | Baseline updates require PR, screenshots, reason, owner approval. |
| 28 | Run pilot burn-in. | Automation + QA | CI schedule. | Stability report. | Flakiness hidden by retries. | Require 5 consecutive stable runs before scaling. |
| 29 | Onboard second dashboard. | AI-assisted, human-reviewed | Discovery workflow, profile template. | Second dashboard profile. | Schema gaps. | Reuse adapters; generalize only proven needs. |
| 30 | Scale portfolio. | User + QA + AI | Dashboard backlog. | Multi-dashboard suite. | Test noise and ownership gaps. | Add dashboard quality metrics and failure ownership. |

---

## 27. Phased Rollout

| Phase | Scope | Duration | Exit criteria |
|---|---|---:|---|
| **0. Governance and readiness** | Tenant, test users, auth policy, repo, CI skeleton. | 1-2 weeks | One SAC story opens in CI with trace/report. |
| **1. Pilot smoke** | One low-risk or QA story. | 1-2 weeks | Login, open story, assert title/tabs/widgets. |
| **2. Pilot interactions** | Filters, tabs, input controls, prompts. | 2-3 weeks | 5-10 deterministic scenarios pass for 5 consecutive runs. |
| **3. Visual/data baselines** | Chart screenshots and table/KPI expected values. | 2-3 weeks | Baseline approval workflow exists. |
| **4. Planning/comment isolation** | Private versions, planning input, comments, export. | 2-4 weeks | Reset/cleanup proven; tests do not contaminate next run. |
| **5. Permission matrix** | Multiple users/roles and data restrictions. | 2-3 weeks | Role-based visibility and data checks stable. |
| **6. Portfolio scale** | 5-10 stories using profile/discovery process. | 4-8 weeks | New read-only smoke onboarding under 1-2 days. |
| **7. Operating model** | Ownership, alerts, triage, baseline governance. | Ongoing | Failures routed by category and SLA. |

---

## 28. Pilot Success Criteria

The first pilot is successful only when:

- CI can open the SAC story without manual browser interaction.
- At least one secure stored auth state is used.
- The story opens from deterministic URL/bookmark/profile metadata.
- Smoke test validates:
  - story title,
  - at least two tabs/pages,
  - critical widgets,
  - absence of SAC error text.
- Interaction test validates:
  - at least one filter or input control,
  - one downstream data effect.
- Data test validates:
  - at least one KPI or table value.
- Visual test validates:
  - at least one stable widget screenshot.
- Permission test validates:
  - at least one role-specific visible/hidden expectation.
- Failure artifacts include:
  - HTML report,
  - screenshot,
  - trace on retry,
  - failure packet with story/page/component metadata.
- Suite passes for **five consecutive scheduled runs**, or all remaining failures are clearly classified as environment/data drift.

---

## 29. Portfolio Success Criteria

The framework is working at scale when:

- A new read-only dashboard can be onboarded to smoke coverage in under one day.
- A medium-complexity dashboard can be onboarded to filter/table/chart coverage in under one week.
- Planning/comment/writeback tests are isolated from production.
- Business owners approve data and visual baselines through pull requests.
- Failure packets route automatically to the right owner.
- Flaky tests are treated as automation defects.
- Production tests are read-only unless formally approved.
- AI-generated profiles and scenarios are always reviewed before execution as CI gates.

---

## 30. Final Practical Recommendation

Build the solution as:

```text
Dashboard YAML profile
+ Scenario YAML files
+ Reusable Playwright adapters
+ Playwright deterministic runner
+ Secure auth fixtures
+ Data/visual baselines
+ SAC-specific failure reporter
+ agent-browser discovery assistant
+ Human review and approval workflow
```

The most important success factor is not the browser tool. It is the **testability contract** with SAC story owners:

- Stable widget names.
- Stable visible labels.
- Deterministic test data.
- Dedicated test users.
- Controlled roles.
- Non-production writeback stories.
- Seeded planning models.
- Reset scripts.
- Approved business assertions.
- Reviewed visual/data baselines.

Without that contract, Playwright and agent-browser can still click through SAC screens, but the suite will become a fragile UI scraper. With that contract, the hybrid approach becomes a reusable SAC quality platform.
