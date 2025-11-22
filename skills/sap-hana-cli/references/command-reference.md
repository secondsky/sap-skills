# SAP HANA CLI - Complete Command Reference

**Source**: https://github.com/SAP-samples/hana-developer-cli-tool-example
**Total Commands**: 91

---

## Table of Contents

1. [Database Object Commands](#database-object-commands)
2. [Inspection Commands](#inspection-commands)
3. [Connection Commands](#connection-commands)
4. [HDI Container Commands](#hdi-container-commands)
5. [Query & Execution Commands](#query--execution-commands)
6. [Mass Operation Commands](#mass-operation-commands)
7. [Cloud & BTP Commands](#cloud--btp-commands)
8. [User & Role Commands](#user--role-commands)
9. [System Information Commands](#system-information-commands)
10. [Development Commands](#development-commands)
11. [Monitoring Commands](#monitoring-commands)
12. [Documentation Commands](#documentation-commands)

---

## Database Object Commands

### tables
List tables in schema.

```bash
hana-cli tables [schema]
```

**Options**:
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| schema | s | string | CURRENT_SCHEMA | Target schema |
| limit | l | number | 200 | Max results |

**UI Alternative**: `tablesUI`

### views
List views in schema.

```bash
hana-cli views [schema]
```

### procedures
List stored procedures.

```bash
hana-cli procedures [schema]
```

### functions / functionsUI
List database functions.

```bash
hana-cli functions [schema]
```

### indexes / indexesUI
List database indexes.

```bash
hana-cli indexes [schema] [table]
```

### sequences
List sequences.

```bash
hana-cli sequences [schema]
```

### synonyms
List synonyms.

```bash
hana-cli synonyms [schema]
```

### triggers
List database triggers.

```bash
hana-cli triggers [schema]
```

### schemas / schemasUI
List available schemas.

```bash
hana-cli schemas
```

### dataTypes / dataTypesUI
Display HANA data type specifications.

```bash
hana-cli dataTypes
```

### objects
List all database objects.

```bash
hana-cli objects [schema]
```

### libraries
List database libraries.

```bash
hana-cli libraries [schema]
```

---

## Inspection Commands

### inspectTable
Inspect table structure with format conversion.

**Aliases**: `it`, `table`, `insTbl`, `inspecttable`, `inspectable`

```bash
hana-cli inspectTable [schema] [table]
```

**Options**:
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| table | t | string | required | Table name |
| schema | s | string | CURRENT_SCHEMA | Schema name |
| output | o | string | tbl | Output format |
| useHanaTypes | hana | boolean | false | Use HANA types |
| useQuoted | q | boolean | false | Quoted identifiers |
| useExists | exists | boolean | true | Check existence |

**Output Formats**: `tbl`, `sql`, `sqlite`, `postgres`, `cds`, `json`, `yaml`, `cdl`, `hdbcds`, `hdbtable`, `hdbmigrationtable`, `jsdoc`, `graphql`, `edmx`, `annos`, `edm`, `swgr`, `openapi`

**UI Alternative**: `inspectTableUI`

### inspectView
Inspect view definition.

```bash
hana-cli inspectView [schema] [view]
```

### inspectProcedure
Inspect stored procedure.

```bash
hana-cli inspectProcedure [schema] [procedure]
```

### inspectFunction
Inspect function definition.

```bash
hana-cli inspectFunction [schema] [function]
```

### inspectIndex
Inspect index structure.

```bash
hana-cli inspectIndex [schema] [index]
```

### inspectTrigger
Inspect trigger definition.

```bash
hana-cli inspectTrigger [schema] [trigger]
```

### inspectUser
Inspect database user.

```bash
hana-cli inspectUser [user]
```

### inspectLibrary
Inspect database library.

```bash
hana-cli inspectLibrary [schema] [library]
```

### inspectLibMember
Inspect library member.

```bash
hana-cli inspectLibMember [schema] [library] [member]
```

### inspectJWT
Inspect and decode JWT token.

```bash
hana-cli inspectJWT [token]
```

---

## Connection Commands

### connect
Establish and save database connection.

**Aliases**: `c`, `login`

```bash
hana-cli connect [user] [password]
```

**Options**:
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| connection | n | string | - | host:port |
| user | u | string | - | Database user |
| password | p | string | - | Password (masked) |
| userstorekey | U | string | - | User store key |
| save | s | boolean | true | Save credentials |
| encrypt | e | boolean | - | Enable SSL |
| trustStore | t | string | - | SSL certificate path |

### connectViaServiceKey
Connect using BTP service key.

```bash
hana-cli connectViaServiceKey
```

### status
Display current connection status.

```bash
hana-cli status
```

### certificates
List system certificates.

```bash
hana-cli certificates
```

---

## HDI Container Commands

### activateHDI
Enable HDI service for tenant.

```bash
hana-cli activateHDI [tenant]
```

### adminHDI
Create/assign HDI admin privileges.

```bash
hana-cli adminHDI [user]
```

### adminHDIGroup
Add HDI group administrator.

```bash
hana-cli adminHDIGroup [group] [user]
```

### containers
List HDI containers.

**Aliases**: `cont`, `listContainers`

```bash
hana-cli containers [containerGroup] [container]
```

**Options**:
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| container | c | string | * | Container filter |
| containerGroup | g | string | * | Group filter |
| limit | l | number | 200 | Max results |

**UI Alternative**: `containersUI`

### createContainer
Create new HDI container.

```bash
hana-cli createContainer [container] [group]
```

### createContainerUsers
Create container access users.

```bash
hana-cli createContainerUsers [container]
```

### dropContainer
Remove HDI container.

```bash
hana-cli dropContainer [container]
```

### createGroup
Create container group.

```bash
hana-cli createGroup [group]
```

### dropGroup
Remove container group.

```bash
hana-cli dropGroup [group]
```

---

## Query & Execution Commands

### querySimple
Execute SQL query with flexible output.

**Aliases**: `qs`, `querysimple`

```bash
hana-cli querySimple [query]
```

**Options**:
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| query | q | string | required | SQL query |
| folder | f | string | ./ | Output directory |
| filename | n | string | - | Output filename |
| output | o | string | table | Output format |
| profile | p | string | - | Connection profile |

**Output Formats**: `table`, `json`, `excel`, `csv`

**UI Alternative**: `querySimpleUI`

### callProcedure
Execute stored procedure.

**Aliases**: `cp`, `callprocedure`, `callProc`, `callSP`

```bash
hana-cli callProcedure [schema] [procedure]
```

**Options**:
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| procedure | p | string | required | Procedure name |
| schema | s | string | CURRENT_SCHEMA | Schema name |

### hdbsql
Direct SQL execution interface.

```bash
hana-cli hdbsql
```

---

## Mass Operation Commands

### massConvert
Batch convert database objects.

**Aliases**: `mc`, `massconvert`, `massConv`

```bash
hana-cli massConvert [schema] [table] [view]
```

**UI Alternative**: `massConvertUI`

### massRename
Batch rename operations.

```bash
hana-cli massRename [schema]
```

### massUsers
Bulk user operations.

```bash
hana-cli massUsers
```

---

## Cloud & BTP Commands

### btp
Configure BTP CLI targeting.

```bash
hana-cli btp
```

### btpInfo
Display BTP target details.

```bash
hana-cli btpInfo
```

### btpSubs
List BTP subscriptions.

```bash
hana-cli btpSubs
```

### hanaCloudInstances
List HANA Cloud instances.

```bash
hana-cli hanaCloudInstances
```

### hanaCloudHDIInstances / hanaCloudHDIInstancesUI
List Cloud HDI instances.

```bash
hana-cli hanaCloudHDIInstances
```

### hanaCloudSchemaInstances / hanaCloudSchemaInstancesUI
List Cloud schema instances.

```bash
hana-cli hanaCloudSchemaInstances
```

### hanaCloudSBSSInstances / hanaCloudSBSSInstancesUI
List Cloud SBSS instances.

```bash
hana-cli hanaCloudSBSSInstances
```

### hanaCloudSecureStoreInstances / hanaCloudSecureStoreInstancesUI
List Cloud secure store instances.

```bash
hana-cli hanaCloudSecureStoreInstances
```

### hanaCloudUPSInstances / hanaCloudUPSInstancesUI
List Cloud UPS instances.

```bash
hana-cli hanaCloudUPSInstances
```

### hanaCloudStart
Start HANA Cloud instance.

```bash
hana-cli hanaCloudStart [instance]
```

### hanaCloudStop
Stop HANA Cloud instance.

```bash
hana-cli hanaCloudStop [instance]
```

---

## User & Role Commands

### users
List database users.

```bash
hana-cli users
```

### roles
List database roles.

```bash
hana-cli roles
```

### createXSAAdmin
Create XSA administrator.

```bash
hana-cli createXSAAdmin [user]
```

### createJWT
Generate JWT token.

```bash
hana-cli createJWT
```

---

## System Information Commands

### systemInfo / systemInfoUI
Display system information.

```bash
hana-cli systemInfo
```

### hostInformation
Display host details.

```bash
hana-cli hostInformation
```

### version
Display hana-cli version.

```bash
hana-cli version
```

### ports
List database ports.

```bash
hana-cli ports
```

### disks
Display disk information.

```bash
hana-cli disks
```

### dataVolumes
Display data volume information.

```bash
hana-cli dataVolumes
```

### iniFiles
List INI configuration files.

```bash
hana-cli iniFiles
```

### iniContents
Display INI file contents.

```bash
hana-cli iniContents [file]
```

---

## Development Commands

### cds
Convert database objects to CDS format.

```bash
hana-cli cds [schema] [object]
```

### createModule
Create development module.

```bash
hana-cli createModule
```

### copy2DefaultEnv
Copy credentials to default-env.json.

```bash
hana-cli copy2DefaultEnv
```

### copy2Env
Copy credentials to .env file.

```bash
hana-cli copy2Env
```

### copy2Secrets
Copy credentials to secrets.

```bash
hana-cli copy2Secrets
```

### openDBExplorer
Open HANA Database Explorer.

```bash
hana-cli openDBExplorer
```

### openBAS
Open Business Application Studio.

```bash
hana-cli openBAS
```

---

## Monitoring Commands

### features / featuresUI
Display database features.

```bash
hana-cli features
```

### featureUsage / featureUsageUI
Display feature usage metrics.

```bash
hana-cli featureUsage
```

### traces
List trace files.

```bash
hana-cli traces
```

### traceContents
Display trace contents.

```bash
hana-cli traceContents [trace]
```

### privilegeError
Diagnose privilege errors.

```bash
hana-cli privilegeError
```

### reclaim
Reclaim database resources.

```bash
hana-cli reclaim
```

---

## Documentation Commands

### changeLog / changeLogUI / openChangeLog
View release changelog.

```bash
hana-cli changeLog
hana-cli openChangeLog  # Opens in browser
```

### readMe / readMeUI / openReadMe
View documentation.

```bash
hana-cli readMe
hana-cli openReadMe  # Opens in browser
```

### issue
Report issue to GitHub.

```bash
hana-cli issue
```

### UI
Open general web UI.

```bash
hana-cli UI
```

---

## Global Options

All commands support:

| Option | Alias | Description |
|--------|-------|-------------|
| --help | -h | Display help |
| --admin | - | Use admin credentials |
| --conn | - | Specify connection file |
| --profile | -p | Connection profile |

---

*Reference: https://github.com/SAP-samples/hana-developer-cli-tool-example*
