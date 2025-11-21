# UI5 Linter - Configuration Complete Reference

**Source**: https://github.com/UI5/linter/blob/main/README.md
**Last Updated**: 2025-11-21
**UI5 Linter Version**: 1.20.5

---

## Configuration Overview

UI5 Linter supports configuration files to customize linting behavior, define ignore patterns, and specify target files. Configuration is optional but recommended for projects with specific requirements.

---

## Configuration File Location

### Requirements

Configuration files **must**:
- Reside in the project root directory
- Be in the same directory as `ui5.yaml` and `package.json`
- Use one of the supported filenames

### Supported Filenames

| Filename | Module Type | Recommended |
|----------|-------------|-------------|
| `ui5lint.config.js` | Auto-detected (based on package.json) | ✅ General use |
| `ui5lint.config.mjs` | ES Module | ✅ ESM projects |
| `ui5lint.config.cjs` | CommonJS | ✅ CJS projects |

**Detection Order**:
1. `ui5lint.config.js`
2. `ui5lint.config.mjs`
3. `ui5lint.config.cjs`

The first file found is used.

---

## Configuration File Formats

### ES Module (ESM) Format

**File**: `ui5lint.config.mjs` or `ui5lint.config.js` (with `"type": "module"` in package.json)

```javascript
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",
    "!webapp/test/integration/**",
  ],
  files: [
    "webapp/**/*.js",
    "webapp/**/*.xml",
  ],
};
```

**When to Use**:
- Modern JavaScript projects
- Projects using `"type": "module"` in package.json
- New projects (recommended)

---

### CommonJS Format

**File**: `ui5lint.config.cjs` or `ui5lint.config.js` (without `"type": "module"`)

```javascript
module.exports = {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",
    "!webapp/test/integration/**",
  ],
  files: [
    "webapp/**/*.js",
    "webapp/**/*.xml",
  ],
};
```

**When to Use**:
- Traditional Node.js projects
- Projects without ESM support
- Legacy projects

---

## Configuration Options

### ignores

**Type**: `string[]`

**Description**: Array of glob patterns to exclude files from analysis.

**Default**: `[]` (no files ignored)

**Pattern Characteristics**:
- Relative to project root
- Supports glob syntax (`*`, `**`, `?`, `[]`, `{}`)
- Supports negation with `!` prefix
- **Order matters**: Later patterns override earlier ones

**Basic Examples**:

```javascript
export default {
  ignores: [
    // Ignore entire directory
    "webapp/thirdparty/**",

    // Ignore all test files
    "**/*.test.js",
    "**/*.spec.js",

    // Ignore specific file
    "webapp/libs/legacy.js",
  ],
};
```

**Advanced Patterns**:

```javascript
export default {
  ignores: [
    // Ignore all test directories
    "webapp/test/**",

    // BUT include integration tests (negation)
    "!webapp/test/integration/**",

    // Ignore generated files
    "dist/**",
    "build/**",

    // Ignore third-party libraries
    "webapp/thirdparty/**",
    "webapp/vendor/**",
    "node_modules/**", // Usually excluded by default

    // Ignore specific file types
    "**/*.min.js",
    "**/*.bundle.js",
  ],
};
```

**Negation Example**:

```javascript
export default {
  ignores: [
    // Ignore all test files
    "webapp/test/**",

    // Except integration tests
    "!webapp/test/integration/**",

    // And except this specific file
    "!webapp/test/TestUtils.js",
  ],
};
```

**Pattern Order Matters**:

```javascript
// ❌ WRONG: Negation comes first, then overridden
export default {
  ignores: [
    "!webapp/test/integration/**", // Won't work as expected
    "webapp/test/**",              // This overrides above
  ],
};

// ✅ CORRECT: Broader pattern first, then negation
export default {
  ignores: [
    "webapp/test/**",              // Ignore all tests
    "!webapp/test/integration/**", // Except integration tests
  ],
};
```

**Common Use Cases**:

```javascript
// UI5 Application
export default {
  ignores: [
    "webapp/thirdparty/**",     // Third-party libs
    "webapp/localService/**",   // Mock data
    "webapp/test/**",           // Tests
    "!webapp/test/integration/**", // Keep integration tests
  ],
};

// UI5 Library
export default {
  ignores: [
    "test/**",                  // Test files
    "docs/**",                  // Documentation
    ".internal/**",             // Internal dev files
  ],
};

// Fiori Elements App
export default {
  ignores: [
    "webapp/ext/**",            // Extensions (might use legacy patterns)
    "webapp/localService/**",   // Mock server
    "webapp/test/**",           // Tests
  ],
};
```

---

### files

**Type**: `string[]`

**Description**: Array of glob patterns specifying which files to lint.

**Default**: All files in project (except default exclusions)

**Restrictions**:
- ❌ Cannot include files typically excluded (e.g., `node_modules/`)
- ❌ Cannot include non-webapp directories in applications
- ✅ Must use POSIX separators (`/`) regardless of platform

**Basic Examples**:

```javascript
export default {
  files: [
    // Lint all JavaScript in webapp
    "webapp/**/*.js",

    // Lint all XML views
    "webapp/**/*.xml",

    // Lint manifest
    "webapp/manifest.json",
  ],
};
```

**Target Specific Areas**:

```javascript
export default {
  files: [
    // Controllers only
    "webapp/controller/**/*.js",

    // Views and fragments
    "webapp/view/**/*.xml",
    "webapp/fragment/**/*.xml",

    // Component and manifest
    "webapp/Component.js",
    "webapp/manifest.json",
  ],
};
```

**Multi-Language Projects**:

```javascript
export default {
  files: [
    // JavaScript
    "webapp/**/*.js",

    // TypeScript
    "webapp/**/*.ts",

    // XML
    "webapp/**/*.xml",

    // YAML
    "ui5.yaml",
    "ui5-*.yaml",
  ],
};
```

**Library Projects**:

```javascript
export default {
  files: [
    "src/**/*.js",          // Source files
    "src/**/*.xml",         // Control templates
    "src/**/*.json",        // Metadata
  ],
};
```

---

## Complete Configuration Examples

### Example 1: Basic UI5 Application

```javascript
// ui5lint.config.mjs
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",
  ],
};
```

**Explanation**:
- Ignores third-party libraries
- Ignores all test files
- Lints everything else in the project

---

### Example 2: Advanced Application with Selective Testing

```javascript
// ui5lint.config.mjs
export default {
  ignores: [
    // Third-party code
    "webapp/thirdparty/**",
    "webapp/vendor/**",

    // Mock data
    "webapp/localService/**",

    // All tests
    "webapp/test/**",

    // Except integration and unit tests
    "!webapp/test/integration/**",
    "!webapp/test/unit/**",

    // Ignore generated files
    "dist/**",
    "build/**",

    // Ignore minified files
    "**/*.min.js",
  ],
  files: [
    "webapp/**/*.js",
    "webapp/**/*.xml",
    "webapp/manifest.json",
  ],
};
```

---

### Example 3: UI5 Library

```javascript
// ui5lint.config.mjs
export default {
  ignores: [
    "test/**",
    "docs/**",
    ".internal/**",
    "playground/**",
  ],
  files: [
    "src/**/*.js",
    "src/**/*.xml",
    "src/**/*.json",
  ],
};
```

---

### Example 4: TypeScript Project

```javascript
// ui5lint.config.mjs
export default {
  ignores: [
    "webapp/thirdparty/**",
    "dist/**",
    "**/*.d.ts", // Ignore type definitions
  ],
  files: [
    "webapp/**/*.ts",
    "webapp/**/*.xml",
    "webapp/manifest.json",
  ],
};
```

---

### Example 5: Monorepo with Multiple Apps

```javascript
// ui5lint.config.mjs (in root)
export default {
  ignores: [
    "**/thirdparty/**",
    "**/test/**",
    "**/dist/**",
    "node_modules/**",
  ],
  files: [
    "apps/*/webapp/**/*.js",
    "apps/*/webapp/**/*.xml",
    "apps/*/webapp/manifest.json",
  ],
};
```

---

### Example 6: Fiori Elements Application

```javascript
// ui5lint.config.mjs
export default {
  ignores: [
    // Standard ignores
    "webapp/localService/**",
    "webapp/test/**",

    // Fiori Elements ignores
    "webapp/ext/**", // Extensions might use legacy patterns

    // Generated files
    "webapp/changes/**", // UI Adaptation changes
  ],
  files: [
    "webapp/manifest.json",
    "webapp/Component.js",
    "webapp/ext/**/*.js", // Lint extensions separately if needed
  ],
};
```

---

## Using CLI Options to Override Config

CLI options can override or extend configuration file settings.

### Override Ignore Patterns

```bash
# Add additional ignore pattern
ui5lint --ignore-pattern "webapp/experimental/**"

# Multiple additional patterns
ui5lint --ignore-pattern "**/*.old.js" --ignore-pattern "webapp/archive/**"
```

**Note**: CLI patterns are **added to** config file patterns, not replaced.

---

### Override File Patterns

```bash
# Lint specific files (ignores config file 'files' option)
ui5lint "webapp/controller/**/*.js"

# Lint specific areas
ui5lint "webapp/view/" "webapp/fragment/"
```

**Note**: Positional file arguments **override** the config file `files` option.

---

### Use Custom Config File

```bash
# Use different config
ui5lint --config config/lint-strict.config.js

# Use environment-specific config
ui5lint --config .ui5lint.ci.config.js
```

---

## Integration with package.json

### Add npm Script

```json
{
  "scripts": {
    "lint": "ui5lint",
    "lint:fix": "ui5lint --fix",
    "lint:ci": "ui5lint --quiet --format json > lint-results.json"
  }
}
```

### Usage

```bash
npm run lint
npm run lint:fix
npm run lint:ci
```

---

## Integration with ui5.yaml

UI5 Linter reads `ui5.yaml` to understand project structure.

### Custom ui5.yaml Location

```bash
ui5lint --ui5-config config/ui5-dev.yaml
```

### Example ui5.yaml

```yaml
specVersion: "3.0"
type: application
metadata:
  name: my.app

resources:
  configuration:
    paths:
      webapp: webapp

builder:
  resources:
    excludes:
      - "/test/**"
      - "/localService/**"
```

**Note**: UI5 Linter respects UI5 Tooling configuration but uses its own ignore patterns from config file.

---

## Platform-Specific Considerations

### Path Separators

**Always use POSIX separators (`/`)** in configuration files, regardless of platform:

```javascript
// ✅ CORRECT (works on all platforms)
export default {
  ignores: [
    "webapp/thirdparty/**",
  ],
};

// ❌ WRONG (doesn't work)
export default {
  ignores: [
    "webapp\\thirdparty\\**", // Windows-style separators
  ],
};
```

### Case Sensitivity

**File systems**:
- Linux/macOS: Case-sensitive
- Windows: Case-insensitive (usually)

**Recommendation**: Always match exact case in patterns.

```javascript
// ✅ CORRECT: Match exact case
export default {
  ignores: [
    "webapp/ThirdParty/**", // If directory is "ThirdParty"
  ],
};
```

---

## Debugging Configuration

### Verbose Output

See which files are being processed:

```bash
ui5lint --verbose
```

**Output**:
```
verbose Loading configuration from /project/ui5lint.config.js
verbose Ignoring: webapp/thirdparty/**
verbose Processing: webapp/controller/Main.controller.js
verbose Processing: webapp/view/Main.view.xml
...
```

### Test Patterns

Use `--ignore-pattern` to test without modifying config:

```bash
# Test if pattern works
ui5lint --ignore-pattern "webapp/test/**" --verbose
```

---

## Common Configuration Patterns

### Gradual Migration

```javascript
// Start with strict ignores, gradually reduce
export default {
  ignores: [
    // Ignore everything except what we've migrated
    "webapp/**",

    // Include migrated files
    "!webapp/controller/Main.controller.js",
    "!webapp/view/Main.view.xml",
  ],
};
```

### Focus on Specific Issues

```javascript
// Lint manifest and component only
export default {
  files: [
    "webapp/manifest.json",
    "webapp/Component.js",
  ],
};
```

### Exclude Generated Code

```javascript
export default {
  ignores: [
    "**/*.gen.js",           // Generated JavaScript
    "**/gen/**",             // Generated directory
    "dist/**",               // Distribution build
    "build/**",              // Build output
    "webapp/changes/**",     // UI Adaptation changes
  ],
};
```

---

## Environment-Specific Configurations

### Development Config

```javascript
// ui5lint.config.js
export default {
  ignores: [
    "webapp/thirdparty/**",
    // Allow test files in development
  ],
};
```

### CI/CD Config

```javascript
// .ui5lint.ci.config.js
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",        // Ignore all tests in CI
    "webapp/localService/**",
  ],
};
```

**Usage**:
```bash
# CI pipeline
ui5lint --config .ui5lint.ci.config.js --quiet --format json
```

---

## Best Practices

### 1. Start Broad, Then Narrow

```javascript
// Start with broad ignores
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",
  ],
};

// Later, as code improves, reduce ignores
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**",
    "!webapp/test/integration/**", // Now lint integration tests
  ],
};
```

### 2. Document Complex Patterns

```javascript
export default {
  ignores: [
    // Third-party libraries (no control over code quality)
    "webapp/thirdparty/**",

    // Mock data (auto-generated from OData metadata)
    "webapp/localService/**",

    // Legacy code (planned for refactor in Q2)
    "webapp/legacy/**",
  ],
};
```

### 3. Use Consistent Patterns

```javascript
// ✅ GOOD: Consistent pattern style
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/vendor/**",
    "webapp/test/**",
  ],
};

// ❌ BAD: Inconsistent patterns
export default {
  ignores: [
    "webapp/thirdparty/**",    // Double star
    "webapp/vendor/*",         // Single star
    "webapp/test",             // No star
  ],
};
```

### 4. Version Control Configuration

**Commit** configuration file:
```bash
git add ui5lint.config.js
git commit -m "Add UI5 Linter configuration"
```

**Document** in README:
```markdown
## Linting

```bash
npm run lint
```

Configuration: `ui5lint.config.js`
```

---

## Troubleshooting

### Issue: Config File Not Found

**Symptoms**: Linter uses default settings despite config file existing.

**Solutions**:
1. Verify filename exactly matches: `ui5lint.config.{js,mjs,cjs}`
2. Ensure file is in project root (same as `ui5.yaml`)
3. Check file extension matches module type
4. Verify no syntax errors in config file

---

### Issue: Patterns Not Working

**Symptoms**: Files still linted despite ignore patterns.

**Solutions**:
1. Verify POSIX separators (`/` not `\`)
2. Check pattern order (broad first, negations last)
3. Use `--verbose` to see what's being processed
4. Test patterns with `--ignore-pattern` flag first

---

### Issue: Negation Patterns Not Working

**Symptoms**: Negated files still ignored.

**Solutions**:
1. Ensure negation comes **after** broader pattern:
   ```javascript
   ignores: [
     "webapp/test/**",              // First: broad
     "!webapp/test/integration/**", // Then: negation
   ]
   ```
2. Verify `!` prefix is directly before pattern (no space)

---

## Further Reading

- **Main Repository**: https://github.com/UI5/linter
- **README**: https://github.com/UI5/linter/blob/main/README.md
- **CLI Options**: See cli-options.md reference
- **Node.js Glob Patterns**: https://github.com/isaacs/node-glob#glob-primer

---

**Document Version**: 1.0
**Last Verified**: 2025-11-21
**Next Review**: 2026-02-21
