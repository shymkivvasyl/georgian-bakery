import type { Product } from '@/types';
import { getMenu } from '@/utils';
import { useEffect, useState } from 'react';

export const useMenu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getMenu()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Помилка при завантаженні даних:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, isError };
};
