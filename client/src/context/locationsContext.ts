import type { Locations } from '@/types/Locations';
import { createContext } from 'react';

interface LocationsContextType {
  locations: Locations[];
  isLoading: boolean;
  isError: boolean;
}

export const LocationsContext = createContext<LocationsContextType | null>(null);
