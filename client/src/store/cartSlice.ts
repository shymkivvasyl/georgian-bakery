import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartItemId, Product, Variant } from '@/types';
import { isSameItem } from '@/utils/cart';

const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem('cart');
  if (!saved) return [];

  const items: CartItem[] = JSON.parse(saved);
  return items.map((item) => ({ ...item, variant: item.variant ?? null }));
};

const initialState: CartItem[] = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; variant: Variant | null }>) => {
      const { product, variant } = action.payload;
      const id = { productId: product.id, variantId: variant?.id ?? null };

      const existingItem = state.find((item) => isSameItem(item, id));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ product, variant, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItemId>) => {
      return state.filter((item) => !isSameItem(item, action.payload));
    },
    changeQuantity: (state, action: PayloadAction<CartItemId & { newQuantity: number }>) => {
      const { newQuantity, ...id } = action.payload;
      if (newQuantity <= 0) {
        return state.filter((item) => !isSameItem(item, id));
      }
      const item = state.find((item) => isSameItem(item, id));
      if (item) item.quantity = newQuantity;
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
