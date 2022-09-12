import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from  'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class DddSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // テーブルを生成
    const table = new dynamodb.Table(this, 'DetailTable', {
      tableName: 'books',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      writeCapacity: 1,
      readCapacity: 1,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const func = new NodejsFunction(
      this,
      'DetailFunction',
      {
        entry: 'src/index.ts',
        environment: {
          REGION: this.region,
          TZ: 'Asia/Tokyo',
        },
        functionName: 'detail',
        handler: 'handler',
        runtime: lambda.Runtime.NODEJS_14_X,
        timeout: Duration.seconds(10),
        
      }
    );

    // Dynamodbへの読み取り権限を追加
    func.addToRolePolicy(new iam.PolicyStatement({
      resources: [table.tableArn],
      actions: [
        "dynamodb:BatchGetItem",
        "dynamodb:DescribeStream",
        "dynamodb:DescribeTable",
        "dynamodb:Get*",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchWriteItem",
        "dynamodb:DeleteItem",
        "dynamodb:UpdateItem",
        "dynamodb:PutItem"
      ]
    }));

    // Function URLs を作成
    func.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });
  }
}
