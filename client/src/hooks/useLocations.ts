import { useEffect, useState } from 'react';
import { getLocations } from '@/utils';
import type { Locations } from '@/types/Locations';

export const useLocations = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getLocations()
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error('Помилка при завантаженні даних:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { locations, isLoading, isError };
};
