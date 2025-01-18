export interface User {
  _id: string;  // Cambiado de id a _id para coincidir con MongoDB
  email: string;
  name: string;
  condominium: string;
}

export interface Product {
  id: any;
  _id: string;  // Cambiado de id a _id para coincidir con MongoDB
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  seller: string | User; // Puede ser el ID o el objeto User populado
  condominium: string;
  status?: 'available' | 'sold' | 'reserved';
  createdAt?: string;
}  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  // Product types
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