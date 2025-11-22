# SAP BTP CIAS Troubleshooting Guide

Detailed troubleshooting procedures for Cloud Integration Automation Service.

**Source**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs

---

## Common Issues and Solutions

### Service Availability Issues

**Symptom**: Cannot access Cloud Integration Automation Service.

**Diagnostic Steps**:
1. Check Service Availability feature in consumer account
2. Verify subaccount subscription status
3. Confirm user has appropriate role collection assigned

**Solution**:
- Verify subscription is active in Instances and Subscriptions
- Check role assignment in Security → Role Collections
- Ensure identity provider is correctly configured

---

### Empty Destination Dropdown

**Symptom**: Destination dropdown shows no options during task execution.

**Cause**: No destinations exist matching the tenant's Host Base URL.

**Diagnostic Steps**:
1. Verify destination exists in subaccount
2. Check destination URL matches tenant Host Base URL exactly
3. Confirm destination type is HTTP/HTTPS

**Solution**:
1. Navigate to **My Inbox** → **Confirm System Components**
2. Click **Create Destination** link
3. Configure destination:
   - Name: Valid identifier
   - URL: Exact tenant Host Base URL (use HTTPS)
   - Authentication: Appropriate method
   - Type: HTTP
4. Save and refresh dropdown

---

### Task Marked as Reserved

**Symptom**: Cannot claim task; shows "Reserved" status.

**Cause**: Another assigned user has already claimed the task.

**Explanation**: When multiple users are assigned to a task, the first user to click **Claim** locks it. A padlock icon appears next to the claiming user in monitoring views.

**Solution**:
- Coordinate with team to identify who claimed the task
- Only one user can work on a claimed task at a time
- Wait for current user to complete or release the task

---

### Application Access Denied After IdP Change

**Symptom**: Users cannot access CIAS application after identity provider change.

**Cause**: Users not managed by newly configured identity provider.

**Solution**:
1. Add users to new identity provider
2. Navigate to **Security** → **Role Collections** in subaccount
3. Reassign role collections to users with new IdP credentials
4. Verify user IDs exist in configured IdP
5. Test login with updated credentials

---

### Workflow Conflict Lock

**Symptom**: Cannot proceed with task; execution lock activated.

**Cause**: Multiple integration workflows exist with identical system components.

**Resolution Options**:

| Action | Description |
|--------|-------------|
| **Proceed** | Continue without resolving conflicts (manual resolution later) |
| **Terminate** | End selected conflicting workflow instances |
| **Terminate Current Instance** | Stop only the active workflow |
| **Cancel** | Halt the operation entirely |

**Best Practice**: Review all active workflows in Scenario Execution Monitoring before proceeding.

---

### Automation Task Failure

**Symptom**: Automated task fails during execution.

**Diagnostic Steps**:
1. Access **Logs** tab for failed task
2. Review execution details and error messages
3. Check destination configuration
4. Verify user credentials in destination have required permissions

**Solution**:
1. Click **View Logs** button to review detailed execution log
2. Identify specific error
3. Fix underlying issue (credentials, permissions, network)
4. Re-execute using **Execute Step** button
5. Select failed components only for selective retry

---

### Destination Cannot Be Changed

**Symptom**: Edit Destination option unavailable or fails.

**Cause**: Destination is already used in an automation task.

**Explanation**: Once a destination is used in automation, it becomes locked to prevent inconsistency.

**Solution**:
- Create new destination with updated configuration
- Use new destination for subsequent tasks
- Complete current workflow before destination modifications

---

### Task Instructions Missing or Incorrect

**Symptom**: Task instructions don't appear or contain demo content.

**Explanation**: Task Instructions tab may contain demonstration content that varies from actual instructions.

**Solution**:
1. Check **Support Information** tab for scenario-specific guidance
2. Submit incident to component listed in Support Information tab
3. For general issues, create ticket to **BC-INS-CIT-RT**

---

### Systems Not Visible in Selection

**Symptom**: Expected systems don't appear in system selection during planning.

**Cause**: Systems not associated with customer number linked to global account.

**Solution**:
1. Verify S-User customer number associations
2. Use manual landscape data entry through **Confirm System Components** task
3. Search systems by Tenant URL if available
4. Contact SAP support if systems should be visible

---

### Maximum Workflow Limit Reached

**Symptom**: Cannot create new workflow; limit error displayed.

**Cause**: 15 active workflows already exist in subaccount.

**Solution**:
1. Open **Scenario Execution Monitoring**
2. Filter for **Running** workflows
3. Identify completed or unnecessary workflows
4. **Terminate** workflows no longer needed
5. Or wait for active workflows to complete

> **Note**: Maximum 15 running transactions per CIAS consumer subaccount.

---

### Data Deletion Required

**Symptom**: Need to delete transactional data or user email IDs.

**Cause**: No self-service deletion option available.

**Solution**:
1. Create support request to component **BC-INS-CIT-RT**
2. Include in ticket:
   - Email ID requiring removal
   - SAP BTP consumer subaccount name
3. Wait for support confirmation

> **Note**: Deleting transaction in maintenance planner does NOT automatically delete CIAS data.

---

## Monitoring and Logs

### Accessing Scenario Execution Monitoring

**Prerequisites**: Integration Administrator or Integration Monitor role

**Steps**:
1. Open **Scenario Execution Monitoring** tile
2. Filter workflows by status:
   - **Running**: Active workflows
   - **Completed**: Finished workflows
   - **Canceled**: Terminated workflows

### Available Monitoring Tabs

| Tab | Content |
|-----|---------|
| **Task Details** | Individual task status and details |
| **Targets** | Target system and destination information |
| **Roles and Users** | User assignments per task |
| **Scope** | Execution scope (mandatory/optional tasks) |
| **Support Information** | Support resources and component IDs |
| **Parameters** | Automation parameters (when task selected) |
| **Comments** | User comments for all tasks |
| **Logs** | Detailed automation execution logs |

### Viewing Task Skip Reasons

When task status shows "Not Applicable":
1. Click the status link
2. View explanation for why task was skipped

### Logs Tab Details

The Logs tab provides detailed overview of:
- Execution timeline
- Trial attempts
- Error messages
- Success/failure status per automation component

Access by selecting a task in monitoring view.

---

## Support Channels

### General CIAS Support

**Component**: `BC-INS-CIT-RT`

**Use for**:
- Service issues
- Data deletion requests
- General questions

**Required information**:
- Consumer subaccount name
- User email ID (if applicable)
- Detailed issue description

### Manual Task Instruction Support

**Process**:
1. Open task in My Inbox
2. Navigate to **Support Information** tab
3. Note the component ID listed
4. Submit incident to that specific component

### Scenario-Specific Issues

**Process**:
1. Open **Scenario Execution Monitoring**
2. Select affected scenario
3. Navigate to **Support Information** tab
4. Follow guidance or submit incident to listed component

---

## Accessibility Features

CIAS operates on the SAP BTP cockpit platform and inherits its accessibility capabilities.

### Platform Accessibility

CIAS is built on SAP Fiori/SAPUI5 technology, which provides:

| Feature | Support Level |
|---------|---------------|
| **Screen Readers** | Supported (JAWS, NVDA, VoiceOver) |
| **Keyboard Navigation** | Full keyboard operability |
| **High Contrast Themes** | Available via SAP BTP cockpit settings |
| **Focus Indicators** | Visible focus states for interactive elements |
| **ARIA Labels** | Semantic markup for assistive technologies |

### Keyboard Navigation

Common keyboard shortcuts in CIAS applications:

| Action | Shortcut |
|--------|----------|
| Navigate between elements | Tab / Shift+Tab |
| Activate buttons/links | Enter or Space |
| Navigate lists | Arrow keys |
| Close dialogs | Escape |
| Access menus | F6 (navigate regions) |

### Theme Customization

Users can adjust themes via the user info dropdown:
1. Click user avatar/name in header
2. Select **Settings** or **Appearance**
3. Choose from available themes:
   - Morning Horizon (Light) - Default
   - Evening Horizon (Dark)
   - High Contrast Black
   - High Contrast White

### Known Limitations

- Complex automation parameter forms may require additional screen reader configuration
- Some monitoring charts may have limited accessibility descriptions
- PDF export functionality may produce documents with varying accessibility compliance

### Accessibility Resources

- SAP BTP Cockpit Accessibility: https://help.sap.com/docs/btp/sap-business-technology-platform/accessibility-features
- SAPUI5 Accessibility: https://sapui5.hana.ondemand.com/sdk/#/topic/03b914b46e624b138a6fb1b7cf2049ae
- SAP Accessibility Statement: https://www.sap.com/about/company/diversity/accessibility.html

---

## Documentation Links

- Monitoring and Troubleshooting: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/monitoring-and-troubleshooting-18460b7.md
- Monitoring Scenario Implementation: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/monitoring-scenario-implementation-f8daffa.md
- Working with Tasks: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/working-with-tasks-3da3577.md
- Task Details: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/task-9ec0684.md
- Confirm System Components: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/confirm-system-components-1f39555.md
