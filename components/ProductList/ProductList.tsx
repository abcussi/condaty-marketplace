import { useState, useCallback } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '../ThemedView';
import { ProductCard } from '../ProductCard/ProductCard';
import { ThemedText } from '../ThemedText';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  condominium: string;
  category: string;
};

export const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    // Datos de ejemplo, luego se reemplazarán con datos reales de la API
    {
      id: '1',
      name: 'Bicicleta Mountain Bike',
      price: 299.99,
      description: 'Bicicleta en excelente estado, poco uso. Ideal para paseos por el condominio.',
      image: 'https://via.placeholder.com/300',
      condominium: 'Residencial Los Pinos',
      category: 'Sports',
    },
    {
      id: '2',
      name: 'Mesa de jardín',
      price: 150,
      description: 'Mesa de jardín con 4 sillas, material resistente al aire libre.',
      image: 'https://via.placeholder.com/300',
      condominium: 'Condominio Las Palmeras',
      category: 'Furniture',
    },
  ]);

  const handleProductPress = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, []);

  if (loading) {
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
      renderItem={({ item }) => (
        <ProductCard
          {...item}
          onPress={() => handleProductPress(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
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