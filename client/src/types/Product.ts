import type { Variant } from './Variant';

export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  available: boolean;
  group: string;
  ingredients: string[];
  popularity: number;
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
}
