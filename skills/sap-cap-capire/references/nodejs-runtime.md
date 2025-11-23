# CAP Node.js Runtime Complete Reference

**Source**: https://cap.cloud.sap/docs/node.js/

## Query API (cds.ql)

### Query Construction Methods

```js
const { Books, Authors } = cds.entities;

// SELECT queries
const books = await SELECT.from(Books);
const book = await SELECT.one.from(Books, bookId);
const titles = await SELECT.from(Books).columns('ID', 'title');
const distinct = await SELECT.distinct.from(Books).columns('genre');

// With fluent API
await SELECT.from(Books)
  .columns('ID', 'title', 'author.name as authorName')
  .where({ stock: { '>': 0 } })
  .orderBy('title asc')
  .limit(10, 20);

// INSERT
await INSERT.into(Books).entries({ title: 'New Book', stock: 10 });
await INSERT.into(Books).entries([{ title: 'A' }, { title: 'B' }]);

// UPDATE
await UPDATE(Books, bookId).set({ stock: 50 });
await UPDATE(Books).set({ stock: { '+=': 10 } }).where({ genre: 'fiction' });

// DELETE
await DELETE.from(Books, bookId);
await DELETE.from(Books).where({ stock: 0 });

// UPSERT
await UPSERT.into(Books).entries({ ID: bookId, title: 'Updated' });
```

### WHERE Clause Operators

```js
// Comparison
.where({ stock: 10 })                    // equals
.where({ stock: { '>': 10 } })           // greater than
.where({ stock: { '>=': 10 } })          // greater or equal
.where({ stock: { '<': 10 } })           // less than
.where({ stock: { '<=': 10 } })          // less or equal
.where({ stock: { '!=': 0 } })           // not equal
.where({ stock: { between: [10, 50] } }) // between
.where({ title: { like: '%CAP%' } })     // like
.where({ genre: { in: ['A', 'B'] } })    // in list

// AND (multiple conditions)
.where({ stock: { '>': 0 }, price: { '<': 100 } })

// OR
.where({ or: [{ stock: { '>': 100 } }, { price: { '<': 10 } }] })

// Complex nested
.where({ and: [{ genre: 'fiction' }, { or: [{ stock: { '>': 50 } }, { featured: true }] }] })
```

### Deep Read with Expand

```js
// Fluent expand syntax
await SELECT.from(Books, b => {
  b.ID,
  b.title,
  b.author(a => { a.ID, a.name }),
  b.reviews(r => { r.rating, r.text })
});

// Navigation with filter
await SELECT.from(Authors, a => {
  a.name,
  a.books(b => { b.title }).where({ stock: { '>': 0 } })
});
```

### Locking

```js
// Exclusive lock (FOR UPDATE)
const book = await SELECT.from(Books, bookId).forUpdate();

// Shared lock
const book = await SELECT.from(Books, bookId).forShareLock();
```

## Transaction Management (cds.tx)

### Automatic Transaction

```js
// Automatic commit/rollback
await cds.tx(async () => {
  await INSERT.into(Authors).entries({ name: 'Emily Brontë' });
  await INSERT.into(Books).entries({ title: 'Wuthering Heights' });
});
// Commits on success, rolls back on error
```

### Manual Transaction Control

```js
const tx = srv.tx();
try {
  await tx.run(SELECT.from(Books, bookId).forUpdate());
  await tx.update(Books, bookId).with(data);
  await tx.commit();
} catch (e) {
  await tx.rollback(e);
}
```

### Background Jobs with cds.spawn()

```js
// Run once immediately
cds.spawn({ user: cds.User.privileged }, async () => {
  await processBackgroundTask();
});

// Run every 60 seconds
cds.spawn({ every: 60000 }, async () => {
  await cleanupExpiredData();
});

// Run after 5 seconds delay
cds.spawn({ after: 5000 }, async () => {
  await sendNotification();
});
```

### Context Access

```js
// Access anywhere in async chain
const { user, tenant, locale } = cds.context;

// Set context for background job
cds.context = { user: new cds.User('system'), tenant: 't1' };
```

## Authentication

### User Object (cds.User)

```js
// Access current user
const user = cds.context.user;
user.id;                    // User ID
user.is('admin');           // Check role
user.attr.country;          // User attribute
user.roles;                 // Assigned roles

// Special users
cds.User.Privileged;        // Bypasses authorization
cds.User.Anonymous;         // Unauthenticated
cds.User.default;           // Fallback user
```

### Authentication Configuration

```json
{
  "cds": {
    "requires": {
      "auth": {
        "[development]": {
          "kind": "mocked",
          "users": {
            "alice": { "password": "alice", "roles": ["admin"] },
            "bob": { "password": "bob", "roles": ["user"] }
          }
        },
        "[production]": { "kind": "xsuaa" }
      }
    }
  }
}
```

### Authentication Strategies

| Strategy | Use Case |
|----------|----------|
| `mocked` | Development with predefined users |
| `jwt` | Production with UAA tokens |
| `xsuaa` | XSUAA-based with SAML attributes |
| `ias` | Identity Authentication Service |
| `custom` | Custom implementation |

### Programmatic Authorization

```js
this.before('*', req => {
  if (!req.user.is('authenticated')) req.reject(403);
});

this.before('UPDATE', 'Books', req => {
  if (!req.user.is('admin')) req.reject(403, 'Admin required');
});
```

## Database Service

### Connection

```js
const db = await cds.connect.to('db');
await db.run(SELECT.from('Books'));

// Direct access
await cds.db.run(query);
```

### Insert Results

```js
const result = await INSERT.into(Books).entries([...]);
result.affectedRows;  // Number of inserted rows
for (const key of result) {
  console.log(key.ID);  // Iterate over generated keys
}
```

### Connection Pool Configuration

```json
{
  "cds": {
    "requires": {
      "db": {
        "pool": {
          "min": 0,
          "max": 10,
          "acquireTimeoutMillis": 10000,
          "idleTimeoutMillis": 30000
        }
      }
    }
  }
}
```

### Native SQL

```js
// Run native SQL
const results = await cds.db.run(
  `SELECT * FROM Books WHERE stock > ?`,
  [10]
);
```

## Service Connection

### Connect to Services

```js
// Database
const db = await cds.connect.to('db');

// Other CAP services
const adminSrv = await cds.connect.to('AdminService');
const books = await adminSrv.read('Books');

// Remote services
const externalApi = await cds.connect.to('ExternalAPI');
```

### Send Requests

```js
const srv = await cds.connect.to('MyService');

// Read
await srv.read('Books').where({ stock: { '>': 0 } });

// Create
await srv.create('Books').entries({ title: 'New' });

// Update
await srv.update('Books', bookId).with({ stock: 50 });

// Delete
await srv.delete('Books', bookId);

// Actions
await srv.send('submitOrder', { book: bookId, quantity: 2 });
```

## Messaging

### Emit Events

```js
// From service
this.emit('OrderCreated', { orderID: order.ID });

// Via messaging service
const messaging = await cds.connect.to('messaging');
await messaging.emit('OrderCreated', { orderID: order.ID });
```

### Subscribe to Events

```js
const messaging = await cds.connect.to('messaging');
messaging.on('OrderCreated', async (msg) => {
  console.log('Order created:', msg.data.orderID);
});
```

### Configuration

```json
{
  "cds": {
    "requires": {
      "messaging": {
        "[development]": { "kind": "file-based-messaging" },
        "[production]": { "kind": "enterprise-messaging" }
      }
    }
  }
}
```

## Logging (cds.log)

```js
const LOG = cds.log('my-module');

LOG.debug('Debug message', data);
LOG.info('Info message');
LOG.warn('Warning message');
LOG.error('Error message', error);
```

### Configuration

```json
{
  "cds": {
    "log": {
      "levels": {
        "[development]": { "cds": "debug" },
        "[production]": { "cds": "info" }
      }
    }
  }
}
```

## Testing (cds.test)

```js
const cds = require('@sap/cds');

describe('CatalogService', () => {
  const { GET, POST, expect } = cds.test(__dirname + '/..');

  it('should return books', async () => {
    const { data } = await GET('/catalog/Books');
    expect(data.value).to.have.length.greaterThan(0);
  });

  it('should create order', async () => {
    const { status } = await POST('/catalog/submitOrder', {
      book: 'book-id',
      quantity: 2
    });
    expect(status).to.equal(200);
  });
});
```

## TypeScript Support

### Setup

```sh
cds add typescript
npm i -D typescript ts-node @types/node
```

### Handler Example

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

### Type Generation

```sh
npx @cap-js/cds-typer "*"
```

## Utilities (cds.utils)

```js
const { uuid } = cds.utils;
const id = uuid();  // Generate UUID

// Check environment
cds.env.production;  // true in production
cds.env.profiles;    // Active profiles
```
