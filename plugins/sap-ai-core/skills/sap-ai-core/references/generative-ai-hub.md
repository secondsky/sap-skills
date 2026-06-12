# Generative AI Hub Reference

Complete reference for SAP AI Core Generative AI Hub.

**Documentation Source:** [SAP Help Portal - SAP AI Core](https://help.sap.com/docs/sap-ai-core)

---

## Overview

The Generative AI Hub integrates large language models (LLMs) into SAP AI Core and SAP AI Launchpad, providing unified access to models from multiple providers.

### Key Features

- Access to LLMs from multiple providers via unified API
- Harmonized API for model switching without code changes
- Prompt experimentation in AI Launchpad UI
- Prompt Registry for prompt template lifecycle management (available since Q1 2026)
- Orchestration workflows with filtering, masking, grounding, translation
- Token-based metering and billing

### Prerequisites

- SAP AI Core with **Extended** service plan
- Valid service key credentials
- Resource group created

---

## Global Scenarios

Two scenarios provide generative AI access:

| Scenario ID | Description | Use Case |
|-------------|-------------|----------|
| `foundation-models` | Direct model access | Single model deployment |
| `orchestration` | Unified multi-model access | Pipeline workflows |

---

## Model Providers

### 1. Azure OpenAI (`azure-openai`)

Access to OpenAI models via Azure's private instance.

**Models:**
- GPT-5.5 (flagship, available since June 2026)
- GPT-5.4, GPT-5.4-nano (available since April 2026)
- GPT-5.3-Codex (code-focused, available since April 2026)
- GPT-5, GPT-5 Mini, GPT-5 Nano (available since August 2025)
- GPT-4.1, GPT-4.1-mini, GPT-4.1-nano (replacement for GPT-4)
- GPT-4o (vision/multimodal)
- o3, o4-mini (reasoning models)
- GPT Realtime (realtime API, available since May 2026)
- text-embedding-3-large, text-embedding-3-small

**Deprecated:** GPT-4 (0613), GPT-4 Turbo (2024-04-09), GPT-4-32k, GPT-3.5 Turbo — migrate to GPT-4.1 or GPT-5 family.

**Capabilities:** Chat, embeddings, vision, reasoning, realtime

### 2. SAP-Hosted Open Source (`aicore-opensource`)

SAP-hosted open source models via OpenAI-compatible API.

**Models:**
- Llama 3.1 (8B, 70B, 405B)
- Llama 3.2 (1B, 3B, 11B-Vision, 90B-Vision)
- Llama 3.3 70B (available since early 2026)
- Llama 4 Scout, Llama 4 Maverick (available since Q2 2026)
- Mistral 7B, Mixtral 8x7B
- Falcon 40B

**Capabilities:** Chat, embeddings, vision (select models)

### 3. Google Vertex AI (`gcp-vertexai`)

Access to Google's AI models.

**Models:**
- Gemini 2.5 Pro Preview 06-05 (latest, available since June 2026)
- Gemini 2.5 Flash (supports image generation, available since May 2026)
- Gemini 2.5 Flash Lite (available since December 2025)
- Gemini 2.0 Flash, Gemini 2.0 Flash Lite
- text-embedding-004

**Deprecated:** Gemini 1.5 Pro, Gemini 1.5 Flash — migrate to Gemini 2.0 Flash or 2.5 family. PaLM 2 models (text-bison, chat-bison) have been retired.

**Capabilities:** Chat, embeddings, vision, code, image generation

### 4. AWS Bedrock (`aws-bedrock`)

Access to models via AWS Bedrock.

**Models:**
- Anthropic Claude 4.7 Opus (available since May 2026)
- Anthropic Claude 4.6 Opus (available since March 2026)
- Anthropic Claude 4.5 Opus (available since January 2026)
- Anthropic Claude 4.5 Sonnet, Claude 4.5 Haiku
- Anthropic Claude 3.7 Sonnet, Claude 3.5 Sonnet
- Anthropic Claude 3 Opus
- Amazon Nova Lite 2.0
- Amazon Titan Text, Titan Embeddings

**Capabilities:** Chat, embeddings

### 5. Mistral AI (`aicore-mistralai`)

SAP-hosted Mistral models.

**Models:**
- Mistral Large
- Mistral Medium
- Mistral Small
- Mistral 7B Instruct
- Codestral

**Capabilities:** Chat, code

### 6. IBM (`aicore-ibm`)

SAP-hosted IBM models.

**Models:**
- Granite 13B Chat, Granite 13B Instruct
- Granite Code
- Granite 3.0 models (available since early 2026)

**Capabilities:** Chat, code

### 7. Perplexity (`aicore-perplexity`)

Perplexity AI models accessed through SAP AI Core (available since Q1 2026).

**Models:**
- Perplexity Sonar Deep Research (deep research with citations, available since 2026)
- Perplexity Sonar Pro
- Perplexity Sonar

**Capabilities:** Chat with citations, web-grounded responses

**Note:** Sonar and Sonar Pro models support an output-with-citations feature in orchestration, returning source URLs alongside responses.

---

## API: List Available Models

```bash
curl -X GET "$AI_API_URL/v2/lm/scenarios/foundation-models/models" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json"
```

### Response Structure

```json
{
  "count": 50,
  "resources": [
    {
      "model": "gpt-4o",
      "accessType": "Remote",
      "displayName": "GPT-4o",
      "provider": "azure-openai",
      "allowedScenarios": ["foundation-models"],
      "executableId": "azure-openai",
      "description": "OpenAI's most advanced model",
      "versions": [
        {
          "name": "2024-05-13",
          "isLatest": true,
          "capabilities": ["text-generation", "chat", "vision"],
          "contextLength": 128000,
          "inputCost": 5.0,
          "outputCost": 15.0,
          "deprecationDate": null,
          "retirementDate": null,
          "isStreamingSupported": true
        }
      ]
    }
  ]
}
```

### Model Metadata Fields

| Field | Description |
|-------|-------------|
| `model` | Model identifier for API calls |
| `accessType` | "Remote" (external) or "Local" (SAP-hosted) |
| `provider` | Provider identifier |
| `executableId` | Executable ID for deployments |
| `contextLength` | Maximum context window tokens |
| `inputCost` | Cost per 1K input tokens |
| `outputCost` | Cost per 1K output tokens |
| `deprecationDate` | Date version becomes deprecated |
| `retirementDate` | Date version is removed |
| `isStreamingSupported` | Streaming capability |

---

## Deploying a Model

### Step 1: Create Configuration

```bash
curl -X POST "$AI_API_URL/v2/lm/configurations" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "gpt4o-deployment-config",
    "executableId": "azure-openai",
    "scenarioId": "foundation-models",
    "parameterBindings": [
      {"key": "modelName", "value": "gpt-4o"},
      {"key": "modelVersion", "value": "latest"}
    ]
  }'
```

### Step 2: Create Deployment

```bash
curl -X POST "$AI_API_URL/v2/lm/deployments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "configurationId": "<config-id-from-step-1>"
  }'
```

### Step 3: Check Status

```bash
curl -X GET "$AI_API_URL/v2/lm/deployments/<deployment-id>" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default"
```

Wait for status `RUNNING` and note the `deploymentUrl`.

---

## Using the Harmonized API

The harmonized API provides unified access without model-specific code.

### Chat Completion

```bash
curl -X POST "$DEPLOYMENT_URL/chat/completions" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is SAP AI Core?"}
    ],
    "max_tokens": 1000,
    "temperature": 0.7
  }'
```

### With Streaming

```bash
curl -X POST "$DEPLOYMENT_URL/chat/completions" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Tell me a story"}],
    "stream": true
  }'
```

### Embeddings

```bash
curl -X POST "$DEPLOYMENT_URL/embeddings" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-large",
    "input": ["Document chunk to embed"],
    "encoding_format": "float"
  }'
```

---

## Orchestration Deployment

For unified access to multiple models:

### Create Orchestration Deployment

```bash
# Get orchestration configuration ID
curl -X GET "$AI_API_URL/v2/lm/configurations?scenarioId=orchestration" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default"

# Create deployment
curl -X POST "$AI_API_URL/v2/lm/deployments" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "configurationId": "<orchestration-config-id>"
  }'
```

### Use Orchestration API

```bash
curl -X POST "$ORCHESTRATION_URL/v2/completion" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "config": {
      "module_configurations": {
        "llm_module_config": {
          "model_name": "gpt-4o",
          "model_version": "latest"
        },
        "templating_module_config": {
          "template": [
            {"role": "user", "content": "{{?prompt}}"}
          ]
        }
      }
    },
    "input_params": {
      "prompt": "What is machine learning?"
    }
  }'
```

---

## Model Version Management

### Auto-Upgrade Strategy

Set `modelVersion` to `"latest"` for automatic upgrades:

```json
{
  "parameterBindings": [
    {"key": "modelName", "value": "gpt-4o"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

### Pinned Version Strategy

Specify exact version for stability:

```json
{
  "parameterBindings": [
    {"key": "modelName", "value": "gpt-4o"},
    {"key": "modelVersion", "value": "2024-05-13"}
  ]
}
```

### Manual Version Upgrade

Patch deployment with new configuration:

```bash
curl -X PATCH "$AI_API_URL/v2/lm/deployments/<deployment-id>" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "configurationId": "<new-config-id>"
  }'
```

---

## SAP AI Launchpad UI

### Prompt Experimentation

Access: **Workspaces** → **Generative AI Hub** → **Prompt Editor**

Features:
- Interactive prompt testing
- Model selection and parameter tuning
- Variable placeholders
- Image inputs (select models)
- Streaming responses
- Save prompts (manager roles)

### Required Roles

| Role | Capabilities |
|------|--------------|
| `genai_manager` | Full access, save prompts |
| `genai_experimenter` | Test only, no save |
| `prompt_manager` | Manage saved prompts |
| `prompt_experimenter` | Use saved prompts |
| `prompt_media_executor` | Upload images |

### Prompt Types

- **Question Answering**: Q&A interactions
- **Summarization**: Extract key points
- **Inferencing**: Sentiment, entity extraction
- **Transformations**: Translation, format conversion
- **Expansions**: Content generation

---

## Model Library

View model specifications and benchmarks in AI Launchpad:

**Access:** Generative AI Hub → Model Library

Information available:
- Model capabilities
- Context window sizes
- Performance benchmarks (win rates, arena scores)
- Cost per token
- Deprecation schedules

---

## Rate Limits and Quotas

Refer to **SAP Note 3437766** for:
- Token conversion rates per model
- Rate limits (requests/minute, tokens/minute)
- Regional availability
- Deprecation dates

### Quota Increase Request

Submit support ticket:
- Component: `CA-ML-AIC`
- Include: tenant ID, current limits, requested limits, justification

---

## Best Practices

### Model Selection

| Use Case | Recommended Model |
|----------|-------------------|
| General chat | GPT-5.4, Claude 4.5 Sonnet, Gemini 2.5 Pro |
| Cost-sensitive | GPT-5 Nano, GPT-4.1-mini, Mistral Small |
| Long context | Gemini 2.5 Pro (2M), GPT-5 (128K+) |
| Embeddings | text-embedding-3-large |
| Code | GPT-5.3-Codex, GPT-5.4, Claude 4.5 Sonnet |
| Vision | GPT-4o, Gemini 2.5 Pro |
| Reasoning | o3, o4-mini, Claude 4.7 Opus |
| Citations / web-grounded | Perplexity Sonar, Sonar Pro, Sonar Deep Research |
| Deep research | Perplexity Sonar Deep Research |
| Realtime | GPT Realtime |

### Cost Optimization

1. Use smaller models for simple tasks
2. Implement caching for repeated queries
3. Set appropriate `max_tokens` limits
4. Use streaming for better UX without extra cost
5. Monitor token usage via AI Launchpad analytics

### Reliability

1. Implement fallback configurations
2. Pin model versions in production
3. Monitor deprecation dates
4. Test before upgrading versions

---

## Documentation Links

- Generative AI Hub: [https://help.sap.com/docs/sap-ai-core/generative-ai/generative-ai-hub](https://help.sap.com/docs/sap-ai-core/generative-ai/generative-ai-hub)
- Supported Models: [https://help.sap.com/docs/sap-ai-core/generative-ai/supported-models](https://help.sap.com/docs/sap-ai-core/generative-ai/supported-models)
- SAP Note 3437766: Token rates, limits, deprecation
- SAP Discovery Center: [https://discovery-center.cloud.sap/serviceCatalog/sap-ai-core](https://discovery-center.cloud.sap/serviceCatalog/sap-ai-core)
