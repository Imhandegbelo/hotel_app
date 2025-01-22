import React, { useState, useContext } from "react";

// Create context
const CartContext = React.createContext();

// create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addItem = (item) => {
    setCartItems([item]);
  };

  // Remove particular item from cart
  // const removeItem = (itemId) => {
  //   // setCartItems((previousItem) =>
  //   //   previousItem.filter((item) => item.id !== itemId)
  //   // );
  // };

  // Clear cart items
  const removeItem = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
