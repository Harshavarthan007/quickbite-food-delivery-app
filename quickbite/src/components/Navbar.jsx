import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ count, search, setSearch }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [wishlistCount, setWishlistCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    const updateWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlist();

    window.addEventListener("storage", updateWishlist);
    window.addEventListener("wishlistUpdate", updateWishlist);

    return () => {
      window.removeEventListener("storage", updateWishlist);
      window.removeEventListener("wishlistUpdate", updateWishlist);
    };
  }, []);

  return (
    <>
      {/* 👋 WELCOME BAR */}
      {user && (
        <div className="welcome">
          👋 Welcome to QuickBite! Enjoy your food 🍔
        </div>
      )}

      {/* 🧭 NAVBAR */}
      <div className="navbar">
        <h2>🍔 QuickBite</h2>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          {/* ❤️ WISHLIST */}
          <button onClick={() => navigate("/wishlist")}>
            ❤️ ({wishlistCount})
          </button>

          {/* 🛒 CART */}
          <button onClick={() => navigate("/cart")}>Cart ({count})</button>

          {/* ☰ MENU BUTTON (🔥 THIS WAS MISSING) */}
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>

          {/* ✅ MENU */}
          <div className={`menu ${open ? "active" : ""}`}>
            <button onClick={() => navigate("/settings")}>⚙️ Settings</button>

            <button onClick={() => navigate("/orders")}>🧾 Orders</button>
          </div>
        </div>
      </div>
    </>
  );
}
