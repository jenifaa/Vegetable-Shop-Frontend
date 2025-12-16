// context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

import { loadCartFromStorage, saveCartToStorage, calculateTotal } from './cart.utils';
import type { CartContextType, CartItem } from '@/types/cart.types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount - only once
  useEffect(() => {
    if (!isInitialized) {
      const { items: loadedItems, total: loadedTotal, isCartOpen: loadedIsCartOpen } = loadCartFromStorage();
      setItems(loadedItems);
      setTotal(loadedTotal);
      setIsCartOpen(loadedIsCartOpen);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items, total, isCartOpen);
    }
  }, [items, total, isCartOpen, isInitialized]);

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.productId === newItem.productId);
      let updatedItems;
      
      if (existingIndex >= 0) {
        updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += newItem.quantity;
      } else {
        updatedItems = [...prevItems, newItem];
      }
      
      return updatedItems;
    });
    
    // Update total after state update
    setItems(updatedItems => {
      setTotal(calculateTotal(updatedItems));
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems
        .map(item => 
          item.productId === productId ? { ...item, quantity } : item
        )
        .filter(item => item.quantity > 0);
      
      setTotal(calculateTotal(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.productId !== productId);
      setTotal(calculateTotal(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    setTotal(0);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      total,
      isCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      toggleCart,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};