export interface Variant {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  available: boolean;
  productId: number;
}
