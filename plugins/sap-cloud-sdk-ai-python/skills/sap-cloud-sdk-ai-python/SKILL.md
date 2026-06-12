---
name: sap-cloud-sdk-ai-python
description: |
  Integrates the SAP Cloud SDK for AI for Python (sap-ai-sdk-gen, formerly generative-ai-hub-sdk) into Python applications. Use when building Python apps with SAP AI Core, Generative AI Hub, or the Orchestration Service: chat completion, embeddings, streaming, LangChain integration, templating, content filtering, data masking, and document grounding. Supports OpenAI GPT models, Llama, Gemini, Amazon Nova, and other foundation models via SAP BTP.
license: GPL-3.0
metadata:
  version: "1.0.0"
  last_verified: "2026-06-12"
  sdk_package: "sap-ai-sdk-gen 6.10.0"
  documentation_source: "https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html"
---

# SAP Cloud SDK for AI (Python)

> **Package rename**: The PyPI package `generative-ai-hub-sdk` is **deprecated** (v4.12.4 is the last release).
> Its successor is **`sap-ai-sdk-gen`** (currently v6.10.0). Code and tutorials referencing
> `generative-ai-hub-sdk` should migrate to `sap-ai-sdk-gen`; the import name remains `gen_ai_hub`.

The official Python SDK for SAP Generative AI Hub and Orchestration Service. It wraps
the native SDKs of model providers (OpenAI, Amazon Bedrock, Google GenAI) and offers
a harmonised LangChain integration and a full Orchestration client — all routed through
SAP AI Core with unified authentication.

## Related Skills

- **sap-ai-core**: Platform setup, deployments, resource groups, and model management in SAP AI Core
- **sap-cloud-sdk-ai**: JavaScript/TypeScript and Java equivalents of this SDK
- **sap-hana-ml**: HANA-side machine learning in Python
- **dependency-upgrade**: Pip dependency hygiene and upgrade patterns

### Related external skills

If your task involves working inside Databricks (notebooks, Unity Catalog, Spark,
SAP Databricks in SAP Business Data Cloud), consider installing the
[Databricks agent skills plugin](https://github.com/databricks/databricks-agent-skills).
Ask whether you would like help installing it — never install unprompted.

## When to Use This Skill

Use this skill when:

- Building Python applications that call LLMs through SAP AI Core / Generative AI Hub
- Using the `gen_ai_hub` Python package (installed as `sap-ai-sdk-gen`)
- Integrating OpenAI, Amazon Bedrock, or Google GenAI models via SAP's proxy
- Implementing LangChain chains with SAP AI Core as the backend
- Using the Orchestration Service from Python (templating, filtering, masking, grounding)
- Migrating code from the deprecated `generative-ai-hub-sdk` to `sap-ai-sdk-gen`
- Generating embeddings through SAP AI Core
- Working with SAP RPT-1 (Relational Pretrained Transformer) for tabular predictions

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Authentication](#authentication)
- [Available Modules](#available-modules)
- [Supported Models](#supported-models)
- [Core Features](#core-features)
- [Bundled Resources](#bundled-resources)

## Quick Start

### Native OpenAI Chat Completion

```python
from gen_ai_hub.proxy.native.openai import chat

messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is SAP BTP?"}
]

response = chat.completions.create(
    model_name="gpt-4o-mini",
    messages=messages
)
print(response.choices[0].message.content)
```

### Orchestration Service

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

## Installation

```bash
# All providers + LangChain support
pip install "sap-ai-sdk-gen[all]"

# Default (OpenAI only, no LangChain)
pip install sap-ai-sdk-gen

# Specific providers (without LangChain)
pip install "sap-ai-sdk-gen[google, amazon]"
```

## Authentication

The SDK reads credentials via `AICoreV2Client.from_env()`, which resolves
credentials in this order:

1. **Keyword arguments** passed to `GenAIHubProxyClient(...)`
2. **Environment variables** — `AICORE_CLIENT_ID`, `AICORE_CLIENT_SECRET`,
   `AICORE_AUTH_URL`, `AICORE_BASE_URL`, `AICORE_RESOURCE_GROUP`
3. **Config file** — `$AICORE_HOME/config.json` (or path set by `AICORE_CONFIG`);
   use `AICORE_PROFILE` to select a named profile
4. **VCAP_SERVICES** — automatic on Cloud Foundry/Kyma when the AI Core service is bound

### Local Development (Environment Variables)

```bash
export AICORE_CLIENT_ID="sb-..."
export AICORE_CLIENT_SECRET="..."
export AICORE_AUTH_URL="https://<tenant>.authentication.sap.hana.ondemand.com/oauth/token"
export AICORE_BASE_URL="https://api.ai.prod.eu-central-1.aws.ml.hana.ondemand.com/v2"
export AICORE_RESOURCE_GROUP="default"
```

### Config File Profile

```bash
# ~/.aicore/config.json
{
  "AICORE_CLIENT_ID": "sb-...",
  "AICORE_CLIENT_SECRET": "...",
  "AICORE_AUTH_URL": "https://<tenant>.authentication.sap.hana.ondemand.com/oauth/token",
  "AICORE_BASE_URL": "https://api.ai.prod.eu-central-1.aws.ml.hana.ondemand.com/v2",
  "AICORE_RESOURCE_GROUP": "default"
}
```

For detailed auth setup and troubleshooting, see `references/getting-started-auth.md`.

## Available Modules

| Module | Import Path | Purpose |
|--------|-------------|---------|
| Proxy (native clients) | `gen_ai_hub.proxy.native.*` | Direct model access per provider |
| LangChain integration | `gen_ai_hub.proxy.langchain` | `init_llm`, `init_embedding_model`, `ChatOpenAI`, etc. |
| Orchestration | `gen_ai_hub.orchestration_v2` | Templating, filtering, masking, grounding |
| Document Grounding | `gen_ai_hub.document_grounding` | Pipeline, Vector, Retrieval APIs |
| Prompt Registry | `gen_ai_hub.prompt_registry` | Template management and config storage |
| Evaluations | `gen_ai_hub.evaluations` | Model evaluation runs and metrics |
| SAP RPT-1 | `gen_ai_hub.proxy.native.sap` | Tabular prediction (classification, regression) |

### Native Clients by Provider

| Provider | Import | Key Classes |
|----------|--------|-------------|
| OpenAI | `gen_ai_hub.proxy.native.openai` | `OpenAI`, `completions`, `chat`, `embeddings`, `responses` |
| Amazon Bedrock | `gen_ai_hub.proxy.native.amazon` | `Session`, `ClientWrapper` |
| Google GenAI | `gen_ai_hub.proxy.native.google_genai` | `Client` |
| SAP RPT-1 | `gen_ai_hub.proxy.native.sap` | `RPTClient`, `RPTRequest` |

## Supported Models

The Generative AI Hub catalog includes models from multiple providers. Check
[SAP's model catalog](https://help.sap.com/docs/sap-ai-core/generative-ai-hub/available-models)
for the authoritative list. Notable families:

| Provider | Models |
|----------|--------|
| OpenAI | gpt-4o, gpt-4o-mini, gpt-5, gpt-5-nano, o1, o3-mini |
| Anthropic (via Bedrock) | Claude 4 Sonnet, Claude 3.5 Sonnet |
| Amazon | Nova Pro, Nova Lite, Nova Micro, Nova Premier |
| Google | Gemini 2.5 Flash, Gemini 2.0 Flash |
| Mistral | Medium, Large, Small |
| SAP | RPT-1 (tabular predictions) |

## Core Features

### Chat Completion with OpenAI Client

```python
from gen_ai_hub.proxy.native.openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Explain CAP in one paragraph."}]
)
print(response.choices[0].message.content)
```

### Streaming

```python
from gen_ai_hub.proxy.native.openai import OpenAI

client = OpenAI()
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Explain SAP CAP."}],
    stream=True
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Embeddings

```python
from gen_ai_hub.proxy.native.openai import embeddings

response = embeddings.create(
    input="Every decoding is another encoding.",
    model_name="text-embedding-3-small"
)
print(response.data[0].embedding)
```

### LangChain Integration

```python
from gen_ai_hub.proxy.langchain import init_llm, init_embedding_model

llm = init_llm("gpt-4o-mini", max_tokens=300)
result = llm.invoke("What is SAP BTP?")
print(result.content)

embeddings = init_embedding_model("text-embedding-3-small")
vector = embeddings.embed_query("SAP Business Technology Platform")
```

### Content Filtering (via Orchestration)

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationConfig, OrchestrationService,
    ModuleConfig, PromptTemplatingModuleConfig,
    Template, UserMessage, LLMModelDetails,
    FilteringModuleConfig, InputFiltering, OutputFiltering,
    AzureContentSafetyInput, AzureContentSafetyOutput, AzureThreshold
)

config = OrchestrationConfig(
    modules=ModuleConfig(
        prompt_templating=PromptTemplatingModuleConfig(
            prompt=Template(template=[UserMessage(role="user", content="{{?question}}")]),
            model=LLMModelDetails(name="gpt-4o-mini")
        ),
        filtering=FilteringModuleConfig(
            input=InputFiltering(filters=[
                AzureContentSafetyInput(hate=AzureThreshold.ALLOW_SAFE, violence=AzureThreshold.ALLOW_SAFE)
            ]),
            output=OutputFiltering(filters=[
                AzureContentSafetyOutput(hate=AzureThreshold.ALLOW_SAFE, violence=AzureThreshold.ALLOW_SAFE)
            ])
        )
    )
)

service = OrchestrationService(config=config)
response = service.run(placeholder_values={"question": "Explain SAP."})
```

### Data Masking (via Orchestration)

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationConfig, OrchestrationService,
    ModuleConfig, PromptTemplatingModuleConfig,
    Template, UserMessage, LLMModelDetails,
    MaskingModuleConfig, MaskingProviderConfig,
    DPIStandardEntity, MaskingMethod, DataMaskingProviderName
)

config = OrchestrationConfig(
    modules=ModuleConfig(
        prompt_templating=PromptTemplatingModuleConfig(
            prompt=Template(template=[UserMessage(role="user", content="{{?text}}")]),
            model=LLMModelDetails(name="gpt-4o-mini")
        ),
        masking=MaskingModuleConfig(
            masking_providers=[
                MaskingProviderConfig(
                    type=DataMaskingProviderName.SAP_DATA_PRIVACY_INTEGRATION,
                    method=MaskingMethod.ANONYMIZATION,
                    entities=[
                        DPIStandardEntity(type="profile-email"),
                        DPIStandardEntity(type="profile-person")
                    ]
                )
            ]
        )
    )
)

service = OrchestrationService(config=config)
response = service.run(placeholder_values={"text": "Contact john@example.com for details."})
```

### Document Grounding (via Orchestration)

```python
from gen_ai_hub.orchestration_v2 import (
    OrchestrationConfig, OrchestrationService,
    ModuleConfig, PromptTemplatingModuleConfig,
    Template, UserMessage, LLMModelDetails,
    GroundingModuleConfig, DocumentGroundingConfig,
    DocumentGroundingFilter, DocumentGroundingPlaceholders,
    GroundingSearchConfig, DataRepositoryType, GroundingType
)

config = OrchestrationConfig(
    modules=ModuleConfig(
        prompt_templating=PromptTemplatingModuleConfig(
            prompt=Template(template=[UserMessage(role="user", content="{{?question}}")]),
            model=LLMModelDetails(name="gpt-4o-mini")
        ),
        grounding=GroundingModuleConfig(
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
                        search_config=GroundingSearchConfig(max_chunk_count=5)
                    )
                ]
            )
        )
    )
)

service = OrchestrationService(config=config)
response = service.run(placeholder_values={"question": "What is the refund policy?"})
```

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `No credentials found in any source` | Missing AI Core service key/env vars | Set all `AICORE_*` environment variables or create a config file profile |
| `No deployment found` | Model not deployed in AI Core | Deploy the model in your resource group, or use `deployment_id` directly |
| `AICORE_RESOURCE_GROUP not set` | Missing resource group | Set `AICORE_RESOURCE_GROUP` env var or pass `resource_group` to the client |
| `ModuleNotFoundError: No module named 'gen_ai_hub'` | Wrong package installed | Install `sap-ai-sdk-gen` (not `generative-ai-hub-sdk`) |
| Import from `generative_ai_hub_sdk` fails | Using deprecated package name | The package was renamed; import from `gen_ai_hub` (installed via `sap-ai-sdk-gen`) |
| `ValidationError` on proxy client init | Incomplete credentials | Verify all four required env vars: `AICORE_CLIENT_ID`, `AICORE_CLIENT_SECRET`, `AICORE_AUTH_URL`, `AICORE_BASE_URL` |

## Bundled Resources

### Reference Documentation

1. `references/getting-started-auth.md` - Installation, authentication, and config setup
2. `references/native-clients-guide.md` - Native client usage for OpenAI, Amazon, Google, and SAP RPT-1
3. `references/orchestration-guide.md` - Orchestration service: templating, filtering, masking, grounding, embeddings
4. `references/langchain-guide.md` - LangChain integration: LLM/embedding init, chains, structured outputs
5. `references/troubleshooting.md` - Common errors, version compatibility, migration from `generative-ai-hub-sdk`

## Documentation Sources

Keep this skill updated using these sources:

- **PyPI**: https://pypi.org/pypi/sap-ai-sdk-gen/json — package metadata and README
- **SDK Reference**: https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html
- **SAP Samples**: https://github.com/SAP-samples/btp-gen-ai-hub-sdk-samples
- **AI Core Help**: https://help.sap.com/docs/sap-ai-core
- **Deprecated Package**: https://pypi.org/pypi/generative-ai-hub-sdk/json (for migration notes)
