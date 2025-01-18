import api from './config';
import { Order } from './indes';

interface CreateOrderData {
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

export const orders = {
  create: async (orderData: CreateOrderData): Promise<Order> => {
    try {
      const response = await api.post<Order>('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};