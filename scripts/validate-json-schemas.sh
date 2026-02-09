#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SCHEMAS_DIR="$REPO_ROOT/schemas"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 JSON Schema Validation"
echo "=========================="
echo ""

# Check if ajv-cli is installed
if ! command -v ajv &> /dev/null; then
    echo -e "${RED}Error: ajv-cli is not installed${NC}"
    echo "Install with: npm install -g ajv-cli ajv-formats"
    exit 1
fi

VALIDATION_FAILED=0

# Validate marketplace.json
echo "📋 Validating marketplace.json..."
if ajv validate \
    -s "$SCHEMAS_DIR/marketplace.schema.json" \
    -d "$REPO_ROOT/.claude-plugin/marketplace.json" \
    --strict=false \
    -c ajv-formats \
    --all-errors; then
    echo -e "${GREEN}✓ marketplace.json is valid${NC}"
else
    echo -e "${RED}✗ marketplace.json validation failed${NC}"
    VALIDATION_FAILED=1
fi
echo ""

# Validate all plugin.json files
echo "🔧 Validating plugin.json files..."
PLUGIN_COUNT=0
PLUGIN_ERRORS=0

while IFS= read -r -d '' plugin_json; do
    PLUGIN_COUNT=$((PLUGIN_COUNT + 1))
    PLUGIN_NAME=$(basename "$(dirname "$(dirname "$plugin_json")")")

    echo -n "  Validating $PLUGIN_NAME... "

    if ajv validate \
        -s "$SCHEMAS_DIR/plugin.schema.json" \
        -d "$plugin_json" \
        --strict=false \
        -c ajv-formats \
        --all-errors > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
        ajv validate \
            -s "$SCHEMAS_DIR/plugin.schema.json" \
            -d "$plugin_json" \
            --strict=false \
            -c ajv-formats \
            --all-errors || true
        PLUGIN_ERRORS=$((PLUGIN_ERRORS + 1))
        VALIDATION_FAILED=1
    fi
done < <(find "$REPO_ROOT/plugins" -name "plugin.json" -path "*/\.claude-plugin/plugin.json" -print0)

echo ""
echo "Summary: Validated $PLUGIN_COUNT plugin.json files"
if [ $PLUGIN_ERRORS -gt 0 ]; then
    echo -e "${RED}✗ $PLUGIN_ERRORS plugin(s) failed validation${NC}"
else
    echo -e "${GREEN}✓ All plugins passed validation${NC}"
fi

echo ""
if [ $VALIDATION_FAILED -eq 1 ]; then
    echo -e "${RED}❌ Validation failed${NC}"
    exit 1
else
    echo -e "${GREEN}✅ All validations passed${NC}"
    exit 0
fi
