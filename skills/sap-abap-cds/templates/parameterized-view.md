# Parameterized CDS View Template

Template for creating CDS views with input parameters.

---

## Parameterized View Template

```sql
@AbapCatalog.sqlViewName: 'Z<SHORT_NAME>_V'
@AbapCatalog.compiler.CompareFilter: true
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: '<View Description>'

define view Z<VIEW_NAME>
  with parameters
    @EndUserText.label: 'From Date'
    p_date_from : abap.dats,

    @EndUserText.label: 'To Date'
    p_date_to : abap.dats,

    @Environment.systemField: #SYSTEM_LANGUAGE
    @EndUserText.label: 'Language'
    p_language : spras

  as select from <source_table> as s
    left outer join <text_table> as t
      on s.<key_field> = t.<key_field>
     and t.spras = :p_language
{
  key s.<key_field>,

      s.<date_field>,
      s.<field1>,
      s.<field2>,

      t.<text_field> as Description,

      // Parameter values in output
      :p_date_from as FilterDateFrom,
      :p_date_to as FilterDateTo
}
where s.<date_field> between :p_date_from and :p_date_to
```

---

## View Entity with Parameters (7.55+)

```sql
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: '<View Description>'

define view entity Z<VIEW_NAME>
  with parameters
    @EndUserText.label: 'From Date'
    p_date_from : abap.dats,

    @EndUserText.label: 'To Date'
    p_date_to : abap.dats,

    @Environment.systemField: #SYSTEM_LANGUAGE
    p_language : abap.lang

  as select from <source_table> as s
{
  key s.<key_field>,

      s.<date_field>,
      s.<field1>,
      s.<field2>
}
where s.<date_field> between $parameters.p_date_from
                         and $parameters.p_date_to
```

---

## Parameter Types

### Common ABAP Types for Parameters

| Type | Description | Example |
|------|-------------|---------|
| `abap.dats` | Date | `p_date : abap.dats` |
| `abap.tims` | Time | `p_time : abap.tims` |
| `abap.char(n)` | Character | `p_name : abap.char(40)` |
| `abap.numc(n)` | Numeric text | `p_number : abap.numc(10)` |
| `abap.int4` | Integer | `p_count : abap.int4` |
| `abap.lang` | Language | `p_lang : abap.lang` |
| `abap.clnt` | Client | `p_client : abap.clnt` |

### Data Element References

```sql
with parameters
  p_matnr : matnr,        -- Material number
  p_bukrs : bukrs,        -- Company code
  p_vkorg : vkorg         -- Sales organization
```

---

## Environment System Fields

Auto-populate parameters with system values:

| Annotation | Value |
|------------|-------|
| `@Environment.systemField: #SYSTEM_DATE` | SY-DATUM |
| `@Environment.systemField: #SYSTEM_TIME` | SY-UZEIT |
| `@Environment.systemField: #SYSTEM_LANGUAGE` | SY-LANGU |
| `@Environment.systemField: #USER` | SY-UNAME |
| `@Environment.systemField: #CLIENT` | SY-MANDT |

```sql
with parameters
  @Environment.systemField: #SYSTEM_DATE
  p_date : abap.dats,

  @Environment.systemField: #SYSTEM_LANGUAGE
  p_language : abap.lang
```

---

## Parameter Reference Syntax

Two equivalent syntaxes:

```sql
-- Colon notation
:p_param_name

-- $parameters notation
$parameters.p_param_name
```

### In WHERE Clause

```sql
where date_field = :p_date
  and company = $parameters.p_company
```

### In CASE Expression

```sql
case
  when :p_show_all = 'X' then 'All'
  else 'Filtered'
end as ViewMode
```

### In Projection

```sql
{
  key field1,
      :p_date_from as FilterStart,
      :p_date_to as FilterEnd
}
```

---

## Example: Sales Orders with Date Range

```sql
@AbapCatalog.sqlViewName: 'ZSO_DATERANGE_V'
@AbapCatalog.compiler.CompareFilter: true
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Sales Orders by Date Range'

define view Z_SALES_ORDER_DATERANGE
  with parameters
    @EndUserText.label: 'Order Date From'
    p_date_from : abap.dats,

    @EndUserText.label: 'Order Date To'
    p_date_to : abap.dats,

    @EndUserText.label: 'Sales Organization'
    p_vkorg : vkorg,

    @Environment.systemField: #SYSTEM_LANGUAGE
    p_language : spras

  as select from vbak as h
    left outer join vbap as i on h.vbeln = i.vbeln
    left outer join makt as t on i.matnr = t.matnr
                              and t.spras = :p_language
{
  key h.vbeln as SalesOrder,
  key i.posnr as Item,

      h.erdat as OrderDate,
      h.vkorg as SalesOrg,
      h.kunnr as Customer,
      i.matnr as Material,
      t.maktx as MaterialDescription,

      @Semantics.currencyCode: true
      h.waerk as Currency,
      @Semantics.amount.currencyCode: 'Currency'
      i.netwr as NetValue,

      @Semantics.unitOfMeasure: true
      i.meins as Unit,
      @Semantics.quantity.unitOfMeasure: 'Unit'
      i.kwmeng as Quantity,

      :p_date_from as FilterDateFrom,
      :p_date_to as FilterDateTo
}
where h.erdat between :p_date_from and :p_date_to
  and h.vkorg = :p_vkorg
```

---

## ABAP Access with Parameters

### Basic SELECT

```abap
DATA: lv_date_from TYPE dats VALUE '20240101',
      lv_date_to   TYPE dats VALUE '20241231'.

SELECT * FROM z_sales_order_daterange(
  p_date_from = @lv_date_from,
  p_date_to   = @lv_date_to,
  p_vkorg     = '1000',
  p_language  = @sy-langu
)
INTO TABLE @DATA(lt_orders).
```

### With Inline Literals

```abap
SELECT * FROM z_sales_order_daterange(
  p_date_from = '20240101',
  p_date_to   = '20241231',
  p_vkorg     = '1000',
  p_language  = 'E'
)
INTO TABLE @DATA(lt_orders).
```

### Dynamic Parameter Binding

```abap
DATA: lt_params TYPE abap_parmbind_tab,
      lt_orders TYPE STANDARD TABLE OF z_sales_order_daterange.

lt_params = VALUE #(
  ( name = 'P_DATE_FROM' kind = cl_abap_objectdescr=>exporting value = REF #( lv_date_from ) )
  ( name = 'P_DATE_TO'   kind = cl_abap_objectdescr=>exporting value = REF #( lv_date_to ) )
  ( name = 'P_VKORG'     kind = cl_abap_objectdescr=>exporting value = REF #( lv_vkorg ) )
  ( name = 'P_LANGUAGE'  kind = cl_abap_objectdescr=>exporting value = REF #( sy-langu ) )
).

" Dynamic SELECT with parameters
SELECT * FROM z_sales_order_daterange
  USING CLIENT @sy-mandt
  INTO TABLE @lt_orders
  WHERE (lv_where_clause).
```

**Note**: Dynamic parameter binding is complex and typically used in generic frameworks. For most use cases, direct parameter passing (as shown above) is simpler and recommended.

---

## Checklist

- [ ] All parameters have meaningful names (p_ prefix)
- [ ] EndUserText.label for each parameter
- [ ] Environment annotations for system fields
- [ ] Correct data types for parameters
- [ ] Parameters used in WHERE clause or output
- [ ] Tested with various parameter combinations
- [ ] NULL handling for optional parameters
