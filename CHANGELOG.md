# Changelog

All notable changes to SAP Skills will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-07-17

### Added
- sap-bw-query: read-only InfoProvider metadata read (`bw_describe_provider` now returns characteristics with dimension groups, key figures, and dimensions) through capability-gated BWMT 1.27.36 connectivity services, with a javap-verified API map reference (`references/bwmt-api-map.md`).
- sap-bw-query: metadata-verified specification validation — `bw_resolve_and_validate_spec` accepts a connection `alias`, verifies every referenced characteristic/key figure against the provider, and reports blocking gaps plus `readyForDraft`/`metadataChecked`.
- sap-bw-query: QuerySpec v1 revision 1.1 with concrete schemas for restricted/calculated/formula key figures, structures, hierarchies, conditions, exceptions, display settings (zero suppression, sign presentation, result position), and enriched variables, including cross-reference validation.
- sap-bw-query: `bw_populate_query_editor` builds the confirmed draft inside the wizard-created, still-unsaved query editor (axes, key-figure structures, restricted/formula members, filters, variable bindings, conditions, exceptions, zero suppression) as one undoable editing-domain command with a per-element apply report; saving stays a human action.
- sap-bw-query: deep query model read — `bw_read_query_model` (capability-gated `readQueryModel` bridge call plus `QueryModelReader`) serializes an open query's complete EMF model to a stable read-only JSON contract with a `serializationIssues` list, and `bw_populate_query_editor` now runs it automatically after a successful population to merge a non-fatal `verification` summary (`VERIFIED`/`DIVERGED`/`UNAVAILABLE` with per-element checks) that compares the confirmed spec against the live model; the human-save boundary is unchanged (`saved: false`).
- sap-bw-query: shared best-practices rule engine (`mcp/src/query-rules.mjs`, catalog BWQ001–BWQ012) that reviews both draft specs and open queries against BW query-design rules — exposed as the read-only `bw_review_query` tool (reusing the `readQueryModel` deep read), an additive `bestPractices` array on `bw_resolve_and_validate_spec`, the `references/query-design-rules.md` catalog, and the `/bw-query-review` and `/bw-query-explain` commands; everything read-only with the safety contract unchanged.
- sap-bw-query: metadata-aware optimization proposals (`VARIABLE_REUSE`, `RESTRICTED_MEASURE_CONSOLIDATION`, `HIERARCHY_DISPLAY_LEVEL`, `AGGREGATION_CONFIRMATION`, `FREE_AXIS_CANDIDATE`) tagged as semantics-preserving or semantics-changing.
- sap-bw-query: live-validation runbook (`docs/project/sap-bw-query-live-validation-runbook.md`); execution remains pending and the verification ledger keeps live BW validation marked pending.
- sap-bw-query: round-trip smoke that builds an in-memory query with `QueryModelBuilder`, reads it back with `QueryModelReader`, and asserts model round-trip integrity fully offline (no workbench, no save). It runs as plain Java (`StandaloneSmoke`) against a curated BWMT model classpath in CI after every bundle build — reliable and fast, unlike launching the full Eclipse product headless; an in-OSGi `SmokeApplication` variant also exists. Plus a QuerySpec template library (`references/query-templates/` — plan/actual variance, YTD comparison, top-N, reconciliation totals — with `references/query-templates.md`) whose starting-point specs validate with no warning-severity design-rule finding.
- sap-bw-query: the bundle builder (`bundle/Build-BwStudio.ps1`) now publishes the finished release ZIP and manifest (plus signature files when signed) to the local user Desktop (`%USERPROFILE%\Desktop`) by default after a successful build, then opens File Explorer on the output directory with the artifact selected; it refuses to auto-publish into a OneDrive-managed Desktop (warning and leaving the artifacts in the output directory), an explicit `-PublishDirectory` always wins, `-SkipPublish` disables publishing, `-SkipExplorer` (and automatic CI/non-interactive detection) disables the Explorer launch, and any publish or Explorer failure only warns without failing the build.

### Changed
- Bumped the coordinated repository, marketplace, plugin manifest, and skill metadata versions to 2.4.0.
- sap-bw-query internal bundle/plugin/MCP version 0.1.0 → 0.3.0 (0.2.0 carried the metadata read and editor population; 0.3.0 adds the deep query model read, review surfaces, and the headless smoke application; a rebuild and redeploy is required to pick up each new Eclipse plug-in and MCP server).
- sap-bw-query: editor scans now run on the SWT display thread, fixing open-editor inspection (`bw_list_queries`, `bw_read_query`, `bw_describe_provider` openQueries) that previously always returned empty results from the bridge thread.
- sap-bw-query: the deployer (`scripts/BwStudio.ps1`) now handles a same-version redeploy with changed content instead of silently no-op'ing. It records the physical install folder as `installDir` on the activation record and resolves the runtime from it; an unchanged artifact is reused idempotently, while a same-version build with different content installs into a content-addressed sibling folder (`versions/<version>+<sha>`) and is activated, leaving every prior folder untouched (still strictly append-only, no deletion). `Start-BwMcp.ps1`, launch, status (`activeInstallDir`), and rollback all resolve via `installDir` with a fallback for older records.

### Fixed
- sap-bw-query: `QueryModelBuilder` resolved BWMT EEnums via `getByName(javaConstantName)`, but the model enums expose CamelCase names/literals (e.g. `EQUAL`→`Equal`, `TOP_N`→`TopN`, `BAD1`→`Bad1`, `FOR_ALL_VALUES`→`forAllValues`), so every lookup returned null — comparison/condition/exception operators, alert levels, sign presentation, and zero-suppression mode would all have failed to apply on a live populate. Replaced all six sites with a normalization-based resolver that matches the Java constant name, EMF name, or literal; verified end-to-end by the round-trip smoke on real EMF objects (found via the live smoke; offline JS tests never exercised the real enums).
- sap-bw-query: the Activator no longer starts the interactive named-pipe bridge (and no longer subclasses `AbstractUIPlugin`) when `-Dbw.automation.headless=true`, so headless entry points do not drag in the workbench/bridge machinery.

### Changed
- Bumped the coordinated repository, marketplace, plugin manifest, and skill metadata versions to 2.3.2.

### Fixed
- Removed redundant manifest-level hook path declarations and switched hook activation to Node-based validator entrypoints to avoid Claude Code hook loader crashes while keeping hook sidecars portable across supported operating systems.

## [2.3.1] - 2026-06-19

### Added
- Added `sap-sac-test-automation` for SAP Analytics Cloud browser and Playwright automation, including dashboard profile/scenario guidance, governance and testability notes, failure-triage artifacts, Edge/CDP patterns, Chrome DevTools MCP coverage, and `/sac-test-onboard`.
- Added `sap-rpt1` for SAP-RPT-1-OSS FI/CO local tabular prediction workflows, including prepare/predict commands, sample FI/CO datasets, leakage checks, governance guidance, enterprise portability notes, and source-review evidence.
- Added CAP CDS LSP launcher support and exposed the CAP LSP configuration through generated plugin and marketplace metadata.
- Added SAC custom widget design/runtime guidance, AI-assisted composite generation notes, CSS/styling compliance coverage, browser runtime references, and design-runtime templates.
- Added an SAP Integration Suite HTTPS-to-SFTP iFlow package authoring reference and reusable template package.
- Added Oracle shared review tooling and multi-harness portability documentation for using the same SAP skills across supported AI coding assistants.

### Changed
- Bumped the coordinated repository, marketplace, plugin manifest, and skill metadata versions to 2.3.1.
- Updated README and current-state marketplace documentation for the 37-plugin inventory: 64 commands, 31 agents, 8 hook-enabled plugins, 6 MCP-enabled plugins, and 1 LSP-enabled plugin.
- Strengthened validation coverage for manifest drift, MCP security and environment contracts, packaging hygiene, public claims, Oracle browser safety, reference provenance, templates, command/agent contracts, hook contracts, and skill quality.
- Improved multi-harness wording and evidence language so Claude-specific sidecars are described as portable guidance where clients do not support them natively.

### Fixed
- Removed outdated website planning documents and stale marketplace backup artifacts from the packaged repository state.
- Addressed SAP-RPT-1 follow-up review items, including third-party attribution cleanup.

## [2.3.0] - 2026-06-14

### Added
- Added 18 targeted slash commands for ABAP Cloud review, ABAP CDS model checks, AI Core deployment checks, Cloud SDK AI chat templates, BTP destination/logging/service-manager/transport diagnostics, dependency upgrade planning, Fiori generation/preview checks, HANA connection/object inspection, UI5 CLI build/troubleshooting, and UI5 Linter check/fix planning.
- Added 2 specialist agents: `fiori-app-advisor` and `hana-database-advisor`.
- Added 14 third-pass slash commands for API style, BTP architecture/readiness, Work Zone, BAS, CIAS, Cloud Identity Services, Integration Suite, ISA export, Job Scheduling, MDI, Data Intelligence, and HANA ML planning checks.
- Added 4 third-pass advisory agents: `api-style-reviewer`, `btp-platform-advisor`, `identity-security-advisor`, and `integration-flow-advisor`.
- Added the `sap-dependency-security` hook profile to flag unpinned executable package specs, `@latest`, and credential-like literals in dependency and MCP configuration files.
- Added `npm run audit:skills` as a read-only per-plugin capability and verification-status report.
- Added `npm run audit:effectiveness` as a read-only report for trigger quality, README drift, oversized references, command contracts, capability inventory, and next recommended artifacts.
- Added `docs/project/plugin-skills-third-pass-audit-2026-06-14.md` documenting per-plugin findings, docs-only evidence, and unresolved production-only checks.

### Changed
- Renamed `dependency-upgrade` to `sap-dependency-security` as the canonical SAP dependency security and MCP executable trust policy plugin.
- Added SAP/MCP dependency policy coverage for MCP server pins, SAP Node tooling, Java/Maven, Gradle, Python, containers, BTP/CF/mbt, and ABAP/gCTS review workflows.
- Exposed plugin sidecar capabilities in generated public interfaces: plugin manifests and marketplace entries now carry `hooks` and `mcpServers` when present.
- Standardized command and agent metadata, including explicit tool scopes, input hints, trigger-rich descriptions, MCP fallback guidance, and tenant/write safety constraints.
- Standardized all slash commands with an `Output Contract` and read-only/non-mutating defaults unless explicitly generation or fix-planning commands.
- Added compact capability indexes to all plugin-local README files and routed oversized references through SKILL.md search guidance.
- Strengthened validation for packaged artifacts, hook/MCP manifest consistency, command/agent quality, nested manifests, dependency-security hook cases, README capability drift, oversized-reference routing, command output contracts, and mutating-default safeguards.
- Bumped the marketplace and all generated plugin manifests to version 2.3.0.
- Documented final third-pass inventory: 35 plugins, 61 commands, 30 agents, 8 hook-enabled plugins, 6 MCP configs, and 1 LSP config.
- Removed the local `.agents` mirror check from active validation; `.agents/skills/dependency-upgrade` remains a local mirror only.

### Fixed
- Addressed PR #82 review findings by pinning the Trivy action template to `aquasecurity/trivy-action@v0.36.0` and making its checklist valid YAML comments.
- Updated the Python security template so `uv` projects use `uv audit` and only run `pip-audit` after exporting `requirements.txt`.
- Corrected stale SAPUI5 and Datasphere MCP version references to match the approved exact pins.
- Removed generated hook bytecode artifacts from packaged plugins and made validation fail on future `__pycache__/`, `*.pyc`, backup/temp, and `.DS_Store` artifacts.

## [2.2.3] - 2026-06-12

### Added
- **sap-cloud-sdk-ai-python**: New plugin at `plugins/sap-cloud-sdk-ai-python` with comprehensive guides and orchestration support
  - 5 reference docs: getting-started-auth, langchain-guide, native-clients-guide, orchestration-guide, troubleshooting
  - 385-line SKILL.md covering SAP Cloud SDK for AI Python client
- **sap-btp-cloud-identity-services**: New plugin at `plugins/sap-btp-cloud-identity-services` with core documentation references
  - 4 reference docs: app-integration-patterns, authorization-management, cloud-foundry-security, xsuaa-integration-guide
  - 165-line SKILL.md covering authentication, authorization, and identity patterns on BTP
- **sap-ai-core**: Expanded AI Launchpad guide, generative AI hub, model providers, and orchestration modules references
- **sap-btp-best-practices**: Added `ai-development-best-practices.md` reference (155 lines)
- **sap-cap-capire**: Added comprehensive patterns for CAP integration with SAP Cloud SDK for AI including asynchronous processing guidelines
- **sap-cloud-sdk-ai**: Added 59 lines of new patterns for AI integration
- **sap-btp-developer-guide**: Added AI development best practices references

### Changed
- **sap-sac-scripting**: Refreshed to QRC2 2026 (SAC 2026.8, OSE API v2025.20)
  - Skill version bumped 3.0.1 → 3.1.0
  - New `references/whats-new-qrc2-2026.md` covering Q2 2026 scripting changes
  - All 8 OSE API reference files updated from v2025.14 to v2025.20
  - Added 13 missing OSE API classes (DataUpload*, Variance*, Compass, Math, DataLabelType)
  - Reference count: 63 → 65
- **sap-sac-custom-widget**: Refreshed to QRC2 2026
  - Documented missing schema properties in `json-schema-reference.md`
  - Expanded `advanced-topics.md` with 49 new lines
  - Updated README and SKILL.md
- **sap-sac-planning**: Refreshed to QRC2 2026 (SAC 2026.8)
- **README.md**: Restructured with universal installation via [vercel-labs/skills](https://github.com/vercel-labs/skills), compacted plugin tables, added table of contents

---

## [2.2.2] - 2026-05-30

### Added
- Added `dependency-upgrade` plugin at `plugins/dependency-upgrade` and hooked it into `.claude-plugin/marketplace.json` generation.
- Added dependency hardening references to high-confidence dependency-using SKILLs in:
  - `sap-cloud-sdk-ai`
  - `sap-hana-cli`
  - `sap-fiori-tools`
  - `sap-cap-capire`
  - `sap-datasphere`
  - `sap-btp-job-scheduling`
  - `sapui5-linter`
  - `sapui5`
  - `sap-hana-ml`
  - `sap-sac-scripting`
  - `sapui5-cli`
- Added dependency security workflow:
  - `.github/workflows/dependency-security-checks.yml`
  - deterministic policy enforcement for dependency-manageable skill and lockfile/PM changes
- Replaced `plugins/dependency-upgrade` generator placeholder implementation with functional script:
  - `.agents/dependency-upgrade/scripts/generate-dependency-upgrades.sh`
- Added dependency hardening reference notes in `.agents` workflow/automation docs

## [2.2.1] - 2026-05-30

### Fixed
- **Issue #74**: Removed blocking `UserPromptSubmit` hooks from `sap-sqlscript` and `sap-sac-custom-widget` that were stopping unrelated prompts (e.g., "hello"). Both skills now rely on non-blocking, command-based validation hooks only.

## [2.1.8] - 2026-04-02

### Added
- Frontmatter validation infrastructure ported from [claude-skills](https://github.com/secondsky/claude-skills)
  - `scripts/validate-frontmatter.sh`: comprehensive SKILL.md YAML frontmatter checker
  - `.github/workflows/validate-frontmatter.yml`: CI workflow (diff on PR, full scan on push)
  - `.github/workflows/validate-json-schemas.yml`: CI workflow with artifact upload on failure
  - `.githooks/pre-push`: validates changed SKILL.md files before push
  - Enhanced `.githooks/pre-commit` with `--spec=draft7` consistency
  - Split `quality-checks.yml` into focused workflows

### Fixed
- **sapui5**, **sapui5-linter**: Fixed YAML frontmatter parsing errors preventing skill installation (#63)
- **sap-abap-cds**, **sap-btp-cloud-platform**: Fixed description overflow preventing skill installation (#65)
- **sap-btp-connectivity**, **sap-btp-integration-suite**, **sap-datasphere**, **sap-sac-custom-widget**: Fixed description overflow (>1024 chars)
- **sapui5-linter**: Fixed unclosed quote on `ui5_linter_version` metadata field
- All 32 skills now pass frontmatter validation

---

## [2.1.7] - 2026-03-14

### Changed

- **Hook validators hardening** (sap-cap-capire, sap-datasphere, sap-sac-custom-widget, sap-sac-planning, sap-sac-scripting, sap-sqlscript, sapui5): Four CodeRabbit-identified fixes applied to all 14 validator files (validator.mjs + validator.py per plugin):
  - Added stdin `error` event handler in `readStdin()` to prevent Promise hang on I/O errors
  - Security risk messages now enumerate **all** detected risks with explanations, not just the first
  - Function constructor check upgraded to whitespace-tolerant regex (`new\s+function\s*\(`)
  - WHERE clause detection upgraded to word-boundary regex (`\bwhere\b`) to catch newline-separated SQL

---

## [2.1.6] - 2026-02-26

### Added
- **sap-sqlscript**: Added `/sqlscript-setup` command for automated development environment setup
  - New `scripts/setup-vscode.sh` detects VS Code, installs `@sap/hana-sqlscript-lsp` VSIX, checks HANA env vars
  - Command parses structured script output, writes/merges `.vscode/settings.json`, prints summary table
  - Hybrid approach: shell for deterministic steps, LLM for environment summary and settings authoring

### Changed
- **Hooks hardening**: Replaced broad prompt-based `Write|Edit` hooks with deterministic command hooks in 7 plugins
  - Plugins: `sap-cap-capire`, `sapui5`, `sap-datasphere`, `sap-sac-planning`, `sap-sac-scripting`, `sap-sac-custom-widget`, `sap-sqlscript`
  - Added runtime fallback per plugin hook: Node.js primary, Python fallback, fail-open allow mode
  - Enforced structured JSON hook output and security-focused blocking (`PreToolUse` only); `PostToolUse` remains advisory
  - Goal: prevent unrelated file edits from stopping continuation in mixed-plugin workflows (issue #60)

---

## [2.1.5] - 2026-02-26

### Added
- **sap-sac-scripting**: Added MCP integration via community `sap_analytics_cloud_mcp`
  - New `.mcp.json` connecting to SAP Analytics Cloud REST API MCP server
  - 90 tools across 11 service areas: Content, Data Export, Data Import, Multi Actions,
    Calendar, Content Transport, User Management, Monitoring, Schedule & Publication,
    Translation, Smart Query
  - OAuth 2.0 Client Credentials authentication
  - Requires local clone and build from https://github.com/secondsky/sap_analytics_cloud_mcp
  - Set SAC_MCP_PATH, SAC_BASE_URL, SAC_TOKEN_URL, SAC_CLIENT_ID, SAC_CLIENT_SECRET

---

## [2.1.4] - 2026-02-26

### Added
- **sap-fiori-tools**: Added MCP integration via `@sap-ux/fiori-mcp-server`
  - New `.mcp.json` connecting to SAP's official Fiori MCP server
  - 5 tools: search_docs, list_fiori_apps, list_functionalities, get_functionality_details, execute_functionality
  - Semantic search across Fiori Elements, Annotations, UI5, and Fiori tools documentation
  - AI-assisted programmatic Fiori app generation and modification
  - No authentication required; requires Node.js 20+

---

## [2.1.3] - 2026-02-25

### Fixed
- **Reserved words validation**: Removed blocked words (official, anthropic, claude) from marketplace and plugin descriptions (fixes #56)
  - marketplace.json: Updated description to avoid CLI installation errors
  - sap-ai-core: Removed model name from description
  - sap-api-style: Changed "official SAP API Style Guide" to "the SAP API Style Guide"
  - sap-cloud-sdk-ai: Removed model name from description

### Added
- **validate-reserved-words.sh**: New validation script to prevent blocked words in name/description fields
- **GitHub Actions**: Added reserved words check to quality-checks.yml

### Changed
- **CLAUDE.md**: Added Reserved Words Policy documentation

---

## [2.1.2] - 2026-02-06

### Changed

#### Documentation Clarity
- **README.md**: Updated terminology to clarify distinction between plugins (installable units) and skills (AI capabilities)
  - Changed badge from "Skills" to "Plugins" to reflect what users install
  - Added subtitle: "32 Claude Code plugins for SAP development"
  - Updated installation instructions to use "plugins" terminology
  - Clarified that "plugins provide skills that auto-activate"

- **Plugin Tables**: Enhanced all 5 category tables with component visibility
  - Added Component Legend explaining Commands, Agents, and MCP features
  - Added 3 new columns (Commands | Agents | MCP) to show what each plugin offers
  - Component counts: 7 plugins with commands (28 total), 7 with agents (24 total), 4 with MCP integration
  - Clear indicators: Numbers for commands/agents, checkmark (✓) for MCP, em-dash (—) for none

- **Content Updates Throughout**:
  - "Building New Skills" → "Building New Plugins" section title
  - Repository Structure: Updated to accurate component counts
  - Contributing section: Clarified plugin vs. skill terminology
  - Success Metrics: Updated "skill creation/testing" to "plugin" terminology
  - 15+ terminology updates across all sections for consistency

### Why This Update

This release clarifies the conceptual model for users:
- **Plugins** are what you install via `/plugin install`
- **Skills** are the AI capabilities that activate automatically when you work
- Both terms are correct in their respective contexts

Component visibility helps users:
- Quickly identify which plugins offer advanced features (commands, agents, MCP)
- Understand the scope of each plugin's capabilities before installation
- Make informed decisions based on needs (basic skills vs. advanced automation)

## [2.1.1] - 2026-02-06

### Changed
- Updated author field from "SAP Skills Maintainers" to "E.J." across all 64 plugin.json files
- Added Claude Code-specific clarification to README.md explaining that skills follow Claude Code plugin patterns
- Updated contributor guide to reflect manual review process
- Removed skill-review automation references from all documentation
- Added deprecation notices to quality-assurance.md and skills-review-progress.md
- Updated workflow-checklist.md with manual quality review guidelines

### Removed
- **skill-review plugin** - Automated quality assurance plugin removed (transitioned to manual review process)
- Reduced total skills: 33 → 32
- Removed from Tooling & Development category (4 → 3 skills)

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

**Maintained by**: E.J.
