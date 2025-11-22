# Operations Guide - SAP BTP Intelligent Situation Automation

**Source**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation/tree/main/docs
**Last Verified**: 2025-11-22

---

## Overview

This guide covers operational aspects of Intelligent Situation Automation including automatic situation resolution, data export, and audit logging.

---

## Automatic Situation Resolution

### How It Works

Situations can be resolved automatically using:
1. **Standard SAP Actions** - Pre-built actions for specific situation templates
2. **Custom Actions** - User-defined actions created in Manage Situation Actions

### Manage Situation Actions Application

Use this application to:
- View available standard actions
- Create custom actions
- Configure action parameters
- Test action execution

---

## Standard SAP Actions

### Supported Situation Templates

| Situation Template | Template Code | Description |
|-------------------|---------------|-------------|
| Contract is Ready as Source of Supply | PROC_CONTRACTREADYTOUSE_V3 | Procurement contract automation |
| Physical Inventory Monitoring | MAN_PHYSICAL_INVENTORY_MONITOR | Inventory management automation |

### Required Communication Scenarios

#### SAP S/4HANA Cloud

| Situation Template | Required Scenario | Code |
|-------------------|-------------------|------|
| Contract Ready | Purchase Requisition Integration | SAP_COM_0102 |
| Physical Inventory | Physical Inventory Document Integration | SAP_COM_0107 |

#### SAP S/4HANA (On-Premise)

| Situation Template | Required API |
|-------------------|--------------|
| Contract Ready | Purchase Requisition Integration API |
| Physical Inventory | Physical Inventory Document Integration API |

### Configuring Standard Actions

1. Open **Manage Situation Automation** app
2. Select the situation type
3. Enable automation for the situation
4. Configure the standard action
5. Set conditions (optional)
6. Activate the automation

---

## Custom Actions

### Creating Custom Actions

1. Open **Manage Situation Actions** app
2. Click **Create**
3. Define action properties:
   - Name and description
   - Action type
   - Target endpoint
   - Parameters
4. Save and activate

### Action Configuration Options

| Option | Description |
|--------|-------------|
| Name | Unique action identifier |
| Description | Action purpose and behavior |
| HTTP Method | GET, POST, PUT, DELETE |
| Endpoint URL | Target API endpoint |
| Headers | Custom HTTP headers |
| Parameters | Input parameters from situation data |

---

## Manage Situation Automation Application

### Purpose

Configure which situations are automated and how they are resolved.

### Key Functions

| Function | Description |
|----------|-------------|
| View Situation Types | See available situation types from S/4HANA |
| Enable Automation | Turn on automation for a situation type |
| Configure Rules | Define conditions for action execution |
| Assign Actions | Link actions to situation types |
| Activate/Deactivate | Control automation status |

### Creating Automation Rules

1. Select a situation type
2. Define rule conditions based on situation data
3. Assign action to execute when conditions match
4. Set priority if multiple rules exist
5. Activate the rule

---

## Situation Dashboard

### Purpose

Monitor situation status and automation performance.

### Available Views

| View | Information |
|------|-------------|
| Overview | Total situations, resolution status |
| By Type | Situations grouped by type |
| By Status | Open, resolved, failed |
| Trends | Historical automation performance |

---

## Analyze Situations Application

### Purpose

Deep analysis of individual situations and resolution flows.

### Resolution Flow

The Resolution Flow shows the complete processing history:
- When situation was received
- Which rules were evaluated
- What action was applied
- Resolution outcome

### Status Indicators

| Status | Meaning |
|--------|---------|
| Resolved | Action successfully executed |
| No Action Applied | Rule conditions not matched |
| No Automation Configuration Found | No automation configured for type |
| Failed | Action execution failed |

---

## Data Export

### Purpose

Export all data stored by Intelligent Situation Automation.

### Export Endpoint

```
https://<subdomain>.<region>.intelligent-situation-automation.cloud.sap/exportdata
```

### URL Components

| Component | Description |
|-----------|-------------|
| subdomain | Your BTP subdomain |
| region | BTP region (e.g., eu10) |

### Example

```
https://mycompany-dev.eu10.intelligent-situation-automation.cloud.sap/exportdata
```

### Export Content

The export includes:
- Situation records
- Automation configurations
- Resolution history
- System onboarding data

---

## Audit Logging

### Audit Log Service

Intelligent Situation Automation uses the SAP BTP Audit Log service to track changes.

### Logged Events

| Event Category | Examples |
|----------------|----------|
| Configuration Changes | Automation rule creation, modification |
| System Management | System onboarding, updates |
| User Actions | Action creation, activation |

### Viewing Audit Logs

Access logs through the **Audit Log Viewer** in Cloud Foundry environment:

1. Navigate to BTP Cockpit
2. Go to your subaccount
3. Open **Audit Log Viewer** service
4. Filter by application or time range
5. Review logged events

**Reference**: SAP Help documentation for Audit Log Viewer for Cloud Foundry Environment

---

## Delete Data Context Application

### Purpose

Manage data retention and cleanup of situation data.

### Available Functions

| Function | Description |
|----------|-------------|
| View Data | See stored situation data |
| Delete Specific | Remove individual records |
| Bulk Delete | Remove data by criteria |

### Data Retention Considerations

- Review data retention policies before deletion
- Deleted data cannot be recovered
- Audit logs may retain references

---

## Explore Related Situations Application

### Purpose

Discover relationships between situations.

### Relationship Types

| Relationship | Description |
|--------------|-------------|
| Same Object | Situations for same business object |
| Same Type | Situations of same template |
| Temporal | Situations in same time period |

### Use Cases

- Identify patterns across situations
- Find root causes
- Optimize automation rules

---

## Operational Best Practices

### Monitoring

- ✅ Regularly review Situation Dashboard
- ✅ Check for failed automations
- ✅ Monitor resolution rates
- ✅ Track automation performance trends

### Rules Management

- ✅ Start with simple rules
- ✅ Test rules before production activation
- ✅ Document rule logic
- ✅ Review and optimize regularly

### Data Management

- ✅ Export data periodically for backup
- ✅ Implement data retention policies
- ✅ Review audit logs for compliance

### Troubleshooting

- ✅ Use Analyze Situations for detailed investigation
- ✅ Check Resolution Flow for specific situations
- ✅ Verify rule conditions match actual data

---

## External Links

- **Audit Log Viewer**: https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/
- **Data Protection**: https://help.sap.com/docs/btp/sap-business-technology-platform/data-protection-and-privacy
- **Business Rules**: https://help.sap.com/docs/business-rules

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-22
