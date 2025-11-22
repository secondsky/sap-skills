# SAP BTP Intelligent Situation Automation Skill

A comprehensive Claude Code skill for SAP BTP Intelligent Situation Automation setup, configuration, and operations.

## Overview

This skill provides guidance for implementing situation-based automation between SAP S/4HANA systems and SAP Business Technology Platform. It covers the complete lifecycle from subscription to operations.

## Auto-Trigger Keywords

This skill activates when discussing:

### Service Names
- Intelligent Situation Automation
- ISA
- Situation Automation
- Business Situation Handling

### SAP Systems
- SAP S/4HANA Cloud situations
- SAP S/4HANA situations
- S/4HANA business situations
- Situation types
- Situation handling APIs

### Communication Scenarios
- SAP_COM_0345
- SAP_COM_0376
- SAP_COM_0092
- SAP_COM_0102
- SAP_COM_0107
- Business Situation Integration
- Business Situation Master Data Integration

### BTP Services
- Event Mesh for situations
- Situation event communication
- Business Event Handling
- Event channel for S/4HANA

### Applications
- Manage Situation Actions
- Manage Situation Automation
- Situation Dashboard
- Analyze Situations
- Onboard System app
- Delete Data Context
- Explore Related Situations

### Roles
- SituationAutomationKeyUser
- SituationAutomationAdminUser
- RuleRepositorySuperUser
- Situation automation roles

### Configuration
- Situation destinations
- Situation onboarding
- Situation automation rules
- Automatic situation resolution

### Troubleshooting
- CA-SIT-ATM
- Situation automation errors
- No Action Applied
- No Automation Configuration Found

### Region/Infrastructure
- cf-eu10 situation automation
- Frankfurt region ISA

## Quick Start

### Prerequisites

1. SAP BTP global account with administrator access
2. Subaccount in Europe (Frankfurt) region (cf-eu10)
3. SAP S/4HANA Cloud or SAP S/4HANA 2021 FPS0+

### Basic Setup Flow

```
1. Enable Event Mesh in subaccount
2. Subscribe to Intelligent Situation Automation (standard plan)
3. Configure destinations to S/4HANA system
4. Expose Situation Handling APIs in S/4HANA
5. Set up Event Mesh communication
6. Onboard S/4HANA system
7. Assign user roles
8. Configure automation rules
```

## Coverage

### Setup & Subscription
- Prerequisites and region requirements
- Service subscription (standard plan)
- Event Mesh configuration
- Browser and network requirements

### System Onboarding
- API exposure for SAP S/4HANA Cloud (SAP_COM_0345, SAP_COM_0376)
- API exposure for SAP S/4HANA on-premise
- Destination configuration
- Event Mesh service instance and keys
- Event channel setup
- Topic bindings
- Onboard System application

### User Management
- Role templates (Key User, Admin User)
- Role collections
- User assignment via IdP
- Required role collections for each user type

### Operations
- Automatic situation resolution
- Standard vs. custom actions
- Data export
- Audit logging

### Troubleshooting
- Common error scenarios
- Resolution steps
- Support component (CA-SIT-ATM)

## File Structure

```
sap-btp-intelligent-situation-automation/
├── SKILL.md                    # Main skill file
├── README.md                   # This file
├── PROGRESS_TRACKING.md        # Extraction tracking
└── references/
    ├── setup-guide.md          # Prerequisites, subscription, Event Mesh
    ├── onboarding.md           # APIs, destinations, system onboarding
    ├── security-roles.md       # Roles, collections, assignment
    ├── operations.md           # Resolution, export, logging
    ├── troubleshooting.md      # Errors, solutions, support
    └── external-links.md       # All SAP documentation links & IDs
```

## Documentation Sources

- **GitHub**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation
- **SAP Help**: https://help.sap.com/docs/intelligent-situation-automation
- **Event Mesh**: https://help.sap.com/docs/SAP_EM

## Version

- **Skill Version**: 1.0.0
- **Last Updated**: 2025-11-22
- **SAP Docs Verified**: 2025-11-22

## License

MIT License - See repository LICENSE file.

## Contributing

See the main repository CONTRIBUTING guidelines at https://github.com/secondsky/sap-skills.
