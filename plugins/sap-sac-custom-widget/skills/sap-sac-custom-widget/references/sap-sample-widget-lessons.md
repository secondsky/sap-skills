# SAP Sample Widget Lessons

Use this reference before generating or reviewing SAC custom widgets that resemble SAP's community sample widgets. The source is the SAP-samples `SAC_Custom_Widgets` directory in `SAP-samples/analytics-cloud-datasphere-community-content`: https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets.

## Table of Contents

1. [Source Boundaries](#source-boundaries)
2. [Sample Audit Matrix](#sample-audit-matrix)
3. [Reusable Creation Lessons](#reusable-creation-lessons)
4. [Generation Defaults](#generation-defaults)

---

## Source Boundaries

Treat the SAP samples as reference material, not bundled code. Do not copy sample JavaScript, assets, icons, or build output into generated GPL skill templates unless the license and provenance are reviewed for the target project.

The SAP sample README states the samples are provided for Optimized Story Experience use, are not covered by an SAP support or maintenance obligation, require users to review third-party library licenses, and are developed with the Data Binding property for Optimized View Mode or Optimized and Unified Story Experience. It also warns that when custom widgets are hosted in a different repository or web server, the web component paths in the JSON must be changed.

## Sample Audit Matrix

| Sample folder | Shape observed | Lesson for generation |
|---------------|----------------|-----------------------|
| Custom Pie Chart | ECharts-style main component with `myDataSource`, dimension and measure feeds, methods for caption/feed/model access, and click/result events. | For chart samples, start with Data Binding and expose only script methods/events that the story really needs. |
| Funnel Chart | Main-only chart with root-relative JS URL and dimension/measure feeds. | Keep default chart scaffolds simple before adding panels; feed order must match result access. |
| Gauge Grade Chart | Main plus styling component, support flag for mobile, array/integer/boolean properties. | Styling panels are useful for visual thresholds and direction toggles; model threshold arrays as manifest properties. |
| Half Donut Chart | Main-only KPI chart with dimension/measure feeds and caption/feed methods. | KPI charts still often need a dimension feed for labels, not only a measure. |
| Integrity Node Files | Small Node signing helper. | Integrity generation belongs in tooling or docs, not in the Resource-ZIP runtime files. |
| Kpi Ring Chart | Main-only ring KPI with width/height-style integer properties. | Keep KPI scaffolds compact and data-bound; avoid overfitting panel controls early. |
| Line Chart | Main-only chart using a `dataBinding` feed and root-relative JS URL. | Root-relative component URLs are a good default for SAC Resource-ZIP mode. |
| Nested Pie Chart | Main-only nested chart with dimension/measure feeds and script methods/events. | Hierarchical charts need clear feed mapping and sequential result indexes. |
| Pareto Chart | Main chart with ordering/selection methods and click event. | Add methods only when story scripts need imperative actions such as ordering or selected-point retrieval. |
| Sankey Chart with Styling Panel | Main plus styling component, support flags for mobile/bookmark/linked analysis, `stylingSetting` properties, `getDataSource` method. | Flow charts benefit from styling panels and explicit support flags; document linked-analysis expectations. |
| Sunbrust Chart with Styling Panel | Main plus styling component, support flags for mobile/export/bookmark/linked analysis, boolean/string/string-array properties. | Use the repo spelling `Sunbrust` when auditing, but use "Sunburst" in generated user-facing naming unless matching the upstream folder. |
| Tree Chart with Styling Panel | Main plus styling component, many script methods, click event, export support. | Tree/hierarchy widgets often need property-backed layout, node, line, and selection controls. |
| UI5 Gantt Chart | Main, styling, and builder components; custom `types`; many horizon/event/theme methods; dimension/measure feeds. | Complex widgets may need all three component kinds plus custom manifest `types`; keep the local builder generic and route UI5-specific work to dedicated implementation. |
| Widget Add-on Sample | Add-on manifest uses `extensions[]` with tooltip, plot area, and numeric point extension points, each with main and builder components. | Widget Add-ons are not ordinary top-level `webcomponents` widgets; generate them through the add-on guide, not the v1 local builder path. |
| World Cloud by Input | Main plus builder component, no data binding, text property and `setText` method. | Input utilities can be property/method driven without model feeds; builder panels are appropriate for authored input. |
| bar-gradient-binding | Main-only chart with Data Binding, mobile support, and root-relative JS URL. | Visual variants can stay main-only when customization is encoded in data and simple properties. |
| file-upload-widget-master | Build-based file upload widget with template/localdev/version manifests, imports, builder component, Selection properties, success/failure events, DIS service calls, and React/UI5 dependencies. | Build-based apps are out of scope for the no-install local builder; document API, security, dependency, and tenant validation requirements before implementation. |

## Reusable Creation Lessons

- Prefer Data Binding-first scaffolds for chart-like widgets. Most chart samples use dimension plus `mainStructureMember` measure feeds and assume Optimized View Mode.
- Use root-relative URLs such as `"/widget.js"`, `"/builder.js"`, and `"/styling.js"` for SAC Resource-ZIP mode. Rework paths when moving to external hosting.
- Keep main, builder, and styling components separate. Builder/styling panels should dispatch `propertiesChanged` and avoid full rerenders that destroy focus during text edits.
- Model simple visual controls as portable manifest properties: strings for hex colors, integers/numbers for sizes and thresholds, booleans for toggles, and arrays/custom `types` only when the widget truly needs richer structure.
- Add methods and events only for story scripting contracts: selected data point retrieval, ordering, text input, open dialog actions, status callbacks, or model/feed helpers.
- Treat `supportsMobile`, `supportsExport`, `supportsBookmark`, and `supportsLinkedAnalysisFilterOnSelection` as deliberate compatibility claims. Do not enable them just because a similar sample does.
- For third-party chart libraries, use local vendor assets or an explicitly approved host. The SAP samples demonstrate library-based widgets, but production use still requires license and security review.
- For Widget Add-ons, use the `extensions[]` manifest model and extension points from the add-on guide. Do not force add-ons into ordinary custom-widget `webcomponents`.
- For build-based widgets such as file upload or UI5/React wrappers, plan dependency installation, build output, API authentication/authorization, tenant trust, and Resource-ZIP contents separately from the static local builder.

## Generation Defaults

When `/widget-generate` needs a sample-informed starting point:

- Use `data-bound-chart` for line, funnel, pie, nested pie, bar-gradient, and Pareto-like requests.
- Use `kpi-gauge` for KPI ring, gauge grade, half donut, and compact score displays.
- Use `flow-hierarchy-chart` for Sankey, Sunburst, Tree, and hierarchy/flow requests.
- Use `builder-input-utility` for word-cloud/input widgets or authored text utilities.
- Route Widget Add-ons to `references/widget-addon-guide.md`.
- Route build-based file upload, UI5 Gantt, React, or service/API widgets to explicit implementation planning instead of the no-install local builder.

Keep the generated scaffold generic. The SAP sample repository teaches structure and caveats; it is not a template source for copied runtime code.
