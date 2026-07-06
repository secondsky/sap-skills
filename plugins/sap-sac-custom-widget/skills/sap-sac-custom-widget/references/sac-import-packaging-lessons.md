# SAC Import and Packaging Lessons

Use this reference when generating final SAC Custom Widget artifacts, debugging SAC import/load failures, or deciding between SAC-hosted Resource-ZIP upload and external HTTPS hosting.

## Table of Contents

- [Core Model](#core-model)
- [Hosting Mode Matrix](#hosting-mode-matrix)
- [Manifest Rules](#manifest-rules)
- [Resource-ZIP Rules](#resource-zip-rules)
- [Upload Flow](#upload-flow)
- [Builder and Tree Editing Rules](#builder-and-tree-editing-rules)
- [Self-Contained Component Rules](#self-contained-component-rules)
- [Layout and Styling Rules](#layout-and-styling-rules)
- [Output and Artifact Hygiene](#output-and-artifact-hygiene)
- [Final Chat Handoff](#final-chat-handoff)
- [Final Artifact Tests](#final-artifact-tests)
- [Debug Order](#debug-order)
- [Error Mapping](#error-mapping)
- [Generation Checklist](#generation-checklist)
- [Sources](#sources)

## Core Model

Think in two layers:

1. `widget.json` is the manifest. SAC validates it first.
2. Component JavaScript is uploaded or hosted separately. In SAC dialogs that expose a Resource File upload, the Resource-ZIP upload becomes available only after a valid manifest upload.

Local browser preview and Node tests are useful development checks, but they do not prove SAC importability. Final verification must inspect the actual manifest and package delivered to SAC.

## Hosting Mode Matrix

| Mode | `webcomponents[].url` | Delivery artifact |
|------|------------------------|-------------------|
| SAC Resource-ZIP upload | `"/widget.js"`, `"/builder.js"`, `"/styling.js"` | `widget.json` plus separate Resource-ZIP |
| External HTTPS hosting | `"https://example.com/widget.js"` | `widget.json` plus hosted JS with CORS |
| Local preview/runtime | `"widget.js"` or preview-relative script paths | Preview-only config, not the final SAC Resource-ZIP manifest |

Do not use Windows backslashes in manifest URLs.

## Manifest Rules

- Check `id`, `version`, `name`, `webcomponents`, `properties`, `methods`, and `events`.
- Use lowercase hyphenated custom element tags.
- For SAC Resource-ZIP upload, use root-relative component URLs starting with `/`.
- For external hosting, use HTTPS URLs. Avoid `http://`.
- For simple configurable colors, prefer `string` properties with hex defaults such as `"#f4f7fa"`.
- Use `Color` only after the target SAC tenant and the exact panel flow accept that type.
- Keep `methods` and `events` as objects.

## Resource-ZIP Rules

For SAC Resource-ZIP upload, the ZIP should contain only root-level runtime resources:

```text
builder.js
styling.js
widget.js
```

Allowed: component JavaScript files and optional PNG/JPG icons.

Not allowed in the Resource-ZIP:

- `widget.json`
- Subfolders
- Tests
- README or documentation files
- Separate CSS or HTML files
- Local preview runtime files

Keep CSS inside Web Component templates or Shadow DOM styles in the JavaScript files for this delivery mode.

## Upload Flow

1. Upload `widget.json`.
2. Wait for SAC to validate the manifest and enable the Resource File upload.
3. Upload the Resource-ZIP.
4. Insert the widget in a story or application.
5. Check SAC errors, browser console, and network requests.

Do not package `widget.json` and component JavaScript together as one generic upload ZIP when the SAC dialog separates JSON and Resource File upload.

## Builder and Tree Editing Rules

- Textinput events in builder/styling panels should update the selected entry, visible labels, and JSON text without triggering a full render.
- Use full render only for structural changes such as add, delete, duplicate, move, or JSON import.
- Preserve input focus and builder collapse state while editing labels, targets, or style values.
- Builder UI state such as collapse/expand should stay local to the builder component, not inside the persisted `menuConfig`.
- Keep top-level nodes visible and prominent; default top-level nodes to expanded and nested nodes with children to collapsed unless the user opens them.
- Let the chevron toggle collapse without changing selection. Let row click select the node.
- Expand ancestors when selecting or adding a nested item so the edited item remains visible.
- When duplicating a menu subtree, rewrite descendant IDs as well as the root ID. IDs must be unique across the full menu tree, not only among siblings.

## Self-Contained Component Rules

- SAC loads component JavaScript files independently. `widget.js`, `builder.js`, and `styling.js` must be self-contained enough to run when loaded by SAC.
- If shared helper/core source files exist during development, bundled runtime fallbacks must mirror the behavior needed by each component.
- Test bundled output files, not only source helpers such as `src/menu-core.js`.
- Local preview should exercise the same delivery form as SAC. Prefer loading only `../widget.js`, `../builder.js`, and `../styling.js` from `design-runtime/index.html`; do not silently depend on preview-only shared core scripts.
- Remove stale submenu panels, popovers, overlays, or detached interactive panels before each render. UI with active overlay state needs explicit cleanup tests.

## Layout and Styling Rules

- Model layout mode explicitly. Use properties such as `gridMode`, `gridColumns`, and `gridRows` rather than inferring fixed-grid behavior from numeric values.
- Keep auto-fit as the default for responsive SAC story areas, and add fixed grid as an explicit mode.
- Apply layout values through Shadow DOM CSS variables so the main widget can react consistently to builder/styling changes.
- Styling-panel properties must stay synchronized across manifest, styling panel UI, and main widget rendering.
- Centralize global spacing and radius values through CSS variables for card radius, card padding, text spacing, icon spacing, card gaps, and submenu spacing.
- Group styling panel controls by task, for example Layout/Grid, Card Spacing, Text Spacing, Icon Spacing, Submenu Spacing, and Typography/Colors.
- Preserve existing visual defaults when adding new styling controls.

## Output and Artifact Hygiene

- Do not copy over an existing output folder. Perform safe output cleanup first: resolve the target, verify it is inside the intended output package directory, then remove and recreate it.
- Validate final artifacts from `outputs/`, not only `work/` or source directories.
- Rebuild the Resource-ZIP after every manifest or JavaScript fix.
- Name artifacts to mirror the SAC dialog. Use a separate JSON artifact such as `outputs/sac-menu-widget.json` and a Resource-ZIP such as `outputs/sac-menu-widget-resources.zip`.
- Avoid names like `sac-upload.zip` when the SAC flow expects two separate uploads; ambiguous names cause users to upload the wrong artifact.

## Final Chat Handoff

When a SAC custom widget is done, the final chat response must offer both completed upload artifacts as separate downloadable items:

1. The `widget.json` manifest for the first SAC upload step.
2. The Resource-ZIP for the second SAC Resource File upload step.

Use clear labels such as `JSON upload: outputs/sac-menu-widget.json` and `Resource-ZIP upload: outputs/sac-menu-widget-resources.zip`. Do not finish with only one artifact, only a combined ZIP, or only prose instructions. If the chat client supports file attachments or download links, include both files directly in the chat. If it only supports local file links, include clickable links or exact paths for both files.

## Final Artifact Tests

Run checks against both the work package and the delivered output package:

```text
node --test
node --check widget.js
node --check builder.js
node --check styling.js
```

Also inspect the final `widget.json` and ZIP:

- Color fallback properties are `string` with hex defaults unless `Color` was tenant-validated.
- SAC Resource-ZIP URLs start with `/`.
- External-hosting URLs start with `https://`.
- URLs contain `/`, not Windows `\`.
- Resource-ZIP contains only permitted root-level files.
- ZIP was rebuilt after the last fix.
- `design-runtime/index.html` does not depend on preview-only shared source scripts.
- Bundled `widget.js`, `builder.js`, and `styling.js` include required fallback behavior when loaded standalone.
- Builder textinput edits preserve focus and collapse state.
- Tree duplicate/add operations rewrite descendant IDs.
- Re-rendering removes stale submenu panels or overlays.
- Fixed-grid and auto-fit modes set the expected CSS variables.
- Manifest, styling panel, and main widget expose the same styling properties.
- Final chat response offers both downloadable artifacts: the `widget.json` manifest and Resource-ZIP.

If `node --test` fails with `spawn EPERM` in a local sandbox, treat that as a process-permission issue first. Re-run in an allowed runtime before judging code quality.

## Debug Order

When SAC reports that the custom widget or `main` component cannot be loaded:

1. Capture the exact SAC error message and correlation ID.
2. Check manifest property types.
3. Check `webcomponents[].url` against the selected hosting mode.
4. Check Resource-ZIP contents.
5. Run JavaScript syntax checks with `node --check`.
6. Open local preview and browser console.
7. Test a minimal widget if SAC still reports that `main` cannot be loaded.
8. Only then debug complex runtime logic.
9. For builder issues, check focus retention, collapse state, and full-render paths.
10. For tree data issues, check unique IDs across descendants, not only the selected node.
11. For preview/SAC differences, compare preview scripts to the final bundled component files.

## Error Mapping

| SAC symptom | First checks |
|-------------|--------------|
| `"Color" is not a valid type` | Change simple color properties to `string` plus hex defaults |
| Resource File upload is disabled | Manifest did not validate yet, or URLs do not match the expected SAC flow |
| `main` component could not be loaded | Root-relative URLs, Resource-ZIP contents, JS syntax |
| Local preview works but SAC fails | Final manifest/package rules, not component behavior first |
| Builder text input loses focus | Textinput handler caused full render; update only field, visible row label, and JSON text |
| Collapse state resets while editing | Collapse state persisted in model or render path rebuilds all rows |
| Duplicate subtree has repeated IDs | Descendant IDs were not rewritten during duplicate/add |
| Local preview passes but bundled SAC file fails | Preview depends on shared source core not present in final JS files |
| Old submenu panels remain visible | Render path did not remove stale overlays before rebuilding |
| Output ZIP contains old or nested files | Output folder was copied over instead of safely cleaned and rebuilt |
| User uploads one ZIP instead of JSON plus Resource-ZIP | Artifact naming does not match the SAC dialog |

## Generation Checklist

Before delivering a generated SAC custom widget package, decide or verify:

- SAC-hosted Resource-ZIP upload or external HTTPS hosting.
- Separate JSON and Resource-ZIP uploads if the SAC dialog requires them.
- Root-relative URLs for Resource-ZIP mode or HTTPS URLs for external mode.
- Simple colors as robust `string` properties with hex defaults.
- Resource-ZIP contains only allowed root-level resources.
- Final `outputs/` artifacts were validated after the last rebuild.
- Component JS files are self-contained without preview-only helper dependencies.
- Builder textinput edits keep focus and collapse state.
- Tree duplication rewrites descendant IDs.
- Styling properties are synchronized between manifest, styling panel, and main widget.
- Artifact names clearly distinguish JSON upload from Resource-ZIP upload.
- Final chat response includes both downloadable artifacts, not just instructions or one combined ZIP.

## Sources

- SAP Help: Custom Widgets Developer Guide: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html
- SAP Help: Hosting Custom Widgets: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/e983213a29554afb9700905ec0beb3d3.html
- Project lesson: Configurable Menu Navigation, 2026-07-06
