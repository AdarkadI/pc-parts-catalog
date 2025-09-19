import { useContext } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { CatalogContext } from '../contexts/CatalogContext';

export default function SettingsScreen() {
  const { state, dispatch } = useContext(CatalogContext);

  function clearAll() {
    Alert.alert('Resetar catálogo', 'Deseja excluir todas as peças do catálogo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => dispatch({ type: 'LOAD', items: [] }) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Tema (apenas demonstrativo)</Text>
        <Switch value={state.theme === 'dark'} onValueChange={() => dispatch({ type: 'TOGGLE_THEME' })} accessibilityLabel="Alternar tema" />
      </View>

      <View style={{ marginTop: 24 }}>
        <TouchableOpacity style={styles.btn} onPress={clearAll} accessibilityLabel="Limpar catálogo">
          <Text style={{ color: 'white' }}>Limpar catálogo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ color: '#666' }}>Acessibilidade: campos possuem accessibilityLabel; itens são listados com role list.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  btn: { backgroundColor: '#dc3545', padding: 12, borderRadius: 8, alignItems: 'center' },
});
