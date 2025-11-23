# Internal Table Grouping - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/11_Internal_Tables_Grouping.md

---

## Basic Grouping

### Single Column Grouping

```abap
" Representative binding (work area represents group)
LOOP AT spfli_tab INTO wa GROUP BY wa-carrid.
  ... wa-carrid ...
ENDLOOP.
```

### With Member Loop

```abap
LOOP AT spfli_tab INTO wa GROUP BY wa-carrid.
  LOOP AT GROUP wa INTO DATA(member).
    ... member-... ...
  ENDLOOP.
ENDLOOP.
```

---

## Multiple Column Grouping

### Structured Group Key

```abap
LOOP AT spfli_tab INTO wa
  GROUP BY ( key1 = wa-carrid key2 = wa-airpfrom ).
  ... wa-carrid ... wa-airpfrom ...
ENDLOOP.
```

---

## Explicit Group Key Binding

### Single Column

```abap
LOOP AT spfli_tab INTO wa
  GROUP BY wa-carrid
  INTO DATA(key).
  ... key ...
ENDLOOP.
```

### Multiple Columns

```abap
LOOP AT spfli_tab INTO wa
  GROUP BY ( key1 = wa-carrid key2 = wa-airpfrom )
  INTO DATA(key).
  ... key-key1 ... key-key2 ...
ENDLOOP.
```

---

## Group Metadata

### GROUP SIZE and GROUP INDEX

```abap
LOOP AT spfli_tab INTO wa
  GROUP BY ( key1 = wa-carrid key2 = wa-airpfrom
             index = GROUP INDEX size = GROUP SIZE )
  WITHOUT MEMBERS
  INTO DATA(key).
  ... key-key1 ... key-key2 ... key-index ... key-size ...
ENDLOOP.
```

---

## WITHOUT MEMBERS

Skip member iteration, only process group keys:

```abap
LOOP AT spfli_tab INTO wa
  GROUP BY wa-carrid
  WITHOUT MEMBERS
  INTO DATA(key).
  " Only group key available, no member loop possible
  ... key ...
ENDLOOP.
```

---

## Binding Types Comparison

| Type | Description | Features |
|------|-------------|----------|
| Representative | Work area represents group | Simpler syntax |
| Group Key | Explicit output area | GROUP INDEX, GROUP SIZE, WITHOUT MEMBERS |

---

## Advanced Patterns

### Aggregation with Grouping

```abap
LOOP AT flights INTO DATA(flight)
  GROUP BY flight-carrid
  INTO DATA(carrier).

  DATA(total) = REDUCE i( INIT sum = 0
    FOR member IN GROUP carrier
    NEXT sum = sum + member-price ).

  out->write( |{ carrier }: { total }| ).
ENDLOOP.
```

### Nested Grouping

```abap
LOOP AT itab INTO wa
  GROUP BY ( cat1 = wa-field1 cat2 = wa-field2 )
  INTO DATA(group1).

  LOOP AT GROUP group1 INTO DATA(member)
    GROUP BY member-field3
    INTO DATA(group2).

    LOOP AT GROUP group2 INTO DATA(detail).
      " Process detail
    ENDLOOP.
  ENDLOOP.
ENDLOOP.
```

---

## Best Practices

1. **Use GROUP SIZE** for counting without member iteration
2. **Use WITHOUT MEMBERS** when only aggregates needed
3. **Prefer structured keys** for multi-column grouping
4. **Use REDUCE** for aggregations within groups
