---
name: sqlscript-setup
description: Set up the SQLScript development environment by installing the SAP HANA SQLScript LSP VS Code extension, configuring workspace settings, and verifying HANA connection environment variables
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
---

# SQLScript Development Environment Setup

Automates installation of the `@sap/hana-sqlscript-lsp` VS Code extension and configures workspace settings for SQLScript development.

## What This Command Does

1. Detects VS Code installation
2. Downloads and installs the SAP HANA SQLScript LSP extension (`.vsix`)
3. Writes or merges recommended `.vscode/settings.json`
4. Checks HANA connection environment variables
5. Prints a status summary

## Implementation Instructions

When this command is invoked:

### Step 1 — Run the setup script

```bash
bash plugins/sap-sqlscript/scripts/setup-vscode.sh
```

Capture the full output. Parse each `[TAG]` line:

| Tag | Meaning |
|-----|---------|
| `[VSCODE] found \| path:<p>` | VS Code CLI found at path `<p>` |
| `[VSCODE] not_found` | VS Code CLI not on PATH |
| `[VSIX_INSTALL] success` | Extension installed successfully |
| `[VSIX_INSTALL] already_installed` | Extension was already present |
| `[VSIX_INSTALL] error:<msg>` | Installation failed; `<msg>` contains the reason |
| `[HANA_ENV] ...` | Comma-separated `KEY=set\|missing` pairs |
| `[SETTINGS_FILE] exists \| path:<p>` | `.vscode/settings.json` already exists |
| `[SETTINGS_FILE] not_found` | No `.vscode/settings.json` present |

### Step 2 — Handle VS Code not found

If `[VSCODE] not_found`, explain that VS Code CLI (`code`) is not on the PATH and provide manual steps:

1. Open VS Code
2. Open the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for **"SAP HANA SQLScript"** or **"SAPSE.hana-sqlscript-lsp"**
4. Click Install
5. Alternatively, download the `.vsix` manually:
   ```bash
   npm pack @sap/hana-sqlscript-lsp
   # Then in VS Code: Extensions > ... > Install from VSIX
   ```

Do not attempt to write `.vscode/settings.json` if VS Code was not found.

### Step 3 — Handle VSIX install result

- **success**: Confirm the extension is installed. Note that VS Code must be reloaded for the extension to activate.
- **already_installed**: Confirm the extension is already present; no action needed.
- **error:<msg>**: Report the error message and suggest the manual install steps from Step 2.

### Step 4 — Write / merge `.vscode/settings.json`

Only proceed if `[VSCODE] found`.

**If `[SETTINGS_FILE] not_found`**: Create `.vscode/settings.json` with exactly:

```json
{
  "files.associations": {
    "*.sql": "sqlscript"
  },
  "[sqlscript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "SAPSE.hana-sqlscript-lsp"
  },
  "sqlscript.formatting.enabled": true
}
```

Also create `.vscode/` directory if it does not exist.

**If `[SETTINGS_FILE] exists`**: Read the existing file, then merge the keys above using Edit — preserve all existing settings and only add missing keys. Do not overwrite values the user has already set for `files.associations`, `[sqlscript]`, or `sqlscript.formatting.enabled`.

### Step 5 — Report HANA environment variables

Parse the `[HANA_ENV]` line. For each variable:

- **set**: Mark as configured
- **missing**: Mark as not configured and provide the export command

If any variables are missing, print setup instructions:

```bash
# Add to your shell profile (~/.zshrc, ~/.bashrc, etc.)
export HANA_HOST="your-hana-host.hanacloud.ondemand.com"
export HANA_PORT="443"
export HANA_USER="your-username"
export HANA_PASSWORD="your-password"
```

### Step 6 — Print summary table

Print a clean summary using this format:

```
## SQLScript Environment Setup Summary

| Component                     | Status |
|-------------------------------|--------|
| VS Code CLI                   | ✓ Found at /path/to/code  OR  ✗ Not found |
| SQLScript LSP extension       | ✓ Installed  OR  ✓ Already installed  OR  ✗ Error: <msg> |
| .vscode/settings.json         | ✓ Created  OR  ✓ Updated  OR  ✓ Already configured  OR  — Skipped |
| HANA_HOST                     | ✓ Set  OR  ✗ Missing |
| HANA_PORT                     | ✓ Set  OR  ✗ Missing |
| HANA_USER                     | ✓ Set  OR  ✗ Missing |
| HANA_PASSWORD                 | ✓ Set  OR  ✗ Missing |
```

If everything is configured, end with:
> Your SQLScript development environment is ready. Reload VS Code to activate the extension if it was just installed.

If anything is missing, end with a numbered action list of remaining steps.
