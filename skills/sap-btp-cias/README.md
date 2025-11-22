# SAP BTP Cloud Integration Automation Service (CIAS) Skill

Production-ready Claude Code skill for SAP BTP Cloud Integration Automation Service.

---

## Overview

This skill provides comprehensive guidance for working with SAP BTP Cloud Integration Automation Service (CIAS), which delivers guided workflows to integrate SAP cloud solutions with on-premise and other SAP cloud solutions.

---

## When to Use This Skill

Use this skill when:

### Setup and Configuration
- Subscribing to Cloud Integration Automation Service
- Configuring Standard plan (UI access)
- Setting up OAuth2 plan (API access)
- Creating service instances for ABAP automation
- Configuring service keys with mTLS certificates

### Role and Access Management
- Assigning CIASIntegrationAdministrator role
- Assigning CIASIntegrationExpert role
- Assigning CIASIntegrationMonitor role
- Configuring identity providers for CIAS
- Setting up SAML authentication
- Managing multi-user task assignments

### Destination Configuration
- Creating HTTP destinations for automation
- Configuring OAuth2 client credentials
- Setting up Cloud Connector destinations
- Troubleshooting empty destination dropdowns

### Integration Scenarios
- Planning integration scenarios
- Using Plan for Integration tile
- Working with Maintenance Planner
- Executing S/4HANA Cloud integrations
- Configuring SuccessFactors integrations
- Setting up SAP Build Work Zone
- Implementing SAP IBP Real-Time Integration

### Task Execution
- Working with My Inbox tasks
- Claiming and completing tasks
- Executing automation tasks
- Uploading certificates in tasks
- Understanding task instructions

### Monitoring and Troubleshooting
- Using Scenario Execution Monitoring
- Viewing automation logs
- Terminating workflows
- Exporting PDF execution reports
- Resolving workflow conflicts

---

## Keywords for Skill Discovery

### Service Names
- Cloud Integration Automation Service
- CIAS
- SAP CIAS
- BTP CIAS
- Cloud Integration Automation

### Role Collections
- CIASIntegrationAdministrator
- CIASIntegrationExpert
- CIASIntegrationMonitor
- Integration Administrator
- Integration Expert
- Integration Monitor

### Features
- Plan for Integration
- My Inbox
- Scenario Execution Monitoring
- Maintenance Planner
- workflow invocation
- task automation
- guided workflow

### Regions
- EU10 Frankfurt
- EU11 Frankfurt EU Access
- EU20 Netherlands
- US10 Virginia
- AP10 Sydney
- JP10 Tokyo
- CA10 Montreal
- CN20 China
- CN40 Shanghai

### Integration Targets
- S/4HANA Cloud integration
- S/4HANA On-Premise integration
- SuccessFactors Employee Central
- SAP Build Work Zone
- SAP IBP RTI
- SAP Ariba integration
- SAP Concur integration
- ABAP Environment integration

### Actions
- subscribe to CIAS
- create CIAS destination
- assign CIAS roles
- plan integration scenario
- execute CIAS workflow
- monitor CIAS scenario
- terminate CIAS workflow
- configure OAuth2 for CIAS

### Errors and Issues
- CIAS destination empty
- CIAS task reserved
- CIAS workflow limit
- CIAS access denied
- BC-INS-CIT-RT support component

---

## Skill Structure

```
sap-btp-cias/
├── SKILL.md                     # Main skill file (loaded on trigger)
├── README.md                    # This file (discovery keywords)
├── EXTRACTION_PROGRESS.md       # Documentation extraction tracking
├── references/
│   ├── setup-guide.md          # Complete setup procedures
│   ├── security-guide.md       # Security and IdP configuration
│   ├── integration-scenarios.md # 100+ scenarios with codes (1M1, 22K, etc.)
│   ├── troubleshooting.md      # Detailed troubleshooting guide
│   ├── maintenance-planner.md  # Maintenance Planner integration
│   ├── task-ui-guide.md        # Task UI controls, tabs, behaviors
│   └── whats-new.md            # Release notes 2021-2025
└── templates/
    ├── destination-config.md   # Destination templates by target system
    └── role-assignment.md      # Role assignment procedures
```

---

## Progressive Disclosure Levels

### Level 1: SKILL.md (Always Loaded ~2500 words)
- Service overview and quick reference
- Core workflows (subscribe, roles, destinations)
- Common error patterns and solutions
- Support channels
- Glossary

### Level 2: Reference Files (On Demand)
- Detailed setup procedures
- Security architecture
- Full integration scenarios list
- Comprehensive troubleshooting

### Level 3: Template Files (On Demand)
- Destination configuration by target system
- Role assignment templates

---

## Quick Commands

### Subscribe to CIAS
```
1. BTP Cockpit → Subaccount → Services → Service Marketplace
2. Filter: "Cloud Integration Automation Service"
3. Create → Standard plan → Confirm
```

### Assign Administrator Role
```
1. Security → Role Collections → CIASIntegrationAdministrator
2. Edit → Users → Add email/user ID → Save
```

### Create Destination
```
1. My Inbox → Confirm System Components
2. Create Destination → Configure → Save
```

---

## Support Information

| Issue Type | Component | Action |
|------------|-----------|--------|
| General support | BC-INS-CIT-RT | Create ticket |
| Task instructions | Support Information tab | Submit to listed component |
| Data deletion | BC-INS-CIT-RT | Include email + subaccount |

---

## Documentation Sources

- **Primary**: https://github.com/SAP-docs/btp-cloud-integration-automation-service
- **SAP Help**: https://help.sap.com/docs/cloud-integration-automation-service
- **Maintenance Planner**: https://maintenanceplanner.cfapps.eu10.hana.ondemand.com

---

## Version Information

| Field | Value |
|-------|-------|
| Skill Version | 1.0.0 |
| Last Verified | 2025-11-22 |
| Source Docs Date | Current (GitHub main) |
| Next Review | 2026-02-22 |

---

## License

MIT
