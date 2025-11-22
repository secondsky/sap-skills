# SAP Analytics Cloud - Data Actions and Multi Actions Reference

**Source**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/69a370e6cfd84315973101389baacde0.html
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Data Actions Overview](#data-actions-overview)
2. [Data Action Step Types](#data-action-step-types)
3. [Multi Actions Overview](#multi-actions-overview)
4. [Multi Action Step Types](#multi-action-step-types)
5. [Parameters Configuration](#parameters-configuration)
6. [Execution Methods](#execution-methods)
7. [Performance Best Practices](#performance-best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Data Actions Overview

Data actions perform calculations and data manipulation on planning models. All steps within a data action run on a single transaction - if any step fails, all changes roll back.

### Key Characteristics

- **Single Model**: Data actions operate on one target model
- **Single Version**: All steps target one version
- **Transaction**: All-or-nothing execution
- **Rollback**: Automatic rollback on failure

### Creating a Data Action

1. Navigate to **Files** → **Create New** → **Data Action**
2. Select target **Planning Model**
3. Add steps in sequence
4. Configure parameters (optional)
5. Save and test

---

## Data Action Step Types

### 1. Copy Step

Copies data from source to target with dimension mapping.

**Configuration**:
```
Source Scope:
  Version: Actual
  Year: 2024
  Account: All

Target Scope:
  Version: Budget
  Year: 2025
  Account: All

Dimension Mapping:
  Account → Account (same member)
  CostCenter → CostCenter (same member)
  Year: 2024 → 2025 (fixed mapping)
```

**Use Cases**:
- Copy actuals to forecast
- Seed budget from prior year
- Copy between models

### 2. Advanced Formula Step

Write custom formulas using SAP Analytics Cloud formula syntax.

**Formula Syntax**:
```
// Basic assignment
[Account].[Revenue] = 1000000

// Reference other members
[Account].[Gross_Profit] = [Account].[Revenue] - [Account].[COGS]

// Conditional logic
IF [Account].[Revenue] > 0 THEN
    [Account].[Margin] = [Account].[Gross_Profit] / [Account].[Revenue]
ELSE
    [Account].[Margin] = 0
ENDIF

// Cross-version reference
[Version].[Forecast] = [Version].[Actual] * 1.05

// Time-based calculations
[Date].[2025.Q1] = [Date].[2024.Q1] * (1 + [Account].[Growth_Rate])

// RESULTLOOKUP for unmatched dimensions
[Account].[Allocation] = RESULTLOOKUP([Account].[Driver], [CostCenter].[TOTAL])
```

**Operators Available**:
- Arithmetic: `+`, `-`, `*`, `/`
- Comparison: `=`, `<>`, `<`, `>`, `<=`, `>=`
- Logical: `AND`, `OR`, `NOT`
- Functions: `IF/THEN/ELSE/ENDIF`, `RESULTLOOKUP`, `MEMBERSET`

### 3. Allocation Step

Distribute values based on driver data.

**Configuration**:
```
Source:
  Account: Overhead_Costs
  CostCenter: CORPORATE

Target:
  Account: Allocated_Overhead
  CostCenter: All leaf members

Driver:
  Account: Headcount
  CostCenter: All leaf members

Method: Proportional
```

**Allocation Methods**:
- **Proportional**: Based on driver ratios
- **Equal**: Divide equally
- **Fixed Percentage**: User-defined %

### 4. Currency Conversion Step

Convert values between currencies.

**Configuration**:
```
Source Currency: Local
Target Currency: Reporting (USD)
Rate Type: Average
Rate Date: Current Period
```

### 5. Embedded Data Action Step

Call another data action from within this action.

**Use Cases**:
- Reuse common calculation logic
- Break complex processes into modules
- Maintain single source of truth

**Important**: Parameters from embedded action must be mapped or set.

---

## Multi Actions Overview

Multi actions orchestrate multiple planning operations across models and versions. Unlike data actions, multi actions can span multiple models and don't run in a single transaction.

### Key Characteristics

- **Multiple Models**: Can operate across models
- **Multiple Versions**: Can target different versions
- **Independent Steps**: Each step is separate transaction
- **Partial Success**: Earlier steps persist if later steps fail

### Creating a Multi Action

1. Navigate to **Files** → **Create New** → **Multi Action**
2. Add steps in desired sequence
3. Configure parameters
4. Link parameters to steps
5. Save and test

---

## Multi Action Step Types

### 1. Data Action Step

Executes a data action with specified parameters.

**Configuration**:
- Select data action
- Map parameters from multi action to data action parameters
- Or set fixed values

### 2. Version Management Step

Publishes a planning version.

**Configuration**:
- Select model
- Select version to publish
- Use parameter or fixed value

**Actions**:
- Publish (merge private to public)
- Publish As (create new public version)

### 3. Predictive Step

Runs predictive forecasting scenario.

**Configuration**:
- Select predictive scenario
- Set forecast periods
- Configure target version

**Predictive Types**:
- Auto (automatic algorithm selection)
- Triple Exponential Smoothing
- Linear Regression

### 4. Data Import Step

Import data from SAP sources.

**Supported Sources**:
- SAP S/4HANA
- SAP BW
- SAP Datasphere
- Other configured connections

### 5. API Step

Call external HTTP APIs.

**Configuration**:
```
URL: https://api.example.com/endpoint
Method: POST
Headers:
  Content-Type: application/json
  Authorization: Bearer {{token}}
Body:
  {
    "planningCycle": "{{PlanningCycle}}",
    "region": "{{Region}}"
  }
```

**Use Cases**:
- Trigger external workflows
- Send notifications
- Integrate with third-party systems

### 6. Data Locking Step

Lock or unlock data slices.

**Configuration**:
- Select model
- Define data slice (dimensions/members)
- Set target lock state (Locked, Restricted, Open)

### 7. PaPM Step (2025+)

Run Profitability and Performance Management calculations.

**Configuration**:
- Select PaPM function
- Set input parameters
- Configure output mapping

---

## Parameters Configuration

### Parameter Types

| Type | Description | Available In |
|------|-------------|--------------|
| Member | Select dimension member | Data Actions, Multi Actions |
| Number | Enter numeric value | Data Actions, Multi Actions |
| String | Enter text value | Multi Actions (2025+) |
| Datetime | Select date/time | Multi Actions (2025+) |

### Creating Parameters

**In Data Action**:
1. Open data action
2. Click **Parameters** in toolbar
3. Add parameter with name and type
4. Reference in steps: `{{ParameterName}}`

**In Multi Action**:
1. Open multi action
2. Click **(Available Parameters)**
3. Select **Create Parameter**
4. Configure and use in steps

### Cross-Model Parameters

When using **public dimensions** shared across models:

1. Create parameter based on public dimension
2. Check **Cross-Model Parameter** option
3. Parameter value applies to all steps using that dimension

### Parameter Assignment

**Member Selection**: User picks from dimension
**Default Value**: Pre-set value
**Story Filter**: Uses current story filter
**Input Control**: Links to story input control

---

## Execution Methods

### From Story/Application

**Button Trigger**:
```javascript
// In button onClick event
DataAction_Budget.setParameterValue("Year", "2025");
DataAction_Budget.execute();
```

**On Data Change**:
```javascript
// In onResultChanged event (use carefully)
if (shouldRecalculate) {
    DataAction_Calc.execute();
}
```

### From Calendar

1. Create **Data Action Task** or **Multi Action Task**
2. Attach to planning process
3. Schedule execution date/time
4. Assign responsible user

### Scheduled (Background)

1. Open Calendar
2. Create **Scheduled Task**
3. Select data action or multi action
4. Set recurring schedule (daily, weekly, etc.)

### API Execution

```javascript
// Execute synchronously
DataAction_1.execute();

// Execute in background (non-blocking)
DataAction_1.executeInBackground();

// With status callback (in onExecutionStatusUpdate event)
// Handle: Running, Success, Failed, Cancelled
```

---

## Performance Best Practices

### 1. Scope Reduction

```
// BAD: Process all data
Source: All Years, All CostCenters, All Accounts

// GOOD: Use parameters to limit scope
Source: Year = {{SelectedYear}}, CostCenter = {{SelectedCC}}
```

### 2. Input Control Linking

Link data action parameters to story input controls:
- Reduces processed data volume
- Improves execution time
- Better user experience

### 3. Embedding for Same Model

When multiple data actions target same model/version:
1. Create container data action
2. Embed related actions as steps
3. Runs as single transaction (faster)

### 4. Multi Action Optimization

```
// Instead of:
Multi Action with 5 separate data action steps on same model

// Use:
Embedded data action containing 5 steps
+ Multi Action with 1 data action step
```

### 5. Avoid Unnecessary Steps

- Remove debugging steps before production
- Consolidate similar calculations
- Use RESULTLOOKUP instead of multiple copy steps

### 6. Tracing for Debugging

Enable **Tracing Table** during development:
1. Run data action
2. Check "Show Only Leaves" option
3. Review cell-by-cell results
4. Disable before production deployment

---

## Troubleshooting

### Common Errors

**"No data to process"**
- Source scope returns no data
- Check dimension filters
- Verify source version has data

**"Target version is locked"**
- Data locking preventing writes
- Check lock state and owners
- Use appropriate version

**"Parameter value required"**
- Missing parameter value
- Set default or make optional
- Check parameter mapping

**"Formula syntax error"**
- Check operator syntax
- Verify member IDs
- Use dimension/member browser

**"Timeout exceeded"**
- Scope too large
- Add filters to reduce data
- Consider background execution

### Debugging Steps

1. **Check Source Data**
   - Verify data exists in source scope
   - Test with smaller scope first

2. **Review Tracing**
   - Enable tracing table
   - Check intermediate results
   - Identify failing step

3. **Test Parameters**
   - Run with hardcoded values first
   - Then add parameters one by one

4. **Check Permissions**
   - User must have write access to target
   - Version must be writable

5. **Review Logs**
   - Check browser console for errors
   - Review data action execution log

---

## Example: Complete Planning Workflow

### Scenario
Annual budget planning: Copy actuals, apply growth rate, allocate overhead

### Data Action: Budget_Calculation

**Step 1: Copy Actuals to Budget**
```
Type: Copy
Source: Version=Actual, Year=2024
Target: Version=Budget, Year=2025
Mapping: All dimensions same
```

**Step 2: Apply Growth Rate**
```
Type: Advanced Formula
Formula:
[Account].[Revenue] = [Account].[Revenue] * (1 + {{GrowthRate}})
[Account].[COGS] = [Account].[COGS] * (1 + {{GrowthRate}} * 0.8)
```

**Step 3: Calculate Gross Profit**
```
Type: Advanced Formula
Formula:
[Account].[Gross_Profit] = [Account].[Revenue] - [Account].[COGS]
```

### Multi Action: Annual_Planning_Workflow

**Step 1: Data Action**
- Action: Budget_Calculation
- Parameters: GrowthRate = {{GrowthRate}}

**Step 2: Predictive**
- Scenario: Sales_Forecast
- Periods: 12
- Target: Version=Forecast

**Step 3: Version Management**
- Action: Publish
- Version: Budget
- Model: Finance_Model

**Step 4: Data Locking**
- State: Locked
- Slice: Version=Budget, Year=2025

---

**Documentation Links**:
- Data Actions: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/69a370e6cfd84315973101389baacde0.html
- Multi Actions: https://learning.sap.com/learning-journeys/leveraging-sap-analytics-cloud-functionality-for-enterprise-planning/configuring-multi-actions
- Parameters: https://help.sap.com/doc/00f68c2e08b941f081002fd3691d86a7/2023.20/en-US/4835429d35534add875bae17e93b12e1.html
