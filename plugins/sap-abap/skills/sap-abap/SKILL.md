---
name: sap-abap
description: |
  Comprehensive ABAP development skill for SAP systems. Use when writing ABAP code,
  working with internal tables, structures, ABAP SQL, object-oriented programming,
  RAP (RESTful Application Programming Model), CDS views, EML statements, ABAP Cloud
  development, string processing, dynamic programming, RTTI/RTTC, field symbols,
  data references, exception handling, or ABAP unit testing. Covers both classic
  ABAP and modern ABAP for Cloud Development patterns.
license: GPL-3.0
metadata:
  version: "1.1.0"
  last_verified: "2026-04-02"
  abap_release: "7.40 SP08+ / 7.50+ / ABAP Cloud"
  sources:
    - "https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm"
    - "https://github.com/SAP-samples/abap-cheat-sheets"
---

# SAP ABAP Development Skill

## Related Skills

- **sap-abap-cds**: Use when developing CDS views for ABAP-backed Fiori applications or defining data models with annotations
- **sap-btp-cloud-platform**: Use when working with ABAP Environment on BTP or deploying ABAP applications to the cloud
- **sap-cap-capire**: Use when connecting ABAP systems with CAP applications or integrating with OData services
- **sap-fiori-tools**: Use when building Fiori applications with ABAP backends or consuming OData services from ABAP systems
- **sap-api-style**: Use when documenting ABAP APIs or following SAP API documentation standards

## Version Compatibility

This skill covers ABAP syntax from **7.40 SP08** through **ABAP Cloud**. Features requiring
a higher release are annotated with inline comments in code examples using the format
`" [7.xx+]` or noted in reference files. The table below summarizes the key version boundaries.

| Feature | 7.40 SP02 | 7.40 SP05 | 7.40 SP08 | 7.50 | 7.51 | 7.52 | 7.54 |
|---------|:---------:|:---------:|:---------:|:----:|:----:|:----:|:----:|
| Inline declarations `DATA(...)` | x | x | x | x | x | x | x |
| Constructor operators (VALUE, NEW, CONV, COND, SWITCH, REF, EXACT, CAST) | x | x | x | x | x | x | x |
| Table expressions `itab[...]` | x | x | x | x | x | x | x |
| String templates | x | x | x | x | x | x | x |
| `WITH EMPTY KEY` | x | x | x | x | x | x | x |
| `line_exists()`, `line_index()` | x | x | x | x | x | x | x |
| ABAP SQL: `@` host variables | | x | x | x | x | x | x |
| ABAP SQL: comma-separated lists | | x | x | x | x | x | x |
| ABAP SQL: SQL expressions in SELECT | | x | x | x | x | x | x |
| `CORRESPONDING` operator | | x | x | x | x | x | x |
| Table comprehensions (`FOR`) | | x | x | x | x | x | x |
| `LET` expressions | | x | x | x | x | x | x |
| `REDUCE` operator | | | x | x | x | x | x |
| `FILTER` operator | | | x | x | x | x | x |
| `BASE` addition | | | x | x | x | x | x |
| `LOOP AT ... GROUP BY` | | | x | x | x | x | x |
| ABAP SQL: `dbtab~*` in SELECT | | | x | x | x | x | x |
| ABAP SQL: `RIGHT OUTER JOIN` | | x | x | x | x | x | x |
| CDS views with parameters | | | x | x | x | x | x |
| **`FINAL(...)` inline declaration** | | | | x | x | x | x |
| **Host expressions `@( expr )`** | | | | x | x | x | x |
| **`UNION` in SELECT** | | | | x | x | x | x |
| **`IS INSTANCE OF` / `CASE TYPE OF`** | | | | x | x | x | x |
| **`int8` type** | | | | x | x | x | x |
| **CDS table functions** | | | | x | x | x | x |
| **CDS access control (implicit)** | | | | x | x | x | x |
| **`$session.user/client/system_language`** | | | | x | x | x | x |
| **Test seams (`TEST-SEAM`)** | | | | x | x | x | x |
| **Common Table Expressions (`WITH`)** | | | | | x | x | x |
| **`OFFSET` in SELECT** | | | | | x | x | x |
| **`UPPER`/`LOWER` in CDS** | | | | | x | x | x |
| **Enumerated types** | | | | | x | x | x |
| **Internal tables as data source `FROM @itab`** | | | | | | x | x |
| **`WITH PRIVILEGED ACCESS`** | | | | | | x | x |
| **`utclong` type and functions** | | | | | | | x |

**On a 7.40 system**: Replace any `FINAL(...)` with `DATA(...)`, and avoid 7.50+ features
marked in bold above. Most modern ABAP syntax (VALUE, NEW, CONV, inline declarations,
table expressions, REDUCE, FILTER, GROUP BY) is available since 7.40 SP08.

## Table of Contents
- [Version Compatibility](#version-compatibility)
- [Quick Reference](#quick-reference)
- [Bundled Resources](#bundled-resources)
- [Common Patterns](#common-patterns)
- [Error Catalog](#error-catalog)
- [Performance Tips](#performance-tips)
- [Source Documentation](#source-documentation)

## Quick Reference

### Data Types and Declarations

```abap
" Elementary types
DATA num TYPE i VALUE 123.
DATA txt TYPE string VALUE `Hello`.
DATA flag TYPE abap_bool VALUE abap_true.

" Inline declarations
DATA(result) = some_method( ).
FINAL(immutable) = `constant value`.              " [7.50+] Use DATA(...) on 7.40

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
SELECT * FROM dbtab INTO TABLE @DATA(result_tab).   " @ syntax: 7.40 SP05+

" SELECT with conditions
SELECT carrid, connid, fldate                          " comma syntax: 7.40 SP05+
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

## Bundled Resources

This skill includes 28 comprehensive reference files covering all aspects of ABAP development:

### Related Skills
- **sap-abap-cds**: For CDS view development and ABAP Cloud data modeling
- **sap-btp-cloud-platform**: For ABAP Environment setup and BTP deployment
- **sap-cap-capire**: For CAP service integration and ABAP system connections
- **sap-fiori-tools**: For Fiori application development with ABAP backends
- **sap-api-style**: For API documentation standards and best practices

### Quick Access
- **Reference Guide**: `references/skill-reference-guide.md` - Complete guide to all reference files
- **Internal Tables**: `references/internal-tables.md` - Complete table operations
- **ABAP SQL**: `references/abap-sql.md` - Comprehensive SQL reference
- **Object Orientation**: `references/object-orientation.md` - Classes and interfaces

### Development Topics
- `references/constructor-expressions.md` - VALUE, NEW, COND, REDUCE
- `references/rap-eml.md` - RAP and EML operations
- `references/cds-views.md` - CDS view development
- `references/string-processing.md` - String functions and regex
- `references/unit-testing.md` - ABAP Unit framework
- `references/performance.md` - Optimization techniques
- ... and 18 more specialized references

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

### ABAP 7.40 Compatibility

When targeting ABAP 7.40 systems, replace 7.50+ syntax with these patterns:

```abap
" Instead of FINAL (7.50+):
FINAL(value) = `constant`.              " 7.50+
DATA(value) = `constant`.               " 7.40 compatible

" Instead of host expressions (7.50+):
SELECT * FROM dbtab WHERE col = @( lv_val ).   " 7.50+
SELECT * FROM dbtab WHERE col = @lv_val.        " 7.40 compatible

" Instead of UNION (7.50+):
SELECT a FROM tab1 UNION SELECT a FROM tab2.    " 7.50+
" Use two separate SELECTs on 7.40 and combine in ABAP:
SELECT a FROM tab1 INTO TABLE @DATA(r1).
SELECT a FROM tab2 INTO TABLE @DATA(r2).
DATA(combined) = VALUE itab_type( FOR l1 IN r1 ( l1 )
                                  FOR l2 IN r2 ( l2 ) ).

" Instead of IS INSTANCE OF (7.50+):
IF oref IS INSTANCE OF zcl_my_class.    " 7.50+
" 7.40 alternative — use typed CAST with exception handling:
TRY.
    DATA(lo) = CAST zcl_my_class( oref ).  " 7.40+
  CATCH cx_sy_move_cast_error.
    " oref is not compatible with zcl_my_class
ENDTRY.

" Instead of CTEs WITH (7.51+):
WITH +cte AS ( SELECT ... ) SELECT ...  " 7.51+
" Use subqueries or temporary tables on 7.40
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
- Repository: [https://github.com/SAP-samples/abap-cheat-sheets](https://github.com/SAP-samples/abap-cheat-sheets)
- SAP Help (latest): [https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm](https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm)
- SAP Help (7.40): [https://help.sap.com/doc/abapdocu_740_index_htm/7.40/en-US/index.htm](https://help.sap.com/doc/abapdocu_740_index_htm/7.40/en-US/index.htm)
- ABAP Release News: [https://github.com/SAP-samples/abap-cheat-sheets/blob/main/33_ABAP_Release_News.md](https://github.com/SAP-samples/abap-cheat-sheets/blob/main/33_ABAP_Release_News.md)
