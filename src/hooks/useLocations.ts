import { useEffect, useState } from 'react';
import { getLocations } from '@/utils';
import type { Locations } from '@/types/Locations';

export const useLocations = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLocations().then(data => {
      setLocations(data);
      setIsLoading(false);
    });
  }, []);

  return { locations, isLoading };
};