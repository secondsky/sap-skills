# SAP Skills for AI Coding Assistants

34 production-ready plugins for SAP development

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![Plugins](https://img.shields.io/badge/Plugins-34-brightgreen.svg)](.claude-plugin/marketplace.json)
[![Version](https://img.shields.io/badge/Version-2.2.3-orange.svg)](CHANGELOG.md)

Production-ready plugins for SAP development with AI coding assistants. Each plugin provides context-aware skills that activate automatically when you work with SAP BTP, CAP, Fiori, ABAP, Analytics, and more.

## Contents

- [Quick Start](#quick-start) — Install for any AI assistant
- [How It Works](#how-it-works) — Auto-activation examples
- [Available Plugins](#available-plugins-34) — 34 plugins by category
- [Repository Structure](#repository-structure) — Architecture overview
- [Building New Plugins](#building-new-plugins) — Contribution workflow
- [Documentation](#documentation) — Guides and references
- [Contributing](#contributing) — Open source participation

---

## Quick Start

### Universal (any AI assistant)

Install via [vercel-labs/skills](https://github.com/vercel-labs/skills) — works with Claude Code, OpenCode, Codex, Cursor, Gemini CLI, GitHub Copilot, and 60+ more:

```bash
npx skills add secondsky/sap-skills
```

### Claude Code (native marketplace)

```bash
# Add the marketplace
/plugin marketplace add https://github.com/secondsky/sap-skills

# Install individual plugins
/plugin install sap-cap-capire@sap-skills

# Or install multiple at once
/plugin install sap-cap-capire@sap-skills sap-fiori-tools@sap-skills
```

**Team setup** — add to `.claude/settings.json`:
```json
{
  "extraKnownMarketplaces": [
    { "name": "sap-skills", "url": "https://github.com/secondsky/sap-skills" }
  ]
}
```

### Clone repository

```bash
git clone https://github.com/secondsky/sap-skills.git
```

---

## How It Works

Once installed, plugins provide skills that automatically activate based on your project context:

- **"Create a new CAP service"** → `sap-cap-capire` activates
- **"Set up Fiori Elements app"** → `sap-fiori-tools` activates
- **"Deploy to BTP"** → `sap-btp-cloud-platform` activates
- **"Write ABAP CDS view"** → `sap-abap-cds` activates
- **"Create SAC planning model"** → `sap-sac-planning` activates

No manual invocation needed — the AI assistant loads relevant skills when you need them.

---

## Available Plugins (34)

Feature icons: ⌘ = commands · 🤖 = agents · 🔌 = MCP · LSP = language server

### 🔧 Tooling & Development (3)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-api-style** | | API documentation standards following SAP guidelines |
| **dependency-upgrade** | | Secure dependency upgrades, cooldown policies, lockfile hardening, supply-chain safeguards |
| **sap-hana-cli** | 🔌MCP | SAP HANA Developer CLI for database operations |

### ☁️ SAP BTP Platform (14)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-btp-best-practices** | | SAP BTP development best practices and patterns |
| **sap-btp-build-work-zone-advanced** | | SAP Build Work Zone (Advanced Edition) development |
| **sap-btp-business-application-studio** | | SAP Business Application Studio (BAS) development |
| **sap-btp-cias** | | Cloud Integration Automation Service (CIAS) integration |
| **sap-btp-cloud-logging** | | SAP BTP Cloud Logging service |
| **sap-btp-cloud-platform** | | SAP Business Technology Platform core services |
| **sap-btp-cloud-transport-management** | | Cloud Transport Management (CTM) service |
| **sap-btp-connectivity** | | SAP BTP Connectivity service |
| **sap-btp-developer-guide** | | Comprehensive SAP BTP developer guide |
| **sap-btp-integration-suite** | | SAP Integration Suite development |
| **sap-btp-intelligent-situation-automation** | | Deprecated Intelligent Situation Automation data export, unsubscription, and legacy reference |
| **sap-btp-job-scheduling** | | SAP BTP Job Scheduling service |
| **sap-btp-master-data-integration** | | Master Data Integration service |
| **sap-btp-service-manager** | | SAP BTP Service Manager operations |

### 🎨 UI Development (4)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-fiori-tools** | 🔌MCP | SAP Fiori Tools development and deployment |
| **sapui5** | ⌘5 · 🤖4 · 🔌MCP | SAPUI5 framework development |
| **sapui5-cli** | | SAPUI5 CLI tools and commands |
| **sapui5-linter** | | SAPUI5 code quality and linting |

### 📊 Data & Analytics (5)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-datasphere** | ⌘5 · 🤖3 · 🔌MCP | SAP Datasphere data modeling and management |
| **sap-hana-cloud-data-intelligence** | | SAP HANA Cloud Data Intelligence |
| **sap-sac-custom-widget** | ⌘3 · 🤖3 | SAP Analytics Cloud custom widget development |
| **sap-sac-planning** | ⌘3 · 🤖3 | SAP Analytics Cloud planning applications |
| **sap-sac-scripting** | ⌘4 · 🤖4 · 🔌MCP | SAP Analytics Cloud scripting API |

### ⚙️ Core Technologies (8)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-abap** | | ABAP development patterns and best practices |
| **sap-abap-cds** | | ABAP Core Data Services (CDS) views |
| **sap-ai-core** | | SAP AI Core machine learning development |
| **sap-cap-capire** | ⌘5 · 🤖4 · 🔌MCP · LSP | SAP Cloud Application Programming Model (CAP) |
| **sap-cloud-sdk-ai** | | SAP Cloud SDK for AI development |
| **sap-cloud-sdk-ai-python** | | SAP Cloud SDK for AI for Python (generative AI hub SDK) |
| **sap-hana-ml** | | SAP HANA Machine Learning (ML) library |
| **sap-sqlscript** | ⌘4 · 🤖3 · LSP | SAP HANA SQLScript development |

---

## Repository Structure

```
sap-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace catalog
│
└── plugins/                       # All plugins (34)
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

**Key features**: 7 plugins include commands (29 total), 7 with agents (24 total), 6 with MCP integration, 2 with LSP support. 13 plugins cross-reference related plugins.

---

## Building New Plugins

1. **Use plugin-dev for basics** (FIRST):
   - Run: `/use plugin-dev:skill-development`
   - Covers: YAML frontmatter, plugin structure, directory layout

2. **Add SAP-specific elements**:
   - Read [Contributor Guide](docs/contributor-guide/) for SDK version tracking, production testing, and marketplace cross-references

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

**General plugin development**: Use official **plugin-dev skills** — `/use plugin-dev:skill-development`, `plugin-dev:plugin-structure`, etc.

| Resource | Purpose |
|----------|---------|
| [Getting Started](docs/getting-started/) | Installation and quick reference |
| [Contributor Guide](docs/contributor-guide/) | Comprehensive development guide |
| [Workflow Checklist](docs/contributor-guide/workflow-checklist.md) | Quality verification checklist |
| [CLAUDE.md](CLAUDE.md) | Project context and critical directives |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

---

## Contributing

Open source under **GPL-3.0**. Contributions welcome:

- Report issues or suggest features via [GitHub Issues](https://github.com/secondsky/sap-skills/issues)
- Submit new plugins (use plugin-dev + [Contributor Guide](docs/contributor-guide/))
- Improve existing plugins with updated docs or references

**Quality standards**: All plugins must be production-tested. Package versions verified quarterly. Known issues documented with sources.

### Support

- [SAP Developer Center](https://developers.sap.com/) · [SAP Community](https://community.sap.com/) · [SAP Business Accelerator Hub](https://api.sap.com/)

---

**Maintained by**: E.J. · **Repository**: [github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills) · **Last Updated**: 2026-06-12 (v2.2.3)
