# CDS Query Language (CQL) Complete Reference

**Source**: https://cap.cloud.sap/docs/cds/cql

## SELECT Queries

### Basic SELECT
```js
const { Books, Authors } = cds.entities;

// All columns
const books = await SELECT.from(Books);

// Specific columns
const titles = await SELECT.from(Books).columns('ID', 'title', 'price');

// With aliases
const data = await SELECT.from(Books).columns('ID', 'title as bookTitle');
```

### Single Record
```js
// By key
const book = await SELECT.one.from(Books, bookId);

// With condition
const book = await SELECT.one.from(Books).where({ isbn: '978-123' });
```

### WHERE Clauses
```js
// Simple equality
await SELECT.from(Books).where({ stock: 10 });

// Comparison operators
await SELECT.from(Books).where({ stock: { '>': 0 } });
await SELECT.from(Books).where({ stock: { '>=': 10 } });
await SELECT.from(Books).where({ stock: { '<': 100 } });
await SELECT.from(Books).where({ price: { '<=': 50 } });
await SELECT.from(Books).where({ status: { '!=': 'deleted' } });

// IN operator
await SELECT.from(Books).where({ genre: { in: ['fiction', 'drama'] } });

// LIKE operator
await SELECT.from(Books).where({ title: { like: '%CAP%' } });

// BETWEEN
await SELECT.from(Books).where({ price: { between: [10, 50] } });

// IS NULL / IS NOT NULL
await SELECT.from(Books).where({ author_ID: { '=': null } });
await SELECT.from(Books).where({ author_ID: { '!=': null } });

// Multiple conditions (AND)
await SELECT.from(Books).where({
  stock: { '>': 0 },
  price: { '<': 100 }
});

// OR conditions
await SELECT.from(Books).where({
  or: [
    { stock: { '>': 100 } },
    { price: { '<': 10 } }
  ]
});

// Complex nested conditions
await SELECT.from(Books).where({
  and: [
    { genre: 'fiction' },
    { or: [
      { stock: { '>': 50 } },
      { featured: true }
    ]}
  ]
});
```

### ORDER BY
```js
// Single column
await SELECT.from(Books).orderBy('title');
await SELECT.from(Books).orderBy('title asc');
await SELECT.from(Books).orderBy('price desc');

// Multiple columns
await SELECT.from(Books).orderBy('genre', 'title');
await SELECT.from(Books).orderBy({ genre: 'asc', price: 'desc' });
```

### LIMIT & OFFSET
```js
// Limit results
await SELECT.from(Books).limit(10);

// With offset (pagination)
await SELECT.from(Books).limit(10, 20);  // 10 rows, skip 20
await SELECT.from(Books).limit({ rows: 10, offset: 20 });
```

### GROUP BY & HAVING
```js
await SELECT.from(Books)
  .columns('genre', 'count(*) as count', 'avg(price) as avgPrice')
  .groupBy('genre')
  .having({ 'count(*)': { '>': 5 } });
```

### DISTINCT
```js
await SELECT.distinct.from(Books).columns('genre');
```

## Associations & Expands

### Path Expressions
```js
// Navigate associations in columns
await SELECT.from(Books).columns('title', 'author.name');

// Navigate in where
await SELECT.from(Books).where({ 'author.name': 'John Doe' });
```

### Expand (Deep Read)
```js
// Fluent syntax
await SELECT.from(Books, b => {
  b.ID,
  b.title,
  b.author(a => {
    a.ID,
    a.name
  })
});

// Nested expand
await SELECT.from(Orders, o => {
  o.ID,
  o.customer(c => { c.name }),
  o.items(i => {
    i.quantity,
    i.product(p => { p.name, p.price })
  })
});
```

### Infix Filters
```js
// Filter associated entities
await SELECT.from(Authors, a => {
  a.name,
  a.books(b => {
    b.title
  }).where({ stock: { '>': 0 } })
});
```

## INSERT

### Single Entry
```js
await INSERT.into(Books).entries({
  ID: cds.utils.uuid(),
  title: 'New Book',
  stock: 100,
  price: 29.99
});
```

### Multiple Entries
```js
await INSERT.into(Books).entries([
  { title: 'Book 1', stock: 10 },
  { title: 'Book 2', stock: 20 },
  { title: 'Book 3', stock: 30 }
]);
```

### Insert from SELECT
```js
await INSERT.into(ArchivedBooks).as(
  SELECT.from(Books).where({ stock: 0 })
);
```

### Deep Insert
```js
await INSERT.into(Orders).entries({
  ID: orderId,
  customer_ID: customerId,
  items: [
    { product_ID: product1Id, quantity: 2 },
    { product_ID: product2Id, quantity: 1 }
  ]
});
```

## UPDATE

### By Key
```js
await UPDATE(Books, bookId).set({ stock: 50 });
await UPDATE(Books, bookId).with({ stock: 50 });
```

### With WHERE
```js
await UPDATE(Books)
  .set({ featured: true })
  .where({ stock: { '>': 100 } });
```

### Increment/Decrement
```js
// Increment
await UPDATE(Books, bookId).set({ stock: { '+=': 10 } });

// Decrement
await UPDATE(Books, bookId).set({ stock: { '-=': 5 } });

// Multiply
await UPDATE(Books, bookId).set({ price: { '*=': 1.1 } });
```

### Conditional Update
```js
// Update only if condition met
const result = await UPDATE(Books, bookId)
  .set({ stock: { '-=': quantity } })
  .where({ stock: { '>=': quantity } });

if (result === 0) {
  throw new Error('Insufficient stock');
}
```

### Deep Update
```js
await UPDATE(Orders, orderId).with({
  status: 'confirmed',
  items: [
    { ID: item1Id, quantity: 5 },
    { ID: item2Id, quantity: 3 }
  ]
});
```

## DELETE

### By Key
```js
await DELETE.from(Books, bookId);
```

### With WHERE
```js
await DELETE.from(Books).where({ stock: 0 });
```

### Delete All
```js
await DELETE.from(Books);  // Caution: deletes all!
```

### Cascading Delete
Compositions automatically cascade deletes to child entities.

## UPSERT

```js
// Insert if not exists, update if exists
await UPSERT.into(Books).entries({
  ID: bookId,
  title: 'Updated or New Title',
  stock: 50
});

// Multiple entries
await UPSERT.into(Books).entries([
  { ID: id1, title: 'Book 1' },
  { ID: id2, title: 'Book 2' }
]);
```

## Raw SQL

### Native Queries
```js
// Direct SQL execution
const results = await cds.db.run(
  `SELECT * FROM my_bookshop_Books WHERE stock > ?`,
  [10]
);
```

### Prepared Statements
```js
const query = `SELECT * FROM Books WHERE genre = ? AND stock > ?`;
const results = await cds.db.run(query, ['fiction', 0]);
```

## Query Building

### CQN Objects
```js
// Build query as object
const query = {
  SELECT: {
    from: { ref: ['Books'] },
    columns: [
      { ref: ['ID'] },
      { ref: ['title'] }
    ],
    where: [
      { ref: ['stock'] }, '>', { val: 0 }
    ]
  }
};

const results = await cds.db.run(query);
```

### Query Modification
```js
// Clone and modify
let query = SELECT.from(Books);
query = query.where({ stock: { '>': 0 } });
query = query.orderBy('title');
query = query.limit(10);

const results = await cds.db.run(query);
```

## Aggregations

### Count
```js
const count = await SELECT.one.from(Books)
  .columns('count(*) as total');
```

### Sum, Avg, Min, Max
```js
const stats = await SELECT.one.from(Books).columns(
  'sum(stock) as totalStock',
  'avg(price) as avgPrice',
  'min(price) as minPrice',
  'max(price) as maxPrice'
);
```

### Group By with Aggregates
```js
const byGenre = await SELECT.from(Books)
  .columns('genre', 'count(*) as count', 'avg(price) as avgPrice')
  .groupBy('genre')
  .orderBy('count desc');
```

## Subqueries

### In WHERE
```js
// Books by authors with more than 5 books
await SELECT.from(Books).where({
  author_ID: {
    in: SELECT.from(Authors)
      .columns('ID')
      .where({ bookCount: { '>': 5 } })
  }
});
```

### EXISTS
```js
// Authors with at least one bestseller
await SELECT.from(Authors).where({
  exists: SELECT.from(Books)
    .where({ 'author_ID': { ref: ['Authors', 'ID'] }, bestseller: true })
});
```

## Locking

### Exclusive Lock
```js
// For update (exclusive)
const book = await SELECT.from(Books, bookId).forUpdate();
```

### Shared Lock
```js
// For share (shared)
const book = await SELECT.from(Books, bookId).forShareLock();
```

## Parameterized Views

```js
// View with parameters
const filtered = await SELECT.from('FilteredBooks', {
  minStock: 10,
  maxPrice: 50
});
```

## Exists Predicate

```js
// Check existence
const hasBooks = await SELECT.one.from(Authors)
  .where({
    ID: authorId,
    exists: SELECT.from(Books).where({ author_ID: authorId })
  });
```
