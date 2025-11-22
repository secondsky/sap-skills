# Getting Started Reference

Comprehensive reference for setting up and migrating SAP Fiori tools projects.

## Table of Contents

1. [Installation](#installation)
2. [Migration from SAP Web IDE](#migration-from-sap-web-ide)
3. [Importing Applications](#importing-applications)
4. [ADT Integration](#adt-integration)
5. [Command Palette Reference](#command-palette-reference)
6. [Telemetry](#telemetry)
7. [Security Best Practices](#security-best-practices)

---

## Installation

### Visual Studio Code

**Prerequisites**:

| Requirement | Details |
|-------------|---------|
| Node.js | LTS version required |
| npm | Compatible version with Node.js |
| MTA Tool | `npm install -g mta` (version 1.0+) |
| CF CLI | Latest Cloud Foundry CLI |

**Windows Node.js Setup**:
1. Download Windows installer from nodejs.org (requires admin rights) or standalone binary
2. Extract binary to `C:\Users\<your_user>\AppData\Local\Programs`
3. Set `NODE_PATH` environment variable pointing to Node folder
4. Add `%NODE_PATH%` to System variables Path
5. Restart computer after changes

**macOS Node.js Setup**:
Use package manager: Homebrew or Node Version Manager (nvm)

**npm Configuration Check**:
```bash
npm config get @sap:registry
```
Expected values: `https://registry.npmjs.org` or `undefined`

If set incorrectly to `@sap`, remove entry from `.npmrc` file in home directory.

**Required Extensions**:
Install **SAP Fiori tools - Extension Pack** which includes:
- Application Wizard
- Application Modeler
- Guided Development
- Service Modeler
- XML Annotation Language Server
- XML Toolkit

**Optional Extensions**:
- SAP CDS Language Support (for CAP applications)
- UI5 Language Assistant Support (control ID checks)

### SAP Business Application Studio

**Dev Space Types with SAP Fiori Tools**:
1. **SAP Fiori Dev Space** - Dedicated for Fiori development
2. **Full Stack Cloud Application Dev Space** - For CAP applications

**Setup Steps**:
1. Complete SAP Business Application Studio onboarding
2. Create dev space with appropriate type
3. Start dev space and begin development

**Note**: UI5 Language Assistant is installed automatically in SAP Fiori tools Dev Spaces.

### Authentication Methods

| Type | On Premise | ABAP Environment | Cloud Foundry | S/4HANA Cloud |
|------|-----------|------------------|---------------|---------------|
| OAuth 2.0 | No | Deprecated | No | No |
| Basic Auth | Yes | No | Yes | No |
| Reentrance Ticket | No | Yes | Yes | Yes |

### Required OData Services (SAML Disabled)

| Service | Path |
|---------|------|
| OData V2 Catalog | `/sap/opu/odata/IWFND/CATALOGSERVICE;v=2` |
| OData V4 Catalog (dev) | `/sap/opu/odata4/iwfnd/config/default/iwfnd/catalog/0001` |
| OData V4 Catalog (prod) | `/sap/opu/odata4/iwfnd/config/default/iwfnd/catalog/0002` |
| ATO Catalog | `/sap/bc/adt/ato/settings` |
| SAPUI5 Repository | `/sap/opu/odata/UI5/ABAP_REPOSITORY_SRV` |

---

## Migration from SAP Web IDE

### Overview

SAP Fiori tools enables migrating projects from SAP Web IDE to VS Code or SAP Business Application Studio.

**Note**: SAP Web IDE requires productive SAP BTP global account (not available on free tier).

### Supported Project Types

- SAP Fiori elements (V2 and V4)
- Freestyle SAPUI5
- SAPUI5 Adaptation Projects
- SAPUI5 Extensibility projects

### Prerequisites

- Latest SAP Fiori tools extensions installed
- Project functioning properly in SAP Web IDE
- **BAS**: Destination defined for target system
- **VS Code**: Knowledge of target system hostname and client

### Migration Steps

1. **Import/Clone Project**
   - Clone from Git repository, OR
   - Export from SAP Web IDE and drag into workspace

2. **Launch Migration**
   - Click "Start Migration" prompt, OR
   - Command Palette: `Fiori: Migrate Project for use in Fiori tools`

3. **Select Projects**
   - Check desired projects in list
   - Manually add via filesystem if not detected

4. **Configure Settings**
   | Field | Description |
   |-------|-------------|
   | Application Identifier | Unique app ID |
   | Project Path | Target location |
   | SAP System | Target ABAP system |
   | Destination (BAS) | Destination name |
   | Hostname (VS Code) | System URL |
   | Client | SAP client number |
   | SAPUI5 Version | Target UI5 version |

5. **Execute Migration**
   - Click "Start Migration"
   - Packages install automatically

### Files Modified During Migration

Approximately 13 files updated including:
- `package.json`
- `ui5.yaml`
- `manifest.json`
- `index.html`
- `changes_loader.js` (created)
- `locate-reuse-libs.js` (created)

### Post-Migration Steps

**CRITICAL**: Migration doesn't update deployment configuration!
```bash
npm run deploy-config
```

**Verification**:
- Review source control changes
- Test SAP Fiori tools features (Page Map, Application Generator)
- Sync OData services if `metadata.xml` is missing

---

## Importing Applications

### From SAPUI5 ABAP Repository

**Prerequisites**:
Create two folders in workspace:
- `restore-from-exported` - stores restored application
- `restore-from-exported/webapp` - contains extracted files

### Import Procedure

1. Access SAPUI5 ABAP backend system
2. Open transaction `SE80`
3. Execute report `/UI5/UI5_REPOSITORY_LOAD`
4. Enter SAPUI5 application name
5. Select Download and choose empty folder
6. Download as `.zip` archive
7. Extract to `restore-from-exported/webapp`
   - Ensure `manifest.json` at exact path
8. Create `package.json` in `restore-from-exported`:
   ```json
   {
     "name": "your-app-name",
     "version": "1.0.0"
   }
   ```
9. Run: `Fiori: Migrate Project for use in Fiori tools`
10. Complete migration process

### Important Notes

- Downloaded code typically minified
- `-dbg.js` files contain unminified source
- Before UI5 CLI build, remove:
  - `-dbg.js` files
  - `-preload.js` files
  - `.js.map` files

---

## ADT Integration

### Overview

Launch SAP Fiori Generator directly from ABAP Development Tools in Eclipse.

### One-Time Configuration

1. Select target system in ADT
2. Access system properties
3. Navigate to ABAP Development settings
4. Enable IDE configuration option
5. Specify preferred IDE (BAS or VS Code)

### Features

**Streamlined Project Creation**:
- "Create Fiori Project" button appears near service details
- Data source selection step skipped (already selected in ADT)
- Main entity pre-selected

**Application Download**:
- Quick Fiori Application generator option
- Downloads deployed application to workspace
- Updates for SAP Fiori tools compatibility

**Direct Command**:
```
Fiori: Download ADT Deployed App from SAPUI5 ABAP Repository
```

**Important**: VS Code saved ABAP system URL must match ADT URL.

---

## Command Palette Reference

Access via `Cmd/Ctrl + Shift + P`, then type "Fiori:"

### Project Management

| Command | Description |
|---------|-------------|
| Add SAP System | Create/save ABAP On-Premises or ABAP Environment connection |
| Import SAP System | Import ABAP On-Premise systems |
| Show SAP System Details | View saved system configuration |
| Archive Project | Preserve project state |
| Validate Project | Check project integrity |
| Migrate Project | Transition from SAP Web IDE |

### Application Development

| Command | Description |
|---------|-------------|
| Open Application Generator | Create SAP Fiori application |
| Open Reusable Library Generator | Create shareable components |
| Delete Application from CAP Project | Remove apps from multi-app setups |
| Open Application Info | Display application metadata |

### Configuration & Deployment

| Command | Description |
|---------|-------------|
| Add Deployment Configuration | Setup deployment parameters |
| Deploy Application | Execute deployment |
| Add SAP Fiori Launchpad Configuration | Prepare for launchpad |
| Add SAP Fiori Launchpad Embedded Configuration | Enable external preview |
| Change Minimum SAPUI5 Version | Update version requirements |
| Add Configuration for Variants Creation | Enable variant management |

### Development Tools

| Command | Description |
|---------|-------------|
| Open Guided Development | Generate code snippets for features |
| Open Service Modeler | Visualize OData models |
| Open Annotation File Manager | Manage annotation files |
| Open Data Editor | Launch data editing interface |
| Show Page Editor | Outline view of configurable elements |
| Show Page Map | Application pages and navigation paths |
| Open Run Configurations | Configure preview settings |

### Navigation & Preview

| Command | Description |
|---------|-------------|
| Preview Application | Execute start script |
| Enable App-to-App Navigation Preview | Test navigation between apps |
| Open CF Application Router Generator | Create MTA deployment config |

### System & Utilities

| Command | Description |
|---------|-------------|
| Open Environment Check | Check/create environment reports |
| Change Telemetry Settings | Control data collection |
| Show Release Notes | Display version information |
| Show Output Channel | Open diagnostics view |
| Restart XML Annotation Language Server | Recover failed services |
| Run UI5 Linter | Validate SAPUI5 best practices |
| Refresh Application Modeler View | Update UI state |

### AI Assistance

| Command | Description |
|---------|-------------|
| Show Fiori Tools Joule | Activate AI assistant (requires SAP Build Code) |

---

## Telemetry

### Overview

SAP Fiori tools collects non-personally identifiable usage information to improve the product.

### Configuration

```
Fiori: Change Telemetry Settings
```

Toggle telemetry collection on/off according to preference.

---

## Security Best Practices

### Development Security

- Follow organization's software development security policies
- **Avoid using production OData services for development**
- Use separate credentials for development vs production
- Use trusted NPM registry
- Apply security guidelines for all required tools
- Implement source control with regular commits

### Path Variable Security

Verify PATH variable content:
- `node` command points to trusted origin
- `cds` command points to trusted origin

### Reporting Issues

1. Check SAP Fiori tools FAQs
2. Search SAP Community
3. Create incident in SAP Support Portal
   - Component: `CA-UX-IDE`

---

## Documentation Source

**GitHub**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs/Getting-Started-with-SAP-Fiori-Tools

Key files:
- `getting-started-with-sap-fiori-tools-2d8b1cb.md`
- `installation-e870fcf.md`
- `visual-studio-code-17efa21.md`
- `sap-business-application-studio-b011040.md`
- `migration-70d41f3.md`
- `importing-an-application-ab4657c.md`
- `abap-development-tools-integration-20da2fd.md`
- `command-palette-4896dcc.md`
- `telemetry-837c231.md`
- `report-issues-and-security-7c755a5.md`
