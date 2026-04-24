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

            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} × {item.qty} = ₹{item.price * item.qty}
              </p>
            ))}

            <p style={{ fontWeight: "bold" }}>
              Total: ₹
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
