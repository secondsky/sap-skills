# Local Builder Workflow

Use this reference when a user wants a local SAC custom widget builder for enterprise machines, restricted laptops, or offline-first scaffold generation.

## Table of Contents

1. [Purpose](#purpose)
2. [Boundary](#boundary)
3. [Generated Package Shape](#generated-package-shape)
4. [Builder Controls](#builder-controls)
5. [Export Contract](#export-contract)
6. [Usage Workflow](#usage-workflow)
7. [Validation Checklist](#validation-checklist)
8. [Source](#source)

---

## Purpose

`templates/local-builder/` provides a static, no-install browser builder for creating SAC custom widget scaffolds. It is inspired by browser-based widget builders, but keeps all work local and avoids external packages, public CDNs, remote scripts, tenant URLs, credentials, and online services.

Use it when users want to configure widget metadata, properties, feeds, methods, events, builder/styling component choices, and SAC upload artifacts from a browser UI before continuing with code edits.

## Boundary

The local builder creates scaffolds and export artifacts. It does not validate live SAC import, tenant trust, resource permissions, story runtime behavior, or real model binding.

Use:

- `local-builder/` for scaffold generation and `widget.json` plus Resource-ZIP export.
- `design-runtime/` for local preview, scenario switching, design-token tuning, sample data, and agent iteration export.
- Real SAC tenant import for final truth.

## Generated Package Shape

Generated packages should include both local tooling folders when the user wants local iteration:

```text
widget-name/
├── widget.json
├── widget.js
├── builder.js
├── styling.js
├── local-builder/
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

Do not include `local-builder/` or `design-runtime/` in SAC Resource-ZIP output.

## Builder Controls

The control palette maps local UI controls to portable SAC manifest properties:

| Builder control | SAC property type |
|-----------------|-------------------|
| Text input | `string` |
| Number | `number` |
| Integer | `integer` |
| Hex color string | `string` with a hex default |
| Toggle | `boolean` |
| Dropdown | `string` |
| Textarea | `string` |
| Slider | `integer` |
| Group label | `string` |
| Divider | `boolean` |

Prefer hex color strings for portable generated packages. Use SAC `Color` only after the target tenant and exact panel flow accept it.

The Sample Patterns area provides SAP-sample-informed hints for common starting points:

- Data-bound chart
- KPI / gauge
- Flow / hierarchy
- Builder input utility
- Widget Add-on reference
- Build-based app reference

Pattern hints prefill only generic metadata, feeds, support flags, properties, methods, and events. They do not copy SAP sample runtime code, assets, dependencies, tenant URLs, or third-party libraries. Reference-only hints route Widget Add-ons and build-based applications to planning guidance outside the v1 local builder.

## Export Contract

The primary builder output is the SAC Resource File upload flow:

1. `widget.json` for the first SAC custom widget upload step.
2. `<slug>-resources.zip` for the SAC Resource File upload step.

The Resource-ZIP must contain only root-level runtime resources:

```text
widget.js
builder.js
styling.js
```

Allowed additions are root-level PNG/JPG icons that are referenced by the manifest. Exclude:

- `widget.json`
- `local-builder/`
- `design-runtime/`
- HTML, CSS, Markdown, JSON, tests, source-only helpers, docs, and nested folders

For SAC Resource-ZIP mode, manifest `webcomponents[].url` values should be root-relative, such as `"/widget.js"`, `"/builder.js"`, and `"/styling.js"`.

## Usage Workflow

1. Open `templates/local-builder/index.html` directly.
2. If direct file mode is blocked, run `node server.mjs` from `templates/local-builder/` and open the loopback URL printed by Node.
3. Configure metadata, support flags, component tags, properties, feeds, methods, and events.
4. Optionally apply a Sample Pattern as a generic starting point.
5. Download `widget.json`.
6. Download the Resource-ZIP.
7. Validate generated files with `/widget-validate` and JavaScript syntax checks.
8. Upload `widget.json` first in SAC.
9. Upload the Resource-ZIP only after SAC accepts the manifest and enables Resource File upload.
10. Test with real story data in SAC.

## Validation Checklist

Before delivering a package generated through the local builder:

- `widget.json` parses and includes `methods` and `events` as objects.
- Component tags are lowercase hyphenated values.
- Resource-ZIP contains only allowed root-level files.
- Resource-ZIP does not include builder UI files, preview runtime files, docs, or nested folders.
- `node --check widget.js`, `node --check builder.js`, and `node --check styling.js` pass for generated component files.
- Local preview uses the final component files, not preview-only shared helpers.
- Live SAC import/runtime validation is not claimed unless performed in a tenant.

## Source

- External feature-shape reference: `custom-widgets.de/custom-widget-builder`
- SAP sample lesson reference: `references/sap-sample-widget-lessons.md`
