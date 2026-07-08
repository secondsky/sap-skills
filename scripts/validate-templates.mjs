#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { repoRootFrom } from "./lib/validation-utils.mjs";

const repoRoot = repoRootFrom(import.meta.url);
const pluginsRoot = path.join(repoRoot, "plugins");
const errors = [];

function toPosixPath(file) {
  return file.replace(/\\/g, "/");
}

function repoRelativePath(file) {
  return toPosixPath(path.relative(repoRoot, file));
}

function isPathInside(root, file) {
  const relative = path.relative(root, file);
  return relative === "" || (
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function stripPlaceholders(text) {
  return text.replace(/\{\{[^}]+\}\}/g, "PLACEHOLDER").replace(/\$\{[^}]+\}/g, "PLACEHOLDER");
}

function looksLikeSecret(text) {
  return /\b(password|client_secret|api[_-]?key|access[_-]?token)\b\s*[:=]\s*["'](?!\$\{|\{\{|PLACEHOLDER|your-|your_|changeme|example|dummy)[^"']{8,}["']/i.test(text);
}

function validateHttpsToSftpIflowTemplate() {
  const templateRoot = path.join(
    pluginsRoot,
    "sap-btp-integration-suite",
    "skills",
    "sap-btp-integration-suite",
    "templates",
    "https-to-sftp-iflow-package",
  );

  if (!fs.existsSync(templateRoot)) {
    errors.push("sap-btp-integration-suite HTTPS-to-SFTP iFlow template is missing");
    return;
  }

  const requiredFiles = [
    ".project",
    "META-INF/MANIFEST.MF",
    "metainfo.prop",
    "src/main/resources/parameters.prop",
    "src/main/resources/parameters.propdef",
  ];

  for (const relativeFile of requiredFiles) {
    const file = path.join(templateRoot, relativeFile);
    if (!fs.existsSync(file)) {
      errors.push(`sap-btp-integration-suite HTTPS-to-SFTP iFlow template missing ${relativeFile}`);
    }
  }

  const iflowDir = path.join(templateRoot, "src", "main", "resources", "scenarioflows", "integrationflow");
  const iflowFiles = fs.existsSync(iflowDir)
    ? fs.readdirSync(iflowDir).filter((entry) => entry.endsWith(".iflw"))
    : [];

  if (iflowFiles.length !== 1) {
    errors.push("sap-btp-integration-suite HTTPS-to-SFTP iFlow template must contain exactly one .iflw file");
    return;
  }

  const manifestFile = path.join(templateRoot, "META-INF", "MANIFEST.MF");
  if (fs.existsSync(manifestFile)) {
    const manifest = fs.readFileSync(manifestFile, "utf8");
    for (const requiredLine of ["SAP-RuntimeProfile: iflmap", "SAP-NodeType: IFLMAP", "SAP-BundleType: IntegrationFlow"]) {
      if (!manifest.includes(requiredLine)) {
        errors.push(`sap-btp-integration-suite HTTPS-to-SFTP iFlow manifest missing '${requiredLine}'`);
      }
    }
  }

  const projectFile = path.join(templateRoot, ".project");
  if (fs.existsSync(projectFile)) {
    const project = fs.readFileSync(projectFile, "utf8");
    if (!project.includes("com.sap.ide.ifl.project.support.project.nature")) {
      errors.push("sap-btp-integration-suite HTTPS-to-SFTP iFlow .project missing SAP iFlow project nature");
    }
  }

  const iflowFile = path.join(iflowDir, iflowFiles[0]);
  const iflow = fs.readFileSync(iflowFile, "utf8");
  const requiredFragments = [
    "bpmn2:definitions",
    "EndpointSender",
    "EndpointRecevier",
    "IntegrationProcess",
    "sap:HTTPS",
    "sap:SFTP",
    "{{HTTPS_ENDPOINT_PATH}}",
    "{{SFTP_HOST}}",
    "{{SFTP_DIRECTORY}}",
    "{{SFTP_FILENAME}}",
    "{{SFTP_CREDENTIAL_ALIAS}}",
  ];

  for (const fragment of requiredFragments) {
    if (!iflow.includes(fragment)) {
      errors.push(`sap-btp-integration-suite HTTPS-to-SFTP iFlow missing '${fragment}'`);
    }
  }

  const iflowWithoutNamespaces = iflow
    .replace(/\s+xmlns(?::\w+)?="[^"]+"/g, "")
    .replace(/\s+targetNamespace="[^"]+"/g, "");
  if (/https?:\/\/|sftp:\/\/|[A-Za-z0-9-]+\.(?:com|net|org|io|de|cloud|local)\b/i.test(iflowWithoutNamespaces)) {
    errors.push("sap-btp-integration-suite HTTPS-to-SFTP iFlow template must not contain real hostnames or URLs");
  }

  const xmlFiles = [projectFile, iflowFile].filter((file) => fs.existsSync(file));
  for (const xmlFile of xmlFiles) {
    const result = spawnSync("xmllint", ["--noout", xmlFile], { encoding: "utf8" });
    if (result.error?.code === "ENOENT") {
      errors.push("xmllint is required to validate iFlow XML templates");
      break;
    }
    if (result.status !== 0) {
      errors.push(`${repoRelativePath(xmlFile)}: malformed XML: ${(result.stderr || result.stdout).trim()}`);
    }
  }
}

function readJsonTemplate(file, label) {
  try {
    return JSON.parse(stripPlaceholders(fs.readFileSync(file, "utf8")));
  } catch (error) {
    errors.push(`${label}: invalid JSON: ${error.message}`);
    return null;
  }
}

function extractEmbeddedRuntimeConfig(indexFile) {
  const text = fs.readFileSync(indexFile, "utf8");
  const match = text.match(/<script id="embedded-runtime-config" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    errors.push("sap-sac-custom-widget design runtime index.html missing embedded-runtime-config JSON script");
    return null;
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    errors.push(`sap-sac-custom-widget design runtime embedded config is invalid JSON: ${error.message}`);
    return null;
  }
}

function assertNoHostedScriptPath(value, label) {
  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    errors.push(`${label}: generated runtime template must not default to hosted script URL '${value}'`);
  }
}

function validateRuntimeConfig(config, label) {
  if (!config) return;
  if (config.schema !== "sap-sac-widget-design-runtime/v1") {
    errors.push(`${label}: schema must be sap-sac-widget-design-runtime/v1`);
  }
  if (!Array.isArray(config.widgets) || config.widgets.length === 0) {
    errors.push(`${label}: widgets must be a non-empty array`);
  }
  if (!Array.isArray(config.scenarios) || config.scenarios.length === 0) {
    errors.push(`${label}: scenarios must be a non-empty array`);
  }
  if (!config.designTokens || typeof config.designTokens !== "object" || Array.isArray(config.designTokens)) {
    errors.push(`${label}: designTokens must be an object`);
  }

  const widget = config.widgets && config.widgets[0];
  const manifest = widget && widget.manifest;
  const component = manifest && Array.isArray(manifest.webcomponents)
    ? manifest.webcomponents.find((item) => item.kind === "main")
    : null;

  if (!widget || widget.id !== "main") {
    errors.push(`${label}: first widget placeholder id must be 'main'`);
  }
  if (widget && !Array.isArray(widget.scripts)) {
    errors.push(`${label}: first widget must include scripts array`);
  }
  if (widget && Array.isArray(widget.scripts)) {
    for (const script of widget.scripts) assertNoHostedScriptPath(script, `${label}: widgets[].scripts`);
    if (!widget.scripts.includes("../widget.js")) {
      errors.push(`${label}: first widget scripts must include ../widget.js relative to design-runtime/index.html`);
    }
  }
  if (!manifest || manifest.id !== "com.company.widgetname") {
    errors.push(`${label}: placeholder manifest id must be com.company.widgetname`);
  }
  if (!component || component.tag !== "com-company-widgetname") {
    errors.push(`${label}: placeholder main webcomponent tag must be com-company-widgetname`);
  }
  if (!component || component.url !== "widget.js") {
    errors.push(`${label}: placeholder main webcomponent url must be widget.js relative to widget.json`);
  }
  if (component) {
    assertNoHostedScriptPath(component.url, `${label}: manifest.webcomponents[].url`);
  }
}

function assertNoHostedAssetText(text, label) {
  if (/https?:\/\//i.test(text)) {
    errors.push(`${label}: local builder template must not contain hosted URLs or remote assets`);
  }
}

function validateLocalBuilderConfig(config, label) {
  if (!config) return;
  if (config.schema !== "sap-sac-widget-local-builder/v1") {
    errors.push(`${label}: schema must be sap-sac-widget-local-builder/v1`);
  }
  if (config.defaultArtifactMode !== "sac-two-file") {
    errors.push(`${label}: defaultArtifactMode must be sac-two-file`);
  }
  if (!config.outputNames || config.outputNames.manifest !== "widget.json") {
    errors.push(`${label}: outputNames.manifest must be widget.json`);
  }
  if (!config.outputNames || config.outputNames.resourceZipSuffix !== "-resources.zip") {
    errors.push(`${label}: outputNames.resourceZipSuffix must be -resources.zip`);
  }
  const componentFiles = config.componentFileNames || {};
  for (const [key, expected] of Object.entries({ main: "widget.js", builder: "builder.js", styling: "styling.js" })) {
    if (componentFiles[key] !== expected) {
      errors.push(`${label}: componentFileNames.${key} must be ${expected}`);
    }
  }
  const excluded = config.resourceZipExcludedExtensions || [];
  for (const extension of [".html", ".css", ".md", ".json"]) {
    if (!excluded.includes(extension)) {
      errors.push(`${label}: resourceZipExcludedExtensions must include ${extension}`);
    }
  }

  const patternHints = config.patternHints;
  const requiredHints = [
    "data-bound-chart",
    "kpi-gauge",
    "flow-hierarchy-chart",
    "builder-input-utility",
    "widget-addon-reference",
    "build-based-app-reference",
  ];
  if (!Array.isArray(patternHints)) {
    errors.push(`${label}: patternHints must be an array`);
    return;
  }

  const seen = new Set();
  for (const hint of patternHints) {
    if (!hint || typeof hint !== "object" || Array.isArray(hint)) {
      errors.push(`${label}: every patternHint must be an object`);
      continue;
    }
    if (!hint.id || typeof hint.id !== "string") {
      errors.push(`${label}: every patternHint must include a string id`);
      continue;
    }
    if (seen.has(hint.id)) {
      errors.push(`${label}: duplicate patternHint id ${hint.id}`);
    }
    seen.add(hint.id);
    for (const field of ["label", "description", "lesson", "mode"]) {
      if (!hint[field] || typeof hint[field] !== "string") {
        errors.push(`${label}: patternHint ${hint.id} must include string ${field}`);
      }
    }
    if (!["prefill", "reference-only"].includes(hint.mode)) {
      errors.push(`${label}: patternHint ${hint.id} mode must be prefill or reference-only`);
    }
    if (hint.mode === "reference-only" && hint.prefill) {
      errors.push(`${label}: reference-only patternHint ${hint.id} must not include prefill`);
    }
    if (hint.mode === "prefill") {
      if (!hint.prefill || typeof hint.prefill !== "object" || Array.isArray(hint.prefill)) {
        errors.push(`${label}: prefill patternHint ${hint.id} must include a prefill object`);
      } else {
        if (!Array.isArray(hint.prefill.properties)) {
          errors.push(`${label}: prefill patternHint ${hint.id} must include properties array`);
        }
        if (!Array.isArray(hint.prefill.feeds)) {
          errors.push(`${label}: prefill patternHint ${hint.id} must include feeds array`);
        }
        if (!hint.prefill.components || typeof hint.prefill.components !== "object" || Array.isArray(hint.prefill.components)) {
          errors.push(`${label}: prefill patternHint ${hint.id} must include components object`);
        }
      }
    }
  }

  for (const id of requiredHints) {
    if (!seen.has(id)) {
      errors.push(`${label}: patternHints missing ${id}`);
    }
  }
}

function validateSapSampleWidgetLessons() {
  const lessonsFile = path.join(
    pluginsRoot,
    "sap-sac-custom-widget",
    "skills",
    "sap-sac-custom-widget",
    "references",
    "sap-sample-widget-lessons.md",
  );

  if (!fs.existsSync(lessonsFile)) {
    errors.push("sap-sac-custom-widget missing references/sap-sample-widget-lessons.md");
    return;
  }

  const text = fs.readFileSync(lessonsFile, "utf8");
  const requiredSamples = [
    "Custom Pie Chart",
    "Funnel Chart",
    "Gauge Grade Chart",
    "Half Donut Chart",
    "Integrity Node Files",
    "Kpi Ring Chart",
    "Line Chart",
    "Nested Pie Chart",
    "Pareto Chart",
    "Sankey Chart with Styling Panel",
    "Sunbrust Chart with Styling Panel",
    "Tree Chart with Styling Panel",
    "UI5 Gantt Chart",
    "Widget Add-on Sample",
    "World Cloud by Input",
    "bar-gradient-binding",
    "file-upload-widget-master",
  ];
  for (const sample of requiredSamples) {
    if (!text.includes(sample)) {
      errors.push(`sap-sac-custom-widget sample lessons missing ${sample}`);
    }
  }

  const requiredCaveats = [
    "Optimized View Mode",
    "Data Binding",
    "third-party",
    "license",
    "hosting",
    "path",
    "extensions[]",
    "build-based",
  ];
  for (const caveat of requiredCaveats) {
    if (!text.toLowerCase().includes(caveat.toLowerCase())) {
      errors.push(`sap-sac-custom-widget sample lessons missing caveat '${caveat}'`);
    }
  }
}

function validateSacLocalBuilderTemplate() {
  const builderRoot = path.join(
    pluginsRoot,
    "sap-sac-custom-widget",
    "skills",
    "sap-sac-custom-widget",
    "templates",
    "local-builder",
  );

  const requiredFiles = ["index.html", "builder.css", "builder.js", "builder-config.json", "server.mjs"];
  for (const relativeFile of requiredFiles) {
    if (!fs.existsSync(path.join(builderRoot, relativeFile))) {
      errors.push(`sap-sac-custom-widget local builder missing ${relativeFile}`);
    }
  }
  if (requiredFiles.some((relativeFile) => !fs.existsSync(path.join(builderRoot, relativeFile)))) {
    return;
  }

  for (const relativeFile of requiredFiles) {
    const file = path.join(builderRoot, relativeFile);
    assertNoHostedAssetText(fs.readFileSync(file, "utf8"), `sap-sac-custom-widget local builder ${relativeFile}`);
  }

  const config = readJsonTemplate(
    path.join(builderRoot, "builder-config.json"),
    "sap-sac-custom-widget local builder builder-config.json",
  );
  validateLocalBuilderConfig(config, "sap-sac-custom-widget local builder builder-config.json");

  const indexText = fs.readFileSync(path.join(builderRoot, "index.html"), "utf8");
  const embeddedConfig = (() => {
    const match = indexText.match(/<script id="local-builder-config" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) {
      errors.push("sap-sac-custom-widget local builder index.html missing local-builder-config JSON script");
      return null;
    }
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      errors.push(`sap-sac-custom-widget local builder embedded config is invalid JSON: ${error.message}`);
      return null;
    }
  })();
  validateLocalBuilderConfig(embeddedConfig, "sap-sac-custom-widget local builder embedded config");
  if (config && embeddedConfig && JSON.stringify(config) !== JSON.stringify(embeddedConfig)) {
    errors.push("sap-sac-custom-widget local builder embedded config must match builder-config.json");
  }

  if (!indexText.includes('href="./builder.css"')) {
    errors.push("sap-sac-custom-widget local builder index.html must load ./builder.css");
  }
  if (!indexText.includes('src="./builder.js"')) {
    errors.push("sap-sac-custom-widget local builder index.html must load ./builder.js");
  }
  if (!indexText.includes("local-builder-config")) {
    errors.push("sap-sac-custom-widget local builder index.html must embed local-builder-config JSON");
  }
  if (!indexText.includes("patternHintButtons")) {
    errors.push("sap-sac-custom-widget local builder index.html must expose patternHintButtons UI");
  }

  const builderJs = fs.readFileSync(path.join(builderRoot, "builder.js"), "utf8");
  if (!builderJs.includes("widget.json") || !builderJs.includes("-resources.zip")) {
    errors.push("sap-sac-custom-widget local builder builder.js must default to widget.json plus <slug>-resources.zip downloads");
  }
  for (const forbidden of [".html", ".css", ".md", "design-runtime/"]) {
    if (!builderJs.includes(forbidden)) {
      errors.push(`sap-sac-custom-widget local builder builder.js must explicitly exclude ${forbidden} from Resource-ZIP output`);
    }
  }
  for (const required of ["renderPatternHints", "applyPatternHint", "patternHints"]) {
    if (!builderJs.includes(required)) {
      errors.push(`sap-sac-custom-widget local builder builder.js must include ${required}`);
    }
  }

  for (const relativeFile of ["builder.js", "server.mjs"]) {
    const jsCheck = spawnSync(process.execPath, ["--check", path.join(builderRoot, relativeFile)], { encoding: "utf8" });
    if (jsCheck.status !== 0) {
      errors.push(`sap-sac-custom-widget local builder ${relativeFile} failed syntax check: ${(jsCheck.stderr || jsCheck.stdout).trim()}`);
    }
  }
}

function validateSacBuilderPanelTemplate() {
  const builderPanelFile = path.join(
    pluginsRoot,
    "sap-sac-custom-widget",
    "skills",
    "sap-sac-custom-widget",
    "templates",
    "builder-panel.js",
  );
  if (!fs.existsSync(builderPanelFile)) {
    errors.push("sap-sac-custom-widget missing templates/builder-panel.js");
    return;
  }
  const text = fs.readFileSync(builderPanelFile, "utf8");
  for (const required of ["customElements.define", "propertiesChanged", "onCustomWidgetBeforeUpdate", "onCustomWidgetAfterUpdate"]) {
    if (!text.includes(required)) {
      errors.push(`sap-sac-custom-widget templates/builder-panel.js missing ${required}`);
    }
  }
  const jsCheck = spawnSync(process.execPath, ["--check", builderPanelFile], { encoding: "utf8" });
  if (jsCheck.status !== 0) {
    errors.push(`sap-sac-custom-widget templates/builder-panel.js failed syntax check: ${(jsCheck.stderr || jsCheck.stdout).trim()}`);
  }
}

async function smokeServeRuntimeFixture(runtimeRoot) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sap-sac-widget-runtime-"));
  try {
    fs.cpSync(runtimeRoot, path.join(root, "design-runtime"), { recursive: true });
    fs.writeFileSync(path.join(root, "widget.json"), JSON.stringify({
      id: "com.company.widgetname",
      version: "1.0.0",
      name: "Generated Widget",
      vendor: "Company Name",
      webcomponents: [
        { kind: "main", tag: "com-company-widgetname", url: "widget.js", ignoreIntegrity: true }
      ],
      properties: {
        title: { type: "string", default: "Generated Widget" }
      },
      dataBindings: {
        myDataBinding: {
          feeds: [
            { id: "dimensions", description: "Dimension", type: "dimension" },
            { id: "measures", description: "Measure", type: "mainStructureMember" }
          ]
        }
      }
    }, null, 2));
    const fixtureWidgetJs = path.join(root, "widget.js");
    fs.writeFileSync(fixtureWidgetJs, `(function() {
  "use strict";
  class WidgetName extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    onCustomWidgetAfterUpdate() {
      this.shadowRoot.textContent = this.title || "Generated Widget";
    }
  }
  customElements.define("com-company-widgetname", WidgetName);
})();
`);
    const fixtureJsCheck = spawnSync(process.execPath, ["--check", fixtureWidgetJs], { encoding: "utf8" });
    if (fixtureJsCheck.status !== 0) {
      errors.push(`sap-sac-custom-widget design runtime smoke fixture widget.js failed syntax check: ${(fixtureJsCheck.stderr || fixtureJsCheck.stdout).trim()}`);
    }

    const mime = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json"
    };
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      const pathname = url.pathname === "/" ? "/design-runtime/index.html" : url.pathname;
      const file = path.normalize(path.join(root, pathname));
      if (!isPathInside(root, file) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
      res.end(fs.readFileSync(file));
    });

    try {
      await new Promise((resolve, reject) => {
        server.on("error", reject);
        server.listen(0, "127.0.0.1", resolve);
      });
    } catch (error) {
      errors.push(`sap-sac-custom-widget design runtime smoke: could not start local loopback server on 127.0.0.1: ${error.message}`);
      return;
    }

    try {
      const base = `http://127.0.0.1:${server.address().port}`;
      const urls = [
        "/design-runtime/index.html",
        "/design-runtime/runtime.css",
        "/design-runtime/runtime.js",
        "/design-runtime/design-runtime.json",
        "/widget.json",
        "/widget.js"
      ];
      for (const url of urls) {
        let response;
        try {
          response = await fetch(base + url);
        } catch (error) {
          errors.push(`sap-sac-custom-widget design runtime smoke: could not fetch ${url} from local loopback server: ${error.message}`);
          continue;
        }
        if (!response.ok) {
          errors.push(`sap-sac-custom-widget design runtime smoke: ${url} returned HTTP ${response.status}`);
          continue;
        }
        const text = await response.text();
        if (url.endsWith(".json")) {
          try {
            JSON.parse(text);
          } catch (error) {
            errors.push(`sap-sac-custom-widget design runtime smoke: ${url} invalid JSON: ${error.message}`);
          }
        }
        if (url.endsWith("/runtime.js") && !text.includes("sap-sac-widget-agent-iteration/v1")) {
          errors.push("sap-sac-custom-widget design runtime smoke: runtime.js missing iteration export schema");
        }
      }
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

async function validateSacDesignRuntimeTemplate() {
  const runtimeRoot = path.join(
    pluginsRoot,
    "sap-sac-custom-widget",
    "skills",
    "sap-sac-custom-widget",
    "templates",
    "design-runtime",
  );

  const requiredFiles = ["index.html", "runtime.css", "runtime.js", "design-runtime.json"];
  for (const relativeFile of requiredFiles) {
    if (!fs.existsSync(path.join(runtimeRoot, relativeFile))) {
      errors.push(`sap-sac-custom-widget design runtime missing ${relativeFile}`);
    }
  }
  if (requiredFiles.some((relativeFile) => !fs.existsSync(path.join(runtimeRoot, relativeFile)))) {
    return;
  }

  const sidecarFile = path.join(runtimeRoot, "design-runtime.json");
  const indexFile = path.join(runtimeRoot, "index.html");
  const sidecar = readJsonTemplate(sidecarFile, "sap-sac-custom-widget design-runtime.json");
  const embedded = extractEmbeddedRuntimeConfig(indexFile);
  validateRuntimeConfig(sidecar, "sap-sac-custom-widget design-runtime.json");
  validateRuntimeConfig(embedded, "sap-sac-custom-widget embedded runtime config");
  if (sidecar && embedded && JSON.stringify(sidecar) !== JSON.stringify(embedded)) {
    errors.push("sap-sac-custom-widget design runtime embedded config must match design-runtime.json");
  }

  const jsCheck = spawnSync(process.execPath, ["--check", path.join(runtimeRoot, "runtime.js")], { encoding: "utf8" });
  if (jsCheck.status !== 0) {
    errors.push(`sap-sac-custom-widget design runtime runtime.js failed syntax check: ${(jsCheck.stderr || jsCheck.stdout).trim()}`);
  }

  await smokeServeRuntimeFixture(runtimeRoot);
}

for (const file of walk(pluginsRoot).filter((item) => repoRelativePath(item).includes("/templates/"))) {
  const rel = repoRelativePath(file);
  const text = fs.readFileSync(file, "utf8");
  if (looksLikeSecret(text)) {
    errors.push(`${rel}: template appears to contain a literal secret`);
  }
  if (file.endsWith(".json")) {
    try {
      JSON.parse(stripPlaceholders(text));
    } catch (error) {
      errors.push(`${rel}: invalid JSON template after placeholder normalization: ${error.message}`);
    }
  }
}

validateHttpsToSftpIflowTemplate();
await validateSacDesignRuntimeTemplate();
validateSapSampleWidgetLessons();
validateSacLocalBuilderTemplate();
validateSacBuilderPanelTemplate();

if (errors.length > 0) {
  console.error("Template validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Template validation passed.");
