#!/usr/bin/env bash
# setup-vscode.sh — Detect VS Code and install the SQLScript LSP extension
# Emits structured output lines for the LLM to parse.
set -euo pipefail

TMPDIR_WORK="$(mktemp -d)"
cleanup() { rm -rf "$TMPDIR_WORK"; }
trap cleanup EXIT

# ── 1. VS Code detection ──────────────────────────────────────────────────────
if command -v code >/dev/null 2>&1; then
  CODE_PATH="$(command -v code)"
  echo "[VSCODE] found | path:${CODE_PATH}"
else
  echo "[VSCODE] not_found"
fi

# ── 2. VSIX install (only when VS Code is available) ─────────────────────────
if command -v code >/dev/null 2>&1; then
  # Check if already installed
  if code --list-extensions 2>/dev/null | grep -qi "SAPSE.hana-sqlscript-lsp"; then
    echo "[VSIX_INSTALL] already_installed"
  else
    # Attempt to pack and install from npm
    if command -v npm >/dev/null 2>&1; then
      cd "$TMPDIR_WORK"
      if npm pack @sap/hana-sqlscript-lsp --silent 2>/dev/null; then
        TARBALL="$(ls ./*.tgz 2>/dev/null | head -1)"
        if [ -n "$TARBALL" ]; then
          # Detect GNU tar (gtar on macOS via Homebrew, 'tar' on Linux)
          if command -v gtar >/dev/null 2>&1; then
            TAR_CMD="gtar"
          elif tar --version 2>/dev/null | grep -qi "gnu"; then
            TAR_CMD="tar"
          else
            TAR_CMD="tar"
          fi

          # Extract VSIX from npm package
          if [ "$TAR_CMD" = "gtar" ] || { [ "$TAR_CMD" = "tar" ] && tar --version 2>/dev/null | grep -qi "gnu"; }; then
            # GNU tar: use --wildcards for efficient extraction
            "$TAR_CMD" xzf "$TARBALL" --wildcards "*.vsix" --strip-components=2 2>/dev/null
          else
            # BSD tar: extract all, then find the vsix
            tar xzf "$TARBALL" 2>/dev/null
          fi

          VSIX="$(find . -name "*.vsix" -print -quit 2>/dev/null)"
          if [ -n "$VSIX" ]; then
            if code --install-extension "$VSIX" 2>/dev/null; then
              echo "[VSIX_INSTALL] success"
            else
              echo "[VSIX_INSTALL] error:code --install-extension failed"
            fi
          else
            echo "[VSIX_INSTALL] error:no .vsix found in npm package"
          fi
        else
          echo "[VSIX_INSTALL] error:npm pack produced no tarball"
        fi
      else
        echo "[VSIX_INSTALL] error:npm pack @sap/hana-sqlscript-lsp failed - package may not be accessible"
      fi
    else
      echo "[VSIX_INSTALL] error:npm not found - cannot download package"
    fi
  fi
fi

# ── 3. HANA environment variables ────────────────────────────────────────────
HANA_HOST_STATUS="missing"
HANA_PORT_STATUS="missing"
HANA_USER_STATUS="missing"
HANA_PASSWORD_STATUS="missing"

[ -n "${HANA_HOST:-}" ]     && HANA_HOST_STATUS="set"
[ -n "${HANA_PORT:-}" ]     && HANA_PORT_STATUS="set"
[ -n "${HANA_USER:-}" ]     && HANA_USER_STATUS="set"
[ -n "${HANA_PASSWORD:-}" ] && HANA_PASSWORD_STATUS="set"

echo "[HANA_ENV] HANA_HOST=${HANA_HOST_STATUS}, HANA_PORT=${HANA_PORT_STATUS}, HANA_USER=${HANA_USER_STATUS}, HANA_PASSWORD=${HANA_PASSWORD_STATUS}"

# ── 4. .vscode/settings.json presence ────────────────────────────────────────
if [ -f ".vscode/settings.json" ]; then
  echo "[SETTINGS_FILE] exists | path:.vscode/settings.json"
else
  echo "[SETTINGS_FILE] not_found"
fi
