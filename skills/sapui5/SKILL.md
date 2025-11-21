---
name: SAPUI5 Development
description: |
  This skill should be used when developing SAP UI5 applications, including creating freestyle apps, Fiori Elements apps, custom controls, testing, data binding, OData integration, routing, and troubleshooting. Use when building enterprise web applications with SAP UI5 framework, implementing MVC patterns, configuring manifest.json, creating XML views, writing controllers, setting up data models (JSON, OData v2/v4), implementing responsive UI with sap.m controls, building List Report or Object Page applications with Fiori Elements, writing unit tests with QUnit, integration tests with OPA5, setting up mock servers, handling security (XSS, CSP), optimizing performance, implementing accessibility features, or debugging UI5 applications.
license: MIT
metadata:
  version: 1.0.0
  last_updated: 2025-11-21
  framework_version: "1.120.0+"
  documentation_source: https://github.com/SAP-docs/sapui5
  status: production
---

# SAPUI5 Development Skill

Comprehensive skill for building enterprise applications with SAP UI5 framework.

---

## When to Use This Skill

Use this skill when working on tasks involving:

**Application Development**:
- Creating new SAPUI5 freestyle applications
- Building SAP Fiori Elements apps (List Report, Object Page, Analytical List Page, Overview Page)
- Setting up project structure and configuration
- Configuring manifest.json (application descriptor)
- Implementing MVC (Model-View-Controller) pattern
- Creating component-based architectures

**UI Development**:
- Creating XML views (recommended) or JavaScript/JSON/HTML views
- Writing controllers with lifecycle hooks
- Building responsive UIs with sap.m controls
- Implementing layouts (FlexBox, Grid, Dynamic Page, Object Page)
- Creating fragments for reusable UI snippets
- Implementing dialogs, popovers, and message handling

**Data Management**:
- Setting up data models (JSON, OData v2, OData v4, XML, Resource)
- Implementing data binding (property, aggregation, element, expression)
- Configuring OData services and annotations
- Working with filters, sorters, and grouping
- Handling CRUD operations with OData
- Implementing batch requests

**Testing & Quality**:
- Writing unit tests with QUnit
- Creating integration tests with OPA5
- Setting up mock servers for development
- Implementing code coverage
- Using Support Assistant for quality checks
- Debugging with UI5 Inspector

**Advanced Features**:
- Implementing routing and navigation
- Creating custom controls
- Extending standard applications
- Working with SAP Fiori Elements annotations
- Implementing draft handling
- Configuring Flexible Column Layout
- Building building blocks

**Security & Performance**:
- Implementing XSS prevention
- Configuring Content Security Policy (CSP)
- Optimizing performance (lazy loading, bundling, caching)
- Implementing accessibility (ARIA, keyboard navigation, screen readers)
- Securing applications (authentication, authorization)

**Troubleshooting**:
- Debugging runtime errors
- Fixing binding issues
- Resolving OData service errors
- Addressing performance problems
- Fixing build errors
- Implementing error handling

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

**Model**: Data layer (JSON, OData, XML, Resource models)
**View**: Presentation layer (XML, JavaScript, JSON, HTML)
**Controller**: Business logic layer

**Binding**: Automatically synchronizes model and view
- One-way: Model → View
- Two-way: Model ↔ View
- One-time: Loaded once

**Reference**: See `references/core-architecture.md` for detailed architecture concepts.

### 2. Component & Manifest

**Component.js**: Entry point, initializes router and models
**manifest.json**: Central configuration (models, routing, dependencies, data sources)

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
// In manifest.json
"": {
    "dataSource": "mainService",
    "settings": {
        "defaultBindingMode": "TwoWay",
        "useBatch": true
    }
}
```

**OData V4 Model** (modern):
```javascript
"": {
    "dataSource": "mainService",
    "settings": {
        "synchronizationMode": "None",
        "operationMode": "Server",
        "autoExpandSelect": true
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

**Reference**: See `references/data-binding-models.md` for comprehensive data binding guide.

### 4. Views & Controllers

**XML View** (recommended):
```xml
<mvc:View
    controllerName="my.app.controller.Main"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <Page title="{i18n>title}">
        <content>
            <List items="{/products}">
                <StandardListItem title="{name}" description="{price}"/>
            </List>
        </content>
    </Page>
</mvc:View>
```

**Controller**:
```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("my.app.controller.Main", {
        onInit: function() {
            // Initialization
        },

        onPress: function(oEvent) {
            // Event handler
        }
    });
});
```

### 5. Routing & Navigation

**Define routes in manifest.json**:
```json
"routing": {
    "config": {
        "routerClass": "sap.m.routing.Router",
        "type": "View",
        "viewType": "XML",
        "path": "my.app.view",
        "controlId": "app",
        "controlAggregation": "pages",
        "async": true
    },
    "routes": [
        {
            "pattern": "",
            "name": "main",
            "target": "main"
        },
        {
            "pattern": "detail/{objectId}",
            "name": "detail",
            "target": "detail"
        }
    ],
    "targets": {
        "main": {
            "viewName": "Main",
            "viewLevel": 1
        },
        "detail": {
            "viewName": "Detail",
            "viewLevel": 2
        }
    }
}
```

**Navigate programmatically**:
```javascript
this.getOwnerComponent().getRouter().navTo("detail", {
    objectId: sId
});
```

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
                },
                "ProductDetail": {
                    "type": "Component",
                    "name": "sap.fe.templates.ObjectPage",
                    "options": {
                        "settings": {
                            "contextPath": "/Products"
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
- `@UI.FieldGroup`: Grouped fields

**Reference**: See `references/fiori-elements.md` for comprehensive Fiori Elements guide.

---

## Testing

### Unit Tests (QUnit)

Test individual functions and modules:

```javascript
sap.ui.define([
    "my/app/model/formatter"
], function(formatter) {
    "use strict";

    QUnit.module("Formatter Tests");

    QUnit.test("Should format price correctly", function(assert) {
        var fPrice = 123.456;
        var sResult = formatter.formatPrice(fPrice);
        assert.strictEqual(sResult, "123.46 EUR", "Price formatted");
    });
});
```

### Integration Tests (OPA5)

Test user interactions and flows:

```javascript
sap.ui.define([
    "sap/ui/test/opaQunit"
], function(opaTest) {
    "use strict";

    QUnit.module("Navigation Journey");

    opaTest("Should navigate to detail page", function(Given, When, Then) {
        Given.iStartMyApp();
        When.onTheWorklistPage.iPressOnTheFirstListItem();
        Then.onTheObjectPage.iShouldSeeTheObjectPage();
        Then.iTeardownMyApp();
    });
});
```

### Mock Server

Simulate OData backend:

```javascript
sap.ui.define([
    "sap/ui/core/util/MockServer"
], function(MockServer) {
    "use strict";

    return {
        init: function() {
            var oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/sap/SERVICE_SRV/"
            });

            oMockServer.simulate("localService/metadata.xml", {
                sMockdataBaseUrl: "localService/mockdata"
            });

            oMockServer.start();
        }
    };
});
```

**Reference**: See `references/testing.md` for comprehensive testing guide.

---

## Best Practices

### 1. Always Use Async

```javascript
// Component.js
sap.ui.define([...], function(...) { ... });

// manifest.json
"async": true

// Bootstrap
data-sap-ui-async="true"
```

### 2. Use XML Views

XML views are declarative, easier to read, and support better tooling.

### 3. Proper Namespacing

```javascript
com.mycompany.myapp.controller.Main
```

### 4. Internationalization

Always use i18n for texts:
```xml
<Text text="{i18n>title}"/>
```

### 5. Data Binding Over Manual Updates

```xml
<!-- Good -->
<Text text="{/userName}"/>

<!-- Bad -->
this.byId("text").setText(oModel.getProperty("/userName"));
```

### 6. Security

- Use data binding (automatic XSS protection)
- Enable CSP in production
- Validate user input
- Use HTTPS
- Implement CSRF tokens

### 7. Performance

- Use component preload (automatic in build)
- Enable lazy loading for libraries
- Use OData batch requests
- Implement table virtualization
- Optimize bindings (use one-way when possible)

### 8. Accessibility

- Use semantic controls
- Provide labels for form fields
- Enable keyboard navigation
- Support screen readers
- Test with high contrast themes

---

## Common Patterns

### 1. CRUD Operations

**Create**:
```javascript
oModel.create("/Products", oData, {
    success: function() {
        MessageToast.show("Created");
    }
});
```

**Read**:
```javascript
oModel.read("/Products", {
    filters: [new Filter("Price", FilterOperator.GT, 100)],
    success: function(oData) {
        console.log(oData);
    }
});
```

**Update**:
```javascript
oModel.update("/Products(1)", {Price: 200}, {
    success: function() {
        MessageToast.show("Updated");
    }
});
```

**Delete**:
```javascript
oModel.remove("/Products(1)", {
    success: function() {
        MessageToast.show("Deleted");
    }
});
```

### 2. Filtering & Sorting

```javascript
var oBinding = this.byId("table").getBinding("items");

// Filter
var oFilter = new Filter("price", FilterOperator.GT, 100);
oBinding.filter([oFilter]);

// Sort
var oSorter = new Sorter("name", false); // false = ascending
oBinding.sort(oSorter);
```

### 3. Dialog Handling

```javascript
// Load fragment
if (!this.pDialog) {
    this.pDialog = this.loadFragment({
        name: "my.app.view.fragments.MyDialog"
    });
}

this.pDialog.then(function(oDialog) {
    oDialog.open();
});

// Close
onCloseDialog: function() {
    this.byId("myDialog").close();
}
```

### 4. Error Handling

```javascript
oModel.attachRequestFailed(function(oEvent) {
    var oResponse = oEvent.getParameter("response");
    MessageBox.error("Error: " + oResponse.statusText);
});
```

---

## Troubleshooting Common Issues

### Issue: Binding not working

**Check**:
1. Model set on view/component?
2. Correct binding path?
3. Data loaded?
4. Binding mode correct?

**Debug**:
```javascript
console.log(this.getView().getModel().getData());
console.log(this.getView().getBindingContext().getPath());
```

### Issue: OData call failing

**Check**:
1. Service URL correct in manifest.json?
2. CORS configured on backend?
3. Authentication working?
4. Metadata loaded?

**Debug**:
- Open browser Network tab
- Check request/response
- Verify OData service in browser

### Issue: View not displaying

**Check**:
1. View registered in manifest.json?
2. Routing configured correctly?
3. Controller name matches?
4. Syntax errors in XML?

**Debug**:
- Check browser console for errors
- Verify view path in manifest
- Use UI5 Inspector

### Issue: Performance problems

**Solutions**:
1. Enable component preload
2. Use growing lists for large datasets
3. Implement OData paging ($skip, $top)
4. Use one-way binding when possible
5. Minimize re-renders
6. Use batch requests

---

## Development Tools

### UI5 Tooling

Official build and development tools:

```bash
# Install
npm install -g @ui5/cli

# Serve
ui5 serve

# Build
ui5 build

# Test
npm test
```

### UI5 Inspector

Browser extension for debugging:
- View control tree
- Inspect properties
- View bindings
- Performance analysis

### Support Assistant

Built-in quality checker:
- Press `Ctrl+Alt+Shift+S`
- Checks for common issues
- Suggests improvements

---

## Version Compatibility

**Minimum UI5 Version**: 1.120.0
**Recommended**: Latest stable version
**TypeScript**: Supported (see official docs)

**Check compatibility**:
- Browser support: Modern browsers (Chrome, Firefox, Safari, Edge)
- OData: v2 and v4 supported
- Themes: sap_horizon (recommended), sap_fiori_3, sap_fiori_3_dark

---

## Official Documentation Links

**Essential Resources**:
- **Main Documentation**: https://github.com/SAP-docs/sapui5
- **Demo Kit**: https://sapui5.hana.ondemand.com/
- **API Reference**: https://sapui5.hana.ondemand.com/#/api
- **Samples**: https://sapui5.hana.ondemand.com/#/controls

**Documentation Sections**:
- **Read Me First**: https://github.com/SAP-docs/sapui5/tree/main/docs/02_Read-Me-First
- **Get Started**: https://github.com/SAP-docs/sapui5/tree/main/docs/03_Get-Started
- **Essentials**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials
- **Developing Apps**: https://github.com/SAP-docs/sapui5/tree/main/docs/05_Developing_Apps
- **Fiori Elements**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements
- **APF**: https://github.com/SAP-docs/sapui5/tree/main/docs/07_APF
- **Extending Apps**: https://github.com/SAP-docs/sapui5/tree/main/docs/08_Extending_SAPUI5_Applications
- **Developing Controls**: https://github.com/SAP-docs/sapui5/tree/main/docs/09_Developing_Controls
- **More About Controls**: https://github.com/SAP-docs/sapui5/tree/main/docs/10_More_About_Controls
- **Glossary**: https://github.com/SAP-docs/sapui5/blob/main/docs/glossary-9ef211e.md

**CDN**:
- SAP CDN: `https://sapui5.hana.ondemand.com/resources/sap-ui-core.js`
- OpenUI5 CDN: `https://openui5.hana.ondemand.com/resources/sap-ui-core.js`

---

## Bundled Reference Files

This skill includes detailed reference documentation:

1. **references/glossary.md**: Complete SAPUI5 terminology and concepts
2. **references/core-architecture.md**: Framework architecture, components, MVC, bootstrapping
3. **references/data-binding-models.md**: Data binding, models (JSON, OData v2/v4, Resource), filters, sorters
4. **references/testing.md**: QUnit, OPA5, mock server, test automation
5. **references/fiori-elements.md**: Fiori Elements templates, annotations, configuration

**Access these files** for detailed information on specific topics while keeping the main skill concise.

---

## Templates Included

Ready-to-use templates in `templates/` directory:

1. **basic-component.js**: Component.js template with best practices
2. **manifest.json**: Complete application descriptor template
3. **xml-view.xml**: XML view with common patterns (table, search, filters)
4. **controller.js**: Controller template with lifecycle hooks and event handlers
5. **formatter.js**: Common formatter functions (date, currency, status, etc.)

**Use templates** to quickly scaffold new components, views, and controllers.

---

## Important Notes

### Progressive Disclosure

This SKILL.md provides core concepts and quick references. For detailed information:
- Check bundled reference files in `references/` directory
- Consult official documentation links provided
- Use templates in `templates/` directory

### Keeping Skill Updated

When updating this skill:
1. Check official documentation for changes
2. Update framework version in metadata
3. Verify links still work
4. Test templates with latest UI5 version
5. Update reference files with new features

**Last Verified**: 2025-11-21
**Next Review**: 2025-02-21 (Quarterly)

---

## Instructions for Claude

When using this skill:

1. **Always use async patterns** - sap.ui.define, async:true in manifests
2. **Prefer XML views** - more declarative and tooling-friendly
3. **Use data binding** - automatic XSS protection and cleaner code
4. **Refer to reference files** - for detailed information on specific topics
5. **Use templates** - copy from templates/ and replace placeholders
6. **Follow best practices** - security, performance, accessibility
7. **Provide working examples** - always test code patterns before suggesting
8. **Link to official docs** - include relevant documentation links
9. **Consider version compatibility** - check minimum version requirements
10. **Test-driven development** - encourage QUnit and OPA5 tests

When creating SAPUI5 applications:
- Start with manifest.json configuration
- Set up Component.js with router initialization
- Create XML views with proper data binding
- Implement controllers with clear lifecycle management
- Add formatters for data display
- Implement error handling
- Write tests (unit and integration)
- Optimize for performance
- Ensure accessibility compliance
- Follow SAP Fiori design guidelines

For troubleshooting:
- Check browser console first
- Verify model data and bindings
- Use UI5 Inspector for debugging
- Check Network tab for OData issues
- Review manifest.json configuration
- Validate XML view syntax
- Test with Support Assistant

---

**License**: MIT
**Version**: 1.0.0
**Maintained by**: SAP Skills Maintainers
**Repository**: https://github.com/secondsky/sap-skills
