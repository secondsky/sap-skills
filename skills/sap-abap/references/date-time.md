# Date and Time Processing - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/23_Date_and_Time.md

---

## Core Data Types

### Type d (Date)

8-character date in `yyyymmdd` format.

```abap
DATA date TYPE d VALUE '20240101'.
DATA(date2) = CONV d( '20240202' ).

" Character-like access
DATA(year) = substring( val = date off = 0 len = 4 ).
DATA(month) = date+4(2).
DATA(day) = date+6(2).

" Modify components
date+4(2) = '10'.  " Change month to October
```

### Type t (Time)

6-character time in `hhmmss` format (24-hour clock).

```abap
DATA time TYPE t VALUE '123456'.
DATA(hour) = time+0(2).    " 12
DATA(minute) = time+2(2).  " 34
DATA(second) = time+4(2).  " 56
```

### Type utclong (UTC Timestamp)

Modern 8-byte UTC timestamp with 100 nanosecond precision. **Recommended for ABAP Cloud**.

```abap
DATA ts TYPE utclong VALUE '2024-01-01 15:30:00'.
DATA(current_ts) = utclong_current( ).
```

### Legacy Packed Timestamps

```abap
DATA ts_short TYPE timestamp.   " yyyymmddhhmmss
DATA ts_long TYPE timestampl.   " yyyymmddhhmmss.sssssss
GET TIME STAMP FIELD ts_short.
```

---

## Retrieving Current Values

### ABAP Cloud Compatible

```abap
" Current date (UTC)
DATA(utc_date) = cl_abap_context_info=>get_system_date( ).

" Current time (UTC)
DATA(utc_time) = cl_abap_context_info=>get_system_time( ).

" Current timestamp
DATA(ts) = utclong_current( ).
```

### Using XCO Library

```abap
" Date with formatting
DATA(xco_date) = xco_cp=>sy->date( )->as( xco_cp_time=>format->iso_8601_extended )->value.

" Time with formatting
DATA(xco_time) = xco_cp=>sy->time( )->as( xco_cp_time=>format->iso_8601_basic )->value.
```

---

## Date Calculations

### Basic Arithmetic

```abap
DATA date1 TYPE d VALUE '20240101'.
DATA date2 TYPE d VALUE '20231227'.

" Difference in days
DATA(days_diff) = date1 - date2.  " Result: 5

" Add days
date1 = date1 + 30.
```

### XCO Date Operations

```abap
" Add to current date
DATA(future_date) = xco_cp=>sy->date( )->add(
  iv_day = 5
  iv_month = 1
  iv_year = 0
)->as( xco_cp_time=>format->iso_8601_extended )->value.

" Subtract from current date
DATA(past_date) = xco_cp=>sy->date( )->subtract(
  iv_day = 1
  iv_month = 1
  iv_year = 1
)->as( xco_cp_time=>format->iso_8601_extended )->value.

" Create specific date
DATA(specific) = xco_cp_time=>date(
  iv_year = 2024
  iv_month = 3
  iv_day = 15
).
```

---

## Time Calculations

### Basic Arithmetic

```abap
DATA time1 TYPE t VALUE '210000'.
DATA time2 TYPE t VALUE '040000'.

" Difference in seconds
DATA(time_diff) = time2 - time1.
```

### XCO Time Operations

```abap
DATA(time_plus) = xco_cp=>sy->time( )->add(
  iv_hour = 1
  iv_minute = 30
  iv_second = 0
)->as( xco_cp_time=>format->iso_8601_extended )->value.
```

---

## UTC Timestamp Operations

### Arithmetic with Built-in Functions

```abap
DATA ts TYPE utclong VALUE '2024-01-01 15:30:00'.

" Add time components
DATA(ts_add) = utclong_add( val = ts hours = 1 ).
DATA(ts_sub) = utclong_add( val = ts hours = -2 ).
DATA(ts_complex) = utclong_add(
  val = ts
  days = 1
  hours = 2
  minutes = 13
  seconds = 53.12
).
```

### Calculating Differences

```abap
" Get difference in seconds (decfloat34)
DATA(diff_seconds) = utclong_diff( high = ts_high low = ts_low ).

" Get structured difference
cl_abap_utclong=>diff(
  EXPORTING
    high = ts_high
    low = ts_low
  IMPORTING
    days = DATA(d)
    hours = DATA(h)
    minutes = DATA(m)
    seconds = DATA(s)
).
```

### XCO Timestamp Operations

```abap
DATA(ts_ref) = xco_cp_time=>moment(
  iv_year = '2024'
  iv_month = '01'
  iv_day = '01'
  iv_hour = '12'
  iv_minute = '00'
  iv_second = '00'
).

DATA(ts_add) = ts_ref->add(
  iv_day = 1
  iv_month = 2
  iv_year = 0
)->as( xco_cp_time=>format->iso_8601_extended )->value.

DATA(ts_sub) = ts_ref->subtract(
  iv_hour = 1
  iv_minute = 30
  iv_second = 0
)->as( xco_cp_time=>format->iso_8601_extended )->value.
```

---

## Time Zone Handling

### Get User Time Zone

```abap
TRY.
    DATA(tz) = cl_abap_context_info=>get_user_time_zone( ).
  CATCH cx_abap_context_info_error.
ENDTRY.

" XCO approach
DATA(tz_user) = xco_cp_time=>time_zone->user->value.
DATA(tz_utc) = xco_cp_time=>time_zone->utc->value.
```

### Convert Between UTC and Local

```abap
" UTC to local date/time
DATA ts_utc TYPE utclong VALUE '2024-11-03 05:30:00'.
CONVERT UTCLONG ts_utc
  INTO DATE DATA(date_local)
       TIME DATA(time_local)
  TIME ZONE 'EST'.

" Local date/time to UTC
DATA date_local TYPE d VALUE '20240101'.
DATA time_local TYPE t VALUE '112458'.
CONVERT DATE date_local
        TIME time_local
        TIME ZONE 'EST'
  INTO UTCLONG DATA(utc_ts).
```

### Packed Timestamp Conversions

```abap
" Timestamp to date/time
DATA ts_short TYPE timestamp.
GET TIME STAMP FIELD ts_short.
CONVERT TIME STAMP ts_short TIME ZONE 'EST'
  INTO DATE DATA(dat) TIME DATA(tim).

" Date/time to timestamp
DATA ts_conv TYPE timestamp.
CONVERT DATE dat TIME tim
  INTO TIME STAMP ts_conv TIME ZONE 'EST'.
```

---

## CL_ABAP_TSTMP Class

```abap
GET TIME STAMP FIELD DATA(tsa).

" Add seconds
DATA(tsb) = cl_abap_tstmp=>add( tstmp = tsa secs = 3600 ).

" Convert between types
DATA(ts_utclong) = cl_abap_tstmp=>tstmp2utclong( tsa ).
DATA(ts_from_utc) = cl_abap_tstmp=>utclong2tstmp_short( ts_utclong ).
```

---

## Unix Timestamps

```abap
" Get current Unix timestamp
DATA(unix_ts) = xco_cp=>sy->unix_timestamp( )->value.

" Create from specific moment
DATA(unix_custom) = xco_cp_time=>moment(
  iv_year = '2024'
  iv_month = '11'
  iv_day = '03'
  iv_hour = '07'
  iv_minute = '12'
  iv_second = '30'
)->get_unix_timestamp( )->value.

" Convert Unix timestamp to utclong
DATA(ts_from_unix) = utclong_add(
  val = CONV utclong( '1970-01-01 00:00:00' )
  seconds = 1730617950
).
```

---

## Date/Time in SQL

```abap
SELECT SINGLE FROM i_timezone
FIELDS
  is_valid( @ti ) AS isvalid,
  extract_year( @utc ) AS extr_year,
  extract_month( @da ) AS extr_month,
  extract_day( @utc ) AS extr_day,
  dayname( @da ) AS day_name,
  monthname( @utc ) AS month_name,
  weekday( @utc ) AS week_day,
  days_between( @utc, utclong`2024-02-25 08:14:26` ) AS days_bw,
  add_days( @da, 2 ) AS add_days,
  add_months( @utc, 3 ) AS add_months,
  utcl_current( ) AS utcl_current,
  utcl_add_seconds( @utc, 5 ) AS sec_add_utc
WHERE TimeZoneID = 'EST'
INTO @DATA(wa).
```

---

## String Templates

```abap
" Date formatting
DATA(d_str) = |Date: { cl_abap_context_info=>get_system_date( ) DATE = ISO }|.

" Time formatting
DATA(tm_str) = |Time: { cl_abap_context_info=>get_system_time( ) TIME = ISO }|.

" Timestamp formatting
DATA(ts_str) = |Timestamp: { utclong_current( ) TIMESTAMP = ISO }|.

" With timezone
DATA(tz_str) = |{ utclong_current( ) TIMEZONE = 'EST' COUNTRY = 'US ' }|.
```

---

## Format Conversions

### Date Format (CL_ABAP_DATFM)

```abap
cl_abap_datfm=>conv_date_int_to_ext(
  EXPORTING
    im_datint = '20240202'
    im_datfmdes = '6'  " ISO 8601 format
  IMPORTING
    ex_datext = conv_date_str
).
```

### Time Format (CL_ABAP_TIMEFM)

```abap
cl_abap_timefm=>conv_time_int_to_ext(
  EXPORTING
    time_int = '123456'
    format_according_to = cl_abap_timefm=>iso
  IMPORTING
    time_ext = conv_time_str  " Result: 12:34:56
).
```

---

## Validation

```abap
TRY.
    DATA(valid_date) = EXACT d( '20240231' ).  " Feb 31 - invalid
  CATCH cx_sy_conversion_no_date.
    " Handle invalid date
ENDTRY.
```

---

## ABAP Cloud Restrictions

**Avoid these system fields in ABAP Cloud:**
- `sy-datum`, `sy-uzeit`
- `sy-timlo`, `sy-datlo`
- Other system-specific temporal fields

**Use instead:**
- `cl_abap_context_info=>get_system_date( )`
- `cl_abap_context_info=>get_system_time( )`
- `utclong_current( )`
- XCO library methods

**Note**: In SAP BTP ABAP Environment, time zone defaults to UTC.

---

## Best Practices

1. **Use utclong** for modern timestamp handling
2. **Use XCO library** for fluent date/time APIs
3. **Validate temporal data** before calculations
4. **Use CONVERT statements** for timezone conversions
5. **Avoid sy-datum/sy-uzeit** in ABAP Cloud
6. **Store timestamps in UTC** and convert for display
