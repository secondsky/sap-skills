# RAP and EML - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/08_EML_ABAP_for_RAP.md

---

## Core Definitions

**ABAP Entity Manipulation Language (EML)**: A subset of ABAP for accessing RAP business object data.

**RAP Business Objects (RAP BO)**:
- Based on hierarchical CDS entity structures
- Consist of parent and child entities via CDS compositions
- Top parent entity is the root entity

---

## Implementation Types

### Managed RAP BOs
- Provider fully/partly supplies transactional buffer and behavior
- Standard CRUD operations work automatically
- Instance data automatically read, modified, and saved
- Non-standard operations require custom implementation

### Unmanaged RAP BOs
- Everything must be provided by developers
- For brownfield scenarios with existing transactional logic
- Can have hybrid: managed RAP BO with unmanaged save

---

## RAP Behavior Definition (BDEF)

### Basic Structure

```cds
managed implementation in class zbp_demo_rap_m unique;
strict ( 2 );

define behavior for ZDemo_RAP_Root alias Root
persistent table zdemo_rap_tab
lock master
authorization master ( instance )
{
  create;
  update;
  delete;

  field ( readonly ) key_field;
  field ( mandatory ) required_field;

  association _Child { create; }

  action someAction;

  determination det1 on save { create; }
  validation val1 on save { create; update; }
}

define behavior for ZDemo_RAP_Child alias Child
persistent table zdemo_rap_child_tab
lock dependent by _Parent
authorization dependent by _Parent
{
  update;
  delete;

  field ( readonly ) parent_key;

  association _Parent;
}
```

### Available Specifications

**Standard Operations:**
```cds
create;
update;
delete( precheck );
association _child { create; }
```

**Non-Standard Operations:**
```cds
action act1;                      " Instance action
static action act2;               " Static action
internal action act3;             " Internal action
factory action act6 [1];          " Factory action
draft action Edit;                " Draft action
function func1 result [0..*] $self;  " Function
```

**Field Characteristics:**
```cds
field ( readonly ) field1;
field ( readonly : update ) key_field;
field ( mandatory ) field2, field3;
field ( features : instance ) field4;
```

**Validations and Determinations:**
```cds
validation val on save { create; field field1; }
determination det1 on modify { update; delete; field field5; }
determination det2 on save { create; field field7; }
```

**Locking and Authorization:**
```cds
lock master
lock dependent by _parent
authorization master ( instance )
authorization master ( global )
authorization dependent by _parent
```

---

## ABAP Behavior Pools (ABP)

### Global Class Definition

```abap
CLASS zbp_demo_rap_m DEFINITION PUBLIC ABSTRACT FINAL
  FOR BEHAVIOR OF zdemo_rap_root.
ENDCLASS.

CLASS zbp_demo_rap_m IMPLEMENTATION.
ENDCLASS.
```

### Handler Classes (Local)

```abap
CLASS lhc_root DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.
    METHODS get_instance_authorizations FOR INSTANCE AUTHORIZATION
      IMPORTING keys REQUEST requested_authorizations
      FOR root RESULT result.

    METHODS create FOR MODIFY
      IMPORTING entities FOR CREATE root.

    METHODS update FOR MODIFY
      IMPORTING entities FOR UPDATE root.

    METHODS delete FOR MODIFY
      IMPORTING keys FOR DELETE root.

    METHODS read FOR READ
      IMPORTING keys FOR READ root RESULT result.

    METHODS some_action FOR MODIFY
      IMPORTING keys FOR ACTION root~some_action.

    METHODS det1 FOR DETERMINE ON SAVE
      IMPORTING keys FOR root~det1.

    METHODS val1 FOR VALIDATE ON SAVE
      IMPORTING keys FOR root~val1.
ENDCLASS.

CLASS lhc_root IMPLEMENTATION.
  METHOD create.
    " Implementation
  ENDMETHOD.
  " ... other methods
ENDCLASS.
```

### Saver Class (Unmanaged Save)

```abap
CLASS lsc_root DEFINITION INHERITING FROM cl_abap_behavior_saver.
  PROTECTED SECTION.
    METHODS finalize REDEFINITION.
    METHODS check_before_save REDEFINITION.
    METHODS adjust_numbers REDEFINITION.
    METHODS save REDEFINITION.
    METHODS cleanup REDEFINITION.
    METHODS cleanup_finalize REDEFINITION.
ENDCLASS.

CLASS lsc_root IMPLEMENTATION.
  METHOD finalize.
    " Final calculations
  ENDMETHOD.

  METHOD check_before_save.
    " Consistency checks
  ENDMETHOD.

  METHOD save.
    " Save to database
  ENDMETHOD.

  METHOD cleanup.
    " Clear buffer
  ENDMETHOD.
ENDCLASS.
```

---

## BDEF Derived Types

### Type Declarations

```abap
" Table types
DATA cr_tab TYPE TABLE FOR CREATE root_entity.
DATA upd_tab TYPE TABLE FOR UPDATE root_entity.
DATA del_tab TYPE TABLE FOR DELETE root_entity.
DATA read_tab TYPE TABLE FOR READ IMPORT root_entity.
DATA result_tab TYPE TABLE FOR READ RESULT root_entity.
DATA action_tab TYPE TABLE FOR ACTION IMPORT root_entity~action_name.

" Structure types
DATA cr_struc TYPE STRUCTURE FOR CREATE root_entity.
DATA upd_struc TYPE STRUCTURE FOR UPDATE root_entity.

" Response types
DATA mapped TYPE RESPONSE FOR MAPPED root_entity.
DATA failed TYPE RESPONSE FOR FAILED root_entity.
DATA reported TYPE RESPONSE FOR REPORTED root_entity.
```

### Special Components (%...)

**%cid and %cid_ref:**
```abap
" Content ID for preliminary identification
cr_tab = VALUE #( ( %cid = 'cid1' key_field = 1 field1 = 'A' ) ).

" Reference to existing instance's %cid
upd_tab = VALUE #( ( %cid_ref = 'cid1' field1 = 'Updated' ) ).
```

**%key and %tky:**
```abap
" %key: Primary keys only
" %tky: Primary keys + draft indicator (recommended)
del_tab = VALUE #( ( %tky = VALUE #( key_field = 1 ) ) ).
```

**%control:**
```abap
" Indicate which fields are provided
upd_tab = VALUE #( (
  key_field = 1
  field1 = 'New'
  %control = VALUE #(
    key_field = if_abap_behv=>mk-off
    field1 = if_abap_behv=>mk-on
    field2 = if_abap_behv=>mk-off ) ) ).
```

**%data:**
```abap
" Contains all key and data fields
cr_tab = VALUE #( (
  %cid = 'cid1'
  %data = VALUE #(
    key_field = 1
    field1 = 'A'
    field2 = 'B' ) ) ).
```

---

## EML CREATE Operations

### Short Form

```abap
DATA cr_tab TYPE TABLE FOR CREATE root_entity.
DATA mapped TYPE RESPONSE FOR MAPPED root_entity.
DATA failed TYPE RESPONSE FOR FAILED root_entity.
DATA reported TYPE RESPONSE FOR REPORTED root_entity.

cr_tab = VALUE #(
  ( %cid = 'cid1' key_field = 1 field1 = 'A' field2 = 'B' )
  ( %cid = 'cid2' key_field = 2 field1 = 'C' field2 = 'D' ) ).

MODIFY ENTITY root_entity
  CREATE
  FIELDS ( key_field field1 field2 ) WITH cr_tab
  MAPPED mapped
  FAILED failed
  REPORTED reported.
```

### Long Form

```abap
MODIFY ENTITIES OF root_entity
  ENTITY root
  CREATE FROM VALUE #( (
    %cid = 'cid1'
    key_field = 1
    field1 = 'A'
    field2 = 'B'
    %control = VALUE #(
      key_field = if_abap_behv=>mk-on
      field1 = if_abap_behv=>mk-on
      field2 = if_abap_behv=>mk-on ) ) )
  MAPPED DATA(m)
  FAILED DATA(f)
  REPORTED DATA(r).
```

### AUTO FILL CID

```abap
MODIFY ENTITIES OF root_entity
  ENTITY root
  CREATE AUTO FILL CID WITH VALUE #( (
    key_field = 1
    field1 = 'A'
    %control = VALUE #(
      key_field = if_abap_behv=>mk-on
      field1 = if_abap_behv=>mk-on ) ) )
  MAPPED DATA(m)
  FAILED DATA(f)
  REPORTED DATA(r).
```

---

## EML UPDATE Operations

### Short Form

```abap
DATA upd_tab TYPE TABLE FOR UPDATE root_entity.

upd_tab = VALUE #(
  ( key_field = 1 field1 = 'Updated1' )
  ( key_field = 2 field1 = 'Updated2' ) ).

MODIFY ENTITY root_entity
  UPDATE
  FIELDS ( field1 ) WITH upd_tab
  FAILED DATA(f)
  REPORTED DATA(r).
```

### Long Form with %control

```abap
MODIFY ENTITIES OF root_entity
  ENTITY root
  UPDATE FROM VALUE #( (
    key_field = 1
    field1 = 'New'
    field2 = 'Also New'
    %control = VALUE #(
      key_field = if_abap_behv=>mk-off  " Don't touch key
      field1 = if_abap_behv=>mk-on       " Update this
      field2 = if_abap_behv=>mk-on ) ) ) " Update this
  FAILED DATA(f)
  REPORTED DATA(r).
```

---

## EML DELETE Operations

```abap
DATA del_tab TYPE TABLE FOR DELETE root_entity.

del_tab = VALUE #(
  ( key_field = 1 )
  ( key_field = 2 ) ).

MODIFY ENTITY root_entity
  DELETE FROM del_tab
  FAILED DATA(f)
  REPORTED DATA(r).
```

---

## EML READ Operations

### Basic Read

```abap
DATA read_input TYPE TABLE FOR READ IMPORT root_entity.
DATA read_result TYPE TABLE FOR READ RESULT root_entity.

read_input = VALUE #( ( key_field = 1 ) ( key_field = 2 ) ).

READ ENTITY root_entity
  FROM read_input
  RESULT read_result
  FAILED DATA(f)
  REPORTED DATA(r).
```

### With Field Selection

```abap
READ ENTITY root_entity
  FIELDS ( field1 field2 ) WITH read_input
  RESULT read_result
  FAILED DATA(f)
  REPORTED DATA(r).

" All fields
READ ENTITY root_entity
  ALL FIELDS WITH read_input
  RESULT read_result.
```

### Read-by-Association

```abap
READ ENTITIES OF root_entity
  ENTITY root
  BY \_child
  FROM VALUE #( ( key_field = 1 ) )
  RESULT DATA(children)
  FAILED DATA(f)
  REPORTED DATA(r).
```

---

## Deep Create (Parent + Child)

```abap
MODIFY ENTITIES OF root_entity
  ENTITY root
  CREATE FIELDS ( key_field field1 )
  WITH VALUE #( (
    %cid = 'cid_root'
    key_field = 1
    field1 = 'Parent' ) )

  CREATE BY \_child
  FIELDS ( child_key child_field )
  WITH VALUE #( (
    %cid_ref = 'cid_root'
    %target = VALUE #(
      ( %cid = 'cid_child1'
        child_key = 10
        child_field = 'Child 1' )
      ( %cid = 'cid_child2'
        child_key = 20
        child_field = 'Child 2' ) ) ) )

  MAPPED DATA(mapped)
  FAILED DATA(failed)
  REPORTED DATA(reported).
```

---

## Action Execution

```abap
MODIFY ENTITY root_entity
  EXECUTE some_action
  FROM VALUE #( ( key_field = 1 ) )
  RESULT DATA(action_result)
  FAILED DATA(f)
  REPORTED DATA(r).
```

---

## COMMIT and ROLLBACK

```abap
" Persist changes
COMMIT ENTITIES
  RESPONSE OF root_entity
  MAPPED DATA(mapped)
  FAILED DATA(failed)
  REPORTED DATA(reported).

" Discard changes
ROLLBACK ENTITIES.
```

---

## IN LOCAL MODE

```abap
" Bypass access restrictions within ABP
MODIFY ENTITY root_entity IN LOCAL MODE
  CREATE FROM cr_tab
  MAPPED DATA(m)
  FAILED DATA(f)
  REPORTED DATA(r).

READ ENTITY root_entity IN LOCAL MODE
  FROM read_input
  RESULT DATA(result).
```

---

## Constants Reference

| Type | Constant | Purpose |
|------|----------|---------|
| `ABP_BEHV_FLAG` | `IF_ABAP_BEHV=>MK` | Mark/unmark fields in %control |
| `ABP_BEHV_FIELD_PERM` | `IF_ABAP_BEHV=>PERM-F` | Field permission results |
| `ABP_BEHV_OP_PERM` | `IF_ABAP_BEHV=>PERM-O` | Operation permission results |
| `ABP_BEHV_AUTH` | `IF_ABAP_BEHV=>AUTH` | Authorization results |
| `IF_ABAP_BEHV=>T_CHAR01` | `IF_ABAP_BEHV=>OP` | Dynamic EML operations |

---

## RAP Response Parameters

```abap
" MAPPED - Key mapping for created instances
mapped-root = VALUE #( ( %cid = 'cid1' key_field = 1 ) ).

" FAILED - Failed instances
failed-root = VALUE #( ( %cid = 'cid1' %fail-cause = if_abap_behv=>cause-unspecific ) ).

" REPORTED - Messages
reported-root = VALUE #( (
  %tky = VALUE #( key_field = 1 )
  %msg = new_message_with_text(
    severity = if_abap_behv_message=>severity-error
    text = 'Validation failed!' ) ) ).
```

---

## Testing RAP with ABAP Unit

```abap
" Create test environment
DATA(test_env) = cl_botd_txbufdbl_bo_test_env=>create(
  src_bindings = VALUE #( ( 'ZDEMO_RAP_ROOT' ) ) ).

" Or mock EML APIs
DATA(mock_env) = cl_botd_mockemlapi_bo_test_env=>create(
  environment = VALUE #( ( 'ZDEMO_RAP_ROOT' ) ) ).
```
