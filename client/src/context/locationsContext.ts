import type { Locations } from '@/types/Locations';
import { createContext } from 'react';

interface LocationsContextType {
  locations: Locations[];
  isLoading: boolean;
}

export const LocationsContext = createContext<LocationsContextType | null>(null);
