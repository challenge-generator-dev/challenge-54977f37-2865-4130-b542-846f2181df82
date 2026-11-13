import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: 'prod-123', required: false })
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2, required: false })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ description: 'Price per unit', example: 19.99, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateOrderDto {
  @ApiProperty({ description: 'List of order items', type: [OrderItemDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsOptional()
  items?: OrderItemDto[];

  @ApiProperty({ description: 'Total amount of the order', example: 39.98, required: false })
  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @ApiProperty({ description: 'Status of the order', example: 'completed', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}