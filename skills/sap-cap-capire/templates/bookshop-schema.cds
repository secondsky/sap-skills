// CAP Bookshop Schema Template
// File: db/schema.cds
// Documentation: https://cap.cloud.sap/docs/cds/cdl

namespace my.bookshop;

using { Currency, managed, cuid, sap.common.CodeList } from '@sap/cds/common';

/**
 * Books entity with common patterns
 */
entity Books : cuid, managed {
  title       : localized String(111) not null;
  descr       : localized String(1111);
  author      : Association to Authors;
  genre       : Association to Genres;
  stock       : Integer default 0;
  price       : Decimal(9,2);
  currency    : Currency;
  rating      : Decimal(2,1);
  isAvailable : Boolean = (stock > 0) stored;
}

/**
 * Authors entity
 */
entity Authors : cuid, managed {
  name        : String(111) not null;
  dateOfBirth : Date;
  placeOfBirth: String;
  books       : Association to many Books on books.author = $self;
}

/**
 * Genres as hierarchical code list
 * Note: CodeList from @sap/cds/common provides:
 *   - name: localized String(255)
 *   - descr: localized String(1000)
 */
entity Genres : CodeList {
  key code    : String(10);
  parent      : Association to Genres;
  children    : Composition of many Genres on children.parent = $self;
}

/**
 * Orders with composition pattern
 */
entity Orders : cuid, managed {
  orderNo     : String(20);
  customer    : Association to Customers;
  total       : Decimal(10,2) @readonly;
  currency    : Currency;
  status      : String enum { draft; confirmed; shipped; delivered; cancelled; } default 'draft';
  Items       : Composition of many OrderItems on Items.parent = $self;
}

/**
 * Order items (child of Orders)
 */
entity OrderItems : cuid {
  parent      : Association to Orders;
  book        : Association to Books;
  quantity    : Integer default 1;
  price       : Decimal(9,2);
  amount      : Decimal(10,2) = (quantity * price) stored;
}

/**
 * Customers entity
 * Note: userId links to authentication identity ($user from JWT)
 */
entity Customers : cuid, managed {
  userId      : String(255) not null;  // Links to $user from authentication
  email       : String(255) not null;
  firstName   : String(111);
  lastName    : String(111);
  fullName    : String = (firstName || ' ' || lastName) stored;
  orders      : Association to many Orders on orders.customer = $self;
}
