import axios from 'axios';
import { CreateOrderDto, UpdateOrderDto, Order } from '../features/orders/types/order.types';

const API_BASE_URL = 'http://localhost:3000';

export const OrderService = {
  createOrder: async (orderData: CreateOrderDto): Promise<Order> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error creating order');
      }
      throw new Error('Error creating order');
    }
  },

  getOrder: async (id: string): Promise<Order> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error fetching order');
      }
      throw new Error('Error fetching order');
    }
  },

  updateOrder: async (id: string, orderData: UpdateOrderDto): Promise<Order> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error updating order');
      }
      throw new Error('Error updating order');
    }
  },

  deleteOrder: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error deleting order');
      }
      throw new Error('Error deleting order');
    }
  },
};