---
name: sapui5
description: |
  This skill should be used when developing SAP UI5 applications, including creating freestyle apps, Fiori Elements apps, custom controls, testing, data binding, OData integration, routing, and troubleshooting. Use when building enterprise web applications with SAP UI5 framework, implementing MVC patterns, configuring manifest.json, creating XML views, writing controllers, setting up data models (JSON, OData v2/v4), implementing responsive UI with sap.m controls, building List Report or Object Page applications with Fiori Elements, writing unit tests with QUnit, integration tests with OPA5, setting up mock servers, handling security (XSS, CSP), optimizing performance, implementing accessibility features, or debugging UI5 applications. Also use when working with sap.ui.mdc (Metadata-Driven Controls) including MDC Table, MDC FilterBar, MDC Value Help, control delegates, PropertyInfo, TypeMap, VariantManagement, or developing TypeScript control libraries with @ui5/ts-interface-generator.

  Keywords: sapui5, ui5, openui5, sap ui5, ui5 framework, sapui5 framework, ui5 application, sapui5 app, ui5 development, sapui5 development, ui5 tooling, ui5 cli, Component.js, manifest.json, xml view, data binding, odata v2, odata v4, fiori elements, sap.m controls, mvc pattern, routing, navigation, qunit, opa5, testing, mock server, sap.ui.mdc, mdc table, typescript, accessibility, security, performance, ui5 inspector, ui5 troubleshooting
license: GPL-3.0
metadata:
  version: 1.4.0
  last_verified: 2025-11-27
  framework_version: "1.120.0+"
  documentation_source: https://github.com/SAP-docs/sapui5
  documentation_files_analyzed: 1416
  reference_files: 11
  status: production
---

# SAPUI5 Development Skill

Comprehensive skill for building enterprise applications with SAP UI5 framework.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [SAP Fiori Elements](#sap-fiori-elements)
4. [Metadata-Driven Controls (MDC)](#metadata-driven-controls-mdc)
5. [Testing](#testing)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting-common-issues)
9. [Development Tools](#development-tools)
10. [Bundled Resources](#bundled-reference-files)

---

## Quick Start

### Creating a Basic SAPUI5 App

Use UI5 Tooling (recommended) or SAP Business Application Studio:

```bash
# Install UI5 CLI
npm install -g @ui5/cli

# Create new project
mkdir my-sapui5-app && cd my-sapui5-app
npm init -y

# Initialize UI5 project
ui5 init

# Add UI5 dependencies
npm install --save-dev @ui5/cli

# Start development server
ui5 serve
```

**Project Structure**:
```
my-sapui5-app/
├── webapp/
│   ├── Component.js
│   ├── manifest.json
│   ├── index.html
│   ├── controller/
│   │   └── Main.controller.js
│   ├── view/
│   │   └── Main.view.xml
│   ├── model/
│   │   └── formatter.js
│   ├── i18n/
│   │   └── i18n.properties
│   ├── css/
│   │   └── style.css
│   └── test/
│       ├── unit/
│       └── integration/
├── ui5.yaml
└── package.json
```

**Templates Available**:
- `templates/basic-component.js`: Component template
- `templates/manifest.json`: Application descriptor template
- `templates/xml-view.xml`: XML view with common patterns
- `templates/controller.js`: Controller with best practices
- `templates/formatter.js`: Common formatter functions

**Use templates** by copying to your project and replacing placeholders (`{{namespace}}`, `{{ControllerName}}`, etc.).

---

## Core Concepts

### 1. MVC Architecture

- **Model**: Data layer (JSON, OData, XML, Resource models)
- **View**: Presentation layer (XML, JavaScript, JSON, HTML)
- **Controller**: Business logic layer
- **Binding**: Synchronizes model and view (One-way, Two-way, One-time)

**Reference**: `references/core-architecture.md` for detailed architecture concepts.

### 2. Component & Manifest

- **Component.js**: Entry point, initializes router and models
- **manifest.json**: Central configuration (models, routing, dependencies, data sources)

**Key manifest sections**:
- `sap.app`: Application metadata and data sources
- `sap.ui`: UI technology and device types
- `sap.ui5`: UI5-specific configuration (models, routing, dependencies)

### 3. Data Models

**JSON Model** (client-side):
```javascript
var oModel = new JSONModel({
    products: [...]
});
this.getView().setModel(oModel);
```

**OData V2 Model** (server-side):
```javascript
"": {
    "dataSource": "mainService",
    "settings": {
        "defaultBindingMode": "TwoWay",
        "useBatch": true
    }
}
```

**Resource Model** (i18n):
```javascript
"i18n": {
    "type": "sap.ui.model.resource.ResourceModel",
    "settings": {
        "bundleName": "my.app.i18n.i18n"
    }
}
```

**Reference**: `references/data-binding-models.md` for comprehensive guide.

### 4. Views & Controllers

**XML View** (recommended):
```xml
<mvc:View
    controllerName="my.app.controller.Main"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <Page title="{i18n>title}">
        <List items="{/products}">
            <StandardListItem title="{name}" description="{price}"/>
        </List>
    </Page>
</mvc:View>
```

### 5. Routing & Navigation

**Navigate programmatically**:
```javascript
this.getOwnerComponent().getRouter().navTo("detail", {
    objectId: sId
});
```

**Reference**: `references/routing-navigation.md` for routing patterns.

---

## SAP Fiori Elements

Build applications without JavaScript UI code using OData annotations.

### Application Types

1. **List Report**: Searchable, filterable tables/charts
2. **Object Page**: Detailed view with sections and facets
3. **Analytical List Page**: Visual filters and analytics
4. **Overview Page**: Card-based dashboards
5. **Worklist**: Simplified list for tasks

### Quick Setup

**manifest.json for List Report + Object Page**:
```json
{
    "sap.ui5": {
        "dependencies": {
            "libs": {
                "sap.fe.templates": {}
            }
        },
        "routing": {
            "targets": {
                "ProductsList": {
                    "type": "Component",
                    "name": "sap.fe.templates.ListReport",
                    "options": {
                        "settings": {
                            "contextPath": "/Products",
                            "variantManagement": "Page"
                        }
                    }
                }
            }
        }
    }
}
```

**Key Annotations**:
- `@UI.LineItem`: Table columns
- `@UI.SelectionFields`: Filter bar fields
- `@UI.HeaderInfo`: Object page header
- `@UI.Facets`: Object page sections

**Reference**: `references/fiori-elements.md` for comprehensive guide.

---

## Metadata-Driven Controls (MDC)

The sap.ui.mdc library provides metadata-driven controls for building dynamic UIs at runtime.

### Key Controls

- **MDC Table**: Data display with dynamic columns based on metadata
- **MDC FilterBar**: Complex filter conditions with PropertyInfo
- **MDC Value Help**: Assisted data input with suggestions

### Quick Example

```xml
<mdc:Table
    id="mdcTable"
    delegate='{name: "my/app/delegate/TableDelegate", payload: {}}'
    p13nMode="Sort,Filter,Column"
    type="ResponsiveTable">
    <mdc:columns>
        <mdcTable:Column propertyKey="name" header="Name">
            <Text text="{name}"/>
        </mdcTable:Column>
    </mdc:columns>
</mdc:Table>
```

**Reference**: `references/mdc-typescript-advanced.md` for comprehensive MDC guide with TypeScript.

---

## Testing

### Unit Tests (QUnit)

Test individual functions and modules:
```javascript
QUnit.module("Formatter Tests");
QUnit.test("Should format price correctly", function(assert) {
    var fPrice = 123.456;
    var sResult = formatter.formatPrice(fPrice);
    assert.strictEqual(sResult, "123.46 EUR", "Price formatted");
});
```

### Integration Tests (OPA5)

Test user interactions and flows:
```javascript
opaTest("Should navigate to detail page", function(Given, When, Then) {
    Given.iStartMyApp();
    When.onTheWorklistPage.iPressOnTheFirstListItem();
    Then.onTheObjectPage.iShouldSeeTheObjectPage();
    Then.iTeardownMyApp();
});
```

### Mock Server

Simulate OData backend:
```javascript
var oMockServer = new MockServer({
    rootUri: "/sap/opu/odata/sap/SERVICE_SRV/"
});
oMockServer.simulate("localService/metadata.xml", {
    sMockdataBaseUrl: "localService/mockdata"
});
oMockServer.start();
```

**Reference**: `references/testing.md` for comprehensive testing guide.

---

## Best Practices

1. **Always Use Async** - sap.ui.define, async:true in manifests
2. **Use XML Views** - declarative and tooling-friendly
3. **Proper Namespacing** - com.mycompany.myapp.controller.Main
4. **Internationalization** - always use i18n for texts
5. **Data Binding Over Manual Updates** - automatic XSS protection
6. **Security** - enable CSP, validate input, use HTTPS
7. **Performance** - component preload, lazy loading, batch requests
8. **Accessibility** - semantic controls, labels, keyboard navigation

---

## Common Patterns

### CRUD Operations

```javascript
// Create
oModel.create("/Products", oData, {success: function() {MessageToast.show("Created");}});

// Read
oModel.read("/Products", {filters: [new Filter("Price", FilterOperator.GT, 100)]});

// Update
oModel.update("/Products(1)", {Price: 200}, {success: function() {MessageToast.show("Updated");}});

// Delete
oModel.remove("/Products(1)", {success: function() {MessageToast.show("Deleted");}});
```

### Filtering & Sorting

```javascript
var oBinding = this.byId("table").getBinding("items");
oBinding.filter([new Filter("price", FilterOperator.GT, 100)]);
oBinding.sort([new Sorter("name", false)]);
```

### Dialog Handling

```javascript
if (!this.pDialog) {
    this.pDialog = this.loadFragment({
        name: "my.app.view.fragments.MyDialog"
    });
}
this.pDialog.then(function(oDialog) {oDialog.open();});
```

---

## Troubleshooting Common Issues

### Binding not working
1. Check model set on view/component
2. Verify correct binding path
3. Confirm data loaded
4. Debug: `console.log(this.getView().getModel().getData())`

### OData call failing
1. Verify service URL in manifest.json
2. Check CORS configuration
3. Test authentication
4. Use browser Network tab

### View not displaying
1. Check view registration in manifest.json
2. Verify routing configuration
3. Match controller name
4. Check browser console for errors

### Performance problems
1. Enable component preload
2. Use growing lists for large datasets
3. Implement OData paging
4. Use one-way binding when possible

---

## Development Tools

### UI5 Tooling
```bash
ui5 serve    # Development server
ui5 build    # Build for production
npm test     # Run tests
```

### UI5 Inspector
- Browser extension for debugging
- View control tree and bindings
- Performance analysis

### Support Assistant
- Press `Ctrl+Alt+Shift+S`
- Built-in quality checker

---

## Bundled Reference Files

This skill includes comprehensive reference documentation (11 files):

1. **references/glossary.md**: Complete SAPUI5 terminology and concepts (100+ terms)
2. **references/core-architecture.md**: Framework architecture, components, MVC, bootstrapping
3. **references/data-binding-models.md**: Data binding, models, filters, sorters
4. **references/testing.md**: QUnit, OPA5, mock server, test automation
5. **references/fiori-elements.md**: Fiori Elements templates, annotations, configuration
6. **references/typescript-support.md**: TypeScript setup, configuration, migration
7. **references/routing-navigation.md**: Routing, navigation, Flexible Column Layout
8. **references/performance-optimization.md**: Performance best practices, optimization
9. **references/accessibility.md**: WCAG 2.1 compliance, screen readers, ARIA
10. **references/security.md**: XSS prevention, CSP, authentication, CSRF
11. **references/mdc-typescript-advanced.md**: MDC controls, TypeScript control libraries

**Access these files** for detailed information on specific topics while keeping the main skill concise.

---

## Templates Included

Ready-to-use templates in `templates/` directory:

1. **basic-component.js**: Component.js template with best practices
2. **manifest.json**: Complete application descriptor template
3. **xml-view.xml**: XML view with common patterns
4. **controller.js**: Controller template with lifecycle hooks
5. **formatter.js**: Common formatter functions

---

## Instructions for Claude

When using this skill:

1. **Always use async patterns** - sap.ui.define, async:true
2. **Prefer XML views** - more declarative and tooling-friendly
3. **Use data binding** - automatic XSS protection
4. **Refer to reference files** - for detailed information
5. **Use templates** - copy from templates/ and replace placeholders
6. **Follow best practices** - security, performance, accessibility
7. **Provide working examples** - test code patterns before suggesting

---

**License**: GPL-3.0
**Version**: 1.4.0
**Last Verified**: 2025-11-27
**Next Review**: 2026-02-27 (Quarterly)
