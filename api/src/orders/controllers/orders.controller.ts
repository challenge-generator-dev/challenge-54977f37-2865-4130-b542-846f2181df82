import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: Order })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.ordersService.delete(id);
  }
}