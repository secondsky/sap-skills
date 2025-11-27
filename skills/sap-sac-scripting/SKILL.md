---
name: sap-sac-scripting
description: |
  Comprehensive SAC scripting skill for Analytics Designer and Optimized Story Experience. Use when building analytic applications, planning models, or enhanced stories. Covers DataSource API, Chart/Table manipulation, Planning operations, Calendar integration, Bookmarks, Timer API, Container widgets, Layout API, R Visualizations, Custom Widgets, Navigation, variables, event handlers, debugging, performance optimization, and 2025.23 features: comments APIs, Search to Insight, smart grouping, time-series forecast, geo map quick menus, Explorer/Smart Insights, composites scripting. Includes 40 code templates.
license: GPL-3.0
metadata:
  version: 1.7.0
  last_verified: 2025-11-27
  sac_version: "2025.23"
  api_reference_version: "2025.14"
  documentation_source: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
  reference_files: 52
  template_patterns: 40
  status: production
---

# SAP Analytics Cloud Scripting

Comprehensive skill for scripting in SAP Analytics Cloud (SAC) Analytics Designer and Optimized Story Experience.

## What's New in SAC 2025.23

Time series forecast API, Search to Insight, comments APIs, smart grouping, Explorer & Smart Insights, geo map enhancements, and composite scripting support. See `references/whats-new-2025.23.md` for complete details.

## When to Use This Skill

Use this skill when working on tasks involving:

- **Analytics Designer Development**: Creating interactive dashboards, planning applications, event handlers
- **Optimized Story Experience**: Enhancing stories with scripting capabilities
- **Data Operations**: Filtering, data access, hierarchies, data actions
- **Planning Operations**: Version management, data locking, workflows
- **UI/UX Enhancements**: Popups, navigation, responsive design
- **Advanced Features**: Calendar integration, bookmarks, R visualizations

## Quick Start

### Script Editor Access
- **Analytics Designer**: Edit mode → Select widget → Scripts tab
- **Optimized Story Experience**: Advanced Mode → Select widget → Add script

### Basic Script Structure
```javascript
// Event handler example
var selections = Chart_1.getSelections();
if (selections.length > 0) {
    Table_1.getDataSource().setDimensionFilter("Location", selections[0]["Location"]);
}
```

## Core APIs

### DataSource API
- **Reference**: `Chart_1.getDataSource()` or `Table_1.getDataSource()`
- **Key Methods**: `getMembers()`, `getData()`, `setDimensionFilter()`, `refreshData()`
- **Performance**: Use `getResultSet()` (no backend) instead of `getMembers()` (hits backend)

### Planning API
- **Access**: `Table_1.getPlanning()`
- **Operations**: Version management (`getPublicVersion()`, `publish()`, `copy()`)
- **Data Locking**: Check/modify lock states

### Widget APIs
- **Charts**: `addDimension()`, `addMeasure()`, `getSelections()`
- **Tables**: `addDimensionToRows()`, `setZeroSuppressionEnabled()`
- **Containers**: Panel, TabStrip, PageBook for layout management

### Application Object
- **Utilities**: `showBusyIndicator()`, `showMessage()`
- **Info**: `getInfo()`, `getUserInfo()`, `getTheme()`

## Common Patterns

### Filter Based on Selection
```javascript
var selections = Chart_1.getSelections();
if (selections.length > 0) {
    Table_1.getDataSource().setDimensionFilter("Location", selections[0]["Location"]);
}
```

### Pause/Resume Refresh (Performance)
```javascript
ds.setRefreshPaused(true);
// Apply multiple operations
ds.setRefreshPaused(false); // Single backend call
```

### Get Booked Values Only
```javascript
var members = ds.getMembers("Dimension", {accessMode: MemberAccessMode.BookedValues});
```

## Debugging

### Console Logging
```javascript
console.log("Debug info:", myVariable);
console.log("Selections:", Chart_1.getSelections());
```

### Browser Tools
- Open with F12 → Console tab
- Filter by "Info" type
- Look for "sandbox.worker.main.*.js"

### Performance Logging
Add URL parameter: `?APP_PERFORMANCE_LOGGING=true`

## Performance Best Practices

1. **Minimize Backend Trips**: Use `getResultSet()` over `getMembers()`
2. **Batch Operations**: Pause refresh, apply changes, resume
3. **Cache References**: Store `getDataSource()` in variables
4. **Empty onInitialization**: Avoid heavy startup operations

## Developer Best Practices

### Naming Conventions
- Charts: `chartB_revenue` (Bar), `chartL_sales` (Line)
- Tables: `tbl_transactions`
- Panels: `pnl_header`
- Buttons: `btn_export_pdf`

### Script Annotation
```javascript
/*
 * Script: onSelect - chartB_revenue_by_region
 * Purpose: Filter detail table when user selects a region
 */
```

## Events

### Application Events
- `onInitialization`: Runs once on load (keep empty!)
- `onResize`: Application resize
- `onOrientationChange`: Mobile orientation change

### Widget Events
- `onSelect`: Data point selection (Chart/Table)
- `onResultChanged`: Data changes
- `onClick`: Button click

## Planning Story Architecture

### Multi-Story Pattern
```
Planning_Application/
├── 00_Entry_Point.story
├── 01_Configuration.story
├── 02_Plan_FTE.story
├── 03_Plan_Costs.story
└── 04_Reports.story
```

### Navigation Script
```javascript
var urlParameters = ArrayUtils.create(Type.UrlParameter);
urlParameters.push(UrlParameter.create("page", "0"));
NavigationUtils.openStory(storyId, "", urlParameters, false);
```

## Bundled Resources

**Reference Files** (52 files):
- Core APIs: `references/api-datasource.md`, `references/api-widgets.md`
- Advanced: `references/api-calendar-bookmarks.md`, `references/api-advanced-widgets.md`
- Best Practices: `references/best-practices-developer.md`
- Language: `references/scripting-language-fundamentals.md`

**Templates** (40 patterns):
- `templates/common-patterns.js`: 40 scripting patterns
- `templates/planning-operations.js`: Planning-specific patterns

## Official Documentation

- **Analytics Designer API**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/latest/en-US/
- **Optimized Story Experience API**: https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/latest/en-US/
- **SAC Scripting Docs**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD

---

**Version**: 1.7.0 | **Last Verified**: 2025-11-27 | **SAC Version**: 2025.23
