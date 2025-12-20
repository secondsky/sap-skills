# SAP Skills Marketplace

Welcome to the **sap-skills** marketplace - a curated collection of production-tested SAP skills for Claude Code CLI.

## Quick Start

### Installation

**Step 1: Add the marketplace**

```bash
/plugin marketplace add https://github.com/secondsky/sap-skills
```

**Step 2: Install skills**

```bash
# Install a single skill
/plugin install sap-cap-capire@sap-skills
```

**Step 3: Use the skills**

Once installed, Claude Code automatically discovers and uses skills when relevant:

```bash
# Example 1: CAP Development
User: "Create a new CAP service with Node.js"
Claude: [Automatically uses sap-cap-capire skill]

# Example 2: BTP Deployment
User: "Deploy my application to SAP BTP Cloud Foundry"
Claude: [Uses sap-btp-developer-guide and sap-btp-cloud-platform]

# Example 3: Fiori App
User: "Build a Fiori Elements app for Sales Orders"
Claude: [Uses sap-fiori-tools and sapui5 skills]
```

---

## Available Skills (33)

### SAP ABAP (2 skills)

| Skill | Description |
|-------|-------------|
| `sap-abap` | Comprehensive ABAP development for SAP systems including ABAP SQL, OOP, RAP, CDS views, EML statements, and ABAP Cloud |
| `sap-abap-cds` | SAP ABAP CDS (Core Data Services) for data modeling, view development, annotations, associations, and access control |

### SAP AI & Machine Learning (3 skills)

| Skill | Description |
|-------|-------------|
| `sap-ai-core` | SAP AI Core and AI Launchpad for enterprise AI/ML workloads, generative AI models (GPT, Claude, Gemini), RAG, embeddings, and orchestration |
| `sap-cloud-sdk-ai` | SAP Cloud SDK for AI integration with JavaScript/TypeScript and Java - chat completion, embeddings, streaming, function calling |
| `sap-hana-ml` | SAP HANA Machine Learning Python Client (hana-ml) for in-database ML capabilities |

### SAP Analytics Cloud (3 skills)

| Skill | Description |
|-------|-------------|
| `sap-sac-custom-widget` | SAC Custom Widget development with Web Components, JSON metadata, lifecycle functions, and Widget Add-Ons |
| `sap-sac-planning` | SAC planning applications including data actions, multi actions, version management, and planning workflows |
| `sap-sac-scripting` | SAC scripting for Analytics Designer and Optimized Story Experience - DataSource API, widgets, events, debugging |

### SAP BTP Platform (14 skills)

| Skill | Description |
|-------|-------------|
| `sap-btp-best-practices` | BTP best practices for enterprise cloud architecture, account management, security, deployment, and operations |
| `sap-btp-build-work-zone-advanced` | SAP Build Work Zone advanced edition - workspaces, UI Integration Cards, content packages, Microsoft 365 integration |
| `sap-btp-business-application-studio` | SAP Business Application Studio (BAS) cloud IDE - dev spaces, MTA deployment, Git, runtime configuration |
| `sap-btp-cias` | SAP BTP Cloud Integration Automation Service for guided integration workflows and scenario execution |
| `sap-btp-cloud-logging` | SAP Cloud Logging service - log ingestion, OpenTelemetry observability, metrics, and traces |
| `sap-btp-cloud-platform` | Comprehensive BTP reference for Cloud Foundry, Kyma, ABAP environment, services, and deployment |
| `sap-btp-cloud-transport-management` | Cloud Transport Management for transport landscapes, import queues, MTA deployment, and change management |
| `sap-btp-connectivity` | BTP Connectivity including Destination Service, Cloud Connector, Connectivity Proxy, and principal propagation |
| `sap-btp-developer-guide` | BTP application development using CAP (Node.js/Java) or ABAP Cloud with CI/CD and observability |
| `sap-btp-integration-suite` | SAP Integration Suite - Cloud Integration (iFlows), API Management, Event Mesh, Edge Integration Cell |
| `sap-btp-intelligent-situation-automation` | BTP Intelligent Situation Automation for situation-based automation between S/4HANA and BTP |
| `sap-btp-job-scheduling` | BTP Job Scheduling Service for scheduled jobs development, configuration, and operations |
| `sap-btp-master-data-integration` | SAP Master Data Integration (MDI) service - tenant setup, distribution models, SOAP APIs, ODM integration |
| `sap-btp-service-manager` | SAP Service Manager - service instances, bindings, brokers across Cloud Foundry, Kyma, and Kubernetes |

### SAP CAP (1 skill)

| Skill | Description |
|-------|-------------|
| `sap-cap-capire` | SAP Cloud Application Programming Model (CAP) - CDS models, services, HANA/SQLite/PostgreSQL, BTP deployment |

### SAP Datasphere (1 skill)

| Skill | Description |
|-------|-------------|
| `sap-datasphere` | SAP Datasphere for data warehousing - analytic models, data flows, replication flows, remote tables |

### SAP Fiori & SAPUI5 (4 skills)

| Skill | Description |
|-------|-------------|
| `sap-fiori-tools` | SAP Fiori tools for VS Code and BAS - Fiori Elements generation, Page Editor, annotations, deployment |
| `sapui5` | SAPUI5 development including freestyle apps, Fiori Elements, custom controls, MDC, OData, and TypeScript |
| `sapui5-cli` | UI5 Tooling CLI (@ui5/cli) - project initialization, ui5.yaml configuration, builds, and dev server |
| `sapui5-linter` | UI5 Linter (@ui5/linter) for static code analysis - 19 linting rules, autofix, configuration patterns |

### SAP HANA (3 skills)

| Skill | Description |
|-------|-------------|
| `sap-hana-cli` | SAP HANA Developer CLI (hana-cli) - database connections, object inspection, HDI containers, SQL execution |
| `sap-hana-cloud-data-intelligence` | SAP Data Intelligence Cloud - pipelines, ABAP/S4HANA integration, ML scenarios, replication flows |
| `sap-sqlscript` | SAP SQLScript development for HANA database - procedures, functions, CDS table functions, performance optimization |

### SAP API (1 skill)

| Skill | Description |
|-------|-------------|
| `sap-api-style` | SAP API Style Guide standards for REST, OData, Java, JavaScript, .NET, and C/C++ API documentation |

### Tooling & Development (1 skill)

| Skill | Description |
|-------|-------------|
| `skill-review` | Comprehensive 14-phase audit process for skill quality assurance and documentation review |

---

## Benefits

### For Users

- ✅ **One-command installation**: No manual cloning or symlinks
- ✅ **Automatic updates**: Keep skills current with `/plugin update`
- ✅ **Centralized discovery**: Browse entire catalog
- ✅ **Team deployment**: Share via `.claude/settings.json`

### For Projects

- ✅ **60-70% token savings** vs manual implementation
- ✅ **Production-tested** patterns and templates
- ✅ **Current packages** (verified quarterly)
- ✅ **SAP-specific** patterns and best practices

---

## Managing Skills

### Update Skills

```bash
# Update single skill
/plugin update sap-cap-capire@sap-skills

# Update all skills from marketplace
/plugin update-all@sap-skills
```

### List Installed Skills

```bash
/plugin list
```

### Remove Skills

```bash
/plugin uninstall sap-cap-capire@sap-skills
```

---

## Team Deployment

Add to `.claude/settings.json` for automatic marketplace availability:

```json
{
  "extraKnownMarketplaces": [
    {
      "name": "sap-skills",
      "url": "https://github.com/secondsky/sap-skills"
    }
  ]
}
```

Team members will automatically have access to the marketplace.

---

## Alternative: Direct Installation

If you prefer manual installation or want to contribute:

```bash
# Clone repository
git clone https://github.com/secondsky/sap-skills.git
cd sap-skills

# Skills are ready to use from the skills/ directory
```

See [README.md](README.md) for development workflow.

---

## Troubleshooting

### Common Issues

#### Skill Not Discovered
- **Problem**: Claude doesn't suggest a skill when relevant
- **Solution**: Ensure the skill is properly installed with `/plugin list`
- **Check**: Verify skill keywords match your request

#### Installation Errors
- **Error**: "Skill not found"
- **Solution**: Check exact skill name in marketplace list
- **Command**: Use `/plugin marketplace list` to see available skills

#### Version Conflicts
- **Problem**: Multiple versions of same skill
- **Solution**: Uninstall old version first: `/plugin uninstall skill-name@old-version`
- **Then**: Install latest: `/plugin install skill-name@sap-skills`

### Performance Tips

- **Load only needed skills**: Each skill consumes context
- **Use specific versions**: Pin versions for production stability
- **Regular updates**: Update quarterly for latest SAP patterns

## Support

**Issues**: [https://github.com/secondsky/sap-skills/issues](https://github.com/secondsky/sap-skills/issues)
**Documentation**: See individual skill directories for detailed guides
**Discussions**: Use GitHub Discussions for questions and best practices

---

## Contributing

We welcome contributions! See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md) for guidelines.

**Quick process**:
1. Fork repository
2. Create new skill in `skills/` directory
3. Submit pull request

---

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see [LICENSE](LICENSE) for details.

---

**Last Updated**: 2025-12-19
**Marketplace Version**: 2.1.0
**Skills**: 33
**Maintainer**: SAP Skills Maintainers
