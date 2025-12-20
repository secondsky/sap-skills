#!/usr/bin/env bash
set -euo pipefail

# generate-marketplace.sh
# Generates .claude-plugin/marketplace.json from all plugin.json files
# Part of the sap-skills marketplace automation system
#
# CRITICAL: Uses skill-specific source paths to avoid cache duplication
#   CORRECT: "source": "./skills/cloudflare-d1"
#   WRONG:   "source": "./"  (would cause 18× cache bloat)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$REPO_ROOT/skills"
MARKETPLACE_DIR="$REPO_ROOT/.claude-plugin"
MARKETPLACE_JSON="$MARKETPLACE_DIR/marketplace.json"

# Default values
DRY_RUN=false
VERBOSE="${VERBOSE:-false}"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Usage
usage() {
  local exit_code="${1:-0}"
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Generate marketplace.json from all plugin.json files.

This script reads all skills/*/.claude-plugin/plugin.json files and creates
a central marketplace.json registry with proper metadata.

OPTIONS:
  --dry-run     Preview changes without modifying files
  --help        Show this help message

OUTPUT:
  .claude-plugin/marketplace.json

CRITICAL IMPLEMENTATION:
  Uses skill-specific source paths to avoid cache duplication:
    ✅ CORRECT: "source": "./skills/sap-cap-capire"
    ❌ WRONG:   "source": "./"

EXAMPLES:
  # Generate marketplace.json
  $(basename "$0")

  # Preview without changes
  $(basename "$0") --dry-run
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

# Collect plugin data from all plugin.json files
collect_plugins() {
  local plugins="[]"
  local count=0
  local categories_str=""

  echo "Scanning for plugin.json files..." >&2

  for skill_dir in "$SKILLS_DIR"/*; do
    if [ ! -d "$skill_dir" ]; then
      continue
    fi

    local skill_name
    skill_name=$(basename "$skill_dir")
    local plugin_json="$skill_dir/.claude-plugin/plugin.json"

    if [ ! -f "$plugin_json" ]; then
      echo -e "${YELLOW}  Warning: No plugin.json found for $skill_name, skipping${NC}" >&2
      continue
    fi

    # Validate JSON
    if ! jq empty "$plugin_json" 2>/dev/null; then
      echo -e "${RED}  Error: Invalid JSON in $plugin_json, skipping${NC}" >&2
      continue
    fi

    # Read plugin data
    local name
    name=$(jq -r '.name' "$plugin_json")
    local description
    description=$(jq -r '.description' "$plugin_json")
    local version
    version=$(jq -r '.version' "$plugin_json")
    local category
    category=$(jq -r '.category' "$plugin_json")
    local keywords
    keywords=$(jq -c '.keywords // []' "$plugin_json")
    local license
    license=$(jq -r '.license' "$plugin_json")

    # Validate required fields
    if [ "$name" = "null" ] || [ "$description" = "null" ]; then
      echo -e "${RED}  Error: Missing required fields in $plugin_json, skipping${NC}" >&2
      continue
    fi

    # CRITICAL: Use skill-specific source path (not "./")
    local source="skills/$skill_name"

    # Track categories (append with newline for later processing)
    if [ "$category" != "null" ] && [ -n "$category" ]; then
      if [ -z "$categories_str" ]; then
        categories_str="$category"
      else
        categories_str="$categories_str
$category"
      fi
    fi

    # Build plugin entry
    local plugin_entry
    plugin_entry=$(jq -n \
      --arg name "$name" \
      --arg source "$source" \
      --arg description "$description" \
      --arg version "$version" \
      --arg category "$category" \
      --argjson keywords "$keywords" \
      --arg license "$license" \
      '{
        name: $name,
        source: $source,
        description: $description,
        version: $version,
        category: $category,
        keywords: $keywords,
        license: $license
      }'
    )

    # Add to plugins array
    plugins=$(echo "$plugins" | jq --argjson plugin "$plugin_entry" '. += [$plugin]')
    count=$((count + 1))

    echo -e "${GREEN}  ✓ Added: $name${NC}" >&2
  done

  if [ "$VERBOSE" = "true" ]; then
    echo "Total collected: $count plugins" >&2
    echo "Categories string: '$categories_str'" >&2
  fi

  # Sort plugins by name
  local plugins_sorted
  if ! plugins_sorted=$(echo "$plugins" | jq 'sort_by(.name)'); then
    echo "ERROR: Failed to sort plugins" >&2
    echo "Plugins JSON: $plugins" >&2
    return 1
  fi
  plugins="$plugins_sorted"

  # Get unique categories (handle empty case)
  local unique_categories="[]"
  if [ -n "$categories_str" ]; then
    local categories_result
    if ! categories_result=$(echo "$categories_str" | sort -u | jq -R . | jq -s .); then
      echo "ERROR: Failed to process categories" >&2
      echo "Categories string: '$categories_str'" >&2
      return 1
    fi
    unique_categories="$categories_result"
  fi

  echo "Unique categories: $unique_categories" >&2
  echo "Count: $count" >&2

  # Return as JSON object
  local result
  if ! result=$(jq -n \
    --argjson plugins "$plugins" \
    --argjson categories "$unique_categories" \
    --arg count_str "$count" \
    '{plugins: $plugins, categories: $categories, count: ($count_str | tonumber)}'); then
    echo "ERROR: Failed to create final JSON" >&2
    echo "Plugins length: $(echo "$plugins" | jq 'length')" >&2
    echo "Categories: $unique_categories" >&2
    echo "Count: $count" >&2
    return 1
  fi

  echo "$result"
}

# Get current date in ISO format
get_current_date() {
  date -u +"%Y-%m-%d"
}

# Determine global version from existing marketplace or default
determine_global_version() {
  if [ -f "$MARKETPLACE_JSON" ]; then
    local version
    version=$(jq -r '.metadata.version // .version // "2.1.0"' "$MARKETPLACE_JSON" 2>/dev/null || echo "2.1.0")
    echo "$version"
  else
    echo "2.1.0"
  fi
}

# Generate marketplace.json
generate_marketplace() {
  # Collect all plugin data
  local collected
  collected=$(collect_plugins)

  local plugins
  local categories
  local total_skills

  plugins=$(echo "$collected" | jq -c '.plugins')
  categories=$(echo "$collected" | jq -c '.categories')
  total_skills=$(echo "$collected" | jq -r '.count')

  # Validate total_skills is a valid integer
  if [ -z "$total_skills" ] || [ "$total_skills" = "null" ] || ! [[ "$total_skills" =~ ^[0-9]+$ ]]; then
    total_skills=0
  fi

  if [ "$total_skills" -eq 0 ]; then
    echo -e "${RED}Error: No valid plugin.json files found${NC}" >&2
    exit 1
  fi

  # Determine version
  local version
  version=$(determine_global_version)

  # Get current date
  local current_date
  current_date=$(get_current_date)

  # Build marketplace.json
  local marketplace_content
  marketplace_content=$(jq -n \
    --arg name "sap-skills" \
    --arg version "$version" \
    --arg description "Production-ready skills for SAP development with Claude Code CLI" \
    --arg repository "https://github.com/secondsky/sap-skills" \
    --arg last_updated "$current_date" \
    --arg total_skills "$total_skills" \
    --argjson categories "$categories" \
    --argjson plugins "$plugins" \
    '{
      name: $name,
      version: $version,
      description: $description,
      repository: $repository,
      metadata: {
        version: $version,
        last_updated: $last_updated,
        total_skills: ($total_skills | tonumber),
        categories: $categories
      },
      plugins: $plugins
    }'
  )

  # Pretty-print JSON
  local formatted_json
  formatted_json=$(echo "$marketplace_content" | jq .)

  echo ""
  echo "=== Marketplace Summary ==="
  echo "Total skills: $total_skills"
  echo "Version: $version"
  echo "Last updated: $current_date"
  echo "Categories: $(echo "$categories" | jq -r 'length')"
  echo ""

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}[DRY RUN] Would create: $MARKETPLACE_JSON${NC}"
    echo "$formatted_json" | sed -n '1,30p'
    echo "  ..."
  else
    # Create marketplace directory if it doesn't exist
    mkdir -p "$MARKETPLACE_DIR"

    # Write marketplace.json
    echo "$formatted_json" > "$MARKETPLACE_JSON"
    echo -e "${GREEN}✓ Generated: $MARKETPLACE_JSON${NC}"

    # Validate
    if jq empty "$MARKETPLACE_JSON" 2>/dev/null; then
      echo -e "${GREEN}✓ Validation: marketplace.json is valid JSON${NC}"
    else
      echo -e "${RED}Error: Generated invalid JSON${NC}" >&2
      exit 1
    fi
  fi
}

# Main execution
main() {
  echo "=== SAP Skills Marketplace Generator ==="

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}DRY RUN MODE: No files will be modified${NC}"
  fi
  echo ""

  # Check if skills directory exists
  if [ ! -d "$SKILLS_DIR" ]; then
    echo -e "${RED}Error: Skills directory not found: $SKILLS_DIR${NC}" >&2
    exit 1
  fi

  # Generate marketplace
  generate_marketplace

  echo ""
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}DRY RUN complete. Run without --dry-run to apply changes.${NC}"
  else
    echo -e "${GREEN}✓ Marketplace generation complete${NC}"
  fi
}

main
