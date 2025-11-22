# SAP HANA CLI - Connection & Security Guide

**Source**: https://github.com/SAP-samples/hana-developer-cli-tool-example

---

## Connection Credential Hierarchy

The hana-cli searches for connection credentials in this priority order:

### 1. default-env-admin.json (Highest Priority)
Used when `--admin` flag is specified.

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hana-admin",
      "credentials": {
        "host": "hostname.hanacloud.ondemand.com",
        "port": "443",
        "user": "DBADMIN",
        "password": "AdminPassword123",
        "schema": "MYSCHEMA",
        "encrypt": true,
        "sslValidateCertificate": true
      }
    }]
  }
}
```

### 2. .cdsrc-private.json (cds bind)
Most secure option for cloud credentials. Uses CAP binding.

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
        "instance": "my-hana-hdi"
      }
    }
  }
}
```

### 3. .env File
Environment variables with VCAP_SERVICES.

```bash
VCAP_SERVICES={"hana":[{"credentials":{"host":"...","port":"443",...}}]}
```

### 4. --conn Parameter
Specify custom connection file.

```bash
hana-cli tables --conn ./my-connection.json
```

### 5. ${homedir}/.hana-cli/
User-level configuration directory.

### 6. default-env.json
Project-level default connection.

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hana-db",
      "credentials": {
        "host": "hostname",
        "port": "30015",
        "user": "SYSTEM",
        "password": "Password123"
      }
    }]
  }
}
```

### 7. ${homedir}/.hana-cli/default.json (Lowest Priority)
Global fallback configuration.

---

## Connection Methods

### Interactive Connection

```bash
# Prompts for all parameters
hana-cli connect

# Partial parameters (prompts for missing)
hana-cli connect -n "myhost:443" -u MYUSER
```

### Direct Connection

```bash
# Full specification
hana-cli connect -n "hostname:443" -u USER -p PASSWORD --encrypt --save

# Using user store key
hana-cli connect -U MYKEY
```

### Service Key Connection (HANA Cloud)

```bash
# Interactive service key setup
hana-cli connectViaServiceKey
```

---

## SSL/TLS Configuration

### Enable Encryption

```bash
hana-cli connect --encrypt true
# or
hana-cli connect -e
# or
hana-cli connect --ssl
```

### Custom Trust Store

```bash
# Specify certificate file
hana-cli connect --trustStore /path/to/DigiCertGlobalRootCA.crt

# Alternative aliases
hana-cli connect --Trust /path/to/cert.pem
hana-cli connect -t /path/to/cert.pem
```

### HANA Cloud SSL

For SAP HANA Cloud, SSL is required. The connection automatically uses:
- Port 443
- SSL encryption enabled
- DigiCert Global Root CA (usually pre-installed)

---

## Credential Storage

### Save Credentials

```bash
# Save after connection (default behavior)
hana-cli connect -n "host:port" -u USER -p PASS --save

# Don't save
hana-cli connect --save false
```

### Credential Files Created

| File | Purpose |
|------|---------|
| `default-env.json` | Standard connection |
| `default-env-admin.json` | Admin connection |
| `.cdsrc-private.json` | CDS binding (gitignored) |

---

## Security Best Practices

### DO:
- Use `cds bind` for cloud credentials (no local storage)
- Add `default-env*.json` to `.gitignore`
- Add `.cdsrc-private.json` to `.gitignore`
- Use service keys for HANA Cloud
- Enable SSL/TLS for all connections
- Use user store keys when available

### DON'T:
- Commit credentials to version control
- Use plaintext passwords in scripts
- Disable SSL certificate validation in production
- Share admin credentials

---

## Connection File Templates

### HANA Cloud Connection

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hana-cloud",
      "label": "hana",
      "credentials": {
        "host": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.hana.trial-eu10.hanacloud.ondemand.com",
        "port": "443",
        "user": "DBADMIN",
        "password": "SecurePassword123!",
        "schema": "DBADMIN",
        "encrypt": true,
        "sslValidateCertificate": true
      }
    }]
  }
}
```

### On-Premise HANA Connection

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hana-onprem",
      "label": "hana",
      "credentials": {
        "host": "hana.company.internal",
        "port": "30015",
        "user": "DEVELOPER",
        "password": "Password123",
        "schema": "MYSCHEMA"
      }
    }]
  }
}
```

### HDI Container Connection

```json
{
  "VCAP_SERVICES": {
    "hana": [{
      "name": "hdi-container",
      "label": "hana",
      "credentials": {
        "host": "hostname",
        "port": "443",
        "user": "CONTAINER_USER",
        "password": "ContainerPass",
        "schema": "CONTAINER_SCHEMA",
        "hdi_user": "CONTAINER_USER",
        "hdi_password": "ContainerPass"
      }
    }]
  }
}
```

---

## Troubleshooting Connections

### Check Status

```bash
hana-cli status
```

### Test Connection

```bash
# Simple query test
hana-cli querySimple -q "SELECT CURRENT_USER FROM DUMMY"
```

### Common Issues

| Error | Cause | Solution |
|-------|-------|----------|
| Connection refused | Wrong host/port | Verify hostname and port |
| SSL handshake failed | Certificate issue | Add --trustStore |
| Authentication failed | Wrong credentials | Check user/password |
| Insufficient privilege | Missing permissions | Check user roles |

### Diagnose Privileges

```bash
hana-cli privilegeError
hana-cli inspectUser
```

---

## Connection Profiles

Use profiles for multiple environments:

```bash
# Use specific profile
hana-cli tables --profile dev
hana-cli tables --profile prod

# Profile stored in connection file
```

---

*Reference: https://github.com/SAP-samples/hana-developer-cli-tool-example*
