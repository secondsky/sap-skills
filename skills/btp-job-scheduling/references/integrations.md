# SAP BTP Job Scheduling Service - Integration Guide

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Integration Overview](#integration-overview)
2. [SAP Cloud ALM Integration](#sap-cloud-alm-integration)
3. [SAP Alert Notification Service Integration](#sap-alert-notification-service-integration)

---

## Integration Overview

SAP Job Scheduling Service integrates with two SAP solutions:

| Integration | Purpose | Availability |
|-------------|---------|--------------|
| SAP Cloud ALM | Job monitoring and automation | Cloud Foundry & Kyma |
| SAP Alert Notification Service | Event notifications | Cloud Foundry only |

---

## SAP Cloud ALM Integration

### Overview

Integration enables monitoring of jobs managed by SAP Job Scheduling service within SAP Cloud ALM. Once activated, all events related to a job and its schedules are visible within SAP Cloud ALM.

### Prerequisites

1. SAP Cloud ALM instance configured
2. Job & Automation Monitoring enabled
3. Refer to [SAP Cloud ALM Job Monitoring Setup](https://support.sap.com/en/alm/sap-cloud-alm/operations/expert-portal/job-monitoring/job-automation-monitoring-details.html)

### Enable via Dashboard

**Method 1: Actions Column Toggle**

1. Open Job Scheduling service dashboard
2. Navigate to **Jobs** or **Tasks**
3. Find the job in the list
4. Toggle the Cloud ALM switch in the Actions column
5. Save changes

**Method 2: During Job/Task Creation**

1. Create new job or task
2. Enable Cloud ALM monitoring in creation form
3. Complete job creation

**Method 3: Edit View**

1. Select existing job
2. Click **Edit**
3. Enable Cloud ALM monitoring toggle
4. Save changes

### Enable via REST API

**During Job Creation:**

```json
POST /scheduler/jobs
{
  "name": "monitoredJob",
  "description": "Job with Cloud ALM monitoring",
  "action": "https://myapp.../api/process",
  "active": true,
  "httpMethod": "POST",
  "calmConfig": {
    "enabled": true
  },
  "schedules": [{
    "active": true,
    "repeatInterval": "1 hour"
  }]
}
```

**Update Existing Job:**

```json
PUT /scheduler/jobs/{jobId}
{
  "calmConfig": {
    "enabled": true
  }
}
```

### Configuration Notes

- CF tasks cannot be created via REST API due to application-specific binding
- `calmConfig` object cannot be empty if provided
- `enabled` must be boolean type

### Status Display Comparison

| Job Scheduling Display | Cloud ALM Display |
|------------------------|-------------------|
| Status + State (single column) | Execution Status + Application Status (separate) |

### Status Mapping

| Job Scheduling | Cloud ALM Execution Status | Cloud ALM Application Status |
|----------------|---------------------------|------------------------------|
| SCHEDULED | Scheduled | - |
| TRIGGERED | Running | - |
| SUCCESS | Completed | Success |
| ERROR | Completed | Error |
| UNKNOWN | Unknown | Unknown |

---

## SAP Alert Notification Service Integration

### Overview

Integration allows jobs and tasks to trigger event notifications through SAP Alert Notification service upon completion, supporting both success and error scenarios.

### Benefits

| Benefit | Description |
|---------|-------------|
| Proactive Monitoring | Immediate alerts for job outcomes |
| Operational Efficiency | Automatic recovery process initiation |
| Team Notification | Alert relevant stakeholders |
| Status Tracking | Track success, errors, timeouts, failures |

### Availability

**Supported:** Cloud Foundry runtime only

**Not Supported:** Kyma runtime

### Prerequisites

1. SAP Alert Notification service enabled in subaccount
2. Alert Notification service instance created
3. Event types configured:
   - `JobSchedulerJobExecution`
   - `JobSchedulerTaskExecution`

### Setup Steps

**Step 1: Create Alert Notification Instance**

1. Navigate to **Services** → **Instances and Subscriptions**
2. Create new **Alert Notification** service instance
3. Open service instance dashboard

**Step 2: Configure Actions**

1. In Alert Notification dashboard, go to **Actions**
2. Create action (e.g., Email, Webhook)
3. Configure action parameters

**Step 3: Configure Conditions**

1. Go to **Conditions**
2. Create condition for job events
3. Set event type filter:
   - `JobSchedulerJobExecution` for jobs
   - `JobSchedulerTaskExecution` for CF tasks

**Step 4: Configure Subscriptions**

1. Go to **Subscriptions**
2. Create subscription linking condition to action
3. Activate subscription

### Enable via Dashboard

**During Job Creation:**

1. Create new job in Job Scheduling dashboard
2. Under **SAP Alert Notification Service Events**:
   - Toggle **Success** for success notifications
   - Toggle **Error** for error notifications
3. Save job

**For Existing Jobs:**

1. Select job in dashboard
2. Click **Edit**
3. Enable notification toggles
4. Save changes

### Enable via REST API

**During Job Creation:**

```json
POST /scheduler/jobs
{
  "name": "alertedJob",
  "description": "Job with alert notifications",
  "action": "https://myapp.../api/process",
  "active": true,
  "httpMethod": "POST",
  "ansConfig": {
    "onSuccess": true,
    "onError": true
  },
  "schedules": [{
    "active": true,
    "cron": "* * * * 9 0 0"
  }]
}
```

**Update Existing Job:**

```json
PUT /scheduler/jobs/{jobId}
{
  "ansConfig": {
    "onSuccess": false,
    "onError": true
  }
}
```

### ansConfig Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| onSuccess | boolean | Send notification on successful execution |
| onError | boolean | Send notification on failed execution |

### Event Types

| Event Type | Triggered By |
|------------|--------------|
| `JobSchedulerJobExecution` | HTTP endpoint job completion |
| `JobSchedulerTaskExecution` | Cloud Foundry task completion |

### Alert Events Include

- Job name and ID
- Schedule ID
- Execution status (Success/Error)
- Timestamp
- Error details (for failures)

### Testing Integration

1. Open Job Scheduling dashboard
2. Select **Jobs**
3. Create test job with:
   - All required fields
   - **Error** or **Success** toggle enabled
   - One-time schedule with `"time": "now"`
4. Save and execute job
5. Verify:
   - Job execution in run logs
   - Notification received via configured action

### Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| No notifications | Event type not configured | Add event types in ANS dashboard |
| Wrong recipients | Action misconfigured | Review action configuration |
| Delayed notifications | ANS processing time | Normal, check ANS logs |
| Missing events | ansConfig not set | Update job with ansConfig |

---

## Integration Configuration Summary

### REST API Parameters

| Integration | Parameter | Structure |
|-------------|-----------|-----------|
| SAP Cloud ALM | `calmConfig` | `{ "enabled": boolean }` |
| Alert Notification | `ansConfig` | `{ "onSuccess": boolean, "onError": boolean }` |

### Dashboard Options

| Integration | Location | Options |
|-------------|----------|---------|
| SAP Cloud ALM | Actions column / Edit view | Toggle on/off |
| Alert Notification | SAP Alert Notification Service Events | Success toggle, Error toggle |

### Compatibility Matrix

| Feature | Cloud Foundry | Kyma |
|---------|---------------|------|
| SAP Cloud ALM | Yes | Yes |
| Alert Notification | Yes | No |

---

## External References

### SAP Documentation
- **Integration Scenarios**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/integration-scenarios
- **SAP Cloud ALM Integration**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/integration-with-sap-cloud-alm
- **Alert Notification Integration**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/integration-with-sap-alert-notification-service-for-sap-btp
- **SAP Cloud ALM Job Monitoring**: https://support.sap.com/en/alm/sap-cloud-alm/operations/expert-portal/job-monitoring/job-automation-monitoring-details.html

### Source Files
- `integration-scenarios-faeec3a.md`
- `integration-with-sap-cloud-alm-f82790e.md`
- `integration-with-sap-alert-notification-service-for-sap-btp-972ef35.md`
