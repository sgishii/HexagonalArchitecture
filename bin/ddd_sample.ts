#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DddSampleStack } from '../lib/ddd_sample-stack';

const app = new cdk.App();
new DddSampleStack(app, 'DddSampleStack', {});