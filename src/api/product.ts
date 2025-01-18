import api from './config';
import { Product } from '../types/api';

interface ProductsParams {
  category?: string;
  condominium?: string;
  search?: string;
}

export const products = {
  getAll: async (params: ProductsParams = {}): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>('/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (productData: Omit<Product, 'id' | 'seller' | 'createdAt'>): Promise<Product> => {
    try {
      const response = await api.post<Product>('/products', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};