# SAPUI5 Data Binding & Models

**Source**: Official SAP SAPUI5 Documentation
**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials
**Last Updated**: 2025-11-21

---

## Data Binding Overview

Data binding connects UI controls to data sources, automatically synchronizing changes bidirectionally.

**Key Benefits**:
- Automatic UI updates when data changes
- Reduced boilerplate code
- Clean separation of data and presentation
- Type conversion and formatting
- Validation support

**Binding Types**:
1. **Property Binding**: Single value (text, enabled, visible)
2. **Aggregation Binding**: Collections (table items, list items)
3. **Element Binding**: Object context
4. **Expression Binding**: Inline calculations

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: binding, data-binding)

---

## Binding Modes

**One-Way Binding**:
- Data flows model → view only
- UI updates when model changes
- User input doesn't update model
- Use for read-only data

```javascript
// In manifest.json
"models": {
    "": {
        "dataSource": "mainService",
        "settings": {
            "defaultBindingMode": "OneWay"
        }
    }
}
```

**Two-Way Binding**:
- Data flows model ↔ view bidirectionally
- Model updates when user changes input
- View updates when model changes
- Use for editable forms

```javascript
"defaultBindingMode": "TwoWay"
```

**One-Time Binding**:
- Data loaded once at initialization
- No updates after initial load
- Best performance for static data

```xml
<Text text="{path: '/title', mode: 'OneTime'}"/>
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: binding-mode)

---

## Model Types

### JSON Model

Client-side model for JavaScript objects. Best for small datasets and local data.

**Creation**:
```javascript
// In controller
var oModel = new JSONModel({
    products: [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 }
    ],
    selectedProduct: null
});

this.getView().setModel(oModel);
```

**From File**:
```javascript
var oModel = new JSONModel();
oModel.loadData("model/data.json");
this.getView().setModel(oModel);
```

**Usage**:
```xml
<List items="{/products}">
    <StandardListItem
        title="{name}"
        description="Price: {price}"/>
</List>
```

**Key Methods**:
- `setData(oData)`: Set complete data
- `setProperty(sPath, oValue)`: Set single property
- `getProperty(sPath)`: Get property value
- `loadData(sURL)`: Load from URL

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: json-model)

---

### OData V2 Model

Server-side model for OData v2 services. Automatic CRUD operations.

**Creation**:
```javascript
// In manifest.json
{
    "sap.app": {
        "dataSources": {
            "mainService": {
                "uri": "/sap/opu/odata/sap/SERVICE_SRV/",
                "type": "OData",
                "settings": {
                    "odataVersion": "2.0",
                    "localUri": "localService/metadata.xml"
                }
            }
        }
    },
    "sap.ui5": {
        "models": {
            "": {
                "dataSource": "mainService",
                "settings": {
                    "defaultBindingMode": "TwoWay",
                    "defaultCountMode": "Inline",
                    "useBatch": true
                }
            }
        }
    }
}
```

**Reading Data**:
```javascript
// Simple read
this.getView().getModel().read("/Products", {
    success: function(oData) {
        console.log(oData);
    },
    error: function(oError) {
        MessageBox.error("Failed to load data");
    }
});

// With filters and sorters
this.getView().getModel().read("/Products", {
    filters: [new Filter("Price", FilterOperator.GT, 100)],
    sorters: [new Sorter("Name", false)],
    urlParameters: {
        "$expand": "Category"
    },
    success: function(oData) {
        console.log(oData);
    }
});
```

**Creating Entries**:
```javascript
var oModel = this.getView().getModel();
oModel.create("/Products", {
    Name: "New Product",
    Price: 150,
    CategoryID: 1
}, {
    success: function() {
        MessageToast.show("Product created");
    },
    error: function(oError) {
        MessageBox.error("Failed to create product");
    }
});
```

**Updating Entries**:
```javascript
var oModel = this.getView().getModel();
oModel.update("/Products(1)", {
    Price: 200
}, {
    success: function() {
        MessageToast.show("Product updated");
    }
});
```

**Deleting Entries**:
```javascript
oModel.remove("/Products(1)", {
    success: function() {
        MessageToast.show("Product deleted");
    }
});
```

**Batch Requests**:
```javascript
oModel.setUseBatch(true);
oModel.setDeferredGroups(["myGroup"]);

// Add to batch
oModel.create("/Products", oData, { groupId: "myGroup" });
oModel.create("/Products", oData2, { groupId: "myGroup" });

// Submit batch
oModel.submitChanges({
    groupId: "myGroup",
    success: function() {
        MessageToast.show("Batch successful");
    }
});
```

**Key Settings**:
- `useBatch`: Enable batch requests
- `defaultCountMode`: How to get counts (Inline, Request, None)
- `refreshAfterChange`: Auto-refresh after updates
- `defaultBindingMode`: One-way or two-way

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: odata-v2-model)

---

### OData V4 Model

Modern OData v4 model with improved performance and features.

**Creation**:
```javascript
// In manifest.json
{
    "sap.app": {
        "dataSources": {
            "mainService": {
                "uri": "/sap/opu/odata4/sap/service/srvd/sap/api/0001/",
                "type": "OData",
                "settings": {
                    "odataVersion": "4.0"
                }
            }
        }
    },
    "sap.ui5": {
        "models": {
            "": {
                "dataSource": "mainService",
                "settings": {
                    "synchronizationMode": "None",
                    "operationMode": "Server",
                    "autoExpandSelect": true,
                    "earlyRequests": true
                }
            }
        }
    }
}
```

**Key Differences from V2**:
- Server-side operations (filter, sort, page)
- Automatic $expand and $select
- Better performance
- Stricter adherence to OData standard
- No client-side models

**Reading with List Binding**:
```xml
<Table items="{
    path: '/Products',
    parameters: {
        $expand: 'Category',
        $select: 'ID,Name,Price',
        $filter: 'Price gt 100',
        $orderby: 'Name'
    }
}">
```

**Creating Entries**:
```javascript
var oListBinding = this.byId("table").getBinding("items");
var oContext = oListBinding.create({
    Name: "New Product",
    Price: 150
});

// Save
oContext.created().then(function() {
    MessageToast.show("Product created");
});
```

**Updating**:
```javascript
var oContext = this.byId("table").getSelectedItem().getBindingContext();
oContext.setProperty("Price", 200);

// Save changes
oContext.getModel().submitBatch("$auto").then(function() {
    MessageToast.show("Updated");
});
```

**Deleting**:
```javascript
var oContext = this.byId("table").getSelectedItem().getBindingContext();
oContext.delete("$auto").then(function() {
    MessageToast.show("Deleted");
});
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: odata-v4-model)

---

### Resource Model (i18n)

Model for internationalization texts.

**Setup**:
```javascript
// In manifest.json
{
    "sap.ui5": {
        "models": {
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "settings": {
                    "bundleName": "com.mycompany.myapp.i18n.i18n",
                    "supportedLocales": ["en", "de", "fr"],
                    "fallbackLocale": "en"
                }
            }
        }
    }
}
```

**i18n.properties**:
```properties
appTitle=My Application
appDescription=A sample SAPUI5 application

# Buttons
btnSave=Save
btnCancel=Cancel
btnDelete=Delete

# Messages
msgSaveSuccess=Data saved successfully
msgDeleteConfirm=Do you want to delete this item?

# Placeholders with parameters
msgItemCount=You have {0} items selected
msgWelcome=Welcome, {0}!
```

**Usage in XML**:
```xml
<Page title="{i18n>appTitle}">
    <Button text="{i18n>btnSave}" press=".onSave"/>
    <Text text="{i18n>appDescription}"/>
</Page>
```

**Usage in Controller**:
```javascript
var oBundle = this.getView().getModel("i18n").getResourceBundle();
var sTitle = oBundle.getText("appTitle");

// With parameters
var sMessage = oBundle.getText("msgItemCount", [5]);
MessageBox.success(sMessage);
```

**Locale Files**:
- `i18n.properties`: Default (fallback)
- `i18n_de.properties`: German
- `i18n_en.properties`: English
- `i18n_fr.properties`: French

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: resource-model, i18n)

---

### XML Model

Client-side model for XML data structures.

**Creation**:
```javascript
var oModel = new XMLModel();
oModel.loadData("model/data.xml");
this.getView().setModel(oModel, "xml");
```

**Usage**:
```xml
<List items="{xml>/products/product}">
    <StandardListItem
        title="{xml>name}"
        description="{xml>price}"/>
</List>
```

**Use Cases**:
- Legacy XML data sources
- Configuration files
- Small datasets

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: xml-model)

---

## Binding Syntax

### Property Binding

**Simple Binding**:
```xml
<Text text="{/companyName}"/>
<Input value="{/employeeName}"/>
```

**Named Models**:
```xml
<Text text="{invoice>/company/name}"/>
<Input value="{customer>/email}"/>
```

**Binding Options**:
```xml
<Text text="{
    path: '/price',
    type: 'sap.ui.model.type.Currency',
    formatOptions: {
        showMeasure: false
    },
    constraints: {
        minimum: 0
    }
}"/>
```

**Composite Binding**:
```xml
<Text text="{
    parts: [
        {path: '/firstName'},
        {path: '/lastName'}
    ],
    formatter: '.formatFullName'
}"/>
```

**Controller**:
```javascript
formatFullName: function(sFirstName, sLastName) {
    return sFirstName + " " + sLastName;
}
```

---

### Aggregation Binding

**List Binding**:
```xml
<List items="{/products}">
    <StandardListItem
        title="{name}"
        description="{description}"
        info="{price} EUR"/>
</List>
```

**Table Binding**:
```xml
<Table items="{
    path: '/products',
    sorter: {
        path: 'name'
    },
    filters: {
        path: 'price',
        operator: 'GT',
        value1: 50
    }
}">
    <columns>
        <Column><Text text="Name"/></Column>
        <Column><Text text="Price"/></Column>
    </columns>
    <items>
        <ColumnListItem>
            <cells>
                <Text text="{name}"/>
                <Text text="{price}"/>
            </cells>
        </ColumnListItem>
    </items>
</Table>
```

**With Parameters**:
```xml
<Table items="{
    path: '/Products',
    parameters: {
        expand: 'Category',
        select: 'ID,Name,Price'
    }
}">
```

---

### Element Binding

Sets binding context for entire control:

```xml
<Panel binding="{/selectedProduct}">
    <VBox>
        <Text text="{name}"/>
        <Text text="{description}"/>
        <Text text="{price} EUR"/>
    </VBox>
</Panel>
```

```javascript
// In controller
onProductSelect: function(oEvent) {
    var oItem = oEvent.getParameter("listItem");
    var sPath = oItem.getBindingContext().getPath();

    this.byId("detailPanel").bindElement({
        path: sPath,
        parameters: {
            expand: "Category"
        }
    });
}
```

---

### Expression Binding

Inline calculations without formatter:

```xml
<!-- Conditional text color -->
<Text
    text="{price}"
    color="{= ${price} > 100 ? 'red' : 'green'}"/>

<!-- Conditional visibility -->
<Button
    visible="{= ${status} === 'approved'}"
    text="Process"/>

<!-- Calculations -->
<Text text="{= ${quantity} * ${price}}"/>

<!-- String operations -->
<Text text="{= ${firstName} + ' ' + ${lastName}}"/>

<!-- Comparisons -->
<Button enabled="{= ${quantity} > 0 &amp;&amp; ${stock} >= ${quantity}}"/>
```

**Supported Operations**:
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `===`, `!==`, `>`, `<`, `>=`, `<=`
- Logical: `&&`, `||`, `!`
- Ternary: `condition ? true : false`
- String concatenation: `+`

**Limitations**:
- Simple expressions only
- No function calls
- Use formatters for complex logic

---

## Formatters & Data Types

### Custom Formatters

**Definition**:
```javascript
// In controller or separate formatter.js
formatPrice: function(sPrice) {
    if (!sPrice) return "";
    return parseFloat(sPrice).toFixed(2) + " EUR";
},

formatStatus: function(sStatus) {
    var mStatusText = {
        "A": "Approved",
        "R": "Rejected",
        "P": "Pending"
    };
    return mStatusText[sStatus] || sStatus;
},

formatDate: function(oDate) {
    if (!oDate) return "";
    var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
        pattern: "dd.MM.yyyy"
    });
    return oDateFormat.format(oDate);
}
```

**Usage**:
```xml
<Text text="{path: 'price', formatter: '.formatPrice'}"/>
<Text text="{path: 'status', formatter: '.formatStatus'}"/>
<Text text="{path: 'createdAt', formatter: '.formatDate'}"/>
```

**Multiple Parameters**:
```xml
<Text text="{
    parts: ['quantity', 'price'],
    formatter: '.formatTotal'
}"/>
```

```javascript
formatTotal: function(iQuantity, fPrice) {
    return (iQuantity * fPrice).toFixed(2) + " EUR";
}
```

---

### Built-in Data Types

**String Type**:
```xml
<Input value="{
    path: '/name',
    type: 'sap.ui.model.type.String',
    constraints: {
        maxLength: 50,
        minLength: 2
    }
}"/>
```

**Integer Type**:
```xml
<Input value="{
    path: '/quantity',
    type: 'sap.ui.model.type.Integer',
    constraints: {
        minimum: 1,
        maximum: 999
    }
}"/>
```

**Float Type**:
```xml
<Input value="{
    path: '/price',
    type: 'sap.ui.model.type.Float',
    constraints: {
        minimum: 0,
        maximum: 99999.99
    },
    formatOptions: {
        minFractionDigits: 2,
        maxFractionDigits: 2
    }
}"/>
```

**Date Type**:
```xml
<DatePicker value="{
    path: '/orderDate',
    type: 'sap.ui.model.type.Date',
    formatOptions: {
        pattern: 'dd.MM.yyyy'
    }
}"/>
```

**DateTime Type**:
```xml
<DateTimePicker value="{
    path: '/createdAt',
    type: 'sap.ui.model.type.DateTime',
    formatOptions: {
        pattern: 'dd.MM.yyyy HH:mm:ss'
    }
}"/>
```

**Currency Type**:
```xml
<Text text="{
    parts: [
        {path: 'price'},
        {path: 'currency'}
    ],
    type: 'sap.ui.model.type.Currency',
    formatOptions: {
        showMeasure: true
    }
}"/>
```

**Boolean Type**:
```xml
<CheckBox selected="{
    path: '/isActive',
    type: 'sap.ui.model.type.Boolean'
}"/>
```

---

## Filters & Sorters

### Filters

**Simple Filter**:
```javascript
var oFilter = new Filter("price", FilterOperator.GT, 100);
var oBinding = this.byId("table").getBinding("items");
oBinding.filter([oFilter]);
```

**Multiple Filters (AND)**:
```javascript
var aFilters = [
    new Filter("price", FilterOperator.GT, 100),
    new Filter("category", FilterOperator.EQ, "Electronics")
];
oBinding.filter(aFilters); // AND condition
```

**Multiple Filters (OR)**:
```javascript
var aFilters = [
    new Filter("status", FilterOperator.EQ, "Approved"),
    new Filter("status", FilterOperator.EQ, "Pending")
];
var oCombinedFilter = new Filter({
    filters: aFilters,
    and: false // OR condition
});
oBinding.filter([oCombinedFilter]);
```

**Complex Filters**:
```javascript
var oPriceFilter = new Filter({
    filters: [
        new Filter("price", FilterOperator.GT, 100),
        new Filter("price", FilterOperator.LT, 500)
    ],
    and: true
});

var oStatusFilter = new Filter({
    filters: [
        new Filter("status", FilterOperator.EQ, "A"),
        new Filter("status", FilterOperator.EQ, "P")
    ],
    and: false
});

var oCombinedFilter = new Filter({
    filters: [oPriceFilter, oStatusFilter],
    and: true
});

oBinding.filter([oCombinedFilter]);
```

**Filter Operators**:
- `EQ`: Equals
- `NE`: Not equals
- `GT`: Greater than
- `GE`: Greater or equal
- `LT`: Less than
- `LE`: Less or equal
- `Contains`: Contains text
- `StartsWith`: Starts with text
- `EndsWith`: Ends with text
- `BT`: Between (requires value1 and value2)

**Custom Filter Function**:
```javascript
var oFilter = new Filter({
    path: "price",
    test: function(oValue) {
        return oValue > 100 && oValue < 500;
    }
});
```

---

### Sorters

**Simple Sort**:
```javascript
var oSorter = new Sorter("name", false); // false = ascending
var oBinding = this.byId("table").getBinding("items");
oBinding.sort(oSorter);
```

**Multiple Sorters**:
```javascript
var aSorters = [
    new Sorter("category", false),
    new Sorter("price", true) // true = descending
];
oBinding.sort(aSorters);
```

**Sort with Grouping**:
```javascript
var oSorter = new Sorter("category", false, true); // third param = group
oBinding.sort(oSorter);
```

**Custom Group Function**:
```javascript
var oSorter = new Sorter("price", false, function(oContext) {
    var fPrice = oContext.getProperty("price");
    if (fPrice < 100) return { key: "low", text: "Low Price" };
    if (fPrice < 500) return { key: "medium", text: "Medium Price" };
    return { key: "high", text: "High Price" };
});
```

---

## Links to Official Documentation

- **Data Binding**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: data-binding)
- **Models**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: model)
- **OData**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: odata)
- **Get Started Tutorials**: https://github.com/SAP-docs/sapui5/tree/main/docs/03_Get-Started
- **API Reference**: https://sapui5.hana.ondemand.com/#/api

---

**Note**: This document covers data binding and model usage in SAPUI5. For specific implementation details and advanced scenarios, refer to the official documentation links provided.
