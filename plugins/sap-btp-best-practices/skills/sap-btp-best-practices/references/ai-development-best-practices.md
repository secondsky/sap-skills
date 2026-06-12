# AI Development Best Practices on SAP BTP

Comprehensive guide for implementing AI solutions on SAP Business Technology Platform using SAP AI Core and related services.

**Source Repository**: [SAP-samples/sap-btp-ai-best-practices](https://github.com/SAP-samples/sap-btp-ai-best-practices)  
**Documentation Portal**: [https://btp-ai-bp.docs.sap/](https://btp-ai-bp.docs.sap/)  
**Project Catalog**: [AI4U Project Catalog](https://ai4u-website.cfapps.eu10-004.hana.ondemand.com/project-catalog)

---

## Overview

SAP BTP provides AI capabilities through SAP AI Core, enabling both **Generative AI** (LLMs, chatbots, RAG) and **Narrow AI** (classical ML, predictions) implementations.

**Requirements**:
- SAP Business Technology Platform account
- Access to SAP AI Core service
- Code examples available in: TypeScript, Python, Java, CAP

---

## Generative AI Best Practices

### 1. Secure Access to AI Models

Access generative AI models through SAP AI Core with proper authentication:

```python
# Python example - Secure model access
from gen_ai_hub.proxy.native.openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello, how can you help?"}]
)
```

```typescript
// TypeScript example
import { OpenAI } from '@sap-ai-sdk/gen-ai-hub';

const client = new OpenAI();
const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello, how can you help?' }]
});
```

**Key Considerations**:
- Use SAP AI Core service keys for authentication
- Configure environment variables from `.env` files
- Never hardcode credentials in application code

### 2. Prompt Template Patterns

Create effective, reusable prompts:

```python
# Prompt template pattern
SYSTEM_PROMPT = """You are a helpful assistant for {domain}.
Your task is to {task_description}.
Always respond in {language}."""

USER_PROMPT = """
Context: {context}
Question: {user_question}
"""
```

**Best Practices**:
- Separate system and user prompts
- Use placeholders for dynamic content
- Include clear task descriptions
- Specify output format expectations

### 3. Retrieval-Augmented Generation (RAG)

Implement RAG systems for grounding LLM responses with enterprise data:

**Architecture**:
```
Documents → Chunking → Embeddings → Vector Store
                                         ↓
User Query → Embedding → Similarity Search → Context
                                                ↓
                         LLM ← Context + Query → Response
```

**Key Components**:
- Document chunking strategies
- Vector embeddings (SAP AI Core embedding models)
- Vector database (SAP HANA Cloud Vector Engine)
- Context window management

### 4. Content Filtering

Implement content safety for AI-generated outputs:

- Configure content filtering policies in SAP AI Core
- Implement input validation before sending to models
- Add output filtering for inappropriate content
- Log and monitor filtered content for analysis

### 5. PII Data Masking

Protect personally identifiable information:

```python
# Data masking pattern
def mask_pii(text: str) -> str:
    """Mask PII before sending to LLM"""
    # Replace emails, phone numbers, SSNs
    masked = re.sub(r'\b[\w.-]+@[\w.-]+\.\w+\b', '[EMAIL]', text)
    masked = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '[PHONE]', masked)
    return masked
```

**Best Practices**:
- Mask PII before sending to external models
- Use SAP Data Privacy Integration where available
- Implement reversible masking for response reconstruction
- Audit PII handling in AI workflows

---

## CAP + AI Integration Patterns

Production-tested patterns for integrating LLMs into CAP applications on SAP BTP.

### Architecture

```
Fiori Frontend → CAP Service → SAP Cloud SDK for AI → AI Core (Orchestration) → LLM Provider
                     ↓                                       ↑
              HANA Database                          BTP Service Binding
              (Vector columns)                    (No API keys in code)
```

The CAP service never holds LLM provider credentials. It authenticates via BTP service binding to AI Core, which routes to the configured provider (Azure OpenAI, AWS Bedrock, etc.). Changing providers requires only an AI Core configuration change, no code modification.

### Service Binding (MTA)

```yaml
resources:
  - name: my-ai-core
    type: org.cloudfoundry.managed-service
    parameters:
      service: aicore
      service-plan: extended  # Required for Generative AI Hub
```

### Dependencies

```bash
npm install @sap-ai-sdk/orchestration
```

### CAP Event Handler with AI (TypeScript/JavaScript)

```typescript
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';
import cds from '@sap/cds';

export default class FeedbackService extends cds.ApplicationService {
  async init() {
    const client = new OrchestrationClient({
      promptTemplating: {
        model: { name: 'gpt-4o' },
        prompt: [
          { role: 'system', content: 'Categorize feedback as JSON: sentiment, category, urgency.' },
          { role: 'user', content: '{{?feedback}}' }
        ]
      }
    });

    this.on('analyzeFeedback', async (req) => {
      const response = await client.chatCompletion({
        placeholderValues: { feedback: req.data.text }
      });
      return response.getContent();
    });

    return super.init();
  }
}
```

### Asynchronous Processing (Critical for Production)

LLM responses can take 30-60 seconds. The BTP load balancer and database connection pool will timeout before the LLM responds. **Never call LLMs synchronously in production CAP services.**

```typescript
this.on('analyzeFeedback', async (req) => {
  // 1. Immediately persist with "processing" status
  const entry = await INSERT.into('FeedbackResults').entries({
    originalText: req.data.text,
    status: 'processing'
  });

  // 2. Spawn background job for LLM call
  cds.spawn(() => this.processWithLLM(entry.ID, req.data.text));

  // 3. Return 202 Accepted
  return req.reply(202, { id: entry.ID, status: 'processing' });
});

async processWithLLM(id: string, text: string) {
  try {
    const response = await this.client.chatCompletion({
      placeholderValues: { feedback: text }
    });
    await UPDATE('FeedbackResults', id).set({
      analysisJson: response.getContent(),
      status: 'completed'
    });
  } catch (error) {
    await UPDATE('FeedbackResults', id).set({
      status: 'failed',
      error: error.message
    });
  }
}
```

### HANA Vector Engine for RAG

Define vector columns in CDS for embedding storage:

```cds
entity Documents {
  key id       : UUID;
  content      : String(5000);
  embedding    : Vector(1536);  // OpenAI ada-002 dimension
  source       : String;
  createdAt    : Timestamp;
}
```

Combine with AI Core orchestration grounding module for production RAG pipelines.

### Prompt Externalization

Do not hardcode prompts in event handlers. Externalize for maintainability:

```cds
entity PromptTemplates {
  key id          : UUID;
  name            : String(100);
  systemPrompt    : LargeString;
  temperature     : Decimal(3,2);
  modifiedAt      : Timestamp;
}
```

This allows prompt tuning without redeployment — update the database row and the next LLM call picks up the change.

### Resilience and Cost Control

| Concern | Pattern |
|---------|---------|
| **LLM timeout** | Async processing with `cds.spawn`, return 202 |
| **LLM failure** | Try/catch with error status in DB, retry logic |
| **Injection attacks** | Validate/sanitize LLM output before DB write |
| **Cost** | Cache frequent responses, use smaller models for simple tasks |
| **Memory** | Allocate minimum 512MB for Node.js containers with AI SDK |

### Local Development

```bash
# Bind to AI Core service instance locally
cds bind -2 <AICORE_INSTANCE> && cds-tsx watch --profile hybrid
```

### Source

These patterns are derived from production deployments documented by CloudDNA and SAP BTP AI best practices.
For complete CAP context, see the **sap-cap-capire** skill. For SDK details, see **sap-cloud-sdk-ai** skill.

---

## Narrow AI Best Practices

### Regression Models

Classical ML for predictions (sales forecasting, demand planning):

- Use SAP AI Core for model training and deployment
- Implement proper feature engineering
- Validate models with held-out test data
- Monitor model drift in production

### Anomaly Detection

Detect outliers in business data:

**Use Cases**:
- Financial transaction monitoring
- Quality control in manufacturing
- Log analysis for system health
- Document outlier detection

**Approaches**:
- Statistical methods (z-score, IQR)
- Machine learning (Isolation Forest, Autoencoders)
- Time-series anomaly detection

---

## AI Services Best Practices

### SAP Document AI

Extract information from documents:

- Invoice processing
- Purchase order extraction
- Contract analysis
- Form recognition

### SAP Translation Hub

Multilingual content translation:

- Configure language pairs
- Handle domain-specific terminology
- Implement async translation for large documents

---

## Use Cases Catalog

The repository includes 20+ end-to-end implementations:

| Category | Use Case | Description |
|----------|----------|-------------|
| **Chatbots & Agents** | agentic-chatbot | Multi-tool AI agent implementation |
| | email-agent | Automated email processing and response |
| | post-sales-chatbot | Customer support automation |
| **Document Processing** | ai-pdf-information-extraction | Extract data from PDF documents |
| | diagram-to-bpmn | Convert diagrams to BPMN format |
| | sales-order-extractor | Extract sales order information |
| | rfqx-doc-analysis-utilities | RFQ document analysis |
| **Procurement** | intelligent-procurement-assistant | AI-powered procurement workflows |
| | intelligent-negotiation-assistant | Negotiation support with AI |
| | vendor-selection-optimization | Optimize vendor selection |
| **Analytics** | anomaly-detection | Detect anomalies in business data |
| | ai-log-analyzer | Analyze system logs with AI |
| | customer-credit-check | AI-assisted credit evaluation |
| | document-outlier-detection | Find outlier documents |
| **Business Process** | ai-powered-email-cockpit | Email classification and routing |
| | utilities-tariff-mapping-cockpit | Tariff mapping automation |
| | touchless-transactions-ai-agent | Automated GR/Invoice workflows |
| | product-catalog-search | AI-enhanced product search |
| | ai-capability-matcher | Match capabilities with AI |

---

## Quick Start

```bash
# Clone the repository
git clone [https://github.com/SAP-samples/sap-btp-ai-best-practices.git](https://github.com/SAP-samples/sap-btp-ai-best-practices.git)
cd sap-btp-ai-best-practices

# Navigate to a specific best practice
cd best-practices/generative-ai/access-to-ai-models/python
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your SAP AI Core service key
python main.py
```

---

## Resources

| Resource | Link |
|----------|------|
| **Documentation Portal** | [https://btp-ai-bp.docs.sap/](https://btp-ai-bp.docs.sap/) |
| **GitHub Repository** | [https://github.com/SAP-samples/sap-btp-ai-best-practices](https://github.com/SAP-samples/sap-btp-ai-best-practices) |
| **Project Catalog** | [https://ai4u-website.cfapps.eu10-004.hana.ondemand.com/project-catalog](https://ai4u-website.cfapps.eu10-004.hana.ondemand.com/project-catalog) |
| **SAP AI Core Documentation** | [https://help.sap.com/docs/sap-ai-core](https://help.sap.com/docs/sap-ai-core) |

---

**License**: Apache-2.0  
**Last Updated**: 2025-11-22  
**Repository**: [https://github.com/secondsky/sap-skills](https://github.com/secondsky/sap-skills)
