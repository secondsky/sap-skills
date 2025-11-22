# UI Integration Cards Development Guide

Complete guide for developing UI Integration Cards in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/20-UIIntegrationCards

---

## Overview

UI Integration Cards are design patterns that display concise information in limited-space containers. They follow SAPUI5 specifications (version 1.87.0+).

## Prerequisites

- SAP Business Application Studio subscription
- Dev space with "Development Tools for SAP Build Work Zone, Advanced Edition" extension
- Destination to content repository configured (for direct deployment)
- Workzone_Admin role collection

---

## Creating a UI Card

### Step 1: Open SAP Business Application Studio

Access your dev space with the Work Zone extension enabled.

### Step 2: Create New Project

1. Select "New Project From Template"
2. Choose "UI Integration Card"
3. Click Next

**Alternative**: Use command line via View → Find Command → "UI Integration Card: Create Card Project"

### Step 3: Configure Project

| Field | Description |
|-------|-------------|
| Project Name | Your identifier |
| Card Sample | Select from available templates |
| Namespace | Used for Card ID (namespace.projectname) |
| Card Title | Display title |
| Card Subtitle | Display subtitle |
| Mobile Compatibility | Enable for mobile app support |

### Step 4: Develop Card

Edit the card manifest and source files in the project structure.

---

## Card Types

| Type | Use Case |
|------|----------|
| List Card | Display list of items |
| Object Card | Display single object details |
| Table Card | Tabular data display |
| Timeline Card | Chronological events |
| Analytical Card | Charts and analytics |
| Calendar Card | Calendar events |
| Component Card | Custom SAPUI5 components |

---

## Card Manifest Structure

```json
{
  "_version": "1.52.0",
  "sap.app": {
    "id": "namespace.cardname",
    "type": "card",
    "title": "Card Title",
    "applicationVersion": { "version": "1.0.0" },
    "dataSources": {
      "mainService": {
        "uri": "/odata/service",
        "type": "OData",
        "settings": { "odataVersion": "2.0" }
      }
    }
  },
  "sap.card": {
    "type": "List",
    "designtime": "dt/configuration",
    "configuration": {
      "destinations": {
        "myDestination": { "name": "DestinationName" }
      },
      "parameters": {
        "maxItems": { "value": 5, "type": "integer" }
      }
    },
    "header": {
      "title": "Card Title",
      "subTitle": "Card Subtitle",
      "icon": { "src": "sap-icon://list" }
    },
    "content": {
      "data": {
        "request": {
          "url": "{{destinations.myDestination}}/EntitySet",
          "parameters": { "$top": "{parameters>/maxItems/value}" }
        },
        "path": "/d/results"
      },
      "item": {
        "title": "{Title}",
        "description": "{Description}"
      }
    }
  }
}
```

---

## Context Values

Cards can access host environment information using the `sap.workzone` context.

### Available Context Paths

| Path | Description |
|------|-------------|
| `sap.workzone/currentUser/id` | Current user's ID |
| `sap.workzone/currentUser/name` | Current user's name |
| `sap.workzone/currentUser/email` | Current user's email |
| `sap.workzone/currentCompany/id` | Company ID |
| `sap.workzone/currentCompany/name` | Company name |
| `sap.workzone/currentWorkspace/id` | Current workspace ID |
| `sap.workzone/currentWorkspace/name` | Current workspace name |

### Using Context in Cards

**Binding Syntax**:
```json
{
  "parameters": {
    "userId": {
      "value": "{context>sap.workzone/currentUser/id}"
    }
  }
}
```

**Programmatic Access**:
```javascript
// Get card instance
var oCard = this.getOwnerComponent().getCard();
// Get host instance
var oHost = oCard.getHostInstance();
// Get context value (returns Promise)
oHost.getContextValue("sap.workzone/currentUser/id").then(function(value) {
    console.log("User ID:", value);
});
```

---

## Card Interactions

Cards on the same workpage can interact through a shared page context.

### Page Context Parameters

- All parameters in page context are available to cards during initialization
- When any card modifies a context parameter, all cards on the page refresh
- Users select card parameters through site context configuration

### updateContext Action

The `updateContext` action enables card-to-card communication:

```json
{
  "sap.card": {
    "content": {
      "item": {
        "actions": [{
          "type": "Custom",
          "enabled": true,
          "parameters": {
            "method": "updateContext",
            "parameters": {
              "selectedId": "{Id}"
            }
          }
        }]
      }
    }
  }
}
```

---

## Design-Time Module

The design-time module enables card configuration in the Work Zone editor.

### File Location

Place at: `dt/configuration.js`

Register in manifest.json:
```json
{
  "sap.card": {
    "designtime": "dt/configuration"
  }
}
```

### Configuration Structure

```javascript
sap.ui.define(["sap/ui/integration/Designtime"], function (Designtime) {
    "use strict";
    return function () {
        return new Designtime({
            form: { items: {} },
            preview: { modes: "Abstract" }
        });
    };
});
```

### Form Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `manifestpath` | string | Path to manifest value to edit |
| `type` | string | string, integer, number, date, datetime, boolean, string[] |
| `label` | string | Display label (supports i18n) |
| `defaultValue` | any | Fallback when manifest empty |
| `required` | boolean | Marks field with asterisk |
| `visible` | boolean | Controls visibility (default: true) |
| `translatable` | boolean | Enables translation mode |
| `cols` | 1 or 2 | Layout control (default: 2) |
| `allowDynamicValues` | boolean | Permits context value binding |
| `allowSettings` | boolean | Allows admin modifications |

### Dropdown List Configuration

**Static Data**:
```javascript
"values": {
  "data": {
    "json": { "values": [{ "text": "Option 1", "key": "opt1" }] }
  },
  "path": "/values",
  "item": { "text": "{text}", "key": "{key}" }
}
```

**Request Data**:
```javascript
"values": {
  "data": { "request": { "url": "./dt/listdata.json" } },
  "path": "/values",
  "item": { "text": "{text}", "key": "{key}" }
}
```

---

## Deploying Cards

### Prerequisites

- SAP Business Application Studio and target system in same subaccount
- Token-exchange destination configured (for direct deployment)

### Method 1: Direct Deployment

1. Right-click manifest.json
2. Select "UI Integration Card: Deploy to SAP Build Work Zone, advanced edition"
3. Card deploys directly to target system

**Note**: For initial deployments, clear content destination in File → Settings → Open Preference → UIcarddk

### Method 2: Package and Manual Upload

1. Right-click manifest.json
2. Select "UI Integration Card: Package"
3. Download generated `<card-id>.zip` file
4. Upload manually in Administration Console → UI Integration → Cards & Widgets

---

## Updating Cards

1. Open card project in SAP Business Application Studio
2. Modify manifest.json or source files
3. Access preview via built-in editor
4. Redeploy using preferred method

---

## Mobile Support

Enable mobile compatibility to allow cards in:
- SAP Build Work Zone mobile app
- Mobile responsive web UI
- iOS and Android devices

---

**Documentation Links**:
- SAPUI5 Card Explorer: https://ui5.sap.com/test-resources/sap/ui/integration/demokit/cardExplorer/
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/20-UIIntegrationCards
- SAP Help Portal: https://help.sap.com/docs/build-work-zone-advanced-edition
