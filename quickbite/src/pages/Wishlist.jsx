import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  // ✅ ADD THIS (important fix)
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadWishlist = () => {
      let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

      // keep your filter same
      wishlistItems = wishlistItems.filter(
        (item) => item && item.name && item.img,
      );

      setItems(wishlistItems);
    };

    loadWishlist();

    window.addEventListener("wishlistUpdate", loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("wishlistUpdate", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  // ❌ REMOVE FUNCTION
  const removeItem = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter((item) => item.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  // ✅ MOVE TO CART (NOW WORKS)
  const moveToCart = (item) => {
    addToCart(item); // ✅ NOW CONNECTED

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter((w) => w.id !== item.id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ Wishlist</h2>

      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid">
          {items.map((item, index) => (
            <div key={index} className="card">
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              {/* ❌ REMOVE BUTTON */}
              <button
                onClick={() => removeItem(item.id)}
                style={{ marginTop: "5px", background: "red", color: "white" }}
              >
                ❌ Remove
              </button>

              {/* 🛒 MOVE TO CART */}
              <button
                onClick={() => moveToCart(item)}
                style={{
                  marginTop: "5px",
                  background: "green",
                  color: "white",
                }}
              >
                🛒 Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
