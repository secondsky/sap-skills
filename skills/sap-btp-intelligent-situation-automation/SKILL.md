---
name: sap-btp-intelligent-situation-automation
description: |
  This skill provides comprehensive guidance for SAP BTP Intelligent Situation Automation setup, configuration, and operations.
  It should be used when implementing situation-based automation between SAP S/4HANA systems and SAP Business Technology Platform.

  The skill covers subscription setup, Event Mesh integration, destination configuration, system onboarding,
  user management with role collections, automatic situation resolution, and troubleshooting.

  Keywords: SAP BTP, Intelligent Situation Automation, ISA, situation handling, SAP S/4HANA, SAP S/4HANA Cloud,
  Event Mesh, Business Event Handling, situation automation, situation dashboard, analyze situations,
  SAP_COM_0345, SAP_COM_0376, SAP_COM_0092, SituationAutomationKeyUser, SituationAutomationAdminUser,
  Cloud Connector, cf-eu10, CA-SIT-ATM, business situations, situation types, situation actions
license: MIT
---

# SAP BTP Intelligent Situation Automation

## Overview

SAP Intelligent Situation Automation is a BTP service that enables automatic handling of business situations from SAP S/4HANA and SAP S/4HANA Cloud systems. It leverages SAP Event Mesh for real-time event communication and allows organizations to define automated actions for resolving situations.

**Documentation Source**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation

**Last Verified**: 2025-11-22

## When to Use This Skill

Use this skill when:

- **Subscribing to Intelligent Situation Automation** on SAP BTP
- **Configuring Event Mesh** for situation event communication
- **Setting up destinations** to connect S/4HANA systems
- **Onboarding SAP S/4HANA or SAP S/4HANA Cloud** systems
- **Exposing Situation Handling APIs** (SAP_COM_0345, SAP_COM_0376)
- **Assigning user roles** (SituationAutomationKeyUser, SituationAutomationAdminUser)
- **Creating automation rules** for automatic situation resolution
- **Troubleshooting** situation automation issues
- **Analyzing situations** via the Situation Dashboard

## Quick Decision Tree

### What Task?

```
Subscription & Setup
├─ Prerequisites → references/setup-guide.md
├─ Subscribe to service → references/setup-guide.md#subscription-process
├─ Enable Event Mesh → references/setup-guide.md#event-mesh-configuration
└─ Configure region (cf-eu10) → references/setup-guide.md#network-requirements

Onboarding S/4HANA Systems
├─ Expose APIs
│  ├─ SAP S/4HANA Cloud → references/onboarding.md#sap-s4hana-cloud
│  └─ SAP S/4HANA (on-premise) → references/onboarding.md#sap-s4hana-on-premise
├─ Configure destinations → references/onboarding.md#2-configure-destinations-on-sap-btp
├─ Set up Event Mesh communication → references/onboarding.md#3-set-up-communication-with-sap-btp
└─ Onboard system → references/onboarding.md#4-onboard-s4hana-system

User Management
├─ Define roles → references/security-roles.md#role-templates
├─ Create role collections → references/security-roles.md#role-collections
└─ Assign to users → references/security-roles.md#assigning-role-collections-to-users

Operations
├─ Configure automatic resolution → references/operations.md#automatic-situation-resolution
├─ Export data → references/operations.md#data-export
└─ View audit logs → references/operations.md#audit-logging

Troubleshooting
├─ Server errors → references/troubleshooting.md#error-1-server-error-on-application-access
├─ No automation execution → references/troubleshooting.md#error-2-no-action-applied
├─ Missing configuration → references/troubleshooting.md#error-3-no-automation-configuration-found
└─ Support: CA-SIT-ATM
```

## Supported Systems

| System | Version | Notes |
|--------|---------|-------|
| SAP S/4HANA Cloud | Current | Full support |
| SAP S/4HANA | 2021 FPS0+ | On-premise, requires Cloud Connector |

## Region & Infrastructure

| Setting | Value |
|---------|-------|
| **Region** | Europe (Frankfurt) |
| **Technical ID** | cf-eu10 |
| **Provider** | AWS |
| **Environment** | SAP BTP Cloud Foundry |

## Core Components

### Required Services

| Service | Purpose |
|---------|---------|
| Intelligent Situation Automation | Main application (standard plan) |
| SAP Event Mesh | Event communication between S/4HANA and BTP |
| Cloud Connector | On-premise S/4HANA connectivity (optional) |

### Communication Scenarios (SAP S/4HANA Cloud)

| Scenario | Code | Purpose |
|----------|------|---------|
| Business Situation Integration | SAP_COM_0345 | Situation API access |
| Business Situation Master Data Integration | SAP_COM_0376 | Situation type data |
| Enterprise Event Enablement | SAP_COM_0092 | Event channel setup |
| Purchase Requisition Integration | SAP_COM_0102 | Contract ready action |
| Physical Inventory Document Integration | SAP_COM_0107 | Inventory monitoring action |

### APIs (SAP S/4HANA On-Premise)

| API | Purpose |
|-----|---------|
| Business Situation - Read | Read situation data |
| Business Situation Type - Read | Read situation type data |
| Purchase Requisition Integration API | Contract ready action |
| Physical Inventory Document Integration API | Inventory monitoring action |

## Role Templates

| Role | Type | Access |
|------|------|--------|
| SituationAutomationKeyUser | Key User | Full application access |
| SituationAutomationAdminUser | Admin | System onboarding only |
| RuleRepositorySuperUser | Rules | Business rule authoring |

### Key User Tiles

Key users with SituationAutomationKeyUser role can access:

1. **Manage Situation Actions** - Create custom actions
2. **Manage Situation Automation** - Configure automation rules
3. **Situation Dashboard** - View situation overview
4. **Analyze Situations** - Analyze resolution flows
5. **Delete Data Context** - Manage data retention
6. **Explore Related Situations** - View situation relationships

## Event Mesh Configuration

### Topic Space
```
saas/isa/cons
```

### Outbound Event Topics
```
sap/s4/beh/businesssituation/v1/BusinessSituation/*
sap/s4/beh/businesssituationtype/v1/BusinessSituationType/*
```

### Topic Rules (Service Instance)
```json
{
  "topicRules": {
    "publishFilter": [],
    "subscribeFilter": ["saas/isa/cons/*"]
  }
}
```

## Destination Configuration

### Key Constraints

1. **Single System Per Subaccount**: One subaccount connects to one S/4HANA system only
2. **Base URL Only**: Destination URL must contain only the base system URL (no paths)
3. **Same System Destinations**: All destinations in a subaccount must point to the same system

### Changing Connected System

To connect to a different S/4HANA system:
- Option A: Create a separate subaccount
- Option B: Unsubscribe and resubscribe with new destination

## Onboarding Workflow

### Prerequisites

1. Administrator role assigned
2. Event Mesh enabled in subaccount
3. Destination configured to S/4HANA system
4. Communication arrangements created (Cloud) or APIs exposed (On-premise)

### Steps

1. **Expose Situation Handling APIs** (in S/4HANA)
2. **Configure Destinations** (in BTP Cockpit)
3. **Set Up Event Mesh Communication** (Event channel + topic bindings)
4. **Onboard System** (using Onboard System app)

### Onboard System App Process

1. Launch *Onboard System* application
2. Click *Add*
3. Select destination from list
4. Click *Check Connection* to verify
5. Enter system name and description
6. Click *Create*
7. Wait for status: *Pending* → *Successful*

**Troubleshooting**: If onboarding fails, hover over info icon for details. Use *Retry* after fixing issues.

## Automatic Situation Resolution

### Supported Situation Templates

| Template | Code | Required Scenario |
|----------|------|-------------------|
| Contract is Ready as Source of Supply | PROC_CONTRACTREADYTOUSE_V3 | SAP_COM_0102 |
| Physical Inventory Monitoring | MAN_PHYSICAL_INVENTORY_MONITOR | SAP_COM_0107 |

### Custom Actions

Use the *Manage Situation Actions* application to create custom actions beyond standard SAP actions.

## Data Export

Export all stored data using the endpoint:
```
https://<subdomain>.<region>.intelligent-situation-automation.cloud.sap/exportdata
```

## Audit Logging

Intelligent Situation Automation uses the Audit Log service to track:
- Changes to automation configurations
- System onboarding events

View logs via the Audit Log Viewer in Cloud Foundry.

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Server error on app access | Missing role assignment | Assign required role collections |
| No Action Applied | Rule conditions don't match | Revise rule and reactivate |
| No Automation Configuration Found | No automation exists for situation type | Create automation in Manage Situation Automation |

## Reference Files

### Detailed Guides Available

1. **references/setup-guide.md** - Prerequisites, subscription, Event Mesh, network requirements
2. **references/onboarding.md** - API exposure, destinations, event communication, system onboarding
3. **references/security-roles.md** - Role templates, collections, user assignment
4. **references/operations.md** - Automatic resolution, data export, logging
5. **references/troubleshooting.md** - Error handling, support component
6. **references/external-links.md** - All SAP documentation links with document IDs

## Best Practices

### Setup
- ✅ Enable Event Mesh **before** subscribing to ISA
- ✅ Create Event Mesh instance in **same subaccount** as ISA subscription
- ✅ Use Europe (Frankfurt) region with cf-eu10

### Destinations
- ✅ Use only base URL (no additional paths)
- ✅ One S/4HANA system per subaccount
- ❌ Don't mix destinations to different S/4HANA systems

### Communication
- ✅ Set topic space to `saas/isa/cons`
- ✅ Bind both BusinessSituation and BusinessSituationType topics
- ✅ Use SAP_COM_0092 for cloud event channels

### User Management
- ✅ Assign SituationAutomationAdminUser for onboarding tasks
- ✅ Assign SituationAutomationKeyUser for daily operations
- ✅ Add RuleRepositorySuperUser for rule authoring

## External Resources

### SAP Documentation
- **SAP Help Portal**: https://help.sap.com/docs/intelligent-situation-automation
- **SAP Event Mesh**: https://help.sap.com/docs/SAP_EM
- **SAP BTP**: https://help.sap.com/docs/BTP

### Source Repository
- **GitHub Docs**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation

### Support
- **Component**: CA-SIT-ATM
- **SAP for Me**: Incident creation

## Updates and Maintenance

**Source**: SAP BTP Intelligent Situation Automation Documentation

**To Update This Skill**:
1. Check GitHub repository for documentation updates
2. Review for new communication scenarios
3. Update affected reference files
4. Update "Last Verified" date

**Quarterly Review Recommended**: Check for updates every 3 months

**Next Review**: 2026-02-22

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-11-22
**License**: MIT
**Maintainer**: SAP Skills Team | https://github.com/secondsky/sap-skills
