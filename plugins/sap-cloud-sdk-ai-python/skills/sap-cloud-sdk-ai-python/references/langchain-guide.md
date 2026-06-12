# LangChain Integration Guide

The SDK provides harmonised LangChain integration through `gen_ai_hub.proxy.langchain`,
enabling LangChain chains and agents to use models via SAP AI Core.

## Module Structure

```
gen_ai_hub.proxy.langchain/
├── __init__.py          # Exports: init_llm, init_embedding_model, ChatOpenAI, OpenAI, ...
├── openai/              # OpenAI LangChain classes
├── amazon/              # Amazon Bedrock LangChain classes
├── google_genai/        # Google GenAI LangChain classes
└── base/                # Shared base classes
```

## Key Exports

| Class / Function | Description |
|-----------------|-------------|
| `init_llm` | Harmonised LLM initialisation (any provider) |
| `init_embedding_model` | Harmonised embedding model initialisation |
| `ChatOpenAI` | LangChain ChatOpenAI via AI Core proxy |
| `OpenAI` | LangChain OpenAI (completions) via AI Core proxy |
| `OpenAIEmbeddings` | LangChain OpenAI embeddings via AI Core proxy |
| `ChatBedrock` | LangChain Bedrock (Invoke API) via AI Core proxy |
| `ChatBedrockConverse` | LangChain Bedrock (Converse API) via AI Core proxy |
| `ChatGoogleGenerativeAI` | LangChain Google GenAI via AI Core proxy |
| `OpenAIClient` / `AsyncOpenAIClient` | Synchronous/async OpenAI clients for LangChain |

## Harmonised Model Initialisation

### init_llm

The `init_llm` function is the recommended way to create LangChain LLM objects.
It automatically selects the correct provider class based on the model name:

```python
from gen_ai_hub.proxy.langchain import init_llm

llm = init_llm("gpt-4o-mini", max_tokens=300, temperature=0.0)
result = llm.invoke("What is SAP BTP?")
print(result.content)
```

**Signature:**

```python
init_llm(
    model_name,            # Positional: model name (e.g. "gpt-4o-mini")
    /,
    *,                     # All following are keyword-only
    proxy_client=None,     # Optional: custom GenAIHubProxyClient
    temperature=0.0,       # Generation temperature
    max_tokens=256,        # Maximum output tokens
    top_k=None,            # Top-K sampling
    top_p=1.0,             # Top-P (nucleus) sampling
    init_func=None,        # Optional: override provider init function
    model_id="",           # Optional: explicit model ID (for Bedrock)
    **kwargs               # Passed to underlying LangChain class
) -> BaseLanguageModel
```

### init_embedding_model

```python
from gen_ai_hub.proxy.langchain import init_embedding_model

embeddings = init_embedding_model("text-embedding-3-small")
vector = embeddings.embed_query("SAP Business Technology Platform")
print(len(vector))
```

**Signature:**

```python
init_embedding_model(
    model_name,            # Positional: model name (e.g. "text-embedding-3-small")
    /,
    *,                     # All following are keyword-only
    proxy_client=None,     # Optional: custom GenAIHubProxyClient
    init_func=None,        # Optional: override provider init function
    model_id="",           # Optional: explicit model ID
    **kwargs               # Passed to underlying LangChain class
) -> Embeddings
```

## LCEL Chains (LangChain Expression Language)

### Simple Chain

```python
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from gen_ai_hub.proxy.langchain import init_llm

template = """Question: {question}
Answer: Let's think step by step."""
prompt = PromptTemplate(template=template, input_variables=["question"])

llm = init_llm("gpt-4o-mini", max_tokens=300)
chain = prompt | llm | StrOutputParser()

response = chain.invoke({"question": "What is a supernova?"})
print(response)
```

### Chat Chain

```python
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from gen_ai_hub.proxy.langchain import ChatOpenAI
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()
chat_llm = ChatOpenAI(proxy_model_name="gpt-4o-mini", proxy_client=proxy_client)

chat_prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a helpful assistant that translates English to pirate."),
    HumanMessagePromptTemplate.from_template("{text}")
])

chain = chat_prompt | chat_llm
response = chain.invoke({"text": "I love programming."})
print(response.content)
```

## Structured Outputs

```python
from pydantic import BaseModel
from gen_ai_hub.proxy.langchain import ChatOpenAI
from gen_ai_hub.proxy import get_proxy_client
from langchain.schema import HumanMessage

class Person(BaseModel):
    name: str
    age: int

chat_model = ChatOpenAI(proxy_model_name="gpt-4o-mini", proxy_client=get_proxy_client())
chat_model = chat_model.with_structured_output(method="json_schema", schema=Person, strict=True)

message = HumanMessage(content="Tell me about a person named John who is 30")
result = chat_model.invoke([message])
print(result)  # Person(name="John", age=30)
```

## Provider-Specific Classes

### OpenAI

```python
from gen_ai_hub.proxy.langchain import ChatOpenAI, OpenAI, OpenAIEmbeddings
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()

# Chat
chat = ChatOpenAI(proxy_model_name="gpt-4o-mini", proxy_client=proxy_client)

# Completions (legacy)
llm = OpenAI(proxy_model_name="gpt-4o-mini", proxy_client=proxy_client)

# Embeddings
embeddings = OpenAIEmbeddings(proxy_model_name="text-embedding-3-small", proxy_client=proxy_client)
```

### Amazon Bedrock

```python
from gen_ai_hub.proxy.langchain import ChatBedrock, ChatBedrockConverse, BedrockEmbeddings
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()

# Invoke API
chat_invoke = ChatBedrock(
    proxy_model_name="amazon--nova-pro",
    model_id="amazon.nova-pro-v1:0",
    proxy_client=proxy_client
)

# Converse API (recommended for newer models)
chat_converse = ChatBedrockConverse(
    proxy_model_name="anthropic--claude-4-sonnet",
    model_id="anthropic.claude-sonnet-4-20250514-v1:0",
    proxy_client=proxy_client
)

# Embeddings
embeddings = BedrockEmbeddings(
    proxy_model_name="amazon--nova-premier",
    proxy_client=proxy_client
)
```

### Google GenAI

```python
from gen_ai_hub.proxy.langchain import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()

# Chat
chat = ChatGoogleGenerativeAI(
    proxy_model_name="gemini-2.5-flash",
    proxy_client=proxy_client
)

# Embeddings
embeddings = GoogleGenerativeAIEmbeddings(
    proxy_model_name="text-embedding-004",
    proxy_client=proxy_client
)
```

## Using New Models Before Official Support

For models not yet auto-detected by `init_llm`, pass the `init_func` parameter:

```python
from gen_ai_hub.proxy.langchain import init_llm
from gen_ai_hub.proxy.langchain.amazon import (
    init_chat_model as amazon_init_invoke,
    init_chat_converse_model as amazon_init_converse
)
from gen_ai_hub.proxy.langchain.google_genai import init_chat_model as google_init

# New Bedrock model with Converse API
llm = init_llm(
    "anthropic--claude-newer-model",
    model_id="anthropic.claude-newer-v1:0",
    init_func=amazon_init_converse
)

# New Google model
llm = init_llm("gemini-newer-version", init_func=google_init)
```

## Implicit Proxy Client

If you don't pass `proxy_client`, the SDK creates one from the environment:

```python
from gen_ai_hub.proxy.langchain import ChatOpenAI

# Works without explicit proxy_client if AICORE_* env vars are set
chat = ChatOpenAI(proxy_model_name="gpt-4o-mini")
response = chat.invoke("Hello!")
```

## Resources

- SDK Reference: https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html
- LangChain Docs: https://python.langchain.com/docs/
- PyPI: https://pypi.org/project/sap-ai-sdk-gen/
