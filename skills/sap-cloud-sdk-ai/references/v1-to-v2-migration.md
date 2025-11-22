# V1 to V2 Migration Guide

Complete migration guide for upgrading SAP Cloud SDK for AI from version 1.x to 2.x.

## Table of Contents
1. [Overview](#overview)
2. [Dependency Update](#dependency-update)
3. [Foundation Models Changes](#foundation-models-changes)
4. [Orchestration Changes](#orchestration-changes)
5. [LangChain Changes](#langchain-changes)
6. [Type Import Changes](#type-import-changes)

---

## Overview

Version 2.0 introduces breaking changes across all packages. Key themes:
- Consolidated `promptTemplating` module (replaces separate `llm` and `templating`)
- `AbortSignal` instead of `AbortController` for streaming
- Renamed properties for consistency
- Type imports restructured

---

## Dependency Update

Update `package.json`:

```json
{
  "dependencies": {
    "@sap-ai-sdk/orchestration": "^2",
    "@sap-ai-sdk/foundation-models": "^2",
    "@sap-ai-sdk/langchain": "^2",
    "@sap-ai-sdk/ai-api": "^2",
    "@sap-ai-sdk/document-grounding": "^2",
    "@sap-ai-sdk/prompt-registry": "^2"
  }
}
```

Then reinstall:
```bash
npm install
```

---

## Foundation Models Changes

### Stream Method Parameter

**Before (v1):**
```typescript
const controller = new AbortController();
const stream = client.stream(config, controller);
// Cancel: controller.abort()
```

**After (v2):**
```typescript
const controller = new AbortController();
const stream = client.stream(config, controller.signal);
// Cancel: controller.abort()
```

### Chat Completion Request Type

**Before (v1):**
```typescript
import { AzureOpenAiCreateChatCompletionRequest } from '@sap-ai-sdk/foundation-models';

const request: AzureOpenAiCreateChatCompletionRequest = { ... };
```

**After (v2):**
```typescript
import { AzureOpenAiChatCompletionParameters } from '@sap-ai-sdk/foundation-models';

const request: AzureOpenAiChatCompletionParameters = { ... };
```

### Response Object Properties

**Before (v1):**
```typescript
const response = await client.run(config);
console.log(response.data); // Direct access
```

**After (v2):**
```typescript
const response = await client.run(config);
console.log(response.getContent());     // Use getter
console.log(response.getTokenUsage());  // Use getter
// Internal: response._data (renamed from .data)
```

### Type Imports

**Before (v1):**
```typescript
import {
  AzureOpenAiChatClient,
  SomeGeneratedType
} from '@sap-ai-sdk/foundation-models';
```

**After (v2):**
```typescript
// Public types (frequently used)
import { AzureOpenAiChatClient } from '@sap-ai-sdk/foundation-models';

// Generated types (internal)
import { SomeGeneratedType } from '@sap-ai-sdk/foundation-models/internal.js';
```

---

## Orchestration Changes

### Module Configuration (MAJOR CHANGE)

**Before (v1):**
```typescript
const client = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o',
    model_params: { max_tokens: 1000 }
  },
  templating: {
    template: [
      { role: 'system', content: 'You are helpful' },
      { role: 'user', content: '{{?question}}' }
    ]
  }
});
```

**After (v2):**
```typescript
const client = new OrchestrationClient({
  promptTemplating: {
    model: {
      name: 'gpt-4o',
      params: { max_tokens: 1000 }
    },
    prompt: [
      { role: 'system', content: 'You are helpful' },
      { role: 'user', content: '{{?question}}' }
    ]
  }
});
```

### Placeholder Values

**Before (v1):**
```typescript
const response = await client.chatCompletion({
  inputParams: { question: 'Hello' }
});
```

**After (v2):**
```typescript
const response = await client.chatCompletion({
  placeholderValues: { question: 'Hello' }
});
```

### Streaming Configuration

**Before (v1):**
```typescript
const client = new OrchestrationClient({
  llm: { model_name: 'gpt-4o' },
  stream: true
});
```

**After (v2):**
```typescript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  streamOptions: { enabled: true }
});
```

### Response Properties

**Before (v1):**
```typescript
const result = response.orchestration_result;
const modules = response.module_results;
```

**After (v2):**
```typescript
const result = response.final_result;
const modules = response.intermediate_results;
```

### Content Filter Functions

**Before (v1):**
```typescript
import { buildAzureContentFilter } from '@sap-ai-sdk/orchestration';

const filter = buildAzureContentFilter({
  Hate: 'ALLOW_SAFE',
  Violence: 'ALLOW_SAFE'
});
```

**After (v2):**
```typescript
import { buildAzureContentSafetyFilter } from '@sap-ai-sdk/orchestration';

// Input filter
const inputFilter = buildAzureContentSafetyFilter({
  type: 'input',  // Required type parameter
  hate: 'ALLOW_SAFE',     // lowercase property names
  violence: 'ALLOW_SAFE'
});

// Output filter
const outputFilter = buildAzureContentSafetyFilter({
  type: 'output',
  hate: 'ALLOW_SAFE'
});
```

### Llama Guard Filter

**Before (v1):**
```typescript
import { buildLlamaGuardFilter } from '@sap-ai-sdk/orchestration';

const filter = buildLlamaGuardFilter({
  enabledCategories: ['violent_crimes', 'hate']
});
```

**After (v2):**
```typescript
import { buildLlamaGuard38BFilter } from '@sap-ai-sdk/orchestration';

const inputFilter = buildLlamaGuard38BFilter({
  type: 'input',  // Required type parameter
  enabledCategories: ['violent_crimes', 'hate']
});

const outputFilter = buildLlamaGuard38BFilter({
  type: 'output',
  enabledCategories: ['violent_crimes']
});
```

### Translation Configuration

**Before (v1):**
```typescript
import { buildTranslationConfig } from '@sap-ai-sdk/orchestration';

const translation = buildTranslationConfig({
  inputLanguage: 'auto',
  outputLanguage: 'en'
});
```

**After (v2):**
```typescript
import { buildTranslationConfig } from '@sap-ai-sdk/orchestration';

const inputTranslation = buildTranslationConfig({
  type: 'input',  // Required type parameter
  inputLanguage: 'auto',
  targetLanguage: 'en'
});

const outputTranslation = buildTranslationConfig({
  type: 'output',
  targetLanguage: 'de'
});
```

### Grounding Configuration

**Before (v1):**
```typescript
const client = new OrchestrationClient({
  grounding: {
    input_params: ['{{?question}}'],
    output_param: '{{?context}}',
    data_repositories: [...]
  }
});
```

**After (v2):**
```typescript
const client = new OrchestrationClient({
  grounding: {
    grounding_input: ['{{?question}}'],
    grounding_output: ['{{?context}}'],
    data_repositories: [...]
  }
});
```

### Stream Method (Same as Foundation Models)

**Before (v1):**
```typescript
const stream = client.stream(config, controller);
```

**After (v2):**
```typescript
const stream = client.stream(config, { signal: controller.signal });
```

---

## LangChain Changes

### Configuration

LangChain clients follow the same changes as core orchestration:

**Before (v1):**
```typescript
import { OrchestrationClient } from '@sap-ai-sdk/langchain';

const client = new OrchestrationClient({
  llm: { model_name: 'gpt-4o' },
  templating: { template: [...] }
});
```

**After (v2):**
```typescript
import { OrchestrationClient } from '@sap-ai-sdk/langchain';

const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: [...]
  }
});
```

### Invoke with Placeholder Values

**Before (v1):**
```typescript
const response = await client.invoke(messages, {
  inputParams: { question: 'Hello' }
});
```

**After (v2):**
```typescript
const response = await client.invoke(messages, {
  placeholderValues: { question: 'Hello' }
});
```

### Response Properties

**Before (v1):**
```typescript
const moduleResults = response.module_results;
```

**After (v2):**
```typescript
const intermediateResults = response.intermediate_results;
```

---

## Type Import Changes

### Summary Table

| Package | Public Types | Internal Types |
|---------|--------------|----------------|
| @sap-ai-sdk/foundation-models | Main export | `internal.js` |
| @sap-ai-sdk/orchestration | Main export | `internal.js` |
| @sap-ai-sdk/langchain | Main export | (follows orchestration) |

### Example

```typescript
// Public (frequently used) - always available
import {
  OrchestrationClient,
  buildAzureContentSafetyFilter
} from '@sap-ai-sdk/orchestration';

// Internal (generated) - import from internal.js
import {
  SomeGeneratedType,
  AnotherGeneratedType
} from '@sap-ai-sdk/orchestration/internal.js';
```

---

## Migration Checklist

- [ ] Update all package versions to `^2`
- [ ] Replace `llm` + `templating` with `promptTemplating`
- [ ] Rename `inputParams` to `placeholderValues`
- [ ] Update stream method to use `signal` instead of controller
- [ ] Rename `orchestration_result` to `final_result`
- [ ] Rename `module_results` to `intermediate_results`
- [ ] Replace `buildAzureContentFilter` with `buildAzureContentSafetyFilter`
- [ ] Add `type` parameter to filter/translation builders
- [ ] Update property names to lowercase (Hate → hate)
- [ ] Move generated type imports to `internal.js`
- [ ] Update grounding `input_params`/`output_param` to `grounding_input`/`grounding_output`
- [ ] Test all functionality after migration

---

## Documentation Links

- Upgrade Guide: https://github.com/SAP/ai-sdk/blob/main/docs-js/upgrade-guide.mdx
- Release Notes: https://github.com/SAP/ai-sdk/blob/main/docs-js/release-notes.mdx
