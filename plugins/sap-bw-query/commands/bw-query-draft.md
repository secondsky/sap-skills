---
name: bw-query-draft
description: Create or preview an unsaved local SAP BW query draft after QuerySpec validation
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
argument-hint: "[query-spec-file] [create|apply|preview|prepare-save]"
arguments:
  - name: query_spec
    description: Validated password-free QuerySpec v1 file
    required: true
  - name: action
    description: Create, apply, preview, or prepare-save
    required: true
---

# BW Query Draft

Passwords are never accepted. Existing queries must never be overwritten or modified, and automation must never delete anything.

Default to non-mutating specification validation and preview planning. Create or revise an unsaved local draft only when the requested action explicitly asks for it; prepare-save requires separate explicit approval and still cannot save.

Validate the specification and capabilities before creating an unsaved local draft. Keep the BW Automation sidebar visible. For prepare-save, require a fresh collision check and Eclipse-only human confirmation bound to target and specification hash. Automation never presses the native SAP Finish button or confirms a transport.

## Output Contract

Return:

- Capability and QuerySpec validation result.
- Local draft ID, revision, state, and specification hash when applicable.
- Gaps, warnings, collision status, and evidence links.
- The exact next human action; never report a backend save unless the user completed it in SAP.
