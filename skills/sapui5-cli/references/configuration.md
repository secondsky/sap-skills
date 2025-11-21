# UI5 CLI Configuration Complete Reference

**Official Documentation**: https://ui5.github.io/cli/stable/pages/Configuration/
**JSON Schema**: https://ui5.github.io/cli/schema/ui5.yaml.json

This reference provides comprehensive details for ui5.yaml configuration files.

## Table of Contents

1. [Overview](#overview)
2. [Core Structure](#core-structure)
3. [Specification Versions](#specification-versions)
4. [Project Types](#project-types)
5. [Metadata Configuration](#metadata-configuration)
6. [Framework Configuration](#framework-configuration)
7. [Resources Configuration](#resources-configuration)
8. [Builder Configuration](#builder-configuration)
9. [Server Configuration](#server-configuration)
10. [Custom Configuration](#custom-configuration)
11. [Extension Configuration](#extension-configuration)
12. [Version-Specific Features](#version-specific-features)

---

## Overview

Every UI5 CLI project requires a `ui5.yaml` configuration file in the project root. The configuration is validated against the JSON schema for correctness.

**Validation**: Use the official schema for IDE validation and autocompletion.

---

## Core Structure

Every `ui5.yaml` requires these three essential elements:

```yaml
specVersion: "4.0"              # Specification version (required)
type: application               # Project type (required)
metadata:
  name: my.project.name         # Project name (required)
```

---

## Specification Versions

The `specVersion` determines available features and CLI compatibility.

| Version | CLI Requirement | Key Features |
|---------|-----------------|--------------|
| **4.0** | v4.0.0+ | Async require, removed usePredefineCalls |
| 3.2 | v3.11.0+ | depCache bundling mode |
| 3.1 | v3.10.0+ | builder.resources.excludes for modules |
| 3.0 | v3.0.0+ | Lowercase names, optimize defaults to true |
| 2.6 | v2.14.0+ | Minification excludes |
| 2.5 | v2.11.0+ | includeDependency settings |
| 2.0 | v2.0.0+ | SAPUI5 support, schema validation |
| 1.1 | v1.13.0+ | Theme libraries |
| 1.0 | v1.0.0+ | First stable version |
| 0.1 | v0.x | Legacy (automatic migration attempted) |

**Recommendation**: Always use the latest specVersion for new projects.

**Current**: specVersion "4.0" (as of 2025-11-21)

---

## Project Types

UI5 CLI supports four project types:

### Application

Standard UI5 applications.

**Path Mapping**: `webapp/` → `/` (runtime)

**Configuration**:
```yaml
specVersion: "4.0"
type: application
metadata:
  name: my.company.app
resources:
  configuration:
    paths:
      webapp: webapp              # Default
```

**Build Output**: Creates `Component-preload.js` when `Component.js` exists.

---

### Library

Reusable component libraries.

**Path Mappings**:
- `src/` → `/resources` (runtime)
- `test/` → `/test-resources` (runtime)

**Configuration**:
```yaml
specVersion: "4.0"
type: library
metadata:
  name: my.company.library
resources:
  configuration:
    paths:
      src: src                    # Default
      test: test                  # Optional
```

**Requirements**:
- Must contain namespace directory structure (e.g., `src/my/company/library/`)
- Should include `library.js` and `.library` files

---

### Theme Library

Specialized library for UI5 themes.

**Path Mappings**: Same as library (`src/` → `/resources`, `test/` → `/test-resources`)

**Configuration**:
```yaml
specVersion: "4.0"
type: theme-library
metadata:
  name: my.company.themelibrary
resources:
  configuration:
    paths:
      src: src
      test: test
```

**Resource Organization**: `src/my/library/themes/my_custom_theme/`

**Available Since**: Specification Version 1.1

---

### Module

Third-party resources with flexible path mapping.

**Path Mappings**: Custom virtual-to-physical mappings.

**Configuration**:
```yaml
specVersion: "4.0"
type: module
metadata:
  name: thirdparty.module
resources:
  configuration:
    paths:
      /resources/my/lib/thirdparty/: lib
```

**Characteristics**:
- Resources copied without modification
- No preload generation
- Useful for non-UI5 libraries (jQuery, lodash, etc.)

---

## Metadata Configuration

```yaml
metadata:
  name: my.company.project               # Required
  copyright: "© ${currentYear} Company"  # Optional
  deprecated: false                      # Optional (default: false)
```

### Name Requirements

**Format Rules**:
- 3-80 characters
- Lowercase alphanumeric, dashes, underscores, periods
- Must start with alphabetic character or `@`
- Can use npm scope format: `@myorg/myproject`

**Examples**:
```yaml
# Valid
name: my.application
name: my-library
name: my_module
name: "@myorg/mylib"

# Invalid
name: MyApplication                      # Uppercase not allowed (specVersion 3.0+)
name: my                                 # Too short
name: 123project                         # Must start with letter or @
```

### Copyright

**Dynamic Placeholder**: `${currentYear}` automatically updates each year.

**Examples**:
```yaml
copyright: "My Company © ${currentYear}"
copyright: "Copyright ${currentYear} SAP SE"
```

### Deprecated

Mark project as deprecated:
```yaml
deprecated: true
```

---

## Framework Configuration

Configure OpenUI5 or SAPUI5 framework dependencies.

### Basic Structure

```yaml
framework:
  name: SAPUI5                    # OpenUI5 or SAPUI5 (case-insensitive)
  version: "1.120.0"              # Specific version or range
  libraries:
    - name: sap.ui.core
    - name: sap.m
    - name: sap.ui.table
      optional: true              # Optional library
    - name: sap.ui.support
      development: true           # Development-only library
```

### Framework Names

| Name | Min Version | Notes |
|------|-------------|-------|
| **OpenUI5** | 1.52.5 | Open-source variant |
| **SAPUI5** | 1.76.0 | SAP commercial variant |

**Compatibility**: SAPUI5 projects can depend on OpenUI5, but not vice versa.

### Version Formats

```yaml
version: "1.120.0"                # Exact version
version: "1.120"                  # Latest patch of 1.120.x
version: "^1.120.0"               # Semantic versioning range
version: "latest"                 # Latest stable
version: "snapshot"               # Latest snapshot
version: "snapshot-1.120.0"       # Specific snapshot
```

### Library Configuration

**Standard Library**:
```yaml
libraries:
  - name: sap.ui.core
```

**Optional Library** (included only if available):
```yaml
libraries:
  - name: themelib_sap_horizon
    optional: true
```

**Development Library** (excluded from production builds):
```yaml
libraries:
  - name: sap.ui.support
    development: true
  - name: sap.ui.qunit
    development: true
```

### Common Libraries

**OpenUI5 & SAPUI5**:
- `sap.ui.core` - Core framework (always required)
- `sap.m` - Mobile/responsive controls
- `sap.ui.layout` - Layout controls
- `sap.ui.table` - Table controls
- `sap.ui.unified` - Unified controls

**SAPUI5 Only**:
- `sap.ui.comp` - Composite/smart controls
- `sap.ushell` - Fiori Launchpad
- `sap.fe` - Fiori Elements
- `sap.suite.ui.commons` - Suite commons

**Themes**:
- `themelib_sap_fiori_3` - Fiori 3 theme
- `themelib_sap_horizon` - Horizon theme (latest)
- `themelib_sap_belize` - Belize theme
- `themelib_sap_bluecrystal` - Blue Crystal theme (legacy)

---

## Resources Configuration

Configure resource paths and encoding.

### Path Mapping

**Application**:
```yaml
resources:
  configuration:
    paths:
      webapp: webapp                    # Maps to / at runtime
```

**Library**:
```yaml
resources:
  configuration:
    paths:
      src: src                          # Maps to /resources at runtime
      test: test                        # Maps to /test-resources at runtime
```

**Module**:
```yaml
resources:
  configuration:
    paths:
      /resources/thirdparty/lodash/: node_modules/lodash/dist
```

### Properties File Encoding

```yaml
resources:
  configuration:
    propertiesFileSourceEncoding: UTF-8       # Default for specVersion 2.0+
```

**Encoding Options**:
- `UTF-8` (default for specVersion 2.0+)
- `ISO-8859-1` (default for specVersion < 2.0)

**Use Case**: Ensure proper handling of non-ASCII characters in `.properties` files.

---

## Builder Configuration

Configure build behavior, tasks, and optimization.

### Resource Exclusions

Exclude files from build output:

```yaml
builder:
  resources:
    excludes:
      - "index.html"                    # Exclude specific file
      - "/resources/my/app/test/**"     # Exclude directory
      - "**/*.test.js"                  # Exclude pattern
```

**Glob Patterns Supported**: Standard glob syntax with `*`, `**`, `?`

### Component Preload

Configure Component-preload.js generation:

```yaml
builder:
  componentPreload:
    namespaces:
      - "my/app"                        # Include namespace
      - "my/app/reuse"                  # Include sub-namespace
    excludes:
      - "my/app/thirdparty/**"          # Exclude from preload
      - "my/app/localService/**"        # Exclude mock data
```

**When Used**: Only for applications with `Component.js`

### Library Preload

Configure library-preload.js generation:

```yaml
builder:
  libraryPreload:
    excludes:
      - "my/lib/thirdparty/"            # Exclude directory
      - "!my/lib/thirdparty/important.js"  # Exception: include this file
```

**Negation**: Prefix with `!` to include despite parent exclusion

### Minification

Configure JavaScript minification:

```yaml
builder:
  minification:
    excludes:
      - "my/lib/thirdparty/**"          # Don't minify third-party
      - "!my/lib/thirdparty/small.js"   # Exception: minify this
```

**What Happens**:
- `Module.js` → minified
- `Module-dbg.js` → original source (debug variant)
- `Module.js.map` → source map generated

### Cachebuster

Configure cache-busting for resources:

```yaml
builder:
  cachebuster:
    signatureType: hash                 # hash or time
```

**Signature Types**:
- `hash` - Content-based hash (recommended)
- `time` - Timestamp-based

**Result**: Appends signature to resource URLs for cache invalidation

### Custom Bundling

Define custom resource bundles:

```yaml
builder:
  bundles:
    - bundleDefinition:
        name: "app-bundle.js"
        sections:
          - mode: preload
            filters:
              - "my/app/Component.js"
              - "my/app/**/*.js"
            resolve: true
            resolveConditional: true
            renderer: false
      bundleOptions:
        optimize: true
        sourceMap: true
        usePredefineCalls: true         # Deprecated in v4.0
```

**Bundle Modes**:
| Mode | Description |
|------|-------------|
| `raw` | Raw module content |
| `preload` | sap.ui.predefine wrapped |
| `require` | sap.ui.require call |
| `provided` | List of provided modules |
| `bundleInfo` | Bundle metadata |
| `depCache` | Dependency cache (v3.2+) |

**Bundle Options**:
- `optimize: true` - Minify bundle (default: true in v3.0+)
- `sourceMap: true` - Generate source map
- `decorateBootstrapModule: true` - Add bootstrap decoration
- `addTryCatchRestartWrapper: true` - Add error handling

### Custom Tasks

Integrate custom build tasks:

```yaml
builder:
  customTasks:
    - name: babel-transpile
      beforeTask: replaceCopyright      # Execute before this task
      configuration:
        enabled: true
        preset: "@babel/preset-env"

    - name: optimize-images
      afterTask: minify                 # Execute after this task
      configuration:
        quality: 80
```

**Task Ordering**:
- `beforeTask: <taskName>` - Execute before specified task
- `afterTask: <taskName>` - Execute after specified task

**Configuration**: Passed to custom task implementation

**See**: `references/extensibility.md` for custom task development

---

## Server Configuration

Configure development server behavior.

### Port Configuration

```yaml
server:
  settings:
    httpPort: 8080                      # HTTP port (default)
    httpsPort: 8443                     # HTTPS port (default)
```

**CLI Override**:
```bash
ui5 serve --port 3000
ui5 serve --h2 --https-port 4000
```

### Custom Middleware

Extend server with custom middleware:

```yaml
server:
  customMiddleware:
    - name: myCustomMiddleware
      mountPath: /myapp                 # Optional path
      afterMiddleware: compression      # Ordering
      configuration:
        debug: true
        apiKey: "secret"
```

**See**: `references/extensibility.md` for custom middleware development

---

## Custom Configuration

Store custom tool configuration:

```yaml
customConfiguration:
  myTool:
    key: value
    nested:
      setting: 123
```

**Purpose**: Allow third-party tools to store UI5-specific settings

**Ignored by**: UI5 CLI (reserved for external tools)

---

## Extension Configuration

Extensions use `kind: extension` and are separated by `---`.

### Project Shim Extension

```yaml
specVersion: "4.0"
type: application
metadata:
  name: my.app
---
specVersion: "4.0"
kind: extension
type: project-shim
metadata:
  name: my.app.shims
shims:
  configurations:
    lodash:                             # npm package name
      specVersion: "4.0"
      type: module
      metadata:
        name: thirdparty.lodash
      resources:
        configuration:
          paths:
            /resources/thirdparty/lodash/: dist
```

### Custom Task Extension

```yaml
---
specVersion: "4.0"
kind: extension
type: task
metadata:
  name: my-custom-task
task:
  path: lib/tasks/myTask.js
```

### Custom Middleware Extension

```yaml
---
specVersion: "4.0"
kind: extension
type: server-middleware
metadata:
  name: my-custom-middleware
middleware:
  path: lib/middleware/myMiddleware.js
```

**See**: `references/extensibility.md` for detailed extension development

---

## Version-Specific Features

### Version 4.0 (UI5 CLI v4.0.0+)

**Breaking Changes**:
- Removed `usePredefineCalls` bundle option
- Async require sections default to `async: true`

**New Features**:
- Async `require` section support in bundles

**Migration**:
```yaml
# v3.x
builder:
  bundles:
    - bundleDefinition:
        name: "bundle.js"
        sections:
          - mode: require
            filters: ["my/app/**"]
      bundleOptions:
        usePredefineCalls: true         # Remove this

# v4.0
builder:
  bundles:
    - bundleDefinition:
        name: "bundle.js"
        sections:
          - mode: require
            async: true                  # Add this
            filters: ["my/app/**"]
```

### Version 3.2 (UI5 CLI v3.11.0+)

**New Features**:
- `depCache` bundling mode for dependency caching

```yaml
builder:
  bundles:
    - bundleDefinition:
        sections:
          - mode: depCache              # New mode
```

### Version 3.1 (UI5 CLI v3.10.0+)

**New Features**:
- `builder.resources.excludes` now supported for module projects

### Version 3.0 (UI5 CLI v3.0.0+)

**Breaking Changes**:
- `metadata.name` restricted to lowercase characters
- `optimize` defaults to `true` in bundle options

**New Features**:
- `sourceMap` support in bundle options

### Version 2.6 (UI5 CLI v2.14.0+)

**New Features**:
- `builder.minification.excludes` for selective minification

### Version 2.0 (UI5 CLI v2.0.0+)

**Breaking Changes**:
- Schema validation enforced
- Default properties encoding changed to UTF-8

**New Features**:
- SAPUI5 framework support
- Framework configuration section

---

## Complete Example

```yaml
specVersion: "4.0"
type: application
metadata:
  name: my.company.app
  copyright: "© ${currentYear} My Company"
  deprecated: false

framework:
  name: SAPUI5
  version: "1.120.0"
  libraries:
    - name: sap.ui.core
    - name: sap.m
    - name: sap.ui.table
    - name: sap.ui.comp
    - name: themelib_sap_horizon
      optional: true
    - name: sap.ui.qunit
      development: true

resources:
  configuration:
    paths:
      webapp: webapp
    propertiesFileSourceEncoding: UTF-8

builder:
  resources:
    excludes:
      - "index.html"
      - "/resources/my/company/app/test/**"

  componentPreload:
    namespaces:
      - "my/company/app"
    excludes:
      - "my/company/app/thirdparty/**"

  minification:
    excludes:
      - "my/company/app/thirdparty/**"

  cachebuster:
    signatureType: hash

  customTasks:
    - name: babel-transpile
      beforeTask: replaceCopyright
      configuration:
        presets: ["@babel/preset-env"]

server:
  settings:
    httpPort: 8080
    httpsPort: 8443

  customMiddleware:
    - name: api-proxy
      afterMiddleware: compression
      configuration:
        target: https://api.example.com
```

---

## Best Practices

1. **Always use latest specVersion** for new projects
2. **Pin framework versions** for production stability
3. **Mark optional libraries** as `optional: true`
4. **Mark dev libraries** as `development: true`
5. **Use hash-based cachebuster** for better caching
6. **Exclude test resources** from production builds
7. **Validate against JSON schema** in IDE
8. **Document custom configuration** in project README
9. **Use lowercase names** for metadata (required in v3.0+)
10. **Commit ui5.yaml** to version control

---

**Last Updated**: 2025-11-21 (UI5 CLI v4.0.0)
**Official Docs**: https://ui5.github.io/cli/stable/pages/Configuration/
**JSON Schema**: https://ui5.github.io/cli/schema/ui5.yaml.json
