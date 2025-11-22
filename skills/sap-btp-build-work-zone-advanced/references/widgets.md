# Widgets Development Guide

Complete guide for using and configuring widgets in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## Overview

Widgets are containers for various content types such as video, feeds, photos, and many other content types. They are added to workpages using the workpage editor.

## Widget Management

### Adding Widgets

1. Open workpage in edit mode
2. Select widget type from palette
3. Configure widget content
4. Adjust style and layout settings
5. Save changes

### Widget Operations

- Insert widgets
- Remove widgets
- Edit widget content
- Reposition widgets

---

## Standard Widget Types (9 Official)

The following widgets are officially documented in SAP Build Work Zone, advanced edition:

### Content Display Widgets

| Widget | Description |
|--------|-------------|
| Text | Rich text content display |
| Image | Display single image with optional links |
| Feed | Activity feeds from workspaces |
| Content | Document/file display |
| Forum | Discussion threads and topics |
| Knowledge Base | Knowledge articles and wikis |

### Interactive Widgets

| Widget | Description |
|--------|-------------|
| Action | Quick action buttons |
| Event | Calendar events display |
| UI Integration Cards | SAPUI5-based data cards |

---

## Additional Widgets (Widget Builder/Custom)

The following widgets may be available via Widget Builder or as custom extensions. Verify availability in your tenant:

| Widget | Availability |
|--------|-------------|
| Multimedia | Custom/Widget Builder |
| Slideshow | Custom/Widget Builder |
| Poll | Custom/Widget Builder |
| Search | Custom/Widget Builder |
| People | Custom/Widget Builder |
| Workspaces | Custom/Widget Builder |
| Recommendation | Custom/Widget Builder |
| Recent Items | Custom/Widget Builder |
| Tag Cloud | Custom/Widget Builder |
| Name | Custom/Widget Builder |
| Business Record | Requires external integration |
| Notification | Custom/Widget Builder |
| Rotating Banner | Custom/Widget Builder |
| Tool Content | Custom/Widget Builder |
| External Content | Custom/Widget Builder |
| Application Group | Custom/Widget Builder |

> **Note**: Widget availability depends on your SAP Build Work Zone edition and configuration. Check Administration Console → UI Integration for available widgets in your tenant.

---

## Widget Styling

### Style Options

| Option | Description |
|--------|-------------|
| Follow page setting | Inherit page styling |
| Card style | Colors, borders, rounded corners |
| Without card styling | Transparent background |
| Custom color | Text widget specific |

### Image Widget Sizes

Recommended widths for optimal quality:

| Columns | Recommended Width |
|---------|------------------|
| 1 | 188 pixels |
| 2 | 396 pixels |
| 3 | 604 pixels |
| 4 | 812 pixels |
| 5 | 1020 pixels |
| 6 | 1180 pixels |

---

## Widget Limitations

### Feed Widget
- Only ONE feed widget per workpage
- Additional feeds require separate workpages

### Performance Considerations
- Limit total widgets per page
- Consider mobile performance
- Optimize image sizes

---

## Widget Configuration

### Common Settings

All widgets share common configuration options:
- Title/header
- Visibility settings
- Size/dimensions
- Border/spacing

### Widget-Specific Settings

Each widget type has unique configuration:

**Image Widget**:
- Image source
- Alt text
- Link destination
- Size constraints

**Text Widget**:
- Rich text formatting
- Background color
- Text alignment
- Link embedding

**Feed Widget**:
- Feed source
- Display count
- Refresh interval
- Filter options

---

## Custom Widgets

### Widget Builder

Administrators can create custom HTML widgets:

1. Navigate to Administration Console
2. Go to UI Integration > Widget Builders
3. Create new widget definition
4. Configure HTML/CSS/JS
5. Deploy widget

### Custom Widget Use Cases

- Embed external dashboards
- Custom data visualizations
- Third-party integrations
- Branded content displays

---

## Best Practices

### Widget Selection

1. **Match content to widget** - Use appropriate widget for content type
2. **Consider audience** - Select widgets users need
3. **Balance density** - Don't overcrowd pages
4. **Test responsiveness** - Verify mobile display

### Widget Organization

1. **Logical grouping** - Related widgets together
2. **Visual hierarchy** - Important content prominent
3. **Consistent styling** - Maintain design consistency
4. **Accessibility** - Consider all users

---

**Documentation Links**:
- Widgets: https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/about-widgets
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced
