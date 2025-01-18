import React from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/src/store/cartStore';
import { CartItem } from '@/components/CartItem/CartItem';

export default function CartScreen() {
  const { items, clearCart, getTotal } = useCartStore();

  const handleCheckout = () => {
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
          onPress: () => {
            // Aquí implementaremos la lógica de checkout
            clearCart();
            Alert.alert('Success', 'Order placed successfully!');
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
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
        <ThemedText style={styles.total}>
          Total: ${getTotal().toFixed(2)}
        </ThemedText>
        <Button 
          title="Checkout" 
          onPress={handleCheckout}
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
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});