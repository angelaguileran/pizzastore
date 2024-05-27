import React, { createContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCart = (id) => {
    setCart((prevCart) => {
      if (prevCart[id]) {
        return { ...prevCart, [id]: { quantity: prevCart[id].quantity + 1 } };
      } else {
        return { ...prevCart, [id]: { quantity: 1 } };
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: {
        ...prevCart[id],
        quantity: quantity
      }
    }));
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, handleCart, removeItemFromCart, updateQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
