---
name: sap-datasphere
description: |
  Comprehensive guide for SAP Datasphere development including data acquisition, preparation, modeling, administration, connectivity, and integration. Use when building data warehouses on SAP BTP, creating analytic models, configuring data flows and replication flows, setting up connections to SAP and third-party systems, managing spaces and users, implementing data access controls, or monitoring data integration tasks. Covers Data Builder (graphical/SQL views, local/remote tables, transformation flows), Business Builder (business entities, consumption models), analytic models (dimensions, measures, hierarchies), 40+ connection types (SAP S/4HANA, BW/4HANA, HANA Cloud, AWS, Azure, GCP, Kafka), real-time replication, task chains, and content transport. Keywords: sap datasphere, data warehouse cloud, dwc, data builder, business builder, analytic model, graphical view, sql view, transformation flow, replication flow, data flow, task chain, remote table, local table, sap btp data warehouse, datasphere connection, datasphere space, data access control, elastic compute node, sap analytics cloud integration
license: MIT
metadata:
  version: 1.1.0
  last_verified: 2025-11-22
  token_savings: ~70%
  errors_prevented: 25+
  official_docs: https://help.sap.com/docs/SAP_DATASPHERE
  source_repo: https://github.com/SAP-docs/sap-datasphere
---

# SAP Datasphere Skill

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

## Bundled Resources

| Resource | Description |
|----------|-------------|
| `references/data-acquisition-preparation.md` | Data flows, replication, tables |
| `references/data-modeling.md` | Analytic models, Business Builder |
| `references/graphical-sql-views.md` | Views, E-R models, lookups |
| `references/administration.md` | Tenant, spaces, users, monitoring |
| `references/connectivity.md` | All connection types |
| `references/data-integration-monitor.md` | Monitoring, scheduling |
| `references/data-access-security.md` | Row-level security |
| `references/content-transport.md` | Export, import, packages |

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

## Documentation Links

- **SAP Help Portal**: https://help.sap.com/docs/SAP_DATASPHERE
- **Source Repository**: https://github.com/SAP-docs/sap-datasphere
- **SAP Community**: https://community.sap.com/topics/datasphere
- **API Reference**: https://api.sap.com/package/saaborddatasphere

---

**Version**: 1.0.0 | **Last Verified**: 2025-11-22
