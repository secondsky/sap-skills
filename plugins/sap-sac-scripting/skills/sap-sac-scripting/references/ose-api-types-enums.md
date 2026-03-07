# OSE API: Types & Enums

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Enum types and type definitions: export scopes, feed types, number formats, layout units, member access modes, planning conflict types, variable values, and more.

## Classes in This File

- [BackendCondition](#backendcondition)
- [CheckboxGroup](#checkboxgroup)
- [Commenting](#commenting)
- [Composite](#composite)
- [CurrentDateTime](#currentdatetime)
- [DateFormat](#dateformat)
- [DeviceOrientation](#deviceorientation)
- [Direction](#direction)
- [ExportCsv](#exportcsv)
- [ExportExcel](#exportexcel)
- [ExportPdf](#exportpdf)
- [ExportPptx](#exportpptx)
- [ExportScope](#exportscope)
- [Feed](#feed)
- [FileUploadTrigger](#fileuploadtrigger)
- [FiscalTime](#fiscaltime)
- [FiscalTimeGranularity](#fiscaltimegranularity)
- [FlowPanel](#flowpanel)
- [Forecast](#forecast)
- [ForecastType](#forecasttype)
- [IChangedCell](#ichangedcell)
- [InputFieldStyle](#inputfieldstyle)
- [Layout](#layout)
- [LayoutUnit](#layoutunit)
- [LayoutValue](#layoutvalue)
- [LinkedAnalysis](#linkedanalysis)
- [MemberAccessMode](#memberaccessmode)
- [MemberDisplayMode](#memberdisplaymode)
- [MultiAction](#multiaction)
- [MultiActionBackgroundExecutionResponse](#multiactionbackgroundexecutionresponse)
- [MultiActionBackgroundExecutionResponseStatus](#multiactionbackgroundexecutionresponsestatus)
- [MultiActionDatetimeParameterValue](#multiactiondatetimeparametervalue)
- [MultiActionExecutionResponse](#multiactionexecutionresponse)
- [MultiActionExecutionResponseStatus](#multiactionexecutionresponsestatus)
- [MultiActionMemberParameterValue](#multiactionmemberparametervalue)
- [MultiActionNumberParameterValue](#multiactionnumberparametervalue)
- [MultiActionParameterValue](#multiactionparametervalue)
- [MultiActionParameterValueType](#multiactionparametervaluetype)
- [MultiActionStringParameterValue](#multiactionstringparametervalue)
- [MultiActionTrigger](#multiactiontrigger)
- [MultipleVariableValue](#multiplevariablevalue)
- [NumberFormat](#numberformat)
- [NumberFormatDisplayUnit](#numberformatdisplayunit)
- [NumberFormatScaleFormat](#numberformatscaleformat)
- [NumberFormatScaleUnit](#numberformatscaleunit)
- [NumberFormatSignDisplay](#numberformatsigndisplay)
- [PageDateLocation](#pagedatelocation)
- [PageNumberLocation](#pagenumberlocation)
- [PageOrientation](#pageorientation)
- [PageSize](#pagesize)
- [PauseMode](#pausemode)
- [PostMessageReceiver](#postmessagereceiver)
- [PrivatePublishConflict](#privatepublishconflict)
- [PublicPublishConflict](#publicpublishconflict)
- [Range](#range)
- [RangeVariableValue](#rangevariablevalue)
- [RankOrder](#rankorder)
- [REnvironmentValues](#renvironmentvalues)
- [ResultSet](#resultset)
- [RInputParameters](#rinputparameters)
- [ShapeStyle](#shapestyle)
- [SingleVariableValue](#singlevariablevalue)
- [SmartGrouping](#smartgrouping)
- [StringUtils](#stringutils)
- [TabStrip](#tabstrip)
- [TextStyle](#textstyle)
- [UrlType](#urltype)
- [UserType](#usertype)
- [VariableValue](#variablevalue)
- [VariableValueType](#variablevaluetype)

---

<a name="backendcondition"></a>

BackendCondition

Since

2024.20

Method Summary

|     |
| --- |
| Name and Description |
| [getProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition_MgetProperties)(): [BackendConditionProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendConditionProperties)<br>Returns properties of the BEx condition. |
| [isSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition_MisSelected)(): boolean<br>Returns whether the BEx condition is applied to the current chart. |
| [setSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendCondition_MsetSelected)(selected: boolean): void<br>Selects or deselects the BEx condition, and applies to the current chart. |

Method Detail

|     |
| --- |
| getProperties |
| getProperties(): [BackendConditionProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendConditionProperties)<br>Returns properties of the BEx condition.<br>Returns<br>[BackendConditionProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendConditionProperties) |

|     |
| --- |
| isSelected |
| isSelected(): boolean<br>Returns whether the BEx condition is applied to the current chart.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| setSelected |
| setSelected(selected: boolean): void

Selects or deselects the BEx condition, and applies to the current chart. If the condition is not applicable, the chart isn't affected.

Parameters

|     |     |     |
| --- | --- | --- |
| selected: | boolean |  | |

C



---

<a name="checkboxgroup"></a>

CheckboxGroup

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Method Summary

|     |
| --- |
| Name and Description |
| [addItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_MaddItem)(key: string, text?: string): void<br>Adds a new item to the checkbox group. |
| [getSelectedKeys](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_MgetSelectedKeys)(): string\[\]<br>Returns the keys of the selected items in the checkbox group. |
| [getSelectedTexts](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_MgetSelectedTexts)(): string\[\]<br>Returns the texts of the selected items in the checkbox group. |
| [removeAllItems](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_MremoveAllItems)(): void<br>Removes all items from the checkbox group. |
| [removeItem](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_MremoveItem)(key: string): void<br>Removes an item from the checkbox group. |
| [setSelectedKeys](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_MsetSelectedKeys)(keys: string\[\]): void<br>Selects items in the checkbox group. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup_EonSelect)(): void<br>Called when the user changes the selection of a checkbox in the checkbox group. |

Method Detail

|     |     |     |
| --- | --- | --- |
| addItem |
| addItem(key: string, text?: string): void

Adds a new item to the checkbox group. The item is specified by a key and an optional text. If the key or the text already exists, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  |
| textOptional: | string |  | |

|     |
| --- |
| getSelectedKeys |
| getSelectedKeys(): string\[\]<br>Returns the keys of the selected items in the checkbox group. If no items are selected, then an empty array is returned.<br>Returns<br>string\[\] |

|     |
| --- |
| getSelectedTexts |
| getSelectedTexts(): string\[\]<br>Returns the texts of the selected items in the checkbox group. If no items are selected, then an empty array is returned.<br>Returns<br>string\[\] |

|     |
| --- |
| removeAllItems |
| removeAllItems(): void<br>Removes all items from the checkbox group. |

|     |     |     |
| --- | --- | --- |
| removeItem |
| removeItem(key: string): void

Removes an item from the checkbox group. The item is specified by its key. If the key isn't present, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| key: | string |  | |

|     |     |     |
| --- | --- | --- |
| setSelectedKeys |
| setSelectedKeys(keys: string\[\]): void

Selects items in the checkbox group. The items are specified by their keys. If the keys aren't present, then nothing is selected.

Parameters

|     |     |     |
| --- | --- | --- |
| keys: | string\[\] |  | |

Event Detail

|     |
| --- |
| onSelect |
| onSelect(): void<br>Called when the user changes the selection of a checkbox in the checkbox group. |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="commenting"></a>

Commenting

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2021.1

Last Update

2021.5

Method Summary

|     |
| --- |
| Name and Description |
| [getCommentingDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Commenting_MgetCommentingDataSource)(): [CommentingDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentingDataSource)<br>Returns the data source of the commenting widget. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Method Detail

|     |
| --- |
| getCommentingDataSource |
| getCommentingDataSource(): [CommentingDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentingDataSource)<br>Returns the data source of the commenting widget.<br>Returns<br>[CommentingDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentingDataSource)<br>Since<br>2021.5 |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="composite"></a>

Composite

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2023.19

Last Update

2023.21

Method Summary

|     |
| --- |
| Name and Description |
| static [fireEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Composite_M_static_fireEvent)(eventName: string): [Event](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Event)<br>Fires composite interface event. |
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Composite_MhideBusyIndicator)(): void<br>Hides the busy indicator. |
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Composite_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Method Detail

|     |     |     |
| --- | --- | --- |
| fireEvent |
| staticfireEvent(eventName: string): [Event](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Event)

Fires composite interface event.

Parameters

|     |     |     |
| --- | --- | --- |
| eventName: | string |  |

Returns

[Event](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Event)

Since

2023.21 |

|     |
| --- |
| hideBusyIndicator |
| hideBusyIndicator(): void<br>Hides the busy indicator.<br>Since<br>2023.21 |

|     |     |     |
| --- | --- | --- |
| showBusyIndicator |
| showBusyIndicator(text?: string): void

Shows the busy indicator.

Parameters

|     |     |     |
| --- | --- | --- |
| textOptional: | string |  |

Since

2023.21 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

O

console

Last Update

2019.12

Method Summary

|     |
| --- |
| Name and Description |
| static [log](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#console_M_static_log)(arg: any): void<br>Outputs a message to the Web Console. |

Method Detail

|     |     |     |
| --- | --- | --- |
| log |
| staticlog(arg: any): void

Outputs a message to the Web Console.

Parameters

|     |     |     |
| --- | --- | --- |
| arg: | any |  |

Last Update

2019.12 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="currentdatetime"></a>

CurrentDateTime

Since

2023.13

Method Summary

|     |
| --- |
| Name and Description |
| static [createCalendarDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime_M_static_createCalendarDateTime)(calendartime: [CalendarTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime) JSON): [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime)<br>Creates a calendar date/time with the specified calendarTime. |
| static [createFiscalDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime_M_static_createFiscalDateTime)(modelId: string, dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, fiscalTime: [FiscalTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime) JSON): [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime)<br>Creates a fiscal date/time with the specified modelId, time-based dimension and fiscalTime. |

Method Detail

|     |     |     |
| --- | --- | --- |
| createCalendarDateTime |
| staticcreateCalendarDateTime(calendartime: [CalendarTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime) JSON): [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime)

Creates a calendar date/time with the specified calendarTime. See also the documentation of CalendarTime.

Parameters

|     |     |     |
| --- | --- | --- |
| calendartime: | [CalendarTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime) JSON |  |

Returns

[CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime) |

|     |     |     |
| --- | --- | --- |
| createFiscalDateTime |
| staticcreateFiscalDateTime(modelId: string, dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, fiscalTime: [FiscalTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime) JSON): [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime)

Creates a fiscal date/time with the specified modelId, time-based dimension and fiscalTime. See also the documentation of FiscalTime.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |
| fiscalTime: | [FiscalTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime) JSON |  |

Returns

[CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime) |

Type Library
[data-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-action)

C



---

<a name="dateformat"></a>

DateFormat

Since

2019.5

Last Update

2020.2

Method Summary

|     |
| --- |
| Name and Description |
| static [format](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DateFormat_M_static_format)(date: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), pattern?: string): string<br>Returns a string representation of the date. |

Method Detail

|     |     |     |
| --- | --- | --- |
| format |
| staticformat(date: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), pattern?: string): string

Returns a string representation of the date. Optionally, you can format the date by supplying a pattern in the Unicode Locale Data Markup Language (LDML) format. For example, with the English language set in the Profile Settings, a date representing March, 5, 2018 is formatted by the pattern "MMM dd, yyyy" as "Mar 05, 2018". Other common patterns include "yyyy/MM/dd" (resulting in "2018/03/05"), "yyyy-MM-dd" ("2018-03-05"), "yy/M/d" ("18/3/5"), "y/M/d" ("2018/3/5"), "MMM dd" ("Mar 05"), and "yyyy.QQQ" ("2018.Q1"). The letters in the patterns are case-sensitive and represent various aspects of a date. See the Date Field Symbol Table of the LDML format on the Internet for more details.

Parameters

|     |     |     |
| --- | --- | --- |
| date: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |
| patternOptional: | string |  |

Returns

string

Since

2020.2 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="deviceorientation"></a>

DeviceOrientation

Since

2020.13

Property Summary

|     |
| --- |
| Name and Description |
| static [Angle0](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation_P_static_Angle0): [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |
| static [Angle180](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation_P_static_Angle180): [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |
| static [Angle90Clockwise](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation_P_static_Angle90Clockwise): [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |
| static [Angle90Counterclockwise](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation_P_static_Angle90Counterclockwise): [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |

Property Detail

|     |
| --- |
| Angle0 |
| staticAngle0: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |

|     |
| --- |
| Angle180 |
| staticAngle180: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |

|     |
| --- |
| Angle90Clockwise |
| staticAngle90Clockwise: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |

|     |
| --- |
| Angle90Counterclockwise |
| staticAngle90Counterclockwise: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="direction"></a>

Direction

A set of values describing a direction

Since

2021.19

Property Summary

|     |
| --- |
| Name and Description |
| static [Horizontal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction_P_static_Horizontal): [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)<br>Horizontal direction |
| static [Vertical](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction_P_static_Vertical): [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)<br>Vertical direction |

Property Detail

|     |
| --- |
| Horizontal |
| staticHorizontal: [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)<br>Horizontal direction |

|     |
| --- |
| Vertical |
| staticVertical: [Direction](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Direction)<br>Vertical direction |

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="exportcsv"></a>

ExportCsv

Since

2021.5

Last Update

2024.25

Method Summary

|     |
| --- |
| Name and Description |
| [exportReport](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MexportReport)(): void<br>Exports the included table to a CSV file. |
| [getFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MgetFileName)(): string<br>Returns the filename of the exported CSV file. |
| [getScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MgetScope)(): [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Returns the scope of the exported CSV file. |
| [isAppendixIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MisAppendixIncluded)(): boolean<br>Returns whether the table metadata is included in the exported CSV file. |
| [isDateIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MisDateIncluded)(): boolean<br>Returns whether the date info is included in the appendix of the exported CSV file. |
| [isExportFormattedValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MisExportFormattedValues)(): boolean<br>Returns whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application. |
| [isHierarchyLevelsInIndividualCells](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MisHierarchyLevelsInIndividualCells)(): boolean<br>Returns whether hierarchy levels are exported in individual columns. |
| [setAppendixIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetAppendixIncluded)(included: boolean): void<br>Includes or excludes the table metadata from the exported CSV file. |
| [setDateIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetDateIncluded)(included: boolean): void<br>Includes or excludes the date info in appendix of the exported CSV file. |
| [setExportFormattedValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetExportFormattedValues)(exportFormattedValues: boolean): void<br>Specifies whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application. |
| [setFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetFileName)(text: string): void<br>Sets the filename of the exported CSV file. |
| [setHierarchyLevelsInIndividualCells](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetHierarchyLevelsInIndividualCells)(separate: boolean): void<br>Specifies whether hierarchy levels are exported in individual columns. |
| [setScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetScope)(scope: [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)): void<br>Sets the scope of the exported CSV file. |
| [setWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportCsv_MsetWidget)(table: [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table)): void<br>Sets the table of the exported CSV file. |

Method Detail

|     |
| --- |
| exportReport |
| exportReport(): void<br>Exports the included table to a CSV file.<br>Mobile Support<br>Not supported on mobile devices. |

|     |
| --- |
| getFileName |
| getFileName(): string<br>Returns the filename of the exported CSV file.<br>Returns<br>string |

|     |
| --- |
| getScope |
| getScope(): [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Returns the scope of the exported CSV file.<br>Returns<br>[ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope) |

|     |
| --- |
| isAppendixIncluded |
| isAppendixIncluded(): boolean<br>Returns whether the table metadata is included in the exported CSV file.<br>Returns<br>boolean<br>Since<br>2024.25 |

|     |
| --- |
| isDateIncluded |
| isDateIncluded(): boolean<br>Returns whether the date info is included in the appendix of the exported CSV file.<br>Returns<br>boolean<br>Since<br>2024.25 |

|     |
| --- |
| isExportFormattedValues |
| isExportFormattedValues(): boolean<br>Returns whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application.<br>Returns<br>boolean |

|     |
| --- |
| isHierarchyLevelsInIndividualCells |
| isHierarchyLevelsInIndividualCells(): boolean<br>Returns whether hierarchy levels are exported in individual columns.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| setAppendixIncluded |
| setAppendixIncluded(included: boolean): void

Includes or excludes the table metadata from the exported CSV file.

Parameters

|     |     |     |
| --- | --- | --- |
| included: | boolean |  |

Since

2024.25 |

|     |     |     |
| --- | --- | --- |
| setDateIncluded |
| setDateIncluded(included: boolean): void

Includes or excludes the date info in appendix of the exported CSV file.

Parameters

|     |     |     |
| --- | --- | --- |
| included: | boolean |  |

Since

2024.25 |

|     |     |     |
| --- | --- | --- |
| setExportFormattedValues |
| setExportFormattedValues(exportFormattedValues: boolean): void

Specifies whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application.

Parameters

|     |     |     |
| --- | --- | --- |
| exportFormattedValues: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setFileName |
| setFileName(text: string): void

Sets the filename of the exported CSV file.

Parameters

|     |     |     |
| --- | --- | --- |
| text: | string |  | |

|     |     |     |
| --- | --- | --- |
| setHierarchyLevelsInIndividualCells |
| setHierarchyLevelsInIndividualCells(separate: boolean): void

Specifies whether hierarchy levels are exported in individual columns.

Parameters

|     |     |     |
| --- | --- | --- |
| separate: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setScope |
| setScope(scope: [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)): void

Sets the scope of the exported CSV file.

Parameters

|     |     |     |
| --- | --- | --- |
| scope: | [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope) |  | |

|     |     |     |
| --- | --- | --- |
| setWidget |
| setWidget(table: [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table)): void

Sets the table of the exported CSV file.

Parameters

|     |     |     |
| --- | --- | --- |
| table: | [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table) |  | |

Type Library
[exportxlsx](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportxlsx)

C



---

<a name="exportexcel"></a>

ExportExcel

Since

2021.5

Last Update

2024.25

Method Summary

|     |
| --- |
| Name and Description |
| [exportReport](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MexportReport)(): void<br>Exports the included tables to an XLSX file. |
| [getFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MgetFileName)(): string<br>Returns the filename of the exported XLSX file. |
| [getScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MgetScope)(): [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Returns the scope of the exported XLSX file. |
| [isAppendixIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MisAppendixIncluded)(): boolean<br>Returns whether the table metadata is included in the exported XLSX file. |
| [isDateIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MisDateIncluded)(): boolean<br>Returns whether the date info is included in the appendix of the exported XLSX file. |
| [isExportFormattedValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MisExportFormattedValues)(): boolean<br>Returns whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application. |
| [isIndentedHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MisIndentedHierarchy)(): boolean<br>Returns whether to indent hierarchical data labels (row headers). |
| [setAppendixIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetAppendixIncluded)(included: boolean): void<br>Includes or excludes the table metadata from the exported XLSX file. |
| [setDateIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetDateIncluded)(date: boolean): void<br>Includes or excludes the date info in appendix of the exported XLSX file. |
| [setExportFormattedValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetExportFormattedValues)(exportFormattedValues: boolean): void<br>Specifies whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application. |
| [setFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetFileName)(text: string): void<br>Sets the filename of the exported XLSX file. |
| [setIndentedHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetIndentedHierarchy)(indentedHierarchy: boolean): void<br>Specifies whether to indent hierarchical data labels (row headers). |
| [setScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetScope)(scope: [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)): void<br>Sets the scope of the exported XLSX file. |
| [setWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportExcel_MsetWidget)(table: [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table) \| [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table)\[\]): void<br>Sets the tables of the exported XLSX file. |

Method Detail

|     |
| --- |
| exportReport |
| exportReport(): void<br>Exports the included tables to an XLSX file.<br>Mobile Support<br>Not supported on mobile devices. |

|     |
| --- |
| getFileName |
| getFileName(): string<br>Returns the filename of the exported XLSX file.<br>Returns<br>string |

|     |
| --- |
| getScope |
| getScope(): [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Returns the scope of the exported XLSX file.<br>Returns<br>[ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Since<br>2024.12 |

|     |
| --- |
| isAppendixIncluded |
| isAppendixIncluded(): boolean<br>Returns whether the table metadata is included in the exported XLSX file.<br>Returns<br>boolean |

|     |
| --- |
| isDateIncluded |
| isDateIncluded(): boolean<br>Returns whether the date info is included in the appendix of the exported XLSX file.<br>Returns<br>boolean<br>Since<br>2024.25 |

|     |
| --- |
| isExportFormattedValues |
| isExportFormattedValues(): boolean<br>Returns whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application.<br>Returns<br>boolean |

|     |
| --- |
| isIndentedHierarchy |
| isIndentedHierarchy(): boolean<br>Returns whether to indent hierarchical data labels (row headers).<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| setAppendixIncluded |
| setAppendixIncluded(included: boolean): void

Includes or excludes the table metadata from the exported XLSX file.

Parameters

|     |     |     |
| --- | --- | --- |
| included: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setDateIncluded |
| setDateIncluded(date: boolean): void

Includes or excludes the date info in appendix of the exported XLSX file.

Parameters

|     |     |     |
| --- | --- | --- |
| date: | boolean |  |

Since

2024.25 |

|     |     |     |
| --- | --- | --- |
| setExportFormattedValues |
| setExportFormattedValues(exportFormattedValues: boolean): void

Specifies whether the data values are exported using the same scaling, units, and currencies as in the model and in the analytic application.

Parameters

|     |     |     |
| --- | --- | --- |
| exportFormattedValues: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setFileName |
| setFileName(text: string): void

Sets the filename of the exported XLSX file.

Parameters

|     |     |     |
| --- | --- | --- |
| text: | string |  | |

|     |     |     |
| --- | --- | --- |
| setIndentedHierarchy |
| setIndentedHierarchy(indentedHierarchy: boolean): void

Specifies whether to indent hierarchical data labels (row headers).

Parameters

|     |     |     |
| --- | --- | --- |
| indentedHierarchy: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setScope |
| setScope(scope: [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)): void

Sets the scope of the exported XLSX file.

Parameters

|     |     |     |
| --- | --- | --- |
| scope: | [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope) |  |

Since

2024.12 |

|     |     |     |
| --- | --- | --- |
| setWidget |
| setWidget(table: [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table) \| [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table)\[\]): void

Sets the tables of the exported XLSX file.

Parameters

|     |     |     |
| --- | --- | --- |
| table: | [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table) \| [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table)\[\] |  | |

Type Library
[exportpdf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportpdf)

C



---

<a name="exportpdf"></a>

ExportPdf

Since

2019.20

Last Update

2024.7

Method Summary

|     |
| --- |
| Name and Description |
| [excludeComponent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MexcludeComponent)(component: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) \| [Popup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup)): void<br>Excludes a widget or a popup from the exported PDF file. |
| [exportReport](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MexportReport)(): void<br>Exports all included tables in full length (report) to a PDF file. |
| [exportView](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MexportView)(): boolean<br>Exports the story to a PDF file. |
| [getBatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetBatchExportDataSource)(modelId: string): [BatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource)<br>Returns the data source of related modelId. |
| [getDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetDateLocation)(): [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation)<br>Returns the location of the date in the exported PDF file. |
| [getFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetFileName)(): string<br>Returns the filename of the exported PDF file. |
| [getFooterText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetFooterText)(): string<br>Returns the text shown in the page footer of the exported PDF file. |
| [getHeaderText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetHeaderText)(): string<br>Returns the text shown in the page header of the exported PDF file. |
| [getPageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetPageNumberLocation)(): [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation)<br>Returns the location of the page number in the exported PDF file. |
| [getPageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetPageOrientation)(): [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation)<br>Returns the page orientation of the exported PDF file. |
| [getPageRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetPageRange)(): number\[\]<br>Returns the numbers of the pages to be exported to PDF. |
| [getPageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MgetPageSize)(): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize)<br>Returns the page size of the exported PDF file. |
| [includeComponent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MincludeComponent)(component: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) \| [Popup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup)): void<br>Includes a widget or a popup in the exported PDF file. |
| [isAppendixVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisAppendixVisible)(): boolean<br>Returns whether the appendix is visible in the exported PDF file. |
| [isBatchExportEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisBatchExportEnabled)(): boolean<br>Returns whether batch export is enabled. |
| [isCommentsVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisCommentsVisible)(): boolean<br>Returns whether the comments are visible in the exported PDF file. |
| [isExportInBackgroundEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisExportInBackgroundEnabled)(): boolean<br>Returns whether the export of the PDF file in the background is enabled. |
| [isFooterVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisFooterVisible)(): boolean<br>Returns whether the page footer is visible in the exported PDF file. |
| [isHeaderVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisHeaderVisible)(): boolean<br>Returns whether the page header is visible in the exported PDF file. |
| [isReportIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MisReportIncluded)(): boolean<br>Returns whether the export of all included tables in full length (report) is enabled when the analytic application is exported to a PDF file with exportView(). |
| [setAppendixVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetAppendixVisible)(visible: boolean): void<br>Shows or hides the appendix in the exported PDF file. |
| [setBatchExportEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetBatchExportEnabled)(isEnabled: boolean): void<br>Enable or disable batch export. |
| [setCommentsVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetCommentsVisible)(visible: boolean): void<br>Shows or hides the comments in the exported PDF file. |
| [setDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetDateLocation)(location: [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation)): void<br>Sets the location of the date in the exported PDF file. |
| [setExportInBackgroundEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetExportInBackgroundEnabled)(isEnabled: boolean): void<br>Enables or disables the export of the PDF file in the background. |
| [setFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetFileName)(fileName: string): void<br>Sets the filename of the exported PDF file. |
| [setFooterText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetFooterText)(text: string): void<br>Sets the text shown in the page footer of the exported PDF file. |
| [setFooterVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetFooterVisible)(visible: boolean): void<br>Shows or hides the page footer in the exported PDF file. |
| [setHeaderText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetHeaderText)(text: string): void<br>Sets the text shown in the page header of the exported PDF file. |
| [setHeaderVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetHeaderVisible)(visible: boolean): void<br>Shows or hides the page header in the exported PDF file. |
| [setPageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetPageNumberLocation)(location: [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation)): void<br>Sets the location of the page number in the exported PDF file. |
| [setPageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetPageOrientation)(orientation: [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation)): void<br>Sets the page orientation of the exported PDF file. |
| [setPageRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetPageRange)(value: number\[\]): void<br>Sets the pages to be exported to PDF. |
| [setPageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetPageSize)(size: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize)): void<br>Sets the page size of the exported PDF file. |
| [setReportIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPdf_MsetReportIncluded)(included: boolean): void<br>Includes or excludes the export of all included tables in full length (report) when the analytic application is exported to a PDF file with exportView(). |

Method Detail

|     |     |     |
| --- | --- | --- |
| excludeComponent |
| excludeComponent(component: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) \| [Popup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup)): void

Excludes a widget or a popup from the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| component: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) \| [Popup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup) |  |

Since

2020.10 |

|     |
| --- |
| exportReport |
| exportReport(): void<br>Exports all included tables in full length (report) to a PDF file.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2020.16 |

|     |
| --- |
| exportView |
| exportView(): boolean<br>Exports the story to a PDF file.<br>Returns<br>boolean<br>Mobile Support<br>Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| getBatchExportDataSource |
| getBatchExportDataSource(modelId: string): [BatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource)

Returns the data source of related modelId.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |

Returns

[BatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource)

Since

2024.7 |

|     |
| --- |
| getDateLocation |
| getDateLocation(): [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation)<br>Returns the location of the date in the exported PDF file.<br>Returns<br>[PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |

|     |
| --- |
| getFileName |
| getFileName(): string<br>Returns the filename of the exported PDF file.<br>Returns<br>string |

|     |
| --- |
| getFooterText |
| getFooterText(): string<br>Returns the text shown in the page footer of the exported PDF file.<br>Returns<br>string |

|     |
| --- |
| getHeaderText |
| getHeaderText(): string<br>Returns the text shown in the page header of the exported PDF file.<br>Returns<br>string |

|     |
| --- |
| getPageNumberLocation |
| getPageNumberLocation(): [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation)<br>Returns the location of the page number in the exported PDF file.<br>Returns<br>[PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |

|     |
| --- |
| getPageOrientation |
| getPageOrientation(): [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation)<br>Returns the page orientation of the exported PDF file.<br>Returns<br>[PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation) |

|     |
| --- |
| getPageRange |
| getPageRange(): number\[\]<br>Returns the numbers of the pages to be exported to PDF.<br>Returns<br>number\[\]<br>Since<br>2023.3 |

|     |
| --- |
| getPageSize |
| getPageSize(): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize)<br>Returns the page size of the exported PDF file.<br>Returns<br>[PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |

|     |     |     |
| --- | --- | --- |
| includeComponent |
| includeComponent(component: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) \| [Popup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup)): void

Includes a widget or a popup in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| component: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) \| [Popup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup) |  |

Since

2020.10 |

|     |
| --- |
| isAppendixVisible |
| isAppendixVisible(): boolean<br>Returns whether the appendix is visible in the exported PDF file.<br>Returns<br>boolean |

|     |
| --- |
| isBatchExportEnabled |
| isBatchExportEnabled(): boolean<br>Returns whether batch export is enabled.<br>Returns<br>boolean<br>Since<br>2024.7 |

|     |
| --- |
| isCommentsVisible |
| isCommentsVisible(): boolean<br>Returns whether the comments are visible in the exported PDF file.<br>Returns<br>boolean |

|     |
| --- |
| isExportInBackgroundEnabled |
| isExportInBackgroundEnabled(): boolean<br>Returns whether the export of the PDF file in the background is enabled.<br>Returns<br>boolean<br>Since<br>2019.23 |

|     |
| --- |
| isFooterVisible |
| isFooterVisible(): boolean<br>Returns whether the page footer is visible in the exported PDF file.<br>Returns<br>boolean |

|     |
| --- |
| isHeaderVisible |
| isHeaderVisible(): boolean<br>Returns whether the page header is visible in the exported PDF file.<br>Returns<br>boolean |

|     |
| --- |
| isReportIncluded |
| isReportIncluded(): boolean<br>Returns whether the export of all included tables in full length (report) is enabled when the analytic application is exported to a PDF file with exportView().<br>Returns<br>boolean<br>Since<br>2020.16 |

|     |     |     |
| --- | --- | --- |
| setAppendixVisible |
| setAppendixVisible(visible: boolean): void

Shows or hides the appendix in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setBatchExportEnabled |
| setBatchExportEnabled(isEnabled: boolean): void

Enable or disable batch export.

Parameters

|     |     |     |
| --- | --- | --- |
| isEnabled: | boolean |  |

Since

2024.7 |

|     |     |     |
| --- | --- | --- |
| setCommentsVisible |
| setCommentsVisible(visible: boolean): void

Shows or hides the comments in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setDateLocation |
| setDateLocation(location: [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation)): void

Sets the location of the date in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| location: | [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |  | |

|     |     |     |
| --- | --- | --- |
| setExportInBackgroundEnabled |
| setExportInBackgroundEnabled(isEnabled: boolean): void

Enables or disables the export of the PDF file in the background.

Parameters

|     |     |     |
| --- | --- | --- |
| isEnabled: | boolean |  |

Since

2019.23 |

|     |     |     |
| --- | --- | --- |
| setFileName |
| setFileName(fileName: string): void

Sets the filename of the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| fileName: | string |  | |

|     |     |     |
| --- | --- | --- |
| setFooterText |
| setFooterText(text: string): void

Sets the text shown in the page footer of the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| text: | string |  | |

|     |     |     |
| --- | --- | --- |
| setFooterVisible |
| setFooterVisible(visible: boolean): void

Shows or hides the page footer in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setHeaderText |
| setHeaderText(text: string): void

Sets the text shown in the page header of the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| text: | string |  | |

|     |     |     |
| --- | --- | --- |
| setHeaderVisible |
| setHeaderVisible(visible: boolean): void

Shows or hides the page header in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setPageNumberLocation |
| setPageNumberLocation(location: [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation)): void

Sets the location of the page number in the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| location: | [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |  | |

|     |     |     |
| --- | --- | --- |
| setPageOrientation |
| setPageOrientation(orientation: [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation)): void

Sets the page orientation of the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| orientation: | [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation) |  | |

|     |     |     |
| --- | --- | --- |
| setPageRange |
| setPageRange(value: number\[\]): void

Sets the pages to be exported to PDF. All pages are exported if you don’t specify the page numbers. Page number starts from 1.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | number\[\] |  |

Since

2023.3 |

|     |     |     |
| --- | --- | --- |
| setPageSize |
| setPageSize(size: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize)): void

Sets the page size of the exported PDF file.

Parameters

|     |     |     |
| --- | --- | --- |
| size: | [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |  | |

|     |     |     |
| --- | --- | --- |
| setReportIncluded |
| setReportIncluded(included: boolean): void

Includes or excludes the export of all included tables in full length (report) when the analytic application is exported to a PDF file with exportView().

Parameters

|     |     |     |
| --- | --- | --- |
| included: | boolean |  |

Since

2020.16 |

Type Library
[exportpptx](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportpptx)

C



---

<a name="exportpptx"></a>

ExportPptx

Since

2023.25

Last Update

2024.25

Method Summary

|     |
| --- |
| Name and Description |
| [exportView](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MexportView)(): boolean<br>Exports the story to a power point file. |
| [getBatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MgetBatchExportDataSource)(modelId: string): [BatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource)<br>Returns the data source of related modelId. |
| [getFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MgetFileName)(): string<br>Returns the filename of the exported power point file. |
| [getPageRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MgetPageRange)(): number\[\]<br>Returns the numbers of the pages to be exported to PPTX. |
| [isAppendixVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MisAppendixVisible)(): boolean<br>Returns whether the appendix is visible in the exported power point file. |
| [isBatchExportEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MisBatchExportEnabled)(): boolean<br>Returns whether batch export is enabled. |
| [isDateIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MisDateIncluded)(): boolean<br>Returns whether date is included in the appendix of the exported power point file. |
| [setAppendixVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MsetAppendixVisible)(visible: boolean): void<br>Shows or hides the appendix in the exported power point file. |
| [setBatchExportEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MsetBatchExportEnabled)(isEnabled: boolean): void<br>Enable or disable batch export. |
| [setDateIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MsetDateIncluded)(included: boolean): void<br>Includes or excludes date in the appendix of the exported power point file. |
| [setFileName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MsetFileName)(fileName: string): void<br>Sets the filename of the exported power point file. |
| [setPageRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportPptx_MsetPageRange)(value: number\[\]): void<br>Sets the pages to be exported to PPTX. |

Method Detail

|     |
| --- |
| exportView |
| exportView(): boolean<br>Exports the story to a power point file.<br>Returns<br>boolean<br>Mobile Support<br>Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| getBatchExportDataSource |
| getBatchExportDataSource(modelId: string): [BatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource)

Returns the data source of related modelId.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |

Returns

[BatchExportDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BatchExportDataSource)

Since

2024.7 |

|     |
| --- |
| getFileName |
| getFileName(): string<br>Returns the filename of the exported power point file.<br>Returns<br>string |

|     |
| --- |
| getPageRange |
| getPageRange(): number\[\]<br>Returns the numbers of the pages to be exported to PPTX.<br>Returns<br>number\[\] |

|     |
| --- |
| isAppendixVisible |
| isAppendixVisible(): boolean<br>Returns whether the appendix is visible in the exported power point file.<br>Returns<br>boolean |

|     |
| --- |
| isBatchExportEnabled |
| isBatchExportEnabled(): boolean<br>Returns whether batch export is enabled.<br>Returns<br>boolean<br>Since<br>2024.7 |

|     |
| --- |
| isDateIncluded |
| isDateIncluded(): boolean<br>Returns whether date is included in the appendix of the exported power point file.<br>Returns<br>boolean<br>Since<br>2024.25 |

|     |     |     |
| --- | --- | --- |
| setAppendixVisible |
| setAppendixVisible(visible: boolean): void

Shows or hides the appendix in the exported power point file.

Parameters

|     |     |     |
| --- | --- | --- |
| visible: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| setBatchExportEnabled |
| setBatchExportEnabled(isEnabled: boolean): void

Enable or disable batch export.

Parameters

|     |     |     |
| --- | --- | --- |
| isEnabled: | boolean |  |

Since

2024.7 |

|     |     |     |
| --- | --- | --- |
| setDateIncluded |
| setDateIncluded(included: boolean): void

Includes or excludes date in the appendix of the exported power point file.

Parameters

|     |     |     |
| --- | --- | --- |
| included: | boolean |  |

Since

2024.25 |

|     |     |     |
| --- | --- | --- |
| setFileName |
| setFileName(fileName: string): void

Sets the filename of the exported power point file.

Parameters

|     |     |     |
| --- | --- | --- |
| fileName: | string |  | |

|     |     |     |
| --- | --- | --- |
| setPageRange |
| setPageRange(value: number\[\]): void

Sets the pages to be exported to PPTX. All pages are exported if you don’t specify the page numbers. Page number starts from 1.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | number\[\] |  | |

Type Library
[exportcsv](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportcsv)

E



---

<a name="exportscope"></a>

ExportScope

Since

2021.5

Property Summary

|     |
| --- |
| Name and Description |
| static [All](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope_P_static_All): [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Export scope of "All" |
| static [PointOfView](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope_P_static_PointOfView): [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Export scope of "Point of View" |

Property Detail

|     |
| --- |
| All |
| staticAll: [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Export scope of "All" |

|     |
| --- |
| PointOfView |
| staticPointOfView: [ExportScope](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ExportScope)<br>Export scope of "Point of View" |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

E



---

<a name="feed"></a>

Feed

Last Update

2019.10

Property Summary

|     |
| --- |
| Name and Description |
| static [BubbleWidth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_BubbleWidth): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "BubbleWidth" feed |
| static [CategoryAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_CategoryAxis): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "CategoryAxis" feed |
| static [CategoryAxis2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_CategoryAxis2): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "CategoryAxis2" feed |
| static [Color](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Color): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Color" feed |
| static [CrossCalculations](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_CrossCalculations): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "CrossCalculations" feed |
| static [DataContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_DataContext): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "DataContext" feed |
| static [DataContext2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_DataContext2): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "DataContext2" feed |
| static [Pattern](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Pattern): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Pattern" feed |
| static [Pattern2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Pattern2): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Pattern2" feed |
| static [Size](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Size): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Size" feed |
| static [TimeAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_TimeAxis): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "TimeAxis" feed |
| static [Title](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Title): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Title" feed |
| static [TooltipCategoryAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_TooltipCategoryAxis): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "TooltipCategoryAxis" feed |
| static [TooltipValueAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_TooltipValueAxis): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "TooltipValueAxis" feed |
| static [Trellis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Trellis): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Trellis" feed |
| static [ValueAxis](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_ValueAxis): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "ValueAxis" feed |
| static [ValueAxis2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_ValueAxis2): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "ValueAxis2" feed |
| static [Weight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed_P_static_Weight): [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Weight" feed |

Property Detail

|     |
| --- |
| BubbleWidth |
| staticBubbleWidth: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "BubbleWidth" feed |

|     |
| --- |
| CategoryAxis |
| staticCategoryAxis: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "CategoryAxis" feed |

|     |
| --- |
| CategoryAxis2 |
| staticCategoryAxis2: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "CategoryAxis2" feed |

|     |
| --- |
| Color |
| staticColor: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Color" feed |

|     |
| --- |
| CrossCalculations |
| staticCrossCalculations: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "CrossCalculations" feed |

|     |
| --- |
| DataContext |
| staticDataContext: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "DataContext" feed |

|     |
| --- |
| DataContext2 |
| staticDataContext2: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "DataContext2" feed |

|     |
| --- |
| Pattern |
| staticPattern: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Pattern" feed |

|     |
| --- |
| Pattern2 |
| staticPattern2: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Pattern2" feed |

|     |
| --- |
| Size |
| staticSize: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Size" feed |

|     |
| --- |
| TimeAxis |
| staticTimeAxis: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "TimeAxis" feed |

|     |
| --- |
| Title |
| staticTitle: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Title" feed |

|     |
| --- |
| TooltipCategoryAxis |
| staticTooltipCategoryAxis: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "TooltipCategoryAxis" feed |

|     |
| --- |
| TooltipValueAxis |
| staticTooltipValueAxis: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "TooltipValueAxis" feed |

|     |
| --- |
| Trellis |
| staticTrellis: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Trellis" feed |

|     |
| --- |
| ValueAxis |
| staticValueAxis: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "ValueAxis" feed |

|     |
| --- |
| ValueAxis2 |
| staticValueAxis2: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "ValueAxis2" feed |

|     |
| --- |
| Weight |
| staticWeight: [Feed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Feed)<br>The "Weight" feed<br>Since<br>2019.10 |

C



---

<a name="fileuploadtrigger"></a>

FileUploadTrigger

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2024.14

Last Update

2024.17

Method Summary

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onAfterExecute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileUploadTrigger_EonAfterExecute)(status: [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)): void<br>Called when the Data Upload Starter execution ends. |
| [onBeforeExecute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileUploadTrigger_EonBeforeExecute)(): boolean<br>Called when the user clicks the Data Upload Starter. |

Event Detail

|     |     |     |
| --- | --- | --- |
| onAfterExecute |
| onAfterExecute(status: [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus)): void

Called when the Data Upload Starter execution ends.

Parameters

|     |     |     |
| --- | --- | --- |
| status: | [DataUploadExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataUploadExecutionResponseStatus) |  |

Last Update

2024.17 |

|     |
| --- |
| onBeforeExecute |
| onBeforeExecute(): boolean<br>Called when the user clicks the Data Upload Starter. If this method returns true or returns no value, then the data upload is executed. If this method returns false, then the data upload is ignored.<br>Returns<br>booleanDefault value:true |

Type Library
[datasource-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource-controls)

C



---

<a name="fiscaltime"></a>

FiscalTime

can be passed as a JSON object to method arguments

An object representing fiscal time

Since

2023.13

Property Summary

|     |
| --- |
| Name and Description |
| [fiscalDay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime_PfiscalDay): integer<br>fiscalDay |
| [fiscalQuarter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime_PfiscalQuarter): integer<br>fiscalQuarter |
| [fiscalYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime_PfiscalYear): integer<br>fiscalYear |
| [granularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime_Pgranularity): [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>granularity |
| [period](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTime_Pperiod): integer<br>period |

Property Detail

|     |
| --- |
| fiscalDay |
| fiscalDay: integer<br>fiscalDay |

|     |
| --- |
| fiscalQuarter |
| fiscalQuarter: integer<br>fiscalQuarter |

|     |
| --- |
| fiscalYear |
| fiscalYear: integer<br>fiscalYear |

|     |
| --- |
| granularity |
| granularity: [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>granularity |

|     |
| --- |
| period |
| period: integer<br>period |

E



---

<a name="fiscaltimegranularity"></a>

FiscalTimeGranularity

Since

2023.13

Property Summary

|     |
| --- |
| Name and Description |
| static [FiscalDay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity_P_static_FiscalDay): [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal days |
| static [FiscalQuarter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity_P_static_FiscalQuarter): [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal quarters |
| static [FiscalYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity_P_static_FiscalYear): [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal years |
| static [Period](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity_P_static_Period): [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal periods |

Property Detail

|     |
| --- |
| FiscalDay |
| staticFiscalDay: [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal days |

|     |
| --- |
| FiscalQuarter |
| staticFiscalQuarter: [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal quarters |

|     |
| --- |
| FiscalYear |
| staticFiscalYear: [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal years |

|     |
| --- |
| Period |
| staticPeriod: [FiscalTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FiscalTimeGranularity)<br>fiscal periods |

Type Library
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)

C



---

<a name="flowpanel"></a>

FlowPanel

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2020.20

Method Summary

|     |
| --- |
| Name and Description |
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FlowPanel_MhideBusyIndicator)(): void<br>Hides the busy indicator. |
| [moveWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FlowPanel_MmoveWidget)(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void<br>Moves the widget into the panel. |
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FlowPanel_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Method Detail

|     |
| --- |
| hideBusyIndicator |
| hideBusyIndicator(): void<br>Hides the busy indicator. |

|     |     |     |
| --- | --- | --- |
| moveWidget |
| moveWidget(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void

Moves the widget into the panel.

Parameters

|     |     |     |
| --- | --- | --- |
| widget: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |  | |

|     |     |     |
| --- | --- | --- |
| showBusyIndicator |
| showBusyIndicator(text?: string): void

Shows the busy indicator.

Parameters

|     |     |     |
| --- | --- | --- |
| textOptional: | string |  | |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="forecast"></a>

Forecast

Method Summary

|     |
| --- |
| Name and Description |
| [setNumberOfPeriods](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Forecast_MsetNumberOfPeriods)(number: integer): void<br>Sets the number of forecast periods. |
| [setType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Forecast_MsetType)(forecastType: [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)): void<br>Sets the forecast type. |

Method Detail

|     |     |     |
| --- | --- | --- |
| setNumberOfPeriods |
| setNumberOfPeriods(number: integer): void

Sets the number of forecast periods. If the value is out of the forecast range, then it is set to the default min-max period number.

Parameters

|     |     |     |
| --- | --- | --- |
| number: | integer |  | |

|     |     |     |
| --- | --- | --- |
| setType |
| setType(forecastType: [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)): void

Sets the forecast type.

Parameters

|     |     |     |
| --- | --- | --- |
| forecastType: | [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType) |  | |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

E



---

<a name="forecasttype"></a>

ForecastType

Property Summary

|     |
| --- |
| Name and Description |
| static [Auto](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType_P_static_Auto): [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)<br>The forecast is performed on the available data. |
| static [None](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType_P_static_None): [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)<br>No forecast is performed. |
| static [TripleExponentialSmoothing](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType_P_static_TripleExponentialSmoothing): [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)<br>The forecast is performed using the Triple Exponential Smoothing algorithm to account for seasonal changes as well as trends. |

Property Detail

|     |
| --- |
| Auto |
| staticAuto: [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)<br>The forecast is performed on the available data. |

|     |
| --- |
| None |
| staticNone: [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)<br>No forecast is performed. |

|     |
| --- |
| TripleExponentialSmoothing |
| staticTripleExponentialSmoothing: [ForecastType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ForecastType)<br>The forecast is performed using the Triple Exponential Smoothing algorithm to account for seasonal changes as well as trends. |

Type Library
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)

C



---

<a name="ichangedcell"></a>

IChangedCell

Since

2024.25

Property Summary

|     |
| --- |
| Name and Description |
| [context](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#IChangedCell_Pcontext): [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON<br>Dimension the cell corresponds to, whose value is its dimension ID |
| [newValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#IChangedCell_PnewValue): string<br>Cell value after change |
| [oldValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#IChangedCell_PoldValue): string<br>Cell value before change |

Property Detail

|     |
| --- |
| context |
| context: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON<br>Dimension the cell corresponds to, whose value is its dimension ID |

|     |
| --- |
| newValue |
| newValue: string<br>Cell value after change |

|     |
| --- |
| oldValue |
| oldValue: string<br>Cell value before change |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="inputfieldstyle"></a>

InputFieldStyle

can be passed as a JSON object to method arguments

Since

2020.9

Property Summary

|     |
| --- |
| Name and Description |
| [backgroundColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputFieldStyle_PbackgroundColor): string<br>Background color of the input field |
| [borderColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputFieldStyle_PborderColor): string<br>Border color of the input field |
| [color](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputFieldStyle_Pcolor): string<br>Font color of the input field |

Property Detail

|     |
| --- |
| backgroundColor |
| backgroundColor: string<br>Background color of the input field |

|     |
| --- |
| borderColor |
| borderColor: string<br>Border color of the input field |

|     |
| --- |
| color |
| color: string<br>Font color of the input field |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="layout"></a>

Layout

Since

2019.14

Last Update

2019.20

Method Summary

|     |
| --- |
| Name and Description |
| [getBottom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MgetBottom)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the bottom margin between the widget and the widget's parent container. |
| [getHeight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MgetHeight)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the height of the widget. |
| [getLeft](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MgetLeft)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the left margin between the widget and the widget's parent container. |
| [getRight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MgetRight)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the right margin between the widget and the widget's parent container. |
| [getTop](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MgetTop)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the top margin between the widget and the widget's parent container. |
| [getWidth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MgetWidth)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the width of the widget. |
| [setBottom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MsetBottom)(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void<br>Sets the bottom margin between the widget and the widget's parent container. |
| [setHeight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MsetHeight)(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void<br>Sets the height of the widget. |
| [setLeft](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MsetLeft)(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void<br>Sets the left margin between the widget and the widget's parent container. |
| [setRight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MsetRight)(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void<br>Sets the right margin between the widget and the widget's parent container. |
| [setTop](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MsetTop)(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void<br>Sets the top margin between the widget and the widget's parent container. |
| [setWidth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout_MsetWidth)(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void<br>Sets the width of the widget. |

Method Detail

|     |
| --- |
| getBottom |
| getBottom(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the bottom margin between the widget and the widget's parent container.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2019.20 |

|     |
| --- |
| getHeight |
| getHeight(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the height of the widget.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) |

|     |
| --- |
| getLeft |
| getLeft(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the left margin between the widget and the widget's parent container.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) |

|     |
| --- |
| getRight |
| getRight(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the right margin between the widget and the widget's parent container.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2019.20 |

|     |
| --- |
| getTop |
| getTop(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the top margin between the widget and the widget's parent container.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) |

|     |
| --- |
| getWidth |
| getWidth(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Returns the width of the widget.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) |

|     |     |     |
| --- | --- | --- |
| setBottom |
| setBottom(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void

Sets the bottom margin between the widget and the widget's parent container. If you specify an integer, then pixel units are used.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer |  |

Since

2019.20 |

|     |     |     |
| --- | --- | --- |
| setHeight |
| setHeight(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void

Sets the height of the widget. If you specify an integer, then pixel units are used.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer |  |

Last Update

2019.15 |

|     |     |     |
| --- | --- | --- |
| setLeft |
| setLeft(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void

Sets the left margin between the widget and the widget's parent container. If you specify an integer, then pixel units are used.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer |  |

Last Update

2019.15 |

|     |     |     |
| --- | --- | --- |
| setRight |
| setRight(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void

Sets the right margin between the widget and the widget's parent container. If you specify an integer, then pixel units are used.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer |  |

Since

2019.20 |

|     |     |     |
| --- | --- | --- |
| setTop |
| setTop(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void

Sets the top margin between the widget and the widget's parent container. If you specify an integer, then pixel units are used.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer |  |

Last Update

2019.15 |

|     |     |     |
| --- | --- | --- |
| setWidth |
| setWidth(value: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer): void

Sets the width of the widget. If you specify an integer, then pixel units are used.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) \| integer |  |

Last Update

2019.15 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="layoutunit"></a>

LayoutUnit

Since

2019.14

Last Update

2023.8

Property Summary

|     |
| --- |
| Name and Description |
| static [Auto](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit_P_static_Auto): [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |
| static [Grid](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit_P_static_Grid): [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |
| static [Percent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit_P_static_Percent): [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |
| static [Pixel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit_P_static_Pixel): [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |

Property Detail

|     |
| --- |
| Auto |
| staticAuto: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit)<br>Since<br>2019.20 |

|     |
| --- |
| Grid |
| staticGrid: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit)<br>Since<br>2023.8 |

|     |
| --- |
| Percent |
| staticPercent: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit)<br>Since<br>2019.20 |

|     |
| --- |
| Pixel |
| staticPixel: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="layoutvalue"></a>

LayoutValue

Since

2019.14

Last Update

2019.20

Property Summary

|     |
| --- |
| Name and Description |
| static [Auto](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue_P_static_Auto): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue) |
| [numberValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue_PnumberValue): number |
| [unit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue_Punit): [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue_Pvalue): integer |

Method Summary

|     |
| --- |
| Name and Description |
| static [create](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue_M_static_create)(value: number, unit: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit)): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Creates a Unit with a value and type. |

Property Detail

|     |
| --- |
| Auto |
| staticAuto: [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2019.20 |

|     |
| --- |
| numberValue |
| numberValue: number<br>Since<br>2019.20 |

|     |
| --- |
| unit |
| unit: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit)<br>Since<br>2019.15 |

|     |
| --- |
| value |
| value: integer<br>Since<br>2019.15 |

Method Detail

|     |     |     |
| --- | --- | --- |
| create |
| staticcreate(value: number, unit: [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit)): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)

Creates a Unit with a value and type.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | number |  |
| unit: | [LayoutUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutUnit) |  |

Returns

[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)

Last Update

2019.20 |

Type Library
[data-binding](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdata-binding)

C



---

<a name="linkedanalysis"></a>

LinkedAnalysis

Since

2023.15

Method Summary

|     |
| --- |
| Name and Description |
| [isDataPointSelectionEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LinkedAnalysis_MisDataPointSelectionEnabled)(): boolean<br>Whether it supports filter on data point selection |
| [removeFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LinkedAnalysis_MremoveFilters)(): void<br>Remove the filters on data point selection |
| [setFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LinkedAnalysis_MsetFilters)(selections: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON): void<br>Set the filter on data point selection |

Method Detail

|     |
| --- |
| isDataPointSelectionEnabled |
| isDataPointSelectionEnabled(): boolean<br>Whether it supports filter on data point selection<br>Returns<br>boolean |

|     |
| --- |
| removeFilters |
| removeFilters(): void<br>Remove the filters on data point selection |

|     |     |     |
| --- | --- | --- |
| setFilters |
| setFilters(selections: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON): void

Set the filter on data point selection

Parameters

|     |     |     |
| --- | --- | --- |
| selections: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON \| [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection)\[\]JSON |  | |

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="memberaccessmode"></a>

MemberAccessMode\
\
A set of values to describe the type of members\
\
Since\
\
2021.1\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [BookedValues](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode_P_static_BookedValues): [MemberAccessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode)<br>Only members which have booked values |\
| static [MasterData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode_P_static_MasterData): [MemberAccessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode)<br>Full set of available members |\
\
Property Detail\
\
|     |\
| --- |\
| BookedValues |\
| staticBookedValues: [MemberAccessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode)<br>Only members which have booked values |\
\
|     |\
| --- |\
| MasterData |\
| staticMasterData: [MemberAccessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode)<br>Full set of available members |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
E\
\


---

<a name="memberdisplaymode"></a>

MemberDisplayMode\
\
Since\
\
2019.1\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode_P_static_Description): [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Members are visualized using their description. |\
| static [DisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode_P_static_DisplayId): [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Members are visualized using their display ID. |\
| static [DisplayIdAndDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode_P_static_DisplayIdAndDescription): [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Members are visualized using their display ID and description. |\
\
Property Detail\
\
|     |\
| --- |\
| Description |\
| staticDescription: [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Members are visualized using their description. |\
\
|     |\
| --- |\
| DisplayId |\
| staticDisplayId: [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Members are visualized using their display ID. |\
\
|     |\
| --- |\
| DisplayIdAndDescription |\
| staticDisplayIdAndDescription: [MemberDisplayMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberDisplayMode)<br>Members are visualized using their display ID and description. |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="multiaction"></a>

MultiAction\
\
Since\
\
2022.25\
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
| [execute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_Mexecute)(): [MultiActionExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponse)<br>Executes the multi action as a blocking operation, which prevents other scripts from running until the multi action execution is complete. |\
| [executeInBackground](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_MexecuteInBackground)(executionName: string): [MultiActionBackgroundExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponse)<br>Executes the multi action as a non-blocking operation. |\
| [getParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_MgetParameterValue)(id: string): [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue)<br>Returns the value of the parameter. |\
| [isAllMembersSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_MisAllMembersSelected)(id: string): boolean<br>Returns whether the parameter has the all member as value. |\
| [setAllMembersSelected](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_MsetAllMembersSelected)(id: string, hierarchy?: string): void<br>Sets the all member as parameter value. |\
| [setParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_MsetParameterValue)(id: string, value: string \| string\[\] \| [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue) JSON \| number): void<br>Sets the value of the parameter. |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onExecutionStatusUpdate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiAction_EonExecutionStatusUpdate)(status: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus), executionId: string, executionName: string, message: string): void<br>Called when an asynchronous Multi Action execution changes its status. |\
\
Method Detail\
\
|     |\
| --- |\
| execute |\
| execute(): [MultiActionExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponse)<br>Executes the multi action as a blocking operation, which prevents other scripts from running until the multi action execution is complete. Best to use it for multi actions that take a short time to run.<br>Returns<br>[MultiActionExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponse)<br>Mobile Support<br>Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| executeInBackground |\
| executeInBackground(executionName: string): [MultiActionBackgroundExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponse)\
\
Executes the multi action as a non-blocking operation. Other scripts can be running at the same time without waiting for the multi action execution to complete.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| executionName: | string |  |\
\
Returns\
\
[MultiActionBackgroundExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponse)\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| getParameterValue |\
| getParameterValue(id: string): [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue)\
\
Returns the value of the parameter.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| id: | string |  |\
\
Returns\
\
[MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue)\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
|     |     |     |\
| --- | --- | --- |\
| isAllMembersSelected |\
| isAllMembersSelected(id: string): boolean\
\
Returns whether the parameter has the all member as value.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| id: | string |  |\
\
Returns\
\
boolean\
\
Since\
\
2025.13 |\
\
|     |     |     |\
| --- | --- | --- |\
| setAllMembersSelected |\
| setAllMembersSelected(id: string, hierarchy?: string): void\
\
Sets the all member as parameter value.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| id: | string |  |\
| hierarchyOptional: | string |  |\
\
Since\
\
2025.13 |\
\
|     |     |     |\
| --- | --- | --- |\
| setParameterValue |\
| setParameterValue(id: string, value: string \| string\[\] \| [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue) JSON \| number): void\
\
Sets the value of the parameter.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| id: | string |  |\
| value: | string \| string\[\] \| [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue) JSON \| number |  |\
\
Mobile Support\
\
Not supported on mobile devices. |\
\
Event Detail\
\
|     |     |     |\
| --- | --- | --- |\
| onExecutionStatusUpdate |\
| onExecutionStatusUpdate(status: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus), executionId: string, executionName: string, message: string): void\
\
Called when an asynchronous Multi Action execution changes its status.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| status: | [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus) |  |\
| executionId: | string |  |\
| executionName: | string |  |\
| message: | string |  |\
\
Last Update\
\
2023.13 |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactionbackgroundexecutionresponse"></a>

MultiActionBackgroundExecutionResponse\
\
Since\
\
2022.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [executionId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponse_PexecutionId): string<br>Generated execution ID. |\
| [status](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponse_Pstatus): [MultiActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus)<br>Execution status |\
\
Property Detail\
\
|     |\
| --- |\
| executionId |\
| executionId: string<br>Generated execution ID. |\
\
|     |\
| --- |\
| status |\
| status: [MultiActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus)<br>Execution status |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
E\
\


---

<a name="multiactionbackgroundexecutionresponsestatus"></a>

MultiActionBackgroundExecutionResponseStatus\
\
Since\
\
2022.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Accepted](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus_P_static_Accepted): [MultiActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus)<br>Execution is accepted. |\
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus_P_static_Error): [MultiActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus)<br>Execution ended with errors. |\
\
Property Detail\
\
|     |\
| --- |\
| Accepted |\
| staticAccepted: [MultiActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus)<br>Execution is accepted. |\
\
|     |\
| --- |\
| Error |\
| staticError: [MultiActionBackgroundExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionBackgroundExecutionResponseStatus)<br>Execution ended with errors. |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactiondatetimeparametervalue"></a>

MultiActionDatetimeParameterValue\
\
extends [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue), can be passed as a JSON object to method arguments\
\
An object defining a multi action datetime parameter value\
\
Since\
\
2025.7\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [values](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionDatetimeParameterValue_Pvalues): string\[\]<br>Datetime values |\
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
| values |\
| values: string\[\]<br>Datetime values |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactionexecutionresponse"></a>

MultiActionExecutionResponse\
\
Since\
\
2022.25\
\
Last Update\
\
2023.13\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [message](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponse_Pmessage): string<br>Execution result message |\
| [status](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponse_Pstatus): [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution result status |\
\
Property Detail\
\
|     |\
| --- |\
| message |\
| message: string<br>Execution result message<br>Since<br>2023.13 |\
\
|     |\
| --- |\
| status |\
| status: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution result status |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
E\
\


---

<a name="multiactionexecutionresponsestatus"></a>

MultiActionExecutionResponseStatus\
\
Since\
\
2022.25\
\
Last Update\
\
2023.6\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus_P_static_Error): [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution ended with errors. |\
| static [Running](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus_P_static_Running): [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution is running. |\
| static [Success](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus_P_static_Success): [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution ended successfully. |\
| static [Warning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus_P_static_Warning): [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution ended with warning. |\
\
Property Detail\
\
|     |\
| --- |\
| Error |\
| staticError: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution ended with errors. |\
\
|     |\
| --- |\
| Running |\
| staticRunning: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution is running. |\
\
|     |\
| --- |\
| Success |\
| staticSuccess: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution ended successfully. |\
\
|     |\
| --- |\
| Warning |\
| staticWarning: [MultiActionExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionExecutionResponseStatus)<br>Execution ended with warning.<br>Since<br>2023.6 |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactionmemberparametervalue"></a>

MultiActionMemberParameterValue\
\
extends [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue), can be passed as a JSON object to method arguments\
\
An object defining a multi action member parameter value\
\
Since\
\
2022.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [members](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionMemberParameterValue_Pmembers): string\[\]<br>Member IDs |\
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
| members |\
| members: string\[\]<br>Member IDs |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactionnumberparametervalue"></a>

MultiActionNumberParameterValue\
\
extends [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue), can be passed as a JSON object to method arguments\
\
An object defining a multi action number parameter value\
\
Since\
\
2022.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionNumberParameterValue_Pvalue): number<br>Number value |\
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
| value |\
| value: number<br>Number value |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactionparametervalue"></a>

MultiActionParameterValue\
\
can be passed as a JSON object to method arguments\
\
An object defining a multi action parameter value\
\
Direct Subclasses\
\
[MultiActionAllMemberSelection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionAllMemberSelection), [MultiActionDatetimeParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionDatetimeParameterValue), [MultiActionMemberParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionMemberParameterValue), [MultiActionNumberParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionNumberParameterValue), [MultiActionStringParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionStringParameterValue)\
\
Since\
\
2022.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue_Ptype): [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Type of the parameter value |\
\
Property Detail\
\
|     |\
| --- |\
| type |\
| type: [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Type of the parameter value |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
E\
\


---

<a name="multiactionparametervaluetype"></a>

MultiActionParameterValueType\
\
Since\
\
2022.25\
\
Last Update\
\
2025.13\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [All](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType_P_static_All): [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>All member selection type |\
| static [Datetime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType_P_static_Datetime): [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Datetime value type |\
| static [Member](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType_P_static_Member): [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Member value type |\
| static [Number](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType_P_static_Number): [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Number value type |\
| static [String](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType_P_static_String): [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>String value type |\
\
Property Detail\
\
|     |\
| --- |\
| All |\
| staticAll: [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>All member selection type<br>Since<br>2025.13 |\
\
|     |\
| --- |\
| Datetime |\
| staticDatetime: [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Datetime value type<br>Since<br>2025.7 |\
\
|     |\
| --- |\
| Member |\
| staticMember: [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Member value type |\
\
|     |\
| --- |\
| Number |\
| staticNumber: [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>Number value type |\
\
|     |\
| --- |\
| String |\
| staticString: [MultiActionParameterValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValueType)<br>String value type<br>Since<br>2025.7 |\
\
Type Library\
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)\
\
C\
\


---

<a name="multiactionstringparametervalue"></a>

MultiActionStringParameterValue\
\
extends [MultiActionParameterValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionParameterValue), can be passed as a JSON object to method arguments\
\
An object defining a multi action string parameter value\
\
Since\
\
2025.7\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [values](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionStringParameterValue_Pvalues): string\[\]<br>String values |\
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
| values |\
| values: string\[\]<br>String values |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="multiactiontrigger"></a>

MultiActionTrigger\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2021.13\
\
Method Summary\
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
| [onBeforeExecute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionTrigger_EonBeforeExecute)(): boolean<br>Called when the user clicks the multi action starter. |\
\
Event Detail\
\
|     |\
| --- |\
| onBeforeExecute |\
| onBeforeExecute(): boolean<br>Called when the user clicks the multi action starter. If this method returns true or returns no value, then the multi action is executed. If this method returns false, then the multi action is ignored.<br>Returns<br>booleanDefault value:true |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="multiplevariablevalue"></a>

MultipleVariableValue\
\
extends [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue), can be passed as a JSON object to method arguments\
\
Since\
\
2019.22\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [exclude](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleVariableValue_Pexclude): boolean<br>Indicates whether to exclude the variable values. |\
| [values](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleVariableValue_Pvalues): string\[\]<br>Multiple variable values |\
\
|     |\
| --- |\
| Inherited from [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| exclude |\
| exclude: boolean<br>Indicates whether to exclude the variable values. |\
\
|     |\
| --- |\
| values |\
| values: string\[\]<br>Multiple variable values |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\
C\
\


---

<a name="numberformat"></a>

NumberFormat\
\
Since\
\
2019.5\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [create](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_M_static_create)(): [NumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat)<br>Creates a number format. |\
| static [format](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_M_static_format)(value: number): string<br>Formats a number by applying the current user settings. |\
| [format](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_Mformat)(value: number): string<br>Formats a number by applying the settings of this number format. |\
| [getDecimalSeparator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetDecimalSeparator)(): string<br>Returns the decimal separator. |\
| [getGroupingSeparator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetGroupingSeparator)(): string<br>Returns the grouping separator. |\
| [getMaximumDecimalPlaces](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetMaximumDecimalPlaces)(): integer<br>Returns the maximum number of decimal places. |\
| [getMinimumDecimalPlaces](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetMinimumDecimalPlaces)(): integer<br>Returns the minimum number of decimal places. |\
| [getScalingFactor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetScalingFactor)(): number<br>Returns the scaling factor. |\
| [getScalingText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetScalingText)(): string<br>Returns the scaling text. |\
| [getSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MgetSignDisplay)(): [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Returns how signs are displayed. |\
| [setDecimalSeparator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetDecimalSeparator)(decimalSeparator: string): void<br>Sets the decimal separator. |\
| [setGroupingSeparator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetGroupingSeparator)(groupingSeparator: string): void<br>Sets the grouping separator. |\
| [setMaximumDecimalPlaces](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetMaximumDecimalPlaces)(maximumDecimalPlaces: integer): void<br>Sets the maximum number of decimal places. |\
| [setMinimumDecimalPlaces](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetMinimumDecimalPlaces)(minimumDecimalPlaces: integer): void<br>Sets the minimum number of decimal places. |\
| [setScalingFactor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetScalingFactor)(factor: number): void<br>Sets the scaling factor. |\
| [setScalingText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetScalingText)(text: string): void<br>Sets the scaling text. |\
| [setSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat_MsetSignDisplay)(mode: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)): void<br>Specifies how signs are displayed. |\
\
Method Detail\
\
|     |\
| --- |\
| create |\
| staticcreate(): [NumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat)<br>Creates a number format.<br>Returns<br>[NumberFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormat) |\
\
|     |     |     |\
| --- | --- | --- |\
| format |\
| staticformat(value: number): string\
\
Formats a number by applying the current user settings.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  |\
\
Returns\
\
string |\
\
|     |     |     |\
| --- | --- | --- |\
| format |\
| format(value: number): string\
\
Formats a number by applying the settings of this number format.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  |\
\
Returns\
\
string |\
\
|     |\
| --- |\
| getDecimalSeparator |\
| getDecimalSeparator(): string<br>Returns the decimal separator.<br>Returns<br>string |\
\
|     |\
| --- |\
| getGroupingSeparator |\
| getGroupingSeparator(): string<br>Returns the grouping separator.<br>Returns<br>string |\
\
|     |\
| --- |\
| getMaximumDecimalPlaces |\
| getMaximumDecimalPlaces(): integer<br>Returns the maximum number of decimal places.<br>Returns<br>integer |\
\
|     |\
| --- |\
| getMinimumDecimalPlaces |\
| getMinimumDecimalPlaces(): integer<br>Returns the minimum number of decimal places.<br>Returns<br>integer |\
\
|     |\
| --- |\
| getScalingFactor |\
| getScalingFactor(): number<br>Returns the scaling factor.<br>Returns<br>number |\
\
|     |\
| --- |\
| getScalingText |\
| getScalingText(): string<br>Returns the scaling text.<br>Returns<br>string |\
\
|     |\
| --- |\
| getSignDisplay |\
| getSignDisplay(): [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Returns how signs are displayed.<br>Returns<br>[NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay) |\
\
|     |     |     |\
| --- | --- | --- |\
| setDecimalSeparator |\
| setDecimalSeparator(decimalSeparator: string): void\
\
Sets the decimal separator.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| decimalSeparator: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setGroupingSeparator |\
| setGroupingSeparator(groupingSeparator: string): void\
\
Sets the grouping separator. If the grouping separator is an empty string (""), then the digits of the number aren't grouped.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| groupingSeparator: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setMaximumDecimalPlaces |\
| setMaximumDecimalPlaces(maximumDecimalPlaces: integer): void\
\
Sets the maximum number of decimal places.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| maximumDecimalPlaces: | integer |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setMinimumDecimalPlaces |\
| setMinimumDecimalPlaces(minimumDecimalPlaces: integer): void\
\
Sets the minimum number of decimal places.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| minimumDecimalPlaces: | integer |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setScalingFactor |\
| setScalingFactor(factor: number): void\
\
Sets the scaling factor. If the scaling factor is 0 or 1, then the number isn't scaled.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| factor: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setScalingText |\
| setScalingText(text: string): void\
\
Sets the scaling text.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| text: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setSignDisplay |\
| setSignDisplay(mode: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)): void\
\
Specifies how signs are displayed.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| mode: | [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay) |  | |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="numberformatdisplayunit"></a>

NumberFormatDisplayUnit\
\
Since\
\
2020.11\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Cells](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit_P_static_Cells): [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
| static [Column](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit_P_static_Column): [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
| static [Default](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit_P_static_Default): [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
| static [Row](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit_P_static_Row): [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
\
Property Detail\
\
|     |\
| --- |\
| Cells |\
| staticCells: [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
\
|     |\
| --- |\
| Column |\
| staticColumn: [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
\
|     |\
| --- |\
| Default |\
| staticDefault: [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
\
|     |\
| --- |\
| Row |\
| staticRow: [NumberFormatDisplayUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatDisplayUnit) |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="numberformatscaleformat"></a>

NumberFormatScaleFormat\
\
Since\
\
2020.11\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Default](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat_P_static_Default): [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |\
| static [Long](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat_P_static_Long): [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |\
| static [Short](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat_P_static_Short): [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |\
\
Property Detail\
\
|     |\
| --- |\
| Default |\
| staticDefault: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |\
\
|     |\
| --- |\
| Long |\
| staticLong: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |\
\
|     |\
| --- |\
| Short |\
| staticShort: [NumberFormatScaleFormat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleFormat) |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="numberformatscaleunit"></a>

NumberFormatScaleUnit\
\
Since\
\
2020.11\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [AutoFormatted](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit_P_static_AutoFormatted): [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
| static [Billion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit_P_static_Billion): [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
| static [Default](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit_P_static_Default): [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
| static [Million](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit_P_static_Million): [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
| static [Thousand](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit_P_static_Thousand): [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
| static [Unformatted](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit_P_static_Unformatted): [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
Property Detail\
\
|     |\
| --- |\
| AutoFormatted |\
| staticAutoFormatted: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
|     |\
| --- |\
| Billion |\
| staticBillion: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
|     |\
| --- |\
| Default |\
| staticDefault: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
|     |\
| --- |\
| Million |\
| staticMillion: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
|     |\
| --- |\
| Thousand |\
| staticThousand: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
|     |\
| --- |\
| Unformatted |\
| staticUnformatted: [NumberFormatScaleUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatScaleUnit) |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="numberformatsigndisplay"></a>

NumberFormatSignDisplay\
\
Since\
\
2019.5\
\
Last Update\
\
2020.11\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Default](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay_P_static_Default): [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>A default format is applied to positive and negative numbers. |\
| static [MinusAsParentheses](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay_P_static_MinusAsParentheses): [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Negative numbers are nested in parentheses (()). |\
| static [MinusAsPrefix](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay_P_static_MinusAsPrefix): [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Negative numbers are prefixed with a minus sign (-). |\
| static [PlusMinusAsPrefix](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay_P_static_PlusMinusAsPrefix): [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Positive numbers are prefixed with a plus sign (+), negative numbers are prefixed with a minus sign (-). |\
\
Property Detail\
\
|     |\
| --- |\
| Default |\
| staticDefault: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>A default format is applied to positive and negative numbers.<br>Since<br>2020.11 |\
\
|     |\
| --- |\
| MinusAsParentheses |\
| staticMinusAsParentheses: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Negative numbers are nested in parentheses (()). |\
\
|     |\
| --- |\
| MinusAsPrefix |\
| staticMinusAsPrefix: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Negative numbers are prefixed with a minus sign (-). |\
\
|     |\
| --- |\
| PlusMinusAsPrefix |\
| staticPlusMinusAsPrefix: [NumberFormatSignDisplay](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NumberFormatSignDisplay)<br>Positive numbers are prefixed with a plus sign (+), negative numbers are prefixed with a minus sign (-). |\
\
Type Library\
[oDataService](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLoDataService)\
\
C\
\


---

<a name="pagedatelocation"></a>

PageDateLocation\
\
Since\
\
2019.19\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Appendix](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation_P_static_Appendix): [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
| static [Header](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation_P_static_Header): [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
| static [HeaderAndAppendix](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation_P_static_HeaderAndAppendix): [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
| static [None](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation_P_static_None): [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
\
Property Detail\
\
|     |\
| --- |\
| Appendix |\
| staticAppendix: [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
\
|     |\
| --- |\
| Header |\
| staticHeader: [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
\
|     |\
| --- |\
| HeaderAndAppendix |\
| staticHeaderAndAppendix: [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
\
|     |\
| --- |\
| None |\
| staticNone: [PageDateLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageDateLocation) |\
\
Type Library\
[exportpdf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportpdf)\
\
E\
\


---

<a name="pagenumberlocation"></a>

PageNumberLocation\
\
Since\
\
2019.19\
\
Last Update\
\
2023.7\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Footer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation_P_static_Footer): [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
| static [Header](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation_P_static_Header): [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
| static [HeaderAndFooter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation_P_static_HeaderAndFooter): [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
| static [None](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation_P_static_None): [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
\
Property Detail\
\
|     |\
| --- |\
| Footer |\
| staticFooter: [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
\
|     |\
| --- |\
| Header |\
| staticHeader: [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
\
|     |\
| --- |\
| HeaderAndFooter |\
| staticHeaderAndFooter: [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation)<br>Since<br>2023.7 |\
\
|     |\
| --- |\
| None |\
| staticNone: [PageNumberLocation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageNumberLocation) |\
\
Type Library\
[exportpdf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportpdf)\
\
E\
\


---

<a name="pageorientation"></a>

PageOrientation\
\
Since\
\
2019.19\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Landscape](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation_P_static_Landscape): [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation) |\
| static [Portrait](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation_P_static_Portrait): [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation) |\
\
Property Detail\
\
|     |\
| --- |\
| Landscape |\
| staticLandscape: [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation) |\
\
|     |\
| --- |\
| Portrait |\
| staticPortrait: [PageOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageOrientation) |\
\
Type Library\
[exportpdf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportpdf)\
\
E\
\


---

<a name="pagesize"></a>

PageSize\
\
Since\
\
2019.19\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [A2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_A2): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
| static [A3](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_A3): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
| static [A4](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_A4): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
| static [A5](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_A5): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
| static [Auto](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_Auto): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
| static [Legal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_Legal): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
| static [Letter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize_P_static_Letter): [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
Property Detail\
\
|     |\
| --- |\
| A2 |\
| staticA2: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
|     |\
| --- |\
| A3 |\
| staticA3: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
|     |\
| --- |\
| A4 |\
| staticA4: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
|     |\
| --- |\
| A5 |\
| staticA5: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
|     |\
| --- |\
| Auto |\
| staticAuto: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
|     |\
| --- |\
| Legal |\
| staticLegal: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
|     |\
| --- |\
| Letter |\
| staticLetter: [PageSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageSize) |\
\
Type Library\
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)\
\
C\
\


---

<a name="pausemode"></a>

PauseMode\
\
A set of values to describe the pause mode. For more information about the different modes, see the chapter "Using Pause Refresh APIs" in SAP Analytics Cloud Help.\
\
Since\
\
2021.18\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Auto](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode_P_static_Auto): [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Pause data refresh is automatically turned on for invisible widgets. |\
| static [Off](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode_P_static_Off): [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Pause data refresh is turned off. |\
| static [On](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode_P_static_On): [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Pause data refresh is turned on. |\
\
Property Detail\
\
|     |\
| --- |\
| Auto |\
| staticAuto: [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Pause data refresh is automatically turned on for invisible widgets. For example, result set-related methods return the latest result set. Some specific restrictions apply for this value for tables. |\
\
|     |\
| --- |\
| Off |\
| staticOff: [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Pause data refresh is turned off. |\
\
|     |\
| --- |\
| On |\
| staticOn: [PauseMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PauseMode)<br>Pause data refresh is turned on. Any operations resulting in a data refresh are paused. |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="postmessagereceiver"></a>

PostMessageReceiver\
\
Since\
\
2019.1\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Parent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver_P_static_Parent): [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver) |\
| static [Top](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver_P_static_Top): [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver) |\
\
Property Detail\
\
|     |\
| --- |\
| Parent |\
| staticParent: [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver) |\
\
|     |\
| --- |\
| Top |\
| staticTop: [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver) |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
E\
\


---

<a name="privatepublishconflict"></a>

PrivatePublishConflict\
\
Since\
\
2023.15\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [PublishWithoutWarning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict_P_static_PublishWithoutWarning): [PrivatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict)<br>Publishes the version without showing the conflict warning dialog, and the user's changes in conflict with the other's will be lost. |\
| static [ShowWarning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict_P_static_ShowWarning): [PrivatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict)<br>Shows the warning dialog for the user to handle conflicting changes. |\
\
Property Detail\
\
|     |\
| --- |\
| PublishWithoutWarning |\
| staticPublishWithoutWarning: [PrivatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict)<br>Publishes the version without showing the conflict warning dialog, and the user's changes in conflict with the other's will be lost. |\
\
|     |\
| --- |\
| ShowWarning |\
| staticShowWarning: [PrivatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict)<br>Shows the warning dialog for the user to handle conflicting changes. |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="publicpublishconflict"></a>

PublicPublishConflict\
\
Since\
\
2023.15\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [PublishWithoutWarning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict_P_static_PublishWithoutWarning): [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Publishes the version without showing the conflict warning dialog, and the user's changes in conflict with the other's will be lost. |\
| static [RevertWithoutWarning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict_P_static_RevertWithoutWarning): [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Reverts the version without showing the conflict warning dialog. |\
| static [ShowWarning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict_P_static_ShowWarning): [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Shows the warning dialog for the user to handle conflicting changes. |\
\
Property Detail\
\
|     |\
| --- |\
| PublishWithoutWarning |\
| staticPublishWithoutWarning: [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Publishes the version without showing the conflict warning dialog, and the user's changes in conflict with the other's will be lost. |\
\
|     |\
| --- |\
| RevertWithoutWarning |\
| staticRevertWithoutWarning: [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Reverts the version without showing the conflict warning dialog. |\
\
|     |\
| --- |\
| ShowWarning |\
| staticShowWarning: [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Shows the warning dialog for the user to handle conflicting changes. |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="range"></a>

Range\
\
Since\
\
2019.7\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [create](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range_M_static_create)(startValue: number, endValue: number): [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range)<br>Creates a range with a start and an end value. |\
| [getEndValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range_MgetEndValue)(): number<br>Returns the end value of the range. |\
| [getStartValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range_MgetStartValue)(): number<br>Returns the start value of the range. |\
| [setEndValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range_MsetEndValue)(value: number): void<br>Sets the end value of the range. |\
| [setStartValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range_MsetStartValue)(value: number): void<br>Sets the start value of the range. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| create |\
| staticcreate(startValue: number, endValue: number): [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range)\
\
Creates a range with a start and an end value.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| startValue: | number |  |\
| endValue: | number |  |\
\
Returns\
\
[Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Range) |\
\
|     |\
| --- |\
| getEndValue |\
| getEndValue(): number<br>Returns the end value of the range.<br>Returns<br>number |\
\
|     |\
| --- |\
| getStartValue |\
| getStartValue(): number<br>Returns the start value of the range.<br>Returns<br>number |\
\
|     |     |     |\
| --- | --- | --- |\
| setEndValue |\
| setEndValue(value: number): void\
\
Sets the end value of the range.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setStartValue |\
| setStartValue(value: number): void\
\
Sets the start value of the range.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | number |  | |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="rangevariablevalue"></a>

RangeVariableValue\
\
extends [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue), can be passed as a JSON object to method arguments\
\
Since\
\
2019.22\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [exclude](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_Pexclude): boolean<br>Indicates whether to exclude the variable values. |\
| [from](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_Pfrom): string<br>Start variable value of a range |\
| [greater](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_Pgreater): string<br>Variable value specifying a range of variable values greater than this variable value |\
| [greaterOrEqual](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_PgreaterOrEqual): string<br>Variable value specifying a range of variable values greater or equal than this variable value |\
| [less](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_Pless): string<br>Variable value specifying a range of variable values less than this variable value |\
| [lessOrEqual](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_PlessOrEqual): string<br>Variable value specifying a range of variable values less or equal than this variable value |\
| [to](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue_Pto): string<br>End variable value of a range |\
\
|     |\
| --- |\
| Inherited from [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| exclude |\
| exclude: boolean<br>Indicates whether to exclude the variable values. |\
\
|     |\
| --- |\
| from |\
| from: string<br>Start variable value of a range |\
\
|     |\
| --- |\
| greater |\
| greater: string<br>Variable value specifying a range of variable values greater than this variable value |\
\
|     |\
| --- |\
| greaterOrEqual |\
| greaterOrEqual: string<br>Variable value specifying a range of variable values greater or equal than this variable value |\
\
|     |\
| --- |\
| less |\
| less: string<br>Variable value specifying a range of variable values less than this variable value |\
\
|     |\
| --- |\
| lessOrEqual |\
| lessOrEqual: string<br>Variable value specifying a range of variable values less or equal than this variable value |\
\
|     |\
| --- |\
| to |\
| to: string<br>End variable value of a range |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
E\
\


---

<a name="rankorder"></a>

RankOrder\
\
A set of values describing the rank order\
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
| static [Bottom](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder_P_static_Bottom): [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Ascending order of ranking (lowest first) |\
| static [Top](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder_P_static_Top): [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Descending order of ranking (highest first) |\
\
Property Detail\
\
|     |\
| --- |\
| Bottom |\
| staticBottom: [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Ascending order of ranking (lowest first) |\
\
|     |\
| --- |\
| Top |\
| staticTop: [RankOrder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RankOrder)<br>Descending order of ranking (highest first) |\
\
Type Library\
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)\
\
C\
\


---

<a name="renvironmentvalues"></a>

REnvironmentValues\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getNumber](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#REnvironmentValues_MgetNumber)(key: string): number<br>Returns the number value of an R code variable. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| getNumber |\
| getNumber(key: string): number\
\
Returns the number value of an R code variable. The variable is specified by its name.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
\
Returns\
\
number |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="resultset"></a>

ResultSet\
\
is an object< [DataContext](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataContext) >\
\
A result set consists of property-value pairs. The property is a dimension name. The value contains information about the member or measure. You can get an array of result sets with DataSource.getResultSet(). For example, a return value of Chart\_1.getDataSource().getResultSet() is \[{"@MeasureDimension": {"id": "\[Account\_BestRunJ\_sold\].\[parentId\].&\[Gross\_Margin\]", "description": "Gross Margin", "formattedValue": "48971999.74", "rawValue": "48971999.74"}, "Location\_4nm2e04531": {"id": "\[Location\_4nm2e04531\].\[State\_47acc246\_4m5x6u3k6s\].&\[CT1\]", "description": "California"}, "Smart Group": {"id": "Predictive Clustering Group 1", "description": "Predictive Clustering Group 1"}}\]. The value of "@MeasureDimension" contains the data context for the measure. "Location\_4nm2e04531" is the dimension metadata ID. "Smart Group" is a special member for Bubble and Scatter charts using Smart Grouping. If a data point of a chart or a data cell of a table has no value, then it isn't returned in the array.\
\
Since\
\
2019.20\
\
Type Library\
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)\
\
C\
\


---

<a name="rinputparameters"></a>

RInputParameters\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getNumber](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MgetNumber)(key: string): number<br>Returns the value of an input parameter that is a number. |\
| [getNumberArray](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MgetNumberArray)(key: string): number\[\]<br>Returns the value of an input parameter that is a number array. |\
| [getString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MgetString)(key: string): string<br>Returns the value of an input parameter that is a string. |\
| [getStringArray](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MgetStringArray)(key: string): string\[\]<br>Returns the value of an input parameter that is a string array. |\
| [setNumber](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MsetNumber)(key: string, param: number): void<br>Sets the value of an input parameter. |\
| [setNumberArray](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MsetNumberArray)(key: string, params: number\[\]): void<br>Sets the value of an input parameter. |\
| [setString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MsetString)(key: string, param: string): void<br>Sets the value of an input parameter. |\
| [setStringArray](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RInputParameters_MsetStringArray)(key: string, params: string\[\]): void<br>Sets the value of an input parameter. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| getNumber |\
| getNumber(key: string): number\
\
Returns the value of an input parameter that is a number. If the input parameter doesn't exist or the type is invalid, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
\
Returns\
\
number |\
\
|     |     |     |\
| --- | --- | --- |\
| getNumberArray |\
| getNumberArray(key: string): number\[\]\
\
Returns the value of an input parameter that is a number array. If the input parameter doesn't exist or the type is invalid, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
\
Returns\
\
number\[\] |\
\
|     |     |     |\
| --- | --- | --- |\
| getString |\
| getString(key: string): string\
\
Returns the value of an input parameter that is a string. If the input parameter doesn't exist or the type is invalid, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
\
Returns\
\
string |\
\
|     |     |     |\
| --- | --- | --- |\
| getStringArray |\
| getStringArray(key: string): string\[\]\
\
Returns the value of an input parameter that is a string array. If the input parameter doesn't exist or the type is invalid, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
\
Returns\
\
string\[\] |\
\
|     |     |     |\
| --- | --- | --- |\
| setNumber |\
| setNumber(key: string, param: number): void\
\
Sets the value of an input parameter. This overwrites any previous value of the input parameter, regardless of its type.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
| param: | number |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setNumberArray |\
| setNumberArray(key: string, params: number\[\]): void\
\
Sets the value of an input parameter. This overwrites any previous value of the input parameter, regardless of its type.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
| params: | number\[\] |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setString |\
| setString(key: string, param: string): void\
\
Sets the value of an input parameter. This overwrites any previous value of the input parameter, regardless of its type.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
| param: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setStringArray |\
| setStringArray(key: string, params: string\[\]): void\
\
Sets the value of an input parameter. This overwrites any previous value of the input parameter, regardless of its type.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| key: | string |  |\
| params: | string\[\] |  | |\
\
Type Library\
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)\
\
C\
\


---

<a name="shapestyle"></a>

ShapeStyle\
\
can be passed as a JSON object to method arguments\
\
Since\
\
2020.9\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [fillColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ShapeStyle_PfillColor): string<br>Fill color of the shape |\
| [lineColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ShapeStyle_PlineColor): string<br>Line color of the shape |\
\
Property Detail\
\
|     |\
| --- |\
| fillColor |\
| fillColor: string<br>Fill color of the shape |\
\
|     |\
| --- |\
| lineColor |\
| lineColor: string<br>Line color of the shape |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
C\
\


---

<a name="singlevariablevalue"></a>

SingleVariableValue\
\
extends [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue), can be passed as a JSON object to method arguments\
\
Since\
\
2019.22\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [exclude](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleVariableValue_Pexclude): boolean<br>Indicates whether to exclude the variable value. |\
| [value](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleVariableValue_Pvalue): string<br>Variable value |\
\
|     |\
| --- |\
| Inherited from [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue_Ptype) |\
\
Property Detail\
\
|     |\
| --- |\
| exclude |\
| exclude: boolean<br>Indicates whether to exclude the variable value. |\
\
|     |\
| --- |\
| value |\
| value: string<br>Variable value |\
\
Type Library\
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)\
\
C\
\


---

<a name="smartgrouping"></a>

SmartGrouping\
\
Last Update\
\
2021.6\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [setGroupLabel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping_MsetGroupLabel)(label: string): void<br>Sets the group prefix label. |\
| [setNumberOfGroups](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping_MsetNumberOfGroups)(number: integer): void<br>Sets the group number. |\
| [setTooltipFeedsIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping_MsetTooltipFeedsIncluded)(included: boolean): void<br>Includes or excludes the tooltip feeds. |\
| [setTooltipMeasureIncluded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping_MsetTooltipMeasureIncluded)(included: boolean): void<br>Deprecated This method is deprecated, use setTooltipFeedsIncluded() instead. |\
| [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SmartGrouping_MsetVisible)(visible: boolean): void<br>Enables or disables Smart Grouping. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| setGroupLabel |\
| setGroupLabel(label: string): void\
\
Sets the group prefix label.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| label: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setNumberOfGroups |\
| setNumberOfGroups(number: integer): void\
\
Sets the group number. If the number is invalid, then it is set to the min-max value of the valid range.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| number: | integer |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setTooltipFeedsIncluded |\
| setTooltipFeedsIncluded(included: boolean): void\
\
Includes or excludes the tooltip feeds.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| included: | boolean |  |\
\
Since\
\
2021.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| setTooltipMeasureIncluded |\
| setTooltipMeasureIncluded(included: boolean): void\
\
Deprecated This method is deprecated, use setTooltipFeedsIncluded() instead. Includes or excludes the tooltip measure.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| included: | boolean |  |\
\
Deprecated\
\
2021.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| setVisible |\
| setVisible(visible: boolean): void\
\
Enables or disables Smart Grouping.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| visible: | boolean |  | |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
E\
\


---

<a name="stringutils"></a>

StringUtils\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [replaceAll](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StringUtils_M_static_replaceAll)(value: string, searchFor: string, replaceWith: string): string<br>Replaces all occurrences of the searchFor string with the replaceWith string. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| replaceAll |\
| staticreplaceAll(value: string, searchFor: string, replaceWith: string): string\
\
Replaces all occurrences of the searchFor string with the replaceWith string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| value: | string |  |\
| searchFor: | string |  |\
| replaceWith: | string |  |\
\
Returns\
\
string |\
\
Type Library\
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)\
\
C\
\


---

<a name="tabstrip"></a>

TabStrip\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2019.16\
\
Last Update\
\
2020.7\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_MgetSelectedKey)(): string<br>Returns the key of the selected tab of the tab strip. |\
| [getTab](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_MgetTab)(tabKey: string): [Tab](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab)<br>Returns a tab of the tab strip. |\
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_MhideBusyIndicator)(): void<br>Hides the busy indicator. |\
| [moveWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_MmoveWidget)(tabName: string, widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void<br>Moves the widget into the specified tab of the tab strip. |\
| [setSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_MsetSelectedKey)(tabKey: string): void<br>Selects a tab. |\
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |\
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
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip_EonSelect)(): void<br>Called when the user selects a tab. |\
\
Method Detail\
\
|     |\
| --- |\
| getSelectedKey |\
| getSelectedKey(): string<br>Returns the key of the selected tab of the tab strip.<br>Returns<br>string |\
\
|     |     |     |\
| --- | --- | --- |\
| getTab |\
| getTab(tabKey: string): [Tab](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab)\
\
Returns a tab of the tab strip. The tab is specified by the key of the tab. If the tab doesn't exist, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| tabKey: | string |  |\
\
Returns\
\
[Tab](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab) |\
\
|     |\
| --- |\
| hideBusyIndicator |\
| hideBusyIndicator(): void<br>Hides the busy indicator.<br>Since<br>2020.1 |\
\
|     |     |     |\
| --- | --- | --- |\
| moveWidget |\
| moveWidget(tabName: string, widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void\
\
Moves the widget into the specified tab of the tab strip.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| tabName: | string |  |\
| widget: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |  |\
\
Since\
\
2020.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| setSelectedKey |\
| setSelectedKey(tabKey: string): void\
\
Selects a tab. The tab is specified by the key of the tab. The selected tab is the visible tab of the tab strip. If the tab doesn't exist, then this operation is ignored.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| tabKey: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| showBusyIndicator |\
| showBusyIndicator(text?: string): void\
\
Shows the busy indicator.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| textOptional: | string |  |\
\
Since\
\
2020.1 |\
\
Event Detail\
\
|     |\
| --- |\
| onSelect |\
| onSelect(): void<br>Called when the user selects a tab. |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
C\
\


---

<a name="textstyle"></a>

TextStyle\
\
can be passed as a JSON object to method arguments\
\
Since\
\
2020.9\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [backgroundColor](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextStyle_PbackgroundColor): string<br>Background color of the text |\
| [color](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextStyle_Pcolor): string<br>Font color of the text |\
\
Property Detail\
\
|     |\
| --- |\
| backgroundColor |\
| backgroundColor: string<br>Background color of the text |\
\
|     |\
| --- |\
| color |\
| color: string<br>Font color of the text |\
\
Type Library\
[timer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtimer)\
\
C\
\


---

<a name="urltype"></a>

UrlType\
\
Last Update\
\
2022.1\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [External](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType_P_static_External): [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType)<br>A hyperlink to an external URL is added. |\
| static [Mobile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType_P_static_Mobile): [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType)<br>A hyperlink to an mobile URL is added. |\
| static [None](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType_P_static_None): [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType)<br>No hyperlink is added. |\
\
Property Detail\
\
|     |\
| --- |\
| External |\
| staticExternal: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType)<br>A hyperlink to an external URL is added. |\
\
|     |\
| --- |\
| Mobile |\
| staticMobile: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType)<br>A hyperlink to an mobile URL is added.<br>Since<br>2022.1 |\
\
|     |\
| --- |\
| None |\
| staticNone: [UrlType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlType)<br>No hyperlink is added. |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
C\
\


---

<a name="usertype"></a>

UserType\
\
Since\
\
2020.9\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Team](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType_P_static_Team): [UserType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType)<br>Indicates a team. |\
| static [User](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType_P_static_User): [UserType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType)<br>Indicates a single user. |\
\
Property Detail\
\
|     |\
| --- |\
| Team |\
| staticTeam: [UserType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType)<br>Indicates a team. |\
\
|     |\
| --- |\
| User |\
| staticUser: [UserType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType)<br>Indicates a single user. |\
\
Type Library\
[value-driver-tree](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvalue-driver-tree)\
\
C\
\


---

<a name="variablevalue"></a>

VariableValue\
\
can be passed as a JSON object to method arguments\
\
Direct Subclasses\
\
[MultipleVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultipleVariableValue), [RangeVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeVariableValue), [SingleVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SingleVariableValue)\
\
Since\
\
2019.22\
\
Last Update\
\
2020.13\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue_Ptype): [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>Type of the variable value |\
\
Property Detail\
\
|     |\
| --- |\
| type |\
| type: [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>Type of the variable value<br>Since<br>2020.13 |\
\
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
E\
\


---

<a name="variablevaluetype"></a>

VariableValueType\
\
Since\
\
2020.13\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Multiple](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType_P_static_Multiple): [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>An object representing multiple variable values, like: {values: \['<memberId1>', '<memberId2>'\]} or {values: \['<memberId1>', '<memberId2>'\], exclude: true} |\
| static [Range](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType_P_static_Range): [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>An object representing a range of dimension members, like: {<operator>: '<memberId>'} or {<operator>: '<memberId>', exclude: true}, with operator being one of "from", "to", "less", "greater", "lessOrEqual", or "greaterOrEqual". |\
| static [Single](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType_P_static_Single): [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>An object representing a single variable value, like: {value: '<memberId>'} or {value: '<memberId>', exclude: true} |\
\
Property Detail\
\
|     |\
| --- |\
| Multiple |\
| staticMultiple: [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>An object representing multiple variable values, like: {values: \['<memberId1>', '<memberId2>'\]} or {values: \['<memberId1>', '<memberId2>'\], exclude: true} |\
\
|     |\
| --- |\
| Range |\
| staticRange: [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>An object representing a range of dimension members, like: {<operator>: '<memberId>'} or {<operator>: '<memberId>', exclude: true}, with operator being one of "from", "to", "less", "greater", "lessOrEqual", or "greaterOrEqual". |\
\
|     |\
| --- |\
| Single |\
| staticSingle: [VariableValueType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValueType)<br>An object representing a single variable value, like: {value: '<memberId>'} or {value: '<memberId>', exclude: true} |\
\
Type Library\
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)\
\
C\
\


---

