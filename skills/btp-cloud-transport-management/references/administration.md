# SAP Cloud Transport Management - Administration Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/tree/main/docs/50-administration

---

## Administration Tasks Overview

Account administrators perform the following ongoing tasks:

1. Configure transport landscape (destinations, nodes, routes)
2. Grant user roles
3. Configure archiving settings
4. Set up notifications (via Alert Notification Service)
5. Plan backup strategy
6. Manage storage space
7. Update service plan
8. Monitor service activities

---

## Monitoring

### Home Screen Dashboard

Provides overview of:
- All imports (pie chart with selectable time intervals)
- Pending transports (Top n Nodes with importable requests)
- Storage usage (capacity and consumption)
- Deactivated import schedules

### Activity Logs

| Log Type | Purpose |
|----------|---------|
| Transport Action Logs | Track all transport operations |
| Landscape Action Logs | Detect configuration changes |
| Audit Logs | Security monitoring |

### Alert Notifications

Configure SAP Alert Notification Service for:
- Service actions (import start/finish, request added)
- Storage threshold warnings (85% quota)

### API-Based Monitoring

**API Endpoint**: https://api.sap.com/api/TMS_v2/overview

Use for:
- Custom monitoring scripts
- Automated transport log retrieval
- Integration with external monitoring tools

### Recommended Practices

Regularly review:
1. Home screen dashboard
2. Transport action logs
3. Landscape action logs
4. Audit logs
5. Storage quota

---

## Service Plan Updates

### Supported Upgrade Paths

| Current Plan | Target Plan | Prerequisite |
|--------------|-------------|--------------|
| `free` | `standard` | `standard` application plan entitlement |
| `build-code` | `build-runtime` | `build-runtime` application plan entitlement |
| `free` | `build-runtime` | `build-runtime` application plan entitlement |
| `standard` | `build-runtime` | `build-runtime` application plan entitlement |

### Update Procedure

1. Navigate to **BTP Cockpit > Subaccount > Services > Instances and Subscriptions**
2. Expand Cloud Transport Management row (arrow control)
3. Select three-dot menu next to **Go to Application**
4. Choose **Update**
5. In **Update Subscription** dialog:
   - Select target application plan
   - Click **Update Subscription**

### Reference

Service plans: SAP Discovery Center Service - Cloud Transport Management

---

## Customer Data Export

### Built-In Export Functions

Three download capabilities in TMS UI:

| Export Type | Description |
|-------------|-------------|
| Transport Action Logs | Download transport-related logs and archived logs |
| MTA Extension Descriptors | Download `.mtaext` files |
| Landscape Configuration | Export nodes, routes, and properties |

### Data Handling

- Service does not modify uploaded content
- Content persisted only for deployment/import tasks
- Content removed after operations complete
- **Recommendation**: Maintain independent content repositories

### Decommissioning Export

For service termination, formal customer data export process available.

**Requirements**:
- Export must occur before purging phase
- Review Terms and Conditions for timeline
- Submit incident via component: `BC-CP-LCM-TMS`
- Subject prefix: `Customer Data Export Request`

---

## Backup Configuration

### Data Storage Locations

| System | Contents |
|--------|----------|
| PostgreSQL | Landscape configuration, transport requests, log files |
| Object Store | Uploaded files (MTAs), archived transport action logs |

### Automatic Backup

**PostgreSQL**:
- Retention: 14 days
- Restore: Datacenter level only (not individual customers)

**Object Store**:
- No backup/restore functions

### Manual Backup Options

When automatic backup insufficient:

1. **Transport logs**: Download from system
2. **MTA extension descriptors**: Download available
3. **Landscape configuration**: Export function

**Note**: Recreation of MTA from specific commit is typically feasible; accessing uploaded files post-transport usually unnecessary.

---

## Transport Action Log Archiving

Configure archiving settings for transport action logs.

### Access

Transport Action Logs > Settings (gear icon) > Configure Archiving Settings

### Default Settings

- **Archiving Frequency**: Every 13 weeks (quarterly)
- **Data Retention**: 7 years (actions older than this are archived)
- **Archived Location**: Archived Logs tab in Transport Action Logs

### Configuration Options

| Setting | Options | Default |
|---------|---------|---------|
| Mode | Archive, Delete | Archive |
| Retention Period | 1-7 years | 7 years |
| Archiving Schedule | Adjustable intervals (weekly to 52-week) | 13 weeks |
| User Anonymization | Checkbox | Disabled |

**Mode**:
- **Archive**: Moves older actions to secondary storage, then removes from database
- **Delete**: Permanently removes actions without archival

**User Data Anonymization**:
- Replaces usernames and email addresses with `***<anonymized>***`
- **Irreversible** once applied

### Implementation

1. Navigate to Transport Action Logs
2. Select settings (gear) icon
3. Adjust parameters in dialog
4. Save changes

**Note**: Archiving runs as background jobs, logged in Landscape Action Logs.

---

## Storage Management

> **Cross-reference**: For storage capacity impact on import operations, see `import-operations.md` → Storage Capacity section.

### Capacity Limits

| Plan | Total Capacity | File Limit | Default Retention |
|------|----------------|------------|-------------------|
| Standard | 50 GB | 1 GB | 30 days |
| Free | 500 MB | 500 MB | 7 days |

### Partner-Managed Edition (China/US Gov)

| Plan | Total Capacity | File Limit | Default Retention |
|------|----------------|------------|-------------------|
| Standard | 10 GB | 400 MB | 30 days |
| Free | 500 MB | 400 MB | 7 days |

### Retention Configuration

- **Standard**: Configurable 1-30 days
- **Free**: Configurable 1-7 days
- Access via **Settings > File Retention Time**

### Automatic Cleanup

Files deleted when:
- Transport requests reach final status (Deleted, Error, Skipped, Succeeded, Warning)
- Retention period elapsed since last action

Files **NOT** deleted if status is: Fatal, Initial, Repeatable, Running

### Capacity Alerts

- **Warning**: 85% capacity threshold
- **Blocked**: No uploads when maximum reached
- Enable notification via **Settings > My File Quota > Enable Notification**

### Freeing Space

- Delete unnecessary transport requests
- Reduce retention time
- Upgrade service plan

---

## Transport Action Logs

### Access

Home Screen > Transport Action Logs

### Logged Actions

- Import to Node
- File Upload
- Upload to Node
- Delete Queue Entry
- Repeat Queue Entry
- Export to Node
- Add Queue Entry
- Forward Queue Entry

### Information Columns

| Column | Description |
|--------|-------------|
| Node | Transport node name |
| Action Type | Operation performed |
| User | User who executed action |
| Status | Result status |
| End Time | Completion timestamp |

### Filtering

- Node
- Action Type
- User
- Status
- End Time (date picker)

### Additional Features

- **Include Archived**: Show archived actions
- **Refresh expired actions**: Manually refresh running import statuses
- **Download**: Plain Text or CSV (selected or all)

### Archiving

- Default: Archive actions older than 7 years every 13 weeks
- Configure via gear icon

---

## Home Screen Features

### Import Overview

- Pie chart with import data
- Selectable time intervals
- Direct navigation to Transport Action Logs

### Top n Nodes

Lists nodes with highest importable requests (Initial, Fatal, Repeatable).
Click to navigate to import queue.

### Storage Usage

Displays maximum capacity and current consumption.

### Import Schedules

Lists queues where scheduled import failed 3+ times consecutively over 3+ weeks.
Schedules auto-deactivated; requires manual reactivation.

---

## Settings Menu

### File Quota

- Storage information
- 85% capacity threshold notification option

### File Retention Time

- View/adjust retention period
- Based on service plan

### About

- Current version information

---

## User Profile Options

### Language

- Chinese
- English
- Browser default detection

### Appearance Themes

- Horizon (default)
- Belize
- Standard Light
- Standard Dark
- High Contrast Black

---

## Documentation Links

- Administration: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/50-administration/administration-1fe3030.md
- Storage Capacity: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/50-administration/background-information-storage-capacity-e8d5187.md
- Backup: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/50-administration/configuring-backup-8d15541.md
- Service Plan Update: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/50-administration/updating-the-service-plan-1717e87.md
- Data Export: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/60-security/customer-data-export-11365bf.md
