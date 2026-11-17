import type { CartItem, CartItemId } from '@/types';

// Same product AND same variant?
// Works for anything with productId and variantId (CartItemId, StoredCartItem)
export const isSameItem = (a: CartItemId, b: CartItemId) =>
  a.productId === b.productId && a.variantId === b.variantId;

// Unique key for React lists, like "74-3" or "12-none"
export const getItemKey = (item: CartItem) => `${item.product.id}-${item.variant?.id ?? 'none'}`;

// Variant price if it has one, else product price
export const getItemPrice = (item: CartItem) => item.variant?.price ?? item.product.price;
