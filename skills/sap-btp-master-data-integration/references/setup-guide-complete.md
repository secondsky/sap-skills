# Complete Setup and Administration Guide

Comprehensive setup and administration documentation for SAP Master Data Integration.

**Source**: https://github.com/SAP-docs/sap-btp-master-data-integration/tree/main/docs/initial-setup-and-administration

---

## Technical Prerequisites

### Account Hierarchy

```
Global Account (Enterprise)
    └── Subaccount (in supported region)
            └── Space (Cloud Foundry)
```

### Requirements

| Requirement | Details |
|-------------|---------|
| Global Account | SAP BTP Enterprise account (**Trial/Free Tier NOT supported**) |
| Environment | Cloud Foundry |
| Subaccount | Must be in supported region |
| Space | Required within subaccount |

### Supported Regions

| Region | Code | Location |
|--------|------|----------|
| Europe | EU10 | Frankfurt |
| US East | US10 | Virginia |
| Australia | AP10 | Sydney |
| Asia Pacific | AP11 | Singapore |

---

## Tenant Management

### Creating Tenants

**Prerequisites**:
- Global enterprise account (no trial/free tier)
- Subaccount in supported region

**Steps**:
1. Create subaccount in available region
2. Subscribe to "SAP Master Data Integration Tenant application"
3. Create service instances for client connectivity

### Key Limitations

| Constraint | Details |
|------------|---------|
| One tenant per subaccount | Cannot host multiple tenants in single subaccount |
| Data isolation | Neither data nor configuration shared between tenants |
| Dedicated subaccount | Recommended exclusively for MDI tenant |

### Multi-Tenant Strategy

**Recommended**: Three-tenant model for development lifecycle:
- **Development** tenant (separate subaccount)
- **Test** tenant (separate subaccount)
- **Production** tenant (separate subaccount)

**Production**: Single tenant recommended to maintain data consistency across connected applications.

### Deleting Tenants

**28-Day Retention**: Deleted data retained for 28 days before permanent deletion.

**Protection Mechanism**: Deleting the last service instance triggers tenant deletion warning. To proceed:
```json
{
  "enableTenantDeletion": true
}
```

---

## Connecting Applications

### Critical Rule
**Every application MUST use its own dedicated service instance.** Sharing instances causes unexpected behavior and inconsistencies.

### Why NOT to Use Subscriptions

SAP Master Data Integration **must NOT be consumed via subscription mechanism**.

**Reasons**:
- Flexibility issues for MDI operations
- Configurability constraints
- Security concerns for master data handling

**Always use**: Service instances with explicit configuration.

### Service Instance Creation

**Step 1: Navigate**
Services → Service Marketplace → Master Data Integration

**Step 2: Configure**

| Setting | Value |
|---------|-------|
| Runtime Environment | Other |
| Service Plan | See below |
| Instance Name | Descriptive (identify application) |

**Step 3: Set Parameters**

```json
{
  "application": "<application-code>"
}
```

### Service Plans

| Plan | Target | Cost | Requirements |
|------|--------|------|--------------|
| sap-integration | SAP cloud apps | FREE | Default entitlement |
| s4hana-onpremise | S/4HANA On-Premise | PAID | CPEA-enabled account |

### Application Codes

| Application | Code |
|-------------|------|
| SAP S/4HANA Cloud | `s4` |
| SAP Ariba | `ariba` |
| SAP SuccessFactors | `sfsf` |
| SAP Fieldglass | `fieldglass` |
| SAP Commerce Cloud | `commerce` |
| SAP Cloud for Customer | `c4c` |

*Check application-specific documentation for exact codes.*

### Service Binding Best Practices

**Naming Convention**: Include creation date for tracking
```
ValidFrom_20240501
```

**Benefits**:
- Track credential age
- Assess security incident timelines
- Plan rotation schedules

---

## Client Configuration Attributes

### businessSystemId

| Property | Details |
|----------|---------|
| Purpose | Display name in Business Data Orchestration UI |
| Required for | SOAP API integration with business partners |
| Max Length | 60 characters |
| Characters | Alphanumeric, underscore, hyphen |
| Uniqueness | Must be unique per tenant |

**Important**: Cannot change after SOAP replication starts.

```json
{
  "businessSystemId": "S4HCLOUD_PRD"
}
```

**Configuration via Generic API** (alternative to UI):
```http
POST <BASE_URL>/businesspartner/v0/odata/API_GENERIC_CONFIGURATIONS/GenericConfigurations

{
  "ConfigurationName": "Business System",
  "ConfigurationValue": "<Business System Name>"
}
```

**Alignment Required With**:
- DRF business system names (S/4HANA On-Premise)
- Communication System UI (S/4HANA Cloud)
- `RecipientBusinessSystemID` in SOAP payloads

### writePermissions

Controls create/modify/delete authorization per entity type.

```json
{
  "writePermissions": [
    { "entityType": "sap.odm.finance.costobject.CostCenter" },
    { "entityType": "sap.odm.businesspartner.BusinessPartner" }
  ]
}
```

**Principle**: Least privilege - grant only required permissions.

**Requirement (2022+)**: Write permissions must be explicitly configured when connecting clients.

### globalTenantId

| Property | Details |
|----------|---------|
| Purpose | Identifies last significant writer on Events API |
| Length | 1-40 characters |
| Characters | Alphanumeric, -, ., _, ~ |
| When to use | Only if application documentation requires |

```json
{
  "globalTenantId": "tenant-identifier"
}
```

### logSys

| Property | Details |
|----------|---------|
| Purpose | Logical system of last significant writer |
| Max Length | 10 characters |
| When to use | Only if application documentation requires |

```json
{
  "logSys": "S4CLOUD"
}
```

---

## Connecting Specific Systems

### S/4HANA Cloud (via Communication Arrangements)

**Communication Arrangements Required**:
- **SAP_COM_0659**: Master Data Integration
- **SAP_COM_0594**: Business Data Orchestration (inbound only)

**Steps**:
1. Create service instance with `application: "s4"`
2. Create service binding
3. Configure communication arrangement in S/4HANA Cloud
4. Set up BTP destination

### S/4HANA On-Premise (via drfimg)

**Transaction**: `drfimg`

**Step 1 - Technical Settings**:
1. Define business system (subdomain from BTP Cockpit)
2. Add entry 986 for Business Partner with Relationships
3. Set "Replication via Services" as channel
4. Add entry 1376 for key mapping (optional)

**Step 2 - Replication Model**:
1. Create model with description
2. Assign outbound implementation: `986_3 Outbound Impl. for BP/REL via Services`
3. Set target systems and PACK_SIZE_BULK
4. Activate model

**Reference**: SAP Note 3065614

### SOAP Applications

**Prerequisites**:
1. businessSystemId configured
2. SOAP endpoints accessible
3. Destinations configured

**Required Destinations** (per businessSystemId):
- `{businessSystemId}_BPOUTBOUND`
- `{businessSystemId}_BPCONFIRM`
- `{businessSystemId}_BPRELOUTBOUND`
- `{businessSystemId}_BPRELCONFIRM`
- `{businessSystemId}_KMOUTBOUND`
- `{businessSystemId}_KEYMAPCONFIRM`

**Max Destinations**: 6 per unique client connection

---

## Authentication Methods

### OAuth2 Client Credentials (Default)

Automatically created during service binding.

**Token Request**:
```bash
curl --request POST "$xsuaa_url/oauth/token" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --user "$client_id:$client_secret" \
  --data-urlencode "grant_type=client_credentials"
```

### Mutual TLS with X.509 Certificates (Recommended)

**Configuration**:
```json
{
  "xsuaa": {
    "credential-type": "x509",
    "x509": {
      "key-length": 2048,
      "validity": 7,
      "validity-type": "DAYS"
    }
  }
}
```

**Validity Types**: DAYS, MONTHS, YEARS

**Token Endpoint**: `<uaa.certurl>/oauth/token` (different from client credentials)

**Important**: Authentication only works while certificate is valid. Renewal requires recreating service binding.

### Externally-Managed Certificates

| Parameter | Default | Description |
|-----------|---------|-------------|
| ensure-uniqueness | false | Enforce certificate uniqueness |
| certificate-pinning | true | When false, allows DN comparison for rotation |

---

## Business User Authentication

### Roles Required

| Role | Purpose |
|------|---------|
| BusinessConfigurationAdmin | Configuration tasks |
| ExtensionDeveloper | Extensibility tasks |

**Assignment**: Via BTP Cockpit role collections

### Authentication Flows

**Passcode Flow (Recommended)**:
1. Visit `$xsuaa_url/passcode`
2. Obtain passcode
3. Exchange via POST with service instance credentials

**Password Flow**:
Direct authentication with username/password plus service instance credentials.

---

## Distribution Model Configuration

### Creating Models (Business Data Orchestration UI)

1. Access Fiori Launchpad
2. Select "Manage Distribution Model"
3. Create model with:
   - Provider (sender)
   - Consumer (receiver) identified by businessSystemId
   - Business Object Type
   - API selection (REST or SOAP)
   - Package size
   - Scheduling

### Model Constraints

- BP Relationship model requires active BP model
- Cannot deactivate BP model with active BP Relationship model

### Filters

| Type | Purpose |
|------|---------|
| Object Selection | Which records to replicate |
| Data Scope | Which parts of records to replicate |

---

## Disconnecting Applications

**Steps**:
1. Deactivate distribution models using the client
2. Delete service binding
3. Delete service instance

**Data Cleanup**: Proactively delete master data no longer needed by remaining clients (not automatic).

---

## SAP Cloud ALM Monitoring

**Recommendation**: Use SAP Cloud ALM for monitoring MDI and data flow processing.

**Setup**:
1. Subscribe to SAP Cloud ALM
2. Register clients for SAP Passport Event acceptance
3. Configure mapping between MDI service instances and Cloud ALM services

**Do NOT**:
- Disable SAP Passport Events
- Filter SAP Passport Events

---

## Version History (What's New)

### 2024
- Business Data Orchestration rebranding (from Master Data Orchestration)
- Client certificate authentication for ABAP environment
- Display Clients feature (read-only client information)

### 2023
- 5 new ODM entities: ExchangeRate 4.0.0, Equipment 5.1.0, FunctionalLocation 5.0.0, Product 5.0.0
- GTID configuration (`globalTenantId`)
- `logSys` metadata for last significant writer
- Two service plans with pricing structure
- Service degradation incident (Note 3344090)

### 2022
- Extensibility v1 API (unified REST, SOAP, ODATA)
- Mandatory write permissions for new clients
- BusinessConfigurationAdmin role requirement
- v0 Extensibility API deprecated
- SOAP APIs for Product decommissioned

### 2021
- **December**: ODM 3.0.0 entities exposed to production
- **November**: SAP One Domain Model adoption ("MDI is based on the SAP ODM")
- **November**: Extension fields creation with SOAP mapping for BP services
- **November**: Destination mapping configuration (MDI ↔ SAP Cloud ALM)
- **November**: Distribution status monitoring with replication retry
- **June**: Product replication via distribution models
- **June**: BP distribution model configuration
- **May**: BP deletion via SOAP + SAP Data Retention Manager
- **May**: SOAP API for Business Partner replication
- **May**: Manage Data Ownership app (system-level ownership assignment)
- **May**: Cost center filtering + Business Context Manager data category support

**Business Data Orchestration Apps (2021)**:
- Manage Data Ownership - specify ownership at object type level
- Configure Destination Mapping - map between MDI and Cloud ALM
- Display Distribution Status - monitor with retry functionality
- Manage Business Object Type - extension fields with SOAP mapping

---

## Documentation Links

- **Initial Setup**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/initial-setup-and-administration
- **Creating Tenants**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/creating-tenants
- **Connecting Applications**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/connecting-applications
- **Authentication**: https://help.sap.com/docs/master-data-integration/sap-master-data-integration/authentication-and-authorization
