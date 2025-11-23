# Numeric Operations - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/29_Numeric_Operations.md

---

## Numeric Types

| Type | Description | Range |
|------|-------------|-------|
| `i` | 4-byte integer | -2,147,483,648 to 2,147,483,647 |
| `int8` | 8-byte integer | Extended range |
| `p` | Packed decimal | 1-16 bytes, up to 14 decimals |
| `f` | Binary floating point | 17 decimal places |
| `decfloat16` | Decimal floating point | 16 decimal places |
| `decfloat34` | Decimal floating point | 34 decimal places |

---

## Arithmetic Operators

```abap
" Basic operators
result = a + b.    " Addition
result = a - b.    " Subtraction
result = a * b.    " Multiplication
result = a / b.    " Division

" Special operators
result = a DIV b.  " Integer division (positive remainder)
result = a MOD b.  " Modulo (positive remainder)
result = a ** b.   " Exponentiation

" Calculation assignments
a += b.   " a = a + b
a -= b.   " a = a - b
a *= b.   " a = a * b
a /= b.   " a = a / b
```

---

## Numeric Functions

### Rounding and Truncation

```abap
DATA(abs_val) = abs( -5 ).           " 5
DATA(sign_val) = sign( -5 ).         " -1
DATA(ceil_val) = ceil( '1.2' ).      " 2
DATA(floor_val) = floor( '1.8' ).    " 1
DATA(trunc_val) = trunc( '1.8' ).    " 1
DATA(frac_val) = frac( '1.8' ).      " 0.8
DATA(round_val) = round( val = '1.567' dec = 2 ).  " 1.57
```

### Exponential and Logarithmic

```abap
DATA(sqrt_val) = sqrt( 16 ).         " 4.0
DATA(ipow_val) = ipow( base = 2 exp = 10 ).  " 1024
DATA(exp_val) = exp( 1 ).            " e
DATA(log_val) = log( 10 ).           " natural log
DATA(log10_val) = log10( 100 ).      " 2.0
```

### Trigonometric

```abap
DATA(sin_val) = sin( '0.5' ).
DATA(cos_val) = cos( '0.5' ).
DATA(tan_val) = tan( '0.5' ).
DATA(asin_val) = asin( '0.5' ).
DATA(acos_val) = acos( '0.5' ).
DATA(atan_val) = atan( '0.5' ).
```

### Extremum

```abap
DATA(min_val) = nmin( val1 = 5 val2 = 3 val3 = 7 ).  " 3
DATA(max_val) = nmax( val1 = 5 val2 = 3 val3 = 7 ).  " 7
```

---

## Calculation Type Rules

Priority order (highest to lowest):
1. `decfloat34` → result `decfloat34`
2. `decfloat16` → result `decfloat16`
3. `f` → result `f`
4. `p` → result `p` (length 8, decimals 0)
5. `int8` → result `int8`
6. Otherwise → `i`

---

## Lossless Operations (EXACT)

```abap
TRY.
    DATA(exact_int) = EXACT i( decimal_value ).
  CATCH cx_sy_conversion_rounding.
    " Precision would be lost
ENDTRY.
```

---

## Advanced Numeric Classes

### CL_ABAP_BIGINT (Arbitrary Precision)

```abap
DATA(bigint1) = cl_abap_bigint=>factory_from_int8( 123456789 ).
DATA(bigint2) = cl_abap_bigint=>factory_from_int8( 987654321 ).

DATA(sum) = bigint1->add( bigint2 ).
DATA(product) = bigint1->mul( bigint2 ).
DATA(quotient) = bigint1->div( bigint2 ).
DATA(power) = bigint1->pow( 10 ).
DATA(sqrt) = bigint1->sqrt( ).
DATA(gcd) = bigint1->gcd( bigint2 ).
```

### CL_ABAP_RATIONAL (Exact Fractions)

```abap
DATA(rational) = cl_abap_rational=>factory_from_string( '1/3' ).
DATA(decimal) = rational->get_as_decfloat34( ).
```

### CL_ABAP_MATH (Constants)

```abap
DATA(pi) = cl_abap_math=>pi.
DATA(e) = cl_abap_math=>e.
DATA(max_int4) = cl_abap_math=>max_int4.
DATA(min_int4) = cl_abap_math=>min_int4.
```

### Random Numbers

```abap
" Random integer
DATA(random) = cl_abap_random_int=>create(
  seed = CONV i( sy-uzeit )
  min = 1
  max = 100 ).
DATA(number) = random->get_next( ).

" Random float
DATA(random_f) = cl_abap_random_float=>create( seed = 42 ).
DATA(float_num) = random_f->get_next( ).
```

---

## Date/Time Calculations

### Date Arithmetic

```abap
" Days between dates
DATA(days) = date2 - date1.

" Add days (XCO)
DATA(tomorrow) = xco_cp=>sy->date( )->add( iv_day = 1 )->value.
DATA(next_month) = xco_cp=>sy->date( )->add( iv_month = 1 )->value.
```

### Time Arithmetic

```abap
" Seconds between times
DATA(seconds) = time2 - time1.

" Extract components
DATA(hours) = seconds DIV 3600.
DATA(minutes) = ( seconds MOD 3600 ) DIV 60.
DATA(secs) = seconds MOD 60.
```

### Timestamp Operations

```abap
" Add to timestamp
DATA(new_ts) = utclong_add(
  val = timestamp
  days = 1
  hours = 2 ).

" CL_ABAP_TSTMP
DATA(ts) = cl_abap_tstmp=>add(
  tstmp = timestamp
  secs = 3600 ).
```

---

## ABAP SQL Numeric Functions

```abap
SELECT
  div( amount, 100 ) AS int_div,
  division( amount, 3, 2 ) AS precise_div,
  ceil( value ) AS ceiling,
  floor( value ) AS floored,
  mod( number, 10 ) AS remainder,
  abs( value ) AS absolute,
  round( price, 2 ) AS rounded
FROM table
INTO TABLE @result.
```
