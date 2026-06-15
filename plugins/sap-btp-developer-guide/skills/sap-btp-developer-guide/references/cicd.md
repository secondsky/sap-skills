# SAP BTP CI/CD Reference

## Overview

Continuous Integration (CI) and Continuous Delivery (CD) are complementary DevOps practices that automate application development, testing, and deployment on SAP BTP.

## Core Concepts

### Continuous Integration (CI)
- Frequent code integration into central repository
- Automated builds and tests on each commit
- Early error detection
- Prevents integration problems from accumulating

### Continuous Delivery (CD)
- Extends CI with deployment automation
- Successfully tested changes ready for release review
- Code built, tested, and packaged in deployable format
- Deploy at management's discretion

## SAP Continuous Integration and Delivery

**Service Type**: BTP-native service with pre-configured pipelines

### Advantages

| Feature | Benefit |
|---------|---------|
| Simplicity | Out-of-the-box pipelines, minimal configuration |
| Flexibility | Customizable pipelines, additional commands |
| Infrastructure | Built-in management, no server maintenance |
| SAP-Specific | Optimized for SAP technologies |

### Supported Pipeline Types

| Pipeline | Use Case |
|----------|----------|
| Cloud Foundry Environment | SAP Fiori, CAP applications |
| SAP Fiori for ABAP Platform | Fiori apps on ABAP |
| SAP Integration Suite Artifacts | Integration content |

## Setup Process

### Step 1: Enable Service

1. Open SAP BTP Cockpit
2. Navigate to subaccount
3. Enable "Continuous Integration & Delivery"
4. Subscribe to the service

### Step 2: Assign Roles

| Role | Permissions |
|------|-------------|
| Administrator | Full access, job management |
| Developer | Create/run jobs, view results |

### Step 3: Configure Repository Credentials

**Supported Repositories:**
- GitHub
- GitLab
- Bitbucket
- Azure Repos

```yaml
# Example credential configuration
credentials:
  - name: github-credentials
    type: basic
    username: ${GITHUB_USER}
    password: ${GITHUB_TOKEN}
```

### Step 4: Create CI/CD Job

```yaml
# .pipeline/config.yml for CAP application
general:
  projectName: my-cap-app
  buildTool: mta

stages:
  Build:
    mtaBuildParameters:
      platform: cf

  Additional Unit Tests:
    npmExecuteScripts: true
    npmScripts: ['test']

  Release:
    cloudFoundryDeploy: true
    cfApiEndpoint: https://api.cf.eu10.hana.ondemand.com
    cfOrg: my-org
    cfSpace: my-space
    mtarFilePath: mta_archives/my-cap-app.mtar
```

### Step 5: Configure Webhooks

Automate builds on push:
1. Copy webhook URL from CI/CD service
2. Add webhook in repository settings
3. Select events (push, pull request)

## Pipeline Configuration

### CAP Node.js Pipeline

```yaml
# .pipeline/config.yml
general:
  buildTool: mta

stages:
  Build:
    mtaBuildParameters:
      platform: cf

  Additional Unit Tests:
    npmExecuteScripts: true
    npmScripts:
      - test

  Acceptance:
    cfDeploy: true
    cloudFoundryDeploy: true
    cfApiEndpoint: https://api.cf.eu10.hana.ondemand.com
    cfOrg: my-org
    cfSpace: dev

  Release:
    cfDeploy: true
    cloudFoundryDeploy: true
    cfApiEndpoint: https://api.cf.eu10.hana.ondemand.com
    cfOrg: my-org
    cfSpace: prod
```

### CAP Java Pipeline

```yaml
general:
  buildTool: mta

stages:
  Build:
    mtaBuildParameters:
      platform: cf
    mavenExecuteStaticCodeChecks: true

  Additional Unit Tests:
    mavenExecute: true
    goals: ['test']
```

### SAP Fiori Pipeline

```yaml
general:
  buildTool: npm

stages:
  Build:
    npmExecuteScripts: true
    npmScripts: ['build']

  Additional Unit Tests:
    npmExecuteScripts: true
    npmScripts: ['test']
    karmaExecuteTests: true
```

## ABAP CI/CD

### gCTS Integration

```yaml
# Pipeline for ABAP Cloud
stages:
  Import:
    abapEnvironmentPullGitRepo: true
    repositoryName: my-software-component

  Test:
    abapEnvironmentRunATCCheck: true
    atcConfig:
      checkVariant: ABAP_CLOUD_DEVELOPMENT_DEFAULT

  Release:
    abapEnvironmentAssembleConfirm: true
```

### ATC Integration

```yaml
stages:
  Quality:
    abapEnvironmentRunATCCheck: true
    atcConfig:
      checkVariant: ABAP_CLOUD_DEVELOPMENT_DEFAULT
      failOn: ERROR
      priorityFilter:
        - '1'
        - '2'
```

## Kyma CI/CD

### Terraform Integration

```hcl
# main.tf for Kyma provisioning
module "kyma" {
  source = "github.com/SAP/terraform-module-kyma"

  subaccount_id = var.subaccount_id
  cluster_name  = "my-kyma-cluster"
  region        = "eu-central-1"
}
```

### Helm Deployment

```yaml
stages:
  Build:
    containerBuild: true
    dockerfilePath: Dockerfile

  Deploy:
    helmDeploy: true
    helmValues:
      - ./chart/values.yaml
    kubeConfigPath: ${KUBECONFIG}
```

## Security in CI/CD

### Code Scanning

```yaml
stages:
  Security:
    sonarQubeScan: true
    sonarQubeConfig:
      serverUrl: ${SONAR_URL}
      projectKey: my-project

    dependencyTrackUpload: true
    fortifyScan: true
```

### Secrets Management

```yaml
# Using credentials
credentials:
  - name: cf-credentials
    type: usernamePassword
    username: ${CF_USER}
    password: ${CF_PASSWORD}

  - name: hana-credentials
    type: usernamePassword
    username: ${HANA_USER}
    password: ${HANA_PASSWORD}
```

## Best Practices

### Pipeline Design
1. Keep pipelines fast (< 15 minutes ideal)
2. Fail fast on critical issues
3. Use parallel stages where possible
4. Cache dependencies

### Testing Strategy
```yaml
stages:
  Unit Tests:
    # Fast, run on every commit
    npmScripts: ['test:unit']

  Integration Tests:
    # Slower, run on PR merge
    npmScripts: ['test:integration']

  E2E Tests:
    # Slowest, run before release
    npmScripts: ['test:e2e']
```

### Environment Strategy

| Environment | Trigger | Purpose |
|-------------|---------|---------|
| Development | Every push | Developer testing |
| QA | PR merge | QA testing |
| Staging | Release branch | Pre-production |
| Production | Manual approval | Live system |

## Monitoring

### Job Status
- View in CI/CD service UI
- Email notifications
- Webhook integrations

### Metrics
- Build duration
- Success rate
- Test coverage
- Deployment frequency

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Build timeout | Long-running tests | Increase timeout, parallelize |
| Authentication failed | Expired credentials | Refresh tokens |
| Deployment failed | Resource quota | Check CF/Kyma limits |
| Test failures | Environment mismatch | Use consistent test data |

## Learning Resources

| Resource | Description |
|----------|-------------|
| "Exploring DevOps with SAP BTP" | SAP Learning course |
| "Efficient DevOps with SAP" | openSAP course |
| CI/CD Introduction Guide | Technical documentation |

## Source Documentation

- CI/CD Overview: [https://github.com/SAP-docs/btp-developer-guide/blob/main/docs/continuous-integration-and-delivery-ci-cd-fe74df5.md](https://github.com/SAP-docs/btp-developer-guide/blob/main/docs/continuous-integration-and-delivery-ci-cd-fe74df5.md)
- CI/CD Introduction: [https://github.com/SAP-docs/btp-developer-guide/blob/main/docs/introducing-continuous-integration-and-delivery-ci-cd-8ee5353.md](https://github.com/SAP-docs/btp-developer-guide/blob/main/docs/introducing-continuous-integration-and-delivery-ci-cd-8ee5353.md)
- SAP CI/CD Service: [https://help.sap.com/docs/continuous-integration-and-delivery](https://help.sap.com/docs/continuous-integration-and-delivery)
