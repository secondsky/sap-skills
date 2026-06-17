# Chrome DevTools MCP for SAC Discovery

Source: `ChromeDevTools/chrome-devtools-mcp` README, CLI docs, tool reference, troubleshooting guide, package metadata, and bundled Chrome DevTools skills, reviewed against release `chrome-devtools-mcp-v1.2.0` on 2026-06-17.

Use Chrome DevTools MCP as an optional discovery and debugging backend for SAC. Prefer it for read-only exploration, accessibility snapshots, screenshots, console and network inspection, Lighthouse checks, performance traces, and targeted JavaScript inspection. Do not use it as the audited CI release gate; convert reviewed findings into profile-driven Playwright tests.

## Operation Safety

Classify normal SAC use as `read-only tenant` discovery plus `local-only` browser/process control. Chrome DevTools MCP can become `mutating tenant` or `destructive` if it is used to click buttons, submit planning values, publish versions, execute actions, update comments, delete artifacts, reset data, or drive any state-changing SAC workflow. Require explicit user approval before any mutating tenant or destructive action, and keep tenant URLs, credentials, tokens, cookies, storage state, and profile folders out of committed artifacts.

## Upstream Boundary

- Chrome DevTools MCP is an MCP server for controlling and inspecting a live Chrome browser through DevTools and Puppeteer.
- The package also exposes an experimental `chrome-devtools` CLI that talks to a background daemon through Unix sockets or Windows named pipes.
- Upstream officially supports Google Chrome and Chrome for Testing. Other Chromium browsers, including Microsoft Edge, may work but are not guaranteed.
- Edge/WebView2 usage belongs in `edge-cdp-enterprise.md`: use `--executablePath`, `--browser-url`, or `--autoConnect` when policy allows it; do not depend on `--browser=edge`.
- Node.js LTS, npm/npx, and an approved Chrome installation are prerequisites unless the organization provides a pinned/internal package path.

## SAC-Safe Server Configuration

For private SAC tenants, start from a conservative configuration:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@<approved-version>",
        "--isolated",
        "--viewport=1440x1000",
        "--redact-network-headers",
        "--performance-crux=false",
        "--usage-statistics=false",
        "--screenshot-format=jpeg",
        "--screenshot-quality=80",
        "--screenshot-max-width=1600",
        "--screenshot-max-height=1200"
      ],
      "env": {
        "CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS": "1",
        "CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS": "1"
      }
    }
  }
}
```

Use the package's moving `latest` dist-tag only for local experiments or public demos. In enterprise/private SAC contexts, use an approved version, internal npm registry, or cached package.

When Chrome supports URL allow lists, add an SAC allow pattern:

```json
"args": [
  "-y",
  "chrome-devtools-mcp@<approved-version>",
  "--isolated",
  "--allowed-url-pattern=https://*.sapanalytics.cloud/*"
]
```

When allow lists are unavailable, use reviewed `--blocked-url-pattern` entries and manual checks. URL controls reduce accidental navigation but do not replace tenant/data-handling policy.

## Supported Operating Modes

| Mode | Use when | Guardrail |
|---|---|---|
| Launched Chrome | Chrome/Chrome for Testing is installed and MCP can launch it. | Use `--isolated` for discovery unless an approved profile is required. |
| `--slim` | Only navigation, JavaScript evaluation, and screenshots are needed. | Good for low-surface private discovery; not enough for network/performance work. |
| `--browser-url` | Browser runs outside the MCP sandbox or in a host/VM scenario. | Bind browser debugging to loopback and use a non-default profile. |
| `--wsEndpoint` | A specific DevTools WebSocket endpoint must be targeted. | Do not log or publish `webSocketDebuggerUrl`; custom headers can expose secrets. |
| Chrome 144+ `--autoConnect` | A user-approved running Chrome profile is needed. | It can expose all open windows for the selected profile. Avoid daily profiles for private SAC. |
| Experimental CLI | MCP tools are unavailable but global `chrome-devtools` is installed. | Daemon state persists; run `chrome-devtools stop` after private SAC work. |

## Useful Tool Categories for SAC

- Navigation: `new_page`, `navigate_page`, `list_pages`, `select_page`, `wait_for`.
- Discovery: `take_snapshot`, `take_screenshot`, `evaluate_script`.
- Console/network: `list_console_messages`, `get_console_message`, `list_network_requests`, `get_network_request`.
- Performance: `performance_start_trace`, `performance_stop_trace`, `performance_analyze_insight`, `lighthouse_audit`.
- Emulation: `resize_page` and fixed viewport only; avoid geolocation, custom headers, user agent spoofing, or network throttling unless the test plan requires it.

For large outputs, use `filePath` so screenshots, snapshots, traces, network bodies, and script output land in the profile discovery folder instead of the conversation. Use pagination and filtering for console/network tools. Keep `includeSnapshot` false on input tools unless a fresh state snapshot is needed.

## Disabled Unless Approved

Keep these off for normal SAC discovery:

- `--memoryDebugging`: heap snapshots may contain sensitive strings or data structures.
- `--categoryExtensions`: extension tooling is Chrome-only and expands browser control.
- `--categoryExperimentalThirdParty`: page-exposed tools can execute application-provided capabilities.
- `--categoryExperimentalWebmcp`: page-exposed WebMCP tools require additional browser flags and trust review.
- `--experimentalScreencast`: video captures private screens and requires ffmpeg.
- `--experimentalVision` and `click_at`: coordinate clicking is brittle for SAC and bypasses semantic review.
- `--accept-insecure-certs`: use only in approved QA networks with documented certificate expectations.

## Windows and Restricted Company Setup

Use Codex/Windows-safe config when `npx` cannot launch directly from the MCP client:

```toml
[mcp_servers.chrome-devtools]
command = "cmd"
args = [
  "/c",
  "npx",
  "-y",
  "chrome-devtools-mcp@<approved-version>",
  "--isolated",
  "--redact-network-headers",
  "--performance-crux=false",
  "--usage-statistics=false"
]
env = { SystemRoot="C:\\Windows", PROGRAMFILES="C:\\Program Files", CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS="1", CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS="1" }
startup_timeout_ms = 20_000
```

For restricted environments:

- If plugin installation from GitHub is blocked, prefer MCP-only installation through the approved npm/internal registry path.
- If public npm is blocked, use the internal npm registry or a preapproved package cache.
- If the MCP server is sandboxed and cannot launch Chrome, start Chrome outside the sandbox and attach with `--browser-url=http://127.0.0.1:9222`.
- If WSL cannot launch Windows Chrome, use PowerShell/Git Bash, install Chrome in WSL, or use WSL mirrored networking with loopback attach.
- If a VM/host setup fails due to host validation, use an approved SSH tunnel that maps `127.0.0.1:9222` to `127.0.0.1:9222`.
- If a custom CA/proxy is required for npm, document the approved registry/proxy configuration rather than disabling TLS validation.

## Discovery Packet

Store approved Chrome DevTools MCP artifacts under:

```text
profiles/<dashboard>/discovery/chrome-devtools-mcp/
  snapshots/
  screenshots/
  console.json
  network-summary.json
  lighthouse/
  traces/
  proposed-profile.yaml
  review-notes.md
```

Do not commit cookies, browser profiles, storage state, raw HARs with credentials, WebSocket debugger URLs, screenshots containing private data without approval, heap snapshots, or unredacted network bodies.

## CLI Notes

Use the experimental CLI only when it is already installed and approved:

```bash
chrome-devtools take_snapshot --output-format=json
chrome-devtools take_screenshot --filePath profiles/<dashboard>/discovery/chrome-devtools-mcp/screenshots/overview.jpeg --format jpeg --quality 80
chrome-devtools list_console_messages --pageSize 50 --output-format=json
chrome-devtools list_network_requests --pageSize 50 --output-format=json
chrome-devtools stop
```

The CLI starts/reuses a background daemon and preserves browser state. Stop it after private SAC work, and do not rely on it for deterministic CI.
