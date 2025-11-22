# BTP Cloud Transport Management Skill

Comprehensive Claude Code skill for SAP Cloud Transport Management service on SAP Business Technology Platform.

## Overview

This skill provides complete guidance for implementing and managing SAP Cloud Transport Management, including initial setup, landscape configuration, import queue operations, destination configuration, security, and integrations.

## Auto-Trigger Keywords

This skill activates when working with:

### Service Names
- SAP Cloud Transport Management
- Cloud Transport Management
- TMS (Transport Management Service)
- cTMS
- BTP Transport Management
- SAP TMS
- transport-service-app

### Content Types
- MTA transport
- Multitarget Application transport
- MTAR deployment
- BTP ABAP transport
- ABAP environment transport
- Application Content transport
- XSC Delivery Unit
- XSC DU transport

### Configuration Tasks
- transport landscape
- transport nodes
- transport routes
- transport destinations
- landscape wizard
- landscape visualization
- forward mode
- deployment strategy
- blue-green deployment

### Operations
- import queue
- import transport request
- schedule import
- automatic import
- forward transport
- reset transport
- modifiable transport request
- file upload to TMS
- node export
- node upload

### Setup & Configuration
- TMS subscription
- TMS entitlements
- TMS role collections
- TMS service instance
- TMS service key
- TMS_LandscapeOperator_RC
- TMS_Viewer_RC

### Destinations
- TransportManagementService destination
- Cloud Deployment Service
- Content Agent Service
- SAP_COM_0948
- MANAGE_SOFTWARE_COMPONENTS
- OAuth2ClientCredentials
- OAuth2Password
- deploy-service.cf

### Security & Roles
- LandscapeOperator
- TransportOperator
- ImportOperator
- ExportOperator
- ImportSelectedOperator
- TmsNodesTransportOperator
- TmsNodesImport
- TmsNodesExport

### Service Plans
- standard plan TMS
- export plan TMS
- transport_operator plan
- build-runtime plan
- free plan TMS

### Integrations
- SAP Cloud ALM transport
- CI/CD transport
- Project Piper TMS
- SAP Automation Pilot
- Solution Manager transport
- Alert Notification Service TMS
- TmsImportFinished
- TmsImportStarted
- CTS+ integration

### Status Keywords
- Initial status transport
- Running status transport
- Succeeded status transport
- Error status transport
- Fatal status transport
- Skipped status transport
- Repeatable status transport
- Deleted status transport

### Error Messages
- "Not Found" deploy type SLP_CTS
- "Forbidden" deploy type SLP_CTS
- Error during client creation
- SpaceDeveloper role
- URL encoding transport

### Common Scenarios
- DEV TEST PROD transport
- cross-environment transport
- Cloud Foundry deployment
- Kyma transport
- Neo transport (deprecated)
- SAP Integration Suite transport
- SAP Build transport
- SAP Analytics Cloud transport
- SAP Datasphere transport

## File Structure

```
btp-cloud-transport-management/
├── SKILL.md                      # Main skill file
├── README.md                     # This file (keywords)
├── EXTRACTION_PROGRESS.md        # Documentation coverage tracking
└── references/
    ├── initial-setup.md          # Setup procedures
    ├── destinations.md           # 8 destination type configurations
    ├── landscape-configuration.md # Nodes, routes, visualization, wizard
    ├── import-operations.md      # Import queue, MTA descriptors, modifiable requests
    ├── administration.md         # Service plans, backup, storage, data export
    ├── troubleshooting.md        # Error resolution
    ├── integrations.md           # CI/CD, ALM, APIs
    └── security-roles.md         # Roles and permissions
```

## Documentation Sources

- **GitHub**: https://github.com/SAP-docs/btp-cloud-transport-management
- **SAP Help Portal**: https://help.sap.com/docs/cloud-transport-management
- **API Reference**: https://api.sap.com/package/TmsForCloudPub/rest

## Coverage

This skill covers:

- **Initial Setup**: Entitlements, subscription, roles, service instances
- **Landscape Configuration**: Nodes, routes, destinations, wizard
- **Import Operations**: Import methods, scheduling, automation
- **Transport Requests**: Statuses, modifiable requests, lifecycle
- **Destinations**: 6 destination types with full configuration
- **Security**: 7 role templates, 3 service plans, node restrictions
- **Integrations**: 9 integration scenarios, API operations
- **Troubleshooting**: MTA errors, authentication issues

## Version

- **Skill Version**: 1.0.0
- **Last Updated**: 2025-11-22
- **Documentation Source Date**: 2025-11-22

## License

MIT
