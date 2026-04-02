---
name: sap-datasphere
description: "SAP Datasphere development skill with 3 specialized agents, 5 slash commands, and validation hooks. Use when building data warehouses on SAP BTP, creating analytic models, configuring data flows and replication flows, setting up connections, managing spaces and users, implementing data access controls, or using the datasphere CLI. Covers Data Builder, Business Builder, analytic models, 40+ connection types, real-time replication, task chains, content transport, and data marketplace."
license: GPL-3.0
metadata:
  version: 2.1.0
  last_verified: 2025-12-28
  keywords: [sap datasphere, data warehouse cloud, dwc, data builder, business builder, analytic model, graphical view, sql view, transformation flow, replication flow, data flow, task chain, remote table, local table, datasphere connection, datasphere space, data access control, elastic compute node, datasphere cli, data products, data marketplace, catalog, governance]
---

# SAP Datasphere Skill

## Table of Contents

- [Overview](#overview)
- [Quick Reference](#quick-reference)
  - [Core Components](#core-components)
  - [Object Types](#object-types)
- [Data Builder](#data-builder)
  - [Graphical Views](#graphical-views)
  - [SQL Views](#sql-views)
  - [Tables](#tables)
  - [Flows](#flows)
  - [Task Chains](#task-chains)
- [Business Builder](#business-builder)
- [Analytic Models](#analytic-models)
- [Connections](#connections)
- [Space Management](#space-management)
- [Data Access Control](#data-access-control)
- [Monitoring](#monitoring)
- [CLI Reference](#cli-reference)
- [Data Products & Marketplace](#data-products--marketplace)
- [Catalog & Governance](#catalog--governance)
- [Content Transport](#content-transport)
- [Common Issues](#common-issues)
- [Bundled Resources](#bundled-resources)
- [Documentation Links](#documentation-links)

## Overview

SAP Datasphere is SAP's cloud-native data warehouse solution on SAP Business Technology Platform (BTP). This skill provides comprehensive guidance for data acquisition, preparation, modeling, administration, and integration.

**Use this skill when**:
- Creating data warehouses on SAP BTP
- Building analytic models for SAP Analytics Cloud
- Setting up data flows, replication flows, or transformation flows
- Configuring connections to SAP or third-party systems
- Managing spaces, users, and access controls
- Implementing real-time data replication
- Monitoring data integration tasks

---

## Quick Reference

### Core Components

| Component | Purpose | Key Objects |
|-----------|---------|-------------|
| **Data Builder** | Data acquisition & preparation | Views, Tables, Flows, Task Chains |
| **Business Builder** | Semantic layer modeling | Business Entities, Fact Models, Consumption Models |
| **Analytic Model** | Analytics-ready structures | Dimensions, Facts, Measures, Hierarchies |
| **Connections** | External data sources | 40+ connection types |
| **Spaces** | Logical data containers | Storage, Users, Objects |

### Object Types

**Views**:
- Graphical View: Visual data modeling with drag-and-drop
- SQL View: SQL-based view definitions
- Analytic Model: Analytics-optimized semantic layer

**Tables**:
- Local Table: Data stored in Datasphere
- Remote Table: Virtual access to external data
- Local Table (File): Object store-based storage

**Flows**:
- Data Flow: ETL transformations
- Replication Flow: Data replication from sources
- Transformation Flow: Delta-aware transformations

---

## Data Builder

### Graphical Views

Create views visually by dragging sources and adding transformations.

**Supported Operations**:
- Join: Inner, Left Outer, Right Outer, Full Outer, Cross
- Union: Combine multiple sources
- Projection: Select/rename columns
- Filter: Row-level filtering
- Aggregation: Group by with aggregates
- Calculated Columns: Derived values

**Best Practices**:
- Use input parameters for dynamic filtering
- Apply data access controls for row-level security
- Enable persistence for frequently accessed views
- Use lineage analysis to understand dependencies

For detailed graphical view operations, see `references/graphical-sql-views.md`.

### SQL Views

Create views using SQL or SQLScript.

```sql
-- Basic SQL View
SELECT
    customer_id,
    customer_name,
    SUM(order_amount) AS total_orders
FROM orders
GROUP BY customer_id, customer_name
```

**SQLScript Support**:
- Table variables
- Scalar variables
- Control flow (IF, WHILE, FOR)
- Exception handling

For SQL/SQLScript reference, see `references/graphical-sql-views.md`.

### Data Flows

ETL pipelines for data transformation and loading.

**Operators**:
- Source: Remote/local tables, views
- Target: Local tables
- Join, Union, Projection, Filter, Aggregation
- Script: Python custom logic
- Calculated Columns

**Execution**:
- Manual run or scheduled via task chains
- Delta capture for incremental loads
- Input parameters for runtime configuration

For data flow details, see `references/data-acquisition-preparation.md`.

### Replication Flows

Replicate data from source systems to Datasphere or external targets.

**Supported Sources**:
- SAP S/4HANA (Cloud/On-Premise)
- SAP BW/4HANA
- SAP ECC
- ABAP-based systems
- Cloud storage (S3, Azure Blob, GCS)
- Kafka/Confluent
- SFTP

**Supported Targets**:
- SAP Datasphere (local tables)
- Apache Kafka
- Google BigQuery
- Cloud storage providers
- SAP Signavio

**Load Types**:
- Initial Load: Full data extraction
- Delta Load: Changed data only
- Real-Time: Continuous replication

For replication flow configuration, see `references/data-acquisition-preparation.md`.

### Transformation Flows

Delta-aware transformations with automatic change propagation.

**Key Features**:
- Automatic delta detection
- Target table management
- Graphical or SQL view as source
- Run modes: Start, Delete, Truncate

For transformation flow details, see `references/data-acquisition-preparation.md`.

### Task Chains

Orchestrate multiple tasks in sequence or parallel.

**Supported Tasks**:
- Data flows
- Replication flows
- Transformation flows
- Remote table replication
- View persistence
- Open SQL procedures
- API tasks
- BW Bridge process chains

**Features**:
- Parallel execution branches
- Input parameters
- Email notifications
- Nested task chains
- Scheduling (simple or cron)

---

## Data Modeling

### Analytic Models

Create analytics-ready semantic models for SAP Analytics Cloud.

**Components**:
- **Fact**: Contains measures (quantitative data)
- **Dimension**: Categorizes data (master data)
- **Measure**: Quantifiable metrics
- **Hierarchy**: Navigation structures
- **Variable**: Runtime parameters

**Creating an Analytic Model**:
1. Add a fact source (view or table)
2. Add dimension associations
3. Define measures with aggregation
4. Configure variables for filtering
5. Set data access controls

For detailed modeling guidance, see `references/data-modeling.md`.

### Dimensions

Categorize and filter analytical data.

**Types**:
- Standard: Basic categorical data
- Time: Calendar-based filtering
- Fiscal Time: Custom fiscal calendars
- Text Entity: Multilingual labels

**Features**:
- Hierarchies (level-based, parent-child)
- Time dependency (SCD Type 2)
- Compound keys
- Associated text entities

### Measures

Quantifiable values for analysis.

**Types**:
- Simple: Direct aggregation
- Calculated: Derived from other measures
- Restricted: Filtered aggregation
- Currency Conversion: Dynamic conversion
- Unit Conversion: Dynamic conversion
- Count Distinct: Unique value count
- Non-Cumulative: Point-in-time values

**Aggregation Types**:
- SUM, MIN, MAX, COUNT, AVG
- Exception aggregation for non-additive scenarios

For measure configuration, see `references/data-modeling.md`.

### Business Builder

Create business-oriented semantic models.

**Objects**:
- **Business Entity**: Reusable dimension/fact definitions
- **Fact Model**: Combines business entities
- **Consumption Model**: Analytics-ready model
- **Authorization Scenario**: Row-level security

For Business Builder details, see `references/data-modeling.md`.

---

## Connectivity

### Connection Types

SAP Datasphere supports 40+ connection types.

**SAP Systems**:
- SAP S/4HANA Cloud/On-Premise
- SAP BW/4HANA (Model Transfer)
- SAP BW Bridge
- SAP ECC
- SAP HANA (Cloud/On-Premise)
- SAP SuccessFactors
- SAP Fieldglass
- SAP Marketing Cloud
- SAP Signavio

**Cloud Platforms**:
- Amazon S3, Athena, Redshift
- Google Cloud Storage, BigQuery
- Microsoft Azure Blob, Data Lake, SQL Database
- Microsoft OneLake

**Databases**:
- Oracle
- Microsoft SQL Server
- Generic JDBC

**Streaming**:
- Apache Kafka
- Confluent

**Other**:
- Generic OData, HTTP, SFTP
- Adverity, Precog
- SAP Open Connectors

For connection configuration, see `references/connectivity.md`.

### Connection Features

| Feature | Description |
|---------|-------------|
| Remote Tables | Virtual data access |
| Data Flows | ETL transformation |
| Replication Flows | Data replication |
| Model Import | BW/4HANA model transfer |

---

## Administration

### Spaces

Logical containers for data and objects.

**Configuration**:
- Storage allocation (disk + in-memory)
- User access and roles
- Priority and statement limits
- Workload management

**Operations**:
- Create, copy, delete spaces
- Export/import space data
- Command-line management (datasphere CLI)

For space management, see `references/administration.md`.

### Users and Roles

**Standard Roles**:
- DW Administrator
- DW Space Administrator
- DW Integrator
- DW Modeler
- DW Viewer

**Scoped Roles**:
- Space-specific permissions
- Custom privilege combinations

**Authentication**:
- SAP Cloud Identity Services
- Custom SAML IdP
- OAuth 2.0 clients

For user management, see `references/administration.md`.

### Monitoring

**Capabilities**:
- Capacity monitoring (storage, memory, compute)
- Audit logs (database operations)
- Activity logs (object changes)
- Task logs (flow executions)

**Database Analysis**:
- Create analysis users for debugging
- Monitor HANA views
- Stop running statements

For monitoring details, see `references/administration.md`.

---

## Data Integration Monitor

### Remote Tables

**Operations**:
- Replicate data (full/delta/real-time)
- Partition data loads
- Create statistics
- Monitor queries

### Real-Time Replication

**Features**:
- Continuous change capture
- Pause/resume capability
- Automatic recovery
- Watermark tracking

### View Persistence

**Options**:
- Scheduled refresh
- On-demand refresh
- Partition management
- Memory optimization

For monitoring details, see `references/data-integration-monitor.md`.

---

## CLI Reference

### Datasphere CLI Overview

The `datasphere` CLI enables command-line administration and automation.

**Installation**:
```bash
npm install -g @sap/datasphere-cli
```

**Authentication**:
```bash
# Interactive login
datasphere config auth login

# Service key (CI/CD)
datasphere config auth login --service-key-path ./key.json
```

**Core Commands**:

| Command | Purpose |
|---------|---------|
| `datasphere spaces list` | List all spaces |
| `datasphere spaces create` | Create a space |
| `datasphere objects export` | Export objects |
| `datasphere objects import` | Import objects |
| `datasphere tasks run` | Execute task chains |
| `datasphere marketplace list` | List marketplace products |

**CI/CD Integration**:
```bash
# Export and import workflow
datasphere objects export --space DEV --output-file package.zip
datasphere objects import --space PROD --input-file package.zip --overwrite
```

For complete CLI reference, see `references/cli-commands.md`.

---

## Data Products & Marketplace

### Creating Data Products

Package curated data for internal or external consumption:

1. **Plan**: Define purpose, target consumers, contents
2. **Prepare**: Create views/models, set semantic usage, document
3. **Configure**: Set visibility, access controls, terms
4. **Publish**: Make available in marketplace

**Product Components**:
- Core assets (views, models, entities)
- Documentation and sample queries
- Governance metadata (owner, quality score, SLA)

### Data Marketplace

Discover and consume published data products:

- **Search**: Find by category, provider, quality
- **Request Access**: Submit justification, await approval
- **Consume**: Use in views or SAC stories

For complete marketplace guidance, see `references/data-products-marketplace.md`.

---

## Catalog & Governance

### Data Catalog Features

Centralized discovery and governance:

- **Asset Discovery**: Search all data objects with metadata
- **Glossary**: Standardized business term definitions
- **Data Quality**: Automated quality rules and scoring
- **Lineage**: Trace data from source to consumption
- **Classification**: Sensitivity levels and compliance tags

### Governance Workflow

```
Create Object → Add Metadata → Link Terms → Quality Check → Approve → Publish
```

**Roles**:
- **Data Owner**: Business accountability
- **Data Steward**: Quality and metadata management
- **Data Custodian**: Technical implementation

For detailed governance guidance, see `references/catalog-governance.md`.

---

## Data Access Controls

Implement row-level security.

**Types**:
- Single Values: Simple value matching
- Operator and Values: Complex conditions
- Hierarchy: Node-based filtering
- Hierarchy with Directory: Hierarchical permissions

**Application**:
- Apply to views or analytic models
- Based on user attributes
- Import from SAP BW Analysis Authorizations

For security configuration, see `references/data-access-security.md`.

---

## Content Transport

Move content between tenants.

**Methods**:
- Export/Import packages
- SAP Cloud Transport Management
- CSN/JSON file export

**Package Contents**:
- Views, tables, flows
- Connections (metadata only)
- Spaces configuration

For transport procedures, see `references/content-transport.md`.

---

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Deployment failed | Circular dependency | Check object dependencies |
| Connection timeout | Network/firewall | Verify Cloud Connector/IP allowlist |
| Replication stuck | Source lock | Check source system status |
| Out of memory | Large view | Enable persistence or partitioning |
| Permission denied | Missing role | Verify space membership and privileges |

---

## Bundled Resources

### Reference Documentation

**Core Data Builder:**
1. **`references/data-acquisition-preparation.md`** - Data flows, replication flows, transformation flows, and table management
2. **`references/graphical-sql-views.md`** - Graphical views, SQL views, E-R models, and intelligent lookups
3. **`references/data-modeling.md`** - Business Builder entities, analytic models, dimensions, measures, and hierarchies

**Connectivity & Integration:**
4. **`references/connectivity.md`** - All 40+ connection types including SAP systems, cloud providers, and streaming platforms
5. **`references/data-integration-monitor.md`** - Task scheduling, monitoring, real-time replication, and delta mechanisms

**Administration & Security:**
6. **`references/administration.md`** - Tenant management, space configuration, user roles, and elastic compute nodes
7. **`references/data-access-security.md`** - Row-level security, DAC configurations, and authorization scenarios
8. **`references/content-transport.md`** - Package export/import, transport management, and tenant migration

**CLI & Automation:**
9. **`references/cli-commands.md`** - Complete CLI reference, authentication, CI/CD integration patterns

**Marketplace & Governance:**
10. **`references/data-products-marketplace.md`** - Creating and consuming data products, provider workflows, pricing
11. **`references/catalog-governance.md`** - Data catalog, glossary, quality rules, lineage, classification

**Best Practices & Updates:**
12. **`references/best-practices-patterns.md`** - Architecture patterns, naming conventions, performance optimization, checklists
13. **`references/whats-new-2025.md`** - Q1-Q4 2025 features, Generic HTTP, REST API tasks, deprecations

**MCP Integration:**
14. **`references/mcp-tools-reference.md`** - Complete MCP tool reference, 45 tools across 8 categories, API documentation, authentication patterns
15. **`references/mcp-use-cases.md`** - 8 real-world use cases with personas, time savings, and ROI analysis ($159K+/year savings)

### Plugin Components

This plugin includes 3 specialized agents, 5 slash commands, and validation hooks:

**Agents** (in `agents/`):
- `datasphere-modeler` - Data Builder tasks, views, flows, analytic models
- `datasphere-integration-advisor` - Connectivity, replication, data integration
- `datasphere-admin-helper` - Space management, security, monitoring

**Commands** (in `commands/`):
- `/datasphere-space-template` - Generate space configurations
- `/datasphere-view-template` - Generate view templates (graphical/SQL)
- `/datasphere-connection-guide` - Step-by-step connection setup
- `/datasphere-cli` - CLI command reference and examples

**Hooks** (in `hooks/`):
- PreToolUse validation for SQL/SQLScript code quality
- PostToolUse suggestions for persistence and optimization

## MCP Integration

This skill integrates with the **SAP Datasphere MCP Server** (@mariodefe/sap-datasphere-mcp) providing 45 tools for live tenant interaction.

### MCP Tools

The MCP server enables:
- **Direct Queries:** Execute SQL and smart queries on live data
- **Metadata Access:** Inspect tables, views, and analytic models
- **User Management:** Create, update, delete database users
- **Catalog Search:** Find assets by name or column
- **Connection Testing:** Verify connectivity and tenant info
- **Data Profiling:** Analyze column distributions

See `/datasphere-mcp-tools` command for complete tool list.

### Authentication

OAuth 2.0 Client Credentials with automatic token refresh.

Required environment variables:
- `DATASPHERE_BASE_URL`
- `DATASPHERE_CLIENT_ID`
- `DATASPHERE_CLIENT_SECRET`
- `DATASPHERE_TOKEN_URL`

### Performance

- Sub-100ms metadata queries (cached)
- 100-500ms catalog operations
- 500-2,000ms OData queries
- Batch processing up to 50,000 records

### File Structure
```
plugins/sap-datasphere/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json                         # MCP server configuration
├── agents/
│   ├── datasphere-modeler.md
│   ├── datasphere-integration-advisor.md
│   └── datasphere-admin-helper.md
├── commands/
│   ├── datasphere-space-template.md
│   ├── datasphere-view-template.md
│   ├── datasphere-connection-guide.md
│   ├── datasphere-cli.md
│   └── datasphere-mcp-tools.md       # MCP tools reference
├── hooks/
│   └── hooks.json
└── skills/
    └── sap-datasphere/
        ├── .claude-plugin/
        │   └── plugin.json
        ├── SKILL.md
        ├── README.md
        └── references/
            ├── data-acquisition-preparation.md
            ├── data-modeling.md
            ├── graphical-sql-views.md
            ├── connectivity.md
            ├── administration.md
            ├── data-integration-monitor.md
            ├── data-access-security.md
            ├── content-transport.md
            ├── cli-commands.md
            ├── data-products-marketplace.md
            ├── catalog-governance.md
            ├── best-practices-patterns.md
            ├── whats-new-2025.md
            └── mcp-tools-reference.md    # MCP technical reference
```

## Documentation Links

- **SAP Help Portal**: [https://help.sap.com/docs/SAP_DATASPHERE](https://help.sap.com/docs/SAP_DATASPHERE)
- **Source Repository**: [https://github.com/SAP-docs/sap-datasphere](https://github.com/SAP-docs/sap-datasphere)
- **SAP Community**: [https://community.sap.com/topics/datasphere](https://community.sap.com/topics/datasphere)
- **API Reference**: [https://api.sap.com/package/saaborddatasphere](https://api.sap.com/package/saaborddatasphere)

---

**Version**: 2.1.0 | **Last Verified**: 2025-12-28
