# AMDP (ABAP Managed Database Procedures) Integration Guide

## Overview

ABAP Managed Database Procedures (AMDP) allow developers to write SQLScript code directly within ABAP classes. Introduced in ABAP 7.40 SP05, AMDP enables the **code-to-data paradigm** from the ABAP layer, pushing data-intensive operations to the SAP HANA database.

---

## Key Benefits

| Benefit | Description |
|---------|-------------|
| **Performance** | Execute logic in database rather than application server |
| **Simplified Lifecycle** | Procedures auto-created on first invocation |
| **ABAP Integration** | Use ABAP types and data structures |
| **Version Control** | Stored with ABAP code in transport system |
| **No HANA Access Required** | Develop without direct database access |

---

## Prerequisites

- SAP NetWeaver 7.40 SP05 or higher
- SAP HANA database
- ABAP Development Tools (Eclipse ADT)

> **Important:** AMDP classes cannot be edited in SAP GUI. Eclipse ADT is required.

---

## Basic Structure

### 1. Interface Declaration

Every AMDP class must implement the `IF_AMDP_MARKER_HDB` interface:

```abap
CLASS zcl_my_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.  " Required marker interface

    " Method declarations...
ENDCLASS.
```

### 2. Method Declaration

AMDP methods are declared like regular ABAP methods:

```abap
CLASS zcl_my_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    " Instance method
    METHODS get_sales_data
      IMPORTING VALUE(iv_year) TYPE gjahr
      EXPORTING VALUE(et_result) TYPE tt_sales.

    " Static method
    CLASS-METHODS get_customer_count
      IMPORTING VALUE(iv_country) TYPE land1
      RETURNING VALUE(rv_count) TYPE i.
ENDCLASS.
```

### 3. Method Implementation

Use the `BY DATABASE PROCEDURE` or `BY DATABASE FUNCTION` syntax:

```abap
CLASS zcl_my_amdp IMPLEMENTATION.
  METHOD get_sales_data BY DATABASE PROCEDURE
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING vbak vbap.

    " SQLScript code here
    et_result = SELECT vbeln, posnr, matnr, kwmeng
                FROM vbak
                JOIN vbap ON vbak.vbeln = vbap.vbeln
                WHERE gjahr = :iv_year;
  ENDMETHOD.
ENDCLASS.
```

---

## Syntax Elements

### BY DATABASE PROCEDURE

```abap
METHOD <method_name> BY DATABASE PROCEDURE
  FOR HDB
  LANGUAGE SQLSCRIPT
  [OPTIONS <options>]
  [USING <db_entities>].
```

| Element | Description |
|---------|-------------|
| `FOR HDB` | Target database (currently only HDB supported) |
| `LANGUAGE SQLSCRIPT` | Programming language |
| `OPTIONS` | Execution options |
| `USING` | Database entities accessed |

### BY DATABASE FUNCTION

For table functions that can be used in SELECT statements:

```abap
METHOD <method_name> BY DATABASE FUNCTION
  FOR HDB
  LANGUAGE SQLSCRIPT
  OPTIONS READ-ONLY
  USING <db_entities>.
```

### OPTIONS

| Option | Description |
|--------|-------------|
| `READ-ONLY` | No data modifications allowed |
| `DETERMINISTIC` | Same input always produces same output |
| `SUPPRESS WARNINGS` | Suppress specific warnings |

### USING Clause

List all database tables and views accessed:

```abap
USING mara makt vbak vbap.  " Multiple tables
USING ztable.               " Custom table
USING zcl_other_amdp=>method_name.  " Other AMDP method
```

---

## Parameter Restrictions

### Allowed Parameter Types

| Type | Allowed |
|------|---------|
| Elementary types | Yes |
| Structures | Yes |
| Internal tables | Yes |
| Nested tables | No |
| Deep structures | No |

### Parameter Passing

| Mode | Requirement |
|------|-------------|
| `IMPORTING` | Must use `VALUE()` |
| `EXPORTING` | Must use `VALUE()` |
| `CHANGING` | Not supported |
| `RETURNING` | Not supported for procedures, allowed for functions |

### Example with Types

```abap
CLASS zcl_amdp_types DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    " Define types in class
    TYPES: BEGIN OF ty_customer,
             kunnr TYPE kunnr,
             name1 TYPE name1,
             land1 TYPE land1,
           END OF ty_customer.

    TYPES tt_customer TYPE STANDARD TABLE OF ty_customer WITH DEFAULT KEY.

    " Method using defined types
    METHODS get_customers
      IMPORTING VALUE(iv_country) TYPE land1
      EXPORTING VALUE(et_customers) TYPE tt_customer.
ENDCLASS.
```

---

## Complete Examples

### Example 1: Basic Data Retrieval

```abap
CLASS zcl_material_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    TYPES: BEGIN OF ty_material,
             matnr TYPE matnr,
             mtart TYPE mtart,
             matkl TYPE matkl,
             meins TYPE meins,
           END OF ty_material.

    TYPES tt_material TYPE STANDARD TABLE OF ty_material WITH DEFAULT KEY.

    CLASS-METHODS get_materials_by_type
      IMPORTING VALUE(iv_mtart) TYPE mtart
      EXPORTING VALUE(et_materials) TYPE tt_material.
ENDCLASS.

CLASS zcl_material_amdp IMPLEMENTATION.
  METHOD get_materials_by_type BY DATABASE PROCEDURE
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING mara.

    et_materials = SELECT matnr, mtart, matkl, meins
                   FROM mara
                   WHERE mtart = :iv_mtart;
  ENDMETHOD.
ENDCLASS.
```

### Example 2: Aggregation and Joins

```abap
CLASS zcl_sales_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    TYPES: BEGIN OF ty_sales_summary,
             vkorg TYPE vkorg,
             matnr TYPE matnr,
             total_qty TYPE kwmeng,
             total_value TYPE netwr,
           END OF ty_sales_summary.

    TYPES tt_sales_summary TYPE STANDARD TABLE OF ty_sales_summary WITH DEFAULT KEY.

    CLASS-METHODS get_sales_summary
      IMPORTING VALUE(iv_year) TYPE gjahr
      EXPORTING VALUE(et_summary) TYPE tt_sales_summary.
ENDCLASS.

CLASS zcl_sales_amdp IMPLEMENTATION.
  METHOD get_sales_summary BY DATABASE PROCEDURE
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING vbak vbap.

    et_summary = SELECT vbak.vkorg,
                        vbap.matnr,
                        SUM(vbap.kwmeng) AS total_qty,
                        SUM(vbap.netwr) AS total_value
                 FROM vbak
                 INNER JOIN vbap ON vbak.vbeln = vbap.vbeln
                 WHERE SUBSTRING(vbak.erdat, 1, 4) = :iv_year
                 GROUP BY vbak.vkorg, vbap.matnr;
  ENDMETHOD.
ENDCLASS.
```

### Example 3: With Exception Handling

```abap
CLASS zcl_order_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    TYPES: BEGIN OF ty_order,
             vbeln TYPE vbeln,
             erdat TYPE erdat,
             netwr TYPE netwr,
           END OF ty_order.

    TYPES tt_orders TYPE STANDARD TABLE OF ty_order WITH DEFAULT KEY.

    CLASS-METHODS get_orders_safe
      IMPORTING VALUE(iv_kunnr) TYPE kunnr
      EXPORTING VALUE(et_orders) TYPE tt_orders
                VALUE(ev_error) TYPE string.
ENDCLASS.

CLASS zcl_order_amdp IMPLEMENTATION.
  METHOD get_orders_safe BY DATABASE PROCEDURE
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING vbak.

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      ev_error = 'Error: ' || ::SQL_ERROR_CODE || ' - ' || ::SQL_ERROR_MESSAGE;
      et_orders = SELECT NULL AS vbeln, NULL AS erdat, NULL AS netwr
                  FROM dummy WHERE 1 = 0;
    END;

    et_orders = SELECT vbeln, erdat, netwr
                FROM vbak
                WHERE kunnr = :iv_kunnr;

    ev_error = '';
  ENDMETHOD.
ENDCLASS.
```

### Example 4: Table Function for CDS Views

```abap
CLASS zcl_stock_amdp DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.

    TYPES: BEGIN OF ty_stock,
             matnr TYPE matnr,
             werks TYPE werks_d,
             labst TYPE labst,
           END OF ty_stock.

    TYPES tt_stock TYPE STANDARD TABLE OF ty_stock WITH DEFAULT KEY.

    " Table function - can be used in CDS views
    CLASS-METHODS get_stock
      IMPORTING VALUE(iv_werks) TYPE werks_d
      RETURNING VALUE(rt_stock) TYPE tt_stock.
ENDCLASS.

CLASS zcl_stock_amdp IMPLEMENTATION.
  METHOD get_stock BY DATABASE FUNCTION
    FOR HDB
    LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY
    USING mard.

    RETURN SELECT matnr, werks, labst
           FROM mard
           WHERE werks = :iv_werks
             AND labst > 0;
  ENDMETHOD.
ENDCLASS.
```

---

## Calling AMDP Methods

### From ABAP

```abap
DATA: lt_materials TYPE zcl_material_amdp=>tt_material.

" Call static method
zcl_material_amdp=>get_materials_by_type(
  EXPORTING
    iv_mtart = 'FERT'
  IMPORTING
    et_materials = lt_materials
).

" Call instance method
DATA(lo_amdp) = NEW zcl_my_amdp( ).
lo_amdp->get_data(
  EXPORTING
    iv_param = 'value'
  IMPORTING
    et_result = lt_result
).
```

### From CDS Views (Table Functions Only)

```sql
@AbapCatalog.sqlViewName: 'ZSTOCK_CDS'
define view ZI_STOCK_VIEW as
  select from zcl_stock_amdp=>get_stock( werks: $parameters.p_werks ) as Stock
{
  matnr,
  werks,
  labst
}
```

---

## Restrictions and Limitations

### Not Allowed in AMDP

| Feature | Restriction |
|---------|-------------|
| `COMMIT` | Not permitted |
| `ROLLBACK` | Not permitted |
| DDL statements | Not permitted |
| Dynamic SQL with table variables | Limited support |
| Nested tables | Not as parameters |
| Deep structures | Not as parameters |
| `RETURNING` parameters | Only in DB functions |
| `CHANGING` parameters | Not supported |

### Table Buffering

Writing to tables with active SAP buffering may cause issues. Use unbuffered tables or disable buffering.

---

## Debugging AMDP

### In Eclipse ADT

1. Set breakpoint in SQLScript code
2. Enable AMDP debugging in preferences
3. Run ABAP program calling the AMDP
4. Debugger switches to SQLScript debug mode

### Debug Output

Use `TRACE` in SQLScript (HANA 2.0+):

```sql
DECLARE lv_debug NVARCHAR(1000);
lv_debug = 'Processing customer: ' || :iv_kunnr;
TRACE :lv_debug;
```

**Viewing TRACE Output:**
- **Eclipse ADT:** Open Debug perspective → Console view shows TRACE output during debugging session
- **SAP HANA Web IDE:** Debug Console panel displays trace messages
- **SQL Console:** TRACE output appears in the Messages tab after execution
- **Programmatic Access:** Query `M_SQLSCRIPT_TRACE` system view for trace history (requires appropriate privileges)

---

## Best Practices

### 1. Use Appropriate Container

| Use Case | Container |
|----------|-----------|
| Data modifications | `BY DATABASE PROCEDURE` |
| Read-only queries in CDS | `BY DATABASE FUNCTION` |

### 2. Minimize Data Transfer

```abap
" Good: Filter in database
et_result = SELECT * FROM table WHERE condition;

" Avoid: Return all, filter in ABAP
```

### 3. Use Set-Based Operations

```sql
" Good: Set-based
et_result = SELECT a.*, b.name
            FROM table_a a
            JOIN table_b b ON a.id = b.id;

" Avoid: Cursor-based
FOR row AS cursor DO ...
```

### 4. Proper Error Handling

Always include EXIT HANDLER for production code:

```sql
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
  ev_error = ::SQL_ERROR_MESSAGE;
END;
```

### 5. Document USING Clause

```abap
" List ALL tables accessed, even in nested calls
USING vbak vbap mara makt.
```

---

## Standard SAP Examples

Explore these standard SAP classes for AMDP patterns:

| Class | Description |
|-------|-------------|
| `CL_CS_BOM_AMDP` | Bill of Materials processing |
| `CL_SALV_AMDP_UTILS` | ALV utilities |
| `CL_ABAP_AMDP_TEST` | Test examples |

Check methods like `MAT_REVISION_LEVEL_SELECT`, `MAT_BOM_CALC_QUANTITY` for real-world implementations.
