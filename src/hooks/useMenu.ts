import type { Product } from "@/types";
import { getMenu } from "@/utils";
import { useEffect, useState } from "react";

export const useMenu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getMenu().then(data => {
      setProducts(data);
      setIsLoading(false);
    }).catch(error => {
      console.error("Помилка при завантаженні даних:", error);
      setIsLoading(false);
      setIsError(true);
    });
  }, []);

  return { products, isLoading, isError };
};