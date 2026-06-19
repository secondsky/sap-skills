(function() {
  "use strict";

  var app = {
    config: null,
    source: "embedded",
    activeScenarioId: null,
    selectedWidgetId: null,
    tokenScope: "scenario",
    scenarioState: {},
    preparedWidgets: {},
    loadedScripts: {},
    tagOwners: {},
    stylingRequestId: 0
  };

  function $(id) {
    return document.getElementById(id);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function cloneValue(value) {
    if (value === undefined) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(value));
  }

  function payloadValue(value) {
    return value === undefined ? null : cloneValue(value);
  }

  function mergeObjects() {
    var out = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i] || {};
      Object.keys(source).forEach(function(key) {
        out[key] = source[key];
      });
    }
    return out;
  }

  function readEmbeddedConfig() {
    var el = $("embedded-runtime-config");
    if (!el) {
      return null;
    }
    try {
      return JSON.parse(el.textContent);
    } catch (error) {
      setStatus("Embedded runtime config is invalid JSON: " + error.message, true);
      return null;
    }
  }

  function setStatus(message, isError) {
    var status = $("status");
    if (status) {
      status.textContent = message || "";
      status.className = isError ? "status error" : "status";
    }
  }

  function setRuntimeMode() {
    var mode = $("runtimeMode");
    if (!mode) {
      return;
    }
    if (window.location.protocol === "file:") {
      mode.textContent = "File mode. Use Load config if your browser blocks design-runtime.json.";
    } else {
      mode.textContent = "Static server mode. Sidecar config can be loaded automatically.";
    }
  }

  function loadInitialConfig() {
    var embedded = readEmbeddedConfig();
    if (window.SAC_DESIGN_RUNTIME_CONFIG) {
      return Promise.resolve({ config: window.SAC_DESIGN_RUNTIME_CONFIG, source: "window" });
    }
    if (window.location.protocol === "file:") {
      return Promise.resolve({ config: embedded, source: "embedded" });
    }
    return fetch("./design-runtime.json", { cache: "no-store" })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function(config) {
        return { config: config, source: "design-runtime.json" };
      })
      .catch(function() {
        return { config: embedded, source: "embedded" };
      });
  }

  function normalizeConfig(config) {
    config = config || {};
    config.widgets = Array.isArray(config.widgets) ? config.widgets : [];
    config.scenarios = Array.isArray(config.scenarios) ? config.scenarios : [];
    config.designTokens = config.designTokens || {};
    if (config.widgets.length === 0) {
      config.widgets.push({ id: "main", title: "Widget", manifest: { webcomponents: [] } });
    }
    if (config.scenarios.length === 0) {
      config.scenarios.push({ id: "baseline", title: "Baseline", viewport: { width: 720, height: 420 } });
    }
    config.widgets.forEach(function(widget, index) {
      widget.id = widget.id || "widget-" + (index + 1);
      widget.title = widget.title || widget.id;
    });
    config.scenarios.forEach(function(scenario, index) {
      scenario.id = scenario.id || "scenario-" + (index + 1);
      scenario.title = scenario.title || scenario.id;
      scenario.viewport = scenario.viewport || { width: 720, height: 420 };
      scenario.theme = scenario.theme || "light";
      scenario.properties = scenario.properties || {};
      scenario.designTokens = scenario.designTokens || {};
      scenario.dataBindings = scenario.dataBindings || {};
      scenario.widgets = scenario.widgets || {};
    });
    return config;
  }

  function getScenario(id) {
    var scenarios = app.config.scenarios;
    for (var i = 0; i < scenarios.length; i++) {
      if (scenarios[i].id === id) {
        return scenarios[i];
      }
    }
    return scenarios[0];
  }

  function getWidget(id) {
    var widgets = app.config.widgets;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].id === id) {
        return widgets[i];
      }
    }
    return widgets[0];
  }

  function getScenarioState(id) {
    if (!app.scenarioState[id]) {
      var scenario = getScenario(id);
      app.scenarioState[id] = {
        id: scenario.id,
        title: scenario.title,
        theme: scenario.theme || "light",
        viewport: clone(scenario.viewport),
        properties: clone(scenario.properties),
        designTokens: mergeObjects(app.config.designTokens, scenario.designTokens),
        dataBindings: clone(scenario.dataBindings),
        widgets: clone(scenario.widgets),
        notes: "",
        acceptanceIssues: "",
        screenshotReferences: ""
      };
    }
    return app.scenarioState[id];
  }

  function widgetScenarioState(widgetId) {
    var state = getScenarioState(app.activeScenarioId);
    if (!state.widgets[widgetId]) {
      state.widgets[widgetId] = {};
    }
    state.widgets[widgetId].properties = state.widgets[widgetId].properties || {};
    state.widgets[widgetId].designTokens = state.widgets[widgetId].designTokens || {};
    state.widgets[widgetId].dataBindings = state.widgets[widgetId].dataBindings || {};
    return state.widgets[widgetId];
  }

  function widgetAppliesToScenario(widget, scenarioId) {
    return !Array.isArray(widget.scenarioIds) || widget.scenarioIds.indexOf(scenarioId) !== -1;
  }

  function fillSelect(select, items, labelGetter) {
    select.innerHTML = "";
    items.forEach(function(item) {
      var option = document.createElement("option");
      option.value = item.id;
      option.textContent = labelGetter(item);
      select.appendChild(option);
    });
  }

  function setupStaticEvents() {
    $("scenarioSelect").addEventListener("change", function(event) {
      app.activeScenarioId = event.target.value;
      syncScenarioControls();
      renderAll();
    });
    $("widgetSelect").addEventListener("change", function(event) {
      app.selectedWidgetId = event.target.value;
      renderControls();
      renderDataEditor();
      renderStylingPanel();
    });
    $("tokenScopeSelect").addEventListener("change", function(event) {
      app.tokenScope = event.target.value;
      renderTokenControls();
    });
    $("viewportWidth").addEventListener("input", function(event) {
      getScenarioState(app.activeScenarioId).viewport.width = parseInt(event.target.value, 10) || 720;
      renderAll();
    });
    $("viewportHeight").addEventListener("input", function(event) {
      getScenarioState(app.activeScenarioId).viewport.height = parseInt(event.target.value, 10) || 420;
      renderAll();
    });
    $("themeSelect").addEventListener("change", function(event) {
      getScenarioState(app.activeScenarioId).theme = event.target.value;
      renderAll();
    });
    $("applyDataButton").addEventListener("click", applyDataEditor);
    $("copyJsonButton").addEventListener("click", copyIterationJson);
    $("downloadJsonButton").addEventListener("click", function() {
      downloadFile(exportBaseName() + ".json", JSON.stringify(buildIterationPayload(), null, 2), "application/json");
    });
    $("downloadMarkdownButton").addEventListener("click", function() {
      downloadFile(exportBaseName() + ".md", buildMarkdownSummary(), "text/markdown");
    });
    $("reloadButton").addEventListener("click", function() {
      window.location.reload();
    });
    $("configFile").addEventListener("change", loadConfigFile);
    $("notesInput").addEventListener("input", function(event) {
      getScenarioState(app.activeScenarioId).notes = event.target.value;
    });
    $("issuesInput").addEventListener("input", function(event) {
      getScenarioState(app.activeScenarioId).acceptanceIssues = event.target.value;
    });
    $("screenshotsInput").addEventListener("input", function(event) {
      getScenarioState(app.activeScenarioId).screenshotReferences = event.target.value;
    });
  }

  function syncScenarioControls() {
    var state = getScenarioState(app.activeScenarioId);
    $("scenarioSelect").value = app.activeScenarioId;
    $("viewportWidth").value = state.viewport.width || 720;
    $("viewportHeight").value = state.viewport.height || 420;
    $("themeSelect").value = state.theme || "light";
    $("tokenScopeSelect").value = app.tokenScope;
    $("notesInput").value = state.notes || "";
    $("issuesInput").value = state.acceptanceIssues || "";
    $("screenshotsInput").value = state.screenshotReferences || "";
  }

  function renderShell() {
    fillSelect($("scenarioSelect"), app.config.scenarios, function(scenario) {
      return scenario.title || scenario.id;
    });
    fillSelect($("widgetSelect"), app.config.widgets, function(widget) {
      return widget.title || widget.id;
    });
    app.activeScenarioId = app.activeScenarioId || app.config.scenarios[0].id;
    app.selectedWidgetId = app.selectedWidgetId || app.config.widgets[0].id;
    $("scenarioSelect").value = app.activeScenarioId;
    $("widgetSelect").value = app.selectedWidgetId;
    syncScenarioControls();
    renderControls();
  }

  function prepareWidget(widget) {
    if (app.preparedWidgets[widget.id]) {
      return Promise.resolve(app.preparedWidgets[widget.id]);
    }
    var manifestPromise = widget.manifest
      ? Promise.resolve(widget.manifest)
      : fetchManifest(widget);
    return manifestPromise.then(function(manifest) {
      widget.manifest = manifest || widget.manifest || {};
      var prepared = {
        config: widget,
        manifest: widget.manifest,
        mainComponent: componentByKind(widget.manifest, "main"),
        stylingComponent: componentByKind(widget.manifest, "styling")
      };
      app.preparedWidgets[widget.id] = prepared;
      if (app.selectedWidgetId === widget.id) {
        renderControls();
      }
      return prepared;
    });
  }

  function fetchManifest(widget) {
    if (!widget.manifestPath) {
      return Promise.resolve({ webcomponents: [] });
    }
    if (window.location.protocol === "file:") {
      return Promise.resolve({ webcomponents: [] });
    }
    return fetch(widget.manifestPath, { cache: "no-store" })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Unable to load " + widget.manifestPath);
        }
        return response.json();
      });
  }

  function componentByKind(manifest, kind) {
    var components = manifest && Array.isArray(manifest.webcomponents) ? manifest.webcomponents : [];
    for (var i = 0; i < components.length; i++) {
      if (components[i].kind === kind) {
        return components[i];
      }
    }
    return null;
  }

  function componentTag(prepared, kind) {
    var component = kind === "styling" ? prepared.stylingComponent : prepared.mainComponent;
    if (component && component.tag) {
      return component.tag;
    }
    return kind === "styling" ? prepared.config.stylingTag : prepared.config.tag;
  }

  function registerTagOwner(tag, widgetId) {
    if (!tag) {
      return null;
    }
    var owner = app.tagOwners[tag];
    if (owner && owner !== widgetId) {
      return "Custom element tag '" + tag + "' is used by both '" + owner + "' and '" + widgetId + "'. Use unique webcomponents[].tag values for multi-widget comparison.";
    }
    app.tagOwners[tag] = widgetId;
    return null;
  }

  function resolveComponentUrl(widget, component) {
    if (!component || !component.url) {
      return null;
    }
    if (/^(https?:|file:|data:|blob:)/.test(component.url)) {
      return component.url;
    }
    var base = widget.manifestPath ? new URL(widget.manifestPath, window.location.href) : window.location.href;
    return new URL(component.url, base).href;
  }

  function scriptUrlsFor(prepared, kind) {
    var widget = prepared.config;
    var explicit = kind === "styling" ? widget.stylingScripts : widget.scripts;
    if (Array.isArray(explicit) && explicit.length > 0) {
      return explicit.map(function(src) {
        return new URL(src, window.location.href).href;
      });
    }
    var component = kind === "styling" ? prepared.stylingComponent : prepared.mainComponent;
    var url = resolveComponentUrl(widget, component);
    return url ? [url] : [];
  }

  function loadScript(src) {
    if (app.loadedScripts[src]) {
      return app.loadedScripts[src];
    }
    app.loadedScripts[src] = new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = function() {
        reject(new Error("Script failed to load: " + src));
      };
      document.head.appendChild(script);
    });
    return app.loadedScripts[src];
  }

  function loadScripts(urls) {
    var chain = Promise.resolve();
    urls.forEach(function(url) {
      chain = chain.then(function() {
        return loadScript(url);
      });
    });
    return chain;
  }

  function renderAll() {
    renderControls();
    renderDataEditor();
    renderStylingPanel();
    renderCanvas();
  }

  function renderCanvas() {
    var canvas = $("canvas");
    canvas.innerHTML = "";
    var state = getScenarioState(app.activeScenarioId);
    app.config.widgets.forEach(function(widget) {
      if (!widgetAppliesToScenario(widget, app.activeScenarioId)) {
        return;
      }
      var card = document.createElement("article");
      card.className = "widget-card";
      var header = document.createElement("div");
      header.className = "widget-card-header";
      var title = document.createElement("div");
      title.className = "widget-card-title";
      title.textContent = widget.title || widget.id;
      var meta = document.createElement("div");
      meta.className = "widget-card-meta";
      meta.textContent = (state.viewport.width || 720) + " x " + (state.viewport.height || 420);
      header.appendChild(title);
      header.appendChild(meta);
      var frame = document.createElement("div");
      frame.className = "widget-frame";
      frame.dataset.theme = state.theme || "light";
      frame.style.setProperty("--preview-width", (state.viewport.width || 720) + "px");
      frame.style.setProperty("--preview-height", (state.viewport.height || 420) + "px");
      applyDesignTokensToElement(frame, tokensForWidget(widget.id));
      card.appendChild(header);
      card.appendChild(frame);
      canvas.appendChild(card);
      renderWidgetIntoFrame(widget, frame);
    });
  }

  function renderWidgetIntoFrame(widget, frame) {
    prepareWidget(widget)
      .then(function(prepared) {
        return loadScripts(scriptUrlsFor(prepared, "main")).then(function() {
          var tag = componentTag(prepared, "main");
          var tagError = registerTagOwner(tag, widget.id);
          if (tagError) {
            throw new Error(tagError);
          }
          if (!tag || !window.customElements.get(tag)) {
            throw new Error("Custom element is not registered: " + (tag || "(missing tag)"));
          }
          frame.innerHTML = "";
          var element = document.createElement(tag);
          var props = propertiesForWidget(widget.id);
          element.addEventListener("propertiesChanged", function(event) {
            if (element.__sacRuntimeSuppressPropertiesChanged) {
              return;
            }
            var changed = event.detail && event.detail.properties ? event.detail.properties : {};
            Object.keys(changed).forEach(function(key) {
              widgetScenarioState(widget.id).properties[key] = changed[key];
            });
            renderControls();
          });
          element.__sacRuntimeSuppressPropertiesChanged = true;
          try {
            injectBindings(element, dataBindingsForWidget(widget.id));
            frame.appendChild(element);
            callBeforeUpdate(element, props);
            applyProperties(element, props);
            callAfterUpdate(element, props);
          } finally {
            element.__sacRuntimeSuppressPropertiesChanged = false;
          }
        });
      })
      .catch(function(error) {
        frame.innerHTML = "";
        var message = document.createElement("div");
        message.className = "widget-error";
        message.textContent = error.message + ". Use local vendor assets and verify paths in design-runtime.json.";
        frame.appendChild(message);
      });
  }

  function callBeforeUpdate(element, changedProperties) {
    if (typeof element.onCustomWidgetBeforeUpdate === "function") {
      element.onCustomWidgetBeforeUpdate(changedProperties);
    }
  }

  function callAfterUpdate(element, changedProperties) {
    if (typeof element.onCustomWidgetAfterUpdate === "function") {
      element.onCustomWidgetAfterUpdate(changedProperties);
    }
    if (typeof element.onCustomWidgetResize === "function") {
      element.onCustomWidgetResize();
    }
  }

  function injectBindings(element, bindings) {
    var map = {};
    Object.keys(bindings).forEach(function(bindingId) {
      map[bindingId] = bindings[bindingId];
      element[bindingId] = bindings[bindingId];
    });
    element.dataBindings = {
      getDataBinding: function(bindingId) {
        if (bindingId) {
          return map[bindingId];
        }
        var keys = Object.keys(map);
        return keys.length > 0 ? map[keys[0]] : undefined;
      }
    };
  }

  function applyProperties(element, props) {
    Object.keys(props).forEach(function(key) {
      try {
        element[key] = props[key];
      } catch (error) {
        console.warn("Unable to set property", key, error);
      }
    });
  }

  function propertiesForWidget(widgetId) {
    var widget = getWidget(widgetId);
    var manifestProps = widget.manifest && widget.manifest.properties ? defaultProperties(widget.manifest.properties) : {};
    var scenarioState = getScenarioState(app.activeScenarioId);
    var widgetState = widgetScenarioState(widgetId);
    return mergeObjects(manifestProps, widget.properties, scenarioState.properties, widgetState.properties);
  }

  function defaultProperties(properties) {
    var out = {};
    Object.keys(properties || {}).forEach(function(key) {
      if (Object.prototype.hasOwnProperty.call(properties[key], "default")) {
        out[key] = properties[key].default;
      }
    });
    return out;
  }

  function tokensForWidget(widgetId) {
    var scenarioState = getScenarioState(app.activeScenarioId);
    var widgetState = widgetScenarioState(widgetId);
    return mergeObjects(app.config.designTokens, scenarioState.designTokens, widgetState.designTokens);
  }

  function dataBindingsForWidget(widgetId) {
    var scenarioState = getScenarioState(app.activeScenarioId);
    var widgetState = widgetScenarioState(widgetId);
    return mergeObjects(scenarioState.dataBindings, widgetState.dataBindings);
  }

  function applyDesignTokensToElement(element, tokens) {
    var tokenMap = {
      primaryColor: "--preview-primary-color",
      accentColor: "--preview-accent-color",
      backgroundColor: "--preview-background-color",
      surfaceColor: "--preview-surface-color",
      textColor: "--preview-text-color",
      fontFamily: "--preview-font-family",
      spacing: "--preview-spacing",
      radius: "--preview-radius",
      shadow: "--preview-shadow"
    };
    Object.keys(tokenMap).forEach(function(key) {
      if (tokens[key] !== undefined && tokens[key] !== "") {
        var value = tokens[key];
        if (key === "spacing" || key === "radius") {
          value = parseInt(value, 10) + "px";
        }
        element.style.setProperty(tokenMap[key], value);
      }
    });
  }

  function renderControls() {
    renderPropertyControls();
    renderTokenControls();
  }

  function renderPropertyControls() {
    var host = $("propertyControls");
    host.innerHTML = "";
    var widget = getWidget(app.selectedWidgetId);
    var manifest = widget.manifest || {};
    var properties = manifest.properties || {};
    var values = propertiesForWidget(widget.id);
    Object.keys(properties).forEach(function(key) {
      host.appendChild(createValueControl("property", key, properties[key], values[key], function(value) {
        widgetScenarioState(widget.id).properties[key] = value;
        renderCanvas();
      }));
    });
    if (Object.keys(properties).length === 0) {
      host.textContent = "No manifest properties found.";
    }
  }

  function renderTokenControls() {
    var host = $("tokenControls");
    host.innerHTML = "";
    var tokens = tokensForWidget(app.selectedWidgetId);
    Object.keys(tokens).forEach(function(key) {
      host.appendChild(createValueControl("token", key, { type: tokenType(key, tokens[key]) }, tokens[key], function(value) {
        if (app.tokenScope === "widget") {
          widgetScenarioState(app.selectedWidgetId).designTokens[key] = value;
        } else {
          getScenarioState(app.activeScenarioId).designTokens[key] = value;
        }
        renderCanvas();
      }));
    });
  }

  function tokenType(key, value) {
    if (/color/i.test(key) && /^#[0-9a-f]{6}$/i.test(String(value))) {
      return "Color";
    }
    if (typeof value === "number") {
      return "number";
    }
    return "string";
  }

  function createValueControl(kind, key, definition, value, onChange) {
    var wrapper = document.createElement("div");
    wrapper.className = kind === "token" ? "token-row" : "property-row";
    var label = document.createElement("label");
    label.textContent = key;
    var input = document.createElement("input");
    var type = definition && definition.type ? definition.type : "string";
    if (type === "boolean") {
      input.type = "checkbox";
      input.checked = Boolean(value);
      input.addEventListener("change", function() {
        onChange(input.checked);
      });
    } else if (type === "integer" || type === "number") {
      input.type = "number";
      input.value = value === undefined ? "" : value;
      input.addEventListener("input", function() {
        onChange(type === "integer" ? parseInt(input.value, 10) : parseFloat(input.value));
      });
    } else if (type === "Color") {
      input.type = "color";
      input.value = value || "#0a6ed1";
      input.addEventListener("input", function() {
        onChange(input.value);
      });
    } else {
      input.type = "text";
      input.value = value === undefined ? "" : value;
      input.addEventListener("input", function() {
        onChange(input.value);
      });
    }
    label.appendChild(input);
    wrapper.appendChild(label);
    return wrapper;
  }

  function renderDataEditor() {
    var data = dataBindingsForWidget(app.selectedWidgetId);
    $("dataEditor").value = JSON.stringify(data, null, 2);
  }

  function applyDataEditor() {
    try {
      var parsed = JSON.parse($("dataEditor").value || "{}");
      widgetScenarioState(app.selectedWidgetId).dataBindings = parsed;
      setStatus("Sample data applied to " + app.selectedWidgetId + ".");
      renderCanvas();
    } catch (error) {
      setStatus("Sample data JSON is invalid: " + error.message, true);
    }
  }

  function renderStylingPanel() {
    var host = $("stylingPanelHost");
    host.innerHTML = "";
    var widget = getWidget(app.selectedWidgetId);
    var requestId = ++app.stylingRequestId;
    prepareWidget(widget)
      .then(function(prepared) {
        return loadScripts(scriptUrlsFor(prepared, "styling")).then(function() {
          if (requestId !== app.stylingRequestId || app.selectedWidgetId !== widget.id) {
            return;
          }
          var tag = componentTag(prepared, "styling");
          if (!tag || !window.customElements.get(tag)) {
            host.textContent = "No styling panel component registered.";
            return;
          }
          var panel = document.createElement(tag);
          var props = propertiesForWidget(widget.id);
          panel.addEventListener("propertiesChanged", function(event) {
            if (panel.__sacRuntimeSuppressPropertiesChanged) {
              return;
            }
            var props = event.detail && event.detail.properties ? event.detail.properties : {};
            Object.keys(props).forEach(function(key) {
              widgetScenarioState(widget.id).properties[key] = props[key];
            });
            renderControls();
            renderCanvas();
          });
          panel.__sacRuntimeSuppressPropertiesChanged = true;
          try {
            injectBindings(panel, dataBindingsForWidget(widget.id));
            host.innerHTML = "";
            host.appendChild(panel);
            callBeforeUpdate(panel, props);
            applyProperties(panel, props);
            callAfterUpdate(panel, props);
          } finally {
            panel.__sacRuntimeSuppressPropertiesChanged = false;
          }
        });
      })
      .catch(function(error) {
        if (requestId === app.stylingRequestId && app.selectedWidgetId === widget.id) {
          host.textContent = error.message;
        }
      });
  }

  function scenarioWidgetConfig(widgetId) {
    var scenario = getScenario(app.activeScenarioId) || {};
    var widgets = scenario.widgets || {};
    return widgets[widgetId] || {};
  }

  function normalizedViewport(viewport) {
    viewport = viewport || {};
    return {
      width: viewport.width || 720,
      height: viewport.height || 420
    };
  }

  function baselinePropertiesForWidget(widgetId) {
    var widget = getWidget(widgetId);
    var scenario = getScenario(app.activeScenarioId) || {};
    var widgetState = scenarioWidgetConfig(widgetId);
    var manifestProps = widget.manifest && widget.manifest.properties ? defaultProperties(widget.manifest.properties) : {};
    return mergeObjects(manifestProps, widget.properties, scenario.properties, widgetState.properties);
  }

  function baselineTokensForWidget(widgetId) {
    var scenario = getScenario(app.activeScenarioId) || {};
    var widgetState = scenarioWidgetConfig(widgetId);
    return mergeObjects(app.config.designTokens, scenario.designTokens, widgetState.designTokens);
  }

  function baselineDataBindingsForWidget(widgetId) {
    var scenario = getScenario(app.activeScenarioId) || {};
    var widgetState = scenarioWidgetConfig(widgetId);
    return mergeObjects(scenario.dataBindings, widgetState.dataBindings);
  }

  function valuesEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  function diffObjects(before, after) {
    var out = {};
    var keys = {};
    Object.keys(before || {}).forEach(function(key) {
      keys[key] = true;
    });
    Object.keys(after || {}).forEach(function(key) {
      keys[key] = true;
    });
    Object.keys(keys).forEach(function(key) {
      if (!valuesEqual(before ? before[key] : undefined, after ? after[key] : undefined)) {
        out[key] = {
          before: payloadValue(before ? before[key] : undefined),
          after: payloadValue(after ? after[key] : undefined)
        };
      }
    });
    return out;
  }

  function buildIterationPayload() {
    var scenarioState = getScenarioState(app.activeScenarioId);
    var scenario = getScenario(app.activeScenarioId) || {};
    var activeWidgets = app.config.widgets.filter(function(widget) {
      return widgetAppliesToScenario(widget, app.activeScenarioId);
    });
    var widgets = activeWidgets.map(function(widget) {
      return {
        id: widget.id,
        title: widget.title,
        manifestId: widget.manifest && widget.manifest.id ? widget.manifest.id : "",
        tag: widget.manifest && componentByKind(widget.manifest, "main") ? componentByKind(widget.manifest, "main").tag : widget.tag,
        properties: propertiesForWidget(widget.id),
        designTokens: tokensForWidget(widget.id),
        dataBindings: dataBindingsForWidget(widget.id)
      };
    });
    var changedProperties = {};
    var changedDesignTokens = {};
    var changedDataBindings = {};
    activeWidgets.forEach(function(widget) {
      var propertyDiff = diffObjects(baselinePropertiesForWidget(widget.id), propertiesForWidget(widget.id));
      var tokenDiff = diffObjects(baselineTokensForWidget(widget.id), tokensForWidget(widget.id));
      var bindingDiff = diffObjects(baselineDataBindingsForWidget(widget.id), dataBindingsForWidget(widget.id));
      if (Object.keys(propertyDiff).length > 0) {
        changedProperties[widget.id] = propertyDiff;
      }
      if (Object.keys(tokenDiff).length > 0) {
        changedDesignTokens[widget.id] = tokenDiff;
      }
      if (Object.keys(bindingDiff).length > 0) {
        changedDataBindings[widget.id] = bindingDiff;
      }
    });
    var currentViewport = normalizedViewport(scenarioState.viewport);
    var baselineViewport = normalizedViewport(scenario.viewport);
    var baselineTheme = scenario.theme || "light";
    var currentTheme = scenarioState.theme || "light";
    return {
      schema: "sap-sac-widget-agent-iteration/v1",
      createdAt: new Date().toISOString(),
      runtimeSource: app.source,
      activeScenario: app.activeScenarioId,
      notes: scenarioState.notes || "",
      acceptanceIssues: scenarioState.acceptanceIssues || "",
      screenshotReferences: scenarioState.screenshotReferences || "",
      changedProperties: changedProperties,
      changedDesignTokens: changedDesignTokens,
      changedDataBindings: changedDataBindings,
      changedViewport: diffObjects(baselineViewport, currentViewport),
      changedTheme: baselineTheme === currentTheme ? null : {
        before: baselineTheme,
        after: currentTheme
      },
      current: {
        viewport: currentViewport,
        theme: currentTheme,
        tokenScope: app.tokenScope,
        widgets: widgets
      },
      agentInstruction: "Use this payload as design feedback. Propose source changes, do not apply runtime-only values blindly."
    };
  }

  function buildMarkdownSummary() {
    var payload = buildIterationPayload();
    var lines = [
      "# SAC Widget Design Iteration",
      "",
      "- Scenario: `" + payload.activeScenario + "`",
      "- Viewport: `" + payload.current.viewport.width + "x" + payload.current.viewport.height + "`",
      "- Theme: `" + payload.current.theme + "`",
      "- Token scope: `" + payload.current.tokenScope + "`",
      "",
      "## Notes",
      payload.notes || "(none)",
      "",
      "## Acceptance Issues",
      payload.acceptanceIssues || "(none)",
      "",
      "## Screenshot References",
      payload.screenshotReferences || "(none)",
      "",
      "## Changed Runtime Values",
      "- Properties: `" + Object.keys(payload.changedProperties || {}).join(", ") + "`",
      "- Design tokens: `" + Object.keys(payload.changedDesignTokens || {}).join(", ") + "`",
      "- Data bindings: `" + Object.keys(payload.changedDataBindings || {}).join(", ") + "`",
      "- Viewport changed: `" + (Object.keys(payload.changedViewport || {}).length > 0 ? "yes" : "no") + "`",
      "- Theme changed: `" + (payload.changedTheme ? "yes" : "no") + "`",
      "",
      "## SAC Install Checklist",
      "- Validate the package with `/widget-validate` and the project template checks.",
      "- Host widget JS, styling/builder files, icons, and vendor assets in SAC Files or an approved HTTPS/widget-server location.",
      "- Update `widget.json` URLs, integrity hashes, and `ignoreIntegrity` for the chosen hosting model.",
      "- For external hosts, add the serving origin in SAC System > Administration > App Integration > Trusted Origins.",
      "- Import `widget.json` in the SAC Custom Widgets area.",
      "- Add the widget to a Responsive or Canvas story page.",
      "- Bind dimensions and measures in the exact manifest feed order, then test with real story data.",
      "- Convert or reuse the result as a composite only after the widget works in a story.",
      "",
      "This browser runtime cannot verify SAC tenant trust, JSON import success, permissions, or composite behavior.",
      "",
      "## Widgets"
    ];
    payload.current.widgets.forEach(function(widget) {
      lines.push("", "### " + widget.title, "", "- ID: `" + widget.id + "`", "- Tag: `" + (widget.tag || "") + "`");
      lines.push("- Current properties: `" + Object.keys(widget.properties || {}).join(", ") + "`");
      lines.push("- Current design tokens: `" + Object.keys(widget.designTokens || {}).join(", ") + "`");
    });
    return lines.join("\n");
  }

  function copyIterationJson() {
    var text = JSON.stringify(buildIterationPayload(), null, 2);
    if (!navigator.clipboard) {
      setStatus("Clipboard API is unavailable. Use Download JSON instead.", true);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      setStatus("Iteration JSON copied.");
    }).catch(function(error) {
      setStatus("Copy failed: " + error.message, true);
    });
  }

  function exportBaseName() {
    var exportConfig = app.config.export || {};
    return exportConfig.suggestedFilename || "agent-iteration";
  }

  function downloadFile(filename, content, type) {
    var blob = new Blob([content], { type: type });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function loadConfigFile(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function() {
      try {
        start(JSON.parse(reader.result), file.name);
      } catch (error) {
        setStatus("Selected config is invalid JSON: " + error.message, true);
      }
    };
    reader.readAsText(file);
  }

  function start(config, source) {
    app.config = normalizeConfig(config);
    app.source = source || "embedded";
    app.activeScenarioId = app.config.scenarios[0].id;
    app.selectedWidgetId = app.config.widgets[0].id;
    app.tokenScope = "scenario";
    app.scenarioState = {};
    app.preparedWidgets = {};
    app.tagOwners = {};
    app.stylingRequestId = 0;
    renderShell();
    renderAll();
    setRuntimeMode();
    setStatus("Loaded " + app.source + ". Browser runtime mocks custom-widget essentials only.");
  }

  document.addEventListener("DOMContentLoaded", function() {
    setupStaticEvents();
    loadInitialConfig().then(function(result) {
      start(result.config, result.source);
    });
  });
})();
