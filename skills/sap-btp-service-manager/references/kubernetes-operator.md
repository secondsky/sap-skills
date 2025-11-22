# SAP BTP Service Operator for Kubernetes

The SAP BTP Service Operator enables Kubernetes clusters to consume SAP BTP services through native Kubernetes resources.

**GitHub Repository**: https://github.com/SAP/sap-btp-service-operator

**Documentation**: https://github.com/SAP-docs/sap-btp-service-manager/tree/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments

---

## Prerequisites

### Infrastructure & Tools

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Kubernetes cluster | - | Target deployment |
| kubectl | 1.7+ | Cluster management |
| Helm | 3.1.2+ | Operator deployment |
| SMCTL | 1.10.1+ | Service Manager CLI |

### Environment Setup

```bash
# Configure kubeconfig
export KUBECONFIG='/path/to/kubeconfig.yaml'

# Verify kubectl
kubectl version --client

# Verify Helm
helm version
```

### SAP BTP Requirements

- Active SAP Service Manager subscription
- Subaccount Service Administrator role
- Access to SAP BTP cockpit or SMCTL

---

## Setup Process

### Step 1: Install cert-manager

cert-manager handles TLS certificates for operator communication.

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# Verify installation
kubectl get pods -n cert-manager
```

Wait for all cert-manager pods to be Running.

---

### Step 2: Create Service Manager Credentials

**Option A: Using SMCTL**

```bash
# Login to Service Manager
smctl login -a https://service-manager.cfapps.<region>.hana.ondemand.com \
  --param subdomain=<subdomain>

# Create instance with service-operator-access plan
smctl provision sm-operator service-manager service-operator-access --mode sync

# Create binding
smctl bind sm-operator sm-operator-binding --mode sync

# Get credentials
smctl get-binding sm-operator-binding -o json
```

**Option B: Using BTP Cockpit**

1. Navigate to Services > Service Marketplace
2. Find "Service Manager"
3. Create instance with plan "service-operator-access"
4. Create binding and download credentials

---

### Step 3: Extract Credentials

From the binding, extract:

**Default Credentials**:
- `clientid`
- `clientsecret`
- `sm_url`
- `url` (UAA URL)

**X.509 Credentials** (if configured):
- `clientid`
- `certificate`
- `key`
- `certurl`
- `sm_url`

---

### Step 4: Deploy Operator with Helm

**Using Default Credentials**:

```bash
# Add Helm repository
helm repo add sap-btp-operator https://sap.github.io/sap-btp-service-operator/
helm repo update

# Install operator
helm install sap-btp-operator sap-btp-operator/sap-btp-operator \
  --namespace sap-btp-operator \
  --create-namespace \
  --set manager.secret.clientid=<clientid> \
  --set manager.secret.clientsecret=<clientsecret> \
  --set manager.secret.sm_url=<sm_url> \
  --set manager.secret.tokenurl=<url>/oauth/token
```

**Using X.509 Credentials**:

```bash
helm install sap-btp-operator sap-btp-operator/sap-btp-operator \
  --namespace sap-btp-operator \
  --create-namespace \
  --set manager.secret.clientid=<clientid> \
  --set manager.secret.tls.crt="$(cat cert.pem)" \
  --set manager.secret.tls.key="$(cat key.pem)" \
  --set manager.secret.sm_url=<sm_url> \
  --set manager.secret.tokenurl=<certurl>/oauth/token
```

**Verify Installation**:

```bash
kubectl get pods -n sap-btp-operator
kubectl get crds | grep services.cloud.sap.com
```

---

## Custom Resource Definitions

### ServiceInstance CRD

**apiVersion**: `services.cloud.sap.com/v1alpha1`
**kind**: `ServiceInstance`

**Full Specification**:

```yaml
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceInstance
metadata:
  name: my-service-instance
  namespace: default
  labels:
    app: my-app
spec:
  # Required: Service offering name from marketplace
  serviceOfferingName: xsuaa

  # Required: Service plan name
  servicePlanName: application

  # Optional: External name (appears in BTP cockpit)
  externalName: my-instance-external-name

  # Optional: Service-specific parameters
  parameters:
    xsappname: my-app
    tenant-mode: dedicated
    scopes:
      - name: read
        description: Read access
    role-templates:
      - name: Viewer
        scope-references:
          - read

  # Optional: Reference to secret containing parameters
  parametersFrom:
    - secretKeyRef:
        name: my-params-secret
        key: parameters

  # Optional: Custom tags
  customTags:
    - environment:production
    - team:platform
```

**Create Instance**:

```bash
kubectl apply -f service-instance.yaml
```

**Check Status**:

```bash
kubectl get serviceinstances
kubectl describe serviceinstance my-service-instance
```

**Status Conditions**:
- `Ready`: Instance is ready for use
- `Failed`: Provisioning failed

---

### ServiceBinding CRD

**apiVersion**: `services.cloud.sap.com/v1alpha1`
**kind**: `ServiceBinding`

**Full Specification**:

```yaml
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceBinding
metadata:
  name: my-binding
  namespace: default
spec:
  # Required: Reference to ServiceInstance
  serviceInstanceName: my-service-instance

  # Optional: External name
  externalName: my-binding-external

  # Optional: Binding parameters
  parameters:
    credential-type: x509
    key-length: 4096
    validity-type: MONTHS
    validity: 6

  # Optional: Reference to secret containing parameters
  parametersFrom:
    - secretKeyRef:
        name: binding-params
        key: parameters

  # Optional: Name of secret to create (defaults to binding name)
  secretName: my-binding-secret

  # Optional: Secret template for custom formatting
  secretKey: credentials.json

  # Optional: Root key in secret
  secretRootKey: credentials
```

**Create Binding**:

```bash
kubectl apply -f service-binding.yaml
```

**Check Status**:

```bash
kubectl get servicebindings
kubectl describe servicebinding my-binding
```

**Access Credentials**:

```bash
# Credentials stored in Kubernetes secret
kubectl get secret my-binding -o yaml

# Decode credentials
kubectl get secret my-binding -o jsonpath='{.data.clientid}' | base64 -d
kubectl get secret my-binding -o jsonpath='{.data.clientsecret}' | base64 -d
```

---

## Using Credentials in Pods

### Environment Variables

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:latest
      env:
        - name: XSUAA_CLIENTID
          valueFrom:
            secretKeyRef:
              name: my-binding
              key: clientid
        - name: XSUAA_CLIENTSECRET
          valueFrom:
            secretKeyRef:
              name: my-binding
              key: clientsecret
        - name: XSUAA_URL
          valueFrom:
            secretKeyRef:
              name: my-binding
              key: url
```

### Volume Mount

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:latest
      volumeMounts:
        - name: credentials
          mountPath: /etc/secrets
          readOnly: true
  volumes:
    - name: credentials
      secret:
        secretName: my-binding
```

---

## Migration from Service Catalog (svcat)

### Prerequisites

- SMCTL CLI installed
- Service Catalog (svcat) currently deployed
- Access to both svcat and SAP BTP Service Operator

### Step 1: Prepare Platform

```bash
# Get cluster ID from catalog ConfigMap
CLUSTER_ID=$(kubectl get configmap cluster-info -n catalog -o jsonpath='{.data.id}')

# Prepare platform for migration
smctl curl -X PATCH "/v1/platforms/<platformID>" \
  -d '{"credentials":{"rotatable":true}}' \
  --param subaccount_id=<subaccount-id>
```

### Step 2: Install Migration CLI

```bash
# From GitHub releases
# https://github.com/SAP/sap-btp-service-operator/releases

# Or via Go
go install github.com/SAP/sap-btp-service-operator/tools/btpmigrate@latest
```

### Step 3: Dry Run Migration

```bash
# Test migration without making changes
btpmigrate --dry-run
```

Review any errors before proceeding.

### Step 4: Execute Migration

```bash
# Perform actual migration
btpmigrate
```

### Migration Process

1. **Scanning**: Fetches all instances/bindings from svcat and BTP
2. **Validation**: Verifies each resource can be migrated
3. **Migration**: Removes from svcat, adds to BTP operator

### Important Notes

- Platform becomes suspended during migration
- Reversible until actual migration starts
- Original svcat platform unusable after migration
- Test in non-production first

---

## Troubleshooting

### Operator Not Starting

```bash
# Check operator pods
kubectl get pods -n sap-btp-operator

# Check operator logs
kubectl logs -n sap-btp-operator deployment/sap-btp-operator-controller-manager

# Verify cert-manager
kubectl get pods -n cert-manager
```

### Instance Creation Fails

```bash
# Check instance status
kubectl describe serviceinstance <name>

# Look for events
kubectl get events --field-selector involvedObject.name=<instance-name>
```

**Common Issues**:
- Service not entitled in subaccount
- Invalid parameters
- Plan not available in region
- Quota exceeded

### Binding Creation Fails

```bash
# Check binding status
kubectl describe servicebinding <name>

# Verify instance is ready
kubectl get serviceinstance <instance-name>
```

**Common Issues**:
- Referenced instance not ready
- Instance doesn't support bindings
- Invalid binding parameters

### Secret Not Created

```bash
# Check binding status
kubectl get servicebinding <name> -o yaml

# Verify secret exists
kubectl get secrets | grep <binding-name>
```

---

## Best Practices

1. **Namespace Organization**: Group related services in namespaces
2. **Labels**: Use labels for filtering and organization
3. **External Names**: Use descriptive external names for cockpit visibility
4. **Parameters in Secrets**: Store sensitive parameters in Kubernetes secrets
5. **Resource Limits**: Set appropriate limits on operator deployment
6. **Monitoring**: Monitor operator health and CRD status
7. **Backup**: Document all ServiceInstance/ServiceBinding manifests

---

## Documentation Links

- **Setup**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/setup-e977f23.md
- **Prerequisites**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/prerequisites-dd5faaa.md
- **Working with Operator**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/working-with-sap-btp-service-operator-0ccebd7.md
- **Migration**: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/Consuming-SAP-BTP-Services-from-Various-Environments/migrating-from-svcat-to-sap-btp-service-ec7f5c7.md
- **GitHub Repository**: https://github.com/SAP/sap-btp-service-operator
