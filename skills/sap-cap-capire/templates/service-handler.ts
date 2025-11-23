// CAP Service Handler Template (TypeScript)
// File: srv/cat-service.ts
// Documentation: https://cap.cloud.sap/docs/node.js/typescript

import cds from '@sap/cds';
import { Request } from '@sap/cds';

/**
 * Catalog Service Implementation (TypeScript)
 */
export default class CatalogService extends cds.ApplicationService {
  async init(): Promise<void> {
    const { Books, Authors } = this.entities;

    // Before handlers
    this.before(['CREATE', 'UPDATE'], Books, this.validateBook);

    // On handlers
    this.on('submitOrder', this.onSubmitOrder);
    this.on('searchBooks', this.onSearchBooks);

    // After handlers
    this.after('READ', Books, this.enrichBooks);

    return super.init();
  }

  /**
   * Validate book data
   */
  private validateBook(req: Request): void {
    const { title, price, stock } = req.data as {
      title?: string;
      price?: number;
      stock?: number;
    };

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
  private async onSubmitOrder(req: Request): Promise<{
    success: boolean;
    orderNo?: string;
    message: string;
  }> {
    const { book, quantity } = req.data as {
      book: string;
      quantity: number;
    };

    const { Books } = this.entities;

    // Access Orders from the db model (not exposed in CatalogService)
    const { Orders } = cds.entities;

    // Check stock availability
    const bookData = await SELECT.one.from(Books).where({ ID: book });
    if (!bookData) {
      // req.reject throws an error, no return needed
      req.reject(404, `Book ${book} not found`);
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
      Items: [{
        book_ID: book,
        quantity,
        price: bookData.price
      }]
    };

    // Wrap in transaction: INSERT order first, then UPDATE stock
    // If INSERT fails, stock change is rolled back
    await cds.tx(req).run(async (tx: any) => {
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
  private async onSearchBooks(req: Request): Promise<unknown[]> {
    const { query, genre, maxPrice } = req.data as {
      query?: string;
      genre?: string;
      maxPrice?: number;
    };

    const { Books } = this.entities;
    let qry = SELECT.from(Books);

    if (query) {
      qry.where({ title: { like: `%${query}%` } });
    }

    if (genre) {
      qry.where({ genre_code: genre });
    }

    // Check for undefined AND null since optional parameters can be either
    if (maxPrice !== undefined && maxPrice !== null) {
      qry.where({ price: { '<=': maxPrice } });
    }

    return await qry;
  }

  /**
   * Enrich books after read
   * Note: isAvailable is a stored computed field in the schema,
   * so we only add runtime-computed fields here
   */
  private enrichBooks(books: Array<{
    stock?: number;
    discount?: string;
    isAvailable?: boolean;  // From schema stored computed field
    stockStatus?: string;
  }>): void {
    for (const book of books) {
      if (book.stock && book.stock > 100) {
        book.discount = '10%';
      }

      // Note: isAvailable is already computed and stored in the database
      // No need to set it here - it's populated from the schema definition:
      // isAvailable : Boolean = (stock > 0) stored

      // Add human-readable stock status (runtime computed)
      if (!book.stock || book.stock === 0) {
        book.stockStatus = 'Out of Stock';
      } else if (book.stock < 10) {
        book.stockStatus = 'Low Stock';
      } else {
        book.stockStatus = 'In Stock';
      }
    }
  }
}
