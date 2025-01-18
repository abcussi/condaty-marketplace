import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => set((state) => {
        const existingItem = state.items.find(
          item => item.product._id === product._id
        );

        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }

        return { items: [...state.items, { product, quantity: 1 }] };
      }),

      removeItem: (productId: string) => set((state) => ({
        items: state.items.filter(item => item.product._id !== productId),
      })),

      updateQuantity: (productId: string, quantity: number) => set((state) => ({
        items: state.items.map(item =>
          item.product._id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ),
      })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);