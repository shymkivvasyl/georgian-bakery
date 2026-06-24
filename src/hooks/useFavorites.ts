import { useAppDispatch, useAppSelector } from './redux';
import { addToFavorites, removeFromFavorites, clearFavorites } from '@/store/favoritesSlice';
import type { Product } from '@/types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favoritesItems = useAppSelector(state => state.favorites);

  return {
    favoritesItems,
    addToFavorites: (product: Product) => dispatch(addToFavorites(product)),
    removeFromFavorites: (productId: number) => dispatch(removeFromFavorites(productId)),
    clearFavorites: () => dispatch(clearFavorites()),
  };
};