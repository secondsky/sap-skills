# SQLScript Performance Optimization Guide

## Core Principle: Code-to-Data Paradigm

SAP HANA's fundamental performance philosophy is **push computation to the database**, not pull data to the application. This leverages:

- In-memory processing
- Columnar storage compression
- Parallel query execution
- Database optimizer capabilities

---

## Top Performance Optimization Tips

### 1. Reduce Data Volume Early

**Problem:** Processing large datasets consumes memory and slows execution.

**Solution:** Filter rows and select only required columns as early as possible.

```sql
-- GOOD: Filter and project early
lt_filtered = SELECT customer_id, order_total
              FROM "ORDERS"
              WHERE status = 'COMPLETED'
                AND order_date >= ADD_DAYS(CURRENT_DATE, -30);

lt_result = SELECT f.customer_id, f.order_total, c.name
            FROM :lt_filtered AS f
            JOIN "CUSTOMERS" AS c ON f.customer_id = c.id;

-- BAD: Join first, filter later
lt_result = SELECT o.customer_id, o.order_total, c.name
            FROM "ORDERS" AS o
            JOIN "CUSTOMERS" AS c ON o.customer_id = c.id
            WHERE o.status = 'COMPLETED'
              AND o.order_date >= ADD_DAYS(CURRENT_DATE, -30);
```

**Best Practices:**
- Select only columns you need (avoid `SELECT *`)
- Apply WHERE filters as early as possible
- Pre-aggregate before joining
- Consider NULL-heavy columns separately

---

### 2. Prefer Declarative Over Imperative Logic

**Problem:** Imperative constructs (loops, cursors, IF statements) prevent parallel execution.

**Solution:** Use set-based SQL operations whenever possible.

```sql
-- GOOD: Declarative set-based operation
lt_updated = SELECT id,
                    amount * 1.1 AS new_amount,
                    CASE WHEN amount > 1000 THEN 'HIGH'
                         WHEN amount > 100 THEN 'MEDIUM'
                         ELSE 'LOW'
                    END AS tier
             FROM "TRANSACTIONS";

-- BAD: Imperative row-by-row processing
FOR row AS cursor_transactions DO
  IF row.amount > 1000 THEN
    UPDATE "TRANSACTIONS" SET tier = 'HIGH' WHERE id = row.id;
  ELSEIF row.amount > 100 THEN
    UPDATE "TRANSACTIONS" SET tier = 'MEDIUM' WHERE id = row.id;
  ELSE
    UPDATE "TRANSACTIONS" SET tier = 'LOW' WHERE id = row.id;
  END IF;
END FOR;
```

**Impact:**
- Declarative: HANA optimizer creates parallel execution plan
- Imperative: Forces sequential processing, bypasses optimizer

---

### 3. Avoid Engine Mixing

**Problem:** HANA uses specialized engines for different operations. Mixing them causes data conversion overhead.

| Engine | Purpose | Triggered By |
|--------|---------|--------------|
| Column Engine | Columnar storage operations | Queries on column tables, most SQLScript |
| Row Engine | Row-store table operations | Queries on row tables, transactional operations |
| Calculation Engine | Complex expressions, CE functions | CE_* functions, certain calculation views |

**Engine Selection:** HANA automatically selects the execution engine based on:
- Table storage type (column vs row store)
- Query patterns and operations used
- Optimizer cost estimation

**Solution:** Keep operations within same engine type.

```sql
-- BAD: Mixing Row Store and Column Store
SELECT c.* FROM "COLUMN_STORE_TABLE" c
JOIN "ROW_STORE_TABLE" r ON c.id = r.id;

-- BETTER: Convert to same store type or redesign
-- Or at minimum, be aware of the conversion cost
```

**Avoid mixing:**
- Row Store tables with Column Store tables
- SQL operations with Calculation Engine (CE) functions
- SQLScript CE functions in performance-critical paths

---

### 4. Optimize Set Operations

**Problem:** UNION, INTERSECT, EXCEPT don't utilize Column Engine efficiently.

**Solution:** Replace with JOIN operations where possible, or use UNION ALL.

```sql
-- GOOD: UNION ALL (no duplicate removal)
SELECT id, name, 'A' AS source FROM table_a
UNION ALL
SELECT id, name, 'B' AS source FROM table_b;

-- SLOWER: UNION (removes duplicates)
SELECT id, name FROM table_a
UNION
SELECT id, name FROM table_b;

-- ALTERNATIVE: Use JOIN instead of INTERSECT
-- Instead of: SELECT id FROM a INTERSECT SELECT id FROM b
SELECT DISTINCT a.id
FROM table_a AS a
INNER JOIN table_b AS b ON a.id = b.id;
```

---

### 5. Eliminate Dynamic SQL

**Problem:** Dynamic SQL requires re-optimization on every execution.

**Solution:** Use static SQL with parameters.

```sql
-- BAD: Dynamic SQL
lv_sql = 'SELECT * FROM "' || :lv_table || '" WHERE status = ''' || :lv_status || '''';
EXECUTE IMMEDIATE :lv_sql;

-- GOOD: Static SQL with parameters
SELECT * FROM "ORDERS" WHERE status = :lv_status;
```

**Additional issues with dynamic SQL:**
- SQL injection vulnerabilities
- No query plan caching
- Harder to debug and maintain

---

### 6. Position Imperative Logic Last

**Problem:** Imperative statements block parallel processing of subsequent code.

**Solution:** Structure procedures with declarative logic first, imperative at the end.

```sql
CREATE PROCEDURE optimized_processing ()
LANGUAGE SQLSCRIPT AS
BEGIN
  -- 1. Declarative operations FIRST (run in parallel)
  lt_data = SELECT * FROM "SOURCE_TABLE" WHERE active = 1;
  lt_aggregated = SELECT category, SUM(amount) AS total
                  FROM :lt_data GROUP BY category;
  lt_joined = SELECT a.*, b.name
              FROM :lt_aggregated AS a
              JOIN "CATEGORIES" AS b ON a.category = b.id;

  -- 2. Final imperative operations LAST
  FOR row AS (SELECT * FROM :lt_joined) DO
    IF row.total > 10000 THEN
      INSERT INTO "ALERTS" VALUES (row.category, row.total, CURRENT_TIMESTAMP);
    END IF;
  END FOR;
END;
```

---

## Query Optimization Techniques

### Use Appropriate Indexes

```sql
-- Create index for frequently filtered columns
CREATE INDEX idx_orders_status ON "ORDERS" (status);
CREATE INDEX idx_orders_date ON "ORDERS" (order_date);

-- Composite index for multi-column filters
CREATE INDEX idx_orders_status_date ON "ORDERS" (status, order_date);
```

### Leverage Partitioning

```sql
-- Partition large tables by date
CREATE COLUMN TABLE "TRANSACTIONS" (
  id INTEGER,
  trans_date DATE,
  amount DECIMAL(15,2)
) PARTITION BY RANGE (trans_date) (
  PARTITION '2023' <= VALUES < '2024',
  PARTITION '2024' <= VALUES < '2025',
  PARTITION OTHERS
);
```

### Use Query Hints

```sql
-- Hint to use specific execution strategy
SELECT /*+ USE_OLAP_PLAN */ * FROM "LARGE_TABLE";

-- Hint to disable parallelism (when needed)
SELECT /*+ NO_PARALLEL */ * FROM "SMALL_TABLE";
```

---

## Table Variable Best Practices

### Avoid Scalar Variables in Parallel Sections

```sql
-- BAD: Scalar variables break parallelism
DECLARE lv_count INTEGER;
SELECT COUNT(*) INTO lv_count FROM "TABLE1";
-- Subsequent operations must wait

-- BETTER: Use table variables
lt_stats = SELECT COUNT(*) AS cnt FROM "TABLE1";
-- Can continue parallel processing
```

### Use Table Variable Operators

```sql
-- Efficient in-memory operations
:lt_data.INSERT((:lv_id, :lv_name));
:lt_data.UPDATE((:lv_new_name), 1);
:lt_data.DELETE(1);
```

---

## Monitoring and Analysis Tools

### Plan Visualizer

Analyze execution plans to identify bottlenecks:

1. Open SQL Console in HANA Studio/Web IDE
2. Execute query with "Visualize Plan"
3. Look for:
   - Full table scans (add indexes)
   - Engine conversions (avoid mixing)
   - Large intermediate results (filter earlier)

### Expensive Statement Trace

Enable to capture slow queries:

```sql
ALTER SYSTEM ALTER CONFIGURATION ('indexserver.ini', 'SYSTEM')
SET ('expensive_statement', 'enable') = 'true';

ALTER SYSTEM ALTER CONFIGURATION ('indexserver.ini', 'SYSTEM')
SET ('expensive_statement', 'threshold_duration') = '1000000';  -- 1 second in microseconds
```

### SQL Analyzer

Get optimization recommendations:

```sql
-- In SAP HANA Studio
EXPLAIN PLAN FOR <your_query>;
SELECT * FROM "EXPLAIN_CALL_PLANS";
```

---

## Memory Management

### Control Result Set Size

```sql
-- Limit results for testing/debugging
SELECT TOP 1000 * FROM "LARGE_TABLE";

-- Use LIMIT for pagination
SELECT * FROM "TABLE" ORDER BY id LIMIT 100 OFFSET 200;
```

### Release Resources

```sql
-- Explicitly close cursors
CLOSE my_cursor;

-- Use smaller table variables when possible
lt_small = SELECT id, name FROM :lt_large;  -- Only needed columns
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| `SELECT *` | Retrieves unnecessary columns | List specific columns |
| Cursor loops for updates | Row-by-row processing | Set-based UPDATE |
| DISTINCT on large sets | Memory intensive | Filter earlier or redesign |
| Correlated subqueries | N+1 query pattern | Use JOIN |
| Multiple sequential queries | No parallelism | Combine into single query |
| String concatenation in loops | Memory fragmentation | Use STRING_AGG |

---

## Performance Checklist

Before deploying SQLScript:

- [ ] Columns explicitly listed (no `SELECT *`)
- [ ] WHERE filters applied early
- [ ] Set-based operations preferred over loops
- [ ] No dynamic SQL unless absolutely necessary
- [ ] Declarative statements before imperative
- [ ] Appropriate indexes exist
- [ ] Execution plan reviewed
- [ ] No engine mixing issues
- [ ] Table variables used efficiently
- [ ] Resource cleanup in place

---

## Benchmarking Template

```sql
DO
BEGIN
  DECLARE lv_start TIMESTAMP;
  DECLARE lv_end TIMESTAMP;
  DECLARE lv_duration BIGINT;

  lv_start = CURRENT_TIMESTAMP;

  -- Your code here
  lt_result = SELECT * FROM "LARGE_TABLE" WHERE condition;

  lv_end = CURRENT_TIMESTAMP;
  lv_duration = NANO100_BETWEEN(:lv_start, :lv_end) / 10000;  -- milliseconds

  SELECT :lv_duration AS execution_time_ms FROM DUMMY;
END;
```
