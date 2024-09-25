import { aws_iam, aws_s3, aws_s3_deployment, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as s3 from 'aws-cdk-lib/aws-s3';

export interface S3InitialiserProps extends StackProps {
  accountId: string;
  bucketName: string;
  folders: string[];
  sourceFolder: string;
  role: aws_iam.Role;
}

export class S3Initialiser extends Construct {
  public readonly bucket: aws_s3.Bucket;
  private accountId: string;

  constructor(scope: Construct, id: string, props: S3InitialiserProps) {
    super(scope, id);

    this.accountId = props.accountId;

    this.bucket = new s3.Bucket(this, id + 'Bucket', {
      bucketName: props.bucketName,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      notificationsHandlerRole: props.role,
      eventBridgeEnabled: true,
      versioned: true,
      objectOwnership: aws_s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    });
  }
}
