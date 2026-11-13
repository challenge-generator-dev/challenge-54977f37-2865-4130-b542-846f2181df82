import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}