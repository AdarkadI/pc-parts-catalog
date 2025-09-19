import { useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CatalogContext } from '../contexts/CatalogContext';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { state, dispatch } = useContext(CatalogContext);
  const item = state.items.find(i => i.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Item não encontrado.</Text>
      </View>
    );
  }

  function handleDelete() {
    Alert.alert('Excluir peça', `Deseja excluir "${item.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          dispatch({ type: 'DELETE', id: item.id });
          navigation.popToTop();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.meta}>Categoria: {item.category}</Text>
      <Text style={styles.meta}>Quantidade: {item.quantity}</Text>
      <Text style={styles.price}>Preço: ${item.price}</Text>

      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text style={styles.description}>{item.description || '—'}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEdit', { item })} accessibilityLabel="Editar peça">
          <Text>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#f8d7da' }]} onPress={handleDelete} accessibilityLabel="Excluir peça">
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { marginTop: 6 },
  price: { marginTop: 6, fontWeight: '700' },
  sectionTitle: { marginTop: 16, fontWeight: '700' },
  description: { marginTop: 6, color: '#333' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  button: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' },
});
