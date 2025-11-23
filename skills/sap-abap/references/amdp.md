# ABAP Managed Database Procedures (AMDP) - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/12_AMDP.md

---

## Overview

AMDP is a class-based framework for managing database procedures and functions that execute on SAP HANA using SQLScript.

---

## AMDP Class Structure

```abap
CLASS zcl_amdp_demo DEFINITION
  PUBLIC FINAL CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    TYPES tab_type TYPE STANDARD TABLE OF dbtab WITH EMPTY KEY.

    METHODS amdp_procedure
      IMPORTING VALUE(param) TYPE i
      EXPORTING VALUE(result) TYPE tab_type.

ENDCLASS.
```

---

## AMDP Procedures

### Declaration

```abap
METHODS amdp_meth
  IMPORTING VALUE(num) TYPE i
  EXPORTING VALUE(tab) TYPE tab_type.
```

### Implementation

```abap
METHOD amdp_meth
  BY DATABASE PROCEDURE
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY
  USING db_object.

  tab = SELECT * FROM db_object WHERE id = :num;

ENDMETHOD.
```

### Key Additions

| Addition | Purpose |
|----------|---------|
| `BY DATABASE PROCEDURE` | Designates as database procedure |
| `FOR HDB` | Specifies SAP HANA database |
| `LANGUAGE SQLSCRIPT` | Defines programming language |
| `OPTIONS READ-ONLY` | Required for ABAP Cloud |
| `USING db_object` | Specifies accessible database objects |

---

## AMDP Table Functions

### For AMDP Methods (Internal Use)

```abap
METHODS amdp_func
  IMPORTING VALUE(num) TYPE i
  RETURNING VALUE(tab) TYPE tab_type.

METHOD amdp_func
  BY DATABASE FUNCTION
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY
  USING db_object.

  RETURN SELECT * FROM db_object WHERE id = :num;

ENDMETHOD.
```

### For CDS Table Functions

```abap
CLASS-METHODS table_func FOR TABLE FUNCTION some_cds_table_func.
```

CDS Definition:

```cds
define table function some_cds_table_func
  with parameters
    p_param : abap.char(3)
  returns {
    client : abap.clnt;
    field1 : abap.char(5);
    field2 : abap.int4;
  }
  implemented by method amdp_class=>table_func;
```

---

## AMDP Scalar Functions

### For AMDP Methods

```abap
METHODS get_max_value
  IMPORTING VALUE(category) TYPE c LENGTH 2
  RETURNING VALUE(max_val) TYPE i.

METHOD get_max_value
  BY DATABASE FUNCTION
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY
  USING some_table.

  SELECT MAX(amount) INTO max_val
    FROM some_table
    WHERE category = :category;

ENDMETHOD.
```

### For CDS Scalar Functions

```abap
CLASS-METHODS calc_percentage FOR SCALAR FUNCTION zdemo_scalar_func.

METHOD calc_percentage
  BY DATABASE FUNCTION
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY.

  result = num / total * 100;

ENDMETHOD.
```

CDS Definition:

```cds
define scalar function zdemo_scalar_func
  with parameters
    num   : numeric,
    total : type of num
  returns abap.dec( 8, 2 )
```

---

## ABAP Cloud Requirements

### Read-Only Enforcement

```abap
METHOD amdp_meth
  BY DATABASE PROCEDURE
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY  " Mandatory in ABAP Cloud
  USING ...
```

### Client-Safe AMDP

```abap
METHODS select_entries
  AMDP OPTIONS READ-ONLY CDS SESSION CLIENT DEPENDENT
  IMPORTING VALUE(carrid) TYPE c LENGTH 2
  EXPORTING VALUE(tab) TYPE tab_type.
```

### Client Handling Options

| Option | Purpose |
|--------|---------|
| `CDS SESSION CLIENT DEPENDENT` | Client-dependent via session variables |
| `CLIENT INDEPENDENT` | Client-independent data sources |

---

## Calling AMDP Scalar Functions

```abap
METHOD select_with_scalar
  BY DATABASE PROCEDURE
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY
  USING some_table, zcl_amdp=>get_max_value.

  result_tab = SELECT carrid, connid, amount
    FROM some_table
    WHERE amount = "ZCL_AMDP=>GET_MAX_VALUE"( category => :category );

ENDMETHOD.
```

---

## Complete Example

```abap
CLASS zcl_amdp_demo DEFINITION
  PUBLIC FINAL CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    TYPES flight_tab TYPE TABLE OF zdemo_flight WITH EMPTY KEY.

    " Scalar function
    METHODS get_max_fltime
      AMDP OPTIONS READ-ONLY CDS SESSION CLIENT DEPENDENT
      IMPORTING VALUE(carrid) TYPE c LENGTH 2
      RETURNING VALUE(max_fltime) TYPE i.

    " Procedure using scalar function
    METHODS select_max_flights
      AMDP OPTIONS READ-ONLY CDS SESSION CLIENT DEPENDENT
      IMPORTING VALUE(carrid) TYPE c LENGTH 2
      EXPORTING VALUE(flights) TYPE flight_tab.

ENDCLASS.

CLASS zcl_amdp_demo IMPLEMENTATION.

  METHOD get_max_fltime
    BY DATABASE FUNCTION
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING zdemo_flight.

    SELECT MAX(fltime) INTO max_fltime
      FROM zdemo_flight
      WHERE carrid = :carrid;

  ENDMETHOD.

  METHOD select_max_flights
    BY DATABASE PROCEDURE
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING zdemo_flight, zcl_amdp_demo=>get_max_fltime.

    flights = SELECT carrid, connid, fltime
      FROM zdemo_flight
      WHERE fltime = "ZCL_AMDP_DEMO=>GET_MAX_FLTIME"( carrid => :carrid );

  ENDMETHOD.

ENDCLASS.
```

---

## Best Practices

1. **Use AMDP only when necessary** - prefer ABAP SQL when possible
2. **Always use OPTIONS READ-ONLY** for ABAP Cloud
3. **Specify USING clause** for all accessed database objects
4. **Handle client dependency** appropriately
5. **Test SQLScript logic** in database development tools
6. **Document complex procedures** for maintainability
