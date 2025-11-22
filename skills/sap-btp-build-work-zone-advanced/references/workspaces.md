# Workspaces and Workpages Guide

Complete guide for creating and managing workspaces and workpages in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## Workspaces Overview

A workspace is a collaborative environment designed to encourage users to share and communicate about specific subjects, projects, events, goals, or teams.

## Workspace Features

- Dedicated pages and feeds
- Member management
- Content sharing
- Task collaboration
- Business record integration
- Sub-workspaces for nested organization

---

## Workspace Roles

| Role | Permissions |
|------|-------------|
| Owner | Full control, created automatically for workspace creator |
| Administrator | Manage members, settings, content |
| Member | Participate, create content, collaborate |
| Viewer | Read-only access |

---

## Navigation and Organization

### Workspaces Menu

Users can access:
- Recently viewed workspaces
- Favorite workspaces
- All available workspaces
- Managed workspaces (filter)

---

## Administrative Areas

Administrative areas provide organizational grouping for workspaces.

### Definition

A designated space for subject matter experts to manage content and interact within their lines of business.

### Role Structure

| Role | Scope |
|------|-------|
| Company Administrator | Full platform access |
| Area Administrator | Limited to specific area |

### Creating Administrative Areas

1. Navigate to Administration Console
2. Select "New Area"
3. Configure area settings
4. Assign area administrators
5. Define which settings area admins can modify

### Area Operations

- **Ordering**: Drag areas to reorder display position
- **Navigation**: Access via Action menu → "Go To Area"
- **Deletion**: Removes area; workspaces retained but dissociated

### Permission Configuration

Control which administrative functions are available to area administrators at area creation time.

---

## Sub-Workspaces

Sub-workspaces enable nested workspace organization.

### Creation Requirements

- Only workspace administrators can create sub-workspaces
- Add "Sub-Workspaces" navigation tab to enable

### Membership Rules

| Rule | Description |
|------|-------------|
| Subset | Sub-workspace members must be main workspace members |
| Automatic Removal | Removing from main workspace removes from sub-workspaces |
| Automatic Addition | Inviting to sub-workspace adds to main workspace |

### Administration

- Delegate sub-workspace administration to other members
- Promote members to sub-workspace administrators

### Configuration

When creating sub-workspaces:
- Select workspace template
- Configure settings same as main workspace
- Maintain consistent structure

---

## Creating Workspaces

### From Scratch

1. Navigate to Workspaces menu
2. Select "Create Workspace"
3. Configure settings:
   - Name and description
   - Privacy settings
   - Member permissions
4. Create workspace

### From Template

1. Navigate to Workspaces menu
2. Select "Create Workspace"
3. Choose template
4. Customize as needed
5. Create workspace

---

## Workpages

### Overview

Workpages are pages within workspaces where users add content. They use a grid layout with sections containing up to six columns.

### Layout Structure

```
Workpage
├── Section 1
│   ├── Column 1 (widgets)
│   ├── Column 2 (widgets)
│   └── ...up to 6 columns
├── Section 2
│   └── ...
└── ...
```

### Creating Workpages

1. Navigate to workspace
2. Select "Add Page"
3. Choose template or blank layout
4. Configure sections and columns
5. Add widgets and content
6. Publish or save as draft

### Nested Workpages

Workpages can be nested hierarchically:
- Exist in site menus
- Nest under other workpages
- Create logical content grouping

---

## Workpage Editor

### Capabilities

- Add apps, cards, and widgets
- Configure sections and columns
- Adjust widget settings
- Design styling options

### Content Options

- UI Integration Cards
- Widgets (24 types)
- Applications
- Custom content

### Publishing Options

| Option | Description |
|--------|-------------|
| Publish | Make visible to workspace members |
| Save as Draft | Save for later completion |

---

## Workspace Settings

### Privacy Settings

| Type | Description |
|------|-------------|
| Public | Visible to all users |
| Private | Visible to members only |
| Secret | Hidden from non-members |

### Member Management

- Add/remove members
- Assign roles
- Configure permissions
- Manage invitations

### Feature Enablement

Enable/disable workspace features:
- Feeds
- Content creation
- Forums
- Knowledge base
- Events

---

## Business Records Integration

If integrated with external business systems (e.g., SAP Cloud for Customer):

### Supported Record Types
- Accounts
- Opportunities
- Service tickets

### Capabilities
- Browse and search records
- Create dedicated workspaces for records
- Feature records in workspaces
- Post comments and create tasks
- Tag and like records

### Access Requirements
Users must have appropriate access rights in integrated external systems.

### External User Limitations
External users may:
- View records in authorized workspaces
- Comment on records
- Feature records in workspaces

---

## Best Practices

### Workspace Design

1. **Clear purpose** - Define workspace goal
2. **Logical structure** - Organize workpages logically
3. **Appropriate permissions** - Limit access as needed
4. **Active moderation** - Maintain content quality

### Workpage Design

1. **Grid efficiency** - Use appropriate column counts
2. **Widget organization** - Group related content
3. **Mobile consideration** - Test on mobile devices
4. **Performance** - Limit widgets per page

### Sub-Workspace Usage

1. **Clear hierarchy** - Logical parent-child relationships
2. **Appropriate scope** - Don't over-nest
3. **Consistent membership** - Align with main workspace

---

**Documentation Links**:
- Workspaces: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced
