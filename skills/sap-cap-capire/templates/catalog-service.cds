// CAP Catalog Service Template
// File: srv/cat-service.cds
// Documentation: https://cap.cloud.sap/docs/guides/providing-services

using { my.bookshop as my } from '../db/schema';

/**
 * Public catalog service for browsing books
 * Exposed at: /odata/v4/catalog or /browse
 */
@path: '/browse'
service CatalogService {

  /**
   * Read-only view of books with flattened fields for Fiori UI
   * Excludes associations to avoid name clashes, exposes scalar aliases instead
   */
  @readonly
  entity Books as projection on my.Books {
    *,
    author.name as authorName,
    genre.code as genre_code,
    genre.name as genreName,
    currency.code as currency_code
  } excluding { createdBy, modifiedBy, author, genre, currency };

  /**
   * Read-only authors
   */
  @readonly
  entity Authors as projection on my.Authors {
    ID, name, dateOfBirth
  };

  /**
   * Genre code list - auto-exposed for value help
   */
  @readonly
  entity Genres as projection on my.Genres;

  /**
   * Submit order action - requires authentication
   */
  @requires: 'authenticated-user'
  action submitOrder(
    book     : Books:ID,
    quantity : Integer
  ) returns {
    success  : Boolean;
    orderNo  : String;
    message  : String;
  };

  /**
   * Search books function
   */
  function searchBooks(
    query    : String,
    genre    : String,
    maxPrice : Decimal
  ) returns array of Books;
}

/**
 * Admin service with full CRUD access
 */
@requires: 'admin'
@path: '/admin'
service AdminService {

  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  entity Genres as projection on my.Genres;
  entity Orders as projection on my.Orders;
  entity Customers as projection on my.Customers;

  /**
   * Bulk update stock action
   */
  action updateStock(
    book  : Books:ID,
    delta : Integer
  ) returns Books;
}

/**
 * Order service for customers
 */
@requires: 'authenticated-user'
@path: '/orders'
service OrderService {

  /**
   * Orders visible only to owner
   * Note: $user resolves to userId from JWT authentication token
   */
  @restrict: [
    { grant: 'READ', where: 'customer.userId = $user' },
    { grant: 'CREATE' },
    { grant: 'UPDATE', where: 'customer.userId = $user and status = ''draft''' },
    { grant: 'DELETE', where: 'customer.userId = $user and status = ''draft''' }
  ]
  entity Orders as projection on my.Orders;

  /**
   * Order items - accessible through parent order
   * Restriction inherited from parent Orders entity via composition
   */
  @restrict: [
    { grant: '*', where: 'parent.customer.userId = $user' }
  ]
  entity OrderItems as projection on my.OrderItems;

  /**
   * Confirm order action
   */
  action confirmOrder(orderID: Orders:ID) returns Orders;

  /**
   * Cancel order action
   */
  action cancelOrder(orderID: Orders:ID, reason: String) returns {
    success: Boolean;
    message: String;
  };
}
