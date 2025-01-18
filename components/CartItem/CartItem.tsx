import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/src/types/api';
import { useCartStore } from '@/src/store/cartStore';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={{ uri: product.images[0] || 'https://via.placeholder.com/100' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <ThemedText style={styles.name}>{product.name}</ThemedText>
        <ThemedText style={styles.price}>${product.price.toFixed(2)}</ThemedText>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => updateQuantity(product._id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Ionicons 
              name="remove-circle-outline" 
              size={24} 
              color={quantity <= 1 ? '#ccc' : '#007AFF'} 
            />
          </TouchableOpacity>
          <ThemedText style={styles.quantity}>{quantity}</ThemedText>
          <TouchableOpacity 
            onPress={() => updateQuantity(product._id, quantity + 1)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => removeItem(product._id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={24} color="#ff3b30" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
});