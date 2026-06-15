import type { Product } from "@/types";
import { useState, createContext, type ReactNode, useEffect } from "react";

interface FavoritesContext {
  favoritesItems: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  clearFavorites: () => void;
}

// 1. Створити контекст
// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext<FavoritesContext | null>(null);

// 2. Провайдер
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesItems, setFavoritesItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesItems));
  }, [favoritesItems]);

  const addToFavorites = (product: Product) => {
    return setFavoritesItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromFavorites = (productId: number) => {
    return setFavoritesItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  const clearFavorites = () => {
    setFavoritesItems([]);
  };


  return (
    <FavoritesContext.Provider value={{ favoritesItems: favoritesItems, addToFavorites, removeFromFavorites, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

