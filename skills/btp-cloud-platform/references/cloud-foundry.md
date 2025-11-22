# Cloud Foundry Environment Reference

Detailed guidance for SAP BTP Cloud Foundry environment development and administration.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/10-concepts
**CF Docs**: https://docs.cloudfoundry.org/

---

## Table of Contents

1. [Architecture](#architecture)
2. [Account Structure](#account-structure)
3. [Buildpacks](#buildpacks)
4. [Service Bindings](#service-bindings)
5. [Application Deployment](#application-deployment)
6. [CF CLI Commands](#cf-cli-commands)
7. [Space Management](#space-management)
8. [Availability Zones](#availability-zones)

---

## Architecture

### Cloud Foundry in SAP BTP

- Open Platform-as-a-Service (PaaS)
- Polyglot application support
- SAP HANA extended application services integration
- Multiple buildpacks for language support
- Automatic scaling and load balancing

### Hierarchy

```
Subaccount (1:1 with CF Org)
└── Organization (Org)
    ├── Space: Development
    │   ├── Applications
    │   └── Service Instances
    ├── Space: Testing
    └── Space: Production
```

---

## Account Structure

### Organizations (Orgs)

- Each CF subaccount contains exactly one org
- Org name derived from subaccount name
- Use for grouping related spaces

### Spaces

Spaces provide environment separation within an org:

| Configuration | Subaccount Level | Space Level |
|---------------|------------------|-------------|
| Business user groups | Yes | No |
| Cloud Connector tunnels | Yes | No |
| Trust/roles settings | Yes | No |
| Quota assignment | Mandatory | Optional |

### Space Quota Plans

Optional resource limits per space:

```bash
# Create space quota
cf create-space-quota my-quota -m 4G -i 1G -r 10 -s 5

# Assign to space
cf set-space-quota my-space my-quota
```

---

## Buildpacks

### SAP-Provided Buildpacks

| Buildpack | Language | Notes |
|-----------|----------|-------|
| `sap_java_buildpack` | Java | SAP JVM, Jakarta EE |
| `nodejs_buildpack` | Node.js | LTS versions |
| `python_buildpack` | Python | 3.x versions |
| `go_buildpack` | Go | Latest versions |
| `staticfile_buildpack` | Static HTML | HTML5 apps |

### Specifying Buildpacks

```yaml
# manifest.yml
applications:
- name: my-app
  buildpacks:
    - nodejs_buildpack
  memory: 256M
  disk_quota: 512M
```

### Custom Buildpacks

```yaml
applications:
- name: my-app
  buildpack: https://github.com/my-org/my-buildpack.git
```

---

## Service Bindings

### Service Marketplace

```bash
# List available services
cf marketplace

# Create service instance
cf create-service hana hdi-shared my-hana

# Bind to application
cf bind-service my-app my-hana
```

### Service Keys

For external access without binding:

```bash
# Create service key
cf create-service-key my-service my-key

# Get credentials
cf service-key my-service my-key
```

### User-Provided Services

For external services not in marketplace:

```bash
cf create-user-provided-service my-external-service -p '{"url":"https://api.example.com","key":"xxx"}'
```

### VCAP_SERVICES

Environment variable containing bound service credentials:

```javascript
const services = JSON.parse(process.env.VCAP_SERVICES);
const hanaCredentials = services.hana[0].credentials;
```

---

## Application Deployment

### manifest.yml

```yaml
applications:
- name: my-app
  memory: 512M
  disk_quota: 1G
  instances: 2
  path: ./target/my-app.jar
  buildpacks:
    - sap_java_buildpack
  env:
    JBP_CONFIG_SAPJVM: "[default_vm: jdk]"
  routes:
    - route: my-app.cfapps.eu10.hana.ondemand.com
  services:
    - my-hana
    - my-xsuaa
```

### Deployment Commands

```bash
# Deploy application
cf push

# Deploy with manifest override
cf push -f manifest-prod.yml

# Deploy specific path
cf push my-app -p ./dist

# Scale instances
cf scale my-app -i 3

# Scale memory
cf scale my-app -m 1G
```

### Blue-Green Deployment

```bash
# Deploy new version with different name
cf push my-app-new -f manifest.yml

# Map route to new version
cf map-route my-app-new cfapps.eu10.hana.ondemand.com --hostname my-app

# Unmap route from old version
cf unmap-route my-app cfapps.eu10.hana.ondemand.com --hostname my-app

# Delete old version
cf delete my-app -f

# Rename new version
cf rename my-app-new my-app
```

---

## CF CLI Commands

### Authentication

```bash
# Login
cf login -a https://api.cf.eu10.hana.ondemand.com

# Login with SSO
cf login -a https://api.cf.eu10.hana.ondemand.com --sso

# Target org/space
cf target -o my-org -s my-space
```

### Application Management

```bash
# List applications
cf apps

# View app details
cf app my-app

# Start/stop/restart
cf start my-app
cf stop my-app
cf restart my-app

# View logs
cf logs my-app --recent
cf logs my-app  # tail

# SSH into container
cf ssh my-app

# Set environment variable
cf set-env my-app MY_VAR "value"
cf restage my-app
```

### Service Management

```bash
# List services
cf services

# Create service
cf create-service <service> <plan> <name>

# Update service
cf update-service <name> -p <new-plan>

# Delete service
cf delete-service <name>

# Bind/unbind
cf bind-service <app> <service>
cf unbind-service <app> <service>
```

### Routes

```bash
# List routes
cf routes

# Create route
cf create-route my-space cfapps.eu10.hana.ondemand.com --hostname my-app

# Map route to app
cf map-route my-app cfapps.eu10.hana.ondemand.com --hostname my-app

# Delete route
cf delete-route cfapps.eu10.hana.ondemand.com --hostname my-app
```

---

## Space Management

### Space Roles

| Role | Permissions |
|------|-------------|
| **Space Manager** | Manage space settings, add members |
| **Space Developer** | Deploy apps, manage services |
| **Space Auditor** | View-only access |

### Assign Roles

```bash
# Set space role
cf set-space-role user@example.com my-org my-space SpaceDeveloper

# Unset space role
cf unset-space-role user@example.com my-org my-space SpaceDeveloper
```

### Org Roles

| Role | Permissions |
|------|-------------|
| **Org Manager** | Manage org, spaces, quotas, billing |
| **Org Auditor** | View-only for org settings |
| **Billing Manager** | View billing information |

---

## Availability Zones

### Multi-AZ Deployment

Cloud Foundry distributes application instances across availability zones automatically when:

1. Multiple instances are running (`instances: 2+`)
2. Region supports multiple AZs

### Benefits

- Independent power, network, cooling
- Automatic failover within region
- Improved application availability

### Configuration

No special configuration required. CF Controller distributes instances automatically.

```yaml
applications:
- name: my-app
  instances: 3  # Distributed across AZs
```

---

## Supported Features

### Supported

- Diego runtime
- Application manifests
- Service bindings
- SSH access
- Health monitoring
- Autoscaling (via Application Autoscaler)
- Container-to-container networking

### Not Supported

- DEA runtime (deprecated)
- Some community plugins may not work

---

## Related Documentation

- CF Environment Concepts: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/cloud-foundry-environment-9c7092c.md
- Regions and Endpoints: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/10-concepts/regions-and-api-endpoints-available-for-the-cloud-foundry-environment-f344a57.md
- Getting Started: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/20-getting-started/getting-started-in-the-cloud-foundry-environment-b328cc8.md
- Official CF Docs: https://docs.cloudfoundry.org/
