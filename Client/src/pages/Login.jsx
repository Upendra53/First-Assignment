


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
        setEmail("");
        setPassword("");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await fetch("http://localhost:5000/api/google-login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token: credentialResponse.credential }),
                });

                const data = await res.json();

                if (res.ok) {
                  alert("Google login successful!");
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("user", JSON.stringify(data.user));
                  navigate("/home");
                } else {
                  alert(data.msg || "Google login failed");
                }
              } catch (err) {
                console.error("Google login error:", err);
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e8f0ff, #fdfbfb)",
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  form: {
    background: "#ffffff",
    padding: "40px 45px",
    borderRadius: "20px",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "420px",
  },
  heading: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#1a1a2e",
    fontSize: "1.9rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  input: {
    marginBottom: "20px",
    padding: "12px 15px",
    fontSize: "1rem",
    border: "1px solid #dcdde1",
    borderRadius: "12px",
    outline: "none",
    backgroundColor: "#f9f9f9",
  },
  button: {
    padding: "14px",
    backgroundColor: "#0057ff",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
  error: {
    color: "#e63946",
    marginBottom: "12px",
    fontSize: "0.95rem",
    textAlign: "center",
  },
};
