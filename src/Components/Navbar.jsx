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
    </nav>
  );
};

export default Navbar;
