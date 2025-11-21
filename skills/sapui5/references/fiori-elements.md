# SAP Fiori Elements Guide

**Source**: Official SAP SAPUI5 Documentation
**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements
**Last Updated**: 2025-11-21

---

## Overview

SAP Fiori Elements provides metadata-driven templates for creating enterprise applications without writing JavaScript UI code. Applications are configured through OData annotations and manifest.json settings.

**Key Benefits**:
- Rapid application development
- Consistent UX across apps
- Automatic updates with framework upgrades
- Reduced maintenance effort
- Built-in best practices

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements

---

## Application Types

### List Report

Displays data in searchable, filterable tables or charts.

**Use Cases**:
- Product catalogs
- Sales orders
- Employee lists
- Any tabular data display

**Key Features**:
- Smart filter bar
- Multi-view (table/chart)
- Export to Excel/PDF
- Variant management
- Mass editing

**Annotations**:
```xml
<!-- In metadata annotations -->
<Annotations Target="Service.Products">
    <!-- Selection fields (filter bar) -->
    <Annotation Term="UI.SelectionFields">
        <Collection>
            <PropertyPath>Category</PropertyPath>
            <PropertyPath>Price</PropertyPath>
            <PropertyPath>Status</PropertyPath>
        </Collection>
    </Annotation>

    <!-- Table columns -->
    <Annotation Term="UI.LineItem">
        <Collection>
            <Record Type="UI.DataField">
                <PropertyValue Property="Value" PropertyPath="ProductID"/>
            </Record>
            <Record Type="UI.DataField">
                <PropertyValue Property="Value" PropertyPath="Name"/>
                <PropertyValue Property="Label" String="Product Name"/>
            </Record>
            <Record Type="UI.DataField">
                <PropertyValue Property="Value" PropertyPath="Price"/>
                <PropertyValue Property="Label" String="Price"/>
            </Record>
            <Record Type="UI.DataFieldForAnnotation">
                <PropertyValue Property="Target" AnnotationPath="@UI.DataPoint#Rating"/>
                <PropertyValue Property="Label" String="Rating"/>
            </Record>
        </Collection>
    </Annotation>
</Annotations>
```

**manifest.json Configuration**:
```json
{
    "sap.ui5": {
        "routing": {
            "targets": {
                "ProductsList": {
                    "type": "Component",
                    "id": "ProductsList",
                    "name": "sap.fe.templates.ListReport",
                    "options": {
                        "settings": {
                            "contextPath": "/Products",
                            "variantManagement": "Page",
                            "initialLoad": true,
                            "tableSettings": {
                                "type": "ResponsiveTable",
                                "selectAll": true
                            }
                        }
                    }
                }
            }
        }
    }
}
```

---

### Object Page

Displays detailed information about a single business object across multiple sections.

**Use Cases**:
- Product details
- Sales order details
- Employee profile
- Any detailed view with related data

**Key Features**:
- Header with key info
- Sections and subsections
- Facets (forms, tables, charts)
- Edit mode
- Actions (approve, reject, etc.)
- Related objects navigation

**Annotations**:
```xml
<Annotations Target="Service.Product">
    <!-- Header info -->
    <Annotation Term="UI.HeaderInfo">
        <Record>
            <PropertyValue Property="TypeName" String="Product"/>
            <PropertyValue Property="TypeNamePlural" String="Products"/>
            <PropertyValue Property="Title">
                <Record Type="UI.DataField">
                    <PropertyValue Property="Value" PropertyPath="Name"/>
                </Record>
            </PropertyValue>
            <PropertyValue Property="Description">
                <Record Type="UI.DataField">
                    <PropertyValue Property="Value" PropertyPath="Description"/>
                </Record>
            </PropertyValue>
        </Record>
    </Annotation>

    <!-- Header facets (quick view) -->
    <Annotation Term="UI.HeaderFacets">
        <Collection>
            <Record Type="UI.ReferenceFacet">
                <PropertyValue Property="Target" AnnotationPath="@UI.DataPoint#Price"/>
            </Record>
            <Record Type="UI.ReferenceFacet">
                <PropertyValue Property="Target" AnnotationPath="@UI.DataPoint#Stock"/>
            </Record>
        </Collection>
    </Annotation>

    <!-- Sections -->
    <Annotation Term="UI.Facets">
        <Collection>
            <!-- General section -->
            <Record Type="UI.CollectionFacet">
                <PropertyValue Property="Label" String="General Information"/>
                <PropertyValue Property="ID" String="GeneralInfo"/>
                <PropertyValue Property="Facets">
                    <Collection>
                        <Record Type="UI.ReferenceFacet">
                            <PropertyValue Property="Target" AnnotationPath="@UI.FieldGroup#General"/>
                        </Record>
                    </Collection>
                </PropertyValue>
            </Record>

            <!-- Related items table -->
            <Record Type="UI.ReferenceFacet">
                <PropertyValue Property="Label" String="Sales Orders"/>
                <PropertyValue Property="Target" AnnotationPath="SalesOrders/@UI.LineItem"/>
            </Record>
        </Collection>
    </Annotation>

    <!-- Field group -->
    <Annotation Term="UI.FieldGroup" Qualifier="General">
        <Record>
            <PropertyValue Property="Data">
                <Collection>
                    <Record Type="UI.DataField">
                        <PropertyValue Property="Value" PropertyPath="ProductID"/>
                    </Record>
                    <Record Type="UI.DataField">
                        <PropertyValue Property="Value" PropertyPath="Category"/>
                    </Record>
                    <Record Type="UI.DataField">
                        <PropertyValue Property="Value" PropertyPath="Price"/>
                    </Record>
                </Collection>
            </PropertyValue>
        </Record>
    </Annotation>
</Annotations>
```

**manifest.json Configuration**:
```json
{
    "sap.ui5": {
        "routing": {
            "targets": {
                "ProductObjectPage": {
                    "type": "Component",
                    "id": "ProductObjectPage",
                    "name": "sap.fe.templates.ObjectPage",
                    "options": {
                        "settings": {
                            "contextPath": "/Products",
                            "editableHeaderContent": true,
                            "showRelatedApps": true
                        }
                    }
                }
            }
        }
    }
}
```

---

### Analytical List Page

Combines visual filters, charts, and tables for analytical data exploration.

**Use Cases**:
- Sales analytics
- Financial reporting
- KPI dashboards
- Performance monitoring

**Key Features**:
- Visual filters (bar, line, donut charts)
- Interactive charts
- Smart filter bar
- Table view
- Drill-down capabilities

**Annotations**:
```xml
<Annotations Target="Service.SalesData">
    <!-- Chart definition -->
    <Annotation Term="UI.Chart">
        <Record>
            <PropertyValue Property="Title" String="Sales by Region"/>
            <PropertyValue Property="ChartType" EnumMember="UI.ChartType/Column"/>
            <PropertyValue Property="Dimensions">
                <Collection>
                    <PropertyPath>Region</PropertyPath>
                </Collection>
            </PropertyValue>
            <PropertyValue Property="Measures">
                <Collection>
                    <PropertyPath>Sales</PropertyPath>
                </Collection>
            </PropertyValue>
        </Record>
    </Annotation>

    <!-- Presentation variant -->
    <Annotation Term="UI.PresentationVariant">
        <Record>
            <PropertyValue Property="Visualizations">
                <Collection>
                    <AnnotationPath>@UI.Chart</AnnotationPath>
                    <AnnotationPath>@UI.LineItem</AnnotationPath>
                </Collection>
            </PropertyValue>
            <PropertyValue Property="SortOrder">
                <Collection>
                    <Record Type="Common.SortOrderType">
                        <PropertyValue Property="Property" PropertyPath="Sales"/>
                        <PropertyValue Property="Descending" Bool="true"/>
                    </Record>
                </Collection>
            </PropertyValue>
        </Record>
    </Annotation>
</Annotations>
```

---

### Overview Page

Card-based dashboard displaying key metrics and lists.

**Use Cases**:
- Executive dashboards
- Overview screens
- KPI monitoring
- Multi-source data aggregation

**Key Features**:
- Cards (list, analytical, table)
- Automatic refresh
- Filter bar
- Navigation to detail apps
- Responsive layout

**Card Configuration**:
```json
{
    "sap.ovp": {
        "cards": {
            "salesCard": {
                "model": "mainService",
                "template": "sap.ovp.cards.charts.analytical",
                "settings": {
                    "title": "Sales by Region",
                    "subTitle": "Current Year",
                    "entitySet": "SalesData",
                    "chartAnnotationPath": "com.sap.vocabularies.UI.v1.Chart",
                    "selectionAnnotationPath": "com.sap.vocabularies.UI.v1.SelectionVariant",
                    "presentationAnnotationPath": "com.sap.vocabularies.UI.v1.PresentationVariant"
                }
            },
            "productsCard": {
                "model": "mainService",
                "template": "sap.ovp.cards.list",
                "settings": {
                    "title": "Top Products",
                    "entitySet": "Products",
                    "listType": "extended",
                    "sortBy": "Sales",
                    "sortOrder": "desc"
                }
            }
        }
    }
}
```

---

### Worklist

Simplified list report for task-oriented applications.

**Use Cases**:
- Task lists
- Approval workflows
- Simple data management
- To-do lists

**Key Features**:
- Table with basic filtering
- Search
- Item count
- Quick navigation
- Simplified UI compared to List Report

---

## Common Annotations

### UI Annotations

**@UI.LineItem**: Table columns
**@UI.SelectionFields**: Filter bar fields
**@UI.HeaderInfo**: Object page header
**@UI.HeaderFacets**: Header quick view
**@UI.Facets**: Object page sections
**@UI.FieldGroup**: Grouped fields
**@UI.DataPoint**: KPI or micro-chart
**@UI.Chart**: Chart definition
**@UI.Identification**: Form fields

### Common Annotations

**@Common.Label**: Field label
**@Common.Text**: Display text for coded values
**@Common.ValueList**: Value help
**@Common.SemanticObject**: Navigation target

### Capabilities Annotations

**@Capabilities.FilterRestrictions**: Filter limitations
**@Capabilities.SortRestrictions**: Sort limitations
**@Capabilities.InsertRestrictions**: Create permissions
**@Capabilities.UpdateRestrictions**: Edit permissions
**@Capabilities.DeleteRestrictions**: Delete permissions

### Communication Annotations

**@Communication.Contact**: Contact information
**@Communication.Address**: Address fields

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: annotations)

---

## Actions

### Standard Actions

Automatically available for editable entities:
- Create
- Edit
- Delete
- Save
- Cancel

### Custom Actions

**OData Action Definition**:
```xml
<Action Name="ApproveOrder" IsBound="true">
    <Parameter Name="_it" Type="Service.SalesOrder"/>
    <ReturnType Type="Service.SalesOrder"/>
</Action>
```

**Annotation**:
```xml
<Annotations Target="Service.SalesOrder">
    <Annotation Term="UI.LineItem">
        <Collection>
            <!-- Regular fields -->
            <Record Type="UI.DataField">
                <PropertyValue Property="Value" PropertyPath="OrderID"/>
            </Record>

            <!-- Action button -->
            <Record Type="UI.DataFieldForAction">
                <PropertyValue Property="Label" String="Approve"/>
                <PropertyValue Property="Action" String="Service.ApproveOrder"/>
                <PropertyValue Property="InvocationGrouping" EnumMember="UI.OperationGroupingType/Isolated"/>
            </Record>
        </Collection>
    </Annotation>
</Annotations>
```

**Determining Actions**:
Actions shown in object page footer:
```xml
<Annotation Term="UI.Identification">
    <Collection>
        <Record Type="UI.DataFieldForAction">
            <PropertyValue Property="Label" String="Approve"/>
            <PropertyValue Property="Action" String="Service.ApproveOrder"/>
            <PropertyValue Property="Determining" Bool="true"/>
        </Record>
    </Collection>
</Annotation>
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: actions)

---

## Draft Handling

Enable users to save incomplete work:

**OData Service**:
```xml
<EntityType Name="SalesOrder">
    <Property Name="OrderID" Type="Edm.Int32"/>
    <Property Name="IsActiveEntity" Type="Edm.Boolean"/>
    <Property Name="HasActiveEntity" Type="Edm.Boolean"/>
    <Property Name="HasDraftEntity" Type="Edm.Boolean"/>
</EntityType>
```

**Annotations**:
```xml
<Annotations Target="Service.SalesOrder">
    <Annotation Term="Common.DraftRoot">
        <Record>
            <PropertyValue Property="ActivationAction" String="Service.draftActivate"/>
            <PropertyValue Property="EditAction" String="Service.draftEdit"/>
            <PropertyValue Property="PreparationAction" String="Service.draftPrepare"/>
        </Record>
    </Annotation>
</Annotations>
```

**Behavior**:
- Edit creates draft copy
- Save updates draft
- Save & Exit activates draft
- Cancel discards draft
- Warning on navigation if unsaved changes

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: draft)

---

## Flexible Column Layout

Multi-column responsive layout for master-detail-detail views:

**manifest.json**:
```json
{
    "sap.ui5": {
        "routing": {
            "config": {
                "routerClass": "sap.f.routing.Router",
                "flexibleColumnLayout": {
                    "defaultTwoColumnLayoutType": "TwoColumnsMidExpanded",
                    "defaultThreeColumnLayoutType": "ThreeColumnsMidExpanded"
                }
            },
            "routes": [
                {
                    "pattern": "",
                    "name": "ProductsList",
                    "target": ["ProductsList"]
                },
                {
                    "pattern": "Products({key})",
                    "name": "ProductDetail",
                    "target": ["ProductsList", "ProductDetail"]
                },
                {
                    "pattern": "Products({key})/Items({itemKey})",
                    "name": "ItemDetail",
                    "target": ["ProductsList", "ProductDetail", "ItemDetail"]
                }
            ]
        }
    }
}
```

**Layout Types**:
- OneColumn
- TwoColumnsBeginExpanded
- TwoColumnsMidExpanded
- ThreeColumnsMidExpanded
- ThreeColumnsEndExpanded

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/10_More_About_Controls (search: flexible-column-layout)

---

## Building Blocks

Reusable UI components for custom pages:

**Usage**:
```xml
<macros:Table
    id="productTable"
    contextPath="/Products"
    metaPath="@com.sap.vocabularies.UI.v1.LineItem"
    readOnly="true"/>

<macros:FilterBar
    id="filterBar"
    contextPath="/Products"
    metaPath="@com.sap.vocabularies.UI.v1.SelectionFields"/>

<macros:Form
    id="productForm"
    contextPath="/Products"
    metaPath="@com.sap.vocabularies.UI.v1.FieldGroup#General"/>
```

**Available Building Blocks**:
- Table
- Chart
- FilterBar
- Form
- Field
- MicroChart
- ValueHelp

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: building-blocks)

---

## Extension Points

Customize Fiori Elements apps without modifying templates:

### Controller Extensions

**manifest.json**:
```json
{
    "sap.ui5": {
        "extends": {
            "extensions": {
                "sap.ui.controllerExtensions": {
                    "sap.fe.templates.ListReport.ListReportController": {
                        "controllerName": "com.mycompany.myapp.ext.ListReportExtension"
                    }
                }
            }
        }
    }
}
```

**ext/ListReportExtension.controller.js**:
```javascript
sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension"
], function(ControllerExtension) {
    "use strict";

    return ControllerExtension.extend("com.mycompany.myapp.ext.ListReportExtension", {
        override: {
            onInit: function() {
                // Custom initialization
            },

            routing: {
                onBeforeBinding: function(oBindingContext) {
                    // Custom logic before binding
                }
            }
        },

        customAction: function() {
            // Custom function
        }
    });
});
```

### Fragment Extensions

Add custom content to specific locations:

**manifest.json**:
```json
{
    "sap.ui5": {
        "extends": {
            "extensions": {
                "sap.ui.viewExtensions": {
                    "sap.fe.templates.ListReport.ListReport": {
                        "ResponsiveTableColumnsExtension::Products": {
                            "className": "sap.ui.core.Fragment",
                            "fragmentName": "com.mycompany.myapp.ext.CustomColumns",
                            "type": "XML"
                        }
                    }
                }
            }
        }
    }
}
```

**ext/CustomColumns.fragment.xml**:
```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core">
    <Column>
        <Text text="Custom Column"/>
    </Column>
</core:FragmentDefinition>
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: extensibility, extension-points)

---

## manifest.json Configuration

**Complete Example**:
```json
{
    "_version": "1.42.0",
    "sap.app": {
        "id": "com.mycompany.products",
        "type": "application",
        "title": "{{appTitle}}",
        "description": "{{appDescription}}",
        "applicationVersion": {
            "version": "1.0.0"
        },
        "dataSources": {
            "mainService": {
                "uri": "/sap/opu/odata/sap/PRODUCT_SRV/",
                "type": "OData",
                "settings": {
                    "annotations": ["annotation"],
                    "localUri": "localService/metadata.xml",
                    "odataVersion": "2.0"
                }
            },
            "annotation": {
                "type": "ODataAnnotation",
                "uri": "annotations/annotation.xml",
                "settings": {
                    "localUri": "annotations/annotation.xml"
                }
            }
        }
    },
    "sap.ui5": {
        "dependencies": {
            "minUI5Version": "1.120.0",
            "libs": {
                "sap.fe.templates": {}
            }
        },
        "models": {
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "settings": {
                    "bundleName": "com.mycompany.products.i18n.i18n"
                }
            },
            "": {
                "dataSource": "mainService",
                "preload": true,
                "settings": {
                    "defaultBindingMode": "TwoWay",
                    "defaultCountMode": "Inline",
                    "refreshAfterChange": false,
                    "metadataUrlParams": {
                        "sap-value-list": "none"
                    }
                }
            }
        },
        "routing": {
            "config": {
                "flexibleColumnLayout": {
                    "defaultTwoColumnLayoutType": "TwoColumnsMidExpanded",
                    "defaultThreeColumnLayoutType": "ThreeColumnsMidExpanded"
                },
                "routerClass": "sap.f.routing.Router"
            },
            "routes": [
                {
                    "pattern": ":?query:",
                    "name": "ProductsList",
                    "target": ["ProductsList"]
                },
                {
                    "pattern": "Products({key}):?query:",
                    "name": "ProductDetail",
                    "target": ["ProductsList", "ProductDetail"]
                }
            ],
            "targets": {
                "ProductsList": {
                    "type": "Component",
                    "id": "ProductsList",
                    "name": "sap.fe.templates.ListReport",
                    "options": {
                        "settings": {
                            "contextPath": "/Products",
                            "variantManagement": "Page",
                            "navigation": {
                                "Products": {
                                    "detail": {
                                        "route": "ProductDetail"
                                    }
                                }
                            },
                            "initialLoad": true,
                            "tableSettings": {
                                "type": "ResponsiveTable",
                                "selectAll": true,
                                "selectionMode": "Multi"
                            }
                        }
                    }
                },
                "ProductDetail": {
                    "type": "Component",
                    "id": "ProductDetail",
                    "name": "sap.fe.templates.ObjectPage",
                    "options": {
                        "settings": {
                            "contextPath": "/Products",
                            "editableHeaderContent": true
                        }
                    }
                }
            }
        }
    },
    "sap.fiori": {
        "registrationIds": [],
        "archeType": "transactional"
    }
}
```

---

## Links to Official Documentation

- **Fiori Elements Overview**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements
- **Annotations**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: annotations)
- **Building Blocks**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: building-blocks)
- **Extensions**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: extensibility)
- **Draft Handling**: https://github.com/SAP-docs/sapui5/tree/main/docs/06_SAP_Fiori_Elements (search: draft)

---

**Note**: This document covers SAP Fiori Elements configuration and usage. For specific templates and advanced scenarios, refer to the official documentation links provided.
