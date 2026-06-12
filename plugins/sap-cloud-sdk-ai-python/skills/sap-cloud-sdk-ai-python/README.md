# SAP Cloud SDK for AI (Python)

Python SDK for SAP Generative AI Hub and Orchestration Service. Package `sap-ai-sdk-gen`
(formerly `generative-ai-hub-sdk`, now deprecated). Provides native client integrations
for OpenAI, Amazon Bedrock, Google GenAI, LangChain support, and full Orchestration
Service access including content filtering, data masking, and document grounding.

## Quick Start

```bash
pip install "sap-ai-sdk-gen[all]"
```

```bash
export AICORE_CLIENT_ID="sb-..."
export AICORE_CLIENT_SECRET="..."
export AICORE_AUTH_URL="https://<tenant>.authentication.sap.hana.ondemand.com/oauth/token"
export AICORE_BASE_URL="https://api.ai.prod.eu-central-1.aws.ml.hana.ondemand.com/v2"
export AICORE_RESOURCE_GROUP="default"
```

```python
from gen_ai_hub.proxy.native.openai import chat

response = chat.completions.create(
    model_name="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello, SAP!"}]
)
print(response.choices[0].message.content)
```

## Installation Variants

| Command | Includes |
|---------|----------|
| `pip install sap-ai-sdk-gen` | OpenAI only |
| `pip install "sap-ai-sdk-gen[google, amazon]"` | OpenAI + Google + Amazon (no LangChain) |
| `pip install "sap-ai-sdk-gen[all]"` | All providers + LangChain |

## Key Modules

- **`gen_ai_hub.proxy.native`** — Direct model access (OpenAI, Amazon, Google, SAP RPT-1)
- **`gen_ai_hub.proxy.langchain`** — LangChain integration (`init_llm`, `ChatOpenAI`, etc.)
- **`gen_ai_hub.orchestration_v2`** — Orchestration Service client
- **`gen_ai_hub.document_grounding`** — Vector and Retrieval APIs
- **`gen_ai_hub.prompt_registry`** — Prompt template management
- **`gen_ai_hub.evaluations`** — Model evaluation framework

## License

GPL-3.0
