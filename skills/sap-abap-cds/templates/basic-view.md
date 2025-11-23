# Basic CDS View Template

Standard template for creating a basic ABAP CDS view.

---

## CDS View Template

```sql
@AbapCatalog.sqlViewName: 'Z<SHORT_NAME>_V'
@AbapCatalog.compiler.CompareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: '<View Description>'

define view Z<VIEW_NAME>
  as select from <source_table> as s
    left outer join <text_table> as t
      on s.<key_field> = t.<key_field>
     and t.spras = $session.system_language
{
      // Key fields
  key s.<key_field>,

      // Data fields
      s.<field1>,
      s.<field2>,

      // Text from joined table
      t.<text_field> as Description,

      // Calculated fields
      case s.<status_field>
        when 'A' then 'Active'
        when 'I' then 'Inactive'
        else 'Unknown'
      end as StatusText,

      // Currency handling
      @Semantics.currencyCode: true
      s.<currency_field>,
      @Semantics.amount.currencyCode: '<currency_field>'
      s.<amount_field>,

      // Quantity handling
      @Semantics.unitOfMeasure: true
      s.<unit_field>,
      @Semantics.quantity.unitOfMeasure: '<unit_field>'
      s.<quantity_field>,

      // Administrative fields
      @Semantics.user.createdBy: true
      s.<created_by>,
      @Semantics.systemDateTime.createdAt: true
      s.<created_at>,
      @Semantics.user.lastChangedBy: true
      s.<changed_by>,
      @Semantics.systemDateTime.lastChangedAt: true
      s.<changed_at>
}
```

---

## CDS View Entity Template (7.55+)

```sql
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: '<View Description>'

define view entity Z<VIEW_NAME>
  as select from <source_table> as s
    left outer join <text_table> as t
      on s.<key_field> = t.<key_field>
     and t.spras = $session.system_language
{
      // Key fields
  key s.<key_field>,

      // Data fields
      s.<field1>,
      s.<field2>,

      // Text from joined table
      t.<text_field> as Description,

      // Calculated fields
      case s.<status_field>
        when 'A' then 'Active'
        when 'I' then 'Inactive'
        else 'Unknown'
      end as StatusText,

      // Currency handling
      @Semantics.currencyCode: true
      s.<currency_field>,
      @Semantics.amount.currencyCode: '<currency_field>'
      s.<amount_field>,

      // Quantity handling
      @Semantics.unitOfMeasure: true
      s.<unit_field>,
      @Semantics.quantity.unitOfMeasure: '<unit_field>'
      s.<quantity_field>
}
```

---

## Example: Material Master View

```sql
@AbapCatalog.sqlViewName: 'ZMAT_BASIC_V'
@AbapCatalog.compiler.CompareFilter: true
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Basic Material View'

define view Z_MATERIAL_BASIC
  as select from mara as m
    left outer join makt as t
      on m.matnr = t.matnr
     and t.spras = $session.system_language
{
  key m.matnr as Material,

      m.mtart as MaterialType,
      m.matkl as MaterialGroup,
      m.meins as BaseUnit,
      m.ersda as CreatedDate,
      m.ernam as CreatedBy,
      m.laeda as ChangedDate,
      m.aenam as ChangedBy,

      t.maktx as MaterialDescription,

      case m.lvorm
        when 'X' then 'Marked for Deletion'
        else 'Active'
      end as DeletionStatus,

      @Semantics.unitOfMeasure: true
      m.meins as UnitOfMeasure,
      @Semantics.quantity.unitOfMeasure: 'meins'
      m.ntgew as NetWeight
}
```

---

## Checklist

- [ ] SQL view name ≤ 16 characters (for CDS View)
- [ ] Unique SQL view name
- [ ] Authorization check configured
- [ ] EndUserText.label provided
- [ ] Key fields marked with `key`
- [ ] CURR/QUAN fields have semantic annotations
- [ ] Text join uses $session.system_language
- [ ] Aliases provided for calculated fields

---

## ABAP Access

```abap
" Direct SELECT
SELECT * FROM z_material_basic
  WHERE MaterialType = 'FERT'
  INTO TABLE @DATA(lt_materials).

" SALV IDA Display
cl_salv_gui_table_ida=>create_for_cds_view(
  CONV #( 'Z_MATERIAL_BASIC' )
)->fullscreen( )->display( ).
```
