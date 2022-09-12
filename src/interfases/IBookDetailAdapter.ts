import { BookDetail } from '../models/BookDetail';

export interface IBookDetailAdapter {
  load(isbn: string): Promise<BookDetail>;
  save(bookDetail: BookDetail): Promise<BookDetail>;
}