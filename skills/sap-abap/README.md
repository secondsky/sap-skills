# SAP ABAP Development Skill

Comprehensive ABAP development skill for SAP systems covering classic ABAP and modern ABAP Cloud development patterns.

## Skill Overview

This skill provides extensive knowledge for ABAP development including:

- **Internal Tables**: Standard, sorted, hashed tables; keys; operations; LOOP, READ, MODIFY
- **ABAP SQL**: SELECT, INSERT, UPDATE, DELETE, JOINs, CTEs, hierarchies, aggregate functions
- **Object-Oriented ABAP**: Classes, interfaces, inheritance, polymorphism, design patterns
- **Constructor Expressions**: VALUE, NEW, CONV, CORRESPONDING, COND, SWITCH, REDUCE, FILTER
- **Dynamic Programming**: Field symbols, data references, RTTI, RTTC
- **String Processing**: String functions, templates, FIND, REPLACE, regex
- **RAP (RESTful Application Programming Model)**: EML statements, BDEF, handler methods
- **CDS View Entities**: Annotations, associations, expressions
- **ABAP Unit Testing**: Test classes, assertions, test doubles
- **Exception Handling**: TRY-CATCH, exception classes, messages
- **ABAP Cloud Development**: Released APIs, restrictions, migration patterns
- **Authorization**: AUTHORITY-CHECK, CDS access control, DCL
- **ABAP Dictionary**: Data elements, domains, structures, table types
- **Generative AI**: ABAP AI SDK, LLM integration

## Auto-Trigger Keywords

This skill activates when discussing:

### ABAP Language
- ABAP, ABAP code, ABAP program, ABAP class, ABAP method
- DATA, TYPES, CONSTANTS, FIELD-SYMBOLS
- IF, CASE, LOOP, DO, WHILE, ENDLOOP, ENDIF
- SELECT, INSERT, UPDATE, DELETE, MODIFY
- TRY, CATCH, RAISE EXCEPTION, CLEANUP
- CLASS, INTERFACE, METHOD, ENDCLASS

### Internal Tables
- internal table, itab, TABLE OF, STANDARD TABLE, SORTED TABLE, HASHED TABLE
- APPEND, INSERT, READ TABLE, MODIFY TABLE, DELETE
- LOOP AT, FIELD-SYMBOL, ASSIGNING, INTO
- table key, secondary key, WITH KEY
- FOR, REDUCE, FILTER
- GROUP BY, GROUP SIZE, WITHOUT MEMBERS

### Constructor Expressions
- VALUE, NEW, CONV, CORRESPONDING, CAST, REF
- COND, SWITCH, EXACT
- REDUCE, FILTER, FOR
- constructor expression, inline declaration
- OPTIONAL, DEFAULT, BASE

### Object Orientation
- ABAP OO, class definition, class implementation
- inheritance, INHERITING FROM, REDEFINITION
- interface, INTERFACES, ALIASES
- CREATE OBJECT, instantiation, factory method
- PUBLIC SECTION, PRIVATE SECTION, PROTECTED SECTION
- event, RAISE EVENT, SET HANDLER
- factory pattern, singleton, strategy pattern

### RAP and Modern ABAP
- RAP, RESTful Application Programming Model
- EML, Entity Manipulation Language
- MODIFY ENTITIES, READ ENTITIES, COMMIT ENTITIES
- BDEF, behavior definition, handler method, saver method
- managed, unmanaged, draft
- %cid, %control, %tky, mapped, failed, reported
- global authorization, instance authorization

### CDS Views
- CDS, Core Data Services, CDS view entity
- define view entity, association, composition
- annotation, @UI, @Semantics
- input parameter, $session
- DCL, access control, define role

### ABAP SQL
- ABAP SQL, SELECT, FROM, WHERE, INTO TABLE
- INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN
- GROUP BY, HAVING, ORDER BY
- aggregate function, COUNT, SUM, AVG, MIN, MAX
- FOR ALL ENTRIES, subquery, CTE
- HIERARCHY, HIERARCHY_DESCENDANTS, HIERARCHY_ANCESTORS

### Dynamic Programming
- field symbol, ASSIGN, UNASSIGN, IS ASSIGNED
- data reference, REF TO, CREATE DATA, dereference
- RTTI, RTTC, cl_abap_typedescr, cl_abap_structdescr
- dynamic SQL, dynamic method call
- CASTING, BIT-NOT, BIT-AND

### String Processing
- string, string template, string function
- FIND, REPLACE, CONCATENATE, SPLIT
- to_upper, to_lower, strlen, substring
- PCRE, regular expression, regex, pattern matching

### Numeric Operations
- numeric, calculation, arithmetic
- cl_abap_bigint, cl_abap_rational
- ROUND, CEIL, FLOOR, TRUNC
- decfloat16, decfloat34
- ipow, sqrt, exp, log

### Testing
- ABAP Unit, test class, FOR TESTING
- cl_abap_unit_assert, assert_equals
- test double, mock, stub, injection
- RISK LEVEL, DURATION

### Exception Handling
- exception, TRY, CATCH, ENDTRY
- RAISE EXCEPTION, THROW
- cx_root, cx_static_check, cx_dynamic_check
- exception class, get_text

### ABAP Cloud
- ABAP Cloud, ABAP for Cloud Development
- released API, XCO library
- SAP BTP ABAP Environment
- cloud-ready, upgrade-stable

### Authorization
- AUTHORITY-CHECK, authorization object
- ACTVT, activity code
- access control, DCL, role
- pfcg_auth, aspect

### ABAP Dictionary
- data element, domain, structure
- table type, database table
- DDIC, dictionary type
- CDS simple type, CDS enum

### Generative AI
- AI SDK, generative AI, LLM
- cl_aic_islm_compl_api_factory
- intelligent scenario, prompt template
- Joule, ABAP AI

### Errors and Debugging
- sy-subrc, sy-tabix, sy-index
- runtime error, dump, exception
- CX_SY_ZERODIVIDE, CX_SY_ITAB_LINE_NOT_FOUND
- debugging, breakpoint

## Directory Structure

```
sap-abap/
├── SKILL.md                        # Main skill file with quick reference
├── README.md                       # This file (keywords for discoverability)
├── PROGRESS_TRACKING.md            # Content extraction progress
└── references/                     # Detailed reference files (28 files)
    ├── abap-dictionary.md          # DDIC objects, types
    ├── abap-sql.md                 # ABAP SQL comprehensive guide
    ├── amdp.md                     # ABAP Managed Database Procedures
    ├── authorization.md            # Authorization checks, DCL
    ├── bits-bytes.md               # Binary operations, CASTING
    ├── builtin-functions.md        # String, numeric, table functions
    ├── cds-views.md                # CDS view entities
    ├── cloud-development.md        # ABAP Cloud specifics
    ├── constructor-expressions.md  # Constructor operators
    ├── date-time.md                # Date, time, timestamps, XCO
    ├── design-patterns.md          # Factory, Singleton, Strategy
    ├── dynamic-programming.md      # RTTI, RTTC, field symbols
    ├── exceptions.md               # Exception handling
    ├── generative-ai.md            # AI SDK integration
    ├── internal-tables.md          # Complete table operations
    ├── numeric-operations.md       # Math functions, big integers
    ├── object-orientation.md       # OO programming patterns
    ├── performance.md              # Database, internal table optimization
    ├── program-flow.md             # IF, CASE, LOOP, DO, WHILE
    ├── rap-eml.md                  # RAP and EML reference
    ├── released-classes.md         # Released API catalog
    ├── sap-luw.md                  # Logical Unit of Work, transactions
    ├── sql-hierarchies.md          # CTE hierarchies, navigators
    ├── string-processing.md        # String functions and regex
    ├── table-grouping.md           # GROUP BY loops
    ├── unit-testing.md             # ABAP Unit framework
    ├── where-conditions.md         # WHERE clause patterns
    └── xml-json.md                 # XML/JSON processing
```

## Usage

Ask Claude about any ABAP development topic:

- "How do I create a sorted internal table with multiple keys?"
- "What's the syntax for EML CREATE operations in RAP?"
- "Show me how to use CORRESPONDING with field mapping"
- "How do I handle exceptions in ABAP?"
- "What's the difference between ABAP Cloud and classic ABAP?"
- "How do I implement the factory pattern in ABAP?"
- "What are the released classes for date/time in ABAP Cloud?"
- "How do I integrate generative AI in ABAP?"

## Source Documentation

Content based on official SAP ABAP Cheat Sheets:
- **Repository**: https://github.com/SAP-samples/abap-cheat-sheets
- **SAP Help**: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm

## Version

- **Skill Version**: 2.1.0
- **Last Updated**: 2025-11-23
- **ABAP Release**: Latest (7.5x / Cloud)
- **Reference Files**: 28
- **Source Coverage**: 91% (31 of 34 source files)
