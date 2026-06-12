# SAP SAC Widget Add-On Development Guide

Widget Add-Ons extend built-in SAC widgets without building from scratch.

**Available Since**: QRC Q4 2023
**Source**: [Announcing Widget Add-On](https://community.sap.com/t5/technology-blog-posts-by-sap/announcing-the-new-sap-analytics-cloud-feature-widget-add-on/ba-p/13575788)

---

## Table of Contents

1. [Overview](#overview)
2. [Widget Add-On vs Custom Widget](#widget-add-on-vs-custom-widget)
3. [Supported Chart Types](#supported-chart-types)
4. [JSON Structure](#json-structure)
5. [Implementation Examples](#implementation-examples)
6. [Using Widget Add-Ons](#using-widget-add-ons)

---

## Overview

Widget Add-Ons allow customization of SAC's built-in widgets:
- Add visual elements to charts
- Modify tooltip contents
- Override existing styling
- Extend plot area rendering

**Key Benefit**: Leverage SAC's native visualizations with custom enhancements without building widgets from scratch.

---

## Widget Add-On vs Custom Widget

| Aspect | Custom Widget | Widget Add-On |
|--------|---------------|---------------|
| Purpose | Create entirely new widgets | Extend built-in widgets |
| Web Components | Creates new widget | Adds/replaces parts of existing |
| Component Types | main, styling, builder | main, builder only |
| Use Case | Custom chart types, input controls | Tooltip customization, plot styling |
| Complexity | Higher | Lower |

---

## Supported Chart Types

### Tooltip Customization
- All chart types **except** numeric point

### Plot Area (General)
- Bar/Column charts
- Stacked Bar/Column charts
- Stacked Area charts
- Line charts

### Plot Area (Numeric Point)
- Numeric Point only

---

## JSON Structure

### widget-addon.json

```json
{
  "id": "com.company.mywidgetaddon",
  "version": "1.0.0",
  "name": "My Widget Add-On",
  "description": "Customizes chart tooltips",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "my-addon-main",
      "url": "[https://host.com/addon-main.js",](https://host.com/addon-main.js",)
      "integrity": "",
      "ignoreIntegrity": true
    },
    {
      "kind": "builder",
      "tag": "my-addon-builder",
      "url": "[https://host.com/addon-builder.js",](https://host.com/addon-builder.js",)
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "customColor": {
      "type": "string",
      "default": "#336699"
    },
    "showCustomLabel": {
      "type": "boolean",
      "default": true
    }
  },
  "extension": {
    "target": "tooltip"
  }
}
```

### Extension Targets

| Target | Description |
|--------|-------------|
| `tooltip` | Customize tooltip content and styling |
| `plotArea` | Add visual elements to plot area |
| `numericPoint` | Customize numeric point display |

---

## Implementation Examples

### Tooltip Add-On

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
      }
      .custom-tooltip {
        padding: 8px 12px;
        background: #1a1a2e;
        border-radius: 4px;
        color: #ffffff;
        font-family: "72", Arial, sans-serif;
        font-size: 12px;
      }
      .tooltip-title {
        font-weight: 600;
        margin-bottom: 4px;
      }
      .tooltip-value {
        font-size: 16px;
        color: #4cc9f0;
      }
      .tooltip-change {
        font-size: 11px;
        margin-top: 4px;
      }
      .tooltip-change.positive { color: #4ade80; }
      .tooltip-change.negative { color: #f87171; }
    </style>
    <div class="custom-tooltip" id="tooltip">
      <div class="tooltip-title" id="title"></div>
      <div class="tooltip-value" id="value"></div>
      <div class="tooltip-change" id="change"></div>
    </div>
  `;

  class TooltipAddon extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        customColor: "#336699",
        showCustomLabel: true
      };
    }

    connectedCallback() {
      this._render();
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._render();
    }

    // Called by SAC with tooltip data
    setTooltipData(data) {
      this._tooltipData = data;
      this._render();
    }

    _render() {
      if (!this._tooltipData) return;

      const data = this._tooltipData;
      const titleEl = this._shadowRoot.getElementById("title");
      const valueEl = this._shadowRoot.getElementById("value");
      const changeEl = this._shadowRoot.getElementById("change");

      titleEl.textContent = data.dimensionLabel || "Value";
      valueEl.textContent = this._formatValue(data.measureValue);
      valueEl.style.color = this._props.customColor;

      if (data.previousValue && this._props.showCustomLabel) {
        const change = ((data.measureValue - data.previousValue) / data.previousValue) * 100;
        changeEl.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs previous`;
        changeEl.className = `tooltip-change ${change >= 0 ? "positive" : "negative"}`;
        changeEl.style.display = "block";
      } else {
        changeEl.style.display = "none";
      }
    }

    _formatValue(value) {
      if (typeof value !== "number") return value;
      if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
      if (value >= 1000) return (value / 1000).toFixed(1) + "K";
      return value.toLocaleString();
    }

    get customColor() { return this._props.customColor; }
    set customColor(v) { this._props.customColor = v; }
    get showCustomLabel() { return this._props.showCustomLabel; }
    set showCustomLabel(v) { this._props.showCustomLabel = v; }
  }

  customElements.define("tooltip-addon", TooltipAddon);
})();
```

### Plot Area Add-On

```javascript
(function() {
  class PlotAreaAddon extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._props = {
        showTargetLine: true,
        targetValue: 0,
        targetColor: "#ff6b6b"
      };
    }

    connectedCallback() {
      this._render();
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._render();
    }

    // Called by SAC with chart context
    setChartContext(context) {
      this._chartContext = context;
      this._render();
    }

    _render() {
      if (!this._chartContext || !this._props.showTargetLine) {
        this._shadowRoot.innerHTML = "";
        return;
      }

      const { width, height, yScale } = this._chartContext;

      // Defensive check: Validate yScale is a function before using
      if (!yScale || typeof yScale !== "function") {
        console.warn("[PlotAreaAddon] Chart context missing valid yScale function");
        this._shadowRoot.innerHTML = "";
        return;
      }

      const y = yScale(this._props.targetValue);

      this._shadowRoot.innerHTML = `
        <svg width="${width}" height="${height}" style="position:absolute;top:0;left:0;pointer-events:none;">
          <line
            x1="0" y1="${y}"
            x2="${width}" y2="${y}"
            stroke="${this._props.targetColor}"
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <text
            x="${width - 5}" y="${y - 5}"
            text-anchor="end"
            fill="${this._props.targetColor}"
            font-size="11"
            font-family="72, Arial, sans-serif"
          >
            Target: ${this._props.targetValue}
          </text>
        </svg>
      `;
    }

    get showTargetLine() { return this._props.showTargetLine; }
    set showTargetLine(v) { this._props.showTargetLine = v; }
    get targetValue() { return this._props.targetValue; }
    set targetValue(v) { this._props.targetValue = v; }
    get targetColor() { return this._props.targetColor; }
    set targetColor(v) { this._props.targetColor = v; }
  }

  customElements.define("plotarea-addon", PlotAreaAddon);
})();
```

---

## Using Widget Add-Ons

### Enabling Add-Ons in Stories

1. Open story in Edit mode
2. Select a supported chart widget
3. Open Builder panel
4. Scroll to **Custom Add-Ons** section
5. Toggle **Enable Custom Add-Ons** to ON
6. Select your installed add-on

### Installation

Same process as custom widgets:
1. Navigate to **Analytic Applications** > **Custom Widgets**
2. Click **+** to add new
3. Upload the add-on JSON file
4. Widget Add-Ons appear in the add-ons dropdown for supported widgets

---

## Builder Panel for Add-Ons

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host { display: block; font-family: "72", Arial, sans-serif; font-size: 12px; }
      .panel { padding: 12px; }
      .field { margin-bottom: 12px; }
      label { display: block; margin-bottom: 4px; font-weight: 500; }
      input[type="color"], input[type="number"] {
        width: 100%; padding: 6px; border: 1px solid #89919a; border-radius: 4px;
      }
      .checkbox-field { display: flex; align-items: center; gap: 8px; }
    </style>
    <div class="panel">
      <div class="field">
        <label>Custom Color</label>
        <input type="color" id="colorInput" />
      </div>
      <div class="field checkbox-field">
        <input type="checkbox" id="labelCheckbox" />
        <label for="labelCheckbox">Show Custom Label</label>
      </div>
    </div>
  `;

  class AddonBuilder extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this._shadowRoot.getElementById("colorInput").addEventListener("input", (e) => {
        this._fire({ customColor: e.target.value });
      });

      this._shadowRoot.getElementById("labelCheckbox").addEventListener("change", (e) => {
        this._fire({ showCustomLabel: e.target.checked });
      });
    }

    _fire(properties) {
      this.dispatchEvent(new CustomEvent("propertiesChanged", { detail: { properties } }));
    }

    onCustomWidgetBeforeUpdate(changedProperties) {}

    onCustomWidgetAfterUpdate(changedProperties) {
      if (changedProperties.customColor !== undefined) {
        this._shadowRoot.getElementById("colorInput").value = changedProperties.customColor;
      }
      if (changedProperties.showCustomLabel !== undefined) {
        this._shadowRoot.getElementById("labelCheckbox").checked = changedProperties.showCustomLabel;
      }
    }
  }

  customElements.define("addon-builder", AddonBuilder);
})();
```

---

## Key Differences from Custom Widgets

1. **No Styling Panel**: Add-ons only support main + builder components
2. **Extension Target**: Must specify what part of the widget to extend
3. **Context Data**: SAC provides chart context (scales, dimensions, data) via methods
4. **Limited Scope**: Can only modify supported parts of supported chart types

---

## Resources

- [Widget Add-On Announcement](https://community.sap.com/t5/technology-blog-posts-by-sap/announcing-the-new-sap-analytics-cloud-feature-widget-add-on/ba-p/13575788)
- [Widget Add-On Samples](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-analytics-cloud-custom-widget-amp-widget-add-ons-samples-preview/ba-p/13585313)
- [SAP Samples Repository](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)

---

**Last Updated**: 2026-06-12
