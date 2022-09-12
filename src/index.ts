import { BookDetailDDBAdapter } from './BookDetailDDBAdapter';
import { BookDetailInputPort } from './BookDetailInputPort';
import { BookDetailOutputPort } from './BookDetailOutputPort';
import { BookDetailOpenbdToDDBAdapter } from './BookDetailOpenbdToDDBAdapter';
import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

const getInputPort = () => {
  return new BookDetailInputPort(
    new BookDetailOutputPort(
      new BookDetailOpenbdToDDBAdapter()
    )
  );
};

export const handler = async (
  event: APIGatewayProxyEventV2,
  _context: APIGatewayEventRequestContextV2,
): Promise<APIGatewayProxyResultV2> => {

  const isbn: string = event.queryStringParameters!.isbn!;
  const inputPort = getInputPort();
  const detail = await inputPort.detail(isbn);

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Headers' : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify(detail)
  };
}