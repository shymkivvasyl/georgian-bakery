import type { CartItem, Product } from "@/types";
import { useState, createContext, type ReactNode, useEffect } from "react";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
}

// 1. Створити контекст
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | null>(null);

// 2. Провайдер
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    return setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    return setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }

  const changeQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      return removeFromCart(productId);
    }
    return setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, changeQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

