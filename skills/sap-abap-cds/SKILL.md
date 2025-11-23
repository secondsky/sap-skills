---
name: sap-abap-cds
description: |
  Comprehensive SAP ABAP CDS (Core Data Services) reference for data modeling, view development, and semantic enrichment. Use when creating CDS views or view entities in ABAP, defining data models with annotations (@AbapCatalog, @AccessControl, @EndUserText, @Semantics, @UI, @Consumption, @ObjectModel), working with associations and cardinality, implementing input parameters, using built-in functions (string, numeric, date/time), writing CASE expressions and conditional logic, implementing access control with DCL (Data Control Language), handling CURR/QUAN data types with reference fields, troubleshooting CDS errors (SD_CDS_ENTITY105), querying CDS views from ABAP, or displaying data with SALV IDA. Covers ABAP 7.4+ through ABAP Cloud with production-tested patterns.

  Keywords: ABAP CDS, Core Data Services, CDS view, CDS view entity, define view, define view entity, DDL, Data Definition Language, DCL, Data Control Language, annotations, @AbapCatalog, @AccessControl, @EndUserText, @Semantics, @UI, @Consumption, @ObjectModel, @Metadata, associations, cardinality, TO ONE, TO MANY, path expressions, input parameters, WITH PARAMETERS, built-in functions, CASE expression, CAST, session variables, $session, aggregate functions, GROUP BY, HAVING, joins, INNER JOIN, LEFT OUTER JOIN, access control, DEFINE ROLE, pfcg_auth, authorization, SALV IDA, cl_salv_gui_table_ida, Eclipse ADT, ABAP Development Tools, CDS annotations, Fiori Elements, OData, RAP, ABAP RESTful Application Programming Model, currencyCode, unitOfMeasure, SD_CDS_ENTITY105
license: MIT
metadata:
  version: "1.0.0"
  last_verified: "2025-11-23"
  abap_release: "7.4 SP8+ / ABAP Cloud"
  sources:
    - "https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html"
    - "https://github.com/SAP-samples/abap-cheat-sheets"
---

# SAP ABAP CDS (Core Data Services)

Comprehensive reference for ABAP CDS view development, annotations, expressions, and access control.

## Quick Reference

**SAP Help Portal**: https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html
**SAP Cheat Sheets**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/15_CDS_View_Entities.md
**Progress Tracking**: See `PROGRESS_TRACKING.md` for source documentation

---

## 1. CDS View Fundamentals

### View Types

| Type | Syntax | Database View | Since |
|------|--------|---------------|-------|
| **CDS View** | `DEFINE VIEW` | Yes (SQL view created) | 7.4 SP8 |
| **CDS View Entity** | `DEFINE VIEW ENTITY` | No | 7.55 |

**Recommendation**: Use CDS View Entities for new development (ABAP Cloud standard).

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

| Annotation | Purpose | Values |
|------------|---------|--------|
| `@AbapCatalog.sqlViewName` | SQL view name (max 16 chars) | String |
| `@AbapCatalog.compiler.CompareFilter` | Optimize WHERE clauses | `true/false` |
| `@AccessControl.authorizationCheck` | Authorization requirement | `#NOT_REQUIRED`, `#CHECK`, `#MANDATORY`, `#NOT_ALLOWED` |
| `@EndUserText.label` | User-facing description | String |
| `@EndUserText.quickInfo` | Tooltip text | String |
| `@Metadata.allowExtensions` | Allow view extensions | `true/false` |
| `@Metadata.ignorePropagatedAnnotations` | Block annotation inheritance | `true/false` |

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

| Operator | Description |
|----------|-------------|
| `=`, `<>` | Equal, Not equal |
| `<`, `>`, `<=`, `>=` | Comparison |
| `BETWEEN x AND y` | Range check |
| `LIKE` | Pattern matching (% wildcard, _ single char) |
| `IS NULL`, `IS NOT NULL` | Null check |

### Arithmetic Operations

```sql
quantity * price as TotalAmount,
amount / 100 as Percentage,
-amount as NegatedAmount
```

### Session Variables

Access ABAP system fields:

| Variable | Equivalent | Since |
|----------|------------|-------|
| `$session.user` | SY-UNAME | 7.4 |
| `$session.client` | SY-MANDT | 7.4 |
| `$session.system_language` | SY-LANGU | 7.4 |
| `$session.system_date` | SY-DATUM | 7.51 |

```sql
$session.user as CurrentUser,
$session.system_date as Today
```

---

## 4. Built-in Functions

### String Functions

| Function | Description | Example |
|----------|-------------|---------|
| `concat(a, b)` | Concatenate strings | `concat(fname, lname)` |
| `concat_with_space(a, b, n)` | Concat with n spaces | `concat_with_space(fname, lname, 1)` |
| `length(s)` | String length | `length(name)` |
| `left(s, n)` | Left n characters | `left(name, 5)` |
| `right(s, n)` | Right n characters | `right(name, 3)` |
| `substring(s, pos, len)` | Extract substring | `substring(name, 2, 4)` |
| `upper(s)` | Uppercase | `upper(name)` |
| `lower(s)` | Lowercase | `lower(name)` |
| `lpad(s, n, c)` | Left pad to length n | `lpad(num, 10, '0')` |
| `rpad(s, n, c)` | Right pad to length n | `rpad(text, 20, ' ')` |
| `ltrim(s, c)` | Trim from left | `ltrim(num, '0')` |
| `rtrim(s, c)` | Trim from right | `rtrim(text, ' ')` |
| `replace(s, old, new)` | Replace substring | `replace(text, '-', '_')` |
| `instr(s, sub)` | Find position | `instr(name, 'SAP')` |

### Numeric Functions

| Function | Description | Example |
|----------|-------------|---------|
| `abs(n)` | Absolute value | `abs(-5)` → 5 |
| `ceil(n)` | Round up | `ceil(5.3)` → 6 |
| `floor(n)` | Round down | `floor(5.7)` → 5 |
| `round(n, pos)` | Round to decimals | `round(5.567, 2)` → 5.57 |
| `div(a, b)` | Integer division | `div(10, 3)` → 3 |
| `division(a, b, dec)` | Division with decimals | `division(10, 3, 2)` → 3.33 |
| `mod(a, b)` | Modulo | `mod(10, 3)` → 1 |

### Date Functions

| Function | Description | Example |
|----------|-------------|---------|
| `dats_add_days(d, n)` | Add days | `dats_add_days(date, 7)` |
| `dats_add_months(d, n)` | Add months | `dats_add_months(date, 1)` |
| `dats_days_between(d1, d2)` | Days difference | `dats_days_between(start, end)` |
| `dats_is_valid(d)` | Validate date | `dats_is_valid(date)` |

### CAST Expression

Convert data types using ABAP type notation:

```sql
cast(field as abap.char(10)) as TextField,
cast(field as abap.int4) as IntField,
cast('EUR' as abap.cuky) as Currency,
cast(amount as abap.curr(15,2)) as Amount
```

**ABAP Types**: `abap.char()`, `abap.numc()`, `abap.int4`, `abap.dats`, `abap.tims`, `abap.curr()`, `abap.cuky`, `abap.quan()`, `abap.unit()`

For complete function reference, see `references/functions-reference.md`.

---

## 5. Joins

### Join Types

```sql
-- INNER JOIN (matching rows only)
define view Z_JOIN_EXAMPLE as select from mara as m
  inner join makt as t on m.matnr = t.matnr
{
  m.matnr,
  t.maktx
}

-- LEFT OUTER JOIN (all from left, matching from right)
  left outer join marc as c on m.matnr = c.matnr

-- RIGHT OUTER JOIN (all from right, matching from left)
  right outer join mvke as v on m.matnr = v.matnr

-- CROSS JOIN (cartesian product)
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

| Syntax | Meaning | Join Type |
|--------|---------|-----------|
| `[0..1]` or `[1]` | To zero-or-one | LEFT OUTER MANY TO ONE |
| `[1..1]` | Exactly one | LEFT OUTER MANY TO ONE |
| `[0..*]` or `[*]` | To many | LEFT OUTER MANY TO MANY |
| `[1..*]` | One or more | LEFT OUTER MANY TO MANY |

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

Two equivalent syntaxes:
- Colon notation: `:p_date_from`
- $parameters: `$parameters.p_date_from`

### Calling from ABAP

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

| Value | Behavior |
|-------|----------|
| `#NOT_REQUIRED` | No authorization check |
| `#CHECK` | Warning if no DCL exists |
| `#MANDATORY` | Error if no DCL exists |
| `#NOT_ALLOWED` | DCL ignored if exists |

### Condition Types

**PFCG Authorization**:
```sql
where (field) = aspect pfcg_auth(AUTH_OBJECT, AUTH_FIELD, ACTVT = '03')
```

**Literal Condition**:
```sql
where status <> 'DELETED'
```

**User Aspect**:
```sql
where created_by ?= aspect user
```

**Combined Conditions**:
```sql
where (bukrs) = aspect pfcg_auth(...)
  and status = 'ACTIVE'
```

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

### Standard SALV Table

```abap
DATA: lo_salv TYPE REF TO cl_salv_table.

cl_salv_table=>factory(
  IMPORTING r_salv_table = lo_salv
  CHANGING  t_table      = lt_result
).

lo_salv->get_functions( )->set_all( abap_true ).
lo_salv->get_columns( )->set_optimize( abap_true ).
lo_salv->display( ).
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

### Transactions

| TCode | Description |
|-------|-------------|
| SDDLAR | Display/repair DDL structures |
| RSRTS_ODP_DIS | TransientProvider preview |
| RSRTS_QUERY_CHECK | CDS query metadata validation |
| SE63 | Translation (EndUserText) |
| SE11 | ABAP Dictionary |
| SU21 | Authorization objects |

### System Tables for Annotations

| Table | Content |
|-------|---------|
| DDHEADANNO | Header-level annotations |
| CDSVIEWANNOPOS | CDS view header annotations |
| CDS_FIELD_ANNOTATION | Field-level annotations |
| ABDOC_CDS_ANNOS | SAP annotation definitions |

### API Class

`CL_DD_DDL_ANNOTATION_SERVICE` - Programmatic annotation access:
- `get_annos()` - Get all annotations
- `get_label_4_element()` - Get @EndUserText.label

---

## References

For detailed guidance, see the reference files in `references/`:

- `annotations-reference.md` - Complete annotation catalog
- `functions-reference.md` - All built-in functions with examples
- `associations-reference.md` - Associations and cardinality guide
- `access-control-reference.md` - DCL and authorization patterns
- `expressions-reference.md` - Expressions and operators
- `troubleshooting.md` - Common errors and solutions

For templates, see `templates/`:
- `basic-view.md` - Standard CDS view template
- `parameterized-view.md` - View with input parameters
- `dcl-template.md` - Access control definition

---

## Source Documentation

**Update this skill by checking**:
- https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html (ABAP Cloud)
- https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP_752/f2e545608079437ab165c105649b89db/7c078765ec6d4e6b88b71bdaf8a2bd9f.html (NetWeaver 7.52 User Guide)
- https://github.com/SAP-samples/abap-cheat-sheets
- https://community.sap.com/t5/tag/CDS%20Views/tg-p

**Last Verified**: 2025-11-23
