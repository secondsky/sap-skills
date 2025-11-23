# CDL (Conceptual Definition Language) Complete Syntax Reference

**Source**: https://cap.cloud.sap/docs/cds/cdl

## Keywords & Identifiers

- Keywords are case-insensitive (typically lowercase)
- Identifiers are case-sensitive; must match `/^[$A-Za-z_]\w*$/`
- Delimited identifiers use `![identifier name]` syntax (avoid when possible)

## Literals & Values

```cds
// Booleans
true, false, null

// Numbers
11, 2.4, 1e3, 1.23e-11

// Strings
'single quotes'
`backtick for
multiline strings`

// Records & Arrays
{ key: 'value', nested: { prop: 1 } }
[1, 'two', { three: 4 }]

// Date/Time literals
date'2024-11-22'
time'16:30:00'
timestamp'2024-11-22T16:30:00Z'
```

## Comments

```cds
// Line-end comment

/* Block comment
   spanning multiple lines */

/**
 * Doc comment - stored in CSN 'doc' property
 * Supports markdown formatting
 */
entity Books { ... }
```

## Model Organization

### Namespaces
```cds
namespace my.bookshop;
entity Books { ... }  // Full name: my.bookshop.Books
```

### Contexts
```cds
context admin {
  entity Users { ... }  // Full name: my.bookshop.admin.Users
}
```

### Scoped Names
```cds
entity Orders { ... }
entity Orders.Items { ... }  // Scoped under Orders
```

### Imports
```cds
using my.bookshop.Books from './db/schema';
using { Authors, Genres } from './db/schema';
using { Books as MyBooks } from './db/schema';
using * from './db/schema';  // Import all definitions
```

## Entity Definitions

### Basic Entity
```cds
entity Books {
  key ID    : UUID;
  title     : String(255) not null;
  descr     : String(5000);
  stock     : Integer default 0;
  price     : Decimal(10,2);
  available : Boolean default true;
}
```

### Structured Elements
```cds
type Address {
  street  : String;
  city    : String;
  zipCode : String(10);
  country : Country;
}

entity Customers {
  homeAddress : Address;
  workAddress : Address;
}
```

### Arrayed Types
```cds
entity Contacts {
  emails : many String;           // Array of strings
  phones : array of String(20);   // Same as above
  tags   : many { name: String }; // Array of structs
}
```

### Virtual Elements
```cds
entity Employees {
  // Not persisted, computed at runtime
  virtual fullName : String @Core.Computed;
}
```

### Calculated Elements

**On-read (computed during queries)**:
```cds
entity Employees {
  firstName : String;
  lastName  : String;
  fullName  : String = firstName || ' ' || lastName;
  upperName : String = upper(fullName);
}
```

**Stored (persisted in database)**:
```cds
entity Employees {
  fullName : String = (firstName || ' ' || lastName) stored;
}
```

### Default Values
```cds
entity Orders {
  status    : String default 'draft';
  priority  : Integer default 5;
  createdAt : Timestamp default $now;
  createdBy : String default $user;
}
```

### Type References
```cds
entity Books {
  title     : String(200);
  subtitle  : type of title;        // Same type as title
}

entity Reviews {
  bookTitle : Books:title;          // Reference Books.title type
}
```

### Constraints
```cds
entity Books {
  title : String(200) not null;
  isbn  : String(13) not null unique;
}

// Unique constraints
@assert.unique: {
  isbn: [isbn],
  titleAuthor: [title, author_ID]
}
entity Books { ... }
```

### Enumerations
```cds
// String enum
type Status : String enum {
  draft;
  submitted;
  approved;
  rejected = 'REJ';  // Custom value
}

// Integer enum
type Priority : Integer enum {
  low = 1;
  medium = 2;
  high = 3;
}

entity Orders {
  status   : Status default #draft;
  priority : Priority default #medium;
}
```

## Views & Projections

### As Select From
```cds
entity BooksList as select from Books {
  ID,
  title,
  author.name as authorName,
  stock * price as value : Decimal
} where stock > 0
  order by title;
```

### As Projection On
```cds
entity PublicBooks as projection on Books {
  ID, title, descr, author
} excluding { createdBy, modifiedBy };
```

### View with Parameters
```cds
entity FilteredBooks(minStock: Integer, maxPrice: Decimal)
  as select from Books
  where stock >= :minStock
    and price <= :maxPrice;
```

## Associations

### Managed To-One
```cds
entity Books {
  author : Association to Authors;
  // CAP auto-generates foreign key column: author_ID
  // The FK type matches the target's primary key (UUID if Authors uses cuid)
  // No explicit definition needed - CAP handles persistence automatically
}
```

### Managed To-One with Default
```cds
entity Orders {
  customer : Association to Customers default 'DEFAULT_CUSTOMER_ID';
}
```

### Unmanaged Association
```cds
entity Books {
  author    : Association to Authors on author.ID = author_ID;
  author_ID : UUID;  // Explicit foreign key - REQUIRED for unmanaged associations
  // Unlike managed associations, you must define the FK field yourself
  // and specify the ON condition to join the entities
}
```

### To-Many Association
```cds
entity Authors {
  books : Association to many Books on books.author = $self;
}
```

### Many-to-Many (via Link Entity)
```cds
entity Books {
  categories : Association to many Book2Category on categories.book = $self;
}

entity Categories {
  books : Association to many Book2Category on books.category = $self;
}

entity Book2Category {
  key book     : Association to Books;
  key category : Association to Categories;
}
```

### Infix Filters on Associations
```cds
entity Authors {
  // Filter: only books with stock > 0
  availableBooks : Association to many Books on availableBooks.author = $self
                   and availableBooks.stock > 0;
}

// In projections
entity AuthorDetails as projection on Authors {
  *,
  books[stock > 0] as availableBooks,
  books[1: favorite = true] as favoriteBook  // 1: reduces to single
}
```

## Compositions

### Basic Composition
```cds
entity Orders {
  key ID : UUID;
  Items  : Composition of many OrderItems on Items.order = $self;
}

entity OrderItems {
  key ID    : UUID;
  order     : Association to Orders;
  product   : Association to Products;
  quantity  : Integer;
}
```

### Managed Composition (Inline)
```cds
entity Orders {
  key ID : UUID;
  Items  : Composition of many {
    key pos      : Integer;
    product      : Association to Products;
    quantity     : Integer;
    price        : Decimal(10,2);
  };
}
// Auto-creates: entity Orders.Items { ... }
```

### Managed Composition (Named Aspect)
```cds
aspect OrderItem {
  key pos  : Integer;
  product  : Association to Products;
  quantity : Integer;
}

entity Orders {
  key ID : UUID;
  Items  : Composition of many OrderItem;
}
```

## Annotations

### Syntax Variations
```cds
@title: 'Books'
@description: 'All books in the catalog'
entity Books { ... }

// Multiple on same line
@readonly @cds.persistence.skip
entity TempData { ... }

// Grouped
@(
  title: 'Books',
  description: 'All books',
  UI.HeaderInfo: { TypeName: 'Book' }
)
entity Books { ... }
```

### Annotation Values
```cds
@flag                        // true (default)
@enabled: true               // boolean
@count: 42                   // integer
@rate: 3.14                  // decimal
@label: 'Hello'              // string
@status: #active             // symbol/enum
@items: [1, 2, 3]            // array
@config: { a: 1, b: 2 }      // record
@expr: (price * quantity)    // expression
```

### Element-Level Annotations
```cds
entity Books {
  @title: 'Book Title'
  @mandatory
  title : String;

  @readonly
  @Core.Computed
  totalValue : Decimal;
}
```

### Annotation Propagation
Annotations propagate through:
- Type inheritance
- Views and projections
- Association navigation

Stop propagation with `null`:
```cds
annotate ChildEntity with {
  field @parentAnnotation: null
}
```

## Aspects

### Define Aspect
```cds
aspect tracked {
  createdAt  : Timestamp @cds.on.insert: $now;
  createdBy  : String(255) @cds.on.insert: $user;
  modifiedAt : Timestamp @cds.on.insert: $now @cds.on.update: $now;
  modifiedBy : String(255) @cds.on.insert: $user @cds.on.update: $user;
}
```

### Apply Aspect (Shortcut Includes)
```cds
entity Books : tracked {
  key ID : UUID;
  title  : String;
}
```

### Extend Directive
```cds
extend Books with {
  newField   : String;
  otherField : Integer;
}

extend Books with tracked;

extend Books:price with @title: 'Price';
```

### Annotate Directive
```cds
annotate Books with @title: 'Books';

annotate Books with {
  title @title: 'Book Title';
  price @Measures.Unit: currency_code;
}
```

## Services

### Service Definition
```cds
service CatalogService @(path: '/catalog') {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
}
```

### Multiple Protocols
```cds
@protocol: ['odata', 'rest']
service MultiProtocolService { ... }
```

### Bound Actions/Functions
```cds
service OrderService {
  entity Orders { ... } actions {
    action confirm();
    action cancel(reason: String);
    function getTotal() returns Decimal;
  };
}
```

### Unbound Actions/Functions
```cds
service UtilityService {
  action sendNotification(to: String, message: String);
  function calculateTax(amount: Decimal, region: String) returns Decimal;
}
```

### Custom Events
```cds
service OrderService {
  event OrderCreated {
    orderID   : UUID;
    customer  : String;
    total     : Decimal;
    timestamp : Timestamp;
  }

  event OrderCancelled : projection on OrderCreated {
    orderID, reason: String
  }
}
```

### Internal Services
```cds
@protocol: 'none'  // No external access
service InternalService { ... }
```
