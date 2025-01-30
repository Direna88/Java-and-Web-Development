import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
import Button from '@mui/material/Button';
import PropTypes from "prop-types";

function Header({ showLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); //Remove token
    navigate("/"); // Redirect to homepage
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

      <ul>
      {!showLogout ? ( // Show "Sign Up" only if not logged in
          <li className="nav_btn">
            <Button size="large">
              <NavLink to="/signup">Sign Up</NavLink>
            </Button>
          </li>
        ) : (
          <li className="nav_btn">
            <Button size="large" onClick={handleLogout} >
              <span className="button-text" >Logout</span>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )
}

Header.propTypes = {
  showLogout: PropTypes.bool,
};

export default Header;
