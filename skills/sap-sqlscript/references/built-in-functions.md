# SQLScript Built-in Functions Reference

## String Functions

### Character Manipulation

| Function | Description | Example |
|----------|-------------|---------|
| `ASCII(string)` | Returns ASCII value of first character | `ASCII('A')` → 65 |
| `CHAR(n)` | Returns character for ASCII value | `CHAR(65)` → 'A' |
| `NCHAR(n)` | Returns Unicode character | `NCHAR(8364)` → '€' |
| `UNICODE(string)` | Returns Unicode value | `UNICODE('€')` → 8364 |

### String Operations

| Function | Description | Example |
|----------|-------------|---------|
| `CONCAT(s1, s2)` | Concatenates strings | `CONCAT('A', 'B')` → 'AB' |
| `LENGTH(string)` | Returns string length | `LENGTH('Hello')` → 5 |
| `LEFT(string, n)` | Returns leftmost n characters | `LEFT('Hello', 2)` → 'He' |
| `RIGHT(string, n)` | Returns rightmost n characters | `RIGHT('Hello', 2)` → 'lo' |
| `SUBSTRING(s, start, len)` | Extracts substring | `SUBSTRING('Hello', 2, 3)` → 'ell' |
| `SUBSTR_BEFORE(s, pattern)` | Returns substring before pattern | `SUBSTR_BEFORE('a-b', '-')` → 'a' |
| `SUBSTR_AFTER(s, pattern)` | Returns substring after pattern | `SUBSTR_AFTER('a-b', '-')` → 'b' |

### Case Conversion

| Function | Description | Example |
|----------|-------------|---------|
| `LOWER(string)` / `LCASE(string)` | Converts to lowercase | `LOWER('ABC')` → 'abc' |
| `UPPER(string)` / `UCASE(string)` | Converts to uppercase | `UPPER('abc')` → 'ABC' |
| `INITCAP(string)` | Capitalizes first letter of each word | `INITCAP('hello world')` → 'Hello World' |

### Trimming and Padding

| Function | Description | Example |
|----------|-------------|---------|
| `TRIM(string)` | Removes leading/trailing spaces | `TRIM('  AB  ')` → 'AB' |
| `LTRIM(string [, chars])` | Removes leading characters | `LTRIM('00123', '0')` → '123' |
| `RTRIM(string [, chars])` | Removes trailing characters | `RTRIM('123  ')` → '123' |
| `LPAD(s, n [, pad])` | Left-pads to length n | `LPAD('5', 3, '0')` → '005' |
| `RPAD(s, n [, pad])` | Right-pads to length n | `RPAD('5', 3, '0')` → '500' |

### Search and Replace

| Function | Description | Example |
|----------|-------------|---------|
| `LOCATE(search, string)` | Returns position of substring | `LOCATE('ll', 'Hello')` → 3 |
| `REPLACE(s, old, new)` | Replaces occurrences | `REPLACE('abc', 'b', 'x')` → 'axc' |
| `REVERSE(string)` | Reverses string | `REVERSE('abc')` → 'cba' |

---

## Numeric Functions

### Basic Operations

| Function | Description | Example |
|----------|-------------|---------|
| `ABS(n)` | Absolute value | `ABS(-5)` → 5 |
| `SIGN(n)` | Sign (-1, 0, 1) | `SIGN(-5)` → -1 |
| `MOD(n, m)` | Modulo | `MOD(10, 3)` → 1 |
| `POWER(n, m)` | n raised to power m | `POWER(2, 3)` → 8 |
| `SQRT(n)` | Square root | `SQRT(16)` → 4 |
| `EXP(n)` | e raised to power n | `EXP(1)` → 2.718... |

### Rounding

| Function | Description | Example |
|----------|-------------|---------|
| `CEIL(n)` / `CEILING(n)` | Rounds up | `CEIL(4.2)` → 5 |
| `FLOOR(n)` | Rounds down | `FLOOR(4.8)` → 4 |
| `ROUND(n [, d])` | Rounds to d decimal places | `ROUND(4.567, 2)` → 4.57 |
| `TRUNC(n [, d])` | Truncates to d decimal places | `TRUNC(4.567, 2)` → 4.56 |

### Logarithmic

| Function | Description | Example |
|----------|-------------|---------|
| `LN(n)` | Natural logarithm | `LN(2.718)` → 1.0 |
| `LOG(base, n)` | Logarithm with base | `LOG(10, 100)` → 2 |

### Trigonometric

| Function | Description |
|----------|-------------|
| `SIN(n)` | Sine (radians) |
| `COS(n)` | Cosine (radians) |
| `TAN(n)` | Tangent (radians) |
| `ASIN(n)` | Arc sine |
| `ACOS(n)` | Arc cosine |
| `ATAN(n)` | Arc tangent |
| `ATAN2(y, x)` | Arc tangent of y/x |
| `SINH(n)` | Hyperbolic sine |
| `COSH(n)` | Hyperbolic cosine |
| `TANH(n)` | Hyperbolic tangent |

### Bitwise Operations

| Function | Description | Example |
|----------|-------------|---------|
| `BITAND(a, b)` | Bitwise AND | `BITAND(12, 10)` → 8 |
| `BITOR(a, b)` | Bitwise OR | `BITOR(12, 10)` → 14 |
| `BITXOR(a, b)` | Bitwise XOR | `BITXOR(12, 10)` → 6 |
| `BITNOT(n)` | Bitwise NOT | `BITNOT(0)` → -1 |
| `BITCOUNT(n)` | Count set bits | `BITCOUNT(7)` → 3 |
| `BITSET(n, pos)` | Set bit at position | `BITSET(0, 3)` → 8 |
| `BITUNSET(n, pos)` | Unset bit at position | `BITUNSET(8, 3)` → 0 |

### Random

| Function | Description |
|----------|-------------|
| `RAND()` | Random number 0-1 |
| `RAND(seed)` | Seeded random |

---

## Date and Time Functions

### Current Date/Time

| Function | Description | Format |
|----------|-------------|--------|
| `CURRENT_DATE` | Current local date | YYYY-MM-DD |
| `CURRENT_TIME` | Current local time | HH:MI:SS |
| `CURRENT_TIMESTAMP` | Current local datetime | YYYY-MM-DD HH:MI:SS.FF |
| `CURRENT_UTCDATE` | Current UTC date | YYYY-MM-DD |
| `CURRENT_UTCTIME` | Current UTC time | HH:MI:SS |
| `CURRENT_UTCTIMESTAMP` | Current UTC datetime | YYYY-MM-DD HH:MI:SS.FF |
| `NOW()` | Same as CURRENT_TIMESTAMP | |

### Date Extraction

| Function | Description | Example |
|----------|-------------|---------|
| `YEAR(date)` | Extract year | `YEAR('2024-03-15')` → 2024 |
| `MONTH(date)` | Extract month (1-12) | `MONTH('2024-03-15')` → 3 |
| `DAYOFMONTH(date)` | Extract day (1-31) | `DAYOFMONTH('2024-03-15')` → 15 |
| `DAYOFYEAR(date)` | Day of year (1-366) | `DAYOFYEAR('2024-03-15')` → 75 |
| `DAYNAME(date)` | Name of day | `DAYNAME('2024-03-15')` → 'FRIDAY' |
| `WEEKDAY(date)` | Day of week (0-6, Mon=0) | `WEEKDAY('2024-03-15')` → 4 |
| `WEEK(date)` | Week number (1-53) | `WEEK('2024-03-15')` → 11 |
| `QUARTER(date)` | Quarter (1-4) | `QUARTER('2024-03-15')` → 1 |
| `HOUR(time)` | Extract hour (0-23) | `HOUR('14:30:00')` → 14 |
| `MINUTE(time)` | Extract minute (0-59) | `MINUTE('14:30:00')` → 30 |
| `SECOND(time)` | Extract second (0-59) | `SECOND('14:30:45')` → 45 |

### EXTRACT Function

```sql
EXTRACT(<part> FROM <datetime>)
```

Parts: YEAR, MONTH, DAY, HOUR, MINUTE, SECOND

### Date Arithmetic

| Function | Description | Example |
|----------|-------------|---------|
| `ADD_DAYS(date, n)` | Add n days | `ADD_DAYS('2024-01-01', 30)` |
| `ADD_MONTHS(date, n)` | Add n months | `ADD_MONTHS('2024-01-01', 3)` |
| `ADD_YEARS(date, n)` | Add n years | `ADD_YEARS('2024-01-01', 1)` |
| `ADD_SECONDS(ts, n)` | Add n seconds | `ADD_SECONDS(NOW(), 3600)` |
| `DAYS_BETWEEN(d1, d2)` | Days between dates | `DAYS_BETWEEN('2024-01-01', '2024-03-01')` → 60 |
| `MONTHS_BETWEEN(d1, d2)` | Months between dates | `MONTHS_BETWEEN('2024-01-15', '2024-04-15')` → 3 |
| `SECONDS_BETWEEN(t1, t2)` | Seconds between times | |
| `NANO100_BETWEEN(t1, t2)` | 100-nanosecond intervals | |
| `WORKDAYS_BETWEEN(d1, d2 [, locale])` | Working days between | |

### Date Utilities

| Function | Description |
|----------|-------------|
| `LAST_DAY(date)` | Last day of month |
| `NEXT_DAY(date)` | Next occurrence of day |
| `ISOWEEK(date)` | ISO week number |
| `UTCTOLOCAL(ts, tz)` | Convert UTC to local |
| `LOCALTOUTC(ts, tz)` | Convert local to UTC |

---

## Conversion Functions

### Type Conversion

| Function | Description |
|----------|-------------|
| `CAST(expr AS type)` | Convert to type |
| `TO_BIGINT(value)` | Convert to BIGINT |
| `TO_INTEGER(value)` / `TO_INT(value)` | Convert to INTEGER |
| `TO_SMALLINT(value)` | Convert to SMALLINT |
| `TO_TINYINT(value)` | Convert to TINYINT |
| `TO_DOUBLE(value)` | Convert to DOUBLE |
| `TO_REAL(value)` | Convert to REAL |
| `TO_DECIMAL(value [, p, s])` | Convert to DECIMAL |
| `TO_SMALLDECIMAL(value)` | Convert to SMALLDECIMAL |

### String Conversion

| Function | Description |
|----------|-------------|
| `TO_VARCHAR(value [, format])` | Convert to VARCHAR |
| `TO_NVARCHAR(value [, format])` | Convert to NVARCHAR |
| `TO_ALPHANUM(value)` | Convert to ALPHANUM |
| `TO_FIXEDCHAR(value, n)` | Convert to fixed-length char |

### Date/Time Conversion

| Function | Description |
|----------|-------------|
| `TO_DATE(string [, format])` | Convert to DATE |
| `TO_TIME(string [, format])` | Convert to TIME |
| `TO_TIMESTAMP(string [, format])` | Convert to TIMESTAMP |
| `TO_SECONDDATE(string [, format])` | Convert to SECONDDATE |
| `TO_DATS(date)` | Convert to SAP date (YYYYMMDD) |
| `TO_TIMS(time)` | Convert to SAP time (HHMMSS) |

### Binary Conversion

| Function | Description |
|----------|-------------|
| `TO_BINARY(value)` | Convert to BINARY |
| `TO_BLOB(value)` | Convert to BLOB |
| `TO_CLOB(value)` | Convert to CLOB |
| `TO_NCLOB(value)` | Convert to NCLOB |
| `HEXTOBIN(hex)` | Hex string to binary |
| `BINTOHEX(bin)` | Binary to hex string |
| `STRTOBIN(string, encoding)` | String to binary |
| `BINTOSTR(binary, encoding)` | Binary to string |

### Date/Time Format Codes

| Code | Description |
|------|-------------|
| `YYYY` | 4-digit year |
| `YY` | 2-digit year |
| `MM` | Month (01-12) |
| `MON` | Month abbreviation |
| `DD` | Day (01-31) |
| `DY` | Day abbreviation |
| `HH` / `HH12` | Hour (01-12) |
| `HH24` | Hour (00-23) |
| `MI` | Minute (00-59) |
| `SS` | Second (00-59) |
| `FF` | Fractional seconds |
| `AM` / `PM` | Meridian indicator |

---

## Aggregate Functions

| Function | Description |
|----------|-------------|
| `COUNT(*)` | Count all rows |
| `COUNT(column)` | Count non-NULL values |
| `COUNT(DISTINCT column)` | Count distinct values |
| `SUM(column)` | Sum of values |
| `AVG(column)` | Average of values |
| `MIN(column)` | Minimum value |
| `MAX(column)` | Maximum value |
| `MEDIAN(column)` | Median value |
| `STDDEV(column)` | Standard deviation |
| `VAR(column)` | Variance |
| `STRING_AGG(column [, delimiter])` | Concatenate strings |

---

## Window Functions

### Syntax

```sql
<function>(<args>) OVER (
  [PARTITION BY <columns>]
  [ORDER BY <columns> [ASC|DESC]]
  [<frame_clause>]
)
```

### Frame Clause

```sql
ROWS BETWEEN <start> AND <end>
RANGE BETWEEN <start> AND <end>
```

Frame bounds:
- `UNBOUNDED PRECEDING`
- `n PRECEDING`
- `CURRENT ROW`
- `n FOLLOWING`
- `UNBOUNDED FOLLOWING`

### Ranking Functions

| Function | Description |
|----------|-------------|
| `ROW_NUMBER()` | Unique sequential number |
| `RANK()` | Rank with gaps for ties |
| `DENSE_RANK()` | Rank without gaps |
| `NTILE(n)` | Distribute into n buckets |
| `PERCENT_RANK()` | Relative rank (0-1) |
| `CUME_DIST()` | Cumulative distribution |

### Navigation Functions

| Function | Description |
|----------|-------------|
| `LEAD(col [, n [, default]])` | Value from n rows ahead |
| `LAG(col [, n [, default]])` | Value from n rows behind |
| `FIRST_VALUE(col)` | First value in window |
| `LAST_VALUE(col)` | Last value in window |
| `NTH_VALUE(col, n)` | Nth value in window |

---

## NULL Handling Functions

| Function | Description |
|----------|-------------|
| `COALESCE(v1, v2, ...)` | First non-NULL value |
| `IFNULL(value, default)` | Return default if NULL |
| `NULLIF(v1, v2)` | NULL if v1 = v2 |
| `NVL(value, default)` | Same as IFNULL |

---

## Miscellaneous Functions

| Function | Description |
|----------|-------------|
| `CURRENT_SCHEMA` | Current schema name |
| `CURRENT_USER` | Current user name |
| `SESSION_USER` | Session user name |
| `SESSION_CONTEXT(key)` | Session context value |
| `RECORD_COUNT(table_var)` | Row count of table variable |
| `CARDINALITY(array)` | Array length |
| `SYSUUID` | Generate UUID |
| `HASH_MD5(value)` | MD5 hash |
| `HASH_SHA256(value)` | SHA-256 hash |
| `FLOOR(n)` | Round down to nearest integer |

### SESSION_CONTEXT Keys

| Key | Description |
|-----|-------------|
| `'CLIENT'` | SAP client (mandant) |
| `'APPLICATIONUSER'` | Application user name |
| `'LOCALE'` | Session locale |
| `'LOCALE_SAP'` | SAP locale setting |

> **Note:** Available keys may vary by HANA version and configuration. Custom session variables can be set with `SET SESSION`.

**Example:**
```sql
SELECT SESSION_CONTEXT('CLIENT') AS client,
       SESSION_CONTEXT('APPLICATIONUSER') AS app_user
FROM DUMMY;
```

---

## SAP-Specific Functions

### TO_DATS

Convert DATE to SAP date format (YYYYMMDD string):

```sql
SELECT TO_DATS(CURRENT_DATE) FROM DUMMY;
-- Returns: '20241123'

-- Extract year-month portion
SELECT SUBSTRING(TO_DATS(CURRENT_DATE), 1, 6) FROM DUMMY;
-- Returns: '202411'
```

### TO_TIMS

Convert TIME to SAP time format (HHMMSS string):

```sql
SELECT TO_TIMS(CURRENT_TIME) FROM DUMMY;
-- Returns: '143022'
```

### CONVERT_CURRENCY

Currency conversion using SAP exchange rate tables:

```sql
CONVERT_CURRENCY(
  AMOUNT => <decimal_value>,
  SOURCE_UNIT => <source_currency>,
  TARGET_UNIT => <target_currency>,
  SCHEMA => <schema_name>,
  REFERENCE_DATE => <date>,
  CLIENT => <client_number>,
  CONVERSION_TYPE => <type>
)
```

**Example:**
```sql
SELECT CONVERT_CURRENCY(
  AMOUNT => 1000.00,
  SOURCE_UNIT => 'USD',
  SCHEMA => 'SAPABAP1',
  TARGET_UNIT => 'EUR',
  REFERENCE_DATE => CURRENT_DATE,
  CLIENT => '100',
  CONVERSION_TYPE => 'EURX'
) AS converted_amount
FROM DUMMY;
```

### CONVERT_UNIT

Unit of measure conversion using SAP UOM tables:

```sql
CONVERT_UNIT(
  QUANTITY => <decimal_value>,
  SOURCE_UNIT => <source_uom>,
  TARGET_UNIT => <target_uom>,
  SCHEMA => <schema_name>,
  CLIENT => <client_number>
)
```

**Example:**
```sql
-- Convert 1000 grams to kilograms
SELECT CONVERT_UNIT(
  QUANTITY => 1000.00,
  SOURCE_UNIT => 'G',
  SCHEMA => 'SAPABAP1',
  TARGET_UNIT => 'KG',
  CLIENT => '100'
) AS converted_quantity
FROM DUMMY;
-- Returns: 1.00

-- Convert length units
SELECT CONVERT_UNIT(
  QUANTITY => 100.00,
  SOURCE_UNIT => 'CM',
  SCHEMA => 'SAPABAP1',
  TARGET_UNIT => 'M',
  CLIENT => '100'
) AS meters
FROM DUMMY;
-- Returns: 1.00
```

> **Note:** Requires UOM conversion factors configured in SAP T006* tables.

---

## SQLScript Libraries

Available since HANA 2.0 SPS03:

| Library | Purpose |
|---------|---------|
| `SQLSCRIPT_STRING` | String manipulation (e.g., `TABLE_SUMMARY`) |
| `SQLSCRIPT_PRINT` | Debug output |
| `SQLSCRIPT_SYNC` | Synchronization |
| `SQLSCRIPT_CACHE` | Caching utilities |

**Usage:**
```sql
USING SQLSCRIPT_STRING AS str_lib;
lv_summary = str_lib:TABLE_SUMMARY(:lt_data);
```
