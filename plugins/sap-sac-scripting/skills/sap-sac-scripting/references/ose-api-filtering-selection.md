---
version: "2025.14"
sac_release: "Q1 2026 (2026.2)"
full_api_docs: "https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html"
last_verified: "2026-03-07"
---

# OSE API: Filtering & Selection

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Filter and selection classes: filter lines, filter values (single/multiple/range), data selection context, and sort order.

## Classes in This File

- [FilterLine](#filterline)
- [FilterPanel](#filterpanel)
- [FilterValue](#filtervalue)
- [FilterValueType](#filtervaluetype)
- [MultiActionAllMemberSelection](#multiactionallmemberselection)
- [MultipleFilterValue](#multiplefiltervalue)
- [RangeFilterValue](#rangefiltervalue)
- [Selection](#selection)
- [SelectionContext](#selectioncontext)
- [SingleFilterValue](#singlefiltervalue)
- [SortOrder](#sortorder)

---

<a name="filterline"></a>

FilterLine

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Last Update

2021.1

Method Summary

|     |
| --- |
| Name and Description |
| [setModel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterLine_MsetModel)(modelId: string): boolean<br>Sets the model and replaces the old one. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Method Detail

|     |     |     |
| --- | --- | --- |
| setModel |
| setModel(modelId: string): boolean

Sets the model and replaces the old one. Note: This operation is only supported for filter lines set to mode "Group Filter".

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |

Returns

boolean

Since

2021.1 |

C



---

<a name="filterpanel"></a>

FilterPanel

Since

2023.13

Method Summary

|     |
| --- |
| Name and Description |
| [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterPanel_MisVisible)(): boolean<br>Returns whether FilterPanel is visible. |
| [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterPanel_MsetVisible)(visible: boolean): void<br>Shows or hides FilterPanel. |

Method Detail

|     |
| --- |
| isVisible |
| isVisible(): boolean<br>Returns whether FilterPanel is visible.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| setVisible |
| setVisible(visible: boolean): void

Shows or hides FilterPanel.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="filtervalue"></a>

FilterValue

can be passed as a JSON object to method arguments

An object representing a filter value

Direct Subclasses

[MultipleFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleFilterValue), [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue), [SingleFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleFilterValue)

Since

2020.7

Last Update

2020.13

Property Summary

|     |
| --- |
| Name and Description |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue_Ptype): [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>Type of the filter value |

Property Detail

|     |
| --- |
| type |
| type: [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>Type of the filter value<br>Since<br>2020.13 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

E



---

<a name="filtervaluetype"></a>

FilterValueType

Since

2020.13

Property Summary

|     |
| --- |
| Name and Description |
| static [Multiple](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType_P_static_Multiple): [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>An object representing multiple filter values, like: {values: \['<memberId1>', '<memberId2>'\]} or {values: \['<memberId1>', '<memberId2>'\], exclude: true} |
| static [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType_P_static_Range): [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>An object representing a range of filter values from dimension members, like: {<operator>: '<memberId>'}, with operator being one of "from", "to", "less", "greater", "lessOrEqual", or "greaterOrEqual". |
| static [Single](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType_P_static_Single): [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>An object representing a single filter value, like: {value: '<memberId>'} or {value: '<memberId>', exclude: true} |

Property Detail

|     |
| --- |
| Multiple |
| staticMultiple: [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>An object representing multiple filter values, like: {values: \['<memberId1>', '<memberId2>'\]} or {values: \['<memberId1>', '<memberId2>'\], exclude: true} |

|     |
| --- |
| Range |
| staticRange: [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>An object representing a range of filter values from dimension members, like: {<operator>: '<memberId>'}, with operator being one of "from", "to", "less", "greater", "lessOrEqual", or "greaterOrEqual". |

|     |
| --- |
| Single |
| staticSingle: [FilterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValueType)<br>An object representing a single filter value, like: {value: '<memberId>'} or {value: '<memberId>', exclude: true} |

C



---

<a name="multiactionallmemberselection"></a>

MultiActionAllMemberSelection\
\
extends [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue), can be passed as a JSON object to method arguments\
\
An object defining a multi action parameter all member selection\
\
Since\
\
2025.13\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [hierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionAllMemberSelection_Phierarchy): string<br>Hierarchy name |\
\
|     |\
| --- |\
| Inherited from [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| hierarchy |\
| hierarchy: string<br>Hierarchy name |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiplefiltervalue"></a>

MultipleFilterValue\
\
extends [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue), can be passed as a JSON object to method arguments\
\
An object representing multiple filter values\
\
Since\
\
2020.7\
\
Last Update\
\
2023.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [descriptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleFilterValue_Pdescriptions): string\[\]<br>Multiple filter descriptions |\
| [exclude](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleFilterValue_Pexclude): boolean<br>Indicates whether to exclude the filter values. |\
| [values](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleFilterValue_Pvalues): string\[\]<br>Multiple filter values |\
\
|     |\
| --- |\
| Inherited from [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| descriptions |\
| descriptions: string\[\]<br>Multiple filter descriptions<br>Since<br>2023.25 |\
\
|     |\
| --- |\
| exclude |\
| exclude: boolean<br>Indicates whether to exclude the filter values. |\
\
|     |\
| --- |\
| values |\
| values: string\[\]<br>Multiple filter values |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="rangefiltervalue"></a>

RangeFilterValue\
\
extends [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue), can be passed as a JSON object to method arguments\
\
An object representing a range filter value\
\
Since\
\
2020.7\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [from](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue_Pfrom): string<br>Start filter value of a range |\
| [greater](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue_Pgreater): string<br>Filter value specifying a range of filter values greater than this filter value |\
| [greaterOrEqual](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue_PgreaterOrEqual): string<br>Filter value specifying a range of filter values greater or equal than this filter value |\
| [less](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue_Pless): string<br>Filter value specifying a range of filter values less than this filter value |\
| [lessOrEqual](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue_PlessOrEqual): string<br>Filter value specifying a range of filter values less or equal than this filter value |\
| [to](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue_Pto): string<br>End filter value of a range |\
\
|     |\
| --- |\
| Inherited from [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| from |\
| from: string<br>Start filter value of a range |\
\
|     |\
| --- |\
| greater |\
| greater: string<br>Filter value specifying a range of filter values greater than this filter value |\
\
|     |\
| --- |\
| greaterOrEqual |\
| greaterOrEqual: string<br>Filter value specifying a range of filter values greater or equal than this filter value |\
\
|     |\
| --- |\
| less |\
| less: string<br>Filter value specifying a range of filter values less than this filter value |\
\
|     |\
| --- |\
| lessOrEqual |\
| lessOrEqual: string<br>Filter value specifying a range of filter values less or equal than this filter value |\
\
|     |\
| --- |\
| to |\
| to: string<br>End filter value of a range |\
\
Type Library\
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)\
\
C\
\


---

<a name="selection"></a>

Selection\
\
is an object<string>, can be passed as a JSON object to method arguments\
\
A selection consists of property-value pairs specifying one row, column, or data cell. The property represents the dimension ID, the value represents the member ID of the dimension. You can create a selection with an object expression, for example: var selection = {"colorDimension": "red", "customerDimension": "SAP"};. You can access the selected member of a dimension, for example: var memberId = selection\["colorDimension"\];. You can iterate over all dimensions of a selection using a for-in loop, for example: for (var dimensionId in selection) {var memberId = selection\[dimensionId\];}\
\
Since\
\
2019.7\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="selectioncontext"></a>

SelectionContext\
\
is an object<string\[\]>, can be passed as a JSON object to method arguments\
\
A selection context consists of property-value pairs specifying rows, columns, or data cells. The property represents the dimension ID, the value represents the member IDs of the dimension. You can create a selection context with an object expression, for example: var context = {"colorDimension": \["red", "blue"\], "customerDimension": "SAP"};. You can access the member of a dimension in a selection context, for example: var memberId = context\["colorDimension"\];. You can iterate over all dimensions of a selection context using a for-in loop, for example: for (var dimensionId in context) {var memberId = context\[dimensionId\];}\
\
Since\
\
2019.20\
\
C\
\


---

<a name="singlefiltervalue"></a>

SingleFilterValue\
\
extends [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue), can be passed as a JSON object to method arguments\
\
An object representing a single filter value\
\
Since\
\
2020.7\
\
Last Update\
\
2023.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleFilterValue_Pdescription): string<br>Filter description |\
| [exclude](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleFilterValue_Pexclude): boolean<br>Indicates whether to exclude the filter value. |\
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleFilterValue_Pvalue): string<br>Filter value |\
\
|     |\
| --- |\
| Inherited from [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| description |\
| description: string<br>Filter description<br>Since<br>2023.25 |\
\
|     |\
| --- |\
| exclude |\
| exclude: boolean<br>Indicates whether to exclude the filter value. |\
\
|     |\
| --- |\
| value |\
| value: string<br>Filter value |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="sortorder"></a>

SortOrder\
\
A set of values describing the sort order\
\
Since\
\
2021.12\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Ascending](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder_P_static_Ascending): [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)<br>Ascending order of sorting (lowest to highest for a measure, earliest to latest for a time-based dimension, and alphabetically ascending for a non-time-based dimension) |\
| static [Default](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder_P_static_Default): [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)<br>Default order of sorting |\
| static [Descending](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder_P_static_Descending): [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)<br>Descending order of sorting (highest to lowest for a measure, latest to earliest for a time-based dimension, and alphabetically descending for a non-time-based dimension) |\
\
Property Detail\
\
|     |\
| --- |\
| Ascending |\
| staticAscending: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)<br>Ascending order of sorting (lowest to highest for a measure, earliest to latest for a time-based dimension, and alphabetically ascending for a non-time-based dimension) |\
\
|     |\
| --- |\
| Default |\
| staticDefault: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)<br>Default order of sorting |\
\
|     |\
| --- |\
| Descending |\
| staticDescending: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)<br>Descending order of sorting (highest to lowest for a measure, latest to earliest for a time-based dimension, and alphabetically descending for a non-time-based dimension) |\
\
C\
\


---

