# CAP Event Handlers for Node.js Complete Reference

**Source**: https://cap.cloud.sap/docs/node.js/events

## Handler Registration

### Class-Based Style
```js
const cds = require('@sap/cds');

module.exports = class CatalogService extends cds.ApplicationService {
  async init() {
    const { Books, Authors } = this.entities;

    // Register handlers
    this.before('CREATE', Books, this.validateBook);
    this.on('READ', Books, this.onReadBooks);
    this.after('READ', Books, this.enrichBooks);
    this.on('submitOrder', this.onSubmitOrder);

    return super.init();
  }

  validateBook(req) { /* ... */ }
  async onReadBooks(req) { /* ... */ }
  enrichBooks(books, req) { /* ... */ }
  async onSubmitOrder(req) { /* ... */ }
}
```

### Functional Style
```js
module.exports = function() {
  const { Books } = this.entities;

  this.before('CREATE', Books, validateBook);
  this.on('READ', Books, onReadBooks);
  this.after('READ', Books, enrichBooks);
  this.on('submitOrder', onSubmitOrder);

  function validateBook(req) { /* ... */ }
  async function onReadBooks(req) { /* ... */ }
  function enrichBooks(books, req) { /* ... */ }
  async function onSubmitOrder(req) { /* ... */ }
}
```

## Handler Phases

### before Handlers
Run before the main handler. Use for validation, enrichment, authorization.

```js
// Validation
this.before('CREATE', 'Books', (req) => {
  const { title, price } = req.data;
  if (!title) req.error(400, 'Title is required');
  if (price < 0) req.error(400, 'Price must be positive');
});

// Enrichment
this.before('CREATE', 'Orders', (req) => {
  req.data.createdAt = new Date();
  req.data.status = 'draft';
});

// Authorization check
this.before('UPDATE', 'Books', async (req) => {
  const book = await SELECT.one.from('Books', req.data.ID);
  if (book.createdBy !== req.user.id && !req.user.is('admin')) {
    req.reject(403, 'Not authorized');
  }
});
```

### on Handlers
Replace or intercept the default implementation.

```js
// Custom READ implementation
this.on('READ', 'Books', async (req) => {
  const books = await cds.db.run(req.query);
  return books;
});

// Action handler
this.on('submitOrder', async (req) => {
  const { book, quantity } = req.data;
  // ... business logic
  return { success: true };
});

// Call next handler in chain
this.on('READ', 'Books', async (req, next) => {
  const result = await next();  // Call default/next handler
  return result.filter(b => b.stock > 0);
});
```

### after Handlers
Run after the main handler. Use for post-processing results.

```js
// Enrich results
this.after('READ', 'Books', (books, req) => {
  for (const book of books) {
    book.discount = book.stock > 100 ? '10%' : null;
    book.available = book.stock > 0;
  }
});

// Async after handler
this.after('CREATE', 'Orders', async (order, req) => {
  await this.emit('OrderCreated', { orderID: order.ID });
});
```

## Event Names

### CRUD Events
```js
this.on('CREATE', 'Books', handler);
this.on('READ', 'Books', handler);
this.on('UPDATE', 'Books', handler);
this.on('DELETE', 'Books', handler);
```

### Wildcard Events
```js
// All CRUD events on Books
this.before('*', 'Books', handler);

// All entities
this.before('CREATE', '*', handler);

// All events on all entities
this.before('*', handler);
```

### Custom Actions/Functions
```js
// Unbound action
this.on('submitOrder', handler);

// Bound action (entity-level)
this.on('confirm', 'Orders', handler);

// Function
this.on('getTotal', 'Orders', handler);
```

### Draft Events
```js
this.on('NEW', 'Books', handler);      // Create draft
this.on('EDIT', 'Books', handler);     // Edit existing
this.on('PATCH', 'Books', handler);    // Update draft
this.on('SAVE', 'Books', handler);     // Activate draft
this.on('CANCEL', 'Books', handler);   // Discard draft
```

## Request Object (req)

### Properties
```js
this.on('CREATE', 'Books', (req) => {
  req.event;      // 'CREATE', 'READ', 'UPDATE', 'DELETE', or action name
  req.target;     // Entity definition from CSN
  req.entity;     // Entity name string
  req.path;       // Full path '/Books(123)'
  req.query;      // CQN query object
  req.data;       // Request payload
  req.params;     // URL parameters [{ID: '123'}]
  req.headers;    // HTTP headers
  req.user;       // Authenticated user
  req.tenant;     // Tenant ID (multitenant apps)
  req.locale;     // User locale
  req.timestamp;  // Request timestamp
  req.id;         // Correlation ID
});
```

### User Object
```js
req.user.id;              // User ID
req.user.is('admin');     // Check role
req.user.attr.country;    // User attribute
req.user.roles;           // Assigned roles array
```

### Response Methods
```js
// Success responses
req.reply(data);                    // Return data
return data;                        // Same as reply

// Errors
req.reject(400, 'Bad request');     // Throw immediately
req.reject(404);                    // HTTP status only
req.error(400, 'Error 1');          // Collect error
req.error(400, 'Error 2');          // Multiple errors
// Errors collected, rejected at end of phase

// Warnings/Info (collected in response headers)
req.warn(200, 'Warning message');
req.info(200, 'Info message');
req.notify(200, 'Notification');
```

### Query Manipulation
```js
this.before('READ', 'Books', (req) => {
  // Add where clause
  req.query.where({ stock: { '>': 0 } });

  // Limit results
  req.query.limit(100);

  // Add columns
  req.query.columns('ID', 'title', 'author.name as authorName');
});
```

## Error Handling

### Throwing Errors
```js
// Immediate rejection
if (!valid) req.reject(400, 'Invalid data');

// With error code
req.reject(400, 'INVALID_INPUT', 'Invalid input data');

// With target field
req.reject(400, { message: 'Invalid', target: 'title' });

// Multiple errors (collected)
if (!data.title) req.error(400, 'Title required', 'title');
if (!data.price) req.error(400, 'Price required', 'price');
// Framework rejects if req.errors is not empty
```

### Error Codes
```js
const { errors } = require('@sap/cds');

// Standard CAP errors
throw new errors.NotFound('Book not found');
throw new errors.Unauthorized('Login required');
throw new errors.Forbidden('Access denied');
```

## Database Operations

### Using cds.db
```js
const { Books } = cds.entities;

// SELECT
const books = await SELECT.from(Books).where({ stock: { '>': 0 } });
const book = await SELECT.one.from(Books, bookId);

// INSERT
await INSERT.into(Books).entries({ title: 'New Book', stock: 10 });

// UPDATE
await UPDATE(Books, bookId).set({ stock: 50 });
await UPDATE(Books).set({ stock: { '+=': 10 } }).where({ genre: 'fiction' });

// DELETE
await DELETE.from(Books, bookId);
await DELETE.from(Books).where({ stock: 0 });

// UPSERT
await UPSERT.into(Books).entries({ ID: bookId, title: 'Updated' });
```

### Using req.query
```js
this.on('READ', 'Books', async (req) => {
  // Run the incoming query
  return await cds.db.run(req.query);
});
```

### Transactions
```js
this.on('transferStock', async (req) => {
  const { from, to, amount } = req.data;

  // Automatic transaction within handler
  await UPDATE(Books, from).set({ stock: { '-=': amount } });
  await UPDATE(Books, to).set({ stock: { '+=': amount } });

  // Or explicit transaction
  return cds.tx(async (tx) => {
    await tx.run(UPDATE(Books, from).set({ stock: { '-=': amount } }));
    await tx.run(UPDATE(Books, to).set({ stock: { '+=': amount } }));
    return { success: true };
  });
});
```

## Connecting to Services

### Database Service
```js
const db = await cds.connect.to('db');
await db.run(SELECT.from('Books'));
```

### Other CAP Services
```js
// Connect to another service
const adminSrv = await cds.connect.to('AdminService');
const books = await adminSrv.read('Books');

// Send actions
await adminSrv.send('updateStock', { book: bookId, delta: 10 });
```

### Remote Services
```js
// Configured in package.json cds.requires
const externalApi = await cds.connect.to('ExternalAPI');
const result = await externalApi.run(SELECT.from('Products'));
```

## Event Emission

### Emit Events
```js
// Emit to own service
this.emit('OrderCreated', { orderID: order.ID });

// Emit to messaging service
const messaging = await cds.connect.to('messaging');
await messaging.emit('OrderCreated', { orderID: order.ID });
```

### Subscribe to Events
```js
module.exports = async function() {
  const messaging = await cds.connect.to('messaging');

  messaging.on('OrderCreated', async (msg) => {
    const { orderID } = msg.data;
    console.log('Order created:', orderID);
  });
}
```

## Lifecycle Events

```js
// Before commit
req.before('commit', async () => {
  // Run before transaction commits
});

// After success
req.on('succeeded', async () => {
  // Run after successful commit
  // Note: Outside transaction!
});

// After failure
req.on('failed', async () => {
  // Run after rollback
});

// Always (success or failure)
req.on('done', async () => {
  // Cleanup logic
});
```

## Context Access

### cds.context
```js
// Available anywhere in async call chain
const { user, tenant, locale } = cds.context;
```

### Setting Context
```js
// For background jobs
cds.context = { user: new cds.User('system'), tenant: 't1' };
await doSomething();
```

## TypeScript

```ts
import cds from '@sap/cds';
import { Request } from '@sap/cds';

export default class CatalogService extends cds.ApplicationService {
  async init() {
    this.on('READ', 'Books', this.readBooks);
    return super.init();
  }

  private async readBooks(req: Request) {
    return await cds.db.run(req.query);
  }
}
```
