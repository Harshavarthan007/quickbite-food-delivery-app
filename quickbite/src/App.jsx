import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Settings from "./pages/Settings";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ LOGIN FIRST */}
          <Route path="/" element={<Login />} />

          {/* ✅ HOME AFTER LOGIN */}
          <Route path="/home" element={<Home />} />

          {/* OTHER PAGES */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
