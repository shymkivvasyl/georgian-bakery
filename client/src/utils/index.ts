import type { Locations, Product } from '@/types';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export const getMenu = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/menu`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status}`);
  }

  return response.json();
};

export const getLocations = async (): Promise<Locations[]> => {
  const response = await fetch(`${API_URL}/api/locations`);

  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.status}`);
  }

  return response.json();
};
