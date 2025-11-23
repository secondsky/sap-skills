# SQLScript Advanced Features Reference

## Loop Variations

### DO n TIMES Loop

Repeat a block a fixed number of times:

```sql
DO 10 TIMES
BEGIN
  INSERT INTO "LOG_TABLE" (message) VALUES ('Iteration');
END;
```

### DO n TIMES with Counter

```sql
DO
BEGIN
  DECLARE i INTEGER := 0;
  WHILE :i < 10 DO
    INSERT INTO "LOG_TABLE" (counter) VALUES (:i);
    i := :i + 1;
  END WHILE;
END;
```

---

## Lateral Joins

Lateral joins enable subqueries in the FROM clause to reference columns from preceding table expressions.

### Syntax

```sql
SELECT <columns>
FROM <table1>,
     LATERAL (<subquery referencing table1>) AS <alias>
WHERE <condition>;
```

### Example

```sql
SELECT TA.a1, TB.b1
FROM TA,
     LATERAL (SELECT b1, b2 FROM TB WHERE b3 = TA.a3) TB
WHERE TA.a2 = TB.b2;
```

**Use Cases:**
- Correlated subqueries in FROM clause
- Row-by-row transformations
- Dependent data lookups

---

## Query Hints

Provide optimization guidance to the SQL parser.

### Common Hints

```sql
-- Force parallel execution
SELECT /*+ PARALLEL_EXECUTION */ * FROM "LARGE_TABLE";

-- Use OLAP execution plan
SELECT /*+ USE_OLAP_PLAN */ * FROM "ANALYTICS_TABLE";

-- Disable parallel execution
SELECT /*+ NO_PARALLEL */ * FROM "SMALL_TABLE";

-- Route to specific engine
SELECT /*+ ROUTE_TO(VOLUME_ID) */ * FROM "TABLE";
```

### Hint Syntax

```sql
SELECT /*+ HINT1 HINT2 */ <columns> FROM <table>;
```

> **Note:** Use hints sparingly. The optimizer usually makes good decisions.

---

## JSON Functions

SAP HANA provides functions to parse and extract data from JSON objects.

### JSON_VALUE

Extract scalar value from JSON:

```sql
SELECT JSON_VALUE('{"name": "John", "age": 30}', '$.name') FROM DUMMY;
-- Returns: John
```

### JSON_QUERY

Extract JSON object or array:

```sql
SELECT JSON_QUERY('{"items": [1, 2, 3]}', '$.items') FROM DUMMY;
-- Returns: [1, 2, 3]
```

### JSON_TABLE

Convert JSON to relational format:

```sql
SELECT jt.*
FROM JSON_TABLE(
  '[{"id": 1, "name": "A"}, {"id": 2, "name": "B"}]',
  '$[*]'
  COLUMNS (
    id INTEGER PATH '$.id',
    name VARCHAR(100) PATH '$.name'
  )
) AS jt;
```

---

## Spatial Functions

SAP HANA supports geospatial data processing.

### Spatial Data Types

- `ST_POINT` - Point geometry
- `ST_LINESTRING` - Line geometry
- `ST_POLYGON` - Polygon geometry
- `ST_GEOMETRY` - Generic geometry

### Common Functions

```sql
-- Create point
SELECT NEW ST_POINT(10.0, 20.0) FROM DUMMY;

-- Calculate distance
SELECT point1.ST_DISTANCE(point2) FROM "LOCATIONS";

-- Check containment
SELECT polygon.ST_CONTAINS(point) FROM "AREAS";

-- Calculate area
SELECT polygon.ST_AREA() FROM "REGIONS";
```

---

## Time-Series Functions

### Moving Averages

```sql
SELECT date_col,
       AVG(value) OVER (ORDER BY date_col ROWS 7 PRECEDING) AS moving_avg_7day
FROM "TIME_SERIES";
```

### Series Generation

```sql
SELECT GENERATED_PERIOD_START, GENERATED_PERIOD_END
FROM SERIES_GENERATE_TIMESTAMP('INTERVAL 1 DAY', '2024-01-01', '2024-12-31');
```

---

## SAP-Specific Conversion Functions

### TO_DATS

Convert DATE to SAP date format (YYYYMMDD):

```sql
SELECT TO_DATS(CURRENT_DATE) FROM DUMMY;
-- Returns: 20241123
```

### TO_TIMS

Convert TIME to SAP time format (HHMMSS):

```sql
SELECT TO_TIMS(CURRENT_TIME) FROM DUMMY;
-- Returns: 143022
```

### Usage in Date Logic

```sql
DECLARE lv_date NVARCHAR(10);
SELECT SUBSTRING(TO_DATS(CURRENT_DATE), 1, 6) INTO lv_date FROM DUMMY;
-- Returns: 202411 (YYYYMM)
```

---

## CONVERT_CURRENCY Function

Currency conversion using exchange rates from SAP tables.

### Syntax

```sql
CONVERT_CURRENCY(
  AMOUNT => <amount>,
  SOURCE_UNIT => <source_currency>,
  TARGET_UNIT => <target_currency>,
  SCHEMA => <schema_name>,
  REFERENCE_DATE => <date>,
  CLIENT => <client>,
  CONVERSION_TYPE => <type>
)
```

### Example

```sql
SELECT
  doc_currcy,
  deb_cre_dc,
  CONVERT_CURRENCY(
    AMOUNT => deb_cre_dc,
    SOURCE_UNIT => doc_currcy,
    SCHEMA => 'SAPABAP1',
    TARGET_UNIT => 'EUR',
    REFERENCE_DATE => '2024-01-01',
    CLIENT => '100',
    CONVERSION_TYPE => 'EURX'
  ) AS deb_cre_eur
FROM "FINANCIAL_DATA";
```

### Complete Example with Dynamic Date

```sql
CREATE PROCEDURE convert_amounts (OUT outTab TABLE(...))
LANGUAGE SQLSCRIPT AS
BEGIN
  DECLARE lv_date NVARCHAR(10);

  SELECT SUBSTRING(TO_DATS(CURRENT_DATE), 1, 6) INTO lv_date FROM DUMMY;

  IF :lv_date <= '202106' THEN
    lv_date := '2020-12-01';
  ELSE
    SELECT TO_NVARCHAR(CURRENT_DATE) INTO lv_date FROM DUMMY;
  END IF;

  outTab = SELECT
    doc_currcy,
    CONVERT_CURRENCY(
      AMOUNT => amount,
      SOURCE_UNIT => doc_currcy,
      SCHEMA => 'SAPABAP1',
      TARGET_UNIT => 'EUR',
      REFERENCE_DATE => :lv_date,
      CLIENT => '100',
      CONVERSION_TYPE => 'EURX'
    ) AS converted_amount
  FROM "SOURCE_TABLE";
END;
```

---

## Session and System Functions

### session_context()

Retrieve session context values:

```sql
-- Get client (SAP system)
SELECT SESSION_CONTEXT('CLIENT') FROM DUMMY;

-- Get application user
SELECT SESSION_CONTEXT('APPLICATIONUSER') FROM DUMMY;

-- Get SAP user
SELECT SESSION_CONTEXT('SAP_USER') FROM DUMMY;
```

### record_count()

Get row count of table variable:

```sql
DECLARE lt_data TABLE (...);
lt_data = SELECT * FROM "TABLE";
lv_count = RECORD_COUNT(:lt_data);
```

### current_line_number

Get current line number in FOR loop:

```sql
FOR i IN 1..10 DO
  SELECT :i AS line_number FROM DUMMY;  -- or use CURRENT_LINE_NUMBER
END FOR;
```

---

## Parallel Mode Exit Triggers

SQLScript exits parallel execution mode when encountering:

| Trigger | Description |
|---------|-------------|
| Local scalar variables | Variables block parallel data flow |
| Scalar parameters in expressions | Parameters passed to expressions |
| DML/DDL in processing blocks | INSERT, UPDATE, DELETE, CREATE |
| Imperative logic | IF, WHILE, FOR, LOOP |
| Unassigned SQL statements | SELECT without assignment |

### Best Practice

```sql
CREATE PROCEDURE optimized ()
LANGUAGE SQLSCRIPT AS
BEGIN
  -- PARALLEL SECTION: Declarative statements first
  lt_data1 = SELECT * FROM "TABLE1" WHERE active = 1;
  lt_data2 = SELECT * FROM "TABLE2" WHERE status = 'A';
  lt_joined = SELECT * FROM :lt_data1 a JOIN :lt_data2 b ON a.id = b.id;

  -- SEQUENTIAL SECTION: Imperative logic last
  FOR row AS (SELECT * FROM :lt_joined) DO
    IF row.amount > 1000 THEN
      -- Process high-value items
    END IF;
  END FOR;
END;
```

---

## SET Operations Alternatives

### INTERSECT Alternative

Replace INTERSECT with JOIN for better Column Engine utilization:

**Original (slower):**
```sql
SELECT column_a FROM table_1
INTERSECT
SELECT column_a FROM table_2;
```

**Optimized (faster):**
```sql
SELECT DISTINCT table_1.column_a
FROM table_1
JOIN table_2 ON table_1.column_a = table_2.column_a;
```

> **Note:** JOIN approach works when column_a has no NULL values. Handle NULLs separately if needed.

### EXCEPT Alternative

Replace EXCEPT with LEFT JOIN:

**Original:**
```sql
SELECT id FROM table_a
EXCEPT
SELECT id FROM table_b;
```

**Optimized:**
```sql
SELECT DISTINCT a.id
FROM table_a a
LEFT JOIN table_b b ON a.id = b.id
WHERE b.id IS NULL;
```

---

## Procedure Management

### DROP PROCEDURE

```sql
DROP PROCEDURE <schema_name>.<procedure_name>;
DROP PROCEDURE <procedure_name> CASCADE;
```

### ALTER PROCEDURE Limitation

> **Important:** ALTER PROCEDURE cannot change the number or types of parameters. You must DROP and recreate the procedure:

```sql
-- Cannot do this:
ALTER PROCEDURE my_proc ADD PARAMETER (new_param INTEGER);

-- Must do this instead:
DROP PROCEDURE my_proc;
CREATE PROCEDURE my_proc (old_param INTEGER, new_param INTEGER) ...
```

### DROP FUNCTION

```sql
DROP FUNCTION <schema_name>.<function_name>;
DROP FUNCTION <function_name> CASCADE;
```

---

## Security Considerations

### SQL Injection Prevention

Dynamic SQL opens potential for unauthorized queries and SQL injection:

**Vulnerable Code:**
```sql
-- DANGEROUS: User input directly in SQL string
lv_sql := 'SELECT * FROM ' || :user_table || ' WHERE id = ' || :user_id;
EXECUTE IMMEDIATE :lv_sql;
```

**Safe Alternatives:**

1. **Use static SQL with parameters:**
```sql
SELECT * FROM "FIXED_TABLE" WHERE id = :user_id;
```

2. **Validate input against whitelist:**
```sql
IF :user_table NOT IN ('TABLE_A', 'TABLE_B', 'TABLE_C') THEN
  SIGNAL SQL_ERROR_CODE 10001 SET MESSAGE_TEXT = 'Invalid table name';
END IF;
```

3. **Use USING clause for parameters:**
```sql
EXECUTE IMMEDIATE 'SELECT * FROM TABLE WHERE id = ?' USING :user_id;
```

---

## AMDP Advantages Over Procedure Proxy

| Feature | AMDP | Procedure Proxy |
|---------|------|-----------------|
| Development approach | Top-down (ABAP first) | Bottom-up (DB first) |
| Lifecycle management | Automatic with ABAP transport | Manual DB deployment |
| HANA access required | No | Yes |
| Procedure creation | On first invocation | Manual activation |
| Code location | In ABAP class | Separate DB object |
| Version control | ABAP repository | Separate tracking |
| Transport | With ABAP objects | Separate transport |
