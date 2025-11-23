# OO Design Patterns - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/34_OO_Design_Patterns.md

---

## Factory Method Pattern

Creates objects through a factory method instead of direct instantiation.

### Interface Definition

```abap
INTERFACE lif_hello.
  TYPES enum_langu TYPE i.
  CONSTANTS: en TYPE enum_langu VALUE 1,
             fr TYPE enum_langu VALUE 2.
  METHODS say_hello RETURNING VALUE(hi) TYPE string.
ENDINTERFACE.
```

### Concrete Implementations

```abap
CLASS lcl_en DEFINITION FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES lif_hello.
ENDCLASS.

CLASS lcl_en IMPLEMENTATION.
  METHOD lif_hello~say_hello.
    hi = `Hi`.
  ENDMETHOD.
ENDCLASS.

CLASS lcl_fr DEFINITION FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES lif_hello.
ENDCLASS.

CLASS lcl_fr IMPLEMENTATION.
  METHOD lif_hello~say_hello.
    hi = `Bonjour`.
  ENDMETHOD.
ENDCLASS.
```

### Factory Class

```abap
CLASS lcl_hello_factory DEFINITION FINAL CREATE PRIVATE.
  PUBLIC SECTION.
    CLASS-METHODS create_hello
      IMPORTING language TYPE lif_hello=>enum_langu
      RETURNING VALUE(hello) TYPE REF TO lif_hello.
ENDCLASS.

CLASS lcl_hello_factory IMPLEMENTATION.
  METHOD create_hello.
    hello = SWITCH #( language
      WHEN lif_hello=>en THEN NEW lcl_en( )
      WHEN lif_hello=>fr THEN NEW lcl_fr( )
      ELSE NEW lcl_en( ) ).
  ENDMETHOD.
ENDCLASS.
```

### Usage

```abap
DATA(oref_en) = lcl_hello_factory=>create_hello( lif_hello=>en ).
DATA(hello_en) = oref_en->say_hello( ).  " 'Hi'

DATA(oref_fr) = lcl_hello_factory=>create_hello( lif_hello=>fr ).
DATA(hello_fr) = oref_fr->say_hello( ).  " 'Bonjour'
```

---

## Singleton Pattern

Ensures only one instance of a class exists.

```abap
CLASS zcl_singleton DEFINITION
  PUBLIC FINAL CREATE PRIVATE.

  PUBLIC SECTION.
    CLASS-METHODS get_instance
      RETURNING VALUE(ro_instance) TYPE REF TO zcl_singleton.

    METHODS do_something.

  PRIVATE SECTION.
    CLASS-DATA go_instance TYPE REF TO zcl_singleton.
    DATA mv_data TYPE string.

ENDCLASS.

CLASS zcl_singleton IMPLEMENTATION.

  METHOD get_instance.
    IF go_instance IS NOT BOUND.
      go_instance = NEW #( ).
    ENDIF.
    ro_instance = go_instance.
  ENDMETHOD.

  METHOD do_something.
    " Implementation
  ENDMETHOD.

ENDCLASS.
```

### Usage

```abap
DATA(singleton1) = zcl_singleton=>get_instance( ).
DATA(singleton2) = zcl_singleton=>get_instance( ).
" singleton1 and singleton2 reference the same instance
```

---

## Strategy Pattern

Encapsulates interchangeable algorithms.

### Strategy Interface

```abap
INTERFACE lif_sort_strategy.
  METHODS sort
    CHANGING ct_data TYPE STANDARD TABLE.
ENDINTERFACE.
```

### Concrete Strategies

```abap
CLASS lcl_bubble_sort DEFINITION.
  PUBLIC SECTION.
    INTERFACES lif_sort_strategy.
ENDCLASS.

CLASS lcl_bubble_sort IMPLEMENTATION.
  METHOD lif_sort_strategy~sort.
    " Bubble sort implementation
  ENDMETHOD.
ENDCLASS.

CLASS lcl_quick_sort DEFINITION.
  PUBLIC SECTION.
    INTERFACES lif_sort_strategy.
ENDCLASS.

CLASS lcl_quick_sort IMPLEMENTATION.
  METHOD lif_sort_strategy~sort.
    " Quick sort implementation
  ENDMETHOD.
ENDCLASS.
```

### Context Class

```abap
CLASS lcl_sorter DEFINITION.
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING io_strategy TYPE REF TO lif_sort_strategy.

    METHODS set_strategy
      IMPORTING io_strategy TYPE REF TO lif_sort_strategy.

    METHODS execute_sort
      CHANGING ct_data TYPE STANDARD TABLE.

  PRIVATE SECTION.
    DATA mo_strategy TYPE REF TO lif_sort_strategy.
ENDCLASS.

CLASS lcl_sorter IMPLEMENTATION.
  METHOD constructor.
    mo_strategy = io_strategy.
  ENDMETHOD.

  METHOD set_strategy.
    mo_strategy = io_strategy.
  ENDMETHOD.

  METHOD execute_sort.
    mo_strategy->sort( CHANGING ct_data = ct_data ).
  ENDMETHOD.
ENDCLASS.
```

### Usage

```abap
DATA(sorter) = NEW lcl_sorter( NEW lcl_bubble_sort( ) ).
sorter->execute_sort( CHANGING ct_data = my_table ).

" Switch strategy at runtime
sorter->set_strategy( NEW lcl_quick_sort( ) ).
sorter->execute_sort( CHANGING ct_data = my_table ).
```

---

## Template Method Pattern

Defines algorithm skeleton, subclasses customize steps.

### Abstract Base Class

```abap
CLASS lcl_data_processor DEFINITION ABSTRACT.
  PUBLIC SECTION.
    METHODS process FINAL.  " Template method

  PROTECTED SECTION.
    METHODS: load_data ABSTRACT,
             validate_data ABSTRACT,
             transform_data ABSTRACT,
             save_data ABSTRACT.
ENDCLASS.

CLASS lcl_data_processor IMPLEMENTATION.
  METHOD process.
    " Template method defines the algorithm structure
    load_data( ).
    validate_data( ).
    transform_data( ).
    save_data( ).
  ENDMETHOD.
ENDCLASS.
```

### Concrete Implementation

```abap
CLASS lcl_csv_processor DEFINITION
  INHERITING FROM lcl_data_processor.

  PROTECTED SECTION.
    METHODS: load_data REDEFINITION,
             validate_data REDEFINITION,
             transform_data REDEFINITION,
             save_data REDEFINITION.
ENDCLASS.

CLASS lcl_csv_processor IMPLEMENTATION.
  METHOD load_data.
    " Load CSV-specific data
  ENDMETHOD.

  METHOD validate_data.
    " CSV-specific validation
  ENDMETHOD.

  METHOD transform_data.
    " CSV-specific transformation
  ENDMETHOD.

  METHOD save_data.
    " CSV-specific save
  ENDMETHOD.
ENDCLASS.
```

---

## Pattern Comparison

| Pattern | Purpose | Key Mechanism |
|---------|---------|---------------|
| **Factory Method** | Object creation abstraction | Factory method returns interface |
| **Singleton** | Single instance guarantee | Private constructor, static accessor |
| **Strategy** | Interchangeable algorithms | Runtime strategy selection |
| **Template Method** | Algorithm skeleton | Abstract methods for steps |

---

## Best Practices

1. **Factory Method**: Use for complex object creation, multiple implementations
2. **Singleton**: Use sparingly, consider dependency injection
3. **Strategy**: Prefer over switch/case for behavior selection
4. **Template Method**: Use for algorithms with variable steps
5. **Program to interfaces** for flexibility
6. **Favor composition** over inheritance where appropriate
