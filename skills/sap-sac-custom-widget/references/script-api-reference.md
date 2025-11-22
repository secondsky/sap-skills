# SAP SAC Script API Reference for Custom Widgets

Comprehensive reference for Analytics Designer and Optimized Story Experience Script APIs
relevant to custom widget development.

**Sources**:
- [Analytics Designer API Reference Guide](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)
- [Optimized Story Experience API Reference Guide](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)
- [Custom Widget Developer Guide (PDF)](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)

> **Note**: These documentation links point to the latest release version. Version-specific
> documentation may be available under versioned pages in the SAP Help Portal.

---

## Table of Contents

1. [DataSource Object](#datasource-object)
2. [Selection Type](#selection-type)
3. [MemberInfo Object](#memberinfo-object)
4. [ResultMemberInfo Object](#resultmemberinfo-object)
5. [ResultSet APIs](#resultset-apis)
6. [DataBinding Object](#databinding-object)
7. [Filter APIs](#filter-apis)
8. [Planning APIs](#planning-apis)
9. [Variable APIs](#variable-apis)
10. [Event Handling](#event-handling)

---

## DataSource Object

The DataSource object provides access to data model information and operations.

### Getting DataSource

```javascript
// In SAC Script
var ds = Table_1.getDataSource();
var ds = Chart_1.getDataSource();

// In custom widget (via script method)
Widget_1.getDataSource(); // If widget has data binding
```

### DataSource Methods

#### getResultSet()

Returns result data based on optional parameters.

```javascript
// Signature
getResultSet(options?: Object): Array<Object>

// Options object can include:
// - selection: Object - data selection context
// - offset: number - starting row index
// - limit: number - maximum rows to return

// Examples
var allData = ds.getResultSet();
var filteredData = ds.getResultSet({ selection: { "Year": "2024" } });
var pagedData = ds.getResultSet({ offset: 0, limit: 100 }); // First 100 rows
```

**Return Value**: Array of result objects containing:
- Dimension member info (id, description, parentId)
- Measure values (raw, formatted, unit)

#### getResultMember()

Returns member information for a specific selection.

```javascript
// Signature
getResultMember(
  dimensionId: string,
  selection: Object
): Object | undefined

// Example
var memberInfo = ds.getResultMember("Account", { "Account": "Revenue" });
console.log(memberInfo.description); // "Revenue"
console.log(memberInfo.id);          // "REVENUE"
```

#### getMembers()

Retrieves dimension members.

```javascript
// Signature
getMembers(
  dimensionId: string,
  maxNumber?: number
): Array<Object>

// Examples
var allMembers = ds.getMembers("Account");
var limitedMembers = ds.getMembers("Account", 100); // Max 100 members
```

**Note**: Using getMembers() causes a backend roundtrip. For performance, prefer
getResultSet() when possible as it doesn't require additional network calls.

#### getMember()

Returns information for a specific member.

```javascript
// Signature
getMember(
  dimensionId: string,
  memberId: string
): Object

// Example
var member = ds.getMember("Account", "REVENUE");
```

#### getData()

Gets the raw data value for a selection.

```javascript
// Signature
getData(selection?: Object): number | null

// Examples
var currentValue = ds.getData(); // Uses current selection context
var specificValue = ds.getData({
  "Account": "Revenue",
  "Year": "2024"
});
```

#### getDimensions()

Returns available dimensions in the data source.

```javascript
// Signature
getDimensions(): Array<Object>

// Example
var dimensions = ds.getDimensions();
dimensions.forEach(dim => {
  console.log(dim.id, dim.description);
});
```

#### getMeasures() / getMainStructureMembers()

Returns available measures.

```javascript
// Signature
getMeasures(): Array<Object>

// Example
var measures = ds.getMeasures();
measures.forEach(m => {
  console.log(m.id, m.description, m.unitOfMeasure);
});
```

---

## Selection Type

Selection objects define data context for operations.

### Selection Structure

```javascript
// Simple selection
var selection = {
  "Account": "Revenue",
  "Year": "2024"
};

// Selection with multiple values
var multiSelection = {
  "Account": ["Revenue", "Cost"],
  "Year": "2024"
};

// Selection with hierarchy
var hierarchySelection = {
  "Account": {
    id: "Revenue",
    hierarchyId: "H1"
  }
};
```

### Using Selection in JSON

```json
{
  "properties": {
    "currentSelection": {
      "type": "Selection",
      "default": {},
      "description": "Current data selection context"
    }
  },
  "methods": {
    "setSelection": {
      "description": "Apply a data selection",
      "parameters": [
        {
          "name": "selection",
          "type": "Selection",
          "description": "Selection to apply"
        }
      ],
      "body": "this._setSelection(selection);"
    },
    "getSelection": {
      "description": "Get current selection",
      "returnType": "Selection",
      "body": "return this._getSelection();"
    }
  }
}
```

### Selection in Web Component

```javascript
class DataWidget extends HTMLElement {
  constructor() {
    super();
    this._selection = {};
  }

  // Method called from SAC script
  setSelection(selection) {
    this._selection = selection;
    this._render();
  }

  getSelection() {
    return this._selection;
  }

  _render() {
    // Use selection to filter/highlight data
    console.log("Current selection:", this._selection);
  }
}
```

---

## MemberInfo Object

Represents dimension member information.

### Structure

```javascript
{
  id: string,              // Technical member ID (e.g., "REVENUE")
  description: string,     // Display name (e.g., "Revenue")
  displayId: string,       // Display ID
  dimensionId: string,     // Parent dimension ID
  modelId: string,         // Data model ID
  parentId?: string,       // Parent member ID (hierarchies)
  hierarchyId?: string,    // Hierarchy ID (if applicable)
  level?: integer,         // Hierarchy level
  isNode?: boolean,        // Is hierarchy node (has children)
  properties?: object      // Additional attributes
}
```

### Performance Optimization

When using setDimensionFilter(), passing a MemberInfo object instead of just
a member ID string prevents a backend roundtrip:

```javascript
// Slower - causes roundtrip to fetch description
ds.setDimensionFilter("Account", "REVENUE");

// Faster - no roundtrip, MemberInfo already has description
ds.setDimensionFilter("Account", {
  id: "REVENUE",
  description: "Revenue"
});
```

### Accessing Member Properties

```javascript
// Get member with attributes
var member = ds.getMember("Product", "P001");

// Access properties (if dimension has attributes)
if (member.properties) {
  console.log("Category:", member.properties.Category);
  console.log("Brand:", member.properties.Brand);
}
```

---

## ResultMemberInfo Object

Extended member information from result sets.

### Structure

```javascript
{
  id: string,              // Member ID
  description: string,     // Display name
  parentId?: string,       // Parent ID for hierarchies
  formattedValue?: string, // Formatted display value
  unitOfMeasure?: string,  // Unit (for measures)
  raw?: number,            // Raw numeric value (for measures)
  properties?: {
    // Dimension attributes
    [attributeName: string]: string
  }
}
```

### Accessing in Result Set

```javascript
var resultSet = ds.getResultSet();

resultSet.forEach(row => {
  // Access dimension member info
  var accountMember = row["Account"];
  console.log("Account ID:", accountMember.id);
  console.log("Account Name:", accountMember.description);

  // Access measure value
  var revenue = row["Revenue"];
  console.log("Value:", revenue.raw);
  console.log("Formatted:", revenue.formattedValue);
  console.log("Unit:", revenue.unitOfMeasure);
});
```

### Note on Visibility

Only visible properties in the widget configuration are included in the
ResultMemberInfo object. Hidden dimensions/measures won't appear.

---

## ResultSet APIs

### getResultSet() Deep Dive

```javascript
// Full signature
getResultSet(
  selection?: Selection | Selection[] | SelectionContext,
  offset?: integer,
  limit?: integer
): ResultSet[]
```

#### Pagination

```javascript
// Get first page (100 rows)
var page1 = ds.getResultSet(null, 0, 100);

// Get second page
var page2 = ds.getResultSet(null, 100, 100);

// Count total rows
var total = ds.getResultSetCount();
```

#### Filtering

```javascript
// Single filter
var filtered = ds.getResultSet({ "Year": "2024" });

// Multiple filters
var filtered = ds.getResultSet({
  "Year": "2024",
  "Region": "EMEA"
});

// Array of selections (OR logic)
var filtered = ds.getResultSet([
  { "Year": "2024" },
  { "Year": "2023" }
]);
```

### Processing Result Sets

```javascript
function processResults(resultSet) {
  var chartData = [];

  resultSet.forEach(row => {
    // Dynamically access columns based on data binding
    var dimensions = Object.keys(row).filter(k => row[k].id !== undefined);
    var measures = Object.keys(row).filter(k => row[k].raw !== undefined);

    chartData.push({
      category: row[dimensions[0]]?.description || "Unknown",
      value: row[measures[0]]?.raw || 0
    });
  });

  return chartData;
}
```

---

## DataBinding Object

Custom widget data binding API.

### Getting DataBinding

```javascript
// In custom widget web component
const binding = this.dataBindings.getDataBinding("myDataBinding");
```

### DataBinding Methods

#### getResultSet()

```javascript
// Async - returns Promise
const resultSet = await binding.getResultSet();
```

#### getMembers()

```javascript
// Get dimension members
const members = await binding.getMembers("DimensionId");
```

#### addDimensionToFeed()

```javascript
// Programmatically add dimension to feed
await binding.addDimensionToFeed("dimensions", "Account");
```

#### addMeasureToFeed()

```javascript
// Add measure to feed
await binding.addMeasureToFeed("measures", "Revenue");
```

#### removeDimensionFromFeed()

```javascript
await binding.removeDimensionFromFeed("dimensions", "Account");
```

### Accessing Bound Data Directly

```javascript
// Direct property access (name from JSON dataBindings)
const data = this.myDataBinding;

// Structure
{
  data: ResultSet[],      // Array of result rows
  metadata: {
    dimensions: {},       // Dimension info
    mainStructureMembers: {} // Measure info
  }
}
```

### Data Binding Example

```javascript
class DataBoundWidget extends HTMLElement {
  onCustomWidgetAfterUpdate(changedProperties) {
    this._processData();
  }

  _processData() {
    // Access data binding by name defined in JSON
    const binding = this.chartData;
    if (!binding || !binding.data) {
      this._showNoData();
      return;
    }

    // Process rows
    const chartData = binding.data.map(row => {
      // Access dimension (first feed)
      const categoryKey = Object.keys(row).find(k =>
        binding.metadata.dimensions[k]);
      const valueKey = Object.keys(row).find(k =>
        binding.metadata.mainStructureMembers[k]);

      return {
        label: row[categoryKey]?.description || "",
        value: row[valueKey]?.raw || 0
      };
    });

    this._renderChart(chartData);
  }
}
```

---

## Filter APIs

### setDimensionFilter()

```javascript
// Set single filter
ds.setDimensionFilter("Year", "2024");

// Set filter with MemberInfo (avoids roundtrip)
ds.setDimensionFilter("Year", {
  id: "2024",
  description: "Year 2024"
});

// Multiple values
ds.setDimensionFilter("Year", ["2023", "2024"]);

// Clear filter
ds.removeDimensionFilter("Year");
```

### setVariableValue()

```javascript
// Set planning variable
ds.setVariableValue("VAR_YEAR", "2024");

// Multiple values
ds.setVariableValue("VAR_REGION", ["EMEA", "AMER"]);
```

### Filter Synchronization

```javascript
// Apply filters and refresh data
ds.setDimensionFilter("Year", "2024");
ds.setDimensionFilter("Region", "EMEA");

// Refresh to apply (may be automatic depending on widget)
ds.refresh();
```

---

## Planning APIs

For widgets supporting SAP Analytics Cloud Planning.

> **⚠️ Important**: Planning APIs are synchronous and return boolean success values.
> Always check the return value to handle errors appropriately.

### Write-back Methods

```javascript
// Set user input (planning)
ds.setUserInput(selection, value);

// Example
ds.setUserInput({
  "Account": "Forecast",
  "Year": "2025",
  "Month": "Jan"
}, 100000);

// Submit changes (synchronous, returns boolean)
var success = ds.submitData();
if (!success) {
  console.error("Submit failed");
}

// Revert changes using Planning Version
var planningVersion = ds.getPlanningVersion();
planningVersion.revert();
```

### Planning Workflow

```javascript
class PlanningWidget extends HTMLElement {
  saveData(entries) {
    const ds = this._dataSource;

    // Apply all inputs
    for (const entry of entries) {
      ds.setUserInput(entry.selection, entry.value);
    }

    // Submit to backend (synchronous)
    var success = ds.submitData();

    if (success) {
      this._showSuccess("Data saved");
    } else {
      // Rollback on error using Planning Version
      var planningVersion = ds.getPlanningVersion();
      if (planningVersion) {
        planningVersion.revert();
      }
      this._showError("Save failed");
    }
  }
}
```

### Data Locking

```javascript
// Get data locking interface
var dataLocking = ds.getDataLocking();

// Check lock status
var isLocked = dataLocking.isLocked();

// Set lock state (returns boolean)
var lockSuccess = dataLocking.setState(true);  // Lock
if (!lockSuccess) {
  console.error("Failed to acquire lock");
}

// Release lock
var unlockSuccess = dataLocking.setState(false); // Unlock
if (!unlockSuccess) {
  console.error("Failed to release lock");
}
```

---

## Variable APIs

### Input Variable Methods

```javascript
// Get variable value
var year = ds.getVariableValue("VAR_YEAR");

// Set variable value
ds.setVariableValue("VAR_YEAR", "2024");

// Get available values
var values = ds.getVariableValues("VAR_YEAR");
```

### Variable Information

```javascript
// Get variable details
var varInfo = ds.getVariable("VAR_YEAR");
console.log(varInfo.description); // "Fiscal Year"
console.log(varInfo.mandatory);   // true/false
console.log(varInfo.multiValue);  // true/false
```

---

## Event Handling

### Widget Events in JSON

```json
{
  "events": {
    "onSelect": {
      "description": "Fired when item is selected"
    },
    "onDataChange": {
      "description": "Fired when data changes"
    },
    "onError": {
      "description": "Fired on error"
    }
  }
}
```

### Firing Events

```javascript
// Simple event
this.dispatchEvent(new Event("onSelect"));

// Event with data
this.dispatchEvent(new CustomEvent("onSelect", {
  detail: {
    selection: this._currentSelection,
    value: this._selectedValue
  }
}));

// Error event
this.dispatchEvent(new CustomEvent("onError", {
  detail: {
    message: "Failed to load data",
    code: "DATA_ERROR"
  }
}));
```

### Handling in SAC Script

```javascript
// Event handler in SAC script
Widget_1.onSelect = function(event) {
  var info = Widget_1.getEventInfo();
  console.log("Selected:", info.selection);
  console.log("Value:", info.value);

  // Update other widgets
  Table_1.getDataSource().setDimensionFilter("Account", info.selection.Account);
};

Widget_1.onError = function(event) {
  var info = Widget_1.getEventInfo();
  Application.showMessage(ApplicationMessageType.Error, info.message);
};
```

### Data-Driven Events

```javascript
class InteractiveWidget extends HTMLElement {
  _handleClick(item) {
    // Build selection from clicked item
    const selection = {
      [this._dimensionId]: item.id
    };

    // Store for getEventInfo
    this._lastEvent = {
      selection: selection,
      label: item.label,
      value: item.value
    };

    // Fire event
    this.dispatchEvent(new Event("onSelect"));
  }

  // Called by SAC script via getEventInfo()
  getEventInfo() {
    return this._lastEvent || {};
  }
}
```

---

## Common Patterns

### Async Data Loading

```javascript
class AsyncWidget extends HTMLElement {
  async connectedCallback() {
    this._showLoading();

    try {
      const binding = this.dataBindings.getDataBinding("myData");
      const resultSet = await binding.getResultSet();
      this._renderData(resultSet);
    } catch (error) {
      this._showError(error.message);
    }
  }

  _showLoading() {
    this._shadowRoot.innerHTML = '<div class="loading">Loading...</div>';
  }
}
```

### Selection Synchronization

```javascript
class SyncWidget extends HTMLElement {
  // Apply external selection
  setSelection(selection) {
    this._selection = selection;
    this._highlightSelection();
  }

  // Notify of internal selection
  _onItemClick(item) {
    this._selection = { [this._dimId]: item.id };

    this.dispatchEvent(new CustomEvent("propertiesChanged", {
      detail: { properties: { currentSelection: this._selection } }
    }));

    this.dispatchEvent(new Event("onSelect"));
  }
}
```

---

## Resources

- [Analytics Designer API Reference Guide](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)
- [Optimized Story Experience API Reference Guide](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)
- [Custom Widget Developer Guide (PDF)](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Use Result Set APIs](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/834786949212459caabe3a3d13f0aaa9.html)
- [SAP Help Portal - Custom Widgets](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html)

---

**Last Updated**: 2025-11-22
