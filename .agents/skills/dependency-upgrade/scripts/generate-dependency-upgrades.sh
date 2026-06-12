#!/usr/bin/env bash
set -euo pipefail

# Generate hardened dependency-upgrade configuration files from templates.
# Supports npm, Bun, pnpm, Yarn, and emits guidance for Deno when no dedicated template is available.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
TEMPLATE_DIR="${ROOT_DIR}/templates"

usage() {
  cat <<USAGE
Usage: $(basename "$0") <package-manager> [output-dir]

Package managers:
  npm   -> .npmrc
  bun   -> bunfig.toml
  pnpm  -> pnpm-workspace.yaml
  yarn  -> .yarnrc.yml
  deno  -> deno.json (template-free fallback)

The generated file is written to OUTPUT_DIR (default: .). This script copies the
corresponding security template and prints quick next-step guidance.
USAGE
}

if [[ ${1:-} == "" || ${1:-} == "-h" || ${1:-} == "--help" ]]; then
  usage
  exit 0
fi

pm_name="${1:-}"
out_dir="${2:-.}"

case "$pm_name" in
  npm|bun|pnpm|yarn)
    case "$pm_name" in
      npm)
        template_file="npmrc-security.tmpl"
        output_file=".npmrc"
        ;;
      bun)
        template_file="bunfig-security.tmpl"
        output_file="bunfig.toml"
        ;;
      pnpm)
        template_file="pnpm-workspace-security.tmpl"
        output_file="pnpm-workspace.yaml"
        ;;
      yarn)
        template_file="yarnrc-security.tmpl"
        output_file=".yarnrc.yml"
        ;;
    esac

    template_path="${TEMPLATE_DIR}/${template_file}"
    if [[ ! -f "$template_path" ]]; then
      echo "Error: template not found: $template_path" >&2
      exit 1
    fi

    mkdir -p "$out_dir"
    cp "$template_path" "$out_dir/$output_file"

    echo "Generated: $out_dir/$output_file"
    echo "Tip: review generated values for your project path and lifecycle policy."
    ;;

  deno)
    mkdir -p "$out_dir"
    cat <<'EOF_DENO' > "$out_dir/deno.json"
{
  "nodeModulesDir": "auto",
  "vendor": true
}
EOF_DENO

    echo "Generated: $out_dir/deno.json"
    echo "Tip: review deno.json security policy and use CI wrappers that enforce integrity checks."
    ;;

  *)
    echo "Unsupported package manager: $pm_name" >&2
    usage >&2
    exit 1
    ;;
esac

exit 0
