# UI5 FileSystem API Reference

**Official Documentation**: https://ui5.github.io/cli/stable/pages/FileSystem/

This reference provides comprehensive details about the UI5 FileSystem abstraction layer, adapters, and reader/writer collections for custom task and middleware development.

## Table of Contents

1. [Overview](#overview)
2. [Virtual File System Concept](#virtual-file-system-concept)
3. [Resources](#resources)
4. [Adapters](#adapters)
5. [Reader Collections](#reader-collections)
6. [Writer Collections](#writer-collections)
7. [Usage in Custom Tasks](#usage-in-custom-tasks)
8. [Usage in Custom Middleware](#usage-in-custom-middleware)
9. [Best Practices](#best-practices)

---

## Overview

UI5 FS provides "an abstraction layer from the physical file system" that enables flexible resource organization without directly depending on the underlying filesystem.

**Key Benefits**:
- Virtual path mapping
- In-memory resource handling
- Multiple source combination
- Overlay capabilities
- Optimized build performance

**Primary Use Cases**:
- Custom build task development
- Custom server middleware development
- Programmatic UI5 CLI usage

---

## Virtual File System Concept

### Core Principle

UI5 FS "can combine a set of scattered file locations into a well-defined virtual structure."

**Example**:
```
Physical Locations:
  /project/webapp/         → Virtual: /
  /project/node_modules/lib1/src/ → Virtual: /resources/lib1/
  /project/node_modules/lib2/src/ → Virtual: /resources/lib2/

Virtual Structure:
  /
  ├── index.html           (from /project/webapp/)
  ├── Component.js         (from /project/webapp/)
  └── resources/
      ├── lib1/            (from node_modules/lib1/src/)
      └── lib2/            (from node_modules/lib2/src/)
```

### Benefits

1. **Unified Access**: Access resources from multiple locations via single interface
2. **Virtual Paths**: Resources identified by virtual paths, not physical
3. **Build Optimization**: Resources kept in memory during build
4. **Flexibility**: Change physical structure without affecting virtual paths

---

## Resources

### Overview

Resources "basically represent a file" and provide "access to the file content" with metadata.

**Key Characteristic**: "Resources are typically kept in memory for further processing" to minimize disk I/O.

### Resource Interface

**Common Methods**:
```javascript
// Get resource path (virtual)
resource.getPath()          // Returns: "/resources/my/app/Component.js"

// Get resource content
await resource.getString()  // Returns content as string
await resource.getBuffer()  // Returns content as Buffer
await resource.getStream()  // Returns readable stream

// Modify resource content
resource.setString(content) // Set string content
resource.setBuffer(buffer)  // Set buffer content
resource.setStream(stream)  // Set stream content

// Get resource size
await resource.getSize()    // Returns size in bytes

// Clone resource
resource.clone()            // Creates copy
```

### Resource Creation

**Via TaskUtil (in custom tasks)**:
```javascript
const resource = taskUtil.resourceFactory.createResource({
    path: "/resources/my/app/generated.js",
    string: "sap.ui.define([], function() {});"
});
```

**Via Workspace (write)**:
```javascript
await workspace.write({
    path: "/resources/my/app/metadata.json",
    string: JSON.stringify({version: "1.0.0"})
});
```

---

## Adapters

Adapters provide the interface between the virtual file system and actual storage (memory or physical disk).

### Adapter Types

#### 1. Memory Adapter

**Purpose**: Maintains resources "inside a virtual data structure" without physical file dependencies.

**Use Cases**:
- Temporary resource storage during build
- Generated resources not yet written to disk
- In-memory transformations

**Characteristics**:
- Fast read/write
- No disk I/O
- Lost when process ends
- Ideal for build pipelines

**Example Usage** (internal):
```javascript
// UI5 CLI uses Memory Adapter internally for build resources
// Resources created during build are kept in memory
```

---

#### 2. FileSystem Adapter

**Purpose**: Provides "direct access to the physical file system" and "maps a virtual base path to a given physical path."

**Use Cases**:
- Reading project source files
- Reading dependency files
- Writing build output

**Characteristics**:
- Direct filesystem access
- Persistent storage
- Maps virtual ↔ physical paths
- Used for source and output

**Path Mapping Example**:
```javascript
// Virtual:  /resources/my/app/Component.js
// Physical: /project/webapp/Component.js

// Virtual:  /resources/lib/util.js
// Physical: /project/node_modules/lib/src/util.js
```

---

### Common Adapter Methods

Both adapters share these methods:

#### byPath(path)

Retrieve single resource by virtual path.

**Signature**:
```javascript
async byPath(virPath) → {Resource|null}
```

**Example**:
```javascript
const resource = await reader.byPath("/resources/my/app/Component.js");
if (resource) {
    const content = await resource.getString();
    console.log(content);
}
```

**Returns**: Resource object or null if not found

---

#### byGlob(pattern, options)

Retrieve resources matching glob pattern.

**Signature**:
```javascript
async byGlob(virPattern, options) → {Resource[]}
```

**Example**:
```javascript
// Get all JavaScript files
const jsFiles = await reader.byGlob("**/*.js");

// Get JavaScript files in specific directory
const controllers = await reader.byGlob("/controller/**/*.js");

// Get with options
const resources = await reader.byGlob("**/*.js", {
    nodir: true  // Exclude directories
});
```

**Glob Patterns**:
- `**/*.js` - All JS files recursively
- `*.js` - JS files in root only
- `controller/**/*.controller.js` - Specific pattern
- `!**/*.test.js` - Negation (exclude)

**Returns**: Array of resources (may be empty)

---

#### write(resource)

Write resource to storage.

**Signature**:
```javascript
async write(resource) → {void}
```

**Example**:
```javascript
// Write existing resource
await writer.write(resource);

// Create and write new resource
const newResource = resourceFactory.createResource({
    path: "/resources/generated.js",
    string: "content"
});
await writer.write(newResource);
```

---

## Reader Collections

Collections enable grouped access to multiple adapters with specialized behaviors.

### 1. ReaderCollection

**Purpose**: Basic parallel read access to multiple adapters.

**Behavior**: Reads from all adapters simultaneously, returns combined results.

**Use Case**: Access project + dependencies

**Example**:
```javascript
// In custom middleware (provided by UI5 CLI)
const {all, rootProject, dependencies} = resources;

// 'all' is a ReaderCollection combining rootProject + dependencies
const allResources = await all.byGlob("**/*.js");
```

**Characteristics**:
- Parallel reads
- Combined results
- No priority/overlay

---

### 2. ReaderCollectionPrioritized

**Purpose**: Sequential searching allowing resource "overlay."

**Behavior**: Reads from adapters in order, stops at first match for `byPath()`.

**Use Case**: Allow project to override dependency resources

**Example** (conceptual):
```javascript
// Priority: Project files override dependencies
// Reader 1: Project files
// Reader 2: Dependencies

// byPath() returns first match:
const resource = await prioritized.byPath("/resources/override.js");
// Returns from Project if exists, else from Dependencies

// byGlob() returns from all:
const all = await prioritized.byGlob("**/*.js");
// Returns resources from both, project files take precedence for duplicates
```

**Overlay Example**:
```
Project:      /resources/sap/m/Button.css (custom override)
Dependency:   /resources/sap/m/Button.css (original)

byPath("/resources/sap/m/Button.css")
→ Returns project version (higher priority)
```

---

### 3. DuplexCollection

**Purpose**: Single reader and writer combination with write functionality.

**Behavior**: Combines one reader + one writer for read/write access.

**Use Case**: Custom tasks accessing workspace (read + write project resources)

**Example**:
```javascript
// In custom task (workspace is DuplexCollection)
export default async function({workspace}) {
    // Read
    const resource = await workspace.byPath("/Component.js");

    // Modify
    let content = await resource.getString();
    content = content.replace("old", "new");
    resource.setString(content);

    // Write back
    await workspace.write(resource);
}
```

**Characteristics**:
- Read from one source
- Write to one target
- Typical for workspace operations

---

### 4. WriterCollection

**Purpose**: Multiple writers with path-based routing for resource persistence.

**Behavior**: Routes resources to appropriate writer based on path.

**Use Case**: Write to different output directories

**Example** (conceptual):
```javascript
// Route based on path
const writers = new WriterCollection({
    writers: [
        {
            path: "/resources/**",
            writer: resourcesWriter
        },
        {
            path: "/test-resources/**",
            writer: testWriter
        }
    ]
});

// Writes to resourcesWriter
await writers.write(resourceWithPathResources);

// Writes to testWriter
await writers.write(resourceWithPathTestResources);
```

---

## Usage in Custom Tasks

### Task Parameters

Custom tasks receive these filesystem-related parameters:

```javascript
export default async function({
    workspace,      // DuplexCollection - read/write project resources
    dependencies,   // ReaderCollection - read dependency resources (if declared)
    taskUtil        // Includes resourceFactory
}) {
    // ...
}
```

### Common Patterns

#### Pattern 1: Read, Transform, Write

```javascript
export default async function({workspace}) {
    // Read all JavaScript files
    const jsFiles = await workspace.byGlob("**/*.js");

    // Transform each file
    for (const resource of jsFiles) {
        let content = await resource.getString();

        // Add header comment
        content = `/* Generated */\n${content}`;

        // Update resource
        resource.setString(content);

        // Write back
        await workspace.write(resource);
    }
}
```

---

#### Pattern 2: Create New Resource

```javascript
export default async function({workspace, taskUtil}) {
    const {resourceFactory} = taskUtil;

    // Create new resource
    const metadata = resourceFactory.createResource({
        path: "/resources/metadata.json",
        string: JSON.stringify({
            timestamp: new Date().toISOString(),
            version: "1.0.0"
        }, null, 2)
    });

    // Write to workspace
    await workspace.write(metadata);
}
```

---

#### Pattern 3: Access Dependencies

```javascript
export async function determineRequiredDependencies({availableDependencies}) {
    const required = new Set();
    if (availableDependencies.has("my.required.lib")) {
        required.add("my.required.lib");
    }
    return required;
}

export default async function({workspace, dependencies}) {
    // Read from dependencies
    const depResources = await dependencies.byGlob("**/library.js");

    // Process dependency resources
    for (const resource of depResources) {
        const content = await resource.getString();
        // Analyze dependency
    }

    // Create aggregated resource in workspace
    // ...
}
```

---

#### Pattern 4: Conditional Resource Creation

```javascript
export default async function({workspace, options}) {
    const {configuration} = options;

    if (configuration.generateMetadata) {
        const metadata = await workspace.write({
            path: "/metadata.json",
            string: JSON.stringify({enabled: true})
        });
    }
}
```

---

## Usage in Custom Middleware

### Middleware Parameters

Custom middleware receive these filesystem parameters:

```javascript
export default function({
    resources,          // Object with readers
    middlewareUtil      // Helper utilities
}) {
    const {
        all,            // ReaderCollection - project + dependencies
        rootProject,    // Reader - project only
        dependencies    // Reader - dependencies only
    } = resources;

    return async function(req, res, next) {
        // Use readers to serve resources
    };
}
```

### Common Patterns

#### Pattern 1: Serve Dynamic Content

```javascript
export default function({resources}) {
    return async function(req, res, next) {
        // Serve from virtual path
        const resource = await resources.rootProject.byPath(req.path);

        if (resource) {
            const content = await resource.getString();
            res.type(req.path);
            res.end(content);
        } else {
            next();
        }
    };
}
```

---

#### Pattern 2: Transform On-The-Fly

```javascript
export default function({resources}) {
    return async function(req, res, next) {
        if (!req.path.endsWith(".html")) {
            next();
            return;
        }

        // Load markdown instead
        const mdPath = req.path.replace(".html", ".md");
        const resource = await resources.rootProject.byPath(mdPath);

        if (resource) {
            const markdown = await resource.getString();
            const html = convertMarkdownToHtml(markdown);
            res.type("text/html");
            res.end(html);
        } else {
            next();
        }
    };
}
```

---

#### Pattern 3: Aggregate Resources

```javascript
export default function({resources}) {
    return async function(req, res, next) {
        if (req.path !== "/all-controllers.json") {
            next();
            return;
        }

        // Get all controllers
        const controllers = await resources.all.byGlob("**/controller/*.controller.js");

        // Aggregate metadata
        const metadata = controllers.map(r => ({
            path: r.getPath(),
            size: r.getSize()
        }));

        res.json(metadata);
    };
}
```

---

## Best Practices

### 1. Use Glob Patterns Efficiently

**✅ Good** - Specific patterns:
```javascript
await workspace.byGlob("controller/**/*.controller.js");
await workspace.byGlob("view/**/*.view.xml");
```

**❌ Avoid** - Overly broad patterns:
```javascript
await workspace.byGlob("**/*");  // Returns everything!
```

---

### 2. Check Resource Exists

**✅ Good**:
```javascript
const resource = await workspace.byPath("/Component.js");
if (resource) {
    // Process resource
} else {
    log.warn("Component.js not found");
}
```

**❌ Bad**:
```javascript
const resource = await workspace.byPath("/Component.js");
const content = await resource.getString();  // May throw if null!
```

---

### 3. Use Appropriate Reader

**✅ Good** - Use specific reader:
```javascript
// Only need project files
const resource = await rootProject.byPath("/Component.js");

// Only need dependencies
const libs = await dependencies.byGlob("**/library.js");
```

**❌ Wasteful** - Use `all` unnecessarily:
```javascript
// Searches both project and dependencies unnecessarily
const resource = await all.byPath("/Component.js");
```

---

### 4. Minimize Disk I/O

**✅ Good** - Keep resources in memory:
```javascript
const resources = await workspace.byGlob("**/*.js");
// Process all resources in memory
for (const resource of resources) {
    await processResource(resource);
}
// Write all at once
for (const resource of resources) {
    await workspace.write(resource);
}
```

**❌ Bad** - Repeated reads:
```javascript
for (const path of paths) {
    const resource = await workspace.byPath(path);  // Disk read each time
    await processResource(resource);
}
```

---

### 5. Use graceful-fs

**Recommended** for tasks with many file operations:
```javascript
import fs from 'graceful-fs';  // Instead of 'fs'
```

**Reason**: Prevents "too many open files" errors on systems with file descriptor limits.

---

### 6. Error Handling

**✅ Good**:
```javascript
try {
    const resource = await workspace.byPath("/config.json");
    if (!resource) {
        throw new Error("Configuration file not found");
    }
    const content = await resource.getString();
    // Process
} catch (error) {
    log.error(`Failed to process config: ${error.message}`);
    throw error;
}
```

---

## API Reference

**Full API Documentation**: https://ui5.github.io/cli/v4/api/

**Key Modules**:
- `@ui5/fs` - Main module
- `@ui5/fs.AbstractReader` - Reader base class
- `@ui5/fs.AbstractReaderWriter` - ReaderWriter base class
- `@ui5/fs.Resource` - Resource class
- `@ui5/fs.resourceFactory` - Resource creation

---

## Troubleshooting

### Issue: Resource Not Found

**Symptom**: `byPath()` returns null

**Causes**:
1. Incorrect virtual path (must start with `/`)
2. Resource doesn't exist in reader
3. Using wrong reader (rootProject vs dependencies)

**Solution**: Verify path and reader

---

### Issue: Permission Denied

**Symptom**: Write fails with permission error

**Cause**: Writing to read-only filesystem or insufficient permissions

**Solution**: Check file permissions, ensure using writable workspace

---

### Issue: Out of Memory

**Symptom**: Build fails with heap out of memory

**Cause**: Too many resources kept in memory

**Solution**: Process resources in batches, increase Node.js heap size

---

**Last Updated**: 2025-11-21
**Official Docs**: https://ui5.github.io/cli/stable/pages/FileSystem/
**API Docs**: https://ui5.github.io/cli/v4/api/
