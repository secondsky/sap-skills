---
name: sap-hana-cli
description: |
  Assists with SAP HANA Developer CLI (hana-cli) for database development and administration.
  Use when: installing hana-cli, connecting to SAP HANA databases, inspecting database objects
  (tables, views, procedures, functions), managing HDI containers, executing SQL queries,
  converting metadata to CDS/EDMX/OpenAPI formats, managing SAP HANA Cloud instances,
  working with BTP CLI integration, or troubleshooting hana-cli commands.
  Covers: 91 commands, 17+ output formats, HDI container management, cloud operations.
license: MIT
---

# SAP HANA Developer CLI (hana-cli)

A developer-centric command-line interface for SAP HANA database development, particularly useful in non-SAP tooling environments like VS Code.

**Repository**: https://github.com/SAP-samples/hana-developer-cli-tool-example
**npm Package**: https://www.npmjs.com/package/hana-cli
**Current Version**: 3.202511.0 (November 2025)
**Node.js Requirement**: ≥20.19.0

---

## Quick Start

### Installation

```bash
# Install globally via npm (recommended)
npm install -g hana-cli

# Verify installation
hana-cli version
```

### First Connection

```bash
# Interactive connection setup
hana-cli connect

# Or specify connection directly
hana-cli connect -n "hostname:port" -u DBUSER -p PASSWORD --save

# Using service key (HANA Cloud)
hana-cli connectViaServiceKey
```

---

## Core Command Categories

### Database Object Inspection

| Command | Aliases | Purpose |
|---------|---------|---------|
| `inspectTable` | `it`, `table` | Inspect table structure |
| `inspectView` | - | Inspect view definition |
| `inspectProcedure` | - | Inspect stored procedure |
| `inspectFunction` | - | Inspect function definition |
| `tables` | - | List all tables in schema |
| `views` | - | List all views in schema |
| `procedures` | - | List stored procedures |
| `functions` | - | List functions |

### Query Execution

| Command | Aliases | Purpose |
|---------|---------|---------|
| `querySimple` | `qs` | Execute SQL query |
| `callProcedure` | `cp` | Execute stored procedure |
| `hdbsql` | - | Direct SQL execution |

### HDI Container Management

| Command | Aliases | Purpose |
|---------|---------|---------|
| `containers` | `cont` | List HDI containers |
| `createContainer` | - | Create new container |
| `dropContainer` | - | Remove container |
| `activateHDI` | - | Enable HDI service |
| `adminHDI` | - | Administer HDI privileges |

### Cloud & BTP Operations

| Command | Aliases | Purpose |
|---------|---------|---------|
| `hanaCloudInstances` | - | List HANA Cloud instances |
| `hanaCloudStart` | - | Start cloud instance |
| `hanaCloudStop` | - | Stop cloud instance |
| `btp` | - | Configure BTP CLI |
| `btpInfo` | - | Display BTP target info |

---

## Output Formats

The `--output` / `-o` option supports 17+ formats:

| Format | Use Case |
|--------|----------|
| `tbl` | Human-readable table (default) |
| `json` | JSON data |
| `yaml` | YAML format |
| `csv` | CSV export |
| `excel` | Excel file |
| `cds` | CAP CDS definitions |
| `hdbcds` | HANA CDS format |
| `hdbtable` | HDB Table definitions |
| `sql` | SQL DDL statements |
| `edmx` | OData EDMX metadata |
| `openapi` | OpenAPI/Swagger spec |
| `graphql` | GraphQL schema |

---

## Connection Configuration

Connection credentials are searched in priority order:

1. `default-env-admin.json` (with `--admin` flag)
2. `.cdsrc-private.json` (via `cds bind`)
3. `.env` file with VCAP_SERVICES
4. File specified via `--conn` parameter
5. `default-env.json` in current/parent directories
6. `~/.hana-cli/default.json`

For connection templates, see `templates/default-env.json`.

---

## Common Workflows

### Inspect and Convert Table to CDS

```bash
# Inspect table structure
hana-cli inspectTable -s MYSCHEMA -t MYTABLE

# Convert to CDS format
hana-cli inspectTable -s MYSCHEMA -t MYTABLE -o cds
```

### Mass Convert Schema Objects

```bash
# Convert all objects in schema to CDS
hana-cli massConvert -s MYSCHEMA
```

### Execute Query with Export

```bash
# Run query and export to JSON
hana-cli querySimple -q "SELECT * FROM MYTABLE" -o json

# Export to Excel file
hana-cli querySimple -q "SELECT * FROM MYTABLE" -o excel -f ./output -n report
```

### Manage HDI Containers

```bash
# List all containers
hana-cli containers

# Create new container
hana-cli createContainer -c MY_CONTAINER -g MY_GROUP

# Create container users
hana-cli createContainerUsers -c MY_CONTAINER
```

---

## UI Commands

Many commands have browser-based UI alternatives (suffix `UI`):

- `tablesUI` - Browse tables visually
- `containersUI` - Manage containers in browser
- `massConvertUI` - Visual mass conversion
- `querySimpleUI` - Query builder interface
- `systemInfoUI` - System dashboard

---

## Key Features

- **Multi-database support**: HANA, PostgreSQL, SQLite backends
- **Format conversion**: 17+ output formats including CDS, EDMX, OpenAPI
- **HDI management**: Full container lifecycle management
- **Cloud integration**: SAP BTP CLI and HANA Cloud support
- **Interactive prompts**: Missing parameters prompted automatically
- **Service key auth**: Secure cloud authentication

---

## Detailed References

For comprehensive documentation:

- **All 91 Commands**: See `references/command-reference.md`
- **Connection & Security**: See `references/connection-security.md`
- **HDI Management**: See `references/hdi-management.md`
- **Output Formats**: See `references/output-formats.md`
- **Cloud Operations**: See `references/cloud-operations.md`

---

## Troubleshooting

### Connection Issues

```bash
# Check current connection status
hana-cli status

# Test with explicit credentials
hana-cli connect -n "host:443" -u USER -p PASS --encrypt true

# Use SSL trust store
hana-cli connect --trustStore /path/to/certificate.pem
```

### Permission Errors

```bash
# Diagnose privilege errors
hana-cli privilegeError

# View current user info
hana-cli inspectUser
```

### Version Compatibility

- **Node.js**: Requires ≥20.19.0
- **@sap/cds**: Uses 9.4.4
- **@sap/cds-dk**: Requires ≥8.9 for cds bind

---

## Resources

- **GitHub**: https://github.com/SAP-samples/hana-developer-cli-tool-example
- **Intro Video**: https://youtu.be/dvVQfi9Qgog
- **Cloud Shells Demo**: https://youtu.be/L7QyVLvAIIQ
- **SAP HANA Cloud**: https://help.sap.com/docs/hana-cloud
- **SAP CAP**: https://cap.cloud.sap/docs/

---

*Last Updated: 2025-11-22 | Version: 1.0.0*
