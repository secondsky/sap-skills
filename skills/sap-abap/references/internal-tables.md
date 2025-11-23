# ABAP Internal Tables - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/01_Internal_Tables.md

---

## Table Type Categories

### Standard Tables
- Index access and key access
- Non-unique primary key (always)
- Suitable for sequential processing and when duplicates allowed
- Default table type

### Sorted Tables
- Index access and key access
- Unique or non-unique primary key
- Automatically sorted by key
- Binary search for key access (O(log n))

### Hashed Tables
- Key access only (no index access)
- Unique primary key required
- Hash algorithm for constant-time access (O(1))
- Best for large datasets with unique key access

---

## Declaration Syntax

```abap
" Using TYPE TABLE OF
DATA itab TYPE TABLE OF string WITH EMPTY KEY.
DATA std_tab TYPE STANDARD TABLE OF zdemo_struc WITH EMPTY KEY.
DATA sorted_tab TYPE SORTED TABLE OF zdemo_struc WITH UNIQUE KEY id.
DATA hashed_tab TYPE HASHED TABLE OF zdemo_struc WITH UNIQUE KEY id.

" With DDIC types
DATA itab TYPE zdemo_table_type.

" Inline declarations
DATA(itab) = VALUE string_table( ( `a` ) ( `b` ) ( `c` ) ).

" Structured line type
DATA: BEGIN OF line,
        id   TYPE i,
        name TYPE string,
      END OF line.
DATA itab TYPE TABLE OF line WITH EMPTY KEY.

" Reference to internal table
DATA itab_ref TYPE REF TO string_table.
itab_ref = REF #( itab ).
```

---

## Table Keys

### Primary Key

```abap
" Empty key (standard tables only)
DATA itab TYPE TABLE OF struc WITH EMPTY KEY.

" Single key field
DATA itab TYPE SORTED TABLE OF struc WITH UNIQUE KEY id.

" Composite key
DATA itab TYPE HASHED TABLE OF struc WITH UNIQUE KEY client id.

" Non-unique key (sorted tables)
DATA itab TYPE SORTED TABLE OF struc WITH NON-UNIQUE KEY category.

" Default key (all non-numeric fields)
DATA itab TYPE TABLE OF struc WITH DEFAULT KEY.
```

### Secondary Keys

```abap
" Sorted secondary key
DATA itab TYPE TABLE OF struc
  WITH EMPTY KEY
  WITH NON-UNIQUE SORTED KEY by_name COMPONENTS name.

" Hashed secondary key
DATA itab TYPE TABLE OF struc
  WITH EMPTY KEY
  WITH UNIQUE HASHED KEY by_id COMPONENTS id.

" Multiple secondary keys
DATA itab TYPE SORTED TABLE OF struc
  WITH UNIQUE KEY id
  WITH NON-UNIQUE SORTED KEY by_cat COMPONENTS category
  WITH UNIQUE HASHED KEY by_code COMPONENTS code.

" Using secondary keys
READ TABLE itab WITH KEY by_name COMPONENTS name = 'Test' INTO wa.
LOOP AT itab USING KEY by_cat WHERE category = 'A'.
  ...
ENDLOOP.
```

---

## Creating and Populating Tables

### VALUE Operator

```abap
" Simple values
DATA(itab) = VALUE string_table( ( `one` ) ( `two` ) ( `three` ) ).

" Structured entries
DATA(itab) = VALUE itab_type(
  ( id = 1 name = `First` )
  ( id = 2 name = `Second` )
  ( id = 3 name = `Third` ) ).

" BASE - append to existing
itab = VALUE #( BASE itab ( id = 4 name = `Fourth` ) ).

" LINES OF - copy from other tables
itab = VALUE #( BASE itab ( LINES OF other_itab ) ).

" FOR iterations
DATA(itab) = VALUE itab_type(
  FOR i = 1 UNTIL i > 10
  ( id = i name = |Entry { i }| ) ).

" FOR with source table
DATA(new_tab) = VALUE target_type(
  FOR wa IN source_tab
  ( id = wa-key text = wa-description ) ).

" FOR with WHERE
DATA(filtered) = VALUE itab_type(
  FOR wa IN source WHERE ( status = 'A' )
  ( wa ) ).
```

### APPEND and INSERT

```abap
" APPEND - add to end
APPEND VALUE #( id = 1 ) TO itab.
APPEND wa TO itab.
APPEND INITIAL LINE TO itab.
APPEND INITIAL LINE TO itab ASSIGNING FIELD-SYMBOL(<new>).
APPEND LINES OF source_itab TO itab.
APPEND LINES OF source FROM 5 TO 10 TO itab.

" INSERT - position-specific or key-based
INSERT wa INTO itab INDEX 1.
INSERT wa INTO TABLE itab.  " Key-based for sorted/hashed
INSERT LINES OF source INTO itab INDEX 3.
INSERT LINES OF source INTO TABLE itab.
```

### CORRESPONDING Operator

```abap
" Basic mapping
target = CORRESPONDING #( source ).

" With BASE
target = CORRESPONDING #( BASE ( target ) source ).

" Field mapping
target = CORRESPONDING #( source MAPPING
  target_field = source_field
  other_field = another_field ).

" EXCEPT - exclude fields
target = CORRESPONDING #( source EXCEPT field1 field2 ).

" DEEP - handle nested structures
target = CORRESPONDING #( DEEP source ).

" DISCARDING DUPLICATES
itab = CORRESPONDING #( source DISCARDING DUPLICATES ).
```

---

## Reading Table Entries

### Table Expressions (Recommended)

```abap
" By index
DATA(line) = itab[ 1 ].
DATA(line) = itab[ lines( itab ) ].  " Last line

" By key
DATA(line) = itab[ id = 1 ].
DATA(line) = itab[ id = 1 name = 'Test' ].

" Using secondary key
DATA(line) = itab[ KEY by_name name = 'Test' ].

" Safe access with OPTIONAL (returns initial if not found)
DATA(line) = VALUE #( itab[ id = 999 ] OPTIONAL ).

" Safe access with DEFAULT
DATA(line) = VALUE #( itab[ id = 999 ] DEFAULT VALUE #( id = 0 ) ).

" Accessing components
DATA(name) = itab[ 1 ]-name.
DATA(count) = itab[ KEY by_id id = 1 ]-count.

" Check existence
IF line_exists( itab[ id = 1 ] ).
  ...
ENDIF.

" Get index
DATA(idx) = line_index( itab[ name = 'Test' ] ).
```

### READ TABLE Statement

```abap
" Into work area
READ TABLE itab INTO wa INDEX 1.
READ TABLE itab INTO wa WITH KEY id = 1.
READ TABLE itab INTO wa WITH TABLE KEY id = 1.

" Into field symbol (recommended for modification)
READ TABLE itab ASSIGNING FIELD-SYMBOL(<fs>) INDEX 1.
READ TABLE itab ASSIGNING <fs> WITH KEY id = 1.

" Into data reference
READ TABLE itab REFERENCE INTO dref INDEX 1.

" Transporting specific fields
READ TABLE itab INTO wa TRANSPORTING name email.
READ TABLE itab TRANSPORTING NO FIELDS WITH KEY id = 1.

" Using secondary key
READ TABLE itab USING KEY by_name INTO wa WITH KEY by_name COMPONENTS name = 'Test'.

" Binary search (standard tables)
READ TABLE itab INTO wa WITH KEY name = 'Test' BINARY SEARCH.

" Check sy-subrc after READ
IF sy-subrc = 0.
  " Found at sy-tabix
ELSE.
  " Not found
ENDIF.
```

---

## Modifying Table Entries

### Direct Modification

```abap
" Modify by index
itab[ 1 ]-name = 'Updated'.
itab[ 1 ] = VALUE #( id = 1 name = 'New' ).

" Modify via field symbol
READ TABLE itab ASSIGNING FIELD-SYMBOL(<fs>) INDEX 1.
<fs>-name = 'Updated'.
<fs>-count += 1.

" Modify in LOOP
LOOP AT itab ASSIGNING FIELD-SYMBOL(<line>).
  <line>-name = to_upper( <line>-name ).
  <line>-updated = abap_true.
ENDLOOP.
```

### MODIFY Statement

```abap
" Modify by index
MODIFY itab FROM wa INDEX 5.

" Modify by key (sorted/hashed tables)
MODIFY TABLE itab FROM wa.

" Modify transporting specific fields
MODIFY itab FROM wa INDEX 5 TRANSPORTING name email.
MODIFY TABLE itab FROM wa TRANSPORTING status.

" Modify with WHERE
MODIFY itab FROM VALUE #( status = 'X' )
  TRANSPORTING status WHERE category = 'A'.
```

---

## Deleting Table Entries

```abap
" Delete by index
DELETE itab INDEX 1.
DELETE itab FROM 5 TO 10.

" Delete by key
DELETE TABLE itab FROM wa.
DELETE TABLE itab WITH TABLE KEY id = 1.

" Delete with WHERE
DELETE itab WHERE status = 'D'.
DELETE itab WHERE amount < 0 AND category <> 'X'.

" Delete adjacent duplicates (requires sorted table or prior SORT)
SORT itab BY name.
DELETE ADJACENT DUPLICATES FROM itab COMPARING name.
DELETE ADJACENT DUPLICATES FROM itab COMPARING ALL FIELDS.

" Clear table
CLEAR itab.
FREE itab.  " Also releases memory
```

---

## Looping and Iteration

### LOOP Statement

```abap
" Basic loop
LOOP AT itab INTO wa.
  " Process wa
ENDLOOP.

" With field symbol (recommended)
LOOP AT itab ASSIGNING FIELD-SYMBOL(<fs>).
  <fs>-counter += 1.
ENDLOOP.

" With data reference
LOOP AT itab REFERENCE INTO DATA(dref).
  dref->*-status = 'P'.
ENDLOOP.

" With WHERE condition
LOOP AT itab INTO wa WHERE status = 'A'.
  ...
ENDLOOP.

" Using secondary key
LOOP AT itab INTO wa USING KEY by_category WHERE category = 'X'.
  ...
ENDLOOP.

" With FROM/TO
LOOP AT itab INTO wa FROM 5 TO 10.
  ...
ENDLOOP.

" Group processing
LOOP AT itab INTO wa GROUP BY wa-category.
  " wa is representative line
  LOOP AT GROUP wa INTO DATA(member).
    " Process each group member
  ENDLOOP.
ENDLOOP.

" Available sy fields in loop
" sy-tabix - current index
" sy-index - loop counter (also works for DO/WHILE)
```

### FOR Expressions

```abap
" Transform table
DATA(new_tab) = VALUE itab_type(
  FOR wa IN itab
  ( id = wa-id name = to_upper( wa-name ) ) ).

" Filter and transform
DATA(active) = VALUE itab_type(
  FOR wa IN itab WHERE ( active = abap_true )
  ( id = wa-id status = 'Active' ) ).

" With INDEX INTO
DATA(numbered) = VALUE itab_type(
  FOR wa IN itab INDEX INTO idx
  ( line_no = idx content = wa ) ).

" Nested FOR
DATA(product) = VALUE itab_type(
  FOR a IN itab_a
  FOR b IN itab_b
  ( a = a b = b result = a * b ) ).

" REDUCE aggregation
DATA(sum) = REDUCE i( INIT s = 0
  FOR wa IN itab
  NEXT s = s + wa-amount ).

DATA(max) = REDUCE i( INIT m = 0
  FOR wa IN itab
  NEXT m = COND #( WHEN wa-value > m THEN wa-value ELSE m ) ).

DATA(concat) = REDUCE string( INIT str = ``
  FOR wa IN itab
  NEXT str = str && wa-name && `, ` ).
```

---

## Sorting Tables

```abap
" Sort by field(s)
SORT itab BY name.
SORT itab BY category name.
SORT itab BY amount DESCENDING.
SORT itab BY name ASCENDING amount DESCENDING.

" Sort by table key
SORT itab BY PRIMARY KEY.

" Stable sort (preserve original order for equal elements)
SORT itab BY category STABLE.

" Case-insensitive sort
SORT itab BY name AS TEXT.
```

---

## Table Functions

```abap
" Count lines
DATA(count) = lines( itab ).
DATA(count) = line_count( itab[ id = 1 ] ).  " In expression

" Check if exists
IF line_exists( itab[ id = 1 ] ).
  ...
ENDIF.

" Get index
DATA(idx) = line_index( itab[ name = 'Test' ] ).

" Table aggregations (with REDUCE)
DATA(sum) = REDUCE i( INIT s = 0 FOR wa IN itab NEXT s = s + wa-amount ).
DATA(min) = REDUCE i( INIT m = 999999 FOR wa IN itab
  NEXT m = COND #( WHEN wa-val < m THEN wa-val ELSE m ) ).
```

---

## FILTER Expression

```abap
" Basic filter
DATA(filtered) = FILTER #( itab WHERE status = 'A' ).

" Using secondary key (more efficient)
DATA(filtered) = FILTER #( itab USING KEY by_status WHERE status = 'A' ).

" With EXCEPT (exclude matching lines)
DATA(non_active) = FILTER #( itab EXCEPT WHERE status = 'A' ).

" Filter with IN condition
DATA filter_values TYPE SORTED TABLE OF string WITH UNIQUE KEY table_line.
filter_values = VALUE #( ( `A` ) ( `B` ) ( `C` ) ).
DATA(matched) = FILTER #( itab IN filter_values WHERE status = table_line ).
```

---

## Group Processing

```abap
" Group by single field
LOOP AT itab INTO wa GROUP BY wa-category.
  DATA(group_key) = wa-category.
  LOOP AT GROUP wa INTO DATA(member).
    " Process group members
  ENDLOOP.
ENDLOOP.

" Group by multiple fields
LOOP AT itab INTO wa GROUP BY ( cat = wa-category
                                 year = wa-year )
                      ASCENDING
                      ASSIGNING FIELD-SYMBOL(<grp>).
  " <grp> contains group key fields
  LOOP AT GROUP <grp> ASSIGNING FIELD-SYMBOL(<member>).
    " Process member
  ENDLOOP.
ENDLOOP.

" With aggregation (group size, index)
LOOP AT itab INTO wa GROUP BY ( category = wa-category
                                 size = GROUP SIZE
                                 index = GROUP INDEX )
                      ASSIGNING FIELD-SYMBOL(<grp>).
  " <grp>-size contains number of entries in group
  " <grp>-index contains group number (1, 2, 3...)
ENDLOOP.

" Without members (aggregate only)
LOOP AT itab INTO wa GROUP BY wa-category WITHOUT MEMBERS.
  " Only process unique group keys
ENDLOOP.
```

---

## Secondary Table Keys

```abap
" Declaration
TYPES itab_type TYPE TABLE OF struc
  WITH EMPTY KEY
  WITH NON-UNIQUE SORTED KEY by_name COMPONENTS name
  WITH UNIQUE HASHED KEY by_id COMPONENTS id.

" Using in READ
READ TABLE itab WITH KEY by_name COMPONENTS name = 'Test' INTO wa.
READ TABLE itab USING KEY by_id INTO wa WITH KEY by_id COMPONENTS id = 1.

" Using in LOOP
LOOP AT itab USING KEY by_name WHERE name CS 'test'.
  ...
ENDLOOP.

" Using in DELETE
DELETE itab USING KEY by_id WHERE id = 0.

" Key specification in expressions
DATA(line) = itab[ KEY by_name name = 'Test' ].
DATA(idx) = line_index( itab[ KEY by_name name = 'Test' ] ).
```

---

## Performance Considerations

1. **Choose appropriate table type**
   - Standard: Sequential access, small tables, need index access
   - Sorted: Frequent key access, range queries, need both index and key
   - Hashed: Large tables with unique key access only

2. **Use field symbols** instead of work areas for modification in loops

3. **Use secondary keys** for different access patterns instead of SORT

4. **Avoid dynamic WHERE** in production-critical code

5. **Use FILTER with key** for efficient filtering

6. **For large tables**, prefer hashed/sorted over standard with BINARY SEARCH

7. **DELETE ADJACENT DUPLICATES** requires prior sort or sorted table
