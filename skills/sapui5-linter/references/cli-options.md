# UI5 Linter - CLI Options Complete Reference

**Source**: https://github.com/UI5/linter/blob/main/README.md
**Last Updated**: 2025-11-21
**UI5 Linter Version**: 1.20.5

---

## Command Structure

```bash
ui5lint [files...] [options]
```

**Description**: Static code analysis tool for UI5 applications and libraries.

**Basic Usage**:
```bash
# Lint entire project
ui5lint

# Lint specific files
ui5lint "webapp/**/*.js"

# Lint multiple patterns
ui5lint "webapp/**/*.js" "webapp/**/*.xml"
```

---

## Output & Formatting Options

### --details

**Description**: Display comprehensive information about findings.

**Default**: false (shows summary only)

**Usage**:
```bash
ui5lint --details
```

**Output Difference**:
```bash
# Without --details:
webapp/controller/Main.controller.js
  Line 45: Deprecated API: sap.ui.getCore()

# With --details:
webapp/controller/Main.controller.js
  Line 45: Deprecated API: sap.ui.getCore()
    Details: sap.ui.getCore() is deprecated since UI5 1.118
    Replacement: Use sap/ui/core/Core module instead
    Severity: Warning
    Rule: no-deprecated-api
```

---

### --format <type>

**Description**: Output format selection.

**Options**: `stylish` | `json` | `markdown` | `html`

**Default**: `stylish`

**Usage**:
```bash
# Human-readable console output (default)
ui5lint --format stylish

# Machine-parseable JSON
ui5lint --format json

# Documentation-friendly Markdown
ui5lint --format markdown

# Browser-viewable HTML
ui5lint --format html
```

**Output Examples**:

**stylish** (default):
```
webapp/controller/Main.controller.js
  45:12  warning  Deprecated API: sap.ui.getCore()  no-deprecated-api

✖ 1 problem (0 errors, 1 warning)
```

**json**:
```json
[
  {
    "filePath": "webapp/controller/Main.controller.js",
    "messages": [
      {
        "ruleId": "no-deprecated-api",
        "severity": 1,
        "message": "Deprecated API: sap.ui.getCore()",
        "line": 45,
        "column": 12
      }
    ],
    "errorCount": 0,
    "warningCount": 1
  }
]
```

**markdown**:
```markdown
## webapp/controller/Main.controller.js

| Line | Column | Severity | Message | Rule |
|------|--------|----------|---------|------|
| 45 | 12 | warning | Deprecated API: sap.ui.getCore() | no-deprecated-api |

**1 problem (0 errors, 1 warning)**
```

**html**: Generates a styled HTML report with filtering capabilities.

**Redirecting Output**:
```bash
# Save to file
ui5lint --format markdown > lint-report.md
ui5lint --format json > lint-results.json
ui5lint --format html > lint-report.html
```

---

### --quiet

**Description**: Show only errors, suppress warnings.

**Default**: false (shows both errors and warnings)

**Added in**: v1.14.0

**Usage**:
```bash
ui5lint --quiet
```

**Use Cases**:
- CI/CD pipelines where only errors should fail the build
- Focusing on critical issues first
- Gradual migration (fix errors, then warnings)

**Example**:
```bash
# Without --quiet: Shows 5 errors, 20 warnings
ui5lint
# Exit code: 1 (errors found)

# With --quiet: Shows only 5 errors
ui5lint --quiet
# Exit code: 1 (errors found)
```

---

## File Management Options

### --fix

**Description**: Automatically correct specific issues.

**Default**: false

**Usage**:
```bash
# Fix all auto-fixable issues
ui5lint --fix

# Fix specific files
ui5lint --fix "webapp/controller/**/*.js"

# Preview fixes without applying (dry-run)
UI5LINT_FIX_DRY_RUN=true ui5lint --fix
```

**Supported Rules with Autofix**:
- `no-globals`: Replace global references with module imports
- `no-deprecated-api`: Fix supported deprecated APIs (limited)
- `no-ambiguous-event-handler`: Update event handler notation
- `no-removed-manifest-property`: Remove incompatible manifest properties

**Important**:
- ⚠️ Creates a backup before modifying files
- ⚠️ Not all issues can be auto-fixed (see autofix-complete.md)
- ⚠️ Always review changes before committing
- ⚠️ Use dry-run mode to preview changes first

**Example Workflow**:
```bash
# 1. Preview changes
UI5LINT_FIX_DRY_RUN=true ui5lint --fix

# 2. Apply fixes
ui5lint --fix

# 3. Review changes
git diff

# 4. Test
npm test
```

---

### --ignore-pattern <pattern>

**Description**: Exclude specific files or directories from analysis.

**Default**: None (lints all files)

**Usage**:
```bash
# Ignore single directory
ui5lint --ignore-pattern "webapp/thirdparty/**"

# Ignore multiple patterns
ui5lint --ignore-pattern "**/*.test.js" --ignore-pattern "webapp/vendor/**"

# Ignore specific files
ui5lint --ignore-pattern "webapp/libs/legacy.js"
```

**Pattern Syntax**:
- Uses glob patterns (same as config file)
- Patterns are relative to project root
- Supports `**` for recursive matching
- Supports `*` for single-level matching
- Supports `!` prefix for negation

**Common Patterns**:
```bash
# Ignore all test files
ui5lint --ignore-pattern "**/*.test.js" --ignore-pattern "**/*.spec.js"

# Ignore third-party libraries
ui5lint --ignore-pattern "webapp/thirdparty/**" --ignore-pattern "webapp/vendor/**"

# Ignore generated files
ui5lint --ignore-pattern "dist/**" --ignore-pattern "build/**"

# Ignore specific directories
ui5lint --ignore-pattern "webapp/localService/**"
```

**Note**: Config file `ignores` option is generally preferred over CLI flag for persistent ignores.

---

### --config <path>

**Description**: Specify a custom configuration file path.

**Default**: Searches for `ui5lint.config.{js,mjs,cjs}` in project root

**Usage**:
```bash
# Use custom config location
ui5lint --config config/custom-lint.config.js

# Use different config for CI
ui5lint --config .ui5lint.ci.config.js
```

**Config File Formats**:
- `.js` - CommonJS or ESM (based on package.json type)
- `.mjs` - ES Module
- `.cjs` - CommonJS

**Example**:
```javascript
// custom-lint.config.js
export default {
  ignores: ["webapp/thirdparty/**"],
  files: ["webapp/**/*.js", "webapp/**/*.xml"]
};
```

---

### --ui5-config <path>

**Description**: Specify UI5 YAML configuration path.

**Default**: Searches for `ui5.yaml` or `ui5-*.yaml` in project root

**Usage**:
```bash
# Use custom UI5 config
ui5lint --ui5-config config/ui5-dev.yaml

# Use environment-specific config
ui5lint --ui5-config ui5-production.yaml
```

**When to Use**:
- Multi-config UI5 projects
- Different configs for dev/prod
- Custom UI5 tooling configurations

---

## Logging & Diagnostic Options

### --log-level <level>

**Description**: Set logging verbosity.

**Options**: `silent` | `error` | `warn` | `info` | `perf` | `verbose` | `silly`

**Default**: `info`

**Usage**:
```bash
# Show only errors
ui5lint --log-level error

# Show detailed information
ui5lint --log-level verbose

# Show everything including internal details
ui5lint --log-level silly

# Silent (no logs, only results)
ui5lint --log-level silent
```

**Log Level Hierarchy** (each level includes all above):
```
silent   → No logging
error    → Critical errors only
warn     → Warnings and errors
info     → Informational messages (default)
perf     → Performance metrics
verbose  → Detailed processing information
silly    → Debug information and internals
```

**Use Cases**:
- **error**: CI/CD pipelines
- **warn**: Production environments
- **info**: Normal development
- **verbose**: Troubleshooting issues
- **silly**: Debugging linter itself

---

### --verbose

**Description**: Enable detailed logging output.

**Default**: false

**Usage**:
```bash
ui5lint --verbose
```

**Equivalent to**: `--log-level verbose`

**Output Includes**:
- File processing progress
- Rule execution details
- Configuration loading information
- Module resolution paths

**Example Output**:
```bash
ui5lint --verbose

verbose Loading configuration from /project/ui5lint.config.js
verbose Processing webapp/controller/Main.controller.js
verbose Running rule: no-deprecated-api
verbose Running rule: no-globals
verbose Found 2 issues in webapp/controller/Main.controller.js
verbose Processing webapp/view/Main.view.xml
...
```

---

### --perf

**Description**: Display performance measurements.

**Default**: false

**Usage**:
```bash
ui5lint --perf
```

**Output Example**:
```bash
ui5lint --perf

Performance Metrics:
  Configuration Loading: 45ms
  File Discovery: 120ms
  Parsing: 1,245ms
  Rule Execution: 2,340ms
  Reporting: 67ms
  Total: 3,817ms

Files Processed: 156
Rules Executed: 19
Issues Found: 23
```

**Use Cases**:
- Performance optimization
- Identifying slow rules
- Benchmarking
- Large codebase analysis

**Combine with --verbose**:
```bash
ui5lint --perf --verbose
# Shows detailed per-file performance
```

---

### --silent

**Description**: Disable all log output.

**Default**: false

**Usage**:
```bash
ui5lint --silent
```

**Equivalent to**: `--log-level silent`

**Output**: Only linting results, no progress or diagnostic information

**Use Cases**:
- Scripting and automation
- Parsing JSON output without noise
- CI/CD where only exit code matters

**Example**:
```bash
# Only show JSON results, no logs
ui5lint --format json --silent > results.json

# Use exit code only
ui5lint --silent
if [ $? -eq 0 ]; then
  echo "No issues found"
fi
```

---

## Information Options

### --version

**Description**: Display version information.

**Usage**:
```bash
ui5lint --version
```

**Output**:
```
1.20.5
```

**Use Cases**:
- Verify installed version
- CI/CD version checks
- Debugging environment issues

**Script Example**:
```bash
#!/bin/bash
REQUIRED_VERSION="1.20.0"
CURRENT_VERSION=$(ui5lint --version)

if [ "$CURRENT_VERSION" != "$REQUIRED_VERSION" ]; then
  echo "Wrong UI5 Linter version: $CURRENT_VERSION (expected $REQUIRED_VERSION)"
  exit 1
fi
```

---

### --help

**Description**: Display help information.

**Usage**:
```bash
ui5lint --help
```

**Output**: Lists all available options with descriptions.

---

## File Patterns (Positional Arguments)

### Basic Patterns

```bash
# Lint specific directory
ui5lint webapp/

# Lint specific file type
ui5lint "**/*.js"

# Lint multiple patterns
ui5lint "webapp/**/*.js" "webapp/**/*.xml"
```

### Advanced Patterns

```bash
# Lint controllers only
ui5lint "webapp/controller/**/*.js"

# Lint views and fragments
ui5lint "webapp/view/**/*.xml" "webapp/fragment/**/*.xml"

# Exclude test files
ui5lint "webapp/**/*.js" "!webapp/test/**"

# Lint specific files
ui5lint webapp/Component.js webapp/manifest.json
```

### Pattern Syntax

**Glob Patterns**:
- `*` - Matches any characters except `/`
- `**` - Matches any characters including `/` (recursive)
- `?` - Matches single character
- `[abc]` - Matches any character in brackets
- `{a,b}` - Matches either a or b
- `!` - Negation (exclude pattern)

**File Types Supported**:
- `.js` - JavaScript
- `.ts` - TypeScript
- `.xml` - XML views/fragments
- `.json` - JSON (manifest.json, etc.)
- `.html` - HTML
- `.yaml` - YAML (ui5.yaml, etc.)

---

## Common Option Combinations

### Development Workflow

```bash
# Quick check with details
ui5lint --details

# Focus on errors only
ui5lint --quiet

# Verbose output for troubleshooting
ui5lint --verbose --details
```

### CI/CD Pipeline

```bash
# Fail on errors only, JSON output
ui5lint --quiet --format json --silent > lint-results.json

# Performance tracking
ui5lint --perf --format json > perf-report.json
```

### Autofix Workflow

```bash
# Preview fixes
UI5LINT_FIX_DRY_RUN=true ui5lint --fix --verbose

# Apply fixes to specific files
ui5lint --fix "webapp/controller/**/*.js" --details

# Fix with detailed reporting
ui5lint --fix --verbose --perf
```

### Large Codebase

```bash
# Lint with performance monitoring
ui5lint --perf --quiet

# Lint specific directories only
ui5lint "webapp/controller/" "webapp/view/" --ignore-pattern "**/*.test.js"

# Detailed analysis of specific area
ui5lint "webapp/controller/" --details --verbose
```

### Generate Reports

```bash
# Markdown report for documentation
ui5lint --format markdown --details > LINT_REPORT.md

# HTML report for team review
ui5lint --format html --details > lint-report.html

# JSON for programmatic analysis
ui5lint --format json --silent > results.json
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | No errors or warnings found |
| 1 | Errors found (or warnings if not using --quiet) |
| 2 | Internal error or invalid usage |

**Examples**:
```bash
# Success - no issues
ui5lint
echo $? # Output: 0

# Warnings found (without --quiet)
ui5lint
echo $? # Output: 1

# Errors found
ui5lint --quiet
echo $? # Output: 1

# Invalid option
ui5lint --invalid-flag
echo $? # Output: 2
```

---

## Environment Variables

### UI5LINT_FIX_DRY_RUN

**Description**: Preview autofix changes without applying them.

**Values**: `true` | `false`

**Default**: `false`

**Usage**:
```bash
UI5LINT_FIX_DRY_RUN=true ui5lint --fix
```

**Output**: Shows what would be changed without modifying files.

---

## Further Reading

- **Main Repository**: https://github.com/UI5/linter
- **README**: https://github.com/UI5/linter/blob/main/README.md
- **Configuration Guide**: See configuration.md reference
- **Autofix Guide**: See autofix-complete.md reference
- **Rules Reference**: See rules-complete.md reference

---

**Document Version**: 1.0
**Last Verified**: 2025-11-21
**Next Review**: 2026-02-21
