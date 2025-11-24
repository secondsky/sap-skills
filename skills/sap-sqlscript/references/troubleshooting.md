# SQLScript Troubleshooting Guide

## Common Errors and Solutions

### Syntax Errors

#### Error: "feature not supported: Scalar UDF does not support SQL statements"

**Cause:** Attempting to use SELECT or other SQL statements in scalar UDF. This restriction applies to HANA versions prior to 2.0 SPS05. Starting with HANA 2.0 SPS05+, scalar UDFs support SQL statements including SELECT.

**Version Support:**
- HANA 1.0 / 2.0 (prior to SPS05): SQL statements NOT supported in Scalar UDF
- HANA 2.0 SPS05+: SQL statements supported in Scalar UDF

**Solution:**
```sql
-- Option 1: Use Table UDF instead
CREATE FUNCTION get_value (iv_id INTEGER)
RETURNS TABLE (result_value INTEGER)
LANGUAGE SQLSCRIPT AS
BEGIN
  RETURN SELECT value AS result_value FROM "TABLE" WHERE id = :iv_id;
END;

-- Option 2: Use expressions only in Scalar UDF
CREATE FUNCTION calculate_discount (iv_amount DECIMAL)
RETURNS DECIMAL
LANGUAGE SQLSCRIPT AS
BEGIN
  RETURN :iv_amount * 0.1;  -- Expression only, no SQL
END;
```

---

#### Error: "invalid column name" / SQL_ERROR_CODE 260

**Cause:** Column doesn't exist or typo in column name.

**Solutions:**
```sql
-- Check column exists
SELECT COLUMN_NAME FROM TABLE_COLUMNS
WHERE SCHEMA_NAME = 'YOUR_SCHEMA' AND TABLE_NAME = 'YOUR_TABLE';

-- Check for case sensitivity (HANA is case-sensitive for quoted identifiers)
SELECT "ColumnName" FROM "TABLE";  -- Exact case required
SELECT COLUMNNAME FROM "TABLE";    -- Unquoted = uppercase
```

---

#### Error: "invalid table name" / SQL_ERROR_CODE 259

**Cause:** Table doesn't exist or wrong schema.

**Solutions:**
```sql
-- Check table exists
SELECT TABLE_NAME FROM TABLES
WHERE SCHEMA_NAME = 'YOUR_SCHEMA' AND TABLE_NAME = 'YOUR_TABLE';

-- Use fully qualified name
SELECT * FROM "SCHEMA_NAME"."TABLE_NAME";

-- Or set default schema in procedure
CREATE PROCEDURE my_proc ()
DEFAULT SCHEMA "MY_SCHEMA"
LANGUAGE SQLSCRIPT AS
BEGIN
  SELECT * FROM "TABLE_NAME";  -- Uses MY_SCHEMA
END;
```

---

### Variable Errors

#### Error: "variable not defined"

**Cause:** Variable not declared or scope issue.

**Solutions:**
```sql
-- Ensure DECLARE before use
DECLARE lv_count INTEGER;
lv_count := 10;

-- Check scope - variables only valid in declaring block
BEGIN
  DECLARE lv_local INTEGER := 5;
END;
-- lv_local not accessible here
```

---

#### Error: "cannot use variable before assignment"

**Cause:** Using uninitialized OUT parameter or variable.

**Solution:**
```sql
-- Initialize variable at declaration
DECLARE lv_result NVARCHAR(100) := '';

-- Or assign before first use
DECLARE lv_result NVARCHAR(100);
lv_result := 'initial';
```

---

#### Error: "scalar variable expected" / "table variable expected"

**Cause:** Type mismatch between scalar and table variable.

**Solutions:**
```sql
-- For single value, use scalar variable
DECLARE lv_count INTEGER;
SELECT COUNT(*) INTO lv_count FROM "TABLE";

-- For multiple rows, use table variable
lt_data = SELECT * FROM "TABLE";

-- To get scalar from table variable
SELECT COUNT(*) INTO lv_count FROM :lt_data;
```

---

### Table Variable Errors

#### Error: "TABLE variable expected" when using colon

**Cause:** Incorrect colon usage.

**Rules:**
```sql
-- Use colon ONLY when referencing variable value
lt_result = SELECT * FROM :lt_input;  -- Reading lt_input
SELECT * FROM :lt_result;             -- Reading lt_result

-- NO colon when assigning
lt_result = SELECT * FROM "TABLE";    -- Assigning to lt_result

-- NO colon in table variable operators
:lt_result.INSERT((1, 'test'));       -- Colon before variable name
```

---

#### Error: "array cannot be used in this context"

**Cause:** Attempting to return array from procedure or use in unsupported context.

**Solution:**
```sql
-- Arrays cannot be returned from procedures
-- Convert to table using UNNEST
DECLARE arr INTEGER ARRAY := ARRAY(1, 2, 3);
lt_result = SELECT * FROM UNNEST(:arr) AS t(value);
```

---

### Cursor Errors

#### Error: "cursor is not open" / "cursor already open"

**Cause:** Incorrect cursor lifecycle management.

**Solution:**
```sql
DECLARE CURSOR cur FOR SELECT * FROM "TABLE";

-- Correct sequence: OPEN -> FETCH -> CLOSE
OPEN cur;
FETCH cur INTO lv_var;
WHILE NOT cur::NOTFOUND DO
  -- process
  FETCH cur INTO lv_var;
END WHILE;
CLOSE cur;

-- If reusing cursor, close before reopening
IF NOT cur::ISCLOSED THEN
  CLOSE cur;
END IF;
OPEN cur;
```

---

### Exception Handling Errors

#### Error: EXIT HANDLER not working

**Cause:** Handler declared in wrong position.

**Solution:**
```sql
BEGIN
  -- 1. All DECLARE statements first
  DECLARE lv_var INTEGER;
  DECLARE my_condition CONDITION FOR SQL_ERROR_CODE 301;

  -- 2. EXIT HANDLER must be LAST declaration
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
    SELECT ::SQL_ERROR_CODE FROM DUMMY;

  -- 3. Then procedural code
  INSERT INTO "TABLE" VALUES (1);
END;
```

---

#### Error: "RESIGNAL can only be used in exception handler"

**Cause:** RESIGNAL used outside EXIT HANDLER block.

**Solution:**
```sql
-- RESIGNAL only valid inside EXIT HANDLER
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
  -- Log error
  INSERT INTO "ERROR_LOG" VALUES (::SQL_ERROR_CODE, ::SQL_ERROR_MESSAGE);
  -- Re-throw
  RESIGNAL;  -- Only valid here
END;
```

---

#### Error: User-defined error code out of range

**Cause:** Using error code outside 10000-19999 range.

**Solution:**
```sql
-- User-defined codes: 10000-19999
SIGNAL SQL_ERROR_CODE 10001 SET MESSAGE_TEXT = 'Custom error';

-- NOT valid:
-- SIGNAL SQL_ERROR_CODE 301 SET MESSAGE_TEXT = 'Cannot use system codes';
```

---

### Performance Issues

#### Issue: Procedure runs slowly

**Diagnostic Steps:**

```sql
-- 1. Check execution plan
EXPLAIN PLAN FOR
SELECT * FROM "LARGE_TABLE" WHERE status = 'ACTIVE';

-- 2. Check for full table scans
SELECT * FROM "EXPLAIN_CALL_PLANS"
WHERE OPERATOR_NAME = 'TABLE SCAN';

-- 3. Check for expensive operations
SELECT * FROM M_EXPENSIVE_STATEMENTS
ORDER BY DURATION DESC;
```

> **System View Prerequisites:**
> - `EXPLAIN_CALL_PLANS`: Available after executing EXPLAIN PLAN; results stored per session
> - `M_EXPENSIVE_STATEMENTS`: Requires `MONITORING` system privilege or `DATA ADMIN` role
> - Enable expensive statement tracing first (see configuration below) for M_EXPENSIVE_STATEMENTS to contain data
>
> Some views may not be available in SAP HANA Cloud; check platform-specific documentation.

**Common Causes and Solutions:**

| Symptom | Cause | Solution |
|---------|-------|----------|
| Full table scan | Missing index | Create appropriate index |
| Engine conversion | Mixing row/column store | Use consistent store type |
| Sequential execution | Imperative logic | Convert to set-based |
| High memory | Large intermediate results | Filter earlier |

---

#### Issue: "memory allocation failed"

**Cause:** Query exceeds available memory.

**Solutions:**
```sql
-- Process in batches
DECLARE lv_offset INTEGER := 0;
DECLARE lv_batch INTEGER := 10000;

WHILE lv_offset < lv_total DO
  lt_batch = SELECT * FROM "LARGE_TABLE"
             ORDER BY id
             LIMIT :lv_batch OFFSET :lv_offset;
  -- Process batch
  lv_offset := :lv_offset + :lv_batch;
END WHILE;

-- Or limit result set
SELECT TOP 10000 * FROM "LARGE_TABLE";
```

---

### AMDP Specific Errors

#### Error: "AMDP method must implement IF_AMDP_MARKER_HDB"

**Cause:** Missing interface declaration.

**Solution:**
```abap
CLASS zcl_my_amdp DEFINITION.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.  " Add this line
    ...
ENDCLASS.
```

---

#### Error: "BY DATABASE can only be specified for methods of AMDP classes"

**Cause:** Class doesn't implement AMDP interface.

**Solution:**
```abap
" Ensure class implements marker interface
CLASS zcl_amdp DEFINITION.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.
    METHODS my_method ...
ENDCLASS.

CLASS zcl_amdp IMPLEMENTATION.
  METHOD my_method BY DATABASE PROCEDURE
    FOR HDB LANGUAGE SQLSCRIPT.
    ...
  ENDMETHOD.
ENDCLASS.
```

---

#### Error: "Table not found in USING clause"

**Cause:** Database table accessed but not declared in USING.

**Solution:**
```abap
METHOD my_method BY DATABASE PROCEDURE
  FOR HDB
  LANGUAGE SQLSCRIPT
  USING mara makt vbak.  " List ALL tables accessed

  et_result = SELECT * FROM mara
              JOIN makt ON mara.matnr = makt.matnr;  " Both in USING
ENDMETHOD.
```

---

#### Error: "CHANGING parameter not supported"

**Cause:** AMDP doesn't support CHANGING parameters.

**Solution:**
```abap
" Use IMPORTING and EXPORTING instead
METHODS my_method
  IMPORTING VALUE(iv_input) TYPE string
  EXPORTING VALUE(et_output) TYPE tt_output.  " Not CHANGING
```

---

### Debugging Techniques

#### Print Debug Information

```sql
DO
BEGIN
  DECLARE lv_debug NVARCHAR(1000);

  -- Using SELECT from DUMMY for output
  SELECT 'Starting process' AS debug_msg FROM DUMMY;

  lt_data = SELECT * FROM "TABLE";

  SELECT 'Processed ' || COUNT(*) || ' rows' AS debug_msg
  FROM :lt_data;
END;
```

---

#### Logging to Table

```sql
-- Create log table
CREATE TABLE "DEBUG_LOG" (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  message NVARCHAR(5000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Log in procedure
CREATE PROCEDURE debug_example ()
LANGUAGE SQLSCRIPT AS
BEGIN
  INSERT INTO "DEBUG_LOG" (message) VALUES ('Step 1: Started');

  lt_data = SELECT * FROM "SOURCE_TABLE";
  INSERT INTO "DEBUG_LOG" (message)
  VALUES ('Step 2: Loaded ' || RECORD_COUNT(:lt_data) || ' rows');

  -- More processing...
  INSERT INTO "DEBUG_LOG" (message) VALUES ('Step 3: Completed');
END;
```

---

#### Checking Variable Values

```sql
DO
BEGIN
  DECLARE lv_count INTEGER;
  DECLARE lv_total DECIMAL(15,2);

  SELECT COUNT(*), SUM(amount) INTO lv_count, lv_total FROM "ORDERS";

  -- Output for debugging
  SELECT :lv_count AS row_count,
         :lv_total AS total_amount,
         CURRENT_TIMESTAMP AS check_time
  FROM DUMMY;
END;
```

---

## Error Code Quick Reference

| Code | Description | Common Cause |
|------|-------------|--------------|
| 258 | Insufficient privilege | Missing grants |
| 259 | Invalid table name | Table doesn't exist |
| 260 | Invalid column name | Column doesn't exist or typo |
| 261 | Invalid index name | Index doesn't exist |
| 301 | Unique constraint violation | Duplicate key insert |
| 339 | Foreign key violation | Referenced record missing |
| 362 | NOT NULL constraint | NULL in required column |
| 1299 | No data found | Query returned no rows |
| 1304 | Resource busy | Lock contention |
| 10000-19999 | User-defined | Application-specific errors |

---

## Getting Help

### Check SAP Documentation

- SQLScript Reference: `https://help.sap.com/docs/hana-cloud-database/sap-hana-cloud-sap-hana-sqlscript-reference/`
- SQL Reference: `https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/`

### System Information Queries

```sql
-- Check HANA version
SELECT VERSION FROM M_DATABASE;

-- Check available memory
SELECT * FROM M_HOST_RESOURCE_UTILIZATION;

-- Check running statements
SELECT * FROM M_ACTIVE_STATEMENTS;

-- Check error history
SELECT * FROM M_ERROR_CODES WHERE ERROR_CODE = <your_error_code>;
```
