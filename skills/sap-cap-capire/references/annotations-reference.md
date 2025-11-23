# CDS Annotations Complete Reference

**Source**: https://cap.cloud.sap/docs/cds/annotations

## Core Annotations

### General Purpose
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@title` | Display label (maps to Common.Label) | `@title: 'Book Title'` |
| `@description` | Description text (maps to Core.Description) | `@description: 'The book title'` |

### Access Control
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@readonly` | Prevent modifications | `@readonly entity Logs { }` |
| `@insertonly` | Allow only CREATE | `@insertonly entity Orders { }` |
| `@requires` | Role-based access | `@requires: 'admin'` |
| `@restrict` | Fine-grained authorization | See Authorization section |

**@readonly semantics:**
- **Entity-level**: Blocks CREATE, UPDATE, DELETE operations. Only READ allowed.
- **Field-level**: Field cannot be modified in UPDATE/CREATE payloads.
- Example: `@readonly createdAt : Timestamp` - auto-set by system, user cannot modify.

### Input Validation
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@mandatory` | Require non-null value | `title : String @mandatory` |
| `@assert.format` | Regex validation | `@assert.format: '[a-z]+'` |
| `@assert.range` | Value range | `@assert.range: [0, 100]` |
| `@assert.target` | FK reference exists | `author : Association to Authors @assert.target` |

### Services & APIs
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@path` | Custom service endpoint | `@path: '/api/v1'` |
| `@impl` | Custom implementation | `@impl: './my-service.js'` |
| `@protocol` | Expose protocols | `@protocol: ['odata', 'rest']` |
| `@cds.autoexpose` | Auto-expose in services | `@cds.autoexpose entity Codes { }` |
| `@cds.api.ignore` | Hide from API | `field @cds.api.ignore` |

### Persistence
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@cds.persistence.exists` | Table exists externally | `@cds.persistence.exists` |
| `@cds.persistence.skip` | Don't create table | `@cds.persistence.skip` |
| `@cds.persistence.table` | Force table (not view) | `@cds.persistence.table` |
| `@cds.on.insert` | Value on insert | `@cds.on.insert: $now` |
| `@cds.on.update` | Value on update | `@cds.on.update: $user` |

### Query Behavior
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@cds.query.limit` | Default/max results | `@cds.query.limit: { default: 20, max: 100 }` |
| `@cds.search` | Searchable fields | `@cds.search: { title, author.name }` |

### Localization
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@cds.localized` | Enable translations | `@cds.localized: false` to disable |

### Temporal Data
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@cds.valid.from` | Valid from timestamp | `validFrom @cds.valid.from` |
| `@cds.valid.to` | Valid to timestamp | `validTo @cds.valid.to` |

## OData Annotations

### Type Mapping
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@odata.Type` | Override EDM type | `@odata.Type: 'Edm.String'` |
| `@odata.MaxLength` | Max string length | `@odata.MaxLength: 1000` |
| `@odata.Precision` | Decimal precision | `@odata.Precision: 10` |
| `@odata.Scale` | Decimal scale | `@odata.Scale: 2` |

### Entity Behavior
| Annotation | Purpose | Example |
|------------|---------|---------|
| `@odata.draft.enabled` | Enable drafts | `@odata.draft.enabled` |
| `@odata.singleton` | Single-instance entity | `@odata.singleton` |
| `@odata.etag` | ETag field | `modifiedAt @odata.etag` |

## Core Vocabulary (OData)

### Computed & Immutable
```cds
entity Books {
  @Core.Computed          // Read-only, server-computed
  createdAt : Timestamp;

  @Core.Immutable         // Set once, then read-only
  key ID : UUID;
}
```

### Media Types
```cds
entity Documents {
  @Core.MediaType: 'application/pdf'
  content : LargeBinary;

  @Core.MediaType: mediaType
  @Core.ContentDisposition.Filename: fileName
  attachment : LargeBinary;

  @Core.IsMediaType
  mediaType : String;

  fileName : String;
}
```

## UI Annotations (Fiori)

### Header Info
```cds
annotate Books with @UI.HeaderInfo: {
  TypeName       : 'Book',
  TypeNamePlural : 'Books',
  Title          : { Value: title },
  Description    : { Value: author.name },
  ImageUrl       : coverImage
};
```

### Selection Fields (Filter Bar)
```cds
annotate Books with @UI.SelectionFields: [
  title,
  author_ID,
  genre_code,
  price
];
```

### Line Item (List Columns)
```cds
annotate Books with @UI.LineItem: [
  { Value: title, Label: 'Title' },
  { Value: author.name, Label: 'Author' },
  { Value: stock },
  { Value: price },
  { $Type: 'UI.DataFieldForAction', Action: 'CatalogService.order', Label: 'Order' }
];
```

### Facets (Object Page Sections)
```cds
annotate Books with @UI.Facets: [
  {
    $Type  : 'UI.ReferenceFacet',
    Target : '@UI.FieldGroup#General',
    Label  : 'General Information'
  },
  {
    $Type  : 'UI.ReferenceFacet',
    Target : 'reviews/@UI.LineItem',
    Label  : 'Reviews'
  },
  {
    $Type  : 'UI.CollectionFacet',
    Label  : 'Details',
    Facets : [
      { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Details' }
    ]
  }
];
```

### Field Groups
```cds
annotate Books with @UI.FieldGroup#General: {
  Data: [
    { Value: title },
    { Value: descr },
    { Value: author_ID, Label: 'Author' },
    { Value: genre_code }
  ]
};

annotate Books with @UI.FieldGroup#Pricing: {
  Data: [
    { Value: price },
    { Value: currency_code },
    { Value: stock }
  ]
};
```

### Identification (Header Actions)
```cds
annotate Books with @UI.Identification: [
  { $Type: 'UI.DataFieldForAction', Action: 'CatalogService.order', Label: 'Order Now' }
];
```

### Hidden Fields
```cds
annotate Books with {
  createdBy @UI.Hidden;
  modifiedBy @UI.Hidden;
};
```

### Criticality (Status Colors)
```cds
annotate Orders with @UI.LineItem: [
  {
    Value: status,
    Criticality: criticality,
    CriticalityRepresentation: #WithIcon
  }
];
```

**Criticality Values and Visual Representation:**
| Value | Constant | Color | Icon | Use Case |
|-------|----------|-------|------|----------|
| 0 | Neutral | Grey | None | Default/informational |
| 1 | Negative | Red | ❌ | Error, failed, rejected |
| 2 | Critical | Yellow/Orange | ⚠️ | Warning, needs attention |
| 3 | Positive | Green | ✓ | Success, completed, approved |

**Computed Field Example:**
```cds
entity Orders {
  status : String;
  criticality : Integer = case
    when status = 'cancelled' then 1
    when status = 'pending' then 2
    when status = 'delivered' then 3
    else 0
  end stored;
}
```

## Common Annotations

### Labels & Text
```cds
annotate Books with {
  @Common.Label: 'Book Title'
  title;

  @Common.Text: author.name
  @Common.TextArrangement: #TextOnly
  author_ID;
};
```

### Value Lists (Dropdowns)
```cds
annotate Books with {
  @Common.ValueList: {
    Label: 'Authors',
    CollectionPath: 'Authors',
    Parameters: [
      { $Type: 'Common.ValueListParameterInOut', LocalDataProperty: author_ID, ValueListProperty: 'ID' },
      { $Type: 'Common.ValueListParameterDisplayOnly', ValueListProperty: 'name' }
    ]
  }
  author_ID;
};

// Shorthand for simple value lists
@cds.odata.valuelist
entity Genres { ... }
```

### Field Control
```cds
annotate Orders with {
  @Common.FieldControl: #ReadOnly
  totalAmount;

  // Dynamic: #Mandatory when status is 'draft'
  @Common.FieldControl: { $edmJson: {
    $If: [
      { $Eq: [{ $Path: 'status' }, 'draft'] },
      1,  // Mandatory
      3   // Optional
    ]
  }}
  customerNote;
};

// FieldControl values:
// 0 = Inapplicable (hidden)
// 1 = Mandatory
// 3 = Optional
// 7 = ReadOnly
```

### Semantic Key
```cds
annotate Books with @Common.SemanticKey: [isbn];
```

## Capabilities Annotations

```cds
annotate CatalogService.Books with @Capabilities: {
  InsertRestrictions: { Insertable: false },
  UpdateRestrictions: { Updatable: true },
  DeleteRestrictions: { Deletable: false },
  FilterRestrictions: {
    Filterable: true,
    RequiredProperties: [title],
    NonFilterableProperties: [descr]
  },
  SortRestrictions: {
    NonSortableProperties: [descr, content]
  }
};
```

## Authorization Annotations

### @requires
```cds
@requires: 'authenticated-user'
service CatalogService { ... }

@requires: ['admin', 'manager']  // OR logic
entity SensitiveData { ... }
```

### @restrict
```cds
@restrict: [
  { grant: 'READ' },  // Anyone can read
  { grant: 'CREATE', to: 'creator' },
  { grant: 'UPDATE', to: 'editor', where: 'createdBy = $user' },
  { grant: 'DELETE', to: 'admin' },
  { grant: '*', to: 'superadmin' }
]
entity Documents { ... }
```

### Grant Types
- `READ` - GET requests
- `CREATE` - POST requests
- `UPDATE` - PUT/PATCH requests
- `DELETE` - DELETE requests
- `WRITE` - CREATE + UPDATE + DELETE
- `*` - All operations
- Action/function names

### Where Conditions
```cds
@restrict: [
  // User attribute matching
  { grant: 'READ', where: '$user.country = country_code' },

  // Owner matching
  { grant: 'UPDATE', where: 'createdBy = $user' },

  // Exists subquery
  { grant: 'READ', where: 'exists members[user_ID = $user.id]' },

  // Complex conditions
  { grant: 'READ', where: 'status = #published or createdBy = $user' }
]
```

## SQL Annotations

### Native SQL
```cds
@sql.append: 'WITH ASSOCIATIONS'
entity Books { ... }

@sql.prepend: 'CREATE COLUMN TABLE'
entity ColumnTable { ... }

entity Books {
  @sql.append: 'FUZZY SEARCH INDEX ON'
  title : String(200);
}
```

## Data Privacy Annotations

```cds
entity Customers {
  @PersonalData.IsPotentiallyPersonal
  name : String;

  @PersonalData.IsPotentiallySensitive
  healthInfo : String;

  @PersonalData.FieldSemantics: #EmailAddress
  email : String;
}

@PersonalData.EntitySemantics: #DataSubject
entity Customers { ... }
```

## Analytics Annotations

```cds
@Aggregation.ApplySupported: {
  Transformations: ['aggregate', 'groupby', 'filter'],
  GroupableProperties: [category, region],
  AggregatableProperties: [{
    Property: amount,
    SupportedAggregationMethods: ['sum', 'avg', 'min', 'max']
  }]
}
entity Sales { ... }
```
