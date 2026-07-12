# Widget Discovery Intake

Sources:
- User-approved SAC widget discovery requirements.
- Feature-shape references: [Custom Widget Builder](https://www.custom-widgets.de/custom-widget-builder) and [live demo](https://www.custom-widgets.de/demo).

Use this reference before generating a SAC custom widget from a prompt, screenshot, PDF, image, data extract, or existing story. Classify the widget first. Do not assume that every widget is a chart or requires SAC model data.

## Decision Order

1. Select the widget role.
2. Select the data-source mode.
3. Gather only the evidence needed for that combination.
4. Return a Widget Brief with assumptions and questions that need confirmation before code generation.

## Widget Roles

### Table, Chart, and KPI Widgets

Use this role for data tables, charts, scorecards, gauges, progress bars, and other displays whose primary purpose is to present values. Ask what decision the story user should make, how values are aggregated and formatted, and how empty, partial, and error data should appear.

### UI Controls and Navigation

Use this role for a menu, sidebar, button bar, filter control, navigation surface, or other interaction-first widget. Ask for item hierarchy, labels, icons, active and disabled states, commands, navigation or filter actions, permissions, events, methods, keyboard behavior, and mobile layout. Do not ask for dimensions or key figures unless the control displays or derives them.

### Hybrid Widgets

Use this role when a control also displays a small amount of model-driven state, such as a selected member, count, status, or badge. Define the interaction contract first, then request only the model fields that the UI actually reads or changes.

### Widget Add-Ons

Use the Widget Add-on route when the request extends an existing SAC chart area, tooltip, or numeric point. Consult `references/widget-addon-guide.md`; do not treat an add-on as a normal top-level widget.

### Build-Based Integrations

Use this route for UI5/React, file upload, service/API, authentication, or dependency-heavy work. Plan the build output, licenses, security, tenant trust, and Resource-ZIP contents before generating code. Do not route these requests through the no-install local builder.

## Data-Source Modes

### SAC-bound

Use SAC-bound mode when the widget consumes SAC model result sets. Request a representative schema or sanitized CSV, semantic dimensions, measures or key figures, dates, versions, filters, aggregation and formatting rules, expected data volume, and exact feed order. Confirm technical IDs and binding names from the story or model metadata before generating a manifest.

### Property/config-supplied

Use property/config-supplied mode when the story author configures labels, items, values, or static JSON through widget properties. Define property types, defaults, validation, and builder/styling-panel needs. Do not add SAC data bindings merely because the widget displays information.

### No data

Use no-data mode for pure menus, sidebars, navigation, and static interaction surfaces. Generate the minimal manifest/property/event pattern and omit `dataBindings` unless the runtime actually consumes SAC model data. Document actions and state transitions rather than inventing dimensions or feeds.

## Evidence Intake

Accept user-provided evidence only. Ask what each attachment should influence: layout, behavior, data mapping, or brand styling.

- **screenshots**: infer visible layout, labels, hierarchy, states, responsive behavior, and visual tokens. Confirm technical IDs, feed mappings, and interaction behavior separately because they are not reliably visible.
- **PDFs and images**: use design systems, screenshots, and brand guides to infer colors, typography, spacing, icon treatment, and logo placement. Confirm that logos/assets are licensed and available to the target SAC hosting path before embedding them.
- **Data extracts and model evidence**: use a schema, CSV, or story/model screenshot to identify candidate dimensions, measures, dates, versions, and filters. Redact customer data and confirm fields, aggregation, and feed order before implementation.
- **Existing source or exported artifacts**: inspect as input, but do not copy third-party code, tenant URLs, secrets, or license-restricted assets without explicit approval.

Do not treat OCR-like text or visual inference as authoritative. Record uncertain labels, technical IDs, asset ownership, and navigation destinations in the Widget Brief for user confirmation.

## Widget Brief

Before code generation, return a concise brief containing:

- Widget role and data-source mode.
- Audience, business decision or task, and story placement.
- Evidence received, intended use, source, and sensitivity classification.
- Data contract, or an explicit no-data declaration.
- Properties, methods, events, interactions, permissions, and responsive/accessibility requirements.
- Brand rules and confirmed asset hosting/license status.
- Assumptions, missing technical IDs, feed mappings, and confirmation questions.

## Hosted Exploration Boundary

The hosted builder and demo are optional desktop-only visual references. Suggest them only after the user permits public-web use and confirms that the prototype uses non-sensitive, sanitized inputs. Never send confidential screenshots, PDFs, tenant details, code, data, credentials, or internal assets to those sites. Treat any downloaded package as an untrusted external artifact: validate it locally, inspect its Resource-ZIP, and test it in an SAC tenant before relying on it.
