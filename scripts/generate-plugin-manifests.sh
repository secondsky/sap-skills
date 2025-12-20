#!/usr/bin/env bash
set -euo pipefail

# generate-plugin-manifests.sh
# Generates .claude-plugin/plugin.json for each skill by reading YAML frontmatter from SKILL.md
# Part of the sap-skills marketplace automation system

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$REPO_ROOT/skills"

# Default values
DRY_RUN=false

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Read version from marketplace.json or use default
get_global_version() {
  local marketplace_json="$REPO_ROOT/.claude-plugin/marketplace.json"
  if [ -f "$marketplace_json" ]; then
    jq -r '.metadata.version // .version // "2.1.0"' "$marketplace_json" 2>/dev/null || echo "2.1.0"
  else
    echo "2.1.0"
  fi
}

# Usage
usage() {
  local exit_code="${1:-0}"
  cat <<EOF
Usage: $(basename "$0") [OPTIONS] [SKILL_NAME]

Generate plugin.json for skills from SKILL.md YAML frontmatter.

OPTIONS:
  --dry-run         Preview changes without modifying files
  --help            Show this help message

ARGUMENTS:
  SKILL_NAME        Process only this skill (optional, processes all if omitted)

EXAMPLES:
  # Generate for all skills
  $(basename "$0")

  # Generate for specific skill
  $(basename "$0") sap-cap-capire

  # Preview without changes
  $(basename "$0") --dry-run
EOF
  exit "$exit_code"
}

# Parse arguments
SKILL_FILTER=""
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
      SKILL_FILTER="$1"
      shift
      ;;
  esac
done

# Category detection based on skill name patterns
categorize_skill() {
  local skill_name="$1"

  case "$skill_name" in
    sap-abap*)
      echo "abap"
      ;;
    sap-btp-*)
      echo "btp"
      ;;
    sap-cap-*)
      echo "cap"
      ;;
    sap-fiori-*)
      echo "ui-development"
      ;;
    sapui5*)
      echo "ui-development"
      ;;
    sap-hana-*)
      echo "hana"
      ;;
    sap-sac-*)
      echo "data-analytics"
      ;;
    sap-datasphere)
      echo "data-analytics"
      ;;
    sap-ai-*|sap-cloud-sdk-ai)
      echo "ai"
      ;;
    sap-api-*|sap-sqlscript)
      echo "tooling"
      ;;
    skill-*)
      echo "tooling"
      ;;
    *)
      echo "tooling"
      ;;
  esac
}

# Get category-specific keywords
get_category_keywords() {
  local category="$1"

  case "$category" in
    abap)
      echo "abap,sap,internal tables,cds,rap,oop,abap cloud"
      ;;
    btp)
      echo "btp,cloud foundry,kyma,cloud platform,sap"
      ;;
    cap)
      echo "cap,cds,cloud application programming,node.js,java,odata"
      ;;
    ui-development)
      echo "ui,frontend,fiori,sapui5,components,mvc"
      ;;
    hana)
      echo "hana,database,sql,sqlscript,hdi,cloud"
      ;;
    data-analytics)
      echo "analytics,data,dashboard,visualization,sac"
      ;;
    ai)
      echo "ai,machine learning,ml,artificial intelligence,llm"
      ;;
    tooling)
      echo "tools,development,cli,automation,productivity"
      ;;
    *)
      echo "sap"
      ;;
  esac
}

# Generate keywords from skill name
generate_name_keywords() {
  local name="$1"
  local keywords="$name"

  # Split by hyphen and add individual parts (>2 chars)
  IFS='-' read -ra parts <<< "$name"
  for part in "${parts[@]}"; do
    if [ ${#part} -gt 2 ]; then
      keywords="$keywords,$part"
    fi
  done

  echo "$keywords"
}

# Extract keywords from description
extract_description_keywords() {
  local description="$1"
  local keywords=""

  # Common SAP/technical terms to extract (case-insensitive)
  local patterns=(
    "REST|GraphQL|JWT|API|SQL|OAuth|SAML|HTTP|JSON|XML|YAML"
    "WebSocket|TypeScript|JavaScript|Python|Java|Node\.js"
    "scalable|maintainable|production|authentication|authorization"
    "serverless|edge|streaming|realtime|deployment|migration"
    "Cloud Foundry|Kyma|ABAP|CAP|Fiori|HANA|BTP|OData|CDS"
  )

  for pattern in "${patterns[@]}"; do
    # Extract matches and convert to lowercase
    matches=$(echo "$description" | grep -ioE "$pattern" | tr '[:upper:]' '[:lower:]' | sort -u || true)
    if [ -n "$matches" ]; then
      keywords="$keywords,$(echo "$matches" | tr '\n' ',' | sed 's/,$//')"
    fi
  done

  echo "$keywords"
}

# Deduplicate and clean keywords
clean_keywords() {
  local keywords="$1"

  # Convert to array, deduplicate, filter (>2 chars), sort
  echo "$keywords" | tr ',' '\n' | \
    awk '{$1=$1};1' | \
    grep -v '^$' | \
    awk 'length($0) > 2' | \
    sort -u | \
    tr '\n' ',' | \
    sed 's/,$//'
}

# Scan for agent files
scan_agents() {
  local skill_dir="$1"
  local agents_dir="$skill_dir/agents"

  if [ ! -d "$agents_dir" ]; then
    echo "[]"
    return
  fi

  local agents=()
  while IFS= read -r -d '' agent_file; do
    local relative_path
    relative_path="./agents/$(basename "$agent_file")"
    agents+=("$relative_path")
  done < <(find "$agents_dir" -maxdepth 1 -name "*.md" -print0 2>/dev/null || true)

  if [ ${#agents[@]} -eq 0 ]; then
    echo "[]"
  else
    printf '%s\n' "${agents[@]}" | jq -R . | jq -s .
  fi
}

# Scan for command files
scan_commands() {
  local skill_dir="$1"
  local commands_dir="$skill_dir/commands"

  if [ ! -d "$commands_dir" ]; then
    echo "[]"
    return
  fi

  local commands=()
  while IFS= read -r -d '' command_file; do
    local relative_path
    relative_path="./commands/$(basename "$command_file")"
    commands+=("$relative_path")
  done < <(find "$commands_dir" -maxdepth 1 -name "*.md" -print0 2>/dev/null || true)

  if [ ${#commands[@]} -eq 0 ]; then
    echo "[]"
  else
    printf '%s\n' "${commands[@]}" | jq -R . | jq -s .
  fi
}

# Extract YAML frontmatter from SKILL.md
extract_yaml_field() {
  local skill_md="$1"
  local field="$2"

  # Extract YAML frontmatter between --- markers
  local yaml_content
  yaml_content=$(awk '/^---$/{if(++n==2) exit; next} n==1' "$skill_md")

  # Extract field value
  local value
  if [ "$field" = "description" ]; then
    # Multi-line description handling
    value=$(echo "$yaml_content" | awk '
      /^description:/ {
        in_desc=1
        sub(/^description:[[:space:]]*\|?[[:space:]]*/, "")
        if (length($0) > 0) desc=$0
        next
      }
      in_desc {
        if (/^[a-z_]+:/) {
          in_desc=0
        } else {
          gsub(/^[[:space:]]+/, "")
          if (length($0) > 0) {
            if (desc) desc=desc " " $0
            else desc=$0
          }
        }
      }
      END { print desc }
    ')
  else
    value=$(echo "$yaml_content" | grep "^${field}:" | sed "s/^${field}:[[:space:]]*//" | tr -d '"' || true)
  fi

  echo "$value"
}

# Generate plugin.json for a skill
generate_plugin_json() {
  local skill_dir="$1"
  local skill_name
  skill_name=$(basename "$skill_dir")
  local skill_md="$skill_dir/SKILL.md"
  local plugin_dir="$skill_dir/.claude-plugin"
  local plugin_json="$plugin_dir/plugin.json"

  # Check if SKILL.md exists
  if [ ! -f "$skill_md" ]; then
    echo -e "${YELLOW}  Warning: SKILL.md not found in $skill_name, skipping${NC}" >&2
    return 1
  fi

  # Extract YAML fields
  local name
  name=$(extract_yaml_field "$skill_md" "name")
  local description
  description=$(extract_yaml_field "$skill_md" "description")
  local license
  license=$(extract_yaml_field "$skill_md" "license")

  # Validate required fields
  if [ -z "$name" ] || [ -z "$description" ]; then
    echo -e "${RED}  Error: Missing required YAML fields (name or description) in $skill_name${NC}" >&2
    return 1
  fi

  # Auto-detect category
  local category
  category=$(categorize_skill "$skill_name")

  # Generate keywords
  local name_keywords
  name_keywords=$(generate_name_keywords "$name")
  local category_keywords
  category_keywords=$(get_category_keywords "$category")
  local description_keywords
  description_keywords=$(extract_description_keywords "$description")
  local all_keywords
  all_keywords=$(clean_keywords "$name_keywords,$category_keywords,$description_keywords")

  # Convert keywords to JSON array (using jq for proper escaping)
  local keywords_json
  keywords_json=$(echo -n "$all_keywords" | jq -R -s -c 'split(",") | map(select(. != ""))')

  # Scan for agents and commands
  local agents_json
  agents_json=$(scan_agents "$skill_dir")
  local commands_json
  commands_json=$(scan_commands "$skill_dir")

  # Set default license if empty
  if [ -z "$license" ]; then
    license="GPL-3.0"
  fi

  # Build plugin.json content using jq for proper escaping
  local json_content
  json_content=$(jq -n \
    --arg name "$name" \
    --arg description "$description" \
    --arg version "$GLOBAL_VERSION" \
    --arg license "$license" \
    --argjson keywords "$keywords_json" \
    --arg category "$category" \
    --argjson agents "$agents_json" \
    --argjson commands "$commands_json" \
    '{
      name: $name,
      description: $description,
      version: $version,
      author: {
        name: "SAP Skills Maintainers",
        email: "maintainers@example.com"
      },
      license: $license,
      repository: "https://github.com/secondsky/sap-skills",
      keywords: $keywords,
      category: $category
    } + (if $agents != [] then {agents: $agents} else {} end)
      + (if $commands != [] then {commands: $commands} else {} end)'
  )

  # Validate JSON
  if ! echo "$json_content" | jq . > /dev/null 2>&1; then
    echo -e "${RED}  Error: Generated invalid JSON for $skill_name${NC}" >&2
    return 1
  fi

  # Pretty-print JSON
  local formatted_json
  formatted_json=$(echo "$json_content" | jq .)

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}  [DRY RUN] Would create: $plugin_json${NC}"
    echo "$formatted_json" | sed -n '1,10p'
    echo "  ..."
  else
    # Create plugin directory if it doesn't exist
    mkdir -p "$plugin_dir"

    # Write plugin.json
    echo "$formatted_json" > "$plugin_json"
    echo -e "${GREEN}  ✓ Generated: $plugin_json${NC}"
  fi

  return 0
}

# Main execution
main() {
  GLOBAL_VERSION=$(get_global_version)

  echo "=== SAP Skills Plugin Manifest Generator ==="
  echo "Global version: $GLOBAL_VERSION"
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}DRY RUN MODE: No files will be modified${NC}"
  fi
  echo ""

  # Check if skills directory exists
  if [ ! -d "$SKILLS_DIR" ]; then
    echo -e "${RED}Error: Skills directory not found: $SKILLS_DIR${NC}" >&2
    exit 1
  fi

  local count=0
  local success=0
  local failed=0

  # Process each skill directory
  for skill_dir in "$SKILLS_DIR"/*; do
    if [ ! -d "$skill_dir" ]; then
      continue
    fi

    local skill_name
    skill_name=$(basename "$skill_dir")

    # Filter by skill name if specified
    if [ -n "$SKILL_FILTER" ] && [ "$skill_name" != "$SKILL_FILTER" ]; then
      continue
    fi

    echo "Processing: $skill_name"
    count=$((count + 1))

    if generate_plugin_json "$skill_dir"; then
      success=$((success + 1))
    else
      failed=$((failed + 1))
    fi
  done

  echo ""
  echo "=== Summary ==="
  echo "Total processed: $count"
  echo -e "${GREEN}Successful: $success${NC}"
  if [ $failed -gt 0 ]; then
    echo -e "${RED}Failed: $failed${NC}"
  fi

  if [ "$DRY_RUN" = true ]; then
    echo ""
    echo -e "${YELLOW}DRY RUN complete. Run without --dry-run to apply changes.${NC}"
  fi
}

main
