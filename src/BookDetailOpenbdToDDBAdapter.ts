import { IBookDetailAdapter } from './interfases/IBookDetailAdapter';
import { BookDetail } from './models/BookDetail';
import {
  DynamoDBClient,
  WriteRequest,
  BatchWriteItemCommand,
} from '@aws-sdk/client-dynamodb';
import axios from 'axios';

export class BookDetailOpenbdToDDBAdapter implements IBookDetailAdapter {

  async load(isbn: string): Promise<BookDetail> {
    console.log('load from Opendb');
    try {
      const res = await axios.get(`https://api.openbd.jp/v1/get?isbn=${isbn}`);
      const element =  res.data[0].onix.DescriptiveDetail.TitleDetail.TitleElement;
      const title = element.TitleText.content;
      const subTitle = element.Subtitle.content;
      const openbd = new BookDetail(title, subTitle, isbn);
      return openbd;
    } catch (e) {
      console.error('load error from Openbd', e);
      throw e;
    }
  }

  async save(bookDetail: BookDetail): Promise<BookDetail> {
    console.log('save to DynamoDB');
    try {
      const writeRequests: WriteRequest[] = [
        {
          PutRequest: {
            Item: {
              id: { S: bookDetail.isbn },
              title: { S: bookDetail.title },
              subTitle: { S: bookDetail.subTitle },
            },
          },
        },
      ];

      const dynamoDBClient = new DynamoDBClient({});
      const tableName = 'books'
      await dynamoDBClient.send(
        new BatchWriteItemCommand({
          RequestItems: {
            [tableName]: writeRequests, // キーにテーブル名を指定
          },
        })
      );

      return bookDetail;
    } catch (e) {
      console.error('save error from DynamoDB', e);
      throw e;
    }
  }
}