# ABAP CDS Access Control Reference

Complete reference for implementing access control in ABAP CDS using DCL (Data Control Language).

**Source**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abencds_authorizations.htm

---

## Overview

CDS Access Control provides row-level security for CDS views. Access rules are defined in DCL (Data Control Language) source files that map to CDS views and restrict data based on:
- PFCG authorization objects
- Literal conditions
- User identity
- Combination of conditions

---

## Creating Access Control in ADT

1. **File** → **New** → **Other** → **Core Data Services** → **Access Control**
2. Enter:
   - Name: Same as CDS view or custom name
   - Description
   - Protected Entity: The CDS view to protect
3. Select template

---

## Basic DCL Structure

```sql
@EndUserText.label: 'Access Control for Z_CDS_VIEW'
@MappingRole: true
define role Z_CDS_VIEW_DCL {
  grant select on Z_CDS_VIEW
    where condition;
}
```

### Key Elements

| Element | Purpose |
|---------|---------|
| `@MappingRole: true` | Required - maps role to all users |
| `define role` | Creates the access control object |
| `grant select on` | Specifies the protected CDS view |
| `where` | Defines the access condition |

---

## Authorization Check Annotation

Control whether DCL is required:

```sql
@AccessControl.authorizationCheck: #CHECK
define view Z_CDS_VIEW as select from ...
```

| Value | Behavior |
|-------|----------|
| `#NOT_REQUIRED` | No DCL needed, full access granted |
| `#CHECK` | Warning if no DCL exists |
| `#MANDATORY` | Syntax error if no DCL exists |
| `#NOT_ALLOWED` | Any existing DCL is ignored |

---

## Condition Types

### 1. PFCG Authorization Condition

Map CDS fields to PFCG authorization objects:

```sql
@MappingRole: true
define role Z_SALES_DCL {
  grant select on Z_SALES_ORDER
    where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03');
}
```

**Syntax**:
```sql
where (cds_field) = aspect pfcg_auth(AUTH_OBJECT, AUTH_FIELD, ACTVT = 'value')
```

**Components**:
- `cds_field`: Field from the CDS view
- `AUTH_OBJECT`: Authorization object (from SU21)
- `AUTH_FIELD`: Authorization field within the object
- `ACTVT`: Activity (usually '03' for display)

### 2. Multiple Authorization Fields

```sql
where (vkorg, vtweg, spart) =
  aspect pfcg_auth(V_VBAK_VKO, VKORG, VTWEG, SPART, ACTVT = '03');
```

Fields are mapped positionally to authorization fields.

### 3. Multiple Authorization Objects

```sql
@MappingRole: true
define role Z_COMPLEX_DCL {
  grant select on Z_CDS_VIEW
    where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03')
      and (vkorg, vtweg, spart) =
          aspect pfcg_auth(V_VBAK_VKO, VKORG, VTWEG, SPART, ACTVT = '03');
}
```

### 4. Literal Condition

Compare field to fixed value:

```sql
@MappingRole: true
define role Z_ACTIVE_ONLY_DCL {
  grant select on Z_CDS_VIEW
    where status = 'ACTIVE';
}
```

**Operators**:
- `=` Equal
- `<>` Not equal
- `<`, `>`, `<=`, `>=` Comparison
- `between ... and ...` Range
- `like` Pattern matching

### 5. User Aspect

Restrict to current user:

```sql
@MappingRole: true
define role Z_USER_DCL {
  grant select on Z_USER_DATA
    where created_by ?= aspect user;
}
```

**Note**: `?=` allows NULL values to match.

### 6. Environment Aspect

Access environment values:

```sql
where client = aspect environment.client
```

---

## Operator Variants

### Standard Operator (=)

```sql
where (bukrs) = aspect pfcg_auth(...)
```
Only authorized values returned.

### Optional Operator (?=)

```sql
where (bukrs) ?= aspect pfcg_auth(...)
```
NULL and initial values also allowed.

---

## Combining Conditions

### AND Combination

```sql
where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03')
  and status = 'ACTIVE'
  and created_by ?= aspect user;
```

### OR Combination

```sql
where status = 'PUBLIC'
   or created_by ?= aspect user;
```

### Complex Logic

```sql
where (
    (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03')
    and status = 'ACTIVE'
  )
  or status = 'PUBLIC';
```

---

## Inheritance and Propagation

### No Automatic Inheritance

Access control does NOT automatically apply when:
- CDS view is used as data source in another view
- View is accessed via association

Each view needs its own DCL for protection.

### Recommended Pattern

Create DCL for all views in a hierarchy:

```sql
-- Base view DCL
define role Z_BASE_DCL {
  grant select on Z_BASE_VIEW
    where (bukrs) = aspect pfcg_auth(...);
}

-- Consumer view DCL
define role Z_CONSUMER_DCL {
  grant select on Z_CONSUMER_VIEW
    where (bukrs) = aspect pfcg_auth(...);
}
```

---

## Common Authorization Objects

### Finance

| Object | Fields | Description |
|--------|--------|-------------|
| F_BKPF_BUK | BUKRS, ACTVT | Company code |
| F_BKPF_GSB | GSBER, ACTVT | Business area |
| F_BKPF_KOA | KOART, ACTVT | Account type |

### Sales

| Object | Fields | Description |
|--------|--------|-------------|
| V_VBAK_VKO | VKORG, VTWEG, SPART, ACTVT | Sales org/channel/division |
| V_VBAK_AAT | AUART, ACTVT | Order type |

### Materials

| Object | Fields | Description |
|--------|--------|-------------|
| M_MATE_WRK | WERKS, ACTVT | Plant |
| M_MATE_MAR | MTART, ACTVT | Material type |

### Controlling

| Object | Fields | Description |
|--------|--------|-------------|
| K_CCA | KOKRS, KOSTL, ACTVT | Cost center |
| K_ORDER | AUFNR, ACTVT | Internal order |

**Find objects**: Transaction SU21 (Authorization Objects)

---

## Activity Values (ACTVT)

| Value | Activity |
|-------|----------|
| 01 | Create |
| 02 | Change |
| 03 | Display |
| 06 | Delete |
| 16 | Execute |

Most CDS views use `ACTVT = '03'` (display).

---

## Examples

### Company Code Authorization

```sql
@MappingRole: true
define role Z_COMPANY_DCL {
  grant select on Z_FINANCIAL_DATA
    where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03');
}
```

### Sales Organization + Status Filter

```sql
@MappingRole: true
define role Z_SALES_DCL {
  grant select on Z_SALES_ORDER
    where (vkorg, vtweg, spart) =
          aspect pfcg_auth(V_VBAK_VKO, VKORG, VTWEG, SPART, ACTVT = '03')
      and status <> 'DELETED';
}
```

### Own Records Only

```sql
@MappingRole: true
define role Z_OWN_DATA_DCL {
  grant select on Z_USER_TASKS
    where assigned_to ?= aspect user;
}
```

### Public + Owned Records

```sql
@MappingRole: true
define role Z_MIXED_DCL {
  grant select on Z_DOCUMENTS
    where visibility = 'PUBLIC'
       or created_by ?= aspect user;
}
```

### Multi-level Authorization

```sql
@MappingRole: true
define role Z_MULTILEVEL_DCL {
  grant select on Z_MATERIAL_DATA
    where (werks) = aspect pfcg_auth(M_MATE_WRK, WERKS, ACTVT = '03')
      and (mtart) = aspect pfcg_auth(M_MATE_MAR, MTART, ACTVT = '03');
}
```

---

## Testing Access Control

### In ADT

1. Right-click CDS view → **Open With** → **Data Preview**
2. Data shown reflects current user's authorizations

### Via ABAP

```abap
" Access control automatically applied
SELECT * FROM z_secured_view
  INTO TABLE @DATA(lt_data).

" Bypass access control (if allowed)
SELECT * FROM z_secured_view
  BYPASSING BUFFER
  INTO TABLE @DATA(lt_all_data).
```

**Note**: `BYPASSING BUFFER` does NOT bypass DCL.

### Checking User Authorizations

```abap
AUTHORITY-CHECK OBJECT 'F_BKPF_BUK'
  ID 'BUKRS' FIELD '1000'
  ID 'ACTVT' FIELD '03'.

IF sy-subrc = 0.
  " User has authorization
ENDIF.
```

---

## Best Practices

1. **Always add DCL for sensitive data**: Don't rely on application-level checks alone
2. **Use #CHECK or #MANDATORY**: Avoid accidental exposure
3. **Match cardinality**: Ensure DCL doesn't create unexpected duplicates
4. **Test with multiple users**: Verify different authorization profiles
5. **Document authorization requirements**: Comment the DCL source
6. **Use ?= for optional fields**: Handle NULL values gracefully

---

## Troubleshooting

### No Data Returned

1. Check user's PFCG role assignments
2. Verify authorization object values in SU21
3. Test authorization with AUTHORITY-CHECK
4. Check DCL condition logic

### Syntax Errors

1. Verify CDS view exists
2. Check field names match exactly
3. Verify authorization object/field names

### Performance Issues

1. Ensure proper indexes on authorization fields
2. Consider restructuring complex OR conditions
3. Test with representative data volumes

---

## Documentation Links

- **SAP Help - Access Control (ABAP Platform)**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abencds_access_control.htm
- **SAP Community - DCL Guide**: https://blogs.sap.com/2017/09/09/all-about-data-control-language-dcls/
- **SAP GitHub - Authorization Checks**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/25_Authorization_Checks.md

**Last Updated**: 2025-11-23
