# In-App Browser Authentication

Documentation Source: `docs/project/sap-browser-automation-source-review-2026-07-14.md`

Use the installed in-app Browser skill for the first visible authentication attempt. Follow its
bootstrap and documentation requirements before selecting a tab or interacting with the page.

## Validation status

This route executes inside Codex or Claude Desktop. Its runtime validation is deferred to those desktop
applications and is not part of the standalone Edge/CDP test suite. Keep it as the first supported
manual-login route without inferring availability from terminal-only tests.

## Manual login flow

1. Navigate to the approved SAC or Datasphere target.
2. Inspect visible state. If the target shows SSO or another sign-in page, tell the user that manual
   sign-in is required and invoke the supported secure browser-auth capability.
3. Never ask the user to paste a password, OTP, passkey, recovery code, or token into chat.
4. After each authentication transition, inspect the visible page for the next step, CAPTCHA, error,
   or success signal.
5. Verify the target domain shows a positive signed-in signal. A closed popup, blank page, spinner,
   login redirect, or stale tab is an unknown result.

## Capability boundary

The in-app Browser is a separate session. Do not read, export, or import its cookies, local storage,
session storage, passwords, profiles, or session stores. Do not assume that an Edge login is available
inside it. If manual login succeeds, use that session for visible in-app work; seed fresh Edge from
the normal Edge profile separately when CDP automation is required.

If browser bootstrap fails, read the installed browser troubleshooting guidance before changing
surfaces. If the in-app Browser remains unusable, continue with the consent-gated fresh Edge path and
record the in-app failure. Never report the SAP task complete because authentication alone succeeded.

## Evidence

Capture only approved screenshots or equivalent visible evidence. Redact tenant IDs, story IDs,
session-like URL parameters, user names, unrelated tabs, and authentication screens. Keep the
authentication result separate from the business-task result.
