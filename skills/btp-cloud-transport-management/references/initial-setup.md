# SAP Cloud Transport Management - Initial Setup Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/tree/main/docs/10-initial-setup

---

## Prerequisites

- Global account administrator status
- Established global account with at least one SAP BTP subaccount
- Cloud Foundry environment familiarity (see "Getting Started in the Cloud Foundry Environment")

**Recommendation**: Deploy as a shared service on a central administrative subaccount to:
- Simplify role management
- Enforce strict access controls
- Avoid conflicts with SAP Cloud ALM subaccount

---

## Step 1: Configure Entitlements

**Location**: Global Account > Entitlements > Entity Assignments

### Procedure

1. Navigate to or create the target subaccount
2. Enable Cloud Foundry in the subaccount:
   - In Cloud Foundry section, select **Enable**
   - Enter organization name
   - Choose **Create**
3. Go to **Entitlements > Entity Assignments**
4. Search for and select the target subaccount
5. Choose **Configure Entitlements**
6. Select **Add Service Plans**
7. Search for "Cloud Transport Management"
8. Select desired plans from the Service Details section
9. Click **Add [n] Service Plans**
10. **Save** the configuration

### Available Service Plans

#### Application Plans (UI Access)

| Plan | Purpose |
|------|---------|
| `build-runtime` | SAP Build ecosystem content transport via UI |
| `free` | Reduced-scope UI access for testing (500MB storage, 7-day retention) |
| `standard` | Full UI access (50GB storage, 30-day retention) |

#### Instance Plans (Programmatic/API Access)

| Plan | Authorization Level | Use Cases |
|------|---------------------|-----------|
| `standard` | Full access | Default integrations, SAP Cloud ALM, Solution Manager |
| `export` | Export actions only | File upload, node upload/export, CI/CD pipelines |
| `transport_operator` | Transport operations only | Import, reset, forward, delete actions |

### Selection Scenarios

**Scenario 1 - Local File System Archives Only**:
- Select one application plan (e.g., `standard`)

**Scenario 2 - Direct Application-to-Application Transport**:
- Select one application plan
- Select one or more instance plans for programmatic access
- Note: Instance plans require an active application plan

---

## Step 2: Subscribe to the Service

**Location**: Subaccount > Services > Service Marketplace

### Procedure

1. Navigate to the target subaccount
2. Select **Services > Service Marketplace**
3. Search for "Cloud Transport Management"
4. On the Cloud Transport Management tile, select **Actions > Create**
5. In the dialog, select a subscription plan:
   - `build-runtime` (SAP Build ecosystem)
   - `free`
   - `standard`
   - Ensure plan type is **Subscription**
6. Click **Create**
7. When the subscription dialog appears, choose **View Subscription**
8. Confirm status displays as **Subscribed**

### Post-Subscription

- Access subscriptions: **Services > Instances and Subscriptions**
- Plan upgrades available through update service plan process

---

## Step 3: Set Up Role Collections

**Location**: Subaccount > Security > Role Collections

### Pre-Delivered Role Collections

SAP provides two ready-to-use collections:
- `TMS_LandscapeOperator_RC` (LandscapeOperator role)
- `TMS_Viewer_RC` (Viewer role)

### Available Role Templates

| Role | Capabilities |
|------|-------------|
| **Administrator** | Overall administration for all SAP Cloud Transport Management tasks, manage import queues, forward requests, reset transport request statuses |
| **LandscapeOperator** | Create, edit, delete transport nodes and transport routes |
| **TransportOperator** | Remove files, forward requests, reset statuses, upload MTA descriptors, schedule imports |
| **ImportSelectedOperator** | Start import of selected requests in import queue |
| **ImportOperator** | Start import of all transport requests, test modifiable requests |
| **ExportOperator** | Add files to import queues, create modifiable transport requests |
| **Viewer** | Display-only access without landscape configuration or import capabilities |

### Setup Procedure

1. **Locate delivered roles**:
   - Navigate to **Services > Instances and Subscriptions**
   - Select **Cloud Transport Management > Manage Roles**

2. **Create role collections**:
   - Go to **Security > Role Collections**
   - Select the plus icon
   - Enter collection names

3. **Assign roles to collections**:
   - Return to subscription's **Roles** tab
   - Select plus icon next to desired template roles
   - Choose target role collections

4. **Assign collections to users**:
   - Go to **Security > Role Collections**
   - Select collection > **Edit > Users** tab
   - Enter user data per your identity provider requirements

**Recommendation**: Add roles from the **Roles** tab of the subscription details to see all relevant template roles in one location.

---

## Step 4: Create Service Instance and Service Key

**Location**: Subaccount > Services > Instances and Subscriptions

Required for programmatic/API access.

### Procedure

1. **Select subaccount**:
   - Use a central administrative subaccount (not SAP Cloud ALM subaccount)

2. **Create Cloud Foundry space**:
   - Navigate to your subaccount's Cloud Foundry organization
   - Create a new space with default space roles assigned

3. **Optional: Create quota plan**:
   - Access **Cloud Foundry > Quota Plans > New Plan**
   - Specify name and minimum of one service
   - Assign plan to your created space

4. **Create service instance**:
   - Navigate to **Services > Instances and Subscriptions > Create**
   - Configure:

   | Field | Selection |
   |-------|-----------|
   | Service | Cloud Transport Management |
   | Plan | Instance-type plan (e.g., `standard`) |
   | Runtime Environment | Cloud Foundry |
   | Space | Previously created space |
   | Instance Name | User-defined name |

   - Note: TMS doesn't support initial JSON parameters - skip this step

5. **Generate service key**:
   - From the Instances tab, select **Actions > Create Service Key**
   - The resulting credentials structure:

```json
{
    "uaa": {
        "clientid": "sb-xxxxxx",
        "clientsecret": "xxxxxx",
        "url": "https://<domain>.authentication.sap.hana.ondemand.com"
    },
    "uri": "https://transport-service-app-backend.ts.cfapps.sap.hana.ondemand.com"
}
```

These credentials enable API-based programmatic access and are used to configure destinations.

---

## Integrated SAP Solutions (21 Supported)

### Build & Development Platform
- Joule Studio in SAP Build
- SAP Build Apps
- SAP Build Process Automation
- SAP Build Work Zone (standard & advanced)

### Analytics & Data
- SAP Analytics Cloud
- SAP Datasphere

### Integration & APIs
- SAP Integration Suite
- SAP API Management

### Process & Automation
- SAP Digital Manufacturing
- SAP Cell and Gene Therapy Orchestration

### Enterprise Solutions
- SAP BTP ABAP environment
- SAP Mobile Services

### Domain-Specific Solutions
- SAP Asset Performance Management
- SAP Batch Release Hub for Life Sciences
- SAP Cloud for Real Estate
- SAP Entitlement Management
- SAP Excise Tax Management
- SAP Group Reporting Data Collection
- SAP Intelligent Clinical Supply Management
- SAP Risk and Assurance Management

---

## Documentation Links

- Initial Setup Overview: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/10-initial-setup/initial-setup-66fd728.md
- Subscribing: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/10-initial-setup/subscribing-to-cloud-transport-management-7fe10fc.md
- Entitlements: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/10-initial-setup/configuring-entitlements-to-sap-cloud-transport-management-13894be.md
- Role Collections: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/10-initial-setup/setting-up-role-collections-eb134e0.md
- Service Instance: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/10-initial-setup/creating-a-service-instance-and-a-service-key-f449560.md
