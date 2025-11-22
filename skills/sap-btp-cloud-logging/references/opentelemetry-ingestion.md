# SAP Cloud Logging - OpenTelemetry Ingestion Reference

**Source:** https://github.com/SAP-docs/btp-cloud-logging/blob/main/docs/ingest-via-opentelemetry-api-endpoint-fdc78af.md
**Last Updated:** 2025-11-22

---

## Overview

SAP Cloud Logging accepts OpenTelemetry data through OTLP using a unified endpoint for logs, metrics, and traces. **Only gRPC protocol is supported** - http/protobuf and http/json must be converted using OpenTelemetry Collector.

---

## Index Patterns

| Signal Type | Index Pattern |
|-------------|---------------|
| Logs | `logs-otel-v1-*` |
| Metrics | `metrics-otel-v1-*` |
| Traces | `otel-v1-apm-span-*` |
| Service Map | `otel-v1-apm-service-map` |

**Note:** Attribute names have dots (`.`) replaced with `@` due to OpenSearch/Lucene limitations. Example: `service.name` becomes `service@name`.

---

## Enable OTLP Endpoint

### Step 1: Update Instance Configuration

```bash
cf update-service <instance-name> -c '{
  "ingest_otlp": {
    "enabled": true
  }
}'
```

Or via BTP CLI:
```bash
btp update services/instance \
  --subaccount <SUBACCOUNT_ID> \
  --name <instance-name> \
  --parameters '{"ingest_otlp": {"enabled": true}}'
```

### Step 2: Create New Service Binding

```bash
cf create-service-key <instance-name> otlp-key
cf service-key <instance-name> otlp-key
```

---

## Service Key Credentials

When OTLP is enabled, bindings include these additional credentials:

| Credential | Format | Description |
|------------|--------|-------------|
| `ingest-otlp-endpoint` | `hostname:443` | gRPC endpoint |
| `ingest-otlp-cert` | PEM | Client certificate |
| `ingest-otlp-key` | PKCS#8 | Private key |
| `server-ca` | PEM | Server CA certificate |

---

## Certificate Configuration

### Validity Period

| Setting | Value |
|---------|-------|
| Default Validity | 90 days |
| Configurable Range | 1-180 days |
| Parameter | `certValidityDays` |

### Configure Custom Validity

```bash
cf create-service-key <instance-name> my-key -c '{"certValidityDays": 180}'
```

### Certificate Rotation

Deleting a service key/binding does NOT revoke the certificate. To invalidate certificates:
1. Use root CA rotation (`rotate_root_ca` parameter)
2. Or wait for certificate expiration

---

## Manual Configuration

### Generic OpenTelemetry SDK Setup

```python
# Python example
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Configure exporter with mTLS
exporter = OTLPSpanExporter(
    endpoint="<ingest-otlp-endpoint>",
    credentials=ssl_channel_credentials(
        root_certificates=open("server-ca.pem", "rb").read(),
        private_key=open("client-key.pem", "rb").read(),
        certificate_chain=open("client-cert.pem", "rb").read(),
    ),
)

# Set up provider
provider = TracerProvider()
processor = BatchSpanProcessor(exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)
```

### OpenTelemetry Collector Configuration

Use when you need to convert http/protobuf or http/json to gRPC:

```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317

exporters:
  otlp/cls:
    endpoint: "<ingest-otlp-endpoint>"
    tls:
      cert_file: /certs/client.crt
      key_file: /certs/client.key
      ca_file: /certs/server-ca.crt

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [otlp/cls]
    metrics:
      receivers: [otlp]
      exporters: [otlp/cls]
    logs:
      receivers: [otlp]
      exporters: [otlp/cls]
```

---

## Java Automation

SAP provides a BTP Observability Extension that automatically configures OTLP exporters.

### Maven Dependency

```xml
<dependency>
  <groupId>com.sap.cloud.environment.servicebinding</groupId>
  <artifactId>java-modules-bom</artifactId>
  <version>${sap.cloud.sdk.version}</version>  <!-- Pin to specific version -->
  <type>pom</type>
  <scope>import</scope>
</dependency>

<dependency>
  <groupId>com.sap.cloud.observability</groupId>
  <artifactId>observability-client</artifactId>
</dependency>
```

**Note:** For production, pin versions instead of using `LATEST`. Check [SAP Cloud SDK releases](https://sap.github.io/cloud-sdk/docs/java/release-notes) for current stable versions.

### How It Works

1. Extension automatically scans environment variables for Cloud Logging bindings
2. Configures OTLP exporters for logs, metrics, and traces
3. No manual endpoint configuration required

### Spring Boot Integration

```yaml
# application.yaml
management:
  tracing:
    sampling:
      probability: 1.0
```

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

## Node.js Automation

SAP provides a dedicated Cloud Logging exporter package.

### Installation

```bash
npm install @sap/cloud-logging-client
```

### Usage

```javascript
const { CloudLoggingExporter } = require('@sap/cloud-logging-client');

// Automatically scans VCAP_SERVICES for Cloud Logging binding
const exporter = new CloudLoggingExporter();

// Configure OpenTelemetry SDK
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new BatchSpanProcessor(exporter.getTraceExporter()));
provider.register();
```

### Features

- Automatic binding detection from `VCAP_SERVICES`
- Pre-configured exporters for logs, metrics, and traces
- Handles mTLS certificate configuration

---

## User-Provided Service for OTLP

For scenarios where you need to manually configure OTLP credentials (e.g., sharing across spaces):

```bash
# Create credentials.json with OTLP service key values
cat > credentials.json << 'EOF'
{
  "ingest-otlp-endpoint": "<endpoint>:443",
  "ingest-otlp-cert": "<client-cert>",
  "ingest-otlp-key": "<client-key>",
  "server-ca": "<server-ca>"
}
EOF

# Create user-provided service with "Cloud Logging" tag
cf cups <service-name> -p credentials.json -t "Cloud Logging"
```

**Important:** The `Cloud Logging` tag is required for automatic detection by SAP libraries.

---

## Attribute Name Mapping

**Important:** Signal and resource attribute names have dots (`.`) replaced with `@` and contain a prefix specifying the attribute type.

| Original Attribute | Mapped Attribute |
|--------------------|------------------|
| `service.name` | `resource@service@name` |
| `http.method` | `attributes@http@method` |
| `span.kind` | `span@kind` |

This mapping is due to OpenSearch/Lucene field name limitations.

---

## Kubernetes/Kyma Setup

### Deploy Credentials as Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cls-otlp-credentials
  namespace: my-app
type: Opaque
stringData:
  OTEL_EXPORTER_OTLP_ENDPOINT: "<ingest-otlp-endpoint>"
  OTEL_EXPORTER_OTLP_CERTIFICATE: |
    <ingest-otlp-cert content>
  OTEL_EXPORTER_OTLP_CLIENT_KEY: |
    <ingest-otlp-key content>
  OTEL_EXPORTER_OTLP_CA_CERTIFICATE: |
    <server-ca content>
```

### Application Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      containers:
      - name: app
        envFrom:
        - secretRef:
            name: cls-otlp-credentials
        volumeMounts:
        - name: certs
          mountPath: /certs
          readOnly: true
      volumes:
      - name: certs
        secret:
          secretName: cls-otlp-credentials
```

---

## Troubleshooting

### Connection Refused

1. Verify `ingest_otlp.enabled: true` in instance configuration
2. Check endpoint format is `hostname:443` (not `https://...`)
3. Verify firewall/network allows gRPC traffic

### Certificate Errors

1. Ensure all three certificates are provided:
   - Client certificate (`ingest-otlp-cert`)
   - Client key (`ingest-otlp-key`)
   - Server CA (`server-ca`)
2. Verify certificate hasn't expired
3. Check PEM format is correct (includes headers)

### Data Not Appearing

1. Check correct index pattern in Dashboards
2. Remember attribute name transformation (`.` → `@`)
3. Verify data is being exported (check collector logs)

### Protocol Mismatch

- **Symptom:** "protocol not supported" errors
- **Solution:** OTLP endpoint only accepts gRPC. Use OpenTelemetry Collector to convert http protocols.

---

## Documentation Links

- **Source:** https://raw.githubusercontent.com/SAP-docs/btp-cloud-logging/main/docs/ingest-via-opentelemetry-api-endpoint-fdc78af.md
- **OpenTelemetry:** https://opentelemetry.io/docs/
- **OpenTelemetry Collector:** https://opentelemetry.io/docs/collector/
- **SAP BTP Observability:** https://help.sap.com/docs/btp/sap-business-technology-platform/observability
