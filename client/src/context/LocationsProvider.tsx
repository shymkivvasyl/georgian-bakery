import { useLocations } from '@/hooks/useLocations';
import { useEffect, type ReactNode } from 'react';
import { LocationsContext } from './locationsContext';
import { useSelectedLocation } from '@/hooks/useSelectedLocation';

export const LocationsProvider = ({ children }: { children: ReactNode }) => {
  const { locations, isLoading } = useLocations();
  const { selectedLocation, setSelectedLocation } = useSelectedLocation();

  useEffect(() => {
    if (isLoading || locations.length === 0 || selectedLocation === null) {
      return;
    }

    if (!locations.some((location) => location.id === selectedLocation)) {
      setSelectedLocation(null);
    }
  }, [isLoading, locations, selectedLocation, setSelectedLocation]);

  return (
    <LocationsContext.Provider value={{ locations, isLoading }}>
      {children}
    </LocationsContext.Provider>
  );
};
