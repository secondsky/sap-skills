# SAP BTP Job Scheduling Service - Operations Guide

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Service Dashboard](#service-dashboard)
2. [Service Behavior](#service-behavior)
3. [Backup and Restore](#backup-and-restore)
4. [Accessibility Features](#accessibility-features)

---

## Service Dashboard

### Overview

The dashboard enables management of jobs, tasks, and schedules for a service instance.

### Access Methods

**Via SAP BTP Cockpit:**
1. Navigate to subaccount
2. Go to **Services** → **Instances and Subscriptions**
3. Select Job Scheduling instance
4. Click **View Dashboard** (via Service Bindings)

**Via CF CLI:**
```bash
cf service <service-instance-name>
```

Dashboard URL appears in output.

### Required Roles

| Runtime | Role | Access Level |
|---------|------|--------------|
| Cloud Foundry | SpaceDeveloper | Full access |
| Cloud Foundry | SpaceAuditor/SpaceManager/OrgManager/SpaceSupporter | Read-only |
| Kyma | SAP_Job_Scheduling_Service_Admin | Full access |
| Kyma | SAP_Job_Scheduling_Service_Viewer | Read-only |

### Dashboard Features

#### Configuration Management

| Setting | Description | Max Value |
|---------|-------------|-----------|
| Async Timeout | Timeout for async job execution | 604,800 seconds (7 days) |

#### Job Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new job with action endpoint |
| Edit | Modify job properties |
| Deactivate | Disable job execution |
| Delete | Remove job and all data |
| Search | Filter by name, subdomain, tenant ID |
| Cloud ALM | Enable/disable monitoring |

#### Task Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new CF task |
| Edit | Modify task properties |
| Memory | Configure task memory (JSON options) |
| Alert Notification | Enable/disable alerts (CF only) |

#### Schedule Operations

| Operation | Description |
|-----------|-------------|
| Create | Add schedule to job/task |
| Edit | Modify schedule parameters |
| Activate/Deactivate | Enable/disable schedule |
| Delete | Remove schedule |
| View History | See execution history |
| View Run Logs | See detailed execution logs |

### Dashboard UI Elements

**Main Sections:**
- Configurations panel
- Jobs/Tasks listing
- Schedule creation interface
- Event history viewer
- Run logs display

**Column Features:**
- Sortable (ascending/descending)
- Resizable widths
- Job name navigation
- Full-name display option

### Downloading Run Logs

1. Select job in dashboard
2. Choose specific schedule
3. View run logs
4. Click download option

**Note:** Logs auto-delete after 15 days.

---

## Service Behavior

### Execution Timing

#### Service Level Agreement

Scheduled jobs have approximately **20-minute tolerance** from their scheduled execution time.

#### Outage Recovery

| Outage Duration | Behavior |
|-----------------|----------|
| < 20 minutes | All missed executions run immediately |
| >= 20 minutes | Only last missed execution runs |

**Rationale:** Prevents overwhelming target applications with excessive requests upon recovery.

### Schedule Auto-Deactivation

Schedules automatically deactivate when:

| Trigger | Description |
|---------|-------------|
| One-time executed | After successful or failed execution |
| No future dates | All possible execution times passed |
| endTime reached | Job or schedule end time in past |
| Endpoint unreachable | Action endpoint unreachable 10+ consecutive days |

### Request Handling

| Constraint | Value |
|------------|-------|
| POST body limit | 100 KB |
| 413 response | Body size exceeded |
| Timezone | UTC only |
| Pagination default | 10 items |
| Pagination max | 200 items |

### Data Retention

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| Run logs | 15 days | Auto-deleted |
| Jobs/Schedules | Indefinite | Until deleted |
| Configurations | Indefinite | Until instance deleted |

---

## Backup and Restore

### Capabilities

The service supports restoration of accidentally deleted items:

| Restorable | Not Restorable |
|------------|----------------|
| Job configurations | Run logs |
| Task configurations | Same-day deletions |
| Schedule configurations | - |

### Restored Item State

| Property | Restored Value |
|----------|----------------|
| active | `false` (requires manual reactivation) |
| All other settings | Original values |

### Restoration Time Windows

| Region | Maximum Window |
|--------|----------------|
| AWS | 14 days |
| Azure | 14 days |
| GCP | 7 days |

### Same-Day Limitation

**Jobs and schedules created, modified, or deleted on the same day cannot be restored** due to daily backup dependency.

### Restoration Procedures

#### For Deleted Service Instances

Submit SAP support case with:
- Tenant ID of subaccount
- Deletion timestamp
- Old instance GUID (from Space Events audit logs)
- New empty instance GUID for recovery

#### For Deleted Subscriptions

Submit SAP support case with:
- Tenant ID
- Deletion timestamp
- Provider instance GUID

Then:
1. Create new subscription
2. Wait for restoration completion

### Getting Instance GUID

**Via CF CLI:**
```bash
cf service <instance-name> --guid
```

**Via Audit Logs:**
1. Access Cloud Foundry audit logs
2. Filter for Space Events
3. Find DELETE event for service instance
4. Extract instance GUID from event details

---

## Accessibility Features

### UI Themes

The service offers four theme options:

| Theme | Description |
|-------|-------------|
| Morning Horizon | Default light theme |
| Evening Horizon | Dark theme |
| Horizon High Contrast Black | Accessibility - high contrast dark |
| Horizon High Contrast White | Accessibility - high contrast light |

### Changing Theme

1. Select email/profile in upper right corner
2. Choose **Change Theme**
3. Select preferred theme

### Screen Reader Support

Available through SAPUI5 accessibility framework:
- Screen reader compatibility
- Keyboard navigation options
- ARIA labels and roles

### BTP Cockpit Accessibility

Job Scheduling Service inherits accessibility features from SAP BTP cockpit:
- Keyboard shortcuts
- Focus management
- High contrast modes

### Documentation Resources

- SAP BTP Cockpit accessibility features (SAP Help Portal)
- SAPUI5 accessibility guidance for end users

---

## Operational Best Practices

### Scheduling

| Practice | Recommendation |
|----------|----------------|
| Avoid peak seconds | Don't use 0 or 30 |
| Avoid peak minutes | Don't use 0, 30, or multiples of 5 |
| Avoid top of hour | High demand periods |
| Avoid midnight UTC | Busiest time |
| Use irregular times | e.g., 01:12:17 vs 01:00:00 |

### Monitoring

| Approach | Method |
|----------|--------|
| Dashboard | Manual review of run logs |
| Cloud ALM | Automated monitoring |
| Alert Notification | Event-driven alerts |
| REST API | Programmatic log retrieval |

### Maintenance

| Task | Frequency |
|------|-----------|
| Download critical logs | Before 15-day retention |
| Review failed jobs | Daily/Weekly |
| Credential rotation | Quarterly |
| Verify scope grants | After XSUAA changes |

### Capacity Planning

| Factor | Consideration |
|--------|---------------|
| Schedule count | Service plan based on schedules |
| Execution frequency | Rate limits apply |
| Run log volume | 15-day auto-deletion |
| Memory (CF tasks) | Default 1GB, configurable |

---

## External References

### SAP Documentation
- **Dashboard**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/manage-jobs-tasks-and-schedules-with-service-dashboard
- **Service Behavior**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/service-behavior
- **Backup and Restore**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/backup-and-restore
- **Accessibility**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/accessibility-features-in-sap-job-scheduling-service

### Source Files
- `manage-jobs-tasks-and-schedules-with-service-dashboard-132fd06.md`
- `service-behavior-d09664b.md`
- `backup-and-restore-87102ab.md`
- `accessibility-features-in-sap-job-scheduling-service-12aa90f.md`
- `best-practices-7b3f014.md`
