# Integration Advisor & Trading Partner Management - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ISuite
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Integration Advisor Overview](#integration-advisor-overview)
2. [Type Systems](#type-systems)
3. [Message Implementation Guidelines (MIGs)](#message-implementation-guidelines-migs)
4. [Mapping Guidelines (MAGs)](#mapping-guidelines-mags)
5. [Trading Partner Management Overview](#trading-partner-management-overview)
6. [Partner Profiles](#partner-profiles)
7. [Agreements](#agreements)
8. [Runtime Artifacts](#runtime-artifacts)

---

## Integration Advisor Overview

SAP Integration Advisor is a cloud application that simplifies B2B/A2A and B2G integration by using machine learning to accelerate content development.

### Key Benefits

- **60% faster** content creation to deployment
- **Reduced manual work** managing multiple standards
- **Content sharing** with other users
- **AI-powered** mapping suggestions

### Supported Standards

| Standard | Description |
|----------|-------------|
| UN/EDIFACT | International EDI standard |
| ASC X12 | North American EDI standard |
| SAP IDoc | SAP Intermediate Document |
| cXML | Commerce XML |
| TRADACOMS | UK retail EDI |
| VDA | German automotive |
| Odette | European automotive |

### Core Components

```
Type Systems → MIGs → MAGs → Runtime Artifacts
     ↓           ↓       ↓           ↓
  Standards   Custom   Trans-    Deploy to
  Library    Messages  forms     CI/PO
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/overview-of-sap-integration-advisor-f99fdaf.md

---

## Type Systems

Type systems are pre-built message templates maintained by standards agencies.

### SAP-Provided Type Systems

| Type System | Use Case |
|-------------|----------|
| UN/EDIFACT | International B2B |
| ASC X12 | North American B2B |
| SAP IDoc | SAP-to-SAP integration |
| ISO 20022 | Financial messaging |
| GS1 | Supply chain standards |

### Custom Type Systems

Organizations can upload proprietary message structures:

1. **Define structure** using XSD or codelists
2. **Upload** to Integration Advisor
3. **Use** in MIG/MAG creation

### Type System Components

| Component | Description |
|-----------|-------------|
| Message types | Document definitions |
| Segments | Reusable data groups |
| Data elements | Individual fields |
| Codelists | Enumerated values |
| Qualifiers | Context specifiers |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/integration-advisor-3309fe0.md

---

## Message Implementation Guidelines (MIGs)

MIGs are customized message interfaces that define specific message requirements.

### MIG Purpose

- Define **which fields** are used
- Specify **cardinality** (required/optional)
- Document **business meaning**
- Ensure **partner alignment**

### Creating a MIG

1. **Select type system** (e.g., EDIFACT D.96A)
2. **Choose message type** (e.g., ORDERS)
3. **Customize structure**:
   - Mark required/optional segments
   - Set field constraints
   - Add documentation
4. **Activate** for use

### MIG Structure

```
MIG: ORDERS_CustomerA
├── UNH (Mandatory)
│   ├── 0062 Message Reference (M)
│   └── S009 Message Identifier (M)
├── BGM (Mandatory)
│   ├── C002 Document Name (M)
│   └── C106 Document Identification (M)
├── DTM (Optional, Max 35)
│   ├── C507 Date/Time/Period (M)
│   └── 2005 Qualifier (M)
└── ...
```

### MIG Best Practices

1. **Start from standards** - Use SAP type systems
2. **Document everything** - Add business context
3. **Be specific** - Define exact requirements
4. **Version control** - Track changes

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/integration-advisor-3309fe0.md

---

## Mapping Guidelines (MAGs)

MAGs define transformations between source and target messages.

### MAG Purpose

- Define **field mappings** between standards
- Specify **transformations** (concatenation, lookup, etc.)
- Generate **runtime artifacts** for deployment

### Creating a MAG

1. **Select source MIG** (e.g., IDoc ORDERS05)
2. **Select target MIG** (e.g., EDIFACT ORDERS)
3. **Map fields**:
   - Direct mappings
   - Transformations
   - Conditions
   - Constants
4. **Generate artifacts**

### MAG Mapping Types

| Type | Description |
|------|-------------|
| Direct | 1:1 field mapping |
| Concatenate | Combine multiple fields |
| Split | Divide field into parts |
| Lookup | Value mapping table |
| Constant | Fixed value |
| Conditional | If/then logic |
| Function | Custom transformation |

### AI-Powered Mapping

Integration Advisor uses machine learning to:
- **Suggest mappings** based on field names/types
- **Learn from approvals** to improve suggestions
- **Identify patterns** across similar mappings

### Generated Artifacts

| Artifact | Target Platform |
|----------|-----------------|
| XSLT mapping | Cloud Integration |
| Message mapping | Cloud Integration |
| Operation mapping | Process Orchestration |
| XSD schemas | Both platforms |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/integration-advisor-3309fe0.md

---

## Trading Partner Management Overview

SAP Trading Partner Management (TPM) streamlines B2B relationship management and governance.

### Key Capabilities

- **Partner profiles** with B2B requirements
- **Agreement templates** for common scenarios
- **Automated artifact generation**
- **Protocol support** (AS2, SFTP, FTP)

### Supported Protocols

| Protocol | Description |
|----------|-------------|
| AS2 | Applicability Statement 2 (HTTPS) |
| SFTP | Secure File Transfer Protocol |
| FTP | File Transfer Protocol |
| HTTPS | HTTP with TLS |

### Supported Standards

| Standard | Description |
|----------|-------------|
| EDI | Electronic Data Interchange |
| XML | Custom XML formats |
| JSON | JSON messages |
| IDoc | SAP IDocs |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/trading-partner-management-28fe3dc.md

---

## Partner Profiles

Partner profiles store B2B partner information and requirements.

### Profile Components

| Component | Description |
|-----------|-------------|
| General Info | Company name, contact details |
| Identifiers | DUNS, GLN, VAT numbers |
| Communication | AS2, SFTP parameters |
| Certificates | Public keys, certificates |
| Agreements | Active trading agreements |

### Creating a Partner Profile

1. **Add partner** in TPM
2. **Configure identifiers**:
   - Business identifier types
   - Identifier values
3. **Set communication parameters**:
   - Protocol (AS2/SFTP)
   - Endpoints
   - Authentication
4. **Upload certificates**

### AS2 Configuration

| Parameter | Description |
|-----------|-------------|
| AS2 ID | Partner's AS2 identifier |
| Partner URL | MDN return URL |
| Encryption | Encryption algorithm |
| Signing | Signature algorithm |
| Certificate | Partner's public certificate |

### SFTP Configuration

| Parameter | Description |
|-----------|-------------|
| Host | SFTP server hostname |
| Port | Server port (default: 22) |
| Directory | File drop location |
| Authentication | Password or SSH key |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/trading-partner-management-28fe3dc.md

---

## Agreements

Agreements define B2B transaction requirements between partners.

### Agreement Components

| Component | Description |
|-----------|-------------|
| Parties | Company and partner |
| Transactions | Supported message types |
| Communication | Protocol settings |
| Processing | MIG/MAG references |
| Validity | Effective dates |

### Agreement Templates

Reusable templates for common B2B scenarios:

1. **Create template** with standard settings
2. **Include transactions** (e.g., ORDERS, INVOIC)
3. **Define mappings** (MIG/MAG references)
4. **Apply to partners** to create agreements

### Transaction Types

| Direction | Description |
|-----------|-------------|
| Inbound | Partner sends to company |
| Outbound | Company sends to partner |

### Agreement Workflow

```
1. Create Agreement Template
        ↓
2. Select Partner Profile
        ↓
3. Generate Agreement
        ↓
4. Configure Partner-Specific Settings
        ↓
5. Activate Agreement
        ↓
6. Generate Runtime Artifacts
```

---

## Runtime Artifacts

TPM generates artifacts for Cloud Integration deployment.

### Generated Artifacts

| Artifact | Purpose |
|----------|---------|
| Partner Directory entries | Partner parameters |
| Integration flows | Message processing |
| Value mappings | ID translations |
| Agreements | Runtime configuration |

### Partner Directory

Central repository for partner parameters accessed at runtime:

```groovy
// Access partner info in iFlow
def pd = ITApiFactory.getService(PartnerDirectoryService.class, null)
def partner = pd.getPartner("PartnerID")
def as2Id = partner.getParameter("AS2_ID")
```

### Deployment Process

1. **Activate agreement** in TPM
2. **Push artifacts** to Partner Directory
3. **Deploy iFlows** to Cloud Integration
4. **Test** end-to-end

### Monitoring

Track B2B messages in Integration Suite Monitor:
- Partner identification
- Agreement reference
- Processing status
- Error details

---

## Glossary

| Term | Definition |
|------|------------|
| **Type System** | Standard message library |
| **MIG** | Message Implementation Guideline |
| **MAG** | Mapping Guideline |
| **TPM** | Trading Partner Management |
| **Partner Profile** | B2B partner configuration |
| **Agreement** | Transaction contract |
| **AS2** | Secure HTTP EDI protocol |
| **EDI** | Electronic Data Interchange |
| **Partner Directory** | Runtime parameter store |

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/glossary-for-sap-trading-partner-management-81860a4.md

---

## Related Documentation

- **Integration Advisor**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/integration-advisor-3309fe0.md
- **TPM Overview**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/trading-partner-management-28fe3dc.md
- **Glossary (IA)**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/terminology-glossary-for-sap-integration-advisor-9c221b4.md
- **Glossary (TPM)**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ISuite/glossary-for-sap-trading-partner-management-81860a4.md
