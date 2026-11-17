import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types';
import { readFromLocalStorage } from '@/utils/storage.ts';

const loadFavorites = (): Product[] => {
  const items = readFromLocalStorage('favorites');
  if (!Array.isArray(items)) {
    return [];
  }
  return items;
};

const initialState: Product[] = loadFavorites();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.some((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearFavorites: () => {
      return [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
