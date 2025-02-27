import "./Navbar.css";
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1 className="nav-heading" onClick={handleClick}>
        <Link to="/">Astro AI</Link>
      </h1>
      <button type="button" className="login-btn">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
