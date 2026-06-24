import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '@/types';

const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
};

const initialState: CartItem[] = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.product.id !== action.payload);
    },
    changeQuantity: (state, action: PayloadAction<{ productId: number; newQuantity: number }>) => {
      const { productId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        return state.filter(item => item.product.id !== productId);
      }
      const item = state.find(item => item.product.id === productId);
      if (item) item.quantity = newQuantity;
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;