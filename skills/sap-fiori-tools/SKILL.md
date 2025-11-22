---
name: sap-fiori-tools
description: |
  Develops SAP Fiori applications using SAP Fiori tools extensions for VS Code and SAP Business Application Studio.
  Use when: generating Fiori Elements or Freestyle SAPUI5 applications, configuring Page Editor for List Report
  or Object Page, working with annotations and Service Modeler, setting up deployment to ABAP or Cloud Foundry,
  creating adaptation projects, using Guided Development, previewing with mock data or live data, configuring
  SAP Fiori launchpad, or using AI-powered generation with Project Accelerator/Joule.
  Technologies: SAP Fiori Elements, SAPUI5, OData V2/V4, CAP, SAP BTP, ABAP, Cloud Foundry.
license: MIT
---

# SAP Fiori Tools Development Skill

Comprehensive guidance for developing SAP Fiori applications using SAP Fiori tools extensions.

## Overview

SAP Fiori tools is a collection of extensions that simplifies SAP Fiori elements and SAPUI5 application development. It includes six main components:

| Component | Purpose |
|-----------|---------|
| **Application Wizard** | Generate Fiori Elements and Freestyle SAPUI5 templates |
| **Application Modeler** | Visual Page Map and Page Editor for configuration |
| **Guided Development** | Step-by-step feature implementation guides |
| **Service Modeler** | Visualize OData service metadata and annotations |
| **Annotations Language Server** | Code completion, diagnostics, i18n for annotations |
| **Environment Check** | Validate setup and destination configurations |

**Minimum SAPUI5 Version**: 1.65+
**Support Component**: CA-UX-IDE

## Quick Start Commands

Access features via Command Palette (`Cmd/Ctrl + Shift + P`):

```
Fiori: Open Application Generator       # Create new application
Fiori: Open Application Info            # View project commands
Fiori: Open Page Map                    # Visual navigation editor
Fiori: Open Guided Development          # Feature implementation guides
Fiori: Open Service Modeler             # Explore OData service
Fiori: Add Deployment Configuration     # Setup ABAP or CF deployment
Fiori: Add Fiori Launchpad Configuration # Configure FLP tile
Fiori: Validate Project                 # Run project validation
Fiori: Open Environment Check           # Troubleshoot destinations
```

## Application Generation

### Fiori Elements Floorplans

| Floorplan | OData V2 | OData V4 | Use Case |
|-----------|----------|----------|----------|
| List Report Page | Yes | Yes | Browse large datasets, navigate to details |
| Worklist Page | Yes | 1.99+ | Process work items, task completion |
| Analytical List Page | Yes | 1.90+ | Data analysis, KPI visualization |
| Overview Page | Yes | Yes | Role-based dashboards, multi-card views |
| Form Entry Object Page | Yes | Yes | Structured data entry |
| Custom Page | No | Yes | Extensible custom UI with building blocks |

### Data Source Options

1. **SAP System** - Connect to ABAP on-premise or BTP systems
2. **CAP Project** - Use local Node.js or Java CAP project
3. **EDMX File** - Upload metadata for mock-only development
4. **SAP Business Accelerator Hub** - Development/testing only (deprecated)

### Generated Project Structure

```
webapp/
  ├── manifest.json          # App descriptor
  ├── Component.js           # UI5 component
  ├── localService/          # Mock data and metadata
  │   ├── metadata.xml
  │   └── mockdata/
  └── annotations/           # Local annotation files
package.json
ui5.yaml                     # UI5 tooling config
ui5-local.yaml               # Local development config
```

## Page Editor Configuration

The Page Editor provides visual configuration for Fiori Elements pages.

### List Report Page Elements

- **Filter Fields** - Configure filter bar with value helps
- **Table** - Configure columns, actions, row selection
- **Multiple Views** - Create tabbed table views
- **Analytical Chart** - Add data visualizations

### Object Page Elements

- **Header** - Configure header facets and actions
- **Sections** - Form, Table, Identification, Chart, Group sections
- **Footer** - Configure footer actions

### Extension-Based Elements (OData V4)

| Element | Location | Description |
|---------|----------|-------------|
| Custom Column | Table | Add custom columns with fragments |
| Custom Section | Object Page | Add custom sections with views |
| Custom Action | Header/Table | Add action buttons with handlers |
| Custom View | List Report | Add custom tab views |
| Controller Extension | Page | Override lifecycle methods |

For detailed configuration, see `references/page-editor.md`.

## Annotations Development

### Language Server Features

- **Code Completion** (`Ctrl/Cmd + Space`) - Context-aware suggestions
- **Micro-Snippets** - Insert complete annotation blocks
- **Diagnostics** - Validation against vocabularies
- **i18n Support** - Externalize translatable strings
- **Peek/Go to Definition** - Navigate to annotation sources

### Supported Vocabularies

OASIS OData v4: Core, Capabilities, Aggregation, Authorization, JSON, Measures, Repeatability, Temporal, Validation

SAP Vocabularies: Analytics, CodeList, Common, Communication, DataIntegration, DirectEdit, Graph, Hierarchy, HTML5, ODM, PDF, PersonalData, Preview, Session, UI

### Annotation Files Location

- **CDS files**: CAP project `.cds` files
- **XML files**: `webapp/annotations/*.xml`

For annotation patterns, see `references/annotations.md`.

## Preview Options

### NPM Scripts

```bash
npm start           # Live data from backend
npm run start-mock  # Mock data via MockServer
npm run start-local # Mock data + local SAPUI5 resources
npm run start-noflp # Without Fiori launchpad sandbox
```

### Run Control

Configure via `launch.json` in `.vscode/` folder. Supports:
- Multiple run configurations per workspace
- VS Code and BAS integration
- App-to-app navigation preview

### Mock Data

- **Data Editor** - Visual mock data management
- **AI Generation** - Generate contextual mock data (requires SAP Build Code)
- **MockServer** - Automatic mock server setup

For preview details, see `references/preview.md`.

## Deployment

### ABAP Deployment

**Prerequisites**:
- SAP_UI 7.53+
- SAPUI5 ABAP Repository service enabled
- S_DEVELOP authorization

**Configuration**:
```bash
npx fiori add deploy-config    # Generate ui5-deploy.yaml
npm run deploy                  # Execute deployment
```

**Generated Files**: `ui5-deploy.yaml`, updated `package.json`

### Cloud Foundry Deployment

**Prerequisites**:
- MTA tool: `npm i -g mta`
- CF CLI with multiapps plugin
- HTML5 Repository service instance

**Configuration**:
```bash
npx fiori add deploy-config    # Select Cloud Foundry
npm run build                   # Generate mta.yaml
npm run deploy                  # Deploy to CF
```

**Generated Files**: `mta.yaml`, `xs-app.json`, `xs-security.json`

For deployment details, see `references/deployment.md`.

## Fiori Launchpad Configuration

Add FLP tile configuration via:
```
Fiori: Add Fiori Launchpad Configuration
```

**Required Parameters**:
- Semantic Object (unique identifier)
- Action (e.g., "display")
- Title
- Subtitle (optional)

Configuration updates `manifest.json` with inbound navigation.

## Adaptation Projects

Extend existing Fiori applications without modifying source code.

### Prerequisites

**On-Premise (VS Code)**:
- SAP_UI 7.54+, SAPUI5 1.72+
- Base app must have manifest.json
- Cannot use ABAP Cloud packages

**S/4HANA Cloud & BTP ABAP**:
- Application must be "released for extensibility"
- 3-system landscape with developer tenant
- Required business catalogs assigned

### Adaptation Workflow

1. Create adaptation project via Template Wizard
2. Make UI adaptations in Adaptation Editor
3. Preview adaptation
4. Deploy to ABAP repository

### Adaptation Capabilities

| Adaptation | Description |
|------------|-------------|
| Control Variants | Create page variants/views |
| Fragments | Add UI fragments to extension points |
| Controller Extensions | Override/extend controller methods |
| App Descriptor Changes | Modify manifest.json settings |
| OData Service | Add/replace OData services |
| Component Usages | Add SAPUI5 component references |

For adaptation details, see `references/adaptation-projects.md`.

## AI-Powered Generation

### Project Accelerator / Joule

Generate complete CAP projects with Fiori UI from business requirements.

**Input Formats**: Text, Images, or Combined

**Generated Output**:
- Entity definitions and associations
- Code lists and value helps
- List Report applications
- Object Page configurations
- Sample data

**Limitations**:
- No charts or specialized headers
- Do not include personal/sensitive data in requirements

### AI Mock Data Generation

Generate contextual mock data using entity property names (requires SAP Build Code subscription).

## Project Functions

| Function | Command |
|----------|---------|
| Application Info | `Fiori: Open Application Info` |
| Project Validation | `Fiori: Validate Project` |
| Environment Check | `Fiori: Open Environment Check` |
| Data Editor | Via Application Info page |
| Service Metadata | `Fiori: Open Service Modeler` |
| System Connections | Manage SAP Systems in VS Code |

### Project Validation Checks

1. **Project** - Verify package.json, manifest.json, ui5.yaml
2. **Annotation** - Validate annotation files
3. **Specification** - Check manifest and changes folder
4. **ESLint** - Run ESLint if configured

## Building Blocks (OData V4)

Reusable UI components for custom pages and sections:

| Block | Use Case |
|-------|----------|
| Chart | Data visualization |
| Filter Bar | Query filtering |
| Table | Tabular data display |
| Page | Custom page container |
| Rich Text Editor | Content editing in custom sections |

## Troubleshooting

### Common Issues

**Port 8080 in use**: System auto-selects next available port

**HTTPS/SSL errors**: Configure browser to trust localhost certificates

**Deployment 400 errors**: Check `/IWFND/ERROR_LOG`, configure virus scan in `/IWFND/VIRUS_SCAN`

**Debug deployment**:
```bash
# macOS/Linux
DEBUG=ux-odata-client npm run deploy

# Windows
set DEBUG=ux-odata-client & npm run deploy
```

### CLI Help

```bash
npx fiori help              # List available commands
npx fiori deploy help       # Deployment command help
```

## Migration from SAP Web IDE

Migrate existing projects using:
```
Fiori: Migrate Project for use in Fiori tools
```

**Supported Types**: Fiori Elements (V2/V4), Freestyle SAPUI5, Adaptation Projects, Extensibility Projects

**Post-Migration**: Run `npm run deploy-config` to update deployment configuration.

For migration details, see `references/getting-started.md`.

## Guided Development (76+ Guides)

Access step-by-step implementation guides:
```
Fiori: Open Guided Development
```

**Guide Categories**:
- Building Blocks (Chart, Filter Bar, Table)
- Page Elements (Cards, Header Facets, Sections)
- Table Enhancements (Column types, Actions)
- Filtering & Navigation
- Configuration (Variant management, Side effects)
- Extensions (Custom actions, sections, columns)

## Reference Documentation

For detailed information on specific topics:

- `references/getting-started.md` - Installation, migration, ADT integration, commands
- `references/configuration.md` - MTA, middlewares, SAPUI5 versions, project functions
- `references/page-editor.md` - Page Editor configuration details
- `references/annotations.md` - Annotation patterns and examples
- `references/deployment.md` - Deployment configuration details
- `references/adaptation-projects.md` - Adaptation project workflows
- `references/preview.md` - Preview and testing options

## Documentation Sources

**Primary Source**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs

**Last Updated**: 2025-11-22

| Section | Documentation Link |
|---------|-------------------|
| Getting Started | `Getting-Started-with-SAP-Fiori-Tools/` |
| Generating Apps | `Generating-an-Application/` |
| Developing | `Developing-an-Application/` |
| Previewing | `Previewing-an-Application/` |
| Deploying | `Deploying-an-Application/` |
| Project Functions | `Project-Functions/` |
| Adaptation Projects | Root docs folder |

**SAP Resources**:
- Fiori Design Guidelines: https://experience.sap.com/fiori-design-web/
- SAP Help Portal: https://help.sap.com/docs/SAP_FIORI_tools
