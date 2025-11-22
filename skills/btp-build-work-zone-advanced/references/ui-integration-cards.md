# UI Integration Cards Development Guide

Complete guide for developing UI Integration Cards in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/btp-build-work-zone-advanced/tree/main/docs/20-UIIntegrationCards

---

## Overview

UI Integration Cards are design patterns that display concise information in limited-space containers. They follow SAPUI5 specifications (version 1.87.0+).

## Prerequisites

- SAP Business Application Studio subscription
- Dev space with "Development Tools for SAP Build Work Zone, Advanced Edition" extension
- Destination to content repository configured
- Workzone_Admin role collection

## Creating a UI Card

### Step 1: Open SAP Business Application Studio

Access your dev space with the Work Zone extension enabled.

### Step 2: Create New Project

1. Select "New Project From Template"
2. Choose "UI Integration Card"
3. Click Next

### Step 3: Configure Project

| Field | Description |
|-------|-------------|
| Project Name | Your identifier |
| Card Sample | Select template |
| NameSpace | Used for Card ID (namespace.projectname) |
| Card Title | Display title |
| Card Subtitle | Display subtitle |
| Mobile Compatibility | Enable for mobile app support |

### Step 4: Develop Card

Edit the card manifest and source files in the project structure.

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

## Card Manifest Structure

```json
{
  "sap.app": {
    "id": "namespace.cardname",
    "type": "card"
  },
  "sap.card": {
    "type": "List",
    "header": {
      "title": "Card Title",
      "subTitle": "Card Subtitle"
    },
    "content": {
      "data": { ... },
      "item": { ... }
    }
  }
}
```

## Deploying Cards

1. Right-click project in explorer
2. Select "Deploy to SAP Build Work Zone"
3. Verify in Administration Console

## Card Interactions

Cards can communicate with each other using:
- Parameters
- Destinations
- Context sharing

## Mobile Support

Enable mobile compatibility to allow cards in:
- SAP Build Work Zone mobile app
- Mobile responsive web UI

---

**Documentation Links**:
- SAPUI5 Card Explorer: https://ui5.sap.com/test-resources/sap/ui/integration/demokit/cardExplorer/
- GitHub: https://github.com/SAP-docs/btp-build-work-zone-advanced/tree/main/docs/20-UIIntegrationCards
