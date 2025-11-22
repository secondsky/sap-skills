---
name: sap-btp-business-application-studio
description: |
  This skill provides comprehensive guidance for SAP Business Application Studio (BAS), the cloud-based IDE on SAP BTP built on Code-OSS. Use when setting up BAS subscriptions, creating dev spaces, connecting to external systems, deploying MTA applications, troubleshooting connectivity issues, managing Git repositories, configuring runtime versions, or using the layout editor.

  Keywords: SAP Business Application Studio, BAS, SAP BTP, dev space, Cloud Foundry, MTA, multitarget application, SAP Fiori, CAP, HANA, destination, WebIDEEnabled, Cloud Connector, Service Center, Storyboard, Layout Editor, ABAP, OData, subscription, entitlements, role collection, Business_Application_Studio_Developer, Git, clone, push, pull, Gerrit, PAT, OAuth, asdf, runtime, Node.js, Java, Python, Task Explorer, CI/CD, Yeoman, generator, template wizard, mbt, mtar, debugging, breakpoint
license: MIT
---

# SAP Business Application Studio

## Overview

SAP Business Application Studio is a cloud-based IDE on SAP BTP built on Code-OSS (VS Code foundation). It provides tailored dev spaces for SAP Fiori, CAP, HANA, and mobile development with pre-installed tools and runtimes.

**Architecture**: Multi-cloud SaaS (AWS, Azure, GCP) with isolated dev spaces functioning as Developer Virtual Appliances.

## Quick Decision Tree

**Setting up BAS?** → See [Setup Checklist](#setup-checklist)
**Creating a dev space?** → See [Dev Space Types](#dev-space-types)
**Connecting to external systems?** → See [Connectivity](#connectivity)
**Deploying applications?** → See [Build & Deploy](#build--deploy)
**Working with Git?** → See `references/git-operations.md`
**Project creation/development?** → See `references/development-workflow.md`
**Service Center/Extensions?** → See `references/service-center-and-tools.md`
**Troubleshooting?** → See `references/connectivity-guide.md`

---

## Setup Checklist

### Prerequisites
- SAP BTP global account
- Subaccount in Cloud Foundry environment

### Steps

1. **Create Subaccount** - Select region based on [availability](https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability)
2. **Configure Entitlements** - Add SAP Business Application Studio service plan
3. **Subscribe** - Complete subscription in subaccount
4. **Assign Roles** - Add `Business_Application_Studio_Developer` role collection
5. **Optional: Configure IdP** - Set up assertion-based attribute mapping
6. **Optional: Connect Git** - Link to public or corporate repositories
7. **Optional: Create CF Spaces** - At least 1 space per development team

For detailed setup: See `references/setup-checklist.md`

---

## Dev Space Types

| Type | Purpose | Key Extensions |
|------|---------|----------------|
| **SAP Fiori** | Fiori apps (CF, ABAP Cloud, on-prem) | SAP Fiori Tools, SAPUI5 Layout Editor, MTA Tools |
| **Full Stack Cloud Application** | CAP with Node.js/Java + Fiori | CAP Tools, CDS Graphical Modeler, Java Tools |
| **Full-Stack Application Using Productivity Tools** | Low-code development | Productivity Tools, CAP Tools, Mobile Services |
| **SAP HANA Native Application** | Native HANA apps, calculation views | HANA Tools, Calculation View Editor, SDI Tools |
| **SAP Mobile Application** | iOS/Android with MDK | Mobile Services Tools, HTML5 Runner |
| **SAP SME Business Application** | SME apps with Business Application Factory | SME programming model tools |
| **Basic** | Minimal environment | SAP Basic Tools only |

For extension details: See `references/dev-space-types.md`

---

## Service Plans

| Plan | Dev Spaces | Running | Storage | Notes |
|------|------------|---------|---------|-------|
| **Standard** | 10 | 2 | 10 GB | Production development |
| **Free** | 2 | 1 | 4 GB | Community support only, 2 deployments max |
| **Trial** | 2 | 1 | 4 GB | 1-hour timeout, 30-day inactivity deletion |
| **Build-Code** | Varies | Varies | Varies | Requires SAP Build Code subscription |

For restrictions: See `references/service-plans.md`

---

## Connectivity

### Required Destination Properties

```
WebIDEEnabled = true
HTML5.DynamicDestination = true
```

### WebIDEUsage by System Type

| System Type | WebIDEUsage Value |
|-------------|-------------------|
| ABAP System | `odata_abap,dev_abap` |
| SAP Cloud for Customer | `odata_c4c` |
| Service URL | `odata_gen` |
| SAP Business Accelerator Hub | `apihub_sandbox` |

### Cloud Connector Requirements (On-Premise)

1. Virtual URL in Cloud Connector must match destination URL (host:port only)
2. Protocol must be HTTP
3. Grant access to required paths:
   - `/sap/opu/odata/` (OData services)
   - `/sap/bc/ui5_ui5/` (UI5 resources)
   - `/sap/bc/adt/` (ABAP Development Tools)
   - `/sap/bc/ui2/app_index/` (App index)

For troubleshooting: See `references/connectivity-guide.md`

---

## Build & Deploy

### Prerequisites

1. Log into Cloud Foundry account
2. For HANA apps: Add "SAP HANA Cloud, SAP HANA Schemas & HDI Containers" entitlement
3. For Trial/Free: Add "SAP Build Work Zone, standard edition" + Launchpad_Admin role

### MTA Deployment

```bash
# Build MTA archive
mbt build

# Deploy to Cloud Foundry
cf deploy mta_archives/<app>.mtar
```

### Key Tools

- **MTA Editor**: Visual editing of `mta.yaml`
- **Cloud Foundry CLI**: `cf` commands for deployment
- **Cloud MTA Build Tool**: Generates `.mtar` files
- **Task Explorer**: Execute build/deploy tasks

---

## Roles & Authorization

| Role | Purpose |
|------|---------|
| **Developer** | `Business_Application_Studio_Developer` - Application development |
| **Administrator** | Export/delete user data, restart dev spaces |
| **Extension Deployer** | Create and deploy custom extensions |

Assign via: SAP BTP Cockpit → Security → Role Collections

---

## Common Issues

### Dev Space Stuck in STARTING
1. Wait 5 minutes
2. If persists, start new dev space and restore via Git
3. Contact support with workspace ID (ws-id)

### Connectivity Failures
1. Verify destination in BTP Cockpit (WebIDEEnabled, HTML5.DynamicDestination)
2. Check Cloud Connector configuration
3. Run in terminal: `curl localhost:8887/reload` then `curl $H2O_URL/api/listDestinations -o dests.json`

### Storage/Inode Issues
```bash
df -ih  # Check inodes
df -h   # Check disk space
```
Remove cache folders and unnecessary files.

### HANA Connection Issues
Configure SAP HANA Cloud to allow BAS IP addresses. See [Availability](https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability) for region IPs.

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Command Palette | `F1` or `Cmd+Shift+P` |
| Select parent control | `Ctrl+Click` |
| Move control up | `Shift+Left Arrow` |
| Move control down | `Shift+Right Arrow` |

---

## Security Recommendations

- **BTP-BAS-0001**: Limit administrators with full management permissions
- Use Personal Access Tokens (PATs) for Git authentication
- Protect connections to external systems
- Avoid personal data in source files when using Joule AI

---

## Reference Files

- `references/dev-space-types.md` - Detailed dev space extensions and capabilities
- `references/connectivity-guide.md` - Complete connectivity troubleshooting
- `references/service-plans.md` - Plan restrictions and metering
- `references/setup-checklist.md` - Detailed setup procedures
- `references/git-operations.md` - Git commands, stash, authentication, Gerrit
- `references/development-workflow.md` - Project creation, UI development, debugging, CI/CD
- `references/service-center-and-tools.md` - Service providers, extensions, IDE features
- `references/PROGRESS_TRACKING.md` - Documentation source tracking

## Templates

- `templates/destination-config.md` - Destination configuration examples
- `templates/dev-space-setup.md` - Dev space creation checklist

---

## Documentation Links

| Resource | URL |
|----------|-----|
| SAP Help Portal | https://help.sap.com/docs/bas |
| GitHub Docs Source | https://github.com/SAP-docs/sap-btp-business-application-studio |
| Discovery Center | https://discovery-center.cloud.sap/serviceCatalog/business-application-studio |
| Availability/IPs | https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability |

---

**Last Verified**: 2025-11-22
**Source**: SAP-docs/sap-btp-business-application-studio (145+ docs)
