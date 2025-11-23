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

    // NOTE: emitOrderCreated handler should be registered in OrderService
    // or AdminService where Orders entity is exposed, not in CatalogService

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
    const bookData = await SELECT.one.from(Books).where({ ID: book });
    if (!bookData) {
      req.reject(404, `Book ${book} not found`);  // req.reject throws, no return needed
    }

    // Guard against undefined stock
    const currentStock = bookData.stock ?? 0;
    if (currentStock < quantity) {
      req.reject(409, `Insufficient stock. Available: ${currentStock}`);
    }

    // Create order - use transaction for atomicity
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

    // Wrap in transaction: INSERT order first, then UPDATE stock
    // If INSERT fails, stock change is rolled back
    await cds.tx(req).run(async (tx) => {
      await tx.run(INSERT.into(Orders).entries(order));
      await tx.run(UPDATE(Books, book).set({ stock: { '-=': quantity } }));
    });

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
   * Note: isAvailable is a stored computed field in the schema,
   * so we only add runtime-computed fields here
   */
  enrichBooks(books, req) {
    for (const book of books) {
      // Add discount for high stock
      if (book.stock > 100) {
        book.discount = '10%';
      }

      // Note: isAvailable is already computed and stored in the database
      // No need to set it here - it's populated from the schema definition:
      // isAvailable : Boolean = (stock > 0) stored

      // Add human-readable stock status (runtime computed)
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
   * Custom READ handler example (optional - use when you need full control)
   * NOTE: This handler is commented out in init() by default.
   * If enabled, it runs INSTEAD of the default handler, so AFTER handlers
   * like enrichBooks won't run automatically - you must call them explicitly.
   */
  async onReadBooks(req) {
    // Get data from database
    const books = await cds.db.run(req.query);

    // If filtering based on enriched fields, call enrichBooks first
    this.enrichBooks(books, req);

    // Filter using the stored computed field isAvailable from schema
    return books.filter(book => book.isAvailable !== false);
  }
}
