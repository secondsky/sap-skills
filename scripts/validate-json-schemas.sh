#!/usr/bin/env bash
#
# Validate JSON schemas for SAP Skills repository
#
# Validates:
# - .claude-plugin/marketplace.json against marketplace.schema.json
# - All plugin.json files against plugin.schema.json
#
# Requirements:
# - ajv-cli: npm install -g ajv-cli ajv-formats
#
# Usage:
#   ./scripts/validate-json-schemas.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SCHEMAS_DIR="$REPO_ROOT/schemas"

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "═══════════════════════════════════════"
echo " JSON Schema Validation"
echo "═══════════════════════════════════════"
echo ""

if ! command -v ajv &> /dev/null; then
  echo -e "${RED}Error: ajv-cli is not installed${NC}"
  echo ""
  echo "Install with:"
  echo "  npm install -g ajv-cli ajv-formats"
  echo ""
  exit 1
fi

VALIDATION_FAILED=0

echo -e "${BLUE}Validating marketplace.json...${NC}"
if ajv validate \
    -s "$SCHEMAS_DIR/marketplace.schema.json" \
    -d "$REPO_ROOT/.claude-plugin/marketplace.json" \
    --spec=draft7 \
    --strict=false \
    -c ajv-formats \
    --all-errors 2>&1; then
    echo -e "${GREEN}marketplace.json is valid${NC}"
else
    echo -e "${RED}marketplace.json validation FAILED${NC}"
    VALIDATION_FAILED=1
fi
echo ""

echo -e "${BLUE}Finding plugin.json files...${NC}"
plugin_files=$(find "$REPO_ROOT/plugins" -name 'plugin.json' -path '*/.claude-plugin/plugin.json' | sort)
plugin_count=$(echo "$plugin_files" | wc -l | tr -d ' ')

echo -e "Found ${BLUE}$plugin_count${NC} plugin.json files"
echo ""

failed_count=0
passed_count=0

while IFS= read -r plugin_json; do
    if [ -z "$plugin_json" ]; then continue; fi

    plugin_name=$(basename "$(dirname "$(dirname "$plugin_json")")")

    set +e
    validation_output=$(ajv validate \
        -s "$SCHEMAS_DIR/plugin.schema.json" \
        -d "$plugin_json" \
        --spec=draft7 \
        --strict=false \
        -c ajv-formats \
        --all-errors 2>&1)
    validation_exit_code=$?
    set -e

    if [ $validation_exit_code -eq 0 ]; then
        echo -e "${GREEN}OK${NC} $plugin_name"
        passed_count=$((passed_count + 1))
    else
        echo -e "${RED}FAIL${NC} $plugin_name - VALIDATION FAILED"
        echo ""
        echo "Details:"
        echo "$validation_output"
        echo ""
        failed_count=$((failed_count + 1))
        VALIDATION_FAILED=1
    fi
done <<< "$plugin_files"

echo ""
echo "═══════════════════════════════════════"
echo "VALIDATION SUMMARY"
echo "═══════════════════════════════════════"
echo ""
echo "Plugin Validation:"
echo -e "  Total:  ${BLUE}$plugin_count${NC}"
echo -e "  Passed: ${GREEN}$passed_count${NC}"
echo -e "  Failed: ${RED}$failed_count${NC}"

echo ""

if [ $VALIDATION_FAILED -eq 1 ]; then
    echo -e "${RED}Validation failed. Fix errors above.${NC}"
    echo ""
    exit 1
else
    echo -e "${GREEN}All validations passed${NC}"
    echo ""
    exit 0
fi
