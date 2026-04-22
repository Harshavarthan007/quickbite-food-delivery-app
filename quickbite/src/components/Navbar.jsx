import { useNavigate } from "react-router-dom";

export default function Navbar({ count, search, setSearch }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <>
      {/* 👋 WELCOME BAR */}
      {user && (
        <div
          style={{
            background: "#2ecc71",
            color: "white",
            textAlign: "center",
            padding: "6px",
            fontSize: "14px",
          }}
        >
          👋 Welcome to QuickBite! Enjoy your food 🍔
        </div>
      )}

      {/* 🧭 MAIN NAVBAR */}
      <div
        className="navbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        {/* 🍔 LOGO */}
        <h2 style={{ margin: 0 }}>🍔 QuickBite</h2>

        {/* 🔍 SEARCH BAR (NEW) */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px 15px",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            textAlign: "center",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          }}
        />

        {/* 🛒 ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={() => navigate("/cart")}>Cart ({count})</button>

          <button onClick={() => navigate("/settings")}>⚙️ Settings</button>
        </div>
      </div>
    </>
  );
}
