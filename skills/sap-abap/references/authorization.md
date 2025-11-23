# Authorization Checks - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/25_Authorization_Checks.md

---

## AUTHORITY-CHECK Statement

### Basic Syntax

```abap
AUTHORITY-CHECK OBJECT 'ZAUTH_OBJ'
    ID id1 FIELD val1
    ID id2 FIELD val2
    ID id3 DUMMY
    ... .
```

### Practical Example

```abap
AUTHORITY-CHECK OBJECT 'ZAUTH_OBJ'
    ID 'ZAUTH_CTRY' FIELD 'US'
    ID 'ACTVT'      FIELD '03'.

IF sy-subrc = 0.
  out->write( `US/03: Allowed` ).
ELSE.
  out->write( `US/03: Not allowed` ).
ENDIF.
```

### Key Characteristics

- Object name must be **uppercase literal** (ABAP Cloud)
- Supports 1-10 authorization field IDs
- `DUMMY` bypasses checks on specific fields
- Return codes: `sy-subrc = 0` (allowed), `sy-subrc = 4` (denied)

---

## Standard Activity Codes (ACTVT)

| Code | Activity |
|------|----------|
| 01 | Create |
| 02 | Change/Update |
| 03 | Display |
| 06 | Delete |

---

## CDS Access Control

### View Entity Annotation

```cds
@AccessControl.authorizationCheck: #CHECK
define view entity ZDEMO_ABAP_FLSCH_VE_AUTH
  as select from zdemo_abap_flsch
{
  key carrid,
  key connid,
      countryfr,
      ...
}
```

### Authorization Options

| Option | Description |
|--------|-------------|
| `#NOT_REQUIRED` | Full access granted |
| `#CHECK` | Warning if access control missing |
| `#MANDATORY` | Access control required |
| `#NOT_ALLOWED` | Access control prohibited |

### Access Control Role (DCL)

```cds
@EndUserText.label: 'Test'
@MappingRole: true
define role ZCDS_ACC_CTRL {
  grant
    select
      on
        ZDEMO_ABAP_FLSCH_VE_AUTH
          where
            (countryfr) = aspect pfcg_auth(zauth_obj, zauth_ctry, ACTVT = '03');
}
```

---

## RAP Authorization Control

### Global Authorization

Restricts operations independently of instance state:

```abap
METHODS get_global_authorizations FOR GLOBAL AUTHORIZATION
    IMPORTING REQUEST requested_authorizations FOR some_bdef
    RESULT result.
```

Implementation:

```abap
METHOD get_global_authorizations.
  IF requested_authorizations-%create = if_abap_behv=>mk-on.
    AUTHORITY-CHECK OBJECT 'ZAUTH_OBJ'
        ID 'ZAUTH_FIELD' DUMMY
        ID 'ACTVT'      FIELD '01'.
    result-%create = COND #( WHEN sy-subrc = 0
        THEN if_abap_behv=>auth-allowed
        ELSE if_abap_behv=>auth-unauthorized ).
  ENDIF.
ENDMETHOD.
```

### Instance Authorization

Evaluates permissions based on entity instance:

```abap
METHODS get_instance_authorizations FOR INSTANCE AUTHORIZATION
    IMPORTING keys REQUEST requested_authorizations FOR some_bdef
    RESULT result.
```

---

## Important Notes

- **ABAP SQL bypasses** database authorization checks
- Programmer **must implement** authorization explicitly
- Both global and instance authorization can operate simultaneously
- `PRIVILEGED` mode circumvents authorization when necessary

---

## Best Practices

1. **Always check authorization** before data modifications
2. **Use CDS access control** for read operations
3. **Implement RAP authorization** for transactional scenarios
4. **Document authorization objects** and their usage
5. **Test with different user profiles**
