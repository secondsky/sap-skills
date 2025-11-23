# ABAP CDS Troubleshooting Guide

Common errors, warnings, and solutions for ABAP CDS development.

---

## Error: SD_CDS_ENTITY105 - Missing Reference Information

### Problem

Elements with data types CURR (currency amount) or QUAN (quantity) require reference information.

**Error Message**:
```
"Reference information is missing or data type is incorrect"
```

### Cause

Currency and quantity fields must reference their unit field for semantic correctness.

### Solution 1: Add Semantics Annotations

```sql
-- For currency fields
@Semantics.currencyCode: true
waers,
@Semantics.amount.currencyCode: 'waers'
netwr,

-- For quantity fields
@Semantics.unitOfMeasure: true
meins,
@Semantics.quantity.unitOfMeasure: 'meins'
menge
```

### Solution 2: Import Reference from Joined Table

```sql
define view Z_WITH_CURRENCY as select from vbak as v
  inner join t001 as c on v.bukrs = c.bukrs
{
  v.vbeln,
  c.waers,
  @Semantics.amount.currencyCode: 'waers'
  v.netwr
}
```

### Solution 3: Block Inherited Annotations

If reference comes from base view but causes issues:

```sql
@Metadata.ignorePropagatedAnnotations: true
define view Z_CLEAN_VIEW as select from Z_BASE
{
  field1,
  @Semantics.currencyCode: true
  local_waers,
  @Semantics.amount.currencyCode: 'local_waers'
  amount
}
```

---

## Warning: Cardinality Mismatch

### Problem

Specified cardinality doesn't match actual data relationships.

**Warning Message**:
```
"The cardinality of association '_Assoc' may not match the data"
```

### Cause

- `[0..1]` specified but multiple records exist
- `[1..*]` specified but zero records possible

### Solution

Define cardinality matching actual data:

```sql
-- If truly optional single record
association [0..1] to target as _Assoc on ...

-- If multiple records possible
association [0..*] to target as _Assoc on ...

-- If always exactly one
association [1..1] to target as _Assoc on ...
```

### Verification

```abap
" Check actual cardinality in data
SELECT parent_key, COUNT(*) AS cnt
  FROM child_table
  GROUP BY parent_key
  HAVING COUNT(*) > 1
  INTO TABLE @DATA(lt_multiple).

IF lt_multiple IS NOT INITIAL.
  " Multiple records exist - use [0..*] or [1..*]
ENDIF.
```

---

## Error: View Activation Failed

### Problem

CDS view cannot be activated.

### Common Causes and Solutions

#### 1. SQL View Name Too Long

```sql
-- Error: SQL view name exceeds 16 characters
@AbapCatalog.sqlViewName: 'ZVERY_LONG_VIEW_NAME_HERE'

-- Solution: Shorten to max 16 characters
@AbapCatalog.sqlViewName: 'ZV_SHORT_NAME'
```

#### 2. Duplicate SQL View Name

```sql
-- Another view already uses this SQL view name
-- Solution: Use unique name
@AbapCatalog.sqlViewName: 'ZV_UNIQUE_123'
```

#### 3. Invalid Field Name

```sql
-- Reserved word or invalid characters
{
  select as Select  -- 'select' is reserved

-- Solution: Use valid alias
  select as SelectionField
}
```

#### 4. Type Mismatch in UNION

```sql
-- Fields must have compatible types
define view Z_UNION as
  select from table1 { cast(field as abap.char(10)) as f1 }
  union
  select from table2 { cast(field as abap.char(10)) as f1 }
```

---

## Error: Association Target Not Found

### Problem

Association references non-existent entity.

**Error Message**:
```
"The CDS entity 'TARGET_VIEW' does not exist"
```

### Solution

1. Verify target view name spelling
2. Ensure target view is activated
3. Check target is in accessible package

```sql
-- Correct entity name
association [0..1] to I_BUSINESSPARTNER as _Partner on ...

-- NOT: I_BusinessPartner (case matters in some contexts)
```

---

## Error: Annotation Syntax Error

### Problem

Invalid annotation syntax.

### Common Issues

#### Missing Colon

```sql
-- Wrong
@AccessControl.authorizationCheck #NOT_REQUIRED

-- Correct
@AccessControl.authorizationCheck: #NOT_REQUIRED
```

#### Invalid Value

```sql
-- Wrong
@AccessControl.authorizationCheck: 'NOT_REQUIRED'

-- Correct (use # for enum)
@AccessControl.authorizationCheck: #NOT_REQUIRED
```

#### Missing Brackets

```sql
-- Wrong
@UI.lineItem: position: 10

-- Correct
@UI.lineItem: [{ position: 10 }]
```

---

## Error: DCL Compilation Failed

### Problem

Access control definition has errors.

### Common Issues

#### 1. Wrong View Name in DCL

```sql
-- DCL references non-existent view
define role Z_WRONG_DCL {
  grant select on Z_NONEXISTENT_VIEW
    where ...
}

-- Solution: Verify view name
define role Z_CORRECT_DCL {
  grant select on Z_EXISTING_VIEW
    where ...
}
```

#### 2. Invalid Authorization Object

```sql
-- Authorization object doesn't exist
where (bukrs) = aspect pfcg_auth(INVALID_OBJECT, BUKRS, ACTVT = '03');

-- Solution: Verify in SU21
where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03');
```

#### 3. Field Not in View

```sql
-- Field 'xyz' not in protected view
where (xyz) = aspect pfcg_auth(...)

-- Solution: Use field that exists in view
where (bukrs) = aspect pfcg_auth(...)
```

---

## Warning: No Access Control

### Problem

View has `@AccessControl.authorizationCheck: #CHECK` but no DCL.

**Warning Message**:
```
"No access control exists for entity 'Z_VIEW'"
```

### Solutions

#### Option 1: Create DCL

```sql
@MappingRole: true
define role Z_VIEW_DCL {
  grant select on Z_VIEW
    where ...
}
```

#### Option 2: Disable Check

```sql
@AccessControl.authorizationCheck: #NOT_REQUIRED
define view Z_VIEW as select from ...
```

---

## Performance Issues

### Symptom: Slow Query Execution

### Causes and Solutions

#### 1. Missing Index on Filter Fields

```sql
-- Slow: Filtering on non-indexed field
where customer_name like '%SAP%'

-- Better: Filter on indexed key field
where customer_id = 'CUST001'
```

#### 2. Unnecessary Joins via Associations

```sql
-- Triggers join even if not needed
{
  _Customer.name1  -- Always joins
}

-- Better: Expose association only
{
  _Customer  -- Join-on-demand
}
```

#### 3. Complex CASE in WHERE

```sql
-- Slow: Complex logic in WHERE
where case when type = 'A' then field1 else field2 end = 'X'

-- Better: Restructure query or use UNION
```

#### 4. Wrong Cardinality

```sql
-- Slow: TO MANY when actually TO ONE
association [0..*] to customer as _Cust on ...

-- Better: Correct cardinality enables optimization
association [0..1] to customer as _Cust on ...
```

---

## Runtime Errors

### CX_SY_OPEN_SQL_DB

**Problem**: Database error during CDS access.

**Common Causes**:
- Invalid data conversion
- Division by zero
- Buffer overflow

**Solution**: Add defensive logic:

```sql
case
  when divisor = 0 then 0
  else dividend / divisor
end as SafeDivision
```

### CX_ABAP_INVALID_VALUE

**Problem**: Invalid value in CDS calculation.

**Solution**: Validate before calculation:

```sql
case
  when dats_is_valid(date_field) = 1
    then dats_add_days(date_field, 7)
  else '00000000'
end as SafeDate
```

---

## Debugging Tips

### 1. Data Preview in ADT

Right-click view → **Open With** → **Data Preview**

### 2. Generated SQL

Right-click view → **Show SQL CREATE Statement**

### 3. Check Dependencies

Right-click view → **Get Where-Used List**

### 4. Annotation Analysis

```abap
DATA: lo_svc TYPE REF TO cl_dd_ddl_annotation_service.
cl_dd_ddl_annotation_service=>create(
  EXPORTING iv_cds_view = 'Z_VIEW'
  RECEIVING ro_service = lo_svc
).
DATA(lt_annos) = lo_svc->get_annos( ).
```

### 5. Authorization Trace

Transaction ST01 → Authorization check trace

---

## Useful Transactions

| TCode | Purpose |
|-------|---------|
| SE11 | Check underlying tables |
| SE16 | View table data |
| ST05 | SQL trace |
| ST01 | Authorization trace |
| SU21 | Authorization objects |
| SU53 | Last authorization failure |
| SDDLAR | Repair DDL structures |

---

## Common Mistakes Checklist

- [ ] SQL view name ≤ 16 characters
- [ ] Unique SQL view name
- [ ] CURR/QUAN fields have references
- [ ] Association cardinality matches data
- [ ] DCL exists for sensitive views
- [ ] Field aliases are unique
- [ ] CASE branches return same type
- [ ] GROUP BY includes all non-aggregated fields

---

## Documentation Links

- **SAP Help - CDS Messages**: https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds_messages.html
- **SAP Community - CDS Troubleshooting**: https://community.sap.com/t5/tag/CDS%20Views/tg-p

**Last Updated**: 2025-11-23
