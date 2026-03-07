# OSE API: Application & Core

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Core application classes for Optimized Story Experience: Application lifecycle, page management, panels, popups, and widget base types.

## Classes in This File

- [Application](#application)
- [ApplicationInfo](#applicationinfo)
- [ApplicationMessageType](#applicationmessagetype)
- [ApplicationMode](#applicationmode)
- [ApplicationPage](#applicationpage)
- [PageBook](#pagebook)
- [PageBookPage](#pagebookpage)
- [Panel](#panel)
- [Popup](#popup)
- [PopupSizeOptions](#popupsizeoptions)
- [PopupSizeUnit](#popupsizeunit)
- [StoryPopup](#storypopup)
- [Tab](#tab)
- [Widget](#widget)
- [WidgetSearchOptions](#widgetsearchoptions)
- [WidgetType](#widgettype)

---

<a name="application"></a>

Application

Since

2019.1

Last Update

2023.13

Method Summary

|     |
| --- |
| Name and Description |
| [getActivePage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetActivePage)(): [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage)<br>Get the active page. |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetCssClass)(): string<br>Returns the Cascading Style Sheet (CSS) class name of the canvas of the first page. |
| [getFileDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetFileDataSource)(modelId: string): [FileDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource)<br>Returns the data source of related modelId. |
| [getGlobalCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetGlobalCssClass)(): string<br>Returns the global default Cascading Style Sheet (CSS) class name. |
| [getInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetInfo)(): [ApplicationInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationInfo)<br>Returns information about the analytic application. |
| [getInnerHeight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetInnerHeight)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Get InnerHeight of first page. |
| [getInnerWidth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetInnerWidth)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Get InnerWidth of first page. |
| [getMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetMode)(): [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>Returns the mode in which the analytic application is displayed. |
| [getRolesInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetRolesInfo)(): string\[\]<br>Returns role information about the current user. |
| [getTeamsInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetTeamsInfo)(): [TeamInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TeamInfo)\[\]<br>Returns team information about the current user. |
| [getTheme](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetTheme)(): string<br>Returns the theme ID of the analytic application. |
| [getUserInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetUserInfo)(): [UserInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo)<br>Returns information about the current user. |
| [getWidgets](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MgetWidgets)(widgetSearchOptions: [WidgetSearchOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions)): <type of type><br>Returns an array of widgets described by the widget search options. |
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MhideBusyIndicator)(): void<br>Hides the busy indicator. |
| [isCommentModeEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MisCommentModeEnabled)(): boolean<br>Returns whether the comment mode is enabled. |
| [isMobile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MisMobile)(): boolean<br>Returns whether the analytic application is in mobile mode. |
| [moveWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MmoveWidget)(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void<br>Moves the widget into the first page canvas. |
| [openShareApplicationDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MopenShareApplicationDialog)(): void<br>Opens the Share Application dialog for the currently opened analytic application. |
| [postMessage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MpostMessage)(receiver: [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver), message: string, targetOrigin: string): void<br>Posts a message to the parent window or the top-level window. |
| [refreshData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MrefreshData)(dataSources?: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\]): void<br>Triggers data refresh. |
| [sendNotification](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsendNotification)(notification: [NotificationOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions) JSON): boolean<br>Sends a notification. |
| [setActivePage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetActivePage)(page: [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage) \| string \| integer): void<br>Switch page. |
| [setAutomaticBusyIndicatorEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetAutomaticBusyIndicatorEnabled)(enabled: boolean): void<br>Enables or disables the automatic busy indicator. |
| [setCommentModeEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetCommentModeEnabled)(isEnabled: boolean): void<br>Enables or disables the comment mode. |
| [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetCssClass)(className: string): void<br>Sets the Cascading Style Sheet (CSS) class name of the canvas of the first page. |
| [setCurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetCurrentDateTime)(currentDateTime: [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime)): void<br>Sets current date/time. |
| [setGlobalCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetGlobalCssClass)(className: string): void<br>Sets the global default Cascading Style Sheet (CSS) class name. |
| [setMessageTypesToShow](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetMessageTypesToShow)(messageTypes: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)\[\]): void<br>Specifies which messages are shown, depending on their message type. |
| [setPageVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetPageVisible)(page: [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage) \| string \| integer, visible: boolean): void<br>Set the page visible or not. |
| [setRefreshPaused](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetRefreshPaused)(dataSources: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\], paused: boolean): void<br>Enables or disables the pause of the data refresh and at the same time updates the widgets associated with the data sources when the pause of data refresh is disabled. |
| [setTheme](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MsetTheme)(themeId?: string): void<br>Applies a theme to the analytic application. |
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |
| [showMessage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_MshowMessage)(messageType: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType), message: string): void<br>Shows a message. |

Event Summary

|     |
| --- |
| Name and Description |
| [onInitialization](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_EonInitialization)(): void<br>Called when the analytic application has finished loading. |
| [onOrientationChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_EonOrientationChange)(angle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation), previousAngle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation)): void<br>Called when the user changes the orientation of the mobile device. |
| [onPostMessageReceived](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_EonPostMessageReceived)(message: string, origin: string): void<br>Called when the analytic application receives a message from the hosting page or an embedded page. |
| [onResize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_EonResize)(): void<br>Called when the user resizes the browser window. |
| [onShake](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Application_EonShake)(): void<br>Called when the user shakes the mobile device. |

Method Detail

|     |
| --- |
| getActivePage |
| getActivePage(): [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage)<br>Get the active page.<br>Returns<br>[ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage)<br>Since<br>2023.3 |

|     |
| --- |
| getCssClass |
| getCssClass(): string<br>Returns the Cascading Style Sheet (CSS) class name of the canvas of the first page.<br>Returns<br>string<br>Since<br>2020.20 |

|     |     |     |
| --- | --- | --- |
| getFileDataSource |
| getFileDataSource(modelId: string): [FileDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource)

Returns the data source of related modelId.

Parameters

|     |     |     |
| --- | --- | --- |
| modelId: | string |  |

Returns

[FileDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileDataSource)

Since

2023.13 |

|     |
| --- |
| getGlobalCssClass |
| getGlobalCssClass(): string<br>Returns the global default Cascading Style Sheet (CSS) class name.<br>Returns<br>string<br>Since<br>2021.2 |

|     |
| --- |
| getInfo |
| getInfo(): [ApplicationInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationInfo)<br>Returns information about the analytic application.<br>Returns<br>[ApplicationInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationInfo)<br>Since<br>2020.9 |

|     |
| --- |
| getInnerHeight |
| getInnerHeight(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Get InnerHeight of first page. If the canvas size is fixed, then the height of the canvas is returned. If the canvas size is dynamic, then the height of the viewport (the visible area of the window) is returned.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2019.14 |

|     |
| --- |
| getInnerWidth |
| getInnerWidth(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Get InnerWidth of first page. If the canvas size is fixed, then the width of the canvas is returned. If the canvas size is dynamic, then the width of the viewport (the visible area of the window) is returned.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2019.14 |

|     |
| --- |
| getMode |
| getMode(): [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>Returns the mode in which the analytic application is displayed.<br>Returns<br>[ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>Since<br>2020.11 |

|     |
| --- |
| getRolesInfo |
| getRolesInfo(): string\[\]<br>Returns role information about the current user.<br>Returns<br>string\[\]<br>Since<br>2023.13 |

|     |
| --- |
| getTeamsInfo |
| getTeamsInfo(): [TeamInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TeamInfo)\[\]<br>Returns team information about the current user.<br>Returns<br>[TeamInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TeamInfo)\[\]<br>Since<br>2023.13 |

|     |
| --- |
| getTheme |
| getTheme(): string<br>Returns the theme ID of the analytic application. If the default theme has been applied, then the value represented by Alias.DefaultTheme is returned.<br>Returns<br>string<br>Since<br>2020.13 |

|     |
| --- |
| getUserInfo |
| getUserInfo(): [UserInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo)<br>Returns information about the current user.<br>Returns<br>[UserInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserInfo)<br>Since<br>2019.5 |

|     |     |     |
| --- | --- | --- |
| getWidgets |
| getWidgets(widgetSearchOptions: [WidgetSearchOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions)): <type of type>

Returns an array of widgets described by the widget search options. Just Including widgets from first page.

Parameters

|     |     |     |
| --- | --- | --- |
| widgetSearchOptions: | [WidgetSearchOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions) |  |

Returns

<type of type>

Since

2021.23 |

|     |
| --- |
| hideBusyIndicator |
| hideBusyIndicator(): void<br>Hides the busy indicator.<br>Since<br>2020.1 |

|     |
| --- |
| isCommentModeEnabled |
| isCommentModeEnabled(): boolean<br>Returns whether the comment mode is enabled.<br>Returns<br>boolean<br>Since<br>2019.18 |

|     |
| --- |
| isMobile |
| isMobile(): boolean<br>Returns whether the analytic application is in mobile mode. If the analytic application is displayed on a mobile device, for example, on a smartphone or on a tablet, then true is returned, and false if it isn't. Note: The returned value may not be accurate for specific devices. For example, for some versions of Microsoft Surface Book false is returned. Note: If the analytic application was requested as a desktop website by a Safari browser on iOS, then false is returned.<br>Returns<br>boolean<br>Since<br>2020.3 |

|     |     |     |
| --- | --- | --- |
| moveWidget |
| moveWidget(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void

Moves the widget into the first page canvas.

Parameters

|     |     |     |
| --- | --- | --- |
| widget: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |  |

Since

2020.7 |

|     |
| --- |
| openShareApplicationDialog |
| openShareApplicationDialog(): void<br>Opens the Share Application dialog for the currently opened analytic application.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.11 |

|     |     |     |
| --- | --- | --- |
| postMessage |
| postMessage(receiver: [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver), message: string, targetOrigin: string): void

Posts a message to the parent window or the top-level window.

Parameters

|     |     |     |
| --- | --- | --- |
| receiver: | [PostMessageReceiver](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PostMessageReceiver) |  |
| message: | string |  |
| targetOrigin: | string |  |

Since

2019.2 |

|     |     |     |
| --- | --- | --- |
| refreshData |
| refreshData(dataSources?: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\]): void

Triggers data refresh. The script is fully executed without waiting for all the associated widgets to be updated. If no data sources are specified, then all widgets bound to data sources are refreshed. If data source is specified, then only associated charts or tables are refreshed.

Parameters

|     |     |     |
| --- | --- | --- |
| dataSourcesOptional: | [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\] |  |

Since

2019.3

Last Update

2020.1 |

|     |     |     |
| --- | --- | --- |
| sendNotification |
| sendNotification(notification: [NotificationOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions) JSON): boolean

Sends a notification. Notifications can be messages and emails. Note: To send a notification, you need the "Runtime Notification" privilege. For more information about how to assign permissions and privileges, see the chapter "Permissions" in SAP Analytics Cloud Help.

Parameters

|     |     |     |
| --- | --- | --- |
| notification: | [NotificationOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#NotificationOptions) JSON |  |

Returns

boolean

Since

2020.7 |

|     |     |     |
| --- | --- | --- |
| setActivePage |
| setActivePage(page: [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage) \| string \| integer): void

Switch page.

Parameters

|     |     |     |
| --- | --- | --- |
| page: | [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage) \| string \| integer |  |

Since

2023.3 |

|     |     |     |
| --- | --- | --- |
| setAutomaticBusyIndicatorEnabled |
| setAutomaticBusyIndicatorEnabled(enabled: boolean): void

Enables or disables the automatic busy indicator. If the automatic busy indicator is enabled, then it appears automatically when necessary.

Parameters

|     |     |     |
| --- | --- | --- |
| enabled: | boolean |  |

Since

2020.1 |

|     |     |     |
| --- | --- | --- |
| setCommentModeEnabled |
| setCommentModeEnabled(isEnabled: boolean): void

Enables or disables the comment mode.

Parameters

|     |     |     |
| --- | --- | --- |
| isEnabled: | boolean |  |

Since

2019.18 |

|     |     |     |
| --- | --- | --- |
| setCssClass |
| setCssClass(className: string): void

Sets the Cascading Style Sheet (CSS) class name of the canvas of the first page.

Parameters

|     |     |     |
| --- | --- | --- |
| className: | string |  |

Since

2020.20 |

|     |     |     |
| --- | --- | --- |
| setCurrentDateTime |
| setCurrentDateTime(currentDateTime: [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime)): void

Sets current date/time.

Parameters

|     |     |     |
| --- | --- | --- |
| currentDateTime: | [CurrentDateTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CurrentDateTime) |  |

Since

2023.13 |

|     |     |     |
| --- | --- | --- |
| setGlobalCssClass |
| setGlobalCssClass(className: string): void

Sets the global default Cascading Style Sheet (CSS) class name.

Parameters

|     |     |     |
| --- | --- | --- |
| className: | string |  |

Since

2021.2 |

|     |     |     |
| --- | --- | --- |
| setMessageTypesToShow |
| setMessageTypesToShow(messageTypes: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)\[\]): void

Specifies which messages are shown, depending on their message type. By default, messages of all message types are shown. If you specify an empty array, then no message is shown.

Parameters

|     |     |     |
| --- | --- | --- |
| messageTypes: | [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)\[\] |  |

Since

2020.10 |

|     |     |     |
| --- | --- | --- |
| setPageVisible |
| setPageVisible(page: [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage) \| string \| integer, visible: boolean): void

Set the page visible or not.

Parameters

|     |     |     |
| --- | --- | --- |
| page: | [ApplicationPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage) \| string \| integer |  |
| visible: | boolean |  |

Since

2023.3 |

|     |     |     |
| --- | --- | --- |
| setRefreshPaused |
| setRefreshPaused(dataSources: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\], paused: boolean): void

Enables or disables the pause of the data refresh and at the same time updates the widgets associated with the data sources when the pause of data refresh is disabled.

Parameters

|     |     |     |
| --- | --- | --- |
| dataSources: | [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\] |  |
| paused: | boolean |  |

Since

2021.2 |

|     |     |     |
| --- | --- | --- |
| setTheme |
| setTheme(themeId?: string): void

Applies a theme to the analytic application. The theme is specified by a theme ID or by selecting a theme from the Files repository. If no theme ID is specified, then the default theme is applied.

Parameters

|     |     |     |
| --- | --- | --- |
| themeIdOptional: | string |  |

Since

2019.22 |

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

2020.1 |

|     |     |     |
| --- | --- | --- |
| showMessage |
| showMessage(messageType: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType), message: string): void

Shows a message.

Parameters

|     |     |     |
| --- | --- | --- |
| messageType: | [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType) |  |
| message: | string |  |

Since

2020.10 |

Event Detail

|     |
| --- |
| onInitialization |
| onInitialization(): void<br>Called when the analytic application has finished loading. |

|     |     |     |
| --- | --- | --- |
| onOrientationChange |
| onOrientationChange(angle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation), previousAngle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation)): void

Called when the user changes the orientation of the mobile device.

Parameters

|     |     |     |
| --- | --- | --- |
| angle: | [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |  |
| previousAngle: | [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |  |

Since

2020.13

Last Update

2020.15 |

|     |     |     |
| --- | --- | --- |
| onPostMessageReceived |
| onPostMessageReceived(message: string, origin: string): void

Called when the analytic application receives a message from the hosting page or an embedded page. Note: Always check the origin when receiving a message. A malicious site can change the location of the window and intercept the data you sent using the post message without your knowledge.

Parameters

|     |     |     |
| --- | --- | --- |
| message: | string |  |
| origin: | string |  | |

|     |
| --- |
| onResize |
| onResize(): void<br>Called when the user resizes the browser window. Note: This method is called in intervals of 500 milliseconds while the window is resized.<br>Since<br>2019.14 |

|     |
| --- |
| onShake |
| onShake(): void<br>Called when the user shakes the mobile device. Note: This method is called every two seconds during shaking.<br>Since<br>2020.13 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="applicationinfo"></a>

ApplicationInfo

Since

2020.9

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationInfo_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationInfo_Pid): string |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationInfo_Pname): string |

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
| name |
| name: string |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="applicationmessagetype"></a>

ApplicationMessageType

Since

2020.10

Property Summary

|     |
| --- |
| Name and Description |
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType_P_static_Error): [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Error message |
| static [Info](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType_P_static_Info): [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Information message |
| static [Success](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType_P_static_Success): [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Success message |
| static [Warning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType_P_static_Warning): [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Warning message |

Property Detail

|     |
| --- |
| Error |
| staticError: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Error message |

|     |
| --- |
| Info |
| staticInfo: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Information message |

|     |
| --- |
| Success |
| staticSuccess: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Success message |

|     |
| --- |
| Warning |
| staticWarning: [ApplicationMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMessageType)<br>Warning message |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

E



---

<a name="applicationmode"></a>

ApplicationMode

Since

2020.7

Property Summary

|     |
| --- |
| Name and Description |
| static [Embed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode_P_static_Embed): [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>The analytic application is displayed in embed mode. |
| static [Present](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode_P_static_Present): [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>The analytic application is displayed in present mode. |
| static [View](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode_P_static_View): [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>The analytic application is displayed in view mode. |

Property Detail

|     |
| --- |
| Embed |
| staticEmbed: [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>The analytic application is displayed in embed mode. |

|     |
| --- |
| Present |
| staticPresent: [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>The analytic application is displayed in present mode. |

|     |
| --- |
| View |
| staticView: [ApplicationMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationMode)<br>The analytic application is displayed in view mode. |

C



---

<a name="applicationpage"></a>

ApplicationPage

Since

2022.5

Last Update

2024.14

Method Summary

|     |
| --- |
| Name and Description |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MgetCssClass)(): string<br>Returns the Cascading Style Sheet (CSS) class name of the page. |
| [getInnerHeight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MgetInnerHeight)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>If the page size is fixed, then the height of the page is returned. |
| [getInnerWidth](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MgetInnerWidth)(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>If the page size is fixed, then the width of the page is returned. |
| [getWidgets](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MgetWidgets)(widgetSearchOptions: [WidgetSearchOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions)): <type of type><br>Returns an array of widgets described by the widget search options. |
| [moveWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MmoveWidget)(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void<br>Moves the widget into the page. |
| [refreshData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MrefreshData)(dataSources?: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\]): void<br>Triggers a data refresh and updates the widgets associated with the refreshed data sources. |
| [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MsetCssClass)(className: string): void<br>Sets the Cascading Style Sheet (CSS) class name of the page. |
| [setRefreshPaused](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_MsetRefreshPaused)(dataSources: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\], paused: boolean): void<br>Enables or disables the pausing of the data refresh and updates the widgets associated with the data sources when their pausing of the data refresh is disabled. |

Event Summary

|     |
| --- |
| Name and Description |
| [onActive](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonActive)(): void<br>Called when the analytic application page is set to active. |
| [onInitialization](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonInitialization)(): void<br>Called when the analytic application page has finished loading. |
| [onOrientationChange](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonOrientationChange)(angle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation), previousAngle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation)): void<br>Called when the user changes the orientation of the mobile device. |
| [onPostMessageReceived](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonPostMessageReceived)(message: string, origin: string): void<br>Called when the analytic application receives a message from the hosting page or an embedded page. |
| [onResize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonResize)(): void<br>Called when the user resizes the browser window. |
| [onShake](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonShake)(): void<br>Called when the user shakes the mobile device. |
| [onStoryPopupClose](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ApplicationPage_EonStoryPopupClose)(origin: string): void<br>Called after a Story Popup is Closed. |

Method Detail

|     |
| --- |
| getCssClass |
| getCssClass(): string<br>Returns the Cascading Style Sheet (CSS) class name of the page.<br>Returns<br>string<br>Since<br>2022.6 |

|     |
| --- |
| getInnerHeight |
| getInnerHeight(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>If the page size is fixed, then the height of the page is returned. If the page size is dynamic, then the height of the viewport (the visible area of the window) is returned.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2022.6 |

|     |
| --- |
| getInnerWidth |
| getInnerWidth(): [LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>If the page size is fixed, then the width of the page is returned. If the page size is dynamic, then the width of the viewport (the visible area of the window) is returned.<br>Returns<br>[LayoutValue](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#LayoutValue)<br>Since<br>2022.6 |

|     |     |     |
| --- | --- | --- |
| getWidgets |
| getWidgets(widgetSearchOptions: [WidgetSearchOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions)): <type of type>

Returns an array of widgets described by the widget search options.

Parameters

|     |     |     |
| --- | --- | --- |
| widgetSearchOptions: | [WidgetSearchOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions) |  |

Returns

<type of type>

Since

2022.6 |

|     |     |     |
| --- | --- | --- |
| moveWidget |
| moveWidget(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void

Moves the widget into the page.

Parameters

|     |     |     |
| --- | --- | --- |
| widget: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |  |

Since

2022.6 |

|     |     |     |
| --- | --- | --- |
| refreshData |
| refreshData(dataSources?: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\]): void

Triggers a data refresh and updates the widgets associated with the refreshed data sources. If no data sources are specified, then all are refreshed. If data sources are specified, then only those are refreshed. Note: When specifying data sources, then only those associated with charts or tables are refreshed.

Parameters

|     |     |     |
| --- | --- | --- |
| dataSourcesOptional: | [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\] |  |

Since

2022.8 |

|     |     |     |
| --- | --- | --- |
| setCssClass |
| setCssClass(className: string): void

Sets the Cascading Style Sheet (CSS) class name of the page.

Parameters

|     |     |     |
| --- | --- | --- |
| className: | string |  |

Since

2022.6 |

|     |     |     |
| --- | --- | --- |
| setRefreshPaused |
| setRefreshPaused(dataSources: [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\], paused: boolean): void

Enables or disables the pausing of the data refresh and updates the widgets associated with the data sources when their pausing of the data refresh is disabled.

Parameters

|     |     |     |
| --- | --- | --- |
| dataSources: | [DataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataSource)\[\] |  |
| paused: | boolean |  |

Since

2022.8 |

Event Detail

|     |
| --- |
| onActive |
| onActive(): void<br>Called when the analytic application page is set to active.<br>Since<br>2023.3 |

|     |
| --- |
| onInitialization |
| onInitialization(): void<br>Called when the analytic application page has finished loading.<br>Since<br>2023.3 |

|     |     |     |
| --- | --- | --- |
| onOrientationChange |
| onOrientationChange(angle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation), previousAngle: [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation)): void

Called when the user changes the orientation of the mobile device.

Parameters

|     |     |     |
| --- | --- | --- |
| angle: | [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |  |
| previousAngle: | [DeviceOrientation](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DeviceOrientation) |  |

Since

2023.3 |

|     |     |     |
| --- | --- | --- |
| onPostMessageReceived |
| onPostMessageReceived(message: string, origin: string): void

Called when the analytic application receives a message from the hosting page or an embedded page. Note: Always check the origin when receiving a message. A malicious site can change the location of the window and intercept the data you sent using the post message without your knowledge.

Parameters

|     |     |     |
| --- | --- | --- |
| message: | string |  |
| origin: | string |  |

Since

2023.3 |

|     |
| --- |
| onResize |
| onResize(): void<br>Called when the user resizes the browser window. Note: This method is called in intervals of 500 milliseconds while the window is resized.<br>Since<br>2023.3 |

|     |
| --- |
| onShake |
| onShake(): void<br>Called when the user shakes the mobile device. Note: This method is called every two seconds during shaking.<br>Since<br>2023.3 |

|     |     |     |
| --- | --- | --- |
| onStoryPopupClose |
| onStoryPopupClose(origin: string): void

Called after a Story Popup is Closed.

Parameters

|     |     |     |
| --- | --- | --- |
| origin: | string |  |

Since

2024.14 |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

O

Array

The JavaScript Array global object is a constructor for arrays, which are high-level, list-like objects.

Last Update

2020.8

Property Summary

|     |
| --- |
| Name and Description |
| [length](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Plength): integer<br>An unsigned, 32-bit integer that specifies the number of elements in an array. |

Method Summary

|     |
| --- |
| Name and Description |
| static [isArray](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_M_static_isArray)(value: <any type>): boolean<br>Returns true if an object is an array and false if it isn't an array. |
| [concat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mconcat)(other: <this array's type>): <this array's type><br>Returns a new array comprised of this array joined with one or more other arrays and/or values. |
| [copyWithin](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_McopyWithin)(target: integer, begin: integer, end?: integer): <this array's type><br>Copies a sequence of array elements within the array to the position starting at index position target. |
| [fill](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mfill)(newelt: <this array's element type>, begin?: integer, end?: integer): <this array's type><br>Fills all elements of an array at index positions begin to end (end isn't included) with a value. |
| [includes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mincludes)(elt: <this array's element type>): boolean<br>Returns whether an array includes a certain element, returning true if the element is included or false if the element isn't included. |
| [indexOf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_MindexOf)(elt: <this array's element type>, from?: integer): integer<br>Returns the first index position at which a given element is found in the array, or -1 if it isn't present. |
| [join](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mjoin)(separator?: string): string<br>Joins all elements of an array into a string. |
| [keys](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mkeys)(): <array iterator traversing this array's integer indices><br>Returns a new Array Iterator that contains the keys for each index position in the array. |
| [lastIndexOf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_MlastIndexOf)(elt: <this array's element type>, from?: integer): integer<br>Returns the last index position at which a given element is found in the array, or -1 if it isn't present. |
| [pop](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mpop)(): <this array's element type><br>Removes the last element from an array and returns that element. |
| [push](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mpush)(newelt: <this array's element type>): integer<br>Appends one element and returns the new length of the array. |
| [reverse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mreverse)(): void<br>Reverses an array in place. |
| [shift](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mshift)(): <this array's element type><br>Removes the first element from an array and returns that element. |
| [slice](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mslice)(begin?: integer, end?: integer): <this array's type><br>Returns a shallow copy of a portion of an array from index positions begin to end (end isn't included). |
| [sort](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Msort)(): void<br>Sorts the elements of an array in place and returns the array. |
| [splice](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Msplice)(pos: integer, amount?: integer, item?: <this array's element type>): <this array's type><br>Changes the content of an array, adding new elements while removing old elements. |
| [unshift](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Munshift)(newelt: <this array's element type>): integer<br>Adds one or more elements to the beginning of an array and returns the new length of the array. |
| [values](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Array_Mvalues)(): <array iterator traversing this array's values><br>Returns a new Array Iterator object that contains the values for each index position in the array. |

Property Detail

|     |
| --- |
| length |
| length: integer<br>An unsigned, 32-bit integer that specifies the number of elements in an array. |

Method Detail

|     |     |     |
| --- | --- | --- |
| isArray |
| staticisArray(value: <any type>): boolean

Returns true if an object is an array and false if it isn't an array.

Parameters

|     |     |     |
| --- | --- | --- |
| value: | <any type> |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| concat |
| concat(other: <this array's type>): <this array's type>

Returns a new array comprised of this array joined with one or more other arrays and/or values.

Parameters

|     |     |     |
| --- | --- | --- |
| other: | <this array's type> |  |

Returns

<this array's type> |

|     |     |     |
| --- | --- | --- |
| copyWithin |
| copyWithin(target: integer, begin: integer, end?: integer): <this array's type>

Copies a sequence of array elements within the array to the position starting at index position target. The copy is taken from the index positions begin to end (end isn't included).

Parameters

|     |     |     |
| --- | --- | --- |
| target: | integer |  |
| begin: | integer |  |
| endOptional: | integer |  |

Returns

<this array's type> |

|     |     |     |
| --- | --- | --- |
| fill |
| fill(newelt: <this array's element type>, begin?: integer, end?: integer): <this array's type>

Fills all elements of an array at index positions begin to end (end isn't included) with a value.

Parameters

|     |     |     |
| --- | --- | --- |
| newelt: | <this array's element type> |  |
| beginOptional: | integer |  |
| endOptional: | integer |  |

Returns

<this array's type> |

|     |     |     |
| --- | --- | --- |
| includes |
| includes(elt: <this array's element type>): boolean

Returns whether an array includes a certain element, returning true if the element is included or false if the element isn't included.

Parameters

|     |     |     |
| --- | --- | --- |
| elt: | <this array's element type> |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| indexOf |
| indexOf(elt: <this array's element type>, from?: integer): integer

Returns the first index position at which a given element is found in the array, or -1 if it isn't present. The array is searched starting at index position from.

Parameters

|     |     |     |
| --- | --- | --- |
| elt: | <this array's element type> |  |
| fromOptional: | integer |  |

Returns

integer

Last Update

2020.6 |

|     |     |     |
| --- | --- | --- |
| join |
| join(separator?: string): string

Joins all elements of an array into a string.

Parameters

|     |     |     |
| --- | --- | --- |
| separatorOptional: | string |  |

Returns

string |

|     |
| --- |
| keys |
| keys(): <array iterator traversing this array's integer indices><br>Returns a new Array Iterator that contains the keys for each index position in the array.<br>Returns<br><array iterator traversing this array's integer indices> |

|     |     |     |
| --- | --- | --- |
| lastIndexOf |
| lastIndexOf(elt: <this array's element type>, from?: integer): integer

Returns the last index position at which a given element is found in the array, or -1 if it isn't present. The array is searched backwards, starting at index position from.

Parameters

|     |     |     |
| --- | --- | --- |
| elt: | <this array's element type> |  |
| fromOptional: | integer |  |

Returns

integer

Last Update

2020.6 |

|     |
| --- |
| pop |
| pop(): <this array's element type><br>Removes the last element from an array and returns that element.<br>Returns<br><this array's element type> |

|     |     |     |
| --- | --- | --- |
| push |
| push(newelt: <this array's element type>): integer

Appends one element and returns the new length of the array.

Parameters

|     |     |     |
| --- | --- | --- |
| newelt: | <this array's element type> |  |

Returns

integer |

|     |
| --- |
| reverse |
| reverse(): void<br>Reverses an array in place. The first array element becomes the last and the last array element becomes the first. |

|     |
| --- |
| shift |
| shift(): <this array's element type><br>Removes the first element from an array and returns that element.<br>Returns<br><this array's element type> |

|     |     |     |
| --- | --- | --- |
| slice |
| slice(begin?: integer, end?: integer): <this array's type>

Returns a shallow copy of a portion of an array from index positions begin to end (end isn't included).

Parameters

|     |     |     |
| --- | --- | --- |
| beginOptional: | integer |  |
| endOptional: | integer |  |

Returns

<this array's type> |

|     |
| --- |
| sort |
| sort(): void<br>Sorts the elements of an array in place and returns the array. |

|     |     |     |
| --- | --- | --- |
| splice |
| splice(pos: integer, amount?: integer, item?: <this array's element type>): <this array's type>

Changes the content of an array, adding new elements while removing old elements.

Parameters

|     |     |     |
| --- | --- | --- |
| pos: | integer |  |
| amountOptional: | integer |  |
| itemOptional: | <this array's element type> |  |

Returns

<this array's type>

Last Update

2020.8 |

|     |     |     |
| --- | --- | --- |
| unshift |
| unshift(newelt: <this array's element type>): integer

Adds one or more elements to the beginning of an array and returns the new length of the array.

Parameters

|     |     |     |
| --- | --- | --- |
| newelt: | <this array's element type> |  |

Returns

integer |

|     |
| --- |
| values |
| values(): <array iterator traversing this array's values><br>Returns a new Array Iterator object that contains the values for each index position in the array.<br>Returns<br><array iterator traversing this array's values> |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

C



---

<a name="pagebook"></a>

PageBook\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2020.12\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_MgetPage)(pageKey: string): [PageBookPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBookPage)<br>Returns a page of the page book. |\
| [getSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_MgetSelectedKey)(): string<br>Returns the key of the selected page of the page book. |\
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_MhideBusyIndicator)(): void<br>Hides the busy indicator. |\
| [moveWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_MmoveWidget)(pageKey: string, widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void<br>Moves the widget into the specified page of the page book. |\
| [setSelectedKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_MsetSelectedKey)(pageKey: string): void<br>Selects a page. |\
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |\
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
| [onSelect](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook_EonSelect)(): void<br>Called when the user selects a page. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| getPage |\
| getPage(pageKey: string): [PageBookPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBookPage)\
\
Returns a page of the page book. The page is specified by the key of the page. If the page doesn't exist, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| pageKey: | string |  |\
\
Returns\
\
[PageBookPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBookPage) |\
\
|     |\
| --- |\
| getSelectedKey |\
| getSelectedKey(): string<br>Returns the key of the selected page of the page book.<br>Returns<br>string |\
\
|     |\
| --- |\
| hideBusyIndicator |\
| hideBusyIndicator(): void<br>Hides the busy indicator. |\
\
|     |     |     |\
| --- | --- | --- |\
| moveWidget |\
| moveWidget(pageKey: string, widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void\
\
Moves the widget into the specified page of the page book.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| pageKey: | string |  |\
| widget: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setSelectedKey |\
| setSelectedKey(pageKey: string): void\
\
Selects a page. The page is specified by the key of the page. The selected page is the visible page of the page book. If the page doesn't exist, then this operation is ignored.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| pageKey: | string |  | |\
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
| textOptional: | string |  | |\
\
Event Detail\
\
|     |\
| --- |\
| onSelect |\
| onSelect(): void<br>Called when the user selects a page. |\
\
Type Library\
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)\
\
C\
\


---

<a name="pagebookpage"></a>

PageBookPage\
\
Since\
\
2020.12\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBookPage_MgetKey)(): string<br>Returns the key of the page. |\
| [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBookPage_MisVisible)(): boolean<br>Returns whether the page is visible. |\
| [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBookPage_MsetVisible)(visible: boolean): void<br>Shows or hides the page. |\
\
Method Detail\
\
|     |\
| --- |\
| getKey |\
| getKey(): string<br>Returns the key of the page.<br>Returns<br>string |\
\
|     |\
| --- |\
| isVisible |\
| isVisible(): boolean<br>Returns whether the page is visible.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| setVisible |\
| setVisible(visible: boolean): void\
\
Shows or hides the page.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| visible: | boolean |  | |\
\
Type Library\
[exportpdf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLexportpdf)\
\
E\
\


---

<a name="panel"></a>

Panel\
\
extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)\
\
Since\
\
2019.14\
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
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Panel_MhideBusyIndicator)(): void<br>Hides the busy indicator. |\
| [moveWidget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Panel_MmoveWidget)(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void<br>Moves the widget into the panel. |\
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Panel_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |\
\
|     |\
| --- |\
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |\
\
Method Detail\
\
|     |\
| --- |\
| hideBusyIndicator |\
| hideBusyIndicator(): void<br>Hides the busy indicator.<br>Since<br>2020.1 |\
\
|     |     |     |\
| --- | --- | --- |\
| moveWidget |\
| moveWidget(widget: [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)): void\
\
Moves the widget into the panel.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| widget: | [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |  |\
\
Since\
\
2020.7 |\
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
Type Library\
[datasource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLdatasource)\
\
E\
\


---

<a name="popup"></a>

Popup\
\
Last Update\
\
2024.25\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [close](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_Mclose)(): void<br>Closes the popup. |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MgetCssClass)(): string<br>Returns the Cascading Style Sheet (CSS) class name of the popup. |\
| [getTitle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MgetTitle)(): string<br>Returns the title of the popup. |\
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MhideBusyIndicator)(): void<br>Hides the busy indicator. |\
| [isButtonEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MisButtonEnabled)(buttonId: string): boolean<br>Returns whether a specific button in the footer of the popup is enabled. |\
| [isButtonVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MisButtonVisible)(buttonId: string): boolean<br>Returns whether a specific button in the footer of the popup is visible. |\
| [open](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_Mopen)(): void<br>Opens the popup. |\
| [setButtonEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MsetButtonEnabled)(buttonId: string, enabled: boolean): void<br>Enables or disables a specific button in the footer of the popup. |\
| [setButtonVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MsetButtonVisible)(buttonId: string, visible: boolean): void<br>Shows or hides a specific button in the footer of the popup. |\
| [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MsetCssClass)(className: string): void<br>Sets the Cascading Style Sheet (CSS) class name of the popup. |\
| [setSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MsetSize)(size: [PopupSizeOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions)): void<br>Sets the popup size. |\
| [setTitle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MsetTitle)(title: string): void<br>Sets the title of the popup. |\
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onButtonClick](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_EonButtonClick)(buttonId: string): void<br>Called when the user clicks any button in the footer of the popup. |\
| [onResize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Popup_EonResize)(width: number, height: number): void<br>Called when the popup is resized. |\
\
Method Detail\
\
|     |\
| --- |\
| close |\
| close(): void<br>Closes the popup. |\
\
|     |\
| --- |\
| getCssClass |\
| getCssClass(): string<br>Returns the Cascading Style Sheet (CSS) class name of the popup.<br>Returns<br>string<br>Since<br>2020.20 |\
\
|     |\
| --- |\
| getTitle |\
| getTitle(): string<br>Returns the title of the popup.<br>Returns<br>string |\
\
|     |\
| --- |\
| hideBusyIndicator |\
| hideBusyIndicator(): void<br>Hides the busy indicator.<br>Since<br>2020.1 |\
\
|     |     |     |\
| --- | --- | --- |\
| isButtonEnabled |\
| isButtonEnabled(buttonId: string): boolean\
\
Returns whether a specific button in the footer of the popup is enabled.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| isButtonVisible |\
| isButtonVisible(buttonId: string): boolean\
\
Returns whether a specific button in the footer of the popup is visible.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
\
Returns\
\
boolean |\
\
|     |\
| --- |\
| open |\
| open(): void<br>Opens the popup. |\
\
|     |     |     |\
| --- | --- | --- |\
| setButtonEnabled |\
| setButtonEnabled(buttonId: string, enabled: boolean): void\
\
Enables or disables a specific button in the footer of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
| enabled: | boolean |  |\
\
Last Update\
\
2018.22 |\
\
|     |     |     |\
| --- | --- | --- |\
| setButtonVisible |\
| setButtonVisible(buttonId: string, visible: boolean): void\
\
Shows or hides a specific button in the footer of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
| visible: | boolean |  |\
\
Last Update\
\
2018.22 |\
\
|     |     |     |\
| --- | --- | --- |\
| setCssClass |\
| setCssClass(className: string): void\
\
Sets the Cascading Style Sheet (CSS) class name of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| className: | string |  |\
\
Since\
\
2020.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| setSize |\
| setSize(size: [PopupSizeOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions)): void\
\
Sets the popup size.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| size: | [PopupSizeOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions) |  |\
\
Since\
\
2024.25 |\
\
|     |     |     |\
| --- | --- | --- |\
| setTitle |\
| setTitle(title: string): void\
\
Sets the title of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| title: | string |  | |\
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
|     |     |     |\
| --- | --- | --- |\
| onButtonClick |\
| onButtonClick(buttonId: string): void\
\
Called when the user clicks any button in the footer of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
\
Since\
\
2018.22 |\
\
|     |     |     |\
| --- | --- | --- |\
| onResize |\
| onResize(width: number, height: number): void\
\
Called when the popup is resized.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| width: | number |  |\
| height: | number |  |\
\
Since\
\
2024.25 |\
\
C\
\


---

<a name="popupsizeoptions"></a>

PopupSizeOptions\
\
Since\
\
2024.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [height](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions_P_static_height): integer<br>Height |\
| static [heightUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions_P_static_heightUnit): [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Height Unit |\
| static [width](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions_P_static_width): integer<br>Width |\
| static [widthUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeOptions_P_static_widthUnit): [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Width Unit |\
\
Property Detail\
\
|     |\
| --- |\
| height |\
| staticheight: integer<br>Height |\
\
|     |\
| --- |\
| heightUnit |\
| staticheightUnit: [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Height Unit |\
\
|     |\
| --- |\
| width |\
| staticwidth: integer<br>Width |\
\
|     |\
| --- |\
| widthUnit |\
| staticwidthUnit: [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit)<br>Width Unit |\
\
E\
\


---

<a name="popupsizeunit"></a>

PopupSizeUnit\
\
Since\
\
2024.25\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Percent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit_P_static_Percent): [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit) |\
| static [Pixel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit_P_static_Pixel): [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit) |\
\
Property Detail\
\
|     |\
| --- |\
| Percent |\
| staticPercent: [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit) |\
\
|     |\
| --- |\
| Pixel |\
| staticPixel: [PopupSizeUnit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PopupSizeUnit) |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="storypopup"></a>

StoryPopup\
\
Since\
\
2024.14\
\
Last Update\
\
2024.25\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [close](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_Mclose)(): void<br>Closes the popup. |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MgetCssClass)(): string<br>Returns the Cascading Style Sheet (CSS) class name of the popup. |\
| [getTitle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MgetTitle)(): string<br>Returns the title of the popup. |\
| [hideBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MhideBusyIndicator)(): void<br>Hides the busy indicator. |\
| [isButtonEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MisButtonEnabled)(buttonId: string): boolean<br>Returns whether a specific button in the footer of the popup is enabled. |\
| [isButtonVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MisButtonVisible)(buttonId: string): boolean<br>Returns whether a specific button in the footer of the popup is visible. |\
| [open](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_Mopen)(): void<br>Opens the popup. |\
| [setButtonEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MsetButtonEnabled)(buttonId: string, enabled: boolean): void<br>Enables or disables a specific button in the footer of the popup. |\
| [setButtonVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MsetButtonVisible)(buttonId: string, visible: boolean): void<br>Shows or hides a specific button in the footer of the popup. |\
| [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MsetCssClass)(className: string): void<br>Sets the Cascading Style Sheet (CSS) class name of the popup. |\
| [setSize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MsetSize)(size: [CrossPagePopupSizeOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions)): void<br>Sets the popup size. |\
| [setTitle](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MsetTitle)(title: string): void<br>Sets the title of the popup. |\
| [showBusyIndicator](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_MshowBusyIndicator)(text?: string): void<br>Shows the busy indicator. |\
\
Event Summary\
\
|     |\
| --- |\
| Name and Description |\
| [onButtonClick](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_EonButtonClick)(buttonId: string): void<br>Called when the user clicks any button in the footer of the popup. |\
| [onOpen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_EonOpen)(origin: string): void<br>Called when the Story Popup is open. |\
| [onResize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#StoryPopup_EonResize)(width: number, height: number): void<br>Called when the popup is resized. |\
\
Method Detail\
\
|     |\
| --- |\
| close |\
| close(): void<br>Closes the popup. |\
\
|     |\
| --- |\
| getCssClass |\
| getCssClass(): string<br>Returns the Cascading Style Sheet (CSS) class name of the popup.<br>Returns<br>string |\
\
|     |\
| --- |\
| getTitle |\
| getTitle(): string<br>Returns the title of the popup.<br>Returns<br>string |\
\
|     |\
| --- |\
| hideBusyIndicator |\
| hideBusyIndicator(): void<br>Hides the busy indicator. |\
\
|     |     |     |\
| --- | --- | --- |\
| isButtonEnabled |\
| isButtonEnabled(buttonId: string): boolean\
\
Returns whether a specific button in the footer of the popup is enabled.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| isButtonVisible |\
| isButtonVisible(buttonId: string): boolean\
\
Returns whether a specific button in the footer of the popup is visible.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
\
Returns\
\
boolean |\
\
|     |\
| --- |\
| open |\
| open(): void<br>Opens the popup. |\
\
|     |     |     |\
| --- | --- | --- |\
| setButtonEnabled |\
| setButtonEnabled(buttonId: string, enabled: boolean): void\
\
Enables or disables a specific button in the footer of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
| enabled: | boolean |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setButtonVisible |\
| setButtonVisible(buttonId: string, visible: boolean): void\
\
Shows or hides a specific button in the footer of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  |\
| visible: | boolean |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setCssClass |\
| setCssClass(className: string): void\
\
Sets the Cascading Style Sheet (CSS) class name of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| className: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setSize |\
| setSize(size: [CrossPagePopupSizeOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions)): void\
\
Sets the popup size.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| size: | [CrossPagePopupSizeOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CrossPagePopupSizeOptions) |  |\
\
Since\
\
2024.25 |\
\
|     |     |     |\
| --- | --- | --- |\
| setTitle |\
| setTitle(title: string): void\
\
Sets the title of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| title: | string |  | |\
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
| textOptional: | string |  | |\
\
Event Detail\
\
|     |     |     |\
| --- | --- | --- |\
| onButtonClick |\
| onButtonClick(buttonId: string): void\
\
Called when the user clicks any button in the footer of the popup.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| buttonId: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| onOpen |\
| onOpen(origin: string): void\
\
Called when the Story Popup is open.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| origin: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| onResize |\
| onResize(width: number, height: number): void\
\
Called when the popup is resized.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| width: | number |  |\
| height: | number |  |\
\
Since\
\
2024.25 |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
O\
\
String\
\
A string represents a sequence of characters.\
\
Last Update\
\
2020.6\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [length](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Plength): integer<br>Represents the length of a string. |\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [charAt](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_McharAt)(index: integer): string<br>Returns the specified character from a string. |\
| [charCodeAt](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_McharCodeAt)(index: integer): integer<br>Returns the numeric Unicode value of the character at the given index (except for Unicode codepoints > 0x10000). |\
| [codePointAt](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_McodePointAt)(pos: integer): integer<br>Returns a non-negative integer that is the UTF-16 encoded code point value. |\
| [concat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mconcat)(other: string): string<br>Combines the text of two strings and returns a new string. |\
| [endsWith](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MendsWith)(searchString: string, length?: integer): boolean<br>Returns whether a string ends with the characters of another string. |\
| [includes](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mincludes)(searchString: string, position?: integer): boolean<br>Returns whether one string may be found within another string. |\
| [indexOf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MindexOf)(searchValue: string, fromIndex?: integer): integer<br>Returns the index within the calling string of the first occurrence of the specified value, starting the search at fromIndex, or -1 if the value isn't found. |\
| [lastIndexOf](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MlastIndexOf)(searchValue: string, fromIndex?: integer): integer<br>Returns the index within the calling string of the last occurrence of the specified value, or -1 if the value isn't found. |\
| [localeCompare](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MlocaleCompare)(compareString: string): integer<br>Returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order. |\
| [normalize](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mnormalize)(form: string): string<br>Returns the Unicode Normalization Form of a given string (if the value isn't a string, it will be converted to one first). |\
| [repeat](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mrepeat)(count: integer): string<br>Constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together. |\
| [replace](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mreplace)(pattern: string, replacement: string): string<br>Returns a new string with some or all matches of a pattern replaced by a replacement. |\
| [slice](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mslice)(beginIndex: integer, endIndex?: integer): string<br>Extracts a section of a string and returns a new string. |\
| [split](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Msplit)(separator?: string, limit?: integer): string\[\]<br>Splits a string into an array of strings by separating the string into substrings. |\
| [startsWith](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MstartsWith)(searchString: string, position?: integer): boolean<br>Returns whether a string begins with the characters of another string. |\
| [substr](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Msubstr)(start: integer, length?: integer): string<br>Returns the characters in a string beginning at the specified location through the specified number of characters. |\
| [substring](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Msubstring)(indexStart: integer, indexEnd?: integer): string<br>Returns a subset of a string between one index and another, or through the end of the string. |\
| [toLocaleLowerCase](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MtoLocaleLowerCase)(): string<br>Returns the calling string value converted to lowercase, according to any locale-specific case mappings. |\
| [toLocaleUpperCase](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MtoLocaleUpperCase)(): string<br>Returns the calling string value converted to uppercase, according to any locale-specific case mappings. |\
| [toLowerCase](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MtoLowerCase)(): string<br>Returns the calling string value converted to lowercase. |\
| [toUpperCase](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_MtoUpperCase)(): string<br>Returns the calling string value converted to uppercase. |\
| [trim](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#String_Mtrim)(): string<br>Removes whitespace from both ends of the string. |\
\
Property Detail\
\
|     |\
| --- |\
| length |\
| length: integer<br>Represents the length of a string.<br>Last Update<br>2020.6 |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| charAt |\
| charAt(index: integer): string\
\
Returns the specified character from a string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| index: | integer |  |\
\
Returns\
\
string\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| charCodeAt |\
| charCodeAt(index: integer): integer\
\
Returns the numeric Unicode value of the character at the given index (except for Unicode codepoints > 0x10000).\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| index: | integer |  |\
\
Returns\
\
integer\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| codePointAt |\
| codePointAt(pos: integer): integer\
\
Returns a non-negative integer that is the UTF-16 encoded code point value.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| pos: | integer |  |\
\
Returns\
\
integer\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| concat |\
| concat(other: string): string\
\
Combines the text of two strings and returns a new string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| other: | string |  |\
\
Returns\
\
string |\
\
|     |     |     |\
| --- | --- | --- |\
| endsWith |\
| endsWith(searchString: string, length?: integer): boolean\
\
Returns whether a string ends with the characters of another string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| searchString: | string |  |\
| lengthOptional: | integer |  |\
\
Returns\
\
boolean\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| includes |\
| includes(searchString: string, position?: integer): boolean\
\
Returns whether one string may be found within another string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| searchString: | string |  |\
| positionOptional: | integer |  |\
\
Returns\
\
boolean\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| indexOf |\
| indexOf(searchValue: string, fromIndex?: integer): integer\
\
Returns the index within the calling string of the first occurrence of the specified value, starting the search at fromIndex, or -1 if the value isn't found.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| searchValue: | string |  |\
| fromIndexOptional: | integer |  |\
\
Returns\
\
integer\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| lastIndexOf |\
| lastIndexOf(searchValue: string, fromIndex?: integer): integer\
\
Returns the index within the calling string of the last occurrence of the specified value, or -1 if the value isn't found. The calling string is searched backward, starting at fromIndex.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| searchValue: | string |  |\
| fromIndexOptional: | integer |  |\
\
Returns\
\
integer\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| localeCompare |\
| localeCompare(compareString: string): integer\
\
Returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| compareString: | string |  |\
\
Returns\
\
integer\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| normalize |\
| normalize(form: string): string\
\
Returns the Unicode Normalization Form of a given string (if the value isn't a string, it will be converted to one first).\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| form: | string |  |\
\
Returns\
\
string |\
\
|     |     |     |\
| --- | --- | --- |\
| repeat |\
| repeat(count: integer): string\
\
Constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| count: | integer |  |\
\
Returns\
\
string\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| replace |\
| replace(pattern: string, replacement: string): string\
\
Returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string, and the replacement can be a string for each match.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| pattern: | string |  |\
| replacement: | string |  |\
\
Returns\
\
string |\
\
|     |     |     |\
| --- | --- | --- |\
| slice |\
| slice(beginIndex: integer, endIndex?: integer): string\
\
Extracts a section of a string and returns a new string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| beginIndex: | integer |  |\
| endIndexOptional: | integer |  |\
\
Returns\
\
string\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| split |\
| split(separator?: string, limit?: integer): string\[\]\
\
Splits a string into an array of strings by separating the string into substrings.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| separatorOptional: | string |  |\
| limitOptional: | integer |  |\
\
Returns\
\
string\[\]\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| startsWith |\
| startsWith(searchString: string, position?: integer): boolean\
\
Returns whether a string begins with the characters of another string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| searchString: | string |  |\
| positionOptional: | integer |  |\
\
Returns\
\
boolean\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| substr |\
| substr(start: integer, length?: integer): string\
\
Returns the characters in a string beginning at the specified location through the specified number of characters.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| start: | integer |  |\
| lengthOptional: | integer |  |\
\
Returns\
\
string\
\
Last Update\
\
2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| substring |\
| substring(indexStart: integer, indexEnd?: integer): string\
\
Returns a subset of a string between one index and another, or through the end of the string.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| indexStart: | integer |  |\
| indexEndOptional: | integer |  |\
\
Returns\
\
string\
\
Last Update\
\
2020.6 |\
\
|     |\
| --- |\
| toLocaleLowerCase |\
| toLocaleLowerCase(): string<br>Returns the calling string value converted to lowercase, according to any locale-specific case mappings.<br>Returns<br>string |\
\
|     |\
| --- |\
| toLocaleUpperCase |\
| toLocaleUpperCase(): string<br>Returns the calling string value converted to uppercase, according to any locale-specific case mappings.<br>Returns<br>string |\
\
|     |\
| --- |\
| toLowerCase |\
| toLowerCase(): string<br>Returns the calling string value converted to lowercase.<br>Returns<br>string |\
\
|     |\
| --- |\
| toUpperCase |\
| toUpperCase(): string<br>Returns the calling string value converted to uppercase.<br>Returns<br>string |\
\
|     |\
| --- |\
| trim |\
| trim(): string<br>Removes whitespace from both ends of the string.<br>Returns<br>string |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
C\
\


---

<a name="widget"></a>

Widget\
\
is abstract\
\
Direct Subclasses\
\
[BpcPlanningSequence](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequence), [Button](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Button), [Chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Chart), [CheckboxGroup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CheckboxGroup), [Commenting](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Commenting), [Composite](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Composite), [DataActionTrigger](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataActionTrigger), [Dropdown](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Dropdown), [FileUploadTrigger](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FileUploadTrigger), [FilterLine](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FilterLine), [FlowPanel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#FlowPanel), [GeoMap](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#GeoMap), [Image](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Image), [InputControl](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputControl), [InputField](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#InputField), [ListBox](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ListBox), [MultiActionTrigger](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MultiActionTrigger), [PageBook](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PageBook), [Panel](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Panel), [RVisualization](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RVisualization), [RadioButtonGroup](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RadioButtonGroup), [RangeSlider](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RangeSlider), [RssReader](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#RssReader), [Shape](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Shape), [Slider](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Slider), [Switch](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Switch), [TabStrip](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TabStrip), [Table](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Table), [Text](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Text), [TextArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#TextArea), [ValueDriverTree](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#ValueDriverTree), [WebPage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WebPage)\
\
Last Update\
\
2020.20\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass)(): string<br>Returns the Cascading Style Sheet (CSS) class name of the component. |\
| [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout)(): [Layout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout)<br>Returns the layout of the widget. |\
| [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible)(): boolean<br>Returns whether the widget is visible. |\
| [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass)(className: string): void<br>Sets the Cascading Style Sheet (CSS) class name of the component. |\
| [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible)(visible: boolean): void<br>Shows or hides the widget. |\
\
Method Detail\
\
|     |\
| --- |\
| getCssClass |\
| getCssClass(): string<br>Returns the Cascading Style Sheet (CSS) class name of the component.<br>Returns<br>string<br>Since<br>2020.20 |\
\
|     |\
| --- |\
| getLayout |\
| getLayout(): [Layout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout)<br>Returns the layout of the widget.<br>Returns<br>[Layout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Layout)<br>Since<br>2019.14 |\
\
|     |\
| --- |\
| isVisible |\
| isVisible(): boolean<br>Returns whether the widget is visible.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| setCssClass |\
| setCssClass(className: string): void\
\
Sets the Cascading Style Sheet (CSS) class name of the component.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| className: | string |  |\
\
Since\
\
2020.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| setVisible |\
| setVisible(visible: boolean): void\
\
Shows or hides the widget.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| visible: | boolean |  | |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
C\
\


---

<a name="widgetsearchoptions"></a>

WidgetSearchOptions\
\
Since\
\
2021.23\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [searchPattern](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions_P_static_searchPattern): string<br>Part of the name of the widgets to return. |\
| static [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetSearchOptions_P_static_type): [WidgetType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetType)<br>Type of the widgets to return |\
\
Property Detail\
\
|     |\
| --- |\
| searchPattern |\
| staticsearchPattern: string<br>Part of the name of the widgets to return. The search pattern is case-sensitive, for example, the search patterns "SalesChart" and "saleschart" return different results. |\
\
|     |\
| --- |\
| type |\
| statictype: [WidgetType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#WidgetType)<br>Type of the widgets to return |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="widgettype"></a>

WidgetType\
\
Since\
\
2021.23\
\
Optimized Story Experience API Reference Guide\
\
With SAP Analytics Cloud you can create interactive and highly custom-defined stories.\
To enable interactivity, you can write scripts, which are executed when the viewer performs\
an action in your story. For example, you can place the Button widget in the story and\
assign a script to the Button’s onClick event.\
\
\
Scripts consist of one or more statements written in a JavaScript-based language, following\
a specific syntax. To write scripts in your story, you can use the script editor.\
\
\
All objects, functions, properties, methods and events available in such scripts specific to optimized story experience are listed in this API reference. For those specific to analytics designer, refer to Analytics Designer API Reference Guide.

---

<a name="tab"></a>

Tab\
\
Since\
\
2019.14\
\
Last Update\
\
2020.6\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getKey](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab_MgetKey)(): string<br>Returns the key of the tab. |\
| [getText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab_MgetText)(): string<br>Returns the text displayed on the tab. |\
| [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab_MisVisible)(): boolean<br>Returns whether the tab is visible. |\
| [setText](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab_MsetText)(text: string): void<br>Sets the text displayed on the tab. |\
| [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Tab_MsetVisible)(visible: boolean): void<br>Shows or hides the tab. |\
\
Method Detail\
\
|     |\
| --- |\
| getKey |\
| getKey(): string<br>Returns the key of the tab.<br>Returns<br>string |\
\
|     |\
| --- |\
| getText |\
| getText(): string<br>Returns the text displayed on the tab.<br>Returns<br>string |\
\
|     |\
| --- |\
| isVisible |\
| isVisible(): boolean<br>Returns whether the tab is visible.<br>Returns<br>boolean<br>Since<br>2020.6 |\
\
|     |     |     |\
| --- | --- | --- |\
| setText |\
| setText(text: string): void\
\
Sets the text displayed on the tab.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| text: | string |  | |\
\
|     |     |     |\
| --- | --- | --- |\
| setVisible |\
| setVisible(visible: boolean): void\
\
Shows or hides the tab.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| visible: | boolean |  |\
\
Since\
\
2020.6 |\
\
Type Library\
[table2](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLtable2)\
\


