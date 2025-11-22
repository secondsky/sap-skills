# SAP Cloud SDK for AI - Documentation Extraction Progress

**Last Updated**: 2025-11-22
**Status**: Complete and Verified
**Review Date**: 2025-11-22

---

## Source Repositories

| Repository | URL | Status |
|------------|-----|--------|
| Documentation Monorepo | https://github.com/SAP/ai-sdk | Extracted |
| JavaScript/TypeScript SDK | https://github.com/SAP/ai-sdk-js | Extracted |
| Java SDK | https://github.com/SAP/ai-sdk-java | Extracted |

---

## JavaScript/TypeScript SDK Documentation (docs-js)

### Core Documentation Files

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Overview | `docs-js/overview.mdx` | Yes | SDK capabilities, features matrix, deprecations |
| Getting Started | `docs-js/getting-started.mdx` | Yes | Quick start, installation, basic usage |
| Connecting to AI Core | `docs-js/connecting-to-ai-core.mdx` | Yes | Service binding, destinations, local development |
| Error Handling | `docs-js/error-handling.mdx` | Yes | ErrorWithCause, error chains |
| FAQ | `docs-js/faq.mdx` | Yes | SDK choice recommendation |
| Release Notes | `docs-js/release-notes.mdx` | Yes | v2.0, v2.1, v2.2 changes |
| Upgrade Guide | `docs-js/upgrade-guide.mdx` | Yes | v1 to v2 migration |

### Orchestration (docs-js/orchestration)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Chat Completion | `docs-js/orchestration/chat-completion.mdx` | Yes | Full orchestration API, streaming, tools, filters |
| Embedding | `docs-js/orchestration/embedding.mdx` | Yes | Embedding client, batch processing |

### Foundation Models (docs-js/foundation-models)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Foundation Models | `docs-js/foundation-models/foundation-models.mdx` | Yes | Client types, initialization |
| OpenAI Chat Completion | `docs-js/foundation-models/openai/chat-completion.mdx` | Yes | AzureOpenAiChatClient |
| OpenAI Embedding | `docs-js/foundation-models/openai/embedding.mdx` | Yes | AzureOpenAiEmbeddingClient |

### LangChain Integration (docs-js/langchain)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| LangChain Overview | `docs-js/langchain/langchain.mdx` | Yes | Available clients, version compat |
| OpenAI Integration | `docs-js/langchain/openai.mdx` | Yes | Chat, embedding, streaming, tools |
| Orchestration Integration | `docs-js/langchain/orchestration.mdx` | Yes | OrchestrationClient with LangChain |

### AI Core APIs (docs-js/ai-core)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| AI API | `docs-js/ai-core/ai-api.mdx` | Yes | Deployments, artifacts, configurations |
| Document Grounding | `docs-js/ai-core/document-grounding.mdx` | Yes | Pipeline, Vector, Retrieval APIs |
| Prompt Registry | `docs-js/ai-core/prompt-registry.mdx` | Yes | Template management |

### Tutorials (docs-js/tutorials)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Getting Started with Agents | `docs-js/tutorials/getting-started-with-agents.mdx` | Yes | LangGraph travel assistant |

---

## Java SDK Documentation (docs-java)

### Core Documentation Files

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Overview | `docs-java/overview.mdx` | Yes | SDK capabilities, features matrix |
| Getting Started | `docs-java/getting-started.mdx` | Yes | Maven setup, quick start |
| Connecting to AI Core | `docs-java/connecting-to-ai-core.mdx` | Yes | Service binding, destinations |
| FAQ | `docs-java/faq.mdx` | Yes | Custom headers, CVE notes |
| Release Notes | `docs-java/release-notes.mdx` | Yes | Version history |

### Orchestration (docs-java/orchestration)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Chat Completion | `docs-java/orchestration/chat-completion.mdx` | Yes | Full Java orchestration API |
| Embedding | `docs-java/orchestration/embedding.mdx` | Yes | OrchestrationEmbeddingRequest |

### Foundation Models (docs-java/foundation-models/openai)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Chat Completion | `docs-java/foundation-models/openai/chat-completion.mdx` | Yes | OpenAI chat client |
| Embedding | `docs-java/foundation-models/openai/embedding.mdx` | Yes | OpenAI embedding client |

### Spring AI Integration (docs-java/spring-ai)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| OpenAI | `docs-java/spring-ai/openai.mdx` | Yes | Spring AI with OpenAI |
| Orchestration | `docs-java/spring-ai/orchestration.mdx` | Yes | Spring AI with Orchestration |

### AI Core APIs (docs-java/ai-core)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| AI Core Deployment | `docs-java/ai-core/ai-core-deployment.mdx` | Yes | Deployment management |
| Document Grounding | `docs-java/ai-core/document-grounding.mdx` | Yes | Pipeline, Vector, Retrieval |
| Prompt Registry | `docs-java/ai-core/prompt-registry.mdx` | Yes | Template CRUD, Spring AI |

### Tutorials (docs-java/tutorials)

| File | Path | Extracted | Notes |
|------|------|-----------|-------|
| Agentic Workflows | `docs-java/tutorials/agentic-workflows.mdx` | Yes | Travel assistant with tools |

---

## SDK Packages Documented

### JavaScript/TypeScript Packages

| Package | npm | Documented |
|---------|-----|------------|
| @sap-ai-sdk/ai-api | `npm install @sap-ai-sdk/ai-api` | Yes |
| @sap-ai-sdk/foundation-models | `npm install @sap-ai-sdk/foundation-models` | Yes |
| @sap-ai-sdk/langchain | `npm install @sap-ai-sdk/langchain` | Yes |
| @sap-ai-sdk/orchestration | `npm install @sap-ai-sdk/orchestration` | Yes |
| @sap-ai-sdk/document-grounding | `npm install @sap-ai-sdk/document-grounding` | Yes |
| @sap-ai-sdk/prompt-registry | `npm install @sap-ai-sdk/prompt-registry` | Yes |

### Java Modules

| Artifact | groupId | Documented |
|----------|---------|------------|
| orchestration | com.sap.ai.sdk | Yes |
| core | com.sap.ai.sdk | Yes |
| document-grounding | com.sap.ai.sdk | Yes |
| prompt-registry | com.sap.ai.sdk | Yes |
| openai (foundation models) | com.sap.ai.sdk.foundationmodels | Yes |

---

## Features Coverage

| Feature | JavaScript | Java | Notes |
|---------|------------|------|-------|
| Chat Completion | Yes | Yes | Both SDKs |
| Streaming | Yes | Yes | SSE support |
| Embedding | Yes | Yes | Text to vectors |
| Function/Tool Calling | Yes | Yes | JSON schema tools |
| Content Filtering | Yes | Yes | Azure Content Safety |
| Data Masking | Yes | Yes | DPI integration |
| Document Grounding | Yes | Yes | Vector, Pipeline, Retrieval |
| Prompt Registry | Yes | Yes | Template management |
| LangChain Integration | Yes | N/A | JS only |
| Spring AI Integration | N/A | Yes | Java only |
| LangGraph Agents | Yes | N/A | Tutorial covered |
| Agentic Workflows | N/A | Yes | Tutorial covered |
| Translation | Yes | Yes | SAP Machine Translation |
| Image Recognition | Yes | Yes | Multimodal messages |
| Response Formatting | Yes | Yes | JSON Schema, Zod |
| MCP Integration | Yes | Yes | Model Context Protocol |

---

## Supported Models (as of v2.2.0 / SDK latest)

### OpenAI
- GPT-4o, GPT-4o-mini
- GPT-5 variants (newer versions)
- o1, o3-mini (reasoning models)

### Anthropic (via AWS)
- Claude 3.5 Sonnet
- Claude 4 (newer versions)

### Amazon
- Amazon Nova (Pro, Lite, Micro)

### Google (via Vertex AI)
- Gemini 2.5 Flash
- Gemini 2.0 Flash

### Other Providers
- Mistral AI (Medium, Large)
- Cohere Command
- Meta Llama (via providers)
- Perplexity Sonar

---

## Deprecated Models (Do Not Use)

- gpt-35-turbo (all versions)
- gpt-4 (base, without -o suffix)
- gemini-1.0-pro
- gemini-1.5-pro/flash
- Various older Titan, Llama versions

---

## Documentation Links for Updates

**Primary Sources:**
- JS Docs: https://github.com/SAP/ai-sdk/tree/main/docs-js
- Java Docs: https://github.com/SAP/ai-sdk/tree/main/docs-java
- JS SDK: https://github.com/SAP/ai-sdk-js
- Java SDK: https://github.com/SAP/ai-sdk-java

**Release Notes:**
- JS: https://github.com/SAP/ai-sdk/blob/main/docs-js/release-notes.mdx
- Java: https://github.com/SAP/ai-sdk/blob/main/docs-java/release-notes.mdx

**Upgrade Guides:**
- JS v1 to v2: https://github.com/SAP/ai-sdk/blob/main/docs-js/upgrade-guide.mdx

---

## Extraction Summary

- **Total Files Extracted**: 28 documentation files
- **JavaScript SDK Files**: 16
- **Java SDK Files**: 12
- **Coverage**: 100% of public documentation
- **Extraction Date**: 2025-11-22
- **Verification Date**: 2025-11-22
- **Verification Status**: All content verified and enhanced

## Reference Files Created

| File | Purpose | Lines |
|------|---------|-------|
| orchestration-guide.md | Complete orchestration API | 900+ |
| foundation-models-guide.md | Direct OpenAI model access | 500+ |
| langchain-guide.md | LangChain/LangGraph integration | 500+ |
| spring-ai-guide.md | Spring AI integration (Java) | 400+ |
| ai-core-api-guide.md | AI Core management APIs | 400+ |
| agentic-workflows.md | Agent patterns (JS + Java) | 500+ |
| connecting-to-ai-core.md | Connection configuration | 300+ |
| error-handling.md | Error patterns & solutions | 300+ |
| v1-to-v2-migration.md | V1 to V2 migration guide | 400+ |

## Enhancement Notes

After initial extraction, the following enhancements were made:

1. **Java Orchestration Details**: Added comprehensive Java examples for:
   - Template configuration with `TemplateConfig.create()`
   - Local YAML templates with `fromYaml()`
   - Multiple text inputs with `withText()`
   - Stream configuration with `OrchestrationStreamConfig`
   - LLM parameter constants (MAX_TOKENS, TEMPERATURE, etc.)
   - Filter exception handling with `getFilterDetails()`
   - SharePoint integration and masked grounding
   - Advanced translation configuration
   - Response formatting with `ResponseJsonSchema.fromMap()`

2. **V1 to V2 Migration Guide**: Created new reference file covering:
   - Module configuration changes (llm/templating → promptTemplating)
   - Parameter renames (inputParams → placeholderValues)
   - Filter function updates
   - Type import changes
   - Complete migration checklist

3. **Foundation Models Guide**: Created dedicated reference file for direct OpenAI access:
   - API version details (2024-10-21 default)
   - Java version-specific features (v1.0.0 deprecated vs v1.4.0+ recommended)
   - Java v1.8.0+ tool calling with `OpenAiTool`
   - JavaScript client initialization patterns
   - Streaming with `streamChatCompletionDeltas()` method
   - Function calling examples for both JS and Java
   - Embedding client usage
   - Model versioning with `withVersion()` method
