---
name: sap-sac-scripting
description: |
  Comprehensive SAC scripting skill for SAP Analytics Cloud Analytics Designer and Optimized Story Experience. This skill should be used when the user asks to "create SAC script", "debug Analytics Designer", "optimize SAC performance", "planning operations in SAC", "filter data in SAC", "use DataSource API", "chart scripting", "table manipulation", "SAC event handlers", "version management", "data locking", "Optimized Story Experience API", "OSE scripting", "OSE widget API", "OSE DataSource", "story scripting API", "OSE planning API", "OSE method", "optimized story", "SAC story scripting", "story script", "SAC scripting", "debug SAC runtime in Microsoft Edge via CDP", or works with SAC widgets, planning models, or analytics applications.
license: GPL-3.0
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.3.2"
  last_verified: 2026-06-11
  sac_version: "Q2 2026 (2026.8)"
  api_reference_version: "2025.20 (OSE Q2 2026)"
  documentation_source: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
  reference_files: 66
  template_patterns: 56
  agents: 4
  commands: 4
  status: docs_audited_runtime_pending
  known_issues:
    - Live SAC story/runtime checks require tenant evidence before claiming production validation.
---

# SAP Analytics Cloud Scripting

## Related Skills

- **sap-dependency-security**: Use when securing dependency, SDK/tooling, and source-pinned SAC MCP upgrades used in story automation pipelines

## When to Use This Skill

Use this skill when writing or debugging SAC Analytics Designer scripts, Optimized Story Experience scripts, widget APIs, data-source filtering/selection logic, planning/version scripts, export/navigation handlers, performance-sensitive story logic, or SAC MCP-assisted automation.

Comprehensive skill for scripting in SAP Analytics Cloud (SAC) Analytics Designer and Optimized Story Experience.

For authenticated SAC browser runtime inspection in Microsoft Edge, load `references/edge-cdp-control.md`. Use it for local CDP console/runtime triage, widget-state checks, and approved screenshots; do not use CDP to bypass permissions or touch unrelated tabs.

## Getting Started

When the user invokes this skill with no specific task (e.g. "help with SAC scripting", "use SAC scripting skill", or no follow-up question), respond with this structured orientation:

> Welcome! I can help you with SAP Analytics Cloud scripting.
>
> First, which environment are you working in?
> 1. **Analytics Designer** — application-based scripting, full API
> 2. **Optimized Story Experience** — story-based scripting, OSE API (v2025.20)
>
> Then, what do you need help with?
> - Write a new script (filter, planning, navigation, export...)
> - Debug an existing script
> - Optimize performance
> - Find the right API method
> - Planning operations (version management, data locking...)

## Plugin Components

This plugin provides specialized tools for SAC development:

**Agents** (use via Task tool):
- `sac-script-debugger` - Debug script errors, trace issues
- `sac-performance-optimizer` - Analyze and fix performance bottlenecks
- `sac-planning-assistant` - Guide planning operations and version management
- `sac-api-helper` - Find correct APIs and provide code examples

**Commands** (use via /command):
- `/sac-script-template` - Generate script templates (filter, planning, export, etc.)
- `/sac-debug` - Interactive debugging guidance
- `/sac-optimize` - Performance analysis and recommendations
- `/sac-planning` - Planning operation templates

**Hooks**:
- Automatic validation on SAC script writes for common issues

## MCP Setup

This plugin ships with a `.mcp.json` that connects to the trusted `secondsky/sap_analytics_cloud_mcp`
server, exposing 90 SAC REST API tools across 11 service areas (Content, Data Export, Data Import,
Multi Actions, Calendar, Content Transport, User Management, Monitoring, Schedule & Publication,
Translation, Smart Query).

The SAC MCP is source-installed, not npm-installed. Use **sap-dependency-security** before changing the trusted fork or commit pin because this server receives SAC OAuth credentials and exposes tenant API tools.

**Before using MCP tools**, check if the server is already installed:
- Look for `.claude/sac-mcp.local.md` in the project
- Or check if `SAC_MCP_PATH` is set in the environment

If not installed, ask the user once: **"Would you like help setting up the SAC MCP server?"**

**If yes**, guide them through:

1. Clone and build:
   ```bash
   git clone https://github.com/secondsky/sap_analytics_cloud_mcp
   cd sap_analytics_cloud_mcp
   git checkout 2020235505d98111c2889598ab2217c1619b6943
   npm ci --ignore-scripts
   npm run build
   ```

2. Configure environment variables:
   - `SAC_MCP_PATH` — absolute path to the cloned repo (e.g. `/home/user/sap_analytics_cloud_mcp`)
   - `SAC_MCP_COMMIT` — `2020235505d98111c2889598ab2217c1619b6943`
   - `SAC_BASE_URL` — SAC tenant root URL (e.g. `https://mytenant.eu10.hanacloudservices.cloud.sap`)
   - `SAC_TOKEN_URL` — OAuth token endpoint
   - `SAC_CLIENT_ID` / `SAC_CLIENT_SECRET` — from SAC OAuth client configuration

3. After successful install, write `.claude/sac-mcp.local.md` (gitignored) with:
   ```markdown
   # SAC MCP Installation Record
   - Installed: [date]
   - Repository: https://github.com/secondsky/sap_analytics_cloud_mcp
   - Commit: 2020235505d98111c2889598ab2217c1619b6943
   - Path: [absolute path to build/index.js]
   - Build command: npm ci --ignore-scripts && npm run build
   - Env vars configured: SAC_MCP_PATH, SAC_MCP_COMMIT, SAC_BASE_URL, SAC_TOKEN_URL, SAC_CLIENT_ID, SAC_CLIENT_SECRET
   ```

This prevents re-prompting in future sessions.

## What's New in Q2 2026 (2026.8)

Key scripting enhancements in the latest SAC release:
- **Enhanced `onAfterExecute` Event** - Upload events now include message, statistics, rejected records, target version, and filename
- **Data Export API Job Monitoring** - New job monitor tab for delta extraction and calculation jobs
- **Data Import Service API** - Import master data to public dimensions in SAP Datasphere; import external fact data to private versions
- **Multi-Action API Step** - HTTP 204 response now allowed; enhanced header field restrictions
- **Export to S/4HANA Deprecated** - Use write-back integration scenario instead
- **Asymmetric Reporting** - Differing time ranges, hierarchies, and measures per row/column
- **Composite Versioning** - Manage multiple composite versions during story design

See `references/whats-new-qrc2-2026.md` for complete details.

## Environment Detection

Before writing or analyzing any script, identify which SAC environment the user is working in.

**Detection signals:**

| Signal | Environment |
|--------|-------------|
| Mentions `.story`, "Optimized Story", OSE, `Story.`, `Application.getActivePage()` | **OSE** |
| Mentions Analytics Designer, `AnalyticApplication`, `Designer`, `.application` | **Analytics Designer** |
| Says "SAC script" / "my script" without further context | **Unclear** |

**When environment is unclear**, ask ONE concise question before proceeding:

> "Are you scripting in **Analytics Designer** or **Optimized Story Experience**? This determines which API reference I use."

Do not ask again after the user answers.

**After confirmation**, use the correct references:
- **OSE** → `references/ose-api-*.md` (8 files, Q2 2026, v2025.20)
- **Analytics Designer** → `references/api-*.md` (existing files)

## Large Reference Search Routing

Search large OSE API references with `rg` before opening them. Use patterns such as `rg -n "class Chart|interface DataSource|enum Feed|setDimensionFilter|getPlanning|PlanningModel" references/ose-api-*.md`, then read only the matching section.

- Use `references/ose-api-datasource.md` for DataSource, DataAction, DataBinding, DataLocking, DataChangeInsights, and result-set methods.
- Use `references/ose-api-chart-viz.md` for Chart, Table, GeoMap, RVisualization, ValueDriverTree, feeds, and visualization APIs.
- Use `references/ose-api-planning-calendar.md` for Planning, PlanningModel, versions, calendars, data actions, and planning workflows.
- Use `references/ose-api-application-core.md` for Application, PageBook, Panel, Popup, Widget, and lifecycle or container APIs.
- Use `references/ose-api-types-enums.md` for enum/type lookup when a method signature mentions `Feed`, `Layout`, `NumberFormat`, `VariableValue`, or other SAC-specific types.
- Use smaller `references/api-*.md` files first for Analytics Designer unless the user explicitly says Optimized Story Experience.

## Quick Start

### Script Editor Access
- **Analytics Designer**: Edit mode → Select widget → Scripts tab
- **Optimized Story Experience**: Advanced Mode → Select widget → Add script

### Basic Script Structure
```javascript
// Event handler example (onSelect on Chart_1)
var selections = Chart_1.getSelections();
if (selections.length > 0) {
    var selectedValue = selections[0]["Location"];
    Table_1.getDataSource().setDimensionFilter("Location", selectedValue);
}
```

## Core APIs

### DataSource API
Access via `Widget.getDataSource()`. Key methods:
- `getMembers(dim, {accessMode: MemberAccessMode.BookedValues})` - Get dimension members efficiently
- `getResultSet()` - Cached data access (preferred over getData())
- `setDimensionFilter(dim, value)` - Apply filters
- `setRefreshPaused(true/false)` - Batch multiple operations

### Planning API
Access via `Table.getPlanning()`. Key operations:
- `getPublicVersion()` / `getPrivateVersion()` - Version access
- `publish()` - Submit private to public
- `copyFromPublicVersion()` / `copyToPublicVersion()` - Data copy
- `setLock(true/false)` - Data locking

### Widget APIs
- **Charts**: `addMeasure()`, `addDimension()`, `getSelections()`
- **Tables**: `addDimensionToRows()`, `setZeroSuppressionEnabled()`
- **Containers**: Panel, TabStrip, PageBook for layout

### Application Object
Global utilities:
- `Application.showBusyIndicator()` / `hideBusyIndicator()`
- `Application.showMessage(type, text)`
- `Application.getUserInfo()` / `getInfo()`

## Performance Best Practices

1. **Minimize Backend Calls**
   ```javascript
   // Use getResultSet() (cached) instead of getMembers() (backend)
   var data = ds.getResultSet();
   ```

2. **Batch Filter Operations**
   ```javascript
   ds.setRefreshPaused(true);
   ds.setDimensionFilter("Dim1", value1);
   ds.setDimensionFilter("Dim2", value2);
   ds.setRefreshPaused(false); // Single refresh
   ```

3. **Keep onInitialization Empty**
   Defer heavy operations to lazy loading or first interaction.

4. **Use BookedValues for Members**
   ```javascript
   var members = ds.getMembers("Dim", {accessMode: MemberAccessMode.BookedValues});
   ```

## Debugging

### Console Logging
```javascript
console.log("Debug:", myVariable);
console.log("Selections:", JSON.stringify(Chart_1.getSelections()));
```

### Browser DevTools
1. Press F12 → Console tab
2. Filter by "Info" type
3. Add `?APP_PERFORMANCE_LOGGING=true` to URL for timing

## Bundled Resources

**Reference Files** (66 files):
- Core APIs: `references/api-datasource.md`, `references/api-widgets.md`, `references/api-planning.md`
- Advanced: `references/api-calendar-bookmarks.md`, `references/api-advanced-widgets.md`
- Best Practices: `references/best-practices-developer.md`, `references/best-practices-planning-stories.md`
- Language: `references/scripting-language-fundamentals.md`
- Q2 2026-relevant API updates: `references/whats-new-qrc2-2026.md`, `references/whats-new-2025.23.md`, `references/chart-variance-apis.md`
- Browser runtime triage: `references/edge-cdp-control.md` for Microsoft Edge CDP setup, `DevToolsActivePort` fallback, target selection, and SAC safety rules
- **OSE API (Q2 2026, v2025.20)** — complete method/parameter/return documentation:
  - `references/ose-api-application-core.md` — Application, PageBook, Panel, Popup, Widget (15 classes)
  - `references/ose-api-widgets.md` — Button, Dropdown, InputField, Slider, Switch, Text, TextArea (15 classes)
  - `references/ose-api-datasource.md` — DataSource, DataAction, DataBinding, DataLocking, DataChangeInsights (39 classes)
  - `references/ose-api-chart-viz.md` — Chart, Table, GeoMap, RVisualization, ValueDriverTree (20 classes)
  - `references/ose-api-planning-calendar.md` — Planning, PlanningModel, all Calendar classes (54 classes)
  - `references/ose-api-filtering-selection.md` — FilterLine, FilterValue, Selection (11 classes)
  - `references/ose-api-utilities.md` — BookmarkSet, MemberInfo, DimensionInfo, Timer, NavigationUtils (37 classes)
  - `references/ose-api-types-enums.md` — All enum types: Feed, Layout, NumberFormat, VariableValue (70 classes)

**Templates** (56 patterns):
- `templates/common-patterns.js` - 40 general scripting patterns
- `templates/planning-operations.js` - 16 planning-specific patterns

## Official Documentation

- **Analytics Designer API**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/
- **Optimized Story Experience API**: https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/
- **SAC Documentation**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
- **What's New Q4 2025**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/c96a267c5da04fff90bb55313ee9f77c.html

---

**SAC Version**: Q2 2026 (2026.8) | **API Version**: 2025.20 (OSE Q2 2026)
