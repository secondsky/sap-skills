# ABAP Integration Guide

Complete guide for integrating ABAP-based SAP systems with SAP Data Intelligence.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Cloud Connector Setup](#cloud-connector-setup)
4. [Connection Configuration](#connection-configuration)
5. [Data Sources](#data-sources)
6. [ABAP Operators](#abap-operators)
7. [Custom ABAP Operators](#custom-abap-operators)
8. [Data Type Mapping](#data-type-mapping)
9. [Security](#security)
10. [Troubleshooting](#troubleshooting)

---

## Overview

SAP Data Intelligence Cloud integrates with ABAP-based SAP systems including:

- SAP S/4HANA (Cloud and On-Premise)
- SAP Business Warehouse (BW/4HANA, BW)
- SAP ECC
- Other NetWeaver-based systems

**Key Characteristics:**
- ABAP operators run on the ABAP Pipeline Engine in the source system
- Metadata and data flow through SAP Data Intelligence Cloud
- Supports real-time and batch data extraction

**Central Reference**: SAP Note 2890171 contains essential setup information.

---

## Prerequisites

### SAP System Requirements

**Minimum Versions:**
- SAP NetWeaver 7.50 SP00 or higher
- SAP S/4HANA 1909 or higher (recommended)
- SAP BW/4HANA 2.0 or higher

**Required Components:**
- ABAP Pipeline Engine (installed via SAP Notes)
- Cloud Connector (for on-premise systems)

### SAP Data Intelligence Requirements

- SAP Data Intelligence Cloud tenant
- Connection Management access
- Appropriate authorizations

---

## Cloud Connector Setup

For on-premise ABAP systems, configure SAP Cloud Connector.

### Installation Steps

1. **Download Cloud Connector** from SAP Support Portal
2. **Install** on a server with network access to ABAP system
3. **Configure** connection to SAP BTP subaccount
4. **Map** internal ABAP system to virtual host

### Configuration Example

```
Location ID: <your-location-id>
Internal Host: <abap-server>:44300
Virtual Host: virtualabap:44300
Protocol: HTTPS
Principal Propagation: Enabled (optional)
```

### Trust Configuration

1. Import SAP Data Intelligence CA certificate
2. Configure system certificate for backend
3. Enable principal propagation if needed

---

## Connection Configuration

### Creating ABAP Connection

1. **Open Connection Management** in SAP Data Intelligence
2. **Create new connection** with type "ABAP"
3. **Configure parameters**:

**Basic Settings:**
```
Connection Type: ABAP
Host: <virtual-host-from-cloud-connector>
Port: 44300
Client: 100
System ID: <SID>
```

**Authentication:**
- Basic Authentication: Username/Password
- Principal Propagation: SSO via Cloud Connector
- X.509 Certificate: Certificate-based

**Cloud Connector:**
```
Location ID: <your-location-id>
```

### Testing Connection

Use "Test Connection" to verify:
- Network connectivity
- Authentication
- Authorization

---

## Data Sources

### CDS Views

ABAP Core Data Services views are the recommended data source.

**Supported Types:**
- Basic CDS Views
- Composite CDS Views
- Views with parameters
- Extraction-enabled views (for ODP)

**Configuration:**
```
CDS View: I_Product
Selection Fields: Product, ProductType
Package Size: 10000
```

**Best Practices:**
- Use extraction-enabled views for delta capability
- Apply filters to reduce data volume
- Consider view performance characteristics

### ODP (Operational Data Provisioning)

Framework for extracting data from various ABAP sources.

**ODP Contexts:**
- SAPI: DataSources (classic BW extractors)
- ABAP CDS: CDS views with extraction
- BW: BW InfoProviders
- SLT: SLT-replicated tables

**Delta Support:**
- Full extraction
- Delta extraction (CDC)
- Delta initialization

### Tables

Direct table access for simple scenarios.

**Configuration:**
```
Table: MARA
Fields: MATNR, MTART, MATKL
Where Clause: MTART = 'FERT'
```

**Limitations:**
- No built-in delta capability
- May require additional authorization
- Consider performance for large tables

### SLT (SAP Landscape Transformation)

Real-time data replication via SLT Server.

**Components:**
- SLT Server (on-premise)
- Mass Transfer ID configuration
- Target connection in Data Intelligence

**Capabilities:**
- Real-time CDC
- Initial load + continuous delta
- Table-level replication

---

## ABAP Operators

### ABAP CDS Reader

Reads from CDS views with extraction.

**Key Parameters:**
- CDS View Name
- Selection Conditions
- Package Size (rows per batch)
- Max Rows (limit)

### ABAP Table Reader

Reads from ABAP tables directly.

**Key Parameters:**
- Table Name
- Field List
- Where Clause
- Order By

### SLT Connector

Connects to SLT for real-time replication.

**Key Parameters:**
- Mass Transfer ID
- Table Name
- Initial Load (yes/no)
- Subscription Type

### Generation 1 vs Generation 2

**Gen1 ABAP Operators:**
- Traditional process model
- Manual recovery

**Gen2 ABAP Operators:**
- Enhanced recovery
- State management
- Better error handling

---

## Custom ABAP Operators

### Architecture

Custom operators run in the ABAP Pipeline Engine:

```
SAP Data Intelligence <-> ABAP Pipeline Engine <-> Custom Operator Code
```

### Creating Custom Operators

1. **Create ABAP class** implementing interface
2. **Register** in ABAP Pipeline Engine repository
3. **Deploy** to SAP Data Intelligence
4. **Use** in graphs

### Implementation Pattern

```abap
CLASS zcl_custom_operator DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_sdi_operator.

  PRIVATE SECTION.
    DATA: mv_parameter TYPE string.

ENDCLASS.

CLASS zcl_custom_operator IMPLEMENTATION.

  METHOD if_sdi_operator~init.
    " Initialize operator
    mv_parameter = io_context->get_parameter( 'PARAM1' ).
  ENDMETHOD.

  METHOD if_sdi_operator~start.
    " Start processing
    DATA: lt_data TYPE TABLE OF string.
    " ... process data ...
    io_context->send_output( 'OUTPUT' , lt_data ).
  ENDMETHOD.

ENDCLASS.
```

---

## Data Type Mapping

### ABAP to Data Intelligence Type Mapping

| ABAP Type | Data Intelligence Type |
|-----------|----------------------|
| CHAR | String |
| NUMC | String |
| DATS | Date |
| TIMS | Time |
| DEC | Decimal |
| INT1/INT2/INT4 | Integer |
| FLTP | Double |
| RAW | Binary |
| STRING | String |
| RAWSTRING | Binary |

### Conversion Considerations

**Date/Time:**
- ABAP dates: YYYYMMDD format
- Initial dates (00000000) may need handling

**Numbers:**
- NUMC fields are strings (preserve leading zeros)
- Packed decimals maintain precision

**Binary:**
- RAW fields convert to binary
- Consider encoding for text storage

---

## Security

### Authorization Requirements

**SAP Data Intelligence:**
- Connection Management access
- Graph execution rights

**ABAP System:**
- RFC authorization
- Data access authorization (S_TABU_DIS, etc.)
- CDS view authorization (@AccessControl)

### Network Security

- Cloud Connector encryption (TLS)
- Principal propagation for SSO
- IP restrictions

### Data Protection

- Apply CDS access controls
- Mask sensitive fields in extraction
- Audit logging in both systems

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Connection timeout | Network/firewall | Check Cloud Connector mapping |
| Authentication failed | Wrong credentials | Verify user/password |
| Authorization error | Missing permissions | Check ABAP authorizations |
| No data returned | Wrong selection | Verify filter conditions |
| Performance issues | Large data volume | Add filters, adjust package size |

### Diagnostic Steps

1. **Test connection** in Connection Management
2. **Check Cloud Connector** logs
3. **Review ABAP** system logs (ST22, SM21)
4. **Monitor** Pipeline Engine (transaction /IWREP/MONITOR)
5. **Check** SAP Data Intelligence execution logs

### SAP Notes and Resources

- **SAP Note 2890171**: Central ABAP integration note
- **SAP Note 2973594**: Known issues and corrections
- **SAP Community**: https://community.sap.com/topics/data-intelligence

---

## Documentation Links

- **ABAP Integration Guide**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/abapintegration
- **User Guide**: https://github.com/SAP-docs/sap-hana-cloud-data-intelligence/tree/main/docs/abapintegration/user-guide-for-abap-integration

---

**Last Updated**: 2025-11-22
