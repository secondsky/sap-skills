#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="${SCRIPT_PATH%/*}"
if [ "$SCRIPT_DIR" = "$SCRIPT_PATH" ]; then
  SCRIPT_DIR="."
fi
SCRIPT_DIR="$(cd "$SCRIPT_DIR" && pwd)"
INPUT_PAYLOAD="$(cat)"

run_with() {
  local runtime="$1"
  case "$runtime" in
    node)
      printf '%s' "$INPUT_PAYLOAD" | node "$SCRIPT_DIR/validator.mjs"
      ;;
    python3)
      printf '%s' "$INPUT_PAYLOAD" | python3 "$SCRIPT_DIR/validator.py"
      ;;
    python)
      printf '%s' "$INPUT_PAYLOAD" | python "$SCRIPT_DIR/validator.py"
      ;;
    py)
      printf '%s' "$INPUT_PAYLOAD" | py -3 "$SCRIPT_DIR/validator.py"
      ;;
  esac
}

if command -v node >/dev/null 2>&1; then
  if run_with node; then
    exit 0
  fi
fi

if command -v python3 >/dev/null 2>&1; then
  if run_with python3; then
    exit 0
  fi
fi

if command -v python >/dev/null 2>&1; then
  if run_with python; then
    exit 0
  fi
fi

if command -v py >/dev/null 2>&1; then
  if run_with py; then
    exit 0
  fi
fi

printf '{}\n'
exit 0
