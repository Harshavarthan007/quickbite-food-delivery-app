import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Settings from "./pages/Settings";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} /> 
       <Route path="/checkout" element={<Checkout />} /> 
      <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}