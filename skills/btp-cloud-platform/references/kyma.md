# Kyma Environment Reference

Detailed guidance for SAP BTP Kyma environment development and administration.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/10-concepts
**Kyma Project**: https://kyma-project.io/

---

## Table of Contents

1. [Architecture](#architecture)
2. [Modules](#modules)
3. [Namespaces](#namespaces)
4. [Deployment Patterns](#deployment-patterns)
5. [Service Consumption](#service-consumption)
6. [Serverless Functions](#serverless-functions)
7. [Eventing](#eventing)
8. [Security](#security)
9. [kubectl Commands](#kubectl-commands)

---

## Architecture

### Kyma in SAP BTP

- Fully managed Kubernetes runtime
- Based on open-source Kyma project
- Built on Gardener-managed Kubernetes clusters
- Modular architecture with selectable components
- 1:1 relationship: Subaccount → Kyma Cluster

### Supported Technologies

- CAP (Cloud Application Programming Model)
- SAP Cloud SDK
- Application Router
- HTML5 Deployer
- Docker containers
- Helm charts

### Structure

```
Subaccount (1:1 with Kyma Cluster)
└── Kubernetes Cluster
    ├── kyma-system (SAP managed)
    ├── namespace: dev
    │   ├── Deployments
    │   ├── Services
    │   └── Functions
    ├── namespace: test
    └── namespace: prod
```

---

## Modules

### Default Modules (Always Installed)

| Module | Purpose |
|--------|---------|
| `istio` | Service mesh with Kyma-specific configuration |
| `api-gateway` | Expose and secure APIs |
| `btp-operator` | Consume SAP BTP services via Kubernetes |

### Optional Modules

| Module | Purpose |
|--------|---------|
| `serverless` | Deploy simple code functions |
| `eventing` | CloudEvents pub/sub (NATS or SAP Event Mesh) |
| `application-connector` | Integrate external systems |
| `telemetry` | Collect logs and traces |
| `keda` | Event-driven autoscaling |
| `nats` | NATS cluster for eventing |
| `cloud-manager` | Cloud provider product integration |

### Module Management

```bash
# List available modules
kubectl get kymas -n kyma-system

# Add module via BTP Cockpit or kubectl
kubectl patch kyma default -n kyma-system --type merge -p '
spec:
  modules:
  - name: serverless
'
```

### Community Modules

User-provided modules without:
- Automatic updates
- SLA coverage
- SAP support

---

## Namespaces

### Best Practices

- Use namespaces for environment separation
- Apply resource quotas per namespace
- Implement network policies for isolation

### Create Namespace

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: my-app
  labels:
    istio-injection: enabled
```

```bash
kubectl apply -f namespace.yaml
```

### Resource Quotas

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: my-quota
  namespace: my-app
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
```

---

## Deployment Patterns

### Standard Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: my-namespace
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-registry/my-app:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
  namespace: my-namespace
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
```

### API Rule (Expose API)

```yaml
apiVersion: gateway.kyma-project.io/v1beta1
kind: APIRule
metadata:
  name: my-app
  namespace: my-namespace
spec:
  gateway: kyma-gateway.kyma-system.svc.cluster.local
  host: my-app
  service:
    name: my-app
    port: 80
  rules:
  - path: /.*
    methods: ["GET", "POST", "PUT", "DELETE"]
    accessStrategies:
    - handler: jwt
      config:
        jwks_urls:
        - https://<subaccount>.authentication.<region>.hana.ondemand.com/token_keys
```

### Helm Chart

```bash
# Install with Helm
helm install my-app ./my-chart -n my-namespace

# Upgrade
helm upgrade my-app ./my-chart -n my-namespace

# Rollback
helm rollback my-app 1 -n my-namespace
```

---

## Service Consumption

### SAP BTP Operator

Consume SAP BTP services via Kubernetes resources:

```yaml
# ServiceInstance
apiVersion: services.cloud.sap.com/v1
kind: ServiceInstance
metadata:
  name: my-hana
  namespace: my-namespace
spec:
  serviceOfferingName: hana-cloud
  servicePlanName: hana
  parameters:
    memory: 32

---
# ServiceBinding
apiVersion: services.cloud.sap.com/v1
kind: ServiceBinding
metadata:
  name: my-hana-binding
  namespace: my-namespace
spec:
  serviceInstanceName: my-hana
  secretName: my-hana-credentials
```

### Using Credentials

```yaml
env:
- name: HANA_URL
  valueFrom:
    secretKeyRef:
      name: my-hana-credentials
      key: url
```

---

## Serverless Functions

### Function Definition

```yaml
apiVersion: serverless.kyma-project.io/v1alpha2
kind: Function
metadata:
  name: my-function
  namespace: my-namespace
spec:
  runtime: nodejs20
  source:
    inline:
      source: |
        module.exports = {
          main: async function (event, context) {
            const message = event.data?.message || "Hello World";
            return { statusCode: 200, body: { message } };
          }
        };
  resourceConfiguration:
    function:
      resources:
        requests:
          cpu: "50m"
          memory: "64Mi"
        limits:
          cpu: "100m"
          memory: "128Mi"
```

### Expose Function

```yaml
apiVersion: gateway.kyma-project.io/v1beta1
kind: APIRule
metadata:
  name: my-function
  namespace: my-namespace
spec:
  gateway: kyma-gateway.kyma-system.svc.cluster.local
  host: my-function
  service:
    name: my-function
    port: 80
  rules:
  - path: /.*
    methods: ["GET", "POST"]
    accessStrategies:
    - handler: noop  # No authentication
```

---

## Eventing

### Subscription

```yaml
apiVersion: eventing.kyma-project.io/v1alpha2
kind: Subscription
metadata:
  name: my-subscription
  namespace: my-namespace
spec:
  sink: http://my-function.my-namespace.svc.cluster.local
  source: myapp
  types:
  - order.created.v1
```

### Publishing Events

```javascript
// CloudEvent format
const event = {
  specversion: "1.0",
  type: "order.created.v1",
  source: "myapp",
  id: uuid(),
  data: { orderId: "12345" }
};

await fetch(`${EVENTING_ENDPOINT}/publish`, {
  method: "POST",
  headers: { "Content-Type": "application/cloudevents+json" },
  body: JSON.stringify(event)
});
```

---

## Security

### API Gateway Authentication

JWT validation with XSUAA:

```yaml
accessStrategies:
- handler: jwt
  config:
    jwks_urls:
    - https://<subaccount>.authentication.<region>.hana.ondemand.com/token_keys
    trusted_issuers:
    - https://<subaccount>.authentication.<region>.hana.ondemand.com/oauth/token
```

### RBAC

```yaml
# Role
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
  namespace: my-namespace
rules:
- apiGroups: ["", "apps"]
  resources: ["pods", "deployments", "services"]
  verbs: ["get", "list", "create", "update", "delete"]

---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: my-namespace
subjects:
- kind: User
  name: developer@example.com
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io
```

### Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: my-namespace
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

---

## kubectl Commands

### Authentication

```bash
# Download kubeconfig from BTP Cockpit
# Or use kubelogin for OIDC

export KUBECONFIG=~/.kube/kyma-kubeconfig.yaml
kubectl get nodes
```

### Common Operations

```bash
# List resources
kubectl get pods -n my-namespace
kubectl get deployments -n my-namespace
kubectl get services -n my-namespace

# Apply configuration
kubectl apply -f deployment.yaml

# View logs
kubectl logs -f deployment/my-app -n my-namespace

# Describe resource
kubectl describe pod my-pod -n my-namespace

# Execute command in pod
kubectl exec -it my-pod -n my-namespace -- /bin/sh

# Port forward
kubectl port-forward svc/my-app 8080:80 -n my-namespace

# Delete resources
kubectl delete -f deployment.yaml
```

### Troubleshooting

```bash
# Get events
kubectl get events -n my-namespace --sort-by='.lastTimestamp'

# Check pod status
kubectl get pods -n my-namespace -o wide

# View container logs
kubectl logs my-pod -c my-container -n my-namespace

# Previous container logs
kubectl logs my-pod -c my-container -n my-namespace --previous
```

---

## Related Documentation

- Kyma Environment: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/kyma-environment-468c2f3.md
- Kyma Modules: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/kyma-modules-0dda141.md
- Getting Started: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/20-getting-started/getting-started-in-the-kyma-environment-d1abd18.md
- Kyma Project: https://kyma-project.io/docs/
