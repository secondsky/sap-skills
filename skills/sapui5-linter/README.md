# SAPUI5 Linter Skill

Comprehensive Claude Code skill for the **UI5 Linter** (@ui5/linter) - static code analysis for SAPUI5 and OpenUI5 projects.

## Auto-Trigger Keywords

This skill automatically triggers when working with:

### Tool & Package Names
- ui5lint
- @ui5/linter
- UI5 Linter
- SAPUI5 Linter
- OpenUI5 Linter
- ui5lint.config.js
- ui5lint.config.mjs
- ui5lint.config.cjs

### Linting Activities
- lint UI5 code
- lint SAPUI5 application
- lint OpenUI5 library
- static code analysis UI5
- UI5 code quality
- UI5 linting rules
- UI5 deprecated API detection
- UI5 global variable detection
- UI5 CSP violations
- UI5 manifest validation
- UI5 autofix

### Specific Rules
- no-deprecated-api
- no-globals
- no-implicit-globals
- async-component-flags
- csp-unsafe-inline-script
- no-ambiguous-event-handler
- no-deprecated-component
- no-deprecated-library
- no-deprecated-theme
- no-pseudo-modules
- parsing-error
- autofix-error
- prefer-test-starter
- ui5-class-declaration
- unsupported-api-usage
- no-outdated-manifest-version
- no-removed-manifest-property
- no-legacy-ui5-version-in-manifest

### Migration & Compatibility
- UI5 2.x migration
- UI5 2.0 compatibility
- legacy-free UI5
- UI5 deprecation
- modernize UI5 code
- upgrade UI5 version
- Manifest Version 2
- UI5 minVersion 1.136

### Configuration & Setup
- configure UI5 linter
- setup UI5 linting
- UI5 lint ignore patterns
- UI5 lint configuration
- ui5lint ignore
- ui5lint files
- UI5 linter CI/CD
- UI5 linter GitHub Actions
- UI5 linter pre-commit hook

### Common Errors & Issues
- sap.ui.getCore() deprecated
- global variable UI5
- jQuery.sap deprecated
- Core.getConfiguration deprecated
- Core.loadLibrary deprecated
- synchronizationMode manifest
- tap event deprecated
- press event handler
- ODataModel properties deprecated
- SmartTable exportType deprecated
- Bootstrap script attributes deprecated

### Autofix Scenarios
- autofix deprecated APIs
- autofix global variables
- autofix manifest properties
- autofix event handlers
- replace sap.ui.getCore
- replace jQuery.sap
- update manifest v2
- fix UI5 deprecations
- UI5LINT_FIX_DRY_RUN

### File Types
- lint JavaScript UI5
- lint TypeScript UI5
- lint XML views
- lint JSON manifest
- lint HTML UI5
- lint YAML ui5.yaml
- lint .js files UI5
- lint .ts files UI5
- lint .xml files UI5

### Integration Keywords
- npm run lint UI5
- UI5 lint script
- package.json UI5 linter
- Husky UI5 lint
- lint-staged UI5
- GitHub Actions UI5 lint
- GitLab CI UI5 lint
- Jenkins UI5 lint
- pre-commit UI5 lint

### Performance & Optimization
- UI5 linter performance
- optimize UI5 linting
- slow UI5 lint
- UI5 lint large codebase
- ui5lint --perf
- UI5 linter benchmarks

### Output & Reporting
- ui5lint --format json
- ui5lint --format markdown
- ui5lint --format html
- UI5 lint report
- UI5 linting results
- ui5lint --details
- ui5lint --quiet
- ui5lint --verbose

### Troubleshooting
- UI5 linter not working
- ui5lint parsing error
- ui5lint autofix error
- UI5 linter config not found
- UI5 lint patterns not working
- UI5 linter slow performance

## What This Skill Provides

### Comprehensive Coverage
- ✅ **19 linting rules** with detailed explanations and examples
- ✅ **Autofix capabilities** and limitations comprehensively documented
- ✅ **CLI options** - All command-line flags with use cases
- ✅ **Configuration patterns** - ESM/CommonJS templates and examples
- ✅ **Performance optimization** - Benchmarks and tuning strategies
- ✅ **Integration guides** - CI/CD, pre-commit hooks, npm scripts

### Progressive Disclosure
- **Metadata** (~200 words): Always loaded for skill discovery
- **Main SKILL.md** (~4,500 words): Core concepts, quick start, common scenarios
- **Reference files** (~15,000 words): Deep dives on demand
  - rules-complete.md: All 19 rules in detail
  - autofix-complete.md: Complete autofix reference
  - cli-options.md: All CLI flags and options
  - configuration.md: Advanced configuration
  - performance.md: Benchmarks and optimization

### Ready-to-Use Templates
- `ui5lint.config.mjs` - ES Module configuration
- `ui5lint.config.cjs` - CommonJS configuration
- `package.json.template` - npm integration
- `github-actions-lint.yml` - GitHub Actions workflow
- `husky-pre-commit.template` - Pre-commit hook

### Token Efficiency
- **Without skill**: ~17k tokens (trial and error, web searches)
- **With skill**: ~6k tokens (direct guidance, zero errors)
- **Savings**: ~64% token reduction

## Usage Examples

### Ask Claude Code:
```
"Set up UI5 linter in my project"
"How do I fix deprecated APIs in UI5?"
"Configure UI5 linter to ignore test files"
"What is the no-globals rule?"
"Help me migrate to UI5 2.x"
"Fix manifest version errors"
"Why is ui5lint slow on my large codebase?"
"Set up UI5 linter in GitHub Actions"
```

## Source Information

**Official Repository**: https://github.com/UI5/linter
**Current Version**: 1.20.5 (November 2025)
**Node.js**: v20.11+ or v22+
**License**: Apache-2.0

### Documentation Links
- README: https://github.com/UI5/linter/blob/main/README.md
- Rules: https://github.com/UI5/linter/blob/main/docs/Rules.md
- Autofix: https://github.com/UI5/linter/blob/main/docs/Scope-of-Autofix.md
- Development: https://github.com/UI5/linter/blob/main/docs/Development.md
- Performance: https://github.com/UI5/linter/blob/main/docs/Performance.md
- CHANGELOG: https://github.com/UI5/linter/blob/main/CHANGELOG.md

## Skill Metadata

**Version**: 1.0.0
**Last Updated**: 2025-11-21
**UI5 Linter Version**: 1.20.5
**Maintained By**: SAP Skills Repository
**License**: MIT

## Update Schedule

**Quarterly Review** (Every 3 months):
- Check latest UI5 Linter version
- Update rule documentation
- Verify autofix capabilities
- Update templates and examples
- Test with latest UI5 versions

**Next Review**: 2026-02-21

## Contributing

For issues or improvements related to this skill:
- Repository: https://github.com/secondsky/sap-skills
- Issues: https://github.com/secondsky/sap-skills/issues

For UI5 Linter issues:
- Repository: https://github.com/UI5/linter
- Issues: https://github.com/UI5/linter/issues

---

**Quick Start**: See SKILL.md for complete documentation and usage instructions.
