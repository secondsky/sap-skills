#!/bin/bash
set -euo pipefail

# validate-reserved-words.sh
# Validates that marketplace.json and plugin.json files do not contain reserved words
# that would cause CLI installation to fail.
#
# Reserved words: "official", "anthropic", "claude" (case-insensitive)
# These are blocked to prevent marketplace impersonation.
#
# Usage: ./scripts/validate-reserved-words.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Reserved words pattern (case-insensitive)
RESERVED_PATTERN="(official|anthropic|claude)"

# Verify jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq is required but not installed.${NC}"
    echo "Install jq: apt-get install jq (Ubuntu) or brew install jq (macOS)"
    exit 1
fi

echo "🔍 Reserved Words Validation"
echo "============================="
echo ""
echo "Checking for blocked words: official, anthropic, claude"
echo ""

ERRORS=0
MARKETPLACE_CHECKED=false

# Function to check a JSON file for reserved words in name and description fields
check_file() {
    local file="$1"
    local relpath="${file#$REPO_ROOT/}"

    # Extract name and description fields and check for reserved words
    local name_desc
    name_desc=$(jq -r '(.name // "") + " " + (.description // "")' "$file" 2>/dev/null || echo "")

    if echo "$name_desc" | grep -iE "$RESERVED_PATTERN" > /dev/null 2>&1; then
        echo -e "${RED}✗${NC} $relpath"
        echo "  Reserved word found in name or description field"
        # Show which field contains the reserved word
        local name_value desc_value
        name_value=$(jq -r '.name // ""' "$file" 2>/dev/null || echo "")
        desc_value=$(jq -r '.description // ""' "$file" 2>/dev/null || echo "")

        if echo "$name_value" | grep -iE "$RESERVED_PATTERN" > /dev/null 2>&1; then
            echo "  name: $name_value"
        fi
        if echo "$desc_value" | grep -iE "$RESERVED_PATTERN" > /dev/null 2>&1; then
            echo "  description: $desc_value"
        fi
        return 1
    else
        echo -e "${GREEN}✓${NC} $relpath"
        return 0
    fi
}

# Check marketplace.json
echo "📋 Checking marketplace.json..."
MARKETPLACE_JSON="$REPO_ROOT/.claude-plugin/marketplace.json"
if [ -f "$MARKETPLACE_JSON" ]; then
    MARKETPLACE_CHECKED=true
    if ! check_file "$MARKETPLACE_JSON"; then
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} marketplace.json not found at $MARKETPLACE_JSON"
fi
echo ""

# Check all plugin.json files
echo "🔧 Checking plugin.json files..."
PLUGIN_COUNT=0

while IFS= read -r -d '' plugin_json; do
    PLUGIN_COUNT=$((PLUGIN_COUNT + 1))
    if ! check_file "$plugin_json"; then
        ERRORS=$((ERRORS + 1))
    fi
done < <(find "$REPO_ROOT/plugins" -name "plugin.json" -path "*/\.claude-plugin/plugin.json" -print0 2>/dev/null)

echo ""
if [ "$MARKETPLACE_CHECKED" = true ]; then
    echo "Summary: Checked $PLUGIN_COUNT plugin.json files + marketplace.json"
else
    echo "Summary: Checked $PLUGIN_COUNT plugin.json files"
fi
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ Validation failed: $ERRORS file(s) contain reserved words${NC}"
    echo ""
    echo "Reserved words (official, anthropic, claude) are not allowed in"
    echo "name or description fields. Use alternatives like:"
    echo "  - 'AI coding assistant' instead of 'Claude'"
    echo "  - 'the Code CLI' instead of 'Claude Code CLI'"
    exit 1
else
    echo -e "${GREEN}✅ All files passed validation${NC}"
    exit 0
fi
