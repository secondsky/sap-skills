# Structured Data Operators Guide

Complete guide for structured data processing in SAP Data Intelligence.

## Table of Contents

1. [Overview](#overview)
2. [Data Transform Operator](#data-transform-operator)
3. [Projection Node](#projection-node)
4. [Aggregation Node](#aggregation-node)
5. [Join Node](#join-node)
6. [Union Node](#union-node)
7. [Case Node](#case-node)
8. [Consumer Operators](#consumer-operators)
9. [Producer Operators](#producer-operators)
10. [Resiliency](#resiliency)

---

## Overview

Structured data operators provide SQL-like data processing capabilities with visual configuration.

**Key Components:**
- **Data Transform**: Visual SQL editor for transformations
- **Consumer Operators**: Read structured data from sources
- **Producer Operators**: Write structured data to targets

**Supported Formats:**
- CSV, Parquet, ORC, JSON (files)
- Database tables (HANA, SQL databases)
- SAP applications (S/4HANA, BW)

---

## Data Transform Operator

The Data Transform operator provides a visual editor for creating SQL-like transformations.

### Custom Editor Features

**Visual Designer:**
- Drag-and-drop node creation
- Visual connection of data flows
- Schema preview at each node

**Available Nodes:**
- Source: Input data connection
- Target: Output data connection
- Projection: Column operations
- Aggregation: GROUP BY operations
- Join: Combine datasets
- Union: Merge datasets
- Case: Conditional logic
- Filter: Row filtering

### Creating a Data Transform

1. Add Data Transform operator to graph
2. Open Custom Editor
3. Add Source node (connect to input port)
4. Add transformation nodes
5. Add Target node (connect to output port)
6. Configure each node
7. Validate and close editor

### Best Practices

- Use meaningful node names
- Preview data at each step
- Optimize join order for performance
- Use filters early to reduce data volume

---

## Projection Node

The Projection node performs column-level operations.

### Capabilities

**Column Selection:**
- Include/exclude columns
- Rename columns
- Reorder columns

**Column Transformation:**
- Apply expressions
- Use DTL functions
- Create calculated columns

### Configuration

```
Source Columns:
  - CUSTOMER_ID (include)
  - CUSTOMER_NAME (include, rename to NAME)
  - INTERNAL_CODE (exclude)

Calculated Columns:
  - FULL_NAME: CONCAT(FIRST_NAME, ' ', LAST_NAME)
  - ORDER_YEAR: YEAR(ORDER_DATE)
```

### Expression Examples

```sql
-- String concatenation
CONCAT(FIRST_NAME, ' ', LAST_NAME)

-- Conditional value
CASE WHEN AMOUNT > 1000 THEN 'High' ELSE 'Low' END

-- Date extraction
YEAR(ORDER_DATE)

-- Null handling
COALESCE(DISCOUNT, 0)

-- Type conversion
TO_DECIMAL(QUANTITY * PRICE, 15, 2)
```

---

## Aggregation Node

The Aggregation node performs GROUP BY operations with aggregate functions.

### Aggregate Functions

| Function | Description |
|----------|-------------|
| COUNT | Count rows |
| COUNT_DISTINCT | Count unique values |
| SUM | Sum of values |
| AVG | Average of values |
| MIN | Minimum value |
| MAX | Maximum value |
| FIRST | First value |
| LAST | Last value |

### Configuration

```
Group By Columns:
  - REGION
  - PRODUCT_CATEGORY

Aggregations:
  - TOTAL_SALES: SUM(SALES_AMOUNT)
  - ORDER_COUNT: COUNT(ORDER_ID)
  - AVG_ORDER: AVG(SALES_AMOUNT)
  - FIRST_ORDER: MIN(ORDER_DATE)
  - LAST_ORDER: MAX(ORDER_DATE)
```

### Example Output Schema

```
Input:
  ORDER_ID, REGION, PRODUCT_CATEGORY, SALES_AMOUNT, ORDER_DATE

Output:
  REGION, PRODUCT_CATEGORY, TOTAL_SALES, ORDER_COUNT, AVG_ORDER, FIRST_ORDER, LAST_ORDER
```

---

## Join Node

The Join node combines data from multiple sources.

### Join Types

| Type | Description |
|------|-------------|
| INNER | Only matching rows |
| LEFT | All left + matching right |
| RIGHT | All right + matching left |
| FULL | All rows from both sides |

### Configuration

```
Join Type: LEFT
Left Source: ORDERS
Right Source: CUSTOMERS

Join Conditions:
  - ORDERS.CUSTOMER_ID = CUSTOMERS.ID
  - ORDERS.REGION = CUSTOMERS.REGION (optional)
```

### Design Considerations

**Performance Tips:**
- Put smaller table on right side for LEFT joins
- Use indexed columns in join conditions
- Filter data before joining when possible
- Avoid Cartesian products (missing join condition)

**Multiple Joins:**
- Chain Join nodes for 3+ sources
- Consider join order for performance
- Validate intermediate results

### Handling Duplicates

```
Scenario: Customer has multiple orders
Solution: Aggregate before or after join depending on requirement
```

---

## Union Node

The Union node combines rows from multiple sources.

### Union Types

| Type | Description |
|------|-------------|
| UNION ALL | Include all rows (with duplicates) |
| UNION | Include distinct rows only |

### Configuration

```
Union Type: UNION ALL

Sources:
  - ORDERS_2023
  - ORDERS_2024

Column Mapping:
  - ORDER_ID -> ORDER_ID
  - CUSTOMER -> CUSTOMER_ID (rename)
  - AMOUNT -> SALES_AMOUNT (rename)
```

### Requirements

- Same number of columns from each source
- Compatible data types
- Column mapping for different names

### Adding Source Identifier

Use a calculated column to track data origin:

```sql
-- In source 1 projection
'2023' AS DATA_YEAR

-- In source 2 projection
'2024' AS DATA_YEAR
```

---

## Case Node

The Case node applies conditional logic to route or transform data.

### Conditional Expressions

```sql
CASE
  WHEN ORDER_TYPE = 'SALES' THEN 'Revenue'
  WHEN ORDER_TYPE = 'RETURN' THEN 'Refund'
  ELSE 'Other'
END AS TRANSACTION_TYPE
```

### Routing Data

Configure multiple output ports based on conditions:

```
Condition 1: REGION = 'EMEA' -> Output Port 1
Condition 2: REGION = 'APAC' -> Output Port 2
Default: -> Output Port 3
```

### Nested Conditions

```sql
CASE
  WHEN AMOUNT > 10000 THEN
    CASE
      WHEN CUSTOMER_TYPE = 'VIP' THEN 'Priority High'
      ELSE 'Priority Medium'
    END
  ELSE 'Priority Low'
END AS PRIORITY
```

---

## Consumer Operators

Operators that read structured data from sources.

### Structured File Consumer

Reads from file storage (S3, Azure, GCS, HDFS, local).

**Supported Formats:**
- CSV (with header options)
- Parquet
- ORC
- JSON (JSON Lines format)

**Configuration:**
```
Connection: S3 Connection
Source: s3://bucket/path/*.parquet
Format: Parquet
Schema: Auto-detect or manual
Partition Pruning: date_column > '2024-01-01'
```

**Excel Support:**
- Read Excel files (.xlsx)
- Specify sheet name
- Define header row

### Structured SQL Consumer

Reads from SQL databases.

**Configuration:**
```
Connection: HANA Connection
Table/View: SALES_DATA
Columns: Select columns
Filter: WHERE clause
```

### SAP Application Consumer

Reads from SAP applications via OData or RFC.

**Configuration:**
```
Connection: S/4HANA Connection
Entity: A_SalesOrder
Select: OrderID, CustomerID, NetAmount
Filter: $filter=CreationDate gt '2024-01-01'
```

---

## Producer Operators

Operators that write structured data to targets.

### Structured File Producer

Writes to file storage.

**Configuration:**
```
Connection: S3 Connection
Target: s3://bucket/output/
Format: Parquet
Partition Columns: YEAR, MONTH
Compression: SNAPPY
```

**Partitioning Strategies:**
- By column values (e.g., year, region)
- By time (hourly, daily)
- By size (max rows per file)

### Structured Table Producer

Writes to database tables.

**Write Modes:**
- INSERT: Add new rows
- UPSERT: Insert or update
- DELETE: Remove matching rows
- TRUNCATE_INSERT: Clear and reload

**Configuration:**
```
Connection: HANA Connection
Table: TARGET_TABLE
Mode: UPSERT
Key Columns: ID, DATE
Batch Size: 10000
```

### SAP Application Producer

Writes to SAP applications.

**Configuration:**
```
Connection: S/4HANA Connection
Entity: A_SalesOrder
Operation: POST (create) / PATCH (update)
```

---

## Resiliency

Structured data operators support resiliency features for reliable processing.

### Checkpoint Configuration

```
Enable Checkpointing: Yes
Checkpoint Interval: 60 seconds
Checkpoint Location: /checkpoint/path
```

### Recovery Behavior

**On Failure:**
1. Graph stops at failure point
2. State saved to checkpoint
3. Manual or auto restart
4. Resume from last checkpoint

### Best Practices

- Enable checkpointing for long-running jobs
- Use appropriate checkpoint intervals
- Store checkpoints on reliable storage
- Monitor checkpoint sizes

### Exactly-Once Processing

For exactly-once semantics:
- Use UPSERT to database targets
- Enable deduplication for file targets
- Implement idempotent transformations

---

## Example: End-to-End Pipeline

```
[Structured File Consumer] -> [Data Transform] -> [Structured Table Producer]
       (CSV files)              |                      (HANA table)
                                |
                    [Projection] - Select columns
                                |
                    [Join] - Enrich with master data
                                |
                    [Aggregation] - Summarize by region
                                |
                    [Case] - Apply business rules
```

---

## Documentation Links

- **Structured Data Operators**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide/working-with-structureddata-operators
- **Data Transform**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/blob/main/docs/modelingguide/working-with-structureddata-operators/data-transform-8fe8c02.md

---

**Last Updated**: 2025-11-22
