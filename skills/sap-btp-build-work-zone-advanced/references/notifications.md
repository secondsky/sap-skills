# Notifications Guide

Complete guide for configuring and managing notifications in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced

---

## Overview

SAP Build Work Zone provides multiple notification mechanisms to keep users informed about important updates, invitations, and approval requests.

---

## Notification Types

### Bell Notifications

- No setup required
- Alerts for important updates
- Invitation notifications
- Approval request notifications
- Accessible from top navigation bar

### Email Notifications

Configured through: User Actions Menu → Settings → Advanced Settings → Email

---

## Email Notification Configuration

### Settings Tabs

#### Notifications Tab

Select events for email notifications:
- Activity that involves you
- Daily Summary Emails
- System notifications

#### Workspace Notifications Tab

- Configure frequency for all workspaces
- Individual workspace notification settings
- Override global settings per workspace

#### Collaboration Tab

- Update home feed preferences
- Select sender email address
- Configure collaboration alerts

---

## Mention Notifications

### @mention

Notify specific users:
- Context-aware filtering
- Workspace members
- All users (based on permissions)
- Inline mention in content

### @@notify

Notify multiple users simultaneously:
- Workspace members notification
- Followers notification
- Bulk notification capability

---

## Notification Categories

| Category | Description |
|----------|-------------|
| Social Updates | Mentions, replies, likes |
| Invitations | Workspace invitations, event invitations |
| Requests | Join workspace, content approval |
| Tasks | Assignments, reminders, due dates |
| Informational | Featured status, access grants |

---

## Webhook Notifications

### Configuration Location

Administration Console → External Integrations → Webhook-based Notifications

### Webhook Events

Configure webhooks for:
- Content events
- Workspace events
- User events
- System events

### Webhook Setup

1. Navigate to External Integrations
2. Configure webhook endpoint URL
3. Select events to trigger
4. Configure authentication

---

## Push Notifications

### Chatbot Push Notifications

Configure event-triggered notifications for chatbots:

| Category | Events |
|----------|--------|
| Alias Account | Account-related events |
| Content | Content creation/modification |
| Workspace | Workspace activities |
| Forum | Discussion events |

---

## Best Practices

### User Experience

1. Configure appropriate notification frequency
2. Avoid notification overload
3. Use @mention for targeted notifications
4. Leverage daily summaries for non-urgent updates

### Administration

1. Review notification policies
2. Configure default notification settings
3. Monitor webhook reliability
4. Test notification delivery

---

**Documentation Links**:
- Notifications: https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/about-notifications
- Notification Service Integration: https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/integrating-with-central-services
- SAP Learning - Notifications: https://learning.sap.com/learning-journeys/developing-with-sap-extension-suite (search "notifications")
- GitHub: https://github.com/SAP-docs/sap-btp-build-work-zone-advanced
