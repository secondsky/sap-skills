# SAPUI5 Core Architecture & Concepts

**Source**: Official SAP SAPUI5 Documentation
**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials
**Last Updated**: 2025-11-21

---

## Framework Architecture

### Component-Based Architecture

SAPUI5 applications are built around **Components** - self-contained, reusable units with:
- **manifest.json**: Application descriptor with metadata and configuration
- **Component.js**: Component controller with initialization logic
- **View/Controller pairs**: UI definition and business logic
- **i18n**: Internationalization resources
- **model**: Optional local data models

**Key Benefits**:
- Reusability across applications
- Clear separation of concerns
- Standardized configuration via manifest
- Dependency management
- Lifecycle management

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: component)

---

### Model-View-Controller (MVC) Pattern

SAPUI5 implements MVC for clean separation:

**Model** (Data Layer):
- Provides data to UI
- Notifies views of changes
- Types: JSON, OData v2/v4, XML, Resource
- Supports binding for automatic UI updates

**View** (Presentation Layer):
- Defines UI structure
- Available types: XML (recommended), JSON, JavaScript, HTML
- Contains controls and layout
- No business logic

**Controller** (Logic Layer):
- Event handlers for user interactions
- Business logic
- Data formatting
- Navigation
- Lifecycle hooks: onInit, onBeforeRendering, onAfterRendering, onExit

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: mvc, controller, view)

---

### Module System

SAPUI5 uses AMD (Asynchronous Module Definition):

**Module Definition**:
```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("my.namespace.controller.Main", {
        onPress: function() {
            MessageToast.show("Button pressed");
        }
    });
});
```

**Module Loading**:
```javascript
sap.ui.require([
    "sap/m/MessageBox"
], function(MessageBox) {
    MessageBox.success("Loaded asynchronously");
});
```

**Key Points**:
- **sap.ui.define**: For defining modules (always use this)
- **sap.ui.require**: For loading modules dynamically
- Async loading prevents blocking
- Dependencies declared explicitly
- Supports lazy loading

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: module, define, require)

---

### Bootstrapping

Initialize SAPUI5 in index.html:

**Basic Bootstrap**:
```html
<script
    id="sap-ui-bootstrap"
    src="resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-libs="sap.m"
    data-sap-ui-resourceroots='{
        "my.namespace": "./"
    }'
    data-sap-ui-async="true"
    data-sap-ui-onInit="module:my/namespace/index"
    data-sap-ui-compatVersion="edge">
</script>
```

**Key Configuration Options**:
- `data-sap-ui-theme`: UI theme (sap_horizon, sap_fiori_3, etc.)
- `data-sap-ui-libs`: Preloaded libraries
- `data-sap-ui-resourceroots`: Namespace-to-path mapping
- `data-sap-ui-async="true"`: Async loading (always use)
- `data-sap-ui-compatVersion="edge"`: Latest features
- `data-sap-ui-onInit`: Module to run after initialization

**CDN Options**:
- SAP CDN: `https://sapui5.hana.ondemand.com/resources/sap-ui-core.js`
- OpenUI5 CDN: `https://openui5.hana.ondemand.com/resources/sap-ui-core.js`
- Specific version: `https://sapui5.hana.ondemand.com/1.120.0/resources/sap-ui-core.js`

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: bootstrap, initialization)

---

### Libraries

SAPUI5 provides multiple control libraries:

**Main Libraries**:
- **sap.m**: Mobile/responsive controls (Button, Table, List, etc.)
- **sap.ui.core**: Core framework (mvc, routing, etc.)
- **sap.ui.table**: High-performance tables
- **sap.f**: SAP Fiori controls (FlexibleColumnLayout, etc.)
- **sap.uxap**: UX Add-on (ObjectPageLayout, etc.)
- **sap.ui.layout**: Layout controls (Grid, Splitter, etc.)
- **sap.tnt**: Tool Navigation Template (SideNavigation, etc.)
- **sap.suite.ui.commons**: Suite controls (charts, micro-charts)

**Library Loading**:
```javascript
// In manifest.json
{
    "sap.ui5": {
        "dependencies": {
            "libs": {
                "sap.m": {},
                "sap.ui.table": {},
                "sap.f": {}
            }
        }
    }
}
```

**Lazy Loading**:
```javascript
sap.ui.getCore().loadLibrary("sap.ui.table", { async: true })
    .then(function() {
        // Library loaded
    });
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/02_Read-Me-First (search: library, supported-library-combinations)

---

### Namespacing

Proper namespacing prevents conflicts:

**Structure**:
```
com.mycompany.myapp/
├── Component.js
├── manifest.json
├── controller/
│   └── Main.controller.js
├── view/
│   └── Main.view.xml
├── model/
│   └── formatter.js
└── i18n/
    └── i18n.properties
```

**Naming Conventions**:
- Reverse domain: `com.mycompany.myapp`
- PascalCase for classes: `Main.controller.js`
- camelCase for files: `formatter.js`
- Folder names: lowercase (controller, view, model)

**Resource Root Registration**:
```javascript
// In index.html
data-sap-ui-resourceroots='{
    "com.mycompany.myapp": "./"
}'
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/05_Developing_Apps (search: folder-structure, namespace)

---

### Control Tree & Rendering

SAPUI5 builds a tree of controls:

**Control Hierarchy**:
- **Root Element**: `<body>` or specific `<div>`
- **Component Container**: Hosts component
- **View**: Contains controls
- **Controls**: UI elements (Button, Input, Table, etc.)
- **Aggregations**: Child controls (items, content, etc.)

**Rendering Process**:
1. **Initial Rendering**: Creates HTML from control tree
2. **Re-rendering**: Updates DOM when model/property changes
3. **Invalidation**: Marks controls for re-rendering
4. **Batching**: Groups re-renders for performance

**Lifecycle Hooks**:
- `onBeforeRendering()`: Before DOM update
- `onAfterRendering()`: After DOM update (DOM manipulation here)

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: rendering, control-tree)

---

### Fragments

Reusable UI snippets without controller:

**XML Fragment** (recommended):
```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core">
    <Dialog
        title="{i18n>dialogTitle}"
        type="Message">
        <Text text="{i18n>dialogText}"/>
        <buttons>
            <Button text="{i18n>close}" press=".onCloseDialog"/>
        </buttons>
    </Dialog>
</core:FragmentDefinition>
```

**Loading Fragments**:
```javascript
// In controller
onOpenDialog: function() {
    if (!this.pDialog) {
        this.pDialog = this.loadFragment({
            name: "my.namespace.view.fragments.MyDialog"
        });
    }
    this.pDialog.then(function(oDialog) {
        oDialog.open();
    });
}
```

**Benefits**:
- Reuse across views
- Smaller view files
- Modular UI definition
- No separate controller

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: fragment)

---

### Application Descriptor (manifest.json)

Central configuration file:

**Structure**:
```json
{
    "sap.app": {
        "id": "com.mycompany.myapp",
        "type": "application",
        "title": "{{appTitle}}",
        "description": "{{appDescription}}",
        "applicationVersion": {
            "version": "1.0.0"
        },
        "dataSources": {
            "mainService": {
                "uri": "/sap/opu/odata/sap/SERVICE_SRV/",
                "type": "OData",
                "settings": {
                    "odataVersion": "2.0"
                }
            }
        }
    },
    "sap.ui": {
        "technology": "UI5",
        "deviceTypes": {
            "desktop": true,
            "tablet": true,
            "phone": true
        }
    },
    "sap.ui5": {
        "rootView": {
            "viewName": "com.mycompany.myapp.view.App",
            "type": "XML",
            "async": true,
            "id": "app"
        },
        "dependencies": {
            "minUI5Version": "1.120.0",
            "libs": {
                "sap.m": {},
                "sap.ui.core": {}
            }
        },
        "models": {
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "settings": {
                    "bundleName": "com.mycompany.myapp.i18n.i18n"
                }
            },
            "": {
                "dataSource": "mainService",
                "settings": {
                    "defaultBindingMode": "TwoWay"
                }
            }
        },
        "routing": {
            "config": {
                "routerClass": "sap.m.routing.Router",
                "type": "View",
                "viewType": "XML",
                "path": "com.mycompany.myapp.view",
                "controlId": "app",
                "controlAggregation": "pages",
                "async": true
            },
            "routes": [],
            "targets": {}
        }
    }
}
```

**Key Sections**:
- **sap.app**: General app info and data sources
- **sap.ui**: UI technology and device types
- **sap.ui5**: UI5-specific config (models, routing, dependencies)

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: manifest, descriptor)

---

## Core Concepts

### Properties, Events, Aggregations

**Properties**:
- Simple values (text, enabled, visible)
- Accessed via getters/setters
- Support data binding
- Example: `oButton.setText("Click me")`

**Events**:
- User interactions or state changes
- Attach handlers with `.attachEvent()` or in XML
- Event object contains source and parameters
- Example: `press`, `change`, `selectionChange`

**Aggregations**:
- Child controls (items, content, buttons)
- One-to-many relationships
- Managed by parent control
- Example: Table has `items`, Page has `content`

**Associations**:
- References to other controls
- Not parent-child relationship
- Example: Label's `labelFor` association

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: property, event, aggregation)

---

### Device Adaptation

Responsive design features:

**Content Density**:
- **Cozy**: Touch-friendly (larger targets) - default on phones
- **Compact**: Mouse-friendly (smaller) - default on desktops
- Set via CSS class: `sapUiSizeCozy` or `sapUiSizeCompact`

**Device Detection**:
```javascript
sap.ui.Device.system.phone
sap.ui.Device.system.tablet
sap.ui.Device.system.desktop
```

**Responsive Controls**:
- Use `sap.m` controls (designed for responsive)
- FlexBox for flexible layouts
- Grid for responsive grids
- Avoid fixed pixel sizes

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: device, responsive, content-density)

---

### Theming

Visual design system:

**Available Themes**:
- **sap_horizon**: Latest SAP theme (recommended)
- **sap_fiori_3**: SAP Fiori 3.0 theme
- **sap_fiori_3_dark**: Dark variant
- **sap_fiori_3_hcb**: High contrast black
- **sap_fiori_3_hcw**: High contrast white

**Setting Theme**:
```html
<!-- In index.html -->
data-sap-ui-theme="sap_horizon"
```

```javascript
// Dynamically
sap.ui.getCore().applyTheme("sap_horizon");
```

**Theme Parameters**:
- Use in custom CSS for consistency
- Example: `@sapUiBaseColor`, `@sapUiBaseBG`
- Access via: `Parameters.get("sapUiBaseColor")`

**Custom Themes**:
- Use UI Theme Designer
- Based on SAP theme
- Only override needed parameters

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/02_Read-Me-First (search: theme, supported-combinations)

---

## Performance Optimization

**Best Practices**:

1. **Async Loading**:
   - Always use `data-sap-ui-async="true"`
   - Use `sap.ui.define` for modules
   - Lazy load libraries when needed

2. **Component Preload**:
   - Build creates Component-preload.js
   - Bundles all component resources
   - Reduces HTTP requests

3. **Data Binding**:
   - Use one-way binding when possible
   - Avoid complex formatters in loops
   - Use `bindingMode: "OneTime"` for static data

4. **List/Table Optimization**:
   - Use growing lists for large datasets
   - Enable table virtualization
   - Use OData paging ($skip, $top)

5. **Model Management**:
   - Use batch requests for OData
   - Set size limits appropriately
   - Destroy models when not needed

6. **Rendering**:
   - Avoid frequent re-renders
   - Use `busy` state during loading
   - Minimize DOM manipulations

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/05_Developing_Apps (search: performance)

---

## Security

**Key Security Features**:

1. **XSS Prevention**:
   - Automatic output encoding
   - Use data binding (never innerHTML)
   - Sanitize user input

2. **Content Security Policy (CSP)**:
   - SAPUI5 supports CSP
   - Avoid inline scripts
   - Use nonce or hash for inline styles

3. **Clickjacking Prevention**:
   - Frame-options header
   - CSP frame-ancestors directive

4. **Input Validation**:
   - Use data types
   - Validate on client and server
   - Use constraints (maxLength, pattern)

5. **Secure Communication**:
   - Always use HTTPS in production
   - Enable CORS properly
   - Use CSRF tokens

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/05_Developing_Apps (search: security, secure-programming)

---

## Links to Official Documentation

- **Core Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials
- **App Development**: https://github.com/SAP-docs/sapui5/tree/main/docs/05_Developing_Apps
- **Getting Started**: https://github.com/SAP-docs/sapui5/tree/main/docs/03_Get-Started
- **Read Me First**: https://github.com/SAP-docs/sapui5/tree/main/docs/02_Read-Me-First
- **API Reference**: https://sapui5.hana.ondemand.com/#/api
- **Demo Kit**: https://sapui5.hana.ondemand.com/

---

**Note**: This document provides core architecture concepts for SAPUI5 development. For specific implementation details, refer to the official documentation links provided throughout this document.
