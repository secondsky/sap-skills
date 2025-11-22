# Service Center, Extensions & IDE Tools - Complete Reference

## Table of Contents

1. [Service Providers](#service-providers)
2. [Additional Extensions](#additional-extensions)
3. [IDE Features](#ide-features)
4. [Advanced Development](#advanced-development)
5. [Custom Extensions](#custom-extensions)
6. [Troubleshooting](#troubleshooting)
7. [Documentation Links](#documentation-links)

---

## Service Providers

The Service Center provides a central entry point to explore services from multiple providers.

### SAP System Service Provider

Integrates systems from your BAS subaccount for data sourcing and development.

**Features**:
- Automatic login using BAS user credentials
- ABAP Service Catalog and Cloud for Customer Catalog
- Explore business objects and ABAP CDS views
- Generate custom OData V4 services
- RFC (Remote Function Call) support

**Prerequisites for Business Objects**:
- SAMLAssertion authentication
- Access to Development Tenant (Client 80)
- BR_DEVELOPER business role permissions

**Project Integration**:
| Project Type | Integration |
|--------------|-------------|
| SAP Fiori | Add via "Add to SAP Fiori Project" button |
| CAP Node | External services in srv/external with XML/CDS files |
| Java | OData services with Maven dependencies |

### Developer Hub Service Provider

Access products and services published in Developer Hub.

**Prerequisites**:
- Business_Application_Studio_Administrator role
- Service instance created in Developer Hub
- Connection to space with Developer Hub subscription

**Destination Properties**:
```properties
Type = HTTP
ProxyType = Internet
Authentication = OAuth2ClientCredentials
HTML5.DynamicDestination = true
WebIDEEnabled = true
WebIDEUsage = apihub_enterprise
```

**Product Categories**:
- SAP S/4HANA Cloud Products (from connected systems)
- Custom Products (requires onboarding)

### Unified Customer Landscape Service Provider

Aggregates packages and services from registered SAP S/4HANA Cloud systems.

**Prerequisites**:
1. Administrator registers S/4HANA Cloud system in BTP global account
2. Create "Developing with SAP Business Application Studio" formation type
3. Configure destination for each consumption bundle

**Destination Properties**:
```properties
Type = HTTP
ProxyType = Internet
HTML5.DynamicDestination = true
WebIDEEnabled = true
x-system-type = SAP S/4HANA Cloud
x-correlation-id = sap.s4:communicationScenario:SAP_COM_<XXXX>
x-system-id = <System ID name>
```

### SAP Business Accelerator Hub Service Provider

Access SAP Business Accelerator Hub products, packages, services, and events.

**Note**: Only products/packages with OData services are displayed.

**Available Products**:
- SAP S/4HANA Cloud
- SAP S/4HANA
- SAP SuccessFactors
- SAP Customer Experience
- SAP Business Technology Platform

**Usage**: One-time authentication per session for service access.

---

## Additional Extensions

### Scenario Extensions

| Extension | Description |
|-----------|-------------|
| **Development Tools for SAP Build Work Zone** | Create UI Integration cards for unified information display |
| **HTML5 Application Template** | Wizard-based HTML5 application creation |
| **HTML5 Runner** | Local HTML5 app execution with run configurations |
| **SAP BAS Extension Development** | Create, deploy, manage custom extensions |
| **Workflow Module** | Build workflow applications with SAP Workflow Management |

### Tool Extensions

| Extension | Description |
|-----------|-------------|
| **CDS Graphical Modeler** | Visual editor for SAP core data service models |
| **Docker Image Builder** | Build docker images (not persistent) |
| **Headless Testing Framework** | End-to-end testing for UI5 apps with OPA5 selectors |
| **Java Tools** | SapMachine 11/17, SAP JVM 8, Maven 3.8.1, Tomcat 9.0.33 |
| **Launchpad Module** | Add launchpad to multitarget applications |
| **Python Tools** | IntelliSense, formatting, linting, debugging, Jupyter |
| **SAP HANA Tools** | Native HANA development with graphical editors |
| **SAP HANA XS Advanced Tools** | Native XS Advanced application development |
| **SAPUI5 Adaptation Project** | Extend SAP Fiori applications |
| **SAPUI5 Layout Editor & Extensibility** | Visual XML development, extend ABAP repo apps |

### Runtime Capabilities (Full Stack Projects)

| Capability | Description |
|------------|-------------|
| **Audit Logging** | Automated logging of personal data operations (requires premium edition) |
| **Change Tracking** | Automated capturing and viewing of entity change records |
| **Attachments** | File storage with SAP Object Store and Malware Scanning |
| **Telemetry** | Tracing and metrics with SAP Cloud Logging |

**Usage**: Access via Storyboard → Runtime Capabilities toolbar

---

## IDE Features

### Guide Center

Step-by-step guidance for SAP development scenarios based on expert best practices.

**Access**: Command Palette → "Guide Center"

**Features**:
- Guides tailored to dev space type
- Interactive steps with action triggers
- Opens relevant tools in new tabs
- Links to documentation

### Search

**Within File** (`Ctrl+F`):
- Find and replace in current file
- Results highlighted in editor, overview ruler, minimap
- Navigate with `Enter`/`Shift+Enter`
- Find in selection mode
- Multiline search (`Ctrl+Enter` for line breaks)

**Across Files** (`Ctrl+Shift+F`):
- Search all files in opened folder
- Results grouped by file with hit counts
- Include/exclude patterns supported

**Glob Syntax**:
- `*` - one or more characters
- `?` - single character
- `**` - any path segments
- `{}` - group conditions
- `[]` - character ranges
- `!` prefix - exclude pattern

**Default Exclusions**: `node_modules` (configurable)

### Problems View

Aggregates errors and warnings from all open files.

**Access**: View → Problems

**Features**:
- Click item to navigate to code location
- Filters for errors, warnings, info

### Application Preview

**Preview Running Apps**:
1. Command Palette → `Ports: Preview`
2. Select from exposed applications
3. Opens in new browser tab

**Configure Notifications**:
1. Settings → Ports
2. Edit "Exclude Expose Notifications"
3. Add port numbers/ranges to suppress

### Terminal

Pre-installed tools: Maven, npm, additional tools installable.

**Access**:
- Terminal → New Terminal
- Right-click folder → Open in Integrated Terminal

### Template Wizard

Uses any Yeoman generator for project/module creation.

**Access**: Command Palette → "Open Template Wizard"

**Important**: Using templates makes you code owner. Implement CI/CD vulnerability scanning.

---

## Advanced Development

### Multi-Subaccount Development

Develop in one subaccount, deploy to another (different regions possible).

**Steps**:
1. Create two regional subaccounts
2. Configure design-time subaccount with BAS subscription
3. Enable Cloud Foundry on runtime subaccount
4. Create matching destinations in both subaccounts
5. Configure CF login with runtime subaccount endpoint
6. Develop, test, and deploy

### Running in Incognito Mode

Test applications with different users.

**Process**:
1. Launch app from BAS
2. Copy application URL
3. Open private browser window
4. Navigate to: `<BAS URL>/login?e=<application URL>`
5. Authenticate with BAS credentials
6. Provide app-specific credentials if needed

### Building and Deploying MTAs

**Build Methods**:
- Context menu: Right-click `mta.yaml` → Build MTA Project
- Command Palette: Enter "MTA" → Build MTA Project
- Task Explorer: Create reusable build task
- CLI: Use Cloud MTA Build Tool

**Deploy Methods**:
- Context menu: Right-click `.mtar` file → Deploy MTA Archive
- Command Palette: Enter "MTA" → Deploy MTA Archive
- Task Explorer: Create reusable deployment task
- CLI: Use cf deploy command

**Output**: MTAR files stored in `mta_archives` folder

### VS Code Remote Access

Connect from local VS Code desktop to BAS dev spaces.

**Benefits**:
- Use local VS Code installation
- Maintain remote dev space resources
- Secure connection

---

## Custom Extensions

### Creating Extensions

**Prerequisites**:
- Extension Deployer role
- SAP BAS Extension Development extension enabled

**Steps**:

1. **Create extension.json**:
```json
{
  "apiVersion": "1.0",
  "name": "extension-name",
  "namespace": "your-namespace",
  "displayName": "Extension Display Name",
  "description": "Extension description",
  "author": "Author Name",
  "version": "1.0.0",
  "yeomanPackages": [
    {
      "name": "@scope/generator-name",
      "versionRange": "^1.0.0"
    }
  ],
  "vscodeExtensions": [
    {
      "name": "extension-name",
      "url": "https://url-to-vsix-file"
    }
  ]
}
```

2. **Deploy**: Run `wex deploy` in terminal

3. **Verify**: Check Dev Space Manager for extension

### Removing Extensions

```bash
wex delete -x <namespace>/<ext-name>
```

**Note**: Cannot delete if active in any dev space.

---

## Troubleshooting

### Webview Issues

| Issue | Solution |
|-------|----------|
| Private Firefox blank page | Use standard Firefox session |
| "Could not register service workers" | Disable Kaspersky or use Firefox |
| HANA editor won't open | Disable AdBlock extension |

### File Backup Issues

**Popup Error**: Content not being backed up.

**Resolution**:
1. Save all open files
2. Push Git changes
3. Access Dev Space Manager
4. Export project
5. Restart dev space
6. Import project

**Best Practice**: Always sync to remote Git repository.

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Service Center | https://help.sap.com/docs/bas/sap-business-application-studio/explore-services-using-service-center |
| SAP System Provider | https://help.sap.com/docs/bas/sap-business-application-studio/sap-system-service-provider |
| Developer Hub Provider | https://help.sap.com/docs/bas/sap-business-application-studio/developer-hub-service-provider |
| Unified Customer Landscape | https://help.sap.com/docs/bas/sap-business-application-studio/unified-customer-landscape-service-provider |
| Business Accelerator Hub | https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-accelerator-hub-service-provider |
| Additional Extensions | https://help.sap.com/docs/bas/sap-business-application-studio/additional-extensions |
| Custom Extensions | https://help.sap.com/docs/bas/sap-business-application-studio/create-and-deploy-extension |
| Guide Center | https://help.sap.com/docs/bas/sap-business-application-studio/guide-center |
| Multi-Subaccount | https://help.sap.com/docs/bas/sap-business-application-studio/develop-app-using-different-subaccounts |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/sap-btp-business-application-studio/tree/main/docs
