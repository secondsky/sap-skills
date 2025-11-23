# ABAP CDS Built-in Functions Reference

Complete reference for all built-in functions available in ABAP CDS views.

**Source**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abencds_f1_builtin_functions.htm

---

## String Functions

### concat(arg1, arg2)
Concatenates two strings.

```sql
concat(first_name, last_name) as FullName
-- 'John' + 'Doe' = 'JohnDoe'
```

### concat_with_space(arg1, arg2, spaces)
Concatenates strings with specified number of spaces.

```sql
concat_with_space(first_name, last_name, 1) as FullName
-- 'John' + 'Doe' = 'John Doe'
```

### length(string)
Returns the length of a string.

```sql
length(description) as DescLength
-- 'Hello' = 5
```

### left(string, n)
Returns leftmost n characters.

```sql
left(material_number, 4) as MaterialPrefix
-- '12345678' = '1234'
```

### right(string, n)
Returns rightmost n characters.

```sql
right(material_number, 3) as MaterialSuffix
-- '12345678' = '678'
```

### substring(string, pos, len)
Extracts substring from position for length.

```sql
substring(document_number, 3, 5) as SubDoc
-- '1234567890' starting at 3 for 5 = '34567'
```

**Note**: Position is 1-based.

### upper(string)
Converts to uppercase.

```sql
upper(name) as NameUpper
-- 'Hello World' = 'HELLO WORLD'
```

### lower(string)
Converts to lowercase.

```sql
lower(name) as NameLower
-- 'Hello World' = 'hello world'
```

### lpad(string, length, pad_char)
Left-pads string to specified length.

```sql
lpad(document_number, 10, '0') as PaddedDoc
-- '12345' = '0000012345'
```

**Note**: If original length exceeds target, string is truncated.

### rpad(string, length, pad_char)
Right-pads string to specified length.

```sql
rpad(name, 20, ' ') as PaddedName
-- 'John' = 'John                '
```

### ltrim(string, trim_char)
Removes characters from left side.

```sql
ltrim(document_number, '0') as TrimmedDoc
-- '0000012345' = '12345'
```

### rtrim(string, trim_char)
Removes characters from right side.

```sql
rtrim(name, ' ') as TrimmedName
-- 'John     ' = 'John'
```

### replace(string, old, new)
Replaces all occurrences of substring.

```sql
replace(phone, '-', '') as PhoneClean
-- '123-456-7890' = '1234567890'
```

### instr(string, substring)
Finds position of substring (0 if not found).

```sql
instr(email, '@') as AtPosition
-- 'user@example.com' = 5
```

---

## Numeric Functions

### abs(number)
Returns absolute value.

```sql
abs(amount) as AbsoluteAmount
-- -100 = 100
-- 100 = 100
```

### ceil(number)
Rounds up to nearest integer.

```sql
ceil(price) as CeilingPrice
-- 5.1 = 6
-- 5.9 = 6
-- -5.1 = -5
```

### floor(number)
Rounds down to nearest integer.

```sql
floor(price) as FloorPrice
-- 5.1 = 5
-- 5.9 = 5
-- -5.1 = -6
```

### round(number, decimals)
Rounds to specified decimal places.

```sql
round(price, 2) as RoundedPrice
-- 5.567 with 2 decimals = 5.57
-- 5.564 with 2 decimals = 5.56
```

**Negative decimals**: Round to left of decimal point
```sql
round(12345, -2) as RoundedThousands
-- 12345 = 12300
```

### div(dividend, divisor)
Integer division (truncates decimal).

```sql
div(total_minutes, 60) as Hours
-- 125 / 60 = 2
```

### division(dividend, divisor, decimals)
Division with specified decimal precision.

```sql
division(10, 3, 4) as Result
-- 10 / 3 with 4 decimals = 3.3333
```

### mod(dividend, divisor)
Returns remainder (modulo).

```sql
mod(total_minutes, 60) as RemainingMinutes
-- 125 mod 60 = 5
```

---

## Date and Time Functions

### dats_add_days(date, days)
Adds days to date.

```sql
dats_add_days(order_date, 7) as DeliveryDate
-- '20241115' + 7 = '20241122'
```

**Negative days**: Subtract days
```sql
dats_add_days(order_date, -30) as PreviousMonth
```

### dats_add_months(date, months)
Adds months to date.

```sql
dats_add_months(start_date, 1) as NextMonth
-- '20241115' + 1 = '20241215'
```

### dats_days_between(date1, date2)
Returns days between two dates.

```sql
dats_days_between(order_date, delivery_date) as LeadTime
-- '20241101' to '20241115' = 14
```

**Note**: Returns negative if date1 > date2.

### dats_is_valid(date)
Validates date (returns 1 or 0).

```sql
dats_is_valid(input_date) as IsValidDate
-- '20241115' = 1
-- '00000000' = 0
-- '20241332' = 0
```

---

## Timestamp Functions

### tstmp_add_seconds(timestamp, seconds, fail)
Adds seconds to timestamp.

```sql
tstmp_add_seconds(created_at, 3600, 'FAIL') as OneHourLater
```

### tstmp_seconds_between(ts1, ts2, fail)
Seconds between timestamps.

```sql
tstmp_seconds_between(start_ts, end_ts, 'FAIL') as DurationSeconds
```

### tstmp_current_utctimestamp()
Current UTC timestamp.

```sql
tstmp_current_utctimestamp() as CurrentTimestamp
```

**Note**: The third parameter in timestamp functions controls error handling. Use `'FAIL'` to propagate errors if timestamps are invalid, or `'NULL'` to return NULL on error. Ensure timestamps are in valid format (YYYYMMDDHHMMSS) before using these functions.

---

## COALESCE Function

### coalesce(arg1, arg2, ...)
Returns first non-null argument.

```sql
coalesce(customer_name, 'Unknown') as DisplayName
-- NULL = 'Unknown'
-- 'John' = 'John'

coalesce(override_price, standard_price, 0) as FinalPrice
-- First non-null value
```

---

## CAST Expression

### Syntax
```sql
cast(expression as data_type)
```

### ABAP Data Types

| Type | Syntax | Example |
|------|--------|---------|
| Character | `abap.char(n)` | `cast(num as abap.char(10))` |
| Numeric text | `abap.numc(n)` | `cast(num as abap.numc(8))` |
| Integer | `abap.int4` | `cast(str as abap.int4)` |
| Date | `abap.dats` | `cast(str as abap.dats)` |
| Time | `abap.tims` | `cast(str as abap.tims)` |
| Currency key | `abap.cuky` | `cast('EUR' as abap.cuky)` |
| Currency amount | `abap.curr(n,d)` | `cast(num as abap.curr(15,2))` |
| Unit of measure | `abap.unit(n)` | `cast('KG' as abap.unit(3))` |
| Quantity | `abap.quan(n,d)` | `cast(num as abap.quan(13,3))` |
| Decimal | `abap.dec(n,d)` | `cast(num as abap.dec(11,2))` |
| String | `abap.string` | `cast(char as abap.string)` |
| Raw | `abap.raw(n)` | `cast(hex as abap.raw(16))` |

### Examples

```sql
-- Convert number to text with leading zeros
lpad(cast(document_number as abap.char(10)), 10, '0') as FormattedDoc,

-- Fixed currency literal
cast('EUR' as abap.cuky) as DefaultCurrency,

-- Decimal precision
cast(amount as abap.curr(15,2)) as FormattedAmount
```

### PRESERVING TYPE

Maintain original type definition:
```sql
cast(field as abap.char(10) preserving type) as TypedField
```

---

## Aggregate Functions

Used with GROUP BY clause.

### sum(field)
Sum of values.

```sql
sum(amount) as TotalAmount
```

### avg(field)
Average of values.

```sql
avg(price) as AveragePrice
```

### min(field)
Minimum value.

```sql
min(order_date) as FirstOrder
```

### max(field)
Maximum value.

```sql
max(order_date) as LastOrder
```

### count(*)
Count rows.

```sql
count(*) as RowCount
```

### count(distinct field)
Count distinct values.

```sql
count(distinct customer) as UniqueCustomers
```

### Example with GROUP BY

```sql
define view Z_ORDER_SUMMARY as select from vbap
{
  vbeln,
  sum(netwr) as TotalAmount,
  count(*) as ItemCount,
  min(erdat) as FirstItemDate,
  max(erdat) as LastItemDate,
  avg(netwr) as AverageAmount
}
group by vbeln
having sum(netwr) > 1000
```

---

## Special Functions

### decimal_shift(amount, currency)
Shifts decimal based on currency decimals.

```sql
decimal_shift(amount => netwr, currency => waers) as ShiftedAmount
```

### unit_conversion(quantity, source_unit, target_unit)
Converts units of measure.

```sql
unit_conversion(
  quantity => menge,
  source_unit => meins,
  target_unit => 'KG'
) as QuantityInKG
```

### currency_conversion(amount, source_currency, target_currency, date)
Converts currency amounts.

```sql
currency_conversion(
  amount => netwr,
  source_currency => waers,
  target_currency => 'EUR',
  exchange_rate_date => erdat
) as AmountInEUR
```

**Platform Note**: `unit_conversion` and `currency_conversion` are primarily optimized for SAP HANA environments and may have limited support on other database platforms. These functions require the appropriate conversion tables (T006, TCURR) to be maintained. Verify availability with your system administrator before using in production queries.

---

## Complex Function Examples

### Time Formatting (Minutes to HH:MM)

```sql
concat(
  concat(
    lpad(ltrim(cast(div(flight_time, 60) as abap.char(12)), '0'), 2, '0'),
    ':'
  ),
  lpad(ltrim(cast(mod(flight_time, 60) as abap.char(12)), '0'), 2, '0')
) as FormattedTime
-- 125 minutes = '02:05'
```

### Date Validation with Default

```sql
case
  when dats_is_valid(input_date) = 1 then input_date
  else '00000000'
end as ValidatedDate
```

### Conditional Text Concatenation

```sql
case
  when last_name is not null
    then concat_with_space(first_name, last_name, 1)
  else first_name
end as DisplayName
```

### Percentage Calculation

```sql
case
  when total > 0
    then division(part * 100, total, 2)
  else cast(0 as abap.dec(5,2))
end as Percentage
```

---

## Function Nesting

Functions can be nested for complex transformations:

```sql
upper(
  replace(
    ltrim(
      concat_with_space(first_name, last_name, 1),
      ' '
    ),
    ' ',
    '_'
  )
) as NormalizedName
-- '  John Doe  ' = 'JOHN_DOE'
```

---

## Best Practices

1. **Use COALESCE for defaults**: Avoid null in calculations
2. **CAST for type safety**: Explicit types prevent runtime errors
3. **Aggregate with care**: Always include GROUP BY for non-aggregated fields
4. **Validate dates**: Use `dats_is_valid` before date arithmetic
5. **Consider performance**: Complex functions may impact query time

---

## Documentation Links

- **ABAP Keyword Documentation — CDS Built-in Functions**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abencds_f1_builtin_functions.htm
- **ABAP Keyword Documentation — CDS SQL Functions**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abencds_sql_functions_v2.htm
- **SAP Learning - CDS Functions**: https://learning.sap.com/learning-journeys/acquire-core-abap-skills/calling-built-in-functions-in-cds-views

**Last Updated**: 2025-11-23
