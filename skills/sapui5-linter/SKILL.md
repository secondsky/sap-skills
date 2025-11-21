---
name: sapui5-linter
description: |
  Use this skill when working with the UI5 Linter (@ui5/linter) for static code analysis of SAPUI5/OpenUI5 applications and libraries. This skill should be used when: (1) Setting up UI5 Linter in a project for the first time, (2) Configuring linting rules and ignore patterns for UI5 codebases, (3) Running the linter to detect deprecated APIs, global variable usage, CSP violations, or manifest issues, (4) Using autofix to automatically correct deprecated API usage, global references, event handlers, and manifest properties, (5) Troubleshooting linting errors or warnings in UI5 code, (6) Integrating UI5 Linter into CI/CD pipelines or pre-commit hooks, (7) Preparing UI5 projects for migration to UI5 2.x by identifying compatibility issues, (8) Understanding and resolving specific linting rules like no-deprecated-api, no-globals, async-component-flags, or manifest validation rules, (9) Optimizing linter performance for large UI5 codebases, (10) Creating configuration files (ui5lint.config.js/.mjs/.cjs) for project-specific linting needs. The skill covers all 19 linting rules, comprehensive autofix capabilities and limitations, CLI options, configuration patterns, performance optimization, and integration with development workflows.
license: MIT
metadata:
  version: 1.0.0
  last_updated: 2025-11-21
  ui5_linter_version: 1.20.5
  source: https://github.com/UI5/linter
  documentation: https://github.com/UI5/linter/blob/main/README.md
---

# SAPUI5 Linter Skill

## Overview

The **UI5 Linter** (@ui5/linter) is a static code analysis tool designed specifically for SAPUI5 and OpenUI5 projects. It helps developers identify compatibility issues, deprecated APIs, security concerns, and best practice violations before upgrading to UI5 2.x.

**Key Capabilities**:
- ✅ Detects 19 categories of issues including deprecated APIs, global usage, and CSP violations
- ✅ Automatic fixes for common issues (no-globals, no-deprecated-api, manifest properties)
- ✅ Supports JavaScript, TypeScript, XML, JSON, HTML, and YAML files
- ✅ Configurable ignore patterns and file targeting
- ✅ Multiple output formats: stylish, JSON, Markdown, HTML
- ✅ Fast performance: 1-40s depending on project size

**Current Version**: 1.20.5 (November 2025)
**Official Repository**: https://github.com/UI5/linter

---

## Prerequisites

### System Requirements

**Node.js**: v20.11.x, v22.0.0, or higher
**npm**: v8.0.0 or higher

Verify prerequisites:
```bash
node --version  # Should be v20.11+ or v22+
npm --version   # Should be v8+
```

### Installation

**Global Installation** (recommended for CLI usage):
```bash
npm install --global @ui5/linter
```

**Local Installation** (recommended for project integration):
```bash
npm install --save-dev @ui5/linter
```

Verify installation:
```bash
ui5lint --version  # Should output: 1.20.5 or higher
```

---

## Quick Start

### 1. Basic Usage

Run linter from project root (where ui5.yaml and package.json are located):

```bash
# Lint entire project
ui5lint

# Lint specific files or directories
ui5lint "webapp/**/*.js"
ui5lint "webapp/controller/" "webapp/view/"

# Show detailed information about findings
ui5lint --details
```

### 2. Common Workflows

**Development Workflow**:
```bash
# 1. Check for issues with details
ui5lint --details

# 2. Preview automatic fixes
UI5LINT_FIX_DRY_RUN=true ui5lint --fix

# 3. Apply fixes
ui5lint --fix

# 4. Review changes
git diff

# 5. Verify fixes worked
ui5lint --details
```

**CI/CD Workflow**:
```bash
# Fail only on errors, output JSON
ui5lint --quiet --format json > lint-results.json
```

**Focus on Errors**:
```bash
# Show only errors, suppress warnings
ui5lint --quiet
```

---

## Configuration

### Configuration File Setup

Create `ui5lint.config.mjs` (ESM) or `ui5lint.config.cjs` (CommonJS) in project root:

**ESM Format** (ui5lint.config.mjs):
```javascript
export default {
  ignores: [
    "webapp/thirdparty/**",    // Third-party libraries
    "webapp/test/**",          // Test files
    "!webapp/test/integration/**", // But include integration tests
  ],
  files: [
    "webapp/**/*.js",
    "webapp/**/*.xml",
    "webapp/manifest.json",
  ],
};
```

**CommonJS Format** (ui5lint.config.cjs):
```javascript
module.exports = {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",
  ],
};
```

**Templates Available**:
- See `templates/ui5lint.config.mjs` for ESM template
- See `templates/ui5lint.config.cjs` for CommonJS template
- See `references/configuration.md` for complete configuration guide

### Common Configuration Patterns

**UI5 Application**:
```javascript
export default {
  ignores: [
    "webapp/thirdparty/**",     // Third-party code
    "webapp/localService/**",   // Mock data
    "webapp/test/**",           // Tests
    "dist/**",                  // Build output
    "**/*.min.js",             // Minified files
  ],
};
```

**Gradual Migration**:
```javascript
export default {
  ignores: [
    "webapp/**",                          // Ignore everything
    "!webapp/controller/Main.controller.js", // Except migrated files
    "!webapp/view/Main.view.xml",
  ],
};
```

---

## CLI Usage

### Essential Commands

**Basic linting**:
```bash
ui5lint                           # Lint entire project
ui5lint --details                 # Show detailed findings
ui5lint --quiet                   # Show errors only
ui5lint --verbose                 # Detailed logging
```

**Output formats**:
```bash
ui5lint --format stylish          # Human-readable (default)
ui5lint --format json             # Machine-parseable
ui5lint --format markdown         # Documentation-friendly
ui5lint --format html             # Browser-viewable
```

**Autofix**:
```bash
UI5LINT_FIX_DRY_RUN=true ui5lint --fix  # Preview fixes
ui5lint --fix                     # Apply fixes
ui5lint --fix "webapp/**/*.js"    # Fix specific files
```

**File management**:
```bash
ui5lint --ignore-pattern "webapp/thirdparty/**"  # Ignore files
ui5lint --config custom.config.js               # Custom config
```

**Performance**:
```bash
ui5lint --perf                    # Show performance metrics
```

**Complete CLI reference**: See `references/cli-options.md`

---

## Linting Rules Overview

The UI5 Linter provides **19 rules** organized into categories:

### Async & Modern Patterns
- **async-component-flags**: Validates async component configuration (IAsyncContentCreation, manifest async flags)
- **prefer-test-starter**: Validates Test Starter concept implementation

### Security
- **csp-unsafe-inline-script**: Detects unsafe inline scripts violating Content Security Policy

### Event Handlers
- **no-ambiguous-event-handler**: Ensures proper event handler notation (controller methods or core:require) ✅ Autofix

### Deprecation Detection (7 Rules)
- **no-deprecated-api**: Detects deprecated APIs, features, parameters ✅ Autofix (limited)
- **no-deprecated-component**: Finds deprecated component dependencies in manifest.json
- **no-deprecated-control-renderer-declaration**: Validates control renderer patterns
- **no-deprecated-library**: Checks for deprecated libraries in manifest.json and ui5.yaml
- **no-deprecated-theme**: Detects deprecated theme usage

### Global Usage
- **no-globals**: Identifies global variable usage ✅ Autofix (replaces with module imports)
- **no-implicit-globals**: Detects implicit global access patterns

### Module System
- **no-pseudo-modules**: Detects pseudo module dependencies

### Error Reporting
- **parsing-error**: Reports syntax/parsing errors
- **autofix-error**: Reports autofix failures

### API Usage
- **ui5-class-declaration**: Verifies UI5 class declaration patterns (TypeScript)
- **unsupported-api-usage**: Ensures proper API usage (formatter types, etc.)

### Manifest Modernization (3 Rules)
- **no-outdated-manifest-version**: Requires Manifest Version 2
- **no-removed-manifest-property**: Identifies incompatible manifest properties ✅ Autofix (limited)
- **no-legacy-ui5-version-in-manifest**: Requires minUI5Version 1.136+

**Complete rules reference**: See `references/rules-complete.md`

---

## Autofix Capabilities

### Rules with Autofix Support

**1. no-globals** ✅
- Replaces global references (sap.ui.getCore()) with module imports
- Adds import statements automatically

**2. no-deprecated-api** ✅ (Partial)
- Configuration Facade methods (Core.getConfiguration() → Localization)
- Core Facade methods (Core.loadLibrary() → Lib.load())
- Button events (tap → press)
- SmartTable, ODataModel, SimpleForm properties
- Bootstrap script attributes
- jQuery.sap APIs (limited support)

**3. no-ambiguous-event-handler** ✅
- Migrates to recommended event handler notation

**4. no-removed-manifest-property** ✅ (Partial)
- Removes synchronizationMode from manifest.json
- Cleans up empty sap.ui5/resources/js entries

### Autofix Limitations

**Cannot automatically fix**:
- ❌ Code outside module definitions
- ❌ Synchronous-to-asynchronous conversions
- ❌ Complex replacements requiring multiple calls
- ❌ Context-dependent replacements
- ❌ Return value changes
- ❌ ~50+ Core/Configuration APIs (see Issues #619, #620)
- ❌ Most jQuery.sap APIs
- ❌ All jQuery plugins

**Example - What autofix CAN do**:
```javascript
// Before:
sap.ui.getCore().byId("myControl");

// After (automatic):
import Core from "sap/ui/core/Core";
Core.byId("myControl");
```

**Example - What autofix CANNOT do**:
```javascript
// Cannot fix: sync to async conversion
const component = sap.ui.component({name: "my.app"});
// Would require manual async refactoring
```

**Complete autofix reference**: See `references/autofix-complete.md`

---

## In-Code Directives

Control linting behavior within source files using directives.

### JavaScript/TypeScript Directives

```javascript
/* ui5lint-disable no-deprecated-api */
// Code here won't trigger no-deprecated-api rule
/* ui5lint-enable no-deprecated-api */

// Disable for single line
const result = deprecatedMethod(); // ui5lint-disable-line no-deprecated-api

// Disable for next line
// ui5lint-disable-next-line no-deprecated-api
const result = deprecatedMethod();

// Multiple rules
// ui5lint-disable no-deprecated-api, no-globals

// With explanation
// ui5lint-disable-next-line no-deprecated-api -- Required for legacy compatibility
```

### XML/HTML Directives

```xml
<!-- ui5lint-disable no-deprecated-api -->
<Button tap="onTap"/>
<!-- ui5lint-enable no-deprecated-api -->

<!-- Disable next element -->
<!-- ui5lint-disable-next-line -->
<Button tap="onTap"/>

<!-- With explanation (avoid -- in XML comments) -->
<!-- ui5lint-disable-next-line no-deprecated-api -->
<!-- Required for legacy compatibility -->
<Button tap="onTap"/>
```

### YAML Directives

```yaml
# ui5lint-disable no-deprecated-library
dependencies:
  - sap.ui.commons
# ui5lint-enable no-deprecated-library
```

---

## Integration with Development Workflows

### package.json Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "lint": "ui5lint",
    "lint:fix": "ui5lint --fix",
    "lint:details": "ui5lint --details",
    "lint:ci": "ui5lint --quiet --format json > lint-results.json",
    "lint:report": "ui5lint --format html --details > lint-report.html"
  },
  "devDependencies": {
    "@ui5/linter": "^1.20.5"
  }
}
```

Usage:
```bash
npm run lint
npm run lint:fix
npm run lint:ci
```

**Template**: See `templates/package.json.template`

### Pre-Commit Hooks (Husky)

**Setup**:
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

**Add to package.json**:
```json
{
  "lint-staged": {
    "webapp/**/*.{js,xml,json}": [
      "ui5lint"
    ]
  }
}
```

**Template**: See `templates/husky-pre-commit.template`

### GitHub Actions

**Create** `.github/workflows/ui5-lint.yml`:
```yaml
name: UI5 Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint -- --quiet --format json > lint-results.json
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: lint-results
          path: lint-results.json
```

**Template**: See `templates/github-actions-lint.yml`

---

## Common Scenarios

### Scenario 1: New UI5 Project Setup

```bash
# 1. Install linter
npm install --save-dev @ui5/linter

# 2. Create configuration (use template)
cp node_modules/@ui5/linter/templates/ui5lint.config.mjs ./

# 3. Add npm scripts to package.json
# (See package.json integration above)

# 4. Run initial lint
npm run lint --details

# 5. Fix auto-fixable issues
npm run lint:fix

# 6. Review remaining issues
npm run lint --details
```

### Scenario 2: Preparing for UI5 2.x Migration

```bash
# 1. Run linter to find all issues
ui5lint --details --format markdown > migration-findings.md

# 2. Focus on critical issues first
ui5lint --quiet  # Shows errors only

# 3. Apply automatic fixes
ui5lint --fix

# 4. Review autofix limitations document
# See references/autofix-complete.md for APIs that can't be auto-fixed

# 5. Manually fix unsupported APIs
# Address Core API issues (#619), Configuration API issues (#620)

# 6. Update manifest to v2
# Fix no-outdated-manifest-version, no-removed-manifest-property issues

# 7. Verify all issues resolved
ui5lint
```

### Scenario 3: Large Codebase Performance

```bash
# 1. Measure baseline performance
ui5lint --perf

# 2. Optimize configuration with ignore patterns
# Edit ui5lint.config.mjs to exclude unnecessary files

# 3. Lint specific areas during development
ui5lint "webapp/controller/"

# 4. Use CI for full project linting
# Add GitHub Actions workflow (see templates/)

# 5. Monitor performance over time
ui5lint --perf > perf-baseline.txt
```

**Performance guide**: See `references/performance.md`

### Scenario 4: Fixing Specific Rule Violations

**Fix global usage**:
```bash
# Find global usage issues
ui5lint | grep "no-globals"

# Apply autofix
ui5lint --fix

# Result: Globals replaced with module imports
```

**Fix deprecated APIs**:
```bash
# Find deprecated API usage
ui5lint --details | grep "no-deprecated-api"

# Apply autofix (limited)
ui5lint --fix

# Manually fix unsupported APIs
# See references/autofix-complete.md for which APIs can't be auto-fixed
```

**Fix manifest issues**:
```bash
# Find manifest issues
ui5lint "webapp/manifest.json" --details

# Apply autofix for supported properties
ui5lint --fix "webapp/manifest.json"

# Manually update:
# - _version to 2
# - minUI5Version to 1.136+
```

---

## Troubleshooting

### Common Issues

**Issue 1: "parsing-error" reported**

**Cause**: Syntax errors in source files

**Solution**:
1. Check the specific file and line number
2. Fix syntax errors manually
3. Re-run linter

---

**Issue 2: "autofix-error" reported**

**Cause**: Expected autofix cannot be applied (edge case or internal issue)

**Solution**:
1. Check if code is within module definition (`sap.ui.define`/`sap.ui.require`)
2. Verify file has no parsing errors
3. Manually apply the fix
4. Report to UI5 Linter team if unexpected

---

**Issue 3: Autofix doesn't fix expected issues**

**Cause**: API not supported by autofix (see limitations)

**Solution**:
1. Check `references/autofix-complete.md` for supported APIs
2. Review Issues #619 (Core APIs) and #620 (Configuration APIs)
3. Manually refactor unsupported APIs

---

**Issue 4: Linter too slow on large codebase**

**Cause**: Processing too many files

**Solution**:
1. Add ignore patterns to configuration:
   ```javascript
   ignores: ["webapp/thirdparty/**", "dist/**", "**/*.min.js"]
   ```
2. Lint specific directories during development:
   ```bash
   ui5lint "webapp/controller/"
   ```
3. Use `--perf` to identify bottlenecks
4. See `references/performance.md` for optimization tips

---

**Issue 5: Configuration file not found**

**Cause**: Wrong filename or location

**Solution**:
1. Verify filename: `ui5lint.config.{js,mjs,cjs}`
2. Place in project root (same directory as ui5.yaml)
3. Check file extension matches module type
4. Use `--config` to specify custom location

---

### Known Limitations

1. **Not all deprecated APIs can be auto-fixed** - See `references/autofix-complete.md`
2. **Linter cannot detect all UI5 2.x compatibility issues** - Manual testing still required
3. **Sync-to-async conversions not supported** - Manual refactoring needed
4. **jQuery plugins not detected** - Manual migration required
5. **Some Core/Configuration APIs have no replacements** - Document and plan workarounds

---

## Best Practices

### 1. Run Linter Early and Often

```bash
# Add pre-commit hook for instant feedback
npm install --save-dev husky lint-staged
# See templates/husky-pre-commit.template
```

### 2. Use Configuration File for Persistent Settings

```javascript
// ui5lint.config.mjs - Version controlled, team-shared
export default {
  ignores: ["webapp/thirdparty/**"],
};
```

### 3. Fix Issues Incrementally

```bash
# 1. Fix errors first
ui5lint --quiet --fix

# 2. Then fix warnings
ui5lint --fix

# 3. Review and test after each step
npm test
```

### 4. Document Suppressed Rules

```javascript
// ui5lint-disable-next-line no-deprecated-api -- Required for SAP Note 123456
legacyAPI.call();
```

### 5. Integrate with CI/CD

```yaml
# Fail builds on errors, allow warnings
ui5lint --quiet --format json
```

### 6. Generate Reports for Stakeholders

```bash
# HTML report for non-technical reviewers
ui5lint --format html --details > ui5-lint-report.html

# Markdown for documentation
ui5lint --format markdown --details > LINT_FINDINGS.md
```

### 7. Monitor Performance

```bash
# Track linting performance over time
ui5lint --perf > perf-$(date +%Y%m%d).txt
```

---

## Version History

### v1.20.5 (2025-11-18) - Current
- Dependency updates (fast-xml-parser 5.3.1 → 5.3.2)

### v1.20.0 (2025-09-11)
- ✨ Manifest v2 support
- ✨ Deterministic file ordering
- 🐛 File ordering consistency fixes

### v1.19.0 (2025-08-28)
- ✨ Autofix: Remove synchronizationMode from manifest.json
- ✨ Autofix: Clean up empty sap.ui5/resources/js entries
- ✨ Autofix: Migrate to recommended event handler notation

### v1.18.0 (2025-08-19)
- ✨ Autofix: UI5 Bootstrap Parameters in HTML
- ✨ Autofix: Deprecated sap/ui/base/Object.isA API

### v1.14.0 (2025-06-27)
- ✨ Expanded autofix: Core, Configuration, jQuery.sap APIs
- ✨ Added --quiet mode for error-only reporting

**Full changelog**: https://github.com/UI5/linter/blob/main/CHANGELOG.md

---

## Reference Documentation

**Comprehensive references** (loaded on demand):

1. **rules-complete.md** - All 19 rules in detail with examples
2. **autofix-complete.md** - Complete autofix capabilities and limitations
3. **cli-options.md** - All CLI flags and options with examples
4. **configuration.md** - Advanced configuration patterns and troubleshooting
5. **performance.md** - Benchmarks, optimization tips, and best practices

**Templates**:
- `ui5lint.config.mjs` - ESM configuration template
- `ui5lint.config.cjs` - CommonJS configuration template
- `package.json.template` - npm scripts integration
- `github-actions-lint.yml` - GitHub Actions workflow
- `husky-pre-commit.template` - Pre-commit hook setup

---

## External Resources

**Official UI5 Linter**:
- Main Repository: https://github.com/UI5/linter
- Documentation: https://github.com/UI5/linter/blob/main/README.md
- Rules: https://github.com/UI5/linter/blob/main/docs/Rules.md
- Autofix Scope: https://github.com/UI5/linter/blob/main/docs/Scope-of-Autofix.md
- Development: https://github.com/UI5/linter/blob/main/docs/Development.md
- Guidelines: https://github.com/UI5/linter/blob/main/docs/Guidelines.md
- Performance: https://github.com/UI5/linter/blob/main/docs/Performance.md

**UI5 Resources**:
- UI5 2.x Migration Guide: https://ui5.sap.com/
- SAPUI5 Documentation: https://sapui5.hana.ondemand.com/
- OpenUI5 Documentation: https://openui5.org/

**Issue Trackers**:
- Core API Limitations: https://github.com/UI5/linter/issues/619
- Configuration API Limitations: https://github.com/UI5/linter/issues/620

---

## Support and Updates

**Quarterly Review Schedule**:
- Check UI5 Linter version updates
- Verify new rules added
- Update autofix capabilities documentation
- Test with latest UI5 versions

**Next Review**: 2026-02-21

**For Issues or Questions**:
- UI5 Linter Issues: https://github.com/UI5/linter/issues
- UI5 Community: https://community.sap.com/
- Stack Overflow: Tag `sapui5` or `openui5`

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintained By**: SAP Skills Repository
**License**: MIT
