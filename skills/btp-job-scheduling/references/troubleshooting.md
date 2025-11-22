# SAP BTP Job Scheduling Service - Troubleshooting Guide

**Source**: https://github.com/SAP-docs/btp-job-scheduling-service/tree/main/docs
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Support Information](#support-information)
2. [Common Error Scenarios](#common-error-scenarios)
3. [Schedule Issues](#schedule-issues)
4. [Authentication Issues](#authentication-issues)
5. [Cloud Foundry Task Issues](#cloud-foundry-task-issues)
6. [Dashboard Access Issues](#dashboard-access-issues)
7. [Frequently Asked Questions](#frequently-asked-questions)

---

## Support Information

### Support Component

**Component:** `BC-CP-CF-JBS`

Use this component when creating SAP support tickets.

### Self-Service Resources

1. **SAP Trust Center** - Check platform status
2. **Guided Answers Tool** - Documented troubleshooting scenarios
3. **Platform Updates and Notifications** - Cloud Foundry environment updates

### Escalation Path

1. Check FAQ and troubleshooting scenarios
2. Verify platform status via SAP Trust Center
3. Use Guided Answers for common issues
4. Submit incident via SAP Support with component BC-CP-CF-JBS

---

## Common Error Scenarios

### Service Unavailability

**Symptoms:**
- Service missing from marketplace
- Service not visible in cockpit

**Diagnostic Steps:**
1. Verify service availability in your region (SAP BTP service portfolio)
2. Confirm quota assigned to subaccount
3. Check Space Developer role assignment

**Solutions:**

| Cause | Solution |
|-------|----------|
| No quota | Review [Managing Entitlements and Quotas](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/c8248745dde24afb91479361de336111.html) |
| Region unavailable | Create subaccount in supported region |
| Missing role | Request Space Developer role |

### REST API Authentication Errors

**Error:** HTTP Status Code 401

**Diagnostic Steps:**
1. Validate credentials being passed
2. Check token expiration
3. Verify correct endpoint URL

**Solutions:**

| Cause | Solution |
|-------|----------|
| Invalid credentials | Re-check VCAP_SERVICES values |
| Expired token | Request new token |
| Wrong endpoint | Use URL from service binding |

### OAuth Scope Issues

**Symptoms:**
- Granted scopes not in Job Scheduling tokens
- 403 Forbidden when calling action endpoint

**Diagnostic Steps:**
1. Manually retrieve token using Job Scheduling credentials:
   ```bash
   curl -X POST "<uaa-url>/oauth/token" \
     -H "Authorization: Basic <credentials>" \
     -d "grant_type=client_credentials"
   ```
2. Decode token and verify scope claim
3. Note: Tokens cached up to 12 hours

**Solutions:**

| Cause | Solution |
|-------|----------|
| Missing grant | Update `grant-as-authority-to-apps` in xs-security.json |
| Stale cache | Wait up to 12 hours for token refresh |
| Wrong binding | Verify Job Scheduling instance name matches |

---

## Schedule Issues

### Schedule Fails to Execute

**Possible Causes:**

| Cause | Description |
|-------|-------------|
| Invalid format | Date-time or cron format incorrect |
| Past endTime | Schedule endTime is in the past |
| Wrong timezone | Service uses UTC only |
| Auto-deactivated | See auto-deactivation triggers below |

### Auto-Deactivation Triggers

Schedules automatically deactivate when:

1. **One-time schedule executed** - Successful or failed
2. **No valid future dates** - All possible execution times passed
3. **endTime reached** - Job or schedule end time in past
4. **Endpoint unreachable** - Action endpoint unreachable for 10+ consecutive days

### ACK_NOT_RECVD Status

**Meaning:** Application hasn't updated the run log after processing.

**Solution:**
- Implement async callback properly
- Call Update Job Run Log API after completion:
  ```
  PUT /scheduler/jobs/{jobId}/schedules/{scheduleId}/runs/{runId}
  {
    "success": true,
    "message": "Completed"
  }
  ```

### Immediate Execution

**To execute a job immediately:**

Create one-time schedule with:
```json
{
  "time": "now"
}
```

### Cron Format Errors

**Common Mistake:** Using Linux cron format

**Correct:** SAP cron format (7 fields):
```
[Year] [Month] [Day] [DayOfWeek] [Hour] [Minute] [Second]
```

**Example with field mapping:**
```
*      *       *     *          9      0        0
Year   Month   Day   DayOfWeek  Hour   Minute   Second
// Daily at 9:00:00 AM UTC (SAP format)
```

NOT:
```
0 9 * * *        // Linux format (5 fields) - will NOT work
```

**Note:** `*` is a wildcard meaning "any value" for that field.

### Timezone Issues

**Note:** Service operates in **UTC only**. No other timezones supported.

Convert local times to UTC before scheduling.

---

## Authentication Issues

### 401 Unauthorized

**Check List:**
- [ ] Correct OAuth token in Authorization header
- [ ] Token not expired
- [ ] Using Bearer token format
- [ ] Correct endpoint URL

### 403 Forbidden

**Check List:**
- [ ] Scope granted via `grant-as-authority-to-apps`
- [ ] xs-security.json updated and service restarted
- [ ] Application validates token correctly
- [ ] Same space for app and service (co-location)

### Dashboard Authorization Error (500)

**Symptom:** 500 error when accessing dashboard

**Solution:**
Grant permissions at UAA login route:
```
https://uaa.cf.<region>.hana.ondemand.com/profile
```

Example: `https://uaa.cf.eu10.hana.ondemand.com/profile`

---

## Cloud Foundry Task Issues

### Unsuccessful Task Creation

**Diagnostic Steps:**
1. Check organization memory quota:
   ```bash
   cf org <org-name> --guid
   cf curl "/v2/organizations/<org-guid>/memory_usage"
   ```
2. Verify total available memory exceeds task requirements
3. Review application logs:
   ```bash
   cf logs <application_name> --recent
   ```

**Solutions:**

| Cause | Solution |
|-------|----------|
| Insufficient quota | Request additional memory quota |
| Memory too high | Configure task memory via dashboard |

### Configure Task Memory

In dashboard, use JSON options:
```json
{
  "memory_in_mb": 512
}
```

Default: 1024 MB (1 GB)

### CF Task Limitations

- Cannot create CF tasks via REST API
- Requires Space Developer role
- Must use dashboard for task creation
- Tasks always run asynchronously

---

## Dashboard Access Issues

### Prerequisites

- Space Developer role (full access)
- OR one of: SpaceAuditor, SpaceManager, OrgManager, SpaceSupporter (read-only)

### Access Methods

**Via BTP Cockpit:**
1. Navigate to subaccount
2. Go to **Service Instances**
3. Select Job Scheduling instance
4. Click **View Dashboard** or access via Service Bindings

**Via CF CLI:**
```bash
cf service <service-instance-name>
```

Look for dashboard URL in output.

### Kyma Dashboard Access

Requires one of:
- `SAP_Job_Scheduling_Service_Admin`
- `SAP_Job_Scheduling_Service_Viewer`

---

## Frequently Asked Questions

### General

**Q: What is the support component?**
A: BC-CP-CF-JBS

**Q: What are the prerequisites?**
A: Access to service in CF marketplace and xsuaa service for jobs with action endpoints.

**Q: What is the SLA?**
A: Scheduled jobs have approximately 20 minutes tolerance from scheduled execution time.

**Q: What do units on SAP Store represent?**
A: Each unit represents one creatable service instance.

### Multitenancy

**Q: How does multitenancy work?**
A: Multitenant applications can register jobs on behalf of subscribed tenants while maintaining tenant context awareness during execution.

**Q: What tokens are needed for multitenancy?**
A: Use client credentials flow with XSUAA to obtain access tokens.

**Q: What about tenantId filtering?**
A: The `tenantId` query parameter filters jobs when using client credentials tokens, but returns 400 for SaaS tenant tokens.

### Schedules

**Q: Why did my schedule auto-deactivate?**
A: One-time schedules deactivate after execution, recurring schedules deactivate when no valid future dates exist, endTime reached, or action endpoint unreachable for 10+ days.

**Q: What is ACK_NOT_RECVD?**
A: The application hasn't updated the run log after async processing. Call the Update Run Log API.

**Q: How do I execute immediately?**
A: Create one-time schedule with `"time": "now"`.

**Q: What cron format is used?**
A: SAP cron format (7 fields), NOT Linux cron format.

### API

**Q: Can CF tasks be created via REST API?**
A: No, only developers with Space Developer role can create them through the dashboard's Tasks section.

**Q: What is the request body size limit?**
A: 100 KB. Exceeding returns HTTP 413.

**Q: What timezone is used?**
A: UTC only. No other timezones supported.

### Data

**Q: How long are run logs retained?**
A: 15 days, then automatically deleted.

**Q: Can deleted jobs be restored?**
A: Yes, within time limits (14 days AWS/Azure, 7 days GCP). Same-day deletions cannot be restored.

---

## Error Code Reference

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Invalid request data | Check request body format |
| 401 | Unauthorized | Check credentials/token |
| 403 | Forbidden | Check scope grants |
| 404 | Not found | Verify job/schedule ID |
| 413 | Request too large | Reduce body size (<100KB) |
| 429 | Rate limit exceeded | Wait for retry-after period |
| 500 | Server error | Check dashboard auth |
| 503 | Service unavailable | Wait for throttling period |

---

## External References

### SAP Documentation
- **FAQ**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/frequently-asked-questions
- **Troubleshooting**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/troubleshooting-scenarios
- **Monitoring**: https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/monitoring-and-troubleshooting
- **Guided Answers**: https://ga.support.sap.com/

### Source Files
- `frequently-asked-questions-d72c276.md`
- `troubleshooting-scenarios-b05dc8c.md`
- `monitoring-and-troubleshooting-bd573bd.md`
