# SQLScript Complete Syntax Reference

## Procedure Syntax

### CREATE PROCEDURE

```sql
CREATE [OR REPLACE] PROCEDURE <schema_name>.<procedure_name>
  (
    [IN <parameter_name> <sql_type> [DEFAULT <default_value>]],
    [OUT <parameter_name> <sql_type>],
    [INOUT <parameter_name> <sql_type>]
  )
  LANGUAGE SQLSCRIPT
  [SQL SECURITY {DEFINER | INVOKER}]
  [DEFAULT SCHEMA <schema_name>]
  [READS SQL DATA]
  [WITH RESULT VIEW <view_name>]
  [DETERMINISTIC]
AS
BEGIN
  [SEQUENTIAL EXECUTION]
  <procedure_body>
END;
```

### Parameter Modes

| Mode | Description |
|------|-------------|
| `IN` | Input parameter (read-only within procedure) |
| `OUT` | Output parameter (write-only, initial value undefined) |
| `INOUT` | Input and output (read/write) |

### Security Modes

| Mode | Description |
|------|-------------|
| `SQL SECURITY DEFINER` | Execute with privileges of procedure owner |
| `SQL SECURITY INVOKER` | Execute with privileges of caller |

---

## Function Syntax

### Scalar User-Defined Function

```sql
CREATE [OR REPLACE] FUNCTION <schema_name>.<function_name>
  (
    <parameter_name> <sql_type> [DEFAULT <value>],
    ...
  )
RETURNS <return_type>
LANGUAGE SQLSCRIPT
[SQL SECURITY {DEFINER | INVOKER}]
[DEFAULT SCHEMA <schema_name>]
[DETERMINISTIC]
AS
BEGIN
  DECLARE result <return_type>;
  -- function logic
  RETURN result;
END;
```

### Table User-Defined Function

```sql
CREATE [OR REPLACE] FUNCTION <schema_name>.<function_name>
  (
    <parameter_name> <sql_type> [DEFAULT <value>],
    ...
  )
RETURNS TABLE (
  <column_name> <sql_type>,
  ...
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER
READS SQL DATA
[DEFAULT SCHEMA <schema_name>]
AS
BEGIN
  RETURN SELECT <columns> FROM <source>;
END;
```

---

## Anonymous Block Syntax

```sql
DO [(<parameter_clause>)]
BEGIN [SEQUENTIAL EXECUTION]
  <block_body>
END;
```

### With Parameters

```sql
DO (
  IN iv_input INTEGER => 100,
  OUT ov_output INTEGER => ?
)
BEGIN
  ov_output = :iv_input * 2;
END;
```

---

## Variable Declaration Syntax

### Scalar Variables

```sql
DECLARE <variable_name> <sql_type> [:= <initial_value>];
DECLARE <var1>, <var2> <sql_type>;  -- Multiple variables same type
```

### Constant Variables

```sql
DECLARE <constant_name> CONSTANT <sql_type> := <value>;
```

### Table Variables

```sql
-- Inline definition
DECLARE <table_var> TABLE (
  <column_name> <sql_type> [NOT NULL],
  ...
);

-- From existing table structure
DECLARE <table_var> TABLE LIKE <table_name>;
DECLARE <table_var> TABLE LIKE :<other_table_var>;

-- From table type
DECLARE <table_var> <table_type_name>;
```

### Array Variables

```sql
DECLARE <array_name> <sql_type> ARRAY;
DECLARE <array_name> <sql_type> ARRAY := ARRAY(<value1>, <value2>, ...);
```

---

## Assignment Syntax

### Scalar Assignment

```sql
<variable> := <expression>;
<variable> = <expression>;  -- Alternative syntax
```

### SELECT INTO

```sql
SELECT <column> INTO <variable> FROM <table> [WHERE ...];
SELECT <col1>, <col2> INTO <var1>, <var2> FROM <table>;
```

### Table Variable Assignment

```sql
<table_var> = SELECT <columns> FROM <table>;
<table_var> = :<other_table_var>;
```

---

## Control Flow Syntax

### IF-THEN-ELSE

```sql
IF <condition> THEN
  <statements>
[ELSEIF <condition> THEN
  <statements>]
[ELSE
  <statements>]
END IF;
```

### CASE Expression

```sql
-- Simple CASE
CASE <expression>
  WHEN <value1> THEN <result1>
  WHEN <value2> THEN <result2>
  ELSE <default_result>
END

-- Searched CASE
CASE
  WHEN <condition1> THEN <result1>
  WHEN <condition2> THEN <result2>
  ELSE <default_result>
END
```

### WHILE Loop

```sql
WHILE <condition> DO
  <statements>
END WHILE;
```

### DO n TIMES Loop

Repeat a block a fixed number of times:

```sql
DO <n> TIMES
BEGIN
  <statements>
END;
```

**Example:**
```sql
DO 10 TIMES
BEGIN
  INSERT INTO "LOG_TABLE" (message) VALUES ('Iteration');
END;
```

### FOR Loop

```sql
-- Numeric range
FOR <var> IN [REVERSE] <start>..<end> DO
  <statements>
END FOR;

-- Cursor iteration
FOR <row_var> AS <cursor_name> DO
  <statements using row_var.column_name>
END FOR;

-- Inline cursor
FOR <row_var> AS (SELECT <columns> FROM <table>) DO
  <statements>
END FOR;
```

### LOOP with EXIT

```sql
LOOP
  <statements>
  IF <condition> THEN
    BREAK;  -- or LEAVE
  END IF;
  [CONTINUE;]  -- Skip to next iteration
END LOOP;
```

---

## Cursor Syntax

### Declaration

```sql
DECLARE CURSOR <cursor_name> FOR
  <select_statement>;

-- With parameters
DECLARE CURSOR <cursor_name> (<param> <type>) FOR
  SELECT * FROM <table> WHERE col = :<param>;
```

### Operations

```sql
OPEN <cursor_name>;
OPEN <cursor_name> (<param_value>);

FETCH <cursor_name> INTO <var1>, <var2>, ...;

CLOSE <cursor_name>;
```

### Cursor Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `<cursor>::ISCLOSED` | BOOLEAN | TRUE if cursor is closed |
| `<cursor>::NOTFOUND` | BOOLEAN | TRUE if FETCH found no row |
| `<cursor>::ROWCOUNT` | INTEGER | Number of rows fetched |

---

## Table Type Syntax

### CREATE TYPE

```sql
CREATE TYPE <schema_name>.<type_name> AS TABLE (
  <column_name> <sql_type> [NOT NULL],
  ...
);
```

### DROP TYPE

```sql
DROP TYPE <schema_name>.<type_name> [CASCADE];
```

---

## Exception Handling Syntax

### EXIT HANDLER

```sql
DECLARE EXIT HANDLER FOR <condition>
  <statement>;

DECLARE EXIT HANDLER FOR <condition>
BEGIN
  <statements>
END;
```

### Condition Declaration

```sql
DECLARE <condition_name> CONDITION FOR SQL_ERROR_CODE <number>;
```

### SIGNAL

```sql
SIGNAL <condition_name>;
SIGNAL <condition_name> SET MESSAGE_TEXT = '<message>';
SIGNAL SQL_ERROR_CODE <number> SET MESSAGE_TEXT = '<message>';
```

### RESIGNAL

```sql
RESIGNAL;
RESIGNAL <condition_name>;
RESIGNAL SET MESSAGE_TEXT = '<message>';
```

---

## Table Variable Operators

### INSERT

```sql
:<table_var>.INSERT((<value1>, <value2>, ...));
:<table_var>.INSERT(:<other_table_var>);
:<table_var>.INSERT(:<other_table_var>, <row_number>);
```

### UPDATE

```sql
:<table_var>.UPDATE((<new_value1>, <new_value2>, ...), <row_number>);
```

### DELETE

```sql
:<table_var>.DELETE(<row_number>);
:<table_var>.DELETE(<start_row>, <count>);
```

### SEARCH

```sql
<position> = :<table_var>.SEARCH((<column_name>, <search_value>), <start_position>);
```

---

## UNNEST Function

Convert array to table:

```sql
UNNEST(<array1> [, <array2>, ...]) [WITH ORDINALITY]
  AS <table_alias> (<col1> [, <col2>, ...] [, <ordinality_col>])
```

**Example:**
```sql
DECLARE arr INTEGER ARRAY := ARRAY(10, 20, 30);
lt_result = SELECT * FROM UNNEST(:arr) AS t(value);
```

---

## Dynamic SQL Syntax

### EXECUTE IMMEDIATE

```sql
EXECUTE IMMEDIATE <sql_string>;
EXECUTE IMMEDIATE <sql_string> INTO <variable>;
EXECUTE IMMEDIATE <sql_string> USING <param1>, <param2>, ...;
```

### EXEC (Procedure Call)

```sql
EXEC <sql_string>;
```

> **Warning:** Avoid dynamic SQL for performance and security reasons.

---

## Operators

### Arithmetic
| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |

### String
| Operator | Description |
|----------|-------------|
| `\|\|` | Concatenation |

### Comparison
| Operator | Description |
|----------|-------------|
| `=` | Equal |
| `!=`, `<>` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |
| `BETWEEN` | Range check |
| `IN` | Set membership |
| `LIKE` | Pattern matching |
| `IS NULL` | NULL check |
| `IS NOT NULL` | Not NULL check |

### Logical
| Operator | Description |
|----------|-------------|
| `AND` | Logical AND |
| `OR` | Logical OR |
| `NOT` | Logical NOT |

---

## Comments

```sql
-- Single line comment

/* Multi-line
   comment */

/**
 * Documentation comment
 */
```
