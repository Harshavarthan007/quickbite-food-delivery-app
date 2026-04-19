import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find(x => x.name === item.name);
    if (exist) {
      setCart(cart.map(x =>
        x.name === item.name ? { ...x, qty: x.qty + 1 } : x
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}