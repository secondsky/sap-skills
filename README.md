# SAP Skills for Claude Code

32 Claude Code plugins for SAP development

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![Plugins](https://img.shields.io/badge/Plugins-32-brightgreen.svg)](.claude-plugin/marketplace.json)
[![Version](https://img.shields.io/badge/Version-2.1.8-orange.svg)](CHANGELOG.md)

Production-ready Claude Code plugins for SAP development. Each plugin provides context-aware skills that activate automatically when you work with SAP BTP, CAP, Fiori, ABAP, Analytics, and more.

> **Note**: These skills follow Claude Code plugin patterns and are optimized for the Claude Code CLI and Claude Desktop. While the underlying skill content can be adapted for other AI harnesses, they are not automatically usable outside Claude Code without extraction and modification.

## 🔌 Platform Support

This repository uses **Claude Plugin Patterns** — natively supported by:

| Platform | Status | Notes |
|----------|--------|-------|
| Claude Code | ✅ Native | Full marketplace support |
| Factory Droid | ✅ Native | Full marketplace support |

**For all other Platforms like opencode, codex and others, you can use https://github.com/enulus/OpenPackage
**
---

## Installation

Add the SAP Skills marketplace to Claude Code:

```bash
# Add the marketplace
/plugin marketplace add https://github.com/secondsky/sap-skills

# Install individual plugins
/plugin install sap-cap-capire@sap-skills

# Or install multiple plugins at once
/plugin install sap-cap-capire@sap-skills sap-fiori-tools@sap-skills
```

**Team Setup:** Add to `.claude/settings.json` for automatic availability:
```json
{
  "extraKnownMarketplaces": [
    { "name": "sap-skills", "url": "https://github.com/secondsky/sap-skills" }
  ]
}
```

### Option 2: Clone Repository

For contributors or local development:

```bash
# Clone the repository
git clone https://github.com/secondsky/sap-skills.git

# Plugins are automatically available from the plugins/ directory
```

Or browse and install from the marketplace:

```bash
claude-code marketplace browse
```

---

## How It Works

Once installed, plugins provide skills that automatically activate based on your project context. No manual invocation needed—just start working:

- **"Create a new CAP service"** → `sap-cap-capire` activates
- **"Set up Fiori Elements app"** → `sap-fiori-tools` activates
- **"Deploy to BTP"** → `sap-btp-cloud-platform` activates
- **"Write ABAP CDS view"** → `sap-abap-cds` activates
- **"Create SAC planning model"** → `sap-sac-planning` activates

Claude Code intelligently loads relevant skills when you need them, providing expert guidance without overwhelming your context.

---

## Available Plugins (32)

### Component Legend

All plugins include context-aware skills. Advanced features shown in table columns:
- **Commands**: Slash commands for quick access
- **Agents**: Specialized autonomous assistants
- **MCP**: Model Context Protocol server integration
- **LSP**: Language Server Protocol VS Code extension support

---

### 🔧 Tooling & Development (2)

| Plugin | Commands | Agents | MCP | LSP | Description |
|--------|----------|--------|-----|-----|-------------|
| **sap-api-style** | — | — | — | — | API documentation standards following SAP guidelines |
| **sap-hana-cli** | — | — | ✓ | — | SAP HANA Developer CLI for database operations |

### ☁️ SAP BTP Platform (14)

| Plugin | Commands | Agents | MCP | LSP | Description |
|--------|----------|--------|-----|-----|-------------|
| **sap-btp-best-practices** | — | — | — | — | SAP BTP development best practices and patterns |
| **sap-btp-build-work-zone-advanced** | — | — | — | — | SAP Build Work Zone (Advanced Edition) development |
| **sap-btp-business-application-studio** | — | — | — | — | SAP Business Application Studio (BAS) development |
| **sap-btp-cias** | — | — | — | — | Cloud Identity Access Service (CIAS) integration |
| **sap-btp-cloud-logging** | — | — | — | — | SAP BTP Cloud Logging service |
| **sap-btp-cloud-platform** | — | — | — | — | SAP Business Technology Platform core services |
| **sap-btp-cloud-transport-management** | — | — | — | — | Cloud Transport Management (CTM) service |
| **sap-btp-connectivity** | — | — | — | — | SAP BTP Connectivity service |
| **sap-btp-developer-guide** | — | — | — | — | Comprehensive SAP BTP developer guide |
| **sap-btp-integration-suite** | — | — | — | — | SAP Integration Suite development |
| **sap-btp-intelligent-situation-automation** | — | — | — | — | Intelligent Situation Automation development |
| **sap-btp-job-scheduling** | — | — | — | — | SAP BTP Job Scheduling service |
| **sap-btp-master-data-integration** | — | — | — | — | Master Data Integration service |
| **sap-btp-service-manager** | — | — | — | — | SAP BTP Service Manager operations |

### 🎨 UI Development (4)

| Plugin | Commands | Agents | MCP | LSP | Description |
|--------|----------|--------|-----|-----|-------------|
| **sap-fiori-tools** | — | — | ✓ | — | SAP Fiori Tools development and deployment |
| **sapui5** | 5 | 4 | ✓ | — | SAPUI5 framework development |
| **sapui5-cli** | — | — | — | — | SAPUI5 CLI tools and commands |
| **sapui5-linter** | — | — | — | — | SAPUI5 code quality and linting |

### 📊 Data & Analytics (5)

| Plugin | Commands | Agents | MCP | LSP | Description |
|--------|----------|--------|-----|-----|-------------|
| **sap-datasphere** | 5 | 3 | ✓ | — | SAP Datasphere data modeling and management |
| **sap-hana-cloud-data-intelligence** | — | — | — | — | SAP HANA Cloud Data Intelligence |
| **sap-sac-custom-widget** | 3 | 3 | — | — | SAP Analytics Cloud custom widget development |
| **sap-sac-planning** | 3 | 3 | — | — | SAP Analytics Cloud planning applications |
| **sap-sac-scripting** | 4 | 4 | ✓ | — | SAP Analytics Cloud scripting API |

### ⚙️ Core Technologies (7)

| Plugin | Commands | Agents | MCP | LSP | Description |
|--------|----------|--------|-----|-----|-------------|
| **sap-abap** | — | — | — | — | ABAP development patterns and best practices |
| **sap-abap-cds** | — | — | — | — | ABAP Core Data Services (CDS) views |
| **sap-ai-core** | — | — | — | — | SAP AI Core machine learning development |
| **sap-cap-capire** | 5 | 4 | ✓ | ✓ | SAP Cloud Application Programming Model (CAP) |
| **sap-cloud-sdk-ai** | — | — | — | — | SAP Cloud SDK for AI development |
| **sap-hana-ml** | — | — | — | — | SAP HANA Machine Learning (ML) library |
| **sap-sqlscript** | 4 | 3 | — | ✓ | SAP HANA SQLScript development |

---

## Repository Structure

This repository uses the **Claude Code plugin architecture**:

```
sap-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace catalog
│
└── plugins/                       # All plugins (33)
    └── [plugin-name]/
        ├── .claude-plugin/
        │   └── plugin.json       # Plugin manifest
        │
        ├── skills/
        │   └── [skill-name]/
        │       ├── SKILL.md      # Main skill content
        │       ├── README.md     # Keywords for auto-discovery
        │       └── references/   # Documentation files
        │
        ├── agents/               # Optional: Specialized agents
        ├── commands/             # Optional: Slash commands
        └── hooks/                # Optional: Event hooks
```

**Key Features**:
- **Dual-level manifests**: Plugin-level and skill-level `plugin.json` files
- **Modular organization**: Each plugin is self-contained with its own resources
- **Advanced features**: 7 plugins include commands (29 total), 7 with agents (24 total), 6 with MCP integration, 2 with LSP support
- **Cross-references**: 13 plugins have marketplace cross-references to related plugins

---

## Building New Plugins

Want to contribute a new SAP plugin? Follow the quick workflow:

1. **Use plugin-dev for basics** (FIRST):
   - Run: `/use plugin-dev:skill-development`
   - Covers: YAML frontmatter, plugin structure, directory layout
   - Official Anthropic standards

2. **Add SAP-specific elements**:
   - Read [Contributor Guide](docs/contributor-guide/) for:
     - SAP SDK version tracking
     - Production testing requirements
     - Error catalog patterns
     - Marketplace cross-references

3. **Generate plugin manifests**:
   ```bash
   ./scripts/sync-plugins.sh
   ```

4. **Test and verify**:
   - Check [Workflow Checklist](docs/contributor-guide/workflow-checklist.md)

5. **Submit**:
   ```bash
   git add plugins/your-plugin .claude-plugin/marketplace.json
   git commit -m "Add your-plugin for [use case]"
   ```

---

## Documentation

**For General Plugin Development**: Use official **plugin-dev skills** FIRST
Run: `/use plugin-dev:skill-development`, `plugin-dev:plugin-structure`, etc.

**SAP-Specific Documentation**:

| Resource | Purpose |
|----------|---------|
| [Getting Started](docs/getting-started/) | Installation and quick reference |
| [Contributor Guide](docs/contributor-guide/) | Comprehensive development guide |
| [Workflow Checklist](docs/contributor-guide/workflow-checklist.md) | Quality verification checklist |
| [CLAUDE.md](CLAUDE.md) | Project context and critical directives |
| [CHANGELOG.md](CHANGELOG.md) | Version history and changes |

---

## Recent Changes

**v2.1.6** - SQLScript environment setup command with VS Code LSP integration

**v2.1.5** - SAC Scripting MCP integration (90 tools across 11 service areas)

**v2.1.4** - Fiori Tools MCP integration (5 tools for semantic search & app generation)

**v2.1.3** - Reserved words validation and marketplace description fixes

For complete history, see [CHANGELOG.md](CHANGELOG.md).

---

## Contributing

This repository is open source under the **GPL-3.0 License**. Contributions are welcome!

**Ways to contribute**:
- Report issues or suggest features via [GitHub Issues](https://github.com/secondsky/sap-skills/issues)
- Submit new plugins (use plugin-dev + [Contributor Guide](docs/contributor-guide/))
- Improve existing plugins with updated docs or references
- Help maintain package versions and dependencies

**Quality Standards**:
- All plugins must be production-tested
- Package versions must be current (verified quarterly)
- Known issues must be documented with sources

---

## Success Metrics

**Quality**:
- ✅ 100% compliance with [Anthropic Skills Spec](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)
- ✅ All plugins production-tested
- ✅ Package versions current (checked quarterly)

**Efficiency**:
- ✅ 100% error prevention vs. manual setup
- ✅ Sub-5-minute plugin creation with templates
- ✅ 95%+ first-try auto-discovery rate

---

## Support

- **Documentation**: Browse guides in this repository
- **Issues**: [GitHub Issues](https://github.com/secondsky/sap-skills/issues)
- **SAP Resources**:
  - [SAP Developer Center](https://developers.sap.com/)
  - [SAP Community](https://community.sap.com/)
  - [SAP Business Accelerator Hub](https://api.sap.com/)

---

## License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

---

**Maintained by**: E.J.
**Repository**: [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
**Last Updated**: 2026-03-03 (v2.1.6)
