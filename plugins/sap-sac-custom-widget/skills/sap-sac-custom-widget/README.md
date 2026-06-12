# SAP SAC Custom Widget Plugin

Comprehensive Claude Code plugin for developing custom widgets in SAP Analytics Cloud (SAC). Includes specialized agents, slash commands, validation hooks, and production-ready templates.

## Plugin Components

### Agents

| Agent | Purpose | Trigger Examples |
|-------|---------|------------------|
| **widget-architect** | Design widget structure, metadata, and integration patterns | "design custom widget", "plan widget architecture", "widget metadata design" |
| **widget-debugger** | Troubleshoot loading, data binding, CORS, and runtime issues | "widget won't load", "CORS error", "data not binding", "debug widget" |
| **widget-api-assistant** | Write JavaScript widget code, lifecycle functions, API integrations | "write widget code", "implement lifecycle functions", "widget events" |

### Commands

| Command | Usage | Description |
|---------|-------|-------------|
| `/widget-validate` | `/widget-validate [file]` | Validate widget.json schema and widget.js structure |
| `/widget-generate` | `/widget-generate` | Interactively generate widget scaffold with JSON + JS |
| `/widget-lint` | `/widget-lint [file]` | Performance, security, and best practices analysis |

### Templates

Ready-to-use scaffolds in `templates/` directory:

| Template | Description |
|----------|-------------|
| `basic-widget.js` | Minimal Web Component with all lifecycle functions |
| `data-bound-chart.js` | ECharts widget with SAC data binding |
| `styling-panel.js` | Runtime customization panel |
| `widget.json-minimal` | Bare-minimum metadata |
| `widget.json-complete` | Full-featured metadata with all options |

### Validation Hooks

Automatic quality checks on Write/Edit operations:
- **widget.json**: Required fields, tag naming, property types, data binding config
- **widget.js**: Lifecycle functions, Shadow DOM, propertiesChanged dispatch
- **Performance**: Resize debouncing, chart disposal, XSS prevention
- **Context Reminders**: Template suggestions, command recommendations

---

## Keywords for Discovery

**Primary Keywords**: SAP Analytics Cloud, SAC, custom widget, custom widget development, SAC widget, Analytics Designer widget, Optimized Story Experience widget

**Technical Keywords**: Web Component SAC, JavaScript widget, JSON metadata, widget.json, widget lifecycle, onCustomWidgetBeforeUpdate, onCustomWidgetAfterUpdate, onCustomWidgetResize, onCustomWidgetDestroy, connectedCallback, Shadow DOM widget

**Data Keywords**: SAC data binding, widget data binding, dataBindings feeds, getDataBinding, getResultSet, getResultMember, ResultSet, dimension feed, measure feed, mainStructureMember

**UI Keywords**: styling panel, builder panel, design time panel, widget properties, propertiesChanged event, dispatchEvent, CustomEvent

**Integration Keywords**: ECharts SAC, D3.js SAC, Chart.js SAC, third party library SAC, Apache ECharts widget

**Hosting Keywords**: SAC hosted widget, GitHub Pages widget, AWS S3 widget, Azure widget hosting, widget hosting, external hosting

**Security Keywords**: integrity hash, SHA256 integrity, widget security, CORS SAC, ignoreIntegrity, subresource integrity

**Troubleshooting Keywords**: widget loading error, couldn't load custom widget, integrity check failed, widget debugging, console.log widget, DevTools widget

**Sample Widgets Keywords**: SAC community widgets, custom widget samples, ECharts widget samples, ready-to-use SAC widgets, Funnel Chart widget, Sankey Chart widget, KPI Ring widget, Gantt Chart SAC

## Use Cases

This skill should be used when:
- Creating custom visualizations for SAP Analytics Cloud
- Building interactive components for SAC stories
- Integrating third-party charting libraries (ECharts, D3.js, Chart.js)
- Implementing custom input controls for Analytics Designer
- Developing data-bound widgets with custom data visualization
- Adding styling panels for user customization
- Troubleshooting custom widget loading or data binding issues
- Migrating widgets between SAC tenants
- Setting up widget hosting infrastructure

## Requirements

- SAP Analytics Cloud tenant with:
  - Optimized Story Experience, OR
  - Analytics Designer
- JavaScript/Web Components knowledge
- Hosting solution (SAC-hosted, GitHub Pages, or web server)

## Features

- Complete JSON metadata schema reference
- Lifecycle function documentation and patterns
- Data binding configuration and usage
- Styling and builder panel implementation
- Multiple hosting options (SAC-hosted, GitHub, external)
- Security best practices (integrity hash, CORS)
- Common error solutions and debugging techniques
- 6 ready-to-use widget templates
- ECharts integration guide
- Widget Add-On feature (QRC Q4 2023+)
- Performance optimization guidelines
- Custom types and script API types

## Version Information

| Property | Value |
|----------|-------|
| Plugin Version | 2.2.2 |
| Skill Version | 2.1.0 |
| SAC Version | 2026.8 |
| Last Verified | 2026-06-12 |
| Token Savings | ~75% |
| Errors Prevented | 25+ |
| Agents | 3 |
| Commands | 3 |
| Templates | 5 |

## Official Documentation

- [SAP Custom Widget Developer Guide](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html)
- [Custom Widget Developer Guide (PDF)](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Widget API (PDF, 2025)](https://help.sap.com/doc/7e0efa0e68dc45958e568699f8226ad7/cloud/en-US/SAC_Widget_API_en.pdf)
- [Analytics Designer API Reference](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)

## Sample Repositories

- [SAP Samples - Custom Widgets](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)
- [SAP Custom Widget GitHub](https://github.com/SAP-Custom-Widget)

## Community Resources

- [Custom Widget Hands-on Guide](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-analytics-cloud-custom-widget-hands-on-guide/ba-p/13573631)
- [Data Binding Announcement](https://blogs.sap.com/2022/05/25/announcing-custom-widgets-data-binding-in-sap-analytics-cloud-analytics-designer/)
- [Widget Add-on Feature](https://community.sap.com/t5/technology-blog-posts-by-sap/announcing-the-new-sap-analytics-cloud-feature-widget-add-on/ba-p/13575788)
- [Hosting Custom Widgets in SAC](https://community.sap.com/t5/technology-blogs-by-sap/hosting-and-uploading-custom-widgets-resource-files-into-sap-analytics/ba-p/13563064)

## License

GPL-3.0

---

**Maintainer**: SAP Skills Team | [Repository](https://github.com/secondsky/sap-skills)
