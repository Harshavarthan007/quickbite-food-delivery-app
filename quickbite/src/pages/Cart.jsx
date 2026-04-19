import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const inc = (item) => {
    setCart(
      cart.map((x) =>
        x.name === item.name ? { ...x, qty: x.qty + 1 } : x
      )
    );
  };

  const dec = (item) => {
    setCart(
      cart
        .map((x) =>
          x.name === item.name ? { ...x, qty: x.qty - 1 } : x
        )
        .filter((x) => x.qty > 0)
    );
  };

  const removeItem = (item) => {
    setCart(cart.filter((x) => x.name !== item.name));
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="side-cart">
      <h3>🛒 Your Cart</h3>

      {cart.length === 0 ? (
        <p>Cart is empty 😢</p>
      ) : (
        cart.map((item, i) => (
          <div key={i} className="cart-item">
            <img src={item.img} alt={item.name} />

            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <div>
                <button onClick={() => dec(item)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => inc(item)}>+</button>
              </div>

              <button
                onClick={() => removeItem(item)}
                style={{ background: "red", color: "white" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <hr />

      <h3>Total: ₹{total}</h3>

      <button
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
        style={{ background: "green", color: "white" }}
      >
        Checkout 🚀
      </button>
    </div>
  );
}