# Model Providers Reference

Complete reference for SAP AI Core model providers and available models.

**Documentation Source:** [SAP Help Portal - SAP AI Core](https://help.sap.com/docs/sap-ai-core)

**Latest Models:** SAP Note 3437766

---

## Overview

SAP AI Core provides access to models from multiple providers via the Generative AI Hub. All models are accessed through a unified API, allowing easy switching between providers.

---

## Provider Summary

| Provider | Executable ID | Access Type | Model Categories |
|----------|---------------|-------------|------------------|
| Azure OpenAI | `azure-openai` | Remote | Chat, Embeddings, Vision, Reasoning, Realtime |
| SAP Open Source | `aicore-opensource` | Local | Chat, Embeddings, Vision |
| Google Vertex AI | `gcp-vertexai` | Remote | Chat, Embeddings, Vision, Code, Image Gen |
| AWS Bedrock | `aws-bedrock` | Remote | Chat, Embeddings |
| Mistral AI | `aicore-mistralai` | Local | Chat, Code |
| IBM | `aicore-ibm` | Local | Chat, Code |
| Perplexity | `aicore-perplexity` | Remote | Chat with Citations, Deep Research |

---

## 1. Azure OpenAI

**Executable ID:** `azure-openai`
**Access Type:** Remote (Azure-hosted)

### Flagship Models (GPT-5 Family)

| Model | Context | Capabilities | Use Case |
|-------|---------|--------------|----------|
| gpt-5.5 | 256K | Chat, Vision, Reasoning | Most advanced (available since June 2026) |
| gpt-5.4 | 256K | Chat, Vision | High performance (available since April 2026) |
| gpt-5.4-nano | 128K | Chat | Cost-efficient within GPT-5.4 tier |
| gpt-5.3-codex | 128K | Chat, Code | Code-focused variant |
| gpt-5 | 128K | Chat, Vision | Base GPT-5 (available since August 2025) |
| gpt-5-mini | 128K | Chat | Mid-tier GPT-5 |
| gpt-5-nano | 128K | Chat | Most cost-efficient GPT-5 |

### GPT-4.1 Family

| Model | Context | Capabilities | Use Case |
|-------|---------|--------------|----------|
| gpt-4.1 | 128K | Chat, Vision | Replacement for GPT-4 (available since May 2025) |
| gpt-4.1-mini | 128K | Chat, Vision | Mid-tier |
| gpt-4.1-nano | 128K | Chat | Lightweight |

### Legacy Models

| Model | Context | Capabilities | Use Case |
|-------|---------|--------------|----------|
| gpt-4o | 128K | Chat, Vision | Vision/multimodal |

**Deprecated:** gpt-4 (0613), gpt-4-turbo, gpt-4-32k, gpt-35-turbo — migrate to GPT-4.1 or GPT-5.

### Reasoning Models

| Model | Context | Capabilities | Use Case |
|-------|---------|--------------|----------|
| o3 | - | Reasoning | Complex reasoning chains |
| o4-mini | - | Reasoning | Cost-efficient reasoning |

### Special Models

| Model | Use Case |
|-------|----------|
| gpt-realtime | Realtime conversational API (available since May 2026) |

### Embedding Models

| Model | Dimensions | Use Case |
|-------|------------|----------|
| text-embedding-3-large | 3072 | High accuracy embeddings |
| text-embedding-3-small | 1536 | Cost-efficient embeddings |

### Configuration Example

```json
{
  "name": "azure-gpt4o-config",
  "executableId": "azure-openai",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "gpt-4o"},
    {"key": "modelVersion", "value": "2024-05-13"}
  ]
}
```

---

## 2. SAP-Hosted Open Source

**Executable ID:** `aicore-opensource`
**Access Type:** Local (SAP-hosted)

### Llama Models

| Model | Parameters | Context | Capabilities |
|-------|------------|---------|--------------|
| llama-4-maverick | 400B MoE | 1M | Advanced reasoning (available since Q2 2026) |
| llama-4-scout | 109B MoE | 10M | Long context (available since Q2 2026) |
| llama-3.3-70b | 70B | 128K | Strong reasoning |
| llama-3.1-405b | 405B | 128K | Advanced reasoning |
| llama-3.1-70b | 70B | 128K | Strong reasoning |
| llama-3.1-8b | 8B | 128K | Fast, efficient |
| llama-3.2-90b-vision | 90B | 128K | Vision + text |
| llama-3.2-11b-vision | 11B | 128K | Vision + text |
| llama-3.2-3b | 3B | 128K | Lightweight |
| llama-3.2-1b | 1B | 128K | Edge deployment |

### Mistral Models (Open Source)

| Model | Parameters | Context |
|-------|------------|---------|
| mistral-7b-instruct | 7B | 32K |
| mixtral-8x7b | 46.7B | 32K |

### Falcon Models

| Model | Parameters | Context |
|-------|------------|---------|
| falcon-40b | 40B | 2K |

### Configuration Example

```json
{
  "name": "llama-config",
  "executableId": "aicore-opensource",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "meta--llama-3.1-70b-instruct"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

---

## 3. Google Vertex AI

**Executable ID:** `gcp-vertexai`
**Access Type:** Remote (Google Cloud)

### Gemini 2.5 Family

| Model | Context | Capabilities |
|-------|---------|--------------|
| gemini-2.5-pro | 2M | Chat, Vision, Code, Long context, latest preview |
| gemini-2.5-flash | 1M | Fast, multimodal, image generation |
| gemini-2.5-flash-lite | 1M | Fast, lower-cost multimodal |

### Gemini 2.0 Family

| Model | Context | Capabilities |
|-------|---------|--------------|
| gemini-2.0-flash | 1M | Flash family, multimodal |
| gemini-2.0-flash-lite | 1M | Flash family, lower-cost |

### Deprecated Models

| Model | Use Case | Status |
|-------|----------|--------|
| gemini-1.5-pro | Long context | **Deprecated** — migrate to gemini-2.0-flash or 2.5 |
| gemini-1.5-flash | Fast chat | **Deprecated** — migrate to gemini-2.5-flash-lite |
| text-bison | Text generation | **Retired** — migrate to Gemini |
| chat-bison | Conversational | **Retired** — migrate to Gemini |
| code-bison | Code generation | **Retired** — migrate to Gemini |

### Embedding Models

| Model | Dimensions |
|-------|------------|
| text-embedding-004 | 768 |

### Configuration Example

```json
{
  "name": "gemini-config",
  "executableId": "gcp-vertexai",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "gemini-1.5-pro"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

---

## 4. AWS Bedrock

**Executable ID:** `aws-bedrock`
**Access Type:** Remote (AWS)

### Anthropic Claude Models

| Model | Context | Capabilities |
|-------|---------|--------------|
| claude-4.7-opus | 200K | Highest capability (available since May 2026) |
| claude-4.6-opus | 200K | Advanced reasoning (available since March 2026) |
| claude-4.5-opus | 200K | High capability (available since January 2026) |
| claude-4.5-sonnet | 200K | Balanced, high performance |
| claude-4.5-haiku | 200K | Fast, efficient |
| claude-3.7-sonnet | 200K | Improved Sonnet |
| claude-3.5-sonnet | 200K | Advanced reasoning |
| claude-3-opus | 200K | High capability |

### Amazon Models

| Model | Context | Use Case |
|-------|---------|----------|
| amazon-nova-lite-2-0 | - | Cost-efficient |
| titan-text-express | - | General text |
| titan-text-lite | - | Lightweight |
| titan-embed-text | - | Embeddings |

### Configuration Example

```json
{
  "name": "claude-config",
  "executableId": "aws-bedrock",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "anthropic--claude-3-5-sonnet"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

---

## 5. Mistral AI

**Executable ID:** `aicore-mistralai`
**Access Type:** Local (SAP-hosted)

### Models

| Model | Parameters | Context | Use Case |
|-------|------------|---------|----------|
| mistral-large | - | 32K | Advanced reasoning |
| mistral-medium | - | 32K | Balanced |
| mistral-small | - | 32K | Cost-efficient |
| codestral | - | 32K | Code generation |

### Configuration Example

```json
{
  "name": "mistral-config",
  "executableId": "aicore-mistralai",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "mistralai--mistral-large"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

---

## 6. IBM

**Executable ID:** `aicore-ibm`
**Access Type:** Local (SAP-hosted)

### Granite Models

| Model | Parameters | Use Case |
|-------|------------|----------|
| granite-3-0 | Various | Latest Granite generation (available since early 2026) |
| granite-13b-chat | 13B | Conversational |
| granite-13b-instruct | 13B | Task completion |
| granite-code | - | Code generation |

### Configuration Example

```json
{
  "name": "granite-config",
  "executableId": "aicore-ibm",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "ibm--granite-13b-chat"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

---

## 7. Perplexity

**Executable ID:** `aicore-perplexity`
**Access Type:** Remote (Perplexity-hosted)
**Available since:** Q1 2026

### Models

| Model | Use Case |
|-------|----------|
| perplexity-sonar-deep-research | Deep research with comprehensive citations |
| perplexity-sonar-pro | Advanced web-grounded chat with citations |
| perplexity-sonar | Web-grounded chat with citations |

**Unique Features:**
- Returns citation URLs alongside responses
- Web-grounded responses for up-to-date information
- Supports output-with-citations in orchestration workflows

### Configuration Example

```json
{
  "name": "perplexity-config",
  "executableId": "aicore-perplexity",
  "scenarioId": "foundation-models",
  "parameterBindings": [
    {"key": "modelName", "value": "perplexity--sonar"},
    {"key": "modelVersion", "value": "latest"}
  ]
}
```

---

## Model Selection Guide

### By Use Case

| Use Case | Recommended Models |
|----------|-------------------|
| General chat | gpt-5.4, claude-4.5-sonnet, gemini-2.5-pro |
| Code generation | gpt-5.3-codex, gpt-5.4, claude-4.5-sonnet |
| Long documents | gemini-2.5-pro (2M), gpt-5.5 (256K), llama-4-scout (10M) |
| Vision/images | gpt-4o, gemini-2.5-pro, gemini-2.5-flash (image gen) |
| Embeddings | text-embedding-3-large, text-embedding-004 |
| Cost-sensitive | gpt-5-nano, gpt-4.1-mini, mistral-small |
| High throughput | gpt-4.1-mini, claude-4.5-haiku, mistral-small |
| Reasoning | o3, o4-mini, claude-4.7-opus |
| Web-grounded / citations | perplexity-sonar, perplexity-sonar-pro |
| Deep research | perplexity-sonar-deep-research |
| Realtime | gpt-realtime |

### By Budget

| Budget | Tier | Models |
|--------|------|--------|
| Low | Economy | gpt-5-nano, claude-4.5-haiku, mistral-small |
| Medium | Standard | gpt-5, claude-4.5-sonnet, gemini-2.5-flash |
| High | Premium | gpt-5.5, claude-4.7-opus, gemini-2.5-pro |

### By Capability

| Capability | Best Models |
|------------|-------------|
| Reasoning | o3, claude-4.7-opus, gpt-5.5 |
| Speed | claude-4.5-haiku, gpt-5-nano, mistral-small |
| Context length | gemini-2.5-pro (2M), llama-4-scout (10M) |
| Multimodal | gpt-4o, gemini-2.5-pro, llama-3.2-vision |
| Code | gpt-5.3-codex, gpt-5.4, claude-4.5-sonnet |
| Citations | perplexity-sonar, perplexity-sonar-pro, perplexity-sonar-deep-research |

---

## Model Version Management

### Version Strategies

| Strategy | Configuration | Use Case |
|----------|---------------|----------|
| Latest | `"modelVersion": "latest"` | Development, auto-upgrade |
| Pinned | `"modelVersion": "2024-05-13"` | Production stability |

### Checking Available Versions

```bash
curl -X GET "$AI_API_URL/v2/lm/scenarios/foundation-models/models" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" | \
  jq '.resources[] | select(.model == "gpt-4o") | .versions'
```

### Handling Deprecation

1. Monitor `deprecationDate` in model metadata
2. Plan migration before `retirementDate`
3. Test new version in staging
4. Update configuration with new version
5. Patch existing deployments

---

## Pricing Considerations

Pricing varies by:
- Model complexity (larger = more expensive)
- Input vs output tokens (output often 2-3x input cost)
- Provider region
- Access type (Remote vs Local)

**Reference:** SAP Note 3437766 for current token rates.

### Cost Optimization

1. **Right-size models**: Use smaller models for simple tasks
2. **Batch requests**: Combine multiple queries when possible
3. **Cache responses**: Store and reuse common query results
4. **Limit tokens**: Set appropriate `max_tokens` limits
5. **Use streaming**: No additional cost, better UX

---

## Rate Limits

Rate limits vary by:
- Service plan tier
- Model provider
- Specific model

**Default limits** (vary by configuration):
- Requests per minute: 60-600
- Tokens per minute: 40K-400K

### Handling Rate Limits

```python
import time
from requests.exceptions import HTTPError

def call_with_retry(func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return func()
        except HTTPError as e:
            if e.response.status_code == 429:
                wait_time = 2 ** attempt
                time.sleep(wait_time)
            else:
                raise
    raise Exception("Max retries exceeded")
```

---

## Documentation Links

- Supported Models: [https://help.sap.com/docs/sap-ai-core/generative-ai/supported-models](https://help.sap.com/docs/sap-ai-core/generative-ai/supported-models)
- Generative AI Hub: [https://help.sap.com/docs/sap-ai-core/generative-ai/generative-ai-hub](https://help.sap.com/docs/sap-ai-core/generative-ai/generative-ai-hub)
- SAP Note 3437766: Token rates, limits, deprecation dates
- SAP Discovery Center: [https://discovery-center.cloud.sap/serviceCatalog/sap-ai-core](https://discovery-center.cloud.sap/serviceCatalog/sap-ai-core)
