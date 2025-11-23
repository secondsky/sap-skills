# ABAP CDS Annotations Reference

Complete reference for ABAP CDS annotations organized by category.

**Source**: https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds_annotations.html

---

## Annotation Syntax

```sql
@AnnotationName: value
@AnnotationName.property: value
@AnnotationName: [{ property1: value1, property2: value2 }]
```

Annotations can be placed at:
- **Header level**: Before `define view`
- **Element level**: Before field in projection list
- **Parameter level**: Before parameter definition

---

## 1. AbapCatalog Annotations

Control ABAP Dictionary integration:

| Annotation | Purpose | Values | Required |
|------------|---------|--------|----------|
| `@AbapCatalog.sqlViewName` | SQL view name (max 16 chars) | String | Yes (CDS View) |
| `@AbapCatalog.compiler.CompareFilter` | Optimize WHERE clause | `true/false` | No |
| `@AbapCatalog.preserveKey` | Preserve key structure | `true/false` | No |
| `@AbapCatalog.buffering.status` | Buffering mode | `#ACTIVE`, `#SWITCHED_OFF` | No |
| `@AbapCatalog.buffering.type` | Buffer type | `#SINGLE`, `#GENERIC`, `#FULL` | No |

**Example**:
```sql
@AbapCatalog.sqlViewName: 'ZV_EXAMPLE'
@AbapCatalog.compiler.CompareFilter: true
@AbapCatalog.preserveKey: true
define view Z_EXAMPLE as select from ...
```

---

## 2. AccessControl Annotations

Define authorization behavior:

| Annotation | Purpose | Values |
|------------|---------|--------|
| `@AccessControl.authorizationCheck` | Authorization requirement | `#NOT_REQUIRED`, `#CHECK`, `#MANDATORY`, `#NOT_ALLOWED` |
| `@AccessControl.personalData.blocking` | Data blocking | `#REQUIRED`, `#NOT_REQUIRED` |

**Values Explained**:
- `#NOT_REQUIRED`: No DCL needed, full access granted
- `#CHECK`: Warning in Eclipse if DCL missing
- `#MANDATORY`: Syntax error if DCL missing
- `#NOT_ALLOWED`: DCL ignored even if exists

**Example**:
```sql
@AccessControl.authorizationCheck: #CHECK
define view Z_SECURED_VIEW as select from ...
```

---

## 3. EndUserText Annotations

Provide user-facing labels and descriptions:

| Annotation | Purpose | Level |
|------------|---------|-------|
| `@EndUserText.label` | Display label | Header, Element |
| `@EndUserText.quickInfo` | Tooltip/hover text | Header, Element |

**Example**:
```sql
@EndUserText.label: 'Sales Order Header'
define view Z_SALES_ORDER as select from vbak
{
  @EndUserText.label: 'Order Number'
  @EndUserText.quickInfo: 'Unique sales document identifier'
  vbeln
}
```

**Translation**: Use transaction SE63 to translate these texts.

---

## 4. Metadata Annotations

Control metadata behavior and extensions:

| Annotation | Purpose | Values |
|------------|---------|--------|
| `@Metadata.allowExtensions` | Allow metadata extensions | `true/false` |
| `@Metadata.ignorePropagatedAnnotations` | Block annotation inheritance | `true/false` |

**Example**:
```sql
@Metadata.allowExtensions: true
@Metadata.ignorePropagatedAnnotations: true
define view Z_EXTENSIBLE_VIEW as select from ...
```

---

## 5. Semantics Annotations

Communicate field semantic meaning to frameworks:

### Currency and Amount

| Annotation | Purpose | Example |
|------------|---------|---------|
| `@Semantics.currencyCode: true` | Mark as currency code field | `waers` |
| `@Semantics.amount.currencyCode: 'field'` | Reference currency for amount | `netwr` |

```sql
@Semantics.currencyCode: true
waers,
@Semantics.amount.currencyCode: 'waers'
netwr
```

### Quantity and Unit

| Annotation | Purpose | Example |
|------------|---------|---------|
| `@Semantics.unitOfMeasure: true` | Mark as UoM field | `meins` |
| `@Semantics.quantity.unitOfMeasure: 'field'` | Reference UoM for quantity | `menge` |

```sql
@Semantics.unitOfMeasure: true
meins,
@Semantics.quantity.unitOfMeasure: 'meins'
menge
```

### Administrative Fields

| Annotation | Purpose |
|------------|---------|
| `@Semantics.user.createdBy: true` | Created by user |
| `@Semantics.user.lastChangedBy: true` | Last changed by user |
| `@Semantics.systemDateTime.createdAt: true` | Creation timestamp |
| `@Semantics.systemDateTime.lastChangedAt: true` | Last change timestamp |
| `@Semantics.systemDateTime.localInstanceLastChangedAt: true` | Local instance timestamp |

```sql
@Semantics.user.createdBy: true
ernam,
@Semantics.systemDateTime.createdAt: true
erdat
```

### Other Semantics

| Annotation | Purpose |
|------------|---------|
| `@Semantics.booleanIndicator: true` | Character field as boolean |
| `@Semantics.language: true` | Language key field |
| `@Semantics.text: true` | Text/description field |

---

## 6. UI Annotations

Control Fiori Elements rendering:

### List Report Annotations

| Annotation | Purpose | Properties |
|------------|---------|------------|
| `@UI.lineItem` | Table column | `position`, `importance`, `label` |
| `@UI.selectionField` | Filter field | `position` |
| `@UI.hidden` | Hide element | `true/false` |

```sql
@UI.lineItem: [{ position: 10, importance: #HIGH }]
@UI.selectionField: [{ position: 10 }]
vbeln,

@UI.hidden: true
internal_id
```

### Object Page Annotations

| Annotation | Purpose | Properties |
|------------|---------|------------|
| `@UI.identification` | Object page field | `position`, `label` |
| `@UI.fieldGroup` | Field group member | `position`, `qualifier` |
| `@UI.facet` | Page section | `purpose`, `type`, `label`, `targetQualifier` |
| `@UI.headerInfo` | Header configuration | `typeName`, `typeNamePlural`, `title`, `description` |

```sql
@UI.facet: [{
  purpose: #STANDARD,
  type: #FIELDGROUP_REFERENCE,
  label: 'General Information',
  targetQualifier: 'GeneralInfo'
}]

@UI.fieldGroup: [{ qualifier: 'GeneralInfo', position: 10 }]
vbeln,
@UI.fieldGroup: [{ qualifier: 'GeneralInfo', position: 20 }]
erdat
```

### Status and Data Points

| Annotation | Purpose |
|------------|---------|
| `@UI.dataPoint` | KPI/Status display |
| `@UI.textArrangement` | Text display order |

```sql
@UI.dataPoint: { qualifier: 'Status', title: 'Order Status' }
@UI.textArrangement: #TEXT_ONLY
status
```

**Text Arrangement Values**: `#TEXT_FIRST`, `#TEXT_LAST`, `#TEXT_ONLY`, `#TEXT_SEPARATE`

---

## 7. Consumption Annotations

Control consumer framework behavior:

### Value Help

```sql
@Consumption.valueHelpDefinition: [{
  entity: {
    name: 'I_Currency',
    element: 'Currency'
  },
  additionalBinding: [{
    localElement: 'CompanyCode',
    element: 'CompanyCode',
    usage: #FILTER_AND_RESULT
  }]
}]
waers
```

### Filter

```sql
@Consumption.filter: {
  selectionType: #RANGE,
  multipleSelections: true,
  mandatory: true
}
bukrs
```

### Derived Type

```sql
@Consumption.derivedType.defaultFilter: 'I_SALESORDER'
```

---

## 8. ObjectModel Annotations

Define data model characteristics:

### Text Association

```sql
@ObjectModel.text.element: ['StatusText']
status,

@Semantics.text: true
StatusText
```

### Foreign Key

```sql
@ObjectModel.foreignKey.association: '_Customer'
kunnr,
_Customer
```

### Composition

```sql
@ObjectModel.composition: true
_Items
```

### Transactional Processing

```sql
@ObjectModel.transactionalProcessingEnabled: true
@ObjectModel.writeActivePersistence: 'DB_TABLE'
```

---

## 9. Analytics Annotations

For analytical applications and embedded analytics:

| Annotation | Purpose |
|------------|---------|
| `@Analytics.dataCategory` | Data category | `#DIMENSION`, `#FACT`, `#CUBE` |
| `@Analytics.dataExtraction.enabled` | Enable extraction | `true/false` |
| `@DefaultAggregation` | Default aggregation | `#SUM`, `#MIN`, `#MAX`, `#AVG`, `#COUNT` |

```sql
@Analytics.dataCategory: #FACT
define view Z_ANALYTICS_FACT as select from ...
{
  @DefaultAggregation: #SUM
  amount
}
```

---

## 10. Search Annotations

Enable search functionality:

| Annotation | Purpose |
|------------|---------|
| `@Search.searchable: true` | Enable search on view |
| `@Search.defaultSearchElement: true` | Include in default search |
| `@Search.fuzzinessThreshold` | Fuzzy search threshold (0-1) |
| `@Search.ranking` | Search result ranking | `#HIGH`, `#MEDIUM`, `#LOW` |

```sql
@Search.searchable: true
define view Z_SEARCHABLE as select from ...
{
  @Search.defaultSearchElement: true
  @Search.fuzzinessThreshold: 0.8
  @Search.ranking: #HIGH
  name
}
```

---

## 11. Environment Annotations

Inject system values into parameters:

| Annotation | System Field |
|------------|--------------|
| `@Environment.systemField: #SYSTEM_DATE` | SY-DATUM |
| `@Environment.systemField: #SYSTEM_TIME` | SY-UZEIT |
| `@Environment.systemField: #SYSTEM_LANGUAGE` | SY-LANGU |
| `@Environment.systemField: #USER` | SY-UNAME |
| `@Environment.systemField: #CLIENT` | SY-MANDT |

```sql
define view Z_WITH_DEFAULTS
  with parameters
    @Environment.systemField: #SYSTEM_DATE
    p_date : abap.dats,
    @Environment.systemField: #SYSTEM_LANGUAGE
    p_lang : spras
  as select from ...
```

---

## Finding Annotations in Eclipse/ADT

1. **Open Development Object**: Ctrl+Shift+A
2. **Filter by type**: DDLA (annotation definition)
3. **Browse annotations**: View all available definitions

### API Access

```abap
DATA: lo_service TYPE REF TO cl_dd_ddl_annotation_service.

cl_dd_ddl_annotation_service=>create(
  EXPORTING iv_cds_view = 'Z_CDS_VIEW'
  RECEIVING ro_service  = lo_service
).

" Get all annotations
DATA(lt_annos) = lo_service->get_annos( ).

" Get specific label
DATA(lv_label) = lo_service->get_label_4_element(
  iv_element  = 'FIELD_NAME'
  iv_language = sy-langu
).

" Display the retrieved label
WRITE: / 'Field Label:', lv_label.
```

---

## System Tables

| Table | Content |
|-------|---------|
| DDHEADANNO | Header-level annotations |
| CDSVIEWANNOPOS | CDS view header annotations |
| CDS_FIELD_ANNOTATION | Field-level annotations |
| ABDOC_CDS_ANNOS | SAP annotation definitions |
| DDDDLSRCT | DDL source texts |

---

## Best Practices

1. **Always set authorization check**: Use `@AccessControl.authorizationCheck`
2. **Add labels**: Use `@EndUserText.label` for user-facing views
3. **Document currencies/quantities**: Required for CURR/QUAN fields
4. **Use consistent positioning**: Number `position` values by 10s for easy insertion
5. **Leverage text associations**: Use `@ObjectModel.text.element` for code-text pairs

---

## Documentation Links

- **SAP Help - Annotations (Cloud)**: https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abencds_annotations.html
- **SAP Help - Annotations (7.50)**: https://help.sap.com/doc/abapdocu_750_index_htm/7.50/en-US/abencds_annotations_sap.htm
- **UI Annotations Reference**: https://ui5.sap.com/#/api/sap.ui.comp.smartfield.SmartField

**Last Updated**: 2025-11-23
