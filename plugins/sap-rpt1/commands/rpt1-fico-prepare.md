---
name: rpt1-fico-prepare
description: Inspect a local FI/CO CSV for SAP-RPT-1-OSS preparation risks and print dry-run guidance without modifying files or running inference.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
argument-hint: "[csv-path] [target-column]"
---

## Output Contract

Return a read-only FI/CO dataset preparation review. Include likely task type, semantic column rename suggestions, leakage risks, governance reminders, and an explicit user-run dry-run command for `scripts/fico_data_prep.py`.

Default to read-only behavior. Do not write files, install packages, authenticate, download model weights, call hosted APIs, or run local inference.

# RPT1 FI/CO Prepare Command

Inspect the provided local CSV path and target column if present. If no path is provided, ask for the missing path and target column in prose.

Report:

- The intended FI/CO use case if it can be inferred from the file name or columns.
- The target column and likely task type.
- Obvious target leakage risks by column name.
- Possible sensitive fields that should be masked before real data use.
- Semantic SAP field rename suggestions.
- The exact dry-run command the user can run, using the Python 3.11 executable available in their environment:

```bash
<python-3.11> plugins/sap-rpt1/skills/sap-rpt1/scripts/fico_data_prep.py --dry-run --input "<csv-path>" --target <target-column>
```

Use examples such as `py -3.11` or `.venv\Scripts\python.exe` on Windows, and `python3.11` or `.venv/bin/python` on macOS/Linux. Add `--encoding <encoding>` or `--delimiter ';'` when the CSV export requires it.

Safety constraints:

- Do not modify the input CSV.
- Do not write a transformed dataset.
- Do not overwrite an input file or an existing report.
- Do not print row-level sensitive values.
- Do not call `rpt.cloud.sap` or any hosted endpoint.
- Do not run `huggingface-cli login`.
- Do not install Python dependencies.
- Do not download SAP-RPT-1-OSS model artifacts.
