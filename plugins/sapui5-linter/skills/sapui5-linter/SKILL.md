---
name: sapui5-linter
description: "Use this skill when working with the UI5 Linter (@ui5/linter) for static code analysis of SAPUI5/OpenUI5 applications and libraries. Covers setup, configuring linting rules, running the linter to detect deprecated APIs, global variable usage, CSP violations, and manifest issues. Supports autofix for deprecated API usage, global references, event handlers, and manifest properties. Includes CI/CD integration, pre-commit hooks, and UI5 2.x migration preparation."
license: GPL-3.0
metadata:
  version: "1.0.0"
  last_updated: "2025-11-26"
  ui5_linter_version: "1.20.5"
  source: "https://github.com/UI5/linter"
  documentation: "https://github.com/UI5/linter/blob/main/README.md"
  status: "CONTENT_RESTRUCTURED"
  keywords: [SAPUI5, OpenUI5, UI5 Linter, "@ui5/linter", static analysis, deprecated APIs, global variables, CSP, manifest.json, ui5.yaml, ESLint, pre-commit hooks, GitHub Actions, CI/CD, Node.js, TypeScript, XML, JSON, HTML, YAML, OData v2/v4, async, event handlers, jQuery, autofix, performance optimization, 19 linting rules, no-deprecated-api, no-globals, no-async-component-flags, manifest-v2, UI5 2.x migration]
---

# SAPUI5 Linter Skill

## Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [CLI Usage](#cli-usage)
- [Bundled Resources](#bundled-resources)

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
**Official Repository**: [https://github.com/UI5/linter](https://github.com/UI5/linter)

---

## Quick Start

### Prerequisites

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

### Basic Usage

Run linter from project root:
```bash
# Lint entire project
ui5lint

# Lint specific files or directories
ui5lint "webapp/**/*.js"
ui5ling "webapp/controller/" "webapp/view/"

# Show detailed information about findings
ui5lint --details
```

### Common Workflows

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

## Configuration

### Configuration File Setup
Create `ui5lint.config.{js|mjs|cjs}`:
```javascript
module.exports = {
  rules: {
    // Recommended rules
    "no-deprecated-api": "error",
    "no-globals": "error",
    "no-ambiguous-event-handler": "error",
    "no-outdated-manifest-version": "error"
  },
  exclude: [
    "dist/**",
    "node_modules/**",
    "test/**/*.{spec,js,ts}"
  ]
};
```

### Common Configuration Patterns
```javascript
// Strict for production, relaxed for development
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  rules: {
    "no-deprecated-api": isProduction ? "error" : "warn",
    "no-globals": isProduction ? "error" : "warn"
  },
  exclude: [
    "legacy/**/*",
    "**/*.min.js"
  ]
};
```

## CLI Usage

### Essential Commands
```bash
# Basic linting
ui5lint

# With detailed output
ui5lint --details

# Fix auto-fixable issues
ui5lint --fix

# JSON output for CI/CD
ui5lint --format json

# HTML report for documentation
ui5lint --format html --details

# Performance monitoring
ui5lint --perf
```

## Linting Rules Overview

### Async & Modern Patterns
- **async-component-flags**: Validates async component configuration
- **prefer-test-starter**: Validates Test Starter implementation

### Security
- **csp-unsafe-inline-script**: Detects unsafe inline scripts

### Event Handlers
- **no-ambiguous-event-handler**: Ensures proper event handler notation ✅ Autofix

### Deprecation Detection (7 Rules)
- **no-deprecated-api**: Detects deprecated APIs ✅
- **no-deprecated-component**: Finds deprecated component dependencies
- **no-deprecated-control-renderer**: Validates control renderer patterns
- **no-deprecated-library**: Checks deprecated libraries in manifest

### Global Usage
- **no-globals**: Identifies global variable usage ✅ Autofix
- **no-implicit-globals**: Detects implicit global access

### Error Reporting
- **parsing-error**: Reports syntax/parsing errors
- **autofix-error**: Reports autofix failures

### API Usage
- **ui5-class-declaration**: Verifies UI5 class declaration patterns (TypeScript)
- **unsupported-api-usage**: Ensures proper API usage

### Manifest Modernization (3 Rules)
- **no-outdated-manifest-version**: Requires Manifest Version 2
- **no-removed-manifest-property**: Identifies incompatible properties ✅ Autofix

### Complete rules reference**: See `references/rules-complete.md`

## Integration with Development Workflows

### package.json Scripts
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

## Common Scenarios

### Scenario 1: New UI5 Project Setup
1. Install linter
2. Create configuration (use template)
3. Add npm scripts to package.json
4. Run initial lint
5. Fix auto-fixable issues
6. Review remaining issues

### Scenario 2: Preparing for UI5 2.x Migration
1. Run linter to find all issues
2. Focus on critical issues first
3. Apply automatic fixes
4. Review autofix limitations document
5. Manually fix unsupported APIs
6. Address Core API issues (#619, #620)
7. Update manifest to v2
8. Fix no-outdated-manifest-version, no-removed-manifest-property issues
9. Verify all issues resolved

## Troubleshooting

### Common Issues

**Symptom**: Linter reports parsing errors
**Solution**: Check for syntax errors in config files

**Symptom**: Autofix doesn't work
**Solution**: Check autofix limitations in `references/autofix-complete.md`

**Symptom**: Performance issues on large codebase
**Solution**: Add ignore patterns, use targeted linting

### Known Limitations

- Cannot convert synchronous to async patterns
- Limited Core/Configuration API autofix (~50 APIs)
- jQuery.sap API support limited to basic methods
- Node.js modules not automatically discovered

## Best Practices

### 1. Run Linter Early and Often
- Add pre-commit hook for instant feedback
- See templates/husky-pre-commit.template

### 2. Use Configuration File for Persistent Settings
- Environment-specific configurations
- Project-wide ignore patterns

### 3. Fix Issues Incrementally
1. Fix errors first
2. Then fix warnings
3. Review and test after each step

### 4. Document Suppressed Rules
- Document team-wide suppressions with explanations
- Use sparingly and with clear justifications

### 5. Integrate with CI/CD
- Fail builds on errors, allow warnings
- Generate reports for stakeholders

### 6. Monitor Performance
- Track linting performance over time

---

## Reference Documentation

### External Resources
- **Official Repository**: [https://github.com/UI5/linter](https://github.com/UI5/linter)
- **Issue Reporting**: [https://github.com/UI5/linter/issues](https://github.com/UI5/linter/issues)
- **Discussions**: [https://github.com/UI5/linter/discussions](https://github.com/UI5/linter/discussions)
- **Chat Support**: [https://discord.gg/sapui5](https://discord.gg/sapui5)
- **SAP Community**: [https://community.sap.com/tags/ui5](https://community.sap.com/tags/ui5)

### Detailed Documentation
- **Complete Rules Reference**: `references/rules-complete.md`
- **Autofix Capabilities**: `references/autofix-complete.md`
- **Performance Guide**: `references/performance.md`
- **Troubleshooting Guide**: `references/support-and-community.md`
- **Contributing Guide**: `references/contributing.md`

### Templates
- **Configuration Template**: `templates/ui5lint.config.mjs`
- **package.json Template**: `templates/package.json.template`
- **Husky Pre-commit**: `templates/husky-pre-commit.template`

### Support and Updates
- **Version**: 1.20.5 (Current)
- **Release Notes**: Available in GitHub releases
- **Roadmap**: Documented in GitHub Issues and Discussions
- **Email**: security@sap.com
- **Community**: Discord #sapui5 channel

## Bundled Resources

### Reference Documentation
- `references/rules-complete.md` - Complete reference for all 19 linting rules
- `references/autofix-complete.md` - Detailed autofix capabilities and limitations
- `references/performance.md` - Performance optimization guide
- `references/support-and-community.md` - Support channels and community resources
- `references/contributing.md` - Contributing guidelines

### Templates
- `templates/ui5lint.config.mjs` - Configuration template
- `templates/package.json.template` - Package.json template
- `templates/husky-pre-commit.template` - Pre-commit hook template

---

**Last Updated**: 2025-11-26 | **Version**: 1.0.1 (Restructured)
**Previous Version**: 1.0.0 | **Lines Reduced**: 376 (from 827)
**Next Review**: 2026-02-25
