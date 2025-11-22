# SAP Fiori Tools Skill - Documentation Extraction Progress

**Source Repository**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs
**Extraction Started**: 2025-11-22
**Last Updated**: 2025-11-22
**Status**: COMPLETE

---

## Documentation Structure Overview

The SAP Fiori Tools documentation consists of **~100+ markdown files** organized in the following directories:

### Directory Summary

| Directory | Files | Status |
|-----------|-------|--------|
| Root docs/ | 62 files | Extracted |
| Getting-Started-with-SAP-Fiori-Tools/ | 12 files | Extracted |
| Generating-an-Application/ | 2 files + 3 subdirs | Extracted |
| Generating-an-Application/SAP-Fiori-Elements/ | 4 files | Extracted |
| Generating-an-Application/SAPUI5-Freestyle/ | 5 files | Extracted |
| Generating-an-Application/Additional-Configuration/ | 4 files | Extracted |
| Developing-an-Application/ | 58 files | Extracted |
| Previewing-an-Application/ | 17 files | Extracted |
| Deploying-an-Application/ | 9 files | Extracted |
| Project-Functions/ | 13 files | Extracted |

---

## Extraction Progress by Section

### 1. Getting Started with SAP Fiori Tools (12 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| getting-started-with-sap-fiori-tools-2d8b1cb.md | Extracted | Overview, 6 extensions, support component |
| installation-e870fcf.md | Extracted | Links to BAS/VS Code setup |
| sap-business-application-studio-b011040.md | Extracted | Dev space types, setup steps |
| visual-studio-code-17efa21.md | Extracted | Node.js requirements, extensions, auth methods |
| capabilities-overview-f540ae1.md | Extracted | 35 commands, project types |
| command-palette-4896dcc.md | Referenced | Command palette usage |
| migration-70d41f3.md | Referenced | Migration guide |
| importing-an-application-ab4657c.md | Referenced | Import existing apps |
| abap-development-tools-integration-20da2fd.md | Referenced | ADT integration |
| telemetry-837c231.md | Referenced | Telemetry settings |
| report-issues-and-security-7c755a5.md | Referenced | Security & reporting |

### 2. Generating an Application

#### 2.1 Root Files (2 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| generating-an-application-db44d45.md | Extracted | Template wizard, project structure |
| security-certificate-4b318be.md | Referenced | Certificate setup |

#### 2.2 SAP Fiori Elements Subdirectory (4 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| sap-fiori-elements-1488469.md | Referenced | Overview |
| supported-floorplans-2b2b12e.md | Extracted | 6 floorplans with OData compatibility |
| data-source-9906181.md | Extracted | Connection types, EDMX, CAP, BAS destinations |
| floorplan-properties-745ae0c.md | Extracted | Entity selection, navigation, table types |

#### 2.3 SAPUI5 Freestyle Subdirectory (5 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| freestyle-sapui5-616b1a4.md | Referenced | Overview |
| supported-templates-20d1146.md | Referenced | Template list |
| basic-template-14fdcc0.md | Extracted | Basic template features, limitations |
| data-source-37a0fcf.md | Referenced | Data source config |
| template-properties-c2a3c82.md | Referenced | Template properties |

#### 2.4 Additional Configuration Subdirectory (4 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| additional-configuration-9bea64e.md | Referenced | Overview |
| generating-an-mta-deployment-file-9c41152.md | Referenced | MTA generation |
| adding-an-sap-fiori-application-to-an-mta-deployment-file-with-5a17ba6.md | Referenced | MTA addition |
| adding-javascript-code-assist-5c561ed.md | Referenced | JS code assist |

### 3. Developing an Application (58 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| developing-an-application-a9c0043.md | Extracted | Page Map, Page Editor overview |
| list-report-page-493f2aa.md | Extracted | Supported elements (4 types) |
| form-and-object-page-1eb11a6.md | Extracted | 6 section types |
| maintaining-annotation-based-elements-a524d8a.md | Referenced | Annotation elements |
| maintaining-extension-based-elements-02172d2.md | Extracted | Custom columns, sections, actions, views |
| maintaining-building-blocks-6d3ad83.md | Extracted | 5 building block types |
| maintaining-annotations-with-language-server-6fc93f8.md | Extracted | CDS/XML support, features |
| code-completion-dd4fc3b.md | Extracted | Triggers, path navigation |
| micro-snippets-addf811.md | Extracted | Snippet types, usage |
| diagnostics-1fd8f54.md | Extracted | Validation, quick fixes |
| internationalization-i18n-eb427f2.md | Extracted | i18n config, key naming |
| visualizing-annotations-with-service-modeler-58784b5.md | Extracted | Launch methods, features |
| use-feature-guides-0c9e518.md | Extracted | Guided Development usage |
| (45 additional files) | Referenced | Various page editor details |

### 4. Previewing an Application (17 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| previewing-an-application-b962685.md | Extracted | NPM scripts, preview methods |
| use-mock-data-bda83a4.md | Extracted | MockServer setup, usage |
| generating-mock-data-with-ai-815c310.md | Extracted | AI requirements, process |
| run-control-overview-d7f20f3.md | Extracted | launch.json location, workspace config |
| app-to-app-navigation-preview-543675f.md | Extracted | Navigation setup, generated files |
| (12 additional files) | Referenced | Various preview options |

### 5. Deploying an Application (9 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| deploying-an-application-1b7a3be.md | Extracted | ABAP vs CF overview, troubleshooting |
| generate-deployment-configuration-abap-c06b9cb.md | Extracted | Prerequisites, prompts, transport options |
| generate-deployment-configuration-cloud-foundry-41e63bd.md | Extracted | MTA tool, CF CLI, generated structure |
| sap-fiori-launchpad-configuration-bc3cb89.md | Extracted | Tile parameters |
| (5 additional files) | Referenced | Security, undeployment, app router |

### 6. Project Functions (13 files)

| File | Status | Extracted Content |
|------|--------|-------------------|
| project-functions-0d8fa32.md | Extracted | 11 functions listed |
| data-editor-18e43b5.md | Extracted | Edit, add, delete rows, sync options |
| environment-check-75390cf.md | Extracted | Destination checks, report sections |
| managing-sap-system-connections-78a82b6.md | Extracted | Auth types, credential storage |
| project-validation-6f3c737.md | Extracted | 4 validation steps |
| (8 additional files) | Referenced | Various project functions |

### 7. Root Documentation Files (Adaptation Projects & Others)

| File | Status | Extracted Content |
|------|--------|-------------------|
| index.md | Extracted | Main index, all sections |
| extending-an-existing-application-6e25aca.md | Referenced | Overview |
| extending-an-sap-fiori-application-for-an-on-premise-system-802f01c.md | Extracted | Prerequisites, workflow, limitations |
| extending-an-sap-fiori-application-for-sap-s-4hana-cloud-public-edition-and-sap-btp-abap-f4881a9.md | Extracted | Prerequisites, catalogs |
| creating-an-adaptation-project-072f566.md | Extracted | Wizard steps, configuration |
| controller-extensions-ad7b4ae.md | Extracted | File structure, lifecycle methods |
| add-fragments-to-an-aggregation-or-extension-point-6033d56.md | Extracted | Process, requirements, fragment template |
| upgrade-safe-compatibility-rules-53706e2.md | Extracted | 6 core rules |
| generating-an-application-with-the-project-accelerator-or-joule-using-sap-fiori-tools-ai-6845fed.md | Extracted | Input formats, generated output, limitations |
| (43 additional files) | Referenced | Various topics |

---

## Extracted Information Summary

### Key Topics Covered

- [x] Installation & Setup (BAS, VS Code)
- [x] Fiori Elements Generator (6 floorplans)
- [x] Freestyle SAPUI5 Generator (Basic template)
- [x] Page Editor (List Report, Object Page)
- [x] Annotation Support & Language Server
- [x] Building Blocks (5 types)
- [x] Feature Guides (Guided Development)
- [x] Service Modeler
- [x] Preview & Run Configurations
- [x] MockServer & Mock Data
- [x] Live Data Integration
- [x] Deployment (ABAP, Cloud Foundry)
- [x] Fiori Launchpad Configuration
- [x] Adaptation Projects (On-premise, Cloud)
- [x] AI-Powered Generation (Joule/Project Accelerator)
- [x] Extension Development (Custom columns, sections, actions)
- [x] Internationalization (i18n)

---

## Generated Skill Files

| File | Purpose | Lines |
|------|---------|-------|
| SKILL.md | Main skill instructions | ~380 |
| README.md | Keywords for discovery | ~270 |
| references/getting-started.md | Installation, migration, commands | ~450 |
| references/configuration.md | MTA, middlewares, SAPUI5 versions | ~400 |
| references/page-editor.md | Page Editor details | ~370 |
| references/annotations.md | Annotation development | ~415 |
| references/deployment.md | Deployment configuration | ~430 |
| references/adaptation-projects.md | Extension development | ~480 |
| references/preview.md | Preview and testing | ~510 |

**Total**: ~3,700+ lines of documentation

---

## Notes

- Documentation has duplicate files for different system contexts (on-premise vs cloud)
- AI generation features are newer additions (Project Accelerator/Joule)
- Adaptation projects have separate workflows for different SAP environments
- Progressive disclosure implemented: main SKILL.md + 5 reference files
- All key information extracted and organized by topic

---

## Documentation Source Links

For future updates, refer to:

| Topic | GitHub Path |
|-------|-------------|
| Getting Started | `Getting-Started-with-SAP-Fiori-Tools/` |
| Generation | `Generating-an-Application/` |
| Development | `Developing-an-Application/` |
| Preview | `Previewing-an-Application/` |
| Deployment | `Deploying-an-Application/` |
| Project Functions | `Project-Functions/` |
| Adaptation | Root docs folder |

**Base URL**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs

---

## Update Log

| Date | Action | Files Processed |
|------|--------|-----------------|
| 2025-11-22 | Initial structure analysis | Directory listing complete |
| 2025-11-22 | Content extraction | 40+ key files extracted |
| 2025-11-22 | Skill creation | SKILL.md + 5 reference files |
| 2025-11-22 | Completion | All sections documented |
