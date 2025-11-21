# Skill Review Skill

Comprehensive deep-dive documentation review for sap-skills repository.

**Version**: 1.3.0 | **Last Verified**: 2025-11-21

---

## Quick Example

**User**: "Review the sap-cap-nodejs skill"

**Claude** (invokes skill-review):
1. Runs automated checks
2. Verifies against official SAP docs
3. Finds issue categories (critical, high, medium, low)
4. Fixes automatically where clear
5. Reports findings with evidence citations

**Result**: Verified skill with correct SAP patterns

---

## What It Does

### Automated Checks ✅

- YAML frontmatter validity (syntax, required fields)
- **Exact validation rules** (name: 64 chars, description: 1024 chars, no reserved words)
- **SKILL.md line count** (<500 lines for optimal performance)
- Package version currency (vs npm registry)
- Broken links (HTTP status codes)
- TODO markers in code
- File organization (expected directories exist)
- "Last Verified" date staleness (>90 days)

### Manual Verification 🔍

- API method correctness (vs official docs)
- GitHub maintenance status (commits, issues)
- Production repository patterns (real usage)
- Code example accuracy (imports, signatures)
- Schema consistency across files
- **Progressive disclosure architecture** (reference depth, TOC)
- **Conciseness & degrees of freedom** (over-explained content, appropriate detail)
- **Anti-pattern detection** (Windows paths, inconsistent terminology)
- **Testing & evaluation** (multi-model, 3+ test scenarios)
- **Security & MCP** (qualified tool references, error handling)

### Issue Classification 🎯

- 🔴 **CRITICAL**: Breaks functionality (fake imports, invalid config)
- 🟡 **HIGH**: Causes confusion (contradictory examples, outdated major versions)
- 🟠 **MEDIUM**: Reduces quality (stale versions, missing sections)
- 🟢 **LOW**: Polish issues (typos, formatting)

---

## Usage

### Slash Command (Explicit)

```
/review-skill <skill-name>
```

**Examples**:
- `/review-skill sap-cap-nodejs`
- `/review-skill sap-fiori-elements`

### Skill Invocation (Proactive)

Claude can suggest reviews when it notices:
- "X skill seems outdated"
- "Package Y just released v2.0"
- "Skill last verified 6 months ago"

**Trigger phrases**:
- "review this skill"
- "audit the sap-cap-nodejs skill"
- "check if sap-fiori-elements needs updates"
- "is sap-btp-setup current?"

---

## Installation

```bash
./scripts/install-skill.sh skill-review
```

**Verify**:
```
ls ~/.claude/skills/skill-review
```

---

## 14-Phase Process

1. **Pre-Review Setup** - Install, version check, discovery test
2. **Standards Compliance** - YAML exact rules (64 char name, 1024 char desc, <500 line SKILL.md)
3. **Official Docs Verification** - Context7, GitHub, npm
4. **Code Examples Audit** - Imports, APIs, schemas
5. **Cross-File Consistency** - SKILL.md vs README vs references
6. **Dependencies & Versions** - Currency, breaking changes
7. **Progressive Disclosure Architecture** - Reference depth, TOC, 3-tier model
8. **Conciseness & Degrees of Freedom** - Over-explanation, terminology consistency
9. **Anti-Pattern Detection** - Windows paths, time-sensitive info, defaults
10. **Testing & Evaluation** - Multi-model, 3+ test scenarios, real problems
11. **Security & MCP** - URL fetches, qualified tool references, error handling, marketplace schema compliance
12. **Issue Categorization** - Severity classification
13. **Fix Implementation** - Auto-fix or ask user
14. **Post-Fix Verification** - Test, commit

**Detailed guide**: `planning/SKILL_REVIEW_PROCESS.md`

---

## Output Example

```
═══════════════════════════════════════════════
  SKILL REVIEW REPORT: sap-cap-nodejs
═══════════════════════════════════════════════

🔴 CRITICAL (2):
  - Non-existent API: deprecated import (line 17)
  - Schema inconsistency: table name mismatch

🟡 HIGH (3):
  - Package outdated: old version → current
  - Contradictory examples in 3 files
  - Setup script uses deprecated pattern

🟠 MEDIUM (1):
  - Last verified 85 days ago

═══════════════════════════════════════════════
RECOMMENDATION: Comprehensive review required
Estimated effort: 2-4 hours
Breaking changes: Possible
═══════════════════════════════════════════════
```

---

## When to Use

### Required

- Major package version updates (e.g., @sap/cds 7.x → 8.x)
- User reports errors following skill
- Before marketplace submission

### Recommended

- Skill last verified >90 days ago
- After framework breaking changes
- When adding new features to skill
- Quarterly maintenance

### On-Demand

- Suspected issues
- Investigating user feedback
- Quality assurance before release

---

## Auto-Trigger Keywords

Claude recognizes these phrases and may suggest review:
- "review this skill"
- "review the X skill"
- "audit [skill-name]"
- "check if X needs updates"
- "is X skill current?"
- "verify X documentation"
- "X skill seems outdated"

---

## Example Audit Process

**Trigger**: User reports issues or skill seems outdated

**Typical Findings**:
- Issues found by severity (critical, high, medium, low)
- Main problems: API changes, deprecated patterns, outdated versions
- Required action: Update patterns, fix imports, bump version

**Typical Remediation**:
- Delete: Files with incorrect patterns
- Create: Files with correct current patterns
- Update: SKILL.md, README.md with fixes
- Lines changed: Varies by scope

**Time**: 1-4 hours depending on complexity

**Result**: Skill upgraded with correct patterns

**Evidence Required**:
- Official documentation links (SAP Help, SAP Community)
- GitHub repository references
- Version changelogs

---

## Token Efficiency

**Without skill**: ~25,000 tokens
- Trial-and-error verification
- Repeated doc lookups
- Inconsistent fixes
- Missing evidence

**With skill**: ~5,000 tokens
- Systematic process
- Clear decision trees
- Evidence-based fixes
- Comprehensive audit

**Savings**: ~80% (20,000 tokens)

---

## Common Issues Prevented

| Issue Category | Examples | Severity |
|----------------|----------|----------|
| Fake APIs | Non-existent imports/adapters | 🔴 Critical |
| Stale methods | Changed API signatures | 🔴 Critical |
| **Name/Description violations** | >64 chars, >1024 chars, reserved words | 🔴 Critical |
| **SKILL.md too long** | >500 lines (performance impact) | 🟡 High |
| Schema inconsistency | Different table names | 🟡 High |
| Outdated scripts | Deprecated patterns | 🟡 High |
| **Progressive disclosure issues** | Deeply nested references, no TOC | 🟡 High |
| Version drift | Packages >90 days old | 🟠 Medium |
| Contradictory examples | Multiple conflicting patterns | 🟡 High |
| Broken links | 404 documentation URLs | 🟡 High |
| YAML errors | Invalid frontmatter | 🔴 Critical |
| **Anti-patterns** | Windows paths, inconsistent terminology | 🟠 Medium |
| **Over-explained content** | Claude already knows this | 🟠 Medium |
| **Missing tests** | No test scenarios, single model testing | 🟠 Medium |
| **Security issues** | Unqualified MCP refs, silent errors, non-standard marketplace fields | 🟡 High |

---

## Scripts & Commands

**Review script** (automated checks):
```bash
./scripts/review-skill.sh <skill-name>
./scripts/review-skill.sh <skill-name> --quick  # Fast check
```

**Slash command** (full process):
```
/review-skill <skill-name>
```

**Skill invocation** (proactive):
```
"Review the sap-cap-nodejs skill"
```

---

## Resources

**Full Process Guide**: `planning/SKILL_REVIEW_PROCESS.md` (~3,500 words)

**Slash Command**: `.claude/commands/review-skill.md`

**Review Script**: `scripts/review-skill.sh`

**Repository**: https://github.com/secondsky/sap-skills

**Example Audit**: See process guide Appendix B

---

## Best Practices

1. ✅ **Always cite sources** - GitHub URL, docs link, npm changelog
2. ✅ **No assumptions** - Verify against current official docs
3. ✅ **Be systematic** - Follow all 14 phases
4. ✅ **Fix consistency** - Update all files, not just one
5. ✅ **Document thoroughly** - Detailed commit messages
6. ✅ **Test after fixes** - Verify skill still works
7. ✅ **Check exact rules** - Name 64 chars, desc 1024 chars, SKILL.md <500 lines
8. ✅ **Progressive disclosure** - References one level deep, TOC for long files

---

## Contributing

Found an issue with the review process? Suggestions for improvement?

1. Open issue: https://github.com/secondsky/sap-skills/issues
2. Describe: What phase could be improved?
3. Provide: Example where current process fell short

---

## Version History

**v1.2.0** (2025-11-16)
- Added marketplace schema compliance check (no custom fields)
- Errors prevented: 30+ → 31+

**v1.1.0** (2025-11-16)
- Enhanced with official Claude best practices documentation
- 14-phase systematic audit process (was 9-phase)
- Added exact YAML validation rules (name: 64 chars, description: 1024 chars)
- Added SKILL.md line count check (<500 lines)
- Added progressive disclosure architecture review
- Added conciseness & degrees of freedom audit
- Added anti-pattern detection
- Added testing & evaluation review (multi-model, 3+ scenarios)
- Added security & MCP considerations
- Errors prevented: 20+ → 30+

**v1.3.0** (2025-11-21)
- Adapted for sap-skills repository
- Updated repository references
- Generalized examples for SAP skill development

**v1.0.0** (2025-11-08)
- Initial release
- 9-phase systematic audit process
- Automated script + manual guide
- Slash command + skill wrapper

---

## License

MIT License - See LICENSE file in repository root

---

**Maintained by**: sap-skills project
**Last verified**: 2025-11-21
**Production status**: ✅ Ready
