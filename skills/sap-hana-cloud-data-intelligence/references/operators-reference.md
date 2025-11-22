# SAP Data Intelligence Operators Reference

Complete reference for built-in operators in SAP Data Intelligence.

## Table of Contents

1. [Operator Generations](#operator-generations)
2. [ABAP Operators](#abap-operators)
3. [File and Storage Operators](#file-and-storage-operators)
4. [Database Operators](#database-operators)
5. [Messaging Operators](#messaging-operators)
6. [Script Operators](#script-operators)
7. [Data Processing Operators](#data-processing-operators)
8. [Machine Learning Operators](#machine-learning-operators)
9. [Integration Operators](#integration-operators)
10. [Workflow Operators](#workflow-operators)

---

## Operator Generations

### Generation 1 (Gen1)

Legacy operators with broad compatibility.

**Characteristics:**
- Process-based execution
- Manual error handling
- Suitable for simpler workflows
- Compatible with older graphs

### Generation 2 (Gen2)

Enhanced operators with advanced features.

**Characteristics:**
- Improved error recovery
- State management with snapshots
- Native multiplexing support
- Better performance characteristics

**Gen2 Exclusive Features:**
- Automatic graph recovery from failures
- Periodic state checkpoints
- Structured native message streaming
- Enhanced Python3 operator

**Critical Rule:** Gen1 and Gen2 operators cannot be mixed in the same graph.

---

## ABAP Operators

Operators for integrating ABAP-based SAP systems.

### ABAP CDS Reader

Reads data from ABAP CDS views.

**Configuration:**
- Connection: ABAP system connection
- CDS View: Target view name
- Selection: Filter criteria
- Package Size: Batch size for reading

**Ports:**
- Output: CDS view data

### ABAP Table Reader

Reads data from ABAP tables.

**Configuration:**
- Connection: ABAP system connection
- Table: Target table name
- Fields: Column selection
- Where Clause: Filter condition

### SLT Connector

Connects to SAP Landscape Transformation for real-time replication.

**Configuration:**
- Mass Transfer ID: SLT configuration
- Table: Source table
- Initial Load: Enable/disable full load
- Delta Load: Enable/disable CDC

### ODP Consumer

Consumes Operational Data Provisioning sources.

**Configuration:**
- Connection: ABAP connection
- ODP Context: Extraction context (SAPI, ABAP CDS, etc.)
- ODP Name: Data provider name
- Extraction Mode: Full or Delta

---

## File and Storage Operators

### Binary File Consumer

Reads binary files from storage.

**Configuration:**
- Connection: Storage connection
- Path: File path pattern
- Recursive: Include subdirectories

**Output:** Binary content

### Binary File Producer

Writes binary content to files.

**Configuration:**
- Connection: Storage connection
- Path: Output file path
- Mode: Overwrite, Append, or Fail if exists

### Structured File Consumer

Reads structured data from files (CSV, Parquet, ORC, JSON).

**Configuration:**
- Connection: Storage connection
- Source: File path or pattern
- Format: CSV, Parquet, ORC, JSON
- Schema: Column definitions

### Structured File Producer

Writes structured data to files.

**Configuration:**
- Connection: Storage connection
- Target: Output path
- Format: CSV, Parquet, ORC, JSON
- Partition: Partitioning strategy

### Cloud Storage Operators

**Amazon S3:**
- S3 Consumer: Read from S3 buckets
- S3 Producer: Write to S3 buckets

**Azure Blob/ADLS:**
- Azure Blob Consumer/Producer
- ADLS Gen2 Consumer/Producer

**Google Cloud Storage:**
- GCS Consumer: Read from GCS buckets
- GCS Producer: Write to GCS buckets

**HDFS:**
- HDFS Consumer: Read from Hadoop clusters
- HDFS Producer: Write to Hadoop clusters

---

## Database Operators

### SAP HANA Operators

**HANA Client:**
- Executes SQL statements
- Supports DDL, DML, queries

**Table Consumer:**
- Reads from HANA tables
- Supports filtering and projection

**Table Producer:**
- Writes to HANA tables
- Supports INSERT, UPSERT, DELETE

**Flowgraph Executor:**
- Runs HANA calculation views
- Executes stored procedures

### SQL Operators

**SQL Consumer:**
- Executes SELECT queries
- Supports parameterized queries

**SQL Executor:**
- Runs DDL/DML statements
- Returns affected row count

### Supported Databases

- SAP HANA (Cloud and on-premise)
- SAP BW/4HANA
- Microsoft SQL Server
- Oracle Database
- PostgreSQL
- MySQL
- SAP IQ/Sybase

---

## Messaging Operators

### Kafka Operators

**Kafka Consumer:**
- Subscribes to Kafka topics
- Supports consumer groups
- Offset management (earliest, latest, committed)

**Kafka Producer:**
- Publishes to Kafka topics
- Key/value serialization
- Partitioning strategies

### MQTT Operators

**MQTT Consumer:**
- Subscribes to MQTT topics
- QoS level configuration

**MQTT Producer:**
- Publishes MQTT messages
- Retain flag support

### Additional Messaging

- **NATS**: Lightweight messaging
- **WAMP**: Web Application Messaging Protocol
- **AWS SNS**: Amazon Simple Notification Service
- **SAP Event Mesh**: SAP cloud messaging

---

## Script Operators

### Python Operator (Gen2)

Execute Python code within graphs.

**Configuration:**
- Script: Python code
- Codelanguage: python36 or python39

**Example:**
```python
def on_input(msg_id, header, body):
    # Process input
    result = transform(body)
    api.send("output", api.Message(result))

api.set_port_callback("input", on_input)
```

### JavaScript Operator

Execute JavaScript/Node.js code.

**Configuration:**
- Script: JavaScript code

**Example:**
```javascript
$.setPortCallback("input", function(ctx, s) {
    var result = process(s);
    $.output(result);
});
```

### R Operator

Execute R scripts for statistical analysis.

**Configuration:**
- Script: R code
- Libraries: Required R packages

### Go Operator

Execute Go code for high-performance processing.

---

## Data Processing Operators

### Data Transform

Visual SQL-like transformation editor.

**Nodes:**
- Projection: Column selection/transformation
- Aggregation: GROUP BY with functions
- Join: Combine datasets
- Union: Merge datasets
- Case: Conditional logic
- Filter: Row filtering

### Data Quality Operators

**Validation Rule:**
- Define data quality rules
- Generate validation reports

**Anonymization:**
- Mask sensitive data
- Hash, shuffle, or generalize

**Data Mask:**
- Apply masking patterns
- Preserve format while anonymizing

### Conversion Operators

**Type Converters:**
- Binary to Table
- Table to Binary
- Dynamic to Static
- Static to Dynamic

**Format Converters:**
- JSON Parser/Formatter
- CSV Parser/Formatter
- Avro Encoder/Decoder

---

## Machine Learning Operators

### TensorFlow Operators

**TensorFlow Training:**
- Train TensorFlow models
- Distributed training support

**TensorFlow Serving:**
- Deploy TensorFlow models
- REST API inference

### PyTorch Operators

**PyTorch Training:**
- Train PyTorch models
- GPU acceleration

### HANA ML Operators

**HANA ML Training:**
- Train models in HANA
- Automated ML (AutoML)

**HANA ML Inference:**
- Score data with HANA ML models

### Metrics Operators

**Submit Metrics:**
- Track training metrics
- Integration with Metrics Explorer

---

## Integration Operators

### OData Operators

**OData Consumer:**
- Query OData services
- Supports v2 and v4

**OData Producer:**
- Expose data as OData
- CRUD operations

### REST API Operators

**REST Client:**
- Call REST APIs
- Configurable HTTP methods
- Header/body templates

**OpenAPI Client:**
- Generate clients from OpenAPI specs
- Automatic request/response handling

### SAP Integration

**SAP CPI Operator:**
- Trigger SAP Cloud Platform Integration flows

**SAP Application Consumer/Producer:**
- Connect to SAP applications
- S/4HANA, ECC, SuccessFactors

---

## Workflow Operators

### Data Workflow Operators

**Workflow Trigger:**
- Start workflow execution
- Scheduled or event-based

**Workflow Terminator:**
- End workflow with status

**Pipeline Executor:**
- Run child pipelines
- Pass parameters

### Control Flow

**BW Process Chain:**
- Execute SAP BW process chains

**Data Services Job:**
- Run SAP Data Services jobs

**HANA Flowgraph:**
- Execute HANA calculation views

### Notification

**Email Notification:**
- Send status emails
- Configurable templates

---

## Documentation Links

- **Operators Reference**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/repositoryobjects/data-intelligence-operators
- **Graphs Reference**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/repositoryobjects/data-intelligence-graphs

---

**Last Updated**: 2025-11-22
