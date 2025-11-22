# SAP SAC Custom Widget Templates

Ready-to-use templates for common custom widget patterns.

---

## Table of Contents

1. [Basic Widget Template](#basic-widget-template)
2. [Widget with Styling Panel](#widget-with-styling-panel)
3. [Data-Bound Widget](#data-bound-widget)
4. [Interactive Button Widget](#interactive-button-widget)
5. [KPI Card Widget](#kpi-card-widget)
6. [Widget with Builder Panel](#widget-with-builder-panel)

---

## Basic Widget Template

Minimal widget for getting started.

### widget.json

```json
{
  "id": "com.company.basicwidget",
  "version": "1.0.0",
  "name": "Basic Widget",
  "description": "A simple custom widget",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "basic-widget",
      "url": "/basic-widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "Hello World"
    },
    "fontSize": {
      "type": "integer",
      "default": 16
    }
  },
  "methods": {},
  "events": {}
}
```

### basic-widget.js

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "72", Arial, sans-serif;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      }
      .title {
        color: #32363a;
        text-align: center;
      }
    </style>
    <div class="container">
      <div class="title" id="title">Hello World</div>
    </div>
  `;

  class BasicWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        title: "Hello World",
        fontSize: 16
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

    onCustomWidgetResize() {
      // Handle resize if needed
    }

    onCustomWidgetDestroy() {
      // Cleanup
    }

    _render() {
      const titleEl = this._shadowRoot.getElementById("title");
      titleEl.textContent = this._props.title;
      titleEl.style.fontSize = this._props.fontSize + "px";
    }

    // Property getters/setters
    get title() { return this._props.title; }
    set title(value) {
      this._props.title = value;
      this._render();
    }

    get fontSize() { return this._props.fontSize; }
    set fontSize(value) {
      this._props.fontSize = value;
      this._render();
    }
  }

  customElements.define("basic-widget", BasicWidget);
})();
```

---

## Widget with Styling Panel

Widget with user-customizable properties via styling panel.

### widget-styled.json

```json
{
  "id": "com.company.styledwidget",
  "version": "1.0.0",
  "name": "Styled Widget",
  "description": "Widget with styling panel",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "styled-widget",
      "url": "/styled-widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    },
    {
      "kind": "styling",
      "tag": "styled-widget-panel",
      "url": "/styled-widget-panel.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "My Widget"
    },
    "backgroundColor": {
      "type": "string",
      "default": "#ffffff"
    },
    "textColor": {
      "type": "string",
      "default": "#333333"
    },
    "fontSize": {
      "type": "integer",
      "default": 18
    }
  },
  "methods": {},
  "events": {}
}
```

### styled-widget.js

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "72", Arial, sans-serif;
        border-radius: 4px;
        transition: all 0.3s ease;
      }
    </style>
    <div class="container" id="container">
      <span id="title"></span>
    </div>
  `;

  class StyledWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        title: "My Widget",
        backgroundColor: "#ffffff",
        textColor: "#333333",
        fontSize: 18
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

    onCustomWidgetResize() {}
    onCustomWidgetDestroy() {}

    _render() {
      const container = this._shadowRoot.getElementById("container");
      const title = this._shadowRoot.getElementById("title");

      container.style.backgroundColor = this._props.backgroundColor;
      title.textContent = this._props.title;
      title.style.color = this._props.textColor;
      title.style.fontSize = this._props.fontSize + "px";
    }

    // Property getters/setters
    get title() { return this._props.title; }
    set title(value) { this._props.title = value; }

    get backgroundColor() { return this._props.backgroundColor; }
    set backgroundColor(value) { this._props.backgroundColor = value; }

    get textColor() { return this._props.textColor; }
    set textColor(value) { this._props.textColor = value; }

    get fontSize() { return this._props.fontSize; }
    set fontSize(value) { this._props.fontSize = value; }
  }

  customElements.define("styled-widget", StyledWidget);
})();
```

### styled-widget-panel.js

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: "72", Arial, sans-serif;
        font-size: 12px;
      }
      .panel {
        padding: 12px;
      }
      .field {
        margin-bottom: 12px;
      }
      label {
        display: block;
        margin-bottom: 4px;
        color: #32363a;
        font-weight: 500;
      }
      input[type="text"],
      input[type="number"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #89919a;
        border-radius: 4px;
        box-sizing: border-box;
      }
      input[type="color"] {
        width: 100%;
        height: 32px;
        padding: 2px;
        border: 1px solid #89919a;
        border-radius: 4px;
        cursor: pointer;
      }
    </style>
    <div class="panel">
      <div class="field">
        <label>Title</label>
        <input type="text" id="titleInput" />
      </div>
      <div class="field">
        <label>Background Color</label>
        <input type="color" id="bgColorInput" />
      </div>
      <div class="field">
        <label>Text Color</label>
        <input type="color" id="textColorInput" />
      </div>
      <div class="field">
        <label>Font Size (px)</label>
        <input type="number" id="fontSizeInput" min="8" max="72" />
      </div>
    </div>
  `;

  class StyledWidgetPanel extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};

      // Event listeners
      this._shadowRoot.getElementById("titleInput").addEventListener("change", (e) => {
        this._firePropertiesChanged({ title: e.target.value });
      });

      this._shadowRoot.getElementById("bgColorInput").addEventListener("input", (e) => {
        this._firePropertiesChanged({ backgroundColor: e.target.value });
      });

      this._shadowRoot.getElementById("textColorInput").addEventListener("input", (e) => {
        this._firePropertiesChanged({ textColor: e.target.value });
      });

      this._shadowRoot.getElementById("fontSizeInput").addEventListener("change", (e) => {
        this._firePropertiesChanged({ fontSize: parseInt(e.target.value) });
      });
    }

    _firePropertiesChanged(properties) {
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties }
      }));
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      if (changedProperties.title !== undefined) {
        this._shadowRoot.getElementById("titleInput").value = changedProperties.title;
      }
      if (changedProperties.backgroundColor !== undefined) {
        this._shadowRoot.getElementById("bgColorInput").value = changedProperties.backgroundColor;
      }
      if (changedProperties.textColor !== undefined) {
        this._shadowRoot.getElementById("textColorInput").value = changedProperties.textColor;
      }
      if (changedProperties.fontSize !== undefined) {
        this._shadowRoot.getElementById("fontSizeInput").value = changedProperties.fontSize;
      }
    }
  }

  customElements.define("styled-widget-panel", StyledWidgetPanel);
})();
```

---

## Data-Bound Widget

Widget that receives data from SAC models.

### data-widget.json

```json
{
  "id": "com.company.datawidget",
  "version": "1.0.0",
  "name": "Data Widget",
  "description": "Widget with data binding",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "data-widget",
      "url": "/data-widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "Data Table"
    }
  },
  "methods": {
    "refresh": {
      "description": "Refresh the data display",
      "body": "this._refresh();"
    }
  },
  "events": {
    "onRowSelect": {
      "description": "Fired when a row is selected"
    }
  },
  "dataBindings": {
    "tableData": {
      "feeds": [
        {
          "id": "dimensions",
          "description": "Dimensions",
          "type": "dimension"
        },
        {
          "id": "measures",
          "description": "Measures",
          "type": "mainStructureMember"
        }
      ]
    }
  }
}
```

### data-widget.js

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
      .container {
        font-family: "72", Arial, sans-serif;
        font-size: 13px;
        padding: 8px;
      }
      .title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #32363a;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 8px 12px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
      }
      th {
        background: #f5f6f7;
        font-weight: 600;
        color: #32363a;
      }
      tr:hover {
        background: #fafafa;
        cursor: pointer;
      }
      .no-data {
        text-align: center;
        padding: 24px;
        color: #6a6d70;
      }
    </style>
    <div class="container">
      <div class="title" id="title">Data Table</div>
      <div id="tableContainer">
        <div class="no-data">No data available. Add data binding.</div>
      </div>
    </div>
  `;

  class DataWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = { title: "Data Table" };
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

    onCustomWidgetResize() {}
    onCustomWidgetDestroy() {}

    _render() {
      this._shadowRoot.getElementById("title").textContent = this._props.title;
      this._renderTable();
    }

    _renderTable() {
      const container = this._shadowRoot.getElementById("tableContainer");

      // Check if data binding exists and has data
      if (!this.tableData || !this.tableData.data || this.tableData.data.length === 0) {
        container.innerHTML = '<div class="no-data">No data available. Add data binding.</div>';
        return;
      }

      const data = this.tableData.data;
      const metadata = this.tableData.metadata;

      // Build table header
      let headerHtml = '<tr>';
      const columns = [];

      // Add dimension columns
      if (metadata.dimensions) {
        Object.keys(metadata.dimensions).forEach((key, index) => {
          const dim = metadata.dimensions[key];
          headerHtml += `<th>${dim.description || key}</th>`;
          columns.push({ type: 'dimension', key: `dimensions_${index}` });
        });
      }

      // Add measure columns
      if (metadata.mainStructureMembers) {
        Object.keys(metadata.mainStructureMembers).forEach((key, index) => {
          const measure = metadata.mainStructureMembers[key];
          headerHtml += `<th>${measure.description || key}</th>`;
          columns.push({ type: 'measure', key: `measures_${index}` });
        });
      }
      headerHtml += '</tr>';

      // Build table rows
      let rowsHtml = '';
      data.forEach((row, rowIndex) => {
        rowsHtml += `<tr data-index="${rowIndex}">`;
        columns.forEach(col => {
          if (col.type === 'dimension') {
            const cell = row[col.key];
            rowsHtml += `<td>${cell ? cell.label : ''}</td>`;
          } else {
            const cell = row[col.key];
            rowsHtml += `<td>${cell ? this._formatNumber(cell.raw) : ''}</td>`;
          }
        });
        rowsHtml += '</tr>';
      });

      container.innerHTML = `<table><thead>${headerHtml}</thead><tbody>${rowsHtml}</tbody></table>`;

      // Add click handlers
      container.querySelectorAll('tbody tr').forEach(tr => {
        tr.addEventListener('click', () => {
          const index = parseInt(tr.dataset.index);
          this.dispatchEvent(new CustomEvent("onRowSelect", {
            detail: { rowIndex: index, rowData: data[index] }
          }));
        });
      });
    }

    _formatNumber(value) {
      if (typeof value === 'number') {
        return value.toLocaleString();
      }
      return value;
    }

    _refresh() {
      this._render();
    }

    // Property getter/setter
    get title() { return this._props.title; }
    set title(value) { this._props.title = value; }
  }

  customElements.define("data-widget", DataWidget);
})();
```

---

## Interactive Button Widget

Widget with click events for script interaction.

### button-widget.json

```json
{
  "id": "com.company.buttonwidget",
  "version": "1.0.0",
  "name": "Button Widget",
  "description": "Interactive button with events",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "button-widget",
      "url": "/button-widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "label": {
      "type": "string",
      "default": "Click Me"
    },
    "buttonColor": {
      "type": "string",
      "default": "#0a6ed1"
    },
    "disabled": {
      "type": "boolean",
      "default": false
    }
  },
  "methods": {
    "click": {
      "description": "Programmatically click the button",
      "body": "this._click();"
    },
    "setDisabled": {
      "description": "Enable or disable the button",
      "parameters": [
        { "name": "isDisabled", "type": "boolean", "description": "Disabled state" }
      ],
      "body": "this._setDisabled(isDisabled);"
    }
  },
  "events": {
    "onClick": {
      "description": "Fired when button is clicked"
    }
  }
}
```

### button-widget.js

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      button {
        padding: 12px 24px;
        font-family: "72", Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      button:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-1px);
      }
      button:active:not(:disabled) {
        transform: translateY(0);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
    <div class="container">
      <button id="btn">Click Me</button>
    </div>
  `;

  class ButtonWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        label: "Click Me",
        buttonColor: "#0a6ed1",
        disabled: false
      };

      this._shadowRoot.getElementById("btn").addEventListener("click", () => {
        if (!this._props.disabled) {
          this.dispatchEvent(new Event("onClick"));
        }
      });
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

    onCustomWidgetResize() {}
    onCustomWidgetDestroy() {}

    _render() {
      const btn = this._shadowRoot.getElementById("btn");
      btn.textContent = this._props.label;
      btn.style.backgroundColor = this._props.buttonColor;
      btn.disabled = this._props.disabled;
    }

    _click() {
      if (!this._props.disabled) {
        this.dispatchEvent(new Event("onClick"));
      }
    }

    _setDisabled(isDisabled) {
      this._props.disabled = isDisabled;
      this._render();
    }

    // Property getters/setters
    get label() { return this._props.label; }
    set label(value) { this._props.label = value; }

    get buttonColor() { return this._props.buttonColor; }
    set buttonColor(value) { this._props.buttonColor = value; }

    get disabled() { return this._props.disabled; }
    set disabled(value) { this._props.disabled = value; }
  }

  customElements.define("button-widget", ButtonWidget);
})();
```

---

## KPI Card Widget

Professional KPI display widget.

### kpi-card.json

```json
{
  "id": "com.company.kpicard",
  "version": "1.0.0",
  "name": "KPI Card",
  "description": "KPI display card with trend indicator",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "kpi-card",
      "url": "/kpi-card.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": { "type": "string", "default": "Revenue" },
    "value": { "type": "number", "default": 0 },
    "unit": { "type": "string", "default": "$" },
    "trend": { "type": "number", "default": 0 },
    "target": { "type": "number", "default": 0 },
    "thresholdGood": { "type": "number", "default": 100 },
    "thresholdBad": { "type": "number", "default": 80 }
  },
  "methods": {
    "setValue": {
      "description": "Set the KPI value",
      "parameters": [{ "name": "val", "type": "number" }],
      "body": "this._setValue(val);"
    }
  },
  "events": {
    "onClick": { "description": "Fired when card is clicked" }
  }
}
```

### kpi-card.js

```javascript
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .card {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 16px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        font-family: "72", Arial, sans-serif;
        cursor: pointer;
        transition: box-shadow 0.2s ease;
      }
      .card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      }
      .title {
        font-size: 13px;
        color: #6a6d70;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .value-row {
        display: flex;
        align-items: baseline;
        gap: 8px;
      }
      .value {
        font-size: 32px;
        font-weight: 600;
        color: #32363a;
      }
      .unit {
        font-size: 18px;
        color: #6a6d70;
      }
      .trend {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
        font-size: 13px;
      }
      .trend.positive { color: #107e3e; }
      .trend.negative { color: #bb0000; }
      .trend.neutral { color: #6a6d70; }
      .arrow { font-size: 16px; }
      .target {
        margin-top: 8px;
        font-size: 12px;
        color: #6a6d70;
      }
      .progress-bar {
        height: 4px;
        background: #e5e5e5;
        border-radius: 2px;
        margin-top: 4px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s ease;
      }
      .progress-fill.good { background: #107e3e; }
      .progress-fill.warning { background: #e9730c; }
      .progress-fill.bad { background: #bb0000; }
    </style>
    <div class="card" id="card">
      <div class="title" id="title">Revenue</div>
      <div class="value-row">
        <span class="unit" id="unit">$</span>
        <span class="value" id="value">0</span>
      </div>
      <div class="trend" id="trend">
        <span class="arrow" id="arrow"></span>
        <span id="trendValue"></span>
      </div>
      <div class="target" id="targetSection">
        <span>Target: <span id="targetValue"></span></span>
        <div class="progress-bar">
          <div class="progress-fill" id="progressFill"></div>
        </div>
      </div>
    </div>
  `;

  class KpiCard extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        title: "Revenue",
        value: 0,
        unit: "$",
        trend: 0,
        target: 0,
        thresholdGood: 100,
        thresholdBad: 80
      };

      this._shadowRoot.getElementById("card").addEventListener("click", () => {
        this.dispatchEvent(new Event("onClick"));
      });
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

    onCustomWidgetResize() {}
    onCustomWidgetDestroy() {}

    _render() {
      const p = this._props;

      this._shadowRoot.getElementById("title").textContent = p.title;
      this._shadowRoot.getElementById("unit").textContent = p.unit;
      this._shadowRoot.getElementById("value").textContent = this._formatNumber(p.value);

      // Trend
      const trendEl = this._shadowRoot.getElementById("trend");
      const arrowEl = this._shadowRoot.getElementById("arrow");
      const trendValueEl = this._shadowRoot.getElementById("trendValue");

      if (p.trend > 0) {
        trendEl.className = "trend positive";
        arrowEl.textContent = "↑";
        trendValueEl.textContent = `+${p.trend}%`;
      } else if (p.trend < 0) {
        trendEl.className = "trend negative";
        arrowEl.textContent = "↓";
        trendValueEl.textContent = `${p.trend}%`;
      } else {
        trendEl.className = "trend neutral";
        arrowEl.textContent = "→";
        trendValueEl.textContent = "0%";
      }

      // Target progress
      const targetSection = this._shadowRoot.getElementById("targetSection");
      if (p.target > 0) {
        targetSection.style.display = "block";
        this._shadowRoot.getElementById("targetValue").textContent =
          p.unit + this._formatNumber(p.target);

        const percentage = Math.min((p.value / p.target) * 100, 100);
        const progressFill = this._shadowRoot.getElementById("progressFill");
        progressFill.style.width = percentage + "%";

        if (percentage >= p.thresholdGood) {
          progressFill.className = "progress-fill good";
        } else if (percentage >= p.thresholdBad) {
          progressFill.className = "progress-fill warning";
        } else {
          progressFill.className = "progress-fill bad";
        }
      } else {
        targetSection.style.display = "none";
      }
    }

    _formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
      }
      return num.toLocaleString();
    }

    _setValue(val) {
      this._props.value = val;
      this._render();
    }

    // Property getters/setters
    get title() { return this._props.title; }
    set title(v) { this._props.title = v; }
    get value() { return this._props.value; }
    set value(v) { this._props.value = v; }
    get unit() { return this._props.unit; }
    set unit(v) { this._props.unit = v; }
    get trend() { return this._props.trend; }
    set trend(v) { this._props.trend = v; }
    get target() { return this._props.target; }
    set target(v) { this._props.target = v; }
    get thresholdGood() { return this._props.thresholdGood; }
    set thresholdGood(v) { this._props.thresholdGood = v; }
    get thresholdBad() { return this._props.thresholdBad; }
    set thresholdBad(v) { this._props.thresholdBad = v; }
  }

  customElements.define("kpi-card", KpiCard);
})();
```

---

## Widget with Builder Panel

Widget with design-time configuration via builder panel.

### builder-widget.json

```json
{
  "id": "com.company.builderwidget",
  "version": "1.0.0",
  "name": "Builder Widget",
  "description": "Widget with builder panel configuration",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "builder-widget",
      "url": "/builder-widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    },
    {
      "kind": "builder",
      "tag": "builder-widget-config",
      "url": "/builder-widget-config.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "chartType": {
      "type": "string",
      "default": "bar"
    },
    "showLegend": {
      "type": "boolean",
      "default": true
    },
    "orientation": {
      "type": "string",
      "default": "vertical"
    }
  },
  "methods": {},
  "events": {},
  "dataBindings": {
    "chartData": {
      "feeds": [
        { "id": "category", "description": "Category", "type": "dimension" },
        { "id": "value", "description": "Value", "type": "mainStructureMember" }
      ]
    }
  }
}
```

### builder-widget-config.js

Builder panel for data visualization configuration. Provides design-time controls
for chart type, legend visibility, orientation, and data feed selection.

```javascript
(function() {
  // Builder Panel Web Component for Widget Configuration
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: "72", Arial, sans-serif;
        font-size: 12px;
      }
      .panel {
        padding: 12px;
      }
      .section {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e5e5e5;
      }
      .section-title {
        font-weight: 600;
        color: #32363a;
        margin-bottom: 8px;
      }
      .field {
        margin-bottom: 12px;
      }
      label {
        display: block;
        margin-bottom: 4px;
        color: #32363a;
        font-weight: 500;
      }
      select, input[type="text"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #89919a;
        border-radius: 4px;
        box-sizing: border-box;
        background: #fff;
      }
      .checkbox-field {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .checkbox-field label {
        margin-bottom: 0;
      }
      .help-text {
        font-size: 11px;
        color: #6a6d70;
        margin-top: 4px;
      }
    </style>
    <div class="panel">
      <!-- Chart Configuration Section -->
      <div class="section">
        <div class="section-title">Chart Configuration</div>
        <div class="field">
          <label for="chartTypeSelect">Chart Type</label>
          <select id="chartTypeSelect">
            <option value="bar">Bar Chart</option>
            <option value="column">Column Chart</option>
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        <div class="field">
          <label for="orientationSelect">Orientation</label>
          <select id="orientationSelect">
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
          <div class="help-text">Applies to bar/column charts</div>
        </div>
        <div class="field checkbox-field">
          <input type="checkbox" id="showLegendCheckbox" />
          <label for="showLegendCheckbox">Show Legend</label>
        </div>
      </div>

      <!-- Data Binding Info Section -->
      <div class="section">
        <div class="section-title">Data Configuration</div>
        <div class="field">
          <label>Category Feed</label>
          <input type="text" id="categoryFeed" readonly placeholder="Bind in Builder Panel" />
          <div class="help-text">Configure via Data Binding panel</div>
        </div>
        <div class="field">
          <label>Value Feed</label>
          <input type="text" id="valueFeed" readonly placeholder="Bind in Builder Panel" />
          <div class="help-text">Configure via Data Binding panel</div>
        </div>
      </div>
    </div>
  `;

  class BuilderWidgetConfig extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        chartType: "bar",
        showLegend: true,
        orientation: "vertical"
      };

      // Event listeners for configuration changes
      this._shadowRoot.getElementById("chartTypeSelect").addEventListener("change", (e) => {
        this._firePropertiesChanged({ chartType: e.target.value });
      });

      this._shadowRoot.getElementById("orientationSelect").addEventListener("change", (e) => {
        this._firePropertiesChanged({ orientation: e.target.value });
      });

      this._shadowRoot.getElementById("showLegendCheckbox").addEventListener("change", (e) => {
        this._firePropertiesChanged({ showLegend: e.target.checked });
      });
    }

    // Dispatch property changes to SAC framework
    _firePropertiesChanged(properties) {
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties }
      }));
    }

    // Lifecycle: Called before properties are updated
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    // Lifecycle: Called after properties are updated - sync UI
    onCustomWidgetAfterUpdate(changedProperties) {
      if (changedProperties.chartType !== undefined) {
        this._shadowRoot.getElementById("chartTypeSelect").value = changedProperties.chartType;
      }
      if (changedProperties.orientation !== undefined) {
        this._shadowRoot.getElementById("orientationSelect").value = changedProperties.orientation;
      }
      if (changedProperties.showLegend !== undefined) {
        this._shadowRoot.getElementById("showLegendCheckbox").checked = changedProperties.showLegend;
      }
    }

    // Data binding info (read-only display)
    // NOTE: Actual data feed configuration is handled by SAC's native Builder Panel.
    // This section displays current binding status for reference.
    setDataBindingInfo(bindingInfo) {
      if (bindingInfo?.chartData) {
        const feeds = bindingInfo.chartData.feeds || {};
        if (feeds.category) {
          this._shadowRoot.getElementById("categoryFeed").value = feeds.category.label || "Bound";
        }
        if (feeds.value) {
          this._shadowRoot.getElementById("valueFeed").value = feeds.value.label || "Bound";
        }
      }
    }

    // Property getters/setters
    get chartType() { return this._props.chartType; }
    set chartType(v) { this._props.chartType = v; }
    get showLegend() { return this._props.showLegend; }
    set showLegend(v) { this._props.showLegend = v; }
    get orientation() { return this._props.orientation; }
    set orientation(v) { this._props.orientation = v; }
  }

  customElements.define("builder-widget-config", BuilderWidgetConfig);
})();
```

**Note**: The builder panel provides design-time configuration UI. Data feed selection
(category/value) is typically configured through SAC's native data binding interface
rather than custom controls, as SAC handles the model/dimension selection.

---

## Deployment Checklist

For each template:

1. [ ] Update `id` with your reverse domain notation
2. [ ] Update `vendor` with your company name
3. [ ] Host files (SAC, GitHub Pages, or web server)
4. [ ] Update `url` properties with actual URLs
5. [ ] Test in SAC story/application
6. [ ] Generate integrity hashes for production
7. [ ] Set `ignoreIntegrity: false` for production

---

**Source Documentation**:
- [SAP Custom Widget Developer Guide](https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf)
- [SAP Samples Repository](https://github.com/SAP-samples/analytics-cloud-datasphere-community-content/tree/main/SAC_Custom_Widgets)

**Last Updated**: 2025-11-22
