import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Product } from '@/src/types/api';
import { products } from '@/src/api/product';
import { ProductList } from '@/components/ProductList/ProductList';

export default function ProductsScreen() {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await products.getAll();
      setProductList(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ProductList
        products={productList}
        loading={loading}
        onRefresh={loadProducts}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});