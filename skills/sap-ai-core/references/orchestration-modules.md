# Orchestration Modules Reference

Complete reference for all SAP AI Core orchestration modules.

**Documentation Source:** https://github.com/SAP-docs/sap-artificial-intelligence/tree/main/docs/sap-ai-core

---

## Orchestration V2 API

### Endpoint

**V2 Endpoint:** `POST {{deployment_url}}/v2/completion`

### V1 to V2 Migration

If migrating from V1 to V2:

1. Update endpoint from `/completion` to `/v2/completion`
2. Modify payload structure to use `config.modules` format
3. Test with existing orchestration configurations

### V2 Request Structure

```json
{
  "config": {
    "modules": {
      "prompt_templating": { /* template config */ },
      "llm": { /* model config */ },
      "grounding": { /* optional */ },
      "filtering": { /* optional */ },
      "masking": { /* optional */ },
      "translation": { /* optional */ }
    }
  },
  "placeholder_values": {
    "variable_name": "value"
  }
}
```

### Key V2 Changes

| Aspect | V1 | V2 |
|--------|----|----|
| Endpoint | `/completion` | `/v2/completion` |
| Module structure | `module_configurations` | `config.modules` |
| Embeddings | Not available | `POST /v2/embeddings` |

---

## Module Execution Order

The orchestration pipeline executes modules in this fixed order:

```
1. Grounding → 2. Templating → 3. Input Translation → 4. Data Masking →
5. Input Filtering → 6. Model Configuration → 7. Output Filtering → 8. Output Translation
```

Only **Templating** and **Model Configuration** are mandatory.

---

## 1. Templating Module (Mandatory)

Compose prompts with placeholders that get populated during inference.

### Configuration

```json
{
  "templating_module_config": {
    "template": [
      {"role": "system", "content": "You are {{?assistant_type}}"},
      {"role": "user", "content": "{{?user_message}}"}
    ],
    "defaults": {
      "assistant_type": "a helpful assistant"
    }
  }
}
```

### Placeholder Syntax

| Syntax | Description |
|--------|-------------|
| `{{?variable}}` | Required placeholder (must be provided) |
| `{{?variable}}` with defaults | Optional if default provided |
| `{{$grounding_output}}` | System variable from grounding module |

### Message Roles

- `system`: System instructions
- `user`: User input
- `assistant`: Assistant responses (for multi-turn)
- `tool`: Tool call results

---

## 2. Model Configuration Module (Mandatory)

Configure the LLM parameters.

### Configuration

```json
{
  "llm_module_config": {
    "model_name": "gpt-4o",
    "model_version": "latest",
    "model_params": {
      "max_tokens": 2000,
      "temperature": 0.7,
      "top_p": 0.95,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "stop": ["\n\n"]
    }
  }
}
```

### Common Parameters

| Parameter | Type | Description | Range |
|-----------|------|-------------|-------|
| `max_tokens` | int | Maximum response tokens | 1-4096+ |
| `temperature` | float | Randomness | 0.0-2.0 |
| `top_p` | float | Nucleus sampling | 0.0-1.0 |
| `frequency_penalty` | float | Repetition penalty | -2.0 to 2.0 |
| `presence_penalty` | float | Topic diversity | -2.0 to 2.0 |
| `stop` | array | Stop sequences | Up to 4 |

### Model Version Options

- `"latest"`: Auto-upgrade to newest version
- Specific version: e.g., `"2024-05-13"` for pinned version

---

## 3. Content Filtering Module

Filter harmful content in input and output.

### Azure Content Safety Configuration

```json
{
  "filtering_module_config": {
    "input": {
      "filters": [
        {
          "type": "azure_content_safety",
          "config": {
            "Hate": 2,
            "Violence": 2,
            "Sexual": 2,
            "SelfHarm": 2
          }
        }
      ]
    },
    "output": {
      "filters": [
        {
          "type": "azure_content_safety",
          "config": {
            "Hate": 0,
            "Violence": 0,
            "Sexual": 0,
            "SelfHarm": 0
          }
        }
      ]
    }
  }
}
```

### Azure Content Safety Categories

| Category | Description | Severity Levels |
|----------|-------------|-----------------|
| `Hate` | Discriminatory, hateful content | 0, 2, 4, 6 |
| `Violence` | Violent content and threats | 0, 2, 4, 6 |
| `Sexual` | Sexual content | 0, 2, 4, 6 |
| `SelfHarm` | Self-harm promotion | 0, 2, 4, 6 |

**Severity Scale:**
- 0: Safe
- 2: Low severity
- 4: Medium severity (blocked by Azure global filter)
- 6: High severity (blocked by Azure global filter)

### PromptShield Configuration

Detect prompt injection attacks:

```json
{
  "filtering_module_config": {
    "input": {
      "filters": [
        {
          "type": "azure_content_safety",
          "config": {
            "PromptShield": true
          }
        }
      ]
    }
  }
}
```

### Llama Guard 3 Configuration

```json
{
  "filtering_module_config": {
    "input": {
      "filters": [
        {
          "type": "llama_guard_3",
          "config": {
            "categories": [
              "violent_crimes",
              "hate",
              "sexual_content",
              "self_harm"
            ]
          }
        }
      ]
    }
  }
}
```

### Llama Guard 3 Categories (14)

| Category | Description |
|----------|-------------|
| `violent_crimes` | Violence and violent crimes |
| `non_violent_crimes` | Non-violent criminal activities |
| `sex_crimes` | Sexual crimes |
| `child_exploitation` | Child sexual abuse material |
| `defamation` | Defamation and libel |
| `specialized_advice` | Unqualified professional advice |
| `privacy` | Privacy violations |
| `intellectual_property` | IP infringement |
| `indiscriminate_weapons` | Weapons of mass destruction |
| `hate` | Hate speech |
| `self_harm` | Self-harm content |
| `sexual_content` | Explicit sexual content |
| `elections` | Election interference |
| `code_interpreter_abuse` | Malicious code execution |

---

## 4. Data Masking Module

Anonymize or pseudonymize PII before sending to LLM.

### Pseudonymization Configuration

```json
{
  "masking_module_config": {
    "masking_providers": [
      {
        "type": "sap_data_privacy_integration",
        "method": "pseudonymization",
        "entities": [
          {"type": "profile-person"},
          {"type": "profile-email"},
          {"type": "profile-phone"},
          {"type": "profile-credit-card-number"}
        ]
      }
    ]
  }
}
```

### Anonymization Configuration

```json
{
  "masking_module_config": {
    "masking_providers": [
      {
        "type": "sap_data_privacy_integration",
        "method": "anonymization",
        "entities": [
          {"type": "profile-person"},
          {"type": "profile-ssn"}
        ]
      }
    ]
  }
}
```

### Complete Entity Type Reference (25)

**Personal Identifiers:**
| Entity Type | Coverage | Description |
|-------------|----------|-------------|
| `profile-person` | English | Person names |
| `profile-email` | Global | Email addresses |
| `profile-phone` | International | Phone numbers with country codes |
| `profile-address` | US | Physical addresses |
| `profile-url` | Global | User-accessible URLs |
| `profile-username-password` | Global | Credentials via keywords |

**Organizations:**
| Entity Type | Coverage | Description |
|-------------|----------|-------------|
| `profile-org` | Global | SAP customers + Fortune 1000 |
| `profile-university` | Global | Public universities |
| `profile-location` | US | US locations |

**Government/Financial IDs:**
| Entity Type | Coverage | Description |
|-------------|----------|-------------|
| `profile-nationalid` | 20+ countries | National ID numbers |
| `profile-ssn` | US, Canada | Social Security Numbers |
| `profile-passport` | 30+ countries | Passport numbers |
| `profile-driverlicense` | 30+ countries | Driver's license numbers |
| `profile-iban` | 70+ countries | Bank account numbers |
| `profile-credit-card-number` | Global | Credit card numbers |

**SAP-Specific:**
| Entity Type | Coverage | Description |
|-------------|----------|-------------|
| `profile-sapids-internal` | SAP | Staff IDs (C/I/D + 6-8 digits) |
| `profile-sapids-public` | SAP | S-user (S + 6-11 digits), P-user (P + 10 digits) |

**Sensitive Attributes:**
| Entity Type | Coverage | Description |
|-------------|----------|-------------|
| `profile-nationality` | 190+ countries | Country names and codes |
| `profile-religious-group` | 200+ groups | Religious affiliations |
| `profile-political-group` | 100+ parties | Political affiliations |
| `profile-pronouns-gender` | Global | Gender pronouns |
| `profile-gender` | Global | Gender identifiers |
| `profile-sexual-orientation` | Global | Sexual orientation |
| `profile-trade-union` | Global | Trade union membership |
| `profile-ethnicity` | Global | Ethnic identifiers |
| `profile-sensitive-data` | Global | Composite of sensitive attributes |

### Custom Entity with Regex

```json
{
  "masking_module_config": {
    "masking_providers": [
      {
        "type": "sap_data_privacy_integration",
        "method": "pseudonymization",
        "entities": [
          {
            "type": "custom",
            "pattern": "EMP-[0-9]{6}",
            "replacement": "EMPLOYEE_ID"
          }
        ]
      }
    ]
  }
}
```

---

## 5. Grounding Module

Inject external context from vector databases (RAG).

### Basic Grounding Configuration

```json
{
  "grounding_module_config": {
    "grounding_service": "document_grounding_service",
    "grounding_service_configuration": {
      "grounding_input_parameters": ["user_query"],
      "grounding_output_parameter": "context",
      "filters": [
        {
          "id": "<pipeline-id>",
          "search_configuration": {
            "max_chunk_count": 5
          }
        }
      ]
    }
  }
}
```

### Grounding with Metadata Filters

```json
{
  "grounding_module_config": {
    "grounding_service": "document_grounding_service",
    "grounding_service_configuration": {
      "grounding_input_parameters": ["user_query"],
      "grounding_output_parameter": "context",
      "filters": [
        {
          "id": "<pipeline-id>",
          "data_repositories": ["<repo-id>"],
          "document_metadata": [
            {
              "key": "department",
              "value": "HR"
            }
          ],
          "search_configuration": {
            "max_chunk_count": 10,
            "max_document_count": 5
          }
        }
      ]
    }
  }
}
```

### Using Grounding Output in Template

```json
{
  "templating_module_config": {
    "template": [
      {
        "role": "system",
        "content": "Answer questions using only the following context:\n\n{{$context}}"
      },
      {
        "role": "user",
        "content": "{{?user_query}}"
      }
    ]
  }
}
```

---

## 6. Translation Module

Translate input and output between languages.

### Input Translation Configuration

```json
{
  "translation_module_config": {
    "input": {
      "source_language": "auto",
      "target_language": "en"
    }
  }
}
```

### Output Translation Configuration

```json
{
  "translation_module_config": {
    "output": {
      "source_language": "en",
      "target_language": "{{?user_language}}"
    }
  }
}
```

### Combined Translation

```json
{
  "translation_module_config": {
    "input": {
      "source_language": "auto",
      "target_language": "en"
    },
    "output": {
      "source_language": "en",
      "target_language": "auto"
    }
  }
}
```

---

## Complete Orchestration Example

All modules combined:

```json
{
  "config": {
    "module_configurations": {
      "grounding_module_config": {
        "grounding_service": "document_grounding_service",
        "grounding_service_configuration": {
          "grounding_input_parameters": ["user_query"],
          "grounding_output_parameter": "context",
          "filters": [{"id": "<pipeline-id>"}]
        }
      },
      "templating_module_config": {
        "template": [
          {"role": "system", "content": "You are a helpful assistant. Use this context:\n{{$context}}"},
          {"role": "user", "content": "{{?user_query}}"}
        ]
      },
      "translation_module_config": {
        "input": {"source_language": "auto", "target_language": "en"},
        "output": {"source_language": "en", "target_language": "auto"}
      },
      "masking_module_config": {
        "masking_providers": [{
          "type": "sap_data_privacy_integration",
          "method": "pseudonymization",
          "entities": [
            {"type": "profile-person"},
            {"type": "profile-email"}
          ]
        }]
      },
      "filtering_module_config": {
        "input": {
          "filters": [{
            "type": "azure_content_safety",
            "config": {"Hate": 2, "Violence": 2, "Sexual": 2, "SelfHarm": 2}
          }]
        },
        "output": {
          "filters": [{
            "type": "azure_content_safety",
            "config": {"Hate": 0, "Violence": 0, "Sexual": 0, "SelfHarm": 0}
          }]
        }
      },
      "llm_module_config": {
        "model_name": "gpt-4o",
        "model_version": "latest",
        "model_params": {
          "max_tokens": 2000,
          "temperature": 0.5
        }
      }
    }
  },
  "input_params": {
    "user_query": "What are the company's vacation policies?"
  }
}
```

---

## Documentation Links

- Orchestration Overview: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/orchestration-8d02235.md
- Content Filtering: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/content-filtering-f804175.md
- Data Masking: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/data-masking-8b87002.md
- Grounding: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/grounding-035c455.md
