# ABAP Dictionary - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/26_ABAP_Dictionary.md

---

## Data Elements

Define elementary and reference data types:

```abap
" Data element based on built-in type
TYPES ty_dtel1 TYPE zdemo_abap_dtel_pr.
DATA char3_dtel TYPE zdemo_abap_dtel_pr.

" Data element based on domain
TYPES ty_dtel2 TYPE zdemo_abap_dtel_do.
DATA char1_dtel TYPE zdemo_abap_dtel_do.

" Data element with reference type
TYPES ty_dtel3 TYPE zdemo_abap_dtel_ref.
DATA char10_dtel_ref TYPE zdemo_abap_dtel_ref.
```

---

## Domains

Define reusable technical and semantic properties:

- Standalone dictionary objects
- Cannot be used directly with `TYPES` and `DATA`
- Support value ranges for input validation
- Multiple data elements can reference same domain

---

## Structures

### Flat Structure Definition

```cds
@EndUserText.label : 'Demo flat DDIC structure'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
define structure zdemo_abap_struc_flat {
  chars : abap.char(3);
  num   : abap.int4;
  cuky  : abap.cuky;
  @Semantics.amount.currencyCode : 'zdemo_abap_struc_flat.cuky'
  curr  : abap.curr(8,2);
  id    : zdemo_abap_dtel_pr;
  flag  : zdemo_abap_dtel_do;
}
```

### Deep Structure Definition

```cds
@EndUserText.label : 'Demo deep DDIC structure'
define structure zdemo_abap_struc_deep {
  bt_elem1   : abap.char(5);
  bt_elem2   : abap.int4;
  dref1      : reference to abap.char(3);
  oref1      : reference to cl_abap_math;
  struc1     : zdemo_abap_tab1;
  struc2     : include zdemo_abap_carr;
  struc3     : include zdemo_abap_fli with suffix _in;
  tab1       : string_table;
}
```

### Component Types Supported

- Elementary types (built-in and data elements)
- Reference types (data/object references)
- Structured types (other structures, database tables)
- Include structures with optional suffixes
- Table types

---

## Table Types

### ABAP Usage

```abap
TYPES ty_tab_elem TYPE zdemo_abap_tt_str.
TYPES ty_tab_struc TYPE zdemo_abap_tt_so.
DATA tab_elem1 TYPE ty_tab_elem.
DATA tab_struct1 TYPE ty_tab_struc.
```

### RTTI for Table Types

```abap
DATA(tdo_table_type) = CAST cl_abap_tabledescr(
  cl_abap_typedescr=>describe_by_name( 'ZDEMO_ABAP_TT_SO' ) ).
DATA(table_keys) = tdo_table_type->get_keys( ).
DATA(table_key_aliases) = tdo_table_type->get_key_aliases( ).
```

---

## Database Tables

### Definition

```cds
@EndUserText.label : 'Demo DDIC database table'
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table zdemo_abap_tabl1 {
  key client : abap.clnt not null;
  key num    : abap.int4 not null;
  chars      : abap.char(5);
  id         : zdemo_abap_dtel_pr;
  str        : abap.string(0);
  cuky       : abap.cuky;
  @Semantics.amount.currencyCode : 'zdemo_abap_tabl1.cuky'
  curr       : abap.curr(8,2);
}
```

### With Included Structure

```cds
define table zdemo_abap_tabl2 {
  key client    : abap.clnt not null;
  key key_field : abap.int4 not null;
  include zdemo_abap_struc_flat;
}
```

### Key Requirements

- Must have primary key with unique field combinations
- Key fields require `NOT NULL` flag
- Cannot use `string` or `rawstring` for keys
- First column typically uses `clnt` for client-dependency

### ABAP Usage

```abap
DATA struc_from_dbtab TYPE zdemo_abap_tabl1.
struc_from_dbtab = VALUE #( num = 1 chars = 'abcde' ).

MODIFY zdemo_abap_tabl1 FROM @struc_from_dbtab.

DATA itab_from_dbtab TYPE TABLE OF zdemo_abap_tabl1 WITH EMPTY KEY.
SELECT * FROM zdemo_abap_tabl1 INTO TABLE @itab_from_dbtab.
```

---

## CDS Simple Types

```abap
TYPES ty_cds_simple TYPE zdemo_abap_cds_type.
DATA dobj_w_simple_type TYPE zdemo_abap_cds_type.
```

---

## CDS Enumerated Types

```abap
TYPES ty_cds_enum TYPE zdemo_abap_cds_enum.
DATA dobj_w_enum_type TYPE zdemo_abap_cds_enum.

" Convert to enum
DATA(conv_enum) = CONV zdemo_abap_cds_enum( 'X' ).

" Handle invalid value
TRY.
    DATA(result) = CONV zdemo_abap_cds_enum( 'INVALID' ).
  CATCH cx_sy_conversion_no_enum_value INTO DATA(error).
    " Handle error
ENDTRY.
```

---

## Predefined Types

```abap
DATA a TYPE int1.        " 1-byte integer
DATA b TYPE int2.        " 2-byte integer
DATA c TYPE int4.        " 4-byte integer
DATA d TYPE d16n.        " Decimal 16
DATA e TYPE d34n.        " Decimal 34
DATA f TYPE datn.        " Date (internal)
DATA g TYPE timn.        " Time (internal)
DATA h TYPE utcl.        " UTC long timestamp

DATA is_true TYPE abap_boolean.
is_true = abap_true.
```

---

## Released APIs Query

```abap
SELECT ReleasedObjectType, ReleasedObjectName, ReleaseState
  FROM i_apisforclouddevelopment
  WHERE releasestate = 'RELEASED'
  AND ( ReleasedObjectType = 'DTEL' OR ReleasedObjectType = 'DOMA' )
  ORDER BY ReleasedObjectType, ReleasedObjectName
  INTO TABLE @DATA(released_dtel_doma).
```
