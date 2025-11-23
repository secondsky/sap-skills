# Program Flow Logic - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/13_Program_Flow_Logic.md

---

## IF Statements

### Basic Syntax

```abap
IF condition.
  " executes if true
ELSEIF other_condition.
  " executes if first false, this true
ELSE.
  " executes if all false
ENDIF.
```

### Example

```abap
DATA(time) = cl_abap_context_info=>get_system_time( ).

IF time BETWEEN '050000' AND '115959'.
  DATA(greeting) = `Good morning`.
ELSEIF time BETWEEN '120000' AND '175959'.
  greeting = `Good afternoon`.
ELSEIF time BETWEEN '180000' AND '215959'.
  greeting = `Good evening`.
ELSE.
  greeting = `Good night`.
ENDIF.
```

---

## Comparison Operators

| Operator | Alternative | Description |
|----------|-------------|-------------|
| `=` | `EQ` | Equal |
| `<>` | `NE` | Not equal |
| `<` | `LT` | Less than |
| `>` | `GT` | Greater than |
| `<=` | `LE` | Less or equal |
| `>=` | `GE` | Greater or equal |

---

## Predicate Expressions

```abap
IF value IS INITIAL.         " Check initial value
IF dref IS BOUND.             " Check data reference
IF oref IS INSTANCE OF class. " Check object type
IF <fs> IS ASSIGNED.          " Check field symbol
IF line_exists( itab[ 1 ] ).  " Check table line
```

---

## Boolean Functions

```abap
" Returns 'X' or blank (string type)
IF boolc( condition ) = 'X'.

" Returns abap_true or abap_false
IF xsdbool( condition ) = abap_true.
```

---

## COND Operator

```abap
DATA(result) = COND string(
  WHEN score >= 90 THEN `A`
  WHEN score >= 80 THEN `B`
  WHEN score >= 70 THEN `C`
  ELSE `F` ).
```

---

## CASE Statement

```abap
CASE value.
  WHEN 1.
    " Handle 1
  WHEN 2 OR 3.
    " Handle 2 or 3
  WHEN OTHERS.
    " Handle all other cases
ENDCASE.
```

---

## CASE TYPE OF

```abap
DATA(type_desc) = cl_abap_typedescr=>describe_by_data( data ).

CASE TYPE OF type_desc.
  WHEN TYPE cl_abap_elemdescr.
    " Elementary type
  WHEN TYPE cl_abap_structdescr.
    " Structure
  WHEN TYPE cl_abap_tabledescr.
    " Table
  WHEN OTHERS.
    " Other types
ENDCASE.
```

---

## SWITCH Operator

```abap
DATA(text) = SWITCH string( code
  WHEN 1 THEN `One`
  WHEN 2 THEN `Two`
  WHEN 3 OR 4 THEN `Three or Four`
  ELSE `Other` ).
```

---

## DO Loop

### Basic DO

```abap
DO.
  " Infinite loop - must EXIT
  IF sy-index > 10.
    EXIT.
  ENDIF.
ENDDO.
```

### DO with TIMES

```abap
DO 5 TIMES.
  " Executes exactly 5 times
  " sy-index contains current iteration (1-5)
ENDDO.
```

---

## WHILE Loop

```abap
WHILE lines( itab ) < 10.
  APPEND VALUE #( sy-index ) TO itab.
ENDWHILE.
```

---

## Loop Control Statements

### CONTINUE - Skip to Next Iteration

```abap
DO 10 TIMES.
  IF sy-index MOD 2 = 0.
    CONTINUE.  " Skip even numbers
  ENDIF.
  " Process odd numbers only
ENDDO.
```

### CHECK - Conditional Skip

```abap
DO 10 TIMES.
  CHECK sy-index MOD 2 <> 0.  " Skip if even
  " Process odd numbers only
ENDDO.
```

### EXIT - Leave Loop

```abap
DO.
  IF sy-index = 5.
    EXIT.  " Leave loop
  ENDIF.
ENDDO.
```

---

## Function Modules

### Static Call

```abap
CALL FUNCTION 'FUNCTION_NAME'
  EXPORTING
    param1 = value1
  IMPORTING
    param2 = result
  EXCEPTIONS
    error1 = 1.

IF sy-subrc <> 0.
  " Handle error
ENDIF.
```

### With Class-Based Exceptions

```abap
TRY.
    CALL FUNCTION 'FUNCTION_NAME'
      EXPORTING
        param1 = value1
      IMPORTING
        param2 = result.
  CATCH cx_some_exception INTO DATA(exc).
    " Handle exception
ENDTRY.
```

### Dynamic Call

```abap
DATA(func_name) = 'FUNCTION_NAME'.

CALL FUNCTION func_name
  EXPORTING param1 = value1
  IMPORTING param2 = result.

" With parameter table
DATA(ptab) = VALUE abap_func_parmbind_tab(
  ( name = 'PARAM1' kind = abap_func_exporting value = NEW string( 'value' ) )
  ( name = 'PARAM2' kind = abap_func_importing value = NEW string( ) ) ).

CALL FUNCTION func_name PARAMETER-TABLE ptab.
```

---

## RETURN Statement

```abap
METHOD calculate.
  IF invalid_input.
    RETURN.  " Exit method
  ENDIF.

  " Continue processing
ENDMETHOD.

" With returning value
METHOD get_result.
  RETURN value * 2.  " Return and exit
ENDMETHOD.
```

---

## WAIT Statement

```abap
WAIT UP TO 1 SECONDS.
WAIT UP TO 500 MILLISECONDS.
```

---

## ASSERT Statement

```abap
ASSERT condition.  " Runtime error if false

" Use for debugging invariants
ASSERT lines( itab ) > 0.
```

---

## Best Practices

1. **Limit nesting** to 5 levels maximum
2. **Outsource complexity** into methods
3. **Use RETURN** instead of EXIT/CHECK outside loops
4. **Prefer class methods** over function modules
5. **Avoid redundant conditions** in IF chains
