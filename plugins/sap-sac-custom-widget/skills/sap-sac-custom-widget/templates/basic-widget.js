/**
 * SAP Analytics Cloud - Basic Custom Widget Template
 *
 * A minimal Web Component template for SAC custom widgets.
 * Includes all required lifecycle functions and proper SAC integration.
 *
 * Usage:
 * 1. Copy this file and widget.json-minimal to your project
 * 2. Rename the class and update customElements.define()
 * 3. Update the tag in both files to match
 * 4. Add your rendering logic in _render()
 *
 * @version 1.0.0
 * @sac-version 2025.21
 */
(function() {
  // Template with Shadow DOM styles
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      /* Host element - required for proper sizing */
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: var(--sapFontFamily, "72", Arial, sans-serif);
        color: var(--sapTextColor, #333);
        box-sizing: border-box;
      }

      /* Main container */
      .widget-container {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
        overflow: hidden;
      }

      /* Title area */
      .widget-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--sapTitleColor, #333);
      }

      /* Content area */
      .widget-content {
        width: 100%;
        height: calc(100% - 40px);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--sapBackgroundColor, #f7f7f7);
        border-radius: 4px;
      }
    </style>
    <div class="widget-container">
      <div class="widget-title" id="title"></div>
      <div class="widget-content" id="content">
        <!-- Your widget content goes here -->
      </div>
    </div>
  `;

  /**
   * BasicWidget - SAC Custom Widget
   *
   * A basic custom widget that demonstrates the required structure
   * and lifecycle functions for SAP Analytics Cloud integration.
   */
  class BasicWidget extends HTMLElement {
    constructor() {
      super();

      // Create Shadow DOM for style encapsulation
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      // Initialize properties storage
      this._props = {};

      // Cache DOM references for performance
      this._titleEl = this._shadowRoot.getElementById("title");
      this._contentEl = this._shadowRoot.getElementById("content");
    }

    /**
     * Called when the element is added to the DOM.
     * Use for initial setup that requires DOM presence.
     */
    connectedCallback() {
      // Optional: Initial setup when added to DOM
    }

    /**
     * SAC Lifecycle: Called BEFORE properties are updated.
     * Use to store incoming properties.
     *
     * @param {Object} changedProperties - Properties being changed
     */
    onCustomWidgetBeforeUpdate(changedProperties) {
      // Merge new properties with existing
      this._mergeProperties(changedProperties);
    }

    /**
     * SAC Lifecycle: Called AFTER properties are updated.
     * This is where you should render your widget.
     *
     * @param {Object} changedProperties - Properties that changed
     */
    onCustomWidgetAfterUpdate(changedProperties) {
      this._render();
    }

    /**
     * SAC Lifecycle: Called when the widget is resized.
     * Use to adjust layout or re-render if needed.
     */
    onCustomWidgetResize() {
      // Re-render to adjust to new size
      this._render();
    }

    /**
     * SAC Lifecycle: Called when the widget is removed.
     * Use to clean up resources (event listeners, timers, etc.)
     */
    onCustomWidgetDestroy() {
      // Cleanup resources
      // Example: Clear intervals, remove event listeners, dispose charts
    }

    // ========== Property Getters/Setters ==========

    /**
     * Title property getter
     */
    get title() {
      return this._props.title;
    }

    /**
     * Title property setter
     * Dispatches propertiesChanged event for SAC two-way binding
     */
    set title(value) {
      this._props.title = value;
      this._dispatchPropertiesChanged({ title: value });
    }

    // ========== Private Methods ==========

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

    /**
     * Dispatch propertiesChanged event for SAC framework integration.
     * Always call this when a property changes to enable two-way binding.
     *
     * @param {Object} changedProps - Object with changed property values
     */
    _dispatchPropertiesChanged(changedProps) {
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties: changedProps }
      }));
    }

    /**
     * Main render function.
     * Add your rendering logic here.
     */
    _render() {
      // Update title if changed
      if (this._titleEl && this._props.title !== undefined) {
        this._titleEl.textContent = this._props.title;
      }

      // Update content
      if (this._contentEl) {
        // Add your custom rendering logic here
        this._contentEl.textContent = "Hello from Basic Widget!";
      }
    }
  }

  // Register the custom element
  // IMPORTANT: Update this tag to match your widget.json
  customElements.define("com-company-mywidget", BasicWidget);
})();
