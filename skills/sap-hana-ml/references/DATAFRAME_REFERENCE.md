# SAP HANA DataFrame Reference

**Module**: `hana_ml.dataframe`
**Documentation**: https://help.sap.com/doc/1d0ebfe5e8dd44d09606814d83308d4b/2.0.07/en-US/hana_ml.dataframe.html

---

## ConnectionContext

Manages database connections to SAP HANA instances.

### Constructor

```python
from hana_ml import ConnectionContext

conn = ConnectionContext(
    address='hostname',          # HANA host
    port=443,                    # Port (443 for HANA Cloud)
    user='username',             # Database user
    password='password',         # Password
    encrypt=True,                # SSL encryption (required for Cloud)
    sslValidateCertificate=True, # Certificate validation
    autocommit=True              # Auto-commit transactions
)
```

### Connection Management Methods

| Method | Description |
|--------|-------------|
| `close()` | Terminate the database connection |
| `copy()` | Duplicate connection settings |
| `get_connection_id()` | Retrieve current connection identifier |
| `restart_session()` | Reinitialize the database session |
| `cancel_session_process()` | Stop running operations on current session |

### ABAP SQL Operations

| Method | Description |
|--------|-------------|
| `enable_abap_sql()` | Enable ABAP SQL execution mode |
| `disable_abap_sql()` | Disable ABAP SQL execution mode |

### Schema Operations

| Method | Description |
|--------|-------------|
| `create_schema(schema_name)` | Create a new schema |
| `has_schema(schema_name)` | Check if schema exists |
| `get_current_schema()` | Get current default schema |

### Table Operations

| Method | Description |
|--------|-------------|
| `create_table(table_name, table_structure)` | Create a new table |
| `drop_table(table_name)` | Delete a table |
| `has_table(table_name)` | Check if table exists |
| `get_tables(schema=None)` | List all tables |
| `create_virtual_table(name, source)` | Create virtual table reference |
| `table(name, schema=None)` | Create DataFrame from table |
| `add_primary_key(table_name, columns)` | Define primary keys on table |

### View Operations

| Method | Description |
|--------|-------------|
| `drop_view(view_name)` | Delete a view |

### Procedure Operations

| Method | Description |
|--------|-------------|
| `get_procedures(schema=None)` | List stored procedures |
| `drop_procedure(procedure_name)` | Delete a stored procedure |

### Temporary Table Management

| Method | Description |
|--------|-------------|
| `get_temporary_tables()` | List temporary tables |
| `clean_up_temporary_tables()` | Remove all temporary tables |

### System Information

| Method | Description |
|--------|-------------|
| `hana_version()` | Get full HANA version string |
| `hana_major_version()` | Get major version number |
| `is_cloud_version()` | Check if connected to HANA Cloud |

### SQL Execution

| Method | Description |
|--------|-------------|
| `sql(sql_string)` | Execute SQL, return DataFrame |
| `execute_sql(sql_string)` | Execute SQL without return |
| `explain_plan_statement(sql_string)` | Get query execution plan |

### Data Operations

| Method | Description |
|--------|-------------|
| `copy_to_data_lake(df, target)` | Export DataFrame to data lake |
| `to_sqlalchemy()` | Get SQLAlchemy connection object |

### Streaming Operations

| Method | Description |
|--------|-------------|
| `upsert_streams_data(table, data)` | Insert or update stream records |
| `update_streams_data(table, data)` | Modify stream records |

---

## DataFrame

Represents tabular data from HANA with lazy evaluation.

### Properties

| Property | Description |
|----------|-------------|
| `columns` | List of column names |
| `shape` | Tuple of (row_count, column_count) |
| `name` | Underlying table/view name |
| `quoted_name` | SQL-quoted table identifier |
| `description` | Column metadata |
| `description_ext` | Extended metadata |
| `geometries` | Geometry column names |
| `srids` | Spatial Reference IDs |
| `stats` | Statistical summaries |

### Data Selection

```python
# Select specific columns
df.select('COL1', 'COL2', 'COL3')

# Deselect columns
df.deselect('UNWANTED_COL')

# Get first/last rows
df.head(10)
df.tail(10)
df.to_head()  # Limit to first N rows
df.to_tail()  # Limit to last N rows
```

### Filtering

```python
# Simple filter
df.filter("AGE > 30")

# Multiple conditions
df.filter("AGE > 30 AND SALARY > 50000")

# Check for value existence
df.has('COLUMN', 'value')

# Remove duplicates
df.distinct()
df.drop_duplicates()

# Handle missing values
df.dropna()                    # Remove rows with NULL
df.dropna(subset=['COL1'])     # Only check specific columns
df.fillna(0)                   # Replace NULL with value
df.fillna({'COL1': 0, 'COL2': 'unknown'})  # Column-specific
```

### Data Transformation

```python
# Add columns
df.add_id('ROW_ID')                    # Add auto-increment ID
df.add_constant('NEW_COL', value=1)    # Add constant column

# Rename
df.alias('new_df_name')                # Rename DataFrame
df.rename_columns({'OLD': 'NEW'})      # Rename columns

# Type conversion
df.cast('COLUMN', 'DOUBLE')            # Cast to specific type
df.auto_cast()                         # Auto-detect types

# Column operations
df.split_column('FULL_NAME', ' ', ['FIRST', 'LAST'])
df.concat_columns(['FIRST', 'LAST'], 'FULL_NAME', delimiter=' ')

# Value replacement
df.nullif('COLUMN', 'NA')              # Replace value with NULL
df.replace('COLUMN', {'old': 'new'})   # Replace values
```

### Sorting

```python
df.sort('COLUMN', desc=True)
df.sort_values(['COL1', 'COL2'], ascending=[True, False])
df.sort_index()
```

### Aggregations

```python
# Basic aggregations
df.count()
df.min('COLUMN')
df.max('COLUMN')
df.sum('COLUMN')
df.mean('COLUMN')
df.median('COLUMN')
df.stddev('COLUMN')

# Custom aggregations
df.agg([
    ('SALARY', 'mean', 'AVG_SALARY'),
    ('SALARY', 'max', 'MAX_SALARY'),
    ('AGE', 'count', 'COUNT')
])

# Correlation
df.corr('COL1', 'COL2')

# Value counts
df.value_counts('CATEGORY')

# Pivot table
df.pivot_table(
    values='SALES',
    index='REGION',
    columns='QUARTER',
    aggfunc='sum'
)

# Descriptive statistics
df.summary()
df.describe()
```

### Join Operations

```python
# Inner join
df1.join(df2, condition='df1.ID = df2.ID')

# Left join
df1.join(df2, condition='df1.ID = df2.ID', how='left')

# Join types: 'inner', 'left', 'right', 'full'
```

### Set Operations

```python
# Union
df1.union(df2)

# Generic set operations
df1.set_operations(df2, operation='EXCEPT')      # Difference
df1.set_operations(df2, operation='INTERSECT')   # Intersection
```

### Data Output

```python
# Materialize to pandas
pdf = df.collect()

# Save to HANA table
df.save('NEW_TABLE', force=True)
df.save_nativedisktable('NATIVE_TABLE')

# Serialize
df.to_pickle('filename.pkl')

# Date conversion
df.to_datetime('DATE_COL', format='%Y-%m-%d')
```

### Feature Engineering

```python
# Binning
df.bin('COLUMN', bins=[0, 25, 50, 75, 100], labels=['Q1', 'Q2', 'Q3', 'Q4'])

# Generate features
df.generate_feature('NEW_COL', 'COL1 + COL2')

# Computed columns
df.mutate('NEW_COL', 'COL1 * COL2')

# Difference calculation
df.diff('COLUMN', periods=1)
```

### Data Quality

```python
# Check for empty
df.empty()

# Check for NULL values
df.hasna()

# Check for constant columns
df.has_constant_columns()
df.drop_constant_columns()

# Column type checking
df.is_numeric('COLUMN')
```

### Utility Methods

```python
# Configuration
df.set_name('new_name')
df.set_index('ID_COLUMN')
df.set_source_table('ORIGINAL_TABLE')

# Column reordering
df.rearrange(['COL3', 'COL1', 'COL2'])

# Schema inspection
df.get_table_structure()

# Drop columns
df.drop('UNWANTED_COL')

# Validation
df.enable_validate_columns()
df.disable_validate_columns()

# Type definitions
df.generate_table_type()
df.declare_lttab_usage()
```

---

## Utility Functions

### DataFrame Creation

```python
from hana_ml.dataframe import (
    create_dataframe_from_pandas,
    create_dataframe_from_spark,
    create_dataframe_from_shapefile
)

# From pandas
hdf = create_dataframe_from_pandas(
    conn,
    pandas_df,
    table_name='MY_TABLE',
    schema='MY_SCHEMA',
    force=True  # Overwrite if exists
)

# From Spark
hdf = create_dataframe_from_spark(conn, spark_df, table_name='MY_TABLE')

# From shapefile (geospatial)
hdf = create_dataframe_from_shapefile(conn, 'path/to/file.shp', table_name='GEO_TABLE')
```

### Data Import

```python
from hana_ml.dataframe import import_csv_from

# Import CSV
hdf = import_csv_from(
    conn,
    'path/to/file.csv',
    table_name='CSV_TABLE',
    delimiter=',',
    header=True
)
```

### Serialization

```python
from hana_ml.dataframe import read_pickle

# Read pickled DataFrame
hdf = read_pickle(conn, 'filename.pkl')
```

### Reshaping

```python
from hana_ml.dataframe import melt

# Unpivot DataFrame
melted = melt(
    df,
    id_vars=['ID', 'NAME'],
    value_vars=['Q1', 'Q2', 'Q3', 'Q4'],
    var_name='QUARTER',
    value_name='SALES'
)
```

### SQL Utilities

```python
from hana_ml.dataframe import quotename

# Safe SQL identifier quoting
safe_name = quotename('table-with-special-chars')
```

---

## Lazy Evaluation

HANA DataFrames use lazy evaluation - operations build SQL expressions without immediate execution.

```python
# These operations build SQL but don't execute
filtered = df.filter("AGE > 30")
selected = filtered.select('NAME', 'AGE')
sorted_df = selected.sort('AGE', desc=True)

# Only collect() triggers execution
result = sorted_df.collect()  # Returns pandas DataFrame
```

**Benefits**:
- Query optimization across chained operations
- Reduced data transfer
- Push computations to database
