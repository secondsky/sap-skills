# SAP Fiori Integration Complete Reference

**Source**: https://cap.cloud.sap/docs/advanced/fiori

## Project Structure

```
project/
├── app/
│   ├── browse/                    # Fiori app for browsing
│   │   ├── webapp/
│   │   │   ├── Component.js
│   │   │   ├── manifest.json
│   │   │   └── ...
│   │   ├── annotations.cds        # UI annotations
│   │   └── package.json
│   ├── admin/                     # Admin Fiori app
│   ├── fiori-service.cds          # Shared annotations
│   └── index.html                 # Test page
├── srv/
└── db/
```

## Enabling Drafts

### Basic Draft Support
```cds
annotate AdminService.Books with @odata.draft.enabled;
```

### Compositions in Drafts
```cds
// Only compositions can be modified in drafts
entity Orders @odata.draft.enabled {
  key ID : UUID;
  // Composition - editable in draft
  Items : Composition of many OrderItems;
  // Association - read-only in draft
  customer : Association to Customers;
}
```

### Draft-Enabled Projections
```cds
// Enable on the projection, not base entity
service AdminService {
  entity Books as projection on my.Books;
}
annotate AdminService.Books with @odata.draft.enabled;
```

## UI Annotations

### HeaderInfo
```cds
annotate CatalogService.Books with @UI.HeaderInfo: {
  TypeName       : 'Book',
  TypeNamePlural : 'Books',
  Title          : { Value: title },
  Description    : { Value: author.name },
  ImageUrl       : coverImageUrl,
  TypeImageUrl   : 'sap-icon://education'
};
```

### SelectionFields (Filter Bar)
```cds
annotate CatalogService.Books with @UI.SelectionFields: [
  title,
  author_ID,
  genre_code,
  price
];
```

### LineItem (Table Columns)
```cds
annotate CatalogService.Books with @UI.LineItem: [
  { Value: title, Label: 'Title' },
  { Value: author.name, Label: 'Author' },
  { Value: genre.name, Label: 'Genre' },
  { Value: stock, Label: 'In Stock' },
  { Value: price, Label: 'Price' },
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'CatalogService.order',
    Label: 'Order',
    Inline: true
  },
  {
    $Type: 'UI.DataFieldForAnnotation',
    Target: '@UI.DataPoint#rating',
    Label: 'Rating'
  }
];
```

### DataPoint
```cds
annotate CatalogService.Books with @UI.DataPoint#rating: {
  Value: rating,
  Visualization: #Rating,
  TargetValue: 5
};

annotate CatalogService.Books with @UI.DataPoint#stock: {
  Value: stock,
  Criticality: stockCriticality
};
```

### Facets (Object Page Sections)
```cds
annotate CatalogService.Books with @UI.Facets: [
  {
    $Type  : 'UI.ReferenceFacet',
    ID     : 'GeneralFacet',
    Target : '@UI.FieldGroup#General',
    Label  : 'General'
  },
  {
    $Type  : 'UI.ReferenceFacet',
    ID     : 'ReviewsFacet',
    Target : 'reviews/@UI.LineItem',
    Label  : 'Reviews'
  },
  {
    $Type  : 'UI.CollectionFacet',
    ID     : 'DetailsFacet',
    Label  : 'Details',
    Facets : [
      { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Pricing' },
      { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Availability' }
    ]
  }
];
```

### FieldGroup
```cds
annotate CatalogService.Books with @UI.FieldGroup#General: {
  Data: [
    { Value: title },
    { Value: author_ID, Label: 'Author' },
    { Value: genre_code, Label: 'Genre' },
    { Value: descr, Label: 'Description' }
  ]
};

annotate CatalogService.Books with @UI.FieldGroup#Pricing: {
  Data: [
    { Value: price },
    { Value: currency_code }
  ]
};
```

### Identification (Header Actions)
```cds
annotate CatalogService.Books with @UI.Identification: [
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'CatalogService.order',
    Label: 'Order Now'
  },
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'CatalogService.addToCart',
    Label: 'Add to Cart',
    Determining: true
  }
];
```

## Value Helps

### Simple Value Help
```cds
@cds.odata.valuelist
entity Genres { ... }
```

### Custom Value Help
```cds
annotate CatalogService.Books with {
  author_ID @Common.ValueList: {
    Label: 'Authors',
    CollectionPath: 'Authors',
    Parameters: [
      {
        $Type: 'Common.ValueListParameterInOut',
        LocalDataProperty: author_ID,
        ValueListProperty: 'ID'
      },
      {
        $Type: 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'name'
      }
    ]
  };
};
```

### Value Help with Additional Columns
```cds
annotate AdminService.Books with {
  genre_code @Common.ValueList: {
    CollectionPath: 'Genres',
    Parameters: [
      { $Type: 'Common.ValueListParameterInOut', LocalDataProperty: genre_code, ValueListProperty: 'code' },
      { $Type: 'Common.ValueListParameterDisplayOnly', ValueListProperty: 'name' },
      { $Type: 'Common.ValueListParameterDisplayOnly', ValueListProperty: 'descr' }
    ]
  };
};
```

## Field Control

### Static Control
```cds
annotate CatalogService.Books with {
  ID @UI.Hidden;
  createdAt @UI.Hidden;
  modifiedAt @readonly;
};
```

### Dynamic Control
```cds
annotate CatalogService.Orders with {
  // Mandatory when status is 'draft'
  customerNote @Common.FieldControl: {
    $edmJson: {
      $If: [
        { $Eq: [{ $Path: 'status' }, 'draft'] },
        1,  // Mandatory
        3   // Optional
      ]
    }
  };

  // ReadOnly when status is not 'draft'
  items @Common.FieldControl: {
    $edmJson: {
      $If: [
        { $Eq: [{ $Path: 'status' }, 'draft'] },
        3,  // Optional (editable)
        1   // ReadOnly
      ]
    }
  };
};

// FieldControl values:
// 0 = Inapplicable (hidden)
// 1 = Mandatory
// 3 = Optional
// 7 = ReadOnly
```

## Criticality (Colors)

### Static Criticality
```cds
annotate CatalogService.Orders with @UI.LineItem: [
  {
    Value: status,
    Criticality: #Positive  // Green
  }
];
```

### Dynamic Criticality
```cds
// Computed field in entity
entity Orders {
  status : String;
  // 0=Neutral, 1=Negative, 2=Critical, 3=Positive
  virtual criticality : Integer;
}

// In handler
this.after('READ', 'Orders', orders => {
  for (const order of orders) {
    switch (order.status) {
      case 'completed': order.criticality = 3; break;  // Green
      case 'pending': order.criticality = 2; break;    // Yellow
      case 'cancelled': order.criticality = 1; break;  // Red
      default: order.criticality = 0;                  // Grey
    }
  }
});

// Annotation
annotate CatalogService.Orders with @UI.LineItem: [
  { Value: status, Criticality: criticality }
];
```

## Actions

### Bound Actions
```cds
service OrderService {
  entity Orders { ... } actions {
    action confirm();
    action cancel(reason: String);
  };
}

// Annotations
annotate OrderService.Orders with @UI.LineItem: [
  // ...
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'OrderService.confirm',
    Label: 'Confirm'
  }
];

annotate OrderService.Orders with @UI.Identification: [
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'OrderService.cancel',
    Label: 'Cancel Order'
  }
];
```

### Action Availability
```cds
annotate OrderService.Orders with actions {
  confirm @Core.OperationAvailable: {
    $edmJson: { $Eq: [{ $Path: 'status' }, 'pending'] }
  };

  cancel @Core.OperationAvailable: {
    $edmJson: {
      $And: [
        { $Ne: [{ $Path: 'status' }, 'completed'] },
        { $Ne: [{ $Path: 'status' }, 'cancelled'] }
      ]
    }
  };
};
```

## Common Annotations

### Text & TextArrangement
```cds
annotate CatalogService.Books with {
  @Common.Text: author.name
  @Common.TextArrangement: #TextOnly
  author_ID;

  @Common.Text: genre.name
  @Common.TextArrangement: #TextFirst
  genre_code;
};
```

**TextArrangement Values:**
| Value | Display | Example |
|-------|---------|---------|
| `#TextOnly` | Only text, hide ID | "Fiction" |
| `#TextFirst` | Text before ID | "Fiction (FIC)" |
| `#TextLast` | ID before text | "(FIC) Fiction" |
| `#TextSeparate` | Text in separate column | ID and text displayed separately |

### Semantic Key
```cds
annotate CatalogService.Books with @Common.SemanticKey: [isbn];
```

### Side Effects
```cds
annotate AdminService.OrderItems with @Common.SideEffects: {
  SourceProperties: [quantity],
  TargetProperties: ['_parent/total']
};
```

## Fiori Elements Manifest

### Basic Configuration
```json
{
  "sap.app": {
    "id": "bookshop.browse",
    "type": "application",
    "dataSources": {
      "mainService": {
        "uri": "/odata/v4/catalog/",
        "type": "OData",
        "settings": { "odataVersion": "4.0" }
      }
    }
  },
  "sap.ui5": {
    "routing": {
      "routes": [
        {
          "pattern": ":?query:",
          "name": "BooksList",
          "target": "BooksList"
        },
        {
          "pattern": "Books({key}):?query:",
          "name": "BooksObjectPage",
          "target": "BooksObjectPage"
        }
      ],
      "targets": {
        "BooksList": {
          "type": "Component",
          "id": "BooksList",
          "name": "sap.fe.templates.ListReport",
          "options": {
            "settings": {
              "entitySet": "Books"
            }
          }
        },
        "BooksObjectPage": {
          "type": "Component",
          "id": "BooksObjectPage",
          "name": "sap.fe.templates.ObjectPage",
          "options": {
            "settings": {
              "entitySet": "Books"
            }
          }
        }
      }
    }
  }
}
```

## Fiori Preview

### Enable Preview (Development)
```json
{
  "cds": {
    "fiori": {
      "preview": true
    }
  }
}
```

### Access Preview
Navigate to: `http://localhost:4004/$fiori-preview/CatalogService/Books#preview-app`

## Separation of Concerns

### Recommended Structure
```
app/
├── browse/
│   └── annotations.cds     # Browse app specific annotations
├── admin/
│   └── annotations.cds     # Admin app specific annotations
├── common.cds              # Shared annotations
└── labels.cds              # i18n labels
```

### common.cds
```cds
using CatalogService from '../srv/cat-service';

// Shared field labels
annotate CatalogService.Books with {
  ID @title: '{i18n>ID}';
  title @title: '{i18n>Title}';
  descr @title: '{i18n>Description}';
};
```

### browse/annotations.cds
```cds
using CatalogService from '../../srv/cat-service';

// Browse-specific annotations
annotate CatalogService.Books with @UI: {
  SelectionFields: [title, genre_code],
  LineItem: [
    { Value: title },
    { Value: author.name }
  ]
};
```
