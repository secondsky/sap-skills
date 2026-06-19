# Third-Party Attribution

## Sources

Derived attribution notes for the `sap-rpt1` skill.

## Upstream Community Skill

This skill is inspired by:

- `amitlals/sap-rpt1-oss-predictor`
- Path reviewed: `.github/skills/sap-rpt1-oss-predictor`
- Upstream license: Apache-2.0

## Adaptation Notes

This repository does not copy the upstream skill verbatim.

Material changes include:

- SAP Skills repo-compatible GPL-3.0 frontmatter.
- Source-verified SAP-RPT-1-OSS setup notes.
- Removal of unverified hosted API client behavior.
- No automatic dependency installation.
- No automatic Hugging Face login or model download.
- FI/CO-first use-case matrix.
- Target leakage and governance checklist.
- Synthetic-only sample CSVs.
- Read-only command contracts.

## Bundled Apache License Text

No upstream Apache-2.0 code or prose is copied verbatim in the initial `sap-rpt1` implementation. If future changes copy or adapt upstream Apache-2.0 code or prose, include the Apache-2.0 license text under the skill assets directory, for example with the filename `upstream-apache-2.0-license.txt`.

Do not place third-party license files at the skill root.
