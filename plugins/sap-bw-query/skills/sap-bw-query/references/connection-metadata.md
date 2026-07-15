# Password-free BW connection metadata

## Accepted fields

- `alias`, `systemId`, `client`, `language`, `userId`
- `mode`: `applicationServer` or `messageServer`
- Direct mode: `applicationServer`, two-digit `systemNumber`
- Message-server mode: `messageServer`, `logonGroup`
- `sncEnabled`, `ssoEnabled`

The store creates a new timestamped JSON record for each revision. It does not overwrite earlier records.

## Authentication boundary

- SSO/SNC success may complete connection/project setup.
- Password-required login pauses in the native SAP dialog.
- Launch always includes `-noPwdStore`.
- Automation does not read keyboard events or text from `SWT.PASSWORD` controls.
- Public schemas reject password, passwd, pwd, secret, token, apiKey, and credential keys at any depth.

If any credential is pasted, stop, do not repeat it, and instruct immediate rotation. Explain that already submitted external chat content cannot be retroactively erased.

## Reachability

Reachability connects to the derived SAP dispatcher/message-server TCP port, reports latency, and always returns `authenticated: false`. It does not send SAP credentials or business queries.

## Sources

- Repository implementation contract and executable tests, reviewed 2026-07-13. Live SAP authentication behavior remains a sandbox release gate.
