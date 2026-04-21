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

  // 🔥 FILTER LOGIC (CATEGORY + SEARCH + PRICE)
  const filtered = foodItems.filter((item) => {
    const matchCategory = category === "all" || item.category === category;

    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchPrice =
      price === "all" ||
      (price === "100" && item.price <= 100) ||
      (price === "200" && item.price <= 200) ||
      (price === "300" && item.price <= 300) ||
      (price === "500" && item.price > 300);

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
          className={price === "100" ? "active" : ""}
          onClick={() => setPrice("100")}
        >
          ₹100
        </button>

        <button
          className={price === "200" ? "active" : ""}
          onClick={() => setPrice("200")}
        >
          ₹200
        </button>

        <button
          className={price === "300" ? "active" : ""}
          onClick={() => setPrice("300")}
        >
          ₹300
        </button>

        <button
          className={price === "500" ? "active" : ""}
          onClick={() => setPrice("500")}
        >
          ₹500+
        </button>
      </div>

      <div className="grid">
        {filtered.map((item, i) => (
          <FoodCard key={i} item={item} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
