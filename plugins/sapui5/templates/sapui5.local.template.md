---
# SAPUI5 Plugin User Settings Template
# Copy this template to sapui5.local.md in your project or plugin workspace for local overrides.

ui5_version: "1.120.0"
ui5_theme: "sap_horizon"
default_project_type: "freestyle"  # freestyle | fiori-elements | integration-card
default_language: "typescript"     # javascript | typescript
linter_auto_fix: false            # Auto-apply linter fixes
hook_strictness: "normal"         # strict | normal | relaxed
default_backend: "standalone"     # standalone | cap | custom
accessibility_level: "WCAG_AA"    # WCAG_A | WCAG_AA | WCAG_AAA
performance_validation: true
security_validation: true
testing_frameworks:
  unit: "qunit"
  integration: "opa5"
  coverage_threshold: 80
build_config:
  minify: true
  source_maps: false
  component_preload: true
  cache_buster: true
mcp_timeout: 30                   # MCP tool timeout in seconds
agent_auto_invoke: true           # Auto-invoke agents on keywords
custom_namespace: "com.mycompany"
default_odata_version: "v4"       # v2 | v4
---

# Settings Documentation

## UI5 Configuration
- **ui5_version**: Target UI5 framework version for API lookups and scaffolding
- **ui5_theme**: Default theme (sap_horizon, sap_fiori_3, sap_belize)

## Project Defaults
- **default_project_type**: Default for ui5-scaffold command
- **default_language**: JavaScript or TypeScript
- **default_backend**: Backend type for new projects

## Code Quality
- **linter_auto_fix**: When true, linter automatically applies fixes (use with caution)
- **hook_strictness**: Controls validation hook sensitivity
  - strict: Fail on any best practice violation
  - normal: Warn and ask for approval
  - relaxed: Suggestions only

## Accessibility & Security
- **accessibility_level**: Target WCAG compliance level
- **performance_validation**: Enable performance suggestions
- **security_validation**: Enable security checks (XSS, CSP)

## Testing
- **testing_frameworks**: Default testing setup
- **coverage_threshold**: Minimum coverage percentage

## Build Configuration
- **build_config**: Production build settings
- **component_preload**: Bundle components for faster loading

## MCP Integration
- **mcp_timeout**: How long to wait for MCP tools before fallback
- **agent_auto_invoke**: Auto-trigger agents on keyword match

## Customization
- **custom_namespace**: Default namespace for new projects (reverse domain notation)
- **default_odata_version**: Prefer OData v2 or v4 for data models
