# Advanced Features Reference

Complete reference for additional SAP AI Core features not covered in other reference files.

**Documentation Source:** https://github.com/SAP-docs/sap-artificial-intelligence/tree/main/docs/sap-ai-core

---

## Table of Contents

1. [Chat Conversations](#chat-conversations)
2. [Applications (Git Sync)](#applications-git-sync)
3. [Prompt Templates](#prompt-templates)
4. [Prompt Optimization](#prompt-optimization)
5. [AI Content as a Service](#ai-content-as-a-service)
6. [AI Content Security](#ai-content-security)
7. [Data Protection and Privacy](#data-protection-and-privacy)
8. [Auditing and Logging](#auditing-and-logging)
9. [ServingTemplate Schema](#servingtemplate-schema)
10. [Contextualized Retrieval with Metadata](#contextualized-retrieval-with-metadata)
11. [Content Packages](#content-packages)

---

## Chat Conversations

Multi-turn conversation handling using the orchestration service.

### Message History Management

The orchestration service manages conversation history through the `messages_history` parameter, storing user and assistant role exchanges.

### Request Structure

```json
{
  "orchestration_config": {
    "module_configurations": {
      "templating_module_config": {
        "template": [
          {"role": "user", "content": "{{?current_message}}"}
        ]
      },
      "llm_module_config": {
        "model_name": "gpt-4o",
        "model_version": "latest",
        "model_params": {
          "max_tokens": 300,
          "temperature": 0.1
        }
      }
    }
  },
  "messages_history": [
    {"role": "user", "content": "What is machine learning?"},
    {"role": "assistant", "content": "Machine learning is a branch of AI..."},
    {"role": "user", "content": "Can you give an example?"},
    {"role": "assistant", "content": "Sure, email spam filtering is an example..."}
  ],
  "input_params": {
    "current_message": "What about deep learning?"
  }
}
```

### Key Behavior

- The templating module appends the current user message to the message history
- The combined history generates the prompt sent to the LLM module
- Response `module_results.templating` and `orchestration_result.choices` can be used as message history for subsequent requests

### Continuation Pattern

```python
def continue_conversation(history, new_message, response):
    """Update conversation history with new exchange."""
    history.append({"role": "user", "content": new_message})
    history.append({
        "role": "assistant",
        "content": response["orchestration_result"]["choices"][0]["message"]["content"]
    })
    return history
```

---

## Applications (Git Sync)

Applications synchronize workflow templates from GitHub repositories.

### Key Features

- **Automatic Sync:** Applications sync with GitHub every ~3 minutes
- **Manual Sync:** Trigger via `POST {{apiurl}}/admin/applications/{{appName}}/refresh`

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v2/admin/applications` | POST | Create application |
| `/v2/admin/applications` | GET | List applications |
| `/v2/admin/applications/{name}` | DELETE | Remove application |
| `/v2/admin/applications/{name}/status` | GET | Get sync status |
| `/admin/applications/{name}/refresh` | POST | Trigger manual sync |

### Create Application

```bash
curl -X POST "$AI_API_URL/v2/admin/applications" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationName": "my-workflows",
    "repositoryUrl": "https://github.com/org/ai-workflows",
    "revision": "HEAD",
    "path": "workflows/"
  }'
```

### Required Configuration

| Parameter | Description |
|-----------|-------------|
| `applicationName` | Application identifier (becomes executable ID) |
| `repositoryUrl` | GitHub repository URL |
| `path` | Path within repository |
| `revision` | Branch, commit SHA, or HEAD |

### Sync Status Response

```json
{
  "health": "healthy",
  "lastSyncTime": "2024-01-15T10:00:00Z",
  "status": "Synced",
  "message": ""
}
```

### Validation Checks

The system validates:
- No duplicate workflow names
- Correct scenario labels on templates
- Valid YAML syntax
- Proper metadata structure (WorkflowTemplate kind)

---

## Prompt Templates

Manage prompts through declarative (Git) or imperative (API) approaches.

### Declarative Approach (Git-managed)

#### File Format

Filename: `<name>.prompttemplate.ai.sap.yaml`

```yaml
name: customer-support-prompt
version: 0.0.1
scenario: customer-service
spec:
  template:
    - role: system
      content: "You are a helpful customer support agent for {{?company_name}}."
    - role: user
      content: "{{?customer_query}}"
defaults:
  company_name: "Acme Corp"
additional_fields:
  metadata:
    author: "AI Team"
    category: "support"
  model_restrictions:
    blocked_models:
      - model_name: "gpt-3.5-turbo"
        versions: ["0613"]
```

#### Key Characteristics

- Managed through git commits
- Auto-sync with prompt registry
- Marked as `managedBy: declarative`
- Always reflects HEAD version
- Cannot be edited via imperative API

### Imperative Approach (API-managed)

#### Create Prompt Template

```bash
curl -X POST "$AI_API_URL/v2/lm/promptTemplates" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "api-managed-prompt",
    "version": "1.0.0",
    "scenario": "foundation-models",
    "spec": {
      "template": [
        {"role": "user", "content": "{{?user_input}}"}
      ]
    }
  }'
```

### List Prompt Templates

```bash
curl -X GET "$AI_API_URL/v2/lm/promptTemplates" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default"
```

### Placeholder Syntax

| Syntax | Description |
|--------|-------------|
| `{{?variable}}` | Required input parameter |
| `{{?variable}}` with defaults | Optional if default provided |

---

## Prompt Optimization

Automated prompt improvement using optimization runs.

### Overview

Prompt Optimization takes an input prompt template and a dataset of desirable responses to maximize a specified metric.

### Prerequisites

- Prompt template in prompt registry
- JSON dataset in object store with desired responses
- Metrics tracked in ML Tracking Service

### Process

1. Submit optimization job with prompt template and dataset
2. System generates multiple prompt variations
3. Evaluates variations against target metric
4. Returns optimized prompt to registry
5. Stores additional results in object store

### Limitations

| Constraint | Details |
|------------|---------|
| **Duration** | Minutes to multiple hours |
| **Requests** | Submits large number of prompt requests |
| **Model Support** | Mistral and DeepSeek NOT supported |

### Operations (AI Launchpad)

- Create a new prompt optimization
- View existing prompt optimizations
- View detailed run information

---

## AI Content as a Service

Publish AI content to SAP BTP Service Marketplace.

### Capabilities

- Publish workflows, serving templates, or Docker images
- Distribute as managed service on SAP BTP
- Other tenants can consume via standard APIs

### Use Cases

- Monetize AI models and workflows
- Share AI components across organization
- Provide standardized AI services

---

## AI Content Security

Security best practices for AI content (workflows, templates, Docker images).

### Required Practices

| Practice | Description |
|----------|-------------|
| **Threat Modeling** | Conduct security risk workshops |
| **Static Code Scans** | Use SAST tools for vulnerability analysis |
| **OSS Vulnerability Scan** | Evaluate third-party components |
| **OSS Update Strategy** | Define update cadence for open-source components |
| **Code Reviews** | Peer review with security focus |
| **Malware Scanning** | Scan uploaded data before deployment |
| **Secure Code Protection** | Use Docker image digest and signature verification |
| **Docker Base Image Security** | Use minimal, hardened base images |

### Key Responsibility

> "Users of AI Core are responsible for the content of their Docker images and assume the risk of running compromised containers in the platform."

### Docker Security Guidelines

1. Select minimal, hardened base images
2. Keep images updated
3. Remove unnecessary components
4. Use multi-stage builds
5. Scan images for vulnerabilities
6. Sign images for verification

---

## Data Protection and Privacy

Compliance features for data protection.

### Supported Capabilities

| Feature | Description |
|---------|-------------|
| **Data Blocking** | Simplified blocking of personal data |
| **Data Deletion** | Simplified deletion of personal data |
| **Change Logging** | Audit trail for data changes |
| **Read-Access Logging** | Track data access |
| **Consent Management** | Manage user consent |
| **Data Storage Controls** | Control data storage and processing |

### Compliance Scope

- General data protection acts (GDPR, etc.)
- Industry-specific legislation
- Regional privacy requirements

### Important Notes

- SAP does not provide legal advice
- Compliance requires secure system operation
- Case-by-case evaluation required

---

## Auditing and Logging

Security event logging in SAP AI Core.

### Events Logged

| Category | Events |
|----------|--------|
| **Object Store** | Create, delete, retrieve secrets |
| **Resource Groups** | Provision, deprovision |
| **Tenants** | Provision, retrieve, deprovision |
| **Docker Registry** | Create, delete secrets |
| **Deployments** | Create, delete |
| **Executions** | Create, delete |
| **Repositories** | Create, delete |
| **Applications** | Create, delete |

### Log Details by Operation Type

| Operation | Logged Details |
|-----------|----------------|
| List/Get/Watch | Timestamp, tenant IDs, source IPs, request URI, level |
| Create/Update/Patch | Above + request/response objects |
| Delete | Above + response object |

### Authentication Events

| Event | Message |
|-------|---------|
| Token expired | `Jwt is expired` |
| Missing auth header | `RBAC: access denied` |
| Invalid token | `Jwt issuer is not configured` |
| Wrong tenant | `Jwt verification fails` |

---

## ServingTemplate Schema

API schema for serving templates (KServe integration) for model deployment.

### Quotas and Limits

| Limit | Value |
|-------|-------|
| **Max ServingTemplates per tenant** | 50 |
| **Max WorkflowTemplates per tenant** | 50 |
| **Bulk operations** | Requires `bulkUpdates` annotation |

### Resource Structure

```yaml
apiVersion: ai.sap.com/v1alpha1
kind: ServingTemplate
metadata:
  name: my-serving-template
  annotations:
    scenarios.ai.sap.com/description: "Description of scenario"
    scenarios.ai.sap.com/name: "scenario-name"
    executables.ai.sap.com/description: "Description of executable"
    executables.ai.sap.com/name: "executable-name"
    ai.sap.com/bulkUpdates: "true"  # Enable bulk operations
  labels:
    ai.sap.com/version: "1.0.0"
    scenarios.ai.sap.com/id: "unique-scenario-id"
spec:
  inputs:
    parameters:
      - name: modelUri
        default: ""
        type: string
    artifacts:
      - name: model
  template:
    apiVersion: serving.kserve.io/v1beta1
    metadata:
      name: "{{inputs.parameters.name}}"
    spec:
      predictor:
        containers:
          - name: kserve-container
            image: "{{inputs.parameters.image}}"
            env:
              - name: STORAGE_URI
                value: "{{inputs.artifacts.model}}"
```

### Model Path Configuration

| Environment Variable | Description |
|---------------------|-------------|
| `STORAGE_URI` | Points to artifact location for model download |
| **Mounted Path** | `/mnt/models` (hardcoded by KServe) |

**Important:** Models are automatically downloaded from object store to `/mnt/models`. Your inference code must read from this path:

```python
import os

# Models are always at /mnt/models
MODEL_PATH = "/mnt/models"

def load_model():
    """Load model from KServe-mounted path."""
    return load_from_path(MODEL_PATH)
```

### Annotations Reference

| Annotation | Purpose |
|------------|---------|
| `scenarios.ai.sap.com/description` | Scenario description |
| `scenarios.ai.sap.com/name` | Scenario display name |
| `executables.ai.sap.com/description` | Executable description |
| `executables.ai.sap.com/name` | Executable display name |
| `ai.sap.com/bulkUpdates` | Enable bulk stop/delete operations |

### Labels Reference

| Label | Purpose |
|-------|---------|
| `ai.sap.com/version` | Version number |
| `scenarios.ai.sap.com/id` | Unique scenario ID |

### Parameter Types

Only `string` type is supported for input parameters.

### Placeholder Syntax

Use `{{inputs.parameters.ParameterName}}` and `{{inputs.artifacts.ArtifactName}}` in template spec.

### Bulk Operations

When `ai.sap.com/bulkUpdates: "true"` is set:

```bash
# Bulk stop deployments
curl -X PATCH "$AI_API_URL/v2/lm/deployments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "targetStatus": "STOPPED",
    "deploymentIds": ["deploy-1", "deploy-2", "deploy-3"]
  }'

# Bulk delete deployments
curl -X DELETE "$AI_API_URL/v2/lm/deployments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "deploymentIds": ["deploy-1", "deploy-2", "deploy-3"]
  }'
```

---

## Contextualized Retrieval with Metadata

Include metadata in grounding retrieval results.

### Configuration

Add `metadata_params` to grounding configuration:

```json
{
  "grounding_module_config": {
    "grounding_service": "document_grounding_service",
    "grounding_service_configuration": {
      "grounding_input_parameters": ["user_query"],
      "grounding_output_parameter": "context",
      "metadata_params": ["source", "webUrl", "title"],
      "filters": [{"id": "<pipeline-id>"}]
    }
  }
}
```

### Metadata Levels

| Level | Description |
|-------|-------------|
| Data Repository | Repository-level metadata |
| Document | Document-level metadata |
| Chunk | Chunk-level metadata |

### Discovery

Query available metadata keys:

```bash
curl -X POST "$AI_API_URL/v2/lm/document-grounding/retrieval/search" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "test query",
    "filters": [{"id": "<pipeline-id>"}]
  }'
```

### Naming Convention for Conflicts

When metadata keys exist at multiple levels:
- Chunk-level: `webUrl`
- Document-level: `document_webUrl`
- Repository-level: `repository_webUrl`

### Using Metadata in Prompts

```json
{
  "templating_module_config": {
    "template": [
      {
        "role": "system",
        "content": "Answer based on the context. Include source references.\n\nContext: {{$context}}"
      },
      {"role": "user", "content": "{{?user_query}}"}
    ]
  }
}
```

---

## Content Packages

Additional Python packages extending SAP AI Core.

### Available Packages

| Package | Purpose | PyPI Link |
|---------|---------|-----------|
| `sap-ai-core-datarobot` | DataRobot integration | https://pypi.org/project/sap-ai-core-datarobot/ |
| `sap-computer-vision-package` | Image classification and feature extraction | https://pypi.org/project/sap-computer-vision-package/ |

### Installation

```bash
pip install sap-ai-core-datarobot
pip install sap-computer-vision-package
```

### Computer Vision Package Capabilities

- Image classification
- Feature extraction
- Integration with SAP AI SDK Core

---

## Documentation Links

- Chat: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/chat-39321a9.md
- Applications: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/application-7f1e35b.md
- Prompt Templates: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/create-a-prompt-template-declarative-815def5.md
- AI Content Security: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/ai-content-security-d1cd77f.md
- Data Protection: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/data-protection-and-privacy-d25e4c9.md
- Auditing: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/auditing-and-logging-information-e19844a.md
- API Schema: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/api-schema-spec-ai-sap-com-v1alpha1-4d1ffd2.md
