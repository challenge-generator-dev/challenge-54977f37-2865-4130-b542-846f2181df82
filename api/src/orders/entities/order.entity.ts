import { IsString, IsNumber, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiProperty({ description: 'Product ID', example: 'prod-123' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Price per unit', example: 19.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class Order {
  @ApiProperty({ description: 'Order ID', example: 'order-123' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'User ID', example: 'user-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'List of order items', type: [OrderItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @ApiProperty({ description: 'Total amount of the order', example: 39.98 })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ description: 'Status of the order', example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Creation timestamp', example: '2024-01-01T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-01-01T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}