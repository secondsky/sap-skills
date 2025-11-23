# ABAP SQL - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/03_ABAP_SQL.md

---

## SELECT Statement Syntax

```abap
SELECT [SINGLE|DISTINCT]
  select_list
  FROM source
  [WHERE condition]
  [GROUP BY fields]
  [HAVING condition]
  [ORDER BY fields]
  INTO|APPENDING target
  [UP TO n ROWS]
  [OFFSET n].
```

---

## Basic SELECT Operations

### SELECT INTO

```abap
" Into structure (single row)
SELECT SINGLE * FROM zdemo_abap_carr INTO @DATA(carrier).

" Into internal table
SELECT * FROM zdemo_abap_carr INTO TABLE @DATA(carriers).

" Into existing table (appending)
SELECT * FROM zdemo_abap_carr APPENDING TABLE @carriers.

" Into existing table (overwriting)
SELECT * FROM zdemo_abap_carr INTO TABLE @carriers.

" With PACKAGE SIZE (for large results)
SELECT * FROM zdemo_abap_fli INTO TABLE @DATA(flights) PACKAGE SIZE 100.
  " Process package
  CLEAR flights.
ENDSELECT.

" UP TO n ROWS
SELECT * FROM zdemo_abap_fli INTO TABLE @DATA(first_10) UP TO 10 ROWS.

" OFFSET (skip rows)
SELECT * FROM zdemo_abap_fli INTO TABLE @DATA(page2)
  UP TO 10 ROWS OFFSET 10.
```

### Field Selection

```abap
" All fields
SELECT * FROM zdemo_abap_carr INTO TABLE @DATA(all_fields).

" Specific fields
SELECT carrid, carrname, url FROM zdemo_abap_carr INTO TABLE @DATA(some_fields).

" With alias
SELECT carrid AS carrier_id, carrname AS name FROM zdemo_abap_carr
  INTO TABLE @DATA(aliased).

" Literals
SELECT carrid, 'Carrier' AS type FROM zdemo_abap_carr INTO TABLE @DATA(with_literal).

" Expressions
SELECT carrid, price * quantity AS total FROM zdemo_abap_fli
  INTO TABLE @DATA(calculated).
```

---

## WHERE Conditions

### Comparison Operators

```abap
" Equal, not equal
WHERE carrid = 'LH'
WHERE carrid <> 'LH'
WHERE carrid NE 'LH'

" Greater/less than
WHERE price > 1000
WHERE price >= 1000
WHERE price < 500
WHERE price <= 500

" BETWEEN
WHERE price BETWEEN 100 AND 500

" IN list
WHERE carrid IN ( 'LH', 'AA', 'UA' )

" LIKE (pattern matching)
WHERE carrname LIKE 'Luft%'       " Starts with 'Luft'
WHERE carrname LIKE '%Airlines'   " Ends with 'Airlines'
WHERE carrname LIKE '%Air%'       " Contains 'Air'
WHERE code LIKE 'A_C'             " Single character wildcard

" IS NULL / IS NOT NULL
WHERE description IS NULL
WHERE description IS NOT NULL

" IS INITIAL / IS NOT INITIAL
WHERE field IS INITIAL
WHERE field IS NOT INITIAL
```

### Logical Operators

```abap
" AND
WHERE carrid = 'LH' AND connid = '0400'

" OR
WHERE carrid = 'LH' OR carrid = 'AA'

" NOT
WHERE NOT carrid = 'LH'
WHERE carrid NOT IN ( 'LH', 'AA' )
WHERE carrname NOT LIKE '%Express%'

" Combined
WHERE ( carrid = 'LH' OR carrid = 'AA' ) AND fldate > '20240101'
```

### FOR ALL ENTRIES

```abap
" Prerequisites: Source table must not be empty!
IF source_itab IS NOT INITIAL.
  SELECT * FROM dbtab
    FOR ALL ENTRIES IN @source_itab
    WHERE key_field = @source_itab-id
    INTO TABLE @DATA(result).
ENDIF.

" Multiple conditions
SELECT * FROM flights
  FOR ALL ENTRIES IN @flight_keys
  WHERE carrid = @flight_keys-carrid
    AND connid = @flight_keys-connid
  INTO TABLE @DATA(matched_flights).
```

### Subqueries

```abap
" EXISTS subquery
SELECT * FROM zdemo_abap_carr AS c
  WHERE EXISTS ( SELECT * FROM zdemo_abap_fli AS f
                  WHERE f~carrid = c~carrid )
  INTO TABLE @DATA(carriers_with_flights).

" NOT EXISTS
SELECT * FROM zdemo_abap_carr AS c
  WHERE NOT EXISTS ( SELECT * FROM zdemo_abap_fli AS f
                      WHERE f~carrid = c~carrid )
  INTO TABLE @DATA(carriers_without_flights).

" IN subquery
SELECT * FROM zdemo_abap_carr
  WHERE carrid IN ( SELECT carrid FROM zdemo_abap_fli
                     WHERE price > 500 )
  INTO TABLE @DATA(expensive_carriers).

" Scalar subquery
SELECT carrid, carrname,
       ( SELECT COUNT(*) FROM zdemo_abap_fli AS f
          WHERE f~carrid = c~carrid ) AS flight_count
  FROM zdemo_abap_carr AS c
  INTO TABLE @DATA(with_counts).
```

---

## Aggregate Functions

```abap
" COUNT
SELECT COUNT(*) FROM zdemo_abap_fli INTO @DATA(total_count).
SELECT COUNT( DISTINCT carrid ) FROM zdemo_abap_fli INTO @DATA(carrier_count).

" SUM
SELECT SUM( price ) FROM zdemo_abap_fli WHERE carrid = 'LH' INTO @DATA(sum_price).

" AVG
SELECT AVG( price ) FROM zdemo_abap_fli INTO @DATA(avg_price).

" MIN / MAX
SELECT MIN( fldate ) FROM zdemo_abap_fli INTO @DATA(first_flight).
SELECT MAX( fldate ) FROM zdemo_abap_fli INTO @DATA(last_flight).

" Combined aggregates
SELECT carrid,
       COUNT(*) AS flight_count,
       SUM( seatsmax ) AS total_seats,
       AVG( price ) AS avg_price,
       MIN( fldate ) AS first_date,
       MAX( fldate ) AS last_date
  FROM zdemo_abap_fli
  GROUP BY carrid
  INTO TABLE @DATA(carrier_stats).

" HAVING clause (filter on aggregates)
SELECT carrid, COUNT(*) AS cnt
  FROM zdemo_abap_fli
  GROUP BY carrid
  HAVING COUNT(*) > 10
  INTO TABLE @DATA(active_carriers).
```

---

## JOIN Operations

### INNER JOIN

```abap
SELECT a~carrid, a~connid, b~carrname
  FROM zdemo_abap_fli AS a
  INNER JOIN zdemo_abap_carr AS b ON a~carrid = b~carrid
  INTO TABLE @DATA(flights_with_carrier).

" Multiple conditions
SELECT f~*, c~carrname
  FROM zdemo_abap_fli AS f
  INNER JOIN zdemo_abap_carr AS c
    ON f~carrid = c~carrid
  INTO TABLE @DATA(joined).
```

### LEFT OUTER JOIN

```abap
" Returns all from left, matched from right (or NULL)
SELECT c~carrid, c~carrname, f~connid, f~fldate
  FROM zdemo_abap_carr AS c
  LEFT OUTER JOIN zdemo_abap_fli AS f
    ON c~carrid = f~carrid
  INTO TABLE @DATA(carriers_with_optional_flights).
```

### RIGHT OUTER JOIN

```abap
" Returns all from right, matched from left (or NULL)
SELECT c~carrid, c~carrname, f~connid, f~fldate
  FROM zdemo_abap_fli AS f
  RIGHT OUTER JOIN zdemo_abap_carr AS c
    ON c~carrid = f~carrid
  INTO TABLE @DATA(all_carriers).
```

### CROSS JOIN

```abap
" Cartesian product
SELECT a~id AS a_id, b~id AS b_id
  FROM table_a AS a
  CROSS JOIN table_b AS b
  INTO TABLE @DATA(cross_product).
```

### Multiple Joins

```abap
SELECT f~carrid, f~connid, c~carrname, p~cityto
  FROM zdemo_abap_fli AS f
  INNER JOIN zdemo_abap_carr AS c ON f~carrid = c~carrid
  INNER JOIN zdemo_abap_conn AS p ON f~carrid = p~carrid
                                  AND f~connid = p~connid
  INTO TABLE @DATA(complete_info).
```

---

## Sorting and Grouping

### ORDER BY

```abap
SELECT * FROM zdemo_abap_fli
  ORDER BY carrid, fldate
  INTO TABLE @DATA(sorted).

SELECT * FROM zdemo_abap_fli
  ORDER BY price DESCENDING
  INTO TABLE @DATA(by_price_desc).

SELECT * FROM zdemo_abap_fli
  ORDER BY carrid ASCENDING, price DESCENDING
  INTO TABLE @DATA(mixed_sort).

" Order by alias
SELECT carrid, COUNT(*) AS cnt
  FROM zdemo_abap_fli
  GROUP BY carrid
  ORDER BY cnt DESCENDING
  INTO TABLE @DATA(by_count).

" PRIMARY KEY ordering
SELECT * FROM zdemo_abap_fli
  ORDER BY PRIMARY KEY
  INTO TABLE @DATA(by_pk).
```

### GROUP BY

```abap
SELECT carrid, COUNT(*) AS flight_count
  FROM zdemo_abap_fli
  GROUP BY carrid
  INTO TABLE @DATA(grouped).

SELECT carrid, connid,
       COUNT(*) AS cnt,
       SUM( seatsmax ) AS total_seats
  FROM zdemo_abap_fli
  GROUP BY carrid, connid
  INTO TABLE @DATA(grouped_multi).
```

---

## Common Table Expressions (CTE)

```abap
" WITH ... AS
WITH
  +flights AS (
    SELECT carrid, connid, COUNT(*) AS cnt
      FROM zdemo_abap_fli
      GROUP BY carrid, connid ),
  +carriers AS (
    SELECT carrid, carrname
      FROM zdemo_abap_carr )
SELECT f~carrid, c~carrname, f~cnt
  FROM +flights AS f
  INNER JOIN +carriers AS c ON f~carrid = c~carrid
  INTO TABLE @DATA(result).

" Chained CTEs
WITH
  +step1 AS (
    SELECT * FROM tab1 WHERE col1 = 'A' ),
  +step2 AS (
    SELECT * FROM +step1 WHERE col2 > 100 )
SELECT * FROM +step2 INTO TABLE @DATA(final_result).
```

---

## CASE Expressions

```abap
" Simple CASE
SELECT carrid,
       CASE carrid
         WHEN 'LH' THEN 'Lufthansa'
         WHEN 'AA' THEN 'American Airlines'
         ELSE 'Other'
       END AS carrier_name
  FROM zdemo_abap_fli
  INTO TABLE @DATA(with_case).

" Searched CASE
SELECT carrid, price,
       CASE
         WHEN price < 500 THEN 'Budget'
         WHEN price < 1000 THEN 'Economy'
         WHEN price < 2000 THEN 'Business'
         ELSE 'First Class'
       END AS category
  FROM zdemo_abap_fli
  INTO TABLE @DATA(categorized).
```

---

## Built-in SQL Functions

### String Functions

```abap
SELECT
  CONCAT( first_name, last_name ) AS full_name,
  CONCAT_WITH_SPACE( first_name, last_name, 1 ) AS spaced_name,
  LENGTH( description ) AS desc_length,
  LEFT( code, 2 ) AS prefix,
  RIGHT( code, 2 ) AS suffix,
  SUBSTRING( text, 1, 10 ) AS excerpt,
  UPPER( name ) AS upper_name,
  LOWER( name ) AS lower_name,
  LTRIM( text, ' ' ) AS left_trimmed,
  RTRIM( text, ' ' ) AS right_trimmed,
  REPLACE( text, 'old', 'new' ) AS replaced,
  LPAD( code, 10, '0' ) AS padded
FROM some_table
INTO TABLE @DATA(string_results).
```

### Numeric Functions

```abap
SELECT
  ABS( amount ) AS absolute,
  CEIL( value ) AS ceiling,
  FLOOR( value ) AS floor_val,
  ROUND( price, 2 ) AS rounded,
  DIV( total, count ) AS integer_div,
  MOD( number, 10 ) AS remainder,
  DIVISION( amount, 3, 2 ) AS precise_div
FROM some_table
INTO TABLE @DATA(numeric_results).
```

### Date/Time Functions

```abap
SELECT
  DATS_IS_VALID( fldate ) AS is_valid,
  DATS_DAYS_BETWEEN( date1, date2 ) AS day_diff,
  DATS_ADD_DAYS( fldate, 7 ) AS plus_week,
  DATS_ADD_MONTHS( fldate, 1 ) AS plus_month,
  EXTRACT_YEAR( fldate ) AS year,
  EXTRACT_MONTH( fldate ) AS month,
  EXTRACT_DAY( fldate ) AS day
FROM zdemo_abap_fli
INTO TABLE @DATA(date_results).
```

### COALESCE and NULL Handling

```abap
SELECT
  COALESCE( description, 'No description' ) AS desc,
  COALESCE( price, 0 ) AS price_or_zero,
  CASE WHEN field IS NULL THEN 'N/A' ELSE field END AS handled
FROM some_table
INTO TABLE @DATA(null_handled).
```

---

## Data Modification

### INSERT

```abap
" Single row
INSERT zdemo_abap_carr FROM @( VALUE #( carrid = 'XX' carrname = 'Test' ) ).

" From structure
INSERT dbtab FROM @struc.

" Multiple rows
INSERT zdemo_abap_carr FROM TABLE @itab.

" Check sy-subrc: 0 = success, 4 = duplicate key
IF sy-subrc <> 0.
  " Handle error
ENDIF.
```

### UPDATE

```abap
" Update with SET
UPDATE zdemo_abap_carr
  SET carrname = 'New Name', url = 'new_url'
  WHERE carrid = 'XX'.

" From structure
UPDATE dbtab FROM @struc.

" From table
UPDATE dbtab FROM TABLE @itab.

" sy-dbcnt contains number of updated rows
```

### MODIFY (Insert or Update)

```abap
" Single row
MODIFY dbtab FROM @struc.

" Multiple rows
MODIFY dbtab FROM TABLE @itab.

" Inserts if key doesn't exist, updates if it does
```

### DELETE

```abap
" With WHERE
DELETE FROM zdemo_abap_carr WHERE carrid = 'XX'.

" From structure (by key)
DELETE dbtab FROM @struc.

" From table
DELETE dbtab FROM TABLE @itab.

" All rows (caution!)
DELETE FROM dbtab.
```

---

## INDICATORS for Partial Updates

```abap
" Only update specific fields based on indicator structure
DATA: struc TYPE zdemo_abap_struc,
      ind   TYPE zdemo_abap_struc_indicators.

struc-carrid = 'XX'.
struc-carrname = 'Updated Name'.
ind-carrname = abap_true.  " Only update carrname

UPDATE dbtab FROM @struc INDICATORS SET STRUCTURE ind.
```

---

## Client Handling

```abap
" USING CLIENT (specific client)
SELECT * FROM dbtab
  USING CLIENT @( '100' )
  INTO TABLE @DATA(client100_data).

" USING ALL CLIENTS (cross-client)
SELECT * FROM dbtab
  USING ALL CLIENTS
  INTO TABLE @DATA(all_clients_data).

" Note: Requires authorization
```

---

## Performance Tips

1. **Select only needed fields** - avoid SELECT *
2. **Use appropriate indexes** - check execution plan
3. **Limit result sets** - use UP TO n ROWS when appropriate
4. **Use JOINs instead of nested SELECTs**
5. **FOR ALL ENTRIES** - ensure table is not empty
6. **Avoid client-dependent SELECT in loops**
7. **Use aggregates in database** - not in ABAP
8. **Package processing** for large data sets
