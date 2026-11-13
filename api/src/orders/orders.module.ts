import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersRepositoryImpl } from './repositories/orders.repository';
import { DynamodbConfig } from '../config/dynamodb.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrdersRepository',
      useClass: OrdersRepositoryImpl,
    },
    DynamodbConfig,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}