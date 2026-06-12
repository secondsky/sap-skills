# Native Clients Guide

The SDK provides provider-specific native client integrations that act as
drop-in replacements for the original provider SDKs. All requests are routed
through SAP AI Core's proxy, adding authentication, logging, and resource group
isolation transparently.

## Module Structure

```
gen_ai_hub.proxy.native/
├── openai/       # OpenAI-compatible (GPT, embeddings, responses API)
├── amazon/       # Amazon Bedrock (invoke model, converse)
├── google_genai/ # Google GenAI (generate content)
└── sap/          # SAP RPT-1 (tabular predictions)
```

## OpenAI Client

The OpenAI integration provides the most comprehensive coverage: completions,
chat completions, embeddings, structured outputs, and the Responses API.

### Module-Level Convenience Functions

These use a global client instance and are the simplest way to get started:

```python
from gen_ai_hub.proxy.native.openai import chat, completions, embeddings

# Chat completion
response = chat.completions.create(
    model_name="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is SAP?"}
    ]
)
print(response.choices[0].message.content)

# Legacy completions
response = completions.create(
    model_name="gpt-4o-mini",
    prompt="The capital of France is",
    max_tokens=20,
    temperature=0
)

# Embeddings
response = embeddings.create(
    input="Every decoding is another encoding.",
    model_name="text-embedding-3-small"
)
```

### OpenAI Client Instance

For more control, instantiate `OpenAI` directly:

```python
from gen_ai_hub.proxy.native.openai import OpenAI

client = OpenAI()

# Chat completion
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello!"}]
)

# With explicit deployment_id instead of model name
response = client.chat.completions.create(
    deployment_id="dcef02e219ae4916",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

The `OpenAI` constructor accepts:

```python
OpenAI(
    proxy_client=None,       # Optional: custom GenAIHubProxyClient
    api_version="2025-03-01-preview",  # OpenAI API version
    **kwargs                 # Passed to underlying openai.OpenAI
)
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
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Responses API

The SDK supports OpenAI's Responses API (agentic-style calls):

```python
from gen_ai_hub.proxy.native.openai import responses

response = responses.create(
    model="gpt-5",
    instructions="You are a helpful assistant.",
    input="What is the capital of France?"
)
print(response.output_text)
```

### Structured Outputs

```python
from pydantic import BaseModel
from gen_ai_hub.proxy.native.openai import chat, responses

class Person(BaseModel):
    name: str
    age: int

# Via chat completions
response = chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Tell me about John Doe, aged 30."}],
    response_format=Person
)
person = response.choices[0].message.parsed
print(person)

# Via responses API
response = responses.parse(
    model="gpt-5",
    input="Tell me about John Doe aged 30.",
    text_format=Person
)
print(response.output_parsed)
```

### Model Selection

Use `model_name` for convenience functions (auto-discovers deployment) or
`model` for the client instance. You can also use `model_version="latest"`:

```python
response = chat.completions.create(
    model_name="gpt-4o-mini",
    model_version="latest",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Using a Specific Deployment

When you know the deployment ID (e.g., from AI Launchpad), skip model discovery:

```python
response = chat.completions.create(
    deployment_id="dcef02e219ae4916",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Amazon Bedrock Client

### Invoke Model (Raw)

```python
import json
from gen_ai_hub.proxy.native.amazon import Session

bedrock = Session().client(model_name="amazon--nova-premier")

body = json.dumps({
    "inputText": "Explain black holes in astrophysics.",
    "textGenerationConfig": {
        "maxTokenCount": 3072,
        "temperature": 0.7,
        "topP": 0.9
    }
})

response = bedrock.invoke_model(body=body)
response_body = json.loads(response.get("body").read())
print(response_body)
```

### Converse (High-Level)

```python
from gen_ai_hub.proxy.native.amazon import Session

bedrock = Session().client(model_name="anthropic--claude-4-sonnet")

conversation = [
    {"role": "user", "content": [{"text": "Describe the purpose of a hello world program."}]}
]

response = bedrock.converse(
    messages=conversation,
    inferenceConfig={"maxTokens": 512, "temperature": 0.5, "topP": 0.9}
)
print(response)
```

### Session and Client Options

```python
from gen_ai_hub.proxy.native.amazon import Session

# The Session creates a client for a specific model
session = Session()
client = session.client(model_name="amazon--nova-pro")

# With explicit deployment
client = session.client(deployment_id="abc123")
```

## Google GenAI Client

### Generate Content

```python
from gen_ai_hub.proxy.native.google_genai import Client
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()
client = Client(proxy_client=proxy_client)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="How many paws does a dog have?"
)
print(response)
```

### Streaming

```python
from gen_ai_hub.proxy.native.google_genai import Client
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()
client = Client(proxy_client=proxy_client)

response_stream = client.models.generate_content_stream(
    model="gemini-2.5-flash",
    contents="Explain quantum computing in simple terms."
)
for chunk in response_stream:
    print("Chunk:", chunk.text)
```

### Function Calling

```python
from google.genai import types
from gen_ai_hub.proxy.native.google_genai import Client
from gen_ai_hub.proxy import get_proxy_client

def get_current_weather(location: str) -> str:
    """Returns the current weather."""
    return "sunny"

proxy_client = get_proxy_client()
client = Client(proxy_client=proxy_client)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="What is the weather like in Boston?",
    config=types.GenerateContentConfig(tools=[get_current_weather])
)
```

## SAP RPT-1 (Relational Pretrained Transformer)

SAP RPT-1 performs classification and regression on tabular data without
training or fine-tuning. It uses in-context learning.

### Regression Example

```python
from gen_ai_hub.proxy.native.sap import (
    RPTClient, RPTRequest, PredictionConfig, TargetColumn
)

rows = [
    {"PRODUCT": "Couch", "PRICE": 999.99, "ORDERDATE": "28-11-2025", "ID": "35", "DISCOUNT_RATE": "[PREDICT]"},
    {"PRODUCT": "Office Chair", "PRICE": 150.80, "ORDERDATE": "02-11-2025", "ID": "44", "DISCOUNT_RATE": 0.12},
    {"PRODUCT": "Server Rack", "PRICE": 2200.00, "ORDERDATE": "01-11-2025", "ID": "104", "DISCOUNT_RATE": 0.05},
    {"PRODUCT": "Standing Desk", "PRICE": 640.00, "ORDERDATE": "05-11-2025", "ID": "205", "DISCOUNT_RATE": 0.10},
    {"PRODUCT": "Monitor 27 inch", "PRICE": 289.99, "ORDERDATE": "08-11-2025", "ID": "306", "DISCOUNT_RATE": "[PREDICT]"},
]

client = RPTClient()
body = RPTRequest(
    prediction_config=PredictionConfig(
        target_columns=[TargetColumn(name="DISCOUNT_RATE", task_type="regression")]
    ),
    rows=rows
)
response = client.predict(body=body, model_name="sap-rpt-1-small")
print(response.predictions)
```

### Classification Example

```python
from gen_ai_hub.proxy.native.sap import RPTClient

request_dict = {
    "prediction_config": {
        "target_columns": [
            {"name": "COSTCENTER", "prediction_placeholder": "[PREDICT]", "task_type": "classification"}
        ]
    },
    "columns": {
        "PRODUCT": ["Couch", "Office Chair", "Server Rack"],
        "PRICE": [999.99, 150.8, 2200.00],
        "ORDERDATE": ["28-11-2025", "02-11-2025", "01-11-2025"],
        "ID": ["35", "44", "104"],
        "COSTCENTER": ["[PREDICT]", "Office Furniture", "Data Infrastructure"]
    },
    "data_schema": {
        "PRODUCT": {"dtype": "string"},
        "PRICE": {"dtype": "numeric"},
        "ORDERDATE": {"dtype": "date"},
        "ID": {"dtype": "string"},
        "COSTCENTER": {"dtype": "string"}
    }
}

client = RPTClient()
response = client.predict(body=request_dict, model_name="sap-rpt-1-small")
print(response.predictions)
```

### Async RPT-1

```python
response = await client.apredict(body=request_dict, model_name="sap-rpt-1-small")
```

## Using New Models Before Official SDK Support

You can use new models via Gen AI Hub before they are officially listed,
provided their provider family is supported:

1. **Native SDK Clients**: Use the provider's native SDK through the proxy with
   the new model name directly.
2. **LangChain**: Pass `init_func` to `init_llm` to select the correct provider:

```python
from gen_ai_hub.proxy.langchain import init_llm
from gen_ai_hub.proxy.langchain.amazon import (
    init_chat_model as amazon_init_invoke,
    init_chat_converse_model as amazon_init_converse
)

# Force Converse API for a new Bedrock model
llm = init_llm(
    "anthropic--claude-newer-version",
    model_id="anthropic.claude-newer-version-v1:0",
    init_func=amazon_init_converse
)
```

## Proxy Version Management

The SDK supports multiple proxy versions. Use `set_proxy_version` to switch:

```python
from gen_ai_hub.proxy import set_proxy_version, get_proxy_version

set_proxy_version("gen-ai-hub")
print(get_proxy_version())  # "gen-ai-hub"
```

## Resources

- SDK Reference: https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html
- PyPI: https://pypi.org/project/sap-ai-sdk-gen/
- AI Core Models: https://help.sap.com/docs/sap-ai-core/generative-ai-hub/available-models
