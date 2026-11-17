import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItemId, StoredCartItem } from '@/types';
import { isSameItem } from '@/utils/cart';
import { readFromLocalStorage } from '@/utils/storage';

const loadCart = (): StoredCartItem[] => {
  const items = readFromLocalStorage('cart');

  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(
    (item) => typeof item?.productId === 'number' && typeof item?.quantity === 'number',
  );
};

const initialState: StoredCartItem[] = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemId>) => {
      const id = action.payload;

      const existingItem = state.find((item) => isSameItem(item, id));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...id, quantity: 1 });
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
