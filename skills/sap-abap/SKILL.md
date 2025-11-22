---
name: sap-abap
description: |
  Comprehensive ABAP development skill for SAP systems. Use when writing ABAP code,
  working with internal tables, structures, ABAP SQL, object-oriented programming,
  RAP (RESTful Application Programming Model), CDS views, EML statements, ABAP Cloud
  development, string processing, dynamic programming, RTTI/RTTC, field symbols,
  data references, exception handling, or ABAP unit testing. Covers both classic
  ABAP and modern ABAP for Cloud Development patterns.
license: MIT
metadata:
  version: "1.0.0"
  last_updated: "2025-11-22"
  source: "https://github.com/SAP-samples/abap-cheat-sheets"
---

# SAP ABAP Development Skill

## Quick Reference

### Data Types and Declarations

```abap
" Elementary types
DATA num TYPE i VALUE 123.
DATA txt TYPE string VALUE `Hello`.
DATA flag TYPE abap_bool VALUE abap_true.

" Inline declarations
DATA(result) = some_method( ).
FINAL(immutable) = `constant value`.

" Structures
DATA: BEGIN OF struc,
        id   TYPE i,
        name TYPE string,
      END OF struc.

" Internal tables
DATA itab TYPE TABLE OF string WITH EMPTY KEY.
DATA sorted_tab TYPE SORTED TABLE OF struct WITH UNIQUE KEY id.
DATA hashed_tab TYPE HASHED TABLE OF struct WITH UNIQUE KEY id.
```

### Internal Tables - Essential Operations

```abap
" Create with VALUE
itab = VALUE #( ( col1 = 1 col2 = `a` )
                ( col1 = 2 col2 = `b` ) ).

" Read operations
DATA(line) = itab[ 1 ].                    " By index
DATA(line2) = itab[ col1 = 1 ].            " By key
READ TABLE itab INTO wa INDEX 1.
READ TABLE itab ASSIGNING FIELD-SYMBOL(<fs>) WITH KEY col1 = 1.

" Modify operations
MODIFY TABLE itab FROM VALUE #( col1 = 1 col2 = `updated` ).
itab[ 1 ]-col2 = `changed`.

" Loop processing
LOOP AT itab ASSIGNING FIELD-SYMBOL(<line>).
  <line>-col2 = to_upper( <line>-col2 ).
ENDLOOP.

" Delete
DELETE itab WHERE col1 > 5.
DELETE TABLE itab FROM VALUE #( col1 = 1 ).
```

### ABAP SQL Essentials

```abap
" SELECT into table
SELECT * FROM dbtab INTO TABLE @DATA(result_tab).

" SELECT with conditions
SELECT carrid, connid, fldate
  FROM zdemo_abap_fli
  WHERE carrid = 'LH'
  INTO TABLE @DATA(flights).

" Aggregate functions
SELECT carrid, COUNT(*) AS cnt, AVG( price ) AS avg_price
  FROM zdemo_abap_fli
  GROUP BY carrid
  INTO TABLE @DATA(stats).

" JOIN operations
SELECT a~carrid, a~connid, b~carrname
  FROM zdemo_abap_fli AS a
  INNER JOIN zdemo_abap_carr AS b ON a~carrid = b~carrid
  INTO TABLE @DATA(joined).

" Modification statements
INSERT dbtab FROM @struc.
UPDATE dbtab FROM @struc.
MODIFY dbtab FROM TABLE @itab.
DELETE FROM dbtab WHERE condition.
```

### Constructor Expressions

```abap
" VALUE - structures and tables
DATA(struc) = VALUE struct_type( comp1 = 1 comp2 = `text` ).
DATA(itab) = VALUE itab_type( ( a = 1 ) ( a = 2 ) ( a = 3 ) ).

" NEW - create instances
DATA(dref) = NEW i( 123 ).
DATA(oref) = NEW zcl_my_class( param = value ).

" CORRESPONDING - structure/table mapping
target = CORRESPONDING #( source ).
target = CORRESPONDING #( source MAPPING target_field = source_field ).

" COND/SWITCH - conditional values
DATA(text) = COND string( WHEN flag = abap_true THEN `Yes` ELSE `No` ).
DATA(result) = SWITCH #( code WHEN 1 THEN `A` WHEN 2 THEN `B` ELSE `X` ).

" CONV - type conversion
DATA(dec) = CONV decfloat34( 1 / 3 ).

" FILTER - table filtering
DATA(filtered) = FILTER #( itab WHERE status = 'A' ).

" REDUCE - aggregation
DATA(sum) = REDUCE i( INIT s = 0 FOR wa IN itab NEXT s = s + wa-amount ).
```

### Object-Oriented ABAP

```abap
" Class definition
CLASS zcl_example DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    METHODS constructor IMPORTING iv_name TYPE string.
    METHODS get_name RETURNING VALUE(rv_name) TYPE string.
    CLASS-METHODS factory RETURNING VALUE(ro_instance) TYPE REF TO zcl_example.
  PRIVATE SECTION.
    DATA mv_name TYPE string.
ENDCLASS.

CLASS zcl_example IMPLEMENTATION.
  METHOD constructor.
    mv_name = iv_name.
  ENDMETHOD.
  METHOD get_name.
    rv_name = mv_name.
  ENDMETHOD.
  METHOD factory.
    ro_instance = NEW #( `Default` ).
  ENDMETHOD.
ENDCLASS.

" Interface implementation
CLASS zcl_impl DEFINITION PUBLIC.
  PUBLIC SECTION.
    INTERFACES zif_my_interface.
ENDCLASS.
```

### Exception Handling

```abap
TRY.
    DATA(result) = risky_operation( ).
  CATCH cx_sy_zerodivide INTO DATA(exc).
    DATA(msg) = exc->get_text( ).
  CATCH cx_root INTO DATA(any_exc).
    " Handle any exception
  CLEANUP.
    " Cleanup code
ENDTRY.

" Raising exceptions
RAISE EXCEPTION TYPE zcx_my_exception
  EXPORTING textid = zcx_my_exception=>error_occurred.

" With COND/SWITCH
DATA(val) = COND #( WHEN valid THEN result
                    ELSE THROW zcx_my_exception( ) ).
```

### String Processing

```abap
" Concatenation
DATA(full) = first && ` ` && last.
txt &&= ` appended`.

" String templates
DATA(msg) = |Name: { name }, Date: { date DATE = ISO }|.

" Functions
DATA(upper) = to_upper( text ).
DATA(len) = strlen( text ).
DATA(found) = find( val = text sub = `search` ).
DATA(replaced) = replace( val = text sub = `old` with = `new` occ = 0 ).
DATA(parts) = segment( val = text index = 2 sep = `,` ).

" FIND/REPLACE statements
FIND ALL OCCURRENCES OF pattern IN text RESULTS DATA(matches).
REPLACE ALL OCCURRENCES OF old IN text WITH new.
```

### Dynamic Programming

```abap
" Field symbols
FIELD-SYMBOLS <fs> TYPE any.
ASSIGN struct-component TO <fs>.
ASSIGN struct-(comp_name) TO <fs>.  " Dynamic component

" Data references
DATA dref TYPE REF TO data.
dref = REF #( variable ).
CREATE DATA dref TYPE (type_name).
dref->* = value.

" RTTI - Get type information
DATA(tdo) = cl_abap_typedescr=>describe_by_data( dobj ).
DATA(components) = CAST cl_abap_structdescr( tdo )->components.

" RTTC - Create types dynamically
DATA(elem_type) = cl_abap_elemdescr=>get_string( ).
CREATE DATA dref TYPE HANDLE elem_type.
```

---

## Detailed References

For comprehensive information on specific topics, see:

### Core Language
- **Internal Tables**: `references/internal-tables.md` - Complete table operations, keys, grouping
- **Table Grouping**: `references/table-grouping.md` - GROUP BY loops, aggregation
- **ABAP SQL**: `references/abap-sql.md` - SELECT, JOINs, CTEs, aggregate functions
- **SQL Hierarchies**: `references/sql-hierarchies.md` - CTE hierarchies, navigators
- **WHERE Conditions**: `references/where-conditions.md` - SQL and table WHERE patterns
- **Constructor Expressions**: `references/constructor-expressions.md` - VALUE, NEW, COND, REDUCE
- **String Processing**: `references/string-processing.md` - String functions, regex
- **Numeric Operations**: `references/numeric-operations.md` - Math functions, big integers
- **Bits and Bytes**: `references/bits-bytes.md` - Binary operations, CASTING
- **Program Flow**: `references/program-flow.md` - IF, CASE, LOOP, DO, WHILE, control statements
- **Built-in Functions**: `references/builtin-functions.md` - String, numeric, table, logical functions

### Object Orientation
- **Object Orientation**: `references/object-orientation.md` - Classes, interfaces, inheritance
- **Design Patterns**: `references/design-patterns.md` - Factory, Singleton, Strategy patterns
- **Dynamic Programming**: `references/dynamic-programming.md` - RTTI, RTTC, field symbols

### RAP and Modern ABAP
- **RAP and EML**: `references/rap-eml.md` - RESTful Application Programming Model
- **CDS Views**: `references/cds-views.md` - Core Data Services
- **ABAP Cloud**: `references/cloud-development.md` - Cloud-ready development
- **Released Classes**: `references/released-classes.md` - Released API catalog
- **AMDP**: `references/amdp.md` - ABAP Managed Database Procedures, SQLScript

### Testing and Security
- **Unit Testing**: `references/unit-testing.md` - ABAP Unit framework
- **Exception Handling**: `references/exceptions.md` - TRY/CATCH, exception classes
- **Authorization**: `references/authorization.md` - AUTHORITY-CHECK, DCL

### Data and Types
- **ABAP Dictionary**: `references/abap-dictionary.md` - Data elements, domains, tables
- **Date and Time**: `references/date-time.md` - Type d, t, utclong, timestamps, XCO
- **XML/JSON Processing**: `references/xml-json.md` - iXML, sXML, CALL TRANSFORMATION
- **Generative AI**: `references/generative-ai.md` - AI SDK, LLM integration

### Transactions and Performance
- **SAP LUW**: `references/sap-luw.md` - Logical Unit of Work, COMMIT, ROLLBACK
- **Performance**: `references/performance.md` - Database access, internal table optimization

---

## Common Patterns

### Safe Table Access (Avoid Exceptions)

```abap
" Using VALUE with OPTIONAL
DATA(line) = VALUE #( itab[ key = value ] OPTIONAL ).

" Using VALUE with DEFAULT
DATA(line) = VALUE #( itab[ 1 ] DEFAULT VALUE #( ) ).

" Check before access
IF line_exists( itab[ key = value ] ).
  DATA(line) = itab[ key = value ].
ENDIF.
```

### Functional Method Chaining

```abap
DATA(result) = NEW zcl_builder( )
  ->set_name( `Test` )
  ->set_value( 123 )
  ->build( ).
```

### FOR Iteration Expressions

```abap
" Transform table
DATA(transformed) = VALUE itab_type(
  FOR wa IN source_itab
  ( id = wa-id name = to_upper( wa-name ) ) ).

" With WHERE
DATA(filtered) = VALUE itab_type(
  FOR wa IN source WHERE ( status = 'A' )
  ( wa ) ).

" With INDEX INTO
DATA(numbered) = VALUE itab_type(
  FOR wa IN source INDEX INTO idx
  ( line_no = idx data = wa ) ).
```

### ABAP Cloud Compatibility

```abap
" Use released APIs only
DATA(uuid) = cl_system_uuid=>create_uuid_x16_static( ).
DATA(date) = xco_cp=>sy->date( )->as( xco_cp_time=>format->iso_8601_extended )->value.
DATA(time) = xco_cp=>sy->time( )->as( xco_cp_time=>format->iso_8601_extended )->value.

" Output in cloud (if_oo_adt_classrun)
out->write( result ).

" Avoid: sy-datum, sy-uzeit, DESCRIBE TABLE, WRITE, MOVE...TO
```

---

## Error Catalog

### CX_SY_ITAB_LINE_NOT_FOUND
**Cause**: Table expression access to non-existent line
**Solution**: Use OPTIONAL, DEFAULT, or check with `line_exists( )`

### CX_SY_ZERODIVIDE
**Cause**: Division by zero
**Solution**: Check divisor before operation

### CX_SY_RANGE_OUT_OF_BOUNDS
**Cause**: Invalid substring access or array bounds
**Solution**: Validate offset and length before access

### CX_SY_CONVERSION_NO_NUMBER
**Cause**: String cannot be converted to number
**Solution**: Validate input format before conversion

### CX_SY_REF_IS_INITIAL
**Cause**: Dereferencing unbound reference
**Solution**: Check `IS BOUND` before dereferencing

---

## Performance Tips

1. **Use SORTED/HASHED tables** for frequent key access
2. **Prefer field symbols** over work areas in loops for modification
3. **Use PACKAGE SIZE** for large SELECT results
4. **Avoid SELECT in loops** - use FOR ALL ENTRIES or JOINs
5. **Use secondary keys** for different access patterns
6. **Minimize CORRESPONDING** calls - explicit assignments are faster

---

## Source Documentation

All content based on SAP official ABAP Cheat Sheets:
- Repository: https://github.com/SAP-samples/abap-cheat-sheets
- SAP Help: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm
