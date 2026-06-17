# SAC Test Automation Source Review

Source: Repository-local planning artifact `SAC_Automated_Test_Suite_Playwright_AgentBrowser_Plan.md`.

This note records the source basis for the initial `sap-sac-test-automation` skill. The skill distills the local plan into a concise `SKILL.md` plus targeted references for architecture, tool availability, Chrome DevTools MCP discovery, Edge/CDP discovery, profile/scenario contracts, agent-browser discovery, Playwright execution, governance/testability, and failure triage.

The source plan cites SAP Help material for SAC optimized stories, scripting, comments, planning versions, data-entry errors, and validation rules; Vercel Labs `agent-browser`; and Playwright documentation for installation, locators, auto-waiting, authentication, traces, screenshots, videos, visual comparisons, reporters, and CI.

The enterprise browser update also reviewed Microsoft Edge DevTools Protocol documentation, Microsoft Edge DevTools MCP guidance, Microsoft Edge `RemoteDebuggingAllowed` policy documentation, Playwright browser/channel guidance for `msedge`, Chrome DevTools MCP issue #1235 and PR #1229, and Firecrawl public documentation for MCP setup, lockdown mode, PII redaction, and interact sessions. The skill records these as docs-audited constraints only; it does not claim that any live SAC tenant, corporate Edge profile, or Firecrawl deployment was exercised.

The Chrome DevTools MCP expansion reviewed the public `ChromeDevTools/chrome-devtools-mcp` repository at release `chrome-devtools-mcp-v1.2.0`, including README support boundaries, MCP server flags, experimental `chrome-devtools` CLI behavior, tool categories, slim mode, troubleshooting notes for Windows/Codex/WSL/sandbox/VM setups, package metadata, and bundled Chrome DevTools skills. The resulting skill guidance treats Chrome DevTools MCP as a first-class optional discovery/debugging backend, with official support limited to Google Chrome and Chrome for Testing and Edge/WebView2 treated as best-effort through `--executablePath`, `--browser-url`, or `--autoConnect`.

Verification scope is documentation and architecture review only. Live SAC tenant execution, SSO behavior, stored-auth refresh, CI execution, visual baseline stability, comments, planning writeback, data actions, and multi actions remain tenant-specific and require separate evidence before runtime claims.
