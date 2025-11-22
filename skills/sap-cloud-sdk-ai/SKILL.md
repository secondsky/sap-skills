---
name: sap-cloud-sdk-ai
description: |
  Integrates SAP Cloud SDK for AI into JavaScript/TypeScript and Java applications. Use when building applications with SAP AI Core, Generative AI Hub, or Orchestration Service. Covers chat completion, embedding, streaming, function calling, content filtering, data masking, document grounding, prompt registry, and LangChain/Spring AI integration. Supports OpenAI GPT-4o, Claude, Gemini, Amazon Nova, and other foundation models via SAP BTP.
license: MIT
---

# SAP Cloud SDK for AI

The official SDK for SAP AI Core, SAP Generative AI Hub, and Orchestration Service.

## When to Use This Skill

Use this skill when:
- Integrating AI/LLM capabilities into SAP BTP applications
- Building chat completion or embedding features
- Using GPT-4o, Claude, Gemini, or other models via SAP AI Core
- Implementing content filtering, data masking, or document grounding
- Creating agentic workflows with LangChain or Spring AI
- Managing prompts via Prompt Registry
- Deploying AI models on SAP AI Core

## Quick Start

### JavaScript/TypeScript

```bash
npm install @sap-ai-sdk/orchestration
```

```typescript
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: [{ role: 'user', content: '{{?question}}' }]
  }
});

const response = await client.chatCompletion({
  placeholderValues: { question: 'What is SAP?' }
});
console.log(response.getContent());
```

### Java

```xml
<dependency>
  <groupId>com.sap.ai.sdk</groupId>
  <artifactId>orchestration</artifactId>
  <version>${ai-sdk.version}</version>
</dependency>
```

```java
var client = new OrchestrationClient();
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O);
var prompt = new OrchestrationPrompt("What is SAP?");
var result = client.chatCompletion(prompt, config);
System.out.println(result.getContent());
```

## Prerequisites

- **Node.js 20+** (JavaScript) or **Java 17+** (Java)
- **SAP AI Core** service instance (extended or sap-internal plan)
- **Orchestration deployment** in AI Core (default resource group has this)

## Connection Setup

### BTP Runtime (Cloud Foundry/Kyma)
Bind AI Core service instance to your application. SDK auto-detects via `VCAP_SERVICES` or mounted secrets.

### Local Development
Set environment variable:
```bash
export AICORE_SERVICE_KEY='{"clientid":"...","clientsecret":"...","url":"...","serviceurls":{"AI_API_URL":"..."}}'
```

Or use CAP hybrid mode:
```bash
# JavaScript
cds bind -2 <AICORE_INSTANCE> && cds-tsx watch --profile hybrid

# Java
cds bind --to aicore --exec mvn spring-boot:run
```

For detailed connection options, see `references/connecting-to-ai-core.md`

## Available Packages

### JavaScript/TypeScript
| Package | Purpose |
|---------|---------|
| `@sap-ai-sdk/orchestration` | Chat completion, filtering, grounding |
| `@sap-ai-sdk/foundation-models` | Direct model access (OpenAI) |
| `@sap-ai-sdk/langchain` | LangChain integration |
| `@sap-ai-sdk/ai-api` | Deployments, artifacts, configurations |
| `@sap-ai-sdk/document-grounding` | Pipeline, Vector, Retrieval APIs |
| `@sap-ai-sdk/prompt-registry` | Prompt template management |

### Java
| Artifact | Purpose |
|----------|---------|
| `orchestration` | Chat completion, filtering, grounding |
| `openai` (foundationmodels) | Direct OpenAI model access |
| `core` | Base connectivity |
| `document-grounding` | Pipeline, Vector, Retrieval APIs |
| `prompt-registry` | Prompt template management |

## Supported Models

### Recommended
- **OpenAI**: gpt-4o, gpt-4o-mini, o1, o3-mini
- **Anthropic (AWS)**: Claude 3.5 Sonnet, Claude 4
- **Amazon**: Nova Pro, Nova Lite, Nova Micro
- **Google**: Gemini 2.5 Flash, Gemini 2.0 Flash
- **Mistral**: Medium, Large

### Deprecated Models (Use Replacements)
| Deprecated | Use Instead |
|------------|-------------|
| text-embedding-ada-002 | text-embedding-3-small/large |
| gpt-35-turbo (all variants) | gpt-4o-mini |
| gpt-4-32k | gpt-4o |
| gpt-4 (base) | gpt-4o or gpt-4.1 |
| gemini-1.0-pro | gemini-2.0-flash |
| gemini-1.5-pro/flash | gemini-2.5-flash |
| mistralai--mixtral-8x7b | mistralai--mistral-small-instruct |

## Core Features

### Chat Completion with Streaming

```typescript
// JavaScript
const stream = client.stream({
  placeholderValues: { question: 'Explain SAP CAP' }
});

for await (const chunk of stream.toContentStream()) {
  process.stdout.write(chunk);
}
```

```java
// Java
client.streamChatCompletion(prompt, config)
    .forEach(chunk -> System.out.print(chunk.getDeltaContent()));
```

### Function/Tool Calling

```typescript
// JavaScript
const tools = [{
  type: 'function',
  function: {
    name: 'get_weather',
    parameters: { type: 'object', properties: { city: { type: 'string' } } }
  }
}];

const response = await client.chatCompletion({
  placeholderValues: { question: 'Weather in Berlin?' }
}, { tools });

const toolCalls = response.getToolCalls();
```

### Content Filtering

```typescript
// JavaScript
import { buildAzureContentSafetyFilter } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  filtering: {
    input: buildAzureContentSafetyFilter({ Hate: 'ALLOW_SAFE' }),
    output: buildAzureContentSafetyFilter({ Violence: 'ALLOW_SAFE' })
  }
});
```

### Data Masking

```typescript
// JavaScript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  masking: {
    masking_providers: [{
      type: 'sap_data_privacy_integration',
      method: 'anonymization',
      entities: [{ type: 'profile-email' }, { type: 'profile-person' }]
    }]
  }
});
```

### Document Grounding

```typescript
// JavaScript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  grounding: {
    grounding_input: ['{{?question}}'],
    grounding_output: ['{{?context}}'],
    data_repositories: [{ type: 'vector', id: 'my-repo-id' }]
  }
});
```

## Response Helpers

JavaScript SDK provides helper methods:

```typescript
const response = await client.chatCompletion({ placeholderValues });

response.getContent();          // Model output string
response.getTokenUsage();       // { prompt_tokens, completion_tokens, total_tokens }
response.getFinishReason();     // 'stop', 'length', 'tool_calls', etc.
response.getToolCalls();        // Array of function calls
response.getDeltaToolCalls();   // Partial tool calls (streaming)
response.getAllMessages();      // Full message history
response.getAssistantMessage(); // Assistant response only
response.getRefusal();          // Refusal message if blocked
```

Streaming response methods:

```typescript
const stream = client.stream({ placeholderValues });
for await (const chunk of stream.toContentStream()) {
  process.stdout.write(chunk);
}
// After stream ends:
stream.getFinishReason();
stream.getTokenUsage();
```

## Advanced Topics

For detailed guidance:
- **Orchestration features**: `references/orchestration-guide.md`
- **Foundation models (direct OpenAI)**: `references/foundation-models-guide.md`
- **LangChain integration**: `references/langchain-guide.md`
- **Spring AI integration**: `references/spring-ai-guide.md`
- **AI Core management**: `references/ai-core-api-guide.md`
- **Agentic workflows**: `references/agentic-workflows.md`
- **Connection options**: `references/connecting-to-ai-core.md`
- **Error handling**: `references/error-handling.md`
- **V1 to V2 migration**: `references/v1-to-v2-migration.md`

## Version Information

| SDK | Current Version | Node/Java Requirement |
|-----|-----------------|----------------------|
| JavaScript | 1.18.0+ | Node.js 20+ |
| Java | 1.13.0 | Java 17+ (21 LTS recommended) |

**Note**: Generated model classes (in `...model` packages) may change in minor releases but are safe to use.

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Could not find service bindings for 'aicore'" | Missing AI Core binding | Bind AI Core service or set AICORE_SERVICE_KEY |
| "Orchestration deployment not found" | No deployment in resource group | Deploy orchestration in AI Core or use different resource group |
| Content filter violation | Input/output blocked | Adjust filter thresholds or modify content |
| Token limit exceeded | Response too long | Set max_tokens parameter |

## Documentation Sources

Keep this skill updated using these sources:
- **JS Docs**: https://github.com/SAP/ai-sdk/tree/main/docs-js
- **Java Docs**: https://github.com/SAP/ai-sdk/tree/main/docs-java
- **JS SDK**: https://github.com/SAP/ai-sdk-js
- **Java SDK**: https://github.com/SAP/ai-sdk-java
- **Release Notes**: Check docs-js/release-notes.mdx and docs-java/release-notes.mdx
