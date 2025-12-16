import type { CartItem } from "@/types/cart.types";


export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const loadCartFromStorage = (): { items: CartItem[]; total: number; isCartOpen: boolean } => {
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      return {
        items: parsed.items || [],
        total: calculateTotal(parsed.items || []),
        isCartOpen: parsed.isCartOpen || false,
      };
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
  return {
    items: [],
    total: 0,
    isCartOpen: false,
  };
};

export const saveCartToStorage = (items: CartItem[], total: number, isCartOpen: boolean) => {
  try {
    localStorage.setItem('cart', JSON.stringify({ items, total, isCartOpen }));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};