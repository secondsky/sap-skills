---
name: sap-abap-cds
description: "Comprehensive SAP ABAP CDS (Core Data Services) reference for data modeling, view development, and semantic enrichment. Use when creating CDS views or view entities, defining data models with annotations, working with associations and cardinality, implementing input parameters, using built-in functions, writing CASE expressions, implementing access control with DCL, handling CURR/QUAN data types, troubleshooting CDS errors, querying CDS views from ABAP, or displaying data with SALV IDA. Covers ABAP 7.4+ through ABAP Cloud."
license: GPL-3.0
metadata:
  version: "1.1.0"
  last_verified: "2026-04-02"
  abap_release: "7.4 SP8+ / 7.50+ / ABAP Cloud"
  sources:
    - "https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html"
    - "https://github.com/SAP-samples/abap-cheat-sheets"
  keywords: [ABAP CDS, Core Data Services, CDS view, CDS view entity, define view, DDL, DCL, annotations, "@AbapCatalog", "@AccessControl", "@EndUserText", "@Semantics", "@UI", "@Consumption", "@ObjectModel", associations, cardinality, path expressions, input parameters, WITH PARAMETERS, built-in functions, CASE expression, CAST, session variables, GROUP BY, HAVING, joins, access control, DEFINE ROLE, pfcg_auth, SALV IDA, Eclipse ADT, CDS annotations, Fiori Elements, OData, RAP, currencyCode, unitOfMeasure, SD_CDS_ENTITY105]
---

# SAP ABAP CDS (Core Data Services)

## Related Skills

- **sap-abap**: Use for ABAP programming patterns used with CDS or when implementing EML statements in ABAP
- **sap-btp-cloud-platform**: Use for CDS deployment scenarios on BTP or ABAP Environment configurations
- **sap-fiori-tools**: Use when building Fiori Elements applications that consume CDS views or working with UI annotations
- **sap-cap-capire**: Use for comparing CDS syntax between ABAP and CAP or when integrating ABAP CDS with CAP services
- **sap-api-style**: Use when documenting CDS-based OData services or following API documentation standards

**Quick Reference**: [https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html](https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html) | SAP Cheat Sheets: [https://github.com/SAP-samples/abap-cheat-sheets/blob/main/15_CDS_View_Entities.md](https://github.com/SAP-samples/abap-cheat-sheets/blob/main/15_CDS_View_Entities.md)

## Version Compatibility

This skill covers CDS features from **7.40 SP8** through **ABAP Cloud**. Key version boundaries:

| Feature | 7.40 SP8 | 7.50 | 7.51 | 7.55+ |
|---------|:--------:|:----:|:----:|:-----:|
| CDS View (`DEFINE VIEW`) | x | x | x | x |
| CDS associations, parameters, built-in functions | x | x | x | x |
| CDS Table Functions (`DEFINE TABLE FUNCTION`) | | x | x | x |
| CDS Access Control (implicit evaluation) | | x | x | x |
| Session variables (`$session.user/client/system_language`) | | x | x | x |
| `@Environment.systemField` annotation | | x | x | x |
| `UPPER`/`LOWER` functions | | | x | x |
| `$session.system_date` | | | x | x |
| CDS Metadata Extensions (`ANNOTATE VIEW`) | | | x | x |
| Cross Join in CDS | | | x | x |
| **CDS View Entity (`DEFINE VIEW ENTITY`)** | | | | x |
| New cardinality syntax (`to one`/`to many`) | | | | 7.57+ |

**On a 7.40 system**: Use `DEFINE VIEW` (not `DEFINE VIEW ENTITY`). CDS table functions,
access control, and session variables are **not available** before 7.50. The templates
in `templates/` include both classic CDS View and View Entity variants.

## Table of Contents
- [1. CDS View Fundamentals](#1-cds-view-fundamentals)
- [2. Essential Annotations](#2-essential-annotations)
- [3. Expressions and Operations](#3-expressions-and-operations)
- [4. Built-in Functions](#4-built-in-functions)
- [5. Joins](#5-joins)
- [6. Associations](#6-associations)
- [7. Input Parameters](#7-input-parameters)
- [8. Aggregate Expressions](#8-aggregate-expressions)
- [9. Access Control (DCL)](#9-access-control-dcl)
- [10. Data Retrieval from ABAP](#10-data-retrieval-from-abap)
- [11. Common Errors and Solutions](#11-common-errors-and-solutions)
- [12. Useful Transactions and Tables](#12-useful-transactions-and-tables)
- [Bundled Resources](#bundled-resources)
- [Source Documentation](#source-documentation)

---

## 1. CDS View Fundamentals

### View Types

| Type | Syntax | Database View | Since |
|------|--------|---------------|-------|
| **CDS View** | `DEFINE VIEW` | Yes | 7.4 SP8 |
| **CDS View Entity** | `DEFINE VIEW ENTITY` | No | 7.55 |

**Recommendation**: Use CDS View Entities for new development.

### Basic CDS View Syntax

```sql
@AbapCatalog.sqlViewName: 'ZCDS_EXAMPLE_V'
@AbapCatalog.compiler.CompareFilter: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Example CDS View'

define view ZCDS_EXAMPLE
  as select from db_table as t
{
  key t.field1,
      t.field2,
      t.field3 as AliasName
}
```

### CDS View Entity Syntax (7.55+)

```sql
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Example View Entity'

define view entity Z_CDS_EXAMPLE
  as select from db_table as t
{
  key t.field1,
      t.field2,
      t.field3 as AliasName
}
```

**Key Difference**: View entities omit `@AbapCatalog.sqlViewName` - no SQL view generated.

### Eclipse ADT Setup
1. **File** → **New** → **Other** → **Core Data Services** → **Data Definition**
2. Enter name, description, and package
3. Select template (view, view entity, etc.)

---

## 2. Essential Annotations

### Core Annotations

**Essential annotations for CDS development**:
- `@AbapCatalog.sqlViewName` - SQL view name (max 16 chars)
- `@AbapCatalog.compiler.CompareFilter` - Optimize WHERE clauses
- `@AccessControl.authorizationCheck` - Set to #NOT_REQUIRED, #CHECK, #MANDATORY, or #NOT_ALLOWED
- `@EndUserText.label` - User-facing description
- `@Metadata.allowExtensions` - Allow view extensions

**Complete Reference**: See `references/annotations-reference.md` for 50+ annotations with examples.

### Semantics Annotations (Currency/Quantity)

**Required for CURR and QUAN data types** to avoid error SD_CDS_ENTITY105:

```sql
-- Currency fields
@Semantics.currencyCode: true
waers,
@Semantics.amount.currencyCode: 'waers'
amount,

-- Quantity fields
@Semantics.unitOfMeasure: true
meins,
@Semantics.quantity.unitOfMeasure: 'meins'
quantity
```

### UI Annotations (Fiori Elements)

```sql
@UI.lineItem: [{ position: 10 }]
@UI.identification: [{ position: 10 }]
@UI.selectionField: [{ position: 10 }]
field1,

@UI.hidden: true
internal_field
```

### Consumption Annotations (Value Help)

```sql
@Consumption.valueHelpDefinition: [{
  entity: { name: 'I_Currency', element: 'Currency' }
}]
waers
```

For complete annotation reference, see `references/annotations-reference.md`.

---

## 3. Expressions and Operations

### CASE Expressions

**Simple CASE** (single variable comparison):
```sql
case status
  when 'A' then 'Active'
  when 'I' then 'Inactive'
  else 'Unknown'
end as StatusText
```

**Searched CASE** (multiple conditions):
```sql
case
  when amount > 1000 then 'High'
  when amount > 100 then 'Medium'
  else 'Low'
end as AmountCategory
```

### Comparison Operators

**Standard operators**: `=`, `<>`, `<`, `>`, `<=`, `>=`
**Special operators**: `BETWEEN x AND y`, `LIKE`, `IS NULL`, `IS NOT NULL`

**Complete Reference**: See `references/expressions-reference.md` for all operators and expressions.

### Arithmetic Operations

```sql
quantity * price as TotalAmount,
amount / 100 as Percentage,
-amount as NegatedAmount
```

### Session Variables

**Available system variables** (SY fields equivalent):
- `$session.user` (SY-UNAME) - Current user **[7.50+]**
- `$session.client` (SY-MANDT) - Client **[7.50+]**
- `$session.system_language` (SY-LANGU) - Language **[7.50+]**
- `$session.system_date` (SY-DATUM) - Current date **[7.51+]**

> **Note**: Session variables require ABAP 7.50+. On 7.40, pass values via
> input parameters with `@Environment.systemField` (7.50+) or host variables.

**Complete Reference**: See `references/expressions-reference.md` for all system variables.

```sql
$session.user as CurrentUser,
$session.system_date as Today
```

---

## 4. Built-in Functions

CDS provides comprehensive built-in functions for string, numeric, and date operations.

### Key Function Categories
- **String Functions**: concat(), length(), substring(), upper(), lower(), replace()
- **Numeric Functions**: abs(), ceil(), floor(), round(), division()
- **Date Functions**: dats_add_days(), dats_add_months(), dats_days_between()
- **CAST Expression**: Convert between ABAP data types

> **Note**: `upper()` and `lower()` in CDS require **7.51+**. On 7.40/7.50, handle
> case conversion in ABAP after selecting, or use `CONCAT` (7.40 SP08+).

**Complete Reference**: See `references/functions-reference.md` for all 50+ functions with examples.

### Quick Examples
```sql
-- String operations
concat(first_name, last_name) as FullName,
upper(name) as UpperName,
substring(description, 1, 10) as ShortDesc

-- Numeric operations  
abs(amount) as AbsoluteAmount,
round(value, 2) as RoundedValue,
division(10, 3, 2) as PreciseDivision

-- Date operations
dats_add_days(current_date, 7) as NextWeek,
dats_days_between(start_date, end_date) as Duration

-- Type conversion
cast(field as abap.char(10)) as TextField,
cast(amount as abap.curr(15,2)) as CurrencyField

**ABAP Types**: `abap.char()`, `abap.numc()`, `abap.int4`, `abap.dats`, `abap.tims`, `abap.curr()`, `abap.cuky`, `abap.quan()`, `abap.unit()`

---

## 5. Joins

### Join Types
```sql
-- INNER JOIN (matching rows only)
inner join makt as t on m.matnr = t.matnr

-- LEFT OUTER JOIN (all from left, matching from right)
left outer join marc as c on m.matnr = c.matnr

-- RIGHT OUTER JOIN (all from right, matching from left)  -- [7.51+]
right outer join mvke as v on m.matnr = v.matnr

-- CROSS JOIN (cartesian product)                         -- [7.51+]
cross join t001 as co
```

---

## 6. Associations

Associations define relationships between entities (join-on-demand):

### Defining Associations

```sql
define view Z_ASSOC_EXAMPLE as select from scarr as c
  association [1..*] to spfli as _Flights
    on $projection.carrid = _Flights.carrid
  association [0..1] to sairport as _Airport
    on $projection.hub = _Airport.id
{
  key c.carrid,
      c.carrname,
      c.hub,

      // Expose associations
      _Flights,
      _Airport
}
```

### Cardinality Notation

**Syntax mapping**:
- `[0..1]` or `[1]` → `association to one` (LEFT OUTER MANY TO ONE)
- `[1..1]` → `association to one` (exact match)
- `[0..*]` or `[*]` → `association to many` (LEFT OUTER MANY TO MANY)
- `[1..*]` → `association to many` (one or more)

**Complete Reference**: See `references/associations-reference.md` for detailed cardinality guide.

### New Cardinality Syntax (Release 2302+)

```sql
association to one _Customer on ...   -- [0..1]
association to many _Items on ...      -- [0..*]
```

### Using Associations

```sql
-- Expose for consumer use
_Customer,

-- Ad-hoc field access (triggers join)
_Customer.name as CustomerName
```

### Path Expressions with Filter

```sql
-- Filter with cardinality indicator
_Items[1: Status = 'A'].ItemNo
```

For complete association reference, see `references/associations-reference.md`.

---

## 7. Input Parameters

### Defining Parameters

```sql
define view Z_PARAM_EXAMPLE
  with parameters
    p_date_from : dats,
    p_date_to   : dats,
    @Environment.systemField: #SYSTEM_LANGUAGE
    p_langu     : spras
  as select from vbak as v
{
  key v.vbeln,
      v.erdat,
      v.erzet
}
where v.erdat between :p_date_from and :p_date_to
```

### Parameter Reference
Use colon notation `:p_date_from` or `$parameters.p_date_from`

**Calling from ABAP**:
```abap
SELECT * FROM z_param_example(
  p_date_from = '20240101',
  p_date_to   = '20241231',
  p_langu     = @sy-langu
) INTO TABLE @DATA(lt_result).
```

---

## 8. Aggregate Expressions

### Aggregate Functions

```sql
define view Z_AGG_EXAMPLE as select from vbap as i
{
  i.vbeln,
  sum(i.netwr) as TotalAmount,
  avg(i.netwr) as AvgAmount,
  max(i.netwr) as MaxAmount,
  min(i.netwr) as MinAmount,
  count(*) as ItemCount
}
group by i.vbeln
having sum(i.netwr) > 1000
```

---

## 9. Access Control (DCL)

### Basic DCL Structure

```sql
@MappingRole: true
define role Z_CDS_EXAMPLE_DCL {
  grant select on Z_CDS_EXAMPLE
    where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03');
}
```

### Authorization Check Options

**Available values**:
- `#NOT_REQUIRED` - No authorization check
- `#CHECK` - Warning if no DCL exists
- `#MANDATORY` - Error if no DCL exists
- `#NOT_ALLOWED` - DCL ignored if exists

**Complete Reference**: See `references/access-control-reference.md` for detailed DCL patterns.

### Condition Types

**PFCG Authorization**: `where (field) = aspect pfcg_auth(AUTH_OBJECT, AUTH_FIELD, ACTVT = '03')`

**Literal Condition**: `where status <> 'DELETED'`

**User Aspect**: `where created_by ?= aspect user`

**Combined**: `where (bukrs) = aspect pfcg_auth(...) and status = 'ACTIVE'`

For complete access control reference, see `references/access-control-reference.md`.

---

## 10. Data Retrieval from ABAP

### Standard SELECT
```abap
SELECT * FROM zcds_example
  WHERE field1 = @lv_value
  INTO TABLE @DATA(lt_result).
```

### SALV IDA (Integrated Data Access)
```abap
cl_salv_gui_table_ida=>create_for_cds_view(
  CONV #( 'ZCDS_EXAMPLE' )
)->fullscreen( )->display( ).
```

---

## 11. Common Errors and Solutions

### SD_CDS_ENTITY105: Missing Reference Information

**Problem**: CURR/QUAN fields without reference

**Solution**: Add semantics annotations
```sql
@Semantics.currencyCode: true
waers,
@Semantics.amount.currencyCode: 'waers'
netwr
```

Or import currency from related table:
```sql
inner join t001 as c on ...
{
  c.waers,
  @Semantics.amount.currencyCode: 'waers'
  v.amount
}
```

### Cardinality Warnings

**Problem**: Cardinality doesn't match actual data

**Solution**: Define cardinality matching data model
```sql
association [0..1] to ...  -- Use for optional relationships
association [1..*] to ...  -- Use for required one-to-many
```

For complete troubleshooting guide, see `references/troubleshooting.md`.

---

## 12. Useful Transactions and Tables

### Key Transactions
- **SDDLAR** - Display/repair DDL structures
- **RSRTS_ODP_DIS** - TransientProvider preview
- **RSRTS_QUERY_CHECK** - CDS query metadata validation
- **SE63** - Translation (EndUserText)
- **SE11** - ABAP Dictionary
- **SU21** - Authorization objects

### Important Tables
- **DDHEADANNO** - Header-level annotations
- **CDSVIEWANNOPOS** - CDS view header annotations
- **CDS_FIELD_ANNOTATION** - Field-level annotations
- **ABDOC_CDS_ANNOS** - SAP annotation definitions

### API Class
`CL_DD_DDL_ANNOTATION_SERVICE` - Programmatic annotation access:
- `get_annos()` - Get all annotations
- `get_label_4_element()` - Get @EndUserText.label

---

## Bundled Resources

### Reference Documentation
For detailed guidance, see the reference files in `references/`:

- `annotations-reference.md` - Complete annotation catalog
- `functions-reference.md` - All built-in functions with examples
- `associations-reference.md` - Associations and cardinality guide
- `access-control-reference.md` - DCL and authorization patterns
- `expressions-reference.md` - Expressions and operators
- `troubleshooting.md` - Common errors and solutions

### Templates
For templates, see `templates/`:
- `basic-view.md` - Standard CDS view template
- `parameterized-view.md` - View with input parameters
- `dcl-template.md` - Access control definition

---

## Source Documentation

**Update this skill by checking**:
- [https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html](https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html) (ABAP Cloud)
- [https://help.sap.com/doc/abapdocu_740_index_htm/7.40/en-US/index.htm](https://help.sap.com/doc/abapdocu_740_index_htm/7.40/en-US/index.htm) (7.40 Reference)
- [https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP_752/f2e545608079437ab165c105649b89db/7c078765ec6d4e6b88b71bdaf8a2bd9f.html](https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP_752/f2e545608079437ab165c105649b89db/7c078765ec6d4e6b88b71bdaf8a2bd9f.html) (NetWeaver 7.52 User Guide)
- [https://github.com/SAP-samples/abap-cheat-sheets](https://github.com/SAP-samples/abap-cheat-sheets)
- [https://github.com/SAP-samples/abap-cheat-sheets/blob/main/33_ABAP_Release_News.md](https://github.com/SAP-samples/abap-cheat-sheets/blob/main/33_ABAP_Release_News.md) (Release News)

**Last Verified**: 2026-04-02
