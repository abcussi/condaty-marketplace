import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Product } from '@/src/types/api';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard = ({ product, compact }: ProductCardProps) => {
  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView style={[styles.card, compact && styles.compactCard]}>
        <Image
          source={{ uri: product.images[0] }}
          style={[styles.image, compact && styles.compactImage]}
          defaultSource={require('@/assets/images/placeholder.png')}
        />
        <ThemedView style={styles.content}>
          <ThemedText numberOfLines={1} style={styles.name}>
            {product.name}
          </ThemedText>
          <ThemedText style={styles.price}>
            ${product.price.toFixed(2)}
          </ThemedText>
          {!compact && (
            <>
              <ThemedText numberOfLines={2} style={styles.description}>
                {product.description}
              </ThemedText>
              <ThemedText style={styles.condominium}>
                {product.condominium}
              </ThemedText>
            </>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactCard: {
    width: width * 0.4,
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  compactImage: {
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  condominium: {
    fontSize: 12,
    color: '#888',
  },
});