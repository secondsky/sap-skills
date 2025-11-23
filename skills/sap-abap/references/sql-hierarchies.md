# ABAP SQL Hierarchies - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/10_ABAP_SQL_Hierarchies.md

---

## CTE Hierarchies

Common Table Expressions can declare SQL hierarchies using `WITH HIERARCHY`.

### CDS Hierarchy as CTE Source

```abap
WITH
  +tree AS
    ( SELECT FROM demo_cds_simple_tree( p_id = @root_id )
             FIELDS * )
      WITH HIERARCHY demo_cds_simple_tree
  SELECT FROM +tree
         FIELDS id, parent, name, hierarchy_rank,
                hierarchy_tree_size, hierarchy_level
         INTO TABLE @FINAL(cte_cds_result).
```

### HIERARCHY Generator as CTE Source

```abap
WITH
  +tree AS
    ( SELECT FROM HIERARCHY(
        SOURCE demo_cds_simple_tree_view
        CHILD TO PARENT ASSOCIATION _tree
        START WHERE id = @root_id
        SIBLINGS ORDER BY id
        MULTIPLE PARENTS NOT ALLOWED ) AS asql_hierarchy
        FIELDS id, parent, name )
      WITH HIERARCHY asql_hierarchy
   SELECT FROM +tree
         FIELDS id, parent, hierarchy_distance
         INTO TABLE @FINAL(cte_asql_result).
```

### CTE with Internal Associations

```abap
WITH
  +cte_simple_tree_source AS
    ( SELECT FROM demo_simple_tree
             FIELDS id, parent_id AS parent, name )
       WITH ASSOCIATIONS (
         JOIN TO MANY +cte_simple_tree_source AS _tree
           ON +cte_simple_tree_source~parent = _tree~id ),
  +tree AS
    ( SELECT FROM HIERARCHY(
        SOURCE +cte_simple_tree_source
        CHILD TO PARENT ASSOCIATION _tree
        START WHERE id = @root_id
        SIBLINGS ORDER BY id
        MULTIPLE PARENTS NOT ALLOWED ) AS cte_hierarchy
        FIELDS id, parent, name )
        WITH HIERARCHY cte_hierarchy
  SELECT FROM +tree
         FIELDS id, parent, hierarchy_rank
         INTO TABLE @FINAL(cte_cte_result).
```

---

## HIERARCHY Generator

Create SQL hierarchies directly in ABAP:

```abap
DATA root_id TYPE demo_cds_simple_tree_view-id.

SELECT FROM HIERARCHY( SOURCE demo_cds_simple_tree_view
                       CHILD TO PARENT ASSOCIATION _tree
                       START WHERE id = @root_id
                       SIBLINGS ORDER BY id
                       MULTIPLE PARENTS NOT ALLOWED )
       FIELDS id, parent, name, hierarchy_rank,
              hierarchy_tree_size, hierarchy_parent_rank,
              hierarchy_level, hierarchy_is_cycle,
              hierarchy_is_orphan, node_id, parent_id
       INTO TABLE @FINAL(asql_cds_result).
```

### Key Parameters

| Parameter | Description |
|-----------|-------------|
| `SOURCE` | Hierarchy source (CDS view or CTE) |
| `CHILD TO PARENT ASSOCIATION` | Self-association for relationships |
| `START WHERE` | Root node conditions |
| `SIBLINGS ORDER BY` | Sort order for siblings |
| `MULTIPLE PARENTS NOT ALLOWED` | Single/multiple parent control |

---

## Hierarchy Navigators

### HIERARCHY_DESCENDANTS

```abap
SELECT FROM HIERARCHY_DESCENDANTS(
              SOURCE demo_cds_simple_tree( p_id = @root_id )
              START WHERE id = @sub_id )
  FIELDS id, parent_id, name, hierarchy_distance
  INTO TABLE @FINAL(descendants).
```

### HIERARCHY_ANCESTORS

```abap
SELECT FROM HIERARCHY_ANCESTORS(
              SOURCE demo_cds_simple_tree( p_id = @root_id )
              START WHERE id = @max_id )
  FIELDS id, parent_id, name, hierarchy_distance
  INTO TABLE @FINAL(ancestors).
```

### HIERARCHY_SIBLINGS

```abap
SELECT FROM HIERARCHY_SIBLINGS(
              SOURCE demo_cds_simple_tree( p_id = @root_id )
              START WHERE id = @sibl_id )
  FIELDS id, parent_id, name, hierarchy_sibling_distance
  INTO TABLE @FINAL(siblings).
```

### HIERARCHY_DESCENDANTS_AGGREGATE

```abap
TYPES:
  BEGIN OF value,
    id     TYPE i,
    amount TYPE p LENGTH 16 DECIMALS 2,
  END OF value.

DATA value_tab TYPE SORTED TABLE OF value WITH UNIQUE KEY id.

SELECT FROM HIERARCHY_DESCENDANTS_AGGREGATE(
              SOURCE demo_cds_simple_tree( p_id = @sub_id ) AS h
              JOIN @value_tab AS v
                ON v~id = h~id
              MEASURES SUM( v~amount ) AS amount_sum
              WHERE hierarchy_rank > 1
              WITH SUBTOTAL
              WITH BALANCE )
  FIELDS id, amount_sum, hierarchy_rank, hierarchy_aggregate_type
  INTO TABLE @FINAL(descendants_aggregate).
```

### Aggregate Parameters

| Parameter | Description |
|-----------|-------------|
| `MEASURES` | Aggregate functions (SUM, COUNT, etc.) |
| `WHERE` | Result set restrictions |
| `WITH SUBTOTAL` | Sum of qualifying nodes |
| `WITH BALANCE` | Sum of non-qualifying nodes |

---

## Implicit Hierarchy Columns

| Column | Description |
|--------|-------------|
| `hierarchy_rank` | Position in traversal order |
| `hierarchy_tree_size` | Count of descendants + self |
| `hierarchy_parent_rank` | Rank of parent node |
| `hierarchy_level` | Depth from root |
| `hierarchy_is_cycle` | Cycle detection flag |
| `hierarchy_is_orphan` | Orphan node flag |
| `hierarchy_distance` | Distance from start node |
