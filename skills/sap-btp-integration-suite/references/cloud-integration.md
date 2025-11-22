# Cloud Integration - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Integration Flow Structure](#integration-flow-structure)
3. [Flow Steps Reference](#flow-steps-reference)
4. [Message Processing](#message-processing)
5. [Data Persistence](#data-persistence)
6. [Error Handling](#error-handling)
7. [Quality of Service](#quality-of-service)
8. [Best Practices](#best-practices)

---

## Overview

Cloud Integration enables building and running integration flows across cloud, on-premise, and hybrid landscapes for:
- **A2A** (Application-to-Application)
- **B2B** (Business-to-Business)
- **B2G** (Business-to-Government)

**Key Concepts**:
- Integration flows define message processing pipelines
- Adapters connect to sender/receiver systems
- Steps transform, route, and process messages
- Security material protects sensitive data

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Development

---

## Integration Flow Structure

### Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                     Integration Flow                             │
├─────────────────────────────────────────────────────────────────┤
│  Sender ──► [Sender Adapter] ──► Integration Process            │
│                                        │                         │
│                              ┌─────────┴─────────┐               │
│                              │ Processing Steps  │               │
│                              │ - Transformations │               │
│                              │ - Routing         │               │
│                              │ - External Calls  │               │
│                              │ - Persistence     │               │
│                              └─────────┬─────────┘               │
│                                        │                         │
│                       ──► [Receiver Adapter] ──► Receiver        │
├─────────────────────────────────────────────────────────────────┤
│  Exception Subprocess (for error handling)                       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Types

| Component | Purpose |
|-----------|---------|
| **Sender/Receiver** | External systems connected to the flow |
| **Sender Channel** | Inbound adapter configuration |
| **Receiver Channel** | Outbound adapter configuration |
| **Integration Process** | Main message processing container |
| **Local Integration Process** | Reusable subprocess |
| **Exception Subprocess** | Error handling container |

---

## Flow Steps Reference

### Message Transformation Steps

#### Content Modifier
Enriches messages by modifying headers, properties, or body.

**Tabs**:
- **Message Header**: Headers sent to receiver systems
- **Exchange Property**: Internal flow properties (not transmitted)
- **Message Body**: Payload content

**Source Types**:
| Type | Description |
|------|-------------|
| Constant | Static value |
| Header | Reference Camel header |
| Property | Reference exchange property |
| XPath | Extract from XML using XPath |
| Expression | Camel Simple Expression |
| External Parameter | Externalized configuration |
| Local Variable | Flow-specific variable |
| Global Variable | Tenant-level variable |
| Number Range | Unique identifier |

**Example Expressions**:
```
${property.propertyName}
${header.headerName}
${in.body}
${exchangeId}
${camelId}
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/define-content-modifier-8f04a70.md

#### Message Mapping
Graphical transformation between source and target structures.

**Types**:
- **Flow Step Mapping**: Defined within the flow
- **Mapping Artifact**: Reusable standalone artifact

**Functions**:
- Standard functions (string, arithmetic, date, boolean)
- Conversion functions
- Custom Groovy functions

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/message-mapping-459ccdf.md

#### XSLT Mapping
XML transformation using XSLT stylesheets.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/create-xslt-mapping-5ce1f15.md

#### Converters
| Converter | Function |
|-----------|----------|
| JSON to XML | Convert JSON payload to XML |
| XML to JSON | Convert XML payload to JSON |
| CSV to XML | Convert CSV data to XML |
| XML to CSV | Convert XML data to CSV |
| EDI to XML | Convert EDI formats to XML |
| XML to EDI | Convert XML to EDI formats |

### Routing Steps

#### Router
Routes messages based on conditions.

**Condition Types**:
- **XML**: XPath expressions
- **Non-XML**: Header/property conditions

**Operators (Non-XML)**:
```
=, !=, >, >=, <, <=
and, or
contains, not contains
in, not in
regex, not regex
```

**Best Practice**: Use same condition type (XML or Non-XML) for all branches.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/define-router-d7fddbd.md

#### Filter
Removes messages not matching specified conditions.

#### Multicast
Sends message copies to multiple branches simultaneously.

#### Recipient List
Dynamically determines recipients at runtime.

### Splitting Steps

| Splitter Type | Use Case |
|---------------|----------|
| General Splitter | Split by XPath expression |
| Iterating Splitter | Process items one-by-one |
| IDoc Splitter | Split IDoc messages |
| EDI Splitter | Split EDI documents |
| Zip Splitter | Extract from ZIP archives |
| Tar Splitter | Extract from TAR archives |
| PKCS#7/CMS Splitter | Split encrypted messages |

**Difference**: General Splitter preserves envelope; Iterating Splitter strips envelope elements.

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/define-splitter-dabea9d.md

### Aggregator
Combines split messages back together.

**Correlation**: Uses correlation expression to group related messages.
**Completion**: Timeout or condition-based.

### External Call Steps

| Step | Purpose |
|------|---------|
| Request Reply | Synchronous call with response |
| Send | Asynchronous fire-and-forget |
| Poll Enrich | Fetch data to enrich message |
| Content Enricher | Merge external data into message |
| Process Call | Call local integration process |
| Looping Process Call | Iterate with local process |

### Security Steps

| Step | Purpose |
|------|---------|
| Encryptor | PGP/PKCS#7 encryption |
| Decryptor | PGP/PKCS#7 decryption |
| Signer | XML/PKCS#7 signature |
| Verifier | Signature verification |
| Message Digest | Hash calculation |

---

## Message Processing

### Message Components

```
┌───────────────────────────────────────┐
│           Camel Message               │
├───────────────────────────────────────┤
│  Headers                              │
│  ├─ CamelHttpMethod                   │
│  ├─ CamelHttpUri                      │
│  ├─ Content-Type                      │
│  └─ Custom headers...                 │
├───────────────────────────────────────┤
│  Body                                 │
│  └─ Message payload                   │
├───────────────────────────────────────┤
│  Attachments                          │
│  └─ Binary attachments                │
└───────────────────────────────────────┘

┌───────────────────────────────────────┐
│        Exchange Properties            │
│  ├─ SAP_MessageProcessingLogID        │
│  ├─ SAP_Receiver                      │
│  ├─ CamelSplitIndex                   │
│  └─ Custom properties...              │
└───────────────────────────────────────┘
```

### Accessing in Scripts

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // Get body
    def body = message.getBody(String.class)

    // Get header
    def contentType = message.getHeader("Content-Type", String.class)

    // Get property
    def logId = message.getProperty("SAP_MessageProcessingLogID")

    // Process and transform body
    def transformedBody = body.toUpperCase()

    // Set body (use the transformed result)
    message.setBody(transformedBody)

    // Set header
    message.setHeader("CustomHeader", "value")

    // Set property
    message.setProperty("CustomProperty", "value")

    return message
}
```

---

## Data Persistence

### Data Stores
Persistent storage for messages/data.

**Operations**:
| Operation | Description |
|-----------|-------------|
| Write | Store entry with ID |
| Get | Retrieve by ID |
| Select | Query multiple entries |
| Delete | Remove entry |

**Scope**: Global (cross-flow) or Local (single flow)

**Use Cases**:
- Decouple sender and processing
- Store intermediate results
- Implement idempotent processing

### Variables
Store values during runtime.

**Types**:
- **Local Variable**: Single flow scope
- **Global Variable**: Tenant-wide scope

### JMS Queues
Transactional message storage.

**Benefits**:
- Guaranteed delivery
- Transaction support
- Decoupling
- Retry handling

**Limits**: 30 queues per tenant (standard plan)

---

## Error Handling

### Exception Subprocess

**Required Structure**:
```
Error Start Event → [Processing Steps] → End Event
```

**End Event Types**:
- **End Message**: Return fault message to sender
- **Error End**: Throw to default handler
- **Escalation**: Trigger escalation handling

**Accessing Errors**:
```
${exception.message}
${exception.stacktrace}
```

**Limitations**:
- Cannot catch Data Store duplicate key errors (transaction rollback)
- Local process exceptions not caught by main process
- Processing terminates after handling

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/define-exception-subprocess-690e078.md

### Error Configuration

Configure adapter-level error handling:
- **Retry**: Automatic retry with intervals
- **Dead Letter**: Route failed messages
- **Alerting**: Trigger notifications

---

## Quality of Service

### Exactly-Once Delivery

Prevent duplicate processing:

1. **Idempotent Process Call**
   - Check for duplicate message IDs
   - Skip or return cached response

2. **ID Mapping**
   - Map source ID to target ID
   - Track processed messages

3. **JMS + Transaction**
   - Transactional message processing
   - Rollback on failure

### Idempotent Pattern

```
Sender → ID Mapping (Get) → Exists?
                              ├─ Yes → Return cached response
                              └─ No  → Process → ID Mapping (Store) → Response
```

---

## Best Practices

### Design Guidelines

1. **Keep flows readable**
   - Use meaningful names
   - Add comments
   - Keep processes focused

2. **Apply security standards**
   - Use credential artifacts (not hardcoded)
   - Encrypt sensitive data
   - Validate input

3. **Handle errors gracefully**
   - Use exception subprocesses
   - Log meaningful information
   - Implement retry logic

4. **Optimize performance**
   - Stream large payloads
   - Minimize transformations
   - Use appropriate adapters

### Scripting Guidelines

**Do**:
- Use SLF4J for logging
- Use `XmlSlurper.parse(Object)` for large XML
- Use `StringBuilder` for string operations
- Include comments

**Don't**:
- Write credentials to headers
- Use `TimeZone.setDefault()`
- Use `Eval()` class
- Bind variables unnecessarily

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/general-scripting-guidelines-fcbf0f2.md

---

## Related Documentation

- **Development Guide**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Development
- **Operations Guide**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Operations
- **Security Guide**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/SecurityCF
- **Design Guidelines**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/integration-flow-design-guidelines-6803389.md
