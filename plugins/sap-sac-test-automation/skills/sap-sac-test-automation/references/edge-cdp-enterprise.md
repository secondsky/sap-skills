# Microsoft Edge CDP Enterprise Discovery

Source: Microsoft Edge DevTools Protocol documentation, Microsoft Edge DevTools MCP documentation, Microsoft Edge `RemoteDebuggingAllowed` policy, Chrome DevTools MCP issue #1235 and PR #1229, and Playwright browser documentation.

Use installed Microsoft Edge/CDP as a local discovery and triage mode when enterprise SSO, client certificates, mandatory extensions, or corporate browser policy make generic browser automation unrealistic. Do not make raw CDP attach the default CI regression runner.

Important Edge finding: Edge can report `Server running at: 127.0.0.1:9222` while `http://127.0.0.1:9222/json/version` and `/json/list` still return `404`. When that happens, do not assume CDP is unusable. On Windows, read `DevToolsActivePort` and connect through the direct browser WebSocket endpoint.

## Upstream Tool Boundary

- Microsoft Edge DevTools Protocol matches Chrome DevTools Protocol APIs and exposes `/json/version`, `/json/protocol`, `/json/list`, and target `webSocketDebuggerUrl` endpoints.
- Microsoft's Edge guidance for Chrome DevTools MCP uses `--executablePath`, `--autoConnect`, and `--user-data-dir` to launch or attach to Edge/WebView2.
- Upstream `ChromeDevTools/chrome-devtools-mcp` officially supports Chrome and Chrome for Testing. Microsoft Edge is best-effort even when Microsoft documents compatible `--executablePath`, `--browser-url`, or `--autoConnect` usage.
- Chrome DevTools MCP issue #1235 and PR #1229 show that direct built-in Edge support such as `--browser=edge` was not accepted as a guaranteed upstream path. Treat `--browser=edge` as unavailable unless the installed version explicitly advertises it.
- Playwright supports installed Microsoft Edge through `channel: 'msedge'`, `msedge-beta`, `msedge-dev`, and `msedge-canary`. Prefer this for deterministic tests when the environment is controlled.

## Safety Rules

- Use a dedicated SAC automation Edge profile whenever possible.
- Avoid attaching to the user's daily Edge profile. Permit it only for explicit, user-assisted triage with a trusted agent and minimal prompts.
- Keep CDP local: use `127.0.0.1` URLs, never bind to `0.0.0.0`, never tunnel the port, and never publish `webSocketDebuggerUrl`.
- Close Edge or disable remote debugging after the session.
- Capture only approved artifacts. Do not commit profile folders, cookies, storage state, HARs with credentials, screenshots containing private data, or DevTools endpoint URLs.
- Respect `RemoteDebuggingAllowed`. If policy disables remote debugging, stop and use manual discovery, approved Playwright CI, or an enterprise browser lab.

## Windows Launch and Verification

Use a dedicated profile directory and verify only through loopback:

```powershell
$edge = "$Env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) {
  $edge = "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
}
if (-not (Test-Path $edge)) {
  throw "Microsoft Edge was not found in the default machine-wide install paths."
}

$profile = Join-Path $Env:TEMP "sac-edge-cdp-profile"
New-Item -ItemType Directory -Force -Path $profile | Out-Null

Start-Process -FilePath $edge -ArgumentList @(
  "--remote-debugging-port=9222",
  "--user-data-dir=$profile",
  "$Env:SAC_STORY_URL"
)

Invoke-RestMethod "http://127.0.0.1:9222/json/version"
Invoke-RestMethod "http://127.0.0.1:9222/json/list"
Get-NetTCPConnection -LocalPort 9222 -ErrorAction SilentlyContinue |
  Select-Object LocalAddress,LocalPort,State,OwningProcess
```

Proceed only when the listener is local to the workstation and policy allows the session. Stop if the port is exposed beyond local addresses.

If the organization requires a signed-in profile for SSO, create a named automation profile and document the approval. Do not reuse the daily profile by default.

### Windows `DevToolsActivePort` Fallback

If Edge shows a running CDP server but `/json/version` or `/json/list` returns `404`, read the active port file from the same Edge profile:

```powershell
$activePortFile = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\DevToolsActivePort"
$lines = Get-Content $activePortFile
$port = $lines[0]
$wsPath = $lines[1]
$wsEndpoint = "ws://127.0.0.1:$port$wsPath"
$wsEndpoint
```

Interpretation:

- Line 1 is the CDP port.
- Line 2 is the browser WebSocket path.
- The constructed endpoint has the shape `ws://127.0.0.1:<port>/devtools/browser/<id>`.

Use this direct WebSocket only with harnesses that accept `wsEndpoint`, `browserWSEndpoint`, `webSocketDebuggerUrl`, or an equivalent CDP endpoint option. Do not store or publish the endpoint.

## macOS Launch and Verification

```bash
PROFILE="${TMPDIR:-/tmp}/sac-edge-cdp-profile"
mkdir -p "$PROFILE"

open -na "Microsoft Edge" --args \
  --remote-debugging-port=9222 \
  --user-data-dir "$PROFILE" \
  "$SAC_STORY_URL"

curl -s http://127.0.0.1:9222/json/version
curl -s http://127.0.0.1:9222/json/list
lsof -nP -iTCP:9222 -sTCP:LISTEN
```

Proceed only when the listener is local to the workstation and policy allows the session. Stop if the port is exposed beyond local addresses.

## Discovery Packet

For Edge/CDP mode, save only reviewed, non-secret evidence:

```text
profiles/<dashboard>/discovery/edge-cdp/
  cdp-version.json
  targets-redacted.json
  observation-notes.md
  approved-screenshots/
  proposed-profile.yaml
  review-notes.md
```

Redact target URLs if they include tenant IDs, story IDs, bookmarks, session-like parameters, or customer names.

## Chrome DevTools MCP With Edge

Use this path only when Node/npm and Chrome DevTools MCP are approved. Prefer pinned/internal packages in company environments.

Launch Edge through the executable path:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@<approved-version>",
        "--executablePath=%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe",
        "--isolated",
        "--redact-network-headers",
        "--performance-crux=false",
        "--usage-statistics=false"
      ],
      "env": {
        "CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS": "1",
        "CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS": "1"
      }
    }
  }
}
```

Attach to an already-running approved Edge instance only when needed for SSO or corporate certificate triage. Start that Edge session with loopback-only remote debugging and a dedicated automation profile, then attach by URL:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@<approved-version>",
        "--browser-url=http://127.0.0.1:9222",
        "--redact-network-headers",
        "--performance-crux=false",
        "--usage-statistics=false"
      ],
      "env": {
        "CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS": "1",
        "CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS": "1"
      }
    }
  }
}
```

Use `--autoConnect` only for an approved automation profile that already exists on the workstation:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@<approved-version>",
        "--autoConnect",
        "--user-data-dir=%LocalAppData%\\SAC-Automation\\EdgeProfile",
        "--redact-network-headers",
        "--performance-crux=false",
        "--usage-statistics=false"
      ],
      "env": {
        "CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS": "1",
        "CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS": "1"
      }
    }
  }
}
```

Auto-connect inherits the browser session, cookies, accounts, and JavaScript-visible data for the selected profile. Use it only with a trusted agent, approved profile, and private-data handling rules. Do not point it at a daily user profile unless there is explicit, user-assisted triage approval and the evidence-handling policy is documented.

## Playwright and CDP

Prefer normal Playwright launch for tests:

```ts
{
  name: 'msedge',
  use: { ...devices['Desktop Edge'], channel: 'msedge' }
}
```

Use `chromium.connectOverCDP('http://127.0.0.1:9222')` only for local discovery or SSO-dependent triage. Do not build the main regression architecture around CDP attach because it is less hermetic than a normal Playwright project and depends on local browser/profile state.

When HTTP discovery returns `404`, connect through the `DevToolsActivePort` browser WebSocket instead if the chosen harness supports a direct WebSocket endpoint.
