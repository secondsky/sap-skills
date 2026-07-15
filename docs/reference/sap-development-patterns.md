# SAP Skills Development Guide

> **SAP-specific patterns for Claude Code skills.** For general plugin development,
> use the official **plugin-dev skills** FIRST.

**Last Updated**: 2026-06-20
**Version**: 2.3.2
**Repository**: [github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)

---

## Integration with plugin-dev

### Decision Tree: When to Use What

#### Use plugin-dev FIRST for:

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

#### Use THIS SAP Guide for:

🔧 **Managing 30+ related skills**
- Portfolio management across skill families
- Coordinated versioning strategy
- Marketplace infrastructure

🔧 **SAP SDK version tracking**
- Quarterly package version updates
- Breaking change detection
- Production testing requirements

🔧 **SAP-specific quality assurance**
- manual quality review process
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

#### Workflow 1: Creating a New SAP Skill

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
# Follow docs/contributor-guide/quality-assurance.md
```

#### Workflow 2: Quarterly Maintenance

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

# Step 6: Re-run manual quality review
# Follow docs/contributor-guide/quality-assurance.md
```

---

## Marketplace Infrastructure

### Overview

The SAP skills repository uses a **marketplace system** to manage 38 production plugins with:
- Coordinated versioning (all at v2.3.2)
- Cross-references between related skills
- Central registry (.claude-plugin/marketplace.json)
- Single root manifest architecture

**Scale**: 38 plugins across 8 manifest categories and 5 user-facing groups.

### Multi-Skill Portfolio Management

#### Skill Families

**Tooling & Development** (3 plugins):
- sap-api-style, sap-dependency-security, sap-hana-cli

**SAP BTP Platform** (15 plugins):
- sap-btp-best-practices, sap-btp-build-work-zone-advanced, sap-btp-business-application-studio,
  sap-btp-cias, sap-btp-cloud-identity-services, sap-btp-cloud-logging, sap-btp-cloud-platform,
  sap-btp-cloud-transport-management, sap-btp-connectivity, sap-btp-developer-guide, sap-btp-integration-suite,
  sap-btp-intelligent-situation-automation, sap-btp-job-scheduling, sap-btp-master-data-integration,
  sap-btp-service-manager

**UI Development** (4 plugins):
- sap-fiori-tools, sapui5, sapui5-cli, sapui5-linter

**Data & Analytics** (6 plugins):
- sap-datasphere, sap-sac-custom-widget, sap-sac-planning, sap-sac-scripting,
  sap-hana-cloud-data-intelligence, sap-sac-test-automation

**Core Technologies** (9 plugins):
- sap-abap, sap-abap-cds, sap-cap-capire, sap-sqlscript, sap-ai-core, sap-cloud-sdk-ai,
  sap-cloud-sdk-ai-python, sap-hana-ml, sap-rpt1

#### Cross-Reference Pattern

Related skills should reference each other in their `Related Skills` section:

```markdown
## Related Skills

- **sap-fiori-tools**: Use for UI layer development with Fiori Elements
- **sap-btp-cloud-platform**: Use for BTP deployment and services
- **sap-hana-cli**: Use for database operations
```

This enables Claude to:
- Discover complementary skills automatically
- Suggest related skills when appropriate
- Understand the SAP technology ecosystem

#### Coordinated Versioning Strategy

**Single Source of Truth**: `marketplace.json` metadata.version field

**Version Sync Workflow**:
1. Update version in `.claude-plugin/marketplace.json`
2. Run `./scripts/sync-plugins.sh`
3. Script propagates version to all plugin.json files
4. Commit all changes together

**Current Version**: 2.3.2
**Last Updated**: 2026-06-20

### Single Root Manifest Architecture

SAP plugins keep skill content under `skills/<name>/`, but each plugin has exactly one manifest at the plugin root:

```
plugins/sap-cap-capire/
├── .claude-plugin/plugin.json          # Plugin-level (root)
├── .mcp.json                           # Optional MCP config
├── agents/                             # Optional specialized agents
├── commands/                           # Optional slash commands
├── hooks/hooks.json                    # Optional hooks
└── skills/sap-cap-capire/              # Skill directory
    ├── SKILL.md                        # Main skill content
    ├── README.md                       # Keywords for discovery
    ├── references/                     # Documentation
    ├── templates/                      # Code templates
    └── scripts/                        # Executable scripts
```

**Why One Root Manifest?**

- The installable unit is the plugin directory, including skills, agents, commands, hooks, MCP configs, templates, and references.
- The marketplace points to `plugins/[name]`, so nested skill-level manifests are redundant and must not be restored.
- `scripts/validate-inventory.sh` enforces root manifest count and rejects nested skill-level manifests.

**Auto-Generation**: Root manifests are generated from SKILL.md YAML frontmatter by `generate-plugin-manifests.sh`.

### Central Registry System

#### marketplace.json Structure

**Location**: `.claude-plugin/marketplace.json`
**Size**: ~40KB (38 plugins)
**Auto-Generated**: By `generate-marketplace.sh`

**Structure**:
```json
{
  "name": "sap-skills",
  "version": "2.3.2",
  "metadata": {
    "version": "2.3.2",
    "last_updated": "2026-06-20",
    "total_skills": 38,
    "categories": [
      "abap", "ai", "btp", "cap",
      "data-analytics", "hana",
      "tooling", "ui-development"
    ]
  },
  "plugins": [
    {
      "name": "sap-cap-capire",
      "description": "...",
      "version": "2.3.2",
      "source": "plugins/sap-cap-capire",
      "license": "GPL-3.0",
      "keywords": [...],
      "category": "cap"
    }
  ]
}
```

**Critical Detail**: `source` field must point to individual plugin directory (e.g., `"plugins/sap-cap-capire"`)
NOT `"./"` to avoid cache duplication (18× bloat).

#### Discovery and Installation

**Skill Discovery**:
- Claude reads marketplace.json metadata (name + description)
- Matches keywords to trigger skill loading
- Loads SKILL.md content when triggered

**Manual Installation** (if needed):
```bash
git clone https://github.com/secondsky/sap-skills.git
cd sap-skills
# Skills are auto-discovered by Claude Code
```

#### Cross-References Between Skills

**13 skills** have marketplace cross-references via keywords:

Example from sap-cap-capire:
```yaml
keywords:
  - cap
  - cds
  - sap-fiori-tools    # Cross-reference
  - sap-btp-cloud-platform  # Cross-reference
```

This enables portfolio-wide skill discovery.

---

## Quality Assurance for Technical Skills

### Manual Quality Review Process

**Tool**: manual quality review process
**Location**: `docs/contributor-guide/quality-assurance.md`
**Usage**: Follow the checklist in `quality-assurance.md`

#### Overview of Review Areas

1. **Pre-review setup** (5-10 min)
   - Installation verification
   - Version check
   - Discovery test

2. **Standards compliance** (10-15 min)
   - YAML frontmatter validation (exact rules)
   - Required fields: name (64 chars max), description (1024 chars max)
   - Third-person description style
   - No XML tags in descriptions

3. **Official docs verification** (15-30 min)
   - Context7/WebFetch for SAP official docs
   - GitHub releases for package versions
   - npm registry for latest versions

4. **Code examples audit** (20-40 min)
   - Import statements current
   - API methods still valid
   - Schemas match official docs
   - Templates tested in production

5. **Cross-file consistency** (15-25 min)
   - SKILL.md vs README.md alignment
   - References match actual files
   - No conflicting information

6. **Dependencies & versions** (10-15 min)
   - Package versions current (<90 days)
   - Breaking changes documented
   - No conflicting dependencies

7. **Additional review areas** (see quality-assurance.md for complete list)

#### Severity Classifications

- 🔴 **Critical**: Must fix before committing (security, broken templates, missing required fields)
- 🟡 **High**: Should fix soon (outdated versions, missing best practices)
- 🟠 **Medium**: Nice to have (documentation improvements, style issues)
- 🟢 **Low**: Optional (minor optimizations, suggestions)

#### When to Use Manual Quality Review

**Required**:
- Before committing new skills
- After SAP SDK updates (quarterly)
- When updating skill content
- Before creating pull requests

**Workflow**:
```bash
# Create or update skill
vim plugins/sap-cap-capire/skills/sap-cap-capire/SKILL.md

# Run review
# Follow docs/contributor-guide/quality-assurance.md

# Fix all 🔴 Critical and 🟡 High issues
# Optional: Fix 🟠 Medium issues

# Commit
git add plugins/sap-cap-capire
git commit -m "Update sap-cap-capire: [changes]"
```

### SAP SDK Version Tracking

#### Metadata Pattern

```yaml
---
name: sap-cap-capire
description: |
  SAP Cloud Application Programming Model (CAP) with Node.js development.
  Use when building CAP services, defining CDS models, or implementing
  CAP best practices.
metadata:
  version: "2.3.2"
  cap_version: "@sap/cds 9.4.x"
  last_verified: "2025-12-28"
  sap_btp_compatible: true
---
```

**Required Metadata Fields**:
- `version`: Skill version (synced with marketplace)
- `cap_version` (or equivalent): SAP SDK version in use
- `last_verified`: Date skill was last tested (YYYY-MM-DD)

**Optional Metadata**:
- `sap_btp_compatible`: true/false
- `requires_license`: SAP license requirements
- `min_node_version`: Minimum Node.js version

#### Version Check Process (Quarterly)

**Every 3 months**:

1. **Check npm registry**:
   ```bash
   npm show @sap/cds version        # Latest stable
   npm show @sap/cds-dk version     # CAP development kit
   npm show @sap/hana-client version # HANA client
   ```

2. **Review SAP release notes**:
   - Visit: https://help.sap.com
   - Check breaking changes
   - Review new features

3. **Update skill metadata**:
   - Update `cap_version` (or equivalent)
   - Update `last_verified` date
   - Update templates if needed

4. **Test in production**:
   - Create fresh project with new versions
   - Test all templates
   - Verify error messages still accurate

5. **Run manual quality review** using `docs/contributor-guide/quality-assurance.md`.

6. **Commit changes**:
   ```bash
   git add plugins/sap-cap-capire
   git commit -m "Update sap-cap-capire: SAP CDS 9.4.x compatibility"
   ```

### Verification Evidence Requirements

**Live SAP system/BTP tests are required before claiming live validation.** Public-source and package-registry checks must be recorded separately, and live tenant/system evidence must be tracked in `docs/project/source-verification-ledger.json`.

#### What to Test

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
- Test with ABAP Trial system or SAP S/4HANA Cloud
- Verify ABAP syntax current
- Test transport procedures

#### Error Catalog Validation

**Every skill should document common errors with solutions.**

**Format**:
```markdown
## Common Issues

| Issue | Solution | Source |
|-------|----------|--------|
| CAP: "cds.requires.db is missing" | Add db config to package.json | SAP Note 3234567 |
| BTP: "authentication failed" | Refresh OAuth token | help.sap.com/cf-auth |
| HANA: "SQL Error 1105" | Use batch API for large inserts | GitHub #1234 |
```

**Validation**:
- Test each error message actually occurs
- Verify solution actually works
- Cite authoritative sources (SAP Notes, help.sap.com, GitHub issues)

#### Template Verification

**All code templates MUST be tested in production.**

**Testing Process**:
1. Create fresh environment (clean directory, new BTP space)
2. Copy template code exactly as documented
3. Run without modifications
4. Verify it works end-to-end
5. Document any prerequisites clearly

**Example**:
```markdown
### Prerequisites
- Node.js 20.x or later
- SAP BTP Cloud Foundry account
- @sap/cds-dk installed globally: `npm install -g @sap/cds-dk`
```

### Known Issues Documentation

#### Pattern for SAP-Specific Issues

```markdown
## Known Issues

### CAP with HANA Cloud

**Issue**: Deploy fails with "HDI container not found"
**Cause**: Race condition in HANA service binding
**Solution**: Add `--wait-for-service` flag to cf push
**Source**: SAP Note 3456789
**Workaround**: Deploy twice - first without, second with migration

### BTP Connectivity

**Issue**: Destination service timeout
**Cause**: VPN not connected
**Solution**: Connect to SAP VPN before testing
**Source**: https://help.sap.com/connectivity

### Fiori Tools

**Issue**: "UI5 tooling not found"
**Cause**: Global vs local installation conflict
**Solution**: Use npx: `npx ui5-cli build`
**Source**: GitHub issue: sapui5/sapui5-tooling#123
```

#### Required Elements

For each known issue:
- ✅ **Issue**: Clear error message or symptom
- ✅ **Cause**: Root cause explanation
- ✅ **Solution**: Step-by-step resolution
- ✅ **Source**: SAP Note, help.sap.com URL, or GitHub issue
- ✅ **Workaround**: Alternative approach if solution doesn't work

---

## SAP-Specific Skill Patterns

### Error Catalog Pattern

#### Structure

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

### Category 3: Runtime Errors

| Error Code | Message | Solution |
|------------|---------|----------|
| AUTH_401 | Unauthorized | Refresh authentication token |
| TIMEOUT | Request timeout | Increase timeout in xs-app.json |
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

**Challenge**: SAP ecosystem uses Node.js, Java, AND ABAP

#### Considerations for Multi-Runtime Skills

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

#### SAP Community Resources

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

## Automation Scripts

### sync-plugins.sh

**Purpose**: Orchestrates complete plugin synchronization workflow

**Workflow**:
1. Read global version from `marketplace.json`
2. Call `generate-plugin-manifests.sh` to create/update plugin.json files
3. Call `generate-marketplace.sh` to regenerate central marketplace.json

**Usage**:
```bash
# Full sync (updates all plugin.json + marketplace.json)
./scripts/sync-plugins.sh

# Dry-run (preview changes without writing)
./scripts/sync-plugins.sh --dry-run

# Sync single skill
./scripts/generate-plugin-manifests.sh sap-cap-capire
```

**When to Run**:
- After adding new skills
- Before releases
- After updating skill YAML frontmatter
- When version changes in marketplace.json

**Output**:
```
✓ Reading version from marketplace.json: 2.3.2
✓ Generating plugin manifests...
  - sap-cap-capire: Updated
  - sap-btp-cloud-platform: Updated
  - [... 33 more skills ...]
✓ Regenerating marketplace.json...
  - Total plugins: 33
  - Categories: 8
✓ Sync complete!
```

### generate-plugin-manifests.sh

**Purpose**: Converts SKILL.md YAML frontmatter → plugin.json files

**Auto-Detection**:
- Reads YAML from SKILL.md
- Maps skill names to categories (via `lib/categorize.sh`)
- Extracts keywords from name + description
- Scans for `agents/` and `commands/` directories
- Generates both plugin-level and skill-level plugin.json

**Custom SAP Logic**:

**Category Mapping** (`lib/categorize.sh`):
```bash
sap-abap*         → "abap"
sap-btp-*         → "btp"
sap-cap-*         → "cap"
sap-fiori-*       → "ui-development"
sap-hana-*        → "hana"
sap-datasphere*   → "data-analytics"
sap-bw-*          → "data-analytics"
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

**Generated Fields**:
- name, description, version, license (from YAML)
- keywords (auto-extracted + deduplicated)
- category (auto-assigned)
- agents, commands (auto-detected)

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

**Output Structure**:
```json
{
  "name": "sap-skills",
  "version": "2.3.2",
  "metadata": {
    "version": "2.3.2",
    "last_updated": "2025-12-28T12:00:00Z",
    "total_skills": 38,
    "categories": ["abap", "ai", "btp", "cap", "data-analytics", "hana", "tooling", "ui-development"]
  },
  "plugins": [ ... 33 entries ... ]
}
```

**Usage**:
```bash
# Regenerate marketplace
./scripts/generate-marketplace.sh

# Dry-run
./scripts/generate-marketplace.sh --dry-run

# Validate output
jq '.plugins | length' .claude-plugin/marketplace.json  # Should be 38
jq '.metadata.total_skills' .claude-plugin/marketplace.json  # Should be 38
```

---

## Quarterly Maintenance

### Version Check Process

**Frequency**: Every 3 months (quarterly)

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
     version: "2.3.2"
     cap_version: "@sap/cds 9.5.x"  # Updated
     last_verified: "2026-03-28"     # Updated
   ```

4. **Test breaking changes**:
   - Create fresh project with new version
   - Test all skill templates
   - Verify error messages still accurate
   - Update error catalog if needed

5. **Run manual quality review** using `docs/contributor-guide/quality-assurance.md`.

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

## Summary: SAP Guide vs plugin-dev

### Clear Boundaries

#### plugin-dev handles:
- ✅ How to create skills (YAML, structure, files)
- ✅ How to add commands, agents, hooks
- ✅ How to integrate MCP servers
- ✅ Basic validation and testing
- ✅ Progressive disclosure patterns
- ✅ Plugin directory structure

#### SAP Guide handles:
- 🔧 How to manage 30+ skill portfolios
- 🔧 How to version SAP SDKs (quarterly updates)
- 🔧 How to document SAP errors and known issues
- 🔧 How to use marketplace infrastructure (central registry, cross-references)
- 🔧 How to maintain technical domain skills (production testing, error catalogs)
- 🔧 manual quality review process for SAP skills (manual quality review process)
- 🔧 SAP-specific patterns (BTP, CAP, HANA, ABAP, Fiori)

---

## Getting Help

### For General Plugin Development
→ Use **plugin-dev skills** (official Anthropic):
- `/use plugin-dev:skill-development`
- `/use plugin-dev:command-development`
- `/use plugin-dev:agent-development`

### For SAP-Specific Patterns
→ Read this guide (SAP_DEVELOPMENT_GUIDE.md):
- Marketplace infrastructure
- Quality assurance patterns
- SAP SDK versioning
- Automation scripts

### For Quality Verification
→ Use **manual quality review process** in `docs/contributor-guide/quality-assurance.md`.

### For Issues
→ GitHub Issues:
https://github.com/secondsky/sap-skills/issues

---

**Last Updated**: 2026-06-20
**Next Review**: 2026-08-31 (Quarterly)
**Maintainer**: Eduard Jiglau | [hello@sap-ai-skills.com](mailto:hello@sap-ai-skills.com) | [sap-ai-skills.com](https://sap-ai-skills.com) | [github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
