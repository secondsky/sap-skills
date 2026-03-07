# OSE API: Utilities & Helpers

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Utility and helper classes: bookmarks, comments, dimension/member/measure info, navigation, notifications, variables, and timer.

## Classes in This File

- [ActiveSelectedMembersOptions](#activeselectedmembersoptions)
- [Alias](#alias)
- [ArrayUtils](#arrayutils)
- [BackendConditionProperties](#backendconditionproperties)
- [BookmarkInfo](#bookmarkinfo)
- [BookmarkProperties](#bookmarkproperties)
- [BookmarkSaveInfo](#bookmarksaveinfo)
- [BookmarkSet](#bookmarkset)
- [CommentInfo](#commentinfo)
- [ConvertUtils](#convertutils)
- [CrossPagePopupSizeOptions](#crosspagepopupsizeoptions)
- [DimensionInfo](#dimensioninfo)
- [DimensionPropertyInfo](#dimensionpropertyinfo)
- [HierarchyInfo](#hierarchyinfo)
- [MeasureInfo](#measureinfo)
- [MemberInfo](#memberinfo)
- [MembersOptions](#membersoptions)
- [NavigationPanelOptions](#navigationpaneloptions)
- [NavigationUtils](#navigationutils)
- [NotificationOptions](#notificationoptions)
- [PrivateVersionPublishOptions](#privateversionpublishoptions)
- [PublicVersionPublishOptions](#publicversionpublishoptions)
- [ResultMemberInfo](#resultmemberinfo)
- [ResultMemberProperties](#resultmemberproperties)
- [RssFeedInfo](#rssfeedinfo)
- [RssReader](#rssreader)
- [SearchToInsight](#searchtoinsight)
- [SearchToInsightDialogMode](#searchtoinsightdialogmode)
- [SetModelOptions](#setmodeloptions)
- [SetVariableValueOptions](#setvariablevalueoptions)
- [TeamInfo](#teaminfo)
- [Timer](#timer)
- [TimeRange](#timerange)
- [TimeRangeGranularity](#timerangegranularity)
- [UrlParameter](#urlparameter)
- [UserInfo](#userinfo)
- [VariableInfo](#variableinfo)

---

<a name="activeselectedmembersoptions"></a>

ActiveSelectedMembersOptions

can be passed as a JSON object to method arguments

Since

2025.7

Property Summary

|     |
| --- |
| Name and Description |
| [isFullHierarchyNodes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions_PisFullHierarchyNodes): boolean<br>Specifies whether to return selected nodes and all their descendants (true) or only the selected nodes without descendants (false). |
| [limit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions_Plimit): integer<br>Maximum number of returned members, which must be zero or a positive number. |
| [returnNullAsAlias](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ActiveSelectedMembersOptions_PreturnNullAsAlias): boolean<br>If true, "@NullMember" is returned as alias for null members. |

Property Detail

|     |
| --- |
| isFullHierarchyNodes |
| isFullHierarchyNodes: boolean<br>Specifies whether to return selected nodes and all their descendants (true) or only the selected nodes without descendants (false). The default value is true. |

|     |
| --- |
| limit |
| limit: integer<br>Maximum number of returned members, which must be zero or a positive number. If the limit isn't specified or invalid, then the default value is used (default: 100). |

|     |
| --- |
| returnNullAsAlias |
| returnNullAsAlias: boolean<br>If true, "@NullMember" is returned as alias for null members. Default is false. |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="alias"></a>

Alias

Since

2019.8

Last Update

2020.13

Property Summary

|     |
| --- |
| Name and Description |
| static [DefaultTheme](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Alias_P_static_DefaultTheme): string<br>Represents the default theme. |
| static [FlatHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Alias_P_static_FlatHierarchy): string<br>Represents the flat hierarchy. |
| static [MeasureDimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Alias_P_static_MeasureDimension): string<br>Represents the measure dimension. |
| static [NullMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Alias_P_static_NullMember): string<br>Represents the NULL member of a dimension. |
| static [TotalsMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Alias_P_static_TotalsMember): string<br>Represents the Totals member of a dimension. |

Property Detail

|     |
| --- |
| DefaultTheme |
| staticDefaultTheme: string<br>Represents the default theme.<br>Since<br>2020.13 |

|     |
| --- |
| FlatHierarchy |
| staticFlatHierarchy: string<br>Represents the flat hierarchy. |

|     |
| --- |
| MeasureDimension |
| staticMeasureDimension: string<br>Represents the measure dimension. |

|     |
| --- |
| NullMember |
| staticNullMember: string<br>Represents the NULL member of a dimension. Such a member can typically be found in SAP HANA models as the result of joining database tables.<br>Since<br>2020.11 |

|     |
| --- |
| TotalsMember |
| staticTotalsMember: string<br>Represents the Totals member of a dimension. To take effect, enable the display of totals for the dimension.<br>Since<br>2020.11 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="arrayutils"></a>

ArrayUtils

Method Summary

|     |
| --- |
| Name and Description |
| static [create](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ArrayUtils_M_static_create)(type: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)): <empty array of type type><br>Creates and returns an empty array of the specified type. |

Method Detail

| Name | Signature | Description |
| --- | --- | --- |
| create | static create(type: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)): &lt;empty array of type type&gt; | Creates and returns an empty array of the specified type. |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| type | [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type) | The type of elements in the array. |

**Returns**

`<empty array of type type>`

C



---

<a name="backendconditionproperties"></a>

BackendConditionProperties

Since

2024.20

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendConditionProperties_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BackendConditionProperties_Pid): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| id |
| id: string |

C



---

<a name="bookmarkinfo"></a>

BookmarkInfo

Since

2019.15

Last Update

2021.11

Property Summary

|     |
| --- |
| Name and Description |
| [displayName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_PdisplayName): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_Pid): string |
| [isDefault](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_PisDefault): boolean<br>Specifies whether the bookmark is the default bookmark. |
| [isGlobal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_PisGlobal): boolean<br>Specifies whether the bookmark is visible globally. |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_Pname): string |
| [properties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_Pproperties): [BookmarkProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkProperties) JSON<br>Additional properties of the bookmark, for example, {"property1": "value1", "property2": "value2"} |
| [version](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo_Pversion): integer |

Property Detail

|     |
| --- |
| displayName |
| displayName: string<br>Since<br>2019.16 |

|     |
| --- |
| id |
| id: string |

|     |
| --- |
| isDefault |
| isDefault: boolean<br>Specifies whether the bookmark is the default bookmark.<br>Since<br>2021.11 |

|     |
| --- |
| isGlobal |
| isGlobal: boolean<br>Specifies whether the bookmark is visible globally. |

|     |
| --- |
| name |
| name: string |

|     |
| --- |
| properties |
| properties: [BookmarkProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkProperties) JSON<br>Additional properties of the bookmark, for example, {"property1": "value1", "property2": "value2"}<br>Since<br>2021.11 |

|     |
| --- |
| version |
| version: integer |

Type Library
[bookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLbookmark)

C



---

<a name="bookmarkproperties"></a>

BookmarkProperties

is an object<string>, can be passed as a JSON object to method arguments

Since

2021.11

Type Library
[bookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLbookmark)

C



---

<a name="bookmarksaveinfo"></a>

BookmarkSaveInfo

can be passed as a JSON object to method arguments

Since

2021.11

Last Update

2024.19

Property Summary

|     |
| --- |
| Name and Description |
| [isDefault](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo_PisDefault): boolean<br>Specifies whether the bookmark is the default bookmark. |
| [isGlobal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo_PisGlobal): boolean<br>Specifies whether the bookmark is visible globally. |
| [isKeepLastDynamicVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo_PisKeepLastDynamicVariableValue): boolean<br>Specifies whether the bookmark should apply last value of dynamic variable. |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo_Pname): string<br>Bookmark name |
| [properties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo_Pproperties): [BookmarkProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkProperties) JSON<br>Additional properties of the bookmark, for example, {"property1": "value1", "property2": "value2"} |
| [startPageId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo_PstartPageId): string<br>Specifies start page id. |

Property Detail

|     |
| --- |
| isDefault |
| isDefault: boolean<br>Specifies whether the bookmark is the default bookmark. |

|     |
| --- |
| isGlobal |
| isGlobal: boolean<br>Specifies whether the bookmark is visible globally. |

|     |
| --- |
| isKeepLastDynamicVariableValue |
| isKeepLastDynamicVariableValue: boolean<br>Specifies whether the bookmark should apply last value of dynamic variable.<br>Since<br>2022.7 |

|     |
| --- |
| name |
| name: string<br>Bookmark name |

|     |
| --- |
| properties |
| properties: [BookmarkProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkProperties) JSON<br>Additional properties of the bookmark, for example, {"property1": "value1", "property2": "value2"} |

|     |
| --- |
| startPageId |
| startPageId: string<br>Specifies start page id.<br>Since<br>2024.19 |

Type Library
[bookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLbookmark)

C



---

<a name="bookmarkset"></a>

BookmarkSet

Since

2019.15

Last Update

2021.11

Method Summary

|     |
| --- |
| Name and Description |
| [apply](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_Mapply)(bookmark: string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)): boolean<br>Applies the bookmark to the current analytic application. |
| [deleteBookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MdeleteBookmark)(bookmark: string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)): boolean<br>Deletes a bookmark of the analytic application. |
| [getAll](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MgetAll)(): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)\[\]<br>Returns all valid bookmarks of the analytic application. |
| [getAppliedBookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MgetAppliedBookmark)(): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)<br>Returns the bookmark that was applied to the analytic application. |
| [getVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MgetVersion)(): integer<br>Returns the current bookmark version of the analytic application. |
| [isSameAsApplicationState](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MisSameAsApplicationState)(bookmark: string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)): boolean<br>Returns whether the current state of the analytic application is the same as the state stored in a bookmark. |
| [openShareBookmarkDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MopenShareBookmarkDialog)(bookmarkId: string): void<br>Opens the Share Bookmark dialog for a bookmark. |
| [save](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_Msave)(bookmarkName: string, isGlobal: boolean, overwrite?: boolean): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)<br>Deprecated This method is deprecated, use saveBookmark() instead. |
| [saveBookmark](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSet_MsaveBookmark)(bookmarkSaveInfo: [BookmarkSaveInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo) JSON, overwrite?: boolean): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)<br>Saves a bookmark based on the current state of the analytic application. |

Method Detail

|     |     |     |
| --- | --- | --- |
| apply |
| apply(bookmark: string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)): boolean

Applies the bookmark to the current analytic application. If the bookmark is accessible to the current user, then true is returned, and false if it isn't.

Parameters

|     |     |     |
| --- | --- | --- |
| bookmark: | string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo) |  |

Returns

boolean

Since

2020.7 |

|     |     |     |
| --- | --- | --- |
| deleteBookmark |
| deleteBookmark(bookmark: string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)): boolean

Deletes a bookmark of the analytic application.

Parameters

|     |     |     |
| --- | --- | --- |
| bookmark: | string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo) |  |

Returns

boolean |

|     |
| --- |
| getAll |
| getAll(): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)\[\]<br>Returns all valid bookmarks of the analytic application.<br>Returns<br>[BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)\[\] |

|     |
| --- |
| getAppliedBookmark |
| getAppliedBookmark(): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)<br>Returns the bookmark that was applied to the analytic application.<br>Returns<br>[BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo) |

|     |
| --- |
| getVersion |
| getVersion(): integer<br>Returns the current bookmark version of the analytic application.<br>Returns<br>integer |

|     |     |     |
| --- | --- | --- |
| isSameAsApplicationState |
| isSameAsApplicationState(bookmark: string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)): boolean

Returns whether the current state of the analytic application is the same as the state stored in a bookmark.

Parameters

|     |     |     |
| --- | --- | --- |
| bookmark: | string \| [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo) |  |

Returns

boolean

Since

2019.23 |

|     |     |     |
| --- | --- | --- |
| openShareBookmarkDialog |
| openShareBookmarkDialog(bookmarkId: string): void

Opens the Share Bookmark dialog for a bookmark.

Parameters

|     |     |     |
| --- | --- | --- |
| bookmarkId: | string |  |

Mobile Support

Not supported on mobile devices.

Since

2021.11 |

|     |     |     |
| --- | --- | --- |
| save |
| save(bookmarkName: string, isGlobal: boolean, overwrite?: boolean): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)

Deprecated This method is deprecated, use saveBookmark() instead.

Parameters

|     |     |     |
| --- | --- | --- |
| bookmarkName: | string |  |
| isGlobal: | boolean |  |
| overwriteOptional: | boolean |  |

Returns

[BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)

Deprecated

2021.11 |

|     |     |     |
| --- | --- | --- |
| saveBookmark |
| saveBookmark(bookmarkSaveInfo: [BookmarkSaveInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo) JSON, overwrite?: boolean): [BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)

Saves a bookmark based on the current state of the analytic application. The bookmark save info specifies by default that the bookmark is neither globally visible nor a default bookmark. Optionally, you can specify whether to overwrite a bookmark with the same name (default: false).

Parameters

|     |     |     |
| --- | --- | --- |
| bookmarkSaveInfo: | [BookmarkSaveInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkSaveInfo) JSON |  |
| overwriteOptional: | boolean |  |

Returns

[BookmarkInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BookmarkInfo)

Since

2021.11 |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="commentinfo"></a>

CommentInfo

Since

2019.18

Property Summary

|     |
| --- |
| Name and Description |
| [commentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo_PcommentId): string |
| [createdAt](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo_PcreatedAt): string |
| [createdBy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo_PcreatedBy): [UserInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo) |
| [numberOfLikes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo_PnumberOfLikes): integer |
| [text](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CommentInfo_Ptext): string |

Property Detail

|     |
| --- |
| commentId |
| commentId: string |

|     |
| --- |
| createdAt |
| createdAt: string |

|     |
| --- |
| createdBy |
| createdBy: [UserInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo) |

|     |
| --- |
| numberOfLikes |
| numberOfLikes: integer |

|     |
| --- |
| text |
| text: string |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="convertutils"></a>

ConvertUtils

Method Summary

|     |
| --- |
| Name and Description |
| static [numberToString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ConvertUtils_M_static_numberToString)(value: number): string<br>Returns a string representation of the number value. |
| static [stringToInteger](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ConvertUtils_M_static_stringToInteger)(value: string): integer<br>Returns the integer value represented by the string. |
| static [stringToNumber](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ConvertUtils_M_static_stringToNumber)(value: string): number<br>Returns the number value represented by the string. |

Method Detail

|     |     |     |
| --- | --- | --- |
| numberToString |
| staticnumberToString(value: number): string

Returns a string representation of the number value. If the value is undefined, then the string "undefined" is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | number |  |

Returns

string |

|     |     |     |
| --- | --- | --- |
| stringToInteger |
| staticstringToInteger(value: string): integer

Returns the integer value represented by the string. If the string can't be parsed to a decimal integer, then NaN is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | string |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| stringToNumber |
| staticstringToNumber(value: string): number

Returns the number value represented by the string. If the string can't be parsed to a decimal number, then NaN is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | string |  |

Returns

number |

C



---

<a name="crosspagepopupsizeoptions"></a>

CrossPagePopupSizeOptions

Since

2024.25

Property Summary

|     |
| --- |
| Name and Description |
| static [height](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions_P_static_height): integer<br>Height |
| static [heightUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions_P_static_heightUnit): [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Height Unit |
| static [width](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions_P_static_width): integer<br>Width |
| static [widthUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions_P_static_widthUnit): [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Width Unit |

Property Detail

|     |
| --- |
| height |
| staticheight: integer<br>Height |

|     |
| --- |
| heightUnit |
| staticheightUnit: [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Height Unit |

|     |
| --- |
| width |
| staticwidth: integer<br>Width |

|     |
| --- |
| widthUnit |
| staticwidthUnit: [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Width Unit |

C



---

<a name="dimensioninfo"></a>

DimensionInfo

can be passed as a JSON object to method arguments

Last Update

2022.1

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo_Pid): string |
| [modelId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo_PmodelId): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| id |
| id: string<br>Since<br>2019.7 |

|     |
| --- |
| modelId |
| modelId: string<br>Since<br>2022.1 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="dimensionpropertyinfo"></a>

DimensionPropertyInfo

Since

2020.7

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionPropertyInfo_Pid): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| id |
| id: string |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="hierarchyinfo"></a>

HierarchyInfo

can be passed as a JSON object to method arguments

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo_Pid): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| id |
| id: string |

Type Library
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)

C



---

<a name="measureinfo"></a>

MeasureInfo

can be passed as a JSON object to method arguments

Since

2019.1

Last Update

2022.1

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo_Pdescription): string |
| [dimensionId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo_PdimensionId): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo_Pid): string |
| [modelId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MeasureInfo_PmodelId): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| dimensionId |
| dimensionId: string<br>Since<br>2019.7 |

|     |
| --- |
| id |
| id: string<br>Since<br>2019.7 |

|     |
| --- |
| modelId |
| modelId: string<br>Since<br>2022.1 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

E



---

<a name="memberinfo"></a>

MemberInfo

can be passed as a JSON object to method arguments

Last Update

2022.1

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo_Pdescription): string |
| [dimensionId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo_PdimensionId): string |
| [displayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo_PdisplayId): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo_Pid): string |
| [modelId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo_PmodelId): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| dimensionId |
| dimensionId: string<br>Since<br>2019.7 |

|     |
| --- |
| displayId |
| displayId: string |

|     |
| --- |
| id |
| id: string<br>Since<br>2019.7 |

|     |
| --- |
| modelId |
| modelId: string<br>Since<br>2022.1 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="membersoptions"></a>

MembersOptions

can be passed as a JSON object to method arguments

A set of values to describe the members to retrieve

Since

2021.1

Property Summary

|     |
| --- |
| Name and Description |
| [accessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MembersOptions_PaccessMode): [MemberAccessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode)<br>Type of members to retrieve (default: MemberAccessMode.MasterData) |
| [hierarchyId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MembersOptions_PhierarchyId): string<br>Hierarchy ID (default: currently active hierarchy) |
| [limit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MembersOptions_Plimit): integer<br>Maximum number of returned members, which must be zero or a positive number. |

Property Detail

|     |
| --- |
| accessMode |
| accessMode: [MemberAccessMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberAccessMode)<br>Type of members to retrieve (default: MemberAccessMode.MasterData) |

|     |
| --- |
| hierarchyId |
| hierarchyId: string<br>Hierarchy ID (default: currently active hierarchy) |

|     |
| --- |
| limit |
| limit: integer<br>Maximum number of returned members, which must be zero or a positive number. If the limit isn't specified or invalid, then the default value is used (default: 200). |

Type Library
[multi-action](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLmulti-action)

C



---

<a name="navigationpaneloptions"></a>

NavigationPanelOptions

can be passed as a JSON object to method arguments

An object specifying navigation panel options

Since

2020.13

Property Summary

|     |
| --- |
| Name and Description |
| [expanded](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationPanelOptions_Pexpanded): boolean<br>Indicates whether the navigation panel opens in expanded state. |

Property Detail

|     |
| --- |
| expanded |
| expanded: boolean<br>Indicates whether the navigation panel opens in expanded state. |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="navigationutils"></a>

NavigationUtils

Since

2019.7

Last Update

2025.5

Method Summary

|     |
| --- |
| Name and Description |
| static [createApplicationUrl](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_createApplicationUrl)(appId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\]): string<br>Creates an analytic application URL. |
| static [createStoryUrl](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_createStoryUrl)(storyId: string, pageId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\]): string<br>Creates a story URL. |
| static [openApplication](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_openApplication)(appId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void<br>Opens an analytic application. |
| static [openDataAnalyzer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_openDataAnalyzer)(connection?: string, dataSourceName?: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void<br>Opens the Data Analyzer. |
| static [openInsight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_openInsight)(insightId: string, urlParameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void<br>Opens the Insight. |
| static [openStory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_openStory)(storyId: string, pageId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void<br>Opens a story. |
| static [openUrl](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NavigationUtils_M_static_openUrl)(url: string, newTab?: boolean): void<br>Opens a URL. |

Method Detail

|     |     |     |
| --- | --- | --- |
| createApplicationUrl |
| staticcreateApplicationUrl(appId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\]): string

Creates an analytic application URL.

Parameters

|     |     |     |
| --- | --- | --- |
| appId: | string |  |
| parametersOptional: | [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\] |  |

Returns

string

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| createStoryUrl |
| staticcreateStoryUrl(storyId: string, pageId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\]): string

Creates a story URL.

Parameters

|     |     |     |
| --- | --- | --- |
| storyId: | string |  |
| pageId: | string |  |
| parametersOptional: | [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\] |  |

Returns

string

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| openApplication |
| staticopenApplication(appId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void

Opens an analytic application. Note: This operation is ignored when scheduling a publication.

Parameters

|     |     |     |
| --- | --- | --- |
| appId: | string |  |
| parametersOptional: | [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\] |  |
| newTabOptional: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| openDataAnalyzer |
| staticopenDataAnalyzer(connection?: string, dataSourceName?: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void

Opens the Data Analyzer. Note: This operation is ignored when scheduling a publication.

Parameters

|     |     |     |
| --- | --- | --- |
| connectionOptional: | string |  |
| dataSourceNameOptional: | string |  |
| parametersOptional: | [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\] |  |
| newTabOptional: | boolean |  |

Since

2019.14 |

|     |     |     |
| --- | --- | --- |
| openInsight |
| staticopenInsight(insightId: string, urlParameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void

Opens the Insight. Note: This operation is ignored when scheduling a publication.

Parameters

|     |     |     |
| --- | --- | --- |
| insightId: | string |  |
| urlParametersOptional: | [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\] |  |
| newTabOptional: | boolean |  |

Mobile Support

Not supported on mobile devices.

Since

2024.25

Last Update

2025.5 |

|     |     |     |
| --- | --- | --- |
| openStory |
| staticopenStory(storyId: string, pageId: string, parameters?: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\], newTab?: boolean): void

Opens a story. Note: This operation is ignored when scheduling a publication.

Parameters

|     |     |     |
| --- | --- | --- |
| storyId: | string |  |
| pageId: | string |  |
| parametersOptional: | [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) \| [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\] |  |
| newTabOptional: | boolean |  | |

|     |     |     |
| --- | --- | --- |
| openUrl |
| staticopenUrl(url: string, newTab?: boolean): void

Opens a URL. Note: This operation is ignored when scheduling a publication.

Parameters

|     |     |     |
| --- | --- | --- |
| url: | string |  |
| newTabOptional: | boolean |  | |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="notificationoptions"></a>

NotificationOptions

can be passed as a JSON object to method arguments

Since

2020.7

Last Update

2020.17

Property Summary

|     |
| --- |
| Name and Description |
| [content](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_Pcontent): string<br>Content of the notification |
| [isSendEmail](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_PisSendEmail): boolean<br>Indicates whether an email notification is sent to the receivers (default: false). |
| [isSendMobileNotification](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_PisSendMobileNotification): boolean<br>Indicates whether a mobile notification is sent to the receivers (default: false). |
| [mode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_Pmode): [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>Mode in which the analytic application is displayed when it is opened from the notification (default: Present) |
| [parameters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_Pparameters): [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\]<br>URL parameters to be used when opening the analytic application |
| [receivers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_Preceivers): string\[\]<br>Users to receive the notification. |
| [title](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions_Ptitle): string<br>Title of the notification |

Property Detail

|     |
| --- |
| content |
| content: string<br>Content of the notification |

|     |
| --- |
| isSendEmail |
| isSendEmail: boolean<br>Indicates whether an email notification is sent to the receivers (default: false). |

|     |
| --- |
| isSendMobileNotification |
| isSendMobileNotification: boolean<br>Indicates whether a mobile notification is sent to the receivers (default: false).<br>Since<br>2020.17 |

|     |
| --- |
| mode |
| mode: [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>Mode in which the analytic application is displayed when it is opened from the notification (default: Present) |

|     |
| --- |
| parameters |
| parameters: [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)\[\]<br>URL parameters to be used when opening the analytic application |

|     |
| --- |
| receivers |
| receivers: string\[\]<br>Users to receive the notification. If no receivers are specified, then the receiver is the creator of the calendar task that runs the analytic application by the scheduling service. |

|     |
| --- |
| title |
| title: string<br>Title of the notification |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

O

Number

The Number JavaScript object is a wrapper object allowing you to work with numerical values.

Property Summary

|     |
| --- |
| Name and Description |
| static [EPSILON](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_EPSILON): number<br>Difference between 1 and the smallest value greater than 1 that can be represented as a Number. |
| static [MAX\_SAFE\_INTEGER](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_MAX_SAFE_INTEGER): integer<br>Maximum safe integer in JavaScript (2^53 - 1). |
| static [MAX\_VALUE](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_MAX_VALUE): number<br>Maximum numeric value representable in JavaScript. |
| static [MIN\_SAFE\_INTEGER](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_MIN_SAFE_INTEGER): integer<br>Minimum safe integer in JavaScript (-(2^53 - 1)). |
| static [MIN\_VALUE](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_MIN_VALUE): number<br>Smallest positive numeric value representable in JavaScript. |
| static [NEGATIVE\_INFINITY](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_NEGATIVE_INFINITY): number<br>Negative Infinity value. |
| static [POSITIVE\_INFINITY](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_P_static_POSITIVE_INFINITY): number<br>Positive Infinity value. |

Method Summary

|     |
| --- |
| Name and Description |
| static [isFinite](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_M_static_isFinite)(testValue: <any type>): boolean<br>Returns whether the value is a finite number. |
| static [isInteger](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_M_static_isInteger)(testValue: <any type>): boolean<br>Returns whether the value is an integer. |
| static [isNaN](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_M_static_isNaN)(testValue: <any type>): boolean<br>Returns whether the value is NaN and its type is a Number. |
| static [isSafeInteger](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_M_static_isSafeInteger)(testValue: <any type>): boolean<br>Returns whether the value is a safe integer. |
| static [parseFloat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_M_static_parseFloat)(string: string): number<br>Parses a string and returns a floating-point number. |
| static [parseInt](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_M_static_parseInt)(string: string, radix?: number): integer<br>Parses a string and returns an integer of the specified radix or base. |
| [toExponential](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_MtoExponential)(significantDigits?: number): string<br>Returns a string representing the number in exponential notation. |
| [toFixed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_MtoFixed)(significantDigits?: number): string<br>Returns a string representing the number in fixed-point notation. |
| [toPrecision](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_MtoPrecision)(significantDigits?: number): string<br>Returns a string representing the number to the specified precision. |
| [toString](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Number_MtoString)(radix?: number): string<br>Returns a string representing the number in the (optionally) specified radix or base. |

Property Detail

|     |
| --- |
| EPSILON |
| staticEPSILON: number<br>Difference between 1 and the smallest value greater than 1 that can be represented as a Number. |

|     |
| --- |
| MAX\_SAFE\_INTEGER |
| staticMAX\_SAFE\_INTEGER: integer<br>Maximum safe integer in JavaScript (2^53 - 1). |

|     |
| --- |
| MAX\_VALUE |
| staticMAX\_VALUE: number<br>Maximum numeric value representable in JavaScript. |

|     |
| --- |
| MIN\_SAFE\_INTEGER |
| staticMIN\_SAFE\_INTEGER: integer<br>Minimum safe integer in JavaScript (-(2^53 - 1)). |

|     |
| --- |
| MIN\_VALUE |
| staticMIN\_VALUE: number<br>Smallest positive numeric value representable in JavaScript. |

|     |
| --- |
| NEGATIVE\_INFINITY |
| staticNEGATIVE\_INFINITY: number<br>Negative Infinity value. |

|     |
| --- |
| POSITIVE\_INFINITY |
| staticPOSITIVE\_INFINITY: number<br>Positive Infinity value. |

Method Detail

|     |     |     |
| --- | --- | --- |
| isFinite |
| staticisFinite(testValue: <any type>): boolean

Returns whether the value is a finite number.

Parameters

|     |     |     |
| --- | --- | --- |
| testValue: | <any type> |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| isInteger |
| staticisInteger(testValue: <any type>): boolean

Returns whether the value is an integer.

Parameters

|     |     |     |
| --- | --- | --- |
| testValue: | <any type> |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| isNaN |
| staticisNaN(testValue: <any type>): boolean

Returns whether the value is NaN and its type is a Number.

Parameters

|     |     |     |
| --- | --- | --- |
| testValue: | <any type> |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| isSafeInteger |
| staticisSafeInteger(testValue: <any type>): boolean

Returns whether the value is a safe integer. A safe integer is an integer that can be exactly represented as an IEEE-754 double precision number and whose IEEE-754 representation can't be the result of rounding any other integer to fit the IEEE-754 representation.

Parameters

|     |     |     |
| --- | --- | --- |
| testValue: | <any type> |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| parseFloat |
| staticparseFloat(string: string): number

Parses a string and returns a floating-point number.

Parameters

|     |     |     |
| --- | --- | --- |
| string: | string |  |

Returns

number |

|     |     |     |
| --- | --- | --- |
| parseInt |
| staticparseInt(string: string, radix?: number): integer

Parses a string and returns an integer of the specified radix or base.

Parameters

|     |     |     |
| --- | --- | --- |
| string: | string |  |
| radixOptional: | number |  |

Returns

integer |

|     |     |     |
| --- | --- | --- |
| toExponential |
| toExponential(significantDigits?: number): string

Returns a string representing the number in exponential notation. It has one digit before the decimal point and is rounded to significantDigits digits after the decimal point.

Parameters

|     |     |     |
| --- | --- | --- |
| significantDigitsOptional: | number |  |

Returns

string |

|     |     |     |
| --- | --- | --- |
| toFixed |
| toFixed(significantDigits?: number): string

Returns a string representing the number in fixed-point notation. It is rounded to significantDigits digits after the decimal point.

Parameters

|     |     |     |
| --- | --- | --- |
| significantDigitsOptional: | number |  |

Returns

string |

|     |     |     |
| --- | --- | --- |
| toPrecision |
| toPrecision(significantDigits?: number): string

Returns a string representing the number to the specified precision. It is rounded to significantDigits digits after the decimal point.

Parameters

|     |     |     |
| --- | --- | --- |
| significantDigitsOptional: | number |  |

Returns

string |

|     |     |     |
| --- | --- | --- |
| toString |
| toString(radix?: number): string

Returns a string representing the number in the (optionally) specified radix or base.

Parameters

|     |     |     |
| --- | --- | --- |
| radixOptional: | number |  |

Returns

string |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="privateversionpublishoptions"></a>

PrivateVersionPublishOptions

can be passed as a JSON object to method arguments

Private version publish options

Since

2023.15

Property Summary

|     |
| --- |
| Name and Description |
| [privatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions_PprivatePublishConflict): [PrivatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict)<br>Used for handling conflicting changes. |

Property Detail

|     |
| --- |
| privatePublishConflict |
| privatePublishConflict: [PrivatePublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivatePublishConflict)<br>Used for handling conflicting changes. The values correspond to showing the conflict warning dialog, overwriting user's changes without showing the dialog respectively. |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

E



---

<a name="publicversionpublishoptions"></a>

PublicVersionPublishOptions

can be passed as a JSON object to method arguments

Public version publish options

Since

2023.15

Property Summary

|     |
| --- |
| Name and Description |
| [publicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions_PpublicPublishConflict): [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Used for handling conflicting changes. |

Property Detail

|     |
| --- |
| publicPublishConflict |
| publicPublishConflict: [PublicPublishConflict](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicPublishConflict)<br>Used for handling conflicting changes. The values correspond to showing the conflict warning dialog, overwriting user's changes without showing the dialog, and reverting the version without showing the dialog respectively. |

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="resultmemberinfo"></a>

ResultMemberInfo

can be passed as a JSON object to method arguments

A result member info contains information about a member. You can retrieve this information with DataSource.getResultMember(). For example, a result member info is {description: "World(root)", id: "\[t.TEST:Location\_Hier\_World\_2\].\[parentId\].&\[World\]", parentId: undefined, properties: {}}.

Since

2019.20

Last Update

2020.10

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo_Pdescription): string<br>Member description |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo_Pid): string<br>Member ID |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo_PparentId): string<br>Parent ID of member |
| [properties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberInfo_Pproperties): [ResultMemberProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberProperties)<br>Properties of a dimension |

Property Detail

|     |
| --- |
| description |
| description: string<br>Member description |

|     |
| --- |
| id |
| id: string<br>Member ID |

|     |
| --- |
| parentId |
| parentId: string<br>Parent ID of member |

|     |
| --- |
| properties |
| properties: [ResultMemberProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ResultMemberProperties)<br>Properties of a dimension<br>Since<br>2020.10 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="resultmemberproperties"></a>

ResultMemberProperties

is an object<string>

Properties

Since

2020.10

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="rssfeedinfo"></a>

RssFeedInfo

Property Summary

|     |
| --- |
| Name and Description |
| [title](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo_Ptitle): string |
| [url](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo_Purl): string |

Property Detail

|     |
| --- |
| title |
| title: string |

|     |
| --- |
| url |
| url: string |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="rssreader"></a>

RssReader

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Method Summary

|     |
| --- |
| Name and Description |
| [addFeed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader_MaddFeed)(title: string, url: string): void<br>Adds a new RSS feed to the RSS feeds. |
| [getAllFeeds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader_MgetAllFeeds)(): [RssFeedInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo)\[\]<br>Returns all RSS feeds. |
| [getSelectedFeed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader_MgetSelectedFeed)(): [RssFeedInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo)<br>Returns the selected RSS feed. |
| [removeAllFeeds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader_MremoveAllFeeds)(): void<br>Removes all RSS feeds. |
| [removeFeed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader_MremoveFeed)(url: string): void<br>Removes any RSS feed with this URL from the RSS feeds. |
| [setSelectedFeed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader_MsetSelectedFeed)(url: string): void<br>Selects the first RSS feed with this URL. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Method Detail

|     |     |     |
| --- | --- | --- |
| addFeed |
| addFeed(title: string, url: string): void

Adds a new RSS feed to the RSS feeds. If an RSS feed with the same title and URL is already present, then the new RSS feed is still added.

Parameters

|     |     |     |
| --- | --- | --- |
| title: | string |  |
| url: | string |  | |

|     |
| --- |
| getAllFeeds |
| getAllFeeds(): [RssFeedInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo)\[\]<br>Returns all RSS feeds.<br>Returns<br>[RssFeedInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo)\[\] |

|     |
| --- |
| getSelectedFeed |
| getSelectedFeed(): [RssFeedInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo)<br>Returns the selected RSS feed.<br>Returns<br>[RssFeedInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssFeedInfo) |

|     |
| --- |
| removeAllFeeds |
| removeAllFeeds(): void<br>Removes all RSS feeds. |

|     |     |     |
| --- | --- | --- |
| removeFeed |
| removeFeed(url: string): void

Removes any RSS feed with this URL from the RSS feeds. If an RSS feed is removed that is selected, then that RSS feed is removed, and the first RSS feed of the RSS feeds is selected. If there is no RSS feed with this URL, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| url: | string |  | |

|     |     |     |
| --- | --- | --- |
| setSelectedFeed |
| setSelectedFeed(url: string): void

Selects the first RSS feed with this URL. If there is no RSS feed with this URL, then this operation is ignored.

Parameters

|     |     |     |
| --- | --- | --- |
| url: | string |  | |

Type Library
[advanced-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLadvanced-controls)

C



---

<a name="searchtoinsight"></a>

SearchToInsight

Since

2019.14

Last Update

2020.1

Method Summary

|     |
| --- |
| Name and Description |
| [applySearchToChart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsight_MapplySearchToChart)(question: string, chart: [Chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart)): boolean<br>Applies the Search to Insight result to a chart. |
| [closeDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsight_McloseDialog)(): void |
| [getVariables](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsight_MgetVariables)(modelId: string): [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]<br>Returns the variable values stored in this Search to Insight component. |
| [openDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsight_MopenDialog)(question: string, mode: [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode), cleanHistory?: boolean, autoSearch?: boolean): void |
| [setVariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsight_MsetVariableValue)(modelId: string, variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON): void<br>Stores a variable value in this Search to Insight component. |

Method Detail

|     |     |     |
| --- | --- | --- |
| applySearchToChart |
| applySearchToChart(question: string, chart: [Chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart)): boolean

Applies the Search to Insight result to a chart. The chart also applies variable values set by earlier calls of SearchToInsight.setVariableValue().

Parameters

|     |     |     |
| --- | --- | --- |
| question: | string |  |
| chart: | [Chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart) |  |

Returns

boolean

Since

2020.1 |

|     |
| --- |
| closeDialog |
| closeDialog(): void |

|     |     |     |
| --- | --- | --- |
| getVariables |
| getVariables(modelId: string): [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]

Returns the variable values stored in this Search to Insight component.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |

Returns

[VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo)\[\]

Since

2020.1 |

|     |     |     |
| --- | --- | --- |
| openDialog |
| openDialog(question: string, mode: [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode), cleanHistory?: boolean, autoSearch?: boolean): void

Parameters

|     |     |     |
| --- | --- | --- |
| question: | string |  |
| mode: | [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode) |  |
| cleanHistoryOptional: | boolean |  |
| autoSearchOptional: | boolean |  |

Mobile Support

Not supported on mobile devices. |

|     |     |     |
| --- | --- | --- |
| setVariableValue |
| setVariableValue(modelId: string, variable: string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo), variableValue: string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON): void

Stores a variable value in this Search to Insight component. The variable value is applied to a chart when calling SearchToInsight.applySearchToChart().

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |
| variable: | string \| [VariableInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo) |  |
| variableValue: | string \| number \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue) JSON \| [VariableValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableValue)\[\]JSON |  |

Since

2020.1 |

Type Library
[search-to-insight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLsearch-to-insight)

E



---

<a name="searchtoinsightdialogmode"></a>

SearchToInsightDialogMode

Since

2019.14

Property Summary

|     |
| --- |
| Name and Description |
| static [Advanced](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode_P_static_Advanced): [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode)<br>Advanced Search to Insight dialog with model selection and suggestions |
| static [Simple](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode_P_static_Simple): [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode)<br>Simple Search to Insight dialog |

Property Detail

|     |
| --- |
| Advanced |
| staticAdvanced: [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode)<br>Advanced Search to Insight dialog with model selection and suggestions |

|     |
| --- |
| Simple |
| staticSimple: [SearchToInsightDialogMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SearchToInsightDialogMode)<br>Simple Search to Insight dialog |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="setmodeloptions"></a>

SetModelOptions

can be passed as a JSON object to method arguments

Since

2025.6

Property Summary

|     |
| --- |
| Name and Description |
| [suppressPromptDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetModelOptions_PsuppressPromptDialog): boolean<br>suppress prompt dialog |

Property Detail

|     |
| --- |
| suppressPromptDialog |
| suppressPromptDialog: boolean<br>suppress prompt dialog |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="setvariablevalueoptions"></a>

SetVariableValueOptions

can be passed as a JSON object to method arguments

A set of values to describe the variables to retrieve

Since

2021.17

Property Summary

|     |
| --- |
| Name and Description |
| [loadDescriptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SetVariableValueOptions_PloadDescriptions): boolean<br>Specifies whether to load the variable value descriptions for the Prompt dialog and for dynamic texts (default: true). |

Property Detail

|     |
| --- |
| loadDescriptions |
| loadDescriptions: boolean<br>Specifies whether to load the variable value descriptions for the Prompt dialog and for dynamic texts (default: true). If set to false, then this may improve the performance of the analytic application, however at the cost of displaying variable value IDs instead of variable value descriptions in the Prompt dialog and in dynamic texts. |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="teaminfo"></a>

TeamInfo

Since

2023.9

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TeamInfo_Pdescription): string |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TeamInfo_Pname): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| name |
| name: string |

Type Library
[visualization-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLvisualization-controls)

C



---

<a name="timer"></a>

Timer

Since

2019.20

Last Update

2019.21

Method Summary

|     |
| --- |
| Name and Description |
| [isRunning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Timer_MisRunning)(): boolean<br>Returns whether the timer is running. |
| [start](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Timer_Mstart)(delayInSeconds: number): void<br>Starts the timer. |
| [stop](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Timer_Mstop)(): void<br>Stops the timer. |

Event Summary

|     |
| --- |
| Name and Description |
| [onTimeout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Timer_EonTimeout)(): void<br>Called when the set timespan of the timer has elapsed. |

Method Detail

|     |
| --- |
| isRunning |
| isRunning(): boolean<br>Returns whether the timer is running.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| start |
| start(delayInSeconds: number): void

Starts the timer.

Parameters

|     |     |     |
| --- | --- | --- |
| delayInSeconds: | number |  | |

|     |
| --- |
| stop |
| stop(): void<br>Stops the timer. |

Event Detail

|     |
| --- |
| onTimeout |
| onTimeout(): void<br>Called when the set timespan of the timer has elapsed.<br>Since<br>2019.21 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

<a name="timerange"></a>

TimeRange

Method Summary

|     |
| --- |
| Name and Description |
| static [create](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange_M_static_create)(granularity: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity), start: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), end: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)<br>Creates a time range with the specified granularity, start date, and end date. |
| static [createMonthRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange_M_static_createMonthRange)(startYear: integer, startMonth: integer, endYear: integer, endMonth: integer): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)<br>Creates a time range with the specified start and end years and months. |
| static [createWeekRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange_M_static_createWeekRange)(startYear: integer, startWeek: integer, endYear: integer, endWeek: integer): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)<br>Creates a time range with the specified start and end years and weeks. |
| static [createYearRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange_M_static_createYearRange)(start: integer, end: integer): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)<br>Creates a time range with the specified start year and end year. |

Method Detail

|     |     |     |
| --- | --- | --- |
| create |
| staticcreate(granularity: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity), start: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date), end: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)

Creates a time range with the specified granularity, start date, and end date.

Parameters

|     |     |     |
| --- | --- | --- |
| granularity: | [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity) |  |
| start: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |
| end: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |

Returns

[TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) |

|     |     |     |
| --- | --- | --- |
| createMonthRange |
| staticcreateMonthRange(startYear: integer, startMonth: integer, endYear: integer, endMonth: integer): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)

Creates a time range with the specified start and end years and months.

Parameters

|     |     |     |
| --- | --- | --- |
| startYear: | integer |  |
| startMonth: | integer |  |
| endYear: | integer |  |
| endMonth: | integer |  |

Returns

[TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) |

|     |     |     |
| --- | --- | --- |
| createWeekRange |
| staticcreateWeekRange(startYear: integer, startWeek: integer, endYear: integer, endWeek: integer): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)

Creates a time range with the specified start and end years and weeks.

Parameters

|     |     |     |
| --- | --- | --- |
| startYear: | integer |  |
| startWeek: | integer |  |
| endYear: | integer |  |
| endWeek: | integer |  |

Returns

[TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) |

|     |     |     |
| --- | --- | --- |
| createYearRange |
| staticcreateYearRange(start: integer, end: integer): [TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange)

Creates a time range with the specified start year and end year.

Parameters

|     |     |     |
| --- | --- | --- |
| start: | integer |  |
| end: | integer |  |

Returns

[TimeRange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRange) |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

E



---

<a name="timerangegranularity"></a>

TimeRangeGranularity

Property Summary

|     |
| --- |
| Name and Description |
| static [Day](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Day): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of days |
| static [HalfYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_HalfYear): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of half-years |
| static [Hour](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Hour): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of hours |
| static [Millisecond](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Millisecond): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of milliseconds |
| static [Minute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Minute): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of minutes |
| static [Month](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Month): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of months |
| static [Quarter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Quarter): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of quarters |
| static [Second](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Second): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of seconds |
| static [Year](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity_P_static_Year): [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of years |

Property Detail

|     |
| --- |
| Day |
| staticDay: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of days |

|     |
| --- |
| HalfYear |
| staticHalfYear: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of half-years |

|     |
| --- |
| Hour |
| staticHour: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of hours |

|     |
| --- |
| Millisecond |
| staticMillisecond: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of milliseconds |

|     |
| --- |
| Minute |
| staticMinute: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of minutes |

|     |
| --- |
| Month |
| staticMonth: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of months |

|     |
| --- |
| Quarter |
| staticQuarter: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of quarters |

|     |
| --- |
| Second |
| staticSecond: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of seconds |

|     |
| --- |
| Year |
| staticYear: [TimeRangeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TimeRangeGranularity)<br>A range of years |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E

Type

Property Summary

|     |
| --- |
| Name and Description |
| static [boolean](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type_P_static_boolean): [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "boolean" type |
| static [integer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type_P_static_integer): [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "integer" type |
| static [number](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type_P_static_number): [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "number" type |
| static [string](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type_P_static_string): [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "string" type |

Property Detail

|     |
| --- |
| boolean |
| staticboolean: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "boolean" type |

|     |
| --- |
| integer |
| staticinteger: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "integer" type |

|     |
| --- |
| number |
| staticnumber: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "number" type |

|     |
| --- |
| string |
| staticstring: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type)<br>The "string" type |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

O

undefined

The value undefined.

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="urlparameter"></a>

UrlParameter

An object representing a URL parameter

Since

2019.7

Method Summary

|     |
| --- |
| Name and Description |
| static [create](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter_M_static_create)(parameterName: string, parameterValueNotEncoded: string): [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)<br>Creates a URL parameter. |

Method Detail

|     |     |     |
| --- | --- | --- |
| create |
| staticcreate(parameterName: string, parameterValueNotEncoded: string): [UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter)

Creates a URL parameter.

Parameters

|     |     |     |
| --- | --- | --- |
| parameterName: | string |  |
| parameterValueNotEncoded: | string |  |

Returns

[UrlParameter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UrlParameter) |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="userinfo"></a>

UserInfo

Since

2019.5

Property Summary

|     |
| --- |
| Name and Description |
| [displayName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo_PdisplayName): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo_Pid): string |

Property Detail

|     |
| --- |
| displayName |
| displayName: string |

|     |
| --- |
| id |
| id: string |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="variableinfo"></a>

VariableInfo

Since

2019.22

Last Update

2022.1

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo_Pid): string |
| [isInputEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo_PisInputEnabled): boolean |
| [modelId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#VariableInfo_PmodelId): string |

Property Detail

|     |
| --- |
| description |
| description: string |

|     |
| --- |
| id |
| id: string |

|     |
| --- |
| isInputEnabled |
| isInputEnabled: boolean |

|     |
| --- |
| modelId |
| modelId: string<br>Since<br>2022.1 |

Type Library
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)

C



---

