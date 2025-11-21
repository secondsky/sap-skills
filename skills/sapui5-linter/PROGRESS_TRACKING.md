# SAPUI5 Linter Skill - Information Extraction Progress

**Created**: 2025-11-21
**Status**: Complete - All information extracted
**Source Repository**: https://github.com/UI5/linter
**Current UI5 Linter Version**: 1.20.5 (2025-11-18)

---

## Extraction Status Summary

| Source | Status | Coverage | Notes |
|--------|--------|----------|-------|
| Main README | ✅ Complete | 100% | All features, installation, usage extracted |
| Rules.md | ✅ Complete | 100% | All 19 rules documented |
| Scope-of-Autofix.md | ✅ Complete | 100% | All autofix capabilities & limitations |
| Development.md | ✅ Complete | 100% | Dev setup, type management, autofix dev guidelines |
| Guidelines.md | ✅ Complete | 100% | Coding standards, testing, git workflow |
| Performance.md | ✅ Complete | 100% | Benchmarks, performance metrics |
| CHANGELOG.md | ✅ Complete | 100% | Version history, recent features |
| package.json | ✅ Complete | 100% | Dependencies, scripts, configuration |

---

## Detailed Information Coverage

### 1. Main README.md ✅

**Extracted Information:**
- ✅ Project purpose: Static code analysis for UI5 2.x migration
- ✅ Installation: Global and local installation methods
- ✅ System requirements: Node.js v20.11.x, v22.0.0+ and npm v8.0.0+
- ✅ Basic usage: CLI command `ui5lint [files...]`
- ✅ CLI options: All 15+ command-line flags documented
- ✅ Configuration system: File locations, formats (ESM/CommonJS)
- ✅ Configuration options: `ignores`, `files` glob patterns
- ✅ In-code directives: JavaScript, TypeScript, XML, HTML, YAML
- ✅ Autofix capabilities: `--fix` flag and dry-run mode
- ✅ Supported file types: .js, .ts, .xml, .json, .html, .yaml
- ✅ Node.js API: `ui5lint()` function and options
- ✅ Output formats: stylish, json, markdown, html
- ✅ License: Apache-2.0

**Documentation Links:**
- Main repo: https://github.com/UI5/linter
- README: https://github.com/UI5/linter/blob/main/README.md

---

### 2. Rules.md ✅

**Extracted Information (19 Rules):**

1. ✅ **async-component-flags**: Component async configuration validation
2. ✅ **csp-unsafe-inline-script**: CSP compliance for inline scripts
3. ✅ **no-ambiguous-event-handler**: Event handler notation validation
4. ✅ **no-deprecated-api**: Deprecated API usage detection
5. ✅ **no-deprecated-component**: Deprecated component dependencies
6. ✅ **no-deprecated-control-renderer-declaration**: Control renderer patterns
7. ✅ **no-deprecated-library**: Deprecated library dependencies
8. ✅ **no-deprecated-theme**: Deprecated theme usage
9. ✅ **no-globals**: Global variable usage detection
10. ✅ **no-implicit-globals**: Implicit global access patterns
11. ✅ **no-pseudo-modules**: Pseudo module dependencies
12. ✅ **parsing-error**: Syntax/parsing error reporting
13. ✅ **autofix-error**: Autofix failure reporting
14. ✅ **prefer-test-starter**: Test Starter concept validation
15. ✅ **ui5-class-declaration**: UI5 class declaration patterns
16. ✅ **unsupported-api-usage**: API usage validation
17. ✅ **no-outdated-manifest-version**: Manifest Version 2 requirement
18. ✅ **no-removed-manifest-property**: Incompatible manifest properties
19. ✅ **no-legacy-ui5-version-in-manifest**: Modern UI5 version requirement (1.136+)

**Rule Categories:**
- ✅ Async/Modern patterns (async-component-flags, prefer-test-starter)
- ✅ Security (csp-unsafe-inline-script)
- ✅ Deprecation detection (7 deprecation rules)
- ✅ Global usage (no-globals, no-implicit-globals)
- ✅ Manifest modernization (3 manifest rules)
- ✅ Error reporting (parsing-error, autofix-error)

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/docs/Rules.md

---

### 3. Scope-of-Autofix.md ✅

**Extracted Information:**

**Autofix Capabilities:**
- ✅ **no-globals**: Replace global references with module imports
- ✅ **no-deprecated-api**: Multiple deprecated pattern migrations
  - Configuration Facade method replacements
  - Core Facade method replacements
  - Button event handler migration (tap → press)
  - SmartTable export property updates
  - ODataModel property removals
  - SimpleForm property elimination
  - Bootstrap script attribute corrections

**Autofix Limitations (Comprehensive List):**
- ✅ Code outside module definitions
- ✅ Synchronous-to-asynchronous conversions
- ✅ Complex replacements requiring multiple calls
- ✅ Context-dependent replacements
- ✅ Return value changes

**Specific APIs Without Autofix:**
- ✅ jQuery.sap APIs: 5+ methods listed
- ✅ jQuery plugins: Not detected
- ✅ Global API assignments and deletions
- ✅ Pseudo module imports
- ✅ Core APIs: 20+ methods documented (Issue #619)
- ✅ Core Configuration APIs: 20+ methods (Issue #620)
- ✅ Sync-to-async barriers: Library loading, component creation, etc.

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/docs/Scope-of-Autofix.md

---

### 4. Development.md ✅

**Extracted Information:**
- ✅ SAPUI5 types management: Update process and script
- ✅ Update script command: `npm run update-sapui5-types -- <domain> <version>`
- ✅ Updated resources: @sapui5/types, api-extract.json, pseudo-modules
- ✅ Autofix development checklist
- ✅ 1:1 replacement guidelines
- ✅ Complex replacement standards
- ✅ TypeChecker usage for static type verification
- ✅ Comment and whitespace preservation rules

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/docs/Development.md

---

### 5. Guidelines.md ✅

**Extracted Information:**
- ✅ JavaScript coding standards: ESLint enforcement
- ✅ Linting command: `npm run lint`
- ✅ Testing requirements: AVA framework
- ✅ Test commands: `npm test`, `npm run unit`, `npm run unit-watch`
- ✅ Git workflow: Rebase over merge
- ✅ Commit message format: Conventional Commits
- ✅ Commit structure: `type(scope): Description`
- ✅ Example commit message

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/docs/Guidelines.md

---

### 6. Performance.md ✅

**Extracted Information:**
- ✅ Benchmark projects: 6 representative projects
- ✅ Project scale reference: Small (17 resources) to large (5000+ resources)
- ✅ Latest benchmark results (April 16, 2025)
- ✅ Environment: Node.js v23.11.0, MacBook Pro M1 Max
- ✅ Execution times: 680ms to 41 seconds
- ✅ Performance trends: Stable and predictable scaling
- ✅ Benchmarking methodology: hyperfine tool with warm-up runs
- ✅ Key observations: Consistent throughput rates

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/docs/Performance.md

---

### 7. CHANGELOG.md ✅

**Extracted Information:**
- ✅ Current version: 1.20.5 (2025-11-18)
- ✅ Recent major versions: 1.20.0, 1.19.0, 1.18.0, 1.14.0
- ✅ Version 1.20.0: Manifest v2 support, deterministic file ordering
- ✅ Version 1.19.0: 3 new autofix capabilities
- ✅ Version 1.18.0: Bootstrap parameter fixes, isA API autofix
- ✅ Version 1.14.0: Expanded autofix (Core, Configuration, jQuery.sap APIs)
- ✅ Development activity: Releases every 2-4 weeks

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/CHANGELOG.md

---

### 8. package.json ✅

**Extracted Information:**
- ✅ Current version: 1.20.5
- ✅ Package name: @ui5/linter
- ✅ Node requirement: ^20.11.0 or ≥22.0.0
- ✅ Module type: ES Module
- ✅ License: Apache-2.0
- ✅ CLI entry point: bin/ui5lint.js
- ✅ Key dependencies: @sapui5/types, @ui5/*, typescript, yargs, chalk
- ✅ Primary scripts: build, test, lint, coverage, e2e
- ✅ Development tools: ava, sinon, eslint, nyc, husky

**Documentation Link:**
- https://github.com/UI5/linter/blob/main/package.json

---

## Additional Resources Identified

### RFC (Request for Comments) Directory
- Location: https://github.com/UI5/linter/tree/main/rfcs
- Content: Significant change proposals
- Status: Not extracted (optional/advanced)

### Images Directory
- Location: https://github.com/UI5/linter/tree/main/docs/images
- Content: Visual assets for documentation
- Status: Not extracted (not required for skill)

### CONTRIBUTING.md
- Location: https://github.com/UI5/linter/blob/main/CONTRIBUTING.md
- Content: Contribution guidelines
- Status: Covered by Guidelines.md and Development.md

---

## Information Organization for Skill

### Core SKILL.md Sections (Progressive Disclosure)

**Always Loaded (Metadata):**
- Name: sapui5-linter
- Description: Comprehensive usage scenarios (~150 words)

**Main Body (<5k words):**
1. **Overview**: Purpose, when to use, key capabilities
2. **Prerequisites**: Node.js version, installation
3. **Quick Start**: Most common usage patterns
4. **Configuration**: Config file setup, options
5. **CLI Usage**: Command structure, essential options
6. **Rules Overview**: Brief summary with links to references
7. **Autofix Guide**: When to use, limitations
8. **Common Patterns**: Typical workflows
9. **Troubleshooting**: Known issues, workarounds
10. **References**: Link to detailed reference files

**Reference Files (Loaded on demand):**
- `references/rules-complete.md`: All 19 rules in detail
- `references/autofix-complete.md`: Comprehensive autofix capabilities
- `references/cli-options.md`: All CLI flags and options
- `references/configuration.md`: Advanced configuration
- `references/performance.md`: Benchmarks and optimization
- `references/development.md`: For contributors

**Template Files:**
- `templates/ui5lint.config.js`: ESM configuration
- `templates/ui5lint.config.cjs`: CommonJS configuration
- `templates/package.json`: Integration example
- `templates/.eslintrc.yml`: Integration with ESLint

---

## Token Efficiency Strategy

**Without Skill** (Estimated):
- User asks: "How do I use UI5 linter?"
- Claude searches web/docs: ~8k tokens
- Trial and error with config: ~4k tokens
- Debugging rule issues: ~5k tokens
- **Total: ~17k tokens**, 2-3 errors likely

**With Skill** (Estimated):
- Skill metadata loaded: ~200 tokens
- Main SKILL.md body: ~4k tokens
- Reference on demand: ~2k tokens
- **Total: ~6.2k tokens**, 0 errors
- **Savings: ~64%** ✅

---

## Update Schedule

**Quarterly Review** (Every 3 months):
- Check latest UI5 Linter version
- Update package versions
- Review new rules added
- Update autofix capabilities
- Verify documentation links

**Next Review Date**: 2026-02-21

---

## Verification Checklist

- ✅ All 8 documentation sources extracted
- ✅ 19 rules documented
- ✅ All CLI options captured
- ✅ Autofix capabilities and limitations complete
- ✅ Configuration formats covered
- ✅ Performance metrics included
- ✅ Version information current (1.20.5)
- ✅ All documentation links functional
- ✅ Progressive disclosure strategy defined
- ✅ Reference file structure planned
- ✅ Template files identified
- ✅ Token efficiency calculated

---

**Status**: Ready for skill creation
**Confidence**: 100% - All available information extracted and organized
