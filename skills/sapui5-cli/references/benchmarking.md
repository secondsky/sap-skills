# UI5 CLI Benchmarking Guide

**Official Documentation**: https://ui5.github.io/cli/stable/pages/Benchmarking/

This reference provides comprehensive guidance for performance testing and benchmarking UI5 CLI operations using hyperfine.

## Table of Contents

1. [Overview](#overview)
2. [Tool: hyperfine](#tool-hyperfine)
3. [Setup](#setup)
4. [Basic Benchmarking](#basic-benchmarking)
5. [Comparative Benchmarking](#comparative-benchmarking)
6. [Performance Metrics](#performance-metrics)
7. [Optimization Analysis](#optimization-analysis)
8. [System Preparation](#system-preparation)
9. [Best Practices](#best-practices)
10. [Example Workflows](#example-workflows)

---

## Overview

Benchmarking UI5 CLI operations helps measure performance impacts of code changes, configuration adjustments, and optimization efforts.

**Primary Use Cases**:
- Measure build performance improvements
- Compare different UI5 CLI versions
- Evaluate custom task performance
- Identify performance bottlenecks
- Validate optimization efforts

**Recommended Tool**: **hyperfine** - "For benchmarking UI5 CLI we typically make use of the open source tool [hyperfine]"

---

## Tool: hyperfine

### What is hyperfine?

**hyperfine** is a command-line benchmarking tool that:
- Performs statistical warmup
- Runs multiple iterations
- Detects outliers
- Calculates mean, min, max, standard deviation
- Supports comparative benchmarks
- Exports results (JSON, Markdown, CSV)

**Official Site**: https://github.com/sharkdp/hyperfine

---

### Installation

**macOS (Homebrew)**:
```bash
brew install hyperfine
```

**Ubuntu/Debian**:
```bash
# Check https://github.com/sharkdp/hyperfine/releases for latest version
wget https://github.com/sharkdp/hyperfine/releases/download/v1.18.0/hyperfine_1.18.0_amd64.deb
sudo dpkg -i hyperfine_1.18.0_amd64.deb
```

**Arch Linux**:
```bash
pacman -S hyperfine
```

**Windows (Scoop)**:
```bash
scoop install hyperfine
```

**From Source** (Cargo):
```bash
cargo install hyperfine
```

**Verify Installation**:
```bash
hyperfine --version
```

---

## Setup

### Prerequisites

1. **UI5 CLI installed** (globally or locally)
2. **Test project** (e.g., UI5 sample-app)
3. **hyperfine installed**
4. **Stable system** (connected to power, background apps closed)

---

### Prepare Test Project

**Clone Sample App**:
```bash
git clone https://github.com/SAP/openui5-sample-app.git
cd openui5-sample-app
npm install
```

**Verify Build Works**:
```bash
ui5 build --all
```

---

### Link Development Versions (Optional)

For testing UI5 CLI changes:

**Clone and Link UI5 CLI**:
```bash
# Clone repositories
git clone https://github.com/SAP/ui5-cli.git
git clone https://github.com/SAP/ui5-builder.git

# Install and link
cd ui5-cli
npm install
npm link

cd ../ui5-builder
npm install
npm link

# Link in test project
cd ../openui5-sample-app
npm link @ui5/cli
npm link @ui5/builder
```

---

## Basic Benchmarking

### Simple Build Benchmark

**Command**:
```bash
hyperfine 'ui5 build --all'
```

**Output**:
```
Benchmark 1: ui5 build --all
  Time (mean ± σ):      7.234 s ±  0.156 s    [User: 6.8 s, System: 0.4 s]
  Range (min … max):    7.042 s …  7.512 s    10 runs
```

**Metrics Explained**:
- **Mean**: Average execution time (7.234 s)
- **σ (sigma)**: Standard deviation (±0.156 s)
- **Range**: Min to max observed times
- **Runs**: Number of iterations (default: auto)

---

### With Warmup Runs

**Purpose**: Stabilize filesystem cache, JIT compiler

**Command**:
```bash
hyperfine --warmup 3 'ui5 build --all'
```

**Explanation**:
- Runs command 3 times before measurements
- Discards warmup results
- Ensures stable baseline

---

### Custom Run Count

**Command**:
```bash
hyperfine --runs 20 'ui5 build --all'
```

**When to Use**:
- More runs = better statistical accuracy
- Fewer runs = faster benchmarking
- Default: hyperfine auto-determines optimal count

---

### Preparation Command

**Purpose**: Clean build directory before each run

**Command**:
```bash
hyperfine \
  --prepare 'rm -rf dist' \
  'ui5 build --all'
```

**Use Cases**:
- Ensure clean builds
- Reset state between runs
- Simulate real-world scenarios

---

## Comparative Benchmarking

### Compare Two Commands

**Baseline vs Optimized**:
```bash
hyperfine \
  --warmup 2 \
  'ui5 build --all' \
  'ui5 build --all --exclude-task minify'
```

**Output**:
```
Benchmark 1: ui5 build --all
  Time (mean ± σ):      7.234 s ±  0.156 s    [User: 6.8 s, System: 0.4 s]
  Range (min … max):    7.042 s …  7.512 s    10 runs

Benchmark 2: ui5 build --all --exclude-task minify
  Time (mean ± σ):      5.123 s ±  0.102 s    [User: 4.9 s, System: 0.2 s]
  Range (min … max):    4.987 s …  5.301 s    10 runs

Summary
  'ui5 build --all --exclude-task minify' ran
    1.41 ± 0.04 times faster than 'ui5 build --all'
```

**Analysis**: Excluding minification is **41% faster**

---

### Compare Versions

**Before and After Code Change**:
```bash
# Checkout baseline
git checkout main
npm install
hyperfine --warmup 2 --export-json baseline.json 'ui5 build --all'

# Checkout optimized
git checkout feature/optimization
npm install
hyperfine --warmup 2 --export-json optimized.json 'ui5 build --all'

# Compare results
hyperfine --warmup 2 \
  --command-name "baseline" './node_modules/.bin/ui5 build --all' \
  --command-name "optimized" './node_modules/.bin/ui5 build --all'
```

---

### Parameter Sweep

**Test Different Options**:
```bash
hyperfine \
  --parameter-scan workers 1 8 \
  'ui5 build --all --workers {workers}'
```

**Explanation**:
- Tests workers=1, workers=2, ..., workers=8
- Finds optimal parallelization
- Helps tune performance parameters

---

## Performance Metrics

### Key Metrics Captured

| Metric | Description |
|--------|-------------|
| **Mean Time** | Average execution time across all runs |
| **Standard Deviation (σ)** | Variability/consistency of measurements |
| **Min/Max** | Fastest and slowest observed times |
| **User Time** | CPU time spent in user mode |
| **System Time** | CPU time spent in kernel mode |
| **Range** | Spread between min and max |

---

### Understanding Variation

**Low σ (< 5%)**: Consistent performance
```
Time (mean ± σ):  7.234 s ±  0.156 s  ← σ/mean = 2.2% (good!)
```

**High σ (> 10%)**: Inconsistent, investigate causes
```
Time (mean ± σ):  7.234 s ±  0.892 s  ← σ/mean = 12.3% (investigate!)
```

**Causes of High Variation**:
- Background processes
- Thermal throttling
- Swapping/paging
- Network activity
- Inadequate warmup

---

## Optimization Analysis

### Calculating Improvement

**Formula**:
```
Improvement % = ((baseline - optimized) / baseline) * 100
```

**Example**:
```
Baseline:  10.0 s
Optimized:  7.0 s

Improvement = ((10.0 - 7.0) / 10.0) * 100 = 30%
```

**Interpretation**: Optimized version is **30% faster**

---

### Comparative Ratio

**Formula**:
```
Ratio = baseline / optimized
```

**Example**:
```
Baseline:  10.0 s
Optimized:  7.0 s

Ratio = 10.0 / 7.0 = 1.43

"Optimized ran 1.43 times faster"
```

---

### Statistical Significance

**Check σ Overlap**:
```
Baseline:  10.0 s ± 0.2 s  (range: 9.8 - 10.2 s)
Optimized:  9.8 s ± 0.3 s  (range: 9.5 - 10.1 s)
```

**Overlap**: Yes → Difference may not be significant

**No Overlap**:
```
Baseline:  10.0 s ± 0.2 s  (range: 9.8 - 10.2 s)
Optimized:  7.0 s ± 0.2 s  (range: 6.8 - 7.2 s)
```

**No overlap**: Difference is statistically significant

---

## System Preparation

### Recommended Steps

**1. Connect to Power**:
```bash
# Avoid battery-saving throttling
# Ensure consistent CPU performance
```

**2. Close Background Apps**:
```bash
# macOS: Quit unnecessary apps
# Windows: Close background processes
# Linux: Stop unnecessary services
```

**3. Disable Swapping (Temporarily)**:
```bash
# Linux
sudo swapoff -a
# Remember to re-enable: sudo swapon -a
```

**4. Set CPU Governor** (Linux):
```bash
# Set to performance mode
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# After benchmarking, restore:
echo powersave | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

**5. Clear Caches**:
```bash
# Clear UI5 cache
rm -rf ~/.ui5/

# Clear npm cache
npm cache clean --force
```

**6. Avoid User Interaction**:
```
# Don't use computer during benchmarking
# Mouse/keyboard activity can affect results
```

---

## Best Practices

### 1. Use Warmup

**✅ Always warm up**:
```bash
hyperfine --warmup 3 'ui5 build'
```

**❌ Skip warmup**:
```bash
hyperfine 'ui5 build'  # First run may be slower!
```

---

### 2. Ensure Clean State

**✅ Use preparation**:
```bash
hyperfine --prepare 'rm -rf dist' 'ui5 build'
```

**❌ Incremental builds**:
```bash
hyperfine 'ui5 build'  # May reuse cached artifacts
```

---

### 3. Multiple Runs

**✅ Sufficient runs**:
```bash
hyperfine --runs 10 'ui5 build'  # Good statistical base
```

**❌ Single run**:
```bash
hyperfine --runs 1 'ui5 build'  # No statistical validity
```

---

### 4. Export Results

**✅ Save for comparison**:
```bash
hyperfine --export-json results.json 'ui5 build'
hyperfine --export-markdown results.md 'ui5 build'
```

**Benefits**: Historical tracking, charts, reports

---

### 5. Test Realistic Scenarios

**✅ Real project**:
```bash
cd real-production-app
hyperfine 'ui5 build --all'
```

**❌ Minimal project**:
```bash
cd hello-world
hyperfine 'ui5 build'  # Not representative
```

---

## Example Workflows

### Workflow 1: Measure Build Performance

```bash
#!/bin/bash
# benchmark-build.sh

# Prepare
cd my-ui5-app
rm -rf dist node_modules
npm install

# Baseline measurement
hyperfine \
  --warmup 3 \
  --runs 10 \
  --export-json baseline.json \
  --export-markdown baseline.md \
  --prepare 'rm -rf dist' \
  'ui5 build --all'

echo "Results saved to baseline.json and baseline.md"
```

---

### Workflow 2: Compare Optimization

```bash
#!/bin/bash
# compare-optimization.sh

cd my-ui5-app

# Test baseline
echo "Testing baseline..."
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --command-name "standard" \
  'ui5 build --all' \
  > comparison.txt

# Test without minification
echo "Testing without minification..."
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --command-name "no-minify" \
  'ui5 build --all --exclude-task minify' \
  >> comparison.txt

# Test without source maps
echo "Testing without source maps..."
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --command-name "no-sourcemaps" \
  'ui5 build --all --exclude-task generateResourcesJson' \
  >> comparison.txt

cat comparison.txt
```

---

### Workflow 3: Version Comparison

```bash
#!/bin/bash
# compare-versions.sh

PROJECT_DIR="my-ui5-app"
cd $PROJECT_DIR

# Install v3
npm install --save-dev @ui5/cli@^3
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --export-json v3.json \
  'npx ui5 build --all'

# Install v4
npm install --save-dev @ui5/cli@^4
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --export-json v4.json \
  'npx ui5 build --all'

# Compare
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  'npm install --save-dev @ui5/cli@^3 && npx ui5 build --all' \
  'npm install --save-dev @ui5/cli@^4 && npx ui5 build --all'
```

---

### Workflow 4: Dependency Impact

```bash
#!/bin/bash
# measure-dependency-impact.sh

cd my-ui5-app

# Without dependencies
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --command-name "app-only" \
  'ui5 build'

# With all dependencies
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --command-name "with-deps" \
  'ui5 build --all'

# With specific dependency
hyperfine \
  --warmup 2 \
  --prepare 'rm -rf dist' \
  --command-name "with-lib" \
  'ui5 build --include-dependency my.reuse.library'
```

---

## Interpreting Results

### Good Performance

```
Benchmark 1: ui5 build --all
  Time (mean ± σ):      5.234 s ±  0.056 s
  Range (min … max):    5.142 s …  5.312 s
```

**Indicators**:
- ✅ Low σ (< 5% of mean)
- ✅ Narrow range
- ✅ Consistent times

---

### Performance Regression

```
Before: 5.0 s ± 0.1 s
After:  7.0 s ± 0.2 s

Regression: +40% slower
```

**Action**: Investigate code changes causing slowdown

---

### Performance Improvement

```
Before: 10.0 s ± 0.2 s
After:   7.0 s ± 0.1 s

Improvement: -30% faster (1.43x speedup)
```

**Result**: Optimization successful!

---

## Advanced Usage

### Custom Output Format

```bash
# Markdown table
hyperfine --export-markdown results.md 'ui5 build'

# JSON for processing
hyperfine --export-json results.json 'ui5 build'

# CSV for spreadsheets
hyperfine --export-csv results.csv 'ui5 build'
```

---

### Shell Functions

```bash
# Benchmark function
bench() {
    hyperfine --warmup 3 --prepare 'rm -rf dist' "$@"
}

# Usage
bench 'ui5 build --all'
```

---

### Profiling with --show-output

```bash
# See command output
hyperfine --show-output 'ui5 build --all'
```

**Use Case**: Debug why benchmark is slow

---

## Troubleshooting

### Issue: High Variation

**Symptom**: σ > 10% of mean

**Solutions**:
1. Increase warmup runs
2. Close background apps
3. Connect to power
4. Run more iterations

---

### Issue: Slow First Run

**Symptom**: First run much slower than subsequent

**Solution**: Use `--warmup` to skip first runs

---

### Issue: Inconsistent Results

**Symptom**: Results vary between sessions

**Solutions**:
1. Clear caches before benchmarking
2. Reboot system
3. Check for background processes
4. Ensure consistent CPU governor

---

## Additional Resources

- **hyperfine GitHub**: https://github.com/sharkdp/hyperfine
- **UI5 CLI Performance**: https://ui5.github.io/cli/stable/pages/Benchmarking/
- **UI5 Build Options**: https://ui5.github.io/cli/stable/pages/CLI/#ui5-build

---

**Last Updated**: 2025-11-21
**Official Docs**: https://ui5.github.io/cli/stable/pages/Benchmarking/
