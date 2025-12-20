# Contributing to SAP Skills

Thank you for your interest in contributing to the SAP Skills collection! 🎉

## Quick Links

- [QUICK_WORKFLOW.md](../QUICK_WORKFLOW.md) - 5-minute skill creation guide
- [ONE_PAGE_CHECKLIST.md](../ONE_PAGE_CHECKLIST.md) - Quality verification checklist
- [CLAUDE.md](../CLAUDE.md) - Project context and guidelines

## Ways to Contribute

### 1. Report Issues
- **Bug Reports**: Found an error in a skill? [Report it](https://github.com/secondsky/sap-skills/issues/new?template=bug_report.md)
- **Feature Requests**: Have an idea to improve a skill? [Suggest it](https://github.com/secondsky/sap-skills/issues/new?template=feature_request.md)
- **New Skills**: Want a skill for a specific SAP technology? [Request it](https://github.com/secondsky/sap-skills/issues/new?template=skill_request.md)

### 2. Create New Skills

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/sap-skills.git
cd sap-skills

# 2. Create a new branch
git checkout -b skill/my-new-skill

# 3. Create skill directory
mkdir -p skills/my-new-skill

# 4. Add required files
# - SKILL.md (with YAML frontmatter)
# - README.md (with auto-trigger keywords)

# 5. Test locally
# Ask Claude to use your skill and verify it works

# 6. Commit and push
git add skills/my-new-skill
git commit -m "Add my-new-skill for [use case]"
git push origin skill/my-new-skill

# 7. Create Pull Request
```

### 3. Improve Existing Skills

- Update package versions
- Add missing error patterns
- Improve documentation
- Add code examples
- Fix broken links

## Skill Quality Standards

All skills must meet these requirements:

### Required Files
- ✅ `SKILL.md` - Main documentation with YAML frontmatter
- ✅ `README.md` - Auto-trigger keywords and quick reference

### YAML Frontmatter
```yaml
---
name: skill-name
description: |
  This skill should be used when... [third-person description]
  
  Use when: [scenarios]
  
  Keywords: [technologies, use-cases, error-messages]
license: GPL-3.0
---
```

### Quality Checklist
- [ ] Name uses kebab-case
- [ ] Description in third-person
- [ ] "Use when" scenarios included
- [ ] Comprehensive keywords
- [ ] License field: GPL-3.0
- [ ] README.md has trigger keywords
- [ ] Templates tested (if included)
- [ ] Package versions current
- [ ] No broken links

## Development Workflow

1. **Research**: Verify latest package versions and official docs
2. **Create**: Build skill following the template
3. **Test**: Test skill discovery and functionality
4. **Review**: Use skill-review for quality check
5. **Submit**: Create PR with completed checklist

## Code Style

- **Markdown**: Use standard formatting, no trailing whitespace
- **YAML**: 2-space indentation
- **Code blocks**: Always specify language for syntax highlighting
- **Links**: Use reference-style for repeated URLs

## Commit Messages

Follow conventional commits:

```
feat: add sap-new-technology skill
fix: correct package version in sap-cap-capire
docs: update README with new skill count
chore: update dependencies
```

## Pull Request Process

1. **Title**: Clear, descriptive title
2. **Description**: Explain what and why
3. **Automated Quality Checks**: Your PR will trigger automated validation
   - ✅ YAML frontmatter validation
   - ✅ GPL-3.0 license verification
   - ✅ Skill structure validation
   - ✅ Internal link verification

   **Note**: The main branch is protected by GitHub Rulesets. All PRs require:
   - ✅ Passing quality checks (`validate-skills`)
   - ✅ Code owner approval (@secondsky)
   - ✅ All review conversations resolved

   Direct pushes to main are blocked. All changes must go through the PR process.

4. **Checklist**: Complete all applicable items
5. **Review**: Address feedback promptly
6. **Merge**: Maintainers will merge when ready

## Testing

### Manual Testing
- Verify skill appears in Claude Code/Desktop
- Test with actual SAP project scenarios
- Confirm all links work
- Check code examples execute correctly

### Quality Tools
- Use `skill-review` skill for automated checks
- Validate YAML syntax
- Check for broken links

## License

By contributing, you agree that your contributions will be licensed under GPL-3.0.

## Questions?

- Open a [discussion](https://github.com/secondsky/sap-skills/discussions)
- Check existing [issues](https://github.com/secondsky/sap-skills/issues)
- Review [documentation](https://github.com/secondsky/sap-skills#readme)

---

**Thank you for contributing to the SAP developer community!** ❤️
