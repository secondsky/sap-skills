# SAP SAC Custom Widget Advanced Topics

Advanced features including custom types, script data types, and administration.

**Source**: [SAP Custom Widget Developer Guide](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)

---

## Table of Contents

1. [Custom Types](#custom-types)
2. [Script API Data Types](#script-api-data-types)
3. [Widget Installation](#widget-installation)
4. [Third-Party Library Integration](#third-party-library-integration)
5. [Advanced Data Binding](#advanced-data-binding)
6. [Multi-Language Support](#multi-language-support)

---

## Custom Types

Custom types enable complex data structures in widget properties and script interactions.

### Custom Data Structures

Define reusable object types in JSON:

```json
{
  "id": "com.company.advancedwidget",
  "version": "1.0.0",
  "name": "Advanced Widget",
  "types": {
    "ChartConfig": {
      "description": "Chart configuration object",
      "properties": {
        "chartType": {
          "type": "string",
          "default": "bar",
          "description": "Type of chart"
        },
        "showLegend": {
          "type": "boolean",
          "default": true,
          "description": "Show chart legend"
        },
        "colors": {
          "type": "string[]",
          "default": [],
          "description": "Color palette"
        }
      }
    },
    "DataPoint": {
      "description": "Single data point",
      "properties": {
        "label": {
          "type": "string",
          "default": "",
          "description": "Data point label"
        },
        "value": {
          "type": "number",
          "default": 0,
          "description": "Data point value"
        },
        "color": {
          "type": "string",
          "default": "#336699",
          "description": "Data point color"
        }
      }
    }
  },
  "properties": {
    "config": {
      "type": "ChartConfig",
      "default": {
        "chartType": "bar",
        "showLegend": true,
        "colors": ["#5470c6", "#91cc75", "#fac858"]
      },
      "description": "Chart configuration"
    },
    "dataPoints": {
      "type": "DataPoint[]",
      "default": [],
      "description": "Array of data points"
    }
  }
}
```

### Custom Enumerations

Define allowed values:

```json
{
  "types": {
    "ChartTypeEnum": {
      "description": "Allowed chart types",
      "values": [
        {
          "id": "bar",
          "description": "Bar Chart"
        },
        {
          "id": "line",
          "description": "Line Chart"
        },
        {
          "id": "pie",
          "description": "Pie Chart"
        },
        {
          "id": "area",
          "description": "Area Chart"
        }
      ]
    },
    "AlignmentEnum": {
      "description": "Text alignment options",
      "values": [
        { "id": "left", "description": "Left aligned" },
        { "id": "center", "description": "Center aligned" },
        { "id": "right", "description": "Right aligned" }
      ]
    }
  },
  "properties": {
    "chartType": {
      "type": "ChartTypeEnum",
      "default": "bar",
      "description": "Type of chart to display"
    },
    "titleAlignment": {
      "type": "AlignmentEnum",
      "default": "center",
      "description": "Title text alignment"
    }
  }
}
```

### Using Custom Types in Web Component

```javascript
class AdvancedWidget extends HTMLElement {
  constructor() {
    super();
    this._props = {
      config: {
        chartType: "bar",
        showLegend: true,
        colors: ["#5470c6", "#91cc75", "#fac858"]
      },
      dataPoints: []
    };
  }

  // Getter returns the full object
  get config() {
    return this._props.config;
  }

  // Setter accepts object and validates
  set config(value) {
    if (typeof value !== "object") {
      console.warn("config must be an object");
      return;
    }
    this._props.config = {
      ...this._props.config,
      ...value
    };
    this._render();
  }

  get dataPoints() {
    return this._props.dataPoints;
  }

  set dataPoints(value) {
    if (!Array.isArray(value)) {
      console.warn("dataPoints must be an array");
      return;
    }
    this._props.dataPoints = value;
    this._render();
  }
}
```

### Type Name Qualification

Internally, custom type names are qualified with widget ID to avoid conflicts:

- Defined as: `ChartConfig`
- Internal name: `com.company.advancedwidget.ChartConfig`

---

## Script API Data Types

Types available for properties and method parameters.

### Selection Type

Represents a data selection in SAC:

```json
{
  "properties": {
    "currentSelection": {
      "type": "Selection",
      "default": {},
      "description": "Current data selection"
    }
  },
  "methods": {
    "setSelection": {
      "description": "Set data selection",
      "parameters": [
        {
          "name": "selection",
          "type": "Selection",
          "description": "Selection to apply"
        }
      ],
      "body": "this._setSelection(selection);"
    }
  }
}
```

**Usage in Scripts**:
```javascript
// In SAC script
var selection = {
  "Account": "Revenue",
  "Year": "2024"
};
Widget_1.setSelection(selection);
```

### MemberInfo Type

Information about a dimension member:

```javascript
// MemberInfo object structure
{
  id: "MEMBER_ID",           // Technical ID
  description: "Member Name", // Display name
  dimensionId: "DIM_ID",     // Parent dimension
  modelId: "MODEL_ID",       // Data model
  displayId: "DISPLAY_ID"    // Display ID
}
```

**Using in Widget**:
```javascript
class MyWidget extends HTMLElement {
  setMemberInfo(memberInfo) {
    this._currentMember = memberInfo;
    this._shadowRoot.getElementById("memberLabel").textContent =
      memberInfo.description || memberInfo.id;
  }
}
```

### ResultMemberInfo Type

Extended member information from result set:

```javascript
// ResultMemberInfo structure
{
  id: "MEMBER_ID",
  description: "Member Name",
  parentId: "PARENT_ID",      // For hierarchies
  properties: {
    "Property1": "Value1"
  }
}
```

### DataSource Methods

Access data source information:

```javascript
// In SAC script with data binding
var ds = Widget_1.getDataSource();

// Get members
var members = ds.getMembers("Account", { limit: 100 });

// Get result member
var selection = { "Account": "Revenue" };
var memberInfo = ds.getResultMember("Account", selection);

// Get data cell value
var value = ds.getData(selection);
```

### Color Type

SAC Color type for color properties:

```json
{
  "properties": {
    "primaryColor": {
      "type": "Color",
      "default": "#336699",
      "description": "Primary widget color"
    }
  }
}
```

---

## Widget Installation

### Administrator Steps

1. **Access Custom Widgets**:
   - Main Menu > **Analytic Applications**
   - Select **Custom Widgets** tab

2. **Upload Widget**:
   - Click **+** (Add) button
   - Select JSON file from local system
   - Widget appears in list after upload

3. **Manage Widgets**:
   - View installed widgets in list
   - Delete widgets no longer needed
   - Update by re-uploading JSON

### Requirements

- **Role**: Administrator or custom widget manager
- **Files**: JSON metadata file (resource files hosted externally)
- **Hosting**: Resource files accessible via HTTPS

### SAC-Hosted Widgets (QRC Q2 2023+)

Upload resource files directly to SAC:

1. **Prepare Files**:
   - Pack JSON and JS files into ZIP
   - Or upload individually to SAC Files

2. **Configure JSON for SAC Hosting**:
   ```json
   {
     "webcomponents": [
       {
         "kind": "main",
         "tag": "my-widget",
         "url": "/my-widget.js",
         "integrity": "",
         "ignoreIntegrity": true
       }
     ]
   }
   ```
   Note: URL starts with `/` for SAC-hosted files

3. **Upload to SAC**:
   - Go to Files > Public Files
   - Create folder for widget
   - Upload JS files
   - Upload JSON to Custom Widgets

### Using Widgets in Stories

1. Open story in Edit mode
2. Open widget panel (Insert > Widget)
3. Find custom widget in Custom section
4. Drag onto canvas
5. Configure via Builder/Styling panels

---

## Third-Party Library Integration

### Supported Libraries

Common libraries used with SAC widgets:

| Library | Use Case | CDN |
|---------|----------|-----|
| ECharts | Charts | `https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js` |
| D3.js | Data viz | `https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js` |
| Chart.js | Charts | `https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.js` |
| Leaflet | Maps | `https://unpkg.com/leaflet@1.9/dist/leaflet.js` |
| Moment.js | Dates | `https://cdn.jsdelivr.net/npm/moment@2/moment.min.js` |

### Integration Pattern

```javascript
(function() {
  // Library URLs
  const LIBS = {
    echarts: "https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"
  };

  // Track loading state
  const libState = {
    echarts: { loaded: false, loading: false, callbacks: [] }
  };

  // Load library once
  function loadLibrary(name) {
    return new Promise((resolve, reject) => {
      const state = libState[name];

      // Already loaded
      if (state.loaded) {
        resolve(window[name === "echarts" ? "echarts" : name]);
        return;
      }

      // Loading - queue callback
      if (state.loading) {
        state.callbacks.push({ resolve, reject });
        return;
      }

      // Start loading
      state.loading = true;

      const script = document.createElement("script");
      script.src = LIBS[name];

      script.onload = () => {
        state.loaded = true;
        state.loading = false;
        const lib = window[name === "echarts" ? "echarts" : name];
        resolve(lib);
        state.callbacks.forEach(cb => cb.resolve(lib));
        state.callbacks = [];
      };

      script.onerror = (err) => {
        state.loading = false;
        reject(err);
        state.callbacks.forEach(cb => cb.reject(err));
        state.callbacks = [];
      };

      document.head.appendChild(script);
    });
  }

  class ChartWidget extends HTMLElement {
    async connectedCallback() {
      try {
        const echarts = await loadLibrary("echarts");
        this._initChart(echarts);
      } catch (error) {
        this._showError("Failed to load chart library");
      }
    }

    _initChart(echarts) {
      const container = this._shadowRoot.getElementById("chart");
      this._chart = echarts.init(container);
      this._render();
    }
  }

  customElements.define("chart-widget", ChartWidget);
})();
```

### License Considerations

**Important**: Review third-party library licenses before deployment.

- MIT/Apache: Generally safe for commercial use
- GPL: May have copyleft requirements
- Commercial: May require license purchase

Check license compatibility with SAC deployment.

---

## Advanced Data Binding

### Multiple Data Bindings

```json
{
  "dataBindings": {
    "primaryData": {
      "feeds": [
        { "id": "xAxis", "description": "X-Axis", "type": "dimension" },
        { "id": "yAxis", "description": "Y-Axis", "type": "mainStructureMember" }
      ]
    },
    "secondaryData": {
      "feeds": [
        { "id": "categories", "description": "Categories", "type": "dimension" },
        { "id": "values", "description": "Values", "type": "mainStructureMember" }
      ]
    }
  }
}
```

**Note**: Currently only the first dataBinding is used. Multiple bindings are defined but only one is active.

### Accessing Metadata

```javascript
_processData() {
  const data = this.primaryData;
  if (!data || !data.data) return;

  // Access metadata
  const metadata = data.metadata;

  // Dimension info
  if (metadata.dimensions) {
    Object.entries(metadata.dimensions).forEach(([key, dim]) => {
      console.log(`Dimension: ${dim.description}`);
    });
  }

  // Measure info
  if (metadata.mainStructureMembers) {
    Object.entries(metadata.mainStructureMembers).forEach(([key, measure]) => {
      console.log(`Measure: ${measure.description}, Unit: ${measure.unitOfMeasure}`);
    });
  }
}
```

### DataBinding Object Methods

```javascript
// Get DataBinding object
const binding = this.dataBindings.getDataBinding("primaryData");

// Available methods (async)
const resultSet = await binding.getResultSet();
const members = await binding.getMembers("DimensionName");
```

---

## Multi-Language Support

### Externalize Strings

```json
{
  "properties": {
    "titleKey": {
      "type": "string",
      "default": "WIDGET_TITLE",
      "description": "Translation key for title"
    }
  }
}
```

### Translation Pattern

```javascript
class MyWidget extends HTMLElement {
  constructor() {
    super();
    this._translations = {
      en: {
        WIDGET_TITLE: "My Widget",
        NO_DATA: "No data available",
        LOADING: "Loading..."
      },
      de: {
        WIDGET_TITLE: "Mein Widget",
        NO_DATA: "Keine Daten verfügbar",
        LOADING: "Laden..."
      }
    };
    this._locale = "en";
  }

  _t(key) {
    const translations = this._translations[this._locale] || this._translations.en;
    return translations[key] || key;
  }

  _render() {
    this._shadowRoot.getElementById("title").textContent = this._t(this._props.titleKey);
  }

  // Set locale from SAC context
  setLocale(locale) {
    this._locale = locale.substring(0, 2); // "en-US" -> "en"
    this._render();
  }
}
```

---

## Debugging Advanced Widgets

### Console Inspection

```javascript
// Expose widget for debugging
connectedCallback() {
  // Make accessible in console
  window.__myWidget = this;

  // Log initialization
  console.log("[MyWidget] Initialized", {
    props: this._props,
    dataBinding: this.primaryData
  });
}
```

### Performance Profiling

```javascript
_render() {
  const start = performance.now();

  // Rendering logic
  this._doRender();

  const duration = performance.now() - start;
  if (duration > 16) { // > 1 frame
    console.warn(`[MyWidget] Slow render: ${duration.toFixed(2)}ms`);
  }
}
```

---

## Resources

- [SAP Custom Widget Developer Guide (PDF)](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [Analytics Designer API Reference](https://help.sap.com/doc/958d4c11261f42e992e8d01a4c0dde25/release/en-US/index.html)
- [Hosting in SAC](https://community.sap.com/t5/technology-blogs-by-sap/hosting-and-uploading-custom-widgets-resource-files-into-sap-analytics/ba-p/13563064)

---

**Last Updated**: 2025-11-22
