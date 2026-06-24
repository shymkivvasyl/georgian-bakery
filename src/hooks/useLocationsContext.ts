import { LocationsContext } from "@/context/LocationsContext";
import { useContext } from "react";

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);
  if (!context) throw new Error('useLocationsContext must be used within LocationsProvider');
  return context;
};