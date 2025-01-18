import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  condominium: string;
  onPress: () => void;
};

export const ProductCard = ({
  name,
  price,
  description,
  image,
  condominium,
  onPress,
}: ProductCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.card}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          defaultSource={require('@/assets/images/placeholder.png')}
        />
        <ThemedView style={styles.content}>
          <ThemedText style={styles.name}>{name}</ThemedText>
          <ThemedText style={styles.price}>${price.toFixed(2)}</ThemedText>
          <ThemedText style={styles.description} numberOfLines={2}>
            {description}
          </ThemedText>
          <ThemedText style={styles.condominium}>
            From: {condominium}
          </ThemedText>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  condominium: {
    fontSize: 12,
    color: '#888',
  },
});