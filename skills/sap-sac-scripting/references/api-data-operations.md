# SAC Data Operations API Reference

Comprehensive guide for working with data sources, filters, hierarchies, and members in SAP Analytics Cloud scripting.

---

## Table of Contents

1. [Data Sources Overview](#data-sources-overview)
2. [Range and Exclude Filters](#range-and-exclude-filters)
3. [Getting Dimension Filters](#getting-dimension-filters)
4. [Dimension Properties](#dimension-properties)
5. [Hierarchies](#hierarchies)
6. [Getting Members](#getting-members)
7. [DataSource Information](#datasource-information)
8. [Pattern-Based Functions](#pattern-based-functions)

---

## Data Sources Overview

Data sources are accessed through data-bound widgets:

```javascript
var ds = Chart_1.getDataSource();
var ds = Table_1.getDataSource();
```

### Key Method Categories

| Category | Methods |
|----------|---------|
| Filters | `setDimensionFilter()`, `removeDimensionFilter()`, `getDimensionFilters()` |
| Members | `getMembers()`, `getMember()` |
| Dimensions | `getDimensions()`, `getDimensionProperties()` |
| Hierarchies | `setHierarchy()`, `setHierarchyLevel()`, `expandNode()`, `collapseNode()` |
| Data | `getData()`, `getResultSet()`, `refreshData()` |
| Variables | `getVariables()`, `setVariableValue()` |

---

## Range and Exclude Filters

The `DataSource.setDimensionFilter()` method supports both range filters and exclude filters.

### Exclude Filters

Filter out specific members from the drill-down.

**Single Value Include**:
```javascript
// Keep only employee ID 230 in drill-down
DS_1.setDimensionFilter("EMPLOYEE_ID", {value: "230"});
```

**Single Value Exclude**:
```javascript
// Remove employee ID 230 from drill-down
DS_1.setDimensionFilter("EMPLOYEE_ID", {value: "230", exclude: true});
```

**Multiple Values Include**:
```javascript
// Keep employees 230 and 240 in drill-down
DS_1.setDimensionFilter("EMPLOYEE_ID", {values: ["230", "240"]});
```

**Multiple Values Exclude**:
```javascript
// Remove employees 230 and 240 from drill-down
DS_1.setDimensionFilter("EMPLOYEE_ID", {values: ["230", "240"], exclude: true});
```

### Range Filters

Filter ranges of members in the drill-down.

**Important Limitations**:
- Range filters can **only be applied to numeric dimensions**
- A time dimension is **not** a numeric dimension
- SAP BW does **not** support numeric dimensions

**Between Range**:
```javascript
// Keep employees with IDs between 230 and 240
DS_1.setDimensionFilter("EMPLOYEE_ID", {from: "230", to: "240"});
```

**Less Than**:
```javascript
// Keep employees with IDs less than 230
DS_1.setDimensionFilter("EMPLOYEE_ID", {less: "230"});
```

**Less Than or Equal**:
```javascript
// Keep employees with IDs less than or equal to 230
DS_1.setDimensionFilter("EMPLOYEE_ID", {lessOrEqual: "230"});
```

**Greater Than or Equal**:
```javascript
// Keep employees with IDs greater than or equal to 230
DS_1.setDimensionFilter("EMPLOYEE_ID", {greaterOrEqual: "230"});
```

**Greater Than**:
```javascript
// Keep employees with IDs greater than 230
DS_1.setDimensionFilter("EMPLOYEE_ID", {greater: "230"});
```

**Multiple Range Filters**:
```javascript
// Keep employees with IDs less than 230 OR greater than 240
DS_1.setDimensionFilter("EMPLOYEE_ID", [{less: "230"}, {greater: "240"}]);
```

---

## Getting Dimension Filters

Retrieve current filter values with `getDimensionFilters()`.

### Method Signature

```javascript
getDimensionFilters(dimension: string | DimensionInfo): FilterValue[]
```

### Basic Usage

```javascript
var values = Table_1.getDataSource().getDimensionFilters("COUNTRY");
```

### Working with Filter Types

Filter values can be `SingleFilterValue`, `MultipleFilterValue`, or `RangeFilterValue`. Use the `type` property to determine which:

```javascript
var value = Table_1.getDataSource().getDimensionFilters("COUNTRY")[0];

switch (value.type) {
    case FilterValueType.Single:
        var singleValue = cast(Type.SingleFilterValue, value);
        console.log(singleValue.value);
        break;

    case FilterValueType.Multiple:
        var multipleValue = cast(Type.MultipleFilterValue, value);
        console.log(multipleValue.values);  // Array of values
        break;

    case FilterValueType.Range:
        var rangeValue = cast(Type.RangeFilterValue, value);
        console.log(rangeValue.from);
        console.log(rangeValue.to);
        // Also available: less, lessOrEqual, greater, greaterOrEqual
        break;

    default:
        break;
}
```

### Limitations

- Time range filters are **not** currently returned
- SAP BW may have valid filters not supported by SAP Analytics Cloud

---

## Dimension Properties

Retrieve dimension properties of a data source.

### Method Signature

```javascript
getDimensionProperties(dimension: string | DimensionInfo): DimensionPropertyInfo[]
```

### Usage

```javascript
var properties = Table_1.getDataSource().getDimensionProperties("Location");

for (var i = 0; i < properties.length; i++) {
    console.log("Property: " + properties[i].id);
    console.log("Description: " + properties[i].description);
}
```

---

## Hierarchies

Set hierarchy levels and expand/collapse nodes.

**Note**: Currently supported only by data sources of **Table** and **Chart** widgets.

### Set Hierarchy Level

```javascript
DataSource.setHierarchyLevel(dimension: string|DimensionInfo, level?: integer): void
DataSource.getHierarchyLevel(dimension: string|DimensionInfo): integer
```

**Chart Example**:
```javascript
var ds = Chart_1.getDataSource();
ds.setHierarchy("Location_4nm2e04531", "State_47acc246_4m5x6u3k6s");
ds.setHierarchyLevel("Location_4nm2e04531", 2);
```

**Table Example**:
```javascript
var ds = Table_1.getDataSource();
ds.setHierarchy("Location_4nm2e04531", "State_47acc246_4m5x6u3k6s");
ds.setHierarchyLevel("Location_4nm2e04531", 2);
```

### Expand/Collapse Hierarchy Nodes

```javascript
DataSource.expandNode(dimension: string|DimensionInfo, selection: Selection): void
DataSource.collapseNode(dimension: string|DimensionInfo, selection: Selection): void
```

**Expand Single Node (Chart)**:
```javascript
// Chart with Location in category axis, hierarchy level 1
// Expand California node
Chart_1.getDataSource().expandNode("Location_4nm2e04531", {
    "Location_4nm2e04531": "[Location_4nm2e04531].[State_47acc246_4m5x6u3k6s].&[SA1]",
    "@MeasureDimension": "[Account_BestRunJ_sold].[parentId].&[Discount]"
});
```

**Expand All Nodes with Specific Value (Chart)**:
```javascript
// Chart with Location and Product in category axis
// Expand all Alcohol nodes
Chart_1.getDataSource().expandNode("Product_3e315003an", {
    "Product_3e315003an": "[Product_3e315003an].[Product_Catego_3o3x5e06y2].&[PC4]",
    "@MeasureDimension": "[Account_BestRunJ_sold].[parentId].&[Discount]"
});
```

**Expand Specific Node (Table)**:
```javascript
// Table with Location and Product in rows
// Expand California + Alcohol node
Table_1.getDataSource().expandNode("Location_4nm2e04531", {
    "Product_3e315003an": "[Product_3e315003an].[Product_Catego_3o3x5e06y2].&[PC4]",
    "Location_4nm2e04531": "[Location_4nm2e04531].[State_47acc246_4m5x6u3k6s].&[SA1]",
    "@MeasureDimension": "[Account_BestRunJ_sold].[parentId].&[Discount]"
});
```

---

## Getting Members

### Get Single Member

```javascript
DataSource.getMember(
    dimension: string | DimensionInfo,
    memberId: string,
    hierarchy?: string | HierarchyInfo
): MemberInfo
```

**Flat Hierarchy**:
```javascript
// With flat presentation hierarchy
Table_1.getDataSource().getMember("Location_4nm2e04531", "CT1");
// Returns: {id: 'CT1', description: 'Los Angeles', dimensionId: 'Location_4nm2e04531', displayId: 'CT1'}
```

**With Specific Hierarchy**:
```javascript
// With State hierarchy active
Table_1.getDataSource().getMember(
    "Location_4nm2e04531",
    "[Location_4nm2e04531].[State_47acc246_4m5x6u3k6s].&[CT1]"
);
// Returns: {id: '[Location_4nm2e04531].[State_47acc246_4m5x6u3k6s].&[CT1]', description: 'Los Angeles', ...}
```

**Important**: Member ID format depends on the active hierarchy:
- Flat hierarchy: `"CT1"`
- Actual hierarchy: `"[Location_4nm2e04531].[State_47acc246_4m5x6u3k6s].&[CT1]"`

### Get Multiple Members

```javascript
DataSource.getMembers(
    dimension: string | DimensionInfo,
    options?: integer | MembersOptions
): MemberInfo[]
```

**Basic Usage (Limit Count)**:
```javascript
// Get first 3 members
Table_1.getDataSource().getMembers("Location_4nm2e04531", 3);
// Returns array of 3 MemberInfo objects
```

**With Options Object**:
```javascript
Table_1.getDataSource().getMembers("Location_4nm2e04531", {limit: 3});
```

### MembersOptions

```javascript
{
    // Type of members: MemberAccessMode.MasterData (default) or MemberAccessMode.BookedValues
    accessMode: MemberAccessMode,

    // Hierarchy ID (default: currently active hierarchy)
    hierarchyId: string,

    // Maximum number of returned members (default: 200)
    limit: integer
}
```

**With Hierarchy**:
```javascript
Table_1.getDataSource().getMembers("Location_4nm2e04531", {
    limit: 2,
    hierarchyId: "State_47acc246_4m5x6u3k6s"
});
```

**Master Data vs Booked Values**:

```javascript
// Master Data (all possible members)
Table_1.getDataSource().getMembers("Location_4nm2e04531", {
    accessMode: MemberAccessMode.MasterData
});
// Returns all members including states

// Booked Values (only members with data)
Table_1.getDataSource().getMembers("Location_4nm2e04531", {
    accessMode: MemberAccessMode.BookedValues
});
// Returns only members that have actual data
```

**Tip**: To find booked values:
1. Create table with dimension
2. Set desired hierarchy
3. Open ... menu → Deselect "Unbooked Values"
4. Table shows only booked values

---

## DataSource Information

Get metadata about a data source.

### Method Signature

```javascript
DataSource.getInfo(): DataSourceInfo
```

### DataSourceInfo Properties

```javascript
class DataSourceInfo {
    modelName: string,
    modelId: string,
    modelDescription: string,
    sourceName: string,           // SAP BW only
    sourceDescription: string,    // SAP BW only
    sourceLastChangedBy: string,  // SAP BW only
    sourceLastRefreshedAt: Date   // SAP BW only
}
```

**Note**: `sourceName`, `sourceDescription`, `sourceLastChangedBy`, and `sourceLastRefreshedAt` are only supported for SAP BW models. For other models they return `undefined`.

### Usage Example

```javascript
var dsInfo = Table_1.getDataSource().getInfo();

console.log("Model name: " + dsInfo.modelName);
console.log("Model ID: " + dsInfo.modelId);
console.log("Model description: " + dsInfo.modelDescription);
console.log("Source name: " + dsInfo.sourceName);
console.log("Source description: " + dsInfo.sourceDescription);
console.log("Source last changed by: " + dsInfo.sourceLastChangedBy);

var strLastRefresh = "undefined";
if (dsInfo.sourceLastRefreshedAt !== undefined) {
    strLastRefresh = dsInfo.sourceLastRefreshedAt.toISOString();
}
console.log("Source last refreshed at: " + strLastRefresh);
```

**SAP BW Output**:
```
Model name: HAL_TEST_Scenario_Query
Model ID: t.H:C9gjfpmu5ntxaf3dbfwtyl5wab
Model description: Sample scenario query
Source name: TEST_SCENARIO_QUERY
Source description: Test Query Scenario
Source last changed by: SYSTEM
Source last refreshed at: 2021-09-23T22:00:00.000Z
```

**SAP HANA Output**:
```
Model name: BestRunJuice_SampleModel
Model ID: t.2.CMRCZ9NPY3VAER9AO6PT80G12:...
Model description: Sample Model
Source name: undefined
Source description: undefined
Source last changed by: undefined
Source last refreshed at: undefined
```

---

## Pattern-Based Functions

Create string transformation functions using input/output examples instead of code.

### Adding Pattern-Based Function

1. In Outline, add a **ScriptObject**
2. Choose **...** → **Add Pattern Based Function**
3. Define function name and description

### Creating the Pattern

1. Click **+** next to "Create Pattern"
2. Define **Training Example**: Input → Output mapping
   - Example: `john.doe@sap.com` → `John Doe`
3. Click **Create** to generate pattern via machine learning
4. Add more examples if ambiguous (up to 3)
5. Click **+** next to "Verify Pattern" to test
6. Click **Done** when complete

### Using in Scripts

```javascript
var fullName = ScriptObject_1.myPatternBasedFunction("joe.doe@sap.com");
// Returns: "Joe Doe"
```

### Example: Date Transformation

Transform dates from `MM.DD.YYYY` to `DD.MM.YY`:

**Training Examples**:
- Input: `10.11.2011` → Output: `11.10.11`
- Input: `09.05.2020` → Output: `05.09.20` (needed for disambiguation)

### Example: String Extraction

Transform appointment text to structured format:

**Input**: `John Doe has an appointment on 06.07.20 at 3:00pm.`
**Output**: `Name: John Doe, Date: 06.07.20, Time: 3:00pm`

### Troubleshooting

- If pattern defaults to returning input, add more training examples
- Click **Reset** to undo changes and restore last working pattern
- Maximum 3 training examples supported

---

## Best Practices

### Filter Performance

```javascript
// GOOD: Pause refresh before multiple filters
var ds = Table_1.getDataSource();
ds.setRefreshPaused(true);

ds.setDimensionFilter("Year", "2024");
ds.setDimensionFilter("Region", "EMEA");
ds.setDimensionFilter("Product", "Widget");

ds.setRefreshPaused(false);  // Single backend call

// BAD: Each filter triggers refresh
ds.setDimensionFilter("Year", "2024");     // Refresh
ds.setDimensionFilter("Region", "EMEA");   // Refresh
ds.setDimensionFilter("Product", "Widget"); // Refresh
```

### Member Retrieval

```javascript
// GOOD: Use getResultSet() when possible (no backend trip)
var resultSet = Chart_1.getDataSource().getResultSet();

// EXPENSIVE: getMembers() always hits backend
var members = Chart_1.getDataSource().getMembers("Dimension");

// GOOD: Specify limit to reduce data transfer
var members = ds.getMembers("Dimension", {limit: 50});

// GOOD: Use BookedValues when you only need data with values
var members = ds.getMembers("Dimension", {
    accessMode: MemberAccessMode.BookedValues
});
```

---

**Source**: SAP Analytics Designer Development Guide - Chapter 4: Scripting in Analytics Designer
**Last Updated**: 2025-11-23
