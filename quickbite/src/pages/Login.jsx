import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/mn.jpg";
import logo from "../assets/ym.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP
  const handleSignup = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    // ✅ SAVE USER (FIXED KEY)
    localStorage.setItem(
      "user",
      JSON.stringify({ email, password })
    );

    alert("Account Created ✅");
    setIsSignup(false);
  };

  // LOGIN
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login Successful 🎉");

      // ✅ IMPORTANT FIX HERE
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ email })
      );

      navigate("/home");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="login-box"
        style={{
          width: "340px",
          padding: "30px",
          borderRadius: "15px",
          background: "rgba(0,0,0,0.75)",
          color: "white",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* TITLE ROW */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "5px",
          }}
        >
          <span style={{ fontSize: "28px" }}>🍔</span>
          <h1 style={{ margin: 0 }}>QuickBite</h1>

          <img
            src={logo}
            alt="logo"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        <h3 style={{ marginBottom: "15px" }}>
          {isSignup ? "Create Account" : "Login"}
        </h3>

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        {/* BUTTON */}
        {isSignup ? (
          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "orange",
              border: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "green",
              border: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )}

        {/* TOGGLE */}
        <p
          style={{
            cursor: "pointer",
            marginTop: "15px",
            fontSize: "14px",
            color: "#ddd",
          }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have account? Login"
            : "New user? Create account"}
        </p>
      </div>
    </div>
  );
}