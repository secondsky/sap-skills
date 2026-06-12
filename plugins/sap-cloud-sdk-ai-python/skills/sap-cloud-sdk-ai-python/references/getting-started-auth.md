# Getting Started and Authentication

## Installation

The SAP Cloud SDK for AI for Python is distributed on PyPI as `sap-ai-sdk-gen`.

```bash
# Full installation (all providers + LangChain)
pip install "sap-ai-sdk-gen[all]"

# Minimal installation (OpenAI provider only, no LangChain)
pip install sap-ai-sdk-gen

# Select specific providers without LangChain
pip install "sap-ai-sdk-gen[google, amazon]"
```

### Package Rename

The previous package `generative-ai-hub-sdk` (v4.12.4) is **deprecated and no longer maintained**.
Its PyPI page states to use `sap-ai-sdk-gen` instead. The Python import name is still `gen_ai_hub`:

```python
import gen_ai_hub  # installed via: pip install sap-ai-sdk-gen
```

If you have existing code importing from `generative_ai_hub_sdk`, update your dependencies:

```bash
# Remove old package
pip uninstall generative-ai-hub-sdk

# Install new package
pip install "sap-ai-sdk-gen[all]"
```

The import paths under `gen_ai_hub` remain the same between the old and new packages.

## Python Version

The SDK requires Python 3.9+.

## Prerequisites

- **SAP AI Core** service instance on SAP BTP (Extended or `sap-internal` plan)
- **Resource group** in AI Core with deployed models (or use the default resource group)
- **Orchestration deployment** (required only for orchestration features)

## Authentication

The SDK authenticates through `AICoreV2Client` from the `ai-core-sdk` package.
Credentials are resolved in this precedence order:

1. **Keyword arguments** passed directly to `GenAIHubProxyClient(...)`
2. **Environment variables**
3. **Config file** (`$AICORE_HOME/config.json` or path from `AICORE_CONFIG`)
4. **VCAP_SERVICES** (automatic on Cloud Foundry/Kyma)

### Environment Variables

Set these for local development:

```bash
export AICORE_CLIENT_ID="sb-abc123-..."
export AICORE_CLIENT_SECRET="abc123-..."
export AICORE_AUTH_URL="https://<subdomain>.authentication.<region>.hana.ondemand.com/oauth/token"
export AICORE_BASE_URL="https://api.ai.prod.<region>.aws.ml.hana.ondemand.com/v2"
export AICORE_RESOURCE_GROUP="default"
```

The four required credentials (`AICORE_CLIENT_ID`, `AICORE_CLIENT_SECRET`,
`AICORE_AUTH_URL`, `AICORE_BASE_URL`) are the service key values from your
AI Core service instance on SAP BTP. You can retrieve them from the SAP BTP
cockpit or via the CF CLI:

```bash
cf service-key <AICORE_INSTANCE> <KEY_NAME>
```

### Config File Profile

Create a config file at `~/.aicore/config.json` (default location; `AICORE_HOME`
controls the directory, `AICORE_CONFIG` can set an explicit file path):

```json
{
  "AICORE_CLIENT_ID": "sb-abc123-...",
  "AICORE_CLIENT_SECRET": "abc123-...",
  "AICORE_AUTH_URL": "https://<subdomain>.authentication.<region>.hana.ondemand.com/oauth/token",
  "AICORE_BASE_URL": "https://api.ai.prod.<region>.aws.ml.hana.ondemand.com/v2",
  "AICORE_RESOURCE_GROUP": "default"
}
```

For named profiles, create `~/.aicore/config_<profile>.json` and select it:

```bash
export AICORE_PROFILE="production"
```

### Cloud Foundry / Kyma Binding

On BTP runtimes, bind the AI Core service instance to your application.
The SDK auto-detects credentials from `VCAP_SERVICES` (Cloud Foundry) or
mounted secrets (Kyma). No manual env var setup is needed.

### X.509 Certificate Authentication

For environments requiring certificate-based auth, provide certificate paths
or strings as keyword arguments to `AICoreV2Client`:

```python
from ai_core_sdk.ai_core_v2_client import AICoreV2Client

client = AICoreV2Client(
    base_url="https://api.ai.prod.<region>.aws.ml.hana.ondemand.com/v2",
    cert_file_path="/path/to/client.crt",
    key_file_path="/path/to/client.key"
)
```

Or via environment variables by setting `AICORE_CERT_FILE_PATH` and
`AICORE_KEY_FILE_PATH` in your config profile.

## Resource Groups

Resource groups isolate AI Core resources (deployments, models, configurations).
Set the default resource group via `AICORE_RESOURCE_GROUP` or pass it explicitly:

```python
from gen_ai_hub.proxy import GenAIHubProxyClient

proxy_client = GenAIHubProxyClient(resource_group="my-project")
```

## Verifying the Setup

Test that credentials are configured correctly:

```python
from gen_ai_hub.proxy import get_proxy_client

proxy_client = get_proxy_client()
print(f"Proxy client created successfully: {proxy_client.base_url}")
```

If this raises `ValidationError: No credentials found in any source`,
review your environment variables or config file.

## Installing Extras

The SDK supports optional dependency groups:

| Extra | Includes |
|-------|----------|
| `[all]` | All providers + LangChain |
| `[google]` | Google GenAI provider |
| `[amazon]` | Amazon Bedrock provider |

LangChain dependencies are included with `[all]` but not with individual provider extras.

## Resources

- PyPI: https://pypi.org/project/sap-ai-sdk-gen/
- SDK Reference: https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html
- AI Core Setup: https://help.sap.com/docs/sap-ai-core
