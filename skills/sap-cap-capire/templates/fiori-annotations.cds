// CAP Fiori Annotations Template
// File: app/fiori-service.cds
// Documentation: https://cap.cloud.sap/docs/advanced/fiori

using CatalogService from '../srv/cat-service';

// ============================================
// Books Entity Annotations
// ============================================

/**
 * Enable drafts for Books
 */
annotate CatalogService.Books with @odata.draft.enabled;

/**
 * Header info for Object Page
 */
annotate CatalogService.Books with @UI.HeaderInfo: {
  TypeName       : 'Book',
  TypeNamePlural : 'Books',
  Title          : { Value: title },
  Description    : { Value: authorName }
  // Note: Add coverImage field to Books entity if image support is needed
};

/**
 * Filter bar fields
 */
annotate CatalogService.Books with @UI.SelectionFields: [
  title,
  authorName,
  genre_code,
  price
];

/**
 * Table columns for List Report
 */
annotate CatalogService.Books with @UI.LineItem: [
  { Value: title, Label: 'Title' },
  { Value: authorName, Label: 'Author' },
  { Value: genreName, Label: 'Genre' },
  { Value: stock, Label: 'Stock' },
  { Value: price, Label: 'Price' },
  { Value: currency_code, Label: 'Currency' },
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'CatalogService.submitOrder',
    Label: 'Order',
    Inline: true
  }
];

/**
 * Object Page sections
 */
annotate CatalogService.Books with @UI.Facets: [
  {
    $Type  : 'UI.ReferenceFacet',
    ID     : 'GeneralFacet',
    Target : '@UI.FieldGroup#General',
    Label  : 'General Information'
  },
  {
    $Type  : 'UI.ReferenceFacet',
    ID     : 'PricingFacet',
    Target : '@UI.FieldGroup#Pricing',
    Label  : 'Pricing & Availability'
  },
  {
    $Type  : 'UI.ReferenceFacet',
    ID     : 'DescriptionFacet',
    Target : '@UI.FieldGroup#Description',
    Label  : 'Description'
  }
];

/**
 * Field groups
 */
annotate CatalogService.Books with @UI.FieldGroup#General: {
  Data: [
    { Value: title },
    { Value: authorName },
    { Value: genre_code, Label: 'Genre' },
    { Value: rating }
  ]
};

annotate CatalogService.Books with @UI.FieldGroup#Pricing: {
  Data: [
    { Value: price },
    { Value: currency_code },
    { Value: stock },
    { Value: isAvailable, Label: 'Available' }
  ]
};

annotate CatalogService.Books with @UI.FieldGroup#Description: {
  Data: [
    { Value: descr, Label: 'Description' }
  ]
};

/**
 * Header actions
 */
annotate CatalogService.Books with @UI.Identification: [
  {
    $Type: 'UI.DataFieldForAction',
    Action: 'CatalogService.submitOrder',
    Label: 'Order Now'
  }
];

// ============================================
// Field-Level Annotations
// ============================================

annotate CatalogService.Books with {
  ID           @UI.Hidden;
  createdAt    @UI.Hidden;
  modifiedAt   @UI.Hidden;
  // Note: createdBy, modifiedBy are excluded from the projection

  title        @title: 'Title'
               @mandatory;

  descr        @title: 'Description'
               @UI.MultiLineText;

  authorName   @title: 'Author';

  genre_code   @title: 'Genre'
               @Common.Text: genreName
               @Common.TextArrangement: #TextOnly;

  stock        @title: 'Stock'
               @Measures.Unit: 'pcs';

  price        @title: 'Price'
               @Measures.ISOCurrency: currency_code;

  currency_code @title: 'Currency';

  rating       @title: 'Rating';
};

// ============================================
// Value Help Annotations
// ============================================

/**
 * Genre value help
 */
annotate CatalogService.Books with {
  genre_code @Common.ValueList: {
    Label: 'Genres',
    CollectionPath: 'Genres',
    Parameters: [
      {
        $Type: 'Common.ValueListParameterInOut',
        LocalDataProperty: genre_code,
        ValueListProperty: 'code'
      },
      {
        $Type: 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'name'
      }
    ]
  };
};

// ============================================
// Authors Entity Annotations
// ============================================

annotate CatalogService.Authors with @UI.HeaderInfo: {
  TypeName       : 'Author',
  TypeNamePlural : 'Authors',
  Title          : { Value: name }
};

annotate CatalogService.Authors with @UI.LineItem: [
  { Value: name, Label: 'Name' },
  { Value: dateOfBirth, Label: 'Date of Birth' }
];

annotate CatalogService.Authors with {
  ID   @UI.Hidden;
  name @title: 'Name';
};

// ============================================
// Genres Entity Annotations
// ============================================

annotate CatalogService.Genres with @UI.HeaderInfo: {
  TypeName       : 'Genre',
  TypeNamePlural : 'Genres',
  Title          : { Value: name }
};

annotate CatalogService.Genres with @UI.LineItem: [
  { Value: code, Label: 'Code' },
  { Value: name, Label: 'Name' },
  { Value: descr, Label: 'Description' }
];
