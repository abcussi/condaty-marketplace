import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { orders } from '@/src/api/order';
import { Order } from '@/src/types/api';

export default function OrdersScreen() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    try {
      const data = await orders.getAll();
      setOrderList(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadOrders();
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <ThemedView style={styles.orderCard}>
            <ThemedText style={styles.orderNumber}>
              Order #{item.id.slice(-6)}
            </ThemedText>
            <ThemedText style={styles.orderDate}>
              {new Date(item.createdAt).toLocaleDateString()}
            </ThemedText>
            <ThemedText style={styles.orderTotal}>
              Total: ${item.total.toFixed(2)}
            </ThemedText>
            <ThemedText style={styles.orderStatus}>
              Status: {item.status}
            </ThemedText>
          </ThemedView>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              {loading ? 'Loading orders...' : 'No orders found'}
            </ThemedText>
          </ThemedView>
        }
      />
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
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 14,
    color: '#4CAF50',
    textTransform: 'capitalize',
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
  },
});