# OSE API: Planning & Calendar

**Version**: 2025.14 | **SAC Release**: Q1 2026 (2026.2) | **Full API Docs**: [SAP Help Portal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html)

Planning operations and calendar integration: version management, data locking, BPC planning sequences, and calendar tasks/processes.

## Classes in This File

- [BpcPlanningSequence](#bpcplanningsequence)
- [BpcPlanningSequenceExecutionResponse](#bpcplanningsequenceexecutionresponse)
- [BpcPlanningSequenceExecutionResponseStatus](#bpcplanningsequenceexecutionresponsestatus)
- [BpcPlanningSequenceVariableInfo](#bpcplanningsequencevariableinfo)
- [CalendarCompositeTask](#calendarcompositetask)
- [CalendarCompositeTaskCreateOptions](#calendarcompositetaskcreateoptions)
- [CalendarCompositeTaskCreateProperties](#calendarcompositetaskcreateproperties)
- [CalendarCompositeTaskReviewersProperties](#calendarcompositetaskreviewersproperties)
- [CalendarContextFilter](#calendarcontextfilter)
- [CalendarDependencies](#calendardependencies)
- [CalendarEvent](#calendarevent)
- [CalendarEventCreateOptions](#calendareventcreateoptions)
- [CalendarGeneralTask](#calendargeneraltask)
- [CalendarGeneralTaskCreateProperties](#calendargeneraltaskcreateproperties)
- [CalendarIntegration](#calendarintegration)
- [CalendarProcess](#calendarprocess)
- [CalendarProcessCreateProperties](#calendarprocesscreateproperties)
- [CalendarProcessFromTemplateCreateProperties](#calendarprocessfromtemplatecreateproperties)
- [CalendarReminder](#calendarreminder)
- [CalendarReminderMeasureType](#calendarremindermeasuretype)
- [CalendarReminderReferenceType](#calendarreminderreferencetype)
- [CalendarReviewTask](#calendarreviewtask)
- [CalendarReviewTaskCreateProperties](#calendarreviewtaskcreateproperties)
- [CalendarTaskStatus](#calendartaskstatus)
- [CalendarTaskType](#calendartasktype)
- [CalendarTaskUserRoleType](#calendartaskuserroletype)
- [CalendarTaskWorkFile](#calendartaskworkfile)
- [CalendarTaskWorkFileType](#calendartaskworkfiletype)
- [CalendarTime](#calendartime)
- [CalendarTimeGranularity](#calendartimegranularity)
- [Planning](#planning)
- [PlanningAreaFilter](#planningareafilter)
- [PlanningAreaInfo](#planningareainfo)
- [PlanningAreaMemberInfo](#planningareamemberinfo)
- [PlanningCategory](#planningcategory)
- [PlanningCopyOption](#planningcopyoption)
- [PlanningModel](#planningmodel)
- [PlanningModelCopyOption](#planningmodelcopyoption)
- [PlanningModelMember](#planningmodelmember)
- [PlanningModelMemberHierarchies](#planningmodelmemberhierarchies)
- [PlanningModelMemberHierarchy](#planningmodelmemberhierarchy)
- [PlanningModelMemberOptions](#planningmodelmemberoptions)
- [PlanningModelMemberPrincipal](#planningmodelmemberprincipal)
- [PlanningModelMemberProperties](#planningmodelmemberproperties)
- [PlanningModelPrivateVersion](#planningmodelprivateversion)
- [PlanningModelPublicEditOption](#planningmodelpubliceditoption)
- [PlanningModelPublicVersion](#planningmodelpublicversion)
- [PlanningModelVersion](#planningmodelversion)
- [PlanningPrivateVersion](#planningprivateversion)
- [PlanningPublicEditOption](#planningpubliceditoption)
- [PlanningPublicVersion](#planningpublicversion)
- [PlanningVersion](#planningversion)
- [Scheduling](#scheduling)
- [SchedulingMessageType](#schedulingmessagetype)

---

<a name="bpcplanningsequence"></a>

BpcPlanningSequence

extends [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget)

Since

2019.13

Last Update

2022.14

Method Summary

|     |
| --- |
| Name and Description |
| [execute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequence_Mexecute)(): [BpcPlanningSequenceExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponse)<br>Executes the BPC planning sequence. |
| [getBpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequence_MgetBpcPlanningSequenceDataSource)(): [BpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource)<br>Returns the data source of the BPC Planning Sequence. |
| [openPromptDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequence_MopenPromptDialog)(): void<br>Opens the Prompt dialog for the BPC planning sequence. |

|     |
| --- |
| Inherited from [Widget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget) |
| [getCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetCssClass), [getLayout](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MgetLayout), [isVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MisVisible), [setCssClass](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetCssClass), [setVisible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Widget_MsetVisible) |

Event Summary

|     |
| --- |
| Name and Description |
| [onBeforeExecute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequence_EonBeforeExecute)(): boolean<br>Called when the user clicks the BPC planning sequence starter. |

Method Detail

|     |
| --- |
| execute |
| execute(): [BpcPlanningSequenceExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponse)<br>Executes the BPC planning sequence.<br>Returns<br>[BpcPlanningSequenceExecutionResponse](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponse)<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2022.14 |

|     |
| --- |
| getBpcPlanningSequenceDataSource |
| getBpcPlanningSequenceDataSource(): [BpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource)<br>Returns the data source of the BPC Planning Sequence.<br>Returns<br>[BpcPlanningSequenceDataSource](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceDataSource)<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2022.14 |

|     |
| --- |
| openPromptDialog |
| openPromptDialog(): void<br>Opens the Prompt dialog for the BPC planning sequence. This method returns after user closes the Prompt dialog.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2022.14 |

Event Detail

|     |
| --- |
| onBeforeExecute |
| onBeforeExecute(): boolean<br>Called when the user clicks the BPC planning sequence starter. If this method returns true or returns no value, then the BPC planning sequence is executed. If this method returns false, then the BPC planning sequence is ignored.<br>Returns<br>booleanDefault value:true<br>Since<br>2020.4 |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="bpcplanningsequenceexecutionresponse"></a>

BpcPlanningSequenceExecutionResponse

Since

2022.14

Property Summary

|     |
| --- |
| Name and Description |
| [status](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponse_Pstatus): [BpcPlanningSequenceExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus)<br>The execution is successful or not |

Property Detail

|     |
| --- |
| status |
| status: [BpcPlanningSequenceExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus)<br>The execution is successful or not |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

E



---

<a name="bpcplanningsequenceexecutionresponsestatus"></a>

BpcPlanningSequenceExecutionResponseStatus

Since

2022.14

Property Summary

|     |
| --- |
| Name and Description |
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus_P_static_Error): [BpcPlanningSequenceExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus)<br>Execution ended with errors. |
| static [Success](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus_P_static_Success): [BpcPlanningSequenceExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus)<br>Execution ended successfully. |

Property Detail

|     |
| --- |
| Error |
| staticError: [BpcPlanningSequenceExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus)<br>Execution ended with errors. |

|     |
| --- |
| Success |
| staticSuccess: [BpcPlanningSequenceExecutionResponseStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceExecutionResponseStatus)<br>Execution ended successfully. |

Type Library
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)

C



---

<a name="bpcplanningsequencevariableinfo"></a>

BpcPlanningSequenceVariableInfo

Since

2022.16

Property Summary

|     |
| --- |
| Name and Description |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo_Pdescription): string |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo_Pid): string |
| [isInputEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#BpcPlanningSequenceVariableInfo_PisInputEnabled): boolean |

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

Type Library
[input-controls](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLinput-controls)

C



---

<a name="calendarcompositetask"></a>

CalendarCompositeTask

extends [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Since

2021.3

Last Update

2024.3

Method Summary

|     |
| --- |
| Name and Description |
| [addReviewer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_MaddReviewer)(reviewer: string, level: number): boolean<br>Adds the reviewer to the specified review level of the calendar event. |
| [approve](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_Mapprove)(): boolean<br>Approves the calendar task. |
| [canUserApprove](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_McanUserApprove)(): boolean<br>Returns whether the current user can approve the task. |
| [canUserDecline](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_McanUserDecline)(): boolean<br>Returns whether the current user can decline the task. |
| [canUserReject](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_McanUserReject)(): boolean<br>Returns whether the current user can reject the task. |
| [canUserSubmit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_McanUserSubmit)(): boolean<br>Returns whether the current user can submit the task. |
| [decline](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_Mdecline)(): boolean<br>Declines the calendar task. |
| [reject](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_Mreject)(): boolean<br>Rejects the calendar task. |
| [removeReviewer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_MremoveReviewer)(reviewer: string): boolean<br>Removes the reviewer from the calendar event. |
| [submit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask_Msubmit)(): boolean<br>Submits the calendar task. |

|     |
| --- |
| Inherited from [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent) |
| [activate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mactivate), [addAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddAssignee), [addContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddContextFilter), [addOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddOwner), [addReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddReminder), [canUserReopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_McanUserReopen), [getContextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetContextFilters), [getDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDependencies), [getDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDescription), [getDueDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDueDate), [getEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetEndDate), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetId), [getName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetName), [getOwners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetOwners), [getParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetParentId), [getProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetProgress), [getReminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetReminders), [getStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStartDate), [getStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStatus), [getType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetType), [hasUserRole](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MhasUserRole), [removeAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveAssignee), [removeContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveContextFilter), [removeOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveOwner), [removeReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveReminder), [reopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mreopen), [sendImmediateReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsendImmediateReminder), [setDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDependencies), [setDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDescription), [setEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetEndDate), [setName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetName), [setParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetParentId), [setProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetProgress), [setStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetStartDate) |

Method Detail

|     |     |     |
| --- | --- | --- |
| addReviewer |
| addReviewer(reviewer: string, level: number): boolean

Adds the reviewer to the specified review level of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| reviewer: | string |  |
| level: | number |  |

Returns

boolean

Since

2024.3 |

|     |
| --- |
| approve |
| approve(): boolean<br>Approves the calendar task. Requires the user role "Reviewer". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

|     |
| --- |
| canUserApprove |
| canUserApprove(): boolean<br>Returns whether the current user can approve the task. A task can be approved if the reviewer has their turn in the reviewer round and the status is "In Progress" or "Open".<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| canUserDecline |
| canUserDecline(): boolean<br>Returns whether the current user can decline the task. A task can be declined if the assignee / reviewer can still work on their task and the task isn't final yet.<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| canUserReject |
| canUserReject(): boolean<br>Returns whether the current user can reject the task. A task can be rejected if the reviewer has their turn in the reviewer round and the status is "In Progress" or "Open".<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| canUserSubmit |
| canUserSubmit(): boolean<br>Returns whether the current user can submit the task. A task can be submitted if the assignee has their turn and the status is "In Progress" or "Open".<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| decline |
| decline(): boolean<br>Declines the calendar task. Requires the user role "Assignee" or "Reviewer". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

|     |
| --- |
| reject |
| reject(): boolean<br>Rejects the calendar task. Requires the user role "Reviewer". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

|     |     |     |
| --- | --- | --- |
| removeReviewer |
| removeReviewer(reviewer: string): boolean

Removes the reviewer from the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| reviewer: | string |  |

Returns

boolean

Since

2024.3 |

|     |
| --- |
| submit |
| submit(): boolean<br>Submits the calendar task. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarcompositetaskcreateoptions"></a>

CalendarCompositeTaskCreateOptions

can be passed as a JSON object to method arguments

This object is deprecated, use "CalendarEventCreateOptions" instead. An object specifying calendar task create options

Since

2021.13

Property Summary

|     |
| --- |
| Name and Description |
| [autoActivate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateOptions_PautoActivate): boolean<br>Specifies whether the task should automatically be activated when the start date is reached. |

Property Detail

|     |
| --- |
| autoActivate |
| autoActivate: boolean<br>Specifies whether the task should automatically be activated when the start date is reached. |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarcompositetaskcreateproperties"></a>

CalendarCompositeTaskCreateProperties

can be passed as a JSON object to method arguments

An object specifying calendar task properties

Since

2021.13

Last Update

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| [assignees](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Passignees): string\[\]<br>Assignees of the calendar task |
| [contextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_PcontextFilters): [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar task |
| [dependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Pdependencies): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar task |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Pdescription): string<br>Description of the calendar task |
| [dueDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_PdueDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Deprecated This property is deprecated, use "endDate" instead. |
| [endDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_PendDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar task (formerly known as due date) |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Pname): string<br>Name of the calendar task |
| [owners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Powners): string\[\]<br>Owners of the calendar task |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_PparentId): string<br>ID of the parent process of the calendar task |
| [reminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Preminders): [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar task |
| [reviewers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_Previewers): [CalendarCompositeTaskReviewersProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskReviewersProperties)<br>Reviewers of the calendar task |
| [startDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_PstartDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar task |
| [workFiles](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties_PworkFiles): [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar task |

Property Detail

|     |
| --- |
| assignees |
| assignees: string\[\]<br>Assignees of the calendar task |

|     |
| --- |
| contextFilters |
| contextFilters: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar task<br>Since<br>2024.3 |

|     |
| --- |
| dependencies |
| dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar task<br>Since<br>2024.3 |

|     |
| --- |
| description |
| description: string<br>Description of the calendar task |

|     |
| --- |
| dueDate |
| dueDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) <br>Deprecated This property is deprecated, use "endDate" instead. Due date of the calendar task<br>Deprecated<br>2023.19 |

|     |
| --- |
| endDate |
| endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar task (formerly known as due date)<br>Since<br>2023.19 |

|     |
| --- |
| name |
| name: string<br>Name of the calendar task |

|     |
| --- |
| owners |
| owners: string\[\]<br>Owners of the calendar task<br>Since<br>2024.3 |

|     |
| --- |
| parentId |
| parentId: string<br>ID of the parent process of the calendar task<br>Since<br>2024.3 |

|     |
| --- |
| reminders |
| reminders: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar task<br>Since<br>2024.3 |

|     |
| --- |
| reviewers |
| reviewers: [CalendarCompositeTaskReviewersProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskReviewersProperties)<br>Reviewers of the calendar task |

|     |
| --- |
| startDate |
| startDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar task |

|     |
| --- |
| workFiles |
| workFiles: [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar task |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarcompositetaskreviewersproperties"></a>

CalendarCompositeTaskReviewersProperties

is an object<string\[\]>

Reviewers information for a calendar composite task

Since

2021.13

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarcontextfilter"></a>

CalendarContextFilter

can be passed as a JSON object to method arguments

An object specifying a calendar context filter

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| [hierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter_Phierarchy): [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON<br>Hierarchy of the context filter |
| [members](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter_Pmembers): [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON<br>Members of the context filter |

Property Detail

|     |
| --- |
| hierarchy |
| hierarchy: [HierarchyInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#HierarchyInfo) JSON<br>Hierarchy of the context filter |

|     |
| --- |
| members |
| members: [MemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#MemberInfo)\[\]JSON<br>Members of the context filter |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendardependencies"></a>

CalendarDependencies

can be passed as a JSON object to method arguments

An object specifying calendar dependencies

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| [dependentOnIds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies_PdependentOnIds): string\[\]<br>IDs of events this event is dependent on. |
| [triggerStatuses](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies_PtriggerStatuses): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)\[\]<br>Statuses of the predecessors on which this event is initiated |

Property Detail

|     |
| --- |
| dependentOnIds |
| dependentOnIds: string\[\]<br>IDs of events this event is dependent on. All predecessors need to have no or the same parent process as this event. |

|     |
| --- |
| triggerStatuses |
| triggerStatuses: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)\[\]<br>Statuses of the predecessors on which this event is initiated |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarevent"></a>

CalendarEvent

is abstract

An object representing a calendar task

Direct Subclasses

[CalendarCompositeTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask), [CalendarGeneralTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask), [CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess), [CalendarReviewTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask)

Since

2024.3

Last Update

2024.19

Method Summary

|     |
| --- |
| Name and Description |
| [activate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mactivate)(): boolean<br>Activates a task. |
| [addAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddAssignee)(assignee: string): boolean<br>Adds the assignee to the calendar event. |
| [addContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddContextFilter)(contextFilter: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter) JSON): boolean<br>Adds the context filter to the calendar event. |
| [addOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddOwner)(owner: string): boolean<br>Adds the owner to the calendar event. |
| [addReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddReminder)(reminder: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder) JSON): boolean<br>Adds the reminder to the calendar event. |
| [canUserReopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_McanUserReopen)(): boolean<br>Returns whether the current user can reopen the event. |
| [getContextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetContextFilters)(): [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]<br>Returns the contexts of the calendar event. |
| [getDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDependencies)(): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies)<br>Returns the dependencies of the calendar event. |
| [getDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDescription)(): string<br>Returns the description of the calendar task. |
| [getDueDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDueDate)(): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Deprecated This method is deprecated, use "getEndDate()" instead. |
| [getEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetEndDate)(): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Returns the end date of the calendar task (formerly known as due date). |
| [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetId)(): string<br>Returns the ID of the calendar task. |
| [getName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetName)(): string<br>Returns the name of the calendar task. |
| [getOwners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetOwners)(): string\[\]<br>Returns the owners of the calendar event. |
| [getParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetParentId)(): string<br>Returns the ID of the parent process of the calendar event. |
| [getProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetProgress)(): integer<br>Returns the progress of the calendar task. |
| [getReminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetReminders)(): [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]<br>Returns the reminders of the calendar event. |
| [getStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStartDate)(): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Returns the start date of the calendar task. |
| [getStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStatus)(): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>Returns the status of the calendar task. |
| [getType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetType)(): [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Returns the type of the calendar task. |
| [hasUserRole](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MhasUserRole)(calendarRoleType: [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)): boolean<br>Returns whether the current user has the specified role of the calendar task. |
| [removeAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveAssignee)(assignee: string): boolean<br>Removes the assignee from the calendar event. |
| [removeContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveContextFilter)(contextFilter: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter) JSON): boolean<br>Removes the context filter from the calendar event. |
| [removeOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveOwner)(owner: string): boolean<br>Removes the owner from the calendar event. |
| [removeReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveReminder)(reminder: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder) JSON): boolean<br>Removes the reminder from the calendar event. |
| [reopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mreopen)(includingChildren?: boolean): boolean<br>Reopens an event. |
| [sendImmediateReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsendImmediateReminder)(message?: string): boolean<br>Sends an immediate reminder with an optional message. |
| [setDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDependencies)(dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON): boolean<br>Sets the dependencies of the calendar event. |
| [setDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDescription)(description: string): boolean<br>Sets the description of the calendar event. |
| [setEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetEndDate)(endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)): boolean<br>Sets the end date of the calendar event. |
| [setName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetName)(name: string): boolean<br>Sets the name of the calendar event. |
| [setParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetParentId)(parentId: string): boolean<br>Sets the ID of the parent process of the calendar event. |
| [setProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetProgress)(progress: integer): boolean<br>Sets the progress of the calendar event. |
| [setStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetStartDate)(startDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)): boolean<br>Sets the start date of the calendar event. |

Method Detail

|     |
| --- |
| activate |
| activate(): boolean<br>Activates a task. If this operation was successful, then true is returned, and false if it wasn't. The notify option is deprecated and no longer has an effect.<br>Returns<br>boolean<br>Last Update<br>2024.19 |

|     |     |     |
| --- | --- | --- |
| addAssignee |
| addAssignee(assignee: string): boolean

Adds the assignee to the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| assignee: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| addContextFilter |
| addContextFilter(contextFilter: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter) JSON): boolean

Adds the context filter to the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| contextFilter: | [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter) JSON |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| addOwner |
| addOwner(owner: string): boolean

Adds the owner to the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| owner: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| addReminder |
| addReminder(reminder: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder) JSON): boolean

Adds the reminder to the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| reminder: | [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder) JSON |  |

Returns

boolean |

|     |
| --- |
| canUserReopen |
| canUserReopen(): boolean<br>Returns whether the current user can reopen the event. An event can be reopened if the event has a final status and the user is an owner of this event.<br>Returns<br>boolean |

|     |
| --- |
| getContextFilters |
| getContextFilters(): [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]<br>Returns the contexts of the calendar event.<br>Returns<br>[CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\] |

|     |
| --- |
| getDependencies |
| getDependencies(): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies)<br>Returns the dependencies of the calendar event.<br>Returns<br>[CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) |

|     |
| --- |
| getDescription |
| getDescription(): string<br>Returns the description of the calendar task.<br>Returns<br>string |

|     |
| --- |
| getDueDate |
| getDueDate(): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) <br>Deprecated This method is deprecated, use "getEndDate()" instead. Returns the due date of the calendar task.<br>Returns<br>[Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Deprecated<br>2024.3 |

|     |
| --- |
| getEndDate |
| getEndDate(): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Returns the end date of the calendar task (formerly known as due date).<br>Returns<br>[Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |

|     |
| --- |
| getId |
| getId(): string<br>Returns the ID of the calendar task.<br>Returns<br>string |

|     |
| --- |
| getName |
| getName(): string<br>Returns the name of the calendar task.<br>Returns<br>string |

|     |
| --- |
| getOwners |
| getOwners(): string\[\]<br>Returns the owners of the calendar event.<br>Returns<br>string\[\] |

|     |
| --- |
| getParentId |
| getParentId(): string<br>Returns the ID of the parent process of the calendar event.<br>Returns<br>string |

|     |
| --- |
| getProgress |
| getProgress(): integer<br>Returns the progress of the calendar task. The progress is specified as an integer between 0 and 100.<br>Returns<br>integer |

|     |
| --- |
| getReminders |
| getReminders(): [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]<br>Returns the reminders of the calendar event.<br>Returns<br>[CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\] |

|     |
| --- |
| getStartDate |
| getStartDate(): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Returns the start date of the calendar task.<br>Returns<br>[Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |

|     |
| --- |
| getStatus |
| getStatus(): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>Returns the status of the calendar task.<br>Returns<br>[CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus) |

|     |
| --- |
| getType |
| getType(): [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Returns the type of the calendar task.<br>Returns<br>[CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType) |

|     |     |     |
| --- | --- | --- |
| hasUserRole |
| hasUserRole(calendarRoleType: [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)): boolean

Returns whether the current user has the specified role of the calendar task.

Parameters

|     |     |     |
| --- | --- | --- |
| calendarRoleType: | [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType) |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| removeAssignee |
| removeAssignee(assignee: string): boolean

Removes the assignee from the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| assignee: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| removeContextFilter |
| removeContextFilter(contextFilter: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter) JSON): boolean

Removes the context filter from the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| contextFilter: | [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter) JSON |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| removeOwner |
| removeOwner(owner: string): boolean

Removes the owner from the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| owner: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| removeReminder |
| removeReminder(reminder: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder) JSON): boolean

Removes the reminder from the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| reminder: | [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder) JSON |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| reopen |
| reopen(includingChildren?: boolean): boolean

Reopens an event. Optionally, for processes all child events can be included to reopen.

Parameters

|     |     |     |
| --- | --- | --- |
| includingChildrenOptional: | boolean |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| sendImmediateReminder |
| sendImmediateReminder(message?: string): boolean

Sends an immediate reminder with an optional message. All involved people will directly receive a notification.

Parameters

|     |     |     |
| --- | --- | --- |
| messageOptional: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setDependencies |
| setDependencies(dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON): boolean

Sets the dependencies of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| dependencies: | [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setDescription |
| setDescription(description: string): boolean

Sets the description of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| description: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setEndDate |
| setEndDate(endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)): boolean

Sets the end date of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| endDate: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setName |
| setName(name: string): boolean

Sets the name of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| name: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setParentId |
| setParentId(parentId: string): boolean

Sets the ID of the parent process of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| parentId: | string |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setProgress |
| setProgress(progress: integer): boolean

Sets the progress of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| progress: | integer |  |

Returns

boolean |

|     |     |     |
| --- | --- | --- |
| setStartDate |
| setStartDate(startDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)): boolean

Sets the start date of the calendar event. If this operation was successful, then true is returned, and false if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| startDate: | [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date) |  |

Returns

boolean |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendareventcreateoptions"></a>

CalendarEventCreateOptions

can be passed as a JSON object to method arguments

An object specifying calendar event create options

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| [autoActivate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions_PautoActivate): boolean<br>Specifies whether the event should automatically be activated when the start date is reached. |

Property Detail

|     |
| --- |
| autoActivate |
| autoActivate: boolean<br>Specifies whether the event should automatically be activated when the start date is reached. |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendargeneraltask"></a>

CalendarGeneralTask

extends [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Since

2021.3

Last Update

2021.19

Method Summary

|     |
| --- |
| Name and Description |
| [canUserDecline](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask_McanUserDecline)(): boolean<br>Returns whether the current user can decline the task. |
| [canUserSubmit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask_McanUserSubmit)(): boolean<br>Returns whether the current user can submit the task. |
| [decline](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask_Mdecline)(): boolean<br>Declines the calendar task. |
| [submit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask_Msubmit)(): boolean<br>Submits the calendar task. |

|     |
| --- |
| Inherited from [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent) |
| [activate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mactivate), [addAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddAssignee), [addContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddContextFilter), [addOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddOwner), [addReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddReminder), [canUserReopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_McanUserReopen), [getContextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetContextFilters), [getDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDependencies), [getDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDescription), [getDueDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDueDate), [getEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetEndDate), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetId), [getName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetName), [getOwners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetOwners), [getParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetParentId), [getProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetProgress), [getReminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetReminders), [getStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStartDate), [getStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStatus), [getType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetType), [hasUserRole](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MhasUserRole), [removeAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveAssignee), [removeContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveContextFilter), [removeOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveOwner), [removeReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveReminder), [reopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mreopen), [sendImmediateReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsendImmediateReminder), [setDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDependencies), [setDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDescription), [setEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetEndDate), [setName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetName), [setParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetParentId), [setProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetProgress), [setStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetStartDate) |

Method Detail

|     |
| --- |
| canUserDecline |
| canUserDecline(): boolean<br>Returns whether the current user can decline the task. A task can be declined if the assignee can still work on their task and the task isn't final yet.<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| canUserSubmit |
| canUserSubmit(): boolean<br>Returns whether the current user can submit the task. A task can be submitted if the assignee has their turn and the status is "In Progress" or "Open".<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| decline |
| decline(): boolean<br>Declines the calendar task. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

|     |
| --- |
| submit |
| submit(): boolean<br>Submits the calendar task. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendargeneraltaskcreateproperties"></a>

CalendarGeneralTaskCreateProperties

can be passed as a JSON object to method arguments

An object specifying calendar task properties

Since

2024.17

Property Summary

|     |
| --- |
| Name and Description |
| [assignees](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_Passignees): string\[\]<br>Assignees of the calendar task |
| [contextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_PcontextFilters): [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar task |
| [dependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_Pdependencies): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar task |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_Pdescription): string<br>Description of the calendar task |
| [endDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_PendDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar task (formerly known as due date) |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_Pname): string<br>Name of the calendar task |
| [owners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_Powners): string\[\]<br>Owners of the calendar task |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_PparentId): string<br>ID of the parent process of the calendar task |
| [reminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_Preminders): [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar task |
| [startDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_PstartDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar task |
| [workFiles](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties_PworkFiles): [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar task |

Property Detail

|     |
| --- |
| assignees |
| assignees: string\[\]<br>Assignees of the calendar task |

|     |
| --- |
| contextFilters |
| contextFilters: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar task |

|     |
| --- |
| dependencies |
| dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar task |

|     |
| --- |
| description |
| description: string<br>Description of the calendar task |

|     |
| --- |
| endDate |
| endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar task (formerly known as due date) |

|     |
| --- |
| name |
| name: string<br>Name of the calendar task |

|     |
| --- |
| owners |
| owners: string\[\]<br>Owners of the calendar task |

|     |
| --- |
| parentId |
| parentId: string<br>ID of the parent process of the calendar task |

|     |
| --- |
| reminders |
| reminders: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar task |

|     |
| --- |
| startDate |
| startDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar task |

|     |
| --- |
| workFiles |
| workFiles: [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar task |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarintegration"></a>

CalendarIntegration

Since

2021.3

Last Update

2024.17

Method Summary

|     |
| --- |
| Name and Description |
| [createCompositeTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_McreateCompositeTask)(taskProperties: [CalendarCompositeTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON \| [CalendarCompositeTaskCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateOptions) JSON): [CalendarCompositeTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask)<br>Deprecated This method is deprecated, use "createGeneralTask" and "createReviewTask" instead. |
| [createGeneralTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_McreateGeneralTask)(taskProperties: [CalendarGeneralTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON): [CalendarGeneralTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask)<br>Creates a general task specified by the task properties and the create options. |
| [createProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_McreateProcess)(processProperties: [CalendarProcessCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON): [CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess)<br>Creates a process specified by the process properties and the create options. |
| [createProcessFromTemplate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_McreateProcessFromTemplate)(templateId: string, processFromTemplateProperties: [CalendarProcessFromTemplateCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties) JSON): [CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess)<br>Creates a process from template specified by the template id, process properties and the create options. |
| [createReviewTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_McreateReviewTask)(taskProperties: [CalendarReviewTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON): [CalendarReviewTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask)<br>Creates a review task specified by the task properties and the create options. |
| [getCalendarEventById](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_MgetCalendarEventById)(eventId: string): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Returns the calendar event specified by the event ID. |
| [getCalendarTaskById](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_MgetCalendarTaskById)(taskId: string): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Deprecated This method is deprecated, use "getCalendarEventById" instead. |
| [getCurrentEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_MgetCurrentEvent)(): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Returns the calendar event with which the analytic application or story was started. |
| [getCurrentTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_MgetCurrentTask)(): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Deprecated This method is deprecated, use "getCurrentEvent" instead. |
| [getRelatedEventIds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_MgetRelatedEventIds)(): string\[\]<br>Returns an array of IDs of the events where the analytic application or story is a work file. |
| [getRelatedTaskIds](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarIntegration_MgetRelatedTaskIds)(): string\[\]<br>Deprecated This method is deprecated, use "getRelatedEventIds" instead. |

Method Detail

|     |     |     |
| --- | --- | --- |
| createCompositeTask |
| createCompositeTask(taskProperties: [CalendarCompositeTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON \| [CalendarCompositeTaskCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateOptions) JSON): [CalendarCompositeTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask)

Deprecated This method is deprecated, use "createGeneralTask" and "createReviewTask" instead. Creates a composite task specified by the task properties and the create options. If this operation was successful, then the composite task is returned, and undefined if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| taskProperties: | [CalendarCompositeTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateProperties) JSON |  |
| createOptionsOptional: | [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON \| [CalendarCompositeTaskCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTaskCreateOptions) JSON |  |

Returns

[CalendarCompositeTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarCompositeTask)

Since

2021.13

Last Update

2024.3

Deprecated

2024.17 |

|     |     |     |
| --- | --- | --- |
| createGeneralTask |
| createGeneralTask(taskProperties: [CalendarGeneralTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON): [CalendarGeneralTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask)

Creates a general task specified by the task properties and the create options. If this operation was successful, then the general task is returned, and undefined if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| taskProperties: | [CalendarGeneralTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTaskCreateProperties) JSON |  |
| createOptionsOptional: | [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON |  |

Returns

[CalendarGeneralTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarGeneralTask)

Since

2024.17 |

|     |     |     |
| --- | --- | --- |
| createProcess |
| createProcess(processProperties: [CalendarProcessCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON): [CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess)

Creates a process specified by the process properties and the create options. If this operation was successful, then the process is returned, and undefined if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| processProperties: | [CalendarProcessCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties) JSON |  |
| createOptionsOptional: | [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON |  |

Returns

[CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess)

Since

2024.3 |

|     |     |     |
| --- | --- | --- |
| createProcessFromTemplate |
| createProcessFromTemplate(templateId: string, processFromTemplateProperties: [CalendarProcessFromTemplateCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties) JSON): [CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess)

Creates a process from template specified by the template id, process properties and the create options. If this operation was successful, then the process is returned, and undefined if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| templateId: | string |  |
| processFromTemplateProperties: | [CalendarProcessFromTemplateCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties) JSON |  |

Returns

[CalendarProcess](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess)

Since

2024.17 |

|     |     |     |
| --- | --- | --- |
| createReviewTask |
| createReviewTask(taskProperties: [CalendarReviewTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties) JSON, createOptions?: [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON): [CalendarReviewTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask)

Creates a review task specified by the task properties and the create options. If this operation was successful, then the review task is returned, and undefined if it wasn't.

Parameters

|     |     |     |
| --- | --- | --- |
| taskProperties: | [CalendarReviewTaskCreateProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties) JSON |  |
| createOptionsOptional: | [CalendarEventCreateOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEventCreateOptions) JSON |  |

Returns

[CalendarReviewTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask)

Since

2024.17 |

|     |     |     |
| --- | --- | --- |
| getCalendarEventById |
| getCalendarEventById(eventId: string): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Returns the calendar event specified by the event ID. If no calendar event was found, then undefined is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| eventId: | string |  |

Returns

[CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Since

2024.3 |

|     |     |     |
| --- | --- | --- |
| getCalendarTaskById |
| getCalendarTaskById(taskId: string): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Deprecated This method is deprecated, use "getCalendarEventById" instead. Returns the calendar task specified by the task ID. If no calendar task was found, then undefined is returned.

Parameters

|     |     |     |
| --- | --- | --- |
| taskId: | string |  |

Returns

[CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Since

2021.13

Last Update

2024.3

Deprecated

2024.3 |

|     |
| --- |
| getCurrentEvent |
| getCurrentEvent(): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Returns the calendar event with which the analytic application or story was started. If the analytic application or story isn't associated with a calendar event, then undefined is returned.<br>Returns<br>[CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Since<br>2024.3 |

|     |
| --- |
| getCurrentTask |
| getCurrentTask(): [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent) <br>Deprecated This method is deprecated, use "getCurrentEvent" instead. Returns the calendar task with which the analytic application or story was started. If the analytic application or story isn't associated with a calendar task, then undefined is returned.<br>Returns<br>[CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)<br>Last Update<br>2024.3<br>Deprecated<br>2024.3 |

|     |
| --- |
| getRelatedEventIds |
| getRelatedEventIds(): string\[\]<br>Returns an array of IDs of the events where the analytic application or story is a work file. Recurring events are excluded from the result.<br>Returns<br>string\[\]<br>Since<br>2024.3 |

|     |
| --- |
| getRelatedTaskIds |
| getRelatedTaskIds(): string\[\]<br>Deprecated This method is deprecated, use "getRelatedEventIds" instead. Returns an array of task IDs for which the analytic application or story is a work file. Recurring composite tasks are excluded from the result.<br>Returns<br>string\[\]<br>Since<br>2021.13<br>Deprecated<br>2024.3 |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarprocess"></a>

CalendarProcess

extends [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Since

2024.3

Method Summary

|     |
| --- |
| Name and Description |
| [canUserDecline](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess_McanUserDecline)(): boolean<br>Returns whether the current user can decline the process. |
| [canUserSubmit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess_McanUserSubmit)(): boolean<br>Returns whether the current user can submit the process. |
| [decline](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess_Mdecline)(): boolean<br>Declines the calendar process. |
| [getChildren](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess_MgetChildren)(): string\[\]<br>Returns an array of children IDs of the selected process. |
| [submit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcess_Msubmit)(): boolean<br>Submits the calendar process. |

|     |
| --- |
| Inherited from [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent) |
| [activate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mactivate), [addAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddAssignee), [addContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddContextFilter), [addOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddOwner), [addReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddReminder), [canUserReopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_McanUserReopen), [getContextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetContextFilters), [getDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDependencies), [getDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDescription), [getDueDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDueDate), [getEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetEndDate), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetId), [getName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetName), [getOwners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetOwners), [getParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetParentId), [getProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetProgress), [getReminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetReminders), [getStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStartDate), [getStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStatus), [getType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetType), [hasUserRole](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MhasUserRole), [removeAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveAssignee), [removeContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveContextFilter), [removeOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveOwner), [removeReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveReminder), [reopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mreopen), [sendImmediateReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsendImmediateReminder), [setDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDependencies), [setDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDescription), [setEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetEndDate), [setName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetName), [setParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetParentId), [setProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetProgress), [setStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetStartDate) |

Method Detail

|     |
| --- |
| canUserDecline |
| canUserDecline(): boolean<br>Returns whether the current user can decline the process. A process can be declined if the assignee can still work on their process and the process isn't final yet.<br>Returns<br>boolean |

|     |
| --- |
| canUserSubmit |
| canUserSubmit(): boolean<br>Returns whether the current user can submit the process. A process can be submitted if the assignee has their turn and the status is "In Progress" or "Open".<br>Returns<br>boolean |

|     |
| --- |
| decline |
| decline(): boolean<br>Declines the calendar process. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

|     |
| --- |
| getChildren |
| getChildren(): string\[\]<br>Returns an array of children IDs of the selected process.<br>Returns<br>string\[\] |

|     |
| --- |
| submit |
| submit(): boolean<br>Submits the calendar process. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarprocesscreateproperties"></a>

CalendarProcessCreateProperties

can be passed as a JSON object to method arguments

An object specifying calendar process properties

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| [assignees](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_Passignees): string\[\]<br>Assignees of the calendar process |
| [contextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_PcontextFilters): [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar process |
| [dependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_Pdependencies): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar process |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_Pdescription): string<br>Description of the calendar process |
| [endDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_PendDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar process |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_Pname): string<br>Name of the calendar process |
| [owners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_Powners): string\[\]<br>Owners of the calendar process |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_PparentId): string<br>ID of the parent process of the calendar process |
| [reminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_Preminders): [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar process |
| [startDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_PstartDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar process |
| [workFiles](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessCreateProperties_PworkFiles): [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar process |

Property Detail

|     |
| --- |
| assignees |
| assignees: string\[\]<br>Assignees of the calendar process |

|     |
| --- |
| contextFilters |
| contextFilters: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar process |

|     |
| --- |
| dependencies |
| dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar process |

|     |
| --- |
| description |
| description: string<br>Description of the calendar process |

|     |
| --- |
| endDate |
| endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar process |

|     |
| --- |
| name |
| name: string<br>Name of the calendar process |

|     |
| --- |
| owners |
| owners: string\[\]<br>Owners of the calendar process |

|     |
| --- |
| parentId |
| parentId: string<br>ID of the parent process of the calendar process |

|     |
| --- |
| reminders |
| reminders: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar process |

|     |
| --- |
| startDate |
| startDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar process |

|     |
| --- |
| workFiles |
| workFiles: [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar process |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarprocessfromtemplatecreateproperties"></a>

CalendarProcessFromTemplateCreateProperties

can be passed as a JSON object to method arguments

An object specifying calendar process from template properties

Since

2024.17

Property Summary

|     |
| --- |
| Name and Description |
| [dependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_Pdependencies): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar process |
| [endDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_PendDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar process |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_PparentId): string<br>ID of the parent process of the calendar process |
| [prefix](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_Pprefix): string<br>Prefix of the generated events |
| [startDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_PstartDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar process |
| [suffix](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_Psuffix): string<br>Suffix of the generated events |
| [useTypeBasedNames](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarProcessFromTemplateCreateProperties_PuseTypeBasedNames): boolean<br>Specifies whether the event names should be based on the event type or on the template name. |

Property Detail

|     |
| --- |
| dependencies |
| dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar process |

|     |
| --- |
| endDate |
| endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar process |

|     |
| --- |
| parentId |
| parentId: string<br>ID of the parent process of the calendar process |

|     |
| --- |
| prefix |
| prefix: string<br>Prefix of the generated events |

|     |
| --- |
| startDate |
| startDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>Start date of the calendar process |

|     |
| --- |
| suffix |
| suffix: string<br>Suffix of the generated events |

|     |
| --- |
| useTypeBasedNames |
| useTypeBasedNames: boolean<br>Specifies whether the event names should be based on the event type or on the template name. |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarreminder"></a>

CalendarReminder

can be passed as a JSON object to method arguments

An object specifying a calendar reminder

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| [measure](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder_Pmeasure): [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>Measure of the reminder |
| [number](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder_Pnumber): number<br>Number of the reminder to specify the amount of time. |
| [reference](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder_Preference): [CalendarReminderReferenceType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType)<br>Reference of the reminder. |

Property Detail

|     |
| --- |
| measure |
| measure: [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>Measure of the reminder |

|     |
| --- |
| number |
| number: number<br>Number of the reminder to specify the amount of time. Half time reminders don't require this property. |

|     |
| --- |
| reference |
| reference: [CalendarReminderReferenceType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType)<br>Reference of the reminder. Half time reminders don't require this property. |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

E



---

<a name="calendarremindermeasuretype"></a>

CalendarReminderMeasureType

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| static [Day](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType_P_static_Day): [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent the specified days before the start or end of the event. |
| static [HalfTime](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType_P_static_HalfTime): [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent at the half of the event time. |
| static [Hour](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType_P_static_Hour): [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent the specified hours before the start or end of the event. |
| static [Minute](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType_P_static_Minute): [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent the specified minutes before the start or end of the event. |

Property Detail

|     |
| --- |
| Day |
| staticDay: [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent the specified days before the start or end of the event. |

|     |
| --- |
| HalfTime |
| staticHalfTime: [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent at the half of the event time. |

|     |
| --- |
| Hour |
| staticHour: [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent the specified hours before the start or end of the event. |

|     |
| --- |
| Minute |
| staticMinute: [CalendarReminderMeasureType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderMeasureType)<br>The reminder is sent the specified minutes before the start or end of the event. |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

E



---

<a name="calendarreminderreferencetype"></a>

CalendarReminderReferenceType

Since

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| static [End](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType_P_static_End): [CalendarReminderReferenceType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType)<br>The reminder is based on the end date. |
| static [Start](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType_P_static_Start): [CalendarReminderReferenceType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType)<br>The reminder is based on the start date. |

Property Detail

|     |
| --- |
| End |
| staticEnd: [CalendarReminderReferenceType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType)<br>The reminder is based on the end date. |

|     |
| --- |
| Start |
| staticStart: [CalendarReminderReferenceType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminderReferenceType)<br>The reminder is based on the start date. |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarreviewtask"></a>

CalendarReviewTask

extends [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent)

Since

2021.3

Last Update

2021.19

Method Summary

|     |
| --- |
| Name and Description |
| [approve](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask_Mapprove)(): boolean<br>Approves the calendar task. |
| [canUserApprove](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask_McanUserApprove)(): boolean<br>Returns whether the current user can approve the task. |
| [canUserReject](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask_McanUserReject)(): boolean<br>Returns whether the current user can reject the task. |
| [reject](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTask_Mreject)(): boolean<br>Rejects the calendar task. |

|     |
| --- |
| Inherited from [CalendarEvent](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent) |
| [activate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mactivate), [addAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddAssignee), [addContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddContextFilter), [addOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddOwner), [addReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MaddReminder), [canUserReopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_McanUserReopen), [getContextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetContextFilters), [getDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDependencies), [getDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDescription), [getDueDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetDueDate), [getEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetEndDate), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetId), [getName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetName), [getOwners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetOwners), [getParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetParentId), [getProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetProgress), [getReminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetReminders), [getStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStartDate), [getStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetStatus), [getType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MgetType), [hasUserRole](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MhasUserRole), [removeAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveAssignee), [removeContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveContextFilter), [removeOwner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveOwner), [removeReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MremoveReminder), [reopen](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_Mreopen), [sendImmediateReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsendImmediateReminder), [setDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDependencies), [setDescription](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetDescription), [setEndDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetEndDate), [setName](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetName), [setParentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetParentId), [setProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetProgress), [setStartDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarEvent_MsetStartDate) |

Method Detail

|     |
| --- |
| approve |
| approve(): boolean<br>Approves the calendar task. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

|     |
| --- |
| canUserApprove |
| canUserApprove(): boolean<br>Returns whether the current user can approve the task. A task can be approved if the reviewer has their turn in the reviewer round and the status is "In Progress" or "Open".<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| canUserReject |
| canUserReject(): boolean<br>Returns whether the current user can reject the task. A task can be rejected if the reviewer has their turn in the reviewer round and the status is "In Progress" or "Open".<br>Returns<br>boolean<br>Since<br>2021.19 |

|     |
| --- |
| reject |
| reject(): boolean<br>Rejects the calendar task. Requires the user role "Assignee". If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendarreviewtaskcreateproperties"></a>

CalendarReviewTaskCreateProperties

can be passed as a JSON object to method arguments

An object specifying calendar task properties

Since

2024.17

Property Summary

|     |
| --- |
| Name and Description |
| [assignees](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_Passignees): string\[\]<br>Assignees of the calendar task |
| [contextFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_PcontextFilters): [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar task |
| [dependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_Pdependencies): [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar task |
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_Pdescription): string<br>Description of the calendar task |
| [endDate](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_PendDate): [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar task (formerly known as due date) |
| [name](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_Pname): string<br>Name of the calendar task |
| [owners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_Powners): string\[\]<br>Owners of the calendar task |
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_PparentId): string<br>ID of the parent process of the calendar task |
| [reminders](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_Preminders): [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar task |
| [workFiles](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReviewTaskCreateProperties_PworkFiles): [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar task |

Property Detail

|     |
| --- |
| assignees |
| assignees: string\[\]<br>Assignees of the calendar task |

|     |
| --- |
| contextFilters |
| contextFilters: [CalendarContextFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarContextFilter)\[\]JSON<br>Context filters of the calendar task |

|     |
| --- |
| dependencies |
| dependencies: [CalendarDependencies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarDependencies) JSON<br>Dependencies of the calendar task |

|     |
| --- |
| description |
| description: string<br>Description of the calendar task |

|     |
| --- |
| endDate |
| endDate: [Date](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Date)<br>End date of the calendar task (formerly known as due date) |

|     |
| --- |
| name |
| name: string<br>Name of the calendar task |

|     |
| --- |
| owners |
| owners: string\[\]<br>Owners of the calendar task |

|     |
| --- |
| parentId |
| parentId: string<br>ID of the parent process of the calendar task |

|     |
| --- |
| reminders |
| reminders: [CalendarReminder](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarReminder)\[\]JSON<br>Reminders of the calendar task |

|     |
| --- |
| workFiles |
| workFiles: [CalendarTaskWorkFile](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile)\[\]JSON<br>Work files of the calendar task |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

E



---

<a name="calendartaskstatus"></a>

CalendarTaskStatus

Since

2021.3

Last Update

2024.14

Property Summary

|     |
| --- |
| Name and Description |
| static [Canceled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_Canceled): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Canceled". |
| static [Failed](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_Failed): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Failed". |
| static [Inactive](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_Inactive): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Inactive". |
| static [InProgress](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_InProgress): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "In Progress". |
| static [NoAssignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_NoAssignee): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "No Assignee". |
| static [OnHold](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_OnHold): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "On Hold". |
| static [Open](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_Open): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Open". |
| static [PartiallySuccessful](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_PartiallySuccessful): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Partially Successful". |
| static [Successful](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus_P_static_Successful): [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Successful". |

Property Detail

|     |
| --- |
| Canceled |
| staticCanceled: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Canceled". |

|     |
| --- |
| Failed |
| staticFailed: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Failed".<br>Since<br>2024.14 |

|     |
| --- |
| Inactive |
| staticInactive: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Inactive".<br>Since<br>2021.13 |

|     |
| --- |
| InProgress |
| staticInProgress: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "In Progress". |

|     |
| --- |
| NoAssignee |
| staticNoAssignee: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "No Assignee".<br>Since<br>2021.13 |

|     |
| --- |
| OnHold |
| staticOnHold: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "On Hold". |

|     |
| --- |
| Open |
| staticOpen: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Open". |

|     |
| --- |
| PartiallySuccessful |
| staticPartiallySuccessful: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Partially Successful".<br>Since<br>2024.14 |

|     |
| --- |
| Successful |
| staticSuccessful: [CalendarTaskStatus](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskStatus)<br>The calendar task is in status "Successful".<br>Since<br>2023.3 |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

E



---

<a name="calendartasktype"></a>

CalendarTaskType

Since

2021.3

Last Update

2024.3

Property Summary

|     |
| --- |
| Name and Description |
| static [CompositeTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType_P_static_CompositeTask): [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Composite task |
| static [GeneralTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType_P_static_GeneralTask): [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>General task |
| static [Process](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType_P_static_Process): [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Process |
| static [ReviewTask](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType_P_static_ReviewTask): [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Review task |

Property Detail

|     |
| --- |
| CompositeTask |
| staticCompositeTask: [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Composite task |

|     |
| --- |
| GeneralTask |
| staticGeneralTask: [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>General task |

|     |
| --- |
| Process |
| staticProcess: [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Process<br>Since<br>2024.3 |

|     |
| --- |
| ReviewTask |
| staticReviewTask: [CalendarTaskType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskType)<br>Review task |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

E



---

<a name="calendartaskuserroletype"></a>

CalendarTaskUserRoleType

Since

2021.3

Property Summary

|     |
| --- |
| Name and Description |
| static [Assignee](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType_P_static_Assignee): [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)<br>The person who processes the calendar task |
| static [Owner](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType_P_static_Owner): [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)<br>The person who created the calendar task |
| static [Reviewer](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType_P_static_Reviewer): [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)<br>The person who supervises the work of the assignee |

Property Detail

|     |
| --- |
| Assignee |
| staticAssignee: [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)<br>The person who processes the calendar task |

|     |
| --- |
| Owner |
| staticOwner: [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)<br>The person who created the calendar task |

|     |
| --- |
| Reviewer |
| staticReviewer: [CalendarTaskUserRoleType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskUserRoleType)<br>The person who supervises the work of the assignee |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

C



---

<a name="calendartaskworkfile"></a>

CalendarTaskWorkFile

can be passed as a JSON object to method arguments

An object specifying a calendar task work file

Since

2021.13

Property Summary

|     |
| --- |
| Name and Description |
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile_Pid): string<br>ID of the work file |
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFile_Ptype): [CalendarTaskWorkFileType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType)<br>Type of the work file |

Property Detail

|     |
| --- |
| id |
| id: string<br>ID of the work file |

|     |
| --- |
| type |
| type: [CalendarTaskWorkFileType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType)<br>Type of the work file |

Type Library
[calendar-integration](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcalendar-integration)

E



---

<a name="calendartaskworkfiletype"></a>

CalendarTaskWorkFileType

Since

2021.13

Property Summary

|     |
| --- |
| Name and Description |
| static [AnalyticApplication](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType_P_static_AnalyticApplication): [CalendarTaskWorkFileType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType)<br>The work file is an analytic application. |
| static [Story](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType_P_static_Story): [CalendarTaskWorkFileType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType)<br>The work file is a story. |

Property Detail

|     |
| --- |
| AnalyticApplication |
| staticAnalyticApplication: [CalendarTaskWorkFileType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType)<br>The work file is an analytic application. |

|     |
| --- |
| Story |
| staticStory: [CalendarTaskWorkFileType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTaskWorkFileType)<br>The work file is a story. |

C



---

<a name="calendartime"></a>

CalendarTime

can be passed as a JSON object to method arguments

An object representing time

Since

2023.13

Property Summary

|     |
| --- |
| Name and Description |
| [day](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_Pday): integer<br>day |
| [granularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_Pgranularity): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>granularity |
| [halfYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_PhalfYear): integer<br>halfYear |
| [month](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_Pmonth): integer<br>month |
| [quarter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_Pquarter): integer<br>quarter |
| [week](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_Pweek): integer<br>week |
| [year](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTime_Pyear): integer<br>year |

Property Detail

|     |
| --- |
| day |
| day: integer<br>day |

|     |
| --- |
| granularity |
| granularity: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>granularity |

|     |
| --- |
| halfYear |
| halfYear: integer<br>halfYear |

|     |
| --- |
| month |
| month: integer<br>month |

|     |
| --- |
| quarter |
| quarter: integer<br>quarter |

|     |
| --- |
| week |
| week: integer<br>week |

|     |
| --- |
| year |
| year: integer<br>year |

E



---

<a name="calendartimegranularity"></a>

CalendarTimeGranularity

Since

2023.13

Property Summary

|     |
| --- |
| Name and Description |
| static [Day](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity_P_static_Day): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>days |
| static [HalfYear](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity_P_static_HalfYear): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>halfYears |
| static [Month](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity_P_static_Month): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>months |
| static [Quarter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity_P_static_Quarter): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>quarters |
| static [Week](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity_P_static_Week): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>weeks |
| static [Year](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity_P_static_Year): [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>years |

Property Detail

|     |
| --- |
| Day |
| staticDay: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>days |

|     |
| --- |
| HalfYear |
| staticHalfYear: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>halfYears |

|     |
| --- |
| Month |
| staticMonth: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>months |

|     |
| --- |
| Quarter |
| staticQuarter: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>quarters |

|     |
| --- |
| Week |
| staticWeek: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>weeks |

|     |
| --- |
| Year |
| staticYear: [CalendarTimeGranularity](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#CalendarTimeGranularity)<br>years |

Type Library
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)

F

cast

Cast an object to the specified type. For example, you can cast a variable filterValue of type FilterValue to the FilterValue subtype SingleFilterValue to access the SingleFilterValue's value property (note the check whether the object is of the correct target type before the cast operation): if (filterValue.type === FilterValueType.Single) { var singleFilter = cast(Type.SingleFilterValue, filterValue); console.log(singleFilter.value); }.

Since

2020.9

Function Summary

|     |
| --- |
| Name and Description |
| [cast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#cast_Fcast)(type: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type), arg: <any type>): <type of type><br>Cast an object to the specified type. |

Function Detail

|     |     |     |
| --- | --- | --- |
| cast |
| cast(type: [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type), arg: <any type>): <type of type>

Cast an object to the specified type. For example, you can cast a variable filterValue of type FilterValue to the FilterValue subtype SingleFilterValue to access the SingleFilterValue's value property (note the check whether the object is of the correct target type before the cast operation): if (filterValue.type === FilterValueType.Single) { var singleFilter = cast(Type.SingleFilterValue, filterValue); console.log(singleFilter.value); }.

Parameters

|     |     |     |
| --- | --- | --- |
| type: | [Type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Type) |  |
| arg: | <any type> |  |

Returns

<type of type> |

Type Library
[chart](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLchart)

C



---

<a name="planning"></a>

Planning\
\
Since\
\
2019.3\
\
Last Update\
\
2023.20\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getDataLocking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MgetDataLocking)(): [DataLocking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLocking)<br>Returns the Data Locking object of the table. |\
| [getPlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MgetPlanningAreaInfo)(): [PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)<br>Returns the Planning Area Info object that is initialized with the filters applied to the table. |\
| [getPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MgetPrivateVersion)(versionId: string): [PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion)<br>Returns a private version associated with the data source. |\
| [getPrivateVersions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MgetPrivateVersions)(): [PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion)\[\]<br>Returns all private versions associated with the data source. |\
| [getPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MgetPublicVersion)(versionId: string): [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)<br>Returns a public version associated with the data source. |\
| [getPublicVersions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MgetPublicVersions)(): [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)\[\]<br>Returns all public versions associated with the data source. |\
| [isEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MisEnabled)(): boolean<br>Returns whether planning is enabled for the table. |\
| [setEnabled](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MsetEnabled)(enabled: boolean): boolean<br>Enables or disables planning for the table. |\
| [setUserInput](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MsetUserInput)(selectedData: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): boolean<br>Sets a value to data cells. |\
| [submitData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Planning_MsubmitData)(): boolean<br>Submits the data to the server. |\
\
Method Detail\
\
|     |\
| --- |\
| getDataLocking |\
| getDataLocking(): [DataLocking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLocking)<br>Returns the Data Locking object of the table. If the data source associated with the table doesn't support data locking, then undefined is returned.<br>Returns<br>[DataLocking](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DataLocking)<br>Since<br>2019.22 |\
\
|     |\
| --- |\
| getPlanningAreaInfo |\
| getPlanningAreaInfo(): [PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)<br>Returns the Planning Area Info object that is initialized with the filters applied to the table. If the data source associated with the table doesn't support planning, then undefined is returned.<br>Returns<br>[PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)<br>Since<br>2023.20 |\
\
|     |     |     |\
| --- | --- | --- |\
| getPrivateVersion |\
| getPrivateVersion(versionId: string): [PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion)\
\
Returns a private version associated with the data source. If there is no private version with this version ID, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| versionId: | string |  |\
\
Returns\
\
[PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion)\
\
Since\
\
2019.4 |\
\
|     |\
| --- |\
| getPrivateVersions |\
| getPrivateVersions(): [PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion)\[\]<br>Returns all private versions associated with the data source.<br>Returns<br>[PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion)\[\]<br>Since<br>2019.4 |\
\
|     |     |     |\
| --- | --- | --- |\
| getPublicVersion |\
| getPublicVersion(versionId: string): [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)\
\
Returns a public version associated with the data source. If there is no public version with this version ID, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| versionId: | string |  |\
\
Returns\
\
[PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)\
\
Since\
\
2019.4 |\
\
|     |\
| --- |\
| getPublicVersions |\
| getPublicVersions(): [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)\[\]<br>Returns all public versions associated with the data source.<br>Returns<br>[PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)\[\]<br>Since<br>2019.4 |\
\
|     |\
| --- |\
| isEnabled |\
| isEnabled(): boolean<br>Returns whether planning is enabled for the table.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| setEnabled |\
| setEnabled(enabled: boolean): boolean\
\
Enables or disables planning for the table. If this operation was successful, then true is returned (even if you try to enable planning for a table that is already planning-enabled), and false if it wasn't.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| enabled: | boolean |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| setUserInput |\
| setUserInput(selectedData: [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON, value: string): boolean\
\
Sets a value to data cells. The data cells are specified by the selection. The selection references a visible data cell in the rows or columns of the table. If this operation was successful, then true is returned, and false if it wasn't. Note: If this operation wasn't successful, then one of the following could be the cause: The cell is either a fact cell, a calculation cell, or not input-enabled. Note: After calling setUserInput() it's best to immediately submit your input with Planning.submitData(). Otherwise, unexpected results may occur. For example, if other operations are performed in scripts or by user interaction that lead to a refresh of the planning table before submitting your input, then your input may be discarded. Note: When setting a value for a key figure of a BPC model, you can use digits, letters, and special characters in the value.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| selectedData: | [Selection](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Selection) JSON |  |\
| value: | string |  |\
\
Returns\
\
boolean\
\
Since\
\
2019.10 |\
\
|     |\
| --- |\
| submitData |\
| submitData(): boolean<br>Submits the data to the server. If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean<br>Since<br>2019.10 |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="planningareafilter"></a>

PlanningAreaFilter\
\
can be passed as a JSON object to method arguments\
\
Since\
\
2023.20\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [dimension](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter_Pdimension): string |\
| [hierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter_Phierarchy): string |\
| [members](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter_Pmembers): string\[\] |\
| [property](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter_Pproperty): string |\
\
Property Detail\
\
|     |\
| --- |\
| dimension |\
| dimension: string |\
\
|     |\
| --- |\
| hierarchy |\
| hierarchy: string |\
\
|     |\
| --- |\
| members |\
| members: string\[\] |\
\
|     |\
| --- |\
| property |\
| property: string |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="planningareainfo"></a>

PlanningAreaInfo\
\
Since\
\
2023.20\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [changeFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo_MchangeFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, memberInfo: [PlanningAreaMemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaMemberInfo) JSON): [PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)<br>Sets a filter on the dimension. |\
| [getFilters](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo_MgetFilters)(): [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]<br>Returns filters that define the planning area. |\
| [removeFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo_MremoveFilter)(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)<br>Removes any filter that is set on the dimension. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| changeFilter |\
| changeFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON, memberInfo: [PlanningAreaMemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaMemberInfo) JSON): [PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)\
\
Sets a filter on the dimension. Any existing filter on the dimension is overwritten.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
| memberInfo: | [PlanningAreaMemberInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaMemberInfo) JSON |  |\
\
Returns\
\
[PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo) |\
\
|     |\
| --- |\
| getFilters |\
| getFilters(): [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]<br>Returns filters that define the planning area. Filters on Version and Measure dimensions are ignored.<br>Returns<br>[PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\] |\
\
|     |     |     |\
| --- | --- | --- |\
| removeFilter |\
| removeFilter(dimension: string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON): [PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo)\
\
Removes any filter that is set on the dimension.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimension: | string \| [DimensionInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#DimensionInfo) JSON |  |\
\
Returns\
\
[PlanningAreaInfo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaInfo) |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="planningareamemberinfo"></a>

PlanningAreaMemberInfo\
\
can be passed as a JSON object to method arguments\
\
Since\
\
2023.20\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| [hierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaMemberInfo_Phierarchy): string |\
| [members](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaMemberInfo_Pmembers): string\[\] |\
\
Property Detail\
\
|     |\
| --- |\
| hierarchy |\
| hierarchy: string |\
\
|     |\
| --- |\
| members |\
| members: string\[\] |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
E\
\


---

<a name="planningcategory"></a>

PlanningCategory\
\
Since\
\
2019.4\
\
Last Update\
\
2019.7\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Actuals](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory_P_static_Actuals): [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Actuals" category of the SAP Analytic Cloud planning model |\
| static [Budget](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory_P_static_Budget): [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Budget" category of the SAP Analytic Cloud planning model |\
| static [Forecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory_P_static_Forecast): [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Forecast" category of the SAP Analytic Cloud planning model |\
| static [Planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory_P_static_Planning): [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Planning" category of the SAP Analytic Cloud planning model |\
| static [RollingForecast](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory_P_static_RollingForecast): [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Rolling Forecast" category of the SAP Analytic Cloud planning model |\
\
Property Detail\
\
|     |\
| --- |\
| Actuals |\
| staticActuals: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Actuals" category of the SAP Analytic Cloud planning model<br>Since<br>2019.7 |\
\
|     |\
| --- |\
| Budget |\
| staticBudget: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Budget" category of the SAP Analytic Cloud planning model |\
\
|     |\
| --- |\
| Forecast |\
| staticForecast: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Forecast" category of the SAP Analytic Cloud planning model |\
\
|     |\
| --- |\
| Planning |\
| staticPlanning: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Planning" category of the SAP Analytic Cloud planning model |\
\
|     |\
| --- |\
| RollingForecast |\
| staticRollingForecast: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)<br>Predefined "Rolling Forecast" category of the SAP Analytic Cloud planning model |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
E\
\


---

<a name="planningcopyoption"></a>

PlanningCopyOption\
\
Since\
\
2019.7\
\
Last Update\
\
2023.20\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [AllData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption_P_static_AllData): [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>All data is included when copying a version. |\
| static [CustomizedPlanningArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption_P_static_CustomizedPlanningArea): [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>Planning Area with customized filter is included when copying a version. |\
| static [NoData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption_P_static_NoData): [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>All data is excluded when copying a version. |\
| static [PlanningArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption_P_static_PlanningArea): [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>Deprecated This option is deprecated, Planning Area data is included when copying a version. |\
| static [VisibleData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption_P_static_VisibleData): [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>Visible data based on the table is included when copying a version. |\
\
Property Detail\
\
|     |\
| --- |\
| AllData |\
| staticAllData: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>All data is included when copying a version. |\
\
|     |\
| --- |\
| CustomizedPlanningArea |\
| staticCustomizedPlanningArea: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>Planning Area with customized filter is included when copying a version.<br>Since<br>2023.20 |\
\
|     |\
| --- |\
| NoData |\
| staticNoData: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>All data is excluded when copying a version. |\
\
|     |\
| --- |\
| PlanningArea |\
| staticPlanningArea: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption) <br>Deprecated This option is deprecated, Planning Area data is included when copying a version.<br>Since<br>2021.19<br>Deprecated<br>2024.12 |\
\
|     |\
| --- |\
| VisibleData |\
| staticVisibleData: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption)<br>Visible data based on the table is included when copying a version.<br>Since<br>2023.20 |\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodel"></a>

PlanningModel\
\
Since\
\
2020.9\
\
Last Update\
\
2025.7\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [createMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_McreateMembers)(dimensionId: string, members: [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) JSON \| [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON): boolean<br>Creates planning model members. |\
| [deleteMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MdeleteMembers)(dimensionId: string, members: string \| string\[\]): boolean<br>Deletes planning model members. |\
| [getMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MgetMember)(dimensionId: string, memberId: string): [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)<br>Returns a planning model member. |\
| [getMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MgetMembers)(dimensionId: string, options?: [PlanningModelMemberOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions) JSON): [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]<br>Returns planning model members. |\
| [getPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MgetPrivateVersion)(versionId: string): [PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion)<br>Returns a private version associated with the data source. |\
| [getPrivateVersions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MgetPrivateVersions)(): [PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion)\[\]<br>Returns all private versions associated with the data source. |\
| [getPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MgetPublicVersion)(versionId: string): [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)<br>Returns a public version associated with the data source. |\
| [getPublicVersions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MgetPublicVersions)(): [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)\[\]<br>Returns all public versions associated with the data source. |\
| [updateMembers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModel_MupdateMembers)(dimensionId: string, members: [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) JSON \| [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON): boolean<br>Updates planning model members. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| createMembers |\
| createMembers(dimensionId: string, members: [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) JSON \| [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON): boolean\
\
Creates planning model members. If this operation was successful, then true is returned, and false if it wasn't. Note: Currently, this operation supports only generic dimensions. Note: Call DataSource.refreshData() or Application.refreshData() after this operation, if you need the chart or table to reflect the created members in subsequent method calls operating on visible cells or elements of those widgets, for example, Planning.setUserInput(), DataSource.getData(), or DataSource.getPlanning().getState(). Note: Creating a member with the same member ID as an already existing member results in an error.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimensionId: | string |  |\
| members: | [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) JSON \| [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| deleteMembers |\
| deleteMembers(dimensionId: string, members: string \| string\[\]): boolean\
\
Deletes planning model members. If this operation was successful, then true is returned, and false if it wasn't. Note: Currently, this operation supports only generic dimensions. Note: Call DataSource.refreshData() or Application.refreshData() after this operation, if you need the chart or table to reflect the deleted members in subsequent method calls operating on visible cells or elements of those widgets, for example, Planning.setUserInput(), DataSource.getData(), or DataSource.getPlanning().getState().\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimensionId: | string |  |\
| members: | string \| string\[\] |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| getMember |\
| getMember(dimensionId: string, memberId: string): [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\
\
Returns a planning model member. Note: Currently, this operation supports only generic dimensions.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimensionId: | string |  |\
| memberId: | string |  |\
\
Returns\
\
[PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) |\
\
|     |     |     |\
| --- | --- | --- |\
| getMembers |\
| getMembers(dimensionId: string, options?: [PlanningModelMemberOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions) JSON): [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]\
\
Returns planning model members. Note: Currently, this operation supports only generic dimensions. Note: If you specify options, then you can control the returned set of members even finer, for example, the number of returned members (default: 200).\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimensionId: | string |  |\
| optionsOptional: | [PlanningModelMemberOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions) JSON |  |\
\
Returns\
\
[PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\] |\
\
|     |     |     |\
| --- | --- | --- |\
| getPrivateVersion |\
| getPrivateVersion(versionId: string): [PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion)\
\
Returns a private version associated with the data source. If there is no private version with this version ID, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| versionId: | string |  |\
\
Returns\
\
[PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion)\
\
Since\
\
2025.7 |\
\
|     |\
| --- |\
| getPrivateVersions |\
| getPrivateVersions(): [PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion)\[\]<br>Returns all private versions associated with the data source.<br>Returns<br>[PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion)\[\]<br>Since<br>2025.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| getPublicVersion |\
| getPublicVersion(versionId: string): [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)\
\
Returns a public version associated with the data source. If there is no public version with this version ID, then undefined is returned.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| versionId: | string |  |\
\
Returns\
\
[PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)\
\
Since\
\
2025.7 |\
\
|     |\
| --- |\
| getPublicVersions |\
| getPublicVersions(): [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)\[\]<br>Returns all public versions associated with the data source.<br>Returns<br>[PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)\[\]<br>Since<br>2025.7 |\
\
|     |     |     |\
| --- | --- | --- |\
| updateMembers |\
| updateMembers(dimensionId: string, members: [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) JSON \| [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON): boolean\
\
Updates planning model members. If this operation was successful, then true is returned, and false if it wasn't. Note: Currently, this operation supports only generic dimensions. Note: Call DataSource.refreshData() or Application.refreshData() after this operation, if you need the chart or table to reflect the updated members in subsequent method calls operating on visible cells or elements of those widgets, for example, Planning.setUserInput(), DataSource.getData(), or DataSource.getPlanning().getState().\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| dimensionId: | string |  |\
| members: | [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember) JSON \| [PlanningModelMember](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember)\[\]JSON |  |\
\
Returns\
\
boolean |\
\
E\
\


---

<a name="planningmodelcopyoption"></a>

PlanningModelCopyOption\
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
| static [AllData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption_P_static_AllData): [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption)<br>All data is included when copying a version. |\
| static [NoData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption_P_static_NoData): [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption)<br>All data is excluded when copying a version. |\
\
Property Detail\
\
|     |\
| --- |\
| AllData |\
| staticAllData: [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption)<br>All data is included when copying a version. |\
\
|     |\
| --- |\
| NoData |\
| staticNoData: [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption)<br>All data is excluded when copying a version. |\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodelmember"></a>

PlanningModelMember\
\
can be passed as a JSON object to method arguments\
\
An object defining a planning model member\
\
Since\
\
2020.9\
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
| [dataLockingOwners](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_PdataLockingOwners): [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal)\[\]JSON<br>Users and teams who own data locks on the planning model member |\
| [description](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Pdescription): string<br>Description of the planning model member |\
| [hierarchies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Phierarchies): [PlanningModelMemberHierarchies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberHierarchies)<br>Hierarchies of the planning model member. |\
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Pid): string<br>ID of the planning model member |\
| [properties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Pproperties): [PlanningModelMemberProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberProperties)<br>Properties of the planning model member |\
| [readers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Preaders): [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal)\[\]JSON<br>Users and teams who can read the planning model member |\
| [responsible](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Presponsible): [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal) JSON<br>Responsible user for the planning model member |\
| [writers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMember_Pwriters): [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal)\[\]JSON<br>Users and teams who can update the planning model member |\
\
Property Detail\
\
|     |\
| --- |\
| dataLockingOwners |\
| dataLockingOwners: [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal)\[\]JSON<br>Users and teams who own data locks on the planning model member<br>Since<br>2020.13 |\
\
|     |\
| --- |\
| description |\
| description: string<br>Description of the planning model member |\
\
|     |\
| --- |\
| hierarchies |\
| hierarchies: [PlanningModelMemberHierarchies](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberHierarchies)<br>Hierarchies of the planning model member. Here's an example of the structure of the hierarchies object, hierarchies: { MyHierarchyId: { parentId: "HCUST0001", previousSiblingId: "CUST0007" } }. In this example, "MyHierarchyId" represents the ID of the hierarchy in your model. |\
\
|     |\
| --- |\
| id |\
| id: string<br>ID of the planning model member |\
\
|     |\
| --- |\
| properties |\
| properties: [PlanningModelMemberProperties](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberProperties)<br>Properties of the planning model member |\
\
|     |\
| --- |\
| readers |\
| readers: [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal)\[\]JSON<br>Users and teams who can read the planning model member |\
\
|     |\
| --- |\
| responsible |\
| responsible: [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal) JSON<br>Responsible user for the planning model member<br>Since<br>2020.13 |\
\
|     |\
| --- |\
| writers |\
| writers: [PlanningModelMemberPrincipal](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal)\[\]JSON<br>Users and teams who can update the planning model member |\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodelmemberhierarchies"></a>

PlanningModelMemberHierarchies\
\
is an object< [PlanningModelMemberHierarchy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberHierarchy) >\
\
Hierarchies of the planning model member. Here's an example of the structure of the hierarchies object, hierarchies: { MyHierarchyId: { parentId: "HCUST0001", previousSiblingId: "CUST0007" } }. In this example, "MyHierarchyId" represents the ID of the hierarchy in your model.\
\
Since\
\
2020.9\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodelmemberhierarchy"></a>

PlanningModelMemberHierarchy\
\
can be passed as a JSON object to method arguments\
\
An object defining a planning model member hierarchy\
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
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberHierarchy_PparentId): string<br>Parent ID of a planning model member hierarchy |\
| [previousSiblingId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberHierarchy_PpreviousSiblingId): string<br>Previous sibling ID of a planning model member hierarchy. |\
\
Property Detail\
\
|     |\
| --- |\
| parentId |\
| parentId: string<br>Parent ID of a planning model member hierarchy |\
\
|     |\
| --- |\
| previousSiblingId |\
| previousSiblingId: string<br>Previous sibling ID of a planning model member hierarchy. The planning model member is inserted after the specified sibling. If previousSiblingId is an empty string (""), then the planning model member is inserted as the first sibling. If the property previousSiblingId is omitted, then the planning model member is appended as the last sibling. |\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodelmemberoptions"></a>

PlanningModelMemberOptions\
\
can be passed as a JSON object to method arguments\
\
An object specifiying planning model members\
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
| [hierarchyId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions_PhierarchyId): string<br>Hierarchy ID |\
| [limit](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions_Plimit): integer<br>Maximum number of returned members. |\
| [offset](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions_Poffset): integer<br>Number of members to skip before starting to read members |\
| [parentId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberOptions_PparentId): string<br>Parent ID |\
\
Property Detail\
\
|     |\
| --- |\
| hierarchyId |\
| hierarchyId: string<br>Hierarchy ID |\
\
|     |\
| --- |\
| limit |\
| limit: integer<br>Maximum number of returned members. It must be zero or a positive number. If the limit isn't specified or invalid, then the default value is used (default: 200). |\
\
|     |\
| --- |\
| offset |\
| offset: integer<br>Number of members to skip before starting to read members |\
\
|     |\
| --- |\
| parentId |\
| parentId: string<br>Parent ID |\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodelmemberprincipal"></a>

PlanningModelMemberPrincipal\
\
can be passed as a JSON object to method arguments\
\
An object defining a user or a team who has certain access to a planning model member\
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
| [id](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal_Pid): string<br>ID of a user or a team that has certain access to a planning model member |\
| [type](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelMemberPrincipal_Ptype): [UserType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType)<br>Type of a user or a team who has certain access to a planning model member |\
\
Property Detail\
\
|     |\
| --- |\
| id |\
| id: string<br>ID of a user or a team that has certain access to a planning model member |\
\
|     |\
| --- |\
| type |\
| type: [UserType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#UserType)<br>Type of a user or a team who has certain access to a planning model member |\
\
Type Library\
[planning-model](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning-model)\
\
C\
\


---

<a name="planningmodelmemberproperties"></a>

PlanningModelMemberProperties\
\
is an object<string>\
\
Properties of a planning model member\
\
Since\
\
2020.9\
\
C\
\


---

<a name="planningmodelprivateversion"></a>

PlanningModelPrivateVersion\
\
extends [PlanningModelVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion)\
\
Since\
\
2025.7\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getOwnerId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion_MgetOwnerId)(): string<br>Returns the user ID of the user who created this private version. |\
| [publish](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion_Mpublish)(targetVersion?: [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion), updateChangedDataOnly?: boolean, publishOptions?: [PrivateVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions) JSON): boolean<br>Creates a public version from this private version. |\
| [publishAs](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion_MpublishAs)(newVersionName: string, versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean<br>Creates a public version with the specified name from this private version. |\
\
|     |\
| --- |\
| Inherited from [PlanningModelVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion) |\
| [copy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mcopy), [deleteVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MdeleteVersion), [getDisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MgetDisplayId), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MgetId), [redo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mredo), [undo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mundo) |\
\
Method Detail\
\
|     |\
| --- |\
| getOwnerId |\
| getOwnerId(): string<br>Returns the user ID of the user who created this private version.<br>Returns<br>string |\
\
|     |     |     |\
| --- | --- | --- |\
| publish |\
| publish(targetVersion?: [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion), updateChangedDataOnly?: boolean, publishOptions?: [PrivateVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions) JSON): boolean\
\
Creates a public version from this private version. If a public target version is specified, then updateChangedDataOnly specifies whether to update only data that was changed or to update all valid member combinations (default: false). If no public target version is specified, then the original public version is overwritten that was used when the private version was created. If the public target version is unrelated to the private version and updateChangedDataOnly is false, then the private version overwrites the public target version. If the public target version is unrelated to the private version and updateChangedDataOnly is true, then only the changed data is published to the public target version. If this operation was successful, then this private version is deleted.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| targetVersionOptional: | [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion) |  |\
| updateChangedDataOnlyOptional: | boolean |  |\
| publishOptionsOptional: | [PrivateVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions) JSON |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| publishAs |\
| publishAs(newVersionName: string, versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean\
\
Creates a public version with the specified name from this private version. If no category is specified, then the category of the private version is used for the new public version. If this operation was successful, then this private version is deleted.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| newVersionName: | string |  |\
| versionCategoryOptional: | [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory) |  |\
\
Returns\
\
boolean |\
\
E\
\


---

<a name="planningmodelpubliceditoption"></a>

PlanningModelPublicEditOption\
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
| static [AllData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption_P_static_AllData): [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption)<br>All data is included when starting edit version. |\
| static [PlanningArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption_P_static_PlanningArea): [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption)<br>Planning Area data is included when starting edit version. |\
\
Property Detail\
\
|     |\
| --- |\
| AllData |\
| staticAllData: [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption)<br>All data is included when starting edit version. |\
\
|     |\
| --- |\
| PlanningArea |\
| staticPlanningArea: [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption)<br>Planning Area data is included when starting edit version. |\
\
C\
\


---

<a name="planningmodelpublicversion"></a>

PlanningModelPublicVersion\
\
extends [PlanningModelVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion)\
\
Since\
\
2025.7\
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
| [isDirty](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion_MisDirty)(): boolean<br>Returns whether this version has been modified and can be published or reverted. |\
| [publish](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion_Mpublish)(publishOptions?: [PublicVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions) JSON): boolean<br>Publishes the modifications applied by the user. |\
| [revert](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion_Mrevert)(): boolean<br>Reverts the modifications applied by the user. |\
| [startEditMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion_MstartEditMode)(planningPublicEditOption: [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption)): boolean<br>Starts the edit mode for public version. |\
| [updateProperty](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion_MupdateProperty)(propertyName: string, propertyValue: string \| [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean<br>Updates the property of this version. |\
\
|     |\
| --- |\
| Inherited from [PlanningModelVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion) |\
| [copy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mcopy), [deleteVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MdeleteVersion), [getDisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MgetDisplayId), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MgetId), [redo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mredo), [undo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mundo) |\
\
Method Detail\
\
|     |\
| --- |\
| isDirty |\
| isDirty(): boolean<br>Returns whether this version has been modified and can be published or reverted.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| publish |\
| publish(publishOptions?: [PublicVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions) JSON): boolean\
\
Publishes the modifications applied by the user. If this operation was successful, then true is returned, and false if it wasn't. Note: Before publishing, check with PlanningModelPublicVersion.isDirty() if there are modifications available that can be published. When there're conflicting changes, if the related parameter isn't specified, the user's changes overwrite the other ones.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| publishOptionsOptional: | [PublicVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions) JSON |  |\
\
Returns\
\
boolean |\
\
|     |\
| --- |\
| revert |\
| revert(): boolean<br>Reverts the modifications applied by the user. If this operation was successful, then true is returned, and false if it wasn't. Note: Before reverting, check with PlanningModelPublicVersion.isDirty() if there are modifications available that can be reverted.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| startEditMode |\
| startEditMode(planningPublicEditOption: [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption)): boolean\
\
Starts the edit mode for public version. If this operation was successful, then true is returned, and false if it wasn't. Note: Before starting edit mode, check with PlanningModelPublicVersion.isDirty() to false.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| planningPublicEditOption: | [PlanningModelPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicEditOption) |  |\
\
Returns\
\
boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| updateProperty |\
| updateProperty(propertyName: string, propertyValue: string \| [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean\
\
Updates the property of this version. If this operation was successful, then true is returned, and false if it wasn't.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| propertyName: | string |  |\
| propertyValue: | string \| [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory) |  |\
\
Returns\
\
boolean\
\
Since\
\
2025.13 |\
\
C\
\


---

<a name="planningmodelversion"></a>

PlanningModelVersion\
\
is abstract\
\
Direct Subclasses\
\
[PlanningModelPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPrivateVersion), [PlanningModelPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelPublicVersion)\
\
Since\
\
2025.7\
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
| [copy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mcopy)(newVersionName: string, planningCopyOption: [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption), versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean<br>Creates a private copy of this version. |\
| [deleteVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MdeleteVersion)(): boolean<br>Deletes this version. |\
| [getDisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MgetDisplayId)(): string<br>Returns the display ID of this version. |\
| [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_MgetId)(): string<br>Returns the ID of this version. |\
| [redo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mredo)(): boolean<br>Redoes changes to the version. |\
| [undo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelVersion_Mundo)(): boolean<br>Undoes changes to the version. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| copy |\
| copy(newVersionName: string, planningCopyOption: [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption), versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean\
\
Creates a private copy of this version. If this operation was successful, then true is returned, and false if it wasn't.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| newVersionName: | string |  |\
| planningCopyOption: | [PlanningModelCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningModelCopyOption) |  |\
| versionCategoryOptional: | [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory) |  |\
\
Returns\
\
boolean |\
\
|     |\
| --- |\
| deleteVersion |\
| deleteVersion(): boolean<br>Deletes this version. If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |\
\
|     |\
| --- |\
| getDisplayId |\
| getDisplayId(): string<br>Returns the display ID of this version. You can use it, for example, to display the version in dropdowns or texts.<br>Returns<br>string |\
\
|     |\
| --- |\
| getId |\
| getId(): string<br>Returns the ID of this version. You can use it, for example, when calling DataSource.getData().<br>Returns<br>string |\
\
|     |\
| --- |\
| redo |\
| redo(): boolean<br>Redoes changes to the version. If the operation is successful, then "true" is returned, and "false" if it isn't.<br>Returns<br>boolean<br>Since<br>2025.13 |\
\
|     |\
| --- |\
| undo |\
| undo(): boolean<br>Undoes changes to the version. If the operation is successful, then "true" is returned, and "false" if it isn't.<br>Returns<br>boolean<br>Since<br>2025.13 |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="planningprivateversion"></a>

PlanningPrivateVersion\
\
extends [PlanningVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion)\
\
Since\
\
2019.4\
\
Last Update\
\
2023.15\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [getOwnerId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion_MgetOwnerId)(): string<br>Returns the user ID of the user who created this private version. |\
| [publish](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion_Mpublish)(targetVersion?: [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion), updateChangedDataOnly?: boolean, publishOptions?: [PrivateVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions) JSON): boolean<br>Creates a public version from this private version. |\
| [publishAs](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion_MpublishAs)(newVersionName: string, versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean<br>Creates a public version with the specified name from this private version. |\
\
|     |\
| --- |\
| Inherited from [PlanningVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion) |\
| [copy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mcopy), [deleteVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MdeleteVersion), [getDisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MgetDisplayId), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MgetId), [redo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mredo), [undo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mundo) |\
\
Method Detail\
\
|     |\
| --- |\
| getOwnerId |\
| getOwnerId(): string<br>Returns the user ID of the user who created this private version.<br>Returns<br>string<br>Since<br>2019.8 |\
\
|     |     |     |\
| --- | --- | --- |\
| publish |\
| publish(targetVersion?: [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion), updateChangedDataOnly?: boolean, publishOptions?: [PrivateVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions) JSON): boolean\
\
Creates a public version from this private version. If a public target version is specified, then updateChangedDataOnly specifies whether to update only data that was changed or to update all valid member combinations (default: false). If no public target version is specified, then the original public version is overwritten that was used when the private version was created. If the public target version is unrelated to the private version and updateChangedDataOnly is false, then the private version overwrites the public target version. If the public target version is unrelated to the private version and updateChangedDataOnly is true, then only the changed data is published to the public target version. If this operation was successful, then this private version is deleted.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| targetVersionOptional: | [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion) |  |\
| updateChangedDataOnlyOptional: | boolean |  |\
| publishOptionsOptional: | [PrivateVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PrivateVersionPublishOptions) JSON |  |\
\
Returns\
\
boolean\
\
Last Update\
\
2023.15 |\
\
|     |     |     |\
| --- | --- | --- |\
| publishAs |\
| publishAs(newVersionName: string, versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory)): boolean\
\
Creates a public version with the specified name from this private version. If no category is specified, then the category of the private version is used for the new public version. If this operation was successful, then this private version is deleted.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| newVersionName: | string |  |\
| versionCategoryOptional: | [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory) |  |\
\
Returns\
\
boolean |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
E\
\


---

<a name="planningpubliceditoption"></a>

PlanningPublicEditOption\
\
Since\
\
2023.20\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [AllData](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption_P_static_AllData): [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>All data is included when starting edit version. |\
| static [CustomizedPlanningArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption_P_static_CustomizedPlanningArea): [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>Planning Area with customized filter is included when starting edit version. |\
| static [PlanningArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption_P_static_PlanningArea): [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>Planning Area data is included when starting edit version. |\
| static [TableContextWithPlanningArea](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption_P_static_TableContextWithPlanningArea): [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>Table context with Planning Area is included when starting edit version. |\
\
Property Detail\
\
|     |\
| --- |\
| AllData |\
| staticAllData: [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>All data is included when starting edit version. |\
\
|     |\
| --- |\
| CustomizedPlanningArea |\
| staticCustomizedPlanningArea: [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>Planning Area with customized filter is included when starting edit version. |\
\
|     |\
| --- |\
| PlanningArea |\
| staticPlanningArea: [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>Planning Area data is included when starting edit version. |\
\
|     |\
| --- |\
| TableContextWithPlanningArea |\
| staticTableContextWithPlanningArea: [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption)<br>Table context with Planning Area is included when starting edit version. |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="planningpublicversion"></a>

PlanningPublicVersion\
\
extends [PlanningVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion)\
\
Since\
\
2019.4\
\
Last Update\
\
2024.12\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| [isDirty](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion_MisDirty)(): boolean<br>Returns whether this version has been modified and can be published or reverted. |\
| [publish](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion_Mpublish)(publishOptions?: [PublicVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions) JSON): boolean<br>Publishes the modifications applied by the user. |\
| [revert](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion_Mrevert)(): boolean<br>Reverts the modifications applied by the user. |\
| [startEditMode](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion_MstartEditMode)(planningPublicEditOption: [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption), planningAreaFilter?: [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]JSON): boolean<br>Starts the edit mode for public version. |\
\
|     |\
| --- |\
| Inherited from [PlanningVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion) |\
| [copy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mcopy), [deleteVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MdeleteVersion), [getDisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MgetDisplayId), [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MgetId), [redo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mredo), [undo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mundo) |\
\
Method Detail\
\
|     |\
| --- |\
| isDirty |\
| isDirty(): boolean<br>Returns whether this version has been modified and can be published or reverted.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| publish |\
| publish(publishOptions?: [PublicVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions) JSON): boolean\
\
Publishes the modifications applied by the user. If this operation was successful, then true is returned, and false if it wasn't. Note: Before publishing, check with PlanningPublicVersion.isDirty() if there are modifications available that can be published. When there're conflicting changes, if the related parameter isn't specified, the user's changes overwrite the other ones.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| publishOptionsOptional: | [PublicVersionPublishOptions](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PublicVersionPublishOptions) JSON |  |\
\
Returns\
\
boolean\
\
Last Update\
\
2023.15 |\
\
|     |\
| --- |\
| revert |\
| revert(): boolean<br>Reverts the modifications applied by the user. If this operation was successful, then true is returned, and false if it wasn't. Note: Before reverting, check with PlanningPublicVersion.isDirty() if there are modifications available that can be reverted.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| startEditMode |\
| startEditMode(planningPublicEditOption: [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption), planningAreaFilter?: [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]JSON): boolean\
\
Starts the edit mode for public version. If this operation was successful, then true is returned, and false if it wasn't. Note: Before starting edit mode, check with PlanningPublicVersion.isDirty() to false.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| planningPublicEditOption: | [PlanningPublicEditOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicEditOption) |  |\
| planningAreaFilterOptional: | [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]JSON |  |\
\
Returns\
\
boolean\
\
Since\
\
2024.12 |\
\
Type Library\
[planning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLplanning)\
\
C\
\


---

<a name="planningversion"></a>

PlanningVersion\
\
is abstract\
\
Direct Subclasses\
\
[PlanningPrivateVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPrivateVersion), [PlanningPublicVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningPublicVersion)\
\
Since\
\
2019.4\
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
| [copy](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mcopy)(newVersionName: string, planningCopyOption: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption), versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory), planningAreaFilter?: [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]JSON, hideUnbooked?: boolean): boolean<br>Creates a private copy of this version. |\
| [deleteVersion](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MdeleteVersion)(): boolean<br>Deletes this version. |\
| [getDisplayId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MgetDisplayId)(): string<br>Returns the display ID of this version. |\
| [getId](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_MgetId)(): string<br>Returns the ID of this version. |\
| [redo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mredo)(): boolean<br>Redoes changes to the version. |\
| [undo](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningVersion_Mundo)(): boolean<br>Undoes changes to the version. |\
\
Method Detail\
\
|     |     |     |\
| --- | --- | --- |\
| copy |\
| copy(newVersionName: string, planningCopyOption: [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption), versionCategory?: [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory), planningAreaFilter?: [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]JSON, hideUnbooked?: boolean): boolean\
\
Creates a private copy of this version. If this operation was successful, then true is returned, and false if it wasn't.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| newVersionName: | string |  |\
| planningCopyOption: | [PlanningCopyOption](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCopyOption) |  |\
| versionCategoryOptional: | [PlanningCategory](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningCategory) |  |\
| planningAreaFilterOptional: | [PlanningAreaFilter](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#PlanningAreaFilter)\[\]JSON |  |\
| hideUnbookedOptional: | boolean |  |\
\
Returns\
\
boolean\
\
Since\
\
2019.7\
\
Last Update\
\
2025.12 |\
\
|     |\
| --- |\
| deleteVersion |\
| deleteVersion(): boolean<br>Deletes this version. If this operation was successful, then true is returned, and false if it wasn't.<br>Returns<br>boolean |\
\
|     |\
| --- |\
| getDisplayId |\
| getDisplayId(): string<br>Returns the display ID of this version. You can use it, for example, to display the version in dropdowns or texts.<br>Returns<br>string<br>Since<br>2019.5 |\
\
|     |\
| --- |\
| getId |\
| getId(): string<br>Returns the ID of this version. You can use it, for example, when calling DataSource.getData().<br>Returns<br>string |\
\
|     |\
| --- |\
| redo |\
| redo(): boolean<br>Redoes changes to the version. If the operation is successful, then "true" is returned, and "false" if it isn't.<br>Returns<br>boolean<br>Since<br>2025.13 |\
\
|     |\
| --- |\
| undo |\
| undo(): boolean<br>Undoes changes to the version. If the operation is successful, then "true" is returned, and "false" if it isn't.<br>Returns<br>boolean<br>Since<br>2025.13 |\
\
Type Library\
[containers](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLcontainers)\
\
C\
\


---

<a name="scheduling"></a>

Scheduling\
\
Since\
\
2020.3\
\
Last Update\
\
2021.16\
\
Method Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [isRunBySchedulePublication](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Scheduling_M_static_isRunBySchedulePublication)(): boolean<br>Returns whether the analytic application is run by scheduling. |\
| static [logMessage](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Scheduling_M_static_logMessage)(messageType: [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType), messageText: string): void<br>Log a message in the scheduling status details. |\
| static [openSubscriptionDialog](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Scheduling_M_static_openSubscriptionDialog)(): void<br>Opens the scheduling subscription dialog. |\
| static [publish](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#Scheduling_M_static_publish)(): boolean<br>Triggers the scheduling of an export in manual mode. |\
\
Method Detail\
\
|     |\
| --- |\
| isRunBySchedulePublication |\
| staticisRunBySchedulePublication(): boolean<br>Returns whether the analytic application is run by scheduling.<br>Returns<br>boolean |\
\
|     |     |     |\
| --- | --- | --- |\
| logMessage |\
| staticlogMessage(messageType: [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType), messageText: string): void\
\
Log a message in the scheduling status details.\
\
Parameters\
\
|     |     |     |\
| --- | --- | --- |\
| messageType: | [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType) |  |\
| messageText: | string |  |\
\
Since\
\
2020.17 |\
\
|     |\
| --- |\
| openSubscriptionDialog |\
| staticopenSubscriptionDialog(): void<br>Opens the scheduling subscription dialog.<br>Mobile Support<br>Not supported on mobile devices.<br>Since<br>2021.16 |\
\
|     |\
| --- |\
| publish |\
| staticpublish(): boolean<br>Triggers the scheduling of an export in manual mode.<br>Returns<br>boolean |\
\
Type Library\
[standard](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLstandard)\
\
E\
\


---

<a name="schedulingmessagetype"></a>

SchedulingMessageType\
\
Since\
\
2020.17\
\
Property Summary\
\
|     |\
| --- |\
| Name and Description |\
| static [Error](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType_P_static_Error): [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType)<br>Error message |\
| static [Info](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType_P_static_Info): [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType)<br>Information message |\
| static [Warning](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType_P_static_Warning): [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType)<br>Warning message |\
\
Property Detail\
\
|     |\
| --- |\
| Error |\
| staticError: [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType)<br>Error message |\
\
|     |\
| --- |\
| Info |\
| staticInfo: [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType)<br>Information message |\
\
|     |\
| --- |\
| Warning |\
| staticWarning: [SchedulingMessageType](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#SchedulingMessageType)<br>Warning message |\
\
Type Library\
[search-to-insight](https://help.sap.com/doc/1639cb9ccaa54b2592224df577abe822/release/en-US/index.html#typelibraries_TLsearch-to-insight)\
\
C\
\


---

