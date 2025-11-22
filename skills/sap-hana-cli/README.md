# SAP HANA CLI Skill

A comprehensive Claude Code skill for the SAP HANA Developer Command Line Interface (hana-cli).

---

## Overview

This skill provides guidance for using the **hana-cli** npm package - a developer-centric CLI tool for SAP HANA database development. It covers all 91 commands, 17+ output formats, HDI container management, and cloud operations.

**Source Repository**: https://github.com/SAP-samples/hana-developer-cli-tool-example

---

## Keywords

### Tool & Package Names
- hana-cli
- sap-hana-cli
- hana developer cli
- hana command line
- hana developer command line interface
- npm hana-cli
- hana-cli install
- hana-cli commands

### Installation & Setup
- npm install hana-cli
- hana-cli install
- hana-cli setup
- hana-cli connect
- hana-cli connection
- hana-cli default-env
- hana-cli default-env.json
- hana-cli credentials
- hana-cli service key
- connectViaServiceKey

### Database Operations
- hana-cli tables
- hana-cli views
- hana-cli procedures
- hana-cli functions
- hana-cli indexes
- hana-cli schemas
- hana-cli sequences
- hana-cli synonyms
- hana-cli triggers
- hana-cli objects
- hana-cli dataTypes

### Inspection Commands
- hana-cli inspectTable
- hana-cli inspectView
- hana-cli inspectProcedure
- hana-cli inspectFunction
- hana-cli inspectIndex
- hana-cli inspectTrigger
- hana-cli inspectUser
- hana inspect table
- table metadata hana
- view definition hana

### Query Execution
- hana-cli querySimple
- hana-cli callProcedure
- hana-cli hdbsql
- hana sql query
- execute sql hana
- call procedure hana
- hana stored procedure

### HDI Container Management
- hana-cli containers
- hana-cli createContainer
- hana-cli dropContainer
- hana-cli activateHDI
- hana-cli adminHDI
- hana-cli createContainerUsers
- hdi container
- hdi container management
- hana deployment infrastructure
- hdi activation
- hdi admin

### Format Conversion
- hana to cds
- hana to json
- hana to yaml
- hana to edmx
- hana to openapi
- hana to graphql
- hana to sql
- hana to hdbtable
- hana-cli massConvert
- convert table to cds
- table to openapi
- database to cds

### Output Formats
- hana-cli output json
- hana-cli output cds
- hana-cli output edmx
- hana-cli output yaml
- hana-cli output csv
- hana-cli output excel
- hana-cli output graphql
- hana-cli output openapi

### Cloud & BTP
- hana cloud cli
- sap hana cloud
- hana-cli hanaCloudInstances
- hana-cli hanaCloudStart
- hana-cli hanaCloudStop
- hana-cli btp
- btp cli hana
- hana cloud start stop
- hana cloud instance management

### Security & Connection
- hana-cli ssl
- hana-cli encrypt
- hana-cli trustStore
- hana connection security
- hana ssl connection
- cds bind hana
- .cdsrc-private.json
- hana service key

### System Information
- hana-cli systemInfo
- hana-cli hostInformation
- hana-cli version
- hana-cli status
- hana system information
- hana database version

### Troubleshooting
- hana-cli error
- hana-cli privilege error
- hana-cli connection failed
- hana cli not working
- hana-cli troubleshoot
- hana permission error

### Development Tools
- hana-cli cds
- hana-cli openDBExplorer
- hana-cli openBAS
- hana database explorer
- business application studio hana

### Mass Operations
- hana-cli massConvert
- hana-cli massRename
- hana-cli massUsers
- batch convert hana
- mass convert cds

### Technologies
- SAP HANA
- SAP HANA Cloud
- SAP BTP
- SAP CAP
- Cloud Foundry
- HDI
- HANA Deployment Infrastructure
- OData
- GraphQL
- CDS
- Cloud Application Programming Model

---

## Skill Structure

```
sap-hana-cli/
├── SKILL.md                           # Main skill instructions
├── README.md                          # This file (keywords)
├── PROGRESS_TRACKING.md               # Extraction progress
├── references/
│   ├── command-reference.md           # All 91 commands
│   ├── connection-security.md         # Connection & security
│   ├── hdi-management.md              # HDI container ops
│   ├── output-formats.md              # 17+ formats
│   └── cloud-operations.md            # BTP & cloud commands
└── templates/
    ├── default-env.json               # Connection template
    └── cdsrc-private.json             # CDS bind template
```

---

## When to Use This Skill

This skill activates when users:

- Ask about hana-cli installation or setup
- Need to connect to SAP HANA databases
- Want to inspect database objects (tables, views, procedures)
- Need to convert metadata to CDS, EDMX, OpenAPI formats
- Work with HDI containers
- Manage SAP HANA Cloud instances
- Execute SQL queries via CLI
- Troubleshoot hana-cli issues
- Need output format options

---

## Version Information

| Component | Version |
|-----------|---------|
| hana-cli | 3.202511.0 |
| Node.js Required | ≥20.19.0 |
| @sap/cds | 9.4.4 |
| Skill Version | 1.0.0 |

---

## Resources

- **GitHub Repository**: https://github.com/SAP-samples/hana-developer-cli-tool-example
- **npm Package**: https://www.npmjs.com/package/hana-cli
- **Intro Video**: https://youtu.be/dvVQfi9Qgog
- **Cloud Shell Demo**: https://youtu.be/L7QyVLvAIIQ
- **SAP HANA Cloud**: https://help.sap.com/docs/hana-cloud
- **SAP CAP**: https://cap.cloud.sap/docs/

---

## License

MIT License

---

*Last Updated: 2025-11-22*
