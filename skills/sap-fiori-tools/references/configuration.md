# Configuration Reference

Comprehensive reference for configuring SAP Fiori tools projects.

## Table of Contents

1. [MTA Configuration](#mta-configuration)
2. [JavaScript Code Assist](#javascript-code-assist)
3. [Security Certificates](#security-certificates)
4. [Custom Middlewares](#custom-middlewares)
5. [SAPUI5 Version Management](#sapui5-version-management)
6. [Project Functions](#project-functions)
7. [Reuse Libraries](#reuse-libraries)
8. [UI Service Generation](#ui-service-generation)

---

## MTA Configuration

### Generate MTA Deployment File

**Command**:
```
Fiori: Open CF Application Router Generator
```

### Generated Structure

```
project/
├── router/                    # App router configuration
├── mta.yaml                   # MTA configuration
├── package.json
├── package-lock.json
└── .gitignore
```

### Router Type Options

| Type | Description |
|------|-------------|
| Managed | SAP-managed router |
| Application Frontend service | Frontend routing service |
| Standalone | Self-managed router |

### Adding Applications to MTA

**Existing MTA File**:
When MTA file exists, Application Generator:
- Automatically enables deployment configuration
- Updates MTA file with settings

**New MTA File**:
Select "Cloud Foundry" as target landscape during generation.

**Best Practice**:
1. Create MTA file first
2. Generate Fiori application in subfolder
3. Better supports multi-application deployments

### CAP Projects

Options for MTA in CAP:
- Generate new instance-based destination
- Use existing destinations from MTA file

---

## JavaScript Code Assist

### Prerequisites

SAPUI5 version 1.76 or newer

### Setup Steps

**1. Add Dependencies**

In `package.json`:
```json
{
  "devDependencies": {
    "eslint": "5.16.x",
    "@sap/eslint-plugin-ui5-jsdocs": "2.0.x",
    "@sapui5/ts-types": "1.92.x"
  }
}
```

**2. Create tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "none",
    "noEmit": true,
    "checkJs": true,
    "allowJs": true,
    "types": ["@sapui5/ts-types"]
  }
}
```

**3. Create .eslintrc**

```json
{
  "plugins": ["@sap/ui5-jsdocs"],
  "extends": [
    "eslint:recommended",
    "plugin:@sap/ui5-jsdocs/recommended"
  ]
}
```

**4. Install Dependencies**

```bash
rm -rf node_modules
npm install
```

### Features

- Code completion for SAPUI5
- Type-aware suggestions
- Documentation hints

---

## Security Certificates

### When Certificates Needed

When local certificate authority is unknown to operating system (certificate valid but not trusted).

### Setup Steps

**Step 1: Obtain Certificate**

Export certificate from web browser or obtain from CA.

**Step 2: Install to Trust Store**

**Windows**:
1. Right-click CA certificate
2. Select "Install Certificate"
3. Add to trust store (current user or all users)

**macOS**:
1. Right-click CA certificate
2. Open With > Keychain Access
3. Import into System keychain

**Step 3: Configure Environment**

Set `NODE_EXTRA_CA_CERTS` environment variable:

**Windows**:
1. System Properties > Advanced > Environment Variables
2. Create new variable with certificate path

**macOS**:
```bash
export NODE_EXTRA_CA_CERTS=path/to/certificate/file
```

### Troubleshooting Invalid Certificates

For truly invalid certificates (not recommended):
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**Warning**: Resolve underlying certificate issues instead.

---

## Custom Middlewares

### Overview

Plug custom middleware into SAPUI5 Server module's express server.

### Application Reload Middleware

Auto-refresh browser on file changes.

**Configuration** (`ui5.yaml`):
```yaml
server:
  customMiddleware:
    - name: fiori-tools-appreload
      afterMiddleware: compression
      configuration:
        path: webapp          # Directory to monitor
        ext: html,js,json,xml,properties,change
        port: 35729           # Communication port
        debug: false          # Enable logging
```

### Proxy Middleware

Connect to backend systems and manage SAPUI5 versions.

**Basic Backend Connection**:
```yaml
server:
  customMiddleware:
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        backend:
          - path: /sap
            url: https://my.backend.com:1234
```

**Multiple Backends**:
```yaml
configuration:
  backend:
    - path: /sap/opu/odata/sap/SERVICE1
      url: https://system1.com
    - path: /sap/opu/odata/sap/SERVICE2
      url: https://system2.com
```

**Special Options**:

| Option | Value | Description |
|--------|-------|-------------|
| scp | true | SAP BTP ABAP Environment |
| apiHub | true | SAP Business Accelerator Hub |
| ws | true | WebSocket support |
| pathPrefix | string | Remap request paths |

**SAPUI5 Version Management**:
```yaml
configuration:
  ui5:
    path:
      - /resources
      - /test-resources
    url: https://sapui5.hana.ondemand.com
    version: 1.78.0
```

### Serve Static Middleware

Deliver static resources locally.

**SAPUI5 Local Serving**:
```yaml
server:
  customMiddleware:
    - name: fiori-tools-servestatic
      afterMiddleware: compression
      configuration:
        paths:
          - path: /resources
            src: "Path/To/SAPUI5-SDK"
```

### Execution

```bash
npx fiori run
```

Requires properly configured `ui5.yaml`.

---

## SAPUI5 Version Management

### Minimum Version

**Location**: `manifest.json`
```json
{
  "sap.ui5": {
    "dependencies": {
      "minUI5Version": "1.120.0"
    }
  }
}
```

**Change Command**:
```
Fiori: Change Minimum SAPUI5 Version
```

Updates:
- `manifest.json` minUI5Version
- `@sap/ux-specification` module

**Deployment Warning**: If target system lacks required version, warning displays.

### Preview Version

**Default**: Uses minimum SAPUI5 version

**Custom Configuration**: Create custom run configuration

**Source**: `https://ui5.sap.com` (default)

**Fallback**: Next higher version if requested unavailable

### Deployed Version

**ABAP Environment**:
- FLP apps: Backend's installed SAPUI5 version
- Standalone: Relative paths (backend) or absolute URLs (specific version)

**Cloud Foundry**:
- Work Zone: iFrame with backend version
- Standalone: Configured destination, defaults to latest from ui5.sap.com

---

## Project Functions

### Application Information

**Command**: `Fiori: Open Application Info`

**Sections**:
| Section | Content |
|---------|---------|
| Project Detail | Type, SAPUI5 version, backend, pages |
| Status | Dependency summary with fix links |
| What you can do | Relevant command shortcuts |
| What you can learn | Help topics and support links |

### Project Validation

**Command**: `Fiori: Validate Project`

**Validation Steps**:

| Step | Validates |
|------|-----------|
| Project | package.json, manifest.json, ui5.yaml |
| Annotation | Annotation files (same as Language Server) |
| Specification | manifest.json, changes folder |
| ESLint | If eslint installed, runs project checks |

**Output**: Markdown report + Problems tab

### Project Cleanup

Removes unused elements:
- Orphaned `UI.FieldGroup` and `UI.LineItem` annotations
- Unused annotation terms: `UI.MultiLineText`, `Common.ValueListWithFixedValues`, `Common.Text`, `Common.ValueList`, `Common.FieldControl`

### Environment Check

**Command**: `Fiori: Open Environment Check`

**Report Sections**:
| Section | Content |
|---------|---------|
| Environment | Dev Space type, Node version |
| Destination Details | Parameters and specifics |
| All Destination Details | Complete destination list |
| Messages | Raw logs for support |

**Output Options**: View in interface or export as `.zip`

### Data Editor

**Command**: Via Application Info > Start Data Editor

**Capabilities**:
- Edit cells (double-click, excludes keys)
- Add rows (cascades to related entities)
- Delete rows (cascades deletions)
- Search functionality
- Show/hide columns

**Live Updates** (`ui5-mock.yaml`):
```yaml
server:
  customMiddleware:
    - name: "@sap-ux/ui5-middleware-fe-mockserver"
      configuration:
        watch: true
```

---

## Reuse Libraries

### Create Reusable Library

**Command**: `Fiori: Open Reusable Library Generator`

**Required Fields**:
- Module name
- Namespace
- Minimum SAPUI5 version
- OData service (optional)

### Add Library Reference

**Prerequisites**:
- Reuse library in workspace
- Existing SAP Fiori project

**Command**: `Fiori: Add Reference to SAP Fiori Reusable Libraries`

**Steps**:
1. Select target SAP Fiori project
2. Choose workspace as source
3. Select libraries/components
4. Click Finish

**Updated Files**:
- `ui5.yaml`
- `ui5-local.yaml`
- `manifest.json`

### Deploy Reuse Library

1. Add library project to workspace
2. Accept migration prompt
3. Dependencies install automatically
4. Generate deployment configuration
5. Deploy to ABAP

---

## UI Service Generation

### Purpose

Generate UI services from business objects or data models.

**Command**: `Fiori: Generate UI Service`

### Service Sources

| Source | Description |
|--------|-------------|
| Business Object Interface | Business object service |
| ABAP Core Data Service | CDS-based service |

### Options

- Draft enablement (if supported)
- Automatic Fiori application creation

### Procedure

1. Execute command
2. Select SAP system (VS Code) or destination (BAS)
3. Choose business object or data service
4. Specify package and transport
5. Enable drafts (optional)
6. Enable auto app creation (optional)

### Result

- UI service generated
- If auto-create enabled, SAP Fiori Generator launches

---

## Filter Fields Configuration

### Types

| Type | Description |
|------|-------------|
| Compact Filter | Field with value help |
| Visual Filter | Chart with selectable elements |

### Adding Filter Fields

1. Open Page Map for List Report
2. Select Configure Page
3. Click Add icon next to Filter Bar > Filter Fields
4. Select properties for filtering

**Generated Annotation**: `UI.SelectionFields`

### Restrictions

Cannot select properties marked with:
- `UI.Hidden`
- `UI.HiddenFilter`
- `NonFilterableProperties`

### Visual Filters

For analytically-enabled services:

**Configuration**:
- Select analytically-enabled entity
- Choose groupable property (dimension)
- Select/create measure

**Generated Annotations**:
- `UI.Chart`
- `UI.PresentationVariant`
- `Common.ValueList`
- `UI.SelectionFields`

### Editable Properties

**Compact Filters**: Label, External ID, Text, Text Arrangement, Display Type

**Visual Filters (Additional)**: Measure/Dimension Labels, Scale Factor, Fractional Digits, Sort Order, Fixed Values

---

## Table Configuration

### Sorting

**Presentation Variant Property**: `UI.SelectionPresentationVariant` or `UI.PresentationVariant`

**Add Sort Property**:
1. Configure presentation variant
2. Add sort properties
3. Specify direction
4. Reorder as needed

### Default Filtering

**Selection Variant**: `UI.SelectionPresentationVariant` or `UI.SelectionVariant`

**Add Default Filter**:
1. Configure selection variant
2. Add filter properties
3. Supports multiple filters per property

---

## Documentation Source

**GitHub**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs

Key files:
- `Generating-an-Application/Additional-Configuration/`
- `Project-Functions/`
- `Developing-an-Application/filter-fields-0b84286.md`
- `Developing-an-Application/table-aaff7b1.md`
