# CDS Schema & Query Notations Reference

> Source: https://cap.cloud.sap/docs/cds/csn, https://cap.cloud.sap/docs/cds/cqn, https://cap.cloud.sap/docs/cds/cxn

## CSN - Core Schema Notation

CSN is a compact notation for representing CDS models as plain JavaScript objects.

### Root-Level Structure

```js
{
  requires: ['@sap/cds/common', './db/schema'],  // Imported models
  definitions: { /* Named definitions */ },       // Types, entities, services
  extensions: [ /* Unapplied aspects */ ],        // Extensions array
  i18n: { 'de': {}, 'fr': {} }                   // Translations
}
```

### Definition Kinds

| Kind | Description |
|------|-------------|
| `context` | Namespace container |
| `service` | Service definition |
| `entity` | Entity definition |
| `type` | Type definition |
| `action` | Unbound action |
| `function` | Unbound function |
| `annotation` | Annotation definition |

### Type Definitions

```js
// Scalar types
{ type: "cds.String", length: 100 }
{ type: "cds.Decimal", precision: 11, scale: 3 }
{ type: "cds.Integer" }
{ type: "cds.UUID" }
{ type: "cds.Boolean" }
{ type: "cds.Date" }
{ type: "cds.DateTime" }
{ type: "cds.Timestamp" }

// Structured types
{ elements: {
    foo: { type: "cds.Integer" },
    bar: { type: "cds.String" }
}}

// Array types
{ items: { type: "cds.Integer" } }

// Enumeration types
{ enum: {
    asc: {},
    desc: {},
    custom: { val: 'custom-value' }
}}
```

### Entity Definition

```js
{
  kind: "entity",
  elements: {
    ID: { type: "cds.UUID", key: true },
    name: { type: "cds.String", notNull: true },
    virtual_field: { type: "cds.String", virtual: true }
  }
}
```

### Association Definition

```js
{
  type: "cds.Association",
  target: "Books",
  cardinality: { src: 1, min: 0, max: "*" },
  on: [{ ref: ["author_ID"] }, "=", { ref: ["author", "ID"] }],
  keys: [{ ref: ["ID"] }]
}
```

### Views with Query

```js
{
  kind: "entity",
  query: { SELECT: { from: { ref: ["Books"] }, columns: ["*"] } },
  // or simpler:
  projection: { from: { ref: ["Books"] }, columns: ["*"] }
}
```

### Annotations

```js
{
  '@title': "Display Name",
  '@readonly': true,
  '@UI.LineItem': [{ Value: { '=': 'name' } }]
}
```

### Extensions

```js
{
  extensions: [
    { extend: "Books", includes: ["managed"] },
    { extend: "Books", elements: { newField: { type: "cds.String" } } },
    { annotate: "Books", '@readonly': true }
  ]
}
```

---

## CQN - Core Query Notation

CQN represents CDS queries as plain JavaScript objects.

### Three Ways to Create Queries

```js
// 1. CQL parsing
let query = cds.ql`SELECT from Books`

// 2. Query builder
let query = SELECT.from('Books')

// 3. Direct CQN object
let query = { SELECT: { from: { ref: ['Books'] } } }

// Execute
let results = await cds.run(query)
```

### SELECT Structure

```js
{
  SELECT: {
    distinct: true,           // Optional: distinct results
    count: true,              // Optional: adds $count to result (OData-style)
    one: true,                // Optional: returns single object or undefined (not array)
    from: source,             // Required: source table/view
    columns: column[],        // Optional: projection
    where: expr[],            // Optional: filter
    having: expr[],           // Optional: group filter
    groupBy: expr[],          // Optional: grouping
    orderBy: order[],         // Optional: sorting
    limit: { rows, offset }   // Optional: pagination
  }
}
```

**Result Behavior:**
- Default: Returns array of records `[{...}, {...}]`
- `one: true`: Returns single object `{...}` or `undefined` if no match (not array)
- `count: true`: Returns records with `$count` property indicating total matches
- Always check for `undefined`/empty results before accessing properties

### Source Types

```js
// Simple reference
{ ref: ['Books'] }

// Aliased
{ ref: ['Books'], as: 'b' }

// JOIN
{
  join: 'left',  // 'inner' | 'left' | 'right'
  args: [source1, source2],
  on: expr
}

// Subquery
{ SELECT: { from: { ref: ['Books'] } } }
```

### Column Expressions

```js
// All columns
'*'

// Simple reference
{ ref: ['title'] }

// Aliased
{ ref: ['title'], as: 'bookTitle' }

// With expand (to-many)
{ ref: ['chapters'], expand: ['*'] }

// With inline (flattened)
{ ref: ['author'], inline: ['name', 'country'] }

// Function call
{ func: 'count', args: [{ ref: ['ID'] }], as: 'total' }
```

### WHERE Expressions

```js
// Simple comparison
[{ ref: ['price'] }, '>', { val: 100 }]

// AND/OR
[{ ref: ['price'] }, '>', { val: 100 }, 'and', { ref: ['stock'] }, '>', { val: 0 }]

// IN list
[{ ref: ['status'] }, 'in', { list: [{ val: 'active' }, { val: 'pending' }] }]

// LIKE
[{ ref: ['name'] }, 'like', { val: '%CAP%' }]

// EXISTS subquery
['exists', { SELECT: { from: { ref: ['Orders'] }, where: [...] } }]
```

### ORDER BY

```js
{
  orderBy: [
    { ref: ['price'], sort: 'desc', nulls: 'last' },
    { ref: ['name'], sort: 'asc' }
  ]
}
```

### INSERT

```js
// With entries (name-value pairs)
{
  INSERT: {
    into: { ref: ['Books'] },
    entries: [
      { ID: 201, title: 'Book 1' },
      { ID: 202, title: 'Book 2' }
    ]
  }
}

// With columns and values (single row)
{
  INSERT: {
    into: { ref: ['Books'] },
    columns: ['ID', 'title'],
    values: [201, 'Book 1']
  }
}

// With rows (multiple records)
{
  INSERT: {
    into: { ref: ['Books'] },
    columns: ['ID', 'title'],
    rows: [
      [201, 'Book 1'],
      [202, 'Book 2']
    ]
  }
}

// Deep insert
{
  INSERT: {
    into: { ref: ['Authors'] },
    entries: [{
      ID: 1, name: 'Author',
      books: [
        { ID: 101, title: 'Book 1' },
        { ID: 102, title: 'Book 2' }
      ]
    }]
  }
}
```

### UPDATE

```js
{
  UPDATE: {
    entity: { ref: ['Books'] },
    where: [{ ref: ['ID'] }, '=', { val: 201 }],
    data: { stock: 100 },           // Scalar values only
    with: { stock: { xpr: [{ ref: ['stock'] }, '+', { val: 1 }] } }  // Expressions allowed
  }
}
```

### DELETE

```js
{
  DELETE: {
    from: { ref: ['Books'] },
    where: [{ ref: ['ID'] }, '=', { val: 201 }]
  }
}
```

### UPSERT

```js
{
  UPSERT: {
    into: { ref: ['Books'] },
    entries: [{ ID: 201, title: 'Updated Title', stock: 50 }]
  }
}
```

---

## CXN - Core Expression Notation

CXN defines the structure of expressions within CQN.

### Expression Types

```js
// Literal value
{ val: 'string' }
{ val: 123 }
{ val: true }
{ val: null }

// Special literals
{ val: "2024-01-15", literal: 'date' }
{ val: "13:05:23", literal: 'time' }
{ val: "2024-01-15T13:05:23Z", literal: 'timestamp' }

// Reference
{ ref: ['field'] }
{ ref: ['entity', 'field'] }

// Complex reference with filter
{ ref: [{ id: 'Books', where: [...] }] }

// Function call
{ func: 'sum', args: [{ ref: ['amount'] }] }
{ func: 'concat', args: [{ ref: ['first'] }, { val: ' ' }, { ref: ['last'] }] }

// Expression sequence
{ xpr: [{ ref: ['a'] }, '+', { ref: ['b'] }] }

// List/tuple
{ list: [{ val: 1 }, { val: 2 }, { val: 3 }] }

// Binding parameter
{ ref: ['?'], param: true }
{ ref: ['name'], param: true }

// Subquery
{ SELECT: { from: { ref: ['Books'] } } }
```

### Operators

```js
// Comparison
'=' | '==' | '!=' | '<' | '<=' | '>' | '>='

// Logical
'and' | 'or' | 'not'

// Pattern matching
'like' | 'in' | 'between'

// Null check
'is null' | 'is not null'

// Existence
'exists'
```

### Window Functions

```js
{
  func: 'rank',
  args: [],
  xpr: ['over', {
    partitionBy: [{ ref: ['category'] }],
    orderBy: [{ ref: ['price'], sort: 'desc' }]
  }]
}
```

### CASE Expression

```js
{
  xpr: [
    'case',
    'when', { xpr: [{ ref: ['status'] }, '=', { val: 'A' }] },
    'then', { val: 'Active' },
    'when', { xpr: [{ ref: ['status'] }, '=', { val: 'I' }] },
    'then', { val: 'Inactive' },
    'else', { val: 'Unknown' },
    'end'
  ]
}
```

---

## Common CDS Built-in Functions

| Function | Description |
|----------|-------------|
| `concat(a, b)` | String concatenation |
| `contains(str, sub)` | String contains check |
| `substring(str, start, len)` | Extract substring |
| `length(str)` | String length |
| `tolower(str)` | Lowercase conversion |
| `toupper(str)` | Uppercase conversion |
| `trim(str)` | Remove whitespace |
| `year(date)` | Extract year |
| `month(date)` | Extract month |
| `day(date)` | Extract day |
| `now()` | Current timestamp |
| `sum(field)` | Aggregate sum |
| `avg(field)` | Aggregate average |
| `min(field)` | Aggregate minimum |
| `max(field)` | Aggregate maximum |
| `count(field)` | Count records |
| `countdistinct(field)` | Count distinct |
