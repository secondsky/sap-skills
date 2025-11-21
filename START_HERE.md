# START HERE 👋

**Welcome to sap-skills!** This is your entry point for building production-ready SAP skills for Claude Code.

---

## What Do You Want To Do?

### 🆕 Build a New SAP Skill

**Quick Start** (5 minutes):
1. Create directory: `mkdir -p skills/my-skill-name/`
2. Create `SKILL.md` with YAML frontmatter and instructions
3. Create `README.md` with auto-trigger keywords
4. Add your resources (scripts, references, assets)
5. Test by mentioning it to Claude Code
6. Verify with [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md)

**Detailed Workflow**: See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md)

---

### ✅ Verify an Existing Skill

**Compliance Check**:
- Use [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md) for quick verification
- Use `skill-review` skill for comprehensive 14-phase audit

---

### 🔬 Research Before Building

**Research Protocol**:
1. Check SAP official documentation (help.sap.com, developers.sap.com)
2. Verify latest SDK/package versions
3. Check SAP Community for common issues
4. Build working example first
5. Document all errors encountered and fixes

---

### 📚 Understand the Standards

**Official Documentation**:
- Anthropic Skills Repo: https://github.com/anthropics/skills
- Agent Skills Spec: [anthropics/skills/agent_skills_spec.md](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)

**SAP Documentation**:
- SAP Developer Center: https://developers.sap.com/
- SAP Help Portal: https://help.sap.com/
- SAP Community: https://community.sap.com/

---

### 📝 Learn From Examples

**Working Examples**:
- **skill-review**: `skills/skill-review/` - Quality assurance skill
- **Official Examples**: https://github.com/anthropics/skills

---

## Quick Reference Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  START: I want to build a skill for [SAP technology]       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ 1. RESEARCH                  │
        │ • Check SAP documentation    │
        │ • Verify SDK versions        │
        │ • Build working example      │
        └──────────┬───────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ 2. CREATE DIRECTORY          │
        │ mkdir -p skills/my-skill/    │
        └──────────┬───────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ 3. CREATE FILES              │
        │ • SKILL.md with frontmatter  │
        │ • README.md with keywords    │
        └──────────┬───────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ 4. ADD RESOURCES             │
        │ • scripts/ (executable code) │
        │ • references/ (docs)         │
        │ • assets/ (templates)        │
        └──────────┬───────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ 5. TEST                      │
        │ • Ask Claude to use skill    │
        │ • Verify discovery works     │
        └──────────┬───────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ 6. VERIFY COMPLIANCE         │
        │ Check ONE_PAGE_CHECKLIST.md  │
        └──────────┬───────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ 7. COMMIT                    │
        │ • git add skills/my-skill    │
        │ • git commit with details    │
        │ • git push                   │
        └──────────────────────────────┘
```

---

## Key Files Quick Reference

| File | Purpose | When To Read |
|------|---------|--------------|
| **START_HERE.md** (this file) | Navigation hub | Always (entry point) |
| **CLAUDE.md** | Project context | When working on this repo |
| **ONE_PAGE_CHECKLIST.md** | Quick verification | Before committing |
| **QUICK_WORKFLOW.md** | 5-minute process | Building new skill |
| **MARKETPLACE.md** | Marketplace docs | For skill distribution |

---

## Project Status (2025-11-21)

### ✅ Completed (1 skill)

- **skill-review**: Comprehensive 14-phase audit process for skill quality assurance

### 🚧 Planned SAP Skills

**SAP CAP**: sap-cap-nodejs, sap-cap-java, sap-cap-cds, sap-cap-fiori
**SAP Fiori**: sap-fiori-elements, sap-ui5-freestyle, sap-fiori-launchpad
**SAP BTP**: sap-btp-setup, sap-cloud-foundry, sap-kyma
**SAP ABAP**: sap-abap-cloud, sap-abap-classic, sap-abap-cds
**SAP Integration**: sap-integration-suite, sap-odata, sap-api-hub
**SAP HANA**: sap-hana-cloud, sap-hana-db

---

## Common Questions

**Q: Where do I start after clearing context?**
A: Read this file, then go to [CLAUDE.md](CLAUDE.md) for project context.

**Q: How do I know if my skill is correct?**
A: Check [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md) - if all boxes check, you're good!

**Q: What if I forget the workflow?**
A: See [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md) for step-by-step instructions.

**Q: How do I verify against official Anthropic standards?**
A: Compare against https://github.com/anthropics/skills/blob/main/agent_skills_spec.md

---

## Need Help?

1. Check [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md) for common requirements
2. Look at `skills/skill-review/` for a working example
3. Open an issue: https://github.com/secondsky/sap-skills/issues

---

## External Resources

### Anthropic
- **Official Anthropic Skills**: https://github.com/anthropics/skills
- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code/skills
- **Support Articles**:
  - [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills)
  - [Creating custom skills](https://support.claude.com/en/articles/12512198-creating-custom-skills)

### SAP
- **SAP Developer Center**: https://developers.sap.com/
- **SAP Help Portal**: https://help.sap.com/
- **SAP Community**: https://community.sap.com/
- **SAP Business Accelerator Hub**: https://api.sap.com/

---

**Ready to build?** Start with the quick workflow above or dive into [QUICK_WORKFLOW.md](QUICK_WORKFLOW.md) for details!

**Questions about the project?** Read [CLAUDE.md](CLAUDE.md) for full context.

**Just need to verify?** Check [ONE_PAGE_CHECKLIST.md](ONE_PAGE_CHECKLIST.md) and you're done.
