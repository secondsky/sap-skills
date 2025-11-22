---
name: sap-btp-cias
description: |
  SAP BTP Cloud Integration Automation Service (CIAS) skill for guided integration workflows.
  Use when: setting up CIAS subscriptions, configuring destinations, assigning roles (CIASIntegrationAdministrator, CIASIntegrationExpert, CIASIntegrationMonitor), planning integration scenarios, working with My Inbox tasks, monitoring scenario execution, troubleshooting CIAS errors, creating OAuth2 instances, configuring identity providers for CIAS, understanding CIAS security architecture, or integrating SAP products (S/4HANA, SuccessFactors, BTP services, SAP Build, IBP).
license: MIT
metadata:
  version: "1.0.0"
  last_verified: "2025-11-22"
  sap_product: "Cloud Integration Automation Service"
  source_docs: "https://github.com/SAP-docs/btp-cloud-integration-automation-service"
---

# SAP BTP Cloud Integration Automation Service (CIAS)

Cloud Integration Automation Service provides guided workflows to integrate SAP cloud solutions with on-premise and other SAP cloud solutions. It offers both manual task instructions and automated configuration capabilities.

## Quick Reference

### Service Plans

| Plan | Type | Purpose |
|------|------|---------|
| **Standard** | Application | UI access for scenario planning, task monitoring, integration management |
| **OAuth2** | Service | API access for programmatic operations (required for ABAP automation) |

### Role Collections

| Role | Collection | Capabilities |
|------|------------|--------------|
| Integration Administrator | `CIASIntegrationAdministrator` | Full access: Plan for Integration, My Inbox, Monitoring; terminate scenarios |
| Integration Expert | `CIASIntegrationExpert` | My Inbox access; work on assigned tasks |
| Integration Monitor | `CIASIntegrationMonitor` | Read-only access to Scenario Execution Monitoring |

### Supported Regions

**AWS**: EU10 (Frankfurt), EU11 (Frankfurt EU Access), US10 (Virginia), AP10 (Sydney), JP10 (Tokyo), CA10 (Montreal)
**Azure**: EU20 (Netherlands), CN20 (China North 3)
**Alibaba**: CN40 (Shanghai)

## Core Workflows

### 1. Subscribe to CIAS (Standard Plan)

1. Navigate to SAP BTP Cockpit → Global Account → Subaccount
2. Go to **Services** → **Service Marketplace**
3. Filter by "Cloud Integration Automation Service"
4. Click tile → **Create** → Select **Standard** plan
5. Confirm creation
6. Access via **Instances and Subscriptions** → "Go to Application" icon

### 2. Assign Roles to Users

1. Navigate to **Security** → **Role Collections** in subaccount
2. Select role collection (e.g., `CIASIntegrationAdministrator`)
3. Click **Edit** → **Users** tab
4. Add users by email ID or login user ID
5. Save changes

> Multiple users can be assigned per role using comma-separated user IDs.

### 3. Plan Integration Scenario

1. Access CIAS application from Instances and Subscriptions
2. Open **Plan for Integration** tile
3. Browse available solutions in **Solutions** tab
4. Select scenario and scenario option
5. Choose systems for integration (by customer number)
6. Specify:
   - Target subaccount for workflow
   - SAP BTP Workflow Users (must have subaccount access)
   - Transaction name for monitoring
7. Confirm workflow generation
8. Access tasks in **My Inbox** tile

### 4. Work with Tasks (My Inbox)

1. Open **My Inbox** tile (requires Administrator or Expert role)
2. Click **Claim** to lock task for your user
3. Follow instructions in **Task Instructions** tab
4. For automation tasks: Configure parameters → Click **Execute Step**
5. Click **Task Completed** when done
6. Click **Refresh** to display next task
7. Repeat until viewing Execution Summary

### 5. Create Destination for Automation

1. In My Inbox → Confirm System Components task
2. Click **Create Destination** link
3. Configure:
   - **Name**: Valid identifier
   - **Description**: Purpose description
   - **URL**: Target system host URL
   - **Authentication**: Method + credentials
   - **Type**: HTTP (default)
4. Save configuration

> Always use HTTPS for secure communication.

### 6. Monitor Scenario Execution

1. Open **Scenario Execution Monitoring** tile (requires Administrator or Monitor role)
2. Filter workflows by status: Running, Completed, Canceled
3. View tabs: Task Details, Targets, Roles and Users, Scope, Support Information
4. Use **Terminate Execution** to remove scenarios permanently
5. Access **Logs** tab for automation execution details

## Service Limitations

- Maximum **15 active workflows** per subaccount
- No self-service data deletion (submit ticket to component `BC-INS-CIT-RT`)
- Logs retained for **90 days**
- OAuth2 certificate maximum validity: **1 year**
- Execution scope cannot be changed after confirmation
- Destination cannot be changed if already used in automation task
- Supported browsers: Google Chrome, Microsoft Edge (Chromium), Mozilla Firefox, Apple Safari (macOS)

## Security Architecture

CIAS comprises six core components:

1. **Runtime**: Backbone framework rendering integration tasks
2. **Planning**: UI for planning integration scenarios
3. **Inbox**: UI for end-user task access
4. **Monitoring**: UI for scenario implementation monitoring
5. **Managed System**: System configured during integration
6. **Automation Runtime**: Calls configuration APIs of managed systems

Security features:
- Role-based access via SAP BTP authorization framework
- XSRF protection for backend connectivity calls
- Identity provider integration (SAML assertion Name ID attribute supported)
- Credentials stored in Credential Store service (inaccessible to external parties)

## Common Error Patterns

### Empty Destination Dropdown

**Symptom**: Destination dropdown shows no options during task execution.

**Cause**: No destinations exist matching the tenant's Host Base URL.

**Solution**:
1. Create destination manually following Destination Creation steps
2. Ensure destination URL matches tenant Host Base URL exactly
3. Refresh the dropdown after creation

### Workflow Conflict Lock

**Symptom**: Cannot proceed with task; execution lock activated.

**Cause**: Multiple integration workflows exist with identical system components.

**Solutions**:
- **Proceed**: Continue without resolving (manual resolution later)
- **Terminate**: End selected conflicting instances
- **Terminate Current Instance**: Stop active workflow only
- **Cancel**: Halt operation entirely

### Application Access Denied After IdP Change

**Symptom**: Users cannot access CIAS application after identity provider change.

**Cause**: Users not managed by newly configured identity provider.

**Solution**:
1. Add users to new identity provider
2. Reassign role collections in subaccount Security settings
3. Verify user IDs exist in configured IdP

### Task Marked as Reserved

**Symptom**: Cannot claim task; shows "Reserved" status.

**Cause**: Another assigned user has already claimed the task.

**Solution**: Coordinate with team; only one user can work on claimed task at a time.

## Support Channels

| Issue Type | Component | Action |
|------------|-----------|--------|
| General CIAS support | `BC-INS-CIT-RT` | Create support ticket |
| Manual task instructions | Check Support Information tab | Submit incident to listed component |
| Data deletion request | `BC-INS-CIT-RT` | Include email ID and subaccount name |
| Service availability | Consumer account | Check Service Availability feature |

## OAuth2 API Access

For programmatic access (required for ABAP automation):

1. Navigate to subaccount → **Services** → **Service Marketplace**
2. Select Cloud Integration Automation Service → **Create**
3. Choose **OAuth2** plan
4. Select runtime: "Other" or "Cloud Foundry"
5. Provide instance name → Create

### Create Service Key (for API calls)

**With mTLS (Certificate)**:
```json
{
  "xsuaa": {
    "credential-type": "x509",
    "x509": {
      "key-length": 2048,
      "validity": 365,
      "validity-type": "DAYS"
    }
  }
}
```

**Without Certificate**: Create with name only.

Use generated client ID and client secret to create OAuth JWT token for API authentication.

## Data Protection

- Email IDs and subaccount names stored in service database
- System/tenant selection data preserved for workflow execution
- Logs do not store user-related personal data
- Audit logs follow SAP BTP Audit Log retention policy
- Sensitive data stored in Credential Store service

## Glossary

| Term | Definition |
|------|------------|
| **Personal Data** | Any information relating to identified/identifiable natural person |
| **Sensitive Personal Data** | Racial/ethnic origin, political opinions, religious beliefs, genetic/biometric data |
| **Residence Period** | Time between business end and end-of-purpose when data remains accessible |
| **Retention Period** | Time from last business activity through data deletion |
| **Blocking** | Restricting access to data whose primary business purpose has ended |

## Task UI Controls Quick Reference

### Automation Task Controls

| Control | Function |
|---------|----------|
| **Refresh** | Update automation statuses |
| **Expand All** | Show all parameter panels |
| **Collapse All** | Hide all parameter panels |
| **Show/Hide Read-Only Parameters** | Toggle read-only visibility |
| **Save Parameters** | Preserve current values |
| **Logs** | View execution records |
| **Information** | Parameter descriptions |
| **Execute Step** | Run automation (async) |

### Error Recovery

After automation failure:
- **Only Failed Automations** - Retry failed steps only
- **All Automations** - Retry entire sequence

## Related Reference Files

For detailed information, load these reference files as needed:

- `references/setup-guide.md` - Complete subscription and OAuth2 configuration
- `references/security-guide.md` - Security architecture, IdP, roles in detail
- `references/integration-scenarios.md` - Full list of 100+ supported scenarios with codes
- `references/troubleshooting.md` - Detailed troubleshooting procedures
- `references/maintenance-planner.md` - Using Maintenance Planner for workflow invocation
- `references/task-ui-guide.md` - Complete task UI controls and tab details
- `references/whats-new.md` - Complete release notes 2021-2025

## Documentation Sources

**Primary**:
- GitHub: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs
- SAP Help Portal: https://help.sap.com/docs/cloud-integration-automation-service

**Related**:
- Maintenance Planner: https://maintenanceplanner.cfapps.eu10.hana.ondemand.com
- Credential Store: https://help.sap.com/viewer/601525c6e5604e4192451d5e7328fa3c/Cloud/en-US/02e8f7d1016740b8adf68690f36df142.html
- SAP BTP Destinations: https://help.sap.com/docs/btp/sap-business-technology-platform/destination
