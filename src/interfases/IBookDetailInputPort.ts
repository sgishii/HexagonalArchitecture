import { BookDetail } from '../models/BookDetail';
import { IBookDetailOutputPort } from './IBookDetailOutputPort';

export interface IBookDetailInputPort {
  bookDetailOutputPort: IBookDetailOutputPort;
  detail(isbn: string):Promise<BookDetail>;
}