---
name: sap-btp-job-scheduling
description: |
  This skill provides comprehensive guidance for SAP BTP Job Scheduling Service development, configuration, and operations.
  It should be used when creating, managing, or troubleshooting scheduled jobs on SAP Business Technology Platform.

  The skill covers service setup, REST API usage, schedule types and formats, OAuth 2.0 authentication, multitenancy,
  Cloud Foundry tasks, Kyma runtime integration, and monitoring with SAP Cloud ALM and Alert Notification Service.

  Keywords: SAP BTP, Job Scheduling, jobscheduler, cron, schedule, recurring jobs, one-time jobs, Cloud Foundry tasks,
  CF tasks, Kyma, OAuth 2.0, XSUAA, @sap/jobs-client, REST API, asynchronous jobs, action endpoint, run logs,
  SAP Cloud ALM, Alert Notification Service, multitenancy, tenant-aware, BC-CP-CF-JBS
license: GPL-3.0
metadata:
  version: "2.3.1"
  last_verified: "2025-11-27"
---

# SAP BTP Job Scheduling Service

## Related Skills

- **sap-dependency-security**: Use for secure dependency and workflow hardening when your job scheduling microservices maintain npm/CLI dependency stacks

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Quick Decision Tree](#quick-decision-tree)
- [Core Concepts](#core-concepts)
- [Service Constraints](#service-constraints)
- [Quick Reference Tables](#quick-reference-tables)
  - [Schedule Formats](#schedule-formats)
  - [Cron Format (7 fields)](#cron-format-7-fields)
  - [Schedule Lifecycle States](#schedule-lifecycle-states)
  - [HTTP Methods for Jobs](#http-methods-for-jobs)
- [Best Practices](#best-practices)
  - [Scheduling Optimization](#scheduling-optimization)
  - [Asynchronous Jobs](#asynchronous-jobs)
  - [One-Time Schedules](#one-time-schedules)
- [Authentication Quick Start](#authentication-quick-start)
  - [Standard Plan (OAuth 2.0)](#standard-plan-oauth-20)
  - [xs-security.json Configuration](#xs-securityjson-configuration)
- [Create Job Example](#create-job-example)
- [Node.js Client Library](#nodejs-client-library)
- [Rate Limits](#rate-limits)
- [Service Behavior](#service-behavior)
  - [Outage Recovery](#outage-recovery)
  - [Auto-Deactivation Triggers](#auto-deactivation-triggers)
- [Bundled Resources](#bundled-resources)
- [Common Pitfalls](#common-pitfalls)
- [External Resources](#external-resources)
- [Updates and Maintenance](#updates-and-maintenance)

## Overview

SAP Job Scheduling Service is a runtime-agnostic platform service for defining and managing one-time and recurring jobs or Cloud Foundry tasks on SAP BTP. It operates across multiple hyperscalers (AWS, Azure, GCP) without requiring application modifications.

**Documentation Source**: [https://help.sap.com/docs/job-scheduling](https://help.sap.com/docs/job-scheduling)

**Last Verified**: 2025-11-27

## When to Use This Skill

Use this skill when:

- **Setting up Job Scheduling Service** on Cloud Foundry or Kyma runtime
- **Creating and managing jobs** via REST API or dashboard
- **Configuring schedules** using cron, date/time, or human-readable formats
- **Implementing asynchronous job execution** for long-running processes
- **Securing action endpoints** with OAuth 2.0 and XSUAA
- **Integrating with SAP Cloud ALM** or Alert Notification Service
- **Developing multitenant applications** with tenant-aware job scheduling
- **Troubleshooting job execution issues** and schedule failures
- **Using the Node.js client library** (@sap/jobs-client)

## Quick Decision Tree

### What Task?

```
Setup & Configuration
├─ Initial setup prerequisites → references/setup-guide.md
├─ Create service instance
│  ├─ BTP Cockpit → references/setup-guide.md#cockpit
│  ├─ CF CLI → references/setup-guide.md#cf-cli
│  └─ Kyma Dashboard → references/setup-guide.md#kyma
└─ Configure XSUAA scopes → references/security.md

Job Management
├─ Create jobs → references/rest-api.md#create-job
├─ Configure schedules → references/rest-api.md#schedules
├─ Run logs & monitoring → references/rest-api.md#run-logs
└─ Dashboard operations → references/operations.md#dashboard

Schedule Configuration
├─ One-time vs recurring → references/concepts.md#schedule-types
├─ Cron format → references/concepts.md#cron-format
├─ Date/time formats → references/concepts.md#date-formats
└─ Human-readable → references/concepts.md#human-readable

Asynchronous Execution
├─ Async mode flow → references/concepts.md#async-mode
├─ Callback implementation → references/rest-api.md#update-run-log
└─ CF tasks → references/concepts.md#cf-tasks

Security & Authentication
├─ OAuth 2.0 setup → references/security.md#oauth
├─ XSUAA configuration → references/security.md#xsuaa
└─ Credential rotation → references/security.md#rotation

Integrations
├─ SAP Cloud ALM → references/integrations.md#cloud-alm
└─ Alert Notification → references/integrations.md#alert-notification

Troubleshooting
├─ Common errors → references/troubleshooting.md#errors
├─ FAQ → references/troubleshooting.md#faq
└─ Support: BC-CP-CF-JBS

Version History & Updates
└─ What's New (2021-2025) → references/changelog.md
```

## Core Concepts

### Job
A collection of schedules with an action endpoint. Jobs invoke a configured URL at specified times synchronously (short operations) or asynchronously (long processes).

### Schedule
A one-time or recurring entity within a job. Supports multiple formats (cron, date/time, human-readable) and has three lifecycle states: SCHEDULED → RUNNING → COMPLETED.

### Action Endpoint
An HTTP/REST endpoint exposed by your application that the service invokes when schedules trigger. Must be OAuth 2.0 protected in production.

### Cloud Foundry Task
An app or script that runs independently in its own container. Always executes asynchronously with configurable memory allocation.

## Service Constraints

| Constraint | Value |
|------------|-------|
| Minimum schedule interval | 5 minutes |
| Synchronous request timeout | 15 seconds |
| Asynchronous timeout (default) | 30 minutes (configurable up to 7 days) |
| POST request body limit | 100 KB |
| Run log retention | 15 days |
| Service SLA | ~20 minutes from scheduled time |

## Quick Reference Tables

### Schedule Formats

| Format | Example | Use Case |
|--------|---------|----------|
| Cron | `* * * * 10:12 0,30 0` | Every 30 min between 10:00-12:00 |
| Date/Time | `2025-10-20T04:30:00Z` | ISO-8601 one-time execution |
| Human-readable | `tomorrow at 4pm` | Natural language scheduling |
| repeatInterval | `2 hours`, `5 minutes` | Recurring at fixed intervals |
| repeatAt | `4.40pm`, `18:40` | Daily at specific time |

### Cron Format (7 fields)

```
Year Month Day DayOfWeek Hour Minute Second
*    *     *   *         *    *      *
```

| Field | Values | Special |
|-------|--------|---------|
| Year | 4-digit (2025) | * = any |
| Month | 1-12 | */a = every a-th |
| Day | -31 to 31 | negative = from end |
| DayOfWeek | mon, tue, wed... | a.y = a-th occurrence |
| Hour | 0-23 | a:b = range |
| Minute | 0-59 | a:b/c = step in range |
| Second | 0-59 | a,b,c = multiple values |

### Schedule Lifecycle States

| Phase | States | Description |
|-------|--------|-------------|
| SCHEDULED | SCHEDULED | Queued for future run |
| RUNNING | TRIGGERED, ACK_RECVD, ACK_NOT_RECVD | Executing |
| COMPLETED | SUCCESS, ERROR, REQUEST_ERROR, UNKNOWN | Finished |

### HTTP Methods for Jobs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/scheduler/jobs` | Create job |
| GET | `/scheduler/jobs` | List all jobs |
| GET | `/scheduler/jobs/{id}` | Get job details |
| PUT | `/scheduler/jobs/{id}` | Update job |
| DELETE | `/scheduler/jobs/{id}` | Delete job |

## Best Practices

### Scheduling Optimization

**Avoid Peak Times:**
- ❌ 0th or 30th second of any minute
- ❌ 0th, 30th, or multiples of 5 minutes
- ❌ Top of each hour
- ❌ Midnight UTC (busiest time)

**Use Irregular Times:**
- ✅ `01:12:17` instead of `01:00:00`
- ✅ `01:38:37` instead of `01:30:00`

### Asynchronous Jobs

1. **Return 202 Accepted immediately** - Don't block the request
2. **Store request headers** - `x-sap-job-id`, `x-sap-job-schedule-id`, `x-sap-job-run-id`, `x-sap-scheduler-host`
3. **Update run log on completion** - Single API call with final status
4. **Handle timeouts** - Default 30 min, configurable up to 7 days

### One-Time Schedules

- Use only for testing/validation
- Auto-deactivate after execution
- Use `"time": "now"` for immediate execution

## Authentication Quick Start

### Standard Plan (OAuth 2.0)

```bash
# Get access token
curl -X POST "<uaa_url>/oauth/token" \
  -H "Authorization: Basic $(echo -n '<clientid>:<clientsecret>' | base64)" \
  -d "grant_type=client_credentials"

# Use token in API calls
curl -X GET "https://jobscheduler-rest.<landscape>/scheduler/jobs" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

### xs-security.json Configuration

```json
{
  "xsappname": "<app-name>",
  "scopes": [{
    "name": "$XSAPPNAME.JOBSCHEDULER",
    "description": "Job Scheduler Scope",
    "grant-as-authority-to-apps": ["$XSSERVICENAME(<jobscheduler-instance>)"]
  }]
}
```

## Create Job Example

```json
POST /scheduler/jobs
{
  "name": "myJob",
  "description": "Process daily reports",
  "action": "https://myapp.cfapps.eu10.hana.ondemand.com/api/process",
  "active": true,
  "httpMethod": "POST",
  "schedules": [{
    "active": true,
    "description": "Daily at 6 AM",
    "repeatAt": "6.00am",
    "startTime": {"date": "2025-01-01", "format": "YYYY-MM-DD"}
  }]
}
```

## Node.js Client Library

**Requirements**: Node.js 14.x or later

```bash
npm install @sap/jobs-client@1.8.6
```

```javascript
const JobSchedulerClient = require('@sap/jobs-client');
const scheduler = new JobSchedulerClient.Scheduler();

// Create job
scheduler.createJob({ url: vcapServices.jobscheduler[0].credentials.url }, {
  name: 'myJob',
  action: 'https://myapp.../process',
  active: true,
  httpMethod: 'GET',
  schedules: [{ cron: '* * * * 0 0 0', active: true }]
}, (err, result) => { /* handle */ });
```

## Rate Limits

| Limit Type | Response Code | Header |
|------------|---------------|--------|
| Client limit exceeded | 429 | `retry-after` (seconds) |
| Absolute limit exceeded | 503 | `throttling` (milliseconds) |

Limits stack - both can apply simultaneously.

## Service Behavior

### Outage Recovery

| Outage Duration | Behavior |
|-----------------|----------|
| < 20 minutes | All missed executions run immediately |
| >= 20 minutes | Only last missed execution runs |

### Auto-Deactivation Triggers

- One-time schedule executed
- No valid future dates exist
- Job/schedule endTime reached
- Action endpoint unreachable for 10+ days

## Reference Files

### Detailed Guides Available

1. **references/concepts.md** - Schedule types, formats, lifecycle, async mode, multitenancy
2. **references/rest-api.md** - Complete REST API reference with all endpoints
3. **references/setup-guide.md** - Prerequisites, service instance creation
4. **references/security.md** - OAuth 2.0, XSUAA scopes, credential rotation
5. **references/integrations.md** - Cloud ALM, Alert Notification Service
6. **references/troubleshooting.md** - FAQ, error scenarios, monitoring
7. **references/operations.md** - Dashboard, backup/restore, service behavior
8. **references/changelog.md** - Version history, feature updates (2021-2025)

### Templates Available

1. **templates/job-creation.json** - Job creation request template
2. **templates/xs-security.json** - XSUAA configuration template

## Common Pitfalls

**Setup:**
- ❌ Missing XSUAA binding before Job Scheduling binding
- ❌ Not granting scopes via `grant-as-authority-to-apps`
- ❌ Using HTTP instead of HTTPS for action endpoints

**Scheduling:**
- ❌ Using Linux cron format (service uses SAP cron)
- ❌ Scheduling at peak times (00:00, 00:30, etc.)
- ❌ Forgetting UTC timezone (only supported timezone)

**Async Jobs:**
- ❌ Not returning 202 Accepted immediately
- ❌ Forgetting to call Update Run Log API
- ❌ Multiple status updates instead of single final update

**Multitenancy:**
- ❌ Using `tenantId` filter with SaaS tenant tokens (returns 400)
- ❌ Missing Job Scheduling as application dependency

## External Resources

### SAP Documentation
- **SAP Help Portal**: [https://help.sap.com/docs/job-scheduling](https://help.sap.com/docs/job-scheduling)
- **SAP Developer Center**: [https://developers.sap.com/](https://developers.sap.com/)

### Support
- **Component**: BC-CP-CF-JBS
- **SAP Trust Center**: Platform status verification
- **Guided Answers**: Self-service troubleshooting

## Updates and Maintenance

**Source**: SAP BTP Job Scheduling Service Documentation

**To Update This Skill**:
1. Check GitHub repository for documentation updates
2. Review What's New section for changes
3. Update affected reference files
4. Update templates if configurations changed
5. Update "Last Verified" date

**Quarterly Review Recommended**: Check for updates every 3 months

**Next Review**: 2026-02-27

## Bundled Resources

### Reference Files
1. **references/concepts.md** - Schedule types, formats, lifecycle, async mode, multitenancy (12K lines)
2. **references/rest-api.md** - Complete REST API reference with all endpoints (20K lines)
3. **references/setup-guide.md** - Prerequisites, service instance creation (9K lines)
4. **references/security.md** - OAuth 2.0, XSUAA scopes, credential rotation (11K lines)
5. **references/integrations.md** - Cloud ALM, Alert Notification Service (8K lines)
6. **references/troubleshooting.md** - FAQ, error scenarios, monitoring (9K lines)
7. **references/operations.md** - Dashboard, backup/restore, service behavior (8K lines)
8. **references/changelog.md** - Version history, feature updates (2021-2025) (9K lines)

### Templates
1. **templates/job-creation.json** - Job creation request template with examples
2. **templates/xs-security.json** - XSUAA configuration template for OAuth scopes

---

**License**: GPL-3.0
**Maintainer**: SAP Skills Team | [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
