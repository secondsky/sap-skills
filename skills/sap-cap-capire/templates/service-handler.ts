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
    const bookData = await SELECT.one.from(Books, book);
    if (!bookData) {
      req.reject(404, `Book ${book} not found`);
      return { success: false, message: 'Book not found' };
    }

    if (bookData.stock < quantity) {
      return {
        success: false,
        message: `Insufficient stock. Available: ${bookData.stock}`
      };
    }

    // Update stock
    await UPDATE(Books, book).set({
      stock: { '-=': quantity }
    });

    // Create order
    const orderNo = `ORD-${Date.now()}`;
    await INSERT.into(Orders).entries({
      orderNo,
      status: 'confirmed',
      total: bookData.price * quantity,
      Items: [{
        book_ID: book,
        quantity,
        price: bookData.price
      }]
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

    if (maxPrice) {
      qry.where({ price: { '<=': maxPrice } });
    }

    return await qry;
  }

  /**
   * Enrich books after read
   */
  private enrichBooks(books: Array<{
    stock?: number;
    discount?: string;
    available?: boolean;
    stockStatus?: string;
  }>): void {
    for (const book of books) {
      if (book.stock && book.stock > 100) {
        book.discount = '10%';
      }
      book.available = (book.stock ?? 0) > 0;
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
