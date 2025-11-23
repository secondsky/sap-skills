# SAP Logical Unit of Work (LUW) - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/17_SAP_LUW.md

---

## Overview

SAP LUW ensures transactional consistency through all-or-nothing commits: either all changes commit together or all rollback.

---

## COMMIT and ROLLBACK

### COMMIT WORK

```abap
COMMIT WORK.              " Asynchronous - returns immediately
COMMIT WORK AND WAIT.     " Synchronous - waits for completion
```

Effects:
- Closes current SAP LUW, opens new one
- Commits all change requests
- Processes registered update function modules
- Triggers database commit

### ROLLBACK WORK

```abap
ROLLBACK WORK.
```

Effects:
- Closes current SAP LUW, opens new one
- Undoes all changes within current SAP LUW
- Removes previous registrations
- Triggers database rollback

---

## Update Function Modules

### Calling Update Functions

```abap
" Asynchronous (default)
CALL FUNCTION 'Z_UPDATE_FUNC' IN UPDATE TASK
  EXPORTING values = data.

COMMIT WORK.  " Returns immediately

" Synchronous
CALL FUNCTION 'Z_UPDATE_FUNC' IN UPDATE TASK
  EXPORTING values = data.

COMMIT WORK AND WAIT.  " Waits for completion

" Local update
SET UPDATE TASK LOCAL.

CALL FUNCTION 'Z_UPDATE_FUNC' IN UPDATE TASK
  EXPORTING values = data.

COMMIT WORK.  " Executes immediately in current work process
```

### Update Function Implementation

```abap
FUNCTION z_update_func
  IMPORTING
    VALUE(values) TYPE some_dbtab.

  MODIFY some_dbtab FROM @values.

ENDFUNCTION.
```

---

## Background RFC (bgRFC)

```abap
CALL FUNCTION 'Z_REMOTE_FUNC' IN BACKGROUND UNIT
  EXPORTING param1 = value1.
```

Enables asynchronous execution in same or different ABAP systems.

---

## Subroutines (Deprecated)

```abap
" Register for commit
PERFORM some_subroutine ON COMMIT.

" Register for rollback
PERFORM some_subroutine ON ROLLBACK.

" Data transfer via ABAP memory
EXPORT data_var TO MEMORY ID 'KEY'.
IMPORT data_var FROM MEMORY ID 'KEY'.
```

---

## Implicit Database Commits

Triggered automatically by:
- Dialog step completion (dynpro PAI/PBO)
- Synchronous/asynchronous RFC calls
- HTTP/HTTPS/SMTP communication
- WAIT statements
- Sending messages (error, information, warning)

---

## ABAP Cloud Behavior

```abap
" Both behave identically in ABAP Cloud
COMMIT WORK.
COMMIT WORK AND WAIT.
```

In ABAP Cloud:
- Local updates always enforced implicitly
- Updates occur in same work process
- Always synchronous

---

## RAP Integration

```abap
" RAP-specific commit
COMMIT ENTITIES.        " Implicitly triggers COMMIT WORK

" RAP-specific rollback
ROLLBACK ENTITIES.      " Resets all changes
```

---

## Controlled SAP LUW

Enhanced transactional phase management:

```abap
" Activate modify phase
cl_abap_tx=>modify( ).

" Database modifications NOT allowed here
" Would throw BEHAVIOR_ILLEGAL_STMT_IN_CALL

" Activate save phase
cl_abap_tx=>save( ).

" Database modifications allowed here
MODIFY zdemo_table FROM TABLE @itab.
```

---

## Transactional Phases

| Phase | Database Modifications |
|-------|----------------------|
| Modify | Not allowed |
| Save | Allowed |

---

## Lock Objects

```abap
" Enqueue (lock)
CALL FUNCTION 'ENQUEUE_EZLOCK'
  EXPORTING
    mode_table = 'E'
    key = value
  EXCEPTIONS
    foreign_lock = 1.

" Dequeue (unlock)
CALL FUNCTION 'DEQUEUE_EZLOCK'
  EXPORTING
    mode_table = 'E'
    key = value.
```

---

## Best Practices

1. **Use COMMIT WORK AND WAIT** when immediate confirmation needed
2. **Avoid implicit commits** in transaction-critical code
3. **Use RAP** for modern transactional scenarios
4. **Bundle modifications** for consistency
5. **Handle locks** appropriately
6. **Test rollback scenarios** thoroughly
