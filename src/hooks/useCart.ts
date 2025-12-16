// // hooks/useCart.ts
// import { useState, useEffect } from 'react';

// export interface CartItem {
//   id: string;
//   productId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// export function useCart() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [total, setTotal] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Load from localStorage
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       try {
//         const parsed = JSON.parse(storedCart);
//         setItems(parsed.items || []);
//         setTotal(parsed.total || 0);
//       } catch (error) {
//         console.error('Failed to load cart:', error);
//       }
//     }
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify({ items, total, isCartOpen }));
//   }, [items, total, isCartOpen]);

//   const calculateTotal = (cartItems: CartItem[]) => {
//     return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const addItem = (newItem: CartItem) => {
//     setItems(prevItems => {
//       const existingIndex = prevItems.findIndex(item => item.productId === newItem.productId);
//       let updatedItems;
      
//       if (existingIndex >= 0) {
//         updatedItems = [...prevItems];
//         updatedItems[existingIndex].quantity += newItem.quantity;
//       } else {
//         updatedItems = [...prevItems, newItem];
//       }
      
//       setTotal(calculateTotal(updatedItems));
//       return updatedItems;
//     });
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     setItems(prevItems => {
//       const updatedItems = prevItems.map(item => 
//         item.productId === productId ? { ...item, quantity } : item
//       ).filter(item => item.quantity > 0);
      
//       setTotal(calculateTotal(updatedItems));
//       return updatedItems;
//     });
//   };

//   const removeItem = (productId: string) => {
//     setItems(prevItems => {
//       const updatedItems = prevItems.filter(item => item.productId !== productId);
//       setTotal(calculateTotal(updatedItems));
//       return updatedItems;
//     });
//   };

//   const clearCart = () => {
//     setItems([]);
//     setTotal(0);
//   };

//   const toggleCart = () => {
//     setIsCartOpen(prev => !prev);
//   };

//   const getItemCount = () => {
//     return items.reduce((count, item) => count + item.quantity, 0);
//   };

//   return {
//     items,
//     total,
//     isCartOpen,
//     addItem,
//     updateQuantity,
//     removeItem,
//     clearCart,
//     toggleCart,
//     getItemCount,
//   };
// }