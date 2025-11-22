# Workspace Templates Development Guide

Complete guide for creating and deploying workspace templates in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/40-WorkspaceTemplates

---

## Overview

Workspace templates are reusable blueprints that enable users to create workspaces for various business scenarios with minimum modification. They promote consistency and efficiency across organizations.

## Purpose and Benefits

- **Operational Efficiency**: Create workspaces without starting from scratch
- **Standardization**: Consistent workspace structure across organization
- **Flexibility**: Accommodate specific business needs
- **Reusability**: Deploy same template multiple times

---

## Template Components

Workspace templates can include:

| Component | Description |
|-----------|-------------|
| Workpages | Pre-configured pages with layouts |
| Widgets | Pre-placed content containers |
| Settings | Default workspace configuration |
| Permissions | Role-based access defaults |
| Branding | Theme and styling settings |

---

## Creating a Workspace Template

### Prerequisites

- SAP Business Application Studio subscription
- Dev space with "Development Tools for SAP Build Work Zone, Advanced Edition" extension
- Destination to content repository configured
- Workzone_Admin role collection

### Step 1: Create Project

1. Open SAP Business Application Studio
2. Select "New Project From Template"
3. Choose "Workspace Template"
4. Click Next

### Step 2: Configure Template

Define template properties:
- Template name
- Template description
- Default workspace settings

### Step 3: Design Template Structure

Configure the workspace structure:
- Add workpages
- Configure page layouts
- Add widget placeholders
- Set default permissions

### Step 4: Deploy Template

1. Right-click project in explorer
2. Select "Deploy to SAP Build Work Zone"
3. Verify in Administration Console

---

## Template Configuration

### Workspace Settings

Define default settings for workspaces created from template:

- Workspace type (public/private)
- Member permissions
- Feature enablement
- Notification settings

### Page Layouts

Configure workpage layouts:
- Section structure
- Column configuration (1-6 columns)
- Widget placement

### Widget Defaults

Pre-configure widgets:
- Widget types
- Default content
- Styling options

---

## Managing Templates

### Administration Console

Templates are managed in:
- **Area & Workspace Configuration > Workspace Templates**

### Template Operations

| Operation | Description |
|-----------|-------------|
| Install | Activate template for use |
| Update | Deploy new version |
| Disable | Remove from available templates |
| Delete | Remove template entirely |

---

## Using Templates

### Creating Workspace from Template

1. Navigate to Workspaces menu
2. Select "Create Workspace"
3. Choose template from list
4. Customize as needed
5. Create workspace

### Template Customization

Users can modify template defaults when creating workspaces:
- Change workspace name/description
- Adjust permissions
- Modify page layouts
- Add/remove widgets

---

## Best Practices

### Design Guidelines

1. **Keep templates focused** - One template per use case
2. **Use descriptive names** - Clear purpose identification
3. **Document customization points** - Guide users on modifications
4. **Test thoroughly** - Verify all components work

### Version Management

- Increment version for updates
- Maintain backward compatibility
- Document changes between versions

---

**Documentation Links**:
- Workspace Templates: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/40-WorkspaceTemplates
