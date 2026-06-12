---
name: sap-ai-core
description: |
  Guides development with SAP AI Core and SAP AI Launchpad for enterprise AI/ML workloads on SAP BTP. Use when: deploying generative AI models (GPT-5.5, GPT-5, Claude 4.5/4.7 Opus/Sonnet, Gemini 2.5 Pro, Perplexity Sonar), building orchestration workflows with templating/filtering/grounding, implementing RAG with vector databases, managing ML training pipelines with Argo Workflows, configuring content filtering and data masking for PII protection, using the Generative AI Hub for prompt experimentation, managing prompt templates via the Prompt Registry, or integrating AI capabilities into SAP applications. Covers service plans (Free/Standard/Extended), model providers (Azure OpenAI, AWS Bedrock, GCP Vertex AI, Mistral, IBM, Perplexity), orchestration modules, embeddings, tool calling, and structured outputs.
license: GPL-3.0
metadata:
  version: "1.2.0"
  last_verified: "2026-06-12"
  production_tested: "Yes, examples verified against SAP documentation"
---

# SAP AI Core & AI Launchpad Skill

## Related Skills

- **sap-btp-cloud-platform**: Use for platform context, BTP account setup, and service integration
- **sap-cap-capire**: Use for building AI-powered applications with CAP or integrating AI services
- **sap-cloud-sdk-ai**: Use for SDK integration, AI service calls, and Java/JavaScript implementations
- **sap-btp-best-practices**: Use for production deployment patterns and AI governance guidelines

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Service Plans](#service-plans)
4. [Model Providers](#model-providers)
5. [Orchestration](#orchestration)
6. [Content Filtering](#content-filtering)
7. [Data Masking](#data-masking)
8. [Grounding (RAG)](#grounding-rag)
9. [Tool Calling](#tool-calling)
10. [Structured Output](#structured-output)
11. [Embeddings](#embeddings)
12. [ML Training](#ml-training)
13. [Deployments](#deployments)
14. [Bundled Resources](#bundled-resources)
15. [SAP AI Launchpad](#sap-ai-launchpad)
16. [Prompt Registry](#prompt-registry)
17. [API Reference](#api-reference)
18. [Common Patterns](#common-patterns)
19. [Troubleshooting](#troubleshooting)
20. [References](#references)

## Overview

SAP AI Core is a service on SAP Business Technology Platform (BTP) that manages AI asset execution in a standardized, scalable, hyperscaler-agnostic manner. SAP AI Launchpad provides the management UI for AI runtimes including the Generative AI Hub.

### Core Capabilities

| Capability | Description |
|------------|-------------|
| **Generative AI Hub** | Access to LLMs from multiple providers with unified API |
| **Orchestration** | Modular pipeline for templating, filtering, grounding, masking |
| **ML Training** | Argo Workflows-based batch pipelines for model training |
| **Inference Serving** | Deploy models as HTTPS endpoints for predictions |
| **Grounding/RAG** | Vector database integration for contextual AI |

### Three Components

1. **SAP AI Core**: Execution engine for AI workflows and model serving
2. **SAP AI Launchpad**: Management UI for AI runtimes and GenAI Hub
3. **AI API**: Standardized lifecycle management across runtimes

## Quick Start

### Prerequisites

- SAP BTP enterprise account
- SAP AI Core service instance (Extended plan for GenAI)
- Service key with credentials

### 1. Get Authentication Token

```bash
# Set environment variables from service key
export AI_API_URL="<your-ai-api-url>"
export AUTH_URL="<your-auth-url>"
export CLIENT_ID="<your-client-id>"
export CLIENT_SECRET="<your-client-secret>"

# Get OAuth token
AUTH_TOKEN=$(curl -s -X POST "$AUTH_URL/oauth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET" \
  | jq -r '.access_token')
```

### 2. Create Orchestration Deployment

```bash
# Check for existing orchestration deployment
curl -X GET "$AI_API_URL/v2/lm/deployments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json"

# Create orchestration deployment if needed
curl -X POST "$AI_API_URL/v2/lm/deployments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "configurationId": "<orchestration-config-id>"
  }'
```

### 3. Use Harmonized API for Model Inference

```bash
ORCHESTRATION_URL="<deployment-url>"

curl -X POST "$ORCHESTRATION_URL/v2/completion" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "config": {
      "module_configurations": {
        "llm_module_config": {
          "model_name": "gpt-4o",
          "model_version": "latest",
          "model_params": {
            "max_tokens": 1000,
            "temperature": 0.7
          }
        },
        "templating_module_config": {
          "template": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "{{?user_query}}"}
          ]
        }
      }
    },
    "input_params": {
      "user_query": "What is SAP AI Core?"
    }
  }'
```

## Service Plans

| Plan | Cost | GenAI Hub | Support | Resource Groups |
|------|------|-----------|---------|-----------------|
| **Free** | Free | No | Community only | Default only |
| **Standard** | Per resource + baseline | No | Full SLA | Multiple |
| **Extended** | Per resource + tokens | Yes | Full SLA | Multiple |

**Key Restrictions:**
- Free and Standard mutually exclusive in same subaccount
- Free → Standard upgrade possible; downgrade not supported
- Max 50 resource groups per tenant

## Model Providers

SAP AI Core provides access to models from multiple providers:
- **Azure OpenAI**: GPT-5.5, GPT-5.4, GPT-5, GPT-4.1, o3, o4-mini, GPT Realtime
- **SAP Open Source**: Llama 3.1/3.2/3.3/4, Falcon
- **Google Vertex AI**: Gemini 2.5 Pro/Flash/Flash-Lite, Gemini 2.0 Flash
- **AWS Bedrock**: Claude 4.7/4.6/4.5 Opus, Claude 4.5 Sonnet/Haiku
- **Mistral AI**: Mistral Large, Medium, Small
- **IBM**: Granite models
- **Perplexity**: Sonar, Sonar Pro, Sonar Deep Research

For detailed provider configurations and model lists, see `references/model-providers.md`.

## Orchestration

The orchestration service provides unified access to multiple models through a modular pipeline with 8 execution stages:
1. Grounding → 2. Templating (mandatory) → 3. Input Translation → 4. Data Masking → 5. Input Filtering → 6. Model Configuration (mandatory) → 7. Output Filtering → 8. Output Translation

For complete orchestration module configurations, examples, and advanced patterns, see `references/orchestration-modules.md`.

## Content Filtering

**Azure Content Safety**: Filters content across 4 categories (Hate, Violence, Sexual, SelfHarm) with severity levels 0-6. Azure OpenAI blocks severity 4+ automatically. Additional features include PromptShield and Protected Material detection.

**Llama Guard 3**: Covers 14 categories including violent crimes, privacy violations, and code interpreter abuse.

## Data Masking

**Two PII protection methods**:
- **Anonymization**: `MASKED_ENTITY` (non-reversible)
- **Pseudonymization**: `MASKED_ENTITY_ID` (reversible)

**Supported entities** (25 total): Personal data, IDs, financial information, SAP-specific IDs, and sensitive attributes. For complete entity list and implementation details, see `references/orchestration-modules.md`.

## Grounding (RAG)

Integrate external data from SharePoint, S3, SFTP, SAP Build Work Zone, and DMS. Supports PDF, HTML, DOCX, images, and more. Limit: 2,000 documents per pipeline with daily refresh. For detailed setup, see `references/grounding-rag.md`.

## Tool Calling

Enable LLMs to execute functions through a 5-step workflow: define tools → receive tool_calls → execute functions → return results → LLM incorporates responses. Templates available in `templates/tool-definition.json`.

## Structured Output

Force model responses to match JSON schemas using strict validation. Useful for structured data extraction and API responses.

## Embeddings

Generate semantic embeddings for RAG and similarity search via `/v2/embeddings` endpoint. Supports document, query, and text input types.

## ML Training

Uses Argo Workflows for training pipelines. Key requirements: create `default` object store secret, define workflow template, create configuration with parameters, and execute training. For complete workflow patterns, see `references/ml-operations.md`.

## Deployments

Deploy models via two-step process: create configuration (with model binding), then create deployment with TTL. Statuses: Pending → Running → Stopping → Stopped/Dead. Templates in `templates/deployment-config.json`.

## SAP AI Launchpad

Web-based UI with 4 key applications:
- **Workspaces**: Manage connections and resource groups
- **ML Operations**: Train, deploy, monitor models
- **Generative AI Hub**: Prompt experimentation and orchestration
- **Functions Explorer**: Explore available AI functions

Required roles include `genai_manager`, `genai_experimenter`, `prompt_manager`, `orchestration_executor`, and `mloperations_editor`. For complete guide, see `references/ai-launchpad-guide.md`.

## Prompt Registry

The Prompt Registry manages the lifecycle of prompt templates from design to runtime, integrating them into SAP AI Core and orchestration workflows.

**Two management interfaces:**
- **Imperative API**: Full CRUD via REST, for design-time prompt refinement
- **Declarative API**: Git repository sync, for runtime and CI/CD use cases

**Key endpoints:**
- `POST /v2/lm/promptTemplates` — Create a prompt template
- `POST /v2/lm/promptTemplates/{id}/substitution` — Fill template by ID
- `POST /v2/lm/scenarios/{scenario}/promptTemplates/{name}/versions/{version}/substitution` — Fill by name

For complete Prompt Registry documentation, see `references/ai-launchpad-guide.md`.

## API Reference

### Core Endpoints

Key endpoints: `/v2/lm/scenarios`, `/v2/lm/configurations`, `/v2/lm/deployments`, `/v2/lm/executions`, `/lm/meta`. For complete API reference with examples, see `references/api-reference.md`.

## Common Patterns

**CAP Integration**: SAP CAP is the primary consumer framework for AI Core on BTP. Bind an AI Core service instance to your CAP app via MTA, then call the orchestration API from CAP event handlers using the SAP Cloud SDK for AI. Always process LLM calls asynchronously in production (return `202 Accepted`, process in background via `cds.spawn`) to avoid BTP load balancer timeouts. See **sap-cap-capire** and **sap-cloud-sdk-ai** skills for complete code examples.

**Simple Chat**: Basic model invocation with templating module
**RAG with Grounding**: Combine vector search with LLM for context-aware responses
**Secure Enterprise Chat**: Filtering + masking + grounding for PII protection
Templates available in `templates/orchestration-workflow.json`.

  ## Troubleshooting

**Common Issues**:
- 401 Unauthorized: Refresh OAuth token
- 403 Forbidden: Check IAM roles, request quota increase
- 404 Not Found: Verify AI-Resource-Group header
- Deployment DEAD: Check deployment logs
- Training failed: Create `default` object store secret

Request quota increases via support ticket (Component: `CA-ML-AIC`).

## Bundled Resources

### Reference Documentation
1. `references/orchestration-modules.md` - All orchestration modules in detail
2. `references/generative-ai-hub.md` - Complete GenAI hub documentation
3. `references/model-providers.md` - Model providers and configurations
4. `references/api-reference.md` - Complete API endpoint reference
5. `references/grounding-rag.md` - Grounding and RAG implementation
6. `references/ml-operations.md` - ML operations and training
7. `references/advanced-features.md` - Chat, applications, security, auditing
8. `references/ai-launchpad-guide.md` - Complete SAP AI Launchpad UI guide

### Templates
1. `templates/deployment-config.json` - Deployment configuration template
2. `templates/orchestration-workflow.json` - Orchestration workflow template
3. `templates/tool-definition.json` - Tool calling definition template

### Official Sources
- SAP AI Core Guide: [https://help.sap.com/docs/sap-ai-core](https://help.sap.com/docs/sap-ai-core)
- SAP AI Launchpad Guide: [https://help.sap.com/docs/sap-ai-launchpad](https://help.sap.com/docs/sap-ai-launchpad)
- SAP Note 3437766: Model token rates and limits
