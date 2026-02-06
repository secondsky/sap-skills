# SAP Analytics Cloud Planning Skill

Production-ready skill for building SAP Analytics Cloud (SAC) planning applications with Claude Code.

---

## Overview

This skill provides comprehensive guidance for SAP Analytics Cloud planning development, including:

- **Planning-enabled stories and applications**
- **Data actions and multi actions**
- **Version management workflows**
- **Calendar-based planning processes**
- **JavaScript API for planning automation**
- **Data locking and approval workflows**
- **Seamless Planning with SAP Datasphere** (New in 2025)
- **BPC Live Connection for BW on HANA** (New in 2025)
- **Value Driver Trees for what-if analysis** (New in 2025)
- **Data Action Tracing and debugging** (New in 2025)

---

## Keywords for Auto-Discovery

This skill should be triggered when users mention:

### SAP Analytics Cloud Planning
- SAP Analytics Cloud planning
- SAC planning
- SAP SAC planning
- SAC budget
- SAC forecast
- SAC planning model
- SAP Analytics Cloud budgeting
- SAP Analytics Cloud forecasting
- enterprise planning SAC

### Analytics Designer Planning
- Analytics Designer planning
- SAC analytics designer
- planning application SAC
- planning story SAC
- input form SAC
- data entry SAC
- planning table SAC

### Data Actions
- SAC data action
- SAP Analytics Cloud data action
- data action step
- copy step data action
- advanced formula SAC
- allocation step SAC
- data action parameter

### Multi Actions
- SAC multi action
- multi action SAP Analytics Cloud
- multi action step
- orchestrate planning
- planning workflow automation
- predictive step SAC
- API step multi action
- version management step

### Version Management
- SAC version management
- private version SAC
- public version SAC
- publish version SAC
- edit mode SAC
- version dimension
- publish as SAC

### Planning Workflows
- SAC calendar
- planning process SAC
- general task SAC
- review task SAC
- composite task SAC
- approval workflow SAC
- multi-level approval SAC
- planning calendar

### Data Locking
- SAC data locking
- data lock SAC
- lock planning data
- data locking task
- restricted mode SAC

### JavaScript Planning APIs
- getPlanning API
- PlanningModel API
- getMembers SAC
- setDimensionFilter SAC
- setUserInput SAC
- submitData SAC
- getPublicVersions
- getPrivateVersion
- Analytics Designer scripting
- SAC JavaScript

### Spreading and Allocation
- spreading SAC
- distribution SAC
- allocation SAC
- copy paste planning
- value distribution
- driver-based allocation

### Planning Model
- planning model SAC
- analytic model vs planning model
- Version dimension
- Date dimension
- planning enabled model

### S/4HANA Integration & Export
- SAC S/4HANA export
- ACDOCP export
- SAC data export service
- API_PLPACDOCPDATA_SRV
- planning data export S/4HANA
- SAC Cloud Connector
- export planning to ERP
- native planning S/4HANA integration
- legacy mode SAC
- ACDOCP table
- export planning data
- S/4HANA plan data

### Seamless Planning with Datasphere
- Seamless Planning SAC
- SAC Datasphere integration
- SAC HANA Cloud storage
- planning data persistence Datasphere
- tenant linkage SAC Datasphere
- unified data SAC
- cross-model planning Datasphere
- fact object Datasphere

### BPC Live Connection
- BPC live connection SAC
- BW on HANA planning
- BPC Embedded SAC
- planning sequence BPC
- BPC planning function
- master data planning BPC
- BPC input mode
- live data BPC SAC

### Value Driver Trees
- value driver tree SAC
- VDT SAC
- what-if analysis SAC
- simulation SAC planning
- driver node SAC
- calculated node VDT
- planning simulation SAC
- scenario analysis VDT

### Data Action Tracing
- data action tracing SAC
- debug data action
- tracepoint SAC
- trace mode data action
- troubleshoot data action
- data action debugging
- analyze data action execution

---

## File Structure

```
plugins/sap-sac-planning/
├── .claude-plugin/
│   └── plugin.json                   # Plugin manifest (v2.2.0)
├── agents/                           # Specialized subagents
│   ├── planning-model-architect.md   # Architecture decisions
│   ├── data-action-debugger.md       # Data action troubleshooting
│   └── planning-api-assistant.md     # JavaScript API help
├── commands/                         # Slash commands
│   ├── sac-planning-checklist.md     # Implementation checklist
│   ├── data-action-template.md       # Data action template
│   └── seamless-planning-guide.md    # Quick Seamless Planning guide
├── hooks/
│   └── hooks.json                    # Validation hooks
└── skills/sap-sac-planning/
    ├── .claude-plugin/plugin.json    # Skill manifest
    ├── SKILL.md                      # Main skill instructions
    ├── README.md                     # This file
    ├── references/                   # 24 reference files
    │   ├── api-reference.md          # Analytics Designer API
    │   ├── data-actions.md           # Data Actions & Multi Actions
    │   ├── planning-workflows.md     # Calendar, Tasks, Approvals
    │   ├── version-management.md     # Versions, Publishing
    │   ├── javascript-patterns.md    # Code snippets & patterns
    │   ├── s4hana-acdocp-export.md   # S/4HANA ACDOCP integration
    │   ├── seamless-planning-datasphere.md  # NEW: Datasphere integration
    │   ├── bpc-live-connection.md    # NEW: BPC Live Connection
    │   ├── value-driver-trees.md     # NEW: VDT configuration
    │   ├── data-action-tracing.md    # NEW: Tracing & debugging
    │   └── ... (14 more reference files)
    └── templates/                    # (Reserved for future templates)
```

---

## Key Features

### Comprehensive API Coverage
- Application class methods
- DataSource API (getMembers, setDimensionFilter)
- Planning API (getPlanning, setUserInput, submitData)
- PlanningModel API (createMembers, updateMembers, deleteMembers)
- Data Action and Multi Action execution

### Planning Workflow Support
- Calendar task configuration
- Multi-level approval workflows
- Data locking integration
- Task dependencies

### Ready-to-Use Patterns
- Member filtering by attribute
- Version management workflows
- Data entry validation
- Error handling patterns
- Performance optimization

---

## Usage Examples

### When to Use This Skill

**Planning Application Development**:
```
"Help me create a budget entry application in SAC"
"How do I enable planning on a table in Analytics Designer?"
"Create a planning model with Version and Date dimensions"
```

**Data Actions**:
```
"How do I create a copy data action in SAC?"
"Write an advanced formula for allocation"
"Set up a multi action to orchestrate planning"
```

**Version Management**:
```
"How do I publish a private version in SAC?"
"Help me set up version management workflow"
"Script to get all public versions"
```

**Planning Workflows**:
```
"Set up a budget approval workflow in SAC calendar"
"Configure multi-level approval tasks"
"Automate data locking after approval"
```

**JavaScript Scripting**:
```
"How do I use getPlanning() API?"
"Script to filter by member attribute"
"Submit planning data via JavaScript"
```

---

## Documentation Sources

This skill is based on official SAP documentation and verified community resources:

### Official SAP Documentation
- [SAP Analytics Cloud Help](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD)
- [Analytics Designer API Reference](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)
- [Planning Overview](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/cd897576c3344475a208c2f7a52f151e.html)
- [Data Actions](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/69a370e6cfd84315973101389baacde0.html)
- [Version Management](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/9d9056a13b764ad3aca8fef2630fcc00.html)

### SAP Learning
- [Planning Learning Journey](https://learning.sap.com/learning-journeys/leveraging-sap-analytics-cloud-functionality-for-enterprise-planning)

### Community Resources
- [Denis Reis - JavaScript API Code Snippets](https://www.denisreis.com/sap-analytics-cloud-javascript-api-code-snippets/)
- [SAP Community - Analytics Cloud](https://community.sap.com/topics/sap-analytics-cloud)
- [ZPARTNER - SAC Export to S/4HANA ACDOCP](https://www.zpartner.eu/sac-export-native-planning-to-sap-s-4hana-acdocp/) (S/4HANA Integration)

---

## Compatibility

- **SAP Analytics Cloud Version**: 2025.25+
- **Analytics Designer**: Supported
- **Optimized Story Experience**: Partial (some APIs differ)
- **Seamless Planning**: Requires HANA Cloud + Datasphere tenant linkage
- **BPC Live Connection**: Requires BW/4HANA or BW on HANA

---

## Maintenance

This skill follows quarterly update cycle:

- **Last Verified**: 2025-12-27
- **Next Review**: 2026-03-27
- **Plugin Version**: 2.2.0

### Update Checklist
1. Check Analytics Designer API Reference for new version
2. Review SAP What's New releases
3. Verify documentation links
4. Test code examples
5. Update version in SKILL.md metadata
6. Check Seamless Planning and BPC Live Connection changes
7. Verify Value Driver Trees API updates

---

## License

GPL-3.0 License - See repository LICENSE file.

---

## Contributing

Contributions welcome! Please follow the repository guidelines in CLAUDE.md and verify changes with the skill-review skill before submitting.

---

**Maintained by**: E.J.
**Repository**: [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
