import { useEffect, useState } from 'react';
import { getLocations } from '@/utils';
import type { Locations } from '@/types/Locations';

export const useLocations = () => {
  const [locations, setLocations] = useState<Locations[]>([]);

  useEffect(() => {
    getLocations().then(data => setLocations(data));
  }, []);

  return { locations };
};