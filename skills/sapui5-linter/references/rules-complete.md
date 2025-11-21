# UI5 Linter - Complete Rules Reference

**Source**: https://github.com/UI5/linter/blob/main/docs/Rules.md
**Last Updated**: 2025-11-21
**UI5 Linter Version**: 1.20.5

---

## Overview

The UI5 Linter provides 19 rules organized into several categories to help identify compatibility issues, deprecated APIs, security concerns, and modernization opportunities when preparing for UI5 2.x migration.

---

## Rules by Category

### Async & Modern Patterns

#### 1. async-component-flags

**Purpose**: Validates that components are properly configured for asynchronous loading.

**What It Checks**:
- Presence of `sap.ui.core.IAsyncContentCreation` interface in Component metadata
- `async` flags in `manifest.json`

**Why It Matters**: Asynchronous component loading is required for modern UI5 applications and improves performance.

**Autofix**: Not available

---

#### 14. prefer-test-starter

**Purpose**: Validates that test-related files implement the Test Starter concept.

**What It Checks**: Test file structure and initialization patterns

**Why It Matters**: Test Starter is the modern approach for UI5 testing

**Autofix**: Not available

---

### Security

#### 2. csp-unsafe-inline-script

**Purpose**: Ensures inline scripts in HTML files comply with Content Security Policy best practices.

**What It Checks**: Detects unsafe inline script usage patterns that violate CSP

**Why It Matters**: CSP violations can lead to security vulnerabilities and deployment issues

**Autofix**: Not available

---

### Event Handlers

#### 3. no-ambiguous-event-handler

**Purpose**: Verifies event handlers in XML views/fragments use correct notation.

**What It Checks**:
- Handlers use dot notation (representing controller methods), OR
- Handlers reference local imports via `core:require`

**Why It Matters**: Ambiguous event handler notation can lead to runtime errors

**Autofix**: Available (migrate to recommended event handler notation)

**Autofix Details** (Added in v1.19.0):
- Migrates event handlers to recommended notation format
- Ensures proper controller method references

---

### Deprecation Detection

#### 4. no-deprecated-api

**Purpose**: Detects usage of deprecated APIs, features, or parameters throughout the codebase.

**What It Checks**: All API calls against SAPUI5 deprecation database

**Supported File Types**: JavaScript, TypeScript, XML, JSON, YAML

**Why It Matters**: Deprecated APIs may be removed in UI5 2.x

**Autofix**: Available (extensive, but with limitations)

**Autofix Categories**:
1. **Configuration Facade**: Core.getConfiguration() method replacements
2. **Core Facade**: Core API method replacements
3. **Button Events**: tap → press event handler migration
4. **SmartTable**: Export property updates
5. **ODataModel**: Property removals
6. **SimpleForm**: Property elimination
7. **Bootstrap**: Script attribute corrections
8. **jQuery.sap**: Limited autofix (many APIs excluded)

**Autofix Limitations**:
- Code outside module definitions
- Sync-to-async conversions
- Complex replacements requiring multiple calls
- Context-dependent replacements
- Return value changes

See `autofix-complete.md` for comprehensive autofix details.

---

#### 6. no-deprecated-component

**Purpose**: Identifies dependencies on deprecated components declared in `manifest.json`.

**What It Checks**: Component dependencies in manifest file

**Why It Matters**: Deprecated components may not be compatible with UI5 2.x

**Autofix**: Not available

---

#### 7. no-deprecated-control-renderer-declaration

**Purpose**: Validates correct declaration patterns for control renderers.

**What It Checks**: Control renderer declaration syntax

**Why It Matters**: Legacy renderer patterns are deprecated in modern UI5

**Autofix**: Not available

---

#### 8. no-deprecated-library

**Purpose**: Checks for deprecated library dependencies.

**What It Checks**:
- `manifest.json` library dependencies
- `ui5.yaml` configuration files

**Why It Matters**: Deprecated libraries may not be available in UI5 2.x

**Autofix**: Not available

---

#### 9. no-deprecated-theme

**Purpose**: Detects usage of deprecated themes.

**What It Checks**:
- Theme references in code
- Theme declarations in HTML files

**Why It Matters**: Deprecated themes are not supported in modern UI5

**Autofix**: Not available

---

### Global Usage Detection

#### 10. no-globals

**Purpose**: Identifies problematic global variable usage within the codebase.

**What It Checks**: Direct access to UI5 globals instead of module imports

**Examples**:
```javascript
// ❌ Bad: Global access
sap.ui.getCore().byId("myControl");

// ✅ Good: Module import
import Core from "sap/ui/core/Core";
Core.byId("myControl");
```

**Why It Matters**: Global variable access prevents proper module bundling and is deprecated

**Autofix**: Available - Replaces global references with module imports

**Autofix Limitations**:
- Cannot fix assignments to global variables
- Cannot handle `delete` expressions on globals
- Third-party module access via globals (like `jQuery`) not handled

---

#### 11. no-implicit-globals

**Purpose**: Checks for implicit global access patterns.

**What It Checks**:
1. Modules accessed via global library namespaces
2. Implicit `odata` globals in bindings

**Examples**:
```javascript
// ❌ Bad: Implicit global namespace
sap.ui.require(["sap/m/Button"], function(Button) {
  // But then accessing via global:
  var btn = new sap.m.Button();
});

// ❌ Bad: Implicit odata global in binding
{path: 'odata>/Something'}

// ✅ Good: Use module reference
{path: 'odataModel>/Something'}
```

**Why It Matters**: Implicit globals create hidden dependencies

**Autofix**: Not available

---

### Module System

#### 12. no-pseudo-modules

**Purpose**: Detects dependencies to pseudo modules within the code.

**What It Checks**: References to UI5 pseudo modules

**Why It Matters**: Pseudo modules are being phased out

**Autofix**: Not available (no implementation support)

---

### Error Reporting

#### 13. parsing-error

**Purpose**: Reports syntax/parsing errors encountered during the linting process.

**What It Checks**: File syntax validity

**Why It Matters**: Parse errors prevent linting analysis

**Autofix**: Not available (requires manual code fixes)

---

#### 14. autofix-error

**Purpose**: Indicates when an expected autofix cannot be applied.

**What It Checks**: Internal autofix operation success

**Why It Matters**: Suggests internal linter issues or edge cases

**Autofix**: N/A (this is an error report about autofix failures)

---

### API Usage Validation

#### 16. ui5-class-declaration

**Purpose**: Verifies correct UI5 class declaration patterns, particularly for TypeScript.

**What It Checks**:
- Native ECMAScript class usage
- Proper TypeScript class patterns

**Why It Matters**: Modern UI5 supports native classes but requires specific patterns

**Autofix**: Not available

---

#### 17. unsupported-api-usage

**Purpose**: Ensures proper UI5 API usage patterns.

**What It Checks**:
- Formatter type requirements in JavaScript/TypeScript bindings
- Other API misuse patterns

**Examples**:
```javascript
// ❌ Bad: Missing formatter type
{path: 'date', formatter: someFunction}

// ✅ Good: Proper formatter type
{path: 'date', formatter: '.formatDate'}
```

**Why It Matters**: Improper API usage leads to runtime errors

**Autofix**: Not available

---

### Manifest Modernization

#### 18. no-outdated-manifest-version

**Purpose**: Requires Manifest Version 2 for legacy-free UI5.

**What It Checks**: `_version` property in `manifest.json`

**Current Requirement**: Must be version 2 or higher

**Why It Matters**: Manifest Version 2 is required for UI5 2.x

**Autofix**: Not available (requires manual migration planning)

**Related Rules**:
- no-removed-manifest-property
- no-legacy-ui5-version-in-manifest

---

#### 19. no-removed-manifest-property

**Purpose**: Identifies properties from earlier manifest versions that are incompatible with Manifest Version 2 schema.

**What It Checks**: Manifest properties against Version 2 schema

**Common Issues**:
- `synchronizationMode` (removed)
- Empty `sap.ui5/resources/js` entries
- Deprecated routing properties

**Why It Matters**: Incompatible properties cause deployment failures

**Autofix**: Available for specific properties

**Autofix Capabilities** (Added in v1.19.0):
- Removal of `synchronizationMode` from manifest.json
- Cleanup of empty `sap.ui5/resources/js` entries

---

#### 20. no-legacy-ui5-version-in-manifest

**Purpose**: Validates that `sap.ui5/dependencies/minUI5Version` specifies modern UI5 versions.

**What It Checks**: Minimum UI5 version in manifest.json

**Current Requirement**: Version 1.136 or higher

**Why It Matters**: Manifest Version 2 requires modern UI5 versions (1.136+)

**Example**:
```json
{
  "sap.ui5": {
    "dependencies": {
      "minUI5Version": "1.136.0"
    }
  }
}
```

**Autofix**: Not available (requires manual version updates and testing)

---

## Rule Summary Table

| Rule | Category | Autofix | Priority |
|------|----------|---------|----------|
| async-component-flags | Modern Patterns | ❌ | High |
| csp-unsafe-inline-script | Security | ❌ | High |
| no-ambiguous-event-handler | Event Handlers | ✅ | Medium |
| no-deprecated-api | Deprecation | ✅ (Limited) | High |
| no-deprecated-component | Deprecation | ❌ | High |
| no-deprecated-control-renderer-declaration | Deprecation | ❌ | Medium |
| no-deprecated-library | Deprecation | ❌ | High |
| no-deprecated-theme | Deprecation | ❌ | Medium |
| no-globals | Global Usage | ✅ | High |
| no-implicit-globals | Global Usage | ❌ | Medium |
| no-pseudo-modules | Module System | ❌ | Low |
| parsing-error | Error Reporting | ❌ | Critical |
| autofix-error | Error Reporting | N/A | Critical |
| prefer-test-starter | Modern Patterns | ❌ | Low |
| ui5-class-declaration | API Usage | ❌ | Medium |
| unsupported-api-usage | API Usage | ❌ | High |
| no-outdated-manifest-version | Manifest | ❌ | High |
| no-removed-manifest-property | Manifest | ✅ (Limited) | High |
| no-legacy-ui5-version-in-manifest | Manifest | ❌ | High |

---

## Using Rules

### Disabling Specific Rules

**In JavaScript/TypeScript**:
```javascript
/* ui5lint-disable no-deprecated-api */
// Your code here
/* ui5lint-enable no-deprecated-api */

// Or for a single line:
const result = deprecatedMethod(); // ui5lint-disable-line no-deprecated-api

// Or for the next line:
// ui5lint-disable-next-line no-deprecated-api
const result = deprecatedMethod();
```

**In XML/HTML**:
```xml
<!-- ui5lint-disable no-deprecated-api -->
<Button press="onPress"/>
<!-- ui5lint-enable no-deprecated-api -->

<!-- Or for next element: -->
<!-- ui5lint-disable-next-line no-deprecated-api -->
<Button press="onPress"/>
```

**In YAML**:
```yaml
# ui5lint-disable no-deprecated-library
dependencies:
  - sap.ui.commons
# ui5lint-enable no-deprecated-library
```

### Multiple Rules

```javascript
// ui5lint-disable no-deprecated-api, no-globals
const core = sap.ui.getCore();
core.byId("deprecated");
// ui5lint-enable no-deprecated-api, no-globals
```

### With Explanations

```javascript
// ui5lint-disable-next-line no-deprecated-api -- Required for legacy compatibility
legacyAPI.call();
```

---

## Further Reading

- **Main Repository**: https://github.com/UI5/linter
- **Rules Documentation**: https://github.com/UI5/linter/blob/main/docs/Rules.md
- **Autofix Scope**: https://github.com/UI5/linter/blob/main/docs/Scope-of-Autofix.md
- **UI5 2.x Migration Guide**: https://ui5.sap.com/

---

**Document Version**: 1.0
**Last Verified**: 2025-11-21
**Next Review**: 2026-02-21
