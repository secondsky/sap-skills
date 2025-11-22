# ABAP Built-in Functions - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/24_Builtin_Functions.md

---

## String Functions

### Length Functions

```abap
" String length (includes trailing blanks for variable-length)
DATA(len) = strlen( text ).

" Character count (excludes trailing blanks)
DATA(chars) = numofchar( text ).

" XString length
DATA(xlen) = xstrlen( xstring_var ).
```

### Search and Find Functions

```abap
" Find substring offset (-1 if not found)
DATA(pos) = find( val = text sub = 'search' ).

" Find with options
DATA(pos2) = find( val = text sub = 'search' off = 5 occ = 2 ).

" Find and return offset plus match length
DATA(end_pos) = find_end( val = text sub = 'search' ).

" Find any character from set
DATA(any_pos) = find_any_of( val = text sub = 'aeiou' ).

" Find character NOT in set
DATA(not_pos) = find_any_not_of( val = text sub = 'aeiou' ).
```

### Boolean Search Functions

```abap
" Check if contains substring
IF contains( val = text sub = 'search' ).
  " Found
ENDIF.

" Contains with regex (PCRE)
IF contains( val = text pcre = '[0-9]+' ).
  " Contains numbers
ENDIF.

" Check pattern match
IF matches( val = text regex = '^[A-Z]{2}[0-9]{4}$' ).
  " Matches pattern
ENDIF.
```

### Extraction Functions

```abap
" Extract substring by position
DATA(sub) = substring( val = text off = 5 len = 10 ).

" Extract after/before delimiter
DATA(after) = substring_after( val = text sub = ':' ).
DATA(before) = substring_before( val = text sub = ':' ).

" Extract from/to (inclusive)
DATA(from) = substring_from( val = text sub = 'start' ).
DATA(to) = substring_to( val = text sub = 'end' ).

" Extract segment by delimiter
DATA(seg) = segment( val = 'a,b,c,d' index = 2 sep = ',' ).  " Result: b
```

### Transformation Functions

```abap
" Case conversion
DATA(upper) = to_upper( text ).
DATA(lower) = to_lower( text ).

" Camelcase conversion
DATA(mixed) = to_mixed( val = 'HELLO_WORLD' sep = '_' ).  " HelloWorld
DATA(under) = from_mixed( val = 'HelloWorld' sep = '_' ).  " hello_world

" Reverse string
DATA(rev) = reverse( text ).

" Character substitution
DATA(trans) = translate( val = text from = 'abc' to = 'xyz' ).
```

### Replacement Functions

```abap
" Replace substring
DATA(rep) = replace( val = text sub = 'old' with = 'new' ).

" Replace all occurrences
DATA(rep_all) = replace( val = text sub = 'old' with = 'new' occ = 0 ).

" Replace with regex
DATA(rep_regex) = replace( val = text pcre = '[0-9]+' with = '#' ).

" Insert at position
DATA(ins) = insert( val = text sub = 'INSERT' off = 5 ).
```

### Escape Function

```abap
" Escape for URL
DATA(url_esc) = escape( val = text format = cl_abap_format=>e_url ).

" Escape for JSON
DATA(json_esc) = escape( val = text format = cl_abap_format=>e_json_string ).

" Escape for string template
DATA(tmpl_esc) = escape( val = text format = cl_abap_format=>e_string_tpl ).
```

### Other String Functions

```abap
" Repeat string
DATA(repeated) = repeat( val = 'ab' occ = 3 ).  " ababab

" Condense blanks
DATA(condensed) = condense( val = '  a   b  c  ' ).  " a b c
DATA(no_blanks) = condense( val = '  a   b  c  ' del = ' ' ).  " abc

" Shift characters
DATA(left) = shift_left( val = text sub = ' ' ).
DATA(right) = shift_right( val = text places = 3 ).

" Join table lines
DATA(joined) = concat_lines_of( table = string_tab sep = ',' ).

" Levenshtein distance
DATA(dist) = distance( val1 = 'kitten' val2 = 'sitting' ).

" Count occurrences
DATA(cnt) = count( val = text sub = 'a' ).
DATA(cnt_any) = count_any_of( val = text sub = 'aeiou' ).
```

---

## Numeric Functions

### Basic Math Functions

```abap
" Absolute value
DATA(abs_val) = abs( -5 ).  " 5

" Sign (-1, 0, or 1)
DATA(sign_val) = sign( -5 ).  " -1

" Rounding
DATA(ceil_val) = ceil( CONV decfloat34( '3.2' ) ).  " 4
DATA(floor_val) = floor( CONV decfloat34( '3.8' ) ).  " 3
DATA(trunc_val) = trunc( CONV decfloat34( '3.8' ) ).  " 3
DATA(frac_val) = frac( CONV decfloat34( '3.8' ) ).  " 0.8

" Round with precision
DATA(rounded) = round( val = CONV decfloat34( '3.14159' ) dec = 2 ).  " 3.14
DATA(rescaled) = rescale( val = amount prec = 2 ).
```

### Power and Root Functions

```abap
" Integer power
DATA(pow) = ipow( base = 2 exp = 10 ).  " 1024

" Square root
DATA(sqrt_val) = sqrt( 16 ).  " 4
```

### Min/Max Functions

```abap
" Multiple arguments
DATA(min_val) = nmin( val1 = a val2 = b val3 = c ).
DATA(max_val) = nmax( val1 = a val2 = b val3 = c ).
```

### Trigonometric Functions

```abap
" Standard trigonometric
DATA(sin_val) = sin( angle ).
DATA(cos_val) = cos( angle ).
DATA(tan_val) = tan( angle ).

" Inverse trigonometric
DATA(asin_val) = asin( value ).
DATA(acos_val) = acos( value ).
DATA(atan_val) = atan( value ).

" Hyperbolic
DATA(sinh_val) = sinh( value ).
DATA(cosh_val) = cosh( value ).
DATA(tanh_val) = tanh( value ).
```

### Logarithmic and Exponential

```abap
" Natural logarithm
DATA(log_val) = log( value ).

" Base 10 logarithm
DATA(log10_val) = log10( value ).

" Exponential (e^x)
DATA(exp_val) = exp( value ).
```

### Special Math Functions

```abap
" Factorial
DATA(fact) = factorial( n ).

" Binomial coefficient
DATA(binom) = binomial( n = 10 k = 3 ).
```

---

## Table Functions

```abap
" Count table lines
DATA(line_count) = lines( itab ).

" Check if line exists
IF line_exists( itab[ key = value ] ).
  " Line found
ENDIF.

" Get line index
DATA(idx) = line_index( itab[ key = value ] ).
```

---

## Logical Functions

```abap
" Returns 'X' or '' (string type)
DATA(bool_str) = boolc( condition ).

" Returns 'X' or '' (type c length 1) - use with abap_true/abap_false
DATA(bool_c) = xsdbool( condition ).

IF xsdbool( a > b ) = abap_true.
  " Condition is true
ENDIF.
```

---

## Timestamp Functions

```abap
" Get current UTC timestamp
DATA(ts) = utclong_current( ).

" Add time to timestamp
DATA(ts_add) = utclong_add(
  val = ts
  days = 1
  hours = 2
  minutes = 30
  seconds = 0
).

" Calculate difference (returns seconds as decfloat34)
DATA(diff) = utclong_diff( high = ts2 low = ts1 ).
```

---

## ABAP SQL Functions

Available in SELECT statements:

### Numeric SQL Functions

```abap
SELECT
  div( field1, 10 ) AS int_division,
  division( field1, field2, 2 ) AS dec_division,
  mod( field1, 10 ) AS modulo,
  abs( field1 ) AS absolute,
  ceil( field1 ) AS ceiling,
  floor( field1 ) AS floor_val,
  round( field1, 2 ) AS rounded
FROM dbtab
INTO TABLE @DATA(result).
```

### String SQL Functions

```abap
SELECT
  initcap( name ) AS proper_case,
  instr( text, 'search' ) AS position,
  locate( text, 'search' ) AS locate_pos,
  locate_regexpr( pcre = '[0-9]+' IN text ) AS regex_pos,
  length( text ) AS len,
  left( text, 5 ) AS left_chars,
  right( text, 5 ) AS right_chars,
  ltrim( text, ' ' ) AS left_trimmed,
  rtrim( text, ' ' ) AS right_trimmed,
  upper( text ) AS upper_case,
  lower( text ) AS lower_case,
  concat( field1, field2 ) AS concatenated,
  replace( text, 'old', 'new' ) AS replaced,
  substring( text, 1, 5 ) AS sub_str
FROM dbtab
INTO TABLE @DATA(result).
```

### Date/Time SQL Functions

```abap
SELECT
  extract_year( date_field ) AS year,
  extract_month( date_field ) AS month,
  extract_day( date_field ) AS day,
  dayname( date_field ) AS day_name,
  monthname( date_field ) AS month_name,
  weekday( date_field ) AS week_day,
  days_between( date1, date2 ) AS days_diff,
  add_days( date_field, 30 ) AS future_date,
  add_months( date_field, 3 ) AS future_month,
  utcl_current( ) AS current_ts,
  utcl_add_seconds( ts_field, 3600 ) AS ts_plus_hour
FROM dbtab
INTO TABLE @DATA(result).
```

### Conversion SQL Functions

```abap
SELECT
  unit_conversion( quantity = qty, source_unit = uom, target_unit = 'KG' ) AS converted,
  currency_conversion( amount = amt, source_currency = curr, target_currency = 'USD' ) AS usd_amt,
  uuid( ) AS new_uuid
FROM dbtab
INTO TABLE @DATA(result).
```

---

## Best Practices

1. **Use built-in functions** instead of custom implementations
2. **Prefer SQL functions** for database operations (pushdown)
3. **Use xsdbool( )** for comparisons with abap_true/abap_false
4. **Use lines( )** instead of DESCRIBE TABLE for count
5. **Use line_exists( )** for existence checks instead of READ TABLE
6. **Combine functions** for complex string operations
