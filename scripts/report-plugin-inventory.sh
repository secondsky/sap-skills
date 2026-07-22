#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "SAP Skills inventory"
echo "===================="
echo ""

echo "Marketplace"
echo "-----------"
jq -r '"version: \(.metadata.version)\nplugins: \(.plugins | length)\ncategories: \(.metadata.categories | join(", "))"' .claude-plugin/marketplace.json
echo ""

echo "Category counts"
echo "---------------"
jq -r '.plugins[].category' .claude-plugin/marketplace.json | sort | uniq -c | sed 's/^ *//'
echo ""

echo "Advanced feature counts"
echo "-----------------------"
commands=$(find plugins -path '*/commands/*.md' -type f | wc -l | tr -d ' ')
agents=$(find plugins -path '*/agents/*.md' -type f | wc -l | tr -d ' ')
mcp=$(find plugins -name '.mcp.json' -type f | wc -l | tr -d ' ')
lsp=$(find plugins -name '.lsp.json' -type f | wc -l | tr -d ' ')
printf 'commands: %s\nagents: %s\nmcp configs: %s\nlsp configs: %s\n' "$commands" "$agents" "$mcp" "$lsp"
echo ""

echo "Freshness markers"
echo "-----------------"
rg -n --glob '*.md' \\
  'last_verified|lastUpdated|Last Updated|latest|current|QRC [0-9]/20[0-9]{2}|SPS0[0-9]' \
  plugins docs README.md CLAUDE.md || true
