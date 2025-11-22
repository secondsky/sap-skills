# SAP HANA CLI - Output Formats Reference

**Source**: https://github.com/SAP-samples/hana-developer-cli-tool-example

The hana-cli supports 17+ output formats for database metadata conversion and export.

---

## Format Overview

| Format | Extension | Use Case |
|--------|-----------|----------|
| `tbl` | - | Console table display (default) |
| `json` | .json | JSON data exchange |
| `yaml` | .yaml | YAML configuration |
| `csv` | .csv | Spreadsheet import |
| `excel` | .xlsx | Excel file export |
| `cds` | .cds | CAP CDS definitions |
| `cdl` | .cds | CDS Language format |
| `hdbcds` | .hdbcds | HANA native CDS |
| `hdbtable` | .hdbtable | HDB table definitions |
| `hdbmigrationtable` | .hdbmigrationtable | Migration tables |
| `sql` | .sql | SQL DDL statements |
| `sqlite` | .sql | SQLite-compatible SQL |
| `postgres` | .sql | PostgreSQL-compatible SQL |
| `edmx` | .edmx | OData EDMX metadata |
| `edm` | - | OData EDM |
| `annos` | .xml | OData annotations |
| `graphql` | .graphql | GraphQL schema |
| `openapi` | .json | OpenAPI specification |
| `swgr` | .json | Swagger specification |
| `jsdoc` | - | JSDoc documentation |

---

## Using Output Formats

### Syntax

```bash
hana-cli <command> --output <format>
# or
hana-cli <command> -o <format>
```

### Examples

```bash
# Console table (default)
hana-cli inspectTable -s SCHEMA -t TABLE

# JSON output
hana-cli inspectTable -s SCHEMA -t TABLE -o json

# CDS format
hana-cli inspectTable -s SCHEMA -t TABLE -o cds

# OpenAPI spec
hana-cli inspectTable -s SCHEMA -t TABLE -o openapi
```

---

## Format Details

### Console Formats

#### tbl (Table)
Human-readable table format for console display.

```bash
hana-cli tables -o tbl
```

Output:
```
┌─────────────────┬────────────┬──────────┐
│ TABLE_NAME      │ SCHEMA     │ ROWS     │
├─────────────────┼────────────┼──────────┤
│ CUSTOMERS       │ MYSCHEMA   │ 1000     │
│ ORDERS          │ MYSCHEMA   │ 5000     │
└─────────────────┴────────────┴──────────┘
```

---

### Data Exchange Formats

#### json
Standard JSON format.

```bash
hana-cli inspectTable -t CUSTOMERS -o json
```

Output:
```json
{
  "table": "CUSTOMERS",
  "schema": "MYSCHEMA",
  "columns": [
    {"name": "ID", "type": "INTEGER", "nullable": false},
    {"name": "NAME", "type": "NVARCHAR", "length": 100}
  ]
}
```

#### yaml
YAML format for configuration files.

```bash
hana-cli inspectTable -t CUSTOMERS -o yaml
```

#### csv
Comma-separated values for spreadsheet import.

```bash
hana-cli querySimple -q "SELECT * FROM CUSTOMERS" -o csv
```

#### excel
Microsoft Excel format (.xlsx).

```bash
hana-cli querySimple -q "SELECT * FROM CUSTOMERS" -o excel -f ./output -n customers
```

---

### CAP CDS Formats

#### cds
SAP Cloud Application Programming Model CDS.

```bash
hana-cli inspectTable -t CUSTOMERS -o cds
```

Output:
```cds
entity Customers {
  key ID : Integer;
  NAME : String(100);
  EMAIL : String(255);
  CREATED_AT : Timestamp;
}
```

#### cdl
CDS Language format (similar to cds).

```bash
hana-cli inspectTable -t CUSTOMERS -o cdl
```

---

### HANA Native Formats

#### hdbcds
HANA native CDS format.

```bash
hana-cli inspectTable -t CUSTOMERS -o hdbcds
```

Output:
```cds
context myschema {
  entity CUSTOMERS {
    key ID : Integer;
    NAME : String(100);
  };
};
```

#### hdbtable
HDB table definition format.

```bash
hana-cli inspectTable -t CUSTOMERS -o hdbtable
```

Output:
```hdbtable
COLUMN TABLE "MYSCHEMA"."CUSTOMERS" (
  "ID" INTEGER NOT NULL,
  "NAME" NVARCHAR(100),
  PRIMARY KEY ("ID")
)
```

#### hdbmigrationtable
Migration table format for HDI.

```bash
hana-cli inspectTable -t CUSTOMERS -o hdbmigrationtable
```

---

### SQL Formats

#### sql
Standard SQL DDL.

```bash
hana-cli inspectTable -t CUSTOMERS -o sql
```

Output:
```sql
CREATE TABLE "MYSCHEMA"."CUSTOMERS" (
  "ID" INTEGER NOT NULL,
  "NAME" NVARCHAR(100),
  PRIMARY KEY ("ID")
);
```

#### sqlite
SQLite-compatible SQL.

```bash
hana-cli inspectTable -t CUSTOMERS -o sqlite
```

#### postgres
PostgreSQL-compatible SQL.

```bash
hana-cli inspectTable -t CUSTOMERS -o postgres
```

---

### OData Formats

#### edmx
OData Entity Data Model XML.

```bash
hana-cli inspectTable -t CUSTOMERS -o edmx
```

Output:
```xml
<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0">
  <edmx:DataServices>
    <Schema Namespace="myschema">
      <EntityType Name="Customers">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
        <Property Name="NAME" Type="Edm.String" MaxLength="100"/>
      </EntityType>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>
```

#### edm
OData EDM format.

#### annos
OData annotations XML.

```bash
hana-cli inspectTable -t CUSTOMERS -o annos
```

---

### API Formats

#### openapi / swgr
OpenAPI/Swagger specification.

```bash
hana-cli inspectTable -t CUSTOMERS -o openapi
```

Output:
```json
{
  "openapi": "3.0.0",
  "info": {"title": "CUSTOMERS API"},
  "paths": {
    "/Customers": {
      "get": {...},
      "post": {...}
    }
  }
}
```

#### graphql
GraphQL schema definition.

```bash
hana-cli inspectTable -t CUSTOMERS -o graphql
```

Output:
```graphql
type Customers {
  ID: Int!
  NAME: String
  EMAIL: String
}

type Query {
  Customers: [Customers]
}
```

---

### Documentation Formats

#### jsdoc
JSDoc-style documentation.

```bash
hana-cli inspectProcedure -p MY_PROC -o jsdoc
```

---

## Mass Conversion

Convert multiple objects at once:

```bash
# Convert all tables in schema to CDS
hana-cli massConvert -s MYSCHEMA

# UI version for interactive selection
hana-cli massConvertUI
```

---

## Output Options

### HANA Types

Use native HANA data types instead of generic types:

```bash
hana-cli inspectTable -t CUSTOMERS -o cds --useHanaTypes
# or
hana-cli inspectTable -t CUSTOMERS -o cds --hana
```

### Quoted Identifiers

Preserve case-sensitive identifiers:

```bash
hana-cli inspectTable -t CUSTOMERS -o sql --useQuoted
# or
hana-cli inspectTable -t CUSTOMERS -o sql -q
```

### File Output

Save to file instead of console:

```bash
hana-cli querySimple -q "SELECT * FROM T" -o json -f ./output -n data
# Creates: ./output/data.json
```

---

## Format Compatibility Matrix

| Source | CDS | SQL | EDMX | GraphQL | OpenAPI |
|--------|-----|-----|------|---------|---------|
| Tables | Yes | Yes | Yes | Yes | Yes |
| Views | Yes | Yes | Yes | Yes | Yes |
| Procedures | Partial | Yes | No | No | No |
| Functions | Partial | Yes | No | No | No |
| Calc Views | Yes | Yes | Yes | Yes | Yes |

---

*Reference: https://github.com/SAP-samples/hana-developer-cli-tool-example*
