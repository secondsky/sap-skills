# Localization and Temporal Data Reference

**Source**: https://cap.cloud.sap/docs/guides/

## Internationalization (i18n)

### Text Bundle Structure

Text bundles use properties files with locale suffixes:

```
_i18n/
├── i18n.properties          # Default fallback
├── i18n_en.properties       # English
├── i18n_de.properties       # German
├── i18n_fr.properties       # French
└── i18n_zh_TW.properties    # Traditional Chinese
```

### Properties File Format

```properties
# i18n_en.properties
Book = Book
Books = Books
Author = Author
title = Title
description = Description
stock = Stock
price = Price

# Error messages
error.title.required = Title is required
error.stock.negative = Stock cannot be negative
```

### Using in CDS

```cds
entity Books {
  key ID : UUID;
  title  : String @title: '{i18n>title}';
  descr  : String @title: '{i18n>description}';
  stock  : Integer @title: '{i18n>stock}';
}
```

### CSV Alternative

```csv
key;en;de;fr
Book;Book;Buch;Livre
Author;Author;Autor;Auteur
title;Title;Titel;Titre
```

### Locale Determination (Priority Order)

1. `sap-locale` URL parameter
2. `sap-language` URL parameter
3. `Accept-Language` HTTP header

### Configuration

```json
{
  "cds": {
    "i18n": {
      "default_language": "en",
      "folders": ["_i18n", "i18n"],
      "preserved_locales": ["zh_CN", "zh_TW", "en_GB", "fr_CA"]
    }
  }
}
```

---

## Localized Data

### Declaration

Mark fields that need translations:

```cds
entity Books {
  key ID : UUID;
  title  : localized String(111);
  descr  : localized String(1111);
  stock  : Integer;  // Not localized
}
```

### Auto-Generated Entities

The compiler generates:

**1. Texts Entity:**
```cds
entity Books.texts {
  key locale : sap.common.Locale;  // e.g., 'en', 'de'
  key ID : UUID;
  title : String(111);
  descr : String(1111);
}
```

**2. Association to Localized:**
```cds
entity Books {
  // ... original fields
  texts : Composition of many Books.texts on texts.ID = ID;
  localized : Association to Books.texts on localized.ID = ID
              and localized.locale = $user.locale;
}
```

**3. Localized View:**
```cds
entity localized.Books as select from Books {
  *,
  coalesce(localized.title, title) as title,
  coalesce(localized.descr, descr) as descr
};
```

### Reading Localized Data

```js
// Returns data in user's locale (with fallback)
await SELECT.from('Books');

// Access all translations
await SELECT.from('Books').columns('*', { texts: ['*'] });

// Specific locale
await SELECT.from('Books.texts').where({ locale: 'de' });
```

### Writing Localized Data

```js
// Deep insert with translations
await INSERT.into('Books').entries({
  ID: 'book-1',
  title: 'Default Title',
  descr: 'Default Description',
  texts: [
    { locale: 'de', title: 'Deutscher Titel', descr: 'Deutsche Beschreibung' },
    { locale: 'fr', title: 'Titre Français', descr: 'Description Française' }
  ]
});

// Update specific translation
await UPDATE('Books.texts')
  .set({ title: 'Neuer Titel' })
  .where({ ID: bookId, locale: 'de' });
```

### Initial Data (CSV)

**Books.csv (default language):**
```csv
ID;title;descr;stock
book-1;Wuthering Heights;A classic novel;100
```

**Books_texts.csv (translations):**
```csv
ID;locale;title;descr
book-1;de;Sturmhöhe;Ein klassischer Roman
book-1;fr;Les Hauts de Hurlevent;Un roman classique
```

---

## Temporal Data

### Declaration

**Using Annotations:**
```cds
entity WorkAssignments {
  key ID : UUID;
  employee : Association to Employees;
  role : String(100);
  validFrom : Date @cds.valid.from;
  validTo : Date @cds.valid.to;
}
```

**Using Temporal Aspect:**
```cds
using { temporal } from '@sap/cds/common';

entity WorkAssignments : temporal {
  key ID : UUID;
  employee : Association to Employees;
  role : String(100);
}
// Adds validFrom : Timestamp and validTo : Timestamp
```

### Time Slice Keys

Primary key becomes: `(ID, validFrom)`

```cds
// Exposed as single key in OData
entity WorkAssignments {
  key ID : UUID;
  // validFrom is implicitly part of the key
}
```

### Reading Temporal Data

**Current Data (as of now):**
```http
GET /WorkAssignments
```

**Time-Travel Query (historical snapshot):**
```http
GET /WorkAssignments?sap-valid-at=date'2022-01-01'
```

**Time-Period Query (history since date):**
```http
GET /WorkAssignments?sap-valid-from=date'2020-01-01'
```

### Programmatic Access

```js
// Current time slices
await SELECT.from('WorkAssignments');

// Specific date
cds.context = { timestamp: new Date('2022-01-01') };
await SELECT.from('WorkAssignments');

// All time slices
await SELECT.from('WorkAssignments')
  .columns('*')
  .where`ID = ${id}`;
```

### Writing Temporal Data

Temporal writes require custom handlers:

```js
// Create new time slice
await INSERT.into('WorkAssignments').entries({
  ID: 'wa-1',
  employee_ID: 'emp-1',
  role: 'Developer',
  validFrom: '2023-01-01',
  validTo: '9999-12-31'
});

// End current slice and start new one
this.on('UPDATE', 'WorkAssignments', async (req) => {
  const { ID } = req.params[0];
  const today = new Date().toISOString().split('T')[0];

  // End current slice
  await UPDATE('WorkAssignments')
    .set({ validTo: today })
    .where({ ID, validTo: '9999-12-31' });

  // Create new slice
  await INSERT.into('WorkAssignments').entries({
    ID,
    ...req.data,
    validFrom: today,
    validTo: '9999-12-31'
  });
});
```

### Temporal Aspect Definition

```cds
// From @sap/cds/common
aspect temporal {
  validFrom : Timestamp @cds.valid.from;
  validTo   : Timestamp @cds.valid.to;
}
```

### Limitations

- SQLite doesn't support `sap-valid-at` queries (no session context)
- Temporal writes require custom implementation
- Transitive temporal queries may produce redundant results
