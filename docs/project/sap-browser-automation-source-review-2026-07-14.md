# SAP Browser Automation Source Review — 2026-07-14

This review combines public documentation with a local standalone Edge/CDP fixture. It does not claim
live SAC, Datasphere, enterprise SSO, or in-app Browser runtime validation.

## Sources reviewed

- Microsoft Edge DevTools MCP documentation: https://learn.microsoft.com/en-us/microsoft-edge/web-platform/devtools-mcp-server
  - Reviewed `--executablePath`, `--autoConnect`, `--user-data-dir`, and `DevToolsActivePort` behavior.
- Microsoft Edge remote debugging policy: https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies/remotedebuggingallowed
  - Reviewed the policy boundary for remote debugging.
- Playwright authentication: https://playwright.dev/docs/auth
  - Reviewed authenticated state reuse, storage-state sensitivity, and IndexedDB coverage.
- Playwright BrowserContext: https://playwright.dev/docs/api/class-browsercontext
  - Reviewed cookie injection, storage-state loading, and persistent context behavior.
- Playwright BrowserType: https://playwright.dev/docs/api/class-browsertype
  - Reviewed Edge channels, persistent contexts, and `connectOverCDP` limitations.
- Chrome DevTools Protocol Network domain: https://chromedevtools.github.io/devtools-protocol/tot/Network/
  - Confirmed that `Network.getAllCookies` is deprecated in favor of `Storage.getCookies`.
- Chrome DevTools Protocol Storage domain: https://chromedevtools.github.io/devtools-protocol/tot/Storage/
  - Reviewed browser-level `Storage.getCookies` and `Storage.setCookies` state transfer.
- SAP Analytics Cloud Help, SameSite cookie configuration: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/c863b66d03154c81a5f1bee769bb2713.html
  - Reviewed cross-site cookie behavior relevant to SAC live connections.

## Local evidence

- Existing repository Edge/CDP references contain loopback binding, dedicated profile, endpoint polling,
  `DevToolsActivePort`, target selection, redaction, cleanup, and domain-specific action boundaries.
- The installed in-app Browser documentation provides secure manual authentication but does not expose a
  supported Edge cookie/profile import surface.
- Microsoft Edge 150.0.4078.65 launched against an isolated profile through a path containing spaces
  with loopback CDP and a dynamic port. Node.js 24.18.0 discovered `DevToolsActivePort`, selected the
  intended target, evaluated the page, clicked, typed, and captured a PNG without Playwright or Puppeteer.
- A local profile-copy fixture preserved a persistent cookie but did not preserve a session cookie after
  source Edge closed. The implemented workflow therefore exports volatile state before shutdown.
- The bundled integration fixture exported cookies plus local/session storage from a live source target,
  launched a separate isolated Edge profile, imported state with CDP, reloaded, and verified all fixture
  values. It also verified `Default` and `Profile 2`, non-empty clone rejection, stale-port replacement,
  deterministic target failure, and isolated-process cleanup.
- In-app Browser runtime validation is deferred to Codex or Claude Desktop and is excluded from the
  standalone terminal acceptance suite.

## Claims boundary

Profile copying and state injection are documented as consent-gated local procedures. Successful reuse
of a specific enterprise SSO session, certificate, tenant, or browser policy remains runtime- and
tenant-specific evidence that must be collected during the task.
