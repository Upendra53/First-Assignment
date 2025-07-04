import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Login</Link> | <Link to="/signup">Signup</Link>
    </nav>
  );
}
