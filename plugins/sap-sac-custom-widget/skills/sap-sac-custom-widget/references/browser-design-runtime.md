# Browser Design Runtime for SAC Custom Widgets

Synthetic example:
- This reference defines a local browser preview scaffold for SAC custom widgets. It is not live SAP Analytics Cloud validation and must not be used to claim SAC runtime parity.

Use the `templates/design-runtime/` scaffold when a generated widget package should be previewed, tuned, and reviewed outside SAP before SAC import.

## Table of Contents

1. [Purpose](#purpose)
2. [Runtime Boundary](#runtime-boundary)
3. [Generated Package Shape](#generated-package-shape)
4. [Configuration Contract](#configuration-contract)
5. [Iteration Export Contract](#iteration-export-contract)
6. [Usage Workflow](#usage-workflow)
7. [Install in SAC](#install-in-sac)
8. [Critical Review Points](#critical-review-points)

---

## Purpose

The design runtime gives agents and users a fast browser loop for:

- Rendering a custom widget with representative sample data.
- Comparing one or more widget candidates side by side.
- Adjusting manifest properties and design tokens at runtime.
- Switching data, viewport, and theme scenarios.
- Exporting structured feedback for the next agent iteration.

Use it to improve visual quality and catch obvious binding, sizing, empty-state, and styling issues before SAC import.

## Runtime Boundary

The runtime mocks only the custom-widget essentials:

- Manifest-driven Web Component registration.
- Widget script loading from local package paths.
- Data binding injection via `this.dataBindings.getDataBinding(id)` and `this.<bindingId>`.
- Lifecycle calls for `onCustomWidgetBeforeUpdate`, `onCustomWidgetAfterUpdate`, and `onCustomWidgetResize`.
- Runtime property updates and `propertiesChanged` handling.
- Optional styling panel loading when a `kind: "styling"` component exists.
- Per-element update suppression, so one widget render does not hide another widget's runtime changes.

Do not use it to simulate:

- SAC script APIs, planning APIs, linked analysis, story layout, user permissions, tenant security, or transport behavior.
- Exact SAC rendering, iframe behavior, browser policies, or data-source semantics.
- Live SAC upload/runtime verification.

## Generated Package Shape

When `/widget-generate` creates files, include the runtime beside SAC import files:

```text
widget-name/
├── widget.json
├── widget.js
├── styling-panel.js
└── design-runtime/
    ├── index.html
    ├── runtime.css
    ├── runtime.js
    └── design-runtime.json
```

Keep runtime-only state inside `design-runtime/`; do not add preview-only keys to `widget.json`.

The scaffold is no-build and dependency-free. It is designed for locked-down enterprise laptops:

- Open `design-runtime/index.html` directly when possible.
- If a browser blocks JSON auto-loading under `file://`, use the **Load config** file picker.
- If direct file mode is blocked, start a local static server from the widget package root:
  - macOS/Linux: `python3 -m http.server 8000`
  - Windows PowerShell/cmd: `py -3 -m http.server 8000` or `python -m http.server 8000`
  - Then open `http://127.0.0.1:8000/design-runtime/`
- Do not rely on public CDN libraries. Use local `vendor/` assets when a widget needs third-party libraries.

## Configuration Contract

Use `design-runtime/design-runtime.json` as the sidecar contract:

```json
{
  "schema": "sap-sac-widget-design-runtime/v1",
  "widgets": [
    {
      "id": "main",
      "title": "Generated Widget",
      "manifestPath": "../widget.json",
      "scripts": ["../widget.js"],
      "manifest": {},
      "scenarioIds": ["baseline"]
    }
  ],
  "designTokens": {
    "primaryColor": "#0a6ed1",
    "backgroundColor": "#ffffff",
    "textColor": "#1d2d3e",
    "spacing": 16,
    "radius": 8,
    "shadow": "0 14px 34px rgba(29, 45, 62, 0.16)",
    "logoUrl": "",
    "iconUrl": ""
  },
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

Path rules:

- Runtime config paths are browser URL paths, not OS filesystem paths; use `/` separators even on Windows.
- `scripts` paths are resolved relative to `design-runtime/index.html`.
- `manifestPath` is resolved by the browser when running under a static server; include the `manifest` object for direct `file://` use.
- `manifest.webcomponents[].url` keeps normal SAC manifest semantics and should be relative to `widget.json`, for example `"widget.js"`.
- Configs loaded with the file picker still resolve widget script paths relative to `index.html`, not relative to the uploaded config file.

For multi-widget comparison, add more `widgets` entries. Each widget can reuse global scenarios or restrict itself with `scenarioIds`. Every compared widget must use a unique main custom-element tag.

Design-token controls are scenario-wide by default. Switch the runtime control to **Selected widget** when a token change should be stored under `scenarios[].widgets[widgetId].designTokens`.

## Iteration Export Contract

The runtime exports JSON with schema `sap-sac-widget-agent-iteration/v1` plus a Markdown summary. The payload includes:

- Active scenario.
- User notes and acceptance issues.
- Optional manual screenshot references, such as exported image filenames or short capture notes.
- `changedProperties`, `changedDesignTokens`, `changedDataBindings`, `changedViewport`, and `changedTheme` deltas.
- `current` state with viewport, theme, token scope, widget IDs, manifest IDs, custom element tags, properties, design tokens, and data bindings.
- Agent instruction to propose source changes rather than blindly applying runtime-only values.

Do not export patch files from the browser. The agent should inspect the payload, decide which changes belong in widget source, and then edit files through normal repo workflows.

## Usage Workflow

1. Generate the widget package with `/widget-generate`.
2. Open `design-runtime/index.html`.
3. Load `design-runtime.json` if direct file mode did not auto-load the sidecar.
4. Switch scenarios to inspect data, viewport, and theme behavior.
5. Adjust manifest properties and design tokens.
6. Record notes and acceptance issues.
7. Export JSON and Markdown.
8. Give the export payload back to the agent for the next implementation pass.
9. Install in SAC only after source changes are validated.

## Install in SAC

After preview/design iteration, use this checklist to move the generated widget into SAC:

1. Validate the generated package and confirm `widget.json`, main JS, optional styling/builder JS, icons, and vendor assets are present.
2. Choose hosting:
   - SAC-hosted: upload JS/assets to SAC Files/Public Files and use SAC/browser URL paths in `widget.json`.
   - External HTTPS or widget server: host JS/assets on the approved origin, configure CORS as needed, and add the origin in SAC System > Administration > App Integration > Trusted Origins.
3. Set `widget.json` component URLs, integrity hashes, and `ignoreIntegrity` for the chosen deployment model.
4. Import `widget.json` from the SAC Custom Widgets area.
5. Add the widget to a Responsive or Canvas story page.
6. Bind dimensions and measures in the exact feed order expected by the manifest.
7. Test with real story data, theme settings, resize behavior, and any styling/builder panel controls.

For AI-assisted composite workflows, preview and validate candidates first, then import the stable custom widget, test it in a story, and only then reuse or convert the surrounding design as a composite. Keep composite-ready widgets portable: no hardcoded model IDs, tenant URLs, or story-specific widget IDs.

This runtime cannot verify tenant trust, JSON import success, permissions, data-source behavior, or composite behavior.

## Critical Review Points

- If the browser preview works but SAC import fails, debug SAC hosting, trusted origin, integrity, and manifest/tag matching separately.
- If styling looks good but data is wrong, inspect `dataBindings` order and sequential `dimensions_N`/`measures_N` access.
- If one comparison card fails while another works, check duplicate `webcomponents[].tag` values first.
- If a widget uses ECharts, D3, or Chart.js, include local library assets or clearly document the missing dependency.
- If design-token changes are attractive but harm readability or accessibility, prefer readability and data integrity.
- If a runtime-exported change affects business semantics, convert it into an explicit manifest property or code change instead of keeping it as a preview-only token.
