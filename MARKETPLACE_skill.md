# Claude Skills Marketplace Guide

> Complete reference for managing skills, plugins, and the marketplace registry

**Last Updated**: 2025-12-19
**Current Version**: 2.1.0
**Total Skills**: 33
**Categories**: 8

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Plugin.json Schema](#pluginjson-schema)
4. [Scripts](#scripts)
5. [Issues Encountered & Fixes](#issues-encountered--fixes)
6. [Category System](#category-system)
7. [Keyword Generation](#keyword-generation)
8. [Workflow](#workflow)
9. [Validation Commands](#validation-commands)
10. [References](#references)

---

## Overview

The Claude Skills marketplace is a registry system that allows Claude Code to discover and use production-ready skills. It consists of:

| Component | Purpose |
|-----------|---------|
| **marketplace.json** | Central registry listing all available plugins |
| **plugin.json** | Individual plugin metadata for each skill |
| **SKILL.md** | The actual skill content loaded by Claude |

### How It Works

1. Claude Code reads `marketplace.json` to discover available skills
2. Each plugin entry points to a skill directory via `source` field
3. When a skill is installed, Claude reads the skill's `plugin.json` for metadata
4. The `SKILL.md` content is loaded when the skill is triggered

---

## File Structure

```
claude-skills/
├── .claude-plugin/
│   └── marketplace.json          ← Central registry (auto-generated)
│
└── skills/
    └── [skill-name]/
        ├── .claude-plugin/
        │   └── plugin.json       ← Individual plugin metadata
        ├── SKILL.md              ← Skill content
        ├── agents/               ← Optional: Agent definitions
        │   └── *.md
        ├── commands/             ← Optional: Slash commands
        │   └── *.md
        ├── scripts/              ← Optional: Helper scripts
        └── references/           ← Optional: Extended docs
```

### Key Directories

| Directory | Purpose | Detection |
|-----------|---------|-----------|
| `agents/` | Custom agent definitions | Scanned → `agents` array in plugin.json |
| `commands/` | Slash command definitions | Scanned → `commands` array in plugin.json |
| `scripts/` | Helper scripts for the skill | Not auto-detected |
| `references/` | Extended documentation | Not auto-detected |

---

## Plugin.json Schema

Each skill has a `plugin.json` file following the Anthropic plugin specification:

```json
{
  "name": "cloudflare-d1",
  "description": "Complete knowledge domain for Cloudflare D1...",
  "version": "3.0.0",
  "author": {
    "name": "Claude Skills Maintainers",
    "email": "maintainers@example.com"
  },
  "license": "MIT",
  "repository": "https://github.com/secondsky/claude-skills",
  "keywords": [
    "cloudflare-d1",
    "cloudflare",
    "d1",
    "sql",
    "database"
  ],
  "category": "cloudflare",
  "agents": [
    "./agents/code-reviewer.md"
  ],
  "commands": [
    "./commands/feature-dev.md"
  ]
}
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique skill identifier (matches directory name) |
| `description` | Yes | Skill description with "Use when:" scenarios |
| `version` | Yes | Semantic version (synced from marketplace) |
| `author` | Yes | Author name and email |
| `license` | Yes | License type (GPL-3.0) |
| `repository` | Yes | GitHub repository URL |
| `keywords` | Yes | Array of search terms (auto-generated) |
| `category` | Yes | One of 18 categories (auto-detected) |
| `agents` | No | Array of agent file paths (auto-detected) |
| `commands` | No | Array of command file paths (auto-detected) |

---

## Scripts

### Primary Script: sync-plugins.sh

**Single entry point for all plugin management.**

```bash
# Full sync - updates all plugin.json files and regenerates marketplace.json
./scripts/sync-plugins.sh

# Preview changes without modifying files
./scripts/sync-plugins.sh --dry-run

# Show help
./scripts/sync-plugins.sh --help
```

#### What It Does

1. **Reads global version** from `marketplace.json` metadata
2. **For each skill**:
   - Syncs version to match global
   - Auto-detects and sets category
   - Scans `agents/` directory → adds `agents` array
   - Scans `commands/` directory → adds `commands` array
   - Generates keywords from name, category, and description
3. **Regenerates marketplace.json** with all updated data

#### Key Functions

| Function | Purpose |
|----------|---------|
| `categorize_skill()` | Determines category based on skill name patterns |
| `get_category_keywords()` | Returns domain-specific keywords for category |
| `generate_name_keywords()` | Extracts keywords from skill name |
| `extract_description_keywords()` | Extracts technical terms from description |
| `generate_keywords_json()` | Combines all sources with deduplication |
| `scan_agents()` | Finds `agents/*.md` files |
| `scan_commands()` | Finds `commands/*.md` files |

---

### Secondary Script: generate-marketplace.sh

Generates `marketplace.json` from all `plugin.json` files.

```bash
./scripts/generate-marketplace.sh
```

**Key Implementation Detail**:

```json
// CORRECT - copies only skill directory
"source": "./skills/cloudflare-d1"

// WRONG - would copy entire repository (18× bloat)
"source": "./"
```

---

### Deprecated Scripts

These scripts are kept for reference but should not be used:

| Script | Replacement |
|--------|-------------|
| `generate-plugin-manifests.sh` | Use `sync-plugins.sh` |
| `populate-keywords.sh` | Use `sync-plugins.sh` |

---

## Issues Encountered & Fixes

### Issue 1: Cache Duplication (18× Bloat)

**Problem**: Old marketplace format used `source: "./"` which copied the entire repository to cache for each installed skill.

**Symptoms**:
- Claude reported 3,218 skills instead of 169
- Cache contained massive duplicated content

**Root Cause**:
```json
// Old format - WRONG
{
  "plugins": [{
    "source": "./"  // Copies ENTIRE repo to cache
  }]
}
```

**Fix** (in `generate-marketplace.sh`):
```json
// New format - CORRECT
{
  "plugins": [{
    "source": "./skills/cloudflare-d1"  // Copies only this skill
  }]
}
```

**Impact**: Reduced cache from 3,218 entries to 169 entries.

---

### Issue 2: Version Mismatch

**Problem**: `marketplace.json` had version `"3.0.0"` but individual `plugin.json` files had `"1.0.0"` or `"2.0.0"`.

**Root Cause**: No automated version synchronization between files.

**Fix** (in `sync-plugins.sh`):
```bash
# Read global version from marketplace.json
GLOBAL_VERSION=$(jq -r '.metadata.version // "1.0.0"' "$MARKETPLACE_JSON")

# Sync to each plugin.json
"version": "$GLOBAL_VERSION"
```

---

### Issue 3: Duplicate Keywords

**Problem**: Keywords contained both hyphenated and space-separated versions:
- `"openai-agents"` AND `"openai agents"`
- `"project-workflow"` AND `"project workflow"`

**Root Cause** (in `generate_name_keywords()`):
```bash
# Old code - REMOVED
for ((i=0; i<${#parts[@]}-1; i++)); do
  keywords="$keywords,${parts[i]} ${parts[i+1]}"  # Added "openai agents"
done
```

**Fix**: Removed the space-separated pair generation. The hyphenated name already provides discoverability.

**Result**:
```json
// Before
"keywords": ["openai-agents", "openai", "agents", "openai agents", ...]

// After
"keywords": ["openai-agents", "openai", "agents", ...]
```

---

### Issue 4: Missing Fields in plugin.json

**Problem**: Individual `plugin.json` files were missing:
- `category` field
- `agents` array (for skills with agents)
- `commands` array (for skills with commands)

**Fix** (in `sync-plugins.sh`):
```bash
# Auto-detect category
category=$(categorize_skill "$skill_name")

# Scan for agents
agents_json=$(scan_agents "$skill_dir")

# Scan for commands
commands_json=$(scan_commands "$skill_dir")
```

**Example Result** (feature-dev skill):
```json
{
  "category": "tooling",
  "agents": [
    "./agents/code-architect.md",
    "./agents/code-explorer.md",
    "./agents/code-reviewer.md"
  ],
  "commands": [
    "./commands/feature-dev.md"
  ]
}
```

---

### Issue 5: Multiple Scripts Confusion

**Problem**: Three separate scripts managed plugin data:
1. `generate-plugin-manifests.sh` - Created plugin.json from SKILL.md
2. `populate-keywords.sh` - Generated keywords
3. `generate-marketplace.sh` - Created marketplace.json

**Fix**: Consolidated into single `sync-plugins.sh` that does everything:
- Version sync
- Category detection
- Keyword generation
- Agents/commands scanning
- Marketplace regeneration

The old scripts are now marked as deprecated.

---

## Category System

Skills are auto-categorized based on name patterns. There are 18 categories:

| Category | Pattern Match | Example Skills |
|----------|---------------|----------------|
| `cloudflare` | `^cloudflare-` | cloudflare-d1, cloudflare-workers-ai |
| `ai` | `^(ai-\|openai-\|claude-\|google-gemini-\|...)` | ai-sdk-core, openai-agents |
| `frontend` | `^(nextjs\|nuxt-\|react-\|tanstack-\|...)` | nuxt-v4, tailwind-v4-shadcn |
| `auth` | `^(better-auth\|clerk-auth\|oauth-)` | better-auth, clerk-auth |
| `database` | `^(database-\|drizzle-\|neon-\|vercel-)` | drizzle-orm-d1, vercel-kv |
| `api` | `^(api-\|graphql-\|rest-api-\|websocket-)` | api-design-principles |
| `testing` | `^(jest-\|mutation-\|playwright-\|vitest-)` | vitest-testing |
| `security` | `^(access-control-\|csrf-\|xss-\|...)` | csrf-protection |
| `mobile` | `^(app-store-\|mobile-\|react-native-\|swift-)` | swift-best-practices |
| `web` | `^(firecrawl-\|hono-\|image-\|session-\|...)` | hono-routing |
| `seo` | `^seo-` | seo-optimizer |
| `design` | `^(design-\|interaction-\|kpi-dashboard-)` | design-review |
| `data` | `^(recommendation-\|sql-query-)` | sql-query-optimization |
| `documentation` | `^technical-specification` | technical-specification |
| `architecture` | `^(architecture-\|health-check-\|microservices-)` | microservices-patterns |
| `woocommerce` | `^woocommerce-` | woocommerce-backend-dev |
| `cms` | `^(content-collections\|hugo\|sveltia-\|wordpress-)` | hugo |
| `tooling` | Default fallback | project-workflow, skill-review |

### Category Distribution (Current)

```
tooling               28 skills
cloudflare            23 skills
frontend              21 skills
ai                    20 skills
api                   17 skills
web                   11 skills
mobile                 8 skills
database               6 skills
security               6 skills
testing                5 skills
design                 4 skills
woocommerce            4 skills
cms                    4 skills
data                   3 skills
architecture           3 skills
auth                   3 skills
seo                    2 skills
documentation          1 skills
```

---

## Keyword Generation

Keywords are generated from three sources and deduplicated:

### 1. Name Keywords

From the skill name itself:

```
openai-agents → ["openai-agents", "openai", "agents"]
cloudflare-d1 → ["cloudflare-d1", "cloudflare"]  (d1 is ≤2 chars, skipped)
```

**Rules**:
- Include the full hyphenated name
- Split by `-` and include parts >2 characters
- No space-separated pairs (removed to avoid duplicates)

### 2. Category Keywords

Domain-specific terms based on category:

| Category | Keywords |
|----------|----------|
| `cloudflare` | cloudflare, workers, edge, serverless, wrangler |
| `ai` | ai, machine-learning, ml, llm, artificial-intelligence |
| `frontend` | frontend, ui, components, react, typescript |
| `database` | database, orm, sql, storage, query |
| `api` | api, rest, graphql, endpoints, http |
| `testing` | testing, tests, unit-tests, integration, quality |
| `security` | security, vulnerability, protection, csrf, xss |

### 3. Description Keywords

Extracted from the skill description:

- **ALL-CAPS terms**: REST, GraphQL, JWT, API, SQL → converted to lowercase
- **CamelCase terms**: WebSocket, TypeScript → converted to lowercase
- **Valuable terms**: scalable, maintainable, production, authentication, serverless, edge, streaming, realtime, deployment, migration, etc.

### Deduplication

All keywords are:
1. Converted to lowercase
2. Trimmed of whitespace
3. Filtered (≤2 chars removed)
4. Deduplicated using exact string matching

---

## Workflow

### Adding a New Skill

```bash
# 1. Create skill directory with SKILL.md
mkdir -p skills/my-new-skill
# Add SKILL.md with proper YAML frontmatter

# 2. Run sync to generate plugin.json and update marketplace
./scripts/sync-plugins.sh

# 3. Verify
jq '.' skills/my-new-skill/.claude-plugin/plugin.json

# 4. Commit
git add skills/my-new-skill .claude-plugin/marketplace.json
git commit -m "Add my-new-skill"
git push
```

### Updating All Plugins

```bash
# Run full sync
./scripts/sync-plugins.sh

# Verify changes
git diff skills/*/.claude-plugin/plugin.json

# Commit all changes
git add skills/*/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git commit -m "Sync plugins: version update"
git push
```

### Changing Global Version

```bash
# 1. Update version in marketplace.json metadata
jq '.metadata.version = "4.0.0"' .claude-plugin/marketplace.json > tmp.json
mv tmp.json .claude-plugin/marketplace.json

# 2. Run sync to propagate to all plugins
./scripts/sync-plugins.sh

# 3. Commit
git add .
git commit -m "Bump version to 4.0.0"
```

### Dry Run (Preview Changes)

```bash
# See what would change without modifying files
./scripts/sync-plugins.sh --dry-run
```

---

## Validation Commands

### Check Version Sync

```bash
# All skills should show same version
jq -r '.version' skills/*/.claude-plugin/plugin.json | sort -u
# Expected: 3.0.0
```

### Check Categories

```bash
# Category distribution
jq -r '.category' skills/*/.claude-plugin/plugin.json | sort | uniq -c

# Find skills without category (should be empty)
for f in skills/*/.claude-plugin/plugin.json; do
  if ! jq -e '.category' "$f" > /dev/null 2>&1; then
    echo "Missing category: $f"
  fi
done
```

### Check Marketplace

```bash
# Total plugin count
jq '.plugins | length' .claude-plugin/marketplace.json
# Expected: 169

# Find missing descriptions
jq '.plugins[] | select(.description == "") | .name' .claude-plugin/marketplace.json

# Find empty keywords
jq '.plugins[] | select(.keywords == []) | .name' .claude-plugin/marketplace.json
```

### Check for Duplicate Keywords

```bash
# Check specific skill
jq '.keywords' skills/openai-agents/.claude-plugin/plugin.json

# Should NOT have both "openai-agents" and "openai agents"
```

### Check Agents/Commands

```bash
# Skills with agents
jq -r 'select(.agents != null) | "\(.name): \(.agents | length) agents"' \
  skills/*/.claude-plugin/plugin.json

# Skills with commands
jq -r 'select(.commands != null) | "\(.name): \(.commands | length) commands"' \
  skills/*/.claude-plugin/plugin.json
```

### Full Validation Suite

```bash
echo "=== Version Check ===" && \
jq -r '.version' skills/*/.claude-plugin/plugin.json | sort -u && \
echo "" && \
echo "=== Marketplace Count ===" && \
jq '.plugins | length' .claude-plugin/marketplace.json && \
echo "" && \
echo "=== Category Summary ===" && \
jq -r '.category' skills/*/.claude-plugin/plugin.json | sort | uniq -c | sort -rn
```

---

## References

### Official Documentation

- **Plugin Marketplaces**: https://code.claude.com/docs/en/plugin-marketplaces
- **Anthropic Skills Repo**: https://github.com/anthropics/skills
- **Agent Skills Spec**: https://github.com/anthropics/skills/blob/main/agent_skills_spec.md

### Internal Documentation

- **CLAUDE.md**: Project instructions and standards
- **START_HERE.md**: Getting started guide
- **QUICK_WORKFLOW.md**: 5-minute skill creation
- **ONE_PAGE_CHECKLIST.md**: Quick verification checklist

### Scripts Location

```
scripts/
├── sync-plugins.sh              ← Primary (single entry point)
├── generate-marketplace.sh      ← Marketplace generation
├── generate-plugin-manifests.sh ← DEPRECATED
├── populate-keywords.sh         ← DEPRECATED
├── install-skill.sh             ← Install skill to ~/.claude/skills/
└── install-all.sh               ← Install all skills
```

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-19 | Fixed duplicate keywords issue |
| 2025-12-19 | Created unified sync-plugins.sh |
| 2025-12-19 | Added category, agents, commands to plugin.json |
| 2025-12-19 | Fixed cache duplication (18× bloat) |
| 2025-12-19 | Created this documentation |

---

**Maintainer**: Claude Skills Maintainers
**Repository**: https://github.com/secondsky/claude-skills
