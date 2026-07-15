# Edge/CDP Control

Documentation Source: `docs/project/sap-browser-automation-source-review-2026-07-14.md`

Use the bundled helpers instead of generating one-off launch or WebSocket code. `edge-profile.ps1`
owns the isolated Edge lifecycle; `cdp-agent.mjs` owns target discovery and page control. Both scripts
are under `scripts/` relative to the skill root.

## Requirements

- Windows with Microsoft Edge Stable.
- Windows PowerShell 5.1 or newer.
- Node.js 22 or newer with global `fetch` and `WebSocket`; no npm package is required.
- A new/empty automation root for `CloneLaunch`, or an existing isolated root for `LaunchExisting`.

## Clone and launch

Run `scripts/edge-profile.ps1 -Action CloneLaunch` only after live volatile state has been exported and
normal Edge has been closed. Pass the exact selected profile name; this example deliberately uses
`Profile 2` rather than `Default`:

```powershell
$skillRoot = 'plugins/sap-browser-automation/skills/sap-browser-automation'
$normalEdge = Join-Path $env:LOCALAPPDATA 'Microsoft/Edge/User Data'
$automation = Join-Path $env:LOCALAPPDATA 'Codex/SAP-Automation-Edge-20260714'

powershell -NoProfile -ExecutionPolicy Bypass -File "$skillRoot/scripts/edge-profile.ps1" `
  -Action CloneLaunch `
  -SourceUserData $normalEdge `
  -ProfileName 'Profile 2' `
  -AutomationRoot $automation `
  -TargetUrl $env:SAP_TARGET_URL
```

The helper refuses a non-empty destination, stages the copy before moving it into place, preserves the
selected profile directory, and launches Edge with `--remote-debugging-address=127.0.0.1` and
`--remote-debugging-port=0`. It then reads `DevToolsActivePort` and verifies that the loopback listener
belongs to a process using the requested automation root.

Reuse and lifecycle commands:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "$skillRoot/scripts/edge-profile.ps1" `
  -Action LaunchExisting -ProfileName 'Profile 2' -AutomationRoot $automation `
  -TargetUrl $env:SAP_TARGET_URL

powershell -NoProfile -ExecutionPolicy Bypass -File "$skillRoot/scripts/edge-profile.ps1" `
  -Action Status -ProfileName 'Profile 2' -AutomationRoot $automation

powershell -NoProfile -ExecutionPolicy Bypass -File "$skillRoot/scripts/edge-profile.ps1" `
  -Action Stop -AutomationRoot $automation
```

`Stop` matches the isolated user-data path and does not stop unrelated Edge processes.

## Deterministic target control

List page targets first:

```powershell
node "$skillRoot/scripts/cdp-agent.mjs" targets `
  --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST
```

All action commands require filters that resolve exactly one page. Combine `--target-id`, `--host`,
`--path-contains`, and `--title-contains` as needed. Ambiguous or missing targets fail with the available
page summaries; the driver never picks the first tab.

Typical operations:

```powershell
node "$skillRoot/scripts/cdp-agent.mjs" inspect --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST --path-contains $env:SAP_TARGET_PATH

node "$skillRoot/scripts/cdp-agent.mjs" click --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST --path-contains $env:SAP_TARGET_PATH `
  --selector '[data-testid="open-story"]'

node "$skillRoot/scripts/cdp-agent.mjs" type --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST --path-contains $env:SAP_TARGET_PATH `
  --selector 'input[aria-label="Search"]' --text 'Revenue'

node "$skillRoot/scripts/cdp-agent.mjs" screenshot --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST --path-contains $env:SAP_TARGET_PATH `
  --output (Join-Path $env:TEMP 'sap-evidence.png')
```

Run `node scripts/cdp-agent.mjs help` from the skill root for navigation, evaluation, coordinate click,
key, snapshot, export, and import syntax.

## Failure recovery

| Symptom | Recovery |
| --- | --- |
| Automation root is non-empty | Use `LaunchExisting` or choose a new clone destination. |
| Source profile is running | Export volatile state first, close normal Edge, then retry `CloneLaunch`. |
| Missing/stale `DevToolsActivePort` | `LaunchExisting` removes the stale file and waits for a new verified listener. |
| Target selection is ambiguous | Add host, path, title, or target-ID filters until exactly one page matches. |
| No authenticated SAP page | Import the pre-close auth state, reload, and inspect again. |
| Imported state still redirects to SSO | Complete one manual login in the isolated profile and reuse it later. |
| Edge policy blocks debugging | Use the approved desktop/manual path; do not report the SAP action complete. |

## Reporting

Report the browser version, automation-root path, selected profile, loopback status, selected target,
authentication result, visible errors, evidence paths, and cleanup result. Browser startup or a CDP
connection alone is not completion evidence.
