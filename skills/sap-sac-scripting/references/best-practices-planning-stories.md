# Best Practices for Planning Stories in SAP Analytics Cloud

Architectural patterns and user experience guidelines for building professional planning applications with multi-story navigation.

**Source**: [SAP PRESS Blog - Best Practices for Planning Stories in SAP Analytics Cloud](https://blog.sap-press.com/best-practices-for-planning-stories-in-sap-analytics-cloud)  
**Book**: *Application Development with SAP Analytics Cloud* by Josef Hampp and Jan Lang (SAP PRESS, 2024)

---

## Table of Contents

1. [Entry Point Design](#entry-point-design)
2. [Multi-Story Architecture](#multi-story-architecture)
3. [Story Navigation via Scripting](#story-navigation-via-scripting)
4. [User Assistance Patterns](#user-assistance-patterns)
5. [Guided Process Implementation](#guided-process-implementation)
6. [Button Design Guidelines](#button-design-guidelines)

---

## Entry Point Design

Create an overview/start page as the single entry point for users into the planning process.

### Structure

A well-designed entry page should be **structured and not overloaded**:

```
┌─────────────────────────────────────────────────────────┐
│  KPI TILES (Top Section)                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ Metric1 │ │ Metric2 │ │ Metric3 │ │ Metric4 │       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
├─────────────────────────────────────────────────────────┤
│  NAVIGATION SECTIONS (Visually Separated)               │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────┐│
│  │ Configure App   │ │ Plan FTE        │ │ Reports    ││
│  │ & Parameters    │ │ Demands & Costs │ │            ││
│  │                 │ │                 │ │            ││
│  │ > Settings      │ │ > Workforce     │ │ > Summary  ││
│  │ > Parameters    │ │ > Budget        │ │ > Details  ││
│  └─────────────────┘ └─────────────────┘ └────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Key Elements

| Element | Purpose |
|---------|---------|
| KPI Tiles | Display most important key figures at a glance |
| Navigation Areas | Group related planning functions (3-4 max) |
| Jump Links | Text fields with onClick scripts to navigate to sub-stories |
| Visual Separation | Clear boundaries between functional areas |

### Benefits

- Provides orientation for users in complex planning processes
- Reduces cognitive load with organized navigation
- Enables easy access to all planning phases from one location

---

## Multi-Story Architecture

Separate individual planning steps into distinct stories for simplified maintenance.

### Folder Organization

Store all related stories in a dedicated folder structure:

```
SAC File System/
└── Planning_Application_2024/
    ├── 00_Entry_Point.story
    ├── 01_Application_Configuration.story
    ├── 02_Plan_FTE_Demands.story
    ├── 03_Plan_Costs.story
    ├── 04_Summary_Report.story
    └── 05_Detail_Report.story
```

### Benefits

| Benefit | Description |
|---------|-------------|
| **Easier Maintenance** | Update one story without affecting others |
| **Team Collaboration** | Multiple developers can work on different stories |
| **Version Control** | Track changes at story level |
| **Performance** | Smaller stories load faster |
| **Testing** | Test individual planning steps independently |

### Implementation Guidelines

1. Create one story per planning phase or major step
2. Use consistent naming with numeric prefixes for ordering
3. Share data sources across stories using the same model
4. Implement consistent navigation patterns across all stories

---

## Story Navigation via Scripting

Use scripting instead of standard hyperlinks for cross-story navigation with URL parameters.

### Full Navigation Script

Add this script to a Script Object for reuse across your entry point:

```javascript
/**
 * Opens a target story with specified display mode and page
 * @param {string} arg_StoryIdPageIndex - Format: "storyId|pageIndex"
 * @param {string} arg_displayMode - "view" or "edit"
 */
function navigateToStory(arg_StoryIdPageIndex, arg_displayMode) {
    var delimiter_storyIdPageIndex = "|";
    
    // Extract story ID and page index from the combination provided
    var storyId = arg_StoryIdPageIndex.substring(
        0, 
        arg_StoryIdPageIndex.indexOf(delimiter_storyIdPageIndex)
    );
    var pageIndex = arg_StoryIdPageIndex.substring(
        arg_StoryIdPageIndex.indexOf(delimiter_storyIdPageIndex) + 1
    );
    
    // Create and fill array of URL parameters
    var urlParameters = ArrayUtils.create(Type.UrlParameter);
    urlParameters.push(UrlParameter.create("mode", arg_displayMode));
    urlParameters.push(UrlParameter.create("page", pageIndex));
    
    // Optional: Add custom URL parameters
    // urlParameters.push(UrlParameter.create("p_myParam", "value"));
    
    // Open the target story
    NavigationUtils.openStory(storyId, "", urlParameters, false);
}
```

### Usage in onClick Event

```javascript
// onClick of txt_navigate_to_workforce
// Story ID from the target story's URL, page index 0-based
ScriptObject_Navigation.navigateToStory("STORY123ABC|0", "view");
```

### Storing Story IDs

Create a Script Object to store story IDs for easy maintenance:

```javascript
// ScriptObject_StoryRegistry
var STORIES = {
    CONFIGURATION: "ABC123DEF|0",
    WORKFORCE_PLAN: "GHI456JKL|0",
    COST_PLAN: "MNO789PQR|0",
    SUMMARY_REPORT: "STU012VWX|1",
    DETAIL_REPORT: "YZA345BCD|0"
};

function getStoryReference(storyName) {
    return STORIES[storyName];
}
```

---

## User Assistance Patterns

Implement consistent help features across all planning stories.

### Sidebar Structure

Include a sidebar on every story (except entry page) with:

```
┌──────────────────────┐
│  FILTERS             │
│  ├─ Year: [2024 ▼]   │
│  ├─ Region: [All ▼]  │
│  └─ [Apply Filters]  │
├──────────────────────┤
│  NAVIGATION          │
│  ├─ ← Back to Entry  │
│  ├─ → Next Step      │
│  └─ ↺ Home           │
├──────────────────────┤
│  INSTRUCTIONS        │
│  Step 1: Select...   │
│  Step 2: Enter...    │
│  Step 3: Save...     │
├──────────────────────┤
│  EXTERNAL LINKS      │
│  ├─ 📖 Documentation │
│  ├─ ❓ Ask Question  │
│  └─ ℹ️ Process Info  │
└──────────────────────┘
```

### Step-by-Step Instructions

Provide clear instructions directly in the sidebar:

```
INSTRUCTIONS
────────────────────
Step 1: Select the planning version
        from the dropdown above

Step 2: Enter FTE values in the table
        for each cost center

Step 3: Review the calculated costs
        in the summary section

Step 4: Click "Save" to store your
        changes

Step 5: Click "Submit" when ready
        for approval
```

### Benefits

- Ensures consistent user experience across all stories
- Reduces support requests with inline help
- Enables occasional users to complete planning correctly

---

## Guided Process Implementation

Implement a "Guide Me!" button that opens a focused popup with step-by-step guidance.

### Popup Design

```
┌─────────────────────────────────────┐
│  ✨ Planning Guide                 X│
├─────────────────────────────────────┤
│                                     │
│  Welcome to Workforce Planning!     │
│                                     │
│  Follow these steps:                │
│                                     │
│  ☐ 1. Select your cost center       │
│  ☐ 2. Choose the planning period    │
│  ☐ 3. Enter FTE values              │
│  ☐ 4. Review calculated costs       │
│  ☐ 5. Submit for approval           │
│                                     │
│  ┌─────────┐  ┌─────────────────┐   │
│  │ Close   │  │ Start Planning  │   │
│  └─────────┘  └─────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Implementation

1. Create a Popup widget with header enabled
2. Add text widgets with step instructions
3. Add navigation buttons
4. Trigger popup from "Guide Me!" button:

```javascript
// onClick of btn_guide_me
Popup_Guide.open();
```

### Dynamic Step Highlighting (Advanced)

```javascript
// Track current step in global variable
// GlobalVar_currentStep (Integer)

function highlightCurrentStep() {
    // Reset all step indicators
    txt_step1.setStyle("opacity", "0.5");
    txt_step2.setStyle("opacity", "0.5");
    txt_step3.setStyle("opacity", "0.5");
    
    // Highlight current step
    switch (GlobalVar_currentStep) {
        case 1:
            txt_step1.setStyle("opacity", "1.0");
            break;
        case 2:
            txt_step2.setStyle("opacity", "1.0");
            break;
        case 3:
            txt_step3.setStyle("opacity", "1.0");
            break;
    }
}
```

---

## Button Design Guidelines

Use color coding to make button functions immediately clear to users.

### Color Conventions

| Color | Usage | Examples |
|-------|-------|----------|
| **Green** | Positive/Confirm actions | Save, Submit, Approve, Publish |
| **Red** | Negative/Destructive actions | Delete, Reject, Revert, Cancel |
| **Blue** | Navigation/Neutral actions | Next, Back, View, Export |
| **Gray** | Secondary/Disabled actions | Reset, Clear, Close |

### Button Layout Example

```
┌─────────────────────────────────────────────┐
│  ACTION BUTTONS                             │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 🔴 Reset │  │ 🔵 Export │  │ 🟢 Save  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

### Implementation Tips

1. Use consistent button sizing across the application
2. Group related buttons together
3. Place primary action (usually green) on the right
4. Add confirmation dialogs for destructive actions:

```javascript
// onClick of btn_delete
var confirmed = Application.showConfirmDialog(
    "Confirm Delete",
    "Are you sure you want to delete this version?",
    "Delete",
    "Cancel"
);

if (confirmed) {
    // Perform delete operation
    planning.getPrivateVersion("draft").delete();
}
```

---

## Summary

| Best Practice | Key Takeaway |
|---------------|--------------|
| **Entry Point** | Single overview page with KPIs and organized navigation |
| **Multi-Story** | Separate stories per planning phase, stored in folders |
| **Navigation** | Use scripting with `NavigationUtils.openStory()` |
| **User Assistance** | Consistent sidebar with filters, instructions, links |
| **Guided Process** | "Guide Me!" popup with step-by-step workflow |
| **Buttons** | Color-coded: Green=positive, Red=negative, Blue=neutral |

---

**License**: MIT  
**Last Updated**: 2025-11-22  
**Repository**: https://github.com/secondsky/sap-skills
