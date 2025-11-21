# UI5 CLI Commands Complete Reference

**Official Documentation**: https://ui5.github.io/cli/stable/pages/CLI/

This reference provides comprehensive details for all UI5 CLI commands, options, and usage patterns.

## Table of Contents

1. [Installation & Requirements](#installation--requirements)
2. [Global Command Options](#global-command-options)
3. [Core Commands](#core-commands)
4. [Development Commands](#development-commands)
5. [Build Commands](#build-commands)
6. [Configuration Commands](#configuration-commands)
7. [Utility Commands](#utility-commands)
8. [Command Precedence](#command-precedence)

---

## Installation & Requirements

### System Requirements
- **Node.js**: v20.11.0+ or v22.0.0+ (v21 NOT supported)
- **npm**: v8.0.0 or higher

### Installation Methods

**Global Installation** (recommended for most users):
```bash
npm install --global @ui5/cli
```

**Local Project Installation** (recommended for teams):
```bash
npm install --save-dev @ui5/cli
```

**Verification**:
```bash
ui5 --help
ui5 --version
```

### Installation Precedence

When both global and local installations exist, **the local version takes precedence automatically**.

**Override to use global**:
```bash
UI5_CLI_NO_LOCAL=X ui5 serve
```

---

## Global Command Options

These options work with ALL ui5 commands:

```
ui5 <command> [options]
```

| Option | Description |
|--------|-------------|
| `-h, --help` | Display help for command |
| `-v, --version` | Show version number |
| `-c, --config <path>` | Path to YAML project configuration file |
| `--dependency-definition <path>` | Path to static YAML dependency tree (disables npm resolution) |
| `--workspace-config <path>` | Path to workspace configuration file |
| `-w, --workspace <name>` | Workspace name (default: "default") |
| `--loglevel <level>` | Set logging level: silent\|error\|warn\|info\|perf\|verbose\|silly |
| `--verbose` | Enable verbose logging (shorthand for --loglevel verbose) |
| `--perf` | Enable performance measurements |
| `--silent` | Disable all logging |

**Environment Variable Alternative**:
```bash
UI5_LOG_LVL=verbose ui5 build
```

---

## Core Commands

### ui5 init

Initialize UI5 CLI configuration for a project.

**Usage**:
```bash
ui5 init
```

**What it does**:
- Creates `ui5.yaml` configuration file
- Detects project type (application/library)
- Sets up basic project metadata

**Example**:
```bash
cd my-project
ui5 init
# Creates ui5.yaml with detected configuration
```

---

### ui5 use

Configure framework name and version.

**Usage**:
```bash
ui5 use <framework-info>
```

**Framework-info format**: `[name][@version]`

**Framework names** (case-insensitive):
- `sapui5`
- `openui5`

**Version formats**:
- `latest` - Latest stable version
- `1.120.0` - Specific version
- `1.120` - Latest patch of 1.120.x
- `^1.120.0` - Semantic version range
- `snapshot` - Latest snapshot version
- `snapshot-1.120.0` - Specific snapshot version

**Examples**:
```bash
# SAPUI5
ui5 use sapui5@latest
ui5 use sapui5@1.120.0
ui5 use sapui5@^1.120.0
ui5 use sapui5                    # Uses latest

# OpenUI5
ui5 use openui5@latest
ui5 use openui5@1.120
ui5 use openui5

# Just version (keeps current framework)
ui5 use latest
ui5 use 1.120.0
```

---

### ui5 add

Add framework libraries to project configuration.

**Usage**:
```bash
ui5 add [--development] [--optional] <framework-libraries..>
```

**Options**:
| Option | Alias | Description |
|--------|-------|-------------|
| `--development` | `-D` | Add as development dependency |
| `--optional` | `-O` | Add as optional dependency |

**Examples**:
```bash
# Add standard libraries
ui5 add sap.ui.core sap.m sap.ui.table

# Add development library
ui5 add --development sap.ui.support

# Add optional theme
ui5 add --optional themelib_sap_fiori_3

# Combined
ui5 add sap.ui.core sap.m -D sap.ui.qunit -O themelib_sap_belize
```

**Common Libraries**:
- `sap.ui.core` - Core framework
- `sap.m` - Mobile controls
- `sap.ui.table` - Table controls
- `sap.ui.comp` - Composite controls (SAPUI5 only)
- `sap.ushell` - Fiori Launchpad (SAPUI5 only)
- `themelib_sap_fiori_3` - Fiori 3 theme
- `themelib_sap_horizon` - Horizon theme

---

### ui5 remove

Remove framework libraries from project configuration.

**Usage**:
```bash
ui5 remove <framework-libraries..>
```

**Examples**:
```bash
ui5 remove sap.ui.table
ui5 remove sap.ui.comp sap.ushell
```

---

## Development Commands

### ui5 serve

Start local development web server.

**Usage**:
```bash
ui5 serve [options]
```

**Options**:
| Option | Description | Default |
|--------|-------------|---------|
| `-p, --port <number>` | HTTP port | 8080 |
| `--https-port <number>` | HTTPS port (when using --h2) | 8443 |
| `-o, --open <path>` | Open browser to specified path | - |
| `--h2` | Enable HTTP/2 protocol (auto-enables HTTPS) | false |
| `--simple-index` | Use simplified directory listing | false |
| `--accept-remote-connections` | Accept connections from non-localhost | false |
| `--sap-csp-policies` | Send SAP CSP headers (sap-target-level-1/3) | false |
| `--serve-csp-reports` | Collect CSP policy violations at `/.ui5/csp/csp-reports.json` | false |

**Standard Options**: Also accepts all [global options](#global-command-options)

**Examples**:
```bash
# Basic development server
ui5 serve

# Custom port
ui5 serve --port 1337

# Open browser automatically
ui5 serve --open index.html

# Enable HTTP/2 with HTTPS
ui5 serve --h2

# Combined options
ui5 serve --port 3000 --open test/integration/opaTests.qunit.html --h2

# Accept remote connections (useful for testing on mobile devices)
ui5 serve --accept-remote-connections

# Enable CSP policies for testing
ui5 serve --sap-csp-policies --serve-csp-reports

# Verbose logging for debugging
ui5 serve --verbose
```

**Server URLs**:
- HTTP: `http://localhost:8080` (or custom port)
- HTTPS: `https://localhost:8443` (when using --h2)

**SSL Certificates**:
When using `--h2`, UI5 CLI automatically generates self-signed SSL certificates stored in `~/.ui5/server/`. You may need to trust these certificates in your browser.

---

### ui5 tree

Display project dependency tree.

**Usage**:
```bash
ui5 tree [options]
```

**Options**:
| Option | Description |
|--------|-------------|
| `--flat` | Show flat list instead of tree hierarchy |
| `--level <number>` | Limit tree depth to specified level |

**Examples**:
```bash
# Show full dependency tree
ui5 tree

# Show flat list of all dependencies
ui5 tree --flat

# Limit to 2 levels deep
ui5 tree --level 2

# Flat list with custom workspace
ui5 tree --flat --workspace extended
```

**Sample Output**:
```
├─ my.application.name
│  ├─ sap.ui.core (OpenUI5 Runtime 1.120.0)
│  ├─ sap.m (OpenUI5 Runtime 1.120.0)
│  └─ my.reuse.library
│     ├─ sap.ui.core (OpenUI5 Runtime 1.120.0)
│     └─ sap.ui.layout (OpenUI5 Runtime 1.120.0)
```

---

## Build Commands

### ui5 build

Build project and create optimized bundles.

**Usage**:
```bash
ui5 build [child-command] [options]
```

**Child Commands**:
| Command | Description |
|---------|-------------|
| `preload` | Create preload bundles (default) |
| `self-contained` | Create self-contained bundle with embedded framework |
| `jsdoc` | Generate JSDoc documentation |

**Dependency Options**:
| Option | Description |
|--------|-------------|
| `-a, --include-all-dependencies` | Include all project dependencies in build |
| `--include-dependency <names>` | Include specific dependencies (comma-separated, supports wildcards) |
| `--exclude-dependency <names>` | Exclude specific dependencies (comma-separated, supports wildcards) |

**Output Options**:
| Option | Description | Default |
|--------|-------------|---------|
| `--dest <path>` | Output directory | `./dist` |
| `--clean-dest` | Clean destination directory before build | false |
| `--output-style <style>` | Directory structure: Default\|Flat\|Namespace | Default |

**Build Options**:
| Option | Description |
|--------|-------------|
| `--create-build-manifest` | Store build metadata for potential reuse |
| `--experimental-css-variables` | Generate CSS variable artifacts (experimental) |
| `--framework-version <version>` | Override framework version for self-contained build |

**Task Control**:
| Option | Description |
|--------|-------------|
| `--exclude-task <tasks>` | Exclude specific build tasks (comma-separated or '*' for all) |
| `--include-task <tasks>` | Include previously excluded tasks (comma-separated) |

**Standard Options**: Also accepts all [global options](#global-command-options)

**Examples**:

```bash
# Standard build (no dependencies)
ui5 build

# Build with all dependencies
ui5 build --all

# Build with clean destination
ui5 build --clean-dest --all

# Build to custom directory
ui5 build --dest ./build --all

# Build only specific dependencies
ui5 build --include-dependency my.reuse.library,another.library

# Build excluding certain dependencies
ui5 build --exclude-dependency sap.ui.documentation

# Build with wildcard dependency inclusion
ui5 build --include-dependency "my.company.*"

# Self-contained build (standalone bundle)
ui5 build self-contained --all

# JSDoc generation
ui5 build jsdoc

# Exclude all tasks except specific ones
ui5 build --exclude-task=* --include-task=minify,generateComponentPreload

# Experimental CSS variables
ui5 build --experimental-css-variables --all

# Flat output structure
ui5 build --output-style Flat --all

# Namespace output structure
ui5 build --output-style Namespace --all

# Combined: clean build with all dependencies and verbose logging
ui5 build --clean-dest --all --verbose
```

**Build Output Structure**:

**Default Style** (varies by project type):
```
dist/
├── resources/
│   └── my/app/
│       ├── Component.js
│       ├── Component-preload.js
│       └── manifest.json
└── index.html
```

**Flat Style**:
```
dist/
├── Component.js
├── Component-preload.js
├── manifest.json
└── index.html
```

**Namespace Style**:
```
dist/
└── my/app/
    ├── Component.js
    ├── Component-preload.js
    ├── manifest.json
    └── index.html
```

---

## Configuration Commands

### ui5 config

Manage UI5 CLI configuration settings.

**Usage**:
```bash
ui5 config <subcommand> [key] [value]
```

**Subcommands**:
| Subcommand | Description |
|------------|-------------|
| `set <key> [value]` | Set configuration value (omit value to clear) |
| `get <key>` | Retrieve configuration value |
| `list` | Display all configuration settings |

**Available Configuration Keys**:
| Key | Description | Default |
|-----|-------------|---------|
| `ui5DataDir` | UI5 data directory for caching framework versions | `~/.ui5` |

**Examples**:
```bash
# List all settings
ui5 config list

# Get specific setting
ui5 config get ui5DataDir

# Set custom data directory
ui5 config set ui5DataDir /custom/path/.ui5

# Clear setting (revert to default)
ui5 config set ui5DataDir
```

**Temporary Override**:
```bash
UI5_DATA_DIR=/custom/path/.ui5 ui5 build
```

---

## Utility Commands

### ui5 versions

Display all UI5 CLI module versions currently in use.

**Usage**:
```bash
ui5 versions
```

**Sample Output**:
```
@ui5/cli: 4.0.0
@ui5/builder: 4.0.0
@ui5/server: 4.0.0
@ui5/project: 4.0.0
@ui5/fs: 4.0.0
@ui5/logger: 4.0.0
```

**Use Case**: Verify installed versions when reporting issues or ensuring compatibility.

---

## Command Precedence

### Local vs Global CLI

When both installations exist:
1. **Local installation** (project's `node_modules/.bin/ui5`) takes precedence by default
2. **Global installation** (`/usr/local/bin/ui5` or similar) is used as fallback

**Force Global Usage**:
```bash
UI5_CLI_NO_LOCAL=X ui5 <command>
```

### Configuration File Resolution

1. `--config <path>` option (highest priority)
2. `ui5.yaml` in current directory
3. `ui5.yaml` in parent directories (walks up tree)
4. Error if no configuration found

### Workspace Resolution

1. `--workspace <name>` option
2. Workspace named "default" in `ui5-workspace.yaml`
3. No workspace (standard dependency resolution)

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Configuration error |

---

## Best Practices

1. **Use local installation** for project consistency
2. **Commit package.json** to ensure team uses same version
3. **Use `--all` for production builds** to include dependencies
4. **Use `--clean-dest`** for production builds to avoid stale files
5. **Use `--verbose`** when debugging build issues
6. **Use workspaces** for monorepo setups instead of npm linking
7. **Pin framework versions** in production (avoid `latest`)
8. **Use `ui5 serve` for development**, not `ui5 build`
9. **Test with `--h2`** to simulate HTTP/2 production environment
10. **Use `ui5 tree`** to verify dependency resolution

---

**Last Updated**: 2025-11-21 (UI5 CLI v4.0.0)
**Official Docs**: https://ui5.github.io/cli/stable/pages/CLI/
