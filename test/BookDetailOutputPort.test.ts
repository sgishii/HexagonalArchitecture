import { IBookDetailAdapter } from '../src/interfases/IBookDetailAdapter';
import { BookDetail } from '../src/models/BookDetail';
import { BookDetailOutputPort } from '../src/BookDetailOutputPort';

class BookDetailDummyAdapter implements IBookDetailAdapter {
  async load(isbn: string): Promise<BookDetail> {
    return new BookDetail('test title', 'test sub title', isbn);
  }
  async save(bookDetail: BookDetail): Promise<BookDetail> {
    throw bookDetail;
  }
}

test('getBookDetailByIsbn Test OK', async () => {
  const outputPort = new BookDetailOutputPort(
    new BookDetailDummyAdapter()
  );
  const data = await outputPort.getBookDetailByIsbn('test');
  expect(data.title).toBe('test title');
  expect(data.subTitle).toBe('test sub title');
  expect(data.isbn).toBe('test');
});
