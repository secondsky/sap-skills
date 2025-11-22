# Adaptation Projects Reference

Comprehensive reference for creating and managing SAP Fiori adaptation projects.

## Table of Contents

1. [Overview](#overview)
2. [On-Premise Systems](#on-premise-systems)
3. [S/4HANA Cloud and BTP ABAP](#s4hana-cloud-and-btp-abap)
4. [Creating Adaptation Projects](#creating-adaptation-projects)
5. [Adaptation Capabilities](#adaptation-capabilities)
6. [Controller Extensions](#controller-extensions)
7. [Fragments and Extension Points](#fragments-and-extension-points)
8. [Preview and Testing](#preview-and-testing)
9. [Deployment](#deployment)
10. [Upgrade-Safe Rules](#upgrade-safe-rules)

---

## Overview

Adaptation projects allow extending existing SAP Fiori applications without modifying source code. They create **application variants** that maintain separation from the original application.

### Benefits

- Non-invasive extensions
- Independent lifecycle from base application
- Upgrade-safe modifications
- Version control support

### Supported Environments

| Environment | IDE Support | Deployment Target |
|-------------|-------------|-------------------|
| On-Premise ABAP | VS Code | ABAP Repository |
| SAP S/4HANA Cloud | BAS | BTP ABAP Environment |
| SAP BTP ABAP | BAS, VS Code | BTP ABAP Environment |

---

## On-Premise Systems

### Prerequisites

| Requirement | Version/Details |
|-------------|-----------------|
| SAP_UI Component | 7.54 or higher |
| System SAPUI5 Version | 1.72 or higher |
| Base App SAPUI5 Version | 1.30 or higher |
| Base App | Must have manifest.json |

### Limitations

- Cannot use ABAP Cloud Development packages
- Apps with mandatory startup parameters unsupported
- Previously deployed application variants cannot serve as bases
- Apps using `sap.ca.scfld.md` scaffolding unsupported

### Required Services

Enable and activate:
- `/sap/bc/adt` - ABAP Development Tools
- `/sap/bc/ui2/app_index/` - Application Index

Grant access to:
- `/sap/bc/adt/discovery`

### Workflow

1. Create adaptation project
2. (Optional) Initialize Git repository
3. Make adaptations
4. Preview adaptation project
5. Deploy to ABAP repository

---

## S/4HANA Cloud and BTP ABAP

### Prerequisites

**SAP S/4HANA Cloud**:
- Verify extensibility support in SAP Fiori Apps Reference Library
- 3-system landscape with developer tenant required
- Submit enhancement requests via Influence Opportunity Homepage if needed

**Both Environments**:
- Source application must be "released for extensibility"
- Destination to development tenant configured
- Required business catalogs assigned

### Required Business Catalogs

| Catalog | Purpose |
|---------|---------|
| SAP_A4C_BC_DEV_UID_PC | Development - UI Deployment |
| SAP_A4C_BC_DEV_OBJ_DIS_PC | Retrieve extensible applications |

### Destination Configuration

Create destination in BTP Cockpit pointing to development tenant with appropriate authentication.

---

## Creating Adaptation Projects

### Via Template Wizard

1. Open Command Palette: `Cmd/Ctrl + Shift + P`
2. Execute: `Fiori: Open Template Wizard`
3. Select "Adaptation Project" tile
4. Configure project settings

### Configuration Fields

| Field | Description |
|-------|-------------|
| Project Name | Unique project identifier |
| Application Title | Display title |
| Namespace | Prefixed with `customer.` |
| SAPUI5 Version | Target UI5 version |
| Target System | SAP system connection |
| Application | Base application to extend |

### Via Generator Command

```
Fiori: Open Adaptation Project Generator
```

### Add Deployment Configuration

Optional during creation or added later via:
```
Fiori: Add Deployment Configuration
```

---

## Adaptation Capabilities

### UI Adaptations

| Adaptation | Description |
|------------|-------------|
| Control Variants | Create page variants/views |
| Hide/Show Controls | Toggle control visibility |
| Move Controls | Reposition UI elements |
| Rename Labels | Change display texts |
| Change Properties | Modify control properties |

### Structural Changes

| Change | Description |
|--------|-------------|
| Add Fragments | Insert UI fragments at extension points |
| Controller Extensions | Override/extend controller methods |
| Component Usages | Add SAPUI5 component references |

### Configuration Changes

| Change | Description |
|--------|-------------|
| App Descriptor | Modify manifest.json settings |
| OData Service | Add/replace OData services |
| Local Annotations | Add annotation files |
| Inbound Navigation | Modify navigation configuration |

### Adaptation Editor UI Operations

Access: Right-click `manifest.appdescr_variant` > "Open Adaptation Editor"

| Operation | Method |
|-----------|--------|
| Modify properties | Select element, adjust in Properties pane |
| Add fields | Right-click group > "Add Field" > select fields |
| Create groups | Right-click > "Add Group" |
| Add sections | Right-click sections > "Add Section" |
| Rename elements | Double-click or right-click > rename |
| Reorder elements | Drag and drop |
| Move elements | Cut, highlight target, paste |
| Combine fields | Ctrl+click multiple (max 3) > "Combine" |
| Split fields | Right-click combined > "Split" |
| Remove elements | Right-click > remove or Delete key |

**Note**: Removed fields remain available for re-adding. Mandatory fields require confirmation.

### Quick Actions Availability Matrix

Quick actions vary by SAPUI5 version. Key milestones:

| Action | Min Version | OData |
|--------|-------------|-------|
| Add Controller to Page | 1.71 | V2, V4 |
| Add Header Field | 1.71 | V2, V4 |
| Add Custom Section | 1.71 | V2, V4 |
| Enable/Disable Clear Button | 1.71 | V2, V4 |
| Add Custom Table Action | 1.96 | V2, V4 |
| Add Custom Table Column | 1.96 | V2, V4 |
| Change Table Columns | 1.96 | V2, V4 |
| Enable Variant Management | 1.96 | V2, V4 |
| Add Custom Page Action | 1.120 | V2, V4 |
| Add Local Annotation File | 1.133 | V2, V4 |
| Add Subpage (V4) | 1.135 | V4 only |

---

## Controller Extensions

### Purpose

Enhance existing controller functionality with:
- New methods
- Override methods
- Lifecycle hooks

### File Structure

```
webapp/
├── changes/
│   ├── coding/
│   │   └── MyExtension.js
│   └── MyExtension.controllerExtension.change
```

### Extension Template

```javascript
sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension"
], function(ControllerExtension) {
    "use strict";

    return ControllerExtension.extend("customer.project.extension.MyExtension", {
        // Override member for lifecycle and base methods
        override: {
            // Lifecycle methods
            onInit: function() {
                // Called after base controller onInit
            },
            onBeforeRendering: function() {
                // Called before view rendering
            },
            onAfterRendering: function() {
                // Called after view rendering
            },
            onExit: function() {
                // Called on controller destruction
            }
        },

        // Custom methods (outside override)
        myCustomMethod: function(oEvent) {
            // Custom business logic
        }
    });
});
```

### Event Handler Binding

For methods in XML fragments, use prefix:
```
.extension.<controller extension namespace>
```

Example:
```xml
<Button press=".extension.customer.project.extension.MyExtension.myCustomMethod"/>
```

### Provided Methods by Template

| Application Type | Provided Methods |
|-----------------|------------------|
| List Report | Lifecycle + template overrides |
| Object Page | Lifecycle + template overrides |
| Overview Page | Lifecycle + template overrides |
| Analytical List Page | Lifecycle only |

### Important Rules

- Keep custom code in `changes/coding/` folder
- Do not create additional folders at higher levels
- Namespace extensions with `.extension` to avoid conflicts

---

## Fragments and Extension Points

### Adding Fragments to Aggregations

1. Open Adaptation Editor
2. Click Edit mode
3. Select target control (smart filter bar, toolbar, etc.)
4. Choose "Add Fragment" from context menu
5. Configure fragment settings

**Quick Actions**:
- Add Custom Page Action
- Add Custom Table Action
- Add Custom Table Column
- Add Header Field
- Add Custom Section

### Fragment Configuration

| Field | Description |
|-------|-------------|
| Target Aggregation | Container for fragment |
| Index | Position within aggregation |
| Fragment | Select existing or create new |

### Fragment Template

```xml
<core:FragmentDefinition
    xmlns:core="sap.ui.core"
    xmlns:uxap="sap.uxap"
    xmlns="sap.m">
    <uxap:ObjectPageSection id="customer.project.customSection" title="Custom Section">
        <uxap:subSections>
            <uxap:ObjectPageSubSection>
                <Text text="Custom content"/>
            </uxap:ObjectPageSubSection>
        </uxap:subSections>
    </uxap:ObjectPageSection>
</core:FragmentDefinition>
```

### Requirements

- Define namespace for all controls used
- Use stable and unique IDs
- IDs should follow pattern: `customer.<project>.<elementId>`

### Adding Fragments to Extension Points

For freestyle SAPUI5 applications with predefined extension points:

1. Expand outline tree to find extension points
2. Right-click parent element
3. Select "Add fragment at extension point"
4. Configure fragment

### Generated Files

- Fragment: `webapp/changes/fragments/<name>.fragment.xml`
- Change: `webapp/changes/addXML.change`

### Cleanup

Delete associated change files when removing fragments to avoid blocking future additions.

---

## Preview and Testing

### Launch Preview

```
Fiori: Preview Adaptation Project
```

Or via Application Info page.

### Preview Characteristics

- Runs in sandbox-like environment
- Outside SAP Fiori launchpad context
- Some FLP-dependent features may not work
- Features work correctly after deployment

### Testing Adaptations

1. Make changes in Adaptation Editor
2. Preview immediately reflects changes
3. Test functionality in preview
4. Deploy only when satisfied

---

## Deployment

### On-Premise Deployment

Deploy to ABAP repository using standard deployment:

```bash
npm run deploy
```

### S/4HANA Cloud Deployment

Use Adaptation Project Deployment Wizard:
```
Fiori: Deploy Adaptation Project
```

### Post-Deployment

- Application variant appears in Fiori launchpad
- Independent tile/navigation configuration possible
- Base application updates do not affect deployed variant

---

## Upgrade-Safe Rules

### Core Principles

SAPUI5 Flexibility uses modification-free extensibility:
- Extension code separated from base application lifecycle
- Base application can upgrade independently
- Extensions remain functional across upgrades

### Controller Extension Rules

1. **Follow SAPUI5 best practices**
2. **Access only controls with stable IDs**
   - Never rely on control order in aggregations
   - Never rely on parent-child relationships
3. **Verify control existence before access**
   - Check if control exists
   - Verify control type
4. **Avoid private/protected methods**
   - Do not call or override private methods
   - Do not use deprecated artifacts
5. **No hardcoded property values**
   - OData metadata values change during upgrades
   - Do not use value help entity sets in code
6. **Handle reuse component changes**
   - Implement robust error handling
   - Components may change during upgrades

### Fragment Rules

- Use stable IDs with proper namespacing
- Do not reference controls by position
- Handle missing extension points gracefully

---

## Checking Compatibility

### Base App Upgrade Check

```
Fiori: Check Base App Upgrades
```

Verifies if adaptation project is current with base application updates.

### Release State Consistency

```
Fiori: Check Consistency of Release State
```

Validates that adaptations align with released application state.

---

## Documentation Source

**GitHub**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs

Key files:
- `extending-an-existing-application-6e25aca.md`
- `extending-an-sap-fiori-application-for-an-on-premise-system-802f01c.md`
- `extending-an-sap-fiori-application-for-sap-s-4hana-cloud-public-edition-and-sap-btp-abap-f4881a9.md`
- `creating-an-adaptation-project-072f566.md`
- `controller-extensions-ad7b4ae.md`
- `add-fragments-to-an-aggregation-or-extension-point-6033d56.md`
- `upgrade-safe-compatibility-rules-53706e2.md`
- `making-adaptations-2a076dd.md`
- `previewing-an-adaptation-project-64cc15b.md`
- `deploying-an-adaptation-project-to-the-abap-repository-febf0d9.md`
