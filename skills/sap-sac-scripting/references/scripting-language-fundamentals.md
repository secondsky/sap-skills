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

### Global Variables

Created via Outline panel → Script Variables → (+). Available across entire application:

```javascript
// Access global variable from any script
GlobalVariable_1 = "new value";
var currentValue = GlobalVariable_1;
```

### Script Variables in Calculated Measures

Script variables can be referenced in calculated measures for what-if simulations:

```javascript
// Formula: [Gross_Margin] * [@ScriptVariable_Rate]
// Change ScriptVariable_Rate via script to see updated results
```

### URL Parameters

Prefix global variable name with `p_` to pass values via URL:

```
https://your-sac-tenant.com/app?p_myVariable=value
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

Standard JavaScript switch is supported:

```javascript
switch (i) {
    case 0:
        day = "Zero";
        break;
    case 1:
        day = "One";
        break;
    case 2:
        day = "Two";
        break;
    default:
        day = "Unknown";
}
```

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

### while Loop

Fully supported:

```javascript
var nth = 1;
while (nth < 3) {
    console.log("Hello while, " + nth.toString());
    nth++;
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

Analytics Designer supports two equality operators with important differences:

| Operator | Name | Behavior |
|----------|------|----------|
| `===` | Triple equals (strict) | Compares value AND type |
| `==` | Double equals | Only valid if both sides have same static type |

**Triple Equals (Recommended)**:

```javascript
var aNumber = 1;
if (aNumber === "1") {
    // FALSE: Different types (number vs string)
}
```

**Double Equals**:

```javascript
var aNumber = 1;
if (aNumber == "1") {
    // TRUE in standard JS, but ERROR in Analytics Designer
    // unless both sides have same static type
}
```

**Best Practice**: Always use triple equals (`===`) for comparisons.

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

## External Resources

- **API Reference**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html
- **Scripting Documentation**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/6a4db9a9c8634bcb86cecbf1f1dbbf8e.html

---

**Source**: SAP Analytics Designer Development Guide - Chapter 4: Scripting in Analytics Designer
**Last Updated**: 2025-11-23
