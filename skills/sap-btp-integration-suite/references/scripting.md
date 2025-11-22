# Scripting - Comprehensive Reference

**Source**: SAP BTP Integration Suite Documentation
**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/tree/main/docs/ci/Development
**Last Updated**: 2025-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Groovy Scripting](#groovy-scripting)
3. [JavaScript Scripting](#javascript-scripting)
4. [Script Collections](#script-collections)
5. [Common Use Cases](#common-use-cases)
6. [Best Practices](#best-practices)
7. [API Reference](#api-reference)

---

## Overview

SAP Cloud Integration supports two scripting languages:
- **Groovy** (primary, full API support)
- **JavaScript** (limited API support)

**When to Use Scripts**:
- Custom transformations not possible with standard steps
- Complex business logic
- Access to external libraries (Groovy)
- Dynamic routing decisions

**When NOT to Use Scripts**:
- Standard transformations (use Content Modifier, Mapping)
- Simple XML/JSON manipulation (use XPath, JSONPath)
- Standard encoding/decoding (use Encoder/Decoder steps)

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/general-scripting-guidelines-fcbf0f2.md

---

## Groovy Scripting

### Basic Structure

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // Your code here
    return message
}
```

### Accessing Message Components

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // Get message body as String
    def body = message.getBody(String.class)

    // Get message body as InputStream (for large payloads)
    def bodyStream = message.getBody(java.io.InputStream.class)

    // Get specific header
    def contentType = message.getHeader("Content-Type", String.class)

    // Get all headers as Map
    def headers = message.getHeaders()

    // Get exchange property
    def prop = message.getProperty("PropertyName")

    // Get all properties
    def props = message.getProperties()

    return message
}
```

### Modifying Message Components

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // Set body
    message.setBody("New body content")

    // Set body from object
    def data = [name: "John", age: 30]
    message.setBody(groovy.json.JsonOutput.toJson(data))

    // Set header
    message.setHeader("X-Custom-Header", "value")

    // Set property
    message.setProperty("CustomProperty", "value")

    return message
}
```

### XML Processing

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import groovy.xml.XmlSlurper
import groovy.xml.MarkupBuilder

def Message processData(Message message) {
    // Parse XML body (use parse for streams, not parseText)
    def body = message.getBody(java.io.InputStream.class)
    def xml = new XmlSlurper().parse(body)

    // Access elements
    def name = xml.customer.name.text()
    def id = xml.customer.@id.text()  // attribute

    // Iterate over elements
    xml.items.item.each { item ->
        println "Item: ${item.name.text()}"
    }

    // Create new XML
    def writer = new StringWriter()
    def builder = new MarkupBuilder(writer)
    builder.response {
        status("success")
        data(name)
    }
    message.setBody(writer.toString())

    return message
}
```

### JSON Processing

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

def Message processData(Message message) {
    // Parse JSON body
    def body = message.getBody(String.class)
    def json = new JsonSlurper().parseText(body)

    // Access properties
    def name = json.customer.name
    def items = json.items

    // Modify JSON
    json.customer.processed = true
    json.timestamp = new Date().format("yyyy-MM-dd'T'HH:mm:ss")

    // Convert back to JSON string
    message.setBody(JsonOutput.toJson(json))

    // Pretty print (avoid in production - performance impact)
    // message.setBody(JsonOutput.prettyPrint(JsonOutput.toJson(json)))

    return message
}
```

### Logging

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import org.slf4j.LoggerFactory

def Message processData(Message message) {
    def log = LoggerFactory.getLogger("script.processing")

    log.info("Processing started")
    log.debug("Body: ${message.getBody(String.class)}")
    log.warn("Warning message")
    log.error("Error occurred", new Exception("Details"))

    return message
}
```

### Secure Parameters

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import com.sap.it.api.ITApiFactory
import com.sap.it.api.securestore.SecureStoreService

def Message processData(Message message) {
    def secureStore = ITApiFactory.getService(SecureStoreService.class, null)
    def credential = secureStore.getUserCredential("CredentialName")

    def username = credential.getUsername()
    def password = new String(credential.getPassword())

    return message
}
```

### Value Mappings

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import com.sap.it.api.ITApiFactory
import com.sap.it.api.mapping.ValueMappingApi

def Message processData(Message message) {
    def vmApi = ITApiFactory.getService(ValueMappingApi.class, null)

    def targetValue = vmApi.getMappedValue(
        "SourceAgency",      // source agency
        "SourceIdentifier",  // source identifier
        "SourceValue",       // source value
        "TargetAgency",      // target agency
        "TargetIdentifier"   // target identifier
    )

    return message
}
```

### Attachments

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import javax.activation.DataHandler

def Message processData(Message message) {
    // Get all attachments
    def attachments = message.getAttachments()

    // Get specific attachment
    def attachment = message.getAttachment("filename.pdf")
    if (attachment) {
        def content = attachment.getContent()
    }

    // Add attachment
    def data = "Attachment content".getBytes()
    def dataSource = new javax.mail.util.ByteArrayDataSource(data, "text/plain")
    message.addAttachmentObject("newfile.txt", new DataHandler(dataSource))

    return message
}
```

---

## JavaScript Scripting

### Basic Structure

```javascript
function processData(message) {
    // Your code here
    return message;
}
```

### Accessing Message

```javascript
function processData(message) {
    // Get body
    var body = message.getBody(java.lang.String);

    // Get header
    var header = message.getHeader("Content-Type", java.lang.String);

    // Get property
    var prop = message.getProperty("PropertyName");

    // Set body
    message.setBody("New content");

    // Set header
    message.setHeader("X-Custom", "value");

    return message;
}
```

### JSON Processing

```javascript
function processData(message) {
    var body = message.getBody(java.lang.String);
    var json = JSON.parse(body);

    // Modify
    json.processed = true;

    message.setBody(JSON.stringify(json));
    return message;
}
```

**Note**: JavaScript has limited API support compared to Groovy.

---

## Script Collections

Reusable script libraries deployed as artifacts.

### Creating Script Collection

1. Create Script Collection artifact
2. Add script files (.groovy or .gsh)
3. Deploy to tenant

### Structure

```
ScriptCollection/
├── META-INF/
│   └── MANIFEST.MF
└── script/
    ├── Utils.groovy
    ├── Validators.groovy
    └── Transformers.groovy
```

### Using in Integration Flow

1. Add Script Collection reference in Resources
2. Import and use in Script step:

```groovy
import com.company.Utils

def Message processData(Message message) {
    def result = Utils.processData(message.getBody(String.class))
    message.setBody(result)
    return message
}
```

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/creating-a-script-collection-824bff0.md

---

## Common Use Cases

### Dynamic Routing

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    def body = message.getBody(String.class)
    def json = new groovy.json.JsonSlurper().parseText(body)

    def endpoint
    switch(json.region) {
        case "US":
            endpoint = "https://us-api.example.com"
            break
        case "EU":
            endpoint = "https://eu-api.example.com"
            break
        default:
            endpoint = "https://default-api.example.com"
    }

    message.setProperty("TargetEndpoint", endpoint)
    return message
}
```

### Add Timestamp

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import java.time.Instant

def Message processData(Message message) {
    message.setHeader("X-Timestamp", Instant.now().toString())
    message.setProperty("ProcessingTime", new Date())
    return message
}
```

### UUID Generation

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    def uuid = java.util.UUID.randomUUID().toString()
    message.setHeader("X-Correlation-ID", uuid)
    return message
}
```

### Base64 Encoding/Decoding

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    def body = message.getBody(String.class)

    // Encode
    def encoded = body.bytes.encodeBase64().toString()

    // Decode
    def decoded = new String(encoded.decodeBase64())

    message.setBody(encoded)
    return message
}
```

### Exception Handling

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import org.slf4j.LoggerFactory

def Message processData(Message message) {
    def log = LoggerFactory.getLogger("script")

    try {
        def body = message.getBody(String.class)
        def json = new groovy.json.JsonSlurper().parseText(body)
        // Process...
    } catch (Exception e) {
        log.error("Processing failed: ${e.message}", e)
        message.setProperty("ErrorMessage", e.message)
        throw e  // Re-throw to trigger error handling
    }

    return message
}
```

---

## Best Practices

### Do

1. **Use SLF4J for logging**
   ```groovy
   def log = LoggerFactory.getLogger("script")
   log.info("Message")
   ```

2. **Use streams for large payloads**
   ```groovy
   def body = message.getBody(java.io.InputStream.class)
   def xml = new XmlSlurper().parse(body)
   ```

3. **Use StringBuilder for string concatenation**
   ```groovy
   def sb = new StringBuilder()
   items.each { sb.append(it) }
   ```

4. **Include comments**
   ```groovy
   // Transform customer data to target format
   // Input: JSON with customer array
   // Output: XML with customer elements
   ```

5. **Use credential artifacts**
   ```groovy
   def secureStore = ITApiFactory.getService(SecureStoreService.class, null)
   def cred = secureStore.getUserCredential("MyCredential")
   ```

### Don't

1. **Don't use parseText() for large XML**
   ```groovy
   // BAD: Loads entire string into memory
   def xml = new XmlSlurper().parseText(bodyString)

   // GOOD: Stream-based parsing
   def xml = new XmlSlurper().parse(bodyStream)
   ```

2. **Don't write credentials to headers**
   ```groovy
   // BAD: Exposed in traces
   message.setHeader("Authorization", "Bearer " + token)

   // GOOD: Use adapter authentication
   ```

3. **Don't use TimeZone.setDefault()**
   - Affects entire JVM
   - Not thread-safe
   - Use explicit timezone in formatting

4. **Don't use Eval class**
   - Never unloaded from memory
   - Performance and security issues

5. **Don't bind variables unnecessarily**
   - Persists in memory
   - Not thread-safe
   - Causes memory leaks

**Documentation**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/general-scripting-guidelines-fcbf0f2.md

---

## API Reference

### Message API

| Method | Description |
|--------|-------------|
| `getBody(Class)` | Get body as specified type |
| `setBody(Object)` | Set message body |
| `getHeader(name, Class)` | Get specific header |
| `getHeaders()` | Get all headers as Map |
| `setHeader(name, value)` | Set header |
| `getProperty(name)` | Get property |
| `getProperties()` | Get all properties |
| `setProperty(name, value)` | Set property |
| `getAttachments()` | Get all attachments |
| `getAttachment(name)` | Get specific attachment |
| `addAttachmentObject(name, DataHandler)` | Add attachment |

### Available Services

| Service | Purpose |
|---------|---------|
| `SecureStoreService` | Access credentials |
| `ValueMappingApi` | Value mapping lookups |
| `PartnerDirectoryService` | Partner directory access |
| `DataStoreService` | Data store operations |

### Import Package

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import com.sap.it.api.ITApiFactory
import com.sap.it.api.securestore.SecureStoreService
import com.sap.it.api.mapping.ValueMappingApi
import org.slf4j.LoggerFactory
```

---

## Related Documentation

- **Scripting Guidelines**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/general-scripting-guidelines-fcbf0f2.md
- **Script Collections**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/creating-a-script-collection-824bff0.md
- **Script Use Cases**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/script-use-cases-148851b.md
- **Access Headers/Properties**: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/access-headers-and-properties-in-scripts-6bc5ed1.md
