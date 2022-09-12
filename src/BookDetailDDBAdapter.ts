import { IBookDetailAdapter } from './interfases/IBookDetailAdapter';
import { BookDetail } from './models/BookDetail';
import {
  DynamoDBClient,
  GetItemCommand,
  WriteRequest,
  BatchWriteItemCommand,
} from '@aws-sdk/client-dynamodb';

export class BookDetailDDBAdapter implements IBookDetailAdapter {

  async load(isbn: string): Promise<BookDetail> {
    try {
      const dynamoDBClient = new DynamoDBClient({});
      const tableName = 'books'
      console.log('load from DynamoDB');
      const params = {
        TableName: tableName,
        Key: {
          id: { S: isbn }
        }
      };
      const data = await dynamoDBClient.send(new GetItemCommand(params));
      if (data.Item) {
        data.Item.title.S;
        return new BookDetail(data.Item.title.S!, data.Item.subTitle.S!, isbn);
      } else {
        return new BookDetail('not found', 'this book is not found', 'invalid isbn');
      }
    } catch (e) {
      console.error('load error from DynamoDB', e);
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