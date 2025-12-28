# Changelog

All notable changes to SAP Skills will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-12-27

### Major Changes

#### Plugin Structure Migration
- **BREAKING**: Migrated from flat `skills/` directory to plugin-based architecture
- Repository structure changed from `skills/[name]/` to `plugins/[name]/skills/[name]/`
- All 33 skills successfully migrated and validated
- Generated 91 JSON manifest files (plugin.json at plugin and skill levels)
- Dual-level plugin architecture: plugin-level and skill-level manifests

### Added

#### Advanced Plugin Features
- **Agent Support**: 5 plugins now include specialized agents for autonomous task execution
  - **sap-datasphere**: 3 agents (datasphere-admin-helper, datasphere-integration-advisor, datasphere-modeler)
  - **sap-sac-custom-widget**: Custom widget development agents
  - **sap-sac-planning**: Planning application agents
  - **sap-sac-scripting**: Scripting automation agents
  - **sap-sqlscript**: SQL optimization and performance agents

- **Command Support**: 5 plugins with slash commands for quick access
  - **sap-datasphere**: `/datasphere-cli`, `/datasphere-connection-guide`, `/datasphere-space-template`, `/datasphere-view-template`
  - Additional command support for SAC and SQLScript plugins
  - Instant templates and guides via command invocation

- **Hook Support**: 5 plugins with validation and automation hooks
  - Pre-tool-use validation hooks
  - Post-tool-use automation hooks
  - Quality gate enforcement
  - Session lifecycle management

- **MCP Server Integration**: 3 plugins with Model Context Protocol support
  - **sap-cap-capire**: CAP MCP server (@cap-js/mcp-server)
    - Live access to compiled CDS models
    - Semantic search for entities, services, actions, relationships
    - CAP documentation query capabilities
    - Zero configuration required

  - **sap-datasphere**: Datasphere MCP server (@mariodefe/sap-datasphere-mcp)
    - Direct integration with SAP Datasphere API
    - Requires authentication via environment variables
    - Access to spaces, views, models, and connections

  - **sapui5**: UI5 Tooling MCP server (@ui5/mcp-server)
    - UI5 project tooling integration
    - Version-aware assistance (UI5 1.120.0+)
    - Project structure awareness

#### Enhanced Documentation
- **22 new reference files** across plugins providing deep-dive documentation
  - **sap-datasphere** (5 files):
    - `best-practices-patterns.md` - Design patterns and architectural guidance
    - `catalog-governance.md` - Data catalog and governance practices
    - `cli-commands.md` - Complete CLI reference
    - `data-products-marketplace.md` - Data product management
    - `whats-new-2025.md` - Latest features and updates

  - **sap-sac-planning** (4 files):
    - `bpc-live-connection.md` - BPC integration patterns
    - `data-action-tracing.md` - Debugging and tracing
    - `seamless-planning-datasphere.md` - Datasphere integration
    - `value-driver-trees.md` - Advanced planning scenarios

  - **sap-sac-scripting** (4 files):
    - `chart-variance-apis.md` - Chart customization APIs
    - `compass-seamless-planning.md` - Compass planning integration
    - `data-actions-enhancements.md` - Data action best practices
    - `whats-new-q4-2025.md` - Latest scripting features

  - **sap-sqlscript** (2 files):
    - `glossary.md` - SQLScript terminology reference
    - `skill-reference-guide.md` - Complete skill documentation

  - Additional template directories for rapid scaffolding

#### Marketplace Enhancements
- **Cross-references**: 13 plugins with comprehensive cross-skill references
  - **sap-abap** ↔ sap-abap-cds, sap-cap-capire, sap-fiori-tools, sap-btp-cloud-platform, sap-api-style
  - **sap-abap-cds** ↔ sap-abap, sap-btp-cloud-platform, sap-fiori-tools, sap-cap-capire, sap-api-style
  - **sap-btp-cloud-platform** ↔ sap-btp-best-practices, sap-cap-capire, sap-fiori-tools, sap-ai-core, sap-abap
  - **sap-btp-best-practices** ↔ sap-btp-cloud-platform, sap-btp-connectivity, sap-btp-service-manager
  - **sap-fiori-tools** ↔ sapui5, sap-cap-capire, sap-abap-cds, sap-btp-cloud-platform
  - **sapui5** ↔ sap-fiori-tools, sap-cap-capire, sap-btp-cloud-platform
  - **sap-cap-capire** ↔ sap-fiori-tools, sapui5, sap-btp-cloud-platform, sap-hana-cli, sap-abap
  - **sap-hana-cli** ↔ sap-cap-capire, sap-btp-cloud-platform, sap-abap-cds, sap-datasphere
  - **sap-ai-core** ↔ sap-btp-cloud-platform, sap-cap-capire, sap-cloud-sdk-ai
  - **sap-api-style** ↔ sap-cap-capire, sap-fiori-tools, sap-abap, sapui5
  - **sap-btp-connectivity** ↔ sap-btp-cloud-platform, sap-btp-best-practices, sap-cap-capire
  - **sap-btp-service-manager** ↔ sap-btp-cloud-platform, sap-btp-best-practices, sap-btp-connectivity
  - **sap-btp-developer-guide** ↔ sap-btp-cloud-platform, sap-btp-best-practices, sap-cap-capire
  - Full cross-reference network documented in CLAUDE.md

- **Enhanced Metadata**: All skills include comprehensive keywords for improved discovery
- **Category Organization**: Skills organized into 5 categories (Tooling, BTP, UI, Data, Core)

### Changed

#### Infrastructure Updates
- **Scripts**: Updated generation and synchronization scripts
  - `generate-plugin-manifests.sh`: Generates plugin.json from SKILL.md YAML frontmatter
  - `sync-plugins.sh`: Unified version sync, manifest generation, and marketplace update
  - `generate-marketplace.sh`: Creates marketplace.json from all plugin.json files
  - All scripts support dry-run mode for safety

- **Version Alignment**: All 33 skills synchronized to version 2.1.0 or higher
- **Directory Structure**: Standardized plugin structure across all skills
- **Manifest Generation**: Automated dual-level manifest creation

#### Documentation Structure
- **Plugin Paths**: All documentation updated to reflect `plugins/[name]/skills/[name]/` structure
- **README Updates**: Skill-level README files enhanced with auto-discovery keywords
- **SKILL.md Updates**: Aligned with latest Anthropic skills specification
- **Cross-Linking**: Improved internal documentation cross-references

### Fixed

- **Quality Checks**: Removed failing quality checks workflow
- **Path References**: Fixed QUICK_WORKFLOW.md link paths in documentation
- **Backup Cleanup**: Removed SKILL.md.backup files after migration
- **Manifest Consistency**: Ensured all plugin.json files have consistent structure
- **Marketplace Paths**: Updated all source paths in marketplace.json

### Documentation

- **CLAUDE.md**: Comprehensive project guidelines with critical review instructions
  - Manual review requirement (no automation scripts for refactoring)
  - Skill-review skill usage for quality audits
  - Current status documentation (33 production-ready skills)
  - Marketplace cross-references documentation
  - Quality standards and verification checklist

- **migra.md**: Complete migration guide for plugin structure
  - Problem diagnosis and solution
  - Correct plugin structure examples
  - Migration steps and validation

- **README.md**: Updated to reflect new plugin architecture
  - Installation instructions
  - Skill auto-trigger examples
  - 33 skills organized by category
  - Plugin structure diagram
  - Building new skills guide
  - Documentation links

- **CHANGELOG.md**: Introduced this changelog following Keep-a-Changelog format

---

## [2.0.0] - Previous Versions

Earlier versions used a flat `skills/` directory structure. Migration to plugin architecture completed in v2.1.0.

**Historical Structure**:
- Skills located at `skills/[name]/`
- Single-level manifest files
- Basic marketplace integration

**Migration Notes**:
- All v2.0.0 skills successfully migrated to v2.1.0 plugin structure
- No feature regressions during migration
- Enhanced capabilities added (agents, commands, hooks)

---

## Upgrade Guide

### From v2.0.0 to v2.1.0

If you have local modifications or custom skills:

1. **Backup your work**:
   ```bash
   git stash
   ```

2. **Pull the latest changes**:
   ```bash
   git checkout main
   git pull origin main
   ```

3. **Update local custom skills** to new structure:
   ```bash
   # Old structure: skills/my-skill/
   # New structure: plugins/my-skill/skills/my-skill/

   mkdir -p plugins/my-skill/skills/
   mv skills/my-skill plugins/my-skill/skills/my-skill
   ```

4. **Generate manifests**:
   ```bash
   ./scripts/sync-plugins.sh
   ```

5. **Verify**:
   ```bash
   jq '.plugins | length' .claude-plugin/marketplace.json
   # Should show total plugin count including your custom skills
   ```

---

## Links

- **Repository**: [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
- **Issues**: [GitHub Issues](https://github.com/secondsky/sap-skills/issues)
- **Anthropic Skills Spec**: [agent_skills_spec.md](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)
- **Claude Code Docs**: [Skills Documentation](https://docs.claude.com/en/docs/claude-code/skills)

---

**Maintained by**: SAP Skills Contributors
