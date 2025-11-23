# CDS View Entities - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/15_CDS_View_Entities.md

---

## Basic Syntax

```cds
@AbapCatalog.sqlViewName: 'ZSQL_VIEW'
@AbapCatalog.compiler.compareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Demo CDS View'

define view entity ZDemo_CDS_View
  as select from zdemo_table as Source
{
  key Source.key_field as KeyField,
      Source.field1    as Field1,
      Source.field2    as Field2
}
```

---

## Field Selection

```cds
define view entity ZDemo_Fields
  as select from zdemo_table
{
  key key_field,                    // Direct field
      field1 as AliasName,          // With alias
      'Literal' as LiteralField,    // Literal value
      123 as NumericLiteral,        // Numeric literal
      abap.dats'20240101' as DateLiteral,  // Date literal
      $session.user as CurrentUser, // Session variable
      $session.client as Client
}
```

---

## Expressions

### Cast Expressions

```cds
cast( amount as abap.dec(15,2) ) as CastedAmount,
cast( quantity as abap.int4 ) as CastedQuantity,
cast( text as abap.char(100) ) as CastedText
```

### Arithmetic Expressions

```cds
price * quantity as TotalAmount,
amount / 100 as AmountPercentage,
value1 + value2 as Sum,
value1 - value2 as Difference
```

### Case Expressions

```cds
// Simple CASE
case status
  when 'A' then 'Active'
  when 'I' then 'Inactive'
  else 'Unknown'
end as StatusText,

// Searched CASE
case
  when amount > 1000 then 'High'
  when amount > 100 then 'Medium'
  else 'Low'
end as AmountCategory
```

### Coalesce

```cds
coalesce( nullable_field, 'Default' ) as FieldWithDefault,
coalesce( amount, 0 ) as AmountOrZero
```

---

## Built-in Functions

### String Functions

```cds
concat( first_name, last_name ) as FullName,
concat_with_space( first_name, last_name, 1 ) as SpacedName,
substring( text, 1, 10 ) as Excerpt,
length( description ) as DescLength,
left( code, 2 ) as Prefix,
right( code, 2 ) as Suffix,
upper( name ) as UpperName,
lower( name ) as LowerName,
ltrim( text, ' ' ) as LeftTrimmed,
rtrim( text, ' ' ) as RightTrimmed,
replace( text, 'old', 'new' ) as ReplacedText,
instr( text, 'pattern' ) as PatternPosition
```

### Numeric Functions

```cds
abs( amount ) as AbsoluteAmount,
ceil( value ) as Ceiling,
floor( value ) as FloorValue,
round( price, 2 ) as RoundedPrice,
div( total, count ) as IntegerDivision,
mod( number, 10 ) as Remainder,
division( amount, 3, 2 ) as PreciseDivision
```

### Date/Time Functions

```cds
dats_is_valid( date_field ) as IsValidDate,
dats_days_between( date1, date2 ) as DaysDiff,
dats_add_days( date_field, 7 ) as DatePlusWeek,
dats_add_months( date_field, 1 ) as DatePlusMonth,
$session.system_date as Today
```

### Type Conversion

```cds
cast( char_field as abap.numc(10) ) as NumericString,
cast( amount as abap.fltp ) as FloatingPoint
```

---

## Aggregate Functions

```cds
define view entity ZDemo_Aggregates
  as select from zdemo_table
{
  key category,
  count(*) as TotalCount,
  count( distinct status ) as UniqueStatuses,
  sum( amount ) as TotalAmount,
  avg( price ) as AveragePrice,
  min( date_field ) as FirstDate,
  max( date_field ) as LastDate
}
group by category
```

---

## Joins

### Inner Join

```cds
define view entity ZDemo_InnerJoin
  as select from zdemo_header as Header
    inner join zdemo_item as Item
      on Header.header_id = Item.header_id
{
  key Header.header_id,
  key Item.item_id,
      Header.description,
      Item.quantity
}
```

### Left Outer Join

```cds
define view entity ZDemo_LeftJoin
  as select from zdemo_header as Header
    left outer join zdemo_item as Item
      on Header.header_id = Item.header_id
{
  key Header.header_id,
      Header.description,
      Item.item_id,
      Item.quantity
}
```

### Multiple Joins

```cds
define view entity ZDemo_MultiJoin
  as select from zdemo_header as Header
    inner join zdemo_item as Item
      on Header.header_id = Item.header_id
    left outer join zdemo_text as Text
      on Item.item_id = Text.item_id
{
  // fields
}
```

---

## Associations

### Definition

```cds
define view entity ZDemo_Associations
  as select from zdemo_header as Header
  association [1..*] to zdemo_item as _Items
    on Header.header_id = _Items.header_id
  association [0..1] to zdemo_status as _Status
    on Header.status = _Status.status_code
{
  key Header.header_id,
      Header.description,
      Header.status,

      // Expose associations
      _Items,
      _Status
}
```

### Cardinalities

```cds
association [0..1] to Target    // Optional, single
association [1] to Target       // Mandatory, single
association [1..*] to Target    // One or more
association [0..*] to Target    // Zero or more (default)
association [*] to Target       // Same as [0..*]
```

### Path Expressions

```cds
// Access associated fields
_Status.description as StatusDescription,
_Items.quantity as ItemQuantity
```

---

## Annotations

### CDS Annotations

```cds
@AbapCatalog.sqlViewName: 'ZSQLVIEW'
@AbapCatalog.preserveKey: true
@AbapCatalog.compiler.compareFilter: true

@AccessControl.authorizationCheck: #NOT_REQUIRED
// or #CHECK, #PRIVILEGED_ONLY

@EndUserText.label: 'Human readable name'
```

### Element Annotations

```cds
define view entity ZDemo_Annotations
  as select from zdemo_table
{
  @EndUserText.label: 'Customer ID'
  @EndUserText.quickInfo: 'Unique customer identifier'
  key customer_id as CustomerId,

  @Semantics.amount.currencyCode: 'CurrencyCode'
  amount as Amount,

  @Semantics.currencyCode: true
  currency as CurrencyCode,

  @Semantics.unitOfMeasure: true
  unit as Unit,

  @Semantics.quantity.unitOfMeasure: 'Unit'
  quantity as Quantity
}
```

### UI Annotations

```cds
@UI: {
  headerInfo: {
    typeName: 'Order',
    typeNamePlural: 'Orders',
    title: { value: 'OrderId' }
  }
}

@UI.lineItem: [{ position: 10 }]
@UI.identification: [{ position: 10 }]
key order_id as OrderId
```

---

## Input Parameters

```cds
define view entity ZDemo_Parameters
  with parameters
    p_date : abap.dats,
    p_category : abap.char(10)
  as select from zdemo_table
{
  key id,
      description,
      $parameters.p_date as ParameterDate,
      $parameters.p_category as ParameterCategory
}
where category = $parameters.p_category
  and date_field >= $parameters.p_date
```

### Calling with Parameters

```abap
SELECT * FROM zdemo_parameters( p_date = '20240101', p_category = 'A' )
  INTO TABLE @DATA(result).
```

---

## Composition and Hierarchy

```cds
// Root entity
define root view entity ZDemo_Root
  as select from zdemo_root
  composition [0..*] of ZDemo_Child as _Children
{
  key root_id,
      description,
      _Children
}

// Child entity
define view entity ZDemo_Child
  as select from zdemo_child
  association to parent ZDemo_Root as _Root
    on $projection.root_id = _Root.root_id
{
  key root_id,
  key child_id,
      description,
      _Root
}
```

---

## Extension Views

```cds
// Extend existing view
extend view entity ZExisting_View with
{
  Source.additional_field as AdditionalField,
  'Literal' as NewLiteral
}
```

---

## ABAP Consumption

### SELECT

```abap
" Direct select
SELECT * FROM zdemo_cds_view INTO TABLE @DATA(result).

" With association path
SELECT *, \_Items-quantity FROM zdemo_header
  INTO TABLE @DATA(with_items).

" With parameters
SELECT * FROM zdemo_params( p_date = @lv_date )
  INTO TABLE @DATA(parameterized).
```

### Association Access

```abap
" Follow association
SELECT * FROM zdemo_header
  ASSOCIATION \_Items
  INTO TABLE @DATA(items).
```

---

## Best Practices

1. **Use view entities** over classic CDS views
2. **Define meaningful aliases** for all fields
3. **Expose associations** for flexibility
4. **Add semantic annotations** for Fiori integration
5. **Use parameters** for flexible filtering
6. **Document with @EndUserText** annotations
7. **Set appropriate authorization checks**
8. **Keep views focused** and composable
