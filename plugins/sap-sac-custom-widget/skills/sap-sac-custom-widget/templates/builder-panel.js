/**
 * SAP Analytics Cloud Custom Widget - Builder Panel Template
 *
 * Self-contained design-time configuration panel.
 * Keep this file at the Resource-ZIP root as builder.js for SAC upload flows.
 */
(function() {
  "use strict";

  var template = document.createElement("template");
  template.innerHTML = [
    "<style>",
    ":host{display:block;font-family:var(--sapFontFamily,Arial,sans-serif);font-size:12px;color:var(--sapTextColor,#32363a);}",
    ".panel{box-sizing:border-box;padding:12px;width:100%;}",
    ".section{border-bottom:1px solid #d9d9d9;margin-bottom:14px;padding-bottom:12px;}",
    ".section:last-child{border-bottom:0;margin-bottom:0;}",
    ".title{font-weight:700;margin-bottom:8px;}",
    "label{display:block;margin:0 0 10px;}",
    "span{display:block;margin-bottom:4px;}",
    "input,select,textarea{box-sizing:border-box;border:1px solid #89919a;border-radius:4px;font:inherit;padding:7px;width:100%;}",
    "textarea{min-height:72px;resize:vertical;}",
    ".check{align-items:center;display:flex;gap:8px;}",
    ".check input{width:auto;}",
    ".hint{color:#6a6d70;font-size:11px;line-height:1.35;margin-top:6px;}",
    "</style>",
    "<div class=\"panel\">",
    "  <div class=\"section\">",
    "    <div class=\"title\">General</div>",
    "    <label><span>Title</span><input id=\"titleInput\" type=\"text\"></label>",
    "    <label><span>Primary color</span><input id=\"primaryColorInput\" type=\"color\" value=\"#0a6ed1\"></label>",
    "    <label class=\"check\"><input id=\"showValuesInput\" type=\"checkbox\"><span>Show values</span></label>",
    "  </div>",
    "  <div class=\"section\">",
    "    <div class=\"title\">Layout</div>",
    "    <label><span>Display mode</span><select id=\"displayModeInput\"><option value=\"standard\">Standard</option><option value=\"compact\">Compact</option><option value=\"expanded\">Expanded</option></select></label>",
    "    <label><span>Notes</span><textarea id=\"notesInput\"></textarea></label>",
    "    <div class=\"hint\">Use SAC native data binding controls for dimensions and measures.</div>",
    "  </div>",
    "</div>"
  ].join("");

  function assign(target, source) {
    source = source || {};
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
    return target;
  }

  function fire(element, properties) {
    element.dispatchEvent(new CustomEvent("propertiesChanged", {
      detail: { properties: properties }
    }));
  }

  function setValue(root, id, value) {
    var input = root.getElementById(id);
    if (input) {
      input.value = value === undefined || value === null ? "" : value;
    }
  }

  function setChecked(root, id, value) {
    var input = root.getElementById(id);
    if (input) {
      input.checked = Boolean(value);
    }
  }

  function normalizeHexColor(value, fallback) {
    var color = String(value || "").trim();
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      return color.toLowerCase();
    }
    color = String(fallback || "").trim();
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      return color.toLowerCase();
    }
    return "#0a6ed1";
  }

  class SacWidgetBuilderPanel extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {
        title: "Widget Title",
        primaryColor: "#0a6ed1",
        showValues: true,
        displayMode: "standard",
        notes: ""
      };
      this._wireEvents();
    }

    _wireEvents() {
      var root = this._shadowRoot;
      var self = this;
      root.getElementById("titleInput").addEventListener("input", function(event) {
        self._props.title = event.target.value;
        fire(self, { title: event.target.value });
      });
      root.getElementById("primaryColorInput").addEventListener("input", function(event) {
        var value = normalizeHexColor(event.target.value, self._props.primaryColor);
        self._props.primaryColor = value;
        fire(self, { primaryColor: value });
      });
      root.getElementById("showValuesInput").addEventListener("change", function(event) {
        self._props.showValues = event.target.checked;
        fire(self, { showValues: event.target.checked });
      });
      root.getElementById("displayModeInput").addEventListener("change", function(event) {
        self._props.displayMode = event.target.value;
        fire(self, { displayMode: event.target.value });
      });
      root.getElementById("notesInput").addEventListener("input", function(event) {
        self._props.notes = event.target.value;
        fire(self, { notes: event.target.value });
      });
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      assign(this._props, changedProperties);
      this._props.primaryColor = normalizeHexColor(this._props.primaryColor, "#0a6ed1");
    }

    onCustomWidgetAfterUpdate() {
      var root = this._shadowRoot;
      setValue(root, "titleInput", this._props.title);
      setValue(root, "primaryColorInput", normalizeHexColor(this._props.primaryColor, "#0a6ed1"));
      setChecked(root, "showValuesInput", this._props.showValues);
      setValue(root, "displayModeInput", this._props.displayMode);
      setValue(root, "notesInput", this._props.notes);
    }

    get title() { return this._props.title; }
    set title(value) { this._props.title = value; }
    get primaryColor() { return this._props.primaryColor; }
    set primaryColor(value) { this._props.primaryColor = normalizeHexColor(value, this._props.primaryColor); }
    get showValues() { return this._props.showValues; }
    set showValues(value) { this._props.showValues = value; }
    get displayMode() { return this._props.displayMode; }
    set displayMode(value) { this._props.displayMode = value; }
    get notes() { return this._props.notes; }
    set notes(value) { this._props.notes = value; }
  }

  customElements.define("sac-widget-builder-panel", SacWidgetBuilderPanel);
})();
