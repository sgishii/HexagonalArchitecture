import { IBookDetailAdapter } from './interfases/IBookDetailAdapter';
import { IBookDetailOutputPort } from './interfases/IBookDetailOutputPort';
import { BookDetail } from './models/BookDetail';

export class BookDetailOutputPort implements IBookDetailOutputPort {

  bookDetailAdapter: IBookDetailAdapter;

  constructor(bookDetailAdapter: IBookDetailAdapter) {
    this.bookDetailAdapter = bookDetailAdapter;
  }

  async getBookDetailByIsbn(isbn: string): Promise<BookDetail> {
    return await this.bookDetailAdapter.load(isbn);
  }
  async addBookDetail(detail: BookDetail): Promise<BookDetail> {
    await this.bookDetailAdapter.save(detail);
    return detail;
  }
}