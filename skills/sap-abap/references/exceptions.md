# ABAP Exception Handling - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/27_Exceptions.md

---

## Exception Class Hierarchy

All exception classes inherit from one of three abstract superclasses, all derived from `CX_ROOT`:

### CX_STATIC_CHECK
- Must be handled locally or declared in procedure interface
- Compile-time static checks enforce handling
- Example: `CX_UUID_ERROR`

```abap
" Declaration in method signature
METHODS get_uuid
  RETURNING VALUE(uuid) TYPE sysuuid_x16
  RAISING cx_uuid_error.

" Calling code must handle
TRY.
    DATA(uuid) = get_uuid( ).
  CATCH cx_uuid_error.
    " Handle exception
ENDTRY.
```

### CX_DYNAMIC_CHECK
- For exceptions preventable through preconditions
- No compile-time enforcement
- Runtime checks only when exception is raised
- Example: `CX_SY_ZERODIVIDE`

```abap
" Declaration (optional but recommended)
METHODS divide
  IMPORTING num1 TYPE i num2 TYPE i
  RETURNING VALUE(result) TYPE decfloat34
  RAISING cx_sy_zerodivide.
```

### CX_NO_CHECK
- For errors that can occur anytime
- Always implicitly declared in all interfaces
- Cannot be prevented by checks
- Example: Memory shortage

---

## Exception Class Components

### Inherited Methods (from CX_ROOT)

```abap
" Get exception text
DATA(text) = exception->get_text( ).

" Get source position
exception->get_source_position(
  IMPORTING
    program_name = DATA(program)
    include_name = DATA(include)
    source_line  = DATA(line) ).
```

### Common Attributes

- `textid`: Key for exception text in T100 table
- `previous`: Reference to previous exception (chaining)
- `is_resumable`: Flag for resumable exceptions

---

## TRY-CATCH Structure

### Basic Syntax

```abap
TRY.
    " Risky code
    DATA(result) = 1 / 0.
  CATCH cx_sy_zerodivide.
    " Handle division by zero
ENDTRY.
```

### Multiple Exception Types

```abap
TRY.
    " Code that might raise various exceptions
  CATCH cx_sy_zerodivide cx_sy_arithmetic_overflow.
    " Handle arithmetic errors
  CATCH cx_sy_conversion_error.
    " Handle conversion errors
  CATCH cx_root.
    " Handle any exception
ENDTRY.
```

### CATCH INTO (Get Exception Object)

```abap
TRY.
    DATA(line) = itab[ 999 ].
  CATCH cx_sy_itab_line_not_found INTO DATA(exc).
    DATA(msg) = exc->get_text( ).
    exc->get_source_position(
      IMPORTING
        program_name = DATA(prog)
        source_line  = DATA(line_no) ).
ENDTRY.
```

### Exception Hierarchy

```abap
" Use parent class to catch multiple child exceptions
TRY.
    DATA(result) = 1 / 0.
  CATCH cx_sy_arithmetic_error.
    " Catches both CX_SY_ZERODIVIDE and CX_SY_ARITHMETIC_OVERFLOW
ENDTRY.
```

---

## Raising Exceptions

### RAISE EXCEPTION TYPE

```abap
RAISE EXCEPTION TYPE cx_sy_zerodivide.
```

### With Exception Object

```abap
DATA(exc) = NEW cx_sy_zerodivide( ).
RAISE EXCEPTION exc.

" Inline
RAISE EXCEPTION NEW cx_sy_zerodivide( ).
```

### With Parameters

```abap
RAISE EXCEPTION TYPE zcx_my_error
  EXPORTING
    textid = zcx_my_error=>specific_error
    param1 = 'value1'
    param2 = 'value2'.
```

### In COND/SWITCH

```abap
DATA(result) = COND string(
  WHEN valid THEN process( )
  ELSE THROW zcx_validation_error( ) ).

DATA(value) = SWITCH #( code
  WHEN 1 THEN 'A'
  WHEN 2 THEN 'B'
  ELSE THROW zcx_invalid_code( ) ).
```

---

## CLEANUP Block

Executes when exception raised but handled externally:

```abap
TRY.
    TRY.
        " Inner TRY
        process_data( ).
      CATCH cx_sy_zerodivide.
        " Handle locally
      CLEANUP.
        " Cleanup when exception propagates out
        cleanup_resources( ).
    ENDTRY.
  CATCH cx_sy_itab_line_not_found.
    " Handle external exception
ENDTRY.
```

### CLEANUP INTO

```abap
CLEANUP INTO DATA(cleanup_exc).
  DATA(exc_class) = cl_abap_classdescr=>get_class_name( cleanup_exc ).
  " Perform cleanup based on exception type
```

---

## RETRY Statement

Exits CATCH block and restarts TRY block:

```abap
DATA retry_count TYPE i.
TRY.
    result = risky_operation( ).
  CATCH cx_sy_zerodivide.
    retry_count += 1.
    IF retry_count < 3.
      RETRY.  " Restart TRY block
    ENDIF.
ENDTRY.
```

---

## Resumable Exceptions

### Declaration

```abap
METHODS process
  RAISING RESUMABLE(zcx_my_resumable_error).
```

### Raising Resumable

```abap
METHOD process.
  IF error_condition.
    RAISE RESUMABLE EXCEPTION TYPE zcx_my_resumable_error.
    " Execution continues here if RESUME called
    result = fallback_value.
  ENDIF.
ENDMETHOD.
```

### CATCH BEFORE UNWIND

```abap
TRY.
    process( ).
  CATCH BEFORE UNWIND zcx_my_resumable_error INTO DATA(exc).
    IF exc->is_resumable = abap_true.
      log_warning( exc->get_text( ) ).
      RESUME.  " Continue after RAISE statement
    ENDIF.
ENDTRY.
```

### In COND/SWITCH

```abap
DATA(value) = COND #(
  WHEN condition THEN result
  ELSE THROW RESUMABLE zcx_my_error( ) ).
```

---

## Exception Chaining (PREVIOUS)

```abap
TRY.
    TRY.
        RAISE EXCEPTION TYPE cx_sy_zerodivide.
      CATCH cx_sy_zerodivide INTO DATA(inner).
        RAISE EXCEPTION TYPE cx_sy_arithmetic_overflow
          EXPORTING previous = inner.
    ENDTRY.
  CATCH cx_sy_arithmetic_overflow INTO DATA(outer).
    " Access chain
    DATA(current) = CAST cx_root( outer ).
    WHILE current IS BOUND.
      out->write( current->get_text( ) ).
      current = current->previous.
    ENDWHILE.
ENDTRY.
```

---

## Using Messages as Exception Texts

### IF_T100_MESSAGE Interface

```abap
" Exception class with T100 messages
CLASS zcx_my_error DEFINITION INHERITING FROM cx_static_check.
  PUBLIC SECTION.
    INTERFACES if_t100_message.

    CONSTANTS:
      BEGIN OF error_001,
        msgid TYPE symsgid VALUE 'ZMSG',
        msgno TYPE symsgno VALUE '001',
        attr1 TYPE scx_attrname VALUE '',
        attr2 TYPE scx_attrname VALUE '',
        attr3 TYPE scx_attrname VALUE '',
        attr4 TYPE scx_attrname VALUE '',
      END OF error_001.
ENDCLASS.
```

### IF_T100_DYN_MSG Interface (Recommended)

```abap
" With MESSAGE addition
RAISE EXCEPTION TYPE zcx_error
  MESSAGE e002(zmsg).

" With placeholder values
RAISE EXCEPTION TYPE zcx_error
  MESSAGE e003(zmsg) WITH 'value1' 'value2'.

" MESSAGE ID TYPE NUMBER WITH
RAISE EXCEPTION TYPE zcx_error
  MESSAGE ID 'ZMSG' TYPE 'E' NUMBER '004'
  WITH value1 value2.

" USING MESSAGE (from sy-msg* fields)
MESSAGE e005(zmsg) WITH 'param' INTO DATA(msg).
RAISE EXCEPTION TYPE zcx_error USING MESSAGE.
```

### In COND/SWITCH

```abap
DATA(result) = COND #(
  WHEN valid THEN value
  ELSE THROW zcx_error( MESSAGE e001(zmsg) ) ).

DATA(result) = SWITCH #( code
  WHEN 1 THEN 'A'
  ELSE THROW zcx_error(
    MESSAGE ID 'ZMSG' TYPE 'E' NUMBER '002'
    WITH code ) ).
```

---

## Runtime Errors

### RAISE SHORTDUMP

```abap
" Force runtime error
RAISE SHORTDUMP TYPE cx_sy_zerodivide.
```

### In COND/SWITCH

```abap
DATA(result) = COND #(
  WHEN valid THEN value
  ELSE THROW SHORTDUMP zcx_critical_error( ) ).
```

---

## Assertions

```abap
" Assert condition - fails = runtime error ASSERTION_FAILED
ASSERT count > 0.
ASSERT table IS NOT INITIAL.
ASSERT ref IS BOUND.
```

---

## Common Exception Classes

| Exception | Cause | Prevention |
|-----------|-------|------------|
| `CX_SY_ZERODIVIDE` | Division by zero | Check divisor |
| `CX_SY_ARITHMETIC_OVERFLOW` | Numeric overflow | Use larger type |
| `CX_SY_ITAB_LINE_NOT_FOUND` | Table line not found | Use OPTIONAL/DEFAULT |
| `CX_SY_RANGE_OUT_OF_BOUNDS` | Invalid index/offset | Validate bounds |
| `CX_SY_CONVERSION_NO_NUMBER` | Invalid number string | Validate input |
| `CX_SY_REF_IS_INITIAL` | Dereference initial ref | Check IS BOUND |
| `CX_SY_CONVERSION_CODEPAGE` | Character encoding error | Check encoding |
| `CX_SY_DYN_CALL_ILLEGAL_TYPE` | Wrong parameter type | Check types |
| `CX_SY_MOVE_CAST_ERROR` | Invalid CAST | Check type compatibility |
| `CX_UUID_ERROR` | UUID generation failed | Handle appropriately |

---

## RAP Messages (%msg)

```abap
" In RAP handler methods
reported-root = VALUE #( (
  %tky = entity-%tky
  %msg = new_message_with_text(
    severity = if_abap_behv_message=>severity-error
    text = 'Validation failed!' ) ) ).

" Severity levels
" if_abap_behv_message=>severity-error
" if_abap_behv_message=>severity-warning
" if_abap_behv_message=>severity-information
" if_abap_behv_message=>severity-success
```

---

## Best Practices

1. **Choose appropriate exception category**
   - `CX_STATIC_CHECK`: Must be handled explicitly
   - `CX_DYNAMIC_CHECK`: Preventable errors
   - `CX_NO_CHECK`: System errors

2. **Use specific exception classes** rather than `CX_ROOT`

3. **Include meaningful information** in exception text

4. **Use PREVIOUS** for exception chaining

5. **Custom attributes** should be `READ-ONLY`

6. **Document exceptions** in method signatures

7. **Handle exceptions at appropriate level** - not too early, not too late
