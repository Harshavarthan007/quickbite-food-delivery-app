import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { foodItems } from "../data/foodData";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

export default function Home() {
  const { cart, addToCart } = useContext(CartContext);

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("all");

  const user = JSON.parse(localStorage.getItem("loggedUser") || "null");

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const hour = new Date().getHours();
  let greeting = "Hello";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  // ✅ FILTER LOGIC (FIXED PRICE RANGES)
  const filtered = foodItems.filter((item) => {
    const matchCategory = category === "all" || item.category === category;

    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    let matchPrice = true;

    if (price === "0-100") {
      matchPrice = item.price <= 100;
    } else if (price === "100-200") {
      matchPrice = item.price > 100 && item.price <= 200;
    } else if (price === "200-300") {
      matchPrice = item.price > 200 && item.price <= 300;
    } else if (price === "300+") {
      matchPrice = item.price > 300;
    }

    return matchCategory && matchSearch && matchPrice;
  });

  const btn = (name, label) => (
    <button
      className={category === name ? "active" : ""}
      onClick={() => setCategory(name)}
    >
      {label}
    </button>
  );

  return (
    <div>
      <Navbar count={cart.reduce((a, c) => a + c.qty, 0)} />

      {/* 👋 Welcome Message */}
      {user && showWelcome && (
        <div
          style={{
            background: "#2ecc71",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          {greeting}, {user.email} 👋 Welcome to QuickBite 🍔
        </div>
      )}

      {/* 🔍 SEARCH */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="🔍 Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      {/* 🍽 CATEGORY */}
      <h2 style={{ textAlign: "center", marginTop: "15px" }}>🍽 Categories</h2>

      <div style={{ textAlign: "center" }}>
        {btn("all", "All")}
        {btn("veg", "Veg 🍃")}
        {btn("nonveg", "Non-Veg 🍗")}
        {btn("breakfast", "Breakfast 🍽")}
        {btn("juices", "Juices 🧃")}
        {btn("dessert", "Dessert 🍰")}
        {btn("snacks", "Snacks 🍟")}
      </div>

      {/* 💰 PRICE FILTER */}
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        💰 Price Filter
      </h3>

      <div style={{ textAlign: "center" }}>
        <button
          className={price === "all" ? "active" : ""}
          onClick={() => setPrice("all")}
        >
          All
        </button>

        <button
          className={price === "0-100" ? "active" : ""}
          onClick={() => setPrice("0-100")}
        >
          ₹0 - ₹100
        </button>

        <button
          className={price === "100-200" ? "active" : ""}
          onClick={() => setPrice("100-200")}
        >
          ₹100 - ₹200
        </button>

        <button
          className={price === "200-300" ? "active" : ""}
          onClick={() => setPrice("200-300")}
        >
          ₹200 - ₹300
        </button>

        <button
          className={price === "300+" ? "active" : ""}
          onClick={() => setPrice("300+")}
        >
          ₹300+
        </button>
      </div>

      {/* 🍔 FOOD GRID */}
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <FoodCard
              key={item.name} // ✅ fixed key
              item={item}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No items found</p>
        )}
      </div>
    </div>
  );
}
