# SAC Scripting Language Fundamentals

Complete reference for the Analytics Designer scripting language based on official SAP documentation.

---

## Table of Contents

1. [Language Overview](#language-overview)
2. [Type System](#type-system)
3. [Variables and Scope](#variables-and-scope)
4. [Control Flow](#control-flow)
5. [Loops](#loops)
6. [Operators](#operators)
7. [Built-in Objects](#built-in-objects)
8. [Arrays](#arrays)
9. [Method Chaining](#method-chaining)
10. [Script Runtime Security](#script-runtime-security)
11. [Accessing Objects](#accessing-objects)
12. [Call Statements](#call-statements)
13. [Scripting Aliases](#scripting-aliases)
14. [Result Set Iteration](#result-set-iteration)

---

## Language Overview

The Analytics Designer scripting language is a **limited subset of JavaScript** with the following characteristics:

- Extended with a logical type system enforcing **type safety at design time**
- Executes natively in the browser as true JavaScript
- All scripts run and validate against **strict mode**
- Some advanced JavaScript features are hidden
- Scripts are tied to **events** or **global script objects**

### What Makes It Different from Standard JavaScript

| Feature | Standard JavaScript | Analytics Designer |
|---------|--------------------|--------------------|
| Typing | Weak, dynamic | Strong, static |
| Type conversion | Automatic | Must be explicit |
| Variable reuse | Can change type | Type is fixed |
| External libraries | Can import | Not supported |
| DOM access | Full access | Blocked |
| Global variables | Accessible | Isolated |

---

## Type System

### Strong and Static Typing

Analytics Designer enforces strict types to enable powerful tooling (code completion, validation).

**Key Rules**:
1. Once a variable has a type, it **cannot change**
2. Variable names **cannot be reused** for different types
3. Type conversions must be **explicit**

### No Automatic Type Casting

Standard JavaScript allows implicit type coercion:

```javascript
// Valid JavaScript, but ERROR in Analytics Designer
var nth = 1;
console.log("Hello World, " + nth);  // Auto-converts nth to string
```

In Analytics Designer, you must explicitly cast:

```javascript
// Correct: Explicit type conversion
var nth = 1;
console.log("Hello World, " + nth.toString());
```

### Type Declaration

Variables are declared with `var` and their type is inferred from the initial value:

```javascript
var myString = "Hello";      // Type: string
var myNumber = 42;           // Type: integer
var myDecimal = 3.14;        // Type: number
var myBoolean = true;        // Type: boolean
var myArray = ["a", "b"];    // Type: string[]
```

---

## Variables and Scope

### Local Variables

Declared within event handlers or functions, scoped to that block:

```javascript
// In onSelect event
var selectedValue = Chart_1.getSelections()[0];
var filterValue = selectedValue["Location"];
```

The data type of a local variable is inferred from its initial assignment — this works well for simple types like `string`, `boolean`, or `integer`:

```javascript
var mySimpleFilter = "201901";
Table_1.getDataSource().setDimensionFilter("0CALMONTH", mySimpleFilter);
```

For complex types (e.g. `MultipleFilterValue`), plain JSON assignment will fail because the script engine cannot infer the type:

```javascript
// ERROR — type cannot be inferred from JSON literal
var myFilter = {values: ["201901", "201902"], exclude: true};
```

Use the `cast(type, arg)` function to explicitly declare the type:

```javascript
var myFilter = cast(Type.MultipleFilterValue, {values: ["201901", "201902"], exclude: true});
```

### Global Variables

Unlike **local variables** (defined with `var` inside a single script block and inaccessible outside it), global script variables are standalone objects at story level — accessible from all script blocks within the story.

**Creating a global script variable** (Outline tab → Script Variables panel):

1. Click **+** to create a new script variable
2. Set a **name**
3. Select the **data type**
4. Optionally enable **Use as URL parameter** — note: this option is disabled for array types and non-primitive types (types other than string, boolean, integer, and number)

```javascript
// Access or assign a global variable from any script block
GlobalVariable_1 = "new value";
var currentValue = GlobalVariable_1;
```

> **Performance**: Where possible, prefer local script variables over global script variables.

### Script Variables in Calculated Measures

Script variables can be referenced in calculated measures for what-if simulations:

```javascript
// Formula: [Gross_Margin] * [@ScriptVariable_Rate]
// Change ScriptVariable_Rate via script to see updated results
```

### URL Parameters

Global script variables enabled as URL parameters can receive values on story load. Prefix the variable name with `p_` in the URL:

```
<yourAppURL>&p_<VariableName>=<VariableValue>
```

**Example:**
```
<yourAppURL>&p_viewMode=condensed
```

Common use cases:
- Pass a value used as a **dimension filter**
- Pass a value used to **define a specific layout**

> URL parameter values are applied on **initial loading** of the story.

#### Enable Dynamic URL

With the **Enable dynamic URL** option, the URL parameter can also be updated *during* story use.

**Example**: A user opens a story with `p_Entity=Germany`. In view mode, they change a filter to France — the URL automatically updates to `p_Entity=France`. The user can bookmark or share this URL and the same filter will be applied when the link is opened.

#### Example: Conditional Layout on Story Load

Add a global script variable `viewMode` (string, enabled as URL parameter), then use the `onInitialization` event to branch on its value:

```javascript
// onInitialization
if (viewMode === "condensed") {
  TS_Content.setVisible(false);
} else {
  TS_Content.setVisible(true);
}
```

Distribute different URLs per audience:
- `&p_viewMode=condensed` — KPI tiles only
- `&p_viewMode=full` — complete story

### Passing Variables Between Pages

A global script variable can carry state from one story page to another. Set the variable in button `onClick` events on the source page, then read it in the target page's `onActive` event.

**Example — year filter carried to a detail page:**

Source page buttons set the global variable `year`:
```javascript
// Button onClick: 2018
year = "2018";

// Button onClick: 2019
year = "2019";

// Button onClick: All
year = "all";
```

Detail page `onActive` event reads the variable and applies or removes the filter:
```javascript
// Detail page — onActive
if (year === "all") {
  TBL_Details.getDataSource().removeDimensionFilter("0CALYEAR");
} else {
  TBL_Details.getDataSource().setDimensionFilter("0CALYEAR", year);
}
```

### Scripting Aliases

The scripting environment provides an `Alias` object with named constants for referencing standard scripting objects:

| Alias | Description |
|-------|-------------|
| `Alias.DefaultTheme` | The default theme of the story |
| `Alias.FlatHierarchy` | A flat (non-hierarchical) hierarchy representation |
| `Alias.MeasureDimension` | The measure dimension in a data source |
| `Alias.NullMember` | Represents a null/empty member |
| `Alias.TotalsMember` | The result/totals member in a dimension |

Use `Alias.TotalsMember` to reference the result member in script:

```javascript
// Example: check if a selected member is the totals member
if (selectedMember === Alias.TotalsMember) {
  // handle totals row
}
```

Use `Alias.MeasureDimension` to reference the measure dimension:

```javascript
// Example: set a filter on the measure dimension
dataSource.setDimensionFilter(Alias.MeasureDimension, "Revenue");
```

---

## Control Flow

### if/else Statements

Standard syntax, but remember type safety rules:

```javascript
if (nth === 1) {
    console.log("if...");
} else if (nth < 3) {
    console.log("else if...");
} else {
    console.log("else...");
}
```

### switch Statements

Use the `switch` statement to select one of multiple code sections based on a value. The expression is compared with each `case` value — when a match is found, the associated code executes.

```javascript
var selectedCountry = Dropdown1.getSelectedText();

switch (selectedCountry) {
    case "Germany":
        // code that is relevant for Germany
        break;
    case "USA":
        // code that is relevant for USA
        break;
    default:
        // code that is relevant for all other countries
}
```

**`break` is required to exit the switch.** Without `break`, execution continues into every subsequent `case` regardless of its value (fall-through). Always end each `case` with `break` unless fall-through is intentional.

### break Statement

Use `break` to exit loops and switch statements.

---

## Loops

### for Loop

**Important**: You must explicitly declare the loop iterator.

```javascript
// ERROR: Iterator not declared
for (i = 0; i < 3; i++) {
    console.log(i.toString());
}

// CORRECT: Iterator declared with var
for (var i = 0; i < 3; i++) {
    console.log(i.toString());
}
```

Real-world example iterating SAC hierarchies:

```javascript
var Hierarchies = TBL_Quantity.getDataSource().getHierarchies("0D_NW_PRID");

for (var j = 0; j < Hierarchies.length; j++) {
    console.log(Hierarchies[j].id + " - " + Hierarchies[j].description);
}
```

### while Loop

Fully supported:

```javascript
var nth = 1;
while (nth < 3) {
    console.log("Hello while, " + nth.toString());
    nth++;
}
```

Real-world example iterating SAC hierarchies:

```javascript
var Hierarchies = TBL_Quantity.getDataSource().getHierarchies("0D_NW_PRID");

var x = 0;
while (x < Hierarchies.length) {
    console.log(Hierarchies[x].id + " - " + Hierarchies[x].description);
    x++;
}
```

### for...in Loop

Iterate over object properties (useful for selections):

```javascript
var selection = {
    "Color": "red",
    "Location": "GER"
};

for (var propKey in selection) {
    var propValue = selection[propKey];
    console.log(propKey + ": " + propValue);
}
```

**Note**: `foreach` iterators are **not supported**.

---

## Operators

### Equality Operators

SAC scripting is **strongly typed** — automatic type conversion is not supported. Only two operators are valid for equality and assignment:

| Operator | Name | Purpose |
|----------|------|---------|
| `=` | Assignment | Assign a value to a variable |
| `===` | Strict equality | Compare value AND type |

**Use `===` for all comparisons:**

```javascript
var aNumber = 1;
if (aNumber === 1) {
    // TRUE: same value and same type
}
```

**Do not use `==` (double equals):**

`==` is a comparison operator in standard JavaScript that compares values without checking types, relying on automatic type conversion. SAC does not support type conversion — using `==` in a script will cause an error.

```javascript
// ❌ WRONG — will error in SAC
if (aNumber == "1") { ... }

// ✅ CORRECT
if (aNumber === 1) { ... }
```

**Best Practice**: Always use `===` for comparisons and `=` for assignment.

---

## Built-in Objects

Analytics Designer supports standard JavaScript built-in objects:

### Math

```javascript
var max = Math.max(10, 20);
var min = Math.min(10, 20);
var rounded = Math.round(3.7);
var random = Math.random();
var power = Math.pow(2, 3);  // 8
var sqrt = Math.sqrt(16);    // 4
```

### Date

```javascript
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();  // 0-11
var day = now.getDate();
var formatted = now.toISOString();
```

### Number

```javascript
var num = 42;
var str = num.toString();
var fixed = (3.14159).toFixed(2);  // "3.14"
```

### String

```javascript
var str = "Hello World";
var upper = str.toUpperCase();
var lower = str.toLowerCase();
var sub = str.substring(0, 5);  // "Hello"
var index = str.indexOf("World");  // 6
var replaced = str.replace("World", "SAC");
var split = str.split(" ");  // ["Hello", "World"]
var len = str.length;  // 11
```

### Array

```javascript
var arr = [1, 2, 3];
arr.push(4);          // Add to end
var last = arr.pop(); // Remove from end
var len = arr.length;
var joined = arr.join(", ");
var sorted = arr.sort();
```

**Note**: External JavaScript libraries **cannot be imported**.

---

## Arrays

### One-Dimensional Arrays

```javascript
// Create typed array
var arr1D = ArrayUtils.create(Type.number);

// Or use literal syntax
var myArray = [1, 2, 3];
```

### Array Operations

Common array operations in SAC scripting:

| Operation | Example |
|-----------|---------|
| Create empty typed array | `var myList = ArrayUtils.create(Type.string);` |
| Create filled array | `var myList = ["Hello", "World", "Example"];` |
| Add element | `myList.push("Hello world");` |
| Remove last element | `myList.pop();` |
| Read number of entries | `myList.length;` |

Real-world example — dynamically populate a dropdown widget from data source members:

```javascript
var countries = Table_1.getDataSource().getMembers("0D_NW_BP__0D_NW_CNTRY");
for (var x = 0; x < countries.length; x++) {
    var country = countries[x];
    Dropdown_1.addItem(country.id, country.description);
}
```

This pattern is used in Generic Navigation Widgets: retrieve member arrays from the data source, then call `addItem(id, description)` on the widget inside a `for` loop.

#### Business Scenario: Dynamic Dropdown to Filter a Table

**Goal**: Filter an Order Quantity table by product category using a dropdown widget.

**`onInitialization` — populate the dropdown:**

```javascript
var ProductABCratingList = TBL_Quantity.getDataSource().getMembers("0D_NW_PRID__0D_NW_PRCAT");
for (var i = 0; i < ProductABCratingList.length; i++) {
    if (ProductABCratingList[i].id !== "") {
        DD_Product_ABC_rating.addItem(
            ProductABCratingList[i].displayId,
            ProductABCratingList[i].description
        );
    }
}
```

The `id !== ""` guard skips blank/unassigned members before adding them to the dropdown.

**`onSelect` — apply the dimension filter:**

```javascript
TBL_Quantity.getDataSource().setDimensionFilter(
    "0D_NW_PRID__0D_NW_PRCAT",
    DD_Product_ABC_rating.getSelectedKey()
);
```

`getSelectedKey()` returns the `displayId` set during `addItem`, which is passed to `setDimensionFilter` to restrict the table's data source to the chosen category.

### Two-Dimensional Arrays

Analytics Designer doesn't have a direct 2D array method, but you can create one using nested 1D arrays:

```javascript
var numCols = 4;
var numRows = 3;

// Create first row
var arr1D = ArrayUtils.create(Type.number);

// Create 2D array containing the first row
var arr2D = [arr1D];

// Add remaining rows
for (var i = 1; i < numRows; i++) {
    arr2D.push(ArrayUtils.create(Type.number));
}
```

**Note**: You cannot use `var arr2D = []` because Analytics Designer cannot infer the content type from an empty array.

### Setting Values in 2D Array

```javascript
arr2D[row][col] = value;

// Example: Fill with sequential numbers
var count = 0;
for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
        arr2D[row][col] = count;
        count = count + 1;
    }
}
```

### Getting Values from 2D Array

```javascript
for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
        console.log(arr2D[row][col].toString());
    }
    console.log("");  // Row separator
}
```

---

## Method Chaining

Chain method calls for compact code:

```javascript
// Without chaining (verbose)
var theDataSource = Chart_1.getDataSource();
var theVariables = theDataSource.getVariables();
console.log(theVariables);

// With chaining (compact)
console.log(Chart_1.getDataSource().getVariables());
```

**Use Cases**:
- Debug logging
- One-time data retrieval
- Reducing visual clutter

**When NOT to Chain**:
- When you need to reuse intermediate results
- When debugging complex operations

---

## Script Runtime Security

Analytics Designer validates scripts before execution to prevent security risks.

### What Is Blocked

The execution is isolated to prevent:

- **DOM access**: Cannot manipulate HTML elements
- **Global variable access**: Cannot access browser globals
- **Prototype modification**: Cannot alter built-in prototypes
- **Network requests**: Cannot send arbitrary HTTP requests
- **Script imports**: Cannot load external JavaScript
- **ActiveX/plugins**: Cannot use browser plugins
- **Web Workers**: Cannot spawn additional workers
- **Cookies**: Cannot access browser cookies
- **Cross-domain access**: Enforced same-origin policies

### Validation

- Same validation logic as script editor
- Not all validations performed at runtime (e.g., analytic data validation)
- Only allowed JavaScript subset can execute
- Critical features use secured alternative APIs

---

## The `this` Keyword

Use `this` to reference the current widget or script object:

```javascript
// In Chart_1 onSelect event
var theDataSource = this.getDataSource();
console.log(theDataSource.getVariables());

// Equivalent to:
var theDataSource = Chart_1.getDataSource();
console.log(theDataSource.getVariables());
```

**Usage Contexts**:
- Within widget scripts: `this` = the widget instance
- Within script object functions: `this` = the script object
- Explicitly reference parent: Use widget name (`Chart_1`)
- Either approach is valid (stylistic choice)

---

## Code Completion and Value Help

The script editor provides intelligent assistance:

### Code Completion

- **Standard completion**: Complete local/global identifiers
- **Semantic completion**: Suggest member functions
- **Fuzzy matching**: Find widgets even with typos (e.g., "cose" → "console")

### Value Help

Context-aware value proposals:
- Measures of a data source for function parameters
- Dimension members for filter methods
- Widget names in the application

### Keyboard Shortcut

Press `CTRL+Spacebar` to:
- Auto-complete if only one valid option
- Display value help list if multiple options

---

## Accessing Objects

Every object in the Outline (widgets, script variables, script objects) is a global object accessible by name:

```javascript
// Access widget
var isVisible = Chart_1.isVisible();

// Access script variable
var currentValue = ScriptVariable_1;

// Access script object function
ScriptObject_1.myFunction();
```

### Finding Widgets with Fuzzy Matching

Type partial names and use CTRL+Spacebar:
- Completes automatically if unique match
- Shows list if multiple matches
- Works even with typos

---

## Call Statements

Call statements execute an API method on a widget or data source. Each statement ends with a semicolon (`;`).

```javascript
CH_TaxesPerMonth.getDataSource().setDimensionFilter("0CALYEAR", "2018");
```

Breaking this down:

- **Widget** (`CH_TaxesPerMonth`): The story component to influence. Ask: *which element should be affected?*
- **Methods** (`getDataSource`, `setDimensionFilter`): Operations applied to the widget. Ask: *what should be done?* Available methods depend on widget type — data sources provide filter methods, visual components provide visibility methods like `setVisible`.
- **Arguments** (`"0CALYEAR"`, `"2018"`): Details needed to execute the method. Ask: *what details are required?*

More examples:

```javascript
// Show or hide a component
Button_1.setVisible(true);

// Refresh data
Table_1.getDataSource().refreshData();

// Add item to dropdown
Dropdown_1.addItem("DE", "Germany");
```

---

## Result Set Iteration

### Result Set Structure

Before iterating a result set, understand its elements:

- **Dimension Header** — contains dimension names
- **Column Header / Row Header** — contains members that form a tree; the combination of all members on one axis is called an **axis tuple**
- **Data area** — at the crossing point of a row and a column axis tuple sits a data cell

> **Tip:** A single data cell can be identified by combining the row and column axis tuples into one larger tuple. This "large tuple" selection survives certain structural changes such as moving a dimension between rows and columns or swapping axes.

### Reference a Single Data Cell

Use `getData({selection})` on a data source to read a single cell. Pass a JSON selection to specify the cell. Returns either:

- **Formatted value** — e.g. `10,803,914.00`
- **Raw value** — e.g. `10803914`

```javascript
var cell = Table_1.getDataSource().getData({
  [Alias.MeasureDimension]: "00O2SOEHXWHF3AU4LBEW8WZSX",
  "0D_NW_BP__0D_NW_CNTRY": "US"
});
console.log(cell.formattedValue); // "10,803,914.00"
console.log(cell.value);          // 10803914
```

### Read a Set of Selections

Use `getDataSelections({filter})` to retrieve an array of matching selections, then loop over them with `getData()`:

```javascript
var selections = Table_1.getDataSource().getDataSelections({
  [Alias.MeasureDimension]: "00O2SOEHXWHF3AU4LBEW8WZSX",
  "0D_NW_BP__0D_NW_CNTRY": "US"
});
console.log(selections);

for (var x = 0; x < selections.length; x++) {
  var cell = Table_1.getDataSource().getData(selections[x]);
  console.log(cell.formattedValue);
}
```

### Read a Dimension Member from a Selection

Use `getResultMember(dimension, {selection})` to retrieve the member metadata alongside cell values:

```javascript
var selections = Table_1.getDataSource().getDataSelections({
  [Alias.MeasureDimension]: "00O2SOEHXWHF3AU4LBEW8WZSX",
  "0D_NW_BP__0D_NW_CNTRY": "US"
});

for (var x = 0; x < selections.length; x++) {
  var cell    = Table_1.getDataSource().getData(selections[x]);
  var year    = Table_1.getDataSource().getResultMember("0CALYEAR", selections[x]);
  var country = Table_1.getDataSource().getResultMember("0D_NW_BP__0D_NW_CNTRY", selections[x]);
  console.log(country.description + " / " + year.description + " / " + cell.formattedValue);
}
```

### Read the Complete Result Set

Use `getResultSet()` to read the whole result set (or a slice of it) into an array at once. Each cell includes a full list of properties for further processing.

```javascript
var resultset = Table_1.getDataSource().getResultSet();
console.log(resultset);

// Access a specific cell's formatted value
console.log(resultset[0][Alias.MeasureDimension].formattedValue);
```

`getResultSet` accepts three optional parameters:

```javascript
Table_1.getDataSource().getResultSet(selection?, offset?, limit?)
```

| Parameter | Description |
|-----------|-------------|
| `selection` | Restricts the returned result set (e.g. to a measure or dimension member) |
| `offset` | Skips the first N cells before returning results |
| `limit` | Constrains the number of returned cells |

If no parameters are specified, the entire available result set is returned.

### Apply Result Set to UI Elements

A common pattern is reading from a **hidden table** data source and pushing values into text widgets (`TX_*`). The result set array supports both indexed access for top-N items and loop-based iteration for the remainder.

**Display the top 3 items by index:**

```javascript
var name = "";
name = resultSet[0]["0D_NW_BP__0D_NW_CNTRY"].description;
TX_Top1_Name.applyText(name);
name = resultSet[1]["0D_NW_BP__0D_NW_CNTRY"].description;
TX_Top2_Name.applyText(name);
name = resultSet[2]["0D_NW_BP__0D_NW_CNTRY"].description;
TX_Top3_Name.applyText(name);

var value = "";
value = resultSet[0][Alias.MeasureDimension].formattedValue + " m USD";
TX_Top1_Value.applyText(value);
value = resultSet[1][Alias.MeasureDimension].formattedValue + " m USD";
TX_Top2_Value.applyText(value);
value = resultSet[2][Alias.MeasureDimension].formattedValue + " m USD";
TX_Top3_Value.applyText(value);
```

**Build text blocks for the remaining items using a loop:**

```javascript
var countries = "Country \n\n\n";
var values = "Gross Order \n m USD \n\n";

for (var x = 3; x < resultSet.length; x++) {
  if (resultSet[x]["0D_NW_BP__0D_NW_CNTRY"].id !== Alias.TotalsMember) {
    countries = countries + ConvertUtils.numberToString(x + 1) + ". ";
    countries = countries + resultSet[x]["0D_NW_BP__0D_NW_CNTRY"].description + "\n";
    values = values + resultSet[x]["@MeasureDimension"].formattedValue + "\n";
  }
}

TX_Names.applyText(countries);
TX_Values.applyText(values);
```

> **Note:** The loop skips the totals row by checking `id !== Alias.TotalsMember`. `ConvertUtils.numberToString()` converts the numeric index to a string for display. The `@MeasureDimension` alias syntax (with `@`) is an alternative to `[Alias.MeasureDimension]`.

---

## External Resources

- **API Reference**: [https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)
- **Scripting Documentation**: [https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/6a4db9a9c8634bcb86cecbf1f1dbbf8e.html](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/6a4db9a9c8634bcb86cecbf1f1dbbf8e.html)

---

**Source**: SAP Analytics Designer Development Guide - Chapter 4: Scripting in Analytics Designer
**Last Updated**: 2025-11-23
