import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PartItem from '../components/PartItem';
import { CatalogContext } from '../contexts/CatalogContext';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(CatalogContext);
  const { items, loading } = state;

  const [query, setQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(i => {
      if (showFavoritesOnly && !i.favorite) return false;
      if (!q) return true;
      return i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
    });
  }, [items, query, showFavoritesOnly]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Carregando catálogo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Pesquisar por nome ou categoria"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          accessible
          accessibilityLabel="Pesquisar peças"
        />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate('AddEdit')}
          accessibilityLabel="Adicionar peça"
        >
          <MaterialIcons name="add-circle-outline" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setShowFavoritesOnly(s => !s)} style={styles.filterBtn} accessibilityLabel="Filtrar favoritos">
          <MaterialIcons name={showFavoritesOnly ? 'favorite' : 'favorite-border'} size={20} />
          <Text style={styles.filterText}>Favoritos</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{filtered.length} itens</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PartItem
            item={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            onToggleFavorite={() => dispatch({ type: 'TOGGLE_FAVORITE', id: item.id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
        accessibilityRole="list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  search: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8 },
  iconBtn: { marginLeft: 8, padding: 6 },
  filterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  filterBtn: { flexDirection: 'row', alignItems: 'center' },
  filterText: { marginLeft: 6 },
  count: { color: '#555' },
});
