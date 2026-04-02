# SAP ABAP Skill Reference Guide

This document provides a comprehensive guide to all reference materials available for the SAP ABAP skill.

## Core Language References

### Data Types and Declarations
- **Internal Tables**: `references/internal-tables.md` - Complete table operations, keys, grouping, table expressions
- **ABAP Dictionary**: `references/abap-dictionary.md` - Data elements, domains, structures, table types
- **Date and Time**: `references/date-time.md` - Type d, t, utclong, timestamps, XCO library
- **Numeric Operations**: `references/numeric-operations.md` - Math functions, big integers, decimal floating points
- **Bits and Bytes**: `references/bits-bytes.md` - Binary operations, CASTING, bit manipulation
- **String Processing**: `references/string-processing.md` - String functions, templates, FIND, REPLACE, regex

### Program Flow and Control
- **Program Flow**: `references/program-flow.md` - IF, CASE, LOOP, DO, WHILE, control statements
- **Constructor Expressions**: `references/constructor-expressions.md` - VALUE, NEW, CONV, CORRESPONDING, COND, REDUCE
- **Built-in Functions**: `references/builtin-functions.md` - String, numeric, table, logical functions

### ABAP SQL and Database Access
- **ABAP SQL**: `references/abap-sql.md` - SELECT, INSERT, UPDATE, DELETE, JOINs, CTEs, aggregate functions
- **SQL Hierarchies**: `references/sql-hierarchies.md` - CTE hierarchies, HIERARCHY descendants/ancestors
- **WHERE Conditions**: `references/where-conditions.md` - SQL and table WHERE patterns, operators
- **SAP LUW**: `references/sap-luw.md` - Logical Unit of Work, COMMIT, ROLLBACK, database transactions

### Object-Oriented Programming
- **Object Orientation**: `references/object-orientation.md` - Classes, interfaces, inheritance, polymorphism
- **Design Patterns**: `references/design-patterns.md` - Factory, Singleton, Strategy, Observer patterns
- **Dynamic Programming**: `references/dynamic-programming.md` - RTTI, RTTC, field symbols, data references

### Modern ABAP and RAP
- **RAP and EML**: `references/rap-eml.md` - RESTful Application Programming Model, EML statements
- **CDS Views**: `references/cds-views.md` - Core Data Services, view entities, associations
- **ABAP Cloud**: `references/cloud-development.md` - Cloud-ready development, released APIs
- **Released Classes**: `references/released-classes.md` - Released API catalog for ABAP Cloud
- **AMDP**: `references/amdp.md` - ABAP Managed Database Procedures, SQLScript integration

### Testing and Error Handling
- **Unit Testing**: `references/unit-testing.md` - ABAP Unit framework, test classes, assertions
- **Exception Handling**: `references/exceptions.md` - TRY/CATCH, exception classes, error handling
- **Authorization**: `references/authorization.md` - AUTHORITY-CHECK, DCL, access control

### Performance and Optimization
- **Performance**: `references/performance.md` - Database access optimization, internal table performance
- **Table Grouping**: `references/table-grouping.md` - GROUP BY loops, aggregation patterns

### Data Exchange and Integration
- **XML/JSON Processing**: `references/xml-json.md` - iXML, sXML, CALL TRANSFORMATION
- **Generative AI**: `references/generative-ai.md` - AI SDK, LLM integration, Joule

## Source Documentation

All content based on official SAP ABAP Cheat Sheets:
- **Repository**: [https://github.com/SAP-samples/abap-cheat-sheets](https://github.com/SAP-samples/abap-cheat-sheets)
- **SAP Help**: [https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm](https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm)

## How to Use This Guide

1. **Quick Reference**: Look at SKILL.md for commonly used patterns
2. **Detailed Information**: Navigate to specific reference files using this guide
3. **Examples**: Each reference file contains practical code examples
4. **Best Practices**: All references include performance tips and common pitfalls

## Skill Structure

```
sap-abap/
├── SKILL.md                        # Quick reference and common patterns
├── README.md                       # Skill overview and auto-trigger keywords
└── references/                     # Detailed reference files (28 files)
    ├── skill-reference-guide.md    # This file - complete guide to references
    ├── internal-tables.md         # Table operations (562 lines)
    ├── abap-sql.md                # SQL reference (563 lines)
    ├── string-processing.md       # String functions (563 lines)
    ... and 25 more specialized references
```

## Last Updated

- **Skill Version**: 1.1.0
- **Last Updated**: 2026-04-02
- **ABAP Release**: 7.40 SP08+ / 7.50+ / ABAP Cloud
- **Reference Files**: 28
- **Total Lines**: ~25,000 across all reference files

## Version Compatibility

This skill targets ABAP 7.40 SP08 and above. Features requiring higher releases are
annotated in individual reference files. Key boundaries:

- **7.40 SP02**: Inline declarations, constructor expressions, table expressions, string templates
- **7.40 SP05**: `@` host variables, comma syntax, SQL expressions, `CORRESPONDING`, `LET`, `FOR`
- **7.40 SP08**: `REDUCE`, `FILTER`, `BASE`, `GROUP BY` for internal tables, CDS parameters
- **7.50**: `FINAL(...)`, host expressions `@(...)`, `UNION`, `IS INSTANCE OF`, CDS table functions
- **7.51**: CTEs (`WITH`), `OFFSET`, `UPPER`/`LOWER` in SQL, enumerated types
- **7.52**: `FROM @itab`, `WITH PRIVILEGED ACCESS`, virtual sort

See the Version Compatibility table in SKILL.md for the complete feature matrix.
