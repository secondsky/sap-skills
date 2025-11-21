# UI5 CLI ECMAScript Support Reference

**Official Documentation**: https://ui5.github.io/cli/stable/pages/ESSupport/

This reference provides complete information about ECMAScript version support, module formats, and language feature restrictions in UI5 CLI.

## Table of Contents

1. [Supported ECMAScript Versions](#supported-ecmascript-versions)
2. [Module Format Requirements](#module-format-requirements)
3. [Language Feature Restrictions](#language-feature-restrictions)
4. [Build-Time Replacements](#build-time-replacements)
5. [Best Practices](#best-practices)
6. [Migration Guide](#migration-guide)

---

## Supported ECMAScript Versions

UI5 CLI supports different ECMAScript versions depending on the CLI version used.

### Version Matrix

| UI5 CLI Version | Supported ECMAScript | Notes |
|----------------|----------------------|-------|
| **v3.11+** | ES2023 | Full ES2023 syntax support |
| **v3.0+** | ES2022 | Full ES2022 syntax support |
| **v2.0+** | ES5 (ES2009) | Limited to ES5 features |

### Important Note

**Parsing vs Analysis**: "Code up to ECMAScript 2020 can be parsed, however required code analysis might not work correctly for specific language features."

**Recommendation**: Use the ECMAScript version matching your UI5 CLI version for guaranteed compatibility.

---

## Module Format Requirements

### Critical Restriction: No ES6 Modules

**UI5 CLI does NOT support JavaScript modules with `import`/`export` syntax.**

**Reason**: UI5 CLI "only analyzes JavaScript files of type `script`" and cannot process ES6 module syntax.

### ❌ Unsupported (ES6 Modules)

```javascript
// This will NOT work with UI5 CLI
import Component from './Component.js';
import { Controller } from 'sap/ui/core/mvc/Controller.js';

export default class MyController extends Controller {
    // ...
}

export function helper() {
    // ...
}
```

**Error**: Modules not recognized, dependencies not resolved, build fails.

---

### ✅ Supported (UI5 AMD Modules)

**Use `sap.ui.define` instead:**

```javascript
// This works correctly with UI5 CLI
sap.ui.define([
    './Component',
    'sap/ui/core/mvc/Controller'
], function(Component, Controller) {
    'use strict';

    return Controller.extend('my.app.controller.MyController', {
        // Controller implementation
    });
});
```

**For helper functions:**

```javascript
sap.ui.define([], function() {
    'use strict';

    return {
        helper: function() {
            // Helper implementation
        }
    };
});
```

### Module Definition Patterns

**Single Class/Object Export:**
```javascript
sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    return UIComponent.extend('my.app.Component', {
        // ...
    });
});
```

**Multiple Exports (as object):**
```javascript
sap.ui.define([], function() {
    return {
        formatDate: function(date) { /* ... */ },
        formatNumber: function(num) { /* ... */ },
        formatCurrency: function(amount) { /* ... */ }
    };
});
```

**Usage:**
```javascript
sap.ui.define([
    'my/app/util/Formatter'
], function(Formatter) {
    Formatter.formatDate(new Date());
});
```

---

## Language Feature Restrictions

While modern ES syntax is supported for parsing, certain features have **usage restrictions** that affect code analysis and bundling.

### 1. Template Literals with Expressions

#### ❌ Not Allowed In

**Dependency Declarations:**
```javascript
// FAILS - Cannot use expression in dependency path
const moduleName = "Controller";
sap.ui.define([
    `sap/ui/core/mvc/${moduleName}`  // ❌ Will not be analyzed
], function(Controller) {
    // ...
});
```

**Smart Template Names:**
```javascript
// FAILS in manifest.json Smart Template configuration
{
    "component": {
        "name": `sap.suite.ui.generic.template.${templateType}`  // ❌
    }
}
```

**Library Initialization:**
```javascript
// FAILS - Cannot use template literal with expression
sap.ui.getCore().initLibrary({
    name: `my.company.${libName}`  // ❌
});
```

#### ✅ Allowed

**Static Template Literals (no expressions):**
```javascript
sap.ui.define([
    `sap/ui/core/mvc/Controller`  // ✅ OK (no expression)
], function(Controller) {
    // ...
});
```

**In Code Logic:**
```javascript
sap.ui.define([], function() {
    return {
        getMessage: function(name) {
            return `Hello, ${name}!`;  // ✅ OK
        }
    };
});
```

---

### 2. Spread Elements

#### ❌ Not Allowed In

**`sap.ui.define` / `sap.ui.require` Calls:**
```javascript
// FAILS - Spread not supported in dependency arrays
const coreDeps = ['sap/ui/core/Core', 'sap/ui/core/UIComponent'];
sap.ui.define([
    ...coreDeps,  // ❌ Will not be analyzed
    'sap/m/Button'
], function(Core, UIComponent, Button) {
    // ...
});
```

**Smart Template Configurations:**
```javascript
// FAILS in manifest.json
{
    "pages": [
        ...commonPages,  // ❌
        { "entitySet": "Products" }
    ]
}
```

**XMLComposite Declarations:**
```javascript
// FAILS
const props = {type: "Button", text: "Click"};
<Button {...props} />  // ❌
```

#### ✅ Allowed

**In Object/Array Literals (code logic):**
```javascript
sap.ui.define([], function() {
    return {
        mergeData: function(obj1, obj2) {
            return { ...obj1, ...obj2 };  // ✅ OK
        },
        combineArrays: function(arr1, arr2) {
            return [...arr1, ...arr2];  // ✅ OK
        }
    };
});
```

---

### 3. Object Properties (Computed/Dynamic)

#### ❌ Not Allowed In

**Module Names:**
```javascript
// FAILS - Dynamic module names not supported
const modules = {
    controller: 'sap/ui/core/mvc/Controller'
};
sap.ui.define([
    modules.controller  // ❌ Will not be analyzed
], function(Controller) {
    // ...
});
```

**Library Initialization:**
```javascript
// FAILS
const config = {
    name: "my.library"
};
sap.ui.getCore().initLibrary(config);  // ❌ Must be literal object
```

#### ✅ Allowed

**In Code Logic:**
```javascript
sap.ui.define([], function() {
    return {
        createConfig: function(key, value) {
            return {
                [key]: value  // ✅ OK (computed property)
            };
        }
    };
});
```

---

### 4. Class Declarations

#### ⚠️ Restriction

**Don't Return Inline:**
```javascript
// PROBLEMATIC - JSDoc may not be associated correctly
sap.ui.define([
    'sap/ui/core/Control'
], function(Control) {
    return class extends Control {  // ⚠️ Avoid
        // ...
    };
});
```

#### ✅ Recommended

**Declare Separately Before Returning:**
```javascript
// RECOMMENDED
sap.ui.define([
    'sap/ui/core/Control'
], function(Control) {
    /**
     * My custom control.
     * @class
     * @extends sap.ui.core.Control
     */
    class MyControl extends Control {
        // ...
    }

    return MyControl;
});
```

**Or Use Traditional Pattern:**
```javascript
// TRADITIONAL (always works)
sap.ui.define([
    'sap/ui/core/Control'
], function(Control) {
    /**
     * My custom control.
     * @class
     * @extends sap.ui.core.Control
     */
    return Control.extend('my.app.control.MyControl', {
        // ...
    });
});
```

---

### 5. Arrow Functions & JSDoc

#### ⚠️ Restriction

**JSDoc Placement:**
```javascript
// PROBLEMATIC - JSDoc not associated with arrow function
/**
 * My module
 */
sap.ui.define([], () => {  // ⚠️ JSDoc won't be recognized
    // ...
});
```

#### ✅ Recommended

**JSDoc Above Arrow Function:**
```javascript
sap.ui.define([], function() {
    return {
        /**
         * Formats a date.
         * @param {Date} date - The date to format
         * @returns {string} Formatted date
         */
        formatDate: (date) => {  // ✅ JSDoc directly above
            return date.toLocaleDateString();
        }
    };
});
```

---

## Build-Time Replacements

### Reserved Variable Names

These variable names are **replaced during build** and should not appear in template literal expressions:

| Variable | Replaced With | Task |
|----------|---------------|------|
| `${version}` | Project version from package.json | replaceVersion |
| `${buildtime}` | Current build timestamp | replaceBuildtime |
| `${copyright}` | Copyright string from ui5.yaml | replaceCopyright |

### ❌ Don't Use In Template Literals

```javascript
// FAILS - Will be replaced during build
const message = `Version: ${version}`;  // ❌ ${version} replaced!
```

### ✅ Use Alternatives

**Option 1 - Use Different Variable Names:**
```javascript
const myVersion = "1.0.0";
const message = `Version: ${myVersion}`;  // ✅ OK
```

**Option 2 - Use String Concatenation:**
```javascript
const message = "Version: " + version;  // ✅ OK
```

**Option 3 - Access at Runtime:**
```javascript
sap.ui.define([
    'sap/ui/core/Component'
], function(Component) {
    return Component.extend('my.app.Component', {
        getVersion: function() {
            // Access version from manifest at runtime
            return this.getManifestEntry('sap.app').applicationVersion.version;
        }
    });
});
```

---

## Best Practices

### 1. Module Definition

**✅ Always use `sap.ui.define`:**
```javascript
sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend('my.Controller', {});
});
```

**❌ Never use ES6 imports:**
```javascript
import Controller from 'sap/ui/core/mvc/Controller';  // ❌
```

---

### 2. Dependencies

**✅ Use static dependency arrays:**
```javascript
sap.ui.define([
    'sap/ui/core/Core',
    'sap/m/Button'
], function(Core, Button) {
    // ...
});
```

**❌ Avoid dynamic dependencies:**
```javascript
const deps = ['sap/m/Button'];
sap.ui.define(deps, function(Button) {});  // ❌
```

---

### 3. Modern ES Features

**✅ Use modern syntax in code logic:**
```javascript
sap.ui.define([], function() {
    return {
        // Arrow functions ✅
        map: (items) => items.map(i => i.value),

        // Destructuring ✅
        extract: ({name, value}) => ({name, value}),

        // Spread operator ✅
        merge: (a, b) => ({...a, ...b}),

        // Template literals ✅
        format: (name) => `Hello, ${name}!`,

        // Async/await ✅
        load: async function() {
            const data = await fetch('/api/data');
            return data.json();
        }
    };
});
```

---

### 4. Class Syntax

**✅ Declare then return:**
```javascript
sap.ui.define(['sap/ui/core/Control'], function(Control) {
    class MyControl extends Control {
        constructor() {
            super();
        }
    }
    return MyControl;
});
```

**✅ Or use traditional extend:**
```javascript
sap.ui.define(['sap/ui/core/Control'], function(Control) {
    return Control.extend('my.Control', {
        init: function() {
            // ...
        }
    });
});
```

---

## Migration Guide

### From ES6 Modules to UI5 AMD

**Before (ES6):**
```javascript
import Controller from 'sap/ui/core/mvc/Controller';
import MessageToast from 'sap/m/MessageToast';

export default class Main extends Controller {
    onPress() {
        MessageToast.show("Pressed!");
    }
}
```

**After (UI5 AMD):**
```javascript
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast'
], function(Controller, MessageToast) {
    'use strict';

    return Controller.extend('my.app.controller.Main', {
        onPress: function() {
            MessageToast.show("Pressed!");
        }
    });
});
```

---

### Modernizing Legacy Code

**Old (ES5):**
```javascript
sap.ui.define([], function() {
    return {
        format: function(items) {
            return items.map(function(item) {
                return item.value;
            });
        }
    };
});
```

**Modern (ES2022):**
```javascript
sap.ui.define([], function() {
    return {
        format: (items) => items.map(item => item.value)
    };
});
```

---

## Summary Table

| Feature | Supported | Restrictions |
|---------|-----------|--------------|
| **ES2023 Syntax** | ✅ Yes (v3.11+) | - |
| **ES2022 Syntax** | ✅ Yes (v3.0+) | - |
| **ES6 Modules** | ❌ No | Use sap.ui.define |
| **Arrow Functions** | ✅ Yes | JSDoc above function |
| **Template Literals** | ✅ Yes | No expressions in deps |
| **Destructuring** | ✅ Yes | - |
| **Spread Operator** | ✅ Yes | Not in deps/config |
| **Classes** | ✅ Yes | Declare before return |
| **Async/Await** | ✅ Yes | - |
| **Computed Properties** | ✅ Yes | Not in module names |
| **Default Parameters** | ✅ Yes | - |
| **Rest Parameters** | ✅ Yes | - |

---

## Troubleshooting

### Issue: Dependencies Not Resolved

**Symptom**: Build succeeds but modules not found at runtime

**Cause**: Using dynamic dependencies or template literals with expressions

**Solution**: Use static string literals in dependency array

---

### Issue: Build Fails with Syntax Error

**Symptom**: "Unexpected token" during build

**Cause**: Using ES6 import/export syntax

**Solution**: Convert to sap.ui.define pattern

---

### Issue: JSDoc Not Generated

**Symptom**: API documentation missing for module

**Cause**: JSDoc not associated with arrow function or inline class

**Solution**: Place JSDoc directly above declaration, or declare separately

---

## Additional Resources

- **UI5 Documentation**: https://ui5.sap.com/
- **sap.ui.define**: https://ui5.sap.com/#/api/sap.ui/methods/sap.ui.define
- **UI5 Modules**: https://ui5.sap.com/#/topic/91f23a736f4d1014b6dd926db0e91070

---

**Last Updated**: 2025-11-21
**Official Docs**: https://ui5.github.io/cli/stable/pages/ESSupport/
