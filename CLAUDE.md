<coding_guidelines>
# SAP Skills - Project Context

**Repository**: https://github.com/secondsky/sap-skills
**Purpose**: SAP development skills for AI coding assistants with evidence-tracked verification
**Version**: 2.3.2 | **Plugins**: 40 | **Last Updated**: 2026-07-15

---

## What This Repository Is

40 SAP development skills for SAP technologies: BTP, CAP, Fiori, ABAP,
Analytics, and more. Public-source/package-registry verification is tracked
where available; live tenant/system validation is tracked per plugin in
`docs/project/source-verification-ledger.json`.

---

## Quick Navigation

**👋 Plugin Development Basics?** → Use official **plugin-dev skills** FIRST
  - skill-development, plugin-structure, command-development, agent-development,
    hook-development, mcp-integration, plugin-settings

**🔧 SAP-Specific Patterns?** → Read [**Contributor Guide**](docs/contributor-guide/)
  - Marketplace infrastructure, quality assurance, SDK versioning

---

## Codebase Exploration

**📖 For detailed project structure, see [project-structure.md](docs/architecture/project-structure.md)** (generated with codemap)

Use the `codemap` CLI tool ([github.com/JordanCoin/codemap](https://github.com/JordanCoin/codemap)) to quickly understand the project structure:

```bash
# Generate project tree with file stats
codemap .

# Show dependency flow (imports/exports)
codemap --deps .

# Files changed vs main branch
codemap --diff

# Check impact of a file (who imports it)
codemap --importers lib/accounting/ledger.ts

# Limit tree depth
codemap --depth 2 .

# Filter by extension
codemap --only ts,tsx .
```

Install: `brew tap JordanCoin/tap && brew install codemap`

---

## Critical Directives

### 1. ALWAYS Use plugin-dev First

For all general plugin development tasks:
- Creating skills, commands, agents, hooks
- YAML frontmatter syntax
- Plugin directory structure
- MCP server integration
- Basic validation

### 2. ALWAYS Use Manual Review Process

**FORBIDDEN - Automated Refactoring**:
- Creating Python/shell scripts to refactor skills
- Using sed/awk to programmatically rewrite sections
- Batch processing without human review
- Auto-generating skill prose, references, commands, agents, hooks, or docs via scripts

**REQUIRED - Manual Refactoring**:
- Use Read, Edit, Write tools manually
- Review each change before applying
- Human judgment for extraction decisions
- Quality control via manual review
- Deterministic manifest generation is allowed only through the checked-in sync scripts, followed by manual diff review

**Why**: Skills require context-aware decisions. Automation introduces subtle
errors that break functionality.

### 3. Oracle Shared Reviews

Use Oracle as a browser-first second-opinion tool when stuck, for architecture
review, before risky refactors, or for second-model validation of important
plans. Default to subscription-backed ChatGPT browser mode; API mode is
separately billed and requires explicit user approval before use.

Before sending large context, run a dry run with a file report:

```bash
bun run oracle -- --dry-run summary --files-report -p "Review this plan" --file "plugins/**"
```

Never include secrets, `.env` files, credentials, tokens, private browser
profiles, or machine-local config paths in Oracle requests.

For browser-backed Oracle runs, keep archiving disabled with
`--browser-archive never`; the repo `bun run oracle` and `bun run oracle:review`
scripts include this by default. Avoid `--browser-hide-window` for important
long reviews. After completion, verify the session captured a useful response
(`outputTokens` greater than 1 in `~/.oracle/sessions/<id>/meta.json`) and
inspect `~/.oracle/sessions/<id>/artifacts/transcript.md` when the answer looks
short. If capture is suspiciously short, recover the ChatGPT conversation before
rerunning.

Do not rerun long browser sessions blindly; check `bun run oracle:status` first,
then reattach with `bun run oracle -- session <id> --render`. For MCP consults,
prefer `preset: "chatgpt-pro-heavy"` or explicit `engine: "browser"`.

---

## SAP-Specific Infrastructure

### Marketplace System

**Scale**: 40 plugins with coordinated versioning
**Structure**: Single root manifest per plugin (`plugins/*/.claude-plugin/plugin.json`)
**Registry**: Central marketplace.json (~40KB, auto-generated)
**Cross-References**: 17 plugins reference related skills

**Categories**:
- Category counts are maintained in [README.md](README.md)
- Validate plugin and marketplace inventory with `./scripts/validate-inventory.sh`

### Automation Scripts

**sync-plugins.sh**: Orchestrates complete sync workflow
  1. Read global version from marketplace.json
  2. Generate/update all plugin.json files
  3. Regenerate marketplace.json

**generate-plugin-manifests.sh**: SKILL.md YAML → plugin.json conversion

**generate-marketplace.sh**: Aggregates root plugin manifests into central registry

**Usage**:
```bash
./scripts/sync-plugins.sh           # Full sync
./scripts/sync-plugins.sh --dry-run # Preview changes
```

### Quality Standards

**Verification Evidence**: Skills track public-source/package-registry evidence where available. Live SAP system/BTP tenant validation must be recorded in `docs/project/source-verification-ledger.json` before it is claimed.

**Version Tracking**: SAP SDK versions documented in metadata
```yaml
metadata:
  version: "2.3.2"
  cap_version: "@sap/cds 9.4.x"
  last_verified: "2025-12-28"
```

**Known Issues**: Documented with SAP Note/GitHub issue citations

**Reserved Words Policy**: Marketplace and plugin `name` and `description` fields
MUST NOT contain: "official", "anthropic", or "claude". These are blocked by the
CLI to prevent marketplace impersonation. Use alternatives like "AI coding assistant"
or "the Code CLI" instead.

---

## Maintenance Cycles

**Quarterly** (Every 3 months):
- Check SAP SDK/package versions
- Update to latest stable releases
- Re-test all skills in production
- Update last_verified dates

**When SAP Releases Major Updates**:
- Review breaking changes in release notes
- Update skill templates and examples
- Test thoroughly with new versions
- Document migration paths if needed

---

## Getting Help

**General Plugin Development**:
→ Use plugin-dev skills (official Anthropic)

**SAP-Specific Patterns**:
→ Read [Contributor Guide](docs/contributor-guide/)

**Issues**:
→ https://github.com/secondsky/sap-skills/issues

---

## External Resources

**Official Anthropic**:
- Plugin-dev skills: Use for all general plugin development
- Skills Spec: https://github.com/anthropics/skills/blob/main/agent_skills_spec.md

**SAP Resources**:
- SAP Developer Center: https://developers.sap.com/
- SAP Help Portal: https://help.sap.com/
- SAP Community: https://community.sap.com/

---

**Last Updated**: 2026-06-17
**Next Review**: 2026-08-31 (Quarterly)
**Maintainer**: Eduard Jiglau
**Email**: hello@sap-ai-skills.com
**Website**: https://sap-ai-skills.com
</coding_guidelines>
