# UI5 MCP Server Integration Guide

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Available Tools](#available-tools)
5. [Tool Usage Examples](#tool-usage-examples)
6. [Integration with Agents](#integration-with-agents)
7. [Integration with Commands](#integration-with-commands)
8. [Fallback Behavior](#fallback-behavior)
9. [Troubleshooting](#troubleshooting)
10. [Version Compatibility](#version-compatibility)

---

## Overview

The **@ui5/mcp-server** is the official Model Context Protocol (MCP) server from SAP that provides AI agents with comprehensive UI5 development tools and knowledge.

### What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI assistants to connect with external tools and data sources. It allows Claude Code to:

- Access live UI5 API documentation
- Scaffold new projects with official templates
- Run linting and code quality checks
- Get version-specific guidance and migration help

### Key Features

- **9 Live Development Tools**: Scaffolding, linting, API reference, guidelines, version info
- **Version-Aware**: Automatically uses your project's UI5 version for accurate information
- **Official SAP Package**: Maintained by the UI5 team, always up-to-date
- **TypeScript Support**: Full TypeScript scaffolding and conversion guidance
- **CAP Integration**: Direct support for CAP backend integration
- **Integration Cards**: Dedicated tools for Integration Cards development

### Plugin Integration

This sapui5 plugin integrates the MCP server with:
- **4 specialized agents** that use MCP tools
- **5 slash commands** for quick access
- **Graceful fallback** to reference files when MCP unavailable
- **User settings** for customization

---

## Installation

### Prerequisites

- Node.js v20.17.0, v22.9.0 or higher
- npm v8.0.0 or higher
- An MCP-compatible client (Claude Code CLI, VS Code, Cline, etc.)

### Method 1: Automatic (Recommended)

The sapui5 plugin automatically configures the MCP server via `.mcp.json`. No manual installation needed!

When you invoke an agent or command that requires MCP tools, the server will be automatically started via:

```bash
npx -y @ui5/mcp-server
```

### Method 2: Manual Installation

To test the MCP server independently:

```bash
# Install globally
npm install -g @ui5/mcp-server

# Or use npx (no installation)
npx @ui5/mcp-server
```

### Verification

Check that the server is accessible:

```bash
npx @ui5/mcp-server --help
```

---

## Configuration

### Plugin Configuration

The sapui5 plugin includes `.mcp.json` at the plugin root:

```json
{
  "ui5-tooling": {
    "command": "npx",
    "args": ["-y", "@ui5/mcp-server"],
    "env": {
      "UI5_MCP_SERVER_RESPONSE_NO_RESOURCES": "true"
    }
  }
}
```

### Cross-Platform Note

The MCP config uses `npx` directly, which works on macOS and Linux. On **native Windows** (non-WSL), `npx` may fail to spawn because it is a `.cmd` batch file. If the MCP server fails to start on Windows, manually override `.mcp.json` to use `cmd /c npx`:

```json
{
  "ui5-tooling": {
    "command": "cmd",
    "args": ["/c", "npx", "-y", "@ui5/mcp-server"],
    "env": {
      "UI5_MCP_SERVER_RESPONSE_NO_RESOURCES": "true"
    }
  }
}
```

This decision trades automatic Windows compatibility for a config that works correctly on macOS and Linux without platform-specific branching (`.mcp.json` does not support platform conditionals).

### Environment Variables

The `@ui5/mcp-server` recognizes the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `UI5_MCP_SERVER_RESPONSE_NO_RESOURCES` | — | Disable resources for client compatibility |
| `UI5_MCP_SERVER_ALLOWED_DOMAINS` | — | Comma-separated list of allowed domains |
| `UI5_MCP_SERVER_CDN_URL` | — | Custom CDN URL for UI5 resources |
| `UI5_LOG_LVL` | `info` | Log level: silent, error, warn, info, perf, verbose, silly |
| `UI5_DATA_DIR` | `~/.ui5` | Directory for cached data (API references) |

Project discovery happens via a `path` parameter on each tool call (e.g., `get_project_info`), not via an environment variable. UI5 version is detected automatically from the project's `manifest.json`.

### User Settings Integration

Users can override defaults in `sapui5.local.md`:

```yaml
---
ui5_version: "1.128.0"
ui5_theme: "sap_horizon"
mcp_timeout: 30
---
```

Agents read these settings and pass them to MCP tools.

---

## Available Tools

The UI5 MCP server provides 9 tools organized into 3 categories:

### Scaffolding Tools (2)

#### 1. create_ui5_app

Scaffold new UI5 applications with templates.

**Templates**:
- **Freestyle JavaScript**: Basic MVC application
- **Freestyle TypeScript**: TypeScript-based MVC application
- **Fiori Elements**: List Report, Object Page, Analytical List Page, Overview Page, Worklist
- **CAP Integration**: Integrated with CAP backend

**Parameters**:
- `projectName` (required): Project name
- `namespace` (required): Application namespace (e.g., `com.mycompany`)
- `template` (required): Template type
- `language`: `javascript` or `typescript`
- `capBackend`: Boolean, integrate with CAP
- `oDataV4Url`: OData service URL (CAP projects)

**Example Use Case**:
```
Create a TypeScript Fiori Elements List Report app with CAP backend
→ Agent invokes: create_ui5_app(projectName="my-app", template="fiori-elements-list-report", language="typescript", capBackend=true)
```

#### 2. create_integration_card

Scaffold Integration Cards.

**Card Types**:
- List Card: Display lists of items
- Table Card: Tabular data
- Timeline Card: Chronological events
- Object Card: Single object details
- Analytical Card: Charts and analytics

**Parameters**:
- `cardName` (required): Card name
- `cardType` (required): Card type
- `namespace`: Card namespace

---

### Code Analysis Tools (2)

#### 3. run_ui5_linter

Lint UI5 code for best practices and deprecations.

**Features**:
- Static code analysis
- Deprecation warnings
- Best practice violations
- Auto-fix capabilities

**Parameters**:
- `projectPath`: Path to UI5 project
- `fix`: Boolean, apply auto-fixes
- `files`: Specific files to lint (optional)

**Output**:
- List of issues grouped by severity (error, warning, info)
- Auto-fix summary
- Migration recommendations for deprecated APIs

**Example Use Case**:
```
Check controller for deprecated APIs and apply fixes
→ Agent invokes: run_ui5_linter(projectPath=".", fix=true, files=["webapp/controller/Main.controller.js"])
```

#### 4. get_project_info

Extract project metadata and configuration.

**Extracted Information**:
- UI5 version from `manifest.json`
- Framework libraries in use
- Build configuration from `ui5.yaml`
- Dependency tree
- OData service bindings

**Parameters**:
- `projectPath`: Path to UI5 project

**Example Use Case**:
```
Determine current UI5 version before suggesting upgrade
→ Agent invokes: get_project_info(projectPath=".")
→ Returns: { ui5Version: "1.108.0", libraries: ["sap.m", "sap.ui.layout"], ... }
```

---

### Reference & Guidance Tools (5)

#### 5. get_api_reference

Search UI5 API documentation (version-aware).

**Features**:
- Control lookup by name (e.g., `sap.m.Table`)
- Method signatures with parameters and return types
- Event documentation
- Property details
- Aggregation information
- Inheritance chains
- Code examples

**Parameters**:
- `control`: Control name (e.g., `sap.m.Button`)
- `method`: Optional specific method or property
- `version`: UI5 version (defaults to project version)

**Example Use Case**:
```
How to use press event on sap.m.Button?
→ Agent invokes: get_api_reference(control="sap.m.Button", method="press", version="1.120.0")
→ Returns: Event signature, parameters, usage example
```

#### 6. get_guidelines

Retrieve UI5 best practice guidelines.

**Topics Covered**:
- Architecture patterns (MVC, Component-based)
- Performance optimization (lazy loading, bundling)
- Security (XSS prevention, CSP compliance)
- Accessibility (WCAG 2.1 AA)
- Testing strategies (QUnit, OPA5)
- Code style and conventions

**Parameters**:
- `topic`: Optional topic filter

**Example Use Case**:
```
What are UI5 performance best practices?
→ Agent invokes: get_guidelines(topic="performance")
→ Returns: Component preload, lazy loading, virtualization guidelines
```

#### 7. get_version_info

Get UI5 version information and support status.

**Information Provided**:
- Release date
- Support status (Active, Maintenance, Out of support)
- Breaking changes from previous versions
- Migration paths
- New features
- Deprecations introduced
- Recommended upgrade path

**Parameters**:
- `version`: UI5 version (e.g., `1.120.0`)

**Example Use Case**:
```
Is UI5 1.84 still supported? What's the upgrade path?
→ Agent invokes: get_version_info(version="1.84.0")
→ Returns: Out of support, upgrade to 1.108 → 1.120 recommended
```

#### 8. get_typescript_conversion_guidelines

TypeScript migration guidance.

**Conversion Topics**:
- Setup and configuration
- Type definitions (`@types/openui5`, `@ui5/ts-interface-generator`)
- Migration steps (file-by-file conversion)
- Common pitfalls and solutions
- Control definition conversion
- Event handler typing
- Model typing

**Parameters**:
- `topic`: Optional specific topic

**Example Use Case**:
```
How to convert a UI5 controller to TypeScript?
→ Agent invokes: get_typescript_conversion_guidelines(topic="controller-conversion")
→ Returns: Step-by-step guide with code examples
```

#### 9. get_integration_cards_guidelines

Integration Cards best practices.

**Topics**:
- Card types and use cases
- Manifest configuration
- Data binding
- Actions and navigation
- Card parameters
- Deployment

**Parameters**:
- `topic`: Optional topic filter

**Example Use Case**:
```
How to add actions to a List Card?
→ Agent invokes: get_integration_cards_guidelines(topic="actions")
→ Returns: Action configuration, navigation, event handling
```

---

## Tool Usage Examples

### Example 1: Scaffolding a TypeScript App

**User Request**: "Create a TypeScript UI5 app"

**Agent Workflow**:
1. Read user settings for defaults
2. Ask user: Fiori Elements or Freestyle?
3. Invoke MCP tool:

```javascript
create_ui5_app({
  projectName: "my-typescript-app",
  namespace: "com.mycompany.app",
  template: "freestyle-typescript",
  language: "typescript",
  capBackend: false
})
```

4. Customize manifest.json
5. Show next steps (npm install, ui5 serve)

### Example 2: API Reference Lookup

**User Request**: "How do I use sap.m.Table aggregations?"

**Agent Workflow**:
1. Parse control: `sap.m.Table`
2. Detect project version: 1.120.0
3. Invoke MCP tool:

```javascript
get_api_reference({
  control: "sap.m.Table",
  method: "items",  // aggregation
  version: "1.120.0"
})
```

4. Format response with:
   - Aggregation type: `sap.m.ColumnListItem`
   - Cardinality: `[0..n]`
   - Usage example

### Example 3: Code Quality Check

**User Request**: "Review my controller code"

**Agent Workflow**:
1. Identify controller file
2. Invoke MCP tool:

```javascript
run_ui5_linter({
  projectPath: ".",
  fix: false,
  files: ["webapp/controller/Main.controller.js"]
})
```

3. Parse results:
   - 3 errors (deprecated APIs)
   - 5 warnings (performance issues)
   - 2 info (style suggestions)

4. Ask user: Apply auto-fixes?
5. If yes, invoke again with `fix: true`

### Example 4: Version Upgrade Planning

**User Request**: "Upgrade from UI5 1.84 to 1.120"

**Agent Workflow**:
1. Get current version info:

```javascript
get_version_info({ version: "1.84.0" })
```

2. Get target version info:

```javascript
get_version_info({ version: "1.120.0" })
```

3. Identify breaking changes
4. Create phased plan: 1.84 → 1.108 → 1.120
5. For each phase:
   - List breaking changes
   - Run linter
   - Apply fixes
   - Test

---

## Integration with Agents

All 4 sapui5 plugin agents use MCP tools with graceful fallback.

### ui5-app-scaffolder Agent

**MCP Tools Used**:
- `create_ui5_app` (primary)
- `create_integration_card`
- `get_project_info` (validation)

**Fallback Strategy**:
- Use templates from `templates/` directory
- Manual manifest.json generation

### ui5-api-explorer Agent

**MCP Tools Used**:
- `get_api_reference` (primary)
- `get_version_info`

**Fallback Strategy**:
- Search reference files (`references/`)
- WebFetch to ui5.sap.com

### ui5-code-quality-advisor Agent

**MCP Tools Used**:
- `run_ui5_linter` (primary)
- `get_guidelines`
- `get_version_info`

**Fallback Strategy**:
- Manual code review using references/
- Pattern matching for common issues

### ui5-migration-specialist Agent

**MCP Tools Used**:
- `get_version_info` (primary)
- `get_typescript_conversion_guidelines`
- `run_ui5_linter`
- `get_api_reference`

**Fallback Strategy**:
- Use `references/migration-patterns.md`
- Use `references/typescript-support.md`

---

## Integration with Commands

Commands invoke agents, which use MCP tools.

### /ui5-api

Invokes **ui5-api-explorer** agent with MCP `get_api_reference`

### /ui5-scaffold

Invokes **ui5-app-scaffolder** agent with MCP `create_ui5_app`

### /ui5-lint

Invokes **ui5-code-quality-advisor** agent with MCP `run_ui5_linter`

### /ui5-version

Uses MCP `get_version_info` or detects from project

### /ui5-mcp-tools

Lists all 9 MCP tools (no MCP invocation, informational only)

---

## Fallback Behavior

### When MCP is Unavailable

Agents detect MCP availability and fall back gracefully:

```
1. Try MCP tool invocation
2. If timeout or error:
   a. Log: "MCP unavailable, using reference files..."
   b. Use reference files:
      - references/core-architecture.md
      - references/data-binding-models.md
      - references/fiori-elements.md
      - references/typescript-support.md
      - references/routing-navigation.md
      - references/performance-optimization.md
      - references/accessibility.md
      - references/security.md
      - references/testing.md
      - references/mdc-typescript-advanced.md
      - references/glossary.md
   c. Use templates/ directory for scaffolding
   d. Use WebFetch for API lookups
3. Inform user: "MCP tools unavailable, using offline references"
```

### MCP Timeout Configuration

Default timeout: 30 seconds (configurable in `sapui5.local.md`)

```yaml
---
mcp_timeout: 30  # seconds
---
```

### Partial MCP Failures

If specific tools fail but MCP server is running:
- Try alternative tools
- Combine MCP + reference files
- Warn user about degraded functionality

---

## Troubleshooting

### Issue: MCP server not starting

**Symptoms**: Agents always fall back to reference files

**Solutions**:
1. Check Node.js version: `node --version` (need v20.17+)
2. Check npm: `npm --version` (need v8.0+)
3. Test manual start: `npx @ui5/mcp-server`
4. Check Claude Code logs for MCP errors

### Issue: "EACCES: permission denied" errors

**Solution**: Use npx (automatic) instead of global install

### Issue: MCP tools return wrong version information

**Cause**: UI5 version not detected correctly from the project

**Solution**:
1. Verify project `manifest.json` has correct `minUI5Version`
2. Pass the `path` parameter to MCP tools to ensure correct project context
3. Override in `sapui5.local.md`:

```yaml
---
ui5_version: "1.120.0"  # Your version
---
```

### Issue: Slow MCP responses

**Cause**: First invocation downloads API cache

**Solution**:
- Subsequent calls are faster (cached)
- Increase timeout in settings: `mcp_timeout: 60`

### Issue: "Resource not found" errors

**Cause**: `UI5_MCP_SERVER_RESPONSE_NO_RESOURCES` not set

**Solution**: Already set in `.mcp.json`, but verify:

```json
{
  "env": {
    "UI5_MCP_SERVER_RESPONSE_NO_RESOURCES": "true"
  }
}
```

### Issue: OData domain blocked

**Symptom**: Cannot scaffold app with OData URL

**Solution**: Add domain to allowed list:

```json
{
  "env": {
    "UI5_MCP_SERVER_ALLOWED_ODATA_DOMAINS": "localhost, services.odata.org, mycompany.com"
  }
}
```

### Issue: Linter fails with "No ui5.yaml found"

**Cause**: Not in a valid UI5 project

**Solution**: Run linter from project root or specify path:

```bash
run_ui5_linter({ projectPath: "/path/to/project" })
```

---

## Version Compatibility

### @ui5/mcp-server Versions

| MCP Server | Release Date | UI5 Support | Status |
|------------|--------------|-------------|--------|
| v0.2.0 | 2025-12-12 | 1.84.0+ | **Current** |
| v0.1.0 | 2025-09-03 | 1.84.0+ | Deprecated |

**Recommended**: Use latest (v0.2.0)

### UI5 Framework Versions

MCP server supports UI5 versions:
- 1.84.0+ (Active support)
- 1.108.0+ (Maintenance)
- 1.120.0+ (Latest)
- Future versions (forward compatible)

**Note**: Older versions (< 1.84) may have limited API documentation

### Plugin Compatibility

| Plugin Version | MCP Server | Breaking Changes |
|----------------|------------|------------------|
| v3.0.0 | v0.2.0 | Initial MCP integration |
| v2.1.0 | N/A | No MCP (reference files only) |

---

## Best Practices

### 1. Version Alignment

Always align `UI5_VERSION` with your project's actual version:

```json
// manifest.json
{
  "sap.ui5": {
    "dependencies": {
      "minUI5Version": "1.120.0"
    }
  }
}
```

```json
// .mcp.json
{
  "env": {
    "UI5_VERSION": "1.120.0"  // Match manifest
  }
}
```

### 2. Graceful Degradation

Always design agents to work without MCP:
- Try MCP first
- Fall back to reference files
- Inform user of degraded mode

### 3. Timeout Configuration

Set appropriate timeouts based on network:
- Fast network: 15s
- Normal network: 30s (default)
- Slow network: 60s

### 4. Caching

MCP server caches API references in `~/.ui5`:
- First call: Slow (downloads)
- Subsequent calls: Fast (cached)
- Cache invalidation: Automatic on version change

### 5. Error Handling

Handle MCP errors gracefully:

```
Try:
  result = invoke_mcp_tool(...)
Catch timeout:
  log("MCP timeout, using fallback")
  result = use_reference_files(...)
Catch error:
  log("MCP error: {error}")
  result = use_reference_files(...)
```

---

## Additional Resources

### Official Documentation

- **MCP Server GitHub**: https://github.com/UI5/mcp-server
- **MCP Server npm**: https://www.npmjs.com/package/@ui5/mcp-server
- **Announcement Blog**: https://community.sap.com/t5/technology-blog-posts-by-sap/give-your-ai-agent-some-tools-introducing-the-ui5-mcp-server/ba-p/14200825
- **Model Context Protocol**: https://modelcontextprotocol.io/

### Plugin Resources

- **Agent Documentation**: See individual agent files in `agents/`
- **Command Reference**: See `commands/` directory
- **Fallback References**: All files in `references/` directory

### Support

- **GitHub Issues**: Report MCP server issues at https://github.com/UI5/mcp-server/issues
- **UI5 Slack**: #tooling channel in OpenUI5 Slack
- **Plugin Issues**: Report at sap-skills repository

---

**Last Updated**: 2025-12-28
**MCP Server Version**: 0.2.0
**Plugin Version**: 3.0.0
