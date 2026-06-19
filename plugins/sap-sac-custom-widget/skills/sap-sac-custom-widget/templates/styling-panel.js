/**
 * SAP Analytics Cloud - Styling Panel Template
 *
 * A template for the styling panel component that allows users
 * to customize widget appearance at runtime. The styling panel
 * appears in the Designer panel when the widget is selected.
 *
 * Styling panels communicate with the main widget through the
 * propertiesChanged event and property getters/setters.
 *
 * @version 1.0.0
 * @sac-version 2025.21
 */
(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: var(--sapFontFamily, "72", Arial, sans-serif);
        font-size: 13px;
        color: var(--sapTextColor, #333);
        padding: 12px;
      }

      .panel-section {
        margin-bottom: 16px;
      }

      .section-title {
        font-size: 12px;
        font-weight: 600;
        color: var(--sapTitleColor, #333);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .form-group {
        margin-bottom: 12px;
      }

      .form-label {
        display: block;
        font-size: 12px;
        color: var(--sapNeutralTextColor, #666);
        margin-bottom: 4px;
      }

      .form-input {
        width: 100%;
        padding: 6px 8px;
        font-size: 13px;
        border: 1px solid var(--sapField_BorderColor, #bfbfbf);
        border-radius: 3px;
        box-sizing: border-box;
        background-color: var(--sapField_Background, #fff);
        color: var(--sapTextColor, #333);
      }

      .form-input:focus {
        outline: none;
        border-color: var(--sapHighlightColor, #0854a0);
      }

      .form-select {
        width: 100%;
        padding: 6px 8px;
        font-size: 13px;
        border: 1px solid var(--sapField_BorderColor, #bfbfbf);
        border-radius: 3px;
        background-color: var(--sapField_Background, #fff);
        color: var(--sapTextColor, #333);
      }

      .color-picker-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .color-picker {
        width: 32px;
        height: 32px;
        border: 1px solid var(--sapField_BorderColor, #bfbfbf);
        border-radius: 3px;
        cursor: pointer;
        padding: 0;
      }

      .color-value {
        flex: 1;
        font-family: monospace;
        font-size: 12px;
        color: var(--sapNeutralTextColor, #666);
      }

      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .checkbox-label {
        font-size: 13px;
        color: var(--sapTextColor, #333);
        cursor: pointer;
      }

      .divider {
        height: 1px;
        background-color: var(--sapGroup_ContentBorderColor, #e5e5e5);
        margin: 16px 0;
      }
    </style>

    <div class="panel-section">
      <div class="section-title">General</div>

      <div class="form-group">
        <label class="form-label" for="title">Title</label>
        <input type="text" class="form-input" id="title" placeholder="Enter widget title">
      </div>

      <div class="form-group">
        <div class="checkbox-container">
          <input type="checkbox" id="showTitle">
          <label class="checkbox-label" for="showTitle">Show Title</label>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="panel-section">
      <div class="section-title">Appearance</div>

      <div class="form-group">
        <label class="form-label" for="primaryColor">Primary Color</label>
        <div class="color-picker-container">
          <input type="color" class="color-picker" id="primaryColor" value="#1890ff">
          <span class="color-value" id="primaryColorValue">#1890ff</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="backgroundColor">Background Color</label>
        <div class="color-picker-container">
          <input type="color" class="color-picker" id="backgroundColor" value="#ffffff">
          <span class="color-value" id="backgroundColorValue">#ffffff</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="fontSize">Font Size</label>
        <select class="form-select" id="fontSize">
          <option value="small">Small</option>
          <option value="medium" selected>Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>

    <div class="divider"></div>

    <div class="panel-section">
      <div class="section-title">Layout</div>

      <div class="form-group">
        <label class="form-label" for="padding">Padding</label>
        <input type="number" class="form-input" id="padding" value="16" min="0" max="48">
      </div>

      <div class="form-group">
        <label class="form-label" for="borderRadius">Border Radius</label>
        <input type="number" class="form-input" id="borderRadius" value="4" min="0" max="24">
      </div>
    </div>
  `;

  class WidgetStylingPanel extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this._props = {};

      // Bind event handlers
      this._bindEvents();
    }

    /**
     * Bind event listeners to form controls.
     */
    _bindEvents() {
      const panel = this;

      // Title input
      const titleInput = this._shadowRoot.getElementById("title");
      titleInput.addEventListener("input", function(e) {
        panel._updateProperty("title", e.target.value);
      });

      // Show title checkbox
      const showTitleCheckbox = this._shadowRoot.getElementById("showTitle");
      showTitleCheckbox.addEventListener("change", function(e) {
        panel._updateProperty("showTitle", e.target.checked);
      });

      // Primary color
      const primaryColorInput = this._shadowRoot.getElementById("primaryColor");
      const primaryColorValue = this._shadowRoot.getElementById("primaryColorValue");
      primaryColorInput.addEventListener("input", function(e) {
        primaryColorValue.textContent = e.target.value;
        panel._updateProperty("primaryColor", e.target.value);
      });

      // Background color
      const bgColorInput = this._shadowRoot.getElementById("backgroundColor");
      const bgColorValue = this._shadowRoot.getElementById("backgroundColorValue");
      bgColorInput.addEventListener("input", function(e) {
        bgColorValue.textContent = e.target.value;
        panel._updateProperty("backgroundColor", e.target.value);
      });

      // Font size
      const fontSizeSelect = this._shadowRoot.getElementById("fontSize");
      fontSizeSelect.addEventListener("change", function(e) {
        panel._updateProperty("fontSize", e.target.value);
      });

      // Padding
      const paddingInput = this._shadowRoot.getElementById("padding");
      paddingInput.addEventListener("input", function(e) {
        panel._updateProperty("padding", parseInt(e.target.value, 10));
      });

      // Border radius
      const borderRadiusInput = this._shadowRoot.getElementById("borderRadius");
      borderRadiusInput.addEventListener("input", function(e) {
        panel._updateProperty("borderRadius", parseInt(e.target.value, 10));
      });
    }

    /**
     * Update a property and dispatch propertiesChanged event.
     *
     * @param {string} name - Property name
     * @param {*} value - New property value
     */
    _updateProperty(name, value) {
      this._props[name] = value;
      const changedProperties = {};
      changedProperties[name] = value;

      // Dispatch event to SAC framework
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
          properties: changedProperties
        }
      }));
    }

    // ========== SAC Lifecycle Functions ==========

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._mergeProperties(changedProperties);
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._syncFormWithProperties();
    }

    onCustomWidgetResize() {
      // Styling panel typically doesn't need resize handling
    }

    onCustomWidgetDestroy() {
      // Cleanup if needed
    }

    /**
     * Sync form controls with current property values.
     * Called after properties are updated from the main widget.
     */
    _syncFormWithProperties() {
      const props = this._props;

      // Title
      const titleInput = this._shadowRoot.getElementById("title");
      if (props.title !== undefined) {
        titleInput.value = props.title;
      }

      // Show title
      const showTitleCheckbox = this._shadowRoot.getElementById("showTitle");
      if (props.showTitle !== undefined) {
        showTitleCheckbox.checked = props.showTitle;
      }

      // Primary color
      if (props.primaryColor) {
        const primaryColorInput = this._shadowRoot.getElementById("primaryColor");
        const primaryColorValue = this._shadowRoot.getElementById("primaryColorValue");
        primaryColorInput.value = props.primaryColor;
        primaryColorValue.textContent = props.primaryColor;
      }

      // Background color
      if (props.backgroundColor) {
        const bgColorInput = this._shadowRoot.getElementById("backgroundColor");
        const bgColorValue = this._shadowRoot.getElementById("backgroundColorValue");
        bgColorInput.value = props.backgroundColor;
        bgColorValue.textContent = props.backgroundColor;
      }

      // Font size
      if (props.fontSize) {
        const fontSizeSelect = this._shadowRoot.getElementById("fontSize");
        fontSizeSelect.value = props.fontSize;
      }

      // Padding
      if (props.padding !== undefined) {
        const paddingInput = this._shadowRoot.getElementById("padding");
        paddingInput.value = props.padding;
      }

      // Border radius
      if (props.borderRadius !== undefined) {
        const borderRadiusInput = this._shadowRoot.getElementById("borderRadius");
        borderRadiusInput.value = props.borderRadius;
      }
    }

    /**
     * Merge changed properties without relying on newer syntax in generated output.
     *
     * @param {Object} changedProperties - Properties being changed
     */
    _mergeProperties(changedProperties) {
      changedProperties = changedProperties || {};
      for (const key in changedProperties) {
        if (Object.prototype.hasOwnProperty.call(changedProperties, key)) {
          this._props[key] = changedProperties[key];
        }
      }
    }

    // ========== Property Getters/Setters ==========

    get title() { return this._props.title; }
    set title(v) { this._props.title = v; this._syncFormWithProperties(); }

    get showTitle() { return this._props.showTitle; }
    set showTitle(v) { this._props.showTitle = v; this._syncFormWithProperties(); }

    get primaryColor() { return this._props.primaryColor; }
    set primaryColor(v) { this._props.primaryColor = v; this._syncFormWithProperties(); }

    get backgroundColor() { return this._props.backgroundColor; }
    set backgroundColor(v) { this._props.backgroundColor = v; this._syncFormWithProperties(); }

    get fontSize() { return this._props.fontSize; }
    set fontSize(v) { this._props.fontSize = v; this._syncFormWithProperties(); }

    get padding() { return this._props.padding; }
    set padding(v) { this._props.padding = v; this._syncFormWithProperties(); }

    get borderRadius() { return this._props.borderRadius; }
    set borderRadius(v) { this._props.borderRadius = v; this._syncFormWithProperties(); }
  }

  customElements.define("com-company-widgetname-styling", WidgetStylingPanel);
})();
