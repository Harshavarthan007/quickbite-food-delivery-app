import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { foodItems } from "../data/foodData";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import Banner from "../components/Banner";

export default function Home() {
  const { cart, addToCart } = useContext(CartContext);

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("default");

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

  // ✅ FILTER + SORT
  const filtered = foodItems
    .filter((item) => {
      const matchCategory = category === "all" || item.category === category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      let matchPrice = true;

      if (price === "0-100") matchPrice = item.price <= 100;
      else if (price === "100-200")
        matchPrice = item.price > 100 && item.price <= 200;
      else if (price === "200-300")
        matchPrice = item.price > 200 && item.price <= 300;
      else if (price === "300+") matchPrice = item.price > 300;

      return matchCategory && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
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
      {/* 🧭 NAVBAR (SEARCH INSIDE NAVBAR) */}
      <Navbar
        count={cart.reduce((a, c) => a + c.qty, 0)}
        search={search}
        setSearch={setSearch}
      />

      {/* 👋 WELCOME MESSAGE */}
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
          {greeting}, {user.email} 👋 Welcome to QuickBite
        </div>
      )}

      {/* 🖼 BANNER (ONLY IMAGES) */}
      <Banner />

      {/* 🍽 CATEGORY */}
      <h2 className="category-title">Categories</h2>

      <div className="category-container">
        {btn("all", "All")}
        {btn("veg", "Veg")}
        {btn("nonveg", "Non-Veg")}
        {btn("breakfast", "Breakfast")}
        {btn("juices", "Juices")}
        {btn("dessert", "Dessert")}
        {btn("snacks", "Snacks")}
      </div>

      {/* 💰 PRICE FILTER */}
      <h3 className="price-title">Price Filter</h3>

      <div className="price-container">
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="price-select"
        >
          <option value="all">All Prices</option>
          <option value="0-100">₹0 - ₹100</option>
          <option value="100-200">₹100 - ₹200</option>
          <option value="200-300">₹200 - ₹300</option>
          <option value="300+">₹300+</option>
        </select>
      </div>
      {/*sort*/}
      <h3 className="sort-title">Sort By</h3>

      <div className="sort-container">
        <button onClick={() => setSort("low-high")}>Low → High</button>
        <button onClick={() => setSort("high-low")}>High → Low</button>
        <button onClick={() => setSort("rating")}>Top Rated</button>
      </div>
      {/* 🍔 FOOD GRID */}
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <FoodCard key={item.name} item={item} addToCart={addToCart} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No items found</p>
        )}
      </div>
    </div>
  );
}
