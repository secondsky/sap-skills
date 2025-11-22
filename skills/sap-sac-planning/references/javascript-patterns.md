# SAP Analytics Cloud - JavaScript Patterns for Planning

**Sources**:
- https://www.denisreis.com/sap-analytics-cloud-javascript-api-code-snippets/
- https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Application Patterns](#application-patterns)
2. [Member Filtering Patterns](#member-filtering-patterns)
3. [Data Entry Patterns](#data-entry-patterns)
4. [Version Management Patterns](#version-management-patterns)
5. [Data Action Patterns](#data-action-patterns)
6. [Navigation Patterns](#navigation-patterns)
7. [Error Handling Patterns](#error-handling-patterns)
8. [Performance Patterns](#performance-patterns)

---

## Application Patterns

### Application Initialization

```javascript
// onInitialization event
Application.showBusyIndicator();

try {
    // Set default filters
    var currentYear = new Date().getFullYear().toString();
    Table_1.getDataSource().setDimensionFilter("Year", currentYear);

    // Get user info for personalization
    var userInfo = Application.getUserInfo();
    Text_Welcome.setText("Welcome, " + userInfo.displayName);

    // Load user preferences from app state
    loadUserPreferences();

} catch (e) {
    console.log("Initialization error: " + e.message);
} finally {
    Application.hideBusyIndicator();
}
```

### Show/Hide Busy Indicator

```javascript
// Wrap long operations
function performLongOperation() {
    Application.showBusyIndicator();

    // Do work...
    processData();

    Application.hideBusyIndicator();
}

// With error handling
function safeOperation() {
    Application.showBusyIndicator();
    try {
        riskyOperation();
    } catch (e) {
        Application.showMessage("Error: " + e.message);
    } finally {
        Application.hideBusyIndicator();
    }
}
```

### Message Handling

```javascript
// Simple toast message
Application.showMessage("Operation completed successfully");

// For critical messages, use custom dialog
function showErrorDialog(title, message) {
    // Assuming Dialog_Error is a popup widget
    Text_ErrorTitle.setText(title);
    Text_ErrorMessage.setText(message);
    Popup_Error.open();
}
```

---

## Member Filtering Patterns

### Find Active Member by Attribute

```javascript
// Find version marked as "Active" in master data
function findActivePlanVersion() {
    var allVersions = PlanningModel_1.getMembers("Version");

    for (var i = 0; i < allVersions.length; i++) {
        if (allVersions[i].properties.Active === "X") {
            return allVersions[i].id;
        }
    }
    return null; // No active version found
}

// Usage
var activeVersion = findActivePlanVersion();
if (activeVersion) {
    Table_1.getDataSource().setDimensionFilter("Version",
        "[Version].[parentId].&[public." + activeVersion + "]");
}
```

### Get Booked Values Only

```javascript
// Performance optimization: only get members with data
var bookedAccounts = Table_1.getDataSource().getMembers("Account", {
    accessMode: MemberAccessMode.BookedValues
});

console.log("Found " + bookedAccounts.length + " accounts with data");
```

### Filter by Property Value

```javascript
// Get all cost centers for a specific region
function getCostCentersByRegion(region) {
    var allCCs = PlanningModel_1.getMembers("CostCenter", {
        limit: 10000
    });

    var regionCCs = [];
    for (var i = 0; i < allCCs.length; i++) {
        if (allCCs[i].properties.Region === region) {
            regionCCs.push(allCCs[i].id);
        }
    }
    return regionCCs;
}

// Apply as filter
var emeaCCs = getCostCentersByRegion("EMEA");
Table_1.getDataSource().setDimensionFilter("CostCenter", emeaCCs);
```

### Dynamic Planning Cycle Filter

```javascript
// Set filter based on active planning cycle from master data
function setActivePlanningCycleFilter() {
    Application.showBusyIndicator();
    Table_1.setVisible(false);

    var cycles = PlanningModel_1.getMembers("PlanningCycle");
    var activeCycle = "";

    for (var i = 0; i < cycles.length; i++) {
        if (cycles[i].properties.Flag === "PC+0") {
            activeCycle = cycles[i].id;
            break;
        }
    }

    if (activeCycle) {
        // MDX filter syntax
        Table_1.getDataSource().setDimensionFilter("Date",
            "[Date].[YQM].&[" + activeCycle + "]");
    }

    Table_1.setVisible(true);
    Application.hideBusyIndicator();
}
```

### Populate Dropdown from Members

```javascript
// Fill dropdown with dimension members
function populateDropdown(dropdown, dimensionId, filterProperty, filterValue) {
    dropdown.removeAllItems();

    var members = PlanningModel_1.getMembers(dimensionId, {limit: 1000});

    for (var i = 0; i < members.length; i++) {
        var member = members[i];

        // Optional: filter by property
        if (filterProperty && member.properties[filterProperty] !== filterValue) {
            continue;
        }

        dropdown.addItem(member.id, member.description || member.id);
    }
}

// Usage
populateDropdown(Dropdown_CostCenter, "CostCenter", "Status", "Active");
```

---

## Data Entry Patterns

### Check Planning Enabled

```javascript
// Verify planning is enabled before operations
function verifyPlanningEnabled() {
    var planning = Table_1.getPlanning();

    if (!planning || !planning.isEnabled()) {
        Application.showMessage("Planning is not enabled for this table");
        return false;
    }
    return true;
}
```

### Set Cell Value

```javascript
// Set value for selected cell
function setSelectedCellValue(value) {
    if (!verifyPlanningEnabled()) return;

    var selections = Table_1.getSelections();
    if (selections.length === 0) {
        Application.showMessage("Please select a cell first");
        return;
    }

    var selection = selections[0];

    // Check data locking
    var dataLocking = Table_1.getPlanning().getDataLocking();
    var lockState = dataLocking.getState(selection);

    if (lockState === DataLockingState.Locked) {
        Application.showMessage("This cell is locked and cannot be edited");
        return;
    }

    // Set the value
    Table_1.getPlanning().setUserInput(selection, value.toString());
}
```

### Apply Factor to Value

```javascript
// Multiply existing value by factor
function applyFactor(factor) {
    if (!verifyPlanningEnabled()) return;

    var selection = Table_1.getSelections()[0];
    if (!selection) return;

    // Prefix with "*" to multiply
    Table_1.getPlanning().setUserInput(selection, "*" + factor.toString());
}

// Usage: increase by 10%
applyFactor(1.1);
```

### Submit Data Changes

```javascript
// Submit pending changes
function submitPlanningData() {
    if (!verifyPlanningEnabled()) return;

    Application.showBusyIndicator();

    try {
        Table_1.getPlanning().submitData();
        Application.showMessage("Data submitted successfully");
    } catch (e) {
        Application.showMessage("Submit failed: " + e.message);
    } finally {
        Application.hideBusyIndicator();
    }
}
```

### Bulk Data Entry

```javascript
// Set values for multiple cells
function setBulkValues(valueMap) {
    // valueMap: [{selection: {...}, value: "100"}, ...]

    Application.showBusyIndicator();

    var planning = Table_1.getPlanning();
    var successCount = 0;
    var errorCount = 0;

    for (var i = 0; i < valueMap.length; i++) {
        try {
            planning.setUserInput(valueMap[i].selection, valueMap[i].value);
            successCount++;
        } catch (e) {
            errorCount++;
            console.log("Error setting value: " + e.message);
        }
    }

    // Submit all changes at once
    planning.submitData();

    Application.showMessage("Set " + successCount + " values, " + errorCount + " errors");
    Application.hideBusyIndicator();
}
```

---

## Version Management Patterns

### Get All Versions

```javascript
// List all available versions
function listVersions() {
    var planning = Table_1.getPlanning();

    console.log("=== Public Versions ===");
    var publicVersions = planning.getPublicVersions();
    for (var i = 0; i < publicVersions.length; i++) {
        console.log(publicVersions[i].id + ": " + publicVersions[i].description);
    }

    console.log("=== Private Versions ===");
    var privateVersions = planning.getPrivateVersions();
    for (var j = 0; j < privateVersions.length; j++) {
        console.log(privateVersions[j].id + ": " + privateVersions[j].description);
    }
}
```

### Publish Version

```javascript
// Publish private version or edit mode
function publishVersion() {
    var planning = Table_1.getPlanning();
    var privateVersion = planning.getPrivateVersion();

    if (!privateVersion) {
        Application.showMessage("No private version to publish");
        return;
    }

    if (!privateVersion.isDirty()) {
        Application.showMessage("No changes to publish");
        return;
    }

    Application.showBusyIndicator();

    try {
        privateVersion.publish();
        Application.showMessage("Version published successfully");
    } catch (e) {
        Application.showMessage("Publish failed: " + e.message);
    } finally {
        Application.hideBusyIndicator();
    }
}
```

### Publish As New Version

```javascript
// Create new public version from private
function publishAsNewVersion(newVersionId, newDescription) {
    var planning = Table_1.getPlanning();
    var privateVersion = planning.getPrivateVersion();

    if (!privateVersion) {
        Application.showMessage("No private version available");
        return;
    }

    Application.showBusyIndicator();

    try {
        privateVersion.publishAs(newVersionId, newDescription);
        Application.showMessage("New version '" + newVersionId + "' created");
    } catch (e) {
        Application.showMessage("Publish As failed: " + e.message);
    } finally {
        Application.hideBusyIndicator();
    }
}

// Usage
publishAsNewVersion("Budget_2025_v2", "Revised Budget 2025");
```

### Revert Changes

```javascript
// Discard all changes
function revertChanges() {
    var planning = Table_1.getPlanning();
    var privateVersion = planning.getPrivateVersion();

    if (!privateVersion) {
        Application.showMessage("No private version to revert");
        return;
    }

    // Confirm before reverting
    // (In real app, use custom confirmation dialog)
    privateVersion.revert();
    Application.showMessage("Changes reverted");
}
```

### Version Selection UI

```javascript
// Populate version dropdown and handle selection
function setupVersionSelector() {
    var planning = Table_1.getPlanning();
    var versions = planning.getPublicVersions();

    Dropdown_Version.removeAllItems();
    for (var i = 0; i < versions.length; i++) {
        Dropdown_Version.addItem(versions[i].id, versions[i].description);
    }
}

// onSelect event for Dropdown_Version
function onVersionSelected() {
    var selectedVersion = Dropdown_Version.getSelectedKey();

    Table_1.getDataSource().setDimensionFilter("Version",
        "[Version].[parentId].&[public." + selectedVersion + "]");
}
```

---

## Data Action Patterns

### Execute with Parameters

```javascript
// Execute data action with parameters
function executeDataAction() {
    // Set parameters
    DataAction_Copy.setParameterValue("SourceVersion", "Actual");
    DataAction_Copy.setParameterValue("TargetVersion", Dropdown_TargetVersion.getSelectedKey());
    DataAction_Copy.setParameterValue("Year", InputField_Year.getValue());

    Application.showBusyIndicator();
    DataAction_Copy.execute();
}

// In onExecutionComplete event
function onDataActionComplete() {
    Application.hideBusyIndicator();
    Application.showMessage("Data action completed");
    Application.refreshData();
}
```

### Execute in Background

```javascript
// Non-blocking execution for long-running actions
function executeInBackground() {
    DataAction_LargeCalculation.setParameterValue("Scope", "ALL");
    DataAction_LargeCalculation.executeInBackground();

    Application.showMessage("Data action started in background");
}

// Monitor status in onExecutionStatusUpdate event
function onStatusUpdate(status) {
    // status can be: Running, Success, Failed, Cancelled
    console.log("Status: " + status);

    if (status === "Success" || status === "Failed") {
        Application.refreshData();
    }
}
```

### Conditional Execution

```javascript
// Execute different actions based on conditions
function executeConditionalAction() {
    var selectedAction = Dropdown_ActionType.getSelectedKey();
    var targetVersion = Dropdown_Version.getSelectedKey();

    switch (selectedAction) {
        case "COPY":
            DataAction_Copy.setParameterValue("TargetVersion", targetVersion);
            DataAction_Copy.execute();
            break;
        case "ALLOCATE":
            DataAction_Allocate.setParameterValue("TargetVersion", targetVersion);
            DataAction_Allocate.execute();
            break;
        case "CLEAR":
            DataAction_Clear.setParameterValue("TargetVersion", targetVersion);
            DataAction_Clear.execute();
            break;
        default:
            Application.showMessage("Unknown action type");
    }
}
```

---

## Navigation Patterns

### Open Another Story

```javascript
// Navigate to detail story with context
function openDetailStory(entityId) {
    // Pass parameters via URL
    var storyId = "story_id_here";
    var params = "?p_entity=" + entityId;

    NavigationUtils.openStory(storyId + params);
}
```

### Open External URL

```javascript
// Open SAP documentation
function openDocumentation() {
    NavigationUtils.openUrl(
        "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD"
    );
}
```

### Refresh Data

```javascript
// Refresh all data sources after external changes
function refreshAllData() {
    Application.showBusyIndicator();
    Application.refreshData();
    Application.hideBusyIndicator();
    Application.showMessage("Data refreshed");
}
```

---

## Error Handling Patterns

### Try-Catch Pattern

```javascript
// Wrap risky operations
function safeOperation() {
    try {
        riskyFunction();
        Application.showMessage("Success");
    } catch (error) {
        console.log("Error: " + error.message);
        Application.showMessage("Operation failed: " + error.message);
    }
}
```

### Validation Pattern

```javascript
// Validate before operation
function validateAndExecute() {
    // Check required selections
    var selection = Table_1.getSelections();
    if (selection.length === 0) {
        Application.showMessage("Please select data first");
        return false;
    }

    // Check required inputs
    var year = InputField_Year.getValue();
    if (!year || year.length !== 4) {
        Application.showMessage("Please enter valid year (YYYY)");
        return false;
    }

    // Check planning enabled
    if (!Table_1.getPlanning().isEnabled()) {
        Application.showMessage("Planning not enabled");
        return false;
    }

    // All validations passed
    executeAction();
    return true;
}
```

### Null Check Pattern

```javascript
// Handle potentially null objects
function safeGetVersion() {
    var planning = Table_1.getPlanning();
    if (!planning) {
        console.log("Planning object not available");
        return null;
    }

    var privateVersion = planning.getPrivateVersion();
    if (!privateVersion) {
        console.log("No private version exists");
        return null;
    }

    return privateVersion;
}
```

---

## Performance Patterns

### Limit Member Retrieval

```javascript
// Always set limit for getMembers
var members = PlanningModel_1.getMembers("CostCenter", {
    limit: 5000  // Don't load unlimited members
});

// Use offset for pagination
var page2 = PlanningModel_1.getMembers("CostCenter", {
    limit: 1000,
    offset: 1000
});
```

### Cache Member Lists

```javascript
// Store frequently used member lists
var memberCache = {};

function getCachedMembers(dimensionId) {
    if (!memberCache[dimensionId]) {
        memberCache[dimensionId] = PlanningModel_1.getMembers(dimensionId, {
            limit: 10000
        });
    }
    return memberCache[dimensionId];
}

// Clear cache when model changes
function clearMemberCache() {
    memberCache = {};
}
```

### Batch UI Updates

```javascript
// Hide table during batch updates
function batchUpdate() {
    Table_1.setVisible(false);
    Application.showBusyIndicator();

    // Perform multiple operations
    updateFilters();
    updateSorting();
    updateFormatting();

    Table_1.setVisible(true);
    Application.hideBusyIndicator();
}
```

### Debounce Pattern

```javascript
// Avoid rapid repeated calls (pseudo-code concept)
var debounceTimer = null;

function debouncedSearch(searchTerm) {
    // Clear previous timer
    if (debounceTimer) {
        // In SAC, you'd use a different approach
        // as clearTimeout isn't directly available
    }

    // Delay execution
    // Note: SAC doesn't have setTimeout, use onTimeout event instead
    performSearch(searchTerm);
}
```

---

## Utility Patterns

### Type Conversion

```javascript
// Convert string to integer
var planningCycle = "2025";
var cycleNumber = ConvertUtils.stringToInteger(planningCycle);
cycleNumber++;
var nextCycle = ConvertUtils.numberToString(cycleNumber); // "2026"
```

### Date Formatting

```javascript
// Format current date
var today = new Date();
var formatted = DateFormat.format(today, "yyyy-MM-dd");
console.log("Today: " + formatted);
```

### Number Formatting

```javascript
// Format currency value
var amount = 1234567.89;
var formatted = NumberFormat.format(amount, "#,##0.00");
console.log("Amount: " + formatted); // "1,234,567.89"
```

### Array Operations

```javascript
// Check if array contains value
var selectedItems = ["A", "B", "C"];
if (ArrayUtils.contains(selectedItems, "B")) {
    console.log("B is selected");
}

// Find index
var index = ArrayUtils.indexOf(selectedItems, "C"); // 2
```

---

## Complete Example: Budget Entry Application

```javascript
// === onInitialization Event ===
Application.showBusyIndicator();

// Set default version
var versions = Table_Budget.getPlanning().getPublicVersions();
for (var i = 0; i < versions.length; i++) {
    Dropdown_Version.addItem(versions[i].id, versions[i].description);
}

// Set current year
var currentYear = new Date().getFullYear().toString();
InputField_Year.setValue(currentYear);

// Load user's cost centers
var userInfo = Application.getUserInfo();
loadUserCostCenters(userInfo.userId);

Application.hideBusyIndicator();


// === Version Selection ===
function onVersionSelected() {
    var version = Dropdown_Version.getSelectedKey();
    Table_Budget.getDataSource().setDimensionFilter("Version",
        "[Version].[parentId].&[public." + version + "]");
}


// === Save Button ===
function onSaveClick() {
    if (!Table_Budget.getPlanning().isEnabled()) {
        Application.showMessage("Planning not enabled");
        return;
    }

    Application.showBusyIndicator();

    try {
        Table_Budget.getPlanning().submitData();
        Application.showMessage("Budget saved successfully");
    } catch (e) {
        Application.showMessage("Save failed: " + e.message);
    } finally {
        Application.hideBusyIndicator();
    }
}


// === Publish Button ===
function onPublishClick() {
    var privateVer = Table_Budget.getPlanning().getPrivateVersion();

    if (!privateVer || !privateVer.isDirty()) {
        Application.showMessage("No changes to publish");
        return;
    }

    Application.showBusyIndicator();

    try {
        privateVer.publish();
        Application.showMessage("Budget published successfully");
    } catch (e) {
        Application.showMessage("Publish failed: " + e.message);
    } finally {
        Application.hideBusyIndicator();
    }
}


// === Apply Growth Rate ===
function onApplyGrowthClick() {
    var growthRate = ConvertUtils.stringToNumber(InputField_GrowthRate.getValue());

    if (isNaN(growthRate)) {
        Application.showMessage("Invalid growth rate");
        return;
    }

    var factor = 1 + (growthRate / 100);

    var selections = Table_Budget.getSelections();
    if (selections.length === 0) {
        Application.showMessage("Select cells to apply growth");
        return;
    }

    Application.showBusyIndicator();

    for (var i = 0; i < selections.length; i++) {
        Table_Budget.getPlanning().setUserInput(selections[i], "*" + factor);
    }

    Table_Budget.getPlanning().submitData();
    Application.showMessage("Growth rate applied");
    Application.hideBusyIndicator();
}
```

---

**Documentation Links**:
- API Reference: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html
- Code Snippets Blog: https://www.denisreis.com/sap-analytics-cloud-javascript-api-code-snippets/
- SAP Community Scripting: https://community.sap.com/t5/technology-blog-posts-by-sap/start-your-scripting-journey-the-easy-way-with-sap-analytics-cloud-part/ba-p/13582659
