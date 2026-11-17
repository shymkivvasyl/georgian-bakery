import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { useProducts } from './useProducts';
import { addToCart, removeFromCart, changeQuantity, clearCart } from '@/store/cartSlice';
import type { CartItem, CartItemId, Product, Variant } from '@/types';
import { isSameItem } from '@/utils/cart';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const storedItems = useAppSelector((state) => state.cart);
  const { products, isLoading } = useProducts();

  const cartItems = useMemo(() => {
    const result: CartItem[] = [];

    for (const stored of storedItems) {
      const product = products.find((p) => p.id === stored.productId);

      if (!product) continue;

      const variant =
        stored.variantId === null ? null : product.variants.find((v) => v.id === stored.variantId);

      if (variant === undefined) continue;

      result.push({ product, variant, quantity: stored.quantity });
    }

    return result;
  }, [storedItems, products]);

  return {
    cartItems,
    isLoading,
    isInCart: (id: CartItemId) => storedItems.some((item) => isSameItem(item, id)),
    addToCart: (product: Product, variant: Variant | null = null) =>
      dispatch(addToCart({ productId: product.id, variantId: variant?.id ?? null })),
    removeFromCart: (id: CartItemId) => dispatch(removeFromCart(id)),
    changeQuantity: (id: CartItemId, newQuantity: number) =>
      dispatch(changeQuantity({ ...id, newQuantity })),
    clearCart: () => dispatch(clearCart()),
  };
};
