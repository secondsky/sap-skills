# SAP Analytics Cloud - Planning Workflows and Calendar Reference

**Source**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/af4b7e39edd249d3b59fa7d4ab110a7a.html
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Calendar Overview](#calendar-overview)
2. [Planning Processes](#planning-processes)
3. [Task Types](#task-types)
4. [Multi-Level Approvals](#multi-level-approvals)
5. [Data Locking Integration](#data-locking-integration)
6. [Task Dependencies](#task-dependencies)
7. [Notifications and Collaboration](#notifications-and-collaboration)
8. [Best Practices](#best-practices)

---

## Calendar Overview

The SAP Analytics Cloud calendar organizes collaborative planning workflows, structures planning processes, and monitors progress across teams.

### Accessing Calendar

1. Main Menu → **Calendar**
2. Or via direct URL: `https://<tenant>/calendar`

### Calendar Views

| View | Description |
|------|-------------|
| **Calendar View** | Traditional calendar grid (day/week/month) |
| **List View** | Task list with details |
| **Gantt View** | Timeline with dependencies |

### Key Capabilities

- Create and manage planning processes
- Assign tasks to users and teams
- Track completion status
- Configure automatic notifications
- Schedule data actions and multi actions
- Integrate data locking with workflows

---

## Planning Processes

A planning process is a container for related tasks that make up a complete planning cycle.

### Creating a Planning Process

1. Open Calendar
2. Click **Create** → **Planning Process**
3. Configure:
   - Name and description
   - Start and end dates
   - Owner and participants
4. Add tasks to the process

### Process Properties

| Property | Description |
|----------|-------------|
| Name | Descriptive name |
| Description | Detailed explanation |
| Start Date | Process begins |
| End Date | Process must complete |
| Owner | Responsible user |
| State | Draft, Active, Completed, Cancelled |

### Process Lifecycle

```
Draft → Active → Running → Completed
                     ↓
                 Cancelled
```

### Activating a Process

- **Manual**: Click "Activate" when ready
- **Automatic**: Activates on start date
- **Dependencies**: Activates when predecessor completes

---

## Task Types

### 1. General Task

Standard work assignment for data entry or other activities.

**Configuration**:
```
Name: Q1 Budget Entry
Description: Enter Q1 budget for your region
Assignees: Regional Managers (multiple)
Due Date: 2025-01-31
Work File: Budget_Entry_Story
Data Context: Filter to assignee's region
```

**Features**:
- Multiple assignees
- Work file attachment (story or application)
- Data context filtering
- Progress tracking per assignee

**Assignee Actions**:
1. Open task from notification or calendar
2. Click "Open Work File"
3. Enter/modify data
4. Click "Submit" when complete

### 2. Review Task

Approval workflow for reviewing submitted work.

**Configuration**:
```
Name: Finance Review Q1 Budget
Description: Review and approve regional budgets
Reviewers: Finance Director
Predecessor: Q1 Budget Entry task
Action on Completion: Trigger data locking
```

**Reviewer Actions**:
- **Approve**: Accept submission, move to next step
- **Reject**: Return to assignee with comments

**After Rejection**:
1. Assignee notified
2. Task returns to "In Progress"
3. Assignee revises and resubmits
4. Reviewer notified for re-review

### 3. Composite Task

Combined general task and review in single configuration.

**Use Cases**:
- Simple single-level approval
- When general task and review have same timeline
- Streamlined configuration

**Configuration**:
```
Name: Departmental Budget Approval
Assignees: Department Heads
Reviewer: CFO
Driving Dimension: Department
Due Date: 2025-02-15
```

**Driving Dimension**:
- Automatically creates sub-tasks per member
- Each department head sees only their data
- Consolidated review for approver

### 4. Data Locking Task

Scheduled data lock state changes.

**Configuration**:
```
Name: Lock Q1 Budget
Model: Finance_Planning_Model
Data Slice:
  Version: Budget
  Year: 2025
  Quarter: Q1
Target State: Locked
Trigger: On predecessor approval
```

**Lock States**:
- **Open**: Anyone with access can edit
- **Restricted**: Only owner can edit
- **Locked**: No edits allowed

### 5. Data Action Task

Scheduled execution of data actions.

**Configuration**:
```
Name: Run Budget Allocation
Data Action: Overhead_Allocation
Parameters:
  Version: Budget
  Year: 2025
Schedule: After Budget Entry approval
```

### 6. Multi Action Task

Scheduled execution of multi actions.

**Configuration**:
```
Name: Complete Planning Cycle
Multi Action: Annual_Planning_Workflow
Parameters:
  Planning_Cycle: 2025
Trigger: Process end date
```

---

## Multi-Level Approvals

Implement hierarchical approval workflows using sequential review tasks.

### Configuration Steps

1. **Create General Task** for data entry
2. **Add Review Task Round 1** (first level approver)
   - Set predecessor: General Task
3. **Add Review Task Round 2** (second level approver)
   - Set predecessor: Review Task Round 1
4. **Continue** for additional levels

### Example: 3-Level Approval

```
┌─────────────────────────────────────────┐
│ General Task: Regional Budget Entry     │
│ Assignees: Regional Planners            │
└─────────────────┬───────────────────────┘
                  │ Submit
                  ▼
┌─────────────────────────────────────────┐
│ Review Task Round 1: Regional Review    │
│ Reviewers: Regional Managers            │
└─────────────────┬───────────────────────┘
                  │ Approve
                  ▼
┌─────────────────────────────────────────┐
│ Review Task Round 2: Corporate Review   │
│ Reviewers: Finance Director             │
└─────────────────┬───────────────────────┘
                  │ Approve
                  ▼
┌─────────────────────────────────────────┐
│ Review Task Round 3: Executive Approval │
│ Reviewers: CFO                          │
└─────────────────┬───────────────────────┘
                  │ Approve
                  ▼
┌─────────────────────────────────────────┐
│ Data Locking Task: Lock Approved Budget │
└─────────────────────────────────────────┘
```

### Rejection Flow

```
Round 2 Rejects
      ↓
Round 1 Reviewer notified (optional)
      ↓
Assignee notified, task reopened
      ↓
Assignee revises data
      ↓
Resubmit through all approval levels
```

### Configuration Options

| Option | Description |
|--------|-------------|
| Skip on Rejection | Allow later approver to override earlier rejection |
| Auto-Approve | Automatically approve if no action in X days |
| Escalation | Notify manager if task overdue |

---

## Data Locking Integration

### Manual Data Locking via Story

```javascript
// Check lock state
var dataLocking = Table_1.getPlanning().getDataLocking();
var selection = Table_1.getSelections()[0];
var state = dataLocking.getState(selection);

// Set lock state (owner only)
if (state === DataLockingState.Open) {
    dataLocking.setState(selection, DataLockingState.Locked);
}
```

### Calendar Data Locking Task

**Trigger Types**:
- **Scheduled**: Specific date/time
- **Event-Based**: After task completion
- **Manual**: User clicks "Submit"

**Configuration Example**:
```
Task: Lock Regional Plans
Trigger: After "Regional Review" approval
Model: Finance_Model
Data Slice:
  Version: Budget_2025
  Region: [Assignee's Region]
Target State: Locked
Owner Transfer: Yes (to Finance Director)
```

### Multi Action Data Locking Step

Include data locking in automated workflows:

```
Multi Action: Close_Planning_Cycle
Steps:
  1. Publish Budget version
  2. Run consolidation data action
  3. Lock Budget version
  4. Send notification via API step
```

### Data Locking Best Practices

1. **Lock progressively** - Lock completed regions while others work
2. **Use restricted state** - Allow corrections before final lock
3. **Assign owners** - Enable self-service lock management
4. **Event-based triggers** - Automate locking after approvals
5. **Document unlock process** - Define who can unlock and when

---

## Task Dependencies

### Dependency Types

| Type | Behavior |
|------|----------|
| **Finish-to-Start** | Task B starts when Task A finishes |
| **Start-to-Start** | Task B starts when Task A starts |
| **Finish-to-Finish** | Task B finishes when Task A finishes |

### Configuring Dependencies

1. Open task in edit mode
2. Go to **Dependencies** section
3. Select predecessor task
4. Choose dependency type
5. Set lag time (optional)

### Automatic Activation

When a task has dependencies:
- Remains inactive until predecessor completes
- Automatically activates on predecessor completion
- Assignees receive notification

### Example: Dependent Task Chain

```
Budget Planning Process (2025-01-01 to 2025-03-31)

Task 1: Load Actuals (Data Import)
  Start: 2025-01-02
  Duration: 1 day

Task 2: Regional Budget Entry
  Start: After Task 1 (Finish-to-Start)
  Duration: 14 days

Task 3: Corporate Review
  Start: After Task 2 (Finish-to-Start)
  Duration: 5 days

Task 4: Executive Approval
  Start: After Task 3 (Finish-to-Start)
  Duration: 3 days

Task 5: Lock and Archive
  Start: After Task 4 (Finish-to-Start)
  Duration: 1 day
```

---

## Notifications and Collaboration

### Notification Types

| Event | Recipients | Channel |
|-------|------------|---------|
| Task Assigned | Assignees | Email, In-app |
| Task Due Soon | Assignees | Email |
| Task Overdue | Assignees, Owner | Email |
| Submission Received | Reviewers | Email, In-app |
| Approved | Assignees | Email, In-app |
| Rejected | Assignees | Email, In-app |
| Process Complete | Owner | Email |

### Configuring Notifications

1. Open process or task settings
2. Go to **Notifications** tab
3. Enable/disable notification types
4. Set reminder schedules

### Discussion Feature

Collaborate directly within calendar:

1. Open task or process
2. Click **Open Discussion**
3. Start conversation with @mentions
4. All participants can view and respond

### Status Updates

Track progress with status indicators:

| Status | Icon | Meaning |
|--------|------|---------|
| Not Started | ○ | Task inactive or not begun |
| In Progress | ◐ | Work underway |
| Submitted | ◑ | Awaiting review |
| Approved | ● | Completed successfully |
| Rejected | ✕ | Returned for revision |
| Overdue | ⚠ | Past due date |

---

## Best Practices

### Process Design

1. **Start simple** - Begin with linear workflows
2. **Test thoroughly** - Run pilot before full deployment
3. **Document clearly** - Detailed task descriptions
4. **Set realistic timelines** - Include buffer for delays

### Task Configuration

1. **Clear ownership** - One owner per task
2. **Appropriate assignees** - Match to data access
3. **Helpful work files** - Pre-configure filters
4. **Meaningful names** - Describe the action

### Approval Workflows

1. **Minimize levels** - Each level adds time
2. **Parallel when possible** - Review different data simultaneously
3. **Clear rejection criteria** - What requires rejection
4. **Escalation paths** - Handle non-responsive reviewers

### Data Locking

1. **Plan lock schedule** - Know when data closes
2. **Communicate clearly** - Inform users of deadlines
3. **Emergency unlock process** - Define for corrections
4. **Audit trail** - Track lock changes

### Performance

1. **Stagger task starts** - Avoid system overload
2. **Limit concurrent users** - On complex stories
3. **Background data actions** - For long-running operations
4. **Monitor process health** - Check for bottlenecks

---

## Example: Complete Annual Budget Process

### Process: Annual Budget 2025

**Duration**: January 1 - March 15

### Phase 1: Preparation (Jan 1-7)

**Task 1.1**: Load Prior Year Actuals
- Type: Data Import Task
- Assignee: System Admin
- Duration: 1 day

**Task 1.2**: Initialize Budget Versions
- Type: Multi Action Task
- Action: Create_Budget_Versions
- Predecessor: Task 1.1

### Phase 2: Data Entry (Jan 8-31)

**Task 2.1**: Departmental Budget Entry
- Type: Composite Task
- Driving Dimension: Department
- Assignees: Department Heads
- Reviewer: Finance Manager
- Work File: Budget_Entry_Story
- Duration: 3 weeks

### Phase 3: Review (Feb 1-21)

**Task 3.1**: Finance Review
- Type: Review Task
- Reviewer: Finance Director
- Predecessor: Task 2.1
- Duration: 1 week

**Task 3.2**: Executive Review
- Type: Review Task
- Reviewer: CFO
- Predecessor: Task 3.1
- Duration: 1 week

### Phase 4: Finalization (Feb 22 - Mar 15)

**Task 4.1**: Lock Budget Data
- Type: Data Locking Task
- Trigger: After Task 3.2 approval
- State: Locked

**Task 4.2**: Generate Reports
- Type: General Task
- Assignee: Finance Analyst
- Predecessor: Task 4.1

**Task 4.3**: Board Presentation
- Type: General Task
- Assignee: CFO
- Due: March 15

---

**Documentation Links**:
- Calendar Overview: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/af4b7e39edd249d3b59fa7d4ab110a7a.html
- Multi-Level Approval: https://blogs.sap.com/2020/07/10/multi-level-approval-in-sac-using-calendar-tasks/
- Data Locking: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/e07d46e950794d5a928a9b16d1394de6.html
- Workflow Planning: https://blogs.sap.com/2022/04/13/sap-analytics-cloud-workflow-planning/
