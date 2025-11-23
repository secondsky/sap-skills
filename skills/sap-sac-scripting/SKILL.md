---
name: sap-sac-scripting
description: |
  This skill provides comprehensive guidance for scripting in SAP Analytics Cloud (SAC), including Analytics Designer and Optimized Story Experience. Use when writing scripts for analytic applications, planning applications, or enhanced stories in SAC. Covers DataSource API (36+ methods), Chart/Table/Input Controls manipulation, Planning operations (version management, data locking, data actions), Calendar integration (tasks, processes, workflows), Bookmarks (save/apply state), Linked Analysis, Timer API, Container widgets (Panel, TabStrip, PageBook), Layout API (responsive design), R Visualizations, Custom Widgets development, Navigation, global/local variables, event handlers (onInitialization, onSelect, onResultChanged), popups/dialogs, debugging techniques (console.log, debugger statement), performance optimization, and developer best practices (naming conventions, layout organization, script annotation). Includes 39 ready-to-use code templates. Supports SAC version 2025.14+.
license: MIT
metadata:
  version: 1.3.0
  last_updated: 2025-11-22
  sac_version: "2025.14+"
  api_reference_version: "2025.14"
  documentation_source: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
  reference_files: 8
  template_patterns: 39
  status: production
---

# SAP Analytics Cloud Scripting Skill

Comprehensive skill for scripting in SAP Analytics Cloud (SAC) Analytics Designer and Optimized Story Experience.

---

## When to Use This Skill

Use this skill when working on tasks involving:

**Analytics Designer Development**:
- Creating analytic applications with interactive dashboards
- Building planning applications for data entry and forecasting
- Writing event handler scripts (onInitialization, onSelect, onResultChanged)
- Implementing widget interactions (charts, tables, input controls)
- Managing data sources and applying filters programmatically

**Optimized Story Experience**:
- Enhancing stories with scripting capabilities
- Adding interactivity to existing stories
- Implementing custom business logic
- Creating dynamic visualizations

**Data Operations**:
- Filtering and manipulating data sources
- Reading dimension members and measure values
- Working with hierarchies and selections
- Implementing data actions and multi-actions

**Planning Operations**:
- Managing planning versions (public/private)
- Publishing and copying versions
- Handling data locking
- Implementing data entry workflows

**UI/UX Enhancements**:
- Creating popups and dialogs
- Managing widget visibility
- Implementing dynamic navigation
- Building responsive applications
- Using container widgets (Panel, TabStrip, PageBook, Flow Layout)
- Implementing Layout API for dynamic sizing/positioning

**Calendar & Workflow Integration**:
- Creating and managing calendar tasks and processes
- Implementing approval workflows (submit, approve, reject)
- Adding reminders and notifications
- Integrating with planning calendar events

**Bookmarks & State Management**:
- Saving and restoring application state
- Creating global and personal bookmarks
- URL parameter integration
- Linked Analysis for cross-widget filtering

**Advanced Features**:
- Timer-based operations and animations
- R Visualizations for specialized charts
- Custom Widget development
- Cross-application navigation

**Debugging & Optimization**:
- Debugging scripts with console.log and debugger statement
- Optimizing application performance
- Troubleshooting runtime errors

---

## Quick Start

### Script Editor Access

1. **Analytics Designer**: Open application in edit mode → Select widget → Click Scripts tab
2. **Optimized Story Experience**: Enable Advanced Mode → Select widget → Add script

### Basic Script Structure

```javascript
// Event handler script (e.g., onSelect of a chart)
var selections = Chart_1.getSelections();
if (selections.length > 0) {
    var selectedMember = selections[0]["Location"];
    Table_1.getDataSource().setDimensionFilter("Location", selectedMember);
}
```

### Script Types

1. **Event Handlers**: Triggered by widget events (onSelect, onClick, onResultChanged)
2. **Application Events**: onInitialization, onResize, onOrientationChange
3. **Script Objects**: Reusable functions callable from any event handler

---

## Core Concepts

### 1. Variables

**Local Variables** (within event handler):
```javascript
var myString = "Hello";
var myNumber = 42;
var myBoolean = true;
var myArray = ["a", "b", "c"];
```

**Global Variables** (across entire application):
- Create via Outline panel → Global Variables → (+)
- Types: String, Integer, Number, Boolean (can be arrays)
- Access from any script: `GlobalVariable_1 = "value";`

**URL Parameters**:
- Prefix global variable name with `p_` to pass via URL
- URL format: `?p_myVariable=value`

### 2. DataSource API

Central API for data access. Get reference via widgets:

```javascript
var ds = Chart_1.getDataSource();
var ds = Table_1.getDataSource();
```

**Key Methods**:
| Method | Description |
|--------|-------------|
| `getDimensions()` | Returns all dimensions |
| `getMeasures()` | Returns all measures |
| `getMembers(dimensionId, options)` | Returns dimension members |
| `getData(selection)` | Returns data values |
| `getResultSet()` | Returns current result set (no backend trip) |
| `setDimensionFilter(dimension, value)` | Sets filter on dimension |
| `removeDimensionFilter(dimension)` | Removes filter |
| `getDimensionFilters(dimension)` | Gets current filters |
| `refreshData()` | Refreshes data from backend |
| `getVariables()` | Returns model variables |
| `setVariableValue(variable, value)` | Sets variable value |

**Reference**: See `references/api-datasource.md` for complete DataSource API.

### 3. Widget APIs

**Chart**:
```javascript
Chart_1.addDimension(Feed.CategoryAxis, "Location");
Chart_1.addMeasure(Feed.ValueAxis, "[Account].[parentId].&[Revenue]");
Chart_1.removeMember(Feed.ValueAxis, measureId);
var selections = Chart_1.getSelections();
Chart_1.setVisible(true);
```

**Table**:
```javascript
Table_1.addDimensionToRows("Product");
Table_1.addDimensionToColumns("Date");
Table_1.setZeroSuppressionEnabled(true);
var selections = Table_1.getSelections();
```

**Reference**: See `references/api-widgets.md` for complete widget APIs.

### 4. Planning API

Access via table widget:
```javascript
var planning = Table_1.getPlanning();
```

**Version Management**:
```javascript
// Get public version
var publicVersion = planning.getPublicVersion("Budget2024");

// Get private version
var privateVersion = planning.getPrivateVersion("myDraft");

// Check for unsaved changes
if (publicVersion.isDirty()) {
    publicVersion.publish();
}

// Copy version
sourceVersion.copy("NewVersion", PlanningCopyOption.AllData, PlanningCategory.Budget);
```

**Data Locking**:
```javascript
var selection = Table_1.getSelections()[0];
var lockState = planning.getDataLocking().getState(selection);
```

**Reference**: See `references/api-planning.md` for complete Planning API.

### 5. Application API

Global Application object:
```javascript
// User feedback
Application.showBusyIndicator();
Application.hideBusyIndicator();

// Messages
Application.showMessage(ApplicationMessageType.Info, "Operation completed");

// Application info
var appInfo = Application.getInfo();
var userInfo = Application.getUserInfo();

// Theme
var theme = Application.getTheme();
```

### 6. Events

**Application Events**:
- `onInitialization`: Runs once when application loads
- `onResize`: Fires when application is resized
- `onOrientationChange`: Mobile orientation change

**Widget Events**:
- `onSelect`: User selects data point (Chart, Table)
- `onResultChanged`: Data in widget changes
- `onClick`: Button click, etc.

**Best Practice**: Keep `onInitialization` empty for performance. Use static filters instead.

---

## Common Patterns

### Filter Data Based on Selection

```javascript
// onSelect event of Chart_1
var selections = Chart_1.getSelections();
if (selections.length > 0) {
    var selectedLocation = selections[0]["Location"];
    Table_1.getDataSource().setDimensionFilter("Location", selectedLocation);
}
```

### Find Active Version from Attribute

```javascript
var allVersions = PlanningModel_1.getMembers("Version");
var activeVersion = "";

for (var i = 0; i < allVersions.length; i++) {
    if (allVersions[i].properties.Active === "X") {
        activeVersion = allVersions[i].id;
        break;
    }
}
console.log("Active Version: " + activeVersion);
```

### Dynamic Measure Swap

```javascript
// Get current measure
var currentMeasure = Chart_1.getMembers(Feed.ValueAxis);

// Remove current measure
Chart_1.removeMember(Feed.ValueAxis, currentMeasure[0]);

// Add new measure
Chart_1.addMember(Feed.ValueAxis, "[Account].[parentId].&[NewMeasure]");
```

### Switch Between Chart and Table

```javascript
// Show chart, hide table
Chart_1.setVisible(true);
Table_1.setVisible(false);
Button_ShowTable.setVisible(true);
Button_ShowChart.setVisible(false);
```

### Pause and Resume Refresh

```javascript
// Pause before multiple operations
Chart_1.getDataSource().setRefreshPaused(true);
Table_1.getDataSource().setRefreshPaused(true);

// Apply multiple filters
Chart_1.getDataSource().setDimensionFilter("Year", "2024");
Chart_1.getDataSource().setDimensionFilter("Region", "EMEA");

// Resume refresh (single backend call)
Chart_1.getDataSource().setRefreshPaused(false);
Table_1.getDataSource().setRefreshPaused(false);
```

### Get Booked Values Only

```javascript
var members = Table_1.getDataSource()
    .getMembers("Dimension", {accessMode: MemberAccessMode.BookedValues});
```

**Reference**: See `templates/common-patterns.js` for more patterns.

---

## Debugging

### Console Logging

```javascript
console.log("Variable value:", myVariable);
console.log("Selections:", Chart_1.getSelections());
```

**Access Console**:
1. Run application
2. Press F12 or Ctrl+Shift+J
3. Go to Console tab
4. Filter by "Info" type
5. Expand "sandbox.worker.main.*.js" for your logs

### Debugger Statement

```javascript
debugger;  // Execution pauses here
var value = getData();
```

**Enable Debug Mode**:
1. Add `;debug=true` to application URL
2. Open Developer Tools (F12)
3. Go to Sources tab
4. Find code in "sandbox worker main" file

### Performance Logging

Add URL parameter: `?APP_PERFORMANCE_LOGGING=true`

```javascript
// In console
window.sap.raptr.getEntriesByMarker("(Application)")
    .filter(e => e.entryType === 'measure')
    .sort((a,b) => (a.startTime + a.duration) - (b.startTime + b.duration));
```

### Error Handling

```javascript
try {
    var data = Table_1.getDataSource().getData(selection);
    // Process data
} catch (error) {
    console.log("Error:", error);
    Application.showMessage(ApplicationMessageType.Error, "Operation failed");
}
```

---

## Performance Best Practices

### 1. Minimize Backend Trips

```javascript
// GOOD: getResultSet() - no backend trip
var resultSet = Chart_1.getDataSource().getResultSet();

// AVOID: getMembers() - always hits backend
var members = Chart_1.getDataSource().getMembers("Dimension");
```

### 2. Batch Filter Operations

```javascript
// GOOD: Pause refresh, apply multiple filters, resume
ds.setRefreshPaused(true);
ds.setDimensionFilter("Dim1", value1);
ds.setDimensionFilter("Dim2", value2);
ds.setDimensionFilter("Dim3", value3);
ds.setRefreshPaused(false);

// AVOID: Each filter triggers refresh
ds.setDimensionFilter("Dim1", value1);  // Refresh
ds.setDimensionFilter("Dim2", value2);  // Refresh
ds.setDimensionFilter("Dim3", value3);  // Refresh
```

### 3. Copy Filters Efficiently

```javascript
// GOOD: Copy all filters at once
Table_1.getDataSource().copyDimensionFilterFrom(Chart_1.getDataSource());

// AVOID: Set each filter individually
var filters = Chart_1.getDataSource().getDimensionFilters("Dim1");
Table_1.getDataSource().setDimensionFilter("Dim1", filters[0].value);
```

### 4. Empty onInitialization

```javascript
// AVOID: Heavy operations in onInitialization
// This blocks application startup

// GOOD: Use URL parameters for initial values
// Use static widget filters instead of script filters
// Load invisible widgets in background
```

### 5. Cache DataSource References

```javascript
// GOOD: Cache reference outside loop
var ds = Table_1.getDataSource();
for (var i = 0; i < items.length; i++) {
    ds.setDimensionFilter("Dim", items[i]);
}

// AVOID: Get reference inside loop
for (var i = 0; i < items.length; i++) {
    Table_1.getDataSource().setDimensionFilter("Dim", items[i]);
}
```

---

## Developer Best Practices

Maintainable SAC stories require consistent conventions. Key principles:

### 1. Naming Conventions

Use prefixes to identify widget types at a glance:

| Widget Type | Prefix | Example |
|-------------|--------|---------|
| Bar Chart | `chartB_` | `chartB_revenue_by_state` |
| Line Chart | `chartL_` | `chartL_margin_by_product` |
| Table | `tbl_` | `tbl_invoices_by_month` |
| Panel | `pnl_` | `pnl_header` |
| Button | `btn_` | `btn_export_pdf` |
| Dropdown | `ddl_` | `ddl_product` |
| KPI/Numeric | `kpi_` | `kpi_actuals_vs_budget` |

### 2. Layout Organization

- Group related widgets in panels
- Order widgets in Outline view: top→bottom, left→right
- Use panel visibility for show/hide sections:

```javascript
// Hide entire section instead of individual widgets
pnl_details.setVisible(false);
```

### 3. Script Annotation

Add summary + line-level comments to all scripts:

```javascript
/*
 * Script: onSelect - chartB_revenue_by_region
 * Purpose: Filter detail table when user selects a region
 * Dependencies: chartB_revenue_by_region, tbl_transactions
 */

// Get user's selection from the chart
var selections = chartB_revenue_by_region.getSelections();
```

### 4. Design Tips

- **Disable Panel Auto Scroll**: Prevents unwanted scroll bars
- **Avoid Flow Panels**: Fixed layouts are easier to maintain
- **Use % for Left/Right**: Change from px to % after layout is finalized for responsive sizing

**Full Reference**: See `references/best-practices-developer.md` for complete naming table and patterns.

**Source**: [SAP Community - Building Stories That Other Developers Actually Want to Inherit](https://community.sap.com/t5/technology-blog-posts-by-members/building-stories-that-other-developers-actually-want-to-inherit/ba-p/14168133)

---

## Planning Story Architecture

For complex planning processes, use multi-story architecture with a central entry point.

### Key Principles

1. **Entry Point Design**: Create overview page with KPI tiles and organized navigation sections
2. **Multi-Story Separation**: One story per planning phase, stored in folder structure
3. **Script-Based Navigation**: Use `NavigationUtils.openStory()` instead of hyperlinks
4. **User Assistance**: Consistent sidebar with filters, step-by-step instructions, external links
5. **Guided Process**: "Guide Me!" popup for focused step-by-step workflow
6. **Button Color Coding**: Green (positive), Red (negative), Blue (neutral)

### Navigation Script Pattern

```javascript
// Navigate to target story with page and mode parameters
var urlParameters = ArrayUtils.create(Type.UrlParameter);
urlParameters.push(UrlParameter.create("mode", "view"));
urlParameters.push(UrlParameter.create("page", "0"));
NavigationUtils.openStory(storyId, "", urlParameters, false);
```

### Folder Organization

```
Planning_Application/
├── 00_Entry_Point.story
├── 01_Configuration.story
├── 02_Plan_FTE.story
├── 03_Plan_Costs.story
└── 04_Reports.story
```

**Full Reference**: See `references/best-practices-planning-stories.md` for complete patterns including sidebar design, guided process popup implementation, and button guidelines.

**Source**: [SAP PRESS - Best Practices for Planning Stories](https://blog.sap-press.com/best-practices-for-planning-stories-in-sap-analytics-cloud)

---

## Popups and Dialogs

### Create Popup

1. Outline panel → Popups → (+)
2. Add widgets to popup (tables, charts, buttons)
3. Optionally enable header/footer for dialog style

### Show/Hide Popup

```javascript
// Show popup
Popup_1.open();

// Hide popup
Popup_1.close();
```

### Busy Indicator

```javascript
Application.showBusyIndicator();

// Perform operations
Table_1.getDataSource().refreshData();

Application.hideBusyIndicator();
```

---

## Utility Functions

### Type Conversion

```javascript
// String to Integer
var num = ConvertUtils.stringToInteger("42");

// Number to String
var str = ConvertUtils.numberToString(42);
```

### Array Operations

```javascript
// ArrayUtils available for common operations
var arr = [1, 2, 3];
```

### Date Formatting

```javascript
// DateFormat utility
var formatted = DateFormat.format(dateValue, "yyyy-MM-dd");
```

---

## Script Objects (Reusable Functions)

Create reusable functions not tied to specific events:

1. Outline panel → Script Objects → (+)
2. Add functions to script object
3. Call from any event: `ScriptObject_1.myFunction(param);`

```javascript
// In ScriptObject_1
function applyStandardFilters(dataSource, year, region) {
    dataSource.setDimensionFilter("Year", year);
    dataSource.setDimensionFilter("Region", region);
}

// In event handler
ScriptObject_1.applyStandardFilters(Table_1.getDataSource(), "2024", "EMEA");
```

---

## Export Capabilities

### PDF Export

```javascript
var exportSettings = {
    scope: ExportScope.All,
    header: "Report Title",
    footer: "Page {page}",
    orientation: "landscape"
};
Application.export(ExportType.PDF, exportSettings);
```

### Excel Export

```javascript
Application.export(ExportType.Excel, {
    scope: ExportScope.All,
    includeHierarchy: true
});
```

### CSV Export

```javascript
Table_1.export(ExportType.CSV);
```

---

## Official Documentation Links

### API References (Always Current)
- **Analytics Designer API Reference 2025.14**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html
- **Optimized Story Experience API Reference 2025.14**: https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html

### SAP Help Portal
- **Scripting Documentation**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/6a4db9a9c8634bcb86cecbf1f1dbbf8e.html
- **Performance Best Practices**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/fbe339efda1241b5a3f46cf17f54cdff.html

### Learning Resources
- **SAP Learning Journey**: https://learning.sap.com/learning-journeys/acquiring-basic-scripting-skills-to-extend-stories-in-sap-analytics-cloud
- **SAP Developer Tutorials**: https://developers.sap.com/tutorials/sac-analytics-designer-create-1-create.html

### Community Resources
- **SAP Community - SAC**: https://community.sap.com/topics/cloud-analytics
- **Code Snippets**: https://www.denisreis.com/sap-analytics-cloud-javascript-api-code-snippets/

---

## Bundled Reference Files

This skill includes detailed reference documentation (8 files):

**Core APIs**:
1. **references/api-datasource.md**: Complete DataSource API (36+ methods)
2. **references/api-widgets.md**: Chart, Table, Input Controls, GeoMap APIs
3. **references/api-planning.md**: Planning API, version management, data locking
4. **references/api-application.md**: Application object, utilities, events

**Advanced APIs**:
5. **references/api-calendar-bookmarks.md**: Calendar integration, Bookmarks, Linked Analysis, Timer API
6. **references/api-advanced-widgets.md**: Container widgets, Layout API, R Visualization, Custom Widgets, Navigation

**Best Practices**:
7. **references/best-practices-developer.md**: Naming conventions, layout organization, script annotation, responsive design
8. **references/best-practices-planning-stories.md**: Multi-story architecture, entry point design, navigation scripting, user assistance patterns

**Templates** (39 ready-to-use patterns):
1. **templates/common-patterns.js**: Filtering, selection, visibility, debugging
2. **templates/planning-operations.js**: Version management, workflows, data actions

---

## Version Compatibility

- **Minimum SAC Version**: 2025.x
- **API Reference Version**: 2025.14
- **Analytics Designer**: Fully supported
- **Optimized Story Experience**: Fully supported (Advanced Mode)

**Note**: Analytics Designer is being strategically replaced by Advanced Mode in Optimized Story Experience. Both share similar scripting APIs.

---

## Instructions for Claude

When assisting with SAC scripting:

1. **Use correct API syntax**: Reference official API documentation
2. **Prefer getResultSet()**: Over getMembers() for performance
3. **Batch operations**: Use pause/resume refresh pattern
4. **Include error handling**: Use try-catch for robust code
5. **Follow naming conventions**: CamelCase for variables, descriptive names
6. **Test incrementally**: Suggest testing every 5-10 lines
7. **Link to documentation**: Provide relevant SAP Help links
8. **Consider performance**: Avoid heavy operations in onInitialization

When writing scripts:
- Start with variable declarations
- Use console.log() for debugging
- Cache DataSource references
- Handle empty selections gracefully
- Use Application.showBusyIndicator() for long operations

For troubleshooting:
- Check browser console (F12)
- Verify widget names in Outline
- Confirm DataSource is connected
- Test with simple console.log first
- Use `;debug=true` URL parameter

---

**License**: MIT
**Version**: 1.0.0
**Maintained by**: SAP Skills Maintainers
**Repository**: https://github.com/secondsky/sap-skills
