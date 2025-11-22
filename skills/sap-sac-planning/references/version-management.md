# SAP Analytics Cloud - Version Management Reference

**Source**: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/9d9056a13b764ad3aca8fef2630fcc00.html
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Version Types Overview](#version-types-overview)
2. [Public Versions](#public-versions)
3. [Private Versions](#private-versions)
4. [Edit Mode](#edit-mode)
5. [Publishing Workflows](#publishing-workflows)
6. [Version API](#version-api)
7. [Best Practices](#best-practices)

---

## Version Types Overview

SAP Analytics Cloud uses versions to manage different views of planning data.

### Version Dimension

Planning models require a **Version** dimension with:
- At least one public version (e.g., Actual, Budget, Forecast)
- System-managed private versions per user

### Comparison

| Aspect | Public Version | Private Version |
|--------|----------------|-----------------|
| Visibility | All users with access | Creator only (unless shared) |
| Persistence | Permanent until deleted | Temporary (deleted when published/reverted) |
| Use Case | Official data | Draft, simulation, what-if |
| Editing | Creates edit mode | Direct editing |
| Publishing | Target of publish | Source of publish |

---

## Public Versions

Shared versions visible to all users with model access.

### Characteristics

- **Permanent**: Data persists until explicitly deleted
- **Shared**: Same data for all users
- **Controlled**: Changes require publish workflow
- **Reportable**: Used in official reports and dashboards

### Common Public Versions

| Version | Purpose |
|---------|---------|
| Actual | Historical data from source systems |
| Budget | Approved annual budget |
| Forecast | Rolling forecast updates |
| Plan | Working plan version |
| Prior_Year | Previous year comparison |

### Creating Public Versions

**From UI**:
1. Open Version Management panel
2. Click **Create Version**
3. Select **Public**
4. Enter ID and description
5. Choose to copy from existing or start blank

**Via Data Action**:
```
Step Type: Copy
Source: Existing version with data
Target: New version ID
```

### Deleting Public Versions

**Requirements**:
- Version must be empty (no data)
- User must have delete permission
- Version not in use by running processes

**Via UI**:
1. Open Version Management
2. Select version
3. Click **Delete** (only shows if empty)

---

## Private Versions

User-specific versions for draft work and simulations.

### Characteristics

- **Personal**: Only creator can see (unless shared)
- **Temporary**: Designed for draft work
- **Flexible**: Direct editing without publish
- **Isolated**: Changes don't affect others

### Creating Private Versions

**Method 1: Copy from Public**
1. Open Version Management
2. Select public version
3. Click **Copy to Private**
4. Enter name and description

**Method 2: Via API**
```javascript
// Get private version (creates if needed when editing)
var privateVersion = Table_1.getPlanning().getPrivateVersion();
```

**Method 3: Auto-Created**
When editing a public version, SAC automatically creates a private edit mode.

### Private Version Properties

| Property | Description |
|----------|-------------|
| ID | System-generated or user-defined |
| Description | User-provided description |
| Source Version | Public version it was copied from |
| Created Date | When private version was created |
| Last Modified | Most recent edit timestamp |

### Sharing Private Versions

Share with colleagues for collaboration:

1. Open Version Management → Private Versions
2. Select version → **More (...)** → **Share**
3. Choose access level:
   - **Read Only**: View but not edit
   - **Read and Write**: Full editing access
4. Select users or teams

### Private Version Limits

- System limit on number of private versions per user
- Inactive versions may be auto-cleaned
- Check tenant settings for specific limits

---

## Edit Mode

When editing a public version, SAC creates a temporary private copy.

### How Edit Mode Works

```
User starts editing public version
            ↓
System creates "edit mode" (private copy)
            ↓
User makes changes (only they can see)
            ↓
User publishes OR reverts
            ↓
Edit mode merged to public OR discarded
```

### Entering Edit Mode

**Automatic**: Edit any cell in a planning-enabled table on public version

**Via UI**:
1. Version Management → Public Versions
2. Select version → **Edit**

### Edit Mode Indicators

- Table shows "Edit Mode" indicator
- Version selector shows edit status
- Other users see original public data

### Exiting Edit Mode

**Publish**: Merge changes to public version
**Revert**: Discard all changes
**Auto-Discard**: After inactivity timeout

### Concurrent Editing

- Multiple users can have edit mode on same public version
- Each user's changes isolated until publish
- Conflicts resolved at publish time:
  - Last write wins for same cells
  - Different cells merge cleanly

---

## Publishing Workflows

### Publish (Merge to Source)

Merges private/edit mode changes back to original public version.

**Steps**:
1. Complete data entry in private version
2. Click **Publish** in Version Management
3. System validates changes
4. Valid changes merge to public
5. Private version/edit mode deleted

**Validation Rules**:
- Data access control (user can write to cells)
- Data locks (cells not locked)
- Validation rules (pass model rules)

**Important**: Invalid changes are discarded, not merged.

### Publish As (Create New Public)

Creates a new public version from private data.

**Steps**:
1. Complete data entry in private version
2. Click **Publish As** in Version Management
3. Enter new version ID and description
4. System creates new public version
5. Private version optionally deleted

**Use Cases**:
- Create new budget version from draft
- Save simulation as official scenario
- Archive point-in-time snapshot

### Revert (Discard Changes)

Discards all changes in private version/edit mode.

**Steps**:
1. Open Version Management
2. Select private version or edit mode
3. Click **Revert**
4. Confirm discarding changes
5. Private version/edit mode deleted

**When to Revert**:
- Started over with wrong assumptions
- Discovered errors requiring fresh start
- Simulation no longer needed

---

## Version API

### getPlanning() Version Methods

```javascript
// Get all public versions
var publicVersions = Table_1.getPlanning().getPublicVersions();

// Get specific public version
var budget = Table_1.getPlanning().getPublicVersion("Budget_2025");

// Get current private version
var privateVer = Table_1.getPlanning().getPrivateVersion();

// Get all user's private versions
var allPrivate = Table_1.getPlanning().getPrivateVersions();
```

### PlanningVersion Object

```javascript
// Version properties
console.log(version.id);          // "Budget_2025"
console.log(version.description); // "Annual Budget 2025"

// Check for unsaved changes
if (version.isDirty()) {
    console.log("Has unpublished changes");
}

// Publish changes
version.publish();

// Publish as new version
version.publishAs("Budget_2025_v2", "Revised Budget 2025");

// Revert changes
version.revert();
```

### Version Selection in Data Source

```javascript
// Filter to specific version
Table_1.getDataSource().setDimensionFilter("Version",
    "[Version].[parentId].&[public.Budget_2025]");

// Get current version filter
var versionFilter = Table_1.getDataSource().getDimensionFilters("Version");
```

### Version-Based Workflow Example

```javascript
// Complete workflow: create private, edit, publish
function createBudgetVersion(sourceVersion, targetVersion) {
    Application.showBusyIndicator();

    // 1. Copy source to private
    var source = Table_1.getPlanning().getPublicVersion(sourceVersion);
    // (User would edit data in table)

    // 2. Get private version after editing
    var privateVer = Table_1.getPlanning().getPrivateVersion();

    // 3. Publish as new version
    if (privateVer && privateVer.isDirty()) {
        privateVer.publishAs(targetVersion, "Created from " + sourceVersion);
        Application.showMessage("Version " + targetVersion + " created");
    }

    Application.hideBusyIndicator();
}
```

---

## Version Management Panel

### Accessing the Panel

**In Story**:
1. Open planning-enabled story
2. Click **Version Management** in toolbar

**In Analytics Designer**:
1. Add Version Management panel programmatically
2. Or create custom UI with API calls

### Panel Sections

**Public Versions**:
- List all public versions
- Create, edit, delete options
- Publish target selection

**Private Versions**:
- User's private versions
- Publish, share, delete options
- Copy from public option

**Edit Mode**:
- Current edit mode status
- Publish or revert options
- Time since last save

### Version Operations

| Operation | Availability | Requirements |
|-----------|-------------|--------------|
| Create Public | Public section | Model write access |
| Delete Public | Public section | Empty version, delete permission |
| Edit Public | Public section | Write access |
| Copy to Private | Public section | Read access |
| Publish | Private/Edit | Write access to target |
| Publish As | Private section | Create version permission |
| Share Private | Private section | Share permission |
| Revert | Private/Edit | None (own changes only) |

---

## Best Practices

### Version Naming Conventions

```
Public Versions:
  Actual              - Historical/imported data
  Budget_YYYY         - Annual budget by year
  Forecast_YYYY_QN    - Quarterly forecast
  Plan_YYYY_MM        - Monthly plan version

Private Versions:
  [User]_Draft_[Date] - Personal drafts
  WhatIf_[Scenario]   - Simulation scenarios
```

### Version Lifecycle

```
1. Planning Cycle Starts
   └── Create new Budget_YYYY version (empty or seeded)

2. Data Entry Phase
   └── Users work in private versions
   └── Submit for review

3. Review Phase
   └── Reviewers check private versions
   └── Approve or reject

4. Finalization
   └── Publish approved to public
   └── Lock public version
   └── Clean up private versions

5. Reporting
   └── Use public version for reports
   └── Compare to Actual version
```

### Performance Considerations

1. **Limit active versions** - Delete unused versions
2. **Clean private versions** - Encourage users to publish or revert
3. **Use version filters** - Don't load all versions in reports
4. **Archive old versions** - Export and delete historical versions

### Security Recommendations

1. **Version-level access** - Control who can see/edit each version
2. **Audit changes** - Track who published what
3. **Backup before delete** - Export version data first
4. **Lock approved versions** - Prevent accidental changes

### Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Too many private versions | Set cleanup policy, encourage publish |
| Orphaned edit modes | Auto-timeout after inactivity |
| Conflicting publishes | Communicate publishing schedule |
| Deleting needed versions | Implement approval for deletion |
| Version naming chaos | Enforce naming conventions |

---

## Troubleshooting

### "Cannot publish - validation failed"

**Causes**:
- Data access control blocking cells
- Data lock on target cells
- Model validation rules failing

**Solution**:
- Check data access permissions
- Verify lock status
- Review validation rule messages

### "Version not appearing"

**Causes**:
- No access to version
- Filter hiding version
- Version recently deleted

**Solution**:
- Check version permissions
- Remove version filters
- Refresh model metadata

### "Edit mode lost"

**Causes**:
- Session timeout
- System cleanup
- Another user published

**Solution**:
- Save frequently
- Check auto-save settings
- Coordinate with other users

### "Cannot delete version"

**Causes**:
- Version contains data
- Version in use by process
- Insufficient permissions

**Solution**:
- Clear version data first
- Complete or cancel processes
- Request delete permission

---

**Documentation Links**:
- Version Management: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/9d9056a13b764ad3aca8fef2630fcc00.html
- Public Versions: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/b6e3d093988e4c3eba7eb6c1c110e954.html
- Private Versions: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/1a011f8041a84e109a3b6bf8c1c81bc1.html
- Sharing Versions: https://help.sap.com/doc/00f68c2e08b941f081002fd3691d86a7/2023.20/en-US/e763e27e0f4c419488381f77937a0ff1.html
