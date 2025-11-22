# Data Modeling Reference

**Source**: https://github.com/SAP-docs/sap-datasphere/tree/main/docs/Acquiring-Preparing-Modeling-Data/Modeling-Data-in-the-Data-Builder

---

## Table of Contents

1. [Analytic Models](#analytic-models)
2. [Dimensions](#dimensions)
3. [Facts and Measures](#facts-and-measures)
4. [Hierarchies](#hierarchies)
5. [Variables](#variables)
6. [Currency and Unit Conversion](#currency-and-unit-conversion)
7. [Structures](#structures)
8. [Business Builder](#business-builder)
9. [Semantic Types](#semantic-types)
10. [Associations](#associations)

---

## Analytic Models

Analytic models provide analytics-ready semantic structures for SAP Analytics Cloud.

### Creating an Analytic Model

**From Scratch**:
1. Data Builder > New Analytic Model
2. Add fact source
3. Add dimension associations
4. Define measures
5. Configure variables
6. Save and deploy

**From Existing View/Table**:
1. Open view or table
2. Select "Create Analytic Model"
3. Automatic fact/dimension detection
4. Refine and deploy

### Model Components

| Component | Purpose | Cardinality |
|-----------|---------|-------------|
| Fact | Transactional data | 1 per model |
| Dimension | Master data | 0..n per model |
| Measure | Metrics | 1..n per model |
| Variable | Parameters | 0..n per model |

### Fact Sources

**Supported Sources**:
- Views (graphical, SQL)
- Local tables
- Remote tables

**Requirements**:
- Must contain measurable columns
- Should have dimension keys
- Recommended: time dimension key

### Adding Dimensions

1. Select fact source
2. Identify dimension key columns
3. Associate dimension views/tables
4. Map key columns

### Changing Model Sources

**Replace Fact Source**:
1. Open analytic model
2. Select new fact source
3. Remap associations
4. Verify measures

**Change Underlying Model**:
- Update source view
- Propagate changes
- Validate model integrity

### Data Preview

Preview data in analytic models:
- Select dimensions to display
- Choose measures
- Apply filters
- Verify aggregations

---

## Dimensions

Dimensions categorize and filter analytical data.

### Creating Dimensions

**Dimension View Requirements**:
- Key column(s)
- Text column (optional)
- Hierarchy columns (optional)
- Additional attributes

### Dimension Types

| Type | Use Case | Features |
|------|----------|----------|
| Standard | General categorization | Key, text, attributes |
| Time | Calendar filtering | Date hierarchies |
| Fiscal Time | Custom calendars | Fiscal periods |
| Text Entity | Translations | Language-dependent |

### Time Dimensions

**Standard Time Dimension**:
```
Year > Quarter > Month > Week > Day
```

**Creating Time Data**:
1. Space Settings > Time Data
2. Select calendar type
3. Define date range
4. Generate time tables

### Fiscal Time Dimensions

Custom fiscal calendars:
- Define fiscal year start
- Configure periods
- Map to calendar dates

**Fiscal Variants**:
- Standard (12 months)
- 4-4-5 week calendar
- Custom period definitions

### Dimension Attributes

**Attribute Types**:
- Key attributes (identifiers)
- Text attributes (descriptions)
- Calculated attributes
- Reference attributes

**Prefix/Suffix**:
Add prefixes or suffixes to distinguish attributes:
```
MATERIAL_ID -> DIM_MATERIAL_ID
```

### Time Dependency

Enable time-dependent attributes (SCD Type 2):

1. Enable time dependency on dimension
2. Define valid-from/valid-to columns
3. Query returns values valid at reference date

---

## Facts and Measures

### Creating Facts

**Fact Requirements**:
- At least one measure column
- Dimension key columns
- Optional: time key column

### Measure Types

| Type | Description | Use Case |
|------|-------------|----------|
| Simple | Direct aggregation | SUM(amount) |
| Calculated | Derived measure | revenue - cost |
| Restricted | Filtered measure | SUM(amount) WHERE region='US' |
| Count Distinct | Unique values | COUNT(DISTINCT customer) |
| Non-Cumulative | Point-in-time | Inventory balance |
| Currency Conversion | Dynamic conversion | Convert to target currency |
| Unit Conversion | Dynamic conversion | Convert to target unit |

### Simple Measures

Define aggregation behavior:

```yaml
measure: total_sales
aggregation: SUM
source_column: sales_amount
```

### Calculated Measures

**Expression Examples**:
```sql
-- Profit margin
(revenue - cost) / revenue * 100

-- Year-over-year growth
(current_sales - previous_sales) / previous_sales * 100

-- Weighted average
SUM(price * quantity) / SUM(quantity)
```

### Restricted Measures

Apply filters to measures:

```yaml
measure: us_sales
base_measure: total_sales
filter: region = 'US'
```

**Multiple Restrictions**:
```yaml
filter: region = 'US' AND year = 2024
```

### Count Distinct Measures

Count unique values:

```yaml
measure: unique_customers
type: COUNT_DISTINCT
source_column: customer_id
```

### Non-Cumulative Measures

Point-in-time values (not additive over time):

**Use Cases**:
- Inventory levels
- Account balances
- Headcount

**Configuration**:
1. Set measure as non-cumulative
2. Define exception aggregation (LAST, FIRST, AVG)
3. Specify aggregation dimension

### Aggregation and Exception Aggregation

**Standard Aggregation**:
| Type | Behavior |
|------|----------|
| SUM | Add values |
| MIN | Minimum value |
| MAX | Maximum value |
| COUNT | Count rows |
| AVG | Average value |

**Exception Aggregation**:
Override standard aggregation for specific dimensions:
- LAST: Last value
- FIRST: First value
- NOP: No aggregation

---

## Hierarchies

Navigation structures for drill-down analysis.

### Hierarchy Types

| Type | Structure | Example |
|------|-----------|---------|
| Level-Based | Fixed levels | Year > Quarter > Month |
| Parent-Child | Recursive | Org hierarchy |
| External | Reference table | Custom hierarchy |

### Creating Level-Based Hierarchies

1. Add hierarchy to dimension
2. Define level columns
3. Set level order
4. Configure node properties

### Creating Parent-Child Hierarchies

1. Define parent column
2. Define child column
3. Configure orphan handling
4. Set root detection

### Hierarchy with Directory

Use directory table to define hierarchy nodes:

**Directory Table Structure**:
```
node_id | parent_id | node_name | level
H1      | null      | Root      | 1
H2      | H1        | Region    | 2
H3      | H2        | Country   | 3
```

### External Hierarchies

Reference external hierarchy definitions:
- BW hierarchies
- Custom hierarchy tables
- Time hierarchies

---

## Variables

Runtime parameters for analytic models.

### Variable Types

| Type | Purpose | Example |
|------|---------|---------|
| Standard | General filtering | Region selection |
| Reference Date | Time filtering | Reporting date |
| Filter | Predefined filters | Current year |
| Restricted Measure | Measure parameters | Currency selection |

### Creating Variables

1. Open analytic model
2. Add variable
3. Define type and properties
4. Set default value
5. Configure input help

### Standard Variables

**Properties**:
- Name and description
- Data type
- Selection type (single, multiple, range)
- Default value

### Reference Date Variables

Control time-dependent queries:
- Current date
- Specific date
- Relative date (yesterday, last month)

### Filter Variables

Predefined filter combinations:
```yaml
variable: current_fiscal_year
filters:
  - fiscal_year = CURRENT_FISCAL_YEAR
```

### Derived Variables

Calculate variable values from other variables:
```yaml
variable: previous_year
derived_from: selected_year - 1
```

### Dynamic Defaults

Set defaults based on context:
- Current user
- Current date
- System variables

---

## Currency and Unit Conversion

Dynamic conversion in analytic models.

### Currency Conversion

**Requirements**:
- TCUR* tables (SAP standard)
- Exchange rate types
- Reference date

### Setting Up Currency Conversion

1. Import TCUR tables (TCURR, TCURV, TCURF, TCURX)
2. Create currency conversion views
3. Enable conversion on measures
4. Configure target currency

### Currency Conversion Measure

```yaml
measure: sales_usd
type: currency_conversion
source_measure: sales_local
source_currency: local_currency
target_currency: 'USD'
exchange_rate_type: 'M'
reference_date: posting_date
```

### Currency Conversion Scenarios

| Scenario | Configuration |
|----------|---------------|
| Fixed target | target_currency = 'USD' |
| Variable target | target_currency = :IP_CURRENCY |
| Source currency column | source_currency = currency_key |

### Unit Conversion

**Requirements**:
- T006* tables (SAP standard)
- Unit conversion factors

### Setting Up Unit Conversion

1. Import T006 tables (T006, T006A, T006D)
2. Create unit conversion views
3. Enable conversion on measures
4. Configure target unit

### Unit Conversion Measure

```yaml
measure: quantity_kg
type: unit_conversion
source_measure: quantity
source_unit: unit_of_measure
target_unit: 'KG'
```

---

## Structures

Group measures for organized presentation.

### Creating Structures

1. Add structure to analytic model
2. Define structure members
3. Configure member properties

### Structure Members

**Types**:
- Simple member (reference measure)
- Calculated member (expression)
- Restricted member (filtered)

### Calculated Structure Members

```yaml
member: profit_margin
expression: ([revenue] - [cost]) / [revenue] * 100
```

### Restricted Structure Members

```yaml
member: us_revenue
base_member: revenue
restriction: region = 'US'
```

---

## Business Builder

Create business-oriented semantic models for consumption by SAP Analytics Cloud and Microsoft Excel.

### Business Builder Purpose

The Business Builder "combines, refines, and enriches Data Builder objects" with these benefits:
- **Loose Coupling**: Data source switching without disrupting reporting
- **Measure Enrichment**: Add derived, calculated measures and new attributes
- **Reusability**: Single business entities used across multiple models

### Business Builder Objects

| Object | Purpose | Contains |
|--------|---------|----------|
| Business Entity | Reusable component | Attributes, associations |
| Fact Model | Intermediate layer (optional) | Facts, dimensions |
| Consumption Model | Star schema for analytics | Business entities, measures |
| Perspective | Exposed view for BI tools | Selected measures/dimensions |

### Workflow

```
Data Builder Objects
        ↓
Business Entities (consume Data Builder entities)
        ↓
Fact Models (optional intermediate layer)
        ↓
Consumption Models (star schemas)
        ↓
Perspectives (expose to SAP Analytics Cloud, Excel, BI clients)
```

### Creating Business Entities

1. Business Builder > New Business Entity
2. Select data source (from Data Builder)
3. Define key
4. Add attributes
5. Define associations
6. **Loose coupling**: Can switch data source later without breaking reports

### Business Entity Types

**Dimension Entity**:
- Master data
- Key and text
- Hierarchy support

**Transaction Entity**:
- Transactional data
- Measures
- Dimension references

### Creating Fact Models

1. Business Builder > New Fact Model
2. Add fact entities
3. Add dimension entities
4. Define measures
5. Configure filters

### Creating Consumption Models

1. Business Builder > New Consumption Model
2. Add fact model
3. Configure perspectives
4. Add filters
5. Set authorizations

### Perspectives

Perspectives expose data to external tools:
- SAP Analytics Cloud
- Microsoft Excel
- Other BI clients
- OData API consumers

**Creating Perspectives**:
1. Open consumption model
2. Create new perspective
3. Select measures to expose
4. Select dimensions to include
5. Configure default filters
6. Deploy

### Authorization Scenarios

Row-level security in Business Builder:

1. Create authorization scenario
2. Define criteria (user attributes)
3. Assign to consumption model

### Import from SAP BW/4HANA

Import BW models:
- CompositeProviders
- InfoObjects
- Queries

---

## Semantic Types

Define column semantics for SAP Analytics Cloud.

### Attribute Semantic Types

| Type | Purpose | Example |
|------|---------|---------|
| Key | Identifier | customer_id |
| Text | Description | customer_name |
| Currency | Currency code | currency_key |
| Unit | Unit of measure | uom |
| Date | Date value | order_date |

### Measure Semantic Types

| Type | Purpose |
|------|---------|
| Amount | Currency amounts |
| Quantity | Measured quantities |
| Count | Counted values |
| Percentage | Ratios |

### Setting Semantic Types

1. Open view/table properties
2. Select column
3. Set semantic type
4. Configure related columns

---

## Associations

Define relationships between entities.

### Association Types

| Type | Cardinality | Use Case |
|------|-------------|----------|
| To-One | n:1 | Fact to dimension |
| To-Many | 1:n | Parent to children |

### Creating Associations

1. Select source entity
2. Add association
3. Select target entity
4. Map key columns
5. Configure properties

### Association Properties

**Join Type**:
- Inner (default)
- Left Outer

**Cardinality**:
- Exactly One
- Zero or One
- Many

### Text Associations

Link dimension to text entity:
```yaml
association: customer_text
target: customer_texts
join: customer_id = text_customer_id
filter: language = :SYSTEM_LANGUAGE
```

---

## Documentation Links

- **Analytic Models**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/e5fbe9e
- **Business Builder**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/3829d46
- **Dimensions**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/5aae0e9
- **Measures**: https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/e4cc3e8

---

**Last Updated**: 2025-11-22
