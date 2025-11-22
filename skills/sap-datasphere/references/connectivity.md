# Connectivity Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Administering/Preparing-Connectivity
**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Integrating-data-and-managing-spaces/Integrating-Data-Via-Connections

---

## Table of Contents

1. [Connection Overview](#connection-overview)
2. [SAP System Connections](#sap-system-connections)
3. [Cloud Platform Connections](#cloud-platform-connections)
4. [Database Connections](#database-connections)
5. [Streaming Connections](#streaming-connections)
6. [Generic Connections](#generic-connections)
7. [Connection Management](#connection-management)
8. [Cloud Connector](#cloud-connector)
9. [Data Provisioning Agent](#data-provisioning-agent)
10. [IP Allowlisting](#ip-allowlisting)

---

## Connection Overview

### Connection Types

SAP Datasphere supports 40+ connection types for data integration.

| Category | Connections |
|----------|-------------|
| SAP | S/4HANA, BW/4HANA, ECC, HANA, SuccessFactors |
| Cloud | AWS, Azure, GCP |
| Database | Oracle, SQL Server, JDBC |
| Streaming | Kafka, Confluent |
| Generic | OData, HTTP, SFTP, JDBC |

### Connection Features

| Feature | Description |
|---------|-------------|
| Remote Tables | Virtual data access |
| Data Flows | ETL pipelines |
| Replication Flows | Data replication |
| Model Import | BW model transfer |

### Complete Connection Feature Matrix

| Connection Type | Remote Tables | Replication Flows | Data Flows | Model Import |
|-----------------|---------------|-------------------|------------|--------------|
| **SAP Systems** |
| SAP S/4HANA Cloud | Yes | Yes (source) | Yes | Yes |
| SAP S/4HANA On-Premise | Yes | Yes (source) | Yes | Yes |
| SAP ABAP | Yes | Yes (source) | Yes | No |
| SAP BW | Yes | Via ABAP | Yes | No |
| SAP BW/4HANA Model Transfer | No | No | No | Yes |
| SAP BW Bridge | Yes | No | No | Yes |
| SAP ECC | Yes | Via ABAP | Yes | No |
| SAP HANA | Yes | Yes (source+target) | Yes | No |
| SAP HANA Cloud Data Lake Files | No | Yes (source+target) | Yes | No |
| SAP HANA Cloud Data Lake Relational Engine | Yes | No | Yes | No |
| SAP SuccessFactors | Yes | No | Yes | No |
| SAP Fieldglass | Yes | No | Yes | No |
| SAP Marketing Cloud | Yes | No | Yes | No |
| SAP Signavio | No | Yes (target) | No | No |
| **Cloud Platforms** |
| Amazon S3 | No | Yes (source+target) | Yes | No |
| Amazon Athena | Yes | No | No | No |
| Amazon Redshift | Yes | No | Yes | No |
| Google Cloud Storage | No | Yes (source+target) | Yes | No |
| Google BigQuery | Yes | Yes (target) | Yes | No |
| Microsoft Azure Blob Storage | No | No | Yes | No |
| Microsoft Azure Data Lake Gen2 | No | Yes (source+target) | Yes | No |
| Microsoft Azure SQL Database | Yes | Yes (source) | Yes | No |
| Microsoft SQL Server | Yes | Yes (source) | Yes | No |
| Microsoft OneLake | No | Yes (source) | No | No |
| **Databases** |
| Oracle | Yes | No | Yes | No |
| Generic JDBC | Yes | No | No | No |
| **Streaming** |
| Apache Kafka | No | Yes (target) | No | No |
| Confluent | No | Yes (source+target) | No | No |
| **Generic** |
| Generic OData | Yes | No | Yes | No |
| Generic HTTP | No | No | No | No |
| Generic SFTP | No | Yes (source+target) | Yes | No |
| Open Connectors | No | No | Yes | No |
| Hadoop HDFS | No | No | Yes | No |
| Cloud Data Integration | Yes | No | Yes | No |
| **Partner** |
| Adverity | Push* | No | No | No |
| Precog | Push* | No | No | No |

*Push = Data pushed via database user SQL Interface

### Creating Connections

1. Connections > Create
2. Select connection type
3. Configure properties
4. Test connection
5. Save

### Connection Properties

**Common Properties**:
- Connection Name
- Description
- Technical User
- Authentication Method

---

## SAP System Connections

### SAP S/4HANA Cloud

**Communication Arrangement Scenarios**:
| Scenario | Purpose | Required For |
|----------|---------|--------------|
| SAP_COM_0531 | OData Services | Remote tables (legacy) |
| SAP_COM_0532 | CDS View Replication | Data flows, Replication flows |
| SAP_COM_0722 | Model Transfer | BW model import |

**Important**: The same communication user must be added to all communication arrangements used for the connection.

**Prerequisites by Feature**:

*Remote Tables (Recommended)*:
- ABAP SQL service exposure for federated CDS view access
- Or: Data Provisioning Agent with CloudDataIntegrationAdapter + SAP_COM_0531

*Data Flows*:
- Communication arrangement for SAP_COM_0532

*Replication Flows*:
- ABAP SQL service exposure (recommended)
- Communication arrangement for SAP_COM_0532
- Optional: RFC fast serialization (SAP Note 3486245)

*Model Import*:
- Data Provisioning Agent with CloudDataIntegrationAdapter
- Communication arrangements: SAP_COM_0532, SAP_COM_0531, SAP_COM_0722

**Authentication**:
- OAuth 2.0 (recommended)
- Basic authentication
- X.509 Client Certificate (see SAP Note 2801396 for approved CAs)

**X.509 Certificate Setup**:
1. Generate certificate using OpenSSL or SAP Cloud Identity Services
2. Upload certificate to communication user
3. Add user to communication system with "SSL Client Certificate" authentication
4. Create required communication arrangements

**Connection Properties**:
```yaml
type: SAP S/4HANA Cloud
host: mycompany.s4hana.ondemand.com
authentication: OAuth 2.0
client_id: xxx
client_secret: xxx
```

### SAP S/4HANA On-Premise

**Prerequisites**:
- Cloud Connector configured
- RFC user with authorization
- Network connectivity

**Authentication**:
- Basic (user/password)
- X.509 certificate

**Supported Features**:
- Remote tables (CDS views, tables)
- Replication flows (SLT, ODP)
- Real-time replication
- ABAP RFC streaming

**Connection Properties**:
```yaml
type: SAP S/4HANA On-Premise
cloud_connector: my_cloud_connector
virtual_host: s4hana.internal:443
system_id: S4H
client: 100
authentication: Basic
```

### SAP BW/4HANA Model Transfer

**Prerequisites**:
- BW/4HANA 2.0+
- Remote connection configured in BW
- Authorization for model transfer

**Supported Objects**:
- CompositeProviders
- InfoObjects
- Queries
- Hierarchies

**Connection Properties**:
```yaml
type: SAP BW/4HANA Model Transfer
host: bw4hana.company.com
system_id: BW4
client: 100
```

### SAP BW Bridge

**Prerequisites**:
- BW Bridge provisioned
- Network connectivity

**Supported Features**:
- Run BW process chains
- Access BW objects
- Hybrid scenarios

### SAP ECC

**Prerequisites**:
- Cloud Connector
- RFC user
- ODP extractors

**Connection Properties**:
```yaml
type: SAP ECC
cloud_connector: my_cc
virtual_host: ecc.internal
system_id: ECC
client: 100
```

### SAP HANA (Cloud and On-Premise)

**SAP HANA Cloud**:
```yaml
type: SAP HANA Cloud
host: xxx.hana.trial-us10.hanacloud.ondemand.com
port: 443
authentication: User/Password
```

**SAP HANA On-Premise**:
```yaml
type: SAP HANA
cloud_connector: my_cc
virtual_host: hana.internal
port: 30015
authentication: User/Password
```

### SAP HANA Cloud Data Lake

**Files Connection**:
```yaml
type: SAP HANA Cloud, Data Lake Files
host: xxx.files.hdl.trial-us10.hanacloud.ondemand.com
container: my_container
```

**Relational Engine**:
```yaml
type: SAP HANA Cloud, Data Lake Relational Engine
host: xxx.iq.hdl.trial-us10.hanacloud.ondemand.com
port: 443
```

### SAP SuccessFactors

**Prerequisites**:
- OData API enabled
- API user with permissions

**Connection Properties**:
```yaml
type: SAP SuccessFactors
host: api.successfactors.com
company_id: mycompany
authentication: Basic
```

### SAP Fieldglass

**Connection Properties**:
```yaml
type: SAP Fieldglass
host: api.fieldglass.net
authentication: OAuth 2.0
```

### SAP Marketing Cloud

**Connection Properties**:
```yaml
type: SAP Marketing Cloud
host: mycompany.marketing.cloud.sap
authentication: OAuth 2.0
```

### SAP Signavio

**Connection Properties**:
```yaml
type: SAP Signavio
host: editor.signavio.com
authentication: API Key
```

---

## Cloud Platform Connections

### Amazon Web Services

**Amazon S3**:
```yaml
type: Amazon Simple Storage Service
region: us-east-1
bucket: my-data-bucket
authentication: Access Key
access_key_id: AKIA...
secret_access_key: xxx
```

**Amazon Athena**:
```yaml
type: Amazon Athena
region: us-east-1
workgroup: primary
s3_output_location: s3://query-results/
authentication: Access Key
```

**Amazon Redshift**:
```yaml
type: Amazon Redshift
host: cluster.xxx.redshift.amazonaws.com
port: 5439
database: mydb
authentication: User/Password
```

### Google Cloud Platform

**Google Cloud Storage**:
```yaml
type: Google Cloud Storage
project_id: my-project
bucket: my-bucket
authentication: Service Account
service_account_key: {...}
```

**Google BigQuery**:
```yaml
type: Google BigQuery
project_id: my-project
dataset: my_dataset
authentication: Service Account
```

### Microsoft Azure

**Azure Blob Storage**:
```yaml
type: Microsoft Azure Blob Storage
account_name: mystorageaccount
container: mycontainer
authentication: Account Key
```

**Azure Data Lake Gen2**:
```yaml
type: Microsoft Azure Data Lake Store Gen2
account_name: mydatalake
filesystem: myfilesystem
authentication: Service Principal
```

**Azure SQL Database**:
```yaml
type: Microsoft Azure SQL Database
server: myserver.database.windows.net
database: mydb
authentication: SQL Authentication
```

**Microsoft OneLake**:
```yaml
type: Microsoft OneLake
workspace: my-workspace
lakehouse: my-lakehouse
authentication: Service Principal
```

---

## Database Connections

### Oracle

**Prerequisites**:
- Data Provisioning Agent
- Oracle JDBC driver

**Connection Properties**:
```yaml
type: Oracle
host: oracle.company.com
port: 1521
service_name: ORCL
authentication: User/Password
```

### Microsoft SQL Server

**Prerequisites**:
- Data Provisioning Agent
- JDBC driver

**Connection Properties**:
```yaml
type: Microsoft SQL Server
host: sqlserver.company.com
port: 1433
database: mydb
authentication: SQL Server Authentication
```

### Generic JDBC

**Prerequisites**:
- Data Provisioning Agent
- JDBC driver uploaded

**Connection Properties**:
```yaml
type: Generic JDBC
jdbc_url: jdbc:postgresql://host:5432/db
driver_class: org.postgresql.Driver
authentication: User/Password
```

---

## Streaming Connections

### Apache Kafka

**Prerequisites**:
- Kafka cluster accessible
- SSL certificates (if TLS)

**Connection Properties**:
```yaml
type: Apache Kafka
bootstrap_servers: kafka1:9092,kafka2:9092
security_protocol: SASL_SSL
sasl_mechanism: PLAIN
```

### Confluent

**Connection Properties**:
```yaml
type: Confluent
bootstrap_servers: xxx.confluent.cloud:9092
cluster_id: xxx
api_key: xxx
api_secret: xxx
```

---

## Generic Connections

### Generic OData

**Connection Properties**:
```yaml
type: Generic OData
service_url: https://api.example.com/odata/v2
authentication: OAuth 2.0
```

**OData Versions**:
- OData V2
- OData V4

### Generic HTTP

**Connection Properties**:
```yaml
type: Generic HTTP
base_url: https://api.example.com
authentication: Bearer Token
```

### Generic SFTP

**Connection Properties**:
```yaml
type: Generic SFTP
host: sftp.example.com
port: 22
authentication: Password or SSH Key
```

### Open Connectors

**Prerequisites**:
- SAP Open Connectors instance
- Connector configured

**Connection Properties**:
```yaml
type: Open Connectors
instance_url: https://api.openconnectors.ext.hanatrial.ondemand.com
organization_secret: xxx
user_secret: xxx
element_token: xxx
```

---

## Connection Management

### Editing Connections

1. Connections > Select connection
2. Edit properties
3. Test connection
4. Save changes

### Deleting Connections

**Prerequisites**:
- No dependent objects
- No active replications

1. Connections > Select
2. Delete
3. Confirm

### Validating Connections

**Validation Checks**:
- Network connectivity
- Authentication
- Authorization
- Object access

### REST API Management

**List Connections**:
```http
GET /api/v1/connections
Authorization: Bearer {token}
```

**Create Connection**:
```http
POST /api/v1/connections
Content-Type: application/json

{
  "name": "my_connection",
  "type": "SAP_HANA",
  "properties": {...}
}
```

### Pause Real-Time Replication

**Per Connection**:
1. Select connection
2. Pause real-time replication
3. Resume when ready

---

## Cloud Connector

### Overview

Cloud Connector enables secure connectivity between SAP BTP and on-premise systems.

### Installation

1. Download from SAP Support Portal
2. Install on-premise server
3. Configure initial settings
4. Connect to SAP BTP subaccount

### Configuration

**System Mapping**:
```yaml
virtual_host: s4hana.internal
virtual_port: 443
internal_host: s4hana.company.local
internal_port: 443
protocol: HTTPS
```

**Access Control**:
- URL path restrictions
- HTTP method restrictions
- Principal propagation

### Troubleshooting

**Common Issues**:
| Issue | Solution |
|-------|----------|
| Connection refused | Check firewall rules |
| Authentication failed | Verify credentials |
| Timeout | Check network latency |
| Certificate error | Update certificates |

---

## Data Provisioning Agent

### Overview

Data Provisioning Agent enables connectivity to on-premise databases and applications.

### Installation

**Requirements**:
- Java 11+
- 4 GB RAM minimum
- Network access

**Installation Steps**:
1. Download agent installer
2. Run installation
3. Configure agent properties
4. Register with Datasphere

### Agent Configuration

**dpagentconfig.ini**:
```ini
[Framework]
name=dp_agent_01
framework_port=5050

[Datasphere]
tenant_url=https://xxx.hana.ondemand.com
```

### Adapter Registration

**Register Adapter**:
1. System > Data Provisioning
2. Select agent
3. Add adapter
4. Configure adapter properties

**Available Adapters**:
- ABAP ODP Adapter
- HANA SDI Adapters
- Database adapters
- File adapters

### ODBC Driver Upload

**Upload Third-Party Drivers**:
1. System > Data Provisioning
2. Select agent
3. Upload ODBC driver
4. Restart agent

### Agent Monitoring

**Monitor Status**:
- Connection status
- Adapter status
- Replication status
- Error logs

---

## IP Allowlisting

### Obtain IP Addresses

**Datasphere Outbound IPs**:
1. System > Configuration
2. View IP addresses
3. Add to source system allowlist

### Configure Allowlist

**In Datasphere**:
1. System > Security
2. IP Allowlist
3. Add allowed IP ranges
4. Save

**IP Range Format**:
```
192.168.1.0/24
10.0.0.0/8
```

---

## Certificate Management

### Managing Certificates

**Upload Certificate**:
1. System > Security > Certificates
2. Upload certificate file
3. Associate with connection

**Certificate Types**:
- Server certificates (TLS)
- Client certificates (mutual TLS)
- Root CA certificates

### Certificate Expiration

**Monitor Expiration**:
- System > Security > Certificates
- Check expiration dates
- Renew before expiry

---

## Documentation Links

- **Connections Overview**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/eb85e15
- **SAP S/4HANA**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/a98e5ff
- **Cloud Connector**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/f289920
- **Data Provisioning Agent**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/e87952d

---

**Last Updated**: 2025-11-22
