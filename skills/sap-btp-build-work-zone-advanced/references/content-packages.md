# Content Packages Development Guide

Complete guide for creating, managing, and deploying content packages in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/30-ContentPackages

## Table of Contents

- [Overview](#overview)
- [Package Types](#package-types)
  - [Global Content Packages](#global-content-packages)
  - [Local Content Packages](#local-content-packages)
- [Supported Artifacts](#supported-artifacts)
- [Package Development Workflow](#package-development-workflow)
- [Package Manifest Structure](#package-manifest-structure)
- [Package Creation Tools](#package-creation-tools)
- [Package Deployment](#package-deployment)
- [Package Installation](#package-installation)
- [Package Management](#package-management)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Content packages are collections of content artifacts bundled in a ZIP file for distribution and installation. They enable packaging and deploying UI Integration Cards, workspace templates, workflows, home pages, and workspaces.

## Package Types

### Global Content Packages

Pre-built packages available to all SAP Build Work Zone customers:

- Available without manual upload
- Require administrator installation
- Cannot be customized or downloaded
- Sourced from SAP or third-party providers

**Examples**:
- Employee Onboarding
- HR Content from SuccessFactors
- Insights: Change Management

### Local Content Packages

Customer-developed packages:

- Developed internally
- Require manual upload
- Can be downloaded and customized
- Require administrator installation

---

## Supported Content Items

Content packages can include:

| Item Type | Description |
|-----------|-------------|
| UI Integration Cards | SAPUI5 cards for data display |
| Workflows | Business process automation |
| Workspace Templates | Reusable workspace blueprints |
| Home Pages | Pre-configured landing pages |
| Workspaces | Complete workspace exports |

---

## Creating a Content Package

### Prerequisites

- SAP Business Application Studio subscription
- Dev space with "Development Tools for SAP Build Work Zone, Advanced Edition" extension
- Destination to content repository configured
- Workzone_Admin role collection

### Step 1: Create Project

1. Open SAP Business Application Studio
2. Select "New Project From Template"
3. Choose "Content Package" → "Start"
4. Complete Project Details form

**Alternative**: Use command `Content Package: Create Content Package Project`

### Step 2: Configure Project Details

| Field | Description |
|-------|-------------|
| Project Name | Custom identifier for project |
| Namespace | Generates Content Package ID: `<namespace>.<project_name>` |
| Title | Display title |
| Subtitle | Display subtitle |
| Content Samples | Toggle to include sample artifacts |

### Step 3: Add Content Items

Add artifacts to the package:
- UI Integration Cards
- Workspace templates
- Workflows
- Other supported content

---

## Package Manifest

### Basic Structure

```json
{
  "_version": "1.0.0",
  "sap.package": {
    "id": "com.company.mypackage",
    "version": "1.0.0",
    "title": "My Content Package",
    "description": "Package description",
    "vendor": "Company Name",
    "icon": "sap-icon://package"
  },
  "contents": {
    "cards": [
      {
        "id": "namespace.cardname",
        "type": "card",
        "src": "cards/cardname"
      }
    ],
    "workspaceTemplates": [
      {
        "id": "namespace.templatename",
        "type": "workspaceTemplate",
        "src": "templates/templatename"
      }
    ]
  }
}
```

### Destination Prerequisites

For remote system integration, add prerequisites section:

```json
{
  "sap.package": {
    "id": "com.company.mypackage",
    "prerequisites": {
      "destinations": [
        {
          "name": "MyDestination",
          "document": "https://documentation.url"
        },
        {
          "name": "SecondDestination"
        }
      ]
    }
  }
}
```

**Important**: Destinations must be configured in BTP Cockpit Destinations screen before deployment.

---

## Deploying Content Packages

### Method 1: Direct Deployment

1. Right-click project in explorer
2. Select "Deploy to SAP Build Work Zone"
3. Package deploys directly to target system

### Method 2: Manual Upload

1. Right-click project
2. Select "Package"
3. Download generated ZIP file
4. Upload in Administration Console → UI Integration → Content Packages

---

## Package Management

### Administration Console

Location: **UI Integration > Content Packages**

### Package Statuses

| Status | Description |
|--------|-------------|
| Ready to Install | Package uploaded, not installed |
| Installed | Package active in system |
| Upgrade Available | Newer version available |

### Management Features

- Search packages by name
- Filter by provider source
- Filter by installation status
- View package contents
- Install/uninstall packages

---

## Updating Content Packages

### Version Management

1. Increment version in manifest
2. Update content items as needed
3. Redeploy package
4. Install upgrade in Administration Console

### Update Workflow

1. Open existing project
2. Modify content or configuration
3. Update version number
4. Deploy updated package

### Best Practices

- Use semantic versioning (major.minor.patch)
- Document changes in package description
- Test in development before production
- Maintain backward compatibility when possible

---

## Project Structure

```
content-package-project/
├── manifest.json              # Package manifest
├── cards/
│   └── cardname/
│       ├── manifest.json      # Card manifest
│       └── dt/
│           └── configuration.js
├── templates/
│   └── templatename/
│       └── template.json
└── workflows/
    └── workflowname/
        └── workflow.json
```

---

## Post-Creation Actions

| Action | Description |
|--------|-------------|
| Update | Modify package artifacts |
| Deploy | Push to target environment |
| Delete | Remove via right-click context menu |

---

**Documentation Links**:
- Content Packages: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/30-ContentPackages
