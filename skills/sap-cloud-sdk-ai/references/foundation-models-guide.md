# Foundation Models Guide

Direct access to OpenAI models via SAP AI Core without orchestration layer.

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [JavaScript Client](#javascript-client)
4. [Java Client](#java-client)
5. [Chat Completion](#chat-completion)
6. [Streaming](#streaming)
7. [Function Calling](#function-calling)
8. [Embedding](#embedding)
9. [Model Versioning](#model-versioning)
10. [Custom Configuration](#custom-configuration)

---

## Overview

The Foundation Models package provides direct access to Azure OpenAI models deployed on SAP AI Core. Use this when you need:
- Direct model access without orchestration features
- Specific OpenAI API compatibility
- Lower latency (no orchestration overhead)

**When to use Orchestration instead:**
- Need content filtering, data masking, or grounding
- Want harmonized API across multiple model providers
- Need prompt templating or translation

---

## Installation

### JavaScript/TypeScript

```bash
npm install @sap-ai-sdk/foundation-models
```

### Java (Maven)

```xml
<dependency>
  <groupId>com.sap.ai.sdk.foundationmodels</groupId>
  <artifactId>openai</artifactId>
  <version>${ai-sdk.version}</version>
</dependency>
```

---

## JavaScript Client

### Client Initialization

```typescript
import { AzureOpenAiChatClient } from '@sap-ai-sdk/foundation-models';

// Basic initialization
const client = new AzureOpenAiChatClient('gpt-4o');

// With model version
const client = new AzureOpenAiChatClient({
  modelName: 'gpt-4o',
  modelVersion: '2024-05-13'
});

// With resource group
const client = new AzureOpenAiChatClient({
  modelName: 'gpt-4o',
  resourceGroup: 'my-resource-group'
});

// With deployment ID (bypasses model lookup)
const client = new AzureOpenAiChatClient({
  deploymentId: 'd1234567'
});
```

### API Version

The client uses Azure OpenAI API version `2024-10-21` by default. Override via `CustomRequestConfig`:

```typescript
const response = await client.run(
  { messages: [...] },
  {
    params: { 'api-version': '2024-08-01-preview' }
  }
);
```

### Available Clients

| Client | Purpose |
|--------|---------|
| `AzureOpenAiChatClient` | Chat completions |
| `AzureOpenAiEmbeddingClient` | Text embeddings |

---

## Java Client

### Client Initialization

```java
import com.sap.ai.sdk.foundationmodels.openai.*;

// Basic initialization
var client = OpenAiClient.forModel(OpenAiModel.GPT_4O);

// With system prompt
var client = OpenAiClient.forModel(OpenAiModel.GPT_4O)
    .withSystemPrompt("You are a helpful assistant");

// With custom resource group
var destination = new AiCoreService()
    .getInferenceDestination("my-resource-group");
var client = OpenAiClient.forModel(OpenAiModel.GPT_4O)
    .withDestination(destination);
```

### Version History

| Version | Features |
|---------|----------|
| v1.8.0+ | Tool calling with `OpenAiTool` |
| v1.4.0+ | New interface with `OpenAiChatCompletionRequest`, `OpenAiMessage` |
| v1.0.0 | Deprecated interface (still available) |

### v1.4.0+ Interface (Recommended)

```java
// Using new interface
var request = OpenAiChatCompletionRequest.create()
    .addMessage(OpenAiMessage.system("You are helpful"))
    .addMessage(OpenAiMessage.user("What is SAP?"));

var response = client.chatCompletion(request);
String content = response.getContent();
```

### v1.0.0 Interface (Deprecated)

```java
// Legacy interface - avoid for new code
var params = new OpenAiChatCompletionParameters()
    .addMessages(new OpenAiChatSystemMessage().setContent("System prompt"))
    .addMessages(new OpenAiChatUserMessage().setContent("User message"));

var response = client.chatCompletion(params);
```

---

## Chat Completion

### JavaScript

```typescript
// Basic request
const response = await client.run({
  messages: [
    { role: 'user', content: 'What is SAP CAP?' }
  ]
});

console.log(response.getContent());

// With parameters
const response = await client.run({
  messages: [
    { role: 'system', content: 'You are a helpful assistant' },
    { role: 'user', content: 'Explain briefly' }
  ],
  max_tokens: 500,
  temperature: 0.7
});

// Token usage
const usage = response.getTokenUsage();
console.log('Prompt tokens:', usage.prompt_tokens);
console.log('Completion tokens:', usage.completion_tokens);
console.log('Total tokens:', usage.total_tokens);
```

### Java

```java
// Simple request
var response = client.chatCompletion("What is SAP CAP?");
System.out.println(response.getContent());

// With message history
var request = OpenAiChatCompletionRequest.create()
    .addMessage(OpenAiMessage.system("You are a SAP expert"))
    .addMessage(OpenAiMessage.user("What is CAP?"))
    .addMessage(OpenAiMessage.assistant("CAP is..."))
    .addMessage(OpenAiMessage.user("Tell me more"));

var response = client.chatCompletion(request);
```

---

## Streaming

### JavaScript

```typescript
// Basic streaming
const stream = client.stream({
  messages: [{ role: 'user', content: 'Explain SAP in detail' }]
});

for await (const chunk of stream.toContentStream()) {
  process.stdout.write(chunk);
}

// Get metadata after streaming
console.log('Finish reason:', stream.getFinishReason());
console.log('Token usage:', stream.getTokenUsage());

// With abort controller
const controller = new AbortController();
const stream = client.stream(config, controller.signal);

setTimeout(() => controller.abort(), 5000);

try {
  for await (const chunk of stream.toContentStream()) {
    process.stdout.write(chunk);
  }
} catch (e) {
  if (e.name === 'AbortError') {
    console.log('Stream cancelled');
  }
}
```

### Java

```java
// Blocking stream
client.streamChatCompletion("Explain SAP")
    .forEach(chunk -> System.out.print(chunk.getDeltaContent()));

// Non-blocking with deltas (v1.4.0+)
client.streamChatCompletionDeltas(request)
    .forEach(delta -> {
        if (delta.getDeltaContent() != null) {
            System.out.print(delta.getDeltaContent());
        }
    });

// With AtomicReference for result collection
AtomicReference<String> result = new AtomicReference<>("");
client.streamChatCompletion("Query")
    .forEach(chunk -> result.updateAndGet(s -> s + chunk.getDeltaContent()));

System.out.println("Full response: " + result.get());
```

---

## Function Calling

### JavaScript

```typescript
const tools = [{
  type: 'function',
  function: {
    name: 'get_weather',
    description: 'Get weather for a location',
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string' },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] }
      },
      required: ['location']
    },
    strict: true  // Enforce schema compliance
  }
}];

const response = await client.run({
  messages: [{ role: 'user', content: 'Weather in Berlin?' }],
  tools
});

const toolCalls = response.getToolCalls();
if (toolCalls?.length) {
  for (const call of toolCalls) {
    const { name, arguments: args } = call.function;
    const parsedArgs = JSON.parse(args);

    // Execute function
    const result = await executeWeatherLookup(parsedArgs.location);

    // Continue conversation with result
    const followUp = await client.run({
      messages: [
        { role: 'user', content: 'Weather in Berlin?' },
        response.getAssistantMessage(),
        { role: 'tool', tool_call_id: call.id, content: result }
      ],
      tools
    });
  }
}
```

### Java (v1.8.0+)

```java
// Define tool
var weatherTool = OpenAiTool.builder()
    .function(OpenAiFunction.builder()
        .name("get_weather")
        .description("Get weather for a location")
        .parameters(Map.of(
            "type", "object",
            "properties", Map.of(
                "location", Map.of("type", "string"),
                "unit", Map.of("type", "string", "enum", List.of("celsius", "fahrenheit"))
            ),
            "required", List.of("location")
        ))
        .build())
    .build();

// Request with tools
var request = OpenAiChatCompletionRequest.create()
    .addMessage(OpenAiMessage.user("Weather in Berlin?"))
    .withTools(List.of(weatherTool));

var response = client.chatCompletion(request);
var toolCalls = response.getToolCalls();

// Process tool calls
if (toolCalls != null && !toolCalls.isEmpty()) {
    for (var call : toolCalls) {
        String functionName = call.getFunction().getName();
        String arguments = call.getFunction().getArguments();
        // Execute and continue...
    }
}
```

---

## Embedding

### JavaScript

```typescript
import { AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/foundation-models';

const client = new AzureOpenAiEmbeddingClient('text-embedding-3-small');

// Single embedding
const response = await client.run({
  input: 'SAP is an enterprise software company'
});
const embedding = response.getEmbedding();
console.log('Dimensions:', embedding.length);

// Batch embeddings
const response = await client.run({
  input: ['First text', 'Second text', 'Third text']
});
const embeddings = response.getEmbeddings();
```

### Java

```java
// v1.4.0+ interface
var client = OpenAiClient.forModel(OpenAiModel.TEXT_EMBEDDING_3_SMALL);

var request = OpenAiEmbeddingRequest.create()
    .addInput("SAP is an enterprise software company");

var response = client.embedding(request);
float[] embedding = response.getEmbeddings().get(0);
```

---

## Model Versioning

### JavaScript

```typescript
// Specify version at initialization
const client = new AzureOpenAiChatClient({
  modelName: 'gpt-4o',
  modelVersion: '2024-05-13'
});
```

### Java

```java
// Using withVersion()
var model = OpenAiModel.GPT_4O.withVersion("2024-05-13");
var client = OpenAiClient.forModel(model);

// Custom model
var customModel = new OpenAiModel("gpt-4o-custom", "2024-05-13");
var client = OpenAiClient.forModel(customModel);
```

### Available Models

| Model Constant | Description |
|----------------|-------------|
| `GPT_4O` | GPT-4o latest |
| `GPT_4O_MINI` | GPT-4o mini |
| `TEXT_EMBEDDING_3_SMALL` | Small embedding model |
| `TEXT_EMBEDDING_3_LARGE` | Large embedding model |

---

## Custom Configuration

### Custom Headers

```java
// Java
var response = client.withHeader("X-Custom-Header", "value")
    .chatCompletion("Query");
```

### Custom Destination

```typescript
// JavaScript
const client = new AzureOpenAiChatClient({
  modelName: 'gpt-4o',
  destinationName: 'my-aicore-destination',
  useCache: false  // Disable destination caching
});
```

```java
// Java
var destination = DestinationAccessor.getDestination("my-aicore-destination").asHttp();
var client = OpenAiClient.forModel(OpenAiModel.GPT_4O)
    .withDestination(destination);
```

### Response Format (JSON Schema)

```typescript
// JavaScript
const response = await client.run({
  messages: [...],
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'response_schema',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          answer: { type: 'string' },
          confidence: { type: 'number' }
        },
        required: ['answer', 'confidence']
      }
    }
  }
});
```

---

## Important Notes

1. **Deployment Cache**: Deployment information (ID, model name, version) is cached for 5 minutes by default
2. **API Version**: Default is `2024-10-21`, can be overridden
3. **Generated Classes**: Model classes in `...model` packages may change in minor releases
4. **No Filtering**: Foundation models don't include content filtering - use Orchestration if needed

---

## Documentation Links

- JS Foundation Models: https://github.com/SAP/ai-sdk/tree/main/docs-js/foundation-models
- Java Foundation Models: https://github.com/SAP/ai-sdk/tree/main/docs-java/foundation-models
