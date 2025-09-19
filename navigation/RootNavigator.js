import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEditScreen from '../screens/AddEditScreen';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CatalogStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Catálogo' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes' }} />
      <Stack.Screen name="AddEdit" component={AddEditScreen} options={{ title: 'Adicionar / Editar' }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Catalog"
        component={CatalogStack}
        options={{
          title: 'Peças',
          tabBarIcon: ({ size }) => <MaterialIcons name="memory" size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ size }) => <MaterialIcons name="settings" size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
