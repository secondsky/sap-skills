# SAP Cloud Transport Management - Troubleshooting Reference

**Source**: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/troubleshooting-issues-when-transporting-multitarget-applications-mtas-3f7a9bc.md

---

## MTA Deployment Errors

### Error 1: "Not Found" During Deployment

```
Exception during start of deployment for deploy type 'SLP_CTS': Error during client creation: Not Found
```

#### Issue 1A: Incorrect Cloud Foundry Domain

**Cause**: Destination URL points to wrong Cloud Foundry API endpoint domain.

**Details**: The URL to SAP Cloud Deployment service can use org/space names or space GUID. When the domain doesn't match the actual Cloud Foundry environment, deployment fails immediately even if connection checks succeed.

**Diagnosis**:
- Connection check succeeds but deployment fails
- Domain in URL doesn't match CF API endpoint

**Solution**:

1. Get correct CF API endpoint:
   - **Via Cockpit**: Subaccount Overview > Cloud Foundry Environment tab
   - **Via CLI**: `cf api`

2. Verify destination URL domain matches:
   - Example wrong: `eu10.hana.ondemand.com`
   - Example correct: `eu10-004.hana.ondemand.com`

3. Update destination URL with correct domain

**Reference**: SAP Cloud Foundry regions and API endpoints documentation

---

#### Issue 1B: Special Characters in Org/Space Names

**Cause**: Organization or space names contain special characters not URL-encoded.

**Affected Characters**:
- Whitespace (space)
- Slashes (`/`)
- Plus signs (`+`)
- Other non-URL-safe characters

**Details**: Special characters prevent proper URL path construction, causing deployment failure despite successful connection tests.

**Solutions**:

**Option 1: URL-Encode Special Characters**

Encode org and space names separately before combining:

| Character | Encoded |
|-----------|---------|
| Space | `%20` |
| Plus (`+`) | `%2B` |
| Comma (`,`) | `%2C` |
| Slash (`/`) | `%2F` |
| At (`@`) | `%40` |
| Ampersand (`&`) | `%26` |

Example: `dev+test` → `dev%2Btest`

**Option 2: Use Space GUID (Recommended)**

Replace org/space names with space GUID:

```bash
cf space <my-space-name> --guid
```

**Benefits**:
- GUIDs follow standard formatting
- HTTP-compatible (no encoding needed)
- Stable even if org/space names change

**URL Pattern**:
```
https://deploy-service.cf.<domain>/slprot/<space-guid>/slp
```

**Exception**: Avoid GUID-based URLs in automated pipelines that frequently recreate spaces for testing.

---

### Error 2: "Forbidden" During Deployment

```
Exception during start of deployment for deploy type 'SLP_CTS': Error during client creation: Forbidden
```

#### Issue 2A: User Lacks Required Privileges

**Cause**: User in destination doesn't have `SpaceDeveloper` role in target org/space.

**Details**: MTA deployment requires valid platform user with appropriate role assignments. Connection tests may succeed, but deployment fails due to insufficient permissions.

**Diagnosis**:
- Connection check succeeds
- Deployment fails with Forbidden error

**Solution**:

1. **Verify user roles via Cockpit**:
   - Navigate to subaccount
   - Select **Cloud Foundry > Spaces**
   - Click space tile
   - Review **Space Members**

2. **Verify via CLI**:
   ```bash
   cf space-users <org> <space>
   ```

3. **Add missing role**:
   - If user doesn't exist or lacks role, add with SpaceDeveloper permission

---

#### Issue 2B: User from Incorrect Identity Provider

**Cause**: User name exists in multiple identity providers; destination user from wrong provider or lacks role in that provider.

**Details**: When user names aren't unique across identity providers, system may authenticate against wrong provider, resulting in insufficient permissions.

**Solution**:

1. Verify user belongs to correct identity provider
2. Confirm SpaceDeveloper role in that specific provider
3. For custom IdP users: Use OAuth2Password authentication with `origin` property

**Destination Configuration for Custom IdP**:

```
Authentication: OAuth2Password
Additional Properties:
  origin: <your-custom-idp-name>
```

---

## General Troubleshooting Steps

### Step 1: Check Connection

Use **Check Connection** in destination configuration.

**Note**: Success only validates URL accessibility, not deployment capability.

### Step 2: Verify User Permissions

```bash
# List space users and roles
cf space-users <org> <space>

# Check current user
cf target
```

### Step 3: Validate Destination URL

```bash
# Get API endpoint
cf api

# Get space GUID
cf space <space-name> --guid
```

### Step 4: Review Transport Action Logs

**Location**: SAP Cloud Transport Management > Transport Action Logs

**Logged Actions**:
- Import to Node
- File Upload
- Upload to Node
- Delete Queue Entry
- Repeat Queue Entry
- Export to Node
- Add Queue Entry
- Forward Queue Entry

**Columns**:
- Node
- Action Type
- User
- Status
- End Time

**Download Formats**: Plain Text, CSV (selected or all actions)

### Step 5: Check Audit Logs

**Category**: `audit.security-events`

**Events Logged**:
- Cleanup service runs
- Authorization check failures
- Subscription plan updates

---

## Common Issues by Content Type

### MTA (Multitarget Applications)

| Issue | Cause | Solution |
|-------|-------|----------|
| `Not Found` | Wrong domain | Match CF API endpoint |
| `Not Found` | Unencoded special chars | Use GUID or URL-encode |
| `Forbidden` | Missing SpaceDeveloper | Add role to user |
| `Forbidden` | Wrong IdP | Use OAuth2Password with origin |
| Deployment timeout | Large MTA | Increase timeout, check resources |

### BTP ABAP

| Issue | Cause | Solution |
|-------|-------|----------|
| Connection refused | Wrong URL | Verify `SAP_COM_0948` URL pattern |
| Authentication failed | Wrong user | Use communication user from arrangement |
| Import failed | API mismatch | Use `MANAGE_SOFTWARE_COMPONENTS` API |

### Application Content

| Issue | Cause | Solution |
|-------|-------|----------|
| Unsupported format | Wrong file type | Check application requirements |
| Deployment failed | Target service issue | Check target application logs |

---

## Import Scheduler Issues

### Auto-Deactivation

**Trigger**: 3 consecutive fatal failures over 3+ weeks

**Indicator**: Nodes appear in **Import Schedules** section on home screen

**Resolution**:
1. Investigate root cause in Transport Action Logs
2. Fix underlying issue
3. Manually reactivate schedule

---

## Storage Issues

### Quota Exceeded

**Indicator**: Warning at 85% capacity; no uploads at 100%

**Solutions**:
1. Delete unnecessary transport requests
2. Reduce retention time
3. Upgrade service plan

### Files Not Auto-Deleted

**Cause**: Requests in non-final status (Fatal, Initial, Repeatable, Running)

**Solution**: Resolve stuck requests or manually delete

---

## Support Resources

### SAP Support Component

**Component**: `BC-CP-LCM-TMS`

Use for: Transport Management for application content

### Required Information for Incidents

When submitting SAP Support tickets, include:

| Information | Details |
|-------------|---------|
| Environment | Region (EU10, US10, etc.) |
| Account | Subaccount technical identifier |
| URL | Complete URL where error occurs |
| Reproduction | Exact steps triggering the issue |
| Logs | Relevant transport action logs |
| Evidence | Screenshots or screen recordings |

### Pre-Incident Checks

Before contacting support:
1. Check SAP platform status
2. Verify installed tool versions
3. Review announced maintenance windows
4. Search SAP Community for existing solutions

### Community Resources

- Search SAP Community posts tagged "SAP Cloud Transport Management"
- Create discussion threads for peer assistance

### Documentation Links

- Monitoring: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/monitoring-and-troubleshooting-c39411d.md
- MTA Troubleshooting: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/troubleshooting-issues-when-transporting-multitarget-applications-mtas-3f7a9bc.md
- Transport Action Logs: https://github.com/SAP-docs/btp-cloud-transport-management/blob/main/docs/transport-action-logs-86319ed.md
