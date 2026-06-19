---
name: widget-validate
description: Validates SAC custom widget JSON metadata and JavaScript structure for correctness and best practices
allowed-tools:
  - Read
  - Grep
argument-hint: [file_path]
---

## Shell Snippet Notes

- Shell snippets assume Bash on Linux/macOS, WSL2, or Git Bash.
- Install the command-specific tooling shown near each snippet before running it.
- Confirm before running commands that delete files, change ownership, deploy, or modify remote systems.

## Output Contract

Return validation status, manifest/resource findings, packaging risks, and safe local checks. Default to read-only validation and do not upload or publish widget content.


# SAC Custom Widget Validation Command

Validate SAP Analytics Cloud custom widget files (widget.json and widget.js) for schema compliance, required fields, and best practices.

## Usage

```
/widget-validate [file_path]
/widget-validate widget.json
/widget-validate src/widget.js
/widget-validate --all
```

## Validation Categories

### 1. widget.json Schema Validation

**Required Root Fields**:
- `id` - Unique identifier (reverse domain notation: com.company.widget)
- `version` - Semantic version (1.0.0)
- `name` - Display name
- `vendor` - Company/author name
- `webcomponents` - Array of component definitions

**Required webcomponents Fields**:
- `kind` - Component type (main, styling, builder)
- `tag` - HTML custom element tag (lowercase with hyphens)
- `url` - JavaScript file URL

**Optional but Recommended**:
- `description` - Widget description
- `license` - License type
- `icon` - Widget icon path
- `newInstancePrefix` - PascalCase default script variable prefix; required for generated packages
- `integrity` - SHA256 hash for production
- `properties` - Property definitions
- `methods` - Script-callable methods
- `events` - Custom events
- `dataBindings` - Data binding configuration

### 2. widget.js Structure Validation

**Required Elements**:
- Web Component class extending HTMLElement
- `customElements.define()` call matching tag in JSON
- `attachShadow({ mode: "open" })` for Shadow DOM

**Required Lifecycle Functions**:
- `onCustomWidgetBeforeUpdate(changedProperties)`
- `onCustomWidgetAfterUpdate(changedProperties)`

**Recommended Lifecycle Functions**:
- `onCustomWidgetResize()`
- `onCustomWidgetDestroy()`

**Property Patterns**:
- Getter/setter for each defined property
- `propertiesChanged` event dispatch on set

### 3. Data Binding Validation

If `dataBindings` is defined:
- Each binding must have `feeds` array
- Feeds must have `id`, `description`, `type`
- Valid feed types: `dimension`, `mainStructureMember`, `measure`
- JavaScript must access result rows with sequential indices matching feed order (`dimensions_0`, `dimensions_1`, `measures_0`, `measures_1`, ...)
- Skipped indices such as `measures_6` without preceding measure indices are invalid for generated packages

### 4. Generated Package Validation

For AI-generated packages:
- Manifest ID should use lowercase dot notation such as `com.company.widgetname`
- Custom element tag should use lowercase hyphen notation such as `com-company-widgetname`
- `newInstancePrefix` should use PascalCase letters only
- `methods` and `events` must be objects, not arrays
- `brandLogoUrl` property should be present when the main JS uses a brand logo
- Brand logo markup should use a standard `img` element such as `<img id="brandLogo" class="brand-logo" alt="">`
- Generated JavaScript should avoid optional chaining, nullish coalescing, arrow callbacks in `forEach`, and render-time template literals

### 5. Security Validation

**Production Readiness**:
- `ignoreIntegrity` should be `false` for production
- `integrity` hash should be present and valid
- URLs should use HTTPS

**Warning-Level**:
- `ignoreIntegrity: true` (development only)
- HTTP URLs (not recommended)
- Missing CORS considerations in comments

### 6. CSS and Styling Compliance

SAP Help distinguishes internal custom-widget resources from SAC story/theme CSS support. Validate generated packages with these rules:

- Internal Web Component CSS, including Shadow DOM `<style>` and `:host`, is allowed.
- Generated widgets should not depend on SAC optimized story theme CSS, global story CSS classes, or undocumented SAP shell selectors to style widget internals.
- `webcomponents[].url` should point to JavaScript component files for `main`, `styling`, or `builder`, not `.css` or `.html`.
- For SAC ZIP resource upload packages, separate CSS and HTML resource files are not supported; embed CSS in component JavaScript templates.
- Remote CSS imports, font URLs, and CSS `url(http...)` assets require explicit approved hosting and should be warnings for generated packages.

## Validation Process

1. **Identify file type** (JSON or JavaScript)
2. **Parse and validate structure**
3. **Check required fields and patterns**
4. **Cross-validate JSON and JS** (if both present)
5. **Report findings with severity levels**

## Output Format

```
## SAC Widget Validation Report

**File**: [filename]
**Type**: [widget.json / widget.js]
**Status**: [PASS / FAIL / WARNINGS]

### Critical Issues (X found)
1. [Line X]: [Issue description]
   **Current**: `[problematic code]`
   **Required**: `[correct pattern]`

### Warnings (X found)
1. [Line X]: [Issue description]
   **Recommendation**: [How to fix]

### Suggestions (X found)
1. [Issue description]
   **Best Practice**: [Recommendation]

### Summary
- Critical: X (must fix)
- Warnings: X (should fix)
- Suggestions: X (consider)

### Cross-Validation
[Results of JSON ↔ JS consistency check if applicable]
```

## Examples

### Validate widget.json
```
/widget-validate widget.json
```

### Validate widget.js
```
/widget-validate widget.js
```

### Validate All Widget Files
```
/widget-validate --all
```

## Validation Rules Detail

### Tag Naming Convention
```json
// GOOD: lowercase with hyphens; generated packages should include the company prefix
"tag": "com-company-widgetname"

// BAD: uppercase or underscores
"tag": "MyCustomWidget"
"tag": "my_custom_widget"
```

### Manifest Object Shape
```json
// GOOD
"methods": {},
"events": {}

// BAD
"methods": [],
"events": []
```

### Sequential Data Indices
```javascript
// GOOD
var label = row.dimensions_0 && row.dimensions_0.label ? row.dimensions_0.label : "";
var value = row.measures_0 && typeof row.measures_0.raw === "number" ? row.measures_0.raw : 0;

// BAD
var value = row.measures_6.raw;
```

### Property Type Validation
```json
// Valid types
"type": "string"
"type": "integer"
"type": "number"
"type": "boolean"
"type": "array"
"type": "object"
"type": "Color"     // SAC special type
"type": "Selection" // SAC special type
```

### Lifecycle Function Check
```javascript
// REQUIRED - will fail validation if missing
onCustomWidgetBeforeUpdate(changedProperties) { }
onCustomWidgetAfterUpdate(changedProperties) { }

// RECOMMENDED - warning if missing
onCustomWidgetResize() { }
onCustomWidgetDestroy() { }
```

### customElements.define Match
```javascript
// Tag in widget.json
"tag": "my-widget"

// Must match in widget.js
customElements.define("my-widget", MyWidget);
```

### CSS and Theme Boundary
```javascript
// GOOD: Scoped Shadow DOM style
template.innerHTML = "<style>:host{display:block;width:100%;height:100%;}</style><div></div>";

// BAD: Attempts to style SAC/story page outside the widget
document.head.appendChild(globalStyleForSacShell);
```

## Implementation Instructions

When this command is invoked:

1. Parse the file path argument
2. If `--all`, find all widget.json and widget.js files in the project
3. For each file:
   - Read file contents
   - Determine file type (JSON or JavaScript)
   - Apply appropriate validation rules
   - Record issues with line numbers where possible
4. If both widget.json and widget.js found in same directory:
   - Cross-validate tag names
   - Verify property definitions match getters/setters
   - Check event definitions match dispatches
5. Present findings in the format above
6. Provide summary with counts by severity
