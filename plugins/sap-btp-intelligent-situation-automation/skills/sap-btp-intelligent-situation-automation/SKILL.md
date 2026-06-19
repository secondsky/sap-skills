---
name: sap-btp-intelligent-situation-automation
description: |
  This archived skill provides legacy guidance for SAP BTP Intelligent Situation Automation data export, unsubscription, and configuration review.
  It should be used only when maintaining existing ISA tenants, exporting data before access is removed, or understanding historical situation automation setups.

  The skill covers Event Mesh integration, destination configuration, system onboarding,
  user management with role collections, automatic situation resolution, unsubscription, and troubleshooting for existing deployments.

  Keywords: SAP BTP, Intelligent Situation Automation, ISA, situation handling, SAP S/4HANA, SAP S/4HANA Cloud,
  Event Mesh, Business Event Handling, situation automation, situation dashboard, analyze situations,
  SAP_COM_0345, SAP_COM_0376, SAP_COM_0092, SituationAutomationKeyUser, SituationAutomationAdminUser,
  Cloud Connector, cf-eu10, CA-SIT-ATM, business situations, situation types, situation actions
license: GPL-3.0
metadata:
  version: "2.3.1"
  last_verified: "2025-11-27"
  status: "ARCHIVED"
  deprecation_date: "2025-09-24"
  end_of_service: "2026-03-24 window reached; active contract commitments may extend access"
---

# SAP BTP Intelligent Situation Automation

## Related Skills

- **sap-btp-cloud-platform**: Use for subaccount, subscription, and role collection context
- **sap-btp-integration-suite**: Use for Event Mesh and integration alternatives during migration planning
- **sap-btp-cloud-transport-management**: Use if archived ISA-related artifacts must be moved across landscapes
- **sap-btp-best-practices**: Use for decommissioning governance and operational planning

## ⚠️ DEPRECATION NOTICE

**Service Status**: ARCHIVED / DEPRECATED as of September 24, 2025

SAP BTP Intelligent Situation Automation service was deprecated on September 24, 2025. Its 6-month end-of-service window reached March 24, 2026; remaining access may exist only where contract commitments still apply.

**Immediate Action Required**: 
- Unsubscribe from the Intelligent Situation Automation service
- Export any required data before access is removed
- Contact component CA-SIT-ATM for questions or concerns

## Overview (For Reference)

SAP Intelligent Situation Automation was a BTP service that enabled automatic handling of business situations from SAP S/4HANA and SAP S/4HANA Cloud systems. It leveraged SAP Event Mesh for real-time event communication and allowed organizations to define automated actions for resolving situations.

**Documentation Source**: [https://github.com/SAP-docs/btp-intelligent-situation-automation](https://github.com/SAP-docs/btp-intelligent-situation-automation)

**Last Verified**: 2025-11-27 (metadata). Re-verify archived-service details before advancing this date.

## Table of Contents
- [Overview (For Reference)](#overview-for-reference)
- [When to Use This Skill](#when-to-use-this-skill)
- [Migration Information](#migration-information)
- [Quick Decision Tree](#quick-decision-tree)
- [Supported Systems](#supported-systems)
- [Region & Infrastructure](#region--infrastructure)
- [Core Components](#core-components)
- [Role Templates](#role-templates)
- [Bundled Resources](#bundled-resources)

## When to Use This Skill

**⚠️ SERVICE DEPRECATED - Use only for:**

- **Unsubscribing from Intelligent Situation Automation** service
- **Exporting data** before access is removed
- **Understanding legacy configurations** for documentation purposes
- **Migration planning** to alternative solutions

**Do NOT use this skill for:**
- New subscriptions to the service (not available)
- Setting up new automation rules (service deprecated)
- Production deployments (service will be discontinued)

## Migration Information

SAP is working towards a GenAI-based capability in the **Situation Handling Extended framework**. Updates will be provided when available for consumption. For more information, see the SAP community announcement about the deprecation.

## Quick Decision Tree

### What Task?

```
Data Export & Unsubscription (DEPRECATED SERVICE)
├─ Export data → references/operations.md#data-export
└─ Unsubscribe → DEPRECATION NOTICE section

Legacy Documentation (For Reference Only)
├─ Understanding existing setup → references/setup-guide.md
├─ API configurations → references/onboarding.md
├─ Role assignments → references/security-roles.md
├─ Automation rules → references/operations.md
└─ Error troubleshooting → references/troubleshooting.md

Migration Planning
├─ Review Situation Handling Extended framework
├─ Contact SAP for migration options
└─ Support component: CA-SIT-ATM
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

## Unsubscription Instructions

### Prerequisites
- Administrator role for the subaccount
- Data export completed (if needed)

### Steps to Unsubscribe
1. Open your global account in the SAP BTP cockpit
2. Navigate to your subaccount
3. In the navigation area, choose **Services > Instances and Subscriptions**
4. Find Intelligent Situation Automation in the subscription list
5. Select the three dots at the end of the subscription row
6. From the menu, select **Delete**
7. Confirm deletion - all application data will be removed

### Support
For any questions or concerns about the deprecation:
- **Component**: CA-SIT-ATM
- Create an incident via SAP for Me

## Common Issues (Legacy)

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
- **SAP Help Portal**: [https://help.sap.com/docs/intelligent-situation-automation](https://help.sap.com/docs/intelligent-situation-automation)
- **SAP Event Mesh**: [https://help.sap.com/docs/SAP_EM](https://help.sap.com/docs/SAP_EM)
- **SAP BTP**: [https://help.sap.com/docs/BTP](https://help.sap.com/docs/BTP)

### Source Repository
- **GitHub Docs**: [https://github.com/SAP-docs/sap-btp-intelligent-situation-automation](https://github.com/SAP-docs/sap-btp-intelligent-situation-automation)

### Support
- **Component**: CA-SIT-ATM
- **SAP for Me**: Incident creation

## Updates and Maintenance

**⚠️ SERVICE DEPRECATED**: No further updates expected as the service is deprecated.

**Documentation Source**: 
- Original: [https://github.com/SAP-docs/btp-intelligent-situation-automation](https://github.com/SAP-docs/btp-intelligent-situation-automation)
- Deprecation Announcement: [https://community.sap.com/t5/technology-blog-posts-by-sap/deprecation-of-intelligent-situation-automation-service/ba-p/14214342](https://community.sap.com/t5/technology-blog-posts-by-sap/deprecation-of-intelligent-situation-automation-service/ba-p/14214342)

**Final Verification**: 2025-11-27

**Maintenance Status**: ARCHIVE ONLY - Skill maintained for historical reference and unsubscription guidance.

## Bundled Resources

### Reference Documentation
- `references/setup-guide.md` - Complete setup and configuration guide
- `references/onboarding.md` - System onboarding and configuration
- `references/security-roles.md` - Role templates and permissions
- `references/operations.md` - Operations and monitoring guide
- `references/external-links.md` - External documentation and SAP notes
- `references/troubleshooting.md` - Common issues and resolution

---

**Skill Version**: 2.3.1
**Status**: ARCHIVED / DEPRECATED
**Last Updated**: 2026-05-31
**License**: GPL-3.0
**Maintainer**: SAP Skills Team | [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)

---

**Version History**:
- v1.1.0 (2025-11-27): Added deprecation notice and unsubscription instructions
- v1.0.0 (2025-11-22): Initial release for active service
