# Troubleshooting

## Common Errors and Solutions

### Authentication Errors

#### `ValidationError: No credentials found in any source`

**Cause**: The SDK cannot find AI Core credentials in any of the four resolution
sources (keyword arguments, environment variables, config file, VCAP_SERVICES).

**Solution**:
1. Verify environment variables are set: `AICORE_CLIENT_ID`, `AICORE_CLIENT_SECRET`, `AICORE_AUTH_URL`, `AICORE_BASE_URL`
2. Check for typos in variable names (all prefixed with `AICORE_`, not `AI_CORE_`)
3. If using a config file, verify the path: `echo $AICORE_CONFIG` or check `~/.aicore/config.json`
4. On Cloud Foundry, verify the service is bound: `cf env <APP_NAME> | grep AICORE`

```bash
# Quick verification
env | grep AICORE
```

#### `401 Unauthorized` or `403 Forbidden`

**Cause**: Expired or invalid credentials.

**Solution**:
1. Regenerate the service key in SAP BTP cockpit
2. Verify the `AICORE_AUTH_URL` includes `/oauth/token` as the token endpoint
3. Check that the service instance is on the correct plan (Extended plan required for GenAI Hub)

#### `AICORE_RESOURCE_GROUP not set` (warning)

**Cause**: No resource group specified.

**Solution**: Set `AICORE_RESOURCE_GROUP` or pass `resource_group` to the client constructor.

### Model and Deployment Errors

#### `No deployment found with: deployment.model_name == 'gpt-4o-mini'`

**Cause**: No model deployment matching the requested model name exists in the
specified resource group.

**Solution**:
1. Check available deployments in SAP AI Launchpad under your resource group
2. Verify the model name matches exactly (including provider prefix for some models)
3. Try deploying the model if it's not already deployed
4. Use `deployment_id` directly if you know it:

```python
from gen_ai_hub.proxy.native.openai import chat

response = chat.completions.create(
    deployment_id="dcef02e219ae4916",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

#### `Model not found` or `404 Not Found`

**Cause**: The model is not available in your AI Core region or plan.

**Solution**:
1. Check SAP's model catalog for regional availability
2. Verify your AI Core service plan supports the model
3. Some models require specific resource group configurations

### Package and Import Errors

#### `ModuleNotFoundError: No module named 'gen_ai_hub'`

**Cause**: The SDK is not installed, or the wrong package was installed.

**Solution**:
```bash
pip uninstall generative-ai-hub-sdk  # Remove deprecated package if present
pip install "sap-ai-sdk-gen[all]"
```

#### `ImportError` from `generative_ai_hub_sdk`

**Cause**: Code was written for the deprecated `generative-ai-hub-sdk` package.

**Solution**: The import name is `gen_ai_hub` for both old and new packages.
Update your import statements:

```python
# Old (may work with deprecated package, but should be updated)
import gen_ai_hub  # This import path is correct for both packages

# Ensure you have the new package installed
# pip install sap-ai-sdk-gen
```

### Orchestration Errors

#### `Orchestration deployment not found`

**Cause**: No orchestration deployment exists in the specified resource group.

**Solution**:
1. Deploy orchestration in your AI Core resource group (default resource group typically has this)
2. Specify a `deployment_id` when creating `OrchestrationService`:

```python
service = OrchestrationService(deployment_id="your-orchestration-deployment-id")
```

#### Content filter violation

**Cause**: Input or output was blocked by the configured content safety filter.

**Solution**:
1. Review the filter thresholds (e.g., `AzureThreshold.ALLOW_SAFE` is the strictest useful setting)
2. Relax thresholds if appropriate: `AzureThreshold.ALLOW_SAFE_LOW_MEDIUM` allows more content
3. Modify the input to avoid triggering the filter
4. Check `response.intermediate_failures` for details on which filter blocked the request

#### Token limit exceeded

**Cause**: The response exceeds the model's maximum token limit.

**Solution**:
1. Set `max_tokens` in the model parameters:

```python
LLMModelDetails(name="gpt-4o-mini", params={"max_tokens": 500})
```

2. Use a model with a larger context window
3. Reduce the prompt length

### Network and Timeout Errors

#### `ConnectionError` or timeout

**Cause**: Network connectivity issues between your environment and AI Core.

**Solution**:
1. Verify `AICORE_BASE_URL` is correct and accessible
2. Check firewall/proxy settings in your network
3. Increase timeout:

```python
service = OrchestrationService(config=config, timeout=120)
```

4. For BTP environments, ensure the AI Core service instance is in the same region

### LangChain-Specific Errors

#### `init_llm` fails for a new model

**Cause**: The model is not yet in `init_llm`'s auto-detection catalog.

**Solution**: Pass an explicit `init_func`:

```python
from gen_ai_hub.proxy.langchain import init_llm
from gen_ai_hub.proxy.langchain.amazon import init_chat_converse_model

llm = init_llm(
    "anthropic--claude-new",
    model_id="anthropic.claude-new-v1:0",
    init_func=init_chat_converse_model
)
```

#### Bedrock model requires `model_id`

**Cause**: Amazon Bedrock models need both a model name and a Bedrock model ID.

**Solution**: Always provide `model_id` for Bedrock models:

```python
llm = init_llm("anthropic--claude-4-sonnet", model_id="anthropic.claude-sonnet-4-20250514-v1:0")
```

## Migration from `generative-ai-hub-sdk`

### Package Rename

| Old | New |
|-----|-----|
| `pip install generative-ai-hub-sdk` | `pip install sap-ai-sdk-gen` |
| `pip install "generative-ai-hub-sdk[all]"` | `pip install "sap-ai-sdk-gen[all]"` |
| PyPI: `generative-ai-hub-sdk` | PyPI: `sap-ai-sdk-gen` |

### Import Paths

The import name `gen_ai_hub` is unchanged. All import paths remain compatible:

```python
# These imports work with both old and new packages
from gen_ai_hub.proxy.native.openai import chat
from gen_ai_hub.proxy.langchain import init_llm
from gen_ai_hub.orchestration_v2 import OrchestrationService
```

### Version Differences

The `generative-ai-hub-sdk` stopped at v4.12.4. The `sap-ai-sdk-gen` starts at v5.0.0
and is currently at v6.10.0. Key additions since the rename include:

- **Responses API** support (`gen_ai_hub.proxy.native.openai.responses`)
- **SAP RPT-1** client (`gen_ai_hub.proxy.native.sap.RPTClient`)
- **Orchestration v2** with enhanced configuration model
- **Prompt Registry** integration for orchestration config references
- **Evaluations** module (`gen_ai_hub.evaluations`)
- **Google GenAI** native client (using `google-genai` SDK)
- **Structured outputs** (`.parse()` methods, `response_format` in orchestration)

### Migration Steps

1. Update `requirements.txt` or `pyproject.toml`:
   ```
   # Before
   generative-ai-hub-sdk[all]>=4.0

   # After
   sap-ai-sdk-gen[all]>=6.0
   ```

2. Install the new package:
   ```bash
   pip uninstall generative-ai-hub-sdk
   pip install "sap-ai-sdk-gen[all]"
   ```

3. Test existing code — import paths under `gen_ai_hub` are compatible.

4. Update any direct references to the package name in CI/CD configs or Dockerfiles.

5. Check for deprecated model names (e.g., `gpt-35-turbo` → `gpt-4o-mini`).

## Version Compatibility

| sap-ai-sdk-gen | Python | ai-core-sdk | Key Feature |
|----------------|--------|-------------|-------------|
| 6.10.0 | 3.8+ | Bundled | Responses API, RPT-1, Orchestration v2 |
| 6.x | 3.8+ | Bundled | Google GenAI native client |
| 5.x | 3.8+ | Bundled | Initial rename from generative-ai-hub-sdk |

The `ai-core-sdk` (`AICoreV2Client`) is included as a dependency of `sap-ai-sdk-gen`.

## Resources

- PyPI: https://pypi.org/project/sap-ai-sdk-gen/
- SDK Reference: https://help.sap.com/doc/generative-ai-hub-sdk/CLOUD/en-US/_reference/gen_ai_hub.html
- Deprecated Package: https://pypi.org/project/generative-ai-hub-sdk/
- SAP Community: https://community.sap.com/
