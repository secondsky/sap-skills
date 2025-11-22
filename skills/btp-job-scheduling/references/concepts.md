# SAP BTP Job Scheduling Service - Core Concepts

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs/20---Concepts
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Core Components](#core-components)
2. [Schedule Types](#schedule-types)
3. [Schedule Formats](#schedule-formats)
4. [Schedule Lifecycle](#schedule-lifecycle)
5. [Asynchronous Mode](#asynchronous-mode)
6. [Cloud Foundry Tasks](#cloud-foundry-tasks)
7. [Multitenancy](#multitenancy)
8. [Service Behavior](#service-behavior)

---

## Core Components

### Job

A job is a collection of schedules with an action endpoint. Jobs:
- Invoke a configured URL at specified times
- Execute synchronously (short operations, ≤15 seconds) or asynchronously (long processes)
- Service plans are based on the number of schedules within a job
- Names must not contain special characters or only numbers
- Names must be unique per technical user

### Action Endpoint

An HTTP or REST endpoint exposed by the application that the service invokes:
- Must be OAuth 2.0 protected in production (standard plan)
- Must use HTTPS for encrypted communication
- Receives job execution requests with authorization headers

### Schedule

A one-time or recurring entity within a job:
- Defines when and how often a job runs
- Supports multiple format types (cron, date/time, human-readable)
- Has its own lifecycle states
- Can be activated/deactivated independently

### Run Log

Records of job executions:
- Contains execution status, timestamps, and optional messages
- Retained for 15 days before automatic deletion
- Downloadable via API or dashboard

---

## Schedule Types

### One-Time Schedules

Execute a single time using:

**Human-Readable Text:**
```
"time": "10 hours from now"
"time": "tomorrow at 4pm"
"time": "now"  // Immediate execution
"time": "Friday at 2am"
```

**Date String Formats:**
```
"time": "1994-11-05T08:15:30-05:00"  // ISO-8601
"time": "Sat, 05 Nov 1994 08:15:30 GMT"  // RFC 2822
```

**Behavior:**
- Auto-deactivate after execution (successful or failed)
- Execute at configured time, overriding job-level startTime
- Execute immediately if scheduled time is past but endTime is future
- Do not execute if both time and endTime are in the past
- **Automatic Cleanup:** Unused one-time schedules are deleted after **30 days of inactivity** (as of May 2025)

### Recurring Schedules

Run periodically at specified intervals using:

**repeatInterval:**
Denotes interval between schedules in human-readable format:
```json
"repeatInterval": "5 minutes"
"repeatInterval": "2 hours"
"repeatInterval": "1 day"
"repeatInterval": "2 weeks"
```
- Next execution adjusts if previous execution was delayed

**cron:**
Crontab expression determining execution times:
```json
"cron": "* * * * 9 0 0"  // Daily at 9:00:00 AM
"cron": "* * * mon 10 0 0"  // Every Monday at 10:00
```
- Service assumes 30-day months and 365-day years

**repeatAt:**
Exact daily execution time:
```json
"repeatAt": "4.40pm"
"repeatAt": "18.40"
"repeatAt": "6.20am"
```

**Behavior:**
- If a job exceeds its duration, the next scheduled job still starts on time
- Activating an inactive schedule after planned start triggers immediate execution

---

## Schedule Formats

### Cron Format (7 Fields)

SAP Job Scheduling Service uses an extended cron format with seven fields (left to right):

```
Year  Month  Day  DayOfWeek  Hour  Minute  Second
```

**Field Constraints:**

| Field | Values | Description |
|-------|--------|-------------|
| Year | 4-digit (e.g., 2025) | Calendar year |
| Month | 1-12 | Calendar month |
| Day | -31 to 31 | Day of month (negative = from end) |
| DayOfWeek | mon, tue, wed, thu, fri, sat, sun | 3-letter abbreviation |
| Hour | 0-23 | Hour of day |
| Minute | 0-59 | Minute of hour |
| Second | 0-59 | Second of minute |

**Supported Operators:**

| Operator | Meaning | Example |
|----------|---------|---------|
| `*` | Any value | `* * * * 9 0 0` |
| `*/a` | Every a-th value | `* * * * */2 0 0` (every 2 hours) |
| `a:b` | Range a to b | `* * * * 10:12 0 0` (hours 10-12) |
| `a:b/c` | Every c-th in range | `* * * * 10:12/2 0 0` |
| `a.y` | a-th occurrence of weekday y | `* * * -1.sun 9 0 0` (last Sunday) |
| `a,b,c` | Multiple values | `* * * mon,wed,fri 9 0 0` |

**Examples:**

```
* * * 10:12 */30 0     Every 30 minutes between 10:00-12:00 daily
* * * -1.sun 9 0 0     Last Sunday of each month at 09:00
* 1,4,7,10 1 * 0 0 0   First day of each quarter at midnight
* * * * 9 30 0         Daily at 9:30 AM
* * 15 * 18 0 0        15th of each month at 6 PM
```

**Important**: Service uses SAP cron format, NOT Linux cron format.

### Date/Time Formats

**Date Object Format:**

```json
{
  "startTime": {
    "date": "2025-10-20 04:30 +0000",
    "format": "YYYY-MM-DD HH:mm Z"
  }
}
```

**Supported Parsing Tokens:**

| Token | Description |
|-------|-------------|
| YYYY | 4-digit year |
| YY | 2-digit year |
| M/MM | Month (1-12) |
| MMM/MMMM | Month name |
| D/DD | Day of month |
| H/HH | Hour (24-hour) |
| h/hh | Hour (12-hour) |
| a/A | AM/PM |
| m/mm | Minute |
| s/ss | Second |
| Z/ZZ | Timezone offset |
| X | UNIX timestamp (seconds) |
| x | UNIX timestamp (milliseconds) |

**Date String Format:**

Valid ISO-8601 or RFC 2822 representations:
```
1994-11-05T08:15:30-05:00     // ISO-8601
Sat, 05 Nov 1994 08:15:30 GMT // RFC 2822
```

### Human-Readable Formats

**time Parameter:**
```
"10 hours from now"
"tomorrow at 4pm"
"now"
"Friday at 2am"
"next week"
```

**repeatAt Parameter:**
```
"4.40pm"
"6.20am"
"18:40"
```

**repeatInterval Parameter:**
```
"10 hours"
"2 days"
"5 minutes"
"3 weeks"
"1 month"
```

Supports: years, months, weeks, days, hours, minutes, seconds

---

## Schedule Lifecycle

### Primary States

| State | Description |
|-------|-------------|
| **SCHEDULED** | Schedule queued for future run |
| **RUNNING** | Schedule actively executing |
| **COMPLETED** | Schedule run finished |

### Detailed State Transitions

**During SCHEDULED Phase:**
- `SCHEDULED`: Awaiting execution at future time

**During RUNNING Phase:**
- `TRIGGERED`: Scheduler triggered request to job action endpoint
- `ACK_RECVD`: Application sent 202 Accepted acknowledgment
- `ACK_NOT_RECVD`: Application failed to acknowledge within timeframe

**During COMPLETED Phase:**
- `SUCCESS`: Application executed job and replied with success status
- `ERROR`: Application encountered error, sent server error code
- `REQUEST_ERROR`: Error occurred invoking job endpoint
- `UNKNOWN`: Application didn't invoke Update Job Run Log API

### Cloud Foundry Task States

**RUNNING Phase:**
- `TRIGGERED`: Task creation initiated
- `ACK_RECVD`: Task creation successful

**COMPLETED Phase:**
- `SUCCESS`: Task completed successfully
- `ERROR`: Task encountered error
- `TIMEOUT`: Execution exceeded configured timeframe

---

## Asynchronous Mode

### Overview

Asynchronous mode handles job runs with large execution times, particularly for action endpoints triggering long-running processes.

### Request Flow

1. **Scheduler Invokes Endpoint** with headers:
   - `x-sap-job-id`: Job identifier
   - `x-sap-job-schedule-id`: Schedule identifier
   - `x-sap-job-run-id`: Run identifier
   - `x-sap-scheduler-host`: Service host URI

2. **Application Stores Headers** using suitable mechanism (in-memory or persistent storage)

3. **Application Returns 202 Accepted** immediately as acknowledgment

4. **Application Processes Job** asynchronously

5. **Application Updates Run Log** via callback API with final status

### Implementation Example

```javascript
// Receive job request
app.post('/api/process', (req, res) => {
  // Extract and store headers
  const jobContext = {
    jobId: req.headers['x-sap-job-id'],
    scheduleId: req.headers['x-sap-job-schedule-id'],
    runId: req.headers['x-sap-job-run-id'],
    schedulerHost: req.headers['x-sap-scheduler-host']
  };

  // Store context for later callback
  storeJobContext(jobContext);

  // Return immediate acknowledgment
  res.status(202).send({ message: 'Accepted' });

  // Start async processing
  processJobAsync(jobContext);
});

// After job completion
async function onJobComplete(jobContext, success, message) {
  await updateRunLog(jobContext, { success, message });
}
```

### Callback API

```
PUT /scheduler/jobs/{jobId}/schedules/{scheduleId}/runs/{runId}

{
  "success": true,
  "message": "Long running operation completed successfully"
}
```

### Timeout Handling

- Default timeout: 30 minutes
- Configurable up to: 604,800 seconds (7 days)
- If application fails to invoke Update API, status reverts to `UNKNOWN`

### Important Notes

- Cloud Foundry tasks always run asynchronously
- Server error codes indicate job failure
- Single callback with final status (not multiple updates)

---

## Cloud Foundry Tasks

### Definition

An app or script whose code is included as part of a deployed app but runs independently in its own container.

### Characteristics

- Designed for minimal resource consumption
- Always execute asynchronously
- Cannot be created via REST API (only dashboard)
- Require Space Developer role for creation
- Memory configurable (default 1GB)

### Memory Configuration

Via dashboard JSON options:
```json
{
  "memory_in_mb": 2048
}
```

### Task States

Same as asynchronous jobs plus:
- `TIMEOUT`: Execution exceeded configured timeframe

---

## Multitenancy

### Overview

The service enables deployed multitenant applications to create, view, edit, and delete jobs in the context of subscribed tenants.

### Prerequisites

- Application deployed to provider subaccount
- Application bound to SaaS Provisioning service
- Application bound to Job Scheduling service
- Job Scheduling defined as application dependency

### Tenant Isolation

**Strict Data Separation:**
- Jobs and schedules created for a SaaS tenant are NOT accessible by other tenants
- Credentials bound to a SaaS tenant access only that tenant's data
- Each tenant maintains its own job and schedule collection

### Credential Types

**Provider-Level Credentials (PaaS):**
- Bound to the SAP Job Scheduling service instance
- Can manage ALL jobs across all tenants
- No tenant restrictions

**Tenant-Specific Credentials (SaaS):**
- Bound to specific tenant
- Access only tenant-specific data
- `tenantId` query parameter returns 400 for SaaS tenant tokens

### Unsubscription Behavior

**Single-Instance Setup:**
- All corresponding jobs and schedules deleted when tenant unsubscribes

**Multi-Application Setup:**
- Data persists until ALL subscriptions removed

### Token Requirements

Use client credentials flow with XSUAA to obtain access tokens for job registration and management.

---

## Service Behavior

### Outage Recovery

**Under 20 Minutes:**
- All missed executions re-executed immediately when service restores

**20+ Minutes:**
- All scheduled runs except the last one are skipped
- Prevents overwhelming target applications with excessive requests

### Service Level Agreement

Scheduled jobs have approximately 20-minute latency tolerance from their scheduled execution time.

### Data Retention

Run logs automatically removed 15 days after generation. Download via API or dashboard before removal.

### Auto-Deactivation Triggers

Schedules auto-deactivate when:
- One-time schedule executed (successful or failed)
- No valid future dates exist
- Job/schedule endTime reached
- Action endpoint unreachable for 10+ consecutive days

### Timezone

**UTC Only**: No other timezones supported. All schedule times are interpreted as UTC.

---

## External References

### SAP Documentation
- **Core Concepts**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/concepts
- **Schedule Formats**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/schedule-formats
- **Service Behavior**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/service-behavior

### Source Files
- `concepts-26572ad.md`
- `asynchronous-mode-d9fd81c.md`
- `schedule-types-9cf8c14.md`
- `schedule-formats-54615f0.md`
- `schedule-lifecycle-e1805f2.md`
- `multitenancy-in-sap-job-scheduling-service-464b613.md`
- `service-behavior-d09664b.md`
