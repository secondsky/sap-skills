# Bits and Bytes - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/09_Bits_and_Bytes.md

---

## Hexadecimal Data Type

```abap
" Byte string (hexadecimal)
DATA hex TYPE x LENGTH 4 VALUE 'CDFFC8FF'.
```

---

## Bitwise Operations

### BIT-NOT Operator

```abap
DATA hex TYPE x LENGTH 4 VALUE 'CDFFC8FF'.
hex = BIT-NOT hex.
```

### Other Bitwise Operators

```abap
" BIT-AND
result = hex1 BIT-AND hex2.

" BIT-OR
result = hex1 BIT-OR hex2.

" BIT-XOR
result = hex1 BIT-XOR hex2.
```

---

## Casting with Field Symbols

Interpret data in memory under different types:

```abap
DATA hex TYPE x LENGTH 4 VALUE '32003700'.

FIELD-SYMBOLS: <num>  TYPE i,
               <text> TYPE c.

ASSIGN hex TO <num>  CASTING.
ASSIGN hex TO <text> CASTING.

cl_demo_output=>new(
  )->write_data( hex
  )->write_data( <num>
  )->write_data( <text> )->display( ).
```

---

## Type Conversion

```abap
" Character to numeric triggers hex transformation
DATA: text TYPE c LENGTH 2 VALUE '27',
      num  TYPE i.
num = text.
```

---

## Byte String Operations

```abap
" Concatenate byte strings
DATA: xstr1 TYPE xstring VALUE '0A0B',
      xstr2 TYPE xstring VALUE '0C0D',
      result TYPE xstring.
result = xstr1 && xstr2.

" Length of byte string
DATA(len) = xstrlen( xstr1 ).
```

---

## Best Practices

1. **Use CASTING** for low-level type reinterpretation
2. **Handle endianness** when working with binary data
3. **Use xstring** for variable-length byte sequences
4. **Check lengths** when manipulating byte data
