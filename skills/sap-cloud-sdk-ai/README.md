# SAP Cloud SDK for AI

Claude Code skill for developing with SAP Cloud SDK for AI - the official SDK for SAP AI Core, SAP Generative AI Hub, and Orchestration Service.

## Auto-Trigger Keywords

This skill activates when working with:

### SDK Packages
- `@sap-ai-sdk/orchestration`
- `@sap-ai-sdk/foundation-models`
- `@sap-ai-sdk/langchain`
- `@sap-ai-sdk/ai-api`
- `@sap-ai-sdk/document-grounding`
- `@sap-ai-sdk/prompt-registry`
- `com.sap.ai.sdk:orchestration`
- `com.sap.ai.sdk:core`
- `com.sap.ai.sdk.foundationmodels:openai`

### SAP Services
- SAP AI Core
- SAP Generative AI Hub
- SAP Orchestration Service
- SAP AI Launchpad
- AICORE_SERVICE_KEY
- aicore service binding

### AI/LLM Concepts
- chat completion
- embedding
- streaming
- function calling
- tool calling
- content filtering
- data masking
- document grounding
- prompt registry
- prompt template
- harmonized API

### Models via SAP
- GPT-4o on SAP
- Claude on SAP AI Core
- Gemini on SAP
- Amazon Nova
- Azure OpenAI via SAP

### Integration Patterns
- LangChain SAP
- Spring AI SAP
- LangGraph SAP
- OrchestrationClient
- AzureOpenAiChatClient
- OpenAiChatModel
- OrchestrationChatModel

### Error Patterns
- "Could not find service bindings for 'aicore'"
- "Orchestration deployment not found"
- AzureContentSafetyFilter
- LlamaGuard filter
- DPI masking
- ErrorWithCause

## Skill Contents

```
sap-cloud-sdk-ai/
├── SKILL.md                      # Main skill instructions
├── README.md                     # This file
├── EXTRACTION_PROGRESS.md        # Documentation coverage tracking
└── references/
    ├── orchestration-guide.md    # Full orchestration API details (900+ lines)
    ├── foundation-models-guide.md # Direct OpenAI model access
    ├── langchain-guide.md        # LangChain integration
    ├── spring-ai-guide.md        # Spring AI integration
    ├── ai-core-api-guide.md      # AI Core management APIs
    ├── agentic-workflows.md      # Agent/workflow patterns
    ├── connecting-to-ai-core.md  # Connection configuration
    ├── error-handling.md         # Error patterns and solutions
    └── v1-to-v2-migration.md     # V1 to V2 migration guide
```

## Supported Languages

- **JavaScript/TypeScript**: Node.js 20+, ESM support
- **Java**: Java 17+, Spring Boot 3.0+, CAP Java 3.0+

## Version

- **JavaScript SDK**: 1.18.0+ (Nov 22, 2025)
- **Java SDK**: 1.13.0 (Oct 30, 2025)
- **Last Updated**: 2025-11-22

## Documentation Sources

- [JS Documentation](https://github.com/SAP/ai-sdk/tree/main/docs-js)
- [Java Documentation](https://github.com/SAP/ai-sdk/tree/main/docs-java)
- [JS SDK Repository](https://github.com/SAP/ai-sdk-js)
- [Java SDK Repository](https://github.com/SAP/ai-sdk-java)

## License

MIT
