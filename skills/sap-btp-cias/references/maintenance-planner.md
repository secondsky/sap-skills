# SAP Maintenance Planner Integration Guide

Using Maintenance Planner with Cloud Integration Automation Service.

**Source**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs

---

## Overview

Maintenance Planner provides an alternative method for invoking Cloud Integration Automation Service workflows. It allows planning of cloud integration scenarios with system selection based on S-User customer associations.

**Maintenance Planner URL**: https://maintenanceplanner.cfapps.eu10.hana.ondemand.com

---

## Prerequisites

### S-User Requirements

- S-User assigned to customer ID for maintenance planner access
- S-User must have appropriate authorizations for system visibility

### SAP BTP Requirements

- SAP BTP subaccount subscribed to Cloud Integration Automation Service
- Subaccount in supported region
- Users with appropriate role collections assigned

---

## Step-by-Step Workflow Invocation

### Step 1: Launch Maintenance Planner

Access the maintenance planner at:
```
https://maintenanceplanner.cfapps.eu10.hana.ondemand.com
```

### Step 2: Select Planning Tile

Click the tile labeled **"Plan for Cloud Integration Scenario"**.

### Step 3: Choose Solution

- Select from available solutions in the **Solutions** tab
- Use search function to locate specific cloud integration solutions
- Browse by category if needed

### Step 4: Select Scenario

Choose appropriate scenario from the available options presented.

### Step 5: Choose Scenario Option

Select a specific scenario option from available choices. Each scenario may have multiple configuration options.

### Step 6: Select Systems for Integration

**System Display**:
- Systems and tenants listed according to customer number based on S-User
- Only systems associated with your customer number appear

**If Systems Not Visible**:
- Manual landscape data entry available through Confirm System Components task in My Inbox application
- Search systems by Tenant URL if available

### Step 7: Configure Workflow Invocation

Provide the following four inputs:

| Field | Description |
|-------|-------------|
| **SAP BTP Region** | Data center selection for the workflow |
| **SAP BTP Account Technical Name** | Subaccount where CIAS is subscribed |
| **Workflow Users** | List of users for initial task assignment (must have subaccount access) |
| **Transaction Name** | Reference name for monitoring applications |

**Cross-Landscape Warning**:
- Systems from different landscapes may require confirmation before proceeding
- Review landscape implications before confirming

### Step 8: Generate Workflow

- Confirm all settings
- Workflow generation begins
- Wait for successful generation message

### Step 9: Launch Cloud Integration Automation Service

Upon successful generation:
- Link appears to launch CIAS
- Click link to access generated workflow
- Tasks appear in **My Inbox** tile

---

## System Selection Details

### Customer Number Association

Systems are organized by customer number linked to your global account and S-User credentials.

### Manual Entry Option

If expected systems don't appear:
1. Continue to My Inbox after workflow generation
2. Access **Confirm System Components** task
3. Manually enter system properties
4. Provide Account Name and Host details

### Tenant Data

- Tenant Name and Host from maintenance planner configuration
- Cannot be modified after initial setup
- Verify accuracy before proceeding

---

## Integration with CIAS

### Workflow Access

After maintenance planner workflow generation:
1. Access CIAS from Instances and Subscriptions
2. Open **My Inbox** tile
3. View generated tasks
4. Follow standard task execution process

### Transaction Monitoring

- Transaction name used in Scenario Execution Monitoring
- Filter by transaction name for easy identification
- All monitoring features available for maintenance planner-initiated workflows

---

## Important Notes

### Data Synchronization

Deleting a transaction in maintenance planner does **NOT** automatically delete associated data in Cloud Integration Automation Service.

**Manual deletion required**:
1. Terminate workflow in CIAS if needed
2. Create support ticket to BC-INS-CIT-RT for data deletion
3. Provide subaccount name and transaction details

### Transaction Limits

Maximum 15 running transactions per consumer subaccount applies to maintenance planner-initiated workflows as well.

### User Requirements

- All workflow users must have access to specified SAP BTP subaccount
- Users must have appropriate CIAS role collections assigned
- Identity provider configuration must include specified users

---

## Troubleshooting

### Systems Not Visible

**Cause**: Customer number not associated with S-User

**Solution**:
1. Verify S-User customer associations
2. Contact SAP to update customer number linkages
3. Use manual entry in Confirm System Components task

### Workflow Generation Fails

**Check**:
- SAP BTP subaccount name is valid
- Subaccount is subscribed to CIAS
- Region selection matches subaccount region
- All specified users exist in subaccount

### Cross-Landscape Confirmation Required

**When**: Systems from different landscapes selected

**Action**: Review and confirm cross-landscape integration implications before proceeding

---

## Documentation Links

- Using Maintenance Planner: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/using-maintenance-planner-2ad4326.md
- Confirm System Components: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/confirm-system-components-1f39555.md
- Maintenance Planner User Guide: https://support.sap.com/en/alm/solution-manager/processes/maintenance-planner.html
