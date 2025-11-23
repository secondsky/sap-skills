# CAP Java Runtime Complete Reference

**Source**: https://cap.cloud.sap/docs/java/

## Getting Started

### Prerequisites
- Java 17+ (Java 21 recommended, SapMachine suggested)
- Apache Maven 3.6.3+
- CDS development kit (`@sap/cds-dk`)

### Project Creation

**Maven Archetype:**
```sh
mvn archetype:generate \
  -DarchetypeArtifactId="cds-services-archetype" \
  -DarchetypeGroupId="com.sap.cds" \
  -DarchetypeVersion="RELEASE" \
  -DinteractiveMode=true
```

**CDS CLI:**
```sh
cds init <project-name> --java
cd <project-name>
```

### Project Structure

| Directory | Purpose |
|-----------|---------|
| `db/` | CDS domain model and schema |
| `srv/src/main/java/` | Java source code |
| `srv/src/gen/java/` | Generated code from CDS |
| `pom.xml` | Maven configuration |

### Add Features

```sh
mvn com.sap.cds:cds-maven-plugin:add -Dfeature=TINY_SAMPLE
mvn com.sap.cds:cds-maven-plugin:add -Dfeature=CF
mvn com.sap.cds:cds-maven-plugin:add -Dfeature=INTEGRATION_TEST
```

### Build & Run

```sh
mvn spring-boot:run
```

Access at `http://localhost:8080` with mock user "authenticated".

## Event Handlers

### Registration

```java
@Component
@ServiceName("CatalogService")  // Links this handler to CatalogService defined in CDS
public class CatalogServiceHandler implements EventHandler {
  // Note: Constants like BOOKS, Books_, Authors_ are generated from CDS model
  // Located in srv/src/gen/java/ - regenerated on each `mvn compile`

  @Before(event = CqnService.EVENT_CREATE, entity = Books_.CDS_NAME)
  public void validateBook(CdsCreateEventContext context, Books book) {
    if (book.getTitle() == null || book.getTitle().isEmpty()) {
      throw new ServiceException(ErrorStatuses.BAD_REQUEST, "Title required");
    }
  }

  @On(event = "submitOrder")
  public void onSubmitOrder(SubmitOrderContext context) {
    String bookId = context.getBook();
    Integer quantity = context.getQuantity();
    // Business logic
    context.setResult(result);
  }

  @After(event = CqnService.EVENT_READ, entity = Books_.CDS_NAME)
  public void enrichBooks(CdsReadEventContext context, List<Books> books) {
    books.forEach(book -> {
      if (book.getStock() > 100) {
        book.setDiscount("10%");
      }
    });
  }
}
```

### Handler Phases

| Phase | Annotation | Purpose |
|-------|------------|---------|
| Before | `@Before` | Validation, authorization, enrichment |
| On | `@On` | Core business logic |
| After | `@After` | Post-processing, computed fields |

## Query API

### SELECT

```java
// Simple select
Select.from(BOOKS).columns(b -> b.ID(), b -> b.title());

// With where
Select.from(BOOKS)
  .columns(b -> b.ID(), b -> b.title(), b -> b.stock())
  .where(b -> b.stock().gt(0))
  .orderBy(b -> b.title().asc());

// Deep read
Select.from(BOOKS)
  .columns(b -> b.ID(), b -> b.title(),
           b -> b.author().expand(a -> a.name()));

// Single record
Select.one(BOOKS, book.ID()).columns(b -> b._all());
```

### INSERT

```java
// Single insert
Insert.into(BOOKS).entry(book);

// Multiple inserts
Insert.into(BOOKS).entries(bookList);

// With values
Insert.into(BOOKS)
  .columns("ID", "title", "stock")
  .values("uuid-1", "Book Title", 10);
```

### UPDATE

```java
// By key
Update.entity(BOOKS, bookId).data(book);

// With where
Update.entity(BOOKS)
  .data("stock", 50)
  .where(b -> b.ID().eq(bookId));
```

### DELETE

```java
// By key
Delete.from(BOOKS, bookId);

// With where
Delete.from(BOOKS).where(b -> b.stock().eq(0));
```

### UPSERT

```java
Upsert.into(BOOKS).entry(book);
```

## Error Handling

### ServiceException

```java
// Default 500 error
throw new ServiceException("An error occurred");

// With HTTP status
throw new ServiceException(ErrorStatuses.BAD_REQUEST, "Invalid input");
throw new ServiceException(ErrorStatuses.NOT_FOUND, "Book not found");
throw new ServiceException(ErrorStatuses.CONFLICT, "Insufficient stock");

// With cause
throw new ServiceException(ErrorStatuses.BAD_REQUEST, "Error", originalException);
```

### Messages API

```java
@Autowired
Messages messages;

// Collect messages without throwing
messages.error("Error message").code("ERR001");
messages.warn("Warning message");
messages.info("Info message");
messages.success("Success message");

// Throw if errors collected
messages.throwIfError();
```

### Message Formatting

```java
// SLF4J placeholders
messages.warn("Cannot order {} books: insufficient stock", quantity);

throw new ServiceException(ErrorStatuses.BAD_REQUEST,
  "Invalid value: '{}'", wrongValue);
```

### Localized Messages

```properties
# src/main/resources/messages.properties
book.title.required = Book title is required
order.stock.insufficient = Only {0} items available

# src/main/resources/messages_de.properties
book.title.required = Buchtitel ist erforderlich
```

```java
throw new ServiceException(ErrorStatuses.BAD_REQUEST, "book.title.required");
messages.error("order.stock.insufficient", availableStock);
```

### Message Targets

```java
// Target specific field
throw new ServiceException(ErrorStatuses.BAD_REQUEST, "Title required")
  .messageTarget(Books_.class, b -> b.title());

// Nested association
throw new ServiceException(ErrorStatuses.BAD_REQUEST, "Author name required")
  .messageTarget(Books_.class, b -> b.author().name());
```

## Persistence Services

### Access Database

```java
@Autowired
PersistenceService db;

// Run query
List<Books> books = db.run(Select.from(BOOKS)).listOf(Books.class);

// Single result
Books book = db.run(Select.one(BOOKS, bookId)).single(Books.class);
```

### Transactions

```java
// Automatic transaction in handler
@On(event = "transfer")
public void transfer(TransferContext context) {
  // All operations in same transaction
  db.run(Update.entity(ACCOUNTS, from).data("balance", fromBalance - amount));
  db.run(Update.entity(ACCOUNTS, to).data("balance", toBalance + amount));
  // Auto-commit on success, rollback on exception
}
```

## Spring Boot Integration

### Configuration

```yaml
# application.yaml
cds:
  datasource:
    url: jdbc:sqlite:file:./db.sqlite
  security:
    mock:
      enabled: true
```

### Dependency Injection

```java
@Component
public class MyHandler implements EventHandler {

  @Autowired
  PersistenceService db;

  @Autowired
  Messages messages;

  @Autowired
  CdsRuntime runtime;
}
```

## Security

### Authorization in Handlers

```java
@Before(event = CqnService.EVENT_UPDATE, entity = Books_.CDS_NAME)
public void checkAuthorization(CdsUpdateEventContext context) {
  UserInfo user = context.getUserInfo();

  if (!user.hasRole("admin")) {
    throw new ServiceException(ErrorStatuses.FORBIDDEN, "Admin required");
  }
}
```

### User Information

```java
UserInfo user = context.getUserInfo();
user.getName();           // User ID
user.hasRole("admin");    // Check role
user.getAttributeValues("country");  // User attributes
user.isAuthenticated();   // Auth status
```

## Multitenancy

### Tenant Access

```java
@On(event = CqnService.EVENT_READ, entity = Books_.CDS_NAME)
public void readBooks(CdsReadEventContext context) {
  String tenant = context.getUserInfo().getTenant();
  // Tenant-specific logic
}
```

## Messaging

### Emit Events

```java
@Autowired
MessagingService messaging;

@After(event = CqnService.EVENT_CREATE, entity = Orders_.CDS_NAME)
public void emitOrderCreated(CdsCreateEventContext context, Orders order) {
  messaging.emit("OrderCreated", Map.of(
    "orderID", order.getId(),
    "customer", order.getCustomerId()
  ));
}
```

### Subscribe to Events

```java
@On(service = "messaging", event = "OrderCreated")
public void onOrderCreated(MessagingEventContext context) {
  Map<String, Object> data = context.getData();
  String orderId = (String) data.get("orderID");
  // Handle event
}
```

## Fiori Drafts

### Enable Drafts

```cds
annotate AdminService.Books with @odata.draft.enabled;
```

### Draft Handlers

```java
@Before(event = DraftService.EVENT_DRAFT_ACTIVATE, entity = Books_.CDS_NAME)
public void validateDraft(DraftActivateEventContext context) {
  // Validate before activation
}

@On(event = DraftService.EVENT_DRAFT_NEW, entity = Books_.CDS_NAME)
public void onDraftNew(DraftNewEventContext context) {
  // Initialize draft
}
```

## Testing

### Unit Testing

```java
@ExtendWith(CdsTestExtension.class)
public class CatalogServiceTest {

  @Autowired
  CqnService catalogService;

  @Test
  void testReadBooks() {
    Result result = catalogService.run(Select.from(BOOKS));
    assertThat(result.list()).isNotEmpty();
  }
}
```

### Integration Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class IntegrationTest {

  @Autowired
  MockMvc mockMvc;

  @Test
  void testGetBooks() throws Exception {
    mockMvc.perform(get("/odata/v4/CatalogService/Books"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.value").isArray());
  }
}
```

## Configuration Properties

```yaml
cds:
  # Database
  datasource:
    url: jdbc:sqlite::memory:

  # OData
  odata:
    version: v4

  # Security
  security:
    mock:
      enabled: true
      users:
        - name: admin
          roles: [admin]

  # Multitenancy
  multiTenancy:
    enabled: true
```
