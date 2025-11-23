# WHERE Conditions - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/31_WHERE_Conditions.md

---

## ABAP SQL WHERE Conditions

### Comparison Operators

| Operator | Alternative | Description |
|----------|-------------|-------------|
| `=` | `EQ` | Equality |
| `<>` | `NE` | Inequality |
| `<` | `LT` | Less than |
| `>` | `GT` | Greater than |
| `<=` | `LE` | Less or equal |
| `>=` | `GE` | Greater or equal |

### Logical Operators

```abap
WHERE condition1 AND condition2
WHERE condition1 OR condition2
WHERE NOT condition
WHERE ( condition1 AND condition2 ) OR condition3
```

### BETWEEN

```abap
WHERE count BETWEEN 1 AND 10
WHERE count NOT BETWEEN 1 AND 10
```

### Pattern Matching (LIKE)

```abap
WHERE animal LIKE '%ee%'     " Contains 'ee'
WHERE animal LIKE '_e%'      " Second char is 'e'
WHERE animal LIKE '%#%' ESCAPE '#'  " Contains '%'
WHERE animal NOT LIKE '_e%'
```

### Set Membership (IN)

```abap
WHERE animal IN ( 'elephant', 'gorilla', 'dog' )
WHERE animal NOT IN ( 'dog', 'snake' )
WHERE count IN ( SELECT key FROM table )
WHERE ( id, animal ) IN ( ( 1, 'bear' ), ( 2, 'dog' ) )
WHERE count IN @rangestab
```

### NULL Handling

```abap
WHERE count IS INITIAL
WHERE count IS NOT INITIAL
WHERE field IS NULL
WHERE field IS NOT NULL
```

### Subquery Comparisons

```abap
WHERE count = ( SELECT key FROM table WHERE num = 40 )
WHERE count > ALL ( SELECT key FROM table )
WHERE count = ANY ( SELECT key FROM table )
```

### EXISTS

```abap
WHERE EXISTS ( SELECT 'X' FROM table WHERE key = tab~id )
```

### Dynamic Conditions

```abap
DATA(where_clause) = `count > 15`.
SELECT id FROM @itab AS tab WHERE (where_clause) INTO TABLE @result.

DATA(where_tab) = VALUE string_table(
  ( `animal = 'kangaroo'` ) ( `OR` ) ( `count = 4` ) ).
SELECT id FROM @itab AS tab WHERE (where_tab) INTO TABLE @result.
```

---

## Internal Table WHERE Conditions

### LOOP AT with WHERE

```abap
LOOP AT itab INTO DATA(wa) WHERE num = 0.
LOOP AT itab INTO wa WHERE num > 20.
LOOP AT itab INTO wa WHERE id >= 3 AND num > 5.
LOOP AT itab INTO wa WHERE num >= 40 OR num = 0.
LOOP AT itab INTO wa WHERE NOT num = 0.
LOOP AT itab INTO wa WHERE ( id < 5 AND num > 10 ) AND text = `abc`.
```

### Character Comparisons

| Operator | Description |
|----------|-------------|
| `CO` | Contains only |
| `CN` | Contains not only |
| `CS` | Contains string |
| `NS` | Contains no string |
| `CA` | Contains any |
| `NA` | Contains not any |
| `CP` | Conforms to pattern |
| `NP` | Does not conform |

```abap
LOOP AT itab INTO wa WHERE text CO `abc`.
LOOP AT itab INTO wa WHERE text CS `ef`.
LOOP AT itab INTO wa WHERE text CP `*c`.
```

### Range Table Operations

```abap
DATA rangestab TYPE RANGE OF i.
rangestab = VALUE #( ( sign = `I` option = `BT` low = 5 high = 45 ) ).

LOOP AT itab INTO wa WHERE num IN rangestab.
DELETE itab WHERE num IN rangestab.
READ TABLE itab INTO line WHERE num IN rangestab.
```

### Predicate Expressions

```abap
LOOP AT itab INTO wa WHERE num IS INITIAL.
LOOP AT itab INTO wa WHERE ref IS BOUND.
LOOP AT itab INTO wa WHERE oref IS INSTANCE OF cl_system_uuid.
```

---

## DELETE with WHERE

```abap
DELETE itab WHERE num > 20.
DELETE itab WHERE num = 0.
DELETE itab WHERE num > 5 AND id >= 3.
DELETE itab WHERE text CO `abc`.
DELETE itab WHERE num BETWEEN 5 AND 45.
DELETE itab WHERE ref IS BOUND.
```

---

## READ TABLE with WHERE

```abap
READ TABLE itab INTO DATA(line) WHERE num > 20.
READ TABLE itab INTO line WHERE num > 5 AND id >= 3.
READ TABLE itab INTO line WHERE text CS `ef`.
READ TABLE itab INTO line WHERE num IN rangestab.
```

---

## FILTER Operator

```abap
" Filter sorted/hashed tables
DATA(filtered) = FILTER #( sorted_tab WHERE id >= 4 ).
DATA(filtered) = FILTER #( sorted_tab USING KEY primary_key WHERE id >= 4 ).

" EXCEPT - exclude matching
DATA(non_matching) = FILTER #( sorted_tab EXCEPT WHERE id >= 4 ).

" Filter with filter table
DATA filter_vals TYPE SORTED TABLE OF i WITH NON-UNIQUE KEY table_line.
filter_vals = VALUE #( ( 3 ) ( 5 ) ).
DATA(matched) = FILTER #( sorted_tab IN filter_vals WHERE id = table_line ).
DATA(not_matched) = FILTER #( sorted_tab EXCEPT IN filter_vals WHERE id = table_line ).
```

---

## Table Comprehensions (VALUE...FOR)

```abap
TYPES int_tab TYPE TABLE OF i WITH EMPTY KEY.

DATA(result) = VALUE int_tab( FOR w IN itab WHERE ( num = 0 ) ( w-id ) ).
DATA(result) = VALUE int_tab( FOR w IN itab WHERE ( num > 20 ) ( w-id ) ).
DATA(result) = VALUE int_tab( FOR w IN itab WHERE ( text CS `ef` ) ( w-id ) ).
DATA(result) = VALUE int_tab( FOR w IN itab WHERE ( num BETWEEN 5 AND 45 ) ( w-id ) ).
DATA(result) = VALUE int_tab( FOR w IN itab WHERE ( num IN rangestab ) ( w-id ) ).

" Dynamic WHERE
DATA(dynamic_cond) = `num > 20`.
DATA(result) = VALUE int_tab( FOR w IN itab WHERE (dynamic_cond) ( w-id ) ).
```

---

## REDUCE with WHERE

```abap
DATA(result) = REDUCE int_tab( INIT tab = VALUE #( )
  FOR r IN itab WHERE ( num > 20 )
  NEXT tab = VALUE #( BASE tab ( r-id ) ) ).

DATA(result) = REDUCE int_tab( INIT tab = VALUE #( )
  FOR r IN itab WHERE ( text CS `ef` )
  NEXT tab = VALUE #( BASE tab ( r-id ) ) ).

DATA(result) = REDUCE int_tab( INIT tab = VALUE #( )
  FOR r IN itab WHERE ( num IN rangestab )
  NEXT tab = VALUE #( BASE tab ( r-id ) ) ).
```
