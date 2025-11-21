# UI5 CLI Troubleshooting Guide

**Official Documentation**: https://ui5.github.io/cli/stable/pages/Troubleshooting/

This reference provides solutions for common UI5 CLI issues and errors.

## Table of Contents

1. [Server Issues](#server-issues)
2. [Build Issues](#build-issues)
3. [Dependency Issues](#dependency-issues)
4. [Configuration Issues](#configuration-issues)
5. [Environment Issues](#environment-issues)
6. [Performance Issues](#performance-issues)

---

## Server Issues

### ERR_SSL_PROTOCOL_ERROR in Chrome

**Symptom**: Cannot access HTTP server (port 8080) after previously using HTTPS.

**Error**: `ERR_SSL_PROTOCOL_ERROR` in Chrome browser

**Cause**: Chrome enforces HTTPS via HSTS (HTTP Strict Transport Security) headers. When HTTPS was previously used on a domain, Chrome remembers and forces HTTPS for future connections.

**Solution**:
1. Navigate to `chrome://net-internals/#hsts`
2. Enter the domain name (e.g., `localhost`)
3. Click "Delete" to remove HSTS mapping
4. Restart browser
5. Access HTTP server normally

**Alternative**: Use HTTPS consistently:
```bash
ui5 serve --h2
```

---

### Port Already in Use

**Symptom**: Server fails to start with "Port already in use" error

**Error**: `Error: listen EADDRINUSE: address already in use :::8080`

**Solutions**:

**Option 1 - Use different port**:
```bash
ui5 serve --port 3000
```

**Option 2 - Find and kill process using port**:
```bash
# Linux/Mac
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Option 3 - Stop previous UI5 server**:
```bash
# Press Ctrl+C in terminal running server
```

---

### SSL Certificate Trust Issues

**Symptom**: Browser warns about untrusted SSL certificate when using `--h2`

**Cause**: UI5 CLI generates self-signed certificates stored in `~/.ui5/server/`

**Solutions**:

**Option 1 - Trust certificate in browser** (recommended for development):
1. Click "Advanced" in browser warning
2. Click "Proceed to localhost (unsafe)"
3. Certificate will be remembered for session

**Option 2 - Install certificate in system**:
1. Locate certificate: `~/.ui5/server/server.crt`
2. Import to system keychain/certificate store
3. Mark as trusted for SSL

**Option 3 - Use HTTP** (not recommended):
```bash
ui5 serve  # Without --h2
```

---

### Cannot Accept Remote Connections

**Symptom**: Mobile device or other machine cannot access dev server

**Cause**: Server only accepts localhost connections by default

**Solution**:
```bash
ui5 serve --accept-remote-connections
```

**Security Note**: Only use on trusted networks. This exposes server to network.

**Access from other devices**:
```
http://<your-ip-address>:8080
```

---

## Build Issues

### TypeError: invalid input

**Symptom**: Build fails during `enhanceManifest` task

**Full Error**: `TypeError: invalid input`

**Cause**: Manifest `_version` property incompatible with UI5 framework version. For UI5 1.71, supported locales generation requires manifest version ≤ 1.17.0.

**Solution**:

Update `manifest.json`:
```json
{
  "_version": "1.17.0",
  "sap.app": {
    "id": "my.app",
    ...
  }
}
```

**Alternative**: Match manifest version to UI5 framework version (recommended):
```json
{
  "_version": "1.120.0",  // Match UI5 framework version
  ...
}
```

---

### Build Fails with "Module requires top level scope"

**Symptom**: Build completes but modules are missing from bundles

**Error in logs**: `Module X requires top level scope and cannot be bundled`

**Cause**: Specification Version 4.0+ prohibits bundling modules requiring top-level scope (due to CSP restrictions).

**Solutions**:

**Option 1 - Update module** to not require top-level scope:
```javascript
// Before (requires top level scope)
var globalVar = "value";
sap.ui.define([], function() { ... });

// After (no top level scope)
sap.ui.define([], function() {
  var localVar = "value";
  ...
});
```

**Option 2 - Exclude from bundle**:
```yaml
builder:
  componentPreload:
    excludes:
      - "my/app/problematic/Module.js"
```

**Option 3 - Downgrade specVersion** (not recommended):
```yaml
specVersion: "3.2"  # Allows string bundling
```

---

### Custom Task Not Executing

**Symptom**: Custom task doesn't run during build

**Diagnosis**:
```bash
ui5 build --verbose  # Check task execution
```

**Common Causes**:

**1. Task not configured**:
```yaml
# Missing or incorrect
builder:
  customTasks:
    - name: my-task  # Must match extension name
      beforeTask: minify
```

**2. Invalid task reference**:
```yaml
builder:
  customTasks:
    - name: my-task
      beforeTask: invalidTask  # Task doesn't exist
```

Use valid built-in task names: `replaceCopyright`, `minify`, `generateComponentPreload`, etc.

**3. Extension not defined**:
```yaml
# Need extension definition
---
specVersion: "4.0"
kind: extension
type: task
metadata:
  name: my-task
task:
  path: lib/tasks/myTask.js
```

**4. Task file error**:
Check task implementation exports async function:
```javascript
export default async function({workspace, options, log}) {
  // Task logic
}
```

---

### Dependency Not Included in Build

**Symptom**: Build completes but dependency resources missing

**Cause**: Build doesn't include dependencies by default

**Solution**:
```bash
# Include all dependencies
ui5 build --all

# Include specific dependencies
ui5 build --include-dependency my.reuse.library

# Include with wildcard
ui5 build --include-dependency "my.company.*"
```

---

## Dependency Issues

### Dependency Not Found

**Symptom**: `ui5 serve` or `ui5 build` fails with "Dependency X not found"

**Common Causes**:

**1. Missing in package.json**:
```bash
npm install --save my-dependency
```

**2. Wrong dependency location**:
Framework libraries should be in `ui5.yaml`, not `package.json`:
```yaml
# ui5.yaml (correct)
framework:
  libraries:
    - name: sap.ui.table

# package.json (incorrect for framework libs)
# Do NOT add sap.ui.table here
```

**3. Workspace resolution issue**:
Check `ui5 tree` to verify dependency resolution:
```bash
ui5 tree
ui5 tree --flat  # Easier to read
```

**4. Missing ui5.yaml in dependency**:
Dependency needs its own `ui5.yaml` configuration.

---

### Framework Libraries Not Downloaded

**Symptom**: Framework libraries missing, errors about missing modules

**Cause**: UI5 CLI caches framework in `~/.ui5/`, may be corrupted

**Solution**:
```bash
# Clear framework cache
rm -rf ~/.ui5/framework/

# Re-run command (will re-download)
ui5 serve
```

**For custom data directory**:
```bash
rm -rf /custom/path/.ui5/framework/
```

---

### Dependency Version Conflicts

**Symptom**: Build or serve fails with conflicting dependency versions

**Diagnosis**:
```bash
ui5 tree  # Check dependency tree
npm ls    # Check npm dependencies
```

**Solutions**:

**1. Align framework versions**:
```yaml
# All dependencies should use same framework version
framework:
  version: "1.120.0"  # Pin to specific version
```

**2. Use workspace for local development**:
```yaml
# ui5-workspace.yaml
specVersion: workspace/1.0
metadata:
  name: default
dependencyManagement:
  resolutions:
    - path: ../my-library  # Use local version
```

**3. Override with npm resolution** (package.json):
```json
{
  "overrides": {
    "problematic-dep": "1.2.3"
  }
}
```

---

## Configuration Issues

### Invalid ui5.yaml Syntax

**Symptom**: CLI fails with "Configuration malformed" or YAML parse error

**Solution**:

**1. Validate YAML syntax**:
Use online YAML validator or IDE with YAML support

**2. Check indentation** (must be spaces, not tabs):
```yaml
# Correct
framework:
  name: SAPUI5
  version: "1.120.0"

# Incorrect (tabs)
framework:
→ name: SAPUI5
```

**3. Validate against schema**:
Add to editor settings (VS Code example):
```json
{
  "yaml.schemas": {
    "https://ui5.github.io/cli/schema/ui5.yaml.json": "ui5.yaml"
  }
}
```

**4. Use validation script**:
```bash
node scripts/validate-ui5-yaml.js
```

---

### SpecVersion Not Supported

**Symptom**: Error about unsupported specification version

**Error**: `Specification version X.Y is not supported by this version of UI5 CLI`

**Cause**: Using newer specVersion than CLI supports

**Solutions**:

**1. Update UI5 CLI**:
```bash
npm install --save-dev @ui5/cli@latest
```

**2. Downgrade specVersion** (temporary):
```yaml
specVersion: "3.2"  # Instead of "4.0"
```

**3. Check compatibility**:
| specVersion | Minimum CLI Version |
|-------------|---------------------|
| 4.0 | v4.0.0 |
| 3.2 | v3.11.0 |
| 3.0 | v3.0.0 |
| 2.0 | v2.0.0 |

---

### Metadata Name Invalid

**Symptom**: Error about invalid project name

**Error**: `Project name must be lowercase` (specVersion 3.0+)

**Cause**: Name contains uppercase characters (not allowed in v3.0+)

**Solution**:
```yaml
# Before
metadata:
  name: MyApplication

# After
metadata:
  name: my.application
```

---

## Environment Issues

### Node.js Version Incompatibility

**Symptom**: CLI fails with Node.js version error

**Error**: `UI5 CLI requires Node.js version X or higher`

**Requirements**:
- **UI5 CLI v4.0+**: Node.js v20.11.0+ or v22.0.0+ (v21 NOT supported)
- **UI5 CLI v3.0+**: Node.js v16.18.0+ or v18.12.0+
- **UI5 CLI v2.0+**: Node.js v10.0.0+

**Solution**:
```bash
# Check current version
node --version

# Update Node.js
nvm install 20  # Using nvm
nvm use 20

# Or download from nodejs.org
```

---

### npm Version Issues

**Symptom**: Installation or operation fails with npm errors

**Requirements**:
- **UI5 CLI v4.0+**: npm v8.0.0+
- **UI5 CLI v3.0+**: npm v8.0.0+

**Solution**:
```bash
# Check version
npm --version

# Update npm
npm install -g npm@latest
```

---

### Excessive Disk Space Usage

**Symptom**: `~/.ui5/` directory consuming large disk space

**Cause**: Multiple cached UI5 framework versions

**Solution**:
```bash
# Check size
du -sh ~/.ui5/

# Clear framework cache (safe)
rm -rf ~/.ui5/framework/

# Clear all UI5 data (includes certificates)
rm -rf ~/.ui5/

# Clear custom data directory
rm -rf /custom/path/.ui5/
```

**Note**: CLI will re-download frameworks on next use.

---

### Log Level Issues in CI/CD

**Symptom**: Cannot set log level in automated environments

**Cause**: `--log-level` flag not practical in scripts

**Solution - Use environment variable**:
```bash
# Linux/Mac
export UI5_LOG_LVL=verbose
ui5 build

# Windows
set UI5_LOG_LVL=verbose
ui5 build

# Cross-platform (using cross-env)
npx cross-env UI5_LOG_LVL=verbose ui5 build
```

**Log levels**: `silent`, `error`, `warn`, `info`, `perf`, `verbose`, `silly`

---

### Custom Data Directory Not Working

**Symptom**: UI5 CLI still uses `~/.ui5/` despite configuration

**Solutions**:

**1. Set via config**:
```bash
ui5 config set ui5DataDir /custom/path/.ui5
ui5 config list  # Verify
```

**2. Set via environment** (temporary):
```bash
UI5_DATA_DIR=/custom/path/.ui5 ui5 serve
```

**3. Verify environment variable** takes precedence over config.

---

## Performance Issues

### Slow Build Times

**Symptoms**: Build takes excessively long

**Diagnosis**:
```bash
ui5 build --perf  # Measure performance
```

**Solutions**:

**1. Exclude unnecessary dependencies**:
```bash
ui5 build --exclude-dependency sap.ui.documentation
```

**2. Use selective task execution**:
```bash
ui5 build --exclude-task=* --include-task=minify,generateComponentPreload
```

**3. Disable source maps** (if not needed):
```yaml
builder:
  bundles:
    - bundleOptions:
        sourceMap: false
```

**4. Optimize custom tasks** (check for inefficiencies)

**5. Use build manifest** (caching):
```bash
ui5 build --create-build-manifest --all
```

---

### Slow Server Startup

**Symptoms**: `ui5 serve` takes long to start

**Solutions**:

**1. Reduce dependencies**:
```bash
ui5 tree  # Check dependency count
```

**2. Use workspace** for local dependencies (faster than npm linking)

**3. Clear cache**:
```bash
rm -rf ~/.ui5/framework/
```

**4. Disable unnecessary middleware**:
Remove unused custom middleware from ui5.yaml

---

### Memory Issues

**Symptom**: Build fails with "JavaScript heap out of memory"

**Solutions**:

**1. Increase Node.js memory**:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
ui5 build --all
```

**2. Build without dependencies** (if possible):
```bash
ui5 build  # Without --all
```

**3. Exclude large dependencies**:
```bash
ui5 build --exclude-dependency large.library
```

---

## Diagnostic Commands

### Enable Verbose Logging

```bash
ui5 <command> --verbose
# or
UI5_LOG_LVL=verbose ui5 <command>
```

### Enable Performance Measurement

```bash
ui5 <command> --perf
```

### Check Configuration

```bash
ui5 config list
ui5 tree
ui5 versions
```

### Validate Dependencies

```bash
ui5 tree --flat
npm ls
```

---

## Getting Help

### Before Reporting Issues

1. **Update to latest**:
   ```bash
   npm install --save-dev @ui5/cli@latest
   ```

2. **Clear cache**:
   ```bash
   rm -rf ~/.ui5/
   ```

3. **Check configuration**:
   ```bash
   ui5 config list
   ui5 versions
   ```

4. **Enable verbose logging**:
   ```bash
   ui5 build --verbose
   ```

### Reporting Issues

Include in bug reports:
- UI5 CLI version (`ui5 versions`)
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Operating system
- Full error message
- Minimal reproduction steps
- ui5.yaml configuration

**GitHub Issues**: https://github.com/SAP/ui5-tooling/issues

---

**Last Updated**: 2025-11-21
**Official Docs**: https://ui5.github.io/cli/stable/pages/Troubleshooting/
