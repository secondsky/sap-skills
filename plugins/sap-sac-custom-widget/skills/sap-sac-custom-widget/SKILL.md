---
name: sap-sac-custom-widget
description: "SAP Analytics Cloud (SAC) Custom Widget development. Use when building custom visualizations, extending SAC with Web Components, or creating Widget Add-Ons. Covers JSON metadata, JavaScript Web Components, lifecycle functions, data binding with feeds, styling/builder panels, property/event/method definitions, third-party library integration, hosting, security, performance, and debugging. Includes Widget Add-On feature (QRC Q4 2023+) and templates for widgets, charts, and KPI cards."

license: GPL-3.0
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.3.2"
  last_verified: 2026-06-12
  sac_version: "2026.8"
  errors_prevented: 40+
  official_docs:
    - "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html"
    - "https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf"
  samples_repo: "https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets"
  keywords: [sap analytics cloud, sac custom widget, web component sac, json metadata widget, widget lifecycle functions, onCustomWidgetBeforeUpdate, onCustomWidgetAfterUpdate, onCustomWidgetResize, onCustomWidgetDestroy, sac data binding, dataBindings feeds, styling panel widget, builder panel widget, sac echarts integration, sac d3js integration, third party library sac, widget hosting sac, integrity hash widget, sha256 integrity, widget security cors, sac widget debugging, sac analytics designer widget, optimized story experience widget, sac widget api, widget add-on, sac script api widget, shadow dom web component, sac tooltip customization, plot area addon, sac resource zip upload, root relative widget url, resource file upload, builder focus collapse state, self contained component js, resource zip artifact naming, chat download artifacts]
allowed-tools:
  - Read
  - Bash
  - WebFetch
---

# SAP Analytics Cloud Custom Widget Development

## Related Skills

- **sap-sac-scripting**: Use when custom widgets interact with SAC scripting, widgets, or story/application APIs
- **sap-sac-planning**: Use when widgets participate in planning workflows or planning table interactions
- **sapui5**: Use for Web Component/UI5 frontend implementation patterns and browser-side quality
- **sap-dependency-security**: Use when adding third-party charting or build dependencies to widget projects

## Table of Contents
- [Overview](#overview)
- [AI-Assisted Generation](#ai-assisted-generation)
- [Local Custom Widget Builder](#local-custom-widget-builder)
- [SAP Sample Widget Lessons](#sap-sample-widget-lessons)
- [Browser Design Runtime](#browser-design-runtime)
- [CSS and Styling Compliance](#css-and-styling-compliance)
- [SAC Import and Packaging](#sac-import-and-packaging)
- [Plugin Components](#plugin-components)
- [Quick Start](#quick-start)
- [Community Sample Widgets](#community-sample-widgets)
- [Key Concepts](#key-concepts)
- [Common Errors & Solutions](#common-errors--solutions)
- [Bundled Resources](#bundled-resources)

## Overview

This skill enables development of custom widgets for SAP Analytics Cloud (SAC). Custom widgets are Web Components that extend SAC stories and applications with custom visualizations, interactive elements, and specialized functionality.

## When to Use This Skill

**Use this skill when**:
- Building custom visualizations not available in standard SAC
- Generating prompt-driven widget ideas, branded widget packages, or composite-ready widget designs
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

## AI-Assisted Generation

For prompt-driven widget creation, first suggest 2-3 data-aware widget options, then generate the selected complete package. Keep AI-generated code SAC-compatible, preserve data-binding order, and validate/repair before import. See **`references/ai-assisted-composite-generation.md`** for output contracts, RAG context patterns, brand styling, and composite caveats.

---

## Local Custom Widget Builder

For enterprise or locked-down local environments, offer **`templates/local-builder/`** as the standard no-install scaffold builder. It runs as static HTML/CSS/vanilla JavaScript, avoids public CDNs and external packages, and exports SAC upload artifacts as two separate downloads: `widget.json` and a Resource-ZIP containing only root-level component JavaScript files. Use Node's `server.mjs` fallback when direct `file://` use is blocked. See **`references/local-builder-workflow.md`** for builder boundaries, export rules, and validation checks.

---

## SAP Sample Widget Lessons

Before generating a chart, KPI, hierarchy, input utility, Widget Add-On, or build-based widget, consult **`references/sap-sample-widget-lessons.md`**. It audits every SAP sample folder and distills reusable lessons for Data Binding-first scaffolds, root-relative Resource-ZIP URLs, styling/builder panel separation, support flags, custom `types`, script methods/events, add-on `extensions[]`, and build-based app caveats. Use the lessons for structure and risk checks only; do not copy SAP sample code or assets into generated packages.

---

## Browser Design Runtime

Generated widget packages should include **`templates/design-runtime/`** as a no-build, file-first browser preview scaffold. Use it after generation to mock custom-widget essentials outside SAP, adjust properties/design tokens/sample data/viewports, compare multiple widgets, and export an agent iteration payload. See **`references/browser-design-runtime.md`** for runtime boundaries and configuration/export contracts. Use `templates/local-builder/` for scaffold generation/export; use `templates/design-runtime/` for preview and iteration.

---

## CSS and Styling Compliance

Style custom widgets inside their Web Component/Shadow DOM boundary. Do not rely on SAC optimized story theme CSS, SAP shell selectors, or global story CSS to style widget internals. For generated packages, confirm the hosting mode before splitting CSS/HTML into separate files, because SAC ZIP upload packages support component JavaScript and PNG/JPG icons only. See **`references/css-and-styling-compliance.md`** for SAP Help-backed allowed/restricted styling rules.

---

## SAC Import and Packaging

Decide the delivery mode before generating `widget.json`: SAC Resource-ZIP upload and external HTTPS hosting use different URL rules. For SAC Resource-ZIP upload, deliver `widget.json` separately, upload it first, and only then upload a Resource-ZIP containing root-level component JavaScript files such as `widget.js`, `builder.js`, and `styling.js`. Do not include `widget.json`, subfolders, tests, README files, CSS, or HTML in that Resource-ZIP.

For Resource-ZIP manifests, use root-relative component URLs such as `"/widget.js"`; for external hosting, use complete HTTPS URLs. Keep local-preview paths like `"widget.js"` in preview-only configs unless the target SAC flow explicitly documents that resolution mode. Model simple configurable colors as `string` properties with hex defaults such as `"#f4f7fa"`; use the `Color` type only after the exact SAC tenant and target panel flow accepts it. Browser preview and Node tests are useful, but they are not proof of SAC importability. For widgets with builder/styling panels, preserve focus and collapse state during text edits, keep component JS self-contained, and validate final `outputs/` artifacts rather than source-only previews. When the widget is done, the final chat response must offer both completed upload artifacts for download: the `widget.json` manifest and the Resource-ZIP. See **`references/sac-import-packaging-lessons.md`** for upload sequence, ZIP content checks, final-artifact tests, builder/tree rules, final download handoff, and SAC error triage.

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
| `/widget-generate` | `/widget-generate` | Interactively generate widget scaffold with JSON, JS, local builder, and browser design runtime |
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
- `builder-panel.js` - Design-time configuration panel
- `local-builder/` - Static local scaffold builder and SAC artifact exporter
- `design-runtime/` - Browser preview and design iteration runtime
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

**⚠️ Production Note**: The `ignoreIntegrity: true` setting above is **development only**. For production deployments, generate a SHA256 integrity hash and set `ignoreIntegrity: false`.

---

## Community Sample Widgets

SAP provides a community sample repository with 17 custom widget sample folders:

**Repository**: [SAP-samples/SAC_Custom_Widgets](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)

| Category | Widgets |
|----------|---------|
| **Charts** | Funnel, Pareto, Sankey, Sunburst, Tree, Line, UI5 Gantt |
| **KPI/Gauge** | KPI Ring, Gauge Grade, Half Donut, Nested Pie, Custom Pie |
| **Utilities** | File Upload, Word Cloud, Bar Gradient, Widget Add-on Sample |

**Requirements**: Most samples assume Data Binding and Optimized View Mode (OVM) or Optimized and Unified Story Experience.

**Note**: Check third-party library licenses before production use, adjust hosted component paths when moving samples, and treat live SAC import/runtime validation as tenant-specific. See **`references/sap-sample-widget-lessons.md`** for the per-sample audit and creation lessons.

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
for (let i = 0; i < this.myDataBinding.data.length; i++) {
  const row = this.myDataBinding.data[i];
  const dimensionValue = row.dimensions_0 ? row.dimensions_0.label : "";
  const measureValue = row.measures_0 ? row.measures_0.raw : 0;
}
```

### Hosting Options

**1. SAC-Hosted (Recommended, QRC Q2 2023+)**
- Upload files directly to SAC > Files > Public Files
- For Resource-ZIP upload flows, upload `widget.json` first, then upload a separate Resource-ZIP when SAC enables the Resource File button
- For Resource-ZIP upload flows, use root-relative URLs such as `"/widget.js"`; do not use local Windows backslashes or bare local preview paths in the production manifest
- Set `"integrity": ""` and `"ignoreIntegrity": true`

**2. GitHub Pages**
- Create repository with widget files
- Enable GitHub Pages in Settings
- Use URL: `https://username.github.io/repo/widget.js`

**3. External Web Server**
- AWS S3, Azure Blob, or any HTTPS server
- Must include CORS headers: `Access-Control-Allow-Origin: *`

### Security: Integrity Hash

For production, generate a SHA256 integrity value with Node.js for Windows/macOS/Linux:
```bash
# Generate integrity hash for widget.js
node -e "const fs=require('node:fs');const crypto=require('node:crypto');const file=process.argv[1]||'widget.js';console.log('sha256-'+crypto.createHash('sha256').update(fs.readFileSync(file)).digest('base64'));" widget.js

# Update JSON
"integrity": "sha256-abc123...",
"ignoreIntegrity": false
```

On macOS/Linux or Git Bash, OpenSSL is also acceptable; prefix the output with `sha256-` before adding it to the manifest:
```bash
openssl dgst -sha256 -binary widget.js | openssl base64 -A
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
| `"Color" is not a valid type` or default expected as Color | Tenant/import flow rejected simple color properties | Use `string` plus hex defaults for simple configurable colors |
| Main component could not be loaded | Resource URL, ZIP content, or JS syntax problem | Check root-relative `webcomponents[].url`, Resource-ZIP root contents, then `node --check` |
| Resource File upload is disabled | `widget.json` has not validated yet | Upload and validate `widget.json` first, then upload the Resource-ZIP |
| Resource-ZIP imports/later load fails | ZIP contains manifest, folders, CSS/HTML, or unrelated files | Keep only root-level JS component files and optional PNG/JPG icons |
| Builder input loses focus or collapse state | Text edits trigger full render | Update field/row/JSON text directly; reserve full render for structural changes |
| Preview works but SAC component fails standalone | Preview depends on a shared source helper not present in bundled JS | Test final `widget.js`, `builder.js`, and `styling.js` without preview-only helper scripts |
| Duplicate menu items collide | Subtree duplicate rewrote only root ID | Rewrite descendant IDs and test uniqueness across the whole tree |

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
  console.log("Data binding:", this.myDataBinding && this.myDataBinding.data);
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
- **`templates/builder-panel.js`** - Builder panel for design-time configuration
- **`templates/local-builder/`** - No-install local builder for metadata, feeds, properties, methods, events, and SAC two-file export
- **`templates/design-runtime/`** - No-build browser preview, design-token controls, scenario switching, and agent iteration export
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
9. **`references/ai-assisted-composite-generation.md`** - Prompt-driven generation, RAG, brand styling, validation, and composite-ready output guidance
10. **`references/local-builder-workflow.md`** - Enterprise-safe local builder workflow, export contract, and validation checklist
11. **`references/sap-sample-widget-lessons.md`** - SAP sample widget audit matrix, reusable generation lessons, and add-on/build-based routing caveats
12. **`references/browser-design-runtime.md`** - Non-SAP browser preview runtime, sidecar config, and agent iteration export
13. **`references/css-and-styling-compliance.md`** - SAP Help-backed CSS, theme, Shadow DOM, and packaging guidance for generated widgets
14. **`references/sac-import-packaging-lessons.md`** - SAC-hosted Resource-ZIP upload sequence, URL rules, ZIP hygiene, builder/tree state rules, self-contained component checks, final-artifact tests, and SAC error triage

---

## Official Documentation Links

**Primary References** (for skill updates):
- [Custom Widget Developer Guide](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html)
- [Developer Guide PDF](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Widget API PDF (2025)](https://help.sap.com/doc/7e0efa0e68dc45958e568699f8226ad7/cloud/en-US/SAC_Widget_API_en.pdf)

**Sample Widgets**:
- [SAP Samples Repository](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)
- [SAP Custom Widget GitHub](https://github.com/SAP-Custom-Widget)

---

## Version History

**Unreleased**
- Added an enterprise-safe `templates/local-builder/` scaffold for local widget metadata, property/feed configuration, and SAC two-file artifact export
- Added `templates/builder-panel.js` so builder panel generation has a bundled self-contained template
- Added local builder validation coverage without advancing `last_verified`; live SAC upload/runtime validation remains pending
- Added SAP sample-widget lessons and local-builder pattern hints for data-bound charts, KPI/gauge widgets, flow/hierarchy widgets, input utilities, Widget Add-ons, and build-based apps without copying upstream sample code

**v2.3.2** (2026-07-06)
- Added SAC Resource-ZIP import lessons from the Configurable Menu Navigation project
- Clarified separate `widget.json` and Resource-ZIP upload flow, root-relative SAC-hosted URLs, Resource-ZIP content hygiene, and simple color property portability
- Added hook warnings for bare Resource-ZIP component URLs and risky `Color` property usage
- Expanded Configurable Menu Navigation lessons for builder focus/collapse state, tree duplicate ID rewrites, self-contained component JS, preview parity, stale panel cleanup, layout/styling property sync, safe output cleanup, and artifact naming
- Required final chat handoff to offer both the `widget.json` manifest and Resource-ZIP as separate downloadable artifacts

**v2.1.0** (2026-06-12)
- Refreshed to SAC Q2 2026 (version 2026.8)
- No custom-widget framework changes in QRC1/QRC2 2026; lifecycle functions and JSON schema unchanged
- Documented previously missing root-level properties: `eula`, `imports`, `supportsMobile`, `supportsExport`, `supportsLinkedAnalysisFilterOnSelection`, `supportsViewportLoading`, `supportsBookmark`, `types`
- Documented webcomponent `type` property for ES module loading
- Documented `includeInBookmarks` per-property flag, `boolean[]`/`integer[]` types
- Added `serializeCustomWidgetToImage()` and `customWidgetRenderComplete` to advanced topics
- Confirmed: all four lifecycle functions unchanged, feed types unchanged, templates valid

**v2.0.0** (2025-12-27)
- Added 3 specialized agents: widget-architect, widget-debugger, widget-api-assistant
- Added 3 slash commands: /widget-validate, /widget-generate, /widget-lint
- Added validation hooks for automatic quality checks on Write/Edit
- Added 5 docs-audited templates in templates/ directory
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

**SAC Version**: 2026.8
