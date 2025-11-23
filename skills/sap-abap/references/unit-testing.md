# ABAP Unit Testing - Complete Reference

**Source**: https://github.com/SAP-samples/abap-cheat-sheets/blob/main/14_ABAP_Unit_Tests.md

---

## Test Class Structure

```abap
CLASS ltc_test_class DEFINITION
  FOR TESTING
  RISK LEVEL HARMLESS
  DURATION SHORT.

  PRIVATE SECTION.
    DATA cut TYPE REF TO zcl_class_under_test.  " Class Under Test

    CLASS-METHODS class_setup.
    CLASS-METHODS class_teardown.
    METHODS setup.
    METHODS teardown.

    METHODS test_method_1 FOR TESTING.
    METHODS test_method_2 FOR TESTING.

ENDCLASS.

CLASS ltc_test_class IMPLEMENTATION.

  METHOD class_setup.
    " Run once before all tests
  ENDMETHOD.

  METHOD class_teardown.
    " Run once after all tests
  ENDMETHOD.

  METHOD setup.
    " Run before each test
    cut = NEW #( ).
  ENDMETHOD.

  METHOD teardown.
    " Run after each test
    CLEAR cut.
  ENDMETHOD.

  METHOD test_method_1.
    " Given
    DATA(input) = 5.

    " When
    DATA(result) = cut->multiply_by_two( input ).

    " Then
    cl_abap_unit_assert=>assert_equals(
      act = result
      exp = 10 ).
  ENDMETHOD.

ENDCLASS.
```

---

## Risk Level and Duration

### Risk Levels

```abap
RISK LEVEL HARMLESS    " No system changes (default)
RISK LEVEL CRITICAL    " Changes system settings
RISK LEVEL DANGEROUS   " Changes persistent data
```

### Duration

```abap
DURATION SHORT         " Seconds (default)
DURATION MEDIUM        " About 1 minute
DURATION LONG          " More than 1 minute
```

---

## Fixture Methods

| Method | Type | Execution |
|--------|------|-----------|
| `class_setup` | Static | Once before all tests |
| `setup` | Instance | Before each test |
| `teardown` | Instance | After each test |
| `class_teardown` | Static | Once after all tests |

---

## Assertions (CL_ABAP_UNIT_ASSERT)

### Equality and Comparison

```abap
" Verify equality
cl_abap_unit_assert=>assert_equals(
  act = actual_value
  exp = expected_value
  msg = 'Values should be equal' ).

" Verify difference
cl_abap_unit_assert=>assert_differs(
  act = value1
  exp = value2 ).

" Verify number in range
cl_abap_unit_assert=>assert_number_between(
  lower  = 1
  upper  = 10
  number = actual_number ).
```

### Boolean Assertions

```abap
" True condition
cl_abap_unit_assert=>assert_true(
  act = condition
  msg = 'Condition should be true' ).

" False condition
cl_abap_unit_assert=>assert_false(
  act = condition ).
```

### Reference Assertions

```abap
" Reference is bound
cl_abap_unit_assert=>assert_bound(
  act = ref ).

" Reference is not bound
cl_abap_unit_assert=>assert_not_bound(
  act = ref ).
```

### Initial Value Assertions

```abap
" Value is initial
cl_abap_unit_assert=>assert_initial(
  act = data_object ).

" Value is not initial
cl_abap_unit_assert=>assert_not_initial(
  act = data_object ).
```

### System Field Assertions

```abap
" Check sy-subrc
cl_abap_unit_assert=>assert_subrc(
  exp = 0
  msg = 'Operation should succeed' ).

" Check return code
cl_abap_unit_assert=>assert_return_code(
  exp = 0
  act = return_code ).
```

### Table Assertions

```abap
" Line exists in table
cl_abap_unit_assert=>assert_table_contains(
  line  = expected_line
  table = itab ).

" Line does not exist
cl_abap_unit_assert=>assert_table_not_contains(
  line  = line_to_check
  table = itab ).
```

### String Assertions

```abap
" Pattern matching
cl_abap_unit_assert=>assert_char_cp(
  act = text
  exp = '*error*' ).  " Contains 'error'

" No pattern match
cl_abap_unit_assert=>assert_char_np(
  act = text
  exp = '*error*' ).

" Regex matching
cl_abap_unit_assert=>assert_text_matches(
  text    = actual_text
  pattern = '\d{3}-\d{4}' ).

" No regex match
cl_abap_unit_assert=>assert_text_not_matches(
  text    = actual_text
  pattern = 'error' ).
```

### Manual Control

```abap
" Force test failure
cl_abap_unit_assert=>fail(
  msg = 'This should not happen' ).

" Skip test
cl_abap_unit_assert=>skip(
  msg = 'Prerequisites not met' ).
```

### Common Parameters

- `act`: Actual value to verify
- `exp`: Expected value
- `msg`: Error message (optional)
- `quit`: Control test flow (use `if_abap_unit_constant=>quit-no` to continue)

---

## Test Class Friendship

```abap
" Allow test class to access private methods
CLASS zcl_production_class DEFINITION LOCAL FRIENDS ltc_test_class.

" Multiple test classes
CLASS ltc_test_1 DEFINITION DEFERRED.
CLASS ltc_test_2 DEFINITION DEFERRED.
CLASS zcl_production_class DEFINITION LOCAL FRIENDS ltc_test_1 ltc_test_2.
```

---

## Partial Interface Implementation

```abap
CLASS ltd_test_double DEFINITION FOR TESTING.
  PUBLIC SECTION.
    INTERFACES zif_some_interface PARTIALLY IMPLEMENTED.
ENDCLASS.

CLASS ltd_test_double IMPLEMENTATION.
  METHOD zif_some_interface~needed_method.
    " Only implement what's needed for test
  ENDMETHOD.
ENDCLASS.
```

---

## Test Doubles

### Manual Test Double (Interface-based)

```abap
" Test double class
CLASS ltd_database_access DEFINITION FOR TESTING.
  PUBLIC SECTION.
    INTERFACES zif_database_access.
    DATA returned_data TYPE zdemo_table.
ENDCLASS.

CLASS ltd_database_access IMPLEMENTATION.
  METHOD zif_database_access~get_data.
    result = me->returned_data.  " Return configured data
  ENDMETHOD.
ENDCLASS.

" Usage in test
METHOD test_with_double.
  " Given
  DATA(double) = NEW ltd_database_access( ).
  double->returned_data = VALUE #( ( id = 1 name = 'Test' ) ).

  cut = NEW zcl_processor( database = double ).

  " When
  DATA(result) = cut->process( ).

  " Then
  cl_abap_unit_assert=>assert_equals( act = result exp = 'Test' ).
ENDMETHOD.
```

### Injection Techniques

**Constructor Injection:**
```abap
" Production class
CLASS zcl_processor DEFINITION.
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING database TYPE REF TO zif_database_access.
ENDCLASS.

" In test
cut = NEW zcl_processor( database = test_double ).
```

**Setter Injection:**
```abap
cut->set_database( test_double ).
```

**Back Door Injection (via friendship):**
```abap
" With LOCAL FRIENDS declaration
cut->mo_database = test_double.
```

---

## Test Seams

### Production Code

```abap
METHOD do_something.
  DATA result TYPE string.

  TEST-SEAM database_access.
    SELECT * FROM dbtab INTO TABLE @DATA(data).
    result = process( data ).
  END-TEST-SEAM.

  RETURN result.
ENDMETHOD.
```

### Test Code

```abap
METHOD test_do_something.
  " Inject test data
  TEST-INJECTION database_access.
    data = VALUE #( ( id = 1 name = 'Test' ) ).
    result = 'processed'.
  END-TEST-INJECTION.

  " When
  DATA(actual) = cut->do_something( ).

  " Then
  cl_abap_unit_assert=>assert_equals( act = actual exp = 'processed' ).
ENDMETHOD.
```

---

## ABAP OO Test Double Framework

```abap
" Create test double for class
DATA(double) = CAST zif_my_interface(
  cl_abap_testdouble=>create( 'ZIF_MY_INTERFACE' ) ).

" Configure method behavior
cl_abap_testdouble=>configure_call( double
  )->returning( value = 'mocked result'
  )->and_expect( )->is_called_once( ).

" Set input expectations
cl_abap_testdouble=>configure_call( double
  )->for_method( 'GET_DATA'
  )->with_parameters(
       VALUE #( ( name = 'ID' value = 1 ) )
  )->returning( VALUE #( ( id = 1 name = 'Test' ) ) ).

" Verify interactions
cl_abap_testdouble=>verify_expectations( double ).
```

---

## SQL Test Double Framework

```abap
CLASS ltc_sql_test DEFINITION FOR TESTING
  RISK LEVEL HARMLESS DURATION SHORT.

  PRIVATE SECTION.
    CLASS-DATA sql_env TYPE REF TO if_osql_test_environment.

    CLASS-METHODS class_setup.
    CLASS-METHODS class_teardown.

    METHODS test_select FOR TESTING.
ENDCLASS.

CLASS ltc_sql_test IMPLEMENTATION.

  METHOD class_setup.
    sql_env = cl_osql_test_environment=>create(
      VALUE #( ( 'ZDEMO_TABLE' ) ) ).
  ENDMETHOD.

  METHOD class_teardown.
    sql_env->destroy( ).
  ENDMETHOD.

  METHOD test_select.
    " Insert test data
    sql_env->insert_test_data(
      VALUE zdemo_table( ( id = 1 name = 'Test' ) ) ).

    " Execute code under test
    DATA(result) = cut->read_data( ).

    " Assert
    cl_abap_unit_assert=>assert_equals(
      act = lines( result )
      exp = 1 ).

    " Clear for next test
    sql_env->clear_doubles( ).
  ENDMETHOD.

ENDCLASS.
```

---

## CDS Test Double Framework

```abap
CLASS ltc_cds_test DEFINITION FOR TESTING
  RISK LEVEL HARMLESS DURATION SHORT.

  PRIVATE SECTION.
    CLASS-DATA cds_env TYPE REF TO if_cds_test_environment.

    CLASS-METHODS class_setup.
    CLASS-METHODS class_teardown.
ENDCLASS.

CLASS ltc_cds_test IMPLEMENTATION.

  METHOD class_setup.
    cds_env = cl_cds_test_environment=>create( 'ZDEMO_CDS_VIEW' ).
  ENDMETHOD.

  METHOD class_teardown.
    cds_env->destroy( ).
  ENDMETHOD.

ENDCLASS.
```

---

## RAP BO Test Double Framework

```abap
" Transactional buffer double
DATA(test_env) = cl_botd_txbufdbl_bo_test_env=>create(
  src_bindings = VALUE #( ( 'ZDEMO_RAP_ROOT' ) ) ).

" Mock EML APIs
DATA(mock_env) = cl_botd_mockemlapi_bo_test_env=>create(
  environment = VALUE #( ( 'ZDEMO_RAP_ROOT' ) ) ).
```

---

## Test Documentation

```abap
"! @testing zcl_class_under_test
CLASS ltc_test_class DEFINITION FOR TESTING.
  ...
ENDCLASS.
```

---

## Running Tests

**In ADT:**
- All class tests: `Ctrl + Shift + F10`
- With coverage: `Ctrl + Shift + F11`
- Right-click → Run as → ABAP Unit Test

**ATC Integration:**
- Tests run as part of ABAP Test Cockpit
- Configure in ATC check variant

---

## Best Practices

1. **One assertion per test** when possible
2. **Use Given-When-Then** structure
3. **Name tests descriptively** (test_calculate_returns_sum_of_inputs)
4. **Keep tests independent** - no shared state between tests
5. **Use setup/teardown** for common initialization
6. **Prefer constructor injection** for dependencies
7. **Test public interface** - avoid testing private methods directly
8. **Use appropriate risk level** to enable test execution
