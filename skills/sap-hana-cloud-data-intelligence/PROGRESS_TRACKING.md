# SAP HANA Cloud Data Intelligence Skill - Documentation Extraction Progress

**Created**: 2025-11-22
**Last Updated**: 2025-11-22
**Status**: In Progress

---

## Documentation Source

**Repository**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence
**Branch**: main
**Last Checked**: 2025-11-22

---

## Repository Structure Overview

The documentation is organized into 5 main sections under `/docs`:

```
docs/
├── abapintegration/          # ABAP integration with SAP Data Intelligence
├── functionreference/        # Data Transformation Language functions
├── machinelearning/          # ML Scenario Manager and JupyterLab
├── modelingguide/            # Core modeling guide (largest section)
└── repositoryobjects/        # Operators and graphs reference
```

---

## Extraction Status by Section

### 1. ABAP Integration (`/docs/abapintegration`)
**URL**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/abapintegration
**Status**: ✅ Completed
**Total Files**: 19 (1 index + 18 in user-guide)

#### Files Processed:

**Root Files:**
- [x] `index.md` - Section index

**User Guide for ABAP Integration (18 files):**
- [x] `user-guide-for-abap-integration-in-sap-data-intelligence-8b287f0.md` - Main guide
- [x] `integrating-abap-based-sap-systems-in-sap-data-intelligence-cloud-1194e77.md` - Integration overview
- [x] `accessing-the-data-from-abap-based-sap-systems-e1b91f6.md` - Data access patterns
- [x] `accessing-the-metadata-of-supported-objects-7280917.md` - Metadata access
- [x] `cds-views-15805a3.md` - CDS view integration
- [x] `creating-a-custom-abap-operator-761715f.md` - Custom ABAP operators
- [x] `data-type-mapping-and-conversion-ac9a8e3.md` - Data type mappings
- [x] `establishing-a-connection-using-cloud-connector-e9f41d6.md` - Cloud Connector setup
- [x] `information-for-system-administration-188dfd9.md` - Admin information
- [x] `installation-related-information-d61a662.md` - Installation guide
- [x] `loading-and-replicating-data-from-abap-cds-views-in-sap-s-4hana-55b2a17.md` - S/4HANA replication
- [x] `odp-657daa0.md` - Operational Data Provisioning
- [x] `security-information-0192869.md` - Security guidelines
- [x] `setting-up-connections-0e448a4.md` - Connection setup
- [x] `tables-a100788.md` - Table integration
- [x] `troubleshooting-7459834.md` - Troubleshooting guide
- [x] `useful-sap-notes-and-blogs-194ee0b.md` - SAP Notes references
- [x] `working-with-operators-based-on-the-abap-language-4a78402.md` - ABAP operators

**Key Topics Extracted:**
- ABAP system integration with SAP Data Intelligence Cloud
- Cloud Connector configuration for on-premise ABAP systems
- CDS views and ODP (Operational Data Provisioning)
- Data type mapping between ABAP and SAP Data Intelligence
- Custom ABAP operator development
- S/4HANA data replication
- Security and administration
- Troubleshooting common issues

---

### 2. Function Reference (`/docs/functionreference`)
**URL**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/functionreference
**Status**: ✅ Completed
**Total Files**: 80 (1 index + 79 function docs)

#### Files Processed:

**Root Files:**
- [x] `index.md` - Section index

**Data Transformation Language Functions (79 files):**

**Overview:**
- [x] `function-reference-for-data-transformation-language-d1a49cf.md` - Main reference

**Data Type Conversion Functions:**
- [x] `data-type-conversion-functions-f9f7e4f.md` - Overview
- [x] `to-date-cbc3749.md` - TO_DATE function
- [x] `to-datetime-a371ba8.md` - TO_DATETIME function
- [x] `to-decimal-c188657.md` - TO_DECIMAL function
- [x] `to-floating-77b2c3b.md` - TO_FLOATING function
- [x] `to-integer-98c3740.md` - TO_INTEGER function
- [x] `to-string-7ea634a.md` - TO_STRING function
- [x] `to-time-7318755.md` - TO_TIME function

**Date and Time Functions:**
- [x] `date-and-time-functions-78861ad.md` - Overview
- [x] `add-days-9ef2c5d.md` - ADD_DAYS
- [x] `add-months-c700452.md` - ADD_MONTHS
- [x] `add-seconds-07d92a2.md` - ADD_SECONDS
- [x] `add-years-f76cf4a.md` - ADD_YEARS
- [x] `current-utcdate-8a4a427.md` - CURRENT_UTCDATE
- [x] `current-utctime-64ef3d5.md` - CURRENT_UTCTIME
- [x] `current-utctimestamp-42bfc3c.md` - CURRENT_UTCTIMESTAMP
- [x] `dayname-78b38ca.md` - DAYNAME
- [x] `dayofmonth-6142537.md` - DAYOFMONTH
- [x] `dayofyear-2e09be9.md` - DAYOFYEAR
- [x] `days-between-1e58b27.md` - DAYS_BETWEEN
- [x] `extract-3593ad3.md` - EXTRACT
- [x] `hour-0732e6b.md` - HOUR
- [x] `isoweek-562c68e.md` - ISOWEEK
- [x] `last-day-4e09ec2.md` - LAST_DAY
- [x] `minute-4c87b5d.md` - MINUTE
- [x] `month-7358101.md` - MONTH
- [x] `monthname-2a14708.md` - MONTHNAME
- [x] `months-between-86d7e16.md` - MONTHS_BETWEEN
- [x] `next-day-285bbf3.md` - NEXT_DAY
- [x] `quarter-3cfd283.md` - QUARTER
- [x] `second-fc7dd2c.md` - SECOND
- [x] `seconds-between-b085a5c.md` - SECONDS_BETWEEN
- [x] `week-d8f4fa2.md` - WEEK
- [x] `year-d3c9e16.md` - YEAR
- [x] `years-between-3ccb586.md` - YEARS_BETWEEN

**Numeric Functions:**
- [x] `numeric-functions-1e9cd9a.md` - Overview
- [x] `abs-ee1d5b6.md` - ABS
- [x] `ceil-c88cbad.md` - CEIL
- [x] `exp-6b2ea9d.md` - EXP
- [x] `floor-8148040.md` - FLOOR
- [x] `ln-eec8110.md` - LN
- [x] `log-a696aed.md` - LOG
- [x] `mod-0700b30.md` - MOD
- [x] `power-abb2828.md` - POWER
- [x] `rand-a5083b7.md` - RAND
- [x] `round-ba9ca25.md` - ROUND
- [x] `sign-7a136aa.md` - SIGN
- [x] `sqrt-d450f6b.md` - SQRT
- [x] `uminus-9e0640c.md` - UMINUS

**String Functions:**
- [x] `string-functions-9b84e11.md` - Overview
- [x] `ascii-cd7002f.md` - ASCII
- [x] `char-920c43a.md` - CHAR
- [x] `concat-2a8465c.md` - CONCAT
- [x] `lcase-b4e5152.md` - LCASE
- [x] `left-bd4523a.md` - LEFT
- [x] `length-c8a6fc5.md` - LENGTH
- [x] `locate-61b79b3.md` - LOCATE
- [x] `lower-16a77d3.md` - LOWER
- [x] `lpad-b5a8a60.md` - LPAD
- [x] `ltrim-7049221.md` - LTRIM
- [x] `replace-d9cc501.md` - REPLACE
- [x] `right-27ac4e4.md` - RIGHT
- [x] `rpad-5754920.md` - RPAD
- [x] `rtrim-455791a.md` - RTRIM
- [x] `substrafter-573f066.md` - SUBSTRAFTER
- [x] `substrbefore-351e0de.md` - SUBSTRBEFORE
- [x] `substring-75bf127.md` - SUBSTRING
- [x] `trim-f15018e.md` - TRIM
- [x] `ucase-7efd7be.md` - UCASE
- [x] `upper-1457a58.md` - UPPER

**Miscellaneous Functions:**
- [x] `miscellaneous-functions-4cd8e22.md` - Overview
- [x] `case-5b9e431.md` - CASE
- [x] `coalesce-4c4d340.md` - COALESCE
- [x] `greatest-a051436.md` - GREATEST
- [x] `ifnull-11fa603.md` - IFNULL
- [x] `least-577b90c.md` - LEAST
- [x] `map-f3389d8.md` - MAP
- [x] `nullif-3b01586.md` - NULLIF

**Key Topics Extracted:**
- Complete Data Transformation Language (DTL) function reference
- Type conversion between SAP Data Intelligence data types
- Date/time manipulation and calculation
- String processing and formatting
- Numeric calculations and transformations
- Conditional and null-handling functions

---

### 3. Machine Learning (`/docs/machinelearning`)
**URL**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/machinelearning
**Status**: ✅ Completed
**Total Files**: 30+ (11 root files + subdirectory contents)

#### Files Processed:

**Root Files:**
- [x] `index.md` - Section index
- [x] `machine-learning-in-sap-data-intelligence-c6ee16d.md` - ML overview
- [x] `about-the-context-7b0bbf6.md` - Context information
- [x] `accessing-artifacts-106e1c0.md` - Artifact access
- [x] `executing-or-deploying-pipelines-6fb5e15.md` - Pipeline execution
- [x] `python-sdk-12f7aba.md` - Python SDK reference
- [x] `runs-and-run-collections-8d8c69f.md` - Runs management
- [x] `using-the-sdk-to-track-metrics-3d4d373.md` - Metrics tracking
- [x] `versioning-an-ml-scenario-e272d60.md` - Scenario versioning
- [x] `working-with-pipelines-62704e6.md` - Pipeline development
- [x] `working-with-training-pipelines-7def214.md` - Training pipelines

**JupyterLab Environment (6 files):**
- [x] `jupyterlab-environment-f497d20.md` - JupyterLab overview
- [x] `accessing-di-data-lake-2afad19.md` - Data lake access
- [x] `copying-resources-to-mlsm-2995272.md` - Resource copying
- [x] `running-kernels-and-terminals-e400d84.md` - Kernel management
- [x] `setting-up-a-virtual-environment-a86d37a.md` - Virtual environments
- [x] `using-the-data-browser-extension-6a74c61.md` - Data browser

**ML Scenario Manager (13 files):**
- [x] `ml-scenario-manager-dbd9e07.md` - Manager overview
- [x] `adding-a-jupyter-notebook-617e610.md` - Notebook integration
- [x] `adding-a-pipeline-91ec15e.md` - Pipeline addition
- [x] `browsing-run-collections-and-runs-7ba13f1.md` - Run browsing
- [x] `comparing-runs-b81ccec.md` - Run comparison
- [x] `creating-a-new-version-of-your-scenario-6298c4d.md` - Version creation
- [x] `executing-and-deploying-pipelines-749755f.md` - Execution/deployment
- [x] `exporting-and-importing-scenarios-eb82493.md` - Scenario export/import
- [x] `metrics-explorer-71e42ac.md` - Metrics exploration
- [x] `registering-a-dataset-d564603.md` - Dataset registration
- [x] `scenario-versions-d282f42.md` - Version management
- [x] `setting-up-your-machine-learning-scenario-cf44670.md` - Scenario setup
- [x] `workspace-contains-files-larger-than-2-mb-22cb791.md` - Large files handling

**Key Topics Extracted:**
- ML Scenario Manager for end-to-end ML lifecycle
- JupyterLab integration for data science
- Python SDK for ML operations
- Pipeline development and deployment
- Model versioning and tracking
- Metrics collection and comparison
- Dataset management
- Virtual environment configuration

---

### 4. Modeling Guide (`/docs/modelingguide`)
**URL**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide
**Status**: ✅ Completed
**Total Files**: 200+ files across 16 subdirectories

#### Files Processed:

**Root Files (9):**
- [x] `index.md` - Section index
- [x] `modeling-guide-for-sap-data-intelligence-3659021.md` - Main guide
- [x] `changing-data-capture-cdc-023c75a.md` - CDC overview
- [x] `creating-configuration-types-2e63e4c.md` - Configuration types
- [x] `creating-local-data-types-c996f5e.md` - Local data types
- [x] `integrating-sap-cloud-applications-with-sap-data-intelligence-d6a8144.md` - Cloud app integration
- [x] `operator-metrics-994bc11.md` - Operator metrics
- [x] `security-and-data-protection-39d8ba5.md` - Security guide
- [x] `using-data-types-7c6b15c.md` - Data types usage

**Introduction (3 files):**
- [x] `introduction-to-the-sap-data-intelligence-modeler-f003a9f.md` - Modeler intro
- [x] `description-of-the-modeler-main-screen-8516038.md` - Screen description
- [x] `log-on-to-sap-data-intelligence-modeler-089df27.md` - Logon guide

**Using Operators (24 files):**
- [x] `using-operators-84e1df1.md` - Operators overview
- [x] `adding-ports-to-operators-3e9e3e5.md` - Port addition
- [x] `batch-header-40e5f8d.md` - Batch headers
- [x] `compatible-port-types-45ae47e.md` - Port compatibility
- [x] `configuring-operators-e9c9996.md` - Configuration
- [x] `creating-categories-9f64ea7.md` - Category creation
- [x] `creating-operator-groups-f500f5c.md` - Group creation
- [x] `creating-operator-versions-ffb1cf4.md` - Versioning
- [x] `creating-operators-049d2f3.md` - Operator creation
- [x] `customizing-the-list-of-operators-0cb2a5b.md` - Customization
- [x] `data-types-in-operator-ports-9fa7d06.md` - Port data types
- [x] `dockerfile-library-for-runtime-environment-163f5d9.md` - Dockerfile library
- [x] `editing-operator-versions-a380cb9.md` - Version editing
- [x] `editing-operators-e1120eb.md` - Operator editing
- [x] `error-handling-in-generation-2-operators-b88468d.md` - Error handling
- [x] `examples-operator-states-a2269e1.md` - State examples
- [x] `generation-1-and-generation-2-operators-1c97a10.md` - Gen1 vs Gen2
- [x] `operator-details-2a647f3.md` - Operator details
- [x] `ports-and-port-types-6789999.md` - Port types
- [x] `replacing-deprecated-operators-d2057ed.md` - Deprecation handling
- [x] `state-management-1d2d1aa.md` - State management
- [x] `table-messages-cf6b74c.md` - Table messages
- [x] `using-managed-connections-in-script-operators-90037ee.md` - Managed connections
- [x] `viewing-operator-versions-f1007e1.md` - Version viewing

**Using Graphs/Pipelines (46 files):**
- [x] `using-graphs-pipelines-c87a3aa.md` - Pipelines overview
- [x] `running-graphs-439d0a0.md` - Running graphs
- [x] `graph-execution-e047f2d.md` - Execution model
- [x] `graph-status-090bce6.md` - Status monitoring
- [x] `monitoring-graphs-4080eec.md` - Graph monitoring
- [x] `debug-graphs-06b0159.md` - Debugging
- [x] `schedule-graph-executions-cb46d5f.md` - Scheduling
- [x] `automatic-graph-recovery-4bf172b.md` - Auto-recovery
- [x] `error-recovery-with-generation-2-gen2-pipelines-1cd3efb.md` - Error recovery
- [x] `delivery-guarantee-for-generation-2-gen2-graphs-7b47117.md` - Delivery guarantee
- [x] `graph-snapshots-and-operator-states-f206c72.md` - Snapshots
- [x] `validate-graphs-0857b43.md` - Validation
- [x] `graph-validation-warnings-and-errors-72d5fa1.md` - Validation errors
- [x] `execution-model-2efa57d.md` - Execution model details
- [x] `multiplexing-scenarios-316c063.md` - Multiplexing
- [x] `native-multiplexing-for-gen2-pipelines-d89a54f.md` - Native multiplexing
- [x] `groups-tags-and-dockerfiles-03d1ef5.md` - Groups and tags
- [x] `configure-resources-for-a-graph-b0a5a31.md` - Resource configuration
- [x] `maintain-resource-requirements-for-graphs-44ad625.md` - Resource requirements
- [x] `resource-requirements-for-a-graph-in-json-7438e43.md` - JSON resources
- [x] `parameterize-the-graph-run-process-f3caf16.md` - Parameterization
- [x] `create-data-types-in-graph-7849362.md` - Data type creation
- [x] `use-data-types-in-graph-fe0f680.md` - Data type usage
- [x] `exporting-and-importing-graphs-with-data-types-9c670e4.md` - Import/export
- [x] `downloading-diagnostic-information-for-graphs-3d966fe.md` - Diagnostics
- [x] `saving-diagnostic-information-for-graphs-on-external-storage-031d695.md` - External diagnostics
- [x] `diagnostic-information-archive-structure-and-contents-a49ed7b.md` - Archive structure
- [x] Additional diagnostic and API files (15+ more)

**Creating Graphs (subdirectory):**
- [x] All files for graph creation workflows

**Working with Structured Data Operators (19 files):**
- [x] `working-with-structured-data-operators-dc90347.md` - Overview
- [x] `data-transform-8fe8c02.md` - Data transform
- [x] `custom-editor-8cda7c3.md` - Custom editor
- [x] `configure-the-aggregation-node-b89f90f.md` - Aggregation
- [x] `configure-the-case-node-6b7d6b4.md` - Case node
- [x] `configure-the-join-node-be68835.md` - Join node
- [x] `configure-the-projection-node-e06ffa4.md` - Projection
- [x] `configure-the-union-node-f696fe5.md` - Union node
- [x] `join-design-considerations-93c128e.md` - Join design
- [x] `resiliency-with-structured-data-operators-a11f035.md` - Resiliency
- [x] `sap-application-consumer-00c6e4b.md` - SAP consumer
- [x] `sap-application-producer-45d5d5d.md` - SAP producer
- [x] `structured-consumer-operators-abd02a9.md` - Consumer operators
- [x] `structured-file-consumer-546a902.md` - File consumer
- [x] `structured-file-producer-27d5461.md` - File producer
- [x] `structured-producer-operators-163767f.md` - Producer operators
- [x] `structured-sql-consumer-8eb8324.md` - SQL consumer
- [x] `structured-table-producer-b865f5a.md` - Table producer
- [x] `consuming-excel-files-with-structured-file-consumer-operator-bbba1be.md` - Excel files

**Replicating Data (16 files):**
- [x] `replicating-data-d3acc43.md` - Replication overview
- [x] `create-a-replication-flow-a425e34.md` - Flow creation
- [x] `create-tasks-991a6dc.md` - Task creation
- [x] `add-a-filter-7df99cc.md` - Filter addition
- [x] `define-the-mapping-for-a-dataset-6c0ed1f.md` - Dataset mapping
- [x] `data-type-compatibility-e81bd11.md` - Type compatibility
- [x] `validate-the-replication-flow-c716063.md` - Validation
- [x] `deploy-the-replication-flow-c0d5528.md` - Deployment
- [x] `run-the-replication-flow-bb92c19.md` - Running flows
- [x] `edit-an-existing-replication-flow-3cb5d3f.md` - Editing flows
- [x] `undeploy-a-replication-flow-4e7d434.md` - Undeployment
- [x] `delete-a-replication-flow-0205d8c.md` - Deletion
- [x] `clean-up-source-artifacts-599586b.md` - Cleanup
- [x] `cloud-storage-target-structure-12e0f97.md` - Cloud storage
- [x] `kafka-as-target-b9b819c.md` - Kafka target
- [x] `abap-cluster-table-replications-with-delta-load-69319bb.md` - ABAP cluster tables

**Data Workflow Operators (12 files):**
- [x] `working-with-the-data-workflow-operators-f3f4333.md` - Overview
- [x] `control-flow-of-execution-c7723e3.md` - Control flow
- [x] `workflow-trigger-and-workflow-terminator-8084d07.md` - Triggers
- [x] `run-a-hana-flowgraph-operator-429c135.md` - HANA flowgraph
- [x] `run-an-sap-bw-process-chain-operator-dd9357c.md` - BW process chain
- [x] `run-an-sap-data-intelligence-pipeline-69bbcf9.md` - DI pipeline
- [x] `run-an-sap-data-services-job-01bbb48.md` - Data Services job
- [x] `send-e-mail-notifications-43e3eac.md` - Email notifications
- [x] `transfer-data-b250a0b.md` - Data transfer
- [x] `transfer-data-from-sap-bw-to-cloud-storage-3b10072.md` - BW transfer
- [x] `transfer-data-from-sap-hana-to-cloud-storage-362b11e.md` - HANA transfer
- [x] `transfer-modes-a615280.md` - Transfer modes

**Subengines (40 files):**
- [x] `subengines-20fad0f.md` - Overview
- [x] Python subengine (7+ files)
- [x] Node.js subengine SDK (20+ files)
- [x] C++ subengine (5+ files)
- [x] FlowAgent subengine (2+ files)

**Creating Dockerfiles (3 files):**
- [x] `creating-dockerfiles-62d1df0.md` - Overview
- [x] `dockerfile-inheritance-d49a07c.md` - Inheritance
- [x] `referencing-parent-docker-images-d9a3063.md` - Parent images

**Additional Subdirectories:**
- [x] `creating-data-types/` - Data type creation
- [x] `dataintelligence-monitoring/` - Monitoring
- [x] `service-specific-information/` - Service info
- [x] `using-git-terminal/` - Git terminal
- [x] `using-graph-snippets/` - Graph snippets
- [x] `using-scenario-templates/` - Scenario templates

**Key Topics Extracted:**
- SAP Data Intelligence Modeler interface
- Operator development (Gen1 and Gen2)
- Graph/pipeline creation and execution
- Data transformation and structured data
- Replication flows for data movement
- Data workflow orchestration
- Subengines (Python, Node.js, C++)
- Docker configuration
- CDC (Change Data Capture)
- Monitoring and diagnostics

---

### 5. Repository Objects (`/docs/repositoryobjects`)
**URL**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/repositoryobjects
**Status**: ✅ Completed
**Total Files**: 400+ (operators and graphs)

#### Files Processed:

**Root Files:**
- [x] `index.md` - Section index
- [x] `repository-objects-reference-for-sap-data-intelligence-6529535.md` - Main reference

**Data Intelligence Operators (266 files):**

**ABAP Operators:**
- [x] All ABAP-related operators (10+ files)

**File/Storage Operators:**
- [x] Binary file consumer/producer
- [x] CSV/JSON/Avro/Parquet operators
- [x] Cloud storage (S3, Azure, GCS, HDFS)
- [x] Local file system operators

**Database Operators:**
- [x] HANA operators
- [x] SQL Server, Oracle, MySQL, PostgreSQL
- [x] SAP BW operators
- [x] Generic SQL operators

**Messaging Operators:**
- [x] Kafka consumer/producer
- [x] MQTT operators
- [x] AWS SNS operators
- [x] SAP Event Mesh

**Data Processing Operators:**
- [x] Data quality operators
- [x] Anonymization operators
- [x] Validation operators
- [x] String/numeric utilities

**Script Operators:**
- [x] Python operators (2, 3)
- [x] JavaScript operators
- [x] R operators
- [x] Go operators

**ML Operators:**
- [x] TensorFlow operators
- [x] PyTorch operators
- [x] HANA ML operators
- [x] Submit metrics

**Integration Operators:**
- [x] OData operators
- [x] REST API operators
- [x] SAP CPI operators
- [x] OpenAPI operators

**Workflow Operators:**
- [x] Pipeline operators
- [x] Data workflow operators
- [x] Notification operators

**Data Intelligence Graphs (141 files):**

**Example Categories:**
- [x] ABAP extraction examples (10+ graphs)
- [x] File processing examples
- [x] Database integration examples
- [x] ML training/inference templates
- [x] Streaming analytics examples
- [x] Data transformation examples
- [x] Replication flow examples
- [x] API integration examples
- [x] Utility and demo graphs

**Key Topics Extracted:**
- Complete operator reference (266 operators)
- Pre-built graph templates (141 graphs)
- Operator configuration options
- Port types and data flows
- Integration patterns
- ML pipeline templates

---

## Coverage Summary

| Section | Files | Status | Key Content |
|---------|-------|--------|-------------|
| ABAP Integration | 19 | ✅ Complete | ABAP/S4HANA integration |
| Function Reference | 80 | ✅ Complete | DTL functions |
| Machine Learning | 30+ | ✅ Complete | ML Scenario Manager |
| Modeling Guide | 200+ | ✅ Complete | Operators, graphs, workflows |
| Repository Objects | 400+ | ✅ Complete | Operators & graphs reference |

**Total Files Analyzed**: 700+
**Completion Status**: ✅ All sections covered

---

## Key Information Categories Extracted

### Core Concepts
- [x] SAP Data Intelligence architecture
- [x] Modeler interface and navigation
- [x] Graphs/pipelines concepts
- [x] Operators (Gen1 vs Gen2)
- [x] Data types and ports
- [x] Connection management

### Data Integration
- [x] ABAP system integration
- [x] S/4HANA connectivity
- [x] Cloud Connector setup
- [x] CDS views and ODP
- [x] Replication flows
- [x] CDC (Change Data Capture)

### Data Processing
- [x] Structured data operators
- [x] Data transformation
- [x] DTL functions
- [x] Data quality/anonymization
- [x] File format handling

### Machine Learning
- [x] ML Scenario Manager
- [x] JupyterLab environment
- [x] Python SDK
- [x] Training pipelines
- [x] Model versioning
- [x] Metrics tracking

### Development
- [x] Custom operator development
- [x] Subengines (Python, Node.js, C++)
- [x] Script operators
- [x] Dockerfile configuration
- [x] Testing and debugging

### Operations
- [x] Graph execution and monitoring
- [x] Error recovery
- [x] Scheduling
- [x] Diagnostics
- [x] Resource management

### Integration Patterns
- [x] Database connectivity
- [x] Cloud storage
- [x] Messaging systems
- [x] REST/OData APIs
- [x] SAP application integration

---

## Documentation Links for Maintenance

### Primary Documentation Sources
- **GitHub Repository**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs
- **SAP Help Portal**: https://help.sap.com/docs/SAP_DATA_INTELLIGENCE
- **SAP Developer Center**: https://developers.sap.com/topics/data-intelligence.html

### Section-Specific Links
1. **ABAP Integration**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/abapintegration
2. **Function Reference**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/functionreference
3. **Machine Learning**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/machinelearning
4. **Modeling Guide**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/modelingguide
5. **Repository Objects**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/repositoryobjects

---

## Notes for Skill Maintenance

1. **Version Updates**: Check GitHub repository for new files and updates
2. **Deprecation**: Monitor for deprecated operators and features
3. **New Features**: Watch for new subengines, operators, or ML capabilities
4. **Breaking Changes**: Track major version changes in SAP Data Intelligence

---

**Last Updated**: 2025-11-22
**Next Scheduled Review**: 2026-02-22 (Quarterly)
