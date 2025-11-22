# Graphical and SQL Views Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Acquiring-Preparing-Modeling-Data

---

## Table of Contents

1. [Graphical Views](#graphical-views)
2. [SQL Views](#sql-views)
3. [Entity-Relationship Models](#entity-relationship-models)
4. [Intelligent Lookups](#intelligent-lookups)
5. [View Operations](#view-operations)
6. [Input Parameters](#input-parameters)
7. [Data Access Controls](#data-access-controls-in-views)
8. [Persistence](#persistence)
9. [Validation and Performance](#validation-and-performance)
10. [SQL Reference](#sql-reference)

---

## Graphical Views

Create views visually using drag-and-drop operations.

### Prerequisites

**Required Scoped Role Privileges**:
| Privilege | Access | Description |
|-----------|--------|-------------|
| Data Warehouse General | `-R------` | System access |
| Data Warehouse Data Builder | `CRUD----` | Create/edit/delete views |
| Space Files | `CRUD----` | Manage space objects |

The **DW Modeler** role template includes these privileges.

### Creating a Graphical View

1. Data Builder > New Graphical View
2. Add source from repository or connection
3. Add transformation nodes
4. Configure output columns
5. Save and deploy

### Output Node Properties

**Required Properties**:
- Business Name (display name)
- Technical Name (immutable after saving)
- Package assignment (immutable after selection)

**Semantic Usage Options**:
| Type | Purpose | Use Case |
|------|---------|----------|
| Fact | Transactional data with measures | Sales, orders |
| Dimension | Master data for categorization | Products, customers |
| Hierarchy | Hierarchical structure | Org chart, geography |
| Text | Language-dependent labels | Translations |
| Relational Dataset | Generic relational data | Any data |
| Analytical Dataset | Analytics-ready (deprecated) | Legacy models |

**Exposure for Consumption**:
- Enable OData, ODBC, JDBC access
- Required for external BI tools
- **Note**: DW Viewer role users can only preview if this is enabled

**Analytical Mode Option**:
- Optimized for analytical queries
- Automatic aggregation behavior

### Key Constraint

**Operator Limitation**: You can only create ONE of each operator type (Filter, Projection, Calculated Columns, Aggregation) per source or join.

### Adding Sources

**Source Types**:
- Local tables
- Remote tables
- Views
- Shared entities

**Source Browser**:
- Browse connections
- Search objects
- Preview data

### Join Operations

**Creating Joins**:
1. Drag second source onto canvas
2. Connect to existing source
3. Select join type
4. Configure join conditions

**Join Types**:
| Type | Result |
|------|--------|
| Inner | Matching rows only |
| Left Outer | All left + matching right |
| Right Outer | All right + matching left |
| Full Outer | All rows from both |
| Cross | Cartesian product |

**Join Conditions**:
```
Table1.customer_id = Table2.customer_id
Table1.year = Table2.fiscal_year AND Table1.month = Table2.period
```

### Union Operations

**Creating Unions**:
1. Add second source
2. Select union operation
3. Map columns between sources

**Union Types**:
- Union All: Include duplicates
- Union: Remove duplicates

### Filter Operations

**Filter Types**:
- Simple filter (column = value)
- Range filter (column BETWEEN x AND y)
- List filter (column IN (a, b, c))
- Pattern filter (column LIKE '%pattern%')

**Filter Syntax**:
```sql
status = 'Active'
amount >= 1000 AND amount <= 10000
region IN ('US', 'EU', 'APAC')
customer_name LIKE 'A%'
created_date IS NOT NULL
```

### Aggregation Operations

**Group By**:
1. Add aggregation node
2. Select grouping columns
3. Configure aggregate functions

**Aggregate Functions**:
| Function | Description |
|----------|-------------|
| SUM | Total of values |
| AVG | Average value |
| MIN | Minimum value |
| MAX | Maximum value |
| COUNT | Row count |
| COUNT DISTINCT | Unique count |

### Column Operations

**Reorder Columns**:
- Drag columns in output panel
- Set column order

**Rename Columns**:
- Click column name
- Enter new business name

**Exclude Columns**:
- Uncheck columns in output panel
- Hidden from downstream

### Calculated Columns

**Creating Calculated Columns**:
1. Add calculated column
2. Enter expression
3. Set data type
4. Name column

**Expression Types**:
- Arithmetic: `price * quantity`
- String: `CONCAT(first_name, ' ', last_name)`
- Conditional: `CASE WHEN status = 'A' THEN 'Active' ELSE 'Inactive' END`
- Date: `YEAR(order_date)`

### Conversion Columns

**Currency Conversion**:
1. Add currency conversion column
2. Select source amount column
3. Select source currency column
4. Configure target currency
5. Set exchange rate type

**Unit Conversion**:
1. Add unit conversion column
2. Select source quantity column
3. Select source unit column
4. Configure target unit

**Geo Coordinates**:
1. Add geo coordinates column
2. Select latitude/longitude columns
3. Configure coordinate system

### Replacing Sources

**Replace Source**:
1. Select source node
2. Choose "Replace"
3. Select new source
4. Remap columns

**Process Source Changes**:
- Detect schema changes
- Update mappings
- Handle removed columns

---

## SQL Views

Create views using SQL or SQLScript.

### Creating an SQL View

1. Data Builder > New SQL View
2. Write SQL statement
3. Validate syntax
4. Save and deploy

### Basic SQL View

```sql
SELECT
    customer_id,
    customer_name,
    region,
    country
FROM customers
WHERE active = 'Y'
```

### SQL View with Joins

```sql
SELECT
    o.order_id,
    o.order_date,
    c.customer_name,
    p.product_name,
    ol.quantity,
    ol.unit_price
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_lines ol ON o.order_id = ol.order_id
INNER JOIN products p ON ol.product_id = p.product_id
```

### SQL View with Aggregation

```sql
SELECT
    customer_id,
    YEAR(order_date) AS order_year,
    COUNT(*) AS order_count,
    SUM(order_amount) AS total_amount,
    AVG(order_amount) AS avg_amount
FROM orders
GROUP BY customer_id, YEAR(order_date)
```

### SQLScript Views

**Table Variables**:
```sql
DO BEGIN
    lt_customers = SELECT * FROM customers WHERE region = 'US';
    lt_orders = SELECT * FROM orders WHERE customer_id IN (SELECT customer_id FROM :lt_customers);

    SELECT * FROM :lt_orders;
END;
```

**Control Flow**:
```sql
DO BEGIN
    DECLARE lv_year INTEGER := YEAR(CURRENT_DATE);

    IF :lv_year > 2024 THEN
        SELECT * FROM orders WHERE order_year = :lv_year;
    ELSE
        SELECT * FROM archive_orders WHERE order_year = :lv_year;
    END IF;
END;
```

### Input Parameters in SQL Views

**Parameter Definition**:
```sql
-- Input parameter: IP_REGION (String)
SELECT *
FROM customers
WHERE region = :IP_REGION
```

**Multiple Parameters**:
```sql
-- IP_START_DATE (Date), IP_END_DATE (Date), IP_REGION (String)
SELECT *
FROM orders
WHERE order_date BETWEEN :IP_START_DATE AND :IP_END_DATE
    AND region = :IP_REGION
```

---

## Entity-Relationship Models

Visual data modeling with entities and associations.

### Creating an E-R Model

1. Data Builder > New E-R Model
2. Add entities (tables/views)
3. Create associations
4. Save and deploy

### Adding Entities

**Create Table**:
- Define columns
- Set primary key
- Configure properties

**Create View**:
- Define SELECT statement
- Configure output

**Add Existing**:
- Drag from repository
- Reference existing objects

### Creating Associations

1. Select source entity
2. Draw line to target entity
3. Configure join columns
4. Set cardinality

**Association Properties**:
| Property | Options |
|----------|---------|
| Cardinality | 1:1, 1:n, n:1, n:m |
| Join Type | Inner, Left Outer |
| Semantic | Reference, Composition |

### Adding Related Entities

**Discover Related**:
- Analyze existing associations
- Suggest related entities
- Auto-create associations

---

## Intelligent Lookups

Match and enrich data using fuzzy logic.

### Creating an Intelligent Lookup

1. Data Builder > New Intelligent Lookup
2. Add input entity
3. Add lookup entity
4. Configure match rules
5. Define output

### Match Rule Types

**Exact Match**:
```yaml
rule: exact_customer_id
input_column: customer_id
lookup_column: customer_key
match_type: exact
```

**Fuzzy Match**:
```yaml
rule: fuzzy_company_name
input_column: company_name
lookup_column: organization_name
match_type: fuzzy
threshold: 0.8
```

### Fuzzy Match Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| Threshold | Match score (0-1) | 0.8 |
| Algorithm | Matching algorithm | Levenshtein |
| Case Sensitive | Match case | No |

### Processing Results

**Matched Results**:
- Single match: Auto-assign
- Multiple matches: Review/select
- No match: Manual assignment

**Unmatched Results**:
- Create new lookup records
- Manual matching
- Skip records

### Multi-Rule Lookups

Combine multiple rules:
1. Exact match on ID
2. Fuzzy match on name
3. Location-based match

**Example: Address Enrichment**
```yaml
rules:
  - exact: postal_code
  - fuzzy: street_name (0.85)
  - fuzzy: city_name (0.9)
```

---

## View Operations

### Saving and Deploying

**Save**: Store definition
**Deploy**: Activate for use

**Deployment Validation**:
- Syntax check
- Dependency check
- Semantic validation

### Object Dependencies

**View Dependencies**:
```
View A (deployed)
  └── View B (requires A)
       └── View C (requires B)
```

**Impact Analysis**:
- Find dependent objects
- Assess change impact
- Plan modifications

### Lineage Analysis

**Column Lineage**:
- Track column origins
- Understand transformations
- Document data flow

**Impact Lineage**:
- Identify downstream impact
- Plan changes safely

### Version Management

**Version History**:
- View all versions
- Compare versions
- Restore previous version

---

## Input Parameters

Runtime parameters for dynamic filtering.

### Creating Input Parameters

1. Open view properties
2. Add input parameter
3. Configure type and default
4. Use in filter/expression

### Parameter Types

| Type | Use Case | Example |
|------|----------|---------|
| String | Text filtering | Region code |
| Integer | Numeric filtering | Year |
| Date | Date filtering | Start date |
| Timestamp | DateTime filtering | As-of timestamp |

### Parameter Usage

**In Filters**:
```sql
WHERE region = :IP_REGION
```

**In Expressions**:
```sql
CASE WHEN year = :IP_YEAR THEN 'Current' ELSE 'Historical' END
```

**Default Values**:
```yaml
parameter: IP_YEAR
type: Integer
default: YEAR(CURRENT_DATE)
```

---

## Data Access Controls in Views

Apply row-level security to views.

### Applying Data Access Control

1. Open view properties
2. Select "Data Access Control"
3. Choose DAC object
4. Map columns
5. Deploy

### DAC Integration

**Criteria Mapping**:
```yaml
view_column: region
dac_criteria: user_region
```

**Multiple Criteria**:
```yaml
mappings:
  - region: user_region
  - company_code: user_company
```

---

## Persistence

Store view results for improved performance.

### Enabling Persistence

1. Open view properties
2. Enable persistence
3. Configure refresh schedule
4. Deploy

### Persistence Options

| Option | Description |
|--------|-------------|
| Scheduled | Refresh at intervals |
| On-Demand | Manual refresh |
| Delta | Incremental refresh |

### Partitioning Persisted Views

**Partition by Date**:
```yaml
partition_column: order_date
partition_type: range
partition_function: monthly
```

---

## Validation and Performance

### Validating View Data

**Data Preview**:
- View sample data
- Check row counts
- Verify calculations

**Validation Rules**:
- Data type checks
- Null checks
- Business rules

### Analyzing View Performance

**Performance Analysis**:
- Execution time
- Row counts
- Resource usage

**Optimization Tips**:
- Filter early
- Minimize joins
- Use appropriate indexes
- Consider persistence

---

## SQL Reference

### Common SQL Functions

**String Functions**:
| Function | Example |
|----------|---------|
| CONCAT | CONCAT(a, b) |
| SUBSTRING | SUBSTRING(s, 1, 5) |
| UPPER/LOWER | UPPER(name) |
| TRIM | TRIM(text) |
| LENGTH | LENGTH(string) |
| REPLACE | REPLACE(s, 'old', 'new') |

**Numeric Functions**:
| Function | Example |
|----------|---------|
| ROUND | ROUND(num, 2) |
| FLOOR/CEIL | FLOOR(num) |
| ABS | ABS(value) |
| MOD | MOD(a, b) |
| POWER | POWER(base, exp) |

**Date Functions**:
| Function | Example |
|----------|---------|
| YEAR | YEAR(date) |
| MONTH | MONTH(date) |
| DAY | DAY(date) |
| ADD_DAYS | ADD_DAYS(date, 7) |
| DATEDIFF | DATEDIFF(d1, d2) |
| CURRENT_DATE | CURRENT_DATE |

**Conversion Functions**:
| Function | Example |
|----------|---------|
| CAST | CAST(num AS VARCHAR) |
| TO_DATE | TO_DATE(str, 'YYYY-MM-DD') |
| TO_DECIMAL | TO_DECIMAL(str, 10, 2) |

### Window Functions

```sql
-- Row number
ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)

-- Running total
SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date)

-- Rank
RANK() OVER (PARTITION BY region ORDER BY sales DESC)
```

---

## Documentation Links

- **Graphical Views**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/27efb47
- **SQL Views**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/81920e4
- **E-R Models**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/a91c042
- **Intelligent Lookups**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/8f29f80
- **SQL Reference**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/6a37cc5

---

**Last Updated**: 2025-11-22
