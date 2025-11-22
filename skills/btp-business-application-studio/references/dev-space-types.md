# Dev Space Types - Complete Reference

## Table of Contents

1. [Overview](#overview)
2. [SAP Fiori](#sap-fiori)
3. [Full Stack Cloud Application](#full-stack-cloud-application)
4. [Full-Stack Application Using Productivity Tools](#full-stack-application-using-productivity-tools)
5. [SAP HANA Native Application](#sap-hana-native-application)
6. [SAP Mobile Application](#sap-mobile-application)
7. [SAP SME Business Application](#sap-sme-business-application)
8. [Basic](#basic)
9. [Managing Dev Spaces](#managing-dev-spaces)
10. [Documentation Links](#documentation-links)

---

## Overview

Dev spaces are isolated cloud-based development environments functioning as Developer Virtual Appliances. Each contains:
- Tailored development tools
- Pre-installed runtimes
- Scenario-specific configurations
- Security and connectivity instruments

**Key Principle**: Select the dev space type that matches your development scenario. Extensions can be added or removed later.

---

## SAP Fiori

**Purpose**: Develop SAP Fiori applications for Cloud Foundry, ABAP Cloud, and ABAP on-premise environments.

### Predefined Extensions

| Extension | Description |
|-----------|-------------|
| **Basic Tools** | Code editing, file management, split view, window management, preferences |
| **Fiori Freestyle Tools** | Fiori templates, UI5 CLI, Grunt CLI, abap-deploy CLI |
| **SAP Fiori Tools** | Generators, Application Modeler, Guided Development, Service Modeler, XML Annotation Language Server |
| **HTML5 Runner** | Local HTML5 application execution with run configurations |
| **MTA Tools** | Cloud Foundry CLI, MTA Build Tool, deployment plugin |
| **SAPUI5 Layout Editor** | Visual XML view development |
| **SAPUI5 Adaptation Project** | Extend SAPUI5 applications using Adaptation Project |
| **SAPUI5 Extensibility** | Extend SAPUI5 ABAP repository applications |
| **Startup Server** | Trigger-based actions during development |

### Use Cases
- SAP Fiori Elements applications
- Freestyle SAPUI5 applications
- SAP Web IDE project migration
- ABAP deployment scenarios

---

## Full Stack Cloud Application

**Purpose**: Build business services and applications extending SAP S/4HANA using SAP Cloud Application Programming Model (CAP) with Node.js or Java.

### Predefined Extensions

| Extension | Description |
|-----------|-------------|
| **Basic Tools** | Code editing, file management, split view, preferences |
| **CAP Tools** | CDS command-line tools, code editors, database management, application runners |
| **CDS Graphical Modeler** | Visual design of CDS models (entities, types, enums, associations) |
| **Fiori Application** | Yeoman generator for Fiori applications |
| **Fiori Freestyle Tools** | UI5 CLI, Grunt CLI, abap-deploy CLI |
| **SAP Fiori Tools** | Code generation, modelers, visualization |
| **Java Tools** | Java development, testing, debugging, execution |
| **SAP HANA Database Explorer** | Browser interface for HANA runtime objects |
| **MTA Tools** | Cloud Foundry CLI, MTA Build Tool |
| **SAPUI5 Layout Editor** | Visual XML view development |
| **Startup Server** | Trigger-based action execution |

### Use Cases
- CAP Node.js applications
- CAP Java applications
- S/4HANA Cloud extensions
- Full-stack applications with Fiori frontend

---

## Full-Stack Application Using Productivity Tools

**Purpose**: Low-code development with high productivity tools for desktop and mobile applications.

### Predefined Extensions

| Extension | Description |
|-----------|-------------|
| **Basic Tools** | Code editing, file management, split view, preferences |
| **Productivity Tools** | Low-code capabilities for full-stack development |
| **CAP Tools** | CDS command-line and database management |
| **CDS Graphical Modeler** | Visual CDS model design |
| **Mobile Services App Development Tools** | OData service modeling, MDK apps, Mobile Cards |
| **Fiori Freestyle Tools** | UI5 CLI, Grunt CLI, abap-deploy CLI |
| **HTML5 Runner** | Local HTML5 execution |
| **Java Tools** | Java development and debugging |
| **MTA Tools** | Cloud Foundry CLI, MTA Build Tool |
| **SAP Fiori Tools** | Fiori elements development |
| **SAPUI5 Layout Editor** | Visual XML view development |
| **Startup Server** | Trigger-based actions |

### Use Cases
- Rapid application development
- Low-code business applications
- Cross-platform (desktop + mobile) apps

---

## SAP HANA Native Application

**Purpose**: Build and deploy native SAP HANA applications and analytical models.

### Predefined Extensions

| Extension | Description |
|-----------|-------------|
| **Basic Tools** | Code editing, file management, split view, preferences |
| **SAP HANA Tools** | Graphical and text-based editors, project generators, productivity tools |
| **SAP HANA Calculation View Editor** | Edit calculation views, synonyms, analytical privileges |
| **SAP HANA Database Explorer** | Access and inspect HANA runtime objects |
| **SAP HANA Smart Data Integration Tools** | Data federation, replication, transformation |
| **MTA Tools** | Cloud Foundry CLI, MTA Build Tool |
| **Startup Server** | Trigger-based action execution |

### Special Requirements

**HANA Cloud Connection**: SAP Business Application Studio must connect to your SAP HANA Cloud instance. Configuration needed when:
- Working on an Azure account
- Connecting to HANA instance in a different region

Configure SAP HANA Cloud to allow connections from BAS IP addresses. See [Availability](https://help.sap.com/docs/bas/sap-business-application-studio/sap-business-application-studio-availability).

### Use Cases
- Calculation views development
- SQLScript procedures
- HANA database artifact development
- Analytical models

---

## SAP Mobile Application

**Purpose**: Customize, deploy, and manage iOS and Android applications using SAP Mobile Development Kit (MDK).

### Predefined Extensions

| Extension | Description |
|-----------|-------------|
| **Basic Tools** | Code editing, file management, split view, preferences |
| **Mobile Services App Development Tools** | OData service modeling, MDK native apps, SAP Mobile Cards |
| **HTML5 Runner** | Local HTML5 application execution |
| **Java Tools** | Java development and debugging |
| **MTA Tools** | Cloud Foundry CLI, MTA Build Tool |
| **Startup Server** | Trigger-based action execution |

### Use Cases
- Native iOS applications
- Native Android applications
- SAP Mobile Cards content
- OData-based mobile apps

---

## SAP SME Business Application

**Purpose**: Build and extend SME applications using the SME programming model and Business Application Factory.

### Predefined Extensions
- SME programming model tools
- Business Application Factory integration
- Basic development tools

### Use Cases
- SME-specific applications
- Business Application Factory extensions

---

## Basic

**Purpose**: Minimal development environment for basic development needs.

### Predefined Extensions

| Extension | Description |
|-----------|-------------|
| **SAP Basic Tools** | Core development functionality |

### Use Cases
- Simple development tasks
- Custom extension testing
- Minimal resource usage

---

## Managing Dev Spaces

### Creating a Dev Space

1. Open SAP Business Application Studio
2. Click **Create Dev Space**
3. Enter a name (required before activation)
4. Select application type
5. Optionally select additional extensions
6. Confirm creation

### Storage Limits

| Plan | Storage per Dev Space |
|------|----------------------|
| Standard | 10 GB |
| Free | 4 GB |
| Trial | 4 GB |

### Modifying Extensions

1. Open Dev Space Manager
2. Click Edit icon on dev space
3. Dev space must be **STOPPED**
4. Add or remove extensions
5. Save changes

### Downloading Dev Space Content

Available when dev space is:
- **RUNNING**: To save contents
- **ERROR**: To recover data

Process:
1. Click download in Dev Space Manager
2. Generates compressed tar file
3. Save to local machine

### Importing Dev Space Content

1. Create and start new dev space
2. Open Explorer → `/home/user/` folder
3. Upload tar file to projects folder
4. Extract: `tar xvzf <filename.tar.gz>`

### Dev Space States

| State | Description |
|-------|-------------|
| STOPPED | Not consuming resources, files preserved |
| STARTING | Transitioning to running |
| RUNNING | Active, resources allocated |
| ERROR | Problem occurred, data recoverable |
| SAFE MODE | After error recovery download |

---

## Documentation Links

| Resource | URL |
|----------|-----|
| Dev Space Types | https://help.sap.com/docs/bas/sap-business-application-studio/dev-space-types |
| Dev Space Manager | https://help.sap.com/docs/bas/sap-business-application-studio/working-in-dev-space-manager |
| SAP Fiori Dev Space | https://help.sap.com/docs/bas/sap-business-application-studio/sap-fiori |
| Full Stack Cloud Application | https://help.sap.com/docs/bas/sap-business-application-studio/full-stack-cloud-application |
| HANA Native Application | https://help.sap.com/docs/bas/sap-business-application-studio/sap-hana-native-application |
| Mobile Application | https://help.sap.com/docs/bas/sap-business-application-studio/sap-mobile-application |

---

**Last Updated**: 2025-11-22
**Source**: https://github.com/SAP-docs/btp-business-application-studio/tree/main/docs
