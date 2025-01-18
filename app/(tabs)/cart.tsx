import React, { useState } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/src/store/cartStore';
import { orders } from '@/src/api/order';
import { CartItem } from '@/components/CartItem/CartItem';

export default function CartScreen() {
  const { items, clearCart, getTotal } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
  
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: getTotal()
      };
  
      await orders.create(orderData);
      clearCart();
      Alert.alert(
        'Success',
        'Order placed successfully!',
        [
          {
            text: 'View Orders',
            onPress: () => router.replace('/(tabs)/order'), // Ruta corregida
          },
          {
            text: 'Continue Shopping',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error placing your order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const confirmCheckout = () => {
    Alert.alert(
      'Confirm Order',
      'Do you want to place this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: handleCheckout,
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
        <Button 
          title="Start Shopping" 
          onPress={() => router.push('/(tabs)')}
          style={styles.shopButton}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.product._id}
        contentContainerStyle={styles.listContent}
      />
      <ThemedView style={styles.footer}>
        <ThemedView style={styles.totalContainer}>
          <ThemedText style={styles.totalLabel}>Total:</ThemedText>
          <ThemedText style={styles.totalAmount}>
            ${getTotal().toFixed(2)}
          </ThemedText>
        </ThemedView>
        <Button 
          title="Checkout" 
          onPress={confirmCheckout}
          loading={loading}
          style={styles.checkoutButton}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  shopButton: {
    width: 200,
  },
});