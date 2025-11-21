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
/plugin install skill-review@sap-skills
```

**Step 3: Use the skills**

Once installed, Claude Code automatically discovers and uses skills when relevant:

```
User: "Review my SAP CAP skill"
Claude: [Automatically uses skill-review skill]
```

---

## Available Skills (1)

### Tooling & Development

| Skill | Description |
|-------|-------------|
| `skill-review` | Comprehensive 14-phase audit process for skill quality assurance |

---

## 🚧 Coming Soon - SAP Skills

### SAP Cloud Application Programming Model (CAP)
| Skill | Description |
|-------|-------------|
| `sap-cap-nodejs` | CAP with Node.js runtime |
| `sap-cap-java` | CAP with Java runtime |
| `sap-cap-cds` | CDS modeling, entities, services |
| `sap-cap-fiori` | Fiori Elements integration with CAP |

### SAP Fiori & UI5
| Skill | Description |
|-------|-------------|
| `sap-fiori-elements` | Fiori Elements applications |
| `sap-ui5-freestyle` | Freestyle UI5 development |
| `sap-fiori-launchpad` | FLP configuration and tiles |

### SAP Business Technology Platform (BTP)
| Skill | Description |
|-------|-------------|
| `sap-btp-setup` | Account setup, subaccounts, entitlements |
| `sap-cloud-foundry` | CF deployment, services, bindings |
| `sap-kyma` | Kubernetes runtime on BTP |

### SAP ABAP
| Skill | Description |
|-------|-------------|
| `sap-abap-cloud` | ABAP Cloud, RAP model |
| `sap-abap-classic` | Classic ABAP patterns |
| `sap-abap-cds` | ABAP CDS views |

### SAP Integration
| Skill | Description |
|-------|-------------|
| `sap-integration-suite` | Integration Suite, Cloud Platform Integration |
| `sap-odata` | OData service development |
| `sap-api-hub` | SAP Business Accelerator Hub integration |

### SAP HANA
| Skill | Description |
|-------|-------------|
| `sap-hana-cloud` | HANA Cloud development |
| `sap-hana-db` | HANA database, procedures, calc views |

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
/plugin update skill-review@sap-skills

# Update all skills from marketplace
/plugin update-all@sap-skills
```

### List Installed Skills

```bash
/plugin list
```

### Remove Skills

```bash
/plugin uninstall skill-review@sap-skills
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

## Support

**Issues**: https://github.com/secondsky/sap-skills/issues
**Documentation**: See individual skill directories for detailed guides

---

## Contributing

We welcome contributions! See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md) for guidelines.

**Quick process**:
1. Fork repository
2. Create new skill in `skills/` directory
3. Submit pull request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Last Updated**: 2025-11-21
**Marketplace Version**: 1.0.0
**Skills**: 1
**Maintainer**: SAP Skills Maintainers
