# SAC Debugging and Browser Tools Reference

Complete guide for debugging Analytics Designer scripts using browser developer tools.

---

## Table of Contents

1. [Console Logging](#console-logging)
2. [Browser Debugging](#browser-debugging)
3. [Debug Mode](#debug-mode)
4. [Breakpoints](#breakpoints)
5. [Script Editor Tools](#script-editor-tools)
6. [R Visualization Debugging](#r-visualization-debugging)
7. [Performance Logging](#performance-logging)
8. [Common Issues](#common-issues)

---

## Console Logging

The primary debugging method using `console.log()`.

### Basic Usage

```javascript
var nth = 1;
console.log("Hello World, " + nth.toString());
// Output: Hello World, 1
```

### Logging Objects

```javascript
// Log complex objects
var selections = Chart_1.getSelections();
console.log(selections);

// Log data source variables
var ds = Chart_1.getDataSource();
console.log(ds.getVariables());

// Log member info
var members = ds.getMembers("Location", 5);
console.log(members);
```

### Viewing Console Output

1. Run the analytic application
2. Press **F12** or **Ctrl+Shift+J** to open Developer Tools
3. Go to **Console** tab
4. Filter by "Info" type if needed
5. Expand `sandbox.worker.main.*.js` entries for your logs

**Note**: Scripts are stored as minified variables and aren't directly debuggable in the console. Use `console.log()` to inspect values.

---

## Browser Debugging

Detailed steps for debugging Analytics Designer scripts in Chrome browser.

**Note**: Analytics Designer supports debugging only in **Chrome** browser.

**Note**: Scripts are transformed before execution, so they won't look exactly like the code in the script editor.

**Note**: Scripts must run at least once in the current session to appear in dev tools.

### Script Naming Convention

Analytics Designer scripts follow a specific naming pattern:

- **Folder**: `<APPLICATION_NAME>`
- **Script**: `<WIDGET_NAME>.<FUNCTION_NAME>.js`

**Example**:
- Application: `My Demo Application`
- Widget: `Button_1` with `onClick` event
- Script name: `Button_1.onClick.js`
- Folder: `My_Demo_Application`

**Note**: Special characters (except `-` and `.`) are replaced with underscore (`_`).

### Find Script by Name (Quick Method)

1. Press **F12** to open Developer Tools
2. Press **Ctrl+P**
3. Start typing part of the script name (e.g., `Button_1.on`)
4. Select from the list

### Find Script by File Tree

1. Press **F12** to open Developer Tools
2. Select **Sources** tab
3. Open node starting with `sandbox.worker.main`
4. Open **AnalyticApplication** node
5. Find folder with your application name
6. Scripts executed in current session appear here

**File Tree Structure**:
```
sandbox.worker.main.js
└── AnalyticApplication
    └── My_Demo_Application
        ├── Application.onInitialization.js
        ├── Button_1.onClick.js
        └── ScriptObject_1.returnText.js
```

---

## Debug Mode

Enable enhanced debugging features with debug mode.

### Enabling Debug Mode

Append `;debug=true` to the application URL:

```
https://your-tenant.sapanalytics.cloud/app.html?story=STORY_ID;debug=true
```

### Debug Mode Features

1. **debugger; statement support**: Pause execution at specific lines
2. **Comment preservation**: Comments in scripts are kept in transformed code
3. **Script name suffix**: Scripts get `-dbg` suffix (e.g., `Button_1.onClick-dbg.js`)

### Using debugger; Statement

With debug mode enabled, add `debugger;` to pause execution:

```javascript
/*
 * This is a block comment
 */

// Debug point
debugger;

// This is a comment
return Text_1.getPlainText();
```

**Advantages over breakpoints**:
- Define pause location while writing code
- Don't need to find script in dev tools first
- Persists across sessions

---

## Breakpoints

Set breakpoints to pause script execution at specific lines.

### Setting a Breakpoint

1. Open Developer Tools (F12)
2. Navigate to your script in Sources tab
3. Click on the **line number** where you want to pause
4. A **blue marker** appears on that line

### Multiple Breakpoints

Add several breakpoints to pause at different points:
- Each clicked line number gets a blue marker
- Script pauses at each breakpoint when executed

### Removing a Breakpoint

Click on the blue marker to remove it.

### Execution Controls

When paused at a breakpoint:

| Button | Action |
|--------|--------|
| Resume (F8) | Continue execution |
| Step Over (F10) | Execute current line, move to next |
| Step Into (F11) | Enter function call |
| Step Out (Shift+F11) | Exit current function |

### Inspecting Variables

While paused:
1. Hover over variables to see values
2. Use **Scope** panel to see all variables
3. Use **Watch** panel to track specific expressions
4. Use **Console** to evaluate expressions

---

## Script Editor Tools

Built-in debugging features in the Analytics Designer script editor.

### Errors and Warnings

The Info panel displays validation results:

1. Open **Info** panel at bottom of designer
2. Click **Errors** tab
3. Search or filter (errors only, warnings only, both)
4. Double-click error to open script and jump to location

**Visual Indicators**:
- **Red underline**: Error
- **Orange underline**: Warning
- **Red marker**: Error at line number
- **Orange marker**: Warning at line number

### Find References

Find all places where a widget or scripting object is used:

1. Right-click object in **Outline**
2. Select **Find References**
3. Results appear in **Reference list** tab of Info panel

### Renaming with Refactoring

When you rename objects, all references update automatically:

**Renamable Objects**:
- Widgets
- Gadgets
- Script variables
- Script objects
- Script object functions
- Function arguments

**Renaming Methods**:

1. **Via Outline**:
   - Select object in Outline
   - Click **...** (More) button
   - Select **Rename**
   - Enter new name

2. **Via Styling Panel**:
   - Select object in Outline
   - Enter new name in **Name** field
   - Click **Done** (for script objects)

3. **Function Arguments**:
   - Select script object function
   - Click **Edit** button for argument
   - Enter new name
   - Click **Done**

---

## R Visualization Debugging

Debug R scripts and their JavaScript integration.

### R Widget Runtime Environments

R widgets have two separate environments:

1. **R environment**: Server-side, in R engine
2. **JavaScript environment**: Browser-side, with other widget scripts

### Execution Order

**On Startup**:
- R script runs
- `onResultSetChanged` JavaScript event does NOT run (initial state)

**On Data Change**:
1. R script runs first
2. `onResultChanged` JavaScript event runs

### Reading R Environment from JavaScript

```javascript
// R script creates: gmCorrelation <- cor(grossMargin, grossMarginPlan)

// JavaScript reads the value
var nCor = this.getEnvironmentValues().getNumber("gmCorrelation");
var sCor = nCor.toString();
console.log("Margin Correlation: " + sCor);
```

### Writing to R Environment from JavaScript

```javascript
// Set R environment variable from JavaScript
RVisualization_1.getInputParameters().setNumber("userSelection", 0);
```

### Available Methods

**Reading**:
- `getEnvironmentValues().getNumber(variableName)`
- `getEnvironmentValues().getString(variableName)`

**Writing**:
- `getInputParameters().setNumber(variableName, value)`
- `getInputParameters().setString(variableName, value)`

---

## Performance Logging

Enable detailed performance tracking for optimization.

### Enabling Performance Logging

Add URL parameter:
```
?APP_PERFORMANCE_LOGGING=true
```

### Viewing Performance Data

In browser console:

```javascript
// Get all performance entries for the application
window.sap.raptr.getEntriesByMarker("(Application)")
    .filter(e => e.entryType === 'measure')
    .sort((a,b) => (a.startTime + a.duration) - (b.startTime + b.duration));
```

### Performance Entry Properties

| Property | Description |
|----------|-------------|
| `name` | Operation name |
| `entryType` | Entry type (measure, mark) |
| `startTime` | Start timestamp |
| `duration` | Execution time in ms |

---

## Common Issues

### Script Not Appearing in Dev Tools

**Problem**: Can't find script in Sources tab.

**Solution**: Script must run at least once. Trigger the event (click button, select chart, etc.) then refresh dev tools.

### Breakpoint Not Hit

**Problem**: Breakpoint set but execution doesn't pause.

**Solution**:
1. Ensure script is for the correct event
2. Check if the event actually triggers
3. Try using `debugger;` statement instead

### debugger; Statement Ignored

**Problem**: `debugger;` doesn't pause execution.

**Solution**: Enable debug mode by adding `;debug=true` to URL.

### Console.log Not Showing

**Problem**: `console.log()` output not visible.

**Solution**:
1. Open correct browser (Chrome)
2. Check Console tab
3. Clear filters that might hide output
4. Look in `sandbox.worker.main.*.js` entries

### Variables Show as undefined

**Problem**: Variables appear undefined when inspected.

**Solution**: Scripts are transformed before execution. Variable names may differ. Use `console.log()` to inspect actual values.

### Script Looks Different in Debugger

**Problem**: Code in debugger doesn't match script editor.

**This is expected**: Analytics Designer transforms scripts before browser execution. The logic is the same, but syntax may differ.

---

## Debugging Checklist

Before debugging:

- [ ] Using Chrome browser
- [ ] Developer Tools open (F12)
- [ ] Script has been executed at least once
- [ ] For `debugger;`, debug mode enabled (`;debug=true`)
- [ ] Console tab open for `console.log()` output
- [ ] Sources tab open for breakpoints

During debugging:

- [ ] Start with simple `console.log()` to verify code runs
- [ ] Check Info panel for script errors first
- [ ] Use Find References to understand dependencies
- [ ] Test incrementally (every 5-10 lines)
- [ ] Check variable types match expected

---

## Keyboard Shortcuts Summary

| Shortcut | Action |
|----------|--------|
| F12 | Open Developer Tools |
| Ctrl+Shift+J | Open Console directly |
| Ctrl+P | Quick file search (in Sources) |
| F8 | Resume execution |
| F10 | Step over |
| F11 | Step into |
| Shift+F11 | Step out |

For script editor shortcuts, see: https://help.sap.com/doc/00f68c2e08b941f081002fd3691d86a7/release/en-US/68dfa2fd057c4d13ad2772825e83b491.html

---

**Source**: SAP Analytics Designer Development Guide - Chapter 4: Scripting in Analytics Designer
**Last Updated**: 2025-11-23
