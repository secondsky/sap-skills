# Service Catalog (svcat) and Broker Proxy Reference

Legacy Kubernetes integration using Service Catalog and Service Manager Broker Proxy.

**Note**: For new installations, prefer the SAP BTP Service Operator. See `kubernetes-operator.md`.

**Documentation**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments

---

## Overview

Before the SAP BTP Service Operator, Kubernetes clusters used:
1. **Service Catalog (svcat)** - Kubernetes SIG project for service management
2. **Service Manager Broker Proxy** - Connects Service Catalog to SAP Service Manager

This approach is now **deprecated** in favor of the SAP BTP Service Operator.

---

## Prerequisites

- Kubernetes cluster with kubeconfig
- kubectl v1.17.4+ compatible
- Helm v3.x
- SMCTL CLI installed and logged in
- SAP Service Manager subscription

---

## Cluster Configuration

### Step 1: Register the Cluster as a Platform

```bash
# Register Kubernetes cluster with Service Manager
smctl register-platform <platform-name> kubernetes

# Note: Platform name must be unique within the region
# Returns credentials (username/password) needed for broker proxy
```

**Save the returned credentials** - they are needed for the broker proxy installation.

---

### Step 2: Install Service Catalog

```bash
# Add Service Catalog Helm repository
helm repo add svc-cat https://svc-catalog-charts.storage.googleapis.com

# Create catalog namespace
kubectl create namespace catalog

# Install Service Catalog
helm install catalog svc-cat/catalog --namespace catalog
```

**Version Note**: svcat v0.3.0 is required for compatibility with Kubernetes v1.17.4+.

**Verify Installation**:
```bash
kubectl get pods -n catalog
```

---

### Step 3: Install Service Manager Broker Proxy

```bash
# Add Peripli Helm repository
helm repo add peripli https://peripli.github.io

# Create namespace
kubectl create namespace service-broker-proxy

# Install broker proxy
helm install service-broker-proxy peripli/service-broker-proxy \
  --namespace service-broker-proxy \
  --version 0.7.0 \
  --set config.sm.url=https://service-manager.cfapps.<region>.hana.ondemand.com \
  --set sm.user=<username-from-step-1> \
  --set sm.password=<password-from-step-1>
```

**SM_URL Format**: `https://service-manager.cfapps.<landscape domain>`

**Regional Examples**:
- EU10 (Frankfurt): `https://service-manager.cfapps.eu10.hana.ondemand.com`
- US10 (US East): `https://service-manager.cfapps.us10.hana.ondemand.com`

---

## Service Catalog CLI (svcat)

### Installation

**Mac OS**:
```bash
# Download binary
curl -sLO https://download.svcat.sh/cli/latest/darwin/amd64/svcat

# Make executable
chmod +x ./svcat

# Move to PATH
sudo mv ./svcat /usr/local/bin/

# Verify
svcat version --client
```

**Windows**:
```powershell
# Download executable
iwr https://download.svcat.sh/cli/latest/windows/amd64/svcat.exe -o svcat.exe

# Create bin directory
mkdir ~\bin

# Move executable
Move-Item svcat.exe ~\bin\

# Add to PATH (PowerShell profile)
$env:PATH += ";$HOME\bin"

# Verify
svcat version --client
```

**Reference**: https://svc-cat.io/docs/install/#installing-the-service-catalog-cli

---

## svcat Commands

### Browse Marketplace

```bash
# List all available services
svcat marketplace

# Short form
svcat mp
```

---

### Provision Service Instance

```bash
# Create service instance
svcat provision <instance-name> --class <service-name> --plan <plan-name>

# Example: Create XSUAA instance
svcat provision my-xsuaa --class xsuaa --plan application

# With parameters
svcat provision my-hana --class hana --plan hdi-shared \
  --param database_id=<hana-db-guid>
```

---

### List Instances

```bash
# List all provisioned instances
svcat get instances
```

---

### Deprovision Service Instance

```bash
# Delete service instance
svcat deprovision <instance-name>
```

---

### Create Binding

```bash
# Create binding for instance
svcat bind <instance-name>

# With specific binding name
svcat bind <instance-name> --name <binding-name>
```

---

### List Bindings

```bash
# List all bindings
svcat get bindings
```

---

### Delete Binding

```bash
# Remove binding
svcat unbind <instance-name> --name <binding-name>
```

---

### Get Credentials

```bash
# View binding credentials (stored in Kubernetes secret)
kubectl get secret <binding-name> -o yaml
```

---

## Migration to SAP BTP Service Operator

**Important**: Service Catalog is deprecated. Migrate to SAP BTP Service Operator.

See `kubernetes-operator.md` for:
- SAP BTP Service Operator setup
- Migration procedure from svcat
- ServiceInstance and ServiceBinding CRDs

### Quick Migration Overview

1. Install SAP BTP Service Operator (see `kubernetes-operator.md`)
2. Install migration CLI tool
3. Prepare platform: `smctl curl -X PATCH "/v1/platforms/<platformID>" -d '{"credentials":{"rotatable":true}}'`
4. Dry run: `btpmigrate --dry-run`
5. Execute: `btpmigrate`

**Warning**: Once migration starts, the platform becomes suspended. The process is reversible until actual resource migration begins.

---

## Troubleshooting

### Service Catalog Not Finding Services

**Check**:
1. Broker proxy running: `kubectl get pods -n service-broker-proxy`
2. Service Manager credentials valid
3. Platform registered: `smctl list-platforms`

### Provisioning Fails

**Check**:
1. Service entitled in subaccount
2. Correct plan name
3. Broker proxy logs: `kubectl logs -n service-broker-proxy deployment/service-broker-proxy`

### svcat Command Not Found

**Solution**: Ensure svcat is in PATH:
```bash
# Mac/Linux
export PATH=$PATH:/usr/local/bin

# Or reinstall
curl -sLO https://download.svcat.sh/cli/latest/darwin/amd64/svcat
chmod +x svcat
sudo mv svcat /usr/local/bin/
```

---

## Documentation Links

- **Cluster Configuration**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/cluster-configuration-a55506d.md
- **Service Catalog Guide**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/working-with-service-catalog-86ab6f9.md
- **Service Catalog Official**: https://svc-cat.io/docs/
- **Migration Guide**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/migrating-from-svcat-to-sap-btp-service-ec7f5c7.md
