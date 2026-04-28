import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(to right, #f8fafc, #e0f2fe)",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2563eb" }}>
        🧾 Order History
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ color: "#9333ea", fontWeight: "bold" }}>
              Order #{index + 1}
            </p>

            {order.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "10px",
                  padding: "12px", // ✅ little more inner space
                  borderRadius: "10px",
                  background: "#f1f5f9",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: "2px solid #3b82f6",
                  }}
                />

                <div>
                  {/* ✅ NAME → BLACK */}
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      color: "#000000", // 🔥 changed to black
                    }}
                  >
                    {item.name} × {item.qty}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    ₹{item.price} each
                  </p>

                  <p style={{ margin: 0, color: "#16a34a" }}>
                    Total: ₹{item.price * item.qty}
                  </p>
                </div>
              </div>
            ))}

            <p
              style={{
                fontWeight: "bold",
                color: "#dc2626",
                textAlign: "right",
                marginTop: "10px",
              }}
            >
              Grand Total: ₹
              {order.items.reduce(
                (sum, item) => sum + item.price * item.qty,
                0,
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
