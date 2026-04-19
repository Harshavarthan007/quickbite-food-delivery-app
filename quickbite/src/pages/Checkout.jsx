import { useState } from "react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [useLiveLocation, setUseLiveLocation] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 📡 GET LIVE LOCATION
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation(`Lat: ${lat}, Lng: ${lng}`);
        alert("📍 Location captured!");
      },
      () => alert("❌ Permission denied")
    );
  };

  // 🚀 PLACE ORDER
  const placeOrder = () => {
    if (!name || !phone) {
      alert("Please enter name and phone number");
      return;
    }

    if (!useLiveLocation && !address) {
      alert("Please enter address or use live location");
      return;
    }

    if (paymentMethod === "online") {
      alert("💳 Redirecting to payment gateway... (demo)");
      return;
    }

    alert(
      "🎉 ORDER PLACED SUCCESSFULLY!\n\n" +
      "👤 Name: " + name + "\n" +
      "📞 Phone: " + phone + "\n" +
      "💰 Payment: Cash on Delivery 🚚\n" +
      (useLiveLocation
        ? "📍 Location: " + location
        : "🏠 Address: " + address)
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>📦 Checkout</h1>

      {/* NAME */}
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      {/* PHONE */}
      <input
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />

      {/* PAYMENT METHOD */}
      <h3>💳 Payment Method</h3>

      <label>
        <input
          type="radio"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        🚚 Cash on Delivery
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="online"
          checked={paymentMethod === "online"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        💳 Online Payment
      </label>

      {/* LOCATION TOGGLE */}
      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={useLiveLocation}
            onChange={() => setUseLiveLocation(!useLiveLocation)}
          />
          {" "}Use Live Location 📍
        </label>
      </div>

      {/* ADDRESS OR LOCATION */}
      {!useLiveLocation ? (
        <textarea
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ ...inputStyle, height: "100px" }}
        />
      ) : (
        <div>
          <button onClick={getLocation} style={btnStyle}>
            📡 Get Live Location
          </button>

          {location && (
            <p style={{ fontSize: "12px", marginTop: "5px" }}>
              {location}
            </p>
          )}
        </div>
      )}

      {/* PLACE ORDER */}
      <button onClick={placeOrder} style={orderBtn}>
        🚀 Place Order
      </button>
    </div>
  );
}

// 🎨 STYLES
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "none",
};

const btnStyle = {
  padding: "10px",
  background: "orange",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
};

const orderBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "12px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
};