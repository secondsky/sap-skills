# ABAP Performance Optimization - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/32_Performance_Notes.md

---

## Database Access Optimization

### Reduce Result Sets

```abap
" Only read necessary data
SELECT * FROM dbtab
  WHERE status = 'A'
  INTO TABLE @DATA(result).

" Limit rows
SELECT * FROM dbtab
  UP TO 100 ROWS
  INTO TABLE @DATA(result).

" Single row
SELECT SINGLE * FROM dbtab
  WHERE id = @id
  INTO @DATA(result).

" Remove duplicates
SELECT DISTINCT field1, field2
  FROM dbtab
  INTO TABLE @DATA(result).
```

### Minimize Data Volume

```abap
" Select only needed columns (NOT SELECT *)
SELECT id, name, status
  FROM dbtab
  INTO TABLE @DATA(result).

" Use aggregates on database
SELECT carrid, COUNT(*) AS cnt, AVG( price ) AS avg_price
  FROM flight
  GROUP BY carrid
  INTO TABLE @DATA(stats).

" Update specific columns only
UPDATE dbtab SET status = 'X' WHERE id = @id.
```

### Block Operations (Not Line-by-Line)

```abap
" GOOD: Single database operation
INSERT dbtab FROM TABLE @itab.
UPDATE dbtab FROM TABLE @itab.
DELETE dbtab FROM TABLE @itab.
MODIFY dbtab FROM TABLE @itab.

" BAD: Loop with individual operations
LOOP AT itab INTO wa.
  INSERT dbtab FROM @wa.  " Avoid!
ENDLOOP.
```

### Avoid Nested SELECT Loops

```abap
" BAD: Nested SELECT (N+1 problem)
SELECT * FROM orders INTO TABLE @DATA(orders).
LOOP AT orders INTO DATA(order).
  SELECT * FROM order_items WHERE order_id = @order-id.  " Avoid!
ENDLOOP.

" GOOD: Use JOIN
SELECT o~*, i~*
  FROM orders AS o
  INNER JOIN order_items AS i ON o~id = i~order_id
  INTO TABLE @DATA(result).

" GOOD: Use FOR ALL ENTRIES (check not empty!)
IF orders IS NOT INITIAL.
  SELECT * FROM order_items
    FOR ALL ENTRIES IN @orders
    WHERE order_id = @orders-id
    INTO TABLE @DATA(items).
ENDIF.
```

### FOR ALL ENTRIES Considerations

```abap
" CRITICAL: Always check if table is empty!
" Empty table causes FULL TABLE SCAN
IF itab IS NOT INITIAL.
  SELECT * FROM dbtab
    FOR ALL ENTRIES IN @itab
    WHERE key_field = @itab-key
    INTO TABLE @DATA(result).
ENDIF.
```

### Use JOINs and Subqueries

```abap
" JOIN is more efficient than separate queries
SELECT a~*, b~name
  FROM table_a AS a
  INNER JOIN table_b AS b ON a~id = b~id
  INTO TABLE @DATA(result).

" Subquery for filtering
SELECT * FROM orders
  WHERE customer_id IN ( SELECT id FROM customers WHERE region = 'EU' )
  INTO TABLE @DATA(result).
```

### Static vs Dynamic SQL

```abap
" GOOD: Static (better optimization)
SELECT * FROM dbtab WHERE field = @value INTO TABLE @result.

" SLOWER: Dynamic (runtime evaluation)
DATA(field_name) = 'FIELD'.
SELECT * FROM dbtab WHERE (field_name) = @value INTO TABLE @result.
```

---

## Internal Table Performance

### Table Type Selection

| Table Type | Best For | Access Time |
|------------|----------|-------------|
| STANDARD | Small tables, sequential access | O(n) linear |
| SORTED | Key access with ranges | O(log n) |
| HASHED | Large tables, unique key access | O(1) constant |

```abap
" Standard - small datasets, sequential processing
DATA std_tab TYPE STANDARD TABLE OF struct WITH EMPTY KEY.

" Sorted - frequent key access, range queries
DATA sorted_tab TYPE SORTED TABLE OF struct WITH UNIQUE KEY id.

" Hashed - large datasets, key-only access
DATA hashed_tab TYPE HASHED TABLE OF struct WITH UNIQUE KEY id.
```

### Key Access Optimization

```abap
" OPTIMAL: Full primary key (hashed = O(1), sorted = O(log n))
READ TABLE hashed_tab WITH TABLE KEY id = 123 INTO wa.

" GOOD: Left-aligned partial key on sorted table
READ TABLE sorted_tab WITH TABLE KEY id = 123 INTO wa.

" BAD: Free key forces linear search
READ TABLE any_tab WITH KEY name = 'Test' INTO wa.  " O(n)!
```

### Secondary Table Keys

```abap
" Define secondary key for alternative access
TYPES: BEGIN OF ty_data,
         id   TYPE i,
         name TYPE string,
         date TYPE d,
       END OF ty_data,
       tt_data TYPE SORTED TABLE OF ty_data
         WITH UNIQUE KEY id
         WITH NON-UNIQUE SORTED KEY by_name COMPONENTS name.

" Use secondary key
READ TABLE itab WITH TABLE KEY by_name COMPONENTS name = 'Test' INTO wa.
```

### Loop Optimization

```abap
" GOOD: WHERE clause on sorted/hashed tables
LOOP AT sorted_tab INTO wa WHERE status = 'A'.
  " Optimized if key fields used
ENDLOOP.

" GOOD: Use field symbols for modification
LOOP AT itab ASSIGNING FIELD-SYMBOL(<line>).
  <line>-field = new_value.  " Direct modification
ENDLOOP.

" SLOWER: Work area copy
LOOP AT itab INTO wa.
  wa-field = new_value.
  MODIFY itab FROM wa.  " Extra copy operation
ENDLOOP.
```

### TRANSPORTING Addition

```abap
" Only transfer needed fields
READ TABLE itab INTO wa TRANSPORTING field1 field2.

" Check existence without data transfer
READ TABLE itab TRANSPORTING NO FIELDS WITH TABLE KEY id = 123.
IF sy-subrc = 0.
  " Exists
ENDIF.
```

### Block Operations on Tables

```abap
" GOOD: Block append
APPEND LINES OF source_tab TO target_tab.

" BAD: Loop append
LOOP AT source_tab INTO wa.
  APPEND wa TO target_tab.  " Avoid!
ENDLOOP.

" Block string operations
FIND ALL OCCURRENCES OF pattern IN TABLE char_table RESULTS result_tab.
REPLACE ALL OCCURRENCES OF old WITH new IN TABLE char_table.
```

### Sorting

```abap
" GOOD: Explicit sort key
SORT itab BY field1 ASCENDING field2 DESCENDING.

" AVOID: Implicit standard key (many fields)
SORT itab.  " Uses all non-numeric fields - often inefficient
```

---

## Memory Management

### CLEAR vs FREE

```abap
" CLEAR: Remove content, keep memory allocated
CLEAR itab.  " Use when table will be refilled

" FREE: Remove content and deallocate memory
FREE itab.  " Use when table won't be reused soon
```

### Data Reference Efficiency

```abap
" Field symbols as pointers (no copy)
LOOP AT itab ASSIGNING FIELD-SYMBOL(<line>).
  " Direct access to table row
ENDLOOP.

" Data reference for deep structures
LOOP AT deep_itab REFERENCE INTO DATA(dref).
  dref->nested_field = value.  " Efficient for nested data
ENDLOOP.
```

---

## String Processing

### String Type vs Fixed Length

```abap
" GOOD: Variable-length string (internal sharing)
DATA text TYPE string.
text = text && ` more text`.  " Efficient concatenation

" SLOWER: Fixed-length operations
DATA char100 TYPE c LENGTH 100.
```

### String Literals vs Templates

```abap
" FASTER: Simple literal
str = `Plain text`.

" SLOWER: Template (evaluated as expression)
str = |Plain text|.

" Templates only when needed
str = |Value: { value }|.  " Justified use
```

### Pattern Matching

```abap
" FASTER: Simple comparison
IF text = 'expected'.

" FASTER: Basic patterns
IF text CP '*pattern*'.

" SLOWER: PCRE regex (use only when needed)
FIND PCRE '[complex]+pattern' IN text.
```

---

## Type Handling

### Avoid Unnecessary Conversions

```abap
" GOOD: Same types
DATA: val1 TYPE decfloat34,
      val2 TYPE decfloat34,
      result TYPE decfloat34.
result = val1 + val2.

" SLOWER: Mixed types (implicit conversion)
DATA: int_val TYPE i,
      float_val TYPE f,
      dec_val TYPE p DECIMALS 2.
result = int_val + float_val + dec_val.  " Conversions happen!
```

---

## Procedure Calls

### Pass by Reference for Large Data

```abap
" GOOD: By reference (no copy)
METHODS process
  IMPORTING
    it_data TYPE tt_large_table.  " Reference by default

" SLOWER: By value (copies data)
METHODS process
  IMPORTING
    VALUE(it_data) TYPE tt_large_table.  " Explicit copy!
```

---

## Parallel Processing

```abap
" Use CL_ABAP_PARALLEL for data-intensive operations
DATA: ref_tab TYPE cl_abap_parallel=>t_in_inst_tab.

" Populate ref_tab with work items
DATA(parallel) = NEW cl_abap_parallel( ).
parallel->run_inst( EXPORTING p_in_tab = ref_tab ).
```

---

## RAP/EML Optimization

```abap
" BAD: EML in loop
LOOP AT items INTO item.
  MODIFY ENTITIES OF entity
    ENTITY ent
    UPDATE SET FIELDS WITH VALUE #( ( %key = item-key field = item-value ) ).
ENDLOOP.

" GOOD: Single EML with all modifications
MODIFY ENTITIES OF entity
  ENTITY ent
  UPDATE SET FIELDS WITH VALUE #(
    FOR item IN items ( %key = item-key field = item-value )
  ).
```

---

## CDS Views

- Push complex operations to database layer
- Leverage SAP HANA optimization
- Use associations instead of explicit JOINs
- Apply filters in CDS, not ABAP

---

## Quick Reference: Do's and Don'ts

### DO

- ✓ Select only needed columns
- ✓ Use WHERE clauses
- ✓ Use block operations (INSERT/UPDATE/DELETE from table)
- ✓ Use JOINs instead of nested SELECTs
- ✓ Check FOR ALL ENTRIES table not empty
- ✓ Use appropriate table types (hashed for large key access)
- ✓ Use field symbols in loops
- ✓ Use TRANSPORTING for partial reads
- ✓ Use secondary keys for alternative access paths
- ✓ Pass large data by reference

### DON'T

- ✗ SELECT * when only few columns needed
- ✗ SELECT in loops (N+1 problem)
- ✗ Loop with individual INSERT/UPDATE/DELETE
- ✗ Use FOR ALL ENTRIES with empty table
- ✗ Use free key access on large tables
- ✗ Use PCRE when simple patterns suffice
- ✗ Mix numeric types unnecessarily
- ✗ Use VALUE( ) for large parameters
- ✗ Use dynamic SQL when static works

---

## Analysis Tools

- **ABAP Profiling** in ADT (SAT replacement)
- **SQL Trace** for database analysis
- **Runtime Analysis** for bottleneck identification
- **Code Inspector** for static analysis

Reference: SAP Help Portal - ABAP Development Tools profiling documentation
