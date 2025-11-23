# ABAP CDS Expressions Reference

Complete reference for expressions, operators, and conditional logic in ABAP CDS views.

**Source**: https://discoveringabap.com/2021/10/13/exploring-abap-on-hana-7-expressions-operations-in-cds-views/

---

## Projection List Elements

The projection list (SELECT list) can contain:

| Element | Description | Alias Required |
|---------|-------------|----------------|
| Field | Table/view field | Optional |
| Literal | Constant value | Yes |
| Expression | Calculated value | Yes |
| Session Variable | System value | Yes |
| Association | Relationship | Optional |

---

## Field References

### Simple Field

```sql
{
  matnr,
  maktx
}
```

### With Source Prefix

```sql
{
  source.matnr,
  source.maktx
}
```

### With Alias

```sql
{
  matnr as MaterialNumber,
  maktx as Description
}
```

### Key Fields

```sql
{
  key matnr,
  key spras,
      maktx
}
```

---

## Literals

### Typed Literals

```sql
{
  'EUR' as DefaultCurrency,          -- Character
  100 as DefaultQuantity,            -- Integer
  123.45 as DefaultPrice,            -- Decimal
  abap.dats'20241115' as FixedDate   -- Typed date
}
```

### Untyped Literals

```sql
{
  'Active' as StatusText,
  0 as InitialValue
}
```

**Note**: Literals require an alias.

---

## Session Variables

Access ABAP system fields:

| Variable | Equivalent | Since |
|----------|------------|-------|
| `$session.user` | SY-UNAME | 7.4 SP8 |
| `$session.client` | SY-MANDT | 7.4 SP8 |
| `$session.system_language` | SY-LANGU | 7.4 SP8 |
| `$session.system_date` | SY-DATUM | 7.51 |

```sql
{
  $session.user as CurrentUser,
  $session.client as ClientId,
  $session.system_language as Language,
  $session.system_date as Today
}
```

---

## Comparison Operators

### Basic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equal | `status = 'A'` |
| `<>` | Not equal | `status <> 'D'` |
| `<` | Less than | `amount < 1000` |
| `>` | Greater than | `amount > 0` |
| `<=` | Less or equal | `date <= $session.system_date` |
| `>=` | Greater or equal | `priority >= 1` |

### BETWEEN Operator

```sql
where date between '20240101' and '20241231'

-- Equivalent to:
where date >= '20240101' and date <= '20241231'
```

### IN Operator

```sql
where status in ('A', 'B', 'C')

-- Equivalent to:
where status = 'A' or status = 'B' or status = 'C'
```

### NULL Checks

```sql
where description is null
where description is not null
```

### Pattern Matching (LIKE)

```sql
where name like 'SAP%'        -- Starts with SAP
where name like '%GmbH'       -- Ends with GmbH
where name like '%Partner%'   -- Contains Partner
where code like 'A_B'         -- A followed by any char, then B
```

**Escape Character**:
```sql
where name like '%10#%%' escape '#'  -- Contains literal %
```

---

## Arithmetic Operations

### Basic Arithmetic

| Operation | Operator | Example |
|-----------|----------|---------|
| Addition | `+` | `price + tax` |
| Subtraction | `-` | `gross - discount` |
| Multiplication | `*` | `quantity * price` |
| Division | `/` | `total / count` |
| Negation | `-` | `-amount` |

### Examples

```sql
{
  quantity * unit_price as LineTotal,
  gross_amount - discount as NetAmount,
  total / 100 as Percentage,
  -balance as NegatedBalance
}
```

### Operator Precedence

1. `()` Parentheses
2. `-` Negation
3. `*`, `/` Multiplication, Division
4. `+`, `-` Addition, Subtraction

```sql
-- Without parentheses: 10 + (5 * 2) = 20
10 + 5 * 2

-- With parentheses: (10 + 5) * 2 = 30
(10 + 5) * 2
```

---

## CASE Expressions

### Simple CASE

Compare single expression to multiple values:

```sql
case status
  when 'A' then 'Active'
  when 'I' then 'Inactive'
  when 'D' then 'Deleted'
  else 'Unknown'
end as StatusText
```

### Searched CASE

Multiple independent conditions:

```sql
case
  when amount > 10000 then 'High'
  when amount > 1000 then 'Medium'
  when amount > 0 then 'Low'
  else 'Zero'
end as AmountCategory
```

### Nested CASE

```sql
case type
  when 'S' then
    case status
      when 'A' then 'Sales Active'
      when 'C' then 'Sales Closed'
      else 'Sales Other'
    end
  when 'P' then 'Purchase'
  else 'Other'
end as TypeDescription
```

### CASE with Calculations

```sql
case indicator
  when 'H' then amount
  when 'S' then -amount
  else 0
end as SignedAmount
```

### CASE in WHERE Clause

```sql
where case
        when type = 'A' then priority
        else 0
      end > 5
```

**Note**: Using CASE in WHERE clause is useful for conditional filtering without creating intermediate computed fields. However, it may impact query performance compared to post-filtering in ABAP or using separate WHERE conditions. Use judiciously on large datasets.

---

## Logical Operators

### AND

Both conditions must be true:

```sql
where status = 'A' and type = 'S'
```

### OR

At least one condition must be true:

```sql
where status = 'A' or status = 'B'
```

### NOT

Negates condition:

```sql
where not status = 'D'
-- Equivalent to: where status <> 'D'
```

### Complex Logic

```sql
where (status = 'A' and type = 'S')
   or (status = 'B' and priority > 5)
```

### Precedence

1. `NOT`
2. `AND`
3. `OR`

Use parentheses for clarity:
```sql
-- Unclear:
where a = 1 or b = 2 and c = 3

-- Clear:
where a = 1 or (b = 2 and c = 3)
```

---

## Aggregate Expressions

### Functions

| Function | Description |
|----------|-------------|
| `sum(field)` | Sum of values |
| `avg(field)` | Average |
| `min(field)` | Minimum |
| `max(field)` | Maximum |
| `count(*)` | Row count |
| `count(distinct field)` | Distinct count |

### GROUP BY

Required for non-aggregated fields:

```sql
{
  customer,
  sum(amount) as TotalAmount,
  count(*) as OrderCount
}
group by customer
```

### HAVING

Filter aggregated results:

```sql
{
  customer,
  sum(amount) as TotalAmount
}
group by customer
having sum(amount) > 10000
```

### Complete Example

```sql
define view Z_CUSTOMER_SUMMARY as select from sales_order
{
  customer,
  sum(amount) as TotalSales,
  avg(amount) as AvgOrderValue,
  min(order_date) as FirstOrder,
  max(order_date) as LastOrder,
  count(*) as OrderCount,
  count(distinct product) as UniqueProducts
}
group by customer
having count(*) >= 5
```

---

## Path Expressions

Navigate through associations:

### Basic Path

```sql
_Customer.name1 as CustomerName
```

### Multi-level Path

```sql
_Order._Customer._Country.name as CountryName
```

### Path with Filter

```sql
_Items[ItemNumber = '000010'].Material as FirstMaterial
```

### Cardinality Indicator

When filter reduces to single result:

```sql
_Items[1: Status = 'A'].Quantity as ActiveQty
```

---

## Conditional Navigation

Combine CASE with paths:

```sql
case
  when type = 'C' then _Customer.name1
  when type = 'V' then _Vendor.name1
  else 'Unknown'
end as PartnerName
```

---

## NULL Handling

### COALESCE

Return first non-null value:

```sql
coalesce(override_price, standard_price, 0) as EffectivePrice
```

### CASE with NULL

```sql
case
  when field is null then 'Not Set'
  else field
end as SafeField
```

### Arithmetic with NULL

NULL in arithmetic produces NULL:

```sql
-- If discount is NULL, result is NULL
price - discount as NetPrice

-- Safe version:
price - coalesce(discount, 0) as NetPrice
```

---

## Type Conversion

### Implicit Conversion

Some conversions happen automatically.

### Explicit CAST

```sql
cast(numeric_field as abap.char(10)) as TextField,
cast(char_field as abap.int4) as IntField,
cast(amount as abap.curr(15,2)) as FormattedAmount
```

### Common Type Conversions

| From | To | Example |
|------|-----|---------|
| NUMC | CHAR | `cast(numc as abap.char(n))` |
| INT | CHAR | `cast(int as abap.char(n))` |
| CHAR | INT | `cast(char as abap.int4)` |
| CURR | DEC | `cast(curr as abap.dec(n,d))` |

---

## Best Practices

1. **Use parentheses**: Clarify complex logic
2. **Handle NULL**: Use COALESCE or CASE
3. **Alias expressions**: Always name calculated fields
4. **Type consistency**: Ensure CASE branches return same type
5. **Performance**: Simple expressions perform better

---

## Documentation Links

- **ABAP Keyword Documentation — CDS DDL: CDS View Entity, sql_functions**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abencds_f1_builtin_functions.htm
- **Discovering ABAP - Expressions**: https://discoveringabap.com/2021/10/13/exploring-abap-on-hana-7-expressions-operations-in-cds-views/

**Last Updated**: 2025-11-23
