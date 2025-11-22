# SAP HANA CLI Skill - Progress Tracking

**Source Repository**: https://github.com/SAP-samples/hana-developer-cli-tool-example
**Last Updated**: 2025-11-22
**Status**: Complete Extraction

---

## Extraction Summary

This document tracks all information extracted from the SAP HANA Developer CLI tool repository to ensure comprehensive skill coverage.

---

## ✅ EXTRACTED: Repository Overview

| Item | Status | Location in Skill |
|------|--------|-------------------|
| Project description | ✅ Extracted | SKILL.md overview |
| Project purpose | ✅ Extracted | SKILL.md overview |
| License (Apache 2.0) | ✅ Extracted | SKILL.md metadata |
| Current version (3.202511.0) | ✅ Extracted | SKILL.md |
| Node.js requirements (≥20.19.0) | ✅ Extracted | SKILL.md |
| GitHub URL | ✅ Extracted | SKILL.md links |
| Video tutorials | ✅ Extracted | references/resources.md |

---

## ✅ EXTRACTED: Installation Methods

| Method | Status | Location |
|--------|--------|----------|
| NPM global install | ✅ Extracted | SKILL.md |
| Source installation | ✅ Extracted | SKILL.md |
| Prerequisites | ✅ Extracted | SKILL.md |
| npm config for @sap registry | ✅ Extracted | SKILL.md |

---

## ✅ EXTRACTED: Connection Configuration

| Item | Status | Location |
|------|--------|----------|
| Connection hierarchy (7 levels) | ✅ Extracted | references/connection-security.md |
| default-env-admin.json | ✅ Extracted | references/connection-security.md |
| .cdsrc-private.json | ✅ Extracted | references/connection-security.md |
| .env file support | ✅ Extracted | references/connection-security.md |
| --conn parameter | ✅ Extracted | references/connection-security.md |
| Home directory config | ✅ Extracted | references/connection-security.md |
| Service key connection | ✅ Extracted | references/connection-security.md |
| SSL/TLS encryption | ✅ Extracted | references/connection-security.md |
| Trust store configuration | ✅ Extracted | references/connection-security.md |

---

## ✅ EXTRACTED: All 91 Commands

### Database Object Commands
| Command | Aliases | Status |
|---------|---------|--------|
| tables | - | ✅ Extracted |
| tablesUI | - | ✅ Extracted |
| tablesPG | - | ✅ Extracted |
| tablesSQLite | - | ✅ Extracted |
| views | - | ✅ Extracted |
| procedures | - | ✅ Extracted |
| functions | - | ✅ Extracted |
| functionsUI | - | ✅ Extracted |
| indexes | - | ✅ Extracted |
| indexesUI | - | ✅ Extracted |
| sequences | - | ✅ Extracted |
| synonyms | - | ✅ Extracted |
| triggers | - | ✅ Extracted |
| schemas | - | ✅ Extracted |
| schemasUI | - | ✅ Extracted |
| dataTypes | - | ✅ Extracted |
| dataTypesUI | - | ✅ Extracted |
| objects | - | ✅ Extracted |
| libraries | - | ✅ Extracted |

### Inspection Commands
| Command | Aliases | Status |
|---------|---------|--------|
| inspectTable | it, table, insTbl | ✅ Extracted |
| inspectTableUI | - | ✅ Extracted |
| inspectView | - | ✅ Extracted |
| inspectProcedure | - | ✅ Extracted |
| inspectFunction | - | ✅ Extracted |
| inspectIndex | - | ✅ Extracted |
| inspectTrigger | - | ✅ Extracted |
| inspectUser | - | ✅ Extracted |
| inspectLibrary | - | ✅ Extracted |
| inspectLibMember | - | ✅ Extracted |
| inspectJWT | - | ✅ Extracted |

### Connection & Authentication
| Command | Aliases | Status |
|---------|---------|--------|
| connect | c, login | ✅ Extracted |
| connectViaServiceKey | - | ✅ Extracted |
| status | - | ✅ Extracted |
| createJWT | - | ✅ Extracted |
| certificates | - | ✅ Extracted |

### HDI Container Management
| Command | Aliases | Status |
|---------|---------|--------|
| activateHDI | - | ✅ Extracted |
| adminHDI | - | ✅ Extracted |
| adminHDIGroup | - | ✅ Extracted |
| containers | cont, listContainers | ✅ Extracted |
| containersUI | - | ✅ Extracted |
| createContainer | - | ✅ Extracted |
| createContainerUsers | - | ✅ Extracted |
| dropContainer | - | ✅ Extracted |
| createGroup | - | ✅ Extracted |
| dropGroup | - | ✅ Extracted |

### Query & Execution
| Command | Aliases | Status |
|---------|---------|--------|
| querySimple | qs | ✅ Extracted |
| querySimpleUI | - | ✅ Extracted |
| callProcedure | cp, callProc | ✅ Extracted |
| hdbsql | - | ✅ Extracted |

### Mass Operations
| Command | Aliases | Status |
|---------|---------|--------|
| massConvert | mc | ✅ Extracted |
| massConvertUI | - | ✅ Extracted |
| massRename | - | ✅ Extracted |
| massUsers | - | ✅ Extracted |

### Cloud & BTP Operations
| Command | Aliases | Status |
|---------|---------|--------|
| btp | - | ✅ Extracted |
| btpInfo | - | ✅ Extracted |
| btpSubs | - | ✅ Extracted |
| hanaCloudInstances | - | ✅ Extracted |
| hanaCloudHDIInstances | - | ✅ Extracted |
| hanaCloudHDIInstancesUI | - | ✅ Extracted |
| hanaCloudSchemaInstances | - | ✅ Extracted |
| hanaCloudSchemaInstancesUI | - | ✅ Extracted |
| hanaCloudSBSSInstances | - | ✅ Extracted |
| hanaCloudSBSSInstancesUI | - | ✅ Extracted |
| hanaCloudSecureStoreInstances | - | ✅ Extracted |
| hanaCloudSecureStoreInstancesUI | - | ✅ Extracted |
| hanaCloudUPSInstances | - | ✅ Extracted |
| hanaCloudUPSInstancesUI | - | ✅ Extracted |
| hanaCloudStart | - | ✅ Extracted |
| hanaCloudStop | - | ✅ Extracted |

### User & Role Management
| Command | Aliases | Status |
|---------|---------|--------|
| users | - | ✅ Extracted |
| roles | - | ✅ Extracted |
| createXSAAdmin | - | ✅ Extracted |

### System Information
| Command | Aliases | Status |
|---------|---------|--------|
| systemInfo | - | ✅ Extracted |
| systemInfoUI | - | ✅ Extracted |
| hostInformation | - | ✅ Extracted |
| version | - | ✅ Extracted |
| ports | - | ✅ Extracted |
| disks | - | ✅ Extracted |
| dataVolumes | - | ✅ Extracted |
| iniFiles | - | ✅ Extracted |
| iniContents | - | ✅ Extracted |

### Development & Utilities
| Command | Aliases | Status |
|---------|---------|--------|
| cds | - | ✅ Extracted |
| createModule | - | ✅ Extracted |
| copy2DefaultEnv | - | ✅ Extracted |
| copy2Env | - | ✅ Extracted |
| copy2Secrets | - | ✅ Extracted |
| openDBExplorer | - | ✅ Extracted |
| openBAS | - | ✅ Extracted |

### Monitoring & Debugging
| Command | Aliases | Status |
|---------|---------|--------|
| features | - | ✅ Extracted |
| featuresUI | - | ✅ Extracted |
| featureUsage | - | ✅ Extracted |
| featureUsageUI | - | ✅ Extracted |
| traces | - | ✅ Extracted |
| traceContents | - | ✅ Extracted |
| privilegeError | - | ✅ Extracted |
| reclaim | - | ✅ Extracted |

### Documentation & Help
| Command | Aliases | Status |
|---------|---------|--------|
| changeLog | - | ✅ Extracted |
| changeLogUI | - | ✅ Extracted |
| openChangeLog | - | ✅ Extracted |
| readMe | - | ✅ Extracted |
| readMeUI | - | ✅ Extracted |
| openReadMe | - | ✅ Extracted |
| issue | - | ✅ Extracted |
| UI | - | ✅ Extracted |
| matrix | - | ✅ Extracted |
| rick | Easter egg | ✅ Noted |

---

## ✅ EXTRACTED: Output Formats

| Format | Status | Use Case |
|--------|--------|----------|
| tbl (table) | ✅ Extracted | Human-readable console output |
| json | ✅ Extracted | JSON data exchange |
| yaml | ✅ Extracted | YAML configuration |
| csv | ✅ Extracted | Spreadsheet import |
| excel | ✅ Extracted | Excel file export |
| cds | ✅ Extracted | CAP CDS definitions |
| cdl | ✅ Extracted | CDS Language format |
| hdbcds | ✅ Extracted | HANA CDS format |
| hdbtable | ✅ Extracted | HDB Table definitions |
| hdbmigrationtable | ✅ Extracted | Migration tables |
| sql | ✅ Extracted | SQL DDL statements |
| sqlite | ✅ Extracted | SQLite-compatible SQL |
| postgres | ✅ Extracted | PostgreSQL-compatible SQL |
| edmx | ✅ Extracted | OData EDMX metadata |
| edm | ✅ Extracted | OData EDM |
| annos | ✅ Extracted | OData annotations |
| graphql | ✅ Extracted | GraphQL schema |
| openapi/swgr | ✅ Extracted | OpenAPI/Swagger spec |
| jsdoc | ✅ Extracted | JSDoc documentation |

---

## ✅ EXTRACTED: Command Options

### Common Options
| Option | Aliases | Type | Status |
|--------|---------|------|--------|
| schema | s, Schema | string | ✅ Extracted |
| table | t, Table | string | ✅ Extracted |
| output | o, Output | string | ✅ Extracted |
| limit | l | number | ✅ Extracted |
| folder | f, Folder | string | ✅ Extracted |
| filename | n, Filename | string | ✅ Extracted |
| profile | p, Profile | string | ✅ Extracted |
| useHanaTypes | hana | boolean | ✅ Extracted |
| useQuoted | q, quoted | boolean | ✅ Extracted |

### Connection Options
| Option | Aliases | Type | Status |
|--------|---------|------|--------|
| connection | n | string | ✅ Extracted |
| user | u, User | string | ✅ Extracted |
| password | p, Password | string | ✅ Extracted |
| userstorekey | U, UserStoreKey | string | ✅ Extracted |
| save | s, Save | boolean | ✅ Extracted |
| encrypt | e, Encrypt, ssl | boolean | ✅ Extracted |
| trustStore | t, Trust | string | ✅ Extracted |

---

## ✅ EXTRACTED: Dependencies

| Dependency | Version | Purpose | Status |
|------------|---------|---------|--------|
| @sap/cds | 9.4.4 | CAP Core framework | ✅ Extracted |
| @cap-js/hana | 2.3.4 | HANA database adapter | ✅ Extracted |
| @cap-js/graphql | 0.14.0 | GraphQL support | ✅ Extracted |
| yargs | v18 | CLI argument parsing | ✅ Extracted |
| inquirer | - | Interactive prompts | ✅ Extracted |
| chalk | - | Terminal styling | ✅ Extracted |
| swagger-ui | - | API documentation | ✅ Extracted |

---

## ✅ EXTRACTED: Changelog Highlights

| Version | Date | Key Changes | Status |
|---------|------|-------------|--------|
| 3.202511.0 | Nov 2025 | yargs v18, SAPUI5 1.142.0, Node 22 | ✅ Extracted |
| 3.202504.1 | Apr 2025 | CAP 8.9.0 binding fix | ✅ Extracted |
| 3.202405.1 | May 2024 | CAP 7.9.0, @cap-js/hana switch | ✅ Extracted |
| 3.202309.1 | Sep 2023 | Node 18+, PostgreSQL/SQLite | ✅ Extracted |
| 3.202307.1 | Jul 2023 | CAP 7.0.2 upgrade | ✅ Extracted |
| 3.202301.1 | Jan 2023 | BTP CLI support | ✅ Extracted |
| 3.202201.1 | Jan 2022 | Remove @sap/hdbext dependency | ✅ Extracted |

---

## ✅ EXTRACTED: Key Features

| Feature | Status | Location |
|---------|--------|----------|
| Multiple DB backends (HANA, PostgreSQL, SQLite) | ✅ Extracted | SKILL.md |
| HDI container management | ✅ Extracted | references/hdi-management.md |
| SAP BTP CLI integration | ✅ Extracted | references/cloud-operations.md |
| Format conversion (17+ formats) | ✅ Extracted | references/output-formats.md |
| Interactive prompts | ✅ Extracted | SKILL.md |
| Web UI alternatives for commands | ✅ Extracted | SKILL.md |
| Service key authentication | ✅ Extracted | references/connection-security.md |
| GraphQL support | ✅ Extracted | references/output-formats.md |
| OData service generation | ✅ Extracted | SKILL.md |

---

## Source Documentation Links

| Resource | URL | Status |
|----------|-----|--------|
| GitHub Repository | https://github.com/SAP-samples/hana-developer-cli-tool-example | ✅ Linked |
| Introduction Video | https://youtu.be/dvVQfi9Qgog | ✅ Linked |
| Cloud Shell Demo | https://youtu.be/L7QyVLvAIIQ | ✅ Linked |
| npm Package | https://www.npmjs.com/package/hana-cli | ✅ Linked |
| SAP HANA Cloud Help | https://help.sap.com/docs/hana-cloud | ✅ Linked |

---

## Files Created

| File | Purpose | Status |
|------|---------|--------|
| SKILL.md | Main skill with progressive disclosure | ✅ Created |
| README.md | Keywords and discovery | ✅ Created |
| references/command-reference.md | Full command documentation | ✅ Created |
| references/connection-security.md | Connection and security details | ✅ Created |
| references/hdi-management.md | HDI container operations | ✅ Created |
| references/output-formats.md | Format conversion details | ✅ Created |
| references/cloud-operations.md | BTP and cloud commands | ✅ Created |
| templates/default-env.json | Connection template | ✅ Created |
| templates/cdsrc-private.json | CDS binding template | ✅ Created |

---

## Verification Checklist

- [x] All 91 commands documented
- [x] All command aliases captured
- [x] All 17+ output formats documented
- [x] All connection methods covered
- [x] Version history extracted
- [x] Dependencies listed
- [x] Installation methods documented
- [x] Security considerations covered
- [x] Progressive disclosure implemented
- [x] Source links included for updates
- [x] Keywords comprehensive for discovery

---

**Extraction Complete**: 2025-11-22
**Skill Version**: 1.0.0
