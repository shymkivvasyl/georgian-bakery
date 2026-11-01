import { useAppDispatch, useAppSelector } from './redux';
import { addToCart, removeFromCart, changeQuantity, clearCart } from '@/store/cartSlice';
import type { CartItemId, Product, Variant } from '@/types';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  return {
    cartItems,
    addToCart: (product: Product, variant: Variant | null = null) =>
      dispatch(addToCart({ product, variant })),
    removeFromCart: (id: CartItemId) => dispatch(removeFromCart(id)),
    changeQuantity: (id: CartItemId, newQuantity: number) =>
      dispatch(changeQuantity({ ...id, newQuantity })),
    clearCart: () => dispatch(clearCart()),
  };
};
