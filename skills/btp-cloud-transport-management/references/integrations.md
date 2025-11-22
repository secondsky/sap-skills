# SAP Cloud Transport Management - Integrations Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/70-integrations/integrating-the-service-7e966f7.md

---

## Overview

SAP Cloud Transport Management integrates with development and change management processes through:
1. Documented partnerships with SAP BTP services
2. Customizable APIs on SAP Business Accelerator Hub

---

## Integration Scenarios

### 1. SAP Continuous Integration and Delivery

**Purpose**: Receive transports from release candidates qualified by automated pipelines

**Resources**:
- Official CI/CD service documentation
- Integration guides for embedding TMS into CI/CD jobs
- Blog posts on TMS + CI/CD pipeline integration
- Tutorial videos on DevOps with SAP BTP

**Service Plan**: Use `export` instance plan for CI/CD pipelines

---

### 2. Project Piper Integration

**Purpose**: Integrate TMS into CI/CD pipelines using Project Piper framework

**Implementation**:
- Use Project Piper's TMS integration steps
- Configure pipeline stages for transport operations

---

### 3. Hybrid Landscapes with CTS+

**Purpose**: Combine cloud and on-premise transport management

**Components**:
- CTS+ (Change and Transport System)
- Change Request Management (ChaRM)
- Hybrid environment support

---

### 4. SAP Automation Pilot

**Purpose**: Automate transport management through command catalogs

**Capabilities**:
- Manage transport nodes
- Manage transport routes
- Manage transport requests

---

### 5. SAP Solution Manager Integration

**Purpose**: Coordinate change control across systems

**Supported Features**:
- Change Request Management
- Quality Gate Management
- Controlled deployment workflows

---

### 6. SAP Cloud ALM Integration

**Purpose**: Enable change and deployment management capabilities

**Resources**:
- Blog posts on Cloud ALM interplay
- Specific scenarios (MTA transport from Neo)

---

### 7. SAP Alert Notification Service

**Purpose**: Receive alerts and notifications for TMS actions

**Setup Requirements**:

1. **Entitle Alert Notification service** in global account
2. **Create service instance** in Cloud Foundry space
3. **Create destination** named `ALERT_NOTIFICATION_SERVICE`:

| Field | Value |
|-------|-------|
| Type | HTTP |
| Proxy Type | Internet |
| Authentication | OAuth2ClientCredentials |
| URL | From Alert Notification service key |
| Client ID | From service key |
| Client Secret | From service key |
| Token Service URL | From service key |

4. **Configure destination** in each TMS-subscribed subaccount

**Notification Events**:

| Event | Description |
|-------|-------------|
| `TmsImportFinished` | Import completed |
| `TmsImportStarted` | Import started |
| `TmsTransportRequestAdded` | Request added to queue |
| `TmsNodeImportJobDeactivated` | Scheduler disabled due to failures |
| `TmsStorageQuotaUsage` | Storage exceeded 85% threshold |

**Enable Notifications**:
- **Node level**: Select "Perform Notification" when creating node
- **Storage**: Select "Enable Notification" in user profile settings

**Notification Channels**:
- Email
- Slack
- Other supported channels

**Filtering**:
- `eventType` = specific event
- `tags.nodeId` = specific transport node

**Actionable Links**: Import finished and request added notifications include links for:
- Display transport request
- Forward request
- Initiate import

---

### 8. SAP Content Agent Service

**Purpose**: Receive transport requests of Cloud Foundry content

**Flow**:
1. Content assembled in source environment
2. Exported using SAP Content Agent service
3. Transported via TMS to target environments

**Supported Content**:
- SAP Integration Suite artifacts
- API Management artifacts

---

### 9. SAP Solution Lifecycle Management

**Purpose**: Transport Neo content gathered via Solution Export Wizard

**Flow**:
1. Content gathered in Neo source
2. Exported using Solution Export Wizard
3. Transported via TMS

---

## API Integration

### Available APIs

- **Cloud Transport Management API**: Full transport operations
- **Cloud Transport Management Version Endpoint API**: Version information

**Reference**: https://api.sap.com/package/TmsForCloudPub/rest

---

### API Operations for Export

#### File Upload

**Purpose**: Upload content archive to TMS

**When**: First operation for file-based transport

**Returns**: File ID for subsequent operations

#### Node Export

**Purpose**: Enable transport directly from application

**Flow**:
1. Uploaded file or reference attaches to new transport request
2. Request added to import queues of follow-on nodes

**Use Case**: Direct application-to-TMS integration

#### Node Upload

**Purpose**: Upload archives to first transport node or specific subaccounts

**Use Case**: CI/CD scenarios, external archive upload

**Flow**:
1. Upload MTA to specific node
2. Request created in that node's queue

---

### API Operations for Import

| Operation | Description |
|-----------|-------------|
| Import | Import specific transport requests |
| Import All | Import all requests in node |
| Forward | Forward requests to target nodes |
| Reset | Reset request status for re-import |
| Delete | Remove requests from queues |

---

### Monitoring Operations

#### Get Transport Action

**Purpose**: Monitor async operations

**Flow**:
1. Initiate import (async operation)
2. Poll action status via Get transport action
3. Check for completion

#### Get Transport Requests

**Purpose**: Retrieve transport request details

#### Get Transport Logs

**Purpose**: Access detailed operation logs

---

### Asynchronous Processing

**Important**: Imports are typically asynchronous operations.

**Pattern**:
```
1. Initiate import operation → Returns action ID
2. Poll Get transport action with action ID
3. Check status (Running, Succeeded, Error, etc.)
4. Retrieve logs if needed
```

---

### Reference-Based Transport

**Alternative to file upload**: Transport based on reference without file upload.

**Use Cases**:
- BTP ABAP (Git repository references)
- Other reference-based content types

**Reference Contents**:
- Software component name
- Commit ID
- Branch name
- Tag name

---

## Sample Integration Workflow

### CI/CD Pipeline Integration

```
1. Build MTA in CI/CD pipeline
2. Call File Upload API with MTA
3. Call Node Export/Upload API with file ID
4. TMS creates transport request
5. Request appears in target node queue
6. Import (manual, scheduled, or automatic)
7. Deployment to target environment
```

### Application Direct Integration

```
1. User selects content for transport in application
2. Application calls TMS destination
3. TMS receives content via API
4. Transport request created
5. Forwarded to target nodes per routes
6. Operations team imports in target
```

---

## Integration Service Plans

| Plan | Use Case |
|------|----------|
| `standard` | Full integration, Cloud ALM, Solution Manager |
| `export` | CI/CD pipelines, file upload only |
| `transport_operator` | Import operations only |

---

## Documentation Links

- Integrating the Service: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/70-integrations/integrating-the-service-7e966f7.md
- Alert Notifications: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/receive-notifications-for-sap-cloud-transport-management-actions-using-sap-alert-notifica-95d4fc7.md
- API Reference: https://api.sap.com/package/TmsForCloudPub/rest
