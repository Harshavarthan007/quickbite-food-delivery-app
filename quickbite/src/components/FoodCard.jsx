import { useState } from "react";
import sendIcon from "../assets/sent.png";

export default function FoodCard({ item, addToCart }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(false);

  const sendReview = () => {
    if (rating === 0 || review === "") {
      alert("Please give rating and review");
      return;
    }

    setSent(true);

    setTimeout(() => {
      setRating(0);
      setReview("");
      setSent(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    addToCart(item);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const handleShare = async () => {
    const text = `${item.name}\nPrice: ₹${item.price}\n${window.location.href}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: item.name,
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Copied! Share it");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deliveryTime = Math.floor(Math.random() * 20) + 15;

  return (
    <div className="card" style={{ position: "relative" }}>
      {/* Discount */}
      {item.price <= 150 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          20% OFF
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast">{item.name} added to cart</div>}

      <img src={item.img} alt={item.name} />

      <h3 style={{ marginTop: "8px" }}>{item.name}</h3>

      {/* Rating + Delivery */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        <span style={{ color: "gold", fontWeight: "bold" }}>
          ⭐ {rating > 0 ? rating : item.rating}
        </span>
        <span style={{ fontSize: "12px", color: "#ccc" }}>
          {deliveryTime} mins
        </span>
      </div>

      {/* Price */}
      {item.price <= 150 ? (
        <p style={{ marginTop: "8px" }}>
          <span style={{ textDecoration: "line-through", color: "gray" }}>
            ₹{Math.round(item.price * 1.2)}
          </span>{" "}
          <span style={{ color: "lightgreen", fontWeight: "bold" }}>
            ₹{item.price}
          </span>
        </p>
      ) : (
        <p style={{ marginTop: "8px" }}>₹{item.price}</p>
      )}

      {/* Rating Input */}
      <div style={{ marginTop: "8px" }}>
        Rating:
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
              fontSize: "20px",
            }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review */}
      <input
        placeholder="Write review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{
          width: "90%",
          marginTop: "8px",
          padding: "6px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      {!sent ? (
        <button onClick={sendReview} style={{ marginTop: "8px" }}>
          Send Review
        </button>
      ) : (
        <p style={{ color: "lightgreen", marginTop: "8px" }}>
          Thanks for your review
        </p>
      )}

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <button onClick={handleAddToCart}>Add to Cart</button>

        <button
          onClick={handleShare}
          style={{
            background: "#333",
            border: "none",
            borderRadius: "50%",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <img
            src={sendIcon}
            alt="share"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>
    </div>
  );
}
