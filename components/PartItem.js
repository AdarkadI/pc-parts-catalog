import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PartItem({ item, onPress, onToggleFavorite }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessible
      accessibilityLabel={`${item.name}. Categoria ${item.category}. Preço ${item.price}. Toque para ver detalhes`}
    >
      <View style={styles.left}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.meta}>{item.category} • Qtd: {item.quantity}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          onPress={onToggleFavorite}
          accessibilityLabel={item.favorite ? 'Remover favorito' : 'Marcar favorito'}
        >
          <MaterialIcons name={item.favorite ? 'favorite' : 'favorite-border'} size={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  left: { flex: 1 },
  right: { alignItems: 'flex-end' },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12, color: '#555' },
  price: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
});
