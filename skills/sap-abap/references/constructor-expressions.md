# ABAP Constructor Expressions - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/05_Constructor_Expressions.md

---

## VALUE Operator

### Structures

```abap
" Create structure with values
DATA(struc) = VALUE zdemo_struc( id = 1 name = 'Test' ).

" With type inference
DATA struc TYPE zdemo_struc.
struc = VALUE #( id = 1 name = 'Test' ).

" Partial assignment (other fields initial)
struc = VALUE #( id = 1 ).

" Clear to initial
struc = VALUE #( ).
```

### Internal Tables

```abap
" Create populated table
DATA(itab) = VALUE zdemo_tab(
  ( id = 1 name = 'First' )
  ( id = 2 name = 'Second' )
  ( id = 3 name = 'Third' ) ).

" With BASE (append to existing)
itab = VALUE #( BASE itab
  ( id = 4 name = 'Fourth' ) ).

" LINES OF (copy from other table)
itab = VALUE #( BASE itab ( LINES OF other_tab ) ).

" From range (UNTIL/WHILE)
DATA(nums) = VALUE int_table(
  FOR i = 1 UNTIL i > 10
  ( i ) ).

" With FOR from table
DATA(new_tab) = VALUE target_tab(
  FOR wa IN source_tab
  ( id = wa-key name = wa-description ) ).

" FOR with WHERE
DATA(filtered) = VALUE target_tab(
  FOR wa IN source WHERE ( active = abap_true )
  ( wa ) ).

" FOR with INDEX INTO
DATA(numbered) = VALUE target_tab(
  FOR wa IN source INDEX INTO idx
  ( line_no = idx data = wa ) ).

" Nested FOR
DATA(product) = VALUE result_tab(
  FOR a IN tab_a
  FOR b IN tab_b
  ( a = a b = b ) ).
```

### Deep Structures

```abap
" Nested structure
DATA(deep) = VALUE deep_struc(
  header = VALUE #( id = 1 name = 'Header' )
  items = VALUE #(
    ( item_id = 10 desc = 'Item 1' )
    ( item_id = 20 desc = 'Item 2' ) ) ).
```

### OPTIONAL and DEFAULT

```abap
" OPTIONAL - return initial if not found
DATA(line) = VALUE #( itab[ id = 999 ] OPTIONAL ).

" DEFAULT - return specific value if not found
DATA(line) = VALUE #( itab[ id = 999 ] DEFAULT VALUE #( id = 0 name = 'Not found' ) ).
```

---

## NEW Operator

### Create Objects

```abap
" Create instance
DATA(oref) = NEW zcl_my_class( ).

" With constructor parameters
DATA(oref) = NEW zcl_my_class( iv_name = 'Test' iv_value = 100 ).

" Anonymous instance in expression
IF NEW zcl_validator( )->is_valid( input ).
  ...
ENDIF.
```

### Create Data References

```abap
" Elementary types
DATA(dref_int) = NEW i( 42 ).
DATA(dref_str) = NEW string( 'Hello' ).

" Structures
DATA(dref_struc) = NEW zdemo_struc( id = 1 name = 'Test' ).

" Tables
DATA(dref_tab) = NEW zdemo_tab( ( id = 1 ) ( id = 2 ) ).
```

---

## CONV Operator

```abap
" Convert to specific type
DATA(str) = CONV string( some_char ).
DATA(int) = CONV i( '123' ).
DATA(dec) = CONV decfloat34( 1 / 3 ).

" With type inference
DATA result TYPE decfloat34.
result = CONV #( num1 / num2 ).

" Inline type conversion
process( CONV string( number ) ).
```

---

## CORRESPONDING Operator

### Basic Mapping

```abap
" Map matching components
target = CORRESPONDING #( source ).

" With BASE (keep existing values)
target = CORRESPONDING #( BASE ( target ) source ).
```

### Field Mapping

```abap
" Explicit field mapping
target = CORRESPONDING #( source MAPPING
  target_field = source_field
  other_field = another_field ).

" EXCEPT - exclude fields
target = CORRESPONDING #( source EXCEPT field1 field2 ).
```

### Table Operations

```abap
" Map tables
target_tab = CORRESPONDING #( source_tab ).

" With DISCARDING DUPLICATES (for unique keys)
target_sorted = CORRESPONDING #( source_tab DISCARDING DUPLICATES ).
```

### DEEP and BASE Options

```abap
" DEEP - handle nested structures/tables
target = CORRESPONDING #( DEEP source ).

" DEEP BASE - keep existing nested data
target = CORRESPONDING #( DEEP BASE ( target ) source ).
```

### MAPPING FROM ENTITY / TO ENTITY

```abap
" RAP-specific mapping
struct = CORRESPONDING #( bdef_type MAPPING FROM ENTITY ).
bdef_type = CORRESPONDING #( struct MAPPING TO ENTITY ).

" USING CONTROL - respect %control flags
target = CORRESPONDING #( source USING CONTROL ).

" CHANGING CONTROL - populate %control
target = CORRESPONDING #( source CHANGING CONTROL ).
```

---

## COND Operator

```abap
" Simple condition
DATA(text) = COND string( WHEN flag = abap_true THEN 'Yes' ELSE 'No' ).

" Multiple conditions
DATA(grade) = COND string(
  WHEN score >= 90 THEN 'A'
  WHEN score >= 80 THEN 'B'
  WHEN score >= 70 THEN 'C'
  WHEN score >= 60 THEN 'D'
  ELSE 'F' ).

" With complex expressions
DATA(result) = COND #(
  WHEN table IS INITIAL THEN 'Empty'
  WHEN lines( table ) = 1 THEN 'Single'
  ELSE |{ lines( table ) } items| ).

" With THROW
DATA(value) = COND #(
  WHEN valid THEN result
  ELSE THROW zcx_validation_error( ) ).

" With LET (local variables)
DATA(msg) = COND #(
  LET len = strlen( text ) IN
  WHEN len > 100 THEN 'Long'
  WHEN len > 50 THEN 'Medium'
  ELSE 'Short' ).
```

---

## SWITCH Operator

```abap
" Value-based switch
DATA(text) = SWITCH string( code
  WHEN 'A' THEN 'Active'
  WHEN 'I' THEN 'Inactive'
  WHEN 'D' THEN 'Deleted'
  ELSE 'Unknown' ).

" With type inference
DATA result TYPE string.
result = SWITCH #( status
  WHEN 1 THEN 'Open'
  WHEN 2 THEN 'Closed'
  ELSE 'Unknown' ).

" With THROW
DATA(value) = SWITCH #( code
  WHEN 1 THEN 'One'
  WHEN 2 THEN 'Two'
  ELSE THROW zcx_invalid_code( ) ).
```

---

## CAST Operator

```abap
" Cast to subclass
DATA(subclass) = CAST zcl_subclass( super_ref ).

" Cast to interface
DATA(intf) = CAST zif_my_interface( oref ).

" For RTTI
DATA(class_desc) = CAST cl_abap_classdescr(
  cl_abap_typedescr=>describe_by_object_ref( oref ) ).

" With TRY for safe casting
TRY.
    DATA(specific) = CAST zcl_specific( general_ref ).
  CATCH cx_sy_move_cast_error.
    " Handle cast failure
ENDTRY.
```

---

## REF Operator

```abap
" Create reference to existing data
DATA text TYPE string VALUE 'Hello'.
DATA(dref) = REF #( text ).

" Inline creation
process( REF #( some_structure ) ).

" With explicit type
DATA(typed_ref) = REF string( text ).
```

---

## EXACT Operator

```abap
" Lossless conversion (raises exception on loss)
TRY.
    DATA(exact_int) = EXACT i( decimal_value ).
  CATCH cx_sy_conversion_lost.
    " Precision would be lost
ENDTRY.

" With rounding
DATA(rounded) = EXACT decfloat34( value ) ##NEEDED.
```

---

## REDUCE Operator

### Aggregation

```abap
" Sum
DATA(sum) = REDUCE i( INIT s = 0
  FOR wa IN itab
  NEXT s = s + wa-amount ).

" Concatenation
DATA(concat) = REDUCE string( INIT str = ``
  FOR wa IN itab
  NEXT str = str && wa-name && `, ` ).

" Maximum
DATA(max) = REDUCE i( INIT m = 0
  FOR wa IN itab
  NEXT m = COND #( WHEN wa-value > m THEN wa-value ELSE m ) ).

" Count with condition
DATA(count) = REDUCE i( INIT c = 0
  FOR wa IN itab WHERE ( active = abap_true )
  NEXT c = c + 1 ).
```

### Multiple Accumulators

```abap
DATA(stats) = REDUCE #(
  INIT sum = 0 count = 0
  FOR wa IN itab
  NEXT sum = sum + wa-amount
       count = count + 1 ).
" stats-sum and stats-count available
```

### Building Tables

```abap
" Filter and transform
DATA(filtered) = REDUCE string_table(
  INIT result = VALUE string_table( )
  FOR wa IN source WHERE ( status = 'A' )
  NEXT result = VALUE #( BASE result ( wa-name ) ) ).
```

---

## FILTER Operator

```abap
" Filter by condition
DATA(active) = FILTER #( itab WHERE status = 'A' ).

" Using secondary key (more efficient)
DATA(filtered) = FILTER #( itab USING KEY by_status WHERE status = 'A' ).

" EXCEPT - exclude matching
DATA(non_active) = FILTER #( itab EXCEPT WHERE status = 'A' ).

" With filter table (IN)
DATA filter_vals TYPE SORTED TABLE OF string WITH UNIQUE KEY table_line.
filter_vals = VALUE #( ( `A` ) ( `B` ) ).
DATA(matched) = FILTER #( itab IN filter_vals WHERE status = table_line ).

" With EXCEPT and filter table
DATA(not_matched) = FILTER #( itab EXCEPT IN filter_vals WHERE status = table_line ).
```

---

## LET Expressions

```abap
" Define local variables in expressions
DATA(result) = LET a = 10
                   b = 20
               IN a + b.

" With COND
DATA(category) = COND #(
  LET len = strlen( text )
      upper = to_upper( text ) IN
  WHEN len > 100 AND upper CS 'ERROR' THEN 'Critical'
  WHEN len > 50 THEN 'Warning'
  ELSE 'Info' ).

" In VALUE
DATA(items) = VALUE itab_type(
  LET base_id = 100 IN
  ( id = base_id + 1 name = 'First' )
  ( id = base_id + 2 name = 'Second' ) ).
```

---

## ALPHA Conversion

```abap
" In string templates
" Add leading zeros
DATA(with_zeros) = |{ '1234' ALPHA = IN WIDTH = 10 }|.   " 0000001234

" Remove leading zeros
DATA(no_zeros) = |{ '00001234' ALPHA = OUT }|.            " 1234
```

---

## Best Practices

1. **Use VALUE #( )** with type inference when target type is clear
2. **Use OPTIONAL/DEFAULT** for safe table access
3. **Prefer CORRESPONDING** over manual field-by-field copy
4. **Use REDUCE** for functional aggregation
5. **Use FILTER** for table filtering (with secondary keys when possible)
6. **LET expressions** improve readability for complex conditions
7. **NEW** for object creation, **REF #( )** for references to existing data
