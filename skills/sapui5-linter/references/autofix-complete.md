# UI5 Linter - Complete Autofix Reference

**Source**: https://github.com/UI5/linter/blob/main/docs/Scope-of-Autofix.md
**Last Updated**: 2025-11-21
**UI5 Linter Version**: 1.20.5

---

## Overview

The UI5 Linter's autofix feature (`--fix` flag) can automatically correct certain categories of issues. However, the documentation explicitly states: **"This list is not exhaustive; there are more APIs that are currently not replaced automatically."**

This reference provides comprehensive coverage of what can and cannot be automatically fixed.

---

## Using Autofix

### Basic Usage

```bash
# Apply fixes to all files
ui5lint --fix

# Fix specific files
ui5lint --fix "webapp/**/*.js"

# Preview fixes without applying (dry-run mode)
UI5LINT_FIX_DRY_RUN=true ui5lint --fix
```

### Dry-Run Mode

Before applying fixes, preview changes using the environment variable:

```bash
UI5LINT_FIX_DRY_RUN=true ui5lint --fix
```

This shows what would be changed without modifying any files.

---

## Rules with Autofix Support

### 1. no-globals ✅

**What It Fixes**: Replaces UI5 global references with corresponding module imports.

**Example**:
```javascript
// Before:
function onInit() {
  const core = sap.ui.getCore();
  const control = core.byId("myControl");
}

// After:
import Core from "sap/ui/core/Core";

function onInit() {
  const core = Core;
  const control = core.byId("myControl");
}
```

**Limitations**:
- ❌ Cannot fix assignments to global variables
- ❌ Cannot handle `delete` expressions on globals
- ❌ Third-party module access via globals (like `jQuery`) not handled

---

### 2. no-deprecated-api ✅ (Partial)

**What It Fixes**: Multiple categories of deprecated API usage.

#### Category A: Configuration Facade Replacements

**Core.getConfiguration() Methods**:

Replaces deprecated `Core.getConfiguration()` method calls with modern equivalents.

```javascript
// Before:
import Core from "sap/ui/core/Core";
const config = Core.getConfiguration();
const language = config.getLanguage();

// After:
import Localization from "sap/base/i18n/Localization";
const language = Localization.getLanguage();
```

**Supported Configuration Methods** (Partial List):
- `getLanguage()` → `sap/base/i18n/Localization.getLanguage()`
- `getAnimationMode()` → `sap/ui/core/AnimationMode.getAnimationMode()`
- `getTimezone()` → `sap/base/i18n/Localization.getTimezone()`

**Not Supported** (~20 methods, see Issue #620):
- `getAnimation()`
- `getAppCacheBuster()`
- `getCompatibilityVersion()`
- `getFormatSettings()` (requires complex manual replacement)
- `getDebug()`, `getInspect()`, `getOriginInfo()` (no alternatives)
- Many others...

---

#### Category B: Core Facade Replacements

**Core API Methods**:

```javascript
// Before:
import Core from "sap/ui/core/Core";
Core.loadLibrary("sap.m", {async: true});

// After:
import Lib from "sap/ui/core/Lib";
Lib.load({name: "sap.m"});
```

**Supported Core Methods** (Partial List):
- `loadLibrary()` → `sap/ui/core/Lib.load()` (with `async: true` only)
- `byId()` → `sap/ui/core/Element.getElementById()`
- `getLibraryResourceBundle()` → `sap/ui/core/Lib.getResourceBundleFor()`

**Not Supported** (~30+ methods, see Issue #619):

**Template & Rendering** (discarded concepts):
- `getTemplate()`
- `createRenderManager()`
- `getRenderManager()`

**Event Handlers** (different APIs):
- `attachLocalizationChanged()`
- Event attachment methods discontinued

**Error Management** (only on ManagedObject):
- Format/parse/validation error methods

**Model Operations** (only on ManagedObject):
- `getModel()`, `setModel()`, `hasModel()`

**Component/Application** (no replacements):
- `getApplication()`
- `getRootComponent()`
- `getLoadedLibraries()`
- `createUIArea()`, `getUIArea()`

**Other** (discarded or no alternatives):
- `applyChanges()`
- `isLocked()`, `lock()`, `unlock()`
- `registerPlugin()`
- `setRoot()`, `setThemeRoot()`

---

#### Category C: Button Event Handler Migration

**tap → press Event**:

```javascript
// Before:
new Button({
  tap: function() {
    console.log("Tapped");
  }
});

// After:
new Button({
  press: function() {
    console.log("Pressed");
  }
});
```

**XML Views**:
```xml
<!-- Before: -->
<Button tap="onTap"/>

<!-- After: -->
<Button press="onPress"/>
```

---

#### Category D: SmartTable Export Property

**exportType → useExportToExcel**:

```javascript
// Before:
new SmartTable({
  exportType: sap.ui.comp.smarttable.ExportType.Excel
});

// After:
new SmartTable({
  useExportToExcel: true
});
```

---

#### Category E: ODataModel Property Removals

Removes deprecated properties from ODataModel instantiation.

```javascript
// Before:
new ODataModel({
  serviceUrl: "/sap/opu/odata/service",
  deprecatedProperty: true
});

// After:
new ODataModel({
  serviceUrl: "/sap/opu/odata/service"
  // deprecatedProperty removed
});
```

---

#### Category F: SimpleForm Property Elimination

Removes deprecated SimpleForm properties.

---

#### Category G: Bootstrap Script Attributes

**Fixes HTML Bootstrap Script**:

```html
<!-- Before: -->
<script src="resources/sap-ui-core.js"
  data-sap-ui-theme="sap_fiori_3"
  data-sap-ui-libs="sap.m">
</script>

<!-- After: -->
<script src="resources/sap-ui-core.js"
  data-sap-ui-theme="sap_horizon"
  data-sap-ui-libs="sap.m">
</script>
```

**Bootstrap Parameter Fixes** (Added in v1.18.0):
- Updates deprecated theme parameters
- Fixes deprecated configuration attributes

---

#### Category H: jQuery.sap API Replacements

**Limited Support** - Only specific methods are replaced:

```javascript
// Supported:
jQuery.sap.log.error() → sap/base/Log.error()
jQuery.sap.uid() → sap/base/util/uid()
jQuery.sap.encodeHTML() → sap/base/security/encodeHTML()
```

**Not Supported** (Methods without replacements or too complex):

❌ **No Direct Replacement**:
- `jQuery.sap.act` (successor module is private)
- `jQuery.sap.getObject()` (no replacement exists)
- `jQuery.sap.getUriParameters()` (no replacement)
- `jQuery.sap.isSpecialKey()` (no replacement)

❌ **Not Yet Implemented**:
- `jQuery.sap.registerModulePath()`
- `jQuery.sap.registerResourcePath()`

❌ **Too Complex**:
- `jQuery.sap.removeUrlWhitelist()` (complex to automate)

❌ **All jQuery Plugins**:
All deprecated jQuery plugins remain undetected by the linter, preventing automatic fixes.

---

#### Category I: Deprecated isA API

**sap/ui/base/Object.isA** (Added in v1.18.0):

```javascript
// Before:
import BaseObject from "sap/ui/base/Object";
if (obj.isA("sap.ui.core.Control")) {
  // ...
}

// After:
if (obj.isA(Control)) {
  // ...
}
```

---

### 3. no-ambiguous-event-handler ✅

**What It Fixes**: Migrates event handlers to recommended notation format.

**Added in**: v1.19.0

```xml
<!-- Before: ambiguous notation -->
<Button press="handlePress"/>

<!-- After: controller method notation -->
<Button press=".handlePress"/>
```

---

### 4. no-removed-manifest-property ✅ (Partial)

**What It Fixes**: Removes incompatible manifest properties.

**Added in**: v1.19.0

**Supported Fixes**:

1. **Remove synchronizationMode**:
```json
// Before:
{
  "sap.ui5": {
    "models": {
      "": {
        "dataSource": "mainService",
        "synchronizationMode": "None"
      }
    }
  }
}

// After:
{
  "sap.ui5": {
    "models": {
      "": {
        "dataSource": "mainService"
      }
    }
  }
}
```

2. **Clean up empty sap.ui5/resources/js entries**:
```json
// Before:
{
  "sap.ui5": {
    "resources": {
      "js": []
    }
  }
}

// After:
{
  "sap.ui5": {
    "resources": {}
  }
}
```

---

## General Autofix Restrictions

The linter **cannot** automatically fix code in these scenarios:

### 1. Code Outside Module Definitions ❌

**Problem**: Fixes requiring new imports won't work unless code is within `sap.ui.define` or `sap.ui.require` blocks.

```javascript
// ❌ Cannot fix - not in module definition
sap.ui.getCore().byId("myControl");

// ✅ Can fix - inside module definition
sap.ui.define([], function() {
  sap.ui.getCore().byId("myControl");
  // Will add import and replace
});
```

---

### 2. Synchronous-to-Asynchronous Conversions ❌

**Problem**: APIs returning promises can't replace sync versions without restructuring entire code flows across multiple files.

**Examples**:

```javascript
// ❌ Cannot automatically convert - sync to async
const component = sap.ui.component({name: "my.app"});
component.doSomething(); // Immediate usage

// ✅ Would require manual conversion to:
sap.ui.component({name: "my.app", async: true})
  .then(function(component) {
    component.doSomething();
  });
```

**Affected APIs** (Sync-to-Async Barriers):

❌ **Library Loading**:
- `Core.loadLibrary()` → Only replaced with `Lib.load()` when `async: true` is specified

❌ **Component Creation**:
- `Core.createComponent()` → Only replaced with `Component.create()` when `async: true` is specified

❌ **Resource Bundles**:
- `Core.getLibraryResourceBundle()` → Not replaced if arguments suggest promise returns

❌ **View/Fragment Creation** (all require manual conversion):
- `sap.ui.component()`
- `sap.ui.view()`
- `sap.ui.xmlfragment()`
- `sap.ui.xmlview()`
- `sap.ui.jsonview()`
- `sap.ui.jsview()`
- `sap.ui.htmlview()`

---

### 3. Complex Replacements ❌

**Problem**: APIs needing multiple calls and new local variables lack support.

```javascript
// ❌ Cannot automatically fix - requires multiple steps
const config = Core.getConfiguration();
const formatSettings = config.getFormatSettings();
const datePattern = formatSettings.getDatePattern("medium");

// Would require complex manual replacement:
import Formatting from "sap/base/i18n/Formatting";
import DateFormat from "sap/ui/core/format/DateFormat";
const dateFormat = DateFormat.getDateInstance({style: "medium"},
  Formatting.getLanguageTag());
const datePattern = dateFormat.oFormatOptions.pattern;
```

---

### 4. Context-Dependent Replacements ❌

**Problem**: Usage patterns affecting broader code context prevent automation.

```javascript
// ❌ Cannot automatically fix - context-dependent
function doSomething() {
  const model = this.getView().getModel();
  // vs
  const model = Core.getModel(); // Different context!
}
```

---

### 5. Return Value Changes ❌

**Problem**: When return types differ, automated replacement becomes impossible.

```javascript
// ❌ Cannot fix - return type changes
const libs = Core.getLoadedLibraries(); // Returns object
const libNames = Object.keys(libs);

// No direct replacement exists that returns the same structure
```

---

## Autofix Development Standards

For contributors developing new autofix capabilities:

### 1:1 Replacement Requirements

When implementing 1:1 replacements, verify:

- ✅ Function arguments maintain identical type, order, value, and count
- ✅ Return types match exactly between old and new implementations
- ✅ Complex return types (enums/objects) preserve all original values and properties
- ✅ Object method return values maintain type compatibility

### Complex Replacement Standards

When implementing sophisticated migrations:

- ✅ Skip replacements where return types differ unless the value remains unused
- ✅ Utilize `isExpectedValueExpression()` utility or `mustNotUseReturnValue` flags
- ✅ Perform static argument type verification using TypeScript's TypeChecker
- ✅ Preserve comments and whitespace during argument restructuring
- ✅ Maintain line breaks and spacing conventions in modified expressions

---

## Best Practices

### 1. Always Use Dry-Run First

```bash
# Preview changes before applying
UI5LINT_FIX_DRY_RUN=true ui5lint --fix
```

### 2. Review Changes Before Committing

Autofix can make extensive changes. Always review before committing:

```bash
ui5lint --fix
git diff
```

### 3. Use Version Control

Commit your code before running autofix:

```bash
git commit -am "Pre-autofix snapshot"
ui5lint --fix
git diff # Review changes
```

### 4. Test After Autofix

Autofix may introduce subtle issues. Always test:

```bash
ui5lint --fix
npm test
npm run build
```

### 5. Handle Limitations Manually

For unsupported APIs, manually refactor:

```javascript
// Linter will flag but not fix:
const libs = Core.getLoadedLibraries();

// Manual replacement:
import Lib from "sap/ui/core/Lib";
const libs = Lib.all();
```

---

## Common Autofix Scenarios

### Scenario 1: Clean Global Usage

```bash
# Fix all global access patterns
ui5lint --fix "webapp/**/*.js"
```

**Result**: Replaces `sap.ui.getCore()`, global namespace access, etc.

---

### Scenario 2: Modernize Component

```bash
# Fix component and manifest issues
ui5lint --fix "webapp/manifest.json" "webapp/Component.js"
```

**Result**: Removes `synchronizationMode`, updates deprecated APIs

---

### Scenario 3: Update Views

```bash
# Fix event handlers and deprecated controls
ui5lint --fix "webapp/view/**/*.xml"
```

**Result**: Updates event handler notation, deprecated attributes

---

### Scenario 4: Migrate jQuery.sap

```bash
# Fix supported jQuery.sap APIs
ui5lint --fix "webapp/**/*.js"
```

**Result**: Replaces `jQuery.sap.log`, `jQuery.sap.uid`, etc.
**Note**: Many jQuery.sap APIs cannot be automatically fixed!

---

## Troubleshooting Autofix

### Issue: "autofix-error" Reported

**Cause**: Expected autofix cannot be applied

**Solutions**:
1. Check if code is within module definition
2. Verify file syntax is valid (no parsing errors)
3. Review edge cases that may prevent replacement
4. Report issue to UI5 Linter team if unexpected

---

### Issue: Autofix Changes Too Much

**Cause**: Running autofix on entire codebase at once

**Solutions**:
1. Run autofix on specific directories:
   ```bash
   ui5lint --fix "webapp/controller/**/*.js"
   ```
2. Use `--ignore-pattern` to exclude files:
   ```bash
   ui5lint --fix --ignore-pattern "webapp/thirdparty/**"
   ```

---

### Issue: Autofix Missed Some Deprecations

**Cause**: Not all deprecated APIs support autofix

**Solutions**:
1. Review this document for known limitations
2. Check `Scope-of-Autofix.md` for latest updates
3. Manually refactor unsupported APIs
4. Consider reporting missing autofix as feature request

---

## Version History

### v1.20.5 (2025-11-18)
- Dependency updates

### v1.20.0 (2025-09-11)
- Manifest v2 support
- Deterministic file ordering

### v1.19.0 (2025-08-28)
- ✨ Removal of `synchronizationMode` from manifest.json
- ✨ Cleanup of empty `sap.ui5/resources/js` entries
- ✨ Migration to recommended event handler notation

### v1.18.0 (2025-08-19)
- ✨ Fix UI5 Bootstrap Parameters in HTML
- ✨ Autofix for deprecated `sap/ui/base/Object.isA` API

### v1.14.0 (2025-06-27)
- ✨ Deprecated sap/ui/core/Core APIs autofix
- ✨ Deprecated sap/ui/core/Configuration APIs autofix
- ✨ Deprecated jQuery.sap APIs autofix
- ✨ Deprecated property assignments autofix

---

## Further Reading

- **Autofix Documentation**: https://github.com/UI5/linter/blob/main/docs/Scope-of-Autofix.md
- **Issue #619** (Core API Limitations): https://github.com/UI5/linter/issues/619
- **Issue #620** (Configuration API Limitations): https://github.com/UI5/linter/issues/620
- **Main Repository**: https://github.com/UI5/linter
- **Development Guide**: https://github.com/UI5/linter/blob/main/docs/Development.md

---

**Document Version**: 1.0
**Last Verified**: 2025-11-21
**Next Review**: 2026-02-21
