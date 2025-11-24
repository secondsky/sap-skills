# SQLScript Exception Handling Reference

## Overview

SAP HANA SQLScript provides four primary mechanisms for exception handling:
1. **EXIT HANDLER** - Handle exceptions and suspend execution
2. **CONTINUE HANDLER** - Handle exceptions and continue execution
3. **CONDITION** - Define named conditions for error codes
4. **SIGNAL/RESIGNAL** - Throw and re-throw exceptions

---

## EXIT HANDLER

### Purpose
EXIT HANDLER catches exceptions, suspends procedure execution, and performs specified recovery actions.

### Syntax

```sql
DECLARE EXIT HANDLER FOR <condition_value>
  <statement>;

-- Or with block
DECLARE EXIT HANDLER FOR <condition_value>
BEGIN
  <statements>
END;
```

### Condition Values

| Condition | Description |
|-----------|-------------|
| `SQLEXCEPTION` | Catches any SQL exception |
| `SQL_ERROR_CODE <number>` | Catches specific error code |
| `<condition_name>` | Catches user-defined condition |

### Placement Rule

> **Important:** EXIT HANDLER must be declared after all other DECLARE statements but before any procedural code begins.

```sql
BEGIN
  -- 1. Variable declarations
  DECLARE lv_count INTEGER;

  -- 2. Condition declarations
  DECLARE my_error CONDITION FOR SQL_ERROR_CODE 301;

  -- 3. EXIT HANDLER declarations (must be last DECLARE)
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
    SELECT ::SQL_ERROR_CODE, ::SQL_ERROR_MESSAGE FROM DUMMY;

  -- 4. Procedural code starts here
  INSERT INTO "TABLE" VALUES (1, 'test');
END;
```

### Error Information Access

| Variable | Type | Description |
|----------|------|-------------|
| `::SQL_ERROR_CODE` | INTEGER | Numeric error code of caught exception |
| `::SQL_ERROR_MESSAGE` | NVARCHAR | Error message text |

### Basic Example

```sql
CREATE PROCEDURE safe_insert (
  IN iv_id INTEGER,
  IN iv_name NVARCHAR(100)
)
LANGUAGE SQLSCRIPT AS
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    -- Log error to table
    INSERT INTO "ERROR_LOG" (
      error_code,
      error_message,
      created_at
    ) VALUES (
      ::SQL_ERROR_CODE,
      ::SQL_ERROR_MESSAGE,
      CURRENT_TIMESTAMP
    );
    -- Return error info
    SELECT ::SQL_ERROR_CODE AS err_code,
           ::SQL_ERROR_MESSAGE AS err_msg
    FROM DUMMY;
  END;

  -- Main logic that may throw exception
  INSERT INTO "CUSTOMERS" (id, name) VALUES (:iv_id, :iv_name);
END;
```

### Handling Specific Error Codes

```sql
CREATE PROCEDURE handle_duplicate (IN iv_id INTEGER)
LANGUAGE SQLSCRIPT AS
BEGIN
  -- Handle only unique constraint violations
  DECLARE EXIT HANDLER FOR SQL_ERROR_CODE 301
  BEGIN
    SELECT 'Record already exists with ID: ' || :iv_id AS message
    FROM DUMMY;
  END;

  INSERT INTO "MYTABLE" (id) VALUES (:iv_id);
END;
```

### Multiple Handlers

```sql
CREATE PROCEDURE multi_handler_example ()
LANGUAGE SQLSCRIPT AS
BEGIN
  DECLARE duplicate_key CONDITION FOR SQL_ERROR_CODE 301;
  DECLARE no_data CONDITION FOR SQL_ERROR_CODE 1299;

  -- Specific handler for duplicates
  DECLARE EXIT HANDLER FOR duplicate_key
    SELECT 'Duplicate key error' AS error FROM DUMMY;

  -- Specific handler for no data
  DECLARE EXIT HANDLER FOR no_data
    SELECT 'No data found' AS error FROM DUMMY;

  -- Generic handler for all other errors
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
    SELECT 'Unexpected error: ' || ::SQL_ERROR_MESSAGE AS error FROM DUMMY;

  -- Procedural code
  INSERT INTO "TABLE1" VALUES (1);
  SELECT * FROM "TABLE2" WHERE id = 999;
END;
```

---

## CONDITION

### Purpose
CONDITIONS allow you to assign user-friendly names to SQL error codes for cleaner, more readable code.

> **Note:** CONDITION declaration is optional. You can use `SQL_ERROR_CODE <number>` directly in EXIT HANDLER declarations. However, named conditions improve code readability and maintainability.

### Syntax

```sql
DECLARE <condition_name> CONDITION FOR SQL_ERROR_CODE <number>;
```

### Example

```sql
CREATE PROCEDURE condition_example ()
LANGUAGE SQLSCRIPT AS
BEGIN
  -- Define named conditions
  DECLARE unique_violation CONDITION FOR SQL_ERROR_CODE 301;
  DECLARE invalid_table CONDITION FOR SQL_ERROR_CODE 259;
  DECLARE permission_denied CONDITION FOR SQL_ERROR_CODE 258;

  -- Use in EXIT HANDLER
  DECLARE EXIT HANDLER FOR unique_violation
    SELECT 'Cannot insert duplicate record' AS message FROM DUMMY;

  DECLARE EXIT HANDLER FOR invalid_table
    SELECT 'Table does not exist' AS message FROM DUMMY;

  DECLARE EXIT HANDLER FOR permission_denied
    SELECT 'Access denied to object' AS message FROM DUMMY;

  -- Procedural code
  INSERT INTO "PROTECTED_TABLE" VALUES (1, 'test');
END;
```

---

## SIGNAL

### Purpose
SIGNAL explicitly throws an exception with a user-defined error code (range: 10000-19999).

### Syntax

```sql
-- Using condition name
SIGNAL <condition_name>;
SIGNAL <condition_name> SET MESSAGE_TEXT = '<message>';

-- Using error code directly
SIGNAL SQL_ERROR_CODE <number> SET MESSAGE_TEXT = '<message>';
```

### User-Defined Error Code Range

| Range | Usage |
|-------|-------|
| 10000 - 19999 | User-defined exceptions |

### Example

```sql
CREATE PROCEDURE validate_input (IN iv_amount DECIMAL(15,2))
LANGUAGE SQLSCRIPT AS
BEGIN
  -- Define custom error condition
  DECLARE invalid_amount CONDITION FOR SQL_ERROR_CODE 10001;

  DECLARE EXIT HANDLER FOR invalid_amount
    SELECT 'Validation failed: ' || ::SQL_ERROR_MESSAGE AS error FROM DUMMY;

  -- Validate input
  IF :iv_amount < 0 THEN
    SIGNAL invalid_amount SET MESSAGE_TEXT = 'Amount cannot be negative';
  END IF;

  IF :iv_amount > 1000000 THEN
    SIGNAL invalid_amount SET MESSAGE_TEXT = 'Amount exceeds maximum limit';
  END IF;

  -- Continue with valid input
  INSERT INTO "TRANSACTIONS" (amount) VALUES (:iv_amount);
END;
```

### SIGNAL Without Condition

```sql
-- Throw exception with error code directly
IF :lv_count = 0 THEN
  SIGNAL SQL_ERROR_CODE 10002 SET MESSAGE_TEXT = 'No records found for processing';
END IF;
```

---

## RESIGNAL

### Purpose
RESIGNAL re-throws an exception from within an EXIT HANDLER, allowing the exception to propagate to the caller.

### Syntax

```sql
-- Re-throw current exception
RESIGNAL;

-- Re-throw with different condition
RESIGNAL <condition_name>;

-- Re-throw with modified message
RESIGNAL SET MESSAGE_TEXT = '<new_message>';
```

### Restriction

> **Important:** RESIGNAL can only be used within an EXIT HANDLER block.

### Example: Logging and Re-throwing

```sql
CREATE PROCEDURE process_with_logging ()
LANGUAGE SQLSCRIPT AS
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    -- Log the error first
    INSERT INTO "ERROR_LOG" (
      procedure_name,
      error_code,
      error_message,
      logged_at
    ) VALUES (
      'process_with_logging',
      ::SQL_ERROR_CODE,
      ::SQL_ERROR_MESSAGE,
      CURRENT_TIMESTAMP
    );

    -- Re-throw to caller
    RESIGNAL;
  END;

  -- Risky operation
  DELETE FROM "IMPORTANT_TABLE" WHERE status = 'OLD';
END;
```

### Example: Wrapping Exceptions

```sql
CREATE PROCEDURE wrap_exception ()
LANGUAGE SQLSCRIPT AS
BEGIN
  DECLARE business_error CONDITION FOR SQL_ERROR_CODE 10100;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    -- Wrap technical error as business error
    RESIGNAL business_error
      SET MESSAGE_TEXT = 'Business operation failed: ' || ::SQL_ERROR_MESSAGE;
  END;

  -- Technical operation
  UPDATE "ACCOUNTS" SET balance = balance - 100 WHERE id = 1;
END;
```

---

## Common SQL Error Codes

| Code | Description |
|------|-------------|
| 258 | Insufficient privilege |
| 259 | Invalid table name |
| 260 | Invalid column name |
| 261 | Invalid index name |
| 301 | Unique constraint violation |
| 339 | Foreign key constraint violation |
| 362 | NOT NULL constraint violation |
| 1299 | No data found |
| 1304 | Resource busy |
| 10000-19999 | User-defined errors |

---

## Complete Error Handling Pattern

```sql
CREATE PROCEDURE complete_error_handling (
  IN iv_customer_id INTEGER,
  IN iv_amount DECIMAL(15,2),
  OUT ov_status NVARCHAR(20),
  OUT ov_message NVARCHAR(500)
)
LANGUAGE SQLSCRIPT AS
BEGIN
  -- Define conditions
  DECLARE duplicate_key CONDITION FOR SQL_ERROR_CODE 301;
  DECLARE fk_violation CONDITION FOR SQL_ERROR_CODE 339;
  DECLARE invalid_input CONDITION FOR SQL_ERROR_CODE 10001;

  -- Handle duplicate key
  DECLARE EXIT HANDLER FOR duplicate_key
  BEGIN
    ov_status = 'ERROR';
    ov_message = 'Transaction already exists for this customer';
  END;

  -- Handle foreign key violation
  DECLARE EXIT HANDLER FOR fk_violation
  BEGIN
    ov_status = 'ERROR';
    ov_message = 'Customer ID does not exist';
  END;

  -- Handle validation errors
  DECLARE EXIT HANDLER FOR invalid_input
  BEGIN
    ov_status = 'ERROR';
    ov_message = ::SQL_ERROR_MESSAGE;
  END;

  -- Handle all other errors
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    -- Log unexpected errors
    INSERT INTO "ERROR_LOG" VALUES (
      ::SQL_ERROR_CODE,
      ::SQL_ERROR_MESSAGE,
      CURRENT_TIMESTAMP
    );
    ov_status = 'ERROR';
    ov_message = 'Unexpected error occurred. Please contact support.';
  END;

  -- Input validation
  IF :iv_amount <= 0 THEN
    SIGNAL invalid_input SET MESSAGE_TEXT = 'Amount must be positive';
  END IF;

  IF :iv_customer_id IS NULL THEN
    SIGNAL invalid_input SET MESSAGE_TEXT = 'Customer ID is required';
  END IF;

  -- Main business logic
  INSERT INTO "TRANSACTIONS" (customer_id, amount, created_at)
  VALUES (:iv_customer_id, :iv_amount, CURRENT_TIMESTAMP);

  -- Success
  ov_status = 'SUCCESS';
  ov_message = 'Transaction recorded successfully';
END;
```

---

## Best Practices

### 1. Always Handle SQLEXCEPTION
```sql
-- Catch-all handler prevents unhandled exceptions
DECLARE EXIT HANDLER FOR SQLEXCEPTION
  -- Log and/or notify
```

### 2. Use Named Conditions
```sql
-- Good: Clear intent
DECLARE duplicate_key CONDITION FOR SQL_ERROR_CODE 301;
DECLARE EXIT HANDLER FOR duplicate_key ...

-- Avoid: Magic numbers
DECLARE EXIT HANDLER FOR SQL_ERROR_CODE 301 ...
```

### 3. Log Before RESIGNAL
```sql
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
  -- Log first
  INSERT INTO error_log VALUES (...);
  -- Then re-throw
  RESIGNAL;
END;
```

### 4. Use User-Defined Codes for Business Logic
```sql
-- Reserve 10000-19999 for application-specific errors
DECLARE validation_error CONDITION FOR SQL_ERROR_CODE 10001;
DECLARE business_rule_error CONDITION FOR SQL_ERROR_CODE 10002;
```

### 5. Provide Meaningful Messages
```sql
SIGNAL validation_error
  SET MESSAGE_TEXT = 'Order quantity (' || :lv_qty || ') exceeds available stock (' || :lv_stock || ')';
```
