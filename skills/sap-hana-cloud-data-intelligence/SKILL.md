---
name: sap-hana-cloud-data-intelligence
description: |
  Develops data processing pipelines, integrations, and machine learning scenarios in SAP Data Intelligence Cloud. Use when building graphs/pipelines with operators, integrating ABAP/S4HANA systems, creating replication flows, developing ML scenarios with JupyterLab, or using Data Transformation Language functions. Covers Gen1/Gen2 operators, subengines (Python, Node.js, C++), structured data operators, and repository objects.
license: MIT
---

# SAP HANA Cloud Data Intelligence Skill

This skill provides comprehensive guidance for developing with SAP Data Intelligence Cloud, including pipeline creation, operator development, data integration, and machine learning scenarios.

## When to Use This Skill

Use this skill when:

- Creating or modifying data processing graphs/pipelines
- Developing custom operators (Gen1 or Gen2)
- Integrating ABAP-based SAP systems (S/4HANA, BW)
- Building replication flows for data movement
- Developing ML scenarios with ML Scenario Manager
- Working with JupyterLab in Data Intelligence
- Using Data Transformation Language (DTL) functions
- Configuring subengines (Python, Node.js, C++)
- Working with structured data operators

## Core Concepts

### Graphs (Pipelines)

Graphs are networks of operators connected via typed input/output ports for data transfer.

**Two Generations:**
- **Gen1 Operators**: Legacy operators, broad compatibility
- **Gen2 Operators**: Enhanced error recovery, state management, snapshots

**Critical Rule**: Graphs cannot mix Gen1 and Gen2 operators - choose one generation per graph.

**Gen2 Advantages:**
- Automatic error recovery with snapshots
- State management with periodic checkpoints
- Native multiplexing (one-to-many, many-to-one)
- Improved Python3 operator

### Operators

Building blocks that process data within graphs. Each operator has:
- **Ports**: Typed input/output connections for data flow
- **Configuration**: Parameters that control behavior
- **Runtime**: Engine that executes the operator

**Operator Categories:**
1. Messaging (Kafka, MQTT, NATS)
2. Storage (Files, HDFS, S3, Azure, GCS)
3. Database (HANA, SAP BW, SQL)
4. Script (Python, JavaScript, R, Go)
5. Data Processing (Transform, Anonymize, Validate)
6. Machine Learning (TensorFlow, PyTorch, HANA ML)
7. Integration (OData, REST, SAP CPI)
8. Workflow (Pipeline, Data Workflow)

### Subengines

Subengines enable operators to run on different runtimes within the same graph.

**Supported Subengines:**
- **ABAP**: For ABAP Pipeline Engine operators
- **Python 3.9**: For Python-based operators
- **Node.js**: For JavaScript-based operators
- **C++**: For high-performance native operators

**Key Benefit**: Connected operators on the same subengine run in a single OS process for optimal performance.

**Trade-off**: Cross-engine communication requires serialization/deserialization overhead.

## Quick Start Patterns

### Basic Graph Creation

```
1. Open SAP Data Intelligence Modeler
2. Create new graph
3. Add operators from repository
4. Connect operator ports (matching types)
5. Configure operator parameters
6. Validate graph
7. Execute and monitor
```

### Replication Flow Pattern

```
1. Create replication flow in Modeler
2. Configure source connection (ABAP, HANA, etc.)
3. Configure target (HANA Cloud, S3, Kafka, etc.)
4. Add tasks with source objects
5. Define filters and mappings
6. Validate flow
7. Deploy to tenant repository
8. Run and monitor
```

**Delivery Guarantees:**
- Default: At-least-once (may have duplicates)
- With UPSERT to databases: Exactly-once
- For cloud storage: Use "Suppress Duplicates" option

### ML Scenario Pattern

```
1. Open ML Scenario Manager from launchpad
2. Create new scenario
3. Add datasets (register data sources)
4. Create Jupyter notebooks for experiments
5. Build training pipelines
6. Track metrics with Metrics Explorer
7. Version scenario for reproducibility
8. Deploy model pipeline
```

## Common Tasks

### ABAP System Integration

For integrating ABAP-based SAP systems:

1. **Prerequisites**: Configure Cloud Connector for on-premise systems
2. **Connection Setup**: Create ABAP connection in Connection Management
3. **Metadata Access**: Use Metadata Explorer for object discovery
4. **Data Sources**: CDS Views, ODP (Operational Data Provisioning), Tables

**Reference**: See `references/abap-integration.md` for detailed setup.

### Structured Data Processing

Use structured data operators for SQL-like transformations:

- **Data Transform**: Visual SQL editor for complex transformations
- **Aggregation Node**: GROUP BY with aggregation functions
- **Join Node**: INNER, LEFT, RIGHT, FULL joins
- **Projection Node**: Column selection and renaming
- **Union Node**: Combine multiple datasets
- **Case Node**: Conditional logic

**Reference**: See `references/structured-data-operators.md` for configuration.

### Data Transformation Language

DTL provides SQL-like functions for data processing:

**Function Categories:**
- String: CONCAT, SUBSTRING, UPPER, LOWER, TRIM, REPLACE
- Numeric: ABS, CEIL, FLOOR, ROUND, MOD, POWER
- Date/Time: ADD_DAYS, MONTHS_BETWEEN, EXTRACT, CURRENT_UTCTIMESTAMP
- Conversion: TO_DATE, TO_STRING, TO_INTEGER, TO_DECIMAL
- Miscellaneous: CASE, COALESCE, IFNULL, NULLIF

**Reference**: See `references/dtl-functions.md` for complete reference.

## Best Practices

### Graph Design

1. **Choose Generation Early**: Decide Gen1 vs Gen2 before building
2. **Minimize Cross-Engine Communication**: Group operators by subengine
3. **Use Appropriate Port Types**: Match data types for efficient transfer
4. **Enable Snapshots**: For Gen2 graphs, enable auto-recovery
5. **Validate Before Execution**: Always validate graphs

### Operator Development

1. **Start with Built-in Operators**: Use predefined operators first
2. **Extend When Needed**: Create custom operators for specific needs
3. **Use Script Operators**: For quick prototyping with Python/JS
4. **Version Your Operators**: Track changes with operator versions
5. **Document Configuration**: Describe all parameters

### Replication Flows

1. **Plan Target Schema**: Understand target structure requirements
2. **Use Filters**: Reduce data volume with source filters
3. **Handle Duplicates**: Configure for exactly-once when possible
4. **Monitor Execution**: Track progress and errors
5. **Clean Up Artifacts**: Remove source artifacts after completion

### ML Scenarios

1. **Version Early**: Create versions before major changes
2. **Track All Metrics**: Use SDK for comprehensive tracking
3. **Use Notebooks for Exploration**: JupyterLab for experimentation
4. **Productionize with Pipelines**: Convert notebooks to pipelines
5. **Export/Import for Migration**: Use ZIP export for transfers

## Error Handling

### Common Graph Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Port type mismatch | Incompatible data types | Use converter operator or matching types |
| Gen1/Gen2 mixing | Combined operator generations | Use single generation per graph |
| Resource exhaustion | Insufficient memory/CPU | Adjust resource requirements |
| Connection failure | Network or credentials | Verify connection settings |
| Validation errors | Invalid configuration | Review error messages, fix config |

### Recovery Strategies

**Gen2 Graphs:**
- Enable automatic recovery in graph settings
- Configure snapshot intervals
- Monitor recovery status

**Gen1 Graphs:**
- Implement manual error handling in operators
- Use try-catch in script operators
- Configure retry logic

## Reference Files

For detailed information, see:

- `references/operators-reference.md` - Complete operator catalog
- `references/abap-integration.md` - ABAP system integration guide
- `references/structured-data-operators.md` - Structured data processing
- `references/dtl-functions.md` - Data Transformation Language reference
- `references/ml-scenario-manager.md` - Machine learning guide
- `references/subengines.md` - Subengine development guide
- `references/graphs-pipelines.md` - Graph execution and monitoring

## Templates

Starter templates are available in `templates/`:

- `templates/basic-graph.json` - Simple data processing graph
- `templates/replication-flow.json` - Data replication pattern
- `templates/ml-training-pipeline.json` - ML training workflow

## Documentation Links

**Primary Sources:**
- GitHub Docs: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs
- SAP Help Portal: https://help.sap.com/docs/SAP_DATA_INTELLIGENCE
- SAP Developer Center: https://developers.sap.com/topics/data-intelligence.html

**Section-Specific:**
- Modeling Guide: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide
- ABAP Integration: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/abapintegration
- Machine Learning: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/machinelearning
- Function Reference: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/functionreference
- Repository Objects: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/repositoryobjects

## Version Information

- **Skill Version**: 1.0.0
- **Last Updated**: 2025-11-22
- **Documentation Source**: SAP-docs/sap-hana-cloud-data-intelligence (GitHub)
