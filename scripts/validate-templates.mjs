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

if (errors.length > 0) {
  console.error("Template validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Template validation passed.");
