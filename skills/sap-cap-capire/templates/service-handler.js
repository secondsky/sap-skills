// CAP Service Handler Template (Node.js)
// File: srv/cat-service.js
// Documentation: https://cap.cloud.sap/docs/node.js/events

const cds = require('@sap/cds');

/**
 * Catalog Service Implementation
 * Class-based handler pattern
 */
module.exports = class CatalogService extends cds.ApplicationService {

  async init() {
    const { Books, Authors } = this.entities;

    // ========================================
    // BEFORE Handlers - Validation & Enrichment
    // ========================================

    // Validate book data before create/update
    this.before(['CREATE', 'UPDATE'], Books, this.validateBook);

    // Add default values
    this.before('CREATE', Books, (req) => {
      req.data.createdAt = new Date();
    });

    // ========================================
    // ON Handlers - Custom Logic
    // ========================================

    // Custom action: submitOrder
    this.on('submitOrder', this.onSubmitOrder);

    // Custom function: searchBooks
    this.on('searchBooks', this.onSearchBooks);

    // Override READ with custom logic (optional)
    // this.on('READ', Books, this.onReadBooks);

    // ========================================
    // AFTER Handlers - Post-processing
    // ========================================

    // Add computed fields after read
    this.after('READ', Books, this.enrichBooks);

    // Emit event after order created
    this.after('CREATE', 'Orders', this.emitOrderCreated);

    return super.init();
  }

  // ============================================
  // Handler Implementations
  // ============================================

  /**
   * Validate book data
   */
  validateBook(req) {
    const { title, price, stock } = req.data;

    if (title && title.length < 3) {
      req.error(400, 'Title must be at least 3 characters', 'title');
    }

    if (price !== undefined && price < 0) {
      req.error(400, 'Price cannot be negative', 'price');
    }

    if (stock !== undefined && stock < 0) {
      req.error(400, 'Stock cannot be negative', 'stock');
    }
  }

  /**
   * Submit order action handler
   */
  async onSubmitOrder(req) {
    const { book, quantity } = req.data;
    const { Books } = this.entities;

    // Access Orders from the db model (not exposed in CatalogService)
    const { Orders } = cds.entities;

    // Check stock availability
    const bookData = await SELECT.one.from(Books, book);
    if (!bookData) {
      return req.reject(404, `Book ${book} not found`);
    }

    if (bookData.stock < quantity) {
      return req.reject(409, `Insufficient stock. Available: ${bookData.stock}`);
    }

    // Create order
    const orderNo = `ORD-${Date.now()}`;
    const order = {
      orderNo,
      status: 'confirmed',
      total: bookData.price * quantity,
      currency_code: bookData.currency_code,
      Items: [{
        book_ID: book,
        quantity,
        price: bookData.price
      }]
    };

    // Update stock
    await UPDATE(Books, book).set({
      stock: { '-=': quantity }
    });

    // Insert order
    await INSERT.into(Orders).entries(order);

    return {
      success: true,
      orderNo,
      message: `Order ${orderNo} created successfully`
    };
  }

  /**
   * Search books function handler
   */
  async onSearchBooks(req) {
    const { query, genre, maxPrice } = req.data;
    const { Books } = this.entities;

    let qry = SELECT.from(Books);

    if (query) {
      qry.where({ title: { like: `%${query}%` } });
    }

    if (genre) {
      qry.where({ genre_code: genre });
    }

    if (maxPrice) {
      qry.where({ price: { '<=': maxPrice } });
    }

    return await qry;
  }

  /**
   * Enrich books after read
   */
  enrichBooks(books, req) {
    for (const book of books) {
      // Add discount for high stock
      if (book.stock > 100) {
        book.discount = '10%';
      }

      // Add availability flag
      book.available = book.stock > 0;

      // Add human-readable stock status
      if (book.stock === 0) {
        book.stockStatus = 'Out of Stock';
      } else if (book.stock < 10) {
        book.stockStatus = 'Low Stock';
      } else {
        book.stockStatus = 'In Stock';
      }
    }
  }

  /**
   * Emit event after order created
   */
  async emitOrderCreated(order, req) {
    const messaging = await cds.connect.to('messaging');
    await messaging.emit('OrderCreated', {
      orderID: order.ID,
      orderNo: order.orderNo,
      customer: order.customer_ID,
      total: order.total
    });
  }

  /**
   * Custom READ handler (optional - use when you need full control)
   */
  async onReadBooks(req) {
    // Get data from database
    const books = await cds.db.run(req.query);

    // Apply custom filtering using the 'available' field set by enrichBooks
    return books.filter(book => book.available !== false);
  }
}
