# SAP Skills - Project Structure

> Auto-generated with [codemap](https://github.com/JordanCoin/codemap)
> Last updated: 2026-09-17
> Run `codemap --depth 3 .` to regenerate

---

╭──────────────────────────────── sap-skills ─────────────────────────────────╮
│ Files: 1231 | Size: 9.6MB                                                   │
│ Top Extensions: .md (739), .json (176), .yaml (89), .mjs (77), .tmpl (25)   │
╰─────────────────────────────────────────────────────────────────────────────╯
[1msap-skills[0m
├── [1;34m  .agents/[0m [2m(32 files, 154.2KB)[0m
│   ├── [1;34m  plugins/[0m [2m(11.2KB)[0m
│   │   └── [31mmarketplace.json[0m[2m[0m 
│   └── [1;34m  skills/[0m [2m(31 files, 143.0KB)[0m
│       ├── [1;34m  claude-automation-recommender/[0m [2m(6 files, 41.4KB)[0m
│       │   └── [2m... 1 directory, 1 file[0m
│       ├── [1;34m  claude-md-improver/[0m [2m(4 files, 15.3KB)[0m
│       │   └── [2m... 1 directory, 1 file[0m
│       ├── [1;34m  dependency-upgrade/[0m [2m(19 files, 77.6KB)[0m
│       │   └── [2m... 3 directories, 1 file[0m
│       ├── [1;34m  grill-me/[0m [2m(635.0B)[0m
│       │   └── [2m... 1 file[0m
│       └── [1;34m  web-perf/[0m [2m(8.0KB)[0m
│           └── [2m... 1 file[0m
├── [1;34m  .claude-plugin/[0m [2m(47.6KB)[0m
│   └── [31mmarketplace.json[0m[2m[0m 
├── [1;34m  .githooks/[0m [2m(3 files, 5.4KB)[0m
│   └── [32mREADME.md[0m[2m[0m  [37mpre-commit[0m[2m[0m [37mpre-push[0m[2m[0m   
├── [1;34m  .github/[0m [2m(19 files, 46.3KB)[0m
│   ├── [1;34m  ISSUE_TEMPLATE/[0m [2m(4 files, 2.4KB)[0m
│   │   └── [32mbug_report.md[0m[2m[0m      [32mfeature_request.md[0m[2m[0m 
│   │       [31mconfig.yml[0m[2m[0m         [32mskill_request.md[0m[2m[0m   
│   ├── [1;34m  codeql/[0m [2m(1008.0B)[0m
│   │   └── [31mcodeql-config.yml[0m[2m[0m 
│   ├── [1;34m  workflows/[0m [2m(8 files, 28.0KB, all .yml)[0m
│   │   └── [31mcodeql[0m[2m[0m                     [31mquality-checks[0m[2m[0m             
│   │       [31mdependency-security-checks[0m[2m[0m [31msap-bw-query-bundle[0m[2m[0m        
│   │       [31mlocal-fixture-smoke[0m[2m[0m        [31mvalidate-frontmatter[0m[2m[0m       
│   │       [31mmcp-freshness[0m[2m[0m              [31mvalidate-json-schemas[0m[2m[0m      
│   └── [37mCODEOWNERS[0m[2m[0m               [32mPULL_REQUEST_TEMPLATE.md[0m[2m[0m 
│       [32mCODE_OF_CONDUCT.md[0m[2m[0m       [32mSECURITY.md[0m[2m[0m              
│       [32mCONTRIBUTING.md[0m[2m[0m          [31mdependabot.yml[0m[2m[0m           
├── [1;34m  .oracle/[0m [2m(314.0B)[0m
│   └── [31mconfig.json[0m[2m[0m 
├── [1;34m  docs/[0m [2m(23 files, 203.1KB)[0m
│   ├── [1;34m  architecture/[0m [2m(2 files, 23.1KB, all .md)[0m
│   │   └── [32mmarketplace-infrastructure[0m[2m[0m [32mproject-structure[0m[2m[0m          
│   ├── [1;34m  contributor-guide/[0m [2m(6 files, 79.8KB, all .md)[0m
│   │   └── [32mREADME[0m[2m[0m                    [32mmulti-harness-portability[0m[2m[0m 
│   │       [32mcommon-mistakes[0m[2m[0m           [32mquality-assurance[0m[2m[0m         
│   │       [32mmcp-manual-connections[0m[2m[0m    [32mworkflow-checklist[0m[2m[0m        
│   ├── [1;34m  getting-started/[0m [2m(3 files, 12.8KB, all .md)[0m
│   │   └── [32mREADME[0m[2m[0m          [32minstallation[0m[2m[0m    [32mquick-reference[0m[2m[0m 
│   └── [1;34m  project/[0m [2m(12 files, 87.4KB)[0m
│       ├── [1;34m  package-evidence/[0m [2m(4.6KB)[0m
│       │   └── [2m... 1 file[0m
│       └── [32maudit-index.md[0m[2m[0m                                     
│           [32mgithub-actions-security-hardening-2026-08-29.md[0m[2m[0m    
│           [32mplugin-skills-audit-2026-06-14.md[0m[2m[0m                  
│           [32mplugin-skills-third-pass-audit-2026-06-14.md[0m[2m[0m       
│           [32msac-test-automation-source-review-2026-06-17.md[0m[2m[0m    
│           [32msap-browser-automation-source-review-2026-07-14.md[0m[2m[0m 
│           [32msap-bw-query-live-validation-runbook.md[0m[2m[0m            
│           [32msap-bw-query-security-audit-2026-08-05.md[0m[2m[0m          
│           [32msap-bw-query-source-review-2026-07-13.md[0m[2m[0m           
│           [32msap-bw-query-windows-validation-handoff.md[0m[2m[0m         
│           [31msource-verification-ledger.json[0m[2m[0m                    
├── [1;34m  plugins/[0m [2m(1041 files, 8.6MB)[0m
│   ├── [1;34m  sap-abap/[0m [2m(36 files, 237.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1014.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.8KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(165.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-abap/[0m [2m(32 files, 233.2KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-abap-cds/[0m [2m(16 files, 101.5KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(185.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-abap-cds/[0m [2m(12 files, 96.9KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-ai-core/[0m [2m(18 files, 158.2KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(182.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-ai-core/[0m [2m(14 files, 153.1KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-api-policy/[0m [2m(11 files, 66.7KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(189.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-api-policy/[0m [2m(8 files, 62.1KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-api-style/[0m [2m(21 files, 467.9KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 2.8KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-api-style/[0m [2m(16 files, 459.9KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-browser-automation/[0m [2m(15 files, 81.2KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(822.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(205.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-browser-automation/[0m [2m(12 files, 78.7KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-best-practices/[0m [2m(15 files, 134.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(205.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-best-practices/[0m [2m(11 files, 129.2KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-build-work-zone-advanced/[0m [2m(24 files, 104.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.7KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(225.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-build-work-zone-advanced/[0m [2m(20 files, 98.6KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-business-application-studio/[0m [2m(16 files, 100.5KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.8KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(231.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-business-application-studio/[0m [2m(12 files, 94.4KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-cias/[0m [2m(16 files, 114.1KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(185.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-cias/[0m [2m(12 files, 109.3KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-cloud-identity-services/[0m [2m(14 files, 60.3KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.2KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 2.8KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-cloud-identity-services/[0m [2m(9 files, 52.8KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-cloud-logging/[0m [2m(14 files, 86.9KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.2KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.2KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(203.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-cloud-logging/[0m [2m(10 files, 81.9KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-cloud-platform/[0m [2m(21 files, 151.1KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.2KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 2.8KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-cloud-platform/[0m [2m(16 files, 143.3KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-cloud-transport-management/[0m [2m(15 files, 110.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(229.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-cloud-transport-management/[0m [2m(11 files, 105.8KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-connectivity/[0m [2m(25 files, 183.2KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.8KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(201.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-connectivity/[0m [2m(21 files, 178.8KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-developer-guide/[0m [2m(29 files, 191.8KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.7KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(3.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(207.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-developer-guide/[0m [2m(25 files, 185.3KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-integration-suite/[0m [2m(31 files, 249.3KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 2.8KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-integration-suite/[0m [2m(26 files, 241.9KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-intelligent-situation-automation/[0m [2m(13 files, 74.8KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(241.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-intelligent-situation-automation/[0m [2m(9 files, 68.7KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-job-scheduling/[0m [2m(17 files, 118.4KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(205.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-job-scheduling/[0m [2m(13 files, 112.9KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-btp-master-data-integration/[0m [2m(16 files, 103.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(223.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-master-data-integration/[0m [2m(12 files, 98.8KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-btp-service-manager/[0m [2m(19 files, 129.4KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.7KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(207.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-btp-service-manager/[0m [2m(15 files, 123.6KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-bw-query/[0m [2m(67 files, 491.2KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1021.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(185.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  bundle/[0m [2m(4 files, 21.7KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  commands/[0m [2m(5 files, 9.3KB, all .md)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  config/[0m [2m(39.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  eclipse/plugins/com.sap.bw.automation/[0m [2m(19 files, 140.0KB)[0m
│   │   │   └── [2m... 2 directories, 2 files[0m
│   │   ├── [1;34m  mcp/[0m [2m(17 files, 192.3KB)[0m
│   │   │   └── [2m... 1 directory, 3 files[0m
│   │   ├── [1;34m  scripts/[0m [2m(2 files, 31.7KB, all .ps1)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  skills/sap-bw-query/[0m [2m(15 files, 93.2KB, all .md)[0m
│   │   │   └── [2m... 2 directories, 2 files[0m
│   │   └── [31m.mcp.json[0m[2m[0m 
│   ├── [1;34m  sap-cap-capire/[0m [2m(52 files, 386.3KB, all .json)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(5 files, 46.7KB)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  commands/[0m [2m(5 files, 25.7KB, all .md)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.6KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  lsp/[0m [2m(1016.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  skills/sap-cap-capire/[0m [2m(33 files, 264.6KB, all .md)[0m
│   │   │   └── [2m... 3 directories, 2 files[0m
│   │   └── [31m.lsp[0m[2m[0m [31m.mcp[0m[2m[0m 
│   ├── [1;34m  sap-cloud-sdk-ai/[0m [2m(16 files, 143.0KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.8KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(193.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-cloud-sdk-ai/[0m [2m(12 files, 138.4KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-cloud-sdk-ai-python/[0m [2m(12 files, 68.8KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(207.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-cloud-sdk-ai-python/[0m [2m(8 files, 64.3KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-datasphere/[0m [2m(37 files, 447.3KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(4 files, 23.2KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  commands/[0m [2m(5 files, 55.8KB, all .md)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.6KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  skills/sap-datasphere/[0m [2m(21 files, 319.9KB, all .md)[0m
│   │   │   └── [2m... 2 directories, 2 files[0m
│   │   └── [31m.mcp.json[0m[2m[0m 
│   ├── [1;34m  sap-dependency-security/[0m [2m(38 files, 121.3KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(995.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.7KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(206.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  hooks/[0m [2m(3 files, 10.9KB)[0m
│   │   │   └── [2m... 3 files[0m
│   │   └── [1;34m  skills/sap-dependency-security/[0m [2m(31 files, 106.1KB, all .md)[0m
│   │       └── [2m... 4 directories, 2 files[0m
│   ├── [1;34m  sap-fiori-tools/[0m [2m(17 files, 108.0KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 2.8KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(2 files, 2.7KB, all .md)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  skills/sap-fiori-tools/[0m [2m(10 files, 98.7KB, all .md)[0m
│   │   │   └── [2m... 2 directories, 2 files[0m
│   │   └── [31m.mcp.json[0m[2m[0m 
│   ├── [1;34m  sap-hana-cli/[0m [2m(24 files, 100.9KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.2KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 2.6KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(2 files, 2.6KB, all .md)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  skills/sap-hana-cli/[0m [2m(17 files, 92.1KB, all .md)[0m
│   │   │   └── [2m... 3 directories, 2 files[0m
│   │   └── [31m.mcp.json[0m[2m[0m 
│   ├── [1;34m  sap-hana-cloud-data-intelligence/[0m [2m(22 files, 159.1KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(225.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-hana-cloud-data-intelligence/[0m [2m(18 files, 154.4KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-hana-ml/[0m [2m(12 files, 85.8KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(183.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(1.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-hana-ml/[0m [2m(8 files, 81.4KB, all .md)[0m
│   │       └── [2m... 2 directories, 2 files[0m
│   ├── [1;34m  sap-rpt1/[0m [2m(17 files, 62.0KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(797.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(177.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(2 files, 4.1KB, all .md)[0m
│   │   │   └── [2m... 2 files[0m
│   │   └── [1;34m  skills/sap-rpt1/[0m [2m(12 files, 55.5KB, all .md)[0m
│   │       └── [2m... 4 directories, 2 files[0m
│   ├── [1;34m  sap-sac-custom-widget/[0m [2m(49 files, 551.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(4 files, 23.7KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  commands/[0m [2m(3 files, 40.7KB, all .md)[0m
│   │   │   └── [2m... 3 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.6KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   └── [1;34m  skills/sap-sac-custom-widget/[0m [2m(36 files, 439.4KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-sac-planning/[0m [2m(45 files, 350.1KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.0KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(4 files, 19.6KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  commands/[0m [2m(3 files, 20.8KB, all .md)[0m
│   │   │   └── [2m... 3 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.7KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   └── [1;34m  skills/sap-sac-planning/[0m [2m(32 files, 261.7KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-sac-scripting/[0m [2m(87 files, 1.3MB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.7KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(5 files, 29.2KB)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  commands/[0m [2m(4 files, 33.6KB, all .md)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.6KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  skills/sap-sac-scripting/[0m [2m(71 files, 1.2MB, all .md)[0m
│   │   │   └── [2m... 3 directories, 2 files[0m
│   │   └── [31m.mcp.json[0m[2m[0m 
│   ├── [1;34m  sap-sac-test-automation/[0m [2m(20 files, 89.3KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(2 files, 4.8KB)[0m
│   │   │   └── [2m... 2 files[0m
│   │   ├── [1;34m  commands/[0m [2m(6.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-sac-test-automation/[0m [2m(15 files, 74.1KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sap-sqlscript/[0m [2m(37 files, 299.5KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.5KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.3KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(4 files, 17.4KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  commands/[0m [2m(4 files, 21.5KB, all .md)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.3KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  scripts/[0m [2m(3.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [1;34m  skills/sap-sqlscript/[0m [2m(22 files, 208.9KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   ├── [1;34m  sapui5/[0m [2m(41 files, 495.6KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.6KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(2.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(5 files, 96.4KB)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  commands/[0m [2m(5 files, 36.6KB, all .md)[0m
│   │   │   └── [2m... 5 files[0m
│   │   ├── [1;34m  hooks/[0m [2m(4 files, 44.8KB)[0m
│   │   │   └── [2m... 4 files[0m
│   │   ├── [1;34m  skills/sapui5/[0m [2m(23 files, 311.1KB, all .md)[0m
│   │   │   └── [2m... 3 directories, 2 files[0m
│   │   ├── [1;34m  templates/[0m [2m(2.4KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   └── [31m.mcp.json[0m[2m[0m 
│   ├── [1;34m  sapui5-cli/[0m [2m(25 files, 250.4KB)[0m
│   │   ├── [1;34m  .claude-plugin/[0m [2m(1.1KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  .codex-plugin/[0m [2m(1.9KB)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  agents/[0m [2m(181.0B)[0m
│   │   │   └── [2m... 1 file[0m
│   │   ├── [1;34m  commands/[0m [2m(2 files, 2.5KB, all .md)[0m
│   │   │   └── [2m... 2 files[0m
│   │   └── [1;34m  skills/sapui5-cli/[0m [2m(20 files, 244.7KB, all .md)[0m
│   │       └── [2m... 3 directories, 2 files[0m
│   └── [1;34m  sapui5-linter/[0m [2m(21 files, 140.4KB)[0m
│       ├── [1;34m  .claude-plugin/[0m [2m(1.0KB)[0m
│       │   └── [2m... 1 file[0m
│       ├── [1;34m  .codex-plugin/[0m [2m(1.8KB)[0m
│       │   └── [2m... 1 file[0m
│       ├── [1;34m  agents/[0m [2m(187.0B)[0m
│       │   └── [2m... 1 file[0m
│       ├── [1;34m  commands/[0m [2m(2 files, 2.4KB, all .md)[0m
│       │   └── [2m... 2 files[0m
│       └── [1;34m  skills/sapui5-linter/[0m [2m(16 files, 134.9KB, all .md)[0m
│           └── [2m... 3 directories, 2 files[0m
├── [1;34m  schemas/[0m [2m(4 files, 14.8KB, all .json)[0m
│   └── [31mcodex-marketplace.schema[0m[2m[0m [31mmarketplace.schema[0m[2m[0m       
│       [31mcodex-plugin.schema[0m[2m[0m      [31mplugin.schema[0m[2m[0m            
├── [1;34m  scripts/[0m [2m(32 files, 212.0KB)[0m
│   ├── [1;34m  lib/[0m [2m(2 files, 5.1KB)[0m
│   │   └── [1;37mcategorize.sh[0m[2m[0m        [33mvalidation-utils.mjs[0m[2m[0m 
│   └── [33maudit-effectiveness.mjs[0m[2m[0m                
│       [33maudit-mcp-freshness.mjs[0m[2m[0m                
│       [33mgenerate-codex-layer.mjs[0m[2m[0m               
│       [1;37mgenerate-marketplace.sh[0m[2m[0m                
│       [1;37mgenerate-plugin-manifests.sh[0m[2m[0m           
│       [33msmoke-local-fixtures.mjs[0m[2m[0m               
│       [1;37msync-plugins.sh[0m[2m[0m                        
│       [33mtest-hook-contracts.mjs[0m[2m[0m                
│       [33mtest-hooks.mjs[0m[2m[0m                         
│       [33mtest-lsp-launcher.mjs[0m[2m[0m                  
│       [33mvalidate-agent-contracts.mjs[0m[2m[0m           
│       [33mvalidate-bundled-resources.mjs[0m[2m[0m         
│       [33mvalidate-codex-layer.mjs[0m[2m[0m               
│       [33mvalidate-command-agent-frontmatter.mjs[0m[2m[0m 
│       [33mvalidate-command-contracts.mjs[0m[2m[0m         
│       [1;37mvalidate-frontmatter.sh[0m[2m[0m                
│       [33mvalidate-harness-portability.mjs[0m[2m[0m       
│       [1;37mvalidate-inventory.sh[0m[2m[0m                  
│       [1;37mvalidate-json-schemas.sh[0m[2m[0m               
│       [33mvalidate-manifest-drift.mjs[0m[2m[0m            
│       [33mvalidate-mcp-env-contracts.mjs[0m[2m[0m         
│       [33mvalidate-mcp-security.mjs[0m[2m[0m              
│       [33mvalidate-oracle-browser-safety.mjs[0m[2m[0m     
│       [33mvalidate-packaging-hygiene.mjs[0m[2m[0m         
│       [33mvalidate-public-claims.mjs[0m[2m[0m             
│       [33mvalidate-reference-provenance.mjs[0m[2m[0m      
│       [1;37mvalidate-reserved-words.sh[0m[2m[0m             
│       [33mvalidate-skill-quality.mjs[0m[2m[0m             
│       [33mvalidate-templates.mjs[0m[2m[0m                 
│       [33mvalidate-verification-ledger.mjs[0m[2m[0m       
├── [1;34m  tests/[0m [2m(64 files, 175.3KB)[0m
│   ├── [1;34m  fixtures/[0m [2m(42 files, 11.4KB)[0m
│   │   ├── [1;34m  cap-local/[0m [2m(3 files, 596.0B)[0m
│   │   │   └── [2m... 2 directories, 1 file[0m
│   │   ├── [1;34m  hooks/[0m [2m(33 files, 9.5KB)[0m
│   │   │   └── [2m... 8 directories[0m
│   │   └── [1;34m  ui5-local/[0m [2m(6 files, 1.3KB)[0m
│   │       └── [2m... 1 directory, 2 files[0m
│   ├── [1;34m  sap-bw-query/[0m [2m(21 files, 160.6KB)[0m
│   │   └── [33mapi-map-contract.test.mjs[0m[2m[0m             
│   │       [33mbridge-runtime.test.mjs[0m[2m[0m               
│   │       [33mbundle-build.test.mjs[0m[2m[0m                 
│   │       [33mconnection-runtime.test.mjs[0m[2m[0m           
│   │       [33mdeployer-contract.test.mjs[0m[2m[0m            
│   │       [33meclipse-plugin.test.mjs[0m[2m[0m               
│   │       [33mhandler-runtime.test.mjs[0m[2m[0m              
│   │       [33mmarketplace-generator.test.mjs[0m[2m[0m        
│   │       [33mmcp-package.test.mjs[0m[2m[0m                  
│   │       [33mmetadata-validation.test.mjs[0m[2m[0m          
│   │       [33mmodel-read-verify.test.mjs[0m[2m[0m            
│   │       [33mprovenance.test.mjs[0m[2m[0m                   
│   │       [33mquery-rules.test.mjs[0m[2m[0m                  
│   │       [33mquery-runtime.test.mjs[0m[2m[0m                
│   │       [33mquery-templates.test.mjs[0m[2m[0m              
│   │       [33msecret-guard.test.mjs[0m[2m[0m                 
│   │       [33mskill-contract.test.mjs[0m[2m[0m               
│   │       [31mskill-scenarios.json[0m[2m[0m                  
│   │       [33mtool-registry.test.mjs[0m[2m[0m                
│   │       [33muntrusted-content.test.mjs[0m[2m[0m            
│   │       [33mwindows-validator-regression.test.mjs[0m[2m[0m 
│   └── [33mcodex-layer.test.mjs[0m[2m[0m 
└── [2;37m.gitignore[0m[2m[0m             [32mCLAUDE.md[0m[2m[0m              [37mbun.lock[0m[2m[0m               
    [31m.mcp.json[0m[2m[0m              [37mLICENSE[0m[2m[0m                [31mopencode.json[0m[2m[0m          
    [32mAGENTS.md[0m[2m[0m              [32mREADME.md[0m[2m[0m              [31mpackage.json[0m[2m[0m           
    [32mCHANGELOG.md[0m[2m[0m           [32mTHIRD-PARTY-NOTICES.md[0m[2m[0m 
