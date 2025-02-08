import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
  const navigate = useNavigate();

  // Track login/logout status
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("token") !== null);
    };

    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Logs out the user and redirects to home page
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav>
      <Link to="/" className="title">
        <FlashlightOnIcon />
        MyKeeper
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Ensures the menu opens properly by applying `menuOpen` class */}
      <ul className={menuOpen ? "open" : ""}>
        {!isLoggedIn ? (
          <>
            <li className="nav_btn">
              <Button size="large" onClick={() => { navigate("/login"); setMenuOpen(false); }}>
                <span className="button-text">Login</span>
              </Button>
            </li>
            <li className="nav-btn">
              <Button size="large" onClick={() => { navigate("/signup"); setMenuOpen(false); }}>
                <span className="button-text">Sign Up</span>
              </Button>
            </li>
          </>
        ) : (
          <li className="nav_btn">
            <Button size="large" onClick={handleLogout}>
              <span className="button-text">Logout</span>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}

Header.propTypes = {
  showLogout: PropTypes.bool,
};

export default Header;
