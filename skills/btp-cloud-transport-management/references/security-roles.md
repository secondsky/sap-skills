# SAP Cloud Transport Management - Security & Roles Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/60-security/security-51939a4.md

---

## Role Templates

SAP Cloud Transport Management provides seven role templates for access management.

### 1. Administrator

**Scope**: Overall administration for all TMS tasks

**Capabilities**:
- Manage import queues
- Forward transport requests
- Reset transport request statuses
- Full landscape configuration
- All other role capabilities

---

### 2. LandscapeOperator

**Scope**: Transport infrastructure management

**Capabilities**:
- Create transport nodes
- Create transport routes
- Edit transport nodes and routes
- Delete transport nodes and routes

**Pre-delivered Collection**: `TMS_LandscapeOperator_RC`

---

### 3. TransportOperator

**Scope**: Import queue operations

**Capabilities**:
- Remove files from import queues
- Forward transport requests
- Reset transport request statuses
- Upload MTA extension descriptors
- Schedule imports
- Enable/disable automatic imports

**Node-Specific Attribute**: `TmsNodesTransportOperator`

---

### 4. ImportSelectedOperator

**Scope**: Selective import operations

**Capabilities**:
- Start import of selected requests in import queue

---

### 5. ImportOperator

**Scope**: Bulk import operations

**Capabilities**:
- Start import of all transport requests in import queue
- Test modifiable transport requests

**Node-Specific Attribute**: `TmsNodesImport`

---

### 6. ExportOperator

**Scope**: Export and upload operations

**Capabilities**:
- Add files to import queues
- Create modifiable transport requests

**Node-Specific Attribute**: `TmsNodesExport`

---

### 7. Viewer

**Scope**: Read-only access

**Capabilities**:
- View all TMS information
- No landscape configuration
- No import capabilities
- No modification capabilities

**Pre-delivered Collection**: `TMS_Viewer_RC`

---

## Pre-Delivered Role Collections

| Collection | Included Role |
|------------|---------------|
| `TMS_LandscapeOperator_RC` | LandscapeOperator |
| `TMS_Viewer_RC` | Viewer |

---

## Node-Specific Restrictions

Three roles support restricting operations to specific transport nodes.

### Attributes

| Role | Attribute |
|------|-----------|
| TransportOperator | `TmsNodesTransportOperator` |
| ImportOperator | `TmsNodesImport` |
| ExportOperator | `TmsNodesExport` |

### Usage

1. Create role from template
2. Add attribute with node name(s)
3. Assign to role collection
4. User can only operate on specified nodes

**Example**: Restrict TransportOperator to only DEV and TEST nodes.

---

## Service Plans for API Access

### Standard Plan

**Authorization Level**: Full access

**Capabilities**:
- All Cloud Transport Management API operations
- File upload, export, import, management

**Use Cases**:
- Default for standard integrations
- SAP Cloud ALM integration
- Solution Manager integrations

---

### Export Plan

**Authorization Level**: Export actions only

**Capabilities**:
- File upload
- Node upload
- Node export actions

**Use Cases**:
- CI/CD pipelines
- Solution Lifecycle Management
- External archive upload scenarios

**Restrictions**:
- Cannot import
- Cannot reset
- Cannot forward
- Cannot delete

---

### Transport Operator Plan

**Authorization Level**: Transport operations only

**Capabilities**:
- Import operations
- Reset operations
- Forward operations
- Delete operations

**Restrictions**:
- Cannot upload files
- Cannot export

---

## Role Assignment Matrix

| Action | Admin | Landscape | Transport | ImportSel | Import | Export | Viewer |
|--------|-------|-----------|-----------|-----------|--------|--------|--------|
| View all | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create nodes | ✓ | ✓ | | | | | |
| Create routes | ✓ | ✓ | | | | | |
| Edit nodes/routes | ✓ | ✓ | | | | | |
| Delete nodes/routes | ✓ | ✓ | | | | | |
| Add files | ✓ | | | | | ✓ | |
| Import all | ✓ | | | | ✓ | | |
| Import selected | ✓ | | ✓ | ✓ | | | |
| Forward requests | ✓ | | ✓ | | | | |
| Reset requests | ✓ | | ✓ | | | | |
| Remove from queue | ✓ | | ✓ | | | | |
| Schedule imports | ✓ | | ✓ | | | | |
| Upload MTA desc | ✓ | | ✓ | | | | |
| Create modifiable | ✓ | | | | | ✓ | |
| Test modifiable | ✓ | | | | ✓ | | |

---

## Security Features

### Malware Scanning

**Policy**: TMS does not perform malware scans on uploaded archives.

**Rationale**: Archives treated as "black box" content without processing or extraction.

**Exception**: MTA deployment descriptors are verified for malware-free content.

**Responsibility**: Target applications must perform malware scanning during deployment.

---

### Encryption

**Transport**: SSL/TLS for all communications (HTTPS only)

**Storage**: Archives and MTA extension descriptors are **NOT encrypted** by persistency layer

**Mitigation**: Archives are only temporarily persisted and deleted after the configured file retention period (7-30 days depending on plan) has elapsed since the transport reached a final status (Deleted, Error, Skipped, Succeeded, Warning). See Storage Management in administration.md for retention details.

---

### Audit Logging

**Category**: `audit.security-events`

**Events Logged**:

| Event | Description |
|-------|-------------|
| Cleanup service runs | Scheduled file cleanup executed |
| Authorization check failed | API call without sufficient scope |
| Subscription plan updated | Plan changed successfully |
| Subscription plan update failed | Plan change failed |

---

### Data Protection

**Capabilities**:
- Export transport action logs
- Export MTA extension descriptors
- Export landscape configurations

**Use Cases**:
- Data protection compliance
- Decommissioning processes
- Backup procedures

---

## Backup Configuration

### PostgreSQL (Main Database)

**Contents**: Landscape configuration, transport requests, log files

**Backup**: Automatic, 14-day retention

**Restore**: Datacenter level only (not individual customers)

### Object Store

**Contents**: Uploaded files (MTAs), archived transport action logs

**Backup**: No automatic backup/restore

### Manual Export Options

1. Transport-related logs download
2. MTA extension descriptors download
3. Landscape configuration export

---

## Best Practices

### Role Assignment

1. **Principle of least privilege**: Assign minimum required roles
2. **Separation of duties**:
   - Developers → ExportOperator
   - Operations → TransportOperator, ImportOperator
   - Admins → Administrator (sparingly)
3. **Node restrictions**: Use attributes to limit scope

### Technical Users

1. Use technical users for:
   - Destination authentication
   - CI/CD integrations
   - Automated operations

2. Benefits:
   - Avoid password rotation issues
   - No personal data considerations
   - Consistent authentication

### Security Monitoring

1. Review audit logs regularly
2. Monitor for authorization failures
3. Track subscription plan changes

---

## Documentation Links

- Security: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/60-security/security-51939a4.md
- Auditing: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/60-security/auditing-and-logging-information-9e3ee94.md
- Data Protection: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/60-security/data-protection-and-privacy-a2749d5.md
- Backup: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/50-administration/configuring-backup-8d15541.md
