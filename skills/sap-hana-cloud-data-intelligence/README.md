# SAP HANA Cloud Data Intelligence Skill

Production-ready Claude Code skill for SAP Data Intelligence Cloud development.

## Overview

This skill enables efficient development of data processing pipelines, integrations, and machine learning scenarios in SAP Data Intelligence Cloud. It provides comprehensive guidance for operators, graphs, ABAP integration, replication flows, and ML workflows.

## Keywords

### Core Technologies
- SAP Data Intelligence
- SAP DI
- SAP DI Cloud
- Data Intelligence Cloud
- SAP HANA Cloud Data Intelligence
- DI Modeler
- Data Intelligence Modeler

### Data Processing
- data pipeline
- data processing graph
- data transformation
- data integration
- ETL
- ELT
- data flow
- data replication
- data extraction
- change data capture
- CDC
- batch processing
- real-time processing
- stream processing

### Operators
- Gen1 operators
- Gen2 operators
- Generation 1 operators
- Generation 2 operators
- Python operator
- JavaScript operator
- script operator
- custom operator
- ABAP operator
- structured data operator
- data transform operator
- file consumer
- file producer
- table consumer
- table producer
- SQL consumer
- Kafka consumer
- Kafka producer

### Graphs and Pipelines
- graph execution
- pipeline execution
- graph monitoring
- pipeline monitoring
- graph scheduling
- cron schedule
- error recovery
- automatic recovery
- snapshot
- state management
- operator ports
- port types
- data types

### ABAP Integration
- ABAP integration
- ABAP CDS
- CDS views
- ODP
- Operational Data Provisioning
- SLT
- SAP Landscape Transformation
- ABAP Pipeline Engine
- S/4HANA integration
- SAP BW integration
- BW/4HANA
- Cloud Connector
- ABAP connection

### Replication
- replication flow
- data replication
- initial load
- delta load
- full load
- UPSERT
- exactly-once
- at-least-once
- target mapping
- source artifacts

### Machine Learning
- ML Scenario Manager
- machine learning
- JupyterLab
- Jupyter notebook
- Python SDK
- metrics tracking
- Metrics Explorer
- training pipeline
- inference pipeline
- model deployment
- model versioning
- experiment tracking

### Subengines
- subengine
- Python subengine
- Node.js subengine
- C++ subengine
- FlowAgent
- ABAP subengine

### Data Transformation Language
- DTL
- Data Transformation Language
- DTL functions
- string functions
- numeric functions
- date functions
- type conversion

### Structured Data
- structured file consumer
- structured file producer
- structured SQL consumer
- structured table producer
- SAP application consumer
- SAP application producer
- Data Transform
- aggregation node
- join node
- projection node
- union node
- case node

### Storage and Messaging
- S3
- Amazon S3
- Azure Blob
- Azure Data Lake
- ADLS
- Google Cloud Storage
- GCS
- HDFS
- Hadoop
- Kafka
- MQTT
- NATS
- SAP Event Mesh

### Databases
- SAP HANA
- HANA Cloud
- SAP BW
- SQL Server
- Oracle
- PostgreSQL
- MySQL
- SAP IQ

### Error Messages
- port type mismatch
- operator failed
- graph failed
- connection error
- validation error
- Gen1 Gen2 mixing
- snapshot recovery
- execution failed

## Installation

### Claude Code CLI

Add to your project:

```bash
# Create skills directory
mkdir -p ~/.claude/skills

# Copy skill
cp -r sap-hana-cloud-data-intelligence ~/.claude/skills/
```

### Global Installation

Add to Claude Code configuration:

```json
{
  "skills": [
    {
      "path": "/path/to/sap-hana-cloud-data-intelligence"
    }
  ]
}
```

## Usage Examples

### Creating a Data Pipeline

```
Create a SAP Data Intelligence graph that reads CSV files from S3,
transforms the data, and loads it into HANA Cloud.
```

### ABAP Integration

```
Set up ABAP integration to extract data from S/4HANA CDS views
via Cloud Connector.
```

### ML Scenario

```
Create an ML scenario in SAP Data Intelligence with JupyterLab
for training a classification model.
```

### Replication Flow

```
Build a replication flow from SAP BW to HANA Cloud with delta loading.
```

## Skill Contents

```
sap-hana-cloud-data-intelligence/
├── SKILL.md                          # Main skill file
├── README.md                         # This file
├── PROGRESS_TRACKING.md              # Documentation coverage
├── references/
│   ├── operators-reference.md        # Complete operator catalog
│   ├── abap-integration.md           # ABAP integration guide
│   ├── dtl-functions.md              # DTL function reference
│   ├── structured-data-operators.md  # Structured data guide
│   ├── ml-scenario-manager.md        # ML development guide
│   ├── subengines.md                 # Subengine development
│   └── graphs-pipelines.md           # Graph execution guide
└── templates/
    └── (pipeline templates)
```

## Documentation Sources

This skill extracts information from official SAP documentation:

- **GitHub Repository**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence
- **SAP Help Portal**: https://help.sap.com/docs/SAP_DATA_INTELLIGENCE
- **SAP Developer Center**: https://developers.sap.com/topics/data-intelligence.html

### Documentation Sections Covered

| Section | Files | Topics |
|---------|-------|--------|
| ABAP Integration | 19 | S/4HANA, BW, Cloud Connector |
| Function Reference | 80 | DTL functions |
| Machine Learning | 30+ | ML Scenario Manager, JupyterLab |
| Modeling Guide | 200+ | Operators, graphs, workflows |
| Repository Objects | 400+ | Operators, graph templates |

**Total Files Analyzed**: 700+

## Maintenance

### Updating the Skill

1. Check GitHub repo for updates
2. Review PROGRESS_TRACKING.md for coverage
3. Update relevant reference files
4. Test skill discovery

### Version History

- **1.0.0** (2025-11-22): Initial release

## License

MIT License - See LICENSE file for details.

## Contributing

Contributions welcome! Please follow the skill creation guidelines in the main repository.

## Related Skills

- `sap-cap` - SAP Cloud Application Programming Model
- `sap-fiori-elements` - SAP Fiori Elements development
- `sap-btp` - SAP Business Technology Platform
- `sap-hana-db` - SAP HANA database development

---

**Last Updated**: 2025-11-22
**Maintainer**: SAP Skills Maintainers
**Repository**: https://github.com/secondsky/sap-skills
