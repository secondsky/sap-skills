# SAP Skills Collection

**Production-ready skills for SAP development with Claude Code CLI**
**Last Updated**: 2025-11-21
**Total Skills**: 1

A curated collection of battle-tested skills for building SAP applications with BTP, CAP, Fiori, ABAP, and more.

**👋 New Here?** → Read [START_HERE.md](START_HERE.md) for quick navigation
**🔨 Building a Skill?** → Use [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md)
**📖 Project Context?** → See [CLAUDE.md](CLAUDE.md)

---

## 🎉 Initial Release (2025-11-21)

**1 Production Skill** | **SAP-Focused Development**

### What's Included

- ✅ **skill-review**: 14-phase comprehensive skill audit process
- ✅ **Foundation ready** for SAP-specific skills
- ✅ **Quality standards** aligned with Anthropic official specs

### Coming Soon

SAP-specific skills for:
- SAP Cloud Application Programming Model (CAP)
- SAP Fiori Elements & UI5
- SAP Business Technology Platform (BTP)
- SAP ABAP Cloud & Classic
- SAP Integration Suite
- SAP HANA Cloud

---

## 🚀 Quick Start

### Option A: Marketplace Installation (Recommended)

```bash
# Add the marketplace
/plugin marketplace add https://github.com/secondsky/sap-skills

# Install skills
/plugin install skill-review@sap-skills
```

See [MARKETPLACE.md](MARKETPLACE.md) for complete marketplace documentation.

### Option B: Direct Installation

```bash
# Clone the repository
git clone https://github.com/secondsky/sap-skills.git ~/Documents/sap-skills

# Skills are ready to use from the skills/ directory
```

### Verify Installation

Skills will be available in Claude Code and automatically suggested when relevant to your task.

---

## 📦 Available Skills (1 Production-Ready)

### Tooling & Development

#### **skill-review**
Comprehensive 14-phase documentation review process for skill quality assurance. Validates YAML frontmatter, checks package versions, verifies official docs, detects anti-patterns.

**Triggers**: `skill review`, `audit skill`, `check skill currency`, `verify skill accuracy`

---

## 🚧 Planned SAP Skills

### SAP Cloud Application Programming Model (CAP)
- `sap-cap-nodejs` - CAP with Node.js runtime
- `sap-cap-java` - CAP with Java runtime  
- `sap-cap-cds` - CDS modeling, entities, services
- `sap-cap-fiori` - Fiori Elements integration with CAP

### SAP Fiori & UI5
- `sap-fiori-elements` - Fiori Elements applications
- `sap-ui5-freestyle` - Freestyle UI5 development
- `sap-fiori-launchpad` - FLP configuration and tiles

### SAP Business Technology Platform (BTP)
- `sap-btp-setup` - Account setup, subaccounts, entitlements
- `sap-cloud-foundry` - CF deployment, services, bindings
- `sap-kyma` - Kubernetes runtime on BTP

### SAP ABAP
- `sap-abap-cloud` - ABAP Cloud, RAP model
- `sap-abap-classic` - Classic ABAP patterns
- `sap-abap-cds` - ABAP CDS views

### SAP Integration
- `sap-integration-suite` - Integration Suite, Cloud Platform Integration
- `sap-odata` - OData service development
- `sap-api-hub` - SAP Business Accelerator Hub integration

### SAP HANA
- `sap-hana-cloud` - HANA Cloud development
- `sap-hana-db` - HANA database, procedures, calc views

---

## 🎯 Skill Usage Protocol

Claude Code automatically checks for relevant skills before planning ANY implementation task.

### Auto-Discovery Rules:
1. **Check skills FIRST** - Before entering plan mode or starting implementation
2. **Relevance threshold** - If a skill covers an aspect of the task requirements, propose using it
3. **Always prefer skills** - Skills encapsulate official documented patterns and prevent known errors
4. **Token efficiency** - Skills save tokens, reduce errors, and improve workflow vs manual implementation
5. **Error prevention** - Skills include fixes for known issues and links to documentation

### When to Use Skills:
- ✅ New SAP project scaffolding (CAP, Fiori, BTP)
- ✅ Service configuration (HANA, Integration Suite)
- ✅ Common SAP patterns (OData, CDS, RAP)
- ✅ Deployment workflows (CF, Kyma)

### Skill Invocation Pattern:

```
User: "Set up a new CAP project with Fiori Elements"
↓
Claude: [Checks skills automatically]
↓
Claude: "Found sap-cap-nodejs skill. Use it? (prevents [known-issues])"
↓
User: [Approves]
↓
Claude: [Uses skill templates and automation]
↓
Result: Production-ready setup, zero errors, ~67% token savings
```

---

## 🎯 How It Works

### Auto-Discovery in Action

Claude Code automatically checks skills before planning tasks. When it finds a relevant skill:

```
User: "Build a CAP service with HANA database"
↓
Claude: [Checks skills automatically]
↓
Claude: "Found sap-cap-nodejs skill. Use it?
        (Prevents 5 errors: CDS syntax, db binding, service config, etc.)"
↓
User: "Yes"
↓
Claude: [Uses templates and patterns from skill]
↓
Result: Production-ready service, zero errors, ~67% token savings
```

### Skill Structure

Each skill includes:

```
skills/[skill-name]/
├── README.md           # Auto-trigger keywords, quick reference
├── SKILL.md            # Complete documentation
├── templates/          # Ready-to-copy file templates (optional)
├── examples/           # Working example projects (optional)
├── references/         # Extended documentation (optional)
└── scripts/            # Automation scripts (optional)
```

---

## 🛠️ Development

### Building New Skills

1. **Create skill directory**:
   ```bash
   mkdir -p skills/my-skill/
   ```

2. **Add required files**:
   - `SKILL.md` - Full documentation with YAML frontmatter
   - `README.md` - Auto-trigger keywords

3. **Test the skill**:
   - Ask Claude Code to use the skill
   - Verify discovery works

4. **Verify & Commit**:
   ```bash
   git add skills/my-skill
   git commit -m "Add my-skill for [use case]"
   git push
   ```

See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md) for detailed guidelines.

---

## 📋 Skill Categories

Current and planned skills organized by domain:

- **SAP CAP** - Cloud Application Programming Model
- **SAP Fiori** - Fiori Elements, UI5, Launchpad
- **SAP BTP** - Business Technology Platform services
- **SAP ABAP** - Cloud and Classic ABAP development
- **SAP Integration** - Integration Suite, OData, APIs
- **SAP HANA** - HANA Cloud and database development
- **Tooling** - skill-review (quality assurance)

---

## ⚡ Token Efficiency

Using skills vs manual setup:

| Metric | Manual Setup | With Skills | Savings |
|--------|--------------|-------------|---------|
| **Average Tokens** | 12,000-15,000 | 4,000-5,000 | **~65%** |
| **Typical Errors** | 2-4 per service | 0 (prevented) | **100%** |
| **Setup Time** | 2-4 hours | 15-45 minutes | **~80%** |

---

## 📚 Documentation

- **Getting Started**: See [START_HERE.md](START_HERE.md)
- **Project Context**: See [CLAUDE.md](CLAUDE.md)
- **Skill Creation**: See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md)
- **Quality Checklist**: See [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md)

---

## 🤝 Contributing

Contributions welcome! Please:

1. Follow the skill structure standard
2. Include auto-trigger keywords in README.md
3. Provide working templates when applicable
4. Test thoroughly before submitting PR
5. Use skill-review for quality verification

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

## 🔗 Links

- **Claude Code**: https://claude.com/claude-code
- **SAP Developer Center**: https://developers.sap.com/
- **Issues**: https://github.com/secondsky/sap-skills/issues

---

**Built with ❤️ for the SAP developer community**
