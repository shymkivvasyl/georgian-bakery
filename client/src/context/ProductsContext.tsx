import { useMenu } from "@/hooks/useMenu";
import type { Product } from "@/types";
import type { ReactNode } from "react";
import { createContext } from "react";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext<ProductsContextType | null>(null);



export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { products, isLoading, isError } = useMenu();

  return (
    <ProductsContext.Provider value={{ products, isLoading, isError }}>
      {children}
    </ProductsContext.Provider>
  );
}