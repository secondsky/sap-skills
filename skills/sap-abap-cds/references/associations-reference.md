# ABAP CDS Associations Reference

Complete reference for defining and using associations in ABAP CDS views.

**Source**: https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-us/abencds_f1_association.htm

---

## What Are Associations?

Associations define relationships between CDS entities. Unlike joins, associations are **join-on-demand** - the actual database join only occurs when fields from the associated entity are accessed.

**Key Benefits**:
- Lazy evaluation improves performance
- Cleaner data model representation
- Reusable relationship definitions
- Support for navigation in OData and RAP

---

## Association Syntax

### Basic Definition

```sql
define view Z_EXAMPLE as select from source_table as s
  association [cardinality] to target_entity as _Alias
    on condition
{
  key s.key_field,
      s.field1,

      // Expose association
      _Alias
}
```

### Naming Convention

SAP recommends prefixing association aliases with underscore:
- `_Customer`
- `_Items`
- `_Currency`

This distinguishes associations from regular fields.

---

## Cardinality

### Cardinality Notation

| Syntax | Meaning | Join Type |
|--------|---------|-----------|
| `[0..1]` | Zero or one | LEFT OUTER MANY TO ONE |
| `[1]` | Exactly one (shorthand for [0..1]) | LEFT OUTER MANY TO ONE |
| `[1..1]` | Exactly one | LEFT OUTER MANY TO ONE |
| `[0..*]` | Zero or more | LEFT OUTER MANY TO MANY |
| `[*]` | Zero or more (shorthand) | LEFT OUTER MANY TO MANY |
| `[1..*]` | One or more | LEFT OUTER MANY TO MANY |
| No cardinality | Default [0..1] | LEFT OUTER MANY TO ONE |

### New Cardinality Syntax (Release 2302+)

```sql
association to one _Target on ...      -- Equivalent to [0..1]
association to many _Targets on ...    -- Equivalent to [0..*]
```

**Compatibility Note**: This simplified syntax is available in SAP S/4HANA Cloud 2302+ and SAP NetWeaver ABAP 7.57+. Earlier releases require the bracketed cardinality notation `[0..1]`, `[0..*]`, etc.

### Cardinality Examples

```sql
-- Optional single record (e.g., customer details)
association [0..1] to customer_details as _Details
  on $projection.kunnr = _Details.kunnr

-- Required single record (e.g., company code)
association [1..1] to t001 as _Company
  on $projection.bukrs = _Company.bukrs

-- Multiple records (e.g., order items)
association [0..*] to order_items as _Items
  on $projection.vbeln = _Items.vbeln

-- At least one record expected
association [1..*] to spfli as _Flights
  on $projection.carrid = _Flights.carrid
```

---

## Join Condition

### Using $projection

Reference fields from the current view's projection:

```sql
association [0..1] to makt as _Text
  on $projection.matnr = _Text.matnr
 and $projection.spras = _Text.spras
```

### Using Source Alias

Reference fields from the source table directly:

```sql
define view Z_EXAMPLE as select from mara as m
  association [0..1] to makt as _Text
    on m.matnr = _Text.matnr
```

### Complex Conditions

```sql
association [0..*] to price_conditions as _Prices
  on $projection.matnr = _Prices.matnr
 and $projection.vkorg = _Prices.vkorg
 and _Prices.valid_from <= $session.system_date
 and _Prices.valid_to >= $session.system_date
```

---

## Exposing Associations

### Direct Exposure

Makes association available to consumers:

```sql
{
  key field1,
      field2,

      // Expose entire association
      _Customer,
      _Items
}
```

### Redirected Association

Redirect to a different target:

```sql
_Customer : redirected to Z_CUSTOMER_VIEW
```

### Filtered Association

Expose with additional filter:

```sql
_Items[Status = 'ACTIVE'] as _ActiveItems
```

---

## Using Associations

### Ad-hoc Field Access

Access individual fields (triggers join):

```sql
{
  key vbeln,
      _Customer.name1 as CustomerName,
      _Customer.ort01 as CustomerCity
}
```

### Path Expressions

Navigate through associations:

```sql
_Header._Customer.name1 as CustomerName
```

### Path Filter with Cardinality Indicator

When filtering reduces a to-many association to single record:

```sql
_Items[1: ItemNumber = '000010'].Material as FirstItemMaterial
```

The `1:` indicates the filter results in a single record.

---

## Association vs Join Comparison

### When to Use Associations

| Use Associations When | Use Joins When |
|----------------------|----------------|
| Relationship is optional | All fields always needed |
| Navigation from consumers | Complex join conditions |
| OData/RAP integration | Performance-critical aggregations |
| Clean data model | Multiple conditions on same table |

### Performance Difference

**Association (Join-on-Demand)**:
```sql
define view Z_WITH_ASSOC as select from vbak
  association [0..1] to kna1 as _Customer
    on $projection.kunnr = _Customer.kunnr
{
  key vbeln,
      kunnr,
      _Customer  -- Join NOT executed yet
}

-- ABAP: SELECT vbeln, kunnr FROM z_with_assoc
-- Only 2 fields selected, no join needed
```

**Join (Always Executed)**:
```sql
define view Z_WITH_JOIN as select from vbak as v
  left outer join kna1 as c on v.kunnr = c.kunnr
{
  key v.vbeln,
      v.kunnr,
      c.name1   -- Join ALWAYS executed
}

-- ABAP: SELECT vbeln, kunnr FROM z_with_join
-- Join executed even if name1 not needed
```

---

## Default Association

Create association to same entity type for self-reference:

```sql
define view Z_HIERARCHY as select from org_unit as o
  association [0..1] to Z_HIERARCHY as _Parent
    on $projection.parent_id = _Parent.org_unit_id
{
  key org_unit_id,
      parent_id,
      name,
      _Parent
}
```

---

## Propagated Associations

Associations from underlying views are automatically propagated:

```sql
-- Base view
define view Z_BASE as select from mara
  association [0..1] to makt as _Text on ...
{
  key matnr,
      _Text
}

-- Consuming view - _Text is automatically available
define view Z_CONSUMER as select from Z_BASE
{
  key matnr,
      _Text  -- Propagated from Z_BASE
}
```

### Blocking Propagation

```sql
@Metadata.ignorePropagatedAnnotations: true
define view Z_NO_PROPAGATION as select from Z_BASE
{
  key matnr
  // _Text NOT available unless explicitly defined
}
```

---

## Composition Associations

For parent-child relationships in RAP:

```sql
define view entity Z_SALES_ORDER
  as select from vbak
  composition [0..*] of Z_SALES_ORDER_ITEM as _Items
{
  key vbeln,
      erdat,
      _Items
}

define view entity Z_SALES_ORDER_ITEM
  as select from vbap
  association to parent Z_SALES_ORDER as _Header
    on $projection.vbeln = _Header.vbeln
{
  key vbeln,
  key posnr,
      matnr,
      _Header
}
```

---

## Accessing Associations in ABAP

### Using Path Expression

```abap
SELECT
  vbeln,
  \_Customer-name1 AS customer_name,
  \_Customer-ort01 AS customer_city
FROM z_sales_order
INTO TABLE @DATA(lt_result).
```

### Using Exposed Association

```abap
SELECT FROM z_sales_order
  FIELDS vbeln,
         \_Customer[ ]-name1 AS customer_name
INTO TABLE @DATA(lt_result).
```

---

## Performance Optimization

### TO ONE Optimization

SAP HANA optimizes `TO ONE` cardinality:
- Join can be pruned if target fields not selected
- Better query plan generation

```sql
-- Good: Enables optimization
association [0..1] to kna1 as _Customer on ...

-- Avoid if actually single record:
association [0..*] to kna1 as _Customer on ...
```

### Cardinality Warnings

Set correct cardinality to avoid:
1. Syntax warnings in ADT
2. Unexpected duplicate rows
3. Performance issues

---

## Common Patterns

### Master Data Text Association

```sql
association [0..1] to makt as _Text
  on $projection.matnr = _Text.matnr
 and _Text.spras = $session.system_language

{
  key matnr,
      _Text.maktx as MaterialDescription
}
```

### Currency/Unit Association

```sql
association [0..1] to tcurc as _Currency
  on $projection.waers = _Currency.waers

{
  waers,
  @Semantics.amount.currencyCode: 'waers'
  netwr,
  _Currency
}
```

### Hierarchical Data

```sql
association [0..1] to Z_CATEGORY as _Parent
  on $projection.parent_id = _Parent.category_id
association [0..*] to Z_CATEGORY as _Children
  on $projection.category_id = _Children.parent_id
```

---

## Restrictions

1. **No to-many in WHERE for extend view**: Cannot filter on [n..*] associations in view extensions
2. **Cardinality must match data**: Mismatched cardinality causes warnings/errors
3. **No aggregate on associations**: Cannot use SUM/AVG directly on associated fields
4. **Path depth limits**: Very deep paths may impact performance

---

## Documentation Links

- **SAP Help - Associations**: https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-us/abencds_f1_association.htm
- **SAP Community - Cardinality**: https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/cardinality-of-association-in-cds-view/ba-p/13351899
- **New Cardinality Syntax**: https://community.sap.com/t5/application-development-and-automation-blog-posts/new-cardinality-syntax-for-performance-optimization-in-abap-cds-and-abap/ba-p/13554546

**Last Updated**: 2025-11-23
