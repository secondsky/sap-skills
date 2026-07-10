---
name: widget-generate
description: Interactively generates SAC custom widget scaffold with widget.json and widget.js files based on user requirements
allowed-tools:
  - Read
  - AskUserQuestion
argument-hint: [widget-name]
---

## Shell Snippet Notes

- Prefer OS-specific snippets when commands differ. Bash snippets assume Linux/macOS, WSL2, or Git Bash; Windows-native snippets should use PowerShell or cmd-compatible commands.
- Install the command-specific tooling shown near each snippet before running it.
- Confirm before running commands that delete files, change ownership, deploy, or modify remote systems.

## Output Contract

Return role-aware suggestions, the Widget Brief, planned widget structure, SAP sample lesson fit, file snippets or files to create/change, local-builder/design-runtime inclusion notes, security/accessibility notes, and confirmation points before writes. Default to snippets/plans; generate files only when the user explicitly requests generation and confirms a target directory.


# SAC Custom Widget Generator Command

Interactively create a complete SAP Analytics Cloud custom widget scaffold including widget.json metadata, widget.js Web Component implementation, optional builder/styling panels, the local builder scaffold, and the browser design runtime. For prompt-driven requests, use a two-stage flow: suggest 2-3 creative options first, then generate the selected package.

## Usage

```
/widget-generate
/widget-generate my-chart-widget
/widget-generate --quick
```

## Interactive Mode (Default)

When invoked without `--quick`, ask the user these questions:

### Required Questions

1. **Widget Name**
   - Display name for SAC (e.g., "My Custom Chart")
   - Will generate manifest ID, tag, class, widget folder name, and `newInstancePrefix` from this

2. **Widget ID**
   - Reverse domain notation (e.g., "com.company.mychart")
   - Default: Generate from widget name

3. **Widget Role**
   - Options: Table/chart/KPI, UI control/navigation (menu, sidebar, filter), Hybrid, Widget Add-on, Build-based integration
   - Use `references/widget-discovery-intake.md` to select the correct route before asking about data or implementation details
   - Consult `references/sap-sample-widget-lessons.md` for the nearest SAP sample family and caveats

4. **Data-Source Mode**
   - Options: SAC-bound, Property/config-supplied, No data
   - Ask for dimensions, measures/key figures, dates, versions, filters, and feed order only for SAC-bound widgets
   - For No data widgets, use the minimal manifest/property/event pattern and omit `dataBindings` unless the runtime consumes SAC model data

5. **Business Goal and Interaction Intent**
   - For a table/chart/KPI: decision or insight, aggregation/formatting rules, and empty/error state
   - For a menu, sidebar, or filter: item hierarchy, labels/icons, active/disabled states, commands, navigation/filter actions, permissions, keyboard behavior, and mobile layout
   - For a hybrid: define the interaction contract first, then request only the model state it displays or controls

6. **Evidence and Data Contract**
   - Invite user-provided screenshots, PDFs, images, brand guides, sanitized CSV/schema, and model/story evidence
   - Confirm technical IDs, feed mappings, asset rights, licenses, and navigation destinations before code generation
   - For SAC-bound widgets, request semantic field roles, aggregation/formatting, expected data volume, and exact feed order
   - For property/config-supplied or No data widgets, request property defaults, validation, and authoring behavior instead of dimensions or key figures

7. **Components**
   - "Which components do you need?"
   - Options: Main only, Main + Styling Panel, Main + Builder Panel, All three

8. **Local Builder**
   - "Include the local SAC widget builder scaffold?"
   - Default: Yes for local or enterprise environments
   - Copy `templates/local-builder/` into generated packages when the user wants a no-install browser builder for metadata, properties, feeds, methods, events, and SAC artifact export
   - Mention that the local builder includes generic sample-informed pattern hints but does not copy SAP sample code or assets

### Optional Questions

9. **Third-Party Library**
   - "Will you integrate a charting library?"
   - Options: ECharts, D3.js, Chart.js, None

10. **Brand and Visual Direction**
   - Brand logo/icon URLs, colors, style preference, or user-provided screenshots/PDFs/images
   - Use visual evidence to inform layout, hierarchy, and design tokens; do not treat it as proof of asset rights or technical metadata
   - Use brand assets only when rights, source, and SAC accessibility are confirmed
   - If provided, map icon URL to manifest `icon` and logo URL to a `brandLogoUrl` property

11. **Optional Hosted Exploration**
   - Offer [Custom Widget Builder](https://www.custom-widgets.de/custom-widget-builder) or [live demo](https://www.custom-widgets.de/demo) only when the user permits public-web use for a desktop, non-sensitive visual prototype
   - Keep `templates/local-builder/` as the enterprise-safe default
   - Never send confidential screenshots, PDFs, tenant details, code, data, credentials, or internal assets to hosted tools
   - Treat downloaded packages as untrusted external artifacts and validate them locally before SAC import

12. **Deployment and Reuse Target**
   - SAC-hosted files, external HTTPS host, or widget server
   - SAC ZIP resource upload, if the tenant flow requires uploading a ZIP after `widget.json`
   - Confirm this before deciding whether CSS/HTML can be separate resource files or must be embedded in JavaScript templates
   - Ask whether the widget should be reusable inside an SAC composite

13. **Initial Properties**
   - "What properties should be configurable?"
   - Default: title (string), color (Color)

## Quick Mode (--quick)

Generate minimal widget with defaults:
- Main component only
- No data binding
- Basic title property
- No third-party libraries

## Two-Stage Prompt-Driven Generation

### Stage 1: Suggestions

When the user asks for a widget from a goal or dataset, return JSON with 2-3 options before generating code:

```json
{
  "options": [
    {
      "name": "Widget option name",
      "description": "What the widget shows and why it fits the data."
    }
  ]
}
```

### Stage 2: Complete Code Package

After the user selects an option, return a parseable JSON package:

```json
{
  "widgetName": "widget-name",
  "tagName": "com-company-widgetname",
  "className": "WidgetName",
  "newInstancePrefix": "WidgetName",
  "mainJs": "(function() { /* main widget component */ })();",
  "stylingJs": "(function() { /* optional styling panel */ })();",
  "files": {
    "main": "(function() { /* same content as mainJs */ })();",
    "styling": "(function() { /* same content as stylingJs, if present */ })();"
  },
  "manifest": {},
  "sampleData": [],
  "designRuntime": {
    "files": ["design-runtime/index.html", "design-runtime/runtime.css", "design-runtime/runtime.js", "design-runtime/design-runtime.json"],
    "config": {}
  }
}
```

For data-bound widgets, include 3-5 representative `sampleData` rows. Keep `mainJs`/`stylingJs` as compatibility aliases and mirror package file contents in `files.main`/`files.styling`.

If the consuming flow requires text sections, use these exact markers:

```text
===WIDGET_CONFIG===
{ ...widget.json... }

===MAIN_COMPONENT===
(function() { ... })();

===STYLING_PANEL===
(function() { ... })();
```

## AI Generation Compatibility Rules

- Use Web Components with Shadow DOM and IIFE-wrapped JavaScript.
- Use `references/sap-sample-widget-lessons.md` as a structure and caveat reference before choosing a sample-like scaffold. Keep generated code original.
- Use naming conventions: widget folder/name `hyphen-case`, manifest ID `com.company.widgetname`, tag `com-company-widgetname`, class `PascalCase`, `newInstancePrefix` `PascalCase` letters only.
- Define the HTML/CSS shell with `document.createElement("template")`; static `template.innerHTML` is allowed for the component template.
- Keep generated styling scoped to the Web Component or Shadow DOM boundary. Do not rely on SAC story theme CSS, SAP shell class names, or global story CSS to style widget internals.
- Confirm hosting mode before splitting CSS or HTML into separate files. For SAC ZIP resource upload, embed CSS inside component JavaScript templates and include only main/styling/builder JavaScript plus PNG/JPG icon files in the ZIP resource set.
- Access data through the manifest-defined binding, commonly `this.myDataBinding.data`.
- Use sequential SAC result indices: `dimensions_0`, `dimensions_1`, `measures_0`, `measures_1`, `measures_2`; never skip an index.
- Keep `methods` and `events` as objects in the manifest, even when empty.
- Avoid optional chaining, nullish coalescing, arrow callbacks in `forEach`, and render-time template literals in AI-generated packages.
- Prefer string concatenation in render logic when generated code will be parsed by a downstream service.
- Treat forecast boundaries as data-derived unless a manifest property explicitly models the boundary.
- If validation fails, retry only the listed errors and cap repair attempts at three.

## Brand Integration Contract

When trusted brand assets are provided:
- Set manifest `icon` to the trusted icon URL.
- Add a `brandLogoUrl` string property with the trusted logo URL as default.
- Include a header image in the main template, for example `<img id="brandLogo" class="brand-logo" alt="">`.
- In render logic, set `brandLogo.src` only after checking the element and `this._props.brandLogoUrl` exist.
- Style `.brand-logo` with bounded dimensions such as `height: 36px; object-fit: contain;`.

Do not add remote scripts, tracking pixels, credentials, or untrusted visual assets for polish. Visual design should be professional and modern, but not at the expense of accessibility, performance, theming variables, or data correctness.

## CSS and Styling Compliance

For generator output, use `references/css-and-styling-compliance.md` as the styling source of truth:

- Internal widget CSS is allowed when scoped to the Web Component template or Shadow DOM.
- SAC optimized story theme CSS is not a dependency for custom-widget internals.
- External CSS, HTML, fonts, and image URLs require an approved static HTTPS/SAC-hosted deployment path.
- SAC ZIP resource upload packages should not contain separate `.css` or `.html` files.
- Manifest `webcomponents[].url` values should reference JavaScript component files, not CSS or HTML resources.

## Generated Files

### 1. widget.json

Full metadata file with:
- All required root fields
- `newInstancePrefix` using PascalCase letters only
- webcomponents array based on selection
- properties object with selected properties
- methods object (if applicable)
- events object (if applicable)
- dataBindings object (if data binding selected)

### 2. widget.js

Complete Web Component with:
- Shadow DOM setup
- Template with basic structure
- All lifecycle functions
- Property getters/setters
- propertiesChanged event dispatch
- Placeholder render function
- Third-party library initialization (if selected)

### 3. Additional Files (if applicable)

- `styling-panel.js` - If styling panel selected
- `builder-panel.js` - If builder panel selected

### 4. design-runtime/ (Always Included)

No-build browser preview scaffold with:
- `index.html` - File-first preview shell
- `runtime.css` - Runtime layout and control styling
- `runtime.js` - SAC custom-widget mock runtime, controls, and export logic
- `design-runtime.json` - Sidecar config for widgets, scenarios, data, viewport, theme, and design tokens

### 5. local-builder/ (Recommended for Local Enterprise Generation)

Static no-install builder scaffold with:
- `index.html` - Local builder UI for metadata, component selection, properties, feeds, methods, events, and export actions
- `builder.css` - Local-only builder styling
- `builder.js` - Vanilla JavaScript generator and in-browser Resource-ZIP writer
- `builder-config.json` - Defaults, control palette, and SAC export contract
- `server.mjs` - Node loopback fallback when direct file access is blocked

The local builder is for scaffold generation and SAC artifact export. It is not a live SAC runtime and does not replace `design-runtime/` preview checks.

For a user-approved public-web, non-sensitive desktop prototype, optionally suggest the [Custom Widget Builder](https://www.custom-widgets.de/custom-widget-builder) or [live demo](https://www.custom-widgets.de/demo). Keep the local builder as the enterprise-safe default and treat hosted exports as untrusted external artifacts that need normal local validation.

### 6. sample-informed pattern hints

When the request maps to a SAP sample family, document the chosen hint and caveat:

- `data-bound-chart` for line, funnel, pie, nested pie, Pareto, and bar-gradient-like widgets
- `kpi-gauge` for KPI ring, gauge grade, half donut, and compact score displays
- `flow-hierarchy-chart` for Sankey, Sunburst, Tree, and hierarchy/flow widgets
- `builder-input-utility` for word-cloud/input widgets and authored text utilities
- Widget Add-ons use `references/widget-addon-guide.md` and the `extensions[]` manifest model
- Build-based file upload, UI5, React, or API/service widgets require explicit dependency, security, tenant, and packaging planning

Do not copy SAP sample runtime code, assets, dependency bundles, tenant URLs, or third-party libraries into generated packages.

## Output Structure

```
widget-name/
├── widget.json
├── widget.js
├── styling-panel.js    (if selected)
├── builder-panel.js    (if selected)
├── local-builder/      (recommended for local/enterprise generation)
│   ├── index.html
│   ├── builder.css
│   ├── builder.js
│   ├── builder-config.json
│   └── server.mjs
└── design-runtime/
    ├── index.html
    ├── runtime.css
    ├── runtime.js
    └── design-runtime.json
```

## Local Custom Widget Builder

Offer `templates/local-builder/` as the default local enterprise option when a user wants a browser builder similar in spirit to hosted SAC widget builder tools but must stay local. It must remain dependency-free and local-only:

- Do not use public CDNs, remote scripts, external npm packages, tenant URLs, or credentials.
- Keep primary export as two SAC upload artifacts: `widget.json` and `<slug>-resources.zip`.
- Keep Resource-ZIP entries root-level and limited to component JavaScript plus optional image assets.
- Exclude `widget.json`, `local-builder/`, `design-runtime/`, `.html`, `.css`, `.md`, `.json`, tests, and docs from Resource-ZIP output.
- Use `node server.mjs` from `local-builder/` only as a loopback fallback if direct `file://` use is blocked.
- Treat local builder output as generated scaffolding; still validate with `/widget-validate`, JavaScript syntax checks, Resource-ZIP inspection, and SAC tenant import when available.
- Use the built-in sample-informed pattern hints only as generic prefill. Reference-only hints for Widget Add-ons and build-based apps should redirect to planning guidance rather than generating unsupported scaffolds.
- For a public-web, non-sensitive desktop prototype, optionally suggest the hosted builder/demo links from the intake flow. Never transfer confidential attachments or tenant material, and validate any hosted export locally before import.

## Browser Design Runtime

Always include `templates/design-runtime/` when generating widget files. The runtime is for design iteration only; it is not SAC parity and must not be used to claim live tenant validation.

### Runtime Responsibilities

- Load one or more local widget scripts and manifest objects.
- Inject sample data through `this.dataBindings.getDataBinding(id)` and `this.<bindingId>`.
- Call custom-widget lifecycle methods.
- Apply runtime property and design-token changes.
- Switch sample data, viewport, and theme scenarios.
- Export `agent-iteration.json` plus a Markdown summary with changed deltas and current full state for the next agent pass.

### Runtime Boundaries

- Do not emulate SAC script APIs, planning APIs, linked analysis, story layout, tenant permissions, or transport.
- Do not write source files from the browser.
- Do not store runtime-only settings inside `widget.json`.
- Do not rely on public CDN libraries; use local `vendor/` assets for third-party dependencies.
- Use unique `webcomponents[].tag` values when comparing multiple widgets in one runtime.

### Runtime Config Requirements

Populate `design-runtime/design-runtime.json` with:

```json
{
  "schema": "sap-sac-widget-design-runtime/v1",
  "widgets": [
    {
      "id": "main",
      "title": "Widget Name",
      "manifestPath": "../widget.json",
      "scripts": ["../widget.js"],
      "manifest": {},
      "scenarioIds": ["baseline"]
    }
  ],
  "designTokens": {},
  "scenarios": [
    {
      "id": "baseline",
      "title": "Baseline",
      "theme": "light",
      "viewport": { "width": 720, "height": 420 },
      "properties": {},
      "designTokens": {},
      "dataBindings": {},
      "widgets": {}
    }
  ]
}
```

For direct `file://` use, include the manifest object in the sidecar config and keep the embedded `index.html` config synchronized with the sidecar. On a local static server, the runtime can load `design-runtime.json` directly.

Path rules:
- Runtime config paths are browser URL paths, not OS filesystem paths; use `/` separators even on Windows.
- `scripts` paths are resolved relative to `design-runtime/index.html`.
- `manifest.webcomponents[].url` values keep SAC manifest semantics and should be relative to `widget.json`, for example `"widget.js"`.
- Config files loaded with the file picker still resolve widget script paths relative to `index.html`, not relative to the uploaded config file.
- Design-token edits are scenario-wide by default; selected-widget overrides belong under `scenarios[].widgets[widgetId].designTokens`.

## Generation Templates

### Basic widget.json Template
```json
{
  "id": "com.company.widgetname",
  "version": "1.0.0",
  "name": "Widget Name",
  "description": "A custom widget for SAP Analytics Cloud",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "newInstancePrefix": "WidgetName",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "com-company-widgetname",
      "url": "widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "Widget Title"
    }
  },
  "methods": {},
  "events": {}
}
```

### Data Binding Template Addition
```json
{
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

### Basic widget.js Template
```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: var(--sapFontFamily, Arial, sans-serif);
      }
      .container {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
      }
      .title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--sapTextColor, #333);
      }
      .content {
        width: 100%;
        height: calc(100% - 40px);
      }
    </style>
    <div class="container">
      <div class="title" id="title"></div>
      <div class="content" id="content"></div>
    </div>
  `;

  class WidgetName extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }

    // SAC Lifecycle Functions
    onCustomWidgetBeforeUpdate(changedProperties) {
      changedProperties = changedProperties || {};
      for (const key in changedProperties) {
        if (Object.prototype.hasOwnProperty.call(changedProperties, key)) {
          this._props[key] = changedProperties[key];
        }
      }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this.render();
    }

    onCustomWidgetResize() {
      this.render();
    }

    onCustomWidgetDestroy() {
      // Cleanup resources here
    }

    // Property getter/setter
    get title() {
      return this._props.title;
    }

    set title(value) {
      this._props.title = value;
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties: { title: value } }
      }));
    }

    // Render function
    render() {
      const titleEl = this._shadowRoot.getElementById("title");
      if (titleEl && this._props.title) {
        titleEl.textContent = this._props.title;
      }

      // Add your rendering logic here
    }
  }

  customElements.define("com-company-widgetname", WidgetName);
})();
```

## Post-Generation Instructions

After files are generated, provide:

1. **Next Steps**
   - How to add to SAC
   - How to set up hosting
   - How to generate integrity hash
   - How to open `local-builder/index.html` directly for local scaffold edits and SAC two-file export
   - Optional local builder server fallback from `local-builder/`: `node server.mjs`
   - How to open `design-runtime/index.html` directly
   - Optional static server fallback from the widget package root:
     - macOS/Linux: `python3 -m http.server 8000`
     - Windows PowerShell/cmd: `py -3 -m http.server 8000` or `python -m http.server 8000`
     - Open `http://127.0.0.1:8000/design-runtime/`

2. **Development Tips**
   - Local development setup
   - Browser DevTools debugging
   - SAC debug mode
   - Design-runtime limitations versus real SAC

3. **Customization Pointers**
   - Where to add visualization logic
   - How to add more properties
   - How to implement events
   - How to use the local builder control palette to add text, number, hex color string, toggle, dropdown, textarea, slider, group, and divider controls
   - How to use exported `agent-iteration.json` and Markdown notes for the next agent iteration

4. **Ready for SAC Install**
   - Required files: `widget.json`, main JS, optional styling/builder JS, icon/logo assets when referenced, and any local `vendor/` libraries
   - Hosting choice:
     - SAC-hosted files: upload JS/assets to SAC Files/Public Files and keep manifest URLs as SAC/browser URL paths
     - External HTTPS or widget server: host JS/assets on the approved origin, configure CORS if needed, and add the origin in SAC System > Administration > App Integration > Trusted Origins
   - Update `widget.json` URLs, integrity hashes, and `ignoreIntegrity` for the chosen hosting model
   - Import `widget.json` from the SAC Custom Widgets area
   - Add the widget to a Responsive or Canvas story page
   - Bind dimensions and measures in the exact manifest feed order
   - Test with real story data, resizing, theme settings, and styling/builder panel controls

5. **Composite Readiness**
   - Reuse or convert the design as a composite only after the widget works in a story
   - Avoid hardcoded model IDs, tenant URLs, and story-specific widget IDs
   - Expose reusable styling and behavior through manifest properties

## Implementation Instructions

When this command is invoked:

1. If widget name provided, use it; otherwise ask
2. Classify the widget role and data-source mode, then gather the role-appropriate evidence described in `references/widget-discovery-intake.md`
3. Return a Widget Brief with evidence, data/no-data contract, interactions, properties, brand rules, sensitivity, assumptions, and confirmation questions before code generation
4. For prompt-driven requests, return suggestions-stage JSON and wait for the selected option before code generation
5. Generate widget.json with all selections; omit `dataBindings` for a pure UI widget unless it consumes SAC model data
6. Generate widget.js with matching implementation
7. Generate additional component files if selected
8. Use `references/sap-sample-widget-lessons.md` to identify the nearest sample family, required caveats, and whether the request should stay on the normal custom-widget path, route to Widget Add-on guidance, or require build-based app planning
9. Copy `templates/local-builder/` into the generated package by default for local/enterprise generation, unless the user explicitly declines it
10. Copy `templates/design-runtime/` into the generated package and populate its sidecar config for the generated widget
11. Verify naming, data binding order when present, sequential result indices, generated-code compatibility rules, local builder export naming, Resource-ZIP exclusions, sample-informed caveats, and runtime sidecar paths that use browser URL `/` separators
12. If and only if the user confirmed a target directory, write files there; otherwise return snippets and the proposed file tree, including `local-builder/` and `design-runtime/`
13. Provide post-generation instructions, including the local builder, sample lesson caveats, Ready for SAC Install, and Composite Readiness blocks
14. Suggest running `/widget-validate`, opening `local-builder/index.html` for scaffold/export edits, and opening `design-runtime/index.html` for preview verification
