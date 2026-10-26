import { useAppDispatch, useAppSelector } from './redux';
import { addToCart, removeFromCart, changeQuantity, clearCart } from '@/store/cartSlice';
import type { Product } from '@/types';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart);

  return {
    cartItems,
    addToCart: (product: Product) => dispatch(addToCart(product)),
    removeFromCart: (productId: number) => dispatch(removeFromCart(productId)),
    changeQuantity: (productId: number, newQuantity: number) =>
      dispatch(changeQuantity({ productId, newQuantity })),
    clearCart: () => dispatch(clearCart()),
  };
};