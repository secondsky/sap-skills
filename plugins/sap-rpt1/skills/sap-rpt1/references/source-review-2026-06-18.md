# Source Review: SAP-RPT-1-OSS Predictor

**Review date:** 2026-06-18
**Plugin:** `sap-rpt1`
**Evidence type:** public source/model/product-page review
**Live tenant/system validation:** Not performed
**Local model execution validation:** Not performed

## Sources

| Source | Role | Notes |
|--------|------|-------|
| `https://github.com/SAP-samples/sap-rpt-1-oss` | Primary SAP source repository | Use for installation, local model workflow, requirements, examples, license notes, and issue tracking. |
| `https://huggingface.co/SAP/sap-rpt-1-oss` | Primary model source | Use for model access, model-card context, library usage, and license/access notes. |
| `https://www.sap.com/products/artificial-intelligence/sap-rpt.html` | SAP product context | Use only for product positioning, hosted playground URL, and future SAP-RPT-1.5 context. |
| `https://github.com/amitlals/sap-rpt1-oss-predictor/tree/main/.github/skills/sap-rpt1-oss-predictor` | Secondary implementation inspiration | Do not treat as primary SAP evidence. Attribute copied or adapted content. |

## Scope Covered

This review covers public source, public model card, public product-page, and upstream community skill review for a local SAP-RPT-1-OSS FI/CO prototype skill.

## Scope Excluded

This review does not cover:

- Live SAP tenant validation.
- Live SAP system validation.
- Production finance workflow validation.
- SAP AI Core deployment validation.
- Hosted SAP-RPT API validation.
- Local model inference benchmark validation.
- Commercial/legal approval for model use.
- Customer-specific FI/CO table mappings.
- Customer-specific S/4HANA or ECC release behavior.

## Source Findings

- SAP-samples `sap-rpt-1-oss` describes SAP-RPT-1-OSS as the implementation of the inference pipeline from the ConTextTab paper.
- The repository states Python 3.11 requirements and installation from source with `pip install git+https://github.com/SAP-samples/sap-rpt-1-oss`.
- The repository states model checkpoints are downloaded from Hugging Face and require Hugging Face login.
- The repository supports classification and regression through `SAP_RPT_OSS_Classifier` and `SAP_RPT_OSS_Regressor`.
- The repository presents GPU guidance as upstream guidance: 80 GB memory, context size 8192, and bagging 8 for best performance; smaller context and bagging 1 for lighter use.
- The repository license is Apache-2.0 except as noted in the repository license files.
- The SAP product page states the SAP RPT playground is available at `https://rpt.cloud.sap` and states SAP-RPT-1.5 commercial availability/productization context. Treat SAP-RPT-1.5 as future/H2 2026 context for this skill.

## Product Distinction

- SAP-RPT-1-OSS: local open model workflow to document in this skill.
- Hosted SAP-RPT-1 playground: product context only; do not bundle a hosted client.
- SAP-RPT-1.5: future/H2 2026 context from this review; do not describe as currently available in this skill.

## Upstream Open Issues

Reviewed from `https://github.com/SAP-samples/sap-rpt-1-oss/issues` on 2026-06-18.

| Issue | Title | Status as reviewed | Skill handling |
|-------|-------|--------------------|----------------|
| #29 | `predict() returns all-NaN when X is a DataFrame and y is a numpy array` | Open | Prefer consistent pandas inputs in examples without representing this workaround as a complete upstream resolution. |
| #27 | `Single-sample prediction fails with ValueError: zero-dimensional arrays cannot be concatenated` | Open | The bundled wrapper blocks single-row scoring by default unless `--allow-single-row` is explicit. |
| #26 | `Training code availability?` | Open | Describe this skill as inference workflow guidance, not model training guidance. |
| #25 | `SAP_RPT_OSS_Classifier fails to recognize Pandas Int64Dtype` | Open | Normalize nullable integer columns before local inference when needed. |
| #9 | `SAP BTP AI Core deployment?` | Open | Route deployment questions to `sap-ai-core`; do not document deployment as validated here. |

Status: upstream open as of 2026-06-18. Workarounds are unverified in this repository unless separately documented.

## License and Attribution Notes

- The SAP Skills plugin frontmatter must use `GPL-3.0`.
- SAP-samples `sap-rpt-1-oss` source repository is Apache-2.0 except as noted in that repository.
- The upstream community skill is Apache-2.0.
- This plugin does not imply SAP-RPT-1-OSS model weights are covered by the SAP Skills repository license.
- If future changes copy or adapt upstream Apache-2.0 code or prose, preserve attribution in `references/third-party-attribution.md` and bundle the Apache-2.0 license text under `assets/` or `references/`, not at the skill root.
