# ECharts Integration for SAP SAC Custom Widgets

Guide for integrating Apache ECharts library with SAP Analytics Cloud custom widgets.

**Source**: [SAP Hands-on Guide](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-analytics-cloud-custom-widget-hands-on-guide/ba-p/13573631)

---

## Table of Contents

1. [Overview](#overview)
2. [Basic ECharts Widget](#basic-echarts-widget)
3. [Data-Bound ECharts Widget](#data-bound-echarts-widget)
4. [Common Chart Types](#common-chart-types)
5. [Styling Panel for ECharts](#styling-panel-for-echarts)
6. [Performance Considerations](#performance-considerations)

---

## Overview

Apache ECharts is a powerful charting library that can be integrated into SAC custom widgets to create advanced visualizations not available in standard SAC charts.

**ECharts CDN**: `https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js`

**Key Benefits**:
- 20+ chart types (sankey, treemap, sunburst, radar, etc.)
- Rich animation and interaction
- Excellent performance with large datasets
- Extensive customization options

---

## Basic ECharts Widget

### echarts-widget.json

```json
{
  "id": "com.company.echartswidget",
  "version": "1.0.0",
  "name": "ECharts Widget",
  "description": "Custom chart using Apache ECharts",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "echarts-widget",
      "url": "/echarts-widget.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": {
      "type": "string",
      "default": "ECharts Demo"
    },
    "chartType": {
      "type": "string",
      "default": "bar"
    },
    "colorScheme": {
      "type": "string",
      "default": "#5470c6,#91cc75,#fac858,#ee6666,#73c0de"
    }
  },
  "methods": {
    "refresh": {
      "description": "Refresh the chart",
      "body": "this._refresh();"
    }
  },
  "events": {
    "onChartClick": {
      "description": "Fired when chart element is clicked"
    }
  }
}
```

### echarts-widget.js

```javascript
(function() {
  // Load ECharts library
  const ECHARTS_CDN = "https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js";

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .chart-container {
        width: 100%;
        height: 100%;
      }
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #6a6d70;
        font-family: "72", Arial, sans-serif;
      }
    </style>
    <div class="chart-container" id="chart">
      <div class="loading">Loading ECharts...</div>
    </div>
  `;

  class EchartsWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        title: "ECharts Demo",
        chartType: "bar",
        colorScheme: "#5470c6,#91cc75,#fac858,#ee6666,#73c0de"
      };
      this._chart = null;
      this._echartsLoaded = false;
    }

    connectedCallback() {
      this._loadEcharts();
    }

    _loadEcharts() {
      if (window.echarts) {
        this._echartsLoaded = true;
        this._initChart();
        return;
      }

      const script = document.createElement("script");
      script.src = ECHARTS_CDN;
      script.onload = () => {
        this._echartsLoaded = true;
        this._initChart();
      };
      script.onerror = () => {
        this._shadowRoot.getElementById("chart").innerHTML =
          '<div class="loading">Failed to load ECharts library</div>';
      };
      document.head.appendChild(script);
    }

    _initChart() {
      const container = this._shadowRoot.getElementById("chart");
      container.innerHTML = "";

      this._chart = echarts.init(container);

      // Handle click events
      this._chart.on("click", (params) => {
        this.dispatchEvent(new CustomEvent("onChartClick", {
          detail: {
            name: params.name,
            value: params.value,
            seriesName: params.seriesName
          }
        }));
      });

      this._render();
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._render();
    }

    onCustomWidgetResize() {
      if (this._chart) {
        this._chart.resize();
      }
    }

    onCustomWidgetDestroy() {
      if (this._chart) {
        this._chart.dispose();
        this._chart = null;
      }
    }

    _render() {
      if (!this._chart || !this._echartsLoaded) return;

      const colors = this._props.colorScheme.split(",").map(c => c.trim());

      // Demo data - replace with data binding data
      const option = this._getChartOption(colors);
      this._chart.setOption(option, true);
    }

    _getChartOption(colors) {
      const chartType = this._props.chartType;

      const baseOption = {
        title: {
          text: this._props.title,
          left: "center",
          textStyle: {
            fontFamily: '"72", Arial, sans-serif',
            fontSize: 16,
            fontWeight: 600
          }
        },
        color: colors,
        tooltip: {
          trigger: chartType === "pie" ? "item" : "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };

      // Demo data
      const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const values = [150, 230, 224, 218, 135, 147];

      switch (chartType) {
        case "bar":
          return {
            ...baseOption,
            xAxis: { type: "category", data: categories },
            yAxis: { type: "value" },
            series: [{ type: "bar", data: values }]
          };

        case "line":
          return {
            ...baseOption,
            xAxis: { type: "category", data: categories },
            yAxis: { type: "value" },
            series: [{ type: "line", data: values, smooth: true }]
          };

        case "pie":
          return {
            ...baseOption,
            series: [{
              type: "pie",
              radius: "60%",
              data: categories.map((name, i) => ({ name, value: values[i] }))
            }]
          };

        default:
          return {
            ...baseOption,
            xAxis: { type: "category", data: categories },
            yAxis: { type: "value" },
            series: [{ type: "bar", data: values }]
          };
      }
    }

    _refresh() {
      this._render();
    }

    // Property getters/setters
    get title() { return this._props.title; }
    set title(v) { this._props.title = v; }
    get chartType() { return this._props.chartType; }
    set chartType(v) { this._props.chartType = v; }
    get colorScheme() { return this._props.colorScheme; }
    set colorScheme(v) { this._props.colorScheme = v; }
  }

  customElements.define("echarts-widget", EchartsWidget);
})();
```

---

## Data-Bound ECharts Widget

Integrate with SAC data models via data binding.

### echarts-databound.json

```json
{
  "id": "com.company.echartsdatabound",
  "version": "1.0.0",
  "name": "ECharts Data-Bound",
  "description": "ECharts with SAC data binding",
  "vendor": "Company Name",
  "license": "MIT",
  "icon": "",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "echarts-databound",
      "url": "/echarts-databound.js",
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
    "title": { "type": "string", "default": "Data Chart" },
    "chartType": { "type": "string", "default": "bar" },
    "showLegend": { "type": "boolean", "default": true }
  },
  "methods": {},
  "events": {
    "onDataPointClick": {
      "description": "Fired when data point is clicked"
    }
  },
  "dataBindings": {
    "chartData": {
      "feeds": [
        { "id": "categories", "description": "Categories", "type": "dimension" },
        { "id": "values", "description": "Values", "type": "mainStructureMember" }
      ]
    }
  }
}
```

### echarts-databound.js

```javascript
(function() {
  const ECHARTS_CDN = "https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js";

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .chart-container {
        width: 100%;
        height: 100%;
      }
      .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #6a6d70;
        font-family: "72", Arial, sans-serif;
        flex-direction: column;
        gap: 8px;
      }
      .no-data-icon {
        font-size: 32px;
        opacity: 0.5;
      }
    </style>
    <div class="chart-container" id="chart">
      <div class="no-data">
        <div class="no-data-icon">📊</div>
        <div>Add data binding to display chart</div>
      </div>
    </div>
  `;

  class EchartsDatabound extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        title: "Data Chart",
        chartType: "bar",
        showLegend: true
      };
      this._chart = null;
      this._echartsLoaded = false;
    }

    connectedCallback() {
      this._loadEcharts();
    }

    _loadEcharts() {
      if (window.echarts) {
        this._echartsLoaded = true;
        this._initChart();
        return;
      }

      const script = document.createElement("script");
      script.src = ECHARTS_CDN;
      script.onload = () => {
        this._echartsLoaded = true;
        this._initChart();
      };
      document.head.appendChild(script);
    }

    _initChart() {
      const container = this._shadowRoot.getElementById("chart");

      // Check for data
      if (!this._hasData()) {
        return;
      }

      container.innerHTML = "";
      this._chart = echarts.init(container);

      this._chart.on("click", (params) => {
        this.dispatchEvent(new CustomEvent("onDataPointClick", {
          detail: {
            category: params.name,
            value: params.value,
            dataIndex: params.dataIndex
          }
        }));
      });

      this._render();
    }

    _hasData() {
      return this.chartData &&
             this.chartData.data &&
             this.chartData.data.length > 0;
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      // Re-init if we now have data
      if (!this._chart && this._hasData() && this._echartsLoaded) {
        this._initChart();
      }
      this._render();
    }

    onCustomWidgetResize() {
      if (this._chart) {
        this._chart.resize();
      }
    }

    onCustomWidgetDestroy() {
      if (this._chart) {
        this._chart.dispose();
        this._chart = null;
      }
    }

    _render() {
      if (!this._chart || !this._echartsLoaded) return;

      if (!this._hasData()) {
        this._chart.clear();
        return;
      }

      const { categories, values } = this._parseDataBinding();
      const option = this._buildChartOption(categories, values);
      this._chart.setOption(option, true);
    }

    _parseDataBinding() {
      const data = this.chartData.data;
      const categories = [];
      const values = [];

      data.forEach(row => {
        // Get category (first dimension)
        if (row.categories_0) {
          categories.push(row.categories_0.label || row.categories_0.id);
        }

        // Get value (first measure)
        if (row.values_0) {
          values.push(row.values_0.raw || 0);
        }
      });

      return { categories, values };
    }

    _buildChartOption(categories, values) {
      const chartType = this._props.chartType;

      const option = {
        title: {
          text: this._props.title,
          left: "center",
          textStyle: {
            fontFamily: '"72", Arial, sans-serif',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: chartType === "pie" ? "item" : "axis",
          formatter: chartType === "pie" ? "{b}: {c} ({d}%)" : undefined
        },
        legend: {
          show: this._props.showLegend,
          bottom: 0
        },
        color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272"]
      };

      switch (chartType) {
        case "bar":
          return {
            ...option,
            xAxis: {
              type: "category",
              data: categories,
              axisLabel: { rotate: categories.length > 6 ? 45 : 0 }
            },
            yAxis: { type: "value" },
            grid: { left: "3%", right: "4%", bottom: "15%", containLabel: true },
            series: [{
              type: "bar",
              data: values,
              itemStyle: { borderRadius: [4, 4, 0, 0] }
            }]
          };

        case "line":
          return {
            ...option,
            xAxis: {
              type: "category",
              data: categories,
              boundaryGap: false
            },
            yAxis: { type: "value" },
            grid: { left: "3%", right: "4%", bottom: "15%", containLabel: true },
            series: [{
              type: "line",
              data: values,
              smooth: true,
              areaStyle: { opacity: 0.3 }
            }]
          };

        case "pie":
          return {
            ...option,
            series: [{
              type: "pie",
              radius: ["40%", "70%"],
              center: ["50%", "55%"],
              data: categories.map((name, i) => ({
                name,
                value: values[i]
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                formatter: "{b}: {d}%"
              }
            }]
          };

        case "horizontal-bar":
          return {
            ...option,
            xAxis: { type: "value" },
            yAxis: {
              type: "category",
              data: categories
            },
            grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
            series: [{
              type: "bar",
              data: values,
              itemStyle: { borderRadius: [0, 4, 4, 0] }
            }]
          };

        default:
          return option;
      }
    }

    // Property getters/setters
    get title() { return this._props.title; }
    set title(v) { this._props.title = v; }
    get chartType() { return this._props.chartType; }
    set chartType(v) { this._props.chartType = v; }
    get showLegend() { return this._props.showLegend; }
    set showLegend(v) { this._props.showLegend = v; }
  }

  customElements.define("echarts-databound", EchartsDatabound);
})();
```

---

## Common Chart Types

### Sankey Diagram

```javascript
_buildSankeyOption(data) {
  return {
    series: [{
      type: "sankey",
      layout: "none",
      emphasis: { focus: "adjacency" },
      data: data.nodes, // [{name: "A"}, {name: "B"}]
      links: data.links // [{source: "A", target: "B", value: 100}]
    }]
  };
}
```

### Treemap

```javascript
_buildTreemapOption(data) {
  return {
    series: [{
      type: "treemap",
      data: data, // [{name: "A", value: 100, children: [...]}]
      levels: [
        { itemStyle: { borderWidth: 3 } },
        { itemStyle: { borderWidth: 1 } }
      ]
    }]
  };
}
```

### Radar Chart

```javascript
_buildRadarOption(categories, values) {
  return {
    radar: {
      indicator: categories.map(name => ({ name, max: Math.max(...values) * 1.2 }))
    },
    series: [{
      type: "radar",
      data: [{ value: values, name: "Values" }]
    }]
  };
}
```

### Gauge Chart

```javascript
_buildGaugeOption(value, target) {
  return {
    series: [{
      type: "gauge",
      progress: { show: true, width: 18 },
      axisLine: { lineStyle: { width: 18 } },
      axisTick: { show: false },
      splitLine: { length: 15, lineStyle: { width: 2 } },
      axisLabel: { distance: 25 },
      detail: {
        valueAnimation: true,
        formatter: "{value}%",
        fontSize: 24
      },
      data: [{ value: value, name: "Progress" }]
    }]
  };
}
```

---

## Styling Panel for ECharts

### echarts-styling.js

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
      .panel { padding: 12px; }
      .field { margin-bottom: 16px; }
      label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: #32363a;
      }
      select, input[type="text"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #89919a;
        border-radius: 4px;
        font-size: 13px;
      }
      .checkbox-field {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .color-row {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .color-input {
        width: 32px;
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
        <label>Chart Type</label>
        <select id="chartTypeSelect">
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="horizontal-bar">Horizontal Bar</option>
        </select>
      </div>
      <div class="field checkbox-field">
        <input type="checkbox" id="legendCheckbox" />
        <label for="legendCheckbox">Show Legend</label>
      </div>
      <div class="field">
        <label>Colors</label>
        <div class="color-row">
          <input type="color" class="color-input" id="color1" value="#5470c6" />
          <input type="color" class="color-input" id="color2" value="#91cc75" />
          <input type="color" class="color-input" id="color3" value="#fac858" />
          <input type="color" class="color-input" id="color4" value="#ee6666" />
          <input type="color" class="color-input" id="color5" value="#73c0de" />
        </div>
      </div>
    </div>
  `;

  class EchartsStyling extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};

      // Title
      this._shadowRoot.getElementById("titleInput").addEventListener("change", (e) => {
        this._fire({ title: e.target.value });
      });

      // Chart type
      this._shadowRoot.getElementById("chartTypeSelect").addEventListener("change", (e) => {
        this._fire({ chartType: e.target.value });
      });

      // Legend
      this._shadowRoot.getElementById("legendCheckbox").addEventListener("change", (e) => {
        this._fire({ showLegend: e.target.checked });
      });

      // Colors
      for (let i = 1; i <= 5; i++) {
        this._shadowRoot.getElementById(`color${i}`).addEventListener("input", () => {
          this._updateColors();
        });
      }
    }

    _fire(properties) {
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties }
      }));
    }

    _updateColors() {
      const colors = [];
      for (let i = 1; i <= 5; i++) {
        colors.push(this._shadowRoot.getElementById(`color${i}`).value);
      }
      this._fire({ colorScheme: colors.join(",") });
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      if (changedProperties.title !== undefined) {
        this._shadowRoot.getElementById("titleInput").value = changedProperties.title;
      }
      if (changedProperties.chartType !== undefined) {
        this._shadowRoot.getElementById("chartTypeSelect").value = changedProperties.chartType;
      }
      if (changedProperties.showLegend !== undefined) {
        this._shadowRoot.getElementById("legendCheckbox").checked = changedProperties.showLegend;
      }
      if (changedProperties.colorScheme !== undefined) {
        const colors = changedProperties.colorScheme.split(",");
        colors.forEach((color, i) => {
          const input = this._shadowRoot.getElementById(`color${i + 1}`);
          if (input) input.value = color.trim();
        });
      }
    }
  }

  customElements.define("echarts-styling", EchartsStyling);
})();
```

---

## Performance Considerations

### 1. Lazy Load ECharts

Only load when widget is used:

```javascript
_loadEcharts() {
  return new Promise((resolve, reject) => {
    if (window.echarts) {
      resolve(window.echarts);
      return;
    }

    const script = document.createElement("script");
    script.src = ECHARTS_CDN;
    script.onload = () => resolve(window.echarts);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
```

### 2. Debounce Resize

```javascript
onCustomWidgetResize() {
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

### 3. Use notMerge for Large Updates

```javascript
this._chart.setOption(option, { notMerge: true });
```

### 4. Limit Data Points

```javascript
_parseDataBinding() {
  const data = this.chartData.data;
  const MAX_POINTS = 100;

  // Limit data for performance
  const limitedData = data.slice(0, MAX_POINTS);
  // ... parse data
}
```

### 5. Dispose on Destroy

```javascript
onCustomWidgetDestroy() {
  if (this._chart) {
    this._chart.dispose();
    this._chart = null;
  }
}
```

---

## ECharts Resources

- **ECharts Documentation**: https://echarts.apache.org/en/index.html
- **ECharts Examples**: https://echarts.apache.org/examples/en/index.html
- **ECharts Option Reference**: https://echarts.apache.org/en/option.html
- **ECharts CDN**: https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js

---

**Last Updated**: 2025-11-22
