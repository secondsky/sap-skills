# ABAP Object Orientation - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/04_ABAP_Object_Orientation.md

---

## Class Definition

### Basic Structure

```abap
CLASS zcl_my_class DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    " Visible to all
    TYPES: ty_data TYPE string.
    CONSTANTS: c_max TYPE i VALUE 100.
    DATA: mv_public TYPE string.

    METHODS:
      constructor IMPORTING iv_name TYPE string,
      get_name RETURNING VALUE(rv_name) TYPE string,
      process IMPORTING iv_input TYPE string
              EXPORTING ev_output TYPE string
              CHANGING cv_data TYPE string
              RAISING zcx_my_exception.

    CLASS-METHODS:
      factory RETURNING VALUE(ro_instance) TYPE REF TO zcl_my_class.

  PROTECTED SECTION.
    " Visible to class and subclasses
    DATA: mv_protected TYPE string.
    METHODS: internal_process.

  PRIVATE SECTION.
    " Visible only within class
    DATA: mv_private TYPE string.
    METHODS: helper_method.

ENDCLASS.
```

### Class Implementation

```abap
CLASS zcl_my_class IMPLEMENTATION.

  METHOD constructor.
    mv_private = iv_name.
  ENDMETHOD.

  METHOD get_name.
    rv_name = mv_private.
  ENDMETHOD.

  METHOD process.
    " Implementation
  ENDMETHOD.

  METHOD factory.
    ro_instance = NEW #( 'Default' ).
  ENDMETHOD.

  METHOD internal_process.
    " Protected method
  ENDMETHOD.

  METHOD helper_method.
    " Private method
  ENDMETHOD.

ENDCLASS.
```

---

## Visibility Modifiers

| Modifier | Class | Subclass | External |
|----------|-------|----------|----------|
| PUBLIC | Yes | Yes | Yes |
| PROTECTED | Yes | Yes | No |
| PRIVATE | Yes | No | No |

---

## CREATE Additions

```abap
CREATE PUBLIC     " Can be instantiated anywhere
CREATE PROTECTED  " Only within class and subclasses
CREATE PRIVATE    " Only within the class itself
```

---

## Class Types

```abap
" Final class - cannot be inherited
CLASS zcl_final DEFINITION FINAL.

" Abstract class - cannot be instantiated
CLASS zcl_abstract DEFINITION ABSTRACT.

" Abstract method
CLASS zcl_abstract DEFINITION ABSTRACT.
  PUBLIC SECTION.
    METHODS process ABSTRACT.
ENDCLASS.
```

---

## Object Instantiation

```abap
" CREATE OBJECT
DATA oref TYPE REF TO zcl_my_class.
CREATE OBJECT oref EXPORTING iv_name = 'Test'.

" NEW operator (preferred)
DATA(oref) = NEW zcl_my_class( iv_name = 'Test' ).

" Inline with method call
DATA(result) = NEW zcl_processor( )->process( input ).

" Factory method
DATA(instance) = zcl_my_class=>factory( ).
```

---

## Method Signatures

### Parameter Types

```abap
METHODS process
  IMPORTING iv_input TYPE string        " Input (read-only)
  EXPORTING ev_output TYPE string       " Output (cleared first)
  CHANGING cv_data TYPE string          " Input/Output
  RETURNING VALUE(rv_result) TYPE string " Functional return
  RAISING zcx_my_exception.             " Exceptions
```

### Optional Parameters

```abap
METHODS process
  IMPORTING
    iv_required TYPE string
    iv_optional TYPE string OPTIONAL    " Can be omitted
    iv_default TYPE i DEFAULT 10.       " Has default value
```

### PREFERRED PARAMETER

```abap
METHODS process
  IMPORTING
    iv_first TYPE string
    iv_second TYPE string
  PREFERRED PARAMETER iv_first.

" Call without parameter name
oref->process( 'value' ).  " Goes to iv_first
```

---

## Method Calls

```abap
" Full syntax
oref->method(
  EXPORTING iv_input = value
  IMPORTING ev_output = result
  CHANGING cv_data = data ).

" Functional style (for RETURNING methods)
DATA(result) = oref->get_value( ).

" Chaining
DATA(text) = oref->get_processor( )->process( input )->get_result( ).

" Static method
DATA(instance) = zcl_factory=>create( ).
zcl_utility=>helper_method( ).
```

---

## Inheritance

### Subclass Definition

```abap
CLASS zcl_child DEFINITION
  INHERITING FROM zcl_parent
  PUBLIC FINAL CREATE PUBLIC.

  PUBLIC SECTION.
    METHODS constructor
      IMPORTING iv_name TYPE string.

    " Override parent method
    METHODS process REDEFINITION.

    " New method in child
    METHODS additional_method.

ENDCLASS.

CLASS zcl_child IMPLEMENTATION.

  METHOD constructor.
    super->constructor( iv_name ).
    " Additional initialization
  ENDMETHOD.

  METHOD process.
    " Call parent implementation if needed
    super->process( ).
    " Child-specific logic
  ENDMETHOD.

ENDCLASS.
```

### Abstract Classes

```abap
CLASS zcl_abstract_base DEFINITION ABSTRACT.
  PUBLIC SECTION.
    METHODS:
      concrete_method,
      abstract_method ABSTRACT.
ENDCLASS.

CLASS zcl_concrete DEFINITION
  INHERITING FROM zcl_abstract_base
  FINAL.
  PUBLIC SECTION.
    METHODS abstract_method REDEFINITION.
ENDCLASS.
```

---

## Interfaces

### Interface Definition

```abap
INTERFACE zif_my_interface PUBLIC.
  TYPES: ty_data TYPE string.
  CONSTANTS: c_version TYPE i VALUE 1.
  DATA: mv_value TYPE string.

  METHODS:
    process IMPORTING iv_input TYPE string
            RETURNING VALUE(rv_result) TYPE string,
    get_status RETURNING VALUE(rv_status) TYPE string.

  CLASS-METHODS:
    factory RETURNING VALUE(ro_instance) TYPE REF TO zif_my_interface.

ENDINTERFACE.
```

### Interface Implementation

```abap
CLASS zcl_impl DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES zif_my_interface.

    " Alias for convenience
    ALIASES process FOR zif_my_interface~process.
    ALIASES get_status FOR zif_my_interface~get_status.

ENDCLASS.

CLASS zcl_impl IMPLEMENTATION.

  METHOD zif_my_interface~process.
    rv_result = |Processed: { iv_input }|.
  ENDMETHOD.

  METHOD zif_my_interface~get_status.
    rv_status = 'Active'.
  ENDMETHOD.

ENDCLASS.
```

### Interface Reference

```abap
" Reference via interface
DATA intf TYPE REF TO zif_my_interface.
intf = NEW zcl_impl( ).
DATA(result) = intf->process( 'input' ).

" Check interface implementation
IF oref IS INSTANCE OF zif_my_interface.
  DATA(intf) = CAST zif_my_interface( oref ).
ENDIF.
```

### Multiple Interfaces

```abap
CLASS zcl_multi DEFINITION.
  PUBLIC SECTION.
    INTERFACES: zif_interface_a,
                zif_interface_b.
ENDCLASS.
```

### Interface Inheritance

```abap
INTERFACE zif_extended PUBLIC.
  INTERFACES zif_base.
  " Additional methods
  METHODS extended_method.
ENDINTERFACE.
```

---

## Polymorphism

```abap
" Parent type reference
DATA parent TYPE REF TO zcl_parent.

" Can hold child instances
parent = NEW zcl_child_a( ).
parent->process( ).  " Calls zcl_child_a~process

parent = NEW zcl_child_b( ).
parent->process( ).  " Calls zcl_child_b~process

" Interface polymorphism
DATA processor TYPE REF TO zif_processor.
processor = NEW zcl_processor_a( ).
processor->process( ).

processor = NEW zcl_processor_b( ).
processor->process( ).
```

---

## Type Checking and Casting

```abap
" Check instance type
IF oref IS INSTANCE OF zcl_specific.
  " Is of type or subtype
ENDIF.

" Safe casting with CAST
TRY.
    DATA(specific) = CAST zcl_specific( general_ref ).
  CATCH cx_sy_move_cast_error.
    " Cast failed
ENDTRY.

" Casting to interface
DATA(intf) = CAST zif_my_interface( oref ).
```

---

## Events

### Event Definition

```abap
CLASS zcl_publisher DEFINITION.
  PUBLIC SECTION.
    EVENTS: data_changed
              EXPORTING VALUE(ev_old_value) TYPE string
                        VALUE(ev_new_value) TYPE string.

    METHODS set_data IMPORTING iv_data TYPE string.
ENDCLASS.

CLASS zcl_publisher IMPLEMENTATION.
  METHOD set_data.
    DATA(old) = mv_data.
    mv_data = iv_data.
    RAISE EVENT data_changed
      EXPORTING ev_old_value = old
                ev_new_value = iv_data.
  ENDMETHOD.
ENDCLASS.
```

### Event Handler

```abap
CLASS zcl_subscriber DEFINITION.
  PUBLIC SECTION.
    METHODS:
      register_for IMPORTING io_publisher TYPE REF TO zcl_publisher,
      on_data_changed FOR EVENT data_changed OF zcl_publisher
        IMPORTING ev_old_value ev_new_value sender.
ENDCLASS.

CLASS zcl_subscriber IMPLEMENTATION.
  METHOD register_for.
    SET HANDLER on_data_changed FOR io_publisher.
  ENDMETHOD.

  METHOD on_data_changed.
    " Handle event
  ENDMETHOD.
ENDCLASS.
```

### Event Registration

```abap
DATA(publisher) = NEW zcl_publisher( ).
DATA(subscriber) = NEW zcl_subscriber( ).

" Register handler
subscriber->register_for( publisher ).

" Trigger event
publisher->set_data( 'new value' ).
```

---

## Friendship

```abap
CLASS zcl_friend DEFINITION DEFERRED.

CLASS zcl_private_class DEFINITION
  FRIENDS zcl_friend.
  PRIVATE SECTION.
    DATA mv_secret TYPE string.
ENDCLASS.

CLASS zcl_friend DEFINITION.
  PUBLIC SECTION.
    METHODS access_secret
      IMPORTING io_private TYPE REF TO zcl_private_class
      RETURNING VALUE(rv_secret) TYPE string.
ENDCLASS.

CLASS zcl_friend IMPLEMENTATION.
  METHOD access_secret.
    " Can access private members
    rv_secret = io_private->mv_secret.
  ENDMETHOD.
ENDCLASS.
```

---

## Class-Based Exception Handling

```abap
CLASS zcx_my_exception DEFINITION
  INHERITING FROM cx_static_check
  PUBLIC FINAL CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_t100_message.

    METHODS constructor
      IMPORTING
        textid   LIKE if_t100_message=>t100key OPTIONAL
        previous LIKE previous OPTIONAL.

ENDCLASS.
```

---

## Best Practices

1. **Prefer composition over inheritance**
2. **Program to interfaces**, not implementations
3. **Keep classes focused** (Single Responsibility)
4. **Use factory methods** for complex instantiation
5. **Prefer FINAL** unless inheritance is needed
6. **Use PROTECTED** sparingly
7. **Document public interfaces**
8. **Use meaningful names** for classes and methods
