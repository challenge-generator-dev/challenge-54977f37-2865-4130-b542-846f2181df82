import { IsString, IsNumber, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
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

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID', example: 'user-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'List of order items', type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ description: 'Total amount of the order', example: 39.98 })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ description: 'Status of the order', example: 'pending', required: false })
  @IsString()
  status?: string;
}