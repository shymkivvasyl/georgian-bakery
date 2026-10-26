import type { Locations, Product } from "@/types";

export const getMenu = async (): Promise<Product[]> => {
  const response = await fetch('/api/menu');
  return response.json();
};

export const getLocations = async (): Promise<Locations[]> => {
  const response = await fetch('/api/locations');
  return response.json();
};