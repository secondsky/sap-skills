# Adapters - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Development
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Protocol Adapters](#protocol-adapters)
3. [Application Adapters](#application-adapters)
4. [Database Adapters](#database-adapters)
5. [Cloud Platform Adapters](#cloud-platform-adapters)
6. [B2B Adapters](#b2b-adapters)
7. [Adapter Development Kit](#adapter-development-kit)

---

## Overview

SAP Integration Suite provides 80+ adapters for connectivity:
- **Protocol Adapters**: Technical protocol support
- **Application Adapters**: SAP and non-SAP applications
- **Database Adapters**: Direct database connectivity
- **Cloud Platform Adapters**: Cloud services (AWS, Azure, GCP)
- **B2B Adapters**: EDI/B2B communication standards

Additionally, 170+ **Open Connectors** provide API-based access to SaaS applications.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/connectivity-options-93d82e8.md

---

## Protocol Adapters

### HTTP/HTTPS Adapter

**Sender (HTTPS)**:
| Parameter | Description |
|-----------|-------------|
| Address | Endpoint path (e.g., `/myflow`) |
| Authorization | Basic, Client Certificate, OAuth |
| CSRF Protection | Enable/disable CSRF token validation |

**Receiver (HTTP)**:
| Parameter | Description |
|-----------|-------------|
| Address | Target URL |
| Proxy Type | Internet, On-Premise (Cloud Connector) |
| Method | GET, POST, PUT, DELETE, PATCH |
| Authentication | Basic, OAuth, Client Certificate |
| Timeout | Connection timeout in ms |

**Documentation**:
- Sender: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/https-sender-adapter-0ae4a78.md
- Receiver: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/http-receiver-adapter-2da452e.md

### SFTP Adapter

**Sender**:
| Parameter | Description |
|-----------|-------------|
| Host | SFTP server hostname |
| Port | Default: 22 |
| Directory | Source directory path |
| File Name | Pattern (e.g., `*.xml`) |
| Authentication | User/Password, Public Key |
| Post-Processing | Delete, Move, Archive |
| Scheduler | Poll interval |

**Receiver**:
| Parameter | Description |
|-----------|-------------|
| Host | SFTP server hostname |
| Directory | Target directory path |
| File Name | Output filename (supports headers) |
| Authentication | User/Password, Public Key |
| Handling | Append, Overwrite, Fail |

**Documentation**:
- Sender: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/configure-the-sftp-sender-adapter-2de9ee5.md
- Receiver: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/configure-the-sftp-receiver-adapter-4ef52cf.md

### FTP Adapter

Similar to SFTP but for non-secure FTP connections.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/ftp-adapter-4464f89.md

### SOAP Adapter

**Variants**:
- SOAP 1.x (standard SOAP)
- SOAP SAP RM (reliable messaging)

**Key Settings**:
| Parameter | Description |
|-----------|-------------|
| Address | WSDL URL or endpoint |
| Service | Service name from WSDL |
| Endpoint | Port/binding selection |
| Authentication | Basic, Certificate, OAuth |
| WS-Security | Signing, encryption options |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/configure-the-soap-soap-1-x-receiver-adapter-57f7b34.md

### OData Adapter

**Sender (OData V2)**:
| Parameter | Description |
|-----------|-------------|
| Address | OData service root URL |
| Operations | GET, POST, PUT, DELETE |
| Query Options | $filter, $select, $expand |
| Pagination | Handle large result sets |

**Receiver (OData V2/V4)**:
| Parameter | Description |
|-----------|-------------|
| Address | OData service URL |
| Resource Path | Entity set path |
| Operation | Query, Create, Update, Delete |
| Authentication | Basic, OAuth, Certificate |

**Documentation**:
- V2: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/configure-the-odata-v2-receiver-adapter-c5c2e38.md
- V4: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/configure-the-odata-v4-receiver-adapter-cd66a12.md

### RFC Adapter

Connect to SAP ABAP systems via RFC.

| Parameter | Description |
|-----------|-------------|
| Destination | RFC destination name |
| Function Module | BAPI/FM name |
| Connection | Via Cloud Connector |
| Authentication | User/Password |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/rfc-receiver-adapter-5c76048.md

### IDoc Adapter

Send/receive SAP IDocs.

**Sender**:
- Receives IDocs from SAP systems
- Supports IDoc packaging

**Receiver**:
- Sends IDocs to SAP systems
- Supports exactly-once delivery

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/idoc-adapter-6042250.md

### Mail Adapter

**Sender** (IMAP/POP3):
| Parameter | Description |
|-----------|-------------|
| Host | Mail server |
| Protocol | IMAP, POP3 |
| Folder | Inbox or specific folder |
| Authentication | User/Password, OAuth |
| Post-Processing | Delete, Mark as Read, Move |

**Receiver** (SMTP):
| Parameter | Description |
|-----------|-------------|
| Host | SMTP server |
| From/To | Email addresses |
| Subject | Email subject |
| Body | Message content |
| Attachments | Include attachments |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/mail-adapter-f1145cc.md

---

## Messaging Adapters

### JMS Adapter

Internal message queuing.

| Parameter | Description |
|-----------|-------------|
| Queue Name | Target queue (30 max) |
| Retry | Enable automatic retry |
| Transaction | Enable transactional handling |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/jms-adapter-0993f2a.md

### AMQP Adapter

Connect to AMQP 1.0 brokers.

**Supported Brokers**:
- SAP Event Mesh
- Apache ActiveMQ
- RabbitMQ (with plugin)
- Microsoft Azure Service Bus
- IBM MQ
- Solace PubSub+

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/amqp-adapter-5cc1a71.md

### Kafka Adapter

Connect to Apache Kafka.

| Parameter | Description |
|-----------|-------------|
| Host | Kafka broker addresses |
| Topic | Kafka topic name |
| Consumer Group | For sender adapter |
| Authentication | SASL, SSL |
| Serialization | Avro, JSON, String |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/kafka-adapter-3e7b995.md

### ProcessDirect Adapter

Internal iFlow-to-iFlow communication (synchronous, same tenant).

| Parameter | Description |
|-----------|-------------|
| Address | Internal endpoint path |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/processdirect-adapter-7445718.md

---

## Application Adapters

### SAP SuccessFactors Adapter

**Types**:
- SuccessFactors OData V2
- SuccessFactors SOAP
- SuccessFactors REST

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/configure-the-successfactors-odata-v2-receiver-adapter-d16dd12.md

### SAP Ariba Adapter

Connect to Ariba Network.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/ariba-adapter-98da76c.md

### Salesforce Adapter

**Operations**:
- Query (SOQL)
- Create/Update/Delete
- Bulk operations
- Streaming API

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/salesforce-receiver-adapter-a548be9.md

### Microsoft Dynamics CRM Adapter

Connect to Dynamics 365/CRM.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/microsoft-dynamics-crm-receiver-adapter-ee724c8.md

### Open Connectors

Access 170+ SaaS applications via unified API.

**Examples**: Slack, HubSpot, Zendesk, Shopify, ServiceNow, Workday

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/openconnectors-receiver-adapter-1a27cee.md

---

## Database Adapters

### JDBC Adapter

Direct database connectivity.

**Supported Databases**:
| Database | Cloud | On-Premise |
|----------|-------|------------|
| SAP HANA | Yes | Yes |
| Oracle | Yes | Yes |
| Microsoft SQL Server | Yes | Yes |
| PostgreSQL | Yes | Yes |
| IBM DB2 | - | Yes |
| SAP ASE | Yes | Yes |

**Operations**:
- Select (query)
- Insert
- Update
- Delete
- Stored procedures

**Configuration**:
| Parameter | Description |
|-----------|-------------|
| JDBC URL | Database connection string |
| Credential | User credentials artifact |
| SQL Statement | Query or DML statement |
| Batch Mode | Enable batch operations |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/jdbc-receiver-adapter-88be644.md

---

## Cloud Platform Adapters

### Amazon Web Services

**Supported Services**:
- S3 (object storage)
- SQS (message queuing)
- SNS (notifications)
- SWF (workflow)
- DynamoDB (NoSQL)
- EventBridge (events)

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/amazonwebservices-receiver-adapter-bc7d1aa.md

### Microsoft Azure

**Supported Services**:
- Azure Service Bus
- Azure Storage (Blob, Queue, Table)
- Azure CosmosDB

### Google Cloud Platform

**Supported Services**:
- Cloud Storage
- Pub/Sub
- BigQuery

---

## B2B Adapters

### AS2 Adapter

Applicability Statement 2 for EDI over HTTP.

**Features**:
- Signed/encrypted messages
- MDN (receipt) handling
- Certificate-based authentication

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/as2-adapter-d3af635.md

### AS4 Adapter

OASIS ebMS 3.0/AS4 standard.

**Features**:
- ebMS3 messaging
- Push/Pull modes
- Receipt handling

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/as4-receiver-adapter-3a2fde8.md

### ELSTER Adapter

German tax authority integration.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/elster-receiver-adapter-e374ef7.md

---

## Adapter Development Kit

Create custom adapters using the ADK.

**Prerequisites**:
- Java development skills
- OSGi bundle knowledge
- Cloud Integration SDK

**Process**:
1. Create adapter project
2. Implement adapter logic
3. Define metadata
4. Package as OSGi bundle
5. Deploy to tenant

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/develop-adapters-f798db6.md

---

## Common Configuration Patterns

### Authentication Types

| Type | Use Case |
|------|----------|
| Basic | Username/password |
| Client Certificate | mTLS authentication |
| OAuth 2.0 Client Credentials | Machine-to-machine |
| OAuth 2.0 Authorization Code | User-delegated access |
| SAML Bearer Assertion | SAP-to-SAP scenarios |
| Principal Propagation | Pass-through user context |

### Proxy Types

| Type | Description |
|------|-------------|
| Internet | Direct internet access |
| On-Premise | Via SAP Cloud Connector |

### Timeout Settings

Always configure appropriate timeouts:
- Connection timeout
- Response timeout
- Read timeout

---

## Related Documentation

- **Connectivity Options**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/connectivity-options-93d82e8.md
- **Cloud Connector**: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector
- **Destination Configuration**: https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/http-destinations
