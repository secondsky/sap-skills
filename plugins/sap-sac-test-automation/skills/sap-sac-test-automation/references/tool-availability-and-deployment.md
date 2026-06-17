# Tool Availability and Deployment

Source: Derived summary from `SAC_Automated_Test_Suite_Playwright_AgentBrowser_Plan.md`, Microsoft Edge DevTools Protocol documentation, Microsoft Edge DevTools MCP documentation, Playwright browser documentation, the `ChromeDevTools/chrome-devtools-mcp` v1.2.0 README/CLI/tool/troubleshooting docs, issue #1235/PR #1229, and Firecrawl public docs.

Treat browser tooling as optional. Restricted company laptops, Windows desktops, locked-down CI images, private npm registries, and enterprise browser policies can remove tools that are convenient in open development environments.

## Capability Gate

Before recommending a workflow, record:

- Operating system and shell: Windows PowerShell, macOS zsh, Linux shell, CI runner, or managed virtual desktop.
- SAC environment class: public demo, QA tenant, production read-only, planning/writeback, permission-sensitive, or private customer tenant.
- Available local tools: Google Chrome/Chrome for Testing, Microsoft Edge, Node.js LTS, npm/npx, Playwright project dependency, Chrome DevTools MCP server, experimental `chrome-devtools` CLI, agent-browser, curl/PowerShell web requests.
- Network policy: public npm allowed, internal npm registry required, browser downloads allowed, artifact mirror required, proxy required, custom CA required, outbound web blocked.
- Browser policy: Edge `RemoteDebuggingAllowed`, mandatory extensions, profile restrictions, certificate/SSO requirements, and whether a dedicated automation profile is allowed.
- Data handling policy: whether external research tools such as Firecrawl may receive URLs, rendered content, screenshots, HARs, or files.

Choose the first safe backend that satisfies both capability and policy:

| Backend | Use when | Do not use when |
|---|---|---|
| Manual observation packet | No automation tools are available or policy blocks browser control. | The user expects deterministic CI coverage. |
| Firecrawl public research | Researching public SAP, Microsoft, Playwright, Chrome DevTools MCP, GitHub, or browser docs. | The URL/content is authenticated, internal, customer-specific, or private unless security/legal approved the exact deployment and retention mode. |
| Installed Edge/CDP | Edge is installed, remote debugging is allowed, and local discovery needs SSO/certs/corporate browser behavior. | Remote debugging is blocked, only a daily user profile is available, or the port cannot be kept loopback-only. |
| Chrome DevTools MCP with Chrome | Chrome/Chrome for Testing and an approved MCP package are available for read-only discovery, console/network inspection, screenshots, Lighthouse, or performance traces. | The tool would handle private SAC without telemetry/update/CrUX controls, URL/profile controls, or an approved package source. |
| Chrome DevTools MCP with Edge | MCP is installed/approved and Edge can be launched through `--executablePath` or attached through approved `--autoConnect`/`--browser-url`. | The plan depends on direct `--browser=edge` support, or unpinned public package execution is blocked and no pinned/internal package is available. |
| Playwright project | The project has approved dependencies and needs deterministic regression/CI. | Browser downloads/dependencies are unavailable and no installed browser/channel fallback exists. |
| agent-browser | The CLI is available and read-only snapshot/ref exploration is useful. | It is not installed, not approved, or would encourage unreviewed autonomous writes. |
| Enterprise browser lab | The organization provides an approved remote browser/test service with proper tenant/data controls. | Data residency, retention, auth, or artifact handling is unclear. |

## Windows Checks

Use Windows-first checks in restricted company environments:

```powershell
$edgeCandidates = @(
  "$Env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe",
  "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$Env:LOCALAPPDATA\Microsoft\Edge SxS\Application\msedge.exe"
)
$edgeCandidates | ForEach-Object { [pscustomobject]@{ Path = $_; Exists = Test-Path $_ } }

Get-Command node -ErrorAction SilentlyContinue
Get-Command npm -ErrorAction SilentlyContinue
Get-Command npx -ErrorAction SilentlyContinue
Get-Command agent-browser -ErrorAction SilentlyContinue
Get-Command playwright -ErrorAction SilentlyContinue
Get-Command chrome-devtools -ErrorAction SilentlyContinue
Get-Command chrome-devtools-mcp -ErrorAction SilentlyContinue
```

For browser policy, check with the workstation owner or administrator first. If allowed to inspect local policy, use read-only registry checks such as:

```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Edge" -Name RemoteDebuggingAllowed -ErrorAction SilentlyContinue
Get-ItemProperty -Path "HKCU:\SOFTWARE\Policies\Microsoft\Edge" -Name RemoteDebuggingAllowed -ErrorAction SilentlyContinue
```

If `RemoteDebuggingAllowed` is disabled or unknown and policy owners do not approve remote debugging, do not attempt CDP. Use manual discovery, approved Playwright CI, or an enterprise browser lab.

## Restricted Package and Browser Downloads

- Prefer checked-in project dependencies and pinned package versions over unpinned moving package tags.
- If public npm is blocked, use the internal npm registry or an approved cached package/tarball. Do not instruct users to bypass company package controls.
- If Playwright browser downloads are blocked, use `PLAYWRIGHT_DOWNLOAD_HOST` for an internal artifact repository, `HTTPS_PROXY` for approved proxy egress, `NODE_EXTRA_CA_CERTS` for enterprise CAs, or a pre-provisioned `PLAYWRIGHT_BROWSERS_PATH`.
- For Chrome DevTools MCP in private SAC contexts, prefer `chrome-devtools-mcp@<approved-version>`, disable usage statistics/update checks/CrUX lookups, use isolated profiles, and capture large outputs to files.
- If the organization requires Microsoft Edge, use Playwright `channel: 'msedge'` in controlled runners with Edge already installed.
- If local Edge policies or mandatory extensions interfere with Playwright, keep local work to manual or Edge/CDP discovery and run deterministic tests on approved CI images.

## Firecrawl Policy

Use Firecrawl MCP for public-source research by default:

- Public SAP Help and SAP Community pages.
- Microsoft Edge DevTools Protocol, DevTools MCP, and policy documentation.
- Playwright public docs.
- Chrome DevTools MCP public GitHub issues, PRs, README, and release notes.
- Other public browser/tooling documentation needed for the automation plan.

Do not send the following to Firecrawl unless security/legal explicitly approve the deployment, tenant, retention mode, and data scope:

- Authenticated SAC tenant pages.
- Internal URLs or private company documents.
- Customer data, screenshots, HAR files, traces, cookies, storage state, tokens, exported reports, profile directories, or credential material.
- User browser session data or daily profile artifacts.

When Firecrawl is approved for sensitive work, still minimize data:

- Prefer public docs and synthetic QA pages.
- Use `lockdown: true` only when cache-only behavior is acceptable; it is cache-only and may fail on uncached pages.
- Use `redactPII: true` as a safety layer, not as permission to send secrets.
- Treat `interact` and hosted browser sessions as high risk because they can run Playwright/agent-browser and return CDP/live-view URLs.
- Stop interact sessions when finished and record the approval, mode, and retention assumptions in the discovery notes.

## No-Tool Fallback

When automation tools are unavailable, produce a manual observation packet:

```text
profiles/<dashboard>/discovery/manual/
  observation-notes.md
  approved-screenshots/
  component-inventory.csv
  candidate-profile.yaml
  risks-and-blockers.md
```

Include story URL pattern with tenant redacted, page/tab names, widget labels, owner-approved screenshots, expected values, role matrix, known volatile areas, and a clear list of automation blockers.
