# SAP HANA CLI - Cloud & BTP Operations

**Source**: https://github.com/SAP-samples/hana-developer-cli-tool-example

Commands for managing SAP HANA Cloud instances and SAP BTP integration.

---

## BTP CLI Integration

The hana-cli integrates with SAP BTP CLI for cloud resource management.

### Configure BTP Target

```bash
# Configure BTP CLI targeting
hana-cli btp
```

This sets up the connection to your BTP global account.

### View BTP Information

```bash
# Display current BTP target
hana-cli btpInfo
```

### List BTP Subscriptions

```bash
# List subscribed services
hana-cli btpSubs
```

---

## HANA Cloud Instance Management

### List All HANA Cloud Instances

```bash
hana-cli hanaCloudInstances
```

### Start HANA Cloud Instance

```bash
# Start a stopped instance
hana-cli hanaCloudStart [instance]
```

**Use Cases**:
- Resume development after break
- Scheduled startup
- Cost management (stop during off-hours)

### Stop HANA Cloud Instance

```bash
# Stop running instance
hana-cli hanaCloudStop [instance]
```

**Note**: Stopping instances helps reduce costs. Trial instances auto-stop after inactivity.

---

## Cloud Instance Types

### HDI Instances

```bash
# List Cloud HDI instances
hana-cli hanaCloudHDIInstances

# UI version
hana-cli hanaCloudHDIInstancesUI
```

### Schema Instances

```bash
# List Cloud schema instances
hana-cli hanaCloudSchemaInstances

# UI version
hana-cli hanaCloudSchemaInstancesUI
```

### SBSS Instances

Service Broker Secure Store instances.

```bash
# List Cloud SBSS instances
hana-cli hanaCloudSBSSInstances

# UI version
hana-cli hanaCloudSBSSInstancesUI
```

### Secure Store Instances

```bash
# List Cloud secure store instances
hana-cli hanaCloudSecureStoreInstances

# UI version
hana-cli hanaCloudSecureStoreInstancesUI
```

### UPS Instances

User-Provided Service instances.

```bash
# List Cloud UPS instances
hana-cli hanaCloudUPSInstances

# UI version
hana-cli hanaCloudUPSInstancesUI
```

---

## Cloud Connection

### Using Service Keys

Connect to HANA Cloud using service keys:

```bash
# Interactive service key connection
hana-cli connectViaServiceKey
```

### Cloud Connection File

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hana-cloud",
      "credentials": {
        "host": "xxxxxxxx.hana.trial-eu10.hanacloud.ondemand.com",
        "port": "443",
        "user": "DBADMIN",
        "password": "SecurePass123!",
        "encrypt": true,
        "sslValidateCertificate": true
      }
    }]
  }
}
```

### SSL Requirements

HANA Cloud requires SSL:

```bash
hana-cli connect \
  -n "instance.hanacloud.ondemand.com:443" \
  -u DBADMIN \
  --encrypt true
```

---

## Cloud Shell Compatibility

The hana-cli works in cloud-based development environments:

### SAP Business Application Studio

```bash
# Open BAS in browser
hana-cli openBAS
```

### Google Cloud Shell

Full compatibility with GCP Cloud Shell.

### AWS Cloud9

Full compatibility with AWS Cloud9.

### Video Demo

Cloud shell usage: https://youtu.be/L7QyVLvAIIQ

---

## Cloud Workflows

### Development Instance Setup

1. **Create instance in SAP BTP Cockpit**

2. **Generate service key**

3. **Connect via hana-cli**:
   ```bash
   hana-cli connectViaServiceKey
   ```

4. **Verify connection**:
   ```bash
   hana-cli status
   hana-cli systemInfo
   ```

### Cost Optimization

1. **Check instance status**:
   ```bash
   hana-cli hanaCloudInstances
   ```

2. **Stop when not needed**:
   ```bash
   hana-cli hanaCloudStop myinstance
   ```

3. **Start when needed**:
   ```bash
   hana-cli hanaCloudStart myinstance
   ```

### HDI Container in Cloud

1. **List cloud HDI instances**:
   ```bash
   hana-cli hanaCloudHDIInstances
   ```

2. **Create container**:
   ```bash
   hana-cli createContainer MY_APP
   ```

3. **Create users**:
   ```bash
   hana-cli createContainerUsers MY_APP
   ```

---

## CDS Bind for Cloud

Use CDS binding for secure cloud credentials:

### Setup

```bash
# In your CAP project directory
cds bind --to hana --for hybrid
```

### .cdsrc-private.json

```json
{
  "requires": {
    "db": {
      "kind": "hana",
      "binding": {
        "type": "cf",
        "apiEndpoint": "https://api.cf.eu10.hana.ondemand.com",
        "org": "my-org",
        "space": "dev",
        "instance": "hana-hdi"
      }
    }
  }
}
```

### Benefits

- No local credential storage
- Dynamic credential lookup
- Works with rotated credentials
- Most secure option

### Tradeoff

Each command execution includes credential lookup, adding slight latency.

---

## Troubleshooting Cloud Connections

### Instance Not Responding

```bash
# Check if stopped
hana-cli hanaCloudInstances

# Start if needed
hana-cli hanaCloudStart myinstance
```

### SSL Certificate Issues

```bash
# Ensure encryption enabled
hana-cli connect --encrypt true

# Custom trust store if needed
hana-cli connect --trustStore /path/to/DigiCertGlobalRootCA.crt
```

### BTP Target Issues

```bash
# Reconfigure BTP
hana-cli btp

# Verify target
hana-cli btpInfo
```

---

## Cloud Resources

- **SAP HANA Cloud**: https://help.sap.com/docs/hana-cloud
- **SAP BTP**: https://help.sap.com/docs/btp
- **HANA Cloud Getting Started**: https://developers.sap.com/group.hana-cloud-get-started-1-trial.html

---

*Reference: https://github.com/SAP-samples/hana-developer-cli-tool-example*
