# UI5 CLI Extensibility Complete Reference

**Official Documentation**:
- Custom Tasks: https://ui5.github.io/cli/stable/pages/extensibility/CustomTasks/
- Custom Middleware: https://ui5.github.io/cli/stable/pages/extensibility/CustomServerMiddleware/
- Project Shims: https://ui5.github.io/cli/stable/pages/extensibility/ProjectShims/

This reference covers all extensibility features: custom tasks, custom middleware, and project shims.

## Table of Contents

1. [Custom Build Tasks](#custom-build-tasks)
2. [Custom Server Middleware](#custom-server-middleware)
3. [Project Shims](#project-shims)
4. [Best Practices](#best-practices)

---

## Custom Build Tasks

Custom tasks extend the UI5 build process beyond standard capabilities.

### Overview

- **Purpose**: Add custom processing steps to build pipeline
- **Use Cases**: Transpilation, image optimization, file generation, validation
- **Distribution**: npm packages (prefix: `ui5-task-*` for discoverability)
- **API**: Node.js JavaScript with async/await

### Task API Signature

```javascript
export default async function({dependencies, log, options, taskUtil, workspace}) {
    // Task implementation
}
```

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `dependencies` | Reader | Access dependency resources (if declared) |
| `log` | Logger | Logger instance (v3.0+) |
| `options` | Object | Contains projectName, projectNamespace, configuration, taskName |
| `taskUtil` | TaskUtil | Helper methods (v2.2+) |
| `workspace` | DuplexCollection | Read/write project resources |

### Project Configuration

Define tasks in `ui5.yaml`:

```yaml
specVersion: "4.0"
type: application
metadata:
  name: my.app

builder:
  customTasks:
    - name: babel-transpile               # Task name (must match extension)
      beforeTask: generateComponentPreload # Execute before this task
      configuration:                      # Custom configuration (optional)
        presets: ["@babel/preset-env"]
        targets: "> 0.25%, not dead"

    - name: optimize-images
      afterTask: minify                   # Execute after this task
      configuration:
        quality: 80
        formats: ["webp", "avif"]
```

**Task Ordering**:
- `beforeTask: <taskName>` - Execute before specified built-in or custom task
- `afterTask: <taskName>` - Execute after specified task

**Built-in Task Names**: See section [Standard Build Tasks](#standard-build-tasks) below.

### Task Extension Structure

**Inline Extension** (in project ui5.yaml):
```yaml
---
specVersion: "4.0"
kind: extension
type: task
metadata:
  name: babel-transpile
task:
  path: lib/tasks/babel.js            # Relative to ui5.yaml
```

**Standalone npm Module**:
```yaml
# In ui5-task-babel/ui5.yaml
specVersion: "4.0"
kind: extension
type: task
metadata:
  name: ui5-task-babel
task:
  path: lib/babel.js
```

**Installation**:
```bash
npm install --save-dev ui5-task-babel
```

### Task Implementation

**Basic Example** (Markdown to HTML):
```javascript
import MarkdownIt from "markdown-it";

export default async function({workspace, options, taskUtil, log}) {
    const md = new MarkdownIt();
    const {resourceFactory} = taskUtil;

    // Read all markdown files
    const markdownResources = await workspace.byGlob("**/*.md");

    for (const resource of markdownResources) {
        const markdown = await resource.getString();
        const html = md.render(markdown);

        // Create new HTML resource using resourceFactory
        const htmlPath = resource.getPath().replace(".md", ".html");
        const htmlResource = resourceFactory.createResource({
            path: htmlPath,
            string: html
        });

        await workspace.write(htmlResource);

        log.info(`Converted ${resource.getPath()} to ${htmlPath}`);
    }
}
```

**Advanced Example** (Using dependencies and TaskUtil):
```javascript
export default async function({dependencies, workspace, taskUtil, log}) {
    const {resourceFactory} = taskUtil;

    // Access dependency project
    const depProject = await taskUtil.getProject("my.dependency.lib");

    // Read from dependency
    const depResources = await dependencies.byGlob("**/*.json");

    // Process and create new resource
    const compiledData = await processData(depResources);

    const newResource = resourceFactory.createResource({
        path: "/resources/compiled-data.json",
        string: JSON.stringify(compiledData, null, 2)
    });

    await workspace.write(newResource);

    log.info("Created compiled-data.json");
}
```

### Required Dependencies Declaration

**Purpose**: Optimize build by declaring which dependencies the task actually needs.

**When Required**: Specification Version 3.0+

**Implementation**:
```javascript
export async function determineRequiredDependencies({
    availableDependencies,
    getDependencies,
    getProject,
    options
}) {
    const dependencies = new Set();

    // Check if needed dependency exists
    if (availableDependencies.has("my.required.lib")) {
        dependencies.add("my.required.lib");
    }

    // Get dependency info
    const depProjects = await getDependencies();
    for (const project of depProjects) {
        if (project.getName().startsWith("my.company.")) {
            dependencies.add(project.getName());
        }
    }

    return dependencies;
}

export default async function({dependencies, workspace}) {
    // Can only access dependencies declared above
}
```

**Default Behavior**:
- **Specification v3.0+**: No dependencies if callback omitted
- **Earlier versions**: All dependencies if callback omitted

### TaskUtil Helper Class

Available for Specification Version 2.2+.

**Methods**:
```javascript
taskUtil.resourceFactory.createResource({path, string})  // Create resource
taskUtil.getProject(name)                                // Get project instance
taskUtil.getDependencies()                               // List direct dependencies
```

**Example**:
```javascript
const resource = taskUtil.resourceFactory.createResource({
    path: "/resources/my/app/generated.js",
    string: "sap.ui.define([], function() {});"
});
```

### Standard Build Tasks

Reference for `beforeTask` and `afterTask`:

**Common Tasks** (order of execution):
1. `escapeNonAsciiCharacters` - Escape non-ASCII in .properties files
2. `replaceCopyright` - Replace copyright placeholders
3. `replaceVersion` - Replace version placeholders
4. `replaceBuildtime` - Replace buildtime placeholders
5. `minify` - Minify JavaScript, create debug variants
6. `generateComponentPreload` - Create Component-preload.js
7. `generateLibraryPreload` - Create library-preload.js
8. `generateFlexChangesBundle` - Create flexibility changes bundle
9. `buildThemes` - Compile LESS to CSS
10. `generateVersionInfo` - Create sap-ui-version.json
11. `generateBundle` - Create custom bundles (if configured)
12. `uglify` - (removed in v3.0, replaced by minify)

### Best Practices

1. **Use graceful-fs**: Prevents "too many open files" errors
   ```javascript
   import fs from "graceful-fs";
   ```

2. **Prefer reader/writer APIs** over direct filesystem access

3. **Handle errors explicitly**:
   ```javascript
   if (!resource) {
       throw new Error("Required resource not found");
   }
   ```

4. **Log meaningful messages**:
   ```javascript
   log.info(`Processing ${count} files`);
   log.warn("Optional dependency not found");
   log.error("Failed to process resource");
   ```

5. **Document configuration**:
   ```javascript
   // configuration expected:
   // {
   //   quality: 80,      // Image quality (1-100)
   //   formats: ["webp"] // Output formats
   // }
   ```

6. **Version specification**: Document minimum specVersion required

### Security Consideration

**WARNING**: Custom tasks can execute arbitrary code and modify your project. Always review third-party tasks before installation.

---

## Custom Server Middleware

Custom middleware extends the UI5 development server with custom request handling.

### Overview

- **Purpose**: Extend development server functionality
- **Use Cases**: Proxying, authentication, mock data, header manipulation
- **Distribution**: npm packages (prefix: `ui5-middleware-*`)
- **API**: Express.js middleware function

### Middleware API Signature

```javascript
export default function({log, middlewareUtil, options, resources}) {
    return async function(req, res, next) {
        // Middleware implementation
    }
}
```

**Parameters (outer function)**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `log` | Logger | Logger instance (v3.0+) |
| `middlewareUtil` | MiddlewareUtil | Helper utilities (v2.0+) |
| `options.configuration` | Object | Custom configuration from ui5.yaml |
| `options.middlewareName` | String | Middleware name (v3.0+) |
| `resources.all` | Reader | Root project and dependencies |
| `resources.rootProject` | Reader | Root project only |
| `resources.dependencies` | Reader | Dependencies only |

**Parameters (Express middleware)**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `req` | Request | Express request object |
| `res` | Response | Express response object |
| `next` | Function | Next middleware function |

### Project Configuration

```yaml
specVersion: "4.0"
type: application
metadata:
  name: my.app

server:
  customMiddleware:
    - name: api-proxy                     # Middleware name
      mountPath: /api                     # Optional: only handle /api/* requests
      afterMiddleware: compression        # Ordering
      configuration:                      # Custom configuration
        target: https://api.example.com
        pathRewrite:
          "^/api": ""

    - name: auth-middleware
      beforeMiddleware: serveResources    # Execute early
      configuration:
        apiKey: "secret"
```

**Middleware Ordering**:
- `afterMiddleware: <name>` - Execute after specified middleware
- `beforeMiddleware: <name>` - Execute before specified middleware
- Execution order: definition order in ui5.yaml

**Standard Middleware** (reference for ordering):
1. `csp` - Content Security Policy
2. `compression` - Response compression
3. `cors` - Cross-origin resource sharing
4. `discovery` - Test discovery
5. `serveResources` - Serve project resources
6. `testRunner` - QUnit test runner
7. `serveThemes` - Theme compilation
8. `versionInfo` - Version info JSON
9. `nonReadRequests` - Block POST/PUT/DELETE
10. `serveIndex` - Directory listing

### Middleware Extension Structure

**Inline Extension**:
```yaml
---
specVersion: "4.0"
kind: extension
type: server-middleware
metadata:
  name: api-proxy
middleware:
  path: lib/middleware/proxy.js
```

**Standalone npm Module**:
```yaml
# In ui5-middleware-proxy/ui5.yaml
specVersion: "4.0"
kind: extension
type: server-middleware
metadata:
  name: ui5-middleware-proxy
middleware:
  path: lib/proxy.js
```

### Middleware Implementation

**Basic Example** (Custom header):
```javascript
export default function({log, options}) {
    const {configuration} = options;

    return function(req, res, next) {
        res.setHeader("X-Custom-Header", configuration.value || "default");
        next();
    };
}
```

**Advanced Example** (Markdown to HTML):
```javascript
import MarkdownIt from "markdown-it";

export default function({log, resources}) {
    const md = new MarkdownIt();

    return async function(req, res, next) {
        // Only handle .html requests
        if (!req.path?.endsWith(".html")) {
            next();
            return;
        }

        try {
            // Try to load .md file instead
            const mdPath = req.path.replace(".html", ".md");
            const resource = await resources.rootProject.byPath(mdPath);

            if (!resource) {
                next(); // No markdown file, continue
                return;
            }

            const markdown = await resource.getString();
            const html = md.render(markdown);

            log.info(`Rendering markdown for ${req.path}`);

            res.type(".html");
            res.end(html);
        } catch (err) {
            next(err);
        }
    };
}
```

**Proxy Example**:
```javascript
import proxy from "http-proxy-middleware";

export default function({log, options}) {
    const {configuration} = options;

    const proxyMiddleware = proxy.createProxyMiddleware({
        target: configuration.target,
        changeOrigin: true,
        pathRewrite: configuration.pathRewrite || {},
        onProxyReq: (proxyReq, req, res) => {
            log.info(`Proxying ${req.path} to ${configuration.target}`);
        },
        onError: (err, req, res) => {
            log.error(`Proxy error: ${err.message}`);
            res.status(500).send("Proxy Error");
        }
    });

    return proxyMiddleware;
}
```

### karma-ui5 Integration

Custom middleware works with karma-ui5's internal server but must use **Connect API only** for compatibility.

**Incompatible Express features**:
- `req.baseUrl`
- `req.hostname`
- `req.ip`
- `req.ips`
- Express-specific middleware

### Best Practices

1. **Always call next()** unless sending response:
   ```javascript
   if (!shouldHandle) {
       next();
       return;
   }
   ```

2. **Handle errors**:
   ```javascript
   try {
       // Processing
   } catch (err) {
       next(err);  // Pass to error handler
   }
   ```

3. **Use async/await** for resource access

4. **Log meaningful messages**:
   ```javascript
   log.info(`Handling request for ${req.path}`);
   ```

5. **Validate configuration**:
   ```javascript
   if (!configuration.target) {
       throw new Error("Configuration 'target' is required");
   }
   ```

6. **Use mountPath** for scoped middleware:
   ```yaml
   customMiddleware:
     - name: api-handler
       mountPath: /api  # Only handles /api/*
   ```

### Security Consideration

**WARNING**: Custom middleware can execute arbitrary code and access all requests. Review third-party middleware carefully.

---

## Project Shims

Project shims define or extend UI5 project configuration for modules lacking native UI5 support.

### Overview

- **Purpose**: Add UI5 configuration to third-party npm packages
- **Use Cases**: Integrate non-UI5 libraries (lodash, moment, etc.)
- **Scope**: Affects dependency resolution and build process

### Shim Structure

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
    # Package configurations
  dependencies:
    # Dependency overrides
  collections:
    # Monorepo/multi-project handling
```

### Configurations

Map npm package names to UI5 project configurations.

**Example** (Lodash):
```yaml
shims:
  configurations:
    lodash:                               # npm package name
      specVersion: "4.0"
      type: module
      metadata:
        name: thirdparty.lodash
      resources:
        configuration:
          paths:
            /resources/thirdparty/lodash/: dist
```

**Merging**: Uses `Object.assign()`, so existing properties are overwritten.

**Use Case**: Configure packages without modifying node_modules.

### Dependencies

Define or override dependency relationships.

**Example**:
```yaml
shims:
  dependencies:
    lodash:                               # Package name
      - some-other-lib                    # Depends on this

    my-legacy-lib:
      - another-legacy-lib
```

**Requirements**:
- Dependent modules must exist in project's dependency tree
- Cannot add new modules, only relationships

### Collections

Handle packages containing multiple projects (monorepos).

**Example**:
```yaml
shims:
  collections:
    legacy-libs:                          # Package name
      modules:
        legacy-lib-1:                     # Project ID
          path: lib1                      # Relative path in package
        legacy-lib-2:
          path: lib2
```

**Use Case**: Configure legacy libraries in single npm package.

**Note**: Project IDs don't need to match module names exactly.

### Complete Example

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
    # Configure lodash as UI5 module
    lodash:
      specVersion: "4.0"
      type: module
      metadata:
        name: thirdparty.lodash
      resources:
        configuration:
          paths:
            /resources/thirdparty/lodash/: dist

    # Configure moment.js
    moment:
      specVersion: "4.0"
      type: module
      metadata:
        name: thirdparty.moment
      resources:
        configuration:
          paths:
            /resources/thirdparty/moment/: min

  dependencies:
    # Make moment depend on lodash
    moment:
      - lodash

  collections:
    # Handle legacy multi-lib package
    my-legacy-package:
      modules:
        legacy.util:
          path: util
        legacy.controls:
          path: controls
```

### Distribution

**Inline** (in application ui5.yaml):
- Good for: Application-specific shims
- Maintenance: In application repository

**Standalone Module** (npm package):
- Good for: Reusable shims across projects
- Distribution: Published to npm
- Installation: `npm install --save-dev ui5-shim-legacy-libs`

### Best Practices

1. **Document shims** in project README
2. **Use collections** for related legacy libraries
3. **Complete dependency chains** for proper build ordering
4. **Test thoroughly** after adding shims
5. **Share reusable shims** as npm packages
6. **Version specifications** match project requirements

---

## Best Practices

### General

1. **Prefix npm packages**:
   - Tasks: `ui5-task-*`
   - Middleware: `ui5-middleware-*`
   - Shims: `ui5-shim-*`

2. **Document requirements**:
   - Minimum specVersion
   - Required configuration
   - Dependencies

3. **Version appropriately**:
   - Follow semantic versioning
   - Test with multiple UI5 CLI versions

4. **Handle errors gracefully**:
   - Meaningful error messages
   - Fallback behavior when possible

5. **Log appropriately**:
   - Info for normal operations
   - Warn for non-critical issues
   - Error for failures

### Security

1. **Review third-party extensions** before installation
2. **Validate configuration** in extension code
3. **Avoid credentials in configuration** (use environment variables)
4. **Use HTTPS** for proxy targets
5. **Sanitize user input** in middleware

### Testing

1. **Test with different projects** (apps, libraries)
2. **Test with dependencies**
3. **Test error conditions**
4. **Test with different Node.js versions**
5. **Automated tests** for npm-distributed extensions

### Documentation

1. **README.md** with usage examples
2. **Configuration options** documented
3. **Migration guides** for breaking changes
4. **Examples** for common use cases
5. **Troubleshooting** section

---

**Last Updated**: 2025-11-21
**Official Docs**: https://ui5.github.io/cli/stable/pages/extensibility/
