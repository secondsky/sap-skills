---
name: sap-btp-cloud-transport-management
description: |
  Comprehensive skill for SAP Cloud Transport Management service on SAP BTP. Use when setting up transport landscapes, configuring transport nodes and routes, managing import queues, deploying MTAs across Cloud Foundry environments, integrating with CI/CD pipelines, configuring ABAP environment transports, troubleshooting deployment errors, or implementing change management workflows. Covers entitlements, subscriptions, role collections, service instances, destinations, and API integrations.
license: GPL-3.0
metadata:
  version: "1.0.0"
  last_verified: "2025-11-27"
  sap_documentation_source: "[https://help.sap.com/docs/cloud-transport-management"](https://help.sap.com/docs/cloud-transport-management")
---

# SAP Cloud Transport Management Skill

## Table of Contents

1. [Overview](#overview)
2. [Quick Start: Initial Setup](#quick-start-initial-setup)
   - [Prerequisites](#prerequisites)
   - [Setup Workflow](#setup-workflow)
   - [Step 1: Configure Entitlements](#step-1-configure-entitlements)
   - [Step 2: Subscribe to the Service](#step-2-subscribe-to-the-service)
   - [Step 3: Set Up Role Collections](#step-3-set-up-role-collections)
   - [Step 4: Create Service Instance and Key](#step-4-create-service-instance-and-key)
3. [Landscape Configuration](#landscape-configuration)
   - [Transport Nodes](#transport-nodes)
   - [Transport Routes](#transport-routes)
   - [Transport Landscape Wizard](#transport-landscape-wizard)
4. [Destination Configuration](#destination-configuration)
   - [Destination to TMS Service (Source Environment)](#destination-to-tms-service-source-environment)
   - [MTA Deployment Destinations (Cloud Foundry)](#mta-deployment-destinations-cloud-foundry)
   - [BTP ABAP Environment Destinations](#btp-abap-environment-destinations)
5. [Import Queue Operations](#import-queue-operations)
   - [Import Methods](#import-methods)
   - [File Upload](#file-upload)
   - [Scheduling](#scheduling)
   - [Automatic Import](#automatic-import)
6. [Transport Request Statuses](#transport-request-statuses)
   - [Import Statuses](#import-statuses)
   - [Lifecycle Statuses](#lifecycle-statuses)
7. [Troubleshooting](#troubleshooting)
   - [Quick Reference: Common Errors](#quick-reference-common-errors)
   - [MTA Deployment Errors](#mta-deployment-errors)
   - [SAP Support](#sap-support)
8. [Security](#security)
   - [Service Plans for API Access](#service-plans-for-api-access)
9. [Bundled Resources](#bundled-resources)
   - [Node-Specific Restrictions](#node-specific-restrictions)
   - [Malware Scanning](#malware-scanning)
10. [Integrations](#integrations)
   - [CI/CD Integration](#cicd-integration)
   - [Alert Notifications](#alert-notifications)
   - [API Operations](#api-operations)
10. [Reference Documentation](#reference-documentation)
11. [Documentation Links](#documentation-links)

## Overview

SAP Cloud Transport Management is a service on SAP BTP that manages software deliverables between accounts of different environments by transporting them across various runtimes. It provides transparency to the audit trail of changes and enables separation of concerns between developers and operations teams.

**Supported Environments**: Cloud Foundry, Kyma, Neo (deprecated)

**Supported Content Types**:
- **MTA** (Multitarget Applications): `.mtar` files for Cloud Foundry deployments
- **BTP ABAP**: References to ABAP objects in Git repositories
- **Application Content**: Application-specific formats (`.zip`, `.rar`)
- **XSC DU**: SAP HANA XS classic delivery units

## Quick Start: Initial Setup

### Prerequisites
- Global account administrator access
- At least one SAP BTP subaccount
- Cloud Foundry environment enabled

### Setup Workflow

```
1. Configure Entitlements → 2. Subscribe to Service → 3. Set Up Roles → 4. Create Service Instance
```

### Step 1: Configure Entitlements

Navigate to: **Global Account > Entitlements > Entity Assignments > Add Service Plans**

Select "Cloud Transport Management" and choose plans:

| Plan Type | Plans Available | Purpose |
|-----------|-----------------|---------|
| Application | `standard`, `free`, `build-runtime` | UI access |
| Instance | `standard`, `export`, `transport_operator` | API/programmatic access |

> Instance plans require an active application plan. The `export` plan is for CI/CD pipelines.

### Step 2: Subscribe to the Service

1. Navigate to **Services > Service Marketplace**
2. Search for "Cloud Transport Management"
3. Select **Create** from the Actions menu
4. Choose a subscription plan (`standard`, `free`, or `build-runtime`)
5. Verify status shows "Subscribed"

### Step 3: Set Up Role Collections

**Pre-delivered Role Collections**:
- `TMS_LandscapeOperator_RC`
- `TMS_Viewer_RC`

**Available Roles**:

| Role | Capabilities |
|------|-------------|
| Administrator | Full administration for all TMS tasks |
| LandscapeOperator | Create/edit/delete nodes and routes |
| TransportOperator | Manage import queues, forward, reset, schedule |
| ImportOperator | Import all transport requests |
| ImportSelectedOperator | Import selected transport requests |
| ExportOperator | Add files, create modifiable requests |
| Viewer | Read-only access |

Assign roles: **Security > Role Collections > [Collection] > Edit > Users**

### Step 4: Create Service Instance and Key

1. Create a Cloud Foundry space in your subaccount
2. Navigate to **Services > Instances and Subscriptions > Create**
3. Select:
   - Service: `Cloud Transport Management`
   - Plan: `standard` (instance type)
   - Runtime: `Cloud Foundry`
4. Create a service key - credentials structure:

```json
{
  "uaa": {
    "clientid": "sb-xxxxxx",
    "clientsecret": "xxxxxx",
    "url": "[https://<domain>.authentication.sap.hana.ondemand.com"](https://<domain>.authentication.sap.hana.ondemand.com")
  },
  "uri": "[https://transport-service-app-backend.ts.cfapps.sap.hana.ondemand.com"](https://transport-service-app-backend.ts.cfapps.sap.hana.ondemand.com")
}
```

## Landscape Configuration

### Transport Nodes

Transport nodes represent source or target endpoints of deployment processes.

**Node Types**:
- **Physical Nodes**: Actual deployment endpoints (e.g., Cloud Foundry spaces)
- **Virtual Nodes**: Placeholders for aggregation/distribution without physical deployment

**Key Configuration Fields**:

| Field | Description |
|-------|-------------|
| Name | Case-sensitive identifier (must match `sourceSystemId` for Content Agent) |
| Allow Upload to Node | Enable file uploads for local archives |
| Forward Mode | `Pre-Import` (default), `Post-Import`, `On Success`, `Manual` |
| Content Type | `MTA`, `BTP ABAP`, `Application Content`, `XSC DU` |
| Destination | Target deployment endpoint |
| Deployment Strategy | `default` or `blue-green` (MTA on CF only) |

### Transport Routes

Routes connect transport nodes. Constraint: A node can be a target for only one route but can be a source for multiple routes.

### Transport Landscape Wizard

Use for simple 2-3 node landscapes:
1. Select template (number of nodes)
2. Configure each node
3. Customize route names
4. Review and finish

## Destination Configuration

All destinations require **HTTPS**. Configure in: **SAP BTP Cockpit > Connectivity > Destinations**

### Destination to TMS Service (Source Environment)

Required for applications exporting content directly to TMS.

| Field | Value |
|-------|-------|
| Name | `TransportManagementService` (or app-specific name) |
| Type | HTTP |
| URL | Service key `uri` value |
| Authentication | OAuth2ClientCredentials |
| Client ID | Service key `uaa.clientid` |
| Client Secret | Service key `uaa.clientsecret` |
| Token Service URL | Service key `uaa.url` + `/oauth/token` |
| Additional Property | `sourceSystemId` = source node name |

### MTA Deployment Destinations (Cloud Foundry)

**Option 1: Basic Authentication (SAP ID users only)**

| Field | Value |
|-------|-------|
| URL (org/space) | `[https://deploy-service.cf.<domain>/slprot/<org>/<space>/slp`](https://deploy-service.cf.<domain>/slprot/<org>/<space>/slp`) |
| URL (space GUID) | `[https://deploy-service.cf.<domain>/slprot/<guid>/slp`](https://deploy-service.cf.<domain>/slprot/<guid>/slp`) |
| Authentication | BasicAuthentication |
| User | Platform user email with `SpaceDeveloper` role |

> Get space GUID: `cf space <space-name> --guid`
> URL-encode special characters in org/space names

**Option 2: OAuth2Password (Custom IdP support)**

| Field | Value |
|-------|-------|
| URL | Same as Basic Auth |
| Authentication | OAuth2Password |
| Client ID | `cf` |
| Client Secret | (leave empty) |
| Token Service URL | `[https://login.cf.<domain>`](https://login.cf.<domain>`) |

### BTP ABAP Environment Destinations

| Field | Value |
|-------|-------|
| URL | `[https://<instance>.abap.<region>.hana.ondemand.com/sap/opu/odata4/sap/a4c_mswc_api/srvd_a2x/sap/manage_software_components/0001/`](https://<instance>.abap.<region>.hana.ondemand.com/sap/opu/odata4/sap/a4c_mswc_api/srvd_a2x/sap/manage_software_components/0001/`) |
| Authentication | BasicAuthentication |
| User | Communication user from `SAP_COM_0948` |

## Import Queue Operations

### Import Methods

| Method | Description | Availability |
|--------|-------------|--------------|
| Import All | Sequential import of all requests in queue | All content types |
| Import Selected | Import specific requests (may cause inconsistencies) | Not BTP ABAP |
| Import Upto | Import all requests up to selected one | BTP ABAP only |

**Importable Statuses**: `Initial`, `Fatal`, `Repeatable`

### File Upload

- **Max file size**: 1 GB (500 MB on free plan)
- **Storage quota**: 50 GB standard, 500 MB free
- **Retention**: 30 days (7 days free) after final status
- **Formats**: `.mtar` (MTA), `.tgz` (XSC DU), `.zip` (Application Content)

### Scheduling

- **Patterns**: Daily (hourly, 4x/day) or Weekly (specific days/times)
- **Auto-deactivation**: After 3 consecutive fatal failures over 3+ weeks

### Automatic Import

Enable per node - immediately processes all importable requests and triggers on new arrivals.

## Transport Request Statuses

### Import Statuses

| Status | Description |
|--------|-------------|
| Initial | Added but not imported |
| Running | Import in progress |
| Succeeded | Import successful |
| Warning | Completed with warnings |
| Error | Import failed (retryable) |
| Fatal | Import failed (fatal error) |
| Skipped | Intentionally skipped (virtual nodes) |
| Repeatable | Reset for re-import |
| Deleted | Removed from queue |
| Transient | Tested and released (modifiable requests) |

### Lifecycle Statuses

- **Modifiable**: Request can be edited
- **Released**: In at least one queue with non-archived status
- **Deleted**: Deleted from all queues
- **Archived**: Cleaned up by retention policy

## Troubleshooting

### Quick Reference: Common Errors

| Error | Likely Cause | Quick Fix |
|-------|--------------|-----------|
| `Not Found` | Wrong CF domain | Match domain to `cf api` output |
| `Not Found` | Unencoded special chars | Use space GUID: `cf space <name> --guid` |
| `Forbidden` | Missing SpaceDeveloper | Add role in BTP Cockpit or CF CLI |
| `Forbidden` | Wrong IdP | Use OAuth2Password with `origin` property |
| Connection refused (ABAP) | Wrong URL pattern | Verify `SAP_COM_0948` communication arrangement URL |
| Import stuck | Non-final status | Check Transport Action Logs for root cause |

### MTA Deployment Errors

**Error**: `Not Found` during deployment

*Causes*:
1. Wrong Cloud Foundry domain in URL
2. Special characters in org/space names not URL-encoded

*Solutions*:
- Verify domain matches CF API endpoint: `cf api`
- Use space GUID instead of names
- URL-encode special characters (`+` → `%2B`, space → `%20`)

**Error**: `Forbidden` during deployment

*Causes*:
1. User lacks `SpaceDeveloper` role
2. User from wrong identity provider

*Solutions*:
- Verify user roles: `cf space-users <org> <space>`
- Use OAuth2Password auth for custom IdP users

### SAP Support

**Component**: `BC-CP-LCM-TMS` (Transport Management for application content)

**Required for incidents**: Region, subaccount ID, reproduction steps, transport action logs, screenshots

For detailed troubleshooting steps, error catalogs by content type, and support procedures, see `references/troubleshooting.md`.

## Security

### Service Plans for API Access

| Plan | Access Level |
|------|-------------|
| `standard` | Full API access |
| `export` | Export actions only (CI/CD) |
| `transport_operator` | Import, reset, forward, delete only |

### Node-Specific Restrictions

Use attributes to restrict roles to specific nodes:
- `TmsNodesTransportOperator`
- `TmsNodesImport`
- `TmsNodesExport`

### Malware Scanning

TMS does not perform malware scans - target applications are responsible. Exception: MTA deployment descriptors are verified.

## Integrations

### CI/CD Integration

Use SAP Continuous Integration and Delivery or Project Piper with the `export` service plan.

### Alert Notifications

Configure `ALERT_NOTIFICATION_SERVICE` destination for:
- `TmsImportFinished` / `TmsImportStarted`
- `TmsTransportRequestAdded`
- `TmsNodeImportJobDeactivated`
- `TmsStorageQuotaUsage` (85% threshold)

### API Operations

1. **File Upload**: Upload content archive
2. **Node Export**: Attach file to new request, forward to target nodes
3. **Node Upload**: Upload to specific node (CI/CD scenarios)
4. **Import operations**: Async - monitor with Get transport action

## Reference Documentation

For detailed configuration procedures, see the reference files:

---

## Bundled Resources

### Reference Documentation
- `references/initial-setup.md` - Complete setup procedures
- `references/landscape-configuration.md` - Nodes, routes, visualization, and wizard
- `references/destinations.md` - All 8 destination types with configurations
- `references/import-operations.md` - Import queue, MTA descriptors, modifiable requests
- `references/administration.md` - Service plans, backup, storage, data export
- `references/troubleshooting.md` - Error resolution guide
- `references/integrations.md` - Integration scenarios and API operations
- `references/security-roles.md` - Role and permission details

## Documentation Links

- **GitHub Docs**: [https://github.com/SAP-docs/sap-btp-cloud-transport-management](https://github.com/SAP-docs/sap-btp-cloud-transport-management)
- **SAP Help Portal**: [https://help.sap.com/docs/cloud-transport-management](https://help.sap.com/docs/cloud-transport-management)
- **API Reference**: [https://api.sap.com/package/TmsForCloudPub/rest](https://api.sap.com/package/TmsForCloudPub/rest)

---

*Last Updated: 2025-11-22*
*Source: SAP-docs/sap-btp-cloud-transport-management*
