import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order, OrderItem } from '../entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(@Inject('OrdersRepository') private readonly ordersRepository: OrdersRepository) {}

  private mapToOrderItem(dtoItems: { productId?: string; quantity?: number; price?: number }[]): OrderItem[] {
    return dtoItems.map(item => ({
      productId: item.productId ?? '',
      quantity: item.quantity ?? 0,
      price: item.price ?? 0,
    }));
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = {
      id: uuidv4(),
      userId: createOrderDto.userId,
      items: this.mapToOrderItem(createOrderDto.items),
      totalAmount: createOrderDto.totalAmount,
      status: createOrderDto.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      return await this.ordersRepository.create(order);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to create order: ${message}`);
    }
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.ordersRepository.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder: Order = {
      ...existingOrder,
      ...updateOrderDto,
      items: updateOrderDto.items 
        ? this.mapToOrderItem(updateOrderDto.items)
        : existingOrder.items,
      updatedAt: new Date().toISOString(),
    };

    try {
      return await this.ordersRepository.update(id, updatedOrder);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update order: ${message}`);
    }
  }

  async delete(id: string): Promise<void> {
    const existingOrder = await this.ordersRepository.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    try {
      await this.ordersRepository.delete(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete order: ${message}`);
    }
  }
}