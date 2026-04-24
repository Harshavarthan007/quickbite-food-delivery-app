import { useState, useMemo, useEffect } from "react";
import sendIcon from "../assets/sent.png";

export default function FoodCard({ item, addToCart }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(false);
  const [liked, setLiked] = useState(false);
  const [wishlistToast, setWishlistToast] = useState(false);

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

  const deliveryTime = useMemo(() => {
    return Math.floor(Math.random() * 20) + 15;
  }, []);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(wishlist.some((w) => w.id === item.id));
  }, [item.id]);

  const toggleLike = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some((w) => w.id === item.id);

    if (exists) {
      wishlist = wishlist.filter((w) => w.id !== item.id);
      setLiked(false);
    } else {
      wishlist.push(item);
      setLiked(true);

      setWishlistToast(true);
      setTimeout(() => setWishlistToast(false), 2000);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // ✅ KEEP THIS
    window.dispatchEvent(new Event("storage"));

    // 🔥 ADD THIS LINE ONLY
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  return (
    <div className="card" style={{ position: "relative" }}>
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

      <div
        onClick={toggleLike}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          cursor: "pointer",
          color: liked ? "red" : "white",
        }}
      >
        {liked ? "❤️" : "🤍"}
      </div>

      {wishlistToast && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "10px",
            background: "green",
            color: "white",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        >
          ❤️ Added to Wishlist
        </div>
      )}

      {toast && <div className="toast">{item.name} added to cart</div>}

      <img src={item.img} alt={item.name} />

      <h3 style={{ marginTop: "8px" }}>{item.name}</h3>

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
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={sendIcon}
            alt="share"
            style={{ width: "16px", height: "16px" }}
          />
        </button>
      </div>
    </div>
  );
}
