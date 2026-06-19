# AI-Assisted SAC Custom Widget and Composite Generation

Derived summary:
- SAP Community: [AI driven Composite Creation in SAP Analytics Cloud using SAP AI Core](https://community.sap.com/t5/technology-blog-posts-by-sap/ai-driven-composite-creation-in-sap-analytics-cloud-using-sap-ai-core/ba-p/14355732), published 2026-03-23 and modified 2026-04-07.
- User-provided generation rules for visually polished SAC custom widgets.

Use this reference when a user wants prompt-driven widget creation, AI-assisted chart selection, branded widget generation, or reusable composites. Treat these rules as generation guardrails; do not replace hand-written widget judgment, SAP Help requirements, or live SAC runtime validation.

## Table of Contents

1. [Two-Stage Generation Flow](#two-stage-generation-flow)
2. [Code Package Contract](#code-package-contract)
3. [Generated Widget Contract](#generated-widget-contract)
4. [Generation Guardrails](#generation-guardrails)
5. [RAG Context Pattern](#rag-context-pattern)
6. [Data Binding and Model Caveats](#data-binding-and-model-caveats)
7. [Polished Visual Design](#polished-visual-design)
8. [CSS and Styling Compliance](#css-and-styling-compliance)
9. [Browser Design Runtime](#browser-design-runtime)
10. [Deployment and Composite Use](#deployment-and-composite-use)
11. [Validation and Repair Loop](#validation-and-repair-loop)

---

## Two-Stage Generation Flow

Use a two-stage flow for AI-generated widgets:

1. **Suggestions stage**: Return JSON with 2-3 creative widget options before writing code. Base options on the business goal, provided sample data/schema, available dimensions/measures, and brand context.
2. **Code stage**: After the user picks an option, return a complete JSON code package with manifest, JavaScript components, and sample data.

Suggested questions before generating:

- Business goal: What decision should this widget help the story user make?
- Sample data/schema: Which columns are dimensions, measures, dates, versions, and filters?
- Chart intent: Should the assistant recommend chart types, or is a chart type fixed?
- Brand target: Are logo, icon, colors, and brand personality available?
- Deployment target: SAC-hosted files, external HTTPS host, or a widget server?
- Reuse target: Should the output be designed for conversion into a reusable SAC composite?

Suggestions-stage JSON shape:

```json
{
  "options": [
    {
      "name": "Forecast Continuity Ribbon",
      "description": "Shows actual values as a solid trend and forecast values as a dashed continuation with version context."
    }
  ]
}
```

## Code Package Contract

Return the code-stage output as JSON so downstream tooling can parse it reliably:

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
  "manifest": {
    "id": "com.company.widgetname",
    "version": "1.0.0",
    "name": "Widget Name",
    "newInstancePrefix": "WidgetName",
    "webcomponents": [],
    "properties": {},
    "methods": {},
    "events": {},
    "dataBindings": {}
  },
  "sampleData": [{}, {}, {}],
  "designRuntime": {
    "files": ["design-runtime/index.html", "design-runtime/runtime.css", "design-runtime/runtime.js", "design-runtime/design-runtime.json"],
    "config": {}
  }
}
```

For data-bound widgets, include 3-5 representative `sampleData` rows. Keep `mainJs`/`stylingJs` for compatibility with older consuming flows, and mirror those values in `files.main`/`files.styling` for package-oriented consumers.

For browser-runtime packages, keep `scripts` paths relative to `design-runtime/index.html`, keep manifest component URLs relative to `widget.json`, use `/` separators because these are browser URL paths even on Windows, and use unique custom-element tags for each compared widget.

Before splitting CSS or HTML into separate files, confirm the deployment mode. SAC ZIP resource upload packages should keep CSS inside the Web Component JavaScript template and should not include separate `.css` or `.html` files.

If the consuming pipeline parses text instead of JSON, require explicit section markers:

```text
===WIDGET_CONFIG===
{ ...widget.json... }

===MAIN_COMPONENT===
(function() { ... })();

===STYLING_PANEL===
(function() { ... })();
```

Use deterministic naming:

- Widget folder/name: hyphen-case, for example `sales-performance-ribbon`
- Manifest ID: lowercase dot notation, for example `com.company.widgetname`; do not use underscores
- HTML tag: lowercase hyphen notation, for example `com-company-widgetname`
- JavaScript class: `PascalCase`
- `newInstancePrefix`: PascalCase letters only, for example `WidgetName`
- Data binding ID: preserve the requested or manifest-defined ID, commonly `myDataBinding`

## Generated Widget Contract

For AI-generated packages, use this structure unless the user explicitly asks for a different hand-written pattern:

- Wrap every component in an IIFE: `(function() { ... })();`.
- Define the HTML/CSS shell with `document.createElement("template")`; static `template.innerHTML` is acceptable for the template itself.
- Extend `HTMLElement`, attach open Shadow DOM in `constructor()`, and clone the template into the shadow root.
- Register the custom element with `customElements.define(tagName, ClassName)` inside the IIFE.
- Implement lifecycle flow: `constructor()` for setup, `onCustomWidgetBeforeUpdate(changedProperties)` to merge incoming properties, `onCustomWidgetAfterUpdate(changedProperties)` to render, `onCustomWidgetResize()` to re-render or resize charts, and `onCustomWidgetDestroy()` to release resources.
- Use `render()` or `_render()` as the main rendering method; do not rely on SAC to call it directly.
- Read data from the manifest-defined binding, for example `this.myDataBinding.data`, never from `this._props.myDataBinding`.
- Access row members by sequential feed order: `row.dimensions_0.label`, `row.dimensions_0.id`, `row.measures_0.raw`, and `row.measures_0.formatted`.
- Use guarded fallback access such as `(row.dimensions_0 && row.dimensions_0.label) || "N/A"`; do not use optional chaining or nullish coalescing in generated code.
- Keep `methods` and `events` as objects in the manifest, even when empty.

Brand-aware generated packages should:

- Put a trusted accessible icon URL in manifest `icon` when provided.
- Add a `brandLogoUrl` property with a trusted default logo URL when provided.
- Include a header image such as `<img id="brandLogo" class="brand-logo" alt="">`.
- In render logic, set the image source only after checking the element and property exist.
- Style `.brand-logo` with bounded dimensions, for example `height: 36px; object-fit: contain;`.

## Generation Guardrails

Generated JavaScript must:

- Use Web Components with Shadow DOM.
- Wrap each component in an IIFE.
- Implement SAC lifecycle methods: `onCustomWidgetBeforeUpdate`, `onCustomWidgetAfterUpdate`, `onCustomWidgetResize`, and `onCustomWidgetDestroy`.
- Access bound data through the manifest-defined binding, for example `this.myDataBinding.data`.
- Use sequential indices for SAC result rows: `dimensions_0`, `dimensions_1`, `measures_0`, `measures_1`, `measures_2`. Never skip an index.
- Prefer plain loops for data transformation when strict compatibility is needed.

For AI-generated code packages, avoid syntax that has caused compatibility or parsing issues in generated SAC widget flows:

- No optional chaining (`?.`).
- No nullish coalescing (`??`).
- No arrow callbacks in `forEach`.
- No render-time template literals when string concatenation is safer for the parser.
- No public CDN dependency in generated enterprise/offline packages; copy third-party libraries into local `vendor/` assets or require explicit approval for the host.

These constraints are generation guardrails, not universal bans for every hand-maintained widget.

## RAG Context Pattern

For AI-assisted widget generation, separate retrieval material by purpose:

- `api_docs`: official SAC custom widget API documentation and lifecycle details.
- `syntax_reference`: exact manifest structure, data binding syntax, banned generation patterns, and output markers.
- `widget_example`: known-good widget JSON/JS examples and brand-ready layouts.

Retrieve more context than the final prompt needs, then rerank before generation. A practical pattern is:

1. Retrieve the top 15 semantically relevant chunks.
2. Ask the model to rerank them against the user request.
3. Include only the top 5 or similarly compact set in the generation prompt.

Use API docs and syntax references for Q&A. Use widget examples and syntax references for code generation. Keep brand context separate from code examples so generated styling does not accidentally import unsafe remote dependencies.

## Data Binding and Model Caveats

Always preserve binding names and feed order. SAC widgets interpret row data by the feed order and sequential result keys.

Example access pattern:

```javascript
var rows = [];
if (this.myDataBinding && this.myDataBinding.data) {
  rows = this.myDataBinding.data;
}

for (var i = 0; i < rows.length; i++) {
  var row = rows[i];
  var dateLabel = row.dimensions_0 && row.dimensions_0.label ? row.dimensions_0.label : "";
  var versionLabel = row.dimensions_1 && row.dimensions_1.label ? row.dimensions_1.label : "";
  var value = row.measures_0 && typeof row.measures_0.raw === "number" ? row.measures_0.raw : 0;
}
```

Common AI-generation pitfalls:

- Numeric-looking dates such as `202601` may be inferred as measures. Ask for date fields to be formatted as dates or categorical strings in the sample data/schema.
- BW live models may not provide sample rows to the generator. Ask for a representative CSV or sample schema that mirrors live model dimensions and measures.
- Forecast start boundaries should usually be inferred from data, such as a version or scenario dimension, unless the widget explicitly exposes a property for the boundary.
- If a generated preview works but SAC does not, verify the exact data-binding order from the manifest and the story builder panel.

## Polished Visual Design

For user-facing generated widgets, design for a beautiful, professional SAC story surface while keeping data correctness first:

- Use modern CSS, restrained gradients, subtle shadows, and purposeful motion.
- Include a brand logo in the widget header when a trusted logo URL is provided.
- Use the brand icon in the manifest only when the URL is stable, accessible to SAC, and safe to load.
- Prefer SAP theme variables for text, background, and focus colors when they preserve the intended brand look.
- Keep styling scoped to the Web Component or Shadow DOM boundary; generated widgets should render correctly without SAC story theme CSS.
- Keep animations lightweight and disable or reduce them for large datasets or frequent updates.
- Do not let decorative layers obscure labels, tooltips, legends, accessibility, or data values.
- Never add remote scripts, tracking pixels, credentials, or untrusted assets for visual polish.

## CSS and Styling Compliance

Generated widgets may use CSS inside their Web Component template, including `:host` styles, responsive containers, and SAP theme variables with fallbacks. They must not depend on SAC optimized story theme CSS, SAP shell class names, or global story CSS to style widget internals.

For hosting-sensitive output, read `references/css-and-styling-compliance.md` before generation. In particular, SAC ZIP resource upload supports Web Component JavaScript for main/styling/builder plus PNG/JPG icon, so separate CSS/HTML files are not valid for that package shape.

## Browser Design Runtime

Generated packages should include `templates/design-runtime/` as a non-SAP preview surface. Use it to inspect candidate widgets with representative data before SAC import, tune manifest properties and design tokens, compare multiple widgets, switch viewport/theme/data scenarios, and export `agent-iteration.json` plus a Markdown summary.

Keep the boundary explicit:

- The runtime mocks custom-widget essentials only; it does not emulate SAC story layout, script APIs, planning APIs, linked analysis, permissions, or tenant behavior.
- Runtime-only settings belong in `design-runtime/design-runtime.json`, not `widget.json`.
- Browser exports are feedback for the agent; they are not source patches and should not be applied blindly.
- Direct `file://` use should work without installs. If a browser blocks sidecar JSON loading, use the runtime's config loader or an optional local static server.
- Iteration exports include both changed deltas and current full state. Use the changed sections to decide what belongs in source, and use current state for context.

See `references/browser-design-runtime.md` for the full sidecar config and export contract.

## Deployment and Composite Use

### Install Handoff

The SAP Community AI-driven composite workflow frames generated custom widgets as candidates that can become reusable composites after they are validated. Treat that as a handoff sequence:

1. Preview the generated widget in the browser design runtime with representative sample data.
2. Validate the generated package and repair manifest/code issues before SAC import.
3. Host JS/assets through SAC Files/Public Files or an approved HTTPS/widget server.
4. Configure `widget.json` URLs, integrity settings, and trusted-origin requirements for the chosen host.
5. Import `widget.json` from the SAC Custom Widgets area.
6. Place the widget in a Responsive or Canvas story and bind feeds in exact manifest order.
7. Test with real story data before reusing or converting the surrounding design as a composite.

Do not claim SAP AI Core, live SAC tenant, import, or composite validation from generated files or browser-runtime preview alone.

For hosted widget-server deployments, SAC must trust the serving origin:

1. Go to System > Administration > App Integration.
2. Add the widget server URL under Trusted Origins.
3. Import the generated widget JSON from the Custom Widgets area.
4. Add the widget to a Responsive or Canvas story page.
5. Bind dimensions and measures in the exact order expected by the manifest.

When designing for SAC composites:

- Keep widget configuration portable and data-binding-driven.
- Avoid hardcoded model IDs, tenant URLs, or story-specific widget IDs.
- Use properties for reusable style and behavior settings.
- Test the generated widget in a story before converting the surrounding layout into a composite.

## Validation and Repair Loop

Validate generated output before handing it to SAC:

- Manifest contains required root fields, valid webcomponents, properties, and dataBindings.
- `webcomponents[].tag` matches `customElements.define()`.
- `webcomponents[].url` values point to JavaScript component files, not `.css` or `.html`.
- All data binding keys used in JavaScript exist in the manifest.
- JavaScript parses without syntax errors.
- No skipped `dimensions_N` or `measures_N` access patterns.
- No unsafe DOM insertion, `eval`, hardcoded credentials, untrusted script loading, remote CSS/font imports, or global SAC page styling.

If validation fails, retry with a targeted repair prompt and cap repair attempts at three:

```text
The following widget code has validation errors:
- [list exact errors]

Fix ONLY the errors listed. Output the COMPLETE fixed widget package using the same output format.
```

If the third repair still fails, stop and return the validation findings with the partial package marked as not ready for SAC import.
