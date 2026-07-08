(function() {
  "use strict";

  var DEFAULT_RESOURCE_EXCLUDED_EXTENSIONS = [".html", ".css", ".md", ".json"];
  var DEFAULT_RESOURCE_EXCLUDED_PATHS = ["design-runtime/", "local-builder/"];
  var encoder = new TextEncoder();
  var config = readEmbeddedConfig();
  var RESOURCE_EXCLUDED_EXTENSIONS = configStringList(config.resourceZipExcludedExtensions, DEFAULT_RESOURCE_EXCLUDED_EXTENSIONS);
  var RESOURCE_EXCLUDED_PATHS = configStringList(config.resourceZipExcludedPaths, DEFAULT_RESOURCE_EXCLUDED_PATHS);
  var patternHints = config.patternHints || [];
  var defaults = config.defaults || {};
  var state = {
    metadata: {
      name: defaults.name || "Local Builder Widget",
      id: defaults.id || "com.company.localbuilderwidget",
      version: defaults.version || "1.0.0",
      vendor: defaults.vendor || "Company Name",
      description: defaults.description || "Generated with the local SAC custom widget builder",
      license: defaults.license || "MIT",
      icon: defaults.icon || "",
      tag: defaults.tag || "com-company-localbuilderwidget",
      newInstancePrefix: defaults.newInstancePrefix || "LocalBuilderWidget",
      includeBuilder: defaults.includeBuilder !== false,
      includeStyling: defaults.includeStyling !== false,
      supportsMobile: defaults.supportsMobile !== false,
      supportsExport: Boolean(defaults.supportsExport),
      supportsBookmark: defaults.supportsBookmark !== false
    },
    bindingId: "myDataBinding",
    feeds: clone(config.defaultFeeds || []),
    properties: clone(config.defaultProperties || []),
    methods: [],
    events: [],
    sampleRows: clone(config.sampleRows || [])
  };

  function $(id) {
    return document.getElementById(id);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || []));
  }

  function configStringList(value, fallback) {
    if (!Array.isArray(value)) {
      return fallback.slice();
    }
    return value.filter(function(item) {
      return typeof item === "string" && item;
    }).map(function(item) {
      return item.toLowerCase();
    });
  }

  function readEmbeddedConfig() {
    var el = $("local-builder-config");
    if (!el) {
      return { schema: "sap-sac-widget-local-builder/v1" };
    }
    try {
      return JSON.parse(el.textContent);
    } catch (error) {
      return { schema: "sap-sac-widget-local-builder/v1", loadError: error.message };
    }
  }

  function setStatus(message, tone) {
    var status = $("status");
    status.textContent = message || "";
    status.className = "status" + (tone ? " " + tone : "");
  }

  function setRuntimeMode() {
    var mode = $("runtimeMode");
    if (!mode) {
      return;
    }
    if (window.location.protocol === "file:") {
      mode.textContent = "File mode. Use server.mjs only if your browser blocks local downloads.";
    } else {
      mode.textContent = "Loopback server mode. All files remain local to this machine.";
    }
  }

  function slugify(text) {
    return String(text || "widget")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "widget";
  }

  function pascalCase(text) {
    var parts = String(text || "Widget").replace(/[^A-Za-z0-9]+/g, " ").trim().split(/\s+/);
    var out = parts.map(function(part) {
      return part.charAt(0).toUpperCase() + part.slice(1).replace(/[^A-Za-z0-9]/g, "");
    }).join("");
    return out || "Widget";
  }

  function manifestIdFromName(name) {
    return "com.company." + slugify(name).replace(/-/g, "");
  }

  function tagFromId(id) {
    return String(id || "com.company.widget").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function propertyNameFromLabel(label) {
    var text = String(label || "property").replace(/[^A-Za-z0-9]+/g, " ").trim();
    if (!text) {
      return "property";
    }
    var parts = text.split(/\s+/);
    var first = parts.shift().toLowerCase();
    var rest = parts.map(function(part) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join("");
    var name = first + rest;
    if (!/^[A-Za-z_$]/.test(name)) {
      name = "property" + name;
    }
    return name;
  }

  function toJsIdentifier(name) {
    var id = String(name || "property").replace(/[^A-Za-z0-9_$]/g, "");
    if (!id || !/^[A-Za-z_$]/.test(id)) {
      id = "property" + id;
    }
    return id;
  }

  function parseDefault(value, type) {
    if (type === "boolean") {
      return value === true || value === "true";
    }
    if (type === "integer") {
      return parseInt(value, 10) || 0;
    }
    if (type === "number") {
      return parseFloat(value) || 0;
    }
    return value === undefined || value === null ? "" : String(value);
  }

  function initForm() {
    $("widgetName").value = state.metadata.name;
    $("widgetId").value = state.metadata.id;
    $("widgetVersion").value = state.metadata.version;
    $("widgetVendor").value = state.metadata.vendor;
    $("widgetDescription").value = state.metadata.description;
    $("widgetIcon").value = state.metadata.icon;
    $("componentTag").value = state.metadata.tag;
    $("newInstancePrefix").value = state.metadata.newInstancePrefix;
    $("includeBuilder").checked = state.metadata.includeBuilder;
    $("includeStyling").checked = state.metadata.includeStyling;
    $("supportsMobile").checked = state.metadata.supportsMobile;
    $("supportsExport").checked = state.metadata.supportsExport;
    $("supportsBookmark").checked = state.metadata.supportsBookmark;
    $("bindingId").value = state.bindingId;
    $("sampleDataEditor").value = JSON.stringify(state.sampleRows, null, 2);
  }

  function wireStaticEvents() {
    ["widgetName", "widgetId", "widgetVersion", "widgetVendor", "widgetDescription", "widgetIcon", "componentTag", "newInstancePrefix"].forEach(function(id) {
      $(id).addEventListener("input", function() {
        readMetadata();
        if (id === "widgetName") {
          state.metadata.id = manifestIdFromName(state.metadata.name);
          state.metadata.tag = tagFromId(state.metadata.id);
          state.metadata.newInstancePrefix = pascalCase(state.metadata.name);
          $("widgetId").value = state.metadata.id;
          $("componentTag").value = state.metadata.tag;
          $("newInstancePrefix").value = state.metadata.newInstancePrefix;
        }
        renderAll();
      });
    });
    ["includeBuilder", "includeStyling", "supportsMobile", "supportsExport", "supportsBookmark"].forEach(function(id) {
      $(id).addEventListener("change", function() {
        readMetadata();
        renderAll();
      });
    });
    $("bindingId").addEventListener("input", function(event) {
      state.bindingId = propertyNameFromLabel(event.target.value || "myDataBinding");
      $("bindingId").value = state.bindingId;
      renderAll();
    });
    $("sampleDataEditor").addEventListener("input", function() {
      try {
        state.sampleRows = JSON.parse($("sampleDataEditor").value || "[]");
        setStatus("Sample data parsed.", "good");
        renderAll();
      } catch (error) {
        setStatus("Sample data JSON is invalid: " + error.message, "error");
      }
    });
    $("addPropertyButton").addEventListener("click", function() {
      addProperty("string");
    });
    $("addFeedButton").addEventListener("click", addFeed);
    $("addMethodButton").addEventListener("click", addMethod);
    $("addEventButton").addEventListener("click", addEvent);
    $("copyManifestButton").addEventListener("click", copyManifest);
    ["downloadManifestButton", "downloadManifestTop"].forEach(function(id) {
      $(id).addEventListener("click", downloadManifest);
    });
    ["downloadZipButton", "downloadZipTop"].forEach(function(id) {
      $(id).addEventListener("click", downloadResourceZip);
    });
    $("downloadAllButton").addEventListener("click", function() {
      downloadManifest();
      window.setTimeout(downloadResourceZip, 250);
    });
  }

  function readMetadata() {
    state.metadata.name = $("widgetName").value.trim() || "Local Builder Widget";
    state.metadata.id = $("widgetId").value.trim() || manifestIdFromName(state.metadata.name);
    state.metadata.version = $("widgetVersion").value.trim() || "1.0.0";
    state.metadata.vendor = $("widgetVendor").value.trim() || "Company Name";
    state.metadata.description = $("widgetDescription").value.trim();
    state.metadata.icon = $("widgetIcon").value.trim();
    state.metadata.tag = $("componentTag").value.trim() || tagFromId(state.metadata.id);
    state.metadata.newInstancePrefix = $("newInstancePrefix").value.trim() || pascalCase(state.metadata.name);
    state.metadata.includeBuilder = $("includeBuilder").checked;
    state.metadata.includeStyling = $("includeStyling").checked;
    state.metadata.supportsMobile = $("supportsMobile").checked;
    state.metadata.supportsExport = $("supportsExport").checked;
    state.metadata.supportsBookmark = $("supportsBookmark").checked;
  }

  function renderPalette() {
    var host = $("palette");
    host.innerHTML = "";
    (config.controlPalette || []).forEach(function(item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "secondary";
      button.textContent = item.label;
      button.addEventListener("click", function() {
        addProperty(item.type);
      });
      host.appendChild(button);
    });
  }

  function renderPatternHints() {
    var host = $("patternHintButtons");
    if (!host) {
      return;
    }
    host.innerHTML = "";
    patternHints.forEach(function(hint) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "pattern-hint" + (hint.mode === "reference-only" ? " reference" : "");
      button.setAttribute("data-pattern-id", hint.id);
      var title = document.createElement("strong");
      title.textContent = hint.label;
      var description = document.createElement("span");
      description.textContent = hint.description;
      button.appendChild(title);
      button.appendChild(description);
      button.addEventListener("click", function() {
        applyPatternHint(hint.id);
      });
      host.appendChild(button);
    });
  }

  function findPatternHint(id) {
    for (var i = 0; i < patternHints.length; i++) {
      if (patternHints[i].id === id) {
        return patternHints[i];
      }
    }
    return null;
  }

  function applyPatternHint(id) {
    var hint = findPatternHint(id);
    if (!hint) {
      setStatus("Pattern hint not found.", "error");
      return;
    }
    if (hint.mode === "reference-only") {
      setStatus(hint.lesson, "good");
      return;
    }
    var prefill = hint.prefill || {};
    readMetadata();
    if (prefill.components) {
      if (typeof prefill.components.includeBuilder === "boolean") {
        state.metadata.includeBuilder = prefill.components.includeBuilder;
      }
      if (typeof prefill.components.includeStyling === "boolean") {
        state.metadata.includeStyling = prefill.components.includeStyling;
      }
    }
    if (prefill.supportFlags) {
      if (typeof prefill.supportFlags.supportsMobile === "boolean") {
        state.metadata.supportsMobile = prefill.supportFlags.supportsMobile;
      }
      if (typeof prefill.supportFlags.supportsExport === "boolean") {
        state.metadata.supportsExport = prefill.supportFlags.supportsExport;
      }
      if (typeof prefill.supportFlags.supportsBookmark === "boolean") {
        state.metadata.supportsBookmark = prefill.supportFlags.supportsBookmark;
      }
    }
    state.bindingId = prefill.bindingId || state.bindingId;
    state.properties = clone(prefill.properties || state.properties);
    state.feeds = clone(prefill.feeds || []);
    state.methods = clone(prefill.methods || []);
    state.events = clone(prefill.events || []);
    initForm();
    renderAll();
    setStatus("Applied pattern: " + hint.label + ". " + hint.lesson, "good");
  }

  function addProperty(controlType) {
    var paletteItem = findPaletteItem(controlType);
    var label = paletteItem.label || "Property";
    var name = uniqueName(propertyNameFromLabel(label), state.properties.map(function(item) { return item.name; }));
    state.properties.push({
      name: name,
      label: label,
      type: paletteItem.propertyType || "string",
      control: controlType,
      default: paletteItem.default,
      description: label
    });
    renderAll();
  }

  function findPaletteItem(type) {
    var items = config.controlPalette || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].type === type) {
        return items[i];
      }
    }
    return { type: "string", label: "Text input", propertyType: "string", default: "" };
  }

  function uniqueName(base, existing) {
    var name = base;
    var index = 2;
    while (existing.indexOf(name) !== -1) {
      name = base + index;
      index += 1;
    }
    return name;
  }

  function addFeed() {
    state.feeds.push({
      id: uniqueName("feed", state.feeds.map(function(item) { return item.id; })),
      description: "Feed",
      type: "dimension"
    });
    renderAll();
  }

  function addMethod() {
    state.methods.push({
      name: uniqueName("refresh", state.methods.map(function(item) { return item.name; })),
      description: "Method exposed to SAC scripting"
    });
    renderAll();
  }

  function addEvent() {
    state.events.push({
      name: uniqueName("onSelectionChange", state.events.map(function(item) { return item.name; })),
      description: "Event dispatched by the widget"
    });
    renderAll();
  }

  function renderRows() {
    renderPropertyRows();
    renderFeedRows();
    renderNamedRows("methodRows", state.methods, "method");
    renderNamedRows("eventRows", state.events, "event");
  }

  function renderPropertyRows() {
    var host = $("propertyRows");
    host.innerHTML = "";
    state.properties.forEach(function(property, index) {
      var card = document.createElement("div");
      card.className = "row-card";
      card.appendChild(rowGrid([
        inputField("Name", property.name, function(value) {
          property.name = propertyNameFromLabel(value);
          renderGeneratedPreview();
        }),
        inputField("Label", property.label, function(value) {
          property.label = value;
          renderGeneratedPreview();
        }),
        selectField("Type", property.type, ["string", "integer", "number", "boolean", "array", "object"], function(value) {
          property.type = value;
          property.default = parseDefault(property.default, value);
          renderGeneratedPreview();
        }),
        selectField("Control", property.control, (config.controlPalette || []).map(function(item) { return item.type; }), function(value) {
          property.control = value;
          renderGeneratedPreview();
        }),
        inputField("Default", property.default, function(value) {
          property.default = parseDefault(value, property.type);
          renderGeneratedPreview();
        }),
        inputField("Description", property.description || "", function(value) {
          property.description = value;
          renderGeneratedPreview();
        })
      ]));
      card.appendChild(actions(function() {
        state.properties.splice(index, 1);
        renderAll();
      }));
      host.appendChild(card);
    });
  }

  function renderFeedRows() {
    var host = $("feedRows");
    host.innerHTML = "";
    state.feeds.forEach(function(feed, index) {
      var card = document.createElement("div");
      card.className = "row-card";
      card.appendChild(rowGrid([
        inputField("ID", feed.id, function(value) {
          feed.id = propertyNameFromLabel(value);
          renderGeneratedPreview();
        }),
        inputField("Description", feed.description, function(value) {
          feed.description = value;
          renderGeneratedPreview();
        }),
        selectField("Type", feed.type, ["dimension", "mainStructureMember", "measure"], function(value) {
          feed.type = value;
          renderGeneratedPreview();
        })
      ]));
      card.appendChild(actions(function() {
        state.feeds.splice(index, 1);
        renderAll();
      }));
      host.appendChild(card);
    });
  }

  function renderNamedRows(hostId, list, kind) {
    var host = $(hostId);
    host.innerHTML = "";
    list.forEach(function(item, index) {
      var card = document.createElement("div");
      card.className = "row-card";
      card.appendChild(rowGrid([
        inputField(kind + " name", item.name, function(value) {
          item.name = propertyNameFromLabel(value);
          renderGeneratedPreview();
        }),
        inputField("Description", item.description, function(value) {
          item.description = value;
          renderGeneratedPreview();
        })
      ]));
      card.appendChild(actions(function() {
        list.splice(index, 1);
        renderAll();
      }));
      host.appendChild(card);
    });
  }

  function rowGrid(children) {
    var grid = document.createElement("div");
    grid.className = "row-grid";
    children.forEach(function(child) {
      grid.appendChild(child);
    });
    return grid;
  }

  function inputField(labelText, value, onInput) {
    var label = document.createElement("label");
    label.textContent = labelText;
    var input = document.createElement("input");
    input.type = "text";
    input.value = value === undefined || value === null ? "" : value;
    input.addEventListener("input", function() {
      onInput(input.value);
    });
    label.appendChild(input);
    return label;
  }

  function selectField(labelText, value, options, onChange) {
    var label = document.createElement("label");
    label.textContent = labelText;
    var select = document.createElement("select");
    options.forEach(function(optionValue) {
      var option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue;
      select.appendChild(option);
    });
    select.value = value;
    select.addEventListener("change", function() {
      onChange(select.value);
    });
    label.appendChild(select);
    return label;
  }

  function actions(onDelete) {
    var row = document.createElement("div");
    row.className = "row-actions";
    var button = document.createElement("button");
    button.type = "button";
    button.className = "danger";
    button.textContent = "Remove";
    button.addEventListener("click", onDelete);
    row.appendChild(button);
    return row;
  }

  function buildManifest() {
    readMetadata();
    var components = [
      component("main", state.metadata.tag, "/" + config.componentFileNames.main)
    ];
    if (state.metadata.includeBuilder) {
      components.push(component("builder", state.metadata.tag + "-builder", "/" + config.componentFileNames.builder));
    }
    if (state.metadata.includeStyling) {
      components.push(component("styling", state.metadata.tag + "-styling", "/" + config.componentFileNames.styling));
    }

    var manifest = {
      id: state.metadata.id,
      version: state.metadata.version,
      name: state.metadata.name,
      description: state.metadata.description,
      vendor: state.metadata.vendor,
      license: state.metadata.license || "MIT",
      icon: state.metadata.icon,
      newInstancePrefix: state.metadata.newInstancePrefix,
      supportsMobile: state.metadata.supportsMobile,
      supportsExport: state.metadata.supportsExport,
      supportsBookmark: state.metadata.supportsBookmark,
      webcomponents: components,
      properties: manifestProperties(),
      methods: objectFromNamedList(state.methods),
      events: objectFromNamedList(state.events)
    };
    if (state.feeds.length > 0) {
      manifest.dataBindings = {};
      manifest.dataBindings[state.bindingId || "myDataBinding"] = { feeds: state.feeds };
    }
    return manifest;
  }

  function component(kind, tag, url) {
    return {
      kind: kind,
      tag: tag,
      url: url,
      integrity: "",
      ignoreIntegrity: true
    };
  }

  function manifestProperties() {
    var out = {};
    state.properties.forEach(function(property) {
      out[property.name] = {
        type: property.type,
        description: property.description || property.label || property.name,
        default: parseDefault(property.default, property.type)
      };
    });
    return out;
  }

  function objectFromNamedList(list) {
    var out = {};
    list.forEach(function(item) {
      if (item.name) {
        out[item.name] = { description: item.description || item.name };
      }
    });
    return out;
  }

  function buildFiles() {
    var files = {};
    files[config.componentFileNames.main] = buildMainComponent();
    if (state.metadata.includeBuilder) {
      files[config.componentFileNames.builder] = buildPanelComponent("builder", state.metadata.tag + "-builder");
    }
    if (state.metadata.includeStyling) {
      files[config.componentFileNames.styling] = buildPanelComponent("styling", state.metadata.tag + "-styling");
    }
    return files;
  }

  function defaultsObject() {
    var out = {};
    state.properties.forEach(function(property) {
      out[property.name] = parseDefault(property.default, property.type);
    });
    return out;
  }

  function buildMainComponent() {
    var className = pascalCase(state.metadata.name);
    var tag = state.metadata.tag;
    var bindingId = state.bindingId || "myDataBinding";
    var defaultsJson = JSON.stringify(defaultsObject(), null, 6);
    var accessors = state.properties.map(function(property) {
      var id = toJsIdentifier(property.name);
      var name = JSON.stringify(property.name);
      return [
        "    get " + id + "() { return this._props[" + name + "]; }",
        "    set " + id + "(value) {",
        "      this._props[" + name + "] = value;",
        "      this.dispatchEvent(new CustomEvent(\"propertiesChanged\", { detail: { properties: { " + id + ": value } } }));",
        "      this._render();",
        "    }"
      ].join("\n");
    }).join("\n\n");

    return [
      "(function() {",
      "  \"use strict\";",
      "",
      "  var template = document.createElement(\"template\");",
      "  template.innerHTML = [",
      "    \"<style>\",",
      "    \":host{display:block;width:100%;height:100%;font-family:var(--sapFontFamily,Arial,sans-serif);color:var(--sapTextColor,#1d2d3e);}\",",
      "    \".wrap{box-sizing:border-box;height:100%;padding:16px;background:var(--sapBackgroundColor,#fff);}\",",
      "    \".title{font-size:16px;font-weight:700;margin-bottom:12px;}\",",
      "    \".bar{align-items:center;display:grid;gap:8px;grid-template-columns:minmax(90px,1fr) 3fr auto;margin:8px 0;}\",",
      "    \".track{background:#e5eef7;border-radius:4px;height:12px;overflow:hidden;}\",",
      "    \".fill{background:var(--widget-primary-color,#0a6ed1);height:100%;}\",",
      "    \".empty{color:#6a6d70;font-size:12px;}\",",
      "    \"</style>\",",
      "    \"<div class=\\\"wrap\\\"><div id=\\\"title\\\" class=\\\"title\\\"></div><div id=\\\"content\\\"></div></div>\"",
      "  ].join(\"\");",
      "",
      "  function assign(target, source) {",
      "    source = source || {};",
      "    Object.keys(source).forEach(function(key) { target[key] = source[key]; });",
      "    return target;",
      "  }",
      "",
      "  function escapeText(value) {",
      "    return String(value === undefined || value === null ? \"\" : value);",
      "  }",
      "",
      "  class " + className + " extends HTMLElement {",
      "    constructor() {",
      "      super();",
      "      this._shadowRoot = this.attachShadow({ mode: \"open\" });",
      "      this._shadowRoot.appendChild(template.content.cloneNode(true));",
      "      this._props = assign({}, " + defaultsJson.replace(/\n/g, "\n      ") + ");",
      "    }",
      "",
      "    connectedCallback() { this._render(); }",
      "",
      "    onCustomWidgetBeforeUpdate(changedProperties) {",
      "      assign(this._props, changedProperties);",
      "    }",
      "",
      "    onCustomWidgetAfterUpdate() { this._render(); }",
      "",
      "    onCustomWidgetResize() { this._render(); }",
      "",
      "    onCustomWidgetDestroy() {}",
      "",
      "    _dataRows() {",
      "      var binding = this[" + JSON.stringify(bindingId) + "] || (this.dataBindings && this.dataBindings.getDataBinding && this.dataBindings.getDataBinding(" + JSON.stringify(bindingId) + "));",
      "      return binding && Array.isArray(binding.data) ? binding.data : [];",
      "    }",
      "",
      "    _render() {",
      "      var titleEl = this._shadowRoot.getElementById(\"title\");",
      "      var contentEl = this._shadowRoot.getElementById(\"content\");",
      "      var color = this._props.primaryColor || \"#0a6ed1\";",
      "      this.style.setProperty(\"--widget-primary-color\", color);",
      "      titleEl.textContent = this._props.title || " + JSON.stringify(state.metadata.name) + ";",
      "      var rows = this._dataRows();",
      "      contentEl.innerHTML = \"\";",
      "      if (!rows.length) {",
      "        var empty = document.createElement(\"div\");",
      "        empty.className = \"empty\";",
      "        empty.textContent = \"Bind data in SAC to populate this widget.\";",
      "        contentEl.appendChild(empty);",
      "        return;",
      "      }",
      "      var max = 0;",
      "      rows.forEach(function(row) {",
      "        var raw = row.measures_0 && typeof row.measures_0.raw === \"number\" ? row.measures_0.raw : 0;",
      "        if (raw > max) { max = raw; }",
      "      });",
      "      rows.forEach(function(row) {",
      "        var label = row.dimensions_0 && row.dimensions_0.label ? row.dimensions_0.label : \"Item\";",
      "        var raw = row.measures_0 && typeof row.measures_0.raw === \"number\" ? row.measures_0.raw : 0;",
      "        var formatted = row.measures_0 && row.measures_0.formatted ? row.measures_0.formatted : String(raw);",
      "        var bar = document.createElement(\"div\");",
      "        bar.className = \"bar\";",
      "        var labelEl = document.createElement(\"div\");",
      "        labelEl.textContent = escapeText(label);",
      "        var track = document.createElement(\"div\");",
      "        track.className = \"track\";",
      "        var fill = document.createElement(\"div\");",
      "        fill.className = \"fill\";",
      "        fill.style.width = max > 0 ? Math.round((raw / max) * 100) + \"%\" : \"0%\";",
      "        var valueEl = document.createElement(\"div\");",
      "        valueEl.textContent = this._props.showValues === false ? \"\" : escapeText(formatted);",
      "        track.appendChild(fill);",
      "        bar.appendChild(labelEl);",
      "        bar.appendChild(track);",
      "        bar.appendChild(valueEl);",
      "        contentEl.appendChild(bar);",
      "      }, this);",
      "    }",
      "",
      accessors,
      "  }",
      "",
      "  customElements.define(" + JSON.stringify(tag) + ", " + className + ");",
      "})();",
      ""
    ].join("\n");
  }

  function buildPanelComponent(kind, tag) {
    var className = pascalCase(state.metadata.name + " " + kind);
    var controls = state.properties.map(function(property) {
      return panelControlHtml(property);
    }).join("");
    var listeners = state.properties.map(function(property) {
      return panelListenerCode(property);
    }).join("\n");
    var sync = state.properties.map(function(property) {
      return panelSyncCode(property);
    }).join("\n");
    var accessors = state.properties.map(function(property) {
      var id = toJsIdentifier(property.name);
      var name = JSON.stringify(property.name);
      return "    get " + id + "() { return this._props[" + name + "]; }\n    set " + id + "(value) { this._props[" + name + "] = value; }";
    }).join("\n");
    return [
      "(function() {",
      "  \"use strict\";",
      "  var template = document.createElement(\"template\");",
      "  template.innerHTML = " + JSON.stringify([
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
        "<div class=\"panel\"><div class=\"section\"><div class=\"title\">" + (kind === "builder" ? "Builder" : "Styling") + " Properties</div>" + controls + "</div><div class=\"hint\">Upload widget.json first, then the Resource-ZIP containing this component.</div></div>"
      ].join("")) + ";",
      "",
      "  function assign(target, source) {",
      "    source = source || {};",
      "    Object.keys(source).forEach(function(key) { target[key] = source[key]; });",
      "    return target;",
      "  }",
      "  function fire(element, properties) {",
      "    element.dispatchEvent(new CustomEvent(\"propertiesChanged\", { detail: { properties: properties } }));",
      "  }",
      "",
      "  class " + className + " extends HTMLElement {",
      "    constructor() {",
      "      super();",
      "      this._shadowRoot = this.attachShadow({ mode: \"open\" });",
      "      this._shadowRoot.appendChild(template.content.cloneNode(true));",
      "      this._props = assign({}, " + JSON.stringify(defaultsObject(), null, 6).replace(/\n/g, "\n      ") + ");",
      "      this._wireEvents();",
      "    }",
      "    _wireEvents() {",
      listeners,
      "    }",
      "    onCustomWidgetBeforeUpdate(changedProperties) { assign(this._props, changedProperties); }",
      "    onCustomWidgetAfterUpdate() {",
      sync,
      "    }",
      accessors,
      "  }",
      "  customElements.define(" + JSON.stringify(tag) + ", " + className + ");",
      "})();",
      ""
    ].join("\n");
  }

  function panelControlHtml(property) {
    var id = "prop_" + toJsIdentifier(property.name);
    var label = escapeHtml(property.label || property.name);
    if (property.control === "boolean" || property.type === "boolean" || property.control === "divider") {
      return "<label class=\"check\"><input id=\"" + id + "\" type=\"checkbox\"><span>" + label + "</span></label>";
    }
    if (property.control === "textarea") {
      return "<label><span>" + label + "</span><textarea id=\"" + id + "\"></textarea></label>";
    }
    if (property.control === "select") {
      var palette = findPaletteItem("select");
      var options = (palette.options || ["standard", "compact", "expanded"]).map(function(option) {
        return "<option value=\"" + escapeHtml(option) + "\">" + escapeHtml(option) + "</option>";
      }).join("");
      return "<label><span>" + label + "</span><select id=\"" + id + "\">" + options + "</select></label>";
    }
    if (property.control === "slider") {
      return "<label><span>" + label + "</span><input id=\"" + id + "\" type=\"range\" min=\"0\" max=\"100\"></label>";
    }
    return "<label><span>" + label + "</span><input id=\"" + id + "\" type=\"text\"></label>";
  }

  function panelListenerCode(property) {
    var id = "prop_" + toJsIdentifier(property.name);
    var name = JSON.stringify(property.name);
    var eventName = property.type === "boolean" || property.control === "boolean" || property.control === "divider" || property.control === "select" ? "change" : "input";
    var readValue = "event.target.value";
    if (property.type === "boolean" || property.control === "boolean" || property.control === "divider") {
      readValue = "event.target.checked";
    } else if (property.type === "integer") {
      readValue = "parseInt(event.target.value, 10) || 0";
    } else if (property.type === "number") {
      readValue = "parseFloat(event.target.value) || 0";
    }
    return [
      "      this._shadowRoot.getElementById(" + JSON.stringify(id) + ").addEventListener(" + JSON.stringify(eventName) + ", function(event) {",
      "        var properties = {};",
      "        properties[" + name + "] = " + readValue + ";",
      "        this._props[" + name + "] = properties[" + name + "];",
      "        fire(this, properties);",
      "      }.bind(this));"
    ].join("\n");
  }

  function panelSyncCode(property) {
    var id = "prop_" + toJsIdentifier(property.name);
    var name = JSON.stringify(property.name);
    if (property.type === "boolean" || property.control === "boolean" || property.control === "divider") {
      return "      this._shadowRoot.getElementById(" + JSON.stringify(id) + ").checked = Boolean(this._props[" + name + "]);";
    }
    return "      this._shadowRoot.getElementById(" + JSON.stringify(id) + ").value = this._props[" + name + "] === undefined ? \"\" : this._props[" + name + "];";
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function resourceZipEntries(files) {
    var out = {};
    Object.keys(files).forEach(function(fileName) {
      var lower = fileName.toLowerCase();
      var excludedExtension = RESOURCE_EXCLUDED_EXTENSIONS.some(function(extension) {
        return lower.endsWith(extension);
      });
      var excludedPath = RESOURCE_EXCLUDED_PATHS.some(function(prefix) {
        return lower.indexOf(prefix) === 0;
      });
      if (!excludedExtension && !excludedPath && lower.endsWith(".js") && fileName.indexOf("/") === -1 && fileName.indexOf("\\") === -1) {
        out[fileName] = files[fileName];
      }
    });
    return out;
  }

  function generatedArtifactNames() {
    return {
      manifest: config.outputNames.manifest || "widget.json",
      resourceZip: slugify(state.metadata.name) + (config.outputNames.resourceZipSuffix || "-resources.zip")
    };
  }

  function renderGeneratedPreview() {
    var manifest = buildManifest();
    $("manifestPreview").textContent = JSON.stringify(manifest, null, 2);
    var files = buildFiles();
    var entries = resourceZipEntries(files);
    var names = generatedArtifactNames();
    var list = $("fileList");
    list.innerHTML = "";
    [names.manifest, names.resourceZip].forEach(function(name) {
      var item = document.createElement("li");
      item.textContent = name;
      list.appendChild(item);
    });
    Object.keys(entries).forEach(function(name) {
      var item = document.createElement("li");
      item.textContent = "Resource-ZIP entry: " + name;
      list.appendChild(item);
    });
  }

  function renderAll() {
    readMetadata();
    renderRows();
    renderGeneratedPreview();
  }

  function downloadManifest() {
    var names = generatedArtifactNames();
    downloadFile(names.manifest, JSON.stringify(buildManifest(), null, 2), "application/json");
    setStatus("Downloaded widget.json. Upload it first in SAC.", "good");
  }

  function downloadResourceZip() {
    var names = generatedArtifactNames();
    var zipBytes = createZip(resourceZipEntries(buildFiles()));
    downloadBlob(names.resourceZip, new Blob([zipBytes], { type: "application/zip" }));
    setStatus("Downloaded Resource-ZIP with root-level JavaScript only.", "good");
  }

  function copyManifest() {
    var text = JSON.stringify(buildManifest(), null, 2);
    if (!navigator.clipboard) {
      setStatus("Clipboard API unavailable. Use Download widget.json instead.", "error");
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      setStatus("Manifest copied.", "good");
    }).catch(function(error) {
      setStatus("Copy failed: " + error.message, "error");
    });
  }

  function downloadFile(filename, content, type) {
    downloadBlob(filename, new Blob([content], { type: type }));
  }

  function downloadBlob(filename, blob) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function crc32(bytes) {
    var table = crc32.table;
    if (!table) {
      table = [];
      for (var i = 0; i < 256; i++) {
        var c = i;
        for (var j = 0; j < 8; j++) {
          c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        table[i] = c >>> 0;
      }
      crc32.table = table;
    }
    var crc = 0xffffffff;
    for (var index = 0; index < bytes.length; index++) {
      crc = table[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function writeU16(out, value) {
    out.push(value & 0xff, (value >>> 8) & 0xff);
  }

  function writeU32(out, value) {
    out.push(value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff);
  }

  function dosTime(date) {
    return (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  }

  function dosDate(date) {
    return ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  }

  function createZip(files) {
    var chunks = [];
    var central = [];
    var offset = 0;
    var now = new Date();
    Object.keys(files).forEach(function(name) {
      var nameBytes = encoder.encode(name);
      var dataBytes = encoder.encode(files[name]);
      var crc = crc32(dataBytes);
      var local = [];
      writeU32(local, 0x04034b50);
      writeU16(local, 20);
      writeU16(local, 0);
      writeU16(local, 0);
      writeU16(local, dosTime(now));
      writeU16(local, dosDate(now));
      writeU32(local, crc);
      writeU32(local, dataBytes.length);
      writeU32(local, dataBytes.length);
      writeU16(local, nameBytes.length);
      writeU16(local, 0);
      chunks.push(Uint8Array.from(local), nameBytes, dataBytes);

      var record = [];
      writeU32(record, 0x02014b50);
      writeU16(record, 20);
      writeU16(record, 20);
      writeU16(record, 0);
      writeU16(record, 0);
      writeU16(record, dosTime(now));
      writeU16(record, dosDate(now));
      writeU32(record, crc);
      writeU32(record, dataBytes.length);
      writeU32(record, dataBytes.length);
      writeU16(record, nameBytes.length);
      writeU16(record, 0);
      writeU16(record, 0);
      writeU16(record, 0);
      writeU16(record, 0);
      writeU32(record, 0);
      writeU32(record, offset);
      central.push(Uint8Array.from(record), nameBytes);
      offset += local.length + nameBytes.length + dataBytes.length;
    });
    var centralSize = central.reduce(function(total, chunk) { return total + chunk.length; }, 0);
    var end = [];
    writeU32(end, 0x06054b50);
    writeU16(end, 0);
    writeU16(end, 0);
    writeU16(end, Object.keys(files).length);
    writeU16(end, Object.keys(files).length);
    writeU32(end, centralSize);
    writeU32(end, offset);
    writeU16(end, 0);
    return concatBytes(chunks.concat(central).concat([Uint8Array.from(end)]));
  }

  function concatBytes(parts) {
    var total = parts.reduce(function(sum, part) { return sum + part.length; }, 0);
    var out = new Uint8Array(total);
    var offset = 0;
    parts.forEach(function(part) {
      out.set(part, offset);
      offset += part.length;
    });
    return out;
  }

  function start() {
    setRuntimeMode();
    if (config.loadError) {
      setStatus("Embedded config failed to parse: " + config.loadError, "error");
    }
    initForm();
    renderPatternHints();
    renderPalette();
    wireStaticEvents();
    renderAll();
  }

  start();
})();
