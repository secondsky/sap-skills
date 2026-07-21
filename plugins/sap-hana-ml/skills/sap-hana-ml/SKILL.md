---
name: sap-hana-ml
description: |
  SAP HANA Machine Learning Python Client (hana-ml) development skill.
  
  Use when: Building ML solutions with SAP HANA's in-database machine learning
  using Python hana-ml library for PAL/APL algorithms, DataFrame operations,
  AutoML, model persistence, and visualization.
  
  Keywords: hana-ml, SAP HANA, machine learning, PAL, APL, predictive analytics,
  HANA DataFrame, ConnectionContext, classification, regression, clustering,
  time series, ARIMA, gradient boosting, AutoML, SHAP, model storage
license: GPL-3.0
metadata:
  maintainer: "Eduard Jiglau"
  maintainer_email: "hello@sap-ai-skills.com"
  website: "https://sap-ai-skills.com"
  version: "2.4.0"
  last_verified: 2025-11-27
  package_version: 2.22.241011
---

# SAP HANA ML Python Client (hana-ml)

## Related Skills

- **sap-dependency-security**: Use for secure dependency pinning and upgrade workflows in Python/auxiliary tooling used alongside HANA ML stacks

## When to Use This Skill

Use this skill when building machine learning workflows with the `hana-ml` Python client, using PAL/APL algorithms, querying HANA DataFrames, training or scoring models in-database, using AutoML, visualizing model output, or troubleshooting Python-to-HANA ML connections.

## Common Issues

| Issue | First check |
|-------|-------------|
| Connection fails | Verify HANA host, port, TLS/encryption, user privileges, and network allowlists. |
| PAL/APL algorithm missing | Confirm the HANA system has the required AFL/PAL/APL libraries installed and licensed. |
| DataFrame collection is slow | Push filtering/projection into HANA and avoid collecting large frames into Python. |

**Package Version**: 2.22.241011  
**Last Verified**: 2025-11-27

## Table of Contents

- [Installation & Setup](#installation--setup)
- [Quick Start](#quick-start)
- [Core Libraries](#core-libraries)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Bundled Resources](#bundled-resources)

---

## Installation & Setup

```bash
pip install hana-ml
```

**Requirements**: Python 3.8+, SAP HANA 2.0 SPS03+ or SAP HANA Cloud

---

## Quick Start

### Connection & DataFrame

```python
from hana_ml import ConnectionContext

# Connect
conn = ConnectionContext(
    address='<hostname>',
    port=443,
    user='<username>',
    password='<password>',
    encrypt=True
)

# Create DataFrame
df = conn.table('MY_TABLE', schema='MY_SCHEMA')
print(f"Shape: {df.shape}")
df.head(10).collect()
```

### PAL Classification

```python
from hana_ml.algorithms.pal.unified_classification import UnifiedClassification

# Train model
clf = UnifiedClassification(func='RandomDecisionTree')
clf.fit(train_df, features=['F1', 'F2', 'F3'], label='TARGET')

# Predict & evaluate
predictions = clf.predict(test_df, features=['F1', 'F2', 'F3'])
score = clf.score(test_df, features=['F1', 'F2', 'F3'], label='TARGET')
```

### APL AutoML

```python
from hana_ml.algorithms.apl.classification import AutoClassifier

# Automated classification
auto_clf = AutoClassifier()
auto_clf.fit(train_df, label='TARGET')
predictions = auto_clf.predict(test_df)
```

### Model Persistence

```python
from hana_ml.model_storage import ModelStorage

ms = ModelStorage(conn)
clf.name = 'MY_CLASSIFIER'
ms.save_model(model=clf, if_exists='replace')
```

---

## Core Libraries

### PAL (Predictive Analysis Library)
- **100+ algorithms** executed in-database
- Categories: Classification, Regression, Clustering, Time Series, Preprocessing
- **Key classes**: `UnifiedClassification`, `UnifiedRegression`, `KMeans`, `ARIMA`
- See: `references/PAL_ALGORITHMS.md` for complete list

### APL (Automated Predictive Library)
- **AutoML capabilities** with automatic feature engineering
- **Key classes**: `AutoClassifier`, `AutoRegressor`, `GradientBoostingClassifier`
- See: `references/APL_ALGORITHMS.md` for details

### DataFrames
- **Lazy evaluation** - builds SQL until `collect()` called
- **In-database processing** for optimal performance
- See: `references/DATAFRAME_REFERENCE.md` for complete API

### Visualizers
- **EDA plots**, model explanations, metrics
- **SHAP integration** for model interpretability
- See: `references/VISUALIZERS.md` for 14 visualization modules

---

## Common Patterns

### Train-Test Split
```python
from hana_ml.algorithms.pal.partition import train_test_val_split

train, test, val = train_test_val_split(
    data=df,
    training_percentage=0.7,
    testing_percentage=0.2,
    validation_percentage=0.1
)
```

### Feature Importance
```python
# APL models
importance = auto_clf.get_feature_importances()

# PAL models
from hana_ml.algorithms.pal.preprocessing import FeatureSelection
fs = FeatureSelection()
fs.fit(train_df, features=features, label='TARGET')
```

### Pipeline
```python
from hana_ml.algorithms.pal.pipeline import Pipeline
from hana_ml.algorithms.pal.preprocessing import Imputer, FeatureNormalizer

pipeline = Pipeline([
    ('imputer', Imputer(strategy='mean')),
    ('normalizer', FeatureNormalizer()),
    ('classifier', UnifiedClassification(func='RandomDecisionTree'))
])
```

---

## Best Practices

1. **Use lazy evaluation** - Operations build SQL without execution until `collect()`
2. **Leverage in-database processing** - Keep data in HANA for performance
3. **Use Unified interfaces** - Consistent APIs across algorithms
4. **Save models** - Use `ModelStorage` for persistence
5. **Explain predictions** - Use SHAP explainers for interpretability
6. **Monitor AutoML** - Use `PipelineProgressStatusMonitor` for long-running jobs

---

## Bundled Resources

### Reference Files
- **`references/DATAFRAME_REFERENCE.md`** (479 lines)
  - ConnectionContext API, DataFrame operations, SQL generation
  
- **`references/PAL_ALGORITHMS.md`** (869 lines)
  - Complete PAL algorithm reference (100+ algorithms)
  - Classification, Regression, Clustering, Time Series, Preprocessing
  
- **`references/APL_ALGORITHMS.md`** (534 lines)
  - AutoML capabilities, automated feature engineering
  - AutoClassifier, AutoRegressor, GradientBoosting classes
  
- **`references/VISUALIZERS.md`** (704 lines)
  - 14 visualization modules (EDA, SHAP, metrics, time series)
  - Plot types, configuration, export options
  
- **`references/SUPPORTING_MODULES.md`** (626 lines)
  - Model storage, spatial analytics, graph algorithms
  - Text mining, statistics, error handling

---

## Error Handling

```python
from hana_ml.ml_exceptions import Error

try:
    clf.fit(train_df, features=features, label='TARGET')
except Error as e:
    print(f"HANA ML Error: {e}")
```

---

## Documentation

- **Official Docs**: [https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.html](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.html)
- **PyPI Package**: [https://pypi.org/project/hana-ml/](https://pypi.org/project/hana-ml/)
