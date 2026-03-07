# OSE API: Data & DataSource

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Data access and management: DataSource API, data actions, data binding, data change insights, data locking, and file/external data sources.

## Classes in This File

- [BatchExportDataSource](#batchexportdatasource)
- [BpcPlanningSequenceDataSource](#bpcplanningsequencedatasource)
- [CommentingDataSource](#commentingdatasource)
- [DataAction](#dataaction)
- [DataActionAllMemberSelection](#dataactionallmemberselection)
- [DataActionBackgroundExecutionResponse](#dataactionbackgroundexecutionresponse)
- [DataActionBackgroundExecutionResponseStatus](#dataactionbackgroundexecutionresponsestatus)
- [DataActionExecutionResponse](#dataactionexecutionresponse)
- [DataActionExecutionResponseStatus](#dataactionexecutionresponsestatus)
- [DataActionMemberParameterValue](#dataactionmemberparametervalue)
- [DataActionNumberParameterValue](#dataactionnumberparametervalue)
- [DataActionParameterValue](#dataactionparametervalue)
- [DataActionParameterValueType](#dataactionparametervaluetype)
- [DataActionPlanningModelMemberParameterValue](#dataactionplanningmodelmemberparametervalue)
- [DataActionTrigger](#dataactiontrigger)
- [DataBinding](#databinding)
- [DataBindings](#databindings)
- [DataCell](#datacell)
- [DataChangeInsight](#datachangeinsight)
- [DataChangeInsights](#datachangeinsights)
- [DataChangeInsightsComparisonOptions](#datachangeinsightscomparisonoptions)
- [DataChangeInsightsResult](#datachangeinsightsresult)
- [DataChangeInsightsStatus](#datachangeinsightsstatus)
- [DataChangeInsightsSubscriptionLevel](#datachangeinsightssubscriptionlevel)
- [DataChangeInsightsSubscriptionRange](#datachangeinsightssubscriptionrange)
- [DataChangeInsightType](#datachangeinsighttype)
- [DataContext](#datacontext)
- [DataLocking](#datalocking)
- [DataLockingState](#datalockingstate)
- [DataSource](#datasource)
- [DataSourceComments](#datasourcecomments)
- [DataSourceInfo](#datasourceinfo)
- [DataUploadExecutionResponseStatus](#datauploadexecutionresponsestatus)
- [FileDataSource](#filedatasource)
- [InputControl](#inputcontrol)
- [InputControlDataSource](#inputcontroldatasource)
- [ODataError](#odataerror)
- [ODataQueryOptions](#odataqueryoptions)
- [RDataFrame](#rdataframe)

---

<a name="batchexportdatasource"></a>

BatchExportDataSource

Since

2024.7

Last Update

2024.17

Method Summary

|     |
| --- |
| Name and Description |
| [setDimensionFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource_MsetDimensionFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, members: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON): void<br>Sets a filter on the dimension. |

Method Detail

|     |     |     |
| --- | --- | --- |
| setDimensionFilter |
| setDimensionFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, members: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON): void

Sets a filter on the dimension. The filter will be used in batch export. Only dimension member and range filter is supported.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| members: | string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON |  |

Last Update

2024.17 |

Type Library
[bookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLbookmark)

C



---

<a name="bpcplanningsequencedatasource"></a>

BpcPlanningSequenceDataSource

Since

2022.14

Last Update

2022.16

Method Summary

|     |
| --- |
| Name and Description |
| [copyVariableValueFrom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource_McopyVariableValueFrom)(sourceDataSource: [BpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource), variable?: string \| string\[\] \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo) \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)\[\]): void<br>Copies the value of a variable. |
| [getVariables](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource_MgetVariables)(): [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)\[\]<br>Returns all variables of the data source. |
| [getVariableValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource_MgetVariableValues)(variable: string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)): [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]<br>Returns the values of the variable. |
| [removeVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource_MremoveVariableValue)(variable: string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)): void<br>Removes the value of the variable. |
| [setVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource_MsetVariableValue)(variable: string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON, options?: [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON): void<br>Sets the value of the variable. |

Method Detail

|     |     |     |
| --- | --- | --- |
| copyVariableValueFrom |
| copyVariableValueFrom(sourceDataSource: [BpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource), variable?: string \| string\[\] \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo) \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)\[\]): void

Copies the value of a variable. If no variable is specified, then all variable values of the data source are copied. If you copy an empty variable value to a mandatory variable, then copying this variable is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| sourceDataSource: | [BpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource) |  |
| variableOptional: | string \| string\[\] \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo) \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)\[\] |  |

Last Update

2022.16 |

|     |     |     |
| --- | --- | --- |
| getVariableValues |
| getVariableValues(variable: string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)): [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]

Returns the values of the variable. Each value can be a single, multiple, or range variable value. To access its type-specific properties, cast the value to the corresponding value type based on the "type" property, using the global cast function. Note: This method may return outdated values with SAP BW dynamic filter variables.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo) |  |

Returns

[VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]

Last Update

2022.16 |

|     |
| --- |
| getVariables |
| getVariables(): [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)\[\]<br>Returns all variables of the data source.<br>Returns<br>[BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)\[\]<br>Last Update<br>2022.16 |

|     |     |     |
| --- | --- | --- |
| removeVariableValue |
| removeVariableValue(variable: string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo)): void

Removes the value of the variable. By default, this removes the variable value of the variable for the data source on the application. If you remove a variable value from a mandatory variable, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo) |  |

Last Update

2022.16 |

|     |     |     |
| --- | --- | --- |
| setVariableValue |
| setVariableValue(variable: string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON, options?: [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON): void

Sets the value of the variable. By default, this sets the variable value of the variable for the data source on the application. If you set an empty variable value to a mandatory variable, then this operation is ignored. Note: The variable value will not be validated. Note: You can omit loading variable descriptions (which are displayed in the Prompt dialog and in dynamic texts) by setting the optional property loadDescriptions in the options to false.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [BpcPlanningSequenceVariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo) |  |
| variableValue: | string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON |  |
| optionsOptional: | [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON |  |

Last Update

2022.16 |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="commentingdatasource"></a>

CommentingDataSource

Since

2021.5

Method Summary

|     |
| --- |
| Name and Description |
| [getDimensionFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentingDataSource_MgetDimensionFilters)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]<br>Returns the dimension filters. |
| [removeDimensionFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentingDataSource_MremoveDimensionFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void<br>Removes any filter that is set on the dimension. |
| [setDimensionFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentingDataSource_MsetDimensionFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\]): void<br>Sets a filter on the dimension. |

Method Detail

|     |     |     |
| --- | --- | --- |
| getDimensionFilters |
| getDimensionFilters(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]

Returns the dimension filters. They don't contain Advanced Filters. Note: Currently, they don't contain time range filters.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\] |

|     |     |     |
| --- | --- | --- |
| removeDimensionFilter |
| removeDimensionFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void

Removes any filter that is set on the dimension. Advanced Filters aren't affected.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  | |

|     |     |     |
| --- | --- | --- |
| setDimensionFilter |
| setDimensionFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\]): void

Sets a filter on the dimension. Any existing filter (except Advanced Filters) on the dimension is overwritten. For most dimensions, you can specify one or more members to be included in the filter. For date- and time-based dimensions, you can specify one or more time ranges to be included in the filter.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| member: | string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] |  | |

Type Library
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)

C



---

<a name="dataaction"></a>

DataAction

Since

2021.6

Last Update

2024.4

Method Summary

|     |
| --- |
| Name and Description |
| [execute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_Mexecute)(): [DataActionExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponse)<br>Executes the data action as a blocking operation, which prevents the rest of the application script from running until the data action is complete. |
| [executeInBackground](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_MexecuteInBackground)(executionName: string): [DataActionBackgroundExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponse)<br>Executes the data action as a non-blocking operation. |
| [getExecutionProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_MgetExecutionProgress)(executionId: string): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Returns status of given Data Action execution. |
| [getParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_MgetParameterValue)(id: string): [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue)<br>Returns the value of the parameter. |
| [isAllMembersSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_MisAllMembersSelected)(id: string): boolean<br>Returns whether the parameter has the all member as value. |
| [setAllMembersSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_MsetAllMembersSelected)(id: string, hierarchy?: string): void<br>Sets the all member as parameter value. |
| [setParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_MsetParameterValue)(id: string, value: string \| string\[\] \| [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) JSON \| number): void<br>Sets the value of the parameter. |

Event Summary

|     |
| --- |
| Name and Description |
| [onExecutionStatusUpdate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataAction_EonExecutionStatusUpdate)(status: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus), executionId: string, executionName: string): void<br>Called when an asynchronous Data Action execution changes its status. |

Method Detail

|     |
| --- |
| execute |
| execute(): [DataActionExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponse)<br>Executes the data action as a blocking operation, which prevents the rest of the application script from running until the data action is complete. It's best to use it only for data actions that take a short time to run.<br>Returns<br>[DataActionExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponse) |

|     |     |     |
| --- | --- | --- |
| executeInBackground |
| executeInBackground(executionName: string): [DataActionBackgroundExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponse)

Executes the data action as a non-blocking operation. A non-blocking operation doesn't block further execution while that operation is executed.

Parameters

|     |     |     |
| --- | --- | --- |
| executionName: | string |  |

Returns

[DataActionBackgroundExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponse)

Since

2022.12 |

|     |     |     |
| --- | --- | --- |
| getExecutionProgress |
| getExecutionProgress(executionId: string): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)

Returns status of given Data Action execution.

Parameters

|     |     |     |
| --- | --- | --- |
| executionId: | string |  |

Returns

[DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)

Since

2024.4 |

|     |     |     |
| --- | --- | --- |
| getParameterValue |
| getParameterValue(id: string): [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue)

Returns the value of the parameter.

Parameters

|     |     |     |
| --- | --- | --- |
| id: | string |  |

Returns

[DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) |

|     |     |     |
| --- | --- | --- |
| isAllMembersSelected |
| isAllMembersSelected(id: string): boolean

Returns whether the parameter has the all member as value.

Parameters

|     |     |     |
| --- | --- | --- |
| id: | string |  |

Returns

boolean

Since

2023.20 |

|     |     |     |
| --- | --- | --- |
| setAllMembersSelected |
| setAllMembersSelected(id: string, hierarchy?: string): void

Sets the all member as parameter value.

Parameters

|     |     |     |
| --- | --- | --- |
| id: | string |  |
| hierarchyOptional: | string |  |

Since

2023.20 |

|     |     |     |
| --- | --- | --- |
| setParameterValue |
| setParameterValue(id: string, value: string \| string\[\] \| [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) JSON \| number): void

Sets the value of the parameter.

Parameters

|     |     |     |
| --- | --- | --- |
| id: | string |  |
| value: | string \| string\[\] \| [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) JSON \| number |  | |

Event Detail

|     |     |     |
| --- | --- | --- |
| onExecutionStatusUpdate |
| onExecutionStatusUpdate(status: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus), executionId: string, executionName: string): void

Called when an asynchronous Data Action execution changes its status.

Parameters

|     |     |     |
| --- | --- | --- |
| status: | [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus) |  |
| executionId: | string |  |
| executionName: | string |  |

Since

2022.12 |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dataactionallmemberselection"></a>

DataActionAllMemberSelection

extends [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue), can be passed as a JSON object to method arguments

An object defining a data action parameter all member selection

Since

2023.20

Property Summary

|     |
| --- |
| Name and Description |
| [hierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionAllMemberSelection_Phierarchy): string<br>Hierarchy name |

|     |
| --- |
| Inherited from [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue_Ptype) |

Property Detail

|     |
| --- |
| hierarchy |
| hierarchy: string<br>Hierarchy name |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dataactionbackgroundexecutionresponse"></a>

DataActionBackgroundExecutionResponse

Since

2022.12

Property Summary

|     |
| --- |
| Name and Description |
| [executionId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponse_PexecutionId): string<br>Generated execution ID. |
| [status](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponse_Pstatus): [DataActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus)<br>Execution status |

Property Detail

|     |
| --- |
| executionId |
| executionId: string<br>Generated execution ID. |

|     |
| --- |
| status |
| status: [DataActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus)<br>Execution status |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

E



---

<a name="dataactionbackgroundexecutionresponsestatus"></a>

DataActionBackgroundExecutionResponseStatus

Since

2022.12

Last Update

2022.15

Property Summary

|     |
| --- |
| Name and Description |
| static [Accepted](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus_P_static_Accepted): [DataActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus)<br>Execution is accepted. |
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus_P_static_Error): [DataActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus)<br>Execution ended with errors. |

Property Detail

|     |
| --- |
| Accepted |
| staticAccepted: [DataActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus)<br>Execution is accepted.<br>Last Update<br>2022.15 |

|     |
| --- |
| Error |
| staticError: [DataActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionBackgroundExecutionResponseStatus)<br>Execution ended with errors.<br>Last Update<br>2022.15 |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dataactionexecutionresponse"></a>

DataActionExecutionResponse

Since

2021.6

Property Summary

|     |
| --- |
| Name and Description |
| [status](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponse_Pstatus): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution result status |

Property Detail

|     |
| --- |
| status |
| status: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution result status |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

E



---

<a name="dataactionexecutionresponsestatus"></a>

DataActionExecutionResponseStatus

Since

2021.6

Last Update

2024.4

Property Summary

|     |
| --- |
| Name and Description |
| static [Accepted](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus_P_static_Accepted): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution is accepted. |
| static [Canceled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus_P_static_Canceled): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution has been canceled. |
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus_P_static_Error): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution ended with errors. |
| static [Queued](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus_P_static_Queued): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution is queued. |
| static [Running](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus_P_static_Running): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution is running. |
| static [Success](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus_P_static_Success): [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution ended successfully. |

Property Detail

|     |
| --- |
| Accepted |
| staticAccepted: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution is accepted.<br>Since<br>2024.4 |

|     |
| --- |
| Canceled |
| staticCanceled: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution has been canceled.<br>Since<br>2022.3 |

|     |
| --- |
| Error |
| staticError: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution ended with errors. |

|     |
| --- |
| Queued |
| staticQueued: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution is queued.<br>Since<br>2022.16 |

|     |
| --- |
| Running |
| staticRunning: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution is running.<br>Since<br>2022.12 |

|     |
| --- |
| Success |
| staticSuccess: [DataActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionExecutionResponseStatus)<br>Execution ended successfully. |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dataactionmemberparametervalue"></a>

DataActionMemberParameterValue

extends [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue), can be passed as a JSON object to method arguments

An object defining a data action member parameter value

Since

2021.6

Property Summary

|     |
| --- |
| Name and Description |
| [members](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionMemberParameterValue_Pmembers): string\[\]<br>Member IDs |

|     |
| --- |
| Inherited from [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue_Ptype) |

Property Detail

|     |
| --- |
| members |
| members: string\[\]<br>Member IDs |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dataactionnumberparametervalue"></a>

DataActionNumberParameterValue

extends [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue), can be passed as a JSON object to method arguments

An object defining a data action number parameter value

Since

2021.6

Property Summary

|     |
| --- |
| Name and Description |
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionNumberParameterValue_Pvalue): number<br>Number value |

|     |
| --- |
| Inherited from [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue_Ptype) |

Property Detail

|     |
| --- |
| value |
| value: number<br>Number value |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dataactionparametervalue"></a>

DataActionParameterValue

can be passed as a JSON object to method arguments

An object defining a data action parameter value

Direct Subclasses

[DataActionAllMemberSelection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionAllMemberSelection), [DataActionMemberParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionMemberParameterValue), [DataActionNumberParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionNumberParameterValue), [DataActionPlanningModelMemberParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionPlanningModelMemberParameterValue)

Since

2021.6

Property Summary

|     |
| --- |
| Name and Description |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue_Ptype): [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Type of the parameter value |

Property Detail

|     |
| --- |
| type |
| type: [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Type of the parameter value |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

E



---

<a name="dataactionparametervaluetype"></a>

DataActionParameterValueType

Since

2021.6

Last Update

2024.20

Property Summary

|     |
| --- |
| Name and Description |
| static [All](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType_P_static_All): [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>All member selection type |
| static [Member](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType_P_static_Member): [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Member value type |
| static [Number](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType_P_static_Number): [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Number value type |
| static [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType_P_static_PlanningModelMember): [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Planning Model Member value type |

Property Detail

|     |
| --- |
| All |
| staticAll: [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>All member selection type<br>Since<br>2023.20 |

|     |
| --- |
| Member |
| staticMember: [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Member value type |

|     |
| --- |
| Number |
| staticNumber: [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Number value type |

|     |
| --- |
| PlanningModelMember |
| staticPlanningModelMember: [DataActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValueType)<br>Planning Model Member value type<br>Since<br>2024.20 |

C



---

<a name="dataactionplanningmodelmemberparametervalue"></a>

DataActionPlanningModelMemberParameterValue

extends [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue), can be passed as a JSON object to method arguments

An object defining a data action member parameter value

Since

2024.20

Property Summary

|     |
| --- |
| Name and Description |
| [hierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionPlanningModelMemberParameterValue_Phierarchy): string<br>Specific hierarchy which should be used for the given members. |
| [members](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionPlanningModelMemberParameterValue_Pmembers): [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON<br>Planning Model Member |

|     |
| --- |
| Inherited from [DataActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue) |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionParameterValue_Ptype) |

Property Detail

|     |
| --- |
| hierarchy |
| hierarchy: string<br>Specific hierarchy which should be used for the given members. If undefined, the fixed hierarchy of the parameter or the default hierarchy of the dimension will be used |

|     |
| --- |
| members |
| members: [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON<br>Planning Model Member |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="dataactiontrigger"></a>

DataActionTrigger

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2018.22

Last Update

2020.4

Method Summary

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onBeforeExecute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionTrigger_EonBeforeExecute)(): boolean<br>Called when the user clicks the data action starter. |

Event Detail

|     |
| --- |
| onBeforeExecute |
| onBeforeExecute(): boolean<br>Called when the user clicks the data action starter. If this method returns true or returns no value, then the data action is executed. If this method returns false, then the data action is ignored.<br>Returns<br>booleanDefault value:true<br>Since<br>2020.4 |

Type Library
[data-binding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-binding)

C



---

<a name="databinding"></a>

DataBinding

Since

2022.8

Last Update

2023.15

Method Summary

|     |
| --- |
| Name and Description |
| [addDimensionToFeed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MaddDimensionToFeed)(feed: string, dimensionId: string, position?: integer): void<br>Adds a dimension to a feed. |
| [addMemberToFeed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MaddMemberToFeed)(feed: string, memberId: string, position?: integer): void<br>Adds a member to a feed. |
| [getDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MgetDataSource)(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the data-binding. |
| [getDimensions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MgetDimensions)(feed: string): string\[\]<br>Returns all dimensions on the feed. |
| [getLinkedAnalysis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MgetLinkedAnalysis)(): [LinkedAnalysis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LinkedAnalysis)<br>linked ayalysis for custom widget. |
| [getMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MgetMembers)(feed: string): string\[\]<br>Returns all members on the feed. |
| [openSelectModelDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MopenSelectModelDialog)(): void<br>Opens the select model dialog. |
| [removeDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MremoveDimension)(dimensionId: string): void<br>Removes a dimension from the feed on which it is currently on. |
| [removeMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MremoveMember)(memberId: string): void<br>Removes a member from the feed on which it is currently on. |
| [setModel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding_MsetModel)(modelId: string): boolean<br>Sets the model and replaces the old one. |

Method Detail

|     |     |     |
| --- | --- | --- |
| addDimensionToFeed |
| addDimensionToFeed(feed: string, dimensionId: string, position?: integer): void

Adds a dimension to a feed.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | string |  |
| dimensionId: | string |  |
| positionOptional: | integer |  | |

|     |     |     |
| --- | --- | --- |
| addMemberToFeed |
| addMemberToFeed(feed: string, memberId: string, position?: integer): void

Adds a member to a feed.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | string |  |
| memberId: | string |  |
| positionOptional: | integer |  | |

|     |
| --- |
| getDataSource |
| getDataSource(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the data-binding. If the data-binding has no data source, then undefined is returned.<br>Returns<br>[DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource) |

|     |     |     |
| --- | --- | --- |
| getDimensions |
| getDimensions(feed: string): string\[\]

Returns all dimensions on the feed.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | string |  |

Returns

string\[\] |

|     |
| --- |
| getLinkedAnalysis |
| getLinkedAnalysis(): [LinkedAnalysis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LinkedAnalysis)<br>linked ayalysis for custom widget.<br>Returns<br>[LinkedAnalysis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LinkedAnalysis)<br>Since<br>2023.15 |

|     |     |     |
| --- | --- | --- |
| getMembers |
| getMembers(feed: string): string\[\]

Returns all members on the feed.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | string |  |

Returns

string\[\] |

|     |
| --- |
| openSelectModelDialog |
| openSelectModelDialog(): void<br>Opens the select model dialog. Selecting a model replaces the model and clears the query of the databinding. |

|     |     |     |
| --- | --- | --- |
| removeDimension |
| removeDimension(dimensionId: string): void

Removes a dimension from the feed on which it is currently on.

Parameters

|     |     |     |
| --- | --- | --- |
| dimensionId: | string |  | |

|     |     |     |
| --- | --- | --- |
| removeMember |
| removeMember(memberId: string): void

Removes a member from the feed on which it is currently on.

Parameters

|     |     |     |
| --- | --- | --- |
| memberId: | string |  | |

|     |     |     |
| --- | --- | --- |
| setModel |
| setModel(modelId: string): boolean

Sets the model and replaces the old one.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |

Returns

boolean |

Type Library
[data-binding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-binding)

C



---

<a name="databindings"></a>

DataBindings

Since

2022.8

Method Summary

|     |
| --- |
| Name and Description |
| [getDataBinding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBindings_MgetDataBinding)(dataBindingId?: string): [DataBinding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding)<br>Returns the databinding of the custom widget. |

Method Detail

|     |     |     |
| --- | --- | --- |
| getDataBinding |
| getDataBinding(dataBindingId?: string): [DataBinding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding)

Returns the databinding of the custom widget. If arugment is omitted, the first databinding defined in the contribution will be returned. If the customwidget has no databinding, then undefined is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| dataBindingIdOptional: | string |  |

Returns

[DataBinding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataBinding) |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="datacell"></a>

DataCell

Property Summary

|     |
| --- |
| Name and Description |
| [formattedValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataCell_PformattedValue): string |
| [rawValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataCell_PrawValue): string |

Property Detail

|     |
| --- |
| formattedValue |
| formattedValue: string |

|     |
| --- |
| rawValue |
| rawValue: string |

Type Library
[data-change-insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-change-insights)

C



---

<a name="datachangeinsight"></a>

DataChangeInsight

Since

2021.1

Property Summary

|     |
| --- |
| Name and Description |
| [content](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsight_Pcontent): string |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsight_Ptype): [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType) |

Property Detail

|     |
| --- |
| content |
| content: string |

|     |
| --- |
| type |
| type: [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType) |

Type Library
[data-change-insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-change-insights)

C



---

<a name="datachangeinsights"></a>

DataChangeInsights

Since

2021.1

Last Update

2021.5

Method Summary

|     |
| --- |
| Name and Description |
| [compareApplicationStateWithSnapshot](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_McompareApplicationStateWithSnapshot)(target: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), options?: [DataChangeInsightsComparisonOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions) JSON): [DataChangeInsightsResult](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult)<br>Compares the current state of the analytic application with a Data Change Insights snapshot. |
| [compareSnapshots](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_McompareSnapshots)(source: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), target: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), options?: [DataChangeInsightsComparisonOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions) JSON): [DataChangeInsightsResult](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult)<br>Compares two Data Change Insights snapshots by date. |
| [getVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_MgetVersion)(): integer<br>Returns the Data Change Insights version of the analytic application. |
| [isRunBySnapshotGeneration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_MisRunBySnapshotGeneration)(): boolean<br>Returns whether the Data Change Insights snapshot task is running. |
| [listRecentSnapshotDates](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_MlistRecentSnapshotDates)(maximumNumber?: integer): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)\[\]<br>Returns a list of dates when a Data Change Insights snapshot was created from the analytic application. |
| [openSubscriptionDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_MopenSubscriptionDialog)(): void<br>Opens the subscription dialog. |
| [saveSnapshot](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsights_MsaveSnapshot)(): boolean<br>Saves a Data Change Insights snapshot. |

Method Detail

|     |     |     |
| --- | --- | --- |
| compareApplicationStateWithSnapshot |
| compareApplicationStateWithSnapshot(target: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), options?: [DataChangeInsightsComparisonOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions) JSON): [DataChangeInsightsResult](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult)

Compares the current state of the analytic application with a Data Change Insights snapshot.

Parameters

|     |     |     |
| --- | --- | --- |
| target: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |
| optionsOptional: | [DataChangeInsightsComparisonOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions) JSON |  |

Returns

[DataChangeInsightsResult](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult) |

|     |     |     |
| --- | --- | --- |
| compareSnapshots |
| compareSnapshots(source: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), target: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), options?: [DataChangeInsightsComparisonOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions) JSON): [DataChangeInsightsResult](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult)

Compares two Data Change Insights snapshots by date. Note: An analytic application can have only one Data Change Insights snapshot per day.

Parameters

|     |     |     |
| --- | --- | --- |
| source: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |
| target: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |
| optionsOptional: | [DataChangeInsightsComparisonOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions) JSON |  |

Returns

[DataChangeInsightsResult](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult) |

|     |
| --- |
| getVersion |
| getVersion(): integer<br>Returns the Data Change Insights version of the analytic application.<br>Returns<br>integer<br>Since<br>2021.5 |

|     |
| --- |
| isRunBySnapshotGeneration |
| isRunBySnapshotGeneration(): boolean<br>Returns whether the Data Change Insights snapshot task is running.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| listRecentSnapshotDates |
| listRecentSnapshotDates(maximumNumber?: integer): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)\[\]

Returns a list of dates when a Data Change Insights snapshot was created from the analytic application. Optionally, you can specify the maximum number of returned dates (default: 10 for Local Tenant Storage, 100 for Data Repositories). The maximum number is limited to 10 for Local Tenant Storage, 100 for Data Repositories.

Parameters

|     |     |     |
| --- | --- | --- |
| maximumNumberOptional: | integer |  |

Returns

[Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)\[\] |

|     |
| --- |
| openSubscriptionDialog |
| openSubscriptionDialog(): void<br>Opens the subscription dialog.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.5 |

|     |
| --- |
| saveSnapshot |
| saveSnapshot(): boolean<br>Saves a Data Change Insights snapshot. Only one snapshot is kept per analytic application per day. When you save more snapshots per analytic application per day, then the latest snapshot overwrites the previous snapshot.<br>Returns<br>boolean |

Type Library
[data-change-insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-change-insights)

C



---

<a name="datachangeinsightscomparisonoptions"></a>

DataChangeInsightsComparisonOptions

can be passed as a JSON object to method arguments

Since

2021.1

Property Summary

|     |
| --- |
| Name and Description |
| [top](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsComparisonOptions_Ptop): integer<br>Number of returned Data Change Insights. |

Property Detail

|     |
| --- |
| top |
| top: integer<br>Number of returned Data Change Insights. The maximum number is limited to 5. |

Type Library
[data-change-insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-change-insights)

C



---

<a name="datachangeinsightsresult"></a>

DataChangeInsightsResult

Since

2021.1

Property Summary

|     |
| --- |
| Name and Description |
| [insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult_Pinsights): [DataChangeInsight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsight)\[\] |
| [status](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult_Pstatus): [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus) |
| [statusMessage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsResult_PstatusMessage): string |

Property Detail

|     |
| --- |
| insights |
| insights: [DataChangeInsight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsight)\[\] |

|     |
| --- |
| status |
| status: [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus) |

|     |
| --- |
| statusMessage |
| statusMessage: string |

Type Library
[data-change-insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-change-insights)

E



---

<a name="datachangeinsightsstatus"></a>

DataChangeInsightsStatus

Since

2021.1

Property Summary

|     |
| --- |
| Name and Description |
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus_P_static_Error): [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus)<br>Error |
| static [Invalid](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus_P_static_Invalid): [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus)<br>Invalid |
| static [Ok](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus_P_static_Ok): [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus)<br>Ok |

Property Detail

|     |
| --- |
| Error |
| staticError: [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus)<br>Error |

|     |
| --- |
| Invalid |
| staticInvalid: [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus)<br>Invalid |

|     |
| --- |
| Ok |
| staticOk: [DataChangeInsightsStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsStatus)<br>Ok |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

E



---

<a name="datachangeinsightssubscriptionlevel"></a>

DataChangeInsightsSubscriptionLevel

Since

2021.5

Property Summary

|     |
| --- |
| Name and Description |
| static [Subscribed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel_P_static_Subscribed): [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Subscribed |
| static [SubscribedHighImportance](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel_P_static_SubscribedHighImportance): [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Subscribed with high importance |
| static [Unsubscribed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel_P_static_Unsubscribed): [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Unsubscribed |

Property Detail

|     |
| --- |
| Subscribed |
| staticSubscribed: [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Subscribed |

|     |
| --- |
| SubscribedHighImportance |
| staticSubscribedHighImportance: [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Subscribed with high importance |

|     |
| --- |
| Unsubscribed |
| staticUnsubscribed: [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Unsubscribed |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="datachangeinsightssubscriptionrange"></a>

DataChangeInsightsSubscriptionRange

can be passed as a JSON object to method arguments

Since

2021.5

Property Summary

|     |
| --- |
| Name and Description |
| [isAbsoluteValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PisAbsoluteValue): boolean<br>Specifies whether the subscription range defines an absolute value. |
| [isDeltaValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PisDeltaValue): boolean<br>Specifies whether the subscription range defines a delta value. |
| [isInclude](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PisInclude): boolean<br>Specifies whether the subscription range is inclusive. |
| [isMaxOrEqual](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PisMaxOrEqual): boolean<br>Specifies whether the subscription range defines values less or equal to the maximum value. |
| [isMinOrEqual](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PisMinOrEqual): boolean<br>Specifies whether the subscription range defines values greater or equal to the minimum value. |
| [max](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_Pmax): number<br>Maximum value of the subscription range |
| [min](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_Pmin): number<br>Minimum value of the subscription range |
| [structureDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PstructureDimension): string<br>Structure dimension of the subscription range |
| [structureDimensionMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange_PstructureDimensionMember): string<br>Structure dimension member of the subscription range |

Property Detail

|     |
| --- |
| isAbsoluteValue |
| isAbsoluteValue: boolean<br>Specifies whether the subscription range defines an absolute value. |

|     |
| --- |
| isDeltaValue |
| isDeltaValue: boolean<br>Specifies whether the subscription range defines a delta value. |

|     |
| --- |
| isInclude |
| isInclude: boolean<br>Specifies whether the subscription range is inclusive. |

|     |
| --- |
| isMaxOrEqual |
| isMaxOrEqual: boolean<br>Specifies whether the subscription range defines values less or equal to the maximum value. |

|     |
| --- |
| isMinOrEqual |
| isMinOrEqual: boolean<br>Specifies whether the subscription range defines values greater or equal to the minimum value. |

|     |
| --- |
| max |
| max: number<br>Maximum value of the subscription range |

|     |
| --- |
| min |
| min: number<br>Minimum value of the subscription range |

|     |
| --- |
| structureDimension |
| structureDimension: string<br>Structure dimension of the subscription range |

|     |
| --- |
| structureDimensionMember |
| structureDimensionMember: string<br>Structure dimension member of the subscription range |

Type Library
[data-change-insights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-change-insights)

E



---

<a name="datachangeinsighttype"></a>

DataChangeInsightType

Since

2021.1

Property Summary

|     |
| --- |
| Name and Description |
| static [TopNMemberChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType_P_static_TopNMemberChange): [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Top N member change |
| static [ValueChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType_P_static_ValueChange): [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Value change |
| static [ValueChangeOverReferenceLine](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType_P_static_ValueChangeOverReferenceLine): [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Value change over reference line |
| static [ValueChangeOverThreshold](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType_P_static_ValueChangeOverThreshold): [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Value change over threshold |

Property Detail

|     |
| --- |
| TopNMemberChange |
| staticTopNMemberChange: [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Top N member change |

|     |
| --- |
| ValueChange |
| staticValueChange: [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Value change |

|     |
| --- |
| ValueChangeOverReferenceLine |
| staticValueChangeOverReferenceLine: [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Value change over reference line |

|     |
| --- |
| ValueChangeOverThreshold |
| staticValueChangeOverThreshold: [DataChangeInsightType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightType)<br>Value change over threshold |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="datacontext"></a>

DataContext

A data context describes a member or measure. For example, a data context of a member is {"id": "\[Date\_703i1904sd\].\[YHQM\].\[Date\_703i1904sd.YEAR\].\[2014\]", "description": "2014", "parentId": "\[Date\_703i1904sd\].\[YHQM\].\[All\].\[(all)\]", properties: {}}. For example, a data context of a measure is {"id": "\[Account\_BestRunJ\_sold\].\[parentId\].&\[Discount\]", "description": "Discount", "formattedValue": "45674567", "rawValue": "45674567"}.

Since

2019.20

Last Update

2020.10

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext_Pdescription): string<br>Member or measure description (optional) |
| [formattedValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext_PformattedValue): string<br>Formatted value (measures only) |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext_Pid): string<br>Member or measure ID |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext_PparentId): string<br>Parent ID of member or measure (optional) |
| [properties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext_Pproperties): [ResultMemberProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberProperties)<br>Properties of a dimension |
| [rawValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext_PrawValue): string<br>Raw (unformatted) value (measures only) |

Property Detail

|     |
| --- |
| description |
| description: string<br>Member or measure description (optional) |

|     |
| --- |
| formattedValue |
| formattedValue: string<br>Formatted value (measures only) |

|     |
| --- |
| id |
| id: string<br>Member or measure ID |

|     |
| --- |
| parentId |
| parentId: string<br>Parent ID of member or measure (optional) |

|     |
| --- |
| properties |
| properties: [ResultMemberProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberProperties)<br>Properties of a dimension<br>Since<br>2020.10 |

|     |
| --- |
| rawValue |
| rawValue: string<br>Raw (unformatted) value (measures only) |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="datalocking"></a>

DataLocking

Since

2019.22

Method Summary

|     |
| --- |
| Name and Description |
| [getState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLocking_MgetState)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>Returns the data locking state of a data cell. |
| [setState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLocking_MsetState)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)): boolean<br>Sets the data locking state of a data cell. |

Method Detail

|     |     |     |
| --- | --- | --- |
| getState |
| getState(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)

Returns the data locking state of a data cell. The data cell is specified by the selection.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Returns

[DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState) |

|     |     |     |
| --- | --- | --- |
| setState |
| setState(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)): boolean

Sets the data locking state of a data cell. The data cell is specified by the selection. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |
| value: | [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState) |  |

Returns

boolean |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

E



---

<a name="datalockingstate"></a>

DataLockingState

Since

2019.22

Property Summary

|     |
| --- |
| Name and Description |
| static [Locked](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState_P_static_Locked): [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The value of a data cell can't be changed. |
| static [Mixed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState_P_static_Mixed): [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The data locking state can't be determined. |
| static [Open](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState_P_static_Open): [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The value of a data cell can be changed by users who have the permission to enter values for the model. |
| static [Restricted](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState_P_static_Restricted): [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The value of a data cell can be changed only by users who have effective ownership of the locks of the data cell. |

Property Detail

|     |
| --- |
| Locked |
| staticLocked: [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The value of a data cell can't be changed. |

|     |
| --- |
| Mixed |
| staticMixed: [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The data locking state can't be determined. |

|     |
| --- |
| Open |
| staticOpen: [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The value of a data cell can be changed by users who have the permission to enter values for the model. |

|     |
| --- |
| Restricted |
| staticRestricted: [DataLockingState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLockingState)<br>The value of a data cell can be changed only by users who have effective ownership of the locks of the data cell. |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="datasource"></a>

DataSource

Last Update

2024.20

Method Summary

|     |
| --- |
| Name and Description |
| [collapseNode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_McollapseNode)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): void<br>Collapses a hierarchy node. |
| [copyDimensionFilterFrom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_McopyDimensionFilterFrom)(sourceDataSource: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource), dimension?: string \| string\[\] \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo)\[\]JSON): void<br>Copies the dimension filters of the dimensions of the source data source to the dimensions of this data source. |
| [copyVariableValueFrom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_McopyVariableValueFrom)(sourceDataSource: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource), variable?: string \| string\[\] \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]): void<br>Copies the value of a variable. |
| [expandNode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MexpandNode)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): void<br>Expands a hierarchy node. |
| [getBackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetBackendCondition)(backendConditionId: string): [BackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition)<br>Gets a BEx condition by its ID. |
| [getBackendConditions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetBackendConditions)(): [BackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition)\[\]<br>Gets all BEx conditions. |
| [getComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetComments)(): [DataSourceComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments)<br>Deprecated This method is deprecated, use Table.getComments() instead. |
| [getData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetData)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [DataCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataCell)<br>Returns the data cell of the selection. |
| [getDataSelections](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetDataSelections)(selections?: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON \| [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON, offset?: integer, limit?: integer): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns selections of data cells. |
| [getDimensionFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetDimensionFilters)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]<br>Returns the dimension filters. |
| [getDimensionProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetDimensionProperties)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [DimensionPropertyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo)\[\]<br>Returns the properties of the dimension. |
| [getDimensions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetDimensions)(): [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo)\[\]<br>Returns all dimensions of the data source. |
| [getHierarchies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetHierarchies)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo)\[\]<br>Returns all hierarchies of the dimension. |
| [getHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetHierarchy)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo)<br>Returns the hierarchy set on the dimension. |
| [getHierarchyLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetHierarchyLevel)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): integer<br>Returns the hierarchy level of the dimension. |
| [getInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetInfo)(): [DataSourceInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo)<br>Returns information about the data source. |
| [getMeasures](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetMeasures)(): [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]<br>Returns all measures of the data source. |
| [getMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetMember)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, memberId: string, hierarchy?: string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)<br>Returns the member info object from a member ID. |
| [getMemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetMemberDisplayMode)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Returns the display mode for members of the dimension. |
| [getMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetMembers)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, options?: integer \| [MembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MembersOptions) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]<br>Returns the members of the dimension. |
| [getRefreshPaused](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetRefreshPaused)(): [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Returns the pause mode of the data refresh. |
| [getResultMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetResultMember)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [ResultMemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo)<br>Returns the result member. |
| [getResultSet](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetResultSet)(selections?: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON \| [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON, offset?: integer, limit?: integer): [ResultSet](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultSet)\[\]<br>Returns result sets. |
| [getVariables](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetVariables)(): [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]<br>Returns all variables of the data source. |
| [getVariableValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MgetVariableValues)(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]<br>Returns the values of the variable. |
| [isRefreshPaused](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MisRefreshPaused)(): boolean<br>Deprecated This method is deprecated, use getRefreshPaused() instead. |
| [isResultEmpty](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MisResultEmpty)(): boolean<br>Returns whether the result of the data source query state is empty, that is, no data cells were returned. |
| [openPromptDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MopenPromptDialog)(): void<br>Opens the Prompt dialog for the model used by this data source. |
| [refreshData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MrefreshData)(): void<br>Triggers data refresh and updates the widgets associated with the data source at the same time. |
| [removeDimensionFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MremoveDimensionFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void<br>Removes any filter that is set on the dimension. |
| [removeVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MremoveVariableValue)(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): void<br>Removes the value of the variable. |
| [setDimensionFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MsetDimensionFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] \| [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON): void<br>Sets a filter on the dimension. |
| [setHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MsetHierarchy)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, hierarchy: string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON): void<br>Sets the hierarchy on the dimension. |
| [setHierarchyLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MsetHierarchyLevel)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, level?: integer): void<br>Sets the hierarchy level of the dimension. |
| [setMemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MsetMemberDisplayMode)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, displayMode: [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)): void<br>Sets the display mode for members of the dimension. |
| [setRefreshPaused](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MsetRefreshPaused)(paused: [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode) \| boolean): void<br>Sets the pause mode of the data refresh. |
| [setVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource_MsetVariableValue)(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON, options?: [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON): void<br>Sets the value of the variable. |

Method Detail

|     |     |     |
| --- | --- | --- |
| collapseNode |
| collapseNode(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): void

Collapses a hierarchy node. The dimension node specified by the selection is collapsed. For tables, only one dimension node is collapsed. The expansion state of its child nodes is restored when this dimension node is expanded again. For charts, all specified dimension nodes are collapsed, along with their child nodes. For Waterfall charts with one or more dimensions, the selection specifies one dimension and one measure. For Waterfall charts with one measure but no dimensions, the selection specifies this measure. For Waterfall charts with more than one measure but no dimensions, this operation is ignored. Note: Currently, this operation is not supported for data sources associated with geo map layers.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Since

2020.11 |

|     |     |     |
| --- | --- | --- |
| copyDimensionFilterFrom |
| copyDimensionFilterFrom(sourceDataSource: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource), dimension?: string \| string\[\] \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo)\[\]JSON): void

Copies the dimension filters of the dimensions of the source data source to the dimensions of this data source. If no dimensions are specified, then the filters of all matching dimensions are copied. Note: Only filters on dimensions with the same name and the same active hierarchy in both the source data source and this data source are copied. Note: Advanced Filters are not copied.

Parameters

|     |     |     |
| --- | --- | --- |
| sourceDataSource: | [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource) |  |
| dimensionOptional: | string \| string\[\] \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo)\[\]JSON |  |

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| copyVariableValueFrom |
| copyVariableValueFrom(sourceDataSource: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource), variable?: string \| string\[\] \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]): void

Copies the value of a variable. If no variable is specified, then all variable values of the data source are copied. If you copy an empty variable value to a mandatory variable, then copying this variable is ignored. If you copy a variable value to a data source of a widget that overrides variables and the variable is of type text, then copying this variable is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| sourceDataSource: | [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource) |  |
| variableOptional: | string \| string\[\] \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\] |  |

Since

2020.3 |

|     |     |     |
| --- | --- | --- |
| expandNode |
| expandNode(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): void

Expands a hierarchy node. Only one hierarchy dimension can be expanded. Every node on the hierarchy path is expanded as well. For tables, this operation is ignored if one of the dimension nodes on the hierarchy path doesn't exist. Invalid dimensions in the selection are ignored. For charts, all dimension nodes specified by the selection are expanded. If the selection doesn't specify dimension nodes of the specified dimension, then this operation is ignored. For Waterfall charts with one or more dimensions, the selection specifies one dimension and one measure. For Waterfall charts with one measure but no dimensions, the selection specifies this measure. For Waterfall charts with more than one measure but no dimensions, this operation is ignored. Note: Currently, this operation is not supported for data sources associated with geo map layers.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Since

2020.11 |

|     |     |     |
| --- | --- | --- |
| getBackendCondition |
| getBackendCondition(backendConditionId: string): [BackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition)

Gets a BEx condition by its ID. Note: Only supported for data sources associated with charts.

Parameters

|     |     |     |
| --- | --- | --- |
| backendConditionId: | string |  |

Returns

[BackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition)

Since

2024.20 |

|     |
| --- |
| getBackendConditions |
| getBackendConditions(): [BackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition)\[\]<br>Gets all BEx conditions. Note: Only supported for data sources associated with charts.<br>Returns<br>[BackendCondition](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition)\[\]<br>Since<br>2024.20 |

|     |
| --- |
| getComments |
| getComments(): [DataSourceComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments) <br>Deprecated This method is deprecated, use Table.getComments() instead. Returns the comments of the data source. Note: Currently, this operation is only supported for data sources associated with tables. If the data source isn't associated with a table, then undefined is returned.<br>Returns<br>[DataSourceComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments)<br>Since<br>2019.18<br>Deprecated<br>2022.20 |

|     |     |     |
| --- | --- | --- |
| getData |
| getData(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [DataCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataCell)

Returns the data cell of the selection. If no value is available for that selection, then undefined is returned. See also the documentation of Selection.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Returns

[DataCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataCell)

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| getDataSelections |
| getDataSelections(selections?: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON \| [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON, offset?: integer, limit?: integer): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]

Returns selections of data cells. Optionally, you can specify the offset and the limit, which must be zero or positive numbers. If no offset and limit are specified or are invalid, then a selection including all data cells is returned. See also the documentation of Selection or SelectionContext.

Parameters

|     |     |     |
| --- | --- | --- |
| selectionsOptional: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON \| [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON |  |
| offsetOptional: | integer |  |
| limitOptional: | integer |  |

Returns

[Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]

Since

2019.20

Last Update

2020.6 |

|     |     |     |
| --- | --- | --- |
| getDimensionFilters |
| getDimensionFilters(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]

Returns the dimension filters. They don't contain Advanced Filters. Note: Currently, they don't contain time range filters.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]

Since

2020.13 |

|     |     |     |
| --- | --- | --- |
| getDimensionProperties |
| getDimensionProperties(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [DimensionPropertyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo)\[\]

Returns the properties of the dimension. Note: Currently, this operation is only supported for data sources associated with tables.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[DimensionPropertyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo)\[\]

Since

2020.7 |

|     |
| --- |
| getDimensions |
| getDimensions(): [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo)\[\]<br>Returns all dimensions of the data source.<br>Returns<br>[DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo)\[\] |

|     |     |     |
| --- | --- | --- |
| getHierarchies |
| getHierarchies(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo)\[\]

Returns all hierarchies of the dimension.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo)\[\]

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| getHierarchy |
| getHierarchy(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo)

Returns the hierarchy set on the dimension.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo)

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| getHierarchyLevel |
| getHierarchyLevel(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): integer

Returns the hierarchy level of the dimension. This operation is only supported for data sources associated with tables, charts and optimized geo map bubble color. If the dimension is invalid or if the dimension doesn't have a hierarchy, then undefined is returned. Note: This operation isn't supported for data sources associated with charts on SAP BW models and undefined is returned. For non-active dimensions this operation is only supported for data sources associated with charts in optimized view mode.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

integer

Since

2020.11 |

|     |
| --- |
| getInfo |
| getInfo(): [DataSourceInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo)<br>Returns information about the data source.<br>Returns<br>[DataSourceInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo)<br>Since<br>2021.19 |

|     |
| --- |
| getMeasures |
| getMeasures(): [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]<br>Returns all measures of the data source.<br>Returns<br>[MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]<br>Since<br>2019.1 |

|     |     |     |
| --- | --- | --- |
| getMember |
| getMember(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, memberId: string, hierarchy?: string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)

Returns the member info object from a member ID. Note: The member ID of a member may differ depending on its dimension's hierarchy. For example, for a SAP BW system, the member ID of the same member may be "DE" for a flat presentation hierarchy and "!DE" for an actual hierarchy. Note: If the specified hierarchy doesn't exist, then undefined is returned. Note: If the data source is associated with an R visualization and you specify a hierarchy other than Alias.FlatHierarchy (flat presentation), then undefined is returned. Note: returns compounded displayId if available.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| memberId: | string |  |
| hierarchyOptional: | string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON |  |

Returns

[MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)

Since

2021.1 |

|     |     |     |
| --- | --- | --- |
| getMemberDisplayMode |
| getMemberDisplayMode(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)

Returns the display mode for members of the dimension.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)

Since

2019.1

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| getMembers |
| getMembers(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, options?: integer \| [MembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MembersOptions) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]

Returns the members of the dimension. If you specify a number, then at most this many members are returned (default: 200). If you specify members options, then you can control the returned set of members even finer. Note: If the hierarchy specified in the members options doesn't exist, then an empty array is returned. Note: If the data source is associated with an R visualization and you specify a hierarchy other than Alias.FlatHierarchy (flat presentation) in the members options, then an empty array is returned. Note: returns compounded displayId if available.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| optionsOptional: | integer \| [MembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MembersOptions) JSON |  |

Returns

[MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]

Last Update

2021.1 |

|     |
| --- |
| getRefreshPaused |
| getRefreshPaused(): [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Returns the pause mode of the data refresh. Note: This operation is only supported for data sources associated with charts or tables.<br>Returns<br>[PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Since<br>2021.18 |

|     |     |     |
| --- | --- | --- |
| getResultMember |
| getResultMember(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [ResultMemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo)

Returns the result member. It is specified by a dimension and a selection.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Returns

[ResultMemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo)

Since

2019.20 |

|     |     |     |
| --- | --- | --- |
| getResultSet |
| getResultSet(selections?: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON \| [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON, offset?: integer, limit?: integer): [ResultSet](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultSet)\[\]

Returns result sets. The result sets are specified by selections. Optionally, you can specify the offset and the limit, which must be zero or positive numbers. If no offset and limit are specified or are invalid, then a result set including all data is returned. See also the documentation of Selection or SelectionContext.

Parameters

|     |     |     |
| --- | --- | --- |
| selectionsOptional: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON \| [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON |  |
| offsetOptional: | integer |  |
| limitOptional: | integer |  |

Returns

[ResultSet](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultSet)\[\]

Since

2019.20

Last Update

2020.6 |

|     |     |     |
| --- | --- | --- |
| getVariableValues |
| getVariableValues(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]

Returns the values of the variable. Each value can be a single, multiple, or range variable value. To access its type-specific properties, cast the value to the corresponding value type based on the "type" property, using the global cast function. Note: This method may return outdated values with SAP BW dynamic filter variables. Use getDimensionFilters() instead if you are interested in their current values.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  |

Returns

[VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]

Since

2020.13 |

|     |
| --- |
| getVariables |
| getVariables(): [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]<br>Returns all variables of the data source.<br>Returns<br>[VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]<br>Since<br>2019.22 |

|     |
| --- |
| isRefreshPaused |
| isRefreshPaused(): boolean<br>Deprecated This method is deprecated, use getRefreshPaused() instead. Returns whether the data refresh is paused. If the pause mode of the data source is Auto, then false is returned.<br>Returns<br>boolean<br>Since<br>2020.20<br>Deprecated<br>2021.19 |

|     |
| --- |
| isResultEmpty |
| isResultEmpty(): boolean<br>Returns whether the result of the data source query state is empty, that is, no data cells were returned.<br>Returns<br>boolean |

|     |
| --- |
| openPromptDialog |
| openPromptDialog(): void<br>Opens the Prompt dialog for the model used by this data source. By default, this is the same as opening the Prompt dialog from the toolbar for the model used by this data source. If the widget is overriding the variables, then this is the same as opening the Prompt dialog from the widget directly. |

|     |
| --- |
| refreshData |
| refreshData(): void<br>Triggers data refresh and updates the widgets associated with the data source at the same time. Note: This operation is only supported for data sources associated with charts, tables or geo map layers. Otherwise, no data refresh is triggered.<br>Since<br>2020.1 |

|     |     |     |
| --- | --- | --- |
| removeDimensionFilter |
| removeDimensionFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void

Removes any filter that is set on the dimension. Advanced Filters aren't affected.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| removeVariableValue |
| removeVariableValue(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): void

Removes the value of the variable. By default, this removes the variable value of the variable for the data source on the application. If you remove the variable value of a variable for a data source of a widget that overrides variables, then this operation removes only the variable value for this widget. If you remove a variable value from a mandatory variable, then this operation is ignored. If you remove a variable value of a variable for a data source of a widget that overrides variables and the variable is of type text, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  |

Since

2020.3 |

|     |     |     |
| --- | --- | --- |
| setDimensionFilter |
| setDimensionFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] \| [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON): void

Sets a filter on the dimension. Any existing filter (except Advanced Filters) on the dimension is overwritten. For most dimensions, you can specify one or multiple members to be included or excluded in the filter. Note that for charts, the exclude option doesn't support Alias.MeasureDimension from SAP BW models. For date and time based dimensions, you can specify one or more time ranges to be included in the filter. For numeric dimensions, you can specify one or more filter ranges to be included in the filter. If the dimension has a hierarchy, then the specified members need to be part of this hierarchy. If they belong to a different hierarchy, then set that hierarchy with DataSource.setHierarchy() first before calling DataSource.setDimensionFilter().

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| member: | string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] \| [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON |  |

Last Update

2020.7 |

|     |     |     |
| --- | --- | --- |
| setHierarchy |
| setHierarchy(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, hierarchy: string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON): void

Sets the hierarchy on the dimension. Note: Currently, this operation is ignored for measure structures. This operation is not supported for data sources associated with geo map layers.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| hierarchy: | string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON |  |

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| setHierarchyLevel |
| setHierarchyLevel(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, level?: integer): void

Sets the hierarchy level of the dimension. If the dimension or the hierarchy level of the dimension is invalid, then this operation is ignored. The default value of the level is defined by the dimension's default level. For data sources associated with charts, the level value is optional.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| levelOptional: | integer |  |

Since

2020.11 |

|     |     |     |
| --- | --- | --- |
| setMemberDisplayMode |
| setMemberDisplayMode(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, displayMode: [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)): void

Sets the display mode for members of the dimension.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| displayMode: | [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode) |  |

Since

2019.1

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| setRefreshPaused |
| setRefreshPaused(paused: [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode) \| boolean): void

Sets the pause mode of the data refresh. The script is fully executed without waiting for all the widgets associated with the data source to be updated when their pause of data refresh is disabled. Note: This operation is only supported for data sources associated with charts or tables. For more information about the different modes, see the chapter "Use Pause Refresh Options and APIs" in SAP Analytics Cloud Help.

Parameters

|     |     |     |
| --- | --- | --- |
| paused: | [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode) \| boolean |  |

Since

2020.20

Last Update

2021.18 |

|     |     |     |
| --- | --- | --- |
| setVariableValue |
| setVariableValue(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON, options?: [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON): void

Sets the value of the variable. By default, this sets the variable value of the variable for the data source on the application. If you set the variable value of a variable for a data source of a widget that overrides variables, then this operation sets only the variable value for this widget. If you set an empty variable value to a mandatory variable, then this operation is ignored. If you set a variable value of a variable for a data source of a widget that overrides variables and the variable is of type text, then this operation is ignored. Note: The variable value will not be validated. Note: You can omit loading variable descriptions (which are displayed in the Prompt dialog and in dynamic texts) by setting the optional property loadDescriptions in the options to false.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  |
| variableValue: | string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON |  |
| optionsOptional: | [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON |  |

Since

2019.22

Last Update

2021.17 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="datasourcecomments"></a>

DataSourceComments

Since

2019.18

Last Update

2023.6

Method Summary

|     |
| --- |
| Name and Description |
| [addComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MaddComment)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Adds a comment to data cells. |
| [addComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MaddComments)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string\[\]): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]<br>Adds multiple comments to data cells. |
| [getAllComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MgetAllComments)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]<br>Returns all comments of data cells. |
| [getComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MgetComment)(commentId: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Returns a comment. |
| [removeAllComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MremoveAllComments)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): boolean<br>Removes all comments on data cells. |
| [removeComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MremoveComment)(commentId: string): boolean<br>Removes a comment. |
| [setCommentLiked](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MsetCommentLiked)(commentId: string, isLiked: boolean): boolean<br>Switches the Like flag of a comment on or off. |
| [updateComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceComments_MupdateComment)(commentId: string, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Updates a comment. |

Method Detail

|     |     |     |
| --- | --- | --- |
| addComment |
| addComment(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)

Adds a comment to data cells. The data cells are specified by the selection. If this operation was successful, then the comment is returned, and undefined if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |
| value: | string |  |

Returns

[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| addComments |
| addComments(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string\[\]): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]

Adds multiple comments to data cells. The data cells are specified by the selection. If this operation was successful, then the comments are returned, and undefined if it wasn't. Note: Not supported for SAP BW live data models.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |
| value: | string\[\] |  |

Returns

[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]

Mobile Support

Not supported on mobile devices.

Since

2020.22 |

|     |     |     |
| --- | --- | --- |
| getAllComments |
| getAllComments(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]

Returns all comments of data cells. The data cells are specified by the selection. If no comments exist, then an empty array is returned. Note: For SAP BW live data models, returns the only comment of the latest version.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Returns

[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| getComment |
| getComment(commentId: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)

Returns a comment. The comment is specified by the comment ID. If the comment ID is invalid, then undefined is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| commentId: | string |  |

Returns

[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| removeAllComments |
| removeAllComments(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): boolean

Removes all comments on data cells. The data cells are specified by the selection. If this operation was successful, then true is returned, and false if it wasn't. Note: For SAP BW live data models, removes the only comment along with all history versions.

Parameters

|     |     |     |
| --- | --- | --- |
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |

Returns

boolean

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| removeComment |
| removeComment(commentId: string): boolean

Removes a comment. The comment is specified by the comment ID. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| commentId: | string |  |

Returns

boolean

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| setCommentLiked |
| setCommentLiked(commentId: string, isLiked: boolean): boolean

Switches the Like flag of a comment on or off. The comment is specified by the comment ID. If the comment ID is valid, then true is returned, and false if it isn't. Note: Not supported for SAP BW live data models.

Parameters

|     |     |     |
| --- | --- | --- |
| commentId: | string |  |
| isLiked: | boolean |  |

Returns

boolean

Mobile Support

Not supported on mobile devices.

Since

2019.21 |

|     |     |     |
| --- | --- | --- |
| updateComment |
| updateComment(commentId: string, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)

Updates a comment. The comment is specified by the comment ID. Returns the latest comment if this operation is successful, and undefined if it fails. Note: Only supported for SAP BW live data models.

Parameters

|     |     |     |
| --- | --- | --- |
| commentId: | string |  |
| value: | string |  |

Returns

[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)

Mobile Support

Not supported on mobile devices.

Since

2023.6 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="datasourceinfo"></a>

DataSourceInfo

Since

2021.19

Property Summary

|     |
| --- |
| Name and Description |
| [modelDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PmodelDescription): string<br>Description of the model |
| [modelId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PmodelId): string<br>ID of the model |
| [modelName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PmodelName): string<br>Name of the model |
| [sourceDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PsourceDescription): string<br>Description of the SAP BW Query (for SAP BW models) or undefined (for all other models) |
| [sourceLastChangedBy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PsourceLastChangedBy): string<br>Name of the user who changed the SAP BW Query most recently (for SAP BW models) or undefined (for all other models) |
| [sourceLastRefreshedAt](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PsourceLastRefreshedAt): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Date of the last data source refresh (for SAP BW models) or undefined (for all other models) |
| [sourceName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSourceInfo_PsourceName): string<br>Name of the SAP BW Query (for SAP BW models) or undefined (for all other models) |

Property Detail

|     |
| --- |
| modelDescription |
| modelDescription: string<br>Description of the model |

|     |
| --- |
| modelId |
| modelId: string<br>ID of the model |

|     |
| --- |
| modelName |
| modelName: string<br>Name of the model |

|     |
| --- |
| sourceDescription |
| sourceDescription: string<br>Description of the SAP BW Query (for SAP BW models) or undefined (for all other models) |

|     |
| --- |
| sourceLastChangedBy |
| sourceLastChangedBy: string<br>Name of the user who changed the SAP BW Query most recently (for SAP BW models) or undefined (for all other models) |

|     |
| --- |
| sourceLastRefreshedAt |
| sourceLastRefreshedAt: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Date of the last data source refresh (for SAP BW models) or undefined (for all other models) |

|     |
| --- |
| sourceName |
| sourceName: string<br>Name of the SAP BW Query (for SAP BW models) or undefined (for all other models) |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

E



---

<a name="datauploadexecutionresponsestatus"></a>

DataUploadExecutionResponseStatus

Since

2024.17

Property Summary

|     |
| --- |
| Name and Description |
| static [Canceled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus_P_static_Canceled): [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution has been canceled. |
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus_P_static_Error): [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution ended with errors. |
| static [Success](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus_P_static_Success): [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution ended successfully. |
| static [Warning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus_P_static_Warning): [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution ended with warning. |

Property Detail

|     |
| --- |
| Canceled |
| staticCanceled: [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution has been canceled. |

|     |
| --- |
| Error |
| staticError: [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution ended with errors. |

|     |
| --- |
| Success |
| staticSuccess: [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution ended successfully. |

|     |
| --- |
| Warning |
| staticWarning: [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)<br>Execution ended with warning. |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

O

Date

Creates JavaScript Date instances which let you work with dates and times.

Method Summary

|     |
| --- |
| Name and Description |
| static [now](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_M_static_now)(): integer<br>Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. |
| static [parse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_M_static_parse)(source: string): integer<br>Parses a string representation of a date and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC. |
| static [UTC](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_M_static_UTC)(year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number): integer<br>Returns the number of milliseconds in a date since January 1, 1970, 00:00:00 UTC. |
| [getDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetDate)(): integer<br>Returns the day of the month of the specified date according to local time (where 1 represents the first day of the month). |
| [getDay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetDay)(): integer<br>Returns the day of the week of the specified date according to local time (where 0 represents Sunday). |
| [getFullYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetFullYear)(): integer<br>Returns the full year of the specified date according to local time. |
| [getHours](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetHours)(): integer<br>Returns the hour of the specified date according to local time. |
| [getMilliseconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetMilliseconds)(): number<br>Returns the milliseconds of the specified date according to local time. |
| [getMinutes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetMinutes)(): integer<br>Returns the minutes of the specified date according to local time. |
| [getMonth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetMonth)(): integer<br>Returns the month of the specified date according to local time (where 0 represents the first month of the year). |
| [getSeconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetSeconds)(): integer<br>Returns the seconds of the specified date according to local time. |
| [getTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetTime)(): integer<br>Returns the numeric value corresponding to the time for the specified date according to universal time. |
| [getTimezoneOffset](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetTimezoneOffset)(): integer<br>Returns the time zone difference, in minutes, from the current locale to universal time. |
| [getUTCDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCDate)(): integer<br>Returns the day of the month of the specified date according to universal time (where 1 represents the first day of the month). |
| [getUTCDay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCDay)(): integer<br>Returns the day of the week of the specified date according to universal time (where 0 represents Sunday). |
| [getUTCHours](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCHours)(): integer<br>Returns the hours of the specified date according to universal time. |
| [getUTCMilliseconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCMilliseconds)(): integer<br>Returns the milliseconds of the specified date according to universal time. |
| [getUTCMinutes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCMinutes)(): integer<br>Returns the minutes of the specified date according to universal time. |
| [getUTCMonth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCMonth)(): integer<br>Returns the month of the specified date according to universal time (where 0 represents the first month of the year). |
| [getUTCSeconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetUTCSeconds)(): integer<br>Returns the seconds of the specified date according to universal time. |
| [getYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MgetYear)(): integer<br>Returns the year of the specified date according to local time. |
| [setDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetDate)(day: number): integer<br>Sets the day of the month of a specified date according to local time (where 1 represents the first day of the month). |
| [setFullYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetFullYear)(year: number): integer<br>Sets the full year of a specified date according to local time. |
| [setHours](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetHours)(hour: number): integer<br>Sets the hours of a specified date according to local time. |
| [setMilliseconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetMilliseconds)(ms: number): integer<br>Sets the milliseconds of a specified date according to local time. |
| [setMinutes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetMinutes)(min: number): integer<br>Sets the minutes of a specified date according to local time. |
| [setMonth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetMonth)(month: number): integer<br>Sets the month of a specified date according to local time (where 0 represents the first month of the year). |
| [setSeconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetSeconds)(sec: number): integer<br>Sets the seconds of a specified date according to local time. |
| [setTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetTime)(timeValue: integer): integer<br>Sets the date to the time represented by a number of milliseconds since January 1, 1970, 00:00:00 UTC. |
| [setUTCDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCDate)(day: number): integer<br>Sets the day of the month of a specified date according to universal time (where 1 represents the first day of the month). |
| [setUTCFullYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCFullYear)(year: number): integer<br>Sets the full year of a specified date according to universal time. |
| [setUTCHours](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCHours)(hour: number): integer<br>Sets the hour of a specified date according to universal time. |
| [setUTCMilliseconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCMilliseconds)(ms: number): integer<br>Sets the milliseconds of a specified date according to universal time. |
| [setUTCMinutes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCMinutes)(min: number): integer<br>Sets the minutes of a specified date according to universal time. |
| [setUTCMonth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCMonth)(month: number): integer<br>Sets the month of a specified date according to universal time (where 0 represents the first month of the year). |
| [setUTCSeconds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MsetUTCSeconds)(sec: number): integer<br>Sets the seconds of a specified date according to universal time. |
| [toDateString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoDateString)(): string<br>Returns the "date" portion of a date in human readable form in American English. |
| [toISOString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoISOString)(): string<br>Converts a date to a string in ISO 8601 Extended Format. |
| [toJSON](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoJSON)(): string<br>Returns a string (using toISOString()) representing the date's value. |
| [toLocaleDateString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoLocaleDateString)(): string<br>Converts a date to a string, returning the "date" portion using the operating system's locale conventions. |
| [toLocaleTimeString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoLocaleTimeString)(): string<br>Converts a date to a string, returning the "time" portion using the operating system's locale conventions. |
| [toTimeString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoTimeString)(): string<br>Returns the "time" portion of a date in human readable form in American English. |
| [toUTCString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date_MtoUTCString)(): string<br>Converts a date to a string according to universal time. |

Method Detail

|     |     |     |
| --- | --- | --- |
| UTC |
| staticUTC(year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number): integer

Returns the number of milliseconds in a date since January 1, 1970, 00:00:00 UTC.

Parameters

|     |     |     |
| --- | --- | --- |
| year: | number |  |
| month: | number |  |
| date: | number |  |
| hourOptional: | number |  |
| minOptional: | number |  |
| secOptional: | number |  |
| msOptional: | number |  |

Returns

integer |

|     |
| --- |
| now |
| staticnow(): integer<br>Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.<br>Returns<br>integer |

|     |     |     |
| --- | --- | --- |
| parse |
| staticparse(source: string): integer

Parses a string representation of a date and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.

Parameters

|     |     |     |
| --- | --- | --- |
| source: | string |  |

Returns

integer |

|     |
| --- |
| getDate |
| getDate(): integer<br>Returns the day of the month of the specified date according to local time (where 1 represents the first day of the month).<br>Returns<br>integer |

|     |
| --- |
| getDay |
| getDay(): integer<br>Returns the day of the week of the specified date according to local time (where 0 represents Sunday).<br>Returns<br>integer |

|     |
| --- |
| getFullYear |
| getFullYear(): integer<br>Returns the full year of the specified date according to local time.<br>Returns<br>integer |

|     |
| --- |
| getHours |
| getHours(): integer<br>Returns the hour of the specified date according to local time.<br>Returns<br>integer |

|     |
| --- |
| getMilliseconds |
| getMilliseconds(): number<br>Returns the milliseconds of the specified date according to local time.<br>Returns<br>number |

|     |
| --- |
| getMinutes |
| getMinutes(): integer<br>Returns the minutes of the specified date according to local time.<br>Returns<br>integer |

|     |
| --- |
| getMonth |
| getMonth(): integer<br>Returns the month of the specified date according to local time (where 0 represents the first month of the year).<br>Returns<br>integer |

|     |
| --- |
| getSeconds |
| getSeconds(): integer<br>Returns the seconds of the specified date according to local time.<br>Returns<br>integer |

|     |
| --- |
| getTime |
| getTime(): integer<br>Returns the numeric value corresponding to the time for the specified date according to universal time.<br>Returns<br>integer |

|     |
| --- |
| getTimezoneOffset |
| getTimezoneOffset(): integer<br>Returns the time zone difference, in minutes, from the current locale to universal time.<br>Returns<br>integer |

|     |
| --- |
| getUTCDate |
| getUTCDate(): integer<br>Returns the day of the month of the specified date according to universal time (where 1 represents the first day of the month).<br>Returns<br>integer |

|     |
| --- |
| getUTCDay |
| getUTCDay(): integer<br>Returns the day of the week of the specified date according to universal time (where 0 represents Sunday).<br>Returns<br>integer |

|     |
| --- |
| getUTCHours |
| getUTCHours(): integer<br>Returns the hours of the specified date according to universal time.<br>Returns<br>integer |

|     |
| --- |
| getUTCMilliseconds |
| getUTCMilliseconds(): integer<br>Returns the milliseconds of the specified date according to universal time.<br>Returns<br>integer |

|     |
| --- |
| getUTCMinutes |
| getUTCMinutes(): integer<br>Returns the minutes of the specified date according to universal time.<br>Returns<br>integer |

|     |
| --- |
| getUTCMonth |
| getUTCMonth(): integer<br>Returns the month of the specified date according to universal time (where 0 represents the first month of the year).<br>Returns<br>integer |

|     |
| --- |
| getUTCSeconds |
| getUTCSeconds(): integer<br>Returns the seconds of the specified date according to universal time.<br>Returns<br>integer |

|     |
| --- |
| getYear |
| getYear(): integer<br>Returns the year of the specified date according to local time.<br>Returns<br>integer |

|     |     |     |
| --- | --- | --- |
| setDate |
| setDate(day: number): integer

Sets the day of the month of a specified date according to local time (where 1 represents the first day of the month). Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| day: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setFullYear |
| setFullYear(year: number): integer

Sets the full year of a specified date according to local time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| year: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setHours |
| setHours(hour: number): integer

Sets the hours of a specified date according to local time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| hour: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setMilliseconds |
| setMilliseconds(ms: number): integer

Sets the milliseconds of a specified date according to local time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| ms: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setMinutes |
| setMinutes(min: number): integer

Sets the minutes of a specified date according to local time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| min: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setMonth |
| setMonth(month: number): integer

Sets the month of a specified date according to local time (where 0 represents the first month of the year). Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| month: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setSeconds |
| setSeconds(sec: number): integer

Sets the seconds of a specified date according to local time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| sec: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setTime |
| setTime(timeValue: integer): integer

Sets the date to the time represented by a number of milliseconds since January 1, 1970, 00:00:00 UTC.

Parameters

|     |     |     |
| --- | --- | --- |
| timeValue: | integer |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCDate |
| setUTCDate(day: number): integer

Sets the day of the month of a specified date according to universal time (where 1 represents the first day of the month). Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| day: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCFullYear |
| setUTCFullYear(year: number): integer

Sets the full year of a specified date according to universal time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| year: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCHours |
| setUTCHours(hour: number): integer

Sets the hour of a specified date according to universal time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| hour: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCMilliseconds |
| setUTCMilliseconds(ms: number): integer

Sets the milliseconds of a specified date according to universal time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| ms: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCMinutes |
| setUTCMinutes(min: number): integer

Sets the minutes of a specified date according to universal time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| min: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCMonth |
| setUTCMonth(month: number): integer

Sets the month of a specified date according to universal time (where 0 represents the first month of the year). Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| month: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| setUTCSeconds |
| setUTCSeconds(sec: number): integer

Sets the seconds of a specified date according to universal time. Returns the number of milliseconds between January 1, 1970, 00:00:00 UTC and the updated date.

Parameters

|     |     |     |
| --- | --- | --- |
| sec: | number |  |

Returns

integer |

|     |
| --- |
| toDateString |
| toDateString(): string<br>Returns the "date" portion of a date in human readable form in American English.<br>Returns<br>string |

|     |
| --- |
| toISOString |
| toISOString(): string<br>Converts a date to a string in ISO 8601 Extended Format.<br>Returns<br>string |

|     |
| --- |
| toJSON |
| toJSON(): string<br>Returns a string (using toISOString()) representing the date's value.<br>Returns<br>string |

|     |
| --- |
| toLocaleDateString |
| toLocaleDateString(): string<br>Converts a date to a string, returning the "date" portion using the operating system's locale conventions.<br>Returns<br>string |

|     |
| --- |
| toLocaleTimeString |
| toLocaleTimeString(): string<br>Converts a date to a string, returning the "time" portion using the operating system's locale conventions.<br>Returns<br>string |

|     |
| --- |
| toTimeString |
| toTimeString(): string<br>Returns the "time" portion of a date in human readable form in American English.<br>Returns<br>string |

|     |
| --- |
| toUTCString |
| toUTCString(): string<br>Converts a date to a string according to universal time.<br>Returns<br>string |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="filedatasource"></a>

FileDataSource

Since

2023.13

Method Summary

|     |
| --- |
| Name and Description |
| [getDimensionFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource_MgetDimensionFilters)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]<br>Returns the dimension filters. |
| [getVariableValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource_MgetVariableValues)(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]<br>Returns the values of the variable on the story. |
| [removeDimensionFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource_MremoveDimensionFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void<br>Removes any filter that is set on the dimension. |
| [removeVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource_MremoveVariableValue)(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): void<br>Removes the value of the variable on the story. |
| [setDimensionFilterWithHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource_MsetDimensionFilterWithHierarchy)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, hierarchy: string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON, member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] \| [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON): void<br>Sets a filter on the dimension. |
| [setVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource_MsetVariableValue)(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON, options?: [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON): void<br>Sets the value of the variable on the story. |

Method Detail

|     |     |     |
| --- | --- | --- |
| getDimensionFilters |
| getDimensionFilters(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\]

Returns the dimension filters. They don't contain Advanced Filters. Note: Currently, they don't contain time range filters.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |

Returns

[FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue)\[\] |

|     |     |     |
| --- | --- | --- |
| getVariableValues |
| getVariableValues(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]

Returns the values of the variable on the story. Each value can be a single, multiple, or range variable value. To access its type-specific properties, cast the value to the corresponding value type based on the "type" property, using the global cast function.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  |

Returns

[VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\] |

|     |     |     |
| --- | --- | --- |
| removeDimensionFilter |
| removeDimensionFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void

Removes any filter that is set on the dimension. Advanced Filters aren't affected.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  | |

|     |     |     |
| --- | --- | --- |
| removeVariableValue |
| removeVariableValue(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)): void

Removes the value of the variable on the story. This removes the variable value of the variable for the data source on the story.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  | |

|     |     |     |
| --- | --- | --- |
| setDimensionFilterWithHierarchy |
| setDimensionFilterWithHierarchy(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, hierarchy: string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON, member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] \| [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON): void

Sets a filter on the dimension. Any existing filter (except Advanced Filters) on the dimension is overwritten. For most dimensions, you can specify one or multiple members to be included or excluded in the filter. For date- and time-based dimensions, you can specify one or more time ranges to be included in the filter. For numeric dimensions, you can specify one or more filter ranges to be included in the filter. The specified members need to be part of the hierarchy.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| hierarchy: | string \| [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON |  |
| member: | string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) \| [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)\[\] \| [FilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterValue) JSON \| [RangeFilterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeFilterValue)\[\]JSON |  | |

|     |     |     |
| --- | --- | --- |
| setVariableValue |
| setVariableValue(variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON, options?: [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON): void

Sets the value of the variable on the story. If you set an empty variable value to a mandatory variable, then this operation is ignored. Note: The variable value will not be validated.

Parameters

|     |     |     |
| --- | --- | --- |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  |
| variableValue: | string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON |  |
| optionsOptional: | [SetVariableValueOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions) JSON |  | |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="inputcontrol"></a>

InputControl

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2021.13

Last Update

2023.7

Method Summary

|     |
| --- |
| Name and Description |
| [getInputControlDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControl_MgetInputControlDataSource)(): [InputControlDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource)<br>Returns the data source of input control widget |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControl_EonSelect)(): void<br>Called when the user changes the selections on the input control. |

Method Detail

|     |
| --- |
| getInputControlDataSource |
| getInputControlDataSource(): [InputControlDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource)<br>Returns the data source of input control widget<br>Returns<br>[InputControlDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource)<br>Since<br>2022.7<br>Last Update<br>2022.14 |

Event Detail

|     |
| --- |
| onSelect |
| onSelect(): void<br>Called when the user changes the selections on the input control. The onSelect event is only supported for dimension member input controls and calculation input controls, while not supported for other types, such as range filters and dimension input controls.<br>Since<br>2023.7 |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="inputcontroldatasource"></a>

InputControlDataSource

Since

2022.14

Last Update

2025.7

Method Summary

|     |
| --- |
| Name and Description |
| [getActiveSelectedMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource_MgetActiveSelectedMembers)(options?: integer \| [ActiveSelectedMembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]<br>Returns the active selected dimension members. |
| [getActiveSelectedMembersWithUnbooked](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource_MgetActiveSelectedMembersWithUnbooked)(options?: integer \| [ActiveSelectedMembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]<br>Returns the active selected dimension members on the input control, including unbooked ones. |
| [isAllMembersSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource_MisAllMembersSelected)(): boolean<br>Returns whether all members have been selected on the input control. |
| [setAllMembersSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource_MsetAllMembersSelected)(): void<br>Selects all members on the input control. |
| [setSelectedMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource_MsetSelectedMembers)(member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON): void<br>Sets dimension members on the input control. |
| [setSelectedMembersWithUnbooked](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControlDataSource_MsetSelectedMembersWithUnbooked)(member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON): void<br>Sets dimension members on the input control, including unbooked ones. |

Method Detail

|     |     |     |
| --- | --- | --- |
| getActiveSelectedMembers |
| getActiveSelectedMembers(options?: integer \| [ActiveSelectedMembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]

Returns the active selected dimension members. You can define how many members are returned at most. By default it's 100 if not specified. Note: Not supported for input controls that display all available members including unbooked ones. Not supported for range filters and advanced filters. Not supported for members excluded via “Exclude selected members”, or selecting “All Members” and then deselecting. Note: Please consider the performance impact when using this API. Always try to use it on input controls with low cardinality dimensions, or turn on cascading effect to narrow down the dimension members on input controls.

Parameters

|     |     |     |
| --- | --- | --- |
| optionsOptional: | integer \| [ActiveSelectedMembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions) JSON |  |

Returns

[MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]

Last Update

2025.7 |

|     |     |     |
| --- | --- | --- |
| getActiveSelectedMembersWithUnbooked |
| getActiveSelectedMembersWithUnbooked(options?: integer \| [ActiveSelectedMembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions) JSON): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]

Returns the active selected dimension members on the input control, including unbooked ones. To use this API, ensure that the input control is either dimension member or calculation input control, and cascading effect off. Other types such as range filters aren't supported. Members excluded via “Exclude selected members”, or selecting “All Members” and then deselecting aren’t supported. You can limit the number of returned members (by default 100). Be mindful of performance impacts on high cardinality dimensions.

Parameters

|     |     |     |
| --- | --- | --- |
| optionsOptional: | integer \| [ActiveSelectedMembersOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions) JSON |  |

Returns

[MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]

Since

2024.1

Last Update

2025.7 |

|     |
| --- |
| isAllMembersSelected |
| isAllMembersSelected(): boolean<br>Returns whether all members have been selected on the input control. Note: Not supported for excluded members, range filters and advanced filters.<br>Returns<br>boolean<br>Since<br>2023.7 |

|     |
| --- |
| setAllMembersSelected |
| setAllMembersSelected(): void<br>Selects all members on the input control. Note: Not supported for excluded members, range filters and advanced filters.<br>Since<br>2023.7 |

|     |     |     |
| --- | --- | --- |
| setSelectedMembers |
| setSelectedMembers(member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON): void

Sets dimension members on the input control. The dimension members should be from the selected members configured at design time. Note: Not supported for input controls that display all available members including unbooked ones. Not supported for range filters and advanced filters. Not supported for members excluded via “Exclude selected members”, or selecting “All Members” and then deselecting.

Parameters

|     |     |     |
| --- | --- | --- |
| member: | string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON |  | |

|     |     |     |
| --- | --- | --- |
| setSelectedMembersWithUnbooked |
| setSelectedMembersWithUnbooked(member: string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON): void

Sets dimension members on the input control, including unbooked ones. To use this API, ensure that the input control is either dimension member or calculation input control, and cascading effect off. Other types such as range filters aren't supported. Members excluded via “Exclude selected members”, or selecting “All Members” and then deselecting aren’t supported. The dimension members should be from the selected members configured at design time.

Parameters

|     |     |     |
| --- | --- | --- |
| member: | string \| string\[\] \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON |  |

Since

2024.1 |

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="odataerror"></a>

ODataError\
\
Since\
\
2019.7\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [code](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataError_Pcode): string |\
| [details](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataError_Pdetails): [ODataError](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataError)\[\] |\
| [message](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataError_Pmessage): string |\
| [target](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataError_Ptarget): string |\
\
Property Detail\
\
|     |\
| --- |\
| code |\
| code: string |\
\
|     |\
| --- |\
| details |\
| details: [ODataError](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataError)\[\] |\
\
|     |\
| --- |\
| message |\
| message: string |\
\
|     |\
| --- |\
| target |\
| target: string |\
\
Type Library\
[oDataService](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLoDataService)\
\
C\
\


---

<a name="odataqueryoptions"></a>

ODataQueryOptions\
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
| [filter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataQueryOptions_Pfilter): string |\
| [orderby](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataQueryOptions_Porderby): string |\
| [select](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataQueryOptions_Pselect): string |\
| [skip](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataQueryOptions_Pskip): integer |\
| [top](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ODataQueryOptions_Ptop): integer |\
\
Property Detail\
\
|     |\
| --- |\
| filter |\
| filter: string |\
\
|     |\
| --- |\
| orderby |\
| orderby: string |\
\
|     |\
| --- |\
| select |\
| select: string |\
\
|     |\
| --- |\
| skip |\
| skip: integer |\
\
|     |\
| --- |\
| top |\
| top: integer |\
\
Type Library\
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)\
\
C\
\


---

<a name="rdataframe"></a>

RDataFrame\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RDataFrame_MgetDataSource)(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the data frame. |\
\
Method Detail\
\
|     |\
| --- |\
| getDataSource |\
| getDataSource(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the data frame.<br>Returns<br>[DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource) |\
\
Type Library\
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)\
\
C\
\


---

