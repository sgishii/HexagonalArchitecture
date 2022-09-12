import { BookDetail } from '../models/BookDetail';
import { IBookDetailAdapter } from './IBookDetailAdapter';

export interface IBookDetailOutputPort {
  bookDetailAdapter: IBookDetailAdapter;
  getBookDetailByIsbn(isbn: string):Promise<BookDetail>;
  addBookDetail(detail: BookDetail): Promise<BookDetail>;
}