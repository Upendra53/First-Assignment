
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome, {user?.name || "User"} 👋</h2>
        <p style={styles.subText}>You have successfully logged in.</p>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "40px 60px",
    borderRadius: "20px",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    transition: "transform 0.3s ease",
  },
  heading: {
    fontSize: "2rem",
    color: "#007bff",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#0057ff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};
