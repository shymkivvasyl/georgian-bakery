import { useMenu } from '@/hooks/useMenu';
import type { ReactNode } from 'react';
import { ProductsContext } from './productsContext';

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { products, isLoading, isError } = useMenu();

  return (
    <ProductsContext.Provider value={{ products, isLoading, isError }}>
      {children}
    </ProductsContext.Provider>
  );
};
