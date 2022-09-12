import { IBookDetailInputPort } from './interfases/IBookDetailInputPort';
import { IBookDetailOutputPort } from './interfases/IBookDetailOutputPort';
import { BookDetail } from './models/BookDetail';

export class BookDetailInputPort implements IBookDetailInputPort {

  bookDetailOutputPort: IBookDetailOutputPort;

  constructor(bookDetailOutputPort: IBookDetailOutputPort) {
    this.bookDetailOutputPort = bookDetailOutputPort;
  }

  async detail(isbn: string): Promise<BookDetail> {

    const detail = await this.bookDetailOutputPort.getBookDetailByIsbn(isbn);

    await this.bookDetailOutputPort.addBookDetail(detail);

    return detail;
  }
}