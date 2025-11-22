/**
 * SAP Cloud Integration - Groovy Script Template
 *
 * Usage: Replace placeholders and customize for your use case
 *
 * Placeholders:
 * - {{SCRIPT_NAME}}: Name/description of script purpose
 * - {{AUTHOR}}: Script author
 * - {{DATE}}: Creation date
 *
 * Documentation:
 * - Scripting Guidelines: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/general-scripting-guidelines-fcbf0f2.md
 * - Script API: https://github.com/SAP-docs/sap-btp-integration-suite/blob/main/docs/ci/Development/access-headers-and-properties-in-scripts-6bc5ed1.md
 */

import com.sap.gateway.ip.core.customdev.util.Message
import org.slf4j.LoggerFactory

/**
 * {{SCRIPT_NAME}}
 *
 * @author {{AUTHOR}}
 * @date {{DATE}}
 *
 * Input:
 *   - Body: Description of expected input format
 *   - Headers: List of required headers
 *   - Properties: List of required properties
 *
 * Output:
 *   - Body: Description of output format
 *   - Headers: List of headers set
 *   - Properties: List of properties set
 */
def Message processData(Message message) {
    // Initialize logger
    def log = LoggerFactory.getLogger("script.{{SCRIPT_NAME}}")

    try {
        // ===========================================
        // 1. GET MESSAGE COMPONENTS
        // ===========================================

        // Get message body (use InputStream for large payloads)
        def body = message.getBody(String.class)
        // def bodyStream = message.getBody(java.io.InputStream.class)

        // Get headers
        def contentType = message.getHeader("Content-Type", String.class)
        def customHeader = message.getHeader("X-Custom-Header", String.class)

        // Get properties
        def property1 = message.getProperty("PropertyName")

        // ===========================================
        // 2. PROCESS DATA
        // ===========================================

        log.info("Processing started")

        // Example: Parse JSON
        // def json = new groovy.json.JsonSlurper().parseText(body)
        // def value = json.fieldName

        // Example: Parse XML (use parse() for streams, not parseText())
        // def xml = new groovy.xml.XmlSlurper().parse(message.getBody(java.io.InputStream.class))
        // def value = xml.element.text()

        // Example: Process data
        def result = body.toUpperCase()

        // ===========================================
        // 3. SET OUTPUT
        // ===========================================

        // Set body
        message.setBody(result)

        // Set headers
        message.setHeader("X-Processed", "true")
        message.setHeader("X-Timestamp", java.time.Instant.now().toString())

        // Set properties
        message.setProperty("ProcessingStatus", "completed")

        log.info("Processing completed successfully")

    } catch (Exception e) {
        log.error("Processing failed: ${e.message}", e)
        message.setProperty("ErrorMessage", e.message)
        // Use StringWriter for readable stack trace
        def sw = new StringWriter()
        e.printStackTrace(new PrintWriter(sw))
        message.setProperty("ErrorStackTrace", sw.toString())
        throw e  // Re-throw to trigger exception handling
    }

    return message
}


// ===========================================
// ADDITIONAL SCRIPT PATTERNS
// ===========================================

/**
 * Pattern: JSON Transformation
 */
/*
def Message transformJson(Message message) {
    def log = LoggerFactory.getLogger("script.transformJson")

    def body = message.getBody(String.class)
    def input = new groovy.json.JsonSlurper().parseText(body)

    // Transform (use explicit UTC timezone for ISO 8601 format)
    def output = [
        id: input.customerId,
        name: input.customerName,
        timestamp: new Date().format("yyyy-MM-dd'T'HH:mm:ss'Z'", TimeZone.getTimeZone("UTC"))
    ]

    message.setBody(groovy.json.JsonOutput.toJson(output))
    return message
}
*/

/**
 * Pattern: XML Transformation
 */
/*
def Message transformXml(Message message) {
    def log = LoggerFactory.getLogger("script.transformXml")

    // Use parse() with InputStream for better memory handling
    def bodyStream = message.getBody(java.io.InputStream.class)
    def xml = new groovy.xml.XmlSlurper().parse(bodyStream)

    // Access elements
    def id = xml.customer.@id.text()
    def name = xml.customer.name.text()

    // Build new XML
    def writer = new StringWriter()
    def builder = new groovy.xml.MarkupBuilder(writer)
    builder.response {
        customerId(id)
        customerName(name)
        processed(true)
    }

    message.setBody(writer.toString())
    return message
}
*/

/**
 * Pattern: Secure Parameter Access
 */
/*
def Message accessSecureParams(Message message) {
    import com.sap.it.api.ITApiFactory
    import com.sap.it.api.securestore.SecureStoreService

    def secureStore = ITApiFactory.getService(SecureStoreService.class, null)
    def credential = secureStore.getUserCredential("CredentialName")

    def username = credential.getUsername()
    def password = new String(credential.getPassword())

    // Use credentials...
    return message
}
*/

/**
 * Pattern: Value Mapping Lookup
 */
/*
def Message lookupValueMapping(Message message) {
    import com.sap.it.api.ITApiFactory
    import com.sap.it.api.mapping.ValueMappingApi

    def vmApi = ITApiFactory.getService(ValueMappingApi.class, null)

    def targetValue = vmApi.getMappedValue(
        "SourceAgency",
        "SourceIdentifier",
        "SourceValue",
        "TargetAgency",
        "TargetIdentifier"
    )

    message.setProperty("MappedValue", targetValue)
    return message
}
*/

/**
 * Pattern: Dynamic Routing
 */
/*
def Message dynamicRouting(Message message) {
    def body = message.getBody(String.class)
    def json = new groovy.json.JsonSlurper().parseText(body)

    def endpoint
    switch(json.region?.toUpperCase()) {
        case "US":
            endpoint = "https://us-api.example.com/v1"
            break
        case "EU":
            endpoint = "https://eu-api.example.com/v1"
            break
        default:
            endpoint = "https://default-api.example.com/v1"
    }

    message.setProperty("DynamicEndpoint", endpoint)
    return message
}
*/

/**
 * Pattern: Attachment Handling
 */
/*
def Message handleAttachments(Message message) {
    import javax.activation.DataHandler

    // Get all attachments
    def attachments = message.getAttachments()

    attachments.each { name, dataHandler ->
        def content = dataHandler.getInputStream().text
        // Process attachment...
    }

    // Add new attachment
    def newContent = "Attachment content"
    def dataSource = new javax.mail.util.ByteArrayDataSource(
        newContent.getBytes(),
        "text/plain"
    )
    message.addAttachmentObject("output.txt", new DataHandler(dataSource))

    return message
}
*/
