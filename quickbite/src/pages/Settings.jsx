import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));

    if (saved) {
      setName(saved.name || "");
      setPhone(saved.phone || "");
      setDarkMode(saved.darkMode || false);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        name,
        phone,
        darkMode,
      }),
    );

    alert("⚙️ Settings Saved!");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="side-settings">
      <h3>⚙️ Settings</h3>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <label style={{ display: "block", marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        🌙 Dark Mode
      </label>

      <button onClick={saveSettings}>💾 Save</button>

      <button onClick={() => navigate("/home")}>🏠 Home</button>

      <button onClick={logout} style={{ background: "red", color: "white" }}>
        🚪 Logout
      </button>
    </div>
  );
}
