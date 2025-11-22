# Tools Reference

Complete reference for SAP BTP administration and development tools.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/tools-abcae5b.md

---

## Table of Contents

1. [Administration Tools](#administration-tools)
2. [btp CLI](#btp-cli)
3. [Cloud Foundry CLI](#cloud-foundry-cli)
4. [Development Tools](#development-tools)
5. [Kubernetes Tools](#kubernetes-tools)
6. [Terraform Provider](#terraform-provider)

---

## Administration Tools

| Tool | Purpose | Access |
|------|---------|--------|
| **SAP BTP Cockpit** | Web-based admin UI | https://cockpit.btp.cloud.sap |
| **btp CLI** | Terminal administration | Download from BTP Cockpit |
| **REST APIs** | Programmatic access | SAP API Business Hub |
| **Terraform Provider** | Infrastructure as Code | registry.terraform.io |
| **SAP Automation Pilot** | Low-code automation | BTP service |

---

## btp CLI

### Installation

1. Download from BTP Cockpit → Downloads
2. Extract and add to PATH
3. Verify: `btp --version`

### Authentication

```bash
# Login with SSO
btp login

# Login with specific URL
btp login --url https://cpcli.cf.eu10.hana.ondemand.com

# Login with password (not recommended)
btp login --user user@example.com --password xxx

# Logout
btp logout
```

### Global Account Operations

```bash
# List subaccounts
btp list accounts/subaccount

# Get global account details
btp get accounts/global-account

# List directories
btp list accounts/directory
```

### Subaccount Operations

```bash
# Create subaccount
btp create accounts/subaccount \
  --display-name "Development" \
  --subdomain dev-acme \
  --region eu10

# Update subaccount
btp update accounts/subaccount <subaccount-id> \
  --display-name "New Name"

# Delete subaccount
btp delete accounts/subaccount <subaccount-id>

# Target subaccount (set context)
btp target --subaccount <subaccount-id>
```

### Directory Operations

```bash
# Create directory
btp create accounts/directory \
  --display-name "HR" \
  --directory-features ENTITLEMENTS,AUTHORIZATIONS

# List directories
btp list accounts/directory

# Delete directory
btp delete accounts/directory <directory-id>
```

### Entitlement Operations

```bash
# List entitlements
btp list accounts/entitlement

# Assign entitlement to subaccount
btp assign accounts/entitlement \
  --to-subaccount <subaccount-id> \
  --for-service hana-cloud \
  --plan hana \
  --amount 1

# Remove entitlement
btp unassign accounts/entitlement \
  --from-subaccount <subaccount-id> \
  --for-service hana-cloud \
  --plan hana
```

### Environment Operations

```bash
# List environments
btp list accounts/environment-instance

# Create environment instance
btp create accounts/environment-instance \
  --subaccount <id> \
  --environment cloudfoundry \
  --plan standard \
  --landscape eu10-004

# Delete environment
btp delete accounts/environment-instance <instance-id> --subaccount <subaccount-id>
```

### Security Operations

```bash
# List role collections
btp list security/role-collection

# Assign user to role collection
btp assign security/role-collection "Subaccount Administrator" \
  --to-user user@example.com \
  --of-idp sap.ids

# Assign group to role collection
btp assign security/role-collection "Developers" \
  --to-group "DevTeam" \
  --of-idp my-idp
```

### Service Operations

```bash
# List available services
btp list services/offering

# List service plans
btp list services/plan

# Create service instance
btp create services/instance \
  --subaccount <id> \
  --offering-name hana-cloud \
  --plan-name hana \
  --name my-hana
```

### Output Formats

```bash
# JSON output
btp --format json list accounts/subaccount

# Table output (default)
btp list accounts/subaccount
```

---

## Cloud Foundry CLI

### Installation

```bash
# macOS
brew install cloudfoundry/tap/cf-cli@8

# Linux (Debian/Ubuntu)
wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
sudo apt update && sudo apt install cf8-cli

# Windows (via Chocolatey)
choco install cloudfoundry-cli
```

### Authentication

```bash
# Login
cf login -a https://api.cf.eu10.hana.ondemand.com

# Login with SSO
cf login --sso

# Target org and space
cf target -o my-org -s my-space

# Logout
cf logout
```

### Application Commands

```bash
# Push application
cf push my-app -p ./app.jar -m 512M -i 2

# List applications
cf apps

# View application details
cf app my-app

# Start/Stop/Restart
cf start my-app
cf stop my-app
cf restart my-app

# Scale
cf scale my-app -i 3 -m 1G

# Delete application
cf delete my-app -f
```

### Service Commands

```bash
# Marketplace
cf marketplace

# Create service instance
cf create-service hana hdi-shared my-hana

# List services
cf services

# Bind service
cf bind-service my-app my-hana

# Unbind service
cf unbind-service my-app my-hana

# Create service key
cf create-service-key my-hana my-key

# View service key
cf service-key my-hana my-key
```

### Log Commands

```bash
# View recent logs
cf logs my-app --recent

# Tail logs
cf logs my-app

# View events
cf events my-app
```

### CF CLI Plugins

| Plugin | Purpose | Installation |
|--------|---------|--------------|
| MTA | Multi-target apps | `cf install-plugin -r CF-Community multiapps` |
| HTML5 | HTML5 apps | `cf install-plugin -r CF-Community html5-plugin` |
| Service Fabrik | Service management | From SAP |

```bash
# Install MTA plugin
cf install-plugin -r CF-Community multiapps

# Deploy MTA
cf deploy my-app.mtar

# List MTAs
cf mtas
```

---

## Development Tools

### SAP Business Application Studio

Web-based IDE features:
- VS Code-based editor
- Dev Spaces with preconfigured tools
- SAP Fiori development
- CAP development
- ABAP development (via ADT)

**Access**: Subaccount → Services → SAP Business Application Studio

### SAP Build

Low-code/no-code platform:
- SAP Build Apps (drag-and-drop apps)
- SAP Build Process Automation (workflows)
- SAP Build Work Zone (unified launchpad)

### SAP Cloud SDK

Development libraries:
- Java SDK
- JavaScript/TypeScript SDK
- Abstraction for multitenancy, connectivity, logging

```bash
# Install JavaScript SDK
npm install @sap-cloud-sdk/core
```

### Eclipse Tools

| Tool | Purpose |
|------|---------|
| **ADT** | ABAP Development Tools |
| **CF Plugin** | Cloud Foundry deployment |

---

## Kubernetes Tools

### kubectl

```bash
# Install
brew install kubectl  # macOS
sudo apt install kubectl  # Linux

# Configure for Kyma
export KUBECONFIG=~/.kube/kyma-config.yaml
kubectl get pods -A
```

### kubelogin

OIDC authentication for Kyma:

```bash
# Install
brew install int128/kubelogin/kubelogin

# Login
kubelogin
```

### Helm

```bash
# Install
brew install helm

# Add repo
helm repo add my-repo https://charts.example.com

# Install chart
helm install my-release my-repo/my-chart -n my-namespace

# Upgrade
helm upgrade my-release my-repo/my-chart

# List releases
helm list -A
```

### Docker

```bash
# Build image
docker build -t my-app:latest .

# Push to registry
docker push my-registry/my-app:latest

# Run locally
docker run -p 8080:8080 my-app:latest
```

### Pack (Cloud Native Buildpacks)

```bash
# Install
brew install buildpacks/tap/pack

# Build image
pack build my-app --builder paketobuildpacks/builder:base
```

---

## Terraform Provider

### Installation

```hcl
terraform {
  required_providers {
    btp = {
      source  = "SAP/btp"
      version = "~> 1.0"
    }
  }
}
```

### Provider Configuration

```hcl
provider "btp" {
  globalaccount = "my-global-account"
  cli_server_url = "https://cli.btp.cloud.sap"
}
```

### Resource Examples

```hcl
# Subaccount
resource "btp_subaccount" "dev" {
  name      = "Development"
  subdomain = "dev-acme"
  region    = "eu10"
}

# Entitlement
resource "btp_subaccount_entitlement" "hana" {
  subaccount_id = btp_subaccount.dev.id
  service_name  = "hana-cloud"
  plan_name     = "hana"
  amount        = 1
}

# Role collection assignment
resource "btp_subaccount_role_collection_assignment" "dev_admin" {
  subaccount_id        = btp_subaccount.dev.id
  role_collection_name = "Subaccount Administrator"
  user_name            = "admin@example.com"
  origin               = "sap.ids"
}
```

---

## Related Documentation

- Tools Overview: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/tools-abcae5b.md
- btp CLI: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/50-administration-and-ops
- Terraform: https://registry.terraform.io/providers/SAP/btp/latest/docs
