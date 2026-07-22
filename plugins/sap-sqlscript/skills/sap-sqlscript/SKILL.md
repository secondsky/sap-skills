---
name: sap-sqlscript
description: |
  This skill should be used when the user asks to "write a SQLScript procedure", "create HANA stored procedure", "implement AMDP method", "optimize SQLScript performance", "handle SQLScript exceptions", "debug HANA procedure", "create table function", "inspect a browser-based Datasphere SQL editor with Microsoft Edge CDP", or mentions SQLScript, SAP HANA procedures, AMDP, EXIT HANDLER, or code-to-data paradigm.

  Comprehensive SQLScript development guidance for SAP HANA database programming including syntax patterns, built-in functions, exception handling, performance optimization, cursor management, and ABAP Managed Database Procedure (AMDP) integration.
license: GPL-3.0
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.4.0"
  last_verified: "2026-05-31"
  production_tested: "No; documentation and community references only, no live HANA runtime evidence"
  sap_hana_version: "2.0 SPS08"
  hana_cloud_version: "QRC 1/2026"
  errors_prevented: 15
---

# SAP SQLScript Development Guide

## When to Use This Skill

Use this skill when writing SQLScript procedures, anonymous blocks, table/scalar functions, AMDP methods, exception handlers, cursor logic, bulk operations, or HANA performance-sensitive database logic that should run close to the data.

For browser-based Datasphere or HANA Cloud SQL editor triage, use `sap-browser-automation` for manual in-app authentication, consent-gated Edge profile reuse, fresh Edge/CDP startup, auth-state bootstrap, and recovery. Load local `references/edge-cdp-control.md` for SQLScript-specific boundaries. Use CDP only for local UI inspection, console diagnostics, deployment messages, and approved screenshots; default database validation still belongs in SQL/HANA tooling.

## Overview

SQLScript is SAP HANA's procedural extension to SQL, enabling complex data-intensive logic execution directly within the database layer. It follows the **code-to-data paradigm**, pushing computation to where data resides rather than moving data to the application layer.

### Key Characteristics
- **Case-insensitive** language
- All statements end with **semicolons**
- Variables use **colon prefix** when referenced (`:variableName`)
- **No colon** when assigning values
- Use `DUMMY` table for single-row operations

### Two Logic Types

| Type | Description | Execution |
|------|-------------|-----------|
| **Declarative** | Pure SQL sequences | Converted to data flow graphs, processed in parallel |
| **Imperative** | Control structures (IF, WHILE, FOR) | Processed sequentially, prevents parallel execution |

---

## Table of Contents

- [Overview](#overview)
- [Container Types](#container-types)
  - [Anonymous Blocks](#1-anonymous-blocks)
  - [Stored Procedures](#2-stored-procedures)
  - [User-Defined Functions](#3-user-defined-functions)
- [Data Types](#data-types)
- [Variable Declaration](#variable-declaration)
- [Control Structures](#control-structures)
- [Table Types](#table-types)
- [Cursors](#cursors)
- [Exception Handling](#exception-handling)
- [AMDP Integration](#amdp-integration)
- [Performance Best Practices](#performance-best-practices)
- [System Limits](#system-limits)
- [Debugging Tools](#debugging-tools)
- [Quick Reference](#quick-reference)
- [Additional Resources](#additional-resources)

---

## Container Types

### 1. Anonymous Blocks
Single-use logic not stored in the database. Useful for testing and ad-hoc execution.

```sql
DO [(<parameter_clause>)]
BEGIN [SEQUENTIAL EXECUTION]
  <body>
END;
```

**Example:**
```sql
DO
BEGIN
  DECLARE lv_count INTEGER;
  SELECT COUNT(*) INTO lv_count FROM "MYTABLE";
  SELECT :lv_count AS record_count FROM DUMMY;
END;
```

### 2. Stored Procedures
Reusable database objects with input/output parameters.

```sql
CREATE [OR REPLACE] PROCEDURE <procedure_name>
  (
    [IN <param> <datatype>],
    [OUT <param> <datatype>],
    [INOUT <param> <datatype>]
  )
  LANGUAGE SQLSCRIPT
  [SQL SECURITY {DEFINER | INVOKER}]
  [DEFAULT SCHEMA <schema_name>]
  [READS SQL DATA | READS SQL DATA WITH RESULT VIEW <view_name>]
AS
BEGIN
  <procedure_body>
END;
```

### 3. User-Defined Functions

**Scalar UDF** - Returns single value:
```sql
CREATE FUNCTION <function_name> (<input_parameters>)
RETURNS <scalar_type>
LANGUAGE SQLSCRIPT
AS
BEGIN
  <function_body>
  RETURN <value>;
END;
```

**Table UDF** - Returns table (read-only):
```sql
CREATE FUNCTION <function_name> (<input_parameters>)
RETURNS TABLE (<column_definitions>)
LANGUAGE SQLSCRIPT
READS SQL DATA
AS
BEGIN
  RETURN SELECT ... FROM ...;
END;
```

---

## Data Types

SQLScript supports comprehensive data types for different use cases. See `references/data-types.md` for complete documentation including:
- Numeric types (TINYINT, INTEGER, DECIMAL, etc.)
- Character types (VARCHAR, NVARCHAR, CLOB, etc.)
- Date/Time types (DATE, TIME, TIMESTAMP, SECONDDATE)
- Binary types (VARBINARY, BLOB)
- Type conversion functions (CAST, TO_ functions)
- NULL handling patterns

---

## Variable Declaration

### Scalar Variables
```sql
DECLARE <variable_name> <datatype> [:= <initial_value>];

-- Examples
DECLARE lv_name NVARCHAR(100);
DECLARE lv_count INTEGER := 0;
DECLARE lv_date DATE := CURRENT_DATE;
```

> **Note:** Uninitialized variables default to NULL.

### Table Variables

**Implicit declaration:**
```sql
lt_result = SELECT * FROM "MYTABLE" WHERE status = 'A';
```

**Explicit declaration:**
```sql
DECLARE lt_data TABLE (
  id INTEGER,
  name NVARCHAR(100),
  amount DECIMAL(15,2)
);
```

**Using TABLE LIKE:**
```sql
DECLARE lt_copy TABLE LIKE :lt_original;
```

### Arrays
```sql
DECLARE arr INTEGER ARRAY := ARRAY(1, 2, 3, 4, 5);
-- Access: arr[1], arr[2], etc. (1-based index)
-- Note: Arrays cannot be returned from procedures
```

---

## Control Structures

### IF-ELSE Statement
```sql
IF <condition1> THEN
  <statements>
[ELSEIF <condition2> THEN
  <statements>]
[ELSE
  <statements>]
END IF;
```

**Comparison Operators:**
| Operator | Meaning |
|----------|---------|
| `=` | Equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |
| `!=`, `<>` | Not equal |

> **Important:** IF-ELSE cannot be used within SELECT statements. Use CASE WHEN instead.

### WHILE Loop
```sql
WHILE <condition> DO
  <statements>
END WHILE;
```

### FOR Loop
```sql
-- Numeric range
FOR i IN 1..10 DO
  <statements>
END FOR;

-- Reverse
FOR i IN REVERSE 10..1 DO
  <statements>
END FOR;

-- Cursor iteration
FOR row AS <cursor_name> DO
  <statements using row.column_name>
END FOR;
```

### LOOP with EXIT
```sql
LOOP
  <statements>
  IF <condition> THEN
    BREAK;
  END IF;
END LOOP;
```

---

## Table Types

Define reusable table structures:

```sql
CREATE TYPE <type_name> AS TABLE (
  <column1> <datatype>,
  <column2> <datatype>,
  ...
);
```

**Usage in procedures:**
```sql
CREATE PROCEDURE get_employees (OUT et_result MY_TABLE_TYPE)
LANGUAGE SQLSCRIPT AS
BEGIN
  et_result = SELECT * FROM "EMPLOYEES";
END;
```

---

## Cursors

Cursors handle result sets row by row. Pattern: **Declare → Open → Fetch → Close**

> **Performance Note:** Cursors bypass the database optimizer and process rows sequentially. Use primarily with primary key-based queries. Prefer set-based operations when possible.

```sql
DECLARE CURSOR <cursor_name> FOR
  SELECT <columns> FROM <table> [WHERE <condition>];

OPEN <cursor_name>;

FETCH <cursor_name> INTO <variables>;

CLOSE <cursor_name>;
```

**Complete Example:**
```sql
DO
BEGIN
  DECLARE lv_id INTEGER;
  DECLARE lv_name NVARCHAR(100);
  DECLARE CURSOR cur_employees FOR
    SELECT id, name FROM "EMPLOYEES" WHERE dept = 'IT';

  OPEN cur_employees;
  FETCH cur_employees INTO lv_id, lv_name;
  WHILE NOT cur_employees::NOTFOUND DO
    -- Process row
    SELECT :lv_id, :lv_name FROM DUMMY;
    FETCH cur_employees INTO lv_id, lv_name;
  END WHILE;
  CLOSE cur_employees;
END;
```

**FOR Loop Alternative:**
```sql
FOR row AS cur_employees DO
  SELECT row.id, row.name FROM DUMMY;
END FOR;
```

---

## Exception Handling

### EXIT HANDLER
Suspends execution and performs cleanup when exceptions occur.

```sql
DECLARE EXIT HANDLER FOR <condition_value>
  <statement>;
```

**Condition values:**
- `SQLEXCEPTION` - Any SQL exception
- `SQL_ERROR_CODE <number>` - Specific error code

**Access error details:**
- `::SQL_ERROR_CODE` - Numeric error code
- `::SQL_ERROR_MESSAGE` - Error message text

**Example:**
```sql
CREATE PROCEDURE safe_insert (IN iv_id INTEGER, IN iv_name NVARCHAR(100))
LANGUAGE SQLSCRIPT AS
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    SELECT ::SQL_ERROR_CODE AS err_code,
           ::SQL_ERROR_MESSAGE AS err_msg FROM DUMMY;
  END;

  INSERT INTO "MYTABLE" VALUES (:iv_id, :iv_name);
END;
```

### CONDITION
Associate user-defined names with error codes:

```sql
DECLARE <condition_name> CONDITION FOR SQL_ERROR_CODE <number>;

-- Example
DECLARE duplicate_key CONDITION FOR SQL_ERROR_CODE 301;
DECLARE EXIT HANDLER FOR duplicate_key
  SELECT 'Duplicate key error' FROM DUMMY;
```

### SIGNAL and RESIGNAL
Throw user-defined exceptions (codes 10000-19999):

```sql
-- Throw exception
SIGNAL <condition_name> SET MESSAGE_TEXT = '<message>';

-- Re-throw in handler
RESIGNAL [<condition_name>] [SET MESSAGE_TEXT = '<message>'];
```

**Common Error Codes:**
| Code | Description |
|------|-------------|
| 301 | Unique constraint violation |
| 1299 | No data found |

---

## AMDP Integration

ABAP Managed Database Procedures allow SQLScript within ABAP classes.

### Class Definition
```abap
CLASS zcl_my_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.  " Required interface

    TYPES: BEGIN OF ty_result,
             id   TYPE i,
             name TYPE string,
           END OF ty_result,
           tt_result TYPE STANDARD TABLE OF ty_result.

    CLASS-METHODS: get_data
      IMPORTING VALUE(iv_filter) TYPE string
      EXPORTING VALUE(et_result) TYPE tt_result.
ENDCLASS.
```

### Method Implementation
```abap
CLASS zcl_my_amdp IMPLEMENTATION.
  METHOD get_data BY DATABASE PROCEDURE
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING ztable.

    et_result = SELECT id, name
                FROM ztable
                WHERE category = :iv_filter;
  ENDMETHOD.
ENDCLASS.
```

### AMDP Restrictions
- Parameters must be **pass-by-value** (no RETURNING)
- Only **scalar types, structures, internal tables** allowed
- No nested tables or deep structures
- **COMMIT/ROLLBACK** not permitted
- Must use **Eclipse ADT** for development
- Auto-created on first invocation

---

## Performance Best Practices

### 1. Reduce Data Volume Early
```sql
-- Good: Filter and project early
lt_filtered = SELECT col1, col2 FROM "BIGTABLE" WHERE status = 'A';
lt_result = SELECT a.col1, b.name
            FROM :lt_filtered AS a
            JOIN "LOOKUP" AS b ON a.id = b.id;

-- Bad: Join then filter
lt_result = SELECT a.col1, b.name
            FROM "BIGTABLE" AS a
            JOIN "LOOKUP" AS b ON a.id = b.id
            WHERE a.status = 'A';
```

### 2. Prefer Declarative Over Imperative
```sql
-- Good: Set-based operation
lt_result = SELECT id, amount * 1.1 AS new_amount FROM "ORDERS";

-- Bad: Row-by-row processing
FOR row AS cur_orders DO
  UPDATE "ORDERS" SET amount = row.amount * 1.1 WHERE id = row.id;
END FOR;
```

### 3. Avoid Engine Mixing
- Don't mix Row Store and Column Store tables in same query
- Avoid Calculation Engine functions with pure SQL
- Use consistent storage types

### 4. Use UNION ALL Instead of UNION
```sql
-- Faster when duplicates impossible or acceptable
SELECT * FROM table1 UNION ALL SELECT * FROM table2;

-- Slower: removes duplicates
SELECT * FROM table1 UNION SELECT * FROM table2;
```

### 5. Avoid Dynamic SQL
```sql
-- Bad: Re-optimized each execution
EXECUTE IMMEDIATE 'SELECT * FROM ' || :lv_table;

-- Good: Static SQL with parameters
SELECT * FROM "MYTABLE" WHERE id = :lv_id;
```

### 6. Position Imperative Logic Last
Place control structures at the end of procedures to maximize parallel processing of declarative statements.

---

## System Limits

| Limit | Value |
|-------|-------|
| Table locks per transaction | 16,383 |
| Tables in a statement | 4,095 |
| SQL statement length | 2 GB |
| Procedure size | Bounded by SQL statement length (2 GB) |

> **Note:** Actual limits may vary by HANA version. Consult SAP documentation for version-specific limits.

---

## Debugging Tools

- **SQLScript Debugger** - SAP Web IDE / Business Application Studio
- **Plan Visualizer** - Analyze execution plans
- **Expensive Statement Trace** - Identify bottlenecks
- **SQL Analyzer** - Query optimization recommendations

---

## Quick Reference

### String Concatenation
```sql
lv_result = lv_str1 || ' ' || lv_str2;
```

### NULL Handling
```sql
COALESCE(value, default_value)
IFNULL(value, default_value)
NULLIF(value1, value2)
```

### Date Operations
```sql
ADD_DAYS(date, n)
ADD_MONTHS(date, n)
DAYS_BETWEEN(date1, date2)
CURRENT_DATE
CURRENT_TIMESTAMP
```

### Type Conversion
```sql
CAST(value AS datatype)
TO_VARCHAR(value)
TO_INTEGER(value)
TO_DATE(string, 'YYYY-MM-DD')
TO_TIMESTAMP(string, 'YYYY-MM-DD HH24:MI:SS')
```

---

## Related Skills

For comprehensive SAP development, combine this skill with:

| Skill | Use Case |
|-------|----------|
| **sap-abap** | ABAP programming patterns for AMDP context |
| **sap-abap-cds** | CDS views that consume SQLScript procedures |
| **sap-cap-capire** | CAP framework database procedures integration |
| **sap-hana-cli** | HANA CLI for procedure deployment and testing |
| **sap-btp-cloud-platform** | BTP deployment of HANA artifacts |

---

## Bundled Resources

### Reference Documentation
- `references/skill-reference-guide.md` - **Index of all references with quick navigation**
- `references/glossary.md` - **SQLScript terminology and concepts**
- `references/syntax-reference.md` - Complete SQLScript syntax reference
- `references/built-in-functions.md` - Built-in functions catalog
- `references/data-types.md` - Data types and conversion
- `references/exception-handling.md` - Exception handling patterns
- `references/amdp-integration.md` - AMDP integration patterns
- `references/performance-guide.md` - Optimization techniques
- `references/advanced-features.md` - Lateral joins, JSON, query hints, currency conversion
- `references/troubleshooting.md` - Common errors and solutions
- `references/edge-cdp-control.md` - SQLScript-specific add-on for the shared `sap-browser-automation` Edge/CDP and authentication layer

### Production-Ready Templates
Copy and customize these templates for common patterns:
- `templates/simple-procedure.sql` - Basic stored procedure with error handling
- `templates/procedure-with-error-handling.sql` - Comprehensive error handling patterns
- `templates/table-function.sql` - Table UDF with validation
- `templates/scalar-function.sql` - Scalar UDF examples
- `templates/amdp-class.abap` - Complete AMDP class boilerplate
- `templates/amdp-procedure.sql` - AMDP implementation template
- `templates/cursor-iteration.sql` - Cursor patterns (classic and FOR loop)
- `templates/bulk-operations.sql` - High-performance bulk operations

### Specialized Agents
- **sqlscript-analyzer** - Analyze code for performance issues and best practices
- **procedure-generator** - Generate procedures interactively from requirements
- **amdp-helper** - Assist with AMDP class creation and debugging

### Slash Commands
- `/sqlscript-validate` - Validate code with auto-fix capability
- `/sqlscript-optimize` - Performance analysis and optimization suggestions
- `/sqlscript-convert` - Convert between standalone and AMDP formats

### Validation Hooks
Automatic code quality checks on Write/Edit operations:
- Error handling completeness
- Security vulnerabilities
- Performance anti-patterns
- Naming conventions
- AMDP compliance
