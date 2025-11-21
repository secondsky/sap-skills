# SAPUI5 Glossary

**Source**: https://github.com/SAP-docs/sapui5/blob/main/docs/glossary-9ef211e.md
**Last Updated**: 2025-11-21

---

## Core UI Concepts

**Aggregation**: A special relationship defining parent-child hierarchies in UI elements. The parent end has cardinality 0..1, while children may have 0..1 or 0..*. Used to build complex UI structures.

**Association**: A loose coupling between UI element types independent of tree structure, implemented by storing target element instance IDs. Used for references without ownership.

**Control**: Independent UI elements like Button, Label, TextField, or Table that manage rectangular screen regions and serve as entry points for rendering. Controls are the building blocks of SAPUI5 applications.

**Element**: The basic building block of user interfaces—reusable entities with properties, events, methods, and relations forming tree structures.

**Property**: Named attributes with associated data types, accessible via getters and setters, with well-defined default values. Examples: text, enabled, visible.

**Event**: Named occurrences with parameters; the element's API supports managing event subscriptions. Examples: press, change, selectionChange.

---

## Architecture & Development

**Library**: Top-level structural units bundling controls, types, and making them consumable by applications. Examples: sap.m (mobile), sap.ui.table (tables), sap.f (fiori).

**Model**: Data provider assigned to UI where controls bind to data. Various types available depending on server-side data formats (JSON, OData, XML, Resource).

**View**: Application unit defining control definitions for the user interface layer's appearance. Available types: XML, JSON, JavaScript, HTML.

**Controller**: Active application unit serving as the logical interface between model and view, embodying MVC concepts. Contains event handlers and business logic.

**Component**: Self-contained, reusable unit with manifest.json configuration. Represents a complete application or reusable part.

**Bootstrap**: Process of loading and initializing SAPUI5 runtime in HTML pages via the sap-ui-core.js script tag.

**Fragment**: Reusable UI snippet without its own controller. Can be XML, JSON, JavaScript, or HTML format.

---

## Data & Integration

**Data Binding**: Technique synchronizing two data sources, with changes in one automatically reflected in the other. Supports one-way, two-way, property, aggregation, and element binding.

**Data Type**: First-class entities in the meta model allowing reuse across libraries and system extensibility. Examples: sap.ui.model.type.String, sap.ui.model.type.Date, sap.ui.model.type.Currency.

**OData**: "Standard protocol that defines best practices for building and consuming an interface to backend systems over the web." Based on REST principles.

**OData Model**: Implementation supporting the Open Data Protocol format for structured data communication. Available in v2 and v4 versions.

**Mock Server**: Mocking framework for HTTP/HTTPS simplifying integration testing and decoupling development teams. Simulates OData services.

**Resource Model**: Model for internationalization (i18n) containing translated texts. Uses Java properties file format.

**JSON Model**: Client-side model for JavaScript object data. Suitable for small datasets and configuration data.

**XML Model**: Client-side model for XML data structures.

---

## SAP Fiori Elements

**SAP Fiori Elements**: Predefined template views and controllers enabling developers to create applications based on OData services and annotations "requiring no JavaScript UI coding."

**Annotations**: Metadata accompanying application data, controlling display, position, sort order, measures, dimensions, and navigation enablement in UI controls. Examples: @UI.LineItem, @UI.SelectionFields, @UI.FieldGroup.

**Key Annotations**: Critical annotations defining rendering or behavior. Examples: LineItem, SelectionFields, InsertRestrictions, UpdateRestrictions.

**Manifest**: Main configuration file (manifest.json) where developers define application settings and interface behavior, including filter fields, table properties, and routing.

**Action**: "Business function in the application backend that can be triggered by the user from the UI using an action button." Can be bound or unbound.

**Facet**: Basic building block of object pages—can be header facets, reference facets (rendered as forms/tables/charts), or collection facets (sections holding multiple references).

**Section**: Top-level grouping of object page facets below the header, containing subsections with associated facets.

**Entity**: Business object in OData definitions; associations define relationships enabling navigation. Example: SalesOrder with SalesOrderItems.

**Main Entity**: Entry entity holding information displayed in SAP Fiori templates. Example: SalesOrder in a Manage Sales Order application.

**Navigation Entity**: Associated entities with detailed information (1:n or 1:1 relationships with main objects). Example: SalesOrderItems related to SalesOrder.

**iAppState**: Inner application state storing information required to retrieve app state when URLs reload, including filters and sort orders.

**xAppState**: External application state representing source app context passed during navigation, including filter values and selected row data.

**Determining Action**: Finalizing action at page bottom applying to entire page context (object/subobject pages). Example: Approve, Reject.

**Paginator Buttons**: Toolbar buttons enabling navigation between previous/next object pages displayed in list reports.

**Draft**: Temporary version of a business entity allowing users to save incomplete work. Drafts are stored separately from active data.

**Flexible Column Layout**: Responsive UI pattern showing up to 3 columns (list, detail, detail-detail) based on screen size.

---

## MVC Pattern

**Model-View-Controller (MVC)**: Architectural pattern separating application logic (controller), data (model), and presentation (view).

**Binding Context**: Link between a UI element and data in a model. Determines which data is displayed.

**Binding Path**: String expression pointing to data in a model. Absolute paths start with "/", relative paths don't.

**Formatter**: Function converting model data to display format. Example: formatting date, currency, or status.

**Expression Binding**: Inline data binding with simple expressions. Example: {= ${quantity} > 10 ? 'high' : 'low'}.

---

## Testing & Quality

**QUnit**: JavaScript unit testing framework packaged with SAPUI5. Used for testing individual functions and modules.

**OPA5**: "API for SAPUI5 controls that hides asynchronicity and eases access," helping test user interactions, navigation, and data binding. Stands for One Page Acceptance tests.

**wdi5**: Webdriver.IO service for cross-platform end-to-end testing on SAPUI5 applications with OPA5-compatible selectors.

**Mock Server**: Tool simulating OData backend services for testing without real backend connection.

**Test Automation**: Automated execution of tests using tools like OPA5, wdi5, or UIVeri5.

**Support Assistant**: Built-in tool for checking applications against best practices and identifying common issues.

**Diagnostics**: Available window in SAPUI5 applications accessed via [Ctrl]+[Shift]+[Alt]/[Option][S]. Shows technical information, debug options, and support tools.

**Demo Kit**: "SAPUI5 software development kit providing documentation, API reference, samples, and demo apps." Available at https://sapui5.hana.ondemand.com/

---

## Performance & Security

**Cache Buster**: Mechanism notifying browsers to refresh resources only when application resources change. Uses timestamp or hash in URLs.

**Content Density**: Adaptive design feature allowing controls to adjust for touch-enabled devices (larger - cozy) or mouse-operated devices (compact).

**Asynchronous Processing**: Non-blocking mode executing tasks in background with callback triggers; "highly recommended for performance reasons and to not freeze the UI."

**Synchronous Processing**: Blocking mode keeping browser thread busy until tasks complete; not recommended for long-running operations.

**Lazy Loading**: Loading resources (views, controls, libraries) only when needed, improving initial load time.

**Bundling**: Combining multiple files into fewer files to reduce HTTP requests.

**Minification**: Removing whitespace and shortening variable names to reduce file size.

**Preload Files**: Bundled resources loaded at application startup. Generated by UI5 Tooling.

**Component Preload**: Single file containing all component resources for faster loading.

**Clickjacking**: "UI redressing that tricks users into triggering actions by redirecting clicks," often using invisible iFrames. Prevented using frame-options and CSP.

**Cross-Site Scripting (XSS)**: "Injecting script code into web pages executed in page context," potentially accessing displayed information and session cookies. SAPUI5 provides automatic XSS protection via output encoding.

**Content Security Policy (CSP)**: Security standard preventing XSS by controlling which resources can be loaded. SAPUI5 supports CSP-compliant development.

**Input Validation**: Checking user input for valid format and content. Use data types and validators.

**Output Encoding**: Converting special characters to prevent XSS. Automatically applied by SAPUI5.

---

## Accessibility & Internationalization

**ARIA**: "Accessible Rich Internet Applications Suite defining ways to make Web content and applications more accessible to people with disabilities," especially for dynamic content and advanced controls. SAPUI5 controls implement ARIA attributes.

**Screen Reader**: Assistive technology reading UI content aloud. SAPUI5 controls provide screen reader support.

**Keyboard Navigation**: Navigating and operating UI using keyboard only. SAPUI5 follows accessibility guidelines.

**High Contrast Theme**: Theme with increased contrast for visually impaired users. Suffix: _hc or _hcb.

**Right-to-Left (RTL) Text Directionality**: "Essential for enabling HTML in right-to-left scripts such as Arabic, Hebrew, Syriac, and Thaana." Enabled via configuration.

**Internationalization (i18n)**: Making applications work in multiple languages and regions. Uses resource bundles.

**Localization (l10n)**: Translating applications to specific languages. Uses i18n resource model.

**Resource Bundle**: Properties file containing translated texts. Format: key=value.

**Text Symbol**: Placeholder in resource bundle. Example: {i18n>title}.

---

## Routing & Navigation

**Router**: Component managing application URLs and navigation. Configured in manifest.json.

**Route**: URL pattern mapped to a specific view. Example: "product/{productId}".

**Route Pattern**: URL template with parameters. Example: "details/{orderId}".

**Navigation Parameter**: Data passed via URL. Example: productId in "product/123".

**Hash**: URL part after "#". Used for client-side routing. Example: #/products/123.

**Target**: Definition of which view to display for a route.

**Routing Configuration**: Section in manifest.json defining routes and targets.

---

## Theming & Styling

**Theme**: Visual design of controls including colors, fonts, spacing. Examples: sap_fiori_3, sap_horizon.

**Theme Parameter**: CSS variable controlling theme appearance. Example: @sapUiBaseColor.

**Custom Theme**: User-created theme based on SAP theme. Built with UI Theme Designer.

**Content Density Class**: CSS class controlling size of controls. Values: sapUiSizeCozy, sapUiSizeCompact.

**Semantic Colors**: Theme colors with meaning. Examples: sapUiCriticalText, sapUiPositiveElement.

**Custom CSS**: Application-specific styles. Should use theme parameters for consistency.

---

## Build & Deployment

**UI5 Tooling**: Official build and development tools for SAPUI5/OpenUI5. Command-line tool: ui5.

**UI5 CLI**: Command-line interface for UI5 Tooling. Installed via npm: npm install -g @ui5/cli.

**UI5 Server**: Local development server with live reload. Started via: ui5 serve.

**UI5 Build**: Production build process creating optimized resources. Executed via: ui5 build.

**Namespace**: Unique identifier for application resources. Example: com.mycompany.myapp.

**Application Descriptor**: manifest.json file describing application configuration.

**Component Configuration**: Settings in manifest.json controlling component behavior.

---

## Supporting Technologies

**jQuery**: "Fast, small, feature-rich JavaScript library" packaged with SAPUI5, simplifying DOM manipulation, events, animation, and Ajax. Version bundled with SAPUI5 may differ from latest.

**AMD (Asynchronous Module Definition)**: "Mechanism for defining modules so that modules and their dependencies can be loaded asynchronously." SAPUI5 uses sap.ui.define for AMD.

**DOM (Document Object Model)**: "Platform- and language-neutral interface allowing programs to dynamically access and update document content, structure and style."

**SVG (Scalable Vector Graphics)**: "Markup language for describing two-dimensional graphics applications and images" with related script interfaces. Used for icons and charts.

**XML**: Markup language used for XML views, fragments, and OData metadata.

**JSON**: JavaScript Object Notation used for JSON models, manifest files, and configuration.

---

## APF (Analysis Path Framework)

**Analysis Path Framework (APF)**: Framework for building analytical applications with configurable analysis paths.

**Analysis Path**: Sequence of analytical steps exploring data. Users build paths interactively.

**Analysis Step**: Individual view of data (chart or table) in an analysis path.

**Representation**: Visual display of step data (chart type or table).

**Configuration**: Definition of available steps, representations, filters, and navigation targets.

**Configuration Modeler**: Tool for creating and editing APF configurations without coding.

**Smart Filter Bar**: Filter control with value help and personalization in APF applications.

---

## SAPUI5-Specific Features

**SAPUI5 ABAP Repository**: Used for storing apps, components, and libraries; "based on the Business Server Page (BSP) repository of the ABAP server."

**Composite Control**: Intended for reuse within control development, allowing inclusion of existing controls in complex controls.

**Notepad Control**: Control defined on-the-fly "without a library definition or running generation steps." For prototyping only.

**Flexibility**: Framework enabling UI adaptation at runtime. Used for key user adaptation and personalization.

**Variant Management**: Saving and loading different UI configurations (filters, table columns, sort orders).

**Personalization**: User-specific UI customizations (column order, filter values).

**Adaptation**: Modifying applications without changing code. Types: key user adaptation, developer adaptation.

**Extension Point**: Predefined location where applications can be extended with custom content.

**Side Effects**: Allow applications to refresh entire controls or properties when source properties update. Example: recalculating discounts when quantity changes.

**Text Arrangement**: Annotation property controlling ID-type field display. Values: TextOnly, TextLast, TextFirst, TextSeparate.

**LineItem**: Annotation defining table columns visible during rendering in Fiori Elements apps.

**Value Help**: Dialog or dropdown showing possible values for input field. Uses annotations: @Common.ValueList.

**Quick View**: Popover showing additional information without navigation. Example: product details on hover.

---

## Additional Concepts

**Entity Set**: Collection of entities of same type in OData service. Example: Products, SalesOrders.

**Navigation Property**: OData property linking entities. Example: SalesOrder to SalesOrderItems.

**Service Metadata**: OData XML document describing service structure (entities, properties, associations).

**Function Import**: OData operation exposed by service. Can be functions (read-only) or actions (with side effects).

**Batch Request**: Single HTTP request containing multiple OData operations. Reduces network overhead.

**Deep Insert**: Creating entity with related entities in single request. Example: creating order with order items.

**Expand**: OData query option loading related entities. Example: /SalesOrders?$expand=Items.

**Filter**: OData query option filtering entities. Example: /Products?$filter=Price gt 100.

**Distribution Layer**: Contains control and theme libraries within SAPUI5 architecture.

**Service**: Backend code delivering functionalities like data retrieval or action execution, reusable by various client applications.

---

**Note**: This glossary is extracted from official SAP SAPUI5 documentation and should be used as a reference for understanding SAPUI5 terminology and concepts.
