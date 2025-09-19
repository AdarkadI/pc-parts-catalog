import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useReducer } from 'react';

// estado inicial
const initialState = {
  items: [],      // lista de peças
  loading: true,  // indicador de carregamento inicial
  theme: 'light', // 'light' | 'dark'
};

export const CatalogContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.items, loading: false };
    case 'ADD':
      return { ...state, items: [action.item, ...state.items] };
    case 'EDIT':
      return { ...state, items: state.items.map(i => (i.id === action.item.id ? action.item : i)) };
    case 'DELETE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        items: state.items.map(i => (i.id === action.id ? { ...i, favorite: !i.favorite } : i)),
      };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

const STORAGE_KEY = '@catalog_items_v1';

export const CatalogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // carregar dados do AsyncStorage (ou seed)
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          dispatch({ type: 'LOAD', items: JSON.parse(raw) });
        } else {
          // seed inicial
          const seed = [
            { id: '1', name: 'AMD Ryzen 5 5600X', category: 'CPU', quantity: 12, price: '1079.00', favorite: false, description: '6 cores, 12 threads' },
            { id: '2', name: 'Intel Core i5-12400F', category: 'CPU', quantity: 8, price: '669.99', favorite: false, description: '6 cores, sem iGPU' },
            { id: '3', name: 'NVIDIA RTX 3060 12GB', category: 'GPU', quantity: 4, price: '1889.99', favorite: true, description: 'Boa para 1080p/1440p' },
            { id: '4', name: 'Corsair Vengeance 16GB (2x8) DDR4', category: 'RAM', quantity: 20, price: '459.99', favorite: false, description: '3200MHz' },
          ];
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
          dispatch({ type: 'LOAD', items: seed });
        }
      } catch (e) {
        console.error('Erro ao carregar storage', e);
        dispatch({ type: 'LOAD', items: [] });
      }
    })();
  }, []);

  // persistir sempre que items mudarem (não persistir enquanto loading inicial)
  useEffect(() => {
    if (!state.loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)).catch(e => console.error(e));
    }
  }, [state.items, state.loading]);

  return <CatalogContext.Provider value={{ state, dispatch }}>{children}</CatalogContext.Provider>;
};
