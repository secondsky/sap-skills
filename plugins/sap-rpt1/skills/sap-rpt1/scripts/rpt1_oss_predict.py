#!/usr/bin/env python3
"""Opt-in local SAP-RPT-1-OSS inference wrapper for FI/CO CSV experiments.

This script does not install dependencies, authenticate to Hugging Face, call
hosted APIs, or write files unless explicitly requested.
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
from pathlib import Path
from typing import Any


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run opt-in local SAP-RPT-1-OSS predictions for FI/CO CSV data.",
    )
    parser.add_argument("--input", help="Combined CSV with target labels and optional [PREDICT] rows.")
    parser.add_argument("--train", help="Training CSV with target labels.")
    parser.add_argument("--test", help="Scoring CSV. Target column may be present and will be ignored.")
    parser.add_argument("--target", required=True, help="Target column to predict.")
    parser.add_argument(
        "--task",
        choices=["classification", "regression", "auto"],
        default="auto",
        help="Prediction task type. Default: auto.",
    )
    parser.add_argument("--as-of-column", help="Column that defines the prediction point.")
    parser.add_argument("--output", help="Optional CSV output path. Required for persisted predictions.")
    parser.add_argument("--stdout", action="store_true", help="Write prediction CSV to stdout.")
    parser.add_argument("--dry-run", action="store_true", help="Print prerequisites and planned action only.")
    parser.add_argument("--run", action="store_true", help="Explicitly run local inference.")
    parser.add_argument("--encoding", default="utf-8-sig", help="CSV encoding. Default: utf-8-sig.")
    parser.add_argument("--delimiter", default=",", help="CSV delimiter. Default: comma.")
    parser.add_argument("--overwrite", action="store_true", help="Allow --output to replace an existing file.")
    parser.add_argument(
        "--allow-single-row",
        action="store_true",
        help="Allow scoring one row despite upstream SAP-RPT-1-OSS issue #27.",
    )
    parser.add_argument("--max-context-size", type=int, default=1024, help="SAP-RPT-1-OSS context size.")
    parser.add_argument("--bagging", type=int, default=1, help="SAP-RPT-1-OSS bagging factor.")
    parser.add_argument("--train-ratio", type=float, default=0.8, help="Combined-file train ratio.")
    return parser.parse_args()


def path_exists(value: str | None, label: str) -> Path | None:
    if value is None:
        return None
    path = Path(value).expanduser()
    if not path.exists():
        raise SystemExit(f"{label} file not found: {path}")
    if not path.is_file():
        raise SystemExit(f"{label} path is not a file: {path}")
    return path


def same_path(left: Path, right: Path) -> bool:
    try:
        return left.resolve(strict=False) == right.resolve(strict=False)
    except OSError:
        return left.absolute() == right.absolute()


def safe_exists(path: Path) -> bool:
    try:
        return path.exists()
    except OSError:
        return False


def prepare_output_path(value: str | None, protected_paths: list[Path], overwrite: bool) -> Path | None:
    if value is None:
        return None
    output_path = Path(value).expanduser()
    for protected_path in protected_paths:
        if same_path(output_path, protected_path):
            raise SystemExit(f"Output path must not overwrite input data: {protected_path}")
    if output_path.exists() and not overwrite:
        raise SystemExit(f"Output file already exists: {output_path}. Use --overwrite to replace it.")
    parent = output_path.parent
    if not parent.exists():
        raise SystemExit(f"Output directory does not exist: {parent}")
    if not parent.is_dir():
        raise SystemExit(f"Output parent is not a directory: {parent}")
    return output_path


def read_csv_header(path: Path, encoding: str, delimiter: str) -> list[str]:
    try:
        with path.open(newline="", encoding=encoding) as handle:
            reader = csv.reader(handle, delimiter=delimiter)
            header = next(reader, None)
    except UnicodeError as error:
        raise SystemExit(f"Could not decode CSV with encoding {encoding}: {error}") from error
    except csv.Error as error:
        raise SystemExit(f"Could not parse CSV header: {error}") from error
    if not header:
        raise SystemExit(f"CSV has no header row: {path}")
    return header


def validate_common_args(args: argparse.Namespace, require_dataset: bool) -> list[Path]:
    if len(args.delimiter) != 1:
        raise SystemExit("--delimiter must be exactly one character.")
    if args.max_context_size <= 0:
        raise SystemExit("--max-context-size must be greater than zero.")
    if args.bagging <= 0:
        raise SystemExit("--bagging must be greater than zero.")
    if not 0 < args.train_ratio < 1:
        raise SystemExit("--train-ratio must be greater than 0 and less than 1.")
    if args.input and (args.train or args.test):
        raise SystemExit("Use either --input or the --train/--test pair, not both.")
    if bool(args.train) != bool(args.test):
        raise SystemExit("Use --train and --test together.")
    if require_dataset and not args.input and not (args.train and args.test):
        raise SystemExit("Provide either --input or both --train and --test.")

    paths = []
    for value, label in ((args.input, "Input"), (args.train, "Train"), (args.test, "Test")):
        path = path_exists(value, label)
        if path is not None:
            paths.append(path)
    return paths


def inspect_dry_run_inputs(args: argparse.Namespace) -> list[str]:
    paths = validate_common_args(args, require_dataset=False)
    if not paths:
        return ["Dataset check: no CSV path provided yet."]

    messages = []
    for path in paths:
        header = read_csv_header(path, args.encoding, args.delimiter)
        label = "input"
        if args.train and same_path(path, Path(args.train).expanduser()):
            label = "train"
        elif args.test and same_path(path, Path(args.test).expanduser()):
            label = "test"

        if label != "test" and args.target not in header:
            raise SystemExit(f"Target column not found in {label} CSV: {args.target}")
        if args.as_of_column and args.as_of_column not in header:
            raise SystemExit(f"As-of column not found in {label} CSV: {args.as_of_column}")
        target_note = "target present" if args.target in header else "target not required for scoring CSV"
        messages.append(f"{label.title()} CSV: {path} ({len(header)} columns, {target_note})")
    return messages


def require_python_311_for_run() -> None:
    if sys.version_info[:2] != (3, 11):
        version = ".".join(str(part) for part in sys.version_info[:3])
        raise SystemExit(
            "Actual SAP-RPT-1-OSS inference requires Python 3.11 per upstream guidance. "
            f"Current interpreter: Python {version}. Use a Python 3.11 virtual environment.",
        )


def hf_auth_hint() -> str:
    try:
        home = Path.home()
    except RuntimeError:
        home = None
    token_paths = []
    if home is not None:
        token_paths = [
            home / ".cache" / "huggingface" / "token",
            home / ".huggingface" / "token",
        ]
    has_env = bool(os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN"))
    has_file = any(safe_exists(path) for path in token_paths)
    if has_env or has_file:
        return "Hugging Face token hint: token location detected; token value not displayed."
    return "Hugging Face token hint: no token location detected; run huggingface-cli login manually if needed."


def print_dry_run(args: argparse.Namespace) -> None:
    input_messages = inspect_dry_run_inputs(args)
    print("SAP-RPT-1-OSS local inference dry run")
    print(f"Target: {args.target}")
    print(f"Task: {args.task}")
    print(f"Input: {args.input or 'not provided'}")
    print(f"Train: {args.train or 'not provided'}")
    print(f"Test: {args.test or 'not provided'}")
    print(f"As-of column: {args.as_of_column or 'not provided'}")
    print(f"Encoding: {args.encoding}")
    print(f"Delimiter: {args.delimiter}")
    print(f"Context size: {args.max_context_size}")
    print(f"Bagging: {args.bagging}")
    print(hf_auth_hint())
    print("")
    print("Dataset checks:")
    for message in input_messages:
        print(f"- {message}")
    print("")
    print("Prerequisites:")
    print("- Python 3.11 environment.")
    print("- Manual install inside an approved environment: <python-3.11> -m pip install git+https://github.com/SAP-samples/sap-rpt-1-oss")
    print("- Manual Hugging Face login and model access review for SAP/sap-rpt-1-oss.")
    print("- Approved, masked, time-safe FI/CO data.")
    print("- Explicit --run plus --output or --stdout for actual inference.")
    print("")
    print("No inference was run, no model weights were downloaded by this script, and no file was written.")


def import_runtime_dependencies() -> tuple[Any, Any, Any]:
    try:
        import pandas as pd  # type: ignore
    except ImportError as error:
        raise SystemExit(
            "Missing dependency: pandas. Install dependencies manually in a Python 3.11 environment.",
        ) from error

    try:
        from sap_rpt_oss import SAP_RPT_OSS_Classifier, SAP_RPT_OSS_Regressor  # type: ignore
    except ImportError as error:
        raise SystemExit(
            "Missing dependency: sap_rpt_oss. Install manually with: "
            "<python-3.11> -m pip install git+https://github.com/SAP-samples/sap-rpt-1-oss",
        ) from error

    return pd, SAP_RPT_OSS_Classifier, SAP_RPT_OSS_Regressor


def normalize_nullable_ints(frame: Any) -> Any:
    for column in getattr(frame, "columns", []):
        dtype_name = str(frame[column].dtype)
        if dtype_name == "Int64":
            frame[column] = frame[column].astype("float64")
    return frame


def infer_task(pd: Any, values: Any, requested: str) -> str:
    if requested != "auto":
        return requested
    numeric_values = pd.to_numeric(values, errors="coerce")
    if numeric_values.notna().mean() >= 0.9 and values.nunique(dropna=True) > 20:
        return "regression"
    return "classification"


def load_datasets(pd: Any, args: argparse.Namespace) -> tuple[Any, Any]:
    input_path = path_exists(args.input, "Input")
    train_path = path_exists(args.train, "Train")
    test_path = path_exists(args.test, "Test")

    if train_path and test_path:
        train_df = pd.read_csv(train_path, encoding=args.encoding, sep=args.delimiter)
        test_df = pd.read_csv(test_path, encoding=args.encoding, sep=args.delimiter)
        return train_df, test_df

    if input_path:
        df = pd.read_csv(input_path, encoding=args.encoding, sep=args.delimiter)
        if args.target not in df.columns:
            raise SystemExit(f"Target column not found in input: {args.target}")
        target_text = df[args.target].astype(str)
        predict_mask = target_text.eq("[PREDICT]")
        if predict_mask.any():
            return df.loc[~predict_mask].copy(), df.loc[predict_mask].copy()
        split_index = int(len(df) * args.train_ratio)
        if split_index <= 0 or split_index >= len(df):
            raise SystemExit("Combined input split produced an empty train or test set.")
        return df.iloc[:split_index].copy(), df.iloc[split_index:].copy()

    raise SystemExit("Provide either --input or both --train and --test.")


def run_inference(args: argparse.Namespace) -> int:
    protected_paths = validate_common_args(args, require_dataset=True)
    if not args.output and not args.stdout:
        raise SystemExit("Actual inference requires --output <path> or --stdout.")
    output_path = prepare_output_path(args.output, protected_paths, args.overwrite)
    require_python_311_for_run()
    pd, classifier_cls, regressor_cls = import_runtime_dependencies()
    print(hf_auth_hint(), file=sys.stderr)

    train_df, test_df = load_datasets(pd, args)
    if args.target not in train_df.columns:
        raise SystemExit(f"Target column not found in training data: {args.target}")
    if len(train_df) == 0 or len(test_df) == 0:
        raise SystemExit("Training and scoring datasets must both contain rows.")
    if len(test_df) == 1 and not args.allow_single_row:
        raise SystemExit(
            "Scoring one row is blocked by default because upstream SAP-RPT-1-OSS issue #27 "
            "documents a single-sample prediction failure. Use --allow-single-row only after "
            "reviewing that risk.",
        )
    if args.as_of_column:
        missing = [
            label
            for label, frame in (("training", train_df), ("scoring", test_df))
            if args.as_of_column not in frame.columns
        ]
        if missing:
            raise SystemExit(f"As-of column not found in {', '.join(missing)} data: {args.as_of_column}")

    y_train = train_df[args.target]
    X_train = train_df.drop(columns=[args.target])
    X_test = test_df.drop(columns=[args.target], errors="ignore")
    X_train = normalize_nullable_ints(X_train)
    X_test = normalize_nullable_ints(X_test)
    task = infer_task(pd, y_train, args.task)

    if task == "classification":
        model = classifier_cls(max_context_size=args.max_context_size, bagging=args.bagging)
    else:
        y_train = pd.to_numeric(y_train, errors="coerce")
        if y_train.isna().any():
            raise SystemExit("Regression target contains non-numeric values.")
        model = regressor_cls(max_context_size=args.max_context_size, bagging=args.bagging)

    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    result_df = test_df.copy()
    result_df[f"{args.target}_predicted"] = predictions

    if task == "classification" and hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(X_test)
        result_df[f"{args.target}_confidence"] = [max(row) for row in probabilities]

    if args.stdout:
        result_df.to_csv(sys.stdout, index=False)
    if output_path:
        try:
            result_df.to_csv(output_path, index=False)
        except OSError as error:
            raise SystemExit(f"Could not write predictions: {error}") from error
        print(f"Predictions written to {output_path}", file=sys.stderr)
    return 0


def main() -> int:
    args = parse_args()
    if args.dry_run or not args.run:
        print_dry_run(args)
        return 0
    return run_inference(args)


if __name__ == "__main__":
    sys.exit(main())
