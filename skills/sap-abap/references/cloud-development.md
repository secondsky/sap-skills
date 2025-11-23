# ABAP Cloud Development - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/19_ABAP_for_Cloud_Development.md

---

## Core Concepts

**ABAP Cloud**: Programming paradigm for cloud-ready, upgrade-stable solutions using restricted ABAP technology.

**Key Restrictions**:
- Limited to ABAP for Cloud Development language version
- Access restricted to released SAP APIs only
- ADT (ABAP Development Tools for Eclipse) is the only supported IDE
- RAP is the transactional programming model

---

## Prohibited Syntax

```abap
" NOT allowed in ABAP Cloud

" Classic statements
MOVE source TO target.              " Use: target = source.
DESCRIBE TABLE itab LINES count.    " Use: count = lines( itab ).
GET REFERENCE OF var INTO dref.     " Use: dref = REF #( var ).

" Classic UI
WRITE 'text'.
SELECTION-SCREEN ...
START-OF-SELECTION.

" Reports
REPORT ...

" Classic debugging
BREAK-POINT.

" Client handling
SELECT ... USING CLIENT ...

" Some sy-fields
DATA(date) = sy-datum.              " Use XCO library
DATA(time) = sy-uzeit.
DATA(timestamp) = sy-timlo.
```

---

## Released APIs

### Date and Time (XCO Library)

```abap
" Current date
DATA(date) = xco_cp=>sy->date( )->as( xco_cp_time=>format->iso_8601_extended )->value.

" Current time
DATA(time) = xco_cp=>sy->time( )->as( xco_cp_time=>format->iso_8601_extended )->value.

" Date calculations
DATA(tomorrow) = xco_cp=>sy->date( )->add( iv_day = 1 )->value.
DATA(next_month) = xco_cp=>sy->date( )->add( iv_month = 1 )->value.
```

### UUID Generation

```abap
" Generate UUID
DATA(uuid) = cl_system_uuid=>create_uuid_x16_static( ).

" As string format
TRY.
    DATA(uuid_str) = cl_system_uuid=>convert_uuid_x16_static(
      uuid = uuid ).
  CATCH cx_uuid_error.
ENDTRY.
```

### Random Numbers

```abap
" Random integer
DATA(random) = cl_abap_random_int=>create(
  seed = CONV i( sy-uzeit )
  min = 1
  max = 100 ).
DATA(number) = random->get_next( ).

" Probability distributions
DATA(prob) = cl_abap_prob_distribution=>get_instance( ).
DATA(normal) = prob->normal( mean = 50 stdev = 10 ).
```

### Output (if_oo_adt_classrun)

```abap
CLASS zcl_demo DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
ENDCLASS.

CLASS zcl_demo IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    out->write( 'Hello from ABAP Cloud!' ).
    out->write( data_object ).
    out->write( itab ).
  ENDMETHOD.
ENDCLASS.
```

### String Processing

```abap
" Available string functions
DATA(upper) = to_upper( text ).
DATA(lower) = to_lower( text ).
DATA(len) = strlen( text ).
DATA(found) = find( val = text sub = 'pattern' ).
DATA(result) = replace( val = text sub = 'old' with = 'new' occ = 0 ).

" String templates
DATA(formatted) = |Date: { xco_cp=>sy->date( )->value DATE = ISO }|.
```

---

## Released Table Types

```abap
" Available system types
DATA itab TYPE string_table.
DATA hash_tab TYPE string_hashed_table.
DATA xstr_tab TYPE xstring_table.
```

---

## Released Data Elements

```abap
" Available DDIC elements
DATA ts TYPE timestampl.
DATA country TYPE land1.
DATA bool TYPE abap_boolean.
DATA true_val TYPE abap_bool VALUE abap_true.
```

---

## RAP as Programming Model

```abap
" EML for data access
MODIFY ENTITIES OF zroot_entity
  ENTITY root
  CREATE FROM ...
  MAPPED DATA(mapped)
  FAILED DATA(failed)
  REPORTED DATA(reported).

READ ENTITIES OF zroot_entity
  ENTITY root
  ALL FIELDS WITH VALUE #( ( key = 1 ) )
  RESULT DATA(result).

COMMIT ENTITIES.
```

---

## Checking Cloud Readiness

### In ADT

1. Right-click on class/object
2. Select "Run As" → "ABAP Test Cockpit"
3. Use check variant `ABAP_CLOUD_READINESS`
4. Review findings

### Change Language Version

1. Open object properties
2. Go to "General" tab
3. Edit "ABAP Language Version"
4. Select "ABAP for Cloud Development"
5. Check for syntax errors

---

## Migration Patterns

### Date/Time

```abap
" Classic (not allowed)
DATA(date) = sy-datum.
DATA(time) = sy-uzeit.

" Cloud (use XCO)
DATA(date) = xco_cp=>sy->date( )->value.
DATA(time) = xco_cp=>sy->time( )->value.
```

### Table Line Count

```abap
" Classic (not allowed)
DESCRIBE TABLE itab LINES count.

" Cloud
DATA(count) = lines( itab ).
```

### Reference Creation

```abap
" Classic (not allowed)
GET REFERENCE OF var INTO dref.

" Cloud
dref = REF #( var ).
```

### Assignment

```abap
" Classic (not allowed)
MOVE source TO target.

" Cloud
target = source.
```

### Output

```abap
" Classic (not allowed)
WRITE 'text'.

" Cloud (in if_oo_adt_classrun)
out->write( 'text' ).
```

---

## Available CDS Objects

```abap
" Released CDS views
DATA tz TYPE i_timezone.

" Access via ABAP SQL
SELECT * FROM i_country INTO TABLE @DATA(countries).
```

---

## Release Contracts

| Contract | Meaning |
|----------|---------|
| C0 | Not released |
| C1 | Released for key user extensibility |
| C2 | Released for partner development |
| C3 | Released for SAP internal |

Use only C1 or higher in ABAP Cloud.

---

## Best Practices

1. **Use released APIs only** - check release status before using
2. **Use RAP** for transactional scenarios
3. **Use XCO library** for date/time operations
4. **Implement if_oo_adt_classrun** for console output
5. **Run ATC checks** regularly with cloud readiness variant
6. **Avoid sy-datum/sy-uzeit** - use XCO alternatives
7. **Use constructor expressions** over obsolete syntax
8. **Test in cloud environment** before deployment

---

## Supported Environments

- SAP BTP ABAP Environment
- SAP S/4HANA Cloud, public edition
- SAP S/4HANA Cloud, private edition
- SAP S/4HANA (on-premise) - opt-in

---

## Documentation Links

- [ABAP Language Versions](https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm)
- [Released APIs](https://api.sap.com/)
- [XCO Library](https://help.sap.com/docs/btp/sap-business-technology-platform/xco-library)
