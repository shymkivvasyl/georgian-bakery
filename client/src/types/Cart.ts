import type { Product } from './Product';
import type { Variant } from './Variant';

export interface CartItem {
  product: Product;
  variant: Variant | null;
  quantity: number;
}

export interface CartItemId {
  productId: number;
  variantId: number | null;
}
