# Microsoft Edge CDP Control for Browser-Based SQLScript Work

Source: User-provided Edge/CDP AI harness runbook, 2026-07-03.

Use Microsoft Edge CDP only for local, trusted inspection of browser-based SAP database tooling, such as Datasphere SQL views/editors, HANA Cloud cockpit SQL tooling, or web UI diagnostics around SQLScript deployment. Default SQLScript work should still use SQL/HANA tooling, source review, explain plans, logs, and database-native validation.

Do not use CDP to bypass database permissions, extract private data from browser sessions, or automate destructive database/UI actions without explicit approval.

## Safety Rules

- Bind remote debugging to `127.0.0.1` only.
- Prefer a dedicated Edge automation profile for browser-based SQL triage.
- Do not expose the debugging port through firewall rules, tunnels, or remote desktops.
- Do not commit browser profiles, cookies, storage state, HARs with credentials, screenshots with private data, query result exports, or `webSocketDebuggerUrl` values.
- Attach only to the intended Datasphere/HANA tab by matching URL and title.
- Stop if Edge enterprise policy disables remote debugging.

## Start Edge with CDP on Windows

Close Edge first when you need a predictable fixed port:

```powershell
Start-Process msedge.exe -ArgumentList '--remote-debugging-port=9222'
```

If `msedge.exe` is not on `PATH`, use the installed executable:

```powershell
Start-Process 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -ArgumentList '--remote-debugging-port=9222'
```

For cleaner database UI triage, use a separate profile:

```powershell
Start-Process msedge.exe -ArgumentList '--remote-debugging-port=9222 --user-data-dir=C:\tmp\edge-cdp-profile'
```

Then open the target Datasphere or HANA Cloud page in that Edge profile and sign in manually if needed.

## Verify the Endpoint

Check that the port is listening:

```powershell
Test-NetConnection 127.0.0.1 -Port 9222
```

Try the normal CDP HTTP endpoints:

```powershell
Invoke-RestMethod http://127.0.0.1:9222/json/version
Invoke-RestMethod http://127.0.0.1:9222/json/list
```

If these work, pass `http://127.0.0.1:9222` to tools that accept a browser URL.

## DevToolsActivePort Fallback

Edge can show `Server running at: 127.0.0.1:9222` while `/json/version` and `/json/list` return `404`. Do not conclude CDP is unavailable. Read the active port file:

```powershell
$lines = Get-Content "$env:LOCALAPPDATA\Microsoft\Edge\User Data\DevToolsActivePort"
$port = $lines[0]
$wsPath = $lines[1]
$wsEndpoint = "ws://127.0.0.1:$port$wsPath"
$wsEndpoint
```

The first line is the port and the second line is the browser WebSocket path. Use the constructed `ws://127.0.0.1:<port><path>` endpoint with harnesses that accept a direct browser WebSocket.

## Attach to the Correct Database Tool Tab

After connecting to the browser WebSocket:

1. Call `Target.getTargets`.
2. Select a target where `type` is `page` and the URL/title matches the intended Datasphere or HANA browser tool.
3. Call `Target.attachToTarget` with `{ "targetId": "<page target id>", "flatten": true }`.
4. Use the returned `sessionId` for page-scoped commands such as `Runtime.evaluate`, `Page.captureScreenshot`, `DOM.getDocument`, and input events.

For SQLScript tasks, prefer read-only inspection first: UI validation messages, deployment errors, editor diagnostics, console/network clues, and approved screenshots. Ask before executing SQL, deploying artifacts, changing spaces/schemas, or exporting query results through the UI.

## Cleanup

Close Edge or restart it without `--remote-debugging-port` when finished. If a temporary automation profile was used, delete it only after confirming no approved evidence remains there.
