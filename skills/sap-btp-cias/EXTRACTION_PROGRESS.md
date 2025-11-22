# SAP BTP Cloud Integration Automation Service - Extraction Progress

**Source Repository**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs
**Extraction Date**: 2025-11-22
**Total Files**: 35 markdown files
**Status**: COMPLETE

---

## Documentation Structure Overview

```
docs/
├── css/                    # Stylesheets (not extracted - UI only)
├── images/                 # Image assets (referenced in docs)
└── *.md                    # 35 markdown files (ALL EXTRACTED)
```

---

## Extraction Status by Category

### Core Documentation (3 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `index.md` | EXTRACTED | Complete navigation hierarchy and TOC |
| `what-is-cloud-integration-automation-service-35fbf2a.md` | EXTRACTED | Service overview, advantages, limitations, supported scenarios |
| `what-s-new-in-cloud-integration-automation-service-ee05dea.md` | EXTRACTED | Release notes 2021-2025, new data centers, features |

### Setup & Prerequisites (4 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `prerequisites-2eae0b6.md` | EXTRACTED | Cloud regions (AWS, Azure, Alibaba), system requirements |
| `subscription-to-cloud-integration-automation-service-b3a72d9.md` | EXTRACTED | Standard vs OAuth2 plan overview |
| `subscription-to-standard-plan-c8ed936.md` | EXTRACTED | 7-step subscription process |
| `service-and-application-plans-ad78835.md` | EXTRACTED | Plan details and use cases |

### Usage & Operations (6 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `using-cloud-integration-automation-service-5ccb2ce.md` | EXTRACTED | Plan for Integration workflow steps |
| `working-with-tasks-3da3577.md` | EXTRACTED | Task management, claiming, automation |
| `task-9ec0684.md` | EXTRACTED | Task tabs, instructions, automation controls |
| `my-inbox-7f7860d.md` | EXTRACTED | Inbox access, roles required |
| `uploading-a-file-in-a-task-8c24365.md` | EXTRACTED | Certificate file upload process |
| `using-maintenance-planner-2ad4326.md` | EXTRACTED | 9-step workflow invocation process |
| `selecting-execution-scope-444db93.md` | EXTRACTED | Mandatory vs optional tasks selection |

### Configuration (4 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `destinations-496a763.md` | EXTRACTED | Destination overview, security requirements |
| `destination-creation-b2cd7e9.md` | EXTRACTED | 6-step destination creation process |
| `add-or-change-destination-b9d3c03.md` | EXTRACTED | Editing destinations during execution |
| `confirm-system-components-1f39555.md` | EXTRACTED | Component validation, conflict handling |

### Security & Access Control (8 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `roles-and-authorizations-917f842.md` | EXTRACTED | 3 roles: Administrator, Expert, Monitoring |
| `role-assignment-cd6b96b.md` | EXTRACTED | Multi-user assignment, claiming |
| `assigning-roles-to-the-users-9ad530a.md` | EXTRACTED | Role collections, IdP configuration |
| `security-9e8f7c2.md` | EXTRACTED | Security overview introduction |
| `security-architecture-df15122.md` | EXTRACTED | 6 core components, XSRF protection |
| `security-restrictions-3538ec5.md` | EXTRACTED | 15-workflow limit, data deletion rules |
| `identity-provider-and-identity-management-1508b49.md` | EXTRACTED | IdP configuration, authentication flow |
| `create-instance-in-oauth2-service-plan-6187a7e.md` | EXTRACTED | OAuth2 instance creation, mTLS setup |

### Data & Compliance (3 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `data-protection-and-privacy-22abc39.md` | EXTRACTED | 90-day log retention, BC-INS-CIT-RT support |
| `sensitive-data-02563ca.md` | EXTRACTED | Credential store service usage |
| `audit-logging-639f869.md` | EXTRACTED | Audit log service integration |

### Support & Reference (6 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `monitoring-and-troubleshooting-18460b7.md` | EXTRACTED | FAQ, support channels |
| `monitoring-scenario-implementation-f8daffa.md` | EXTRACTED | Execution monitoring, logs, termination |
| `downloading-the-cloud-integration-automation-service-execution-summary-report-666ddf4.md` | EXTRACTED | PDF export from My Inbox and Monitoring |
| `accessibility-features-in-cloud-integration-automation-service-5dd238a.md` | EXTRACTED | SAP BTP cockpit accessibility |
| `glossary-0eee936.md` | EXTRACTED | 7 terms: blocking, consent, personal data, etc. |
| `summary-71f9a64.md` | EXTRACTED | Execution summary screen, Complete Execution |

### Administrative (2 files) - COMPLETE

| File | Status | Content Summary |
|------|--------|-----------------|
| `unsubscribe-f06f7f5.md` | EXTRACTED | Permanent deletion process, data loss warning |
| `disclaimer-7823b84.md` | EXTRACTED | Initial task, terms acceptance |

---

## Key Information Extracted

### Supported Cloud Regions

**Amazon Web Services (AWS)**:
- Europe (Frankfurt) EU10
- Europe (Frankfurt) EU Access EU11
- US East (VA) US10
- Australia (Sydney) AP10
- Japan (Tokyo) JP10
- Canada (Montreal) CA10

**Microsoft Azure**:
- Europe (Netherlands) EU20
- China (North 3) CN20

**Alibaba Cloud**:
- China (Shanghai) CN40

### Role Collections

| Role | Collection Name | Capabilities |
|------|-----------------|--------------|
| Integration Administrator | CIASIntegrationAdministrator | Full access: My Inbox, Plan for Integration, Monitoring, terminate scenarios |
| Integration Expert | CIASIntegrationExpert | My Inbox access, work on assigned tasks |
| Integration Monitor | CIASIntegrationMonitor | Read-only access to Scenario Execution Monitoring |

### Service Limitations

- Maximum 15 active workflows per SAP BTP subaccount/subdomain
- No self-service deletion of user data (support ticket to BC-INS-CIT-RT required)
- Log retention: 90 days
- OAuth2 certificate maximum validity: 1 year
- Supported browsers: Mozilla Firefox (ESR + latest), Google Chrome (latest) on Windows

### Security Architecture Components

1. Cloud Integration Automation Service Runtime
2. Cloud Integration Automation Service Planning
3. Cloud Integration Automation Service Inbox
4. Cloud Integration Automation Service Monitoring
5. Managed System
6. Cloud Integration Automation Service Automation Runtime

### Supported Integration Scenarios (Categories)

- BTP Services (Asset Collaboration, APM, Group Reporting)
- BTP ABAP Environment (Custom Code Migration, S/4HANA Cloud integration)
- Intelligent Enterprise (Design to Operate, Lead to Cash, Recruit to Retire, Source to Pay)
- SAP Cloud Connector configuration
- SAP Integrated Business Planning (RTI)
- SAP Build provisioning
- SAP Build Work Zone integration
- S/4HANA Cloud Private Edition (multiple scenarios)
- S/4HANA Cloud (100+ scenarios)
- S/4HANA On-Premise (50+ scenarios)
- SuccessFactors Employee Central integration

---

## Documentation Links for Updates

### Primary Documentation
- **Main Docs**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs
- **SAP Help Portal**: https://help.sap.com/docs/cloud-integration-automation-service

### Related SAP Documentation
- **SAP BTP Security Guide**: Referenced in security documentation
- **Credential Store Service**: https://help.sap.com/viewer/601525c6e5604e4192451d5e7328fa3c/Cloud/en-US/02e8f7d1016740b8adf68690f36df142.html
- **Maintenance Planner**: https://maintenanceplanner.cfapps.eu10.hana.ondemand.com
- **SAP BTP Destinations**: Referenced in destination documentation

---

## Progressive Disclosure Structure

### Level 1: SKILL.md (Always Loaded)
- Service overview and purpose
- Quick reference for roles, regions, plans
- Common workflows summary
- Known limitations
- Error patterns and solutions

### Level 2: Reference Files (Loaded on Demand)
- `references/setup-guide.md` - Complete subscription and configuration steps
- `references/security-guide.md` - Security architecture and IdP configuration
- `references/integration-scenarios.md` - COMPLETE list of 100+ scenarios with codes (1M1, 22K, 4A1, etc.)
- `references/troubleshooting.md` - Detailed troubleshooting guide
- `references/maintenance-planner.md` - Maintenance Planner integration
- `references/task-ui-guide.md` - Complete task UI controls, tabs, and behaviors
- `references/whats-new.md` - Complete release notes 2021-2025

### Level 3: Template Files (Loaded on Demand)
- `templates/destination-config.md` - Destination configuration templates by target system
- `templates/role-assignment.md` - Role assignment procedures and checklists

---

## Maintenance Notes

**Last Verified**: 2025-11-22
**Source Version**: Latest from GitHub main branch
**Review Schedule**: Quarterly (check for new regions, features, deprecations)

### Version History from What's New

| Date | Change Type | Description |
|------|-------------|-------------|
| 2025-04-11 | New Region | China (CN20) data center |
| 2024-07-30 | New Region | Montreal (CA10) data center |
| 2023-11-10 | New Feature | Real-Time Integration (RTI) scenario |
| 2023-09-13 | UI Change | Theme changed to Morning Horizon (Light) |
| 2023-05-24 | New Region | Tokyo (JP10) data center |
| 2022-09-08 | Enhancement | Progress tracking for automation |
| 2022-07-26 | New Region | Frankfurt (EU11), Shanghai (CN40) |
| 2021-08-04 | Deprecation | Neo environment ended July 2021 |
| 2021-05-01 | Major | Cloud Foundry support launched |

---

**Document Maintainer**: SAP Skills Team
**Next Review**: 2026-02-22
