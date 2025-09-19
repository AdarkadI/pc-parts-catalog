import { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CatalogContext } from '../contexts/CatalogContext';

export default function AddEditScreen({ route, navigation }) {
  const { state, dispatch } = useContext(CatalogContext);
  const editingItem = route.params?.item;

  const [name, setName] = useState(editingItem?.name || '');
  const [category, setCategory] = useState(editingItem?.category || '');
  const [price, setPrice] = useState(editingItem?.price?.toString() || '');
  const [quantity, setQuantity] = useState(editingItem?.quantity?.toString() || '1');
  const [description, setDescription] = useState(editingItem?.description || '');

  function validate() {
    if (!name.trim()) {
      Alert.alert('Validação', 'Nome é obrigatório.');
      return false;
    }
    const p = parseFloat(price);
    if (isNaN(p) || p < 0) {
      Alert.alert('Validação', 'Preço deve ser um número válido.');
      return false;
    }
    const q = parseInt(quantity, 10);
    if (isNaN(q) || q < 0) {
      Alert.alert('Validação', 'Quantidade deve ser um inteiro válido.');
      return false;
    }
    return true;
  }

  function onSave() {
    if (!validate()) return;

    const item = {
      id: editingItem?.id || Date.now().toString(),
      name: name.trim(),
      category: category.trim() || 'Outros',
      price: parseFloat(price).toFixed(2),
      quantity: parseInt(quantity, 10),
      description: description.trim(),
      favorite: editingItem?.favorite || false,
    };

    if (editingItem) {
      dispatch({ type: 'EDIT', item });
    } else {
      dispatch({ type: 'ADD', item });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} accessibilityLabel="Nome da peça" />

      <Text style={styles.label}>Categoria</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} accessibilityLabel="Categoria" />

      <Text style={styles.label}>Preço *</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="decimal-pad" accessibilityLabel="Preço" />

      <Text style={styles.label}>Quantidade *</Text>
      <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="number-pad" accessibilityLabel="Quantidade" />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 80 }]} value={description} onChangeText={setDescription} multiline accessibilityLabel="Descrição" />

      <TouchableOpacity style={styles.saveBtn} onPress={onSave} accessibilityLabel="Salvar peça">
        <Text style={{ color: 'white' }}>{editingItem ? 'Salvar alterações' : 'Adicionar peça'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  label: { marginTop: 8, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginTop: 6 },
  saveBtn: { marginTop: 20, padding: 12, borderRadius: 8, backgroundColor: '#007bff', alignItems: 'center' },
});
