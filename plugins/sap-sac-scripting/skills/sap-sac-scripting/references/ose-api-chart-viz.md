# OSE API: Chart & Visualization

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Visualization classes: Chart, Table, GeoMap, R Visualization, Value Driver Tree, and associated axis/format/rank configuration classes.

## Classes in This File

- [Chart](#chart)
- [ChartAxisScale](#chartaxisscale)
- [ChartAxisScaleEffective](#chartaxisscaleeffective)
- [ChartDataChangeInsights](#chartdatachangeinsights)
- [ChartNumberFormat](#chartnumberformat)
- [ChartQuickActionsVisibility](#chartquickactionsvisibility)
- [ChartRankOptions](#chartrankoptions)
- [GeoMap](#geomap)
- [GeoMapLayer](#geomaplayer)
- [GeoMapQuickActionsVisibility](#geomapquickactionsvisibility)
- [RVisualization](#rvisualization)
- [RVisualizationQuickActionsVisibility](#rvisualizationquickactionsvisibility)
- [RVisualizationStatus](#rvisualizationstatus)
- [Table](#table)
- [TableAxis](#tableaxis)
- [TableComments](#tablecomments)
- [TableNumberFormat](#tablenumberformat)
- [TableQuickActionsVisibility](#tablequickactionsvisibility)
- [TableRankOptions](#tablerankoptions)
- [ValueDriverTree](#valuedrivertree)

---

<a name="chart"></a>

Chart

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Last Update

2025.6

Method Summary

|     |
| --- |
| Name and Description |
| [addDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MaddDimension)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), position?: integer): void<br>Adds the dimension to the feed, at the specified position. |
| [addMeasure](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MaddMeasure)(measure: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), position?: integer): void<br>Deprecated This method is deprecated, use addMember() instead. |
| [addMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MaddMember)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), structureMember: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON, position?: integer): void<br>Adds the structure member to the feed, at the specified position. |
| [getDataChangeInsights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetDataChangeInsights)(): [ChartDataChangeInsights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights)<br>Returns the Data Change Insights of the chart. |
| [getDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetDataSource)(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the chart. |
| [getDimensions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetDimensions)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): string\[\]<br>Returns the dimensions of the feed. |
| [getEffectiveAxisScale](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetEffectiveAxisScale)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): [ChartAxisScaleEffective](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScaleEffective)<br>Returns effective scale's min/max of chart |
| [getForecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetForecast)(): [Forecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Forecast)<br>Returns the forecast of the chart. |
| [getMeasures](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetMeasures)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): string\[\]<br>Deprecated This method is deprecated, use getMembers() instead. |
| [getMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetMembers)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): string\[\]<br>Returns the structure members of the feed. |
| [getNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetNumberFormat)(): [ChartNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat)<br>Returns the chart number format. |
| [getSelections](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetSelections)(): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns the selections of the chart. |
| [getSmartGrouping](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MgetSmartGrouping)(): [SmartGrouping](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping)<br>Returns the Smart Grouping of the chart. |
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MisEnabled)(): boolean<br>Returns whether the user interaction with the chart is enabled. |
| [openDataAnalyzer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MopenDataAnalyzer)(newTab?: boolean): void<br>Opens Data Analyzer for the chart. |
| [openInNewStory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MopenInNewStory)(): void<br>Creates a new story with this widget. |
| [openSelectModelDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MopenSelectModelDialog)(): void<br>Opens the select model dialog. |
| [rankBy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MrankBy)(rankOptions: [ChartRankOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions) JSON): void<br>(Only available in optimized view mode) Creates a Top N filter to show a specified number of the lowest or highest ranked members. |
| [removeDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MremoveDimension)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): void<br>Removes the dimension from the feed. |
| [removeMeasure](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MremoveMeasure)(measure: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): void<br>Deprecated This method is deprecated, use removeMember() instead. |
| [removeMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MremoveMember)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), member: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON): void<br>Removes the structure member from the feed. |
| [removeRanking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MremoveRanking)(): void<br>(Only available in optimized view mode) Clears ranking and shows all the members with sort order retained, if applicable. |
| [removeSorting](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MremoveSorting)(): void<br>(Only available in optimized view mode) Clears sorting and shows the members in default order. |
| [setAxisScale](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsetAxisScale)(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), axisScale: [ChartAxisScale](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScale) JSON): void<br>Specifies the axis scale of chart. |
| [setBreakGroupingEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsetBreakGroupingEnabled)(enabled: boolean): void<br>(Only available in optimized view mode) Enables or disables Break Grouping when sorting. |
| [setContextMenuVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsetContextMenuVisible)(visible: boolean): void<br>Shows or hides the More Actions button and the context menu. |
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsetEnabled)(enabled: boolean): void<br>Enables or disables the user interaction with the chart. |
| [setModel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsetModel)(modelId: string, setModelOptions?: [SetModelOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetModelOptions) JSON): boolean<br>Sets the model and replaces the old one. |
| [setQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsetQuickActionsVisibility)(quickActionsVisibility: [ChartQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility)): void<br>Shows or hides Quick Actions specified by the Quick Actions visibility. |
| [sortByMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsortByMember)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)): void<br>(Only available in optimized view mode) Sorts dimension members in a chart. |
| [sortByValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_MsortByValue)(structureMember: string \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder), secondaryStructureMember?: string \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON): void<br>(Only available in optimized view mode) Sorts measure values in a chart. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onResultChanged](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_EonResultChanged)(): void<br>Called when the result set displayed by the chart changes. |
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart_EonSelect)(): void<br>Called when the user makes a selection within the chart. |

Method Detail

|     |     |     |
| --- | --- | --- |
| addDimension |
| addDimension(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), position?: integer): void

Adds the dimension to the feed, at the specified position. If no position is specified, then the dimension is added at the end of the feed.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |
| positionOptional: | integer |  |

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| addMeasure |
| addMeasure(measure: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), position?: integer): void

Deprecated This method is deprecated, use addMember() instead. Adds the measure to the feed, at the specified position. If no position is specified, then the measure is added at the end of the feed. For models with both accounts and measures, this method might operate on the accounts instead of the measures. For charts, this API only supports Feed.ValueAxis, Feed.ValueAxis2, Feed.Color and Feed.bubbleWidth.

Parameters

|     |     |     |
| --- | --- | --- |
| measure: | string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON |  |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |
| positionOptional: | integer |  |

Last Update

2019.7

Deprecated

2021.6 |

|     |     |     |
| --- | --- | --- |
| addMember |
| addMember(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), structureMember: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON, position?: integer): void

Adds the structure member to the feed, at the specified position. If no position is specified, then the member is added at the end of the feed. Specify for the structure member either a measure member for a model with measures only or an account member for a model with accounts. When the structure member is a measure, it can be only added to Feed.ValueAxis, Feed.ValueAxis2, Feed.TooltipValueAxis, Feed.Color and Feed.bubbleWidth.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |
| structureMember: | string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON |  |
| positionOptional: | integer |  |

Since

2021.6 |

|     |
| --- |
| getDataChangeInsights |
| getDataChangeInsights(): [ChartDataChangeInsights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights)<br>Returns the Data Change Insights of the chart.<br>Returns<br>[ChartDataChangeInsights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights)<br>Since<br>2021.5 |

|     |
| --- |
| getDataSource |
| getDataSource(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the chart.<br>Returns<br>[DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource) |

|     |     |     |
| --- | --- | --- |
| getDimensions |
| getDimensions(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): string\[\]

Returns the dimensions of the feed.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |

Returns

string\[\]

Since

2019.1

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| getEffectiveAxisScale |
| getEffectiveAxisScale(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): [ChartAxisScaleEffective](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScaleEffective)

Returns effective scale's min/max of chart

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |

Returns

[ChartAxisScaleEffective](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScaleEffective)

Since

2022.7 |

|     |
| --- |
| getForecast |
| getForecast(): [Forecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Forecast)<br>Returns the forecast of the chart.<br>Returns<br>[Forecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Forecast)<br>Mobile Support<br>Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| getMeasures |
| getMeasures(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): string\[\]

Deprecated This method is deprecated, use getMembers() instead. Returns the measures of the feed. For models with both accounts and measures, this method might operate on the accounts instead of the measures.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |

Returns

string\[\]

Since

2019.1

Last Update

2019.7

Deprecated

2021.6 |

|     |     |     |
| --- | --- | --- |
| getMembers |
| getMembers(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): string\[\]

Returns the structure members of the feed. The structure members are either measure members from a model with measures only or account members from a model with accounts.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |

Returns

string\[\]

Since

2021.6 |

|     |
| --- |
| getNumberFormat |
| getNumberFormat(): [ChartNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat)<br>Returns the chart number format.<br>Returns<br>[ChartNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat)<br>Since<br>2020.11 |

|     |
| --- |
| getSelections |
| getSelections(): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns the selections of the chart. You can use the elements of the returned array with DataSource.getData() to get the value of a cell. See also the documentation of Selection.<br>Returns<br>[Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Since<br>2019.7 |

|     |
| --- |
| getSmartGrouping |
| getSmartGrouping(): [SmartGrouping](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping)<br>Returns the Smart Grouping of the chart.<br>Returns<br>[SmartGrouping](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping)<br>Mobile Support<br>Not supported on mobile devices. |

|     |
| --- |
| isEnabled |
| isEnabled(): boolean<br>Returns whether the user interaction with the chart is enabled.<br>Returns<br>boolean<br>Since<br>2020.20 |

|     |     |     |
| --- | --- | --- |
| openDataAnalyzer |
| openDataAnalyzer(newTab?: boolean): void

Opens Data Analyzer for the chart.

Parameters

|     |     |     |
| --- | --- | --- |
| newTabOptional: | boolean |  |

Mobile Support

Not supported on mobile devices.

Since

2024.25 |

|     |
| --- |
| openInNewStory |
| openInNewStory(): void<br>Creates a new story with this widget.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.3 |

|     |
| --- |
| openSelectModelDialog |
| openSelectModelDialog(): void<br>Opens the select model dialog. Selecting a model replaces the model of the chart.<br>Since<br>2024.24 |

|     |     |     |
| --- | --- | --- |
| rankBy |
| rankBy(rankOptions: [ChartRankOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions) JSON): void

(Only available in optimized view mode) Creates a Top N filter to show a specified number of the lowest or highest ranked members. Note that it is not supported in charts with Structures.

Parameters

|     |     |     |
| --- | --- | --- |
| rankOptions: | [ChartRankOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions) JSON |  |

Since

2022.7 |

|     |     |     |
| --- | --- | --- |
| removeDimension |
| removeDimension(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): void

Removes the dimension from the feed.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |

Last Update

2019.7 |

|     |     |     |
| --- | --- | --- |
| removeMeasure |
| removeMeasure(measure: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON, feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): void

Deprecated This method is deprecated, use removeMember() instead. Removes the measure from the feed. For models with both accounts and measures, this method might operate on the accounts instead of the measures. For charts, this API only supports Feed.ValueAxis, Feed.ValueAxis2, Feed.Color and Feed.bubbleWidth.

Parameters

|     |     |     |
| --- | --- | --- |
| measure: | string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON |  |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |

Last Update

2019.7

Deprecated

2021.6 |

|     |     |     |
| --- | --- | --- |
| removeMember |
| removeMember(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), member: string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON): void

Removes the structure member from the feed. Specify for the structure member either a measure member for a model with measures only or an account member for a model with accounts. For charts, this API only supports Feed.ValueAxis, Feed.ValueAxis2, Feed.TooltipValueAxis, Feed.Color and Feed.bubbleWidth.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |
| member: | string \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON |  |

Since

2021.6 |

|     |
| --- |
| removeRanking |
| removeRanking(): void<br>(Only available in optimized view mode) Clears ranking and shows all the members with sort order retained, if applicable.<br>Since<br>2022.7 |

|     |
| --- |
| removeSorting |
| removeSorting(): void<br>(Only available in optimized view mode) Clears sorting and shows the members in default order.<br>Since<br>2022.7 |

|     |     |     |
| --- | --- | --- |
| setAxisScale |
| setAxisScale(feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed), axisScale: [ChartAxisScale](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScale) JSON): void

Specifies the axis scale of chart.

Parameters

|     |     |     |
| --- | --- | --- |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  |
| axisScale: | [ChartAxisScale](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScale) JSON |  |

Since

2022.7 |

|     |     |     |
| --- | --- | --- |
| setBreakGroupingEnabled |
| setBreakGroupingEnabled(enabled: boolean): void

(Only available in optimized view mode) Enables or disables Break Grouping when sorting.

Parameters

|     |     |     |
| --- | --- | --- |
| enabled: | boolean |  |

Since

2022.7 |

|     |     |     |
| --- | --- | --- |
| setContextMenuVisible |
| setContextMenuVisible(visible: boolean): void

Shows or hides the More Actions button and the context menu.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  |

Mobile Support

Not supported on mobile devices.

Since

2021.11 |

|     |     |     |
| --- | --- | --- |
| setEnabled |
| setEnabled(enabled: boolean): void

Enables or disables the user interaction with the chart.

Parameters

|     |     |     |
| --- | --- | --- |
| enabled: | boolean |  |

Since

2020.20 |

|     |     |     |
| --- | --- | --- |
| setModel |
| setModel(modelId: string, setModelOptions?: [SetModelOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetModelOptions) JSON): boolean

Sets the model and replaces the old one.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |
| setModelOptionsOptional: | [SetModelOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetModelOptions) JSON |  |

Returns

boolean

Since

2024.24

Last Update

2025.6 |

|     |     |     |
| --- | --- | --- |
| setQuickActionsVisibility |
| setQuickActionsVisibility(quickActionsVisibility: [ChartQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility)): void

Shows or hides Quick Actions specified by the Quick Actions visibility.

Parameters

|     |     |     |
| --- | --- | --- |
| quickActionsVisibility: | [ChartQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility) |  |

Mobile Support

Not supported on mobile devices.

Since

2021.11 |

|     |     |     |
| --- | --- | --- |
| sortByMember |
| sortByMember(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)): void

(Only available in optimized view mode) Sorts dimension members in a chart. You can specify the dimension that you want to sort and the sort order.

Parameters

|     |     |     |
| --- | --- | --- |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| sortOrder: | [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder) |  |

Since

2022.7 |

|     |     |     |
| --- | --- | --- |
| sortByValue |
| sortByValue(structureMember: string \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder), secondaryStructureMember?: string \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON): void

(Only available in optimized view mode) Sorts measure values in a chart. You can specify the measure that you want to sort, the sort order, and, optionally, a secondary structure member.

Parameters

|     |     |     |
| --- | --- | --- |
| structureMember: | string \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON |  |
| sortOrder: | [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder) |  |
| secondaryStructureMemberOptional: | string \| [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo) JSON \| [MeasureInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo) JSON |  |

Since

2022.7 |

Event Detail

|     |
| --- |
| onResultChanged |
| onResultChanged(): void<br>Called when the result set displayed by the chart changes. |

|     |
| --- |
| onSelect |
| onSelect(): void<br>Called when the user makes a selection within the chart. |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="chartaxisscale"></a>

ChartAxisScale

can be passed as a JSON object to method arguments

Since

2022.7

Property Summary

|     |
| --- |
| Name and Description |
| [dynamicAxisEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScale_PdynamicAxisEnabled): boolean<br>let the system dynamically set the minimum and maximum values. |
| [max](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScale_Pmax): string<br>max scale of chart |
| [min](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScale_Pmin): string<br>min scale of chart |

Property Detail

|     |
| --- |
| dynamicAxisEnabled |
| dynamicAxisEnabled: boolean<br>let the system dynamically set the minimum and maximum values. |

|     |
| --- |
| max |
| max: string<br>max scale of chart |

|     |
| --- |
| min |
| min: string<br>min scale of chart |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="chartaxisscaleeffective"></a>

ChartAxisScaleEffective

can be passed as a JSON object to method arguments

Since

2022.7

Property Summary

|     |
| --- |
| Name and Description |
| [max](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScaleEffective_Pmax): number<br>effective max scale of chart |
| [min](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScaleEffective_Pmin): number<br>effective min scale of chart |
| [tickInterval](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartAxisScaleEffective_PtickInterval): number<br>tick interval of axis scale |

Property Detail

|     |
| --- |
| max |
| max: number<br>effective max scale of chart |

|     |
| --- |
| min |
| min: number<br>effective min scale of chart |

|     |
| --- |
| tickInterval |
| tickInterval: number<br>tick interval of axis scale |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="chartdatachangeinsights"></a>

ChartDataChangeInsights

Since

2021.5

Method Summary

|     |
| --- |
| Name and Description |
| [getSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights_MgetSubscriptionLevel)(): [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Returns the subscription level. |
| [getSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights_MgetSubscriptionRange)(): [DataChangeInsightsSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange)<br>Returns the subscription range settings. |
| [setSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights_MsetSubscriptionLevel)(subscriptionLevel: [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)): void<br>Sets the subscription level. |
| [setSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartDataChangeInsights_MsetSubscriptionRange)(subscriptionRange: [DataChangeInsightsSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange) JSON): void<br>Sets the subscription range settings. |

Method Detail

|     |
| --- |
| getSubscriptionLevel |
| getSubscriptionLevel(): [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)<br>Returns the subscription level.<br>Returns<br>[DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel) |

|     |
| --- |
| getSubscriptionRange |
| getSubscriptionRange(): [DataChangeInsightsSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange)<br>Returns the subscription range settings.<br>Returns<br>[DataChangeInsightsSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange) |

|     |     |     |
| --- | --- | --- |
| setSubscriptionLevel |
| setSubscriptionLevel(subscriptionLevel: [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel)): void

Sets the subscription level.

Parameters

|     |     |     |
| --- | --- | --- |
| subscriptionLevel: | [DataChangeInsightsSubscriptionLevel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionLevel) |  | |

|     |     |     |
| --- | --- | --- |
| setSubscriptionRange |
| setSubscriptionRange(subscriptionRange: [DataChangeInsightsSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange) JSON): void

Sets the subscription range settings.

Parameters

|     |     |     |
| --- | --- | --- |
| subscriptionRange: | [DataChangeInsightsSubscriptionRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataChangeInsightsSubscriptionRange) JSON |  | |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="chartnumberformat"></a>

ChartNumberFormat

Since

2020.11

Method Summary

|     |
| --- |
| Name and Description |
| [setDecimalPlaces](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat_MsetDecimalPlaces)(decimalPlaces: integer, measures?: string\[\]): void<br>Specifies the number of decimal places for specific or all measures. |
| [setScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat_MsetScaleFormat)(scaleFormat: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat)): void<br>Specifies the scale format of the chart. |
| [setScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat_MsetScaleUnit)(scaleUnit: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit), feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): void<br>Specifies the scale unit of the labels of the feed. |
| [setSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartNumberFormat_MsetSignDisplay)(signDisplay: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay), measures?: string\[\]): void<br>Specifies how signs are displayed for specific or all measures. |

Method Detail

|     |     |     |
| --- | --- | --- |
| setDecimalPlaces |
| setDecimalPlaces(decimalPlaces: integer, measures?: string\[\]): void

Specifies the number of decimal places for specific or all measures. Number format APIs only apply to measures on axes, Feed.ValueAxis and Feed.ValueAxis2. Tooltip measures Feed.TooltipValueAxis, aren’t supported, for example. Note: Not supported for universal account models.

Parameters

|     |     |     |
| --- | --- | --- |
| decimalPlaces: | integer |  |
| measuresOptional: | string\[\] |  | |

|     |     |     |
| --- | --- | --- |
| setScaleFormat |
| setScaleFormat(scaleFormat: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat)): void

Specifies the scale format of the chart. Number format APIs only apply to measures on axes, Feed.ValueAxis and Feed.ValueAxis2. Tooltip measures Feed.TooltipValueAxis, aren’t supported, for example.

Parameters

|     |     |     |
| --- | --- | --- |
| scaleFormat: | [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |  | |

|     |     |     |
| --- | --- | --- |
| setScaleUnit |
| setScaleUnit(scaleUnit: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit), feed: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)): void

Specifies the scale unit of the labels of the feed. Number format APIs only apply to measures on axes, Feed.ValueAxis and Feed.ValueAxis2. Tooltip measures Feed.TooltipValueAxis, aren’t supported, for example.

Parameters

|     |     |     |
| --- | --- | --- |
| scaleUnit: | [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |  |
| feed: | [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed) |  | |

|     |     |     |
| --- | --- | --- |
| setSignDisplay |
| setSignDisplay(signDisplay: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay), measures?: string\[\]): void

Specifies how signs are displayed for specific or all measures. Number format APIs only apply to measures on axes, Feed.ValueAxis and Feed.ValueAxis2. Tooltip measures Feed.TooltipValueAxis, aren’t supported, for example. Note: Not supported for universal account models.

Parameters

|     |     |     |
| --- | --- | --- |
| signDisplay: | [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay) |  |
| measuresOptional: | string\[\] |  | |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="chartquickactionsvisibility"></a>

ChartQuickActionsVisibility

Since

2021.11

Last Update

2024.24

Property Summary

|     |
| --- |
| Name and Description |
| static [addComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_addComment): boolean<br>Comment |
| static [addCompoundGrowthRate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_addCompoundGrowthRate): boolean<br>CGR |
| static [breakAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_breakAxis): boolean<br>Break Axis |
| static [chartDetail](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_chartDetail): boolean<br>Applied to Chart |
| static [compareTo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_compareTo): boolean<br>Compare To |
| static [dataChangeInsights](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_dataChangeInsights): boolean<br>Data Change Insights |
| static [drill](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_drill): boolean<br>Drill |
| static [expand](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_expand): boolean<br>Expand |
| static [exporting](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_exporting): boolean<br>Export |
| static [filter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_filter): boolean<br>Filter/Exclude |
| static [forecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_forecast): boolean<br>Forecast |
| static [fullscreen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_fullscreen): boolean<br>Fullscreen |
| static [openHyperlink](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_openHyperlink): boolean<br>Open Hyperlinks |
| static [rank](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_rank): boolean<br>Ranking |
| static [selectConversions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_selectConversions): boolean<br>Select Conversions |
| static [showAsPercentage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_showAsPercentage): boolean<br>Show as Percentage |
| static [sort](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_sort): boolean<br>Sorting |
| static [titleExpandCollapse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_titleExpandCollapse): boolean<br>Collapse/Expand Title |
| static [variables](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_variables): boolean<br>variables |
| static [zoom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartQuickActionsVisibility_P_static_zoom): boolean<br>Zoom |

Property Detail

|     |
| --- |
| addComment |
| staticaddComment: boolean<br>Comment |

|     |
| --- |
| addCompoundGrowthRate |
| staticaddCompoundGrowthRate: boolean<br>CGR |

|     |
| --- |
| breakAxis |
| staticbreakAxis: boolean<br>Break Axis |

|     |
| --- |
| chartDetail |
| staticchartDetail: boolean<br>Applied to Chart<br>Since<br>2023.2 |

|     |
| --- |
| compareTo |
| staticcompareTo: boolean<br>Compare To |

|     |
| --- |
| dataChangeInsights |
| staticdataChangeInsights: boolean<br>Data Change Insights |

|     |
| --- |
| drill |
| staticdrill: boolean<br>Drill |

|     |
| --- |
| expand |
| staticexpand: boolean<br>Expand |

|     |
| --- |
| exporting |
| staticexporting: boolean<br>Export |

|     |
| --- |
| filter |
| staticfilter: boolean<br>Filter/Exclude |

|     |
| --- |
| forecast |
| staticforecast: boolean<br>Forecast |

|     |
| --- |
| fullscreen |
| staticfullscreen: boolean<br>Fullscreen |

|     |
| --- |
| openHyperlink |
| staticopenHyperlink: boolean<br>Open Hyperlinks |

|     |
| --- |
| rank |
| staticrank: boolean<br>Ranking |

|     |
| --- |
| selectConversions |
| staticselectConversions: boolean<br>Select Conversions |

|     |
| --- |
| showAsPercentage |
| staticshowAsPercentage: boolean<br>Show as Percentage |

|     |
| --- |
| sort |
| staticsort: boolean<br>Sorting |

|     |
| --- |
| titleExpandCollapse |
| statictitleExpandCollapse: boolean<br>Collapse/Expand Title<br>Since<br>2023.2 |

|     |
| --- |
| variables |
| staticvariables: boolean<br>variables<br>Since<br>2024.24 |

|     |
| --- |
| zoom |
| staticzoom: boolean<br>Zoom |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="chartrankoptions"></a>

ChartRankOptions

can be passed as a JSON object to method arguments

A set of values to describe a ranking operation on a chart.

Since

2022.7

Property Summary

|     |
| --- |
| Name and Description |
| [rankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions_PrankOrder): [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Order used for ranking. |
| [secondaryStructureMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions_PsecondaryStructureMember): string<br>Secondary structure member used for ranking |
| [structureMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions_PstructureMember): string<br>Structure member used for ranking |
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions_Pvalue): integer<br>Number of values to include in the ranking filter |
| [versionId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ChartRankOptions_PversionId): string<br>Version ID |

Property Detail

|     |
| --- |
| rankOrder |
| rankOrder: [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Order used for ranking. The values RankOrder.Top or RankOrder.Bottom, for example, correspond to a descending or an ascending order of ranking, respectively. |

|     |
| --- |
| secondaryStructureMember |
| secondaryStructureMember: string<br>Secondary structure member used for ranking |

|     |
| --- |
| structureMember |
| structureMember: string<br>Structure member used for ranking |

|     |
| --- |
| value |
| value: integer<br>Number of values to include in the ranking filter |

|     |
| --- |
| versionId |
| versionId: string<br>Version ID |

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="geomap"></a>

GeoMap

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2019.13

Last Update

2021.11

Method Summary

|     |
| --- |
| Name and Description |
| [getLayer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMap_MgetLayer)(index: integer): [GeoMapLayer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer)<br>Returns the layer. |
| [openInNewStory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMap_MopenInNewStory)(): void<br>Creates a new story with this widget. |
| [setContextMenuVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMap_MsetContextMenuVisible)(visible: boolean): void<br>Shows or hides the More Actions button and the context menu. |
| [setQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMap_MsetQuickActionsVisibility)(quickActionsVisibility: [GeoMapQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility)): void<br>Shows or hides Quick Actions specified by the Quick Actions visibility. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Method Detail

|     |     |     |
| --- | --- | --- |
| getLayer |
| getLayer(index: integer): [GeoMapLayer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer)

Returns the layer. The layer is specified by an index.

Parameters

|     |     |     |
| --- | --- | --- |
| index: | integer |  |

Returns

[GeoMapLayer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer)

Mobile Support

Not supported on mobile devices.

Since

2019.14 |

|     |
| --- |
| openInNewStory |
| openInNewStory(): void<br>Creates a new story with this widget.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.3 |

|     |     |     |
| --- | --- | --- |
| setContextMenuVisible |
| setContextMenuVisible(visible: boolean): void

Shows or hides the More Actions button and the context menu.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  |

Mobile Support

Not supported on mobile devices.

Since

2021.11 |

|     |     |     |
| --- | --- | --- |
| setQuickActionsVisibility |
| setQuickActionsVisibility(quickActionsVisibility: [GeoMapQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility)): void

Shows or hides Quick Actions specified by the Quick Actions visibility.

Parameters

|     |     |     |
| --- | --- | --- |
| quickActionsVisibility: | [GeoMapQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility) |  |

Mobile Support

Not supported on mobile devices.

Since

2021.11 |

Type Library
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)

C



---

<a name="geomaplayer"></a>

GeoMapLayer

Since

2019.13

Last Update

2023.7

Method Summary

|     |
| --- |
| Name and Description |
| [getDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer_MgetDataSource)(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>(Only available in optimized view mode) Returns the data source of the layer. |
| [getSelections](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer_MgetSelections)(): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns the selections of the layer. |
| [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer_MisVisible)(): boolean<br>Returns whether the layer is visible. |
| [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapLayer_MsetVisible)(visible: boolean): void<br>Shows or hides the layer. |

Method Detail

|     |
| --- |
| getDataSource |
| getDataSource(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>(Only available in optimized view mode) Returns the data source of the layer.<br>Returns<br>[DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Since<br>2022.7 |

|     |
| --- |
| getSelections |
| getSelections(): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns the selections of the layer. The API only works for the geo map bubble layer with a dimension as the bubble color. Otherwise, it returns an empty array. You can use the elements of the returned array with DataSource.getData() to get the value of a cell. See also the documentation of Selection.<br>Returns<br>[Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Since<br>2023.7 |

|     |
| --- |
| isVisible |
| isVisible(): boolean<br>Returns whether the layer is visible.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| setVisible |
| setVisible(visible: boolean): void

Shows or hides the layer.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

Type Library
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)

C



---

<a name="geomapquickactionsvisibility"></a>

GeoMapQuickActionsVisibility

Since

2021.11

Last Update

2023.2

Property Summary

|     |
| --- |
| Name and Description |
| static [addComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility_P_static_addComment): boolean<br>Comment |
| static [drill](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility_P_static_drill): boolean<br>Drill |
| static [filter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility_P_static_filter): boolean<br>Filter/Exclude |
| static [fullscreen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility_P_static_fullscreen): boolean<br>Fullscreen |
| static [geomapDetail](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility_P_static_geomapDetail): boolean<br>Applied to Geomap |
| static [ranking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMapQuickActionsVisibility_P_static_ranking): boolean<br>Ranking |

Property Detail

|     |
| --- |
| addComment |
| staticaddComment: boolean<br>Comment |

|     |
| --- |
| drill |
| staticdrill: boolean<br>Drill |

|     |
| --- |
| filter |
| staticfilter: boolean<br>Filter/Exclude |

|     |
| --- |
| fullscreen |
| staticfullscreen: boolean<br>Fullscreen |

|     |
| --- |
| geomapDetail |
| staticgeomapDetail: boolean<br>Applied to Geomap<br>Since<br>2023.2 |

|     |
| --- |
| ranking |
| staticranking: boolean<br>Ranking<br>Since<br>2023.2 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="rvisualization"></a>

RVisualization\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Last Update\
\
2021.11\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getDataFrame](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MgetDataFrame)(dataframeName: string): [RDataFrame](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RDataFrame)<br>Returns the data frame. |\
| [getEnvironmentValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MgetEnvironmentValues)(): [REnvironmentValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#REnvironmentValues)<br>Returns the environment values. |\
| [getInputParameters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MgetInputParameters)(): [RInputParameters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters)<br>Returns the input parameters. |\
| [getMessages](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MgetMessages)(): string\[\]<br>Returns the console output. |\
| [getStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MgetStatus)(): [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>Returns the execution status of the R code. |\
| [openInNewStory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MopenInNewStory)(): void<br>Creates a new story with this widget. |\
| [setContextMenuVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MsetContextMenuVisible)(visible: boolean): void<br>Shows or hides the More Actions button and the context menu. |\
| [setHyperlink](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MsetHyperlink)(type: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType), value?: string): void<br>Sets the hyperlink that the R widget will navigate to. |\
| [setQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_MsetQuickActionsVisibility)(quickActionsVisibility: [RVisualizationQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationQuickActionsVisibility)): void<br>Shows or hides Quick Actions specified by the Quick Actions visibility. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onResultChanged](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization_EonResultChanged)(): void<br>Called when the result set in the R visualization changes. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| getDataFrame |\
| getDataFrame(dataframeName: string): [RDataFrame](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RDataFrame)\
\
Returns the data frame.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dataframeName: | string |  |\
\
Returns\
\
[RDataFrame](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RDataFrame)\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |\
| --- |\
| getEnvironmentValues |\
| getEnvironmentValues(): [REnvironmentValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#REnvironmentValues)<br>Returns the environment values.<br>Returns<br>[REnvironmentValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#REnvironmentValues)<br>Mobile Support<br>Not supported on mobile devices. |\
\
|     |\
| --- |\
| getInputParameters |\
| getInputParameters(): [RInputParameters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters)<br>Returns the input parameters.<br>Returns<br>[RInputParameters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters)<br>Mobile Support<br>Not supported on mobile devices. |\
\
|     |\
| --- |\
| getMessages |\
| getMessages(): string\[\]<br>Returns the console output.<br>Returns<br>string\[\]<br>Mobile Support<br>Not supported on mobile devices. |\
\
|     |\
| --- |\
| getStatus |\
| getStatus(): [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>Returns the execution status of the R code.<br>Returns<br>[RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>Mobile Support<br>Not supported on mobile devices. |\
\
|     |\
| --- |\
| openInNewStory |\
| openInNewStory(): void<br>Creates a new story with this widget.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.3 |\
\
|     |     |     |\
| --- | --- | --- |\
| setContextMenuVisible |\
| setContextMenuVisible(visible: boolean): void\
\
Shows or hides the More Actions button and the context menu.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| visible: | boolean |  |\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2021.11 |\
\
|     |     |     |\
| --- | --- | --- |\
| setHyperlink |\
| setHyperlink(type: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType), value?: string): void\
\
Sets the hyperlink that the R widget will navigate to.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| type: | [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType) |  |\
| valueOptional: | string |  |\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2019.21 |\
\
|     |     |     |\
| --- | --- | --- |\
| setQuickActionsVisibility |\
| setQuickActionsVisibility(quickActionsVisibility: [RVisualizationQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationQuickActionsVisibility)): void\
\
Shows or hides Quick Actions specified by the Quick Actions visibility.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| quickActionsVisibility: | [RVisualizationQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationQuickActionsVisibility) |  |\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2021.11 |\
\
Event Detail\
\
|     |\
| --- |\
| onResultChanged |\
| onResultChanged(): void<br>Called when the result set in the R visualization changes. |\
\
Type Library\
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)\
\
C\
\


---

<a name="rvisualizationquickactionsvisibility"></a>

RVisualizationQuickActionsVisibility\
\
Since\
\
2021.11\
\
Last Update\
\
2023.3\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [addComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationQuickActionsVisibility_P_static_addComment): boolean<br>Comment |\
| static [fullscreen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationQuickActionsVisibility_P_static_fullscreen): boolean<br>Fullscreen |\
| static [rDetail](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationQuickActionsVisibility_P_static_rDetail): boolean<br>Applied to R Visualization |\
\
Property Detail\
\
|     |\
| --- |\
| addComment |\
| staticaddComment: boolean<br>Comment |\
\
|     |\
| --- |\
| fullscreen |\
| staticfullscreen: boolean<br>Fullscreen |\
\
|     |\
| --- |\
| rDetail |\
| staticrDetail: boolean<br>Applied to R Visualization<br>Since<br>2023.3 |\
\
Type Library\
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)\
\
E\
\


---

<a name="rvisualizationstatus"></a>

RVisualizationStatus\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus_P_static_Error): [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>The R request failed to execute the R script. |\
| static [Running](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus_P_static_Running): [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>The R request is processed by the R server. |\
| static [Success](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus_P_static_Success): [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>The R request was executed successfully. |\
\
Property Detail\
\
|     |\
| --- |\
| Error |\
| staticError: [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>The R request failed to execute the R script. |\
\
|     |\
| --- |\
| Running |\
| staticRunning: [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>The R request is processed by the R server. |\
\
|     |\
| --- |\
| Success |\
| staticSuccess: [RVisualizationStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualizationStatus)<br>The R request was executed successfully. |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
C\
\


---

<a name="table"></a>

Table\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Last Update\
\
2025.13\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [addDimensionToColumns](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MaddDimensionToColumns)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, position?: integer): void<br>Adds the dimension to the Columns axis, at the specified position. |\
| [addDimensionToRows](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MaddDimensionToRows)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, position?: integer): void<br>Adds the dimension to the Rows axis, at the specified position. |\
| [closeNavigationPanel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_McloseNavigationPanel)(): void<br>Closes the navigation panel. |\
| [getActiveDimensionProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetActiveDimensionProperties)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): string\[\]<br>Returns the IDs of the currently active properties of the dimension. |\
| [getColumnCount](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetColumnCount)(): integer<br>Returns the number of columns of the table. |\
| [getComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetComments)(): [TableComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments)<br>Returns the comments of the data source. |\
| [getDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetDataSource)(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the table. |\
| [getDimensionsOnColumns](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetDimensionsOnColumns)(): string\[\]<br>Returns the dimensions on the Columns axis. |\
| [getDimensionsOnRows](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetDimensionsOnRows)(): string\[\]<br>Returns the dimensions on the Rows axis. |\
| [getNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetNumberFormat)(): [TableNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat)<br>Returns the table number format. |\
| [getPlanning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetPlanning)(): [Planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning)<br>Returns the Planning object of the table. |\
| [getRowCount](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetRowCount)(): integer<br>Returns the number of rows of the table. |\
| [getSelections](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MgetSelections)(): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns the selections of the table. |\
| [isCompactDisplayEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MisCompactDisplayEnabled)(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)): boolean<br>Returns whether the compact display is enabled for the axis. |\
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MisEnabled)(): boolean<br>Returns whether the user interaction with the table is enabled. |\
| [isZeroSuppressionEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MisZeroSuppressionEnabled)(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)): boolean<br>Returns whether zero suppression is enabled for the axis. |\
| [openDataAnalyzer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MopenDataAnalyzer)(newTab?: boolean): void<br>Opens Data Analyzer for the table. |\
| [openInNewStory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MopenInNewStory)(): void<br>Creates a new story with this widget. |\
| [openNavigationPanel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MopenNavigationPanel)(navigationPanelOptions?: [NavigationPanelOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationPanelOptions) JSON): void<br>Opens the navigation panel. |\
| [openSelectModelDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MopenSelectModelDialog)(): void<br>Opens the select model dialog. |\
| [rankBy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MrankBy)(rankOptions: [TableRankOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions) JSON): void<br>Creates a Top N filter to show a specified number of the lowest or highest ranked values. |\
| [removeDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MremoveDimension)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void<br>Removes the dimension from whichever axis it is present on. |\
| [removeRanking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MremoveRanking)(): void<br>Clears ranking and shows all the members with sort order retained, if applicable. |\
| [removeSorting](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MremoveSorting)(): void<br>Clears sorting and shows the members in default order. |\
| [setActiveDimensionProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetActiveDimensionProperties)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, properties: string\[\] \| [DimensionPropertyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo)\[\]): void<br>Sets the active properties of the dimension. |\
| [setBreakGroupingEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetBreakGroupingEnabled)(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis), enabled: boolean): void<br>Enables or disables Break Grouping when sorting. |\
| [setCompactDisplayEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetCompactDisplayEnabled)(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis), enabled: boolean): void<br>Enables or disables the compact display for the axis. |\
| [setContextMenuVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetContextMenuVisible)(visible: boolean): void<br>Shows or hides the More Actions button and the context menu. |\
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetEnabled)(enabled: boolean): void<br>Enables or disables the user interaction with the table. |\
| [setModel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetModel)(modelId: string): boolean<br>Sets the model and replaces the old one. |\
| [setQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetQuickActionsVisibility)(quickActionsVisibility: [TableQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility)): void<br>Shows or hides Quick Actions specified by the Quick Actions visibility. |\
| [setZeroSuppressionEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsetZeroSuppressionEnabled)(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis), enabled: boolean): void<br>Enables or disables zero suppression for the axis. |\
| [sortByMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsortByMember)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)): void<br>Sorts dimension members in a table. |\
| [sortByValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_MsortByValue)(relatedDimensions: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder), direction: [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)): void<br>Sorts measure values in a table. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onAfterDataEntryProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_EonAfterDataEntryProcess)(cells: [IChangedCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#IChangedCell)\[\], effectiveContext: [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON): void<br>Called when the table data is changed via manual data entry, copy and paste, or submitData() API. |\
| [onResultChanged](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_EonResultChanged)(): void<br>Called when the result set displayed by the table changes. |\
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table_EonSelect)(): void<br>Called when the user makes a selection within the table. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| addDimensionToColumns |\
| addDimensionToColumns(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, position?: integer): void\
\
Adds the dimension to the Columns axis, at the specified position. If no position is specified, then the dimension is added as the last dimension of the Columns axis.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
| positionOptional: | integer |  |\
\
Last Update\
\
2019.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| addDimensionToRows |\
| addDimensionToRows(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, position?: integer): void\
\
Adds the dimension to the Rows axis, at the specified position. If no position is specified, then the dimension is added as the last dimension of the Rows axis.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
| positionOptional: | integer |  |\
\
Last Update\
\
2019.7 |\
\
|     |\
| --- |\
| closeNavigationPanel |\
| closeNavigationPanel(): void<br>Closes the navigation panel.<br>Since<br>2020.13 |\
\
|     |     |     |\
| --- | --- | --- |\
| getActiveDimensionProperties |\
| getActiveDimensionProperties(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): string\[\]\
\
Returns the IDs of the currently active properties of the dimension.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
\
Returns\
\
string\[\]\
\
Since\
\
2020.7 |\
\
|     |\
| --- |\
| getColumnCount |\
| getColumnCount(): integer<br>Returns the number of columns of the table.<br>Returns<br>integer<br>Since<br>2019.20<br>Last Update<br>2020.6 |\
\
|     |\
| --- |\
| getComments |\
| getComments(): [TableComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments)<br>Returns the comments of the data source. Note: Currently, this operation is only supported for data sources associated with tables. If the data source isn't associated with a table, then undefined is returned.<br>Returns<br>[TableComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments)<br>Since<br>2022.20 |\
\
|     |\
| --- |\
| getDataSource |\
| getDataSource(): [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)<br>Returns the data source of the table.<br>Returns<br>[DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource) |\
\
|     |\
| --- |\
| getDimensionsOnColumns |\
| getDimensionsOnColumns(): string\[\]<br>Returns the dimensions on the Columns axis.<br>Returns<br>string\[\]<br>Since<br>2019.1<br>Last Update<br>2019.7 |\
\
|     |\
| --- |\
| getDimensionsOnRows |\
| getDimensionsOnRows(): string\[\]<br>Returns the dimensions on the Rows axis.<br>Returns<br>string\[\]<br>Since<br>2019.1<br>Last Update<br>2019.7 |\
\
|     |\
| --- |\
| getNumberFormat |\
| getNumberFormat(): [TableNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat)<br>Returns the table number format.<br>Returns<br>[TableNumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat)<br>Since<br>2020.11 |\
\
|     |\
| --- |\
| getPlanning |\
| getPlanning(): [Planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning)<br>Returns the Planning object of the table. If the data source associated with the table doesn't support planning, then undefined is returned.<br>Returns<br>[Planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning)<br>Since<br>2019.3 |\
\
|     |\
| --- |\
| getRowCount |\
| getRowCount(): integer<br>Returns the number of rows of the table.<br>Returns<br>integer<br>Since<br>2019.20<br>Last Update<br>2020.6 |\
\
|     |\
| --- |\
| getSelections |\
| getSelections(): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Returns the selections of the table. You can use elements of the returned array with DataSource.getData() to get the value of a cell. See also the documentation of Selection.<br>Returns<br>[Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]<br>Since<br>2019.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| isCompactDisplayEnabled |\
| isCompactDisplayEnabled(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)): boolean\
\
Returns whether the compact display is enabled for the axis. Note: Compact display is only supported for SAP BW models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| axis: | [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis) |  |\
\
Returns\
\
boolean\
\
Since\
\
2020.7 |\
\
|     |\
| --- |\
| isEnabled |\
| isEnabled(): boolean<br>Returns whether the user interaction with the table is enabled.<br>Returns<br>boolean<br>Since<br>2020.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| isZeroSuppressionEnabled |\
| isZeroSuppressionEnabled(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)): boolean\
\
Returns whether zero suppression is enabled for the axis. Note: Zero suppression is only supported for SAP BW models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| axis: | [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis) |  |\
\
Returns\
\
boolean\
\
Since\
\
2020.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| openDataAnalyzer |\
| openDataAnalyzer(newTab?: boolean): void\
\
Opens Data Analyzer for the table.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| newTabOptional: | boolean |  |\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2024.25 |\
\
|     |\
| --- |\
| openInNewStory |\
| openInNewStory(): void<br>Creates a new story with this widget.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.3 |\
\
|     |     |     |\
| --- | --- | --- |\
| openNavigationPanel |\
| openNavigationPanel(navigationPanelOptions?: [NavigationPanelOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationPanelOptions) JSON): void\
\
Opens the navigation panel. Note: This operation is ignored if the table is contained in a mobile application or a popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| navigationPanelOptionsOptional: | [NavigationPanelOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationPanelOptions) JSON |  |\
\
Since\
\
2020.13 |\
\
|     |\
| --- |\
| openSelectModelDialog |\
| openSelectModelDialog(): void<br>Opens the select model dialog. Selecting a model replaces the model of the table.<br>Since<br>2020.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| rankBy |\
| rankBy(rankOptions: [TableRankOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions) JSON): void\
\
Creates a Top N filter to show a specified number of the lowest or highest ranked values.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| rankOptions: | [TableRankOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions) JSON |  |\
\
Since\
\
2021.19 |\
\
|     |     |     |\
| --- | --- | --- |\
| removeDimension |\
| removeDimension(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): void\
\
Removes the dimension from whichever axis it is present on. If the dimension is neither on the Rows nor Columns axis, then this operation is ignored.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
\
Last Update\
\
2019.7 |\
\
|     |\
| --- |\
| removeRanking |\
| removeRanking(): void<br>Clears ranking and shows all the members with sort order retained, if applicable.<br>Since<br>2021.19 |\
\
|     |\
| --- |\
| removeSorting |\
| removeSorting(): void<br>Clears sorting and shows the members in default order.<br>Since<br>2021.19 |\
\
|     |     |     |\
| --- | --- | --- |\
| setActiveDimensionProperties |\
| setActiveDimensionProperties(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, properties: string\[\] \| [DimensionPropertyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo)\[\]): void\
\
Sets the active properties of the dimension.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
| properties: | string\[\] \| [DimensionPropertyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo)\[\] |  |\
\
Since\
\
2020.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| setBreakGroupingEnabled |\
| setBreakGroupingEnabled(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis), enabled: boolean): void\
\
Enables or disables Break Grouping when sorting.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| axis: | [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis) |  |\
| enabled: | boolean |  |\
\
Since\
\
2021.19 |\
\
|     |     |     |\
| --- | --- | --- |\
| setCompactDisplayEnabled |\
| setCompactDisplayEnabled(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis), enabled: boolean): void\
\
Enables or disables the compact display for the axis. Note: Compact display is only supported for SAP BW models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| axis: | [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis) |  |\
| enabled: | boolean |  |\
\
Since\
\
2020.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| setContextMenuVisible |\
| setContextMenuVisible(visible: boolean): void\
\
Shows or hides the More Actions button and the context menu.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| visible: | boolean |  |\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2021.11 |\
\
|     |     |     |\
| --- | --- | --- |\
| setEnabled |\
| setEnabled(enabled: boolean): void\
\
Enables or disables the user interaction with the table.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| enabled: | boolean |  |\
\
Since\
\
2020.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| setModel |\
| setModel(modelId: string): boolean\
\
Sets the model and replaces the old one.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| modelId: | string |  |\
\
Returns\
\
boolean\
\
Since\
\
2020.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| setQuickActionsVisibility |\
| setQuickActionsVisibility(quickActionsVisibility: [TableQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility)): void\
\
Shows or hides Quick Actions specified by the Quick Actions visibility.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| quickActionsVisibility: | [TableQuickActionsVisibility](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility) |  |\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2021.11 |\
\
|     |     |     |\
| --- | --- | --- |\
| setZeroSuppressionEnabled |\
| setZeroSuppressionEnabled(axis: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis), enabled: boolean): void\
\
Enables or disables zero suppression for the axis. Note: Zero suppression is only supported for SAP BW models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| axis: | [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis) |  |\
| enabled: | boolean |  |\
\
Since\
\
2020.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| sortByMember |\
| sortByMember(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder)): void\
\
Sorts dimension members in a table. You can specify the dimension that you want to sort and the sort order. Note: Creating a custom order for members in a table isn't supported.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
| sortOrder: | [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder) |  |\
\
Since\
\
2021.19 |\
\
|     |     |     |\
| --- | --- | --- |\
| sortByValue |\
| sortByValue(relatedDimensions: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, sortOrder: [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder), direction: [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)): void\
\
Sorts measure values in a table. You can specify the related dimensions, the sort order, and the sort direction in the table.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| relatedDimensions: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
| sortOrder: | [SortOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SortOrder) |  |\
| direction: | [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction) |  |\
\
Since\
\
2021.19 |\
\
Event Detail\
\
|     |     |     |\
| --- | --- | --- |\
| onAfterDataEntryProcess |\
| onAfterDataEntryProcess(cells: [IChangedCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#IChangedCell)\[\], effectiveContext: [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON): void\
\
Called when the table data is changed via manual data entry, copy and paste, or submitData() API.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| cells: | [IChangedCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#IChangedCell)\[\] |  |\
| effectiveContext: | [SelectionContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SelectionContext) JSON |  |\
\
Since\
\
2024.25 |\
\
|     |\
| --- |\
| onResultChanged |\
| onResultChanged(): void<br>Called when the result set displayed by the table changes.<br>Since<br>2025.13 |\
\
|     |\
| --- |\
| onSelect |\
| onSelect(): void<br>Called when the user makes a selection within the table.<br>Since<br>2025.13 |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\
E\
\


---

<a name="tableaxis"></a>

TableAxis\
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
| static [Columns](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis_P_static_Columns): [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)<br>Columns axis of a table |\
| static [Rows](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis_P_static_Rows): [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)<br>Rows axis of a table |\
\
Property Detail\
\
|     |\
| --- |\
| Columns |\
| staticColumns: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)<br>Columns axis of a table |\
\
|     |\
| --- |\
| Rows |\
| staticRows: [TableAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableAxis)<br>Rows axis of a table |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\
C\
\


---

<a name="tablecomments"></a>

TableComments\
\
Since\
\
2022.20\
\
Last Update\
\
2023.6\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [addComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MaddComment)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Adds a comment to data cells. |\
| [addComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MaddComments)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string\[\]): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]<br>Adds multiple comments to data cells. |\
| [getAllComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MgetAllComments)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]<br>Returns all comments of data cells. |\
| [getComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MgetComment)(commentId: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Returns a comment. |\
| [getDimensionComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MgetDimensionComment)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Returns the dimension comment of a data cell. |\
| [removeAllComments](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MremoveAllComments)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): boolean<br>Removes all comments on data cells. |\
| [removeComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MremoveComment)(commentId: string): boolean<br>Removes a comment. |\
| [removeDimensionComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MremoveDimensionComment)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): void<br>Removes the dimension comment of a data cell. |\
| [setCommentLiked](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MsetCommentLiked)(commentId: string, isLiked: boolean): boolean<br>Switches the Like flag of a comment on or off. |\
| [setDimensionComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MsetDimensionComment)(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): void<br>Sets the dimension comment of a data cell. |\
| [updateComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableComments_MupdateComment)(commentId: string, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)<br>Updates a comment. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| addComment |\
| addComment(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Adds a comment to data cells. The data cells are specified by the selection. If this operation was successful, then the comment is returned, and undefined if it wasn't.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
| value: | string |  |\
\
Returns\
\
[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| addComments |\
| addComments(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string\[\]): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]\
\
Adds multiple comments to data cells. The data cells are specified by the selection. If this operation was successful, then the comments are returned, and undefined if it wasn't. Note: Not supported for SAP BW live data models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
| value: | string\[\] |  |\
\
Returns\
\
[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| getAllComments |\
| getAllComments(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]\
\
Returns all comments of data cells. The data cells are specified by the selection. If no comments exist, then an empty array is returned. Note: For SAP BW live data models, returns the only comment of the latest version.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
\
Returns\
\
[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\[\]\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| getComment |\
| getComment(commentId: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Returns a comment. The comment is specified by the comment ID. If the comment ID is invalid, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| commentId: | string |  |\
\
Returns\
\
[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| getDimensionComment |\
| getDimensionComment(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Returns the dimension comment of a data cell. The data cell is specified by the selection. If no dimension comment exists, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
\
Returns\
\
[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| removeAllComments |\
| removeAllComments(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): boolean\
\
Removes all comments on data cells. The data cells are specified by the selection. If this operation was successful, then true is returned, and false if it wasn't. Note: For SAP BW live data models, removes the only comment along with all history versions.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
\
Returns\
\
boolean\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| removeComment |\
| removeComment(commentId: string): boolean\
\
Removes a comment. The comment is specified by the comment ID. If this operation was successful, then true is returned, and false if it wasn't.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| commentId: | string |  |\
\
Returns\
\
boolean\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| removeDimensionComment |\
| removeDimensionComment(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON): void\
\
Removes the dimension comment of a data cell. The data cell is specified by the selection.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| setCommentLiked |\
| setCommentLiked(commentId: string, isLiked: boolean): boolean\
\
Switches the Like flag of a comment on or off. The comment is specified by the comment ID. If the comment ID is valid, then true is returned, and false if it isn't. Note: Not supported for SAP BW live data models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| commentId: | string |  |\
| isLiked: | boolean |  |\
\
Returns\
\
boolean\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| setDimensionComment |\
| setDimensionComment(selection: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): void\
\
Sets the dimension comment of a data cell. The data cell is specified by the selection.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selection: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
| value: | string |  |\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| updateComment |\
| updateComment(commentId: string, value: string): [CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Updates a comment. The comment is specified by the comment ID. Returns the latest comment if this operation is successful, and undefined if it fails. Note: Only supported for SAP BW live data models.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| commentId: | string |  |\
| value: | string |  |\
\
Returns\
\
[CommentInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo)\
\
Mobile Support\
\
Not supported on mobile devices.\
\
Since\
\
2023.6 |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\
C\
\


---

<a name="tablenumberformat"></a>

TableNumberFormat\
\
Since\
\
2020.11\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [setDecimalPlaces](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat_MsetDecimalPlaces)(decimalPlaces: integer, measures?: string\[\]): void<br>Specifies the number of decimal places for specific or all measures. |\
| [setDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat_MsetDisplayUnit)(displayUnit: [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit)): void<br>Specifies where the units or currencies of the measures are displayed. |\
| [setScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat_MsetScaleFormat)(scaleFormat: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat)): void<br>Specifies the scale format of the table. |\
| [setScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat_MsetScaleUnit)(scaleUnit: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit), measures?: string\[\]): void<br>Specifies the scale unit for specific or all measures. |\
| [setSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableNumberFormat_MsetSignDisplay)(signDisplay: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay), measures?: string\[\]): void<br>Specifies how signs are displayed for specific or all measures. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| setDecimalPlaces |\
| setDecimalPlaces(decimalPlaces: integer, measures?: string\[\]): void\
\
Specifies the number of decimal places for specific or all measures.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| decimalPlaces: | integer |  |\
| measuresOptional: | string\[\] |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setDisplayUnit |\
| setDisplayUnit(displayUnit: [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit)): void\
\
Specifies where the units or currencies of the measures are displayed.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| displayUnit: | [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setScaleFormat |\
| setScaleFormat(scaleFormat: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat)): void\
\
Specifies the scale format of the table.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| scaleFormat: | [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setScaleUnit |\
| setScaleUnit(scaleUnit: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit), measures?: string\[\]): void\
\
Specifies the scale unit for specific or all measures.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| scaleUnit: | [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |  |\
| measuresOptional: | string\[\] |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setSignDisplay |\
| setSignDisplay(signDisplay: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay), measures?: string\[\]): void\
\
Specifies how signs are displayed for specific or all measures.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| signDisplay: | [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay) |  |\
| measuresOptional: | string\[\] |  | |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\
C\
\


---

<a name="tablequickactionsvisibility"></a>

TableQuickActionsVisibility\
\
Since\
\
2021.11\
\
Last Update\
\
2023.3\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [addClientCalculation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_addClientCalculation): boolean<br>Add Calculation |\
| static [addClientRowColumn](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_addClientRowColumn): boolean<br>Add/Remove Row/Column |\
| static [addComment](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_addComment): boolean<br>Comment |\
| static [addMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_addMember): boolean<br>Add Member |\
| static [conditions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_conditions): boolean<br>Conditions |\
| static [dataLocks](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_dataLocks): boolean<br>Data Locks |\
| static [displayOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_displayOptions): boolean<br>Display Options |\
| static [distributeValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_distributeValue): boolean<br>Distribute Value |\
| static [drill](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_drill): boolean<br>Drill |\
| static [exporting](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_exporting): boolean<br>Export |\
| static [filter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_filter): boolean<br>Filter/Exclude |\
| static [freeze](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_freeze): boolean<br>Freeze |\
| static [fullscreen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_fullscreen): boolean<br>Fullscreen |\
| static [gotoHyperLink](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_gotoHyperLink): boolean<br>Go To HyperLink |\
| static [lockCell](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_lockCell): boolean<br>Lock Cell |\
| static [massDataEntry](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_massDataEntry): boolean<br>Mass Data Entry |\
| static [publish](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_publish): boolean<br>Publish |\
| static [rank](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_rank): boolean<br>Ranking |\
| static [removeCellReference](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_removeCellReference): boolean<br>Remove Reference |\
| static [revert](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_revert): boolean<br>Revert |\
| static [selectConversions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_selectConversions): boolean<br>Select Conversions |\
| static [selectHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_selectHierarchy): boolean<br>Select Hierarchy |\
| static [showHide](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_showHide): boolean<br>Show/Hide |\
| static [sort](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_sort): boolean<br>Sorting |\
| static [swapAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_swapAxis): boolean<br>Swap Axis |\
| static [tableDetail](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_tableDetail): boolean<br>Applied to Table |\
| static [undoRedoDataChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_undoRedoDataChange): boolean<br>Undo/Redo Data Entry |\
| static [valueLockManagement](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_valueLockManagement): boolean<br>Value Lock |\
| static [version](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_version): boolean<br>Version |\
| static [versionHistory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableQuickActionsVisibility_P_static_versionHistory): boolean<br>History |\
\
Property Detail\
\
|     |\
| --- |\
| addClientCalculation |\
| staticaddClientCalculation: boolean<br>Add Calculation |\
\
|     |\
| --- |\
| addClientRowColumn |\
| staticaddClientRowColumn: boolean<br>Add/Remove Row/Column |\
\
|     |\
| --- |\
| addComment |\
| staticaddComment: boolean<br>Comment |\
\
|     |\
| --- |\
| addMember |\
| staticaddMember: boolean<br>Add Member |\
\
|     |\
| --- |\
| conditions |\
| staticconditions: boolean<br>Conditions<br>Since<br>2021.18 |\
\
|     |\
| --- |\
| dataLocks |\
| staticdataLocks: boolean<br>Data Locks |\
\
|     |\
| --- |\
| displayOptions |\
| staticdisplayOptions: boolean<br>Display Options |\
\
|     |\
| --- |\
| distributeValue |\
| staticdistributeValue: boolean<br>Distribute Value |\
\
|     |\
| --- |\
| drill |\
| staticdrill: boolean<br>Drill |\
\
|     |\
| --- |\
| exporting |\
| staticexporting: boolean<br>Export |\
\
|     |\
| --- |\
| filter |\
| staticfilter: boolean<br>Filter/Exclude |\
\
|     |\
| --- |\
| freeze |\
| staticfreeze: boolean<br>Freeze |\
\
|     |\
| --- |\
| fullscreen |\
| staticfullscreen: boolean<br>Fullscreen |\
\
|     |\
| --- |\
| gotoHyperLink |\
| staticgotoHyperLink: boolean<br>Go To HyperLink<br>Since<br>2023.3 |\
\
|     |\
| --- |\
| lockCell |\
| staticlockCell: boolean<br>Lock Cell |\
\
|     |\
| --- |\
| massDataEntry |\
| staticmassDataEntry: boolean<br>Mass Data Entry |\
\
|     |\
| --- |\
| publish |\
| staticpublish: boolean<br>Publish |\
\
|     |\
| --- |\
| rank |\
| staticrank: boolean<br>Ranking |\
\
|     |\
| --- |\
| removeCellReference |\
| staticremoveCellReference: boolean<br>Remove Reference<br>Since<br>2023.3 |\
\
|     |\
| --- |\
| revert |\
| staticrevert: boolean<br>Revert |\
\
|     |\
| --- |\
| selectConversions |\
| staticselectConversions: boolean<br>Select Conversions |\
\
|     |\
| --- |\
| selectHierarchy |\
| staticselectHierarchy: boolean<br>Select Hierarchy |\
\
|     |\
| --- |\
| showHide |\
| staticshowHide: boolean<br>Show/Hide |\
\
|     |\
| --- |\
| sort |\
| staticsort: boolean<br>Sorting |\
\
|     |\
| --- |\
| swapAxis |\
| staticswapAxis: boolean<br>Swap Axis |\
\
|     |\
| --- |\
| tableDetail |\
| statictableDetail: boolean<br>Applied to Table<br>Since<br>2023.3 |\
\
|     |\
| --- |\
| undoRedoDataChange |\
| staticundoRedoDataChange: boolean<br>Undo/Redo Data Entry |\
\
|     |\
| --- |\
| valueLockManagement |\
| staticvalueLockManagement: boolean<br>Value Lock |\
\
|     |\
| --- |\
| version |\
| staticversion: boolean<br>Version |\
\
|     |\
| --- |\
| versionHistory |\
| staticversionHistory: boolean<br>History |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\
C\
\


---

<a name="tablerankoptions"></a>

TableRankOptions\
\
can be passed as a JSON object to method arguments\
\
A set of values to describe a ranking operation on a table.\
\
Since\
\
2021.19\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [applyToEachDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions_PapplyToEachDimension): boolean<br>Shows the top values for each dimension instead of for the group of dimensions. |\
| [direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions_Pdirection): [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)<br>Direction of sorting in the table. |\
| [rankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions_PrankOrder): [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Order used for ranking. |\
| [relatedDimensions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions_PrelatedDimensions): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON<br>Related dimension used for ranking |\
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TableRankOptions_Pvalue): integer<br>Number of values to include in the ranking filter |\
\
Property Detail\
\
|     |\
| --- |\
| applyToEachDimension |\
| applyToEachDimension: boolean<br>Shows the top values for each dimension instead of for the group of dimensions. If you have a hierarchical measure in your table, then this option is enabled and can't be disabled. |\
\
|     |\
| --- |\
| direction |\
| direction: [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)<br>Direction of sorting in the table. The values Direction.Vertical or Direction.Horizontal correspond to a vertical or horizontal sort direction in the table, respectively. |\
\
|     |\
| --- |\
| rankOrder |\
| rankOrder: [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Order used for ranking. The values RankOrder.Top or RankOrder.Bottom, for example, correspond to a descending or an ascending order of ranking, respectively. |\
\
|     |\
| --- |\
| relatedDimensions |\
| relatedDimensions: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON<br>Related dimension used for ranking |\
\
|     |\
| --- |\
| value |\
| value: integer<br>Number of values to include in the ranking filter |\
\
Type Library\
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)\
\
C\
\


---

<a name="valuedrivertree"></a>

ValueDriverTree\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2020.16\
\
Method Summary\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

