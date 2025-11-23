# Released ABAP Classes - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/22_Released_ABAP_Classes.md

---

## Overview

Released ABAP classes are part of SAP's official APIs for ABAP Cloud Development.

### Query Released Classes

```abap
SELECT ReleasedObjectType, ReleasedObjectName, ReleaseState
  FROM i_apisforclouddevelopment
  WHERE releasestate = 'RELEASED'
  AND ReleasedObjectType = 'CLAS'
  INTO TABLE @DATA(released_classes).
```

### Find Successors for Deprecated Objects

```abap
SELECT *
  FROM i_apiswithclouddevsuccessor
  INTO TABLE @DATA(successors).
```

---

## Execution & Output

### IF_OO_ADT_CLASSRUN

```abap
CLASS zcl_demo DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
ENDCLASS.

CLASS zcl_demo IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    out->write( 'Hello from ABAP Cloud!' ).
    out->write( data_object ).
    out->write( itab ).
  ENDMETHOD.
ENDCLASS.
```

---

## UUID Management

### CL_SYSTEM_UUID

```abap
" Generate UUID
DATA(uuid) = cl_system_uuid=>create_uuid_x16_static( ).

" Convert formats
TRY.
    DATA(uuid_c22) = cl_system_uuid=>convert_uuid_x16_static( uuid = uuid ).
    DATA(uuid_c32) = cl_system_uuid=>convert_uuid_x16_static(
      uuid = uuid format = cl_system_uuid=>if_system_uuid_rfc4122~format_c32 ).
  CATCH cx_uuid_error.
ENDTRY.
```

---

## Numeric Operations

### CL_ABAP_MATH

```abap
DATA(pi) = cl_abap_math=>pi.
DATA(e) = cl_abap_math=>e.
DATA(max_int4) = cl_abap_math=>max_int4.
DATA(min_int4) = cl_abap_math=>min_int4.
```

### CL_ABAP_BIGINT

```abap
DATA(bigint) = cl_abap_bigint=>factory_from_int8( 123456789 ).
DATA(result) = bigint->add( cl_abap_bigint=>factory_from_int8( 987654321 ) ).
DATA(product) = bigint->mul( other_bigint ).
DATA(sqrt) = bigint->sqrt( ).
```

### CL_ABAP_RATIONAL

```abap
DATA(rational) = cl_abap_rational=>factory_from_string( '1/3' ).
DATA(decimal) = rational->get_as_decfloat34( ).
```

### Random Numbers

```abap
DATA(random) = cl_abap_random_int=>create( seed = 42 min = 1 max = 100 ).
DATA(number) = random->get_next( ).

DATA(random_f) = cl_abap_random_float=>create( seed = 42 ).
DATA(float_val) = random_f->get_next( ).
```

---

## String Processing

### CL_ABAP_CHAR_UTILITIES

```abap
DATA(newline) = cl_abap_char_utilities=>newline.
DATA(tab) = cl_abap_char_utilities=>horizontal_tab.
DATA(cr_lf) = cl_abap_char_utilities=>cr_lf.
```

### XCO String Processing

```abap
" Substring
DATA(sub) = xco_cp=>string( text )->from( 5 )->to( 10 )->value.

" Split
DATA(parts) = xco_cp=>string( text )->split( `;` )->value.

" Join
DATA(joined) = xco_cp=>strings( string_table )->join( `, ` )->value.

" Case conversion
DATA(upper) = xco_cp=>string( text )->to_upper_case( )->value.
DATA(lower) = xco_cp=>string( text )->to_lower_case( )->value.
```

---

## Date & Time

### CL_ABAP_CONTEXT_INFO

```abap
DATA(system_date) = cl_abap_context_info=>get_system_date( ).
DATA(system_time) = cl_abap_context_info=>get_system_time( ).
DATA(user_alias) = cl_abap_context_info=>get_user_alias( ).
```

### XCO Date/Time

```abap
" Current date
DATA(date) = xco_cp=>sy->date( )->as( xco_cp_time=>format->iso_8601_extended )->value.

" Add days
DATA(tomorrow) = xco_cp=>sy->date( )->add( iv_day = 1 )->value.

" Add months
DATA(next_month) = xco_cp=>sy->date( )->add( iv_month = 1 )->value.
```

### CL_ABAP_TSTMP

```abap
" Add seconds to timestamp
DATA(new_ts) = cl_abap_tstmp=>add( tstmp = timestamp secs = 3600 ).

" Subtract timestamps
DATA(diff) = cl_abap_tstmp=>subtractsecs( tstmp1 = ts1 tstmp2 = ts2 ).
```

---

## Data Encoding

### Base64

```abap
" Encode
DATA(encoded) = cl_web_http_utility=>encode_base64( unencoded = xstring_data ).

" Decode
DATA(decoded) = cl_web_http_utility=>decode_base64( encoded = base64_string ).

" XCO alternative
DATA(xco_encoded) = xco_cp=>xstring( xstring_data
  )->as( xco_cp_binary=>text_encoding->base64 )->value.
```

### GZIP Compression

```abap
" Compress
cl_abap_gzip=>compress_binary(
  EXPORTING raw_in = raw_data
  IMPORTING gzip_out = compressed ).

" Decompress
cl_abap_gzip=>decompress_binary(
  EXPORTING gzip_in = compressed
  IMPORTING raw_out = decompressed ).
```

---

## Regular Expressions

### CL_ABAP_REGEX / CL_ABAP_MATCHER

```abap
DATA(regex) = cl_abap_regex=>create( pattern = '\d+' ).
DATA(matcher) = regex->create_matcher( text = 'abc123def' ).

IF matcher->match( ).
  DATA(matched) = matcher->get_match( ).
ENDIF.

" Find all
WHILE matcher->find_next( ).
  DATA(found) = matcher->get_match( ).
ENDWHILE.
```

---

## RAP Classes

### CL_ABAP_BEHV_AUX

```abap
" Get current handler context
DATA(context) = cl_abap_behv_aux=>get_current_handler_context( ).
```

### CL_ABAP_TX

```abap
" Transactional control
cl_abap_tx=>save( ).
```

---

## Type Services (RTTI)

### CL_ABAP_TYPEDESCR Hierarchy

```abap
" Describe by data
DATA(type_desc) = cl_abap_typedescr=>describe_by_data( data_object ).

" Describe by name
DATA(type_desc) = cl_abap_typedescr=>describe_by_name( 'ZDEMO_STRUCTURE' ).

" Cast to specific descriptor
DATA(struct_desc) = CAST cl_abap_structdescr( type_desc ).
DATA(components) = struct_desc->get_components( ).

DATA(table_desc) = CAST cl_abap_tabledescr( type_desc ).
DATA(line_type) = table_desc->get_table_line_type( ).
```

---

## Dynamic Programming

### CL_ABAP_CORRESPONDING

```abap
DATA(corresponding) = cl_abap_corresponding=>create(
  source = source_structure
  destination = destination_structure
  mapping = VALUE #( ( srcname = 'OLD_NAME' dstname = 'NEW_NAME' ) ) ).

corresponding->execute(
  EXPORTING source = source_structure
  CHANGING destination = destination_structure ).
```

### CL_ABAP_DYN_PRG

```abap
" Check table name
TRY.
    cl_abap_dyn_prg=>check_table_name_str( table_name ).
  CATCH cx_abap_not_a_table.
ENDTRY.

" Check against allowlist
cl_abap_dyn_prg=>check_allowlist(
  val = input
  allowlist = VALUE #( ( 'ALLOWED1' ) ( 'ALLOWED2' ) ) ).
```

---

## Calendar Functions

### CL_SCAL_UTILS

```abap
DATA(month_names) = cl_scal_utils=>month_names_get( ).
DATA(weekday) = cl_scal_utils=>date_get_day_of_week( date = sy-datum ).
```
