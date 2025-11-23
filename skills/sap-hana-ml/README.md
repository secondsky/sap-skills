# SAP HANA ML Skill

Claude Code skill for SAP HANA Machine Learning Python Client (hana-ml) development.

## Overview

This skill provides comprehensive guidance for building machine learning solutions using SAP HANA's in-database ML capabilities with Python. It covers the hana-ml library including PAL (Predictive Analysis Library), APL (Automated Predictive Library), DataFrames, visualizations, and model management.

## Version

- **hana-ml Version**: 2.22.241011
- **Last Verified**: 2025-11-23

## Auto-Trigger Keywords

This skill activates when working with:

### Library & Connection
- hana-ml, hana_ml, hana ml
- SAP HANA machine learning, HANA ML
- ConnectionContext, HANA connection
- hdbcli, SAP HANA Python driver

### DataFrame Operations
- HANA DataFrame, hana_ml.dataframe
- create_dataframe_from_pandas
- collect(), filter(), select()
- HANA table operations

### PAL Algorithms
- PAL, Predictive Analysis Library
- UnifiedClassification, UnifiedRegression, UnifiedClustering
- KMeans, DBSCAN, clustering HANA
- LogisticRegression HANA, DecisionTree HANA
- ARIMA HANA, AutoARIMA, time series HANA
- LSTM HANA, GRUAttention
- HybridGradientBoostingClassifier, HybridGradientBoostingRegressor
- FeatureNormalizer, PCA HANA, Imputer HANA
- SMOTE HANA, train_test_val_split
- GridSearchCV HANA, RandomSearchCV HANA

### APL Algorithms
- APL, Automated Predictive Library
- AutoClassifier, AutoRegressor
- GradientBoostingClassifier APL
- AutoTimeSeries, HANA forecasting
- AutoML HANA, automated machine learning HANA

### Visualizations
- EDAVisualizer, HANA visualization
- ShapleyExplainer, SHAP HANA
- TreeModelDebriefing
- MetricsVisualizer, confusion matrix HANA
- plot_acf, plot_pacf, seasonal_plot

### Model Management
- ModelStorage, save_model HANA
- load_model HANA, model persistence
- export_apply_code

### Advanced Features
- GeometryDBSCAN, spatial clustering HANA
- LatentDirichletAllocation, topic modeling HANA
- Pipeline HANA ML
- feature_importances HANA

### Statistics & Testing
- ttest HANA, chi_squared HANA
- f_oneway, ANOVA HANA
- distribution_fit, KDE HANA
- kaplan_meier HANA, survival analysis

### Spatial & Graph
- hana_ml.spatial, spatial analytics
- hana_ml.graph, graph algorithms
- PageRank HANA, LinkPrediction
- create_dataframe_from_shapefile

### Scheduling & Artifacts
- schedule_fit, schedule_predict
- hana_ml.artifacts, model artifacts
- get_artifacts_recorder

### Error Keywords
- hana_ml.ml_exceptions
- ConnectionContext error
- PAL algorithm error
- HANA ML fit error

## Contents

```
sap-hana-ml/
├── SKILL.md                    # Main skill file
├── README.md                   # This file
├── PROGRESS_TRACKING.md        # Documentation coverage tracking
└── references/
    ├── DATAFRAME_REFERENCE.md  # Complete DataFrame API
    ├── PAL_ALGORITHMS.md       # All PAL algorithms (100+)
    ├── APL_ALGORITHMS.md       # All APL algorithms (AutoML)
    ├── VISUALIZERS.md          # Visualization API (14 submodules)
    └── SUPPORTING_MODULES.md   # Model storage, spatial, graph, stats
```

## Quick Start

```python
from hana_ml import ConnectionContext
from hana_ml.algorithms.pal.unified_classification import UnifiedClassification

# Connect to HANA
conn = ConnectionContext(address='host', port=443, user='user', password='pwd', encrypt=True)

# Load data
df = conn.table('TRAINING_DATA')

# Train model
clf = UnifiedClassification(func='RandomDecisionTree')
clf.fit(df, features=['F1', 'F2'], label='TARGET')

# Predict
predictions = clf.predict(conn.table('TEST_DATA'), features=['F1', 'F2'])
```

## Use Cases

- Building classification models with PAL or APL
- Creating regression models for prediction
- Clustering analysis with KMeans, DBSCAN
- Time series forecasting with ARIMA, LSTM
- AutoML with APL AutoClassifier/AutoRegressor
- Model explainability with SHAP
- Feature engineering and preprocessing
- Hyperparameter tuning with GridSearchCV
- Model persistence and deployment

## Documentation Links

- [Main Documentation](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.html)
- [Installation Guide](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/Installation.html)
- [DataFrame API](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.dataframe.html)
- [PAL Algorithms](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.algorithms.pal.html)
- [APL Algorithms](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.algorithms.apl.html)
- [Visualizers](https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.visualizers.html)
- [PyPI Package](https://pypi.org/project/hana-ml/)

## License

MIT
