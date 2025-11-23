# Access Control (DCL) Template

Template for creating CDS access control definitions.

---

## Basic DCL Template

```sql
@EndUserText.label: 'Access Control for <View Name>'
@MappingRole: true
define role <DCL_NAME> {
  grant select on <CDS_VIEW_NAME>
    where <condition>;
}
```

---

## PFCG Authorization Template

```sql
@EndUserText.label: 'Access Control for Z_VIEW'
@MappingRole: true
define role Z_VIEW_DCL {
  grant select on Z_VIEW
    where (<cds_field>) = aspect pfcg_auth(
      <AUTH_OBJECT>,
      <AUTH_FIELD>,
      ACTVT = '03'
    );
}
```

---

## Multiple Field Authorization

```sql
@EndUserText.label: 'Sales Organization Access Control'
@MappingRole: true
define role Z_SALES_DCL {
  grant select on Z_SALES_VIEW
    where (vkorg, vtweg, spart) = aspect pfcg_auth(
      V_VBAK_VKO,
      VKORG,
      VTWEG,
      SPART,
      ACTVT = '03'
    );
}
```

---

## Combined Conditions Template

```sql
@EndUserText.label: 'Combined Access Control'
@MappingRole: true
define role Z_COMBINED_DCL {
  grant select on Z_VIEW
    where
      -- Authorization check
      (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03')

      -- Literal condition
      and status <> 'DELETED'

      -- Date condition
      and valid_to >= $session.system_date;
}
```

---

## User-Based Access Template

```sql
@EndUserText.label: 'Own Records Only'
@MappingRole: true
define role Z_OWN_DATA_DCL {
  grant select on Z_USER_DATA
    where created_by ?= aspect user;
}
```

**Note**: `?=` allows NULL values.

---

## OR Condition Template

```sql
@EndUserText.label: 'Public or Own Records'
@MappingRole: true
define role Z_PUBLIC_OR_OWN_DCL {
  grant select on Z_DOCUMENTS
    where visibility = 'PUBLIC'
       or created_by ?= aspect user;
}
```

---

## Multi-Level Authorization Template

```sql
@EndUserText.label: 'Multi-Level Authorization'
@MappingRole: true
define role Z_MULTILEVEL_DCL {
  grant select on Z_MATERIAL_DATA
    where
      -- Plant authorization
      (werks) = aspect pfcg_auth(M_MATE_WRK, WERKS, ACTVT = '03')

      -- Material type authorization
      and (mtart) = aspect pfcg_auth(M_MATE_MAR, MTART, ACTVT = '03');
}
```

---

## Common Authorization Objects Reference

### Finance

| Object | Fields | Description |
|--------|--------|-------------|
| F_BKPF_BUK | BUKRS, ACTVT | Company code |
| F_BKPF_GSB | GSBER, ACTVT | Business area |
| F_BKPF_KOA | KOART, ACTVT | Account type |
| F_LFA1_BUK | BUKRS, ACTVT | Vendor company code |
| F_KNA1_BUK | BUKRS, ACTVT | Customer company code |

### Sales

| Object | Fields | Description |
|--------|--------|-------------|
| V_VBAK_VKO | VKORG, VTWEG, SPART, ACTVT | Sales org/channel/division |
| V_VBAK_AAT | AUART, ACTVT | Order type |
| V_LIKP_VKO | VKORG, VTWEG, ACTVT | Delivery sales org |

### Materials

| Object | Fields | Description |
|--------|--------|-------------|
| M_MATE_WRK | WERKS, ACTVT | Plant |
| M_MATE_MAR | MTART, ACTVT | Material type |
| M_MATE_MAN | MTART, ACTVT | Material maintenance |

### Controlling

| Object | Fields | Description |
|--------|--------|-------------|
| K_CCA | KOKRS, KOSTL, ACTVT | Cost center |
| K_ORDER | AUFNR, ACTVT | Internal order |
| K_PCA | KOKRS, PRCTR, ACTVT | Profit center |

**Important**: Authorization object names and fields may vary by SAP release and customization. Always verify the correct object name and fields in your system using transaction **SU21** (Maintain Authorization Objects) before implementing DCL rules.

### HR

| Object | Fields | Description |
|--------|--------|-------------|
| P_ORGIN | PERSA, PERSG, ACTVT | Personnel area/group |
| PLOG | OTYPE, INFTY, ACTVT | HR master data |

---

## Activity Values (ACTVT)

| Value | Activity |
|-------|----------|
| 01 | Create |
| 02 | Change |
| 03 | Display |
| 06 | Delete |
| 16 | Execute |
| 70 | Administration |

---

## Example: Finance Document Access

```sql
@EndUserText.label: 'Finance Document Access Control'
@MappingRole: true
define role Z_FIN_DOC_DCL {
  grant select on Z_FINANCE_DOCUMENTS
    where
      -- Company code check
      (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03')

      -- Business area check (optional)
      and (gsber) ?= aspect pfcg_auth(F_BKPF_GSB, GSBER, ACTVT = '03')

      -- Only posted documents
      and posting_status = 'POSTED';
}
```

---

## Example: Sales Order Access

```sql
@EndUserText.label: 'Sales Order Access Control'
@MappingRole: true
define role Z_SALES_ORDER_DCL {
  grant select on Z_SALES_ORDER
    where
      -- Sales organization structure
      (vkorg, vtweg, spart) = aspect pfcg_auth(
        V_VBAK_VKO,
        VKORG,
        VTWEG,
        SPART,
        ACTVT = '03'
      )

      -- Order type
      and (auart) ?= aspect pfcg_auth(V_VBAK_AAT, AUART, ACTVT = '03')

      -- Exclude cancelled orders
      and vbtyp <> 'K';
}
```

---

## Example: Own Records with Admin Override

```sql
@EndUserText.label: 'User Tasks with Admin Access'
@MappingRole: true
define role Z_USER_TASKS_DCL {
  grant select on Z_USER_TASKS
    where
      -- Own tasks
      assigned_to ?= aspect user

      -- OR admin authorization
      or (admin_flag) = aspect pfcg_auth(Z_TASK_ADMIN, ADMIN, ACTVT = '03');
}
```

---

## Testing Checklist

- [ ] DCL name follows naming convention
- [ ] @MappingRole: true is set
- [ ] Correct CDS view name referenced
- [ ] Authorization objects exist (check SU21)
- [ ] Field names match CDS view exactly
- [ ] Activity value appropriate (usually '03')
- [ ] Test with authorized user
- [ ] Test with unauthorized user
- [ ] Test edge cases (NULL values)

---

## Debugging

### Check User Authorization (SU53)

After access denied, run SU53 to see missing authorization.

### Authorization Trace (ST01)

1. Start trace in ST01
2. Execute query
3. Analyze trace for auth checks

### Verify DCL Assignment

```abap
" Check if DCL exists and is assigned to view
SELECT ddlname, as4local, as4vers
  FROM ddddlsrc
  WHERE ddlname = 'Z_VIEW_DCL'
  INTO TABLE @DATA(lt_dcl).

" Alternative: Check DCL source for specific view reference
SELECT ddlname, source
  FROM ddddlsrc
  WHERE source LIKE '%Z_CDS_VIEW%'
    AND ddlname LIKE '%_DCL'
  INTO TABLE @DATA(lt_dcl_refs).
```

**Tip**: In ADT, right-click the CDS view and select **Open With** → **Dependency Analyzer** to see associated DCL objects.
