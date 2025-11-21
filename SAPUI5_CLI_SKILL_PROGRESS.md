# SAPUI5 CLI Skill Development Progress Tracker

**Skill Name**: sapui5-cli
**Created**: 2025-11-21
**Status**: In Development
**Target Location**: `/home/user/sap-skills/skills/sapui5-cli/`

---

## Documentation Sources

### Core Documentation
| URL | Status | Extracted | Notes |
|-----|--------|-----------|-------|
| https://ui5.github.io/cli/stable/ | ✅ Complete | ✅ | Main landing page |
| https://ui5.github.io/cli/stable/pages/Overview/ | ✅ Complete | ✅ | Overview and introduction |
| https://ui5.github.io/cli/stable/pages/GettingStarted/ | ✅ Complete | ✅ | Installation and setup |
| https://ui5.github.io/cli/stable/pages/CLI/ | ✅ Complete | ✅ | CLI commands reference |
| https://ui5.github.io/cli/stable/pages/Configuration/ | ✅ Complete | ✅ | Configuration files (ui5.yaml) |

### Project Types
| URL | Status | Extracted | Notes |
|-----|--------|-----------|-------|
| https://ui5.github.io/cli/stable/pages/Project/ | ✅ Complete | ✅ | Project types and structure |
| https://ui5.github.io/cli/stable/pages/OpenUI5/ | ✅ Complete | ✅ | OpenUI5 specific |
| https://ui5.github.io/cli/stable/pages/SAPUI5/ | ✅ Complete | ✅ | SAPUI5 specific |
| https://ui5.github.io/cli/stable/pages/Workspace/ | ✅ Complete | ✅ | Workspace/monorepo setup |
| https://ui5.github.io/cli/stable/pages/FileSystem/ | ✅ Complete | ✅ | File system abstraction |

### Extensibility
| URL | Status | Extracted | Notes |
|-----|--------|-----------|-------|
| https://ui5.github.io/cli/stable/pages/extensibility/CustomTasks/ | ✅ Complete | ✅ | Custom build tasks |
| https://ui5.github.io/cli/stable/pages/extensibility/CustomServerMiddleware/ | ✅ Complete | ✅ | Custom server middleware |
| https://ui5.github.io/cli/stable/pages/extensibility/ProjectShims/ | ✅ Complete | ✅ | Project shims |

### Tools & Features
| URL | Status | Extracted | Notes |
|-----|--------|-----------|-------|
| https://ui5.github.io/cli/stable/pages/Server/ | ✅ Complete | ✅ | Development server |
| https://ui5.github.io/cli/stable/pages/Builder/ | ✅ Complete | ✅ | Build process |
| https://ui5.github.io/cli/stable/pages/CodeAnalysis/ | ✅ Complete | ✅ | Code analysis features |
| https://ui5.github.io/cli/stable/pages/ESSupport/ | ✅ Complete | ✅ | ECMAScript support |
| https://ui5.github.io/cli/stable/pages/Benchmarking/ | ✅ Complete | ✅ | Performance benchmarking |
| https://ui5.github.io/cli/stable/pages/Troubleshooting/ | ✅ Complete | ✅ | Common issues and solutions |

### Migration Guides
| URL | Status | Extracted | Notes |
|-----|--------|-----------|-------|
| https://ui5.github.io/cli/stable/updates/migrate-v4/ | ✅ Complete | ✅ | Migrate to v4 |
| https://ui5.github.io/cli/stable/updates/migrate-v3/ | ✅ Complete | ✅ | Migrate to v3 |
| https://ui5.github.io/cli/stable/updates/migrate-v2/ | ✅ Complete | ✅ | Migrate to v2 |
| https://ui5.github.io/cli/stable/updates/migrate-v1/ | ✅ Complete | ✅ | Migrate to v1 |

---

## Skill Structure Plan

### Directory Structure
```
skills/sapui5-cli/
├── SKILL.md                      # Main skill file with YAML frontmatter
├── README.md                     # Keywords for auto-trigger
│
├── references/
│   ├── cli-commands.md           # Complete CLI command reference
│   ├── configuration.md          # ui5.yaml configuration guide
│   ├── project-types.md          # Project types and structure
│   ├── extensibility.md          # Custom tasks and middleware
│   ├── troubleshooting.md        # Common issues and solutions
│   └── migration-guides.md       # Version migration guides
│
├── templates/
│   ├── ui5.yaml.application      # Template for applications
│   ├── ui5.yaml.library          # Template for libraries
│   ├── ui5.yaml.workspace        # Template for workspace/monorepo
│   ├── custom-task-template.js   # Custom task example
│   └── custom-middleware-template.js  # Custom middleware example
│
└── scripts/
    ├── validate-ui5-yaml.js      # Validate ui5.yaml syntax
    └── check-dependencies.js     # Check UI5 CLI dependencies
```

### Content Sections to Extract

#### From Core Documentation
- [ ] Installation methods (npm, yarn, pnpm)
- [ ] System requirements and prerequisites
- [ ] CLI command syntax and options
- [ ] Common command workflows
- [ ] Configuration file structure (ui5.yaml, ui5-workspace.yaml)
- [ ] Framework variants (OpenUI5 vs SAPUI5)

#### From Project Types
- [ ] Application projects
- [ ] Library projects
- [ ] Theme library projects
- [ ] Module projects
- [ ] Workspace/monorepo setup
- [ ] Project dependencies and linking

#### From Extensibility
- [ ] Custom task API and examples
- [ ] Custom middleware API and examples
- [ ] Project shim configuration
- [ ] Task ordering and dependencies
- [ ] Middleware ordering

#### From Tools & Features
- [ ] Development server configuration
- [ ] Build process steps and options
- [ ] Code analysis tools (JSDoc, TypeScript)
- [ ] ECMAScript support levels
- [ ] Performance benchmarking
- [ ] SSL/HTTPS configuration

#### From Troubleshooting
- [ ] Common error messages and solutions
- [ ] Dependency conflicts
- [ ] Build failures
- [ ] Server startup issues
- [ ] Workspace resolution problems

#### From Migration Guides
- [ ] Breaking changes by version
- [ ] Migration steps
- [ ] Deprecated features
- [ ] New features by version

---

## Skill Metadata (Draft)

### YAML Frontmatter
```yaml
---
name: managing-sapui5-cli
description: Manages SAPUI5/OpenUI5 projects using the UI5 Tooling CLI. Use when initializing UI5 projects, configuring ui5.yaml, building UI5 applications or libraries, running development servers, creating custom build tasks or middleware, managing workspaces/monorepos, troubleshooting UI5 CLI issues, or migrating between UI5 CLI versions. Supports both OpenUI5 and SAPUI5 frameworks with complete configuration and extensibility guidance.
license: MIT
---
```

### Auto-Trigger Keywords (for README.md)
- ui5, sapui5, openui5
- ui5 tooling, ui5 cli, @ui5/cli
- ui5.yaml, ui5-workspace.yaml
- ui5 build, ui5 serve, ui5 add, ui5 init
- ui5 framework, ui5 version
- ui5 custom task, ui5 custom middleware
- ui5 workspace, ui5 monorepo
- ui5 library, ui5 application
- ui5 project, ui5 configuration
- ui5 dependencies, ui5 shims
- ui5 server, ui5 development server
- ui5 build process, ui5 bundling
- sap fiori, fiori elements (related)

---

## Extraction Progress

### ✅ Completed Sections

**Documentation Fetching** (100%):
- ✅ Main UI5 CLI page
- ✅ Overview and introduction
- ✅ Getting Started guide
- ✅ CLI commands reference
- ✅ Configuration (ui5.yaml)
- ✅ Project types (application, library, theme-library, module)
- ✅ OpenUI5 configuration
- ✅ SAPUI5 configuration
- ✅ Workspace/monorepo setup
- ✅ File system abstraction
- ✅ Custom build tasks
- ✅ Custom server middleware
- ✅ Project shims
- ✅ Development server
- ✅ Build process
- ✅ Code analysis
- ✅ ECMAScript support
- ✅ Benchmarking
- ✅ Troubleshooting
- ✅ Migration guides (v1, v2, v3, v4)

**Skill Creation** (100%):
- ✅ Directory structure created
- ✅ SKILL.md with YAML frontmatter and progressive disclosure
- ✅ README.md with comprehensive keywords
- ✅ Reference files (cli-commands.md, configuration.md, troubleshooting.md, migration-guides.md, extensibility.md)
- ✅ Template files (ui5.yaml.application, ui5.yaml.library, ui5-workspace.yaml, custom-task-template.js, custom-middleware-template.js)

### 🚧 In Progress
_Final review and commit_

### ⏳ Pending
_None - all tasks completed!_

---

## Quality Checklist

Based on CLAUDE_SKILLS_DOCUMENTATION.md and ONE_PAGE_CHECKLIST.md:

### Metadata & Structure
- [ ] YAML frontmatter valid (name + description)
- [ ] Name uses gerund form (managing-sapui5-cli)
- [ ] Description in third person
- [ ] Description includes "Use when" scenarios
- [ ] LICENSE field present (MIT)
- [ ] Keywords comprehensive in README.md

### Content Quality
- [ ] SKILL.md under 500 lines (main file)
- [ ] Instructions in imperative form
- [ ] One-level-deep references only
- [ ] Progressive disclosure pattern used
- [ ] Consistent terminology throughout
- [ ] No time-sensitive content (or proper deprecation)
- [ ] Forward slashes for paths (not backslashes)
- [ ] Clear default options provided

### Technical Accuracy
- [ ] Package versions current (verified 2025-11-21)
- [ ] Templates tested and working
- [ ] Scripts have error handling
- [ ] Dependencies listed and verified
- [ ] Known issues documented with sources
- [ ] Configuration parameters documented

### Testing
- [ ] Skill discovery works (keywords trigger)
- [ ] Templates generate valid projects
- [ ] Scripts execute without errors
- [ ] References load correctly
- [ ] Multi-model tested (Haiku, Sonnet, Opus)

---

## Notes

### Key Design Decisions
1. **Progressive Disclosure**: Main SKILL.md will be concise overview with references to detailed docs
2. **One-Level References**: All reference files directly linked from SKILL.md (no nested refs)
3. **Comprehensive Templates**: Provide working templates for all project types
4. **Validation Scripts**: Include scripts to validate configurations
5. **Version Coverage**: Include migration guides for all major versions

### Challenges & Solutions
- **Documentation Volume**: Use progressive disclosure to manage large amount of CLI documentation
- **Version Differences**: Clear sections for migration guides and deprecated patterns
- **Framework Variants**: Explicit coverage of both OpenUI5 and SAPUI5 differences
- **Extensibility Complexity**: Provide concrete examples for custom tasks and middleware

### References to Include
- Direct links to official UI5 CLI documentation (for easy updates)
- Links to SAP Community for known issues
- Links to GitHub issues for CLI bugs
- Links to npm packages (@ui5/cli, @ui5/fs, @ui5/builder, etc.)

---

**Last Updated**: 2025-11-21
**Next Update**: After each major section completion
