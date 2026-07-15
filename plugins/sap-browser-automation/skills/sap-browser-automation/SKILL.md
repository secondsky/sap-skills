---
name: sap-browser-automation
description: Use when an agent must inspect or operate an authenticated SAP web UI through an in-app Browser, Microsoft Edge CDP, or an existing Playwright client, especially when SAP SSO reuse, isolated Edge profiles, deterministic target selection, screenshots, or browser bootstrap recovery is required.
license: GPL-3.0
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.3.2"
  last_verified: 2026-07-14
  documentation_source: "docs/project/sap-browser-automation-source-review-2026-07-14.md"
  status: docs_audited_runtime_pending
  known_issues:
    - In-app Browser authentication is desktop-runtime-dependent and its validation is deferred to Codex or Claude Desktop.
    - SAC and Datasphere SSO, cross-domain cookies, client certificates, MFA, and enterprise Edge policy require tenant-specific verification.
---

# SAP Browser Automation

Use this skill as the shared browser layer for SAP-specific skills. It owns surface selection,
authentication bootstrap, isolated Edge/CDP startup, state reuse, target verification, evidence,
recovery, and cleanup. The consuming skill still owns the SAP action boundaries: story edits,
planning writeback, model changes, Datasphere deployment, SQL execution, and test acceptance.

## Related Skills

- **sap-sac-scripting**: SAC story/runtime scripting and reporting-story implementation.
- **sap-sac-test-automation**: SAC acceptance, discovery packets, Playwright suites, and evidence.
- **sap-sac-planning**: SAC planning models, writeback, versions, data actions, and locks.
- **sap-datasphere**: Datasphere modeling, deployment, spaces, connections, and administration.
- **browser:control-in-app-browser**: Installed in-app Browser runtime and secure manual authentication.

## When to Use This Skill

Use this skill whenever an agent must interact with an authenticated SAP web UI, select or inspect a
browser target, start Edge with loopback CDP, reuse an approved Edge profile, transfer scoped browser
state to an already-installed compatible client, or recover from browser bootstrap/authentication
failure. Do not use it for code-only, API-only, CLI-only, or database-native tasks that do not need
visible browser state.

## Quick Reference

| Need | Route |
| --- | --- |
| Manual SSO in the current browser | In-app Browser, then visible signed-in verification |
| Enterprise Edge or no Playwright installation | Fresh isolated Edge with copied profile and loopback CDP |
| Independent compatible browser context | Existing Playwright plus scoped `storageState` or CDP state transfer |
| Missing auth or failed browser bootstrap | User-assisted login, recovery, or specification-only handoff |

## Operating contract

- Prefer a connector, API, CLI, or database-native check when it can answer the request without a browser.
- Try the in-app Browser first when it is available and the task needs authenticated visible UI.
- Ask the user to authenticate manually in the in-app Browser when its target redirects to SSO. Use its secure authentication capability; never ask for passwords or OTPs in chat.
- After in-app verification, use the fresh Edge path for reliable automation when the task needs CDP, enterprise extensions, or a reusable profile.
- Ask explicit permission before reusing the user's authenticated normal Edge profile or closing Edge.
- Copy only after Edge is closed, and copy to an isolated profile path. Treat the copy, cookies, tokens, local storage, and storage-state files as credentials.
- Bind CDP to `127.0.0.1`; never expose the port, WebSocket endpoint, profile, or auth state to a network, repository, log, screenshot, or Oracle review.
- Verify the tenant, host, path, title, authenticated DOM, and target page before interaction. Never guess the first tab or target ID.
- Default to read-only actions. The consuming SAP skill must explicitly authorize writes, publishing, deployment, planning, model, permission, or destructive actions.
- Browser startup, CDP attachment, or a successful login redirect is not evidence that the requested SAP task completed.

Load the focused references only when needed:

- `references/edge-cdp-control.md` for Edge launch, CDP discovery, target selection, and recovery.
- `references/auth-state-bootstrap.md` for copying an authenticated Edge profile, exporting scoped state when available, and injecting it into compatible clients.
- `references/in-app-browser-auth.md` for manual in-app authentication and capability boundaries.
- Run `scripts/edge-profile.ps1` for deterministic profile cloning, launch, status, and stop operations.
- Run `scripts/cdp-agent.mjs` for target discovery, inspection, interaction, screenshots, and authentication-state transfer. It requires Node.js 22 or newer and no npm packages.

## Standard workflow

### 1. Classify the task and choose a surface

Record the target application, tenant/host, requested URL, read/write intent, evidence required, and
whether the user approved profile reuse. Use this order:

1. Existing non-browser tool if sufficient.
2. In-app Browser for visible authenticated UI and manual SSO.
3. Fresh isolated Edge with loopback CDP for enterprise browser behavior and reusable authentication.
4. Already-installed Playwright connected over CDP or using local storage state.
5. Approved desktop/manual assistance or a specification-only handoff.

Do not install Playwright, browser binaries, MCP servers, or extensions in an enterprise environment
unless the user explicitly requests and approves that change. If Playwright is unavailable, Edge/CDP
remains the primary automation surface.

### 2. Authenticate in the in-app Browser

Open the target using the installed Browser skill. Inspect visible state. If the page requires SSO,
pause for the user to complete the login manually through the supported secure auth flow. Verify a
positive signed-in signal on the target domain and retain a screenshot or equivalent evidence when
allowed.

Do not extract cookies, local storage, session storage, profile databases, passwords, or tokens from the
in-app Browser. Its session is independent from Edge. If it cannot expose an authenticated page after
manual login, record the failure and continue to the approved Edge path.

This route runs inside Codex or Claude Desktop. Its runtime validation is deferred to those desktop
environments and is not part of the standalone Edge/CDP acceptance tests.

### 3. Capture live Edge state, then bootstrap fresh Edge

Before touching the user's normal Edge profile, state the intended scope and ask for confirmation:

> I will capture the approved SAP session from the currently authenticated Edge target, close normal Edge, and clone its selected profile into an isolated automation directory. May I continue?

If the user declines, ask them to authenticate once in the isolated profile. If they approve:

1. Identify the normal Edge user-data root, selected `Default` or `Profile N`, target URL, tenant host,
   target path/title, approved SAP origin, and local temporary state-file path.
2. While normal Edge is still running and visibly authenticated, open
   `edge://inspect/#remote-debugging` and enable **Allow remote debugging for this browser instance**.
3. Run `scripts/cdp-agent.mjs export-auth` against the normal user-data directory. Require host, path,
   and/or title filters that resolve exactly one approved page. Repeat `--origin` for approved SAP or
   identity-provider cookie scopes.
4. Close normal Edge and verify no `msedge.exe` process still owns the source profile.
5. Run `scripts/edge-profile.ps1 -Action CloneLaunch` with the selected profile name and a new or empty
   automation root. The helper preserves `Profile N`, refuses non-empty clone destinations, launches
   with `--remote-debugging-port=0`, and verifies the listener discovered through `DevToolsActivePort`.
6. Run `scripts/cdp-agent.mjs inspect` and verify tenant, path, title, visible signed-in state, and page readiness.
7. If cloning lost volatile state, run `scripts/cdp-agent.mjs import-auth` against the isolated target,
   reload, and repeat the authenticated-state inspection.
8. If authentication still fails, ask the user to log in once in the isolated profile. Reuse it later
   with `scripts/edge-profile.ps1 -Action LaunchExisting`; never clone over a populated automation root.

The complete Windows commands, path checks, CDP probes, and recovery matrix are in
`references/edge-cdp-control.md` and `references/auth-state-bootstrap.md`.

### 4. Operate the verified target

Use the isolated Edge instance directly. Run `scripts/cdp-agent.mjs --help` for the complete command
surface. The bundled driver supports deterministic targets, inspection/snapshot, navigation,
evaluation, selector or coordinate clicks, text entry, key presses, screenshots, and auth-state
export/import without Playwright. Use an existing Playwright installation only when the consuming task
needs it; do not install it for this workflow.

Authentication transfer uses CDP `Storage.getCookies` and `Storage.setCookies` plus page-scoped
`localStorage` and `sessionStorage`. Recheck SSO redirects, SameSite behavior, certificates, and visible
readiness after import. The in-app Browser remains a separate session.

### 5. Verify readiness and perform the domain action

Before changing anything, verify:

- tenant and application identity;
- authenticated state, not merely a non-login URL;
- correct Story Designer, Modeler, Data Builder, SQL editor, or test target area;
- visible readiness markers and absence of blocking errors;
- approved host/path and selected target page;
- current model/story/widget metadata when the consuming skill requires it.

Capture page-specific evidence and explicit no-data/error states. Do not treat a spinner disappearing,
CDP connecting, or a browser window opening as task completion.

### 6. Recover or hand off honestly

Use the following fallback sequence:

1. Retry the selected browser using its documented troubleshooting guidance.
2. Use the Edge/CDP recovery and `DevToolsActivePort` fallback.
3. Ask for one-time manual authentication in the isolated Edge profile.
4. Use approved desktop/manual assistance if the environment supports it.
5. If no authenticated target can be verified, stop and provide an implementation-ready specification, the exact missing evidence, and the next manual action.

Report authentication as `verified`, `missing`, `expired`, `blocked`, or `unknown`; never infer success
from browser bootstrap alone.

## Troubleshooting

Common failures are handled in the shared Edge reference: refused or missing CDP endpoints, `404`
discovery responses, wrong targets, SSO redirects, copied profiles that are not authenticated, policy
blocks, and runtime/widget errors. When recovery cannot establish a verified authenticated target,
stop and hand off the missing evidence rather than guessing or claiming completion.

## Sources and Verification

The public-source review and the distinction between documented behavior and unverified tenant behavior
are recorded in `docs/project/sap-browser-automation-source-review-2026-07-14.md`.

## Safety and evidence

Profile copies and auth-state files may contain cookies, refresh tokens, saved passwords, history,
extensions, and enterprise session data. Keep them in a user-local path with restricted access. Do not
place them under the repository, commit them, send them to Oracle, include them in bug reports, or
paste their contents into chat. Redact tenant IDs, story IDs, query strings, session-like URL values,
cookie values, WebSocket endpoints, and unrelated tabs from evidence.

For any write-capable action, record the approving user, target, intended mutation, before/after
verification, and rollback or cleanup status. The consuming SAP skill remains authoritative for
whether the action itself is allowed.
