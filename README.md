# SAP Skills for AI Coding Assistants

36 SAP development plugins with evidence-tracked verification

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![Plugins](https://img.shields.io/badge/Plugins-36-brightgreen.svg)](.claude-plugin/marketplace.json)
[![Version](https://img.shields.io/badge/Version-2.3.0-orange.svg)](CHANGELOG.md)

SAP development plugins for AI coding assistants, with public-source or package-registry verification tracked where available. Live tenant and system validation is tracked per plugin in `docs/project/source-verification-ledger.json`.

The repository is packaged for the Claude marketplace, but the SAP skill content
is written to be portable. In clients such as Codex, OpenCode, Cursor, or Gemini
CLI, Claude-specific agents, hooks, slash commands, and MCP configs should be
treated as role guidance, optional validators, prompt templates, and connection
recipes unless that client supports them natively.

## Contents

- [Quick Start](#quick-start) — Install for supported AI coding assistants
- [How It Works](#how-it-works) — Auto-activation examples
- [Available Plugins](#available-plugins-36) — 36 plugins by category
- [Repository Structure](#repository-structure) — Architecture overview
- [Building New Plugins](#building-new-plugins) — Contribution workflow
- [Documentation](#documentation) — Guides and references
- [Contributing](#contributing) — Open source participation

---

## Quick Start

### Supported agents via npx skills

Install via [vercel-labs/skills](https://github.com/vercel-labs/skills). Supported agents are controlled by the upstream skills CLI; current examples include Claude Code, OpenCode, Codex, Cursor, Gemini CLI, GitHub Copilot, and other supported clients:

```bash
npx skills add secondsky/sap-skills
```

### Claude Code (native marketplace)

```bash
# Add the marketplace
/plugin marketplace add secondsky/sap-skills

# Install individual plugins
/plugin install sap-cap-capire@sap-skills

# Or install multiple at once
/plugin install sap-cap-capire@sap-skills sap-fiori-tools@sap-skills
```

**Team setup** — add at project scope:

```bash
claude plugin marketplace add secondsky/sap-skills --scope project
```

Or configure `.claude/settings.json` directly:

```json
{
  "extraKnownMarketplaces": {
    "sap-skills": {
      "source": {
        "source": "github",
        "repo": "secondsky/sap-skills"
      }
    }
  }
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

Claude-compatible clients may also activate bundled commands, agents, hooks, and
MCP servers. Other harnesses can still use the same files as Markdown guidance:
run hook validators manually when desired, follow command output contracts as
prompt templates, and configure MCP servers using the documented command,
arguments, environment variables, and safety notes.

---

## Available Plugins (36)

Feature icons: ⌘ = commands · 🤖 = agents · 🛡 = hooks · 🔌 = MCP · LSP = language server

### 🔧 Tooling & Development (3)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-api-style** | ⌘1 · 🤖1 | API documentation standards following SAP guidelines |
| **sap-dependency-security** | ⌘1 · 🛡 | SAP dependency security, MCP executable trust, cooldown policies, lockfile hardening, supply-chain safeguards |
| **sap-hana-cli** | ⌘2 · 🤖1 · 🔌MCP | SAP HANA Developer CLI for database operations |

### ☁️ SAP BTP Platform (15)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-btp-best-practices** | ⌘1 | SAP BTP development best practices and patterns |
| **sap-btp-build-work-zone-advanced** | ⌘1 | SAP Build Work Zone (Advanced Edition) development |
| **sap-btp-business-application-studio** | ⌘1 | SAP Business Application Studio (BAS) development |
| **sap-btp-cias** | ⌘1 | Cloud Integration Automation Service (CIAS) integration |
| **sap-btp-cloud-logging** | ⌘1 | SAP BTP Cloud Logging service |
| **sap-btp-cloud-identity-services** | ⌘1 · 🤖1 | SAP Cloud Identity Services: IAS, IPS, AMS, XSUAA migration |
| **sap-btp-cloud-platform** | ⌘1 · 🤖1 | SAP Business Technology Platform core services |
| **sap-btp-cloud-transport-management** | ⌘1 | Cloud Transport Management (CTM) service |
| **sap-btp-connectivity** | ⌘1 | SAP BTP Connectivity service |
| **sap-btp-developer-guide** | ⌘1 | Comprehensive SAP BTP developer guide |
| **sap-btp-integration-suite** | ⌘1 · 🤖1 | SAP Integration Suite development |
| **sap-btp-intelligent-situation-automation** | ⌘1 | Deprecated Intelligent Situation Automation data export, unsubscription, and legacy reference |
| **sap-btp-job-scheduling** | ⌘1 | SAP BTP Job Scheduling service |
| **sap-btp-master-data-integration** | ⌘1 | Master Data Integration service |
| **sap-btp-service-manager** | ⌘1 | SAP BTP Service Manager operations |

### 🎨 UI Development (4)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-fiori-tools** | ⌘2 · 🤖1 · 🔌MCP | SAP Fiori Tools development and deployment |
| **sapui5** | ⌘5 · 🤖4 · 🛡 · 🔌MCP | SAPUI5 framework development |
| **sapui5-cli** | ⌘2 | SAPUI5 CLI tools and commands |
| **sapui5-linter** | ⌘2 | SAPUI5 code quality and linting |

### 📊 Data & Analytics (6)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-datasphere** | ⌘5 · 🤖3 · 🛡 · 🔌MCP | SAP Datasphere data modeling and management |
| **sap-hana-cloud-data-intelligence** | ⌘1 | SAP HANA Cloud Data Intelligence |
| **sap-sac-custom-widget** | ⌘3 · 🤖3 · 🛡 | SAP Analytics Cloud custom widget development |
| **sap-sac-planning** | ⌘3 · 🤖3 · 🛡 | SAP Analytics Cloud planning applications |
| **sap-sac-scripting** | ⌘4 · 🤖4 · 🛡 · 🔌MCP | SAP Analytics Cloud scripting API |
| **sap-sac-test-automation** | — | SAP Analytics Cloud capability-gated browser and Playwright test automation |

### ⚙️ Core Technologies (8)

| Plugin | Features | Description |
|--------|----------|-------------|
| **sap-abap** | ⌘1 | ABAP development patterns and best practices |
| **sap-abap-cds** | ⌘1 | ABAP Core Data Services (CDS) views |
| **sap-ai-core** | ⌘1 | SAP AI Core machine learning development |
| **sap-cap-capire** | ⌘5 · 🤖4 · 🛡 · 🔌MCP · LSP | SAP Cloud Application Programming Model (CAP) |
| **sap-cloud-sdk-ai** | ⌘1 | SAP Cloud SDK for AI development |
| **sap-cloud-sdk-ai-python** | ⌘1 | SAP Cloud SDK for AI for Python (generative AI hub SDK) |
| **sap-hana-ml** | ⌘1 | SAP HANA Machine Learning (ML) library |
| **sap-sqlscript** | ⌘4 · 🤖3 · 🛡 | SAP HANA SQLScript development |

---

## Repository Structure

```
sap-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace catalog
│
└── plugins/                       # All plugins (36)
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

**Key features**: 36 plugins include commands (61 total), 13 with agents (30 total), 8 with hooks, 6 with MCP integration, and 1 with LSP support. 15 plugins cross-reference related plugins.

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
   - Run `npm run audit:skills` for capability inventory and stale verification reporting
   - Run `npm run audit:effectiveness` for README drift, routing, command-contract, and skill-effectiveness reporting
   - Run `npm run validate` before opening a PR

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

**Quality standards**: Public-source and package-registry evidence is tracked per plugin. Live tenant/system validation is recorded only when evidence exists. Package versions are reviewed quarterly, and known issues are documented with sources.

### Support

- [SAP Developer Center](https://developers.sap.com/) · [SAP Community](https://community.sap.com/) · [SAP Business Accelerator Hub](https://api.sap.com/)

---

**Maintained by**: E.J. · **Repository**: [github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills) · **Last Updated**: 2026-06-14 (v2.3.0)
