# Data Access and Security Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Integrating-data-and-managing-spaces/Data-Access-Control

---

## Table of Contents

1. [Data Access Controls Overview](#data-access-controls-overview)
2. [Single Values Data Access Control](#single-values-data-access-control)
3. [Operator and Values Data Access Control](#operator-and-values-data-access-control)
4. [Hierarchy Data Access Control](#hierarchy-data-access-control)
5. [Hierarchy with Directory Data Access Control](#hierarchy-with-directory-data-access-control)
6. [Importing BW Analysis Authorizations](#importing-bw-analysis-authorizations)
7. [Applying Data Access Controls](#applying-data-access-controls)
8. [Row-Level Security in Intelligent Applications](#row-level-security-in-intelligent-applications)
9. [Space Access Control](#space-access-control)
10. [Audit Logging](#audit-logging)

---

## Data Access Controls Overview

Data Access Controls (DACs) implement row-level security in SAP Datasphere.

### Purpose

- Restrict data visibility by user
- Implement fine-grained authorization
- Comply with data privacy requirements
- Support multi-tenant scenarios

### DAC Types

| Type | Use Case | Complexity |
|------|----------|------------|
| Single Values | Simple value matching | Low |
| Operator and Values | Complex conditions | Medium |
| Hierarchy | Node-based filtering | Medium |
| Hierarchy with Directory | Complex hierarchical | High |

### Architecture

```
User Request
     ↓
Data Access Control
     ↓
Criteria Evaluation
     ↓
Row Filtering
     ↓
Result Set
```

### DAC Components

**Criteria**:
- Columns used for filtering
- User attributes for matching
- Operators for comparison

**Permissions Entity**:
- Maps users to allowed values
- User IDs must be in the form required by your identity provider
- Supports wildcards (`*` for all records)
- Hierarchy node references
- **Cannot** be protected by data access controls themselves
- **Cannot** contain protected sources
- Must be encapsulated in views when shared across spaces

### Performance Considerations

| Factor | Recommendation |
|--------|----------------|
| Source table size | Replicate tables exceeding 500,000 rows |
| Permissions per user | Avoid exceeding 5,000 records for Operator/Values controls |
| Wildcard operator | Use `*` for all-records access |
| Persisted views | Views with protected sources **cannot** be persisted |

### Security Enforcement Scope

**Important**: Row-level security can be circumvented while the view remains in its original space.

Security is enforced only when the view is:
1. **Shared to another space**
2. **Consumed outside the space** (e.g., in SAP Analytics Cloud)

Controls filter results in data previews based on current user within the space.

---

## Single Values Data Access Control

### Overview

Simple value-based filtering using exact matches.

### Creating Single Values DAC

1. Data Builder > New Data Access Control
2. Select "Single Values"
3. Define criteria column
4. Configure permissions table
5. Deploy

### Criteria Configuration

**Single Criterion**:
```yaml
criterion: region
column: region_code
```

**Multiple Criteria**:
```yaml
criteria:
  - region: region_code
  - company: company_code
```

### Permissions Table

**Structure**:
| User | Region | Company |
|------|--------|---------|
| user1@company.com | US | 1000 |
| user1@company.com | EU | 1000 |
| user2@company.com | * | 2000 |

**Wildcard Support**:
- `*` matches all values
- Explicit values for specific access

### Example

**Scenario**: Restrict sales data by region

**DAC Definition**:
```yaml
type: Single Values
criteria:
  - name: region
    column: sales_region
permissions:
  - user: alice@company.com
    region: North America
  - user: bob@company.com
    region: Europe
  - user: charlie@company.com
    region: "*"  # All regions
```

---

## Operator and Values Data Access Control

### Overview

Complex filtering using comparison operators.

### Creating Operator and Values DAC

1. Data Builder > New Data Access Control
2. Select "Operator and Values"
3. Define criteria with operators
4. Configure permissions
5. Deploy

### Supported Operators

| Operator | Symbol | Description |
|----------|--------|-------------|
| Equal | = | Exact match |
| Not Equal | != | Exclude value |
| Less Than | < | Below threshold |
| Greater Than | > | Above threshold |
| Between | BT | Range inclusive |
| Contains Pattern | CP | Pattern match |

### Criteria Configuration

```yaml
criteria:
  - name: amount_range
    column: order_amount
    operators: [=, <, >, BT]
  - name: status
    column: order_status
    operators: [=, !=]
```

### Permissions Table

| User | Criterion | Operator | Value 1 | Value 2 |
|------|-----------|----------|---------|---------|
| user1 | amount | BT | 0 | 10000 |
| user2 | amount | > | 10000 | - |
| user3 | status | != | DRAFT | - |

### Example

**Scenario**: Restrict by amount threshold

**DAC Definition**:
```yaml
type: Operator and Values
criteria:
  - name: amount_threshold
    column: transaction_amount
permissions:
  - user: junior_analyst@company.com
    criterion: amount_threshold
    operator: "<"
    value: 10000
  - user: senior_analyst@company.com
    criterion: amount_threshold
    operator: "*"  # All amounts
```

---

## Hierarchy Data Access Control

### Overview

Filter data based on hierarchy node membership.

### Creating Hierarchy DAC

1. Data Builder > New Data Access Control
2. Select "Hierarchy"
3. Reference hierarchy view
4. Configure permissions
5. Deploy

### Hierarchy Configuration

**Hierarchy Reference**:
```yaml
hierarchy:
  view: cost_center_hierarchy
  node_column: cost_center_id
  parent_column: parent_cost_center
```

### Node-Based Permissions

| User | Node | Include Descendants |
|------|------|---------------------|
| user1 | CC1000 | Yes |
| user2 | CC2000 | No |
| user3 | ROOT | Yes |

### Example

**Scenario**: Restrict by organizational hierarchy

**DAC Definition**:
```yaml
type: Hierarchy
hierarchy:
  view: org_hierarchy
  node: org_unit_id
criteria:
  - column: responsible_org_unit
permissions:
  - user: manager_a@company.com
    node: DEPT_A
    descendants: true
  - user: manager_b@company.com
    node: DEPT_B
    descendants: true
```

---

## Hierarchy with Directory Data Access Control

### Overview

Complex hierarchical filtering with directory-based node definitions.

### Creating Hierarchy with Directory DAC

1. Data Builder > New Data Access Control
2. Select "Hierarchy with Directory"
3. Define directory table
4. Configure hierarchy relationship
5. Set permissions
6. Deploy

### Directory Table Structure

**Directory Definition**:
```sql
CREATE TABLE auth_directory (
    node_id VARCHAR(50),
    node_type VARCHAR(20),
    parent_node VARCHAR(50),
    level_number INTEGER
)
```

### Configuration

```yaml
type: Hierarchy with Directory
directory:
  table: auth_directory
  node_column: node_id
  parent_column: parent_node
  type_column: node_type
criteria:
  - column: cost_center
    directory_type: COST_CENTER
```

### Permissions

| User | Node ID | Node Type |
|------|---------|-----------|
| user1 | H_1000 | COST_CENTER |
| user2 | H_2000 | PROFIT_CENTER |

---

## Importing BW Analysis Authorizations

### Overview

Import existing SAP BW or BW/4HANA analysis authorizations.

### Prerequisites

- BW connection configured
- Authorization objects available
- User mapping defined

### Import Process

1. Data Builder > New Data Access Control
2. Select "Import from BW"
3. Choose connection
4. Select authorization objects
5. Map to local objects
6. Deploy

### Supported Objects

**BW Authorization Objects**:
- RSECAUTH (Analysis Authorizations)
- InfoObject restrictions
- Hierarchy authorizations

### Mapping Configuration

```yaml
import:
  connection: bw4hana_prod
  authorization: ZSALES_AUTH
mapping:
  - bw_characteristic: 0COMP_CODE
    local_column: company_code
  - bw_characteristic: 0REGION
    local_column: sales_region
```

---

## Applying Data Access Controls

### Apply to Graphical Views

1. Open graphical view
2. View properties > Security
3. Select data access control
4. Map criteria columns
5. Deploy

### Apply to SQL Views

1. Open SQL view
2. View properties > Security
3. Select data access control
4. Map criteria columns
5. Deploy

### Apply to Analytic Models

1. Open analytic model
2. Model properties > Security
3. Select data access control
4. Map to fact/dimension columns
5. Deploy

### Criteria Mapping

**Mapping Configuration**:
```yaml
data_access_control: region_dac
mappings:
  - dac_criterion: region
    view_column: sales_region
  - dac_criterion: company
    view_column: company_code
```

### Process Source Changes

When source columns change:
1. Open DAC editor
2. Process source changes
3. Update mappings
4. Redeploy

---

## Row-Level Security in Intelligent Applications

### Overview

Apply row-level security to data delivered through intelligent applications.

### Configuration

1. Install intelligent application
2. Configure data access
3. Apply DAC to exposed views
4. Test user access

### Supported Applications

- SAP Analytics Cloud
- Third-party BI tools
- Custom applications

---

## Space Access Control

### Overview

Control user access at the space level.

### Space User Management

**Add Users to Space**:
1. Space > Members
2. Add user
3. Assign role
4. Save

**Space Roles**:
| Role | Permissions |
|------|-------------|
| Space Administrator | Full control |
| Integrator | Data integration |
| Modeler | Create/modify objects |
| Viewer | Read-only access |

### Cross-Space Sharing

**Share Objects**:
1. Select object
2. Share to other spaces
3. Define share permissions
4. Confirm sharing

**Share Permissions**:
- Read: View data
- Read/Write: Modify data
- Full: All operations

---

## Audit Logging

### Overview

Track data access and modifications for compliance.

### Enable Audit Logging

1. Space > Settings
2. Enable audit logging
3. Select audit events
4. Configure retention

### Audited Events

| Event | Description |
|-------|-------------|
| Read | Data access |
| Insert | New records |
| Update | Record changes |
| Delete | Record removal |

### Audit Log Structure

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "user": "analyst@company.com",
  "action": "READ",
  "object": "sales_data_view",
  "rows_affected": 1500,
  "filters": "region='US'"
}
```

### Log Retention

**Configure Retention**:
- Set retention period (days)
- Automatic cleanup
- Archive options

### Viewing Audit Logs

1. System > Monitoring
2. Audit Logs
3. Filter by criteria
4. Export if needed

---

## Best Practices

### DAC Design

- Keep criteria simple
- Use hierarchies for complex org structures
- Test with representative users
- Document authorization model

### Performance

- Index criterion columns
- Limit permission table size
- Use wildcards judiciously
- Monitor query performance

### Maintenance

- Regular permission reviews
- User offboarding process
- Audit log monitoring
- Documentation updates

---

## Documentation Links

- **Data Access Controls**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/a032e51
- **Single Values DAC**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/5246328
- **Hierarchy DAC**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/0afeeed
- **Space Access**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/9d59fe5

---

**Last Updated**: 2025-11-22
