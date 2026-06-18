# SAC Test Automation Intake

Source: Starter template from the `sap-sac-test-automation` skill. Fill this with approved project facts before creating CI-gated tests.

## Dashboard

- Profile ID: TODO(profile-id)
- Dashboard/story name: TODO(name)
- Owner: TODO(owner)
- SAC tenant class: TODO(public-demo | QA | production-read-only | planning-QA | permission-sensitive-QA | private-customer)
- Story URL or redacted URL pattern: TODO(story-url)
- Story ID redacted or variable name: TODO(story-id-env-var)
- Open mode/bookmark: TODO(open-mode/bookmark)
- Optimized story: TODO(true | false | unknown)

## Allowed Tooling

- Manual observation: TODO(allowed | blocked | unknown)
- Firecrawl public research: TODO(allowed for public docs only | blocked | unknown)
- Chrome DevTools MCP with Chrome/Chrome for Testing: TODO(allowed | blocked | unknown)
- Microsoft Edge/CDP: TODO(allowed | blocked | unknown)
- Chrome DevTools MCP with Edge best-effort: TODO(allowed | blocked | unknown)
- Playwright: TODO(allowed | blocked | unknown)
- agent-browser: TODO(allowed | blocked | unknown)
- Enterprise browser lab: TODO(available | unavailable | unknown)

Recommended backend for first discovery: TODO(manual | chrome-devtools-mcp | edge-cdp | playwright | agent-browser | enterprise-browser-lab)
Recommended backend for regression: Playwright in controlled CI when available.

## Enterprise Constraints

- Operating system/shell: TODO(Windows PowerShell | macOS zsh | Linux shell | CI runner | managed virtual desktop)
- Public npm allowed: TODO(yes | no | unknown)
- Internal npm registry/package cache: TODO(required | available | none | unknown)
- Browser downloads allowed: TODO(yes | no | unknown)
- Proxy/custom CA required: TODO(yes | no | unknown)
- Edge `RemoteDebuggingAllowed`: TODO(enabled | disabled | unknown)
- Dedicated automation browser profile allowed: TODO(yes | no | unknown)
- Firecrawl/private content approval: default no; TODO(approval details if any)

## Auth and Roles

- Auth strategy: TODO(storageState | manual refresh | test IdP policy | enterprise browser lab)
- MFA automation dependency: default no
- Roles in scope:
  - viewer: TODO(user/source)
  - planner: TODO(user/source or out-of-scope)
  - admin: TODO(user/source or out-of-scope)
  - restricted: TODO(user/source or out-of-scope)
  - no-export: TODO(user/source or out-of-scope)
- Storage state location policy: TODO(local secret path; do not commit)

## Risk Scope

- Read-only smoke: TODO(in scope | out of scope)
- Filters/prompts/tabs: TODO(in scope | out of scope)
- Tables/KPIs/data assertions: TODO(in scope | out of scope)
- Visual baselines: TODO(in scope | out of scope)
- Comments: TODO(QA-only approved | out of scope)
- Planning writeback: TODO(QA-only approved | out of scope)
- Data actions/multi actions: TODO(QA-only approved | out of scope)
- Production automation: default read-only only

## Baseline Ownership

- Visual baseline owner: TODO(name/team)
- Data baseline owner: TODO(name/team)
- Permission baseline owner: TODO(name/team)
- Planning reset/publish owner: TODO(name/team or out-of-scope)
- Baseline approval workflow: TODO(PR approval, ticket, or other evidence)
- Volatile UI masks: TODO(timestamps, avatars, notifications, refresh markers)

## Initial Testability Contract

- Stable widget names available in SAC outline: TODO(yes | no | partial)
- Stable visible labels: TODO(yes | no | partial)
- Unique page/tab names: TODO(yes | no | partial)
- QA bookmark or URL state: TODO(yes | no)
- Seeded data or agreed snapshot: TODO(snapshot name/date)
- Diagnostic/test-mode widgets available: TODO(yes | no | planned)
- Fixed viewport/locale/timezone: default 1440x1000, en-US, UTC unless approved otherwise

## Open Risks and Questions

- TODO(risk/question)

## Approval Notes

- TODO(who approved which tenant/tool/data scope and when)
