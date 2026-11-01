export interface Locations {
  id: number;
  region: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  lat: number | null;
  lng: number | null;
  availableProducts: number[];
}