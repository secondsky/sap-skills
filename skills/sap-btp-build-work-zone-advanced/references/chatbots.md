# Chatbot Integration Guide

> **⚠️ DEPRECATION NOTICE**: SAP Conversational AI entered maintenance/sunset mode as of January 2023. Functionality may be limited or deprecated. Verify current support status before implementing custom chatbots. See [SAP Product Availability Matrix](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/product-availability-matrix.html) for lifecycle details. Consider SAP Build Apps or other alternatives for new implementations.

Complete guide for integrating and configuring chatbots in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/50-Chatbots

## Table of Contents

- [Overview](#overview)
- [Built-in Capabilities](#built-in-capabilities)
- [Prerequisites](#prerequisites)
- [Chatbot Options](#chatbot-options)
- [Custom Chatbot Development](#custom-chatbot-development)
- [SAP Conversational AI Configuration](#sap-conversational-ai-configuration)
- [Chatbot Integration Steps](#chatbot-integration-steps)
- [OAuth Client Setup](#oauth-client-setup)
- [Webhook Configuration](#webhook-configuration)
- [Chatbot Testing](#chatbot-testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

Chatbots help users accomplish tasks through conversational interaction. They support custom training, actions, and card rendering within SAP Build Work Zone.

## Built-in Capabilities

Default chatbot features include:
- Workspace creation
- Leave request processing
- Business news delivery
- Content searching
- Entertainment (jokes, weather updates)

---

## Chatbot Types

### SAP Build Work Zone Chatbot (Recommended)

Pre-built chatbots with built-in functionalities:

| Variant | Features |
|---------|----------|
| Full-featured | All capabilities enabled |
| Workspace Creation | Workspace management only |
| Business News | News delivery only |
| Search | Content search only |
| Leave Requests | Leave management only |
| Smart Talk | Conversational features |

### Custom Chatbots

Build independent chatbots using SAP Conversational AI platform:
- URL: https://cai.tools.sap/
- Custom training and intents
- Organization-specific actions

> **Note**: SAP Conversational AI is in maintenance mode since January 2023. Verify support status before starting new implementations.

---

## Implementation Process

### Step 1: Fork Chatbot Repository

Development begins by copying a base chatbot repository:
- Creates independent branch for customization
- Can fork entire bots or specific intents only

### Step 2: OAuth Registration

Authorize chatbot to access APIs:
1. Navigate to Administration Console
2. Go to External Integrations > OAuth Clients
3. Register client credentials
4. Configure required scopes

### Step 3: Alias Account Setup

Create system user account for chatbot:
1. Go to User Management > Alias Accounts
2. Create new alias account
3. Configure permissions
4. Add OAuth2 Access Token
5. Link token to chatbot

### Step 4: Configure Push Notifications

Set up event-triggered notifications:

| Category | Events |
|----------|--------|
| Alias Account | Account-related events |
| Content | Content creation/modification |
| Workspace | Workspace activities |
| Forum | Discussion events |

---

## Webhook Configuration

Webhooks enable chatbots to invoke SAP Build Work Zone services.

### Webhook URL Format

```
https://<host-url>/api/v2/ai/webhook
```

Example: `https://dwpdev1.sapjam-integration.com/api/v2/ai/webhook`

### Authorization

- Add OAuth token from Alias Account in Headers tab
- Token must have appropriate scopes for desired actions

### Available Template Variables

| Variable | Description |
|----------|-------------|
| `{{participant_data.jamId}}` | Current user's Jam/Work Zone ID |
| `{{participant_data.email}}` | Current user's email address |
| `{{conversation_id}}` | Current conversation identifier |

### Payload Structure

All webhook payloads require three mandatory components:

```json
{
  "action": "perform_actions",
  "context": {
    "senderId": "{{participant_data.jamId}}"
  },
  "parameters": {
    // Action-specific parameters
  }
}
```

---

## Chatbot Actions

### Supported Actions

| Action | Purpose |
|--------|---------|
| `perform_actions` | Execute platform actions |
| `ui5_card` | Render UI Integration Cards |
| `create_workspace` | Create new workspace |
| `get_workspace_templates` | Retrieve available templates |

### Create Workspace Action

```json
{
  "action": "perform_actions",
  "context": {
    "senderId": "{{participant_data.jamId}}"
  },
  "parameters": {
    "actionName": "create_workspace",
    "name": "Workspace Name",
    "is_private": false,
    "template": "template_id"
  }
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| actionName | Yes | Fixed: "create_workspace" |
| name | Yes | AI-derived from user input |
| is_private | No | Privacy setting |
| template | No | Template ID to use |

### Get Workspace Templates Action

```json
{
  "action": "perform_actions",
  "context": {
    "senderId": "{{participant_data.jamId}}"
  },
  "parameters": {
    "actionName": "get_workspace_templates"
  }
}
```

---

## Rendering Cards with Chatbots

Chatbots can render UI Integration Cards for enhanced user experiences.

### Supported Card Types

- Leave request cards
- Business News cards
- Search result cards
- Custom cards

### Card Setup Process

1. **Upload Card**: Administration Console → UI Integration → Cards & Widgets → Upload Card
2. **Get Card ID**: Copy unique card identifier from Administration Console
3. **Configure Webhook**: Add card ID to chatbot payload

### Card Rendering Payload

```json
{
  "action": "ui5_card",
  "context": {
    "senderId": "{{participant_data.jamId}}"
  },
  "parameters": {
    "cardId": "sap.dwp.test.card.searchResult",
    "widgetType": "sapCard"
  }
}
```

| Parameter | Required | Values |
|-----------|----------|--------|
| cardId | Yes | Unique card identifier |
| widgetType | No | "sapCard" or "sapWidget" (default) |

---

## SAP Conversational AI Integration

> **Note**: SAP Conversational AI entered maintenance mode in January 2023. This section is provided for existing implementations only.

### Connector Setup

1. Access SAP Conversational AI platform
2. Use built-in "SAP Jam Collaboration" connector
3. Configure connection to SAP Build Work Zone

### Configuration Steps

1. Go to Build > [Your Bot] > Webhook Configuration
2. Enter webhook URL
3. Add OAuth token in Headers
4. Configure payload in Body tab

### Configuration Location

Administration Console > External Integrations > Chatbot Configuration

---

## Chatbot Launcher

### Enabling Chatbot

1. Configure chatbot in Administration Console
2. Enable Chatbot Launcher feature
3. Chatbot icon appears in bottom-right corner

### User Access

- Available on most pages (except Applications page)
- Multiple bots can be configured
- Users select preferred bot from list

### Interface Controls

| Control | Function |
|---------|----------|
| Switch | Change between configured bots |
| Fullscreen | Toggle fullscreen mode |
| Close | Close chatbot window |
| Send | Submit message (Ctrl+Enter / Cmd+Enter) |

---

## Fallback Handling

When chatbot cannot understand a request:
- Returns fallback message
- Indicates incomprehension
- Suggests alternative phrasing

---

**Documentation Links**:
- Chatbots: https://help.sap.com/docs/build-work-zone-advanced-edition
- SAP Conversational AI: https://cai.tools.sap/ (sunset/maintenance mode since Jan 2023)
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced/tree/main/docs/50-Chatbots
