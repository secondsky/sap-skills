# SAP SAC Custom Widget JSON Schema Reference

Complete reference for the JSON metadata file that defines custom widgets.

**Source**: [SAP Custom Widget Developer Guide](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf) - Section 6.1

---

## Table of Contents

1. [Complete Schema Example](#complete-schema-example)
2. [Root Object](#root-object)
3. [Webcomponents Array](#webcomponents-array)
4. [Properties Object](#properties-object)
5. [Methods Object](#methods-object)
6. [Events Object](#events-object)
7. [DataBindings Object](#databindings-object)
8. [Custom Types](#custom-types)

---

## Complete Schema Example

```json
{
  "id": "com.company.advancedwidget",
  "version": "1.0.0",
  "name": "Advanced Custom Widget",
  "description": "A feature-rich custom widget with data binding",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "https://example.com/icon.png",
  "newInstancePrefix": "advWidget",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "advanced-widget",
      "url": "https://host.com/widget.js",
      "integrity": "sha256-abc123...",
      "ignoreIntegrity": false
    },
    {
      "kind": "styling",
      "tag": "advanced-widget-styling",
      "url": "https://host.com/styling.js",
      "integrity": "sha256-def456...",
      "ignoreIntegrity": false
    },
    {
      "kind": "builder",
      "tag": "advanced-widget-builder",
      "url": "https://host.com/builder.js",
      "integrity": "sha256-ghi789...",
      "ignoreIntegrity": false
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "Widget Title",
      "description": "The widget title"
    },
    "value": {
      "type": "number",
      "default": 0,
      "description": "Numeric value"
    },
    "enabled": {
      "type": "boolean",
      "default": true,
      "description": "Enable/disable widget"
    },
    "color": {
      "type": "Color",
      "default": "#336699",
      "description": "Primary color"
    },
    "items": {
      "type": "string[]",
      "default": [],
      "description": "List of items"
    },
    "config": {
      "type": "Object<string>",
      "default": {},
      "description": "Configuration object"
    }
  },
  "methods": {
    "refresh": {
      "description": "Refresh widget data",
      "body": "this._refresh();"
    },
    "setValue": {
      "description": "Set the widget value",
      "parameters": [
        {
          "name": "newValue",
          "type": "number",
          "description": "The new value"
        }
      ],
      "body": "this._setValue(newValue);"
    },
    "getValue": {
      "description": "Get the current value",
      "returnType": "number",
      "body": "return this._getValue();"
    }
  },
  "events": {
    "onSelect": {
      "description": "Fired when an item is selected"
    },
    "onChange": {
      "description": "Fired when value changes"
    },
    "onLoad": {
      "description": "Fired when widget loads"
    }
  },
  "dataBindings": {
    "myData": {
      "feeds": [
        {
          "id": "dimensions",
          "description": "Dimensions",
          "type": "dimension"
        },
        {
          "id": "measures",
          "description": "Measures",
          "type": "mainStructureMember"
        }
      ]
    }
  }
}
```

---

## Root Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | **Yes** | Unique identifier using reverse domain notation (e.g., "com.company.widgetname") |
| `version` | string | **Yes** | Semantic version (e.g., "1.0.0", "2.1.3") |
| `name` | string | **Yes** | Display name shown in SAC widget panel |
| `description` | string | No | Description shown in widget panel |
| `vendor` | string | No | Developer or company name |
| `license` | string | No | License type (MIT, Apache-2.0, proprietary) |
| `icon` | string | No | URL to widget icon (recommended: 32x32 PNG) |
| `newInstancePrefix` | string | No | Prefix for auto-generated script variable names |
| `webcomponents` | array | **Yes** | Array of web component definitions |
| `properties` | object | No | Widget properties accessible via script |
| `methods` | object | No | Methods callable from script |
| `events` | object | No | Events the widget can fire |
| `dataBindings` | object | No | Data binding configuration |

### ID Best Practices

```
com.company.widgetname     # Standard format
com.github.username.widget # GitHub-hosted
sap.sample.widget          # SAP samples only
```

---

## Webcomponents Array

Each widget can have up to three web components:

### Main Component (Required)

```json
{
  "kind": "main",
  "tag": "my-widget",
  "url": "https://host.com/widget.js",
  "integrity": "sha256-abc123...",
  "ignoreIntegrity": false
}
```

### Styling Panel (Optional)

```json
{
  "kind": "styling",
  "tag": "my-widget-styling",
  "url": "https://host.com/styling.js",
  "integrity": "sha256-def456...",
  "ignoreIntegrity": false
}
```

### Builder Panel (Optional)

```json
{
  "kind": "builder",
  "tag": "my-widget-builder",
  "url": "https://host.com/builder.js",
  "integrity": "sha256-ghi789...",
  "ignoreIntegrity": false
}
```

### Webcomponent Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `kind` | string | **Yes** | "main", "styling", or "builder" |
| `tag` | string | **Yes** | Custom element tag name (lowercase, hyphenated, must contain hyphen) |
| `url` | string | **Yes** | URL to JavaScript file (HTTPS required for external hosting) |
| `integrity` | string | No | SHA256 hash for subresource integrity |
| `ignoreIntegrity` | boolean | No | Skip integrity check (development only, default: false) |

### Tag Naming Rules

- Must be lowercase
- Must contain at least one hyphen (-)
- Cannot start with a hyphen
- Cannot use reserved names (like HTML elements)

**Valid**: `my-widget`, `company-chart-v2`, `data-grid-component`
**Invalid**: `MyWidget`, `widget`, `my_widget`

---

## Properties Object

### Simple Types

```json
{
  "stringProp": {
    "type": "string",
    "default": "default value",
    "description": "A string property"
  },
  "numberProp": {
    "type": "number",
    "default": 3.14,
    "description": "A floating-point number"
  },
  "integerProp": {
    "type": "integer",
    "default": 42,
    "description": "An integer"
  },
  "booleanProp": {
    "type": "boolean",
    "default": true,
    "description": "A boolean flag"
  }
}
```

### Array Types

```json
{
  "stringArray": {
    "type": "string[]",
    "default": ["item1", "item2"],
    "description": "Array of strings"
  },
  "numberArray": {
    "type": "number[]",
    "default": [1, 2, 3],
    "description": "Array of numbers"
  }
}
```

### Object Types

```json
{
  "objectProp": {
    "type": "Object<string>",
    "default": {},
    "description": "Object with string values"
  },
  "numberObject": {
    "type": "Object<number>",
    "default": { "a": 1, "b": 2 },
    "description": "Object with number values"
  }
}
```

### Script API Types

```json
{
  "colorProp": {
    "type": "Color",
    "default": "#336699",
    "description": "Color value"
  },
  "selectionProp": {
    "type": "Selection",
    "default": {},
    "description": "Selection object"
  }
}
```

**Note**: For detailed information on `Color` and `Selection` types, including their JavaScript usage patterns and structure, see [Script API Data Types](advanced-topics.md#script-api-data-types) in Advanced Topics.

### Property Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | **Yes** | Data type |
| `default` | varies | **Yes** | Default value matching type |
| `description` | string | No | Description for documentation |

---

## Methods Object

Methods allow scripts to call functions on the widget.

### Method Without Parameters

```json
{
  "refresh": {
    "description": "Refresh the widget",
    "body": "this._refresh();"
  }
}
```

> **⚠️ Important**: The `body` must call an internal method (prefixed with `_`) to avoid infinite recursion. When SAC invokes `Widget.refresh()`, it executes the body code. If the body calls `this.refresh()`, it would recursively call itself. Always use `this._refresh()` pattern.

### Method With Parameters

```json
{
  "setTitle": {
    "description": "Set the widget title",
    "parameters": [
      {
        "name": "newTitle",
        "type": "string",
        "description": "The new title text"
      }
    ],
    "body": "this._setTitle(newTitle);"
  }
}
```

### Method With Return Value

```json
{
  "getTotal": {
    "description": "Get the total value",
    "returnType": "number",
    "body": "return this._getTotal();"
  }
}
```

### Method With Multiple Parameters

```json
{
  "configure": {
    "description": "Configure the widget",
    "parameters": [
      { "name": "width", "type": "integer", "description": "Width in pixels" },
      { "name": "height", "type": "integer", "description": "Height in pixels" },
      { "name": "title", "type": "string", "description": "Title text" }
    ],
    "body": "this._configure(width, height, title);"
  }
}
```

### Method Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | No | Method description |
| `parameters` | array | No | Array of parameter definitions |
| `returnType` | string | No | Return type (if method returns value) |
| `body` | string | **Yes** | JavaScript code to execute |

---

## Events Object

Events allow the widget to notify scripts of user interactions or state changes.

### Basic Event

```json
{
  "onSelect": {
    "description": "Fired when an item is selected"
  },
  "onClick": {
    "description": "Fired when widget is clicked"
  },
  "onDataChange": {
    "description": "Fired when data changes"
  }
}
```

### Firing Events in Web Component

```javascript
// Simple event
this.dispatchEvent(new Event("onSelect"));

// Event with data (accessible via getEventInfo in script)
this.dispatchEvent(new CustomEvent("onSelect", {
  detail: {
    selectedItem: "item1",
    selectedIndex: 0
  }
}));
```

### Script Event Handler

In Analytics Designer script:
```javascript
// Event handler
Widget_1.onSelect = function() {
  console.log("Item selected");
  // Access event data if provided
  var eventInfo = Widget_1.getEventInfo();
};
```

---

## DataBindings Object

Enable widgets to receive data from SAC models.

### Basic Data Binding

```json
{
  "dataBindings": {
    "myBinding": {
      "feeds": [
        {
          "id": "dimensions",
          "description": "Dimensions",
          "type": "dimension"
        },
        {
          "id": "measures",
          "description": "Measures",
          "type": "mainStructureMember"
        }
      ]
    }
  }
}
```

### Feed Types

| Type | Description | Use Case |
|------|-------------|----------|
| `dimension` | Dimension members | Categories, labels, hierarchies |
| `mainStructureMember` | Measures/KPIs | Numeric values, calculations |

### Feed Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique identifier for the feed |
| `description` | string | **Yes** | Display name in Builder Panel |
| `type` | string | **Yes** | "dimension" or "mainStructureMember" |

### Multiple Feeds Example

```json
{
  "dataBindings": {
    "chartData": {
      "feeds": [
        { "id": "category", "description": "Category", "type": "dimension" },
        { "id": "series", "description": "Series", "type": "dimension" },
        { "id": "value", "description": "Value", "type": "mainStructureMember" },
        { "id": "target", "description": "Target", "type": "mainStructureMember" }
      ]
    }
  }
}
```

### Accessing Data in JavaScript

```javascript
// Access via property
const data = this.chartData.data;
const metadata = this.chartData.metadata;

// Iterate rows
this.chartData.data.forEach(row => {
  const category = row.category_0.label;
  const value = row.value_0.raw;
  console.log(`${category}: ${value}`);
});

// Via getDataBinding method
const binding = this.dataBindings.getDataBinding("chartData");
```

---

## Custom Types

Define reusable complex types for properties.

### Defining Custom Type

```json
{
  "types": {
    "ChartConfig": {
      "properties": {
        "chartType": { "type": "string", "default": "bar" },
        "showLegend": { "type": "boolean", "default": true },
        "colors": { "type": "string[]", "default": [] }
      }
    }
  },
  "properties": {
    "chartConfiguration": {
      "type": "ChartConfig",
      "default": {
        "chartType": "bar",
        "showLegend": true,
        "colors": ["#336699", "#669933"]
      }
    }
  }
}
```

---

## Validation Checklist

Before deploying, verify your JSON:

- [ ] `id` follows reverse domain notation
- [ ] `version` is semantic version format
- [ ] `name` is concise and descriptive
- [ ] All `webcomponents` have valid `tag` names (lowercase, hyphenated)
- [ ] All URLs are HTTPS (for external hosting)
- [ ] All `properties` have `type` and `default`
- [ ] All `methods` have `body`
- [ ] `integrity` is set for production (or explicitly `ignoreIntegrity: true` for dev)
- [ ] `dataBindings` feeds have unique `id` values

---

**Source Documentation**:
- [SAP Custom Widget Developer Guide (PDF)](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [SAP Help Portal - Custom Widgets](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html)

**Last Updated**: 2025-11-22
