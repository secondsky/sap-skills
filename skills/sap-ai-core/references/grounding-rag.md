# Grounding and RAG Reference

Complete reference for SAP AI Core grounding capabilities (Retrieval-Augmented Generation).

**Documentation Source:** https://github.com/SAP-docs/sap-artificial-intelligence/tree/main/docs/sap-ai-core

---

## Overview

Grounding integrates external, contextually relevant data into AI processes, enhancing LLM capabilities beyond general training material using vector databases.

### Key Benefits

- Provide domain-specific context
- Access real-time data
- Reduce hallucinations
- Enable enterprise knowledge retrieval

---

## Architecture

### Indexing Pipeline

```
Documents → Preprocessing → Chunking → Embedding → Vector Database
```

1. Upload documents to supported repository
2. Pipeline preprocesses and chunks documents
3. Embedding model generates vectors
4. Vectors stored in managed vector database

### Retrieval Pipeline

```
User Query → Embedding → Vector Search → Retrieved Chunks → LLM Context
```

1. User query converted to embedding
2. Vector similarity search in database
3. Relevant chunks retrieved
4. Chunks injected into LLM prompt

---

## Supported Data Sources

| Source | Type | Configuration |
|--------|------|---------------|
| **Microsoft SharePoint** | Cloud | Site URL, folder path |
| **AWS S3** | Object storage | Bucket, prefix |
| **SFTP** | File server | Host, path |
| **SAP Build Work Zone** | SAP | Site, content |
| **SAP Document Management** | SAP | Repository, folder |

---

## Document Specifications

### Supported Formats

| Format | Content Types |
|--------|---------------|
| PDF | Text, tables, images |
| HTML | Text, structure |
| TXT | Plain text |
| DOCX | Text, tables |
| PPT/PPTX | Text, tables, images |
| JPEG/JPG | Images with OCR |
| PNG | Images with OCR |
| TIFF | Images with OCR |

### Limits

- **Maximum documents per pipeline:** 2,000
- **Refresh rate:** Daily automatic refresh
- **File size:** Varies by format

---

## Data Management APIs

Three primary APIs for document processing and retrieval:

### Pipelines API

Creates data management pipelines that fetch documents from supported data sources.

| Feature | Description |
|---------|-------------|
| **Purpose** | Automated document fetching, preprocessing, chunking, embedding |
| **Best for** | Documents in external repositories |
| **Output** | Vectors stored in HANA Vector Store |
| **Note** | No need to call Vector API after using Pipelines API |

### Vector API

REST APIs for direct document ingestion and retrieval using vector embeddings.

| Feature | Description |
|---------|-------------|
| **Purpose** | Manual document upload and embedding |
| **Best for** | Directly uploaded/managed documents |
| **Process** | Preprocesses chunks and stores semantic embeddings |

### Retrieval API

Performs similarity searches on the vector database.

| Feature | Description |
|---------|-------------|
| **Purpose** | Information retrieval using semantic search |
| **Works with** | Repositories (Pipelines API) or collections (Vector API) |
| **Output** | Ranked relevant document chunks |

### API Comparison

| Use Case | Recommended API |
|----------|-----------------|
| Documents in SharePoint/S3/SFTP | Pipelines API |
| Direct file uploads | Vector API |
| Custom chunking needed | Vector API |
| Full automation | Pipelines API |

---

## Implementation Options

### Option 1: Pipeline API

Automated document processing pipeline.

#### Create SharePoint Pipeline

```bash
curl -X POST "$AI_API_URL/v2/lm/groundingPipelines" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "hr-policies-pipeline",
    "configuration": {
      "dataSource": {
        "type": "sharepoint",
        "configuration": {
          "siteUrl": "https://company.sharepoint.com/sites/HR",
          "folderPath": "/Documents/Policies"
        }
      },
      "secretName": "sharepoint-credentials"
    }
  }'
```

#### Create S3 Pipeline

```bash
curl -X POST "$AI_API_URL/v2/lm/groundingPipelines" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "knowledge-base-pipeline",
    "configuration": {
      "dataSource": {
        "type": "s3",
        "configuration": {
          "bucket": "my-knowledge-base",
          "prefix": "documents/"
        }
      },
      "secretName": "s3-credentials"
    }
  }'
```

#### Create SFTP Pipeline

```bash
curl -X POST "$AI_API_URL/v2/lm/groundingPipelines" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "docs-sftp-pipeline",
    "configuration": {
      "dataSource": {
        "type": "sftp",
        "configuration": {
          "host": "sftp.company.com",
          "port": 22,
          "path": "/documents"
        }
      },
      "secretName": "sftp-credentials"
    }
  }'
```

### Option 2: Vector API

Direct vector upload for custom chunking/embedding.

#### Create Collection

```bash
curl -X POST "$AI_API_URL/v2/lm/groundingCollections" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "custom-knowledge-base",
    "embeddingConfig": {
      "model": "text-embedding-3-large",
      "dimensions": 1536
    }
  }'
```

#### Add Documents

```bash
curl -X POST "$AI_API_URL/v2/lm/groundingCollections/{collectionId}/documents" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "id": "doc-001",
        "content": "Document chunk text...",
        "metadata": {
          "source": "policy-manual.pdf",
          "page": 5,
          "department": "HR"
        }
      },
      {
        "id": "doc-002",
        "content": "Another chunk...",
        "metadata": {
          "source": "policy-manual.pdf",
          "page": 6,
          "department": "HR"
        }
      }
    ]
  }'
```

#### Add Pre-computed Vectors

```bash
curl -X POST "$AI_API_URL/v2/lm/groundingCollections/{collectionId}/documents" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "id": "doc-001",
        "content": "Document chunk text...",
        "vector": [0.123, -0.456, 0.789, ...],
        "metadata": {"source": "manual.pdf"}
      }
    ]
  }'
```

---

## Creating Secrets

### SharePoint Secret

```bash
curl -X POST "$AI_API_URL/v2/admin/secrets" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "sharepoint-credentials",
    "data": {
      "clientId": "<azure-app-client-id>",
      "clientSecret": "<azure-app-client-secret>",
      "tenantId": "<azure-tenant-id>"
    }
  }'
```

### S3 Secret

```bash
curl -X POST "$AI_API_URL/v2/admin/secrets" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "s3-credentials",
    "data": {
      "AWS_ACCESS_KEY_ID": "<access-key>",
      "AWS_SECRET_ACCESS_KEY": "<secret-key>",
      "AWS_REGION": "us-east-1"
    }
  }'
```

### SFTP Secret

```bash
curl -X POST "$AI_API_URL/v2/admin/secrets" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "sftp-credentials",
    "data": {
      "username": "<username>",
      "password": "<password>"
    }
  }'
```

---

## Using Grounding in Orchestration

### Basic Grounding Configuration

```json
{
  "config": {
    "module_configurations": {
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
      },
      "templating_module_config": {
        "template": [
          {
            "role": "system",
            "content": "Answer based on the following context:\n\n{{$context}}\n\nIf the answer is not in the context, say you don't know."
          },
          {
            "role": "user",
            "content": "{{?user_query}}"
          }
        ]
      },
      "llm_module_config": {
        "model_name": "gpt-4o",
        "model_version": "latest"
      }
    }
  },
  "input_params": {
    "user_query": "What is the vacation policy?"
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
          "data_repositories": ["<specific-repo-id>"],
          "document_metadata": [
            {
              "key": "department",
              "value": "HR"
            },
            {
              "key": "document_type",
              "value": "policy"
            }
          ],
          "search_configuration": {
            "max_chunk_count": 10,
            "max_document_count": 5,
            "similarity_threshold": 0.7
          }
        }
      ]
    }
  }
}
```

### Multiple Pipeline Sources

```json
{
  "grounding_module_config": {
    "grounding_service": "document_grounding_service",
    "grounding_service_configuration": {
      "grounding_input_parameters": ["user_query"],
      "grounding_output_parameter": "context",
      "filters": [
        {
          "id": "<hr-pipeline-id>",
          "search_configuration": {"max_chunk_count": 3}
        },
        {
          "id": "<it-pipeline-id>",
          "search_configuration": {"max_chunk_count": 3}
        },
        {
          "id": "<finance-pipeline-id>",
          "search_configuration": {"max_chunk_count": 3}
        }
      ]
    }
  }
}
```

---

## Search Configuration Options

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `max_chunk_count` | int | Maximum chunks to retrieve | 5 |
| `max_document_count` | int | Maximum source documents | No limit |
| `similarity_threshold` | float | Minimum similarity score (0-1) | 0.0 |

---

## Managing Pipelines

### List Pipelines

```bash
curl -X GET "$AI_API_URL/v2/lm/groundingPipelines" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default"
```

### Get Pipeline Status

```bash
curl -X GET "$AI_API_URL/v2/lm/groundingPipelines/{pipelineId}" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default"
```

**Pipeline Statuses:**
- `PENDING`: Initializing
- `INDEXING`: Processing documents
- `READY`: Available for queries
- `FAILED`: Error occurred

### Delete Pipeline

```bash
curl -X DELETE "$AI_API_URL/v2/lm/groundingPipelines/{pipelineId}" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "AI-Resource-Group: default"
```

---

## Best Practices

### Document Preparation

1. **Clean content**: Remove irrelevant headers, footers, boilerplate
2. **Consistent formatting**: Use clear headings and structure
3. **Metadata tagging**: Add useful metadata for filtering
4. **Regular updates**: Keep documents current

### Chunking Strategy

1. **Semantic chunks**: Break at logical boundaries (sections, paragraphs)
2. **Appropriate size**: 200-500 tokens per chunk typically works well
3. **Overlap**: Consider 10-20% overlap between chunks
4. **Context preservation**: Include section headers in chunks

### Query Optimization

1. **Clear questions**: Rephrase vague queries
2. **Keyword inclusion**: Include relevant technical terms
3. **Context addition**: Add domain context to queries

### Retrieval Tuning

| Use Case | max_chunk_count | similarity_threshold |
|----------|-----------------|---------------------|
| Precise answers | 3-5 | 0.8 |
| Comprehensive | 10-15 | 0.6 |
| Exploratory | 20+ | 0.5 |

---

## Troubleshooting

### No Results Returned

1. Check pipeline status is `READY`
2. Verify documents were indexed successfully
3. Lower similarity threshold
4. Increase max_chunk_count
5. Check metadata filters match documents

### Irrelevant Results

1. Increase similarity threshold
2. Add metadata filters
3. Review document chunking
4. Check embedding model matches query style

### Performance Issues

1. Reduce max_chunk_count
2. Add specific metadata filters
3. Use multiple smaller pipelines
4. Consider pagination for large result sets

---

## Documentation Links

- Grounding Overview: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/grounding-035c455.md
- Pipeline API: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/create-a-document-grounding-pipeline-using-the-pipelines-api-0a13e1c.md
- SharePoint Pipeline: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/create-a-pipeline-with-microsoft-sharepoint-4b8d58c.md
- S3 Pipeline: https://github.com/SAP-docs/sap-artificial-intelligence/blob/main/docs/sap-ai-core/create-a-pipeline-with-aws-s3-7f97adf.md
