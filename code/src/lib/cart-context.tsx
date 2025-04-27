'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  product_id: string;
  product_name: string;
  selling_price: string;
  image_url: string;
  slug: string;
  category_slug: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (product_id: string) => void;
  updateQuantity: (product_id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // Validate cart items
        const validCart = parsedCart.filter(
          (item: CartItem) =>
            item.product_id &&
            item.product_name &&
            item.selling_price &&
            !isNaN(parseFloat(item.selling_price)) &&
            item.image_url &&
            item.slug &&
            item.category_slug &&
            typeof item.quantity === 'number' &&
            item.quantity > 0
        );
        setCart(validCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    // Validate item
    if (
      !item.product_id ||
      !item.product_name ||
      !item.selling_price ||
      isNaN(parseFloat(item.selling_price)) ||
      !item.image_url ||
      !item.slug ||
      !item.category_slug
    ) {
      console.error('Invalid cart item:', item);
      return;
    }

    setCart((prev) => {
      const existingItem = prev.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        return prev.map((i) =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (product_id: string) => {
    setCart((prev) => prev.filter((item) => item.product_id !== product_id));
  };

  const updateQuantity = (product_id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(product_id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}