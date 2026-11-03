import type { CartItem, CartItemId } from '@/types';

// Same product AND same variant?
export const isSameItem = (item: CartItem, id: CartItemId) =>
  item.product.id === id.productId && (item.variant?.id ?? null) === id.variantId;

// Unique key for React lists, like "74-3" or "12-none"
export const getItemKey = (item: CartItem) => `${item.product.id}-${item.variant?.id ?? 'none'}`;

// Variant price if it has one, else product price
export const getItemPrice = (item: CartItem) => item.variant?.price ?? item.product.price;
