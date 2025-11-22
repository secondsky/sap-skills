# SAP BTP Job Scheduling Service Skill

A comprehensive Claude Code skill for SAP BTP Job Scheduling Service development, configuration, and operations.

## Quick Start

This skill provides guidance for:
- Creating and managing scheduled jobs on SAP BTP
- Configuring schedules using cron, date/time, or human-readable formats
- Setting up OAuth 2.0 authentication with XSUAA
- Implementing asynchronous job execution
- Integrating with SAP Cloud ALM and Alert Notification Service
- Troubleshooting common issues

## Auto-Trigger Keywords

This skill activates when you mention:

### Service Names
- SAP Job Scheduling Service
- jobscheduler
- Job Scheduler
- BTP Job Scheduling
- CF Job Scheduling

### Concepts
- scheduled jobs
- recurring jobs
- one-time jobs
- cron schedule
- job schedule
- schedule format
- run logs
- action endpoint

### Technical Terms
- @sap/jobs-client
- XSUAA job scheduling
- grant-as-authority-to-apps
- x-sap-job-id
- x-sap-scheduler-host
- ACK_NOT_RECVD
- BC-CP-CF-JBS

### Operations
- create job BTP
- schedule job Cloud Foundry
- async job execution
- job run log
- Cloud Foundry tasks
- CF tasks

### Integrations
- Cloud ALM job monitoring
- Alert Notification job
- calmConfig
- ansConfig

### Troubleshooting
- job not executing
- schedule auto-deactivated
- job 401 error
- job 403 forbidden

## Skill Structure

```
sap-btp-job-scheduling/
├── SKILL.md                    # Main skill file
├── README.md                   # This file
├── PROGRESS_TRACKING.md        # Documentation coverage
├── references/
│   ├── concepts.md             # Schedule types, formats, lifecycle
│   ├── rest-api.md             # Complete REST API reference
│   ├── setup-guide.md          # Prerequisites, instance creation
│   ├── security.md             # OAuth 2.0, XSUAA, credentials
│   ├── integrations.md         # Cloud ALM, Alert Notification
│   ├── troubleshooting.md      # FAQ, error scenarios
│   ├── operations.md           # Dashboard, backup, service behavior
│   └── changelog.md            # Version history (2021-2025)
└── templates/
    ├── job-creation.json       # Job creation request template
    └── xs-security.json        # XSUAA configuration template
```

## Documentation Sources

- **Primary Source**: https://github.com/SAP-docs/sap-btp-job-scheduling-service
- **SAP Help Portal**: https://help.sap.com/docs/job-scheduling
- **API Reference**: https://api.sap.com/

## Key Features Covered

### Service Setup
- Prerequisites and entitlements
- Service instance creation (Cockpit, CF CLI, Kyma)
- XSUAA configuration and scope grants

### Job Management
- Create, update, delete jobs
- Configure schedules (cron, date/time, human-readable)
- Manage run logs
- Dashboard operations

### Schedule Formats
- SAP cron format (7 fields)
- ISO-8601 and RFC 2822 date formats
- Human-readable expressions
- repeatInterval and repeatAt

### Security
- OAuth 2.0 token flow
- XSUAA scope configuration
- Credential rotation
- X.509 certificate authentication

### Integrations
- SAP Cloud ALM monitoring
- SAP Alert Notification Service (CF only)

### Operations
- Service behavior and SLA
- Backup and restore
- Troubleshooting common issues

## Version Information

- **Skill Version**: 1.0.0
- **Last Updated**: 2025-11-22
- **License**: MIT

## Support

- **SAP Support Component**: BC-CP-CF-JBS
- **Skill Repository**: https://github.com/secondsky/sap-skills
