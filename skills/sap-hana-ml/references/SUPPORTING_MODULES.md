# SAP HANA ML Supporting Modules Reference

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/

---

## Model Storage (hana_ml.model_storage)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.model_storage.html

### ModelStorage Class

```python
from hana_ml.model_storage import ModelStorage

# Initialize model storage
ms = ModelStorage(connection_context=conn)

# Save a trained model
model.name = 'MY_MODEL'
ms.save_model(
    model=model,
    if_exists='replace',  # 'replace', 'error', 'append'
    version=1
)

# List all saved models
models = ms.list_models()
print(models)

# Load a model
loaded_model = ms.load_model(name='MY_MODEL')

# Load specific version
loaded_model = ms.load_model(name='MY_MODEL', version=1)

# Delete a model
ms.delete_model(name='MY_MODEL')

# Delete specific version
ms.delete_model(name='MY_MODEL', version=1)
```

### Model Persistence in Algorithms

All PAL and APL algorithms support:

```python
# Save model directly
model.save_model(model_table='MY_MODELS', if_exists='replace')

# Load model directly
model.load_model(model_table='MY_MODELS')
```

---

## Artifacts (hana_ml.artifacts)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.artifacts.html

### Artifact Recording

```python
# Get artifacts recorder from model
recorder = model.get_artifacts_recorder()

# Save model artifacts
model.save_artifact(artifact_table='MY_ARTIFACTS')
```

### Artifact Types

Artifacts include:
- Model weights and parameters
- Feature statistics
- Training metadata
- Performance metrics history
- Model configuration

---

## Spatial (hana_ml.spatial)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.spatial.html

### DataFrame Spatial Properties

```python
# Access geometry columns
geometries = df.geometries

# Access spatial reference identifiers
srids = df.srids
```

### Creating DataFrames from Shapefiles

```python
from hana_ml.dataframe import create_dataframe_from_shapefile

# Import shapefile
geo_df = create_dataframe_from_shapefile(
    connection_context=conn,
    shp_file='path/to/file.shp',
    table_name='GEO_DATA',
    schema='MY_SCHEMA',
    srid=4326  # WGS84
)
```

### GeometryDBSCAN (Spatial Clustering)

```python
from hana_ml.algorithms.pal.clustering import GeometryDBSCAN

# Spatial density-based clustering
geo_dbscan = GeometryDBSCAN(
    eps=0.5,      # Maximum distance between points
    minpts=5      # Minimum points for core point
)

geo_dbscan.fit(
    data=spatial_df,
    key='ID',
    features=['LOCATION']  # Geometry column
)

# Get cluster labels
labels = geo_dbscan.labels_
```

---

## Graph (hana_ml.graph)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.graph.html

### Graph Visualization (from hana_ml.visualizers.digraph)

```python
from hana_ml.visualizers.digraph import (
    Digraph,
    MultiDigraph,
    Node,
    Edge,
    DigraphConfig
)

# Configure graph layout
config = DigraphConfig()
config.set_digraph_layout('TB')  # Top to Bottom
config.set_node_sep(1.5)
config.set_rank_sep(2.0)
config.set_text_layout('horizontal')

# Create directed graph
graph = Digraph(config=config)

# Add model nodes
graph.add_model_node(
    node_id='preprocessing',
    label='Preprocessing',
    model_type='preprocessing'
)

graph.add_model_node(
    node_id='model',
    label='Classifier',
    model_type='classification'
)

# Add Python node
graph.add_python_node(
    node_id='custom',
    label='Custom Logic'
)

# Add edges
graph.add_edge(source='preprocessing', target='model')
graph.add_edge(source='model', target='custom')

# Build and export
graph.build()
html = graph.generate_html()
graph.generate_notebook_iframe()

# Export to JSON
json_data = graph.to_json()
```

### MultiDigraph (Hierarchical Graphs)

```python
from hana_ml.visualizers.digraph import MultiDigraph

# Create hierarchical graph
multi_graph = MultiDigraph()

# Add child digraphs for grouping
preprocessing_group = multi_graph.add_child_digraph(name='Preprocessing')
preprocessing_group.add_model_node('imputer', 'Imputer')
preprocessing_group.add_model_node('normalizer', 'Normalizer')

modeling_group = multi_graph.add_child_digraph(name='Modeling')
modeling_group.add_model_node('classifier', 'Classifier')

# Build and export
multi_graph.build()
multi_graph.generate_html()
```

---

## Graph Algorithms (hana_ml.graph.algorithms)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.graph.algorithms.html

### Social Network Analysis (from PAL)

```python
from hana_ml.algorithms.pal.social_network import PageRank, LinkPrediction

# PageRank
pagerank = PageRank(
    damping=0.85,
    max_iter=100,
    tol=1e-6
)
pagerank.fit(
    data=graph_df,
    source='FROM_NODE',
    target='TO_NODE',
    weight='WEIGHT'
)
ranks = pagerank.result_

# Link Prediction
lp = LinkPrediction(
    method='common_neighbors'  # or 'jaccard', 'adamic_adar'
)
lp.fit(
    data=graph_df,
    source='FROM_NODE',
    target='TO_NODE'
)
predictions = lp.predict(test_pairs_df)
```

---

## Text Mining (hana_ml.text.tm)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.text.tm.html

### Latent Dirichlet Allocation (Topic Modeling)

```python
from hana_ml.algorithms.pal.decomposition import LatentDirichletAllocation

# Topic modeling
lda = LatentDirichletAllocation(
    n_components=10,              # Number of topics
    max_iter=100,                 # Maximum iterations
    doc_topic_prior=None,         # Alpha parameter
    topic_word_prior=None,        # Beta parameter
    learning_method='batch',      # 'batch' or 'online'
    random_state=42
)

lda.fit(
    data=text_df,
    features=['DOCUMENT_TEXT']
)

# Get topic distributions for documents
topic_distributions = lda.transform(text_df)

# Get topic-word matrix
topic_words = lda.components_
```

### CRF (Conditional Random Fields)

```python
from hana_ml.algorithms.pal.text import CRF

# Sequence labeling (NER, POS tagging)
crf = CRF()

crf.fit(
    data=sequence_df,
    features=['TOKEN', 'PREV_TOKEN', 'NEXT_TOKEN'],
    label='TAG',
    sequence_id='SENTENCE_ID'
)

# Predict labels
predictions = crf.predict(test_sequence_df, features=['TOKEN', 'PREV_TOKEN', 'NEXT_TOKEN'])
```

### WordCloud Visualization

```python
from hana_ml.visualizers.word_cloud import WordCloud

# Create word cloud from text
wc = WordCloud(
    width=800,
    height=400,
    background_color='white',
    max_words=200,
    min_font_size=10,
    max_font_size=100
)

# Generate from text DataFrame
wc.generate_from_text(
    data=text_df,
    column='TEXT_CONTENT'
)

# Or from word frequencies
word_freq = {'python': 100, 'machine': 80, 'learning': 75}
wc.fit_words(word_freq)

# Generate from raw frequencies
wc.generate_from_frequencies(word_freq)

# Process text (tokenization, cleaning)
processed = wc.process_text('Raw text content here')

# Build word cloud
wc.build()

# Recolor
wc.recolor(colormap='viridis')

# Export
wc.to_file('wordcloud.png')
wc.to_svg('wordcloud.svg')
array = wc.to_array()
```

---

## Scheduler (hana_ml.hana_scheduler)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.hana_scheduler.html

### Asynchronous Model Training

All APL and PAL models support scheduled execution:

```python
# Schedule asynchronous training
job_id = model.schedule_fit(
    data=train_df,
    label='TARGET'
)

# Schedule asynchronous prediction
job_id = model.schedule_predict(
    data=test_df
)

# Check operation logs
fit_log = model.get_fit_operation_log()
predict_log = model.get_predict_operation_log()
```

---

## Exceptions (hana_ml.ml_exceptions)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.ml_exceptions.html

### Error Handling

```python
from hana_ml.ml_exceptions import Error

try:
    model.fit(train_df, label='TARGET')
except Error as e:
    print(f"HANA ML Error: {e}")
    # Handle specific error cases
```

### Common Error Scenarios

| Error Type | Common Cause | Solution |
|------------|--------------|----------|
| Connection Error | Invalid credentials | Check connection parameters |
| Table Not Found | Schema/table mismatch | Verify table exists |
| Column Error | Invalid column name | Check DataFrame columns |
| Type Error | Data type mismatch | Cast columns appropriately |
| Memory Error | Large dataset | Use sampling or partitioning |

---

## DocStore (hana_ml.docstore)

**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.docstore.html

### Document Store Operations

The docstore module provides JSON document handling capabilities in SAP HANA.

```python
# Note: Detailed API varies by version
# Typical operations include:
# - Create/manage collections
# - Insert/update/delete documents
# - Query JSON documents
# - Index management
```

---

## Statistics Functions (hana_ml.algorithms.pal.stats)

### Distribution Functions

```python
from hana_ml.algorithms.pal.stats import (
    bernoulli, beta, binomial, cauchy, chi_squared,
    exponential, gumbel, f, gamma, geometric,
    lognormal, negative_binomial, normal, pert,
    poisson, student_t, uniform, weibull,
    multinomial, mcmc
)

# Generate random samples
samples = normal(conn, loc=0, scale=1, size=1000)
samples = uniform(conn, low=0, high=1, size=1000)
samples = poisson(conn, lam=5, size=1000)
```

### Statistical Tests

```python
from hana_ml.algorithms.pal.stats import (
    # T-tests
    ttest_1samp,      # One-sample t-test
    ttest_ind,        # Independent two-sample t-test
    ttest_paired,     # Paired t-test

    # ANOVA
    f_oneway,         # One-way ANOVA
    f_oneway_repeated, # Repeated measures ANOVA

    # Chi-squared tests
    chi_squared_goodness_of_fit,
    chi_squared_independence,

    # Non-parametric tests
    wilcoxon,         # Wilcoxon signed-rank test
    median_test_1samp, # One-sample median test
    grubbs_test,      # Outlier detection
    ks_test,          # Kolmogorov-Smirnov test

    # Correlation
    pearsonr_matrix,  # Pearson correlation matrix
    covariance_matrix,

    # Distribution
    distribution_fit, # Fit distribution to data
    KDE,              # Kernel density estimation

    # Other
    univariate_analysis,
    factor_analysis,
    kaplan_meier_survival_analysis,

    # Utility
    entropy,
    condition_index,
    cdf,
    ftest_equal_var,
    quantile,
    iqr,              # Interquartile range
    variance_test,
    interval_quality,
    benford_analysis  # Benford's law analysis
)

# Example: One-sample t-test
t_stat, p_value = ttest_1samp(
    data=df,
    column='VALUE',
    popmean=0
)

# Example: ANOVA
f_stat, p_value = f_oneway(
    data=df,
    groups='GROUP',
    values='VALUE'
)

# Example: KDE
kde = KDE()
kde.fit(data_df, column='VALUE')
density = kde.evaluate(points_df)
```

---

## Time Series Utilities

```python
from hana_ml.algorithms.pal.tsa import (
    accuracy_measure,  # Calculate forecast accuracy metrics
    correlation,       # Time series correlation
    fft,               # Fast Fourier Transform
    dtw,               # Dynamic Time Warping
    fast_dtw           # Fast DTW implementation
)

# Accuracy metrics
metrics = accuracy_measure(
    actual=actual_df,
    forecast=forecast_df,
    measures=['MAE', 'MAPE', 'RMSE', 'SMAPE']
)

# Dynamic Time Warping
distance = dtw(
    series1=ts1_df,
    series2=ts2_df,
    column='VALUE'
)

# Fast Fourier Transform
frequencies = fft(
    data=ts_df,
    column='VALUE'
)
```

---

## AutoML Configuration

```python
from hana_ml.visualizers.automl_config import AutoMLConfig

# Configure AutoML parameters
config = AutoMLConfig()

# Get configuration dictionary
config_dict = config.get_config_dict()

# Generate HTML report of configuration
html = config.generate_html()
```

---

## Time Series Reports

```python
from hana_ml.visualizers.time_series_report import (
    TimeSeriesReport,
    DatasetAnalysis
)

# Create time series analysis
analysis = DatasetAnalysis(
    data=ts_df,
    time_column='DATE',
    value_column='VALUE'
)

# Available analysis items
pacf = analysis.pacf_item(lags=40)
ma = analysis.moving_average_item(window=7)
rolling = analysis.rolling_stddev_item(window=7)
seasonal = analysis.seasonal_item(period=12)
box = analysis.timeseries_box_item(groupby='month')
decompose = analysis.seasonal_decompose_items(period=12)
quarter = analysis.quarter_item()
outlier = analysis.outlier_item(method='iqr')
stationary = analysis.stationarity_item()
real = analysis.real_item()
change = analysis.change_points_item(max_points=5)

# Build comprehensive report
report = TimeSeriesReport()
report.addPage(title='Sales Analysis', items=[pacf, ma, seasonal])
report.addPages([
    ('Trend', [ma, rolling]),
    ('Seasonality', [seasonal, decompose])
])
report.build()

# Export
html = report.generate_html()
report.generate_notebook_iframe()
json_data = report.to_json()
```

---

## SHAP Time Series Explainer

```python
from hana_ml.visualizers.shap import TimeSeriesExplainer

# Explain ARIMA model
arima_explainer = TimeSeriesExplainer(arima_model)
arima_explanation = arima_explainer.explain_arima_model(
    data=ts_df,
    time_column='DATE',
    value_column='VALUE'
)

# Explain Additive Model
additive_explainer = TimeSeriesExplainer(additive_model)
additive_explanation = additive_explainer.explain_additive_model(
    data=ts_df,
    time_column='DATE',
    value_column='VALUE'
)
```
