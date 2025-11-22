# Data Transformation Language (DTL) Functions Reference

Complete reference for Data Transformation Language functions in SAP Data Intelligence.

## Table of Contents

1. [Overview](#overview)
2. [String Functions](#string-functions)
3. [Numeric Functions](#numeric-functions)
4. [Date and Time Functions](#date-and-time-functions)
5. [Data Type Conversion Functions](#data-type-conversion-functions)
6. [Miscellaneous Functions](#miscellaneous-functions)

---

## Overview

Data Transformation Language (DTL) provides SQL-like functions for data processing in:

- Data Transform operator
- Data preparation tools
- Structured data operators

**Syntax Pattern:**
```
FUNCTION_NAME(argument1, argument2, ...)
```

---

## String Functions

Functions for extracting, manipulating, and returning string information.

### CONCAT

Concatenates two or more strings.

```sql
CONCAT(string1, string2 [, string3, ...])
```

**Example:**
```sql
CONCAT('Hello', ' ', 'World') -- Returns: 'Hello World'
```

### SUBSTRING

Extracts a portion of a string.

```sql
SUBSTRING(string, start_position [, length])
```

**Example:**
```sql
SUBSTRING('SAP Data Intelligence', 5, 4) -- Returns: 'Data'
```

### SUBSTRAFTER

Returns substring after the first occurrence of a delimiter.

```sql
SUBSTRAFTER(string, delimiter)
```

**Example:**
```sql
SUBSTRAFTER('user@domain.com', '@') -- Returns: 'domain.com'
```

### SUBSTRBEFORE

Returns substring before the first occurrence of a delimiter.

```sql
SUBSTRBEFORE(string, delimiter)
```

**Example:**
```sql
SUBSTRBEFORE('user@domain.com', '@') -- Returns: 'user'
```

### LEFT

Returns leftmost characters of a string.

```sql
LEFT(string, length)
```

**Example:**
```sql
LEFT('SAP Data', 3) -- Returns: 'SAP'
```

### RIGHT

Returns rightmost characters of a string.

```sql
RIGHT(string, length)
```

**Example:**
```sql
RIGHT('SAP Data', 4) -- Returns: 'Data'
```

### LENGTH

Returns the length of a string.

```sql
LENGTH(string)
```

**Example:**
```sql
LENGTH('SAP') -- Returns: 3
```

### UPPER / UCASE

Converts string to uppercase.

```sql
UPPER(string)
UCASE(string)
```

**Example:**
```sql
UPPER('sap data') -- Returns: 'SAP DATA'
```

### LOWER / LCASE

Converts string to lowercase.

```sql
LOWER(string)
LCASE(string)
```

**Example:**
```sql
LOWER('SAP DATA') -- Returns: 'sap data'
```

### TRIM

Removes leading and trailing spaces.

```sql
TRIM(string)
```

**Example:**
```sql
TRIM('  SAP  ') -- Returns: 'SAP'
```

### LTRIM

Removes leading spaces.

```sql
LTRIM(string)
```

### RTRIM

Removes trailing spaces.

```sql
RTRIM(string)
```

### LPAD

Pads string on the left to specified length.

```sql
LPAD(string, length [, pad_string])
```

**Example:**
```sql
LPAD('42', 5, '0') -- Returns: '00042'
```

### RPAD

Pads string on the right to specified length.

```sql
RPAD(string, length [, pad_string])
```

**Example:**
```sql
RPAD('SAP', 6, 'X') -- Returns: 'SAPXXX'
```

### REPLACE

Replaces occurrences of a substring.

```sql
REPLACE(string, search_string, replace_string)
```

**Example:**
```sql
REPLACE('SAP HANA', 'HANA', 'DI') -- Returns: 'SAP DI'
```

### LOCATE

Returns position of substring in string.

```sql
LOCATE(string, substring [, start_position])
```

**Example:**
```sql
LOCATE('SAP Data Intelligence', 'Data') -- Returns: 5
```

### ASCII

Returns ASCII code of first character.

```sql
ASCII(string)
```

**Example:**
```sql
ASCII('A') -- Returns: 65
```

### CHAR

Returns character for ASCII code.

```sql
CHAR(integer)
```

**Example:**
```sql
CHAR(65) -- Returns: 'A'
```

---

## Numeric Functions

Functions for mathematical operations on numeric data.

### ABS

Returns absolute value.

```sql
ABS(number)
```

**Example:**
```sql
ABS(-42) -- Returns: 42
```

### CEIL

Rounds up to nearest integer.

```sql
CEIL(number)
```

**Example:**
```sql
CEIL(4.2) -- Returns: 5
```

### FLOOR

Rounds down to nearest integer.

```sql
FLOOR(number)
```

**Example:**
```sql
FLOOR(4.8) -- Returns: 4
```

### ROUND

Rounds to specified decimal places.

```sql
ROUND(number [, decimal_places])
```

**Example:**
```sql
ROUND(3.14159, 2) -- Returns: 3.14
```

### MOD

Returns remainder of division.

```sql
MOD(dividend, divisor)
```

**Example:**
```sql
MOD(10, 3) -- Returns: 1
```

### POWER

Returns base raised to exponent.

```sql
POWER(base, exponent)
```

**Example:**
```sql
POWER(2, 3) -- Returns: 8
```

### SQRT

Returns square root.

```sql
SQRT(number)
```

**Example:**
```sql
SQRT(16) -- Returns: 4
```

### EXP

Returns e raised to power.

```sql
EXP(number)
```

**Example:**
```sql
EXP(1) -- Returns: 2.71828...
```

### LN

Returns natural logarithm.

```sql
LN(number)
```

**Example:**
```sql
LN(2.71828) -- Returns: ~1
```

### LOG

Returns logarithm with specified base.

```sql
LOG(base, number)
```

**Example:**
```sql
LOG(10, 100) -- Returns: 2
```

### SIGN

Returns sign of number (-1, 0, or 1).

```sql
SIGN(number)
```

**Example:**
```sql
SIGN(-42) -- Returns: -1
```

### UMINUS

Returns negation of number.

```sql
UMINUS(number)
```

**Example:**
```sql
UMINUS(42) -- Returns: -42
```

### RAND

Returns random number between 0 and 1.

```sql
RAND()
```

---

## Date and Time Functions

Functions for date and time operations.

### CURRENT_UTCDATE

Returns current UTC date.

```sql
CURRENT_UTCDATE()
```

### CURRENT_UTCTIME

Returns current UTC time.

```sql
CURRENT_UTCTIME()
```

### CURRENT_UTCTIMESTAMP

Returns current UTC timestamp.

```sql
CURRENT_UTCTIMESTAMP()
```

### ADD_DAYS

Adds days to a date.

```sql
ADD_DAYS(date, days)
```

**Example:**
```sql
ADD_DAYS('2025-01-01', 30) -- Returns: '2025-01-31'
```

### ADD_MONTHS

Adds months to a date.

```sql
ADD_MONTHS(date, months)
```

**Example:**
```sql
ADD_MONTHS('2025-01-15', 2) -- Returns: '2025-03-15'
```

### ADD_YEARS

Adds years to a date.

```sql
ADD_YEARS(date, years)
```

### ADD_SECONDS

Adds seconds to a timestamp.

```sql
ADD_SECONDS(timestamp, seconds)
```

### DAYS_BETWEEN

Returns days between two dates.

```sql
DAYS_BETWEEN(date1, date2)
```

**Example:**
```sql
DAYS_BETWEEN('2025-01-01', '2025-01-31') -- Returns: 30
```

### MONTHS_BETWEEN

Returns months between two dates.

```sql
MONTHS_BETWEEN(date1, date2)
```

### YEARS_BETWEEN

Returns years between two dates.

```sql
YEARS_BETWEEN(date1, date2)
```

### SECONDS_BETWEEN

Returns seconds between two timestamps.

```sql
SECONDS_BETWEEN(timestamp1, timestamp2)
```

### EXTRACT

Extracts date/time component.

```sql
EXTRACT(component FROM date_or_timestamp)
```

**Components:** YEAR, MONTH, DAY, HOUR, MINUTE, SECOND

**Example:**
```sql
EXTRACT(YEAR FROM '2025-06-15') -- Returns: 2025
```

### YEAR

Returns year from date.

```sql
YEAR(date)
```

### MONTH

Returns month from date (1-12).

```sql
MONTH(date)
```

### DAYOFMONTH

Returns day of month (1-31).

```sql
DAYOFMONTH(date)
```

### DAYOFYEAR

Returns day of year (1-366).

```sql
DAYOFYEAR(date)
```

### WEEK

Returns week number (1-53).

```sql
WEEK(date)
```

### ISOWEEK

Returns ISO week number.

```sql
ISOWEEK(date)
```

### QUARTER

Returns quarter (1-4).

```sql
QUARTER(date)
```

### HOUR

Returns hour (0-23).

```sql
HOUR(timestamp)
```

### MINUTE

Returns minute (0-59).

```sql
MINUTE(timestamp)
```

### SECOND

Returns second (0-59).

```sql
SECOND(timestamp)
```

### DAYNAME

Returns day name.

```sql
DAYNAME(date)
```

**Example:**
```sql
DAYNAME('2025-01-01') -- Returns: 'Wednesday'
```

### MONTHNAME

Returns month name.

```sql
MONTHNAME(date)
```

### LAST_DAY

Returns last day of month.

```sql
LAST_DAY(date)
```

**Example:**
```sql
LAST_DAY('2025-02-15') -- Returns: '2025-02-28'
```

### NEXT_DAY

Returns next occurrence of weekday.

```sql
NEXT_DAY(date, weekday)
```

---

## Data Type Conversion Functions

Functions for converting between data types.

### TO_STRING

Converts to string.

```sql
TO_STRING(value [, format])
```

**Example:**
```sql
TO_STRING(12345) -- Returns: '12345'
TO_STRING(3.14, '0.00') -- Returns: '3.14'
```

### TO_INTEGER

Converts to integer.

```sql
TO_INTEGER(value)
```

**Example:**
```sql
TO_INTEGER('42') -- Returns: 42
TO_INTEGER(3.7) -- Returns: 3
```

### TO_DECIMAL

Converts to decimal.

```sql
TO_DECIMAL(value [, precision, scale])
```

**Example:**
```sql
TO_DECIMAL('123.45', 10, 2) -- Returns: 123.45
```

### TO_FLOATING

Converts to floating point.

```sql
TO_FLOATING(value)
```

### TO_DATE

Converts to date.

```sql
TO_DATE(string [, format])
```

**Example:**
```sql
TO_DATE('2025-01-15', 'YYYY-MM-DD')
TO_DATE('15/01/2025', 'DD/MM/YYYY')
```

### TO_TIME

Converts to time.

```sql
TO_TIME(string [, format])
```

**Example:**
```sql
TO_TIME('14:30:00', 'HH24:MI:SS')
```

### TO_DATETIME

Converts to datetime/timestamp.

```sql
TO_DATETIME(string [, format])
```

---

## Miscellaneous Functions

### CASE

Conditional expression.

```sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ELSE default_result
END
```

**Example:**
```sql
CASE
  WHEN status = 'A' THEN 'Active'
  WHEN status = 'I' THEN 'Inactive'
  ELSE 'Unknown'
END
```

### COALESCE

Returns first non-null value.

```sql
COALESCE(value1, value2, ...)
```

**Example:**
```sql
COALESCE(phone, mobile, 'No number') -- Returns first non-null
```

### IFNULL

Returns second value if first is null.

```sql
IFNULL(value, replacement)
```

**Example:**
```sql
IFNULL(discount, 0) -- Returns 0 if discount is null
```

### NULLIF

Returns null if values are equal.

```sql
NULLIF(value1, value2)
```

**Example:**
```sql
NULLIF(quantity, 0) -- Returns null if quantity is 0
```

### GREATEST

Returns largest value.

```sql
GREATEST(value1, value2, ...)
```

**Example:**
```sql
GREATEST(10, 20, 15) -- Returns: 20
```

### LEAST

Returns smallest value.

```sql
LEAST(value1, value2, ...)
```

**Example:**
```sql
LEAST(10, 20, 15) -- Returns: 10
```

### MAP

Maps value to another value.

```sql
MAP(input, value1, result1 [, value2, result2, ...] [, default])
```

**Example:**
```sql
MAP(status, 'A', 'Active', 'I', 'Inactive', 'Unknown')
```

---

## Documentation Links

- **Function Reference**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/functionreference
- **DTL Functions**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/functionreference/function-reference-for-data-transformation-language

---

**Last Updated**: 2025-11-22
