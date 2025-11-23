# Developer Best Practices for Maintainable SAC Stories

Best practices for building SAC stories that are scalable, maintainable, and developer-friendly.

**Source**: [Building Stories That Other Developers Actually Want to Inherit](https://community.sap.com/t5/technology-blog-posts-by-members/building-stories-that-other-developers-actually-want-to-inherit/ba-p/14168133) by JBARLOW (SAP Community, July 2025)

---

## Table of Contents

1. [Widget Naming Conventions](#widget-naming-conventions)
2. [Layout Organization](#layout-organization)
3. [Script Annotation Standards](#script-annotation-standards)
4. [Design Tips](#design-tips)
5. [Summary](#summary)

---

## Widget Naming Conventions

The most impactful practice for maintainable SAC stories is consistent widget naming.

### Standard Prefixes

| Widget Type | Prefix | Example |
|-------------|--------|---------|
| Bar Chart | `chartB_` | `chartB_revenue_by_state` |
| Line Chart | `chartL_` | `chartL_margin_by_product` |
| Numeric Point Chart | `kpi_` | `kpi_actuals_vs_budget` |
| Waterfall Chart | `chartWF_` | `chartWF_spend` |
| Table | `tbl_` | `tbl_invoices_by_month` |
| Panel | `pnl_` | `pnl_title` |
| Text Box | `txt_` | `txt_title` |
| Image | `img_` | `img_logo` |
| Shape | `shape_` | `shape_header_divider` |
| Button | `btn_` | `btn_page2` |
| Dropdown List | `ddl_` | `ddl_product` |
| List Box | `lb_` | `lb_store` |
| Radio Button Group | `rbg_` | `rbg_managers` |
| Checkbox | `chk_` | `chk_include_forecast` |

### Why Naming Matters

**Without naming conventions** (Bad):
```
Outline View:
├── Chart
├── Chart_1
├── Chart_2
├── Table
├── Table_1
├── Button
├── Button_1
```

**With naming conventions** (Good):
```
Outline View:
├── chartB_revenue_by_region
├── chartL_revenue_trend
├── chartWF_budget_variance
├── tbl_detailed_transactions
├── tbl_summary_by_product
├── btn_export_pdf
├── btn_reset_filters
```

### Benefits

1. **Autocomplete clarity**: When typing in script editor, CTRL+Space shows meaningful names
2. **Easier debugging**: Quickly identify which widget is referenced in error messages
3. **Team collaboration**: Other developers immediately understand widget purposes
4. **Self-documenting**: Code becomes readable without additional comments

### Implementation Guidelines

- Include naming conventions in organization's design guidelines
- Apply consistently from project start
- Don't get lazy and stop mid-project
- Use lowercase with underscores for readability

---

## Layout Organization

Use panels to group related content for easier navigation and maintenance.

### Panel-Based Structure

```
Story Layout:
├── pnl_header
│   ├── img_logo
│   ├── txt_title
│   └── shape_header_divider
├── pnl_filters
│   ├── ddl_year
│   ├── ddl_region
│   └── btn_apply_filters
├── pnl_kpis
│   ├── kpi_revenue
│   ├── kpi_margin
│   └── kpi_growth
├── pnl_main_chart
│   └── chartB_revenue_by_product
└── pnl_details
    └── tbl_transactions
```

### Ordering Convention

Order widgets in Outline view to match visual layout:
- **Top to bottom**
- **Left to right**

This allows developers to understand layout without viewing the canvas.

### Benefits of Panels

1. **Quick navigation**: Find content blocks instantly in Outline
2. **Easy repositioning**: Move entire sections by dragging one panel
3. **Simplified scripting**: Show/hide panel instead of multiple widgets
4. **Performance**: No significant performance impact from using many panels

### Show/Hide Pattern

```javascript
// Instead of hiding multiple widgets individually
// AVOID:
Chart_1.setVisible(false);
Table_1.setVisible(false);
Text_1.setVisible(false);
Button_1.setVisible(false);

// Hide the containing panel
// GOOD:
pnl_details.setVisible(false);
```

---

## Script Annotation Standards

Well-documented scripts dramatically reduce maintenance friction.

### Summary-Level Comments

Add a summary block at the start of each script explaining:
- **Purpose**: What this script accomplishes
- **Interaction**: How it connects to other scripts
- **Dependencies**: Widgets, variables, or data sources referenced

```javascript
/*
 * ============================================
 * Script: onSelect - chartB_revenue_by_region
 * ============================================
 * Purpose: Filter detail table when user selects a region in the chart
 * 
 * Interaction: 
 *   - Reads: chartB_revenue_by_region selections
 *   - Updates: tbl_transactions filter
 *   - Triggers: onResultChanged on tbl_transactions
 * 
 * Dependencies:
 *   - chartB_revenue_by_region (Chart widget)
 *   - tbl_transactions (Table widget)
 *   - GlobalVar_selectedRegion (String variable)
 * ============================================
 */

// Script implementation below...
```

### Line-Level Comments

Add inline comments explaining non-obvious logic:

```javascript
// Get user's selection from the chart
var selections = chartB_revenue_by_region.getSelections();

// Guard clause: exit if nothing selected
if (selections.length === 0) {
    return;
}

// Extract region ID from selection object
// Note: Key name matches dimension ID in model
var selectedRegion = selections[0]["Region"];

// Store in global variable for other scripts to access
GlobalVar_selectedRegion = selectedRegion;

// Apply filter to detail table
// Using setDimensionFilter to replace any existing filter
tbl_transactions.getDataSource().setDimensionFilter("Region", selectedRegion);
```

### AI-Assisted Annotation

For existing undocumented scripts:
1. Copy script to AI assistant (ChatGPT, Claude, etc.)
2. Request annotation and summary generation
3. **Always review and verify** the AI output for accuracy
4. Adjust terminology to match your project conventions

---

## Design Tips

### Panel Auto Scroll

**Recommendation**: Turn OFF

- Prevents unnecessary scroll bars
- Provides hard boundaries for widget positioning
- Makes layout arrangement predictable

```
Panel Settings → Auto Scroll → Disabled
```

### Flow Panels

**Recommendation**: Avoid

- Flow panels make precise positioning difficult
- Fixed layouts are easier to maintain
- Plan your layout before building; flow panels indicate unclear requirements

### Dynamic/Responsive Sizing

Build stories that adapt to varying screen sizes:

**Development Workflow**:
1. Build with **auto widget widths** and **fixed px** Left/Right values
2. Test and finalize layout
3. Change Left/Right from **px** to **%** for responsiveness

```javascript
// Example: Widget positioning
// Fixed (initial development):
// Left: 20px, Right: 20px

// Responsive (after layout finalized):
// Left: 2%, Right: 2%
```

**Advanced Responsive Design**:
- Use CSS classes for font size adjustments based on widget size
- Consider breakpoints for significantly different screen sizes
- Test on target devices before deployment

---

## Summary

Building maintainable SAC stories requires discipline in four areas:

| Area | Key Practice | Impact |
|------|--------------|--------|
| **Naming** | Use consistent prefixes for all widgets | Immediate clarity in scripts and Outline |
| **Layout** | Group content in panels, order logically | Easy navigation and repositioning |
| **Annotation** | Summary + line comments for all scripts | Reduced onboarding time for new developers |
| **Design** | Disable auto scroll, use % sizing | Predictable, responsive layouts |

> *"Good design isn't just for end users—it starts with the developer."*
> — JBARLOW, SAP Community

---

## Quick Reference Card

### Naming Prefixes
```
chartB_  chartL_  chartWF_  kpi_  tbl_  pnl_
txt_  img_  shape_  btn_  ddl_  lb_  rbg_  chk_
```

### Panel Visibility Pattern
```javascript
pnl_section.setVisible(true/false);  // Show/hide entire section
```

### Script Header Template
```javascript
/*
 * Script: [event] - [widget_name]
 * Purpose: [description]
 * Dependencies: [list]
 */
```

### Responsive Sizing
```
Development: px values → Production: % values
```

---

**License**: MIT
**Last Updated**: 2025-11-22
**Repository**: https://github.com/secondsky/sap-skills
