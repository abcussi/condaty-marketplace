import api from './config';
import { Order } from '../types/api';

interface CreateOrderData {
  products: {
    productId: string;
    quantity: number;
  }[];
}

export const orders = {
  getAll: async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (orderData: CreateOrderData): Promise<Order> => {
    try {
      const response = await api.post<Order>('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string): Promise<Order> => {
    try {
      const response = await api.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};