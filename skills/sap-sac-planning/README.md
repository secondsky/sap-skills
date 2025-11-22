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

---

## File Structure

```
sap-sac-planning/
├── SKILL.md                          # Main skill instructions
├── README.md                         # This file
├── PROGRESS_TRACKING.md              # Documentation coverage tracking
├── references/
│   ├── api-reference.md              # Complete Analytics Designer API
│   ├── data-actions.md               # Data Actions & Multi Actions
│   ├── planning-workflows.md         # Calendar, Tasks, Approvals
│   ├── version-management.md         # Versions, Publishing
│   └── javascript-patterns.md        # Code snippets & patterns
└── templates/                        # (Reserved for future templates)
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

---

## Compatibility

- **SAP Analytics Cloud Version**: 2025.14+
- **Analytics Designer**: Supported
- **Optimized Story Experience**: Partial (some APIs differ)

---

## Maintenance

This skill follows quarterly update cycle:

- **Last Verified**: 2025-11-22
- **Next Review**: 2026-02-22

### Update Checklist
1. Check Analytics Designer API Reference for new version
2. Review SAP What's New releases
3. Verify documentation links
4. Test code examples
5. Update version in SKILL.md metadata

---

## License

MIT License - See repository LICENSE file.

---

## Contributing

Contributions welcome! Please follow the repository guidelines in CLAUDE.md and verify changes with the skill-review skill before submitting.

---

**Maintained by**: SAP Skills Maintainers
**Repository**: https://github.com/secondsky/sap-skills
