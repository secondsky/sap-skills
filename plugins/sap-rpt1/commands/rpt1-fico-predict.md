---
name: rpt1-fico-predict
description: Explain local SAP-RPT-1-OSS inference prerequisites for FI/CO CSV experiments and print explicit user-run commands without executing inference.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
argument-hint: "[csv-path|train/test paths] [target-column]"
---

## Output Contract

Return read-only local inference guidance for SAP-RPT-1-OSS. Include prerequisites, privacy/license warnings, target leakage reminders, and explicit dry-run and opt-in run commands for `scripts/rpt1_oss_predict.py`.

Default to read-only behavior. Do not run inference, write predictions, install dependencies, authenticate, download model weights, or call hosted APIs.

# RPT1 FI/CO Predict Command

Explain the local SAP-RPT-1-OSS workflow for the supplied FI/CO CSV path and target column.

Include:

- Python 3.11 requirement.
- Manual dependency install command to run only inside an approved user-writable Python 3.11 environment.
- Manual Hugging Face login/model access reminder.
- GPU and context-size guidance as upstream guidance, not repository-tested fact.
- Target leakage and governance warning.
- Windows/macOS/Linux interpreter guidance: use `py -3.11` or `.venv\Scripts\python.exe` on Windows, and `python3.11` or `.venv/bin/python` on macOS/Linux.
- Encoding and delimiter reminders for enterprise exports, such as `--encoding cp1252` or `--delimiter ';'`.
- A warning that single-row scoring is blocked by default in the wrapper because of upstream issue #27 unless the user explicitly accepts `--allow-single-row`.
- Dry-run command:

```bash
<python-3.11> plugins/sap-rpt1/skills/sap-rpt1/scripts/rpt1_oss_predict.py --dry-run --input "<csv-path>" --target <target-column>
```

- Opt-in local inference command shape:

```bash
<python-3.11> plugins/sap-rpt1/skills/sap-rpt1/scripts/rpt1_oss_predict.py --run --input "<csv-path>" --target <target-column> --task classification --output "predictions.csv"
```

Safety constraints:

- Do not run the command for the user.
- Do not install dependencies.
- Do not run `huggingface-cli login`.
- Do not download model files.
- Do not write prediction files.
- Do not overwrite input data or an existing prediction file.
- Do not call `rpt.cloud.sap` or any hosted SAP-RPT endpoint.
