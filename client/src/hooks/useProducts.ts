import { ProductsContext } from '@/context/productsContext';
import { useContext } from 'react';

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
};
