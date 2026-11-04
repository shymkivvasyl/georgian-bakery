import type { Product } from '@/types/index';
import { createContext } from 'react';

export interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);
