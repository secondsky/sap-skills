# SAP ABAP CDS (Core Data Services) Skill

Comprehensive Claude Code skill for SAP ABAP CDS view development, annotations, expressions, and access control.

## Overview

This skill provides complete reference material for developing CDS views in SAP ABAP, from basic view creation to advanced topics like associations, access control, and performance optimization.

## When to Use This Skill

Use this skill when:

- Creating CDS views or view entities in ABAP
- Defining data models with annotations
- Working with associations and cardinality
- Implementing input parameters
- Using built-in functions (string, numeric, date/time)
- Writing CASE expressions and conditional logic
- Implementing access control with DCL
- Handling CURR/QUAN data types
- Troubleshooting CDS errors (SD_CDS_ENTITY105)
- Querying CDS views from ABAP
- Displaying data with SALV IDA

## Keywords

### Core CDS Terms
- ABAP CDS
- Core Data Services
- CDS view
- CDS view entity
- define view
- define view entity
- DDL (Data Definition Language)
- DCL (Data Control Language)

### Annotations
- @AbapCatalog
- @AbapCatalog.sqlViewName
- @AbapCatalog.compiler.CompareFilter
- @AccessControl
- @AccessControl.authorizationCheck
- @EndUserText
- @EndUserText.label
- @EndUserText.quickInfo
- @Semantics
- @Semantics.currencyCode
- @Semantics.amount
- @Semantics.unitOfMeasure
- @Semantics.quantity
- @UI
- @UI.lineItem
- @UI.identification
- @UI.selectionField
- @UI.hidden
- @UI.facet
- @UI.fieldGroup
- @UI.dataPoint
- @Consumption
- @Consumption.valueHelpDefinition
- @ObjectModel
- @ObjectModel.text
- @Metadata
- @Metadata.allowExtensions
- @Metadata.ignorePropagatedAnnotations
- @Analytics
- @Search

### Associations
- association
- cardinality
- TO ONE
- TO MANY
- path expressions
- exposed association
- join-on-demand
- $projection

### Parameters
- input parameters
- WITH PARAMETERS
- $parameters
- @Environment.systemField

### Functions
- built-in functions
- string functions
- concat
- substring
- upper
- lower
- length
- replace
- lpad
- rpad
- ltrim
- rtrim
- numeric functions
- abs
- ceil
- floor
- round
- div
- division
- mod
- date functions
- dats_add_days
- dats_add_months
- dats_days_between
- dats_is_valid
- coalesce
- CAST
- aggregate functions
- SUM
- AVG
- MIN
- MAX
- COUNT

### Expressions
- CASE expression
- simple CASE
- searched CASE
- arithmetic operations
- comparison operators
- BETWEEN
- LIKE
- IS NULL
- session variables
- $session
- $session.user
- $session.system_language
- $session.system_date

### Joins
- INNER JOIN
- LEFT OUTER JOIN
- RIGHT OUTER JOIN
- CROSS JOIN

### Access Control
- DEFINE ROLE
- DCL
- pfcg_auth
- authorization
- MappingRole
- aspect user
- access control

### Data Types
- CURR
- QUAN
- currencyCode
- unitOfMeasure
- abap.dats
- abap.tims
- abap.char
- abap.numc
- abap.int4
- abap.curr
- abap.cuky
- abap.quan
- abap.unit

### Tools and Transactions
- Eclipse ADT
- ABAP Development Tools
- SDDLAR
- SALV IDA
- cl_salv_gui_table_ida
- cl_salv_table
- CL_DD_DDL_ANNOTATION_SERVICE

### Errors
- SD_CDS_ENTITY105
- missing reference information
- cardinality mismatch

### Related Technologies
- Fiori Elements
- OData
- RAP
- ABAP RESTful Application Programming Model
- ABAP Cloud
- S/4HANA
- BTP ABAP Environment

## Skill Structure

```
sap-abap-cds/
├── SKILL.md                          # Main skill file
├── README.md                         # This file
├── PROGRESS_TRACKING.md              # Source documentation tracking
├── references/
│   ├── annotations-reference.md      # Complete annotation catalog
│   ├── functions-reference.md        # All built-in functions
│   ├── associations-reference.md     # Associations and cardinality
│   ├── access-control-reference.md   # DCL and authorization
│   ├── expressions-reference.md      # Expressions and operators
│   └── troubleshooting.md            # Common errors and solutions
└── templates/
    ├── basic-view.md                 # Standard CDS view template
    ├── parameterized-view.md         # View with parameters template
    └── dcl-template.md               # Access control template
```

## Quick Examples

### Basic CDS View
```sql
@AbapCatalog.sqlViewName: 'ZEXAMPLE_V'
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Example View'

define view Z_EXAMPLE as select from db_table
{
  key field1,
      field2
}
```

### CDS View Entity (7.55+)
```sql
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Example View Entity'

define view entity Z_EXAMPLE_E as select from db_table
{
  key field1,
      field2
}
```

### Association
```sql
association [0..1] to target as _Target
  on $projection.key_field = _Target.key_field
```

### Access Control
```sql
@MappingRole: true
define role Z_EXAMPLE_DCL {
  grant select on Z_EXAMPLE
    where (bukrs) = aspect pfcg_auth(F_BKPF_BUK, BUKRS, ACTVT = '03');
}
```

## Documentation Sources

- **SAP Help Portal (ABAP Cloud)**: https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds.html
- **SAP NetWeaver 7.52 CDS User Guide**: https://help.sap.com/docs/SAP_NETWEAVER_AS_ABAP_752/f2e545608079437ab165c105649b89db/7c078765ec6d4e6b88b71bdaf8a2bd9f.html
- **SAP ABAP Cheat Sheets**: https://github.com/SAP-samples/abap-cheat-sheets
- **SAP Community**: https://community.sap.com/t5/tag/CDS%20Views/tg-p
- **Codezentrale**: https://codezentrale.de/category/sap/sap-abap/sap-abap-cdsviews/

## Requirements

- SAP NetWeaver 7.4 SP8+ for CDS Views
- SAP NetWeaver 7.55+ for CDS View Entities
- Eclipse with ABAP Development Tools (ADT)
- SAP HANA database (recommended)

## Version

- **Skill Version**: 1.0.0
- **Last Verified**: 2025-11-23
- **ABAP Release**: 7.4 SP8+ / ABAP Cloud

## License

MIT License
