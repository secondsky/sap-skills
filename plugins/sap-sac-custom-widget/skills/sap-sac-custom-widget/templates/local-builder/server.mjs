#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const host = "127.0.0.1";
const protocol = "http";
const requestedPort = Number.parseInt(process.env.PORT || "8177", 10);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function isInside(base, file) {
  const relative = path.relative(base, file);
  return relative === "" || (relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}

function serveFile(req, res) {
  const url = new URL(req.url, protocol + "://" + host);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  let decodedPathname;

  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    res.end("bad request");
    return;
  }

  const candidate = path.normalize(path.join(root, decodedPathname));

  if (!isInside(root, candidate) || !fs.existsSync(candidate) || fs.statSync(candidate).isDirectory()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found");
    return;
  }

  res.writeHead(200, { "content-type": mime[path.extname(candidate)] || "application/octet-stream" });
  res.end(fs.readFileSync(candidate));
}

const server = http.createServer(serveFile);

server.listen(requestedPort, host, () => {
  const address = server.address();
  console.log("SAC local builder running at " + protocol + "://" + host + ":" + address.port + "/");
});
