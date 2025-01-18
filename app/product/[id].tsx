import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { products } from '@/src/api/product';
import { Product } from '@/src/types/api';
import { useCartStore } from '@/src/store/cartStore';
import { Button } from '@/components/ui/Button';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(state => state.addItem);
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      Alert.alert('Success', 'Product added to cart!');
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await products.getById(id as string);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Product not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
       <Stack.Screen 
        options={{
          title: product?.name || 'Product',
          headerBackTitle: 'Products'
        }} 
      />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: product.images[0] || 'https://via.placeholder.com/300' }}
          style={styles.image}
        />
        <ThemedView style={styles.content}>
        <ThemedText style={styles.name}>{product.name}</ThemedText>
          <ThemedText style={styles.price}>${product.price.toFixed(2)}</ThemedText>
          <ThemedText style={styles.description}>{product.description}</ThemedText>
          <ThemedText style={styles.condominium}>
            Location: {product.condominium}
          </ThemedText>
          <Button
            title="Add to Cart" 
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    lineHeight: 24,
  },
  condominium: {
    fontSize: 14,
    color: '#666',
  },
});