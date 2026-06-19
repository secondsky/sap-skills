#!/usr/bin/env python3
"""Read-only FI/CO CSV inspection helper for SAP-RPT-1-OSS experiments.

The script reports schema shape, candidate semantic renames, target task hints,
and common target leakage risks. It never modifies the input CSV and only writes
a JSON report when --output is explicitly provided without --dry-run.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path
from typing import Any


SAP_FIELD_MAP = {
    "ACDOCA": "UNIVERSAL_JOURNAL_SOURCE",
    "RBUKRS": "COMPANY_CODE",
    "BUKRS": "COMPANY_CODE",
    "GJAHR": "FISCAL_YEAR",
    "BELNR": "DOCUMENT_NUMBER",
    "BUZEI": "LINE_ITEM",
    "DOCLN": "DOCUMENT_LINE",
    "RACCT": "GL_ACCOUNT",
    "HKONT": "GL_ACCOUNT",
    "BLART": "DOCUMENT_TYPE",
    "BUDAT": "POSTING_DATE",
    "BLDAT": "DOCUMENT_DATE",
    "CPUDT": "ENTRY_DATE",
    "CPUTM": "ENTRY_TIME",
    "USNAM": "USER_NAME",
    "DMBTR": "AMOUNT_LOCAL_CURRENCY",
    "WRBTR": "AMOUNT_DOCUMENT_CURRENCY",
    "HSL": "AMOUNT_LOCAL_CURRENCY",
    "TSL": "AMOUNT_TRANSACTION_CURRENCY",
    "WAERS": "DOCUMENT_CURRENCY",
    "RHCUR": "LOCAL_CURRENCY",
    "KUNNR": "CUSTOMER_ID",
    "LIFNR": "VENDOR_ID",
    "ZFBDT": "BASELINE_DATE",
    "ZBD1T": "PAYMENT_TERMS_DAYS",
    "ZBD2T": "SECOND_DISCOUNT_DAYS",
    "ZBD3T": "NET_PAYMENT_DAYS",
    "ZLSCH": "PAYMENT_METHOD",
    "ZLSPR": "PAYMENT_BLOCK",
    "AUGDT": "CLEARING_DATE",
    "AUGBL": "CLEARING_DOCUMENT",
    "SKFBT": "DISCOUNT_BASE_AMOUNT",
    "SKNTO": "CASH_DISCOUNT_AMOUNT",
    "SGTXT": "ITEM_TEXT",
    "RCNTR": "COST_CENTER",
    "KOSTL": "COST_CENTER",
    "AUFNR": "INTERNAL_ORDER",
    "PRCTR": "PROFIT_CENTER",
    "PS_PSP_PNR": "WBS_ELEMENT",
}


LEAKAGE_PATTERNS = [
    (re.compile(r"(clearing|augdt|augbl)", re.I), "clearing outcome may be known only after payment"),
    (re.compile(r"(payment_run|payrun|proposal_result)", re.I), "payment run result can be a downstream decision"),
    (re.compile(r"(final|actual_payment|paid_date|payment_date)", re.I), "final payment fields can leak the target"),
    (re.compile(r"(dunning|collection|write_off|writeoff)", re.I), "collections outcomes may occur after the prediction point"),
    (re.compile(r"(dispute_resolution|resolved|resolution)", re.I), "dispute resolution can occur after the prediction point"),
    (re.compile(r"(reversal|audit_decision|review_result)", re.I), "audit or reversal outcomes may be downstream labels"),
]


SENSITIVE_PATTERNS = [
    re.compile(r"(iban|bank|account_number|swift|bic)", re.I),
    re.compile(r"(email|phone|address|name)", re.I),
    re.compile(r"(text|sgtxt|reference|xref|assignment)", re.I),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Inspect an FI/CO CSV for SAP-RPT-1-OSS prototype readiness.",
    )
    parser.add_argument("--input", required=True, help="Path to the local CSV file to inspect.")
    parser.add_argument("--target", help="Target column for classification or regression.")
    parser.add_argument(
        "--task",
        choices=["classification", "regression", "auto"],
        default="auto",
        help="Prediction task type. Default: auto.",
    )
    parser.add_argument("--as-of-column", help="Column that defines the prediction point.")
    parser.add_argument("--output", help="Optional JSON report path. Never written in --dry-run mode.")
    parser.add_argument("--stdout", action="store_true", help="Print the JSON report to stdout.")
    parser.add_argument("--dry-run", action="store_true", help="Inspect and report without writing files.")
    parser.add_argument("--encoding", default="utf-8-sig", help="CSV encoding. Default: utf-8-sig.")
    parser.add_argument("--delimiter", default=",", help="CSV delimiter. Default: comma.")
    parser.add_argument("--overwrite", action="store_true", help="Allow --output to replace an existing report.")
    parser.add_argument(
        "--sample-size",
        type=int,
        default=500,
        help="Maximum rows to scan for schema statistics. Default: 500.",
    )
    return parser.parse_args()


def safe_path(value: str) -> Path:
    path = Path(value).expanduser()
    if not path.exists():
        raise SystemExit(f"Input file not found: {path}")
    if not path.is_file():
        raise SystemExit(f"Input path is not a file: {path}")
    return path


def same_path(left: Path, right: Path) -> bool:
    try:
        return left.resolve(strict=False) == right.resolve(strict=False)
    except OSError:
        return left.absolute() == right.absolute()


def prepare_output_path(value: str, input_path: Path, overwrite: bool) -> Path:
    output_path = Path(value).expanduser()
    if same_path(output_path, input_path):
        raise SystemExit("Output path must not be the input CSV path.")
    if output_path.exists() and not overwrite:
        raise SystemExit(f"Output file already exists: {output_path}. Use --overwrite to replace it.")
    parent = output_path.parent
    if not parent.exists():
        raise SystemExit(f"Output directory does not exist: {parent}")
    if not parent.is_dir():
        raise SystemExit(f"Output parent is not a directory: {parent}")
    return output_path


def normalize_column(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9]+", "_", name.strip()).strip("_").upper()


def looks_numeric(values: list[str]) -> bool:
    non_empty = [value for value in values if value != ""]
    if not non_empty:
        return False
    numeric_count = 0
    for value in non_empty:
        try:
            float(value)
            numeric_count += 1
        except ValueError:
            pass
    return numeric_count / len(non_empty) >= 0.9


def inspect_csv(path: Path, sample_size: int, encoding: str, delimiter: str) -> tuple[list[str], list[dict[str, str]], int]:
    try:
        with path.open(newline="", encoding=encoding) as handle:
            reader = csv.DictReader(handle, delimiter=delimiter)
            if not reader.fieldnames:
                raise SystemExit("CSV has no header row.")
            rows = []
            for index, row in enumerate(reader):
                if index >= sample_size:
                    break
                rows.append(row)
    except UnicodeError as error:
        raise SystemExit(f"Could not decode CSV with encoding {encoding}: {error}") from error
    except csv.Error as error:
        raise SystemExit(f"Could not parse CSV: {error}") from error
    return list(reader.fieldnames), rows, len(rows)


def column_report(columns: list[str], rows: list[dict[str, str]], target: str | None) -> list[dict[str, Any]]:
    report = []
    for column in columns:
        values = [(row.get(column) or "").strip() for row in rows]
        unique_limited = len(set(values[:500]))
        normalized = normalize_column(column)
        leakage = [reason for pattern, reason in LEAKAGE_PATTERNS if pattern.search(column)]
        sensitive = any(pattern.search(column) for pattern in SENSITIVE_PATTERNS)
        report.append(
            {
                "name": column,
                "semantic_suggestion": SAP_FIELD_MAP.get(normalized),
                "non_empty_count": sum(1 for value in values if value),
                "empty_count": sum(1 for value in values if not value),
                "unique_count_limited": unique_limited,
                "numeric_like": looks_numeric(values),
                "possible_sensitive": sensitive,
                "leakage_risk": [] if column == target else leakage,
            },
        )
    return report


def infer_task(columns: list[dict[str, Any]], target: str | None, requested_task: str) -> str:
    if requested_task != "auto":
        return requested_task
    if not target:
        return "unknown"
    target_info = next((column for column in columns if column["name"] == target), None)
    if not target_info:
        return "unknown"
    if target_info["numeric_like"] and target_info["unique_count_limited"] > 20:
        return "regression"
    return "classification"


def candidate_use_case(columns: list[str]) -> str:
    normalized = {normalize_column(column) for column in columns}
    if {"CUSTOMER_ID", "KUNNR"} & normalized or {"PAID_LATE", "DEFAULT_FLAG", "DAYS_LATE"} & normalized:
        return "FI-AR payment default / late payment"
    if {"VENDOR_ID", "LIFNR"} & normalized or {"DISCOUNT_LOST", "DISCOUNT_AMOUNT_LOST"} & normalized:
        return "FI-AP cash discount leakage / payment timing"
    if {"GL_ACCOUNT", "RACCT", "HKONT"} & normalized or {"OUTLIER_FLAG", "MANUAL_REVIEW_FLAG"} & normalized:
        return "FI-GL journal anomaly"
    return "unknown"


def build_report(args: argparse.Namespace, input_path: Path) -> dict[str, Any]:
    if len(args.delimiter) != 1:
        raise SystemExit("--delimiter must be exactly one character.")
    columns, rows, sampled_rows = inspect_csv(input_path, max(args.sample_size, 1), args.encoding, args.delimiter)
    if args.target and args.target not in columns:
        raise SystemExit(f"Target column not found: {args.target}")
    if args.as_of_column and args.as_of_column not in columns:
        raise SystemExit(f"As-of column not found: {args.as_of_column}")

    columns_info = column_report(columns, rows, args.target)
    leakage_columns = [
        {"name": item["name"], "reasons": item["leakage_risk"]}
        for item in columns_info
        if item["leakage_risk"]
    ]
    sensitive_columns = [item["name"] for item in columns_info if item["possible_sensitive"]]

    return {
        "input_file": str(input_path),
        "rows_scanned": sampled_rows,
        "column_count": len(columns),
        "target": args.target,
        "task": infer_task(columns_info, args.target, args.task),
        "as_of_column": args.as_of_column,
        "encoding": args.encoding,
        "delimiter": args.delimiter,
        "candidate_use_case": candidate_use_case(columns),
        "leakage_columns": leakage_columns,
        "possible_sensitive_columns": sensitive_columns,
        "columns": columns_info,
        "notes": [
            "No input data was modified.",
            "Review all leakage findings with the prediction point before inference.",
            "Mask personal, bank, payment reference, and free-text fields before using real FI/CO data.",
            "If only one column appears, rerun with the export delimiter, such as --delimiter ';'.",
        ],
    }


def print_human(report: dict[str, Any]) -> None:
    print("SAP-RPT-1-OSS FI/CO data preparation report")
    print(f"Input: {report['input_file']}")
    print(f"Rows scanned: {report['rows_scanned']}")
    print(f"Columns: {report['column_count']}")
    print(f"Target: {report['target'] or 'not provided'}")
    print(f"Task hint: {report['task']}")
    print(f"Candidate use case: {report['candidate_use_case']}")
    print(f"As-of column: {report['as_of_column'] or 'not provided'}")
    print(f"Encoding: {report['encoding']}")
    print(f"Delimiter: {report['delimiter']}")
    print("")
    print("Potential leakage columns:")
    if report["leakage_columns"]:
        for item in report["leakage_columns"]:
            print(f"- {item['name']}: {'; '.join(item['reasons'])}")
    else:
        print("- none flagged by column-name heuristics")
    print("")
    print("Possible sensitive columns:")
    if report["possible_sensitive_columns"]:
        for name in report["possible_sensitive_columns"]:
            print(f"- {name}")
    else:
        print("- none flagged by column-name heuristics")
    print("")
    print("Semantic rename suggestions:")
    suggestions = [item for item in report["columns"] if item["semantic_suggestion"]]
    if suggestions:
        for item in suggestions:
            print(f"- {item['name']} -> {item['semantic_suggestion']}")
    else:
        print("- none")


def main() -> int:
    args = parse_args()
    input_path = safe_path(args.input)
    output_path = None
    if args.output and not args.dry_run:
        output_path = prepare_output_path(args.output, input_path, args.overwrite)

    report = build_report(args, input_path)
    if args.stdout:
        print(json.dumps(report, indent=2, sort_keys=True))
    else:
        print_human(report)

    if args.output:
        if args.dry_run:
            print(f"Dry run: no report written to {args.output}")
        else:
            if output_path is None:
                raise SystemExit("Internal error: output path was not prepared.")
            try:
                output_path.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
            except OSError as error:
                raise SystemExit(f"Could not write report: {error}") from error
            print(f"Report written to {output_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
