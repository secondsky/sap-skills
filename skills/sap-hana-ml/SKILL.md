---
name: sap-hana-ml
description: |
  SAP HANA Machine Learning Python Client (hana-ml) development skill. Provides guidance for building ML solutions using SAP HANA's in-database machine learning capabilities with Python.

  Use when:
  - Setting up hana-ml Python library for SAP HANA ML development
  - Creating connections to SAP HANA using ConnectionContext
  - Working with HANA DataFrames for data manipulation
  - Implementing PAL (Predictive Analysis Library) algorithms
  - Using APL (Automated Predictive Library) for AutoML
  - Building classification, regression, clustering, or time series models
  - Creating visualizations and model explanations with SHAP
  - Saving, loading, and managing ML models in HANA
  - Performing spatial or graph analytics in HANA
  - Text mining with topic modeling (LDA)

  Keywords: hana-ml, SAP HANA, machine learning, PAL, APL, predictive analytics, HANA DataFrame, ConnectionContext, classification, regression, clustering, time series, ARIMA, gradient boosting, AutoML, SHAP, model storage, spatial analytics, graph algorithms
license: MIT
---

# SAP HANA ML Python Client (hana-ml)

**Version**: 2.22.241011
**Last Verified**: 2025-11-23
**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.html

---

## Installation

```bash
pip install hana-ml
```

**Requirements**:
- Python 3.8+
- SAP HANA 2.0 SPS03+ or SAP HANA Cloud
- hdbcli (SAP HANA Python driver, installed automatically)

---

## Quick Start

### Connection Setup

```python
from hana_ml import ConnectionContext

# Connect to SAP HANA
conn = ConnectionContext(
    address='<hostname>',
    port=443,
    user='<username>',
    password='<password>',
    encrypt=True  # Required for HANA Cloud
)

# Verify connection
print(f"HANA Version: {conn.hana_version()}")
print(f"Cloud Version: {conn.is_cloud_version()}")
```

### DataFrame Operations

```python
# Create DataFrame from existing table
df = conn.table('MY_TABLE', schema='MY_SCHEMA')

# Basic operations
print(df.columns)        # Column names
print(df.shape)          # (rows, columns)
df.head(10).collect()    # First 10 rows to pandas

# Filtering and selection
filtered = df.filter("AGE > 30").select('NAME', 'AGE', 'SALARY')

# Aggregations
stats = df.agg([
    ('SALARY', 'mean', 'AVG_SALARY'),
    ('SALARY', 'max', 'MAX_SALARY'),
    ('AGE', 'count', 'COUNT')
])

# Create from pandas
import pandas as pd
from hana_ml.dataframe import create_dataframe_from_pandas

pdf = pd.DataFrame({'A': [1, 2, 3], 'B': ['x', 'y', 'z']})
hdf = create_dataframe_from_pandas(conn, pdf, table_name='MY_NEW_TABLE')
```

---

## PAL (Predictive Analysis Library)

PAL provides 100+ algorithms executed in-database for optimal performance.

### Classification Example

```python
from hana_ml.algorithms.pal.unified_classification import UnifiedClassification

# Prepare data
train_df = conn.table('TRAINING_DATA')

# Train model
clf = UnifiedClassification(func='RandomDecisionTree')
clf.fit(train_df, features=['F1', 'F2', 'F3'], label='TARGET')

# Predict
test_df = conn.table('TEST_DATA')
predictions = clf.predict(test_df, features=['F1', 'F2', 'F3'])

# Evaluate
score = clf.score(test_df, features=['F1', 'F2', 'F3'], label='TARGET')
print(f"Accuracy: {score}")
```

### Regression Example

```python
from hana_ml.algorithms.pal.unified_regression import UnifiedRegression

# Train regression model
reg = UnifiedRegression(func='HybridGradientBoostingTree')
reg.fit(train_df, features=['F1', 'F2', 'F3'], label='PRICE')

# Predict continuous values
predictions = reg.predict(test_df, features=['F1', 'F2', 'F3'])
```

### Clustering Example

```python
from hana_ml.algorithms.pal.clustering import KMeans

# Train KMeans
kmeans = KMeans(n_clusters=5)
kmeans.fit(data_df, features=['F1', 'F2', 'F3'])

# Get cluster assignments
labels = kmeans.labels_
centers = kmeans.cluster_centers_
```

### Time Series Forecasting

```python
from hana_ml.algorithms.pal.tsa.arima import ARIMA
from hana_ml.algorithms.pal.tsa.auto_arima import AutoARIMA

# AutoARIMA for automatic parameter selection
auto_arima = AutoARIMA()
auto_arima.fit(ts_df, endog='VALUE')

# Forecast future values
forecast = auto_arima.predict(forecast_length=30)
```

---

## APL (Automated Predictive Library)

APL provides AutoML capabilities with automatic feature engineering and model selection.

### AutoML Classification

```python
from hana_ml.algorithms.apl.classification import AutoClassifier

# Automatic classification
auto_clf = AutoClassifier()
auto_clf.fit(train_df, label='TARGET')

# Get feature importance
importance = auto_clf.get_feature_importances()

# Generate predictions with explanations
predictions = auto_clf.predict(test_df)
```

### AutoML Regression

```python
from hana_ml.algorithms.apl.regression import AutoRegressor

auto_reg = AutoRegressor()
auto_reg.fit(train_df, label='PRICE')

# Model performance
metrics = auto_reg.get_performance_metrics()
summary = auto_reg.get_summary()
```

### Gradient Boosting

```python
from hana_ml.algorithms.apl.gradient_boosting_classification import GradientBoostingClassifier

gbc = GradientBoostingClassifier()
gbc.fit(train_df, label='TARGET')

# Export model for deployment
gbc.export_apply_code()
```

### Time Series with APL

```python
from hana_ml.algorithms.apl.time_series import AutoTimeSeries

ts_model = AutoTimeSeries()
ts_model.fit(ts_df, endog='SALES', exog=['PROMOTION', 'HOLIDAY'])

# Forecast
forecast = ts_model.predict(horizon=12)
```

---

## Model Persistence

```python
# Save model to HANA
from hana_ml.model_storage import ModelStorage

ms = ModelStorage(conn)
clf.name = 'MY_CLASSIFIER'
ms.save_model(model=clf, if_exists='replace')

# List saved models
ms.list_models()

# Load model
loaded_clf = ms.load_model('MY_CLASSIFIER')

# Delete model
ms.delete_model('MY_CLASSIFIER')
```

---

## Visualizations

### EDA Visualizations

```python
from hana_ml.visualizers.eda import EDAVisualizer

viz = EDAVisualizer(ax=None)

# Distribution plot
viz.distribution_plot(data=df, column='AGE', bins=20)

# Correlation plot
viz.correlation_plot(data=df, columns=['F1', 'F2', 'F3', 'TARGET'])

# Box plot
viz.box_plot(data=df, column='SALARY', groupby='DEPARTMENT')
```

### Model Explanation with SHAP

```python
from hana_ml.visualizers.shap import ShapleyExplainer

explainer = ShapleyExplainer(clf)
explainer.summary_plot(test_df)
explainer.force_plot(test_df.head(1))
```

### Confusion Matrix

```python
from hana_ml.visualizers.metrics import MetricsVisualizer

mv = MetricsVisualizer()
mv.plot_confusion_matrix(y_true, y_pred, labels=['Class0', 'Class1'])
```

### Time Series Plots

```python
from hana_ml.visualizers.eda import plot_acf, plot_pacf, seasonal_plot

plot_acf(ts_df, column='VALUE', lags=40)
plot_pacf(ts_df, column='VALUE', lags=40)
seasonal_plot(ts_df, column='VALUE', period=12)
```

---

## Algorithm Reference

### PAL Algorithm Categories

| Category | Key Algorithms |
|----------|----------------|
| **Classification** | LogisticRegression, DecisionTreeClassifier, RandomForest (RDTClassifier), SVC, NaiveBayes, KNNClassifier, MLPClassifier, HybridGradientBoostingClassifier |
| **Regression** | LinearRegression, DecisionTreeRegressor, SVR, GLM, PolynomialRegression, MLPRegressor, HybridGradientBoostingRegressor |
| **Clustering** | KMeans, KMedoids, DBSCAN, AgglomerateHierarchicalClustering, SpectralClustering, GaussianMixture, SOM |
| **Time Series** | ARIMA, AutoARIMA, ExponentialSmoothing, BSTS, LSTM, LTSF, GRUAttention, ROCKET |
| **Preprocessing** | FeatureNormalizer, PCA, Imputer, SMOTE, train_test_val_split, FeatureSelection |
| **Association** | Apriori, FPGrowth, SPM |
| **Recommender** | ALS, FFMClassifier, FFMRegressor, MLPRecommender |
| **Statistics** | ttest, f_oneway, chi2, KDE, correlation, distribution functions |

### APL Algorithm Classes

| Class | Purpose |
|-------|---------|
| AutoClassifier | Automated classification with feature engineering |
| AutoRegressor | Automated regression with feature engineering |
| GradientBoostingClassifier | Multi-class gradient boosting |
| GradientBoostingBinaryClassifier | Binary classification |
| GradientBoostingRegressor | Gradient boosting regression |
| AutoTimeSeries | Automated time series forecasting |
| AutoUnsupervisedClustering | Automatic clustering |
| AutoSupervisedClustering | Guided clustering |

---

## Advanced Features

### Hyperparameter Tuning

```python
from hana_ml.algorithms.pal.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.2]
}

grid_search = GridSearchCV(
    estimator=HybridGradientBoostingClassifier(),
    param_grid=param_grid,
    cv=5
)
grid_search.fit(train_df, features=features, label='TARGET')

print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_}")
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

pipeline.fit(train_df, features=features, label='TARGET')
predictions = pipeline.predict(test_df, features=features)
```

### Spatial Analytics

```python
from hana_ml.algorithms.pal.clustering import GeometryDBSCAN

# Spatial clustering
geo_dbscan = GeometryDBSCAN(eps=0.5, minpts=5)
geo_dbscan.fit(spatial_df, key='ID', features=['LOCATION'])
```

### Text Mining

```python
from hana_ml.algorithms.pal.decomposition import LatentDirichletAllocation

# Topic modeling
lda = LatentDirichletAllocation(n_components=10)
lda.fit(text_df, features=['DOCUMENT'])
topics = lda.transform(text_df)
```

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

### Feature Importance Analysis

```python
# For PAL models
from hana_ml.algorithms.pal.preprocessing import FeatureSelection

fs = FeatureSelection()
fs.fit(train_df, features=features, label='TARGET')
importance = fs.importance_

# For APL models
importance = auto_clf.get_feature_importances()
```

### Model Cards

```python
from hana_ml.algorithms.pal.model_selection import create_model_card

card = create_model_card(
    model=clf,
    model_name='Customer Churn Predictor',
    description='Predicts customer churn probability',
    intended_use='Marketing targeting',
    training_data_description='12 months customer data'
)
```

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

## Best Practices

1. **Use lazy evaluation**: DataFrame operations build SQL without execution until `collect()` is called
2. **Leverage in-database processing**: Keep data in HANA for optimal performance
3. **Use Unified interfaces**: `UnifiedClassification`, `UnifiedRegression` provide consistent APIs
4. **Monitor with visualizers**: Use `PipelineProgressStatusMonitor` for long-running AutoML
5. **Save models**: Use `ModelStorage` to persist trained models for deployment
6. **Explain predictions**: Use SHAP explainers for model interpretability

---

## Reference Files

For detailed information, see:
- `references/DATAFRAME_REFERENCE.md` - Complete DataFrame API (ConnectionContext, DataFrame)
- `references/PAL_ALGORITHMS.md` - All PAL algorithms and parameters (100+ algorithms)
- `references/APL_ALGORITHMS.md` - All APL algorithms and parameters (AutoML)
- `references/VISUALIZERS.md` - Complete visualization API (14 submodules)
- `references/SUPPORTING_MODULES.md` - Model storage, artifacts, spatial, graph, text mining, statistics

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Main Documentation | https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.html |
| Installation Guide | https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/Installation.html |
| DataFrame API | https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.dataframe.html |
| PAL Algorithms | https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.algorithms.pal.html |
| APL Algorithms | https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.algorithms.apl.html |
| Visualizers | https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.visualizers.html |
| PyPI Package | https://pypi.org/project/hana-ml/ |
