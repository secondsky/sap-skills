# SAP API Style Guide - Complete Reference Documentation
## Java/JavaScript/.NET API Documentation (All 39 Files Consolidated)

**Source**: https://github.com/SAP-docs/api-style-guide/tree/main/docs/40-java-javascript-and-msnet
**Last Verified**: 2025-11-21
**Comprehensive Reference**: All 39 markdown files extracted and organized

---

## TABLE OF CONTENTS

1. [Overview & Core Principles](#overview--core-principles)
2. [Documentation Comments Structure](#documentation-comments-structure)
3. [Java API Documentation Templates](#java-api-documentation-templates)
4. [Java & JavaScript Common Tags](#java--javascript-common-tags)
5. [JavaScript-Specific Tags](#javascript-specific-tags)
6. [.NET Documentation Tags](#net-documentation-tags)
7. [C/C++ Documentation Tags](#cc-documentation-tags)
8. [HTML Tags for Documentation](#html-tags-for-documentation)
9. [Best Practices & Guidelines](#best-practices--guidelines)
10. [Language-Specific Syntax](#language-specific-syntax)

---

## OVERVIEW & CORE PRINCIPLES

### Purpose of API Reference Documentation
- Auto-generates API reference documentation from source code in Java, JavaScript, and Microsoft .NET
- Standardizes how developers document code elements to enable professional, consistent API documentation
- Three essential areas covered:
  1. **Documentation Comments** - Write according to specific rules
  2. **Documentation Tags** - Recognized by API documentation generators
  3. **Language-Specific Templates** - Standardized approaches for different languages

### Key Architectural Principles
- Object-oriented languages (Java, JavaScript, .NET, C/C++) share common API structural elements
- Documentation is extracted from source code comments rather than maintained separately
- Consistency across implementation ensures high-quality automated documentation generation

---

## DOCUMENTATION COMMENTS STRUCTURE

### General Structure Components
All documentation comments consist of two main components:
1. **Description** - Mandatory explanation of the code element
2. **Block Tags** - Special markers used by generation tools to structure output

### Language-Specific Comment Formats

#### Java and JavaScript
- Use specific comment syntax with delimiters
- Format: `/** ... */`
- Designated tag areas follow the description

#### .NET
- Supports XML-based documentation comments
- Alternative: External XML files using the `<include>` tag
- Format: `/// <tag>content</tag>`

### Placement Rules
- Place documentation comments **before** declarations of:
  - Namespaces
  - Classes
  - Interfaces
  - Class/interface members

### Mandatory vs. Optional
- **Description**: Mandatory when documenting classes, interfaces, class members, or interface members
- **Block Tags**: Used to provide structured metadata; many are optional

---

## JAVA API DOCUMENTATION TEMPLATES

### Template Categories (6 Primary Types)

#### 1. Overview Page Template
**Purpose**: Documents groups of packages; provides cover sheet for API documentation

**For Java APIs - Create `overview.html`**:
- Purpose of the API
- Main features in list format
- Package overview
- Links to external resources

**For JavaScript APIs - Create `readme.md`**:
- Clear title
- Brief description of functionality
- Bulleted links to major API components

**Key Recommendations**:
- Opening sentence should summarize API concisely
- Address: What problems does it solve? What are primary capabilities? How are packages organized?
- Include external references to guides, diagrams, help portals
- Optional but recommended addition

#### 2. Package Pages Template
**Purpose**: Documents individual Java packages using `package.html` file

**Mandatory Requirements**:
- "It is mandatory to use this file"
- Must be placed at appropriate folder level in source code

**Required Content Elements**:
1. **Purpose Statement** - Explain what package does
2. **Content Overview** - Describe grouped Java source files
3. **Background Information** - Provide context for understanding and usage
4. **Class Relationships** - Clarify connections between classes

**Format Guidelines**:
- Begin with summary sentence (doc comment format)
- Use HTML structure (DOCTYPE, head, body tags)
- Organize with paragraphs and lists
- Present progressively from general to specific

#### 3. Interface and Class Template
**Opening Statement Requirements**:
- Begin with imperative verb: "Allows you," "Enables you"
- OR use third-person singular indicative form
- Follow opening with supplementary details on subsequent lines
- Include background context and special considerations

**Two Documentation Approaches**:

**A) Classic API Format**
- Used for third-party developer applications
- Opening describes what interface "Represents/Contains/Provides/Defines"
- Example: "Allows you to manage connections in Data Access Layer internal connection pool"
- Follow with: "Provides basic methods to manage connections in context of use..."

**B) Service Provider Interface (SPI) Format**
- Designed for platform implementation (not direct developer use)
- Opening directs implementers to "Implement a service for" or "Provide an implementation of"
- Guide developers on implementation responsibility
- Simpler, more direct approach than Classic API

**Documentation Structure Elements**:
- Initial statement (verb or noun phrase)
- Supplementary information block
- Relevant cross-references (@see tags)
- Implementation requirements (for SPIs)

#### 4. Method Template
**Core Requirements**:
- "Background information needed to understand and use this method"
- "Special considerations that apply to this method"
- Description: mandatory first sentence plus optional additional content
- Block tags in specified order

**Standard Verb Usage by Method Type**:

| Method Type | Recommended Verb | Example |
|---|---|---|
| Constructor | Constructs | "Constructs a connection object" |
| Boolean | Indicates (whether...) | "Indicates whether the object can be used" |
| Getter | Returns/Retrieves/Gets | "Returns the connection parameter" |
| Setter | Defines/Sets | "Defines the connection timeout" |
| Other | Adds/Removes/Creates/Releases/[applicable verb] | "Creates a new database connection" |

**Block Tag Order**:
```
@param
@return
@throws
@see
@since
@deprecated
```

**Key Best Practices**:
1. **Default Values**: Setter descriptions should mention default property values
2. **Constructor Defaults**: Reference defaults if applicable
3. **Code Examples**: Use `<pre>` HTML tags within paragraph tags for code snippets
4. **Parameter Descriptions**: Format as "A(n) `type` object/value that [describes purpose]"
5. **Cross-References**: Use `@see` tags to link related methods (pair getters with setters)
6. **Parameter Order**: Document in same sequence as method signature

#### 5. Enum Template
**Enum-Level Documentation**:
- Start with "Provides..." or "An enumeration that provides..."
- Include background information needed for understanding and usage
- Note any special considerations applying to enum and its values

**Enum Value Documentation**:
- Begin with third-person singular verbs (e.g., "Allows," "Provides")
- OR use noun phrases
- Provide second line with additional context explaining behavior triggered by that value
- Single-line format using `/** Description */` is acceptable for brevity

**Documentation Styles**:
1. **Multi-line format**: Detailed explanations with `<p>` tags for paragraph breaks
2. **Single-line format**: Concise, straightforward descriptions

**Practical Example - SecurityStatus Enum**:
```
/**
 * Provides the statuses that can apply to a business security profile...
 */
public enum SecurityStatus {
    /**
     * Specifies that all elements are [action] in a business security profile setting
     */
    ELEMENT_STATUS
}
```

#### 6. Constant Template
**Starting the Description**:
- Begin with action verb in third-person singular form: "Specifies," "Defines," "Is"
- OR use noun phrase

**Information to Include**:
- "Background information needed to understand and use this constant"
- "Special considerations that apply to this constant"

**Syntax Options**:

**Multi-line Format (Recommended)**:
```java
/**
 * [Verb/Noun phrase describing the constant]
 * <p>Additional context or important notes</p>
 */
public static final constant_type constant_name = constant_value;
```

**Single-line Format (For Simple Constants)**:
```java
/** [Brief description of the constant] */
public static final constant_type constant_name = constant_value;
```

**Practical Examples**:
- Password constant: "The password used to log in to the CMS. This password must not contain any spaces."
- Simple constant: "The year of the date"

---

## JAVA & JAVASCRIPT COMMON TAGS

### Tag Organization Requirements

**Quality Standards**:
- "Always add value to your comment"
- Maintain consistency in tag ordering across documentation
- Tags are case-sensitive; block tag comments begin with uppercase letters

**Structural Rules**:
- Multiple instances of certain tags (like `@param`) allowed
- Some tags (like `@return`) appear only once
- "Group multiple block tags of the same type together"
- Avoid ending single-sentence tag comments with periods
- Don't duplicate automatically-generated information

**Recommended Tag Sequence** (Standard Order):
```
@param
@return
@throws
@see
@since
@deprecated
@version
```

### Comprehensive Tag Reference

#### @param Tag
**Purpose**: Documents method and function parameters

**Mandatory**: Yes - for every parameter in method and constructor descriptions

**Java Syntax**:
```java
@param parameter-name parameter-description
```

**JavaScript Syntax**:
```javascript
@param {type} parameter-name description
@param {type} [optional-name] description
@param {type1|type2} parameter-name description for union types
```

**Key Guidelines**:
- Use noun phrase to describe the value represented by the parameter
- Java: first letter lowercase, no hyphen before description
- JavaScript: first letter uppercase
- No periods at the end
- Document in signature order
- JavaScript: Mark optional parameters with square brackets `[parameter-name]`
- JavaScript: Multiple types using pipe separator `{type1|type2}`
- JavaScript: Use `{*}` for arbitrary types
- Describe defaults and possible values

**Practical Examples**:
```javascript
@param {String} url An absolute URL of the image
@param {Number} width The image width in pixels
@param {Number} [height] The image height in pixels (optional, defaults to width)
@param {String|Array} data Data to process - can be string or array
```

#### @return / @returns Tag
**Purpose**: Describes what a method or function returns

**Mandatory**: Yes - for all methods except constructors and void-returning methods

**Java Syntax**:
```java
@return description
```

**JavaScript Syntax**:
```javascript
@return {type1|type2|...} description
```

**Key Guidelines**:
- Start descriptions with noun phrase
- Begin with capital letter; avoid hyphens at start
- Do not conclude with a period
- Document all possible return scenarios, particularly `null` or Boolean values
- Java: wrap result name with `<code>...</code>` (object name, returned type, `null`, or Boolean value)
- JavaScript: Document multiple return types using `{type1|type2|...}` notation
- JavaScript: description is optional

**Example Patterns**:
```java
@return An <code>int</code> specifying the server port
@return <code>true</code> if the object can be used, <code>false</code> otherwise
```

```javascript
@return {db.ResultSet} The result set from the query
@return {String|Null} The configuration value or null if not found
```

#### @throws Tag
**Purpose**: Documents exceptions that methods may throw

**Mandatory**: Yes - for every exception a method can throw

**Java Syntax**:
```java
@throws type description
```

**JavaScript Syntax**:
```javascript
@throws {type} description
```

**Key Guidelines**:
- Describe exceptions using complete noun phrases as standard sentences
- Begin descriptions with capitalized words, avoiding hyphens at start
- Order multiple exceptions alphabetically by their names
- JavaScript: type parameter is optional (unlike Java)
- "You must have one tag for every exception" that method declares or throws

**Practical Examples**:
```java
@throws SDKException If an error occurs during the connection update
@throws NullPointerException If parameter name is null
@throws IllegalArgumentException If value exceeds maximum bounds
```

```javascript
@throws {$.db.SQLException} Throws an error on invalid parameter
@throws {Error} If connection is not established
```

#### @see Tag
**Purpose**: Creates references in "See Also" section; supports plain text, URLs, or labeled links

**Java Syntax Options**:
- Constants: `@see #constant`
- Constructors: `@see #constructor(Type, Type,...)`
- Methods: `@see #method(Type, Type,...)`
- Classes (qualified or unqualified): `@see ClassName` or `@see package.ClassName`
- Packages: `@see package`
- Plain text: `@see "free text"`
- Hyperlinks: `@see <a href="URL#value">text</a>`
- With optional label: `@see class-reference label`

**JavaScript Syntax Options**:
- Simple path: `@see setObject`
- With link tag: `@see {@link setObject} for more information`
- External URL: `@see {@link http://sap.help.com|the SAP Help Portal}`

**Key Guidelines**:
- Use double quotes for plain text references in Java
- JavaScript: paths automatically generate hyperlinks
- JavaScript: Use `@link` tag for free text hyperlinks
- Apply sparingly to keep comment readable
- Add where it adds value, only for first occurrence of API names
- Order from least to fully-qualified signatures (constants → packages)

**Practical Examples**:
```java
@see Table
@see Table#getColumns()
@see TableColumn#setDataType(TableDataType) setDataType
@see com.example.api.Connection
```

```javascript
@see setObject
@see {@link setObject} for more information
@see {@link http://sap.help.com|the SAP Help Portal}
```

#### @deprecated Tag
**Purpose**: Marks classes, interfaces, or members as no longer recommended for use

**Mandatory**: Block tag - must never be left blank

**Required Syntax Structure**:
```
@deprecated As of version NN, replaced by {@link class_name}
```

**Key Guidelines**:
1. **Version Information**: Start with "As of" followed by specific API version when deprecation occurred
2. **Replacement Reference**: Include "replaced by" with `@link` tag pointing to successor
3. **Additional Context**: May provide supplementary details about deprecation
4. Avoid specifying exact decommissioning timelines

**Practical Example**:
```java
/**
 * Returns the SELECT clause of a SQL query.
 *
 * @return A <code>String</code> that contains the SELECT clause
 * @deprecated As of version 2.4, replaced by {@link NewClass#getSelect()}
 * <p>{@link #getNewClass()} allows you to retrieve a {@link NewClass} object.</p>
 */
String getSelect();
```

#### @since Tag
**Purpose**: Indicates API version when class, interface, or member was introduced or modified

**Syntax**:
```
@since version-number
```

**Key Characteristics**:
- Optional tag
- Used within JavaDoc-style comments
- Specifies version number when functionality became available
- Helps developers understand compatibility requirements
- Commonly applied to methods, classes, and interfaces
- Supports semantic versioning (e.g., 14.0.5)

**Practical Example**:
```java
/**
 * Returns the connection parameter.
 *
 * @param name a <code>String</code> that represents the connection parameter name
 * @since 14.0.5
 */
ConnectionParameter getParameter(String name);
```

#### @version Tag
**Purpose**: Marks internal version of a class or interface

**Syntax**:
```
@version version-number
```

**Key Characteristics**:
- Optional element
- Internal use only - NOT rendered in API documentation outputs
- Useful for tracking internal version history without exposing metadata
- Supports standard versioning schemes (e.g., semantic versioning like "14.1.2")

**Practical Example**:
```java
/**
 * Gets the column description.
 *
 * @return A string that represents the description of the table column
 * @version 14.1.2
 */
String GetDescription();
```

### Inline Java Tags (Embedded in Comments)

#### {​@code text}
- Renders text in code font
- Prevents HTML markup and nested Javadoc tag interpretation
- Enables regular angle brackets instead of HTML entities

#### {​@docRoot}
- Provides relative path from any generated page to documentation root
- Useful for referencing shared files across all pages

#### {​@inheritDoc}
- Copies documentation from parent classes or interfaces
- Inserts at tag's location in current comment

#### {​@link}
- Creates hyperlinks to package, class, interface, or member documentation
- Displays visible text labels in code font
- Java: `{@link #method(Type) label}`
- JavaScript: `{@link pathOrURL|label}` or `[label]{@link pathOrURL}`

#### {​@linkplain}
- Functions identically to `{@link}`
- Displays labels in plain text formatting rather than code font

#### {​@literal text}
- Displays text without interpreting HTML markup or nested Javadoc tags
- Complements `{@code}` for non-code scenarios

#### {​@value [package.class#constant]}
- Shows current value of specified constant
- Optional parameter reference

---

## JAVASCRIPT-SPECIFIC TAGS

### Additional JavaScript Tags

#### @class (synonym: @constructor)
**Purpose**: Designates a function as a constructor requiring the `new` keyword

**Usage**: Allows describing the class itself rather than just the constructor function

**Example**:
```javascript
/**
 * Creates a new Person.
 * @class Represents a person.
 */
function Person(name) {
    this.name = name;
}
```

#### @file (synonyms: @fileoverview, @overview)
**Purpose**: Documents entire file's purpose

**Placement**: At beginning of file in documentation comment

**Example**:
```javascript
/**
 * @file
 * This file contains utility functions for data manipulation
 * including sorting, filtering, and transformation operations.
 */
```

#### @property (synonym: @prop)
**Purpose**: Streamlines documentation of static properties within classes, namespaces, or objects

**Features**: Supports nested property structures with type specifications

**Example**:
```javascript
/**
 * @property {Number} width - The object width
 * @property {Number} height - The object height
 * @property {Object} config - Configuration object
 * @property {String} config.name - Configuration name
 */
var defaults = {
    width: 100,
    height: 100,
    config: {
        name: 'default'
    }
};
```

#### @example Tag (JavaScript-Specific)
**Purpose**: Inserts code examples into documentation comment blocks

**Key Guidelines**:
- Add empty lines and indent code lines for readability
- Titles are optional but enhance clarity
- Tag may be repeated multiple times in single comment

**Syntax**:
```javascript
@example [optional title]
[code content]
```

**Implementation Pattern - With Title**:
```javascript
/**
 * Searches for matching records
 *
 * @example Using simple search
 * var results = find("John");
 *
 * @example Using advanced filters
 * var results = find("John", {exact: true, sortBy: "name"});
 */
```

**Best Practices**:
1. Use whitespace strategically for readability
2. Include inline comments explaining code
3. Show realistic, practical use cases
4. Format multi-line objects with consistent indentation

#### @namespace Tag
**Purpose**: Indicates JavaScript object serves as container for organizing classes, properties, and methods

**Syntax 1** (Documentation immediately precedes namespace):
```javascript
/**
 * @namespace description
 */
var S = { ... };
```

**Syntax 2** (Indirect namespace definitions with optional type and name):
```javascript
/**
 * Description
 * @namespace [{type}] [name]
 */
```

**Implementation Guidelines**:
- Use Syntax 1 when comment block followed by code that defines namespace directly
- Use Syntax 2 for indirect namespace creation
- Ensure documented name matches actual implementation
- Optional type and name parameters available

**Practical Examples**:
```javascript
/**
 * @namespace Defines namespace for UI library
 */
var ui = { ... };

/**
 * Defines namespace for UI library
 * @namespace sap.ui
 */
jQuery.sap.define('sap.ui');
```

---

## .NET DOCUMENTATION TAGS

### Tag Organization for .NET

**Recommended Tag Order** (Standard Sequence):
```
<include />
<summary>
<param>
<returns>
<exception>
<remarks>
<see />
<example>
```

### Comprehensive .NET Tag Reference

#### <summary> Tag
**Purpose**: Creates concise descriptions for namespaces, classes, interfaces, and their members

**Syntax**:
```xml
<summary>short-description</summary>
```

**Key Guidelines**:
- **Brevity and Accuracy**: "Write one summary statement containing a short and exact description"
- Begin with capital letter
- Conclude with period
- Mandatory for all documented elements

**Practical Example**:
```csharp
/// <summary>
/// Searches for a row that exactly matches a value or
/// partial set of values at the current index.
/// </summary>
public bool Find(short numColumns)
```

#### <param> Tag (.NET)
**Purpose**: Documents method and function parameters

**Syntax**:
```xml
<param name="parameter-name">parameter-description</param>
```

**Key Guidelines**:
- **Mandatory Usage**: "Mandatory in method and function descriptions for each parameter, even if obvious"
- Document in same sequence as method signature
- Include necessary information about each parameter (defaults, acceptable options)
- "Capitalize the first word in the parameter description"
- Each parameter warrants its own dedicated tag

**Practical Example**:
```csharp
/// <param name="term">The search input text</param>
/// <param name="exact">Boolean flag indicating precision of search (defaults to true)</param>
/// <param name="sortBy">The attribute used for ordering results</param>
public SearchResult Search(String term, Boolean exact, String sortBy)
```

#### <returns> Tag (.NET)
**Purpose**: Documents return values for methods or functions

**Syntax**:
```xml
<returns>returned-value-description</returns>
```

**Key Guidelines**:
- **Mandatory**: Required for methods/functions that return values other than void
- "Provide the necessary information about the returned value"
- "Capitalize the first word in the returned value description"
- Clarify all possible return scenarios

**Practical Example**:
```csharp
/// <returns>True when the property was successfully set;
/// otherwise, returns false.</returns>
public Boolean SetProperty(String name, String value)
```

#### <remarks> Tag
**Purpose**: Provides detailed descriptions for namespaces, classes, interfaces, and their members

**Syntax**:
```xml
<remarks>member-description</remarks>
```

**Key Guidelines**:
- **Placement**: Insert after `<summary>` tag
- **Content Strategy**: "Use only to provide detailed information not already mentioned in summary"
- Expand on summary content with supplementary context

**Practical Application**:
```csharp
/// <summary>
/// Searches for a specific row.
/// </summary>
/// <remarks>
/// Your client application must have an active connection to a database server
/// before it can call this method. An exception is thrown if the connection fails.
/// </remarks>
public bool Find(short numColumns)
```

#### <exception> Tag (.NET)
**Purpose**: Describes exceptions thrown during method execution

**Syntax**:
```xml
<exception cref="exception-name">
    exception-description
</exception>
```

**Key Guidelines**:
- **Required**: For each method that throws an exception
- List multiple exceptions in alphabetical order by name
- "Capitalize first word in descriptions"
- `cref` attribute specifies exception type
- Tag body contains descriptive text

**Practical Example**:
```csharp
/// <exception cref="System.FormatException">
/// Thrown when the given string is not in the correct format.
/// </exception>
public void Parse(String input)
```

#### <see /> Tag (.NET)
**Purpose**: Optional XML element that adds reference link and creates See Also section

**Syntax**:
```xml
<see cref="class-or-interface-name[.member-name[(parameter1-name, ...)]]" />
```

**Key Guidelines**:
- **Parameter Lists**: Only include parameters when dealing with overloaded members
- **Parameter Ordering**: Begin with first parameter, continue through complete list
- **Multiple References**: Arrange progressing from simpler to more detailed
- Start with constants, move toward namespace specifications

**Practical Example**:
```csharp
/// <see cref="DownloadTableData"/>
/// <see cref="DBConnectionContext.GetDownloadData"/>
public interface DownloadData {
```

#### <example> Tag (.NET)
**Purpose**: Optional block element adding example sections demonstrating API usage

**Syntax**:
```xml
<example>
    [description]
    <code>
        [sample code]
    </code>
    [optional results description]
</example>
```

**Key Guidelines**:
- **Optional**: For all members, but recommended
- **Placement**: After `<remarks>` tags, or after `<summary>` if no remarks
- Include descriptive text introducing example
- Wrap code samples in `<code>` tags
- Optionally describe output or behavior following code

**Practical Example**:
```csharp
/// <example>
/// The following code sample demonstrates how to open a connection:
/// <code>
/// SQLAConnection connection = new SQLAConnection();
/// connection.Open("server=localhost");
/// </code>
/// This establishes a connection to the local database server.
/// </example>
```

#### <include /> Tag
**Purpose**: Allows placing documentation comments in XML files instead of source code

**Syntax**:
```xml
<include file="file-name" path="tag-path[@name='member-name-reference']" />
```

**Key Guidelines**:
- Employ when documentation maintained separately from source code
- Keep class/interface member documentation consolidated in single XML file
- Use `class` to reference classes
- Use `ctor` for constructors
- For overloaded constructors, append numbers starting with 2 (`ctor`, `ctor2`, `ctor3`)

**Benefits**:
- Cleaner source code
- Centralized documentation repository
- Preserves full API documentation accessibility
- Maintains IDE integration

**Practical Implementation**:
```csharp
/// <include file="docs.xml" path="class[@name='MyClass']/method[@name='MyMethod']" />
public class MyClass {
    public void MyMethod() { }
}
```

---

## C/C++ DOCUMENTATION TAGS

### Key Difference from Java
**Primary Distinction**: C and C++ documentation tags use **backslash prefix** (`\`) rather than `@` symbol

Examples: `\param`, `\return`, `\see`

### Standard Application
- "The recommended standards and guidelines for Java apply to C and C++ as well"
- Developers should follow similar documentation conventions

### Doxygen Compatibility
- Tags focus on compatibility with Doxygen generator
- Popular documentation tool for C and C++ projects

### C/C++ Specialized Tags

#### \file Tag
**Purpose**: Documents header files with mandatory summary and optional detailed information

**Syntax**:
```
\file file-name
```

**Key Guidelines**:
- **Placement**: Standalone documentation comment anywhere within header file
- `file-name` parameter is optional
- May include partial path for non-unique filenames

**Practical Example**:
```cpp
/** \file sacapi.h
 * Main API header file.
 * This file describes all the data types and entry points of the API.
 */
```

**Best Practices**:
- Keep summary sentence brief and precise
- Use optional detailed descriptions for context beyond summary
- Include filename parameter for clarity (though optional)
- Position documentation comment strategically for visibility

#### \mainpage Tag
**Purpose**: Generates documentation for main entry point of generated output

**Syntax**:
```
\mainpage [title]
```

**Key Characteristics**:
- **Placement**: Standalone documentation comment
- Can be in any existing header file or dedicated documentation file
- Title parameter is optional
- Use `notitle` to suppress title display entirely

**Implementation Example**:
```cpp
/** \mainpage ConnectionServer Component C++ API Reference
 *
 * This is the detailed description of the component.
 *
 * Main features include:
 * - Connection management
 * - Data transfer
 * - Error handling
 */

namespace ConnectionServer
{
...
}
```

**Key Takeaway**: Creates documentation comment to `index.html` page or first LATEX chapter of generated output

---

## HTML TAGS FOR DOCUMENTATION

### Comprehensive HTML Tags Reference (26 Tags)

#### Text Formatting Tags
- **Bold**: `<b>` or `<strong>`
  - Renders text in bold font weight

- **Italic**: `<em>`, `<i>`, or `<var>`
  - Renders text in italic/slanted style

- **Monospaced**: `<tt>`, `<pre>`, `<kbd>`, `<dfn>`, or `<code>`
  - Renders text in monospaced font (code font)
  - `<pre>`: Preserves whitespace and line breaks
  - `<code>`: Inline code elements
  - `<kbd>`: Keyboard input

- **Small Text**: `<small>`
  - Renders text at smaller size

- **Subscript/Superscript**: `<sub>`, `<sup>`
  - `<sub>`: Renders below baseline
  - `<sup>`: Renders above baseline

#### Structural Elements
- **Paragraphs**: `<p>`
  - Separates content into logical blocks

- **Headers**: `<h1>` through `<h6>`
  - Creates hierarchical heading structure (h1 largest, h6 smallest)

- **Line Breaks**: `<br>`
  - Forces line break without creating new paragraph

- **Horizontal Rules**: `<hr>`
  - Creates horizontal dividing line

- **Block Quotes**: `<blockquote>`
  - Indents quoted text for emphasis

#### List Tags
- **Unordered Lists**: `<ul>` with `<li>`
  - Creates bulleted list items

- **Ordered Lists**: `<ol>` with `<li>`
  - Creates numbered list items

- **Definition Lists**: `<dl>`, `<dt>`, `<dd>`
  - `<dl>`: Defines list container
  - `<dt>`: Defines term/label
  - `<dd>`: Defines definition/description

#### Table & Layout Tags
- **Table Structure**: `<table>`, `<tr>`, `<td>`, `<th>`, `<caption>`
  - `<table>`: Container for table
  - `<tr>`: Table row
  - `<td>`: Table data cell
  - `<th>`: Table header cell
  - `<caption>`: Table title/caption

- **Centering**: `<center>`
  - Centers content horizontally

#### Link Tags
- **Hyperlinks**: `<a href="...">link</a>`
  - Creates clickable hyperlink to URL or anchor

### HTML Tag Usage Guidelines
- "Unless otherwise noted, tags terminate with a back slash: `</tagname>`"
- Use `<code>` extensively for keywords, API names, and code samples
- Employ `<p>` tags to maintain formatting in detailed descriptions
- Leverage `<pre>` tags within paragraph tags for code snippets
- Use semantic HTML tags for better structure and accessibility

### Common Documentation Usage Patterns

**Monospaced Code References**:
```
The <code>ConnectionString</code> property specifies the database connection.
```

**Code Examples**:
```
<p>Example usage:</p>
<pre>
  SQLConnection conn = new SQLConnection();
  conn.Open("server=localhost");
</pre>
```

**Structured Lists**:
```
<p>Supported options:</p>
<ul>
  <li>Option 1: Fast processing</li>
  <li>Option 2: Detailed logging</li>
  <li>Option 3: Custom configuration</li>
</ul>
```

**Nested Headers**:
```
<h3>Configuration Steps</h3>
<p>Follow these steps to configure:</p>
```

---

## BEST PRACTICES & GUIDELINES

### Documentation Quality Standards

#### General Principles
1. **Always Add Value**: "Always add value to your comment"
   - Avoid redundant documentation
   - Don't duplicate automatically-generated information

2. **Consistency**: Maintain consistency in tag ordering across all documentation
   - Use recommended tag sequence
   - Group multiple tags of same type together

3. **Case Sensitivity**: Tags are case-sensitive
   - Block tag comments begin with uppercase letters
   - Follow naming conventions strictly

4. **Completeness**: Document all elements
   - Even "obvious" parameters must be documented
   - Include every possible exception

### Description Writing Guidelines

#### Summary Sentence Best Practices
- Avoid phrases like "This class" or "This method"
- Keep lines under 80 characters to prevent wrapping
- Write as standalone statement (appears in generated summaries)
- Be concise but complete

#### Action-Based Members
Start with third-person verbs such as:
- "adds," "retrieves," "provides," "returns"
- Example: "Retrieves a Role object"

#### Object-Based Members
Use noun phrases instead of verbs:
- Example: "Alias of a backend system"

#### Detailed Descriptions
- Add context without repeating API name or summary
- Omit implementation details unless critical for usage
- Use HTML tags to maintain formatting (`<p>`, `<code>`)
- Employ `<code>` tag for keywords, API names, code samples

### Tag-Specific Best Practices

#### @param Documentation
- Document in signature order
- Format as noun phrase describing value represented
- Mark optional parameters clearly (JavaScript: square brackets)
- Describe defaults and constraints

#### @return/@returns Documentation
- Wrap result names in `<code>` tags (Java)
- Document null or Boolean return scenarios explicitly
- Begin with noun phrase, capital letter, no period

#### @throws Documentation
- List exceptions in alphabetical order when multiple exist
- Complete noun phrase as standard sentence
- Capitalize first word, no hyphen at start
- Never use empty `@throws` tags

#### @see Documentation
- Use sparingly to maintain readability
- Apply where it adds value
- Use only for first occurrence of each API name
- Java: limit frequency for easy reading
- JavaScript: combine with `@link` for free text hyperlinks

#### @deprecated Documentation
- Never leave blank
- Always include version and replacement reference
- Use `{@link}` to point to successor
- Avoid exact decommissioning timelines

#### @since Documentation
- Include specific version number
- Support semantic versioning format
- Apply to methods, classes, interfaces

### Language-Specific Best Practices

#### Java-Specific
- Use `{@code}` for inline code snippets
- Use `<pre>` tags within `<p>` for code examples
- Use `{@link}` for cross-references sparingly
- Java: format parameters as noun phrases with `<code>` wrapping

#### JavaScript-Specific
- Mark optional parameters with square brackets: `[param-name]`
- Document union types with pipe separator: `{type1|type2}`
- Use `{*}` for arbitrary types
- Include type declarations with descriptions

#### .NET-Specific
- Mandatory `<summary>` tag for all documented elements
- Always use `<param>` for every parameter
- Always use `<exception>` for every thrown exception
- Use `<remarks>` only for supplementary information
- Follow XML tag syntax strictly: `<tag>content</tag>`

### Common Pitfalls to Avoid

**❌ DO NOT**:
- Leave tags empty or blank
- Duplicate auto-generated information
- Use second-person descriptions ("You should...")
- End single-sentence tag comments with periods
- Document parameters out of signature order
- Miss documenting any exception
- Use vague descriptions
- Include implementation details
- Skip parameters "because they're obvious"
- Provide exact decommissioning dates for deprecated items

**✅ DO**:
- Always add value
- Maintain consistent tag ordering
- Use third-person descriptions
- Document every parameter and exception
- Capitalize first words properly
- Use code formatting for API names
- Include background information
- Note special considerations
- Cross-reference related items
- Update version information regularly

---

## LANGUAGE-SPECIFIC SYNTAX

### Java Documentation Comments Syntax

#### Basic Structure
```java
/**
 * [Summary sentence]
 *
 * [Detailed description - optional]
 *
 * @param parameter-name parameter-description
 * @return description
 * @throws ExceptionType description
 * @see related-element
 * @since version
 * @deprecated As of version, replaced by {@link NewElement}
 */
```

#### Example - Complete Method Documentation
```java
/**
 * Retrieves the user profile for the specified user ID.
 *
 * <p>This method queries the user database to retrieve the complete
 * profile information. The profile includes personal details, preferences,
 * and security settings.</p>
 *
 * <p>Special Considerations:</p>
 * <ul>
 *   <li>The user must be authenticated before calling this method</li>
 *   <li>Large profiles may take several seconds to retrieve</li>
 *   <li>Cache is refreshed every 5 minutes</li>
 * </ul>
 *
 * @param userId An <code>int</code> representing the unique user identifier
 * @param includePreferences A <code>boolean</code> indicating whether to include
 *                           user preferences (defaults to true)
 * @return A <code>UserProfile</code> object containing complete user information,
 *         or <code>null</code> if the user does not exist
 * @throws DatabaseException If a database error occurs while retrieving the profile
 * @throws SecurityException If the current user lacks permission to access this profile
 * @see UserProfile
 * @see #updateUserProfile(int, UserProfile)
 * @since 2.0.0
 */
public UserProfile getUserProfile(int userId, boolean includePreferences)
    throws DatabaseException, SecurityException
```

### JavaScript Documentation Comments Syntax

#### Basic Structure
```javascript
/**
 * [Summary sentence]
 *
 * [Detailed description - optional]
 *
 * @param {type} parameter-name parameter-description
 * @param {type} [optional-name] description
 * @return {type} description
 * @throws {type} description
 * @see related-element
 * @since version
 * @example [optional title]
 * [code example]
 */
```

#### Example - Complete Function Documentation
```javascript
/**
 * Searches for matching records in the database.
 *
 * This function provides flexible searching with support for exact matching,
 * partial matching, and custom sorting. The search is case-insensitive by default.
 *
 * @param {String} query The search query string
 * @param {Object} options Search options object
 * @param {Boolean} [options.exact] Whether to require exact match (defaults to false)
 * @param {String} [options.sortBy] Field name for sorting results
 * @param {Number} [options.limit] Maximum number of results to return
 * @return {Array.<Object>} Array of matching record objects
 * @throws {Error} If the database connection is not established
 * @throws {Error} If the query string is empty or invalid
 * @example Basic search
 * var results = search("John");
 * @example Advanced search with options
 * var results = search("john", {
 *   exact: true,
 *   sortBy: "name",
 *   limit: 50
 * });
 * @see {@link DatabaseConnection}
 * @since 1.5.0
 */
function search(query, options) {
```

### .NET Documentation Comments Syntax

#### Basic Structure
```csharp
/// <summary>
/// [Brief description]
/// </summary>
/// <param name="parameter-name">parameter-description</param>
/// <returns>return-value-description</returns>
/// <exception cref="ExceptionType">exception-description</exception>
/// <remarks>
/// [Additional detailed information]
/// </remarks>
/// <see cref="RelatedElement"/>
/// <example>
/// [Code example]
/// </example>
```

#### Example - Complete Method Documentation
```csharp
/// <summary>
/// Searches for a user by email address.
/// </summary>
/// <param name="emailAddress">The email address of the user to find. Must be a valid email format.</param>
/// <param name="includeInactive">Boolean flag indicating whether to include inactive user accounts. Defaults to false.</param>
/// <returns>
/// A <see cref="User"/> object containing the user information,
/// or null if no user with the specified email is found.
/// </returns>
/// <exception cref="System.ArgumentNullException">
/// Thrown when emailAddress is null.
/// </exception>
/// <exception cref="System.ArgumentException">
/// Thrown when emailAddress is not in valid email format.
/// </exception>
/// <exception cref="System.Data.SqlException">
/// Thrown when a database error occurs during the search.
/// </exception>
/// <remarks>
/// This method performs a case-insensitive search in the user database.
/// The search operation is performed asynchronously and may take several seconds
/// for large user databases. Results are cached for 5 minutes to improve performance.
/// </remarks>
/// <example>
/// The following code demonstrates how to search for a user:
/// <code>
/// User user = FindUserByEmail("john.doe@example.com", false);
/// if (user != null)
/// {
///     Console.WriteLine("Found user: {0}", user.Name);
/// }
/// </code>
/// </example>
/// <see cref="User"/>
/// <see cref="User.Email"/>
public User FindUserByEmail(string emailAddress, bool includeInactive)
{
```

### C/C++ Documentation Comments Syntax (Doxygen)

#### Basic Structure
```cpp
/**
 * \brief [Brief description]
 *
 * [Detailed description]
 *
 * \param parameter-name parameter-description
 * \return return-description
 * \throws ExceptionType exception-description
 * \see related-element
 * \since version
 */
```

#### Example - Complete Function Documentation
```cpp
/**
 * \file database.h
 * Database connection and query management interface.
 * This file defines the core API for database operations including
 * connection management, query execution, and result handling.
 */

/**
 * \brief Retrieves a user profile by user ID.
 *
 * This function queries the user database to retrieve complete profile
 * information including personal details and security settings.
 *
 * \param user_id The unique user identifier (must be positive)
 * \param include_preferences Boolean flag to include user preferences
 * \return Pointer to UserProfile structure containing user data,
 *         or NULL if user not found
 * \throws DatabaseError If database connection fails
 * \throws AuthenticationError If insufficient permissions
 * \see UserProfile
 * \see update_user_profile
 * \since 2.0.0
 */
UserProfile* get_user_profile(int user_id, bool include_preferences);
```

---

## CONSOLIDATED TAG REFERENCE TABLE

### All Supported Tags by Language

| Tag | Java | JavaScript | .NET | C/C++ | Purpose |
|-----|------|-----------|------|-------|---------|
| @param / <param> | ✓ | ✓ | ✓ | \param | Document parameters |
| @return / <returns> | ✓ | ✓ | ✓ | \return | Document return values |
| @throws / <exception> | ✓ | ✓ | ✓ | N/A | Document exceptions |
| @see / <see> | ✓ | ✓ | ✓ | \see | Create cross-references |
| @deprecated | ✓ | ✓ | N/A | N/A | Mark deprecated elements |
| @since / \since | ✓ | ✓ | N/A | \since | Indicate version introduction |
| @version | ✓ | ✓ | N/A | N/A | Internal version tracking |
| <summary> | N/A | N/A | ✓ | N/A | Brief description (.NET) |
| <remarks> | N/A | N/A | ✓ | N/A | Detailed description (.NET) |
| <example> | ✓ | ✓ | ✓ | N/A | Code examples |
| @class / @constructor | N/A | ✓ | N/A | N/A | Constructor documentation |
| @file / \file | N/A | ✓ | N/A | ✓ | File documentation |
| @property | N/A | ✓ | N/A | N/A | Property documentation |
| @namespace | N/A | ✓ | N/A | N/A | Namespace documentation |
| <include> | N/A | N/A | ✓ | N/A | External documentation reference |
| \mainpage | N/A | N/A | N/A | ✓ | Main page documentation |
| Inline tags | {@code}, {@link}, {@docRoot}, {@inheritDoc}, {@linkplain}, {@literal}, {@value} | Standard | N/A | N/A | Inline formatting |

---

## CUSTOM & LEGACY TAGS

### Legacy Java Tags (Backward Compatibility)

| Tag | Purpose | Status |
|-----|---------|--------|
| @author | Indicates API author name/ID | Legacy - internal only |
| @brief | Concise description | Legacy - not recommended |
| @details | Comprehensive explanations | Legacy - not recommended |
| @examples | Mark example sections | Legacy - use <example> instead |
| @noextend | Prevent class/interface extension | Legacy - not recommended |
| @noimplement | Prevent interface implementation | Legacy - not recommended |
| @noinstantiate | Block class instantiation | Legacy - not recommended |
| @nooverride | Restrict method extension | Legacy - not recommended |
| @noreference | Restrict public member access | Legacy - not recommended |
| @hideinitializers | Conceal enum value docs | Legacy - not recommended |
| @showinitializers | Display enum value docs | Legacy - not recommended |
| @overloadedbrief | Summarize overloaded methods | Legacy - not recommended |
| @titlesuffix | Append text to section titles | Legacy - not recommended |

---

## KEY TAKEAWAYS & IMPLEMENTATION SUMMARY

### Critical Documentation Principles

1. **Source-Driven Documentation**: Documentation lives in source code, not separate files
   - Enables automatic generation
   - Reduces maintenance burden
   - Ensures documentation stays current

2. **Standardized Structure**: Three-tier approach
   - **Metadata Layer**: YAML frontmatter with name/description
   - **Content Layer**: Detailed descriptions and examples
   - **Metadata Tags**: Structured information for generation tools

3. **Language Consistency**: Core principles apply across Java, JavaScript, and .NET
   - Verb-based method documentation
   - Consistent tag ordering
   - Consistent parameter documentation patterns

4. **Quality Over Quantity**: Add value with every documentation element
   - Avoid redundancy
   - Complete information coverage
   - Clear, professional writing

5. **User-Centered Documentation**: Think about developer experience
   - First-occurrence explanation completeness
   - Clear cross-references
   - Practical examples
   - Special considerations highlighted

### Implementation Checklist

Before finalizing documentation:

- [ ] Description is mandatory and comprehensive
- [ ] Tags ordered: @param → @return → @throws → @see → @since → @deprecated
- [ ] Every parameter has @param tag
- [ ] Non-void methods have @return tag
- [ ] Every exception has @throws tag
- [ ] Related items linked with @see tags
- [ ] Code elements wrapped in `<code>` tags
- [ ] Examples use `<pre>` tags with proper indentation
- [ ] Complex concepts explained without assuming prior knowledge
- [ ] No redundancy with auto-generated information
- [ ] Proper capitalization and punctuation
- [ ] Version information current and accurate

---

## REFERENCES & OFFICIAL STANDARDS

**Official SAP API Style Guide**: https://github.com/SAP-docs/api-style-guide/tree/main/docs/40-java-javascript-and-msnet

**All 39 Files Extracted & Consolidated**: 2025-11-21

**Compliance**: Follows official Anthropic skills specification and SAP standards

---

**End of Complete Reference Documentation**
