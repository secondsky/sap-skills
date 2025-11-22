# SAP BTP Job Scheduling Service - REST API Reference

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs/40---Using-JOB-SCHDULR-TITLE
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Rate Limits](#rate-limits)
4. [Job APIs](#job-apis)
5. [Schedule APIs](#schedule-apis)
6. [Run Log APIs](#run-log-apis)
7. [Node.js Client Library](#nodejs-client-library)
8. [Java Client Library (XS Advanced)](#java-client-library-xs-advanced)

---

## API Overview

### Base URL

```
https://jobscheduler-rest.<landscape-domain>
```

Example landscapes:
- `eu10.hana.ondemand.com`
- `us10.hana.ondemand.com`
- `ap10.hana.ondemand.com`

### General Constraints

| Constraint | Value |
|------------|-------|
| Request body size limit | 100 KB |
| Content-Type | `application/json` |
| Timezone | UTC only |
| Pagination default | 10 items |
| Maximum pagination | 200 items |

### Request Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## Authentication

### Lite Plan (HTTP Basic)

```bash
curl -X GET "https://jobscheduler-rest.<domain>/scheduler/jobs" \
  -u "<user>:<password>" \
  -H "Content-Type: application/json"
```

Credentials from `VCAP_SERVICES`:
- `user`: Username
- `password`: Password

### Standard Plan (OAuth 2.0)

**Token Acquisition - Client Credentials:**

```bash
# Get access token
curl -X POST "<credentials.uaa.url>/oauth/token" \
  -H "Authorization: Basic $(echo -n '<clientid>:<clientsecret>' | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials"
```

Response:
```json
{
  "access_token": "eyJhbGciOiJSUzI1...",
  "token_type": "bearer",
  "expires_in": 43199
}
```

**Token Acquisition - Certificate-Based:**

```bash
curl -X POST "<certurl>/oauth/token" \
  --cert /path/to/certificate.pem \
  --key /path/to/key.pem \
  -d "grant_type=client_credentials&client_id=<clientid>"
```

**Using Token:**

```bash
curl -X GET "https://jobscheduler-rest.<domain>/scheduler/jobs" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

### Credential Types

| Type | Authentication | Source |
|------|----------------|--------|
| binding-secret | clientid + clientsecret | VCAP_SERVICES |
| x509 | certificate + key | VCAP_SERVICES |

### Token Caching

Tokens cached up to 12 hours. Scope changes may take time to propagate.

---

## Rate Limits

### Limit Types

| Limit | Response | Header |
|-------|----------|--------|
| Client limit | 429 Too Many Requests | `retry-after` (seconds) |
| Absolute limit | 503 Service Unavailable | `throttling` (milliseconds) |

### Throttling Behavior

- When limits approached: Response delayed, `throttling` header indicates delay
- When client limit exceeded: 429 response with `retry-after`
- When absolute limit exceeded: 503 response

### Recovery

- Both limits stack (combine)
- `retry-after` typically < 60 seconds
- Implement exponential backoff for retries

---

## Job APIs

### Create Job

**Endpoint:** `POST /scheduler/jobs`

**Request Body:**

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| name | Yes | string | Job name (no special chars, not only numbers) |
| description | Yes | string | Job description |
| action | Yes | string | Fully qualified URL endpoint |
| active | Yes | boolean | Activation status |
| httpMethod | Yes | string | GET, POST, PUT, or DELETE |
| schedules | Yes | array | One or more schedules |
| startTime | No | string/object | Job start time |
| endTime | No | string/object/null | Job end time |
| ansConfig | No | object | Alert Notification config |
| calmConfig | No | object | Cloud ALM config |

**Schedule Parameters:**

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| active | Yes | boolean | Schedule activation |
| description | No | string | Schedule description |
| data | No | object | Payload for action endpoint |
| startTime | No | string/object | Schedule start |
| endTime | No | string/object | Schedule end |
| cron | No | string | Cron expression |
| time | No | string | One-time execution |
| repeatInterval | No | string | Recurring interval |
| repeatAt | No | string | Daily execution time |

**Note:** Specify at most ONE scheduling mode (cron, time, repeatInterval, repeatAt).

**Example Request:**

```json
POST /scheduler/jobs
{
  "name": "salesReportJob",
  "description": "Generate daily sales report",
  "action": "https://myapp.cfapps.eu10.hana.ondemand.com/api/reports/sales",
  "active": true,
  "httpMethod": "POST",
  "schedules": [{
    "active": true,
    "description": "Daily at 6 AM UTC",
    "repeatAt": "6.00am",
    "startTime": {
      "date": "2025-01-01",
      "format": "YYYY-MM-DD"
    }
  }],
  "ansConfig": {
    "onSuccess": false,
    "onError": true
  },
  "calmConfig": {
    "enabled": true
  }
}
```

**Response (201 Created):**

```json
{
  "name": "salesReportJob",
  "description": "Generate daily sales report",
  "action": "https://myapp.cfapps.eu10.hana.ondemand.com/api/reports/sales",
  "active": true,
  "httpMethod": "POST",
  "_id": 42,
  "schedules": [{
    "scheduleId": "5f58c2fb-a428-4f4b-9e1d-312e3be8952c",
    "active": true,
    "type": "recurring"
  }]
}
```

Location header: `/scheduler/jobs/42`

**Error Response (400):**

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid data provided",
    "type": "VALIDATION_ERROR",
    "detailedError": "Job name must not contain special characters"
  }
}
```

### Retrieve All Jobs

**Endpoint:** `GET /scheduler/jobs`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Filter by job name |
| jobId | number | Filter by job ID |
| jobType | string | HTTP_ENDPOINT or CF_TASK |
| page_size | number | Results per page (default 10) |
| offset | number | Jobs to skip (default 1) |
| tenantId | string | Filter by tenant (XSUAA token required) |

**OData-Style Filtering:**

```
GET /scheduler/jobs?$filter=name eq 'myJob'
GET /scheduler/jobs?$filter=contains(name, 'report')
GET /scheduler/jobs?$filter=name eq 'job1' or name eq 'job2'
```

Operators: `eq`, `contains()`, `and`, `or`

**Response (200):**

```json
{
  "total": 25,
  "results": [
    {
      "_id": 1,
      "name": "salesReportJob",
      "description": "...",
      "action": "...",
      "active": true,
      "httpMethod": "POST",
      "jobType": "HTTP_ENDPOINT",
      "createdAt": "2025-01-15T10:30:00Z",
      "modifiedAt": "2025-01-20T14:00:00Z"
    }
  ],
  "prev_url": null,
  "next_url": "/scheduler/jobs?offset=11&page_size=10"
}
```

### Retrieve Job Details

**Endpoints:**
- `GET /scheduler/jobs/{jobId}`
- `GET /scheduler/jobs?jobId={jobId}`
- `GET /scheduler/jobs?name={jobName}`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| displaySchedules | boolean | Include schedule details |

**Example:**

```
GET /scheduler/jobs/42?displaySchedules=true
```

**Response (200):**

```json
{
  "_id": 42,
  "name": "salesReportJob",
  "description": "Generate daily sales report",
  "action": "https://myapp.../api/reports/sales",
  "active": true,
  "httpMethod": "POST",
  "startTime": null,
  "endTime": null,
  "signatureVersion": 0,
  "ansConfig": { "onSuccess": false, "onError": true },
  "calmConfig": { "enabled": true },
  "schedules": [{
    "scheduleId": "5f58c2fb-...",
    "description": "Daily at 6 AM UTC",
    "type": "recurring",
    "repeatAt": "6.00am",
    "active": true,
    "startTime": { "date": "2025-01-01", "format": "YYYY-MM-DD" }
  }]
}
```

### Configure Job (Update)

**Endpoint:** `PUT /scheduler/jobs/{jobId}`

**Request Body:**

All parameters optional except at least one must be provided:

```json
PUT /scheduler/jobs/42
{
  "active": false,
  "description": "Updated description",
  "httpMethod": "GET"
}
```

**Response (200):**

```json
{
  "success": true
}
```

### Configure Job by Name (Create or Update)

**Endpoint:** `PUT /scheduler/jobs/{name}`

**Purpose:** Update an existing job or create a new one using the job name as identifier.

**Path Parameter:**
- `name` (string, required): Job name to update or create

**Request Body:**

| Parameter | Required | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| description | No | string | empty | Job description |
| active | No | boolean | false | Activation status |
| action | Yes (create) | string | - | Action endpoint URL |
| httpMethod | No | string | POST | GET, POST, PUT, DELETE |
| endTime | No | string/object/null | null | Job end time |
| ansConfig | No | object | - | Alert Notification config |
| calmConfig | No | object | - | Cloud ALM config |

**Important:** The job name in the request URI must match the job name in the request body.

**Example Request:**

```json
PUT /scheduler/jobs/dailyReport
{
  "name": "dailyReport",
  "description": "Generate daily sales report",
  "action": "https://myapp.../api/reports",
  "active": true,
  "httpMethod": "POST"
}
```

**Response Codes:**

| Code | Description |
|------|-------------|
| 200 | Job updated successfully |
| 201 | New job created |
| 400 | Invalid data (validation errors) |

---

### Delete Job

**Endpoint:** `DELETE /scheduler/jobs/{jobId}`

**Behavior:**
- Removes job and all associated data
- Terminates all schedules (active and inactive)
- Deletes all run logs

**Example:**

```
DELETE /scheduler/jobs/42
```

**Response (200):**

```json
{
  "success": true
}
```

**Response (404):** Invalid job ID

---

## Schedule APIs

### Create Schedule

**Endpoint:** `POST /scheduler/jobs/{jobId}/schedules`

**Request Body:**

```json
{
  "active": true,
  "description": "Every 2 hours",
  "repeatInterval": "2 hours",
  "startTime": {
    "date": "2025-01-01",
    "format": "YYYY-MM-DD"
  },
  "data": {
    "customParam": "value"
  }
}
```

**Response (201):**

```json
{
  "scheduleId": "cb5c9def-e2a0-4294-8a51-61e4db373f99",
  "description": "Every 2 hours",
  "type": "recurring",
  "repeatInterval": "2 hours",
  "active": true,
  "startTime": "2025-01-01T00:00:00.000Z",
  "jobId": 42
}
```

### Retrieve Schedules

**Endpoint:** `GET /scheduler/jobs/{jobId}/schedules`

**Query Parameters:**

| Parameter | Type | Default |
|-----------|------|---------|
| page_size | number | 10 |
| offset | number | 1 |

### Retrieve Schedule Details

**Endpoint:** `GET /scheduler/jobs/{jobId}/schedules/{scheduleId}`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| jobId | integer | Job identifier |
| scheduleId | string | Schedule identifier |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| displayLogs | boolean | Return schedule run logs (max 200) |

**Example:**

```
GET /scheduler/jobs/42/schedules/cb5c9def-...?displayLogs=true
```

**Response (200):**

```json
{
  "scheduleId": "cb5c9def-e2a0-4294-8a51-61e4db373f99",
  "description": "Every 2 hours",
  "data": {},
  "type": "recurring",
  "cron": null,
  "repeatInterval": "2 hours",
  "active": true,
  "startTime": "2025-01-01T00:00:00.000Z",
  "endTime": null,
  "nextRunAt": "2025-01-20T14:00:00.000Z",
  "logs": [
    {
      "runId": "ea16b621-...",
      "executionTimestamp": "2025-01-20T12:00:05Z",
      "httpStatus": 200,
      "runStatus": "COMPLETED",
      "runState": "SUCCESS"
    }
  ]
}
```

**Response (404):** Invalid Job ID

---

### Configure Schedule

**Endpoint:** `PUT /scheduler/jobs/{jobId}/schedules/{scheduleId}`

**Constraint:** Cannot change scheduling modes (e.g., cron to repeatInterval). Only update values within same mode.

**Request:**

```json
PUT /scheduler/jobs/42/schedules/cb5c9def-...
{
  "active": false,
  "repeatInterval": "4 hours"
}
```

### Delete Schedule

**Endpoint:** `DELETE /scheduler/jobs/{jobId}/schedules/{scheduleId}`

### Delete All Schedules

**Endpoint:** `DELETE /scheduler/jobs/{jobId}/schedules`

### Activate/Deactivate All Schedules

**Endpoint:** `POST /scheduler/jobs/{jobId}/schedules/activationStatus`

**Request:**

```json
{
  "activationStatus": true  // or false
}
```

**Response:**

```json
{
  "success": true
}
```

---

## Run Log APIs

### Retrieve Run Logs

**Endpoint:** `GET /scheduler/jobs/{jobId}/schedules/{scheduleId}/runs`

**Query Parameters:**

| Parameter | Type | Default | Max |
|-----------|------|---------|-----|
| page_size | number | 10 | 200 |
| offset | number | 1 | - |

**Response (200):**

```json
{
  "total": 150,
  "results": [{
    "runId": "ea16b621-eaa8-4824-8629-ff6e6221bb56",
    "runText": "Completed successfully",
    "httpStatus": 200,
    "executionTimestamp": "2025-01-20T06:00:05Z",
    "scheduleTimestamp": "2025-01-20T06:00:00Z",
    "completionTimestamp": "2025-01-20T06:00:10Z",
    "runStatus": "COMPLETED",
    "runState": "SUCCESS"
  }],
  "prev_url": null,
  "next_url": "/scheduler/jobs/42/schedules/.../runs?offset=11"
}
```

**Timestamp Meanings:**

| Timestamp | Description |
|-----------|-------------|
| scheduleTimestamp | When schedule was picked up for calculation |
| executionTimestamp | When scheduler invoked action endpoint |
| completionTimestamp | When scheduler received response |

### Retrieve Run Log Details

**Endpoint:** `GET /scheduler/jobs/{jobId}/schedules/{scheduleId}/runs/{runId}`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| jobId | integer | Job identifier |
| scheduleId | string | Schedule identifier |
| runId | string | Run identifier |

**Example:**

```
GET /scheduler/jobs/2/schedules/5f58c2fb-.../runs/5646889BB133728EE10000000A61A0D8
```

**Response (200):**

```json
{
  "runId": "5646889BB133728EE10000000A61A0D8",
  "runText": "Job completed successfully",
  "httpStatus": 200,
  "executionTimestamp": "2025-01-20T06:00:05Z",
  "scheduleTimestamp": "2025-01-20T06:00:00Z",
  "completionTimestamp": "2025-01-20T06:00:10Z",
  "runStatus": "COMPLETED",
  "runState": "SUCCESS"
}
```

**Response (404):** Invalid Job ID

---

### Update Run Log (Async Callback)

**Endpoint:** `PUT /scheduler/jobs/{jobId}/schedules/{scheduleId}/runs/{runId}`

**Purpose:** Application callback to report async job completion status.

**Request:**

```json
{
  "success": true,
  "message": "Processing completed: 1000 records processed"
}
```

**Response (200):**

```json
{
  "success": true
}
```

**Implementation Notes:**
- IDs come from request headers during job invocation
- Single callback per run (not multiple updates)
- If not called, status becomes `UNKNOWN` after timeout

---

## Node.js Client Library

### Installation

```bash
npm install @sap/jobs-client
```

**Minimum Version:** 1.6.3 (for x509 certificate support)

### Initialization

```javascript
const JobSchedulerClient = require('@sap/jobs-client');
const scheduler = new JobSchedulerClient.Scheduler();

// Get credentials from VCAP_SERVICES
const vcapServices = JSON.parse(process.env.VCAP_SERVICES);
const jobSchedulerCredentials = vcapServices.jobscheduler[0].credentials;
```

### Job Management Methods

**createJob:**

```javascript
scheduler.createJob({
  url: jobSchedulerCredentials.url
}, {
  name: 'myJob',
  description: 'My scheduled job',
  action: 'https://myapp.../api/process',
  active: true,
  httpMethod: 'POST',
  schedules: [{
    cron: '* * * * 9 0 0',
    active: true,
    description: 'Daily at 9 AM'
  }]
}, (error, result) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Job created:', result);
  }
});
```

**fetchJob:**

```javascript
scheduler.fetchJob({
  url: jobSchedulerCredentials.url,
  jobId: 42  // or jobName: 'myJob'
}, (error, result) => { /* ... */ });
```

**updateJob:**

```javascript
scheduler.updateJob({
  url: jobSchedulerCredentials.url,
  jobId: 42
}, {
  active: false
}, (error, result) => { /* ... */ });
```

**deleteJob:**

```javascript
scheduler.deleteJob({
  url: jobSchedulerCredentials.url,
  jobId: 42
}, (error, result) => { /* ... */ });
```

**fetchAllJobs:**

```javascript
scheduler.fetchAllJobs({
  url: jobSchedulerCredentials.url
}, (error, result) => { /* ... */ });
```

**getJobCount:**

```javascript
scheduler.getJobCount({
  url: jobSchedulerCredentials.url
}, (error, result) => {
  console.log('Active jobs:', result.activeJobs);
  console.log('Inactive jobs:', result.inactiveJobs);
});
```

### Schedule Management Methods

```javascript
// Create schedule
scheduler.createJobSchedule({
  url: jobSchedulerCredentials.url,
  jobId: 42
}, {
  repeatInterval: '2 hours',
  active: true
}, callback);

// Update schedule
scheduler.updateJobSchedule({
  url: jobSchedulerCredentials.url,
  jobId: 42,
  scheduleId: 'cb5c9def-...'
}, {
  active: false
}, callback);

// Delete schedule
scheduler.deleteJobSchedule({
  url: jobSchedulerCredentials.url,
  jobId: 42,
  scheduleId: 'cb5c9def-...'
}, callback);

// Fetch schedules
scheduler.fetchJobSchedules({
  url: jobSchedulerCredentials.url,
  jobId: 42
}, callback);

// Bulk operations
scheduler.activateAllSchedules({ url, jobId }, callback);
scheduler.deactivateAllSchedules({ url, jobId }, callback);
scheduler.deleteAllJobSchedules({ url, jobId }, callback);
```

### Run Log Methods

```javascript
// Update run log (async callback)
scheduler.updateJobRunLog({
  url: jobSchedulerCredentials.url,
  jobId: jobId,
  scheduleId: scheduleId,
  runId: runId
}, {
  success: true,
  message: 'Processing completed'
}, callback);

// Get run logs
scheduler.getRunLogs({
  url: jobSchedulerCredentials.url,
  jobId: 42,
  scheduleId: 'cb5c9def-...'
}, callback);

// Get action logs
scheduler.getJobActionLogs({ url, jobId }, callback);
scheduler.getScheduleActionLogs({ url, jobId, scheduleId }, callback);
```

### Complete Example

```javascript
const express = require('express');
const JobSchedulerClient = require('@sap/jobs-client');

const app = express();
const scheduler = new JobSchedulerClient.Scheduler();
const credentials = JSON.parse(process.env.VCAP_SERVICES).jobscheduler[0].credentials;

// Async job endpoint
app.post('/api/process', (req, res) => {
  const jobId = req.headers['x-sap-job-id'];
  const scheduleId = req.headers['x-sap-job-schedule-id'];
  const runId = req.headers['x-sap-job-run-id'];

  // Acknowledge immediately
  res.status(202).json({ message: 'Accepted' });

  // Process asynchronously
  processAsync()
    .then(() => {
      scheduler.updateJobRunLog({
        url: credentials.url,
        jobId: parseInt(jobId),
        scheduleId,
        runId
      }, {
        success: true,
        message: 'Completed successfully'
      }, (err) => {
        if (err) console.error('Failed to update run log:', err);
      });
    })
    .catch((error) => {
      scheduler.updateJobRunLog({
        url: credentials.url,
        jobId: parseInt(jobId),
        scheduleId,
        runId
      }, {
        success: false,
        message: error.message
      }, (err) => {
        if (err) console.error('Failed to update run log:', err);
      });
    });
});

async function processAsync() {
  // Long-running operation
}

app.listen(process.env.PORT || 3000);
```

---

## Java Client Library (XS Advanced)

### Overview

A Java Client Library (`java-js-client`) is available for SAP HANA Platform XS Advanced environments.

**Use Case:** For Java-based applications running on SAP HANA XS Advanced.

**Note:** This library is specific to XS Advanced and not for general Cloud Foundry Java applications. For Cloud Foundry Java apps, use the REST API directly with standard HTTP clients.

### Availability

Available through SAP's internal package registry for XS Advanced development.

---

## External References

### SAP Documentation
- **REST API Reference**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/sap-job-scheduling-service-rest-apis
- **Node.js Client**: https://www.npmjs.com/package/@sap/jobs-client
- **Java Client (XS Advanced)**: Available via SAP HANA XS Advanced documentation
- **Authentication**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/authentication

### Source Files
- `sap-job-scheduling-service-rest-apis-c513d2d.md`
- `authentication-5dca60b.md`
- `rate-limits-a9cb164.md`
- `create-job-2c1ecb6.md`
- `retrieve-all-jobs-b4d3719.md`
- `node-js-client-library-9b86127.md`
- All schedule and run log documentation files
