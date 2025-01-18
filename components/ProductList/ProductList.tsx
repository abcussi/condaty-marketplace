import { Product } from '@/src/types/api';
import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ProductCard } from '../ProductCard/ProductCard';
import { ThemedText } from '../ThemedText';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
}

export const ProductList = ({
  products,
  loading,
  onRefresh,
  onEndReached,
}: ProductListProps) => {
  if (loading && !products.length) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={styles.list}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
      ListEmptyComponent={
        <ThemedView style={styles.empty}>
          <ThemedText>No products found</ThemedText>
        </ThemedView>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});