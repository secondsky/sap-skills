# SAP BTP CIAS Task UI Complete Guide

Complete reference for working with tasks in Cloud Integration Automation Service My Inbox and Monitoring applications.

**Source**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs

---

## Task Types

When hovering over tasks in the Overview tab, you can identify task types:

| Type | Icon/Label | Description |
|------|------------|-------------|
| **Concept Task** | Overview icon | Scenario overview task |
| **Topic** | Header icon | Task grouping header |
| **User Task** | Manual icon | Manual configuration task |
| **User Service Task** | Automation icon | Automated configuration task |

---

## My Inbox Application

### Access Requirements

Users need one of these roles:
- **Integration Administrator** (CIASIntegrationAdministrator)
- **Integration Task Expert** (CIASIntegrationExpert)

### Accessing My Inbox

1. Navigate to SAP BTP Cockpit
2. Select subaccount with CIAS subscription
3. Go to **Instance and Subscriptions**
4. Under Subscriptions, click **Go To Application** icon next to Cloud Integration Automation service
5. Select **My Inbox** tile

---

## Task Instructions Tab

### Manual Tasks

For manual tasks:
1. Review on-screen instructions
2. Execute required actions on target system
3. Click **Task Completed** when finished

### Automation Tasks

For tasks enabled for automation:
1. Configure parameter details in respective fields
2. Use available controls (see below)
3. Click **Execute Step** to process automations

### Available Controls

| Control | Function |
|---------|----------|
| **Refresh** | Updates automation statuses after execution |
| **Expand All** | Expands all parameter panels |
| **Collapse All** | Collapses all parameter panels |
| **Show/Hide Read-Only Parameters** | Toggles visibility of read-only parameters |
| **Save Parameters** | Preserves current parameter values |
| **Logs** | Shows execution records and logs |
| **Information** | Describes each parameter's purpose |
| **Execute Step** | Processes the automation (runs asynchronously) |

### Multi-User Task Handling

When multiple users are assigned to a task:
1. Any assigned user can click **Claim** to lock the task
2. Task becomes marked as **Reserved** for all other assigned users
3. A **padlock icon** displays next to the claiming user
4. Only the claiming user can complete the task

### Error Handling After Failed Automation

After fixing incorrect parameters, users can select:
- **Only Failed Automations** - Retry only failed steps
- **All Automations** - Retry entire automation sequence

---

## Overview Tab

Displays all tasks in execution sequence showing:
- Manual instructions for each task
- Comments associated with tasks
- Current execution position (marked with arrow)

### Controls

| Control | Function |
|---------|----------|
| **Expand All** | Expand all task details |
| **Collapse All** | Collapse all task details |
| **Current Task Instruction** | Jump to current task |

---

## Comments Tab

### Features
- Displays comments for ALL tasks in the scenario
- Comments visible to all assigned users and admins
- Search functionality for finding specific comments
- Refresh capability for latest comments

### Adding Comments
1. Type comment in text field
2. Click submit to post
3. Comment immediately visible to all users

---

## System Access Tab

Provides:
- System access details for selected task
- Direct connection links to target systems
- Authentication information (if configured)

---

## Assigned To Tab

Shows all users assigned to the selected task.

**Limitations**:
- View-only access
- Cannot change assigned users from this tab
- Cannot modify role assignments

### Viewing Role Details

1. Click on role name in Task Instructions
2. View:
   - Role description
   - Complete list of users assigned to that role

---

## Support Information Tab

Contains:
- Maintenance Planner ID
- Transaction Name
- Creation Date
- Additional support metadata
- Component IDs for support tickets
- Assistance resources for error resolution

---

## Scopes Tab

Enables:
- Assignment of execution scope from available options
- Removal of execution scope if needed
- View of current scope selection

---

## Task Workflow Process

### Standard Workflow

1. Open **My Inbox** tile
2. Review task in left panel
3. Click **Claim** to lock task
4. Read **Task Instructions** tab
5. Complete required actions
6. Click **Task Completed**
7. Click **Refresh** in left pane
8. Next task appears
9. Repeat until Execution Summary displays

### Automation Workflow

1. Claim task
2. Review automation parameters
3. Configure required parameters
4. Optionally: **Save Parameters**
5. Click **Execute Step**
6. Wait for asynchronous execution
7. Click **Refresh** to update status
8. Review **Logs** if needed
9. Click **Task Completed**
10. Proceed to next task

---

## Scenario Execution Monitoring

### Access Requirements

- **Integration Administrator** role, OR
- **Integration Monitoring** role

### Main Features

- Status overview of active workflow instances
- Filter by status: Running, Completed, Canceled
- Terminate execution capability (Admin only)

### Available Tabs

| Tab | Content | Visibility |
|-----|---------|------------|
| **Task Details** | Individual task status, skip reasons | Always |
| **Targets** | Target systems, destinations | Always |
| **Roles and Users** | User assignments per task | Always |
| **Scope** | Execution scope selection | Always |
| **Support Information** | Support resources | Always |
| **Parameters** | Automation parameters | When task selected |
| **Comments** | User comments | Always |
| **Logs** | Execution logs, trial information | When task selected |

### Task Skip Reasons

When task status shows "Not Applicable":
1. Click the status link
2. View explanation for why task was skipped

### Terminate Execution

**Warning**: Removes scenario from CIAS applications **permanently**.

1. Open Scenario Execution Monitoring
2. Select workflow
3. Click **Terminate Execution**
4. Confirm termination

### Logs Tab Details

Provides detailed overview of:
- Execution timeline
- Trial attempts (number of retries)
- Error messages
- Success/failure status per automation component
- Parameter values used

Access by selecting a task and opening the Logs tab.

---

## Disclaimer Task

The first task in any scenario inbox.

### Access
Only users with Admin role can view and complete.

### Tabs Available

| Tab | Content |
|-----|---------|
| **Summary** | SAP terms, conditions, integration recommendations |
| **Assigned To** | Users assigned to task (view-only) |
| **Support Information** | Support details for issues |

### Completion

1. Review Summary tab carefully
2. Document relevant points
3. Click **I Agree** to provide consent and proceed

---

## Confirm System Components Task

### Access
Only users with Admin role can view and complete.

### Main Steps

1. **Review Components**
   - Populated from maintenance planner selections
   - Click **Confirm Systems** button

2. **Assign Destinations**
   - Optional but enables automation
   - Without destination: respective automation unavailable

3. **Account Details**
   - Specify Account Name and Host
   - For SAP BTP Account Cockpit (from maintenance planner)

4. **Manual Entry**
   - Some scenarios allow manual system property entry
   - Use when management system data not displayed

### Critical Notes

- Tenant Name and Host **cannot be changed** after confirmation
- Missing destinations must be created in SAP BTP subaccount first

### Workflow Conflict Handling

If multiple workflows exist with same system components:

| Option | Action |
|--------|--------|
| **Proceed** | Continue; resolve conflicts manually later |
| **Terminate** | End selected conflicting instances |
| **Terminate Current Instance** | Stop only active workflow |
| **Cancel** | Halt the operation |

---

## Selecting Execution Scope Task

### Access
Only users with Admin role can view and complete.

### Options

| Selection | Result |
|-----------|--------|
| **Don't perform optional tasks** | Execute mandatory tasks only |
| **Perform optional tasks** | Execute ALL tasks including optional |

### Completion

1. Select desired scope option
2. Click **Confirm Scope Selection**

**Warning**: Execution scope **cannot be changed** after confirmation.

---

## Uploading Files in Tasks

### Purpose
Upload certificate files for reuse across systems in landscape.

### Process

1. Navigate to **Task Instructions** tab in My Inbox
2. Click **Browse** button
3. Select SAP S/4HANA Certificate file
4. Upload completes automatically
5. File available for multiple tasks

---

## Execution Summary Screen

### Purpose
Final task confirming scenario completion.

### Completion

1. Review execution summary
2. Click **Complete Execution** to finalize

**Warning**: After clicking Complete Execution, scenario **no longer appears** in Scenario Execution Monitoring.

### PDF Export

**From My Inbox**:
- Use **Export to PDF** button on Execution Summary screen

**From Scenario Execution Monitoring**:
- Use **Export to PDF** button anytime during execution

---

## Role Assignment Task

### Capabilities
- Assign multiple users per role with comma-separated user IDs
- View role descriptions
- View assigned users list

### Access
Only users with Admin role can view and complete.

### Prerequisites
- Users must have access to SAP BTP subaccount
- Users must exist in configured identity provider

---

## Documentation Links

- Working with Tasks: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/working-with-tasks-3da3577.md
- Task Details: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/task-9ec0684.md
- My Inbox: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/my-inbox-7f7860d.md
- Monitoring: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/monitoring-scenario-implementation-f8daffa.md
- Disclaimer: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/disclaimer-7823b84.md
- Confirm System Components: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/confirm-system-components-1f39555.md
- Execution Scope: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/selecting-execution-scope-444db93.md
- Summary: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/summary-71f9a64.md
