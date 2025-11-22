# SAP BTP Glossary

Complete terminology reference for SAP Business Technology Platform.

**Source**: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/glossary-e67a143.md

---

## A

### Application
Software hosted on SAP BTP used by business users to complete tasks. Created by developers utilizing platform services.

### Application Router
Single entry point for applications in Cloud Foundry environment. Handles static content serving, user authentication, URL rewriting, and request forwarding to microservices.

### Availability
The durability and operational performance without failure of a system or component for an agreed amount of time, as defined in the contract.

### Availability Zone (AZ)
A physically isolated location with independent power, network, and cooling infrastructure that acts as an individual failure domain within a region.

---

## B

### Block-hours
A measurement unit representing one compute block's runtime for one hour. Multiple blocks multiply the count accordingly.

### Booster
A set of guided interactive steps that enable you to select, configure, and consume services on SAP BTP to achieve a specific technical goal.

### btp CLI
The command line tool for all tasks on global account, directory, and subaccount level, such as creating or updating subaccounts, authorization management, and working with service brokers and platforms.

### Buildpack
Provides framework and runtime support for applications in the Cloud Foundry environment.

### Business Service
Platform services that enable, facilitate, or accelerate the development of business process components and elements of an application.

---

## C

### Cloud Connector
Serves as the link between on-demand applications in SAP BTP and existing on-premise systems. Lightweight agent establishing secure tunnel.

### Cloud Foundry CLI
Command-line interface tool for deploying and managing applications in the Cloud Foundry environment.

### Cloud Management Tools
Technologies designed for managing SAP BTP. Internally known as Foundation.

### Cockpit
The central point of entry to key information about your accounts and applications, and for managing all activities associated with your account.

### Connectivity
Provides secure, reliable access to business systems or remote services running on-premises or in the cloud.

---

## D

### Destination
A configuration that contains the connection details for a remote communication partner. Allows separation of application code from configuration.

### Disaster
An event declared by SAP when there is a loss of utilities and services, and uncertainty about whether they can be restored within a reasonable period of time.

### Disaster Recovery (DR)
A set of policies, tools, and procedures to protect applications by preserving and rapidly resuming their availability in case of a disaster.

### Durability
The ability of a system to permanently store data without loss or corruption.

---

## E

### Enterprise Account
An enterprise account is usually associated with one SAP customer or partner and is typically subject to charges.

### Entitlement
Your right to provision and consume a resource (service plan) on SAP BTP.

### Environment
Constitutes the SAP BTP actual Platform-as-a-Service offering that allows for the development and administration of applications.

---

## F

### Failover
The automated or manually triggered process of switching from one system to another redundant system in case of an unexpected or planned downtime.

### Formation
A logical grouping of SAP systems that can be extended in a single business scenario. Enables communication between systems.

---

## G

### Global Account
The realization of a contract you made with SAP. A global account is region- and environment-independent, and it is used to manage subaccounts, members, entitlements and quotas.

---

## I

### Identity Provider (IdP)
An authorization authority containing all user information and credentials. In SAP BTP, user information is provided by identity providers, not stored in SAP BTP itself.

### In-Metro Disaster Recovery
Solution using synchronous data replication across multiple AZs within a single region to protect against localized disasters.

---

## K

### Kyma Environment
A fully managed cloud-native Kubernetes application runtime based on the open-source project Kyma.

### Kyma Module
Modular component that can be selectively installed on a Kyma cluster to provide specific functionality.

---

## M

### Member
Indicates a user's assignment to an account. As an account member, a user automatically has the permissions required to use the SAP BTP functionality within the scope of the respective account and as permitted by their account member roles.

### Multi-Target Application (MTA)
A package consisting of multiple modules that are deployed together on SAP BTP.

---

## O

### OAuth
Widely adopted security protocol for protecting resources over the Internet, used by social networks and corporate networks.

### Org (Organization)
A hierarchical level in the account structure of SAP BTP using a Cloud Foundry subaccount. Each Cloud Foundry subaccount contains exactly one Cloud Foundry org.

---

## P

### Platform Service
Software that enables, facilitates, or accelerates the development of applications and other platform services on SAP BTP.

### Platform User
User who manages and administers SAP BTP (developer, administrator, operator).

### Principal Propagation
Forwarding of user identity from one system to another for single sign-on and authorization.

### Programming Model
A set of concepts, languages, runtimes, and APIs used to create applications on SAP BTP.

---

## Q

### Quota
A numeric quantity that defines the maximum allowed consumption of a specific technical asset/resource.

---

## R

### Region
A geographical location (e.g., Europe, US East) where applications, data, or services are hosted. Usually consists of two or more availability zones.

### Resilience
The ability to provide and maintain an acceptable level of service in the face of faults and challenges until normal operation is restored.

### Role Collection
A group of roles assigned to users or groups to grant specific authorizations.

### Runtime
An engine or context for executing programs, such as Java Web Tomcat or Node.js.

---

## S

### SAP BTP, Cloud Foundry Environment
An open Platform-as-a-Service, which provides a scalable runtime container and a choice of clouds, runtimes, and services.

### SAP BTP, Kyma Runtime
A runtime developers can use to build cloud-native Kubernetes-based extensions to SAP by using microservices and serverless Functions.

### SAP BTP, Neo Environment
An enterprise Platform-as-a-Service providing a range of services (sunsetting December 31, 2028).

### SAP Cloud Application Programming Model (CAP)
A framework of languages, libraries, and tools for building enterprise-grade services and applications. Supports Java, JavaScript, and TypeScript.

### SAP ID Service
The default identity provider for SAP BTP applications. Manages the user base for SAP Community Network and other SAP websites.

### SAPUI5
A development toolkit providing UI controls for developing Web applications.

### Service Broker
When a developer provisions and binds a service to an application, the service broker for that service is responsible for providing the service instance and for binding services to applications.

### Service Plan
A variant of a service; for example, a database may be configured with various "t-shirt sizes", each of which is a different service plan.

### Shadow User
A copy of a user from an identity provider stored in SAP BTP for authorization purposes.

### Space
In the Cloud Foundry environment, every application and service is scoped to a space. A space provides users with access to a shared location for application development, deployment, and maintenance.

### Staging
The process in the Cloud Foundry environment by which the raw bits of an application are transformed into a droplet that is ready to execute.

### Subaccount
Lets you structure a global account according to customer requirements with regards to members, authorizations and quotas. Where actual deployments occur.

---

## T

### Technical Service
Platform services that enable, facilitate, or accelerate the generic development of an application, independent of the application's business process or task.

### Tool
A means for users to develop, configure, monitor and administer a service or entities managed by a service.

### Trial Account
90-day complimentary platform exploration with restricted resources.

---

## U

### User-Provided Service Instance
User-provided service instances enable you to use services that are not available in the marketplace with your applications running in the Cloud Foundry environment.

---

## X

### XSUAA
SAP Authorization and Trust Management Service. OAuth 2.0 authorization server for SAP BTP applications.

### xs-security.json
Application security descriptor defining scopes, roles, and attributes for XSUAA.

---

## Related Documentation

- Basic Concepts: https://github.com/SAP-docs/btp-cloud-platform/tree/main/docs/10-concepts
- Full Glossary: https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/glossary-e67a143.md
