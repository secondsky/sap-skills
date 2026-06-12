# Orchestration Service Guide

The Orchestration Service provides a unified API for combining LLM calls with
pre/post-processing modules: prompt templating, content filtering, data masking,
document grounding, and translation. This guide covers the `gen_ai_hub.orchestration_v2`
module (the current module; `gen_ai_hub.orchestration` is the legacy v1).

## Module Structure

```
gen_ai_hub.orchestration_v2/
├── OrchestrationConfig    # Pipeline configuration
├── OrchestrationService   # Client for running completions
├── models/
│   ├── config/            # ModuleConfig, PromptTemplating, Filtering, Masking, Grounding
│   ├── message/           # SystemMessage, UserMessage, AssistantMessage, ToolChatMessage
│   ├── response/          # CompletionPostResponse, StreamCompletionPostResponse
│   ├── embeddings/        # EmbeddingsOrchestrationConfig
│   ├── template/          # Template, TemplateRef
│   └── ...
└── exceptions/
```

## Core Concepts

### OrchestrationConfig

The `OrchestrationConfig` defines the pipeline. It accepts either a single
`ModuleConfig` or a list (for fallback configurations):

```python
from gen_ai_hub.orchestration_v2 import OrchestrationConfig, ModuleConfig

config = OrchestrationConfig(
    modules=ModuleConfig(...)  # or [ModuleConfig(...), ModuleConfig(...)]
)
```

### ModuleConfig

Each `ModuleConfig` can include:

| Field | Type | Purpose |
|-------|------|---------|
| `prompt_templating` | `PromptTemplatingModuleConfig` | Required: template + model config |
| `filtering` | `FilteringModuleConfig` | Optional: content safety filters |
| `masking` | `MaskingModuleConfig` | Optional: PII/data masking |
| `grounding` | `GroundingModuleConfig` | Optional: document grounding (RAG) |
| `translation` | `TranslationModuleConfig` | Optional: input/output translation |

## Quick Start

### Simple Chat Completion

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationConfig, OrchestrationService,
    ModuleConfig, PromptTemplatingModuleConfig,
    Template, UserMessage, LLMModelDetails
)

config = OrchestrationConfig(
    modules=ModuleConfig(
        prompt_templating=PromptTemplatingModuleConfig(
            prompt=Template(
                template=[UserMessage(role="user", content="{{?question}}")]
            ),
            model=LLMModelDetails(name="gpt-4o-mini")
        )
    )
)

service = OrchestrationService(config=config)
response = service.run(placeholder_values={"question": "What is SAP?"})
print(response.final_result.choices[0].message.content)
```

### With Conversation History

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationConfig, OrchestrationService,
    ModuleConfig, PromptTemplatingModuleConfig,
    Template, UserMessage, AssistantMessage, LLMModelDetails
)

config = OrchestrationConfig(
    modules=ModuleConfig(
        prompt_templating=PromptTemplatingModuleConfig(
            prompt=Template(
                template=[UserMessage(role="user", content="{{?question}}")]
            ),
            model=LLMModelDetails(name="gpt-4o-mini")
        )
    )
)

service = OrchestrationService(config=config)

history = [
    UserMessage(role="user", content="What is SAP BTP?"),
    AssistantMessage(role="assistant", content="SAP BTP is a platform..."),
]

response = service.run(
    placeholder_values={"question": "What services does it offer?"},
    history=history
)
```

### Streaming

```python
service = OrchestrationService(config=config)

for chunk in service.stream(placeholder_values={"question": "Explain SAP CAP."}):
    if chunk.final_result and chunk.final_result.choices:
        delta = chunk.final_result.choices[0].delta
        if delta and delta.content:
            print(delta.content, end="")
```

### Async Execution

```python
response = await service.arun(placeholder_values={"question": "What is SAP?"})

async for chunk in service.astream(placeholder_values={"question": "Explain SAP CAP."}):
    print(chunk)
```

## Prompt Templating

### Template Messages

Templates use `{{?variable}}` placeholders in message content:

```python
from gen_ai_hub.orchestration_v2 import Template, SystemMessage, UserMessage

template = Template(
    template=[
        SystemMessage(role="system", content="You are a {{?role}}."),
        UserMessage(role="user", content="{{?question}}")
    ],
    defaults={"role": "helpful assistant"}  # Optional defaults for placeholders
)
```

### Model Configuration

```python
from gen_ai_hub.orchestration_v2 import LLMModelDetails

model = LLMModelDetails(
    name="gpt-4o-mini",     # Model name in AI Core
    version="latest",        # Optional: model version
    params={                 # Optional: generation parameters
        "max_tokens": 500,
        "temperature": 0.7
    },
    timeout=60,              # Optional: request timeout in seconds
    max_retries=2            # Optional: retry count on failure
)
```

### Template References

Instead of inline templates, reference templates stored in the Prompt Registry:

```python
from gen_ai_hub.orchestration_v2 import TemplateRefByID, TemplateRefByScenarioNameVersion

# By ID
ref = TemplateRefByID(id="template-uuid-here")

# By scenario name and version
ref = TemplateRefByScenarioNameVersion(scenario_name="my-scenario", version="1")
```

### Response Format

Control the output format:

```python
from gen_ai_hub.orchestration_v2 import (
    Template, UserMessage,
    ResponseFormatText, ResponseFormatJsonObject, ResponseFormatJsonSchema
)

# Plain text (default)
template = Template(
    template=[UserMessage(role="user", content="{{?question}}")],
    response_format=ResponseFormatText(type="text")
)

# JSON object
template = Template(
    template=[UserMessage(role="user", content="{{?question}}")],
    response_format=ResponseFormatJsonObject(type="json_object")
)

# JSON schema
template = Template(
    template=[UserMessage(role="user", content="{{?question}}")],
    response_format=ResponseFormatJsonSchema(
        type="json_schema",
        json_schema=JSONResponseSchema(
            name="result",
            schema_={"type": "object", "properties": {"answer": {"type": "string"}}}
        )
    )
)
```

### Tool / Function Calling

```python
from gen_ai_hub.orchestration_v2 import FunctionTool, FunctionObject

tools = [
    FunctionTool(
        type="function",
        function=FunctionObject(
            name="get_weather",
            description="Get current weather for a city",
            parameters={
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"]
            }
        )
    )
]

template = Template(
    template=[UserMessage(role="user", content="What is the weather in Berlin?")],
    tools=tools
)
```

## Content Filtering

Apply Azure Content Safety filters to input and/or output:

```python
from gen_ai_hub.orchestration_v2 import (
    FilteringModuleConfig, InputFiltering, OutputFiltering,
    AzureContentSafetyInput, AzureContentSafetyOutput, AzureThreshold
)

filtering = FilteringModuleConfig(
    input=InputFiltering(filters=[
        AzureContentSafetyInput(
            hate=AzureThreshold.ALLOW_SAFE,
            sexual=AzureThreshold.ALLOW_SAFE,
            violence=AzureThreshold.ALLOW_SAFE,
            self_harm=AzureThreshold.ALLOW_SAFE
        )
    ]),
    output=OutputFiltering(filters=[
        AzureContentSafetyOutput(
            hate=AzureThreshold.ALLOW_SAFE,
            violence=AzureThreshold.ALLOW_SAFE
        )
    ])
)
```

### Threshold Values

Thresholds are set using the `AzureThreshold` enum or equivalent integer values:

| Enum | Int | Meaning |
|------|-----|---------|
| `AzureThreshold.ALLOW_ALL` | `0` | Allow all content (no filtering) |
| `AzureThreshold.ALLOW_SAFE` | `2` | Allow safe content only |
| `AzureThreshold.ALLOW_SAFE_LOW` | `4` | Allow safe and low-risk content |
| `AzureThreshold.ALLOW_SAFE_LOW_MEDIUM` | `6` | Allow safe, low, and medium-risk content |

```python
from gen_ai_hub.orchestration_v2 import AzureContentSafetyInput, AzureThreshold

# Using enum (recommended)
AzureContentSafetyInput(hate=AzureThreshold.ALLOW_SAFE)

# Using integer
AzureContentSafetyInput(hate=2)
```

### Llama Guard Filter

```python
from gen_ai_hub.orchestration_v2 import LlamaGuard38bFilter, LlamaGuard38bFilterConfig

filtering = FilteringModuleConfig(
    input=InputFiltering(filters=[
        LlamaGuard38bFilter(config=LlamaGuard38bFilterConfig(self_harm=True, violence=True))
    ])
)
```

## Data Masking

Anonymize or pseudonymize PII before sending to the LLM:

```python
from gen_ai_hub.orchestration_v2 import (
    MaskingModuleConfig, MaskingProviderConfig,
    DPIStandardEntity, MaskingMethod, DataMaskingProviderName
)

masking = MaskingModuleConfig(
    masking_providers=[
        MaskingProviderConfig(
            type=DataMaskingProviderName.SAP_DATA_PRIVACY_INTEGRATION,
            method=MaskingMethod.ANONYMIZATION,
            entities=[
                DPIStandardEntity(type="profile-email"),
                DPIStandardEntity(type="profile-person"),
                DPIStandardEntity(type="profile-phone")
            ]
        )
    ]
)
```

### Masking Methods

| Method | Description |
|--------|-------------|
| `ANONYMIZATION` | Replace PII with generic placeholders |
| `PSEUDONYMIZATION` | Replace PII with consistent pseudonyms (same input → same output) |

### Standard Entity Types

Common entity types for `DPIStandardEntity`:

| Type | Description |
|------|-------------|
| `profile-person` | Person names |
| `profile-email` | Email addresses |
| `profile-phone` | Phone numbers |
| `profile-address` | Physical addresses |
| `profile-org` | Organization names |
| `profile-location` | Geographic locations |
| `profile-url` | URLs |
| `profile-ssn` | Social security numbers |
| `profile-iban` | IBAN numbers |
| `profile-credit-card-number` | Credit card numbers |
| `profile-passport` | Passport numbers |
| `profile-nationalid` | National IDs |
| `profile-username-password` | Usernames and passwords |

### Custom Entities

```python
from gen_ai_hub.orchestration_v2 import DPICustomEntity

entities = [
    DPICustomEntity(regex=r"\b\d{3}-\d{2}-\d{4}\b")
]
```

## Document Grounding

Ground LLM responses in your data via vector repositories or other data sources:

```python
from gen_ai_hub.orchestration_v2 import (
    GroundingModuleConfig, DocumentGroundingConfig,
    DocumentGroundingFilter, DocumentGroundingPlaceholders,
    GroundingSearchConfig, DataRepositoryType, GroundingType
)

grounding = GroundingModuleConfig(
    type=GroundingType.DOCUMENT_GROUNDING_SERVICE,
    config=DocumentGroundingConfig(
        placeholders=DocumentGroundingPlaceholders(
            input=["{{?question}}"],
            output="{{?context}}"
        ),
        filters=[
            DocumentGroundingFilter(
                id="my-vector-repo-id",
                data_repository_type=DataRepositoryType.VECTOR,
                search_config=GroundingSearchConfig(
                    max_chunk_count=5,
                    max_document_count=3
                )
            )
        ]
    )
)
```

### Data Repository Types

| Type | Description |
|------|-------------|
| `VECTOR` | Vector-based similarity search |
| `URL` | URL-based document retrieval |

## Embeddings via Orchestration

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationService,
    EmbeddingsOrchestrationConfig, EmbeddingsModuleConfigs,
    EmbeddingsModelConfig, EmbeddingsModelDetails,
    EmbeddingsInput, EmbeddingsInputType
)

embed_config = EmbeddingsOrchestrationConfig(
    modules=EmbeddingsModuleConfigs(
        model=EmbeddingsModelConfig(
            model=EmbeddingsModelDetails(name="text-embedding-3-small")
        )
    )
)

service = OrchestrationService()
response = service.embed(
    config=embed_config,
    input=EmbeddingsInput(input="Text to embed", input_type=EmbeddingsInputType.query)
)
print(response.data[0].embedding)
```

## Fallback Configurations

Provide multiple module configs; the service tries each in order until one succeeds:

```python
config = OrchestrationConfig(
    modules=[
        ModuleConfig(
            prompt_templating=PromptTemplatingModuleConfig(
                prompt=Template(template=[UserMessage(role="user", content="{{?q}}")]),
                model=LLMModelDetails(name="gpt-4o")
            )
        ),
        ModuleConfig(
            prompt_templating=PromptTemplatingModuleConfig(
                prompt=Template(template=[UserMessage(role="user", content="{{?q}}")]),
                model=LLMModelDetails(name="gpt-4o-mini")
            )
        )
    ]
)
```

## Configuration References

Store orchestration configs in the Prompt Registry and reference them by ID or name:

```python
from gen_ai_hub.orchestration_v2 import OrchestrationService

service = OrchestrationService(
    config_ref=CompletionRequestConfigurationReferenceByIdConfigRef(
        config_id="my-config-id"
    )
)
response = service.run(placeholder_values={"question": "Hello"})
```

## Response Structure

### CompletionPostResponse

```python
response.request_id              # Unique request ID
response.final_result            # LLMModuleResult
response.final_result.choices    # List[LLMChoice]
response.final_result.choices[0].message.content  # Model output
response.final_result.choices[0].finish_reason     # "stop", "length", etc.
response.final_result.model      # Model name used
response.final_result.usage      # TokenUsage (prompt_tokens, completion_tokens, total_tokens)
response.intermediate_results    # ModuleResults from all pipeline stages
response.intermediate_failures   # Errors from failed modules (if any)
```

### Streaming Response

```python
for chunk in service.stream(placeholder_values={"question": "..."}):
    chunk.final_result  # StreamLLMModuleResult with delta content
    chunk.final_result.choices[0].delta.content  # Incremental text
```

## Retries

```python
response = service.run_with_retries(
    placeholder_values={"question": "What is SAP?"},
    max_retries=5,
    base_delay=2.0  # Seconds between retries (exponential backoff)
)
```

## Full Pipeline Example

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationConfig, OrchestrationService, ModuleConfig,
    PromptTemplatingModuleConfig, Template, SystemMessage, UserMessage,
    LLMModelDetails, FilteringModuleConfig, InputFiltering, OutputFiltering,
    AzureContentSafetyInput, AzureContentSafetyOutput, AzureThreshold,
    MaskingModuleConfig, MaskingProviderConfig,
    DPIStandardEntity, MaskingMethod, DataMaskingProviderName,
    GroundingModuleConfig, DocumentGroundingConfig,
    DocumentGroundingFilter, DocumentGroundingPlaceholders,
    GroundingSearchConfig, DataRepositoryType, GroundingType
)

config = OrchestrationConfig(
    modules=ModuleConfig(
        prompt_templating=PromptTemplatingModuleConfig(
            prompt=Template(template=[
                SystemMessage(role="system", content="Answer based on the provided context."),
                UserMessage(role="user", content="Context: {{?context}}\n\nQuestion: {{?question}}")
            ]),
            model=LLMModelDetails(name="gpt-4o-mini", params={"temperature": 0.3})
        ),
        filtering=FilteringModuleConfig(
            input=InputFiltering(filters=[AzureContentSafetyInput(hate=AzureThreshold.ALLOW_SAFE)]),
            output=OutputFiltering(filters=[AzureContentSafetyOutput(hate=AzureThreshold.ALLOW_SAFE)])
        ),
        masking=MaskingModuleConfig(
            masking_providers=[MaskingProviderConfig(
                type=DataMaskingProviderName.SAP_DATA_PRIVACY_INTEGRATION,
                method=MaskingMethod.ANONYMIZATION,
                entities=[DPIStandardEntity(type="profile-email"), DPIStandardEntity(type="profile-person")]
            )]
        ),
        grounding=GroundingModuleConfig(
            type=GroundingType.DOCUMENT_GROUNDING_SERVICE,
            config=DocumentGroundingConfig(
                placeholders=DocumentGroundingPlaceholders(
                    input=["{{?question}}"],
                    output="{{?context}}"
                ),
                filters=[DocumentGroundingFilter(
                    id="knowledge-base-repo",
                    data_repository_type=DataRepositoryType.VECTOR,
                    search_config=GroundingSearchConfig(max_chunk_count=5)
                )]
            )
        )
    )
)

service = OrchestrationService(config=config)
response = service.run(placeholder_values={
    "question": "What is the company travel policy?",
    "context": ""
})
print(response.final_result.choices[0].message.content)
```

## Resources

- SDK Reference: https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html
- AI Core Orchestration: https://help.sap.com/docs/sap-ai-core/orchestration
- SAP Samples: https://github.com/SAP-samples/btp-gen-ai-hub-sdk-samples
