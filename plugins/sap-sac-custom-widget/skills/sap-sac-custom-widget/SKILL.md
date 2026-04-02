---
name: sap-sac-custom-widget
description: "SAP Analytics Cloud (SAC) Custom Widget development. Use when building custom visualizations, extending SAC with Web Components, or creating Widget Add-Ons. Covers JSON metadata, JavaScript Web Components, lifecycle functions, data binding with feeds, styling/builder panels, property/event/method definitions, third-party library integration, hosting, security, performance, and debugging. Includes Widget Add-On feature (QRC Q4 2023+) and templates for widgets, charts, and KPI cards."

license: GPL-3.0
metadata:
  version: 2.0.0
  last_verified: 2025-12-27
  sac_version: "2025.21"
  errors_prevented: 25+
  official_docs:
    - "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html"
    - "https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf"
  samples_repo: "https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets"
  keywords: [sap analytics cloud, sac custom widget, web component sac, json metadata widget, widget lifecycle functions, onCustomWidgetBeforeUpdate, onCustomWidgetAfterUpdate, onCustomWidgetResize, onCustomWidgetDestroy, sac data binding, dataBindings feeds, styling panel widget, builder panel widget, sac echarts integration, sac d3js integration, third party library sac, widget hosting sac, integrity hash widget, sha256 integrity, widget security cors, sac widget debugging, sac analytics designer widget, optimized story experience widget, sac widget api, widget add-on, sac script api widget, shadow dom web component, sac tooltip customization, plot area addon]
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - WebFetch
---

# SAP Analytics Cloud Custom Widget Development

## Table of Contents
- [Overview](#overview)
- [Plugin Components](#plugin-components)
- [Quick Start](#quick-start)
- [Community Sample Widgets](#community-sample-widgets)
- [Key Concepts](#key-concepts)
- [Common Errors & Solutions](#common-errors--solutions)
- [Bundled Resources](#bundled-resources)

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

## Plugin Components

This plugin provides specialized agents, commands, and validation hooks for comprehensive widget development support.

### Agents

| Agent | Color | Purpose | Trigger Examples |
|-------|-------|---------|------------------|
| **widget-architect** | Blue | Design widget structure, metadata, and integration patterns | "design custom widget", "plan widget architecture" |
| **widget-debugger** | Yellow | Troubleshoot loading, data binding, CORS, and runtime issues | "widget won't load", "CORS error", "data not binding" |
| **widget-api-assistant** | Green | Write JavaScript widget code, lifecycle functions, API integrations | "write widget code", "implement lifecycle functions" |

### Commands

| Command | Usage | Description |
|---------|-------|-------------|
| `/widget-validate` | `/widget-validate [file]` | Validate widget.json schema and widget.js structure |
| `/widget-generate` | `/widget-generate` | Interactively generate widget scaffold with JSON + JS |
| `/widget-lint` | `/widget-lint [file]` | Performance, security, and best practices analysis |

### Validation Hooks

Automatic quality checks triggered on Write/Edit operations:
- **widget.json**: Required fields, tag naming, property types, data binding config
- **widget.js**: Lifecycle functions, Shadow DOM, propertiesChanged dispatch
- **Performance**: Resize debouncing, chart disposal, XSS prevention
- **Context Reminders**: Template suggestions, command recommendations

### Templates

Ready-to-use scaffolds in `templates/` directory:
- `basic-widget.js` - Minimal Web Component with all lifecycle functions
- `data-bound-chart.js` - ECharts widget with data binding
- `styling-panel.js` - Runtime customization panel
- `widget.json-minimal` - Bare-minimum metadata
- `widget.json-complete` - Full-featured metadata with all options

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
      "url": "[https://your-host.com/widget.js",](https://your-host.com/widget.js",)
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

**⚠️ Production Note**: The `ignoreIntegrity: true` setting above is **development only**. For production deployments, generate a SHA256 integrity hash and set `ignoreIntegrity: false`.

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

**Note**: Check third-party library licenses before production use.

---

## Key Concepts

### Lifecycle Functions
Essential functions called by SAC framework:
- `onCustomWidgetBeforeUpdate(changedProperties)` - Pre-update hook
- `onCustomWidgetAfterUpdate(changedProperties)` - Post-update (render here)
- `onCustomWidgetResize()` - Handle resize events
- `onCustomWidgetDestroy()` - Cleanup resources

### Data Binding
Configure in widget.json to receive SAC model data:
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

Access data in JavaScript:
```javascript
// Get data binding
const dataBinding = this.dataBindings.getDataBinding("myDataBinding");

// Access result set
const data = this.myDataBinding.data;
const metadata = this.myDataBinding.metadata;

// Iterate over rows
this.myDataBinding.data.forEach(row => {
  const dimensionValue = row.dimensions_0.label;
  const measureValue = row.measures_0.raw;
});
```

### Hosting Options

**1. SAC-Hosted (Recommended, QRC Q2 2023+)**
- Upload files directly to SAC > Files > Public Files
- Use relative paths: `"/path/to/widget.js"`
- Set `"integrity": ""` and `"ignoreIntegrity": true`

**2. GitHub Pages**
- Create repository with widget files
- Enable GitHub Pages in Settings
- Use URL: `[https://username.github.io/repo/widget.js`](https://username.github.io/repo/widget.js`)

**3. External Web Server**
- AWS S3, Azure Blob, or any HTTPS server
- Must include CORS headers: `Access-Control-Allow-Origin: *`

### Security: Integrity Hash

For production, generate SHA256 hash:
```bash
# Generate hash
openssl dgst -sha256 -binary widget.js | openssl base64 -A

# Update JSON
"integrity": "sha256-abc123...",
"ignoreIntegrity": false
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "The system couldn't load the custom widget" | Incorrect URL or hosting issue | Verify URL is accessible, check CORS |
| "Integrity check failed" | Hash mismatch | Regenerate hash after JS changes |
| Widget not appearing | Missing connectedCallback render | Call render in onCustomWidgetAfterUpdate |
| Properties not updating | Missing propertiesChanged dispatch | Use dispatchEvent with propertiesChanged |
| Data not displaying | Data binding misconfigured | Verify feeds in JSON match usage |

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

---

## Widget Add-Ons (QRC Q4 2023+)

Widget Add-Ons extend built-in SAC widgets without building from scratch.

**Use Cases**:
- Customize chart tooltips
- Add visual elements to plot areas
- Override built-in styling

**Supported Charts**: Bar/Column, Stacked Bar/Column, Line, Stacked Area, Numeric Point

**Key Differences**:
- Only `main` and `builder` components (no `styling`)
- Must specify extension target (`tooltip`, `plotArea`, `numericPoint`)
- SAC provides chart context data via methods

See **`references/widget-addon-guide.md`** for complete implementation.

---

## Bundled Resources

### Templates (Ready-to-Use Code)

- **`templates/basic-widget.js`** - Minimal Web Component scaffold (~60 lines)
- **`templates/data-bound-chart.js`** - ECharts widget with SAC data binding (~120 lines)
- **`templates/styling-panel.js`** - Styling panel for runtime customization (~150 lines)
- **`templates/widget.json-minimal`** - Bare-minimum metadata (~25 lines)
- **`templates/widget.json-complete`** - Full-featured metadata (~100 lines)

### Reference Documentation

1. **`references/json-schema-reference.md`** - Complete JSON schema documentation
2. **`references/widget-templates.md`** - Additional widget template patterns (6 templates)
3. **`references/echarts-integration.md`** - ECharts library integration guide
4. **`references/widget-addon-guide.md`** - Widget Add-On development (QRC Q4 2023+)
5. **`references/best-practices-guide.md`** - Performance, security, and development guidelines
6. **`references/advanced-topics.md`** - Custom types, script API types, installation
7. **`references/integration-and-migration.md`** - Script integration, content transport
8. **`references/script-api-reference.md`** - DataSource, Selection, MemberInfo APIs

---

## Official Documentation Links

**Primary References** (for skill updates):
- [Custom Widget Developer Guide](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html?version=2025.21&locale=en-US)
- [Developer Guide PDF](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Widget API PDF (2025)](https://help.sap.com/doc/7e0efa0e68dc45958e568699f8226ad7/cloud/en-US/SAC_Widget_API_en.pdf)

**Sample Widgets**:
- [SAP Samples Repository](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)
- [SAP Custom Widget GitHub](https://github.com/SAP-Custom-Widget)

---

## Version History

**v2.0.0** (2025-12-27)
- Added 3 specialized agents: widget-architect, widget-debugger, widget-api-assistant
- Added 3 slash commands: /widget-validate, /widget-generate, /widget-lint
- Added validation hooks for automatic quality checks on Write/Edit
- Added 5 production-ready templates in templates/ directory
- Enhanced plugin structure to match comprehensive plugin pattern
- Updated last verified date

**v1.2.0** (2025-11-26)
- Updated SAC version reference to 2025.21
- Optimized SKILL.md length from 563 to ~200 lines
- Added Table of Contents to all 8 reference files
- Improved progressive disclosure architecture

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

**Last Verified**: 2025-12-27 | **SAC Version**: 2025.21 | **Skill Version**: 2.0.0
