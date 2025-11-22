# SAP AI Launchpad Complete Guide

Comprehensive reference for SAP AI Launchpad features and operations.

**Documentation Source:** https://github.com/SAP-docs/sap-artificial-intelligence/tree/main/docs/sap-ai-launchpad

---

## Table of Contents

1. [Overview](#overview)
2. [Initial Setup](#initial-setup)
3. [Workspaces and Connections](#workspaces-and-connections)
4. [User Roles](#user-roles)
5. [Generative AI Hub](#generative-ai-hub)
6. [Prompt Editor](#prompt-editor)
7. [Orchestration Workflows](#orchestration-workflows)
8. [ML Operations](#ml-operations)
9. [Configurations](#configurations)
10. [Deployments](#deployments)
11. [Executions and Runs](#executions-and-runs)
12. [Schedules](#schedules)
13. [Datasets and Artifacts](#datasets-and-artifacts)
14. [Model Comparison](#model-comparison)
15. [Applications](#applications)
16. [Meta API and Custom Runtime Capabilities](#meta-api-and-custom-runtime-capabilities)

---

## Overview

SAP AI Launchpad is a multitenant SaaS application on SAP BTP that provides:

- Management UI for AI runtimes (SAP AI Core)
- Generative AI Hub for prompt experimentation
- ML Operations for model lifecycle management
- Analytics and monitoring dashboards

### Two User Types

| Type | Description |
|------|-------------|
| **AI Scenario Producer** | Engineers developing and productizing AI scenarios |
| **AI Scenario Consumer** | Business analysts subscribing to and using AI scenarios |

---

## Initial Setup

### Prerequisites

1. SAP BTP enterprise account
2. Subaccount with Cloud Foundry enabled
3. SAP AI Launchpad subscription
4. SAP AI Core instance (for runtime connection)

### Setup Steps

1. **Create Subaccount** with Cloud Foundry environment
2. **Subscribe to SAP AI Launchpad** in Service Marketplace
3. **Create Service Instance** of SAP AI Core (if needed)
4. **Assign Role Collections** to users
5. **Add Connection** to SAP AI Core runtime

### Service Plans

| Plan | Cost | Support | GenAI Hub |
|------|------|---------|-----------|
| **Free** | Free | Community only, no SLA | No |
| **Standard** | Monthly fixed price | Full SAP support | Yes |

**Note:** Free → Standard upgrade preserves data; downgrade not supported.

---

## Workspaces and Connections

### Adding a Connection

1. Navigate to **Administration** → **Connections**
2. Click **Add**
3. Enter connection details:
   - Name
   - Service Key (from SAP AI Core)
4. Test connection
5. Save

### Managing Connections

| Operation | Description |
|-----------|-------------|
| Edit | Modify connection settings |
| Delete | Remove connection |
| Test | Verify connectivity |
| Set Default | Make primary connection |

### Assigning Connection to Workspace

1. Navigate to **Workspaces**
2. Select workspace
3. Click **Assign Connection**
4. Select connection from dropdown
5. Confirm

---

## User Roles

### Administrative Roles

| Role | Capabilities |
|------|--------------|
| `ailaunchpad_admin` | Full administrative access |
| `ailaunchpad_connections_editor` | Manage connections |
| `ailaunchpad_workspaces_admin` | Manage workspaces |

### ML Operations Roles

| Role | Capabilities |
|------|--------------|
| `mloperations_viewer` | View ML operations |
| `mloperations_editor` | Full ML operations access |

### Generative AI Hub Roles

| Role | Capabilities |
|------|--------------|
| `genai_manager` | Full GenAI hub access, save prompts |
| `genai_experimenter` | Prompt experimentation only |
| `prompt_manager` | Manage saved prompts |
| `prompt_experimenter` | Use saved prompts |
| `prompt_media_executor` | Upload images |
| `orchestration_executor` | Execute orchestration workflows |

---

## Generative AI Hub

### Access Path

**Workspaces** → Select workspace → **Generative AI Hub**

### Features

| Feature | Description |
|---------|-------------|
| **Prompt Editor** | Interactive prompt testing |
| **Model Library** | Browse available models |
| **Grounding Management** | Manage document pipelines |
| **Orchestration** | Build workflow configurations |
| **Chat** | Direct model interaction |
| **Saved Prompts** | Prompt management |

### Model Library

View model specifications including:
- Capabilities (chat, embeddings, vision)
- Context window sizes
- Performance benchmarks
- Cost per token
- Deprecation dates

---

## Prompt Editor

### Access

**Generative AI Hub** → **Prompt Editor**

### Interface Elements

| Element | Description |
|---------|-------------|
| **Name** | Prompt identifier (manager roles only) |
| **Collection** | Organize prompts (manager roles only) |
| **Messages** | Configure message blocks with roles |
| **Variables** | Define input placeholders |
| **Model Selection** | Choose model and version |
| **Parameters** | Adjust model parameters |
| **Metadata** | Tags and notes (manager roles only) |

### Message Roles

- **System**: Instructions for the model
- **User**: User input
- **Assistant**: Previous assistant responses

### Variable Syntax

Use `{{variable_name}}` for placeholders with definitions section.

### Running Prompts

1. Configure messages and variables
2. Select model (optional - uses default)
3. Adjust parameters
4. Click **Run**
5. View response (streaming available)

### Image Inputs

- Supported for select models (GPT-4o, Gemini, Llama Vision)
- Maximum 5MB across all inputs
- Requires `prompt_media_executor` role

### Saving Prompts

- Click **Save** (manager roles only)
- Assign to collection
- Add tags and notes
- Version automatically managed

### Prompt Types

| Type | Description |
|------|-------------|
| Question Answering | Q&A interactions |
| Summarization | Extract key points |
| Inferencing | Sentiment, entity extraction |
| Transformations | Translation, format conversion |
| Expansions | Content generation |

---

## Orchestration Workflows

### Access

**Generative AI Hub** → **Orchestration** → **Create**

### Workflow Modules

| Order | Module | Required |
|-------|--------|----------|
| 1 | Grounding | Optional |
| 2 | Templating | **Mandatory** |
| 3 | Input Translation | Optional |
| 4 | Data Masking | Optional |
| 5 | Input Filtering | Optional |
| 6 | Model Configuration | **Mandatory** |
| 7 | Output Filtering | Optional |
| 8 | Output Translation | Optional |

### Building Workflows

1. Click **Create** to start new workflow
2. Configure required modules (Templating, Model)
3. Enable optional modules via **Edit**
4. Configure each enabled module
5. Click **Test** to run workflow
6. Click **Save** to store configuration

### JSON Upload

- Maximum file size: 200 KB
- Format: JSON with `module_configurations`
- Note: Workflows with images can be downloaded but not uploaded

### Saving Workflows

- Save as configuration for reuse
- Assign name and description
- Link to deployments

---

## ML Operations

### Access

**Workspaces** → Select workspace → **ML Operations**

### Components

| Component | Purpose |
|-----------|---------|
| **Configurations** | Parameter and artifact settings |
| **Executions** | Training jobs |
| **Deployments** | Model serving |
| **Schedules** | Automated executions |
| **Datasets** | Training data |
| **Models** | Trained models |
| **Result Sets** | Inference outputs |
| **Other Artifacts** | Miscellaneous artifacts |

---

## Configurations

### Creating Configuration

1. Navigate to **ML Operations** → **Configurations**
2. Click **Create**
3. Enter details:
   - Name
   - Scenario
   - Executable
   - Parameters
   - Input artifacts
4. Save

### Configuration Contents

| Field | Description |
|-------|-------------|
| Name | Configuration identifier |
| Scenario | AI scenario reference |
| Executable | Workflow or serving template |
| Parameter Bindings | Key-value parameters |
| Artifact Bindings | Input artifact references |

---

## Deployments

### Creating Deployment

1. Navigate to **ML Operations** → **Deployments**
2. Click **Create**
3. Select configuration
4. Set duration (optional TTL)
5. Click **Create**

### Deployment Details

| Field | Description |
|-------|-------------|
| ID | Unique identifier |
| Status | Current state |
| URL | Inference endpoint |
| Configuration | Associated config |
| Created | Timestamp |
| Duration | TTL if set |

### Deployment Statuses

| Status | Description | Actions |
|--------|-------------|---------|
| Pending | Starting | Stop |
| Running | Active | Stop |
| Stopping | Shutting down | Wait |
| Stopped | Inactive | Delete |
| Dead | Failed | Delete |
| Unknown | Initial | Delete |

### Operations

| Operation | Description |
|-----------|-------------|
| View | See deployment details |
| View Logs | Access pipeline logs |
| Update | Change configuration |
| Stop | Halt deployment |
| Delete | Remove deployment |

### Bulk Operations

- Stop multiple deployments
- Delete multiple deployments (up to 100)

---

## Executions and Runs

### Creating Execution

1. Navigate to **ML Operations** → **Executions**
2. Click **Create**
3. Select configuration
4. Click **Create**

### Execution Statuses

| Status | Description |
|--------|-------------|
| Pending | Queued |
| Running | Executing |
| Completed | Finished successfully |
| Dead | Failed |
| Stopped | Manually stopped |

### Viewing Execution Details

- Parameters and artifacts
- Status and timing
- Logs from pipeline
- Output artifacts
- Metrics

### Comparing Executions

1. Select multiple executions
2. Click **Compare**
3. View side-by-side:
   - Parameters
   - Metrics
   - Durations
4. Create charts for visualization

---

## Schedules

### Creating Schedule

1. Navigate to **ML Operations** → **Schedules**
2. Click **Create**
3. Select configuration
4. Set cron expression
5. Define start/end dates
6. Save

### Cron Expression Format

```
┌───────── minute (0-59)
│ ┌─────── hour (0-23)
│ │ ┌───── day of month (1-31)
│ │ │ ┌─── month (1-12)
│ │ │ │ ┌─ day of week (0-6)
│ │ │ │ │
* * * * *
```

### Schedule Operations

| Operation | Description |
|-----------|-------------|
| View | See schedule details |
| Edit | Modify schedule |
| Stop | Pause schedule |
| Resume | Restart schedule |
| Delete | Remove schedule |

---

## Datasets and Artifacts

### Dataset Registration

1. Navigate to **ML Operations** → **Datasets**
2. Click **Register**
3. Enter details:
   - Name
   - URL (ai://secret-name/path)
   - Scenario
   - Description
4. Save

### Artifact Types

| Type | Description |
|------|-------------|
| Dataset | Training/validation data |
| Model | Trained model |
| Result Set | Inference results |
| Other | Miscellaneous |

### Finding Artifacts

- Filter by scenario
- Search by name
- Sort by date
- View details

---

## Model Comparison

### Comparing Models

1. Navigate to **ML Operations** → **Models**
2. Select multiple models
3. Click **Compare**
4. View:
   - Configuration differences
   - Metric comparisons
   - Performance charts

### Creating Comparison Charts

1. Select metrics to compare
2. Choose chart type
3. Configure axes
4. Generate visualization

---

## Applications

### Managing Applications

Access: **Administration** → **Applications**

### Operations

| Operation | Description |
|-----------|-------------|
| Create | Add new application |
| View | See application details |
| Edit | Modify settings |
| Delete | Remove application |
| Create Disclaimer | Add usage disclaimer |

### Chat Application

Create chat interfaces using deployed models:

1. Create application
2. Configure model deployment
3. Set disclaimer (optional)
4. Share application URL

---

## Meta API and Custom Runtime Capabilities

The Meta API identifies which capabilities apply to a given AI runtime, allowing SAP AI Launchpad to display only relevant features.

### Purpose

| Function | Description |
|----------|-------------|
| **Capability Management** | Enable/disable capabilities based on AI use case |
| **UI Streamlining** | Hide unnecessary features to reduce confusion |
| **API Decoupling** | Reduce impact of backend API changes |

### Supported Capabilities

| Capability | Description |
|------------|-------------|
| `userDeployments` | Allows users to create custom deployments |
| `userExecutions` | Enables execution functionality |
| `staticDeployments` | System-managed deployments |
| `timeToLiveDeployments` | TTL-based deployment limits |
| `bulkUpdates` | Bulk operations support |
| `executionSchedules` | Scheduling functionality |
| `analytics` | Analytics dashboard |

### Metadata Refresh

- **Automatic**: Refreshed periodically on schedule
- **On-demand**: Users can trigger manual refresh
- **Administration**: SAP Runtime team manages active capabilities

### Custom Runtime Usage

Custom runtimes can selectively implement only necessary capabilities, creating a tailored experience:

```
AI Runtime → Meta API Query → Capability List → Filtered UI
```

---

## Accessibility Features

SAP AI Launchpad provides:
- Keyboard navigation
- Screen reader support
- High contrast themes
- Accessible UI components

---

## Language Settings

Change interface language:
1. Navigate to user settings
2. Select language preference
3. Save changes

Supported languages vary by region and deployment.

---

## Documentation Links

- What is AI Launchpad: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/what-is-sap-ai-launchpad-760889a.md
- Initial Setup: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/initial-setup-5d8adb6.md
- Service Plans: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/service-plans-ec1717d.md
- ML Operations: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/ml-operations-df78271.md
- Generative AI Hub: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/generative-ai-hub-b0b935b.md
- Prompt Experimentation: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/prompt-experimentation-384cc0c.md
- Orchestration: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/build-your-orchestration-workflow-b7dc8b4.md
- Deployments: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-launchpad/deployments-0543c2c.md
