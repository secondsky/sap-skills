# SAP SQLScript Skill

Comprehensive SQLScript development skill for SAP HANA database programming.

## Overview

This skill provides complete guidance for SQLScript development, including:
- Stored procedures and user-defined functions
- Anonymous blocks for ad-hoc execution
- Control structures and exception handling
- Built-in functions (string, date, numeric, aggregate, window)
- AMDP (ABAP Managed Database Procedures) integration
- Performance optimization techniques
- Troubleshooting common errors

## Keywords

### Technology Terms
- SQLScript
- SAP HANA
- HANA database
- SAP HANA Cloud
- SAP HANA Platform
- SQL Script
- HANA SQL
- database procedure
- stored procedure
- user-defined function
- UDF
- scalar UDF
- table UDF
- table function
- anonymous block

### Programming Concepts
- code-to-data paradigm
- declarative logic
- imperative logic
- procedural SQL
- cursor
- table variable
- table type
- array
- exception handling
- EXIT HANDLER
- SIGNAL
- RESIGNAL
- CONDITION

### HANA Specific
- Column Store
- Row Store
- Calculation Engine
- Plan Visualizer
- Expensive Statement Trace
- SQL Analyzer
- HANA Studio
- SAP Web IDE
- Business Application Studio

### ABAP Integration
- AMDP
- ABAP Managed Database Procedures
- IF_AMDP_MARKER_HDB
- BY DATABASE PROCEDURE
- code pushdown
- ABAP CDS
- S/4HANA

### Control Structures
- IF THEN ELSE
- ELSEIF
- WHILE DO
- FOR loop
- LOOP
- BREAK
- CONTINUE
- CASE WHEN

### Data Types
- INTEGER
- BIGINT
- SMALLINT
- TINYINT
- DECIMAL
- DOUBLE
- REAL
- VARCHAR
- NVARCHAR
- ALPHANUM
- DATE
- TIME
- TIMESTAMP
- SECONDDATE
- CLOB
- BLOB

### Built-in Functions
- string functions
- date functions
- numeric functions
- aggregate functions
- window functions
- conversion functions
- CONCAT
- SUBSTRING
- LENGTH
- TRIM
- UPPER
- LOWER
- ADD_DAYS
- DAYS_BETWEEN
- CURRENT_DATE
- CURRENT_TIMESTAMP
- TO_VARCHAR
- TO_DATE
- TO_INTEGER
- CAST
- SUM
- COUNT
- AVG
- MIN
- MAX
- ROW_NUMBER
- RANK
- DENSE_RANK
- LEAD
- LAG
- PARTITION BY
- TO_DATS
- TO_TIMS
- CONVERT_CURRENCY
- session_context
- record_count
- lateral join
- JSON functions
- query hints
- APPLY_FILTER
- ARRAY_AGG
- TRIM_ARRAY
- CE functions
- CONTINUE HANDLER
- Code Analyzer
- Plan Profiler
- Pragmas

### Error Handling
- SQL_ERROR_CODE
- SQL_ERROR_MESSAGE
- DECLARE EXIT HANDLER
- SQLEXCEPTION
- error code 301
- unique constraint violation
- error logging

### Performance
- query optimization
- parallel execution
- UNION ALL vs UNION
- avoid dynamic SQL
- reduce data volume
- set-based operations
- execution plan
- index optimization

### Common Tasks
- create procedure
- create function
- create table type
- declare variable
- declare cursor
- fetch cursor
- insert data
- update data
- delete data
- select into
- execute immediate
- dynamic SQL

### Error Messages
- invalid column name
- invalid table name
- variable not defined
- cursor not open
- memory allocation failed
- insufficient privilege
- unique constraint violation
- foreign key violation

## File Structure

```
sap-sqlscript/
├── SKILL.md                           # Main skill file
├── README.md                          # This file
├── PROGRESS_TRACKING.md               # Development progress
└── references/
    ├── syntax-reference.md            # Complete syntax patterns
    ├── built-in-functions.md          # All function categories
    ├── exception-handling.md          # Error handling patterns
    ├── amdp-integration.md            # AMDP implementation guide
    ├── performance-guide.md           # Optimization techniques
    ├── advanced-features.md           # Lateral joins, JSON, query hints, currency
    └── troubleshooting.md             # Common errors and solutions
```

## Usage

This skill is automatically triggered when working with:
- SAP HANA stored procedures
- SQLScript development
- AMDP classes in ABAP
- HANA database functions
- SQL performance optimization in HANA

## Documentation Sources

The skill content is derived from official SAP documentation and community resources:

- **SAP HANA SQLScript Reference** (PDF)
  - URL: `https://help.sap.com/doc/6254b3bb439c4f409a979dc407b49c9b/2.0.07/en-US/SAP_HANA_SQL_Script_Reference_en.pdf`

- **SAP HANA Cloud SQLScript Reference**
  - URL: `https://help.sap.com/docs/hana-cloud-database/sap-hana-cloud-sap-hana-sqlscript-reference/`

- **SAP HANA SQL Functions**
  - URL: `https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/20a61f29751910149f99f0300dd95cd9.html`

- **SAP Tutorials - SQLScript**
  - URL: `https://developers.sap.com/tutorial-navigator.html?tag=programming-tool:sqlscript`

- **AMDP Cheat Sheet** (SAP Samples)
  - URL: `https://github.com/SAP-samples/abap-cheat-sheets/blob/main/12_AMDP.md`

- **SAP Community - SQL Scripts in SAP HANA**
  - URL: `https://community.sap.com/t5/technology-blog-posts-by-members/sql-scripts-in-sap-hana/ba-p/13738376`

## Version Information

- **SAP HANA Platform**: 2.0 SPS07
- **AMDP**: ABAP 7.40 SP05+
- **Last Updated**: 2025-11-23

## License

MIT
