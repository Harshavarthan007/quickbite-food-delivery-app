import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <p>
              <b>Order #{index + 1}</b>
            </p>

            {/* 🔥 ITEMS WITH IMAGE */}
            {order.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                {/* ✅ IMAGE */}
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />

                {/* ✅ DETAILS */}
                <div>
                  <p style={{ margin: 0 }}>
                    {item.name} × {item.qty}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                    ₹{item.price} each
                  </p>
                  <p style={{ margin: 0 }}>Total: ₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}

            {/* ✅ TOTAL */}
            <p style={{ fontWeight: "bold" }}>
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
