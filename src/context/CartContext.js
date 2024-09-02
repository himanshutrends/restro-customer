'use client'
import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Function to add item to cart
  const addToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.selectedVariant === item.selectedVariant && JSON.stringify(cartItem.selectedAddons) === JSON.stringify(item.selectedAddons)
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item with same customization already exists in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      // Add new customized item to cart
      return [...prevItems, { ...item, quantity }];
    });

    setIsDrawerOpen(false); // Close drawer after adding to cart
  };

  // Function to update item quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(itemId);
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  // Function to open customization drawer for an item
  const openDrawerForItem = (item) => {
    setCurrentItem(item);
    setIsDrawerOpen(true);
  };

  // Function to close customization drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentItem(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        isDrawerOpen,
        openDrawerForItem,
        closeDrawer,
        currentItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
