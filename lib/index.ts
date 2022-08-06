import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface DddSampleProps {
  // Define construct properties here
}

export class DddSample extends Construct {

  constructor(scope: Construct, id: string, props: DddSampleProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'DddSampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
