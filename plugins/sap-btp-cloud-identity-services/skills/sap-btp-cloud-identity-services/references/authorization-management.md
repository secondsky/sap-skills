# Authorization Management (AMS) — Complete Reference

**Source**: [Configuring Authorization Policies](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configuring-authorization-policies), [Data Control Language (DCL)](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/data-control-language-dcl), [Developing Authorizations](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/developing-authorizations)

---

## Overview

Authorization Management (AMS) enables policy-based, instance-level authorization for SAP BTP applications. Unlike traditional scope-based authorization (XSUAA), AMS uses policies defined in **Data Control Language (DCL)** — an SQL-like language — to express fine-grained access rules based on user attributes, business object attributes, and context.

---

## Policy Lifecycle

| Step | Role | Tool |
|------|------|------|
| Define authorization policies | Developer | Development environment |
| Deploy policies with the application | Developer | Deployment pipeline |
| Refine policy restrictions | Administrator | IAS admin console |
| Assign policies to users | Administrator | IAS admin console / groups |
| Delete custom policies | Administrator | IAS admin console |

---

## Data Control Language (DCL)

DCL is an SQL-like language for defining authorization policies. Developers write DCL as part of the application and deploy it alongside the business logic.

### Policy Structure

A DCL policy consists of:
- **Policy name** — unique identifier within the package
- **Rules** — `USE` rules define which operations are permitted
- **Restrictions** — `WHERE` clauses filter accessible data based on conditions
- **Attributes** — user attributes, business object attributes, or fixed values

### DCL Syntax

```sql
DEFINE POLICY <policy-name>
  AS (SELECT FROM <entity>
      WHERE <condition>);
```

### Example: Sales Order Access

```sql
DEFINE POLICY SalesOrderPolicy
  AS (SELECT FROM Sales.Orders
      WHERE buyer = CONTEXT('userIdentityLogonName'));
```

This policy restricts access to only the sales orders where the buyer matches the logged-in user.

### Example: Regional Access with Role

```sql
DEFINE POLICY RegionalAccess
  AS (SELECT FROM Customers
      WHERE region = CONTEXT('userAttributes.region')
        AND CONTEXT('userGroups') HAS 'SalesTeam');
```

### Context Functions

| Function | Returns |
|----------|---------|
| `CONTEXT('userIdentityLogonName')` | Login name of the authenticated user |
| `CONTEXT('userAttributes.<attr>')` | User attribute value from the identity directory |
| `CONTEXT('userGroups')` | Groups the user belongs to |
| `CONTEXT('issuer')` | Token issuer |

---

## Policy Types

### Base Authorization Policy

Delivered with the application by the developer. Cannot be modified or deleted by administrators. Administrators can copy it to create a custom policy.

### Custom Authorization Policy

Created by administrators in the IAS admin console. Can be modified and deleted. Created by copying a base policy or combining multiple policies.

### Package Naming

- **Application-defined packages** — named by the application, contain base policies
- **Customer Package** — customer-developed policies created in the admin console

---

## Configuration Options

Administrators can:

- **Combine policies** — merge rules from multiple policies into a new one
- **Add/delete rules** — modify which operations a policy covers
- **Restrict rules** — add `WHERE` conditions to existing rules
- **Manage attribute values** — set fixed values or map to user attributes
- **Assign policies to users** — directly or via groups

### Assigning Policies to Users

1. In IAS admin console, go to **Authorization Policies**
2. Select the policy
3. Choose **Assign** > **Add Users** or **Add Groups**
4. Search and select users/groups from the Identity Directory
5. Save

Alternatively, use the SCIM API of the Identity Directory to assign groups that have policies attached.

*Source: [Assign Authorization Policies](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/assign-authorization-policies)*

---

## CAP Integration

CAP (Cloud Application Programming Model) supports AMS authorization policies. The integration flow:

### 1. Define Policies in CDS

CAP applications can define authorization requirements using `@restrict` annotations in CDS:

```cds
entity Orders {
  @restrict: [
    { grant: ['READ'], where: 'buyer = $user' }
  ]
  ...
}
```

CAP compiles these into DCL policies when deploying with AMS support.

### 2. Enable AMS in CAP

In `cds-security.json` or via the Identity service binding:
- Use the Identity service (IAS-based) instead of XSUAA
- Enable AMS policy deployment
- CAP automatically generates DCL from `@restrict` annotations

### 3. Deploy

CAP deploys the application with generated DCL policies to SAP BTP. The policies appear in the IAS admin console.

*Source: [CAP IAS/XSUAA Guide](https://cap.cloud.sap/docs/guides/integration/platform/ias-xsuaa)*

---

## AMS vs XSUAA Authorization

| Aspect | XSUAA (Scopes) | AMS (Policies) |
|--------|----------------|----------------|
| Granularity | Coarse (scopes only) | Fine-grained (instance-level) |
| Definition | `xs-security.json` role templates | DCL policies in code |
| Assignment | Role collections via BTP cockpit | Policies via IAS admin console |
| Context | Role-based only | Role + user attributes + business data |
| Instance-based | Not supported | Supported via DCL `WHERE` conditions |
| Recommended for | Legacy applications | New BTP applications |

---

## Administration Console Navigation

Access authorization policies in the IAS admin console:

1. Sign in to `https://<tenant>.accounts.ondemand.com/admin`
2. Navigate to **Applications & Resources** > **Authorization Policies**
3. Filter by application or package
4. Select a policy to view rules, restrictions, and assignments

From this view, administrators can:
- Create custom policies (copy from base)
- Combine policies
- Edit restrictions and attribute values
- Assign/unassign users and groups
- Delete custom policies

*Source: [Configuring Authorization Policies](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/configuring-authorization-policies)*
