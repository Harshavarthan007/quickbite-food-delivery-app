import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.name === item.name);

      if (exist) {
        return prev.map((x) =>
          x.name === item.name ? { ...x, qty: (x.qty || 1) + 1 } : x,
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
