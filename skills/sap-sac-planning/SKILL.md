---
name: sap-sac-planning
description: |
  This skill should be used when developing SAP Analytics Cloud (SAC) planning applications, including building planning-enabled stories, analytics designer applications with planning functionality, data actions, multi actions, version management, and planning workflows. Use when creating planning models, implementing data entry forms, configuring spreading/distribution/allocation, setting up data locking, building calendar-based planning processes with approval workflows, writing JavaScript scripts for planning automation, using the getPlanning() API, PlanningModel API, or DataSource API for planning scenarios, troubleshooting planning performance issues, or integrating predictive forecasting into planning workflows.
license: MIT
metadata:
  version: 1.1.0
  last_updated: 2025-11-22
  sac_version: "2025.23"
  documentation_source: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e
  api_reference: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/2025.23/en-US/index.html
  reference_files: 5
  status: production
---

# SAP Analytics Cloud Planning Skill

Comprehensive skill for building enterprise planning applications with SAP Analytics Cloud.

---

## When to Use This Skill

Use this skill when working on tasks involving:

**Planning Application Development**:
- Creating planning-enabled stories with data entry
- Building analytics designer applications for planning
- Implementing input forms and planning tables
- Configuring planning models with Version and Date dimensions
- Setting up data sources for planning scenarios

**Data Actions & Multi Actions**:
- Creating data actions for copy, allocation, and calculations
- Building multi actions to orchestrate planning operations
- Configuring parameters (member, number, string, datetime types)
- Implementing embedded data actions
- Setting up API steps for external integrations

**Version Management**:
- Managing public and private versions
- Publishing workflows (Publish As, Publish Private Data)
- Sharing private versions with collaborators
- Version creation and deletion via API

**Planning Workflows**:
- Setting up calendar-based planning processes
- Creating general tasks, review tasks, and composite tasks
- Implementing multi-level approval workflows
- Configuring data locking tasks
- Managing task dependencies

**JavaScript Planning APIs**:
- Using getPlanning() API for data entry
- Working with PlanningModel API for master data
- Implementing DataSource API for filtering and querying
- Writing scripts for planning automation
- Handling version management via API

**Data Entry & Allocation**:
- Implementing spreading (to child members)
- Configuring distribution (between siblings)
- Setting up rule-based allocations
- Copy/paste operations in planning tables
- Using advanced formulas for calculations

**Data Locking**:
- Configuring data locking on models
- Setting up lock states (locked, restricted, open)
- Creating data locking tasks in calendar
- Implementing event-based data locking
- Integrating data locking in multi actions

---

## Quick Start

### Creating a Planning-Enabled Story

1. **Create Planning Model** with required dimensions:
   - Version dimension (required)
   - Date dimension (required)
   - Account dimension (recommended)
   - Other business dimensions

2. **Add Table Widget** to story and link to planning model

3. **Enable Planning** on the table:
   - Select table → Planning panel → Enable Planning
   - Configure version selection (public or private)

4. **Configure Data Entry**:
   - Set editable measures/accounts
   - Configure spreading behavior
   - Set up validation rules

### Creating an Analytics Designer Planning Application

1. **Create Analytic Application** (not Optimized Story)
2. **Add Planning Model** as data source
3. **Add Table Widget** and enable planning
4. **Write Scripts** for:
   - Version selection
   - Data submission
   - Custom validation
   - Workflow triggers

---

## Core Concepts

### Model Types

**Planning Model**:
- Supports data write-back
- Requires Version and Date dimensions
- Enables spreading, distribution, allocation
- Supports data locking
- Used for budgeting, forecasting, planning

**Analytic Model**:
- Read-only (no write-back)
- No required dimensions
- Better performance for reporting
- Use when planning not needed

### Version Management

**Public Versions**:
- Visible to all users with access
- Shared across the organization
- Require publish to update

**Private Versions**:
- Visible only to creator (unless shared)
- Used for simulation and what-if analysis
- Can be published to public or new version

**Edit Mode**:
- Temporary private copy when editing public version
- Changes visible only to editor until published
- Automatic validation on publish

**Reference**: See `references/version-management.md` for detailed workflows.

### Planning API Overview

**getPlanning() API** - Table planning operations:
```javascript
// Check if planning is enabled
var isEnabled = Table_1.getPlanning().isEnabled();

// Get public versions
var publicVersions = Table_1.getPlanning().getPublicVersions();

// Get private version
var privateVersion = Table_1.getPlanning().getPrivateVersion();

// Set user input (data entry)
Table_1.getPlanning().setUserInput(selection, value);

// Submit data changes
Table_1.getPlanning().submitData();
```

**PlanningModel API** - Master data operations:
```javascript
// Get dimension members with properties
var members = PlanningModel_1.getMembers("CostCenter");

// Create new members
PlanningModel_1.createMembers("CostCenter", [
    {id: "CC100", description: "Marketing"}
]);

// Update existing members
PlanningModel_1.updateMembers("CostCenter", [
    {id: "CC100", description: "Marketing Dept"}
]);

// Delete members
PlanningModel_1.deleteMembers("CostCenter", ["CC100"]);
```

**DataSource API** - Filtering and querying:
```javascript
// Set dimension filter
Table_1.getDataSource().setDimensionFilter("Version",
    "[Version].[parentId].&[public.Actual]");

// Get members with booked values only
var members = Table_1.getDataSource().getMembers("Account",
    {accessMode: MemberAccessMode.BookedValues});

// Remove filter
Table_1.getDataSource().removeDimensionFilter("Version");
```

**Reference**: See `references/api-reference.md` for complete API documentation.

---

## Data Actions

Data actions perform calculations and data manipulation on planning models.

### Step Types

| Step Type | Purpose |
|-----------|---------|
| Copy | Move data between dimensions/versions |
| Advanced Formula | Complex calculations |
| Allocation | Rule-based distribution |
| Currency Conversion | Convert currencies |
| Embedded Data Action | Run another data action |

### Creating a Copy Step

```
Source:
  Version = Actual
  Year = 2024

Target:
  Version = Budget
  Year = 2025

Mapping:
  Account = Account (same)
  CostCenter = CostCenter (same)
```

### Advanced Formula Example

```
// Calculate forecast = Actual + (Budget - Actual) * 0.5
[Version].[Forecast] = [Version].[Actual] +
    ([Version].[Budget] - [Version].[Actual]) * 0.5
```

### Parameters

Add parameters to make data actions reusable:
- **Member Parameter**: Select dimension member
- **Number Parameter**: Enter numeric value
- **String Parameter**: Enter text (2025+)
- **Datetime Parameter**: Select date/time (2025+)

**Reference**: See `references/data-actions.md` for complete configuration guide.

---

## Multi Actions

Multi actions orchestrate multiple planning operations across models and versions.

### Available Step Types

1. **Data Action Step**: Run data action with parameters
2. **Version Management Step**: Publish versions
3. **Predictive Step**: Run forecasting scenarios
4. **Data Import Step**: Import from SAP sources
5. **API Step**: Call external HTTP APIs
6. **Data Locking Step**: Lock/unlock data slices
7. **PaPM Step**: Run Profitability and Performance Management

### Example Multi Action Flow

```
1. Clean target version (Data Action)
2. Import actuals (Data Import)
3. Run forecast (Predictive)
4. Calculate allocations (Data Action)
5. Publish to public version (Version Management)
6. Lock published data (Data Locking)
```

### Cross-Model Parameters

When using public dimensions, create cross-model parameters to share values across steps in different models.

**Reference**: See `references/data-actions.md` for multi action configuration.

---

## Planning Workflows (Calendar)

The SAP Analytics Cloud calendar organizes collaborative planning processes.

### Task Types

**General Task**: Data entry by assignees
- Attach work file (story/application)
- Set due dates and notifications
- Track completion status

**Review Task**: Approval workflow
- Review results of general tasks
- Approve or reject submissions
- Automatic notification on status change

**Composite Task**: Combined entry and review
- Simplified approval for single-level workflows
- Driving dimension support for regional planning

**Data Locking Task**: Schedule lock changes
- Specify data slice to lock/unlock
- Set target lock state
- Event-based triggering

### Multi-Level Approval

```
Round 1: Regional Managers review regional plans
    ↓ (on approval)
Round 2: Finance Director reviews consolidated plan
    ↓ (on approval)
Round 3: CFO final approval
    ↓ (on approval)
Data Locking: Lock approved plan data
```

### Task Dependencies

Configure predecessor tasks to create sequential workflows:
- Review tasks automatically start when predecessor completes
- Data locking tasks trigger on approval events

**Reference**: See `references/planning-workflows.md` for calendar configuration.

---

## Spreading & Distribution

### Spreading (Vertical)

Distributes values from parent to child members:
- **Equal Spread**: Divide equally among children
- **Proportional Spread**: Maintain existing ratios
- **Automatic**: SAC determines best method

```javascript
// Spreading happens automatically when entering at aggregate level
// Example: Enter 1000 at "Total Regions" spreads to child regions
```

### Distribution (Horizontal)

Moves values between members at same hierarchy level:
- Select source and target cells
- Choose distribution method
- Apply via context menu or script

### Allocation by Rules

Configure structured allocations in data actions:
- Define driver accounts for percentage distribution
- Set allocation targets
- Execute via data action or multi action

---

## Data Locking

Protect planning data during and after planning cycles.

### Lock States

| State | Data Entry | Owner Can Edit |
|-------|------------|----------------|
| Open | Yes | Yes |
| Restricted | No (except owner) | Yes |
| Locked | No | No |
| Mixed | Varies | Varies (selection contains multiple states) |

### Configuration

1. **Enable Data Locking** on planning model
2. **Define Driving Dimensions** (e.g., Region, Version)
3. **Assign Owners** to data slices
4. **Configure Lock Regions** via model settings

### Script Example

```javascript
// Get data locking object
var dataLocking = Table_1.getPlanning().getDataLocking();

// Get lock state for selection
var selection = Table_1.getSelections()[0];
var lockState = dataLocking.getState(selection);

// Check if locked
if (lockState === DataLockingState.Locked) {
    Application.showMessage("This data is locked.");
}
```

**Reference**: See `references/planning-workflows.md` for data locking patterns.

---

## Common JavaScript Patterns

### Finding Active Version by Attribute

```javascript
var allVersions = PlanningModel_1.getMembers("Version");
var activeVersion = "";

for (var i = 0; i < allVersions.length; i++) {
    if (allVersions[i].properties.Active === "X") {
        activeVersion = allVersions[i].id;
        break;
    }
}
console.log("Active Version: " + activeVersion);
```

### Setting Filter from Planning Cycle

```javascript
Application.showBusyIndicator();
Table_1.setVisible(false);

// Find active planning cycle
var cycles = PlanningModel_1.getMembers("PlanningCycle");
var activeCycle = "";

for (var i = 0; i < cycles.length; i++) {
    if (cycles[i].properties.Flag === "ACTIVE") {
        activeCycle = cycles[i].id;
        break;
    }
}

// Apply MDX filter
Table_1.getDataSource().setDimensionFilter("Date",
    "[Date].[YQM].&[" + activeCycle + "]");

Table_1.setVisible(true);
Application.hideBusyIndicator();
```

### Version Publishing

```javascript
// Get forecast version
var forecastVersion = Table_1.getPlanning().getPublicVersion("Forecast2025");

// Check if changes need publishing
if (forecastVersion.isDirty()) {
    forecastVersion.publish();
    Application.showMessage("Version published successfully.");
}
```

### Data Action Execution

```javascript
// Execute data action with parameters
DataAction_1.setParameterValue("Version", "Budget");
DataAction_1.setParameterValue("Year", "2025");

DataAction_1.execute();

// Or execute in background
DataAction_1.executeInBackground();
```

**Reference**: See `references/javascript-patterns.md` for more examples.

---

## Performance Best Practices

### Data Action Optimization

1. **Use Input Controls**: Link to parameters to reduce data scope
2. **Embed Related Actions**: Combine actions on same model/version
3. **Minimize Cross-Model Operations**: Keep data in single model when possible
4. **Use Batch Processing**: Group operations in single transaction

### Story Performance

1. **Enable Data Locking Selectively**: Only on models that need it
2. **Use Growing Mode**: For large tables with pagination
3. **Limit Visible Dimensions**: Reduce data cells displayed
4. **Optimize Filters**: Apply story filters before data entry

### API Performance

1. **Use Booked Values Filter**: Retrieve only posted data
2. **Limit getMembers() Results**: Set limit parameter
3. **Cache Member Lists**: Store in script variables when reusing
4. **Use Busy Indicator**: Improve perceived performance

---

## Troubleshooting

### Issue: Data not saving

**Check**:
1. Planning enabled on table?
2. User has planning permissions?
3. Data locked?
4. Validation rules failing?

**Debug**:
```javascript
console.log("Planning enabled: " + Table_1.getPlanning().isEnabled());
var lockState = Table_1.getPlanning().getDataLocking().getState(selection);
console.log("Lock state: " + lockState);
```

### Issue: Version not publishing

**Check**:
1. Valid changes only? (Invalid changes discarded)
2. Data access control allowing write?
3. Version not already published?

### Issue: Data action failing

**Check**:
1. Source data exists?
2. Target version writable?
3. Dimension mappings correct?
4. Parameters set correctly?

**Debug**: Use data action tracing table with "Show Only Leaves" option.

### Issue: getMembers() returns empty

**Check**:
1. Dimension name correct?
2. Model connected?
3. User has read access?
4. Using correct API (PlanningModel vs DataSource)?

---

## Official Documentation Links

**Essential Resources**:
- **SAP Analytics Cloud Help (2025.23)**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e
- **API Reference (2025.23)**: https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/2025.23/en-US/index.html
- **Analytics Designer Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/0798b81f9130425389dec84e19326b93.html
- **Planning Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/cd897576c3344475a208c2f7a52f151e.html

**Planning Model & Data**:
- **Planning Model Data**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/bc9f0eb2da1848dd9d3925ec29337e9f.html
- **Model Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/0ace2c43b92b41099b1cd964b4ff198a.html
- **Data Foundation**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/6f6e75a5e60a4d099939196a97a25814.html

**Data Actions & Multi Actions**:
- **Run Data Actions**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/69a370e6cfd84315973101389baacde0.html
- **Get Started with Data Actions**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/2850221adef14958a4554ad2860ff412.html
- **Create Data Action**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/e28c7a30978b406aa5e24318206f6443.html
- **Add Parameters**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/4835429d35534add875bae17e93b12e1.html

**Version Management**:
- **Version Management Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/9d9056a13b764ad3aca8fef2630fcc00.html
- **Creating Versions**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/3b7f87c3d9cb49b7a6fef3f5cb0a6250.html
- **Public Versions**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/b6e3d093988e4c3eba7eb6c1c110e954.html
- **Private Versions**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/1a011f8041a84e109a3b6bf8c1c81bc1.html

**Data Locking**:
- **Configuring Data Locking**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/e07d46e950794d5a928a9b16d1394de6.html
- **Data Locking States**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/91fa3cbbd46d457ab04f9ef3c7901655.html

**Calendar & Workflows**:
- **Calendar Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/af4b7e39edd249d3b59fa7d4ab110a7a.html
- **Planning Processes**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/f6189755175940f3a4e007c3d6b83ee5.html
- **Task Types**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/32c739d6f05b4990a08ef3948b18a1aa.html

**Allocations & Spreading**:
- **Allocation Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/de944ce1189543e5858798036d576094.html
- **Value Driver Trees**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/b4d2b021719f4d958afd0922ac7de8d1.html

**Learning Resources**:
- **Planning Learning Journey**: https://learning.sap.com/learning-journeys/leveraging-sap-analytics-cloud-functionality-for-enterprise-planning
- **Advanced Planning Course**: https://learning.sap.com/courses/leveraging-advanced-features-in-sap-analytics-cloud-for-planning

---

## Bundled Reference Files

This skill includes comprehensive reference documentation (5 files):

1. **references/api-reference.md**: Complete Analytics Designer API for planning
2. **references/data-actions.md**: Data Actions, Multi Actions, parameters, steps
3. **references/planning-workflows.md**: Calendar, tasks, approvals, data locking
4. **references/version-management.md**: Versions, publishing, sharing, edit mode
5. **references/javascript-patterns.md**: Code snippets, patterns, best practices

---

## Instructions for Claude

When using this skill:

1. **Check model type first** - Ensure planning model (not analytic) for write operations
2. **Verify planning enabled** - Table must have planning enabled
3. **Use appropriate API** - PlanningModel for master data, getPlanning() for transactions
4. **Handle versions correctly** - Private for drafts, publish to public when ready
5. **Respect data locking** - Check lock state before suggesting edits
6. **Use busy indicators** - For long operations to improve UX
7. **Follow MDX syntax** - For dimension filters: `[Dim].[Hierarchy].&[Member]`
8. **Test data actions** - Use tracing before production deployment
9. **Consider performance** - Apply filters to reduce data scope
10. **Link to documentation** - Include relevant SAP Help links in responses

For troubleshooting:
- Check console for script errors
- Verify model connectivity
- Review data action logs
- Test with simplified scenarios first
- Check user permissions and data access

---

**License**: MIT
**Version**: 1.0.0
**Maintained by**: SAP Skills Maintainers
**Repository**: https://github.com/secondsky/sap-skills
