# Enterprise and Cross-Platform Use

## Sources

Derived operational guidance for running the `sap-rpt1` helper scripts in Windows, macOS, Linux, and managed enterprise developer environments. Validate local package, model-access, proxy, data-retention, and endpoint rules with the customer's IT and governance teams before using real FI/CO data.

## Interpreter Selection

Use the Python executable from an approved Python 3.11 environment. Do not assume the command name is identical on every workstation.

Common examples:

| Environment | Interpreter example |
|-------------|---------------------|
| Windows Python launcher | `py -3.11` |
| Windows virtual environment | `.venv\Scripts\python.exe` |
| macOS/Linux Python 3.11 | `python3.11` |
| macOS/Linux virtual environment | `.venv/bin/python` |

Use quotes around paths that may contain spaces, especially on Windows:

```powershell
py -3.11 plugins/sap-rpt1/skills/sap-rpt1/scripts/fico_data_prep.py --dry-run --input "C:\Approved Data\fico_sample.csv" --target paid_late
```

```bash
python3.11 plugins/sap-rpt1/skills/sap-rpt1/scripts/fico_data_prep.py --dry-run --input "/Users/example/Approved Data/fico_sample.csv" --target paid_late
```

## Non-Admin Workstations

- Use a user-writable virtual environment rather than system Python.
- Do not require administrator rights, `sudo`, Homebrew, Chocolatey, global npm, or global pip for normal script use.
- Keep generated reports and predictions in approved user-writable project or scratch folders.
- Use `--stdout` when a persisted output file is not approved.
- Use `--output` only for approved locations. The bundled scripts refuse to overwrite input files and refuse to replace existing output files unless `--overwrite` is explicit.

## Enterprise Network and Model Access

- Treat `pip install git+https://github.com/SAP-samples/sap-rpt-1-oss` as a manual, approval-gated setup step.
- Use internal package mirrors or artifact repositories when direct GitHub access is blocked.
- Treat Hugging Face login and SAP/sap-rpt-1-oss model access as manual, approval-gated setup steps.
- Configure model and package caches to approved user-writable paths when defaults are blocked, for example `HF_HOME`, `HUGGINGFACE_HUB_CACHE`, or `TRANSFORMERS_CACHE`.
- Do not put tokens in command lines, CSV files, reports, shell history, issue comments, or shared notebooks.
- Do not call `rpt.cloud.sap` from this plugin's commands or scripts. Hosted service patterns belong in the related SAP AI skills.

## CSV Export Compatibility

- Default encoding is `utf-8-sig` to handle common UTF-8 CSV files with a byte-order mark.
- Use `--encoding cp1252` or another approved encoding for legacy Windows exports when needed.
- Default delimiter is comma. Use `--delimiter ';'` for semicolon-delimited SAP GUI or regional Excel exports.
- Keep text fields masked or excluded unless the governance owner approves their use.
- Prefer semantic column names over raw SAP technical field names before model experiments.

## Locked-Down Execution Checklist

- Confirm the CSV is local or on an approved encrypted enterprise storage location.
- Confirm the account can read the input path and write to the selected output path.
- Run `fico_data_prep.py --dry-run` first.
- Run `rpt1_oss_predict.py --dry-run` before any `--run` invocation.
- Confirm Python 3.11 before actual SAP-RPT-1-OSS inference.
- Confirm output paths are not shared broadly and are covered by retention/deletion controls.
- Keep a human finance/control owner in the review loop for any score interpretation.
