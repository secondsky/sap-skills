# Data Action Tracing

## Overview

Data Action Tracing is a debugging tool in SAP Analytics Cloud that allows executing a data action while inspecting intermediate results at manually specified locations called "tracepoints." This enables systematic debugging and validation of complex planning calculations.

**Key Concept**: Set tracepoints at specific locations in a data action, execute in trace mode, and examine data changes between tracepoints.

---

## What You Can Do with Tracing

| Capability | Description |
|------------|-------------|
| **Set Tracepoints** | Mark locations to inspect intermediate results |
| **Run in Trace Mode** | Execute data action with tracing enabled |
| **View Intermediate Results** | See data state at each tracepoint |
| **Compare Changes** | View data differences between tracepoints |
| **Debug Issues** | Identify where calculations go wrong |
| **Validate Logic** | Confirm data transformations are correct |

---

## When to Use Data Action Tracing

### Common Scenarios

| Scenario | How Tracing Helps |
|----------|-------------------|
| **New Data Action Development** | Validate each step produces expected results |
| **Debugging Failures** | Identify which step causes incorrect data |
| **Performance Investigation** | See which steps process most data |
| **Complex Formulas** | Verify advanced formula calculations |
| **Cross-Model Operations** | Check data at source and target |
| **Allocation Debugging** | Validate driver ratios and distributions |

### Tracing vs. Regular Execution

| Aspect | Regular Execution | Trace Mode |
|--------|-------------------|------------|
| **Speed** | Faster | Slower (captures data) |
| **Data Capture** | No intermediate data | Full intermediate data |
| **Results** | Final data only | Data at each tracepoint |
| **Use Case** | Production runs | Development/debugging |

---

## Adding Tracepoints

### Tracepoint Locations

Tracepoints can be added:
- **Between steps** - After any data action step
- **Within advanced formulas** - At specific calculation points
- **Before/after allocations** - To verify input and output

### Adding a Tracepoint

1. Open data action in **Data Action Designer**
2. Navigate to the step where you want to add tracepoint
3. Click **Add Tracepoint** icon or right-click → **Add Tracepoint**
4. Name the tracepoint descriptively (e.g., "After Copy Step", "Before Allocation")

### Tracepoint Naming Conventions

| Pattern | Example |
|---------|---------|
| **Position-based** | TP01_AfterCopy, TP02_AfterFormula |
| **Step-based** | TP_CopyComplete, TP_AllocationStart |
| **Descriptive** | TP_RevenueCalculated, TP_CostAllocated |

---

## Running Data Action Tracing

### Starting Trace Mode

1. Open data action in designer
2. Click **Run with Tracing** (or trace icon)
3. Set required parameters (if any)
4. Execute data action

### What Happens During Tracing

```
┌────────────────────────────────────────────────────────────┐
│ Data Action Execution with Tracing                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│   Start ─────► Step 1 ─────► [TP1] ─────► Step 2          │
│                               │                            │
│                    Capture data snapshot                   │
│                                                            │
│   ─────► [TP2] ─────► Step 3 ─────► [TP3] ─────► End      │
│            │                          │                    │
│   Capture snapshot           Capture snapshot              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Note**: Execution does NOT pause at tracepoints—all data is captured and available after completion.

---

## Analyzing Tracing Results

### Viewing Results

After trace execution completes:

1. **Tracing Results Panel** opens automatically
2. Select a **tracepoint** from the list
3. View data in **table layout** (similar to story tables)

### Result Views

| View | Description |
|------|-------------|
| **Data at Tracepoint** | Shows all data values at that point |
| **Changes Since Previous** | Delta between this and previous tracepoint |
| **Full Data** | Complete dataset at tracepoint |
| **Filtered View** | Apply filters to focus on specific data |

### Filtering and Navigation

| Action | How To |
|--------|--------|
| **Filter by Dimension** | Click dimension header → Select members |
| **Show Only Leaves** | Toggle to hide aggregated values |
| **Sort** | Click column header |
| **Search** | Use search box for specific members |
| **Export** | Export results to Excel for analysis |

---

## Tracepoint Configuration

### Tracepoint Options

| Option | Description |
|--------|-------------|
| **Name** | Descriptive identifier |
| **Scope** | Which data to capture (full model, filtered) |
| **Enabled** | Toggle tracepoint on/off |

### Scope Configuration

Define what data to capture at each tracepoint:

| Scope | Captures | Performance Impact |
|-------|----------|-------------------|
| **Full Model** | All data in model | High |
| **Step Scope** | Data affected by step | Medium |
| **Custom Filter** | Specific dimension members | Low |

### Best Practices for Scope

1. **Start broad** - Full model for initial debugging
2. **Narrow down** - Filter to relevant data once issue identified
3. **Use step scope** - For performance-sensitive debugging
4. **Custom filters** - For large models with known data areas

---

## Debugging Common Issues

### Issue: Unexpected Values

**Debugging Approach**:
1. Add tracepoints before and after suspected step
2. Run in trace mode
3. Compare values at both tracepoints
4. Identify where incorrect transformation occurs

### Issue: Missing Data

**Debugging Approach**:
1. Add tracepoint at data source (beginning)
2. Add tracepoints after each step
3. Find where data disappears
4. Check filters, mappings, or conditions

### Issue: Allocation Problems

**Debugging Approach**:
1. Add tracepoint before allocation (source data)
2. Add tracepoint after allocation (distributed data)
3. Verify driver values are correct
4. Check allocation ratios match expectations

### Issue: Formula Errors

**Debugging Approach**:
1. Add tracepoints within advanced formula
2. Check each calculation component
3. Verify lookup data is accessible
4. Validate date/version contexts

---

## Tracing Advanced Formulas

### Adding Tracepoints in Scripts

In advanced formula scripts, add tracepoints using TRACE() function:

```
// Advanced Formula Script with Tracepoints

// Calculate base revenue
[Revenue] = [Quantity] * [Price]
TRACE("After_Revenue_Calc")

// Apply discount
[Discounted_Revenue] = [Revenue] * (1 - [Discount_Rate])
TRACE("After_Discount")

// Calculate tax
[Final_Amount] = [Discounted_Revenue] * (1 + [Tax_Rate])
TRACE("After_Tax")
```

### TRACE() Function

| Usage | Description |
|-------|-------------|
| `TRACE("name")` | Capture data at this point |
| `TRACE("name", filter)` | Capture filtered data only |

---

## Performance Considerations

### Tracing Impact

| Factor | Impact |
|--------|--------|
| **Number of Tracepoints** | More tracepoints = slower execution |
| **Scope Size** | Larger scope = more memory/time |
| **Model Size** | Large models take longer to trace |
| **Formula Complexity** | Complex formulas add overhead |

### Optimization Tips

1. **Minimize tracepoints** - Add only where needed
2. **Use filtered scope** - Don't capture entire model
3. **Remove after debugging** - Delete tracepoints when done
4. **Test on subset** - Debug with filtered data first

### Memory Considerations

Tracing captures data snapshots in memory:
- Large models may hit memory limits
- Use scope filters to reduce memory usage
- Consider debugging subsets of data

---

## Workflow Best Practices

### Development Workflow

```
1. Create Data Action
        │
        ▼
2. Add Tracepoints (before/after key steps)
        │
        ▼
3. Run with Tracing
        │
        ▼
4. Analyze Results
        │
        ├── If issues found ──► Fix and repeat
        │
        └── If correct ──► Remove tracepoints
                               │
                               ▼
                        5. Deploy to Production
```

### Tracepoint Strategy

| Phase | Strategy |
|-------|----------|
| **Initial Development** | Tracepoint after each step |
| **Focused Debugging** | Tracepoints around problem area |
| **Validation** | Key checkpoints only |
| **Production** | Remove all tracepoints |

---

## Tracing Output Format

### Table View Structure

| Column | Description |
|--------|-------------|
| **Dimensions** | All dimension members |
| **Measures** | All measure values |
| **Status** | Changed, New, Deleted indicators |

### Change Indicators

| Indicator | Meaning |
|-----------|---------|
| **+** | New record (didn't exist at previous tracepoint) |
| **-** | Deleted record (removed since previous tracepoint) |
| **~** | Modified record (value changed) |
| (blank) | Unchanged record |

---

## Integration with Job Monitor

### Tracing and Job Monitor

- Traced executions appear in **Job Monitor**
- Status shows "Completed with Tracing"
- Tracing results available for review
- Can re-analyze previous trace runs

### Accessing Historical Traces

1. Open **Job Monitor**
2. Find traced data action execution
3. Click to view tracing results
4. Analyze as with live tracing

**Note**: Tracing results are stored temporarily and may be purged.

---

## Troubleshooting Tracing Issues

### Common Problems

| Problem | Cause | Solution |
|---------|-------|----------|
| Tracing not available | Feature not enabled | Check SAC edition/settings |
| Out of memory | Scope too large | Reduce scope or filter data |
| Slow execution | Too many tracepoints | Remove unnecessary tracepoints |
| Missing data | Scope filter | Expand scope or check filter |
| Results disappeared | Session timeout | Run trace again |

### Debug Checklist

- [ ] Tracepoints named descriptively?
- [ ] Scope appropriate for debugging need?
- [ ] Parameters set correctly?
- [ ] Model has data for selected scope?
- [ ] User has required permissions?

---

## Official Documentation Links

- **Data Action Tracing Overview**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/0767009b49d141c58fcc2962d6584b44.html
- **Add Tracepoints**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/50424a6a40584f65a9b4c9493c18690c.html
- **Run Tracing and Check Results**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/065dfca395724e369817f3ce05bb7184.html
- **Data Actions**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/2850221adef14958a4554ad2860ff412.html
- **Advanced Formulas**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/4af8f5afbaf541f5821107eb772a5224.html

---

**Version**: 1.0.0
**Last Updated**: 2026-06-11
**SAC Version**: 2026.8
