/**
 * SAP Analytics Cloud - Common Scripting Patterns
 *
 * Ready-to-use code patterns for SAC Analytics Designer and Optimized Story Experience.
 * Copy and adapt these patterns to your application.
 *
 * Source: SAP Analytics Cloud Scripting Skill
 * Version: 2025.14+
 */

// =============================================================================
// FILTERING PATTERNS
// =============================================================================

/**
 * Pattern 1: Apply filter from chart selection to table
 * Use in: Chart.onSelect event
 */
function filterTableFromChartSelection() {
    var selections = Chart_1.getSelections();
    if (selections.length > 0) {
        var selectedMember = selections[0]["{{DimensionId}}"];
        Table_1.getDataSource().setDimensionFilter("{{DimensionId}}", selectedMember);
    }
}

/**
 * Pattern 2: Apply multiple filters efficiently (batch)
 * Use when: Setting multiple filters at once
 */
function applyMultipleFilters(year, region, product) {
    var ds = Chart_1.getDataSource();

    // Pause to prevent multiple refreshes
    ds.setRefreshPaused(true);

    ds.setDimensionFilter("Year", year);
    ds.setDimensionFilter("Region", region);
    ds.setDimensionFilter("Product", product);

    // Single refresh
    ds.setRefreshPaused(false);
}

/**
 * Pattern 3: Sync filters across multiple widgets
 * Use when: Multiple charts/tables should have same filters
 */
function syncFiltersAcrossWidgets() {
    var sourceDs = Chart_1.getDataSource();

    // Copy all filters efficiently
    Table_1.getDataSource().copyDimensionFilterFrom(sourceDs);
    Chart_2.getDataSource().copyDimensionFilterFrom(sourceDs);
}

/**
 * Pattern 4: Reset all filters
 * Use in: Reset button onClick event
 */
function resetAllFilters() {
    var widgets = [Chart_1, Table_1, Chart_2];

    widgets.forEach(function(widget) {
        widget.getDataSource().clearAllFilters();
    });

    // Reset dropdowns
    Dropdown_Year.setSelectedKey("");
    Dropdown_Region.setSelectedKey("");
}

/**
 * Pattern 5: Filter from dropdown selection
 * Use in: Dropdown.onSelect event
 */
function filterFromDropdown() {
    var selectedYear = Dropdown_Year.getSelectedKey();

    if (selectedYear) {
        Application.showBusyIndicator();

        Chart_1.getDataSource().setDimensionFilter("Year", selectedYear);
        Table_1.getDataSource().setDimensionFilter("Year", selectedYear);

        Application.hideBusyIndicator();
    }
}


// =============================================================================
// DATA ACCESS PATTERNS
// =============================================================================

/**
 * Pattern 6: Find active version from attribute
 * Use when: Need to identify active planning cycle/version from master data
 */
function findActiveVersion() {
    var allVersions = PlanningModel_1.getMembers("Version");
    var activeVersion = null;

    for (var i = 0; i < allVersions.length; i++) {
        if (allVersions[i].properties.Active === "X") {
            activeVersion = allVersions[i].id;
            break;
        }
    }

    console.log("Active Version: " + activeVersion);
    return activeVersion;
}

/**
 * Pattern 7: Get booked values only (not all master data)
 * Use when: Need only members that have data, not entire master data list
 */
function getBookedValuesOnly() {
    var bookedMembers = Table_1.getDataSource().getMembers(
        "{{DimensionId}}",
        { accessMode: MemberAccessMode.BookedValues }
    );

    console.log("Booked members:", bookedMembers);
    return bookedMembers;
}

/**
 * Pattern 8: Get data value for specific selection
 * Use when: Need to read specific cell value
 */
function getSpecificDataValue() {
    var selection = {
        "@MeasureDimension": "[Account].[parentId].&[Revenue]",
        "Location": "[Location].[Country].&[US]",
        "Year": "[Date].[Year].&[2024]"
    };

    var data = Chart_1.getDataSource().getData(selection);

    console.log("Formatted:", data.formattedValue);
    console.log("Raw:", data.rawValue);

    return data;
}


// =============================================================================
// CHART MANIPULATION PATTERNS
// =============================================================================

/**
 * Pattern 9: Dynamic measure swap
 * Use in: Button onClick or Dropdown onSelect
 */
function swapMeasure(newMeasureId) {
    // Get current measure
    var currentMeasures = Chart_1.getMembers(Feed.ValueAxis);

    // Remove current measure
    if (currentMeasures.length > 0) {
        Chart_1.removeMember(Feed.ValueAxis, currentMeasures[0]);
    }

    // Add new measure
    Chart_1.addMember(Feed.ValueAxis, newMeasureId);
}

/**
 * Pattern 10: Dynamic dimension swap
 * Use when: Changing chart axis dimension
 */
function swapDimension(newDimensionId) {
    // Get current dimension
    var currentDimensions = Chart_1.getMembers(Feed.CategoryAxis);

    // Remove current
    if (currentDimensions.length > 0) {
        Chart_1.removeDimension(Feed.CategoryAxis, currentDimensions[0]);
    }

    // Add new
    Chart_1.addDimension(Feed.CategoryAxis, newDimensionId);
}

/**
 * Pattern 11: Top N ranking
 * Use when: Show only top performers
 */
function showTopN(n, measureId) {
    Chart_1.rankBy(measureId, n, SortOrder.Descending);
}


// =============================================================================
// VISIBILITY TOGGLE PATTERNS
// =============================================================================

/**
 * Pattern 12: Switch between chart and table
 * Use in: Toggle button onClick event
 */
function switchChartTable(showChart) {
    Chart_1.setVisible(showChart);
    Table_1.setVisible(!showChart);

    Button_ShowChart.setVisible(!showChart);
    Button_ShowTable.setVisible(showChart);
}

/**
 * Pattern 13: Expandable panel pattern
 * Use when: Toggle detail section visibility
 */
function toggleDetailPanel() {
    var isVisible = Panel_Details.isVisible();
    Panel_Details.setVisible(!isVisible);

    // Update button text
    if (isVisible) {
        Button_Toggle.setText("Show Details");
    } else {
        Button_Toggle.setText("Hide Details");
    }
}


// =============================================================================
// USER FEEDBACK PATTERNS
// =============================================================================

/**
 * Pattern 14: Long operation with busy indicator
 * Use when: Performing operations that take time
 */
function performLongOperation() {
    Application.showBusyIndicator();

    try {
        // Perform operation
        Table_1.getDataSource().refreshData();
        Chart_1.getDataSource().refreshData();

        Application.showMessage(
            ApplicationMessageType.Success,
            "Data refreshed successfully"
        );
    } catch (error) {
        console.log("Error:", error);
        Application.showMessage(
            ApplicationMessageType.Error,
            "Failed to refresh data"
        );
    } finally {
        Application.hideBusyIndicator();
    }
}

/**
 * Pattern 15: Confirmation popup pattern
 * Use when: Confirming destructive actions
 */
// In main button onClick:
function showConfirmation() {
    Popup_Confirm.open();
}

// In popup Yes button onClick:
function onConfirmYes() {
    Popup_Confirm.close();
    performAction();
}

// In popup No button onClick:
function onConfirmNo() {
    Popup_Confirm.close();
}


// =============================================================================
// SELECTION HANDLING PATTERNS
// =============================================================================

/**
 * Pattern 16: Handle multi-selection from table
 * Use in: Table.onSelect event
 */
function handleMultiSelection() {
    var selections = Table_1.getSelections();

    if (selections.length === 0) {
        Application.showMessage(
            ApplicationMessageType.Warning,
            "Please select at least one row"
        );
        return;
    }

    // Process all selections
    var selectedIds = selections.map(function(sel) {
        return sel["{{DimensionId}}"];
    });

    console.log("Selected IDs:", selectedIds);

    // Apply as filter (if single value needed)
    if (selections.length === 1) {
        Chart_1.getDataSource().setDimensionFilter(
            "{{DimensionId}}",
            selectedIds[0]
        );
    }
}

/**
 * Pattern 17: Clear selection
 * Use when: Need to programmatically clear widget selection
 */
function clearSelection() {
    Chart_1.getDataSource().removeDimensionFilter("{{DimensionId}}");
    Table_1.getDataSource().removeDimensionFilter("{{DimensionId}}");
}


// =============================================================================
// INITIALIZATION PATTERNS
// =============================================================================

/**
 * Pattern 18: Set initial filters from URL parameters
 * Prerequisites:
 * - Create global variable with p_ prefix (e.g., p_year)
 * - URL: ?p_year=2024&p_region=EMEA
 */
// In Script Object (not onInitialization):
function applyUrlParameters() {
    if (p_year) {
        Chart_1.getDataSource().setDimensionFilter("Year", p_year);
        Dropdown_Year.setSelectedKey(p_year);
    }

    if (p_region) {
        Chart_1.getDataSource().setDimensionFilter("Region", p_region);
        Dropdown_Region.setSelectedKey(p_region);
    }
}

/**
 * Pattern 19: Dynamic title update
 * Use when: Title should reflect current filters
 */
function updateDynamicTitle() {
    var year = Dropdown_Year.getSelectedKey() || "All Years";
    var region = Dropdown_Region.getSelectedKey() || "All Regions";

    Text_Title.setText("Sales Report - " + year + " | " + region);
}


// =============================================================================
// DEBUGGING PATTERNS
// =============================================================================

/**
 * Pattern 20: Debug logging helper
 * Use during development
 */
function debugLog(label, value) {
    console.log("=== " + label + " ===");
    console.log(value);
    console.log("Type:", typeof value);
    if (Array.isArray(value)) {
        console.log("Length:", value.length);
    }
}

/**
 * Pattern 21: Log all selections
 * Use when debugging selection handling
 */
function logSelections(widgetName, widget) {
    var selections = widget.getSelections();
    console.log(widgetName + " selections:");
    console.log(JSON.stringify(selections));
}


// =============================================================================
// EXPORT PATTERNS
// =============================================================================

/**
 * Pattern 22: Export with dynamic filename
 * Use in: Export button onClick
 */
function exportWithDynamicName() {
    var today = new Date().toISOString().split('T')[0];
    var year = Dropdown_Year.getSelectedKey() || "AllYears";

    Table_1.export(ExportType.Excel, {
        fileName: "SalesReport_" + year + "_" + today
    });
}

/**
 * Pattern 23: PDF export with header/footer
 * Use in: Export PDF button onClick
 */
function exportPDF() {
    var year = Dropdown_Year.getSelectedKey() || "All Years";
    var today = new Date().toLocaleDateString();

    Application.export(ExportType.PDF, {
        scope: ExportScope.All,
        header: "Sales Analysis Report - " + year,
        footer: "Generated: " + today + " | Page {page}",
        orientation: "landscape"
    });
}


// =============================================================================
// TYPE CONVERSION PATTERNS (SAC requires explicit conversion)
// =============================================================================

/**
 * Pattern 24: Explicit type conversion (required in SAC)
 * Use when: Concatenating strings with numbers
 */
function typeConversionExamples() {
    var myNumber = 42;
    var myDecimal = 3.14;
    var myBoolean = true;

    // WRONG: Auto-conversion not allowed
    // console.log("Value: " + myNumber);

    // CORRECT: Explicit conversion
    console.log("Integer: " + myNumber.toString());
    console.log("Decimal: " + myDecimal.toString());
    console.log("Boolean: " + myBoolean.toString());

    // Using ConvertUtils
    var numStr = ConvertUtils.numberToString(myNumber);
    var strNum = ConvertUtils.stringToInteger("42");
}

/**
 * Pattern 25: String formatting utilities
 * Use when: Formatting data for display
 */
function stringFormatting() {
    var value = 1234.567;

    // Fixed decimal places
    var fixed = value.toFixed(2);  // "1234.57"

    // Format number (use NumberFormat)
    var formatted = NumberFormat.format(value, "#,##0.00");

    // Date formatting
    var now = new Date();
    var dateStr = DateFormat.format(now, "yyyy-MM-dd");
    var timeStr = DateFormat.format(now, "HH:mm:ss");
}


// =============================================================================
// LOOP PATTERNS (SAC-specific requirements)
// =============================================================================

/**
 * Pattern 26: For loop with explicit iterator declaration
 * IMPORTANT: SAC requires 'var' declaration for loop iterator
 */
function forLoopPattern() {
    var members = Table_1.getDataSource().getMembers("Location", 10);

    // CORRECT: Iterator declared with var
    for (var i = 0; i < members.length; i++) {
        console.log(members[i].id + ": " + members[i].description);
    }

    // WRONG: Iterator not declared (will cause error)
    // for (i = 0; i < members.length; i++) { ... }
}

/**
 * Pattern 27: While loop pattern
 * Use when: Iterating until condition met
 */
function whileLoopPattern() {
    var count = 0;
    var maxIterations = 10;

    while (count < maxIterations) {
        console.log("Iteration: " + count.toString());
        count++;

        // Safety break condition
        if (count > 100) {
            console.log("Safety break triggered");
            break;
        }
    }
}

/**
 * Pattern 28: For-in loop for selections
 * Use when: Iterating over selection object properties
 */
function forInLoopPattern() {
    var selection = Table_1.getSelections()[0];

    if (selection) {
        console.log("Selection properties:");
        for (var propKey in selection) {
            var propValue = selection[propKey];
            console.log("  " + propKey + ": " + propValue);
        }
    }
}


// =============================================================================
// ARRAY PATTERNS
// =============================================================================

/**
 * Pattern 29: Create typed 1D array
 * Use when: Creating arrays for API calls
 */
function create1DArray() {
    // Using ArrayUtils for typed arrays
    var numberArray = ArrayUtils.create(Type.number);
    numberArray.push(1);
    numberArray.push(2);
    numberArray.push(3);

    var stringArray = ArrayUtils.create(Type.string);
    stringArray.push("A");
    stringArray.push("B");

    // Literal syntax also works
    var simpleArray = [1, 2, 3];
}

/**
 * Pattern 30: Create 2D array (matrix)
 * Use when: Building tabular data structures
 */
function create2DArray() {
    var numCols = 4;
    var numRows = 3;

    // Create first row (required for type inference)
    var firstRow = ArrayUtils.create(Type.number);
    var arr2D = [firstRow];

    // Add remaining rows
    for (var i = 1; i < numRows; i++) {
        arr2D.push(ArrayUtils.create(Type.number));
    }

    // Fill with values
    var count = 0;
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            arr2D[row][col] = count;
            count++;
        }
    }

    // Access values
    var value = arr2D[1][2];  // Row 1, Column 2
    console.log("Value at [1][2]: " + value.toString());
}


// =============================================================================
// ADVANCED FILTER PATTERNS
// =============================================================================

/**
 * Pattern 31: Exclude filter (filter OUT specific values)
 * Use when: Removing specific members from drill-down
 */
function excludeFilterPattern() {
    // Exclude single value
    DS_1.setDimensionFilter("EMPLOYEE_ID", {
        value: "230",
        exclude: true
    });

    // Exclude multiple values
    DS_1.setDimensionFilter("EMPLOYEE_ID", {
        values: ["230", "240", "250"],
        exclude: true
    });
}

/**
 * Pattern 32: Range filter (numeric dimensions only)
 * Use when: Filtering by numeric ranges
 * NOTE: Not supported for time dimensions or SAP BW
 */
function rangeFilterPattern() {
    // Between range
    DS_1.setDimensionFilter("EMPLOYEE_ID", {
        from: "100",
        to: "500"
    });

    // Less than
    DS_1.setDimensionFilter("EMPLOYEE_ID", {
        less: "100"
    });

    // Greater than or equal
    DS_1.setDimensionFilter("EMPLOYEE_ID", {
        greaterOrEqual: "500"
    });

    // Multiple ranges (OR logic)
    DS_1.setDimensionFilter("EMPLOYEE_ID", [
        { less: "100" },
        { greater: "900" }
    ]);
}

/**
 * Pattern 33: Get and process dimension filters
 * Use when: Need to read current filter state
 */
function getFilterState() {
    var filters = Table_1.getDataSource().getDimensionFilters("COUNTRY");

    for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];

        switch (filter.type) {
            case FilterValueType.Single:
                var single = cast(Type.SingleFilterValue, filter);
                console.log("Single filter: " + single.value);
                break;

            case FilterValueType.Multiple:
                var multi = cast(Type.MultipleFilterValue, filter);
                console.log("Multiple filter: " + multi.values.join(", "));
                break;

            case FilterValueType.Range:
                var range = cast(Type.RangeFilterValue, filter);
                if (range.from) {
                    console.log("Range: " + range.from + " to " + range.to);
                }
                break;
        }
    }
}


// =============================================================================
// HIERARCHY PATTERNS
// =============================================================================

/**
 * Pattern 34: Set hierarchy drill level
 * Use when: Controlling hierarchy expansion
 */
function setHierarchyLevel() {
    var ds = Table_1.getDataSource();

    // Set active hierarchy
    ds.setHierarchy("Location", "State_Hierarchy");

    // Set drill level (0 = collapsed, higher = more expanded)
    ds.setHierarchyLevel("Location", 2);

    // Get current level
    var currentLevel = ds.getHierarchyLevel("Location");
    console.log("Current level: " + currentLevel.toString());
}

/**
 * Pattern 35: Expand/collapse hierarchy nodes
 * Use when: Programmatic hierarchy manipulation
 */
function expandCollapseNode() {
    var ds = Chart_1.getDataSource();

    // Expand specific node
    ds.expandNode("Location", {
        "Location": "[Location].[State_Hierarchy].&[California]",
        "@MeasureDimension": "[Account].[parentId].&[Revenue]"
    });

    // Collapse node
    ds.collapseNode("Location", {
        "Location": "[Location].[State_Hierarchy].&[California]",
        "@MeasureDimension": "[Account].[parentId].&[Revenue]"
    });
}


// =============================================================================
// R VISUALIZATION PATTERNS
// =============================================================================

/**
 * Pattern 36: Read R environment variable from JavaScript
 * Use when: Getting calculated values from R script
 */
function readFromREnvironment() {
    // R script created: gmCorrelation <- cor(grossMargin, grossMarginPlan)

    var correlation = RVisualization_1
        .getEnvironmentValues()
        .getNumber("gmCorrelation");

    console.log("Correlation coefficient: " + correlation.toString());

    // Update text widget with R result
    Text_Correlation.setText("Correlation: " + correlation.toFixed(3));
}

/**
 * Pattern 37: Write to R environment from JavaScript
 * Use when: Passing user input to R script
 */
function writeToREnvironment() {
    // Get user selection
    var userSelection = Dropdown_1.getSelectedKey();
    var numValue = ConvertUtils.stringToInteger(userSelection);

    // Pass to R environment
    RVisualization_1
        .getInputParameters()
        .setNumber("userSelection", numValue);

    // R script can now use: userSelection variable
}


// =============================================================================
// METHOD CHAINING PATTERNS
// =============================================================================

/**
 * Pattern 38: Method chaining for concise code
 * Use when: One-time data access, debugging
 */
function methodChainingExamples() {
    // Chained logging (no intermediate variables)
    console.log(Chart_1.getDataSource().getVariables());

    // Chained filter application
    Chart_1.getDataSource().setDimensionFilter("Year", "2024");

    // Chained member access
    var firstMember = Table_1.getDataSource()
        .getMembers("Location", 1)[0];

    // When NOT to chain: need to reuse result
    var ds = Chart_1.getDataSource();  // Reuse ds
    ds.setDimensionFilter("Year", "2024");
    ds.setDimensionFilter("Region", "EMEA");
    ds.refreshData();
}


// =============================================================================
// EQUALITY COMPARISON PATTERNS
// =============================================================================

/**
 * Pattern 39: Using strict equality (recommended)
 * SAC supports === always, == only with same types
 */
function equalityComparison() {
    var aNumber = 1;
    var aString = "1";

    // CORRECT: Strict equality (always works)
    if (aNumber === 1) {
        console.log("Number equals 1");
    }

    if (aString === "1") {
        console.log("String equals '1'");
    }

    // CORRECT: Compare same types
    if (aString == "1") {
        console.log("String comparison works");
    }

    // WOULD ERROR: Different types with ==
    // if (aNumber == "1") { }  // Don't do this!
}


// =============================================================================
// DATASOURCE INFO PATTERNS
// =============================================================================

/**
 * Pattern 40: Get data source metadata
 * Use when: Need model information for logging or display
 */
function getDataSourceInfo() {
    var dsInfo = Table_1.getDataSource().getInfo();

    console.log("Model: " + dsInfo.modelName);
    console.log("Model ID: " + dsInfo.modelId);
    console.log("Description: " + dsInfo.modelDescription);

    // SAP BW only properties
    if (dsInfo.sourceName !== undefined) {
        console.log("Source: " + dsInfo.sourceName);
        console.log("Last changed by: " + dsInfo.sourceLastChangedBy);

        if (dsInfo.sourceLastRefreshedAt) {
            console.log("Last refresh: " +
                dsInfo.sourceLastRefreshedAt.toISOString());
        }
    }

    // Display in UI
    Text_ModelInfo.setText("Model: " + dsInfo.modelName);
}
