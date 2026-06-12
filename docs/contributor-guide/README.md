# SAP Skills Contributor Guide

Comprehensive guide for developing, maintaining, and publishing SAP skills for Claude Code.

**Version**: 2.2.2 | **Last Updated**: 2026-05-31

---

## Quick Navigation

**Getting Started**:
- [Quick Reference →](../getting-started/quick-reference.md) - 6-step workflow
- [Workflow Checklist →](workflow-checklist.md) - Quality verification checklist

**Deep Dives**:
- [Quality Assurance →](quality-assurance.md) - manual quality review process
- [Common Mistakes →](common-mistakes.md) - Patterns to avoid
- [Marketplace Infrastructure →](../architecture/marketplace-infrastructure.md) - Technical architecture

**External Resources**:
- [plugin-dev Skills](https://github.com/anthropics/skills/tree/main/plugin-dev) - Official Anthropic plugin development
- [SAP Developer Center](https://developers.sap.com/) - SAP official documentation

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Quick Start](#2-quick-start)
3. [When to Use plugin-dev vs SAP Guide](#3-when-to-use-plugin-dev-vs-sap-guide)
4. [Marketplace System](#4-marketplace-system)
5. [Quality Assurance](#5-quality-assurance)
6. [SAP-Specific Patterns](#6-sap-specific-patterns)
7. [Automation Scripts](#7-automation-scripts)
8. [Maintenance](#8-maintenance)
9. [Getting Help](#9-getting-help)

---

## 1. Introduction

### Purpose

This guide covers **SAP-specific development patterns** for the Claude Code skills ecosystem. It complements the official **plugin-dev skills** from Anthropic with domain-specific guidance for SAP technologies.

### Who This Guide Is For

- **Skill Contributors**: Creating new SAP skills
- **Maintainers**: Managing the 33-skill portfolio
- **Reviewers**: Ensuring quality standards

### Prerequisites

Before using this guide:
- ✅ Familiarity with Claude Code and skills
- ✅ Understanding of plugin-dev basics (or willingness to learn)
- ✅ Knowledge of at least one SAP technology (BTP, CAP, HANA, ABAP, Fiori)
- ✅ Access to SAP development environment (BTP trial/production)

### What Makes SAP Skills Different

SAP skills require:
- **Production testing** with real SAP systems
- **Version tracking** for SAP SDK packages
- **Error catalog** documentation with SAP Notes
- **Cross-references** to related skills in the portfolio
- **Quarterly maintenance** cycles

---

## 2. Quick Start

### 6-Step Workflow

For rapid skill creation, follow this streamlined process:

**Step 1**: Use plugin-dev for structure
```bash
/use plugin-dev:skill-development
```

**Step 2**: Add SAP-specific elements (metadata, error catalog, cross-references)

**Step 3**: Generate manifests
```bash
./scripts/sync-plugins.sh
```

**Step 4**: Manual quality review using the guidelines in `quality-assurance.md`

**Step 5**: Verify with checklist (see [workflow-checklist.md](workflow-checklist.md))

**Step 6**: Commit with proper message

**Full Details**: See [Quick Reference](../getting-started/quick-reference.md)

---

## 3. When to Use plugin-dev vs SAP Guide

### Use plugin-dev FIRST for:

✅ **Creating skills, commands, agents, hooks**
- Run: `/use plugin-dev:skill-development`
- Run: `/use plugin-dev:command-development`
- Run: `/use plugin-dev:agent-development`
- Run: `/use plugin-dev:hook-development`

✅ **YAML frontmatter syntax and structure**
- plugin-dev:skill-development covers all required and optional fields
- plugin-dev:plugin-structure covers directory layout

✅ **Plugin directory structure**
- Standard layout and auto-discovery
- File naming conventions

✅ **MCP server integration**
- Run: `/use plugin-dev:mcp-integration`
- .mcp.json configuration

✅ **Plugin settings patterns**
- Run: `/use plugin-dev:plugin-settings`
- .claude/plugin-name.local.md files

✅ **Basic validation**
- plugin-dev includes validation utilities

### Use THIS SAP Guide for:

🔧 **Managing 30+ related skills**
- Portfolio management across skill families
- Coordinated versioning strategy
- Marketplace infrastructure

🔧 **SAP SDK version tracking**
- Quarterly package version updates
- Breaking change detection
- Production testing requirements

🔧 **SAP-specific quality assurance**
- Manual review process with comprehensive quality checks
- Version/date accuracy validation
- Known-issues documentation patterns

🔧 **SAP technology patterns**
- Error catalog patterns (BTP, HANA, CAP, ABAP)
- Multi-runtime considerations (Node.js, Java, ABAP)
- SAP documentation integration

🔧 **Domain-specific skill creation**
- Technical skills for APIs/SDKs
- Production validation requirements
- SAP error message documentation

### Common Workflows

#### Creating a New SAP Skill

```bash
# Step 1: Use plugin-dev for structure
/use plugin-dev:skill-development

# Step 2: Add SAP-specific elements
# - Add metadata.cap_version, metadata.last_verified
# - Document SAP error messages
# - Add cross-references to related SAP skills
# - Test with production SAP systems

# Step 3: Generate manifests
./scripts/sync-plugins.sh

# Step 4: Quality review
# Perform manual quality review following quality-assurance.md guidelines
```

#### Quarterly Maintenance

```bash
# Step 1: Check SAP SDK versions
npm outdated  # Check for SAP package updates

# Step 2: Review SAP release notes
# Visit help.sap.com for breaking changes

# Step 3: Update skill if needed
# Update package versions, templates, known issues

# Step 4: Re-test in production
# Verify templates work with new versions

# Step 5: Update metadata
# Update cap_version, last_verified date

# Step 6: Perform manual quality review
# Follow quality-assurance.md guidelines
```

---

## 4. Marketplace System

### Overview

The SAP skills repository manages **33 production plugins** using a marketplace system with:
- Coordinated versioning (all at v2.2.2)
- Cross-references between related skills
- Central registry (.claude-plugin/marketplace.json)
- Single root manifest architecture

**Scale**: 33 plugins across 5 user-facing groups:
- Tooling & Development (2 plugins)
- SAP BTP Platform (15 skills)
- UI Development (4 skills)
- Data & Analytics (5 skills)
- Core Technologies (7 skills)

### Key Concepts

#### Skill Families

Skills are organized into families for better discoverability:
- **BTP Platform**: 14 skills covering Cloud Foundry, services, integration
- **Core Technologies**: CAP, ABAP, HANA, AI/ML (7 skills)
- **UI Development**: Fiori, SAPUI5, tooling (4 skills)
- **Data & Analytics**: SAC, Datasphere, Data Intelligence (5 skills)
- **Tooling**: API style guidance and dependency upgrade hardening (2 plugins)

#### Cross-References

Related skills reference each other:
```markdown
## Related Skills
- **sap-fiori-tools**: Use for UI layer development
- **sap-btp-cloud-platform**: Use for BTP deployment
```

This enables Claude to discover complementary skills automatically.

#### Coordinated Versioning

**Single Source of Truth**: `marketplace.json` metadata.version field

All plugins share the same version (currently 2.2.2) and are updated together:
```bash
# Update version in marketplace.json
vim .claude-plugin/marketplace.json

# Propagate to all plugins
./scripts/sync-plugins.sh
```

### Detailed Documentation

**Full technical details**: See [Marketplace Infrastructure](../architecture/marketplace-infrastructure.md)

Topics covered:
- Single root manifest architecture
- Central registry structure
- Discovery and installation
- Portfolio management patterns

---

## 5. Quality Assurance

### Manual Quality Review Process

**Process**: Manual comprehensive quality assurance
**Reference**: See [quality-assurance.md](quality-assurance.md) for detailed guidelines

#### Overview

Manual quality review follows systematic quality assurance guidelines:

1. **Pre-review setup** (5-10 min) - Installation verification
2. **Standards compliance** (10-15 min) - YAML validation
3. **Official docs verification** (15-30 min) - Verify against SAP documentation
4. **Code examples audit** (20-40 min) - Template validation
5. **Cross-file consistency** (15-25 min) - Content alignment
6. **Dependencies & versions** (10-15 min) - Package currency
7-14. **Additional checks** - See [quality-assurance.md](quality-assurance.md)

#### Severity Classifications

- 🔴 **Critical**: Must fix before committing
- 🟡 **High**: Should fix soon
- 🟠 **Medium**: Nice to have
- 🟢 **Low**: Optional

#### When to Use

**Required**:
- Before committing new skills
- After SAP SDK updates (quarterly)
- When updating skill content
- Before creating pull requests

**Typical Workflow**:
```bash
# Create or update skill
vim plugins/sap-cap-capire/skills/sap-cap-capire/SKILL.md

# Perform manual quality review
# Follow quality-assurance.md guidelines
# - Validate YAML frontmatter
# - Verify against official SAP documentation
# - Test code examples in production
# - Check dependency versions

# Fix all 🔴 Critical and 🟡 High issues
# Optional: Fix 🟠 Medium issues

# Commit
git add plugins/sap-cap-capire
git commit -m "Update sap-cap-capire: [changes]"
```

### SAP SDK Version Tracking

#### Metadata Pattern

Every SAP skill must document SDK versions:

```yaml
---
name: sap-cap-capire
metadata:
  version: "2.2.2"
  cap_version: "@sap/cds 9.4.x"
  last_verified: "2025-12-28"
  sap_btp_compatible: true
---
```

**Required fields**:
- `version`: Skill version (synced with marketplace)
- `cap_version` (or equivalent): SAP SDK version
- `last_verified`: Last testing date (YYYY-MM-DD)

#### Quarterly Process

Every 3 months:
1. Check npm registry for updates
2. Review SAP release notes
3. Update skill metadata
4. Test in production
5. Perform manual quality review
6. Commit changes

### Production Testing

**All SAP skills MUST be tested with real SAP systems/BTP.**

**For CAP Skills**:
- Create new CAP project with templates
- Test database connection (HANA, SQLite)
- Deploy to BTP Cloud Foundry
- Verify service endpoints work

**For BTP Skills**:
- Create BTP trial/production account
- Test service bindings
- Verify authentication flows
- Test deployment procedures

**For UI Skills**:
- Generate Fiori Elements app
- Test with SAP Business Application Studio
- Verify UI5 CLI commands work
- Deploy to BTP

**For ABAP Skills**:
- Test with ABAP Trial or S/4HANA Cloud
- Verify ABAP syntax current
- Test transport procedures

### Error Catalog

Every skill should document common errors:

```markdown
## Common Issues

| Issue | Solution | Source |
|-------|----------|--------|
| CAP: "cds.requires.db is missing" | Add db config to package.json | SAP Note 3234567 |
| BTP: "authentication failed" | Refresh OAuth token | help.sap.com/cf-auth |
```

**Requirements**:
- Test each error actually occurs
- Verify solution works
- Cite authoritative sources (SAP Notes, help.sap.com, GitHub)

### Known Issues Documentation

Document known issues with this format:

```markdown
## Known Issues

### CAP with HANA Cloud

**Issue**: Deploy fails with "HDI container not found"
**Cause**: Race condition in HANA service binding
**Solution**: Add `--wait-for-service` flag to cf push
**Source**: SAP Note 3456789
**Workaround**: Deploy twice - first without, second with migration
```

### Detailed Documentation

**Full review process**: See [Quality Assurance](quality-assurance.md) (1,298 lines)

**Common patterns to avoid**: See [Common Mistakes](common-mistakes.md) (606 lines)

---

## 6. SAP-Specific Patterns

### Error Catalog Pattern

#### Structure

Organize errors by category:

```markdown
## Common Issues

### Category 1: Development Errors

| Error Code | Message | Solution |
|------------|---------|----------|
| D1_ERROR 1105 | Database constraint violation | Use batch API |
| CAP_ERR_001 | Service not found | Check service name in package.json |

### Category 2: Deployment Errors

| Error Code | Message | Solution |
|------------|---------|----------|
| CF_ERR_503 | Service unavailable | Wait 5 minutes, retry |
| HDI_ERR_100 | Migration failed | Run `cf restage <app>` |
```

#### SAP Error Message Patterns

**BTP Errors**:
- Cloud Foundry: `CF_ERR_*`
- HANA Deployment: `HDI_ERR_*`
- Service Manager: `SM_ERR_*`

**CAP Errors**:
- Database: `DB_ERR_*`
- Service: `SRV_ERR_*`
- Authentication: `AUTH_ERR_*`

**ABAP Errors**:
- Syntax: `SYNTAX_*`
- Transport: `TR_*`
- Runtime: `RUNTIME_*`

**HANA Errors**:
- SQL: Error codes 1-999
- Deployment: Error codes 1000-1999

### Multi-Runtime Pattern

SAP ecosystem uses Node.js, Java, AND ABAP. Consider all runtimes:

**When creating CAP skills**:
- Default to Node.js (more common)
- Note Java alternative in "Advanced Usage"
- Cross-reference to sap-cap-java skill (when available)

**When creating BTP skills**:
- Document Cloud Foundry (Node.js, Java)
- Document Kyma (Docker/Kubernetes)
- Note ABAP Cloud compatibility

**Example**:
```markdown
## Runtime Compatibility

**Primary**: Node.js 20.x with @sap/cds 9.4.x
**Alternative**: Java 21 with com.sap.cds:cds-services-bom 3.x
**ABAP Cloud**: Compatible via RAP services

See **Related Skills**:
- **sap-cap-java**: For Java-specific CAP patterns
- **sap-abap-cloud**: For ABAP RAP integration
```

### Integration Patterns

#### Business Application Studio (BAS)

```markdown
## BAS Integration

**Generator Commands**:
- Fiori: `Fiori: Open Application Generator`
- CAP: `CAP: New Project`
- MTA: `MTA: Create MTA Module`

**Prerequisites**:
- BAS Dev Space created (SAP Fiori or Full Stack)
- Cloud Foundry target set
- BTP destination configured

**Limitations**:
- No local HANA (use SQLite for development)
- 4GB RAM limit (use `cds deploy --to sqlite` for large models)
```

#### Fiori Tools

```markdown
## Fiori Tools CLI

**Prerequisites**:
```bash
npm install -g @sap/generator-fiori
npm install -g @ui5/cli
```

**Common Commands**:
```bash
fiori generate app           # Create new Fiori app
fiori run --open             # Run with live reload
fiori build                  # Build for deployment
```

**Cross-Reference**: See **sap-fiori-tools** skill for detailed patterns
```

#### HANA CLI

```markdown
## HANA CLI Integration

**Prerequisites**:
```bash
npm install -g @sap/hana-cli
```

**Common Commands**:
```bash
hana-cli login              # Authenticate
hana-cli createContainer    # Create HDI container
hana-cli deploy             # Deploy database artifacts
```

**Cross-Reference**: See **sap-hana-cli** skill for database patterns
```

### SAP Community Resources

```markdown
## SAP Community

**Official Resources**:
- **Help Portal**: https://help.sap.com/
- **Developer Center**: https://developers.sap.com/
- **Community**: https://community.sap.com/
- **API Hub**: https://api.sap.com/
- **GitHub**: https://github.com/SAP

**Search Pattern**:
1. Check help.sap.com for official docs
2. Search community.sap.com for solutions
3. Check GitHub for code examples
4. File SAP support ticket if unresolved
```

---

## 7. Automation Scripts

### sync-plugins.sh

**Purpose**: Orchestrates complete plugin synchronization workflow

**Usage**:
```bash
# Full sync (updates all plugin.json + marketplace.json)
./scripts/sync-plugins.sh

# Dry-run (preview changes without writing)
./scripts/sync-plugins.sh --dry-run
```

**What it does**:
1. Reads global version from `marketplace.json`
2. Calls `generate-plugin-manifests.sh` to create/update plugin.json files
3. Calls `generate-marketplace.sh` to regenerate central marketplace.json

**When to run**:
- After adding new skills
- Before releases
- After updating skill YAML frontmatter
- When version changes in marketplace.json

### generate-plugin-manifests.sh

**Purpose**: Converts SKILL.md YAML frontmatter → plugin.json files

**Auto-Detection**:
- Reads YAML from SKILL.md
- Maps skill names to categories (via `lib/categorize.sh`)
- Extracts keywords from name + description
- Scans for `agents/` and `commands/` directories
- Generates both plugin-level and skill-level plugin.json

**Category Mapping** (`lib/categorize.sh`):
```bash
sap-abap*         → "abap"
sap-btp-*         → "btp"
sap-cap-*         → "cap"
sap-fiori-*       → "ui-development"
sap-hana-*        → "hana"
sap-datasphere*   → "data-analytics"
sap-ai-*          → "ai"
*                 → "tooling" (default)
```

**Usage**:
```bash
# Generate for all skills
./scripts/generate-plugin-manifests.sh

# Generate for single skill
./scripts/generate-plugin-manifests.sh sap-cap-capire

# Dry-run
./scripts/generate-plugin-manifests.sh --dry-run
```

### generate-marketplace.sh

**Purpose**: Aggregates all plugin.json files → central marketplace.json

**Process**:
1. Scan `plugins/*/.claude-plugin/plugin.json`
2. Collect metadata: name, description, version, keywords, category
3. Build plugins array (33 total: root plugin manifests)
4. Collect unique categories
5. Write marketplace.json with metadata

**Critical Implementation**:

**Source Path** (prevents cache duplication):
```json
{
  "source": "plugins/sap-cap-capire"  // ✅ Correct: individual plugin
}
```

NOT:
```json
{
  "source": "./"  // ❌ Wrong: causes 18× cache bloat
}
```

**Usage**:
```bash
# Regenerate marketplace
./scripts/generate-marketplace.sh

# Dry-run
./scripts/generate-marketplace.sh --dry-run

# Validate output
jq '.plugins | length' .claude-plugin/marketplace.json  # Should be 33
jq '.metadata.total_skills' .claude-plugin/marketplace.json  # Should be 33
```

---

## 8. Maintenance

### Quarterly Version Checks

**Frequency**: Every 3 months

**Checklist**:

1. **Check SAP SDK updates**:
   ```bash
   cd plugins/sap-cap-capire/
   npm outdated @sap/cds
   npm outdated @sap/cds-dk
   npm outdated @sap/hana-client
   ```

2. **Review SAP release notes**:
   - Visit: https://help.sap.com
   - Search for "@sap/cds release notes"
   - Review breaking changes section
   - Note new features

3. **Update skill metadata**:
   ```yaml
   metadata:
     version: "2.2.2"
     cap_version: "@sap/cds 9.5.x"  # Updated
     last_verified: "2026-03-28"     # Updated
   ```

4. **Test breaking changes**:
   - Create fresh project with new version
   - Test all skill templates
   - Verify error messages still accurate
   - Update error catalog if needed

5. **Perform manual quality review**:
   - Follow quality-assurance.md guidelines
   - Validate all updates against official documentation

6. **Commit updates**:
   ```bash
   git add plugins/sap-cap-capire
   git commit -m "Update sap-cap-capire: SAP CDS 9.5.x compatibility"
   ```

### Breaking Change Detection

**SAP Breaking Changes Checklist**:

**CAP Breaking Changes**:
- [ ] CDS syntax changes
- [ ] Service definition changes
- [ ] Authentication API changes
- [ ] Database adapter changes

**BTP Breaking Changes**:
- [ ] Cloud Foundry API updates
- [ ] Service binding format changes
- [ ] Authentication flow changes

**UI5 Breaking Changes**:
- [ ] Control API deprecations
- [ ] Theme changes
- [ ] Fiori Elements updates

**ABAP Breaking Changes**:
- [ ] ABAP Cloud restrictions
- [ ] RAP API changes
- [ ] Transport changes

### Production Re-testing

**After Updating Versions**:

1. **Create fresh environment**:
   ```bash
   mkdir test-sap-cap-capire
   cd test-sap-cap-capire
   npm init -y
   ```

2. **Install updated packages**:
   ```bash
   npm install @sap/cds@9.5
   npm install -D @sap/cds-dk@9.5
   ```

3. **Test all templates**:
   - Copy each template from skill
   - Run without modifications
   - Verify it works end-to-end

4. **Test error catalog**:
   - Trigger each documented error
   - Verify error messages unchanged
   - Update if SAP changed error text

5. **Update last_verified date**:
   ```yaml
   metadata:
     last_verified: "2026-03-28"
   ```

---

## 9. Getting Help

### For General Plugin Development

→ Use **plugin-dev skills** (official Anthropic):
- `/use plugin-dev:skill-development`
- `/use plugin-dev:command-development`
- `/use plugin-dev:agent-development`
- `/use plugin-dev:hook-development`

**Documentation**: [github.com/anthropics/skills/tree/main/plugin-dev](https://github.com/anthropics/skills/tree/main/plugin-dev)

### For SAP-Specific Patterns

→ Read this guide and supporting documentation:
- [Quick Reference](../getting-started/quick-reference.md) - 6-step workflow
- [Workflow Checklist](workflow-checklist.md) - Quality verification
- [Quality Assurance](quality-assurance.md) - 14-phase review
- [Common Mistakes](common-mistakes.md) - Patterns to avoid
- [Marketplace Infrastructure](../architecture/marketplace-infrastructure.md) - Technical architecture

### For Quality Verification

→ Follow **manual quality review guidelines**:
- See [quality-assurance.md](quality-assurance.md) for detailed process
- YAML validation, documentation verification, code testing

### For Issues

→ GitHub Issues:
https://github.com/secondsky/sap-skills/issues

### SAP Resources

**Official Documentation**:
- **Help Portal**: https://help.sap.com/
- **Developer Center**: https://developers.sap.com/
- **Community**: https://community.sap.com/
- **API Hub**: https://api.sap.com/
- **GitHub**: https://github.com/SAP

---

## Summary: Clear Boundaries

### plugin-dev handles:
- ✅ How to create skills (YAML, structure, files)
- ✅ How to add commands, agents, hooks
- ✅ How to integrate MCP servers
- ✅ Basic validation and testing
- ✅ Progressive disclosure patterns
- ✅ Plugin directory structure

### SAP Guide handles:
- 🔧 How to manage 30+ skill portfolios
- 🔧 How to version SAP SDKs (quarterly updates)
- 🔧 How to document SAP errors and known issues
- 🔧 How to use marketplace infrastructure (central registry, cross-references)
- 🔧 How to maintain technical domain skills (production testing, error catalogs)
- 🔧 Manual quality review process for SAP skills
- 🔧 SAP-specific patterns (BTP, CAP, HANA, ABAP, Fiori)

---

**Last Updated**: 2026-05-31
**Next Review**: 2026-08-31 (Quarterly)
**Version**: 2.2.2
**Maintainer**: SAP Skills Repository Team | [github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
