# Authenticated Edge Profile and State Bootstrap

Documentation Source: `docs/project/sap-browser-automation-source-review-2026-07-14.md`

Profile cloning is the durable base, but normal Edge may discard session cookies when it closes.
Therefore capture volatile state from the still-running authenticated source before shutdown, then clone,
launch, verify, and import only when necessary.

## 1. Confirm the source

Confirm the approved SAP tenant, normal Edge user-data root, selected `Default` or `Profile N`, target
host/path/title, required cookie origins, automation root, and temporary state-file path. The normal Edge
user-data root is usually `%LOCALAPPDATA%/Microsoft/Edge/User Data`; use `edge://version` to identify the
active profile.

## 2. Enable live source CDP

Keep normal Edge open on the visibly authenticated SAP page. Open
`edge://inspect/#remote-debugging`, enable **Allow remote debugging for this browser instance**, and wait
for `DevToolsActivePort` under the normal user-data root. Do not close Edge yet.

List and narrow targets until exactly one approved page matches:

```powershell
$skillRoot = 'plugins/sap-browser-automation/skills/sap-browser-automation'
$normalEdge = Join-Path $env:LOCALAPPDATA 'Microsoft/Edge/User Data'
$stateFile = Join-Path $env:LOCALAPPDATA 'Codex/SAP-Browser-Automation/auth-state.json'

node "$skillRoot/scripts/cdp-agent.mjs" targets `
  --user-data-dir $normalEdge `
  --host $env:SAP_TENANT_HOST `
  --path-contains $env:SAP_TARGET_PATH
```

## 3. Export before closing Edge

Run `cdp-agent.mjs export-auth` while the authenticated source target is alive:

```powershell
node "$skillRoot/scripts/cdp-agent.mjs" export-auth `
  --user-data-dir $normalEdge `
  --host $env:SAP_TENANT_HOST `
  --path-contains $env:SAP_TARGET_PATH `
  --title-contains $env:SAP_TARGET_TITLE `
  --origin $env:SAP_TENANT_ORIGIN `
  --origin $env:SAP_IDP_ORIGIN `
  --state-file $stateFile
```

The helper uses browser-level CDP `Storage.getCookies`, filters cookies to the repeated `--origin` and
optional `--cookie-domain` scopes, and captures the selected page's top-origin `localStorage` and
`sessionStorage`. The command prints counts and the state-file path, not cookie or storage values.

## 4. Close, clone, and launch

Close normal Edge completely. Then clone into a new or empty automation root:

```powershell
$automation = Join-Path $env:LOCALAPPDATA 'Codex/SAP-Automation-Edge-20260714'

powershell -NoProfile -ExecutionPolicy Bypass -File "$skillRoot/scripts/edge-profile.ps1" `
  -Action CloneLaunch `
  -SourceUserData $normalEdge `
  -ProfileName 'Default' `
  -AutomationRoot $automation `
  -TargetUrl $env:SAP_TARGET_URL
```

`CloneLaunch` refuses a populated destination. To retain a previously authenticated isolated profile,
use `-Action LaunchExisting` instead of copying over it.

## 5. Verify and import if needed

Inspect the isolated target first because persistent profile state may already be sufficient:

```powershell
node "$skillRoot/scripts/cdp-agent.mjs" inspect `
  --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST `
  --path-contains $env:SAP_TARGET_PATH
```

If the target is not authenticated, run `cdp-agent.mjs import-auth` to inject the pre-close state:

```powershell
node "$skillRoot/scripts/cdp-agent.mjs" import-auth `
  --user-data-dir $automation `
  --host $env:SAP_TENANT_HOST `
  --path-contains $env:SAP_TARGET_PATH `
  --state-file $stateFile
```

Import maps exported cookies to CDP cookie parameters and applies them with `Storage.setCookies`. It
installs an origin-keyed preload for local/session storage, applies it immediately to the selected page,
reloads, and waits for readiness. Re-run `inspect` and verify a visible signed-in signal; successful
import is not itself authentication evidence.

## Optional existing Playwright

If Playwright is already installed, it may attach to the isolated Edge instance or consume an adapted
state object. Playwright storage state includes cookies, local storage, and optional IndexedDB but not
session storage, so retain the origin-keyed preload when the application uses session storage. Do not
install Playwright for this workflow.

## Final fallback and cleanup

If profile cloning plus state import still redirects to SSO, complete one manual login in the isolated
profile and reuse that profile with `LaunchExisting`. Delete the temporary state file after the isolated
session has been verified and no further import is needed. Keep the isolated profile only when the user
wants subsequent reuse.
