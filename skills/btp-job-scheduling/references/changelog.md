# SAP BTP Job Scheduling Service - Changelog & Version History

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs/10---What-s-New
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [2025 Updates](#2025-updates)
2. [2024 Updates](#2024-updates)
3. [2023 Updates](#2023-updates)
4. [2022 Updates](#2022-updates)
5. [2021 Updates](#2021-updates)
6. [Feature Summary](#feature-summary)

---

## 2025 Updates

### August 21, 2025 - Belize Themes Removed

**Type:** Changed

**Description:** The older Belize UI themes were discontinued. Users now select from four Horizon options:
- Morning Horizon (Default)
- Evening Horizon
- Horizon High Contrast Black
- Horizon High Contrast White

**Impact:** Systems automatically migrated users from deprecated themes.

---

### July 24, 2025 - New Event Resource Tags

**Type:** New Feature

**Description:** Added three new resource tags for event matching with SAP Alert Notification Service:
- `runStatus`
- `runState`
- `scheduleDescription`

**Use Case:** Enhanced monitoring and filtering capabilities for job notifications.

---

### June 12, 2025 - Default Theme Changed

**Type:** Changed

**Description:** "Morning Horizon" became the standard UI theme, replacing the older Belize default.

---

### May 29, 2025 - Multiple Updates

**1. Horizon Themes Introduced**

**Type:** New Feature

**Description:** Four new theme options available for dashboard customization:
- Morning Horizon
- Evening Horizon
- Horizon High Contrast Black
- Horizon High Contrast White

---

**2. SAP Cloud ALM Integration**

**Type:** New Feature

**Description:** New capability enabling direct job status tracking through SAP Cloud ALM's interface.

**Configuration:**
```json
{
  "calmConfig": {
    "enabled": true
  }
}
```

---

**3. One-Time Schedule Cleanup Policy**

**Type:** New Feature

**Description:** Unused one-time schedules are now automatically deleted after **30 days of inactivity**.

**Recommendation:** Use recurring schedules as alternative for persistent scheduling needs.

**Important:** This is an automatic cleanup - no action required, but be aware that inactive one-time schedules will be removed.

---

## 2024 Updates

### November 14, 2024 - Service Instance Creation Simplified

**Type:** Changed

**Description:** The `enable-xsuaa-support` property now **defaults to enabled**, eliminating manual configuration requirements.

**Impact:**
- New service instances automatically support XSUAA
- No additional parameters needed during creation
- Simplifies initial setup process

**Before (Required):**
```json
{
  "enable-xsuaa-support": true
}
```

**After (Default behavior):** No parameter needed.

---

## 2023 Updates

### August 24, 2023 - Kyma Runtime Support

**Type:** New Feature

**Description:** Cross-consumption capabilities for Kyma runtime announced.

**Availability:** Public cloud infrastructure providers only (AWS, Azure, GCP).

**Environments Supported:**
- Cloud Foundry runtime
- Kyma runtime

---

### July 13, 2023 - Job Filtering in Dashboard

**Type:** New Feature

**Description:** Job filtering functionality introduced for the list view.

**Filter Options:**
- By job name
- By subdomain
- By tenant ID

---

### May 18, 2023 - Two Updates

**1. Service Key Creation**

**Type:** New Feature

**Description:** Service key creation capability added for the standard service plan.

**Use Case:** Enables credential generation for service instances without application binding.

**Command:**
```bash
cf create-service-key <instance-name> <key-name>
```

---

**2. SAP Alert Notification Integration**

**Type:** New Feature

**Description:** Integration with SAP Alert Notification service enabled.

**Capabilities:**
- Send notifications when jobs succeed
- Send notifications when jobs fail
- Configure via `ansConfig` in job creation

**Configuration:**
```json
{
  "ansConfig": {
    "onSuccess": true,
    "onError": true
  }
}
```

**Availability:** Cloud Foundry only (not Kyma).

---

### February 9, 2023 - Enhanced Table Column Management

**Type:** New Feature

**Description:** Enhanced table column management in the Service Dashboard.

**New Capabilities:**
- Adjust width of any column
- Menu options to view full job/task names
- Toggle between truncated and full-name display

---

## 2022 Updates

### September 23, 2022 - Asynchronous Timeout Limit

**Type:** Changed

**Description:** The Asynchronous Execution Timeout configuration parameter now has a maximum ceiling.

**Maximum Value:** 604,800 seconds (7 days)

**Configuration Location:** Service Dashboard → Configurations

---

### February 24, 2022 - REST API Rate Limiting

**Type:** New Feature

**Description:** API calls are now subject to rate limits that may delay or deny requests during high load periods.

**Response Codes:**
| Limit Type | Response Code | Header |
|------------|---------------|--------|
| Client limit | 429 | `retry-after` |
| Absolute limit | 503 | `throttling` |

**Recovery:** Denied requests can be retried after less than one minute.

---

### February 10, 2022 - Automatic Schedule Deactivation

**Type:** New Feature

**Description:** The system now automatically deactivates schedules under certain conditions.

**Deactivation Triggers:**
- One-time schedule executed
- No valid future dates exist
- Job/schedule endTime reached
- Action endpoint unreachable for 10+ consecutive days

---

### January 27, 2022 - Certificate-Based Service Binding

**Type:** New Feature

**Description:** Users can bind service instances using X.509 certificates.

**Recommendation:** SAP's recommended practice for secure connections.

**Configuration:**
```json
{
  "credential-type": "x509",
  "x509": {
    "key-length": 2048,
    "validity": 7,
    "validity-type": "DAYS"
  }
}
```

---

## 2021 Updates

### December 16, 2021 - Two Updates

**1. REST API Rate Limits**

**Type:** New Feature

**Description:** Implemented request rate limiting with retry header.

---

**2. Missed Run Behavior**

**Type:** New Feature

**Description:** Service now skips all missed executions except the last one during outages exceeding 20 minutes.

**Behavior:**
| Outage Duration | Behavior |
|-----------------|----------|
| < 20 minutes | All missed runs executed |
| >= 20 minutes | Only last missed run executed |

**Rationale:** Prevents overwhelming target applications upon recovery.

---

### May 20, 2021 - Custom Identity Provider Support

**Type:** New Feature

**Description:** The service extended compatibility to work with custom identity providers alongside platform users.

**Capabilities:**
- Dashboard management with custom IdP
- Support for federated authentication

---

### February 25, 2021 - CF Task Timeout

**Type:** New Feature

**Description:** Asynchronous job execution adopted a 30-minute default timeout limit.

**Details:**
- Tasks automatically terminated after timeout
- Configurable via Service Dashboard → Configurations
- Maximum: 604,800 seconds (7 days)

---

### December 17, 2020 - Binding Level Secrets

**Type:** New Feature

**Description:** New client secrets are automatically generated when applications bind to the service.

**Benefit:** Enables secret rotation through unbind/rebind cycles.

**Rotation Process:**
1. `cf unbind-service <app> <instance>`
2. `cf bind-service <app> <instance>`
3. `cf restage <app>`

---

## Feature Summary

### Key Capabilities by Year

| Year | Major Features |
|------|---------------|
| 2025 | Horizon themes, Cloud ALM integration, one-time schedule cleanup |
| 2024 | Simplified XSUAA setup (defaults enabled) |
| 2023 | Kyma support, Alert Notification, service keys, job filtering |
| 2022 | Rate limiting, certificate binding, auto-deactivation, async timeout cap |
| 2021 | Custom IdP, CF task timeout, missed run behavior, binding secrets |

### Current Feature Set

**Scheduling:**
- One-time and recurring schedules
- Cron, date/time, human-readable formats
- Automatic cleanup of unused one-time schedules (30 days)

**Execution:**
- Synchronous (≤15 seconds)
- Asynchronous (up to 7 days timeout)
- Cloud Foundry tasks

**Security:**
- OAuth 2.0 (XSUAA) - default enabled
- X.509 certificate binding (recommended)
- Custom identity provider support
- Binding-level credential rotation

**Monitoring:**
- SAP Cloud ALM integration
- SAP Alert Notification Service (CF only)
- Event resource tags (runStatus, runState, scheduleDescription)

**Management:**
- Service Dashboard with Horizon themes
- REST API with rate limiting
- Node.js client library
- Job filtering by name, subdomain, tenant ID

**Runtimes:**
- Cloud Foundry
- Kyma (public cloud only)

---

## External References

### SAP Documentation
- **What's New**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/what-s-new-for-sap-job-scheduling-service
- **2023 Archive**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/2023-what-s-new-for-sap-job-scheduling-service-archive
- **2022 Archive**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/2022-what-s-new-for-sap-job-scheduling-service-archive
- **2021 Archive**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/2021-what-s-new-for-sap-job-scheduling-service-archive

### Source Files
- `what-s-new-for-sap-job-scheduling-service-35dd2f8.md`
- `2023-what-s-new-for-sap-job-scheduling-service-archive-8ff6481.md`
- `2022-what-s-new-for-sap-job-scheduling-service-archive-cd1964a.md`
- `2021-what-s-new-for-sap-job-scheduling-service-archive-78f6a4b.md`
