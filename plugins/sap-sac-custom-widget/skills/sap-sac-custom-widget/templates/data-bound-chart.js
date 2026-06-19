/**
 * SAP Analytics Cloud - Data-Bound Chart Widget Template
 *
 * A template for widgets that bind to SAC model data and render
 * using Apache ECharts library. Demonstrates proper data binding
 * access, ResultSet processing, and chart lifecycle management.
 *
 * Prerequisites:
 * - Include ECharts as a local asset at vendor/echarts.min.js, or load it
 *   through a trusted host that has been explicitly approved for production.
 * - Configure dataBindings in widget.json (see widget.json-complete).
 *
 * @version 1.0.0
 * @sac-version 2025.21
 * @requires echarts 5.x
 */
(function() {
  // Load ECharts if not already loaded.
  // Generated/offline-first packages should copy ECharts to this local path.
  const ECHARTS_LOCAL_PATH = "vendor/echarts.min.js";

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: var(--sapFontFamily, "72", Arial, sans-serif);
      }

      .widget-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .widget-title {
        font-size: 14px;
        font-weight: 600;
        padding: 8px 12px;
        color: var(--sapTitleColor, #333);
        flex-shrink: 0;
      }

      .chart-container {
        flex: 1;
        width: 100%;
        min-height: 0;
      }

      .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--sapNeutralTextColor, #666);
        font-size: 14px;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--sapNeutralTextColor, #666);
      }
    </style>
    <div class="widget-container">
      <div class="widget-title" id="title"></div>
      <div class="chart-container" id="chart">
        <div class="loading">Loading...</div>
      </div>
    </div>
  `;

  class DataBoundChartWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this._props = {};
      this._chart = null;
      this._chartContainer = this._shadowRoot.getElementById("chart");
      this._titleEl = this._shadowRoot.getElementById("title");

      // Debounce resize for performance
      this._resizeTimeout = null;
    }

    connectedCallback() {
      // Load ECharts library if not available
      this._ensureEChartsLoaded();
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._render();
    }

    onCustomWidgetResize() {
      // Debounce resize events for performance
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => {
        if (this._chart) {
          this._chart.resize();
        }
      }, 100);
    }

    onCustomWidgetDestroy() {
      // Clean up chart instance to prevent memory leaks
      clearTimeout(this._resizeTimeout);
      if (this._chart) {
        this._chart.dispose();
        this._chart = null;
      }
    }

    // ========== Properties ==========

    get title() {
      return this._props.title;
    }

    set title(value) {
      this._props.title = value;
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties: { title: value } }
      }));
    }

    get chartType() {
      return this._props.chartType || "bar";
    }

    set chartType(value) {
      this._props.chartType = value;
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties: { chartType: value } }
      }));
    }

    // ========== Data Binding Access ==========

    /**
     * Get data from SAC data binding.
     * IMPORTANT: Always check for null before accessing data.
     *
     * @returns {Object|null} Processed chart data or null if not available
     */
    _getChartData() {
      // Check if dataBindings is available
      if (!this.dataBindings) {
        console.warn("DataBoundChartWidget: dataBindings not available");
        return null;
      }

      // Get the specific data binding configured in widget.json
      const binding = this.dataBindings.getDataBinding("chartData");
      if (!binding) {
        console.warn("DataBoundChartWidget: chartData binding not found");
        return null;
      }

      // Access the data and metadata
      const data = binding.data;
      const metadata = binding.metadata;

      if (!data || data.length === 0) {
        return null;
      }

      // Process data for chart
      // Structure depends on your feed configuration
      const chartData = {
        categories: [],
        values: []
      };

      for (let index = 0; index < data.length; index++) {
        const row = data[index];
        // Access dimension (category) - uses dimensions_0 for first dimension feed
        const dimension = row.dimensions_0;
        const category = dimension ? dimension.label : "Item " + (index + 1);

        // Access measure (value) - uses measures_0 for first measure feed
        const measure = row.measures_0;
        const value = measure ? measure.raw : 0;

        chartData.categories.push(category);
        chartData.values.push(value);
      }

      return chartData;
    }

    // ========== Chart Rendering ==========

    /**
     * Ensure ECharts library is loaded before rendering.
     */
    async _ensureEChartsLoaded() {
      if (typeof echarts !== "undefined") {
        return;
      }

      // Load local ECharts dynamically. Do not replace this with a public CDN
      // URL unless the deployment owner explicitly approves that host.
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = ECHARTS_LOCAL_PATH;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    /**
     * Initialize ECharts instance.
     */
    _initChart() {
      if (typeof echarts === "undefined") {
        console.error("ECharts library not loaded");
        return false;
      }

      if (!this._chart) {
        this._chart = echarts.init(this._chartContainer);
      }
      return true;
    }

    /**
     * Main render function.
     */
    async _render() {
      // Update title
      if (this._titleEl) {
        this._titleEl.textContent = this._props.title || "";
      }

      // Ensure ECharts is loaded
      await this._ensureEChartsLoaded();

      // Get chart data from binding
      const chartData = this._getChartData();

      if (!chartData) {
        // Dispose existing chart instance before replacing innerHTML to prevent memory leak
        if (this._chart) {
          this._chart.dispose();
          this._chart = null;
        }
        this._chartContainer.innerHTML = '<div class="no-data">No data available</div>';
        return;
      }

      // Initialize chart if needed
      if (!this._initChart()) {
        return;
      }

      // Configure and render chart
      const option = this._getChartOption(chartData);
      this._chart.setOption(option);
    }

    /**
     * Generate ECharts configuration based on data.
     *
     * @param {Object} chartData - Processed chart data
     * @returns {Object} ECharts option object
     */
    _getChartOption(chartData) {
      const chartType = this._props.chartType || "bar";

      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: chartData.categories,
          axisLabel: {
            rotate: chartData.categories.length > 5 ? 45 : 0,
            color: "var(--sapTextColor, #333)"
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "var(--sapTextColor, #333)"
          }
        },
        series: [
          {
            type: chartType,
            data: chartData.values,
            itemStyle: {
              color: this._props.barColor || "#1890ff"
            },
            emphasis: {
              itemStyle: {
                color: this._props.barColorHover || "#40a9ff"
              }
            }
          }
        ]
      };
    }
  }

  customElements.define("data-bound-chart-widget", DataBoundChartWidget);
})();
