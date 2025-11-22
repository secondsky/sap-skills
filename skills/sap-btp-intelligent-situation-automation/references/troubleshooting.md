# Troubleshooting Guide - SAP BTP Intelligent Situation Automation

**Source**: https://github.com/SAP-docs/sap-btp-intelligent-situation-automation/tree/main/docs
**Last Verified**: 2025-11-22

---

## Overview

This guide covers common errors, their causes, and solutions for Intelligent Situation Automation. For issues not covered here, create an incident with SAP Support.

---

## Support Component

**Component**: CA-SIT-ATM

Use this component when:
- Creating support incidents
- Escalating unresolved issues
- Reporting bugs or defects

---

## Known Errors and Solutions

### Error 1: Server Error on Application Access

**Symptom**:
```
"A server error has occurred. Please try again later"
```

This error appears when accessing the Manage Situation Automation app after onboarding.

**Root Cause**: User lacks required authorization.

**Solution**:
1. Navigate to SAP BTP Cockpit
2. Go to **Security** → **Users**
3. Select the affected user
4. Assign the required role collection:
   - **SituationAutomationKeyUser** for key users
   - **SituationAutomationAdminUser** for administrators
5. User should log out and log in again
6. Retry accessing the application

**Reference**: See `references/security-roles.md` for role assignment details.

---

### Error 2: No Action Applied

**Symptom**:
Resolution Flow in Analyze Situations app shows "No Action Applied"

**Location**: Analyze Situations app → Select situation → Resolution Flow

**Root Cause**: Rule conditions do not match the actual situation data.

**Investigation Steps**:
1. Open **Analyze Situations** app
2. Find the affected situation
3. Review the **Resolution Flow**
4. Check which rules were evaluated
5. Compare rule conditions with actual situation data

**Solution**:
1. Open **Manage Situation Automation** app
2. Find the automation rule for this situation type
3. Review and revise the rule conditions
4. Update conditions to match expected data patterns
5. **Deactivate** the rule
6. **Reactivate** the rule
7. Trigger automation again with current data

**Important Note**: After revising a rule, previously processed situations with "No Action Applied" status will remain in manual processing queue. Only new situations will be evaluated against the updated rule.

---

### Error 3: No Automation Configuration Found

**Symptom**:
Resolution Flow shows "No Automation Configuration Found"

**Location**: Analyze Situations app → Select situation → Resolution Flow

**Root Cause**: No automation configuration exists in SAP BTP for the triggered situation type.

**Investigation Steps**:
1. Open **Manage Situation Automation** app
2. Check if the situation type appears in the list
3. Verify if automation is configured and activated

**Solution**:
1. Open **Manage Situation Automation** app
2. Find the situation type (or add if missing)
3. Configure automation:
   - Enable automation for the type
   - Create rules with conditions
   - Assign actions to execute
4. Activate the automation configuration
5. New situations of this type will now be automated

---

## Onboarding Issues

### Connection Test Fails

**Symptom**: "Check Connection" fails in Onboard System app

**Possible Causes**:
| Cause | Check |
|-------|-------|
| Destination URL incorrect | Verify base URL only (no paths) |
| Authentication failure | Check credentials in destination |
| Network connectivity | Verify Cloud Connector (on-premise) |
| APIs not exposed | Confirm SAP_COM_0345/0376 configured |

**Solutions**:
1. Review destination configuration in BTP Cockpit
2. Ensure URL contains only base URL
3. Verify authentication credentials
4. For on-premise: Check Cloud Connector status
5. Verify communication arrangements in S/4HANA

### Onboarding Status: Failed

**Symptom**: Onboarding status shows "Failed" after creation

**Diagnosis**:
1. Hover over the **info icon** next to the failed system
2. Read the error details displayed

**Common Causes and Solutions**:

| Error Detail | Solution |
|--------------|----------|
| Destination not found | Create/correct destination in BTP Cockpit |
| Connection refused | Check network/Cloud Connector |
| Authentication failed | Update credentials in destination |
| API not available | Expose APIs in S/4HANA |

**Retry Process**:
1. Fix the identified issue
2. Click **Retry** on the failed system
3. Monitor for success

**Persistent Failures**: After multiple retry attempts, create incident with component **CA-SIT-ATM**.

---

## Event Mesh Issues

### Events Not Received

**Symptom**: Situations not appearing in ISA despite being created in S/4HANA

**Check List**:
| Check | Action |
|-------|--------|
| Event Mesh instance | Verify instance in same subaccount |
| Event channel | Confirm channel created in S/4HANA |
| Topic bindings | Verify BusinessSituation topics bound |
| Topic rules | Check subscribeFilter includes `saas/isa/cons/*` |

### Topic Binding Errors

**Symptom**: Error when binding topics in S/4HANA

**Solution**:
1. Verify Event Mesh service key is valid
2. Confirm topic space is `saas/isa/cons`
3. Check correct topic patterns:
   - `sap/s4/beh/businesssituation/v1/BusinessSituation/*`
   - `sap/s4/beh/businesssituationtype/v1/BusinessSituationType/*`

---

## Role and Access Issues

### Missing Tiles/Apps

**Symptom**: Some tiles not visible in launchpad

**Cause**: Missing role collection assignment

**Solution**: Assign appropriate role collection:
| Missing Access | Required Role |
|----------------|---------------|
| Operational tiles | SituationAutomationKeyUser |
| Onboard System | SituationAutomationAdminUser |
| Rule authoring | RuleRepositorySuperUser |

### Cannot Edit Rules

**Symptom**: Rule editing functions disabled

**Cause**: Missing RuleRepositorySuperUser role

**Solution**: Add RuleRepositorySuperUser role collection to user

---

## Automation Execution Issues

### Action Execution Failed

**Symptom**: Resolution Flow shows failed action

**Investigation**:
1. Open Analyze Situations app
2. Review Resolution Flow details
3. Check error message from action

**Common Causes**:
| Cause | Solution |
|-------|----------|
| Target endpoint unreachable | Verify destination and connectivity |
| Authentication failed | Check credentials in action configuration |
| Invalid parameters | Review action parameter mapping |
| Timeout | Increase timeout or optimize action |

### Wrong Action Executed

**Symptom**: Different action executed than expected

**Investigation**:
1. Review all rules for the situation type
2. Check rule priorities
3. Verify condition logic

**Solution**:
1. Adjust rule conditions for specificity
2. Update rule priorities
3. Test with sample situation

---

## Diagnostic Tools

### Analyze Situations App

Use for detailed situation analysis:
- Resolution Flow visualization
- Rule evaluation history
- Action execution details

### Audit Log Viewer

Use for tracking changes:
- Configuration modifications
- System onboarding events
- User actions

### Situation Dashboard

Use for monitoring:
- Overall automation status
- Resolution rates
- Trend analysis

---

## Troubleshooting Checklist

### Before Contacting Support

- [ ] Verified user has required role collections
- [ ] Checked Resolution Flow in Analyze Situations
- [ ] Reviewed destination configuration
- [ ] Confirmed Event Mesh connectivity
- [ ] Checked audit logs for errors
- [ ] Attempted retry/reconfiguration
- [ ] Documented steps to reproduce

### Information to Include in Incident

1. **Error message** (exact text)
2. **Application** where error occurred
3. **User** experiencing the issue
4. **Timestamp** of occurrence
5. **Steps to reproduce**
6. **Screenshots** if applicable
7. **Subaccount ID** and region
8. **S/4HANA system** details

---

## FAQ

### Q: How long before situations appear after onboarding?

**A**: Situations should appear within minutes after successful onboarding and proper event channel configuration. If not:
1. Verify Event Mesh configuration
2. Check topic bindings
3. Create a test situation in S/4HANA to verify flow

### Q: Can I connect multiple S/4HANA systems to one subaccount?

**A**: No. Each subaccount can connect to only one S/4HANA system. Use separate subaccounts for different systems.

### Q: How do I change the connected S/4HANA system?

**A**: Either:
1. Create a new subaccount for the new system, or
2. Unsubscribe from ISA and resubscribe with new destination

### Q: Why are old situations not processed by new rules?

**A**: Rules only apply to new situations. Situations processed before rule changes retain their original status.

---

## External Links

- **SAP for Me**: https://me.sap.com/ (incident creation)
- **SAP Community**: https://community.sap.com/
- **SAP Help**: https://help.sap.com/docs/intelligent-situation-automation

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-22
