# ABAP Dynamic Programming - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/06_Dynamic_Programming.md

---

## Field Symbols

### Declaration and Assignment

```abap
" Typed field symbol
FIELD-SYMBOLS <fs> TYPE string.
ASSIGN text TO <fs>.

" Generic field symbols
FIELD-SYMBOLS <any> TYPE any.
FIELD-SYMBOLS <data> TYPE data.
FIELD-SYMBOLS <table> TYPE ANY TABLE.
FIELD-SYMBOLS <struct> TYPE any.

" Inline declaration
ASSIGN text TO FIELD-SYMBOL(<inline_fs>).
```

### Static Assignment

```abap
" Assign data object
FIELD-SYMBOLS <fs> TYPE i.
DATA num TYPE i VALUE 100.
ASSIGN num TO <fs>.
<fs> = 200.  " Modifies num

" Assign structure component
FIELD-SYMBOLS <comp> TYPE any.
ASSIGN struc-field TO <comp>.

" Assign internal table line
LOOP AT itab ASSIGNING FIELD-SYMBOL(<line>).
  <line>-field = 'modified'.
ENDLOOP.

READ TABLE itab ASSIGNING <line> INDEX 1.
```

### Dynamic Assignment

```abap
" Dynamic component access
DATA(comp_name) = 'FIELD1'.
ASSIGN struc-(comp_name) TO FIELD-SYMBOL(<dynamic>).

" Fully dynamic
DATA: obj_name TYPE string VALUE 'STRUC',
      fld_name TYPE string VALUE 'FIELD1'.
ASSIGN (obj_name)-(fld_name) TO <dynamic>.

" Dynamic table field
LOOP AT itab ASSIGNING <line>.
  ASSIGN COMPONENT comp_name OF STRUCTURE <line> TO FIELD-SYMBOL(<value>).
  IF sy-subrc = 0.
    " Component found
  ENDIF.
ENDLOOP.

" By index
ASSIGN COMPONENT 3 OF STRUCTURE struc TO <comp>.
```

### Checking Assignment

```abap
IF <fs> IS ASSIGNED.
  " Field symbol points to data
ENDIF.

IF <fs> IS NOT ASSIGNED.
  " Not assigned
ENDIF.

" Unassign
UNASSIGN <fs>.
```

### Casting

```abap
" Cast to specific type
ASSIGN dref->* TO <fs> CASTING TYPE string.

" Cast with type object
DATA(type) = cl_abap_typedescr=>describe_by_name( 'STRING' ).
ASSIGN dref->* TO <fs> CASTING TYPE HANDLE type.
```

---

## Data References

### Declaration and Creation

```abap
" Typed reference
DATA dref TYPE REF TO string.

" Generic reference
DATA dref TYPE REF TO data.

" REF operator
DATA text TYPE string VALUE 'hello'.
dref = REF #( text ).

" NEW operator
dref = NEW string( 'created' ).
dref = NEW i( 42 ).

" CREATE DATA
CREATE DATA dref TYPE string.
CREATE DATA dref TYPE TABLE OF string.
CREATE DATA dref TYPE zdemo_struc.

" Dynamic type
CREATE DATA dref TYPE (type_name).
CREATE DATA dref TYPE TABLE OF (type_name).
```

### Dereferencing

```abap
" Direct access
DATA(value) = dref->*.

" Modification
dref->* = 'new value'.

" With field symbol
ASSIGN dref->* TO FIELD-SYMBOL(<fs>).
<fs> = 'modified'.

" Component access (structures)
DATA(comp_value) = dref->*-component.
dref->*-component = 'value'.
```

### Checking References

```abap
IF dref IS BOUND.
  " Reference points to data
ENDIF.

IF dref IS NOT BOUND.
  " Reference is initial
ENDIF.

IF dref IS INITIAL.
  " Same as NOT BOUND
ENDIF.

" Clear reference
CLEAR dref.
FREE dref.
```

---

## RTTI (Run-Time Type Information)

### Type Description Classes

```abap
" Get type descriptor
DATA(tdo) = cl_abap_typedescr=>describe_by_data( data_object ).
DATA(tdo) = cl_abap_typedescr=>describe_by_name( 'ZDEMO_STRUC' ).
DATA(tdo) = cl_abap_typedescr=>describe_by_data_ref( dref ).
DATA(tdo) = cl_abap_typedescr=>describe_by_object_ref( oref ).

" Type kind
DATA(kind) = tdo->kind.
" C = Class, E = Elementary, S = Structure, T = Table

" Type name
DATA(name) = tdo->get_relative_name( ).
DATA(abs_name) = tdo->absolute_name.
```

### Elementary Types (CL_ABAP_ELEMDESCR)

```abap
DATA(elem) = CAST cl_abap_elemdescr(
  cl_abap_typedescr=>describe_by_data( some_var ) ).

DATA(type_kind) = elem->type_kind.    " I, C, N, D, T, STRING, etc.
DATA(length) = elem->length.
DATA(decimals) = elem->decimals.
DATA(output_length) = elem->output_length.
```

### Structure Types (CL_ABAP_STRUCTDESCR)

```abap
DATA(struct_desc) = CAST cl_abap_structdescr(
  cl_abap_typedescr=>describe_by_data( some_struct ) ).

" Get components
DATA(components) = struct_desc->components.
" Returns: name, type_kind, length, decimals, etc.

" Get component names
DATA(comp_names) = struct_desc->get_component_names( ).

" Get component type
DATA(comp_type) = struct_desc->get_component_type( 'FIELD1' ).
```

### Table Types (CL_ABAP_TABLEDESCR)

```abap
DATA(table_desc) = CAST cl_abap_tabledescr(
  cl_abap_typedescr=>describe_by_data( some_itab ) ).

DATA(table_kind) = table_desc->table_kind.
" STANDARD, SORTED, HASHED

DATA(line_type) = table_desc->get_table_line_type( ).
DATA(key_info) = table_desc->get_keys( ).
DATA(key_components) = table_desc->key.
```

### Class Types (CL_ABAP_CLASSDESCR)

```abap
DATA(class_desc) = CAST cl_abap_classdescr(
  cl_abap_typedescr=>describe_by_object_ref( oref ) ).

DATA(class_name) = class_desc->get_relative_name( ).
DATA(methods) = class_desc->methods.
DATA(attributes) = class_desc->attributes.
DATA(interfaces) = class_desc->interfaces.
DATA(superclass) = class_desc->get_super_class_type( ).
```

### Interface Types (CL_ABAP_INTFDESCR)

```abap
DATA(intf_desc) = CAST cl_abap_intfdescr(
  cl_abap_typedescr=>describe_by_name( 'ZIF_MY_INTERFACE' ) ).

DATA(methods) = intf_desc->methods.
DATA(attributes) = intf_desc->attributes.
```

---

## RTTC (Run-Time Type Creation)

### Create Elementary Types

```abap
" Built-in types
DATA(string_type) = cl_abap_elemdescr=>get_string( ).
DATA(int_type) = cl_abap_elemdescr=>get_i( ).
DATA(char_type) = cl_abap_elemdescr=>get_c( p_length = 10 ).
DATA(numc_type) = cl_abap_elemdescr=>get_n( p_length = 8 ).
DATA(packed_type) = cl_abap_elemdescr=>get_p( p_length = 8 p_decimals = 2 ).

" Create data with type handle
CREATE DATA dref TYPE HANDLE string_type.
```

### Create Structure Types

```abap
" Define components
DATA(components) = VALUE cl_abap_structdescr=>component_table(
  ( name = 'ID' type = cl_abap_elemdescr=>get_i( ) )
  ( name = 'NAME' type = cl_abap_elemdescr=>get_string( ) )
  ( name = 'AMOUNT' type = cl_abap_elemdescr=>get_p( p_length = 8 p_decimals = 2 ) ) ).

" Create structure type
DATA(struct_type) = cl_abap_structdescr=>create( components ).

" Create data
CREATE DATA dref TYPE HANDLE struct_type.
ASSIGN dref->* TO FIELD-SYMBOL(<struct>).

" Access components dynamically
ASSIGN COMPONENT 'NAME' OF STRUCTURE <struct> TO FIELD-SYMBOL(<name>).
<name> = 'Test'.
```

### Create Table Types

```abap
" From structure type
DATA(table_type) = cl_abap_tabledescr=>create(
  p_line_type = struct_type
  p_table_kind = cl_abap_tabledescr=>tablekind_std
  p_unique = abap_false ).

" With key
DATA(sorted_table) = cl_abap_tabledescr=>create(
  p_line_type = struct_type
  p_table_kind = cl_abap_tabledescr=>tablekind_sorted
  p_unique = abap_true
  p_key = VALUE #( ( name = 'ID' ) ) ).

" Create table data
CREATE DATA dref TYPE HANDLE table_type.
ASSIGN dref->* TO FIELD-SYMBOL(<table>).
```

---

## Dynamic SQL

```abap
" Dynamic table name
DATA table_name TYPE string VALUE 'ZDEMO_TABLE'.
SELECT * FROM (table_name) INTO TABLE @DATA(result).

" Dynamic field list
DATA field_list TYPE string VALUE 'CARRID, CONNID, FLDATE'.
SELECT (field_list) FROM zdemo_fli INTO TABLE @DATA(fields).

" Dynamic WHERE clause
DATA where_clause TYPE string VALUE `CARRID = 'LH'`.
SELECT * FROM zdemo_fli WHERE (where_clause) INTO TABLE @DATA(filtered).

" Dynamic ORDER BY
DATA order_by TYPE string VALUE 'FLDATE DESCENDING'.
SELECT * FROM zdemo_fli ORDER BY (order_by) INTO TABLE @DATA(sorted).

" Fully dynamic
SELECT (field_list)
  FROM (table_name)
  WHERE (where_clause)
  ORDER BY (order_by)
  INTO TABLE @DATA(dynamic_result).
```

---

## Dynamic Method Calls

```abap
" Dynamic method name
DATA method_name TYPE string VALUE 'PROCESS'.
CALL METHOD oref->(method_name).

" With parameters
DATA(ptab) = VALUE abap_parmbind_tab(
  ( name = 'IV_INPUT' kind = cl_abap_objectdescr=>exporting value = REF #( input ) )
  ( name = 'RV_RESULT' kind = cl_abap_objectdescr=>returning value = REF #( result ) ) ).

CALL METHOD oref->(method_name) PARAMETER-TABLE ptab.

" Dynamic class instantiation
DATA class_name TYPE string VALUE 'ZCL_MY_CLASS'.
CREATE OBJECT oref TYPE (class_name).

" With constructor parameters
DATA(ctab) = VALUE abap_parmbind_tab(
  ( name = 'IV_PARAM' kind = cl_abap_objectdescr=>exporting value = REF #( param ) ) ).

CREATE OBJECT oref TYPE (class_name) PARAMETER-TABLE ctab.
```

---

## Dynamic Function Calls

```abap
DATA func_name TYPE string VALUE 'Z_MY_FUNCTION'.

DATA(ptab) = VALUE abap_func_parmbind_tab(
  ( name = 'IV_INPUT' kind = abap_func_exporting value = REF #( input ) )
  ( name = 'EV_OUTPUT' kind = abap_func_importing value = REF #( output ) )
  ( name = 'CT_TABLE' kind = abap_func_tables value = REF #( table ) ) ).

DATA(etab) = VALUE abap_func_excpbind_tab(
  ( name = 'NOT_FOUND' value = 1 )
  ( name = 'OTHERS' value = 99 ) ).

CALL FUNCTION func_name
  PARAMETER-TABLE ptab
  EXCEPTION-TABLE etab.

IF sy-subrc <> 0.
  " Handle exception
ENDIF.
```

---

## Generic Types Reference

| Type | Description |
|------|-------------|
| `any` | Any data type |
| `data` | Any non-generic data type |
| `any table` | Any internal table |
| `standard table` | Standard table |
| `sorted table` | Sorted table |
| `hashed table` | Hashed table |
| `index table` | Standard or sorted table |
| `clike` | Character-like types |
| `csequence` | Character sequence (c, string) |
| `numeric` | Numeric types |
| `xsequence` | Byte sequence (x, xstring) |
| `simple` | Elementary non-deep types |
| `decfloat` | Decimal floating point |

---

## Best Practices

1. **Check assignments** before using field symbols
2. **Check references** before dereferencing
3. **Use RTTI** for type inspection
4. **Use RTTC** for dynamic type creation
5. **Handle sy-subrc** after dynamic operations
6. **Validate dynamic names** to prevent injection
7. **Prefer static typing** when possible for performance
8. **Document dynamic code** thoroughly
