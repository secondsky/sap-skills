#!/usr/bin/env bash
set -euo pipefail

# sync-plugins.sh
# Unified script for plugin synchronization - single entry point for all plugin management
# Part of the sap-skills marketplace automation system
#
# This script:
# 1. Reads global version from marketplace.json metadata
# 2. Generates/updates plugin.json for each skill
# 3. Regenerates marketplace.json with all updated data

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
MARKETPLACE_JSON="$REPO_ROOT/.claude-plugin/marketplace.json"
GENERATE_MANIFESTS="$SCRIPT_DIR/generate-plugin-manifests.sh"
GENERATE_MARKETPLACE="$SCRIPT_DIR/generate-marketplace.sh"

# Default values
DRY_RUN=false

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Usage
usage() {
  local exit_code="${1:-0}"
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Unified plugin synchronization script - single entry point for all plugin management.

This script orchestrates the complete plugin sync workflow:
  1. Reads global version from marketplace.json metadata
  2. Generates/updates all plugin.json files via generate-plugin-manifests.sh
  3. Regenerates marketplace.json via generate-marketplace.sh

OPTIONS:
  --dry-run     Preview changes without modifying files
  --help        Show this help message

WORKFLOW:
  Phase 1: Read global version from marketplace.json
  Phase 2: Generate/update plugin.json for all skills
  Phase 3: Regenerate marketplace.json from plugin.json files

EXAMPLES:
  # Full sync
  $(basename "$0")

  # Preview without changes
  $(basename "$0") --dry-run

RELATED SCRIPTS:
  generate-plugin-manifests.sh  - Generate plugin.json from SKILL.md
  generate-marketplace.sh       - Generate marketplace.json from plugin.json files
EOF
  exit "$exit_code"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --help)
      usage
      ;;
    -*)
      echo -e "${RED}Error: Unknown option $1${NC}" >&2
      usage 1
      ;;
    *)
      echo -e "${RED}Error: Unexpected argument $1${NC}" >&2
      usage 1
      ;;
  esac
done

# Check required scripts exist
check_dependencies() {
  local missing=0

  if [ ! -f "$GENERATE_MANIFESTS" ]; then
    echo -e "${RED}Error: generate-plugin-manifests.sh not found at: $GENERATE_MANIFESTS${NC}" >&2
    missing=$((missing + 1))
  fi

  if [ ! -f "$GENERATE_MARKETPLACE" ]; then
    echo -e "${RED}Error: generate-marketplace.sh not found at: $GENERATE_MARKETPLACE${NC}" >&2
    missing=$((missing + 1))
  fi

  if [ $missing -gt 0 ]; then
    exit 1
  fi
}

# Extract global version from marketplace.json
get_global_version() {
  if [ ! -f "$MARKETPLACE_JSON" ]; then
    echo -e "${YELLOW}Warning: marketplace.json not found, using default version 2.1.0${NC}" >&2
    echo "2.1.0"
    return
  fi

  local version
  version=$(jq -r '.metadata.version // .version // "2.1.0"' "$MARKETPLACE_JSON" 2>/dev/null || echo "2.1.0")

  echo "$version"
}

# Main execution
main() {
  echo "==================================================="
  echo "=== SAP Skills Plugin Synchronization ==="
  echo "==================================================="

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}DRY RUN MODE: No files will be modified${NC}"
  fi
  echo ""

  # Check dependencies
  echo -e "${BLUE}[Phase 0]${NC} Checking dependencies..."
  check_dependencies
  echo -e "${GREEN}✓ All required scripts found${NC}"
  echo ""

  # Phase 1: Read global version
  echo -e "${BLUE}[Phase 1]${NC} Reading global version from marketplace.json..."
  local global_version
  global_version=$(get_global_version)
  echo -e "Global version: ${GREEN}$global_version${NC}"
  echo ""

  # Phase 2: Generate/update plugin.json files
  echo -e "${BLUE}[Phase 2]${NC} Generating/updating plugin.json files..."
  if [ "$DRY_RUN" = true ]; then
    if ! "$GENERATE_MANIFESTS" --dry-run; then
      echo -e "${RED}Error: Plugin manifest generation failed${NC}" >&2
      exit 1
    fi
  else
    if ! "$GENERATE_MANIFESTS"; then
      echo -e "${RED}Error: Plugin manifest generation failed${NC}" >&2
      exit 1
    fi
  fi
  echo ""

  # Phase 3: Regenerate marketplace.json
  echo -e "${BLUE}[Phase 3]${NC} Regenerating marketplace.json..."
  if [ "$DRY_RUN" = true ]; then
    if ! "$GENERATE_MARKETPLACE" --dry-run; then
      echo -e "${RED}Error: Marketplace generation failed${NC}" >&2
      exit 1
    fi
  else
    if ! "$GENERATE_MARKETPLACE"; then
      echo -e "${RED}Error: Marketplace generation failed${NC}" >&2
      exit 1
    fi
  fi
  echo ""

  # Summary
  echo "==================================================="
  echo "=== Sync Complete ==="
  echo "==================================================="

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}DRY RUN complete. Run without --dry-run to apply changes.${NC}"
  else
    echo -e "${GREEN}✓ All plugin.json files synchronized${NC}"
    echo -e "${GREEN}✓ marketplace.json regenerated${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review changes: git diff"
    echo "  2. Verify with validation commands (see plan document)"
    echo "  3. Commit changes: git add . && git commit -m 'Sync plugins: version $global_version'"
  fi
}

main
