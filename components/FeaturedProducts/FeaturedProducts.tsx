import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ProductCard } from '../ProductCard/ProductCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Smart TV 55"',
      price: 599.99,
      description: 'TV Samsung 4K, como nueva. Incluye soporte de pared.',
      image: 'https://via.placeholder.com/300',
      condominium: 'Torres del Valle',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Parrilla eléctrica',
      price: 89.99,
      description: 'Parrilla eléctrica ideal para balcones. Poco uso.',
      image: 'https://via.placeholder.com/300',
      condominium: 'Residencial Los Pinos',
      category: 'Appliances',
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {featuredProducts.map((product) => (
        <ThemedView key={product.id} style={styles.cardContainer}>
          <ProductCard product={product} />
        </ThemedView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
});