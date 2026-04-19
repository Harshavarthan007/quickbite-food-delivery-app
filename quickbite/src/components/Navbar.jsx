import { useNavigate } from "react-router-dom";

export default function Navbar({ count }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <>
      {/* 👇 TOP WELCOME BAR */}
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

      {/* NAVBAR */}
      <div className="navbar">
        <h2>🍔 QuickBite</h2>

        <button onClick={() => navigate("/cart")}>
          Cart ({count})
        </button>

        <button onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </button>
      </div>
    </>
  );
}