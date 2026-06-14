#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CANONICAL="$REPO_ROOT/plugins/dependency-upgrade/skills/dependency-upgrade"
MIRROR="$REPO_ROOT/.agents/skills/dependency-upgrade"
ITEMS=(SKILL.md references scripts templates)

usage() {
  cat <<'EOF'
Usage: sync-dependency-upgrade-mirror.sh --check|--apply

Keeps the local .agents dependency-upgrade skill mirror aligned with the
installable plugin skill bundle.
EOF
}

mode="${1:-}"
case "$mode" in
  --check|--apply) ;;
  --help|-h)
    usage
    exit 0
    ;;
  *)
    usage >&2
    exit 1
    ;;
esac

if [ ! -d "$CANONICAL" ]; then
  echo "Missing canonical dependency-upgrade skill: $CANONICAL" >&2
  exit 1
fi

if [ "$mode" = "--apply" ]; then
  mkdir -p "$MIRROR"
  for item in "${ITEMS[@]}"; do
    if [ ! -e "$CANONICAL/$item" ]; then
      echo "Missing canonical item: $CANONICAL/$item" >&2
      exit 1
    fi
    rm -rf "$MIRROR/$item"
    cp -R "$CANONICAL/$item" "$MIRROR/$item"
  done
  echo "dependency-upgrade mirror synchronized from plugin bundle."
  exit 0
fi

missing=0
different=0
for item in "${ITEMS[@]}"; do
  if [ ! -e "$CANONICAL/$item" ]; then
    echo "Missing canonical item: plugins/dependency-upgrade/skills/dependency-upgrade/$item" >&2
    missing=$((missing + 1))
    continue
  fi
  if [ ! -e "$MIRROR/$item" ]; then
    echo "Missing mirror item: .agents/skills/dependency-upgrade/$item" >&2
    missing=$((missing + 1))
    continue
  fi
  if ! diff -qr "$CANONICAL/$item" "$MIRROR/$item" >/dev/null; then
    echo "Mirror differs: $item" >&2
    different=$((different + 1))
  fi
done

if [ "$missing" -gt 0 ] || [ "$different" -gt 0 ]; then
  echo "dependency-upgrade mirror check failed. Run ./scripts/sync-dependency-upgrade-mirror.sh --apply after updating the plugin bundle." >&2
  exit 1
fi

echo "dependency-upgrade mirror check passed."
