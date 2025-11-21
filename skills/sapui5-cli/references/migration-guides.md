# UI5 CLI Migration Guides

**Official Documentation**:
- https://ui5.github.io/cli/stable/updates/migrate-v4/
- https://ui5.github.io/cli/stable/updates/migrate-v3/
- https://ui5.github.io/cli/stable/updates/migrate-v2/
- https://ui5.github.io/cli/stable/updates/migrate-v1/

This reference provides complete migration guidance for all UI5 CLI versions.

## Table of Contents

1. [Migration v3 → v4](#migration-v3--v4)
2. [Migration v2 → v3](#migration-v2--v3)
3. [Migration v1 → v2](#migration-v1--v2)
4. [Migration v0.x → v1](#migration-v0x--v1)
5. [Quick Migration Checklist](#quick-migration-checklist)

---

## Migration v3 → v4

**Release Date**: July 24, 2024
**UI5 CLI Version**: v4.0.0+

### System Requirements

**BREAKING**: Updated minimum versions

| Requirement | Previous (v3) | New (v4) |
|-------------|---------------|----------|
| **Node.js** | v16.18.0 / v18.12.0+ | v20.11.0+ or v22.0.0+ (v21 NOT supported) |
| **npm** | v8.0.0+ | v8.0.0+ (unchanged) |

**Action Required**:
```bash
# Check versions
node --version  # Must be v20.11.0+ or v22.0.0+
npm --version   # Must be v8.0.0+

# Update Node.js if needed
nvm install 20
nvm use 20
```

### UI5 2.x Compatibility

**NEW REQUIREMENT**: UI5 CLI v4.0 is required for building UI5 2.x framework projects.

**Impact**: Framework libraries defining Specification Version 4.0 cannot be built with older CLI versions.

**Recommendation**: Adopt v4.0 for UI5 2.x compatibility even if not mandatory for applications.

### Supported Specification Versions

**Unchanged**: All projects with Specification Versions 2.0+ remain supported.

**Auto-Migration**: Legacy versions (0.1, 1.x) undergo automatic migration, though non-standard configurations may cause issues.

### Breaking Changes for Spec v4.0+

#### 1. JavaScript Module Bundling Terminated

**BREAKING**: Bundling of JavaScript modules requiring 'top level scope' as a string is terminated.

**Impact**: Affected modules are **omitted from bundles** with error logging.

**Example of problematic code**:
```javascript
// This will cause bundling to fail in v4.0
var globalVar = "something";
sap.ui.define([], function() {
  // Module code
});
```

**Migration**:
```javascript
// Move to module scope
sap.ui.define([], function() {
  var localVar = "something";
  // Module code
});
```

**Alternative**: Exclude from bundle:
```yaml
builder:
  componentPreload:
    excludes:
      - "my/app/problematic/Module.js"
```

#### 2. Async Require Sections

**BREAKING**: New `async` option defaults to `true`.

**Impact**: Uses `sap.ui.require` instead of deprecated `sap.ui.requireSync`, affecting loading behavior across all bundle types.

**Migration**:
```yaml
# v3.x (old)
builder:
  bundles:
    - bundleDefinition:
        sections:
          - mode: require
            filters: ["my/app/**"]

# v4.0 (new - explicit async)
builder:
  bundles:
    - bundleDefinition:
        sections:
          - mode: require
            async: true    # Default behavior, can specify false if needed
            filters: ["my/app/**"]
```

#### 3. usePredefineCalls Option Removed

**BREAKING**: The `usePredefineCalls` bundle option is eliminated.

**Impact**: UI5 CLI v4 **always** uses `sap.ui.predefine` calls in bundles.

**Migration**:
```yaml
# v3.x (remove this)
builder:
  bundles:
    - bundleOptions:
        usePredefineCalls: true  # DELETE THIS LINE

# v4.0 (automatic behavior)
builder:
  bundles:
    - bundleOptions:
        optimize: true
        sourceMap: true
```

### Code Migration Requirements

#### @ui5/cli Changes

**BREAKING**: Console output now uses `process.stderr` instead of `console.log`.

**Impact**: Scripts capturing stdout will miss CLI output.

**Migration**:
```bash
# v3.x (old)
ui5 build > output.txt

# v4.0 (new - capture stderr)
ui5 build 2> output.txt

# Capture both
ui5 build > output.txt 2>&1
```

#### @ui5/fs Changes

**BREAKING**: Non-public API `DuplexCollection#byGlobSource` removed.

**Impact**: Custom code using this internal API will break.

**Migration**: Use public API `DuplexCollection#byGlob` instead.

#### @ui5/builder Changes

**BREAKING Changes**:
1. `usePredefineCalls` option removed (see above)
2. `namespace` option renamed to `projectNamespace`
3. New `async` option for bundle section definitions

**Migration for namespace**:
```javascript
// v3.x (old)
const options = {
  namespace: "my/app"
};

// v4.0 (new)
const options = {
  projectNamespace: "my/app"
};
```

#### @ui5/project Changes

**BREAKING Changes**:
1. Default `workspaceName` changed from `undefined` to `"default"`
2. `ui5HomeDir` renamed to `ui5DataDir`
3. `@ui5/builder` is now optional dependency

**Impact**: Consumers must explicitly declare `@ui5/builder` dependency if using programmatic API.

**Migration**:
```json
{
  "dependencies": {
    "@ui5/project": "^4.0.0",
    "@ui5/builder": "^4.0.0"  // Add explicitly if needed
  }
}
```

### Troubleshooting Specific Issue

#### TypeError: invalid input with UI5 1.71

**Symptom**: Build fails with "TypeError: invalid input"

**Cause**: UI5 CLI uses manifest's `_version` property to decide whether `supportedLocales` can be generated. For UI5 1.71, only manifest versions up to 1.17.0 are supported.

**Solution**:
```json
{
  "_version": "1.17.0",  // For UI5 1.71
  "sap.app": {
    ...
  }
}
```

**Better**: Update manifest version to match UI5 framework version.

### Installation

```bash
# Update to v4
npm install --save-dev @ui5/cli@latest

# Verify
ui5 --version  # Should show 4.x.x
```

### Migration Checklist v3→v4

- [ ] Verify Node.js v20.11.0+ or v22.0.0+
- [ ] Verify npm v8.0.0+
- [ ] Update `@ui5/cli` to v4.0.0+
- [ ] Update `specVersion` to `"4.0"` in ui5.yaml
- [ ] Remove `usePredefineCalls` from bundle options
- [ ] Add `async: true` to bundle require sections (if needed)
- [ ] Review JavaScript modules for top-level scope issues
- [ ] Update scripts capturing CLI output (use stderr)
- [ ] If using programmatic API:
  - [ ] Replace `namespace` with `projectNamespace`
  - [ ] Replace `ui5HomeDir` with `ui5DataDir`
  - [ ] Add explicit `@ui5/builder` dependency
- [ ] Test build: `ui5 build --all`
- [ ] Test server: `ui5 serve`

---

## Migration v2 → v3

**Release Date**: November 2021
**UI5 CLI Version**: v3.0.0+
**NOTE**: v3 has been superseded by v4. Migrate to v4 instead.

### System Requirements

| Requirement | Previous (v2) | New (v3) |
|-------------|---------------|----------|
| **Node.js** | v10.0.0+ | v16.18.0 / v18.12.0+ |
| **npm** | No requirement | v8.0.0+ |

### Supported Specification Versions

Only projects with Specification Version 2.0+ are supported.

### Breaking Changes for Projects (Spec v3.0+)

#### Metadata Name Restrictions

**BREAKING**: `metadata.name` now only accepts limited characters and **disallows uppercase letters**.

**Migration**:
```yaml
# v2.x (old - will fail in v3.0+)
metadata:
  name: MyApplication

# v3.0 (new - lowercase only)
metadata:
  name: my.application
```

**Requirements**:
- 3-80 characters
- Lowercase alphanumeric, dashes, underscores, periods
- Must start with letter or `@`

### Breaking Changes for Extensions (Spec v3.0+)

#### Custom Tasks: Required Dependency Declaration

**BREAKING**: Custom tasks must request access to dependency resources via `determineRequiredDependencies` callback.

**Previous Behavior**: All dependencies automatically available.

**New Behavior**: No dependencies unless explicitly requested.

**Migration**:
```javascript
// v2.x (old - dependencies auto-available)
export default async function({dependencies}) {
  // Can access all dependencies
}

// v3.0 (new - must declare requirements)
export async function determineRequiredDependencies({availableDependencies}) {
  const dependencies = new Set();
  // Only add actually needed dependencies
  if (availableDependencies.has("my.required.lib")) {
    dependencies.add("my.required.lib");
  }
  return dependencies;
}

export default async function({dependencies}) {
  // Can only access declared dependencies
}
```

#### Enhanced APIs

**NEW**: TaskUtil and MiddlewareUtil provide:
- Project root directory access
- Dependency information
- Additional helper methods

### Dependency Configuration Changes

**REMOVED**: `ui5.dependencies` property in package.json no longer necessary.

**NEW**: System automatically analyzes:
- `dependencies`
- `devDependencies` (root project only)
- `optionalDependencies` (root project only)

**Migration**:
```json
{
  "name": "my-app",
  "ui5": {
    "dependencies": ["my-lib"]  // DELETE THIS
  },
  "dependencies": {
    "my-lib": "^1.0.0"  // Automatically detected
  }
}
```

### Module API Migration

#### Removed Modules

**BREAKING**: These modules no longer exist:
- `normalizer`
- `projectTree`

#### Moved APIs

**BREAKING**: Builder API relocated from `@ui5/builder` to `@ui5/project`.

#### ESM Conversion

**BREAKING**: All modules converted to ES Modules (ESM). CommonJS no longer supported.

**Migration Example**:
```javascript
// v2.x (old - CommonJS)
const {normalizer} = require("@ui5/project");
const tree = await normalizer.generateProjectTree({cwd: "."});
const builder = require("@ui5/builder").builder;
await builder.build({tree});

// v3.0 (new - ESM)
import {graphFromPackageDependencies} from "@ui5/project/graph";
import {build} from "@ui5/project/build";

const graph = await graphFromPackageDependencies({cwd: "."});
await build({graph});
```

### CLI Changes

#### Removed Flags

**BREAKING**: `--translator` flag removed.

**Migration**: Use `--dependency-definition` for static dependency resolution.

#### Removed Commands

**BREAKING**: `ui5 build dev` command removed.

**Migration**: Use explicit task inclusion:
```bash
# v2.x (old)
ui5 build dev

# v3.0 (new)
ui5 build --exclude-task=* --include-task=<desired-tasks>
```

### Build System Changes

#### Removed Tasks

**BREAKING**: These tasks no longer exist:
- `createDebugFiles` → Replaced by `minify`
- `generateManifestBundle` → Removed
- `uglify` → Replaced by `minify`

#### Removed Processors

**BREAKING**: These processors no longer exist:
- `debugFileCreator`
- `manifestBundler`
- `resourceCopier`
- `uglifier`

#### Task Execution Changes

**NEW**: The `minify` task now executes **earlier** (before bundling instead of after).

#### Dependency Building

**NEW**: If any build task requires dependency resources, UI5 CLI v3 now **always builds dependencies upfront**.

**Impact**: Slower builds if many dependencies, but ensures correctness.

### Middleware Changes

**BREAKING**: `connectUi5Proxy` middleware removed.

**Migration**: Use community-developed proxy solutions or custom middleware.

### JSDoc Error Handling

**BREAKING**: JSDoc generator now **fails build** when JSDoc reports errors (non-zero exit codes).

**Impact**: Previously ignored JSDoc errors now break builds.

**Migration**: Fix JSDoc errors in code or exclude problematic files.

### Installation

```bash
npm install --save-dev @ui5/cli@^3
```

### Migration Checklist v2→v3

- [ ] Verify Node.js v16.18.0+ or v18.12.0+
- [ ] Verify npm v8.0.0+
- [ ] Update `@ui5/cli` to v3.0.0+
- [ ] Update `specVersion` to `"3.0"` or higher
- [ ] Convert `metadata.name` to lowercase
- [ ] Remove `ui5.dependencies` from package.json
- [ ] Update custom tasks with `determineRequiredDependencies`
- [ ] If using programmatic API:
  - [ ] Convert CommonJS to ESM
  - [ ] Replace `normalizer` with `graph` API
  - [ ] Update builder imports
- [ ] Replace removed tasks/processors
- [ ] Replace `--translator` with `--dependency-definition`
- [ ] Fix JSDoc errors (builds will fail on errors)
- [ ] Test build and serve

---

## Migration v1 → v2

**Release Date**: April 1, 2020
**UI5 CLI Version**: v2.0.0+

### Primary Feature

**NEW**: SAPUI5 library consumption support.

### Breaking Changes

#### Node.js Requirement

**BREAKING**: All UI5 CLI modules require Node.js >= 10.

**Migration**: Update Node.js to v10 or higher.

#### Mandatory Namespace Declaration

**BREAKING**: Applications and libraries must now declare a namespace.

**Detection Order**:
1. `sap.app/id` in manifest.json
2. For libraries: `name` attribute in .library file
3. For libraries: path of library.js file

**Error**: Thrown if namespace cannot be detected.

**Migration**:
```json
{
  "sap.app": {
    "id": "my.company.app"  // Ensure this is present
  }
}
```

#### Manifest and .library File Co-location

**BREAKING**: If a library contains both manifest.json and .library, they must reside in the same directory.

**Impact**: Misplaced files trigger exceptions.

**Migration**: Move files to same directory:
```
src/my/company/library/
├── library.js
├── .library
└── manifest.json  # Must be in same directory as .library
```

#### Properties File Encoding

**BREAKING**: Non-application/library projects now expect `*.properties` files encoded in UTF-8 (was ISO-8859-1).

**Migration**: Convert properties files to UTF-8 or configure encoding:
```yaml
resources:
  configuration:
    propertiesFileSourceEncoding: ISO-8859-1  # If needed
```

#### Deprecated Parameter Removal

**BREAKING**: `useNamespaces` parameter removed from `resourceFactory.createCollectionsForTree`.

**Migration**: Use `getVirtualBasePathPrefix` instead.

### Installation

```bash
# Global
npm install --global @ui5/cli

# Project
npm install --save-dev @ui5/cli@^2
```

### Configuration Update

```yaml
specVersion: "2.0"  # Update from "1.0" or "0.1"
metadata:
  name: my.project
type: application
```

### Migration Checklist v1→v2

- [ ] Verify Node.js v10+
- [ ] Update `@ui5/cli` to v2.0.0+
- [ ] Update `specVersion` to `"2.0"`
- [ ] Ensure namespace declared in manifest.json
- [ ] Co-locate manifest.json and .library (libraries)
- [ ] Check properties file encoding
- [ ] Update programmatic API (if using)
- [ ] Test build and serve

---

## Migration v0.x → v1

**Release Date**: July 2019
**UI5 CLI Version**: v1.0.0+

### Breaking Changes

#### Self-Contained Build Index.html Transformation

**BREAKING**: When performing self-contained build, index.html is transformed to load custom bundle instead of CDN resources.

**Impact**: Bootstrap script tag automatically updated.

#### Parameter Rename

**BREAKING**: "translator" parameter renamed to "translatorName" in:
- `generateDependencyTree`
- `generateProjectTree`

**Migration**:
```javascript
// v0.x (old)
generateProjectTree({translator: "npm"});

// v1.0 (new)
generateProjectTree({translatorName: "npm"});
```

#### Adapter Access Changes

**BREAKING**: Adapters no longer accessible from top-level export.

**Migration**:
```javascript
// v0.x (old)
const FileSystem = require("@ui5/project").FileSystem;

// v1.0 (new)
const FileSystem = require("@ui5/project").adapters.FileSystem;
```

Affects: `AbstractAdapter`, `FileSystem`, `Memory`

### Installation

```bash
# Global
npm install --global @ui5/cli

# Project
npm install @ui5/cli@^1
```

### Configuration Update

```yaml
specVersion: "1.0"  # Update from "0.1"
metadata:
  name: my.project
type: application
```

### Migration Checklist v0.x→v1

- [ ] Update `@ui5/cli` to v1.0.0+
- [ ] Update `specVersion` to `"1.0"`
- [ ] Update programmatic API (adapter access)
- [ ] Update parameter names (translatorName)
- [ ] Test self-contained builds (if used)

---

## Quick Migration Checklist

### Current Version → v4 (Recommended)

**From v3**:
1. Update Node.js to v20.11.0+ or v22.0.0+
2. `npm install --save-dev @ui5/cli@latest`
3. Update `specVersion: "4.0"`
4. Remove `usePredefineCalls` from bundles
5. Fix top-level scope modules
6. Test: `ui5 build --all && ui5 serve`

**From v2 or earlier**:
1. Follow v2→v3 migration first
2. Then follow v3→v4 migration

**From v1 or earlier**:
1. Follow v1→v2 migration first
2. Then follow v2→v3 migration
3. Then follow v3→v4 migration

### Version Compatibility Matrix

| UI5 CLI Version | Node.js | npm | specVersion Support |
|-----------------|---------|-----|---------------------|
| v4.0+ | v20.11+ / v22+ | v8+ | 2.0 - 4.0 |
| v3.0+ | v16.18+ / v18.12+ | v8+ | 2.0 - 3.2 |
| v2.0+ | v10+ | - | 0.1 - 2.6 |
| v1.0+ | v8.5+ | - | 0.1 - 1.1 |

---

**Last Updated**: 2025-11-21
**Official Docs**: https://ui5.github.io/cli/stable/updates/
