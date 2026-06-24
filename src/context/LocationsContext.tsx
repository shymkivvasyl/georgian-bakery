import { useLocations } from "@/hooks/useLocations";
import type { Locations } from "@/types/Locations";
import type { ReactNode } from "react";
import { createContext } from "react";

interface LocationsContextType {
  locations: Locations[];
  isLoading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LocationsContext = createContext<LocationsContextType | null>(null);

export const LocationsProvider = ({ children }: { children: ReactNode }) => {
  const { locations, isLoading } = useLocations();

  return (
    <LocationsContext.Provider value={{ locations, isLoading }}>
      {children}
    </LocationsContext.Provider>
  );
};