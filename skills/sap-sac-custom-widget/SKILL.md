---
name: sap-sac-custom-widget
description: |
  SAP Analytics Cloud (SAC) Custom Widget development skill. Use when building custom visualizations, interactive components, extending SAC with Web Components, or creating Widget Add-Ons to customize built-in widgets. Covers JSON metadata configuration, JavaScript Web Components, lifecycle functions (onCustomWidgetBeforeUpdate, onCustomWidgetAfterUpdate, onCustomWidgetResize, onCustomWidgetDestroy), data binding with feeds, styling panels, builder panels, property/event/method definitions, custom types (enumerations, data structures), script API data types (Selection, MemberInfo, ResultMemberInfo), third-party library integration (ECharts, D3.js, Chart.js), hosting options (SAC-hosted, GitHub, AWS, Azure), security (integrity hash, CORS), performance optimization, and debugging techniques. Includes Widget Add-On feature (QRC Q4 2023+) for extending built-in widgets without creating from scratch. Provides templates for basic widgets, data-bound charts, styling panels, and KPI cards. Supports Optimized Story Experience and Analytics Designer. Prevents common errors: missing lifecycle functions, incorrect JSON schema, integrity warnings, CORS failures, property type mismatches, data binding issues, and performance anti-patterns.

  Keywords: sap analytics cloud, sac custom widget, custom widget development, web component sac, json metadata widget, widget lifecycle functions, onCustomWidgetBeforeUpdate, onCustomWidgetAfterUpdate, onCustomWidgetResize, onCustomWidgetDestroy, sac data binding, widget data binding, dataBindings feeds, getDataBinding, getResultSet, styling panel widget, builder panel widget, widget properties events methods, propertiesChanged event, dispatchEvent custom widget, sac echarts integration, sac d3js integration, third party library sac, widget hosting sac, sac hosted widget, integrity hash widget, sha256 integrity, widget security cors, sac widget debugging, custom visualization sac, sac analytics designer widget, optimized story experience widget, sac widget api, widget add-on, sac script api widget, custom types enumeration, MemberInfo ResultMemberInfo Selection, widget installation admin, sac performance optimization, shadow dom web component, sac tooltip customization, plot area addon

license: MIT
metadata:
  version: 1.1.0
  last_verified: 2025-11-22
  sac_version: "2025.19"
  token_savings: ~75%
  errors_prevented: 25+
  official_docs:
    - https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html
    - https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf
  samples_repo: https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - WebFetch
---

# SAP Analytics Cloud Custom Widget Development

## Overview

This skill enables development of custom widgets for SAP Analytics Cloud (SAC). Custom widgets are Web Components that extend SAC stories and applications with custom visualizations, interactive elements, and specialized functionality.

**Use this skill when**:
- Building custom visualizations not available in standard SAC
- Integrating third-party charting libraries (ECharts, D3.js, Chart.js)
- Creating interactive input components for SAC applications
- Implementing specialized data displays or KPI widgets
- Extending Analytics Designer applications with custom functionality
- Troubleshooting custom widget loading or data binding issues

**Requirements**:
- SAC tenant with Optimized Story Experience or Analytics Designer
- JavaScript/Web Components knowledge
- External hosting (GitHub Pages, AWS S3, Azure) OR SAC-hosted resources (QRC Q2 2023+)

---

## Quick Start

### Minimal Custom Widget Structure

A custom widget requires two files:

**1. widget.json** (Metadata)
```json
{
  "id": "com.company.mywidget",
  "version": "1.0.0",
  "name": "My Custom Widget",
  "description": "A simple custom widget",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "my-custom-widget",
      "url": "https://your-host.com/widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "My Widget"
    }
  },
  "methods": {},
  "events": {}
}
```

**2. widget.js** (Web Component)
```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .container {
        padding: 16px;
        font-family: Arial, sans-serif;
      }
    </style>
    <div class="container">
      <h3 id="title">My Widget</h3>
      <div id="content"></div>
    </div>
  `;

  class MyCustomWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }

    connectedCallback() {
      // Called when element is added to DOM
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      // Called BEFORE properties are updated
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      // Called AFTER properties are updated - render here
      if (changedProperties.title !== undefined) {
        this._shadowRoot.getElementById("title").textContent = changedProperties.title;
      }
    }

    onCustomWidgetResize() {
      // Called when widget is resized
    }

    onCustomWidgetDestroy() {
      // Cleanup when widget is removed
    }

    // Property getter/setter (required for SAC framework)
    get title() {
      return this._props.title;
    }
    set title(value) {
      this._props.title = value;
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties: { title: value } }
      }));
    }
  }

  customElements.define("my-custom-widget", MyCustomWidget);
})();
```

**⚠️ Production Note**: The `ignoreIntegrity: true` setting above is **development only**. For production deployments, generate a SHA256 integrity hash (see [Security: Integrity Hash](#security-integrity-hash) section) and set `ignoreIntegrity: false` to ensure widget security and avoid admin warnings.

---

## Community Sample Widgets

SAP provides 15+ ready-to-use custom widget samples:

**Repository**: [SAP-samples/SAC_Custom_Widgets](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)

| Category | Widgets |
|----------|---------|
| **Charts** | Funnel, Pareto, Sankey, Sunburst, Tree, Line, UI5 Gantt |
| **KPI/Gauge** | KPI Ring, Gauge Grade, Half Donut, Nested Pie, Custom Pie |
| **Utilities** | File Upload, Word Cloud, Bar Gradient, Widget Add-on Sample |

**Requirements**: Optimized View Mode (OVM) enabled, data binding support

**Hosting Guides**: [SAC-hosted](https://community.sap.com/t5/technology-blogs-by-sap/hosting-and-uploading-custom-widgets-resource-files-into-sap-analytics/ba-p/13563064) | [GitHub-hosted](https://community.sap.com/t5/technology-blogs-by-sap/hosting-sap-analytics-cloud-custom-widgets-into-github/ba-p/13566633)

**Note**: Check third-party library licenses before production use.

---

## JSON Metadata Reference

### Root Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (reverse domain notation) |
| `version` | string | Yes | Semantic version (e.g., "1.0.0") |
| `name` | string | Yes | Display name in SAC |
| `description` | string | No | Widget description |
| `vendor` | string | No | Developer/company name |
| `license` | string | No | License type (MIT, Apache-2.0) |
| `icon` | string | No | Icon URL or empty string |
| `newInstancePrefix` | string | No | Prefix for script variable names |
| `webcomponents` | array | Yes | Array of web component definitions |
| `properties` | object | No | Widget properties |
| `methods` | object | No | Script-callable methods |
| `events` | object | No | Events widget can fire |
| `dataBindings` | object | No | Data binding configuration |

### Webcomponents Array

Each webcomponent object:

```json
{
  "kind": "main",
  "tag": "element-tag-name",
  "url": "https://host.com/component.js",
  "integrity": "sha256-...",
  "ignoreIntegrity": true
}
```

| Property | Values | Description |
|----------|--------|-------------|
| `kind` | "main", "styling", "builder" | Component type |
| `tag` | string | Custom element tag name (lowercase, hyphenated) |
| `url` | string | URL to JavaScript file |
| `integrity` | string | SHA256 hash for security |
| `ignoreIntegrity` | boolean | Skip integrity check (dev only) |

### Property Types

```json
"properties": {
  "textValue": { "type": "string", "default": "" },
  "numericValue": { "type": "number", "default": 0 },
  "integerValue": { "type": "integer", "default": 0 },
  "booleanValue": { "type": "boolean", "default": false },
  "arrayValue": { "type": "string[]", "default": [] },
  "objectValue": { "type": "Object<string>", "default": {} },
  "colorValue": { "type": "Color", "default": "#000000" },
  "selectionValue": { "type": "Selection", "default": {} }
}
```

---

## Lifecycle Functions

The SAC framework calls lifecycle functions in this order:

### Initial Render
1. `constructor()` - Initialize properties
2. `onCustomWidgetBeforeUpdate(changedProperties)` - Pre-update hook
3. Property setters called
4. `onCustomWidgetAfterUpdate(changedProperties)` - Post-update, render here
5. `connectedCallback()` - DOM attached

### Property Update
1. `onCustomWidgetBeforeUpdate(changedProperties)`
2. Property setters
3. `onCustomWidgetAfterUpdate(changedProperties)`

### Best Practice Pattern

```javascript
onCustomWidgetBeforeUpdate(changedProperties) {
  // Merge new properties with existing
  this._props = { ...this._props, ...changedProperties };
}

onCustomWidgetAfterUpdate(changedProperties) {
  // Render changes
  this._render();
}

_render() {
  // Update DOM based on this._props
}
```

---

## Data Binding

Enable widgets to receive data from SAC models.

### JSON Configuration

```json
{
  "dataBindings": {
    "myDataBinding": {
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

### Accessing Data in Web Component

```javascript
// Get data binding object
const dataBinding = this.dataBindings.getDataBinding("myDataBinding");

// Access result set
const data = this.myDataBinding.data;
const metadata = this.myDataBinding.metadata;

// Iterate over rows
this.myDataBinding.data.forEach(row => {
  const dimensionValue = row.dimensions_0.label;
  const measureValue = row.measures_0.raw;
  // Process data...
});
```

### Data Binding with getResultSet

```javascript
async fetchData() {
  const dataBinding = this.dataBindings.getDataBinding("myDataBinding");
  const resultSet = await dataBinding.getResultSet();
  // Process resultSet...
}
```

---

## Styling Panel

Add design-time customization for users.

### JSON Configuration

```json
{
  "webcomponents": [
    { "kind": "main", "tag": "my-widget", "url": "widget.js", ... },
    { "kind": "styling", "tag": "my-widget-styling", "url": "styling.js", ... }
  ]
}
```

### Styling Panel Template (styling.js)

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      .panel { padding: 12px; }
      label { display: block; margin: 8px 0 4px; }
      input, select { width: 100%; padding: 4px; }
    </style>
    <div class="panel">
      <label>Title</label>
      <input type="text" id="titleInput" />
      <label>Color</label>
      <input type="color" id="colorInput" />
    </div>
  `;

  class MyWidgetStyling extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this._shadowRoot.getElementById("titleInput").addEventListener("change", (e) => {
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
          detail: { properties: { title: e.target.value } }
        }));
      });

      this._shadowRoot.getElementById("colorInput").addEventListener("input", (e) => {
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
          detail: { properties: { color: e.target.value } }
        }));
      });
    }

    onCustomWidgetBeforeUpdate(changedProperties) {}

    onCustomWidgetAfterUpdate(changedProperties) {
      if (changedProperties.title !== undefined) {
        this._shadowRoot.getElementById("titleInput").value = changedProperties.title;
      }
      if (changedProperties.color !== undefined) {
        this._shadowRoot.getElementById("colorInput").value = changedProperties.color;
      }
    }
  }

  customElements.define("my-widget-styling", MyWidgetStyling);
})();
```

---

## Hosting Options

### Option 1: SAC-Hosted (Recommended, QRC Q2 2023+)

Upload files directly to SAC:
1. In SAC, go to Files > Public Files
2. Create folder for widget files
3. Upload JSON and JS files
4. Update JSON url: `"/path/to/widget.js"` (relative path)
5. Set `"integrity": ""` and `"ignoreIntegrity": true`

### Option 2: GitHub Pages

1. Create repository with widget files
2. Enable GitHub Pages in Settings
3. Use URL: `https://username.github.io/repo/widget.js`

### Option 3: External Web Server

Host on AWS S3, Azure Blob, or any HTTPS server with proper CORS headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type
```

---

## Security: Integrity Hash

For production, generate SHA256 hash:

```bash
# Generate hash
openssl dgst -sha256 -binary widget.js | openssl base64 -A
# Output: abc123...

# Update JSON
"integrity": "sha256-abc123...",
"ignoreIntegrity": false
```

**Warning**: `ignoreIntegrity: true` shows security warning to admins. Use only in development.

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "The system couldn't load the custom widget" | Incorrect URL or hosting issue | Verify URL is accessible, check CORS |
| "Integrity check failed" | Hash mismatch | Regenerate hash after JS changes |
| Widget not appearing | Missing connectedCallback render | Call render in onCustomWidgetAfterUpdate |
| Properties not updating | Missing propertiesChanged dispatch | Use dispatchEvent with propertiesChanged |
| Data not displaying | Data binding misconfigured | Verify feeds in JSON match usage |
| CORS error | Server missing headers | Add Access-Control-Allow-Origin header |

---

## Debugging

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Sources tab: Find widget.js, set breakpoints
3. Console tab: View console.log output
4. Network tab: Check if files load (200 status)

### Debug Pattern

```javascript
onCustomWidgetAfterUpdate(changedProperties) {
  console.log("Widget updated:", changedProperties);
  console.log("Current props:", this._props);
  console.log("Data binding:", this.myDataBinding?.data);
  this._render();
}
```

### Network Debugging
1. Open DevTools > Network tab
2. Check "Disable cache" and "Preserve log"
3. Reload story
4. Look for failed requests (red)

---

## Widget Add-Ons (QRC Q4 2023+)

Widget Add-Ons extend built-in SAC widgets without building from scratch.

**Use Cases**:
- Customize chart tooltips
- Add visual elements to plot areas
- Override built-in styling

**Supported Charts**: Bar/Column, Stacked Bar/Column, Line, Stacked Area, Numeric Point

**Key Differences from Custom Widgets**:
- Only `main` and `builder` components (no `styling`)
- Must specify extension target (`tooltip`, `plotArea`, `numericPoint`)
- SAC provides chart context data via methods

See **`references/widget-addon-guide.md`** for complete implementation guide.

---

## Bundled Resources

For detailed templates and examples, see:

1. **`references/json-schema-reference.md`** - Complete JSON schema documentation
2. **`references/widget-templates.md`** - Ready-to-use widget templates (6 templates)
3. **`references/echarts-integration.md`** - ECharts library integration guide
4. **`references/widget-addon-guide.md`** - Widget Add-On development (QRC Q4 2023+)
5. **`references/best-practices-guide.md`** - Performance, security, and development guidelines
6. **`references/advanced-topics.md`** - Custom types, script API types, installation
7. **`references/integration-and-migration.md`** - Script integration, content transport, story compatibility, planning
8. **`references/script-api-reference.md`** - DataSource, Selection, MemberInfo, ResultSet, Filter, Planning APIs

---

## Official Documentation Links

**Primary References** (for skill updates):
- [Custom Widget Developer Guide](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html?version=2025.19&locale=en-US)
- [Developer Guide PDF](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Widget API PDF (2025)](https://help.sap.com/doc/7e0efa0e68dc45958e568699f8226ad7/cloud/en-US/SAC_Widget_API_en.pdf)
- [Analytics Designer API Reference](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)

**Sample Widgets**:
- [SAP Samples Repository](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)
- [SAP Custom Widget GitHub](https://github.com/SAP-Custom-Widget)

**Community Resources**:
- [Hands-on Guide](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-analytics-cloud-custom-widget-hands-on-guide/ba-p/13573631)
- [Data Binding Announcement](https://blogs.sap.com/2022/05/25/announcing-custom-widgets-data-binding-in-sap-analytics-cloud-analytics-designer/)
- [Widget Add-on Feature](https://community.sap.com/t5/technology-blog-posts-by-sap/announcing-the-new-sap-analytics-cloud-feature-widget-add-on/ba-p/13575788)

---

## Version History

**v1.1.0** (2025-11-22)
- Added Widget Add-On feature documentation (QRC Q4 2023+)
- Added best practices guide (performance, security, development)
- Added advanced topics (custom types, script API types, installation)
- Enhanced description with additional keywords
- Increased error prevention coverage to 25+

**v1.0.0** (2025-11-22)
- Initial release
- Complete JSON metadata reference
- Lifecycle functions documentation
- Data binding guide
- Styling panel implementation
- Hosting options (SAC-hosted, GitHub, external)
- Security (integrity hash, CORS)
- Common errors and debugging

---

**Last Verified**: 2025-11-22 | **SAC Version**: 2025.19 | **Skill Version**: 1.1.0
