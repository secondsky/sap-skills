# SAP SAC Custom Widget Best Practices

Comprehensive guide for performance, security, and development best practices.

**Sources**:
- [SAP Custom Widget Developer Guide](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Performance Optimization](https://community.sap.com/t5/technology-blog-posts-by-members/performance-optimization-techniques-for-sap-analytics-cloud-application/ba-p/13516595)
- [Optimizing SAC](https://community.sap.com/t5/technology-blog-posts-by-sap/optimizing-sap-analytics-cloud-best-practices-and-performance/ba-p/14229397)

---

## Table of Contents

1. [Performance Best Practices](#performance-best-practices)
2. [Security Best Practices](#security-best-practices)
3. [Development Best Practices](#development-best-practices)
4. [Testing Guidelines](#testing-guidelines)
5. [Deployment Checklist](#deployment-checklist)

---

## Performance Best Practices

### Widget Initialization

**DO**:
```javascript
// Lazy initialization - only load when visible
connectedCallback() {
  if (this._initialized) return;
  this._initialized = true;
  this._init();
}

// Defer non-critical setup
_init() {
  // Critical setup first
  this._setupDOM();

  // Defer expensive operations
  requestAnimationFrame(() => {
    this._loadResources();
  });
}
```

**DON'T**:
```javascript
// Heavy processing in constructor
constructor() {
  super();
  this._processLargeDataset(); // Blocks main thread
  this._loadExternalLibraries(); // Network call in constructor
}
```

### Data Handling

**Use getResultSet() Instead of getMembers()**:
```javascript
// RECOMMENDED - No backend roundtrip
async _getData() {
  const resultSet = await this.dataBinding.getResultSet();
  return resultSet;
}

// AVOID - Causes extra backend roundtrip
async _getData() {
  const members = await this.dataBinding.getMembers("Dimension");
  return members;
}
```

**Limit Data Points**:
```javascript
_renderChart(data) {
  const MAX_POINTS = 100;

  // Warn if data is truncated
  if (data.length > MAX_POINTS) {
    console.warn(`Data truncated from ${data.length} to ${MAX_POINTS} points`);
  }

  const limitedData = data.slice(0, MAX_POINTS);
  this._chart.setOption({ series: [{ data: limitedData }] });
}
```

### Rendering Optimization

**Debounce Updates**:
```javascript
onCustomWidgetAfterUpdate(changedProperties) {
  // Debounce rapid property changes
  if (this._updateTimer) {
    clearTimeout(this._updateTimer);
  }
  this._updateTimer = setTimeout(() => {
    this._render();
  }, 50);
}
```

**Batch DOM Updates**:
```javascript
// GOOD - Single DOM update
_render() {
  const html = this._data.map(item => `<div>${item.label}: ${item.value}</div>`).join("");
  this._container.innerHTML = html;
}

// BAD - Multiple DOM updates
_render() {
  this._container.innerHTML = "";
  this._data.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.label}: ${item.value}`;
    this._container.appendChild(div); // Triggers reflow each time
  });
}
```

**Use requestAnimationFrame for Visual Updates**:
```javascript
_scheduleRender() {
  if (this._renderScheduled) return;
  this._renderScheduled = true;

  requestAnimationFrame(() => {
    this._renderScheduled = false;
    this._render();
  });
}
```

### Resize Handling

```javascript
onCustomWidgetResize() {
  // Debounce resize events
  if (this._resizeTimer) {
    clearTimeout(this._resizeTimer);
  }
  this._resizeTimer = setTimeout(() => {
    if (this._chart) {
      this._chart.resize();
    }
  }, 100);
}
```

### Memory Management

```javascript
onCustomWidgetDestroy() {
  // Clear timers
  if (this._updateTimer) clearTimeout(this._updateTimer);
  if (this._resizeTimer) clearTimeout(this._resizeTimer);

  // Dispose chart libraries
  if (this._chart) {
    this._chart.dispose();
    this._chart = null;
  }

  // Remove event listeners
  if (this._boundHandlers) {
    window.removeEventListener("resize", this._boundHandlers.resize);
  }

  // Clear data references
  this._data = null;
  this._props = null;
}
```

### Third-Party Library Loading

For `/widget-generate` enterprise/offline packages and browser design runtime previews, prefer local `vendor/` assets. Hosted URLs are acceptable only when the deployment owner explicitly approves the origin and SAC trusted-origin/security requirements are satisfied.

**Lazy Load Libraries**:
```javascript
async _loadEcharts() {
  if (window.echarts) return window.echarts;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js";
    script.onload = () => resolve(window.echarts);
    script.onerror = () => reject(new Error("Failed to load ECharts"));
    document.head.appendChild(script);
  });
}

// Use async initialization
async connectedCallback() {
  try {
    const echarts = await this._loadEcharts();
    this._initChart(echarts);
  } catch (error) {
    this._showError("Failed to load chart library");
  }
}
```

---

## Security Best Practices

### Input Validation

**Sanitize User Input**:
```javascript
_setTitle(value) {
  // Sanitize to prevent XSS
  const sanitized = this._sanitizeHTML(value);
  this._shadowRoot.getElementById("title").textContent = sanitized;
}

_sanitizeHTML(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}
```

**Validate Property Types**:
```javascript
set value(val) {
  // Type validation
  if (typeof val !== "number" || isNaN(val)) {
    console.warn("Invalid value type, expected number");
    return;
  }

  // Range validation
  if (val < 0 || val > 100) {
    console.warn("Value out of range (0-100)");
    val = Math.max(0, Math.min(100, val));
  }

  this._props.value = val;
  this._render();
}
```

### Content Security

**Avoid innerHTML with User Data**:
```javascript
// DANGEROUS - XSS vulnerability
_render() {
  this._container.innerHTML = `<div>${this._userInput}</div>`;
}

// SAFE - Use textContent or sanitize
_render() {
  const div = document.createElement("div");
  div.textContent = this._userInput;
  this._container.innerHTML = "";
  this._container.appendChild(div);
}
```

**Use Shadow DOM Encapsulation**:
```javascript
constructor() {
  super();
  // Shadow DOM isolates styles and scripts
  this._shadowRoot = this.attachShadow({ mode: "open" });
}
```

### Integrity Hash (Production)

**Generate SHA256 Hash**:
```bash
# Cross-platform Node.js command for Windows/macOS/Linux
node -e "const fs=require('node:fs');const crypto=require('node:crypto');const file=process.argv[1]||'widget.js';console.log('sha256-'+crypto.createHash('sha256').update(fs.readFileSync(file)).digest('base64'));" widget.js

# Example output: sha256-K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=
```

On macOS/Linux or Git Bash, OpenSSL is also acceptable; prefix the output with `sha256-` before adding it to the manifest:

```bash
openssl dgst -sha256 -binary widget.js | openssl base64 -A
```

**Configure in JSON**:
```json
{
  "webcomponents": [
    {
      "kind": "main",
      "tag": "my-widget",
      "url": "https://host.com/widget.js",
      "integrity": "sha256-K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=",
      "ignoreIntegrity": false
    }
  ]
}
```

**Warning**: `ignoreIntegrity: true` triggers security warnings for admins. Only use in development.

### CORS Configuration

**Server Headers Required**:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Express.js Example**:
```javascript
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "OPTIONS"]
}));

app.use(express.static("public"));
app.listen(3000);
```

### External API Calls

**Use HTTPS Only**:
```javascript
async _fetchExternalData() {
  // Always use HTTPS
  const url = "https://api.example.com/data";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
```

---

## Development Best Practices

### Code Organization

**Modular Structure**:
```javascript
(function() {
  // Constants
  const CONFIG = {
    MAX_ITEMS: 100,
    DEBOUNCE_MS: 50,
    DEFAULT_COLOR: "#336699"
  };

  // Template
  const template = document.createElement("template");
  template.innerHTML = `<style>...</style><div>...</div>`;

  // Helper functions
  function formatNumber(n) { ... }
  function sanitize(str) { ... }

  // Main class
  class MyWidget extends HTMLElement {
    // Properties first
    static get observedAttributes() { return ["title", "value"]; }

    // Constructor
    constructor() { ... }

    // Lifecycle methods (in order)
    connectedCallback() { ... }
    onCustomWidgetBeforeUpdate() { ... }
    onCustomWidgetAfterUpdate() { ... }
    onCustomWidgetResize() { ... }
    onCustomWidgetDestroy() { ... }

    // Public methods
    refresh() { ... }
    setValue(v) { ... }

    // Private methods (underscore prefix)
    _render() { ... }
    _handleClick() { ... }

    // Getters/setters last
    get title() { ... }
    set title(v) { ... }
  }

  customElements.define("my-widget", MyWidget);
})();
```

### Error Handling

```javascript
class MyWidget extends HTMLElement {
  _render() {
    try {
      // Rendering logic
      this._doRender();
    } catch (error) {
      console.error("Widget render failed:", error);
      this._showErrorState(error.message);
    }
  }

  _showErrorState(message) {
    this._shadowRoot.innerHTML = `
      <div class="error-container">
        <span class="error-icon">⚠️</span>
        <span class="error-message">Widget Error: ${this._sanitize(message)}</span>
      </div>
    `;
  }

  _sanitize(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
}
```

### Logging for Debugging

```javascript
class MyWidget extends HTMLElement {
  _log(level, message, data) {
    if (!this._props.debug) return;

    const prefix = `[MyWidget]`;
    switch (level) {
      case "info":
        console.log(prefix, message, data);
        break;
      case "warn":
        console.warn(prefix, message, data);
        break;
      case "error":
        console.error(prefix, message, data);
        break;
    }
  }

  onCustomWidgetAfterUpdate(changedProperties) {
    this._log("info", "Properties updated", changedProperties);
    this._render();
  }
}
```

### Documentation

**JSDoc Comments**:
```javascript
/**
 * Custom KPI Widget for SAP Analytics Cloud
 * @class
 * @extends HTMLElement
 *
 * @property {string} title - Widget title
 * @property {number} value - KPI value (0-100)
 * @property {string} color - Primary color (hex)
 *
 * @fires onClick - When widget is clicked
 *
 * @example
 * // In SAC script
 * KPIWidget_1.title = "Revenue";
 * KPIWidget_1.value = 85;
 */
class KPIWidget extends HTMLElement { ... }
```

---

## Testing Guidelines

### Local Development Server

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.listen(3000, () => {
  console.log("Widget dev server: http://localhost:3000");
});
```

### Test Scenarios

**1. Property Updates**:
- Change each property via script
- Verify visual updates
- Check console for errors

**2. Data Binding**:
- Add/remove data binding
- Empty data handling
- Large dataset handling

**3. Resize**:
- Resize container
- Switch responsive layouts
- Check chart redraws

**4. Lifecycle**:
- Navigate away and back
- Remove and re-add widget
- Verify cleanup in destroy

**5. Error Cases**:
- Invalid property values
- Network failures
- Missing data

### Browser DevTools

1. **Console**: Watch for errors and logs
2. **Network**: Verify file loading
3. **Elements**: Inspect Shadow DOM
4. **Performance**: Profile render times
5. **Memory**: Check for leaks

---

## Deployment Checklist

### Pre-Deployment

- [ ] Remove `console.log` statements (or guard with debug flag)
- [ ] Set `ignoreIntegrity: false`
- [ ] Generate and set integrity hash
- [ ] Minify JavaScript files
- [ ] Test with production data
- [ ] Verify HTTPS hosting
- [ ] Check CORS headers

### JSON Configuration

- [ ] Unique ID (reverse domain notation)
- [ ] Correct version number
- [ ] All URLs are absolute HTTPS
- [ ] Integrity hashes set
- [ ] Properties have descriptions
- [ ] Methods documented

### Documentation

- [ ] README with usage instructions
- [ ] Property descriptions
- [ ] Event documentation
- [ ] Known limitations
- [ ] Version changelog

### Hosting

- [ ] Files accessible via HTTPS
- [ ] CORS configured correctly
- [ ] CDN or reliable hosting
- [ ] Backup of all files

---

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Heavy constructor | Blocks initial render | Defer to connectedCallback |
| Sync external loads | Freezes UI | Use async/await |
| innerHTML with user data | XSS vulnerability | Use textContent or sanitize |
| No error handling | Silent failures | try/catch with error display |
| Memory leaks | Performance degradation | Clean up in destroy |
| Unbounded data | UI freeze | Limit and paginate |
| Frequent DOM updates | Janky UI | Batch updates |
| `ignoreIntegrity: true` in prod | Security warning | Generate proper hash |

---

## Resources

- [SAP Custom Widget Developer Guide](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [SAC Performance Optimization](https://community.sap.com/t5/technology-blog-posts-by-sap/optimizing-sap-analytics-cloud-best-practices-and-performance/ba-p/14229397)
- [Local Development Server](https://community.sap.com/t5/technology-blog-posts-by-sap/streamline-sac-custom-widget-development-with-local-server/ba-p/14160499)

---

**Last Updated**: 2025-11-22
