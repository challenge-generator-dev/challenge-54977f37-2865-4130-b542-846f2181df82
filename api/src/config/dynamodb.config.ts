// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamodbConfig {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');

    const clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = {
      region,
    };

    if (endpoint) {
      clientConfig.endpoint = endpoint;
    }

    const dynamoClient = new DynamoDBClient(clientConfig);

    this.client = DynamoDBDocumentClient.from(dynamoClient, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });

    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'orders');
  }

  getClient(): DynamoDBDocumentClient {
    return this.client;
  }

  getTableName(): string {
    return this.tableName;
  }
}