export interface User {
    id: string;
    email: string;
    name: string;
    condominium: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  // Product types
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    seller: User;
    condominium: string;
    status: 'available' | 'sold' | 'reserved';
    createdAt: string;
  }
  
  // Order types
  export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: string;
    buyer: User;
    products: OrderItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: string;
  }
  
  // API Error type
  export interface APIError {
    message: string;
    statusCode?: number;
  }