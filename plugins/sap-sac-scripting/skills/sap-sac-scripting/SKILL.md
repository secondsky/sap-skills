---
name: sap-sac-scripting
description: |
  Comprehensive SAC scripting skill for SAP Analytics Cloud Analytics Designer and Optimized Story Experience. This skill should be used when the user asks to "create SAC script", "debug Analytics Designer", "optimize SAC performance", "planning operations in SAC", "filter data in SAC", "use DataSource API", "chart scripting", "table manipulation", "SAC event handlers", "version management", "data locking", or works with SAC widgets, planning models, or analytics applications.
license: GPL-3.0
metadata:
  version: 3.0.1
  last_verified: 2026-02-26
  sac_version: "Q4 2025 (2025.21)"
  api_reference_version: "2025.19"
  documentation_source: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
  reference_files: 55
  template_patterns: 56
  agents: 4
  commands: 4
  status: production
---

# SAP Analytics Cloud Scripting

Comprehensive skill for scripting in SAP Analytics Cloud (SAC) Analytics Designer and Optimized Story Experience.

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

This plugin ships with a `.mcp.json` that connects to the community `sap_analytics_cloud_mcp`
server, exposing 90 SAC REST API tools across 11 service areas (Content, Data Export, Data Import,
Multi Actions, Calendar, Content Transport, User Management, Monitoring, Schedule & Publication,
Translation, Smart Query).

**Before using MCP tools**, check if the server is already installed:
- Look for `.claude/sac-mcp.local.md` in the project
- Or check if `SAC_MCP_PATH` is set in the environment

If not installed, ask the user once: **"Would you like help setting up the SAC MCP server?"**

**If yes**, guide them through:

1. Clone and build:
   ```bash
   git clone https://github.com/secondsky/sap_analytics_cloud_mcp
   cd sap_analytics_cloud_mcp && npm install && npm run build
   ```

2. Configure environment variables:
   - `SAC_MCP_PATH` — absolute path to the cloned repo (e.g. `/home/user/sap_analytics_cloud_mcp`)
   - `SAC_BASE_URL` — SAC tenant root URL (e.g. `https://mytenant.eu10.hanacloudservices.cloud.sap`)
   - `SAC_TOKEN_URL` — OAuth token endpoint
   - `SAC_CLIENT_ID` / `SAC_CLIENT_SECRET` — from SAC OAuth client configuration

3. After successful install, write `.claude/sac-mcp.local.md` (gitignored) with:
   ```markdown
   # SAC MCP Installation Record
   - Installed: [date]
   - Path: [absolute path to build/index.js]
   - Env vars configured: SAC_MCP_PATH, SAC_BASE_URL, SAC_TOKEN_URL, SAC_CLIENT_ID, SAC_CLIENT_SECRET
   ```

This prevents re-prompting in future sessions.

## What's New in Q4 2025 (2025.21)

Key scripting enhancements in the latest SAC release:
- **Chart Variance APIs** - Script control over chart variance display
- **Compass for Seamless Planning** - Enhanced planning integration
- **Data Actions Enhancements** - Automatic dimension mapping, input control binding
- **Time Series Forecast API** - Programmatic forecasting control
- **Comments APIs** - Widget and cell comment management

See `references/whats-new-q4-2025.md` for complete details.

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

**Reference Files** (55 files):
- Core APIs: `references/api-datasource.md`, `references/api-widgets.md`, `references/api-planning.md`
- Advanced: `references/api-calendar-bookmarks.md`, `references/api-advanced-widgets.md`
- Best Practices: `references/best-practices-developer.md`, `references/best-practices-planning-stories.md`
- Language: `references/scripting-language-fundamentals.md`
- Q4 2025: `references/whats-new-q4-2025.md`, `references/chart-variance-apis.md`

**Templates** (56 patterns):
- `templates/common-patterns.js` - 40 general scripting patterns
- `templates/planning-operations.js` - 16 planning-specific patterns

## Official Documentation

- **Analytics Designer API**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/
- **Optimized Story Experience API**: https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/
- **SAC Documentation**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
- **What's New Q4 2025**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/c96a267c5da04fff90bb55313ee9f77c.html

---

**Version**: 3.0.0 | **Last Verified**: 2025-12-27 | **SAC Version**: Q4 2025 (2025.21) | **API Version**: 2025.19
