# Data Acquisition and Preparation Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Acquiring-Preparing-Modeling-Data/Acquiring-and-Preparing-Data-in-the-Data-Builder

---

## Table of Contents

1. [Data Flows](#data-flows)
2. [Replication Flows](#replication-flows)
3. [Transformation Flows](#transformation-flows)
4. [Local Tables](#local-tables)
5. [Remote Tables](#remote-tables)
6. [Task Chains](#task-chains)
7. [Python Operators](#python-operators)
8. [Data Transformation](#data-transformation)
9. [Semantic Onboarding](#semantic-onboarding)
10. [File Spaces and Object Store](#file-spaces-and-object-store)

---

## Data Flows

Data flows provide ETL capabilities for data transformation and loading.

### Prerequisites

**Required Privileges**:
- Data Warehouse General (`-R------`) - SAP Datasphere access
- Connection (`-R------`) - Read connections
- Data Warehouse Data Builder (`CRUD----`) - Create/edit/delete flows
- Space Files (`CRUD----`) - Manage space objects
- Data Warehouse Data Integration (`-RU-----`) - Run flows
- Data Warehouse Data Integration (`-R--E---`) - Schedule flows

### Creating a Data Flow

1. Navigate to Data Builder
2. Select "New Data Flow"
3. Add source operators
4. Add transformation operators
5. Add target operator
6. Save and deploy

### Key Limitations

- **No delta processing**: Use replication flows for delta/CDC data instead
- **Single target table** only per data flow
- **Local tables only**: Data flows load exclusively to local tables in the repository
- **Double quotes unsupported** in identifiers (column/table names)
- **Spatial data types** not supported
- **ABAP source preview** unavailable (except CDS views and LTR objects)
- **Transformation operators** cannot be previewed

### Advanced Properties

**Dynamic Memory Allocation**:
| Setting | Memory Range | Use Case |
|---------|--------------|----------|
| Small | 1-2 GB | Low volume |
| Medium | 2-3 GB | Standard volume |
| Large | 3-5 GB | High volume |

**Additional Options**:
- Automatic restart on failure
- Input parameters support

### Data Flow Operators

**Source Operators**:
- Remote tables
- Local tables
- Views
- CSV files

**Transformation Operators**:

| Operator | Purpose | Configuration |
|----------|---------|---------------|
| Join | Combine sources | Join type, conditions |
| Union | Stack sources | Column mapping |
| Projection | Select columns | Include/exclude, rename |
| Filter | Row filtering | Filter conditions |
| Aggregation | Group and aggregate | Group by, aggregates |
| Script | Custom Python | Python code |
| Calculated Column | Derived values | Expression |

**Target Operators**:
- Local table (new or existing)
- Truncate and insert or delta merge

### Join Operations

**Join Types**:
- Inner Join: Matching rows only
- Left Outer: All left + matching right
- Right Outer: All right + matching left
- Full Outer: All rows from both
- Cross Join: Cartesian product

**Join Conditions**:
```
source1.column = source2.column
```

### Aggregation Operations

**Aggregate Functions**:
- SUM, AVG, MIN, MAX
- COUNT, COUNT DISTINCT
- FIRST, LAST

### Calculated Columns

**Expression Syntax**:
```sql
CASE WHEN column1 > 100 THEN 'High' ELSE 'Low' END
CONCAT(first_name, ' ', last_name)
ROUND(amount * exchange_rate, 2)
```

### Input Parameters

Define runtime parameters for dynamic filtering:

**Parameter Types**:
- String
- Integer
- Date
- Timestamp

**Usage in Expressions**:
```sql
WHERE region = :IP_REGION
```

### Running Data Flows

**Execution Options**:
- Manual run from Data Builder
- Scheduled via task chain
- API trigger

**Run Modes**:
- Full: Process all data
- Delta: Process changes only (requires delta capture)

---

## Replication Flows

Replicate data from source systems to SAP Datasphere or external targets.

### Creating a Replication Flow

1. Navigate to Data Builder
2. Select "New Replication Flow"
3. Add source connection and objects
4. Add target connection
5. Configure load type and mappings
6. Save and deploy

### Source Systems

**SAP Sources**:
- SAP S/4HANA Cloud (ODP, CDS views)
- SAP S/4HANA On-Premise (ODP, SLT, CDS)
- SAP BW/4HANA
- SAP ECC
- SAP HANA

**Cloud Storage Sources**:
- Amazon S3
- Azure Blob Storage
- Google Cloud Storage
- SFTP

**Streaming Sources**:
- Apache Kafka
- Confluent Kafka

### Target Systems

**SAP Datasphere Targets**:
- Local tables (managed by replication flow)

**External Targets**:
- Apache Kafka
- Confluent Kafka
- Google BigQuery
- Amazon S3
- Azure Blob Storage
- Google Cloud Storage
- SFTP
- SAP Signavio

### Load Types

| Load Type | Description | Use Case |
|-----------|-------------|----------|
| Initial Only | One-time full load | Static data |
| Initial + Delta | Full load then changes | Standard replication |
| Real-Time | Continuous streaming | Live data |

### Configuration Options

**Flow-Level Properties**:
| Property | Description | Default |
|----------|-------------|---------|
| Delta Load Frequency | Interval for delta changes | Configurable |
| Skip Unmapped Target Columns | Ignore unmapped columns | Optional |
| Merge Data Automatically | Auto-merge for file space targets | Requires consent |
| Source Thread Limit | Parallel threads for source (1-160) | 16 |
| Target Thread Limit | Parallel threads for target (1-160) | 16 |
| Content Type | Template or Native format | Template |

**Object-Level Properties**:
| Property | Description |
|----------|-------------|
| Load Type | Initial Only, Initial+Delta, Delta Only |
| Delta Capture | Enable CDC tracking |
| ABAP Exit | Custom projection logic |
| Object Thread Count | Thread count for delta operations |
| Delete Before Load | Clear target before loading |

**Filters**:
- Define row-level filters on source
- Multiple filter conditions with AND/OR
- **Important**: For ODP-CDS, filters must apply to primary key fields only

**Mappings**:
- Automatic column mapping
- Manual mapping overrides
- Exclude columns

**Projections**:
- Custom SQL expressions
- Column transformations
- Calculated columns
- ABAP Exit for custom projection logic

### Sizing and Performance

**Thread Configuration**:
- Source/Target Thread Limits: 1-160 (default: 16)
- Higher values = more parallelism but more resources
- Consider source system capacity

**Capacity Planning**:
- Estimate data volume per table
- Consider network bandwidth
- Plan for parallel execution
- RFC fast serialization (SAP Note 3486245) for improved performance

**Load Balancing**:
- Distribute across multiple flows
- Schedule during off-peak hours
- Monitor resource consumption

### Unsupported Data Types

- BLOB, CLOB (large objects)
- Spatial data types
- Custom ABAP types
- Virtual Tables (SAP HANA Smart Data Access)
- Row Tables (use COLUMN TABLE only)

---

## Transformation Flows

Delta-aware transformations with automatic change propagation.

### Creating a Transformation Flow

1. Navigate to Data Builder
2. Select "New Transformation Flow"
3. Add source (view or graphical view)
4. Add target table
5. Configure run settings
6. Save and deploy

### Source Options

- Graphical view (created inline)
- SQL view (created inline)
- Existing views

### Target Table Management

**Options**:
- Create new local table
- Use existing local table

**Column Handling**:
- Add new columns automatically
- Map columns manually
- Exclude columns

### Run Modes

| Mode | Action | Use Case |
|------|--------|----------|
| Start | Process delta changes | Regular runs |
| Delete | Remove target records | Cleanup |
| Truncate | Clear and reload | Full refresh |

### Delta Processing

Transformation flows track changes automatically:
- Insert: New records
- Update: Modified records
- Delete: Removed records

### File Space Transformations

Transform data in object store (file spaces):

**Supported Functions**:
- String functions
- Numeric functions
- Date functions
- Conversion functions

---

## Local Tables

Store data directly in SAP Datasphere.

### Creating Local Tables

**Methods**:
1. Data Builder > New Table
2. Import from CSV
3. Create from data flow target
4. Create from replication flow target

### Table Properties

**Key Columns**:
- Primary key definition
- Unique constraints

**Data Types**:
- String (VARCHAR)
- Integer (INT, BIGINT)
- Decimal (DECIMAL)
- Date, Time, Timestamp
- Boolean
- Binary

### Partitioning

**Partition Types**:
- Range partitioning (date/numeric)
- Hash partitioning

**Benefits**:
- Improved query performance
- Parallel processing
- Selective data loading

### Delta Capture

Enable change tracking for incremental processing:

1. Enable delta capture on table
2. Track insert/update/delete operations
3. Query changes with delta tokens

### Data Maintenance

**Operations**:
- Insert records
- Update records
- Delete records
- Truncate table
- Load from file

### Local Table (File)

Store data in object store:

**Supported Formats**:
- Parquet
- CSV
- JSON

**Use Cases**:
- Large datasets
- Cost-effective storage
- Integration with data lakes

---

## Remote Tables

Virtual access to external data without copying.

### Importing Remote Tables

1. Select connection in source browser
2. Choose tables/views to import
3. Configure import settings
4. Deploy remote table

### Data Access Modes

| Mode | Description | Performance |
|------|-------------|-------------|
| Remote | Query source directly | Network dependent |
| Replicated | Copy to local storage | Fast queries |

### Replication Options

**Full Replication**:
- Copy all data
- Scheduled refresh

**Real-Time Replication**:
- Continuous change capture
- Near real-time updates

**Partitioned Replication**:
- Divide data into partitions
- Parallel loading

### Remote Table Properties

**Statistics**:
- Create statistics for query optimization
- Update statistics periodically

**Filters**:
- Define partitioning filters
- Limit data volume

---

## Task Chains

Orchestrate multiple data integration tasks.

### Creating Task Chains

1. Navigate to Data Builder
2. Select "New Task Chain"
3. Add task nodes
4. Configure dependencies
5. Save and deploy

### Supported Task Types

**Repository Objects**:
| Task Type | Activity | Description |
|-----------|----------|-------------|
| Remote Tables | Replicate | Replicate remote table data |
| Views | Persist | Persist view data to storage |
| Intelligent Lookups | Run | Execute intelligent lookup |
| Data Flows | Run | Execute data flow |
| Replication Flows | Run | Run with load type *Initial Only* |
| Transformation Flows | Run | Execute transformation flow |
| Local Tables | Delete Records | Delete records with Change Type "Deleted" |
| Local Tables (File) | Merge | Merge delta files |
| Local Tables (File) | Optimize | Compact files |
| Local Tables (File) | Delete Records | Remove data |

**Non-Repository Objects**:
| Task Type | Description |
|-----------|-------------|
| Open SQL Procedure | Execute SAP HANA schema procedures |
| BW Bridge Process Chain | Run SAP BW Bridge processes |

**Toolbar-Only Objects**:
| Task Type | Description |
|-----------|-------------|
| API Task | Call external REST APIs |
| Notification Task | Send email notifications |

**Nested Objects**:
| Task Type | Description |
|-----------|-------------|
| Task Chain | Reference locally-created or shared task chains |

### Execution Control

**Sequential Execution**:
- Tasks run one after another
- Succeeding task runs only when previous completes with *completed* status
- Failure stops chain execution

**Parallel Execution**:
- Multiple branches run simultaneously
- Completion condition options:
  - **ANY**: Succeeds when any parallel task completes
  - **ALL**: Succeeds only when all parallel tasks complete
- Synchronization at join points

**Layout Options**:
- Top-Bottom orientation
- Left-Right orientation
- Drag tasks to reorder

**Apache Spark Settings**:
- Override default Apache Spark Application Settings per task
- Configure memory and executor settings

### Input Parameters

Pass parameters to task chain tasks:

**Parameter Definition**:
```yaml
name: region
type: string
default: "US"
```

**Parameter Usage**:
- Pass to data flows
- Use in filters
- Dynamic configuration

### Scheduling

**Simple Schedule**:
- Daily, weekly, monthly
- Specific time

**Cron Expression**:
```
0 0 6 * * ?   # Daily at 6 AM
0 0 */4 * * ? # Every 4 hours
```

### Email Notifications

Configure notifications for:
- Success
- Failure
- Warning

---

## Python Operators

Custom data processing with Python.

### Creating Python Operators

1. Add Script operator to data flow
2. Define input/output ports
3. Write Python code
4. Configure execution

### Python Script Structure

```python
def transform(data):
    """
    Transform input data.

    Args:
        data: pandas DataFrame

    Returns:
        pandas DataFrame
    """
    # Your transformation logic
    result = data.copy()
    result['new_column'] = result['existing'].apply(my_function)
    return result
```

### Available Libraries

- pandas
- numpy
- scipy
- scikit-learn
- datetime

### Best Practices

- Keep transformations simple
- Handle null values explicitly
- Log errors appropriately
- Test with sample data

---

## Data Transformation

Column-level transformations in graphical views.

### Text Transformations

| Function | Description | Example |
|----------|-------------|---------|
| Change Case | Upper/lower/title | UPPER(name) |
| Concatenate | Join columns | CONCAT(first, last) |
| Extract | Substring | SUBSTRING(text, 1, 5) |
| Split | Divide by delimiter | SPLIT(full_name, ' ') |
| Find/Replace | Text substitution | REPLACE(text, 'old', 'new') |

### Numeric Transformations

| Function | Description |
|----------|-------------|
| ROUND | Round to precision |
| FLOOR | Round down |
| CEIL | Round up |
| ABS | Absolute value |
| MOD | Modulo operation |

### Date Transformations

| Function | Description |
|----------|-------------|
| YEAR | Extract year |
| MONTH | Extract month |
| DAY | Extract day |
| DATEDIFF | Date difference |
| ADD_DAYS | Add days to date |

### Filter Operations

```sql
-- Numeric filter
amount > 1000

-- Text filter
region IN ('US', 'EU', 'APAC')

-- Date filter
order_date >= '2024-01-01'

-- Null handling
customer_name IS NOT NULL
```

---

## Semantic Onboarding

Import objects with business semantics from SAP systems.

### SAP S/4HANA Import

Import CDS views with annotations:
- Semantic types (currency, unit)
- Associations
- Hierarchies
- Text relationships

### SAP BW/4HANA Import

Import BW objects:
- InfoObjects
- CompositeProviders
- Queries
- Analysis Authorizations

### Import Process

1. Select source connection
2. Browse available objects
3. Select objects to import
4. Review semantic mapping
5. Deploy imported objects

---

## File Spaces and Object Store

Store and process data in object store.

### Creating File Spaces

1. System > Configuration > Spaces
2. Create new file space
3. Configure object store connection
4. Set storage limits

### Data Loading

**Supported Formats**:
- Parquet (recommended)
- CSV
- JSON

**Loading Methods**:
- Replication flows
- Transformation flows
- API upload

### In-Memory Acceleration

Enable in-memory storage for faster queries:

1. Select table/view
2. Enable in-memory storage
3. Configure refresh schedule

### Premium Outbound Integration

Export data to external systems:
- Configure outbound connection
- Schedule exports
- Monitor transfer status

---

## Documentation Links

- **Data Flows**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/e30fd14
- **Replication Flows**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7
- **Transformation Flows**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/f7161e6
- **Task Chains**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/d1afbc2

---

**Last Updated**: 2025-11-22
