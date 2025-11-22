# Development Workflow - Complete Reference

## Table of Contents

1. [Project Creation](#project-creation)
2. [UI Development](#ui-development)
3. [Runtime Management](#runtime-management)
4. [Task Explorer](#task-explorer)
5. [Run Configurations](#run-configurations)
6. [Debugging](#debugging)
7. [MTA Development](#mta-development)
8. [CI/CD Integration](#cicd-integration)
9. [Extensions Management](#extensions-management)
10. [Security Features](#security-features)
11. [Data Management](#data-management)
12. [Documentation Links](#documentation-links)

---

## Project Creation

### Methods Available

| Method | Description |
|--------|-------------|
| **Template Wizard** | Create from predefined templates based on dev space |
| **Terminal** | Command-line project creation |
| **Git Clone** | Clone existing repository |
| **Import** | Import ZIP/TAR files from local system |
| **Yeoman Generators** | Use any Yeoman generator from npm registry |

### Using the Template Wizard

**Access Methods**:
1. Menu: File → New Project from Template
2. Get Started page
3. Command Palette: `SAP Business Application Studio: New Project from Template`

**Process**:
1. Select template type (based on dev space extensions)
2. Fill in required details
3. Navigate with Back/Next or wizard tree
4. Review error messages at field and step levels
5. Generate project with folder structure and artifacts

**Important**: When using templates, you become code owner. Implement automated vulnerability scanning in CI/CD pipeline.

### Importing Projects

**Supported Formats**: ZIP, TAR (including from SAP Web IDE)

**Steps**:
1. Ensure active workspace exists
2. Access Import via Get Started page or Command Palette
3. Select compressed file
4. Project added to dev space

---

## UI Development

### Layout Editor

Visual editor for XML views in SAP Fiori projects. **Note**: Safari browser not supported.

**Components**:

| Component | Description |
|-----------|-------------|
| Controls Tab | Drag-and-drop SAPUI5 controls |
| Outline Tab | Hierarchical view with semantic controls |
| Canvas | Visual representation of XML view |
| Properties Pane | Editable properties with data binding |
| Events Pane | Event handler management |

**Opening**: Right-click XML view → Open With → Layout Editor

**Key Operations**:
- Add controls via drag-and-drop
- Rearrange controls
- Keyboard navigation (double-click to select parent)
- Extract controls into fragments

### Supported SAPUI5 Controls (150+)

**Input & Selection**: Button, CheckBox, RadioButton, Input, TextArea, ComboBox, Select, DatePicker, TimePicker, SearchField, Slider

**Containers & Layouts**: App, Page, Panel, FlexBox, HBox, VBox, Grid, Form, SimpleForm, List, Table, Carousel

**Display**: Label, Text, Icon, Image, Link, Breadcrumbs, IconTabBar, ObjectHeader

**Smart Controls**: SmartChart, SmartTable, SmartForm, SmartField

**Outline Tab Only**: Semantic actions (AddAction, EditAction, SaveAction), Suite controls (BusinessCard, Charts), Classic UI controls

### Data Binding

**Prerequisites**: Define data set for view first

**Binding Types**:
- Properties of controls
- Aggregations of controls

**Notes**:
- Modifying existing data set may invalidate bindings
- For non-OData models, use source code directly
- Applications can incorporate OData Service component

**Related Binding Operations**:
- Define entity sets
- Bind simple controls
- Bind aggregate-type controls (templates)
- Bind to i18n model
- Bind to label annotations

### Storyboard

Graphical view of application architecture showing data models, services, and UI front ends.

**Available in Dev Spaces**:
- SAP Fiori
- Full-Stack Application Using Productivity Tools
- SAP Mobile Application
- Full Stack Cloud Application

**Features**:
- Trigger graphical editors
- Visualize component relationships
- Quick application structure comprehension

### Keyboard Shortcuts (Layout Editor)

| Action | Shortcut |
|--------|----------|
| Select parent | Ctrl + Click |
| Navigate to parent | Up Arrow |
| Navigate to child | Down Arrow |
| Navigate siblings | Left/Right Arrow |
| Move control up | Shift + Left Arrow |
| Move control down | Shift + Right Arrow |
| Drop position up (drag) | Shift |
| Drop position down (drag) | Alt |

---

## Runtime Management

SAP Business Application Studio uses **asdf** for runtime version management.

### Default Versions

Only one LTS version per runtime officially supported. Check versions:

```bash
java -version
node --version
python --version
```

### Installing New Versions

1. Command Palette → Runtime: Install
2. Select runtime type
3. Choose specific version

Installed versions persist in dev space storage.

### Setting Default Versions

1. Command Palette → Runtime: Set default
2. Select runtime type
3. Choose preferred version

Applies across all workspaces in dev space.

### Java Proxy Certificate

After installing Java via terminal:
```
Command Palette → Runtime: Add Proxy Certificate to Java
```
Enables connectivity to on-premise Java repositories during Maven build.

### Direct asdf Usage

asdf can be used directly from terminal for advanced version management.

---

## Task Explorer

Create, modify, and run scenario-specific tasks through dedicated UI.

**Requirement**: Dev space extensions must provide scenario-specific tasks.

### Using Task Explorer

1. Click Task Explorer icon in sidebar
2. Click `+` to create task
3. Select "Configure" to generate in `tasks.json`
4. Modify via right-click menu
5. Run via Run icon or Build button

### Features

- Tasks organized by user intent groups
- Only workspace-relevant tasks displayed
- Configurations stored for reuse
- Integrates with MTA build/deploy workflows

---

## Run Configurations

Define how projects and unit tests execute.

### Execution Priority

1. Default configuration from project creation
2. Newly added configuration
3. Most recently executed (among multiple)
4. User selection for multiple projects

### Supported Frameworks

- SAP Fiori Tools applications
- CAP Java Modules
- CAP Node Applications

### Creating Configurations

Access Run and Debug view → Add Configuration → Select framework type

---

## Debugging

Integrated debugging for Node.js runtime (JavaScript, TypeScript, compiled-to-JS languages).

### Setup

1. Open Run and Debug view
2. Select configuration from dropdown
3. Choose Node.js to generate `launch.json`

### Preset Configurations

- Launch Program
- Create JavaScript Debug Terminal
- Run Current File

### Debugging Modes

| Mode | Description |
|------|-------------|
| Launch | Start program in debug state |
| Attach | Connect to running program in debug state |

**Attach via**: Command Palette → Debug: Attach to Node Process

### Breakpoints

- Toggle: Click editor margin or press F9
- Add function breakpoints via BREAKPOINTS section
- Deactivate/remove all at once

---

## MTA Development

### MTA Editor (Visual)

Edit `mta.yaml` without direct YAML editing.

**Open**: Right-click `mta.yaml` → Open With → MTA Editor

**Important Notes**:
- Visual editor removes comments and formats file
- Use code editor if comments needed
- YAML requires spaces (not tabs) for indentation

### MTA Tools

| Tool | Description |
|------|-------------|
| Cloud Foundry CLI | Deploy and manage CF services/apps |
| Cloud MTA Build Tool | Build `.mtar` archives from `mta.yaml` |
| CF CLI MTA Plugin | MTA operations in CF environment |
| CF Targets Plugin | Manage multiple API targets |
| CF CLI Copy Env Plugin | Export VCAP_SERVICES locally |
| Chisel | TCP tunnel over HTTP via SSH |

### Basic MTA Commands

```bash
# Build MTA archive
mbt build

# Deploy to Cloud Foundry
cf deploy mta_archives/<app>.mtar
```

### Deployment Troubleshooting

If MTAR deployment fails due to `package-lock.json` conflicts or `node_modules` issues:

1. Create `.npmrc` file at project level
2. Configure to reference npm public registry
3. Disable npm cache in SAP BAS

---

## CI/CD Integration

SAP Continuous Integration and Delivery automates build, test, and deployment.

### Prerequisites

- Execute "Get started with SAP Business Application Studio" booster
- Add CI/CD service via "Get started with SAP Build Code" booster

### Features

- One `config.yaml`-based job per project
- View build logs and steps
- Manually trigger builds (webhooks recommended)
- Edit configuration
- Delete jobs and config files

### Usage

1. Open CI/CD view from activity bar
2. Click "Create Job" (disabled if job exists)
3. Access actions via job context menu

---

## Extensions Management

### VS Code Extensions

Install from [Open VSX Registry](https://open-vsx.org/).

**Disclaimer**: SAP does not certify third-party extensions. Users assume:
- Responsibility for maintenance and security
- Liability for negative effects
- No auto-update support

**Install**:
1. Click Extensions icon or View → Extensions
2. Accept disclaimer
3. Search and install

**Manage**:
- Uninstall: Search → Manage → Uninstall
- Update: Uninstall → Reinstall latest

### Yeoman Generators

Install from npm registry for additional templates.

**Install**:
1. Template wizard → Explore and Install Generators
2. Accept disclaimer
3. Search for template type
4. Click Install

---

## Security Features

### Malware Scanning

- Automatic scan every 10 minutes for running dev spaces
- Notification on detection with delete/dismiss options
- Audit log entry created with file, dev space, and user details

### Encryption (CMK)

Customer-managed key encryption enabled by default since September 18, 2022.

**Scope**: All content under `/home/user` encrypted in physical storage.

**If CMK Disabled**:
- Existing dev spaces cannot start
- New dev spaces cannot be created
- Files inaccessible
- Dev space deletion still possible
- Re-enable to restore access

### Security Standards

- Authentication and authorization enforced
- Communication encrypted
- Untrusted input prevented
- Audit logging enabled

### Recommendations

- **BTP-BAS-0001**: Limit administrators with full management permissions
- Use PATs for Git authentication
- Protect external system access
- Include only secured artifacts in custom extensions

---

## Data Management

### On-Premise System Access

Built-in web proxy at `http://localhost:8887`.

**Refresh Destinations**:
```bash
curl http://localhost:8887/reload
```

**Git Repositories**: Use exact host:port from destination URL.

**npm Modules**:
```bash
npm config set @<scope>:registry <URL>
```

**Maven Dependencies**: Edit `/home/user/.m2/settings.xml`:
```xml
<repository>
    <id>corporate.repository</id>
    <url>REPOSITORY_URL</url>
</repository>
```

### Deleting Personal Data

Requires administrator access and REST API tool.

**Process**:
1. Get workspace list: `https://<bas-url>/ws-manager/api/v1/workspace?all=true`
2. Copy workspace `id` from `config` section
3. Optionally export data first
4. Get JWT: `https://<bas-url>/jwt`
5. DELETE request: `https://<bas-url>/ws-manager/api/v1/workspace/<ws-id>?all=true`
6. Header: `X-Approuter-Authorization: Bearer <JWT_Token>`

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Project Creation | https://help.sap.com/docs/bas/sap-business-application-studio/create-a-project |
| Layout Editor | https://help.sap.com/docs/bas/sap-business-application-studio/layout-editor |
| Task Explorer | https://help.sap.com/docs/bas/sap-business-application-studio/task-explorer |
| Run Configurations | https://help.sap.com/docs/bas/sap-business-application-studio/creating-run-configurations |
| Debugging | https://help.sap.com/docs/bas/sap-business-application-studio/debugging |
| MTA Development | https://help.sap.com/docs/bas/sap-business-application-studio/mta-development |
| CI/CD | https://help.sap.com/docs/bas/sap-business-application-studio/continuous-integration-and-delivery |
| VS Code Extensions | https://help.sap.com/docs/bas/sap-business-application-studio/explore-and-install-vs-code-extensions |
| Malware Scan | https://help.sap.com/docs/bas/sap-business-application-studio/malware-scan-in-dev-spaces |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/sap-btp-business-application-studio/tree/main/docs
