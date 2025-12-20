<coding_guidelines>
# SAP Skills - Project Context

**Repository**: [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
**Purpose**: Production-ready skills for SAP development with Claude Code CLI
**Owner**: SAP Skills Maintainers
**Status**: Active Development 
**Last Updated**: 2025-11-21

---

## What This Repository Is

This is a curated collection of **production-tested Claude Code skills** for SAP development. Skills are modular capabilities that extend Claude's knowledge in specific domains, enabling faster development with fewer errors.

**Focus**: Claude Code CLI skills for SAP technologies (not claude.ai web interface)

**Target Audience**: Developers building with SAP technologies (BTP, ABAP, Fiori, CAP, S/4HANA, etc.)

---

## Quick Navigation

**👋 First Time Here?** → Read [START_HERE.md](START_HERE.md)
**🔨 Building a Skill?** → See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md)
**✅ Verifying Work?** → Check [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md)

---

## ⚠️ CRITICAL: Skill Review Process

**ALWAYS use the `skill-review` skill when reviewing skills in this repository.**

When asked to review skills:
1. **DO NOT** manually check versions/dates
2. **DO** use the installed `skill-review` skill which provides a 14-phase comprehensive audit
3. The skill-review skill is located at `skills/skill-review/SKILL.md`
4. It covers: version accuracy, date freshness, documentation quality, error catalog completeness, template validation, and more

Example: "Review the sap-cap skill" → Use skill-review skill, not manual inspection

---

## ⚠️ CRITICAL: Manual Review & Refactoring Process

**ALWAYS use MANUAL approaches when reviewing and refactoring skills.**

### What This Means:

**✅ ALLOWED:**
- Using standard tools: Read, Edit, Write, Grep, Glob, Bash
- Manual analysis and judgment
- Reading files to understand structure
- Using skill-review skill (which is a skill, not automation)

**❌ FORBIDDEN:**
- Creating NEW Python/shell scripts to automate refactoring
- Using sed/awk to programmatically rewrite large sections
- Batch processing multiple files without human review of each change
- Auto-generating content via scripts
- ANY automation that bypasses manual review of changes

### Why Manual Process is Required:

1. **Human Judgment**: Skills require context-aware decisions about what to extract vs keep
2. **Quality Control**: Each change must be reviewed for accuracy and clarity
3. **Consistency**: Manual review ensures adherence to skill standards
4. **Traceability**: Manual changes are easier to review in PRs
5. **Error Prevention**: Automation can introduce subtle errors that break skills

---

## Official Standards We Follow

This repo aligns with **official Anthropic standards**:

- **Official Skills Repo**: [https://github.com/anthropics/skills](https://github.com/anthropics/skills)
- **Agent Skills Spec**: [agent_skills_spec.md](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)
- **Skill Creator Guide**: [skill-creator/SKILL.md](https://github.com/anthropics/skills/blob/main/skill-creator/SKILL.md)

**Last Verified**: 2025-11-21

---

## Directory Structure

```
sap-skills/
├── START_HERE.md                 # ← Read this first!
├── CLAUDE.md                     # ← You are here
├── ONE_PAGE_CHECKLIST.md         # Quick verification
├── QUICK_WORKFLOW.md             # 5-minute skill creation
├── README.md                     # Public-facing overview
├── MARKETPLACE.md                # Marketplace documentation
├── LICENSE                       # GPL-3.0 License
│
└── skills/                       # ← All production skills
    └── skill-review/             # Quality assurance skill
        ├── SKILL.md
        ├── README.md
        └── references/
```

---

## Current Status (2025-12-19)

### ✅ Production-Ready Skills (33)

**All skills have been synced to version 2.1.0 with complete plugin.json files and marketplace integration.**

**Tooling & Development** (4 skills):
- **skill-review**: Comprehensive 14-phase audit process for skill quality assurance
- **sap-api-style**: API documentation standards following SAP guidelines
- **sap-hana-cli**: SAP HANA Developer CLI for database operations
- **sapui5-linter**: UI5 Linter for static code analysis

**SAP BTP Platform** (14 skills):
- sap-btp-best-practices, sap-btp-build-work-zone-advanced, sap-btp-business-application-studio, sap-btp-cias, sap-btp-cloud-logging, sap-btp-cloud-platform, sap-btp-cloud-transport-management, sap-btp-connectivity, sap-btp-developer-guide, sap-btp-integration-suite, sap-btp-intelligent-situation-automation, sap-btp-job-scheduling, sap-btp-master-data-integration, sap-btp-service-manager

**UI Development** (4 skills):
- sap-fiori-tools, sapui5, sapui5-cli, sapui5-linter

**Data & Analytics** (5 skills):
- sap-datasphere, sap-sac-custom-widget, sap-sac-planning, sap-sac-scripting, sap-hana-cloud-data-intelligence

**Core Technologies** (6 skills):
- sap-abap, sap-abap-cds, sap-cap-capire, sap-sqlscript, sap-ai-core, sap-cloud-sdk-ai, sap-hana-ml

### 🔄 Marketplace Infrastructure (New)

**Cross-References Added**:
- **sap-abap**: References to sap-abap-cds, sap-btp-cloud-platform, sap-cap-capire, sap-fiori-tools, sap-api-style
- **sap-abap-cds**: References to sap-abap, sap-btp-cloud-platform, sap-fiori-tools, sap-cap-capire, sap-api-style
- **sap-btp-cloud-platform**: References to sap-btp-best-practices, sap-cap-capire, sap-fiori-tools, sap-ai-core, sap-abap, sap-btp-connectivity, sap-btp-service-manager
- **sap-btp-best-practices**: References to sap-btp-cloud-platform, sap-btp-connectivity, sap-btp-service-manager, sap-btp-developer-guide, sap-cap-capire, sap-fiori-tools
- **sap-fiori-tools**: References to sapui5, sap-cap-capire, sap-abap-cds, sap-btp-cloud-platform, sap-api-style
- **sapui5**: References to sap-fiori-tools, sap-cap-capire, sap-btp-cloud-platform, sap-abap, sap-api-style
- **sap-cap-capire**: References to sap-fiori-tools, sapui5, sap-btp-cloud-platform, sap-hana-cli, sap-abap, sap-btp-best-practices, sap-ai-core, sap-api-style
- **sap-hana-cli**: References to sap-cap-capire, sap-btp-cloud-platform, sap-abap-cds, sap-datasphere
- **sap-ai-core**: References to sap-btp-cloud-platform, sap-cap-capire, sap-cloud-sdk-ai, sap-btp-best-practices
- **sap-api-style**: References to sap-cap-capire, sap-fiori-tools, sap-abap, sapui5, sap-btp-cloud-platform
- **sap-btp-connectivity**: References to sap-btp-cloud-platform, sap-btp-best-practices, sap-cap-capire, sap-fiori-tools, sap-abap
- **sap-btp-service-manager**: References to sap-btp-cloud-platform, sap-btp-best-practices, sap-btp-connectivity, sap-cap-capire
- **sap-btp-developer-guide**: References to sap-btp-cloud-platform, sap-btp-best-practices, sap-cap-capire, sap-fiori-tools, sap-abap, sap-btp-connectivity

### 🚧 Planned SAP Skills

Future skills to be developed:

**SAP Business Technology Platform (BTP)**:
- sap-btp-setup (BTP account, subaccounts, entitlements)
- sap-cloud-foundry (CF deployment, services, bindings)
- sap-kyma (Kubernetes runtime on BTP)

**SAP Cloud Application Programming Model (CAP)**:
- sap-cap-nodejs (CAP with Node.js)
- sap-cap-java (CAP with Java)
- sap-cap-cds (CDS modeling, services, entities)
- sap-cap-fiori (Fiori Elements integration)

**SAP Fiori & UI5**:
- sap-fiori-elements (Fiori Elements apps)
- sap-ui5-freestyle (Freestyle UI5 development)
- sap-fiori-launchpad (FLP configuration)

**SAP ABAP**:
- sap-abap-cloud (ABAP Cloud, RAP)
- sap-abap-classic (Classic ABAP patterns)
- sap-abap-cds (ABAP CDS views)

**SAP Integration**:
- sap-integration-suite (Integration Suite, CPI)
- sap-api-hub (SAP Business Accelerator Hub)
- sap-odata (OData services)

**SAP HANA**:
- sap-hana-cloud (HANA Cloud development)
- sap-hana-db (HANA database, procedures)

---

## Development Workflow

### Standard Workflow (From Scratch)

```
1. RESEARCH
   • Check SAP official documentation
   • Verify latest SDK/package versions
   • Document findings

2. CREATE SKILL
   • Create directory: mkdir -p skills/new-skill/
   • Create SKILL.md with YAML frontmatter
   • Create README.md with keywords
   • Add resources (scripts/, references/, assets/)

3. GENERATE PLUGIN FILES
   • Run: ./scripts/sync-plugins.sh
   • This auto-generates plugin.json and updates marketplace.json
   • Verifies: All 33 skills have proper metadata

4. TEST
   • Test discovery: Ask Claude Code to use skill
   • Build example project to verify templates work

5. VERIFY
   • Check ONE_PAGE_CHECKLIST.md
   • Use skill-review for comprehensive audit
   • Run validation: jq '.plugins | length' .claude-plugin/marketplace.json

6. COMMIT
   • git add skills/new-skill skills/new-skill/.claude-plugin/plugin.json .claude-plugin/marketplace.json
   • git commit -m "Add new-skill for [use case]"
   • git push
```

### Marketplace Management Scripts

Three automation scripts maintain plugin consistency:

```bash
# Generate plugin.json for all skills from SKILL.md YAML frontmatter
./scripts/generate-plugin-manifests.sh [SKILL_NAME]

# Unified sync: updates versions, generates plugin.json, regenerates marketplace.json
./scripts/sync-plugins.sh [--dry-run]

# Generate marketplace.json from all plugin.json files
./scripts/generate-marketplace.sh [--dry-run]
```

**When to use**:
- After adding new skills: `./scripts/sync-plugins.sh`
- Before releases: `./scripts/sync-plugins.sh` to ensure version consistency
- Quarterly maintenance: Re-sync all plugins with latest versions
```

---

## Key Principles

### 1. Atomic Skills Philosophy
- **One skill = One domain** (e.g., CAP Node.js, not "all SAP")
- **Composable**: Claude combines skills automatically
- **Reusable**: Same skill works across different projects
- **Maintainable**: Update one skill, benefits all use cases

### 2. Production Quality
- All skills must be **tested in production**
- Package versions must be **current** (verified regularly)
- Known issues must be **documented with sources** (SAP notes, GitHub issues, etc.)
- Token efficiency must be **measured** (≥50% savings)

### 3. Official Standards Compliance
- YAML frontmatter: `name` and `description` (required)
- Optional fields: `license`, `allowed-tools`, `metadata`
- Directory structure: `scripts/`, `references/`, `assets/` (official)
- Writing style: Imperative/infinitive form, third-person descriptions

### 4. Progressive Disclosure
- **Metadata** (name + description): Always in context (~100 words)
- **SKILL.md body**: Loaded when skill triggers (<5k words)
- **Bundled resources**: Loaded as needed by Claude

---

## Quality Standards

### Before Committing (Checklist)

Use [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md) to verify:

- [ ] YAML frontmatter valid (name + description)
- [ ] Description includes "Use when" scenarios
- [ ] Keywords comprehensive (technologies, use cases, errors)
- [ ] Third-person description style
- [ ] Instructions in imperative form
- [ ] Resources organized (scripts/, references/, assets/)
- [ ] Templates tested and working
- [ ] Package versions current
- [ ] Known issues documented with sources
- [ ] LICENSE field present (GPL-3.0)
- [ ] README.md has auto-trigger keywords
- [ ] Token efficiency measured (≥50%)

---

## Token Efficiency Metrics

**Why This Matters**: Skills save massive amounts of tokens by preventing trial-and-error.

| Scenario | Without Skill | With Skill | Savings |
|----------|---------------|------------|---------|
| SAP CAP setup | ~15k tokens, 2-3 errors | ~5k tokens, 0 errors | ~67% |
| Fiori Elements app | ~12k tokens, 1-2 errors | ~4k tokens, 0 errors | ~67% |
| BTP deployment | ~10k tokens, 2 errors | ~4k tokens, 0 errors | ~60% |
| **Average** | **~12k tokens** | **~4.5k tokens** | **~62%** |

---

## Common Pitfalls to Avoid

**Quick List**:
- ❌ Missing YAML frontmatter (skill invisible to Claude)
- ❌ Non-standard frontmatter fields (use only name, description, license, allowed-tools, metadata)
- ❌ Second-person descriptions ("You should..." instead of "This skill should be used when...")
- ❌ Vague descriptions (no "Use when" scenarios)
- ❌ Missing keywords (reduces discoverability)
- ❌ Outdated package versions
- ❌ Untested templates
- ❌ No production validation

---

## External Resources

### Official Anthropic
- **Skills Repository**: [https://github.com/anthropics/skills](https://github.com/anthropics/skills)
- **Skills Spec**: [https://github.com/anthropics/skills/blob/main/agent_skills_spec.md](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)
- **Skill Creator**: [https://github.com/anthropics/skills/blob/main/skill-creator/SKILL.md](https://github.com/anthropics/skills/blob/main/skill-creator/SKILL.md)

### SAP Resources
- **SAP Developer Center**: [https://developers.sap.com/](https://developers.sap.com/)
- **SAP Community**: [https://community.sap.com/](https://community.sap.com/)
- **SAP Help Portal**: [https://help.sap.com/](https://help.sap.com/)
- **SAP Business Accelerator Hub**: [https://api.sap.com/](https://api.sap.com/)

### Claude Code Docs
- **Skills Documentation**: [https://docs.claude.com/en/docs/claude-code/skills](https://docs.claude.com/en/docs/claude-code/skills)
- **Overview**: [https://docs.claude.com/en/docs/claude-code/overview](https://docs.claude.com/en/docs/claude-code/overview)

---

## Maintenance

### Regular Tasks

**Quarterly** (Every 3 months):
- Check SAP SDK/package versions
- Update to latest stable versions
- Re-test all skills
- Update "Last Verified" dates

**When SAP Updates**:
- Check breaking changes in release notes
- Update skill templates
- Test thoroughly
- Document migration if needed

---

## Getting Help

**Documentation Issues?**
- Check [START_HERE.md](START_HERE.md) for navigation
- Review working examples in `skills/` directory

**Technical Issues?**
- Open issue: [https://github.com/secondsky/sap-skills/issues](https://github.com/secondsky/sap-skills/issues)
- Check official SAP documentation

**Want to Contribute?**
- Follow [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md)
- Verify with [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md)

---

## Project Goals

### Short Term (Next 3 Months)
- Add SAP CAP skills (Node.js, Java, CDS)
- Add SAP Fiori Elements skill
- Add SAP BTP deployment skill
- Maintain 100% compliance with official standards

### Long Term (Next Year)
- Complete SAP skill suite (15+ skills)
- Community contributions
- SAP-specific validation scripts
- Automated testing for skill discovery

---

## Success Metrics

**Quality**:
- ✅ 100% compliance with official Anthropic standards
- ✅ All skills production-tested
- ✅ Package versions current (checked quarterly)
- ✅ Zero reported errors from documented issues

**Efficiency**:
- ✅ Average 60%+ token savings
- ✅ 100% error prevention (vs manual setup)
- ✅ Sub-5-minute skill creation (with templates)
- ✅ First-try skill discovery rate: 95%+

---

**Last Updated**: 2025-11-21
**Next Review**: 2026-02-21 (Quarterly)
**Maintainer**: SAP Skills Maintainers | [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
</coding_guidelines>
