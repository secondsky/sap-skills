---
name: bw-studio-deploy
description: Deploy or launch the local no-install BW Automation Studio bundle without accepting credentials
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
argument-hint: "[status|deploy|launch|rollback|diagnostics] [artifact-or-version]"
arguments:
  - name: action
    description: Status, deploy, launch, rollback, or diagnostics
    required: true
  - name: artifact_or_version
    description: Optional local artifact path or installed rollback version
    required: false
---

# BW Studio Deployment

Passwords are never accepted. Refuse credential content and instruct immediate rotation if one is pasted.

Default to the non-mutating Status or Diagnostics action. Deploy or rollback only when the user explicitly requests that action; both remain append-only and never remove a version.

Use `BwStudio.ps1` from the plug-in's top-level scripts directory with only Status, Deploy, Launch, Rollback, or Diagnostics. For a local build, verify the manifest, archive SHA-512, bundle lock, and per-file inventory; no signing setup is required. Remote release-channel downloads additionally require a signature. Never install system prerequisites, delete old/staging data, or expose cleanup/uninstall behavior.

Return the active version, verification evidence, retained append-only state, and next password-free connection step.

## Output Contract

Return:

- Requested action and active/target version.
- Signature, archive, lock, and inventory verification status.
- Append-only activation/rollback result and retained artifact status.
- Diagnostics or the next password-free connection step.
