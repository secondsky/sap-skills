# SAP Analytics Cloud - Analytics Designer API Reference for Planning

**Source**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/2025.23/en-US/index.html
**Version**: 2025.23
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Application Class](#application-class)
2. [DataSource API](#datasource-api)
3. [Planning API (getPlanning)](#planning-api)
4. [PlanningModel API](#planningmodel-api)
5. [Data Actions API](#data-actions-api)
6. [Multi Actions API](#multi-actions-api)
7. [Calendar Integration API](#calendar-integration-api)
8. [BPC Planning Sequence API](#bpc-planning-sequence-api)
9. [Widget APIs](#widget-apis)
10. [Advanced Analytics APIs](#advanced-analytics-apis)
11. [Export APIs](#export-apis)
12. [Utility Classes](#utility-classes)
13. [Data Types and Structures](#data-types-and-structures)
14. [Enumerations](#enumerations)

---

## Application Class

The Application object provides access to global application functionality.

### Properties & Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `getInfo()` | Get application information | ApplicationInfo |
| `getMode()` | Get current mode (View, Present, Embed) | ApplicationMode |
| `getTheme()` | Get current theme | Theme |
| `setTheme(theme)` | Set application theme | void |
| `getWidgets()` | Get all widgets in application | Widget[] |
| `getUserInfo()` | Get current user information | UserInfo |
| `getTeamsInfo()` | Get user's team information | TeamInfo[] |
| `getRolesInfo()` | Get user's role information | RoleInfo[] |
| `showBusyIndicator()` | Show loading indicator | void |
| `hideBusyIndicator()` | Hide loading indicator | void |
| `setAutomaticBusyIndicatorEnabled(enabled)` | Auto busy indicator | void |
| `refreshData()` | Refresh all data sources | void |
| `showMessage(text, type)` | Show toast message | void |
| `sendNotification(options)` | Send notification to users | void |
| `postMessage(message)` | Post message for embedding | void |
| `setCssClass(className)` | Set CSS class on application | void |
| `setCommentModeEnabled(enabled)` | Enable/disable comment mode | void |

### Event Handlers

| Event | Trigger Condition |
|-------|-------------------|
| `onInitialization` | Application loads |
| `onResize` | Browser window resizes |
| `onOrientationChange` | Device orientation changes |
| `onTimeout` | Session timeout warning |
| `onBeforeExecute` | Before data action executes |
| `onPostMessageReceived` | Message received from parent frame |
| `onShake` | Device shake detected (mobile) |

### NotificationOptions Object

```javascript
{
    title: string,
    content: string,
    receivers: string[],        // User IDs
    isSendEmail: boolean,
    isSendMobileNotification: boolean,
    parameters: object
}
```

### Example: Application Initialization

```javascript
// onInitialization event
Application.showBusyIndicator();

// Get user and team info
var userInfo = Application.getUserInfo();
var teams = Application.getTeamsInfo();
console.log("User: " + userInfo.displayName);
console.log("Teams: " + teams.length);

// Initialize default filters
var currentYear = new Date().getFullYear().toString();
Table_1.getDataSource().setDimensionFilter("Year", currentYear);

Application.hideBusyIndicator();
```

---

## DataSource API

Access data source functionality for querying and filtering.

### Core Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getDimensions()` | Get all dimensions | none |
| `getHierarchies(dimId)` | Get dimension hierarchies | dimId: string |
| `getMeasures()` | Get all measures | none |
| `getMembers(dimId, options)` | Get dimension members | dimId: string, options: MemberOptions |
| `getMember(dimId, memberId)` | Get single member | dimId: string, memberId: string |
| `getData()` | Get data from source | none |
| `getResultSet()` | Get result set | none |
| `getDataSelections()` | Get current data selections | none |
| `isResultEmpty()` | Check if result is empty | none |
| `setDimensionFilter(dimId, filter)` | Set filter on dimension | dimId: string, filter: string/MemberInfo[] |
| `removeDimensionFilter(dimId)` | Remove dimension filter | dimId: string |
| `getDimensionFilters(dimId)` | Get active filters | dimId: string |
| `setVariableValue(varId, value)` | Set variable value | varId: string, value: string |
| `getVariables()` | Get all variables | none |
| `getVariableValues(varId)` | Get variable values | varId: string |
| `removeVariableValue(varId)` | Remove variable value | varId: string |
| `setHierarchy(dimId, hierarchyId)` | Set dimension hierarchy | dimId: string, hierarchyId: string |
| `getHierarchyLevel(dimId)` | Get current hierarchy level | dimId: string |
| `expandNode(node)` | Expand hierarchy node | node: MemberInfo |
| `collapseNode(node)` | Collapse hierarchy node | node: MemberInfo |
| `refreshData()` | Refresh data source | none |
| `setRefreshPaused(paused)` | Pause/resume auto refresh | paused: boolean |
| `getRefreshPaused()` | Check if refresh paused | none |

### MemberOptions Object

```javascript
{
    limit: number,                    // Max members to return
    offset: number,                   // Skip first N members
    accessMode: MemberAccessMode,     // MasterData, BookedValues
    search: string,                   // Search string
    hierarchyId: string               // Specific hierarchy
}
```

### Filter Syntax (MDX)

```javascript
// Single member
"[Version].[parentId].&[public.Actual]"

// Multiple members using array
var members = ["2024", "2025"];
Table_1.getDataSource().setDimensionFilter("Year", members);

// Using MemberInfo objects
var memberInfos = [
    {id: "2024", description: "Year 2024"},
    {id: "2025", description: "Year 2025"}
];
Table_1.getDataSource().setDimensionFilter("Year", memberInfos);
```

---

## Planning API

Access planning functionality on tables via `getPlanning()`.

### Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `isEnabled()` | Check if planning enabled | boolean |
| `setEnabled(enabled)` | Enable/disable planning | void |
| `getPublicVersions()` | Get all public versions | PlanningPublicVersion[] |
| `getPublicVersion(versionId)` | Get specific public version | PlanningPublicVersion |
| `getPrivateVersion()` | Get current private version | PlanningPrivateVersion |
| `getPrivateVersions()` | Get all user's private versions | PlanningPrivateVersion[] |
| `getPlanningAreaInfo()` | Get planning area information | PlanningAreaInfo |
| `setUserInput(selection, value)` | Set cell value | void |
| `submitData()` | Submit pending changes | void |
| `getDataLocking()` | Get data locking object | DataLocking |

### PlanningPublicVersion Object

| Property/Method | Description |
|----------------|-------------|
| `id` | Version identifier |
| `description` | Version description |
| `isDirty()` | Check for unsaved changes |
| `startEditMode()` | Start editing (creates private copy) |
| `revert()` | Revert unpublished changes |
| `publish()` | Publish changes to public |

### PlanningPrivateVersion Object

| Property/Method | Description |
|----------------|-------------|
| `id` | Version identifier |
| `description` | Version description |
| `isDirty()` | Check for unsaved changes |
| `publish()` | Publish to source public version |
| `publishAs(newId, newDesc)` | Publish as new public version |
| `revert()` | Discard private version |

### DataLocking Object

| Method | Description |
|--------|-------------|
| `getState(selection)` | Get lock state for cells |
| `setState(selection, state)` | Set lock state (owner only) |
| `getOwners(selection)` | Get lock owners |

### DataLockingState Enumeration

| Value | Description |
|-------|-------------|
| `Open` | Data can be edited by anyone |
| `Restricted` | Only owner can edit |
| `Locked` | No edits allowed |
| `Mixed` | Mixed states in selection |

### Example: Version Management

```javascript
// Get all public versions
var versions = Table_1.getPlanning().getPublicVersions();

for (var i = 0; i < versions.length; i++) {
    console.log(versions[i].id + ": " + versions[i].description);
}

// Start edit mode on public version
var budget = Table_1.getPlanning().getPublicVersion("Budget_2025");
budget.startEditMode();

// Work with private version
var privateVer = Table_1.getPlanning().getPrivateVersion();
if (privateVer && privateVer.isDirty()) {
    privateVer.publish();
    Application.showMessage("Changes published successfully");
}
```

### Example: Data Entry with Lock Check

```javascript
// Get current selection
var selection = Table_1.getSelections()[0];

// Check if locked
var dataLocking = Table_1.getPlanning().getDataLocking();
var lockState = dataLocking.getState(selection);

if (lockState === DataLockingState.Open) {
    // Set value (use "*" prefix for factor multiplication)
    Table_1.getPlanning().setUserInput(selection, "1000");
    Table_1.getPlanning().submitData();
} else if (lockState === DataLockingState.Mixed) {
    Application.showMessage("Selection contains mixed lock states");
} else {
    Application.showMessage("Data is locked or restricted");
}
```

---

## PlanningModel API

Access planning model for master data operations.

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getMembers(dimId, options)` | Get dimension members | dimId: string, options: object |
| `getMember(dimId, memberId)` | Get single member | dimId: string, memberId: string |
| `createMembers(dimId, members)` | Create new members | dimId: string, members: MemberData[] |
| `updateMembers(dimId, members)` | Update existing members | dimId: string, members: MemberData[] |
| `deleteMembers(dimId, memberIds)` | Delete members | dimId: string, memberIds: string[] |

### PlanningModelMember Object

```javascript
{
    id: string,                    // Member ID (required)
    description: string,           // Display text
    parentId: string,              // Parent in hierarchy
    hierarchies: object,           // Hierarchy assignments
    properties: object,            // Custom properties
    responsible: string[],         // Responsible users
    readers: string[],             // Read access users
    writers: string[],             // Write access users
    dataLockingOwners: string[]    // Data locking owners
}
```

### Example: Master Data Management

```javascript
// Get all cost centers with properties
var costCenters = PlanningModel_1.getMembers("CostCenter", {
    limit: 5000
});

// Create new cost center with security
PlanningModel_1.createMembers("CostCenter", [{
    id: "CC_NEW_001",
    description: "New Cost Center",
    parentId: "CC_PARENT",
    properties: {
        "Status": "Active",
        "Region": "EMEA"
    },
    responsible: ["USER1"],
    writers: ["USER1", "USER2"],
    dataLockingOwners: ["USER1"]
}]);
```

---

## Data Actions API

Execute data actions programmatically.

### Methods

| Method | Description |
|--------|-------------|
| `execute()` | Execute synchronously |
| `executeInBackground()` | Execute asynchronously |
| `setParameterValue(paramId, value)` | Set parameter value |
| `getParameterValue(paramId)` | Get parameter value |
| `isAllMembersSelected(paramId)` | Check if all members selected |
| `setAllMembersSelected(paramId, selected)` | Select/deselect all members |

### Events

| Event | Description |
|-------|-------------|
| `onExecutionStatusUpdate` | Status changed during execution |
| `onExecutionComplete` | Execution finished |

---

## Multi Actions API

Execute multi actions for orchestrated operations.

### Methods

| Method | Description |
|--------|-------------|
| `execute()` | Execute multi action |
| `executeInBackground()` | Execute asynchronously |
| `setParameterValue(paramId, value)` | Set cross-step parameter |
| `getParameterValue(paramId)` | Get parameter value |
| `isAllMembersSelected(paramId)` | Check if all members selected |
| `setAllMembersSelected(paramId, selected)` | Select/deselect all members |

---

## Calendar Integration API

Manage planning calendar tasks and processes programmatically.

### CalendarIntegration

Main entry point for calendar operations.

| Method | Description |
|--------|-------------|
| `getProcess(processId)` | Get calendar process |
| `getTask(taskId)` | Get calendar task |
| `createGeneralTask(config)` | Create general task |
| `createReviewTask(config)` | Create review task |
| `createCompositeTask(config)` | Create composite task |

### CalendarProcess

| Method | Description |
|--------|-------------|
| `getId()` | Get process ID |
| `getName()` | Get process name |
| `getDescription()` | Get process description |
| `getStatus()` | Get process status |
| `getTasks()` | Get all tasks in process |
| `activate()` | Activate process |
| `complete()` | Mark process complete |

### CalendarEvent (Base for Tasks)

| Method | Description |
|--------|-------------|
| `getId()` | Get event ID |
| `getDescription()` | Get description |
| `getStatus()` | Get current status |
| `setProgress(progress)` | Set completion progress |
| `getProgress()` | Get completion progress |
| `getAssignees()` | Get assigned users |
| `getDueDate()` | Get due date |

### CalendarCompositeTask

Supports multi-reviewer approval workflows.

| Method | Description |
|--------|-------------|
| `getReviewers()` | Get all reviewers |
| `addReviewer(userId)` | Add reviewer |
| `removeReviewer(userId)` | Remove reviewer |
| `submit()` | Submit for review |
| `approve()` | Approve task |
| `reject(comment)` | Reject with comment |

### CalendarReviewTask

| Method | Description |
|--------|-------------|
| `approve()` | Approve submission |
| `reject(comment)` | Reject with comment |
| `getReviewStatus()` | Get review status |

---

## BPC Planning Sequence API

Integrate with SAP BPC planning sequences.

### BpcPlanningSequence

| Method | Description |
|--------|-------------|
| `execute()` | Execute planning sequence |
| `openPromptDialog()` | Open variable prompt dialog |
| `getBpcPlanningSequenceDataSource()` | Get associated data source |
| `setParameterValue(paramId, value)` | Set parameter value |
| `getParameterValue(paramId)` | Get parameter value |

---

## Widget APIs

### Table Widget

| Method | Description |
|--------|-------------|
| `getPlanning()` | Get planning object |
| `getDataSource()` | Get data source |
| `getSelections()` | Get selected cells |
| `addDimensionToRows(dimId)` | Add dimension to rows |
| `addDimensionToColumns(dimId)` | Add dimension to columns |
| `removeDimension(dimId)` | Remove dimension |
| `setVisible(visible)` | Show/hide table |
| `setCompactDisplayEnabled(enabled)` | Enable compact display |
| `setZeroSuppressionEnabled(enabled)` | Enable zero suppression |
| `getNumberFormat()` | Get number format settings |
| `rankBy(measure, order, count)` | Apply ranking |
| `sortByValue(measure, order)` | Sort by measure |
| `sortByMember(dimId, order)` | Sort by member |
| `openNavigationPanel()` | Open navigation panel |
| `closeNavigationPanel()` | Close navigation panel |
| `getActiveDimensionProperties()` | Get active dimension properties |

### Chart Widget

| Method | Description |
|--------|-------------|
| `getDataSource()` | Get data source |
| `addDimension(dimId)` | Add dimension |
| `removeDimension(dimId)` | Remove dimension |
| `addMeasure(measureId)` | Add measure |
| `removeMeasure(measureId)` | Remove measure |
| `addMember(dimId, memberId)` | Add member to dimension |
| `removeMember(dimId, memberId)` | Remove member |
| `setVisible(visible)` | Show/hide chart |
| `getNumberFormat()` | Get number format |
| `setAxisScale(axis, scale)` | Set axis scale |
| `getEffectiveAxisScale(axis)` | Get effective axis scale |
| `getForecast()` | Get forecast data |
| `getDataChangeInsights()` | Get variance insights |
| `setQuickActionsVisibility(visible)` | Show/hide quick actions |
| `setContextMenuVisible(visible)` | Show/hide context menu |
| `openInNewStory()` | Open in new story |

### GeoMap Widget

| Method | Description |
|--------|-------------|
| `getLayer(layerId)` | Get map layer |
| `setContextMenuVisible(visible)` | Show/hide context menu |
| `setQuickActionsVisibility(visible)` | Show/hide quick actions |
| `openInNewStory()` | Open in new story |

### Input Controls

**Dropdown**:
| Method | Description |
|--------|-------------|
| `getSelectedKey()` | Get selected value |
| `setSelectedKey(key)` | Set selected value |
| `getSelectedText()` | Get selected text |
| `addItem(key, text)` | Add item |
| `removeItem(key)` | Remove item |
| `removeAllItems()` | Clear all items |

**ListBox** (Multi-select):
| Method | Description |
|--------|-------------|
| `getSelectedKeys()` | Get selected values |
| `setSelectedKeys(keys)` | Set selected values |
| `getSelectedTexts()` | Get selected texts |

**CheckboxGroup**:
| Method | Description |
|--------|-------------|
| `getSelectedKeys()` | Get checked items |
| `setSelectedKeys(keys)` | Set checked items |

**RadioButtonGroup**:
| Method | Description |
|--------|-------------|
| `getSelectedKey()` | Get selected option |
| `setSelectedKey(key)` | Set selected option |

**Slider/RangeSlider**:
| Method | Description |
|--------|-------------|
| `getValue()` / `getRange()` | Get current value |
| `setValue(val)` / `setRange(range)` | Set value |

**Switch**:
| Method | Description |
|--------|-------------|
| `isOn()` | Check if switch is on |
| `setOn(on)` | Set switch state |

### Container Widgets

**Panel/FlowPanel**:
| Method | Description |
|--------|-------------|
| `showBusyIndicator()` | Show busy indicator |
| `hideBusyIndicator()` | Hide busy indicator |
| `moveWidget(widget, position)` | Move widget |

**PageBook**:
| Method | Description |
|--------|-------------|
| `getPage(pageId)` | Get specific page |
| `setSelectedKey(pageId)` | Switch to page |
| `getSelectedKey()` | Get current page |

**TabStrip**:
| Method | Description |
|--------|-------------|
| `getTab(tabId)` | Get specific tab |
| `setSelectedKey(tabId)` | Switch to tab |
| `getSelectedKey()` | Get current tab |

**Popup**:
| Method | Description |
|--------|-------------|
| `open()` | Open popup |
| `close()` | Close popup |
| `setTitle(title)` | Set popup title |

---

## Advanced Analytics APIs

### DataChangeInsights

Change detection and trend analysis.

| Method | Description |
|--------|-------------|
| `compareApplicationStateWithSnapshot(date)` | Compare current with snapshot |
| `compareSnapshots(date1, date2)` | Compare two snapshots |
| `saveSnapshot()` | Save current state as snapshot |
| `listRecentSnapshotDates()` | List available snapshots |
| `openSubscriptionDialog()` | Open subscription dialog |
| `isRunBySnapshotGeneration()` | Check if run by snapshot |

### SearchToInsight

Natural language analytics.

| Method | Description |
|--------|-------------|
| `openDialog()` | Open search dialog |
| `closeDialog()` | Close search dialog |
| `applySearchToChart(query, chart)` | Apply search to chart |

**SearchToInsightMode**: `Simple`, `Advanced`

### SmartDiscovery

Automated insight generation.

| Method | Description |
|--------|-------------|
| `setDimensionSettings(settings)` | Configure dimensions |
| `setMeasureSettings(settings)` | Configure measures |
| `setFilterSettings(settings)` | Configure filters |
| `setPanelVisible(visible)` | Show/hide panel |

### Bookmarks

**BookmarkSet**:
| Method | Description |
|--------|-------------|
| `save(name)` | Save new bookmark |
| `apply(bookmarkId)` | Apply bookmark |
| `getAll()` | Get all bookmarks |
| `deleteBookmark(bookmarkId)` | Delete bookmark |
| `getAppliedBookmark()` | Get currently applied |
| `isSameAsApplicationState(bookmarkId)` | Compare with current |

---

## Export APIs

### ExportPdf

| Method | Description |
|--------|-------------|
| `setFileName(name)` | Set output file name |
| `setPageSize(size)` | Set page size (A4, A3, Letter, etc.) |
| `setPageOrientation(orientation)` | Portrait or Landscape |
| `setHeaderText(text)` | Set header text |
| `setFooterText(text)` | Set footer text |
| `exportReport()` | Export as PDF |
| `exportView()` | Export current view |

### ExportExcel

| Method | Description |
|--------|-------------|
| `setFileName(name)` | Set output file name |
| `isExportFormattedValues()` | Check if exporting formatted |
| `setIndentedHierarchy(enabled)` | Enable indented hierarchy |
| `exportReport()` | Export as Excel |

### ExportCsv

| Method | Description |
|--------|-------------|
| `setFileName(name)` | Set output file name |
| `setScope(scope)` | Set export scope |
| `isHierarchyLevelsInIndividualCells()` | Check hierarchy export |
| `exportReport()` | Export as CSV |

### ExportPptx

| Method | Description |
|--------|-------------|
| `setFileName(name)` | Set output file name |
| `setPageRange(range)` | Set pages to export |
| `isAppendixVisible()` | Check appendix setting |
| `exportView()` | Export as PowerPoint |

---

## Utility Classes

### ConvertUtils

| Method | Description |
|--------|-------------|
| `stringToInteger(str)` | Convert string to integer |
| `stringToNumber(str)` | Convert string to float |
| `numberToString(num)` | Convert number to string |

### ArrayUtils

| Method | Description |
|--------|-------------|
| `create(type, size)` | Create typed array |

### StringUtils

| Method | Description |
|--------|-------------|
| `replaceAll(str, search, replace)` | Replace all occurrences |

### NavigationUtils

| Method | Description |
|--------|-------------|
| `openStory(storyId)` | Open another story |
| `createStoryUrl(storyId)` | Create story URL |
| `openApplication(appId)` | Open another application |
| `createApplicationUrl(appId)` | Create application URL |
| `openDataAnalyzer(config)` | Open Data Analyzer |
| `openUrl(url)` | Open external URL |

### DateFormat

```javascript
// Format date
var formatted = DateFormat.format(new Date(), "yyyy-MM-dd");
```

### NumberFormat

| Property | Values |
|----------|--------|
| `scaleUnit` | Thousand, Million, Billion, AutoFormatted, Unformatted |
| `scaleFormat` | Short, Long, Default |
| `signDisplay` | Default, MinusAsPrefix, MinusAsParentheses, PlusMinusAsPrefix |

### TimeRange

| Method | Description |
|--------|-------------|
| `create(start, end, granularity)` | Create time range |
| `createMonthRange(year, month)` | Create month range |
| `createWeekRange(year, week)` | Create week range |
| `createYearRange(year)` | Create year range |

**Granularity**: Day, Month, Year, Hour, Minute, Second, Quarter, HalfYear, Millisecond

---

## Data Types and Structures

### DimensionInfo

```javascript
{
    id: string,
    description: string,
    modelId: string
}
```

### MemberInfo

```javascript
{
    id: string,
    displayId: string,
    description: string,
    dimensionId: string,
    properties: object
}
```

### ResultMemberInfo

```javascript
{
    id: string,
    parentId: string,
    description: string,
    properties: object
}
```

### DataCell

```javascript
{
    rawValue: number,
    formattedValue: string
}
```

### Filter Values

**SingleFilterValue**:
```javascript
{ value: string, description: string, exclude: boolean }
```

**MultipleFilterValue**:
```javascript
{ values: string[], descriptions: string[], exclude: boolean }
```

**RangeFilterValue**:
```javascript
{
    from: any, to: any,
    greater: boolean, greaterOrEqual: boolean,
    less: boolean, lessOrEqual: boolean
}
```

---

## Enumerations

### ApplicationMode
`View`, `Present`, `Embed`

### ApplicationMessageType
`Info`, `Success`, `Warning`, `Error`

### MemberAccessMode
`MasterData`, `BookedValues`

### DataLockingState
`Open`, `Restricted`, `Locked`, `Mixed`

### SortOrder
`Ascending`, `Descending`, `Default`

### RankOrder
`Top`, `Bottom`

### ForecastType
`Auto`, `None`, `TripleExponentialSmoothing`

### ExportScope
`PointOfView`, `All`

### PageOrientation
`Portrait`, `Landscape`

### PageSize
`A4`, `A3`, `A5`, `Letter`, `Legal`, `Auto`

### MemberDisplayMode
`DisplayId`, `Description`, `DisplayIdAndDescription`

### Direction
`Horizontal`, `Vertical`

### DeviceOrientation
`Angle0`, `Angle90Clockwise`, `Angle180`, `Angle90Counterclockwise`

### LayoutUnit
`Pixel`, `Percent`, `Grid`, `Auto`

---

## Quick Reference Cheat Sheet

```javascript
// === APPLICATION ===
Application.showBusyIndicator();
Application.hideBusyIndicator();
Application.showMessage("text", ApplicationMessageType.Success);
Application.getUserInfo();
Application.getTeamsInfo();
Application.sendNotification({title: "Alert", receivers: ["USER1"]});

// === DATA SOURCE ===
Table_1.getDataSource().getDimensions();
Table_1.getDataSource().getHierarchies("CostCenter");
Table_1.getDataSource().getMembers("Dim", {accessMode: MemberAccessMode.BookedValues});
Table_1.getDataSource().setDimensionFilter("Dim", "value");
Table_1.getDataSource().removeDimensionFilter("Dim");
Table_1.getDataSource().setRefreshPaused(true);

// === PLANNING ===
Table_1.getPlanning().isEnabled();
Table_1.getPlanning().getPublicVersions();
Table_1.getPlanning().getPrivateVersion();
Table_1.getPlanning().getPlanningAreaInfo();
Table_1.getPlanning().setUserInput(selection, "value");
Table_1.getPlanning().submitData();

// === VERSION MANAGEMENT ===
var publicVer = Table_1.getPlanning().getPublicVersion("Budget");
publicVer.startEditMode();
publicVer.isDirty();
publicVer.publish();

var privateVer = Table_1.getPlanning().getPrivateVersion();
privateVer.publish();
privateVer.publishAs("Budget_v2", "Revised Budget");

// === DATA LOCKING ===
var dataLocking = Table_1.getPlanning().getDataLocking();
var state = dataLocking.getState(selection);
// States: Open, Restricted, Locked, Mixed
dataLocking.setState(selection, DataLockingState.Locked);

// === PLANNING MODEL ===
PlanningModel_1.getMembers("Dim");
PlanningModel_1.createMembers("Dim", [{id: "X", description: "Y"}]);
PlanningModel_1.updateMembers("Dim", [{id: "X", description: "Z"}]);
PlanningModel_1.deleteMembers("Dim", ["X"]);

// === DATA ACTIONS ===
DataAction_1.setParameterValue("Param", "Value");
DataAction_1.execute();
DataAction_1.executeInBackground();

// === MULTI ACTIONS ===
MultiAction_1.setParameterValue("Param", "Value");
MultiAction_1.execute();

// === EXPORTS ===
ExportPdf.setFileName("report");
ExportPdf.setPageOrientation(PageOrientation.Landscape);
ExportPdf.exportReport();

// === CONVERSIONS ===
ConvertUtils.stringToInteger("123");
ConvertUtils.numberToString(123);
```

---

**Documentation Links**:
- Full API Reference (2025.23): https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/2025.23/en-US/index.html
- SAP Analytics Cloud Help: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD
- SAP Community: https://community.sap.com/topics/sap-analytics-cloud
